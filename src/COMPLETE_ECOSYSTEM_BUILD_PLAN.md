# 🎯 FRIEND A FELON - COMPLETE ECOSYSTEM BUILD PLAN

## **MASTER CHECKLIST - ZERO GAPS, ZERO DEAD ENDS**

---

## **📱 1. FAIRPATH+ SUBSCRIPTION SYSTEM**

### **New Components Needed:**
- [ ] `/components/subscription/SubscriptionUpgrade.tsx` - Upgrade to FairPath+
- [ ] `/components/subscription/SubscriptionManagement.tsx` - Manage subscription
- [ ] `/components/subscription/PlanComparison.tsx` - Free vs FairPath+
- [ ] `/components/subscription/PaymentMethod.tsx` - Add payment for subscription
- [ ] `/components/subscription/SubscriptionSuccess.tsx` - Success screen

### **Features:**
- $2/month subscription
- Free tier vs FairPath+ comparison
- FastTrack fee difference ($75 vs $65)
- Marketplace claims (1 vs 7)
- Verified badge
- Payment processing (Stripe)
- Upgrade/downgrade flows

---

## **⚡ 2. FASTTRACK HOUSING SYSTEM**

### **New Components Needed:**
- [ ] `/components/housing/HousingFastTrackFlow.tsx` - Complete FastTrack flow
- [ ] `/components/housing/ScreeningConsent.tsx` - SingleKey consent
- [ ] `/components/housing/FastTrackPayment.tsx` - $65/$75 payment
- [ ] `/components/housing/ShowingScheduler.tsx` - Schedule showing
- [ ] `/components/housing/ScreeningSummary.tsx` - View screening results
- [ ] `/components/housing/ApplicationStatus.tsx` - Track application

### **Features:**
- $75 (free tier) or $65 (FairPath+) fee
- SingleKey screening integration
- Guaranteed showing scheduling
- Application status tracking
- Screening summary view
- 60/40 revenue share with property owners

---

## **💼 3. FASTTRACK JOB SYSTEM**

### **New Components Needed:**
- [ ] `/components/jobs/JobFastTrackFlow.tsx` - Easy Apply flow
- [ ] `/components/jobs/JobApplicationStatus.tsx` - Track job applications
- [ ] `/components/jobs/StaffingJobBadge.tsx` - Badge for staffing jobs

### **Features:**
- Easy Apply for jobs
- "FairPath+ Staffing Opportunity" badge
- Application tracking
- Employer receives full profile

---

## **🏢 4. FAIRPATH STAFFING (COMPLETE AGENCY)**

### **New Components Needed:**
- [ ] `/components/staffing/StaffingOrderFlow.tsx` - Employer orders screening
- [ ] `/components/staffing/BackgroundCheckOrder.tsx` - Order background check ($19.99)
- [ ] `/components/staffing/FullScreeningOrder.tsx` - Full screening ($39.99)
- [ ] `/components/staffing/DrugTestQRCode.tsx` - Quest QR code generator
- [ ] `/components/staffing/CandidatePool.tsx` - View matched candidates
- [ ] `/components/staffing/PlacementConfirmation.tsx` - Confirm hire
- [ ] `/components/staffing/StaffingPricing.tsx` - $99/$149/5% pricing

### **Features:**
- Background check: $19.99
- Full screening: $39.99 (background + ID + drug test)
- Quest Diagnostics QR codes
- Placement fees: $99, $149, or 5% first month
- Auto-matching candidates to jobs
- Staffing job badge display
- Commission tracking for staffing dashboard

---

## **🛠️ 5. FAIRPATH GIGS (COMPLETE MARKETPLACE)**

### **New Components Needed:**
- [ ] `/components/gigs/GigMarketplace.tsx` - Browse all gigs
- [ ] `/components/gigs/GigCreation.tsx` - Create a gig listing
- [ ] `/components/gigs/GigDetail.tsx` - View gig details
- [ ] `/components/gigs/GigBooking.tsx` - Book a gig worker
- [ ] `/components/gigs/GigPayment.tsx` - Pay for gig (5% fee)
- [ ] `/components/gigs/GigTracking.tsx` - Track active gigs
- [ ] `/components/gigs/WorkerProfile.tsx` - Gig worker profile
- [ ] `/components/gigs/GigReviews.tsx` - Review system
- [ ] `/components/gigs/GigPayout.tsx` - Worker payout tracking

### **Gig Categories:**
- Painting, Cleaning, Moving, Car Repairs, Web Design, Sewing
- Lawn Care, Babysitting, Construction, Handyman, etc.

### **Features:**
- 5% platform fee
- Escrow payments
- 1099 tracking
- Two-way reviews
- Worker profiles with skills
- Customer booking flow
- FairPath Score integration

---

## **🏠 6. HOUSING MARKETPLACE (COMPLETE)**

### **Missing Pieces:**
- [ ] Enhanced eligibility filtering
- [ ] "Show all" toggle for ineligible properties
- [ ] FastTrack badge on listings
- [ ] Property detail enhancements
- [ ] Showing history for property owners

### **Already Built:**
- Housing browse
- Property detail
- Application flow
- Property owner dashboard

---

