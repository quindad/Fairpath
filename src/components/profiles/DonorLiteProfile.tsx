import { useState } from 'react';
import { Heart, Gift, TrendingUp, Award, MapPin, Calendar, Package, Users } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar } from '../ui/avatar';
import Logo from '../common/Logo';

interface DonorLiteProfileProps {
  onDonateItem?: () => void;
  onViewMarketplace?: () => void;
}

export default function DonorLiteProfile({ onDonateItem, onViewMarketplace }: DonorLiteProfileProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'donations' | 'impact'>('overview');

  // Mock donor data
  const donor = {
    name: 'Sarah Chen',
    location: 'Denver, CO',
    memberSince: 'Mar 2024',
    totalDonations: 24,
    itemsDonated: 24,
    peopleHelped: 18,
    impactScore: 92,
    badges: [
      { name: 'Generous Giver', icon: Heart, level: 'Gold' },
      { name: 'Community Helper', icon: Users, level: 'Silver' },
      { name: 'Impact Maker', icon: TrendingUp, level: 'Bronze' }
    ],
    recentDonations: [
      { item: 'Winter Jacket (L)', category: 'Clothing', claimedBy: 'Marcus J.', date: '2 days ago', value: '$80' },
      { item: 'Work Boots (Size 10)', category: 'Footwear', claimedBy: 'David M.', date: '5 days ago', value: '$45' },
      { item: 'Business Suit', category: 'Clothing', claimedBy: 'James K.', date: '1 week ago', value: '$120' },
      { item: 'Backpack', category: 'Accessories', claimedBy: 'Chris R.', date: '2 weeks ago', value: '$35' }
    ]
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header with Logo */}
      <div className="border-b border-white/5 bg-[#121212]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Logo size="sm" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card className="bg-[#121212] border-white/10 p-6">
              <div className="text-center mb-4">
                <div className="relative inline-block mb-3">
                  <Avatar className="h-24 w-24 bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-3xl text-white">
                    {donor.name.split(' ').map(n => n[0]).join('')}
                  </Avatar>
                  <div className="absolute -bottom-2 -right-2 bg-[#A8F32C] text-black rounded-full p-1.5">
                    <Heart className="h-4 w-4" />
                  </div>
                </div>

                <h2 className="text-2xl mb-1">{donor.name}</h2>
                <div className="flex items-center justify-center gap-2 text-sm text-white/60 mb-3">
                  <MapPin className="h-4 w-4" />
                  {donor.location}
                </div>

                <Badge className="bg-gradient-to-r from-pink-500 to-purple-500 text-white border-0 mb-3">
                  Donor Lite Member
                </Badge>
              </div>

              <div className="border-t border-white/10 pt-4 mt-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">Member Since</span>
                    <span className="text-white">{donor.memberSince}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">Impact Score</span>
                    <span className="text-[#A8F32C]">{donor.impactScore}/100</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-gradient-to-br from-[#A8F32C]/20 via-[#121212] to-[#121212] border-[#A8F32C]/50 p-6">
              <h3 className="text-lg mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-[#A8F32C]" />
                Your Impact
              </h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl text-[#A8F32C] mb-1">{donor.totalDonations}</div>
                  <div className="text-sm text-white/60">Total Donations</div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-black/30 rounded-lg p-3 text-center">
                    <div className="text-2xl text-white mb-1">{donor.itemsDonated}</div>
                    <div className="text-xs text-white/60">Items Given</div>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3 text-center">
                    <div className="text-2xl text-white mb-1">{donor.peopleHelped}</div>
                    <div className="text-xs text-white/60">People Helped</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Badges */}
            <Card className="bg-[#121212] border-white/10 p-6">
              <h3 className="text-lg mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-500" />
                Your Badges
              </h3>
              <div className="space-y-3">
                {donor.badges.map((badge, i) => {
                  const Icon = badge.icon;
                  const colors = {
                    Gold: 'from-yellow-500 to-yellow-600',
                    Silver: 'from-gray-400 to-gray-500',
                    Bronze: 'from-orange-600 to-orange-700'
                  };
                  return (
                    <div key={i} className="flex items-center gap-3 p-3 bg-black/30 rounded-lg">
                      <div className={`w-10 h-10 bg-gradient-to-br ${colors[badge.level as keyof typeof colors]} rounded-lg flex items-center justify-center`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-white">{badge.name}</div>
                        <div className="text-xs text-white/60">{badge.level} Level</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* CTA */}
            <Card className="bg-gradient-to-br from-pink-500/10 via-[#121212] to-[#121212] border-pink-500/30 p-6">
              <div className="text-center">
                <Gift className="h-12 w-12 text-pink-500 mx-auto mb-3" />
                <h3 className="text-lg mb-2">Have Items to Donate?</h3>
                <p className="text-sm text-white/60 mb-4">
                  List your items on the marketplace and help someone rebuild their life.
                </p>
                <Button
                  onClick={onDonateItem}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600"
                >
                  Donate an Item
                </Button>
              </div>
            </Card>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs */}
            <div className="border-b border-white/10">
              <div className="flex gap-1">
                {[
                  { id: 'overview', label: 'Overview', icon: Heart },
                  { id: 'donations', label: 'My Donations', icon: Package },
                  { id: 'impact', label: 'Impact Stories', icon: Users }
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center gap-2 px-4 py-3 transition-all ${
                        activeTab === tab.id
                          ? 'border-b-2 border-[#A8F32C] text-[#A8F32C]'
                          : 'text-white/60 hover:text-white'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Welcome Message */}
                <Card className="bg-gradient-to-br from-[#A8F32C]/20 via-[#121212] to-[#121212] border-[#A8F32C] p-8">
                  <h2 className="text-2xl mb-3">Thank You for Making a Difference! 🎉</h2>
                  <p className="text-white/80 mb-4">
                    Your donations are helping justice-impacted individuals rebuild their lives. 
                    Every item you give makes a real impact in someone's journey to stability.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-black/30 rounded-lg p-4 text-center">
                      <div className="text-3xl mb-2">🏆</div>
                      <div className="text-sm text-white/60">Top 10% of donors</div>
                    </div>
                    <div className="bg-black/30 rounded-lg p-4 text-center">
                      <div className="text-3xl mb-2">💝</div>
                      <div className="text-sm text-white/60">18 lives touched</div>
                    </div>
                    <div className="bg-black/30 rounded-lg p-4 text-center">
                      <div className="text-3xl mb-2">⭐</div>
                      <div className="text-sm text-white/60">3 badges earned</div>
                    </div>
                  </div>
                </Card>

                {/* Recent Donations */}
                <Card className="bg-[#121212] border-white/10 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl">Recent Donations</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[#A8F32C] hover:text-[#A8F32C]/80"
                    >
                      View All
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {donor.recentDonations.map((donation, i) => (
                      <div key={i} className="flex gap-3 p-4 bg-black/30 rounded-lg hover:bg-black/50 transition-colors">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#A8F32C] to-[#8FD320] rounded-lg flex items-center justify-center flex-shrink-0">
                          <Package className="h-6 w-6 text-black" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-1">
                            <div>
                              <p className="text-white">{donation.item}</p>
                              <p className="text-xs text-white/60">{donation.category}</p>
                            </div>
                            <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30 text-xs">
                              {donation.value}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-white/60">
                            <span>Claimed by {donation.claimedBy}</span>
                            <span>•</span>
                            <span>{donation.date}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Impact Breakdown */}
                <Card className="bg-[#121212] border-white/10 p-6">
                  <h3 className="text-xl mb-4">Donation Categories</h3>
                  <div className="space-y-4">
                    {[
                      { category: 'Clothing', count: 12, percentage: 50 },
                      { category: 'Footwear', count: 5, percentage: 21 },
                      { category: 'Accessories', count: 4, percentage: 17 },
                      { category: 'Professional Attire', count: 3, percentage: 12 }
                    ].map((item) => (
                      <div key={item.category}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-white">{item.category}</span>
                          <span className="text-sm text-white/60">{item.count} items ({item.percentage}%)</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#A8F32C] to-[#8FD320]"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Next Level Progress */}
                <Card className="bg-gradient-to-br from-purple-500/10 via-[#121212] to-[#121212] border-purple-500/30 p-6">
                  <h3 className="text-xl mb-4">Level Progress</h3>
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white">Gold Donor Status</span>
                      <span className="text-[#A8F32C]">24 / 30 items</span>
                    </div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#A8F32C] to-purple-500 w-4/5" />
                    </div>
                  </div>
                  <p className="text-sm text-white/60">
                    Just 6 more donations to reach Gold Donor status and unlock special recognition!
                  </p>
                </Card>
              </div>
            )}

            {/* Other tabs */}
            {activeTab !== 'overview' && (
              <Card className="bg-[#121212] border-white/10 p-12 text-center">
                <p className="text-white/60">
                  {activeTab === 'donations' ? 'Your full donation history' : 'Impact stories from recipients'} coming soon...
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
