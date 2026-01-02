import { useState } from 'react';
import { CreditCard, DollarSign, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';

interface PaymentMethodSelectorProps {
  amount: number;
  description: string;
  onPaymentMethodSelected: (method: 'stripe' | 'paypal', details: any) => void;
  onCancel: () => void;
  showSavedMethods?: boolean;
}

export default function PaymentMethodSelector({
  amount,
  description,
  onPaymentMethodSelected,
  onCancel,
  showSavedMethods = true
}: PaymentMethodSelectorProps) {
  const [selectedMethod, setSelectedMethod] = useState<'stripe' | 'paypal' | 'saved' | null>(null);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [processing, setProcessing] = useState(false);

  // Mock saved payment methods
  const savedMethods = [
    { id: 1, type: 'visa', last4: '4242', expiry: '12/25' },
    { id: 2, type: 'mastercard', last4: '5555', expiry: '08/26' }
  ];

  const handleCardNumberChange = (value: string) => {
    // Format card number with spaces
    const cleaned = value.replace(/\s/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    setCardNumber(formatted.slice(0, 19)); // Max 16 digits + 3 spaces
  };

  const handleExpiryChange = (value: string) => {
    // Format as MM/YY
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      setExpiry(`${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`);
    } else {
      setExpiry(cleaned);
    }
  };

  const handleCvvChange = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    setCvv(cleaned.slice(0, 4)); // Max 4 digits for Amex
  };

  const handleSubmit = async () => {
    if (!selectedMethod) return;

    setProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const paymentDetails = {
      method: selectedMethod === 'saved' ? 'stripe' : selectedMethod,
      ...(selectedMethod === 'stripe' && {
        cardNumber: cardNumber.replace(/\s/g, ''),
        last4: cardNumber.slice(-4),
        expiry,
        cvv,
        nameOnCard,
        zipCode
      }),
      ...(selectedMethod === 'saved' && {
        savedMethodId: 1,
        last4: '4242'
      }),
      amount,
      timestamp: new Date().toISOString()
    };

    onPaymentMethodSelected(selectedMethod === 'saved' ? 'stripe' : selectedMethod, paymentDetails);
  };

  const isStripeFormValid = () => {
    return (
      cardNumber.replace(/\s/g, '').length === 16 &&
      expiry.length === 5 &&
      cvv.length >= 3 &&
      nameOnCard.length > 0 &&
      zipCode.length === 5
    );
  };

  return (
    <div className="space-y-6">
      {/* Amount Summary */}
      <Card className="bg-gradient-to-r from-[#A8F32C]/10 to-transparent border-[#A8F32C]/30 p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-white/60 mb-1">Total Amount</div>
            <div className="text-3xl text-white">${amount.toFixed(2)}</div>
            <div className="text-sm text-white/80 mt-1">{description}</div>
          </div>
          <div className="w-16 h-16 rounded-full bg-[#A8F32C]/20 flex items-center justify-center">
            <DollarSign className="h-8 w-8 text-[#A8F32C]" />
          </div>
        </div>
      </Card>

      {/* Saved Payment Methods */}
      {showSavedMethods && savedMethods.length > 0 && (
        <div>
          <div className="text-lg mb-3 text-white">Saved Payment Methods</div>
          <div className="space-y-2">
            {savedMethods.map((method) => (
              <Card
                key={method.id}
                className={`p-4 cursor-pointer transition-all ${
                  selectedMethod === 'saved'
                    ? 'bg-[#A8F32C]/10 border-[#A8F32C]'
                    : 'bg-[#121212] border-white/10 hover:border-white/30'
                }`}
                onClick={() => setSelectedMethod('saved')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-white/60" />
                    <div>
                      <div className="text-white capitalize">{method.type} ••••{method.last4}</div>
                      <div className="text-sm text-white/60">Expires {method.expiry}</div>
                    </div>
                  </div>
                  {selectedMethod === 'saved' && (
                    <Check className="h-5 w-5 text-[#A8F32C]" />
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Payment Method Selection */}
      <div>
        <div className="text-lg mb-3 text-white">Add New Payment Method</div>
        <div className="grid md:grid-cols-2 gap-3">
          <Card
            className={`p-4 cursor-pointer transition-all ${
              selectedMethod === 'stripe'
                ? 'bg-[#A8F32C]/10 border-[#A8F32C]'
                : 'bg-[#121212] border-white/10 hover:border-white/30'
            }`}
            onClick={() => setSelectedMethod('stripe')}
          >
            <div className="flex items-center gap-3">
              <CreditCard className="h-6 w-6 text-white" />
              <div>
                <div className="text-white">Credit / Debit Card</div>
                <div className="text-sm text-white/60">Visa, Mastercard, Amex</div>
              </div>
              {selectedMethod === 'stripe' && (
                <Check className="h-5 w-5 text-[#A8F32C] ml-auto" />
              )}
            </div>
          </Card>

          <Card
            className={`p-4 cursor-pointer transition-all ${
              selectedMethod === 'paypal'
                ? 'bg-[#A8F32C]/10 border-[#A8F32C]'
                : 'bg-[#121212] border-white/10 hover:border-white/30'
            }`}
            onClick={() => setSelectedMethod('paypal')}
          >
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded bg-blue-500 flex items-center justify-center text-white text-xs">PP</div>
              <div>
                <div className="text-white">PayPal</div>
                <div className="text-sm text-white/60">Pay with PayPal balance</div>
              </div>
              {selectedMethod === 'paypal' && (
                <Check className="h-5 w-5 text-[#A8F32C] ml-auto" />
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Stripe Card Form */}
      {selectedMethod === 'stripe' && (
        <Card className="bg-[#121212] border-white/10 p-6">
          <div className="text-lg mb-4 text-white">Card Information</div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-white/60 mb-2">Card Number</label>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => handleCardNumberChange(e.target.value)}
                  className="bg-black/50 border-white/20 text-white pr-12"
                  maxLength={19}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                  <div className="w-6 h-4 rounded bg-blue-500/20 border border-blue-500/50" />
                  <div className="w-6 h-4 rounded bg-red-500/20 border border-red-500/50" />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-white/60 mb-2">Expiration Date</label>
                <Input
                  type="text"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => handleExpiryChange(e.target.value)}
                  className="bg-black/50 border-white/20 text-white"
                  maxLength={5}
                />
              </div>

              <div>
                <label className="block text-sm text-white/60 mb-2">CVV</label>
                <Input
                  type="text"
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => handleCvvChange(e.target.value)}
                  className="bg-black/50 border-white/20 text-white"
                  maxLength={4}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-white/60 mb-2">Name on Card</label>
              <Input
                type="text"
                placeholder="John Smith"
                value={nameOnCard}
                onChange={(e) => setNameOnCard(e.target.value)}
                className="bg-black/50 border-white/20 text-white"
              />
            </div>

            <div>
              <label className="block text-sm text-white/60 mb-2">Billing ZIP Code</label>
              <Input
                type="text"
                placeholder="60601"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
                className="bg-black/50 border-white/20 text-white"
                maxLength={5}
              />
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 flex items-start gap-2">
              <Check className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-white/80">
                Your payment information is encrypted and secure. We never store your full card details.
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* PayPal Notice */}
      {selectedMethod === 'paypal' && (
        <Card className="bg-[#121212] border-white/10 p-6">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
              <div className="text-2xl text-blue-400">PP</div>
            </div>
            <div className="text-lg text-white mb-2">Pay with PayPal</div>
            <div className="text-white/60 mb-4">
              You'll be redirected to PayPal to complete your payment of ${amount.toFixed(2)}
            </div>
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
              Secure PayPal Checkout
            </Badge>
          </div>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          variant="outline"
          className="flex-1 border-white/20 text-white"
          onClick={onCancel}
          disabled={processing}
        >
          Cancel
        </Button>
        <Button
          className="flex-1 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
          onClick={handleSubmit}
          disabled={
            !selectedMethod ||
            (selectedMethod === 'stripe' && !isStripeFormValid()) ||
            processing
          }
        >
          {processing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent mr-2" />
              Processing...
            </>
          ) : (
            <>Pay ${amount.toFixed(2)}</>
          )}
        </Button>
      </div>

      {/* Security Notice */}
      <div className="text-center text-sm text-white/60">
        <div className="flex items-center justify-center gap-2">
          <Check className="h-4 w-4" />
          <span>Secured by 256-bit SSL encryption</span>
        </div>
      </div>
    </div>
  );
}
