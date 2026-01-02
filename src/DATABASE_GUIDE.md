# 🔥 Friend A Felon - Supabase Database Guide

## **Overview**

Friend A Felon uses **Supabase** as the backend with a **Key-Value Store** architecture. This guide explains how the database works and how to use it in your components.

---

## **Architecture**

```
┌─────────────┐          ┌──────────────────┐          ┌─────────────┐
│   Frontend  │  ─────>  │  Hono API Server │  ─────>  │  Supabase   │
│   (React)   │  <─────  │  (Edge Function) │  <─────  │  KV Store   │
└─────────────┘          └──────────────────┘          └─────────────┘
```

### **Three-Tier Architecture:**
1. **Frontend** (React components) → Makes API calls
2. **Server** (`/supabase/functions/server/index.tsx`) → Handles requests
3. **Database** (Supabase KV Store) → Stores data

---

## **How It Works**

### **1. The Key-Value Store**

The database uses a **key-value pattern** where:
- **Keys** are strings like `"user:123"` or `"marketplace:item:abc"`
- **Values** are JSON objects with your data

### **2. The API Server**

The Hono server at `/supabase/functions/server/index.tsx` provides REST API endpoints:

```typescript
// Example endpoints:
GET    /make-server-a6daf7a5/users/:userId
POST   /make-server-a6daf7a5/marketplace/items
PUT    /make-server-a6daf7a5/marketplace/claims/:claimId
DELETE /make-server-a6daf7a5/marketplace/items/:itemId
```

### **3. The Frontend API Client**

Use `/utils/api.ts` to call the backend from any component:

```typescript
import api from './utils/api';

// Get marketplace items
const { data } = await api.marketplace.getAllItems();

// Create a new item
const item = await api.marketplace.createItem({
  title: 'Queen Mattress',
  category: 'Furniture',
  donorId: 'user-123',
  // ... more fields
});

// Approve a claim
await api.claims.approveClaim('claim-456');
```

---

## **Data Structure**

### **Key Naming Convention**

We use prefixes to organize data:

| Prefix | Example | Purpose |
|--------|---------|---------|
| `user:` | `user:abc123` | User profiles |
| `marketplace:item:` | `marketplace:item:xyz789` | Marketplace items |
| `marketplace:claim:` | `marketplace:claim:claim123` | Claims on items |
| `application:` | `application:app456` | Job applications |
| `housing:application:` | `housing:application:housing789` | Housing applications |
| `payment:` | `payment:pay123` | Payment records |
| `tax-receipt:` | `tax-receipt:receipt456` | Tax receipts |

### **Multi-Key Storage**

Some data is stored with **multiple keys** for fast lookups:

```typescript
// When creating a claim, we store it THREE ways:
await kv.mset([
  [`marketplace:claim:${claimId}`, claim],                    // By claim ID
  [`marketplace:claim:item:${itemId}:${claimId}`, claim],     // By item ID
  [`marketplace:claim:user:${userId}:${claimId}`, claim]      // By user ID
]);

// This allows fast queries:
// - Get claim by ID: kv.get('marketplace:claim:claim123')
// - Get all claims for item: kv.getByPrefix('marketplace:claim:item:xyz:')
// - Get all claims by user: kv.getByPrefix('marketplace:claim:user:abc:')
```

---

## **Using the API in Components**

### **Example 1: Post a Marketplace Item (Donor)**

```typescript
import { useState } from 'react';
import api from './utils/api';

function PostItemForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (itemData) => {
    setLoading(true);
    try {
      const response = await api.marketplace.createItem({
        title: itemData.title,
        description: itemData.description,
        category: itemData.category,
        fairMarketValue: itemData.value,
        donorId: 'donor-123', // Current user ID
        pickupLocation: itemData.location,
        pickupInstructions: itemData.instructions,
        photos: itemData.photos,
        taxDeductible: true
      });

      console.log('Item created:', response.data);
      alert('✅ Item posted successfully!');
    } catch (error) {
      console.error('Error posting item:', error);
      alert('❌ Failed to post item');
    } finally {
      setLoading(false);
    }
  };

  // ... rest of component
}
```

