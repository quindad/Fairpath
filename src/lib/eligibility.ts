import { UserProfile } from '../components/ProfileSetupWizard';

export interface PropertyListing {
  id: string;
  title: string;
  address: string;
  city: string;
  state: string;
  rent: number;
  deposit: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  description: string;
  amenities: string[];
  imageUrl: string;
  landlordName: string;
  landlordCompany?: string;
  
  // Eligibility requirements
  requirements: {
    acceptsAllFelonies: boolean;
    acceptsViolent: boolean;
    acceptsDrug: boolean;
    acceptsProperty: boolean;
    acceptsSex: boolean;
    acceptsFraud: boolean;
    yearsRequired?: number; // years since conviction required
    maxConvictions?: number;
  };
  
  // FastTrack
  fastTrackEnabled: boolean;
  guaranteedShowing: boolean;
  
  // Other requirements
  minimumIncome?: number; // 3x rent, etc.
  requiresEmployment?: boolean;
}

export interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  city: string;
  state: string;
  payRate: string;
  payType: 'hourly' | 'salary' | 'contract';
  description: string;
  requirements: string[];
  duties: string[];
  schedule: string;
  benefits: string[];
  imageUrl?: string;
  
  // Eligibility requirements
  eligibility: {
    acceptsAllFelonies: boolean;
    acceptsViolent: boolean;
    acceptsDrug: boolean;
    acceptsProperty: boolean;
    acceptsSex: boolean;
    acceptsFraud: boolean;
    yearsRequired?: number;
  };
  
  // Job Type (3 categories)
  jobType: 'standard' | 'fasttrack' | 'fairpath-staffing';
  // standard = Apply Externally or optional FastTrack Apply
  // fasttrack = FastTrack Apply enabled (Easy Apply style)
  // fairpath-staffing = FairPath Staffing job (FairPath+ exclusive)
  
  // Application method
  hasFastTrackApply: boolean; // Can use in-app FastTrack Apply
  externalUrl?: string; // For "Apply Externally" button
}

// Calculate years since conviction
function yearsSince(year: string): number {
  const currentYear = new Date().getFullYear();
  return currentYear - parseInt(year);
}

// Check if user is eligible for a property
export function isEligibleForProperty(
  userProfile: UserProfile | null,
  property: PropertyListing
): boolean {
  if (!userProfile || !userProfile.convictions || userProfile.convictions.length === 0) {
    return true; // No convictions recorded
  }

  const { requirements } = property;

  // If property accepts all felonies, they're eligible
  if (requirements.acceptsAllFelonies) {
    return true;
  }

  // Check each conviction
  for (const conviction of userProfile.convictions) {
    const yearsOut = yearsSince(conviction.releaseYear || conviction.yearOfConviction);
    
    // Check if years requirement is met
    if (requirements.yearsRequired && yearsOut < requirements.yearsRequired) {
      return false; // Not enough years since conviction
    }

    // Check conviction type acceptance
    const type = conviction.type.toLowerCase();
    
    if (type.includes('violent') && !requirements.acceptsViolent) {
      return false;
    }
    if (type.includes('drug') && !requirements.acceptsDrug) {
      return false;
    }
    if (type.includes('property') && !requirements.acceptsProperty) {
      return false;
    }
    if (type.includes('sex') && !requirements.acceptsSex) {
      return false;
    }
    if ((type.includes('fraud') || type.includes('white collar')) && !requirements.acceptsFraud) {
      return false;
    }
  }

  // Check max convictions
  if (requirements.maxConvictions && userProfile.convictions.length > requirements.maxConvictions) {
    return false;
  }

  return true;
}

// Check if user is eligible for a job
export function isEligibleForJob(
  userProfile: UserProfile | null,
  job: JobListing
): boolean {
  if (!userProfile || !userProfile.convictions || userProfile.convictions.length === 0) {
    return true;
  }

  const { eligibility } = job;

  if (eligibility.acceptsAllFelonies) {
    return true;
  }

  for (const conviction of userProfile.convictions) {
    const yearsOut = yearsSince(conviction.releaseYear || conviction.yearOfConviction);
    
    if (eligibility.yearsRequired && yearsOut < eligibility.yearsRequired) {
      return false;
    }

    const type = conviction.type.toLowerCase();
    
    if (type.includes('violent') && !eligibility.acceptsViolent) {
      return false;
    }
    if (type.includes('drug') && !eligibility.acceptsDrug) {
      return false;
    }
    if (type.includes('property') && !eligibility.acceptsProperty) {
      return false;
    }
    if (type.includes('sex') && !eligibility.acceptsSex) {
      return false;
    }
    if ((type.includes('fraud') || type.includes('white collar')) && !eligibility.acceptsFraud) {
      return false;
    }
  }

  return true;
}

