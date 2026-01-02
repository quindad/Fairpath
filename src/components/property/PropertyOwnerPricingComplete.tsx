import { useState } from 'react';
import { Home, Eye, Check, ArrowLeft, Crown, CreditCard } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import LogoWithTagline from '../common/LogoWithTagline';
import PaymentSuccessScreen from './PaymentSuccessScreen';

interface PropertyOwnerPricingCompleteProps {
  onSelectPlan: (planId: string, planType: string) => void;
  onApplyWaiver: () => void;
  onBack: () => void;
}

export default function PropertyOwnerPricingComplete({ onSelectPlan, onApplyWaiver, onBack }: PropertyOwnerPricingCompleteProps) {
  const [selectedTab, setSelectedTab] = useState<'listings' | 'packages' | 'premium'>('listings');
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{ id: string; name: string; price: string; type: string } | null>(null);

  const handleSelectPlan = (planId: string, planName: string, price: string, type: string) => {
    // Free setup goes directly through
    if (planId === 'free-setup') {
      onSelectPlan(planId, type);
      return;
    }

    // Show payment for paid plans
    setSelectedPlan({ id: planId, name: planName, price, type });
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    if (selectedPlan) {
      onSelectPlan(selectedPlan.id, selectedPlan.type);
    }
  };

  if (showPayment && selectedPlan) {
    return (
      <PaymentSuccessScreen
        planName={selectedPlan.name}
        amount={selectedPlan.price}
        planType={selectedPlan.type}
        onContinue={handlePaymentSuccess}
      />
    );
  }

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
            <LogoWithTagline size="lg" className="mb-6 justify-center" />
            <h1 className="text-4xl mb-3">Flexible Pricing for Every Landlord</h1>
            <p className="text-lg text-white/60">
              Choose per-listing fees, applicant view packages, or unlimited premium access
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-white/5 bg-[#121212] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-2">
            {[
              { id: 'listings', label: 'Per-Listing Fees', icon: Home },
              { id: 'packages', label: 'View Packages', icon: Eye },
              { id: 'premium', label: 'Unlimited', icon: Crown }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 transition-all ${
                  selectedTab === tab.id
                    ? 'border-b-2 border-[#A8F32C] text-[#A8F32C]'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Per-Listing Fees Tab */}
        {selectedTab === 'listings' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl mb-2">Pay Per Listing</h2>
              <p className="text-white/60">Perfect for landlords with just a few units</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* FREE SETUP FIRST! */}
              <Card className="bg-gradient-to-br from-[#A8F32C]/10 via-[#121212] to-[#121212] border-[#A8F32C] p-6">
                <Badge className="mb-4 bg-[#A8F32C] text-black border-0">
                  MOST POPULAR
                </Badge>
                <div className="flex items-center gap-3 mb-4">
                  <Home className="h-6 w-6 text-[#A8F32C]" />
                  <h3 className="text-xl">Free Setup</h3>
                </div>
                <div className="mb-6">
                  <div className="text-4xl mb-2">$0</div>
                  <div className="text-sm text-white/60">Explore before you pay</div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Create your profile</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Browse applicants (view only)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">See how the platform works</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Upgrade anytime to list properties</span>
                  </li>
                </ul>
                <Button
                  onClick={() => handleSelectPlan('free-setup', 'Free Setup', '$0', 'per-listing')}
                  className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
                >
                  Start Free
                </Button>
              </Card>

              {/* Basic Listing */}
              <Card className="bg-[#121212] border-white/10 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Home className="h-6 w-6 text-white/60" />
                  <h3 className="text-xl">Basic Listing</h3>
                </div>
                <div className="mb-6">
                  <div className="text-4xl mb-2">$14.99</div>
                  <div className="text-sm text-white/60">per property/month</div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Standard visibility</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">FastTrack applications ($30/app revenue)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Application management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Eligibility filtering</span>
                  </li>
                </ul>
                <Button
                  onClick={() => handleSelectPlan('basic-listing', 'Basic Listing', '$14.99', 'per-listing')}
                  variant="outline"
                  className="w-full border-[#A8F32C]/50 text-[#A8F32C] hover:bg-[#A8F32C]/10"
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Select Plan
                </Button>
              </Card>

              {/* Featured Listing */}
              <Card className="bg-[#121212] border-white/10 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Crown className="h-6 w-6 text-yellow-500" />
                  <h3 className="text-xl">Featured Listing</h3>
                </div>
                <div className="mb-6">
                  <div className="text-4xl mb-2">$24.99</div>
                  <div className="text-sm text-white/60">per property/month</div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Priority placement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Featured badge</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">FastTrack applications ($30/app revenue)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Advanced analytics</span>
                  </li>
                </ul>
                <Button
                  onClick={() => handleSelectPlan('featured-listing', 'Featured Listing', '$24.99', 'per-listing')}
                  variant="outline"
                  className="w-full border-[#A8F32C]/50 text-[#A8F32C] hover:bg-[#A8F32C]/10"
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Select Plan
                </Button>
              </Card>
            </div>
          </div>
        )}

        {/* View Packages Tab */}
        {selectedTab === 'packages' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl mb-2">Applicant View Packages</h2>
              <p className="text-white/60">One-time purchase for bulk applicant viewing</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-[#121212] border-white/10 p-6">
                <h3 className="text-xl mb-4">Starter</h3>
                <div className="mb-6">
                  <div className="text-4xl mb-2">$49.99</div>
                  <div className="text-sm text-white/60">50 applicant views</div>
                </div>
                <Button
                  onClick={() => handleSelectPlan('view-50', 'Starter Package', '$49.99', 'view-package')}
                  variant="outline"
                  className="w-full border-[#A8F32C]/50 text-[#A8F32C]"
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Purchase
                </Button>
              </Card>

              <Card className="bg-[#121212] border-[#A8F32C]/30 p-6">
                <Badge className="mb-2 bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30">
                  BEST VALUE
                </Badge>
                <h3 className="text-xl mb-4">Growth</h3>
                <div className="mb-6">
                  <div className="text-4xl mb-2">$89.99</div>
                  <div className="text-sm text-white/60">100 applicant views</div>
                </div>
                <Button
                  onClick={() => handleSelectPlan('view-100', 'Growth Package', '$89.99', 'view-package')}
                  className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Purchase
                </Button>
              </Card>

              <Card className="bg-[#121212] border-white/10 p-6">
                <h3 className="text-xl mb-4">Enterprise</h3>
                <div className="mb-6">
                  <div className="text-4xl mb-2">$159.99</div>
                  <div className="text-sm text-white/60">200 applicant views</div>
                </div>
                <Button
                  onClick={() => handleSelectPlan('view-200', 'Enterprise Package', '$159.99', 'view-package')}
                  variant="outline"
                  className="w-full border-[#A8F32C]/50 text-[#A8F32C]"
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Purchase
                </Button>
              </Card>
            </div>
          </div>
        )}

        {/* Premium Unlimited Tab */}
        {selectedTab === 'premium' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl mb-2">Premium Unlimited Access</h2>
              <p className="text-white/60">For property management companies & large portfolios</p>
            </div>

            <div className="max-w-2xl mx-auto">
              <Card className="bg-gradient-to-br from-[#A8F32C]/20 via-[#121212] to-[#121212] border-[#A8F32C] p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Crown className="h-8 w-8 text-[#A8F32C]" />
                  <h3 className="text-2xl">Premium Unlimited</h3>
                </div>
                
                <div className="mb-6">
                  <div className="text-5xl mb-2">$99.99</div>
                  <div className="text-white/60">per month or</div>
                  <div className="text-3xl text-[#A8F32C] mt-2">$999.99/year</div>
                  <div className="text-sm text-[#A8F32C]">Save $200 annually</div>
                </div>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span>Unlimited property listings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span>Priority placement for all listings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span>Full FastTrack revenue ($30/app on ALL applications)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span>Advanced portfolio analytics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span>Priority support</span>
                  </li>
                </ul>

                <div className="grid md:grid-cols-2 gap-4">
                  <Button
                    onClick={() => handleSelectPlan('unlimited-monthly', 'Premium Unlimited (Monthly)', '$99.99', 'unlimited')}
                    className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Monthly
                  </Button>
                  <Button
                    onClick={() => handleSelectPlan('unlimited-yearly', 'Premium Unlimited (Annual)', '$999.99', 'unlimited')}
                    variant="outline"
                    className="border-[#A8F32C] text-[#A8F32C] hover:bg-[#A8F32C]/10"
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Annual (Save $200)
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Waiver Option */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-white/5 rounded-lg p-6">
            <p className="text-white/60 mb-4">
              Small business or nonprofit property owner? <span className="text-[#A8F32C]">Apply for a waiver</span>
            </p>
            <Button
              onClick={onApplyWaiver}
              variant="outline"
              className="border-[#A8F32C]/50 text-[#A8F32C] hover:bg-[#A8F32C]/10"
            >
              Apply for Waiver Program
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
