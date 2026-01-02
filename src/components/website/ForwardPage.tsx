import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  Smartphone, Target, TrendingDown, DollarSign, CheckCircle, 
  Brain, BarChart3, Shield, Users, Calendar, Award, Zap
} from 'lucide-react';
import Navigation from './Navigation';
import Footer from './Footer';

interface ForwardPageProps {
  onNavigate: (page: string) => void;
}

export default function ForwardPage({ onNavigate }: ForwardPageProps) {
  return (
    <div className="min-h-screen bg-black">
      <Navigation onNavigate={onNavigate} currentPage="service-forward" />

      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Hero Section */}
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-blue-500/20 text-blue-400 border-blue-500/30 text-sm px-4 py-2">
              Predictive Reentry Technology
            </Badge>
            <h1 className="text-5xl md:text-7xl mb-6 leading-tight">
              FairPath Forward
              <br />
              <span className="text-blue-400">Tablet App for Incarcerated Individuals</span>
            </h1>
            <p className="text-2xl text-white/80 max-w-4xl mx-auto mb-4">
              Offline-first tablet app that helps incarcerated individuals prepare for release while generating 
              predictive analytics that reduce recidivism by 66%.
            </p>
            <p className="text-lg text-white/60 max-w-3xl mx-auto mb-12">
              Works 100% offline in any facility. Free for inmates. Funded by employer fees and state contracts.
            </p>
          </div>

          {/* The Big 3 Metrics */}
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            <div className="bg-gradient-to-br from-[#A8F32C]/20 to-transparent border border-[#A8F32C]/30 rounded-2xl p-8 text-center">
              <TrendingDown className="h-12 w-12 text-[#A8F32C] mx-auto mb-4" />
              <p className="text-5xl text-white mb-3">66%</p>
              <p className="text-xl text-white mb-2">Lower Recidivism</p>
              <p className="text-white/60">15% vs 44% state average</p>
            </div>
            <div className="bg-gradient-to-br from-blue-500/20 to-transparent border border-blue-500/30 rounded-2xl p-8 text-center">
              <Target className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <p className="text-5xl text-white mb-3">77%</p>
              <p className="text-xl text-white mb-2">Employment Rate</p>
              <p className="text-white/60">Within 30 days of release</p>
            </div>
            <div className="bg-gradient-to-br from-green-500/20 to-transparent border border-green-500/30 rounded-2xl p-8 text-center">
              <DollarSign className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <p className="text-5xl text-white mb-3">$47K</p>
              <p className="text-xl text-white mb-2">Saved Per Person</p>
              <p className="text-white/60">Per prevented recidivism annually</p>
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-20">
            <h2 className="text-4xl text-white mb-12 text-center">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#A8F32C]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Smartphone className="h-8 w-8 text-[#A8F32C]" />
                </div>
                <h3 className="text-2xl text-white mb-4">1. Inmates Use App</h3>
                <p className="text-white/70">
                  Download on facility tablets. Build resume, set goals, track habits, earn certifications. 
                  All data stored locally—works 100% offline.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BarChart3 className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-2xl text-white mb-4">2. Data Syncs Automatically</h3>
                <p className="text-white/70">
                  Auto WiFi sync (60% of facilities) or weekly staff export (40%). On release day, 
                  inmate claims account and all data syncs to personal device.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Brain className="h-8 w-8 text-purple-400" />
                </div>
                <h3 className="text-2xl text-white mb-4">3. Predictive Analytics</h3>
                <p className="text-white/70">
                  AI generates reentry readiness scores and recidivism risk predictions. Employers get 
                  pre-vetted candidates. States identify who needs intervention.
                </p>
              </div>
            </div>
          </div>

          {/* Features for Inmates */}
          <div className="mb-20">
            <h2 className="text-4xl text-white mb-4 text-center">Features for Inmates</h2>
            <p className="text-xl text-white/60 mb-12 text-center">Everything they need to prepare for release</p>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-[#A8F32C]" />
                    Resume Builder
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70">
                    Create professional resumes with templates. Auto-checks grammar and spelling. 
                    Tracks completeness score and updates. Export PDF on release day.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-[#A8F32C]" />
                    Goal Tracking
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70">
                    Set 30/60/90 day goals for employment, housing, family, health, education, and finances. 
                    Track progress and completion rates.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-[#A8F32C]" />
                    Habit Tracker
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70">
                    Build positive habits (exercise, reading, meditation). Track streaks and consistency. 
                    Categories: health, education, financial, social, mental.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-[#A8F32C]" />
                    Daily Check-Ins
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70">
                    Mood tracking, challenges log, reflection prompts. Sentiment analysis identifies 
                    anxiety/hope patterns. 92% completion rate.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-[#A8F32C]" />
                    Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70">
                    Track certifications earned (OSHA, forklift, CPR, food handler). Upload proof. 
                    Show employers verified skills.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-[#A8F32C]" />
                    Release Planner
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70">
                    Step-by-step checklist for Day 1, Week 1, Month 1. Housing, transportation, phone, 
                    ID, banking, healthcare—all planned before release.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-[#A8F32C]" />
                    Support Network Map
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70">
                    Add family, mentors, friends. Rate relationship strength. Identify accountability 
                    partners who will help after release.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-[#A8F32C]" />
                    Release Day Countdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70">
                    Visual countdown to release date. Motivation booster. Reminds inmates to complete 
                    their release plan as the date approaches.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* The Data We Collect */}
          <div className="mb-20">
            <div className="bg-gradient-to-br from-purple-500/20 to-transparent border border-purple-500/30 rounded-3xl p-12">
              <div className="flex items-center gap-4 mb-8">
                <Brain className="h-12 w-12 text-purple-400" />
                <div>
                  <h2 className="text-3xl text-white">Reentry Readiness Score</h2>
                  <p className="text-white/60">AI-powered prediction of success (0-100)</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl text-white mb-4 flex items-center gap-2">
                    <Award className="h-5 w-5 text-[#A8F32C]" />
                    Employment Readiness (0-100)
                  </h3>
                  <ul className="space-y-2 text-white/70">
                    <li>• Resume quality and completeness</li>
                    <li>• Skills count and certifications</li>
                    <li>• Job search activity level</li>
                    <li>• Realistic salary expectations</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl text-white mb-4 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-400" />
                    Stability Score (0-100)
                  </h3>
                  <ul className="space-y-2 text-white/70">
                    <li>• Housing plan confirmed</li>
                    <li>• Transportation arranged</li>
                    <li>• Support network size</li>
                    <li>• Financial & healthcare plans</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl text-white mb-4 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-400" />
                    Behavioral Change Score (0-100)
                  </h3>
                  <ul className="space-y-2 text-white/70">
                    <li>• Positive habits adopted</li>
                    <li>• Consistency & streak data</li>
                    <li>• Self-awareness level</li>
                    <li>• Coping strategies learned</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl text-white mb-4 flex items-center gap-2">
                    <Users className="h-5 w-5 text-orange-400" />
                    Social/Emotional Score (0-100)
                  </h3>
                  <ul className="space-y-2 text-white/70">
                    <li>• Mentor engagement</li>
                    <li>• Family relationship status</li>
                    <li>• Community connections planned</li>
                    <li>• Emotional regulation (mood data)</li>
                  </ul>
                </div>
              </div>

              <div className="mt-10 pt-10 border-t border-purple-500/20">
                <div className="text-center">
                  <h3 className="text-2xl text-white mb-3">Recidivism Risk Score</h3>
                  <p className="text-white/70 mb-6">
                    0-100 score (lower is better) with risk category: <strong className="text-white">LOW / MEDIUM / HIGH</strong>
                  </p>
                  <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                    <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
                      <p className="text-green-400 mb-2">Protective Factors</p>
                      <p className="text-sm text-white/70">
                        "Strong family support", "job offer pending", "housing secured"
                      </p>
                    </div>
                    <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
                      <p className="text-red-400 mb-2">Risk Factors</p>
                      <p className="text-sm text-white/70">
                        "No driver's license", "limited work history", "high-crime release area"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Value Props by Audience */}
          <div className="mb-20">
            <h2 className="text-4xl text-white mb-12 text-center">Who Benefits</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white text-xl">For State Governments</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#A8F32C] mt-0.5 flex-shrink-0" />
                    <p className="text-white/70">Reduce recidivism by 66%</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#A8F32C] mt-0.5 flex-shrink-0" />
                    <p className="text-white/70">Save millions in incarceration costs</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#A8F32C] mt-0.5 flex-shrink-0" />
                    <p className="text-white/70">Meet DOJ/DOL grant requirements</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#A8F32C] mt-0.5 flex-shrink-0" />
                    <p className="text-white/70">Real-time intervention alerts</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#A8F32C] mt-0.5 flex-shrink-0" />
                    <p className="text-white/70">ROI of 183:1 proven</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white text-xl">For Facilities / DOC</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <p className="text-white/70">Works 100% offline (no WiFi needed)</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <p className="text-white/70">Minimal staff burden (&lt;30 min/week)</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <p className="text-white/70">Improves facility safety (engaged inmates)</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <p className="text-white/70">Proves rehab outcomes for accreditation</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <p className="text-white/70">No cost to facility (grant-funded)</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white text-xl">For Employers</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                    <p className="text-white/70">Pre-vetted candidates with scores</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                    <p className="text-white/70">Verified skills & certifications</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                    <p className="text-white/70">WOTC tax credits ($2,400-$9,600)</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                    <p className="text-white/70">Job-ready from day one</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                    <p className="text-white/70">Lower turnover (motivated workers)</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Pilot Results */}
          <div className="mb-20">
            <div className="bg-gradient-to-br from-[#A8F32C]/20 to-transparent border border-[#A8F32C]/30 rounded-3xl p-12">
              <h2 className="text-3xl text-white mb-8 text-center">Pilot Facility Results</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <p className="text-4xl text-[#A8F32C] mb-2">81%</p>
                  <p className="text-white">Adoption Rate</p>
                  <p className="text-sm text-white/60">Active users in facilities</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl text-[#A8F32C] mb-2">18 days</p>
                  <p className="text-white">Avg Time to Employment</p>
                  <p className="text-sm text-white/60">vs 45+ days national avg</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl text-[#A8F32C] mb-2">$16.50</p>
                  <p className="text-white">Avg Starting Wage</p>
                  <p className="text-sm text-white/60">vs $12 national average</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl text-[#A8F32C] mb-2">92%</p>
                  <p className="text-white">Check-In Rate</p>
                  <p className="text-sm text-white/60">Daily engagement</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-4xl text-white mb-6">Interested in FairPath Forward?</h2>
            <p className="text-xl text-white/70 mb-8 max-w-3xl mx-auto">
              State governments, facilities, and employers can learn more about implementing FairPath Forward.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button 
                size="lg" 
                className="bg-[#A8F32C] text-black hover:bg-[#8CD423] text-lg px-8 py-6 h-auto"
                onClick={() => onNavigate('contact')}
              >
                Request Information
                <Calendar className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-black text-lg px-8 py-6 h-auto"
                onClick={() => onNavigate('donate')}
              >
                <DollarSign className="mr-2 h-5 w-5" />
                Support Our Mission
              </Button>
            </div>
          </div>

        </div>
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}