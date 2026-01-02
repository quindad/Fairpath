import { useState } from 'react';
import { Home, DollarSign, Users, TrendingUp, Bell, Settings, User, Plus, Search, Filter, Download, Eye, CheckCircle, XCircle, Clock, ChevronRight, Calendar, MapPin, Star, LogOut, Zap, Briefcase } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import LogoFinal from '../common/LogoFinal';
import { useUser } from '../../contexts/UserContext';
import ApplicantProfileView from '../property/ApplicantProfileView';
import ScreeningResultsView from '../property/ScreeningResultsView';
import ApproveApplicationFlow from '../property/ApproveApplicationFlow';
import DenyApplicationFlow from '../property/DenyApplicationFlow';

interface PropertyOwnerDashboardProps {
  userData?: any;
  onNavigate?: (screen: string) => void;
}

export default function PropertyOwnerDashboard({ userData, onNavigate }: PropertyOwnerDashboardProps) {
  const { logout } = useUser();
  const [activeTab, setActiveTab] = useState<'overview' | 'properties' | 'applications' | 'revenue'>('overview');
  const [selectedApplicant, setSelectedApplicant] = useState<any | null>(null);
  const [viewingScreening, setViewingScreening] = useState<any | null>(null);
  const [approvingApplicant, setApprovingApplicant] = useState<any | null>(null);
  const [denyingApplicant, setDenyingApplicant] = useState<any | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);

  // Package limits
  const packageLimits = {
    basic: { listings: 1, fasttrack: false },
    premium: { listings: 999, fasttrack: true },
    partner: { listings: 999, fasttrack: true }
  };

  const currentLimits = packageLimits[userData?.packageType || 'basic'];

  // Mock data
  const stats = {
    activeListings: userData?.packageType === 'basic' ? 1 : userData?.packageType === 'premium' ? 4 : 12,
    totalApplications: userData?.packageType === 'basic' ? 8 : userData?.packageType === 'premium' ? 34 : 127,
    fastTrackApps: userData?.packageType === 'basic' ? 0 : userData?.packageType === 'premium' ? 12 : 58,
    avgRent: userData?.packageType === 'basic' ? 1200 : userData?.packageType === 'premium' ? 1450 : 1680,
    monthlyRevenue: userData?.packageType === 'basic' ? 150 : userData?.packageType === 'premium' ? 780 : 2900
  };

  const listings = [
    { id: 1, address: '2847 N Sheffield Ave, Unit 3B', rent: 1450, beds: 2, baths: 1, applications: 23, fastTrack: 8, status: 'active', views: 342 },
    { id: 2, address: '1523 W Division St, Unit 2', rent: 1200, beds: 1, baths: 1, applications: 5, fastTrack: 2, status: 'active', views: 156 },
    { id: 3, address: '4521 N Ashland Ave, Unit 1A', rent: 1650, beds: 2, baths: 2, applications: 0, fastTrack: 0, status: 'draft', views: 0 },
  ];

  const applications = [
    { id: 1, name: 'Marcus Johnson', property: '2847 N Sheffield Ave, Unit 3B', score: 742, applied: '2 hours ago', type: 'fasttrack', status: 'new' },
    { id: 2, name: 'David Williams', property: '2847 N Sheffield Ave, Unit 3B', score: 688, applied: '5 hours ago', type: 'fasttrack', status: 'screening' },
    { id: 3, name: 'James Brown', property: '1523 W Division St, Unit 2', score: 701, applied: '1 day ago', type: 'fasttrack', status: 'approved' },
    { id: 4, name: 'Robert Davis', property: '2847 N Sheffield Ave, Unit 3B', score: 655, applied: '2 days ago', type: 'regular', status: 'reviewing' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30">Active</Badge>;
      case 'draft':
        return <Badge className="bg-white/10 text-white/60 border-white/20">Draft</Badge>;
      case 'new':
        return <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/30">New</Badge>;
      case 'screening':
        return <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">Screening</Badge>;
      case 'reviewing':
        return <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">Reviewing</Badge>;
      case 'approved':
        return <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30">Approved</Badge>;
      default:
        return <Badge className="bg-white/10 text-white/60 border-white/20">Unknown</Badge>;
    }
  };

  // If viewing applicant profile, show that instead
  if (selectedApplicant) {
    return (
      <ApplicantProfileView
        applicant={selectedApplicant}
        onBack={() => setSelectedApplicant(null)}
        onApprove={() => {
          setSelectedApplicant(null);
          setApprovingApplicant(selectedApplicant);
        }}
        onDeny={() => {
          setSelectedApplicant(null);
          setDenyingApplicant(selectedApplicant);
        }}
        onViewScreening={() => {
          setViewingScreening(selectedApplicant);
          setSelectedApplicant(null);
        }}
      />
    );
  }

  // If viewing screening results, show that
  if (viewingScreening) {
    return (
      <ScreeningResultsView
        applicant={viewingScreening}
        onBack={() => {
          setSelectedApplicant(viewingScreening);
          setViewingScreening(null);
        }}
        onApprove={() => {
          setViewingScreening(null);
          setApprovingApplicant(viewingScreening);
        }}
        onDeny={() => {
          setViewingScreening(null);
          setDenyingApplicant(viewingScreening);
        }}
      />
    );
  }

  // If approving applicant, show approve flow
  if (approvingApplicant) {
    const property = listings.find(l => l.address === approvingApplicant.property);
    return (
      <ApproveApplicationFlow
        applicant={approvingApplicant}
        property={property || listings[0]}
        onComplete={(showingData) => {
          console.log('Showing scheduled:', showingData);
          setApprovingApplicant(null);
        }}
        onBack={() => setApprovingApplicant(null)}
      />
    );
  }

  // If denying applicant, show deny flow
  if (denyingApplicant) {
    return (
      <DenyApplicationFlow
        applicant={denyingApplicant}
        onComplete={(denyData) => {
          console.log('Application denied:', denyData);
          setDenyingApplicant(null);
        }}
        onBack={() => setDenyingApplicant(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/5 bg-[#121212] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <LogoFinal size="md" />
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                className="border-white/20 text-white relative"
                onClick={() => onNavigate?.('notifications')}
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#A8F32C] rounded-full text-xs text-black flex items-center justify-center">
                  {stats.totalApplications}
                </span>
              </Button>
              <Button 
                variant="outline" 
                className="border-white/20 text-white"
                onClick={() => onNavigate?.('settings')}
              >
                <Settings className="h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                className="border-white/20 text-white"
                onClick={() => onNavigate?.('profile')}
              >
                <User className="h-5 w-5" />
              </Button>
              <Button variant="outline" className="border-white/20 text-white" onClick={logout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl mb-2 text-white">Welcome back, Chicago Rentals LLC!</h1>
            <p className="text-xl text-white/60">
              {stats.totalApplications} total applications across {stats.activeListings} properties
            </p>
          </div>
          <Button 
            onClick={() => onNavigate('post-property')}
            className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
          >
            <Plus className="mr-2 h-5 w-5" />
            List New Property
          </Button>
        </div>

        {/* Package Info */}
        <Card className="bg-gradient-to-r from-[#A8F32C]/20 to-transparent border-[#A8F32C]/30 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl mb-2 text-white">
                {userData?.packageType === 'basic' ? 'Basic Plan' : userData?.packageType === 'premium' ? 'Premium Plan' : 'Partner Plan'}
              </h3>
              <p className="text-white/60">
                {stats.activeListings} of {currentLimits.listings === 999 ? 'unlimited' : currentLimits.listings} active listings • 
                {currentLimits.fasttrack ? ' FastTrack enabled' : ' FastTrack not available'}
              </p>
            </div>
            {userData?.packageType !== 'partner' && (
              <Button className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">
                Upgrade Plan
              </Button>
            )}
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-5 gap-6 mb-8">
          <Card className="bg-[#121212] border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <Home className="h-8 w-8 text-[#A8F32C]" />
            </div>
            <div className="text-3xl mb-2 text-white">{stats.activeListings}</div>
            <div className="text-white/60 text-sm">Active Listings</div>
          </Card>

          <Card className="bg-[#121212] border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="h-8 w-8 text-blue-400" />
            </div>
            <div className="text-3xl mb-2 text-white">{stats.totalApplications}</div>
            <div className="text-white/60 text-sm">Total Applications</div>
          </Card>

          <Card className="bg-[#121212] border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <Zap className="h-8 w-8 text-yellow-400" />
            </div>
            <div className="text-3xl mb-2 text-white">{stats.fastTrackApps}</div>
            <div className="text-white/60 text-sm">FastTrack Apps</div>
          </Card>

          <Card className="bg-[#121212] border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="h-8 w-8 text-purple-400" />
            </div>
            <div className="text-3xl mb-2 text-white">${stats.avgRent}</div>
            <div className="text-white/60 text-sm">Avg. Rent</div>
          </Card>

          <Card className="bg-[#121212] border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="h-8 w-8 text-[#A8F32C]" />
            </div>
            <div className="text-3xl mb-2 text-white">${stats.monthlyRevenue}</div>
            <div className="text-white/60 text-sm">Monthly Revenue</div>
          </Card>
        </div>

        {/* FastTrack Revenue Card (if enabled) */}
        {currentLimits.fasttrack && (
          <Card className="bg-gradient-to-r from-yellow-500/20 to-transparent border-yellow-500/30 p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                <Zap className="h-6 w-6 text-yellow-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl mb-2 text-white">FastTrack Revenue This Month</h3>
                <div className="flex items-baseline gap-2 mb-2">
                  <div className="text-4xl text-yellow-400">${stats.fastTrackApps * 75}</div>
                  <div className="text-white/60">from {stats.fastTrackApps} FastTrack applications</div>
                </div>
                <p className="text-sm text-white/60">
                  Earn $75 for every FastTrack application to your properties. You keep 100% of the screening fee.
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-white/10">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 border-b-2 transition-all ${
              activeTab === 'overview'
                ? 'border-[#A8F32C] text-[#A8F32C]'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('properties')}
            className={`px-6 py-3 border-b-2 transition-all ${
              activeTab === 'properties'
                ? 'border-[#A8F32C] text-[#A8F32C]'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            Properties
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-6 py-3 border-b-2 transition-all ${
              activeTab === 'applications'
                ? 'border-[#A8F32C] text-[#A8F32C]'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            Applications
          </button>
          <button
            onClick={() => setActiveTab('revenue')}
            className={`px-6 py-3 border-b-2 transition-all ${
              activeTab === 'revenue'
                ? 'border-[#A8F32C] text-[#A8F32C]'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            Revenue
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent Applications */}
            <Card className="bg-[#121212] border-white/10 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl text-white">Recent Applications</h2>
                <Button 
                  variant="ghost" 
                  className="text-[#A8F32C]"
                  onClick={() => setActiveTab('applications')}
                >
                  View All
                </Button>
              </div>
              
              <div className="space-y-4">
                {applications.slice(0, 4).map((app) => (
                  <div key={app.id} className="bg-black/50 border border-white/10 rounded-lg p-4 hover:border-[#A8F32C]/50 transition-all cursor-pointer">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <div className="text-white">{app.name}</div>
                          {app.type === 'fasttrack' && (
                            <Zap className="h-4 w-4 text-yellow-400" />
                          )}
                        </div>
                        <div className="text-sm text-white/60">{app.property}</div>
                      </div>
                      {getStatusBadge(app.status)}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="text-white/60">FairPath Score: {app.score}</div>
                      <div className="text-white/40">{app.applied}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Property Performance */}
            <Card className="bg-[#121212] border-white/10 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl text-white">Property Performance</h2>
                <Button 
                  variant="ghost" 
                  className="text-[#A8F32C]"
                  onClick={() => setActiveTab('properties')}
                >
                  View All
                </Button>
              </div>
              
              <div className="space-y-4">
                {listings.filter(l => l.status === 'active').map((listing) => (
                  <div key={listing.id} className="bg-black/50 border border-white/10 rounded-lg p-4">
                    <div className="mb-3">
                      <div className="text-white mb-1">{listing.address}</div>
                      <div className="text-sm text-white/60">{listing.beds} bed • {listing.baths} bath • ${listing.rent}/mo</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-xl text-blue-400">{listing.applications}</div>
                        <div className="text-xs text-white/60">Applications</div>
                      </div>
                      <div>
                        <div className="text-xl text-yellow-400">{listing.fastTrack}</div>
                        <div className="text-xs text-white/60">FastTrack</div>
                      </div>
                      <div>
                        <div className="text-xl text-purple-400">{listing.views}</div>
                        <div className="text-xs text-white/60">Views</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Properties Tab */}
        {activeTab === 'properties' && (
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                <Input
                  placeholder="Search properties..."
                  className="pl-10 bg-[#121212] border-white/20 text-white"
                />
              </div>
              <Button variant="outline" className="border-white/20 text-white">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>

            <div className="space-y-4">
              {listings.map((listing) => (
                <Card key={listing.id} className="bg-[#121212] border-white/10 p-6 hover:border-[#A8F32C]/50 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl text-white">{listing.address}</h3>
                        {getStatusBadge(listing.status)}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-white/60">
                        <div>{listing.beds} bed • {listing.baths} bath</div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          ${listing.rent}/month
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-white/20 text-white">
                        Edit
                      </Button>
                      <Button size="sm" className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">
                        View
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {listing.status === 'active' && (
                    <div className="grid grid-cols-4 gap-4 pt-4 border-t border-white/10">
                      <div>
                        <div className="text-2xl text-white mb-1">{listing.applications}</div>
                        <div className="text-sm text-white/60">Applications</div>
                      </div>
                      <div>
                        <div className="text-2xl text-yellow-400 mb-1 flex items-center gap-1">
                          {listing.fastTrack}
                          <Zap className="h-5 w-5" />
                        </div>
                        <div className="text-sm text-white/60">FastTrack</div>
                      </div>
                      <div>
                        <div className="text-2xl text-white mb-1">{listing.views}</div>
                        <div className="text-sm text-white/60">Views</div>
                      </div>
                      <div>
                        <div className="text-2xl text-[#A8F32C] mb-1">
                          ${listing.fastTrack * 75}
                        </div>
                        <div className="text-sm text-white/60">Revenue</div>
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Applications Tab */}
        {activeTab === 'applications' && (
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                <Input
                  placeholder="Search applications..."
                  className="pl-10 bg-[#121212] border-white/20 text-white"
                />
              </div>
              <Button variant="outline" className="border-white/20 text-white">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>

            <div className="space-y-4">
              {applications.map((app) => (
                <Card key={app.id} className="bg-[#121212] border-white/10 p-6 hover:border-blue-500/50 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#A8F32C] to-blue-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-lg text-black">{app.name.charAt(0)}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg text-white">{app.name}</h3>
                          {getStatusBadge(app.status)}
                          {app.type === 'fasttrack' && (
                            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                              <Zap className="h-3 w-3 mr-1" />
                              FastTrack
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-white/60 mb-1">{app.property}</div>
                        <div className="flex items-center gap-4 text-sm text-white/60">
                          <div>FairPath Score: {app.score}</div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            Applied {app.applied}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-green-500/30 text-green-400 hover:bg-green-500/10" onClick={() => setApprovingApplicant(app)}>
                        <CheckCircle className="mr-1 h-4 w-4" />
                        Approve
                      </Button>
                      <Button size="sm" variant="outline" className="border-red-500/30 text-red-400 hover:bg-red-500/10" onClick={() => setDenyingApplicant(app)}>
                        <XCircle className="mr-1 h-4 w-4" />
                        Deny
                      </Button>
                      <Button size="sm" className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90" onClick={() => setSelectedApplicant(app)}>
                        View Profile
                      </Button>
                    </div>
                  </div>

                  {app.type === 'fasttrack' && app.status === 'new' && (
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="h-5 w-5 text-yellow-400" />
                        <div className="text-white">FastTrack Application</div>
                      </div>
                      <p className="text-sm text-white/60">
                        You must schedule a showing or provide a valid denial reason within 48 hours. You earned $75 for this application.
                      </p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Revenue Tab */}
        {activeTab === 'revenue' && (
          <div className="space-y-6">
            <Card className="bg-[#121212] border-white/10 p-8">
              <h2 className="text-2xl mb-6 text-white">Revenue Overview</h2>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-black/50 border border-white/10 rounded-lg p-6">
                  <div className="text-white/60 text-sm mb-2">FastTrack Revenue (This Month)</div>
                  <div className="text-4xl text-[#A8F32C] mb-1">${stats.fastTrackApps * 75}</div>
                  <div className="text-sm text-white/60">{stats.fastTrackApps} applications × $75</div>
                </div>

                <div className="bg-black/50 border border-white/10 rounded-lg p-6">
                  <div className="text-white/60 text-sm mb-2">Platform Fees Paid</div>
                  <div className="text-4xl text-white mb-1">
                    ${userData?.packageType === 'basic' ? 25 : userData?.packageType === 'premium' ? 75 : 200}
                  </div>
                  <div className="text-sm text-white/60">Monthly subscription</div>
                </div>

                <div className="bg-black/50 border border-white/10 rounded-lg p-6">
                  <div className="text-white/60 text-sm mb-2">Net Profit</div>
                  <div className="text-4xl text-[#A8F32C] mb-1">${stats.monthlyRevenue}</div>
                  <div className="text-sm text-white/60">After platform fees</div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#A8F32C]/20 to-transparent border border-[#A8F32C]/30 rounded-lg p-6">
                <h3 className="text-lg text-white mb-2">How FastTrack Revenue Works</h3>
                <p className="text-white/60 mb-4">
                  You earn $75 for every FastTrack application to your properties. This fee covers professional background screening and guarantees you'll show the property or provide a valid denial reason. You keep 100% of the FastTrack fee.
                </p>
                <div className="flex gap-4">
                  <Button className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">
                    View All Transactions
                  </Button>
                  <Button variant="outline" className="border-white/20 text-white">
                    Download Report
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="bg-[#121212] border-white/10 p-8">
              <h2 className="text-2xl mb-6 text-white">Monthly Breakdown</h2>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white">FastTrack Applications</span>
                    <span className="text-white">${stats.fastTrackApps * 75}</span>
                  </div>
                  <div className="h-3 bg-black/50 rounded-full overflow-hidden">
                    <div className="h-full bg-[#A8F32C]" style={{ width: '100%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white">Platform Subscription</span>
                    <span className="text-red-400">
                      -${userData?.packageType === 'basic' ? 25 : userData?.packageType === 'premium' ? 75 : 200}
                    </span>
                  </div>
                  <div className="h-3 bg-black/50 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500" style={{ width: `${userData?.packageType === 'basic' ? 17 : userData?.packageType === 'premium' ? 10 : 7}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2 pt-4 border-t border-white/10">
                    <span className="text-lg text-white">Net Profit</span>
                    <span className="text-lg text-[#A8F32C]">${stats.monthlyRevenue}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}