import { projectId, publicAnonKey } from './supabase/info';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-a6daf7a5`;

// Helper function to make API requests
async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${publicAnonKey}`,
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    console.error(`API Error (${endpoint}):`, data);
    throw new Error(data.error || 'API request failed');
  }

  return data;
}

// ============================================
// USER API
// ============================================

export const userAPI = {
  // Get user profile
  async getUser(userId: string) {
    return apiRequest(`/users/${userId}`);
  },

  // Save user profile
  async saveUser(userId: string, userData: any) {
    return apiRequest(`/users/${userId}`, {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Get user's applications
  async getUserApplications(userId: string) {
    return apiRequest(`/users/${userId}/applications`);
  },

  // Get user's claims
  async getUserClaims(userId: string) {
    return apiRequest(`/users/${userId}/claims`);
  },

  // Get user's payments
  async getUserPayments(userId: string) {
    return apiRequest(`/users/${userId}/payments`);
  },
};

// ============================================
// MARKETPLACE API
// ============================================

export const marketplaceAPI = {
  // Get all items
  async getAllItems() {
    return apiRequest('/marketplace/items');
  },

  // Get single item
  async getItem(itemId: string) {
    return apiRequest(`/marketplace/items/${itemId}`);
  },

  // Create new item
  async createItem(itemData: any) {
    return apiRequest('/marketplace/items', {
      method: 'POST',
      body: JSON.stringify(itemData),
    });
  },

  // Update item
  async updateItem(itemId: string, updates: any) {
    return apiRequest(`/marketplace/items/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  // Delete item
  async deleteItem(itemId: string) {
    return apiRequest(`/marketplace/items/${itemId}`, {
      method: 'DELETE',
    });
  },

  // Get claims for an item
  async getItemClaims(itemId: string) {
    return apiRequest(`/marketplace/items/${itemId}/claims`);
  },
};

// ============================================
// CLAIMS API
// ============================================

export const claimsAPI = {
  // Create claim
  async createClaim(claimData: {
    userId: string;
    itemId: string;
    story: string;
    userScore: number;
  }) {
    return apiRequest('/marketplace/claims', {
      method: 'POST',
      body: JSON.stringify(claimData),
    });
  },

  // Update claim (approve/deny)
  async updateClaim(claimId: string, updates: { status: string; [key: string]: any }) {
    return apiRequest(`/marketplace/claims/${claimId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  // Approve claim
  async approveClaim(claimId: string) {
    return this.updateClaim(claimId, { status: 'approved' });
  },

  // Deny claim
  async denyClaim(claimId: string, reason?: string) {
    return this.updateClaim(claimId, { 
      status: 'denied',
      ...(reason && { denialReason: reason })
    });
  },

  // Complete claim (item picked up)
  async completeClaim(claimId: string) {
    return this.updateClaim(claimId, { status: 'completed' });
  },
};

// ============================================
// JOB APPLICATIONS API
// ============================================

export const jobApplicationsAPI = {
  // Create application
  async createApplication(appData: {
    userId: string;
    employerId: string;
    jobId: string;
    [key: string]: any;
  }) {
    return apiRequest('/applications', {
      method: 'POST',
      body: JSON.stringify(appData),
    });
  },

  // Get employer's applications
  async getEmployerApplications(employerId: string) {
    return apiRequest(`/employers/${employerId}/applications`);
  },

  // Update application status
  async updateApplication(appId: string, updates: any) {
    return apiRequest(`/applications/${appId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  // Approve application
  async approveApplication(appId: string) {
    return this.updateApplication(appId, { status: 'approved' });
  },

  // Deny application
  async denyApplication(appId: string, reason?: string) {
    return this.updateApplication(appId, { 
      status: 'denied',
      ...(reason && { denialReason: reason })
    });
  },
};

// ============================================
// HOUSING APPLICATIONS API
// ============================================

export const housingAPI = {
  // Create housing application (FastTrack)
  async createApplication(appData: {
    userId: string;
    propertyId: string;
    [key: string]: any;
  }) {
    return apiRequest('/housing/applications', {
      method: 'POST',
      body: JSON.stringify(appData),
    });
  },

  // Get property's applications
  async getPropertyApplications(propertyId: string) {
    return apiRequest(`/properties/${propertyId}/applications`);
  },
};

// ============================================
// PAYMENTS API
// ============================================

export const paymentsAPI = {
  // Record payment
  async recordPayment(paymentData: {
    userId: string;
    amount: number;
    type: 'fasttrack' | 'subscription' | 'other';
    paymentMethod: 'stripe' | 'paypal';
    [key: string]: any;
  }) {
    return apiRequest('/payments', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  },
};

// ============================================
// TAX RECEIPTS API
// ============================================

export const taxReceiptsAPI = {
  // Generate tax receipt
  async createReceipt(receiptData: {
    donorId: string;
    itemName: string;
    recipient: string;
    fairMarketValue: number;
    category: string;
    donorName: string;
    donorAddress: string;
  }) {
    return apiRequest('/tax-receipts', {
      method: 'POST',
      body: JSON.stringify(receiptData),
    });
  },

  // Get donor's receipts
  async getDonorReceipts(donorId: string) {
    return apiRequest(`/donors/${donorId}/receipts`);
  },
};

// Export all APIs as a single object for convenience
export const api = {
  user: userAPI,
  marketplace: marketplaceAPI,
  claims: claimsAPI,
  jobApplications: jobApplicationsAPI,
  housing: housingAPI,
  payments: paymentsAPI,
  taxReceipts: taxReceiptsAPI,
};

export default api;
