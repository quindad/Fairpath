// MASSIVE DUMMY DATA FOR FRIEND A FELON PLATFORM

// ====== CONVICTION TYPES ======
export const convictionTypes = {
  VIOLENT: 'violent',
  NON_VIOLENT: 'non_violent',
  DRUG: 'drug',
  PROPERTY: 'property',
  WHITE_COLLAR: 'white_collar',
  SEX_OFFENSE: 'sex_offense',
  DUI: 'dui',
  TRAFFIC: 'traffic'
};

// ====== HOUSING DATA (200+ LISTINGS) ======
const housingTypes = [
  'Studio', '1 Bedroom', '2 Bedroom', '3 Bedroom', '4 Bedroom', 'Room for Rent'
];

const chicagoNeighborhoods = [
  'Lincoln Park', 'Wicker Park', 'Logan Square', 'Pilsen', 'Bridgeport',
  'Hyde Park', 'Lakeview', 'Andersonville', 'Rogers Park', 'Uptown',
  'Humboldt Park', 'West Loop', 'South Loop', 'Chinatown', 'Little Village',
  'Austin', 'Englewood', 'Bronzeville', 'Woodlawn', 'Albany Park',
  'Avondale', 'Portage Park', 'Jefferson Park', 'Norwood Park', 'Edison Park',
  'Dunning', 'Belmont Cragin', 'Hermosa', 'Irving Park', 'North Center',
  'Roscoe Village', 'Bucktown', 'Ukrainian Village', 'Noble Square', 'River West',
  'Fulton Market', 'West Town', 'Near West Side', 'University Village', 'McKinley Park',
  'Armour Square', 'Douglas', 'Oakland', 'Grand Boulevard', 'Washington Park',
  'Greater Grand Crossing', 'South Shore', 'Chatham', 'Avalon Park', 'South Chicago'
];

const landlordNames = [
  'Metro Properties', 'Second Chance Housing', 'FairPath Housing Partners',
  'Urban Living LLC', 'Chicago Rentals Group', 'Neighborhood Homes',
  'Fresh Start Properties', 'Opportunity Housing', 'New Beginnings Realty',
  'Community First Apartments', 'Hope Housing Co', 'Bridge Homes',
  'Restart Rentals', 'Phoenix Property Group', 'Redemption Realty',
  'Pathways Housing', 'Cornerstone Apartments', 'Gateway Properties',
  'Horizon Homes', 'Sunrise Rentals', 'Beacon Housing',
  'Harbor Properties', 'Anchor Apartments', 'Compass Realty',
  'Haven Homes', 'Shelter Plus', 'Keystone Properties'
];

const amenities = [
  ['Laundry in Unit', 'Pet Friendly', 'Parking'],
  ['Heat Included', 'Renovated', 'Near CTA'],
  ['Central Air', 'Dishwasher', 'Balcony', 'Storage'],
  ['Hardwood Floors', 'Updated Kitchen', 'Bike Storage'],
  ['Washer/Dryer Hookup', 'Backyard', 'Garage'],
  ['Fitness Center', 'Rooftop Deck', 'Doorman'],
  ['On-Site Management', 'Package Room', 'Elevator'],
  ['Utilities Included', 'Furnished', 'Short-term OK'],
  ['Near Parks', 'Near Schools', 'Quiet Area'],
  ['Public Transit', 'Shopping Nearby', 'Safe Neighborhood']
];

const housingDescriptions = [
  'Bright apartment in quiet neighborhood. Close to public transit.',
  'Cozy unit in up-and-coming area. Perfect starter apartment.',
  'Spacious layout perfect for families. Landlord works with FairPath.',
  'Modern finishes with updated fixtures. Great location.',
  'Charming vintage building with character. Recently renovated.',
  'Clean and well-maintained. Responsive landlord.',
  'Move-in ready with fresh paint. Flexible lease terms.',
  'Walking distance to amenities. Pet-friendly building.',
  'Quiet residential street. Great neighbors.',
  'Affordable and clean. Perfect for fresh start.'
];

