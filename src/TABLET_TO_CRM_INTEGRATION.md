# 📱 FairPath Forward Tablets → CRM Integration

## 🔄 Complete Data Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    FAIRPATH FORWARD TABLETS                     │
│                  (Correctional Facilities & VA Centers)         │
│                                                                 │
│  At Facilities:                    At VA Centers:               │
│  • Profile creation                • Profile creation           │
│  • Conviction details              • DD-214 upload              │
│  • Skills assessment               • MOS translation            │
│  • Resume builder                  • Security clearance         │
│  • Release date                    • Separation date            │
│  • Job preferences                 • VA benefits status         │
│  • Housing needs                   • BAH eligibility            │
└─────────────────────────────────────────────────────────────────┘
                              ↓
                         SUPABASE DB
                    (Shared Database)
                              ↓
┌──────────────────┬──────────────────┬──────────────────┬─────────────────┐
│  STAFFING CRM    │  EMPLOYER CRM    │  PROPERTY CRM    │  RESOURCE CRM   │
│                  │                  │                  │                 │
│  • Candidate     │  • Job apps      │  • Housing apps  │  • Client       │
│    profiles      │  • Screening     │  • Background    │    referrals    │
│  • Release       │  • WOTC          │  • Income        │  • Service      │
│    alerts        │    eligibility   │    verification  │    needs        │
│  • Skills match  │  • Platform      │  • Platform      │  • Platform     │
│  • Platform      │    badges        │    badges        │    badges       │
│    badges        │                  │                  │                 │
└──────────────────┴──────────────────┴──────────────────┴─────────────────┘
```

---

## 📊 Data Flow by Platform

### **Friend A Felon Pathway**
```
1. USER at Correctional Facility
   ↓ (Uses FairPath Forward Tablet)
   
2. CREATES PROFILE on Tablet:
   ✓ Name, contact info
   ✓ Conviction type (felony/misdemeanor)
   ✓ Conviction details (non-violent, drug, etc.)
   ✓ Release date
   ✓ Skills & experience
   ✓ Job preferences
   ✓ Housing needs
   ✓ Photo upload
   ✓ Resume builder
   
3. DATA SAVES to Database:
   → job_seekers table (platform: 'friend_a_felon')
   → conviction_type, conviction_details, release_date fields populated
   
4. DATA APPEARS in CRMs:
   
   → STAFFING CRM:
     • Candidate shows in talent pipeline
     • Release alert triggers 30 days before release
     • $2,400 WOTC eligibility flagged
     • Skills matched to open positions
     
   → EMPLOYER CRM:
     • When user applies to jobs
     • Profile shows: "Friend A Felon" badge
     • Conviction type visible
     • Background check status
     • WOTC: $2,400 credit
     
   → PROPERTY CRM:
     • When user applies to housing
     • Income verification
     • Employment status
     • Felony-friendly filter matching
     • Background check results
     
   → RESOURCE CRM:
     • Auto-referral based on needs
     • Service recommendations
     • Progress tracking
```

### **Friend A Veteran Pathway**
```
1. VETERAN at VA Center / Base
   ↓ (Uses FairPath Forward Tablet)
   
2. CREATES PROFILE on Tablet:
   ✓ Name, contact info
   ✓ DD-214 upload (scanned/photo)
   ✓ Branch of service
   ✓ MOS code
   ✓ Security clearance level
   ✓ Separation date
   ✓ Veteran status (active/reserve/separated)
   ✓ BAH eligibility
   ✓ VA benefits status
   ✓ Skills & experience
   ✓ Job preferences
   ✓ Housing needs
   
3. DATA SAVES to Database:
   → job_seekers table (platform: 'friend_a_veteran')
   → dd214_verified, branch, mos_code, clearance fields populated
   → Automatic MOS → civilian skill translation
   
4. DATA APPEARS in CRMs:
   
   → STAFFING CRM:
     • Candidate shows in talent pipeline
     • Separation alert triggers 90 days before separation
     • $5,600-$9,600 WOTC eligibility flagged
     • MOS translated to civilian skills
     • Security clearance highlighted
     
   → EMPLOYER CRM:
     • When veteran applies to jobs
     • Profile shows: "Friend A Veteran" badge
     • Branch, MOS, clearance visible
     • DD-214 verification status
     • WOTC: $5,600-$9,600 credit
     
   → PROPERTY CRM:
     • When veteran applies to housing
     • BAH eligibility shown
     • BAH amount calculated by location
     • Military income verification
     • VA-backed guarantee
     
   → RESOURCE CRM:
     • Auto-referral to VA-approved services
     • VA benefits navigator access
     • Mental health (PTSD) services
     • Financial literacy
