import { useState } from 'react';
import { ArrowLeft, CheckCircle, X, ChevronRight, DollarSign, Calendar, Clock, MapPin, Shield, Star, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import LogoFinal from '../common/LogoFinal';
import PaymentMethodSelector from '../payment/PaymentMethodSelector';
import PaymentConfirmation from '../payment/PaymentConfirmation';

interface ServiceBookingFlowProps {
  provider: any;
  onClose: () => void;
  onBook: (bookingData: any) => void;
}

export default function ServiceBookingFlow({ provider, onClose, onBook }: ServiceBookingFlowProps) {
  const [step, setStep] = useState<'details' | 'review' | 'payment' | 'processing' | 'confirmation'>('details');
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    location: '',
    city: 'Chicago',
    state: 'IL',
    zip: '',
    description: '',
    estimatedHours: 2,
    paymentDetails: null as any
  });

  const [transactionId] = useState(`SVC-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`);

  const handleInputChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const totalCost = provider.hourlyRate * formData.estimatedHours;
  const platformFee = totalCost * 0.05; // 5% platform fee
  const escrowAmount = totalCost;
  const providerEarnings = totalCost * 0.9; // Provider gets 90%

  const handleDetailsSubmit = () => {
    if (!formData.date || !formData.time || !formData.location || !formData.description) {
      alert('Please fill in all required fields');
      return;
    }
    setStep('review');
  };

  const handleReviewConfirm = () => {
    setStep('payment');
  };

  const handlePaymentComplete = (method: 'stripe' | 'paypal', details: any) => {
    handleInputChange('paymentDetails', details);
    setStep('processing');

    // Simulate payment processing
    setTimeout(() => {
      const bookingData = {
        ...formData,
        paymentDetails: details,
        providerId: provider.id,
        providerName: provider.name,
        service: provider.service,
        hourlyRate: provider.hourlyRate,
        totalCost,
        platformFee,
        providerEarnings,
        transactionId,
        status: 'scheduled',
        escrowHeld: true,
        createdAt: new Date().toISOString()
      };

      onBook(bookingData);
      setStep('confirmation');
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/5 bg-[#121212] sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button onClick={onClose} variant="ghost" size="icon" className="text-white/60 hover:text-white">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <LogoFinal size="md" />
            </div>
            <Button onClick={onClose} variant="ghost" size="icon" className="text-white/60 hover:text-white">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Progress Steps */}
        {step !== 'processing' && step !== 'confirmation' && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {[
                { id: 'details', label: 'Job Details' },
                { id: 'review', label: 'Review' },
                { id: 'payment', label: 'Payment' }
              ].map((s, index) => (
                <div key={s.id} className="flex items-center flex-1">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step === s.id ? 'bg-[#A8F32C] text-black' :
                      (step === 'review' && index < 1) ? 'bg-[#A8F32C] text-black' :
                      (step === 'payment' && index < 2) ? 'bg-[#A8F32C] text-black' :
                      'bg-white/10 text-white/60'
                    }`}>
                      {((step === 'review' && index < 1) || (step === 'payment' && index < 2)) ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <span className={step === s.id ? 'text-white' : 'text-white/60'}>{s.label}</span>
                  </div>
                  {index < 2 && <div className="flex-1 h-0.5 bg-white/10 mx-4" />}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Provider Summary */}
        {step !== 'processing' && step !== 'confirmation' && (
          <Card className="bg-gradient-to-r from-blue-500/10 to-transparent border-blue-500/30 p-6 mb-8">
            <div className="flex gap-6">
              <img src={provider.avatar} alt={provider.name} className="w-24 h-24 rounded-full object-cover" />
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl mb-2 text-white">{provider.name}</h2>
                    <div className="text-lg text-white/80 mb-2">{provider.service}</div>
                    <div className="flex gap-2 mb-2">
                      <Badge className="bg-yellow-400/20 text-yellow-400 border-yellow-400/30">
                        ⭐ {provider.rating} ({provider.reviews} reviews)
                      </Badge>
                      <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30">
                        {provider.jobsCompleted} jobs
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl text-white">${provider.hourlyRate}/hr</div>
                    <div className="text-sm text-white/60">Starting rate</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* STEP 1: JOB DETAILS */}
        {step === 'details' && (
          <div className="space-y-6">
            <Card className="bg-[#121212] border-white/10 p-6">
              <h3 className="text-xl mb-4 text-white">When do you need this service?</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-white/60 mb-2">Date (Required) *</label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    className="bg-black/50 border-white/20 text-white"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-2">Time (Required) *</label>
                  <Input
                    type="time"
                    value={formData.time}
                    onChange={(e) => handleInputChange('time', e.target.value)}
                    className="bg-black/50 border-white/20 text-white"
                  />
                </div>
              </div>
            </Card>

            <Card className="bg-[#121212] border-white/10 p-6">
              <h3 className="text-xl mb-4 text-white">Where is the job located?</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-white/60 mb-2">Street Address (Required) *</label>
                  <Input
                    placeholder="123 Main St, Apt 2B"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="bg-black/50 border-white/20 text-white"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-white/60 mb-2">City</label>
                    <Input
                      placeholder="Chicago"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="bg-black/50 border-white/20 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white/60 mb-2">State</label>
                    <Input
                      placeholder="IL"
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      className="bg-black/50 border-white/20 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white/60 mb-2">ZIP Code</label>
                    <Input
                      placeholder="60601"
                      value={formData.zip}
                      onChange={(e) => handleInputChange('zip', e.target.value)}
                      className="bg-black/50 border-white/20 text-white"
                      maxLength={5}
                    />
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-[#121212] border-white/10 p-6">
              <h3 className="text-xl mb-4 text-white">Job Description</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-white/60 mb-2">What needs to be done? (Required) *</label>
                  <textarea
                    placeholder="Describe the work you need done in detail. Include any specific requirements, tools needed, or preferences..."
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full bg-black/50 border border-white/20 text-white rounded-md p-3 min-h-[120px]"
                  />
                  <div className="text-xs text-white/60 mt-1">
                    Be as detailed as possible to get an accurate quote
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-2">Estimated Duration (hours)</label>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/20 text-white"
                      onClick={() => handleInputChange('estimatedHours', Math.max(1, formData.estimatedHours - 0.5))}
                    >
                      −
                    </Button>
                    <div className="flex-1 text-center">
                      <div className="text-2xl text-white">{formData.estimatedHours}</div>
                      <div className="text-sm text-white/60">hours</div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/20 text-white"
                      onClick={() => handleInputChange('estimatedHours', formData.estimatedHours + 0.5)}
                    >
                      +
                    </Button>
                  </div>
                  <div className="text-sm text-white/60 text-center mt-2">
                    Estimated cost: ${(provider.hourlyRate * formData.estimatedHours).toFixed(2)}
                  </div>
                </div>
              </div>
            </Card>

            <Button
              className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90 h-12"
              onClick={handleDetailsSubmit}
            >
              Review Booking
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        )}

        {/* STEP 2: REVIEW */}
        {step === 'review' && (
          <div className="space-y-6">
            <Card className="bg-[#121212] border-white/10 p-6">
              <h3 className="text-xl mb-4 text-white">Booking Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-start pb-4 border-b border-white/10">
                  <div>
                    <div className="text-sm text-white/60 mb-1">Service</div>
                    <div className="text-white">{provider.service}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-white/60 mb-1">Provider</div>
                    <div className="text-white">{provider.name}</div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="text-white/60">Date & Time:</div>
                  <div className="text-white">{new Date(formData.date).toLocaleDateString()} at {formData.time}</div>
                </div>

                <div className="flex justify-between">
                  <div className="text-white/60">Location:</div>
                  <div className="text-white text-right">{formData.location}, {formData.city} {formData.zip}</div>
                </div>

                <div className="flex justify-between">
                  <div className="text-white/60">Description:</div>
                  <div className="text-white text-right max-w-xs">{formData.description}</div>
                </div>

                <div className="flex justify-between pt-4 border-t border-white/10">
                  <div className="text-white/60">Estimated Duration:</div>
                  <div className="text-white">{formData.estimatedHours} hours</div>
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-to-r from-[#A8F32C]/10 to-transparent border-[#A8F32C]/30 p-6">
              <h3 className="text-xl mb-4 text-white">Cost Breakdown</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/80">
                    Service ({formData.estimatedHours} hrs × ${provider.hourlyRate}/hr)
                  </span>
                  <span className="text-white">${totalCost.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-sm text-white/60">
                  <span>Platform fee (5%)</span>
                  <span>${platformFee.toFixed(2)}</span>
                </div>

                <div className="flex justify-between pt-3 border-t border-white/10">
                  <span className="text-lg text-white">Total (Held in Escrow)</span>
                  <span className="text-2xl text-[#A8F32C]">${escrowAmount.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-4 bg-black/50 border border-white/10 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-white/80">
                    <strong className="text-white">Payment Protection:</strong> Your payment is held securely in escrow. 
                    Funds are only released to the provider after you confirm the job is complete to your satisfaction.
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-[#121212] border-white/10 p-6">
              <h3 className="text-lg mb-3 text-white">What happens after booking?</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 text-white text-sm">1</div>
                  <div>
                    <div className="text-white">Provider Confirms</div>
                    <div className="text-sm text-white/60">Provider will confirm the booking within 24 hours</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 text-white text-sm">2</div>
                  <div>
                    <div className="text-white">Service Completed</div>
                    <div className="text-sm text-white/60">Provider arrives and completes the work</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 text-white text-sm">3</div>
                  <div>
                    <div className="text-white">You Approve Payment</div>
                    <div className="text-sm text-white/60">Payment released from escrow once you're satisfied</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 text-white text-sm">4</div>
                  <div>
                    <div className="text-white">Leave a Review</div>
                    <div className="text-sm text-white/60">Help the community by rating your experience</div>
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 border-white/20 text-white"
                onClick={() => setStep('details')}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Edit Details
              </Button>
              <Button
                className="flex-1 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90 h-12"
                onClick={handleReviewConfirm}
              >
                Continue to Payment
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: PAYMENT */}
        {step === 'payment' && (
          <div className="space-y-6">
            <Card className="bg-gradient-to-r from-[#A8F32C]/10 to-transparent border-[#A8F32C]/30 p-6">
              <div className="flex items-start gap-4">
                <Shield className="h-8 w-8 text-[#A8F32C] flex-shrink-0" />
                <div>
                  <h3 className="text-xl mb-2 text-white">Secure Escrow Payment</h3>
                  <p className="text-white/80">
                    Your payment of <strong className="text-[#A8F32C]">${escrowAmount.toFixed(2)}</strong> will be held securely in escrow. 
                    The provider only receives payment after you confirm the job is complete and you're satisfied with the work.
                  </p>
                </div>
              </div>
            </Card>

            <PaymentMethodSelector
              amount={escrowAmount}
              description={`${provider.service} - ${formData.estimatedHours} hours`}
              onPaymentMethodSelected={handlePaymentComplete}
              onCancel={() => setStep('review')}
            />
          </div>
        )}

        {/* STEP 4: PROCESSING */}
        {step === 'processing' && (
          <div className="flex items-center justify-center py-20">
            <Card className="bg-[#121212] border-white/10 p-8 max-w-md w-full text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#A8F32C] border-t-transparent mx-auto mb-6" />
              <h3 className="text-2xl mb-3 text-white">Processing Your Booking</h3>
              <p className="text-white/80 mb-6">
                Please wait while we secure your payment and notify the provider...
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Payment authorized</span>
                  <CheckCircle className="h-5 w-5 text-green-400" />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Funds held in escrow</span>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#A8F32C] border-t-transparent" />
                </div>
                <div className="flex items-center justify-between text-sm text-white/40">
                  <span>Notifying provider</span>
                  <div className="w-4 h-4" />
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* STEP 5: CONFIRMATION */}
        {step === 'confirmation' && (
          <PaymentConfirmation
            amount={escrowAmount}
            description={`${provider.service} - ${formData.estimatedHours} hours`}
            transactionId={transactionId}
            paymentMethod={formData.paymentDetails}
            onContinue={onClose}
            onDownloadReceipt={() => alert('Receipt downloaded!')}
            additionalDetails={[
              { label: 'Provider', value: provider.name },
              { label: 'Service', value: provider.service },
              { label: 'Date & Time', value: `${new Date(formData.date).toLocaleDateString()} at ${formData.time}` },
              { label: 'Location', value: formData.location },
              { label: 'Duration', value: `${formData.estimatedHours} hours` },
              { label: 'Status', value: 'Awaiting Provider Confirmation' },
              { label: 'Escrow', value: `$${escrowAmount.toFixed(2)} held securely` }
            ]}
          />
        )}
      </div>
    </div>
  );
}
