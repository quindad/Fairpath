# FairPath Industries Portal Architecture

## Overview
The FairPath website now has **4 separate CRM portals** accessible from the main navigation's "Portals" dropdown.

---

## 🎯 The 4 Portals

### 1. **FairPath Staffing CRM** (Orange - #FF8C42)
**Route:** `#staffing-crm`  
**Component:** `StaffingCRM.tsx`  
**Purpose:** Specialized WOTC-focused staffing platform  
**Features:**
- WOTC Tax Credit Calculator ($9,600/hire)
- Automated IRS form generation (8850, 9061, 9062)
- Release Alerts from FairPath Forward
- Live talent pipeline from prison releases
- ROI Dashboard ($127K WOTC earned demo)
- Premium employer features
- Demo Mode available

**Connection to Friend A Felon App:** ✅ YES - Posts jobs to Friend A Felon app with special tagging:
- **Job Type:** `"fairpath-staffing"` or `"wotc-opportunity"`
- **Tags:** `["WOTC Eligible", "Tax Credit", "FairPath Staffing", "Release Alert"]`
- **Special Badge:** Shows "$9,600 Tax Credit Available" in app with 🟠 Orange badge
- **Priority:** Featured/highlighted at top of job marketplace
- **Source:** `source: "fairpath-staffing-crm"`

**Key Difference:** These jobs appear in the Friend A Felon app with orange "WOTC Opportunity" badges and are featured at the top of the job feed, making them stand out from standard employer jobs (which show blue badges).

---

### 2. **Employer Portal** (Blue - #3B82F6)
**Route:** `#employer-portal`  
**Component:** `EmployerDashboard.tsx`  
**Purpose:** Regular job postings connecting to Friend A Felon mobile app  
**Features:**
- Post jobs like Indeed/LinkedIn
- Receive applications from Friend A Felon app users
- Job seeker profiles from mobile app
- Applicant tracking
- Messaging with candidates
- Standard employer CRM functionality

**Connection to Friend A Felon App:** ✅ YES - Posts jobs to Friend A Felon app with standard tagging:
- **Job Type:** `"standard-employer"` or `"regular-job"`
- **Tags:** `["Full-Time", "Part-Time", "Entry-Level", etc.]`
- **Source:** `source: "employer-portal"`
- **Display:** Standard job listing in marketplace

---

### 3. **Property Owner Portal** (Purple - #A855F7)
**Route:** `#property-portal`  
**Component:** `PropertyOwnerDashboard.tsx`  
**Purpose:** Housing listings connecting to Friend A Felon mobile app  
**Features:**
- Post rental properties
- Receive housing applications from Friend A Felon app users
- Applicant screening
- Lease management
- FastTrack revenue share program
- Application review and approval

**Connection:** This portal receives housing applicants from the **Friend A Felon mobile app** - people looking for felon-friendly housing.

---

### 4. **Resource Partner Portal** (Green - #10B981)
**Route:** `#resource-portal`  
**Component:** `ResourcePartnerDashboard.tsx`  
**Purpose:** Unite Us-style service directory connecting to Friend A Felon app  
**Features:**
- Post services (counseling, legal aid, job training, etc.)
- Receive service requests from Friend A Felon app users
- Client management
- Referral tracking
- Service delivery tracking
- Impact reporting

**Connection:** This portal receives service requests from the **Friend A Felon mobile app** - people looking for reentry resources.

---

## 🔗 How They Connect

```
┌─────────────────────────────────────────────────────────────┐
│                  FairPath Industries Website                │
│                    (Public Marketing Site)                  │
│                                                             │
│  Navigation: "Portals" Dropdown → Access All 4 Portals     │
└─────────────────────────────────────────────────────────────┘
                              │
                ┌─────────────┼─────────────┬─────────────┐
                │             │             │             │
                ▼             ▼             ▼             ▼
    ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
    │   Staffing   │ │   Employer   │ │   Property   │ │   Resource   │
    │     CRM      │ │    Portal    │ │    Portal    │ │    Portal    │
    │   (Orange)   │ │    (Blue)    │ │   (Purple)   │ │    (Green)   │
    └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘
           │                │                │                │
           │                │                │                │
    ┌──────▼────────────────▼────────────────▼────────────────▼──────┐
    │                                                                 │
    │               FairPath Forward (Prison Program)                 │
    │          Releases → Alert Staffing CRM + Flow to App           │
    │                                                                 │
    └─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
           ┌────────────────────────────────────────────────────┐
           │         Friend A Felon Mobile App                  │
           │                                                    │
           │  📱 Job Marketplace (Multiple Sources):           │
           │     • WOTC Jobs (Staffing CRM) - Orange Badge     │
           │     • Regular Jobs (Employer Portal) - Blue       │
           │                                                    │
           │  🏠 Housing Search → Property Portal              │
           │                                                    │
           │  🤝 Resources → Resource Partner Portal           │
           │                                                    │
           └────────────────────────────────────────────────────┘
```

