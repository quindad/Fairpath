import { Crown, Zap, Check, X, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

interface PlanComparisonCompleteProps {
  currentPlan: 'free' | 'plus' | 'pro';
  onUpgrade: (tier: 'plus' | 'pro') => void;
  onClose: () => void;
}

export default function PlanComparisonComplete({ currentPlan, onUpgrade, onClose }: PlanComparisonCompleteProps) {
  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      badge: null,
      description: 'Perfect for getting started',
      features: {
        marketplaceClaims: 2,
        fastTrackPrice: 75,
        servicesDiscount: 0,
        aiTools: false,
        verifiedBadge: false,
        prioritySupport: false,
        earlyAccess: false,
        gigPosting: false,
      },
    },
    {
      id: 'plus',
      name: 'Plus',
      price: 2,
      badge: { text: 'Most Popular', color: 'blue' },
      description: 'Save money and get more opportunities',
      features: {
        marketplaceClaims: 5,
        fastTrackPrice: 70,
        servicesDiscount: 5,
        aiTools: false,
        verifiedBadge: true,
        prioritySupport: true,
        earlyAccess: false,
        gigPosting: false,
      },
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 5,
      badge: { text: 'Best Value', color: 'green' },
      description: 'Everything you need to succeed',
      features: {
        marketplaceClaims: 10,
        fastTrackPrice: 65,
        servicesDiscount: 10,
        aiTools: true,
        verifiedBadge: true,
        prioritySupport: true,
        earlyAccess: true,
        gigPosting: true,
      },
    },
  ];

  const featureRows = [
    { 
      key: 'marketplaceClaims', 
      label: 'Marketplace claims per month',
      format: (val: number) => `${val} free items`,
    },
    { 
      key: 'fastTrackPrice', 
      label: 'FastTrack housing application fee',
      format: (val: number) => `$${val}`,
    },
    { 
      key: 'servicesDiscount', 
      label: 'Service booking discount',
      format: (val: number) => val > 0 ? `$${val} off` : 'None',
    },
    { 
      key: 'aiTools', 
      label: 'AI tools (resume, cover letter, etc.)',
      format: (val: boolean) => val,
    },
    { 
      key: 'verifiedBadge', 
      label: 'Verified profile badge',
      format: (val: boolean) => val,
    },
    { 
      key: 'prioritySupport', 
      label: 'Priority support',
      format: (val: boolean) => val,
    },
    { 
      key: 'earlyAccess', 
      label: 'Early access to new features',
      format: (val: boolean) => val,
    },
    { 
      key: 'gigPosting', 
      label: 'Post gigs to earn extra income',
      format: (val: boolean) => val,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        <Button
          variant="ghost"
          className="text-white/60 hover:text-white mb-6"
          onClick={onClose}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-4xl mb-3">Choose Your Plan</h1>
          <p className="text-white/60 text-lg">
            Upgrade anytime. Cancel anytime. No hidden fees.
          </p>
        </div>

        {/* Plan Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`p-6 relative ${
                plan.id === currentPlan
                  ? 'bg-[#A8F32C]/10 border-[#A8F32C]'
                  : 'bg-[#121212] border-white/10'
              }`}
            >
              {plan.badge && (
                <Badge
                  className={`absolute top-4 right-4 ${
                    plan.badge.color === 'blue'
                      ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                      : 'bg-green-500/20 text-green-400 border-green-500/30'
                  }`}
                >
                  {plan.badge.text}
                </Badge>
              )}

              {plan.id === currentPlan && (
                <Badge className="absolute top-4 left-4 bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30">
                  Current Plan
                </Badge>
              )}

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  {plan.id === 'plus' && <Zap className="h-6 w-6 text-blue-400" />}
                  {plan.id === 'pro' && <Crown className="h-6 w-6 text-[#A8F32C]" />}
                  <h3 className="text-2xl">FairPath {plan.name}</h3>
                </div>
                <p className="text-white/60 text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl">${plan.price}</span>
                  <span className="text-white/60">/month</span>
                </div>
              </div>

              {plan.id === 'free' && currentPlan !== 'free' ? (
                <Button variant="outline" className="w-full" disabled>
                  Current plan or higher
                </Button>
              ) : plan.id !== 'free' && currentPlan !== plan.id ? (
                <Button
                  className={`w-full ${
                    plan.id === 'pro'
                      ? 'bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                  onClick={() => onUpgrade(plan.id as 'plus' | 'pro')}
                >
                  {plan.id === 'plus' && currentPlan === 'free' && 'Upgrade to Plus'}
                  {plan.id === 'pro' && currentPlan === 'free' && 'Upgrade to Pro'}
                  {plan.id === 'pro' && currentPlan === 'plus' && 'Upgrade to Pro'}
                  {plan.id === 'plus' && currentPlan === 'pro' && 'Downgrade to Plus'}
                </Button>
              ) : (
                <Button variant="outline" className="w-full" disabled>
                  Current Plan
                </Button>
              )}
            </Card>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <Card className="bg-[#121212] border-white/10 overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-2xl">Compare Features</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="text-left p-4 text-white/60">Feature</th>
                  <th className="p-4 text-center">Free</th>
                  <th className="p-4 text-center bg-blue-500/10">Plus</th>
                  <th className="p-4 text-center bg-[#A8F32C]/10">Pro</th>
                </tr>
              </thead>
              <tbody>
                {featureRows.map((row, index) => (
                  <tr
                    key={row.key}
                    className={index % 2 === 0 ? 'bg-white/5' : ''}
                  >
                    <td className="p-4 text-white/80">{row.label}</td>
                    {plans.map((plan) => {
                      const value = plan.features[row.key as keyof typeof plan.features];
                      const formatted = row.format(value as any);
                      
                      return (
                        <td key={plan.id} className={`p-4 text-center ${
                          plan.id === 'plus' ? 'bg-blue-500/5' : plan.id === 'pro' ? 'bg-[#A8F32C]/5' : ''
                        }`}>
                          {typeof formatted === 'boolean' ? (
                            formatted ? (
                              <Check className="h-5 w-5 text-green-400 mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-white/20 mx-auto" />
                            )
                          ) : (
                            <span className="text-white">{formatted}</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Savings Calculator */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <Card className="bg-gradient-to-br from-blue-500/20 to-transparent border-blue-500/30 p-6">
            <h3 className="text-xl mb-4">💰 Plus Savings Example</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/60">1 FastTrack application:</span>
                <span className="text-white">Save $5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">3 extra marketplace claims:</span>
                <span className="text-white">~$150 value</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Monthly cost:</span>
                <span className="text-red-400">-$2</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-white/10">
                <span className="text-white">Net value:</span>
                <span className="text-[#A8F32C]">~$153/month</span>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-[#A8F32C]/20 to-transparent border-[#A8F32C]/30 p-6">
            <h3 className="text-xl mb-4">⭐ Pro Savings Example</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/60">1 FastTrack application:</span>
                <span className="text-white">Save $10</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">8 extra marketplace claims:</span>
                <span className="text-white">~$400 value</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">AI resume builder:</span>
                <span className="text-white">$20 value</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Monthly cost:</span>
                <span className="text-red-400">-$5</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-white/10">
                <span className="text-white">Net value:</span>
                <span className="text-[#A8F32C]">~$425/month</span>
              </div>
            </div>
          </Card>
        </div>

        {/* FAQ */}
        <Card className="bg-white/5 border-white/10 p-6 mt-8">
          <h3 className="text-xl mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4 text-sm">
            <div>
              <div className="text-white mb-1">Can I cancel anytime?</div>
              <div className="text-white/60">
                Yes! Cancel anytime from your account settings. No questions asked.
              </div>
            </div>
            <div>
              <div className="text-white mb-1">How does the FastTrack discount work?</div>
              <div className="text-white/60">
                The discounted price is applied automatically at checkout when you apply to housing.
              </div>
            </div>
            <div>
              <div className="text-white mb-1">What happens to unused marketplace claims?</div>
              <div className="text-white/60">
                They don't roll over. Use them each month or lose them!
              </div>
            </div>
            <div>
              <div className="text-white mb-1">Can I upgrade from Plus to Pro later?</div>
              <div className="text-white/60">
                Absolutely! You can upgrade or downgrade anytime.
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
