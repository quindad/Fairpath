import { useState } from 'react';
import { Users, Plus, TrendingUp, HeartHandshake, MapPin, Phone, Mail, Calendar, Eye, MessageSquare, Filter, Search, Download, Settings, Bell, Star, CheckCircle2, Shield, Award, XCircle, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

interface ResourcePartnerCRMProps {
  onNavigate: (page: string) => void;
}

export default function ResourcePartnerCRM({ onNavigate }: ResourcePartnerCRMProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'directory' | 'clients' | 'referrals' | 'impact'>('overview');
  const [selectedPlatform, setSelectedPlatform] = useState<'all' | 'faf' | 'fav'>('all');
  const [selectedClient, setSelectedClient] = useState<any | null>(null);
  const [selectedService, setSelectedService] = useState<any | null>(null);

  const stats = {
    directoryListings: 5,
    activeClients: 143,
    referralsReceived: 67,
    impactScore: 94
  };

  const services = [
    {
      id: 1,
      name: 'Mental Health Counseling',
      category: 'Healthcare',
      platforms: ['faf', 'fav'],
      description: 'PTSD, substance abuse, and family counseling',
      clients: { faf: 45, fav: 28 },
      vaApproved: true,
      status: 'active'
    },
    {
      id: 2,
      name: 'Job Skills Training',
      category: 'Education',
      platforms: ['faf', 'fav'],
      description: 'CDL, forklift, construction certifications',
      clients: { faf: 38, fav: 15 },
      vaApproved: false,
      status: 'active'
    },
    {
      id: 3,
      name: 'Legal Aid Services',
      category: 'Legal',
      platforms: ['faf'],
      description: 'Record expungement, child support, civil matters',
      clients: { faf: 22, fav: 0 },
      vaApproved: false,
      status: 'active'
    },
    {
      id: 4,
      name: 'Financial Literacy Classes',
      category: 'Financial',
      platforms: ['faf', 'fav'],
      description: 'Budgeting, credit repair, savings programs',
      clients: { faf: 18, fav: 12 },
      vaApproved: true,
      status: 'active'
    }
  ];

  const clients = [
    {
      id: 1,
      name: 'Marcus Johnson',
      platform: 'faf',
      service: 'Mental Health Counseling',
      enrolledDate: '2024-10-15',
      status: 'active',
      sessionsCompleted: 8,
      totalSessions: 12,
      progress: 67,
      notes: 'Making excellent progress with PTSD treatment',
      convictionType: 'Non-violent felony',
      releaseDate: '2022-03-15'
    },
    {
      id: 2,
      name: 'Sarah Martinez',
      platform: 'fav',
      service: 'Mental Health Counseling',
      enrolledDate: '2024-11-01',
      status: 'active',
      sessionsCompleted: 4,
      totalSessions: 12,
      progress: 33,
      notes: 'Transitioning well from active duty',
      branch: 'Army',
      vaReferral: true
    },
    {
      id: 3,
      name: 'DeShawn Williams',
      platform: 'faf',
      service: 'Job Skills Training',
      enrolledDate: '2024-09-20',
      status: 'completed',
      sessionsCompleted: 40,
      totalSessions: 40,
      progress: 100,
      notes: 'CDL certification obtained - now employed!',
      convictionType: 'Drug offense',
      releaseDate: '2021-08-20'
    },
    {
      id: 4,
      name: 'James Rodriguez',
      platform: 'fav',
      service: 'Financial Literacy Classes',
      enrolledDate: '2024-11-15',
      status: 'active',
      sessionsCompleted: 2,
      totalSessions: 8,
      progress: 25,
      notes: 'Working on credit repair',
      branch: 'Marines',
      vaReferral: false
    }
  ];

  const referrals = [
    {
      id: 1,
      client: 'Michael Brown',
      platform: 'faf',
      referredBy: 'FairPath Staffing',
      service: 'Mental Health Counseling',
      date: '2024-12-05',
      status: 'pending',
      urgency: 'high',
      reason: 'Pre-employment mental health clearance needed'
    },
    {
      id: 2,
      client: 'Jennifer Lee',
      platform: 'fav',
      referredBy: 'VA Benefits Navigator',
      service: 'Financial Literacy Classes',
      date: '2024-12-04',
      status: 'accepted',
      urgency: 'medium',
      reason: 'Needs budgeting help with BAH housing'
    },
    {
      id: 3,
      client: 'Robert Taylor',
      platform: 'faf',
      referredBy: 'Property Owner Portal',
      service: 'Legal Aid Services',
      date: '2024-12-03',
      status: 'in_progress',
      urgency: 'high',
      reason: 'Eviction prevention assistance'
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
              <HeartHandshake className="h-8 w-8 text-purple-500" />
              <div>
                <h1 className="text-xl font-bold">Resource Partner CRM</h1>
                <p className="text-sm text-white/60">Hope & Healing Center</p>
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
                onClick={() => alert('Service directory creation feature coming soon!')}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Service
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-6 mt-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 border-b-2 transition-colors ${
                activeTab === 'overview'
                  ? 'border-purple-500 text-white'
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('directory')}
              className={`pb-3 border-b-2 transition-colors ${
                activeTab === 'directory'
                  ? 'border-purple-500 text-white'
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
            >
              My Services
            </button>
            <button
              onClick={() => setActiveTab('clients')}
              className={`pb-3 border-b-2 transition-colors ${
                activeTab === 'clients'
                  ? 'border-purple-500 text-white'
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
            >
              Active Clients
            </button>
            <button
              onClick={() => setActiveTab('referrals')}
              className={`pb-3 border-b-2 transition-colors ${
                activeTab === 'referrals'
                  ? 'border-purple-500 text-white'
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
            >
              Referrals
            </button>
            <button
              onClick={() => setActiveTab('impact')}
              className={`pb-3 border-b-2 transition-colors ${
                activeTab === 'impact'
                  ? 'border-purple-500 text-white'
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
            >
              Impact Report
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
                    <Star className="h-5 w-5 text-purple-400" />
                    <TrendingUp className="h-4 w-4 text-green-400" />
                  </div>
                  <p className="text-3xl font-bold">{stats.directoryListings}</p>
                  <p className="text-sm text-white/60">Active Services</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Users className="h-5 w-5 text-blue-400" />
                    <TrendingUp className="h-4 w-4 text-green-400" />
                  </div>
                  <p className="text-3xl font-bold">{stats.activeClients}</p>
                  <p className="text-sm text-white/60">Active Clients</p>
                  <div className="flex gap-2 mt-2">
                    <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30">85 FAF</Badge>
                    <Badge className="bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30">58 FAV</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <HeartHandshake className="h-5 w-5 text-green-400" />
                    <TrendingUp className="h-4 w-4 text-green-400" />
                  </div>
                  <p className="text-3xl font-bold">{stats.referralsReceived}</p>
                  <p className="text-sm text-white/60">Referrals This Month</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Award className="h-5 w-5 text-yellow-400" />
                    <TrendingUp className="h-4 w-4 text-green-400" />
                  </div>
                  <p className="text-3xl font-bold">{stats.impactScore}</p>
                  <p className="text-sm text-white/60">Impact Score</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Clients */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Recent Client Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {clients.slice(0, 5).map(client => (
                    <div key={client.id} className="flex items-center justify-between p-4 bg-black/30 rounded-lg border border-gray-800">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center font-bold">
                          {client.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-bold">{client.name}</p>
                            <Badge className={
                              client.platform === 'faf'
                                ? 'bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30'
                                : 'bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30'
                            }>
                              {client.platform === 'faf' ? 'Friend A Felon' : 'Friend A Veteran'}
                            </Badge>
                          </div>
                          <p className="text-sm text-white/60">{client.service}</p>
                          <p className="text-xs text-white/40">Enrolled: {new Date(client.enrolledDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-24 h-2 bg-gray-800 rounded-full overflow-hidden">
                              <div className="h-full bg-purple-500" style={{ width: `${client.progress}%` }}></div>
                            </div>
                            <span className="text-xs text-white/60">{client.progress}%</span>
                          </div>
                          <p className="text-xs text-white/40">{client.sessionsCompleted}/{client.totalSessions} sessions</p>
                        </div>
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700" onClick={() => setSelectedClient(client)}>
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* VA Approval Badge */}
            <Card className="bg-gradient-to-br from-[#FFD700]/20 to-transparent border-[#FFD700]/30">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Shield className="h-12 w-12 text-[#FFD700]" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold">VA Approved Provider</h3>
                      <Badge className="bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                    <p className="text-sm text-white/70">
                      Your organization is VA-approved for mental health counseling and financial literacy programs. 
                      This badge displays on Friend A Veteran listings, increasing trust and referrals.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Directory Tab */}
        {activeTab === 'directory' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Service Directory</h2>
              <div className="flex gap-3">
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              {services.map(service => (
                <Card key={service.id} className="bg-gray-900 border-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold">{service.name}</h3>
                          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                            {service.category}
                          </Badge>
                          {service.vaApproved && (
                            <Badge className="bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30">
                              <Shield className="h-3 w-3 mr-1" />
                              VA Approved
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-white/70 mb-4">{service.description}</p>
                        
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-sm text-white/60">Listed on:</span>
                          {service.platforms.includes('faf') && (
                            <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30">
                              Friend A Felon
                            </Badge>
                          )}
                          {service.platforms.includes('fav') && (
                            <Badge className="bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30">
                              Friend A Veteran
                            </Badge>
                          )}
                        </div>

                        <div className="flex gap-4">
                          <div className="bg-black/30 p-3 rounded text-center">
                            <p className="text-2xl font-bold">{service.clients.faf + service.clients.fav}</p>
                            <p className="text-xs text-white/60">Total Clients</p>
                          </div>
                          {service.clients.faf > 0 && (
                            <div className="bg-[#A8F32C]/10 p-3 rounded text-center">
                              <p className="text-2xl font-bold">{service.clients.faf}</p>
                              <p className="text-xs text-white/60">FAF Clients</p>
                            </div>
                          )}
                          {service.clients.fav > 0 && (
                            <div className="bg-[#FFD700]/10 p-3 rounded text-center">
                              <p className="text-2xl font-bold">{service.clients.fav}</p>
                              <p className="text-xs text-white/60">FAV Clients</p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="ml-6 flex flex-col gap-2">
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700" onClick={() => setSelectedService(service)}>
                          Edit Listing
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => alert('Analytics feature coming soon!')}>
                          View Analytics
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Clients Tab */}
        {activeTab === 'clients' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Active Clients</h2>
              <div className="flex gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                  <input
                    type="text"
                    placeholder="Search clients..."
                    className="pl-10 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder:text-white/40"
                  />
                </div>
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
              {clients.map(client => (
                <Card key={client.id} className="bg-gray-900 border-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center font-bold text-lg">
                          {client.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold">{client.name}</h3>
                            <Badge className={
                              client.platform === 'faf'
                                ? 'bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30'
                                : 'bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30'
                            }>
                              {client.platform === 'faf' ? 'Friend A Felon' : 'Friend A Veteran'}
                            </Badge>
                            <Badge className={
                              client.status === 'completed' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                              'bg-blue-500/20 text-blue-400 border-blue-500/30'
                            }>
                              {client.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-white/80 mb-2">Service: <span className="font-bold">{client.service}</span></p>
                          <p className="text-xs text-white/60 mb-3">Enrolled: {new Date(client.enrolledDate).toLocaleDateString()}</p>

                          {/* Progress Bar */}
                          <div className="mb-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-white/60">Progress</span>
                              <span className="text-xs font-bold">{client.progress}%</span>
                            </div>
                            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                              <div className="h-full bg-purple-500" style={{ width: `${client.progress}%` }}></div>
                            </div>
                            <p className="text-xs text-white/40 mt-1">{client.sessionsCompleted}/{client.totalSessions} sessions completed</p>
                          </div>

                          {/* Platform-specific details */}
                          {client.platform === 'faf' ? (
                            <div className="bg-[#A8F32C]/10 p-3 rounded border border-[#A8F32C]/30">
                              <p className="text-xs text-white/60 mb-1">Background:</p>
                              <p className="text-sm">{client.convictionType}</p>
                              <p className="text-xs text-white/40 mt-1">Released: {new Date(client.releaseDate!).toLocaleDateString()}</p>
                            </div>
                          ) : (
                            <div className="bg-[#FFD700]/10 p-3 rounded border border-[#FFD700]/30">
                              <p className="text-xs text-white/60 mb-1">Military Background:</p>
                              <p className="text-sm">{client.branch}</p>
                              {client.vaReferral && (
                                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 mt-1">
                                  VA Referral
                                </Badge>
                              )}
                            </div>
                          )}

                          <div className="mt-3 p-3 bg-black/30 rounded">
                            <p className="text-xs text-white/60 mb-1">Case Notes:</p>
                            <p className="text-sm text-white/80">{client.notes}</p>
                          </div>
                        </div>
                      </div>

                      <div className="ml-6 flex flex-col gap-2">
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700" onClick={() => setSelectedClient(client)}>
                          <Eye className="h-4 w-4 mr-2" />
                          Full Record
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => onNavigate('messages')}>
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => alert('Scheduling feature coming soon!')}>
                          <Calendar className="h-4 w-4 mr-2" />
                          Schedule
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Referrals Tab */}
        {activeTab === 'referrals' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Referrals</h2>
              <div className="flex gap-3">
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              {referrals.map(referral => (
                <Card key={referral.id} className="bg-gray-900 border-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-xl font-bold">{referral.client}</h3>
                          <Badge className={
                            referral.platform === 'faf'
                              ? 'bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30'
                              : 'bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30'
                          }>
                            {referral.platform === 'faf' ? 'Friend A Felon' : 'Friend A Veteran'}
                          </Badge>
                          <Badge className={
                            referral.urgency === 'high' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                            referral.urgency === 'medium' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                            'bg-blue-500/20 text-blue-400 border-blue-500/30'
                          }>
                            {referral.urgency} urgency
                          </Badge>
                          <Badge className={
                            referral.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                            referral.status === 'accepted' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                            'bg-blue-500/20 text-blue-400 border-blue-500/30'
                          }>
                            {referral.status.replace('_', ' ')}
                          </Badge>
                        </div>

                        <div className="space-y-2 text-sm">
                          <p className="text-white/80">
                            <span className="text-white/60">Service:</span> <span className="font-bold">{referral.service}</span>
                          </p>
                          <p className="text-white/80">
                            <span className="text-white/60">Referred by:</span> {referral.referredBy}
                          </p>
                          <p className="text-white/80">
                            <span className="text-white/60">Date:</span> {new Date(referral.date).toLocaleDateString()}
                          </p>
                          <div className="bg-black/30 p-3 rounded mt-3">
                            <p className="text-xs text-white/60 mb-1">Reason for Referral:</p>
                            <p className="text-sm text-white/80">{referral.reason}</p>
                          </div>
                        </div>
                      </div>

                      <div className="ml-6 flex flex-col gap-2">
                        {referral.status === 'pending' && (
                          <>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              Accept
                            </Button>
                            <Button size="sm" variant="outline" className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                              Decline
                            </Button>
                          </>
                        )}
                        {referral.status === 'accepted' && (
                          <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                            Schedule Intake
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Contact
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Impact Tab */}
        {activeTab === 'impact' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Impact Dashboard</h2>
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-12 text-center">
                <BarChart3 className="h-16 w-16 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Impact Analytics Coming Soon</h3>
                <p className="text-white/60">
                  Track outcomes, measure success rates, and generate impact reports for your services.
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Client Detail Modal */}
      {selectedClient && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6">
          <div className="bg-gray-900 border border-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center font-bold text-xl">
                    {selectedClient.name.split(' ').map((n: string) => n[0]).join('')}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedClient.name}</h2>
                    <Badge className={
                      selectedClient.platform === 'faf'
                        ? 'bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30'
                        : 'bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30'
                    }>
                      {selectedClient.platform === 'faf' ? 'Friend A Felon' : 'Friend A Veteran'}
                    </Badge>
                  </div>
                </div>
                <Button variant="ghost" onClick={() => setSelectedClient(null)}>
                  <XCircle className="h-6 w-6" />
                </Button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-3">Service Details</h3>
                <div className="space-y-2">
                  <p><strong>Service:</strong> {selectedClient.service}</p>
                  <p><strong>Enrolled:</strong> {new Date(selectedClient.enrolledDate).toLocaleDateString()}</p>
                  <p><strong>Status:</strong> 
                    <Badge className={
                      selectedClient.status === 'completed' ? 'bg-green-500/20 text-green-400 border-green-500/30 ml-2' :
                      'bg-blue-500/20 text-blue-400 border-blue-500/30 ml-2'
                    }>
                      {selectedClient.status}
                    </Badge>
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-3">Progress</h3>
                <div className="bg-black/30 p-4 rounded border border-gray-800">
                  <div className="flex items-center justify-between mb-2">
                    <span>Sessions Completed:</span>
                    <span className="font-bold">{selectedClient.sessionsCompleted} / {selectedClient.totalSessions}</span>
                  </div>
                  <div className="h-3 bg-gray-800 rounded-full overflow-hidden mb-2">
                    <div 
                      className="h-full bg-purple-500" 
                      style={{ width: `${selectedClient.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-white/60">{selectedClient.progress}% complete</p>
                </div>
              </div>

              {selectedClient.notes && (
                <div>
                  <h3 className="text-lg font-bold mb-3">Notes</h3>
                  <div className="bg-blue-500/10 p-4 rounded border border-blue-500/30">
                    <p className="text-sm">{selectedClient.notes}</p>
                  </div>
                </div>
              )}

              {selectedClient.platform === 'faf' && (
                <div>
                  <h3 className="text-lg font-bold mb-3">Background</h3>
                  <div className="bg-[#A8F32C]/10 p-4 rounded border border-[#A8F32C]/30">
                    <p><strong>Conviction Type:</strong> {selectedClient.convictionType}</p>
                    <p><strong>Release Date:</strong> {new Date(selectedClient.releaseDate).toLocaleDateString()}</p>
                  </div>
                </div>
              )}

              {selectedClient.platform === 'fav' && (
                <div>
                  <h3 className="text-lg font-bold mb-3">Military Background</h3>
                  <div className="bg-[#FFD700]/10 p-4 rounded border border-[#FFD700]/30">
                    <p><strong>Branch:</strong> {selectedClient.branch}</p>
                    {selectedClient.vaReferral && (
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 mt-2">
                        VA Referral
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <Button className="flex-1 bg-purple-600 hover:bg-purple-700" onClick={() => onNavigate('messages')}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
                <Button className="flex-1" variant="outline" onClick={() => alert('Scheduling feature coming soon!')}>
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Session
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6">
          <div className="bg-gray-900 border border-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">{selectedService.name}</h2>
                <Button variant="ghost" onClick={() => setSelectedService(null)}>
                  <XCircle className="h-6 w-6" />
                </Button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-3">Service Information</h3>
                <div className="space-y-2">
                  <p><strong>Category:</strong> {selectedService.category}</p>
                  <p><strong>Description:</strong> {selectedService.description}</p>
                  {selectedService.vaApproved && (
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                      VA Approved
                    </Badge>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-3">Platform Distribution</h3>
                <div className="space-y-2">
                  {selectedService.platforms.includes('faf') && (
                    <div className="flex items-center justify-between p-3 bg-[#A8F32C]/10 rounded border border-[#A8F32C]/30">
                      <span>Friend A Felon</span>
                      <span className="font-bold">{selectedService.clients.faf} clients</span>
                    </div>
                  )}
                  {selectedService.platforms.includes('fav') && (
                    <div className="flex items-center justify-between p-3 bg-[#FFD700]/10 rounded border border-[#FFD700]/30">
                      <span>Friend A Veteran</span>
                      <span className="font-bold">{selectedService.clients.fav} clients</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1 bg-purple-600 hover:bg-purple-700" onClick={() => { setSelectedService(null); alert('Edit service feature coming soon!'); }}>
                  Edit Service
                </Button>
                <Button className="flex-1" variant="outline" onClick={() => { setSelectedService(null); setActiveTab('clients'); }}>
                  View All Clients
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}