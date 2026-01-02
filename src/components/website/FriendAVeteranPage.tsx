import { ArrowRight, Shield, Briefcase, Home, Heart, Award, Users, DollarSign, CheckCircle, Zap, Star, Flag, AlertCircle, Mail, Crown } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import Navigation from './Navigation';
import Footer from './Footer';

interface FriendAVeteranPageProps {
  onNavigate: (page: string) => void;
}

export default function FriendAVeteranPage({ onNavigate }: FriendAVeteranPageProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation onNavigate={onNavigate} currentPage="service-veterans" />

      {/* Hero Section - Patriotic Gradient */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Patriotic Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1F44] via-[#DC143C] to-[#0A1F44] opacity-20"></div>
        
        {/* Subtle Star Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 text-6xl">★</div>
          <div className="absolute top-40 right-20 text-4xl">★</div>
          <div className="absolute bottom-20 left-1/4 text-5xl">★</div>
          <div className="absolute bottom-40 right-1/3 text-3xl">★</div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <Badge className="mb-6 bg-gradient-to-r from-[#0A1F44] via-[#DC143C] to-[#0A1F44] text-white border-[#FFD700]/30 text-sm px-4 py-2">
            🇺🇸 LAUNCHING SOON - Friend A Veteran
          </Badge>
          <h1 className="text-6xl lg:text-7xl mb-6 leading-tight">
            <span className="text-[#DC143C]">SERVED</span> OUR COUNTRY.<br/>
            <span className="text-[#FFD700]">DESERVE</span> OPPORTUNITY AT HOME.
          </h1>
          <p className="text-2xl text-white/80 max-w-4xl mx-auto mb-8">
            Friend A Veteran connects transitioning service members and veterans with jobs, housing, 
            VA benefits, and a community that has their six. <span className="text-[#FFD700] font-semibold">No hero left behind.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-[#DC143C] hover:bg-[#B01030] text-white text-lg px-8"
              onClick={() => window.open('mailto:veterans@friendafelon.com?subject=Friend A Veteran - Early Access', '_blank')}
            >
              <Flag className="mr-2 h-5 w-5" />
              Join the Waitlist
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-[#FFD700]/30 text-[#FFD700] hover:bg-[#FFD700]/10 text-lg px-8"
            >
              Download Blueprint
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-[#0A1F44]/30 border border-[#FFD700]/30 rounded-lg p-4">
              <div className="text-3xl text-[#FFD700] mb-1">200K+</div>
              <div className="text-sm text-white/60">Veterans transition yearly</div>
            </div>
            <div className="bg-[#0A1F44]/30 border border-[#FFD700]/30 rounded-lg p-4">
              <div className="text-3xl text-[#FFD700] mb-1">$9,600</div>
              <div className="text-sm text-white/60">WOTC per veteran hire</div>
            </div>
            <div className="bg-[#0A1F44]/30 border border-[#FFD700]/30 rounded-lg p-4">
              <div className="text-3xl text-[#FFD700] mb-1">FREE</div>
              <div className="text-sm text-white/60">For all veterans</div>
            </div>
            <div className="bg-[#0A1F44]/30 border border-[#FFD700]/30 rounded-lg p-4">
              <div className="text-3xl text-[#FFD700] mb-1">24/7</div>
              <div className="text-sm text-white/60">Veteran support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl mb-4">MISSION: <span className="text-[#DC143C]">TRANSITION</span> TO <span className="text-[#FFD700]">CIVILIAN SUCCESS</span></h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Everything transitioning service members and veterans need in one place. Built by those who understand the mission.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Jobs */}
            <Card className="bg-gradient-to-br from-[#0A1F44]/30 to-transparent border-[#FFD700]/30">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-[#DC143C]/20 rounded-lg flex items-center justify-center mb-4">
                  <Briefcase className="h-8 w-8 text-[#DC143C]" />
                </div>
                <h3 className="text-2xl mb-3">Veteran-Friendly Jobs</h3>
                <p className="text-white/70 mb-4">
                  AI-powered MOS translator converts your military skills to civilian careers. Security clearance matching. WOTC-eligible employers.
                </p>
                <ul className="space-y-2 text-sm text-white/60">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#FFD700]" />
                    Military skills translation
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#FFD700]" />
                    Clearance-required jobs
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#FFD700]" />
                    Government contractor roles
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#FFD700]" />
                    VeteransPath Staffing
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Housing */}
            <Card className="bg-gradient-to-br from-[#0A1F44]/30 to-transparent border-[#FFD700]/30">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-[#DC143C]/20 rounded-lg flex items-center justify-center mb-4">
                  <Home className="h-8 w-8 text-[#DC143C]" />
                </div>
                <h3 className="text-2xl mb-3">BAH-Compatible Housing</h3>
                <p className="text-white/70 mb-4">
                  Find veteran-preferred rentals that accept BAH. Zero-deposit options. Landlords who understand military life.
                </p>
                <ul className="space-y-2 text-sm text-white/60">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#FFD700]" />
                    BAH rate calculator
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#FFD700]" />
                    Veteran-preferred landlords
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#FFD700]" />
                    Zero-deposit options
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#FFD700]" />
                    Near VA facilities
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* VA Benefits */}
            <Card className="bg-gradient-to-br from-[#0A1F44]/30 to-transparent border-[#FFD700]/30">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-[#DC143C]/20 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-[#DC143C]" />
                </div>
                <h3 className="text-2xl mb-3">VA Benefits Navigator</h3>
                <p className="text-white/70 mb-4">
                  Understand your benefits. GI Bill calculator, disability rating guide, healthcare enrollment, claims tracking.
                </p>
                <ul className="space-y-2 text-sm text-white/60">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#FFD700]" />
                    GI Bill calculator
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#FFD700]" />
                    Disability claims help
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#FFD700]" />
                    Healthcare enrollment
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#FFD700]" />
                    Appeals assistance
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Community */}
            <Card className="bg-gradient-to-br from-[#0A1F44]/30 to-transparent border-[#FFD700]/30">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-[#DC143C]/20 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-[#DC143C]" />
                </div>
                <h3 className="text-2xl mb-3">Veteran Social Network</h3>
                <p className="text-white/70 mb-4">
                  Connect with your brothers and sisters. Branch-specific groups, unit reunions, mentor matching, peer support.
                </p>
                <ul className="space-y-2 text-sm text-white/60">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#FFD700]" />
                    Branch-specific groups
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#FFD700]" />
                    Unit/Company networking
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#FFD700]" />
                    Mentor matching
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#FFD700]" />
                    Crisis hotline (988-1)
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Legal */}
            <Card className="bg-gradient-to-br from-[#0A1F44]/30 to-transparent border-[#FFD700]/30">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-[#DC143C]/20 rounded-lg flex items-center justify-center mb-4">
                  <Award className="h-8 w-8 text-[#DC143C]" />
                </div>
                <h3 className="text-2xl mb-3">VeteransPath Legal</h3>
                <p className="text-white/70 mb-4">
                  VA-accredited attorneys for claims, discharge upgrades, appeals, veterans court, and benefits disputes.
                </p>
                <ul className="space-y-2 text-sm text-white/60">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#FFD700]" />
                    VA claims & appeals
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#FFD700]" />
                    Discharge upgrades
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#FFD700]" />
                    Veterans court defense
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#FFD700]" />
                    DD-214 corrections
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Entrepreneurship */}
            <Card className="bg-gradient-to-br from-[#0A1F44]/30 to-transparent border-[#FFD700]/30">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-[#DC143C]/20 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-8 w-8 text-[#DC143C]" />
                </div>
                <h3 className="text-2xl mb-3">Veteran Entrepreneurship</h3>
                <p className="text-white/70 mb-4">
                  Start your business. VOSB/SDVOSB certification, SBA loans, government contracting, mentor matching.
                </p>
                <ul className="space-y-2 text-sm text-white/60">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#FFD700]" />
                    VOSB certification help
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#FFD700]" />
                    SBA loan guidance
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#FFD700]" />
                    Gov contracting bootcamp
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#FFD700]" />
                    Business plan AI tool
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Veterans + Why Employers */}
      <section className="py-20 px-6 bg-gradient-to-b from-[#0A1F44]/20 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* For Veterans */}
            <div>
              <h2 className="text-4xl mb-6 text-[#DC143C]">FOR VETERANS</h2>
              <p className="text-xl text-white/70 mb-6">
                You served with honor. Now we serve you. Everything you need to transition successfully—in one place.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Star className="w-6 h-6 text-[#FFD700] flex-shrink-0 mt-1" />
                  <div>
                    <div className="text-lg font-semibold">Military Skills Translator</div>
                    <div className="text-white/60">AI converts your MOS/Rate to civilian job titles instantly</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="w-6 h-6 text-[#FFD700] flex-shrink-0 mt-1" />
                  <div>
                    <div className="text-lg font-semibold">Security Clearance Matching</div>
                    <div className="text-white/60">Your clearance is valuable—find jobs that pay for it</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="w-6 h-6 text-[#FFD700] flex-shrink-0 mt-1" />
                  <div>
                    <div className="text-lg font-semibold">Free for Life</div>
                    <div className="text-white/60">Core platform 100% free. Premium features just $2-5/month</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="w-6 h-6 text-[#FFD700] flex-shrink-0 mt-1" />
                  <div>
                    <div className="text-lg font-semibold">Branch-Based Community</div>
                    <div className="text-white/60">Connect with your branch, unit, and era-specific groups</div>
                  </div>
                </li>
              </ul>
            </div>

            {/* For Employers */}
            <div>
              <h2 className="text-4xl mb-6 text-[#FFD700]">FOR EMPLOYERS</h2>
              <p className="text-xl text-white/70 mb-6">
                Veterans are disciplined, loyal, and mission-focused. Plus, you get up to $9,600 in tax credits per hire.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <DollarSign className="w-6 h-6 text-[#FFD700] flex-shrink-0 mt-1" />
                  <div>
                    <div className="text-lg font-semibold">WOTC Tax Credits</div>
                    <div className="text-white/60">Up to $9,600 per veteran hire. We handle all IRS paperwork.</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <DollarSign className="w-6 h-6 text-[#FFD700] flex-shrink-0 mt-1" />
                  <div>
                    <div className="text-lg font-semibold">Security Clearance Verified</div>
                    <div className="text-white/60">Hire cleared talent for government contracts instantly</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <DollarSign className="w-6 h-6 text-[#FFD700] flex-shrink-0 mt-1" />
                  <div>
                    <div className="text-lg font-semibold">Higher Retention</div>
                    <div className="text-white/60">Veterans are loyal, disciplined, and stay longer</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <DollarSign className="w-6 h-6 text-[#FFD700] flex-shrink-0 mt-1" />
                  <div>
                    <div className="text-lg font-semibold">Corporate Social Responsibility</div>
                    <div className="text-white/60">Build your brand as a patriotic employer</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Blueprint Teaser */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-[#0A1F44]/30 to-transparent border-[#FFD700]/30">
            <CardContent className="p-12 text-center">
              <Crown className="h-16 w-16 text-[#FFD700] mx-auto mb-6" />
              <h2 className="text-4xl mb-4">COMPLETE PLATFORM BLUEPRINT</h2>
              <p className="text-xl text-white/70 mb-8">
                Friend A Veteran is a comprehensive reentry ecosystem for veterans—mirroring Friend A Felon's proven model. 
                <span className="text-[#FFD700] font-semibold block mt-2">Jobs. Housing. Benefits. Community. Legal. Entrepreneurship.</span>
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8 text-left">
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <div className="text-2xl text-[#DC143C] mb-2">3 Portals</div>
                  <div className="text-sm text-white/60">Veterans, Supporters, Employers/Landlords</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <div className="text-2xl text-[#DC143C] mb-2">13 Modules</div>
                  <div className="text-sm text-white/60">Complete Resource Center (VA benefits, legal, training)</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <div className="text-2xl text-[#DC143C] mb-2">VeteransPath</div>
                  <div className="text-sm text-white/60">Staffing, Legal, Gigs marketplace</div>
                </div>
              </div>

              <Button 
                size="lg"
                className="bg-[#DC143C] hover:bg-[#B01030] text-white"
                onClick={() => window.open('/friend-a-veteran-blueprint.pdf', '_blank')}
              >
                Download Full Blueprint
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 px-6 bg-gradient-to-b from-white/5 to-transparent">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-[#0A1F44]/30 to-transparent border-[#FFD700]/30">
            <CardContent className="p-12 text-center">
              <Mail className="h-12 w-12 text-[#FFD700] mx-auto mb-6" />
              <h2 className="text-4xl mb-4">JOIN THE MISSION</h2>
              <p className="text-xl text-white/70 mb-8">
                Be the first to know when Friend A Veteran launches. Early access for veterans, exclusive employer rates, and launch day perks.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <Input 
                  type="email" 
                  placeholder="your.email@example.com"
                  className="bg-black/30 border-white/20 text-white placeholder:text-white/40"
                />
                <Button className="bg-[#DC143C] hover:bg-[#B01030] text-white whitespace-nowrap">
                  Join Waitlist
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-white/40 mt-4">
                Launching Q1 2025. No spam, just mission-critical updates.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA - Sister Platform */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <AlertCircle className="h-12 w-12 text-[#A8F32C] mx-auto mb-6" />
          <h2 className="text-4xl mb-4">OUR SISTER PLATFORM</h2>
          <p className="text-xl text-white/70 mb-8">
            Friend A Veteran is powered by the same mission as <span className="text-[#A8F32C] font-semibold">Friend A Felon</span>—
            second chances, dignity, and opportunity for those society often overlooks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-[#A8F32C] hover:bg-[#8CD423] text-black"
              onClick={() => onNavigate('service-friend-a-felon')}
            >
              Explore Friend A Felon
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-[#DC143C]/30 text-[#DC143C] hover:bg-[#DC143C]/10"
              onClick={() => onNavigate('home')}
            >
              Back to FairPath Home
            </Button>
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
