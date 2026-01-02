# FairPath Legal - Mobile App Implementation Specification

## 🎯 Overview

FairPath Legal uses AI to instantly tell people if their criminal charges are eligible for expungement, then connects them with lawyers who can file the paperwork. This is a **game-changing feature** because 90% of people don't know they're eligible, and finding out usually costs $2,500+ and takes 6-12 months.

---

## 🧠 AI-POWERED EXPUNGEMENT ELIGIBILITY SYSTEM

### Core Technology
The AI analyzes user criminal records against all 50 states' expungement statutes to determine eligibility in real-time.

### What the AI Needs to Know (Per State):
1. **Eligible Charge Types** - Which convictions can be expunged (misdemeanors, certain felonies, drug offenses, etc.)
2. **Ineligible Charge Types** - What CAN'T be expunged (violent crimes, sex offenses, murder, etc.)
3. **Waiting Periods** - How long must pass after conviction/sentence completion
4. **Completion Requirements** - Must have finished probation, paid all fines, no new arrests
5. **Multiple Conviction Rules** - Some states limit expungements if you have multiple convictions
6. **Automatic vs Petition-Based** - Some states automatically seal records, others require filing

### State-Specific Examples:

**California:**
- Eligible: Most misdemeanors, some non-violent felonies
- Waiting Period: After probation/sentence complete
- Requirements: No new convictions, all fines paid
- Process: Must petition the court

**Texas:**
- Eligible: Class C misdemeanors, certain deferred adjudications
- Waiting Period: Varies by offense (2-5 years)
- Requirements: Clean record during waiting period
- Process: Petition for expungement or non-disclosure

**New York:**
- Eligible: Most misdemeanors, some felonies
- Waiting Period: 10 years for felonies, 3 years for misdemeanors
- Requirements: No new convictions
- Process: Certificate of Relief from Disabilities or Sealing

---

## 📱 MOBILE APP IMPLEMENTATION

### 1. ENHANCED USER SIGNUP FLOW

#### Current Signup
Right now users just enter basic info. We need to add detailed criminal history collection.

#### NEW CRIMINAL HISTORY SECTION (Required for all justice-impacted users)

**Add this to the onboarding flow after basic info:**

```typescript
interface CriminalCharge {
  id: string;
  userId: string;
  
  // Basic Info
  chargeType: string; // "Felony" | "Misdemeanor" | "Infraction"
  chargeName: string; // Exact name (e.g., "Possession of Controlled Substance")
  chargeCode: string; // State statute code (e.g., "CA H&S 11350")
  chargeCategory: string; // "Drug", "Property", "Violent", "White Collar", "DUI", "Other"
  
  // Location
  state: string; // Where convicted
  county: string;
  courtName?: string;
  
  // Dates
  arrestDate: string;
  convictionDate: string;
  sentenceCompletionDate: string; // When probation/parole/sentence ended
  
  // Sentence Details
  sentenceType: string; // "Probation", "Jail", "Prison", "Fine Only", "Deferred Adjudication"
  sentenceLengthMonths?: number;
  fineAmount?: number;
  finesPaid: boolean;
  
  // Case Details
  caseNumber: string;
  disposition: string; // "Guilty", "No Contest", "Deferred", "Dismissed"
  
  // Expungement Status
  expungementEligible: boolean | null; // AI determination
  expungementEligibleDate: string | null; // When they become eligible
  expungementReason: string; // Why eligible/ineligible
  expungementCheckedAt: string; // Last AI check timestamp
  
  // User Actions
  userNotified: boolean; // Have we notified them about eligibility?
  lawyerRecommended: boolean; // Have we sent them lawyer matches?
  inProgress: boolean; // Are they working with a lawyer?
  expunged: boolean; // Has it been cleared?
}
```

#### UI Flow for Criminal History Input

**Step 1: How Many Charges?**
- "How many criminal charges do you have on your record?"
- Simple number input
- "Don't worry - most charges can be explained. Be honest so we can help."

**Step 2: Enter Each Charge (One at a Time)**

For each charge, collect:

1. **State & County**
   - Dropdown for state
   - Text input for county

2. **Charge Type**
   - Radio buttons: Felony / Misdemeanor / Infraction

3. **Charge Name**
   - Text input with autocomplete (common charges)
   - "Enter exactly as it appears on your paperwork"
   - Examples: "DUI", "Possession of Marijuana", "Petty Theft"

4. **Charge Code** (Optional but helpful)
   - Text input
   - "If you know the statute code, enter it here (e.g., CA PC 484)"

5. **Category**
   - Dropdown: Drug Offense / Property Crime / Violent Crime / DUI / White Collar / Traffic / Other

6. **Dates**
   - Arrest Date (date picker)
   - Conviction Date (date picker)
   - Sentence Completion Date (date picker)
   - "When did you finish probation/parole/sentence?"

