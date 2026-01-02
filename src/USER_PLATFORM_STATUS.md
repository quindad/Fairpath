# FRIEND A FELON - USER PLATFORM BUILD STATUS

## ✅ COMPLETED COMPONENTS

### 1. Authentication & Onboarding
- ✅ **Onboarding (4 screens)** - Explains FAF vision, guaranteed showings, FastTrack pricing, subscription
- ✅ **Auth System** - Login/Signup with terms agreement and FCRA consent language
- ✅ **Account Type Selection** - User, Donor, Employer, Property, Resource partner paths

### 2. Profile Setup Wizard (5 Steps)
- ✅ **Step 1: Basic Info** - Name, city, state, phone
- ✅ **Step 2: Conviction Summary** - Charge types, years, release dates, supervision status
- ✅ **Step 3: Work & Skills** - Work history, skills, education, desired job fields
- ✅ **Step 4: Housing Status** - Current situation, income range
- ✅ **Step 5: Preferences** - Looking for housing/jobs/both, willing to relocate

### 3. Core App Structure
- ✅ **MainApp** - Navigation, screen routing, user context
- ✅ **AppMenu** - Side menu with settings
- ✅ **Bottom Navigation** - Home, Jobs, Housing, Free, Connect, Profile
- ✅ **User Context** - Profile data, subscription status passed through app

### 4. Subscription System
- ✅ **SubscriptionPage** - Full FAF+ page with:
  - $2/month pricing
  - Benefits breakdown (save $10 per app, 7 claims vs 1)
  - Value calculator showing savings
  - FAQ section
  - Active/inactive states

### 5. Home Dashboard
- ✅ **FastTrack status display** - Shows completion percentage
- ✅ **Pricing awareness** - Always shows $75 or $65 based on subscription
- ✅ **Quick actions** - Links to Housing, Jobs, Resources, Marketplace
- ✅ **Application tracking preview**
- ✅ **Recent activity feed**
- ✅ **Subscription upsell banner** (if not subscribed)

---

## 🚧 NEEDS TO BE BUILT

### 1. Housing Marketplace (CRITICAL)
**Requirements:**
- Listing data structure with eligibility metadata
- Eligibility engine that matches user convictions to property rules
- Toggle: "Only show what I'm eligible for" vs "Show all"
- Listing cards with badges:
  - "You're eligible" / "May not accept your record"
  - "FastTrack + Guaranteed Showing"
- Property detail page with full description
- Apply with FastTrack button showing correct fee

**Eligibility Logic:**
```typescript
interface PropertyListing {
  id: string;
  title: string;
  rent: string;
  requirements: {
    acceptsViolent: boolean;
    acceptsDrug: boolean;
    acceptsProperty: boolean;
    acceptsSex: boolean;
    acceptsFraud: boolean;
    yearsRequired?: number; // years since conviction
  };
  fastTrackEnabled: boolean;
  guaranteedShowing: boolean;
}

// Match user convictions against property requirements
function isEligible(userProfile: UserProfile, property: PropertyListing): boolean {
  // Check each conviction type
  // Check years since conviction
  // Return true/false
}
