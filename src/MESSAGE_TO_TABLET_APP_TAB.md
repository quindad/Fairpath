# 📱 MESSAGE FOR TABLET APP DEVELOPMENT TAB

Copy and paste this entire file into the new Figma Make tab where you're building the tablet app.

---

## 🎯 WHAT YOU'RE BUILDING

A **React-based tablet app** that runs **100% offline** on Android prison tablets. The app helps incarcerated people prepare for release by building resumes, tracking habits, setting goals, and earning certifications BEFORE they get out.

---

## 📋 COMPLETE PROJECT BRIEF

You are building the FairPath Prerelease tablet app. Here's everything you need to know:

### **Project Name:** FairPath Ready  
### **Platform:** Android tablets (locked down, limited internet)  
### **Network:** 100% offline (syncs at night via facility WiFi OR manual export)  
### **Users:** Incarcerated people (30-90 days before release)  
### **Goal:** Prepare them for release so they have a job waiting on day one  

---

## 🎨 FEATURES TO BUILD

Build these 10 components:

### 1. **Onboarding Flow**
Screens:
- Welcome screen ("Welcome to FairPath Ready")
- Basic info form (name, DOC number, date of birth, facility, release date)
- Contact info (phone, email - for after release)
- Release location (city, state, zip)
- Job preferences (desired jobs, industries, salary)

### 2. **Habit Tracker**
Features:
- Create new habits (build vs break)
- Daily check-in interface (simple checkboxes)
- Streak display (current streak, longest streak, completion rate)
- Categories (health, education, mindfulness, etc.)
- Habit history (calendar view)
- Badges for milestones (7, 30, 90 days, 1 year)

### 3. **Goal Setting (30/60/90 Day)**
Features:
- Create goals in 3 categories (30-day, 60-day, 90-day)
- For each goal: what, why, how, deadline
- Track progress
- Mark complete
- Record outcome

### 4. **Resume Builder**
Sections:
- Work history (company, title, dates, duties, achievements)
- Education (school, degree, graduation date)
- Skills (list of skills)
- Certifications (link to certifications added elsewhere)
- References (name, relationship, phone, email)
- Objective statement
- Preview formatted resume

### 5. **Certifications Tracker**
Features:
- Add certifications (GED, OSHA, Forklift, Welding, etc.)
- Fields: type, name, issuing org, date, expiry, verification number
- Display badges for earned certs

### 6. **Daily Check-In**
Features:
- Appears once per day
- Mood/energy/stress sliders (1-10)
- Reflection prompts:
  - One thing I'm grateful for
  - One thing I learned today
  - Tomorrow's focus
  - Challenges I'm facing
- Optional journal entry

### 7. **Countdown Calendar**
Features:
- Large display: "127 Days Until Freedom"
- Visual calendar
- Mark important dates
- Milestones (90 days, 60 days, 30 days, 1 week)
- Progress bar ("45% of sentence complete")

### 8. **Dashboard / Home Screen**
Display:
- Release countdown
- Today's habits (quick check-in)
- Daily check-in reminder
- Progress stats (habit streaks, resume completion, goals completed)
- Quick actions

### 9. **Data Export / Sync**
Three modes:
- **Auto-sync:** Runs at 2am, sends data to facility server
- **Manual export:** Admin button generates encrypted JSON file
- **Release code:** Generated 7 days before release

### 10. **Admin Panel**
Features:
- Password protected
- View all user data
- Export data for facility
- Configure sync settings
- Generate reports

---

## 💾 DATA STRUCTURES

Use these EXACT structures when saving data locally:

### **User Profile:**

```javascript
{
  id: generateUUID(),
  docNumber: "123456",
  facilityCode: "CA-PRISON-001",
  facilityName: "California State Prison - Los Angeles",
  fullName: "John Smith",
  dateOfBirth: "1985-05-15",
  phoneNumber: "555-1234",
  email: "john@example.com",
  releaseDate: "2025-03-15",
  releasingToCity: "Los Angeles",
  releasingToState: "CA",
  releasingToZip: "90001",
  releaseCode: null, // Generated 7 days before release
  synced: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}
```

