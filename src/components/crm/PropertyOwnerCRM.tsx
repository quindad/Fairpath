import { useState } from 'react';
import { Home, Plus, Users, DollarSign, TrendingUp, MapPin, Bed, Bath, Square, Calendar, CheckCircle2, Clock, Eye, MessageSquare, Filter, Search, Download, Settings, Bell, Shield, Star, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

interface PropertyOwnerCRMProps {
  onNavigate: (page: string) => void;
}

export default function PropertyOwnerCRM({ onNavigate }: PropertyOwnerCRMProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'listings' | 'applications' | 'tenants' | 'revenue'>('overview');
  const [selectedPlatform, setSelectedPlatform] = useState<'all' | 'faf' | 'fav'>('all');
  const [selectedApplication, setSelectedApplication] = useState<any | null>(null);
  const [selectedListing, setSelectedListing] = useState<any | null>(null);

  const stats = {
    activeListings: 8,
    totalApplications: 67,
    currentTenants: 12,
    monthlyRevenue: 18600
  };

  const listings = [
    {
      id: 1,
      address: '123 Main St, Dallas, TX 75201',
      rent: 1800,
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1400,
      platforms: ['faf', 'fav'],
      applications: { faf: 12, fav: 5 },
      status: 'available',
      fastTrackEnabled: true,
      felonyFriendly: true,
      bahCompatible: true,
      bahRate: 2100,
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400'
    },
    {
      id: 2,
      address: '456 Oak Ave, Houston, TX 77002',
      rent: 2200,
      bedrooms: 4,
      bathrooms: 2.5,
      sqft: 1800,
      platforms: ['faf', 'fav'],
      applications: { faf: 8, fav: 9 },
      status: 'available',
      fastTrackEnabled: true,
      felonyFriendly: true,
      bahCompatible: true,
      bahRate: 2400,
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400'
    },
    {
      id: 3,
      address: '789 Elm St, San Antonio, TX 78201',
      rent: 1500,
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1100,
      platforms: ['faf'],
      applications: { faf: 15, fav: 0 },
      status: 'available',
      fastTrackEnabled: true,
      felonyFriendly: true,
      bahCompatible: false,
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400'
    }
  ];

  const applications = [
    {
      id: 1,
      applicant: 'Marcus Johnson',
      platform: 'faf',
      property: '123 Main St, Dallas, TX',
      rent: 1800,
      appliedDate: '2024-12-01',
      status: 'pending',
      fastTrack: true,
      fastTrackPaid: 75,
      income: 52000,
      employmentStatus: 'Employed',
      employer: 'ABC Logistics',
      convictionType: 'Non-violent felony',
      releaseDate: '2022-03-15',
      backgroundCheckStatus: 'completed',
      creditScore: 620
    },
    {
      id: 2,
      applicant: 'Sarah Martinez',
      platform: 'fav',
      property: '456 Oak Ave, Houston, TX',
      rent: 2200,
      appliedDate: '2024-12-02',
      status: 'approved',
      fastTrack: true,
      fastTrackPaid: 75,
      income: 68000,
      employmentStatus: 'Active Duty',
      employer: 'US Army',
      branch: 'Army',
      bahEligible: true,
      bahAmount: 2400,
      backgroundCheckStatus: 'completed',
      creditScore: 710,
      clearance: 'Secret'
    },
    {
      id: 3,
      applicant: 'DeShawn Williams',
      platform: 'faf',
      property: '789 Elm St, San Antonio, TX',
      rent: 1500,
      appliedDate: '2024-12-03',
      status: 'reviewing',
      fastTrack: true,
      fastTrackPaid: 75,
      income: 45000,
      employmentStatus: 'Employed',
      employer: 'XYZ Manufacturing',
      convictionType: 'Drug offense',
      releaseDate: '2021-08-20',
      backgroundCheckStatus: 'pending',
      creditScore: 580
    },
    {
      id: 4,
      applicant: 'James Rodriguez',
      platform: 'fav',
      property: '123 Main St, Dallas, TX',
      rent: 1800,
      appliedDate: '2024-12-03',
      status: 'pending',
      fastTrack: false,
      income: 55000,
      employmentStatus: 'Veteran - Employed',
      employer: 'Security Solutions Inc',
      branch: 'Marines',
      bahEligible: false,
      backgroundCheckStatus: 'completed',
      creditScore: 650
    }
  ];

  const tenants = [
    {
      id: 1,
      name: 'John Davis',
      platform: 'faf',
      property: '321 Pine St, Austin, TX',
      rent: 1600,
      moveInDate: '2024-06-01',
      leaseEnd: '2025-06-01',
      paymentStatus: 'current',
      lastPayment: '2024-12-01'
    },
    {
      id: 2,
      name: 'Maria Garcia',
      platform: 'fav',
      property: '654 Maple Dr, Dallas, TX',
      rent: 1950,
      moveInDate: '2024-08-15',
      leaseEnd: '2025-08-15',
      paymentStatus: 'current',
      lastPayment: '2024-12-01',
      bahBacked: true
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => onNavigate('home')}
                variant="ghost"
                className="text-white/60 hover:text-white"
              >
                ← Back to Website
              </Button>
              <div className="h-8 w-px bg-gray-700"></div>
              <Home className="h-8 w-8 text-green-500" />
              <div>
                <h1 className="text-xl font-bold">Property Owner CRM</h1>
                <p className="text-sm text-white/60">Smith Rentals LLC</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
                <Settings className="h-5 w-5" />
              </Button>
              <Button 
                onClick={() => onNavigate('post-property')}
                className="bg-green-600 hover:bg-green-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                List New Property
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-6 mt-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 border-b-2 transition-colors ${
                activeTab === 'overview'
                  ? 'border-green-500 text-white'
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('listings')}
              className={`pb-3 border-b-2 transition-colors ${
                activeTab === 'listings'
                  ? 'border-green-500 text-white'
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
            >
              My Listings
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`pb-3 border-b-2 transition-colors ${
                activeTab === 'applications'
                  ? 'border-green-500 text-white'
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
            >
              Applications
            </button>
            <button
              onClick={() => setActiveTab('tenants')}
              className={`pb-3 border-b-2 transition-colors ${
                activeTab === 'tenants'
                  ? 'border-green-500 text-white'
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
            >
              Current Tenants
            </button>
            <button
              onClick={() => setActiveTab('revenue')}
              className={`pb-3 border-b-2 transition-colors ${
                activeTab === 'revenue'
                  ? 'border-green-500 text-white'
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
            >
              Revenue
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Platform Filter */}
        <div className="mb-6 flex items-center gap-3">
          <span className="text-sm text-white/60">Filter by platform:</span>
          <div className="flex gap-2">
            <Button
              onClick={() => setSelectedPlatform('all')}
              variant={selectedPlatform === 'all' ? 'default' : 'outline'}
              size="sm"
            >
              All Platforms
            </Button>
            <Button
              onClick={() => setSelectedPlatform('faf')}
              variant={selectedPlatform === 'faf' ? 'default' : 'outline'}
              size="sm"
              className={selectedPlatform === 'faf' ? 'bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90' : ''}
            >
              Friend A Felon
            </Button>
            <Button
              onClick={() => setSelectedPlatform('fav')}
              variant={selectedPlatform === 'fav' ? 'default' : 'outline'}
              size="sm"
              className={selectedPlatform === 'fav' ? 'bg-[#FFD700] text-black hover:bg-[#FFD700]/90' : ''}
            >
              Friend A Veteran
            </Button>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Home className="h-5 w-5 text-green-400" />
                    <TrendingUp className="h-4 w-4 text-green-400" />
                  </div>
                  <p className="text-3xl font-bold">{stats.activeListings}</p>
                  <p className="text-sm text-white/60">Active Listings</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Users className="h-5 w-5 text-purple-400" />
                    <TrendingUp className="h-4 w-4 text-green-400" />
                  </div>
                  <p className="text-3xl font-bold">{stats.totalApplications}</p>
                  <p className="text-sm text-white/60">Total Applications</p>
                  <div className="flex gap-2 mt-2">
                    <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30">35 FAF</Badge>
                    <Badge className="bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30">32 FAV</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <CheckCircle2 className="h-5 w-5 text-blue-400" />
                    <TrendingUp className="h-4 w-4 text-green-400" />
                  </div>
                  <p className="text-3xl font-bold">{stats.currentTenants}</p>
                  <p className="text-sm text-white/60">Current Tenants</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <DollarSign className="h-5 w-5 text-yellow-400" />
                    <TrendingUp className="h-4 w-4 text-green-400" />
                  </div>
                  <p className="text-3xl font-bold">${(stats.monthlyRevenue / 1000).toFixed(1)}K</p>
                  <p className="text-sm text-white/60">Monthly Revenue</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Applications */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Recent Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applications.slice(0, 5).map(app => (
                    <div key={app.id} className="flex items-center justify-between p-4 bg-black/30 rounded-lg border border-gray-800">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center font-bold">
                          {app.applicant.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-bold">{app.applicant}</p>
                            <Badge className={
                              app.platform === 'faf'
                                ? 'bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30'
                                : 'bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30'
                            }>
                              {app.platform === 'faf' ? 'Friend A Felon' : 'Friend A Veteran'}
                            </Badge>
                            {app.fastTrack && (
                              <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                                FastTrack
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-white/60">{app.property}</p>
                          <p className="text-xs text-white/40">Applied: {new Date(app.appliedDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-lg font-bold">${app.rent}/mo</p>
                          <Badge className={
                            app.status === 'approved' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                            app.status === 'reviewing' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                            'bg-blue-500/20 text-blue-400 border-blue-500/30'
                          }>
                            {app.status}
                          </Badge>
                        </div>
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => setSelectedApplication(app)}
                        >
                          Review
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* FastTrack Revenue */}
            <Card className="bg-gradient-to-br from-orange-500/20 to-transparent border-orange-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-orange-400" />
                  FastTrack Revenue This Month
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-3xl font-bold text-orange-400">$450</p>
                    <p className="text-sm text-white/60">Your 60% Share</p>
                    <p className="text-xs text-white/40 mt-1">From 10 FastTrack applications</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">$750</p>
                    <p className="text-sm text-white/60">Total FastTrack Fees</p>
                    <p className="text-xs text-white/40 mt-1">$75 per application × 10</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">$150</p>
                    <p className="text-sm text-white/60">Impact Fund (20%)</p>
                    <p className="text-xs text-white/40 mt-1">Supporting reentry programs</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Listings Tab */}
        {activeTab === 'listings' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Property Listings</h2>
              <div className="flex gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                  <input
                    type="text"
                    placeholder="Search properties..."
                    className="pl-10 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder:text-white/40"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {listings.map(listing => (
                <Card key={listing.id} className="bg-gray-900 border-gray-800 overflow-hidden">
                  <div className="aspect-video relative">
                    <img src={listing.image} alt={listing.address} className="w-full h-full object-cover" />
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-green-500 text-white border-green-600">
                        {listing.status}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold mb-2">{listing.address}</h3>
                      <div className="flex items-center gap-4 text-sm text-white/60">
                        <span className="flex items-center gap-1">
                          <Bed className="h-4 w-4" />
                          {listing.bedrooms} bed
                        </span>
                        <span className="flex items-center gap-1">
                          <Bath className="h-4 w-4" />
                          {listing.bathrooms} bath
                        </span>
                        <span className="flex items-center gap-1">
                          <Square className="h-4 w-4" />
                          {listing.sqft} sqft
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-2xl font-bold text-green-400">${listing.rent}/mo</p>
                    </div>

                    <div className="mb-4 flex flex-wrap gap-2">
                      {listing.platforms.includes('faf') && (
                        <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30">
                          Friend A Felon
                        </Badge>
                      )}
                      {listing.platforms.includes('fav') && (
                        <Badge className="bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30">
                          Friend A Veteran
                        </Badge>
                      )}
                      {listing.fastTrackEnabled && (
                        <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                          FastTrack Enabled
                        </Badge>
                      )}
                      {listing.felonyFriendly && (
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                          Felony Friendly
                        </Badge>
                      )}
                      {listing.bahCompatible && (
                        <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                          BAH Compatible (${listing.bahRate})
                        </Badge>
                      )}
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-white/60 mb-2">Applications:</p>
                      <div className="flex gap-3">
                        {listing.applications.faf > 0 && (
                          <div className="flex-1 bg-[#A8F32C]/10 p-2 rounded text-center">
                            <p className="text-xl font-bold">{listing.applications.faf}</p>
                            <p className="text-xs text-white/60">FAF</p>
                          </div>
                        )}
                        {listing.applications.fav > 0 && (
                          <div className="flex-1 bg-[#FFD700]/10 p-2 rounded text-center">
                            <p className="text-xl font-bold">{listing.applications.fav}</p>
                            <p className="text-xs text-white/60">FAV</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        onClick={() => setSelectedListing(listing)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Applications
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => onNavigate('post-property')}
                      >
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Applications Tab */}
        {activeTab === 'applications' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">All Applications</h2>
              <div className="flex gap-3">
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              {applications.map(app => (
                <Card key={app.id} className="bg-gray-900 border-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center font-bold text-lg">
                          {app.applicant.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold">{app.applicant}</h3>
                            <Badge className={
                              app.platform === 'faf'
                                ? 'bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30'
                                : 'bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30'
                            }>
                              {app.platform === 'faf' ? 'Friend A Felon' : 'Friend A Veteran'}
                            </Badge>
                            {app.fastTrack && (
                              <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                                FastTrack ($75 paid)
                              </Badge>
                            )}
                            <Badge className={
                              app.status === 'approved' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                              app.status === 'reviewing' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                              'bg-blue-500/20 text-blue-400 border-blue-500/30'
                            }>
                              {app.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-white/80 mb-2">
                            <MapPin className="h-4 w-4 inline mr-1" />
                            {app.property}
                          </p>
                          <p className="text-sm text-white/60 mb-3">Applied: {new Date(app.appliedDate).toLocaleDateString()}</p>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-black/30 p-3 rounded border border-gray-800">
                              <p className="text-xs text-white/60 mb-2">Employment & Income</p>
                              <p className="text-sm font-bold">{app.employmentStatus}</p>
                              <p className="text-sm text-white/70">{app.employer}</p>
                              <p className="text-sm text-green-400 mt-1">${app.income.toLocaleString()}/year</p>
                              <p className="text-xs text-white/40 mt-1">Credit Score: {app.creditScore}</p>
                            </div>

                            {app.platform === 'faf' ? (
                              <div className="bg-[#A8F32C]/10 p-3 rounded border border-[#A8F32C]/30">
                                <p className="text-xs text-white/60 mb-2">Background</p>
                                <p className="text-sm">{app.convictionType}</p>
                                <p className="text-xs text-white/40 mt-1">Released: {new Date(app.releaseDate!).toLocaleDateString()}</p>
                                <Badge className={
                                  app.backgroundCheckStatus === 'completed' ? 'bg-green-500/20 text-green-400 border-green-500/30 mt-2' :
                                  'bg-yellow-500/20 text-yellow-400 border-yellow-500/30 mt-2'
                                }>
                                  Background: {app.backgroundCheckStatus}
                                </Badge>
                              </div>
                            ) : (
                              <div className="bg-[#FFD700]/10 p-3 rounded border border-[#FFD700]/30">
                                <p className="text-xs text-white/60 mb-2">Military Background</p>
                                <p className="text-sm">{app.branch}</p>
                                {app.bahEligible && (
                                  <div className="mt-2">
                                    <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                                      BAH Eligible: ${app.bahAmount}/mo
                                    </Badge>
                                  </div>
                                )}
                                {app.clearance && (
                                  <p className="text-xs text-white/40 mt-1">Clearance: {app.clearance}</p>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="ml-6 flex flex-col gap-2">
                        <div className="text-right mb-3">
                          <p className="text-2xl font-bold text-green-400">${app.rent}/mo</p>
                          {app.fastTrack && (
                            <p className="text-xs text-orange-400 mt-1">+${(app.fastTrackPaid * 0.6).toFixed(0)} FastTrack revenue</p>
                          )}
                        </div>
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => setSelectedApplication(app)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Full Application
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => onNavigate('messages')}
                        >
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                        {app.status === 'pending' && (
                          <>
                            <Button 
                              size="sm" 
                              className="bg-blue-600 hover:bg-blue-700"
                              onClick={() => alert('Application approved! Tenant will be notified.')}
                            >
                              Approve
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                              onClick={() => alert('Application denied.')}
                            >
                              Deny
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Tenants Tab */}
        {activeTab === 'tenants' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Current Tenants</h2>

            <div className="grid gap-4">
              {tenants.map(tenant => (
                <Card key={tenant.id} className="bg-gray-900 border-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center font-bold text-lg">
                          {tenant.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold">{tenant.name}</h3>
                            <Badge className={
                              tenant.platform === 'faf'
                                ? 'bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30'
                                : 'bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30'
                            }>
                              {tenant.platform === 'faf' ? 'Friend A Felon' : 'Friend A Veteran'}
                            </Badge>
                            {tenant.bahBacked && (
                              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                                BAH Backed
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-white/80 mb-1">
                            <MapPin className="h-4 w-4 inline mr-1" />
                            {tenant.property}
                          </p>
                          <p className="text-sm text-white/60">
                            Lease: {new Date(tenant.moveInDate).toLocaleDateString()} - {new Date(tenant.leaseEnd).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-white/40 mt-1">
                            Last payment: {new Date(tenant.lastPayment).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-400">${tenant.rent}/mo</p>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 mt-2">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          {tenant.paymentStatus}
                        </Badge>
                        <div className="flex gap-2 mt-4">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => onNavigate('messages')}
                          >
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Message
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Revenue Tab */}
        {activeTab === 'revenue' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Revenue Analytics</h2>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-green-500/20 to-transparent border-green-500/30">
                <CardContent className="p-6">
                  <DollarSign className="h-8 w-8 text-green-400 mb-3" />
                  <p className="text-4xl font-bold text-green-400">${stats.monthlyRevenue.toLocaleString()}</p>
                  <p className="text-sm text-white/60">Monthly Rent Revenue</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500/20 to-transparent border-orange-500/30">
                <CardContent className="p-6">
                  <Star className="h-8 w-8 text-orange-400 mb-3" />
                  <p className="text-4xl font-bold text-orange-400">$450</p>
                  <p className="text-sm text-white/60">FastTrack Revenue</p>
                  <p className="text-xs text-white/40 mt-1">10 applications this month</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <TrendingUp className="h-8 w-8 text-blue-400 mb-3" />
                  <p className="text-4xl font-bold">${(stats.monthlyRevenue + 450).toLocaleString()}</p>
                  <p className="text-sm text-white/60">Total Monthly Income</p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Revenue Breakdown by Platform</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30">
                          Friend A Felon
                        </Badge>
                        <span className="text-sm text-white/60">7 tenants</span>
                      </div>
                      <span className="font-bold">$10,800 (58%)</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-[#A8F32C]" style={{ width: '58%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30">
                          Friend A Veteran
                        </Badge>
                        <span className="text-sm text-white/60">5 tenants (2 BAH-backed)</span>
                      </div>
                      <span className="font-bold">$7,800 (42%)</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-[#FFD700]" style={{ width: '42%' }}></div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
                  <p className="text-sm text-white/70">
                    <strong>Impact:</strong> 20% of your FastTrack revenue ($90) automatically goes to the FairPath Impact Fund, 
                    supporting reentry programs and veteran services.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Application Detail Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6">
          <div className="bg-gray-900 border border-gray-800 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center font-bold text-xl">
                    {selectedApplication.applicant.split(' ').map((n: string) => n[0]).join('')}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedApplication.applicant}</h2>
                    <Badge className={
                      selectedApplication.platform === 'faf'
                        ? 'bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30'
                        : 'bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30'
                    }>
                      {selectedApplication.platform === 'faf' ? 'Friend A Felon' : 'Friend A Veteran'}
                    </Badge>
                  </div>
                </div>
                <Button variant="ghost" onClick={() => setSelectedApplication(null)}>
                  <XCircle className="h-6 w-6" />
                </Button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-3">Property Details</h3>
                <div className="space-y-2">
                  <p><strong>Property:</strong> {selectedApplication.property}</p>
                  <p><strong>Rent:</strong> <span className="text-green-400">${selectedApplication.rent}/mo</span></p>
                  <p><strong>Applied:</strong> {new Date(selectedApplication.appliedDate).toLocaleDateString()}</p>
                  {selectedApplication.fastTrack && (
                    <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                      FastTrack Application - $75 paid (+${(selectedApplication.fastTrackPaid * 0.6).toFixed(0)} to you)
                    </Badge>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-3">Employment & Financial</h3>
                <div className="bg-black/30 p-4 rounded border border-gray-800">
                  <p><strong>Employment Status:</strong> {selectedApplication.employmentStatus}</p>
                  <p><strong>Employer:</strong> {selectedApplication.employer}</p>
                  <p><strong>Annual Income:</strong> <span className="text-green-400">${selectedApplication.income.toLocaleString()}</span></p>
                  <p><strong>Credit Score:</strong> {selectedApplication.creditScore}</p>
                  <Badge className={
                    selectedApplication.backgroundCheckStatus === 'completed' ? 'bg-green-500/20 text-green-400 border-green-500/30 mt-2' :
                    'bg-yellow-500/20 text-yellow-400 border-yellow-500/30 mt-2'
                  }>
                    Background Check: {selectedApplication.backgroundCheckStatus}
                  </Badge>
                </div>
              </div>

              {selectedApplication.platform === 'faf' && (
                <div>
                  <h3 className="text-lg font-bold mb-3">Background Information</h3>
                  <div className="bg-[#A8F32C]/10 p-4 rounded border border-[#A8F32C]/30">
                    <p><strong>Conviction Type:</strong> {selectedApplication.convictionType}</p>
                    <p><strong>Release Date:</strong> {new Date(selectedApplication.releaseDate).toLocaleDateString()}</p>
                  </div>
                </div>
              )}

              {selectedApplication.platform === 'fav' && (
                <div>
                  <h3 className="text-lg font-bold mb-3">Military Background</h3>
                  <div className="bg-[#FFD700]/10 p-4 rounded border border-[#FFD700]/30">
                    <p><strong>Branch:</strong> {selectedApplication.branch}</p>
                    {selectedApplication.bahEligible && (
                      <p><strong>BAH Eligible:</strong> <span className="text-purple-400">${selectedApplication.bahAmount}/mo</span></p>
                    )}
                    {selectedApplication.clearance && (
                      <p><strong>Security Clearance:</strong> {selectedApplication.clearance}</p>
                    )}
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                {selectedApplication.status === 'pending' && (
                  <>
                    <Button 
                      className="flex-1 bg-green-600 hover:bg-green-700" 
                      onClick={() => {
                        alert('Application approved! Tenant will be notified.');
                        setSelectedApplication(null);
                      }}
                    >
                      Approve Application
                    </Button>
                    <Button 
                      className="flex-1" 
                      variant="outline"
                      onClick={() => {
                        alert('Application denied.');
                        setSelectedApplication(null);
                      }}
                    >
                      Deny Application
                    </Button>
                  </>
                )}
                <Button className="flex-1" variant="outline" onClick={() => onNavigate('messages')}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Listing Detail Modal */}
      {selectedListing && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6">
          <div className="bg-gray-900 border border-gray-800 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="aspect-video relative">
              <img src={selectedListing.image} alt={selectedListing.address} className="w-full h-full object-cover" />
              <Button 
                variant="ghost" 
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70"
                onClick={() => setSelectedListing(null)}
              >
                <XCircle className="h-6 w-6" />
              </Button>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-3">{selectedListing.address}</h2>
                <div className="flex items-center gap-4 text-white/60 mb-4">
                  <span className="flex items-center gap-1">
                    <Bed className="h-4 w-4" />
                    {selectedListing.bedrooms} bed
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath className="h-4 w-4" />
                    {selectedListing.bathrooms} bath
                  </span>
                  <span className="flex items-center gap-1">
                    <Square className="h-4 w-4" />
                    {selectedListing.sqft} sqft
                  </span>
                </div>
                <p className="text-3xl font-bold text-green-400 mb-4">${selectedListing.rent}/mo</p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-3">Listing Features</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedListing.platforms.includes('faf') && (
                    <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30">
                      Friend A Felon
                    </Badge>
                  )}
                  {selectedListing.platforms.includes('fav') && (
                    <Badge className="bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30">
                      Friend A Veteran
                    </Badge>
                  )}
                  {selectedListing.fastTrackEnabled && (
                    <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                      FastTrack Enabled
                    </Badge>
                  )}
                  {selectedListing.felonyFriendly && (
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                      Felony Friendly
                    </Badge>
                  )}
                  {selectedListing.bahCompatible && (
                    <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                      BAH Compatible (${selectedListing.bahRate})
                    </Badge>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-3">Applications</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {selectedListing.applications.faf > 0 && (
                    <div className="bg-[#A8F32C]/10 p-4 rounded border border-[#A8F32C]/30 text-center">
                      <p className="text-3xl font-bold">{selectedListing.applications.faf}</p>
                      <p className="text-sm text-white/60">Friend A Felon</p>
                    </div>
                  )}
                  {selectedListing.applications.fav > 0 && (
                    <div className="bg-[#FFD700]/10 p-4 rounded border border-[#FFD700]/30 text-center">
                      <p className="text-3xl font-bold">{selectedListing.applications.fav}</p>
                      <p className="text-sm text-white/60">Friend A Veteran</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  className="flex-1 bg-green-600 hover:bg-green-700" 
                  onClick={() => { setSelectedListing(null); setActiveTab('applications'); }}
                >
                  View All Applications
                </Button>
                <Button 
                  className="flex-1" 
                  variant="outline"
                  onClick={() => { setSelectedListing(null); onNavigate('post-property'); }}
                >
                  Edit Listing
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}