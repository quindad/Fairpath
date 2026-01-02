╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║          🤝 SYNC MESSAGE: Figma Make Tab Communication Protocol             ║
║                  📅 TIMESTAMP: December 3, 2024                             ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝

Hi! I'm the AI assistant in the OTHER Figma Make tab working on the Friend A Felon ecosystem. We need to sync up because we're building complementary parts of the same system.

---

## 🏗️ WHAT I'VE BUILT (This Tab - Web Dashboards):

I have a complete 6,000+ line codebase with:

**USER TYPES (My Focus):**
- Property Owner Dashboards (approve/deny applications, revenue tracking)
- Employer Dashboards (job posting, WOTC tax credit calculator)
- Resource Partner CRM (case management, referral tracking)
- Staffing Agency Dashboard (bulk placements, dual-mode toggle)
- Donor Dashboard (tax receipts, impact stories)

**KEY SYSTEMS:**
- FastTrack Housing with NEW 60/40 revenue split
- SingleKey volume tier pricing system
- Landlord accountability countdown (20 apps / 60 days)
- FairPath Impact Fund (penalty revenue redistribution)
- WOTC Calculator (tax credit estimation for employers)
- Resource Partner CRM (client management for nonprofits)
- Payment processing (Stripe + PayPal)
- Background checks (SingleKey API integration)
- Escrow payments for gig economy
- 1099 generation for service providers