const acceptedConvictions = [
  ['Non-violent', 'Drug-related (5+ years)', 'Property crimes (7+ years)'],
  ['All types considered', 'Case-by-case review'],
  ['Non-violent', 'Financial crimes', 'Drug-related (3+ years)'],
  ['Non-violent', 'White collar', 'Traffic offenses'],
  ['Property crimes (5+ years)', 'Drug-related (3+ years)', 'DUI (2+ years)'],
  ['Non-violent felonies only', 'No sex offenses'],
  ['Most felonies accepted', 'Individual review'],
  ['Non-violent', 'No restrictions over 10 years'],
  ['All except violent crimes'],
  ['Second chances welcome', 'Honest review process']
];

export function generateHousingListings(count: number = 200) {
  const listings = [];
  
  for (let i = 0; i < count; i++) {
    const isFastTrack = Math.random() > 0.4; // 60% FastTrack
    const bedrooms = Math.floor(Math.random() * 4); // 0-3 bedrooms (0 = studio)
    const bathrooms = bedrooms === 0 ? 1 : Math.ceil(bedrooms / 2);
    const sqft = bedrooms === 0 ? 400 + Math.floor(Math.random() * 250) : 600 + (bedrooms * 300) + Math.floor(Math.random() * 200);
    const baseRent = bedrooms === 0 ? 800 : 900 + (bedrooms * 250);
    const rent = baseRent + Math.floor(Math.random() * 400);
    
    const neighborhood = chicagoNeighborhoods[Math.floor(Math.random() * chicagoNeighborhoods.length)];
    const streetNumber = 1000 + Math.floor(Math.random() * 8000);
    const streets = ['N Clark St', 'W Division St', 'N Ashland Ave', 'W Belmont Ave', 'N Damen Ave', 
                     'S Halsted St', 'W Chicago Ave', 'N Milwaukee Ave', 'W Fullerton Ave', 'N Lincoln Ave',
                     'W North Ave', 'N Western Ave', 'W Armitage Ave', 'N Broadway', 'W Diversey Pkwy'];
    const street = streets[Math.floor(Math.random() * streets.length)];
    const unit = Math.floor(Math.random() * 20) + 1;
    const unitType = ['Apt', 'Unit', '#'][Math.floor(Math.random() * 3)];
    
    listings.push({
      id: 100 + i,
      address: `${streetNumber} ${street}, ${unitType} ${unit}`,
      neighborhood,
      rent,
      bedrooms,
      bathrooms,
      sqft,
      available: Math.random() > 0.5 ? 'Immediately' : `Dec ${15 + Math.floor(Math.random() * 15)}, 2025`,
      landlord: landlordNames[Math.floor(Math.random() * landlordNames.length)],
      image: `https://images.unsplash.com/photo-${['1522708323590-d24dbb6b0267', '1502672260266-1c1ef2d93688', '1560448204-e02f11c3d0e2', '1545324418-cc1a3fa10c00', '1522708323590-d24dbb6b0267'][Math.floor(Math.random() * 5)]}?w=800`,
      amenities: amenities[Math.floor(Math.random() * amenities.length)],
      description: housingDescriptions[Math.floor(Math.random() * housingDescriptions.length)],
      acceptedConvictions: acceptedConvictions[Math.floor(Math.random() * acceptedConvictions.length)],
      isFastTrack,
      fastTrackPrice: isFastTrack ? 75 : 0, // Will be adjusted for FairPath+ users
      type: bedrooms === 0 ? 'Studio' : `${bedrooms} Bedroom`,
      // Eligibility engine data
      excludedConvictions: Math.random() > 0.7 ? [convictionTypes.VIOLENT, convictionTypes.SEX_OFFENSE] : 
                           Math.random() > 0.5 ? [convictionTypes.SEX_OFFENSE] : [],
      yearsRequired: Math.floor(Math.random() * 8) + 2 // 2-10 years since conviction
    });
  }
  
  return listings;
}

// ====== JOB DATA (200+ LISTINGS) ======
const companies = [
  'Amazon', 'Target', 'Walmart', 'Home Depot', 'Lowe\'s', 'McDonald\'s', 'Burger King',
  'Wendy\'s', 'Taco Bell', 'Chipotle', 'Panera Bread', 'Starbucks', 'Dunkin\'',
  'UPS', 'FedEx', 'USPS', 'DHL', 'Waste Management', 'Republic Services',
  'Sysco', 'US Foods', 'PepsiCo', 'Coca-Cola', 'ABM Industries', 'Aramark',
  'Sodexo', 'Compass Group', 'ISS Facility Services', 'Allied Universal',
  'Securitas', 'G4S', 'Parking Management Company', 'LAZ Parking',
  'Marriott', 'Hilton', 'Hyatt', 'Holiday Inn', 'Best Western',
  'CVS', 'Walgreens', '7-Eleven', 'Circle K', 'Speedway',
  'Jewel-Osco', 'Mariano\'s', 'Whole Foods', 'Aldi', 'Trader Joe\'s',
  'Costco', 'Sam\'s Club', 'BJ\'s Wholesale', 'AutoZone', 'O\'Reilly Auto Parts'
];

