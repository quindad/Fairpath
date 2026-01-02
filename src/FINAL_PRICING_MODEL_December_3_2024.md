# 🎯 FINAL PRICING MODEL - CONFIRMED BY STERLING
**Timestamp:** December 3, 2024 - 3:25 PM EST  
**Status:** APPROVED - Ready to implement across all components  
**Decision Maker:** Sterling Braden (Founder)

---

## 💰 OFFICIAL PRICING STRUCTURE:

### **FREE TIER:**
```
Cost: $0/month

Features:
- ✅ 2 marketplace claims per month (FREEMIUM HOOK!)
- ❌ No AI features
- ✅ Browse jobs (felon-friendly filtered)
- ✅ Browse housing (felon-friendly filtered)
- ✅ Access to all 13 Resource Center modules
- ✅ Basic profile
- ✅ In-app messaging
- ✅ Notifications

Housing Applications:
- $75 per application (no discount)

Services:
- Full price (no discount)
```

---

### **FAIRPATH+ TIER:**
```
Cost: $2/month ($24/year)

Features:
- ✅ 5 marketplace claims per month
- ❌ NO AI features (reserved for Pro)
- ✅ All Free tier features
- ✅ Priority support
- ✅ Exclusive deals/discounts

Housing Applications:
- $70 per application (save $5) ← CONFIRM WITH STERLING
  OR
- $65 per application (save $10) ← CONFIRM WITH STERLING

Services:
- $5 off per booking ← CONFIRM WITH STERLING
  OR
- No discount ← CONFIRM WITH STERLING
```

---

### **FAIRPATH PRO TIER:**
```
Cost: $5/month ($60/year)

Features:
- ✅ 10 marketplace claims per month
- ✅ ALL 10 AI features (full access)
- ✅ Global AI chatbot (100 chats/month)
- ✅ All FairPath+ features
- ✅ Priority AI support
- ✅ Advanced analytics
- ✅ Early access to new features

Housing Applications:
- $65 per application (save $10) ← CONFIRMED

Services:
- $10 off per booking ← CONFIRMED

AI Features Included:
1. AI Credit Repair Studio
2. AI Resume Optimizer
3. AI Interview Coach
4. AI Job Matcher Pro
5. AI Business Plan Generator
6. AI Legal Assistant
7. AI Document Analyzer
8. AI Budget Analyzer
9. AI Reentry Planner
10. AI Chatbot (context-aware)
```

---

## 📊 REVENUE COMPARISON:

### **Per 1,000 Users:**

**100% Free Users:**
```
Subscription revenue: $0
Housing apps (avg 2/user/year): 2,000 apps × $30 platform = $60,000/year
Marketplace claims: 2,000 claims/month (no revenue)
Total revenue: $60,000/year
```

**50% Plus / 50% Free:**
```
Subscription revenue: 500 × $24/year = $12,000/year
Housing apps Plus: 1,000 apps × $28 platform = $28,000/year
Housing apps Free: 1,000 apps × $30 platform = $30,000/year
Marketplace claims: 3,500 claims/month (no revenue, but donor value)
Total revenue: $70,000/year (+17% vs all free!)
```

**30% Pro / 30% Plus / 40% Free:**
```
Subscription revenue:
  - 300 Pro × $60/year = $18,000
  - 300 Plus × $24/year = $7,200
  - Subtotal: $25,200/year

Housing apps:
  - 600 Pro apps × $26 platform = $15,600/year
  - 600 Plus apps × $28 platform = $16,800/year
  - 800 Free apps × $30 platform = $24,000/year
  - Subtotal: $56,400/year

AI costs (Pro users):
  - 300 users × $30/year AI costs = $9,000/year

Services (15% platform fee):
  - Estimate $50,000/year × 15% = $7,500/year

Total revenue: $89,100/year
Total costs: $9,000/year (AI)
Net revenue: $80,100/year (+33% vs all free!)
```

**THE FREEMIUM HOOK WORKS!** 🎯
2 free claims gets users hooked → Upgrade to 5 claims (Plus) → Upgrade to 10 claims + AI (Pro)

---

## 🔧 TECHNICAL IMPLEMENTATION:

### **Marketplace Claim Limits (Updated):**
```typescript
// In subscription context
const getMarketplaceClaimLimit = (tier: string): number => {
  switch(tier) {
    case 'free': return 2;  // ← UPDATED from 3 to 2
    case 'plus': return 5;  // ← CONFIRMED
    case 'pro': return 10;  // ← CONFIRMED
    default: return 0;
  }
}
```

### **Housing Application Pricing (Pending Sterling Confirmation):**
```typescript
// OPTION 1: Gradual discount ladder
const getHousingApplicationPrice = (tier: string): number => {
  switch(tier) {
    case 'free': return 75;
    case 'plus': return 70;  // Save $5
    case 'pro': return 65;   // Save $10
    default: return 75;
  }
}

// OPTION 2: Bigger discount for Pro only
const getHousingApplicationPrice = (tier: string): number => {
  switch(tier) {
    case 'free': return 75;
    case 'plus': return 75;  // No discount
    case 'pro': return 65;   // Save $10
    default: return 75;
  }
}

// STERLING: Which option? Option 1 recommended (gradual ladder)
```

---

## 💡 OPENAI API KEY - ALREADY CONFIGURED:

**CONFIRMED:** OpenAI API key is already set up and working on mobile side!

