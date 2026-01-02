import { Check, X, ArrowRight, Zap, Users, TrendingUp, Crown, Building2, DollarSign, BarChart3, Award, Clock, Shield } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

interface JobPostingComparisonProps {
  onNavigate: (page: string) => void;
}

export default function JobPostingComparison({ onNavigate }: JobPostingComparisonProps) {
  return (
    <div className="py-20 px-6 bg-gradient-to-b from-gray-900/30 to-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30 text-sm px-4 py-2">
            💼 Two Ways to Hire
          </Badge>
          <h2 className="text-5xl mb-4">Choose Your Hiring Model</h2>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            FairPath Staffing for hands-off hiring, or post directly on Friend A Felon for full control
          </p>
        </div>

        {/* Main Comparison */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* FairPath Staffing - Full Service */}
          <Card className="bg-gradient-to-br from-[#A8F32C]/20 to-transparent border-[#A8F32C]/30 p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#A8F32C] text-black text-xs font-bold px-4 py-1 rounded-bl-lg">
              MOST POPULAR
            </div>
            
            <div className="mb-6">
              <div className="w-16 h-16 bg-[#A8F32C]/20 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-8 w-8 text-[#A8F32C]" />
              </div>
              <h3 className="text-3xl mb-2">FairPath Staffing</h3>
              <p className="text-white/60 text-lg">Full-service, AI-powered placement</p>
            </div>

            {/* Pricing */}
            <div className="bg-black/30 rounded-lg p-6 mb-6">
              <div className="text-4xl text-[#A8F32C] mb-2">$500 - $1,500</div>
              <div className="text-white/60 mb-4">per successful hire (one-time fee)</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-white/70">
                  <span>Entry-level roles</span>
                  <span className="text-[#A8F32C]">$500</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Skilled labor</span>
                  <span className="text-[#A8F32C]">$800</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Management/specialized</span>
                  <span className="text-[#A8F32C]">$1,200-$1,500</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/10 text-xs text-white/50">
                70% cheaper than traditional staffing agencies
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3 mb-8">
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-white">100% AI-automated screening</div>
                  <div className="text-sm text-white/60">Drug tests, background checks, skills assessments</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-white">Automated WOTC processing</div>
                  <div className="text-sm text-white/60">We file all IRS paperwork, you get $2,400-$9,600 per hire</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-white">Release alerts (FairPath Forward)</div>
                  <div className="text-sm text-white/60">Hire candidates 90 days before release</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-white">24-hour candidate matching</div>
                  <div className="text-sm text-white/60">Pre-screened, qualified, ready to interview</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-white">Full support system included</div>
                  <div className="text-sm text-white/60">Housing, transportation, case management for hires</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-white">92% retention rate at 12 months</div>
                  <div className="text-sm text-white/60">Industry leading due to comprehensive support</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-white">WOTC ROI dashboard</div>
                  <div className="text-sm text-white/60">Track tax credits earned in real-time</div>
                </div>
              </div>
            </div>

            <Button 
              className="w-full bg-[#A8F32C] hover:bg-[#8CD423] text-black"
              onClick={() => onNavigate('staffing-crm')}
            >
              Get Started with Staffing
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Card>

          {/* Friend A Felon - Self Service */}
          <Card className="bg-white/5 border-white/10 p-8">
            <div className="mb-6">
              <div className="w-16 h-16 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-3xl mb-2">Friend A Felon Listings</h3>
              <p className="text-white/60 text-lg">Self-service job board posting</p>
            </div>

            {/* Pricing Tiers */}
            <div className="space-y-4 mb-6">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xl">Free Tier</div>
                  <Badge className="bg-white/10 text-white/80 border-white/20">Limited</Badge>
                </div>
                <div className="text-2xl text-white/90 mb-2">$0/month</div>
                <ul className="space-y-1 text-sm text-white/60">
                  <li>• 1-2 active job postings</li>
                  <li>• Basic visibility</li>
                  <li>• Manual applicant review</li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-blue-500/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xl">Pay-Per-Application</div>
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Flexible</Badge>
                </div>
                <div className="text-2xl text-blue-400 mb-2">$20/applicant</div>
                <ul className="space-y-1 text-sm text-white/60">
                  <li>• Only pay for qualified applicants</li>
                  <li>• WOTC pre-screening included</li>
                  <li>• No monthly commitment</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-500/10 to-transparent rounded-lg p-4 border border-purple-500/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xl">Basic</div>
                  <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">Popular</Badge>
                </div>
                <div className="text-2xl text-purple-400 mb-2">$99/month</div>
                <ul className="space-y-1 text-sm text-white/60">
                  <li>• Unlimited job postings</li>
                  <li>• WOTC eligibility dashboard</li>
                  <li>• Applicant tracking system</li>
                  <li>• Basic analytics</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-orange-500/10 to-transparent rounded-lg p-4 border border-orange-500/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xl">Premium</div>
                  <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">Best Value</Badge>
                </div>
                <div className="text-2xl text-orange-400 mb-2">$299/month</div>
                <ul className="space-y-1 text-sm text-white/60">
                  <li>• Everything in Basic, plus:</li>
                  <li>• Featured listings (3x visibility)</li>
                  <li>• Priority placement in search</li>
                  <li>• Advanced analytics & reporting</li>
                  <li>• Candidate matching AI</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-[#A8F32C]/10 to-transparent rounded-lg p-4 border border-[#A8F32C]/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xl">Enterprise</div>
                  <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30">Full Suite</Badge>
                </div>
                <div className="text-2xl text-[#A8F32C] mb-2">$799/month</div>
                <ul className="space-y-1 text-sm text-white/60">
                  <li>• Everything in Premium, plus:</li>
                  <li>• Automated WOTC filing</li>
                  <li>• Dedicated account manager</li>
                  <li>• Custom integrations (ATS sync)</li>
                  <li>• White-label employer portal</li>
                  <li>• API access for bulk posting</li>
                </ul>
              </div>
            </div>

            <Button 
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              onClick={() => onNavigate('employer-portal')}
            >
              Post a Job on Friend A Felon
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Card>
        </div>

        {/* Feature Comparison Table */}
        <Card className="bg-white/5 border-white/10 p-8">
          <h3 className="text-3xl mb-8 text-center">Feature Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-4 text-white/60">Feature</th>
                  <th className="text-center py-4 px-4">
                    <div className="text-[#A8F32C]">FairPath Staffing</div>
                    <div className="text-xs text-white/60">Full Service</div>
                  </th>
                  <th className="text-center py-4 px-4">
                    <div className="text-blue-400">Friend A Felon</div>
                    <div className="text-xs text-white/60">Self Service</div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr>
                  <td className="py-4 px-4">Cost per hire</td>
                  <td className="text-center py-4 px-4 text-[#A8F32C]">$500-$1,500 one-time</td>
                  <td className="text-center py-4 px-4 text-blue-400">$99-$799/month unlimited</td>
                </tr>
                <tr>
                  <td className="py-4 px-4">Screening & background checks</td>
                  <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-[#A8F32C] mx-auto" /></td>
                  <td className="text-center py-4 px-4 text-white/60">You handle</td>
                </tr>
                <tr>
                  <td className="py-4 px-4">Automated WOTC filing</td>
                  <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-[#A8F32C] mx-auto" /></td>
                  <td className="text-center py-4 px-4 text-white/60">Enterprise only</td>
                </tr>
                <tr>
                  <td className="py-4 px-4">WOTC eligibility dashboard</td>
                  <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-[#A8F32C] mx-auto" /></td>
                  <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-blue-400 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-4 px-4">Release alerts (pre-hire)</td>
                  <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-[#A8F32C] mx-auto" /></td>
                  <td className="text-center py-4 px-4"><X className="h-5 w-5 text-white/30 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-4 px-4">Candidate matching AI</td>
                  <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-[#A8F32C] mx-auto" /></td>
                  <td className="text-center py-4 px-4 text-white/60">Premium+</td>
                </tr>
                <tr>
                  <td className="py-4 px-4">Support system for hires</td>
                  <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-[#A8F32C] mx-auto" /></td>
                  <td className="text-center py-4 px-4"><X className="h-5 w-5 text-white/30 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-4 px-4">Analytics & reporting</td>
                  <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-[#A8F32C] mx-auto" /></td>
                  <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-blue-400 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-4 px-4">Unlimited job postings</td>
                  <td className="text-center py-4 px-4"><X className="h-5 w-5 text-white/30 mx-auto" /></td>
                  <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-blue-400 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-4 px-4">You control hiring process</td>
                  <td className="text-center py-4 px-4 text-white/60">We handle it</td>
                  <td className="text-center py-4 px-4"><Check className="h-5 w-5 text-blue-400 mx-auto" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        {/* Which is Right for You? */}
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          <Card className="bg-gradient-to-br from-[#A8F32C]/10 to-transparent border-[#A8F32C]/30 p-8">
            <Crown className="h-12 w-12 text-[#A8F32C] mb-4" />
            <h3 className="text-2xl mb-4">Choose FairPath Staffing if:</h3>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                You want fully automated hiring (no HR needed)
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                You need guaranteed WOTC tax credit processing
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                You&rsquo;re hiring 5+ people per month
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                You want access to pre-release candidates
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                You value 92% retention rate (we handle support)
              </li>
            </ul>
          </Card>

          <Card className="bg-white/5 border-white/10 p-8">
            <Building2 className="h-12 w-12 text-blue-400 mb-4" />
            <h3 className="text-2xl mb-4">Choose Friend A Felon Listings if:</h3>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                You want full control over hiring process
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                You have existing HR/recruiting team
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                You&rsquo;re hiring occasionally (1-4 per month)
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                You prefer subscription pricing
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                You want to test before committing to full service
              </li>
            </ul>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-xl text-white/60 mb-6">Not sure which is right for you?</p>
          <Button 
            size="lg"
            variant="outline"
            className="border-white/20 text-white hover:bg-white hover:text-black"
            onClick={() => onNavigate('contact')}
          >
            Talk to Our Team
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