7. **Sentence Type**
   - Radio buttons: Probation / Jail / Prison / Fine Only / Deferred Adjudication

8. **Case Number**
   - Text input
   - "Found on court documents"

9. **Disposition**
   - Radio buttons: Guilty / No Contest / Deferred / Dismissed

10. **Fines Paid?**
    - Toggle: Yes / No
    - "Have you paid all fines and restitution?"

**After Each Charge Entered:**
- "Add Another Charge" button
- "I'm Done" button → Triggers AI analysis

---

### 2. AI ELIGIBILITY ANALYSIS ENGINE

#### When AI Runs:
1. **Immediately after user enters all charges** (during signup)
2. **Daily background job** (to catch people who become eligible)
3. **When user manually requests** ("Check Again" button)

#### AI Logic Pseudocode:

```typescript
async function checkExpungementEligibility(charge: CriminalCharge): Promise<EligibilityResult> {
  // 1. Get state-specific rules
  const stateRules = await getStateExpungementRules(charge.state);
  
  // 2. Check if charge type is eligible
  if (stateRules.ineligibleCharges.includes(charge.chargeCategory)) {
    return {
      eligible: false,
      reason: `${charge.chargeCategory} offenses cannot be expunged in ${charge.state}`,
      eligibleDate: null
    };
  }
  
  // 3. Check waiting period
  const daysSinceCompletion = getDaysBetween(charge.sentenceCompletionDate, today);
  const requiredDays = stateRules.waitingPeriodDays[charge.chargeType];
  
  if (daysSinceCompletion < requiredDays) {
    const eligibleDate = addDays(charge.sentenceCompletionDate, requiredDays);
    return {
      eligible: false,
      reason: `Must wait ${requiredDays} days after sentence completion. You'll be eligible on ${eligibleDate}.`,
      eligibleDate: eligibleDate
    };
  }
  
  // 4. Check if fines are paid
  if (!charge.finesPaid && stateRules.requiresFinesPaid) {
    return {
      eligible: false,
      reason: "All fines and restitution must be paid before expungement",
      eligibleDate: null
    };
  }
  
  // 5. Check multiple convictions rule
  const totalConvictions = await getUserTotalConvictions(charge.userId);
  if (totalConvictions > stateRules.maxConvictionsAllowed) {
    return {
      eligible: false,
      reason: `${charge.state} limits expungements to ${stateRules.maxConvictionsAllowed} conviction(s)`,
      eligibleDate: null
    };
  }
  
  // 6. ALL CHECKS PASSED
  return {
    eligible: true,
    reason: `This charge is eligible for expungement in ${charge.state}!`,
    eligibleDate: today
  };
}
```

#### State Rules Database Structure:

```typescript
interface StateExpungementRules {
  state: string;
  ineligibleCharges: string[]; // ["Violent", "Sex Offense", "Murder"]
  eligibleCharges: string[]; // ["Drug", "Property", "DUI", "Misdemeanor"]
  
  waitingPeriodDays: {
    "Felony": number; // e.g., 3650 (10 years)
    "Misdemeanor": number; // e.g., 1095 (3 years)
    "Infraction": number; // e.g., 365 (1 year)
  };
  
  requiresFinesPaid: boolean;
  requiresProbationComplete: boolean;
  maxConvictionsAllowed: number | null; // null = unlimited
  automaticSealing: boolean; // True if state auto-seals
  petitionRequired: boolean; // True if must file paperwork
  
  legalNotes: string; // Human-readable explanation
  sourceUrl: string; // Link to state statute
}
```

---

### 3. USER EXPERIENCE - SHOWING ELIGIBILITY

#### In User Profile - Criminal History Section

Display all charges in a list. For each charge, show a badge:

**If Eligible Now:**
```
┌────────────────────────────────────────┐
│ ✅ ELIGIBLE FOR EXPUNGEMENT            │
│                                         │
│ Possession of Marijuana (CA H&S 11357) │
│ Convicted: Jan 15, 2019                │
│ Completed: Apr 20, 2020                │
│                                         │
│ [View Lawyers] [Learn More]            │
└────────────────────────────────────────┘
```

**If Not Eligible Yet (But Will Be):**
```
┌────────────────────────────────────────┐
│ ⏳ ELIGIBLE IN 247 DAYS                │
│                                         │
│ DUI (CA VC 23152)                      │
│ Convicted: Jun 10, 2021                │
│ Eligible: Dec 15, 2024                 │
│                                         │
│ [Remind Me] [Learn More]               │
└────────────────────────────────────────┘
```

**If Not Eligible (Never):**
```
┌────────────────────────────────────────┐
│ ❌ NOT ELIGIBLE                        │
│                                         │
│ Robbery (CA PC 211)                    │
│ Convicted: Mar 5, 2018                 │
│                                         │
│ Violent felonies cannot be expunged    │
│ in California.                         │
│                                         │
│ [Learn More]                           │
└────────────────────────────────────────┘
```

#### Push Notifications

**When User Becomes Eligible:**
```
🎉 Great News!

