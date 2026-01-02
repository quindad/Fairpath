import { Check, Sparkles, Zap, Shield, Crown } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import LogoFinal from '../common/LogoFinal';

interface FairPathPlusPageProps {
  onSubscribe: () => void;
  onSkip: () => void;
}

export default function FairPathPlusPage({ onSubscribe, onSkip }: FairPathPlusPageProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/5 bg-[#121212]">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <LogoFinal size="lg" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#A8F32C]/10 border border-[#A8F32C]/30 rounded-full px-4 py-2 mb-6">
            <Crown className="h-4 w-4 text-[#A8F32C]" />
            <span className="text-sm text-[#A8F32C]">Premium Membership</span>
          </div>
          <h1 className="text-5xl mb-4">FairPath<span className="text-[#A8F32C]">+</span></h1>
          <p className="text-xl text-white/60 mb-8">
            Unlock premium features for just $2/month
          </p>
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-6xl">$2</span>
            <div className="text-left">
              <div className="text-white/60">per</div>
              <div className="text-white/60">month</div>
            </div>
          </div>
          <p className="text-white/40">Cancel anytime. No long-term commitment.</p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* FastTrack Discount */}
          <Card className="bg-gradient-to-br from-[#A8F32C]/10 via-transparent to-transparent border-[#A8F32C]/30 p-8">
            <div className="w-12 h-12 rounded-lg bg-[#A8F32C]/20 flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-[#A8F32C]" />
            </div>
            <h3 className="text-2xl mb-2">FastTrack Discount</h3>
            <p className="text-white/60 mb-4">Save $10 on every housing application</p>
            <div className="bg-black/50 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/60">Regular Price:</span>
                <span className="line-through text-white/40">$75</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#A8F32C]">FairPath+ Price:</span>
                <span className="text-2xl text-[#A8F32C]">$65</span>
              </div>
            </div>
            <p className="text-sm text-white/60">
              💰 Pays for itself with just 1 application every 5 months!
            </p>
          </Card>

          {/* Marketplace Claims */}
          <Card className="bg-gradient-to-br from-purple-500/10 via-transparent to-transparent border-purple-500/30 p-8">
            <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
              <Sparkles className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-2xl mb-2">7 Marketplace Claims/Month</h3>
            <p className="text-white/60 mb-4">Get essential items from community donors</p>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span className="text-white/80">Furniture for your new place</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span className="text-white/80">Clothes for job interviews</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span className="text-white/80">Kitchen essentials</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span className="text-white/80">Electronics & more</span>
              </div>
            </div>
            <p className="text-sm text-white/60">
              Free users: 3 claims/month
            </p>
          </Card>

          {/* Verified Badge */}
          <Card className="bg-gradient-to-br from-blue-500/10 via-transparent to-transparent border-blue-500/30 p-8">
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-2xl mb-2">Verified Member Badge</h3>
            <p className="text-white/60 mb-4">Stand out to employers and landlords</p>
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-lg px-4 py-2 mb-4">
              <Shield className="h-4 w-4 text-blue-400" />
              <span className="text-sm text-blue-400">FairPath+ Verified</span>
            </div>
            <p className="text-sm text-white/60">
              Shows you're serious about your reentry journey and invested in your success.
            </p>
          </Card>

          {/* Ad-Free Experience */}
          <Card className="bg-gradient-to-br from-green-500/10 via-transparent to-transparent border-green-500/30 p-8">
            <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center mb-4">
              <Sparkles className="h-6 w-6 text-green-400" />
            </div>
            <h3 className="text-2xl mb-2">Ad-Free Experience</h3>
            <p className="text-white/60 mb-4">Focus on what matters without distractions</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-white/80">
                <Check className="h-4 w-4 text-green-400" />
                <span>No banner ads</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/80">
                <Check className="h-4 w-4 text-green-400" />
                <span>Faster page loading</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/80">
                <Check className="h-4 w-4 text-green-400" />
                <span>Cleaner interface</span>
              </li>
            </ul>
          </Card>
        </div>

        {/* Value Proposition */}
        <Card className="bg-[#121212] border-white/10 p-8 mb-8">
          <h2 className="text-2xl mb-6 text-center">Everything Included:</h2>
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-3">
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 text-[#A8F32C]" />
              <span>$10 off every FastTrack application</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 text-[#A8F32C]" />
              <span>7 marketplace claims per month</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 text-[#A8F32C]" />
              <span>Verified member badge</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 text-[#A8F32C]" />
              <span>Ad-free experience</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 text-[#A8F32C]" />
              <span>Priority customer support</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 text-[#A8F32C]" />
              <span>Early access to new features</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 text-[#A8F32C]" />
              <span>Profile boost in searches</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 text-[#A8F32C]" />
              <span>Cancel anytime, no fees</span>
            </div>
          </div>
        </Card>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4">
          <Button
            onClick={onSubscribe}
            className="w-full max-w-md h-14 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90 text-lg"
          >
            <Crown className="mr-2 h-5 w-5" />
            Subscribe to FairPath+ - $2/month
          </Button>
          <button
            onClick={onSkip}
            className="text-white/60 hover:text-white text-sm underline"
          >
            Maybe later, continue with free plan
          </button>
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <h2 className="text-2xl mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <Card className="bg-[#121212] border-white/10 p-6">
              <h3 className="text-lg mb-2">Can I cancel anytime?</h3>
              <p className="text-white/60 text-sm">
                Absolutely! Cancel anytime with one click. No cancellation fees, no questions asked. You'll keep your benefits until the end of your billing period.
              </p>
            </Card>
            <Card className="bg-[#121212] border-white/10 p-6">
              <h3 className="text-lg mb-2">Do I need FairPath+ to use the platform?</h3>
              <p className="text-white/60 text-sm">
                No! The platform is 100% free to use. FairPath+ just adds premium benefits like FastTrack discounts and extra marketplace claims.
              </p>
            </Card>
            <Card className="bg-[#121212] border-white/10 p-6">
              <h3 className="text-lg mb-2">How do I save money with FastTrack discount?</h3>
              <p className="text-white/60 text-sm">
                If you apply to housing with FastTrack, you pay $65 instead of $75. That's $10 savings per application. Apply 5 times over 5 months and you've saved $50 (FairPath+ costs $10 total for those 5 months).
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
