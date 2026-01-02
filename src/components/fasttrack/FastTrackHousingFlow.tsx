import { useState } from 'react';
import { ArrowLeft, Home, DollarSign, Shield, Calendar, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';

interface FastTrackHousingFlowProps {
  property: any;
  userSubscription: 'free' | 'plus' | 'pro';
  onComplete: () => void;
  onBack: () => void;
}

type Step = 'review' | 'consent' | 'payment' | 'processing' | 'complete' | 'tracking';

export default function FastTrackHousingFlow({ 
  property, 
  userSubscription, 
  onComplete, 
  onBack 
}: FastTrackHousingFlowProps) {
  const [currentStep, setCurrentStep] = useState<Step>('review');
  const [agreedToConsent, setAgreedToConsent] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'ach'>('card');
  const [applicationId] = useState(`FT-${Date.now()}`);
  const [showingDate, setShowingDate] = useState('');
  const [showingTime, setShowingTime] = useState('');

  // Pricing based on subscription
  const pricing = {
    free: { amount: 75, singleKeyCost: 17.99, propertyOwnerShare: 45, ourRevenue: 12.01 },
    plus: { amount: 70, singleKeyCost: 17.99, propertyOwnerShare: 42, ourRevenue: 10.01 },
    pro: { amount: 65, singleKeyCost: 17.99, propertyOwnerShare: 39, ourRevenue: 8.01 }
  };

  const currentPricing = pricing[userSubscription];

  const handlePayment = () => {
    // Simulate payment processing
    console.log('💳 FASTTRACK PAYMENT PROCESSING:', {
      applicationId,
      propertyId: property.id,
      propertyAddress: property.address,
      amount: currentPricing.amount,
      userTier: userSubscription,
      breakdown: {
        userPays: currentPricing.amount,
        singleKeyCost: currentPricing.singleKeyCost,
        propertyOwnerShare: currentPricing.propertyOwnerShare,
        fairPathRevenue: currentPricing.ourRevenue
      },
      timestamp: new Date().toISOString()
    });

    setCurrentStep('processing');
    setTimeout(() => setCurrentStep('complete'), 2000);
  };

  const scheduleShowing = () => {
    console.log('📅 SHOWING SCHEDULED:', {
      applicationId,
      propertyId: property.id,
      date: showingDate,
      time: showingTime
    });
    setCurrentStep('tracking');
  };

  if (currentStep === 'review') {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="border-b border-white/10 bg-[#121212]">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <button onClick={onBack} className="flex items-center gap-2 text-white/60 hover:text-white">
              <ArrowLeft className="w-5 h-5" />
              Back to Property
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#A8F32C]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Home className="w-8 h-8 text-[#A8F32C]" />
            </div>
            <h1 className="text-3xl mb-2">FastTrack Application</h1>
            <p className="text-white/60">Get priority access with guaranteed showing</p>
          </div>

          <Card className="bg-white/5 border-white/10 p-6 mb-6">
            <h2 className="text-xl mb-4">Property Details</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-white/60">Address</span>
                <span>{property.address}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Rent</span>
                <span className="text-[#A8F32C]">${property.rent}/month</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Bedrooms</span>
                <span>{property.bedrooms} bed / {property.bathrooms} bath</span>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-r from-[#A8F32C]/20 to-transparent border-[#A8F32C]/30 p-6 mb-6">
            <h2 className="text-xl mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#A8F32C]" />
              FastTrack Benefits
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium">Guaranteed Showing</div>
                  <div className="text-sm text-white/60">Property owner must schedule viewing within 48 hours</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium">Professional Screening</div>
                  <div className="text-sm text-white/60">SingleKey background & credit check included</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium">Fair Review Process</div>
                  <div className="text-sm text-white/60">Legitimate denial reasons required</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium">Higher Approval Rate</div>
                  <div className="text-sm text-white/60">Owners must rent to 1 out of 20 FastTrack applicants</div>
                </div>
              </li>
            </ul>
          </Card>

          <Card className="bg-white/5 border-white/10 p-6 mb-6">
            <h2 className="text-xl mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              FastTrack Fee
            </h2>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-3xl text-[#A8F32C]">${currentPricing.amount}</div>
                <div className="text-sm text-white/60">
                  {userSubscription === 'pro' ? 'FairPath Pro Price' : userSubscription === 'plus' ? 'FairPath+ Price' : 'Standard Price'}
                </div>
              </div>
              {userSubscription === 'free' && (
                <div className="text-right">
                  <div className="text-sm text-white/60 mb-1">Upgrade to save:</div>
                  <div className="text-[#A8F32C]">
                    FairPath+ saves $5<br/>
                    FairPath Pro saves $10
                  </div>
                </div>
              )}
            </div>
            <div className="bg-white/5 rounded-lg p-4 space-y-2 text-sm">
              <div className="flex justify-between text-white/60">
                <span>Screening (SingleKey)</span>
                <span>${currentPricing.singleKeyCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Property Owner Share (60%)</span>
                <span>${currentPricing.propertyOwnerShare.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Platform Fee</span>
                <span>${currentPricing.ourRevenue.toFixed(2)}</span>
              </div>
              <div className="border-t border-white/10 pt-2 flex justify-between">
                <span>Total</span>
                <span className="text-[#A8F32C]">${currentPricing.amount}</span>
              </div>
            </div>
          </Card>

          <Button 
            onClick={() => setCurrentStep('consent')}
            className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
            size="lg"
          >
            Continue to Consent
          </Button>
        </div>
      </div>
    );
  }

  if (currentStep === 'consent') {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="border-b border-white/10 bg-[#121212]">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <button onClick={() => setCurrentStep('review')} className="flex items-center gap-2 text-white/60 hover:text-white">
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#A8F32C]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-[#A8F32C]" />
            </div>
            <h1 className="text-3xl mb-2">Screening Consent</h1>
            <p className="text-white/60">Review and authorize background screening</p>
          </div>

          <Card className="bg-white/5 border-white/10 p-6 mb-6">
            <h2 className="text-xl mb-4">What We'll Check</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium">Credit Report</div>
                  <div className="text-sm text-white/60">Standard credit check via SingleKey</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium">Criminal Background</div>
                  <div className="text-sm text-white/60">National and state-level background check</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium">Rental History</div>
                  <div className="text-sm text-white/60">Previous rental payment verification</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium">Income Verification</div>
                  <div className="text-sm text-white/60">Employment and income documentation</div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-white/5 border-white/10 p-6 mb-6">
            <h2 className="text-xl mb-4">Consent Agreement</h2>
            <div className="bg-white/5 rounded-lg p-4 mb-4 max-h-64 overflow-y-auto text-sm text-white/80 space-y-3">
              <p>
                By checking the box below, I authorize Friend A Felon and SingleKey to obtain consumer reports 
                and investigative consumer reports for the purpose of evaluating my rental application.
              </p>
              <p>
                I understand that this screening will include but is not limited to: credit history, criminal 
                background, eviction records, and rental history verification.
              </p>
              <p>
                I certify that all information provided in my application is true and accurate. I understand 
                that any false information may result in denial of my application or termination of tenancy.
              </p>
              <p>
                I acknowledge that the property owner will receive my screening results and may use them to 
                evaluate my rental application in accordance with Fair Housing Laws.
              </p>
              <p className="font-medium text-white">
                Application ID: {applicationId}
              </p>
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreedToConsent}
                onChange={(e) => setAgreedToConsent(e.target.checked)}
                className="w-5 h-5 mt-0.5 rounded border-white/20 bg-white/5 text-[#A8F32C] focus:ring-[#A8F32C]"
              />
              <span className="text-sm">
                I have read and agree to the screening consent agreement. I authorize the background check 
                and understand my rights under the Fair Credit Reporting Act (FCRA).
              </span>
            </label>
          </Card>

          <Button 
            onClick={() => setCurrentStep('payment')}
            disabled={!agreedToConsent}
            className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90 disabled:opacity-50 disabled:cursor-not-allowed"
            size="lg"
          >
            Continue to Payment
          </Button>
        </div>
      </div>
    );
  }

  if (currentStep === 'payment') {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="border-b border-white/10 bg-[#121212]">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <button onClick={() => setCurrentStep('consent')} className="flex items-center gap-2 text-white/60 hover:text-white">
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#A8F32C]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-8 h-8 text-[#A8F32C]" />
            </div>
            <h1 className="text-3xl mb-2">Payment</h1>
            <p className="text-white/60">Secure your FastTrack application</p>
          </div>

          <Card className="bg-white/5 border-white/10 p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl">FastTrack Fee</h2>
              <div className="text-3xl text-[#A8F32C]">${currentPricing.amount}</div>
            </div>

            <div className="space-y-4 mb-6">
              <button
                onClick={() => setPaymentMethod('card')}
                className={`w-full p-4 rounded-lg border-2 transition-all ${
                  paymentMethod === 'card' 
                    ? 'border-[#A8F32C] bg-[#A8F32C]/10' 
                    : 'border-white/10 bg-white/5'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                      💳
                    </div>
                    <div className="text-left">
                      <div className="font-medium">Credit or Debit Card</div>
                      <div className="text-sm text-white/60">Visa, Mastercard, Amex</div>
                    </div>
                  </div>
                  {paymentMethod === 'card' && (
                    <CheckCircle className="w-5 h-5 text-[#A8F32C]" />
                  )}
                </div>
              </button>

              <button
                onClick={() => setPaymentMethod('ach')}
                className={`w-full p-4 rounded-lg border-2 transition-all ${
                  paymentMethod === 'ach' 
                    ? 'border-[#A8F32C] bg-[#A8F32C]/10' 
                    : 'border-white/10 bg-white/5'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                      🏦
                    </div>
                    <div className="text-left">
                      <div className="font-medium">Bank Account (ACH)</div>
                      <div className="text-sm text-white/60">Direct bank transfer</div>
                    </div>
                  </div>
                  {paymentMethod === 'ach' && (
                    <CheckCircle className="w-5 h-5 text-[#A8F32C]" />
                  )}
                </div>
              </button>
            </div>

            {paymentMethod === 'card' && (
              <div className="space-y-4">
                <Input
                  placeholder="Card Number"
                  className="bg-white/5 border-white/10 text-white"
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="MM/YY"
                    className="bg-white/5 border-white/10 text-white"
                  />
                  <Input
                    placeholder="CVV"
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                <Input
                  placeholder="Cardholder Name"
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
            )}

            {paymentMethod === 'ach' && (
              <div className="space-y-4">
                <Input
                  placeholder="Bank Name"
                  className="bg-white/5 border-white/10 text-white"
                />
                <Input
                  placeholder="Routing Number"
                  className="bg-white/5 border-white/10 text-white"
                />
                <Input
                  placeholder="Account Number"
                  className="bg-white/5 border-white/10 text-white"
                />
                <Input
                  placeholder="Account Holder Name"
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
            )}
          </Card>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <div className="font-medium text-blue-500 mb-1">Secure Payment</div>
                <div className="text-white/80">
                  Your payment information is encrypted and processed securely through Stripe. 
                  We never store your full card details.
                </div>
              </div>
            </div>
          </div>

          <Button 
            onClick={handlePayment}
            className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
            size="lg"
          >
            Pay ${currentPricing.amount} & Submit Application
          </Button>

          <p className="text-center text-sm text-white/60 mt-4">
            By submitting payment, you agree to our terms and authorize the background screening.
          </p>
        </div>
      </div>
    );
  }

  if (currentStep === 'processing') {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 border-4 border-[#A8F32C] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h1 className="text-2xl mb-3">Processing Your Application</h1>
          <p className="text-white/60 mb-6">
            Please wait while we submit your FastTrack application and process payment...
          </p>
          <div className="text-sm text-white/40">
            Application ID: {applicationId}
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'complete') {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-[#A8F32C] rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-black" />
            </div>
            <h1 className="text-3xl mb-3">Application Submitted!</h1>
            <p className="text-white/60 text-lg">
              Your FastTrack application has been submitted successfully
            </p>
          </div>

          <Card className="bg-white/5 border-white/10 p-6 mb-6">
            <h2 className="text-xl mb-4">Application Details</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-white/60">Application ID</span>
                <span className="font-mono">{applicationId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Property</span>
                <span>{property.address}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Amount Paid</span>
                <span className="text-[#A8F32C]">${currentPricing.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Status</span>
                <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/30">
                  Screening in Progress
                </Badge>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-r from-[#A8F32C]/20 to-transparent border-[#A8F32C]/30 p-6 mb-6">
            <h2 className="text-xl mb-4">Next Steps</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium">Screening (24-48 hours)</div>
                  <div className="text-sm text-white/60">
                    SingleKey is processing your background check
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium">Showing Schedule (Within 48 hours)</div>
                  <div className="text-sm text-white/60">
                    Property owner will contact you to schedule your guaranteed showing
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium">Application Review</div>
                  <div className="text-sm text-white/60">
                    Property owner reviews results and makes decision
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Button 
              onClick={() => setCurrentStep('tracking')}
              variant="outline"
              className="border-white/20 text-white"
              size="lg"
            >
              Track Application
            </Button>
            <Button 
              onClick={onComplete}
              className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
              size="lg"
            >
              Return to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'tracking') {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="border-b border-white/10 bg-[#121212]">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <button onClick={onComplete} className="flex items-center gap-2 text-white/60 hover:text-white">
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl mb-2">Application Tracking</h1>
            <p className="text-white/60">Monitor your FastTrack application progress</p>
          </div>

          <Card className="bg-white/5 border-white/10 p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-sm text-white/60 mb-1">Application ID</div>
                <div className="font-mono text-lg">{applicationId}</div>
              </div>
              <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/30">
                In Progress
              </Badge>
            </div>

            <div className="space-y-6">
              {/* Timeline */}
              <div className="relative pl-8 space-y-6">
                <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-white/10"></div>

                {/* Payment Complete */}
                <div className="relative">
                  <div className="absolute -left-6 w-4 h-4 rounded-full bg-[#A8F32C] border-2 border-black"></div>
                  <div className="text-sm text-white/60 mb-1">10 minutes ago</div>
                  <div className="font-medium">Payment Received</div>
                  <div className="text-sm text-white/60">${currentPricing.amount} processed successfully</div>
                </div>

                {/* Screening Started */}
                <div className="relative">
                  <div className="absolute -left-6 w-4 h-4 rounded-full bg-[#A8F32C] border-2 border-black"></div>
                  <div className="text-sm text-white/60 mb-1">8 minutes ago</div>
                  <div className="font-medium">Screening Initiated</div>
                  <div className="text-sm text-white/60">SingleKey background check in progress</div>
                </div>

                {/* Pending - Property Owner */}
                <div className="relative">
                  <div className="absolute -left-6 w-4 h-4 rounded-full bg-white/20 border-2 border-black"></div>
                  <div className="text-sm text-white/60 mb-1">Pending</div>
                  <div className="font-medium text-white/60">Showing Schedule</div>
                  <div className="text-sm text-white/60">Waiting for property owner to schedule</div>
                </div>

                {/* Pending - Review */}
                <div className="relative">
                  <div className="absolute -left-6 w-4 h-4 rounded-full bg-white/20 border-2 border-black"></div>
                  <div className="text-sm text-white/60 mb-1">Pending</div>
                  <div className="font-medium text-white/60">Application Review</div>
                  <div className="text-sm text-white/60">Property owner will review screening results</div>
                </div>

                {/* Pending - Decision */}
                <div className="relative">
                  <div className="absolute -left-6 w-4 h-4 rounded-full bg-white/20 border-2 border-black"></div>
                  <div className="text-sm text-white/60 mb-1">Pending</div>
                  <div className="font-medium text-white/60">Final Decision</div>
                  <div className="text-sm text-white/60">Approval or denial notification</div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-white/5 border-white/10 p-6 mb-6">
            <h2 className="text-xl mb-4">Schedule Your Showing</h2>
            <p className="text-white/60 mb-4">
              The property owner will contact you within 48 hours. You can also suggest preferred times:
            </p>
            <div className="space-y-4">
              <Input
                type="date"
                value={showingDate}
                onChange={(e) => setShowingDate(e.target.value)}
                className="bg-white/5 border-white/10 text-white"
              />
              <Input
                type="time"
                value={showingTime}
                onChange={(e) => setShowingTime(e.target.value)}
                className="bg-white/5 border-white/10 text-white"
              />
              <Button
                onClick={scheduleShowing}
                disabled={!showingDate || !showingTime}
                className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90 disabled:opacity-50"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Request Showing Time
              </Button>
            </div>
          </Card>

          <Card className="bg-blue-500/10 border border-blue-500/30 p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-blue-500 mb-2">FastTrack Guarantee</div>
                <div className="text-sm text-white/80 space-y-2">
                  <p>
                    • Property owner must schedule showing within 48 hours
                  </p>
                  <p>
                    • If denied, you'll receive legitimate written reason
                  </p>
                  <p>
                    • Property owner must rent to 1 of 20 FastTrack applicants
                  </p>
                  <p>
                    • Report issues to support@friendafelon.com
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return null;
}