**Where it's stored:**
- Likely in Supabase environment variables
- Accessible via Edge Functions
- Already tested and working

**What this means:**
- ✅ Web tab can use the same API key
- ✅ No need for Sterling to provide it again
- ✅ AI features can share the same OpenAI account
- ✅ Usage tracking works across both tabs

**Implementation:**
```typescript
// Both tabs access the same OpenAI key
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// OpenAI key likely stored as:
const openaiKey = process.env.OPENAI_API_KEY

// Or retrieved from Supabase secrets
const { data } = await supabase
  .from('secrets')
  .select('value')
  .eq('key', 'openai_api_key')
  .single()
```

---

## ⏳ STILL NEED FROM STERLING:

1. ✅ **Confirm Plus housing discount:** $70 (save $5) or $75 (no discount)?
2. ✅ **Confirm Plus services discount:** $5 off or no discount?
3. ⏸️ SingleKey API docs + key (for background checks)
4. ⏸️ Stripe account details (for payment processing)

---

## 🚀 READY TO UPDATE (ONCE STERLING CONFIRMS HOUSING/SERVICES):

**Files I'll update in next 2 hours:**

### **Property Owner Components (Revenue Calculations):**
1. `/components/property/FastTrackRevenueExplainer.tsx` - Already updated to 60/40
2. `/components/property/LandlordRevShareInfoFixed.tsx` - Update revenue examples
3. `/components/property/PropertyOwnerPricingComplete.tsx` - Update pricing page
4. `/components/property/PropertyDashboardPackageBased.tsx` - Add countdown + claims
5. `/components/property/ApproveApplicationFlow.tsx` - Reset countdown logic
6. `/components/property/DenyApplicationFlow.tsx` - Penalty tracking

### **Payment Components:**
7. `/components/payment/PaymentFlow.tsx` - Update pricing ($70 or $75 for Plus)
8. `/components/payment/PaymentConfirmation.tsx` - Show tier-specific pricing
9. `/components/felon/HousingApplicationFlow.tsx` - User-facing pricing

### **Data Files:**
10. `/data/mockData.ts` - Update all revenue calculations

### **New Components to Build:**
11. `/components/property/AccountabilityCountdown.tsx` - 20 apps / 60 days tracker
12. `/components/property/ImpactFundTracker.tsx` - Impact Fund balance/stories
13. `/components/admin/RevenueMetricsDashboard.tsx` - Platform analytics
14. `/utils/accountabilityTracker.ts` - Countdown logic utility

### **API Endpoints to Create:**
15. `GET /api/landlord/{id}/felon-friendly-status` - Badge status
16. `GET /api/housing/search?sort=felon_friendly_first` - Ranked search
17. `GET /api/impact-fund/stats` - Public transparency metrics
18. `POST /api/housing/schedule-showing` - Showing scheduler

---

## 📊 UPDATED REVENUE SPLITS (WITH CONFIRMED PRICING):

### **Scenario 1: Free User ($75 application)**
```
Application fee: $75

Revenue split:
- Platform: $30 (40%)
  - SingleKey cost: $17.99-$21.99
  - Platform NET: $8.01-$12.01

- Landlord: $45 (60%) IF they rent
  OR $27 (36%) IF they don't rent

- Impact Fund: $0 IF landlord rents
  OR $18 (24%) IF landlord doesn't rent

Total: $75 ✅
```

### **Scenario 2: Plus User ($70 application) [IF STERLING CONFIRMS]**
```
Application fee: $70

Revenue split:
- Platform: $28 (40%)
  - SingleKey cost: $17.99-$21.99
  - Platform NET: $6.01-$10.01

- Landlord: $42 (60%) IF they rent
  OR $25.20 (36%) IF they don't rent

- Impact Fund: $0 IF landlord rents
  OR $16.80 (24%) IF landlord doesn't rent

Total: $70 ✅
```

### **Scenario 3: Pro User ($65 application)**
```
Application fee: $65

Revenue split:
- Platform: $26 (40%)
  - SingleKey cost: $17.99-$21.99
  - Platform NET: $4.01-$8.01

- Landlord: $39 (60%) IF they rent
  OR $23.40 (36%) IF they don't rent

- Impact Fund: $0 IF landlord rents
  OR $15.60 (24%) IF landlord doesn't rent

Total: $65 ✅
```

**NOTE:** Platform margins are tighter on Plus/Pro applications, but we make it up with:
- Subscription revenue ($2 or $5/month)
- Higher application volume (more users applying)
- Services revenue (15% platform fee)

---

## ✅ CONFIRMED DECISIONS:

- ✅ **Free tier:** 2 marketplace claims/month
- ✅ **Plus tier:** 5 marketplace claims/month, $2/month
- ✅ **Pro tier:** 10 marketplace claims/month, $5/month, ALL AI
- ✅ **Pro housing:** $65/application (save $10)
- ✅ **Pro services:** $10 off per booking
- ✅ **OpenAI key:** Already configured and working
- ✅ **60/40 revenue split:** Landlord 60%, Platform 40%
- ✅ **Accountability:** 20 apps or 60 days, or drop to 36%

---

## ⏸️ PENDING STERLING CONFIRMATION:

- ⏸️ **Plus housing:** $70/application (save $5) or $75 (no discount)?
- ⏸️ **Plus services:** $5 off per booking or no discount?

---

**STERLING: Just confirm Plus tier housing/services pricing and I'll update all 18 files!** 🚀
