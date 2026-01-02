import { useState } from 'react';
import { Building2, Plus, Users, TrendingUp, DollarSign, Briefcase, Filter, Search, Eye, MessageSquare, Calendar, MapPin, Clock, CheckCircle2, XCircle, AlertCircle, BarChart3, Download, Settings, Bell, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

interface EmployerCRMProps {
  onNavigate: (page: string) => void;
}

export default function EmployerCRM({ onNavigate }: EmployerCRMProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'jobs' | 'candidates' | 'wotc' | 'analytics'>('overview');
  const [selectedPlatform, setSelectedPlatform] = useState<'all' | 'faf' | 'fav'>('all');
  const [selectedCandidate, setSelectedCandidate] = useState<any | null>(null);
  const [selectedJob, setSelectedJob] = useState<any | null>(null);

  // Mock data
  const stats = {
    activeJobs: 12,
    totalApplicants: 156,
    hires: 8,
    wotcCredits: 48600
  };

  const jobs = [
    {
      id: 1,
      title: 'Warehouse Manager',
      location: 'Dallas, TX',
      salary: '$55,000 - $65,000',
      platforms: ['faf', 'fav'],
      posted: '3 days ago',
      applicants: { faf: 23, fav: 8 },
      status: 'active',
      wotcEligible: true
    },
    {
      id: 2,
      title: 'CDL Driver',
      location: 'Houston, TX',
      salary: '$60,000 - $75,000',
      platforms: ['faf', 'fav'],
      posted: '1 week ago',
      applicants: { faf: 45, fav: 12 },
      status: 'active',
      wotcEligible: true
    },
    {
      id: 3,
      title: 'Security Officer (Clearance Required)',
      location: 'San Antonio, TX',
      salary: '$45,000 - $55,000',
      platforms: ['fav'],
      posted: '2 days ago',
      applicants: { faf: 0, fav: 18 },
      status: 'active',
      wotcEligible: true,
      clearanceRequired: 'Secret'
    },
    {
      id: 4,
      title: 'Forklift Operator',
      location: 'Austin, TX',
      salary: '$35,000 - $42,000',
      platforms: ['faf'],
      posted: '5 days ago',
      applicants: { faf: 34, fav: 0 },
      status: 'active',
      wotcEligible: true
    }
  ];

  const candidates = [
    {
      id: 1,
      name: 'Marcus Johnson',
      platform: 'faf',
      appliedFor: 'Warehouse Manager',
      location: 'Dallas, TX',
      experience: '8 years logistics',
      wotcEligible: true,
      wotcAmount: 2400,
      status: 'interviewing',
      convictionType: 'Non-violent felony',
      releaseDate: '2022-03-15',
      registrationSource: 'tablet',
      facility: 'Texas State Prison'
    },
    {
      id: 2,
      name: 'Sarah Martinez',
      platform: 'fav',
      appliedFor: 'Security Officer',
      location: 'San Antonio, TX',
      experience: 'Army - 6 years MP',
      mos: '31B (Military Police)',
      clearance: 'Secret',
      wotcEligible: true,
      wotcAmount: 9600,
      status: 'new',
      branch: 'Army',
      separationDate: '2023-11-30',
      registrationSource: 'tablet',
      facility: 'Fort Hood VA Center'
    },
    {
      id: 3,
      name: 'DeShawn Williams',
      platform: 'faf',
      appliedFor: 'CDL Driver',
      location: 'Houston, TX',
      experience: '5 years commercial driving',
      wotcEligible: true,
      wotcAmount: 2400,
      status: 'offer_sent',
      convictionType: 'Drug offense',
      releaseDate: '2021-08-20',
      registrationSource: 'web',
      facility: null
    },
    {
      id: 4,
      name: 'James Rodriguez',
      platform: 'fav',
      appliedFor: 'Warehouse Manager',
      location: 'Dallas, TX',
      experience: 'Marines - 4 years Logistics',
      mos: '3043 (Supply Admin)',
      clearance: 'None',
      wotcEligible: true,
      wotcAmount: 5600,
      status: 'interviewing',
      branch: 'Marines',
      separationDate: '2024-01-15',
      registrationSource: 'tablet',
      facility: 'Camp Pendleton VA Center'
    }
  ];

  const wotcData = [
    {
      hire: 'Marcus Johnson',
      position: 'Warehouse Manager',
      hireDate: '2024-11-15',
      platform: 'faf',
      creditAmount: 2400,
      status: 'processing',
      certificationDate: null
    },
    {
      hire: 'Sarah Martinez',
      position: 'Security Officer',
      hireDate: '2024-10-28',
      platform: 'fav',
      creditAmount: 9600,
      status: 'certified',
      certificationDate: '2024-11-20'
    },
    {
      hire: 'James Brown',
      position: 'CDL Driver',
      hireDate: '2024-10-05',
      platform: 'faf',
      creditAmount: 2400,
      status: 'certified',
      certificationDate: '2024-11-01'
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
              <Building2 className="h-8 w-8 text-blue-500" />
              <div>
                <h1 className="text-xl font-bold">Employer CRM</h1>
                <p className="text-sm text-white/60">Acme Industries</p>
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
                onClick={() => onNavigate('post-job')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Post New Job
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-6 mt-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 border-b-2 transition-colors ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-white'
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('jobs')}
              className={`pb-3 border-b-2 transition-colors ${
                activeTab === 'jobs'
                  ? 'border-blue-500 text-white'
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
            >
              My Jobs
            </button>
            <button
              onClick={() => setActiveTab('candidates')}
              className={`pb-3 border-b-2 transition-colors ${
                activeTab === 'candidates'
                  ? 'border-blue-500 text-white'
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
            >
              Candidates
            </button>
            <button
              onClick={() => setActiveTab('wotc')}
              className={`pb-3 border-b-2 transition-colors ${
                activeTab === 'wotc'
                  ? 'border-blue-500 text-white'
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
            >
              WOTC Dashboard
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`pb-3 border-b-2 transition-colors ${
                activeTab === 'analytics'
                  ? 'border-blue-500 text-white'
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
            >
              Analytics
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
                    <Briefcase className="h-5 w-5 text-blue-400" />
                    <TrendingUp className="h-4 w-4 text-green-400" />
                  </div>
                  <p className="text-3xl font-bold">{stats.activeJobs}</p>
                  <p className="text-sm text-white/60">Active Jobs</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Users className="h-5 w-5 text-purple-400" />
                    <TrendingUp className="h-4 w-4 text-green-400" />
                  </div>
                  <p className="text-3xl font-bold">{stats.totalApplicants}</p>
                  <p className="text-sm text-white/60">Total Applicants</p>
                  <div className="flex gap-2 mt-2">
                    <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30">102 FAF</Badge>
                    <Badge className="bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30">54 FAV</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                    <TrendingUp className="h-4 w-4 text-green-400" />
                  </div>
                  <p className="text-3xl font-bold">{stats.hires}</p>
                  <p className="text-sm text-white/60">Hires This Month</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <DollarSign className="h-5 w-5 text-yellow-400" />
                    <TrendingUp className="h-4 w-4 text-green-400" />
                  </div>
                  <p className="text-3xl font-bold">${(stats.wotcCredits / 1000).toFixed(1)}K</p>
                  <p className="text-sm text-white/60">WOTC Tax Credits</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Recent Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {candidates.slice(0, 5).map(candidate => (
                    <div key={candidate.id} className="flex items-center justify-between p-4 bg-black/30 rounded-lg border border-gray-800">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center font-bold">
                          {candidate.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-bold">{candidate.name}</p>
                            <Badge className={
                              candidate.platform === 'faf'
                                ? 'bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30'
                                : 'bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30'
                            }>
                              {candidate.platform === 'faf' ? 'Friend A Felon' : 'Friend A Veteran'}
                            </Badge>
                          </div>
                          <p className="text-sm text-white/60">{candidate.appliedFor}</p>
                          <p className="text-xs text-white/40">{candidate.experience}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-sm font-bold text-green-400">${candidate.wotcAmount.toLocaleString()} WOTC</p>
                          <Badge className={
                            candidate.status === 'new' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                            candidate.status === 'interviewing' ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' :
                            'bg-green-500/20 text-green-400 border-green-500/30'
                          }>
                            {candidate.status.replace('_', ' ')}
                          </Badge>
                        </div>
                        <Button 
                          size="sm" 
                          className="bg-blue-600 hover:bg-blue-700"
                          onClick={() => setSelectedCandidate(candidate)}
                        >
                          View Profile
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Jobs Tab */}
        {activeTab === 'jobs' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Job Postings</h2>
              <div className="flex gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                  <input
                    type="text"
                    placeholder="Search jobs..."
                    className="pl-10 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder:text-white/40"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              {jobs.map(job => (
                <Card key={job.id} className="bg-gray-900 border-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold">{job.title}</h3>
                          {job.wotcEligible && (
                            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                              WOTC Eligible
                            </Badge>
                          )}
                          {job.clearanceRequired && (
                            <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                              {job.clearanceRequired} Clearance
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-white/60 mb-4">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            {job.salary}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {job.posted}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-white/60">Posted on:</span>
                          {job.platforms.includes('faf') && (
                            <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30">
                              Friend A Felon
                            </Badge>
                          )}
                          {job.platforms.includes('fav') && (
                            <Badge className="bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30">
                              Friend A Veteran
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="mb-4">
                          <p className="text-2xl font-bold">{job.applicants.faf + job.applicants.fav}</p>
                          <p className="text-sm text-white/60">Total Applicants</p>
                          <div className="flex gap-2 mt-2">
                            {job.applicants.faf > 0 && (
                              <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30">
                                {job.applicants.faf} FAF
                              </Badge>
                            )}
                            {job.applicants.fav > 0 && (
                              <Badge className="bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30">
                                {job.applicants.fav} FAV
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setSelectedJob(job)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                          <Button 
                            size="sm" 
                            className="bg-blue-600 hover:bg-blue-700"
                            onClick={() => onNavigate('post-job')}
                          >
                            Edit
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

        {/* Candidates Tab */}
        {activeTab === 'candidates' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">All Candidates</h2>
              <div className="flex gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                  <input
                    type="text"
                    placeholder="Search candidates..."
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
              {candidates.map(candidate => (
                <Card key={candidate.id} className="bg-gray-900 border-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center font-bold text-lg">
                          {candidate.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold">{candidate.name}</h3>
                            <Badge className={
                              candidate.platform === 'faf'
                                ? 'bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30'
                                : 'bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30'
                            }>
                              {candidate.platform === 'faf' ? 'Friend A Felon' : 'Friend A Veteran'}
                            </Badge>
                            <Badge className={
                              candidate.status === 'new' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                              candidate.status === 'interviewing' ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' :
                              'bg-green-500/20 text-green-400 border-green-500/30'
                            }>
                              {candidate.status.replace('_', ' ')}
                            </Badge>
                          </div>
                          <p className="text-sm text-white/80 mb-2">Applied for: <span className="font-bold">{candidate.appliedFor}</span></p>
                          <div className="flex items-center gap-4 text-sm text-white/60 mb-3">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {candidate.location}
                            </span>
                            <span>•</span>
                            <span>{candidate.experience}</span>
                            {candidate.registrationSource === 'tablet' && (
                              <>
                                <span>•</span>
                                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                                  📱 Tablet Registration
                                </Badge>
                              </>
                            )}
                          </div>
                          
                          {/* Registration source info */}
                          {candidate.facility && (
                            <div className="mb-3 p-2 bg-blue-500/10 rounded border border-blue-500/30">
                              <p className="text-xs text-blue-400">
                                <strong>Registered via FairPath Forward Tablet:</strong> {candidate.facility}
                              </p>
                            </div>
                          )}
                          
                          {/* Platform-specific details */}
                          {candidate.platform === 'faf' ? (
                            <div className="bg-[#A8F32C]/10 p-3 rounded border border-[#A8F32C]/30">
                              <p className="text-xs text-white/60 mb-1">Background:</p>
                              <p className="text-sm">{candidate.convictionType}</p>
                              <p className="text-xs text-white/40 mt-1">Released: {new Date(candidate.releaseDate!).toLocaleDateString()}</p>
                            </div>
                          ) : (
                            <div className="bg-[#FFD700]/10 p-3 rounded border border-[#FFD700]/30">
                              <p className="text-xs text-white/60 mb-1">Military Background:</p>
                              <p className="text-sm">{candidate.branch} • MOS: {candidate.mos}</p>
                              <p className="text-xs text-white/40 mt-1">Clearance: {candidate.clearance} • Separated: {new Date(candidate.separationDate!).toLocaleDateString()}</p>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-right ml-6">
                        <div className="bg-green-500/10 p-3 rounded border border-green-500/30 mb-4">
                          <p className="text-xs text-white/60 mb-1">WOTC Credit</p>
                          <p className="text-2xl font-bold text-green-400">${candidate.wotcAmount.toLocaleString()}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button 
                            size="sm" 
                            className="bg-blue-600 hover:bg-blue-700"
                            onClick={() => setSelectedCandidate(candidate)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Full Profile
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => onNavigate('messages')}
                          >
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Message
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => alert('Interview scheduling feature coming soon!')}
                          >
                            <Calendar className="h-4 w-4 mr-2" />
                            Schedule Interview
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

        {/* WOTC Dashboard Tab */}
        {activeTab === 'wotc' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-green-500/20 to-transparent border-green-500/30">
                <CardContent className="p-6">
                  <DollarSign className="h-8 w-8 text-green-400 mb-3" />
                  <p className="text-3xl font-bold text-green-400">${stats.wotcCredits.toLocaleString()}</p>
                  <p className="text-sm text-white/60">Total Credits (YTD)</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <CheckCircle2 className="h-8 w-8 text-blue-400 mb-3" />
                  <p className="text-3xl font-bold">6</p>
                  <p className="text-sm text-white/60">Certified Hires</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <AlertCircle className="h-8 w-8 text-yellow-400 mb-3" />
                  <p className="text-3xl font-bold">2</p>
                  <p className="text-sm text-white/60">Pending Certification</p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>WOTC Credit Breakdown</CardTitle>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export Report
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {wotcData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-black/30 rounded-lg border border-gray-800">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <p className="font-bold">{item.hire}</p>
                          <Badge className={
                            item.platform === 'faf'
                              ? 'bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30'
                              : 'bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30'
                          }>
                            {item.platform === 'faf' ? 'Friend A Felon' : 'Friend A Veteran'}
                          </Badge>
                        </div>
                        <p className="text-sm text-white/60">{item.position}</p>
                        <p className="text-xs text-white/40">Hired: {new Date(item.hireDate).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-400">${item.creditAmount.toLocaleString()}</p>
                        <Badge className={
                          item.status === 'certified'
                            ? 'bg-green-500/20 text-green-400 border-green-500/30'
                            : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                        }>
                          {item.status}
                        </Badge>
                        {item.certificationDate && (
                          <p className="text-xs text-white/40 mt-1">Certified: {new Date(item.certificationDate).toLocaleDateString()}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
                  <p className="text-sm text-white/70">
                    <strong>Average WOTC per hire:</strong> ${(stats.wotcCredits / stats.hires).toLocaleString()} 
                    <span className="text-white/40"> (FAF: $2,400 avg • FAV: $9,600 avg)</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-12 text-center">
                <BarChart3 className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Analytics Coming Soon</h3>
                <p className="text-white/60">
                  Detailed analytics including hiring trends, WOTC projections, and platform performance will be available here.
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Candidate Detail Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6">
          <div className="bg-gray-900 border border-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center font-bold text-xl">
                    {selectedCandidate.name.split(' ').map((n: string) => n[0]).join('')}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedCandidate.name}</h2>
                    <Badge className={
                      selectedCandidate.platform === 'faf'
                        ? 'bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30'
                        : 'bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30'
                    }>
                      {selectedCandidate.platform === 'faf' ? 'Friend A Felon' : 'Friend A Veteran'}
                    </Badge>
                  </div>
                </div>
                <Button variant="ghost" onClick={() => setSelectedCandidate(null)}>
                  <XCircle className="h-6 w-6" />
                </Button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-3">Application Details</h3>
                <div className="space-y-2">
                  <p><strong>Position:</strong> {selectedCandidate.appliedFor}</p>
                  <p><strong>Location:</strong> {selectedCandidate.location}</p>
                  <p><strong>Experience:</strong> {selectedCandidate.experience}</p>
                  <p><strong>WOTC Credit:</strong> <span className="text-green-400">${selectedCandidate.wotcAmount.toLocaleString()}</span></p>
                </div>
              </div>

              {selectedCandidate.platform === 'faf' && (
                <div>
                  <h3 className="text-lg font-bold mb-3">Background Information</h3>
                  <div className="bg-[#A8F32C]/10 p-4 rounded border border-[#A8F32C]/30">
                    <p><strong>Conviction Type:</strong> {selectedCandidate.convictionType}</p>
                    <p><strong>Release Date:</strong> {new Date(selectedCandidate.releaseDate).toLocaleDateString()}</p>
                    {selectedCandidate.facility && (
                      <p><strong>Registration Source:</strong> {selectedCandidate.facility} (Tablet)</p>
                    )}
                  </div>
                </div>
              )}

              {selectedCandidate.platform === 'fav' && (
                <div>
                  <h3 className="text-lg font-bold mb-3">Military Background</h3>
                  <div className="bg-[#FFD700]/10 p-4 rounded border border-[#FFD700]/30">
                    <p><strong>Branch:</strong> {selectedCandidate.branch}</p>
                    <p><strong>MOS:</strong> {selectedCandidate.mos}</p>
                    <p><strong>Clearance:</strong> {selectedCandidate.clearance}</p>
                    <p><strong>Separation Date:</strong> {new Date(selectedCandidate.separationDate).toLocaleDateString()}</p>
                    {selectedCandidate.facility && (
                      <p><strong>Registration Source:</strong> {selectedCandidate.facility} (Tablet)</p>
                    )}
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={() => onNavigate('messages')}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
                <Button className="flex-1" variant="outline" onClick={() => alert('Interview scheduling feature coming soon!')}>
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Interview
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Job Detail Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6">
          <div className="bg-gray-900 border border-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">{selectedJob.title}</h2>
                <Button variant="ghost" onClick={() => setSelectedJob(null)}>
                  <XCircle className="h-6 w-6" />
                </Button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-3">Job Details</h3>
                <div className="space-y-2">
                  <p><strong>Location:</strong> {selectedJob.location}</p>
                  <p><strong>Salary:</strong> {selectedJob.salary}</p>
                  <p><strong>Posted:</strong> {selectedJob.posted}</p>
                  <p><strong>Total Applicants:</strong> {selectedJob.applicants.faf + selectedJob.applicants.fav}</p>
                  {selectedJob.wotcEligible && (
                    <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                      WOTC Eligible
                    </Badge>
                  )}
                  {selectedJob.clearanceRequired && (
                    <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                      {selectedJob.clearanceRequired} Clearance Required
                    </Badge>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-3">Platform Distribution</h3>
                <div className="space-y-2">
                  {selectedJob.platforms.includes('faf') && (
                    <div className="flex items-center justify-between p-3 bg-[#A8F32C]/10 rounded border border-[#A8F32C]/30">
                      <span>Friend A Felon</span>
                      <span className="font-bold">{selectedJob.applicants.faf} applicants</span>
                    </div>
                  )}
                  {selectedJob.platforms.includes('fav') && (
                    <div className="flex items-center justify-between p-3 bg-[#FFD700]/10 rounded border border-[#FFD700]/30">
                      <span>Friend A Veteran</span>
                      <span className="font-bold">{selectedJob.applicants.fav} applicants</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={() => { setSelectedJob(null); onNavigate('post-job'); }}>
                  Edit Job Posting
                </Button>
                <Button className="flex-1" variant="outline" onClick={() => { setSelectedJob(null); setActiveTab('candidates'); }}>
                  View All Applicants
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}