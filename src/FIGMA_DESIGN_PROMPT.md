# 🚀 FIGMA DESIGN PROMPT - FRIEND A FELON COMPLETE APP

Copy the text below and paste it into a new Figma Design / Figma Make chat:

---

## Prompt for Figma Design:

```
Build a complete React + TypeScript reentry ecosystem app called "Friend A Felon" (acquired by FairPath Industries).

DESIGN SYSTEM:
- Black (#000000) and charcoal (#121212) backgrounds
- Neon green (#A8F32C) primary accent color
- Futura Condensed Extra Bold font for headings and buttons
- Nike athletic brand energy - clean, modern, bold
- Lucide icons throughout

TECH STACK:
- React 18 + TypeScript
- Tailwind CSS v4.0 (config in globals.css, NO tailwind.config.js)
- Shadcn/ui components (use ALL 40+ components)
- Supabase backend + auth
- Stripe + PayPal payments
- SingleKey API for background screening

APP OVERVIEW:
5-sided marketplace connecting justice-impacted people with:
1. **FastTrack Housing** - $75 ($65 with FairPath+) for guaranteed showing in 48 hours
2. **WOTC-Compliant Jobs** - FREE with 27-question compliance + "Save & Finish Later"
3. **Free Marketplace** - Community-donated items (3-7 claims/month)
4. **Gig Services** - Background-verified service providers with escrow payments
5. **FairPath Score** - Universal 0-1000 scoring across all users

USER TYPES (5):
1. Justice-Impacted Users (Felons) - Main users seeking jobs/housing
2. Property Owners - List felony-friendly housing, review applications
3. Employers - Post second-chance jobs, review WOTC applications
4. Donors - Post free marketplace items
5. Resource Partners - Offer case management and support services

KEY FEATURES REQUIRED:

1. **USER/FELON DASHBOARD** (5 tabs):
   - Overview: Quick stats, FairPath Score (0-1000), upcoming events
   - Housing: Browse 200+ listings, FastTrack application flow (7 steps)
   - Jobs: Browse 200+ jobs, WOTC application (27 questions with Save & Finish Later)
   - Marketplace: Browse free items, claim flow (3-7 claims/month based on subscription)
   - My Applications: Track all housing/job/marketplace applications with real-time status
   - Services: Browse gig services, book providers, become provider flow

2. **PROPERTY OWNER DASHBOARD** (4 tabs):
   - Overview: Revenue stats, active listings, pending applications
   - Properties: Manage listings (Basic/Premium/Partner packages determine features)
   - Applications: Review FastTrack applications with SingleKey screening results
   - Revenue: Track FastTrack revenue (80/20 split - landlord gets $60 of $75)
   
   CRITICAL FLOWS:
   - Post Property Wizard (4 steps): Details, Amenities, Eligibility Criteria, Preview
   - Approve Application: Schedule showing within 48 hours (required)
   - Deny Application: FCRA-compliant denial reasons
   - View Screening Results: SingleKey reports (credit, background, eviction, identity)

3. **EMPLOYER DASHBOARD** (4 tabs):
   - Overview: Active jobs, recent applications, hiring pipeline
   - Jobs: Post new jobs, manage listings
   - Applicants: Review WOTC applications, schedule interviews
   - Analytics: WOTC tax credit tracking, hiring metrics

4. **DONOR DASHBOARD** (3 tabs):
   - Overview: Items donated, claims approved, impact stats
   - My Items: Post new items, manage listings
   - Claims: Approve pickup requests from users

5. **AUTHENTICATION**:
   - Quick demo login with 6 pre-populated users:
     • Marcus Johnson (Felon) - 687 FairPath Score
     • Metro Properties (Landlord) - Premium package
     • Target Distribution (Employer) - WOTC participant
     • Sarah Thompson (Donor) - 921 score
     • John Smith (Service Customer)
     • FairPath Staffing (Staffing Agency)

6. **COMPLETE PAYMENT FLOWS**:
   - FastTrack Housing: $75 standard, $65 with FairPath+
   - FairPath+ Subscription: $2/month upgrade
   - Property Owner Plans: Basic ($49), Premium ($99), Partner ($199)
   - Employer Plans: Basic ($79), Growth ($149), Enterprise ($299)
   - Stripe + PayPal integration with working confirmation screens

7. **ELIGIBILITY ENGINE**:
   - Filter housing/jobs by conviction type compatibility
   - Match based on time since release requirements
   - Only show opportunities users actually qualify for
   - 5 conviction categories: Violent, Drug, Theft, Sex Offense, Other

8. **FAIRPATH+ SUBSCRIPTION** ($2/month):
   - $10 off every FastTrack application
   - 7 marketplace claims/month (vs 3 free)
   - Priority support badge
   - Prominent upsell cards throughout felon dashboard

9. **WOTC COMPLIANCE** (27 questions across 9 categories):
   a. Veteran Status (9 questions)
   b. SNAP Benefits (4 questions)
   c. TANF Benefits (3 questions)
   d. SSI Benefits (2 questions)
   e. Felony Conviction (2 questions)
   f. Long-Term Unemployment (3 questions)
   g. Vocational Rehabilitation (2 questions)
   h. Other Eligibility (2 questions)
   - Must have "Save & Finish Later" functionality (localStorage)

10. **FASTTRACK HOUSING FLOW** (7 steps):
    Step 1: Browse eligible housing (filtered by conviction type)
    Step 2: Click "FastTrack Apply - $75" (shows $65 if FairPath+)
    Step 3: Enter application details (current address, move-in date)
    Step 4: Employment info (employer, position, monthly income)
    Step 5: References (3 required: name, relationship, phone)
    Step 6: Consent to screening (background, credit, eviction)
    Step 7: Payment (Stripe/PayPal)
    CONFIRMATION: "GUARANTEED showing within 48 hours" (prominently displayed)

11. **STATUS TRACKING**:
    - Housing: Pending → Screening → Showing Scheduled → Approved/Denied
    - Jobs: Applied → Under Review → Interview Scheduled → Offer/Rejected
    - Marketplace: Claimed → Pending → Approved → Pickup Scheduled → Completed
    - Color-coded badges (Green=#A8F32C for approved, Yellow for pending, Red for denied)

12. **GIG SERVICES MARKETPLACE**:
    - 10 categories: Home Services, Moving, Automotive, Cleaning, Technology, Food, Creative, Pet Care, Tutoring, Events
    - 100+ background-verified providers
    - Booking flow with escrow payments (10% platform fee)
    - Provider profiles: FairPath Score, rating, jobs completed, hourly rate
    - "Become a Provider" flow for justice-impacted users

13. **DUMMY DATA** (populate with realistic data):
    - 200+ housing listings across Chicago neighborhoods
    - 200+ job listings (warehouses, fast food, retail, logistics, security)
    - 100+ gig service providers
    - 50+ marketplace items (furniture, clothing, household, transportation)
    - 10+ sample applications in various statuses

14. **SHARED COMPONENTS**:
    - LogoFinal: Handshake logo with "A FairPath Industries Company" tagline
    - FairPath Score widget: Shows 0-1000 score with progress bar
    - Status badges with icons
    - Navigation headers with notifications, settings, profile, logout buttons

15. **ZERO DEAD ENDS RULE**:
    - EVERY button must have a destination
    - EVERY form must have a completion screen
    - EVERY payment must have a confirmation
    - EVERY application must show status tracking
    - EVERY tab must be fully populated with content

16. **PRICING TIERS** (show in onboarding):
    
    PROPERTY OWNERS:
    • Basic - $49/month: 3 listings, basic info, no FastTrack
    • Premium - $99/month: 10 listings, FastTrack enabled, full screening (MOST POPULAR)
    • Partner - $199/month: Unlimited listings, dedicated support, priority placement
    
    EMPLOYERS:
    • Basic - $79/month: 5 jobs, basic applicant info
    • Growth - $149/month: 15 jobs, featured listings, WOTC support
    • Enterprise - $299/month: Unlimited jobs, analytics, dedicated support
    
    USERS:
    • Free: Basic access, 3 marketplace claims/month, $75 FastTrack
    • FairPath+ - $2/month: $10 off FastTrack ($65), 7 claims/month, priority support

17. **ONBOARDING FLOWS**:
    - Felon: Name, email, conviction category (5 options), release date, looking for job/housing
    - Property Owner: Name, company, number of units, select package (Basic/Premium/Partner)
    - Employer: Company name, industry, size, WOTC participant?, select package
    - Donor: Name, email, verify identity, tax receipt eligibility
    - Resource Partner: Organization name, services offered, pricing

18. **NAVIGATION STRUCTURE**:
    ```
    Header (sticky):
      - Logo (top left)
      - Notifications icon with badge count
      - Settings icon
      - Profile icon
      - Logout button
    
    Main Content:
      - Welcome message with user name
      - FairPath Score card (gradient, prominent)
      - Quick stats cards (4 across)
      - Tab navigation (5-6 tabs depending on user type)
      - Tab content (full-width, padded)
    ```

19. **COLOR USAGE**:
    - Backgrounds: Pure black (#000) or charcoal (#121212)
    - Primary CTAs: Neon green (#A8F32C) - use for "Apply", "Upgrade", "Submit"
    - Secondary CTAs: White outline buttons
    - Success states: Neon green
    - Warning/Pending: Yellow (#EAB308)
    - Error/Denied: Red (#EF4444)
    - Info: Blue (#3B82F6)
    - Card borders: White with 10% opacity (rgba(255,255,255,0.1))

20. **RESPONSIVENESS**:
    - Desktop-first for Property Owner, Employer, Resource Partner dashboards (admin panels)
    - Mobile-optimized for Felon/User, Donor, and Service Customer dashboards
    - Stacked layouts on mobile, grid layouts on desktop

21. **COMPLIANCE & LEGAL**:
    - FCRA disclosure for background checks
    - Fair Housing Act compliance (no discrimination)
    - WOTC Form 8850 data collection
    - Clear consent forms before screening
    - Adverse action process for denials

22. **FILE STRUCTURE** (create these files):
    ```
    /App.tsx - Main entry with routing
    /contexts/UserContext.tsx - User state management
    /utils/api.ts - API helpers
    /utils/eligibilityEngine.ts - Filtering logic
    /utils/singlekey-api.ts - Background screening integration
    /data/mockData.ts - 200+ housing, 200+ jobs, 100+ services, 50+ marketplace items
    /data/wotcQuestions.ts - All 27 WOTC questions
    /styles/globals.css - Tailwind v4 config with color tokens
    
    /components/auth/QuickLogin.tsx - Demo login
    /components/dashboards/FelonDashboard.tsx - Main user dashboard
    /components/dashboards/PropertyOwnerDashboard.tsx - Landlord dashboard
    /components/dashboards/EmployerDashboard.tsx - Employer dashboard
    /components/dashboards/DonorDashboard.tsx - Donor dashboard
    
    /components/felon/HousingApplicationFlow.tsx - 7-step FastTrack
    /components/felon/JobApplicationFlow.tsx - WOTC application
    /components/felon/MarketplaceClaimFlow.tsx - Claim items
    /components/felon/ServiceBookingFlow.tsx - Book gig services
    /components/felon/BecomeProviderFlow.tsx - Become provider
    
    /components/property/PropertyPostingFormComplete.tsx - 4-step listing wizard
    /components/property/ApproveApplicationFlow.tsx - Schedule showing
    /components/property/DenyApplicationFlow.tsx - Denial with reason
    /components/property/ScreeningResultsView.tsx - SingleKey results
    
    /components/payment/PaymentFlow.tsx - Universal payment
    /components/payment/PaymentMethodSelector.tsx - Stripe/PayPal
    /components/subscription/PlanComparison.tsx - Free vs FairPath+
    /components/subscription/SubscriptionUpgrade.tsx - Upgrade flow
    
    /components/common/LogoFinal.tsx - Logo with tagline
    /components/common/FairPathScore.tsx - Score widget
    
    + All Shadcn UI components in /components/ui/
    ```

23. **SAMPLE USER JOURNEY** (test this works):
    ```
    1. Login as Marcus Johnson (Felon)
    2. See FairPath Score of 687
    3. See FairPath+ upsell card
    4. Click "Housing" tab
    5. See 200+ listings (filtered to his conviction type)
    6. Click "FastTrack Apply - $75" on 2BR Lincoln Park apartment
    7. Fill out 7-step application
    8. Pay $75 with Stripe
    9. See "GUARANTEED showing within 48 hours" confirmation
    10. Return to "My Applications" tab
    11. See application status as "Screening"
    12. Click "Jobs" tab
    13. Apply to Amazon Warehouse job
    14. Answer 27 WOTC questions
    15. Click "Save & Finish Later" (saves to localStorage)
    16. Resume application later
    17. Submit application
    18. See "Application Submitted" confirmation
    19. Check "My Applications" - see both housing and job applications
    20. Click "Marketplace" tab
    21. Claim "Queen Bedroom Set"
    22. See claims remaining decrease from 3 to 2
    23. Click "Services" tab
    24. Book moving help from verified provider
    25. Click "Become a Provider" to sign up as handyman
    ```

24. **CRITICAL REQUIREMENTS**:
    ✅ Every button must work (zero dead ends)
    ✅ All payments must process to confirmation screens
    ✅ All forms must save data and show completion
    ✅ Status tracking must be real-time and accurate
    ✅ Eligibility engine must filter properly
    ✅ FairPath Score must be prominent everywhere
    ✅ Logo with tagline must appear on every screen
    ✅ "Guaranteed showing in 48 hours" must be emphasized
    ✅ Revenue calculations must be accurate (80/20 split)
    ✅ Package-based features must work (Premium gets FastTrack, Basic doesn't)
    ✅ Mobile responsive for user-facing screens

25. **REVENUE MODEL TO IMPLEMENT**:
    - Property owners earn $60 per FastTrack application (80% of $75)
    - Platform earns $15 per application (20% of $75)
    - Show revenue dashboard with:
      • This month: $X from FastTrack
      • This month: $Y from subscription
      • Total revenue: $Z
      • Average per application: $60
      • Number of applications: N

Build this as a complete, production-ready app with working functionality and beautiful design. Use the black/neon green aesthetic throughout. Make sure EVERY screen is accessible and EVERY flow is complete from start to finish.
```

---

## Additional Context:

This is a comprehensive reentry ecosystem with 6,000+ lines of production-ready code. The app should feel like a premium Nike-style athletic brand but for social impact. High energy, bold typography, clear CTAs, and zero friction.

Key differentiators:
- **Guaranteed showing in 48 hours** for FastTrack housing
- **Revenue sharing** with property owners (80/20 split)
- **FairPath Score** as universal trust metric
- **Eligibility engine** prevents wasted applications
- **WOTC compliance** helps employers earn tax credits
- **FairPath+** super affordable at $2/month

The platform generates revenue from:
1. Property owner subscriptions ($49-$199/month)
2. Employer subscriptions ($79-$299/month)
3. FastTrack application fees (20% = $15 each)
4. FairPath+ subscriptions ($2/month per user)
5. Gig marketplace fees (10% of service cost)

Average property owner with Premium package earns $699-$999/month ($99 subscription + 10-15 applications × $60).

