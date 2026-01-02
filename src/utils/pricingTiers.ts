/**
 * Pricing Tiers for FairPath Platform
 * 
 * FINAL PRICING - Approved by Sterling December 3, 2024
 */

export type SubscriptionTier = 'free' | 'plus' | 'pro';

export interface TierPricing {
  tier: SubscriptionTier;
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  marketplaceClaims: number;
  housingDiscount: number; // Amount off $75 base
  housingPrice: number; // Final price user pays
  servicesDiscount: number; // Amount off per booking
  hasAI: boolean;
  features: string[];
}

export const PRICING_TIERS: Record<SubscriptionTier, TierPricing> = {
  free: {
    tier: 'free',
    name: 'Free',
    monthlyPrice: 0,
    annualPrice: 0,
    marketplaceClaims: 2, // Freemium hook!
    housingDiscount: 0,
    housingPrice: 75,
    servicesDiscount: 0,
    hasAI: false,
    features: [
      '2 marketplace claims per month',
      'Browse jobs & housing',
      'Access to 13 Resource Center modules',
      'Basic profile',
      'In-app messaging'
    ]
  },
  plus: {
    tier: 'plus',
    name: 'FairPath+',
    monthlyPrice: 2,
    annualPrice: 24,
    marketplaceClaims: 5,
    housingDiscount: 5,
    housingPrice: 70,
    servicesDiscount: 5,
    hasAI: false,
    features: [
      '5 marketplace claims per month',
      '$5 off housing applications',
      '$5 off service bookings',
      'Priority support',
      'Exclusive deals',
      'All Free features'
    ]
  },
  pro: {
    tier: 'pro',
    name: 'FairPath Pro',
    monthlyPrice: 5,
    annualPrice: 60,
    marketplaceClaims: 10,
    housingDiscount: 10,
    housingPrice: 65,
    servicesDiscount: 10,
    hasAI: true,
    features: [
      '10 marketplace claims per month',
      '$10 off housing applications',
      '$10 off service bookings',
      'ALL 10 AI tools included',
      'AI chatbot (100 chats/month)',
      'Priority AI support',
      'Advanced analytics',
      'Early access to features',
      'All Plus features'
    ]
  }
};

/**
 * Get housing application price for a tier
 */
export function getHousingPrice(tier: SubscriptionTier): number {
  return PRICING_TIERS[tier].housingPrice;
}

/**
 * Get housing discount for a tier
 */
export function getHousingDiscount(tier: SubscriptionTier): number {
  return PRICING_TIERS[tier].housingDiscount;
}

/**
 * Get services discount for a tier
 */
export function getServicesDiscount(tier: SubscriptionTier): number {
  return PRICING_TIERS[tier].servicesDiscount;
}

/**
 * Get marketplace claim limit for a tier
 */
export function getMarketplaceClaimLimit(tier: SubscriptionTier): number {
  return PRICING_TIERS[tier].marketplaceClaims;
}

/**
 * Check if tier has AI access
 */
export function hasAIAccess(tier: SubscriptionTier): boolean {
  return PRICING_TIERS[tier].hasAI;
}

/**
 * Calculate landlord revenue based on application price and accountability status
 */
export function calculateLandlordRevenue(
  applicationPrice: number,
  landlordMeetsRequirement: boolean
): {
  landlordRevenue: number;
  landlordRate: number;
  platformRevenue: number;
  impactFundContribution: number;
} {
  const platformRevenue = applicationPrice * 0.40; // Platform always gets 40%
  
  if (landlordMeetsRequirement) {
    // Landlord rented within 20 apps or 60 days - full 60% share
    return {
      landlordRevenue: applicationPrice * 0.60,
      landlordRate: 60,
      platformRevenue,
      impactFundContribution: 0
    };
  } else {
    // Landlord didn't rent - penalty 36% share
    return {
      landlordRevenue: applicationPrice * 0.36,
      landlordRate: 36,
      platformRevenue,
      impactFundContribution: applicationPrice * 0.24 // 24% to Impact Fund
    };
  }
}

/**
 * Calculate landlord revenue for all three tier prices
 */
export function calculateAllTierRevenues(landlordMeetsRequirement: boolean): Array<{
  tier: SubscriptionTier;
  applicationPrice: number;
  landlordRevenue: number;
  platformRevenue: number;
  impactFundContribution: number;
}> {
  return ['free', 'plus', 'pro'].map((tier) => {
    const tierData = PRICING_TIERS[tier as SubscriptionTier];
    const revenue = calculateLandlordRevenue(
      tierData.housingPrice,
      landlordMeetsRequirement
    );
    
    return {
      tier: tier as SubscriptionTier,
      applicationPrice: tierData.housingPrice,
      ...revenue
    };
  });
}

/**
 * Format currency
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount);
}

/**
 * Get tier color classes for UI
 */
export function getTierColor(tier: SubscriptionTier): string {
  const colors = {
    free: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    plus: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    pro: 'bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30'
  };
  return colors[tier];
}

/**
 * Get tier name with formatting
 */
export function getTierDisplayName(tier: SubscriptionTier): string {
  return PRICING_TIERS[tier].name;
}

/**
 * Calculate savings compared to Free tier
 */
export function calculateSavings(tier: SubscriptionTier, applicationsPerYear: number): number {
  const freeTierCost = PRICING_TIERS.free.housingPrice * applicationsPerYear;
  const tierCost = PRICING_TIERS[tier].monthlyPrice * 12 + PRICING_TIERS[tier].housingPrice * applicationsPerYear;
  
  return freeTierCost - tierCost;
}