```

---

## 🗄️ Database Schema Integration

### **Shared Tables (from Tablets → CRMs)**

```sql
-- Users (created on tablets)
users
  - id (UUID)
  - email
  - phone (entered on tablet)
  - platform ('friend_a_felon' OR 'friend_a_veteran')
  - created_at (timestamp from tablet session)
  - tablet_registration (boolean: true)
  - facility_id (which facility/VA center)

-- Job Seekers (profiles from tablets)
job_seekers
  - id
  - user_id (FK to users)
  - platform ('friend_a_felon' OR 'friend_a_veteran')
  - first_name (from tablet)
  - last_name (from tablet)
  - photo_url (uploaded on tablet)
  - resume_url (built on tablet)
  
  -- FAF-specific (from correctional facility tablets)
  - conviction_type
  - conviction_details (JSON)
  - release_date (triggers alerts in Staffing CRM)
  - facility_name
  - parole_officer_contact
  
  -- FAV-specific (from VA center tablets)
  - dd214_file_url (uploaded on tablet)
  - dd214_verified (boolean)
  - branch
  - mos_code (entered on tablet)
  - mos_translated (auto-populated)
  - security_clearance
  - clearance_expiry
  - separation_date (triggers alerts in Staffing CRM)
  - va_center_name
  - bah_eligible
  - bah_zip_code

-- Job Applications (submitted from tablets OR web)
job_applications
  - id
  - job_seeker_id (from tablet profile)
  - job_id
  - applied_from ('tablet' OR 'web')
  - status (shows in Employer CRM)
  
-- Housing Applications (submitted from tablets OR web)
housing_applications
  - id
  - job_seeker_id (from tablet profile)
  - housing_id
  - applied_from ('tablet' OR 'web')
  - fasttrack_paid (boolean)
  - income_verification (from tablet data)
  - status (shows in Property CRM)

-- Service Referrals (auto-generated from tablet needs assessment)
service_referrals
  - id
  - job_seeker_id (from tablet profile)
  - service_id
  - referral_source ('tablet_assessment')
  - urgency_level
  - status (shows in Resource CRM)
```

---

## 🎯 How Each CRM Receives Tablet Data

### **1. FairPath Staffing CRM**

**Data from Tablets:**
- ✅ New candidate profiles (both FAF + FAV)
- ✅ Skills & experience entered on tablet
- ✅ Release dates (FAF) → triggers 30-day alerts
- ✅ Separation dates (FAV) → triggers 90-day alerts
- ✅ WOTC eligibility auto-calculated

**CRM Features Fed by Tablet Data:**
```javascript
// Release Alert (FAF)
{
  candidate: "Marcus Johnson",
  platform: "friend_a_felon",
  release_date: "2025-05-15", // FROM TABLET
  facility: "Texas State Prison",
  alert_type: "30_days_before",
  wotc_credit: 2400
}

// Separation Alert (FAV)
{
  candidate: "Sarah Martinez",
  platform: "friend_a_veteran",
  separation_date: "2025-06-01", // FROM TABLET
  branch: "Army",
  mos: "31B - Military Police", // FROM TABLET
  clearance: "Secret", // FROM TABLET
  alert_type: "90_days_before",
  wotc_credit: 9600
}
```

---

### **2. Employer CRM**

**Data from Tablets:**
- ✅ Job applications submitted on tablets
- ✅ Candidate profiles with tablet-entered data
- ✅ Conviction details (FAF) for screening
- ✅ DD-214 verification status (FAV)
- ✅ MOS translation (FAV)
- ✅ Security clearance (FAV)

**CRM Features Fed by Tablet Data:**
```javascript
// FAF Applicant (from tablet)
{
  name: "Marcus Johnson",
  platform: "friend_a_felon",
  applied_from: "tablet", // TABLET APPLICATION
  conviction_type: "Non-violent felony", // FROM TABLET
  conviction_details: {
    offense: "Drug possession",
    year: 2018,
    sentence_length: "5 years"
  }, // FROM TABLET
  release_date: "2022-03-15", // FROM TABLET
  skills: ["Logistics", "Warehouse"], // FROM TABLET
  resume_url: "...", // BUILT ON TABLET
  wotc_eligible: true,
  wotc_amount: 2400
}

