import { useState } from 'react';
import { CreditCard, Lock, Check, Crown } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import LogoFinal from '../common/LogoFinal';

interface FairPathPlusCheckoutProps {
  onComplete: () => void;
  onBack: () => void;
}

export default function FairPathPlusCheckout({ onComplete, onBack }: FairPathPlusCheckoutProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiry: '',
    cvc: '',
    name: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate payment processing
    setTimeout(() => {
      onComplete();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="border-b border-white/5 bg-[#121212]">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <LogoFinal size="md" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div>
            <h2 className="text-2xl mb-6">Order Summary</h2>
            
            <Card className="bg-gradient-to-br from-[#A8F32C]/10 via-transparent to-transparent border-[#A8F32C]/30 p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-[#A8F32C]/20 flex items-center justify-center">
                  <Crown className="h-6 w-6 text-[#A8F32C]" />
                </div>
                <div>
                  <h3 className="text-xl">FairPath+ Membership</h3>
                  <p className="text-sm text-white/60">Monthly subscription</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-[#A8F32C]" />
                  <span>$10 off FastTrack applications</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-[#A8F32C]" />
                  <span>7 marketplace claims/month</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-[#A8F32C]" />
                  <span>Verified member badge</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-[#A8F32C]" />
                  <span>Ad-free experience</span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/60">Subtotal</span>
                  <span>$2.00</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white/60">Tax</span>
                  <span>$0.00</span>
                </div>
                <div className="flex items-center justify-between text-xl">
                  <span>Total</span>
                  <span className="text-[#A8F32C]">$2.00/mo</span>
                </div>
              </div>
            </Card>

            <div className="bg-black/50 border border-white/10 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Lock className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                <div className="text-sm text-white/60">
                  <p className="mb-2">Your payment information is secure and encrypted.</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Cancel anytime, no cancellation fees</li>
                    <li>• First charge today, then monthly</li>
                    <li>• Instant activation after payment</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div>
            <h2 className="text-2xl mb-6">Payment Method</h2>

            <form onSubmit={handleSubmit}>
              {/* Payment Method Selection */}
              <div className="flex gap-3 mb-6">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`flex-1 p-4 border-2 rounded-lg transition-all ${
                    paymentMethod === 'card'
                      ? 'border-[#A8F32C] bg-[#A8F32C]/10'
                      : 'border-white/20 hover:border-white/40'
                  }`}
                >
                  <CreditCard className="h-6 w-6 mb-2" />
                  <div className="text-sm">Credit/Debit Card</div>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`flex-1 p-4 border-2 rounded-lg transition-all ${
                    paymentMethod === 'paypal'
                      ? 'border-[#A8F32C] bg-[#A8F32C]/10'
                      : 'border-white/20 hover:border-white/40'
                  }`}
                >
                  <div className="text-2xl mb-2">P</div>
                  <div className="text-sm">PayPal</div>
                </button>
              </div>

              {paymentMethod === 'card' && (
                <Card className="bg-[#121212] border-white/10 p-6 mb-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber" className="text-white mb-2 block">
                        Card Number <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={cardData.cardNumber}
                        onChange={(e) => setCardData({ ...cardData, cardNumber: e.target.value })}
                        className="bg-black border-white/20 text-white"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry" className="text-white mb-2 block">
                          Expiry Date <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          value={cardData.expiry}
                          onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                          className="bg-black border-white/20 text-white"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvc" className="text-white mb-2 block">
                          CVC <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="cvc"
                          placeholder="123"
                          value={cardData.cvc}
                          onChange={(e) => setCardData({ ...cardData, cvc: e.target.value })}
                          className="bg-black border-white/20 text-white"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="name" className="text-white mb-2 block">
                        Cardholder Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={cardData.name}
                        onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                        className="bg-black border-white/20 text-white"
                        required
                      />
                    </div>
                  </div>
                </Card>
              )}

              {paymentMethod === 'paypal' && (
                <Card className="bg-[#121212] border-white/10 p-8 mb-6 text-center">
                  <div className="text-4xl mb-4">💳</div>
                  <h3 className="text-xl mb-2">Pay with PayPal</h3>
                  <p className="text-white/60 text-sm mb-4">
                    You'll be redirected to PayPal to complete your purchase securely
                  </p>
                  <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 rounded-lg px-4 py-2">
                    <Lock className="h-4 w-4 text-blue-400" />
                    <span className="text-sm text-blue-400">Secured by PayPal</span>
                  </div>
                </Card>
              )}

              {/* Submit Buttons */}
              <div className="space-y-3">
                <Button
                  type="submit"
                  className="w-full h-12 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90 text-lg"
                >
                  <Lock className="mr-2 h-5 w-5" />
                  {paymentMethod === 'card' ? 'Subscribe Now' : 'Continue to PayPal'}
                </Button>
                <Button
                  type="button"
                  onClick={onBack}
                  variant="outline"
                  className="w-full border-white/20 text-white"
                >
                  Back
                </Button>
              </div>

              <p className="text-xs text-white/40 text-center mt-4">
                By subscribing, you agree to our Terms of Service and Privacy Policy. 
                Your subscription will automatically renew monthly until you cancel.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
