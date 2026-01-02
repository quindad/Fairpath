import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  Gamepad2, Users, GraduationCap, Heart, CheckCircle, 
  TrendingUp, Target, Lightbulb, Award, DollarSign, Brain
} from 'lucide-react';
import Navigation from './Navigation';
import Footer from './Footer';

interface SimulationsPageProps {
  onNavigate: (page: string) => void;
}

export default function SimulationsPage({ onNavigate }: SimulationsPageProps) {
  return (
    <div className="min-h-screen bg-black">
      <Navigation onNavigate={onNavigate} currentPage="service-simulations" />

      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Hero Section */}
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-red-500/20 text-red-400 border-red-500/30 text-sm px-4 py-2">
              Empathy Through Experience
            </Badge>
            <h1 className="text-5xl md:text-7xl mb-6 leading-tight">
              FairPath Simulations
              <br />
              <span className="text-red-400">Walk a Mile in Their Shoes</span>
            </h1>
            <p className="text-2xl text-white/80 max-w-4xl mx-auto mb-4">
              Interactive reentry simulation that teaches employers, educators, and the public what 
              it's really like to rebuild life after incarceration.
            </p>
            <p className="text-lg text-white/60 max-w-3xl mx-auto mb-12">
              Make 30 real decisions in 30 simulated days. Experience the impossible choices that lead 50% 
              of people back to prison.
            </p>
            
            <div className="flex gap-4 justify-center flex-wrap">
              <Button 
                size="lg" 
                className="bg-[#A8F32C] text-black hover:bg-[#8CD423] text-lg px-8 py-6 h-auto"
                onClick={() => onNavigate('signup')}
              >
                Try the Simulation
                <Gamepad2 className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-black text-lg px-8 py-6 h-auto"
                onClick={() => onNavigate('contact')}
              >
                For Organizations
              </Button>
            </div>
          </div>

          {/* What Is It */}
          <div className="mb-20">
            <div className="bg-gradient-to-br from-[#A8F32C]/20 to-transparent border border-[#A8F32C]/30 rounded-3xl p-12">
              <div className="flex items-center gap-4 mb-8">
                <Gamepad2 className="h-12 w-12 text-[#A8F32C]" />
                <div>
                  <h2 className="text-3xl text-white">What is FairPath Simulations?</h2>
                  <p className="text-white/60">An interactive game that builds empathy through experience</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-white/90 mb-6">
                    You play as someone just released from prison. You have <strong className="text-white">$47</strong> in your pocket, 
                    no phone, no transportation, and a criminal record that shows up on every background check.
                  </p>
                  <p className="text-white/90 mb-6">
                    Over 30 simulated days, you make impossible choices: Do you spend your last $20 on bus fare to a 
                    job interview or food for the week? Do you lie about your record to get housing? Do you ask family 
                    for money even though they're struggling too?
                  </p>
                  <p className="text-white/90">
                    <strong className="text-[#A8F32C]">Every decision has consequences.</strong> Just like real life.
                  </p>
                </div>

                <div className="bg-black/30 rounded-xl p-6">
                  <h3 className="text-xl text-white mb-4">Real Scenarios You'll Face:</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#A8F32C] mt-1 flex-shrink-0" />
                      <p className="text-white/70">Getting rejected from 15 jobs before anyone will interview you</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#A8F32C] mt-1 flex-shrink-0" />
                      <p className="text-white/70">Choosing between probation fees and rent</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#A8F32C] mt-1 flex-shrink-0" />
                      <p className="text-white/70">Landlords hanging up when you mention your record</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#A8F32C] mt-1 flex-shrink-0" />
                      <p className="text-white/70">Old friends offering quick money (illegally)</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#A8F32C] mt-1 flex-shrink-0" />
                      <p className="text-white/70">Navigating probation requirements while working full-time</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#A8F32C] mt-1 flex-shrink-0" />
                      <p className="text-white/70">Family relationships strained by years of absence</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-[#A8F32C]/20">
                <p className="text-center text-white/70 text-lg">
                  <strong className="text-white">Based on real stories</strong> from 100+ people who've lived through reentry. 
                  Every scenario, every struggle, every impossible choice is authentic.
                </p>
              </div>
            </div>
          </div>

          {/* Who It's For */}
          <div className="mb-20">
            <h2 className="text-4xl text-white mb-12 text-center">Who Is This For?</h2>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <div className="w-12 h-12 bg-[#A8F32C]/10 rounded-lg flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-[#A8F32C]" />
                  </div>
                  <CardTitle className="text-white text-xl">Employers & HR Teams</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 mb-4">
                    Understand why formerly incarcerated candidates might have resume gaps, lack references, 
                    or struggle with traditional interview questions.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-[#A8F32C]" />
                      <p className="text-white/70 text-sm">Diversity & inclusion training</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-[#A8F32C]" />
                      <p className="text-white/70 text-sm">Fair chance hiring education</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-[#A8F32C]" />
                      <p className="text-white/70 text-sm">Team empathy building</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                    <GraduationCap className="h-6 w-6 text-blue-400" />
                  </div>
                  <CardTitle className="text-white text-xl">Educators & Students</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 mb-4">
                    Perfect for criminal justice courses, social work programs, or high school civics classes. 
                    Teaches systemic barriers through lived experience.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-400" />
                      <p className="text-white/70 text-sm">Criminal justice curriculum</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-400" />
                      <p className="text-white/70 text-sm">Social work training</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-400" />
                      <p className="text-white/70 text-sm">High school civics lessons</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
                    <Heart className="h-6 w-6 text-purple-400" />
                  </div>
                  <CardTitle className="text-white text-xl">General Public</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 mb-4">
                    Anyone who wants to understand why recidivism is so high and what it really takes to 
                    "just get a job and move on."
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-400" />
                      <p className="text-white/70 text-sm">Build empathy & awareness</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-400" />
                      <p className="text-white/70 text-sm">Challenge assumptions</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-400" />
                      <p className="text-white/70 text-sm">Understand systemic barriers</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* What You'll Learn */}
          <div className="mb-20">
            <div className="bg-gradient-to-br from-blue-500/20 to-transparent border border-blue-500/30 rounded-3xl p-12">
              <h2 className="text-3xl text-white mb-8 text-center">What You'll Learn</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-black/30 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Brain className="h-8 w-8 text-blue-400" />
                    <h3 className="text-xl text-white">The Impossible Catch-22s</h3>
                  </div>
                  <ul className="space-y-2 text-white/70">
                    <li>• Need a job to afford housing, but need an address to get a job</li>
                    <li>• Need transportation to get to work, but can't afford a car without income</li>
                    <li>• Need references for jobs, but everyone you know has a record too</li>
                    <li>• Need to pay probation fees, but employers won't hire with probation</li>
                  </ul>
                </div>

                <div className="bg-black/30 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Target className="h-8 w-8 text-purple-400" />
                    <h3 className="text-xl text-white">The Hidden Barriers</h3>
                  </div>
                  <ul className="space-y-2 text-white/70">
                    <li>• Background checks that show arrests, not just convictions</li>
                    <li>• Landlords who legally discriminate based on criminal history</li>
                    <li>• Professional licenses denied automatically for certain convictions</li>
                    <li>• Family relationships destroyed by years of absence</li>
                  </ul>
                </div>

                <div className="bg-black/30 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <DollarSign className="h-8 w-8 text-green-400" />
                    <h3 className="text-xl text-white">The Financial Reality</h3>
                  </div>
                  <ul className="space-y-2 text-white/70">
                    <li>• Released with $47 average gate money</li>
                    <li>• $300+ monthly probation/parole fees immediately due</li>
                    <li>• First month's rent + deposit = $2,000+ needed upfront</li>
                    <li>• Entry-level wages barely cover survival expenses</li>
                  </ul>
                </div>

                <div className="bg-black/30 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Heart className="h-8 w-8 text-red-400" />
                    <h3 className="text-xl text-white">The Emotional Toll</h3>
                  </div>
                  <ul className="space-y-2 text-white/70">
                    <li>• Constant rejection from jobs, housing, services</li>
                    <li>• Shame of relying on family already stretched thin</li>
                    <li>• Anxiety about one mistake sending you back</li>
                    <li>• Depression from feeling like society gave up on you</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Impact */}
          <div className="mb-20">
            <h2 className="text-4xl text-white mb-12 text-center">Measured Impact</h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-[#A8F32C]/20 to-transparent border border-[#A8F32C]/30 rounded-2xl p-8 text-center">
                <TrendingUp className="h-12 w-12 text-[#A8F32C] mx-auto mb-4" />
                <p className="text-5xl text-white mb-3">87%</p>
                <p className="text-xl text-white mb-2">Changed Perspective</p>
                <p className="text-white/60">Said simulation changed how they view reentry</p>
              </div>

              <div className="bg-gradient-to-br from-blue-500/20 to-transparent border border-blue-500/30 rounded-2xl p-8 text-center">
                <Award className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <p className="text-5xl text-white mb-3">64%</p>
                <p className="text-xl text-white mb-2">Increased Empathy</p>
                <p className="text-white/60">Reported greater empathy for justice-impacted people</p>
              </div>

              <div className="bg-gradient-to-br from-purple-500/20 to-transparent border border-purple-500/30 rounded-2xl p-8 text-center">
                <Lightbulb className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <p className="text-5xl text-white mb-3">92%</p>
                <p className="text-xl text-white mb-2">Would Recommend</p>
                <p className="text-white/60">Said others should experience the simulation</p>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="mb-20">
            <h2 className="text-4xl text-white mb-12 text-center">Pricing</h2>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white text-center">Individual</CardTitle>
                  <p className="text-center text-4xl text-[#A8F32C] mt-4">Free</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-[#A8F32C]" />
                    <p className="text-white/70">Full simulation access</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-[#A8F32C]" />
                    <p className="text-white/70">Track your decisions</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-[#A8F32C]" />
                    <p className="text-white/70">See your outcome</p>
                  </div>
                  <Button 
                    className="w-full mt-6 bg-[#A8F32C] text-black hover:bg-[#8CD423]"
                    onClick={() => onNavigate('signup')}
                  >
                    Start Free
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-[#A8F32C] border-2">
                <CardHeader>
                  <Badge className="mb-2 bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30 w-fit">Most Popular</Badge>
                  <CardTitle className="text-white text-center">Organizations</CardTitle>
                  <p className="text-center text-4xl text-[#A8F32C] mt-4">$299/mo</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-[#A8F32C]" />
                    <p className="text-white/70">Unlimited team access</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-[#A8F32C]" />
                    <p className="text-white/70">Group analytics dashboard</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-[#A8F32C]" />
                    <p className="text-white/70">Facilitator guide included</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-[#A8F32C]" />
                    <p className="text-white/70">Custom branding option</p>
                  </div>
                  <Button 
                    className="w-full mt-6 bg-[#A8F32C] text-black hover:bg-[#8CD423]"
                    onClick={() => onNavigate('contact')}
                  >
                    Contact Sales
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white text-center">Education</CardTitle>
                  <p className="text-center text-4xl text-[#A8F32C] mt-4">Custom</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-[#A8F32C]" />
                    <p className="text-white/70">Multi-class licensing</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-[#A8F32C]" />
                    <p className="text-white/70">Curriculum integration</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-[#A8F32C]" />
                    <p className="text-white/70">Instructor training</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-[#A8F32C]" />
                    <p className="text-white/70">Assessment tools</p>
                  </div>
                  <Button 
                    className="w-full mt-6 border-white text-white hover:bg-white hover:text-black"
                    variant="outline"
                    onClick={() => onNavigate('contact')}
                  >
                    Get Quote
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-4xl text-white mb-6">Experience Reentry for Yourself</h2>
            <p className="text-xl text-white/70 mb-8 max-w-3xl mx-auto">
              Walk a mile in their shoes. Understand why 50% go back. See what it really takes to rebuild a life.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button 
                size="lg" 
                className="bg-[#A8F32C] text-black hover:bg-[#8CD423] text-lg px-8 py-6 h-auto"
                onClick={() => onNavigate('signup')}
              >
                Start the Simulation
                <Gamepad2 className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-black text-lg px-8 py-6 h-auto"
                onClick={() => onNavigate('contact')}
              >
                For Organizations
              </Button>
            </div>
          </div>

        </div>
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}