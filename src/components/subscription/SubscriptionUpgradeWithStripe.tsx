import { useState } from 'react';
import { CreditCard, Check, Zap, Crown, Lock, ArrowLeft, Loader2, ExternalLink } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { getSubscriptionPriceId, getSubscriptionAmount, PRICING_TIERS } from '../../utils/stripe/config';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

interface SubscriptionUpgradeWithStripeProps {
  userId: string;
  tier: 'plus' | 'pro';
  onComplete: () => void;
  onBack: () => void;
}

export default function SubscriptionUpgradeWithStripe({ 
  userId, 
  tier,
  onComplete, 
  onBack 
}: SubscriptionUpgradeWithStripeProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const product = PRICING_TIERS[tier];
  const priceId = getSubscriptionPriceId(tier);
  const amount = getSubscriptionAmount(tier);

  const handleSubscribe = async () => {
    setLoading(true);
    setError('');

    try {
      // Call backend to create Stripe checkout session
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-a6daf7a5/stripe/checkout/subscription`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            userId,
            priceId,
            tier,
            successUrl: `${window.location.origin}?subscription=success`,
            cancelUrl: `${window.location.origin}?subscription=cancelled`,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // Redirect to Stripe Checkout
      console.log('✅ Redirecting to Stripe Checkout:', data.data.url);
      window.location.href = data.data.url;
    } catch (err: any) {
      console.error('❌ Subscription error:', err);
      setError(err.message || 'Failed to start checkout process');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          className="text-white/60 hover:text-white mb-6"
          onClick={onBack}
          disabled={loading}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-4xl mb-3">
            Upgrade to FairPath {tier === 'plus' ? '+' : 'Pro'}
          </h1>
          <p className="text-white/60 text-lg">
            Unlock premium features for just ${product.price}/month
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-[#A8F32C]/20 to-transparent border-[#A8F32C]/30 p-6">
            <Zap className="h-10 w-10 text-[#A8F32C] mb-4" />
            <h3 className="text-xl mb-2">Save on Every Application</h3>
            <p className="text-white/60 mb-4">
              Pay only ${STRIPE_CONFIG.oneTime[tier === 'plus' ? 'fastTrackPlus' : 'fastTrackPro']} instead of $75 for FastTrack housing applications
            </p>
            <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30">
              Pays for itself in 1 application
            </Badge>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/20 to-transparent border-blue-500/30 p-6">
            <Crown className="h-10 w-10 text-blue-400 mb-4" />
            <h3 className="text-xl mb-2">
              {tier === 'plus' ? '5x' : '10x'} More Free Items
            </h3>
            <p className="text-white/60 mb-4">
              Claim up to {tier === 'plus' ? 5 : 10} free marketplace items per month instead of just 2
            </p>
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
              Furniture, clothes, essentials
            </Badge>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/20 to-transparent border-green-500/30 p-6">
            <Check className="h-10 w-10 text-green-400 mb-4" />
            <h3 className="text-xl mb-2">Verified Profile Badge</h3>
            <p className="text-white/60 mb-4">
              Stand out to employers and landlords with your verified {tier === 'pro' ? 'PRO' : ''} status
            </p>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              Build trust instantly
            </Badge>
          </Card>

          {tier === 'pro' && (
            <Card className="bg-gradient-to-br from-purple-500/20 to-transparent border-purple-500/30 p-6">
              <Zap className="h-10 w-10 text-purple-400 mb-4" />
              <h3 className="text-xl mb-2">ALL AI Tools Included</h3>
              <p className="text-white/60 mb-4">
                Access resume builder, cover letter generator, interview prep, and more
              </p>
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                10+ premium AI features
              </Badge>
            </Card>
          )}

          {tier === 'plus' && (
            <Card className="bg-gradient-to-br from-purple-500/20 to-transparent border-purple-500/30 p-6">
              <CreditCard className="h-10 w-10 text-purple-400 mb-4" />
              <h3 className="text-xl mb-2">Priority Support</h3>
              <p className="text-white/60 mb-4">
                Get help faster with priority email and chat support
              </p>
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                Dedicated support team
              </Badge>
            </Card>
          )}
        </div>

        {/* Pricing Card */}
        <Card className="bg-[#121212] border-[#A8F32C]/50 p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Features List */}
            <div>
              <h3 className="text-xl mb-4">What's Included:</h3>
              <div className="space-y-3">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span className="text-white/80">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing & CTA */}
            <div className="flex flex-col justify-between">
              <div className="text-center mb-6">
                <div className="text-6xl mb-3">
                  ${product.price}
                  <span className="text-2xl text-white/60">/month</span>
                </div>
                <p className="text-white/60">
                  Cancel anytime. No contracts. No hidden fees.
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}

              <Button
                className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90 text-lg py-6"
                onClick={handleSubscribe}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Loading checkout...
                  </>
                ) : (
                  <>
                    <Lock className="mr-2 h-5 w-5" />
                    Continue to Secure Checkout
                  </>
                )}
              </Button>

              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-white/60">
                <Lock className="h-4 w-4 text-green-400" />
                <span>Secured by Stripe</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl mb-1">💳</div>
                <div className="text-sm text-white/60">Secure payments</div>
              </div>
              <div>
                <div className="text-2xl mb-1">🔄</div>
                <div className="text-sm text-white/60">Cancel anytime</div>
              </div>
              <div>
                <div className="text-2xl mb-1">✨</div>
                <div className="text-sm text-white/60">Instant activation</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Info Card */}
        <Card className="bg-blue-500/10 border-blue-500/30 p-6 mt-6">
          <div className="flex items-start gap-4">
            <ExternalLink className="h-6 w-6 text-blue-400 flex-shrink-0 mt-1" />
            <div>
              <h4 className="mb-2 text-blue-400">Secure Checkout Process</h4>
              <p className="text-sm text-white/80 mb-2">
                When you click "Continue to Secure Checkout", you'll be redirected to Stripe's secure payment page.
              </p>
              <ul className="text-sm text-white/60 space-y-1">
                <li>• Your payment info is encrypted and never touches our servers</li>
                <li>• Stripe is trusted by millions of businesses worldwide</li>
                <li>• Your subscription activates instantly after payment</li>
                <li>• You'll receive an email confirmation with receipt</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}