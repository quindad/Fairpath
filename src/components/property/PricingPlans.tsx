import { useState } from 'react';
import { Check, Zap, Crown, Building2, DollarSign, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import PaymentMethodSelector from '../payment/PaymentMethodSelector';
import PaymentConfirmation from '../payment/PaymentConfirmation';

interface PricingPlansProps {
  onSubscribe: (plan: string, paymentDetails: any) => void;
  onClose: () => void;
  currentPlan?: string;
}

export default function PricingPlans({ onSubscribe, onClose, currentPlan }: PricingPlansProps) {
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'featured' | 'premium' | null>(null);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [step, setStep] = useState<'plans' | 'payment' | 'confirmation'>('plans');
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [transactionId] = useState(`SUB-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`);

  const plans = {
    basic: {
      name: 'Basic Listing',
      price: { monthly: 14.99, annual: 149.99 },
      icon: Building2,
      color: 'blue',
      features: [
        'List up to 3 properties',
        'Basic property photos (up to 8)',
        'Standard listing placement',
        'Email notifications',
        'Applicant messaging',
        'Credit & background reports',
        '30-day listing duration',
        'Basic analytics'
      ],
      notIncluded: [
        'Featured placement',
        'Priority support',
        'FastTrack revenue share'
      ]
    },
    featured: {
      name: 'Featured Listing',
      price: { monthly: 24.99, annual: 249.99 },
      icon: Zap,
      color: '[#A8F32C]',
      popular: true,
      features: [
        'List up to 10 properties',
        'Unlimited property photos',
        'Featured listing placement',
        'Priority in search results',
        'SMS + Email notifications',
        'Advanced applicant screening',
        '60-day listing duration',
        'Detailed analytics dashboard',
        'FastTrack revenue share eligible',
        'Highlighted in second-chance searches'
      ],
      notIncluded: [
        'Dedicated account manager',
        'Custom branding'
      ]
    },
    premium: {
      name: 'Premium',
      price: { monthly: 99.99, annual: 999 },
      icon: Crown,
      color: 'yellow',
      features: [
        'Unlimited property listings',
        'Unlimited photos & virtual tours',
        'Top-tier placement (always first)',
        'Dedicated account manager',
        'Priority phone support',
        'Comprehensive screening suite',
        '90-day listing duration',
        'Advanced analytics & reporting',
        'FastTrack revenue share (premium tier)',
        'Custom branding on listings',
        'White-label applicant portal',
        'API access',
        'Early access to new features',
        'Tenant retention tools'
      ],
      notIncluded: []
    }
  };

  const applicantPackages = [
    { views: 50, price: 100, perView: 2.00 },
    { views: 100, price: 200, perView: 2.00, popular: true },
    { views: 200, price: 400, perView: 2.00 },
    { views: 'Unlimited', price: 299.99, perView: '—', tier: 'monthly' },
    { views: 'Unlimited', price: 599.99, perView: '—', tier: 'quarterly' },
    { views: 'Unlimited', price: 799.99, perView: '—', tier: 'annual' }
  ];

  const handleSelectPlan = (plan: 'basic' | 'featured' | 'premium') => {
    setSelectedPlan(plan);
    setStep('payment');
  };

  const handlePaymentComplete = (method: 'stripe' | 'paypal', details: any) => {
    setPaymentDetails(details);
    setStep('confirmation');
    
    setTimeout(() => {
      if (selectedPlan) {
        onSubscribe(selectedPlan, {
          ...details,
          billingCycle,
          transactionId
        });
      }
    }, 2000);
  };

  const getPrice = (plan: 'basic' | 'featured' | 'premium') => {
    return billingCycle === 'monthly' ? plans[plan].price.monthly : plans[plan].price.annual;
  };

  const getSavings = (plan: 'basic' | 'featured' | 'premium') => {
    const monthlyTotal = plans[plan].price.monthly * 12;
    const annualPrice = plans[plan].price.annual;
    return monthlyTotal - annualPrice;
  };

  if (step === 'payment' && selectedPlan) {
    const plan = plans[selectedPlan];
    const price = getPrice(selectedPlan);

    return (
      <div className="min-h-screen bg-black text-white">
        <div className="border-b border-white/5 bg-[#121212] sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl text-white">Complete Your Subscription</h1>
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
                <div className="text-2xl text-white mb-1">{plan.name}</div>
                <div className="text-white/60">
                  Billed {billingCycle === 'monthly' ? 'Monthly' : 'Annually'}
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl text-[#A8F32C]">${price}</div>
                <div className="text-sm text-white/60">
                  {billingCycle === 'annual' && `Save $${getSavings(selectedPlan).toFixed(2)}/year`}
                </div>
              </div>
            </div>
          </Card>

          <PaymentMethodSelector
            amount={price}
            description={`${plan.name} - ${billingCycle === 'monthly' ? 'Monthly' : 'Annual'} Subscription`}
            onPaymentMethodSelected={handlePaymentComplete}
            onCancel={() => setStep('plans')}
          />
        </div>
      </div>
    );
  }

  if (step === 'confirmation' && selectedPlan) {
    const plan = plans[selectedPlan];
    const price = getPrice(selectedPlan);

    return (
      <PaymentConfirmation
        amount={price}
        description={`${plan.name} Subscription`}
        transactionId={transactionId}
        paymentMethod={paymentDetails}
        onContinue={onClose}
        additionalDetails={[
          { label: 'Plan', value: plan.name },
          { label: 'Billing Cycle', value: billingCycle === 'monthly' ? 'Monthly' : 'Annual' },
          { label: 'Renewal Date', value: new Date(Date.now() + (billingCycle === 'monthly' ? 30 : 365) * 24 * 60 * 60 * 1000).toLocaleDateString() },
          { label: 'Status', value: 'Active' }
        ]}
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
              <h1 className="text-3xl text-white">Property Owner Pricing</h1>
              <p className="text-white/60">Choose the perfect plan for your rental business</p>
            </div>
            <Button onClick={onClose} variant="ghost" size="icon">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <Button
            variant={billingCycle === 'monthly' ? 'default' : 'outline'}
            className={billingCycle === 'monthly' ? 'bg-[#A8F32C] text-black' : 'border-white/20 text-white'}
            onClick={() => setBillingCycle('monthly')}
          >
            Monthly
          </Button>
          <Button
            variant={billingCycle === 'annual' ? 'default' : 'outline'}
            className={billingCycle === 'annual' ? 'bg-[#A8F32C] text-black' : 'border-white/20 text-white'}
            onClick={() => setBillingCycle('annual')}
          >
            Annual
            <Badge className="ml-2 bg-green-500 text-white">Save up to 17%</Badge>
          </Button>
        </div>

        {/* Subscription Plans */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {(Object.keys(plans) as Array<'basic' | 'featured' | 'premium'>).map((key) => {
            const plan = plans[key];
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
                    <span className="text-4xl text-white">${plan.price[billingCycle]}</span>
                    <span className="text-white/60">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                  </div>
                  {billingCycle === 'annual' && (
                    <div className="text-sm text-green-400 mt-1">
                      Save ${getSavings(key).toFixed(2)}/year
                    </div>
                  )}
                </div>

                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">{feature}</span>
                    </div>
                  ))}

                  {plan.notIncluded.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <X className="h-5 w-5 text-white/30 flex-shrink-0 mt-0.5" />
                      <span className="text-white/40">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className={`w-full h-12 ${
                    plan.popular
                      ? 'bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                  onClick={() => handleSelectPlan(key)}
                  disabled={isCurrentPlan}
                >
                  {isCurrentPlan ? 'Current Plan' : 'Get Started'}
                </Button>
              </Card>
            );
          })}
        </div>

        {/* Applicant View Packages */}
        <Card className="bg-[#121212] border-white/10 p-8 mb-12">
          <h2 className="text-2xl mb-2 text-white">Applicant View Packages</h2>
          <p className="text-white/60 mb-6">
            Purchase views to access applicant profiles. Each view unlocks full application details.
          </p>

          <div className="grid md:grid-cols-3 gap-4">
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
                <div className="text-white/60 mb-4">
                  {typeof pkg.views === 'number' ? 'Applicant Views' : pkg.tier}
                </div>

                <div className="text-2xl text-[#A8F32C] mb-1">${pkg.price}</div>
                <div className="text-sm text-white/60 mb-4">
                  {typeof pkg.perView === 'number' ? `$${pkg.perView}/view` : 'Unlimited'}
                </div>

                <Button
                  className="w-full bg-white/10 text-white hover:bg-white/20"
                  onClick={() => alert('Applicant package purchase coming soon!')}
                >
                  Purchase Package
                </Button>
              </Card>
            ))}
          </div>

          <div className="mt-6 bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 flex items-start gap-3">
            <DollarSign className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-white/80">
              <strong className="text-white">FastTrack Revenue Share:</strong> Earn 60% of FastTrack application fees when you rent to applicants! 
              Premium plan members get enhanced revenue share terms.
            </div>
          </div>
        </Card>

        {/* Waiver Program */}
        <Card className="bg-gradient-to-r from-green-500/10 to-transparent border-green-500/30 p-8">
          <h2 className="text-2xl mb-2 text-white">Fee Waiver Program</h2>
          <p className="text-white/60 mb-6">
            Qualify for free listing fees by committing to second-chance housing
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-black/50 border-white/10 p-6">
              <div className="text-xl text-white mb-3">30-Day Free Trial</div>
              <div className="text-white/80 mb-4">
                Requirements:
              </div>
              <div className="space-y-2 mb-6">
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-white/80">Accept at least 1 felon application per 20 applicants</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-white/80">Provide guaranteed showings</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-white/80">Give valid denial reasons</span>
                </div>
              </div>
              <Button className="w-full bg-green-500 text-white hover:bg-green-600">
                Apply for 30-Day Waiver
              </Button>
            </Card>

            <Card className="bg-black/50 border-white/10 p-6">
              <div className="text-xl text-white mb-3">15-Day Free Trial</div>
              <div className="text-white/80 mb-4">
                Requirements:
              </div>
              <div className="space-y-2 mb-6">
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-white/80">List at least 3 properties</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-white/80">Participate in FairPath network</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-white/80">Provide fair consideration</span>
                </div>
              </div>
              <Button className="w-full bg-green-500/80 text-white hover:bg-green-600/80">
                Apply for 15-Day Waiver
              </Button>
            </Card>
          </div>
        </Card>
      </div>
    </div>
  );
}