### **Habit:**

```javascript
{
  id: generateUUID(),
  userId: "user-uuid",
  habitName: "Daily Reading",
  habitType: "build", // or "break"
  habitCategory: "education",
  frequency: "daily",
  checkIns: [
    { date: "2024-12-04", completed: true, note: "Read 2 chapters" },
    { date: "2024-12-05", completed: true }
  ],
  currentStreak: 45,
  longestStreak: 60,
  totalCompletions: 180,
  totalDaysTracked: 200,
  completionRate: 90.0,
  startedAt: new Date().toISOString(),
  synced: false
}
```

### **Goal:**

```javascript
{
  id: generateUUID(),
  userId: "user-uuid",
  goalCategory: "30-day", // or "60-day", "90-day"
  goalText: "Find full-time employment in construction",
  goalType: "employment",
  why: "To support my family and rebuild my life",
  howSteps: [
    "Complete resume in app",
    "Apply to 10 construction companies",
    "Practice interview answers"
  ],
  supportNeeded: "Transportation to interviews",
  deadline: "2025-04-15",
  completed: false,
  completedAt: null,
  outcome: null,
  synced: false,
  createdAt: new Date().toISOString()
}
```

### **Resume:**

```javascript
{
  id: generateUUID(),
  userId: "user-uuid",
  workHistory: [
    {
      company: "ABC Construction",
      title: "Laborer",
      startDate: "2010-01-01",
      endDate: "2018-06-15",
      duties: [
        "Operated heavy machinery",
        "Assisted with framing and concrete work"
      ],
      achievements: [
        "Zero safety incidents over 8 years",
        "Promoted to lead laborer in year 3"
      ]
    }
  ],
  education: [
    {
      school: "Lincoln High School",
      degree: "High School Diploma",
      graduationDate: "2008-06-01",
      gpa: "3.2"
    }
  ],
  skills: ["Forklift Operation", "Welding", "Construction"],
  references: [
    {
      name: "Mike Johnson",
      relationship: "Former Supervisor",
      phone: "555-1234",
      email: "mike@abc.com",
      company: "ABC Construction"
    }
  ],
  desiredJobTitles: ["Construction Laborer", "Warehouse Worker"],
  desiredIndustries: ["Construction", "Manufacturing"],
  desiredSalaryMin: 35000,
  desiredSalaryMax: 50000,
  willingToRelocate: false,
  objectiveStatement: "Hardworking and reliable construction laborer with 8+ years of experience...",
  synced: false,
  lastUpdated: new Date().toISOString()
}
```

### **Certification:**

```javascript
{
  id: generateUUID(),
  userId: "user-uuid",
  certType: "GED",
  certName: "General Education Development",
  issuingOrganization: "California DOC Education",
  issueDate: "2023-05-15",
  expiryDate: null,
  verificationNumber: "GED-2023-5678",
  notes: "Scored 720/800",
  synced: false,
  createdAt: new Date().toISOString()
}
```

### **Daily Check-In:**

```javascript
{
  id: generateUUID(),
  userId: "user-uuid",
  checkInDate: "2024-12-04",
  moodRating: 7,
  energyLevel: 6,
  stressLevel: 5,
  gratitude: "My family's support",
  learnedToday: "How to format a professional resume",
  tomorrowGoal: "Complete my work history section",
  challenges: "Missing information from old jobs",
  journalEntry: "Today was a good day. I'm feeling more hopeful about my future...",
  synced: false,
  createdAt: new Date().toISOString()
}
```

---

## 📡 API ENDPOINTS (Backend is Ready)

### **Base URL:**
```
https://${projectId}.supabase.co/functions/v1/make-server-a6daf7a5
```

### **Sync Data (POST /prerelease/sync):**

