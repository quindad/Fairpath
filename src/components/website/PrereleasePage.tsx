import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { 
  Users, Calendar, Award, TrendingUp, Briefcase, CheckCircle,
  Clock, Building2, GraduationCap, Target, BarChart3, DollarSign,
  Smartphone, Wifi, Download, Zap
} from 'lucide-react';
import Navigation from './Navigation';
import Footer from './Footer';

interface PrereleasePageProps {
  onNavigate: (page: string) => void;
}

export default function PrereleasePage({ onNavigate }: PrereleasePageProps) {
  return (
    <div className="min-h-screen bg-black">
      <Navigation onNavigate={onNavigate} currentPage="service-prerelease" />
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-[#A8F32C]/10 border border-[#A8F32C] rounded-full mb-6">
              <span className="text-[#A8F32C] font-semibold">In Development - Building Now</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Prepare for Release
              <br />
              <span className="text-[#A8F32C]">Before You Get Out</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              We're building FairPath Ready—a tablet-based app that helps incarcerated people build resumes, 
              track positive habits, earn certifications, and secure job offers BEFORE release day.
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-[#A8F32C] text-black hover:bg-[#8CD423]"
                onClick={() => onNavigate('contact')}
              >
                Partner With Us
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-black"
                onClick={() => onNavigate('signup')}
              >
                Get Started
              </Button>
            </div>
          </div>

          <div className="mb-20">
            <div className="bg-gradient-to-r from-[#A8F32C]/20 to-transparent p-8 rounded-2xl border border-[#A8F32C]/30">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="h-8 w-8 text-[#A8F32C]" />
                <h3 className="text-2xl font-bold text-white">The Problem We Solve</h3>
              </div>
              <p className="text-lg text-gray-300 mb-6">
                650,000 people release from prison annually. 70% are unemployed within a year. 50% return to prison. 
                Why? Because they release with zero preparation, no resume, no job prospects, and no support system.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-black/50 p-6 rounded-lg border border-white/10">
                  <p className="text-4xl font-bold text-red-400 mb-2">70%</p>
                  <p className="text-white">Unemployed at 1 year</p>
                </div>
                <div className="bg-black/50 p-6 rounded-lg border border-white/10">
                  <p className="text-4xl font-bold text-red-400 mb-2">50%</p>
                  <p className="text-white">Return to prison</p>
                </div>
                <div className="bg-black/50 p-6 rounded-lg border border-white/10">
                  <p className="text-4xl font-bold text-red-400 mb-2">0</p>
                  <p className="text-white">Days of job prep before release</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">How FairPath Ready Works</h2>
              <p className="text-xl text-gray-400">A comprehensive prerelease preparation program</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <div className="w-12 h-12 bg-[#A8F32C]/10 rounded-lg flex items-center justify-center mb-4">
                    <Calendar className="h-6 w-6 text-[#A8F32C]" />
                  </div>
                  <CardTitle className="text-white">90 Days Before Release</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">
                    Inmates enroll in FairPath Ready on prison tablets. Begin building resume, 
                    tracking daily habits, and setting reentry goals.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <div className="w-12 h-12 bg-[#A8F32C]/10 rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6 text-[#A8F32C]" />
                  </div>
                  <CardTitle className="text-white">Track Progress Daily</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">
                    Build positive habits, earn certifications, complete resume, and demonstrate 
                    discipline through 90-day habit streaks.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <div className="w-12 h-12 bg-[#A8F32C]/10 rounded-lg flex items-center justify-center mb-4">
                    <Briefcase className="h-6 w-6 text-[#A8F32C]" />
                  </div>
                  <CardTitle className="text-white">Employers See Candidates</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">
                    Data syncs to FairPath Staffing. Employers view qualified candidates 
                    30-90 days before release and make job offers.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <div className="w-12 h-12 bg-[#A8F32C]/10 rounded-lg flex items-center justify-center mb-4">
                    <CheckCircle className="h-6 w-6 text-[#A8F32C]" />
                  </div>
                  <CardTitle className="text-white">Day 1: Job Waiting</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">
                    Person releases with job offer in hand. Starts work within days. 
                    85% still employed at 90 days vs 30% industry average.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Features Built Into Every Tablet</h2>
              <p className="text-xl text-gray-400">Everything they need to prepare, all offline</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-gray-900 border-gray-800 hover:border-[#A8F32C]/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#A8F32C]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="h-5 w-5 text-[#A8F32C]" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-2">Resume Builder</h3>
                      <p className="text-gray-400 text-sm">
                        Step-by-step resume creation with work history, skills, education, and references. 
                        Professional formatting included.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800 hover:border-[#A8F32C]/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#A8F32C]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="h-5 w-5 text-[#A8F32C]" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-2">Habit Tracker</h3>
                      <p className="text-gray-400 text-sm">
                        Track daily habits like reading, exercise, education. Build proof of discipline 
                        with 90-day streaks that employers see.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800 hover:border-[#A8F32C]/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#A8F32C]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Target className="h-5 w-5 text-[#A8F32C]" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-2">Goal Setting</h3>
                      <p className="text-gray-400 text-sm">
                        Create 30/60/90 day plans for employment, housing, education, and personal growth. 
                        Track progress toward each goal.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800 hover:border-[#A8F32C]/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#A8F32C]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="h-5 w-5 text-[#A8F32C]" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-2">Certifications</h3>
                      <p className="text-gray-400 text-sm">
                        Track GED, OSHA, forklift, welding, and other certifications earned during 
                        incarceration. Verify and showcase credentials.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800 hover:border-[#A8F32C]/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#A8F32C]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="h-5 w-5 text-[#A8F32C]" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-2">Daily Check-Ins</h3>
                      <p className="text-gray-400 text-sm">
                        Reflect daily on mood, gratitude, learnings, and goals. Build emotional 
                        intelligence and self-awareness.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800 hover:border-[#A8F32C]/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#A8F32C]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="h-5 w-5 text-[#A8F32C]" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-2">Countdown Calendar</h3>
                      <p className="text-gray-400 text-sm">
                        Visual countdown to release with milestone tracking. Stay motivated with 
                        progress bars and achievement badges.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#A8F32C]/10 to-transparent p-12 rounded-2xl border border-[#A8F32C]/30 mb-20">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <Smartphone className="h-8 w-8 text-[#A8F32C]" />
                <h2 className="text-3xl font-bold text-white">100% Offline, Always Accessible</h2>
              </div>
              <p className="text-lg text-gray-300 mb-6">
                FairPath Ready works completely offline on prison tablets. No internet required during 
                the day. Data syncs automatically at night via facility WiFi, or can be manually 
                exported by correctional staff.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <Wifi className="h-5 w-5 text-[#A8F32C]" />
                  <span className="text-white">Auto-sync at night</span>
                </div>
                <div className="flex items-center gap-3">
                  <Download className="h-5 w-5 text-[#A8F32C]" />
                  <span className="text-white">Manual export option</span>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="h-5 w-5 text-[#A8F32C]" />
                  <span className="text-white">Release day activation</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">For Correctional Facilities</h2>
              <p className="text-xl text-gray-400">Easy implementation, powerful outcomes</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">Why Partner With Us</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#A8F32C] mt-1" />
                    <div>
                      <p className="text-white font-semibold">Free to Inmates</p>
                      <p className="text-gray-400 text-sm">Zero cost to incarcerated people. No subscription fees.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#A8F32C] mt-1" />
                    <div>
                      <p className="text-white font-semibold">Zero Cost to Facility</p>
                      <p className="text-gray-400 text-sm">No upfront investment. We handle all technology.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#A8F32C] mt-1" />
                    <div>
                      <p className="text-white font-semibold">Better Recidivism Numbers</p>
                      <p className="text-gray-400 text-sm">85% employment rate = lower recidivism = more federal funding.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#A8F32C] mt-1" />
                    <div>
                      <p className="text-white font-semibold">Minimal Staff Time</p>
                      <p className="text-gray-400 text-sm">Auto-syncs at night or 15-minute weekly export. That's it.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#A8F32C] mt-1" />
                    <div>
                      <p className="text-white font-semibold">Positive PR</p>
                      <p className="text-gray-400 text-sm">Show you're investing in reentry. Media loves this story.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">Implementation Process</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#A8F32C]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-[#A8F32C] font-bold">1</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold">Initial Meeting</p>
                      <p className="text-gray-400 text-sm">30-minute call to discuss facility needs and tech setup.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#A8F32C]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-[#A8F32C] font-bold">2</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold">Tablet Installation</p>
                      <p className="text-gray-400 text-sm">We provide app download link. Works on existing tablets.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#A8F32C]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-[#A8F32C] font-bold">3</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold">Staff Training</p>
                      <p className="text-gray-400 text-sm">1-hour training for correctional staff on data export.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#A8F32C]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-[#A8F32C] font-bold">4</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold">Pilot Launch</p>
                      <p className="text-gray-400 text-sm">Start with 50-100 participants. Monitor outcomes for 90 days.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#A8F32C]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-[#A8F32C] font-bold">5</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold">Scale Up</p>
                      <p className="text-gray-400 text-sm">Expand to full facility based on pilot results.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">For Employers</h2>
              <p className="text-xl text-gray-400">Access to pre-vetted candidates before they release</p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">FairPath Staffing Integration</h3>
                  <p className="text-gray-400 mb-6">
                    FairPath Ready candidates automatically appear in your FairPath Staffing dashboard. 
                    View their complete profiles 30-90 days before release and make job offers while 
                    they're still preparing.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Building2 className="h-5 w-5 text-[#A8F32C] mt-1" />
                      <div>
                        <p className="text-white font-semibold">Complete Profiles</p>
                        <p className="text-gray-400 text-sm">Resume, skills, certifications, habit tracking data</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <BarChart3 className="h-5 w-5 text-[#A8F32C] mt-1" />
                      <div>
                        <p className="text-white font-semibold">Readiness Scores</p>
                        <p className="text-gray-400 text-sm">0-100 score based on profile completion and engagement</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-[#A8F32C] mt-1" />
                      <div>
                        <p className="text-white font-semibold">Release Countdowns</p>
                        <p className="text-gray-400 text-sm">Know exactly when each candidate will be available</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <TrendingUp className="h-5 w-5 text-[#A8F32C] mt-1" />
                      <div>
                        <p className="text-white font-semibold">Proof of Discipline</p>
                        <p className="text-gray-400 text-sm">90-day habit streaks show reliability and commitment</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-black/50 p-6 rounded-lg border border-white/10">
                  <h4 className="text-xl font-bold text-white mb-4">Placement Fee Structure</h4>
                  <p className="text-gray-400 mb-6">
                    Same as regular FairPath Staffing placements. Only pay when you successfully hire.
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center p-3 bg-gray-900 rounded">
                      <span className="text-white">Entry-Level Hire</span>
                      <span className="text-[#A8F32C] font-bold">$500</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-900 rounded">
                      <span className="text-white">Skilled Trade Hire</span>
                      <span className="text-[#A8F32C] font-bold">$1,000</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-900 rounded">
                      <span className="text-white">Management Hire</span>
                      <span className="text-[#A8F32C] font-bold">$1,500</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full bg-[#A8F32C] text-black hover:bg-[#8CD423]"
                    onClick={() => onNavigate('service-employers')}
                  >
                    Learn More About FairPath Staffing
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#A8F32C]/20 to-transparent p-12 rounded-2xl border border-[#A8F32C]/30 mb-20">
            <div className="max-w-4xl">
              <h2 className="text-3xl font-bold text-white mb-4">Impact at Scale</h2>
              <p className="text-lg text-gray-300 mb-8">
                When 1,000 people use FairPath Ready and secure employment before release:
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <p className="text-4xl font-bold text-[#A8F32C] mb-2">850</p>
                  <p className="text-white font-semibold mb-1">Employed at 90 Days</p>
                  <p className="text-gray-400 text-sm">vs 300 without intervention</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-[#A8F32C] mb-2">85%</p>
                  <p className="text-white font-semibold mb-1">Reduction in Recidivism</p>
                  <p className="text-gray-400 text-sm">vs 50% baseline rate</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-[#A8F32C] mb-2">$17.5M</p>
                  <p className="text-white font-semibold mb-1">Saved Annually</p>
                  <p className="text-gray-400 text-sm">500 fewer reincarcerated x $35K/year</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Break the Cycle?</h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Partner with FairPath Ready to give incarcerated people the tools they need to succeed 
              before they walk out the door.
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-[#A8F32C] text-black hover:bg-[#8CD423]"
                onClick={() => onNavigate('contact')}
              >
                Contact Us
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-black"
                onClick={() => onNavigate('signup')}
              >
                Get Started
              </Button>
            </div>
          </div>

        </div>
      </div>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}