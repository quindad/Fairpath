import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Badge } from '../ui/badge';
import { Checkbox } from '../ui/checkbox';
import { Scale, ArrowRight, CheckCircle, CreditCard } from 'lucide-react';

interface LawyerSignupProps {
  onComplete: () => void;
  onBack: () => void;
}

export default function LawyerSignup({ onComplete, onBack }: LawyerSignupProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    
    // Step 2: Practice Info
    firmName: '',
    barNumber: '',
    barState: '',
    yearsExperience: '',
    practiceAreas: [] as string[],
    
    // Step 3: Service Areas
    serviceStates: [] as string[],
    serviceCounties: '',
    
    // Step 4: Pricing
    consultationFee: '',
    expungementFeeMin: '',
    expungementFeeMax: '',
    sealingFeeMin: '',
    sealingFeeMax: '',
    
    // Terms
    agreedToTerms: false,
  });

  const practiceAreaOptions = [
    'Expungement',
    'Record Sealing',
    'Certificate of Rehabilitation',
    'Pardons',
    'Juvenile Record Sealing',
    'Appeal/Motion to Reduce',
    'General Criminal Defense',
  ];

  const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 
    'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 
    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 
    'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 
    'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 
    'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 
    'Wisconsin', 'Wyoming'
  ];

  const handlePracticeAreaToggle = (area: string) => {
    setFormData(prev => ({
      ...prev,
      practiceAreas: prev.practiceAreas.includes(area)
        ? prev.practiceAreas.filter(a => a !== area)
        : [...prev.practiceAreas, area]
    }));
  };

  const handleStateToggle = (state: string) => {
    setFormData(prev => ({
      ...prev,
      serviceStates: prev.serviceStates.includes(state)
        ? prev.serviceStates.filter(s => s !== state)
        : [...prev.serviceStates, state]
    }));
  };

  const handleNext = () => {
    // TODO: Validate current step
    if (step < 5) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onBack();
    }
  };

  const handleSubmit = () => {
    // TODO: Submit to backend
    console.log('Lawyer signup:', formData);
    onComplete();
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center">
              <Scale className="h-8 w-8 text-purple-400" />
            </div>
            <div className="text-left">
              <h1 className="text-3xl text-white">Join FairPath Legal</h1>
              <p className="text-purple-400">$20/month for pre-qualified leads</p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {[1, 2, 3, 4, 5].map((num) => (
              <React.Fragment key={num}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  step >= num 
                    ? 'bg-purple-500 border-purple-500 text-white' 
                    : 'border-gray-700 text-gray-600'
                }`}>
                  {step > num ? <CheckCircle className="h-5 w-5" /> : num}
                </div>
                {num < 5 && (
                  <div className={`w-12 h-0.5 ${step > num ? 'bg-purple-500' : 'bg-gray-700'}`} />
                )}
              </React.Fragment>
            ))}
          </div>

          <p className="text-white/60">
            {step === 1 && 'Basic Information'}
            {step === 2 && 'Practice Information'}
            {step === 3 && 'Service Areas'}
            {step === 4 && 'Pricing & Services'}
            {step === 5 && 'Payment & Confirmation'}
          </p>
        </div>

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <Card className="bg-gray-900 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-white">Basic Information</CardTitle>
              <CardDescription className="text-white/60">
                Let's start with your contact details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName" className="text-white">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="bg-black border-gray-700 text-white"
                    placeholder="John"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-white">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="bg-black border-gray-700 text-white"
                    placeholder="Smith"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-white">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="bg-black border-gray-700 text-white"
                  placeholder="john.smith@lawfirm.com"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-white">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="bg-black border-gray-700 text-white"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="password" className="text-white">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="bg-black border-gray-700 text-white"
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    className="bg-black border-gray-700 text-white"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex justify-between pt-6">
                <Button variant="outline" onClick={handleBack} className="border-gray-700 text-white">
                  Back
                </Button>
                <Button onClick={handleNext} className="bg-purple-500 hover:bg-purple-600">
                  Next Step
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Practice Info */}
        {step === 2 && (
          <Card className="bg-gray-900 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-white">Practice Information</CardTitle>
              <CardDescription className="text-white/60">
                Tell us about your legal practice
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="firmName" className="text-white">Firm Name</Label>
                <Input
                  id="firmName"
                  value={formData.firmName}
                  onChange={(e) => setFormData({...formData, firmName: e.target.value})}
                  className="bg-black border-gray-700 text-white"
                  placeholder="Smith Law Group"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="barNumber" className="text-white">Bar Number</Label>
                  <Input
                    id="barNumber"
                    value={formData.barNumber}
                    onChange={(e) => setFormData({...formData, barNumber: e.target.value})}
                    className="bg-black border-gray-700 text-white"
                    placeholder="123456"
                  />
                </div>
                <div>
                  <Label htmlFor="barState" className="text-white">Bar State</Label>
                  <select
                    id="barState"
                    value={formData.barState}
                    onChange={(e) => setFormData({...formData, barState: e.target.value})}
                    className="w-full h-10 px-3 rounded-md bg-black border border-gray-700 text-white"
                  >
                    <option value="">Select state...</option>
                    {states.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="yearsExperience" className="text-white">Years of Experience</Label>
                <Input
                  id="yearsExperience"
                  type="number"
                  value={formData.yearsExperience}
                  onChange={(e) => setFormData({...formData, yearsExperience: e.target.value})}
                  className="bg-black border-gray-700 text-white"
                  placeholder="5"
                />
              </div>

              <div>
                <Label className="text-white mb-3 block">Practice Areas</Label>
                <div className="grid md:grid-cols-2 gap-3">
                  {practiceAreaOptions.map(area => (
                    <div key={area} className="flex items-center gap-2">
                      <Checkbox
                        id={area}
                        checked={formData.practiceAreas.includes(area)}
                        onCheckedChange={() => handlePracticeAreaToggle(area)}
                      />
                      <label htmlFor={area} className="text-white/80 cursor-pointer">
                        {area}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-6">
                <Button variant="outline" onClick={handleBack} className="border-gray-700 text-white">
                  Back
                </Button>
                <Button onClick={handleNext} className="bg-purple-500 hover:bg-purple-600">
                  Next Step
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Service Areas */}
        {step === 3 && (
          <Card className="bg-gray-900 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-white">Service Areas</CardTitle>
              <CardDescription className="text-white/60">
                Which states do you practice in?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-white mb-3 block">Licensed States (Select all that apply)</Label>
                <div className="grid md:grid-cols-3 gap-3 max-h-96 overflow-y-auto p-4 bg-black rounded-lg border border-gray-700">
                  {states.map(state => (
                    <div key={state} className="flex items-center gap-2">
                      <Checkbox
                        id={state}
                        checked={formData.serviceStates.includes(state)}
                        onCheckedChange={() => handleStateToggle(state)}
                      />
                      <label htmlFor={state} className="text-white/80 cursor-pointer text-sm">
                        {state}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="serviceCounties" className="text-white">
                  Specific Counties (Optional)
                </Label>
                <textarea
                  id="serviceCounties"
                  value={formData.serviceCounties}
                  onChange={(e) => setFormData({...formData, serviceCounties: e.target.value})}
                  className="w-full h-24 px-3 py-2 rounded-md bg-black border border-gray-700 text-white"
                  placeholder="e.g., Los Angeles County, Orange County, San Diego County"
                />
                <p className="text-sm text-white/50 mt-2">
                  List specific counties where you practice (helps with local matching)
                </p>
              </div>

              <div className="flex justify-between pt-6">
                <Button variant="outline" onClick={handleBack} className="border-gray-700 text-white">
                  Back
                </Button>
                <Button onClick={handleNext} className="bg-purple-500 hover:bg-purple-600">
                  Next Step
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Pricing */}
        {step === 4 && (
          <Card className="bg-gray-900 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-white">Services & Pricing</CardTitle>
              <CardDescription className="text-white/60">
                Set your consultation and service fees
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="consultationFee" className="text-white">
                  Initial Consultation Fee
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-white/60">$</span>
                  <Input
                    id="consultationFee"
                    type="number"
                    value={formData.consultationFee}
                    onChange={(e) => setFormData({...formData, consultationFee: e.target.value})}
                    className="bg-black border-gray-700 text-white pl-7"
                    placeholder="0"
                  />
                </div>
                <p className="text-sm text-white/50 mt-2">Enter 0 for free consultations</p>
              </div>

              <div className="border-t border-gray-700 pt-6">
                <Label className="text-white mb-4 block">Expungement Services</Label>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expungementFeeMin" className="text-white/80 text-sm">
                      Minimum Fee
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-white/60">$</span>
                      <Input
                        id="expungementFeeMin"
                        type="number"
                        value={formData.expungementFeeMin}
                        onChange={(e) => setFormData({...formData, expungementFeeMin: e.target.value})}
                        className="bg-black border-gray-700 text-white pl-7"
                        placeholder="500"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="expungementFeeMax" className="text-white/80 text-sm">
                      Maximum Fee
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-white/60">$</span>
                      <Input
                        id="expungementFeeMax"
                        type="number"
                        value={formData.expungementFeeMax}
                        onChange={(e) => setFormData({...formData, expungementFeeMax: e.target.value})}
                        className="bg-black border-gray-700 text-white pl-7"
                        placeholder="2000"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-6">
                <Label className="text-white mb-4 block">Record Sealing Services</Label>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sealingFeeMin" className="text-white/80 text-sm">
                      Minimum Fee
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-white/60">$</span>
                      <Input
                        id="sealingFeeMin"
                        type="number"
                        value={formData.sealingFeeMin}
                        onChange={(e) => setFormData({...formData, sealingFeeMin: e.target.value})}
                        className="bg-black border-gray-700 text-white pl-7"
                        placeholder="400"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="sealingFeeMax" className="text-white/80 text-sm">
                      Maximum Fee
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-white/60">$</span>
                      <Input
                        id="sealingFeeMax"
                        type="number"
                        value={formData.sealingFeeMax}
                        onChange={(e) => setFormData({...formData, sealingFeeMax: e.target.value})}
                        className="bg-black border-gray-700 text-white pl-7"
                        placeholder="1500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <p className="text-white/80 text-sm">
                  💡 <strong className="text-white">Pricing Tip:</strong> Users will see your price range and can 
                  compare with other lawyers. Competitive pricing gets more leads!
                </p>
              </div>

              <div className="flex justify-between pt-6">
                <Button variant="outline" onClick={handleBack} className="border-gray-700 text-white">
                  Back
                </Button>
                <Button onClick={handleNext} className="bg-purple-500 hover:bg-purple-600">
                  Next Step
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 5: Payment & Confirmation */}
        {step === 5 && (
          <Card className="bg-gray-900 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-white">Payment & Confirmation</CardTitle>
              <CardDescription className="text-white/60">
                Review and complete your subscription
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Subscription Details */}
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl text-white mb-2">FairPath Legal - Lawyer Subscription</h3>
                    <p className="text-white/60">Access to pre-qualified expungement leads</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl text-purple-400">$20</p>
                    <p className="text-white/60 text-sm">/month</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-white/80">
                    <CheckCircle className="h-4 w-4 text-purple-400" />
                    <span>Profile in lawyer directory</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <CheckCircle className="h-4 w-4 text-purple-400" />
                    <span>Pre-qualified client leads</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <CheckCircle className="h-4 w-4 text-purple-400" />
                    <span>Direct messaging with clients</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <CheckCircle className="h-4 w-4 text-purple-400" />
                    <span>Case management dashboard</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <CheckCircle className="h-4 w-4 text-purple-400" />
                    <span>Cancel anytime</span>
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div>
                <Label className="text-white mb-3 block">Payment Information</Label>
                <div className="bg-black border border-gray-700 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <CreditCard className="h-6 w-6 text-purple-400" />
                    <p className="text-white">Secure payment powered by Stripe</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber" className="text-white/80">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="4242 4242 4242 4242"
                        className="bg-gray-900 border-gray-700 text-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry" className="text-white/80">Expiry</Label>
                        <Input
                          id="expiry"
                          placeholder="MM / YY"
                          className="bg-gray-900 border-gray-700 text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvc" className="text-white/80">CVC</Label>
                        <Input
                          id="cvc"
                          placeholder="123"
                          className="bg-gray-900 border-gray-700 text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3">
                <Checkbox
                  id="terms"
                  checked={formData.agreedToTerms}
                  onCheckedChange={(checked) => setFormData({...formData, agreedToTerms: checked as boolean})}
                />
                <label htmlFor="terms" className="text-white/80 text-sm cursor-pointer">
                  I agree to the <span className="text-purple-400 underline">Terms of Service</span> and{' '}
                  <span className="text-purple-400 underline">Privacy Policy</span>. I understand my subscription 
                  will auto-renew at $20/month and I can cancel anytime.
                </label>
              </div>

              <div className="flex justify-between pt-6">
                <Button variant="outline" onClick={handleBack} className="border-gray-700 text-white">
                  Back
                </Button>
                <Button 
                  onClick={handleSubmit} 
                  className="bg-purple-500 hover:bg-purple-600"
                  disabled={!formData.agreedToTerms}
                >
                  Complete Signup & Pay
                  <CheckCircle className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

      </div>
    </div>
  );
}