```javascript
const syncData = async () => {
  const allUsers = await db.users.toArray();
  const allHabits = await db.habits.toArray();
  const allGoals = await db.goals.toArray();
  const allResumes = await db.resumes.toArray();
  const allCerts = await db.certifications.toArray();
  const allCheckins = await db.checkins.toArray();

  const response = await fetch('http://prison-server.local/sync', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Facility-Code': 'CA-PRISON-001'
    },
    body: JSON.stringify({
      facility: "CA State Prison - Los Angeles",
      facilityCode: "CA-PRISON-001",
      syncTimestamp: Date.now(),
      users: allUsers,
      habits: allHabits,
      goals: allGoals,
      resumes: allResumes,
      certifications: allCerts,
      checkIns: allCheckins
    })
  });

  if (response.ok) {
    // Mark all as synced
    await markAllAsSynced();
  }
};
```

### **Manual Export Function:**

```javascript
const exportAllData = async () => {
  const data = {
    facility: "CA State Prison - Los Angeles",
    facilityCode: "CA-PRISON-001",
    exportDate: new Date().toISOString(),
    users: await db.users.toArray(),
    habits: await db.habits.toArray(),
    goals: await db.goals.toArray(),
    resumes: await db.resumes.toArray(),
    certifications: await db.certifications.toArray(),
    checkIns: await db.checkins.toArray()
  };

  // Encrypt (optional)
  // const encrypted = await encrypt(data);

  // Download
  const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `fairpath-export-${Date.now()}.json`;
  a.click();
};
```

### **Generate Release Code:**

```javascript
const generateReleaseCode = () => {
  const digits = Math.floor(1000 + Math.random() * 9000);
  const letters = Math.random().toString(36).substr(2, 4).toUpperCase();
  return `FP-${digits}-${letters}`;
  // Example: "FP-7382-XKWQ"
};
```

---

## 🛠️ TECH STACK RECOMMENDATIONS

### **Framework:**
- React (you can use Create React App or Vite)
- OR React Native (if targeting actual Android tablets)

### **State Management:**
- React Context (simple, built-in)
- OR Zustand (lightweight, easy)

### **Local Storage:**
- IndexedDB (for web)
  - Use `localforage` library (simplifies IndexedDB)
- OR SQLite (for React Native)
  - Use `expo-sqlite` or `react-native-sqlite-storage`

### **Styling:**
- Tailwind CSS (you already use this)
- Shadcn components (you can reuse from main app)

### **Date Handling:**
- Day.js (lightweight)

### **UUID Generation:**
- `uuid` package

---

## 📦 SUGGESTED FILE STRUCTURE

```
/tablet-app
  /src
    /components
      /onboarding
        - WelcomeScreen.tsx
        - BasicInfoForm.tsx
        - ContactForm.tsx
        - JobPreferencesForm.tsx
      /habits
        - HabitList.tsx
        - HabitCheckIn.tsx
        - HabitDetail.tsx
        - CreateHabitForm.tsx
      /goals
        - GoalsList.tsx
        - CreateGoalForm.tsx
        - GoalDetail.tsx
      /resume
        - ResumeBuilder.tsx
        - WorkHistoryForm.tsx
        - EducationForm.tsx
        - SkillsForm.tsx
        - ResumePreview.tsx
      /certifications
        - CertificationsList.tsx
        - AddCertificationForm.tsx
      /checkin
        - DailyCheckIn.tsx
      /dashboard
        - Home.tsx
        - Countdown.tsx
        - ProgressStats.tsx
      /admin
        - AdminPanel.tsx
        - DataExport.tsx
      /sync
        - AutoSync.tsx
        - ManualExport.tsx
    /lib
      - db.ts (IndexedDB setup)
      - sync.ts (sync logic)
      - utils.ts (helper functions)
    /App.tsx
    /index.tsx
```

---

## 🎨 DESIGN GUIDELINES