const jobPositions = [
  { title: 'Warehouse Associate', salary: [15, 22], shift: ['Day shift', 'Night shift', 'Overnight'] },
  { title: 'Forklift Operator', salary: [17, 24], shift: ['Day shift', 'Swing shift'] },
  { title: 'Order Picker', salary: [16, 21], shift: ['Day shift', 'Night shift'] },
  { title: 'Package Handler', salary: [16, 23], shift: ['Early morning', 'Day shift', 'Night shift'] },
  { title: 'Delivery Driver', salary: [18, 26], shift: ['Day shift', 'Flexible'] },
  { title: 'Crew Member', salary: [14, 18], shift: ['All shifts', 'Flexible'] },
  { title: 'Shift Leader', salary: [16, 20], shift: ['Day shift', 'Closing shift'] },
  { title: 'Cook', salary: [15, 19], shift: ['All shifts', 'Flexible'] },
  { title: 'Cashier', salary: [14, 17], shift: ['Day shift', 'Evening shift'] },
  { title: 'Stock Associate', salary: [15, 19], shift: ['Night shift', 'Early morning'] },
  { title: 'Sales Associate', salary: [14, 18], shift: ['Day shift', 'Flexible'] },
  { title: 'Lot Associate', salary: [14, 17], shift: ['Weekends', 'Evenings'] },
  { title: 'Maintenance Worker', salary: [16, 22], shift: ['Day shift', 'On-call'] },
  { title: 'Custodian', salary: [15, 19], shift: ['Night shift', 'Early morning'] },
  { title: 'Janitor', salary: [15, 19], shift: ['Night shift', 'Flexible'] },
  { title: 'Security Guard', salary: [16, 21], shift: ['All shifts', 'Overnight'] },
  { title: 'Machine Operator', salary: [17, 24], shift: ['Day shift', 'Night shift'] },
  { title: 'Production Worker', salary: [16, 21], shift: ['Day shift', 'Night shift'] },
  { title: 'Assembly Line Worker', salary: [15, 20], shift: ['Day shift', 'Swing shift'] },
  { title: 'Material Handler', salary: [16, 21], shift: ['Day shift', 'Night shift'] }
];

const jobBenefits = [
  ['Health Insurance', '401k', 'Employee Discount', 'Paid Time Off'],
  ['Medical/Dental/Vision', 'Life Insurance', 'Retirement Plan', 'Tuition Reimbursement'],
  ['Free Meals', 'Flexible Schedule', 'Advancement Opportunities', 'Training Programs'],
  ['Overtime Available', 'Weekly Pay', 'Direct Deposit', 'Referral Bonuses'],
  ['Union Benefits', 'Pension', 'Holiday Pay', 'Sick Leave'],
  ['Performance Bonuses', 'Employee Assistance Program', 'Wellness Programs', 'Gym Membership'],
  ['Paid Training', 'Career Development', 'Certification Programs', 'Skill Building']
];

const jobRequirements = [
  ['Lift 50 lbs', 'Stand for long periods', 'Pass background check'],
  ['Valid driver license', 'Clean driving record', 'DOT physical'],
  ['Food handler certification', 'Team player', 'Customer service skills'],
  ['Reliable attendance', 'Positive attitude', 'Work independently'],
  ['Basic math skills', 'Attention to detail', 'Follow instructions'],
  ['Physical stamina', 'Safety conscious', 'Dependable'],
  ['Communication skills', 'Multi-tasking', 'Problem solving']
];

