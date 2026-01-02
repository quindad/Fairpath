import { Briefcase, Home, Heart, GraduationCap, Shield, Users, TrendingUp, CheckCircle, ArrowRight, DollarSign, MessageSquare, FileText, Phone } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

interface FullReentryEcosystemProps {
  onNavigate?: (section: string) => void;
}

export default function FullReentryEcosystem({ onNavigate }: FullReentryEcosystemProps) {
  const services = [
    {
      icon: Briefcase,
      title: 'Employment',
      color: 'blue',
      subtitle: 'Jobs that want you',
      features: [
        'WOTC-eligible job marketplace',
        'FairPath Staffing with automated tax credits',
        'Pre-release job placement alerts',
        'Resume building & interview prep',
        'FastTrack applications for priority hiring'
      ],
      stats: '12,400+ jobs posted monthly'
    },
    {
      icon: Home,
      title: 'Housing',
      color: 'purple',
      subtitle: 'Safe, stable housing',
      features: [
        'Felony-friendly housing marketplace',
        'FastTrack applications with guaranteed showings',
        'Property owner revenue sharing program',
        'Roommate matching',
        'Emergency shelter resources'
      ],
      stats: '3,200+ listings nationwide'
    },
    {
      icon: Heart,
      title: 'Resources & Support',
      color: 'green',
      subtitle: 'Everything you need',
      features: [
        'Food banks & pantries',
        'Clothing & hygiene supplies',
        'Transportation assistance',
        'Mental health services',
        'Substance abuse programs',
        'Legal aid & expungement help'
      ],
      stats: '8,700+ partner organizations'
    },
    {
      icon: GraduationCap,
      title: 'Education & Training',
      color: 'yellow',
      subtitle: 'Build new skills',
      features: [
        'FairPath Forward (in-prison training)',
        'Online courses & certifications',
        'Trade skills programs',
        'Financial literacy',
        'Computer skills training'
      ],
      stats: '140+ courses available'
    },
    {
      icon: Users,
      title: 'Community',
      color: 'pink',
      subtitle: "You're not alone",
      features: [
        'Peer mentorship matching',
        'Success stories & inspiration',
        'Local reentry groups',
        'Family reconnection support',
        'Social events & networking'
      ],
      stats: '45,000+ active users'
    },
    {
      icon: DollarSign,
      title: 'Financial Services',
      color: 'orange',
      subtitle: 'Build your future',
      features: [
        'FairPath Gigs for extra income',
        'Bank account setup assistance',
        'Credit building programs',
        'Tax preparation help',
        'Emergency grants (Impact Fund)'
      ],
      stats: '$2.4M+ paid to workers'
    }
  ];

  const impactStats = [
    { number: '87%', label: 'Reduced Recidivism', description: 'Users with stable housing + employment' },
    { number: '$47K', label: 'Avg First Year Income', description: 'For users placed through FairPath Staffing' },
    { number: '92%', label: 'Still Employed', description: 'After 12 months (vs 58% national average)' },
    { number: '3.2x', label: 'Faster Placement', description: 'Compared to traditional job search' }
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string }> = {
      blue: { bg: 'bg-blue-500/20', text: 'text-blue-500', border: 'border-blue-500/30' },
      purple: { bg: 'bg-purple-500/20', text: 'text-purple-500', border: 'border-purple-500/30' },
      green: { bg: 'bg-[#A8F32C]/20', text: 'text-[#A8F32C]', border: 'border-[#A8F32C]/30' },
      yellow: { bg: 'bg-yellow-500/20', text: 'text-yellow-500', border: 'border-yellow-500/30' },
      pink: { bg: 'bg-pink-500/20', text: 'text-pink-500', border: 'border-pink-500/30' },
      orange: { bg: 'bg-orange-500/20', text: 'text-orange-500', border: 'border-orange-500/30' }
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="bg-black text-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30 mb-4">
            🌟 Complete Reentry Ecosystem
          </Badge>
          <h2 className="text-4xl md:text-5xl mb-6">
            More Than Just Jobs.<br/>
            <span className="text-[#A8F32C]">It's Your Entire Second Chance.</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            FairPath Industries isn't a job board. We're a complete reentry ecosystem connecting 
            justice-impacted people to employment, housing, resources, and community support. 
            Everything you need in one place.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            const colors = getColorClasses(service.color);
            return (
              <Card
                key={index}
                className={`bg-white/5 border-white/10 p-6 hover:border-[#A8F32C]/50 transition-all group cursor-pointer`}
              >
                <div className={`w-14 h-14 ${colors.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-7 h-7 ${colors.text}`} />
                </div>
                
                <h3 className="text-2xl mb-1 group-hover:text-[#A8F32C] transition-colors">
                  {service.title}
                </h3>
                <p className="text-white/60 mb-4">{service.subtitle}</p>
                
                <ul className="space-y-2 mb-4">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className={`pt-4 border-t ${colors.border}`}>
                  <div className={`text-sm ${colors.text} font-medium`}>
                    {service.stats}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* How It All Connects */}
        <Card className="bg-gradient-to-br from-white/10 to-white/5 border-white/20 p-8 mb-16">
          <h3 className="text-3xl mb-6 text-center">How It All Works Together</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">1️⃣</span>
              </div>
              <h4 className="text-xl mb-2">Before Release</h4>
              <p className="text-white/70 text-sm">
                <strong>FairPath Forward</strong> provides job training inside. Employers post jobs with 
                release alerts. Pre-placement starts 90 days before release.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#A8F32C]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">2️⃣</span>
              </div>
              <h4 className="text-xl mb-2">Day of Release</h4>
              <p className="text-white/70 text-sm">
                Job ready. Housing secured via <strong>FastTrack</strong>. Resources loaded into app. 
                Transportation arranged. Bank account set up. You walk out with a plan.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">3️⃣</span>
              </div>
              <h4 className="text-xl mb-2">Long-Term Success</h4>
              <p className="text-white/70 text-sm">
                Ongoing support. Peer mentorship. <strong>FairPath Gigs</strong> for extra income. 
                Impact Fund grants when needed. Community that gets it.
              </p>
            </div>
          </div>
        </Card>

        {/* Impact Stats */}
        <div className="mb-16">
          <h3 className="text-3xl text-center mb-8">The FairPath Difference</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {impactStats.map((stat, index) => (
              <Card key={index} className="bg-white/5 border-white/10 p-6 text-center">
                <div className="text-4xl text-[#A8F32C] mb-2">{stat.number}</div>
                <div className="font-medium mb-1">{stat.label}</div>
                <div className="text-sm text-white/60">{stat.description}</div>
              </Card>
            ))}
          </div>
        </div>

        {/* For Employers */}
        <Card className="bg-gradient-to-r from-[#A8F32C]/20 to-transparent border-[#A8F32C]/30 p-8 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl mb-4">For Employers: Hire Better, Save More</h3>
              <p className="text-white/70 mb-6">
                When you hire through FairPath Staffing, you&rsquo;re not just getting an employee. 
                You&rsquo;re getting someone with stable housing (we helped secure it), reliable transportation 
                (we arranged it), and ongoing support (we provide it). That&rsquo;s why our placements have 
                92% retention after 12 months.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <DollarSign className="w-5 h-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>Up to $9,600 WOTC tax credit per hire</strong> - automated processing
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <TrendingUp className="w-5 h-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>25% lower turnover</strong> because we solve the whole problem, not just employment
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="w-5 h-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>Pre-screened, background-checked, ready to work</strong> candidates
                  </div>
                </li>
              </ul>
              <Button 
                onClick={() => onNavigate?.('staffing-crm')}
                className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
              >
                Start Hiring <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h4 className="text-xl mb-4">What Makes Us Different</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Home className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <div className="font-medium mb-1">Housing Solved</div>
                    <div className="text-sm text-white/60">
                      We don't just find jobs. We secure housing through our FastTrack program.
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Heart className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <div className="font-medium mb-1">Support Network</div>
                    <div className="text-sm text-white/60">
                      8,700+ partner organizations providing wraparound services.
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#A8F32C]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-[#A8F32C]" />
                  </div>
                  <div>
                    <div className="font-medium mb-1">Community That Gets It</div>
                    <div className="text-sm text-white/60">
                      Peer mentorship from people who've been there.
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-5 h-5 text-yellow-500" />
                  </div>
                  <div>
                    <div className="font-medium mb-1">Multiple Income Streams</div>
                    <div className="text-sm text-white/60">
                      FairPath Gigs lets workers earn extra while building stability.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Real Stories */}
        <div className="mb-16">
          <h3 className="text-3xl text-center mb-8">Real Stories, Real Impact</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white/5 border-white/10 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center text-2xl">
                  👨‍🔧
                </div>
                <div>
                  <div className="font-medium">Marcus J.</div>
                  <div className="text-sm text-white/60">Warehouse Supervisor</div>
                </div>
              </div>
              <p className="text-white/80 text-sm mb-4">
                "FairPath didn't just find me a job. They helped me get housing before I was released, 
                connected me with a mentor, and now I'm supervising a team of 12. The WOTC credit made 
                my employer excited to hire me."
              </p>
              <div className="flex items-center gap-2 text-sm">
                <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30">
                  Employed 18 months
                </Badge>
                <Badge className="bg-white/10 text-white/80 border-white/20">
                  2 promotions
                </Badge>
              </div>
            </Card>

            <Card className="bg-white/5 border-white/10 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center text-2xl">
                  🏗️
                </div>
                <div>
                  <div className="font-medium">David W.</div>
                  <div className="text-sm text-white/60">Construction Foreman</div>
                </div>
              </div>
              <p className="text-white/80 text-sm mb-4">
                "FairPath Staffing connected me with housing through their network. 
                FairPath Gigs let me do side work on weekends. I saved $8K in 6 months and bought a truck."
              </p>
              <div className="flex items-center gap-2 text-sm">
                <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30">
                  Earning $62K/year
                </Badge>
                <Badge className="bg-white/10 text-white/80 border-white/20">
                  Own vehicle
                </Badge>
              </div>
            </Card>

            <Card className="bg-white/5 border-white/10 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#A8F32C]/20 rounded-full flex items-center justify-center text-2xl">
                  👩‍💼
                </div>
                <div>
                  <div className="font-medium">Sarah M.</div>
                  <div className="text-sm text-white/60">Office Manager</div>
                </div>
              </div>
              <p className="text-white/80 text-sm mb-4">
                "I did FairPath Forward training while inside. Had 3 job offers waiting when I got out. 
                The resource partners helped with childcare. Now I'm managing an office and my kids 
                are proud of me."
              </p>
              <div className="flex items-center gap-2 text-sm">
                <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30">
                  2 years sober
                </Badge>
                <Badge className="bg-white/10 text-white/80 border-white/20">
                  Reunited with kids
                </Badge>
              </div>
            </Card>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <h3 className="text-3xl mb-4">Ready to Change Your Life?</h3>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Whether you&rsquo;re currently incarcerated, recently released, or years into your second chance, 
            FairPath has the tools you need to succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => onNavigate?.('signup')}
              className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
              size="lg"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              onClick={() => onNavigate?.('staffing-crm')}
              variant="outline"
              className="border-white/20 text-white"
              size="lg"
            >
              I'm an Employer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}