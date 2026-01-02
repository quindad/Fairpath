/**
 * Revenue Calculator for FastTrack Applications
 * 
 * Handles the 60/40 revenue split with landlord accountability system
 */

import { getCurrentTier } from './volumeTierCalculator';

export interface ApplicationRevenue {
  applicantPaid: number;
  landlordRevenue: number;
  landlordRate: number; // 60% or 36%
  platformGross: number;
  platformNet: number;
  singleKeyCost: number;
  impactFund: number;
  ispenalty: boolean;
}

/**
 * Calculate revenue for a single FastTrack application
 */
export function calculateApplicationRevenue(
  applicantTier: 'standard' | 'fairpath+',
  landlordDidRent: boolean,
  monthlyReportVolume: number
): ApplicationRevenue {
  // Applicant payment
  const applicantPaid = applicantTier === 'fairpath+' ? 65 : 75;
  
  // Platform always gets 40% of the full amount
  const platformGross = applicantPaid * 0.40;
  
  // Get SingleKey cost based on volume
  const tier = getCurrentTier(monthlyReportVolume);
  const singleKeyCost = tier.costPerReport;
  
  // Platform NET after paying SingleKey
  const platformNet = platformGross - singleKeyCost;
  
  let landlordRevenue: number;
  let landlordRate: number;
  let impactFund: number;
  let isPenalty: boolean;
  
  if (landlordDidRent) {
    // ✅ Landlord rented to felon - full 60% share
    landlordRevenue = applicantPaid * 0.60;
    landlordRate = 60;
    impactFund = 0;
    isPenalty = false;
  } else {
    // ❌ Landlord didn't rent - penalty rate
    // Landlord gets 36% (60% of their original 60%)
    landlordRevenue = applicantPaid * 0.36;
    landlordRate = 36;
    
    // Impact Fund gets 24% (40% of landlord's original 60%)
    impactFund = applicantPaid * 0.24;
    isPenalty = true;
  }
  
  return {
    applicantPaid,
    landlordRevenue,
    landlordRate,
    platformGross,
    platformNet,
    singleKeyCost,
    impactFund,
    isPenalty
  };
}

/**
 * Calculate cumulative revenue for multiple applications
 */
export function calculateCumulativeRevenue(
  applications: Array<{
    applicantTier: 'standard' | 'fairpath+';
    landlordDidRent: boolean;
  }>,
  monthlyReportVolume: number
): {
  totalApplicantFees: number;
  totalLandlordRevenue: number;
  totalPlatformGross: number;
  totalPlatformNet: number;
  totalSingleKeyCosts: number;
  totalImpactFund: number;
  penaltyCount: number;
  rentalSuccessRate: number;
} {
  let totalApplicantFees = 0;
  let totalLandlordRevenue = 0;
  let totalPlatformGross = 0;
  let totalPlatformNet = 0;
  let totalSingleKeyCosts = 0;
  let totalImpactFund = 0;
  let penaltyCount = 0;
  let rentalCount = 0;
  
  applications.forEach(app => {
    const revenue = calculateApplicationRevenue(
      app.applicantTier,
      app.landlordDidRent,
      monthlyReportVolume
    );
    
    totalApplicantFees += revenue.applicantPaid;
    totalLandlordRevenue += revenue.landlordRevenue;
    totalPlatformGross += revenue.platformGross;
    totalPlatformNet += revenue.platformNet;
    totalSingleKeyCosts += revenue.singleKeyCost;
    totalImpactFund += revenue.impactFund;
    
    if (revenue.isPenalty) {
      penaltyCount++;
    } else {
      rentalCount++;
    }
  });
  
  const rentalSuccessRate = applications.length > 0 
    ? (rentalCount / applications.length) * 100 
    : 0;
  
  return {
    totalApplicantFees,
    totalLandlordRevenue,
    totalPlatformGross,
    totalPlatformNet,
    totalSingleKeyCosts,
    totalImpactFund,
    penaltyCount,
    rentalSuccessRate
  };
}

/**
 * Calculate landlord earnings over time with accountability
 */
export function calculateLandlordEarnings(
  totalApplications: number,
  rentedWithin20Apps: boolean,
  rentedWithin60Days: boolean,
  monthlyReportVolume: number
): {
  applications: number;
  earningsAt60Percent: number;
  earningsAt36Percent: number;
  actualEarnings: number;
  lostToImpactFund: number;
  percentageLost: number;
} {
  const meetsRequirement = rentedWithin20Apps || rentedWithin60Days;
  
  const earningsAt60Percent = totalApplications * 45; // $45 per app at 60%
  const earningsAt36Percent = totalApplications * 27; // $27 per app at 36%
  const actualEarnings = meetsRequirement ? earningsAt60Percent : earningsAt36Percent;
  const lostToImpactFund = meetsRequirement ? 0 : (totalApplications * 18); // $18 per app to fund
  const percentageLost = meetsRequirement ? 0 : 40; // They lose 40% of their potential earnings
  
  return {
    applications: totalApplications,
    earningsAt60Percent,
    earningsAt36Percent,
    actualEarnings,
    lostToImpactFund,
    percentageLost
  };
}

/**
 * Project Impact Fund balance
 */
export function calculateImpactFundProjection(
  monthlyPenaltyApplications: number,
  months: number
): {
  monthlyContribution: number;
  projectedBalance: number;
  estimatedPeopleHelped: number; // Assuming $500 average assistance
} {
  const monthlyContribution = monthlyPenaltyApplications * 18; // $18 per penalty app
  const projectedBalance = monthlyContribution * months;
  const estimatedPeopleHelped = Math.floor(projectedBalance / 500); // $500 per person average
  
  return {
    monthlyContribution,
    projectedBalance,
    estimatedPeopleHelped
  };
}

/**
 * Format currency
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

/**
 * Calculate breakeven point for platform
 */
export function calculateBreakeven(
  fixedMonthlyCosts: number, // Server, support, etc.
  monthlyReportVolume: number
): {
  costPerApplication: number;
  revenuePerApplication: number;
  profitPerApplication: number;
  breakEvenApplications: number;
  isBreakEven: boolean;
} {
  const tier = getCurrentTier(monthlyReportVolume);
  const platformNet = tier.platformNet; // NET after SingleKey
  
  const costPerApplication = (fixedMonthlyCosts / monthlyReportVolume) + tier.costPerReport;
  const revenuePerApplication = 30; // Platform always gets $30 gross
  const profitPerApplication = platformNet - (fixedMonthlyCosts / monthlyReportVolume);
  const breakEvenApplications = Math.ceil(fixedMonthlyCosts / platformNet);
  const isBreakEven = monthlyReportVolume >= breakEvenApplications;
  
  return {
    costPerApplication,
    revenuePerApplication,
    profitPerApplication,
    breakEvenApplications,
    isBreakEven
  };
}