export function generateJobListings(count: number = 200) {
  const listings = [];
  
  for (let i = 0; i < count; i++) {
    const position = jobPositions[Math.floor(Math.random() * jobPositions.length)];
    const company = companies[Math.floor(Math.random() * companies.length)];
    const salaryHourly = position.salary[0] + Math.floor(Math.random() * (position.salary[1] - position.salary[0]));
    const shift = position.shift[Math.floor(Math.random() * position.shift.length)];
    const isFastTrack = Math.random() > 0.5; // 50% FastTrack
    const isFullTime = Math.random() > 0.3; // 70% full-time
    
    listings.push({
      id: 200 + i,
      company,
      position: position.title,
      salary: `$${salaryHourly}/hr`,
      salaryAnnual: salaryHourly * (isFullTime ? 2080 : 1040),
      type: isFullTime ? 'Full-time' : 'Part-time',
      shift,
      location: `${chicagoNeighborhoods[Math.floor(Math.random() * chicagoNeighborhoods.length)]}, Chicago, IL`,
      posted: ['Today', '1 day ago', '2 days ago', '3 days ago', '1 week ago'][Math.floor(Math.random() * 5)],
      logo: `https://images.unsplash.com/photo-${['1553413077-190dd305871c', '1552566626-52f8b828add9', '1581094794329-c8112a89af12', '1504148455328-c376907d081c'][Math.floor(Math.random() * 4)]}?w=200`,
      description: `Join our team at ${company}! ${isFullTime ? 'Full-time position' : 'Part-time position'} with ${shift.toLowerCase()}. ${Math.random() > 0.5 ? 'No experience necessary - we provide training!' : 'Experience preferred but not required.'}`,
      requirements: jobRequirements[Math.floor(Math.random() * jobRequirements.length)],
      benefits: jobBenefits[Math.floor(Math.random() * jobBenefits.length)],
      wotcEligible: true,
      secondChanceFriendly: true,
      isFastTrack,
      // Eligibility engine data
      excludedConvictions: Math.random() > 0.8 ? [convictionTypes.VIOLENT] : 
                           Math.random() > 0.6 ? [convictionTypes.SEX_OFFENSE] : [],
      yearsRequired: Math.floor(Math.random() * 5) + 1 // 1-5 years since conviction
    });
  }
  
  return listings;
}

// ====== GIG ECONOMY / SERVICES DATA ======
export const serviceCategories = [
  {
    id: 'home_services',
    name: 'Home Services',
    icon: '🏠',
    services: [
      'Handyman', 'Plumbing', 'Electrical', 'Painting', 'Drywall',
      'Flooring', 'Carpentry', 'Roofing', 'Landscaping', 'Lawn Care',
      'Snow Removal', 'Gutter Cleaning', 'Pressure Washing', 'Window Cleaning'
    ]
  },
  {
    id: 'moving_labor',
    name: 'Moving & Labor',
    icon: '📦',
    services: [
      'Moving Help', 'Furniture Assembly', 'Junk Removal', 'Heavy Lifting',
      'Packing Services', 'Loading/Unloading', 'Delivery Services'
    ]
  },
  {
    id: 'automotive',
    name: 'Automotive',
    icon: '🚗',
    services: [
      'Auto Detailing', 'Oil Changes', 'Tire Changes', 'Car Washing',
      'Minor Repairs', 'Mobile Mechanic'
    ]
  },
  {
    id: 'cleaning',
    name: 'Cleaning',
    icon: '🧹',
    services: [
      'House Cleaning', 'Deep Cleaning', 'Move-Out Cleaning', 'Office Cleaning',
      'Carpet Cleaning', 'Post-Construction Cleaning'
    ]
  },
  {
    id: 'technology',
    name: 'Technology',
    icon: '💻',
    services: [
      'Computer Repair', 'Phone Repair', 'TV Mounting', 'Smart Home Setup',
      'WiFi Installation', 'Tech Support'
    ]
  },
  {
    id: 'food_service',
    name: 'Food Service',
    icon: '🍳',
    services: [
      'Catering', 'Meal Prep', 'Personal Chef', 'BBQ Services',
      'Event Cooking'
    ]
  },
  {
    id: 'creative',
    name: 'Creative Services',
    icon: '🎨',
    services: [
      'Photography', 'Videography', 'Graphic Design', 'Music Lessons',
      'Event DJ', 'Art Services'
    ]
  },
  {
    id: 'pet_care',
    name: 'Pet Care',
    icon: '🐕',
    services: [
      'Dog Walking', 'Pet Sitting', 'Grooming', 'Training'
    ]
  },
  {
    id: 'tutoring',
    name: 'Tutoring & Teaching',
    icon: '📚',
    services: [
      'Math Tutoring', 'English Tutoring', 'Test Prep', 'Music Lessons',
      'Language Lessons', 'Fitness Training'
    ]
  },
  {
    id: 'event_services',
    name: 'Event Services',
    icon: '🎉',
    services: [
      'Event Setup', 'Bartending', 'Security', 'Parking Attendant',
      'Decorating', 'Event Staff'
    ]
  }
];

