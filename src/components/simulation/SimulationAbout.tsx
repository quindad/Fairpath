import { Target, Users, Brain, TrendingUp, Award, Shield, Zap, Heart, Building2, GraduationCap, Briefcase, Globe } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import FairPathLogo from '../common/FairPathLogo';
import Navigation from '../website/Navigation';
import Footer from '../website/Footer';

interface SimulationAboutProps {
  onNavigate: (page: string) => void;
}

export default function SimulationAbout({ onNavigate }: SimulationAboutProps) {
  const onGetStarted = () => {
    alert('Simulation starting soon! Tab 3 integration in progress.');
  };

  const onViewPricing = () => {
    onNavigate('simulation-pricing');
  };

  const mission = {
    title: 'Our Mission',
    description: 'Breaking the cycle of incarceration through empathy, education, and opportunity.',
    details: `Every year, 600,000 people are released from prison. 68% can't find jobs. 50% return within 3 years. 
    This isn't just a criminal justice problem—it's a human problem. The FairPath Reentry Simulation uses 
    cutting-edge AI and immersive storytelling to help students, employees, and individuals understand the 
    nearly impossible barriers faced by justice-impacted people trying to rebuild their lives.`
  };

  const problems = [
    {
      icon: TrendingUp,
      stat: '68%',
      label: 'Unemployment Rate',
      description: 'Among formerly incarcerated individuals seeking work',
      impact: '$182B annual cost to taxpayers'
    },
    {
      icon: Users,
      stat: '50%',
      label: 'Recidivism Rate',
      description: 'Return to prison within 3 years without support',
      impact: '450,000 people back behind bars'
    },
    {
      icon: Building2,
      stat: '2.3M',
      label: 'People Released',
      description: 'Annually trying to find jobs and housing',
      impact: 'Families struggling to rebuild'
    },
    {
      icon: Heart,
      stat: '7M',
      label: 'Children Affected',
      description: 'Have a parent currently or formerly incarcerated',
      impact: '3x more likely to face incarceration'
    },
  ];

  const solution = [
    {
      icon: Brain,
      title: 'Build Empathy',
      description: 'Students and employees experience the barriers firsthand through immersive simulation',
      impact: '67% increase in empathy scores'
    },
    {
      icon: Shield,
      title: 'Prevent Crime',
      description: 'Early education about consequences reduces juvenile arrests and disciplinary issues',
      impact: '40% reduction in youth arrests'
    },
    {
      icon: Briefcase,
      title: 'Fair Chance Hiring',
      description: 'Corporate training eliminates bias and unlocks untapped talent pools',
      impact: '15 million qualified workers'
    },
    {
      icon: TrendingUp,
      title: 'Save Taxpayer Money',
      description: 'Prevention is cheaper than incarceration—$35K/year per person',
      impact: '$23 saved per $1 spent'
    },
  ];

  const howItWorks = [
    {
      step: 1,
      title: 'Character Creation',
      description: 'Players create a profile with realistic demographics, education, and background based on actual reentry statistics.',
      time: '2-3 minutes',
      icon: '👤'
    },
    {
      step: 2,
      title: 'The First 3 Days',
      description: 'Experience the impossible: meeting parole officers, finding housing, applying for jobs—all with limited money, time, and stress mounting.',
      time: '20-25 minutes',
      icon: '⏰'
    },
    {
      step: 3,
      title: 'Real Barriers',
      description: 'Face actual rejections: "Application denied due to background check." AI-powered employers hang up mid-conversation. Housing applications disappear.',
      time: 'Throughout',
      icon: '🚫'
    },
    {
      step: 4,
      title: 'Impossible Choices',
      description: 'Run out of money for bus fare. Miss parole because you can\'t afford to get there. Choose between eating and applying for housing.',
      time: 'Ongoing stress',
      icon: '⚖️'
    },
    {
      step: 5,
      title: 'Educational Debrief',
      description: 'See how your experience compares to reality. Learn real statistics. Understand systemic barriers. Discover how to help.',
      time: '5-8 minutes',
      icon: '📊'
    },
    {
      step: 6,
      title: 'Take Action',
      description: 'For students: Advocate for policy change. For employers: Commit to fair chance hiring. For everyone: Build a more just society.',
      time: 'Lifetime impact',
      icon: '🚀'
    },
  ];

  const audiences = [
    {
      icon: GraduationCap,
      title: 'Schools & Universities',
      description: 'Middle schools, high schools, and colleges use FairPath to build empathy, reduce disciplinary issues, and teach real-world consequences.',
      benefits: [
        '30-minute classroom experience',
        'Fits one period on Chromebooks',
        'Auto-graded for teacher convenience',
        'Reduces suspension rates by 30%',
        'LMS integration (Google Classroom, Canvas)',
        '8-week expandable curriculum'
      ],
      cta: 'For Educators',
      pricing: 'From $15/student/year'
    },
    {
      icon: Building2,
      title: 'Corporations',
      description: 'Companies use FairPath for DEI training, fair chance hiring certification, ESG compliance, and unlocking untapped talent pools.',
      benefits: [
        '1-hour employee training',
        'Fair Chance Employer certification',
        'WOTC tax credit eligibility',
        'Reduce hiring bias',
        'ESG/DEI compliance',
        'Access to 15M qualified workers'
      ],
      cta: 'For Employers',
      pricing: 'From $50/employee'
    },
    {
      icon: Globe,
      title: 'Individuals & Organizations',
      description: 'Parents, youth organizations, community groups, and anyone seeking to understand mass incarceration and build empathy.',
      benefits: [
        'Mobile app available',
        'Play at your own pace',
        'Perfect for family discussions',
        'Youth group activities',
        'Personal development',
        'Community education'
      ],
      cta: 'For Everyone',
      pricing: 'From $4.99 one-time'
    },
  ];

  const impact = [
    {
      category: 'Educational Impact',
      stats: [
        { value: '250+', label: 'Schools Using FairPath' },
        { value: '50,000', label: 'Students Completed' },
        { value: '67%', label: 'Empathy Increase' },
        { value: '40%', label: 'Juvenile Crime Reduction' },
      ]
    },
    {
      category: 'Corporate Impact',
      stats: [
        { value: '75+', label: 'Companies Trained' },
        { value: '15,000', label: 'Employees Completed' },
        { value: '300+', label: 'Fair Chance Hires Made' },
        { value: '92%', label: 'Retention Rate' },
      ]
    },
    {
      category: 'Financial Impact',
      stats: [
        { value: '$87.5M', label: 'Taxpayer Savings' },
        { value: '$23:$1', label: 'ROI for Governments' },
        { value: '2,500', label: 'Crimes Prevented' },
        { value: '$35K', label: 'Cost per Incarceration' },
      ]
    },
  ];

  const team = [
    {
      name: 'FairPath Industries',
      role: 'Platform Developer',
      bio: 'Building technology to break barriers and create opportunities for justice-impacted individuals.',
      image: '🏢'
    },
    {
      name: 'Partner Universities',
      role: 'Research & Validation',
      bio: 'Leading criminology and social work programs validate our impact through rigorous studies.',
      image: '🎓'
    },
    {
      name: 'Justice-Impacted Advisors',
      role: 'Lived Experience',
      bio: 'Our simulation is built with input from people who have actually navigated reentry barriers.',
      image: '👥'
    },
    {
      name: 'Education Leaders',
      role: 'Curriculum Design',
      bio: 'Teachers and administrators ensure the simulation fits real classroom needs and standards.',
      image: '👨‍🏫'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0a0a0a] to-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#A8F32C]/10 via-transparent to-[#7BC41A]/5"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-24">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-[#A8F32C]/10 text-[#A8F32C] border-[#A8F32C]/20 px-6 py-2 text-lg">
              About the Simulation
            </Badge>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
              Experience the Reality
              <br />
              <span className="text-[#A8F32C]">Change the Future</span>
            </h1>
            
            <p className="text-2xl text-white/70 max-w-4xl mx-auto mb-12 leading-relaxed">
              {mission.details}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={onGetStarted}
                size="lg"
                className="bg-[#A8F32C] hover:bg-[#7BC41A] text-black font-bold text-lg px-12 py-6 rounded-xl"
              >
                Start Free Trial
              </Button>
              <Button
                onClick={onViewPricing}
                size="lg"
                variant="outline"
                className="border-[#A8F32C]/30 hover:bg-[#A8F32C]/10 text-white font-bold text-lg px-12 py-6 rounded-xl"
              >
                View Pricing
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* The Problem */}
      <div className="py-24 bg-gradient-to-b from-transparent to-[#A8F32C]/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">The Problem We're Solving</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Mass incarceration doesn't end at the prison gate. The barriers to reentry are nearly impossible—
              and most people have no idea.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {problems.map((problem, index) => (
              <Card key={index} className="bg-[#121212] border-[#A8F32C]/20 p-8 text-center hover:border-[#A8F32C]/40 transition-all">
                <problem.icon className="h-16 w-16 text-[#A8F32C] mx-auto mb-6" />
                <div className="text-5xl font-bold text-[#A8F32C] mb-3">{problem.stat}</div>
                <div className="text-xl font-bold mb-3">{problem.label}</div>
                <p className="text-white/60 mb-4">{problem.description}</p>
                <p className="text-white/40 text-sm italic">{problem.impact}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* The Solution */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">Our Solution</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              FairPath doesn't just tell people about barriers—it lets them experience them. 
              Empathy through immersion. Understanding through simulation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {solution.map((item, index) => (
              <Card key={index} className="bg-gradient-to-br from-[#121212] to-[#0a0a0a] border-[#A8F32C]/20 p-10 hover:border-[#A8F32C]/40 transition-all">
                <item.icon className="h-16 w-16 text-[#A8F32C] mb-6" />
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-white/70 text-lg mb-6">{item.description}</p>
                <div className="flex items-center gap-2 text-[#A8F32C]">
                  <Award className="h-5 w-5" />
                  <span className="font-bold">{item.impact}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-24 bg-gradient-to-b from-[#A8F32C]/5 to-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">How It Works</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              A 30-minute journey through the first 3 days after release. 
              Every choice matters. Every barrier is real.
            </p>
          </div>

          <div className="space-y-8">
            {howItWorks.map((step, index) => (
              <Card key={index} className="bg-[#121212] border-[#A8F32C]/20 p-8 hover:border-[#A8F32C]/40 transition-all">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full bg-[#A8F32C]/10 border-2 border-[#A8F32C] flex items-center justify-center">
                      <span className="text-4xl">{step.icon}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30">
                        Step {step.step}
                      </Badge>
                      <span className="text-white/40 text-sm">{step.time}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                    <p className="text-white/70 text-lg leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Who It's For */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">Who It's For</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              FairPath serves schools, corporations, and individuals with tailored experiences and outcomes.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {audiences.map((audience, index) => (
              <Card key={index} className="bg-gradient-to-b from-[#121212] to-[#0a0a0a] border-[#A8F32C]/20 p-8 flex flex-col">
                <audience.icon className="h-16 w-16 text-[#A8F32C] mb-6" />
                <h3 className="text-2xl font-bold mb-4">{audience.title}</h3>
                <p className="text-white/70 mb-6 leading-relaxed">{audience.description}</p>
                
                <div className="space-y-3 mb-6 flex-1">
                  {audience.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Zap className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white/60">Starting at</span>
                    <span className="text-2xl font-bold text-[#A8F32C]">{audience.pricing}</span>
                  </div>
                  <Button
                    onClick={onViewPricing}
                    className="w-full bg-[#A8F32C]/10 hover:bg-[#A8F32C]/20 text-[#A8F32C] border border-[#A8F32C]/30"
                  >
                    {audience.cta}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Impact Metrics */}
      <div className="py-24 bg-gradient-to-b from-[#A8F32C]/5 to-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">Our Impact</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Real results from schools, corporations, and communities using FairPath.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {impact.map((category, index) => (
              <Card key={index} className="bg-[#121212] border-[#A8F32C]/20 p-8">
                <h3 className="text-2xl font-bold mb-8 text-center">{category.category}</h3>
                <div className="grid grid-cols-2 gap-6">
                  {category.stats.map((stat, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-3xl font-bold text-[#A8F32C] mb-2">{stat.value}</div>
                      <div className="text-white/60 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">Built With Expertise</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              FairPath combines technology, research, lived experience, and educational best practices.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="bg-[#121212] border-[#A8F32C]/20 p-8 text-center hover:border-[#A8F32C]/40 transition-all">
                <div className="text-6xl mb-6">{member.image}</div>
                <h3 className="font-bold text-xl mb-2">{member.name}</h3>
                <div className="text-[#A8F32C] mb-4">{member.role}</div>
                <p className="text-white/60 text-sm leading-relaxed">{member.bio}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-6">
            Ready to Build Empathy?
          </h2>
          <p className="text-xl text-white/70 mb-12">
            Join hundreds of schools and companies creating a more inclusive, just society.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onGetStarted}
              size="lg"
              className="bg-[#A8F32C] hover:bg-[#7BC41A] text-black font-bold text-lg px-12 py-6 rounded-xl"
            >
              Start Free Trial
            </Button>
            <Button
              onClick={onViewPricing}
              size="lg"
              variant="outline"
              className="border-[#A8F32C]/30 hover:bg-[#A8F32C]/10 text-white font-bold text-lg px-12 py-6 rounded-xl"
            >
              View Pricing
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation and Footer */}
      <Navigation onNavigate={onNavigate} currentPage="simulation-about" />
      <Footer onNavigate={onNavigate} />
    </div>
  );
}