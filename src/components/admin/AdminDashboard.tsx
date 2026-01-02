import { useState } from 'react';
import { Shield, Users, Briefcase, Home, Package, DollarSign, TrendingUp, Activity, AlertCircle, CheckCircle, XCircle, Search } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import LogoFinal from '../common/LogoFinal';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'jobs' | 'housing' | 'marketplace' | 'revenue'>('overview');

  // Mock admin stats
  const stats = {
    totalUsers: 12847,
    totalFelons: 8923,
    totalEmployers: 2156,
    totalPropertyOwners: 1342,
    totalDonors: 426,
    activeJobs: 1847,
    activeHousing: 923,
    activeMarketplace: 384,
    monthlyRevenue: 127543,
    fastTrackRevenue: 89234,
    fairPathPlusRevenue: 38309,
    applicationsPending: 342,
    applicationsApproved: 1829,
    applicationsDenied: 567
  };

  const recentActivity = [
    {
      id: '1',
      type: 'fasttrack_housing',
      user: 'Marcus Johnson',
      action: 'Applied to Lincoln Park Apartments via FastTrack',
      amount: 75,
      timestamp: '2 min ago'
    },
    {
      id: '2',
      type: 'fairpath_plus',
      user: 'Sarah Mitchell',
      action: 'Subscribed to FairPath+',
      amount: 2,
      timestamp: '5 min ago'
    },
    {
      id: '3',
      type: 'job_post',
      user: 'Amazon Fulfillment',
      action: 'Posted new Warehouse Associate job',
      amount: 0,
      timestamp: '12 min ago'
    },
    {
      id: '4',
      type: 'donation',
      user: 'Jennifer Williams',
      action: 'Donated Queen Mattress (tax-deductible)',
      amount: 0,
      timestamp: '18 min ago'
    },
    {
      id: '5',
      type: 'fasttrack_housing',
      user: 'Jamal Thompson',
      action: 'Applied to Wicker Park Condo via FastTrack',
      amount: 75,
      timestamp: '23 min ago'
    }
  ];

  const flaggedContent = [
    {
      id: '1',
      type: 'application',
      reporter: 'Lincoln Park Apartments',
      subject: 'Suspicious application from John Doe',
      reason: 'Potential fraud - duplicate information',
      status: 'pending'
    },
    {
      id: '2',
      type: 'job_post',
      reporter: 'System Auto-Flag',
      subject: 'Job post may violate conviction discrimination',
      reason: 'Post excludes all conviction types',
      status: 'pending'
    },
    {
      id: '3',
      type: 'message',
      reporter: 'Marcus Johnson',
      subject: 'Inappropriate message from donor',
      reason: 'Harassment in marketplace communication',
      status: 'resolved'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="border-b border-white/5 bg-[#121212]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <LogoFinal size="md" />
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-lg">
              <span className="text-red-400 text-sm font-bold">🔒 ADMIN ACCESS</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl text-white mb-2">ADMIN DASHBOARD</h1>
          <p className="text-white/60">FairPath Industries System Oversight</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview', icon: Activity },
            { id: 'users', label: 'Users', icon: Users },
            { id: 'jobs', label: 'Jobs', icon: Briefcase },
            { id: 'housing', label: 'Housing', icon: Home },
            { id: 'marketplace', label: 'Marketplace', icon: Package },
            { id: 'revenue', label: 'Revenue', icon: DollarSign }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-lg border transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-[#A8F32C] text-black border-[#A8F32C]'
                    : 'bg-[#121212] text-white border-white/20 hover:border-white/40'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-r from-[#A8F32C]/20 to-transparent border-[#A8F32C]/30 p-6">
                <div className="flex items-center gap-3">
                  <Users className="h-8 w-8 text-[#A8F32C]" />
                  <div>
                    <p className="text-sm text-white/60">Total Users</p>
                    <p className="text-3xl text-white">{stats.totalUsers.toLocaleString()}</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-r from-blue-500/20 to-transparent border-blue-500/30 p-6">
                <div className="flex items-center gap-3">
                  <Briefcase className="h-8 w-8 text-blue-400" />
                  <div>
                    <p className="text-sm text-white/60">Active Jobs</p>
                    <p className="text-3xl text-white">{stats.activeJobs.toLocaleString()}</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500/20 to-transparent border-purple-500/30 p-6">
                <div className="flex items-center gap-3">
                  <Home className="h-8 w-8 text-purple-400" />
                  <div>
                    <p className="text-sm text-white/60">Active Housing</p>
                    <p className="text-3xl text-white">{stats.activeHousing.toLocaleString()}</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-r from-green-500/20 to-transparent border-green-500/30 p-6">
                <div className="flex items-center gap-3">
                  <DollarSign className="h-8 w-8 text-green-400" />
                  <div>
                    <p className="text-sm text-white/60">Monthly Revenue</p>
                    <p className="text-3xl text-white">${(stats.monthlyRevenue / 1000).toFixed(0)}K</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* User Breakdown */}
            <Card className="bg-[#121212] border-white/10 p-6">
              <h2 className="text-2xl text-white mb-6">USER BREAKDOWN</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center p-4 bg-black rounded-lg">
                  <p className="text-3xl text-[#A8F32C] mb-2">{stats.totalFelons.toLocaleString()}</p>
                  <p className="text-sm text-white/60">Justice-Impacted</p>
                </div>
                <div className="text-center p-4 bg-black rounded-lg">
                  <p className="text-3xl text-blue-400 mb-2">{stats.totalEmployers.toLocaleString()}</p>
                  <p className="text-sm text-white/60">Employers</p>
                </div>
                <div className="text-center p-4 bg-black rounded-lg">
                  <p className="text-3xl text-purple-400 mb-2">{stats.totalPropertyOwners.toLocaleString()}</p>
                  <p className="text-sm text-white/60">Property Owners</p>
                </div>
                <div className="text-center p-4 bg-black rounded-lg">
                  <p className="text-3xl text-yellow-400 mb-2">{stats.totalDonors.toLocaleString()}</p>
                  <p className="text-sm text-white/60">Donors</p>
                </div>
                <div className="text-center p-4 bg-black rounded-lg">
                  <p className="text-3xl text-white mb-2">{stats.activeMarketplace}</p>
                  <p className="text-sm text-white/60">Marketplace Items</p>
                </div>
              </div>
            </Card>

            {/* Revenue Breakdown */}
            <Card className="bg-[#121212] border-white/10 p-6">
              <h2 className="text-2xl text-white mb-6">REVENUE BREAKDOWN</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-gradient-to-r from-yellow-500/20 to-transparent border border-yellow-500/30 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-2xl">⚡</div>
                    <div>
                      <p className="text-sm text-white/60">FastTrack Revenue</p>
                      <p className="text-3xl text-white">${(stats.fastTrackRevenue / 1000).toFixed(1)}K</p>
                    </div>
                  </div>
                  <p className="text-xs text-white/60 mt-3">
                    {Math.round(stats.fastTrackRevenue / 75)} housing applications
                  </p>
                </div>

                <div className="p-6 bg-gradient-to-r from-[#A8F32C]/20 to-transparent border border-[#A8F32C]/30 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-2xl">⭐</div>
                    <div>
                      <p className="text-sm text-white/60">FairPath+ Revenue</p>
                      <p className="text-3xl text-white">${(stats.fairPathPlusRevenue / 1000).toFixed(1)}K</p>
                    </div>
                  </div>
                  <p className="text-xs text-white/60 mt-3">
                    {Math.round(stats.fairPathPlusRevenue / 2)} active subscriptions
                  </p>
                </div>

                <div className="p-6 bg-gradient-to-r from-green-500/20 to-transparent border border-green-500/30 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="h-8 w-8 text-green-400" />
                    <div>
                      <p className="text-sm text-white/60">Total Revenue</p>
                      <p className="text-3xl text-white">${(stats.monthlyRevenue / 1000).toFixed(1)}K</p>
                    </div>
                  </div>
                  <p className="text-xs text-green-400 mt-3">
                    +23% from last month
                  </p>
                </div>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-[#121212] border-white/10 p-6">
              <h2 className="text-2xl text-white mb-6">RECENT ACTIVITY</h2>
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-4 bg-black rounded-lg border border-white/10">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        activity.type === 'fasttrack_housing' ? 'bg-yellow-500/20 text-yellow-400' :
                        activity.type === 'fairpath_plus' ? 'bg-[#A8F32C]/20 text-[#A8F32C]' :
                        activity.type === 'job_post' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-purple-500/20 text-purple-400'
                      }`}>
                        {activity.type === 'fasttrack_housing' && '⚡'}
                        {activity.type === 'fairpath_plus' && '⭐'}
                        {activity.type === 'job_post' && '💼'}
                        {activity.type === 'donation' && '❤️'}
                      </div>
                      <div>
                        <p className="text-white">{activity.user}</p>
                        <p className="text-sm text-white/60">{activity.action}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {activity.amount > 0 && (
                        <p className="text-[#A8F32C] font-bold">+${activity.amount}</p>
                      )}
                      <p className="text-xs text-white/40">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Flagged Content */}
            <Card className="bg-gradient-to-r from-red-500/20 to-transparent border-red-500/30 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl text-white flex items-center gap-2">
                  <AlertCircle className="h-6 w-6 text-red-400" />
                  FLAGGED CONTENT
                </h2>
                <span className="px-3 py-1 bg-red-500/20 text-red-400 text-sm rounded-lg">
                  {flaggedContent.filter(f => f.status === 'pending').length} Pending Review
                </span>
              </div>
              <div className="space-y-3">
                {flaggedContent.map((flag) => (
                  <div key={flag.id} className="p-4 bg-black rounded-lg border border-white/10">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-1 rounded text-xs ${
                            flag.status === 'pending' 
                              ? 'bg-yellow-500/20 text-yellow-400' 
                              : 'bg-green-500/20 text-green-400'
                          }`}>
                            {flag.status === 'pending' ? 'PENDING' : 'RESOLVED'}
                          </span>
                          <span className="text-white/60 text-xs uppercase">{flag.type}</span>
                        </div>
                        <h3 className="text-white">{flag.subject}</h3>
                        <p className="text-sm text-white/60 mt-1">Reporter: {flag.reporter}</p>
                      </div>
                    </div>
                    <p className="text-sm text-white/80 mb-3">{flag.reason}</p>
                    {flag.status === 'pending' && (
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">
                          <CheckCircle className="mr-2 h-4 w-4" />
                          REVIEW
                        </Button>
                        <Button size="sm" variant="outline" className="border-red-500/50 text-red-400">
                          <XCircle className="mr-2 h-4 w-4" />
                          DISMISS
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Other tabs would show filtered data */}
        {activeTab !== 'overview' && (
          <Card className="bg-[#121212] border-white/10 p-12 text-center">
            <Shield className="h-16 w-16 text-white/20 mx-auto mb-4" />
            <h3 className="text-2xl text-white mb-2">{activeTab.toUpperCase()} MANAGEMENT</h3>
            <p className="text-white/60">
              Detailed {activeTab} management interface would appear here
            </p>
            <div className="mt-6">
              <Input
                placeholder={`Search ${activeTab}...`}
                className="bg-black border-white/20 text-white max-w-md mx-auto"
              />
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
