import { Check, X, Zap, Crown } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

interface PlanComparisonProps {
  currentPlan: 'free' | 'plus';
  onUpgrade: () => void;
  onClose: () => void;
}

export default function PlanComparison({ currentPlan, onUpgrade, onClose }: PlanComparisonProps) {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl mb-3">Choose Your Plan</h1>
          <p className="text-white/60 text-lg">
            Unlock premium features with FairPath+
          </p>
        </div>

        {/* Plans Comparison */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Free Plan */}
          <Card className="bg-[#121212] border-white/10 p-8 relative">
            {currentPlan === 'free' && (
              <Badge className="absolute top-4 right-4 bg-white/20 text-white border-white/30">
                Current Plan
              </Badge>
            )}
            <div className="mb-6">
              <h2 className="text-2xl mb-2">Free</h2>
              <div className="text-4xl mb-2">
                $0<span className="text-lg text-white/60">/month</span>
              </div>
              <p className="text-white/60">Basic access to the platform</p>
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-white/80">Job marketplace access</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-white/80">Housing marketplace access</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-white/80">Resource directory</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-white/80">1 marketplace claim per month</span>
              </div>
              <div className="flex items-start gap-3">
                <X className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <span className="text-white/40">FastTrack applications ($75 each)</span>
              </div>
              <div className="flex items-start gap-3">
                <X className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <span className="text-white/40">Verified profile badge</span>
              </div>
              <div className="flex items-start gap-3">
                <X className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <span className="text-white/40">Gig posting access</span>
              </div>
              <div className="flex items-start gap-3">
                <X className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <span className="text-white/40">Priority matching</span>
              </div>
            </div>

            {currentPlan === 'free' ? (
              <Button disabled className="w-full bg-white/10 text-white/40 cursor-not-allowed">
                Current Plan
              </Button>
            ) : (
              <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/5" onClick={onClose}>
                Downgrade
              </Button>
            )}
          </Card>

          {/* FairPath+ Plan */}
          <Card className="bg-gradient-to-br from-[#A8F32C]/20 via-transparent to-transparent border-[#A8F32C]/50 p-8 relative">
            {currentPlan === 'plus' && (
              <Badge className="absolute top-4 right-4 bg-[#A8F32C] text-black border-[#A8F32C]">
                <Crown className="h-3 w-3 mr-1" />
                Current Plan
              </Badge>
            )}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-2xl">FairPath+</h2>
                <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30">
                  POPULAR
                </Badge>
              </div>
              <div className="text-4xl mb-2">
                $2<span className="text-lg text-white/60">/month</span>
              </div>
              <p className="text-white/60">Everything you need to succeed</p>
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                <span className="text-white">Everything in Free</span>
              </div>
              <div className="flex items-start gap-3">
                <Zap className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                <span className="text-white">
                  <strong>FastTrack applications at $65</strong>
                  <div className="text-sm text-white/60">Save $10 per application</div>
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                <span className="text-white">
                  <strong>7 marketplace claims per month</strong>
                  <div className="text-sm text-white/60">vs. 1 on free plan</div>
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                <span className="text-white">Verified profile badge</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                <span className="text-white">Gig posting & earning access</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                <span className="text-white">Priority eligibility matching</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                <span className="text-white">Early access to new features</span>
              </div>
            </div>

            {currentPlan === 'plus' ? (
              <Button disabled className="w-full bg-[#A8F32C] text-black cursor-not-allowed">
                <Crown className="mr-2 h-4 w-4" />
                Current Plan
              </Button>
            ) : (
              <Button className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90" onClick={onUpgrade}>
                <Zap className="mr-2 h-4 w-4" />
                Upgrade to FairPath+
              </Button>
            )}
          </Card>
        </div>

        {/* Value Proposition */}
        <Card className="bg-[#121212] border-white/10 p-6">
          <h3 className="text-xl mb-4">Why FairPath+?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl text-[#A8F32C] mb-2">$10</div>
              <div className="text-white/80 mb-1">Saved per FastTrack</div>
              <div className="text-sm text-white/60">
                Just 1 FastTrack application saves you 5 months of subscription costs
              </div>
            </div>
            <div>
              <div className="text-3xl text-[#A8F32C] mb-2">7x</div>
              <div className="text-white/80 mb-1">More marketplace claims</div>
              <div className="text-sm text-white/60">
                Get free furniture, clothes, and essentials for reentry
              </div>
            </div>
            <div>
              <div className="text-3xl text-[#A8F32C] mb-2">∞</div>
              <div className="text-white/80 mb-1">Unlimited gig earnings</div>
              <div className="text-sm text-white/60">
                Post your skills and earn money as a contractor
              </div>
            </div>
          </div>
        </Card>

        {/* Back Button */}
        <div className="text-center mt-6">
          <Button variant="ghost" className="text-white/60 hover:text-white" onClick={onClose}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