export function generateServiceProviders(count: number = 100) {
  const providers = [];
  const firstNames = ['Marcus', 'Jamal', 'Darnell', 'Tyrone', 'James', 'Michael', 'Robert', 'David', 
                      'Carlos', 'Jose', 'Luis', 'Miguel', 'Antonio', 'Kevin', 'Brian', 'Chris'];
  const lastNames = ['Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Martinez', 'Rodriguez', 
                     'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor', 'Anderson', 'Thomas', 'Jackson'];
  
  for (let i = 0; i < count; i++) {
    const category = serviceCategories[Math.floor(Math.random() * serviceCategories.length)];
    const service = category.services[Math.floor(Math.random() * category.services.length)];
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const yearsExperience = Math.floor(Math.random() * 15) + 1;
    const hourlyRate = 25 + Math.floor(Math.random() * 75); // $25-$100/hr
    const jobsCompleted = Math.floor(Math.random() * 200);
    const rating = 4.0 + (Math.random() * 1.0); // 4.0-5.0
    const fairPathScore = 600 + Math.floor(Math.random() * 400); // 600-1000
    
    providers.push({
      id: 1000 + i,
      userId: 5000 + i,
      name: `${firstName} ${lastName}`,
      firstName,
      lastName,
      service,
      category: category.name,
      categoryId: category.id,
      description: `Professional ${service.toLowerCase()} with ${yearsExperience} years of experience. Reliable, skilled, and committed to quality work.`,
      hourlyRate,
      location: chicagoNeighborhoods[Math.floor(Math.random() * chicagoNeighborhoods.length)],
      serviceArea: ['Citywide', 'North Side', 'South Side', 'West Side', 'Downtown'][Math.floor(Math.random() * 5)],
      availability: ['Weekdays', 'Weekends', 'Evenings', 'Flexible'][Math.floor(Math.random() * 4)],
      yearsExperience,
      jobsCompleted,
      rating: parseFloat(rating.toFixed(1)),
      reviews: Math.floor(jobsCompleted * 0.7), // 70% of jobs get reviewed
      fairPathScore,
      verified: Math.random() > 0.2, // 80% verified
      backgroundCheck: Math.random() > 0.3, // 70% background checked
      insurance: Math.random() > 0.5, // 50% insured
      skills: generateSkills(service),
      certifications: generateCertifications(service),
      portfolio: Math.random() > 0.5, // 50% have portfolio
      responseTime: Math.floor(Math.random() * 4) + 1, // 1-4 hours
      joined: `${Math.floor(Math.random() * 24) + 1} months ago`,
      avatar: `https://i.pravatar.cc/150?u=${firstName}${lastName}${i}`
    });
  }
  
  return providers;
}

function generateSkills(service: string): string[] {
  const skillMap: { [key: string]: string[] } = {
    'Handyman': ['Repairs', 'Installation', 'Carpentry', 'Troubleshooting'],
    'Plumbing': ['Pipe Repair', 'Drain Cleaning', 'Fixture Installation', 'Leak Detection'],
    'Electrical': ['Wiring', 'Outlet Installation', 'Lighting', 'Troubleshooting'],
    'Painting': ['Interior', 'Exterior', 'Prep Work', 'Color Consultation'],
    'Moving Help': ['Packing', 'Heavy Lifting', 'Loading', 'Furniture Assembly'],
    'House Cleaning': ['Deep Cleaning', 'Organization', 'Sanitization', 'Eco-Friendly'],
    'Auto Detailing': ['Interior Detailing', 'Exterior Wash', 'Waxing', 'Buffing'],
    'Computer Repair': ['Virus Removal', 'Hardware Repair', 'Data Recovery', 'Setup'],
    'Dog Walking': ['Leash Training', 'Multiple Dogs', 'Medication', 'GPS Tracking'],
    'Photography': ['Portraits', 'Events', 'Editing', 'Lighting']
  };
  
  return skillMap[service] || ['Professional', 'Reliable', 'Experienced', 'Detail-Oriented'];
}

