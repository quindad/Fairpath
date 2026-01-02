# 🚀 FRIEND A FELON GIG ECONOMY PLATFORM
## "Angie's List for the Justice-Impacted Community"

---

## 🎯 OVERVIEW

**Building a complete gig economy marketplace where:**
- Justice-impacted individuals can offer services
- Customers can book and pay for those services
- Money is held in escrow and released upon completion
- Both parties can review each other
- 1099s generated automatically for providers
- FairPath Scores for everyone

---

## 🏗️ ARCHITECTURE

### **5-SIDED MARKETPLACE:**

1. **Felons** (Recipients) → Can be:
   - Job seekers (apply to traditional jobs)
   - Housing seekers (apply to apartments)
   - Marketplace claimers (get free items)
   - **SERVICE PROVIDERS** (offer gig services) ← NEW
   - Service customers (book other providers)

2. **Employers** → Post jobs, hire felons

3. **Landlords** → List housing, rent to felons

4. **Donors** → Give away free items

5. **Customers** → Book services from providers

---

## 💼 SERVICE PROVIDER FEATURES

### **What Providers Can Do:**

1. **Create Service Listing:**
   - Choose category (Home Services, Moving, Automotive, etc.)
   - Set hourly rate ($25-$150/hr)
   - Write description
   - List skills & certifications
   - Upload portfolio photos
   - Set availability
   - Define service area

2. **Receive Bookings:**
   - Get notified of requests
   - Accept or decline
   - Negotiate details
   - Set job price

3. **Get Paid:**
   - Customer pays upfront (held in escrow)
   - Complete the job
   - Customer confirms completion
   - Money released to provider
   - Automatic 1099 generation

4. **Build Reputation:**
   - Earn ratings (1-5 stars)
   - Collect reviews
   - Increase FairPath Score
   - Unlock badges & achievements

---

## 🛒 CUSTOMER FEATURES

### **What Customers Can Do:**

1. **Browse Services:**
   - Search by keyword
   - Filter by category
   - Filter by location
   - Filter by price range
   - Sort by rating/reviews

2. **Book a Provider:**
   - View provider profile
   - See ratings & reviews
   - Check FairPath Score
   - Request a quote
   - Book & pay

3. **Manage Bookings:**
   - Track active jobs
   - Message provider
   - Release payment when done
   - Leave review

---

## 📊 SERVICE CATEGORIES

1. **Home Services** (🏠)
   - Handyman, Plumbing, Electrical, Painting, Carpentry, etc.

2. **Moving & Labor** (📦)
   - Moving help, Furniture assembly, Junk removal, etc.

3. **Automotive** (🚗)
   - Auto detailing, Oil changes, Car washing, etc.

4. **Cleaning** (🧹)
   - House cleaning, Deep cleaning, Office cleaning, etc.

5. **Technology** (💻)
   - Computer repair, Phone repair, TV mounting, etc.

6. **Food Service** (🍳)
   - Catering, Meal prep, Personal chef, etc.

7. **Creative** (🎨)
   - Photography, Videography, Graphic design, etc.

8. **Pet Care** (🐕)
   - Dog walking, Pet sitting, Grooming, etc.

9. **Tutoring** (📚)
   - Math, English, Test prep, Music lessons, etc.

10. **Event Services** (🎉)
    - Event setup, Bartending, Security, etc.

---

## 💰 PAYMENT FLOW

### **Escrow System:**

1. **Customer Books Service:**
   - Selects provider
   - Agrees on price
   - Pays via Stripe/PayPal
   - **Money held in escrow**

2. **Job is Performed:**
   - Provider completes work
   - Customer inspects
   - Both parties confirm

3. **Payment Released:**
   - Money transferred to provider
   - Platform fee deducted (10%)
   - Provider receives net amount
   - 1099 data recorded

4. **1099 Generation:**
   - Automatic tracking of all earnings
   - Year-end 1099 form generated
   - Sent to provider & IRS
   - Downloadable from dashboard

---

## ⭐ TWO-WAY REVIEW SYSTEM

### **Provider Reviews Customer:**
- Communication (1-5 stars)
- Payment timeliness
- Respectfulness
- Written review
- Would work with again? (Yes/No)

