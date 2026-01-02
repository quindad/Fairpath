import { useState } from 'react';
import { User, MapPin, Briefcase, Home, Calendar, Shield, Edit, Settings, Award, Heart, Clock, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar } from '../ui/avatar';
import Logo, { FairPathPlusLogo } from '../common/Logo';

interface FelonProfileProps {
  onEditProfile?: () => void;
  onSettings?: () => void;
  onUpgrade?: () => void;
}

export default function FelonProfile({ onEditProfile, onSettings, onUpgrade }: FelonProfileProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'applications' | 'saved' | 'resources'>('overview');

  // Mock user data
  const user = {
    name: 'Marcus Johnson',
    location: 'Atlanta, GA',
    memberSince: 'Jan 2024',
    isFairPathPlus: true,
    profileComplete: 85,
    photoUrl: null,
    bio: 'Looking for stable employment and housing. Experienced in warehouse work and retail. Committed to building a better future.',
    skills: ['Forklift Certified', 'Customer Service', 'Warehouse Operations', 'Team Leadership'],
    wotcEligible: true,
    estimatedTaxCredit: 2400,
    convictionYear: '2019',
    releaseYear: '2023',
    applications: {
      jobs: 12,
      housing: 5,
      resources: 8
    },
    marketplaceClaims: {
      used: 3,
      remaining: 4,
      total: 7
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header with Logo */}
      <div className="border-b border-white/5 bg-[#121212]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Logo size="sm" />
            <div className="flex items-center gap-3">
              <Button
                onClick={onSettings}
                variant="ghost"
                size="sm"
                className="text-white/60 hover:text-white"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Sidebar - Profile Card */}
          <div className="lg:col-span-1 space-y-6">
            {/* Main Profile Card */}
            <Card className="bg-[#121212] border-white/10 p-6">
              {/* Profile Photo */}
              <div className="text-center mb-4">
                <div className="relative inline-block mb-3">
                  <Avatar className="h-24 w-24 bg-gradient-to-br from-[#A8F32C] to-[#8FD320] flex items-center justify-center text-3xl text-black">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </Avatar>
                  {user.isFairPathPlus && (
                    <div className="absolute -bottom-2 -right-2 bg-[#A8F32C] text-black rounded-full p-1.5">
                      <Award className="h-4 w-4" />
                    </div>
                  )}
                </div>

                <h2 className="text-2xl mb-1">{user.name}</h2>
                <div className="flex items-center justify-center gap-2 text-sm text-white/60 mb-3">
                  <MapPin className="h-4 w-4" />
                  {user.location}
                </div>

                {user.isFairPathPlus && (
                  <Badge className="bg-gradient-to-r from-[#A8F32C] to-[#8FD320] text-black border-0 mb-3">
                    FairPath+ Member
                  </Badge>
                )}

                <Button
                  onClick={onEditProfile}
                  variant="outline"
                  size="sm"
                  className="w-full border-white/20 hover:bg-white/5 text-white"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="border-t border-white/10 pt-4 mt-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">Member Since</span>
                    <span className="text-white">{user.memberSince}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">Profile Complete</span>
                    <span className="text-[#A8F32C]">{user.profileComplete}%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">Applications Sent</span>
                    <span className="text-white">{user.applications.jobs + user.applications.housing}</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* FairPath+ Benefits */}
            {user.isFairPathPlus ? (
              <Card className="bg-gradient-to-br from-[#A8F32C]/20 via-[#121212] to-[#121212] border-[#A8F32C]/50 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="h-5 w-5 text-[#A8F32C]" />
                  <h3 className="text-lg">FairPath+ Active</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-[#A8F32C]" />
                    <span className="text-white/80">Ad-free experience</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-[#A8F32C]" />
                    <span className="text-white/80">7 marketplace claims</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-[#A8F32C]" />
                    <span className="text-white/80">FastTrack discount ($65)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-[#A8F32C]" />
                    <span className="text-white/80">Verified badge</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-[#A8F32C]" />
                    <span className="text-white/80">FairPath Staffing access</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="text-xs text-white/60">Next billing: Feb 1, 2024</div>
                  <div className="text-xs text-white/60">$2.00/month</div>
                </div>
              </Card>
            ) : (
              <Card className="bg-[#121212] border-[#A8F32C]/50 p-6">
                <div className="text-center">
                  <FairPathPlusLogo size="lg" className="justify-center mb-3" />
                  <p className="text-sm text-white/60 mb-4">
                    Unlock FastTrack discounts, more marketplace claims, and FairPath Staffing access.
                  </p>
                  <div className="text-2xl text-[#A8F32C] mb-4">$2/month</div>
                  <Button
                    onClick={onUpgrade}
                    className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
                  >
                    Upgrade to FairPath+
                  </Button>
                </div>
              </Card>
            )}

            {/* Marketplace Claims */}
            <Card className="bg-[#121212] border-white/10 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Heart className="h-5 w-5 text-[#A8F32C]" />
                <h3 className="text-lg">Marketplace Claims</h3>
              </div>
              <div className="text-center mb-4">
                <div className="text-4xl text-[#A8F32C] mb-1">
                  {user.marketplaceClaims.remaining}
                </div>
                <div className="text-sm text-white/60">
                  of {user.marketplaceClaims.total} remaining
                </div>
              </div>
              <div className="flex gap-1">
                {Array.from({ length: user.marketplaceClaims.total }).map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 h-2 rounded ${
                      i < user.marketplaceClaims.used
                        ? 'bg-white/20'
                        : 'bg-[#A8F32C]'
                    }`}
                  />
                ))}
              </div>
            </Card>

            {/* WOTC Value */}
            {user.wotcEligible && (
              <Card className="bg-gradient-to-br from-yellow-500/10 via-[#121212] to-[#121212] border-yellow-500/30 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="h-5 w-5 text-yellow-500" />
                  <h3 className="text-lg">Tax Credit Value</h3>
                </div>
                <p className="text-sm text-white/60 mb-3">
                  Employers can earn up to:
                </p>
                <div className="text-3xl text-yellow-500 mb-2">
                  ${user.estimatedTaxCredit.toLocaleString()}
                </div>
                <p className="text-xs text-white/40">
                  This makes you more attractive to employers!
                </p>
              </Card>
            )}
          </div>

          {/* Right Content - Main Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs */}
            <div className="border-b border-white/10">
              <div className="flex gap-1">
                {[
                  { id: 'overview', label: 'Overview', icon: User },
                  { id: 'applications', label: 'Applications', icon: Briefcase },
                  { id: 'saved', label: 'Saved', icon: Heart },
                  { id: 'resources', label: 'Resources', icon: Shield }
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
                {/* About */}
                <Card className="bg-[#121212] border-white/10 p-6">
                  <h3 className="text-xl mb-4">About Me</h3>
                  <p className="text-white/80 mb-6">{user.bio}</p>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm text-white/60 mb-2">Skills & Certifications</h4>
                      <div className="flex flex-wrap gap-2">
                        {user.skills.map((skill) => (
                          <Badge key={skill} className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                      <div>
                        <h4 className="text-sm text-white/60 mb-1">Conviction Year</h4>
                        <p className="text-white">{user.convictionYear}</p>
                      </div>
                      <div>
                        <h4 className="text-sm text-white/60 mb-1">Release Year</h4>
                        <p className="text-white">{user.releaseYear}</p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Application Stats */}
                <Card className="bg-[#121212] border-white/10 p-6">
                  <h3 className="text-xl mb-4">Application Activity</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-black/30 rounded-lg p-4">
                      <Briefcase className="h-8 w-8 text-[#A8F32C] mb-2" />
                      <div className="text-2xl mb-1">{user.applications.jobs}</div>
                      <div className="text-sm text-white/60">Job Applications</div>
                    </div>
                    <div className="bg-black/30 rounded-lg p-4">
                      <Home className="h-8 w-8 text-[#A8F32C] mb-2" />
                      <div className="text-2xl mb-1">{user.applications.housing}</div>
                      <div className="text-sm text-white/60">Housing Applications</div>
                    </div>
                    <div className="bg-black/30 rounded-lg p-4">
                      <Shield className="h-8 w-8 text-[#A8F32C] mb-2" />
                      <div className="text-2xl mb-1">{user.applications.resources}</div>
                      <div className="text-sm text-white/60">Resource Requests</div>
                    </div>
                  </div>
                </Card>

                {/* Recent Activity */}
                <Card className="bg-[#121212] border-white/10 p-6">
                  <h3 className="text-xl mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {[
                      { icon: Briefcase, action: 'Applied to', target: 'Warehouse Associate - ABC Logistics', time: '2 hours ago', type: 'job' },
                      { icon: Home, action: 'Scheduled showing for', target: '2BR Apartment - Oak Street', time: '1 day ago', type: 'housing' },
                      { icon: Heart, action: 'Claimed', target: 'Winter Coat from Marketplace', time: '3 days ago', type: 'marketplace' },
                      { icon: Shield, action: 'Contacted', target: 'Atlanta Reentry Center', time: '5 days ago', type: 'resource' }
                    ].map((activity, i) => {
                      const Icon = activity.icon;
                      return (
                        <div key={i} className="flex gap-3 p-3 bg-black/30 rounded-lg hover:bg-black/50 transition-colors">
                          <div className="w-10 h-10 bg-[#A8F32C]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Icon className="h-5 w-5 text-[#A8F32C]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-white">
                              {activity.action} <span className="text-[#A8F32C]">{activity.target}</span>
                            </p>
                            <p className="text-xs text-white/40 mt-1">{activity.time}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              </div>
            )}

            {/* Other tabs would go here */}
            {activeTab !== 'overview' && (
              <Card className="bg-[#121212] border-white/10 p-12 text-center">
                <p className="text-white/60">
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} content coming soon...
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
