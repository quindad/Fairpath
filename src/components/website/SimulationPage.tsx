import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  GraduationCap, Building2, Smartphone, Target, Users, Heart,
  CheckCircle, TrendingUp, Clock, Star, Award, BarChart3, Brain, Eye
} from 'lucide-react';
import Navigation from './Navigation';
import Footer from './Footer';

interface SimulationPageProps {
  onNavigate: (page: string) => void;
}

export default function SimulationPage({ onNavigate }: SimulationPageProps) {
  return (
    <div className="min-h-screen bg-black">
      <Navigation onNavigate={onNavigate} currentPage="simulation" />

      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-orange-500/20 text-orange-400 border-orange-500/30 text-sm px-4 py-2">
              Beta - 140 Schools & 65 Companies
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Reentry Simulation
              <br />
              <span className="text-orange-400">Education Through Experience</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              Immersive technology that teaches empathy, breaks down stigma, and prevents bias by letting people experience 
              the reality of reentry after incarceration.
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-orange-500 text-white hover:bg-orange-600 text-lg px-8 py-6 h-auto"
                onClick={() => onNavigate('contact')}
              >
                Book a Demo
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-black text-lg px-8 py-6 h-auto"
                onClick={() => onNavigate('signup')}
              >
                Try It Free
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-20">
            <div className="bg-gradient-to-br from-orange-500/20 to-transparent p-6 rounded-lg border border-orange-500/30">
              <p className="text-4xl font-bold text-orange-400 mb-2">140</p>
              <p className="text-white font-semibold">Schools</p>
              <p className="text-sm text-gray-400">Using the simulation</p>
            </div>
            <div className="bg-gradient-to-br from-blue-500/20 to-transparent p-6 rounded-lg border border-blue-500/30">
              <p className="text-4xl font-bold text-blue-400 mb-2">65</p>
              <p className="text-white font-semibold">Companies</p>
              <p className="text-sm text-gray-400">Corporate training programs</p>
            </div>
            <div className="bg-gradient-to-br from-[#A8F32C]/20 to-transparent p-6 rounded-lg border border-[#A8F32C]/30">
              <p className="text-4xl font-bold text-[#A8F32C] mb-2">78,000+</p>
              <p className="text-white font-semibold">Participants</p>
              <p className="text-sm text-gray-400">Have completed it</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/20 to-transparent p-6 rounded-lg border border-purple-500/30">
              <p className="text-4xl font-bold text-purple-400 mb-2">94%</p>
              <p className="text-white font-semibold">Would Recommend</p>
              <p className="text-sm text-gray-400">Life-changing experience</p>
            </div>
          </div>

          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">What Is The Reentry Simulation?</h2>
              <p className="text-xl text-gray-400">Walk in someone else's shoes for 90 minutes</p>
            </div>

            <div className="bg-gradient-to-r from-orange-500/20 to-transparent p-12 rounded-2xl border border-orange-500/30 mb-12">
              <p className="text-xl text-gray-300 mb-6">
                Participants are assigned a character—someone recently released from prison. Over 90 minutes, they navigate 
                the same impossible choices real people face every day:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-orange-400 mt-1" />
                    <p className="text-white">Find a job when "check the box" excludes you from 80% of positions</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-orange-400 mt-1" />
                    <p className="text-white">Secure housing when landlords reject you based on your record</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-orange-400 mt-1" />
                    <p className="text-white">Budget $200/week while paying for transportation, food, parole fees</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-orange-400 mt-1" />
                    <p className="text-white">Navigate parole requirements, drug tests, and surprise check-ins</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-orange-400 mt-1" />
                    <p className="text-white">Rebuild family relationships while surviving day-to-day</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-orange-400 mt-1" />
                    <p className="text-white">Make choices when every option feels impossible</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-gray-900 border-gray-800 hover:border-orange-500 transition-all">
                <CardHeader>
                  <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-4">
                    <Smartphone className="h-6 w-6 text-orange-400" />
                  </div>
                  <CardTitle className="text-white text-2xl">Mobile Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-4">
                    Runs on phones, tablets, laptops. No installation required. Perfect for classrooms and corporate training.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-white/70">
                      <CheckCircle className="h-4 w-4 text-orange-400" />
                      Works on any device
                    </div>
                    <div className="flex items-center gap-2 text-white/70">
                      <CheckCircle className="h-4 w-4 text-orange-400" />
                      90-minute experience
                    </div>
                    <div className="flex items-center gap-2 text-white/70">
                      <CheckCircle className="h-4 w-4 text-orange-400" />
                      Self-paced or guided
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800 hover:border-blue-500 transition-all">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                    <Brain className="h-6 w-6 text-blue-400" />
                  </div>
                  <CardTitle className="text-white text-2xl">Real Decisions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-4">
                    Based on 1,200+ interviews with formerly incarcerated people. Every scenario is real. Every choice matters.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-white/70">
                      <CheckCircle className="h-4 w-4 text-blue-400" />
                      Research-backed scenarios
                    </div>
                    <div className="flex items-center gap-2 text-white/70">
                      <CheckCircle className="h-4 w-4 text-blue-400" />
                      Multiple story paths
                    </div>
                    <div className="flex items-center gap-2 text-white/70">
                      <CheckCircle className="h-4 w-4 text-blue-400" />
                      Realistic outcomes
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800 hover:border-[#A8F32C] transition-all">
                <CardHeader>
                  <div className="w-12 h-12 bg-[#A8F32C]/10 rounded-lg flex items-center justify-center mb-4">
                    <BarChart3 className="h-6 w-6 text-[#A8F32C]" />
                  </div>
                  <CardTitle className="text-white text-2xl">Impact Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-4">
                    Measure attitude shifts, empathy growth, and policy support. Before and after assessments included.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-white/70">
                      <CheckCircle className="h-4 w-4 text-[#A8F32C]" />
                      Pre/post surveys
                    </div>
                    <div className="flex items-center gap-2 text-white/70">
                      <CheckCircle className="h-4 w-4 text-[#A8F32C]" />
                      Analytics dashboard
                    </div>
                    <div className="flex items-center gap-2 text-white/70">
                      <CheckCircle className="h-4 w-4 text-[#A8F32C]" />
                      Group reports
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Who Uses The Simulation?</h2>
              <p className="text-xl text-gray-400">Education and prevention across sectors</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                    <GraduationCap className="h-6 w-6 text-blue-400" />
                  </div>
                  <CardTitle className="text-white text-2xl">Schools & Universities</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-6">
                    140 schools use the simulation in criminal justice, sociology, social work, and law programs. 
                    Students graduate with real understanding, not just theory.
                  </p>
                  <div className="space-y-3">
                    <div className="bg-blue-500/10 p-4 rounded border border-blue-500/30">
                      <p className="text-2xl font-bold text-blue-400 mb-1">88%</p>
                      <p className="text-sm text-white/80">Of students report changed views on criminal justice reform</p>
                    </div>
                    <div className="bg-blue-500/10 p-4 rounded border border-blue-500/30">
                      <p className="text-2xl font-bold text-blue-400 mb-1">92%</p>
                      <p className="text-sm text-white/80">Say they better understand barriers to reentry</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-4">
                    <Building2 className="h-6 w-6 text-orange-400" />
                  </div>
                  <CardTitle className="text-white text-2xl">Corporate Training</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-6">
                    65 companies use it for DEI training, fair chance hiring education, and bias reduction. 
                    Better hiring decisions start with better understanding.
                  </p>
                  <div className="space-y-3">
                    <div className="bg-orange-500/10 p-4 rounded border border-orange-500/30">
                      <p className="text-2xl font-bold text-orange-400 mb-1">76%</p>
                      <p className="text-sm text-white/80">Of HR teams report reduced hiring bias after the simulation</p>
                    </div>
                    <div className="bg-orange-500/10 p-4 rounded border border-orange-500/30">
                      <p className="text-2xl font-bold text-orange-400 mb-1">3.2x</p>
                      <p className="text-sm text-white/80">Increase in fair chance hires after implementation</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#A8F32C]/20 to-transparent p-12 rounded-2xl border border-[#A8F32C]/30 mb-20">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Prevention Through Education</h2>
            <p className="text-lg text-gray-300 mb-8 text-center max-w-3xl mx-auto">
              The simulation doesn't just teach empathy—it prevents discrimination and changes hiring practices. 
              When people understand the barriers, they're more likely to remove them.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-black/50 p-6 rounded-lg">
                <p className="text-3xl font-bold text-orange-400 mb-2">88%</p>
                <p className="text-white font-semibold mb-2">Support Policy Change</p>
                <p className="text-sm text-gray-400">After experiencing the simulation</p>
              </div>
              <div className="bg-black/50 p-6 rounded-lg">
                <p className="text-3xl font-bold text-orange-400 mb-2">76%</p>
                <p className="text-white font-semibold mb-2">Reduce Hiring Bias</p>
                <p className="text-sm text-gray-400">Companies using the simulation</p>
              </div>
              <div className="bg-black/50 p-6 rounded-lg">
                <p className="text-3xl font-bold text-orange-400 mb-2">3.2x</p>
                <p className="text-white font-semibold mb-2">More Fair Chance Hires</p>
                <p className="text-sm text-gray-400">In the year following training</p>
              </div>
            </div>
          </div>

          <div className="mb-20">
            <h2 className="text-4xl font-bold text-white mb-8 text-center">What People Are Saying</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[1,2,3,4,5].map(i => <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />)}
                  </div>
                  <p className="text-white mb-4">
                    "I've taught criminal justice for 15 years. This simulation did more in 90 minutes than 
                    a semester of lectures. My students were transformed."
                  </p>
                  <p className="text-gray-400 font-semibold">Professor, UC Berkeley</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[1,2,3,4,5].map(i => <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />)}
                  </div>
                  <p className="text-white mb-4">
                    "We now use this for all new manager training. It completely changed how our teams think 
                    about fair chance hiring. Best DEI investment we've made."
                  </p>
                  <p className="text-gray-400 font-semibold">HR Director, Fortune 500</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[1,2,3,4,5].map(i => <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />)}
                  </div>
                  <p className="text-white mb-4">
                    "I thought I understood the system. I was wrong. This simulation opened my eyes to barriers 
                    I never even considered. Everyone should do this."
                  </p>
                  <p className="text-gray-400 font-semibold">Student, Columbia University</p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Understanding?</h2>
            <p className="text-xl text-gray-400 mb-8">
              Bring the Reentry Simulation to your school or company. 90 minutes that change perspectives forever.
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-orange-500 text-white hover:bg-orange-600 text-lg px-8 py-6 h-auto"
                onClick={() => onNavigate('contact')}
              >
                Schedule a Demo
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-black text-lg px-8 py-6 h-auto"
                onClick={() => onNavigate('signup')}
              >
                Try It Free
              </Button>
            </div>
          </div>

        </div>
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