// Mock property listings
export const mockProperties: PropertyListing[] = [
  {
    id: '1',
    title: 'Modern 2BR Apartment - East Side',
    address: '1234 East 55th St',
    city: 'Cleveland',
    state: 'OH',
    rent: 950,
    deposit: 950,
    bedrooms: 2,
    bathrooms: 1,
    sqft: 850,
    description: 'Newly renovated 2-bedroom apartment in a quiet neighborhood. Close to public transportation and shopping. Laundry on-site. Off-street parking available.',
    amenities: ['Laundry on-site', 'Off-street parking', 'Pet friendly', 'Heat included'],
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
    landlordName: 'Robert Chen',
    landlordCompany: 'East Side Properties LLC',
    requirements: {
      acceptsAllFelonies: false,
      acceptsViolent: false,
      acceptsDrug: true,
      acceptsProperty: true,
      acceptsSex: false,
      acceptsFraud: true,
      yearsRequired: 3,
    },
    fastTrackEnabled: true,
    guaranteedShowing: true,
    minimumIncome: 2850,
  },
  {
    id: '2',
    title: 'Cozy 1BR Near Downtown',
    address: '789 West Boulevard',
    city: 'Cleveland',
    state: 'OH',
    rent: 750,
    deposit: 500,
    bedrooms: 1,
    bathrooms: 1,
    sqft: 600,
    description: 'Affordable 1-bedroom apartment perfect for singles. Walking distance to downtown. Utilities included. Great landlord who believes in second chances.',
    amenities: ['Utilities included', 'On-site maintenance', 'Secure entry'],
    imageUrl: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800',
    landlordName: 'Sarah Martinez',
    requirements: {
      acceptsAllFelonies: true,
      acceptsViolent: true,
      acceptsDrug: true,
      acceptsProperty: true,
      acceptsSex: false,
      acceptsFraud: true,
    },
    fastTrackEnabled: true,
    guaranteedShowing: true,
    minimumIncome: 2250,
  },
  {
    id: '3',
    title: 'Spacious 3BR Family Home',
    address: '456 Maple Avenue',
    city: 'Akron',
    state: 'OH',
    rent: 1200,
    deposit: 1200,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1400,
    description: 'Large family home with fenced yard. Quiet neighborhood with good schools. Garage and basement storage. Perfect for families getting back on their feet.',
    amenities: ['Fenced yard', 'Garage', 'Basement', 'Washer/dryer hookup'],
    imageUrl: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800',
    landlordName: 'Michael Johnson',
    landlordCompany: 'Second Chance Housing',
    requirements: {
      acceptsAllFelonies: false,
      acceptsViolent: false,
      acceptsDrug: true,
      acceptsProperty: true,
      acceptsSex: false,
      acceptsFraud: true,
      yearsRequired: 5,
    },
    fastTrackEnabled: true,
    guaranteedShowing: true,
    minimumIncome: 3600,
  },
  {
    id: '4',
    title: 'Studio Apartment - All Inclusive',
    address: '321 Pine Street',
    city: 'Cleveland',
    state: 'OH',
    rent: 650,
    deposit: 400,
    bedrooms: 0,
    bathrooms: 1,
    sqft: 400,
    description: 'Efficiency studio perfect for working professionals. All utilities included. Flexible lease terms. Close to bus lines and shopping.',
    amenities: ['All utilities included', 'Furnished option', 'WiFi included'],
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
    landlordName: 'Linda Washington',
    requirements: {
      acceptsAllFelonies: false,
      acceptsViolent: false,
      acceptsDrug: true,
      acceptsProperty: false,
      acceptsSex: false,
      acceptsFraud: false,
      yearsRequired: 2,
    },
    fastTrackEnabled: true,
    guaranteedShowing: true,
    minimumIncome: 1950,
  },
  {
    id: '5',
    title: 'Renovated 2BR Duplex',
    address: '890 Oak Drive',
    city: 'Toledo',
    state: 'OH',
    rent: 850,
    deposit: 850,
    bedrooms: 2,
    bathrooms: 1.5,
    sqft: 900,
    description: 'Half of a duplex with private entrance. Fresh paint, new flooring. Small backyard area. Pet friendly with deposit.',
    amenities: ['Private entrance', 'Backyard', 'Pet friendly', 'New appliances'],
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
    landlordName: 'James Thompson',
    requirements: {
      acceptsAllFelonies: false,
      acceptsViolent: true,
      acceptsDrug: true,
      acceptsProperty: true,
      acceptsSex: false,
      acceptsFraud: true,
      yearsRequired: 1,
      maxConvictions: 2,
    },
    fastTrackEnabled: true,
    guaranteedShowing: true,
    minimumIncome: 2550,
  },
];

