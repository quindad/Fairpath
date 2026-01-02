# FairPath Industries - Complete System Architecture

## 🏗️ Platform Overview

### Two Consumer-Facing Platforms (Shared Database)
1. **Friend A Felon** - Justice-impacted people (lime green #A8F32C)
2. **Friend A Veteran** - Military veterans (navy/crimson/gold)

### Four CRM Portals (B2B Access)
1. **FairPath Staffing CRM** - Internal recruiting team
2. **Employer CRM** - Companies posting jobs
3. **Property Owner CRM** - Landlords listing housing
4. **Resource Partner CRM** - Service providers

---

## 🗄️ Database Schema (Unified for Both Platforms)

### Core Tables

```sql
-- Users (ALL platforms share this)
users
  - id (UUID)
  - email (unique)
  - password_hash
  - phone (E.164 format: +1234567890)
  - phone_verified (boolean)
  - phone_verification_code (6 digits)
  - phone_verification_expires (timestamp)
  - role (enum: seeker, employer, property_owner, resource_partner, fairpath_staff, admin)
  - platform (enum: friend_a_felon, friend_a_veteran, both)
  - created_at
  - last_login

-- Job Seekers (both FAF and FAV)
job_seekers
  - id
  - user_id (FK to users)
  - platform (friend_a_felon OR friend_a_veteran)
  - first_name
  - last_name
  - location
  -
  -- FAF-specific fields
  - conviction_type (felony/misdemeanor/none)
  - conviction_details (JSON)
  - release_date
  - parole_officer_contact
  
  -- FAV-specific fields
  - dd214_verified (boolean)
  - dd214_file_url
  - branch (army/navy/marines/air_force/coast_guard/space_force)
  - mos_code
  - mos_translated
  - security_clearance (none/confidential/secret/top_secret)
  - clearance_expiry
  - separation_date
  - veteran_status (active_duty/reserve/separated/retired)

-- Employers (can post to BOTH platforms)
employers
  - id
  - user_id (FK to users)
  - company_name
  - industry
  - company_size
  - ein (for WOTC)
  - subscription_tier (free/basic/professional/enterprise)
  - platforms_posting_to (array: [friend_a_felon, friend_a_veteran, both])
  - fairpath_staffing_client (boolean) -- using our staffing service?

-- Jobs (visible on one or both platforms)
jobs
  - id
  - employer_id
  - title
  - description
  - location
  - salary_min/max
  - visible_on_platforms (array: [friend_a_felon, friend_a_veteran, both])
  - hiring_via (enum: employer_direct, fairpath_staffing)
  - wotc_eligible (boolean)
  - security_clearance_required (for FAV jobs)
  - felony_friendly (boolean, for FAF jobs)
  - conviction_restrictions (JSON, for FAF)

-- Property Owners (can list on BOTH platforms)
property_owners
  - id
  - user_id (FK to users)
  - name
  - company (optional)
  - properties_count
  - platforms_listing_on (array: [friend_a_felon, friend_a_veteran, both])

-- Housing Listings (visible on one or both platforms)
housing
  - id
  - property_owner_id
  - address
  - rent
  - bedrooms/bathrooms
  - visible_on_platforms (array: [friend_a_felon, friend_a_veteran, both])
  - bah_compatible (boolean, FAV-specific)
  - bah_rate (if applicable)
  - felony_friendly (boolean, FAF-specific)
  - conviction_restrictions (JSON, FAF-specific)
  - fasttrack_enabled (boolean)

-- Resource Partners
resource_partners
  - id
  - user_id (FK to users)
  - organization_name
  - services_offered (array)
  - platforms_serving (array: [friend_a_felon, friend_a_veteran, both])
  - va_approved (boolean, for FAV)

-- FairPath Staffing Team
fairpath_staff
  - id
  - user_id (FK to users)
  - role (recruiter/account_manager/admin)
  - territories (array of states)
  - handles_platforms (array: [friend_a_felon, friend_a_veteran, both])
```

---

## 🔐 Authentication & Access Control

### User Registration Flow

```
1. User visits website → clicks "Join" on FAF or FAV page
   ↓
2. Platform Selection Captured (friend_a_felon OR friend_a_veteran)
   ↓
3. Email/Password Form
   - Email (unique across ALL platforms)
   - Password (min 8 chars, hashed with bcrypt)
   ↓
4. Phone Verification
   - Enter phone number
   - Send 6-digit SMS code (via Twilio/Vonage)
   - User enters code
   - Mark phone_verified = true
   ↓
5. Role Selection
   - "Looking for work/housing" → seeker
   - "I'm an employer" → employer
   - "I'm a property owner" → property_owner
   - "I'm a service provider" → resource_partner
   ↓
6. Platform-Specific Onboarding
   
   IF friend_a_felon + seeker:
     → Conviction onboarding flow
     → Eligibility mapping
   
   IF friend_a_veteran + seeker:
     → DD-214 upload
     → MOS translation
     → Security clearance verification
   
   IF employer:
     → Company details
     → "Which platforms do you want to hire from?"
       [✓] Friend A Felon
       [✓] Friend A Veteran
     → Subscription tier selection
   
   IF property_owner:
     → Property details
     → "Which communities do you serve?"
       [✓] Justice-impacted
       [✓] Veterans
```

### Login Flow with 2FA

```
1. User enters email + password
   ↓
2. Backend validates credentials
   ↓
3. If phone_verified = true:
   - Generate 6-digit code
   - Send SMS to user.phone
   - Store code + expiry (5 min) in DB
   ↓
4. User enters SMS code
   ↓
5. Backend validates code
   ↓
6. Issue JWT token with claims:
   {
     user_id,
     email,
     role,
     platform,
     phone_verified: true
   }
   ↓
7. Redirect to appropriate dashboard
```

### CRM Access Control

```
FairPath Staffing CRM:
  - user.role = 'fairpath_staff'
  - Can see candidates from BOTH platforms
  - Release alerts (FAF) + Separation alerts (FAV)
  - WOTC processing for both

Employer CRM:
  - user.role = 'employer'
  - Can post jobs visible on one or both platforms
  - Dashboard shows candidates by platform
  - WOTC dashboard (separate views for FAF vs FAV credits)

Property Owner CRM:
  - user.role = 'property_owner'
  - Can list housing on one or both platforms
  - FastTrack applications from both
  - Separate inboxes for FAF vs FAV applicants

Resource Partner CRM:
  - user.role = 'resource_partner'
  - Directory listing on one or both platforms
  - Can filter clients by platform
```

---

## 🔀 Platform Interconnection Logic

### How Friend A Felon ↔ Friend A Veteran Connect

**Shared Infrastructure:**
- Same Supabase database
- Same authentication system
- Same payment processing (Stripe)
- Same Impact Fund (20% from ALL revenue)

**Separate Branding:**
- FAF: Lime green theme, conviction-focused language
- FAV: Patriotic theme, military-focused language

**Cross-Platform Features:**

1. **Employers/Property Owners can serve BOTH:**
   ```javascript
   // When employer creates account:
   platforms_posting_to: ['friend_a_felon', 'friend_a_veteran']
   
   // When creating job:
   visible_on_platforms: ['friend_a_felon', 'friend_a_veteran']
   
   // Dashboard shows:
   "Applicants from Friend A Felon: 42"
   "Applicants from Friend A Veteran: 18"
   ```

2. **FairPath Staffing handles BOTH:**
   ```javascript
   // Staffing dashboard shows unified pipeline:
   Candidates:
     - FAF: 150 active
     - FAV: 85 active
   
   Alerts:
     - Release alerts (FAF): 12 this week
     - Separation alerts (FAV): 8 this week
   
   WOTC Credits:
     - FAF hires: $2,400/hire avg
     - FAV hires: $9,600/hire avg
   ```

3. **Resource Partners can serve BOTH:**
   ```javascript
   // Example: Mental health provider
   platforms_serving: ['friend_a_felon', 'friend_a_veteran']
   va_approved: true // Shows VA badge on FAV only
   ```

4. **Admin can manage BOTH:**
   ```javascript
   // Super admin dashboard:
   Platform Stats:
     - FAF Users: 12,450
     - FAV Users: 3,200
     - Cross-platform employers: 180
   
   Impact Fund:
     - FAF contributions: $45,000
     - FAV contributions: $15,000
     - Total pool: $60,000
   ```

---

## 📱 Frontend Routing

### Main Website (Marketing)
```
/ - Homepage (shows both platforms)
/service-friend-a-felon - FAF service page
/service-veterans - FAV service page
/login - Universal login (detects user platform)
/signup?platform=friend_a_felon
/signup?platform=friend_a_veteran
```

### Friend A Felon App
```
/app/faf/dashboard - Job seeker dashboard
/app/faf/jobs - Job search
/app/faf/housing - Housing search
/app/faf/resources - Free stuff + services
/app/faf/community - Social feed
```

### Friend A Veteran App
```
/app/fav/dashboard - Veteran dashboard
/app/fav/jobs - MOS-matched jobs
/app/fav/housing - BAH housing
/app/fav/benefits - VA benefits navigator
/app/fav/network - Branch-based networking
```

### CRM Portals (Password Protected)
```
/crm/staffing - FairPath Staffing CRM
  - Login required: role = 'fairpath_staff'
  - Shows candidates from BOTH platforms
  - Unified hiring pipeline

/crm/employer - Employer CRM
  - Login required: role = 'employer'
  - Multi-platform job posting
  - Candidate pipeline by platform

/crm/property-owner - Property Owner CRM
  - Login required: role = 'property_owner'
  - Multi-platform housing listings
  - FastTrack applications

/crm/resource-partner - Resource Partner CRM
  - Login required: role = 'resource_partner'
  - Directory management
  - Client tracking
```

---

## 🛡️ Security & Permissions

### Route Protection Middleware

```javascript
// Backend middleware
async function requireAuth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  const { user } = await supabase.auth.getUser(token);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });
  req.user = user;
  next();
}

async function requireRole(allowedRoles) {
  return async (req, res, next) => {
    const { role } = req.user;
    if (!allowedRoles.includes(role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
}

async function requirePhoneVerified(req, res, next) {
  if (!req.user.phone_verified) {
    return res.status(403).json({ error: 'Phone verification required' });
  }
  next();
}

// Usage:
app.get('/crm/staffing', requireAuth, requireRole(['fairpath_staff', 'admin']), requirePhoneVerified);
app.get('/crm/employer', requireAuth, requireRole(['employer', 'admin']), requirePhoneVerified);
```

### Frontend Route Guards

```javascript
// In App.tsx
function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();
  
  if (loading) return <LoadingSpinner />;
  if (!user) return <Navigate to="/login" />;
  if (!user.phone_verified) return <Navigate to="/verify-phone" />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/unauthorized" />;
  
  return children;
}

// Usage:
<Route path="/crm/staffing" element={
  <ProtectedRoute allowedRoles={['fairpath_staff', 'admin']}>
    <FairPathStaffingCRM />
  </ProtectedRoute>
} />
```

---

## 💳 Revenue Flow (20% to Impact Fund)

```javascript
// Every transaction automatically contributes 20%

// Example: Employer pays $1,500 for FairPath Staffing hire
Payment: $1,500
  ├─ FairPath Revenue: $1,200 (80%)
  └─ Impact Fund: $300 (20%)

// Example: Property owner receives $75 FastTrack fee
Payment: $75
  ├─ Property Owner: $45 (60%)
  ├─ FairPath Revenue: $15 (20%)
  └─ Impact Fund: $15 (20%)

// Impact Fund is SHARED across both platforms:
Total Impact Fund Balance: $60,000
  - From FAF: $45,000 (75%)
  - From FAV: $15,000 (25%)

Grant Voting:
  - Premium users from BOTH platforms can vote
  - Grants can be requested by users from BOTH platforms
  - Voting weighted by subscription tier
```

---

## 🚀 Implementation Priority

### Phase 1: Authentication Foundation
1. ✅ Database schema
2. ✅ User registration with platform selection
3. ✅ Password hashing (bcrypt)
4. ✅ Phone verification (SMS)
5. ✅ JWT token generation
6. ✅ Login with 2FA

### Phase 2: CRM Access Control
1. ✅ Role-based permissions
2. ✅ CRM route guards
3. ✅ FairPath Staffing CRM (both platforms)
4. ✅ Employer CRM (multi-platform posting)
5. ✅ Property Owner CRM (multi-platform listings)
6. ✅ Resource Partner CRM

### Phase 3: Platform-Specific Features
1. FAF: Conviction onboarding
2. FAV: DD-214 verification
3. FAV: MOS translation
4. FAV: Security clearance badges
5. Cross-platform job/housing visibility

### Phase 4: Admin Dashboard
1. Super admin access to both platforms
2. Impact Fund management
3. User moderation
4. Analytics across both platforms

---

## 📊 Example User Journeys

### Journey 1: Employer Hiring from BOTH Platforms

```
1. Employer signs up → selects "employer" role
2. Chooses platforms: [✓] FAF [✓] FAV
3. Posts job: "Warehouse Manager - $55K"
   - Visible on: BOTH platforms
   - WOTC eligible: YES
   - Clearance required: NO
4. Employer dashboard shows:
   - 23 applicants from Friend A Felon
   - 8 applicants from Friend A Veteran
5. Employer hires 1 from each platform:
   - FAF hire → $2,400 WOTC credit
   - FAV hire → $9,600 WOTC credit
   - Total saved: $12,000 in tax credits
```

### Journey 2: FairPath Staffing Recruiter

```
1. Staffing recruiter logs into CRM
2. Sees unified dashboard:
   - 150 active candidates (FAF)
   - 85 active candidates (FAV)
3. Receives alerts:
   - Release alert: John Doe releasing from prison 5/15
   - Separation alert: Jane Smith separating from Army 6/1
4. Proactively matches candidates:
   - John (FAF) → Construction job ($2,400 WOTC)
   - Jane (FAV, Secret clearance) → Defense contractor ($9,600 WOTC)
5. Processes placements for both
6. Commission split based on platform
```

### Journey 3: Property Owner Serving Veterans & Justice-Impacted

```
1. Property owner signs up
2. Lists 3-bedroom house:
   - Rent: $1,800/month
   - Visible on: BOTH platforms
   - BAH compatible: YES ($2,100 BAH rate)
   - Felony friendly: YES (no violent crime)
3. Receives applications from both:
   - 5 FAF applicants (via FastTrack)
   - 3 FAV applicants (BAH-backed)
4. Reviews separately in dashboard
5. Selects FAV applicant with BAH guarantee
```

---

## 🔧 Technical Stack Summary

**Frontend:**
- React + TypeScript
- Tailwind CSS
- Platform-specific theming (FAF green vs FAV patriotic)

**Backend:**
- Supabase Edge Functions (Deno + Hono)
- Supabase Auth (email/password + phone)
- Supabase Database (PostgreSQL)
- Twilio/Vonage for SMS

**Payments:**
- Stripe (already integrated)
- Automatic 20% Impact Fund split

**Security:**
- bcrypt password hashing
- JWT tokens
- Phone verification (2FA)
- Role-based access control (RBAC)
- Route guards (frontend + backend)

---

## ✅ Next Steps

1. Build authentication system with phone verification
2. Create unified login that routes to correct platform
3. Build CRM portals with role-based access
4. Implement platform filtering logic (FAF vs FAV visibility)
5. Create admin dashboard for cross-platform management