Your [CHARGE NAME] conviction is now eligible for expungement!

Tap to connect with lawyers who can help clear your record.
```

**Countdown Reminders:**
```
⏰ 30 Days Until Eligibility

Your DUI conviction will be eligible for expungement on Dec 15, 2024.

We'll notify you when it's time to take action.
```

---

### 4. FAIRPATH LEGAL - LAWYER MARKETPLACE

#### Lawyer Profile Structure

```typescript
interface LawyerProfile {
  id: string;
  
  // Basic Info
  fullName: string;
  lawFirmName: string;
  licenseNumber: string;
  barAdmission: string[]; // ["California", "Nevada"]
  
  // Contact
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  
  // Services & Pricing
  services: {
    serviceName: string; // "Felony Expungement", "Misdemeanor Expungement", "Certificate of Rehabilitation"
    price: number; // In cents (e.g., 150000 = $1,500)
    estimatedTimeWeeks: number;
    description: string;
  }[];
  
  // Availability
  calendar: {
    dayOfWeek: string; // "Monday", "Tuesday", etc.
    startTime: string; // "09:00"
    endTime: string; // "17:00"
    available: boolean;
  }[];
  
  consultationFee: number; // 0 for free consultation
  
  // Platform
  monthlyFee: 10.00; // $10/month to list on FairPath Legal
  paymentCurrent: boolean;
  joinedDate: string;
  
  // Stats
  totalCases: number;
  successRate: number; // 0-100
  averageRating: number; // 0-5
  reviewCount: number;
  
  // Profile
  bio: string;
  specialties: string[]; // ["Drug Offenses", "DUI", "Juvenile Expungements"]
  languages: string[];
  profilePhotoUrl: string;
}
```

#### Lawyer Discovery & Booking Flow

**Step 1: User sees "Connect with Lawyers" button on eligible charge**

**Step 2: App shows filtered list of lawyers**
- Only lawyers licensed in user's state
- Only lawyers who offer the service type needed
- Sorted by: Rating, Price (low to high), Availability

**Step 3: Lawyer Profile Page**

Display:
- Profile photo
- Name, firm, bar number
- Rating & review count
- Services offered with prices
- Calendar availability (this week/next week)
- Bio & specialties
- Past client reviews
- "Book Consultation" button

**Step 4: Calendar Booking**

Show lawyer's available slots:
```
Week of Dec 4-8, 2024

Monday, Dec 4
  ○ 9:00 AM - Available
  ○ 10:00 AM - Available
  ● 11:00 AM - Booked
  ○ 2:00 PM - Available
  
Tuesday, Dec 5
  ○ 9:00 AM - Available
  ...
