import { useState } from 'react';
import { CreditCard, Check, Zap, Crown, Lock, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';

interface SubscriptionUpgradeProps {
  onComplete: () => void;
  onBack: () => void;
}

export default function SubscriptionUpgrade({ onComplete, onBack }: SubscriptionUpgradeProps) {
  const [step, setStep] = useState<'confirm' | 'payment' | 'processing' | 'success'>('confirm');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [zipCode, setZipCode] = useState('');

  const handlePaymentSubmit = () => {
    setStep('processing');
    // Simulate payment processing
    setTimeout(() => {
      setStep('success');
    }, 2000);
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <Card className="bg-[#121212] border-[#A8F32C]/50 p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-[#A8F32C]/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-8 w-8 text-[#A8F32C]" />
          </div>
          <h2 className="text-3xl mb-3">Welcome to FairPath+!</h2>
          <p className="text-white/60 mb-6">
            Your subscription is now active. You now have access to all premium features.
          </p>
          <div className="bg-black/50 border border-white/10 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/60">Next billing date</span>
              <span className="text-white">
                {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/60">Amount</span>
              <span className="text-[#A8F32C] text-lg">$2.00/month</span>
            </div>
          </div>
          <Button className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90" onClick={onComplete}>
            <Crown className="mr-2 h-4 w-4" />
            Go to Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  if (step === 'processing') {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <Card className="bg-[#121212] border-white/10 p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 border-4 border-[#A8F32C] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-2xl mb-3">Processing Payment...</h2>
          <p className="text-white/60">Please wait while we activate your subscription</p>
        </Card>
      </div>
    );
  }

  if (step === 'payment') {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <div className="max-w-2xl mx-auto">
          <Button
            variant="ghost"
            className="text-white/60 hover:text-white mb-6"
            onClick={() => setStep('confirm')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <h1 className="text-3xl mb-2">Add Payment Method</h1>
          <p className="text-white/60 mb-8">
            Secure payment processing powered by Stripe
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Payment Form */}
            <div>
              <Card className="bg-[#121212] border-white/10 p-6">
                <h3 className="text-xl mb-6">Payment Details</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Card Number</label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                      <Input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="bg-black/50 border-white/20 text-white pl-10"
                        maxLength={19}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-white/60 mb-2">Expiry Date</label>
                      <Input
                        type="text"
                        placeholder="MM/YY"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        className="bg-black/50 border-white/20 text-white"
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/60 mb-2">CVC</label>
                      <Input
                        type="text"
                        placeholder="123"
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value)}
                        className="bg-black/50 border-white/20 text-white"
                        maxLength={4}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-white/60 mb-2">ZIP Code</label>
                    <Input
                      type="text"
                      placeholder="12345"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      className="bg-black/50 border-white/20 text-white"
                      maxLength={5}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-6 p-3 bg-black/50 border border-white/10 rounded-lg">
                  <Lock className="h-4 w-4 text-green-400" />
                  <span className="text-sm text-white/60">Secured by Stripe</span>
                </div>

                <Button
                  className="w-full mt-6 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
                  onClick={handlePaymentSubmit}
                >
                  Subscribe for $2/month
                </Button>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="bg-[#121212] border-white/10 p-6">
                <h3 className="text-xl mb-6">Order Summary</h3>
                
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#A8F32C]/20 rounded-lg flex items-center justify-center">
                      <Crown className="h-6 w-6 text-[#A8F32C]" />
                    </div>
                    <div>
                      <div className="text-white">FairPath+</div>
                      <div className="text-sm text-white/60">Monthly Subscription</div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4 pb-4 border-b border-white/10">
                    <div className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">FastTrack at $70 (save $5 each)</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">5 marketplace claims/month</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">$5 off service bookings</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">Verified profile badge</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-white/60">
                      <span>Subtotal</span>
                      <span>$2.00</span>
                    </div>
                    <div className="flex items-center justify-between text-white/60">
                      <span>Tax</span>
                      <span>$0.00</span>
                    </div>
                    <div className="flex items-center justify-between text-xl pt-2 border-t border-white/10">
                      <span className="text-white">Total</span>
                      <span className="text-[#A8F32C]">$2.00/mo</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <div className="text-sm text-blue-400 mb-1">30-day money-back guarantee</div>
                  <div className="text-xs text-white/60">
                    Cancel anytime. No questions asked.
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Confirm step
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          className="text-white/60 hover:text-white mb-6"
          onClick={onBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-4xl mb-3">Upgrade to FairPath+</h1>
          <p className="text-white/60 text-lg">Unlock all premium features for just $2/month</p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-[#A8F32C]/20 to-transparent border-[#A8F32C]/30 p-6">
            <Zap className="h-10 w-10 text-[#A8F32C] mb-4" />
            <h3 className="text-xl mb-2">Save $5 per FastTrack</h3>
            <p className="text-white/60 mb-4">
              Pay only $70 instead of $75 for guaranteed housing showings
            </p>
            <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30">
              Pays for itself in 1 application
            </Badge>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/20 to-transparent border-blue-500/30 p-6">
            <Crown className="h-10 w-10 text-blue-400 mb-4" />
            <h3 className="text-xl mb-2">5x More Free Items</h3>
            <p className="text-white/60 mb-4">
              Claim up to 5 free marketplace items per month instead of just 2
            </p>
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
              Furniture, clothes, essentials
            </Badge>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/20 to-transparent border-green-500/30 p-6">
            <Check className="h-10 w-10 text-green-400 mb-4" />
            <h3 className="text-xl mb-2">Verified Profile Badge</h3>
            <p className="text-white/60 mb-4">
              Stand out to employers and landlords with your verified status
            </p>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              Build trust instantly
            </Badge>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/20 to-transparent border-purple-500/30 p-6">
            <CreditCard className="h-10 w-10 text-purple-400 mb-4" />
            <h3 className="text-xl mb-2">Earn with Gigs</h3>
            <p className="text-white/60 mb-4">
              Post your skills and get hired for side gigs to earn extra income
            </p>
            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
              Unlimited earning potential
            </Badge>
          </Card>
        </div>

        {/* Pricing Card */}
        <Card className="bg-[#121212] border-[#A8F32C]/50 p-8 text-center">
          <div className="text-6xl mb-3">
            $2<span className="text-2xl text-white/60">/month</span>
          </div>
          <p className="text-white/60 mb-6">
            Cancel anytime. No contracts. No hidden fees.
          </p>
          <Button
            className="w-full max-w-md mx-auto bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90 text-lg py-6"
            onClick={() => setStep('payment')}
          >
            <Zap className="mr-2 h-5 w-5" />
            Continue to Payment
          </Button>
        </Card>
      </div>
    </div>
  );
}