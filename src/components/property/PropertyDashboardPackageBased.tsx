import { useState } from 'react';
import { Home, DollarSign, Calendar, Users, Plus, Eye, Settings, TrendingUp, Star, Info } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import LogoWithTagline from '../common/LogoWithTagline';
import AddPropertyFormWorking from './AddPropertyFormWorking';
import ApplicationDetailView from './ApplicationDetailView';
import ScheduleShowingCalendar from './ScheduleShowingCalendar';
import FastTrackRevenueExplainer from './FastTrackRevenueExplainer';
import LandlordReviewSystem from './LandlordReviewSystem';

interface PropertyDashboardPackageBasedProps {
  packageType: 'free' | 'per-listing' | 'view-package' | 'unlimited';
  onNavigateToPricing?: () => void;
}

// DUMMY DATA
const DUMMY_PROPERTIES = [
  {
    id: '1',
    address: '742 Evergreen Terrace, Springfield, IL 62701',
    rent: 1250,
    bedrooms: 3,
    bathrooms: 2,
    package: 'featured',
    packagePrice: 24.99,
    status: 'active',
    views: 47,
    applications: 3,
    fastTrackRevenue: 90,
    scheduledShowings: 2
  },
  {
    id: '2',
    address: '124 Conch Street, Bikini Bottom, CA 90210',
    rent: 850,
    bedrooms: 2,
    bathrooms: 1,
    package: 'basic',
    packagePrice: 14.99,
    status: 'active',
    views: 23,
    applications: 1,
    fastTrackRevenue: 30,
    scheduledShowings: 1
  }
];

const DUMMY_APPLICATIONS = [
  {
    id: 'app-001',
    propertyId: '1',
    propertyAddress: '742 Evergreen Terrace, Springfield, IL 62701',
    applicantName: 'Marcus Johnson',
    applicantAge: 32,
    submittedDate: '2025-01-15',
    status: 'pending',
    fastTrackFee: 75,
    yourRevShare: 30,
    showingScheduled: true,
    showingDate: '2025-01-22',
    showingTime: '2:00 PM',
    convictionCategory: 'Drug Offenses',
    yearsSinceRelease: 2.5,
    currentIncome: 3200,
    creditScore: 620,
    hasBackgroundReport: true
  },
  {
    id: 'app-002',
    propertyId: '1',
    propertyAddress: '742 Evergreen Terrace, Springfield, IL 62701',
    applicantName: 'Sarah Williams',
    applicantAge: 28,
    submittedDate: '2025-01-18',
    status: 'showing_scheduled',
    fastTrackFee: 65,
    yourRevShare: 30,
    showingScheduled: true,
    showingDate: '2025-01-24',
    showingTime: '4:00 PM',
    convictionCategory: 'Property Crimes',
    yearsSinceRelease: 4,
    currentIncome: 2850,
    creditScore: 580,
    hasBackgroundReport: true
  },
  {
    id: 'app-003',
    propertyId: '1',
    propertyAddress: '742 Evergreen Terrace, Springfield, IL 62701',
    applicantName: 'David Chen',
    applicantAge: 35,
    submittedDate: '2025-01-20',
    status: 'pending',
    fastTrackFee: 75,
    yourRevShare: 30,
    showingScheduled: false,
    convictionCategory: 'Financial Crimes',
    yearsSinceRelease: 3,
    currentIncome: 4100,
    creditScore: 650,
    hasBackgroundReport: true
  },
  {
    id: 'app-004',
    propertyId: '2',
    propertyAddress: '124 Conch Street, Bikini Bottom, CA 90210',
    applicantName: 'Jennifer Martinez',
    applicantAge: 29,
    submittedDate: '2025-01-19',
    status: 'showing_scheduled',
    fastTrackFee: 75,
    yourRevShare: 30,
    showingScheduled: true,
    showingDate: '2025-01-23',
    showingTime: '10:00 AM',
    convictionCategory: 'Public Order',
    yearsSinceRelease: 1.5,
    currentIncome: 2650,
    creditScore: 595,
    hasBackgroundReport: true
  }
];