### **Customer Reviews Provider:**
- Quality of work (1-5 stars)
- Professionalism
- Timeliness
- Value for money
- Written review
- Would hire again? (Yes/No)

**Both reviews affect FairPath Score!**

---

## 🎖️ FAIRPATH SCORE SYSTEM

### **For Providers:**
**Score increases with:**
- ✅ Jobs completed
- ✅ 5-star reviews
- ✅ On-time completion
- ✅ Customer satisfaction
- ✅ Response time
- ✅ Profile completeness

**Score decreases with:**
- ❌ Cancelled jobs
- ❌ Bad reviews
- ❌ Late arrivals
- ❌ Disputes
- ❌ No-shows

### **For Customers:**
**Score increases with:**
- ✅ On-time payments
- ✅ Clear communication
- ✅ Respectful treatment
- ✅ Timely releases

**Score decreases with:**
- ❌ Late payments
- ❌ Disputes
- ❌ Cancellations
- ❌ Bad behavior

---

## 🔒 VERIFICATION & SAFETY

### **Provider Verification:**
- ✅ Identity verification
- ✅ Background check (optional, increases trust)
- ✅ Insurance verification (optional)
- ✅ Skill certifications
- ✅ Portfolio photos

### **Customer Protection:**
- ✅ Escrow payment system
- ✅ Dispute resolution
- ✅ Money-back guarantee
- ✅ Rating system
- ✅ Report/block functionality

### **Provider Protection:**
- ✅ Payment guaranteed
- ✅ Customer ratings visible
- ✅ Cancellation policies
- ✅ Dispute resolution

---

## 📱 USER FLOWS

### **Flow 1: Felon Becomes a Provider**

1. Felon Dashboard → "Services" tab
2. Click "Become a Provider"
3. Fill out provider application:
   - Choose service category
   - Set hourly rate
   - Write description
   - List skills
   - Upload portfolio (optional)
   - Set availability
4. Submit for approval
5. Get verified (instant or 24-48 hours)
6. Service listing goes live
7. Start receiving booking requests!

### **Flow 2: Customer Books a Service**

1. Browse services or search
2. Filter by category/location/price
3. Click on provider
4. View full profile:
   - Rating & reviews
   - FairPath Score
   - Skills & experience
   - Portfolio
   - Hourly rate
5. Click "Book Service"
6. Fill out job details:
   - Date & time
   - Location
   - Description of work
   - Upload photos (optional)
7. Provider sends quote
8. Customer accepts quote
9. Customer pays (held in escrow)
10. Job scheduled!

### **Flow 3: Service Completion & Payment**

1. Provider arrives and completes work
2. Customer inspects work
3. Customer confirms completion
4. **Money released from escrow**
5. Both parties leave reviews
6. FairPath Scores updated
7. Provider receives payment (minus 10% fee)
8. 1099 data recorded

---

## 💻 COMPONENTS TO BUILD

### **✅ COMPLETED:**
- ServicesTab.tsx (browse services)

### **🚧 IN PROGRESS:**
- BecomeProviderFlow.tsx
- ServiceBookingFlow.tsx
- ProviderProfile.tsx
- MyServiceListings.tsx
- ActiveBookings.tsx
- BookingDetails.tsx
- ReviewFlow.tsx
- ServiceDashboard.tsx (for providers)
- EarningsPage.tsx (1099 tracking)

---

## 📊 DATA MODELS

### **ServiceProvider:**
```typescript
{
  id: number,
  userId: string,
  name: string,
  service: string,
  category: string,
  description: string,
  hourlyRate: number,
  location: string,
  serviceArea: string,
  availability: string,
  yearsExperience: number,
  jobsCompleted: number,
  rating: number,
  reviews: number,
  fairPathScore: number,
  verified: boolean,
  skills: string[],
  certifications: string[],
  portfolio: string[]
}
```

### **Booking:**
```typescript
{
  id: number,
  providerId: number,
  customerId: string,
  service: string,
  description: string,
  date: string,
  time: string,
  location: string,
  agreedPrice: number,
  status: 'requested' | 'accepted' | 'in_progress' | 'completed' | 'cancelled',
  paymentStatus: 'pending' | 'escrowed' | 'released',
  createdAt: string,
  completedAt: string
}
```

