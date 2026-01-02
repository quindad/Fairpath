/**
 * Simulation Results Storage
 * Handles saving and retrieving reentry simulation data
 */

import * as kv from './kv_store.tsx';

// Types
export interface PlayerProfile {
  name: string;
  age: number;
  offense: 'non-violent' | 'drug-related' | 'property' | 'violent';
  hasSupport: boolean;
  hasCar: boolean;
  education: 'less-than-hs' | 'high-school' | 'some-college' | 'degree';
}

export interface SimulationResults {
  success: boolean;
  successRate: number; // 0-100
  finalMoney: number;
  finalStress: number;
  violations: number;
  tasksCompleted: string[];
  hasCriticalNeeds: boolean;
  hasJob: boolean;
  hasHousing: boolean;
  metParoleOfficer: boolean;
  completedSocialServices: boolean;
  completedTransportation: boolean;
  completedSupportGroup: boolean;
}

export interface SimulationAnalytics {
  timeSpent: number; // seconds
  stationsVisited: number;
  retries: number;
  choicesMade: Array<{
    station: string;
    choice: string;
    success: boolean;
  }>;
}

export interface SimulationGrade {
  score: number;
  outOf: number;
  percentage: number;
  letterGrade: string;
}

export interface SimulationCompletion {
  userId: string;
  sessionId: string;
  completedAt: string;
  profile: PlayerProfile;
  results: SimulationResults;
  analytics: SimulationAnalytics;
  grade?: SimulationGrade;
  organizationId?: string; // School district or company
  classId?: string; // Specific class/cohort
  teacherId?: string; // Teacher/facilitator
}

// Storage Functions

/**
 * Save simulation completion
 */
export async function saveSimulationResult(completion: SimulationCompletion) {
  const key = `simulation:${completion.userId}:${completion.sessionId}`;
  await kv.set(key, completion);
  
  // Also save to user's result list
  const userKey = `simulation:user:${completion.userId}:results`;
  const existing = await kv.get(userKey) || [];
  existing.push({
    sessionId: completion.sessionId,
    completedAt: completion.completedAt,
    successRate: completion.results.successRate,
    grade: completion.grade
  });
  await kv.set(userKey, existing);
  
  // If part of a class, add to class results
  if (completion.classId) {
    const classKey = `simulation:class:${completion.classId}:results`;
    const classResults = await kv.get(classKey) || [];
    classResults.push({
      userId: completion.userId,
      sessionId: completion.sessionId,
      completedAt: completion.completedAt,
      successRate: completion.results.successRate,
      grade: completion.grade
    });
    await kv.set(classKey, classResults);
  }
  
  return completion;
}

/**
 * Get simulation result by session ID
 */
export async function getSimulationResult(userId: string, sessionId: string): Promise<SimulationCompletion | null> {
  const key = `simulation:${userId}:${sessionId}`;
  return await kv.get(key);
}

/**
 * Get all simulations for a user
 */
export async function getUserSimulations(userId: string): Promise<SimulationCompletion[]> {
  const userKey = `simulation:user:${userId}:results`;
  const results = await kv.get(userKey) || [];
  
  // Fetch full details for each
  const full = await Promise.all(
    results.map(async (r: any) => {
      return await getSimulationResult(userId, r.sessionId);
    })
  );
  
  return full.filter(Boolean) as SimulationCompletion[];
}

/**
 * Get class results for teacher dashboard
 */
export async function getClassResults(classId: string): Promise<any> {
  const classKey = `simulation:class:${classId}:results`;
  const results = await kv.get(classKey) || [];
  
  // Calculate class statistics
  const totalStudents = new Set(results.map((r: any) => r.userId)).size;
  const completed = results.length;
  const avgSuccessRate = results.reduce((sum: number, r: any) => sum + r.successRate, 0) / completed || 0;
  const avgGrade = results
    .filter((r: any) => r.grade)
    .reduce((sum: number, r: any) => sum + r.grade.score, 0) / completed || 0;
  
  return {
    classId,
    totalStudents,
    completed,
    averageSuccessRate: Math.round(avgSuccessRate * 10) / 10,
    averageGrade: Math.round(avgGrade * 10) / 10,
    results
  };
}

/**
 * Get organization (school/company) analytics
 */
