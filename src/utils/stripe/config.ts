// STRIPE CONFIGURATION - SYNCED WITH MOBILE APP
// Last Updated: December 4, 2024
// Integration: Mobile AI + Web AI coordinated setup

// ============================================
// STRIPE KEYS (Same account as mobile app)
// ============================================

export const STRIPE_PUBLISHABLE_KEY_TEST = 
  "pk_test_51SaOU93E6s96PUvZwZ2AwNi8VMXRzUxGjNVBAamWELgdehh48oeu2zv6HMbv14AzmJrcyfxeckBDvUOYNwAopFgM00Q6FIUPIG";

// ============================================
// SUBSCRIPTION PRICE IDs (Monthly Recurring)
// ============================================

export const STRIPE_PRICE_FAIRPATH_PLUS = "price_1SaPAd3E6s96PUvZALaNv2Qi";  // $2/month
export const STRIPE_PRICE_FAIRPATH_PRO = "price_1SaPAd3E6s96PUvZ39n2OWG3";   // $5/month

// ============================================
// HOUSING FASTTRACK PRICE IDs (One-time)
// ============================================

export const STRIPE_PRICE_HOUSING_FREE = "price_1SaPAd3E6s96PUvZxyH5AhmH";  // $75
export const STRIPE_PRICE_HOUSING_PLUS = "price_1SaPAe3E6s96PUvZcYcUYubO";  // $70
export const STRIPE_PRICE_HOUSING_PRO = "price_1SaPAe3E6s96PUvZBOUfKws2";   // $65

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getSubscriptionPriceId(tier: 'plus' | 'pro'): string {
  return tier === 'pro' ? STRIPE_PRICE_FAIRPATH_PRO : STRIPE_PRICE_FAIRPATH_PLUS;
}

export function getHousingPriceId(userTier: 'free' | 'plus' | 'pro'): string {
  switch (userTier) {
    case 'pro': return STRIPE_PRICE_HOUSING_PRO;
    case 'plus': return STRIPE_PRICE_HOUSING_PLUS;
    default: return STRIPE_PRICE_HOUSING_FREE;
  }
}

export function getSubscriptionAmount(tier: 'plus' | 'pro'): number {
  return tier === 'pro' ? 5 : 2;
}

export function getHousingAmount(userTier: 'free' | 'plus' | 'pro'): number {
  switch (userTier) {
    case 'pro': return 65;
    case 'plus': return 70;
    default: return 75;
  }
}

// ============================================
// FEATURE ACCESS CONTROL
// ============================================

export function canAccessFriendAFelonMarketplace(userTier: 'free' | 'plus' | 'pro'): boolean {
  // Friend A Felon marketplace is PRO TIER ONLY on web
  return userTier === 'pro';
}

export function canAccessAIFeatures(userTier: 'free' | 'plus' | 'pro'): boolean {
  // AI features available to Pro tier
  return userTier === 'pro';
}

export function getMarketplaceClaimsLimit(userTier: 'free' | 'plus' | 'pro'): number {
  switch (userTier) {
    case 'pro': return 10;
    case 'plus': return 5;
    default: return 2;
  }
}

// ============================================
// TIER DETECTION
// ============================================

export function getUserTier(userData: any): 'free' | 'plus' | 'pro' {
  if (userData?.hasFairPathPro || userData?.subscription_tier === 'pro') return 'pro';
  if (userData?.hasFairPathPlus || userData?.subscription_tier === 'plus') return 'plus';
  return 'free';
}

// ============================================
// PRICING DISPLAY
// ============================================

export const PRICING_TIERS = {
  free: {
    name: 'Free',
    price: 0,
    interval: 'forever',
    features: [
      '2 marketplace claims/month',
      'Basic job search',
      'Housing search',
      'Resource directory',
      'Community access',
    ],
    restrictions: [
      'No Friend A Felon marketplace access',
      'No AI features',
      'Limited support',
    ],
  },
  plus: {
    name: 'FairPath Plus',
    price: 2,
    interval: 'month',
    features: [
      '5 marketplace claims/month',
      'Priority job matching',
      'FastTrack housing ($70)',
      'Advanced filters',
      'Email support',
    ],
    restrictions: [
      'No Friend A Felon marketplace access',
      'No AI features',
    ],
  },
  pro: {
    name: 'FairPath Pro',
    price: 5,
    interval: 'month',
    features: [
      '10 marketplace claims/month',
      'Friend A Felon marketplace access ⭐',
      'All AI features ⭐',
      'FastTrack housing ($65)',
      'Downloadable resources',
      'AI-powered applications',
      'Resume optimization',
      'Priority support',
      'All mobile app features',
    ],
    restrictions: [],
  },
};

// ============================================
// METADATA STANDARDS (synced with mobile)
// ============================================

export interface StripeMetadata {
  userId: string;
  userType?: string;
  platform?: 'web' | 'mobile';
  [key: string]: string | undefined;
}

export function createSubscriptionMetadata(userId: string, userType?: string): StripeMetadata {
  return {
    userId,
    userType,
    platform: 'web',
  };
}

export function createHousingPaymentMetadata(
  userId: string, 
  propertyId?: string,
  tier?: string
): StripeMetadata {
  return {
    userId,
    propertyId: propertyId || 'general',
    tier: tier || 'free',
    platform: 'web',
    type: 'fasttrack',
  };
}
