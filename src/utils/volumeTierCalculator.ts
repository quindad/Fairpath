/**
 * SingleKey Volume Tier Calculator
 * 
 * Calculates the current SingleKey pricing tier based on monthly report volume
 * and provides cost/profitability metrics.
 */

export interface SingleKeyTier {
  tier: 1 | 2 | 3 | 4;
  name: string;
  minReports: number;
  maxReports: number | null;
  costPerReport: number;
  platformGross: number; // Always $30 (40% of $75)
  platformNet: number; // After SingleKey cost
  profitMargin: number; // Percentage
}

export const SINGLEKEY_TIERS: SingleKeyTier[] = [
  {
    tier: 1,
    name: 'Startup',
    minReports: 1,
    maxReports: 99,
    costPerReport: 21.99,
    platformGross: 30.00,
    platformNet: 8.01,
    profitMargin: 26.7
  },
  {
    tier: 2,
    name: 'Growth',
    minReports: 100,
    maxReports: 199,
    costPerReport: 21.99,
    platformGross: 30.00,
    platformNet: 8.01,
    profitMargin: 26.7
  },
  {
    tier: 3,
    name: 'Scale',
    minReports: 200,
    maxReports: 499,
    costPerReport: 19.99,
    platformGross: 30.00,
    platformNet: 10.01,
    profitMargin: 33.4
  },
  {
    tier: 4,
    name: 'Enterprise',
    minReports: 500,
    maxReports: null,
    costPerReport: 17.99,
    platformGross: 30.00,
    platformNet: 12.01,
    profitMargin: 40.0
  }
];

/**
 * Get the current tier based on monthly report count
 */
export function getCurrentTier(monthlyReports: number): SingleKeyTier {
  for (const tier of SINGLEKEY_TIERS) {
    if (monthlyReports >= tier.minReports && 
        (tier.maxReports === null || monthlyReports <= tier.maxReports)) {
      return tier;
    }
  }
  // Default to tier 1 if somehow no match
  return SINGLEKEY_TIERS[0];
}

/**
 * Get the next tier and how many reports needed to reach it
 */
export function getNextTierInfo(monthlyReports: number): {
  currentTier: SingleKeyTier;
  nextTier: SingleKeyTier | null;
  reportsToNextTier: number;
  monthlySavingsAtNextTier: number;
} {
  const currentTier = getCurrentTier(monthlyReports);
  
  // Find next tier
  const nextTier = SINGLEKEY_TIERS.find(t => t.tier === currentTier.tier + 1) || null;
  
  if (!nextTier) {
    return {
      currentTier,
      nextTier: null,
      reportsToNextTier: 0,
      monthlySavingsAtNextTier: 0
    };
  }
  
  const reportsToNextTier = Math.max(0, nextTier.minReports - monthlyReports);
  const savingsPerReport = currentTier.costPerReport - nextTier.costPerReport;
  const monthlySavingsAtNextTier = savingsPerReport * nextTier.minReports;
  
  return {
    currentTier,
    nextTier,
    reportsToNextTier,
    monthlySavingsAtNextTier
  };
}

/**
 * Calculate monthly platform revenue based on report count
 */
export function calculateMonthlyRevenue(monthlyReports: number): {
  tier: SingleKeyTier;
  totalApplicationFees: number;
  landlordRevenue: number;
  platformGross: number;
  singleKeyCosts: number;
  platformNet: number;
  profitMargin: number;
} {
  const tier = getCurrentTier(monthlyReports);
  
  const totalApplicationFees = monthlyReports * 75; // $75 per application
  const landlordRevenue = monthlyReports * 45; // $45 per app (60% share, assuming they rent)
  const platformGross = monthlyReports * 30; // $30 per app (40% share)
  const singleKeyCosts = monthlyReports * tier.costPerReport;
  const platformNet = platformGross - singleKeyCosts;
  const profitMargin = (platformNet / totalApplicationFees) * 100;
  
  return {
    tier,
    totalApplicationFees,
    landlordRevenue,
    platformGross,
    singleKeyCosts,
    platformNet,
    profitMargin
  };
}

/**
 * Calculate yearly projection with growth
 */
export function calculateYearlyProjection(
  currentMonthlyReports: number,
  monthlyGrowthRate: number // e.g., 0.15 for 15% growth
): {
  month: number;
  reports: number;
  tier: SingleKeyTier;
  platformNet: number;
  cumulativeNet: number;
}[] {
  const projection = [];
  let cumulativeNet = 0;
  
  for (let month = 1; month <= 12; month++) {
    const reports = Math.round(currentMonthlyReports * Math.pow(1 + monthlyGrowthRate, month - 1));
    const revenue = calculateMonthlyRevenue(reports);
    cumulativeNet += revenue.platformNet;
    
    projection.push({
      month,
      reports,
      tier: revenue.tier,
      platformNet: revenue.platformNet,
      cumulativeNet
    });
  }
  
  return projection;
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
 * Format percentage
 */
export function formatPercent(percent: number): string {
  return `${percent.toFixed(1)}%`;
}

/**
 * Get tier badge color
 */
export function getTierColor(tier: 1 | 2 | 3 | 4): string {
  const colors = {
    1: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    2: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    3: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    4: 'bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30'
  };
  return colors[tier];
}
