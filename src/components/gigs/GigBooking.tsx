import { useState } from 'react';
import { Calendar, Clock, DollarSign, CreditCard, Check, ArrowLeft, MessageCircle, FileText } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';

interface GigBookingProps {
  gig: any;
  onComplete: () => void;
  onBack: () => void;
}

export default function GigBooking({ gig, onComplete, onBack }: GigBookingProps) {
  const [step, setStep] = useState<'details' | 'payment' | 'processing' | 'success'>('details');
  const [bookingDetails, setBookingDetails] = useState({
    date: '',
    time: '',
    hours: '',
    description: '',
    address: ''
  });
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  const platformFee = 0.05; // 5%
  const basePrice = gig.priceType === 'hourly' 
    ? gig.price * (parseInt(bookingDetails.hours) || 1)
    : gig.price;
  const serviceFee = basePrice * platformFee;
  const total = basePrice + serviceFee;

  const handleSubmitDetails = () => {
    if (bookingDetails.date && bookingDetails.time && bookingDetails.description) {
      setStep('payment');
    }
  };

  const handlePayment = () => {
    setStep('processing');
    setTimeout(() => {
      setStep('success');
    }, 2000);
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <Card className="bg-[#121212] border-[#A8F32C]/50 p-8 max-w-lg w-full">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#A8F32C]/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-8 w-8 text-[#A8F32C]" />
            </div>
            <h2 className="text-3xl mb-3">Booking Confirmed!</h2>
            <p className="text-white/60 mb-6">
              Your booking with {gig.providerName} has been confirmed
            </p>

            <div className="bg-black/50 border border-white/10 rounded-lg p-6 mb-6 text-left">
              <div className="flex items-center justify-between mb-4">
                <span className="text-white/60">Service</span>
                <span className="text-white">{gig.title}</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-white/60">Provider</span>
                <span className="text-white">{gig.providerName}</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-white/60">Date</span>
                <span className="text-white">
                  {new Date(bookingDetails.date).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-white/60">Time</span>
                <span className="text-white">{bookingDetails.time}</span>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <span className="text-white/60">Total Paid</span>
                <span className="text-[#A8F32C] text-xl">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
                onClick={onComplete}
              >
                Go to Dashboard
              </Button>
              <Button
                variant="outline"
                className="w-full border-white/20 text-white hover:bg-white/5"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Message Provider
              </Button>
            </div>

            <p className="text-sm text-white/60 mt-6">
              Payment is held in escrow until job completion. You'll receive email confirmation shortly.
            </p>
          </div>
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
          <p className="text-white/60">Securing your booking</p>
        </Card>
      </div>
    );
  }

  if (step === 'payment') {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            className="text-white/60 hover:text-white mb-6"
            onClick={() => setStep('details')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <h1 className="text-3xl mb-2">Complete Payment</h1>
          <p className="text-white/60 mb-8">Secure payment powered by Stripe</p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Payment Form */}
            <div>
              <Card className="bg-[#121212] border-white/10 p-6">
                <h3 className="text-xl mb-6">Payment Method</h3>
                
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
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-white/60 mb-2">Expiry</label>
                      <Input
                        type="text"
                        placeholder="MM/YY"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        className="bg-black/50 border-white/20 text-white"
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
                      />
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full mt-6 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
                  onClick={handlePayment}
                >
                  Pay ${total.toFixed(2)}
                </Button>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="bg-[#121212] border-white/10 p-6">
                <h3 className="text-xl mb-6">Booking Summary</h3>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <div className="text-sm text-white/60 mb-1">Service</div>
                    <div className="text-white">{gig.title}</div>
                  </div>
                  <div>
                    <div className="text-sm text-white/60 mb-1">Provider</div>
                    <div className="text-white">{gig.providerName}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-white/60 mb-1">Date</div>
                      <div className="text-white">
                        {new Date(bookingDetails.date).toLocaleDateString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-white/60 mb-1">Time</div>
                      <div className="text-white">{bookingDetails.time}</div>
                    </div>
                  </div>
                  {gig.priceType === 'hourly' && bookingDetails.hours && (
                    <div>
                      <div className="text-sm text-white/60 mb-1">Estimated Hours</div>
                      <div className="text-white">{bookingDetails.hours} hours</div>
                    </div>
                  )}
                </div>

                <div className="border-t border-white/10 pt-4 space-y-2">
                  <div className="flex items-center justify-between text-white/60">
                    <span>Service {gig.priceType === 'hourly' ? 'Rate' : 'Fee'}</span>
                    <span>${basePrice.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-white/60">
                    <span>FairPath Fee (5%)</span>
                    <span>${serviceFee.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-xl pt-2 border-t border-white/10">
                    <span className="text-white">Total</span>
                    <span className="text-[#A8F32C]">${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <div className="text-sm text-blue-400 mb-1">Escrow Protection</div>
                  <div className="text-xs text-white/60">
                    Payment held until job completion. Release payment when satisfied.
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Details step
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-3xl mx-auto">
        <Button
          variant="ghost"
          className="text-white/60 hover:text-white mb-6"
          onClick={onBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <h1 className="text-3xl mb-2">Book {gig.title}</h1>
        <p className="text-white/60 mb-8">with {gig.providerName}</p>

        <Card className="bg-[#121212] border-white/10 p-8">
          <h3 className="text-xl mb-6">Booking Details</h3>
          
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-white/60 mb-2">
                  <Calendar className="inline h-4 w-4 mr-2" />
                  Preferred Date
                </label>
                <Input
                  type="date"
                  value={bookingDetails.date}
                  onChange={(e) => setBookingDetails({ ...bookingDetails, date: e.target.value })}
                  className="bg-black/50 border-white/20 text-white"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <label className="block text-sm text-white/60 mb-2">
                  <Clock className="inline h-4 w-4 mr-2" />
                  Preferred Time
                </label>
                <Input
                  type="time"
                  value={bookingDetails.time}
                  onChange={(e) => setBookingDetails({ ...bookingDetails, time: e.target.value })}
                  className="bg-black/50 border-white/20 text-white"
                />
              </div>
            </div>

            {gig.priceType === 'hourly' && (
              <div>
                <label className="block text-sm text-white/60 mb-2">
                  Estimated Hours
                </label>
                <Input
                  type="number"
                  placeholder="e.g., 4"
                  value={bookingDetails.hours}
                  onChange={(e) => setBookingDetails({ ...bookingDetails, hours: e.target.value })}
                  className="bg-black/50 border-white/20 text-white"
                  min="1"
                />
              </div>
            )}

            <div>
              <label className="block text-sm text-white/60 mb-2">
                Service Address
              </label>
              <Input
                type="text"
                placeholder="123 Main St, Chicago, IL 60601"
                value={bookingDetails.address}
                onChange={(e) => setBookingDetails({ ...bookingDetails, address: e.target.value })}
                className="bg-black/50 border-white/20 text-white"
              />
            </div>

            <div>
              <label className="block text-sm text-white/60 mb-2">
                <FileText className="inline h-4 w-4 mr-2" />
                Job Description
              </label>
              <textarea
                placeholder="Describe what you need done..."
                value={bookingDetails.description}
                onChange={(e) => setBookingDetails({ ...bookingDetails, description: e.target.value })}
                className="w-full bg-black/50 border border-white/20 text-white rounded-lg p-3 min-h-[120px]"
              />
            </div>

            {/* Price Preview */}
            <div className="bg-black/50 border border-white/10 rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/60">Estimated Cost</span>
                <span className="text-2xl text-[#A8F32C]">${basePrice.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-white/60">
                <span>+ 5% service fee (${serviceFee.toFixed(2)})</span>
                <span>Total: ${total.toFixed(2)}</span>
              </div>
              {gig.priceType === 'starting' && (
                <p className="text-xs text-white/60 mt-2">
                  Final price may vary based on scope
                </p>
              )}
            </div>

            <Button
              className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
              onClick={handleSubmitDetails}
              disabled={!bookingDetails.date || !bookingDetails.time || !bookingDetails.description}
            >
              Continue to Payment
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
