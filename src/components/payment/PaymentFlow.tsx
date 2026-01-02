import { useState } from 'react';
import { CreditCard, Lock, CheckCircle, AlertCircle, Loader2, DollarSign, Shield } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

interface PaymentFlowProps {
  type: 'housing-fasttrack' | 'subscription' | 'job-fasttrack';
  amount: number;
  onSuccess: (paymentId: string) => void;
  onCancel: () => void;
  // Payment details
  itemDetails?: {
    title: string;
    subtitle?: string;
    description?: string;
  };
  isSubscriber?: boolean;
}

interface PaymentMethod {
  id: string;
  type: 'card' | 'bank';
  last4: string;
  brand?: string;
}

export default function PaymentFlow({ 
  type, 
  amount, 
  onSuccess, 
  onCancel,
  itemDetails,
  isSubscriber = false 
}: PaymentFlowProps) {
  const [step, setStep] = useState<'details' | 'payment' | 'processing' | 'success'>('details');
  const [paymentMethod, setPaymentMethod] = useState<'new-card' | 'saved-card'>('new-card');
  const [savedCards] = useState<PaymentMethod[]>([
    { id: '1', type: 'card', last4: '4242', brand: 'visa' }
  ]);
  
  const [processing, setProcessing] = useState(false);

  // Calculate fees
  const stripeFee = Math.ceil(amount * 0.029 + 0.30 * 100) / 100; // 2.9% + $0.30
  const total = amount + stripeFee;

  // For housing FastTrack with subscriber discount
  const originalAmount = type === 'housing-fasttrack' && isSubscriber ? 75 : amount;
  const discount = type === 'housing-fasttrack' && isSubscriber ? 10 : 0;

  const handlePayment = async () => {
    setProcessing(true);
    setStep('processing');

    // Simulate Stripe payment processing
    // In production, this would call your backend API which calls Stripe
    setTimeout(() => {
      const mockPaymentId = `pi_${Math.random().toString(36).substr(2, 9)}`;
      setStep('success');
      setTimeout(() => {
        onSuccess(mockPaymentId);
      }, 2000);
    }, 2000);
  };

  const getPaymentTitle = () => {
    switch (type) {
      case 'housing-fasttrack':
        return 'Housing FastTrack Application';
      case 'subscription':
        return 'FairPath+ Subscription';
      case 'job-fasttrack':
        return 'Job FastTrack Application';
      default:
        return 'Payment';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {step === 'details' && (
          <Card className="bg-[#121212] border-white/5 p-8">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#A8F32C]/10 rounded-xl flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-[#A8F32C]" />
                </div>
                <div>
                  <h1 className="text-2xl">{getPaymentTitle()}</h1>
                  <p className="text-sm text-white/60">Secure payment powered by Stripe</p>
                </div>
              </div>
            </div>

            {/* Item Details */}
            {itemDetails && (
              <div className="bg-black/50 rounded-xl p-6 mb-6 border border-white/5">
                <h2 className="text-lg mb-2">{itemDetails.title}</h2>
                {itemDetails.subtitle && (
                  <p className="text-sm text-white/60 mb-3">{itemDetails.subtitle}</p>
                )}
                {itemDetails.description && (
                  <p className="text-xs text-white/40">{itemDetails.description}</p>
                )}
              </div>
            )}

            {/* Pricing Breakdown */}
            <div className="bg-black/50 rounded-xl p-6 mb-6 border border-white/5">
              <h3 className="text-lg mb-4">Payment Summary</h3>
              
              <div className="space-y-3 mb-4 pb-4 border-b border-white/5">
                {discount > 0 && (
                  <>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/60">Base Price</span>
                      <span className="text-white/60 line-through">${originalAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#A8F32C]">FairPath+ Discount</span>
                      <span className="text-[#A8F32C]">-${discount.toFixed(2)}</span>
                    </div>
                  </>
                )}
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">
                    {discount > 0 ? 'Discounted Price' : type === 'subscription' ? 'Monthly Subscription' : 'Application Fee'}
                  </span>
                  <span className="text-white">${amount.toFixed(2)}</span>
                </div>

                {type !== 'subscription' && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">Processing Fee (Stripe)</span>
                    <span className="text-white/60">${stripeFee.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-lg">Total Due</span>
                <span className="text-2xl text-[#A8F32C]">
                  ${type === 'subscription' ? amount.toFixed(2) : total.toFixed(2)}
                </span>
              </div>

              {type === 'subscription' && (
                <p className="text-xs text-white/40 mt-3">
                  Billed monthly • Cancel anytime
                </p>
              )}
            </div>

            {/* What's Included */}
            {type === 'housing-fasttrack' && (
              <div className="bg-[#A8F32C]/5 rounded-xl p-6 mb-6 border border-[#A8F32C]/20">
                <h3 className="text-sm mb-3 text-[#A8F32C]">What's Included:</h3>
                <ul className="space-y-2 text-sm text-white/80">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-[#A8F32C] flex-shrink-0" />
                    <span>Guaranteed property showing within 48 hours</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-[#A8F32C] flex-shrink-0" />
                    <span>Complete background screening via SingleKey</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-[#A8F32C] flex-shrink-0" />
                    <span>Priority application processing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-[#A8F32C] flex-shrink-0" />
                    <span>Direct contact with property owner</span>
                  </li>
                </ul>
              </div>
            )}

            {/* Security Notice */}
            <div className="flex items-center gap-3 text-xs text-white/40 mb-6">
              <Lock className="h-4 w-4" />
              <span>All payments are encrypted and secure via Stripe</span>
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1 border-white/20"
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
                onClick={() => setStep('payment')}
              >
                Continue to Payment
              </Button>
            </div>
          </Card>
        )}

        {step === 'payment' && (
          <Card className="bg-[#121212] border-white/5 p-8">
            <div className="mb-8">
              <h1 className="text-2xl mb-2">Payment Method</h1>
              <p className="text-sm text-white/60">Enter your payment details</p>
            </div>

            {/* Payment Method Selection */}
            {savedCards.length > 0 && (
              <div className="mb-6">
                <Label className="mb-3 block">Select Payment Method</Label>
                <div className="space-y-3">
                  {savedCards.map((card) => (
                    <button
                      key={card.id}
                      onClick={() => setPaymentMethod('saved-card')}
                      className={`w-full bg-black/50 rounded-xl p-4 border transition-all text-left ${
                        paymentMethod === 'saved-card'
                          ? 'border-[#A8F32C]'
                          : 'border-white/5 hover:border-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CreditCard className="h-5 w-5 text-white/60" />
                          <div>
                            <div className="text-sm capitalize">{card.brand} •••• {card.last4}</div>
                            <div className="text-xs text-white/40">Expires 12/2025</div>
                          </div>
                        </div>
                        {paymentMethod === 'saved-card' && (
                          <CheckCircle className="h-5 w-5 text-[#A8F32C]" />
                        )}
                      </div>
                    </button>
                  ))}

                  <button
                    onClick={() => setPaymentMethod('new-card')}
                    className={`w-full bg-black/50 rounded-xl p-4 border transition-all text-left ${
                      paymentMethod === 'new-card'
                        ? 'border-[#A8F32C]'
                        : 'border-white/5 hover:border-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5 text-white/60" />
                        <div className="text-sm">Use a new card</div>
                      </div>
                      {paymentMethod === 'new-card' && (
                        <CheckCircle className="h-5 w-5 text-[#A8F32C]" />
                      )}
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* New Card Form */}
            {paymentMethod === 'new-card' && (
              <div className="space-y-4 mb-6">
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="4242 4242 4242 4242"
                    className="bg-black border-white/10 text-white h-12"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      className="bg-black border-white/10 text-white h-12"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvc">CVC</Label>
                    <Input
                      id="cvc"
                      placeholder="123"
                      className="bg-black border-white/10 text-white h-12"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="name">Name on Card</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    className="bg-black border-white/10 text-white h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="zip">Billing ZIP Code</Label>
                  <Input
                    id="zip"
                    placeholder="44101"
                    className="bg-black border-white/10 text-white h-12"
                  />
                </div>

                {type === 'subscription' && (
                  <div className="flex items-start gap-3 pt-2">
                    <input type="checkbox" className="mt-1" />
                    <label className="text-xs text-white/60">
                      Save this card for future payments
                    </label>
                  </div>
                )}
              </div>
            )}

            {/* Amount Due */}
            <div className="bg-[#A8F32C]/5 rounded-xl p-4 mb-6 border border-[#A8F32C]/20">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/80">Amount Due Today</span>
                <span className="text-xl text-[#A8F32C]">
                  ${type === 'subscription' ? amount.toFixed(2) : total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Security Badges */}
            <div className="flex items-center justify-center gap-6 mb-6 py-4 border-y border-white/5">
              <div className="flex items-center gap-2 text-xs text-white/40">
                <Lock className="h-4 w-4" />
                <span>SSL Encrypted</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/40">
                <Shield className="h-4 w-4" />
                <span>Stripe Secured</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/40">
                <CheckCircle className="h-4 w-4" />
                <span>PCI Compliant</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1 border-white/20"
                onClick={() => setStep('details')}
              >
                Back
              </Button>
              <Button 
                className="flex-1 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
                onClick={handlePayment}
                disabled={processing}
              >
                Pay ${type === 'subscription' ? amount.toFixed(2) : total.toFixed(2)}
              </Button>
            </div>
          </Card>
        )}

        {step === 'processing' && (
          <Card className="bg-[#121212] border-white/5 p-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#A8F32C]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Loader2 className="h-10 w-10 text-[#A8F32C] animate-spin" />
              </div>
              <h2 className="text-2xl mb-2">Processing Payment...</h2>
              <p className="text-sm text-white/60">
                Please wait while we securely process your payment
              </p>
            </div>
          </Card>
        )}

        {step === 'success' && (
          <Card className="bg-[#121212] border-white/5 p-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#A8F32C]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-[#A8F32C]" />
              </div>
              <h2 className="text-2xl mb-2">Payment Successful!</h2>
              <p className="text-sm text-white/60 mb-8">
                {type === 'housing-fasttrack' && 'Your FastTrack application has been submitted'}
                {type === 'subscription' && 'Welcome to FairPath+! Your subscription is now active'}
                {type === 'job-fasttrack' && 'Your job application has been submitted'}
              </p>

              {type === 'housing-fasttrack' && (
                <div className="bg-[#A8F32C]/5 rounded-xl p-6 mb-6 border border-[#A8F32C]/20 text-left">
                  <h3 className="text-sm mb-3 text-[#A8F32C]">What Happens Next:</h3>
                  <ul className="space-y-2 text-sm text-white/80">
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 bg-[#A8F32C]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-[#A8F32C] text-xs">1</span>
                      </div>
                      <span>Background screening will begin within 24 hours</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 bg-[#A8F32C]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-[#A8F32C] text-xs">2</span>
                      </div>
                      <span>Property owner will schedule your guaranteed showing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 bg-[#A8F32C]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-[#A8F32C] text-xs">3</span>
                      </div>
                      <span>You'll receive a confirmation email with next steps</span>
                    </li>
                  </ul>
                </div>
              )}

              <p className="text-xs text-white/40 mb-6">
                Receipt sent to your email
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

// Stripe Integration Helper (for backend)
export const stripeConfig = {
  // This would be in your backend .env file
  STRIPE_SECRET_KEY: 'sk_test_...',
  STRIPE_PUBLISHABLE_KEY: 'pk_test_...',
  
  // Webhook endpoint for Stripe events
  WEBHOOK_SECRET: 'whsec_...',
  
  // Product IDs (create these in Stripe Dashboard)
  PRODUCTS: {
    HOUSING_FASTTRACK: 'prod_housing_fasttrack',
    FAIRPATH_PLUS: 'prod_fairpath_plus',
  },
  
  // Price IDs (create these in Stripe Dashboard)
  PRICES: {
    HOUSING_FASTTRACK_REGULAR: 'price_75',
    HOUSING_FASTTRACK_SUBSCRIBER: 'price_65',
    FAIRPATH_PLUS_MONTHLY: 'price_2_monthly',
  }
};

// Backend API endpoint example
/*
POST /api/create-payment-intent

Request:
{
  "type": "housing-fasttrack" | "subscription",
  "amount": 75,
  "userId": "user_123",
  "propertyId": "prop_456" // for housing
}

Response:
{
  "clientSecret": "pi_xxx_secret_xxx",
  "paymentIntentId": "pi_xxx"
}

Stripe Webhook Handler:
POST /api/webhooks/stripe

Events to handle:
- payment_intent.succeeded
- payment_intent.payment_failed
- customer.subscription.created
- customer.subscription.deleted
- customer.subscription.updated
*/