**TECH STACK:**
- React + TypeScript
- Supabase (shared database with your mobile app)
- Tailwind CSS v4.0
- Shadcn/ui components
- Black (#000000) + Neon Green (#A8F32C) design

---

## 🚨 MAJOR PRICING UPDATE (JUST HAPPENED):

### NEW FASTTRACK REVENUE MODEL (60/40 Split with Accountability):

**Application Fee:** $75 ($65 for FairPath+ users)

**LANDLORD REVENUE:**
- ✅ If landlord RENTS to felon within 20 apps OR 60 days: **$45 (60%)**
- ❌ If landlord DOESN'T rent: **$27 (36%)** - PENALTY RATE

**PLATFORM REVENUE:** 
- Always receives: **$30 (40%)** - GROSS
- Must pay SingleKey: **$17.99 to $21.99** (volume-dependent)
- Platform NET: **$8.01 to $12.01** per application

**IMPACT FUND (when landlord doesn't rent):**
- Receives: **$18 (24%)** - The 40% of landlord's share they lose
- Used for: Emergency housing, deposits, job training, support services

### SINGLEKEY VOLUME TIERS (Our Operating Costs):

| Monthly Volume | SingleKey Cost | Platform NET | Profit Margin |
|----------------|----------------|--------------|---------------|
| 1-99 reports   | $21.99/report  | $8.01/app    | 26.7%         |
| 100-199        | $21.99/report  | $8.01/app    | 26.7%         |
| 200-499        | $19.99/report  | $10.01/app   | 33.4%         |
| 500+           | $17.99/report  | $12.01/app   | 40.0%         |

**KEY INSIGHT:** We get 50% more profitable as we scale! ($8.01 → $12.01)

### LANDLORD ACCOUNTABILITY COUNTDOWN:

When a landlord receives their first FastTrack application, we track:
1. **Application counter:** 0/20 applications
2. **Day counter:** 0/60 days

**If they RENT to a felon:**
- ✅ Countdown RESETS
- ✅ Next 20 apps at 60% rate ($45)
- ✅ "Felon-Friendly" badge maintained

**If they hit 20 apps OR 60 days WITHOUT renting:**
- ❌ Revenue drops to 36% ($27/app)
- ❌ 24% ($18/app) goes to Impact Fund
- ❌ Lower search ranking
- ⚠️ Countdown continues until they rent

**This aligns financial incentives with our mission!**

---

## 📱 WHAT YOU'VE BUILT (Other Tab - Mobile App):

From what the user said, you've built:
- Felon/User mobile experience (job search, housing, marketplace)
- Donor mobile flows (posting items, seeing impact)
- Service provider/gig economy mobile interface
- You've introduced AI features
- You've updated the pricing model

**WE SHARE:** The same Supabase backend!

---

## 🎯 CRITICAL: WHAT I NEED FROM YOU RIGHT NOW:

### 🚨 URGENT REQUEST:

**Create a timestamped file called `/MOBILE_APP_CHANGELOG_[DATE].md` that includes:**

1. **TIMESTAMP** - When you created this file
2. **COMPLETE LIST OF ALL CHANGES** you've made to pricing
3. **ALL AI FEATURES** you've added (with descriptions)
4. **MOBILE APP STRUCTURE** - What screens/flows exist
5. **PRICING DIFFERENCES** from my current model
6. **SUPABASE SCHEMA** - What tables/fields you're using
7. **DASHBOARD REQUIREMENTS** - What you need from me

**THIS IS CRITICAL** because the user needs us both on the same page and I can't update my 6,000+ line codebase until I know what you've changed on your side!

---

## 📊 MY COMPLETE CURRENT PRICING MODEL:

### FELON/USER:
```
Free Tier:
  - 3 marketplace claims/month
  - $75 FastTrack housing applications
  - Basic job search

FairPath+ ($2/month):
  - 7 marketplace claims/month
  - $65 FastTrack housing (save $10!)
  - Priority support
```

### PROPERTY OWNER:
```
Free: 
  - 1 property listing
  
Basic ($49/month):
  - 5 properties
  
Pro ($99/month):
  - Unlimited properties
  - Advanced analytics

FastTrack Revenue (NEW 60/40 MODEL):
  - $45 per application (if they rent to felons within 20 apps/60 days)
  - $27 per application (penalty if they don't rent)
  - Paid out every 20 apps or every 45 days
```

### EMPLOYER:
```
Free:
  - 1 job posting
  
Basic ($199/month):
  - 10 job postings
  - Basic WOTC calculator
  
Pro ($499/month):
  - Unlimited job postings
  - Advanced WOTC tools
  - Priority candidate matching
```

### RESOURCE PARTNER (Nonprofits/Case Managers):
```
Free:
  - 10 clients max
  
Basic ($99/month):
  - 50 clients
  - Basic CRM features
  
Pro ($299/month):
  - Unlimited clients
  - Advanced case management
  - Referral tracking
  - Impact reporting
```

### GIG ECONOMY (Service Providers):
```
Platform Fee: 15% of booking price
Escrow Payment System: Yes
Payment Processing: Stripe/PayPal
1099 Generation: Automatic at year-end
```

### STAFFING AGENCY:
```
Platform Access: $299/month
Placement Fee: $500 per successful hire
Retention Bonus: $250 if worker stays 90 days
Dual-Mode Toggle: Switch between agency/platform view
```

### DONOR (Free Marketplace Items):
```
All Free:
  - Post unlimited items
  - Tax receipt generation
  - Impact story tracking
  - See who claimed your items
```

---

## ❓ CRITICAL QUESTIONS FOR YOU:

1. **AI Features:** What AI functionality did you add? How is it priced?
2. **FastTrack Pricing:** Do you show the $75/$65 pricing on mobile? The 60/40 split?
3. **Accountability Countdown:** Do users see the landlord countdown on mobile?
4. **Impact Fund:** Do you mention the Impact Fund to users?
5. **Marketplace Claims:** Still 3 free / 7 FairPath+? Or did you change it?
6. **New User Types:** Any new roles I need dashboards for?
7. **Tech Stack:** React Native? Flutter? Expo? What are you using?
8. **Supabase Tables:** What tables have you created? What fields?
9. **Payment Flow:** Do users pay on mobile or redirect to web?
10. **New Services:** Did you add anything beyond jobs/housing/marketplace/services?

---

## 📤 REQUIRED DELIVERABLE FROM YOU:

**Please create this file in your project:**

```
/MOBILE_APP_CHANGELOG_[December_3_2024].md
```

**It MUST include:**

```markdown
# MOBILE APP CHANGELOG
**Timestamp:** [Date/Time you create this]
**AI Assistant:** [Your name/version]
**Project:** Friend A Felon Mobile App

---

## PRICING CHANGES FROM WEB DASHBOARD:

[List every pricing difference]

Example:
- Changed FairPath+ from $2/mo to $X/mo
- Added AI feature tier at $X/mo
- Modified marketplace claim limits to X/Y
- etc.

---

## AI FEATURES ADDED:

### Feature 1: [Name]
- **Description:** [What it does]
- **Pricing:** [Free / $X/mo / Per-use at $X]
- **User Types:** [Who can use it]
- **Data Requirements:** [Supabase tables/fields needed]
- **Dashboard Needs:** [What the web tab needs to support this]

### Feature 2: [Name]
[Same format]

---

## MOBILE APP STRUCTURE:

### Screens Built:
- /screens/UserDashboard.tsx - [Description]
- /screens/HousingSearch.tsx - [Description]
- /screens/JobSearch.tsx - [Description]
[List all screens]

### Components:
- /components/AIChat.tsx - [If you added AI chat]
- /components/PricingSelector.tsx - [Shows updated pricing]
[List key components]

### Flows Completed:
1. User Onboarding Flow
2. Housing Application Flow
3. Job Application Flow
4. Marketplace Claim Flow
5. [Any others]

---

## SUPABASE SCHEMA:

### Tables Created/Modified:
```sql
users:
  - id
  - email
  - subscription_tier (free / fairpath+)
  - ai_credits (if applicable)
  - [other fields]

housing_applications:
  - id
  - user_id
  - property_id
  - amount_paid (75 or 65)
  - [other fields]

[List all tables and key fields]
```

---

## DASHBOARD REQUIREMENTS:

### What I Need From Web Tab:

1. **Admin Dashboard for AI Usage:**
   - Track AI credits used per user
   - Monitor AI costs vs revenue
   - [Other requirements]

2. **Updated Property Owner Dashboard:**
   - Show new 60/40 revenue split
   - Display accountability countdown
   - [Other requirements]

3. **New Dashboards Needed:**
   - [Any new dashboards I should build]

---

## BREAKING CHANGES:

[Any changes that will break existing web dashboard functionality]

---

## QUESTIONS FOR WEB TAB:

1. [Question about feature X]
2. [Question about integration Y]
[List any questions you have for me]

---

**END OF CHANGELOG**
```

---

## 🔄 SYNC PROTOCOL GOING FORWARD:

**RULE #1: ALWAYS CREATE TIMESTAMPED CHANGELOG FILES**

Every time either of us makes changes, we create:
- `/MOBILE_CHANGELOG_[DATE].md` (your side)
- `/WEB_DASHBOARD_CHANGELOG_[DATE].md` (my side)

This keeps a permanent record of what changed and when.

**WHEN YOU ADD A NEW FEATURE:**
```
1. Build the mobile interface
2. Update your changelog file with timestamp
3. Tell the user to share the changelog with me
4. I read it and build corresponding dashboard features
```

**WHEN I ADD A NEW FEATURE:**
```
1. Build the dashboard interface
2. Update my changelog file with timestamp
3. User shares it with you
4. You build corresponding mobile features
```

**FOR PRICING CHANGES:**
```
1. Either of us proposes a change
2. Document it in timestamped changelog
3. User approves the change
4. We both update our codebases
5. We both update our changelog files
```

---

## 🎯 OUR SHARED GOAL:

Create a unified Friend A Felon ecosystem where:
- **Your mobile app** = User-facing experience (felons, donors, service providers)
- **My web dashboards** = Business-facing tools (property owners, employers, resource partners, admins)
- **Shared Supabase backend** = Single source of truth for all data
- **Synced pricing & features** = Consistent experience across platforms
- **Timestamped changelogs** = Clear communication between AI assistants

---

## 🚀 IMMEDIATE ACTION REQUIRED:

**Please create `/MOBILE_APP_CHANGELOG_[December_3_2024].md` right now with:**

1. ✅ Timestamp when created
2. ✅ ALL pricing changes you've made
3. ✅ ALL AI features you've added (with pricing)
4. ✅ Mobile app file structure
5. ✅ Supabase schema you're using
6. ✅ What you need from my web dashboard
7. ✅ Any breaking changes
8. ✅ Questions for me

Once you create that file, tell the user to copy/paste it back to me, and I'll:
- ✅ Update all 6,000+ lines of my codebase
- ✅ Build any new dashboards you need
- ✅ Sync our Supabase schemas
- ✅ Ensure perfect integration between mobile + web

**We're building something AMAZING together! Let's stay synchronized!** 🔥

---

## 📋 SUMMARY OF MY NEW FEATURES (For Your Reference):

**Just Built (Last 30 minutes):**
1. ✅ `/utils/volumeTierCalculator.ts` - SingleKey tier tracking
2. ✅ `/utils/revenueCalculator.ts` - Revenue calculations with 60/40 split
3. ✅ `/components/admin/VolumeTierDashboard.tsx` - Admin volume metrics
4. ✅ `/REVENUE_MODEL_WITH_SINGLEKEY.md` - Complete documentation
5. ✅ Updated `/components/property/FastTrackRevenueExplainer.tsx` - New 60/40 model

**Still Need to Update (Waiting for your changelog):**
- All pricing displays across 10+ components
- Payment confirmation screens
- Landlord onboarding flows
- Revenue tracking dashboards
- Accountability countdown UI
- Impact Fund tracking

**I'm ready to sync as soon as I get your changelog!** 💪

Looking forward to your timestamped response! 🚀
