import { useState } from 'react';
import { ArrowLeft, Home, CheckCircle, Calendar, MapPin, Zap, Building2, X, ChevronRight, Shield, FileText, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import LogoFinal from '../common/LogoFinal';
import PaymentMethodSelector from '../payment/PaymentMethodSelector';
import PaymentConfirmation from '../payment/PaymentConfirmation';

interface HousingApplicationFlowProps {
  housing: any;
  onClose: () => void;
  onApply: (applicationData: any) => void;
  hasFairPathPlus?: boolean;
}

export default function HousingApplicationFlow({ housing, onClose, onApply, hasFairPathPlus }: HousingApplicationFlowProps) {
  const [step, setStep] = useState<'details' | 'screening-consent' | 'payment' | 'processing' | 'confirmation'>('details');
  const [formData, setFormData] = useState({
    // Personal Info
    monthlyIncome: '',
    employer: '',
    employmentLength: '',
    position: '',
    employerPhone: '',
    
    // Move-in details
    moveInDate: '',
    leaseTerm: '12',
    numberOfOccupants: '1',
    pets: 'no',
    petDetails: '',
    
    // References
    reference1Name: '',
    reference1Phone: '',
    reference1Relationship: '',
    reference2Name: '',
    reference2Phone: '',
    reference2Relationship: '',
    
    // Previous Address
    previousAddress: '',
    previousLandlord: '',
    previousLandlordPhone: '',
    reasonForMoving: '',
    
    // Additional
    additionalInfo: '',
    
    // Screening consent
    consentBackgroundCheck: false,
    consentCreditCheck: false,
    consentEvictionCheck: false,
    
    // Payment
    paymentDetails: null as any
  });

  const [savedProgress, setSavedProgress] = useState(false);

  const fastTrackPrice = hasFairPathPlus ? 65 : 75;
  const transactionId = `FT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  const handleInputChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const saveProgress = () => {
    localStorage.setItem(`housing_app_${housing.id}`, JSON.stringify(formData));
    setSavedProgress(true);
    setTimeout(() => setSavedProgress(false), 2000);
  };

  const handleSubmitDetails = () => {
    // Validate required fields
    if (!formData.monthlyIncome || !formData.employer || !formData.moveInDate) {
      alert('Please fill in all required fields (Income, Employer, Move-in Date)');
      return;
    }

    // Check minimum income (2.5x rent typical requirement)
    const income = parseFloat(formData.monthlyIncome);
    const minIncome = housing.rent * 2.5;
    if (income < minIncome) {
      if (!confirm(`Your income is below the typical requirement of $${minIncome.toLocaleString()}/month (2.5x rent). Continue anyway?`)) {
        return;
      }
    }

    setStep('screening-consent');
  };

  const handleScreeningConsent = () => {
    if (!formData.consentBackgroundCheck || !formData.consentCreditCheck || !formData.consentEvictionCheck) {
      alert('You must consent to all screening checks to use FastTrack application');
      return;
    }
    setStep('payment');
  };

  const handlePaymentComplete = (method: 'stripe' | 'paypal', details: any) => {
    handleInputChange('paymentDetails', details);
    setStep('processing');

    // Simulate screening process
    setTimeout(() => {
      setStep('confirmation');
      
      const applicationData = {
        ...formData,
        paymentDetails: details,
        housingId: housing.id,
        housingAddress: housing.address,
        landlordId: housing.landlordId,
        landlordName: housing.landlordName,
        amount: fastTrackPrice,
        transactionId,
        submittedAt: new Date().toISOString(),
        status: 'screening_in_progress',
        guaranteedShowing: true
      };

      onApply(applicationData);
    }, 3000);
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
            <div className="flex items-center gap-3">
              {step !== 'confirmation' && step !== 'processing' && (
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/20 text-white"
                  onClick={saveProgress}
                >
                  {savedProgress ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4 text-green-400" />
                      Saved!
                    </>
                  ) : (
                    'Save & Finish Later'
                  )}
                </Button>
              )}
              <Button onClick={onClose} variant="ghost" size="icon" className="text-white/60 hover:text-white">
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Progress Steps */}
        {step !== 'processing' && step !== 'confirmation' && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {[
                { id: 'details', label: 'Application Details' },
                { id: 'screening-consent', label: 'Screening Consent' },
                { id: 'payment', label: 'Payment' }
              ].map((s, index) => (
                <div key={s.id} className="flex items-center flex-1">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step === s.id ? 'bg-[#A8F32C] text-black' :
                      ['screening-consent', 'payment'].includes(step) && index < 1 ? 'bg-[#A8F32C] text-black' :
                      step === 'payment' && index < 2 ? 'bg-[#A8F32C] text-black' :
                      'bg-white/10 text-white/60'
                    }`}>
                      {(['screening-consent', 'payment'].includes(step) && index < 1) || (step === 'payment' && index < 2) ? (
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

        {/* Housing Summary Card */}
        {step !== 'processing' && step !== 'confirmation' && (
          <Card className="bg-gradient-to-r from-[#A8F32C]/10 to-transparent border-[#A8F32C]/30 p-6 mb-8">
            <div className="flex gap-6">
              <img src={housing.image} alt={housing.address} className="w-32 h-32 rounded-lg object-cover" />
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h2 className="text-2xl mb-2 text-white">{housing.type}</h2>
                    <div className="flex items-center gap-2 text-white/80 mb-2">
                      <MapPin className="h-4 w-4" />
                      {housing.address}
                    </div>
                    <div className="flex gap-2">
                      <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30">
                        <Zap className="mr-1 h-3 w-3" />
                        FastTrack
                      </Badge>
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                        Guaranteed Showing
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl text-white">${housing.rent}/mo</div>
                    <div className="text-sm text-white/60">{housing.landlordName}</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* STEP 1: APPLICATION DETAILS */}
        {step === 'details' && (
          <div className="space-y-6">
            <Card className="bg-[#121212] border-white/10 p-6">
              <h3 className="text-xl mb-4 text-white">Employment Information</h3>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Monthly Income (Required) *</label>
                    <Input
                      type="number"
                      placeholder="3500"
                      value={formData.monthlyIncome}
                      onChange={(e) => handleInputChange('monthlyIncome', e.target.value)}
                      className="bg-black/50 border-white/20 text-white"
                    />
                    <div className="text-xs text-white/60 mt-1">
                      Recommended minimum: ${(housing.rent * 2.5).toLocaleString()}/month
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-white/60 mb-2">Employer (Required) *</label>
                    <Input
                      placeholder="ABC Company"
                      value={formData.employer}
                      onChange={(e) => handleInputChange('employer', e.target.value)}
                      className="bg-black/50 border-white/20 text-white"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Position/Title</label>
                    <Input
                      placeholder="Warehouse Associate"
                      value={formData.position}
                      onChange={(e) => handleInputChange('position', e.target.value)}
                      className="bg-black/50 border-white/20 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white/60 mb-2">Employment Length</label>
                    <select
                      value={formData.employmentLength}
                      onChange={(e) => handleInputChange('employmentLength', e.target.value)}
                      className="w-full bg-black/50 border border-white/20 text-white rounded-md p-2"
                    >
                      <option value="">Select length</option>
                      <option value="0-3">0-3 months</option>
                      <option value="3-6">3-6 months</option>
                      <option value="6-12">6-12 months</option>
                      <option value="1-2">1-2 years</option>
                      <option value="2+">2+ years</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-2">Employer Phone</label>
                  <Input
                    type="tel"
                    placeholder="(312) 555-0100"
                    value={formData.employerPhone}
                    onChange={(e) => handleInputChange('employerPhone', e.target.value)}
                    className="bg-black/50 border-white/20 text-white"
                  />
                </div>
              </div>
            </Card>

            <Card className="bg-[#121212] border-white/10 p-6">
              <h3 className="text-xl mb-4 text-white">Move-In Details</h3>
              <div className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Desired Move-In Date (Required) *</label>
                    <Input
                      type="date"
                      value={formData.moveInDate}
                      onChange={(e) => handleInputChange('moveInDate', e.target.value)}
                      className="bg-black/50 border-white/20 text-white"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white/60 mb-2">Lease Term</label>
                    <select
                      value={formData.leaseTerm}
                      onChange={(e) => handleInputChange('leaseTerm', e.target.value)}
                      className="w-full bg-black/50 border border-white/20 text-white rounded-md p-2"
                    >
                      <option value="6">6 months</option>
                      <option value="12">12 months</option>
                      <option value="18">18 months</option>
                      <option value="24">24 months</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-white/60 mb-2">Number of Occupants</label>
                    <Input
                      type="number"
                      min="1"
                      value={formData.numberOfOccupants}
                      onChange={(e) => handleInputChange('numberOfOccupants', e.target.value)}
                      className="bg-black/50 border-white/20 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-2">Do you have pets?</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="pets"
                        value="no"
                        checked={formData.pets === 'no'}
                        onChange={(e) => handleInputChange('pets', e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-white">No</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="pets"
                        value="yes"
                        checked={formData.pets === 'yes'}
                        onChange={(e) => handleInputChange('pets', e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-white">Yes</span>
                    </label>
                  </div>
                </div>

                {formData.pets === 'yes' && (
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Pet Details (Type, Breed, Weight)</label>
                    <Input
                      placeholder="e.g., Dog, Labrador, 50 lbs"
                      value={formData.petDetails}
                      onChange={(e) => handleInputChange('petDetails', e.target.value)}
                      className="bg-black/50 border-white/20 text-white"
                    />
                  </div>
                )}
              </div>
            </Card>

            <Card className="bg-[#121212] border-white/10 p-6">
              <h3 className="text-xl mb-4 text-white">References</h3>
              <div className="space-y-4">
                <div className="text-sm text-white/60 mb-3">Provide at least 2 personal or professional references</div>
                
                <div>
                  <div className="text-white mb-3">Reference 1</div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <Input
                      placeholder="Full Name"
                      value={formData.reference1Name}
                      onChange={(e) => handleInputChange('reference1Name', e.target.value)}
                      className="bg-black/50 border-white/20 text-white"
                    />
                    <Input
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.reference1Phone}
                      onChange={(e) => handleInputChange('reference1Phone', e.target.value)}
                      className="bg-black/50 border-white/20 text-white"
                    />
                    <Input
                      placeholder="Relationship (e.g., Manager, Friend)"
                      value={formData.reference1Relationship}
                      onChange={(e) => handleInputChange('reference1Relationship', e.target.value)}
                      className="bg-black/50 border-white/20 text-white"
                    />
                  </div>
                </div>

                <div>
                  <div className="text-white mb-3">Reference 2</div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <Input
                      placeholder="Full Name"
                      value={formData.reference2Name}
                      onChange={(e) => handleInputChange('reference2Name', e.target.value)}
                      className="bg-black/50 border-white/20 text-white"
                    />
                    <Input
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.reference2Phone}
                      onChange={(e) => handleInputChange('reference2Phone', e.target.value)}
                      className="bg-black/50 border-white/20 text-white"
                    />
                    <Input
                      placeholder="Relationship"
                      value={formData.reference2Relationship}
                      onChange={(e) => handleInputChange('reference2Relationship', e.target.value)}
                      className="bg-black/50 border-white/20 text-white"
                    />
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-[#121212] border-white/10 p-6">
              <h3 className="text-xl mb-4 text-white">Previous Rental History</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-white/60 mb-2">Previous Address</label>
                  <Input
                    placeholder="123 Main St, Chicago, IL 60601"
                    value={formData.previousAddress}
                    onChange={(e) => handleInputChange('previousAddress', e.target.value)}
                    className="bg-black/50 border-white/20 text-white"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Previous Landlord Name</label>
                    <Input
                      placeholder="John Doe"
                      value={formData.previousLandlord}
                      onChange={(e) => handleInputChange('previousLandlord', e.target.value)}
                      className="bg-black/50 border-white/20 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white/60 mb-2">Previous Landlord Phone</label>
                    <Input
                      type="tel"
                      placeholder="(312) 555-0100"
                      value={formData.previousLandlordPhone}
                      onChange={(e) => handleInputChange('previousLandlordPhone', e.target.value)}
                      className="bg-black/50 border-white/20 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-2">Reason for Moving</label>
                  <textarea
                    placeholder="Why are you moving from your current residence?"
                    value={formData.reasonForMoving}
                    onChange={(e) => handleInputChange('reasonForMoving', e.target.value)}
                    className="w-full bg-black/50 border border-white/20 text-white rounded-md p-3 min-h-[80px]"
                  />
                </div>
              </div>
            </Card>

            <Card className="bg-[#121212] border-white/10 p-6">
              <h3 className="text-xl mb-4 text-white">Additional Information</h3>
              <div>
                <label className="block text-sm text-white/60 mb-2">Anything else the landlord should know?</label>
                <textarea
                  placeholder="Optional: Share any additional information that would support your application..."
                  value={formData.additionalInfo}
                  onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                  className="w-full bg-black/50 border border-white/20 text-white rounded-md p-3 min-h-[100px]"
                />
              </div>
            </Card>

            <Button
              className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90 h-12"
              onClick={handleSubmitDetails}
            >
              Continue to Screening Consent
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        )}

        {/* STEP 2: SCREENING CONSENT */}
        {step === 'screening-consent' && (
          <div className="space-y-6">
            <Card className="bg-gradient-to-r from-blue-500/10 to-transparent border-blue-500/30 p-6">
              <div className="flex items-start gap-4">
                <Shield className="h-8 w-8 text-blue-400 flex-shrink-0" />
                <div>
                  <h3 className="text-xl mb-2 text-white">Screening Authorization Required</h3>
                  <p className="text-white/80 mb-4">
                    FastTrack applications include comprehensive screening through our partner, SingleKey. 
                    This ensures landlords have the information they need to make quick decisions and guarantees you a showing.
                  </p>
                  <div className="text-sm text-white/60">
                    Your screening results will be securely shared with the landlord. All information is encrypted and handled according to FCRA regulations.
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-[#121212] border-white/10 p-6">
              <h3 className="text-xl mb-4 text-white">Screening Checks Included</h3>
              <div className="space-y-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consentBackgroundCheck}
                    onChange={(e) => handleInputChange('consentBackgroundCheck', e.target.checked)}
                    className="w-5 h-5 mt-0.5"
                  />
                  <div className="flex-1">
                    <div className="text-white mb-1">Criminal Background Check</div>
                    <div className="text-sm text-white/60">
                      Comprehensive background check including conviction history, warrants, and sex offender registry.
                      We only share relevant information that affects housing eligibility.
                    </div>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consentCreditCheck}
                    onChange={(e) => handleInputChange('consentCreditCheck', e.target.checked)}
                    className="w-5 h-5 mt-0.5"
                  />
                  <div className="flex-1">
                    <div className="text-white mb-1">Credit Report</div>
                    <div className="text-sm text-white/60">
                      Review of credit history, payment patterns, and outstanding debts. This is a soft pull and won't affect your credit score.
                    </div>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consentEvictionCheck}
                    onChange={(e) => handleInputChange('consentEvictionCheck', e.target.checked)}
                    className="w-5 h-5 mt-0.5"
                  />
                  <div className="flex-1">
                    <div className="text-white mb-1">Eviction History</div>
                    <div className="text-sm text-white/60">
                      Search of court records for previous eviction filings and rental history disputes.
                    </div>
                  </div>
                </label>
              </div>
            </Card>

            <Card className="bg-black/50 border-white/10 p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-white/80">
                  <strong className="text-white">Important:</strong> By checking these boxes, you authorize FairPath Industries and SingleKey 
                  to conduct these screening checks. The landlord will receive a screening report, and you'll get a copy for your records. 
                  All three checks are required for FastTrack applications.
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
                Back
              </Button>
              <Button
                className="flex-1 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90 h-12"
                onClick={handleScreeningConsent}
                disabled={!formData.consentBackgroundCheck || !formData.consentCreditCheck || !formData.consentEvictionCheck}
              >
                I Consent - Continue to Payment
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: PAYMENT */}
        {step === 'payment' && (
          <div className="space-y-6">
            <Card className="bg-gradient-to-r from-[#A8F32C]/10 to-transparent border-[#A8F32C]/30 p-6">
              <h3 className="text-xl mb-4 text-white">FastTrack Application Fee</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Application Fee:</span>
                  <span className="text-white">${hasFairPathPlus ? 75 : 75}</span>
                </div>
                {hasFairPathPlus && (
                  <div className="flex justify-between items-center text-green-400">
                    <span>FairPath+ Discount:</span>
                    <span>-$10</span>
                  </div>
                )}
                <div className="flex justify-between items-center pt-3 border-t border-white/10">
                  <span className="text-lg text-white">Total:</span>
                  <span className="text-2xl text-[#A8F32C]">${fastTrackPrice}</span>
                </div>
              </div>

              <div className="mt-4 bg-black/50 border border-white/10 rounded-lg p-4">
                <div className="text-sm text-white/80 space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span>Guaranteed showing within 48 hours</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span>Comprehensive screening through SingleKey</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span>Priority application review</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span>Full refund if landlord doesn't respond in 48 hours</span>
                  </div>
                </div>
              </div>
            </Card>

            <PaymentMethodSelector
              amount={fastTrackPrice}
              description="FastTrack Housing Application"
              onPaymentMethodSelected={handlePaymentComplete}
              onCancel={() => setStep('screening-consent')}
            />
          </div>
        )}

        {/* STEP 4: PROCESSING */}
        {step === 'processing' && (
          <div className="flex items-center justify-center py-20">
            <Card className="bg-[#121212] border-white/10 p-8 max-w-md w-full text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#A8F32C] border-t-transparent mx-auto mb-6" />
              <h3 className="text-2xl mb-3 text-white">Processing Your Application</h3>
              <p className="text-white/80 mb-6">
                Please wait while we submit your application and initiate the screening process...
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Payment confirmed</span>
                  <CheckCircle className="h-5 w-5 text-green-400" />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Submitting application</span>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#A8F32C] border-t-transparent" />
                </div>
                <div className="flex items-center justify-between text-sm text-white/40">
                  <span>Initiating screening</span>
                  <div className="w-4 h-4" />
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* STEP 5: CONFIRMATION */}
        {step === 'confirmation' && (
          <PaymentConfirmation
            amount={fastTrackPrice}
            description="FastTrack Housing Application"
            transactionId={transactionId}
            paymentMethod={formData.paymentDetails}
            onContinue={onClose}
            onDownloadReceipt={() => {
              alert('Receipt downloaded!');
            }}
            additionalDetails={[
              { label: 'Property', value: housing.address },
              { label: 'Landlord', value: housing.landlordName },
              { label: 'Move-in Date', value: new Date(formData.moveInDate).toLocaleDateString() },
              { label: 'Status', value: 'Screening in Progress' },
              { label: 'Guaranteed Showing', value: 'Within 48 hours' }
            ]}
          />
        )}
      </div>
    </div>
  );
}
