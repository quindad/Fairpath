import { Target, Heart, Users, TrendingUp, Award, Shield, Zap, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import Navigation from './Navigation';
import Footer from './Footer';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export default function AboutPage({ onNavigate }: AboutPageProps) {
  const values = [
    {
      icon: Heart,
      title: 'Compassion',
      description: 'Every person deserves a second chance and the support to rebuild their life.',
    },
    {
      icon: Shield,
      title: 'Integrity',
      description: 'We operate with transparency, honesty, and accountability in everything we do.',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building connections between justice-impacted individuals, employers, and supporters.',
    },
    {
      icon: TrendingUp,
      title: 'Impact',
      description: 'Data-driven solutions that create measurable, lasting change in people\'s lives.',
    },
  ];

  const timeline = [
    {
      year: '2020',
      title: 'Friend A Felon Founded',
      description: 'Started as a grassroots initiative to connect justice-impacted individuals with resources.',
    },
    {
      year: '2021',
      title: '1,000 Users Milestone',
      description: 'Reached our first thousand users and expanded to 5 states.',
    },
    {
      year: '2022',
      title: 'FastTrack Launched',
      description: 'Introduced the revolutionary 48-hour housing application guarantee.',
    },
    {
      year: '2023',
      title: 'Acquired by FairPath Industries',
      description: 'Partnered with FairPath to scale nationwide and serve 20,000+ individuals.',
    },
    {
      year: '2024',
      title: 'Full Platform Integration',
      description: '5-sided ecosystem connecting felons, employers, landlords, donors, and service providers.',
    },
  ];

  const team = [
    {
      name: 'Sterling Williams',
      role: 'Founder & CEO',
      image: '👨🏾‍💼',
      bio: 'Justice-impacted entrepreneur on a mission to transform reentry.',
    },
    {
      name: 'Sarah Martinez',
      role: 'Head of Operations',
      image: '👩',
      bio: '15 years experience in social services and nonprofit management.',
    },
    {
      name: 'David Chen',
      role: 'Head of Employer Relations',
      image: '👨',
      bio: 'Former HR executive helping companies build inclusive workforces.',
    },
    {
      name: 'Lisa Johnson',
      role: 'Head of Housing',
      image: '👩🏾',
      bio: 'Real estate professional passionate about housing equality.',
    },
  ];

  const stats = [
    { number: '20,000+', label: 'Lives Changed' },
    { number: '5,000+', label: 'Jobs Placed' },
    { number: '2,500+', label: 'Homes Found' },
    { number: '92%', label: 'Success Rate' },
    { number: '$5M+', label: 'Revenue Generated' },
    { number: '15%', label: 'Recidivism Rate' },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation onNavigate={onNavigate} currentPage="about" />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30 text-sm px-4 py-2">
            About FairPath Industries
          </Badge>
          <h1 className="text-6xl lg:text-7xl mb-6">
            We're Building a <span className="text-[#A8F32C]">Fairer</span> Future
          </h1>
          <p className="text-xl text-white/70 max-w-4xl mx-auto leading-relaxed">
            FairPath Industries (formerly Friend A Felon) is revolutionizing reentry with a comprehensive 
            5-sided ecosystem that connects justice-impacted individuals with jobs, housing, resources, 
            and community support.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="bg-gradient-to-br from-[#A8F32C]/20 to-transparent border-[#A8F32C]/30 p-12">
              <Target className="h-16 w-16 text-[#A8F32C] mb-6" />
              <h2 className="text-4xl mb-4">Our Mission</h2>
              <p className="text-xl text-white/80 leading-relaxed">
                To break down systemic barriers and empower justice-impacted individuals to rebuild 
                their lives through access to employment, housing, and community support.
              </p>
            </Card>

            <Card className="bg-gradient-to-br from-blue-500/20 to-transparent border-blue-500/30 p-12">
              <Award className="h-16 w-16 text-blue-400 mb-6" />
              <h2 className="text-4xl mb-4">Our Vision</h2>
              <p className="text-xl text-white/80 leading-relaxed">
                A world where everyone has the opportunity to succeed, regardless of their past. 
                Where second chances are the norm, not the exception.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl mb-6">The Problem We're Solving</h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Every year, 2.3 million people are released from incarceration. Without proper support, 
              68% return within 3 years.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-red-500/10 border-red-500/30 p-8">
              <div className="text-5xl mb-4 text-red-400">68%</div>
              <div className="text-xl mb-2">Recidivism Rate</div>
              <p className="text-white/60">
                Without access to jobs and housing, most return to incarceration
              </p>
            </Card>

            <Card className="bg-orange-500/10 border-orange-500/30 p-8">
              <div className="text-5xl mb-4 text-orange-400">$182B</div>
              <div className="text-xl mb-2">Annual Cost</div>
              <p className="text-white/60">
                Mass incarceration costs taxpayers billions every year
              </p>
            </Card>

            <Card className="bg-yellow-500/10 border-yellow-500/30 p-8">
              <div className="text-5xl mb-4 text-yellow-400">2.3M</div>
              <div className="text-xl mb-2">Released Annually</div>
              <p className="text-white/60">
                Millions face barriers to employment and housing
              </p>
            </Card>
          </div>

          <div className="text-center mt-12">
            <h3 className="text-3xl mb-4 text-[#A8F32C]">But With FairPath Support...</h3>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div>
                <div className="text-5xl mb-2 text-[#A8F32C]">15%</div>
                <div className="text-white/60">Recidivism Rate</div>
              </div>
              <div>
                <div className="text-5xl mb-2 text-[#A8F32C]">92%</div>
                <div className="text-white/60">Success Rate</div>
              </div>
              <div>
                <div className="text-5xl mb-2 text-[#A8F32C]">3 Weeks</div>
                <div className="text-white/60">Avg. Time to Housing</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl mb-4">Our Values</h2>
            <p className="text-xl text-white/60">
              These principles guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="bg-[#121212] border-white/10 p-8 text-center hover:border-[#A8F32C]/50 transition-all group">
                <div className="h-16 w-16 rounded-full bg-[#A8F32C]/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <value.icon className="h-8 w-8 text-[#A8F32C]" />
                </div>
                <h3 className="text-2xl mb-3">{value.title}</h3>
                <p className="text-white/60">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl mb-4">Our Journey</h2>
            <p className="text-xl text-white/60">
              From grassroots initiative to national platform
            </p>
          </div>

          <div className="space-y-8">
            {timeline.map((item, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-full bg-[#A8F32C]/20 border-2 border-[#A8F32C] flex items-center justify-center">
                    <span className="text-xl font-bold text-[#A8F32C]">{item.year}</span>
                  </div>
                </div>
                <Card className="flex-1 bg-[#121212] border-white/10 p-6 hover:border-[#A8F32C]/50 transition-all">
                  <h3 className="text-2xl mb-2">{item.title}</h3>
                  <p className="text-white/60">{item.description}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl mb-4">Meet Our Team</h2>
            <p className="text-xl text-white/60">
              Dedicated professionals committed to creating change
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="bg-[#121212] border-white/10 p-8 text-center hover:border-[#A8F32C]/50 transition-all">
                <div className="text-6xl mb-4">{member.image}</div>
                <h3 className="text-xl mb-1">{member.name}</h3>
                <div className="text-[#A8F32C] mb-3">{member.role}</div>
                <p className="text-sm text-white/60">{member.bio}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl mb-4">Our Impact in Numbers</h2>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-gradient-to-br from-white/5 to-transparent border-white/10 p-6 text-center">
                <div className="text-4xl mb-2 text-[#A8F32C]">{stat.number}</div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#A8F32C]/20 to-transparent border-y border-[#A8F32C]/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl mb-6">Join Us in Creating Change</h2>
          <p className="text-xl text-white/70 mb-8">
            Whether you're seeking support or want to help others, there's a place for you at FairPath
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              size="lg"
              className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90 text-lg px-8 py-6"
              onClick={() => onNavigate('signup')}
            >
              Get Started
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/5 text-lg px-8 py-6"
              onClick={() => onNavigate('contact')}
            >
              Partner With Us
            </Button>
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
