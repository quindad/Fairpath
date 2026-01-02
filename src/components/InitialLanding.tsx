import { User, Building, Home, Heart, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import LogoFinal from './common/LogoFinal';

type UserType = 'user' | 'employer' | 'property' | 'resource' | 'donor';

interface InitialLandingProps {
  onSelectUserType: (type: UserType) => void;
}

export default function InitialLanding({ onSelectUserType }: InitialLandingProps) {
  const userTypes = [
    {
      id: 'user' as UserType,
      icon: User,
      title: 'I Need a Job or Housing',
      description: 'Find felony-friendly jobs and housing with guaranteed opportunities',
      features: [
        'One-click job applications',
        'FastTrack housing screening',
        'Free marketplace items',
        'FairPath+ subscription ($2/mo)'
      ],
      color: 'from-[#A8F32C]/20 via-transparent to-transparent',
      borderColor: 'border-[#A8F32C]/30'
    },
    {
      id: 'employer' as UserType,
      icon: Building,
      title: "I'm an Employer",
      description: 'Hire qualified candidates and earn up to $9,600 in WOTC tax credits per hire',
      features: [
        'Access pre-screened candidates',
        'Automated WOTC tax credit forms',
        'FairPath Staffing integration',
        'Compliance-ready hiring'
      ],
      color: 'from-blue-500/20 via-transparent to-transparent',
      borderColor: 'border-blue-500/30'
    },
    {
      id: 'property' as UserType,
      icon: Home,
      title: "I'm a Property Owner",
      description: 'List properties and earn 60% of FastTrack revenue on every application',
      features: [
        'FastTrack revenue share (60%)',
        'Pre-screened applicants',
        'SingleKey background reports',
        'Anti-slumlord protection'
      ],
      color: 'from-purple-500/20 via-transparent to-transparent',
      borderColor: 'border-purple-500/30'
    },
    {
      id: 'resource' as UserType,
      icon: Users,
      title: "I'm a Resource Partner",
      description: 'Connect clients to jobs, housing, and resources through our CRM',
      features: [
        'Client management CRM',
        'Referral tracking',
        'Outcome reporting',
        'Free for nonprofits'
      ],
      color: 'from-green-500/20 via-transparent to-transparent',
      borderColor: 'border-green-500/30'
    },
    {
      id: 'donor' as UserType,
      icon: Heart,
      title: 'I Want to Donate Items',
      description: 'Give furniture, clothes, and essentials directly to people in need',
      features: [
        'Post items for free',
        'Choose your recipient',
        '48-hour claim window',
        'Secure pickup coordination'
      ],
      color: 'from-red-500/20 via-transparent to-transparent',
      borderColor: 'border-red-500/30'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/5 bg-[#121212]">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <LogoFinal size="lg" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-5xl mb-4">Welcome to Friend A Felon</h1>
          <p className="text-xl text-white/60 mb-2">A FairPath Industries Company</p>
          <p className="text-lg text-white/80">
            The 5-sided reentry ecosystem connecting justice-impacted people with jobs, housing, resources, and community support
          </p>
        </div>

        {/* Selection Cards */}
        <div className="mb-12">
          <h2 className="text-2xl text-center mb-8">What brings you here today?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userTypes.map((type) => {
              const Icon = type.icon;
              return (
                <Card
                  key={type.id}
                  className={`bg-gradient-to-br ${type.color} border ${type.borderColor} p-6 hover:scale-105 transition-all cursor-pointer`}
                  onClick={() => onSelectUserType(type.id)}
                >
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-xl mb-2">{type.title}</h3>
                      <p className="text-sm text-white/60 mb-4">{type.description}</p>
                    </div>
                    
                    <div className="flex-1">
                      <div className="space-y-2 mb-4">
                        {type.features.map((feature, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm text-white/80">
                            <div className="w-1 h-1 rounded-full bg-[#A8F32C] mt-2 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button
                      className="w-full bg-white/10 hover:bg-white/20 text-white border-0 mt-4"
                      onClick={() => onSelectUserType(type.id)}
                    >
                      Get Started
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="text-center">
            <div className="text-4xl text-[#A8F32C] mb-2">12,000+</div>
            <div className="text-sm text-white/60">People Helped</div>
          </div>
          <div className="text-center">
            <div className="text-4xl text-[#A8F32C] mb-2">500+</div>
            <div className="text-sm text-white/60">Partner Employers</div>
          </div>
          <div className="text-center">
            <div className="text-4xl text-[#A8F32C] mb-2">300+</div>
            <div className="text-sm text-white/60">Housing Properties</div>
          </div>
          <div className="text-center">
            <div className="text-4xl text-[#A8F32C] mb-2">$2.4M</div>
            <div className="text-sm text-white/60">WOTC Credits Claimed</div>
          </div>
        </div>

        {/* Value Props */}
        <div className="bg-[#121212] border border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl mb-6 text-center">Why Friend A Felon?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg mb-2 text-[#A8F32C]">For Justice-Impacted Individuals</h3>
              <p className="text-sm text-white/60">
                We show you ONLY opportunities you're actually eligible for based on your conviction type and time since release. No more wasted applications.
              </p>
            </div>
            <div>
              <h3 className="text-lg mb-2 text-[#A8F32C]">For Employers & Landlords</h3>
              <p className="text-sm text-white/60">
                Access pre-screened candidates, earn tax credits up to $9,600 per hire, and generate revenue from FastTrack applications.
              </p>
            </div>
            <div>
              <h3 className="text-lg mb-2 text-[#A8F32C]">For Community Partners</h3>
              <p className="text-sm text-white/60">
                Free CRM tools to manage clients, track referrals, and measure outcomes. Built specifically for reentry work.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
