import { useState } from 'react';
import { Package, Heart, FileText, TrendingUp, Bell, Settings, User, Filter, Search, Calendar, DollarSign, MapPin, Clock, CheckCircle, XCircle, MessageCircle, Star, LogOut, Plus, Users, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import LogoFinal from '../common/LogoFinal';
import { useUser } from '../../contexts/UserContext';
import RecipientProfile from '../donor/RecipientProfile';

interface DonorDashboardProps {
  userData?: any;
  onNavigate?: (screen: string) => void;
}

export default function DonorDashboard({ userData, onNavigate }: DonorDashboardProps) {
  const { logout } = useUser();
  const [activeTab, setActiveTab] = useState<'overview' | 'active' | 'pending' | 'completed'>('overview');
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [viewingProfile, setViewingProfile] = useState<string | null>(null);

  // Handle approve claim
  const handleApproveClaim = (claimId: number) => {
    alert(`✅ Claim #${claimId} approved! The recipient will be notified to arrange pickup.`);
    // In production, this would update the backend
  };

  // Handle view profile
  const handleViewProfile = (claimantName: string) => {
    setViewingProfile(claimantName);
  };

  // Handle view item details
  const handleViewItem = (itemId: number) => {
    setSelectedItem(itemId);
    alert(`Opening details for item #${itemId}...`);
    // In production, this would open a modal or navigate to item details
  };

  // If viewing profile, show profile view
  if (viewingProfile) {
    return <RecipientProfile recipientName={viewingProfile} onBack={() => setViewingProfile(null)} />;
  }

  // Mock data
  const stats = {
    itemsPosted: 12,
    activeClaims: 8,
    itemsGiven: 24,
    livesImpacted: 18
  };

  const myItems = [
    { id: 1, title: 'Queen Mattress & Box Spring', category: 'Furniture', claims: 5, status: 'active', posted: '3 days ago', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800' },
    { id: 2, title: 'Professional Interview Clothes (Men\'s L)', category: 'Clothing', claims: 3, status: 'active', posted: '5 days ago', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800' },
    { id: 3, title: 'Kitchen Essentials Bundle', category: 'Household', claims: 7, status: 'claimed', posted: '1 week ago', image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800' },
    { id: 4, title: 'Twin Bed Frame', category: 'Furniture', claims: 0, status: 'active', posted: '2 days ago', image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800' },
  ];

  const recentClaims = [
    { id: 1, claimant: 'Marcus J.', item: 'Queen Mattress & Box Spring', story: 'Just got released last week and sleeping on the floor. This would help me so much to feel like I have a real home again.', score: 742, status: 'pending', claimed: '2 hours ago' },
    { id: 2, claimant: 'David W.', item: 'Queen Mattress & Box Spring', story: 'Starting my new job next week and need proper rest. Been staying at a halfway house but don\'t have a bed.', score: 688, status: 'pending', claimed: '5 hours ago' },
    { id: 3, claimant: 'James B.', item: 'Professional Interview Clothes (Men\'s L)', story: 'Have a job interview at Amazon this Thursday. I\'m 6\'0" 190lbs. This would mean everything.', score: 701, status: 'approved', claimed: '1 day ago' },
    { id: 4, claimant: 'Robert D.', item: 'Kitchen Essentials Bundle', story: 'Just moved into my first apartment after 3 years. Need basics to cook healthy meals.', score: 655, status: 'completed', claimed: '3 days ago' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30">Active</Badge>;
      case 'claimed':
        return <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/30">Claimed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">Pending</Badge>;
      case 'approved':
        return <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30">Approved</Badge>;
      case 'completed':
        return <Badge className="bg-purple-500/20 text-purple-500 border-purple-500/30">Completed</Badge>;
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
              <Button 
                onClick={() => onNavigate?.('notifications')}
                variant="outline" 
                className="border-white/20 text-white relative"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#A8F32C] rounded-full text-xs text-black flex items-center justify-center">
                  {stats.activeClaims}
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl mb-2 text-white">Welcome back, Sarah!</h1>
            <p className="text-xl text-white/60">
              You've helped {stats.livesImpacted} people restart their lives
            </p>
          </div>
          <Button 
            onClick={() => onNavigate('post-item')}
            className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
          >
            <Plus className="mr-2 h-5 w-5" />
            Post New Item
          </Button>
        </div>

        {/* Impact Summary */}
        <Card className="bg-gradient-to-r from-[#A8F32C]/20 to-transparent border-[#A8F32C]/30 p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#A8F32C]/20 flex items-center justify-center flex-shrink-0">
              <Heart className="h-6 w-6 text-[#A8F32C]" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl mb-2 text-white">Your Impact</h3>
              <p className="text-white/80 mb-4">
                Every item you donate helps someone rebuild their life after incarceration. You're making a real difference in your community.
              </p>
              <div className="flex gap-4">
                <div className="bg-black/30 border border-white/10 rounded-lg px-4 py-2">
                  <div className="text-2xl text-[#A8F32C] mb-1">{stats.itemsGiven}</div>
                  <div className="text-sm text-white/60">Items Given</div>
                </div>
                <div className="bg-black/30 border border-white/10 rounded-lg px-4 py-2">
                  <div className="text-2xl text-[#A8F32C] mb-1">{stats.livesImpacted}</div>
                  <div className="text-sm text-white/60">Lives Impacted</div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-[#121212] border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <Package className="h-8 w-8 text-[#A8F32C]" />
            </div>
            <div className="text-3xl mb-2 text-white">{stats.itemsPosted}</div>
            <div className="text-white/60 text-sm">Items Posted</div>
          </Card>

          <Card className="bg-[#121212] border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="h-8 w-8 text-blue-400" />
            </div>
            <div className="text-3xl mb-2 text-white">{stats.activeClaims}</div>
            <div className="text-white/60 text-sm">Active Claims</div>
          </Card>

          <Card className="bg-[#121212] border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="h-8 w-8 text-purple-400" />
            </div>
            <div className="text-3xl mb-2 text-white">{stats.itemsGiven}</div>
            <div className="text-white/60 text-sm">Items Given Away</div>
          </Card>

          <Card className="bg-[#121212] border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <Heart className="h-8 w-8 text-red-400" />
            </div>
            <div className="text-3xl mb-2 text-white">{stats.livesImpacted}</div>
            <div className="text-white/60 text-sm">Lives Impacted</div>
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
            onClick={() => setActiveTab('active')}
            className={`px-6 py-3 border-b-2 transition-all ${
              activeTab === 'active'
                ? 'border-[#A8F32C] text-[#A8F32C]'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            Active Items
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-6 py-3 border-b-2 transition-all ${
              activeTab === 'pending'
                ? 'border-[#A8F32C] text-[#A8F32C]'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            Pending Claims
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-6 py-3 border-b-2 transition-all ${
              activeTab === 'completed'
                ? 'border-[#A8F32C] text-[#A8F32C]'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            Completed Claims
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Pending Claims */}
            <Card className="bg-[#121212] border-white/10 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl text-white">Pending Claims</h2>
                <Button variant="ghost" className="text-[#A8F32C]">View All</Button>
              </div>
              
              <div className="space-y-4">
                {recentClaims.filter(c => c.status === 'pending').map((claim) => (
                  <div key={claim.id} className="bg-black/50 border border-white/10 rounded-lg p-4 hover:border-[#A8F32C]/50 transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#A8F32C] to-blue-500 flex items-center justify-center flex-shrink-0">
                          <span className="text-sm text-black">{claim.claimant.charAt(0)}</span>
                        </div>
                        <div>
                          <div className="text-white mb-1">{claim.claimant}</div>
                          <div className="text-xs text-white/60">{claim.item}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-white/60">
                        <Star className="h-3 w-3 text-yellow-400" />
                        {claim.score}
                      </div>
                    </div>
                    <p className="text-sm text-white/80 mb-3 italic">"{claim.story}"</p>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90" onClick={() => handleApproveClaim(claim.id)}>
                        <CheckCircle className="mr-1 h-4 w-4" />
                        Approve
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 border-white/20 text-white" onClick={() => handleViewProfile(claim.claimant)}>
                        View Profile
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Active Items */}
            <Card className="bg-[#121212] border-white/10 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl text-white">Active Items</h2>
                <Button variant="ghost" className="text-[#A8F32C]">View All</Button>
              </div>
              
              <div className="space-y-4">
                {myItems.filter(i => i.status === 'active').map((item) => (
                  <div key={item.id} className="bg-black/50 border border-white/10 rounded-lg p-4 hover:border-blue-500/50 transition-all cursor-pointer" onClick={() => handleViewItem(item.id)}>
                    <div className="flex gap-3">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="text-white mb-1">{item.title}</div>
                        <div className="text-sm text-white/60 mb-2">{item.category}</div>
                        <div className="flex items-center gap-4 text-xs text-white/60">
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {item.claims} claims
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Posted {item.posted}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Active Items Tab */}
        {activeTab === 'active' && (
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                <Input
                  placeholder="Search my items..."
                  className="pl-10 bg-[#121212] border-white/20 text-white"
                />
              </div>
              <Button variant="outline" className="border-white/20 text-white">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myItems.map((item) => (
                <Card key={item.id} className="bg-[#121212] border-white/10 overflow-hidden hover:border-[#A8F32C]/50 transition-all">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg text-white">{item.title}</h3>
                      {getStatusBadge(item.status)}
                    </div>
                    <div className="text-sm text-white/60 mb-4">{item.category}</div>
                    
                    <div className="flex items-center justify-between text-sm mb-4">
                      <div className="flex items-center gap-1 text-white/60">
                        <Users className="h-4 w-4" />
                        {item.claims} claims
                      </div>
                      <div className="flex items-center gap-1 text-white/60">
                        <Calendar className="h-4 w-4" />
                        {item.posted}
                      </div>
                    </div>

                    <Button className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90" onClick={() => handleViewItem(item.id)}>
                      View Details
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Pending Claims Tab */}
        {activeTab === 'pending' && (
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                <Input
                  placeholder="Search claims..."
                  className="pl-10 bg-[#121212] border-white/20 text-white"
                />
              </div>
              <Button variant="outline" className="border-white/20 text-white">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>

            <div className="space-y-4">
              {recentClaims.map((claim) => (
                <Card key={claim.id} className="bg-[#121212] border-white/10 p-6 hover:border-purple-500/50 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#A8F32C] to-blue-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-lg text-black">{claim.claimant.charAt(0)}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg text-white">{claim.claimant}</h3>
                          {getStatusBadge(claim.status)}
                        </div>
                        <div className="text-sm text-white/60 mb-2">{claim.item}</div>
                        <div className="flex items-center gap-4 text-sm text-white/60">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400" />
                            FairPath Score: {claim.score}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            Claimed {claim.claimed}
                          </div>
                        </div>
                      </div>
                    </div>
                    {claim.status === 'pending' && (
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90" onClick={() => handleApproveClaim(claim.id)}>
                          <CheckCircle className="mr-1 h-4 w-4" />
                          Approve
                        </Button>
                        <Button size="sm" variant="outline" className="border-white/20 text-white" onClick={() => handleViewProfile(claim.claimant)}>
                          View Profile
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="bg-black/50 border border-white/10 rounded-lg p-4">
                    <div className="text-sm text-white/60 mb-1">Their Story:</div>
                    <p className="text-white italic">"{claim.story}"</p>
                  </div>

                  {claim.status === 'approved' && (
                    <div className="bg-[#A8F32C]/10 border border-[#A8F32C]/30 rounded-lg p-4 mt-4">
                      <div className="text-white mb-1">Pickup Scheduled</div>
                      <div className="text-sm text-white/60">Contact them to arrange pickup details</div>
                    </div>
                  )}

                  {claim.status === 'completed' && (
                    <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 mt-4">
                      <div className="text-white mb-1">Item Delivered!</div>
                      <div className="text-sm text-white/60">You helped {claim.claimant.split(' ')[0]} restart their life ❤️</div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Completed Claims Tab */}
        {activeTab === 'completed' && (
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                <Input
                  placeholder="Search claims..."
                  className="pl-10 bg-[#121212] border-white/20 text-white"
                />
              </div>
              <Button variant="outline" className="border-white/20 text-white">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>

            <div className="space-y-4">
              {recentClaims.map((claim) => (
                <Card key={claim.id} className="bg-[#121212] border-white/10 p-6 hover:border-purple-500/50 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#A8F32C] to-blue-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-lg text-black">{claim.claimant.charAt(0)}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg text-white">{claim.claimant}</h3>
                          {getStatusBadge(claim.status)}
                        </div>
                        <div className="text-sm text-white/60 mb-2">{claim.item}</div>
                        <div className="flex items-center gap-4 text-sm text-white/60">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400" />
                            FairPath Score: {claim.score}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            Claimed {claim.claimed}
                          </div>
                        </div>
                      </div>
                    </div>
                    {claim.status === 'pending' && (
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90" onClick={() => handleApproveClaim(claim.id)}>
                          <CheckCircle className="mr-1 h-4 w-4" />
                          Approve
                        </Button>
                        <Button size="sm" variant="outline" className="border-white/20 text-white" onClick={() => handleViewProfile(claim.claimant)}>
                          View Profile
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="bg-black/50 border border-white/10 rounded-lg p-4">
                    <div className="text-sm text-white/60 mb-1">Their Story:</div>
                    <p className="text-white italic">"{claim.story}"</p>
                  </div>

                  {claim.status === 'approved' && (
                    <div className="bg-[#A8F32C]/10 border border-[#A8F32C]/30 rounded-lg p-4 mt-4">
                      <div className="text-white mb-1">Pickup Scheduled</div>
                      <div className="text-sm text-white/60">Contact them to arrange pickup details</div>
                    </div>
                  )}

                  {claim.status === 'completed' && (
                    <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 mt-4">
                      <div className="text-white mb-1">Item Delivered!</div>
                      <div className="text-sm text-white/60">You helped {claim.claimant.split(' ')[0]} restart their life ❤️</div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}