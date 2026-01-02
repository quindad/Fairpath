import { useState } from 'react';
import { ArrowLeft, ArrowRight, Zap, CreditCard, CheckCircle, Shield, FileText } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import { UserProfile } from '../ProfileSetupWizard';
import { PropertyListing } from '../../lib/eligibility';

interface FastTrackApplicationProps {
  property: PropertyListing;
  userProfile: UserProfile | null;
  isSubscriber: boolean;
  onBack: () => void;
  onComplete: (applicationId: string) => void;
  onSubscribe: () => void;
}

export default function FastTrackApplication({
  property,
  userProfile,
  isSubscriber,
  onBack,
  onComplete,
  onSubscribe,
}: FastTrackApplicationProps) {
  const [step, setStep] = useState(1);
  const [agreedToScreening, setAgreedToScreening] = useState(false);
  const [showSubscribeUpsell, setShowSubscribeUpsell] = useState(false);
  
  const [additionalInfo, setAdditionalInfo] = useState({
    currentEmployer: '',
    monthlyIncome: '',
    references: '',
    additionalNotes: '',
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    zipCode: '',
  });

  const fastTrackFee = isSubscriber ? 65 : 75;
  const totalSteps = 3;

  const handlePayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      // Generate mock application ID
      const applicationId = `FAF-${Date.now()}`;
      onComplete(applicationId);
    }, 1500);
  };

  // Step 1: Review & Additional Info
  if (step === 1) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-4 mb-4">
            <button onClick={onBack} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex-1">
              <div className="text-xs tracking-widest text-[#A8F32C] mb-1">
                FASTTRACK APPLICATION
              </div>
              <h1 className="text-xl">Review Your Information</h1>
            </div>
          </div>
          
          {/* Progress */}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1 bg-[#A8F32C] rounded-full" />
            <div className="flex-1 h-1 bg-white/10 rounded-full" />
            <div className="flex-1 h-1 bg-white/10 rounded-full" />
          </div>
          <p className="text-xs text-white/60 mt-2">Step {step} of {totalSteps}</p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Property Summary */}
          <div className="bg-[#121212] rounded-xl p-4 border border-white/5">
            <div className="text-xs text-[#A8F32C] mb-2">APPLYING TO</div>
            <h3 className="text-lg mb-1">{property.title}</h3>
            <p className="text-sm text-white/60">{property.city}, {property.state}</p>
            <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
              <span className="text-sm text-white/60">Monthly Rent</span>
              <span className="text-lg text-[#A8F32C]">${property.rent.toLocaleString()}</span>
            </div>
          </div>

          {/* Profile Review */}
          <div className="bg-[#121212] rounded-xl p-5 border border-white/5">
            <h3 className="text-lg mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-[#A8F32C]" />
              Your Profile Information
            </h3>
            
            {userProfile && (
              <div className="space-y-3 text-sm">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-xs text-white/60 mb-1">Name</div>
                    <div>{userProfile.firstName} {userProfile.lastName}</div>
                  </div>
                  <div>
                    <div className="text-xs text-white/60 mb-1">Phone</div>
                    <div>{userProfile.phone}</div>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-white/60 mb-1">Location</div>
                  <div>{userProfile.city}, {userProfile.state}</div>
                </div>
                <div>
                  <div className="text-xs text-white/60 mb-1">Monthly Income Range</div>
                  <div>${userProfile.monthlyIncome}</div>
                </div>
              </div>
            )}
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="text-lg">Additional Information</h3>
            
            <div>
              <Label htmlFor="employer">Current Employer (if applicable)</Label>
              <Input
                id="employer"
                value={additionalInfo.currentEmployer}
                onChange={(e) => setAdditionalInfo({ ...additionalInfo, currentEmployer: e.target.value })}
                className="bg-[#121212] border-white/10 text-white h-12"
                placeholder="Company name"
              />
            </div>

            <div>
              <Label htmlFor="income">Current Monthly Income</Label>
              <Input
                id="income"
                type="number"
                value={additionalInfo.monthlyIncome}
                onChange={(e) => setAdditionalInfo({ ...additionalInfo, monthlyIncome: e.target.value })}
                className="bg-[#121212] border-white/10 text-white h-12"
                placeholder="3000"
                required
              />
            </div>

            <div>
              <Label htmlFor="references">References (2-3 contacts)</Label>
              <Textarea
                id="references"
                value={additionalInfo.references}
                onChange={(e) => setAdditionalInfo({ ...additionalInfo, references: e.target.value })}
                className="bg-[#121212] border-white/10 text-white"
                placeholder="Name, phone, relationship..."
              />
            </div>

            <div>
              <Label htmlFor="notes">Additional Notes (Optional)</Label>
              <Textarea
                id="notes"
                value={additionalInfo.additionalNotes}
                onChange={(e) => setAdditionalInfo({ ...additionalInfo, additionalNotes: e.target.value })}
                className="bg-[#121212] border-white/10 text-white"
                placeholder="Anything else the landlord should know..."
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/5">
          <Button
            onClick={() => setStep(2)}
            className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90 h-14"
            disabled={!additionalInfo.monthlyIncome}
          >
            Continue to Screening Consent
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    );
  }

  // Step 2: Screening Consent
  if (step === 2) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-4 mb-4">
            <button onClick={() => setStep(1)} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex-1">
              <div className="text-xs tracking-widest text-[#A8F32C] mb-1">
                FASTTRACK APPLICATION
              </div>
              <h1 className="text-xl">Screening Consent</h1>
            </div>
          </div>
          
          {/* Progress */}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1 bg-[#A8F32C] rounded-full" />
            <div className="flex-1 h-1 bg-[#A8F32C] rounded-full" />
            <div className="flex-1 h-1 bg-white/10 rounded-full" />
          </div>
          <p className="text-xs text-white/60 mt-2">Step {step} of {totalSteps}</p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* SingleKey Info */}
          <div className="bg-gradient-to-br from-[#A8F32C]/10 via-transparent to-transparent rounded-2xl p-1">
            <div className="bg-[#121212] rounded-2xl p-5 border border-[#A8F32C]/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#A8F32C]/10 rounded-xl flex items-center justify-center">
                  <Shield className="h-6 w-6 text-[#A8F32C]" />
                </div>
                <div>
                  <h3 className="mb-1">Powered by SingleKey</h3>
                  <p className="text-xs text-white/60">Industry-leading tenant screening</p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                  <span className="text-white/80">Credit report from major bureaus</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                  <span className="text-white/80">Eviction history search</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                  <span className="text-white/80">Criminal background check</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                  <span className="text-white/80">You receive a copy of your full report</span>
                </div>
              </div>
            </div>
          </div>

          {/* Consent Text */}
          <div className="bg-[#121212] rounded-xl p-5 border border-white/5 max-h-64 overflow-y-auto">
            <h3 className="text-sm mb-3">Screening Authorization & Consent</h3>
            <div className="text-xs text-white/60 space-y-2 leading-relaxed">
              <p>
                By checking the box below, I authorize Friend A Felon and its designated screening provider, SingleKey, to obtain consumer reports including but not limited to credit reports, eviction records, and criminal background checks for the purpose of evaluating my rental application.
              </p>
              <p>
                I understand that this screening report will be provided to the property owner/manager listed in this application, and that I will also receive a copy of the screening report for my records.
              </p>
              <p>
                I certify that the information provided in this application is true and complete to the best of my knowledge. I understand that false or misleading information may result in denial of my application or termination of any rental agreement.
              </p>
              <p>
                This authorization complies with the Fair Credit Reporting Act (FCRA) and applicable state laws.
              </p>
            </div>
          </div>

          {/* Consent Checkbox */}
          <div className="bg-[#A8F32C]/5 border border-[#A8F32C]/20 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Checkbox
                id="screening-consent"
                checked={agreedToScreening}
                onCheckedChange={(checked) => setAgreedToScreening(checked as boolean)}
                className="mt-1 border-white/20 data-[state=checked]:bg-[#A8F32C] data-[state=checked]:border-[#A8F32C]"
              />
              <label htmlFor="screening-consent" className="text-sm text-white/90 leading-relaxed flex-1">
                I have read and agree to the screening authorization above. I authorize Friend A Felon and SingleKey to run a full tenant screening report and share it with the property owner.
              </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/5 space-y-3">
          <Button
            onClick={() => setStep(3)}
            className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90 h-14"
            disabled={!agreedToScreening}
          >
            Continue to Payment
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <p className="text-xs text-center text-white/60">
            Your information is encrypted and secure
          </p>
        </div>
      </div>
    );
  }

  // Step 3: Payment
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={() => setStep(2)} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex-1">
            <div className="text-xs tracking-widest text-[#A8F32C] mb-1">
              FASTTRACK APPLICATION
            </div>
            <h1 className="text-xl">Payment</h1>
          </div>
        </div>
        
        {/* Progress */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1 bg-[#A8F32C] rounded-full" />
          <div className="flex-1 h-1 bg-[#A8F32C] rounded-full" />
          <div className="flex-1 h-1 bg-[#A8F32C] rounded-full" />
        </div>
        <p className="text-xs text-white/60 mt-2">Step {step} of {totalSteps}</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Subscription Upsell (if not subscribed) */}
        {!isSubscriber && !showSubscribeUpsell && (
          <div className="bg-gradient-to-br from-[#A8F32C]/10 via-transparent to-transparent rounded-2xl p-1">
            <div className="bg-[#121212] rounded-2xl p-5 border border-[#A8F32C]/20">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1">
                  <h3 className="mb-1">💡 Save $10 with FairPath+</h3>
                  <p className="text-sm text-white/60">
                    Join for just $2/month and pay $65 instead of $75 on every application
                  </p>
                </div>
                <button
                  onClick={() => setShowSubscribeUpsell(false)}
                  className="text-white/40 hover:text-white text-sm"
                >
                  ✕
                </button>
              </div>
              <Button
                onClick={onSubscribe}
                variant="outline"
                className="w-full border-[#A8F32C] text-[#A8F32C] hover:bg-[#A8F32C]/10"
              >
                Activate FairPath+ & Save
              </Button>
            </div>
          </div>
        )}

        {/* Order Summary */}
        <div className="bg-[#121212] rounded-xl p-5 border border-white/5">
          <h3 className="text-lg mb-4">Order Summary</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <span className="text-white/80">FastTrack Application</span>
              <span>${fastTrackFee}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-white/80">SingleKey Screening</span>
              <span className="text-[#A8F32C]">Included</span>
            </div>
            {isSubscriber && (
              <div className="flex items-center justify-between py-2 text-[#A8F32C] text-sm">
                <span>FairPath+ Discount</span>
                <span>-$10</span>
              </div>
            )}
            
            <div className="border-t border-white/5 pt-3 mt-3">
              <div className="flex items-center justify-between">
                <span className="text-lg">Total</span>
                <span className="text-2xl text-[#A8F32C]">${fastTrackFee}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <CreditCard className="h-5 w-5 text-[#A8F32C]" />
            <h3 className="text-lg">Payment Information</h3>
          </div>

          <div>
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              value={paymentInfo.cardNumber}
              onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
              className="bg-[#121212] border-white/10 text-white h-12"
              placeholder="4242 4242 4242 4242"
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <Label htmlFor="expiry">Expiry</Label>
              <Input
                id="expiry"
                value={paymentInfo.expiry}
                onChange={(e) => setPaymentInfo({ ...paymentInfo, expiry: e.target.value })}
                className="bg-[#121212] border-white/10 text-white h-12"
                placeholder="MM/YY"
                required
              />
            </div>
            <div>
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                value={paymentInfo.cvv}
                onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                className="bg-[#121212] border-white/10 text-white h-12"
                placeholder="123"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="zipCode">Billing ZIP Code</Label>
            <Input
              id="zipCode"
              value={paymentInfo.zipCode}
              onChange={(e) => setPaymentInfo({ ...paymentInfo, zipCode: e.target.value })}
              className="bg-[#121212] border-white/10 text-white h-12"
              placeholder="12345"
              required
            />
          </div>
        </div>

        {/* Security Note */}
        <div className="flex items-start gap-3 bg-white/5 rounded-xl p-4">
          <Shield className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
          <p className="text-xs text-white/60">
            Your payment information is encrypted and secure. We use industry-standard security to protect your data.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-white/5">
        <Button
          onClick={handlePayment}
          className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90 h-14 text-base"
        >
          <Zap className="mr-2 h-5 w-5" />
          Submit Application & Pay ${fastTrackFee}
        </Button>
        <p className="text-xs text-center text-white/60 mt-3">
          By submitting, you agree to the screening authorization and payment terms
        </p>
      </div>
    </div>
  );
}