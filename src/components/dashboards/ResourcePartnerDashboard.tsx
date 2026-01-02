import { useState } from 'react';
import { Heart, Users, TrendingUp, Bell, Settings, User, Plus, Search, Filter, Download, Eye, CheckCircle, Clock, ChevronRight, Calendar, MapPin, Star, LogOut, Send, FileText, Briefcase, Home } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import LogoFinal from '../common/LogoFinal';
import { useUser } from '../../contexts/UserContext';

interface ResourcePartnerDashboardProps {
  userData?: any;
  onNavigate?: (screen: string) => void;
}

export default function ResourcePartnerDashboard({ userData, onNavigate }: ResourcePartnerDashboardProps) {
  const { logout } = useUser();
  const [activeTab, setActiveTab] = useState<'overview' | 'services' | 'referrals' | 'impact'>('overview');

  // Mock data
  const stats = {
    activeClients: 47,
    totalReferrals: 134,
    successfulPlacements: 89,
    avgFairPathScore: 698
  };

  const clients = [
    { id: 1, name: 'Marcus Johnson', score: 742, status: 'active', lastContact: '2 days ago', enrolled: 'Aug 2024', placements: 2, needs: ['housing', 'employment'] },
    { id: 2, name: 'David Williams', score: 688, status: 'active', lastContact: '5 days ago', enrolled: 'Sep 2024', placements: 1, needs: ['housing'] },
    { id: 3, name: 'James Brown', score: 701, status: 'placed', lastContact: '1 week ago', enrolled: 'Jul 2024', placements: 3, needs: [] },
    { id: 4, name: 'Robert Davis', score: 655, status: 'active', lastContact: '3 days ago', enrolled: 'Oct 2024', placements: 0, needs: ['employment', 'housing', 'support'] },
  ];

  const recentReferrals = [
    { id: 1, client: 'Marcus Johnson', type: 'job', company: 'Amazon Fulfillment', position: 'Warehouse Associate', status: 'interviewing', sent: '3 days ago' },
    { id: 2, client: 'Marcus Johnson', type: 'housing', property: '2847 N Sheffield Ave, Unit 3B', status: 'showing_scheduled', sent: '5 days ago' },
    { id: 3, client: 'David Williams', type: 'housing', property: '1523 W Division St, Unit 2', status: 'approved', sent: '1 week ago' },
    { id: 4, client: 'James Brown', type: 'job', company: 'UPS', position: 'Package Handler', status: 'hired', sent: '2 weeks ago' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30">Active</Badge>;
      case 'placed':
        return <Badge className="bg-purple-500/20 text-purple-500 border-purple-500/30">Placed</Badge>;
      case 'interviewing':
        return <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/30">Interviewing</Badge>;
      case 'showing_scheduled':
        return <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/30">Showing Scheduled</Badge>;
      case 'approved':
        return <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30">Approved</Badge>;
      case 'hired':
        return <Badge className="bg-purple-500/20 text-purple-500 border-purple-500/30">Hired</Badge>;
      default:
        return <Badge className="bg-white/10 text-white/60 border-white/20">Unknown</Badge>;
    }
  };

  const getNeedBadge = (need: string) => {
    switch (need) {
      case 'housing':
        return <Badge variant="outline" className="border-blue-400/30 text-blue-400 text-xs">Housing</Badge>;
      case 'employment':
        return <Badge variant="outline" className="border-green-400/30 text-green-400 text-xs">Employment</Badge>;
      case 'support':
        return <Badge variant="outline" className="border-purple-400/30 text-purple-400 text-xs">Support</Badge>;
      default:
        return null;
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
                  12
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
            <h1 className="text-4xl mb-2 text-white">Welcome back, Second Chance Services!</h1>
            <p className="text-xl text-white/60">
              Managing {stats.activeClients} active clients with {stats.totalReferrals} total referrals
            </p>
          </div>
          <Button 
            onClick={() => onNavigate('add-client')}
            className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
          >
            <Plus className="mr-2 h-5 w-5" />
            Add New Client
          </Button>
        </div>

        {/* Info Banner */}
        <Card className="bg-gradient-to-r from-[#A8F32C]/20 to-transparent border-[#A8F32C]/30 p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#A8F32C]/20 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="h-6 w-6 text-[#A8F32C]" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl mb-2 text-white">Free CRM for 501(c)(3) Organizations</h3>
              <p className="text-white/80 mb-4">
                Manage all your clients in one place. Track referrals, outcomes, and generate reports for funders. Completely free for verified nonprofit organizations.
              </p>
              <Button className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">
                <FileText className="mr-2 h-4 w-4" />
                Generate Funder Report
              </Button>
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-[#121212] border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="h-8 w-8 text-[#A8F32C]" />
            </div>
            <div className="text-3xl mb-2 text-white">{stats.activeClients}</div>
            <div className="text-white/60 text-sm">Active Clients</div>
          </Card>

          <Card className="bg-[#121212] border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <Send className="h-8 w-8 text-blue-400" />
            </div>
            <div className="text-3xl mb-2 text-white">{stats.totalReferrals}</div>
            <div className="text-white/60 text-sm">Total Referrals</div>
          </Card>

          <Card className="bg-[#121212] border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="h-8 w-8 text-purple-400" />
            </div>
            <div className="text-3xl mb-2 text-white">{stats.successfulPlacements}</div>
            <div className="text-white/60 text-sm">Successful Placements</div>
          </Card>

          <Card className="bg-[#121212] border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <Star className="h-8 w-8 text-yellow-400" />
            </div>
            <div className="text-3xl mb-2 text-white">{stats.avgFairPathScore}</div>
            <div className="text-white/60 text-sm">Avg. FairPath Score</div>
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
            onClick={() => setActiveTab('services')}
            className={`px-6 py-3 border-b-2 transition-all ${
              activeTab === 'services'
                ? 'border-[#A8F32C] text-[#A8F32C]'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            Services
          </button>
          <button
            onClick={() => setActiveTab('referrals')}
            className={`px-6 py-3 border-b-2 transition-all ${
              activeTab === 'referrals'
                ? 'border-[#A8F32C] text-[#A8F32C]'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            Referrals
          </button>
          <button
            onClick={() => setActiveTab('impact')}
            className={`px-6 py-3 border-b-2 transition-all ${
              activeTab === 'impact'
                ? 'border-[#A8F32C] text-[#A8F32C]'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            Impact
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card className="bg-[#121212] border-white/10 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl text-white">Recent Activity</h2>
                <Button variant="ghost" className="text-[#A8F32C]">View All</Button>
              </div>
              
              <div className="space-y-4">
                {recentReferrals.slice(0, 4).map((referral) => (
                  <div key={referral.id} className="bg-black/50 border border-white/10 rounded-lg p-4 hover:border-[#A8F32C]/50 transition-all cursor-pointer">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="text-white mb-1">{referral.client}</div>
                        <div className="text-sm text-white/60">
                          {referral.type === 'job' ? referral.position : referral.property}
                        </div>
                      </div>
                      {getStatusBadge(referral.status)}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-white/60">
                        {referral.type === 'job' ? (
                          <><Briefcase className="h-4 w-4" /> Job Referral</>
                        ) : (
                          <><Home className="h-4 w-4" /> Housing Referral</>
                        )}
                      </div>
                      <div className="text-white/40">Sent {referral.sent}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Clients Needing Attention */}
            <Card className="bg-[#121212] border-white/10 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl text-white">Clients Needing Attention</h2>
                <Button variant="ghost" className="text-[#A8F32C]">View All</Button>
              </div>
              
              <div className="space-y-4">
                {clients.filter(c => c.status === 'active' && c.needs.length > 0).map((client) => (
                  <div key={client.id} className="bg-black/50 border border-white/10 rounded-lg p-4 hover:border-blue-500/50 transition-all cursor-pointer">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#A8F32C] to-blue-500 flex items-center justify-center flex-shrink-0">
                          <span className="text-black">{client.name.charAt(0)}</span>
                        </div>
                        <div>
                          <div className="text-white mb-1">{client.name}</div>
                          <div className="flex gap-2 mb-2">
                            {client.needs.map(need => getNeedBadge(need))}
                          </div>
                          <div className="text-xs text-white/60">Last contact: {client.lastContact}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-white/60">
                        <Star className="h-3 w-3 text-yellow-400" />
                        {client.score}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                <Input
                  placeholder="Search clients..."
                  className="pl-10 bg-[#121212] border-white/20 text-white"
                />
              </div>
              <Button variant="outline" className="border-white/20 text-white">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline" className="border-white/20 text-white">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>

            <div className="space-y-4">
              {clients.map((client) => (
                <Card key={client.id} className="bg-[#121212] border-white/10 p-6 hover:border-[#A8F32C]/50 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#A8F32C] to-blue-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-lg text-black">{client.name.charAt(0)}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg text-white">{client.name}</h3>
                          {getStatusBadge(client.status)}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-white/60 mb-2">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400" />
                            FairPath Score: {client.score}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Enrolled {client.enrolled}
                          </div>
                          <div className="flex items-center gap-1">
                            <CheckCircle className="h-4 w-4" />
                            {client.placements} placements
                          </div>
                        </div>
                        {client.needs.length > 0 && (
                          <div className="flex gap-2">
                            {client.needs.map(need => getNeedBadge(need))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-white/20 text-white">
                        <Send className="mr-1 h-4 w-4" />
                        Send Referral
                      </Button>
                      <Button size="sm" className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">
                        View Profile
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="bg-black/50 border border-white/10 rounded-lg p-4">
                    <div className="text-sm text-white/60 mb-2">Last Contact: {client.lastContact}</div>
                    <Button size="sm" variant="outline" className="border-white/20 text-white">
                      Add Note
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Referrals Tab */}
        {activeTab === 'referrals' && (
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                <Input
                  placeholder="Search referrals..."
                  className="pl-10 bg-[#121212] border-white/20 text-white"
                />
              </div>
              <Button variant="outline" className="border-white/20 text-white">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>

            <div className="space-y-4">
              {recentReferrals.map((referral) => (
                <Card key={referral.id} className="bg-[#121212] border-white/10 p-6 hover:border-purple-500/50 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#A8F32C] to-blue-500 flex items-center justify-center flex-shrink-0">
                        {referral.type === 'job' ? (
                          <Briefcase className="h-6 w-6 text-black" />
                        ) : (
                          <Home className="h-6 w-6 text-black" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg text-white">{referral.client}</h3>
                          {getStatusBadge(referral.status)}
                        </div>
                        <div className="text-white/60 mb-2">
                          {referral.type === 'job' ? (
                            <div>
                              <div>{referral.position}</div>
                              <div className="text-sm">{referral.company}</div>
                            </div>
                          ) : (
                            <div className="text-sm">{referral.property}</div>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-white/60">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            Sent {referral.sent}
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">
                      View Details
                    </Button>
                  </div>

                  {referral.status === 'hired' && (
                    <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-purple-400" />
                        <div className="text-white">Successful Placement!</div>
                      </div>
                      <p className="text-sm text-white/60">
                        {referral.client.split(' ')[0]} was hired and started working on {new Date(Date.now() - 7*24*60*60*1000).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Impact Tab */}
        {activeTab === 'impact' && (
          <div className="space-y-6">
            <Card className="bg-[#121212] border-white/10 p-8">
              <h2 className="text-2xl mb-6 text-white">Program Outcomes</h2>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-black/50 border border-white/10 rounded-lg p-6">
                  <div className="text-white/60 text-sm mb-2">Placement Rate</div>
                  <div className="text-4xl text-[#A8F32C] mb-1">
                    {Math.round((stats.successfulPlacements / stats.totalReferrals) * 100)}%
                  </div>
                  <div className="text-sm text-white/60">{stats.successfulPlacements} successful placements</div>
                </div>

                <div className="bg-black/50 border border-white/10 rounded-lg p-6">
                  <div className="text-white/60 text-sm mb-2">Housing Success</div>
                  <div className="text-4xl text-[#A8F32C] mb-1">78%</div>
                  <div className="text-sm text-white/60">Of clients secured housing</div>
                </div>

                <div className="bg-black/50 border border-white/10 rounded-lg p-6">
                  <div className="text-white/60 text-sm mb-2">Employment Success</div>
                  <div className="text-4xl text-[#A8F32C] mb-1">84%</div>
                  <div className="text-sm text-white/60">Of clients secured employment</div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#A8F32C]/20 to-transparent border border-[#A8F32C]/30 rounded-lg p-6">
                <h3 className="text-lg text-white mb-2">Generate Funder Report</h3>
                <p className="text-white/60 mb-4">
                  Download comprehensive reports showing client outcomes, placement rates, and program impact for grant applications and funder updates.
                </p>
                <div className="flex gap-4">
                  <Button className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">
                    <Download className="mr-2 h-4 w-4" />
                    Download Full Report
                  </Button>
                  <Button variant="outline" className="border-white/20 text-white">
                    Customize Report
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="bg-[#121212] border-white/10 p-8">
              <h2 className="text-2xl mb-6 text-white">Client Progress Tracking</h2>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white">Enrolled</span>
                    <span className="text-white">{stats.activeClients}</span>
                  </div>
                  <div className="h-3 bg-black/50 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: '100%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white">Active in Program</span>
                    <span className="text-white">{Math.round(stats.activeClients * 0.85)}</span>
                  </div>
                  <div className="h-3 bg-black/50 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500" style={{ width: '85%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white">Housing Secured</span>
                    <span className="text-white">{Math.round(stats.activeClients * 0.78)}</span>
                  </div>
                  <div className="h-3 bg-black/50 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500" style={{ width: '78%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white">Employment Secured</span>
                    <span className="text-white">{Math.round(stats.activeClients * 0.84)}</span>
                  </div>
                  <div className="h-3 bg-black/50 rounded-full overflow-hidden">
                    <div className="h-full bg-[#A8F32C]" style={{ width: '84%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white">Successfully Completed Program</span>
                    <span className="text-white">{Math.round(stats.activeClients * 0.67)}</span>
                  </div>
                  <div className="h-3 bg-black/50 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: '67%' }} />
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