function generateCertifications(service: string): string[] {
  const certMap: { [key: string]: string[] } = {
    'Plumbing': ['Licensed Plumber', 'Certified Apprentice'],
    'Electrical': ['Licensed Electrician', 'Safety Certified'],
    'Auto Detailing': ['Certified Detailer', 'Paint Correction Certified'],
    'House Cleaning': ['Green Cleaning Certified', 'OSHA Trained'],
    'Computer Repair': ['CompTIA A+', 'Microsoft Certified'],
    'Dog Walking': ['Pet First Aid', 'Dog CPR Certified']
  };
  
  return certMap[service] || [];
}

// ====== DEFAULT USER PROFILES ======
export const defaultUsers = {
  felon: {
    id: 'felon-001',
    email: 'marcus.johnson@demo.com',
    password: 'demo123',
    firstName: 'Marcus',
    lastName: 'Johnson',
    role: 'felon',
    fairPathScore: 687,
    hasFairPathPlus: false,
    convictionType: convictionTypes.DRUG,
    convictionDate: '2018-03-15',
    releaseDate: '2023-06-20',
    yearsOut: 1.5,
    phone: '(312) 555-0123',
    address: '1234 W Division St, Unit 2B',
    city: 'Chicago',
    state: 'IL',
    zip: '60622',
    profileComplete: true
  },
  employer: {
    id: 'employer-001',
    email: 'hiring@target.com',
    password: 'demo123',
    companyName: 'Target Distribution Center',
    role: 'employer',
    fairPathScore: 892,
    industry: 'Retail/Warehouse',
    size: '500+ employees',
    phone: '(312) 555-0456',
    address: '5678 Industrial Pkwy',
    city: 'Chicago',
    state: 'IL',
    zip: '60608',
    wotcParticipant: true,
    profileComplete: true
  },
  landlord: {
    id: 'landlord-001',
    email: 'properties@metro.com',
    password: 'demo123',
    companyName: 'Metro Properties',
    role: 'landlord',
    fairPathScore: 845,
    propertyCount: 47,
    unitsAvailable: 12,
    phone: '(312) 555-0789',
    address: '890 N Michigan Ave, Suite 200',
    city: 'Chicago',
    state: 'IL',
    zip: '60611',
    profileComplete: true
  },
  donor: {
    id: 'donor-001',
    email: 'sarah.thompson@demo.com',
    password: 'demo123',
    firstName: 'Sarah',
    lastName: 'Thompson',
    role: 'donor',
    fairPathScore: 921,
    totalDonations: 23,
    itemsDonated: 47,
    phone: '(312) 555-0321',
    address: '2345 N Clark St, Apt 4C',
    city: 'Chicago',
    state: 'IL',
    zip: '60614',
    profileComplete: true
  },
  customer: {
    id: 'customer-001',
    email: 'john.smith@demo.com',
    password: 'demo123',
    firstName: 'John',
    lastName: 'Smith',
    role: 'customer',
    fairPathScore: 756,
    servicesBooked: 12,
    totalSpent: 1847,
    phone: '(312) 555-0654',
    address: '6789 S Halsted St',
    city: 'Chicago',
    state: 'IL',
    zip: '60621',
    profileComplete: true
  },
  staffing: {
    id: 'staffing-001',
    email: 'hiring@fairpathstaffing.com',
    password: 'demo123',
    companyName: 'FairPath Staffing Solutions',
    contactName: 'David Martinez',
    role: 'staffing',
    fairPathScore: 892,
    yearsInBusiness: 8,
    numberOfRecruiters: 12,
    activeClients: 34,
    placementsPerMonth: 23,
    totalPlacements: 1847,
    phone: '(312) 555-0987',
    address: '1000 W Fulton Market, Suite 500',
    city: 'Chicago',
    state: 'IL',
    zip: '60607',
    specializations: ['Manufacturing', 'Warehouse & Logistics', 'Food Service', 'Retail'],
    certifications: ['ASA Certified', 'E-Verify Participant'],
    profileComplete: true
  }
};