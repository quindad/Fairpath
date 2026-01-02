import { useState } from 'react';
import { ArrowRight, Users, Building2, GraduationCap, Brain, TrendingUp, Clock, Award, Check, Play } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import FairPathLogo from '../common/FairPathLogo';
import Navigation from '../website/Navigation';
import Footer from '../website/Footer';

interface SimulationLandingProps {
  onNavigate: (page: string) => void;
}

export default function SimulationLanding({ onNavigate }: SimulationLandingProps) {
  const [selectedTab, setSelectedTab] = useState<'school' | 'corporate'>('school');

  const onStartSimulation = () => {
    // TODO: Wire to actual simulation when Tab 3 is integrated
    alert('Simulation starting soon! Tab 3 integration in progress.');
  };

  const onRequestDemo = () => {
    onNavigate('contact');
  };

  const schoolFeatures = [
    { icon: Clock, title: '30-Minute Experience', desc: 'Fits one class period perfectly' },
    { icon: Brain, title: 'AI-Powered Learning', desc: 'Personalized scenarios and outcomes' },
    { icon: GraduationCap, title: 'Auto-Grading', desc: 'Integrates with your LMS' },
    { icon: TrendingUp, title: 'Impact Tracking', desc: 'Measure empathy & attitude shifts' },
  ];

  const corporateFeatures = [
    { icon: Users, title: 'DEI Training', desc: 'Fair chance hiring education' },
    { icon: Building2, title: 'Scalable Delivery', desc: 'Web, mobile, or VR options' },
    { icon: Award, title: 'Certification', desc: 'Fair chance employer badge' },
    { icon: Clock, title: '1-Hour Session', desc: 'Fits lunch & learn format' },
  ];

  const stats = [
    { value: '68%', label: 'Unemployment Rate', sublabel: 'For formerly incarcerated' },
    { value: '50%', label: 'Return to Prison', sublabel: 'Within 3 years without support' },
    { value: '2.3M', label: 'Released Annually', sublabel: 'Need jobs & housing' },
    { value: '25%', label: 'Crime Reduction', sublabel: 'Schools using FairPath' },
  ];

  const testimonials = [
    {
      name: 'Principal Martinez',
      role: 'Lincoln High School',
      quote: 'Our suspension rate dropped 30% after implementing FairPath. Students gained real empathy.',
      image: '👨‍🏫',
    },
    {
      name: 'Sarah Johnson',
      role: 'HR Director, TechCorp',
      quote: 'This simulation changed how we think about hiring. We\'ve since hired 15 people with records - all stellar employees.',
      image: '👩‍💼',
    },
    {
      name: 'Dr. Williams',
      role: 'Juvenile Justice Researcher',
      quote: 'FairPath reduced youth arrests by 40% in pilot schools. This should be mandatory nationwide.',
      image: '👨‍🔬',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0a0a0a] to-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#A8F32C]/10 via-transparent to-[#7BC41A]/5"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-24">
          <div className="text-center mb-12">
            <Badge className="mb-6 bg-[#A8F32C]/10 text-[#A8F32C] border-[#A8F32C]/20">
              🎮 Immersive Reentry Simulation
            </Badge>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              Walk in Their Shoes.
              <br />
              <span className="text-[#A8F32C]">Change Your Mind.</span>
            </h1>
            
            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-12 leading-relaxed">
              An interactive 30-minute experience that puts students and employees in the shoes of someone 
              reentering society after incarceration. Feel the barriers. Understand the struggle. Build empathy.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={onStartSimulation}
                size="lg"
                className="bg-[#A8F32C] hover:bg-[#7BC41A] text-black font-bold text-lg px-8 py-6 rounded-xl"
              >
                <Play className="mr-2 h-5 w-5" />
                Try Free Demo (5 min)
              </Button>
              <Button
                onClick={onRequestDemo}
                size="lg"
                variant="outline"
                className="border-[#A8F32C]/30 hover:bg-[#A8F32C]/10 text-white font-bold text-lg px-8 py-6 rounded-xl"
              >
                Request Full Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Video/Screenshot Preview */}
          <div className="relative max-w-5xl mx-auto">
            <div className="aspect-video bg-gradient-to-br from-[#121212] to-black rounded-2xl border border-[#A8F32C]/20 flex items-center justify-center overflow-hidden">
              <div className="text-center p-12">
                <Play className="h-24 w-24 text-[#A8F32C] mx-auto mb-6 opacity-50" />
                <p className="text-white/60 text-lg">Preview Video Coming Soon</p>
                <p className="text-white/40 text-sm mt-2">Watch students experience the simulation</p>
              </div>
            </div>
            {/* Floating Stats Cards */}
            <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-4 px-4">
              <Card className="bg-black/80 backdrop-blur-lg border-[#A8F32C]/20 px-6 py-3">
                <p className="text-2xl font-bold text-[#A8F32C]">30 min</p>
                <p className="text-sm text-white/60">Experience</p>
              </Card>
              <Card className="bg-black/80 backdrop-blur-lg border-[#A8F32C]/20 px-6 py-3">
                <p className="text-2xl font-bold text-[#A8F32C]">6 Stations</p>
                <p className="text-sm text-white/60">Real Barriers</p>
              </Card>
              <Card className="bg-black/80 backdrop-blur-lg border-[#A8F32C]/20 px-6 py-3">
                <p className="text-2xl font-bold text-[#A8F32C]">AI-Powered</p>
                <p className="text-sm text-white/60">Personalized</p>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-24 bg-gradient-to-b from-transparent to-[#A8F32C]/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">The Reality We're Fighting</h2>
            <p className="text-white/60 text-lg">Real statistics from the U.S. criminal justice system</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-[#121212] border-[#A8F32C]/20 p-8 text-center hover:border-[#A8F32C]/40 transition-all">
                <div className="text-5xl font-bold text-[#A8F32C] mb-3">{stat.value}</div>
                <div className="text-white font-semibold mb-2">{stat.label}</div>
                <div className="text-white/50 text-sm">{stat.sublabel}</div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Selector */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center gap-4 mb-16">
            <Button
              onClick={() => setSelectedTab('school')}
              size="lg"
              className={`px-8 py-6 rounded-xl font-bold text-lg ${
                selectedTab === 'school'
                  ? 'bg-[#A8F32C] text-black'
                  : 'bg-[#121212] text-white/60 hover:bg-[#1a1a1a]'
              }`}
            >
              <GraduationCap className="mr-2 h-5 w-5" />
              For Schools
            </Button>
            <Button
              onClick={() => setSelectedTab('corporate')}
              size="lg"
              className={`px-8 py-6 rounded-xl font-bold text-lg ${
                selectedTab === 'corporate'
                  ? 'bg-[#A8F32C] text-black'
                  : 'bg-[#121212] text-white/60 hover:bg-[#1a1a1a]'
              }`}
            >
              <Building2 className="mr-2 h-5 w-5" />
              For Corporations
            </Button>
          </div>

          {/* School Tab */}
          {selectedTab === 'school' && (
            <div className="space-y-16">
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-4xl font-bold mb-6">Transform Your Classroom</h2>
                <p className="text-white/70 text-lg mb-8">
                  Give students an immersive 30-minute experience that builds empathy, 
                  reduces disciplinary issues, and teaches real-world consequences.
                  Works on Chromebooks, no phones needed.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Badge className="bg-[#A8F32C]/10 text-[#A8F32C] border-[#A8F32C]/20 px-4 py-2">
                    Middle School
                  </Badge>
                  <Badge className="bg-[#A8F32C]/10 text-[#A8F32C] border-[#A8F32C]/20 px-4 py-2">
                    High School
                  </Badge>
                  <Badge className="bg-[#A8F32C]/10 text-[#A8F32C] border-[#A8F32C]/20 px-4 py-2">
                    College
                  </Badge>
                  <Badge className="bg-[#A8F32C]/10 text-[#A8F32C] border-[#A8F32C]/20 px-4 py-2">
                    Chromebook Ready
                  </Badge>
                  <Badge className="bg-[#A8F32C]/10 text-[#A8F32C] border-[#A8F32C]/20 px-4 py-2">
                    LMS Integration
                  </Badge>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {schoolFeatures.map((feature, index) => (
                  <Card key={index} className="bg-[#121212] border-[#A8F32C]/20 p-6 hover:border-[#A8F32C]/40 transition-all">
                    <feature.icon className="h-12 w-12 text-[#A8F32C] mb-4" />
                    <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                    <p className="text-white/60">{feature.desc}</p>
                  </Card>
                ))}
              </div>

              {/* School Pricing */}
              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <Card className="bg-[#121212] border-[#A8F32C]/20 p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">Free Trial</h3>
                    <div className="text-4xl font-bold text-[#A8F32C] mb-2">$0</div>
                    <p className="text-white/60">5-minute demo</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">Limited simulation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">1 classroom (30 students)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">Basic analytics</span>
                    </li>
                  </ul>
                  <Button
                    onClick={onStartSimulation}
                    className="w-full bg-white/10 hover:bg-white/20 text-white"
                  >
                    Start Free Trial
                  </Button>
                </Card>

                <Card className="bg-gradient-to-b from-[#A8F32C]/20 to-[#7BC41A]/10 border-[#A8F32C] p-8 relative">
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#A8F32C] text-black">
                    Most Popular
                  </Badge>
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">District License</h3>
                    <div className="text-4xl font-bold text-[#A8F32C] mb-2">$15</div>
                    <p className="text-white/60">per student/year</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">Full 30-min simulation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">All AI features</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">Teacher dashboard</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">LMS integration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">8-week curriculum</span>
                    </li>
                  </ul>
                  <Button
                    onClick={onRequestDemo}
                    className="w-full bg-[#A8F32C] hover:bg-[#7BC41A] text-black font-bold"
                  >
                    Request Quote
                  </Button>
                </Card>

                <Card className="bg-[#121212] border-[#A8F32C]/20 p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">State Contract</h3>
                    <div className="text-4xl font-bold text-[#A8F32C] mb-2">Custom</div>
                    <p className="text-white/60">$1M-5M/year</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">All district features</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">White-label branding</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">Dedicated support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">Impact studies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">Policy reporting</span>
                    </li>
                  </ul>
                  <Button
                    onClick={onRequestDemo}
                    className="w-full bg-white/10 hover:bg-white/20 text-white"
                  >
                    Contact Sales
                  </Button>
                </Card>
              </div>
            </div>
          )}

          {/* Corporate Tab */}
          {selectedTab === 'corporate' && (
            <div className="space-y-16">
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-4xl font-bold mb-6">Build an Inclusive Workforce</h2>
                <p className="text-white/70 text-lg mb-8">
                  Give employees a powerful 1-hour experience that transforms attitudes about 
                  fair chance hiring. Build empathy, reduce bias, and unlock untapped talent.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Badge className="bg-[#A8F32C]/10 text-[#A8F32C] border-[#A8F32C]/20 px-4 py-2">
                    DEI Training
                  </Badge>
                  <Badge className="bg-[#A8F32C]/10 text-[#A8F32C] border-[#A8F32C]/20 px-4 py-2">
                    HR Compliance
                  </Badge>
                  <Badge className="bg-[#A8F32C]/10 text-[#A8F32C] border-[#A8F32C]/20 px-4 py-2">
                    ESG Goals
                  </Badge>
                  <Badge className="bg-[#A8F32C]/10 text-[#A8F32C] border-[#A8F32C]/20 px-4 py-2">
                    WOTC Credits
                  </Badge>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {corporateFeatures.map((feature, index) => (
                  <Card key={index} className="bg-[#121212] border-[#A8F32C]/20 p-6 hover:border-[#A8F32C]/40 transition-all">
                    <feature.icon className="h-12 w-12 text-[#A8F32C] mb-4" />
                    <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                    <p className="text-white/60">{feature.desc}</p>
                  </Card>
                ))}
              </div>

              {/* Corporate Pricing */}
              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <Card className="bg-[#121212] border-[#A8F32C]/20 p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">Small Team</h3>
                    <div className="text-4xl font-bold text-[#A8F32C] mb-2">$50</div>
                    <p className="text-white/60">per employee</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">1-hour simulation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">Up to 50 employees</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">Completion tracking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">Certificates</span>
                    </li>
                  </ul>
                  <Button
                    onClick={onRequestDemo}
                    className="w-full bg-white/10 hover:bg-white/20 text-white"
                  >
                    Get Started
                  </Button>
                </Card>

                <Card className="bg-gradient-to-b from-[#A8F32C]/20 to-[#7BC41A]/10 border-[#A8F32C] p-8 relative">
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#A8F32C] text-black">
                    Most Popular
                  </Badge>
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                    <div className="text-4xl font-bold text-[#A8F32C] mb-2">$35</div>
                    <p className="text-white/60">per employee</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">All small team features</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">Unlimited employees</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">Admin dashboard</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">AI-powered features</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">Fair chance badge</span>
                    </li>
                  </ul>
                  <Button
                    onClick={onRequestDemo}
                    className="w-full bg-[#A8F32C] hover:bg-[#7BC41A] text-black font-bold"
                  >
                    Request Demo
                  </Button>
                </Card>

                <Card className="bg-[#121212] border-[#A8F32C]/20 p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">Premium VR</h3>
                    <div className="text-4xl font-bold text-[#A8F32C] mb-2">$200</div>
                    <p className="text-white/60">per employee</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">All enterprise features</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">VR headset included</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">On-site facilitator</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">2-hour deep dive</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">White-label option</span>
                    </li>
                  </ul>
                  <Button
                    onClick={onRequestDemo}
                    className="w-full bg-white/10 hover:bg-white/20 text-white"
                  >
                    Contact Sales
                  </Button>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-24 bg-gradient-to-b from-[#A8F32C]/5 to-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Trusted by Leaders Nationwide</h2>
            <p className="text-white/60 text-lg">See what educators and employers are saying</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-[#121212] border-[#A8F32C]/20 p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-5xl">{testimonial.image}</div>
                  <div>
                    <div className="font-bold">{testimonial.name}</div>
                    <div className="text-white/60 text-sm">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-white/80 italic">"{testimonial.quote}"</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-6">
            Ready to Create Real Change?
          </h2>
          <p className="text-xl text-white/70 mb-12">
            Join hundreds of schools and companies building a more inclusive future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onStartSimulation}
              size="lg"
              className="bg-[#A8F32C] hover:bg-[#7BC41A] text-black font-bold text-lg px-12 py-6 rounded-xl"
            >
              <Play className="mr-2 h-5 w-5" />
              Start Free Trial
            </Button>
            <Button
              onClick={onRequestDemo}
              size="lg"
              variant="outline"
              className="border-[#A8F32C]/30 hover:bg-[#A8F32C]/10 text-white font-bold text-lg px-12 py-6 rounded-xl"
            >
              Schedule Demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation and Footer */}
      <Navigation onNavigate={onNavigate} currentPage="simulation" />
      <Footer onNavigate={onNavigate} />
    </div>
  );
}