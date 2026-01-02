import { useState } from 'react';
import { ArrowRight, ArrowLeft, Save, Building, DollarSign } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Progress } from '../ui/progress';
import LogoFinal from '../common/LogoFinal';

interface EmployerOnboardingProps {
  onComplete: (data: any) => void;
  onBack: () => void;
}

export default function EmployerOnboarding({ onComplete, onBack }: EmployerOnboardingProps) {
  const [step, setStep] = useState(1);
  const totalSteps = 9;

  const [formData, setFormData] = useState({
    // Step 1: Company Info
    companyName: '',
    industry: '',
    companySize: '',
    taxId: '',
    
    // Step 2: Contact Info
    contactFirstName: '',
    contactLastName: '',
    contactEmail: '',
    contactPhone: '',
    jobTitle: '',
    
    // Step 3: Location
    address: '',
    city: '',
    state: '',
    zipCode: '',
    
    // Step 4: Hiring Needs
    currentOpenings: '',
    typicalHires: '',
    urgency: '',
    
    // Step 5: WOTC Interest
    interestedInWOTC: '',
    hiredConvictedBefore: '',
    knowledgeOfWOTC: '',
    
    // Step 6: Job Types
    jobTypes: [] as string[],
    industries: [] as string[],
    
    // Step 7: FairPath Staffing
    interestedInStaffing: '',
    backgroundCheckOk: '',
    wantPreScreening: '',
    
    // Step 8: Package Selection
    selectedPackage: '',
    addOns: [] as string[],
    
    // Step 9: Payment
    paymentMethod: ''
  });

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete(formData);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onBack();
    }
  };

  const handleSaveForLater = () => {
    localStorage.setItem('employerOnboardingProgress', JSON.stringify({ step, formData }));
    alert('Progress saved! You can continue later.');
  };

  const progress = (step / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/5 bg-[#121212] sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <LogoFinal size="md" />
            <Button onClick={handleSaveForLater} variant="ghost" className="text-white/60">
              <Save className="mr-2 h-4 w-4" />
              Save & Continue Later
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-white/60">Step {step} of {totalSteps}</span>
            <span className="text-sm text-[#A8F32C]">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step 1: Company Info */}
        {step === 1 && (
          <Card className="bg-[#121212] border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-[#A8F32C]/20 flex items-center justify-center">
                <Building className="h-6 w-6 text-[#A8F32C]" />
              </div>
              <div>
                <h2 className="text-2xl">Company Information</h2>
                <p className="text-white/60">Tell us about your business</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="companyName" className="text-white mb-2 block">
                  Company Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="bg-black border-white/20 text-white"
                  placeholder="Great Lakes Distribution"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="industry" className="text-white mb-2 block">
                    Industry <span className="text-red-500">*</span>
                  </Label>
                  <select
                    id="industry"
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full bg-black border border-white/20 rounded-lg px-3 py-2 text-white"
                  >
                    <option value="">Select industry...</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="warehouse">Warehouse/Distribution</option>
                    <option value="retail">Retail</option>
                    <option value="construction">Construction</option>
                    <option value="hospitality">Hospitality</option>
                    <option value="transportation">Transportation</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="companySize" className="text-white mb-2 block">
                    Company Size <span className="text-red-500">*</span>
                  </Label>
                  <select
                    id="companySize"
                    value={formData.companySize}
                    onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                    className="w-full bg-black border border-white/20 rounded-lg px-3 py-2 text-white"
                  >
                    <option value="">Select size...</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-500">201-500 employees</option>
                    <option value="500+">500+ employees</option>
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="taxId" className="text-white mb-2 block">
                  EIN (Employer Identification Number) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="taxId"
                  value={formData.taxId}
                  onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                  className="bg-black border-white/20 text-white"
                  placeholder="12-3456789"
                />
                <p className="text-xs text-white/40 mt-2">Required for WOTC tax credit processing</p>
              </div>
            </div>
          </Card>
        )}

        {/* Step 2: Contact Info */}
        {step === 2 && (
          <Card className="bg-[#121212] border-white/10 p-8">
            <h2 className="text-2xl mb-2">Primary Contact</h2>
            <p className="text-white/60 mb-6">Who should we contact about applications and hiring?</p>

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contactFirstName" className="text-white mb-2 block">
                    First Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="contactFirstName"
                    value={formData.contactFirstName}
                    onChange={(e) => setFormData({ ...formData, contactFirstName: e.target.value })}
                    className="bg-black border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="contactLastName" className="text-white mb-2 block">
                    Last Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="contactLastName"
                    value={formData.contactLastName}
                    onChange={(e) => setFormData({ ...formData, contactLastName: e.target.value })}
                    className="bg-black border-white/20 text-white"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="contactEmail" className="text-white mb-2 block">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  className="bg-black border-white/20 text-white"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contactPhone" className="text-white mb-2 block">
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="contactPhone"
                    type="tel"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                    className="bg-black border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="jobTitle" className="text-white mb-2 block">
                    Job Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="jobTitle"
                    value={formData.jobTitle}
                    onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                    className="bg-black border-white/20 text-white"
                    placeholder="HR Manager, Owner, etc."
                  />
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Step 3: Location */}
        {step === 3 && (
          <Card className="bg-[#121212] border-white/10 p-8">
            <h2 className="text-2xl mb-2">Company Location</h2>
            <p className="text-white/60 mb-6">Where is your main hiring location?</p>

            <div className="space-y-4">
              <div>
                <Label htmlFor="address" className="text-white mb-2 block">
                  Street Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="bg-black border-white/20 text-white"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city" className="text-white mb-2 block">
                    City <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="bg-black border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="state" className="text-white mb-2 block">
                    State <span className="text-red-500">*</span>
                  </Label>
                  <select
                    id="state"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full bg-black border border-white/20 rounded-lg px-3 py-2 text-white"
                  >
                    <option value="">Select...</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="WI">Wisconsin</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="zipCode" className="text-white mb-2 block">
                    ZIP Code <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    className="bg-black border-white/20 text-white"
                  />
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Step 4: Hiring Needs */}
        {step === 4 && (
          <Card className="bg-[#121212] border-white/10 p-8">
            <h2 className="text-2xl mb-2">Your Hiring Needs</h2>
            <p className="text-white/60 mb-6">Help us understand your hiring requirements</p>

            <div className="space-y-6">
              <div>
                <Label htmlFor="currentOpenings" className="text-white mb-2 block">
                  How many positions do you currently need to fill? <span className="text-red-500">*</span>
                </Label>
                <select
                  id="currentOpenings"
                  value={formData.currentOpenings}
                  onChange={(e) => setFormData({ ...formData, currentOpenings: e.target.value })}
                  className="w-full bg-black border border-white/20 rounded-lg px-3 py-2 text-white"
                >
                  <option value="">Select...</option>
                  <option value="1-5">1-5 positions</option>
                  <option value="6-10">6-10 positions</option>
                  <option value="11-25">11-25 positions</option>
                  <option value="25+">25+ positions</option>
                </select>
              </div>

              <div>
                <Label htmlFor="typicalHires" className="text-white mb-2 block">
                  How many people do you typically hire per month? <span className="text-red-500">*</span>
                </Label>
                <select
                  id="typicalHires"
                  value={formData.typicalHires}
                  onChange={(e) => setFormData({ ...formData, typicalHires: e.target.value })}
                  className="w-full bg-black border border-white/20 rounded-lg px-3 py-2 text-white"
                >
                  <option value="">Select...</option>
                  <option value="1-3">1-3 per month</option>
                  <option value="4-10">4-10 per month</option>
                  <option value="11-25">11-25 per month</option>
                  <option value="25+">25+ per month</option>
                </select>
              </div>

              <div>
                <Label className="text-white mb-3 block">
                  How urgent is your hiring need? <span className="text-red-500">*</span>
                </Label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                    <input
                      type="radio"
                      name="urgency"
                      value="immediate"
                      checked={formData.urgency === 'immediate'}
                      onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                    />
                    <div>
                      <div className="text-white">Immediate - Need to hire this week</div>
                      <div className="text-xs text-white/60">We'll prioritize your listings</div>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                    <input
                      type="radio"
                      name="urgency"
                      value="soon"
                      checked={formData.urgency === 'soon'}
                      onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                    />
                    <div>
                      <div className="text-white">Soon - Within the next month</div>
                      <div className="text-xs text-white/60">Normal processing</div>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                    <input
                      type="radio"
                      name="urgency"
                      value="planning"
                      checked={formData.urgency === 'planning'}
                      onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                    />
                    <div>
                      <div className="text-white">Planning - Just exploring options</div>
                      <div className="text-xs text-white/60">Take your time setting up</div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Step 5: WOTC Interest */}
        {step === 5 && (
          <Card className="bg-[#121212] border-white/10 p-8">
            <div className="flex items-start gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-[#A8F32C]/20 flex items-center justify-center flex-shrink-0">
                <DollarSign className="h-6 w-6 text-[#A8F32C]" />
              </div>
              <div>
                <h2 className="text-2xl mb-2">WOTC Tax Credits</h2>
                <p className="text-white/60">
                  Earn up to $9,600 per hire by hiring qualified candidates through our system
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <Label className="text-white mb-3 block">
                  Are you interested in WOTC tax credits? <span className="text-red-500">*</span>
                </Label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                    <input
                      type="radio"
                      name="interestedInWOTC"
                      value="yes"
                      checked={formData.interestedInWOTC === 'yes'}
                      onChange={(e) => setFormData({ ...formData, interestedInWOTC: e.target.value })}
                    />
                    <div>
                      <div className="text-white">Yes - I want to maximize tax credits</div>
                      <div className="text-xs text-[#A8F32C]">We'll auto-generate all WOTC forms for you</div>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                    <input
                      type="radio"
                      name="interestedInWOTC"
                      value="maybe"
                      checked={formData.interestedInWOTC === 'maybe'}
                      onChange={(e) => setFormData({ ...formData, interestedInWOTC: e.target.value })}
                    />
                    <div>
                      <div className="text-white">Maybe - Tell me more</div>
                      <div className="text-xs text-white/60">We'll show you how it works</div>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                    <input
                      type="radio"
                      name="interestedInWOTC"
                      value="no"
                      checked={formData.interestedInWOTC === 'no'}
                      onChange={(e) => setFormData({ ...formData, interestedInWOTC: e.target.value })}
                    />
                    <div>
                      <div className="text-white">No - Not interested right now</div>
                      <div className="text-xs text-white/60">You can enable this later</div>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <Label className="text-white mb-3 block">
                  Have you hired someone with a conviction before?
                </Label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                    <input
                      type="radio"
                      name="hiredConvictedBefore"
                      value="yes"
                      checked={formData.hiredConvictedBefore === 'yes'}
                      onChange={(e) => setFormData({ ...formData, hiredConvictedBefore: e.target.value })}
                    />
                    <span className="text-white">Yes, and it went well</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                    <input
                      type="radio"
                      name="hiredConvictedBefore"
                      value="no"
                      checked={formData.hiredConvictedBefore === 'no'}
                      onChange={(e) => setFormData({ ...formData, hiredConvictedBefore: e.target.value })}
                    />
                    <span className="text-white">No, this is new for me</span>
                  </label>
                </div>
              </div>

              <div>
                <Label className="text-white mb-3 block">
                  How familiar are you with WOTC?
                </Label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                    <input
                      type="radio"
                      name="knowledgeOfWOTC"
                      value="expert"
                      checked={formData.knowledgeOfWOTC === 'expert'}
                      onChange={(e) => setFormData({ ...formData, knowledgeOfWOTC: e.target.value })}
                    />
                    <span className="text-white">Very familiar - We file WOTC regularly</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                    <input
                      type="radio"
                      name="knowledgeOfWOTC"
                      value="some"
                      checked={formData.knowledgeOfWOTC === 'some'}
                      onChange={(e) => setFormData({ ...formData, knowledgeOfWOTC: e.target.value })}
                    />
                    <span className="text-white">Somewhat - I've heard of it</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                    <input
                      type="radio"
                      name="knowledgeOfWOTC"
                      value="none"
                      checked={formData.knowledgeOfWOTC === 'none'}
                      onChange={(e) => setFormData({ ...formData, knowledgeOfWOTC: e.target.value })}
                    />
                    <span className="text-white">Not familiar - What is it?</span>
                  </label>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Continue with remaining steps... */}
        {step === 6 && (
          <Card className="bg-[#121212] border-white/10 p-8">
            <h2 className="text-2xl mb-6">Select Your Package</h2>
            <p className="text-white/60 mb-6">Choose the plan that fits your hiring needs</p>
            <div className="text-center text-white/60">
              Package selection will be shown here...
            </div>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex gap-4 mt-8">
          <Button
            onClick={handleBack}
            variant="outline"
            className="flex-1 border-white/20 text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button
            onClick={handleNext}
            className="flex-1 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
          >
            {step === totalSteps ? 'Complete Setup' : 'Continue'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
