import { ArrowRight, Users, Building2, Heart, TrendingUp, Shield, Zap, Smartphone, GraduationCap, DollarSign, Scale, Video } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import Navigation from './Navigation';
import Footer from './Footer';
import WOTCImpactCalculator from '../platform/WOTCImpactCalculator';

interface HomepageProps {
  onNavigate: (page: string) => void;
}

export default function Homepage({ onNavigate }: HomepageProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation onNavigate={onNavigate} currentPage="home" />

      <section className="pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-6 bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30 text-sm px-4 py-2">
              We See The Holes. We're Building The Bridges.
            </Badge>
            <h1 className="text-6xl lg:text-7xl mb-6 leading-tight">
              The System Is <span className="text-red-500">Broken</span>.<br/>
              <span className="text-[#A8F32C]">FairPath</span> Is Fixing It.
            </h1>
            <p className="text-2xl text-white/80 max-w-4xl mx-auto mb-4">
              650,000 people leave prison with no jobs waiting. 200,000 veterans leave the military with skills civilians don't understand. 
              The system abandons them both. <span className="text-[#A8F32C] font-bold">We don&apos;t.</span>
            </p>
            <p className="text-xl text-white/60 max-w-3xl mx-auto mb-12">
              FairPath Industries builds technology that dismantles barriers, creates opportunity, and proves that everyone—no matter their past—
              deserves a shot at rebuilding their life. We&apos;re not asking for permission. We&apos;re building the future.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <Button
                size="lg"
                className="bg-[#A8F32C] hover:bg-[#8CD423] text-black text-lg px-8 py-6 h-auto font-bold"
                onClick={() => onNavigate('signup')}
              >
                Join The Movement
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6 h-auto font-bold"
                onClick={() => onNavigate('crm-hub')}
              >
                <Building2 className="mr-2 h-5 w-5" />
                Access CRM Portals
              </Button>
              <Button
                size="lg"
                className="bg-white hover:bg-gray-200 text-black text-lg px-8 py-6 h-auto font-bold"
                onClick={() => onNavigate('donate')}
              >
                <Heart className="mr-2 h-5 w-5" />
                Fund The Revolution
              </Button>
            </div>

            {/* Enhanced Stats Grid */}
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Justice-Impacted Stats */}
              <div className="bg-gradient-to-br from-[#A8F32C]/10 to-transparent border border-[#A8F32C]/30 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-[#A8F32C] mb-6">The Problem: Justice-Impacted</h3>
                <div className="text-center mb-4">
                  <p className="text-5xl font-bold text-green-400 mb-2">$2,400 - $9,000</p>
                  <p className="text-sm text-white/70">WOTC tax credit per qualified hire</p>
                  <p className="text-xs text-white/50 mt-1">(IRS Work Opportunity Tax Credit)</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg border border-white/10 space-y-2">
                  <p className="text-sm text-white/80">
                    <strong className="text-green-400">Base:</strong> $2,400 for qualifying ex-felon hires
                  </p>
                  <p className="text-sm text-white/80">
                    <strong className="text-yellow-400">Enhanced:</strong> $9,000 if they also receive SNAP, SSI, TANF, or live in Empowerment Zones
                  </p>
                  <p className="text-xs text-white/50 mt-2 italic">
                    Many justice-impacted individuals qualify for enhanced credits—making them even MORE valuable to employers.
                  </p>
                </div>
              </div>

              {/* Veteran Stats */}
              <div className="bg-gradient-to-br from-[#0A1F44]/30 via-[#DC143C]/20 to-transparent border border-[#FFD700]/30 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-[#FFD700] mb-6">The Problem: Veterans</h3>
                <div className="text-center mb-4">
                  <p className="text-5xl font-bold text-[#FFD700] mb-2">$9,600</p>
                  <p className="text-sm text-white/70">WOTC tax credit per qualified hire</p>
                  <p className="text-xs text-white/50 mt-1">(IRS Work Opportunity Tax Credit)</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <p className="text-sm text-white/60">
                    Employers hiring qualified veterans can claim up to $9,600 in federal tax credits per hire—
                    creating massive incentives to hire those who served our country.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-lg text-white/50 mt-8 italic">
              &quot;Don&apos;t tell us what&apos;s impossible. Show us what needs fixing, and we&apos;ll build it.&quot;
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gradient-to-b from-yellow-500/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <WOTCImpactCalculator onViewDetails={() => onNavigate('platform-value')} />
        </div>
      </section>

      <section className="py-8 px-6 bg-gradient-to-b from-transparent to-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-5xl font-bold mb-4">How We&apos;re <span className="text-[#A8F32C]">Changing The Game</span></h2>
            <p className="text-xl text-white/60">Seven platforms. One mission: Dismantle the barriers holding people back.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-[#A8F32C]/10 to-transparent border-[#A8F32C]/30 hover:border-[#A8F32C] transition-all cursor-pointer group" onClick={() => onNavigate('service-friend-a-felon')}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-[#A8F32C]/20 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-[#A8F32C]" />
                  </div>
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">Live</Badge>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Friend A Felon</h3>
                <p className="text-sm text-white/70 mb-4">
                  Jobs, housing, free items, and community support for justice-impacted people.
                </p>
                <Button className="w-full bg-[#A8F32C] hover:bg-[#8CD423] text-black text-sm group-hover:bg-white transition-all">
                  Explore <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-[#0A1F44]/10 via-[#DC143C]/10 to-transparent border-[#FFD700]/30 hover:border-[#FFD700] transition-all cursor-pointer group" onClick={() => onNavigate('service-veterans')}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#0A1F44] to-[#DC143C] rounded-lg flex items-center justify-center">
                    <Shield className="h-6 w-6 text-[#FFD700]" />
                  </div>
                  <Badge className="bg-gradient-to-r from-[#0A1F44] to-[#DC143C] text-white text-xs">SOON 🇺🇸</Badge>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Friend A Veteran</h3>
                <p className="text-sm text-white/70 mb-4">
                  MOS translator, clearance jobs, BAH housing, VA benefits for veterans.
                </p>
                <Button className="w-full bg-gradient-to-r from-[#0A1F44] to-[#DC143C] text-white text-sm group-hover:opacity-90 transition-all">
                  Waitlist <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500/10 to-transparent border-purple-500/30 hover:border-purple-500 transition-all cursor-pointer group" onClick={() => onNavigate('service-forward')}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <Smartphone className="h-6 w-6 text-purple-400" />
                  </div>
                  <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs">NEW</Badge>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">FairPath Forward</h3>
                <p className="text-sm text-white/70 mb-4">
                  Tablet app for incarcerated people to prepare BEFORE release.
                </p>
                <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white text-sm group-hover:bg-white group-hover:text-black transition-all">
                  Learn More <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-500/10 to-transparent border-orange-500/30 hover:border-orange-500 transition-all cursor-pointer group" onClick={() => onNavigate('service-staffing')}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                    <Zap className="h-6 w-6 text-orange-400" />
                  </div>
                  <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30 text-xs">AI</Badge>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">FairPath Staffing</h3>
                <p className="text-sm text-white/70 mb-4">
                  100% AI-automated staffing. 70% cheaper than traditional agencies.
                </p>
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm group-hover:bg-white group-hover:text-black transition-all">
                  Employers <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-500/10 to-transparent border-yellow-500/30 hover:border-yellow-500 transition-all cursor-pointer group" onClick={() => onNavigate('service-simulations')}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                    <GraduationCap className="h-6 w-6 text-yellow-400" />
                  </div>
                  <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30 text-xs">Beta</Badge>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">FairPath Simulations</h3>
                <p className="text-sm text-white/70 mb-4">
                  Immersive educational experience teaching empathy for reentry.
                </p>
                <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black text-sm group-hover:bg-white transition-all">
                  Try Now <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-400/10 to-transparent border-purple-400/30 hover:border-purple-400 transition-all cursor-pointer group" onClick={() => onNavigate('service-legal')}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-400/20 rounded-lg flex items-center justify-center">
                    <Scale className="h-6 w-6 text-purple-400" />
                  </div>
                  <Badge className="bg-purple-400/20 text-purple-300 border-purple-400/30 text-xs">Legal</Badge>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">FairPath Legal</h3>
                <p className="text-sm text-white/70 mb-4">
                  AI-powered expungement checker. Clear your record. 100% FREE.
                </p>
                <Button className="w-full bg-purple-400 hover:bg-purple-500 text-white text-sm group-hover:bg-white group-hover:text-black transition-all">
                  Check Now <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-500/10 to-transparent border-red-500/30 hover:border-red-500 transition-all cursor-pointer group" onClick={() => onNavigate('service-police')}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                    <Video className="h-6 w-6 text-red-400" />
                  </div>
                  <Badge className="bg-red-500/20 text-red-300 border-red-500/30 text-xs">NEW</Badge>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Police The Police™</h3>
                <p className="text-sm text-white/70 mb-4">
                  Body cam for the people. Record, alert, connect to legal help.
                </p>
                <Button className="w-full bg-red-500 hover:bg-red-600 text-white text-sm group-hover:bg-white group-hover:text-black transition-all">
                  Download <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gradient-to-b from-[#A8F32C]/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Use The Calculator Above</h2>
            <p className="text-xl text-white/60">Enter YOUR numbers to see the real economic impact</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-6">
                  <DollarSign className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">For Businesses</h3>
                <p className="text-white/70 mb-4">
                  Every qualified hire unlocks federal WOTC tax credits worth $2,400-$9,600 per person. 
                  Plus save ~$15K in recruiting costs per hire. Win-win.
                </p>
                <div className="bg-green-500/10 p-3 rounded border border-green-500/30">
                  <p className="text-sm text-white/60">
                    Use the calculator to see your potential savings based on YOUR hiring needs.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-[#A8F32C]/20 rounded-lg flex items-center justify-center mb-6">
                  <Users className="h-6 w-6 text-[#A8F32C]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">For Job Seekers</h3>
                <p className="text-white/70 mb-4">
                  Your WOTC eligibility makes you MORE valuable to employers, not less. 
                  You&apos;re worth $2,400-$9,600 in tax credits to any business that hires you.
                </p>
                <div className="bg-[#A8F32C]/10 p-3 rounded border border-[#A8F32C]/30">
                  <p className="text-sm text-white/60">
                    FairPath connects you with employers who understand your value.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-[#A8F32C]/20 to-transparent p-12 rounded-2xl border border-[#A8F32C]/30 text-center">
            <Heart className="h-16 w-16 text-[#A8F32C] mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-white mb-4">Support Real Change</h2>
            <p className="text-xl text-white/70 mb-8">
              Your donation directly funds technology that gives people a second chance. 
              Every dollar creates pathways out of the cycle.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mb-6">
              <Button 
                size="lg" 
                className="bg-[#A8F32C] hover:bg-[#8CD423] text-black text-lg px-8 py-6 h-auto"
                onClick={() => onNavigate('donate')}
              >
                <Heart className="mr-2 h-5 w-5" />
                Make a Donation
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-black text-lg px-8 py-6 h-auto"
                onClick={() => onNavigate('contact')}
              >
                Become a Partner
              </Button>
            </div>
            <p className="text-sm text-white/50">
              FairPath Industries is a 501(c)(3) nonprofit. All donations are tax-deductible.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gradient-to-t from-gray-900/50 to-transparent">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">Ready to Make an Impact?</h2>
          <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
            Whether you&apos;re looking for work, hiring talent, or want to support the movement—there&apos;s a place for you here.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-[#A8F32C] hover:bg-[#8CD423] text-black text-lg px-8 py-6 h-auto"
              onClick={() => onNavigate('signup')}
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-black text-lg px-8 py-6 h-auto"
              onClick={() => onNavigate('contact')}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}