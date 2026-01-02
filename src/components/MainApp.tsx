import { useState } from 'react';
import { Home, Briefcase, Building2, Gift, MessageCircle, User, Menu } from 'lucide-react';
import AppMenu from './AppMenu';
import Logo from './Logo';
import HomeDashboard from './screens/HomeDashboard';
import JobMarketplace from './screens/JobMarketplace';
import HousingMarketplace from './screens/HousingMarketplace';
import PropertyDetail from './screens/PropertyDetail';
import FastTrackApplication from './screens/FastTrackApplication';
import JobApplicationFlow from './screens/JobApplicationFlow';
import ApplicationConfirmation from './screens/ApplicationConfirmation';
import ApplicationsPage from './screens/ApplicationsPage';
import FreeMarketplace from './screens/marketplace/FreeMarketplace';
import DonorDashboard from './screens/marketplace/DonorDashboard';
import FelonConnect from './screens/FelonConnect';
import ResourceCenter from './screens/ResourceCenter';
import Profile from './screens/Profile';
import SubscriptionPage from './screens/SubscriptionPage';
import { UserProfile } from './ProfileSetupWizard';
import { PropertyListing, mockProperties, JobListing, mockJobs } from '../lib/eligibility';

interface ClaimedItem {
  id: string;
  itemTitle: string;
  itemDescription: string;
  imageUrl: string;
  claimedDate: string;
  donorName: string;
  status: 'pending' | 'approved' | 'picked-up';
}

interface MainAppProps {
  userType: 'user' | 'donor';
  userProfile: UserProfile | null;
  isSubscriber: boolean;
  onLogout: () => void;
  onSubscribe: () => void;
}

type Screen = 'home' | 'jobs' | 'housing' | 'marketplace' | 'connect' | 'resources' | 'profile' | 'subscription' | 'applications';
type AppState = {
  screen: Screen;
  selectedProperty?: PropertyListing;
  applicationPropertyId?: string;
  completedApplicationId?: string;
  selectedJob?: JobListing;
  applicationJobId?: string;
  completedJobApplicationId?: string;
};

