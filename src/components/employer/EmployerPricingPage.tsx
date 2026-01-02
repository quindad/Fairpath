import { useState } from 'react';
import { Briefcase, Eye, Infinity, DollarSign, Check, X, ArrowLeft, Zap, Building, Crown, Gift, Users } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';

interface EmployerPricingPageProps {
  onSelectPlan: (planId: string) => void;
  onApplyWaiver: () => void;
  onBack: () => void;
}

export default function EmployerPricingPage({ onSelectPlan, onApplyWaiver, onBack }: EmployerPricingPageProps) {
  const [selectedTab, setSelectedTab] = useState<'packages' | 'unlimited' | 'staffing' | 'addons'>('packages');

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
              ADMIN A FELON - EMPLOYERS
            </div>
            <h1 className="text-4xl mb-3">Find the Right Talent, Maximize Tax Credits</h1>
            <p className="text-lg text-white/60">
              Flexible pricing for every business size. Pay per applicant, go unlimited, 
              or partner with FairPath Staffing for full placement services.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-white/5 bg-[#121212] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-2 overflow-x-auto">
            {[
              { id: 'packages', label: 'View Packages', icon: Eye },
              { id: 'unlimited', label: 'Unlimited Plans', icon: Infinity },
              { id: 'staffing', label: 'FairPath Staffing', icon: Users },
              { id: 'addons', label: 'Add-ons', icon: Zap }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 transition-all whitespace-nowrap ${
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
        {/* Applicant View Packages Tab */}
        {selectedTab === 'packages' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl mb-2">Applicant View Packages</h2>
              <p className="text-white/60">
                Pay only for the applicants you want to review. Perfect for hiring on your own schedule.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Small Business */}
              <Card className="bg-[#121212] border-white/10 p-6 hover:border-[#A8F32C]/50 transition-all">
                <div className="text-center mb-4">
                  <Building className="h-8 w-8 text-white/60 mx-auto mb-3" />
                  <h3 className="text-xl mb-2">Small Business</h3>
                  <div className="text-4xl mb-1">$100</div>
                  <div className="text-sm text-white/60">50 applicant views</div>
                  <div className="text-xs text-[#A8F32C] mt-1">$2 per view</div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">50 applicant profile unlocks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">WOTC eligibility indicators</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">FastTrack application viewing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">Views never expire</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">Email support</span>
                  </li>
                </ul>
                <Button 
                  onClick={() => onSelectPlan('views-small')}
                  variant="outline"
                  className="w-full border-white/20 hover:bg-white/5"
                >
                  Buy Package
                </Button>
              </Card>

              {/* Medium Business */}
              <Card className="bg-gradient-to-br from-[#A8F32C]/10 via-[#121212] to-[#121212] border-[#A8F32C]/50 p-6 relative">
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#A8F32C] text-black border-0">
                  POPULAR
                </Badge>
                <div className="text-center mb-4">
                  <Building className="h-8 w-8 text-[#A8F32C] mx-auto mb-3" />
                  <h3 className="text-xl mb-2">Medium Business</h3>
                  <div className="text-4xl mb-1">$200</div>
                  <div className="text-sm text-white/60">100 applicant views</div>
                  <div className="text-xs text-[#A8F32C] mt-1">$2 per view</div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">100 applicant profile unlocks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">Everything in Small Business</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">Priority listing placement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">Basic analytics dashboard</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">Priority email support</span>
                  </li>
                </ul>
                <Button 
                  onClick={() => onSelectPlan('views-medium')}
                  className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
                >
                  Buy Package
                </Button>
              </Card>

              {/* Large Business */}
              <Card className="bg-[#121212] border-white/10 p-6">
                <div className="text-center mb-4">
                  <Building className="h-8 w-8 text-white/60 mx-auto mb-3" />
                  <h3 className="text-xl mb-2">Large Business</h3>
                  <div className="text-4xl mb-1">$400</div>
                  <div className="text-sm text-white/60">200 applicant views</div>
                  <div className="text-xs text-[#A8F32C] mt-1">$2 per view</div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">200 applicant profile unlocks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Everything in Medium Business</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Advanced analytics & reporting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Dedicated account manager</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Phone & priority support</span>
                  </li>
                </ul>
                <Button 
                  onClick={() => onSelectPlan('views-large')}
                  variant="outline"
                  className="w-full border-white/20 hover:bg-white/5"
                >
                  Buy Package
                </Button>
              </Card>
            </div>

            <div className="text-center mt-8">
              <div className="inline-block bg-[#121212] border border-white/10 rounded-lg p-6">
                <Building className="h-8 w-8 text-white/60 mx-auto mb-3" />
                <h3 className="text-lg mb-2">Free Setup</h3>
                <p className="text-sm text-white/60 mb-4 max-w-md">
                  Create your employer profile, preview the dashboard, and see how job listings work. 
                  Pay only when you're ready to view applicants.
                </p>
                <Button 
                  onClick={() => onSelectPlan('free-setup')}
                  variant="outline"
                  className="border-[#A8F32C] text-[#A8F32C] hover:bg-[#A8F32C] hover:text-black"
                >
                  Create Free Profile
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Unlimited Plans Tab */}
        {selectedTab === 'unlimited' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl mb-2">Unlimited View Memberships</h2>
              <p className="text-white/60">
                For businesses hiring regularly. View unlimited applicants, post unlimited jobs.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Small Business Unlimited */}
              <Card className="bg-[#121212] border-white/10 p-6">
                <div className="mb-4">
                  <Badge className="mb-3 bg-white/10 text-white border-0">SMALL BUSINESS</Badge>
                  <h3 className="text-2xl mb-3">Unlimited Starter</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl">$299.99</span>
                      <span className="text-white/60">/month</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl text-[#A8F32C]">$2,999.99</span>
                      <span className="text-white/60 text-sm">/year (save $600)</span>
                    </div>
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Unlimited applicant views</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Unlimited job postings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">WOTC Center access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Basic WOTC automation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Email support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="h-5 w-5 text-white/20 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white/40">Priority listing placement</span>
                  </li>
                </ul>
                <div className="space-y-2">
                  <Button 
                    onClick={() => onSelectPlan('unlimited-small-monthly')}
                    variant="outline"
                    className="w-full border-white/20"
                  >
                    Start Monthly
                  </Button>
                  <Button 
                    onClick={() => onSelectPlan('unlimited-small-yearly')}
                    variant="outline"
                    className="w-full border-[#A8F32C] text-[#A8F32C]"
                  >
                    Start Yearly (Save 17%)
                  </Button>
                </div>
              </Card>

              {/* Medium Business Unlimited */}
              <Card className="bg-gradient-to-br from-[#A8F32C]/10 via-[#121212] to-[#121212] border-[#A8F32C]/50 p-6 relative">
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#A8F32C] text-black border-0">
                  BEST VALUE
                </Badge>
                <div className="mb-4">
                  <Badge className="mb-3 bg-[#A8F32C]/20 text-[#A8F32C] border-0">MEDIUM BUSINESS</Badge>
                  <h3 className="text-2xl mb-3">Unlimited Professional</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl">$499.99</span>
                      <span className="text-white/60">/month</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl text-[#A8F32C]">$4,999.99</span>
                      <span className="text-white/60 text-sm">/year (save $1,000)</span>
                    </div>
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Everything in Starter</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Priority listing placement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Full WOTC automation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Advanced analytics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Priority support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Featured job badge</span>
                  </li>
                </ul>
                <div className="space-y-2">
                  <Button 
                    onClick={() => onSelectPlan('unlimited-medium-monthly')}
                    className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
                  >
                    Start Monthly
                  </Button>
                  <Button 
                    onClick={() => onSelectPlan('unlimited-medium-yearly')}
                    variant="outline"
                    className="w-full border-[#A8F32C] text-[#A8F32C]"
                  >
                    Start Yearly (Save 17%)
                  </Button>
                </div>
              </Card>

              {/* Large Business Unlimited */}
              <Card className="bg-[#121212] border-white/10 p-6">
                <div className="mb-4">
                  <Badge className="mb-3 bg-white/10 text-white border-0">LARGE / PRO</Badge>
                  <h3 className="text-2xl mb-3">Unlimited Enterprise</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl">$799.99</span>
                      <span className="text-white/60">/month</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl text-[#A8F32C]">$7,999.99</span>
                      <span className="text-white/60 text-sm">/year (save $1,600)</span>
                    </div>
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Everything in Professional</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Top listing priority (always first)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Boosted visibility in app</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Dedicated account manager</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Custom WOTC reporting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">24/7 phone support</span>
                  </li>
                </ul>
                <div className="space-y-2">
                  <Button 
                    onClick={() => onSelectPlan('unlimited-large-monthly')}
                    variant="outline"
                    className="w-full border-white/20"
                  >
                    Start Monthly
                  </Button>
                  <Button 
                    onClick={() => onSelectPlan('unlimited-large-yearly')}
                    variant="outline"
                    className="w-full border-[#A8F32C] text-[#A8F32C]"
                  >
                    Start Yearly (Save 17%)
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* FairPath Staffing Tab */}
        {selectedTab === 'staffing' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl mb-2">FairPath Staffing Partnership</h2>
              <p className="text-white/60">
                Let us handle recruiting, screening, and placement. You focus on running your business.
              </p>
            </div>

            {/* Setup Fee */}
            <Card className="bg-gradient-to-br from-[#A8F32C]/20 via-[#121212] to-[#121212] border-[#A8F32C] p-8 max-w-3xl mx-auto">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-[#A8F32C]/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Users className="h-8 w-8 text-[#A8F32C]" />
                </div>
                <div className="flex-1">
                  <Badge className="mb-3 bg-[#A8F32C] text-black border-0">
                    STAFFING PARTNER
                  </Badge>
                  <h3 className="text-2xl mb-3">One-Time Setup: $1,000</h3>
                  <p className="text-white/60 mb-6">
                    Become a FairPath Staffing partner and get access to fully vetted, pre-screened candidates 
                    who are ready to work. We handle all the heavy lifting.
                  </p>

                  <div className="grid md:grid-cols-2 gap-3 mb-6">
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Dedicated account setup</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Custom hiring profile</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Onboarding & training</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                      <span className="text-sm">WOTC optimization setup</span>
                    </div>
                  </div>

                  <Button 
                    onClick={() => onSelectPlan('staffing-setup')}
                    className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
                  >
                    Become a Staffing Partner
                  </Button>
                </div>
              </div>
            </Card>

            {/* Screening Packages */}
            <div>
              <h3 className="text-xl mb-6 text-center">Screening Packages (For Partners)</h3>
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <Card className="bg-[#121212] border-white/10 p-6">
                  <h4 className="text-lg mb-2">Basic Background Check</h4>
                  <div className="text-3xl mb-4">$19.99 <span className="text-base text-white/60">per candidate</span></div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                      <span>Criminal background check</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                      <span>WOTC eligibility verification</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                      <span>Results in 24-48 hours</span>
                    </li>
                  </ul>
                </Card>

                <Card className="bg-[#121212] border-white/10 p-6">
                  <h4 className="text-lg mb-2">Full Employment Screen</h4>
                  <div className="text-3xl mb-4">$39.99 <span className="text-base text-white/60">per candidate</span></div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                      <span>Everything in Basic</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                      <span>Drug test (QR code sent to candidate)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                      <span>ID verification</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                      <span>Results in 48-72 hours</span>
                    </li>
                  </ul>
                </Card>
              </div>
            </div>

            {/* Placement Fees */}
            <div>
              <h3 className="text-xl mb-6 text-center">Placement Fees (For Partners)</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-[#121212] border-white/10 p-6">
                  <h4 className="text-lg mb-2">Basic Placement</h4>
                  <div className="text-3xl mb-4">$99 <span className="text-base text-white/60">per hire</span></div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                      <span>Candidate sourcing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                      <span>Initial screening</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                      <span>Interview coordination</span>
                    </li>
                  </ul>
                  <Button 
                    onClick={() => onSelectPlan('placement-basic')}
                    variant="outline"
                    className="w-full mt-4 border-white/20"
                  >
                    Select
                  </Button>
                </Card>

                <Card className="bg-gradient-to-br from-[#A8F32C]/10 via-[#121212] to-[#121212] border-[#A8F32C]/50 p-6">
                  <Badge className="mb-2 bg-[#A8F32C]/20 text-[#A8F32C] border-0">RECOMMENDED</Badge>
                  <h4 className="text-lg mb-2">Premium Placement</h4>
                  <div className="text-3xl mb-4">$149 <span className="text-base text-white/60">per hire</span></div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                      <span>Everything in Basic</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                      <span>Full background check included</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                      <span>WOTC filing assistance</span>
                    </li>
                  </ul>
                  <Button 
                    onClick={() => onSelectPlan('placement-premium')}
                    className="w-full mt-4 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
                  >
                    Select
                  </Button>
                </Card>

                <Card className="bg-[#121212] border-white/10 p-6">
                  <h4 className="text-lg mb-2">Percentage Model</h4>
                  <div className="text-3xl mb-4">5% <span className="text-base text-white/60">of 1st month</span></div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                      <span>Scales with salary</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                      <span>Full placement service</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-xs text-white/60">Example: $3,000/mo salary = $150 fee</span>
                    </li>
                  </ul>
                  <Button 
                    onClick={() => onSelectPlan('placement-percentage')}
                    variant="outline"
                    className="w-full mt-4 border-white/20"
                  >
                    Select
                  </Button>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* Add-ons Tab */}
        {selectedTab === 'addons' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl mb-2">Add-ons & Enhancements</h2>
              <p className="text-white/60">
                Supercharge your hiring with tax credit tracking and advanced features
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Tax Credit Database - Add-on */}
              <Card className="bg-[#121212] border-white/10 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <DollarSign className="h-8 w-8 text-[#A8F32C]" />
                  <div>
                    <Badge className="mb-2 bg-[#A8F32C]/20 text-[#A8F32C] border-0">ADD-ON</Badge>
                    <h3 className="text-xl">Tax Credit Database</h3>
                  </div>
                </div>
                <div className="text-3xl mb-4">$29.99<span className="text-base text-white/60">/month</span></div>
                <p className="text-sm text-white/60 mb-4">
                  Add to any unlimited plan for WOTC-eligible candidate filtering
                </p>
                <ul className="space-y-2 mb-6 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span>Search by tax credit eligibility</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span>See estimated credit value per candidate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span>Track total potential credits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span>Requires existing plan</span>
                  </li>
                </ul>
                <Button 
                  onClick={() => onSelectPlan('addon-tax-database')}
                  variant="outline"
                  className="w-full border-[#A8F32C] text-[#A8F32C] hover:bg-[#A8F32C] hover:text-black"
                >
                  Add to Plan
                </Button>
              </Card>

              {/* Tax Credit Database - Standalone */}
              <Card className="bg-gradient-to-br from-[#A8F32C]/10 via-[#121212] to-[#121212] border-[#A8F32C]/50 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <DollarSign className="h-8 w-8 text-[#A8F32C]" />
                  <div>
                    <Badge className="mb-2 bg-[#A8F32C] text-black border-0">STANDALONE</Badge>
                    <h3 className="text-xl">Tax Credit Database</h3>
                  </div>
                </div>
                <div className="text-3xl mb-4">$79.99<span className="text-base text-white/60">/month</span></div>
                <p className="text-sm text-white/60 mb-4">
                  Full access without an unlimited plan
                </p>
                <ul className="space-y-2 mb-6 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span>Everything in Add-on version</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span>Works independently</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span>Perfect for agencies & consultants</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span>Export capabilities</span>
                  </li>
                </ul>
                <Button 
                  onClick={() => onSelectPlan('standalone-tax-database')}
                  className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
                >
                  Get Standalone Access
                </Button>
              </Card>
            </div>
          </div>
        )}

        {/* Waiver Program Banner */}
        <Card className="bg-gradient-to-br from-[#A8F32C]/10 via-transparent to-transparent border-[#A8F32C]/30 p-8 mt-12">
          <div className="flex items-start gap-6">
            <Gift className="h-12 w-12 text-[#A8F32C] flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-2xl mb-2">Waiver Program for Small Businesses</h3>
              <p className="text-white/60 mb-4">
                We support small businesses committed to second-chance hiring. Apply for discounted or free access.
              </p>
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