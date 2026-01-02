import { useState } from 'react';
import { ArrowLeft, Shield, CheckCircle, AlertCircle, DollarSign, Clock, FileText, User, MapPin, Calendar, CreditCard } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import LogoFinal from '../common/LogoFinal';
import { Progress } from '../ui/progress';

interface UserScreeningFlowProps {
  application: any;
  onComplete: () => void;
  onBack: () => void;
}

export default function UserScreeningFlow({ application, onComplete, onBack }: UserScreeningFlowProps) {
  const [step, setStep] = useState<'consent' | 'info' | 'payment' | 'processing' | 'complete'>('consent');
  const [formData, setFormData] = useState({
    ssn: '',
    dob: '',
    driversLicense: '',
    currentAddress: '',
    city: '',
    state: '',
    zip: '',
    phoneNumber: '',
    email: ''
  });

  // Step 1: Consent and Disclosure
  const ConsentStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-full bg-[#A8F32C]/20 flex items-center justify-center mx-auto mb-4">
          <Shield className="h-8 w-8 text-[#A8F32C]" />
        </div>
        <h2 className="text-3xl mb-3 text-white">Background Screening Consent</h2>
        <p className="text-white/60">
          You're applying for: <span className="text-[#A8F32C]">{application.address}</span>
        </p>
      </div>

      <Card className="bg-[#121212] border-white/10 p-6">
        <h3 className="text-xl mb-4 text-white">What You Need to Know</h3>
        <div className="space-y-4 mb-6">
          <div className="flex gap-3">
            <CheckCircle className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-white mb-1">Powered by SingleKey</div>
              <p className="text-sm text-white/60">
                Industry-leading screening trusted by landlords nationwide
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <CheckCircle className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-white mb-1">Comprehensive Report</div>
              <p className="text-sm text-white/60">
                Includes credit, criminal, eviction, and identity verification
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <CheckCircle className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-white mb-1">FCRA Compliant</div>
              <p className="text-sm text-white/60">
                All screenings follow Fair Credit Reporting Act guidelines
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <CheckCircle className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-white mb-1">You Keep a Copy</div>
              <p className="text-sm text-white/60">
                Download your screening report from your dashboard
              </p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
          <div className="flex gap-2 mb-2">
            <AlertCircle className="h-5 w-5 text-yellow-400 flex-shrink-0" />
            <div className="text-white">Important Disclosure</div>
          </div>
          <p className="text-sm text-white/60 ml-7">
            By proceeding, you authorize FairPath Industries and SingleKey to obtain consumer reports 
            (including credit reports, criminal history, eviction records) for rental application purposes. 
            This authorization will remain active for all your housing applications through FairPath.
          </p>
        </div>
      </Card>

      <Card className="bg-[#121212] border-white/10 p-6">
        <h3 className="text-xl mb-4 text-white">Your Rights</h3>
        <div className="space-y-3 text-sm text-white/60">
          <p>✓ You have the right to dispute any inaccurate information in your report</p>
          <p>✓ You will receive a copy of your screening report</p>
          <p>✓ If denied, you'll receive an adverse action notice with the reason</p>
          <p>✓ You can request additional information from the screening company</p>
        </div>
      </Card>

      <div className="flex items-center gap-3 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
        <input type="checkbox" className="w-5 h-5" id="consent" required />
        <label htmlFor="consent" className="text-white text-sm">
          I have read and understand the disclosure, and I authorize this background screening
        </label>
      </div>

      <div className="flex gap-3">
        <Button onClick={onBack} variant="outline" className="flex-1 border-white/20 text-white">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Cancel
        </Button>
        <Button 
          onClick={() => setStep('info')}
          className="flex-1 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
        >
          I Agree - Continue
        </Button>
      </div>
    </div>
  );

  // Step 2: Information Collection
  const InfoStep = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl mb-2 text-white">Screening Information</h2>
          <p className="text-white/60">Please provide accurate information for your screening</p>
        </div>
        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Step 2 of 4</Badge>
      </div>

      <Card className="bg-[#121212] border-white/10 p-6">
        <h3 className="text-xl mb-4 text-white">Personal Information</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label className="text-white mb-2 block">Social Security Number</Label>
            <Input
              type="text"
              placeholder="XXX-XX-XXXX"
              value={formData.ssn}
              onChange={(e) => setFormData({ ...formData, ssn: e.target.value })}
              className="bg-black/50 border-white/20 text-white"
              required
            />
          </div>
          <div>
            <Label className="text-white mb-2 block">Date of Birth</Label>
            <Input
              type="date"
              value={formData.dob}
              onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
              className="bg-black/50 border-white/20 text-white"
              required
            />
          </div>
        </div>
      </Card>

      <Card className="bg-[#121212] border-white/10 p-6">
        <h3 className="text-xl mb-4 text-white">Identification</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label className="text-white mb-2 block">Driver's License / State ID</Label>
            <Input
              type="text"
              placeholder="License number"
              value={formData.driversLicense}
              onChange={(e) => setFormData({ ...formData, driversLicense: e.target.value })}
              className="bg-black/50 border-white/20 text-white"
              required
            />
          </div>
          <div>
            <Label className="text-white mb-2 block">Phone Number</Label>
            <Input
              type="tel"
              placeholder="(555) 123-4567"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              className="bg-black/50 border-white/20 text-white"
              required
            />
          </div>
        </div>
      </Card>

      <Card className="bg-[#121212] border-white/10 p-6">
        <h3 className="text-xl mb-4 text-white">Current Address</h3>
        <div className="space-y-4">
          <div>
            <Label className="text-white mb-2 block">Street Address</Label>
            <Input
              type="text"
              placeholder="123 Main St, Apt 4B"
              value={formData.currentAddress}
              onChange={(e) => setFormData({ ...formData, currentAddress: e.target.value })}
              className="bg-black/50 border-white/20 text-white"
              required
            />
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label className="text-white mb-2 block">City</Label>
              <Input
                type="text"
                placeholder="Chicago"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="bg-black/50 border-white/20 text-white"
                required
              />
            </div>
            <div>
              <Label className="text-white mb-2 block">State</Label>
              <Input
                type="text"
                placeholder="IL"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="bg-black/50 border-white/20 text-white"
                required
              />
            </div>
            <div>
              <Label className="text-white mb-2 block">ZIP Code</Label>
              <Input
                type="text"
                placeholder="60614"
                value={formData.zip}
                onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                className="bg-black/50 border-white/20 text-white"
                required
              />
            </div>
          </div>
        </div>
      </Card>

      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
        <div className="flex gap-2 mb-2">
          <Shield className="h-5 w-5 text-blue-400" />
          <div className="text-white">Your data is encrypted and secure</div>
        </div>
        <p className="text-sm text-white/60 ml-7">
          We use bank-level encryption to protect your personal information
        </p>
      </div>

      <div className="flex gap-3">
        <Button onClick={() => setStep('consent')} variant="outline" className="border-white/20 text-white">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back
        </Button>
        <Button 
          onClick={() => setStep('payment')}
          className="flex-1 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
        >
          Continue to Payment
        </Button>
      </div>
    </div>
  );

  // Step 3: Payment (already paid via FastTrack)
  const PaymentStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-green-400" />
        </div>
        <h2 className="text-3xl mb-3 text-white">Screening Fee Paid</h2>
        <p className="text-white/60">
          Your FastTrack application already includes the screening fee
        </p>
      </div>

      <Card className="bg-gradient-to-r from-[#A8F32C]/20 to-transparent border-[#A8F32C]/30 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl text-white mb-1">Payment Summary</h3>
            <p className="text-sm text-white/60">Included in your FastTrack application</p>
          </div>
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Paid</Badge>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-white/60">
            <span>FastTrack Application Fee</span>
            <span>$75.00</span>
          </div>
          <div className="flex justify-between text-white/60">
            <span>Background Screening (SingleKey)</span>
            <span className="text-[#A8F32C]">Included</span>
          </div>
          <div className="flex justify-between text-white/60">
            <span>Credit Report</span>
            <span className="text-[#A8F32C]">Included</span>
          </div>
          <div className="flex justify-between text-white/60">
            <span>Criminal Background Check</span>
            <span className="text-[#A8F32C]">Included</span>
          </div>
          <div className="flex justify-between text-white/60">
            <span>Eviction History</span>
            <span className="text-[#A8F32C]">Included</span>
          </div>
          <div className="border-t border-white/10 pt-3 mt-3 flex justify-between text-white">
            <span className="text-lg">Total Paid</span>
            <span className="text-xl text-[#A8F32C]">$75.00</span>
          </div>
        </div>
      </Card>

      <Card className="bg-[#121212] border-white/10 p-6">
        <h3 className="text-xl mb-4 text-white">What Happens Next</h3>
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-sm text-blue-400">1</span>
            </div>
            <div>
              <div className="text-white mb-1">Screening Begins</div>
              <p className="text-sm text-white/60">
                SingleKey will process your background check (typically 15-30 minutes)
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-sm text-blue-400">2</span>
            </div>
            <div>
              <div className="text-white mb-1">Landlord Reviews</div>
              <p className="text-sm text-white/60">
                Your results are sent to the property owner for review
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-sm text-blue-400">3</span>
            </div>
            <div>
              <div className="text-white mb-1">Showing Scheduled</div>
              <p className="text-sm text-white/60">
                If approved, you'll receive a showing time within 48 hours
              </p>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex gap-3">
        <Button onClick={() => setStep('info')} variant="outline" className="border-white/20 text-white">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back
        </Button>
        <Button 
          onClick={() => setStep('processing')}
          className="flex-1 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
        >
          Start Screening
        </Button>
      </div>
    </div>
  );

  // Step 4: Processing
  const ProcessingStep = () => {
    // Auto-advance after 3 seconds
    useState(() => {
      const timer = setTimeout(() => {
        setStep('complete');
      }, 3000);
      return () => clearTimeout(timer);
    });

    return (
      <div className="space-y-6 text-center py-12">
        <div className="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-6 animate-pulse">
          <Shield className="h-10 w-10 text-blue-400" />
        </div>
        <h2 className="text-3xl text-white mb-3">Processing Your Screening</h2>
        <p className="text-xl text-white/60 mb-8">
          SingleKey is running your background check...
        </p>
        
        <div className="max-w-md mx-auto">
          <Progress value={66} className="h-2 mb-4" />
          <div className="space-y-3 text-left">
            <div className="flex items-center gap-3 text-white/60">
              <CheckCircle className="h-5 w-5 text-[#A8F32C]" />
              <span>Identity verification complete</span>
            </div>
            <div className="flex items-center gap-3 text-white/60">
              <CheckCircle className="h-5 w-5 text-[#A8F32C]" />
              <span>Credit report retrieved</span>
            </div>
            <div className="flex items-center gap-3 text-white">
              <Clock className="h-5 w-5 text-blue-400 animate-spin" />
              <span>Running criminal background check...</span>
            </div>
            <div className="flex items-center gap-3 text-white/40">
              <Clock className="h-5 w-5" />
              <span>Checking eviction records...</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-white/40 mt-8">
          This usually takes 15-30 minutes. You can close this window and we'll email you when it's ready.
        </p>
      </div>
    );
  };

  // Step 5: Complete
  const CompleteStep = () => (
    <div className="space-y-6 text-center py-12">
      <div className="w-20 h-20 rounded-full bg-[#A8F32C]/20 flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="h-10 w-10 text-[#A8F32C]" />
      </div>
      <h2 className="text-3xl text-white mb-3">Screening Complete!</h2>
      <p className="text-xl text-white/60 mb-8">
        Your background screening has been submitted to the landlord
      </p>

      <Card className="bg-[#121212] border-white/10 p-8 max-w-md mx-auto">
        <div className="space-y-4 text-left">
          <div>
            <div className="text-sm text-white/60 mb-1">Property</div>
            <div className="text-white">{application.address}</div>
          </div>
          <div>
            <div className="text-sm text-white/60 mb-1">Status</div>
            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
              Awaiting Landlord Review
            </Badge>
          </div>
          <div>
            <div className="text-sm text-white/60 mb-1">Next Steps</div>
            <p className="text-sm text-white">
              The landlord must respond within 48 hours with a showing time or denial reason
            </p>
          </div>
        </div>
      </Card>

      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6 max-w-md mx-auto">
        <div className="flex gap-3 mb-3">
          <FileText className="h-5 w-5 text-blue-400" />
          <div className="text-white text-left">Your Screening Report</div>
        </div>
        <p className="text-sm text-white/60 text-left mb-4">
          A copy of your background screening report has been sent to your email and is available 
          in your dashboard under "My Applications"
        </p>
        <Button variant="outline" className="border-blue-500/30 text-blue-400 w-full">
          Download Report
        </Button>
      </div>

      <Button 
        onClick={onComplete}
        className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90 px-12"
      >
        Back to Dashboard
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/5 bg-[#121212] sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <LogoFinal size="md" />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {step === 'consent' && <ConsentStep />}
        {step === 'info' && <InfoStep />}
        {step === 'payment' && <PaymentStep />}
        {step === 'processing' && <ProcessingStep />}
        {step === 'complete' && <CompleteStep />}
      </div>
    </div>
  );
}
