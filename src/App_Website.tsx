import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { UserProvider, useUser } from './contexts/UserContext';
import PhoneSignIn from './components/auth/PhoneSignIn';
import UserOnboarding from './components/auth/UserOnboarding';
import Homepage from './components/website/Homepage';
import AboutPage from './components/website/AboutPage';
import BlogPage from './components/website/BlogPage';
import ContactPage from './components/website/ContactPage';
import ForwardPage from './components/website/ForwardPage';
import FriendAFelonPage from './components/website/FriendAFelonPage';
import StaffingPage from './components/website/StaffingPage';
import EmployerListingsPage from './components/website/EmployerListingsPage';
import SimulationsPage from './components/website/SimulationsPage';
import LegalPage from './components/website/LegalPage';
import PoliceThePolicePage from './components/website/PoliceThePolicePage';
import DonatePage from './components/website/DonatePage';
import InitialLanding from './components/InitialLanding';
import FelonDashboard from './components/dashboards/FelonDashboard';
import EmployerDashboard from './components/dashboards/EmployerDashboard';
import PropertyOwnerDashboard from './components/dashboards/PropertyOwnerDashboard';
import ResourcePartnerDashboard from './components/dashboards/ResourcePartnerDashboard';
import DonorDashboard from './components/dashboards/DonorDashboard';
import CustomerDashboard from './components/dashboards/CustomerDashboard';
import ProviderDashboard from './components/dashboards/ProviderDashboard';
import StaffingDashboard from './components/dashboards/StaffingDashboard';
import PostItemForm from './components/marketplace/PostItemForm';
import PropertyPostingFormComplete from './components/property/PropertyPostingFormComplete';
import UserProfile from './components/profiles/UserProfile';
import NotificationsCenter from './components/notifications/NotificationsCenter';
import MessagingCenter from './components/messaging/MessagingCenter';
import Settings from './components/settings/Settings';
import TaxReceipts from './components/donor/TaxReceipts';
import PlanComparisonComplete from './components/subscription/PlanComparisonComplete';
import SubscriptionUpgradeWithStripe from './components/subscription/SubscriptionUpgradeWithStripe';
import GigMarketplace from './components/gigs/GigMarketplace';
import GigDetail from './components/gigs/GigDetail';
import GigBooking from './components/gigs/GigBooking';
import SEO, { SEOConfigs } from './components/website/SEO';

type UserType = 'user' | 'employer' | 'property' | 'resource' | 'donor' | 'customer' | 'provider' | 'staffing' | null;
type PageType = 
  // Public website pages
  | 'home'
  | 'about'
  | 'blog'
  | 'services'
  | 'service-friend-a-felon'
  | 'service-forward'
  | 'service-staffing'
  | 'service-simulations'
  | 'service-legal'
  | 'service-employers'
  | 'service-properties'
  | 'simulations'
  | 'legal'
  | 'contact'
  | 'privacy'
  | 'terms'
  | 'donate'
  // Auth pages
  | 'signup'
  | 'login'
  | 'phone-signin'
  | 'select-user-type'
  | 'onboarding'
  // App pages (authenticated)
  | 'dashboard'
  | 'post-item'
  | 'post-property'
  | 'profile'
  | 'notifications'
  | 'messages'
  | 'settings'
  | 'tax-receipts'
  | 'subscription-compare'
  | 'subscription-upgrade'
  | 'gig-marketplace'
  | 'gig-detail'
  | 'gig-booking';

