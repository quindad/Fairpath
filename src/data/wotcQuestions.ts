// COMPLETE WOTC (WORK OPPORTUNITY TAX CREDIT) QUESTIONS
// Based on IRS Form 8850 and Form 9061

export interface WOTCQuestion {
  id: string;
  question: string;
  explanation: string;
  category: string;
  taxCreditValue?: string;
  required: boolean;
  type: 'yes-no' | 'date' | 'select' | 'text';
  options?: string[];
}

export const wotcQuestions: WOTCQuestion[] = [
  // SNAP (Food Stamps)
  {
    id: 'snap_received',
    question: 'Have you received SNAP benefits (Food Stamps) in the last 6 months?',
    explanation: 'SNAP recipients qualify for tax credits. This helps employers save money when hiring you, making you a more attractive candidate.',
    category: 'SNAP/Food Assistance',
    taxCreditValue: '$2,400',
    required: true,
    type: 'yes-no'
  },
  {
    id: 'snap_household',
    question: 'Is anyone in your household currently receiving SNAP benefits?',
    explanation: 'If your family receives SNAP, you may qualify even if you don\'t personally receive benefits.',
    category: 'SNAP/Food Assistance',
    taxCreditValue: '$2,400',
    required: true,
    type: 'yes-no'
  },
  
  // Unemployment
  {
    id: 'unemployment_duration',
    question: 'Have you been unemployed for 27 weeks or longer in the past year?',
    explanation: 'Long-term unemployment qualifies you for tax credits. This is 6+ months of unemployment.',
    category: 'Unemployment',
    taxCreditValue: '$9,600',
    required: true,
    type: 'yes-no'
  },
  {
    id: 'unemployment_benefits',
    question: 'Have you received unemployment compensation for at least 6 months?',
    explanation: 'Receiving unemployment benefits for an extended period qualifies you for employer tax credits.',
    category: 'Unemployment',
    taxCreditValue: '$9,600',
    required: true,
    type: 'yes-no'
  },
  
  // Veteran Status
  {
    id: 'veteran_status',
    question: 'Are you a veteran of the U.S. Armed Forces?',
    explanation: 'Veterans qualify for significant tax credits. Thank you for your service!',
    category: 'Veteran',
    taxCreditValue: '$2,400 - $9,600',
    required: true,
    type: 'yes-no'
  },
  {
    id: 'veteran_disabled',
    question: 'Do you have a service-connected disability?',
    explanation: 'Veterans with service-connected disabilities qualify for the highest tax credit tier.',
    category: 'Veteran',
    taxCreditValue: '$9,600',
    required: false,
    type: 'yes-no'
  },
  {
    id: 'veteran_unemployed',
    question: 'Have you been unemployed for at least 6 months in the past year?',
    explanation: 'Unemployed veterans qualify for enhanced tax credits.',
    category: 'Veteran',
    taxCreditValue: '$9,600',
    required: false,
    type: 'yes-no'
  },
  {
    id: 'veteran_snap',
    question: 'Have you received SNAP benefits in the past year?',
    explanation: 'Veterans receiving SNAP qualify for additional tax credits.',
    category: 'Veteran',
    taxCreditValue: '$9,600',
    required: false,
    type: 'yes-no'
  },
  
  // Ex-Felon/Incarceration
  {
    id: 'conviction_status',
    question: 'Have you been convicted of a felony?',
    explanation: 'Employers can receive tax credits for hiring individuals with felony convictions. This makes you MORE valuable to employers.',
    category: 'Ex-Felon',
    taxCreditValue: '$2,400 - $9,600',
    required: true,
    type: 'yes-no'
  },
  {
    id: 'release_date',
    question: 'When were you released from incarceration?',
    explanation: 'If released within the last 12 months, employers receive higher tax credits. Even if longer, you still qualify for credits.',
    category: 'Ex-Felon',
    taxCreditValue: '$2,400 - $9,600',
    required: false,
    type: 'date'
  },
  {
    id: 'conviction_date',
    question: 'When were you convicted?',
    explanation: 'This helps determine your eligibility tier for tax credits.',
    category: 'Ex-Felon',
    required: false,
    type: 'date'
  },
  {
    id: 'incarceration_duration',
    question: 'How long were you incarcerated?',
    explanation: 'Duration of incarceration can affect tax credit eligibility.',
    category: 'Ex-Felon',
    required: false,
    type: 'select',
    options: [
      'Less than 6 months',
      '6-12 months',
      '1-2 years',
      '2-5 years',
      '5-10 years',
      '10+ years'
    ]
  },
  
  // Temporary Assistance (TANF)
  {
    id: 'tanf_received',
    question: 'Have you or your family received TANF (Temporary Assistance for Needy Families) in the past 18 months?',
    explanation: 'TANF recipients qualify for tax credits. This includes cash assistance programs.',
    category: 'Public Assistance',
    taxCreditValue: '$2,400 - $9,600',
    required: true,
    type: 'yes-no'
  },
  {
    id: 'tanf_duration',
    question: 'How long have you/has your family received TANF?',
    explanation: 'Longer TANF receipt may qualify for higher credit tiers.',
    category: 'Public Assistance',
    required: false,
    type: 'select',
    options: [
      'Less than 3 months',
      '3-6 months',
      '6-12 months',
      '12-18 months',
      '18+ months'
    ]
  },
  
  // Designated Community Resident (DCR)
  {
    id: 'empowerment_zone',
    question: 'Do you live in an Empowerment Zone, Enterprise Community, or Renewal Community?',
    explanation: 'Residents of designated economically disadvantaged areas qualify for tax credits.',
    category: 'Designated Community',
    taxCreditValue: '$2,400',
    required: true,
    type: 'yes-no'
  },
  {
    id: 'community_address',
    question: 'What is your current residential address?',
    explanation: 'We use this to verify if you live in a designated community area.',
    category: 'Designated Community',
    required: false,
    type: 'text'
  },
  
  // Vocational Rehabilitation
  {
    id: 'voc_rehab',
    question: 'Are you currently receiving or have you completed a vocational rehabilitation program?',
    explanation: 'Vocational rehabilitation participants qualify for tax credits.',
    category: 'Vocational Rehabilitation',
    taxCreditValue: '$2,400 - $9,600',
    required: true,
    type: 'yes-no'
  },
  {
    id: 'voc_rehab_disability',
    question: 'Do you have a physical or mental disability that required vocational rehabilitation?',
    explanation: 'Individuals with disabilities receiving vocational rehab qualify for enhanced credits.',
    category: 'Vocational Rehabilitation',
    required: false,
    type: 'yes-no'
  },
  
  // SSI (Supplemental Security Income)
  {
    id: 'ssi_received',
    question: 'Do you currently receive SSI (Supplemental Security Income)?',
    explanation: 'SSI recipients qualify for tax credits.',
    category: 'Disability/SSI',
    taxCreditValue: '$2,400',
    required: true,
    type: 'yes-no'
  },
  {
    id: 'ssi_duration',
    question: 'How long have you been receiving SSI?',
    explanation: 'Duration of SSI receipt may affect credit calculations.',
    category: 'Disability/SSI',
    required: false,
    type: 'select',
    options: [
      'Less than 6 months',
      '6-12 months',
      '1-2 years',
      '2+ years'
    ]
  },
  
  // Age-Related
  {
    id: 'age_18_39',
    question: 'Are you between 18 and 39 years old?',
    explanation: 'Certain age groups in combination with other factors qualify for enhanced credits.',
    category: 'Demographics',
    required: true,
    type: 'yes-no'
  },
  {
    id: 'summer_youth',
    question: 'Are you between 16-17 years old and working during summer break?',
    explanation: 'Summer youth employment programs qualify for specific tax credits.',
    category: 'Youth Employment',
    taxCreditValue: '$1,200',
    required: false,
    type: 'yes-no'
  },
  
  // Hurricane/Disaster Relief
  {
    id: 'disaster_area',
    question: 'Were you displaced by a federally declared disaster (hurricane, flood, etc.)?',
    explanation: 'Disaster victims qualify for tax credits when hired.',
    category: 'Disaster Relief',
    taxCreditValue: '$2,400',
    required: true,
    type: 'yes-no'
  },
  
  // Additional Screening Questions
  {
    id: 'start_date',
    question: 'When can you start working?',
    explanation: 'Employers need to know your availability.',
    category: 'Employment Details',
    required: true,
    type: 'date'
  },
  {
    id: 'full_time_availability',
    question: 'Are you available for full-time work (40+ hours per week)?',
    explanation: 'Some tax credits require full-time employment.',
    category: 'Employment Details',
    required: true,
    type: 'yes-no'
  },
  {
    id: 'referral_source',
    question: 'How did you hear about this job opportunity?',
    explanation: 'This helps us improve our platform and track referrals.',
    category: 'Platform Feedback',
    required: false,
    type: 'select',
    options: [
      'Friend A Felon App',
      'FairPath Staffing',
      'Parole/Probation Officer',
      'Reentry Program',
      'Friend/Family',
      'Social Media',
      'Other'
    ]
  }
];