// FAV Applicant (from tablet)
{
  name: "Sarah Martinez",
  platform: "friend_a_veteran",
  applied_from: "tablet", // TABLET APPLICATION
  dd214_verified: true, // UPLOADED ON TABLET
  branch: "Army", // FROM TABLET
  mos_code: "31B", // FROM TABLET
  mos_translated: "Law Enforcement / Security", // AUTO
  clearance: "Secret", // FROM TABLET
  clearance_expiry: "2026-12-31", // FROM TABLET
  separation_date: "2023-11-30", // FROM TABLET
  skills: ["Military Police", "Security"], // FROM TABLET
  wotc_eligible: true,
  wotc_amount: 9600
}
```

---

### **3. Property Owner CRM**

**Data from Tablets:**
- ✅ Housing applications submitted on tablets
- ✅ Income information (employment from tablet profile)
- ✅ Background check consent (from tablet)
- ✅ BAH eligibility (FAV from tablet)
- ✅ Housing preferences (from tablet)

**CRM Features Fed by Tablet Data:**
```javascript
// FAF Housing Application (from tablet)
{
  applicant: "Marcus Johnson",
  platform: "friend_a_felon",
  applied_from: "tablet", // TABLET APPLICATION
  property: "123 Main St, Dallas, TX",
  income: 52000, // FROM TABLET JOB DATA
  employment_status: "Employed", // FROM TABLET
  employer: "ABC Logistics", // FROM TABLET
  conviction_type: "Non-violent felony", // FROM TABLET
  release_date: "2022-03-15", // FROM TABLET
  background_check_consent: true, // FROM TABLET
  fasttrack_paid: true,
  preferences: {
    bedrooms: 2,
    max_rent: 1500,
    location: "Dallas"
  } // FROM TABLET
}

// FAV Housing Application (from tablet)
{
  applicant: "Sarah Martinez",
  platform: "friend_a_veteran",
  applied_from: "tablet", // TABLET APPLICATION
  property: "456 Oak Ave, Houston, TX",
  income: 68000, // FROM TABLET JOB DATA
  employment_status: "Active Duty", // FROM TABLET
  bah_eligible: true, // FROM TABLET
  bah_amount: 2400, // CALCULATED FROM TABLET ZIP
  bah_backed: true,
  branch: "Army", // FROM TABLET
  dd214_verified: true, // FROM TABLET
  fasttrack_paid: true,
  preferences: {
    bedrooms: 3,
    max_rent: 2000,
    bah_compatible: true
  } // FROM TABLET
}
```

---

### **4. Resource Partner CRM**

**Data from Tablets:**
- ✅ Needs assessment from tablet intake
- ✅ Service preferences marked on tablet
- ✅ Auto-referrals based on tablet profile
- ✅ Mental health screening results (from tablet)
- ✅ VA benefits status (FAV from tablet)

**CRM Features Fed by Tablet Data:**
```javascript
// FAF Client Referral (from tablet assessment)
{
  client: "Marcus Johnson",
  platform: "friend_a_felon",
  referral_source: "tablet_assessment", // FROM TABLET
  service_needed: "Mental Health Counseling",
  urgency: "high",
  needs_assessment: {
    mental_health: "PTSD symptoms", // FROM TABLET
    substance_abuse: "History of drug use", // FROM TABLET
    employment: "Needs job training", // FROM TABLET
    housing: "Homeless upon release" // FROM TABLET
  }, // FROM TABLET ASSESSMENT
  conviction_type: "Drug offense", // FROM TABLET
  release_date: "2021-08-20" // FROM TABLET
}

// FAV Client Referral (from tablet assessment)
{
  client: "Sarah Martinez",
  platform: "friend_a_veteran",
  referral_source: "tablet_assessment", // FROM TABLET
  service_needed: "VA Benefits Navigation",
  urgency: "medium",
  needs_assessment: {
    mental_health: "Transition stress", // FROM TABLET
    financial: "Needs budgeting help", // FROM TABLET
    va_benefits: "Not enrolled yet", // FROM TABLET
    housing: "Needs BAH-compatible housing" // FROM TABLET
  }, // FROM TABLET ASSESSMENT
  branch: "Army", // FROM TABLET
  separation_date: "2023-11-30", // FROM TABLET
  va_approved_services: true
}
```

---

## 📱 Tablet UI → CRM Dashboard Flow

### **Example: User Creates Profile on Tablet**

**Step 1: Tablet Session** (at facility)
```
User: Marcus Johnson
Location: Texas State Prison
Tablet ID: FAF-TABLET-1523

