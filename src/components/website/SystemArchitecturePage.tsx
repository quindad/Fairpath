import { Shield, Users, Building2, Home as HomeIcon, Briefcase, Lock, Smartphone, Database, ArrowRight, Check } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import Navigation from './Navigation';
import Footer from './Footer';

interface SystemArchitecturePageProps {
  onNavigate: (page: string) => void;
}

export default function SystemArchitecturePage({ onNavigate }: SystemArchitecturePageProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation onNavigate={onNavigate} currentPage="architecture" />

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-blue-500/20 text-blue-400 border-blue-500/30">
              System Architecture
            </Badge>
            <h1 className="text-6xl font-bold mb-6">
              How Everything <span className="text-[#A8F32C]">Connects</span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Two platforms. Four CRM portals. One unified database. Here's how Friend A Felon and Friend A Veteran 
              work together to serve justice-impacted people and veterans.
            </p>
          </div>

          {/* Authentication Layer */}
          <div className="mb-20">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-4">🔐 Authentication & Security</h2>
              <p className="text-white/60">Password protection + phone verification for all users</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                    <Lock className="h-6 w-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Password Protection</h3>
                  <ul className="space-y-2 text-sm text-white/70">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Bcrypt hashed passwords</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Minimum 8 characters required</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Secure token-based sessions (JWT)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Password reset via email</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                    <Smartphone className="h-6 w-6 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Phone Verification (2FA)</h3>
                  <ul className="space-y-2 text-sm text-white/70">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>SMS verification on signup</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>6-digit code sent to phone</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>2FA login for CRM access</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Code expires in 5 minutes</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Role-Based Access</h3>
                  <ul className="space-y-2 text-sm text-white/70">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Job seekers, employers, property owners</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>FairPath staff, resource partners</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>CRM portal restrictions by role</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Admin super-user access</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Platform Layer */}
          <div className="mb-20">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-4">🌐 Two Platforms, One Database</h2>
              <p className="text-white/60">Separate branding, shared infrastructure</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-8">
              <Card className="bg-gradient-to-br from-[#A8F32C]/20 to-transparent border-[#A8F32C]/50">
                <CardContent className="p-8">
                  <Users className="h-12 w-12 text-[#A8F32C] mb-4" />
                  <h3 className="text-2xl font-bold mb-4">Friend A Felon</h3>
                  <p className="text-white/70 mb-6">
                    Jobs, housing, resources for justice-impacted people
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#A8F32C] rounded-full"></div>
                      <span>Conviction onboarding</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#A8F32C] rounded-full"></div>
                      <span>Eligibility mapping</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#A8F32C] rounded-full"></div>
                      <span>Release alerts</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#A8F32C] rounded-full"></div>
                      <span>Felony-friendly filters</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-[#0A1F44]/30 via-[#DC143C]/20 to-transparent border-[#FFD700]/50">
                <CardContent className="p-8">
                  <Shield className="h-12 w-12 text-[#FFD700] mb-4" />
                  <h3 className="text-2xl font-bold mb-4">Friend A Veteran</h3>
                  <p className="text-white/70 mb-6">
                    MOS translation, clearance jobs, BAH housing, VA benefits
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#FFD700] rounded-full"></div>
                      <span>DD-214 verification</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#FFD700] rounded-full"></div>
                      <span>MOS/skill translation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#FFD700] rounded-full"></div>
                      <span>Separation alerts</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#FFD700] rounded-full"></div>
                      <span>Security clearance badges</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gray-900 border-blue-500/50 max-w-5xl mx-auto">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Database className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Shared Database</h3>
                    <p className="text-white/60">One source of truth for all users</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold mb-3 text-[#A8F32C]">Shared Tables:</h4>
                    <ul className="space-y-1 text-sm text-white/70">
                      <li>• Users (email, password, phone, role)</li>
                      <li>• Jobs (visible on one or both platforms)</li>
                      <li>• Housing (visible on one or both platforms)</li>
                      <li>• Employers (can post to both)</li>
                      <li>• Property Owners (can list on both)</li>
                      <li>• Resource Partners (can serve both)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold mb-3 text-[#FFD700]">Platform-Specific Fields:</h4>
                    <ul className="space-y-1 text-sm text-white/70">
                      <li>• conviction_type (FAF only)</li>
                      <li>• dd214_verified (FAV only)</li>
                      <li>• security_clearance (FAV only)</li>
                      <li>• bah_compatible (FAV only)</li>
                      <li>• felony_friendly (FAF only)</li>
                      <li>• platform field on all records</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CRM Portals */}
          <div className="mb-20">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-4">🏢 Four CRM Portals</h2>
              <p className="text-white/60">Password-protected dashboards for business users</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-orange-500/20 to-transparent border-orange-500/50">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                        <Briefcase className="h-6 w-6 text-orange-400" />
                      </div>
                      <h3 className="text-2xl font-bold">FairPath Staffing CRM</h3>
                    </div>
                    <Lock className="h-5 w-5 text-orange-400" />
                  </div>
                  <p className="text-white/60 mb-4">Internal recruiting team portal</p>
                  <div className="space-y-3 mb-6">
                    <div className="bg-black/30 p-3 rounded border border-orange-500/30">
                      <p className="text-sm font-bold text-orange-400 mb-1">Access Required:</p>
                      <p className="text-xs text-white/70">role = 'fairpath_staff' + phone verified</p>
                    </div>
                    <div className="bg-black/30 p-3 rounded border border-white/10">
                      <p className="text-sm font-bold mb-2">Features:</p>
                      <ul className="space-y-1 text-xs text-white/70">
                        <li>✓ Candidates from BOTH platforms</li>
                        <li>✓ Release alerts (FAF) + Separation alerts (FAV)</li>
                        <li>✓ WOTC processing for both</li>
                        <li>✓ Unified hiring pipeline</li>
                        <li>✓ Commission tracking</li>
                      </ul>
                    </div>
                  </div>
                  <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                    Serves: Friend A Felon + Friend A Veteran
                  </Badge>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-500/20 to-transparent border-blue-500/50">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <Building2 className="h-6 w-6 text-blue-400" />
                      </div>
                      <h3 className="text-2xl font-bold">Employer CRM</h3>
                    </div>
                    <Lock className="h-5 w-5 text-blue-400" />
                  </div>
                  <p className="text-white/60 mb-4">Companies posting jobs</p>
                  <div className="space-y-3 mb-6">
                    <div className="bg-black/30 p-3 rounded border border-blue-500/30">
                      <p className="text-sm font-bold text-blue-400 mb-1">Access Required:</p>
                      <p className="text-xs text-white/70">role = 'employer' + phone verified</p>
                    </div>
                    <div className="bg-black/30 p-3 rounded border border-white/10">
                      <p className="text-sm font-bold mb-2">Features:</p>
                      <ul className="space-y-1 text-xs text-white/70">
                        <li>✓ Post jobs to one or both platforms</li>
                        <li>✓ Separate candidate pipelines (FAF/FAV)</li>
                        <li>✓ WOTC dashboard & tracking</li>
                        <li>✓ Subscription management</li>
                        <li>✓ Analytics by platform</li>
                      </ul>
                    </div>
                  </div>
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                    Can post to: Friend A Felon, Friend A Veteran, or BOTH
                  </Badge>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500/20 to-transparent border-green-500/50">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                        <HomeIcon className="h-6 w-6 text-green-400" />
                      </div>
                      <h3 className="text-2xl font-bold">Property Owner CRM</h3>
                    </div>
                    <Lock className="h-5 w-5 text-green-400" />
                  </div>
                  <p className="text-white/60 mb-4">Landlords listing housing</p>
                  <div className="space-y-3 mb-6">
                    <div className="bg-black/30 p-3 rounded border border-green-500/30">
                      <p className="text-sm font-bold text-green-400 mb-1">Access Required:</p>
                      <p className="text-xs text-white/70">role = 'property_owner' + phone verified</p>
                    </div>
                    <div className="bg-black/30 p-3 rounded border border-white/10">
                      <p className="text-sm font-bold mb-2">Features:</p>
                      <ul className="space-y-1 text-xs text-white/70">
                        <li>✓ List housing on one or both platforms</li>
                        <li>✓ FastTrack applications from both</li>
                        <li>✓ Separate applicant inboxes (FAF/FAV)</li>
                        <li>✓ BAH verification (FAV)</li>
                        <li>✓ Background check results</li>
                      </ul>
                    </div>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    Can list on: Friend A Felon, Friend A Veteran, or BOTH
                  </Badge>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500/20 to-transparent border-purple-500/50">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                        <Users className="h-6 w-6 text-purple-400" />
                      </div>
                      <h3 className="text-2xl font-bold">Resource Partner CRM</h3>
                    </div>
                    <Lock className="h-5 w-5 text-purple-400" />
                  </div>
                  <p className="text-white/60 mb-4">Service providers & nonprofits</p>
                  <div className="space-y-3 mb-6">
                    <div className="bg-black/30 p-3 rounded border border-purple-500/30">
                      <p className="text-sm font-bold text-purple-400 mb-1">Access Required:</p>
                      <p className="text-xs text-white/70">role = 'resource_partner' + phone verified</p>
                    </div>
                    <div className="bg-black/30 p-3 rounded border border-white/10">
                      <p className="text-sm font-bold mb-2">Features:</p>
                      <ul className="space-y-1 text-xs text-white/70">
                        <li>✓ Directory listing on both platforms</li>
                        <li>✓ Service catalog management</li>
                        <li>✓ Client referral tracking</li>
                        <li>✓ VA approval badges (FAV)</li>
                        <li>✓ Impact reporting</li>
                      </ul>
                    </div>
                  </div>
                  <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                    Can serve: Friend A Felon, Friend A Veteran, or BOTH
                  </Badge>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Authentication Flow */}
          <div className="mb-20">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-4">🔄 Login Flow with 2FA</h2>
              <p className="text-white/60">How users access their portals securely</p>
            </div>

            <Card className="bg-gray-900 border-gray-800 max-w-4xl mx-auto">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                      1
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold mb-1">User enters email + password</h4>
                      <p className="text-sm text-white/60">Credentials validated against hashed password in database</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <ArrowRight className="h-5 w-5 text-white/30" />
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                      2
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold mb-1">System sends 6-digit SMS code</h4>
                      <p className="text-sm text-white/60">Code sent to user's verified phone number (expires in 5 minutes)</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <ArrowRight className="h-5 w-5 text-white/30" />
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                      3
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold mb-1">User enters SMS code</h4>
                      <p className="text-sm text-white/60">Backend validates code and checks expiration</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <ArrowRight className="h-5 w-5 text-white/30" />
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-[#A8F32C] rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold text-black">
                      4
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold mb-1">JWT token issued + redirect to dashboard</h4>
                      <div className="text-sm text-white/60 space-y-1 mt-2">
                        <p>• <span className="font-bold text-[#A8F32C]">Job Seeker (FAF)</span> → /app/faf/dashboard</p>
                        <p>• <span className="font-bold text-[#FFD700]">Job Seeker (FAV)</span> → /app/fav/dashboard</p>
                        <p>• <span className="font-bold text-blue-400">Employer</span> → /crm/employer</p>
                        <p>• <span className="font-bold text-green-400">Property Owner</span> → /crm/property-owner</p>
                        <p>• <span className="font-bold text-orange-400">FairPath Staff</span> → /crm/staffing</p>
                        <p>• <span className="font-bold text-purple-400">Resource Partner</span> → /crm/resource-partner</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cross-Platform Examples */}
          <div>
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-4">💡 Real-World Examples</h2>
              <p className="text-white/60">How businesses serve both communities</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-gray-900 border-blue-500/30">
                <CardContent className="p-6">
                  <Building2 className="h-10 w-10 text-blue-400 mb-4" />
                  <h3 className="text-xl font-bold mb-3">Example: Employer</h3>
                  <div className="space-y-3 text-sm">
                    <div className="bg-black/30 p-3 rounded">
                      <p className="font-bold mb-1">Acme Construction Co.</p>
                      <p className="text-white/60 text-xs">Posts job: "Warehouse Manager - $55K"</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Check className="h-4 w-4 text-[#A8F32C]" />
                      <span>Visible on Friend A Felon</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Check className="h-4 w-4 text-[#FFD700]" />
                      <span>Visible on Friend A Veteran</span>
                    </div>
                    <div className="bg-green-500/10 p-2 rounded border border-green-500/30 mt-3">
                      <p className="text-xs text-green-400">
                        Receives 23 FAF applicants + 8 FAV applicants in one dashboard
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-green-500/30">
                <CardContent className="p-6">
                  <HomeIcon className="h-10 w-10 text-green-400 mb-4" />
                  <h3 className="text-xl font-bold mb-3">Example: Property Owner</h3>
                  <div className="space-y-3 text-sm">
                    <div className="bg-black/30 p-3 rounded">
                      <p className="font-bold mb-1">Smith Rentals LLC</p>
                      <p className="text-white/60 text-xs">Lists 3-bed house - $1,800/mo</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Check className="h-4 w-4 text-[#A8F32C]" />
                      <span>Felony friendly (no violent crimes)</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Check className="h-4 w-4 text-[#FFD700]" />
                      <span>BAH compatible ($2,100 rate)</span>
                    </div>
                    <div className="bg-green-500/10 p-2 rounded border border-green-500/30 mt-3">
                      <p className="text-xs text-green-400">
                        Gets 5 FAF + 3 FAV FastTrack applications
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-orange-500/30">
                <CardContent className="p-6">
                  <Briefcase className="h-10 w-10 text-orange-400 mb-4" />
                  <h3 className="text-xl font-bold mb-3">Example: FairPath Staffing</h3>
                  <div className="space-y-3 text-sm">
                    <div className="bg-black/30 p-3 rounded">
                      <p className="font-bold mb-1">Recruiter Dashboard</p>
                      <p className="text-white/60 text-xs">Unified candidate pipeline</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Check className="h-4 w-4 text-[#A8F32C]" />
                      <span>150 active FAF candidates</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Check className="h-4 w-4 text-[#FFD700]" />
                      <span>85 active FAV candidates</span>
                    </div>
                    <div className="bg-green-500/10 p-2 rounded border border-green-500/30 mt-3">
                      <p className="text-xs text-green-400">
                        Processes WOTC for both ($2.4K FAF, $9.6K FAV)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
