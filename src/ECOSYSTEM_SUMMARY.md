# FRIEND A FELON - 5-SIDED ECOSYSTEM

## Overview
Complete reentry platform ecosystem launching by 1/11/2026

### Design Language
- **Colors**: Black (#000000), Charcoal (#121212), Neon Green (#A8F32C)
- **Mobile**: SF Pro typography
- **Web**: Inter typography
- **Style**: Minimal, clean, professional, dark mode

---

## SIDE 1: FRIEND A FELON MOBILE APP (Users)

### Purpose
Mobile app for convicted felons to access housing, jobs, resources, and community.

### Key Features

#### 1. Onboarding (4 Screens)
✅ BUILT
- Welcome screen explaining FAF
- "Real Housing, Real Showings" - explains guaranteed showings
- "FastTrack Applications" - explains $75/$65 pricing with screening
- "Job & Resource Support" - community features

#### 2. FastTrack Application System
**Pricing Logic**:
- Standard: $75 per application
- FAF+ Subscriber ($2/month): $65 per application
- User sees pricing clearly before payment
- Includes full screening (credit, eviction, criminal)
- User receives copy of screening report

**What's Included**:
- Unified application form
- Full tenant/employment screening via API
- Screening report sent to property owner/employer AND user
- Guaranteed showing for housing (contractual obligation)

#### 3. Guaranteed Showing Logic
When user submits FastTrack to participating property:
1. Property owner has contractually agreed to offer showing (virtual/in-person)
2. No auto-deny based on felony status alone
3. UI shows: "This property has agreed to provide a guaranteed showing"
4. After payment, status: "Showing to be scheduled"
5. Property owner gets task in Admin A Felon to schedule
6. User gets proposed times → confirmation → address/meeting info

#### 4. App Sections
- **Home**: Quick access to all features, FastTrack status, applications
- **Housing Marketplace**: Felony-friendly listings with FastTrack + Guaranteed Showing badges
- **Job Marketplace**: Employment listings with FastTrack support
- **Resource Center**: Reentry programs, guides, support
- **Felon Connect**: Community forum
- **Free Marketplace**: Claim free items (claim limits + ratings)
- **Profile**: Applications, documents, subscription, settings, trust score

---

## SIDE 2: ADMIN A FELON (Employer Web App)

### Purpose
Web app for employers to post jobs and review FastTrack applications.

### Core Sections

#### Dashboard
- Active jobs
- New applicants
- Upcoming interviews
- Conversion stats (views → applies → hires)

#### Job Management
- Create/edit/close job posts
- Mark which roles accept FastTrack Apply
- Toggle: "FAF Screening / Staffing Assist"
  - ON: FAF pre-screens, presents shortlist
  - OFF: Employer does own screening

#### Applicant Review
- See incoming applications
- If FastTrack: full screening summary, resume, history
- Status options:
  - Under review
  - Invite to interview
  - Offer extended
  - Not a fit

#### Communication
- In-app messages with applicants (no direct phone/email by default)
- Interview scheduling (time slots, rescheduling)

#### Settings
- Company profile
- Locations
- Hiring preferences
- Screening preference

---

## SIDE 3: ADMIN A FELON (Property Owner Web App)

### Purpose
Web app for landlords to post properties and honor guaranteed showings.

### Core Sections

#### Dashboard
- Units listed
- New FAF applicants
- Showings to schedule
- Compliance tracker:
  - % of showings completed on FastTrack apps
  - FAF applicants rented vs total applications

#### Listings Management
- Add/edit/remove properties
- Mark as: Felony-friendly, FastTrack eligible, Guaranteed showing required
- Set rent, requirements, screening rules

#### Applications / Screenings
- View FastTrack applicants
- Each applicant shows:
  - Credit summary
  - Eviction history
  - Criminal history summary
  - Full downloadable report
- Status tools:
  - Invite for showing
  - Mark showing completed
  - Approve for lease
  - Decline

#### Guaranteed Showing Compliance
- System indicates FastTrack apps that need showings
- Deadlines (must schedule within X days)
- Optional: Payouts or lower fees tied to compliance

#### Messages
- Chat with applicants for logistics only

#### Settings
- Company/owner info
- Screening integration (API keys)
- Bank/Stripe info for fee split

---

## SIDE 4: RESOURCE CENTER CRM (Unite Us-Style)

### Purpose
CRM for nonprofits, reentry programs, churches, and case managers.

### Key Features

#### Org Login
- Each org has account
- Staff can log into org

#### Client Roster
- See list of FAF users assigned/engaged
- Filter by location, status, needs

#### Client Profile
- Basic info (name, contact, area)
- Consent logs
- FAF activity (applications, marketplace, resources)
- Notes from org staff
- Case plans, tasks

#### Referrals System
- Org A refers client to Org B
- Status: Sent → In progress → Accepted → Completed
- Messaging between orgs about client

#### Outreach Tools
- Send flyers (PDFs, images, announcements) to:
  - Clients nearby
  - All FAF users in ZIP
  - Subgroups (e.g., "seeking housing")

#### In-App Messaging
- Org staff message clients through FAF app
- Clients see in "My Support" tab
- No direct phone/email unless permitted

#### Analytics
- Clients reached
- Referrals made
- Clients enrolled in services

---

## SIDE 5: FREE MARKETPLACE (Donor Flow)

### Purpose
Allow community members to donate free items to FAF users.

### Donor Flow (Lite Account)
- Login: Phone number + 4-digit code only
- Post items (photos, condition, description)
- Choose pickup method:
  - **Secure Pickup**: Police/library/public location (with map)
  - **Private Pickup**: Custom instructions
- Item live for 48 hours
- Review claimers (see trust score, pickup history, NO identity)
- Select recipient
- Limited messaging after selection (logistics only)
- Both sides rate each other
- Auto-expire after 48 hours

### Claimer Flow
- Browse free items
- Claim with optional message
- Claim limits:
  - Free: 1 claim/month
  - FAF+ Subscriber: 7 claims/month
- Wait for donor to select
- If selected, coordinate pickup
- Rate donor after pickup

### Trust System
- Behavior-based scoring
- Track successful pickups / no-shows
- Donors see behavior, not identity

---

## CROSS-SYSTEM FEATURES

### Subscriptions
**FAF+ ($2/month)**:
- Discount on FastTrack apps ($65 vs $75)
- Extra marketplace claims (7 vs 1)
- Priority matching (future)

### Screening Integrations
- Tenant screening API (credit/eviction/criminal)
- Employment background checks

### Unified Identity
One FAF user profile used across:
- Mobile app
- Employer dashboard (as applicant)
- Property dashboard (as tenant applicant)
- Resource CRM (as client)
- Marketplace (as claimer with anonymous history)

### Ratings / Trust Score
Users build trust profile across:
- Showings
- Job interviews
- Marketplace pickups
- Program participation
Donors and partners see behavior, not identity traits.

---

## IMPLEMENTATION STATUS

### ✅ COMPLETED
- Onboarding (all 4 screens with proper messaging)
- Auth system (login/signup with terms agreement)
- Account type selection (User, Donor, Employer, Property, Resource)
- Home Dashboard with FastTrack status and pricing
- App navigation structure
- Design system with updated green (#A8F32C)

### 🚧 IN PROGRESS
- FastTrack application flow
- Housing marketplace with guaranteed showing badges
- Job marketplace
- Free marketplace (donor + claimer sides)
- Employer dashboard
- Property owner dashboard
- Resource CRM

### 📋 TODO
- Payment integration (Stripe)
- Screening API integration
- Showing scheduling system
- Compliance tracking
- Referrals system
- Messaging system
- Trust score calculations
- Analytics dashboards
