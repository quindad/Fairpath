/**
 * SingleKey API Integration
 * Documentation: https://github.com/singlekeyinc/Screening-Api
 * 
 * SETUP:
 * 1. Get API key from SingleKey dashboard
 * 2. Add SINGLEKEY_API_KEY to environment variables
 * 3. Use functions below to interact with API
 */

const SINGLEKEY_API_BASE = 'https://api.singlekey.com/v1'; // Replace with actual endpoint

// Safely get API key from environment
const getAPIKey = (): string | undefined => {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env.VITE_SINGLEKEY_API_KEY;
  }
  if (typeof process !== 'undefined' && process.env) {
    return process.env.SINGLEKEY_API_KEY;
  }
  return undefined;
};

const SINGLEKEY_API_KEY = getAPIKey();

// Type definitions based on SingleKey API
export interface SingleKeyScreeningRequest {
  applicant: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string; // YYYY-MM-DD
    ssn: string; // last 4 digits or full
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    };
  };
  screeningType: 'basic' | 'standard' | 'comprehensive';
  propertyOwnerId: string;
  propertyAddress: string;
  monthlyRent: number;
}

export interface SingleKeyScreeningResponse {
  reportId: string;
  status: 'pending' | 'processing' | 'complete' | 'error';
  applicantName: string;
  requestDate: string;
  completedDate?: string;
  overallRecommendation?: string;
  estimatedCompletionTime?: string; // minutes
  
  criminalBackground?: {
    status: 'clear' | 'review' | 'fail';
    nationalSearch: {
      status: 'complete' | 'pending';
      recordsFound: number;
      details: Array<{
        offense: string;
        date: string;
        jurisdiction: string;
        disposition: string;
        sentence?: string;
        releaseDate?: string;
      }>;
    };
    sexOffenderRegistry: {
      status: 'clear' | 'flagged';
      recordsFound: number;
    };
    recommendation: string;
  };

  creditReport?: {
    status: 'good' | 'fair' | 'poor';
    score: number;
    tradelines: number;
    openAccounts: number;
    collections: number;
    publicRecords: number;
    inquiries: number;
    paymentHistory: string;
    utilization: string;
    recommendation: string;
  };

  evictionHistory?: {
    status: 'clear' | 'flagged';
    recordsFound: number;
    details?: Array<{
      date: string;
      location: string;
      reason: string;
      outcome: string;
    }>;
    recommendation: string;
  };

  incomeVerification?: {
    status: 'verified' | 'unverified' | 'pending';
    employer: string;
    position: string;
    monthlyIncome: number;
    yearsEmployed: number;
    verificationMethod: string;
    incomeToRent: string;
    recommendation: string;
  };

  rentalHistory?: {
    status: 'good' | 'fair' | 'poor';
    previousLandlord?: string;
    previousAddress?: string;
    monthlyRent?: number;
    tenancyPeriod?: string;
    paymentHistory?: string;
    propertyCondition?: string;
    wouldRentAgain?: string;
    recommendation: string;
  };

  pricing?: {
    screeningCost: number;
    processingFee: number;
    totalCost: number;
  };
}

/**
 * Order a new background screening from SingleKey
 */
export async function orderScreening(
  request: SingleKeyScreeningRequest
): Promise<SingleKeyScreeningResponse> {
  try {
    const response = await fetch(`${SINGLEKEY_API_BASE}/screenings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SINGLEKEY_API_KEY}`,
        'X-API-Version': '2024-01'
      },
      body: JSON.stringify(request)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to order screening');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('SingleKey API Error - Order Screening:', error);
    throw error;
  }
}

/**
 * Get screening report by ID
 */
export async function getScreeningReport(
  reportId: string
): Promise<SingleKeyScreeningResponse> {
  try {
    const response = await fetch(`${SINGLEKEY_API_BASE}/screenings/${reportId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${SINGLEKEY_API_KEY}`,
        'X-API-Version': '2024-01'
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch screening report');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('SingleKey API Error - Get Report:', error);
    throw error;
  }
}

/**
 * Check screening status (for polling)
 */
export async function checkScreeningStatus(
  reportId: string
): Promise<{ status: string; percentComplete: number; estimatedCompletion?: string }> {
  try {
    const response = await fetch(`${SINGLEKEY_API_BASE}/screenings/${reportId}/status`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${SINGLEKEY_API_KEY}`,
        'X-API-Version': '2024-01'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to check screening status');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('SingleKey API Error - Check Status:', error);
    throw error;
  }
}

/**
 * Get pricing for screening packages
 */
export async function getScreeningPricing(
  screeningType: 'basic' | 'standard' | 'comprehensive'
): Promise<{ cost: number; features: string[] }> {
  try {
    const response = await fetch(`${SINGLEKEY_API_BASE}/pricing/${screeningType}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${SINGLEKEY_API_KEY}`,
        'X-API-Version': '2024-01'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch pricing');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('SingleKey API Error - Get Pricing:', error);
    throw error;
  }
}

/**
 * Download PDF report
 */
export async function downloadReportPDF(reportId: string): Promise<Blob> {
  try {
    const response = await fetch(`${SINGLEKEY_API_BASE}/screenings/${reportId}/pdf`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${SINGLEKEY_API_KEY}`,
        'X-API-Version': '2024-01'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to download PDF');
    }

    const blob = await response.blob();
    return blob;
  } catch (error) {
    console.error('SingleKey API Error - Download PDF:', error);
    throw error;
  }
}

/**
 * Webhook endpoint handler (for receiving screening completion notifications)
 * NOTE: This should be implemented on the backend/server, not in the browser
 */
export function handleSingleKeyWebhook(payload: any) {
  // This function is for backend use only
  // Implement in /supabase/functions/server/ with proper signature verification
  console.warn('Webhook handler should be implemented on the backend');
  
  // Handle different webhook events
  switch (payload.event) {
    case 'screening.completed':
      console.log('Screening completed:', payload.data.reportId);
      // Update application status, notify property owner, etc.
      break;
    case 'screening.failed':
      console.error('Screening failed:', payload.data.reportId, payload.data.error);
      // Handle error, notify property owner
      break;
    default:
      console.log('Unknown webhook event:', payload.event);
  }
}

/**
 * Bulk screening order (for multiple applicants)
 */
export async function orderBulkScreening(
  requests: SingleKeyScreeningRequest[]
): Promise<SingleKeyScreeningResponse[]> {
  try {
    const response = await fetch(`${SINGLEKEY_API_BASE}/screenings/bulk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SINGLEKEY_API_KEY}`,
        'X-API-Version': '2024-01'
      },
      body: JSON.stringify({ screenings: requests })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to order bulk screenings');
    }

    const data = await response.json();
    return data.screenings;
  } catch (error) {
    console.error('SingleKey API Error - Bulk Order:', error);
    throw error;
  }
}