export default function PropertyDashboardPackageBased({ packageType, onNavigateToPricing }: PropertyDashboardPackageBasedProps) {
  const [activeView, setActiveView] = useState<'dashboard' | 'add-property' | 'applications' | 'application-detail' | 'schedule-showing' | 'revenue-explainer' | 'reviews'>('dashboard');
  const [properties, setProperties] = useState(DUMMY_PROPERTIES);
  const [applications, setApplications] = useState(DUMMY_APPLICATIONS);
  const [selectedApplication, setSelectedApplication] = useState<any>(null);

  const totalRevenue = applications.reduce((sum, app) => sum + app.yourRevShare, 0);
  const totalApplications = applications.length;
  const totalShowings = applications.filter(app => app.showingScheduled).length;
  const totalProperties = properties.filter(p => p.status === 'active').length;

  const handleAddProperty = (propertyData: any) => {
    const newProperty = {
      id: `${properties.length + 1}`,
      ...propertyData,
      status: 'active',
      views: 0,
      applications: 0,
      fastTrackRevenue: 0,
      scheduledShowings: 0
    };
    setProperties([...properties, newProperty]);
    setActiveView('dashboard');
  };

  const handleViewApplication = (app: any) => {
    setSelectedApplication(app);
    setActiveView('application-detail');
  };

  const handleScheduleShowing = (app: any) => {
    setSelectedApplication(app);
    setActiveView('schedule-showing');
  };

  const handleShowingScheduled = (date: string, time: string) => {
    const updatedApps = applications.map(app => 
      app.id === selectedApplication.id 
        ? { ...app, showingScheduled: true, showingDate: date, showingTime: time, status: 'showing_scheduled' }
        : app
    );
    setApplications(updatedApps);
    setActiveView('applications');
  };

  // Revenue Explainer View
  if (activeView === 'revenue-explainer') {
    return <FastTrackRevenueExplainer onClose={() => setActiveView('dashboard')} />;
  }

  // Reviews View
  if (activeView === 'reviews') {
    return <LandlordReviewSystem landlordName="Your Company" onBack={() => setActiveView('dashboard')} />;
  }

  // Add Property View
  if (activeView === 'add-property') {
    // Free users can't add properties
    if (packageType === 'free') {
      return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="max-w-md text-center px-6">
            <h1 className="text-3xl mb-4">Upgrade to List Properties</h1>
            <p className="text-white/60 mb-6">
              You're on the free plan. Upgrade to a paid plan to start listing properties and receiving FastTrack applications.
            </p>
            {onNavigateToPricing && (
              <Button
                onClick={onNavigateToPricing}
                className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
              >
                View Pricing Options
              </Button>
            )}
          </div>
        </div>
      );
    }

    // Unlimited users don't see package builder
    if (packageType === 'unlimited') {
      return (
        <AddPropertyFormWorking
          onSubmit={(data) => handleAddProperty({ ...data, package: 'featured', packagePrice: 0 })}
          onCancel={() => setActiveView('dashboard')}
        />
      );
    }

    return (
      <AddPropertyFormWorking
        onSubmit={handleAddProperty}
        onCancel={() => setActiveView('dashboard')}
      />
    );
  }

  // Application Detail View
  if (activeView === 'application-detail' && selectedApplication) {
    return (
      <ApplicationDetailView
        application={selectedApplication}
        onBack={() => setActiveView('applications')}
        onScheduleShowing={() => setActiveView('schedule-showing')}
      />
    );
  }

  // Schedule Showing View
  if (activeView === 'schedule-showing' && selectedApplication) {
    return (
      <ScheduleShowingCalendar
        application={selectedApplication}
        onConfirm={handleShowingScheduled}
        onCancel={() => setActiveView('applications')}
      />
    );
  }

  // Applications View
  if (activeView === 'applications') {
    // Free users can't view full applications
    if (packageType === 'free') {
      return (
        <div className="min-h-screen bg-black text-white">
          <div className="border-b border-white/5 bg-[#121212]">
            <div className="max-w-7xl mx-auto px-6 py-6">
              <div className="flex items-center justify-between">
                <LogoWithTagline size="md" />
                <Button
                  onClick={() => setActiveView('dashboard')}
                  variant="outline"
                  className="border-white/20 text-white"
                >
                  Back to Dashboard
                </Button>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-6 py-12 text-center">
            <h1 className="text-3xl mb-4">Upgrade to View Applications</h1>
            <p className="text-white/60 mb-6">
              Applications are only available on paid plans. Upgrade to start receiving and reviewing FastTrack applications.
            </p>
            {onNavigateToPricing && (
              <Button
                onClick={onNavigateToPricing}
                className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
              >
                View Pricing Options
              </Button>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-black text-white">
        <div className="border-b border-white/5 bg-[#121212]">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <LogoWithTagline size="md" />
              <Button
                onClick={() => setActiveView('dashboard')}
                variant="outline"
                className="border-white/20 text-white"
              >
                Back to Dashboard
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-2xl mb-6">Applications</h1>
          <div className="space-y-4">
            {applications.map(app => (
              <Card key={app.id} className="bg-[#121212] border-white/10 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg text-white">{app.applicantName}</h3>
                      {app.showingScheduled && (
                        <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30">
                          Showing Scheduled
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-white/60">{app.propertyAddress}</div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-white/60 mb-1">Your Rev-Share</div>
                    <div className="text-lg text-[#A8F32C]">${app.yourRevShare}</div>
                  </div>
                  <div>
                    <div className="text-sm text-white/60 mb-1">Income</div>
                    <div className="text-lg text-white">${app.currentIncome}</div>
                  </div>
                  <div>
                    <div className="text-sm text-white/60 mb-1">Credit</div>
                    <div className="text-lg text-white">{app.creditScore}</div>
                  </div>
                  <div>
                    <div className="text-sm text-white/60 mb-1">Years</div>
                    <div className="text-lg text-white">{app.yearsSinceRelease}</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={() => handleViewApplication(app)}
                    className="flex-1 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    View Full Application
                  </Button>
                  {!app.showingScheduled && (
                    <Button
                      onClick={() => handleScheduleShowing(app)}
                      variant="outline"
                      className="flex-1 border-white/20 text-white"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Showing
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // DASHBOARD VIEW
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/5 bg-[#121212] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <LogoWithTagline size="md" />
            <div className="flex gap-3">
              {/* Package Badge */}
              <Badge className={`${
                packageType === 'unlimited' ? 'bg-[#A8F32C] text-black' :
                packageType === 'free' ? 'bg-white/10 text-white/60' :
                'bg-white/20 text-white'
              } border-0`}>
                {packageType === 'unlimited' ? 'UNLIMITED' :
                 packageType === 'free' ? 'FREE PLAN' :
                 packageType === 'view-package' ? 'VIEW PACKAGE' :
                 'PER-LISTING'}
              </Badge>

              <Button
                onClick={() => setActiveView('reviews')}
                variant="outline"
                className="border-white/20 text-white"
              >
                <Star className="mr-2 h-4 w-4" />
                Your Rating
              </Button>

              {packageType !== 'free' && (
                <Button
                  onClick={() => setActiveView('add-property')}
                  className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Property
                </Button>
              )}

              {onNavigateToPricing && (
                <Button
                  onClick={onNavigateToPricing}
                  variant="outline"
                  className="border-white/20 text-white"
                >
                  <Settings className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Free Plan Banner */}
        {packageType === 'free' && (
          <Card className="bg-[#A8F32C]/10 border-[#A8F32C]/30 p-6 mb-8">
            <div className="flex items-start gap-4">
              <Info className="h-6 w-6 text-[#A8F32C] flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-lg text-white mb-2">You're on the Free Plan</h3>
                <p className="text-sm text-white/60 mb-4">
                  You can explore the platform, but you'll need to upgrade to list properties and receive FastTrack applications.
                </p>
                {onNavigateToPricing && (
                  <Button
                    onClick={onNavigateToPricing}
                    className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
                  >
                    View Pricing & Upgrade
                  </Button>
                )}
              </div>
            </div>
          </Card>
        )}

        {/* Stats Cards - Only show if not free */}
        {packageType !== 'free' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <button
                onClick={() => setActiveView('revenue-explainer')}
                className="text-left"
              >
                <Card className="bg-[#121212] border-[#A8F32C]/30 p-6 hover:border-[#A8F32C] transition-colors cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <DollarSign className="h-8 w-8 text-[#A8F32C]" />
                    <Info className="h-4 w-4 text-[#A8F32C]" />
                  </div>
                  <div className="text-3xl mb-1">${totalRevenue}</div>
                  <div className="text-sm text-white/60">FastTrack Revenue</div>
                  <div className="text-xs text-[#A8F32C] mt-2">at $30/app</div>
                </Card>
              </button>

              <Card className="bg-[#121212] border-white/10 p-6">
                <div className="flex items-center justify-between mb-2">
                  <Users className="h-8 w-8 text-white/60" />
                </div>
                <div className="text-3xl mb-1">{totalApplications}</div>
                <div className="text-sm text-white/60">Total Applications</div>
              </Card>

              <Card className="bg-[#121212] border-white/10 p-6">
                <div className="flex items-center justify-between mb-2">
                  <Calendar className="h-8 w-8 text-white/60" />
                </div>
                <div className="text-3xl mb-1">{totalShowings}</div>
                <div className="text-sm text-white/60">Scheduled Showings</div>
              </Card>

              <Card className="bg-[#121212] border-white/10 p-6">
                <div className="flex items-center justify-between mb-2">
                  <Home className="h-8 w-8 text-white/60" />
                </div>
                <div className="text-3xl mb-1">{totalProperties}</div>
                <div className="text-sm text-white/60">Active Properties</div>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
              <h2 className="text-xl mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  onClick={() => setActiveView('applications')}
                  variant="outline"
                  className="border-[#A8F32C]/30 text-white hover:bg-[#A8F32C]/10 h-auto py-4 justify-start"
                >
                  <Users className="mr-3 h-5 w-5 text-[#A8F32C]" />
                  <div className="text-left">
                    <div>Review Applications</div>
                    <div className="text-xs text-white/60 mt-1">{applications.filter(a => a.status === 'pending').length} pending</div>
                  </div>
                </Button>

                <Button
                  onClick={() => setActiveView('revenue-explainer')}
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/5 h-auto py-4 justify-start"
                >
                  <TrendingUp className="mr-3 h-5 w-5 text-white/60" />
                  <div className="text-left">
                    <div>FastTrack Revenue Info</div>
                    <div className="text-xs text-white/60 mt-1">How you earn $30/app</div>
                  </div>
                </Button>

                <Button
                  onClick={() => setActiveView('add-property')}
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/5 h-auto py-4 justify-start"
                >
                  <Plus className="mr-3 h-5 w-5 text-white/60" />
                  <div className="text-left">
                    <div>Add New Property</div>
                    <div className="text-xs text-white/60 mt-1">List in minutes</div>
                  </div>
                </Button>
              </div>
            </div>

            {/* Properties List */}
            <div>
              <h2 className="text-xl mb-4">Your Properties</h2>
              <div className="space-y-4">
                {properties.map(property => (
                  <Card key={property.id} className="bg-[#121212] border-white/10 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg text-white">{property.address}</h3>
                          {property.package === 'featured' && (
                            <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30">
                              Featured
                            </Badge>
                          )}
                        </div>
                        <div className="flex gap-6 text-sm text-white/60">
                          <span>{property.bedrooms} bed</span>
                          <span>{property.bathrooms} bath</span>
                          <span>${property.rent}/mo</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4 pt-4 border-t border-white/10">
                      <div>
                        <div className="text-2xl text-white">{property.views}</div>
                        <div className="text-xs text-white/60">Views</div>
                      </div>
                      <div>
                        <div className="text-2xl text-[#A8F32C]">{property.applications}</div>
                        <div className="text-xs text-white/60">Applications</div>
                      </div>
                      <div>
                        <div className="text-2xl text-white">${property.fastTrackRevenue}</div>
                        <div className="text-xs text-white/60">Revenue</div>
                      </div>
                      <div>
                        <div className="text-2xl text-white">{property.scheduledShowings}</div>
                        <div className="text-xs text-white/60">Showings</div>
                      </div>
                    </div>

                    {property.applications > 0 && (
                      <div className="mt-4">
                        <Button
                          onClick={() => setActiveView('applications')}
                          className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
                        >
                          View {property.applications} Application{property.applications !== 1 ? 's' : ''}
                        </Button>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