---

## 🎮 Demo Mode

**FairPath Staffing CRM** has full demo mode:
- Click "Enter Demo Mode" on login screen
- Explore all WOTC features without signup
- See live talent pipeline
- Calculate tax credits
- View release alerts
- Generate IRS forms

**Other Portals** use standard dashboards with mock data when accessed without login.

---

## 🚀 Launch Configuration

All 4 portals are now accessible from the main website navigation:
1. Click "Portals" dropdown in top nav
2. Select any of the 4 portals
3. Each portal has its own unique color and branding
4. All portals can navigate back to main website with "Back to Home" functionality

---

## 💼 Business Model

### Revenue Flows:
1. **Staffing CRM:** Employer subscriptions for WOTC automation
2. **Employer Portal:** Job posting fees + premium features
3. **Property Portal:** FastTrack revenue share (15% of rent)
4. **Resource Portal:** Subscription tiers for service providers

### Impact Fund:
**20% of ALL revenue** from all 4 portals → Impact Fund → Grants for justice-impacted people

---

## 🛠 Technical Implementation

**Main App Router:** `/App.tsx`  
**Navigation:** `/components/website/Navigation.tsx`  
**Portal Components:**
- `/components/StaffingCRM.tsx` (with sub-components)
- `/components/dashboards/EmployerDashboard.tsx`
- `/components/dashboards/PropertyOwnerDashboard.tsx`
- `/components/dashboards/ResourcePartnerDashboard.tsx`

**Routing Method:** Client-side hash routing (`#staffing-crm`, `#employer-portal`, etc.)

---

## 📱 Mobile App Integration - Job Listing Types

When syncing to Friend A Felon mobile app, all job listings include metadata for proper categorization:

### Job Listing Schema Example:

```json
{
  "id": "job_12345",
  "title": "Warehouse Associate",
  "company": "ABC Logistics",
  "source": "fairpath-staffing-crm",
  "jobType": "fairpath-staffing",
  "wotcEligible": true,
  "taxCreditAmount": 9600,
  "tags": ["WOTC Eligible", "Tax Credit", "FairPath Staffing", "Release Alert"],
  "badges": ["$9,600 Tax Credit Available"],
  "priority": "featured",
  "releaseAlert": true,
  "releaseDate": "2025-01-15",
  "facility": "San Quentin State Prison",
  "salary": "$18-22/hr",
  "location": "Oakland, CA",
  "description": "...",
  "postedAt": "2025-01-01T12:00:00Z"
}
```

### Standard Employer Job:
```json
{
  "id": "job_67890",
  "title": "Delivery Driver",
  "company": "Quick Delivery Co",
  "source": "employer-portal",
  "jobType": "standard-employer",
  "wotcEligible": false,
  "tags": ["Full-Time", "Entry-Level", "Benefits"],
  "priority": "standard",
  "salary": "$16/hr",
  "location": "San Francisco, CA",
  "description": "...",
  "postedAt": "2025-01-02T10:00:00Z"
}
```

### Mobile App Display Logic:
- **WOTC Jobs** (from Staffing CRM): Show with **orange badge** + "$X Tax Credit" chip
- **Standard Jobs** (from Employer Portal): Show with **blue badge** + standard tags
- Filter options: "WOTC Opportunities", "All Jobs", "Release Alerts"
- Sort by: Featured (WOTC) first, then by date

---

This architecture ensures that employers, property owners, and resource partners all have dedicated portals, and ALL job sources (both FairPath Staffing CRM and regular Employer Portal) feed into the Friend A Felon mobile app with proper differentiation for users to identify WOTC opportunities vs. standard jobs.
