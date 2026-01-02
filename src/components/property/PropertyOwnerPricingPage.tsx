import { useState } from 'react';
import { Home, Eye, Package, Check, X, ArrowLeft, Zap, Building, Crown, Gift } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';

interface PropertyOwnerPricingPageProps {
  onSelectPlan: (planId: string) => void;
  onApplyWaiver: () => void;
  onBack: () => void;
}

export default function PropertyOwnerPricingPage({ onSelectPlan, onApplyWaiver, onBack }: PropertyOwnerPricingPageProps) {
  const [selectedTab, setSelectedTab] = useState<'listings' | 'packages' | 'premium'>('listings');

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
              ADMIN A FELON - PROPERTY OWNERS
            </div>
            <h1 className="text-4xl mb-3">Flexible Pricing for Every Landlord</h1>
            <p className="text-lg text-white/60">
              Choose per-listing fees, applicant view packages, or unlimited premium access. 
              Build your perfect package.
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
              { id: 'packages', label: 'Applicant View Packages', icon: Eye },
              { id: 'premium', label: 'Premium Unlimited', icon: Crown }
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
              {/* Basic Listing */}
              <Card className="bg-[#121212] border-white/10 p-6 hover:border-[#A8F32C]/50 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <Home className="h-6 w-6 text-white/60" />
                  <h3 className="text-xl">Basic Listing</h3>
                </div>
                <div className="mb-6">
                  <div className="text-4xl mb-2">$14.99</div>
                  <div className="text-sm text-white/60">per property listing</div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Standard listing visibility</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Eligibility filtering</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Accept FastTrack applications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">SingleKey screening integration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="h-5 w-5 text-white/20 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white/40">Featured placement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="h-5 w-5 text-white/20 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white/40">Priority in search</span>
                  </li>
                </ul>
                <Button 
                  onClick={() => onSelectPlan('listing-basic')}
                  variant="outline"
                  className="w-full border-white/20 hover:bg-white/5"
                >
                  Get Started
                </Button>
              </Card>

              {/* Featured Listing */}
              <Card className="bg-gradient-to-br from-[#A8F32C]/10 via-[#121212] to-[#121212] border-[#A8F32C]/50 p-6 relative">
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#A8F32C] text-black border-0">
                  POPULAR
                </Badge>
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="h-6 w-6 text-[#A8F32C]" />
                  <h3 className="text-xl">Featured Listing</h3>
                </div>
                <div className="mb-6">
                  <div className="text-4xl mb-2">$24.99</div>
                  <div className="text-sm text-white/60">per property listing</div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Everything in Basic</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Featured placement (top of search)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Priority badge</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">3x more views on average</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Highlighted in mobile app</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Priority support</span>
                  </li>
                </ul>
                <Button 
                  onClick={() => onSelectPlan('listing-featured')}
                  className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
                >
                  Get Featured
                </Button>
              </Card>

              {/* One-Time Setup */}
              <Card className="bg-[#121212] border-white/10 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Building className="h-6 w-6 text-white/60" />
                  <h3 className="text-xl">Free Setup</h3>
                </div>
                <div className="mb-6">
                  <div className="text-4xl mb-2">$0</div>
                  <div className="text-sm text-white/60">create your profile</div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Build your landlord profile</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">See how your listings will look</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Preview dashboard features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">No credit card required</span>
                  </li>
                  <li className="flex items-start gap-2 text-white/40">
                    <span className="text-xs">🔒 Pay only when you list a property</span>
                  </li>
                </ul>
                <Button 
                  onClick={() => onSelectPlan('free-setup')}
                  variant="outline"
                  className="w-full border-white/20 hover:bg-white/5"
                >
                  Create Free Profile
                </Button>
              </Card>
            </div>
          </div>
        )}

        {/* Applicant View Packages Tab */}
        {selectedTab === 'packages' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl mb-2">Applicant View Packages</h2>
              <p className="text-white/60">
                Buy views in bulk and use them whenever you need to review applications
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {/* Pay Per View */}
              <Card className="bg-[#121212] border-white/10 p-6">
                <div className="text-center mb-4">
                  <Eye className="h-8 w-8 text-white/60 mx-auto mb-3" />
                  <h3 className="text-lg mb-2">Pay As You Go</h3>
                  <div className="text-3xl mb-1">$1.25</div>
                  <div className="text-xs text-white/60">per applicant view</div>
                </div>
                <ul className="space-y-2 mb-6 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span>No commitment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span>Perfect for testing</span>
                  </li>
                </ul>
                <Button 
                  onClick={() => onSelectPlan('views-single')}
                  variant="outline"
                  className="w-full border-white/20"
                >
                  Start Viewing
                </Button>
              </Card>

              {/* 50 Views */}
              <Card className="bg-[#121212] border-white/10 p-6">
                <div className="text-center mb-4">
                  <Package className="h-8 w-8 text-white/60 mx-auto mb-3" />
                  <h3 className="text-lg mb-2">Starter Pack</h3>
                  <div className="text-3xl mb-1">$49.99</div>
                  <div className="text-xs text-white/60">50 applicant views</div>
                  <div className="text-xs text-[#A8F32C] mt-1">$1.00 per view</div>
                </div>
                <ul className="space-y-2 mb-6 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span>Save 20%</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span>Never expires</span>
                  </li>
                </ul>
                <Button 
                  onClick={() => onSelectPlan('views-50')}
                  variant="outline"
                  className="w-full border-white/20"
                >
                  Buy Package
                </Button>
              </Card>

              {/* 100 Views */}
              <Card className="bg-gradient-to-br from-[#A8F32C]/10 via-[#121212] to-[#121212] border-[#A8F32C]/50 p-6">
                <Badge className="mb-3 bg-[#A8F32C]/20 text-[#A8F32C] border-0">
                  BEST VALUE
                </Badge>
                <div className="text-center mb-4">
                  <Package className="h-8 w-8 text-[#A8F32C] mx-auto mb-3" />
                  <h3 className="text-lg mb-2">Growth Pack</h3>
                  <div className="text-3xl mb-1">$89.99</div>
                  <div className="text-xs text-white/60">100 applicant views</div>
                  <div className="text-xs text-[#A8F32C] mt-1">$0.90 per view</div>
                </div>
                <ul className="space-y-2 mb-6 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span>Save 28%</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span>Priority support</span>
                  </li>
                </ul>
                <Button 
                  onClick={() => onSelectPlan('views-100')}
                  className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
                >
                  Buy Package
                </Button>
              </Card>

              {/* 200 Views */}
              <Card className="bg-[#121212] border-white/10 p-6">
                <div className="text-center mb-4">
                  <Package className="h-8 w-8 text-white/60 mx-auto mb-3" />
                  <h3 className="text-lg mb-2">Pro Pack</h3>
                  <div className="text-3xl mb-1">$159.99</div>
                  <div className="text-xs text-white/60">200 applicant views</div>
                  <div className="text-xs text-[#A8F32C] mt-1">$0.80 per view</div>
                </div>
                <ul className="space-y-2 mb-6 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span>Save 36%</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span>Dedicated support</span>
                  </li>
                </ul>
                <Button 
                  onClick={() => onSelectPlan('views-200')}
                  variant="outline"
                  className="w-full border-white/20"
                >
                  Buy Package
                </Button>
              </Card>
            </div>

            <div className="text-center text-sm text-white/60 mt-8">
              💡 Views never expire. Use them whenever you need to review applications.
            </div>
          </div>
        )}

        {/* Premium Unlimited Tab */}
        {selectedTab === 'premium' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl mb-2">Premium Unlimited Package</h2>
              <p className="text-white/60">
                For landlords with multiple properties who want unlimited access
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Card className="bg-gradient-to-br from-[#A8F32C]/20 via-[#121212] to-[#121212] border-[#A8F32C] p-8">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-[#A8F32C]/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Crown className="h-8 w-8 text-[#A8F32C]" />
                  </div>
                  <div className="flex-1">
                    <Badge className="mb-3 bg-[#A8F32C] text-black border-0">
                      PREMIUM UNLIMITED
                    </Badge>
                    <h3 className="text-2xl mb-3">Everything You Need, Unlimited</h3>
                    <p className="text-white/60 mb-6">
                      5 Featured Listings + Unlimited Applicant Views + Priority Support
                    </p>

                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-black/30 rounded-lg p-4">
                        <div className="text-3xl mb-1">$99.99<span className="text-base text-white/60">/mo</span></div>
                        <div className="text-sm text-white/60">Monthly billing</div>
                      </div>
                      <div className="bg-gradient-to-br from-[#A8F32C]/10 to-transparent rounded-lg p-4 border border-[#A8F32C]/30">
                        <div className="text-3xl mb-1">$999.99<span className="text-base text-white/60">/yr</span></div>
                        <div className="text-sm text-[#A8F32C]">Save $200 (17% off)</div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-x-8 gap-y-3 mb-6">
                      <div className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                        <span className="text-sm">5 Featured Listings (always at top)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                        <span className="text-sm">Unlimited applicant views</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                        <span className="text-sm">Priority badge on all listings</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                        <span className="text-sm">Advanced analytics dashboard</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                        <span className="text-sm">FastTrack priority processing</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                        <span className="text-sm">Dedicated account manager</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                        <span className="text-sm">SingleKey bulk screening discounts</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                        <span className="text-sm">24/7 priority support</span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button 
                        onClick={() => onSelectPlan('premium-monthly')}
                        className="flex-1 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
                      >
                        Start Monthly
                      </Button>
                      <Button 
                        onClick={() => onSelectPlan('premium-yearly')}
                        variant="outline"
                        className="flex-1 border-[#A8F32C] text-[#A8F32C] hover:bg-[#A8F32C] hover:text-black"
                      >
                        Start Yearly (Save 17%)
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Waiver Program Banner */}
        <Card className="bg-gradient-to-br from-[#A8F32C]/10 via-transparent to-transparent border-[#A8F32C]/30 p-8 mt-12">
          <div className="flex items-start gap-6">
            <Gift className="h-12 w-12 text-[#A8F32C] flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-2xl mb-2">Waiver Program for Small Landlords</h3>
              <p className="text-white/60 mb-4">
                We believe in supporting small landlords who accept justice-impacted tenants. 
                Apply for free access based on your property portfolio size.
              </p>
              <ul className="space-y-2 mb-6 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#A8F32C]" />
                  <span>Small landlords (1-5 units): <span className="text-[#A8F32C]">30 days free</span></span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#A8F32C]" />
                  <span>Medium/Large landlords: <span className="text-[#A8F32C]">15 days free</span></span>
                </li>
              </ul>
              <Button
                onClick={onApplyWaiver}
                variant="outline"
                className="border-[#A8F32C] text-[#A8F32C] hover:bg-[#A8F32C] hover:text-black"
              >
                Apply for Waiver
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
