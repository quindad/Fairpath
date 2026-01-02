import { useState } from 'react';
import { CreditCard, Lock, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import LogoFinal from '../common/LogoFinal';

interface PaymentCheckoutPageProps {
  planName: string;
  amount: string;
  planType: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function PaymentCheckoutPage({ planName, amount, planType, onSuccess, onCancel }: PaymentCheckoutPageProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [processing, setProcessing] = useState(false);

  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiry: '',
    cvc: '',
    name: '',
    zip: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      onSuccess();
    }, 2000);
  };

  const formatCardNumber = (value: string) => {
    const numbers = value.replace(/\s/g, '');
    const groups = numbers.match(/.{1,4}/g);
    return groups ? groups.join(' ') : numbers;
  };

  const formatExpiry = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length >= 2) {
      return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}`;
    }
    return numbers;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/5 bg-[#121212] sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <LogoFinal size="md" />
            <Button
              onClick={onCancel}
              variant="ghost"
              className="text-white/60 hover:text-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Cancel
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div>
            <h2 className="text-2xl mb-6">Order Summary</h2>
            <Card className="bg-[#121212] border-white/10 p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg text-white mb-2">{planName}</h3>
                  <div className="text-sm text-white/60">{planType}</div>
                </div>
                <div className="text-2xl text-[#A8F32C]">{amount}</div>
              </div>

              <div className="border-t border-white/10 pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Subtotal</span>
                  <span className="text-white">{amount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Processing Fee</span>
                  <span className="text-white">$0.00</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-white/10">
                  <span className="text-white">Total Due Today</span>
                  <span className="text-2xl text-[#A8F32C]">{amount}</span>
                </div>
              </div>
            </Card>

            {/* Security Notice */}
            <div className="bg-[#A8F32C]/10 border border-[#A8F32C]/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Lock className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <div className="text-white mb-1">Secure Payment</div>
                  <div className="text-white/60">
                    Your payment information is encrypted and secure. We never store your full card details.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div>
            <h2 className="text-2xl mb-6">Payment Method</h2>

            {/* Payment Method Selector */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => setPaymentMethod('card')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  paymentMethod === 'card'
                    ? 'border-[#A8F32C] bg-[#A8F32C]/10'
                    : 'border-white/20 bg-[#121212]'
                }`}
              >
                <CreditCard className={`h-6 w-6 mx-auto mb-2 ${
                  paymentMethod === 'card' ? 'text-[#A8F32C]' : 'text-white/60'
                }`} />
                <div className="text-sm text-white">Credit/Debit Card</div>
              </button>

              <button
                onClick={() => setPaymentMethod('paypal')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  paymentMethod === 'paypal'
                    ? 'border-[#A8F32C] bg-[#A8F32C]/10'
                    : 'border-white/20 bg-[#121212]'
                }`}
              >
                <div className="text-2xl mb-2">💳</div>
                <div className="text-sm text-white">PayPal</div>
              </button>
            </div>

            {paymentMethod === 'card' ? (
              <form onSubmit={handleSubmit}>
                <Card className="bg-[#121212] border-white/10 p-6 mb-6">
                  <div className="space-y-4">
                    {/* Card Number */}
                    <div>
                      <Label htmlFor="cardNumber" className="text-white mb-2 block">
                        Card Number <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Input
                          id="cardNumber"
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          required
                          value={cardData.cardNumber}
                          onChange={(e) => {
                            const formatted = formatCardNumber(e.target.value);
                            if (formatted.replace(/\s/g, '').length <= 16) {
                              setCardData({ ...cardData, cardNumber: formatted });
                            }
                          }}
                          className="bg-black border-white/20 text-white pl-10"
                        />
                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                      </div>
                    </div>

                    {/* Expiry and CVC */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry" className="text-white mb-2 block">
                          Expiry Date <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="expiry"
                          type="text"
                          placeholder="MM/YY"
                          maxLength={5}
                          required
                          value={cardData.expiry}
                          onChange={(e) => {
                            const formatted = formatExpiry(e.target.value);
                            setCardData({ ...cardData, expiry: formatted });
                          }}
                          className="bg-black border-white/20 text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvc" className="text-white mb-2 block">
                          CVC <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="cvc"
                          type="text"
                          placeholder="123"
                          maxLength={4}
                          required
                          value={cardData.cvc}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '');
                            setCardData({ ...cardData, cvc: value });
                          }}
                          className="bg-black border-white/20 text-white"
                        />
                      </div>
                    </div>

                    {/* Cardholder Name */}
                    <div>
                      <Label htmlFor="name" className="text-white mb-2 block">
                        Cardholder Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        required
                        value={cardData.name}
                        onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                        className="bg-black border-white/20 text-white"
                      />
                    </div>

                    {/* ZIP Code */}
                    <div>
                      <Label htmlFor="zip" className="text-white mb-2 block">
                        ZIP/Postal Code <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="zip"
                        type="text"
                        placeholder="12345"
                        maxLength={10}
                        required
                        value={cardData.zip}
                        onChange={(e) => setCardData({ ...cardData, zip: e.target.value })}
                        className="bg-black border-white/20 text-white"
                      />
                    </div>
                  </div>
                </Card>

                {/* Accepted Cards */}
                <div className="flex items-center gap-3 mb-6 text-sm text-white/40">
                  <span>We accept:</span>
                  <Badge className="bg-white/10 text-white/60 border-0">Visa</Badge>
                  <Badge className="bg-white/10 text-white/60 border-0">Mastercard</Badge>
                  <Badge className="bg-white/10 text-white/60 border-0">Amex</Badge>
                  <Badge className="bg-white/10 text-white/60 border-0">Discover</Badge>
                </div>

                <Button
                  type="submit"
                  disabled={processing}
                  className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90 h-12"
                >
                  {processing ? (
                    <>
                      <div className="animate-spin h-5 w-5 border-2 border-black border-t-transparent rounded-full mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="mr-2 h-4 w-4" />
                      Pay {amount}
                    </>
                  )}
                </Button>

                <p className="text-center text-xs text-white/40 mt-4">
                  By confirming your purchase, you agree to our Terms of Service
                </p>
              </form>
            ) : (
              <Card className="bg-[#121212] border-white/10 p-8 text-center">
                <div className="text-6xl mb-4">💳</div>
                <h3 className="text-xl mb-4">Pay with PayPal</h3>
                <p className="text-white/60 mb-6">
                  You'll be redirected to PayPal to complete your purchase securely.
                </p>
                <Button
                  onClick={handleSubmit}
                  disabled={processing}
                  className="w-full bg-[#0070ba] text-white hover:bg-[#0070ba]/90 h-12"
                >
                  {processing ? (
                    <>
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2" />
                      Redirecting...
                    </>
                  ) : (
                    <>
                      Continue to PayPal
                    </>
                  )}
                </Button>
              </Card>
            )}

            {/* Powered by Stripe */}
            <div className="text-center mt-6">
              <div className="text-xs text-white/40 mb-2">Powered by</div>
              <div className="flex items-center justify-center gap-4">
                <Badge className="bg-white/10 text-white/60 border-0">Stripe</Badge>
                <Badge className="bg-white/10 text-white/60 border-0">PCI DSS Compliant</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