// Helper: Get all questions for a specific category
export function getQuestionsByCategory(category: string): WOTCQuestion[] {
  return wotcQuestions.filter(q => q.category === category);
}

// Helper: Get required questions only
export function getRequiredQuestions(): WOTCQuestion[] {
  return wotcQuestions.filter(q => q.required);
}

// Helper: Calculate potential tax credit based on answers
export function calculateTaxCredit(answers: Record<string, any>): number {
  let maxCredit = 0;
  
  // Long-term unemployment = $9,600
  if (answers.unemployment_duration === 'yes' || answers.unemployment_benefits === 'yes') {
    maxCredit = Math.max(maxCredit, 9600);
  }
  
  // Veteran with disability or long-term unemployment = $9,600
  if (answers.veteran_status === 'yes' && (answers.veteran_disabled === 'yes' || answers.veteran_unemployed === 'yes')) {
    maxCredit = Math.max(maxCredit, 9600);
  }
  
  // Ex-felon released within 12 months = $2,400
  if (answers.conviction_status === 'yes') {
    const releaseDate = new Date(answers.release_date);
    const monthsSinceRelease = (Date.now() - releaseDate.getTime()) / (1000 * 60 * 60 * 24 * 30);
    if (monthsSinceRelease <= 12) {
      maxCredit = Math.max(maxCredit, 2400);
    }
  }
  
  // SNAP = $2,400
  if (answers.snap_received === 'yes' || answers.snap_household === 'yes') {
    maxCredit = Math.max(maxCredit, 2400);
  }
  
  // TANF long-term = up to $9,600
  if (answers.tanf_received === 'yes' && answers.tanf_duration === '18+ months') {
    maxCredit = Math.max(maxCredit, 9600);
  }
  
  // Vocational rehab = $2,400-$9,600
  if (answers.voc_rehab === 'yes') {
    maxCredit = Math.max(maxCredit, 2400);
  }
  
  // SSI = $2,400
  if (answers.ssi_received === 'yes') {
    maxCredit = Math.max(maxCredit, 2400);
  }
  
  return maxCredit;
}

export default wotcQuestions;
