/**
 * ELIGIBILITY MATCHER
 * 
 * This component provides the logic for matching users with jobs/housing
 * based on their conviction categories and employer/landlord restrictions.
 * 
 * This is the CORE matching engine for the entire Friend A Felon platform.
 */

export interface ConvictionRecord {
  categories: string[]; // e.g., ['Drug Offenses', 'Property Crimes']
  specificOffenses: string[]; // e.g., ['Possession', 'Theft']
  convictionDate: string; // ISO date string
  releaseDate: string; // ISO date string
}

export interface OpportunityRestrictions {
  acceptedCategories?: string[]; // If empty, accepts all
  excludedCategories?: string[]; // Categories they won't accept
  minYearsSinceConviction?: number;
  minYearsSinceRelease?: number;
  requiresBackgroundCheck?: boolean;
}

export interface UserProfile {
  convictionRecord: ConvictionRecord;
  isVeteran: boolean;
  receivingTANF: boolean;
  receivingSNAP: boolean;
  receivingSSI: boolean;
  unemploymentMonths: number;
  ageAtConviction: number;
  onSupervision: boolean;
  inEZorTEA: boolean;
  isFairPathPlus: boolean;
}

export interface WOTCEligibility {
  isEligible: boolean;
  categories: string[];
  estimatedCredit: number;
}

/**
 * Check if a user is eligible for a specific opportunity
 */
export function checkEligibility(
  userProfile: UserProfile,
  restrictions: OpportunityRestrictions
): { eligible: boolean; reasons: string[] } {
  const reasons: string[] = [];
  let eligible = true;

  const convictionRecord = userProfile.convictionRecord;

  // Check category exclusions
  if (restrictions.excludedCategories && restrictions.excludedCategories.length > 0) {
    const hasExcludedCategory = convictionRecord.categories.some(cat =>
      restrictions.excludedCategories!.includes(cat)
    );

    if (hasExcludedCategory) {
      eligible = false;
      reasons.push('Your conviction category is excluded by this employer/landlord');
    }
  }

  // Check category requirements (if acceptedCategories is specified)
  if (restrictions.acceptedCategories && restrictions.acceptedCategories.length > 0) {
    const hasAcceptedCategory = convictionRecord.categories.some(cat =>
      restrictions.acceptedCategories!.includes(cat)
    );

    if (!hasAcceptedCategory) {
      eligible = false;
      reasons.push('Your conviction category is not in the accepted list');
    }
  }

  // Check years since conviction
  if (restrictions.minYearsSinceConviction) {
    const yearsSinceConviction = getYearsSinceDate(convictionRecord.convictionDate);
    if (yearsSinceConviction < restrictions.minYearsSinceConviction) {
      eligible = false;
      reasons.push(`Requires ${restrictions.minYearsSinceConviction} years since conviction (you have ${yearsSinceConviction})`);
    }
  }

  // Check years since release
  if (restrictions.minYearsSinceRelease) {
    const yearsSinceRelease = getYearsSinceDate(convictionRecord.releaseDate);
    if (yearsSinceRelease < restrictions.minYearsSinceRelease) {
      eligible = false;
      reasons.push(`Requires ${restrictions.minYearsSinceRelease} years since release (you have ${yearsSinceRelease})`);
    }
  }

  if (eligible) {
    reasons.push('You meet all eligibility requirements for this opportunity');
  }

  return { eligible, reasons };
}

/**
 * Calculate WOTC eligibility for a user
 */
