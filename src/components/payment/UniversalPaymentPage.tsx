import { useState } from 'react';
import { CreditCard, Lock, Check, Apple } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import LogoFinal from '../common/LogoFinal';

interface UniversalPaymentPageProps {
  amount: number;
  description: string;
  itemType: 'subscription' | 'fasttrack' | 'package' | 'addon';
  itemName: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function UniversalPaymentPage({
  amount,
  description,
  itemType,
  itemName,
  onSuccess,
  onCancel
}: UniversalPaymentPageProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'applepay'>('card');
  const [processing, setProcessing] = useState(false);
  
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiry: '',
    cvc: '',
    name: '',
    zipCode: ''
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

  const handlePayPal = () => {
    setProcessing(true);
    // Simulate PayPal redirect
    setTimeout(() => {
      setProcessing(false);
      onSuccess();
    }, 1500);
  };

  const handleApplePay = () => {
    setProcessing(true);
    // Simulate Apple Pay
    setTimeout(() => {
      setProcessing(false);
      onSuccess();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="border-b border-white/5 bg-[#121212]">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <LogoFinal size="md" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div>
            <h2 className="text-2xl mb-6 text-white">Order Summary</h2>
            
            <Card className="bg-[#121212] border-white/10 p-6 mb-6">
              <h3 className="text-xl mb-2 text-white">{itemName}</h3>
              <p className="text-white/60 mb-6">{description}</p>

              <div className="border-t border-white/10 pt-4 space-y-3">
                <div className="flex items-center justify-between text-white">
                  <span className="text-white/60">Subtotal</span>
                  <span className="text-white">${amount.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-white">
                  <span className="text-white/60">Tax</span>
                  <span className="text-white">$0.00</span>
                </div>
                <div className="flex items-center justify-between text-xl pt-3 border-t border-white/10">
                  <span className="text-white">Total</span>
                  <span className="text-[#A8F32C]">${amount.toFixed(2)}</span>
                </div>
              </div>
            </Card>

            <div className="bg-black/50 border border-white/10 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Lock className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                <div className="text-sm text-white/60">
                  <p className="mb-2 text-white/80">Your payment is secure and encrypted</p>
                  <ul className="space-y-1 text-xs">
                    <li className="text-white/60">• 256-bit SSL encryption</li>
                    <li className="text-white/60">• PCI DSS compliant</li>
                    <li className="text-white/60">• We never store your full card details</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div>
            <h2 className="text-2xl mb-6 text-white">Payment Method</h2>

            {/* Payment Method Tabs */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-4 border-2 rounded-lg transition-all ${
                  paymentMethod === 'card'
                    ? 'border-[#A8F32C] bg-[#A8F32C]/10'
                    : 'border-white/20 hover:border-white/40'
                }`}
              >
                <CreditCard className="h-6 w-6 mb-2 mx-auto text-white" />
                <div className="text-sm text-white">Card</div>
              </button>
              
              <button
                type="button"
                onClick={() => setPaymentMethod('paypal')}
                className={`p-4 border-2 rounded-lg transition-all ${
                  paymentMethod === 'paypal'
                    ? 'border-[#A8F32C] bg-[#A8F32C]/10'
                    : 'border-white/20 hover:border-white/40'
                }`}
              >
                <div className="text-2xl mb-2">P</div>
                <div className="text-sm text-white">PayPal</div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('applepay')}
                className={`p-4 border-2 rounded-lg transition-all ${
                  paymentMethod === 'applepay'
                    ? 'border-[#A8F32C] bg-[#A8F32C]/10'
                    : 'border-white/20 hover:border-white/40'
                }`}
              >
                <Apple className="h-6 w-6 mb-2 mx-auto text-white" />
                <div className="text-sm text-white">Apple Pay</div>
              </button>
            </div>

            {/* Card Payment Form */}
            {paymentMethod === 'card' && (
              <form onSubmit={handleSubmit}>
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
                        onChange={(e) => {
                          // Format card number with spaces
                          const value = e.target.value.replace(/\s/g, '');
                          const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
                          setCardData({ ...cardData, cardNumber: formatted });
                        }}
                        className="bg-black border-white/20 text-white"
                        maxLength={19}
                        required
                      />
                      <div className="flex gap-2 mt-2">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-6" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" alt="Amex" className="h-6" />
                      </div>
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
                          onChange={(e) => {
                            // Format expiry date
                            let value = e.target.value.replace(/\D/g, '');
                            if (value.length >= 2) {
                              value = value.slice(0, 2) + '/' + value.slice(2, 4);
                            }
                            setCardData({ ...cardData, expiry: value });
                          }}
                          className="bg-black border-white/20 text-white"
                          maxLength={5}
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
                          onChange={(e) => setCardData({ ...cardData, cvc: e.target.value.replace(/\D/g, '') })}
                          className="bg-black border-white/20 text-white"
                          maxLength={4}
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

                    <div>
                      <Label htmlFor="zipCode" className="text-white mb-2 block">
                        Billing ZIP Code <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="zipCode"
                        placeholder="60614"
                        value={cardData.zipCode}
                        onChange={(e) => setCardData({ ...cardData, zipCode: e.target.value })}
                        className="bg-black border-white/20 text-white"
                        maxLength={10}
                        required
                      />
                    </div>
                  </div>
                </Card>

                <div className="space-y-3">
                  <Button
                    type="submit"
                    disabled={processing}
                    className="w-full h-12 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90 text-lg disabled:opacity-50"
                  >
                    {processing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Lock className="mr-2 h-5 w-5" />
                        Pay ${amount.toFixed(2)}
                      </>
                    )}
                  </Button>
                  
                  <Button
                    type="button"
                    onClick={onCancel}
                    variant="outline"
                    className="w-full border-white/20 text-white"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}

            {/* PayPal */}
            {paymentMethod === 'paypal' && (
              <Card className="bg-[#121212] border-white/10 p-8 text-center mb-6">
                <div className="text-4xl mb-4">💳</div>
                <h3 className="text-xl mb-2 text-white">Pay with PayPal</h3>
                <p className="text-white/60 text-sm mb-6">
                  You'll be redirected to PayPal to complete your ${amount.toFixed(2)} payment securely
                </p>
                <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 rounded-lg px-4 py-2 mb-6">
                  <Lock className="h-4 w-4 text-blue-400" />
                  <span className="text-sm text-blue-400">Secured by PayPal</span>
                </div>
                
                <div className="space-y-3">
                  <Button
                    onClick={handlePayPal}
                    disabled={processing}
                    className="w-full h-12 bg-[#0070ba] text-white hover:bg-[#003087] text-lg"
                  >
                    {processing ? 'Redirecting...' : 'Continue to PayPal'}
                  </Button>
                  <Button
                    onClick={onCancel}
                    variant="outline"
                    className="w-full border-white/20 text-white"
                  >
                    Cancel
                  </Button>
                </div>
              </Card>
            )}

            {/* Apple Pay */}
            {paymentMethod === 'applepay' && (
              <Card className="bg-[#121212] border-white/10 p-8 text-center mb-6">
                <Apple className="h-16 w-16 mx-auto mb-4 text-white" />
                <h3 className="text-xl mb-2 text-white">Pay with Apple Pay</h3>
                <p className="text-white/60 text-sm mb-6">
                  Complete your ${amount.toFixed(2)} payment with Touch ID or Face ID
                </p>
                
                <div className="space-y-3">
                  <Button
                    onClick={handleApplePay}
                    disabled={processing}
                    className="w-full h-12 bg-black border-2 border-white text-white hover:bg-white/10 text-lg"
                  >
                    {processing ? 'Processing...' : (
                      <>
                        <Apple className="mr-2 h-5 w-5" />
                        Pay with Apple Pay
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={onCancel}
                    variant="outline"
                    className="w-full border-white/20 text-white"
                  >
                    Cancel
                  </Button>
                </div>
              </Card>
            )}

            <p className="text-xs text-white/40 text-center mt-4">
              By completing this purchase, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
