# Friend A Felon Mobile App - Job Integration Guide

## Overview
The Friend A Felon mobile app receives job listings from **2 different sources** via the FairPath Industries portal system. Each source has unique tagging so users can easily identify WOTC opportunities vs. standard jobs.

---

## 🎯 Job Source Types

### 1. FairPath Staffing CRM Jobs (WOTC Opportunities)
**Portal:** FairPath Staffing CRM (Orange)  
**Route:** `#staffing-crm`

#### Job Listing Schema:
```json
{
  "id": "job_1704470400000",
  "candidateName": "Marcus Thompson",
  "candidateId": "cand_789",
  "source": "fairpath-staffing-crm",
  "jobType": "fairpath-staffing",
  "wotcEligible": true,
  "taxCreditAmount": 9600,
  "tags": [
    "WOTC Eligible",
    "Tax Credit",
    "FairPath Staffing",
    "Release Alert"
  ],
  "badges": [
    "$9,600 Tax Credit Available"
  ],
  "priority": "featured",
  "releaseAlert": true,
  "releaseDate": "2025-01-15",
  "facility": "San Quentin State Prison",
  "location": "Oakland, CA",
  "createdAt": "2025-01-05T12:00:00Z",
  "syncToMobileApp": true
}
```

#### Mobile App Display:
- **Badge Color:** 🟠 Orange
- **Highlight:** Featured at top of job list
- **Special Chips:** "$9,600 Tax Credit" badge
- **Icon:** Show tax credit icon
- **Filter Tag:** "WOTC Opportunities"

#### Console Logs:
```
📱 MOBILE APP SYNC - FairPath Staffing Job Created: {...}
🏷️ Job Tags: ["WOTC Eligible", "Tax Credit", "FairPath Staffing", "Release Alert"]
💰 WOTC Amount: 9600
🎯 Display Priority: featured
📍 Source Portal: fairpath-staffing-crm
```

---

### 2. Employer Portal Jobs (Standard Jobs)
**Portal:** Employer Portal (Blue)  
**Route:** `#employer-portal`

#### Job Listing Schema:
```json
{
  "id": "job_employer_1704470500000",
  "source": "employer-portal",
  "jobType": "standard-employer",
  "wotcEligible": false,
  "tags": [
    "Full-Time",
    "Entry-Level"
  ],
  "priority": "standard",
  "syncToMobileApp": true,
  "createdAt": "2025-01-05T12:05:00Z"
}
```

#### Mobile App Display:
- **Badge Color:** 🔵 Blue
- **Highlight:** Standard display (sorted by date)
- **Icon:** Standard briefcase icon
- **Filter Tag:** "All Jobs"

#### Console Logs:
```
📱 MOBILE APP SYNC - Standard Employer Job: {...}
🏷️ Job Type: standard-employer
📍 Source Portal: employer-portal
🎯 Display Priority: standard
```

---

## 📱 Mobile App UI/UX

### Job Marketplace Screen:

```
┌─────────────────────────────────────────┐
│  🔍 Search Jobs                     ⚙️  │
│                                         │
│  Filters: [WOTC] [All Jobs] [Full-Time]│
├─────────────────────────────────────────┤
│                                         │
│  ⭐ Featured WOTC Opportunities         │
│  ┌───────────────────────────────────┐  │
│  │ 🟠 Warehouse Associate            │  │
│  │    ABC Logistics                  │  │
│  │    💰 $9,600 Tax Credit Available │  │
│  │    📍 Oakland, CA                 │  │
│  │    🏢 FairPath Staffing           │  │
│  └───────────────────────────────────┘  │
│                                         │
│  📋 All Jobs                            │
│  ┌───────────────────────────────────┐  │
│  │ 🔵 Delivery Driver                │  │
│  │    Quick Delivery Co              │  │
│  │    💵 $16/hr                      │  │
│  │    📍 San Francisco, CA           │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │ 🔵 Retail Associate               │  │
│  │    Main Street Market             │  │
│  │    💵 $15/hr                      │  │
│  │    📍 Berkeley, CA                │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

### Job Detail Screen (WOTC Job):

```
┌─────────────────────────────────────────┐
│  ← Back                                 │
├─────────────────────────────────────────┤
│                                         │
│  🟠 WOTC OPPORTUNITY                    │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                         │
│  Warehouse Associate                    │
│  ABC Logistics                          │
│                                         │
│  💰 $9,600 Tax Credit Available         │
│  📍 Oakland, CA                         │
│  💵 $18-22/hr                           │
│  📅 Release Date: Jan 15, 2025          │
│  🏢 Source: FairPath Staffing CRM       │
│                                         │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                         │
│  About This Opportunity:                │
│  This is a special WOTC-eligible        │
│  opportunity through FairPath Staffing. │
│  Employers receive up to $9,600 in      │
│  federal tax credits for this hire.     │
│                                         │
│  [Apply Now]                            │
│                                         │
└─────────────────────────────────────────┘
```

---

## 🔧 Implementation Notes

### Filter Logic:
```javascript
// Mobile app filter function
function filterJobs(jobs, filter) {
  switch(filter) {
    case 'wotc':
      return jobs.filter(job => 
        job.source === 'fairpath-staffing-crm' && 
        job.wotcEligible === true
      );
    case 'all':
      return jobs;
    case 'featured':
      return jobs.filter(job => job.priority === 'featured');
    default:
      return jobs;
  }
}
```

### Sort Logic:
```javascript
// Mobile app sort function
function sortJobs(jobs) {
  return jobs.sort((a, b) => {
    // Featured WOTC jobs first
    if (a.priority === 'featured' && b.priority !== 'featured') return -1;
    if (b.priority === 'featured' && a.priority !== 'featured') return 1;
    
    // Then by date
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
}
```

### Badge Color Component:
```javascript
function JobSourceBadge({ source }) {
  if (source === 'fairpath-staffing-crm') {
    return (
      <div className="bg-orange-500 text-white px-3 py-1 rounded-full">
        🟠 WOTC Opportunity
      </div>
    );
  }
  
  if (source === 'employer-portal') {
    return (
      <div className="bg-blue-500 text-white px-3 py-1 rounded-full">
        🔵 Standard Job
      </div>
    );
  }
}
```

---

## 🚀 API Endpoints (Future)

### Get All Jobs:
```
GET /api/jobs?source=all
GET /api/jobs?source=fairpath-staffing-crm
GET /api/jobs?source=employer-portal
```

### Response:
```json
{
  "jobs": [
    {
      "id": "job_123",
      "source": "fairpath-staffing-crm",
      "jobType": "fairpath-staffing",
      "wotcEligible": true,
      ...
    },
    {
      "id": "job_456",
      "source": "employer-portal",
      "jobType": "standard-employer",
      "wotcEligible": false,
      ...
    }
  ]
}
```

---

## ✅ Key Takeaways for Mobile Team

1. **Two distinct job sources** - both go to same mobile app
2. **`source` field is critical** - determines display style
3. **WOTC jobs get priority** - featured at top of list
4. **Orange = WOTC, Blue = Standard** - consistent color coding
5. **Check console logs** - all job creation events are logged
6. **Filter by source** - users can toggle between WOTC and all jobs

---

This integration ensures that justice-impacted people can easily identify which jobs offer special WOTC opportunities (potentially more employer interest) vs. standard job postings, while employers using the specialized Staffing CRM can highlight their tax credit opportunities.
