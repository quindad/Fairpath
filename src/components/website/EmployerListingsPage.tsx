import { ArrowRight, DollarSign, TrendingUp, Users, Shield, CheckCircle, Building2, Eye, Award, Zap, Target, Sparkles, AlertCircle, ExternalLink, Mail, Crown, BarChart3 } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import Navigation from './Navigation';
import Footer from './Footer';
import WOTCCalculatorPublic from '../home/WOTCCalculatorPublic';

interface EmployerListingsPageProps {
  onNavigate: (page: string) => void;
}

export default function EmployerListingsPage({ onNavigate }: EmployerListingsPageProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation onNavigate={onNavigate} currentPage="service-employers" />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30 text-sm px-4 py-2">
            💼 Friend A Felon Employer Listings
          </Badge>
          <h1 className="text-6xl lg:text-7xl mb-6 leading-tight">
            Post Jobs. Get Applicants.<br/>
            <span className="text-[#A8F32C]">Pay Almost Nothing.</span>
          </h1>
          <p className="text-2xl text-white/80 max-w-4xl mx-auto mb-8">
            Self-service job board starting at <span className="text-[#A8F32C] font-bold">FREE</span>. 
            Access WOTC-qualified candidates for <span className="text-[#A8F32C] font-bold">95% less</span> than Indeed, LinkedIn, or ZipRecruiter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-[#A8F32C] hover:bg-[#8CD423] text-black text-lg px-8"
              onClick={() => onNavigate('employer-portal')}
            >
              <Users className="mr-2 h-5 w-5" />
              Post Your First Job FREE
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 text-lg px-8"
              onClick={() => onNavigate('service-staffing')}
            >
              Want Full Automation? Try FairPath Staffing →
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-[#A8F32C]/10 border border-[#A8F32C]/30 rounded-lg p-4">
              <div className="text-3xl text-[#A8F32C] mb-1">FREE</div>
              <div className="text-sm text-white/60">First job listing</div>
            </div>
            <div className="bg-[#A8F32C]/10 border border-[#A8F32C]/30 rounded-lg p-4">
              <div className="text-3xl text-[#A8F32C] mb-1">$1</div>
              <div className="text-sm text-white/60">Per applicant view</div>
            </div>
            <div className="bg-[#A8F32C]/10 border border-[#A8F32C]/30 rounded-lg p-4">
              <div className="text-3xl text-[#A8F32C] mb-1">$9,600</div>
              <div className="text-sm text-white/60">Max WOTC per hire</div>
            </div>
            <div className="bg-[#A8F32C]/10 border border-[#A8F32C]/30 rounded-lg p-4">
              <div className="text-3xl text-[#A8F32C] mb-1">95%</div>
              <div className="text-sm text-white/60">Cheaper than competitors</div>
            </div>
          </div>
        </div>
      </section>

      {/* WOTC Calculator */}
      <WOTCCalculatorPublic onGetStarted={() => onNavigate('employer-portal')} />

      {/* Pricing vs Competitors */}
      <section className="py-20 px-6 bg-gradient-to-b from-[#A8F32C]/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl mb-4">We're <span className="text-[#A8F32C]">5% of Competitor Prices</span></h2>
            <p className="text-xl text-white/60">
              Other job boards charge $5-$15 per CLICK. We charge $1 per qualified APPLICANT VIEW.
            </p>
          </div>

          {/* Comparison Table */}
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden mb-12">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-6 text-white/80">Job Board</th>
                  <th className="text-left p-6 text-white/80">Pricing Model</th>
                  <th className="text-left p-6 text-white/80">Cost for 100 Applicants</th>
                  <th className="text-left p-6 text-white/80">WOTC Dashboard</th>
                  <th className="text-left p-6 text-white/80">Retention Support</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-white/60">Indeed (Sponsored)</span>
                    </div>
                  </td>
                  <td className="p-6 text-white/90">$5-$15 per click</td>
                  <td className="p-6 text-white/90">$1,500 - $4,500</td>
                  <td className="p-6 text-red-400">None</td>
                  <td className="p-6 text-red-400">None</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-white/60">LinkedIn Jobs</span>
                    </div>
                  </td>
                  <td className="p-6 text-white/90">$495 per 30-day post</td>
                  <td className="p-6 text-white/90">$495+ (no guarantee)</td>
                  <td className="p-6 text-red-400">None</td>
                  <td className="p-6 text-red-400">None</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-white/60">ZipRecruiter</span>
                    </div>
                  </td>
                  <td className="p-6 text-white/90">$249-$449/month (4 jobs)</td>
                  <td className="p-6 text-white/90">$249+ (no guarantee)</td>
                  <td className="p-6 text-red-400">None</td>
                  <td className="p-6 text-red-400">None</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-white/60">Monster.com</span>
                    </div>
                  </td>
                  <td className="p-6 text-white/90">$375-$500/month</td>
                  <td className="p-6 text-white/90">$375+ (no guarantee)</td>
                  <td className="p-6 text-red-400">None</td>
                  <td className="p-6 text-red-400">None</td>
                </tr>
                <tr className="bg-gradient-to-r from-[#A8F32C]/20 to-transparent border-2 border-[#A8F32C]/50">
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-[#A8F32C]" />
                      <span className="text-[#A8F32C] font-bold">Friend A Felon</span>
                      <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30 text-xs">95% CHEAPER</Badge>
                    </div>
                  </td>
                  <td className="p-6 text-[#A8F32C] font-semibold">$1 per applicant view</td>
                  <td className="p-6 text-[#A8F32C] font-bold text-xl">$100</td>
                  <td className="p-6 text-green-400 font-semibold">✓ Included ($99+ plans)</td>
                  <td className="p-6 text-green-400 font-semibold">✓ 24/7 case management</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="text-center">
            <p className="text-white/60 text-sm mb-4">
              * Competitor pricing based on publicly available rate cards as of December 2024.
            </p>
            <p className="text-[#A8F32C] text-lg font-semibold">
              You're not just saving money—you're hiring people who NEED this opportunity and will work harder to keep it.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl mb-4">Choose Your Plan</h2>
            <p className="text-xl text-white/60">
              Start free, scale as you grow. Every plan gets you access to WOTC-qualified candidates.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* FREE Tier */}
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-8">
                <div className="mb-6">
                  <h3 className="text-2xl mb-2">Free</h3>
                  <div className="text-4xl text-white/90 mb-2">$0</div>
                  <p className="text-white/60 text-sm">Forever free</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-white/70">1 active job listing</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-white/70">Basic visibility</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-white/70">Manual applicant review</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-white/70">Email notifications</span>
                  </li>
                </ul>
                <Button 
                  className="w-full bg-white/10 hover:bg-white/20 text-white"
                  onClick={() => onNavigate('employer-portal')}
                >
                  Start Free
                </Button>
              </CardContent>
            </Card>

            {/* Pay-Per-View */}
            <Card className="bg-gradient-to-br from-blue-500/10 to-transparent border-blue-500/30">
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-2xl">Pay-Per-View</h3>
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">FLEXIBLE</Badge>
                  </div>
                  <div className="text-4xl text-blue-400 mb-2">$1</div>
                  <p className="text-white/60 text-sm">Per applicant view</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/70">Only pay when you view an applicant</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/70">Unlimited job postings</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/70">WOTC pre-screening</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/70">No monthly commitment</span>
                  </li>
                </ul>
                <Button 
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={() => onNavigate('employer-portal')}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>

            {/* $99 Plan */}
            <Card className="bg-gradient-to-br from-[#A8F32C]/20 to-transparent border-[#A8F32C]/50 relative">
              <div className="absolute top-0 right-0 bg-[#A8F32C] text-black text-xs font-bold px-4 py-1 rounded-bl-lg">
                MOST POPULAR
              </div>
              <CardContent className="p-8">
                <div className="mb-6">
                  <h3 className="text-2xl mb-2">Basic</h3>
                  <div className="text-4xl text-[#A8F32C] mb-2">$99</div>
                  <p className="text-white/60 text-sm">Per month</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-white/70"><strong>5 active job listings</strong></span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-white/70">Unlimited applicant views</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-white/70">WOTC eligibility dashboard</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-white/70">Applicant tracking system</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-white/70">Basic analytics</span>
                  </li>
                </ul>
                <Button 
                  className="w-full bg-[#A8F32C] hover:bg-[#8CD423] text-black"
                  onClick={() => onNavigate('employer-portal')}
                >
                  Start 14-Day Trial
                </Button>
              </CardContent>
            </Card>

            {/* $299 Premium with Spotlight */}
            <Card className="bg-gradient-to-br from-purple-500/10 to-transparent border-purple-500/30">
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-2xl">Premium</h3>
                    <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">SPOTLIGHT</Badge>
                  </div>
                  <div className="text-4xl text-purple-400 mb-2">$299</div>
                  <p className="text-white/60 text-sm">Per month</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/70">Everything in Basic, plus:</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <Sparkles className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/70"><strong>Employer Spotlight</strong> (social posts, PR)</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/70">Featured listings (3x visibility)</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/70">Priority search placement</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/70">AI candidate matching</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/70">Advanced analytics</span>
                  </li>
                </ul>
                <Button 
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white"
                  onClick={() => onNavigate('employer-portal')}
                >
                  Get Premium
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Enterprise CTA */}
          <div className="mt-12 text-center">
            <Card className="bg-gradient-to-r from-orange-500/10 to-transparent border-orange-500/30 inline-block">
              <CardContent className="p-8">
                <div className="flex items-center gap-6">
                  <Crown className="h-12 w-12 text-orange-400" />
                  <div className="text-left">
                    <h3 className="text-2xl mb-2">Enterprise ($799/month)</h3>
                    <p className="text-white/60 mb-4">
                      Unlimited listings, white-glove support, dedicated account manager, custom integrations
                    </p>
                    <Button 
                      variant="outline"
                      className="border-orange-500/30 text-orange-400 hover:bg-orange-500/10"
                      onClick={() => onNavigate('contact')}
                    >
                      Contact Sales
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What's Included - Features Breakdown */}
      <section className="py-20 px-6 bg-gradient-to-b from-white/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl mb-4">Everything You Need to Hire Smart</h2>
            <p className="text-xl text-white/60">
              We're not just a job board—we're your hiring partner with built-in tax credits and retention support.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-[#A8F32C]/20 rounded-lg flex items-center justify-center mb-4">
                  <DollarSign className="h-6 w-6 text-[#A8F32C]" />
                </div>
                <h3 className="text-xl mb-2">WOTC Eligibility Dashboard</h3>
                <p className="text-white/60 text-sm mb-3">
                  Every applicant shows their WOTC status ($2,400-$9,600 per hire). See your potential tax credits BEFORE you interview.
                </p>
                <div className="text-xs text-[#A8F32C]">$99+ plans</div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-[#A8F32C]/20 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-[#A8F32C]" />
                </div>
                <h3 className="text-xl mb-2">Applicant Tracking System</h3>
                <p className="text-white/60 text-sm mb-3">
                  Manage interviews, track hiring pipeline, and collaborate with your team—all in one dashboard.
                </p>
                <div className="text-xs text-[#A8F32C]">$99+ plans</div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl mb-2">Employer Spotlight</h3>
                <p className="text-white/60 text-sm mb-3">
                  Get featured on our blog, social media, and newsletter as a second-chance employer. Build your brand while doing good.
                </p>
                <div className="text-xs text-purple-400">$299+ plans</div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-[#A8F32C]/20 rounded-lg flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-[#A8F32C]" />
                </div>
                <h3 className="text-xl mb-2">AI Candidate Matching</h3>
                <p className="text-white/60 text-sm mb-3">
                  Our AI ranks applicants by skills, experience, and WOTC eligibility—so you interview the best candidates first.
                </p>
                <div className="text-xs text-purple-400">$299+ plans</div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-[#A8F32C]/20 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-[#A8F32C]" />
                </div>
                <h3 className="text-xl mb-2">24/7 Retention Support</h3>
                <p className="text-white/60 text-sm mb-3">
                  Your hires get access to our case managers for housing, transportation, and crisis support—keeping them employed.
                </p>
                <div className="text-xs text-[#A8F32C]">All plans</div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-[#A8F32C]/20 rounded-lg flex items-center justify-center mb-4">
                  <Eye className="h-6 w-6 text-[#A8F32C]" />
                </div>
                <h3 className="text-xl mb-2">Featured Job Listings</h3>
                <p className="text-white/60 text-sm mb-3">
                  Your jobs appear at the top of search results with 3x more visibility. Get more qualified applicants faster.
                </p>
                <div className="text-xs text-purple-400">$299+ plans</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why This Works - Impact Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl mb-4">You Win. They Win. <span className="text-[#A8F32C]">Everyone Wins.</span></h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Hiring returning citizens isn't charity—it's smart business backed by data.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-8 text-center">
                <div className="text-5xl mb-4">💰</div>
                <h3 className="text-2xl mb-3">Your Bottom Line</h3>
                <ul className="space-y-3 text-left text-white/70">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span>95% cheaper than Indeed/LinkedIn</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span>Up to $9,600 WOTC per hire</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span>Higher retention = lower turnover costs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span>Motivated, loyal workforce</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-8 text-center">
                <div className="text-5xl mb-4">🌍</div>
                <h3 className="text-2xl mb-3">Social Impact</h3>
                <ul className="space-y-3 text-left text-white/70">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span>77% lower recidivism with employment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span>Break generational incarceration cycles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span>Strengthen your community</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span>Build brand as a force for good</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-8 text-center">
                <div className="text-5xl mb-4">👤</div>
                <h3 className="text-2xl mb-3">For Your Hires</h3>
                <ul className="space-y-3 text-left text-white/70">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span>Access to housing resources</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span>24/7 crisis support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span>Real second chance at life</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span>Dignity, purpose, and stability</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* WOTC Legislation Newsletter */}
      <section className="py-20 px-6 bg-gradient-to-b from-[#A8F32C]/5 to-transparent">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-[#A8F32C]/10 to-transparent border-[#A8F32C]/30">
            <CardContent className="p-12 text-center">
              <Mail className="h-12 w-12 text-[#A8F32C] mx-auto mb-6" />
              <h2 className="text-4xl mb-4">Stay Ahead of WOTC Changes</h2>
              <p className="text-xl text-white/70 mb-8">
                WOTC tax credits are set to <span className="text-[#A8F32C] font-semibold">increase in 2025</span>. 
                Get legislation updates, tax credit news, and hiring best practices delivered monthly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <Input 
                  type="email" 
                  placeholder="your.email@company.com"
                  className="bg-black/30 border-white/20 text-white placeholder:text-white/40"
                />
                <Button className="bg-[#A8F32C] hover:bg-[#8CD423] text-black whitespace-nowrap">
                  Subscribe
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-white/40 mt-4">
                Join 2,400+ employers maximizing their WOTC benefits
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA - Try Full Service Instead */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <AlertCircle className="h-12 w-12 text-orange-500 mx-auto mb-6" />
          <h2 className="text-4xl mb-4">Want Us to Automate the Whole Hiring Process?</h2>
          <p className="text-xl text-white/70 mb-8">
            Don't want to manage job postings yourself? Try <span className="text-orange-400 font-semibold">FairPath Staffing</span>—we handle everything from screening to WOTC filing to housing. You just pick the candidate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white"
              onClick={() => onNavigate('service-staffing')}
            >
              <Zap className="mr-2 h-5 w-5" />
              See FairPath Staffing
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-[#A8F32C]/30 text-[#A8F32C] hover:bg-[#A8F32C]/10"
              onClick={() => onNavigate('employer-portal')}
            >
              Post a Job Now (FREE)
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
