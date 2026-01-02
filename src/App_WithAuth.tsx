import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { UserProvider, useUser } from './contexts/UserContext';
import PhoneSignIn from './components/auth/PhoneSignIn';
import UserOnboarding from './components/auth/UserOnboarding';
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
import PlanComparison from './components/subscription/PlanComparison';
import SubscriptionUpgrade from './components/subscription/SubscriptionUpgrade';
import GigMarketplace from './components/gigs/GigMarketplace';
import GigDetail from './components/gigs/GigDetail';
import GigBooking from './components/gigs/GigBooking';

type UserType = 'user' | 'employer' | 'property' | 'resource' | 'donor' | 'customer' | 'provider' | 'staffing' | null;
type AppScreen = 
  | 'phone-signin'
  | 'select-user-type'
  | 'onboarding'
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
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('phone-signin');
  const [selectedGig, setSelectedGig] = useState<any | null>(null);

  // Check if user has completed onboarding
  useEffect(() => {
    if (user && !authLoading) {
      const metadata = user.user_metadata;
      
      if (metadata?.onboardingComplete) {
        // User has completed onboarding
        setUserType(metadata.userType);
        setCurrentUser({
          id: user.id,
          phone: user.phone,
          ...metadata,
        });
        setCurrentScreen('dashboard');
      } else {
        // User is authenticated but needs to complete onboarding
        setCurrentScreen('select-user-type');
      }
    } else if (!user && !authLoading) {
      // Not authenticated - show phone signin
      setCurrentScreen('phone-signin');
      setUserType(null);
      setCurrentUser(null);
    }
  }, [user, authLoading, setCurrentUser]);

  // Show loading while checking auth state
  if (authLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#A8F32C] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60">Loading...</p>
        </div>
      </div>
    );
  }

  // Phone Sign In
  if (currentScreen === 'phone-signin') {
    return (
      <PhoneSignIn
        onSuccess={(authUser) => {
          console.log('✅ Phone auth success:', authUser.id);
          setCurrentScreen('select-user-type');
        }}
      />
    );
  }

  // User Type Selection
  if (currentScreen === 'select-user-type') {
    return (
      <InitialLanding
        onSelectUserType={(type) => {
          setUserType(type);
          setCurrentScreen('onboarding');
        }}
      />
    );
  }

  // Onboarding
  if (currentScreen === 'onboarding') {
    return (
      <UserOnboarding
        userType={userType!}
        onComplete={(userData) => {
          console.log('✅ Onboarding complete:', userData);
          setCurrentUser({
            id: user?.id,
            phone: user?.phone,
            ...userData,
          });
          setCurrentScreen('dashboard');
        }}
        onBack={() => setCurrentScreen('select-user-type')}
      />
    );
  }

  const handleNavigate = (screen: AppScreen) => {
    setCurrentScreen(screen);
  };

  // Dashboard (after onboarding complete)
  if (currentScreen === 'dashboard') {
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
        return <PhoneSignIn onSuccess={() => setCurrentScreen('select-user-type')} />;
    }
  }

  // Post Item Form
  if (currentScreen === 'post-item') {
    return <PostItemForm onBack={() => setCurrentScreen('dashboard')} />;
  }

  // Post Property Form
  if (currentScreen === 'post-property') {
    return (
      <PropertyPostingFormComplete 
        packageType={(currentUser as any)?.packageType}
        onBack={() => setCurrentScreen('dashboard')} 
        onComplete={(propertyData) => {
          console.log('Property posted:', propertyData);
          setCurrentScreen('dashboard');
        }}
      />
    );
  }

  // User Profile
  if (currentScreen === 'profile') {
    return <UserProfile onBack={() => setCurrentScreen('dashboard')} />;
  }

  // Notifications Center
  if (currentScreen === 'notifications') {
    return <NotificationsCenter onBack={() => setCurrentScreen('dashboard')} />;
  }

  // Messaging Center
  if (currentScreen === 'messages') {
    return <MessagingCenter onBack={() => setCurrentScreen('dashboard')} />;
  }

  // Settings
  if (currentScreen === 'settings') {
    return <Settings onBack={() => setCurrentScreen('dashboard')} />;
  }

  // Tax Receipts
  if (currentScreen === 'tax-receipts') {
    return <TaxReceipts onBack={() => setCurrentScreen('dashboard')} />;
  }

  // Subscription Compare
  if (currentScreen === 'subscription-compare') {
    const userPlan = (currentUser as any)?.hasFairPathPlus ? 'plus' : 'free';
    return (
      <PlanComparison
        currentPlan={userPlan}
        onUpgrade={() => setCurrentScreen('subscription-upgrade')}
        onClose={() => setCurrentScreen('dashboard')}
      />
    );
  }

  // Subscription Upgrade
  if (currentScreen === 'subscription-upgrade') {
    return (
      <SubscriptionUpgrade
        onComplete={() => {
          // Update user to have FairPathPlus
          setCurrentUser({ ...currentUser, hasFairPathPlus: true });
          setCurrentScreen('dashboard');
        }}
        onBack={() => setCurrentScreen('subscription-compare')}
      />
    );
  }

  // Gig Marketplace
  if (currentScreen === 'gig-marketplace') {
    return (
      <GigMarketplace
        onSelectGig={(gig: any) => {
          setSelectedGig(gig);
          setCurrentScreen('gig-detail');
        }}
        onBack={() => setCurrentScreen('dashboard')}
      />
    );
  }

  // Gig Detail
  if (currentScreen === 'gig-detail' && selectedGig) {
    return (
      <GigDetail
        gig={selectedGig}
        onBook={() => setCurrentScreen('gig-booking')}
        onMessage={() => setCurrentScreen('messages')}
        onBack={() => setCurrentScreen('gig-marketplace')}
      />
    );
  }

  // Gig Booking
  if (currentScreen === 'gig-booking' && selectedGig) {
    return (
      <GigBooking
        gig={selectedGig}
        onComplete={() => setCurrentScreen('dashboard')}
        onBack={() => setCurrentScreen('gig-detail')}
      />
    );
  }

  return null;
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