## **💼 7. JOB MARKETPLACE (COMPLETE)**

### **Missing Pieces:**
- [ ] Enhanced eligibility filtering based on conviction onboarding
- [ ] "Show all jobs" toggle
- [ ] Staffing job badge ("FairPath+ Staffing Opportunity")
- [ ] WOTC indicator on job listings
- [ ] Application tracking improvements

### **Already Built:**
- Job browse
- Job detail
- Employer dashboard
- WOTC questions

---

## **🎓 8. ENHANCED CONVICTION ONBOARDING**

### **New Components Needed:**
- [ ] `/components/onboarding/ConvictionCapture.tsx` - ALL conviction types
- [ ] `/components/onboarding/WOTCQuestions.tsx` - WOTC eligibility capture
- [ ] `/components/onboarding/EligibilityMapping.tsx` - Map to job/housing filters
- [ ] `/components/onboarding/SaveAndResume.tsx` - Save progress

### **Capture:**
- Every conviction category (violent, drug, property, sex, white collar, DUI, etc.)
- Conviction date
- Release date
- Time since conviction
- SNAP benefits
- Disability status
- Veteran status
- Long-term unemployment (27+ weeks)
- Age ranges for WOTC

### **Use For:**
- Job eligibility filtering
- Housing eligibility filtering
- WOTC matching
- FairPath Staffing auto-matching

---

## **💰 9. PROPERTY OWNER REVENUE SHARE**

### **New Components Needed:**
- [ ] `/components/property/FastTrackProgram.tsx` - Program agreement
- [ ] `/components/property/ComplianceTracker.tsx` - Track compliance
- [ ] `/components/property/ShowingRecords.tsx` - Showing history
- [ ] `/components/property/PayoutCalculator.tsx` - Revenue breakdown
- [ ] `/components/property/PayoutHistory.tsx` - Payment history

### **Revenue Logic:**
- User pays $65/$75
- Property owner gets 60% IF compliant:
  - Guaranteed showings
  - Fair denial reasons
  - Rent to 1 out of 20 FastTrack applicants
- If non-compliant: 60% of their 60% (36% total)
- Payouts every 45 days or after 20 resolved apps
- Screening cost: ~$17.99/1000 from SingleKey

---

## **💳 10. COMPLETE PAYMENT SYSTEM**

### **New Components Needed:**
- [ ] `/components/payments/StripeCheckout.tsx` - Stripe integration
- [ ] `/components/payments/PaymentSuccess.tsx` - Success screen
- [ ] `/components/payments/PaymentFailed.tsx` - Error screen
- [ ] `/components/payments/Wallet.tsx` - User wallet/balance
- [ ] `/components/payments/PayoutSchedule.tsx` - Payout timeline
- [ ] `/components/payments/TransactionHistory.tsx` - All transactions

### **Payment Flows:**
- FairPath+ subscription ($2/mo)
- FastTrack housing ($65/$75)
- Gig payments (95% to worker, 5% to platform)
- Staffing screening orders ($19.99/$39.99)
- Staffing placement fees ($99/$149/5%)
- Property owner payouts
- Gig worker payouts

---

## **🔧 11. NAVIGATION & WIRING**

### **Update App.tsx:**
- [ ] Add all new screen routes
- [ ] Add subscription state management
- [ ] Add gig marketplace navigation
- [ ] Add staffing workflow navigation
- [ ] Ensure EVERY button has a destination

### **Update Dashboards:**
- [ ] FelonDashboard - Add gigs, subscription, FastTrack tracking
- [ ] EmployerDashboard - Add staffing orders, screening
- [ ] PropertyOwnerDashboard - Add compliance, revenue share
- [ ] ResourcePartnerDashboard - Already complete
- [ ] DonorDashboard - Already complete
- [ ] CustomerDashboard - Add gig booking
- [ ] ProviderDashboard - Add gig management
- [ ] StaffingDashboard - Already complete but wire to staffing flows

---

## **✅ 12. FINAL QUALITY CHECKS**

- [ ] Every button navigates somewhere
- [ ] No dead ends anywhere
- [ ] All payment flows complete
- [ ] All loading states
- [ ] All error states
- [ ] All success states
- [ ] All modals closeable
- [ ] All forms submittable
- [ ] All data saves properly
- [ ] All dashboards show relevant data
- [ ] All eligibility logic works
- [ ] All revenue calculations accurate

---

## **🎯 BUILD ORDER:**

1. ✅ Staffing Dashboard (DONE)
2. 🔨 FairPath+ Subscription System
3. 🔨 Enhanced Conviction Onboarding with WOTC
4. 🔨 FairPath Gigs Marketplace (COMPLETE)
5. 🔨 FastTrack Housing Flow (COMPLETE)
6. 🔨 FastTrack Job Flow
7. 🔨 FairPath Staffing Complete Workflow
8. 🔨 Property Owner Revenue Share
9. 🔨 Payment System (All flows)
10. 🔨 Wire Everything Together
11. 🔨 Fix All Dead Ends
12. ✅ Final QA

---

**ESTIMATED COMPONENTS TO BUILD: ~40-50 new components**
**ESTIMATED TIME: Let's do this systematically!**

**LET'S GO! 🚀**