function AppContent() {
  const { user, loading: authLoading } = useAuth();
  const { currentUser, setCurrentUser } = useUser();
  const [userType, setUserType] = useState<UserType>(null);
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedGig, setSelectedGig] = useState<any | null>(null);
  const [selectedTier, setSelectedTier] = useState<'plus' | 'pro'>('plus');

  // Check URL for page routing (simple client-side routing)
  useEffect(() => {
    const path = window.location.pathname;
    const hash = window.location.hash.replace('#', '');
    
    if (hash) {
      setCurrentPage(hash as PageType);
    } else if (path === '/' || path === '/home') {
      setCurrentPage('home');
    } else if (path === '/about') {
      setCurrentPage('about');
    } else if (path === '/blog') {
      setCurrentPage('blog');
    } else if (path === '/contact') {
      setCurrentPage('contact');
    }
  }, []);

  // Update URL when page changes
  const handleNavigate = (page: PageType) => {
    console.log('🚀 Navigating to:', page);
    setCurrentPage(page);
    window.history.pushState({}, '', `#${page}`);
    window.scrollTo(0, 0);
  };

  // Check auth state
  useEffect(() => {
    if (user && !authLoading) {
      const metadata = user.user_metadata;
      
      if (metadata?.onboardingComplete) {
        setUserType(metadata.userType);
        setCurrentUser({
          id: user.id,
          phone: user.phone,
          ...metadata,
        });
        
        // If user is authenticated and tries to access public pages, stay on public pages
        // If user navigates to 'login' or 'signup', redirect to dashboard
        if (currentPage === 'login' || currentPage === 'signup') {
          setCurrentPage('dashboard');
        }
      } else {
        // User authenticated but not onboarded
        if (currentPage !== 'select-user-type' && currentPage !== 'onboarding') {
          setCurrentPage('select-user-type');
        }
      }
    }
  }, [user, authLoading, currentPage, setCurrentUser]);

  // Show loading while checking auth
  if (authLoading && (currentPage === 'login' || currentPage === 'signup' || currentPage === 'dashboard')) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#A8F32C] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60">Loading...</p>
        </div>
      </div>
    );
  }

  // Get current SEO config
  const getSEOConfig = () => {
    switch (currentPage) {
      case 'about':
        return SEOConfigs.about;
      case 'blog':
        return SEOConfigs.blog;
      case 'contact':
        return SEOConfigs.contact;
      case 'service-employers':
        return SEOConfigs.employers;
      case 'service-properties':
        return SEOConfigs.properties;
      case 'services':
      case 'service-friend-a-felon':
        return SEOConfigs.services;
      default:
        return SEOConfigs.home;
    }
  };

  console.log('📍 Current Page:', currentPage);

  // PUBLIC WEBSITE PAGES
  if (currentPage === 'home') {
    return (
      <>
        <SEO {...getSEOConfig()} />
        <Homepage onNavigate={handleNavigate} />
      </>
    );
  }

  if (currentPage === 'about') {
    return (
      <>
        <SEO {...getSEOConfig()} />
        <AboutPage onNavigate={handleNavigate} />
      </>
    );
  }

  if (currentPage === 'blog') {
    return (
      <>
        <SEO {...getSEOConfig()} />
        <BlogPage onNavigate={handleNavigate} />
      </>
    );
  }

  if (currentPage === 'contact') {
    return (
      <>
        <SEO {...getSEOConfig()} />
        <ContactPage onNavigate={handleNavigate} />
      </>
    );
  }

  if (currentPage === 'donate') {
    return (
      <>
        <SEO {...getSEOConfig()} />
        <DonatePage onNavigate={handleNavigate} />
      </>
    );
  }

  if (currentPage === 'service-forward') {
    return (
      <>
        <SEO {...getSEOConfig()} />
        <ForwardPage onNavigate={handleNavigate} />
      </>
    );
  }

  if (currentPage === 'service-friend-a-felon') {
    return (
      <>
        <SEO {...getSEOConfig()} />
        <FriendAFelonPage onNavigate={handleNavigate} />
      </>
    );
  }

  if (currentPage === 'service-staffing') {
    return (
      <>
        <SEO {...getSEOConfig()} />
        <StaffingPage onNavigate={handleNavigate} />
      </>
    );
  }

  if (currentPage === 'service-simulations') {
    return (
      <>
        <SEO {...getSEOConfig()} />
        <SimulationsPage onNavigate={handleNavigate} />
      </>
    );
  }

  if (currentPage === 'service-legal') {
    return (
      <>
        <SEO {...getSEOConfig()} />
        <LegalPage onNavigate={handleNavigate} />
      </>
    );
  }

  if (currentPage === 'service-employers') {
    return (
      <>
        <SEO {...getSEOConfig()} />
        <StaffingPage onNavigate={handleNavigate} />
      </>
    );
  }

  if (currentPage === 'simulations') {
    return (
      <>
        <SEO {...getSEOConfig()} />
        <SimulationsPage onNavigate={handleNavigate} />
      </>
    );
  }

  if (currentPage === 'legal') {
    return (
      <>
        <SEO {...getSEOConfig()} />
        <LegalPage onNavigate={handleNavigate} />
      </>
    );
  }

  if (currentPage === 'architecture') {
    return (
      <>
        <SEO {...getSEOConfig()} />
        <SystemArchitecturePage onNavigate={handleNavigate} />
      </>
    );
  }

  if (currentPage === 'crm-hub') {
    return (
      <>
        <SEO title="CRM Portals - FairPath Industries" description="Access employer, property owner, staffing, and resource partner portals" />
        <CRMHub onNavigate={handleNavigate} />
      </>
    );
  }

  if (currentPage === 'platform-value') {
    return (
      <>
        <SEO title="Platform Value - FairPath Industries" description="Discover the unique value of the FairPath platform" />
        <PlatformValuePage onNavigate={handleNavigate} />
      </>
    );
  }

  // AUTH FLOW
  if (currentPage === 'signup' || currentPage === 'login' || currentPage === 'phone-signin') {
    return (
      <>
        <SEO title="Sign In - FairPath Industries" description="Sign in to your FairPath account" />
        <PhoneSignIn
          onSuccess={(authUser) => {
            console.log('✅ Phone auth success:', authUser.id);
            handleNavigate('select-user-type');
          }}
          onBack={() => handleNavigate('home')}
        />
      </>
    );
  }

  if (currentPage === 'select-user-type') {
    return (
      <>
        <SEO title="Choose Your Path - FairPath Industries" description="Select your user type to get started" />
        <InitialLanding
          onSelectUserType={(type) => {
            setUserType(type);
            handleNavigate('onboarding');
          }}
        />
      </>
    );
  }

  if (currentPage === 'onboarding') {
    return (
      <>
        <SEO title="Complete Your Profile - FairPath Industries" description="Tell us more about yourself" />
        <UserOnboarding
          userType={userType!}
          onComplete={(userData) => {
            console.log('✅ Onboarding complete:', userData);
            setCurrentUser({
              id: user?.id,
              phone: user?.phone,
              ...userData,
            });
            handleNavigate('dashboard');
          }}
          onBack={() => handleNavigate('select-user-type')}
        />
      </>
    );
  }

  // AUTHENTICATED APP PAGES
  if (currentPage === 'dashboard') {
    switch (userType) {
      case 'user':
        return <FelonDashboard userData={currentUser} onNavigate={handleNavigate} />;
      case 'employer':
        return <EmployerDashboard userData={currentUser} onNavigate={handleNavigate} />;
      case 'property':
        return <PropertyOwnerDashboard userData={currentUser} onNavigate={handleNavigate} />;
      case 'resource':
        return <ResourcePartnerDashboard userData={currentUser} onNavigate={handleNavigate} />;
      case 'donor':
        return <DonorDashboard userData={currentUser} onNavigate={handleNavigate} />;
      case 'customer':
        return <CustomerDashboard userData={currentUser} onNavigate={handleNavigate} />;
      case 'provider':
        return <ProviderDashboard userData={currentUser} onNavigate={handleNavigate} />;
      case 'staffing':
        return <StaffingDashboard userData={currentUser} onNavigate={handleNavigate} />;
      default:
        return <PhoneSignIn onSuccess={() => handleNavigate('select-user-type')} />;
    }
  }

  if (currentPage === 'post-item') {
    return <PostItemForm onBack={() => handleNavigate('dashboard')} />;
  }

  if (currentPage === 'post-property') {
    return (
      <PropertyPostingFormComplete
        packageType={(currentUser as any)?.packageType}
        onBack={() => handleNavigate('dashboard')}
        onComplete={() => handleNavigate('dashboard')}
      />
    );
  }

  if (currentPage === 'post-job') {
    return (
      <JobPostingForm
        packageType={(currentUser as any)?.packageType || 'starter'}
        currentJobs={3} // Mock value
        onComplete={() => handleNavigate('dashboard')}
        onCancel={() => handleNavigate('dashboard')}
      />
    );
  }

  if (currentPage === 'profile') {
    return <UserProfile onBack={() => handleNavigate('dashboard')} />;
  }

  if (currentPage === 'notifications') {
    return <NotificationsCenter onBack={() => handleNavigate('dashboard')} />;
  }

  if (currentPage === 'messages') {
    return <MessagingCenter onBack={() => handleNavigate('dashboard')} />;
  }

  if (currentPage === 'settings') {
    return <Settings onBack={() => handleNavigate('dashboard')} />;
  }

  if (currentPage === 'tax-receipts') {
    return <TaxReceipts onBack={() => handleNavigate('dashboard')} />;
  }

  if (currentPage === 'subscription-compare') {
    const userPlan = (currentUser as any)?.hasFairPathPlus ? (currentUser as any)?.hasFairPathPro ? 'pro' : 'plus' : 'free';
    return (
      <PlanComparisonComplete
        currentPlan={userPlan}
        onUpgrade={(tier) => {
          setSelectedTier(tier);
          handleNavigate('subscription-upgrade');
        }}
        onClose={() => handleNavigate('dashboard')}
      />
    );
  }

  if (currentPage === 'subscription-upgrade') {
    return (
      <SubscriptionUpgradeWithStripe
        userId={user?.id || 'demo-user'}
        tier={selectedTier}
        onComplete={() => {
          // Update user subscription status
          setCurrentUser({ 
            ...currentUser, 
            hasFairPathPlus: selectedTier === 'plus' || selectedTier === 'pro',
            hasFairPathPro: selectedTier === 'pro',
          });
          handleNavigate('dashboard');
        }}
        onBack={() => handleNavigate('subscription-compare')}
      />
    );
  }

  if (currentPage === 'gig-marketplace') {
    return (
      <GigMarketplace
        onSelectGig={(gig: any) => {
          setSelectedGig(gig);
          handleNavigate('gig-detail');
        }}
        onBack={() => handleNavigate('dashboard')}
      />
    );
  }

  if (currentPage === 'gig-detail' && selectedGig) {
    return (
      <GigDetail
        gig={selectedGig}
        onBook={() => handleNavigate('gig-booking')}
        onMessage={() => handleNavigate('messages')}
        onBack={() => handleNavigate('gig-marketplace')}
      />
    );
  }

  if (currentPage === 'gig-booking' && selectedGig) {
    return (
      <GigBooking
        gig={selectedGig}
        onComplete={() => handleNavigate('dashboard')}
        onBack={() => handleNavigate('gig-detail')}
      />
    );
  }

  // Default: Homepage
  return (
    <>
      <SEO {...SEOConfigs.home} />
      <Homepage onNavigate={handleNavigate} />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </AuthProvider>
  );
}