Tablet Screen Flow:
1. Welcome screen
2. Create account (email/phone)
3. Upload photo
4. Enter conviction details:
   - Type: Felony
   - Offense: Drug possession
   - Release date: 05/15/2025
5. Skills assessment:
   - Logistics: ✓
   - Warehouse: ✓
   - Forklift certified: ✓
6. Resume builder
7. Job preferences:
   - Location: Dallas, TX
   - Salary: $40K-$60K
   - Industries: Logistics, Warehouse
8. Housing needs:
   - Bedrooms: 2
   - Max rent: $1,500
9. Services needed:
   - Mental health: ✓
   - Job training: ✓
10. Submit profile

↓ SAVES TO DATABASE ↓
```

**Step 2: Data Appears in Staffing CRM** (immediately)
```
Staffing CRM Dashboard:
- New candidate: Marcus Johnson
- Platform: Friend A Felon (green badge)
- Release date: 05/15/2025 (triggers alert 30 days before)
- Skills: Logistics, Warehouse, Forklift
- Location: Dallas, TX
- WOTC: $2,400 eligible
- Alert: "Release in 120 days - start matching"
```

**Step 3: Marcus Applies to Job on Tablet**
```
Tablet: Marcus browses jobs
Sees: "Warehouse Manager - Dallas - $55K"
Clicks: "Apply Now"
Tablet submits application

↓ SAVES TO DATABASE ↓
```

**Step 4: Application Appears in Employer CRM** (immediately)
```
Employer CRM → Candidates Tab:
- New applicant: Marcus Johnson
- Platform: Friend A Felon (green badge)
- Applied from: Tablet (shows source)
- Conviction: Non-violent drug offense
- Release date: 05/15/2025
- Experience: 8 years logistics
- Skills match: 95%
- WOTC: $2,400 credit
- Resume: [View] (from tablet builder)
- Photo: [View] (uploaded on tablet)
- Background check: Not started
- Status: New
```

**Step 5: Marcus Applies to Housing on Tablet**
```
Tablet: Marcus browses housing
Sees: "3BR House - Dallas - $1,800/mo"
Clicks: "Apply with FastTrack ($75)"
Pays $75 on tablet
Submits application

↓ SAVES TO DATABASE ↓
```

**Step 6: Application Appears in Property CRM** (immediately)
```
Property CRM → Applications Tab:
- New applicant: Marcus Johnson
- Platform: Friend A Felon (green badge)
- Applied from: Tablet
- Property: 123 Main St, Dallas
- Rent: $1,800/mo
- FastTrack: PAID ($75 - you get $45)
- Income: $52,000/year (from job data)
- Employment: Employed at ABC Logistics
- Conviction: Non-violent drug offense
- Release date: 2022 (already released)
- Background check: Consent given on tablet
- Status: Pending review
```

**Step 7: Auto-Referral to Resource Partner** (based on tablet assessment)
```
Resource CRM → Referrals Tab:
- New referral: Marcus Johnson
- Platform: Friend A Felon (green badge)
- Referral source: Tablet needs assessment
- Services needed:
  • Mental health counseling (high priority)
  • Job training (medium priority)
- Urgency: High
- Notes from tablet: "PTSD symptoms, history of substance abuse"
- Status: Pending acceptance
```

---

## 🔄 Real-Time Sync

### **Tablet → CRM Data Flow Speed**

```
USER ACTION ON TABLET          →    CRM UPDATE TIME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Profile created                →    Instant (< 1 second)
Photo uploaded                 →    2-5 seconds (processing)
DD-214 uploaded (FAV)          →    5-10 seconds (OCR scan)
Resume built                   →    Instant
Job application submitted      →    Instant
Housing application submitted  →    Instant
Needs assessment completed     →    Instant (auto-referral created)
Payment processed (FastTrack)  →    2-3 seconds (Stripe)
Background check consent       →    Instant
```

### **CRM Real-Time Notifications**

When tablet data arrives, CRMs show:
- 🔔 **Browser notification:** "New candidate from Texas State Prison"
- 🔔 **Dashboard badge:** Red dot on "Candidates" tab
- 🔔 **Email alert:** "New application from Friend A Felon"
- 🔔 **SMS alert:** For urgent referrals (high priority cases)

---

## 🎯 Critical Integration Points

### **1. Tablet Registration Tracking**
```javascript
// In CRMs, you can see WHERE user registered:
{
  user: "Marcus Johnson",
  platform: "friend_a_felon",
  registration_source: "tablet",
  facility: "Texas State Prison - Unit 5",
  facility_id: "TSP-U5-1523",
  registration_date: "2024-11-15T10:30:00Z",
  tablet_id: "FAF-TABLET-1523",
  assisted_by: "Counselor Jane Smith" // facility staff
}
```

### **2. Release/Separation Alert System**
```javascript
// Staffing CRM automatically creates alerts from tablet data:

