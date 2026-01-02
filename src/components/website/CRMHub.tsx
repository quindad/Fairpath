import { Building2, Home, HeartHandshake, Briefcase, ArrowRight, Users, Shield, DollarSign, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import Navigation from './Navigation';
import Footer from './Footer';

interface CRMHubProps {
  onNavigate: (page: string) => void;
}

export default function CRMHub({ onNavigate }: CRMHubProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation onNavigate={onNavigate} currentPage="crm-hub" />

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-blue-500/20 text-blue-400 border-blue-500/30">
              Business Portals
            </Badge>
            <h1 className="text-6xl font-bold mb-6">
              Access Your <span className="text-[#A8F32C]">CRM Portal</span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Four specialized portals for employers, property owners, staffing teams, and resource partners. 
              All portals support both Friend A Felon and Friend A Veteran platforms.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                <p className="text-3xl font-bold">650K+</p>
                <p className="text-sm text-white/60">Active Users</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6 text-center">
                <Briefcase className="h-8 w-8 text-green-400 mx-auto mb-3" />
                <p className="text-3xl font-bold">12,500+</p>
                <p className="text-sm text-white/60">Job Postings</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6 text-center">
                <Home className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                <p className="text-3xl font-bold">8,300+</p>
                <p className="text-sm text-white/60">Housing Listings</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6 text-center">
                <DollarSign className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
                <p className="text-3xl font-bold">$48.6M</p>
                <p className="text-sm text-white/60">WOTC Credits</p>
              </CardContent>
            </Card>
          </div>

          {/* CRM Portal Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* FairPath Staffing CRM */}
            <Card className="bg-gradient-to-br from-orange-500/20 to-transparent border-orange-500/50 hover:border-orange-500 transition-all cursor-pointer group">
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-16 h-16 bg-orange-500/20 rounded-lg flex items-center justify-center">
                    <Briefcase className="h-8 w-8 text-orange-400" />
                  </div>
                  <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                    Internal Team
                  </Badge>
                </div>
                
                <h3 className="text-2xl font-bold mb-3">FairPath Staffing CRM</h3>
                <p className="text-white/70 mb-6">
                  Full-service recruiting platform for internal staffing teams. Manage candidates from both Friend A Felon 
                  and Friend A Veteran platforms with unified pipeline and WOTC processing.
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4 text-green-400" />
                    <span>Candidates from both platforms</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4 text-green-400" />
                    <span>Release + Separation alerts</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4 text-green-400" />
                    <span>Automated WOTC processing</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4 text-green-400" />
                    <span>$500-$1,500 per placement</span>
                  </div>
                </div>

                <div className="flex gap-3 mb-6">
                  <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30">
                    Friend A Felon
                  </Badge>
                  <Badge className="bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30">
                    Friend A Veteran
                  </Badge>
                </div>

                <Button 
                  onClick={() => onNavigate('staffing-crm')}
                  className="w-full bg-orange-600 hover:bg-orange-700 group-hover:bg-orange-700"
                >
                  Open Staffing CRM
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* Employer CRM */}
            <Card className="bg-gradient-to-br from-blue-500/20 to-transparent border-blue-500/50 hover:border-blue-500 transition-all cursor-pointer group">
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Building2 className="h-8 w-8 text-blue-400" />
                  </div>
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                    Employers
                  </Badge>
                </div>
                
                <h3 className="text-2xl font-bold mb-3">Employer CRM</h3>
                <p className="text-white/70 mb-6">
                  Post jobs directly to one or both platforms. Manage candidates, track WOTC tax credits, 
                  and access analytics. Subscription tiers from Free to $799/mo Enterprise.
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4 text-green-400" />
                    <span>Multi-platform job posting</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4 text-green-400" />
                    <span>Candidate pipeline by platform</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4 text-green-400" />
                    <span>WOTC dashboard & tracking</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4 text-green-400" />
                    <span>Free - $799/mo plans</span>
                  </div>
                </div>

                <div className="flex gap-3 mb-6">
                  <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30">
                    Friend A Felon
                  </Badge>
                  <Badge className="bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30">
                    Friend A Veteran
                  </Badge>
                </div>

                <Button 
                  onClick={() => onNavigate('employer-portal')}
                  className="w-full bg-blue-600 hover:bg-blue-700 group-hover:bg-blue-700"
                >
                  Open Employer CRM
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* Property Owner CRM */}
            <Card className="bg-gradient-to-br from-green-500/20 to-transparent border-green-500/50 hover:border-green-500 transition-all cursor-pointer group">
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-16 h-16 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <Home className="h-8 w-8 text-green-400" />
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    Property Owners
                  </Badge>
                </div>
                
                <h3 className="text-2xl font-bold mb-3">Property Owner CRM</h3>
                <p className="text-white/70 mb-6">
                  List housing on one or both platforms. FastTrack applications ($75 with 60/40 split), 
                  BAH-compatible listings for veterans, and felony-friendly filters.
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4 text-green-400" />
                    <span>Multi-platform listings</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4 text-green-400" />
                    <span>FastTrack applications ($75)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4 text-green-400" />
                    <span>BAH housing support</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4 text-green-400" />
                    <span>60% revenue share</span>
                  </div>
                </div>

                <div className="flex gap-3 mb-6">
                  <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30">
                    Friend A Felon
                  </Badge>
                  <Badge className="bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30">
                    Friend A Veteran
                  </Badge>
                </div>

                <Button 
                  onClick={() => onNavigate('property-portal')}
                  className="w-full bg-green-600 hover:bg-green-700 group-hover:bg-green-700"
                >
                  Open Property CRM
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* Resource Partner CRM */}
            <Card className="bg-gradient-to-br from-purple-500/20 to-transparent border-purple-500/50 hover:border-purple-500 transition-all cursor-pointer group">
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <HeartHandshake className="h-8 w-8 text-purple-400" />
                  </div>
                  <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                    Service Providers
                  </Badge>
                </div>
                
                <h3 className="text-2xl font-bold mb-3">Resource Partner CRM</h3>
                <p className="text-white/70 mb-6">
                  Manage service directory listings, track clients from both platforms, receive referrals, 
                  and report impact. VA approval badges for verified veteran services.
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4 text-green-400" />
                    <span>Directory on both platforms</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4 text-green-400" />
                    <span>Client & referral tracking</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4 text-green-400" />
                    <span>VA approval badges</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4 text-green-400" />
                    <span>Impact reporting</span>
                  </div>
                </div>

                <div className="flex gap-3 mb-6">
                  <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30">
                    Friend A Felon
                  </Badge>
                  <Badge className="bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30">
                    Friend A Veteran
                  </Badge>
                </div>

                <Button 
                  onClick={() => onNavigate('resource-portal')}
                  className="w-full bg-purple-600 hover:bg-purple-700 group-hover:bg-purple-700"
                >
                  Open Resource CRM
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Benefits Section */}
          <div className="mt-16">
            <Card className="bg-gradient-to-br from-[#A8F32C]/10 to-transparent border-[#A8F32C]/30">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <TrendingUp className="h-12 w-12 text-[#A8F32C] flex-shrink-0" />
                  <div>
                    <h3 className="text-2xl font-bold mb-3">Why Use FairPath CRM Portals?</h3>
                    <div className="grid md:grid-cols-2 gap-6 text-white/70">
                      <div>
                        <h4 className="font-bold text-white mb-2">Multi-Platform Access</h4>
                        <p className="text-sm">
                          Post jobs or list housing on Friend A Felon, Friend A Veteran, or both simultaneously. 
                          Reach 650K+ active users with one listing.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-2">Automated WOTC Processing</h4>
                        <p className="text-sm">
                          Employers automatically qualify for $2,400 (FAF) or $9,600 (FAV) tax credits per hire. 
                          We handle all paperwork and certification.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-2">Unified Dashboard</h4>
                        <p className="text-sm">
                          See candidates and applicants from both platforms in one place. Filter by platform, 
                          track separately, or manage together.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-2">Impact Fund Contribution</h4>
                        <p className="text-sm">
                          20% of all revenue automatically goes to the $15K Impact Fund. Premium users vote on 
                          grants for justice-impacted people and veterans.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