// Mock job listings
export const mockJobs: JobListing[] = [
  {
    id: '1',
    title: 'Warehouse Associate',
    company: 'Great Lakes Distribution',
    location: '1500 Industrial Pkwy',
    city: 'Cleveland',
    state: 'OH',
    payRate: '$16-18',
    payType: 'hourly',
    description: 'Join our fast-paced warehouse team. We believe everyone deserves a second chance and provide on-the-job training.',
    requirements: ['Able to lift 50lbs', 'Reliable transportation', 'Pass drug test'],
    duties: ['Load/unload trucks', 'Inventory management', 'Forklift operation (training provided)', 'Quality control'],
    schedule: 'Full-time, 1st or 2nd shift available',
    benefits: ['Health insurance after 90 days', 'Paid time off', '401k match', 'Advancement opportunities'],
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800',
    eligibility: {
      acceptsAllFelonies: false,
      acceptsViolent: false,
      acceptsDrug: true,
      acceptsProperty: true,
      acceptsSex: true,
      acceptsFraud: true,
      yearsRequired: 2,
    },
    jobType: 'fasttrack',
    hasFastTrackApply: true,
  },
  {
    id: '2',
    title: 'Construction Laborer',
    company: 'FairPath Staffing',
    location: 'Multiple sites',
    city: 'Cleveland',
    state: 'OH',
    payRate: '$18-22',
    payType: 'hourly',
    description: 'FairPath Staffing connects you with construction opportunities across Cleveland. We handle background screening, placement, and ongoing support. Priority for WOTC-eligible candidates.',
    requirements: ['Valid driver\'s license', 'Own transportation', 'Steel toe boots'],
    duties: ['Site preparation', 'Material handling', 'Basic carpentry', 'Equipment operation'],
    schedule: 'Full-time, Monday-Friday, occasional Saturdays',
    benefits: ['Weekly pay', 'Tool allowance', 'Paid training', 'Benefits after 30 days', 'Career advancement'],
    eligibility: {
      acceptsAllFelonies: true,
      acceptsViolent: true,
      acceptsDrug: true,
      acceptsProperty: true,
      acceptsSex: false,
      acceptsFraud: true,
    },
    jobType: 'fairpath-staffing',
    hasFastTrackApply: true,
  },
  {
    id: '3',
    title: 'Kitchen Staff',
    company: 'Second Helpings Restaurant',
    location: '2200 Euclid Ave',
    city: 'Cleveland',
    state: 'OH',
    payRate: '$14-16',
    payType: 'hourly',
    description: 'Restaurant committed to hiring returning citizens. Start as prep cook with advancement to line cook positions. We train!',
    requirements: ['Food handler\'s card (we help you get it)', 'Weekend availability', 'Team player'],
    duties: ['Food preparation', 'Dish washing', 'Kitchen cleaning', 'Line cooking (after training)'],
    schedule: 'Part-time or full-time, flexible hours',
    benefits: ['Free meals', 'Tips', 'Flexible schedule', 'Career advancement'],
    eligibility: {
      acceptsAllFelonies: false,
      acceptsViolent: false,
      acceptsDrug: true,
      acceptsProperty: true,
      acceptsSex: false,
      acceptsFraud: true,
      yearsRequired: 1,
    },
    jobType: 'fasttrack',
    hasFastTrackApply: true,
  },
  {
    id: '4',
    title: 'Manufacturing Associate',
    company: 'FairPath Staffing',
    location: '3400 Manufacturing Blvd',
    city: 'Akron',
    state: 'OH',
    payRate: '$17-20',
    payType: 'hourly',
    description: 'FairPath Staffing is hiring for multiple manufacturing positions. We specialize in placing justice-impacted individuals with employers who value second chances and WOTC tax credits.',
    requirements: ['High school diploma or GED', 'Able to work on feet for 8-10 hours', 'Pass background check'],
    duties: ['Assembly line work', 'Quality inspection', 'Machine operation', 'Packaging and shipping'],
    schedule: 'Full-time, 1st, 2nd, or 3rd shift',
    benefits: ['Competitive pay', 'Health insurance', 'Paid holidays', 'OT opportunities', 'Career path'],
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
    eligibility: {
      acceptsAllFelonies: false,
      acceptsViolent: false,
      acceptsDrug: true,
      acceptsProperty: true,
      acceptsSex: true,
      acceptsFraud: true,
      yearsRequired: 1,
    },
    jobType: 'fairpath-staffing',
    hasFastTrackApply: true,
  },
  {
    id: '5',
    title: 'Retail Sales Associate',
    company: 'Goodwill Industries',
    location: '5600 Commerce Parkway',
    city: 'Cleveland',
    state: 'OH',
    payRate: '$13-15',
    payType: 'hourly',
    description: 'Goodwill is committed to providing employment opportunities to all. Help customers, organize merchandise, and be part of our mission to help the community.',
    requirements: ['Customer service experience preferred', 'Reliable attendance', 'Positive attitude'],
    duties: ['Customer assistance', 'Stocking shelves', 'Operating cash register', 'Maintaining store appearance'],
    schedule: 'Part-time or full-time, flexible scheduling',
    benefits: ['Employee discount', 'Advancement opportunities', 'Flexible schedule'],
    eligibility: {
      acceptsAllFelonies: false,
      acceptsViolent: false,
      acceptsDrug: true,
      acceptsProperty: false,
      acceptsSex: false,
      acceptsFraud: false,
      yearsRequired: 3,
    },
    jobType: 'standard',
    hasFastTrackApply: false,
    externalUrl: 'https://goodwill.org/careers',
  },
];