// FAF Release Alert (30 days before)
if (release_date - today = 30 days) {
  create_alert({
    type: "release",
    candidate: user,
    days_until: 30,
    facility: tablet_facility,
    action_needed: "Begin job matching now"
  });
}

// FAV Separation Alert (90 days before)
if (separation_date - today = 90 days) {
  create_alert({
    type: "separation",
    candidate: user,
    branch: tablet_branch,
    mos: tablet_mos,
    days_until: 90,
    action_needed: "Start transition planning"
  });
}
```

### **3. WOTC Auto-Calculation**
```javascript
// From tablet data, WOTC eligibility is automatic:

// FAF (from tablet conviction + release date)
if (conviction_type && release_date < 1_year_ago) {
  wotc_eligible = true;
  wotc_amount = 2400;
  wotc_category = "Ex-Felon";
}

// FAV (from tablet DD-214 + separation date)
if (dd214_verified && separation_date < 1_year_ago) {
  wotc_eligible = true;
  if (unemployed > 6_months) {
    wotc_amount = 9600;
    wotc_category = "Long-term Unemployed Veteran";
  } else {
    wotc_amount = 5600;
    wotc_category = "Veteran";
  }
}
```

### **4. MOS Translation (FAV Only)**
```javascript
// Tablet captures MOS, CRMs show civilian translation:

tablet_mos = "31B"; // Military Police

// Auto-translated in database:
civilian_skills = [
  "Law Enforcement",
  "Security Operations",
  "Investigation",
  "Detention Operations",
  "Traffic Control"
];

// Shows in Staffing & Employer CRMs:
"MOS: 31B (Military Police) → Law Enforcement / Security"
```

---

## 📊 CRM Dashboard Enhancements for Tablet Data

### **Visual Indicators in CRMs:**

**"Source" Badge:**
```
[Tablet Registration] → Shows user created profile on tablet
[Web Registration]    → Shows user created profile on website
```

**"Facility" Info:**
```
FAF: "Texas State Prison - Unit 5"
FAV: "VA Center - Dallas"
```

**"Data Quality" Score:**
```
✅ Complete Profile (all tablet fields filled)
⚠️  Partial Profile (missing photo/resume)
❌ Incomplete (needs review)
```

---

## 🚀 Next Steps: Backend Integration

To connect tablets to CRMs, implement:

1. **Supabase Realtime** (already have database):
```javascript
// In each CRM, subscribe to new records:
supabase
  .from('job_seekers')
  .on('INSERT', (payload) => {
    if (payload.new.registration_source === 'tablet') {
      showNotification('New tablet registration!');
      refreshCandidateList();
    }
  })
  .subscribe();
```

2. **Tablet API Endpoints:**
```javascript
// Tablets POST to these endpoints:
POST /api/tablet/register-user
POST /api/tablet/upload-photo
POST /api/tablet/upload-dd214
POST /api/tablet/submit-application
POST /api/tablet/needs-assessment
```

3. **File Upload Handling:**
```javascript
// For photos, DD-214s, resumes from tablets:
Supabase Storage bucket: 'tablet-uploads'
  → Photos: /photos/{user_id}.jpg
  → DD-214s: /dd214s/{user_id}.pdf
  → Resumes: /resumes/{user_id}.pdf
```

---

## ✅ Summary

**All 4 CRMs are designed to receive and display tablet data:**

- ✅ **Staffing CRM:** Candidate profiles, release/separation alerts
- ✅ **Employer CRM:** Applications, convictions, DD-214s, WOTC
- ✅ **Property CRM:** Housing apps, income, BAH eligibility
- ✅ **Resource CRM:** Needs assessments, service referrals

**Data flows from tablets → database → CRMs in real-time.**

The CRMs are **already built** to handle this data with proper platform badges, filtering, and display!