export async function getOrganizationAnalytics(organizationId: string): Promise<any> {
  const orgKey = `simulation:org:${organizationId}:*`;
  const allResults = await kv.getByPrefix(`simulation:org:${organizationId}:`);
  
  const totalCompletions = allResults.length;
  const uniqueUsers = new Set(allResults.map((r: any) => r.userId)).size;
  
  const successRates = allResults.map((r: any) => r.results.successRate);
  const avgSuccess = successRates.reduce((a, b) => a + b, 0) / totalCompletions || 0;
  
  const employmentRate = allResults.filter((r: any) => r.results.hasJob).length / totalCompletions * 100 || 0;
  const housingRate = allResults.filter((r: any) => r.results.hasHousing).length / totalCompletions * 100 || 0;
  
  return {
    organizationId,
    totalCompletions,
    uniqueUsers,
    averageSuccessRate: Math.round(avgSuccess * 10) / 10,
    employmentSuccessRate: Math.round(employmentRate * 10) / 10,
    housingSuccessRate: Math.round(housingRate * 10) / 10,
    completions: allResults
  };
}

/**
 * Calculate grade from simulation results
 */
export function calculateGrade(results: SimulationResults): SimulationGrade {
  let score = 0;
  const maxScore = 50;
  
  // Completion points (20 points)
  if (results.hasCriticalNeeds) score += 20;
  
  // Success metrics (30 points)
  if (results.hasJob) score += 10;
  if (results.hasHousing) score += 10;
  if (results.metParoleOfficer) score += 10;
  
  // Efficiency bonus (10 points)
  if (results.finalMoney > 20) score += 5;
  if (results.finalStress < 60) score += 5;
  
  // No violations bonus (10 points)
  if (results.violations === 0) score += 10;
  
  const percentage = (score / maxScore) * 100;
  
  let letterGrade = 'F';
  if (percentage >= 90) letterGrade = 'A';
  else if (percentage >= 80) letterGrade = 'B';
  else if (percentage >= 70) letterGrade = 'C';
  else if (percentage >= 60) letterGrade = 'D';
  
  return {
    score,
    outOf: maxScore,
    percentage: Math.round(percentage * 10) / 10,
    letterGrade
  };
}

/**
 * Save in-progress simulation (for resume later)
 */
export async function saveProgress(userId: string, sessionId: string, gameState: any) {
  const key = `simulation:progress:${userId}:${sessionId}`;
  await kv.set(key, {
    ...gameState,
    savedAt: new Date().toISOString()
  });
}

/**
 * Get saved progress
 */
export async function getProgress(userId: string, sessionId: string) {
  const key = `simulation:progress:${userId}:${sessionId}`;
  return await kv.get(key);
}

/**
 * Create new class/cohort
 */
export async function createClass(teacherId: string, className: string, organizationId?: string) {
  const classId = `class-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  const classData = {
    classId,
    teacherId,
    className,
    organizationId,
    createdAt: new Date().toISOString(),
    students: []
  };
  
  await kv.set(`simulation:class:${classId}:info`, classData);
  
  // Add to teacher's class list
  const teacherKey = `simulation:teacher:${teacherId}:classes`;
  const classes = await kv.get(teacherKey) || [];
  classes.push(classId);
  await kv.set(teacherKey, classes);
  
  return classData;
}

/**
 * Add student to class
 */
export async function addStudentToClass(classId: string, userId: string) {
  const classInfo = await kv.get(`simulation:class:${classId}:info`);
  if (!classInfo) {
    throw new Error('Class not found');
  }
  
  if (!classInfo.students.includes(userId)) {
    classInfo.students.push(userId);
    await kv.set(`simulation:class:${classId}:info`, classInfo);
  }
  
  return classInfo;
}

/**
 * Get teacher's classes
 */
export async function getTeacherClasses(teacherId: string) {
  const teacherKey = `simulation:teacher:${teacherId}:classes`;
  const classIds = await kv.get(teacherKey) || [];
  
  const classes = await Promise.all(
    classIds.map(async (id: string) => {
      const info = await kv.get(`simulation:class:${id}:info`);
      const results = await getClassResults(id);
      return { ...info, ...results };
    })
  );
  
  return classes;
}

/**
 * Generate class code for students to join
 */
export async function generateClassCode(classId: string): Promise<string> {
  const code = Math.random().toString(36).substr(2, 6).toUpperCase();
  await kv.set(`simulation:classcode:${code}`, classId);
  return code;
}

/**
 * Join class with code
 */
export async function joinClassWithCode(userId: string, code: string) {
  const classId = await kv.get(`simulation:classcode:${code}`);
  if (!classId) {
    throw new Error('Invalid class code');
  }
  
  return await addStudentToClass(classId, userId);
}

/**
 * National/Global statistics (for marketing)
 */
export async function getGlobalStats() {
  // This would query all simulations - for now, return sample data
  // In production, implement proper aggregation
  
  return {
    totalCompletions: 50000,
    totalUsers: 35000,
    schoolsUsing: 250,
    companiesUsing: 75,
    averageSuccessRate: 42.3,
    averageEmpathyIncrease: 67,
    crimePrevented: '~2,500 juveniles',
    costSavings: '$87.5M (estimated)'
  };
}