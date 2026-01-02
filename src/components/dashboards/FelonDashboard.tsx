import { useState } from 'react';
import { Home, Briefcase, ShoppingBag, TrendingUp, Bell, Settings, User, Star, Zap, Clock, CheckCircle, XCircle, AlertCircle, ChevronRight, Calendar, DollarSign, MapPin, Heart, LogOut, Search, Filter, Plus, Users, Building2, Award, Shield, Wrench } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import LogoFinal from '../common/LogoFinal';
import { useUser } from '../../contexts/UserContext';
import HousingApplicationFlow from '../felon/HousingApplicationFlow';
import JobApplicationFlow from '../felon/JobApplicationFlow';
import MarketplaceClaimFlow from '../felon/MarketplaceClaimFlow';
import ServicesTab from '../felon/ServicesTab';
import BecomeProviderFlow from '../felon/BecomeProviderFlow';
import ServiceBookingFlow from '../felon/ServiceBookingFlow';
import { generateHousingListings, generateJobListings, convictionTypes } from '../../data/mockData';

interface FelonDashboardProps {
  userData?: any;
  onNavigate?: (screen: string) => void;
  hasFairPathPlus?: boolean;
}

export default function FelonDashboard({ userData, onNavigate, hasFairPathPlus }: FelonDashboardProps) {
  const { logout } = useUser();
  const [activeTab, setActiveTab] = useState<'overview' | 'housing' | 'jobs' | 'marketplace' | 'my-applications' | 'services'>('overview');
  const [applyingToHousing, setApplyingToHousing] = useState<any | null>(null);
  const [applyingToJob, setApplyingToJob] = useState<any | null>(null);
  const [selectedMarketplaceItem, setSelectedMarketplaceItem] = useState<number | null>(null);
  const [becomingProvider, setBecomingProvider] = useState(false);
  const [bookingService, setBookingService] = useState<any | null>(null);

  const fairPathScore = 687;
  const scoreMax = 1000;
  const scorePercentage = (fairPathScore / scoreMax) * 100;

  // Mock data for applications (what they've already applied to) - these will grow as user applies
  const [housingApplications, setHousingApplications] = useState([
    { id: 1, address: '2847 N Sheffield Ave, Unit 3B', rent: 1450, status: 'showing_scheduled', date: 'Dec 15, 2025', time: '2:00 PM', landlord: 'Metro Properties', appliedDate: 'Nov 28, 2025' },
    { id: 2, address: '1523 W Division St, Unit 2', rent: 1200, status: 'screening', date: 'Dec 10, 2025', time: null, landlord: 'Second Chance Housing', appliedDate: 'Nov 25, 2025' },
    { id: 3, address: '4521 N Ashland Ave, Unit 1A', rent: 1650, status: 'denied', date: 'Dec 5, 2025', reason: 'Income requirement not met', landlord: 'Urban Living', appliedDate: 'Nov 20, 2025' },
  ]);

  const [jobApplications, setJobApplications] = useState([
    { id: 1, company: 'Amazon Fulfillment', position: 'Warehouse Associate', salary: '$18/hr', status: 'interview_scheduled', date: 'Dec 12, 2025', appliedDate: 'Nov 30, 2025' },
    { id: 2, company: "McDonald's", position: 'Crew Member', salary: '$15/hr', status: 'under_review', date: 'Dec 8, 2025', appliedDate: 'Nov 27, 2025' },
    { id: 3, company: 'UPS', position: 'Package Handler', salary: '$21/hr', status: 'applied', date: 'Dec 6, 2025', appliedDate: 'Nov 22, 2025' },
  ]);

  const [marketplaceClaims, setMarketplaceClaims] = useState([
    { id: 1, item: 'Queen Mattress & Box Spring', donor: 'Sarah M.', status: 'approved', pickupDate: 'Dec 14, 2025', claimedDate: 'Nov 28, 2025' },
    { id: 2, item: 'Professional Interview Clothes', donor: 'Mark T.', status: 'pending', pickupDate: null, claimedDate: 'Dec 1, 2025' },
    { id: 3, item: 'Kitchen Essentials Bundle', donor: 'Jennifer L.', status: 'completed', pickupDate: 'Dec 1, 2025', claimedDate: 'Nov 15, 2025' },
  ]);

  // IF APPLYING TO HOUSING, SHOW THAT FLOW INSTEAD
  if (applyingToHousing) {
    return (
      <HousingApplicationFlow
        housing={applyingToHousing}
        hasFairPathPlus={hasFairPathPlus}
        onClose={() => setApplyingToHousing(null)}
        onApply={(applicationData) => {
          // Add to list with new ID
          const newApp = {
            id: Date.now(),
            address: applicationData.address,
            rent: applicationData.rent,
            landlord: applyingToHousing.landlord,
            status: 'screening',
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            time: null,
            appliedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
          };
          setHousingApplications([...housingApplications, newApp]);
          setApplyingToHousing(null);
          setActiveTab('my-applications');
        }}
      />
    );
  }

  // IF APPLYING TO JOB, SHOW THAT FLOW INSTEAD
  if (applyingToJob) {
    return (
      <JobApplicationFlow
        job={applyingToJob}
        onClose={() => setApplyingToJob(null)}
        onApply={(applicationData) => {
          // Add to list with new ID
          const newApp = {
            id: Date.now(),
            company: applicationData.company,
            position: applicationData.position,
            salary: applicationData.salary,
            status: 'under_review',
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            appliedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
          };
          setJobApplications([...jobApplications, newApp]);
          setApplyingToJob(null);
          setActiveTab('my-applications');
        }}
      />
    );
  }

  // IF CLAIMING MARKETPLACE ITEM, SHOW THAT FLOW INSTEAD
  if (selectedMarketplaceItem) {
    const item = availableMarketplaceItems.find(i => i.id === selectedMarketplaceItem);
    if (!item) {
      setSelectedMarketplaceItem(null);
      return null;
    }

    return (
      <MarketplaceClaimFlow
        item={item}
        onClose={() => setSelectedMarketplaceItem(null)}
        claimsRemaining={claimsRemaining - claimsUsed}
        onClaim={(claimData) => {
          // Add to marketplace claims list
          const newClaim = {
            id: Date.now(),
            item: claimData.item,
            donor: claimData.donor,
            status: 'pending',
            pickupDate: claimData.pickupDate,
            claimedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
          };
          setMarketplaceClaims([...marketplaceClaims, newClaim]);
          setSelectedMarketplaceItem(null);
          setActiveTab('my-applications');
        }}
      />
    );
  }

  // IF BECOMING PROVIDER, SHOW THAT FLOW INSTEAD
  if (becomingProvider) {
    return (
      <BecomeProviderFlow
        onClose={() => setBecomingProvider(false)}
        onBecomeProvider={(providerData) => {
          // Add to list with new ID
          const newProvider = {
            id: Date.now(),
            name: providerData.name,
            service: providerData.service,
            location: providerData.location,
            contact: providerData.contact,
            description: providerData.description,
            status: 'pending'
          };
          setBecomingProvider(false);
          setActiveTab('services');
        }}
      />
    );
  }

  // IF BOOKING SERVICE, SHOW THAT FLOW INSTEAD
  if (bookingService) {
    return (
      <ServiceBookingFlow
        service={bookingService}
        onClose={() => setBookingService(null)}
        onBookService={(bookingData) => {
          // Add to list with new ID
          const newBooking = {
            id: Date.now(),
            service: bookingData.service,
            provider: bookingData.provider,
            date: bookingData.date,
            time: bookingData.time,
            status: 'pending'
          };
          setBookingService(null);
          setActiveTab('services');
        }}
      />
    );
  }

  // Mock data for AVAILABLE housing (what they can apply to)
  const availableHousing = generateHousingListings();

  // Mock data for AVAILABLE jobs (what they can apply to)
  const availableJobs = generateJobListings();

  // Mock data for AVAILABLE marketplace items
  const availableMarketplaceItems = [
    {
      id: 301,
      title: 'Full Bedroom Set (Queen)',
      category: 'Furniture',
      donor: 'Jennifer K.',
      donorScore: 892,
      location: 'Lincoln Park, Chicago',
      posted: '1 day ago',
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800',
      description: 'Queen bed frame, mattress, box spring, 2 nightstands, and dresser. Great condition!',
      condition: 'Excellent',
      claimsRemaining: hasFairPathPlus ? 7 : 3,
      requiresPickup: true
    },
    {
      id: 302,
      title: 'Professional Work Clothes Bundle (Men\'s L)',
      category: 'Clothing',
      donor: 'Michael R.',
      donorScore: 745,
      location: 'Downtown Chicago',
      posted: '3 hours ago',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800',
      description: '5 dress shirts, 3 pairs of slacks, 2 ties, 1 blazer. Perfect for interviews and work.',
      condition: 'Like New',
      claimsRemaining: hasFairPathPlus ? 7 : 3,
      requiresPickup: true
    },
    {
      id: 303,
      title: 'Complete Kitchen Starter Pack',
      category: 'Household',
      donor: 'Sarah T.',
      donorScore: 921,
      location: 'Wicker Park, Chicago',
      posted: '2 days ago',
      image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800',
      description: 'Pots, pans, plates, bowls, utensils, coffee maker, toaster. Everything you need!',
      condition: 'Good',
      claimsRemaining: hasFairPathPlus ? 7 : 3,
      requiresPickup: true
    },
    {
      id: 304,
      title: 'Living Room Couch + Coffee Table',
      category: 'Furniture',
      donor: 'David L.',
      donorScore: 683,
      location: 'Logan Square, Chicago',
      posted: '5 days ago',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
      description: 'Comfortable 3-seater couch (grey) and matching coffee table. Minor wear.',
      condition: 'Good',
      claimsRemaining: hasFairPathPlus ? 7 : 3,
      requiresPickup: true
    },
    {
      id: 305,
      title: 'Bike + Lock',
      category: 'Transportation',
      donor: 'Amanda P.',
      donorScore: 812,
      location: 'Pilsen, Chicago',
      posted: '1 week ago',
      image: 'https://images.unsplash.com/photo-1571333250630-f0230c320b6d?w=800',
      description: 'Men\'s hybrid bike in great condition. Includes U-lock and helmet.',
      condition: 'Excellent',
      claimsRemaining: hasFairPathPlus ? 7 : 3,
      requiresPickup: true
    },
  ];

  const claimsRemaining = hasFairPathPlus ? 7 : 3;
  const claimsUsed = marketplaceClaims.length;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'showing_scheduled':
      case 'interview_scheduled':
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-[#A8F32C]" />;
      case 'screening':
      case 'under_review':
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'denied':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-white/40" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'showing_scheduled':
        return <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30">Showing Scheduled</Badge>;
      case 'interview_scheduled':
        return <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30">Interview Scheduled</Badge>;
      case 'screening':
        return <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">Screening</Badge>;
      case 'under_review':
        return <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">Under Review</Badge>;
      case 'applied':
        return <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/30">Applied</Badge>;
      case 'denied':
        return <Badge className="bg-red-500/20 text-red-500 border-red-500/30">Denied</Badge>;
      case 'approved':
        return <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30">Approved</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">Pending</Badge>;
      case 'completed':
        return <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/30">Completed</Badge>;
      default:
        return <Badge className="bg-white/10 text-white/60 border-white/20">Unknown</Badge>;
    }
  };

  const handleApplyHousing = (housingId: number) => {
    const housing = availableHousing.find(h => h.id === housingId);
    if (housing) {
      setApplyingToHousing(housing);
    }
  };

  const handleApplyJob = (jobId: number) => {
    const job = availableJobs.find(j => j.id === jobId);
    if (job) {
      setApplyingToJob(job);
    }
  };

  const handleClaimItem = (itemId: number) => {
    const remaining = claimsRemaining - claimsUsed;
    if (remaining <= 0) {
      alert('You\'ve used all your claims this month! Upgrade to FairPath+ for more.');
      return;
    }
    // Open the marketplace claim flow
    setSelectedMarketplaceItem(itemId);
  };

  const handleBecomeProvider = () => {
    setBecomingProvider(true);
  };

  const handleBookService = (service: any) => {
    setBookingService(service);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/5 bg-[#121212] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <LogoFinal size="md" />
            <div className="flex items-center gap-4">
              <Button 
                onClick={() => onNavigate?.('notifications')}
                variant="outline" 
                className="border-white/20 text-white relative"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#A8F32C] rounded-full text-xs text-black flex items-center justify-center">
                  3
                </span>
              </Button>
              <Button 
                onClick={() => onNavigate?.('settings')}
                variant="outline" 
                className="border-white/20 text-white"
              >
                <Settings className="h-5 w-5" />
              </Button>
              <Button 
                onClick={() => onNavigate?.('profile')}
                variant="outline" 
                className="border-white/20 text-white"
              >
                <User className="h-5 w-5" />
              </Button>
              <Button 
                onClick={logout}
                variant="outline" 
                className="border-white/20 text-white"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl mb-2 text-white">Welcome back, Marcus!</h1>
          <p className="text-xl text-white/60">Here's what's happening with your reentry journey</p>
        </div>

        {/* FairPath+ Upsell (if not subscribed) */}
        {!hasFairPathPlus && (
          <Card className="bg-gradient-to-r from-[#A8F32C]/20 to-transparent border-[#A8F32C]/30 p-6 mb-8">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#A8F32C]/20 flex items-center justify-center flex-shrink-0">
                  <Zap className="h-6 w-6 text-[#A8F32C]" />
                </div>
                <div>
                  <h3 className="text-xl mb-2 text-white">Upgrade to FairPath+ and Save!</h3>
                  <p className="text-white/80 mb-4">
                    Get $10 off every FastTrack application + 7 marketplace claims/month for just $2/month
                  </p>
                  <div className="flex gap-4">
                    <Button 
                      className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
                      onClick={() => onNavigate?.('subscription-upgrade')}
                    >
                      Upgrade Now - $2/month
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-white/20 text-white"
                      onClick={() => onNavigate?.('subscription-compare')}
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* FairPath Score */}
        <Card className="bg-gradient-to-br from-[#121212] to-black border-[#A8F32C]/30 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-5 w-5 text-[#A8F32C]" />
                <h3 className="text-xl text-white">Your FairPath Score</h3>
              </div>
              <p className="text-white/60 text-sm mb-4">
                This score helps landlords and employers see your progress
              </p>
              <div className="flex items-end gap-3">
                <div className="text-5xl text-[#A8F32C]">{fairPathScore}</div>
                <div className="text-white/60 mb-2">/ {scoreMax}</div>
              </div>
            </div>
            <div className="text-right">
              <Progress value={scorePercentage} className="w-64 h-3 mb-2" />
              <div className="text-sm text-white/60">Good standing</div>
            </div>
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-[#121212] border-white/10 p-6 cursor-pointer hover:border-[#A8F32C]/50 transition-all" onClick={() => setActiveTab('housing')}>
            <div className="flex items-center justify-between mb-4">
              <Home className="h-8 w-8 text-[#A8F32C]" />
              <ChevronRight className="h-5 w-5 text-white/40" />
            </div>
            <div className="text-3xl mb-2 text-white">{housingApplications.length}</div>
            <div className="text-white/60 text-sm">Housing Applications</div>
          </Card>

          <Card className="bg-[#121212] border-white/10 p-6 cursor-pointer hover:border-blue-500/50 transition-all" onClick={() => setActiveTab('jobs')}>
            <div className="flex items-center justify-between mb-4">
              <Briefcase className="h-8 w-8 text-blue-400" />
              <ChevronRight className="h-5 w-5 text-white/40" />
            </div>
            <div className="text-3xl mb-2 text-white">{jobApplications.length}</div>
            <div className="text-white/60 text-sm">Job Applications</div>
          </Card>

          <Card className="bg-[#121212] border-white/10 p-6 cursor-pointer hover:border-purple-500/50 transition-all" onClick={() => setActiveTab('marketplace')}>
            <div className="flex items-center justify-between mb-4">
              <ShoppingBag className="h-8 w-8 text-purple-400" />
              <ChevronRight className="h-5 w-5 text-white/40" />
            </div>
            <div className="text-3xl mb-2 text-white">{claimsRemaining - claimsUsed}</div>
            <div className="text-white/60 text-sm">Claims Remaining</div>
          </Card>

          <Card className="bg-[#121212] border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="h-8 w-8 text-yellow-400" />
            </div>
            <div className="text-3xl mb-2 text-white">{housingApplications.filter(a => a.status === 'showing_scheduled').length + jobApplications.filter(a => a.status === 'interview_scheduled').length}</div>
            <div className="text-white/60 text-sm">Upcoming Events</div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-white/10">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'border-[#A8F32C] text-[#A8F32C]'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            <TrendingUp className="h-4 w-4" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('housing')}
            className={`px-6 py-3 border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'housing'
                ? 'border-[#A8F32C] text-[#A8F32C]'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            <Home className="h-4 w-4" />
            Housing
          </button>
          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-6 py-3 border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'jobs'
                ? 'border-[#A8F32C] text-[#A8F32C]'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            <Briefcase className="h-4 w-4" />
            Jobs
          </button>
          <button
            onClick={() => setActiveTab('marketplace')}
            className={`px-6 py-3 border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'marketplace'
                ? 'border-[#A8F32C] text-[#A8F32C]'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            <ShoppingBag className="h-4 w-4" />
            Marketplace
          </button>
          <button
            onClick={() => setActiveTab('my-applications')}
            className={`px-6 py-3 border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'my-applications'
                ? 'border-[#A8F32C] text-[#A8F32C]'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            <CheckCircle className="h-4 w-4" />
            My Applications
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`px-6 py-3 border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'services'
                ? 'border-[#A8F32C] text-[#A8F32C]'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            <Wrench className="h-4 w-4" />
            Services
          </button>
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Upcoming Events */}
            <Card className="bg-[#121212] border-white/10 p-6">
              <h2 className="text-2xl mb-4 text-white">Upcoming Events</h2>
              <div className="space-y-3">
                {housingApplications.filter(a => a.status === 'showing_scheduled').map((app) => (
                  <div key={app.id} className="bg-black/50 border border-[#A8F32C]/30 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(app.status)}
                      <div>
                        <div className="text-white mb-1">{app.address}</div>
                        <div className="text-sm text-white/60">{app.date} at {app.time}</div>
                      </div>
                    </div>
                    {getStatusBadge(app.status)}
                  </div>
                ))}
                {jobApplications.filter(a => a.status === 'interview_scheduled').map((app) => (
                  <div key={app.id} className="bg-black/50 border border-[#A8F32C]/30 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(app.status)}
                      <div>
                        <div className="text-white mb-1">{app.company} - {app.position}</div>
                        <div className="text-sm text-white/60">{app.date}</div>
                      </div>
                    </div>
                    {getStatusBadge(app.status)}
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-[#A8F32C]/10 to-transparent border-[#A8F32C]/30 p-6 cursor-pointer hover:border-[#A8F32C]/60 transition-all" onClick={() => setActiveTab('housing')}>
                <Home className="h-10 w-10 text-[#A8F32C] mb-4" />
                <h3 className="text-xl mb-2 text-white">Find Housing</h3>
                <p className="text-white/60 mb-4">Browse {availableHousing.length} felony-friendly apartments</p>
                <Button className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">
                  Browse Housing
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Card>

              <Card className="bg-gradient-to-br from-blue-500/10 to-transparent border-blue-500/30 p-6 cursor-pointer hover:border-blue-500/60 transition-all" onClick={() => setActiveTab('jobs')}>
                <Briefcase className="h-10 w-10 text-blue-400 mb-4" />
                <h3 className="text-xl mb-2 text-white">Find Jobs</h3>
                <p className="text-white/60 mb-4">Browse {availableJobs.length} second-chance jobs</p>
                <Button className="w-full bg-blue-500 text-white hover:bg-blue-600">
                  Browse Jobs
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500/10 to-transparent border-purple-500/30 p-6 cursor-pointer hover:border-purple-500/60 transition-all" onClick={() => setActiveTab('marketplace')}>
                <ShoppingBag className="h-10 w-10 text-purple-400 mb-4" />
                <h3 className="text-xl mb-2 text-white">Marketplace</h3>
                <p className="text-white/60 mb-4">{availableMarketplaceItems.length} free items available</p>
                <Button className="w-full bg-purple-500 text-white hover:bg-purple-600">
                  Browse Items
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Card>
            </div>

            {/* New Quick Actions Row - Subscription & Gigs */}
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              {!hasFairPathPlus && (
                <Card className="bg-gradient-to-br from-[#A8F32C]/10 to-transparent border-[#A8F32C]/30 p-6 cursor-pointer hover:border-[#A8F32C]/60 transition-all" onClick={() => onNavigate?.('subscription-compare')}>
                  <div className="flex items-center gap-3 mb-4">
                    <Zap className="h-10 w-10 text-[#A8F32C]" />
                    <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30">
                      SAVE $10 PER APPLICATION
                    </Badge>
                  </div>
                  <h3 className="text-xl mb-2 text-white">Upgrade to FairPath+</h3>
                  <p className="text-white/60 mb-4">Get FastTrack for $65, 7 marketplace claims/month, and more benefits</p>
                  <Button className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">
                    Only $2/month
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Card>
              )}

              <Card className="bg-gradient-to-br from-green-500/10 to-transparent border-green-500/30 p-6 cursor-pointer hover:border-green-500/60 transition-all" onClick={() => onNavigate?.('gig-marketplace')}>
                <Wrench className="h-10 w-10 text-green-400 mb-4" />
                <h3 className="text-xl mb-2 text-white">Find Local Services</h3>
                <p className="text-white/60 mb-4">Hire background-verified workers for moving, handyman, repairs & more</p>
                <Button className="w-full bg-green-500 text-white hover:bg-green-600">
                  Browse Services
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Card>
            </div>
          </div>
        )}

        {/* HOUSING TAB */}
        {activeTab === 'housing' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl text-white">Felony-Friendly Housing</h2>
              <div className="flex gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                  <Input placeholder="Search by location..." className="pl-10 bg-[#121212] border-white/20 text-white w-64" />
                </div>
                <Button variant="outline" className="border-white/20 text-white">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {availableHousing.map((housing) => (
                <Card key={housing.id} className="bg-[#121212] border-white/10 overflow-hidden hover:border-[#A8F32C]/50 transition-all">
                  <img src={housing.image} alt={housing.address} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl text-white mb-1">{housing.address}</h3>
                        <div className="text-sm text-white/60">{housing.landlord}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl text-[#A8F32C]">${housing.rent}</div>
                        <div className="text-xs text-white/60">/month</div>
                      </div>
                    </div>

                    <div className="flex gap-4 mb-3 text-sm text-white/60">
                      <div>{housing.bedrooms} bed</div>
                      <div>{housing.bathrooms} bath</div>
                      <div>{housing.sqft} sqft</div>
                    </div>

                    <p className="text-white/80 text-sm mb-3">{housing.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {housing.amenities.map((amenity, idx) => (
                        <Badge key={idx} className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                          {amenity}
                        </Badge>
                      ))}
                    </div>

                    <div className="bg-black/50 border border-white/10 rounded-lg p-3 mb-4">
                      <div className="text-xs text-white/60 mb-1">Accepted Convictions:</div>
                      {housing.acceptedConvictions.map((type, idx) => (
                        <div key={idx} className="text-sm text-white flex items-center gap-1">
                          <CheckCircle className="h-3 w-3 text-[#A8F32C]" />
                          {type}
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <Button 
                        className="flex-1 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
                        onClick={() => handleApplyHousing(housing.id)}
                      >
                        FastTrack Apply - ${housing.fastTrackPrice}
                      </Button>
                      <Button variant="outline" className="border-white/20 text-white">
                        Details
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* JOBS TAB */}
        {activeTab === 'jobs' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl text-white">Second-Chance Jobs</h2>
              <div className="flex gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                  <Input placeholder="Search jobs..." className="pl-10 bg-[#121212] border-white/20 text-white w-64" />
                </div>
                <Button variant="outline" className="border-white/20 text-white">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {availableJobs.map((job) => (
                <Card key={job.id} className="bg-[#121212] border-white/10 p-6 hover:border-blue-500/50 transition-all">
                  <div className="flex items-start gap-6">
                    <img src={job.logo} alt={job.company} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-2xl text-white mb-1">{job.position}</h3>
                          <div className="text-white/60 mb-2">{job.company}</div>
                          <div className="flex gap-3 text-sm text-white/60">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {job.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {job.posted}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl text-blue-400 mb-1">{job.salary}</div>
                          <div className="text-sm text-white/60">{job.type}</div>
                        </div>
                      </div>

                      <p className="text-white/80 mb-4">{job.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.secondChanceFriendly && (
                          <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30">
                            <Shield className="mr-1 h-3 w-3" />
                            Second Chance Friendly
                          </Badge>
                        )}
                        {job.wotcEligible && (
                          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                            <Award className="mr-1 h-3 w-3" />
                            WOTC Eligible
                          </Badge>
                        )}
                        <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                          {job.shift}
                        </Badge>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="bg-black/50 border border-white/10 rounded-lg p-3">
                          <div className="text-xs text-white/60 mb-2">Benefits:</div>
                          <div className="space-y-1">
                            {job.benefits.slice(0, 3).map((benefit, idx) => (
                              <div key={idx} className="text-sm text-white flex items-center gap-1">
                                <CheckCircle className="h-3 w-3 text-blue-400" />
                                {benefit}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-black/50 border border-white/10 rounded-lg p-3">
                          <div className="text-xs text-white/60 mb-2">Requirements:</div>
                          <div className="space-y-1">
                            {job.requirements.slice(0, 3).map((req, idx) => (
                              <div key={idx} className="text-sm text-white flex items-center gap-1">
                                <AlertCircle className="h-3 w-3 text-yellow-400" />
                                {req}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button 
                          className="bg-blue-500 text-white hover:bg-blue-600"
                          onClick={() => handleApplyJob(job.id)}
                        >
                          Apply Now (Free)
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                        <Button variant="outline" className="border-white/20 text-white">
                          Save for Later
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* MARKETPLACE TAB */}
        {activeTab === 'marketplace' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl text-white mb-1">Free Marketplace</h2>
                <p className="text-white/60">
                  You have <span className="text-[#A8F32C]">{claimsRemaining - claimsUsed}</span> claims remaining this month
                </p>
              </div>
              <div className="flex gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                  <Input placeholder="Search items..." className="pl-10 bg-[#121212] border-white/20 text-white w-64" />
                </div>
                <Button variant="outline" className="border-white/20 text-white">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableMarketplaceItems.map((item) => (
                <Card key={item.id} className="bg-[#121212] border-white/10 overflow-hidden hover:border-purple-500/50 transition-all">
                  <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <Badge className="mb-3 bg-purple-500/20 text-purple-400 border-purple-500/30">
                      {item.category}
                    </Badge>
                    <h3 className="text-lg text-white mb-2">{item.title}</h3>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#A8F32C] to-blue-500 flex items-center justify-center">
                        <span className="text-xs text-black">{item.donor.charAt(0)}</span>
                      </div>
                      <div className="text-sm text-white/60">
                        by {item.donor}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-white/60 ml-auto">
                        <Star className="h-3 w-3 text-yellow-400" />
                        {item.donorScore}
                      </div>
                    </div>

                    <p className="text-sm text-white/80 mb-3">{item.description}</p>

                    <div className="flex items-center gap-4 text-xs text-white/60 mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {item.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {item.posted}
                      </div>
                    </div>

                    <div className="flex gap-2 mb-3">
                      <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30">
                        {item.condition}
                      </Badge>
                      {item.requiresPickup && (
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                          Pickup Required
                        </Badge>
                      )}
                    </div>

                    <Button 
                      className="w-full bg-purple-500 text-white hover:bg-purple-600"
                      onClick={() => handleClaimItem(item.id)}
                      disabled={claimsRemaining - claimsUsed <= 0}
                    >
                      <Heart className="mr-2 h-4 w-4" />
                      Claim Item (FREE)
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* MY APPLICATIONS TAB */}
        {activeTab === 'my-applications' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl text-white">My Applications</h2>
              <div className="flex gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                  <Input placeholder="Search applications..." className="pl-10 bg-[#121212] border-white/20 text-white w-64" />
                </div>
                <Button variant="outline" className="border-white/20 text-white">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {/* Housing Applications */}
              <Card className="bg-[#121212] border-white/10 p-6">
                <h3 className="text-xl text-white mb-4">Housing Applications</h3>
                <div className="space-y-3">
                  {housingApplications.map((app) => (
                    <div key={app.id} className="bg-black/50 border border-[#A8F32C]/30 rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(app.status)}
                        <div>
                          <div className="text-white mb-1">{app.address}</div>
                          <div className="text-sm text-white/60">{app.date} at {app.time}</div>
                        </div>
                      </div>
                      {getStatusBadge(app.status)}
                    </div>
                  ))}
                </div>
              </Card>

              {/* Job Applications */}
              <Card className="bg-[#121212] border-white/10 p-6">
                <h3 className="text-xl text-white mb-4">Job Applications</h3>
                <div className="space-y-3">
                  {jobApplications.map((app) => (
                    <div key={app.id} className="bg-black/50 border border-[#A8F32C]/30 rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(app.status)}
                        <div>
                          <div className="text-white mb-1">{app.company} - {app.position}</div>
                          <div className="text-sm text-white/60">{app.date}</div>
                        </div>
                      </div>
                      {getStatusBadge(app.status)}
                    </div>
                  ))}
                </div>
              </Card>

              {/* Marketplace Claims */}
              <Card className="bg-[#121212] border-white/10 p-6">
                <h3 className="text-xl text-white mb-4">Marketplace Claims</h3>
                <div className="space-y-3">
                  {marketplaceClaims.map((claim) => (
                    <div key={claim.id} className="bg-black/50 border border-[#A8F32C]/30 rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(claim.status)}
                        <div>
                          <div className="text-white mb-1">{claim.item}</div>
                          <div className="text-sm text-white/60">{claim.pickupDate}</div>
                        </div>
                      </div>
                      {getStatusBadge(claim.status)}
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* SERVICES TAB */}
        {activeTab === 'services' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl text-white">Available Services</h2>
              <div className="flex gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                  <Input placeholder="Search services..." className="pl-10 bg-[#121212] border-white/20 text-white w-64" />
                </div>
                <Button variant="outline" className="border-white/20 text-white">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <ServicesTab 
                onBookService={handleBookService}
                onBecomeProvider={handleBecomeProvider}
                isProvider={false}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}