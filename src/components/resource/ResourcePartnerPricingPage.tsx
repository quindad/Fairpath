import { useState } from 'react';
import { Heart, Users, MessageSquare, BarChart, Check, ArrowLeft, Building } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';

interface ResourcePartnerPricingPageProps {
  onSelectPlan: (planId: string) => void;
  onBack: () => void;
}

export default function ResourcePartnerPricingPage({ onSelectPlan, onBack }: ResourcePartnerPricingPageProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/5 bg-[#121212]">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Button
            onClick={onBack}
            variant="ghost"
            className="mb-4 text-white/60 hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          <div className="text-center max-w-3xl mx-auto">
            <div className="text-xs tracking-widest text-[#A8F32C] mb-2">
              RESOURCE CENTER CRM
            </div>
            <h1 className="text-4xl mb-3">Coordinate Care, Track Outcomes</h1>
            <p className="text-lg text-white/60">
              UniteUs-style CRM for nonprofits and reentry organizations. Manage clients, make referrals, 
              and collaborate with other service providers.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-[#121212] border border-white/10 rounded-lg p-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-lg transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-[#A8F32C] text-black'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-lg transition-all ${
                billingCycle === 'yearly'
                  ? 'bg-[#A8F32C] text-black'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Yearly <span className="text-xs ml-1">(Save 17%)</span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Small Organization */}
          <Card className="bg-[#121212] border-white/10 p-6">
            <div className="mb-6">
              <Badge className="mb-3 bg-white/10 text-white border-0">SMALL</Badge>
              <h3 className="text-2xl mb-2">Small Organization</h3>
              <p className="text-sm text-white/60 mb-4">1-25 clients per month</p>
              <div className="space-y-2">
                {billingCycle === 'monthly' ? (
                  <div className="text-4xl">$69.99<span className="text-base text-white/60">/mo</span></div>
                ) : (
                  <>
                    <div className="text-4xl">$699.99<span className="text-base text-white/60">/yr</span></div>
                    <div className="text-sm text-[#A8F32C]">Save $140 per year</div>
                  </>
                )}
              </div>
            </div>

            <div className="mb-6">
              <div className="text-sm text-white/60 mb-2">Base: $49.99/mo + Org Size: $20/mo</div>
            </div>

            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                <span className="text-sm">5 user seats included</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                <span className="text-sm">Unlimited client contacts</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                <span className="text-sm">Unlimited referrals</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                <span className="text-sm">Outreach tools</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                <span className="text-sm">Direct messaging with app users</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                <span className="text-sm">Client case notes</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                <span className="text-sm">Basic reporting</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                <span className="text-sm">Email support</span>
              </li>
            </ul>

            <Button 
              onClick={() => onSelectPlan(billingCycle === 'monthly' ? 'crm-small-monthly' : 'crm-small-yearly')}
              variant="outline"
              className="w-full border-white/20 hover:bg-white/5"
            >
              Get Started
            </Button>
          </Card>

          {/* Medium Organization */}
          <Card className="bg-gradient-to-br from-[#A8F32C]/10 via-[#121212] to-[#121212] border-[#A8F32C]/50 p-6 relative">
            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#A8F32C] text-black border-0">
              MOST POPULAR
            </Badge>
            <div className="mb-6">
              <Badge className="mb-3 bg-[#A8F32C]/20 text-[#A8F32C] border-0">MEDIUM</Badge>
              <h3 className="text-2xl mb-2">Medium Organization</h3>
              <p className="text-sm text-white/60 mb-4">26-100 clients per month</p>
              <div className="space-y-2">
                {billingCycle === 'monthly' ? (
                  <div className="text-4xl">$89.99<span className="text-base text-white/60">/mo</span></div>
                ) : (
                  <>
                    <div className="text-4xl">$899.99<span className="text-base text-white/60">/yr</span></div>
                    <div className="text-sm text-[#A8F32C]">Save $180 per year</div>
                  </>
                )}
              </div>
            </div>

            <div className="mb-6">
              <div className="text-sm text-white/60 mb-2">Base: $49.99/mo + Org Size: $40/mo</div>
            </div>

            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                <span className="text-sm">Everything in Small</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                <span className="text-sm">Advanced analytics</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                <span className="text-sm">Outcome tracking</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                <span className="text-sm">Custom reports</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                <span className="text-sm">Priority support</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                <span className="text-sm">Grant reporting tools</span>
              </li>
            </ul>

            <Button 
              onClick={() => onSelectPlan(billingCycle === 'monthly' ? 'crm-medium-monthly' : 'crm-medium-yearly')}
              className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
            >
              Get Started
            </Button>
          </Card>

          {/* Large Organization */}
          <Card className="bg-[#121212] border-white/10 p-6">
            <div className="mb-6">
              <Badge className="mb-3 bg-white/10 text-white border-0">LARGE</Badge>
              <h3 className="text-2xl mb-2">Large Organization</h3>
              <p className="text-sm text-white/60 mb-4">100+ clients per month</p>
              <div className="space-y-2">
                {billingCycle === 'monthly' ? (
                  <div className="text-4xl">$129.99<span className="text-base text-white/60">/mo</span></div>
                ) : (
                  <>
                    <div className="text-4xl">$1,299.99<span className="text-base text-white/60">/yr</span></div>
                    <div className="text-sm text-[#A8F32C]">Save $260 per year</div>
                  </>
                )}
              </div>
            </div>

            <div className="mb-6">
              <div className="text-sm text-white/60 mb-2">Base: $49.99/mo + Org Size: $80/mo</div>
            </div>

            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                <span className="text-sm">Everything in Medium</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                <span className="text-sm">Dedicated account manager</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                <span className="text-sm">Custom training</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                <span className="text-sm">API access</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                <span className="text-sm">White-label options</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                <span className="text-sm">24/7 priority support</span>
              </li>
            </ul>

            <Button 
              onClick={() => onSelectPlan(billingCycle === 'monthly' ? 'crm-large-monthly' : 'crm-large-yearly')}
              variant="outline"
              className="w-full border-white/20 hover:bg-white/5"
            >
              Get Started
            </Button>
          </Card>
        </div>

        {/* User Seats Add-on */}
        <Card className="bg-[#121212] border-white/10 p-8 mt-12 max-w-4xl mx-auto">
          <div className="flex items-start gap-6">
            <Users className="h-12 w-12 text-[#A8F32C] flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-2xl mb-2">Need More User Seats?</h3>
              <p className="text-white/60 mb-4">
                All plans include 5 user seats. Add more for your team.
              </p>
              <div className="flex items-baseline gap-3 mb-4">
                <div className="text-4xl">$50<span className="text-base text-white/60">/mo</span></div>
                <div className="text-white/60">per 3 additional seats</div>
              </div>
              <p className="text-sm text-white/60">
                Add as many blocks as you need. Each block gives you 3 more user seats.
              </p>
            </div>
          </div>
        </Card>

        {/* Features Banner */}
        <div className="mt-12">
          <h3 className="text-2xl text-center mb-8">Every Plan Includes</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="bg-[#121212] border-white/10 p-6 text-center">
              <MessageSquare className="h-8 w-8 text-[#A8F32C] mx-auto mb-3" />
              <h4 className="mb-2">Direct Messaging</h4>
              <p className="text-sm text-white/60">
                Message app users directly for follow-ups and support
              </p>
            </Card>

            <Card className="bg-[#121212] border-white/10 p-6 text-center">
              <Heart className="h-8 w-8 text-[#A8F32C] mx-auto mb-3" />
              <h4 className="mb-2">Referral Network</h4>
              <p className="text-sm text-white/60">
                Make warm handoffs to other service providers
              </p>
            </Card>

            <Card className="bg-[#121212] border-white/10 p-6 text-center">
              <BarChart className="h-8 w-8 text-[#A8F32C] mx-auto mb-3" />
              <h4 className="mb-2">Analytics</h4>
              <p className="text-sm text-white/60">
                Track outcomes and demonstrate impact
              </p>
            </Card>

            <Card className="bg-[#121212] border-white/10 p-6 text-center">
              <Building className="h-8 w-8 text-[#A8F32C] mx-auto mb-3" />
              <h4 className="mb-2">Resource Posting</h4>
              <p className="text-sm text-white/60">
                Post services visible to all app users
              </p>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-white/60 mb-4">
            Questions about which plan is right for your organization?
          </p>
          <Button
            variant="outline"
            className="border-[#A8F32C] text-[#A8F32C] hover:bg-[#A8F32C] hover:text-black"
          >
            Schedule a Demo
          </Button>
        </div>
      </div>
    </div>
  );
}