### **Colors:**
- Primary: Lime Green (#A8F32C)
- Background: Black (#000000)
- Cards: Dark Gray (#1A1A1A)
- Text: White (#FFFFFF)
- Secondary text: Gray (#9CA3AF)

### **Typography:**
- Use default Tailwind typography
- Don't override font sizes unless necessary

### **UI Principles:**
- **Simple:** Users may have low tech literacy
- **Clear:** Large text, obvious buttons
- **Encouraging:** Positive reinforcement, celebrate wins
- **Progress-focused:** Show streaks, completion rates, badges

---

## ✅ ACCEPTANCE CRITERIA

Your app is complete when:

1. ✅ All 10 features are built and functional
2. ✅ Works 100% offline
3. ✅ Data saves to IndexedDB/SQLite
4. ✅ Export function generates valid JSON
5. ✅ Release code generates 7 days before release date
6. ✅ Admin panel can export all data
7. ✅ UI is intuitive and easy to navigate
8. ✅ Habit streaks calculate correctly
9. ✅ Resume preview looks professional
10. ✅ Daily check-in only shows once per day

---

## 🚀 TESTING CHECKLIST

Before handing off to prison pilot:

- [ ] Create test user
- [ ] Build complete resume
- [ ] Track habits for 7 days (test streak calculation)
- [ ] Set 30/60/90 day goals
- [ ] Complete 7 daily check-ins
- [ ] Add 2-3 certifications
- [ ] Export data (verify JSON is valid)
- [ ] Generate release code
- [ ] Test admin panel
- [ ] Verify all data persists after closing app

---

## 💡 HELPFUL HINTS

### **IndexedDB Setup (Web):**

```javascript
// db.ts
import localforage from 'localforage';

const db = {
  users: localforage.createInstance({ name: 'fairpath-prerelease', storeName: 'users' }),
  habits: localforage.createInstance({ name: 'fairpath-prerelease', storeName: 'habits' }),
  goals: localforage.createInstance({ name: 'fairpath-prerelease', storeName: 'goals' }),
  resumes: localforage.createInstance({ name: 'fairpath-prerelease', storeName: 'resumes' }),
  certifications: localforage.createInstance({ name: 'fairpath-prerelease', storeName: 'certifications' }),
  checkins: localforage.createInstance({ name: 'fairpath-prerelease', storeName: 'checkins' })
};

export default db;
```

### **Save User Example:**

```javascript
import db from './lib/db';
import { v4 as uuidv4 } from 'uuid';

const saveUser = async (userData) => {
  const user = {
    id: uuidv4(),
    ...userData,
    synced: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  await db.users.setItem(user.id, user);
  return user;
};
```

### **Calculate Streak Example:**

```javascript
const calculateStreak = (checkIns) => {
  if (checkIns.length === 0) return 0;
  
  // Sort by date descending
  const sorted = [...checkIns].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );
  
  let streak = 0;
  for (const checkIn of sorted) {
    if (checkIn.completed) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
};
```

---

## 🎯 DELIVERABLES

When you're done, provide:

1. ✅ Source code (GitHub repo or ZIP)
2. ✅ Build instructions (README)
3. ✅ APK file (if React Native) or build folder (if web)
4. ✅ Test data export (sample JSON file)
5. ✅ Demo video (3-5 minutes showing all features)

---

## 📞 QUESTIONS?

If you need clarification on:
- Data structures → see above
- API endpoints → see above
- Design → use FairPath colors (lime green + black)
- Features → build all 10 listed above
- Sync strategy → 3 options (auto, manual, release code)

**Just start building!** The backend is ready and waiting for your data.

---

## 🔥 YOU GOT THIS

Build the UI. Make it simple. Make it work offline. Save data locally. Export to JSON. That's it.

**The backend will handle the rest.** 🚀

---

## 📋 QUICK START

1. Set up React project
2. Install: `localforage`, `uuid`, `dayjs`, `tailwindcss`
3. Create database setup (`db.ts`)
4. Build onboarding first
5. Then habit tracker
6. Then other features
7. Export function last

**Start simple. Build feature by feature. Test as you go.**

Good luck! 💪