### **Example 2: Claim an Item (Justice-Impacted User)**

```typescript
import api from './utils/api';

async function claimItem(itemId: string, story: string) {
  try {
    const response = await api.claims.createClaim({
      userId: 'user-456',      // Current user ID
      itemId: itemId,
      story: story,
      userScore: 742           // User's FairPath Score
    });

    console.log('Claim created:', response.data);
    alert('✅ Claim submitted! Donor will review shortly.');
  } catch (error) {
    console.error('Error claiming item:', error);
    alert('❌ Failed to claim item');
  }
}
```

### **Example 3: Approve a Claim (Donor)**

```typescript
import api from './utils/api';

async function handleApproveClaim(claimId: string) {
  try {
    await api.claims.approveClaim(claimId);
    
    // Generate tax receipt after approval
    await api.taxReceipts.createReceipt({
      donorId: 'donor-123',
      itemName: 'Queen Mattress & Box Spring',
      recipient: 'Marcus Johnson',
      fairMarketValue: 350,
      category: 'Furniture',
      donorName: 'Sarah Johnson',
      donorAddress: '456 Oak Street, Chicago, IL 60614'
    });

    alert('✅ Claim approved! Tax receipt generated.');
  } catch (error) {
    console.error('Error approving claim:', error);
    alert('❌ Failed to approve claim');
  }
}
```

### **Example 4: Load Dashboard Data**

```typescript
import { useState, useEffect } from 'react';
import api from './utils/api';

function DonorDashboard() {
  const [myItems, setMyItems] = useState([]);
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        // Get all marketplace items
        const itemsResponse = await api.marketplace.getAllItems();
        
        // Filter for current user's items
        const myItems = itemsResponse.data.filter(
          item => item.donorId === 'donor-123'
        );
        setMyItems(myItems);

        // Get claims for user's items
        const claimsPromises = myItems.map(item => 
          api.marketplace.getItemClaims(item.id)
        );
        const claimsResponses = await Promise.all(claimsPromises);
        const allClaims = claimsResponses.flatMap(r => r.data);
        setClaims(allClaims);

      } catch (error) {
        console.error('Error loading dashboard:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) return <div>Loading...</div>;

  // ... render dashboard
}
```

---

## **Available API Methods**

### **User API**

```typescript
await api.user.getUser(userId);
await api.user.saveUser(userId, userData);
await api.user.getUserApplications(userId);
await api.user.getUserClaims(userId);
await api.user.getUserPayments(userId);
```

### **Marketplace API**

```typescript
await api.marketplace.getAllItems();
await api.marketplace.getItem(itemId);
await api.marketplace.createItem(itemData);
await api.marketplace.updateItem(itemId, updates);
await api.marketplace.deleteItem(itemId);
await api.marketplace.getItemClaims(itemId);
```

### **Claims API**

```typescript
await api.claims.createClaim({ userId, itemId, story, userScore });
await api.claims.updateClaim(claimId, updates);
await api.claims.approveClaim(claimId);
await api.claims.denyClaim(claimId, reason);
await api.claims.completeClaim(claimId);
```

### **Job Applications API**

```typescript
await api.jobApplications.createApplication(appData);
await api.jobApplications.getEmployerApplications(employerId);
await api.jobApplications.updateApplication(appId, updates);
await api.jobApplications.approveApplication(appId);
await api.jobApplications.denyApplication(appId, reason);
```

### **Housing API**

```typescript
await api.housing.createApplication(appData);
await api.housing.getPropertyApplications(propertyId);
```

### **Payments API**

```typescript
await api.payments.recordPayment({
  userId,
  amount,
  type: 'fasttrack' | 'subscription',
  paymentMethod: 'stripe' | 'paypal'
});
```

