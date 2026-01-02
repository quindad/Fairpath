import { useState } from 'react';
import { Check, Users, Crown, Briefcase, DollarSign, X, Zap, FileText, Shield } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import PaymentMethodSelector from '../payment/PaymentMethodSelector';
import PaymentConfirmation from '../payment/PaymentConfirmation';

interface EmployerPricingProps {
  onSubscribe: (plan: string, paymentDetails: any) => void;
  onClose: () => void;
  currentPlan?: string;
}

export default function EmployerPricing({ onSubscribe, onClose, currentPlan }: EmployerPricingProps) {
  const [selectedPlan, setSelectedPlan] = useState<'starter' | 'professional' | 'enterprise' | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<any | null>(null);
  const [purchaseType, setPurchaseType] = useState<'subscription' | 'package' | null>(null);
  const [step, setStep] = useState<'plans' | 'payment' | 'confirmation'>('plans');
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [transactionId] = useState(`EMP-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`);

  const subscriptionPlans = {
    starter: {
      name: 'Starter',
      price: 99.99,
      icon: Briefcase,
      color: 'blue',
      features: [
        'Post up to 5 active jobs',
        '50 applicant views included/month',
        'Basic applicant filtering',
        'Email notifications',
        'Applicant messaging',
        'WOTC pre-screening',
        'Standard job posting duration (30 days)',
        'Basic analytics dashboard'
      ],
      notIncluded: [
        'FastTrack job postings',
        'Priority support',
        'WOTC filing assistance'
      ]
    },
    professional: {
      name: 'Professional',
      price: 199.99,
      icon: Users,
      color: '[#A8F32C]',
      popular: true,
      features: [
        'Post up to 25 active jobs',
        '200 applicant views included/month',
        'Advanced applicant filtering',
        'SMS + Email notifications',
        'Priority applicant messaging',
        'WOTC pre-screening & calculator',
        'FastTrack job posting (up to 10)',
        'Featured job placement',
        '60-day posting duration',
        'Advanced analytics & reports',
        'WOTC Form 8850 assistance',
        'Dedicated support'
      ],
      notIncluded: [
        'FairPath Staffing integration',
        'Custom ATS integration'
      ]
    },
    enterprise: {
      name: 'Enterprise',
      price: 799.99,
      icon: Crown,
      color: 'yellow',
      features: [
        'Unlimited active job postings',
        'Unlimited applicant views',
        'Full ATS integration',
        'Priority phone support',
        'Dedicated account manager',
        'WOTC pre-screening & filing service',
        'FastTrack job posting (unlimited)',
        'Top-tier job placement',
        '90-day posting duration',
        'Enterprise analytics suite',
        'FairPath Staffing integration',
        'Bulk hiring tools',
        'Custom branding',
        'API access',
        'White-label career portal',
        'Multi-location support',
        'Compliance tracking'
      ],
      notIncluded: []
    }
  };

  const applicantPackages = [
    { views: 50, price: 100, perView: 2.00 },
    { views: 100, price: 200, perView: 2.00, popular: true },
    { views: 200, price: 400, perView: 2.00 },
    { views: 500, price: 900, perView: 1.80 }
  ];

  const fastTrackPricing = {
    perJob: 49.99,
    description: 'Enable FastTrack on any job posting for instant applicant submissions'
  };

  const staffingPricing = [
    {
      name: 'Flat Hire Fee',
      price: 99,
      description: 'Basic placement fee per hire',
      features: ['Candidate sourcing', 'Basic screening', '30-day guarantee']
    },
    {
      name: 'Hire + Screening',
      price: 149,
      popular: true,
      description: 'Complete hire with full background check',
      features: ['Candidate sourcing', 'Full background check', 'Drug test coordination', '60-day guarantee']
    },
    {
      name: 'Percentage-Based',
      price: '5% of first month salary',
      description: 'For higher-level positions',
      features: ['Executive search', 'Comprehensive vetting', '90-day guarantee', 'Ongoing support']
    }
  ];

  const handleSelectSubscription = (plan: 'starter' | 'professional' | 'enterprise') => {
    setSelectedPlan(plan);
    setPurchaseType('subscription');
    setStep('payment');
  };

  const handleSelectPackage = (pkg: any) => {
    setSelectedPackage(pkg);
    setPurchaseType('package');
    setStep('payment');
  };

  const handlePaymentComplete = (method: 'stripe' | 'paypal', details: any) => {
    setPaymentDetails(details);
    setStep('confirmation');

    setTimeout(() => {
      if (purchaseType === 'subscription' && selectedPlan) {
        onSubscribe(selectedPlan, { ...details, transactionId });
      } else if (purchaseType === 'package' && selectedPackage) {
        onSubscribe('package', { ...details, package: selectedPackage, transactionId });
      }
    }, 2000);
  };

  if (step === 'payment') {
    let amount = 0;
    let description = '';

    if (purchaseType === 'subscription' && selectedPlan) {
      const plan = subscriptionPlans[selectedPlan];
      amount = plan.price;
      description = `${plan.name} Plan - Monthly Subscription`;
    } else if (purchaseType === 'package' && selectedPackage) {
      amount = selectedPackage.price;
      description = `${selectedPackage.views} Applicant Views Package`;
    }

    return (
      <div className="min-h-screen bg-black text-white">
        <div className="border-b border-white/5 bg-[#121212] sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl text-white">Complete Your Purchase</h1>
              <Button onClick={onClose} variant="ghost" size="icon">
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-8">
          <Card className="bg-[#121212] border-white/10 p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl text-white mb-1">{description}</div>
                <div className="text-white/60">
                  {purchaseType === 'subscription' ? 'Billed Monthly' : 'One-Time Purchase'}
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl text-[#A8F32C]">${amount}</div>
              </div>
            </div>
          </Card>

          <PaymentMethodSelector
            amount={amount}
            description={description}
            onPaymentMethodSelected={handlePaymentComplete}
            onCancel={() => setStep('plans')}
          />
        </div>
      </div>
    );
  }

  if (step === 'confirmation') {
    let amount = 0;
    let description = '';
    const additionalDetails: Array<{ label: string; value: string }> = [];

    if (purchaseType === 'subscription' && selectedPlan) {
      const plan = subscriptionPlans[selectedPlan];
      amount = plan.price;
      description = `${plan.name} Subscription`;
      additionalDetails.push(
        { label: 'Plan', value: plan.name },
        { label: 'Billing', value: 'Monthly' },
        { label: 'Renewal Date', value: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString() },
        { label: 'Status', value: 'Active' }
      );
    } else if (purchaseType === 'package' && selectedPackage) {
      amount = selectedPackage.price;
      description = `${selectedPackage.views} Applicant Views`;
      additionalDetails.push(
        { label: 'Views Purchased', value: `${selectedPackage.views}` },
        { label: 'Price Per View', value: `$${selectedPackage.perView}` },
        { label: 'Expiration', value: 'Never (roll over monthly)' }
      );
    }

    return (
      <PaymentConfirmation
        amount={amount}
        description={description}
        transactionId={transactionId}
        paymentMethod={paymentDetails}
        onContinue={onClose}
        additionalDetails={additionalDetails}
      />
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/5 bg-[#121212] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl text-white">Employer Pricing</h1>
              <p className="text-white/60">Find top talent from second-chance candidates</p>
            </div>
            <Button onClick={onClose} variant="ghost" size="icon">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-12">
        {/* Subscription Plans */}
        <div>
          <h2 className="text-2xl mb-6 text-white">Monthly Subscription Plans</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {(Object.keys(subscriptionPlans) as Array<'starter' | 'professional' | 'enterprise'>).map((key) => {
              const plan = subscriptionPlans[key];
              const Icon = plan.icon;
              const isCurrentPlan = currentPlan === key;

              return (
                <Card
                  key={key}
                  className={`bg-[#121212] border-white/10 p-6 relative ${
                    plan.popular ? 'ring-2 ring-[#A8F32C]' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-[#A8F32C] text-black border-[#A8F32C]">
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  {isCurrentPlan && (
                    <div className="absolute -top-3 right-4">
                      <Badge className="bg-blue-500 text-white border-blue-500">
                        Current Plan
                      </Badge>
                    </div>
                  )}

                  <div className="mb-6">
                    <div className={`w-12 h-12 rounded-full bg-${plan.color}-500/20 flex items-center justify-center mb-4`}>
                      <Icon className={`h-6 w-6 text-${plan.color}-400`} />
                    </div>
                    <div className="text-2xl text-white mb-2">{plan.name}</div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl text-white">${plan.price}</span>
                      <span className="text-white/60">/mo</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                        <span className="text-white/80 text-sm">{feature}</span>
                      </div>
                    ))}

                    {plan.notIncluded.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <X className="h-5 w-5 text-white/30 flex-shrink-0 mt-0.5" />
                        <span className="text-white/40 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    className={`w-full h-12 ${
                      plan.popular
                        ? 'bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                    onClick={() => handleSelectSubscription(key)}
                    disabled={isCurrentPlan}
                  >
                    {isCurrentPlan ? 'Current Plan' : 'Get Started'}
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Applicant View Packages */}
        <Card className="bg-[#121212] border-white/10 p-8">
          <h2 className="text-2xl mb-2 text-white">Applicant View Packages</h2>
          <p className="text-white/60 mb-6">
            Need more views? Purchase additional packages that never expire.
          </p>

          <div className="grid md:grid-cols-4 gap-4">
            {applicantPackages.map((pkg, index) => (
              <Card
                key={index}
                className={`bg-black/50 border-white/10 p-6 relative ${
                  pkg.popular ? 'ring-2 ring-[#A8F32C]' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-[#A8F32C] text-black">Best Value</Badge>
                  </div>
                )}

                <div className="text-3xl text-white mb-1">{pkg.views}</div>
                <div className="text-white/60 mb-4">Applicant Views</div>

                <div className="text-2xl text-[#A8F32C] mb-1">${pkg.price}</div>
                <div className="text-sm text-white/60 mb-4">${pkg.perView}/view</div>

                <Button
                  className="w-full bg-white/10 text-white hover:bg-white/20"
                  onClick={() => handleSelectPackage(pkg)}
                >
                  Purchase Package
                </Button>
              </Card>
            ))}
          </div>
        </Card>

        {/* FastTrack Add-On */}
        <Card className="bg-gradient-to-r from-[#A8F32C]/10 to-transparent border-[#A8F32C]/30 p-8">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 rounded-full bg-[#A8F32C]/20 flex items-center justify-center flex-shrink-0">
              <Zap className="h-8 w-8 text-[#A8F32C]" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl mb-2 text-white">FastTrack Job Postings</h2>
              <p className="text-white/80 mb-4">
                Get instant applications with our FastTrack feature. Candidates can apply in one click with pre-filled WOTC information.
              </p>

              <div className="bg-black/50 border border-white/10 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-white">FastTrack Per Job:</span>
                  <span className="text-2xl text-[#A8F32C]">${fastTrackPricing.perJob}</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-white/80">One-click applications</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-white/80">WOTC pre-screening included</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-white/80">Higher application rates</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-white/80">48-hour response guarantee</span>
                  </div>
                </div>
              </div>

              <Button className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">
                Enable FastTrack on Jobs
              </Button>
            </div>
          </div>
        </Card>

        {/* FairPath Staffing Pricing */}
        <Card className="bg-[#121212] border-white/10 p-8">
          <div className="flex items-start gap-4 mb-6">
            <Users className="h-8 w-8 text-blue-400" />
            <div>
              <h2 className="text-2xl mb-2 text-white">FairPath Staffing Integration</h2>
              <p className="text-white/60">
                Let our staffing partners handle sourcing, screening, and placement for you
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {staffingPricing.map((option, index) => (
              <Card
                key={index}
                className={`bg-black/50 border-white/10 p-6 ${
                  option.popular ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                {option.popular && (
                  <Badge className="bg-blue-500 text-white mb-3">Recommended</Badge>
                )}

                <div className="text-xl text-white mb-2">{option.name}</div>
                <div className="text-2xl text-[#A8F32C] mb-1">
                  {typeof option.price === 'number' ? `$${option.price}` : option.price}
                </div>
                <div className="text-sm text-white/60 mb-4">{option.description}</div>

                <div className="space-y-2 mb-4">
                  {option.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                      <span className="text-white/80 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full border-white/20 text-white">
                  Learn More
                </Button>
              </Card>
            ))}
          </div>
        </Card>

        {/* WOTC Filing Service */}
        <Card className="bg-gradient-to-r from-green-500/10 to-transparent border-green-500/30 p-8">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
              <FileText className="h-8 w-8 text-green-400" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl mb-2 text-white">WOTC Filing Service</h2>
              <p className="text-white/80 mb-4">
                We handle all WOTC paperwork and filing so you can claim your tax credits hassle-free.
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <Card className="bg-black/50 border-white/10 p-4">
                  <div className="text-lg text-white mb-2">DIY WOTC Filing</div>
                  <div className="text-2xl text-white mb-3">Free</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">WOTC calculator</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">Form 8850 & 9061 templates</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">Filing deadline reminders</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">Self-service support</span>
                    </div>
                  </div>
                </Card>

                <Card className="bg-black/50 border-white/10 p-4 ring-2 ring-green-500">
                  <Badge className="bg-green-500 text-white mb-2">Hassle-Free</Badge>
                  <div className="text-lg text-white mb-2">Full WOTC Filing Service</div>
                  <div className="text-2xl text-[#A8F32C] mb-3">$99/hire</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">We complete all forms</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">We file with state agency</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">Certification tracking</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">Guarantee: $500 if we miss a credit</span>
                    </div>
                  </div>
                  <Button className="w-full bg-green-500 text-white hover:bg-green-600 mt-4">
                    Get WOTC Filing Service
                  </Button>
                </Card>
              </div>

              <div className="bg-black/50 border border-white/10 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-white/80">
                    <strong className="text-white">Success Guarantee:</strong> If we handle your WOTC filing and you miss out on a credit due to our error, 
                    we'll pay you $500. That's how confident we are in our service.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Tax Credit Calculator */}
        <Card className="bg-black/50 border-white/10 p-8">
          <h2 className="text-2xl mb-4 text-white">Estimate Your WOTC Savings</h2>
          <p className="text-white/60 mb-6">
            See how much you could save by hiring WOTC-eligible candidates
          </p>

          <div className="grid md:grid-cols-4 gap-4">
            <Card className="bg-[#121212] border-white/10 p-4">
              <div className="text-white/60 mb-1">Ex-Felon (0-12 months)</div>
              <div className="text-3xl text-green-400">$2,400</div>
              <div className="text-sm text-white/60">per qualified hire</div>
            </Card>

            <Card className="bg-[#121212] border-white/10 p-4">
              <div className="text-white/60 mb-1">Long-Term Unemployed</div>
              <div className="text-3xl text-green-400">$9,600</div>
              <div className="text-sm text-white/60">per qualified hire</div>
            </Card>

            <Card className="bg-[#121212] border-white/10 p-4">
              <div className="text-white/60 mb-1">SNAP Recipients</div>
              <div className="text-3xl text-green-400">$2,400</div>
              <div className="text-sm text-white/60">per qualified hire</div>
            </Card>

            <Card className="bg-[#121212] border-white/10 p-4">
              <div className="text-white/60 mb-1">Veterans</div>
              <div className="text-3xl text-green-400">$2,400-$9,600</div>
              <div className="text-sm text-white/60">based on category</div>
            </Card>
          </div>

          <div className="mt-6 bg-gradient-to-r from-green-500/10 to-transparent border border-green-500/30 rounded-lg p-4">
            <div className="text-lg text-white mb-2">Example: Hire 10 qualified candidates/year</div>
            <div className="text-white/80 mb-2">
              Average credit: $3,500/hire × 10 hires = <strong className="text-green-400">$35,000 in tax credits</strong>
            </div>
            <div className="text-sm text-white/60">
              Professional plan: $199.99/mo × 12 = $2,399.88/year investment for $35,000 in savings
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
