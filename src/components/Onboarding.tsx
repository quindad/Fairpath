import { useState } from 'react';
import { ArrowRight, Zap, Shield, Users, Gift } from 'lucide-react';
import { Button } from './ui/button';
import Logo from './Logo';

interface OnboardingProps {
  onComplete: (userType: 'user' | 'donor' | 'employer' | 'property' | 'resource') => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);

  const screens = [
    {
      title: 'Welcome to Friend A Felon',
      subtitle: 'Reentry in the palm of your hand',
      description: 'We help justice-impacted people find housing, jobs, and support that actually accepts your record.',
      icon: Shield,
    },
    {
      title: 'Opportunities Built Around Your Record',
      subtitle: 'See what actually works for you',
      description: 'Tell us about your charges and we\'ll only show you housing and jobs that fit your situation. You can always turn on a filter to see everything, even places that usually say no.',
      icon: Users,
    },
    {
      title: 'FastTrack Applications',
      subtitle: 'One powerful application',
      description: 'Use one powerful application to apply for partnered housing and jobs. Includes background screening and, for housing, a guaranteed showing at participating properties.',
      pricing: '$75 per application\n$65 with FairPath+ ($2/month)',
      icon: Zap,
    },
    {
      title: 'More Than Listings',
      subtitle: 'Complete reentry support',
      description: 'Access our resource center, connect with the Felon Connect community, browse the free marketplace, and get support from reentry organizations right in the app.',
      icon: Gift,
    },
  ];

  // Check if we should show account type selection BEFORE accessing currentScreen
  if (step >= screens.length) {
    return <AccountTypeSelection onSelect={onComplete} />;
  }

  const currentScreen = screens[step];
  const Icon = currentScreen.icon;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <Logo size="xl" showText={true} variant="default" />

        <div className="mt-12 text-center max-w-md">
          <div className="w-16 h-16 bg-[#A8F32C]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Icon className="h-8 w-8 text-[#A8F32C]" />
          </div>

          <h1 className="text-3xl mb-3">{currentScreen.title}</h1>
          <p className="text-sm text-[#A8F32C] mb-6">{currentScreen.subtitle}</p>
          <p className="text-white/70 leading-relaxed mb-6">
            {currentScreen.description}
          </p>

          {currentScreen.pricing && (
            <div className="bg-[#121212] rounded-xl p-4 border border-white/5 mb-6">
              <div className="text-sm text-white/80 whitespace-pre-line">
                {currentScreen.pricing}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-8 space-y-6">
        <div className="flex justify-center gap-2">
          {screens.map((_, index) => (
            <div
              key={index}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === step
                  ? 'w-8 bg-[#A8F32C]'
                  : 'w-1 bg-white/10'
              }`}
            />
          ))}
        </div>

        <Button
          onClick={() => setStep(step + 1)}
          className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90 h-14 text-base"
        >
          {step === screens.length - 1 ? 'Get Started' : 'Continue'}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}

function AccountTypeSelection({ onSelect }: { onSelect: (userType: 'user' | 'donor' | 'employer' | 'property' | 'resource') => void }) {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-12">
        <Logo size="lg" showText={false} variant="compact" />
        
        <div className="mt-12 text-center mb-8">
          <div className="text-xs tracking-[0.3em] text-[#A8F32C] mb-4">
            CHOOSE YOUR PATH
          </div>
          <h1 className="text-4xl mb-2">I want to</h1>
          <h2 className="text-4xl text-[#A8F32C]">access the platform as...</h2>
        </div>

        <div className="w-full max-w-md space-y-3">
          <AccountTypeCard
            emoji="🎯"
            title="User - Rebuilding My Life"
            description="Find housing, jobs, resources, and community"
            onClick={() => onSelect('user')}
          />
          
          <AccountTypeCard
            emoji="💼"
            title="Employer - Post Jobs"
            description="Connect with felony-friendly talent"
            onClick={() => onSelect('employer')}
          />
          
          <AccountTypeCard
            emoji="🏠"
            title="Property Owner - List Housing"
            description="Rent to qualified applicants with records"
            onClick={() => onSelect('property')}
          />
          
          <AccountTypeCard
            emoji="🤝"
            title="Resource Partner - Support Reentry"
            description="Track clients and coordinate services"
            onClick={() => onSelect('resource')}
          />
          
          <AccountTypeCard
            emoji="💝"
            title="Donor - Give Free Items"
            description="Post items to help people in need"
            onClick={() => onSelect('donor')}
          />
        </div>
      </div>
    </div>
  );
}

function AccountTypeCard({ emoji, title, description, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-[#121212] border border-white/5 rounded-2xl p-5 hover:border-[#A8F32C]/40 transition-all text-left group"
    >
      <div className="flex items-start gap-4">
        <div className="text-4xl">{emoji}</div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg mb-1 group-hover:text-[#A8F32C] transition-colors">
            {title}
          </h3>
          <p className="text-sm text-white/60">{description}</p>
        </div>
        <ArrowRight className="h-5 w-5 text-white/20 group-hover:text-[#A8F32C] transition-colors flex-shrink-0 mt-1" />
      </div>
    </button>
  );
}