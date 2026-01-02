/**
 * FAIRPATH PRERELEASE APP - BACKEND MODULE
 * 
 * Handles all data sync, employer portal, and admin dashboard
 * for the jail tablet prerelease preparation app
 */

import * as kv from "./kv_store.tsx";

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface PrereleaseUser {
  id: string;
  docNumber: string; // Prison ID
  facilityCode: string;
  facilityName: string;
  fullName: string;
  dateOfBirth: string;
  
  // Contact (for after release)
  phoneNumber?: string;
  email?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  
  // Release Info
  releaseDate: string;
  actualReleaseDate?: string;
  releasingToCity?: string;
  releasingToState?: string;
  releasingToZip?: string;
  
  // Parole/Supervision
  paroleOfficerName?: string;
  paroleOfficerPhone?: string;
  paroleConditions?: any;
  
  // Account Linking
  releaseCode?: string;
  mainUserId?: string;
  accountClaimed: boolean;
  claimedAt?: string;
  
  // Sync Metadata
  firstSyncedAt?: string;
  lastSyncedAt: string;
  syncMethod: 'auto' | 'manual' | 'release-day';
  dataVersion: number;
  
  // Status
  status: 'incarcerated' | 'released' | 'placed' | 'inactive';
  released: boolean;
  
  createdAt: string;
  updatedAt: string;
}

