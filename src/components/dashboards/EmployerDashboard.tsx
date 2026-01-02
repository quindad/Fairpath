import { useState } from 'react';
import { Briefcase, Users, DollarSign, TrendingUp, Bell, Settings, User, Plus, Search, Filter, Download, Eye, CheckCircle, XCircle, Clock, ChevronRight, Calendar, MapPin, Star, LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import LogoFinal from '../common/LogoFinal';
import { useUser } from '../../contexts/UserContext';

interface EmployerDashboardProps {
  userData?: any;
  onNavigate?: (screen: string) => void;
}

export default function EmployerDashboard({ userData, onNavigate }: EmployerDashboardProps) {
  const { logout } = useUser();
  const [activeTab, setActiveTab] = useState<'overview' | 'jobs' | 'applications' | 'analytics'>('overview');

  const handlePostJob = () => {
    // Log standard employer job posting for mobile app sync
    const standardJobListing = {
      id: `job_employer_${Date.now()}`,
      source: 'employer-portal',
      jobType: 'standard-employer',
      wotcEligible: false,
      tags: ['Full-Time', 'Entry-Level'],
      priority: 'standard',
      syncToMobileApp: true,
      createdAt: new Date().toISOString()
    };

    console.log('📱 MOBILE APP SYNC - Standard Employer Job:', standardJobListing);
    console.log('🏷️ Job Type:', standardJobListing.jobType);
    console.log('📍 Source Portal:', standardJobListing.source);
    console.log('🎯 Display Priority:', standardJobListing.priority);
    
    onNavigate?.('post-job');
  };

  // Package limits
  const packageLimits = {
    starter: { jobs: 3, applications: 50 },
    growth: { jobs: 10, applications: 200 },
    enterprise: { jobs: 999, applications: 9999 }
  };

  const currentLimits = packageLimits[userData?.packageType || 'starter'];

  // Mock data
  const stats = {
    activeJobs: userData?.packageType === 'starter' ? 2 : userData?.packageType === 'growth' ? 7 : 25,
    totalApplications: userData?.packageType === 'starter' ? 34 : userData?.packageType === 'growth' ? 156 : 487,
    newThisWeek: userData?.packageType === 'starter' ? 8 : userData?.packageType === 'growth' ? 23 : 76,
    avgTimeToHire: 12,
    wotcSavings: userData?.packageType === 'starter' ? 4800 : userData?.packageType === 'growth' ? 18400 : 54200
  };

  const jobPostings = [
    { id: 1, title: 'Warehouse Associate', location: 'Chicago, IL', salary: '$18/hr', applications: 23, status: 'active', posted: '5 days ago', views: 187 },
    { id: 2, title: 'Forklift Operator', location: 'Chicago, IL', salary: '$21/hr', applications: 11, status: 'active', posted: '12 days ago', views: 134 },
    { id: 3, title: 'Package Handler', location: 'Naperville, IL', salary: '$19/hr', applications: 0, status: 'draft', posted: 'Not published', views: 0 },
  ];

  const recentApplications = [
    { id: 1, name: 'Marcus Johnson', position: 'Warehouse Associate', score: 742, applied: '2 hours ago', status: 'new', wotc: true },
    { id: 2, name: 'David Williams', position: 'Warehouse Associate', score: 688, applied: '5 hours ago', status: 'reviewing', wotc: true },
    { id: 3, name: 'James Brown', position: 'Forklift Operator', score: 701, applied: '1 day ago', status: 'interviewing', wotc: true },
    { id: 4, name: 'Robert Davis', position: 'Warehouse Associate', score: 655, applied: '2 days ago', status: 'rejected', wotc: false },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30">Active</Badge>;
      case 'draft':
        return <Badge className="bg-white/10 text-white/60 border-white/20">Draft</Badge>;
      case 'new':
        return <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/30">New</Badge>;
      case 'reviewing':
        return <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">Reviewing</Badge>;
      case 'interviewing':
        return <Badge className="bg-purple-500/20 text-purple-500 border-purple-500/30">Interviewing</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500/20 text-red-500 border-red-500/30">Rejected</Badge>;
      default:
        return <Badge className="bg-white/10 text-white/60 border-white/20">Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/5 bg-[#121212] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <LogoFinal size="md" />
            <div className="flex items-center gap-4">
              <Button variant="outline" className="border-white/20 text-white relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#A8F32C] rounded-full text-xs text-black flex items-center justify-center">
                  8
                </span>
              </Button>
              <Button variant="outline" className="border-white/20 text-white">
                <Settings className="h-5 w-5" />
              </Button>
              <Button variant="outline" className="border-white/20 text-white">
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
            <h1 className="text-4xl mb-2 text-white">Welcome back, Amazon Fulfillment!</h1>
            <p className="text-xl text-white/60">
              {stats.newThisWeek} new applications this week
            </p>
          </div>
          <Button 
            onClick={handlePostJob}
            className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
          >
            <Plus className="mr-2 h-5 w-5" />
            Post New Job
          </Button>
        </div>

        {/* Package Info */}
        <Card className="bg-gradient-to-r from-[#A8F32C]/20 to-transparent border-[#A8F32C]/30 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl mb-2 text-white">
                {userData?.packageType === 'starter' ? 'Starter Plan' : userData?.packageType === 'growth' ? 'Growth Plan' : 'Enterprise Plan'}
              </h3>
              <p className="text-white/60">
                {stats.activeJobs} of {currentLimits.jobs === 999 ? 'unlimited' : currentLimits.jobs} active jobs • 
                {' '}{stats.totalApplications} of {currentLimits.applications === 9999 ? 'unlimited' : currentLimits.applications} applications this month
              </p>
            </div>
            {userData?.packageType !== 'enterprise' && (
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
              <Briefcase className="h-8 w-8 text-[#A8F32C]" />
            </div>
            <div className="text-3xl mb-2 text-white">{stats.activeJobs}</div>
            <div className="text-white/60 text-sm">Active Job Posts</div>
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
              <TrendingUp className="h-8 w-8 text-purple-400" />
            </div>
            <div className="text-3xl mb-2 text-white">{stats.newThisWeek}</div>
            <div className="text-white/60 text-sm">New This Week</div>
          </Card>

          <Card className="bg-[#121212] border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <Clock className="h-8 w-8 text-yellow-400" />
            </div>
            <div className="text-3xl mb-2 text-white">{stats.avgTimeToHire}d</div>
            <div className="text-white/60 text-sm">Avg. Time to Hire</div>
          </Card>

          <Card className="bg-[#121212] border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="h-8 w-8 text-[#A8F32C]" />
            </div>
            <div className="text-3xl mb-2 text-white">${(stats.wotcSavings / 1000).toFixed(1)}k</div>
            <div className="text-white/60 text-sm">Est. WOTC Savings</div>
          </Card>
        </div>

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
            onClick={() => setActiveTab('jobs')}
            className={`px-6 py-3 border-b-2 transition-all ${
              activeTab === 'jobs'
                ? 'border-[#A8F32C] text-[#A8F32C]'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            Job Postings
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
            onClick={() => setActiveTab('analytics')}
            className={`px-6 py-3 border-b-2 transition-all ${
              activeTab === 'analytics'
                ? 'border-[#A8F32C] text-[#A8F32C]'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            Analytics
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent Applications */}
            <Card className="bg-[#121212] border-white/10 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl text-white">Recent Applications</h2>
                <Button variant="ghost" className="text-[#A8F32C]">View All</Button>
              </div>
              
              <div className="space-y-4">
                {recentApplications.slice(0, 4).map((app) => (
                  <div key={app.id} className="bg-black/50 border border-white/10 rounded-lg p-4 hover:border-[#A8F32C]/50 transition-all cursor-pointer">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="text-white mb-1">{app.name}</div>
                        <div className="text-sm text-white/60">{app.position}</div>
                      </div>
                      {getStatusBadge(app.status)}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400" />
                          <span className="text-white/60">{app.score}</span>
                        </div>
                        {app.wotc && (
                          <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30 text-xs">
                            WOTC Eligible
                          </Badge>
                        )}
                      </div>
                      <span className="text-white/40">{app.applied}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Top Performing Jobs */}
            <Card className="bg-[#121212] border-white/10 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl text-white">Top Performing Jobs</h2>
                <Button variant="ghost" className="text-[#A8F32C]">View All</Button>
              </div>
              
              <div className="space-y-4">
                {jobPostings.filter(j => j.status === 'active').map((job) => (
                  <div key={job.id} className="bg-black/50 border border-white/10 rounded-lg p-4 hover:border-blue-500/50 transition-all cursor-pointer">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="text-white mb-1">{job.title}</div>
                        <div className="text-sm text-white/60">{job.location}</div>
                      </div>
                      <div className="text-white">{job.salary}</div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-blue-400" />
                          <span className="text-white/60">{job.applications} applications</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4 text-purple-400" />
                          <span className="text-white/60">{job.views} views</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Jobs Tab */}
        {activeTab === 'jobs' && (
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                <Input
                  placeholder="Search job postings..."
                  className="pl-10 bg-[#121212] border-white/20 text-white"
                />
              </div>
              <Button 
                variant="outline" 
                className="border-white/20 text-white"
                onClick={() => alert('Filter feature coming soon')}
              >
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>

            <div className="space-y-4">
              {jobPostings.map((job) => (
                <Card key={job.id} className="bg-[#121212] border-white/10 p-6 hover:border-[#A8F32C]/50 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl text-white">{job.title}</h3>
                        {getStatusBadge(job.status)}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-white/60">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          {job.salary}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Posted {job.posted}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-white/20 text-white"
                        onClick={() => onNavigate?.('post-job')}
                      >
                        Edit
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
                        onClick={() => onNavigate?.('post-job')}
                      >
                        View
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                    <div>
                      <div className="text-2xl text-white mb-1">{job.applications}</div>
                      <div className="text-sm text-white/60">Applications</div>
                    </div>
                    <div>
                      <div className="text-2xl text-white mb-1">{job.views}</div>
                      <div className="text-sm text-white/60">Views</div>
                    </div>
                    <div>
                      <div className="text-2xl text-white mb-1">
                        {job.applications > 0 ? ((job.views / job.applications) * 100).toFixed(0) : 0}%
                      </div>
                      <div className="text-sm text-white/60">Conversion Rate</div>
                    </div>
                  </div>
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
              <Button 
                variant="outline" 
                className="border-white/20 text-white"
                onClick={() => alert('Filter feature coming soon')}
              >
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button 
                variant="outline" 
                className="border-white/20 text-white"
                onClick={() => alert('Export feature coming soon')}
              >
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>

            <div className="space-y-4">
              {recentApplications.map((app) => (
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
                          {app.wotc && (
                            <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30">
                              WOTC Eligible
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-white/60">
                          <div className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4" />
                            {app.position}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400" />
                            FairPath Score: {app.score}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            Applied {app.applied}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-green-500/30 text-green-400 hover:bg-green-500/10" onClick={() => alert('Accept feature coming soon')}>
                        <CheckCircle className="mr-1 h-4 w-4" />
                        Accept
                      </Button>
                      <Button size="sm" variant="outline" className="border-red-500/30 text-red-400 hover:bg-red-500/10" onClick={() => alert('Reject feature coming soon')}>
                        <XCircle className="mr-1 h-4 w-4" />
                        Reject
                      </Button>
                      <Button size="sm" className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90" onClick={() => onNavigate?.('profile')}>
                        View Profile
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <Card className="bg-[#121212] border-white/10 p-8">
              <h2 className="text-2xl mb-6 text-white">WOTC Tax Credit Projections</h2>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-black/50 border border-white/10 rounded-lg p-6">
                  <div className="text-white/60 text-sm mb-2">Eligible Hires This Year</div>
                  <div className="text-4xl text-[#A8F32C] mb-1">
                    {userData?.packageType === 'starter' ? 6 : userData?.packageType === 'growth' ? 23 : 68}
                  </div>
                  <div className="text-sm text-white/60">Out of {stats.totalApplications} applications</div>
                </div>

                <div className="bg-black/50 border border-white/10 rounded-lg p-6">
                  <div className="text-white/60 text-sm mb-2">Estimated Tax Credits</div>
                  <div className="text-4xl text-[#A8F32C] mb-1">${(stats.wotcSavings / 1000).toFixed(1)}k</div>
                  <div className="text-sm text-white/60">$2,400 - $9,600 per hire</div>
                </div>

                <div className="bg-black/50 border border-white/10 rounded-lg p-6">
                  <div className="text-white/60 text-sm mb-2">ROI on Platform</div>
                  <div className="text-4xl text-[#A8F32C] mb-1">
                    {userData?.packageType === 'starter' ? '48x' : userData?.packageType === 'growth' ? '61x' : '136x'}
                  </div>
                  <div className="text-sm text-white/60">Credits vs. subscription cost</div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#A8F32C]/20 to-transparent border border-[#A8F32C]/30 rounded-lg p-6">
                <h3 className="text-lg text-white mb-2">Understanding WOTC</h3>
                <p className="text-white/60 mb-4">
                  The Work Opportunity Tax Credit provides tax credits of $2,400 to $9,600 for each eligible hire. Justice-impacted individuals often qualify for the maximum credit.
                </p>
                <Button className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">
                  Learn More About WOTC
                </Button>
              </div>
            </Card>

            <Card className="bg-[#121212] border-white/10 p-8">
              <h2 className="text-2xl mb-6 text-white">Hiring Funnel</h2>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white">Applications Received</span>
                    <span className="text-white">{stats.totalApplications}</span>
                  </div>
                  <div className="h-3 bg-black/50 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: '100%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white">Under Review</span>
                    <span className="text-white">{Math.round(stats.totalApplications * 0.6)}</span>
                  </div>
                  <div className="h-3 bg-black/50 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500" style={{ width: '60%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white">Interviews Scheduled</span>
                    <span className="text-white">{Math.round(stats.totalApplications * 0.25)}</span>
                  </div>
                  <div className="h-3 bg-black/50 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500" style={{ width: '25%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white">Offers Extended</span>
                    <span className="text-white">{Math.round(stats.totalApplications * 0.12)}</span>
                  </div>
                  <div className="h-3 bg-black/50 rounded-full overflow-hidden">
                    <div className="h-full bg-[#A8F32C]" style={{ width: '12%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white">Hired</span>
                    <span className="text-white">{Math.round(stats.totalApplications * 0.08)}</span>
                  </div>
                  <div className="h-3 bg-black/50 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: '8%' }} />
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