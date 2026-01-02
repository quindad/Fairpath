import { useState } from 'react';
import { Check, X, Star, Zap, Crown, Building2, GraduationCap, Users, Globe, TrendingUp, Award, Shield, Phone } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

interface SimulationPricingProps {
  onSelectPlan: (plan: string) => void;
  onContactSales: () => void;
}

export default function SimulationPricing({ onSelectPlan, onContactSales }: SimulationPricingProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [audience, setAudience] = useState<'schools' | 'corporate' | 'individual'>('schools');

  // SCHOOL PRICING
  const schoolPlans = [
    {
      name: 'Free Trial',
      icon: Star,
      price: { monthly: 0, annual: 0 },
      description: 'Perfect for testing with one classroom',
      features: [
        '5-minute demo version',
        'Up to 30 students',
        '1 classroom only',
        'Basic analytics',
        'Limited AI features',
        'Teacher dashboard access',
      ],
      limitations: [
        'No full simulation',
        'No LMS integration',
        'No grading',
        'No progress saving',
      ],
      cta: 'Start Free Trial',
      popular: false,
      color: 'white'
    },
    {
      name: 'School License',
      icon: GraduationCap,
      price: { monthly: 2, annual: 15 },
      priceLabel: 'per student/year',
      description: 'Best for individual schools',
      features: [
        'Full 30-minute simulation',
        'Unlimited students',
        'All AI features',
        'Teacher dashboard',
        'Auto-grading system',
        'LMS integration (Google Classroom, Canvas)',
        '8-week curriculum',
        'Progress tracking',
        'Class codes for easy join',
        'Email support',
        'Student completion certificates',
      ],
      limitations: [],
      cta: 'Get School License',
      popular: false,
      color: '[#A8F32C]',
      savings: 'Save 38% annually'
    },
    {
      name: 'District License',
      icon: Building2,
      price: { monthly: 1.5, annual: 12 },
      priceLabel: 'per student/year',
      description: 'Multiple schools, one contract',
      features: [
        'All School License features',
        'Multi-school management',
        'District-wide analytics',
        'Custom branding options',
        'Dedicated account manager',
        'Priority support',
        'Teacher training webinars',
        'Admin dashboard',
        'Bulk student import',
        'API access',
        'Impact reporting',
      ],
      limitations: [],
      cta: 'Contact Sales',
      popular: true,
      color: '[#A8F32C]',
      badge: 'Most Popular',
      minSeats: 'Minimum: 1,000 students',
      savings: 'Save 20% vs School License'
    },
    {
      name: 'State Contract',
      icon: Crown,
      price: { monthly: null, annual: null },
      priceLabel: 'Custom pricing',
      description: 'Statewide implementation',
      features: [
        'All District License features',
        'State-wide deployment',
        'White-label platform',
        'Custom feature development',
        'Dedicated support team',
        'On-site training',
        'Research partnership',
        'Policy reporting for legislators',
        'Impact studies',
        'National press coverage',
        'Co-branded marketing',
      ],
      limitations: [],
      cta: 'Request Proposal',
      popular: false,
      color: '[#A8F32C]',
      badge: 'Enterprise',
      estimate: '$1M - $5M per year'
    },
  ];

  // CORPORATE PRICING
  const corporatePlans = [
    {
      name: 'Starter',
      icon: Users,
      price: { monthly: 60, annual: 600 },
      priceLabel: 'per employee',
      description: 'Small teams getting started',
      features: [
        '1-hour web-based simulation',
        'Up to 50 employees',
        'Basic completion tracking',
        'Employee certificates',
        'Email support',
        'Standard scenarios',
      ],
      limitations: [
        'No AI features',
        'No custom branding',
        'No admin dashboard',
        'No WOTC integration',
      ],
      cta: 'Start Trial',
      popular: false,
      color: 'white',
      maxSeats: 'Max 50 employees'
    },
    {
      name: 'Professional',
      icon: Building2,
      price: { monthly: 60, annual: 50 },
      priceLabel: 'per employee',
      description: 'Growing companies serious about DEI',
      features: [
        'Full 1-hour AI-powered simulation',
        'Unlimited employees',
        'Admin dashboard',
        'Advanced analytics',
        'Fair Chance Employer certification',
        'WOTC tax credit guidance',
        'Completion tracking',
        'Employee badges',
        'Priority support',
        'Quarterly impact reports',
      ],
      limitations: [],
      cta: 'Get Started',
      popular: true,
      color: '[#A8F32C]',
      badge: 'Most Popular',
      savings: 'Save 17% annually'
    },
    {
      name: 'Enterprise',
      icon: Building2,
      price: { monthly: null, annual: 35 },
      priceLabel: 'per employee',
      description: 'Large organizations (500+ employees)',
      features: [
        'All Professional features',
        'Custom company scenarios',
        'White-label platform',
        'API integration',
        'SSO (Single Sign-On)',
        'Dedicated account manager',
        'On-site training',
        'Custom reporting',
        'Multi-location support',
        'Recruiting pipeline integration',
      ],
      limitations: [],
      cta: 'Contact Sales',
      popular: false,
      color: '[#A8F32C]',
      minSeats: 'Minimum: 500 employees',
      savings: 'Save 30% vs Professional'
    },
    {
      name: 'VR Premium',
      icon: Crown,
      price: { monthly: null, annual: 200 },
      priceLabel: 'per employee',
      description: 'Immersive VR experience',
      features: [
        'All Enterprise features',
        'VR headset included',
        'Full immersion experience',
        '2-hour deep dive session',
        'On-site facilitator',
        'Team building components',
        'Live debrief sessions',
        'Executive briefings',
        'C-suite presentations',
        'Media coverage support',
      ],
      limitations: [],
      cta: 'Schedule Demo',
      popular: false,
      color: '[#A8F32C]',
      badge: 'Premium',
      hardware: 'Hardware included'
    },
  ];

  // INDIVIDUAL/CONSUMER PRICING
  const individualPlans = [
    {
      name: 'Free Demo',
      icon: Star,
      price: { monthly: 0, annual: 0 },
      priceLabel: 'one-time',
      description: 'Try before you buy',
      features: [
        '5-minute abbreviated version',
        '1 playthrough',
        'Limited scenarios',
        'Basic debrief',
      ],
      limitations: [
        'No full experience',
        'No progress saving',
        'No certificates',
        'Ads supported',
      ],
      cta: 'Try Free',
      popular: false,
      color: 'white'
    },
    {
      name: 'Full Experience',
      icon: Users,
      price: { monthly: null, annual: 4.99 },
      priceLabel: 'one-time payment',
      description: 'For individuals and families',
      features: [
        'Full 30-minute simulation',
        'Unlimited replays',
        'All scenarios unlocked',
        'Progress saving',
        'Completion certificate',
        'Share results',
        'Mobile app access (iOS/Android)',
        'No ads',
      ],
      limitations: [],
      cta: 'Buy Now - $4.99',
      popular: true,
      color: '[#A8F32C]',
      badge: 'Best Value',
      oneTime: true
    },
    {
      name: 'Youth Organization',
      icon: Globe,
      price: { monthly: null, annual: 500 },
      priceLabel: 'per year',
      description: 'Boys & Girls Clubs, community centers',
      features: [
        'All Full Experience features',
        'Up to 100 youth',
        'Facilitator dashboard',
        'Group session mode',
        'Shared devices (kiosk mode)',
        'Activity guides',
        'Organization branding',
        'Impact reporting',
      ],
      limitations: [],
      cta: 'Contact Us',
      popular: false,
      color: '[#A8F32C]',
      maxSeats: 'Up to 100 youth/year'
    },
  ];

  const getCurrentPlans = () => {
    switch (audience) {
      case 'schools':
        return schoolPlans;
      case 'corporate':
        return corporatePlans;
      case 'individual':
        return individualPlans;
      default:
        return schoolPlans;
    }
  };

  const plans = getCurrentPlans();

  const addOns = {
    schools: [
      { name: 'VR Simulation Add-On', price: '$50/student', description: 'Full immersion VR experience for select students' },
      { name: 'AI Mentor Access', price: '$5/student/month', description: 'Ongoing AI mentor guidance beyond simulation' },
      { name: 'Custom Curriculum Development', price: '$10,000', description: 'Custom scenarios for your district' },
      { name: 'Teacher Certification Program', price: '$5,000/cohort', description: 'Train teachers to facilitate simulation' },
    ],
    corporate: [
      { name: 'Hiring Pipeline Integration', price: '$5,000 one-time', description: 'Connect simulation to your ATS' },
      { name: 'Custom Company Scenarios', price: '$10,000', description: 'Scenarios featuring your actual job openings' },
      { name: 'Executive Briefing Session', price: '$2,500', description: '2-hour C-suite presentation with data' },
      { name: 'Recruiter Training', price: '$500/recruiter', description: 'Train recruiters on fair chance hiring' },
    ],
    individual: [
      { name: 'Educator Pack', price: '$99/year', description: 'Tools to teach others about reentry' },
      { name: 'Advocacy Toolkit', price: '$49 one-time', description: 'Resources to advocate for policy change' },
    ]
  };

  const roi = {
    schools: {
      title: 'ROI for Schools',
      metrics: [
        { label: 'Cost per Student', value: '$15/year' },
        { label: 'Suspension Rate Reduction', value: '30%' },
        { label: 'Disciplinary Cost Savings', value: '$500/student' },
        { label: 'Net ROI', value: '3,233%' },
      ],
      description: 'One prevented suspension saves $500 in administrative costs. One prevented arrest saves $35,000 in juvenile justice costs.'
    },
    corporate: {
      title: 'ROI for Companies',
      metrics: [
        { label: 'Cost per Employee', value: '$50' },
        { label: 'Fair Chance Hire WOTC Credit', value: '$9,600' },
        { label: 'One Fair Chance Hire ROI', value: '19,100%' },
        { label: 'Retention Rate', value: '92%' },
      ],
      description: 'Hiring one person with a record unlocks up to $9,600 in WOTC tax credits. Plus 15 million untapped workers with 92% retention rates.'
    },
    individual: {
      title: 'Value Proposition',
      metrics: [
        { label: 'Cost', value: '$4.99' },
        { label: 'Impact', value: 'Priceless' },
        { label: 'Family Discussions', value: 'Invaluable' },
        { label: 'Empathy Built', value: '∞' },
      ],
      description: 'For less than a coffee, gain a lifetime of empathy and understanding. Perfect for families, educators, and anyone who cares about justice.'
    }
  };

  const faqs = {
    schools: [
      {
        q: 'Does this work on Chromebooks?',
        a: 'Yes! The simulation is web-based and works perfectly on Chromebooks, iPads, desktops, and laptops. No app download required.'
      },
      {
        q: 'What if students don\'t have phones?',
        a: 'Perfect—they don\'t need phones! Access via computer lab, Chromebook cart, or any device with a browser. Designed specifically for phone-free school environments.'
      },
      {
        q: 'How does LMS integration work?',
        a: 'We integrate directly with Google Classroom, Canvas, Schoology, and Blackboard. Students click the link, auto-log in, and results sync to your gradebook.'
      },
      {
        q: 'Can parents see their child\'s results?',
        a: 'Teachers can choose to share completion certificates and debrief content with parents. Great for parent-teacher conferences and family discussions.'
      },
    ],
    corporate: [
      {
        q: 'What are WOTC tax credits?',
        a: 'Work Opportunity Tax Credits offer $2,400-$9,600 per qualifying hire with a criminal record. FairPath helps you access this talent pool compliantly.'
      },
      {
        q: 'How long does the training take?',
        a: 'The core simulation is 1 hour. We recommend adding 30 minutes for group discussion and action planning.'
      },
      {
        q: 'Can we customize scenarios?',
        a: 'Yes! Enterprise plans include custom scenarios featuring your actual job openings, company culture, and specific challenges.'
      },
      {
        q: 'Do you integrate with our HRIS?',
        a: 'Yes, Enterprise plans include API access for integration with major HRIS systems like Workday, ADP, and BambooHR.'
      },
    ],
    individual: [
      {
        q: 'Is this a subscription?',
        a: 'No! It\'s a one-time $4.99 payment for lifetime access. Play as many times as you want.'
      },
      {
        q: 'Can I share my purchase with family?',
        a: 'Each person needs their own account, but family discounts are available for 3+ licenses. Contact us for family pricing.'
      },
      {
        q: 'Is there a mobile app?',
        a: 'Yes! Available on iOS and Android app stores, or play in your mobile browser.'
      },
      {
        q: 'Can I use this for my youth group?',
        a: 'Absolutely! Check out our Youth Organization license for groups like Boys & Girls Clubs, church groups, and community centers.'
      },
    ]
  };

  const currentROI = roi[audience];
  const currentAddOns = addOns[audience];
  const currentFAQs = faqs[audience];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0a0a0a] to-black text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-[#A8F32C]/10 text-[#A8F32C] border-[#A8F32C]/20 px-6 py-2 text-lg">
            Pricing
          </Badge>
          <h1 className="text-6xl font-bold mb-6">
            Invest in Empathy.
            <br />
            <span className="text-[#A8F32C]">Invest in Change.</span>
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Choose the plan that fits your needs. Every plan includes our core mission: building empathy and breaking barriers.
          </p>
        </div>

        {/* Audience Selector */}
        <div className="flex justify-center gap-4 mb-16">
          <Button
            onClick={() => setAudience('schools')}
            size="lg"
            className={`px-8 py-6 rounded-xl font-bold text-lg ${
              audience === 'schools'
                ? 'bg-[#A8F32C] text-black'
                : 'bg-[#121212] text-white/60 hover:bg-[#1a1a1a]'
            }`}
          >
            <GraduationCap className="mr-2 h-5 w-5" />
            Schools
          </Button>
          <Button
            onClick={() => setAudience('corporate')}
            size="lg"
            className={`px-8 py-6 rounded-xl font-bold text-lg ${
              audience === 'corporate'
                ? 'bg-[#A8F32C] text-black'
                : 'bg-[#121212] text-white/60 hover:bg-[#1a1a1a]'
            }`}
          >
            <Building2 className="mr-2 h-5 w-5" />
            Corporate
          </Button>
          <Button
            onClick={() => setAudience('individual')}
            size="lg"
            className={`px-8 py-6 rounded-xl font-bold text-lg ${
              audience === 'individual'
                ? 'bg-[#A8F32C] text-black'
                : 'bg-[#121212] text-white/60 hover:bg-[#1a1a1a]'
            }`}
          >
            <Globe className="mr-2 h-5 w-5" />
            Individual
          </Button>
        </div>

        {/* Billing Toggle (only for schools/corporate) */}
        {audience !== 'individual' && (
          <div className="flex justify-center gap-4 mb-12">
            <Button
              onClick={() => setBillingCycle('monthly')}
              size="sm"
              className={`px-6 py-3 rounded-lg ${
                billingCycle === 'monthly'
                  ? 'bg-[#A8F32C]/20 text-[#A8F32C] border border-[#A8F32C]'
                  : 'bg-transparent text-white/60 border border-white/10'
              }`}
            >
              Monthly
            </Button>
            <Button
              onClick={() => setBillingCycle('annual')}
              size="sm"
              className={`px-6 py-3 rounded-lg ${
                billingCycle === 'annual'
                  ? 'bg-[#A8F32C]/20 text-[#A8F32C] border border-[#A8F32C]'
                  : 'bg-transparent text-white/60 border border-white/10'
              }`}
            >
              Annual
              <Badge className="ml-2 bg-[#A8F32C] text-black text-xs">Save up to 38%</Badge>
            </Button>
          </div>
        )}

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const isPopular = plan.popular;
            const price = billingCycle === 'annual' ? plan.price.annual : plan.price.monthly;
            
            return (
              <Card
                key={index}
                className={`relative p-8 flex flex-col ${
                  isPopular
                    ? 'bg-gradient-to-b from-[#A8F32C]/20 to-[#7BC41A]/10 border-[#A8F32C]'
                    : 'bg-[#121212] border-[#A8F32C]/20'
                }`}
              >
                {plan.badge && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#A8F32C] text-black">
                    {plan.badge}
                  </Badge>
                )}

                <div className="mb-6">
                  <Icon className={`h-12 w-12 text-${plan.color} mb-4`} />
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-white/60">{plan.description}</p>
                </div>

                <div className="mb-6">
                  {price !== null ? (
                    <>
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-bold text-[#A8F32C]">
                          ${typeof price === 'number' ? price : plan.estimate}
                        </span>
                        {billingCycle === 'monthly' && (
                          <span className="text-white/40">/mo</span>
                        )}
                      </div>
                      <div className="text-white/60 text-sm mt-1">{plan.priceLabel}</div>
                    </>
                  ) : (
                    <>
                      <div className="text-4xl font-bold text-[#A8F32C] mb-2">Custom</div>
                      <div className="text-white/60 text-sm">{plan.priceLabel}</div>
                      {plan.estimate && (
                        <div className="text-white/40 text-xs mt-2">{plan.estimate}</div>
                      )}
                    </>
                  )}
                  {plan.savings && (
                    <Badge className="mt-2 bg-green-500/10 text-green-400 border-green-500/20">
                      {plan.savings}
                    </Badge>
                  )}
                  {plan.minSeats && (
                    <div className="text-white/40 text-xs mt-2">{plan.minSeats}</div>
                  )}
                  {plan.maxSeats && (
                    <div className="text-white/40 text-xs mt-2">{plan.maxSeats}</div>
                  )}
                  {plan.hardware && (
                    <Badge className="mt-2 bg-[#A8F32C]/10 text-[#A8F32C] border-[#A8F32C]/20">
                      {plan.hardware}
                    </Badge>
                  )}
                </div>

                <div className="flex-1 space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                      <span className="text-white/80 text-sm">{feature}</span>
                    </div>
                  ))}
                  {plan.limitations.map((limitation, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <X className="h-5 w-5 text-white/30 flex-shrink-0 mt-0.5" />
                      <span className="text-white/40 text-sm">{limitation}</span>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => price === null || plan.name.includes('State') || plan.name.includes('Enterprise') || plan.name.includes('VR') || plan.name.includes('Youth')
                    ? onContactSales()
                    : onSelectPlan(plan.name)
                  }
                  className={`w-full ${
                    isPopular
                      ? 'bg-[#A8F32C] hover:bg-[#7BC41A] text-black font-bold'
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  {plan.cta}
                </Button>
              </Card>
            );
          })}
        </div>

        {/* Add-Ons */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Add-Ons & Upgrades</h2>
            <p className="text-white/60 text-lg">Enhance your experience with additional features</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {currentAddOns.map((addon, index) => (
              <Card key={index} className="bg-[#121212] border-[#A8F32C]/20 p-6 flex items-start gap-4">
                <Zap className="h-8 w-8 text-[#A8F32C] flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-lg">{addon.name}</h3>
                    <span className="text-[#A8F32C] font-bold whitespace-nowrap ml-4">{addon.price}</span>
                  </div>
                  <p className="text-white/60 text-sm">{addon.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* ROI Section */}
        <div className="mb-20 bg-gradient-to-br from-[#A8F32C]/10 to-[#7BC41A]/5 rounded-2xl p-12 border border-[#A8F32C]/20">
          <div className="text-center mb-12">
            <TrendingUp className="h-16 w-16 text-[#A8F32C] mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4">{currentROI.title}</h2>
            <p className="text-white/70 text-lg max-w-3xl mx-auto">{currentROI.description}</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {currentROI.metrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-[#A8F32C] mb-2">{metric.value}</div>
                <div className="text-white/60">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-white/60 text-lg">Everything you need to know</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {currentFAQs.map((faq, index) => (
              <Card key={index} className="bg-[#121212] border-[#A8F32C]/20 p-8">
                <h3 className="font-bold text-lg mb-3 text-[#A8F32C]">{faq.q}</h3>
                <p className="text-white/70 leading-relaxed">{faq.a}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-br from-[#121212] to-black rounded-2xl p-16 border border-[#A8F32C]/20">
          <Shield className="h-20 w-20 text-[#A8F32C] mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Our team is here to help you find the perfect plan for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onContactSales}
              size="lg"
              className="bg-[#A8F32C] hover:bg-[#7BC41A] text-black font-bold text-lg px-12 py-6 rounded-xl"
            >
              <Phone className="mr-2 h-5 w-5" />
              Talk to Sales
            </Button>
            <Button
              onClick={() => onSelectPlan('Free Trial')}
              size="lg"
              variant="outline"
              className="border-[#A8F32C]/30 hover:bg-[#A8F32C]/10 text-white font-bold text-lg px-12 py-6 rounded-xl"
            >
              Start Free Trial
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
