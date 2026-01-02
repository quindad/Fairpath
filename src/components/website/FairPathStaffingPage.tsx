import { ArrowRight, DollarSign, TrendingUp, Users, Shield, CheckCircle, Building2, Clock, Award, Zap, Target, Sparkles, AlertCircle, ExternalLink, Mail } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import Navigation from './Navigation';
import Footer from './Footer';
import WOTCCalculatorPublic from '../home/WOTCCalculatorPublic';

interface FairPathStaffingPageProps {
  onNavigate: (page: string) => void;
}

export default function FairPathStaffingPage({ onNavigate }: FairPathStaffingPageProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation onNavigate={onNavigate} currentPage="service-staffing" />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-orange-500/20 text-orange-400 border-orange-500/30 text-sm px-4 py-2">
            ⚡ NEW - 100% AI-Automated Staffing
          </Badge>
          <h1 className="text-6xl lg:text-7xl mb-6 leading-tight">
            We Handle Everything.<br/>
            <span className="text-orange-500">You Just Pick the Candidate.</span>
          </h1>
          <p className="text-2xl text-white/80 max-w-4xl mx-auto mb-8">
            Drug tests, background checks, WOTC filing, housing, transportation—all automated. 
            <span className="text-orange-400 font-semibold"> 70% cheaper</span> than traditional staffing agencies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-8"
              onClick={() => onNavigate('staffing-crm')}
            >
              <Zap className="mr-2 h-5 w-5" />
              Get Started with Staffing
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 text-lg px-8"
              onClick={() => onNavigate('service-employers')}
            >
              Prefer Self-Service? See Employer Listings →
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <div className="text-3xl text-orange-400 mb-1">92%</div>
              <div className="text-sm text-white/60">Retention at 12 months</div>
            </div>
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <div className="text-3xl text-orange-400 mb-1">24hr</div>
              <div className="text-sm text-white/60">Average match time</div>
            </div>
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <div className="text-3xl text-orange-400 mb-1">$9,600</div>
              <div className="text-sm text-white/60">Max WOTC per hire</div>
            </div>
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <div className="text-3xl text-orange-400 mb-1">FREE</div>
              <div className="text-sm text-white/60">Business spotlight PR</div>
            </div>
          </div>
        </div>
      </section>

      {/* WOTC Calculator */}
      <WOTCCalculatorPublic onGetStarted={() => onNavigate('staffing-crm')} />

      {/* Pricing vs Traditional Staffing */}
      <section className="py-20 px-6 bg-gradient-to-b from-orange-500/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl mb-4">We're <span className="text-orange-400">5% of Competitor Prices</span></h2>
            <p className="text-xl text-white/60">
              Traditional staffing agencies are bleeding you dry. We're not.
            </p>
          </div>

          {/* Comparison Table */}
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-6 text-white/80">Provider</th>
                  <th className="text-left p-6 text-white/80">Entry-Level Hire</th>
                  <th className="text-left p-6 text-white/80">Skilled Labor</th>
                  <th className="text-left p-6 text-white/80">WOTC Processing</th>
                  <th className="text-left p-6 text-white/80">Support Services</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                      <span className="text-white/60">Robert Half</span>
                    </div>
                  </td>
                  <td className="p-6 text-white/90">$6,000 - $10,000</td>
                  <td className="p-6 text-white/90">$9,000 - $15,000</td>
                  <td className="p-6 text-red-400">Not included</td>
                  <td className="p-6 text-red-400">Not included</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                      <span className="text-white/60">Adecco</span>
                    </div>
                  </td>
                  <td className="p-6 text-white/90">$5,000 - $8,000</td>
                  <td className="p-6 text-white/90">$8,000 - $12,000</td>
                  <td className="p-6 text-red-400">Not included</td>
                  <td className="p-6 text-red-400">Not included</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                      <span className="text-white/60">ManpowerGroup</span>
                    </div>
                  </td>
                  <td className="p-6 text-white/90">$4,500 - $7,500</td>
                  <td className="p-6 text-white/90">$7,000 - $11,000</td>
                  <td className="p-6 text-red-400">Extra $1,500-$3,000</td>
                  <td className="p-6 text-red-400">Not included</td>
                </tr>
                <tr className="bg-gradient-to-r from-orange-500/20 to-transparent border-2 border-orange-500/50">
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-orange-400" />
                      <span className="text-orange-400 font-bold">FairPath Staffing</span>
                      <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs">95% CHEAPER</Badge>
                    </div>
                  </td>
                  <td className="p-6 text-orange-400 font-bold text-xl">$500</td>
                  <td className="p-6 text-orange-400 font-bold text-xl">$800 - $1,200</td>
                  <td className="p-6 text-green-400 font-semibold">✓ Included FREE</td>
                  <td className="p-6 text-green-400 font-semibold">✓ Included FREE</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 text-center">
            <p className="text-white/60 text-sm">
              * Traditional agency fees based on 15-25% of first-year salary. FairPath Staffing is a flat fee with everything included.
            </p>
          </div>
        </div>
      </section>

      {/* What's Included - The Full Package */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl mb-4">Everything Handled. Nothing Extra.</h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              One flat fee gets you the entire hiring process—automated, optimized, and professionally managed.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-orange-500/10 to-transparent border-orange-500/30">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                  <DollarSign className="h-6 w-6 text-orange-400" />
                </div>
                <h3 className="text-xl mb-2">Automated WOTC Filing</h3>
                <p className="text-white/60 text-sm mb-3">
                  We submit Forms 8850, 9061, and 9062 to the IRS within 28 days. You get $2,400-$9,600 per hire automatically.
                </p>
                <div className="text-xs text-orange-400">Real-time credit tracking dashboard included</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-500/10 to-transparent border-orange-500/30">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-orange-400" />
                </div>
                <h3 className="text-xl mb-2">AI-Powered Screening</h3>
                <p className="text-white/60 text-sm mb-3">
                  Drug tests, background checks, skills assessments, and video interviews—all automated and bias-free.
                </p>
                <div className="text-xs text-orange-400">Only qualified candidates reach your desk</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-500/10 to-transparent border-orange-500/30">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-orange-400" />
                </div>
                <h3 className="text-xl mb-2">Release Alerts (FairPath Forward)</h3>
                <p className="text-white/60 text-sm mb-3">
                  Get notified 90 days before qualified candidates are released. Hire them before they even get out.
                </p>
                <div className="text-xs text-orange-400">Pre-screened, trained, Day-1 ready</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-500/10 to-transparent border-orange-500/30">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Building2 className="h-6 w-6 text-orange-400" />
                </div>
                <h3 className="text-xl mb-2">Housing & Transportation</h3>
                <p className="text-white/60 text-sm mb-3">
                  We secure housing and arrange transportation before Day 1. No excuses, no no-shows.
                </p>
                <div className="text-xs text-orange-400">92% retention because needs are met</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-500/10 to-transparent border-orange-500/30">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-orange-400" />
                </div>
                <h3 className="text-xl mb-2">24/7 Crisis Support</h3>
                <p className="text-white/60 text-sm mb-3">
                  Your hires get 24/7 access to case managers for any issues. Parole officer conflicts, transportation problems—handled.
                </p>
                <div className="text-xs text-orange-400">We protect your investment</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-500/10 to-transparent border-orange-500/30">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-orange-400" />
                </div>
                <h3 className="text-xl mb-2">FREE Business Spotlight</h3>
                <p className="text-white/60 text-sm mb-3">
                  Every FairPath Staffing partner gets FREE PR: social media posts, blog features, press releases about your second-chance hiring.
                </p>
                <div className="text-xs text-orange-400">Build your brand as a force for good</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why This Works - Impact Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-white/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl mb-4">You Win. They Win. <span className="text-orange-400">Everyone Wins.</span></h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Hiring returning citizens isn't charity—it's the smartest business decision you'll make.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-8 text-center">
                <div className="text-5xl mb-4">💰</div>
                <h3 className="text-2xl mb-3">Your Bottom Line</h3>
                <ul className="space-y-3 text-left text-white/70">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                    <span>Up to $9,600 WOTC per hire</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                    <span>92% retention = lower turnover costs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                    <span>70% cheaper than traditional agencies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                    <span>Loyal, motivated workforce</span>
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
                    <CheckCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                    <span>77% lower recidivism with employment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                    <span>Break generational incarceration cycles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                    <span>Reduce community crime rates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                    <span>FREE PR highlighting your impact</span>
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
                    <CheckCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                    <span>Stable housing from Day 1</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                    <span>24/7 crisis support access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                    <span>Real second chance at life</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                    <span>Dignity, purpose, and stability</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* WOTC Legislation Newsletter */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-orange-500/10 to-transparent border-orange-500/30">
            <CardContent className="p-12 text-center">
              <Mail className="h-12 w-12 text-orange-400 mx-auto mb-6" />
              <h2 className="text-4xl mb-4">Stay Ahead of WOTC Changes</h2>
              <p className="text-xl text-white/70 mb-8">
                WOTC tax credits are set to <span className="text-orange-400 font-semibold">increase in 2025</span>. 
                Get legislation updates, tax credit news, and hiring best practices delivered monthly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <Input 
                  type="email" 
                  placeholder="your.email@company.com"
                  className="bg-black/30 border-white/20 text-white placeholder:text-white/40"
                />
                <Button className="bg-orange-500 hover:bg-orange-600 text-white whitespace-nowrap">
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

      {/* CTA - Try Self-Service Instead */}
      <section className="py-20 px-6 bg-gradient-to-b from-[#A8F32C]/5 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <AlertCircle className="h-12 w-12 text-[#A8F32C] mx-auto mb-6" />
          <h2 className="text-4xl mb-4">Want More Control?</h2>
          <p className="text-xl text-white/70 mb-8">
            If you prefer to manage your own hiring process, try <span className="text-[#A8F32C] font-semibold">Friend A Felon Employer Listings</span>—our self-service job board starting at FREE.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-[#A8F32C] hover:bg-[#8CD423] text-black"
              onClick={() => onNavigate('service-employers')}
            >
              See Self-Service Listings
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-orange-500/30 text-orange-400 hover:bg-orange-500/10"
              onClick={() => onNavigate('staffing-crm')}
            >
              <Zap className="mr-2 h-5 w-5" />
              Get Started with Staffing
            </Button>
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}