### **Tax Receipts API**

```typescript
await api.taxReceipts.createReceipt(receiptData);
await api.taxReceipts.getDonorReceipts(donorId);
```

---

## **Common Patterns**

### **Pattern 1: Save User Data After Onboarding**

```typescript
// In onboarding component
const handleOnboardingComplete = async (formData) => {
  const userId = `user-${Date.now()}`;
  
  await api.user.saveUser(userId, {
    ...formData,
    userType: 'user', // or 'donor', 'employer', etc.
    createdAt: new Date().toISOString(),
    fairPathScore: 0
  });

  // Navigate to dashboard
};
```

### **Pattern 2: Real-time Updates**

```typescript
// After approving a claim, update local state
const handleApprove = async (claimId) => {
  await api.claims.approveClaim(claimId);
  
  // Update local state
  setClaims(claims.map(c => 
    c.id === claimId 
      ? { ...c, status: 'approved' }
      : c
  ));
};
```

### **Pattern 3: Batch Operations**

```typescript
// Load multiple related datasets
const [items, claims, receipts] = await Promise.all([
  api.marketplace.getAllItems(),
  api.user.getUserClaims(userId),
  api.taxReceipts.getDonorReceipts(userId)
]);
```

---

## **Error Handling**

Always wrap API calls in try-catch:

```typescript
try {
  const response = await api.marketplace.createItem(itemData);
  console.log('Success:', response.data);
} catch (error) {
  console.error('API Error:', error.message);
  // Show user-friendly error message
  alert(`Failed to create item: ${error.message}`);
}
```

---

## **Testing the Database**

### **1. Test the Health Endpoint**

Open browser console and run:

```javascript
const projectId = "mutlyfxchedrxckwrthv";
const publicAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11dGx5ZnhjaGVkcnhja3dydGh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2MjEzODEsImV4cCI6MjA4MDE5NzM4MX0.kb8b5glW9nzGlNF3gb1qgn_Fx0ahvHSnIOwGkL-93mE";

fetch(`https://${projectId}.supabase.co/functions/v1/make-server-a6daf7a5/health`, {
  headers: {
    'Authorization': `Bearer ${publicAnonKey}`
  }
})
.then(r => r.json())
.then(console.log);

// Expected: { status: "ok" }
```

### **2. Test Creating an Item**

```javascript
import api from './utils/api';

const testItem = {
  title: 'Test Mattress',
  description: 'Queen size mattress in good condition',
  category: 'Furniture',
  fairMarketValue: 350,
  donorId: 'donor-test-123',
  pickupLocation: 'Chicago, IL',
  taxDeductible: true
};

const response = await api.marketplace.createItem(testItem);
console.log('Created item:', response.data);
```

### **3. Test Retrieving Items**

```javascript
import api from './utils/api';

const response = await api.marketplace.getAllItems();
console.log('All items:', response.data);
```

---

## **Next Steps**

1. ✅ **Server is ready** - All API endpoints are live
2. ✅ **API client is ready** - Import `api` from `/utils/api.ts`
3. 🔨 **Wire up components** - Replace mock data with real API calls
4. 🔨 **Add authentication** - Connect Supabase Auth for user login
5. 🔨 **Test thoroughly** - Make sure all flows work end-to-end

---

## **Quick Reference**

### **Import Statement**
```typescript
import api from './utils/api';
```

### **Most Common Operations**

```typescript
// Create
await api.marketplace.createItem(data);
await api.claims.createClaim(data);

// Read
await api.marketplace.getAllItems();
await api.user.getUser(userId);

// Update
await api.marketplace.updateItem(itemId, updates);
await api.claims.approveClaim(claimId);

// Delete
await api.marketplace.deleteItem(itemId);
```

---

## **🔥 YOU'RE READY TO BUILD!**

The database infrastructure is **100% ready**. Just import the `api` object and start making calls! 🚀