export function calculateWOTCEligibility(userProfile: UserProfile): WOTCEligibility {
  const categories: string[] = [];
  let estimatedCredit = 0;

  // Ex-Felon Category (up to $2,400)
  const yearsSinceRelease = getYearsSinceDate(userProfile.convictionRecord.releaseDate);
  if (yearsSinceRelease <= 1) {
    categories.push('Qualified Ex-Felon (hired within 1 year of release)');
    estimatedCredit = Math.max(estimatedCredit, 2400);
  }

  // Veteran Categories
  if (userProfile.isVeteran) {
    if (userProfile.unemploymentMonths >= 6) {
      categories.push('Long-Term Unemployed Veteran (6+ months)');
      estimatedCredit = Math.max(estimatedCredit, 9600); // Highest credit
    } else if (userProfile.unemploymentMonths >= 4) {
      categories.push('Unemployed Veteran (4-6 months)');
      estimatedCredit = Math.max(estimatedCredit, 5600);
    } else {
      categories.push('Veteran');
      estimatedCredit = Math.max(estimatedCredit, 2400);
    }
  }

  // SNAP Recipients (up to $2,400)
  if (userProfile.receivingSNAP) {
    const ageAtHire = userProfile.ageAtConviction + getYearsSinceDate(userProfile.convictionRecord.convictionDate);
    if (ageAtHire >= 18 && ageAtHire <= 39) {
      categories.push('SNAP Recipient (18-39 years old)');
      estimatedCredit = Math.max(estimatedCredit, 2400);
    }
  }

  // TANF Recipients (up to $9,000)
  if (userProfile.receivingTANF) {
    categories.push('TANF Recipient (Long-Term)');
    estimatedCredit = Math.max(estimatedCredit, 9000);
  }

  // SSI Recipients (up to $2,400)
  if (userProfile.receivingSSI) {
    categories.push('SSI Recipient');
    estimatedCredit = Math.max(estimatedCredit, 2400);
  }

  // Long-Term Unemployed (up to $2,400)
  if (userProfile.unemploymentMonths >= 6 && !userProfile.isVeteran) {
    categories.push('Long-Term Unemployed (27+ weeks)');
    estimatedCredit = Math.max(estimatedCredit, 2400);
  }

  // Empowerment Zone (up to $2,400)
  if (userProfile.inEZorTEA) {
    categories.push('Empowerment Zone / TEA Resident');
    estimatedCredit = Math.max(estimatedCredit, 2400);
  }

  return {
    isEligible: categories.length > 0,
    categories,
    estimatedCredit
  };
}

/**
 * Filter opportunities based on user eligibility
 */
export function filterOpportunities<T extends { restrictions: OpportunityRestrictions }>(
  opportunities: T[],
  userProfile: UserProfile
): { eligible: T[]; ineligible: T[] } {
  const eligible: T[] = [];
  const ineligible: T[] = [];

  opportunities.forEach(opportunity => {
    const { eligible: isEligible } = checkEligibility(userProfile, opportunity.restrictions);
    if (isEligible) {
      eligible.push(opportunity);
    } else {
      ineligible.push(opportunity);
    }
  });

  return { eligible, ineligible };
}

/**
 * Get eligibility badge color and text
 */
export function getEligibilityBadge(
  userProfile: UserProfile,
  restrictions: OpportunityRestrictions
): { color: string; text: string; icon: '✓' | '⚠' | '✗' } {
  const { eligible, reasons } = checkEligibility(userProfile, restrictions);

  if (eligible) {
    return {
      color: 'text-[#A8F32C] bg-[#A8F32C]/10 border-[#A8F32C]/30',
      text: 'Eligible for Your Record',
      icon: '✓'
    };
  }

  // Check if it's a time-based restriction (soft rejection)
  const hasTimeRestriction = reasons.some(r => r.includes('years since'));
  if (hasTimeRestriction) {
    return {
      color: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30',
      text: 'Not Yet Eligible (Time-Based)',
      icon: '⚠'
    };
  }

  return {
    color: 'text-red-500 bg-red-500/10 border-red-500/30',
    text: 'May Not Accept Your Record',
    icon: '✗'
  };
}

/**
 * Helper: Calculate years since a date
 */
function getYearsSinceDate(dateString: string): number {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
  return Math.floor(diffYears * 10) / 10; // Round to 1 decimal
}

/**
 * Helper: Check if user has FairPath+ benefits
 */
export function getFairPathPlusBenefits(isFairPathPlus: boolean) {
  return {
    hasFastTrackDiscount: isFairPathPlus, // $65 instead of $75
    hasMarketplaceClaims: isFairPathPlus ? 7 : 1,
    hasAdFree: isFairPathPlus,
    hasVerifiedBadge: isFairPathPlus,
    canSeeFairPathStaffingJobs: isFairPathPlus,
    hasPriorityResourceAccess: isFairPathPlus
  };
}

/**
 * Example usage in a component:
 * 
 * const userProfile: UserProfile = {
 *   convictionRecord: {
 *     categories: ['Drug Offenses'],
 *     specificOffenses: ['Possession'],
 *     convictionDate: '2020-03-15',
 *     releaseDate: '2023-01-10'
 *   },
 *   isVeteran: false,
 *   receivingTANF: false,
 *   receivingSNAP: true,
 *   receivingSSI: false,
 *   unemploymentMonths: 8,
 *   ageAtConviction: 25,
 *   onSupervision: true,
 *   inEZorTEA: false,
 *   isFairPathPlus: true
 * };
 * 
 * const jobRestrictions: OpportunityRestrictions = {
 *   excludedCategories: ['Violent Offenses', 'Sex Offenses'],
 *   minYearsSinceRelease: 2
 * };
 * 
 * const { eligible, reasons } = checkEligibility(userProfile, jobRestrictions);
 * const wotcEligibility = calculateWOTCEligibility(userProfile);
 * const badge = getEligibilityBadge(userProfile, jobRestrictions);
 */