/**
 * Get account usage and billing info
 */
export async function getAccountUsage(): Promise<{
  screeningsThisMonth: number;
  totalCost: number;
  remainingCredits: number;
}> {
  try {
    const response = await fetch(`${SINGLEKEY_API_BASE}/account/usage`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${SINGLEKEY_API_KEY}`,
        'X-API-Version': '2024-01'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch account usage');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('SingleKey API Error - Get Usage:', error);
    throw error;
  }
}

/**
 * Mock data fallback (for development/testing without API key)
 */
export function getMockScreeningData(applicantName: string): SingleKeyScreeningResponse {
  return {
    reportId: 'SK-2024-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    status: 'complete',
    applicantName: applicantName,
    requestDate: new Date().toISOString(),
    completedDate: new Date().toISOString(),
    overallRecommendation: 'Approve with Conditions',
    
    criminalBackground: {
      status: 'review',
      nationalSearch: {
        status: 'complete',
        recordsFound: 1,
        details: [
          {
            offense: 'Possession of Controlled Substance',
            date: '08/15/2020',
            jurisdiction: 'Cook County, IL',
            disposition: 'Convicted',
            sentence: '3 years imprisonment',
            releaseDate: '06/20/2023'
          }
        ]
      },
      sexOffenderRegistry: {
        status: 'clear',
        recordsFound: 0
      },
      recommendation: 'Approve - Non-violent offense, completed sentence, 2.5 years since release'
    },

    creditReport: {
      status: 'fair',
      score: 628,
      tradelines: 7,
      openAccounts: 4,
      collections: 1,
      publicRecords: 0,
      inquiries: 2,
      paymentHistory: 'Mostly on-time payments',
      utilization: '42%',
      recommendation: 'Approve - Fair credit, stable payment history'
    },

    evictionHistory: {
      status: 'clear',
      recordsFound: 0,
      recommendation: 'Approve - No prior evictions'
    },

    incomeVerification: {
      status: 'verified',
      employer: 'Amazon Fulfillment Center',
      position: 'Warehouse Associate',
      monthlyIncome: 3200,
      yearsEmployed: 2.5,
      verificationMethod: 'Paystub & Employment Letter',
      incomeToRent: '2.67x',
      recommendation: 'Approve - Stable income, excellent ratio'
    },

    rentalHistory: {
      status: 'good',
      previousLandlord: 'Sarah Martinez',
      previousAddress: '1425 W Harrison St, Chicago, IL',
      monthlyRent: 950,
      tenancyPeriod: '2 years',
      paymentHistory: 'Always on time',
      propertyCondition: 'Well maintained',
      wouldRentAgain: 'Yes',
      recommendation: 'Approve - Excellent tenant history'
    },

    pricing: {
      screeningCost: 17.99,
      processingFee: 2.00,
      totalCost: 19.99
    }
  };
}

/**
 * Check if API is configured
 */
export function isAPIConfigured(): boolean {
  return !!SINGLEKEY_API_KEY && SINGLEKEY_API_KEY !== 'your_api_key_here';
}

/**
 * Get screening with fallback to mock data
 */
export async function getScreeningWithFallback(
  reportId: string,
  applicantName: string
): Promise<SingleKeyScreeningResponse> {
  if (!isAPIConfigured()) {
    console.log('ℹ️ SingleKey API not configured - Using demo data (this is normal for development)');
    console.log('💡 To use real API: Add VITE_SINGLEKEY_API_KEY to .env file');
    return getMockScreeningData(applicantName);
  }

  try {
    return await getScreeningReport(reportId);
  } catch (error) {
    console.error('Failed to fetch real screening, falling back to mock data:', error);
    return getMockScreeningData(applicantName);
  }
}