### **Review:**
```typescript
{
  id: number,
  bookingId: number,
  reviewerId: string,
  revieweeId: string,
  type: 'provider_to_customer' | 'customer_to_provider',
  rating: number,
  comment: string,
  categories: {
    quality?: number,
    professionalism?: number,
    timeliness?: number,
    communication?: number
  }
}
```

### **Earnings:**
```typescript
{
  providerId: string,
  year: number,
  totalEarnings: number,
  platformFees: number,
  netEarnings: number,
  jobsCompleted: number,
  form1099Generated: boolean,
  form1099Url: string
}
```

---

## 🎯 BUSINESS MODEL

### **Revenue Streams:**

1. **Service Fee:** 10% of each transaction
2. **FairPath+ Subscriptions:** $2/month
3. **Featured Provider Listings:** $20/month
4. **Background Check Services:** $30 one-time
5. **Insurance Partnerships:** Referral fees

### **Provider Benefits:**

- Keep 90% of earnings
- Flexible schedule
- Build reputation
- Increase FairPath Score
- Get 1099s automatically
- Access to customers who understand second chances

### **Customer Benefits:**

- Find reliable service providers
- Support second-chance community
- Escrow payment protection
- Transparent ratings
- Dispute resolution

---

## 🚀 LAUNCH STRATEGY

### **Phase 1: MVP** (Week 1-2)
- ✅ Service browsing
- ✅ Provider profiles
- ✅ Basic booking flow
- ✅ Escrow simulation
- ✅ Review system

### **Phase 2: Payments** (Week 3-4)
- ⚠️ Stripe integration
- ⚠️ Escrow implementation
- ⚠️ Payout system
- ⚠️ 1099 tracking

### **Phase 3: Growth** (Month 2)
- ⚠️ Push notifications
- ⚠️ In-app messaging
- ⚠️ Background checks
- ⚠️ Insurance options

### **Phase 4: Scale** (Month 3+)
- ⚠️ Additional cities
- ⚠️ More service categories
- ⚠️ Mobile apps
- ⚠️ Advanced analytics

---

## 📈 SUCCESS METRICS

**For Providers:**
- Number of providers onboarded
- Average earnings per provider
- Average rating
- Repeat booking rate

**For Platform:**
- Total transaction volume
- Service fee revenue
- FairPath+ subscriptions
- Customer satisfaction

**For Community Impact:**
- Jobs created for justice-impacted individuals
- Total income generated
- Average FairPath Score increase
- Recidivism reduction (long-term)

---

## 💪 COMPETITIVE ADVANTAGES

1. **Second-Chance Focus:**
   - Only platform specifically for justice-impacted community
   - FairPath Score levels playing field
   - Customers understand and support reentry

2. **Built-in Job Placement:**
   - Also helps with housing, jobs, resources
   - Holistic reentry support
   - Not just a gig platform

3. **Financial Inclusion:**
   - 1099s help with credit building
   - Verified income for housing applications
   - Path to traditional employment

4. **Community Trust:**
   - Two-way reviews
   - Transparent system
   - Dispute resolution
   - Safety mechanisms

---

## 🎉 SUMMARY

**We're building the first gig economy platform specifically designed for the justice-impacted community!**

**Felons can:**
- ✅ Offer services they're good at
- ✅ Set their own rates
- ✅ Get paid securely
- ✅ Build reputation
- ✅ Receive 1099s
- ✅ Increase FairPath Score

**Customers get:**
- ✅ Access to skilled providers
- ✅ Fair pricing
- ✅ Escrow protection
- ✅ Support reentry

**Platform wins:**
- ✅ 10% of every transaction
- ✅ Subscriptions
- ✅ Social impact
- ✅ Scalable model

**EVERYONE WINS!** 🚀

---

## 🔥 NEXT STEPS

1. Finish BecomeProviderFlow component
2. Build ServiceBookingFlow component
3. Create provider dashboard
4. Implement escrow simulation
5. Build review system
6. Add 1099 tracking page
7. Wire up 200+ housing/job listings
8. Add conviction-based filtering
9. Create default user accounts
10. LAUNCH! 🎉