```

User selects time → Books consultation

**Step 5: Confirmation**
- Email sent to user
- Email sent to lawyer
- Calendar invite
- Reminder notifications (24 hours before, 1 hour before)

---

### 5. LAWYER DASHBOARD (Separate Mobile App or Web Portal)

Lawyers need:

1. **Profile Management**
   - Edit bio, services, pricing
   - Upload profile photo
   - Manage calendar availability

2. **Lead Inbox**
   - See clients who booked consultations
   - View client's charge details (what they need expunged)
   - Mark as "In Progress", "Completed", "Declined"

3. **Calendar**
   - See all upcoming appointments
   - Block off unavailable times
   - Reschedule/cancel bookings

4. **Analytics**
   - How many leads received this month
   - Conversion rate (consultations → hired)
   - Revenue from FairPath referrals

5. **Payments**
   - Monthly $10 subscription auto-billed
   - Payment history

---

## 🔔 NOTIFICATION SYSTEM

### When to Send Notifications:

1. **Immediate (after AI analysis during signup):**
   - "Good news! [X] of your charges are eligible for expungement right now!"
   - "We found [X] lawyers in [STATE] who can help."

2. **Becomes Eligible (daily check):**
   - "🎉 Your [CHARGE] is now eligible for expungement!"

3. **30 Days Before Eligibility:**
   - "⏰ Your [CHARGE] will be eligible in 30 days. Get ready!"

4. **Lawyer Booking Confirmations:**
   - "✅ Consultation confirmed with [LAWYER NAME] on [DATE]"

5. **Appointment Reminders:**
   - 24 hours before: "Tomorrow at [TIME] - Consultation with [LAWYER]"
   - 1 hour before: "In 1 hour - Consultation with [LAWYER]"

---

## 💰 REVENUE MODEL

### For Users:
- **Free eligibility checking** - AI analysis costs us nothing at scale
- **Free lawyer browsing** - No fees to see options
- **Free booking** - No platform fees

Users only pay the lawyer directly (we don't take a cut).

### For Lawyers:
- **$10/month listing fee** - Low barrier to entry
- **No per-lead fees** - Unlimited client referrals
- **No percentage cut** - Lawyers keep 100% of their fees

### Why This Works:
- Volume game: 1,000 lawyers = $10,000/month recurring revenue
- Win-win: Users get free access, lawyers get pre-qualified leads
- Scalable: AI does the heavy lifting, minimal human intervention

---

## 🎯 KEY SUCCESS METRICS

### User Metrics:
- % of users with at least 1 eligible charge
- Time from signup to eligibility notification (should be < 5 minutes)
- % of eligible users who click "View Lawyers"
- % of eligible users who book consultations

### Lawyer Metrics:
- Average lawyer signup rate per month
- % of lawyers with complete profiles
- Average leads per lawyer per month
- Conversion rate (leads → hired clients)

### Platform Metrics:
- Monthly recurring revenue from lawyer subscriptions
- Total successful expungements processed through platform
- User satisfaction (NPS score)

---

## 🚀 MVP IMPLEMENTATION CHECKLIST

### Phase 1: Core AI & Data (Week 1-2)
- [ ] Build criminal charge data model
- [ ] Create state expungement rules database (start with 5 states)
- [ ] Build AI eligibility checking function
- [ ] Test AI against known cases

### Phase 2: User Experience (Week 3-4)
- [ ] Add criminal history intake to signup flow
- [ ] Build charge list view with eligibility badges
- [ ] Implement push notifications for eligibility
- [ ] Add countdown timers for future eligibility

### Phase 3: Lawyer Marketplace (Week 5-6)
- [ ] Build lawyer profile creation
- [ ] Implement calendar availability system
- [ ] Build lawyer discovery/search
- [ ] Create booking flow

### Phase 4: Notifications & Polish (Week 7-8)
- [ ] Set up daily background job for eligibility checks
- [ ] Implement all notification triggers
- [ ] Add email confirmations for bookings
- [ ] Build lawyer dashboard (web)

---

## 📝 SAMPLE USER JOURNEY

**Meet Marcus:**
- Released from California prison in 2021
- Has 3 charges on record:
  1. Possession of marijuana (2018) - Misdemeanor
  2. Petty theft (2019) - Misdemeanor  
  3. DUI (2020) - Misdemeanor

**Day 1 - Signup:**
1. Marcus creates Friend A Felon account
2. Enters all 3 charges with dates
3. AI analyzes instantly
4. Results:
   - ✅ Marijuana possession: ELIGIBLE NOW (5 years passed)
   - ✅ Petty theft: ELIGIBLE NOW (4 years passed)
   - ⏳ DUI: Eligible in 182 days (needs 3 years)

5. Marcus gets notification: "Great news! 2 of your charges can be expunged now!"

**Day 2 - Browsing Lawyers:**
1. Marcus clicks "View Lawyers" on marijuana charge
2. Sees 15 California lawyers offering expungement services
3. Filters by: "Under $1,000" and "Available This Week"
4. Picks lawyer with 4.8-star rating, $750 fee
5. Books free consultation for Thursday at 2pm

**Day 5 - Consultation:**
1. Marcus meets with lawyer (video call)
2. Lawyer explains process, timeline (3-6 months)
3. Marcus hires lawyer for $750
4. Marks charge as "In Progress" in app

**6 Months Later:**
1. Marijuana charge expunged ✅
2. Petty theft charge expunged ✅
3. Push notification: "🎉 Your DUI is now eligible!"
4. Marcus books another lawyer
5. 6 months later: All 3 charges cleared

**Result:**
- Clean record
- Better job prospects
- Housing opportunities
- Peace of mind

---

## 🔥 WHY THIS IS REVOLUTIONARY

1. **Instant Knowledge** - 90% of people don't know they're eligible. We tell them in 60 seconds.

2. **No Gatekeeping** - Currently you need $2,500 just to FIND OUT if you qualify. We make it free.

3. **Pre-Qualified Leads for Lawyers** - Lawyers waste time on ineligible clients. We send them only eligible cases.

4. **Scalable Prevention** - Every expungement = better job = lower recidivism. At scale, this changes outcomes.

5. **Fair Revenue Model** - $10/month from lawyers is sustainable without extracting from users.

---

## 🎬 READY TO BUILD?

This spec covers everything you need to implement FairPath Legal in your mobile app. Start with Phase 1 (AI engine), then move to Phase 2 (user experience), then Phase 3 (lawyer marketplace).

The foundation you already have (user profiles, authentication, notifications) will make this faster to build than starting from scratch.

**Questions or clarifications needed?** This is complex but TOTALLY doable. Let's change lives by helping people clear their records.