export interface Habit {
  id: string;
  prereleaseUserId: string;
  habitName: string;
  habitType: 'build' | 'break';
  habitCategory?: string;
  frequency: 'daily' | 'weekly';
  checkIns: Array<{
    date: string;
    completed: boolean;
    note?: string;
  }>;
  currentStreak: number;
  longestStreak: number;
  totalCompletions: number;
  totalDaysTracked: number;
  completionRate?: number;
  startedAt: string;
  lastCheckIn?: string;
  syncedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Certification {
  id: string;
  prereleaseUserId: string;
  certType: string;
  certName: string;
  issuingOrganization?: string;
  issueDate?: string;
  expiryDate?: string;
  verificationNumber?: string;
  verified: boolean;
  verifiedBy?: string;
  verifiedAt?: string;
  notes?: string;
  syncedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Goal {
  id: string;
  prereleaseUserId: string;
  goalCategory: '30-day' | '60-day' | '90-day';
  goalText: string;
  goalType?: 'employment' | 'housing' | 'education' | 'financial' | 'personal';
  why?: string;
  howSteps?: string[];
  supportNeeded?: string;
  deadline?: string;
  completed: boolean;
  completedAt?: string;
  outcome?: string;
  createdAt: string;
  updatedAt: string;
  syncedAt: string;
}

export interface Resume {
  id: string;
  prereleaseUserId: string;
  workHistory: Array<{
    company: string;
    title: string;
    startDate: string;
    endDate: string;
    duties: string[];
    achievements?: string[];
  }>;
  education: Array<{
    school: string;
    degree: string;
    graduationDate: string;
    gpa?: string;
  }>;
  skills: string[];
  references: Array<{
    name: string;
    relationship: string;
    phone: string;
    email?: string;
    company?: string;
  }>;
  desiredJobTitles: string[];
  desiredIndustries: string[];
  desiredSalaryMin?: number;
  desiredSalaryMax?: number;
  willingToRelocate: boolean;
  objectiveStatement?: string;
  coverLetterTemplate?: string;
  lastUpdated: string;
  syncedAt: string;
  createdAt: string;
}

export interface CheckIn {
  id: string;
  prereleaseUserId: string;
  checkInDate: string;
  moodRating?: number;
  energyLevel?: number;
  stressLevel?: number;
  gratitude?: string;
  learnedToday?: string;
  tomorrowGoal?: string;
  challenges?: string;
  journalEntry?: string;
  createdAt: string;
  syncedAt: string;
}

export interface JobOffer {
  id: string;
  employerId: string;
  employerName: string;
  prereleaseUserId: string;
  jobTitle: string;
  jobDescription?: string;
  salaryMin?: number;
  salaryMax?: number;
  jobType?: 'full-time' | 'part-time' | 'contract';
  startDate?: string;
  offerStatus: 'pending' | 'accepted' | 'declined' | 'withdrawn' | 'hired';
  offeredAt: string;
  responseDeadline?: string;
  candidateResponse?: 'accepted' | 'declined';
  candidateResponseAt?: string;
  candidateNotes?: string;
  hired: boolean;
  hireDate?: string;
  wotcClaimed: boolean;
  wotcAmount?: number;
  placementFee?: number;
  placementFeePaid: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EmployerSubscription {
  id: string;
  employerId: string;
  employerName: string;
  planType: 'basic' | 'priority' | 'exclusive';
  monthlyFee: number;
  maxCandidatesPerMonth?: number;
  priorityAccess: boolean;
  dedicatedSupport: boolean;
  preferredLocations?: string[];
  preferredSkills?: string[];
  preferredCertifications?: string[];
  status: 'active' | 'paused' | 'cancelled';
  stripeSubscriptionId?: string;
  currentPeriodStart?: string;
  currentPeriodEnd?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WOTCCredit {
  id: string;
  employerId: string;
  prereleaseUserId: string;
  hireId: string;
  wotcCategory: string;
  eligibleAmount: number;
  form8850Completed: boolean;
  form9061Completed: boolean;
  filedWithState: boolean;
  filedAt?: string;
  approvalStatus: 'pending' | 'approved' | 'denied';
  approvedAt?: string;
  approvedAmount?: number;
  fairpathFeePercentage: number;
  fairpathFeeAmount?: number;
  fairpathFeePaid: boolean;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function generateReleaseCode(): string {
  const digits = Math.floor(1000 + Math.random() * 9000);
  const letters = Math.random().toString(36).substr(2, 4).toUpperCase();
  return `FP-${digits}-${letters}`;
}

function calculateCompletionRate(checkIns: Array<{ completed: boolean }>): number {
  if (checkIns.length === 0) return 0;
  const completed = checkIns.filter(c => c.completed).length;
  return Math.round((completed / checkIns.length) * 100 * 100) / 100;
}

function calculateStreak(checkIns: Array<{ date: string; completed: boolean }>): number {
  if (checkIns.length === 0) return 0;
  
  // Sort by date descending
  const sorted = [...checkIns].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  let streak = 0;
  for (const checkIn of sorted) {
    if (checkIn.completed) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
}

function getDaysUntilRelease(releaseDate: string): number {
  const today = new Date();
  const release = new Date(releaseDate);
  const diff = release.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

// ============================================
// DATA SYNC FUNCTIONS
// ============================================

export async function syncPrereleaseData(data: {
  facility: string;
  facilityCode: string;
  syncTimestamp: number;
  users?: PrereleaseUser[];
  habits?: Habit[];
  certifications?: Certification[];
  goals?: Goal[];
  resumes?: Resume[];
  checkIns?: CheckIn[];
}) {
  const syncId = generateId('sync');
  const syncTime = new Date().toISOString();
  
  const results = {
    syncId,
    usersImported: 0,
    habitsImported: 0,
    certificationsImported: 0,
    goalsImported: 0,
    resumesImported: 0,
    checkInsImported: 0,
    errors: [] as string[]
  };
  
  try {
    // Import Users
    if (data.users) {
      for (const user of data.users) {
        try {
          const existing = await kv.get(`prerelease:user:${user.docNumber}`);
          
          const userData: PrereleaseUser = {
            ...user,
            lastSyncedAt: syncTime,
            firstSyncedAt: existing?.firstSyncedAt || syncTime,
            updatedAt: syncTime
          };
          
          // Store with multiple keys for easy lookup
          await kv.mset([
            [`prerelease:user:${user.docNumber}`, userData],
            [`prerelease:user:id:${user.id}`, userData],
            [`prerelease:facility:${data.facilityCode}:user:${user.id}`, userData]
          ]);
          
          results.usersImported++;
          
          // Check if release is within 30 days - send employer notifications
          const daysUntil = getDaysUntilRelease(user.releaseDate);
          if (daysUntil <= 30 && daysUntil > 0) {
            await notifyEmployersOfUpcomingRelease(userData, daysUntil);
          }
        } catch (error) {
          results.errors.push(`User ${user.docNumber}: ${error.message}`);
        }
      }
    }
    
    // Import Habits
    if (data.habits) {
      for (const habit of data.habits) {
        try {
          const habitData: Habit = {
            ...habit,
            completionRate: calculateCompletionRate(habit.checkIns),
            currentStreak: calculateStreak(habit.checkIns),
            syncedAt: syncTime,
            updatedAt: syncTime
          };
          
          await kv.mset([
            [`prerelease:habit:${habit.id}`, habitData],
            [`prerelease:user:${habit.prereleaseUserId}:habit:${habit.id}`, habitData]
          ]);
          
          results.habitsImported++;
        } catch (error) {
          results.errors.push(`Habit ${habit.id}: ${error.message}`);
        }
      }
    }
    
    // Import Certifications
    if (data.certifications) {
      for (const cert of data.certifications) {
        try {
          await kv.mset([
            [`prerelease:cert:${cert.id}`, cert],
            [`prerelease:user:${cert.prereleaseUserId}:cert:${cert.id}`, cert]
          ]);
          results.certificationsImported++;
        } catch (error) {
          results.errors.push(`Cert ${cert.id}: ${error.message}`);
        }
      }
    }
    
    // Import Goals
    if (data.goals) {
      for (const goal of data.goals) {
        try {
          await kv.mset([
            [`prerelease:goal:${goal.id}`, goal],
            [`prerelease:user:${goal.prereleaseUserId}:goal:${goal.id}`, goal]
          ]);
          results.goalsImported++;
        } catch (error) {
          results.errors.push(`Goal ${goal.id}: ${error.message}`);
        }
      }
    }
    
    // Import Resumes
    if (data.resumes) {
      for (const resume of data.resumes) {
        try {
          await kv.mset([
            [`prerelease:resume:${resume.id}`, resume],
            [`prerelease:user:${resume.prereleaseUserId}:resume`, resume]
          ]);
          results.resumesImported++;
        } catch (error) {
          results.errors.push(`Resume ${resume.id}: ${error.message}`);
        }
      }
    }
    
    // Import Check-ins
    if (data.checkIns) {
      for (const checkIn of data.checkIns) {
        try {
          await kv.mset([
            [`prerelease:checkin:${checkIn.id}`, checkIn],
            [`prerelease:user:${checkIn.prereleaseUserId}:checkin:${checkIn.checkInDate}`, checkIn]
          ]);
          results.checkInsImported++;
        } catch (error) {
          results.errors.push(`Check-in ${checkIn.id}: ${error.message}`);
        }
      }
    }
    
    // Log sync
    await kv.set(`prerelease:sync:${syncId}`, {
      syncId,
      facility: data.facility,
      facilityCode: data.facilityCode,
      syncedAt: syncTime,
      results
    });
    
    return results;
  } catch (error) {
    throw new Error(`Sync failed: ${error.message}`);
  }
}

// ============================================
// EMPLOYER NOTIFICATION SYSTEM
// ============================================

async function notifyEmployersOfUpcomingRelease(user: PrereleaseUser, daysUntil: number) {
  // Get all active employer subscriptions
  const subscriptions = await kv.getByPrefix('prerelease:employer:subscription:');
  
  for (const sub of subscriptions as EmployerSubscription[]) {
    if (sub.status !== 'active') continue;
    
    // Check if candidate matches employer preferences
    const matches = await checkCandidateMatch(user.id, sub);
    
    if (matches) {
      // Create notification
      const notifId = generateId('notif');
      await kv.set(`prerelease:notification:${notifId}`, {
        id: notifId,
        employerId: sub.employerId,
        employerName: sub.employerName,
        candidateId: user.id,
        candidateName: user.fullName,
        releaseDate: user.releaseDate,
        daysUntilRelease: daysUntil,
        message: `${user.fullName} releases in ${daysUntil} days from ${user.facilityName}`,
        type: daysUntil <= 7 ? 'urgent' : 'upcoming',
        read: false,
        createdAt: new Date().toISOString()
      });
    }
  }
}

async function checkCandidateMatch(userId: string, subscription: EmployerSubscription): Promise<boolean> {
  const user = await kv.get(`prerelease:user:id:${userId}`) as PrereleaseUser;
  const resume = await kv.get(`prerelease:user:${userId}:resume`) as Resume;
  
  if (!user || !resume) return false;
  
  // Check location match
  if (subscription.preferredLocations && subscription.preferredLocations.length > 0) {
    const locationMatch = subscription.preferredLocations.some(loc => 
      user.releasingToCity?.toLowerCase().includes(loc.toLowerCase()) ||
      user.releasingToState?.toLowerCase().includes(loc.toLowerCase())
    );
    if (!locationMatch) return false;
  }
  
  // Check skills match
  if (subscription.preferredSkills && subscription.preferredSkills.length > 0) {
    const skillsMatch = subscription.preferredSkills.some(skill =>
      resume.skills.some(s => s.toLowerCase().includes(skill.toLowerCase()))
    );
    if (!skillsMatch) return false;
  }
  
  return true;
}

// ============================================
// EMPLOYER PORTAL - CANDIDATE SEARCH
// ============================================

export async function searchCandidates(filters: {
  location?: string;
  skills?: string[];
  certifications?: string[];
  releaseDateStart?: string;
  releaseDateEnd?: string;
  status?: string;
}) {
  // Get all users
  const allUsers = await kv.getByPrefix('prerelease:user:id:') as PrereleaseUser[];
  
  let candidates = allUsers.filter(user => user.status === 'incarcerated');
  
  // Filter by location
  if (filters.location) {
    candidates = candidates.filter(user =>
      user.releasingToCity?.toLowerCase().includes(filters.location!.toLowerCase()) ||
      user.releasingToState?.toLowerCase().includes(filters.location!.toLowerCase())
    );
  }
  
  // Filter by release date
  if (filters.releaseDateStart) {
    candidates = candidates.filter(user =>
      new Date(user.releaseDate) >= new Date(filters.releaseDateStart!)
    );
  }
  
  if (filters.releaseDateEnd) {
    candidates = candidates.filter(user =>
      new Date(user.releaseDate) <= new Date(filters.releaseDateEnd!)
    );
  }
  
  // Enrich with additional data
  const enrichedCandidates = await Promise.all(
    candidates.map(async (user) => {
      const resume = await kv.get(`prerelease:user:${user.id}:resume`) as Resume;
      const habits = await kv.getByPrefix(`prerelease:user:${user.id}:habit:`) as Habit[];
      const certs = await kv.getByPrefix(`prerelease:user:${user.id}:cert:`) as Certification[];
      const goals = await kv.getByPrefix(`prerelease:user:${user.id}:goal:`) as Goal[];
      
      // Calculate readiness score
      const readinessScore = calculateReadinessScore(user, resume, habits, certs, goals);
      
      return {
        ...user,
        resume,
        habits,
        certifications: certs,
        goals,
        readinessScore,
        daysUntilRelease: getDaysUntilRelease(user.releaseDate)
      };
    })
  );
  
  // Filter by skills if provided
  if (filters.skills && filters.skills.length > 0) {
    return enrichedCandidates.filter(candidate =>
      candidate.resume && filters.skills!.some(skill =>
        candidate.resume.skills.some(s => s.toLowerCase().includes(skill.toLowerCase()))
      )
    );
  }
  
  // Filter by certifications if provided
  if (filters.certifications && filters.certifications.length > 0) {
    return enrichedCandidates.filter(candidate =>
      candidate.certifications && filters.certifications!.some(cert =>
        candidate.certifications.some(c => c.certType.toLowerCase().includes(cert.toLowerCase()))
      )
    );
  }
  
  return enrichedCandidates;
}

function calculateReadinessScore(
  user: PrereleaseUser,
  resume: Resume | null,
  habits: Habit[],
  certs: Certification[],
  goals: Goal[]
): number {
  let score = 0;
  
  // Resume completion (30 points)
  if (resume) {
    if (resume.workHistory.length > 0) score += 10;
    if (resume.skills.length >= 3) score += 10;
    if (resume.objectiveStatement) score += 5;
    if (resume.references.length > 0) score += 5;
  }
  
  // Habit tracking (30 points)
  if (habits.length > 0) {
    const avgCompletion = habits.reduce((sum, h) => sum + (h.completionRate || 0), 0) / habits.length;
    score += Math.round(avgCompletion * 0.3);
  }
  
  // Certifications (20 points)
  score += Math.min(certs.length * 5, 20);
  
  // Goals (20 points)
  if (goals.length >= 3) score += 10;
  const completedGoals = goals.filter(g => g.completed).length;
  score += Math.min(completedGoals * 5, 10);
  
  return Math.min(score, 100);
}

// ============================================
// JOB OFFER MANAGEMENT
// ============================================

export async function createJobOffer(offer: Omit<JobOffer, 'id' | 'createdAt' | 'updatedAt' | 'offerStatus' | 'hired' | 'wotcClaimed' | 'placementFeePaid' | 'offeredAt'>): Promise<JobOffer> {
  const offerId = generateId('offer');
  const now = new Date().toISOString();
  
  const jobOffer: JobOffer = {
    ...offer,
    id: offerId,
    offerStatus: 'pending',
    offeredAt: now,
    hired: false,
    wotcClaimed: false,
    placementFeePaid: false,
    createdAt: now,
    updatedAt: now
  };
  
  await kv.mset([
    [`prerelease:offer:${offerId}`, jobOffer],
    [`prerelease:employer:${offer.employerId}:offer:${offerId}`, jobOffer],
    [`prerelease:candidate:${offer.prereleaseUserId}:offer:${offerId}`, jobOffer]
  ]);
  
  return jobOffer;
}

export async function updateJobOffer(offerId: string, updates: Partial<JobOffer>): Promise<JobOffer> {
  const existing = await kv.get(`prerelease:offer:${offerId}`) as JobOffer;
  
  if (!existing) {
    throw new Error('Offer not found');
  }
  
  const updated: JobOffer = {
    ...existing,
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  await kv.mset([
    [`prerelease:offer:${offerId}`, updated],
    [`prerelease:employer:${existing.employerId}:offer:${offerId}`, updated],
    [`prerelease:candidate:${existing.prereleaseUserId}:offer:${offerId}`, updated]
  ]);
  
  return updated;
}

export async function getEmployerOffers(employerId: string): Promise<JobOffer[]> {
  return await kv.getByPrefix(`prerelease:employer:${employerId}:offer:`) as JobOffer[];
}

export async function getCandidateOffers(candidateId: string): Promise<JobOffer[]> {
  return await kv.getByPrefix(`prerelease:candidate:${candidateId}:offer:`) as JobOffer[];
}

// ============================================
// WOTC MANAGEMENT
// ============================================

export async function initiateWOTC(data: {
  employerId: string;
  prereleaseUserId: string;
  hireId: string;
  wotcCategory: string;
  eligibleAmount: number;
}): Promise<WOTCCredit> {
  const wotcId = generateId('wotc');
  const now = new Date().toISOString();
  
  const wotc: WOTCCredit = {
    id: wotcId,
    employerId: data.employerId,
    prereleaseUserId: data.prereleaseUserId,
    hireId: data.hireId,
    wotcCategory: data.wotcCategory,
    eligibleAmount: data.eligibleAmount,
    form8850Completed: false,
    form9061Completed: false,
    filedWithState: false,
    approvalStatus: 'pending',
    fairpathFeePercentage: 15.00,
    fairpathFeeAmount: Math.round(data.eligibleAmount * 0.15),
    fairpathFeePaid: false,
    createdAt: now,
    updatedAt: now
  };
  
  await kv.mset([
    [`prerelease:wotc:${wotcId}`, wotc],
    [`prerelease:employer:${data.employerId}:wotc:${wotcId}`, wotc],
    [`prerelease:hire:${data.hireId}:wotc`, wotc]
  ]);
  
  return wotc;
}

export async function updateWOTC(wotcId: string, updates: Partial<WOTCCredit>): Promise<WOTCCredit> {
  const existing = await kv.get(`prerelease:wotc:${wotcId}`) as WOTCCredit;
  
  if (!existing) {
    throw new Error('WOTC record not found');
  }
  
  const updated: WOTCCredit = {
    ...existing,
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  await kv.mset([
    [`prerelease:wotc:${wotcId}`, updated],
    [`prerelease:employer:${existing.employerId}:wotc:${wotcId}`, updated],
    [`prerelease:hire:${existing.hireId}:wotc`, updated]
  ]);
  
  return updated;
}

// ============================================
// ACCOUNT CLAIM (Release Day)
// ============================================

export async function claimAccount(releaseCode: string, phoneNumber: string, email?: string) {
  // Find user by release code
  const allUsers = await kv.getByPrefix('prerelease:user:id:') as PrereleaseUser[];
  const user = allUsers.find(u => u.releaseCode === releaseCode);
  
  if (!user) {
    throw new Error('Invalid release code');
  }
  
  if (user.accountClaimed) {
    throw new Error('Account already claimed');
  }
  
  // Update user with contact info
  const updated: PrereleaseUser = {
    ...user,
    phoneNumber,
    email,
    accountClaimed: true,
    claimedAt: new Date().toISOString(),
    status: 'released',
    released: true,
    actualReleaseDate: new Date().toISOString().split('T')[0],
    updatedAt: new Date().toISOString()
  };
  
  await kv.mset([
    [`prerelease:user:${user.docNumber}`, updated],
    [`prerelease:user:id:${user.id}`, updated],
    [`prerelease:facility:${user.facilityCode}:user:${user.id}`, updated]
  ]);
  
  return updated;
}

// ============================================
// ADMIN DASHBOARD - ANALYTICS
// ============================================

export async function getAdminAnalytics() {
  const allUsers = await kv.getByPrefix('prerelease:user:id:') as PrereleaseUser[];
  const allOffers = await kv.getByPrefix('prerelease:offer:') as JobOffer[];
  const allWOTC = await kv.getByPrefix('prerelease:wotc:') as WOTCCredit[];
  const allSyncs = await kv.getByPrefix('prerelease:sync:');
  
  // User statistics
  const totalUsers = allUsers.length;
  const incarcerated = allUsers.filter(u => u.status === 'incarcerated').length;
  const released = allUsers.filter(u => u.status === 'released').length;
  const placed = allUsers.filter(u => u.status === 'placed').length;
  
  // Release timeline
  const releasing30Days = allUsers.filter(u => {
    const days = getDaysUntilRelease(u.releaseDate);
    return days <= 30 && days > 0;
  }).length;
  
  const releasing60Days = allUsers.filter(u => {
    const days = getDaysUntilRelease(u.releaseDate);
    return days <= 60 && days > 0;
  }).length;
  
  const releasing90Days = allUsers.filter(u => {
    const days = getDaysUntilRelease(u.releaseDate);
    return days <= 90 && days > 0;
  }).length;
  
  // Offer statistics
  const totalOffers = allOffers.length;
  const pendingOffers = allOffers.filter(o => o.offerStatus === 'pending').length;
  const acceptedOffers = allOffers.filter(o => o.offerStatus === 'accepted').length;
  const hires = allOffers.filter(o => o.hired).length;
  
  // WOTC statistics
  const totalWOTCCredits = allWOTC.reduce((sum, w) => sum + (w.approvedAmount || w.eligibleAmount), 0);
  const fairpathWOTCRevenue = allWOTC.reduce((sum, w) => sum + (w.fairpathFeeAmount || 0), 0);
  
  // Placement revenue
  const placementRevenue = allOffers
    .filter(o => o.hired && o.placementFeePaid)
    .reduce((sum, o) => sum + (o.placementFee || 0), 0);
  
  // Facility breakdown
  const facilityCounts = allUsers.reduce((acc, user) => {
    acc[user.facilityName] = (acc[user.facilityName] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Sync health
  const lastSync = allSyncs.length > 0 
    ? allSyncs.sort((a: any, b: any) => 
        new Date(b.syncedAt).getTime() - new Date(a.syncedAt).getTime()
      )[0]
    : null;
  
  return {
    users: {
      total: totalUsers,
      incarcerated,
      released,
      placed,
      releasing30Days,
      releasing60Days,
      releasing90Days
    },
    offers: {
      total: totalOffers,
      pending: pendingOffers,
      accepted: acceptedOffers,
      hires
    },
    revenue: {
      placementFees: placementRevenue,
      wotcFees: fairpathWOTCRevenue,
      total: placementRevenue + fairpathWOTCRevenue
    },
    wotc: {
      totalCreditsGenerated: totalWOTCCredits,
      fairpathRevenue: fairpathWOTCRevenue,
      creditsProcessed: allWOTC.length
    },
    facilities: facilityCounts,
    sync: {
      lastSyncTime: lastSync?.syncedAt || 'Never',
      totalSyncs: allSyncs.length
    }
  };
}

export async function getSystemHealth() {
  const now = Date.now();
  const allSyncs = await kv.getByPrefix('prerelease:sync:');
  const allUsers = await kv.getByPrefix('prerelease:user:id:');
  
  // Check last sync time
  const lastSync = allSyncs.length > 0
    ? allSyncs.sort((a: any, b: any) =>
        new Date(b.syncedAt).getTime() - new Date(a.syncedAt).getTime()
      )[0]
    : null;
  
  const hoursSinceLastSync = lastSync
    ? (now - new Date(lastSync.syncedAt).getTime()) / (1000 * 60 * 60)
    : 999;
  
  const syncHealthy = hoursSinceLastSync < 48; // Alert if no sync in 48 hours
  
  return {
    status: syncHealthy ? 'healthy' : 'warning',
    lastSync: lastSync?.syncedAt || 'Never',
    hoursSinceLastSync: Math.round(hoursSinceLastSync),
    totalUsers: allUsers.length,
    totalSyncs: allSyncs.length,
    timestamp: new Date().toISOString()
  };
}