export default function MainApp({ userType, userProfile, isSubscriber, onLogout, onSubscribe }: MainAppProps) {
  const [appState, setAppState] = useState<AppState>({
    screen: userType === 'donor' ? 'marketplace' : 'home'
  });
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Claimed items state for marketplace
  const [claimedItems, setClaimedItems] = useState<ClaimedItem[]>([
    // Mock claimed item for demonstration
    {
      id: 'claim1',
      itemTitle: 'Professional Clothing Bundle',
      itemDescription: 'Dress shirts, pants, ties. Perfect for interviews.',
      imageUrl: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=400',
      claimedDate: 'Nov 22, 2025',
      donorName: 'Career Closet',
      status: 'approved'
    }
  ]);

  const navigateTo = (screen: Screen) => {
    setAppState({ screen });
  };

  const handlePropertySelect = (propertyId: string) => {
    const property = mockProperties.find(p => p.id === propertyId);
    if (property) {
      setAppState({ ...appState, selectedProperty: property });
    }
  };

  const handleBackToHousing = () => {
    setAppState({ screen: 'housing', selectedProperty: undefined });
  };

  const handleApplyToProperty = (propertyId: string) => {
    setAppState({ ...appState, applicationPropertyId: propertyId });
  };

  const handleApplicationComplete = (applicationId: string) => {
    setAppState({ 
      screen: 'home', 
      completedApplicationId: applicationId,
      applicationPropertyId: undefined,
    });
    // Show confirmation briefly
    setTimeout(() => {
      setAppState(prev => ({ ...prev, completedApplicationId: undefined }));
    }, 100);
  };

  const handleBackFromApplication = () => {
    setAppState({ 
      ...appState, 
      applicationPropertyId: undefined 
    });
  };

  const handleJobSelect = (jobId: string) => {
    const job = mockJobs.find(j => j.id === jobId);
    if (job) {
      setAppState({ ...appState, selectedJob: job });
    }
  };

  const handleBackToJobs = () => {
    setAppState({ screen: 'jobs', selectedJob: undefined });
  };

  const handleApplyToJob = (jobId: string) => {
    setAppState({ ...appState, applicationJobId: jobId });
  };

  const handleJobApplicationComplete = (applicationId: string) => {
    setAppState({ 
      screen: 'home', 
      completedJobApplicationId: applicationId,
      applicationJobId: undefined,
    });
    // Show confirmation briefly
    setTimeout(() => {
      setAppState(prev => ({ ...prev, completedJobApplicationId: undefined }));
    }, 100);
  };

  const handleBackFromJobApplication = () => {
    setAppState({ 
      ...appState, 
      applicationJobId: undefined 
    });
  };

  // Handle claiming free marketplace items
  const handleClaimItem = (itemId: string) => {
    // In production, this would make an API call
    // For now, just find the item from the mock data and add it to claimed items
    const mockItems = [
      { id: '1', title: 'Queen Size Bed Frame', description: 'Solid wood bed frame in good condition', imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400', donorName: 'Sarah M.' },
      { id: '2', title: 'Winter Coats (Men\'s L-XL)', description: '3 warm winter coats, gently used', imageUrl: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400', donorName: 'David P.' },
      { id: '3', title: 'Kitchen Essentials Bundle', description: 'Pots, pans, utensils, plates, cups', imageUrl: 'https://images.unsplash.com/photo-1556911073-38141963c9e0?w=400', donorName: 'Maria G.' },
      { id: '4', title: 'Work Boots (Size 10-11)', description: 'Steel toe work boots, barely worn', imageUrl: 'https://images.unsplash.com/photo-1542838686-5c7c5eb5a2f8?w=400', donorName: 'James K.' },
      { id: '5', title: 'Laptop for Job Searching', description: 'Basic laptop, works great for resumes', imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400', donorName: 'Tech Donor Corp' },
      { id: '6', title: 'Couch & Coffee Table Set', description: 'Comfortable couch and matching coffee table', imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400', donorName: 'Robert C.' },
      { id: '7', title: 'Professional Clothing Bundle', description: 'Dress shirts, pants, ties', imageUrl: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=400', donorName: 'Career Closet' },
      { id: '8', title: 'Microwave & Toaster', description: 'Both in working condition', imageUrl: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=400', donorName: 'Linda W.' }
    ]; 
    
    const item = mockItems.find(i => i.id === itemId);
    if (!item) return;
    
    const newClaimedItem: ClaimedItem = {
      id: `claim_${Math.random().toString(36).substr(2, 9)}`,
      itemTitle: item.title,
      itemDescription: item.description,
      imageUrl: item.imageUrl,
      claimedDate: 'Just now',
      donorName: item.donorName,
      status: 'pending'
    };
    
    setClaimedItems(prev => [...prev, newClaimedItem]);
  };

  const renderScreen = () => {
    if (userType === 'donor') {
      if (appState.screen === 'marketplace') {
        return <DonorDashboard />;
      }
      if (appState.screen === 'profile') {
        return <Profile onLogout={onLogout} userType="donor" />;
      }
      return <DonorDashboard />;
    }

    // Application confirmation flow
    if (appState.completedApplicationId && appState.selectedProperty) {
      return (
        <ApplicationConfirmation
          property={appState.selectedProperty}
          applicationId={appState.completedApplicationId}
          onViewApplications={() => navigateTo('applications')}
          onBackToHousing={handleBackToHousing}
        />
      );
    }

    // FastTrack application flow
    if (appState.applicationPropertyId && appState.selectedProperty) {
      return (
        <FastTrackApplication
          property={appState.selectedProperty}
          userProfile={userProfile}
          isSubscriber={isSubscriber}
          onBack={handleBackFromApplication}
          onComplete={handleApplicationComplete}
          onSubscribe={onSubscribe}
        />
      );
    }

    // Property detail view
    if (appState.selectedProperty && appState.screen === 'housing') {
      return (
        <PropertyDetail
          property={appState.selectedProperty}
          userProfile={userProfile}
          isSubscriber={isSubscriber}
          onBack={handleBackToHousing}
          onApply={handleApplyToProperty}
        />
      );
    }

    // Job application confirmation flow
    if (appState.completedJobApplicationId && appState.selectedJob) {
      return (
        <ApplicationConfirmation
          property={appState.selectedJob}
          applicationId={appState.completedJobApplicationId}
          onViewApplications={() => navigateTo('applications')}
          onBackToHousing={handleBackToJobs}
        />
      );
    }

    // Job application flow
    if (appState.applicationJobId && appState.selectedJob) {
      return (
        <JobApplicationFlow
          job={appState.selectedJob}
          userProfile={userProfile}
          isSubscriber={isSubscriber}
          onBack={handleBackFromJobApplication}
          onComplete={handleJobApplicationComplete}
          onSubscribe={onSubscribe}
        />
      );
    }

    // Main screens
    switch (appState.screen) {
      case 'home':
        return (
          <HomeDashboard 
            onNavigate={navigateTo}
            userProfile={userProfile}
            isSubscriber={isSubscriber}
          />
        );
      case 'jobs':
        return <JobMarketplace 
          userProfile={userProfile}
          isSubscriber={isSubscriber}
          onJobSelect={handleJobSelect}
          onApplyToJob={handleApplyToJob}
          onNavigateToSubscription={() => navigateTo('subscription')}
        />;
      case 'housing':
        return (
          <HousingMarketplace
            userProfile={userProfile}
            isSubscriber={isSubscriber}
            onNavigateToFastTrack={(propertyId) => {
              const property = mockProperties.find(p => p.id === propertyId);
              if (property) {
                setAppState({ ...appState, selectedProperty: property });
              }
            }}
          />
        );
      case 'marketplace':
        return <FreeMarketplace 
          isSubscriber={isSubscriber}
          claimedItems={claimedItems}
          onClaimItem={handleClaimItem}
        />;
      case 'connect':
        return <FelonConnect />;
      case 'resources':
        return <ResourceCenter />;
      case 'profile':
        return <Profile onLogout={onLogout} userType="user" />;
      case 'subscription':
        return <SubscriptionPage onSubscribe={onSubscribe} isSubscriber={isSubscriber} />;
      case 'applications':
        return <ApplicationsPage />;
      default:
        return (
          <HomeDashboard 
            onNavigate={navigateTo}
            userProfile={userProfile}
            isSubscriber={isSubscriber}
          />
        );
    }
  };

  const navItems = userType === 'donor' 
    ? [
        { id: 'marketplace' as Screen, icon: Gift, label: 'My Items' },
        { id: 'profile' as Screen, icon: User, label: 'Profile' },
      ]
    : [
        { id: 'home' as Screen, icon: Home, label: 'Home' },
        { id: 'jobs' as Screen, icon: Briefcase, label: 'Jobs' },
        { id: 'housing' as Screen, icon: Building2, label: 'Housing' },
        { id: 'marketplace' as Screen, icon: Gift, label: 'Free' },
        { id: 'connect' as Screen, icon: MessageCircle, label: 'Connect' },
        { id: 'profile' as Screen, icon: User, label: 'Me' },
      ];

  const showBottomNav = !appState.selectedProperty && !appState.applicationPropertyId && !appState.completedApplicationId && !appState.selectedJob && !appState.applicationJobId && !appState.completedJobApplicationId;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      {showBottomNav && (
        <div className="fixed top-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-xl border-b border-white/5">
          <div className="flex items-center justify-between px-4 h-14">
            <button 
              onClick={() => setMenuOpen(true)}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>
            <Logo size="sm" showText={false} variant="compact" />
            <div className="w-9" />
          </div>
        </div>
      )}

      {/* Content */}
      <div className={`flex-1 overflow-y-auto ${showBottomNav ? 'pt-14 pb-20' : ''}`}>
        {renderScreen()}
      </div>

      {/* Bottom Navigation */}
      {showBottomNav && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#121212]/95 backdrop-blur-xl border-t border-white/5">
          <div className={`flex items-center ${userType === 'donor' ? 'justify-around' : 'justify-between'} px-2 py-2`}>
            {navItems.map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => navigateTo(id)}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all min-w-[60px] ${
                  appState.screen === id 
                    ? 'text-[#A8F32C] bg-[#A8F32C]/10' 
                    : 'text-white/40 hover:text-white/60'
                }`}
              >
                <Icon className="h-5 w-5" strokeWidth={appState.screen === id ? 2.5 : 2} />
                <span className="text-xs">{label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* App Menu */}
      <AppMenu 
        isOpen={menuOpen} 
        onClose={() => setMenuOpen(false)}
        userType={userType}
      />
    </div>
  );
}