import { useState } from 'react';
import { ArrowRight, ArrowLeft, Heart, MapPin } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Progress } from '../ui/progress';
import LogoFinal from '../common/LogoFinal';

interface DonorOnboardingProps {
  onComplete: (data: any) => void;
  onBack: () => void;
}

export default function DonorOnboarding({ onComplete, onBack }: DonorOnboardingProps) {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const [formData, setFormData] = useState({
    // Step 1: Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Step 2: Location
    city: '',
    state: '',
    zipCode: '',
    
    // Step 3: Verification
    agreeToTerms: false,
    understandsProcess: false
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

  const progress = (step / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="border-b border-white/5 bg-[#121212] sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <LogoFinal size="md" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-white/60">Step {step} of {totalSteps}</span>
            <span className="text-sm text-[#A8F32C]">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step 1: Personal Info */}
        {step === 1 && (
          <Card className="bg-[#121212] border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-[#A8F32C]/20 flex items-center justify-center">
                <Heart className="h-6 w-6 text-[#A8F32C]" />
              </div>
              <div>
                <h2 className="text-2xl">Welcome, Community Hero!</h2>
                <p className="text-white/60">Thank you for wanting to help</p>
              </div>
            </div>

            <div className="bg-black/50 border border-[#A8F32C]/30 rounded-lg p-6 mb-6">
              <h3 className="text-lg mb-3 text-[#A8F32C]">How the Marketplace Works:</h3>
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex gap-2">
                  <span className="text-[#A8F32C]">1.</span>
                  <span>Post items you want to donate (furniture, clothes, essentials)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#A8F32C]">2.</span>
                  <span>Justice-impacted individuals claim items they need</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#A8F32C]">3.</span>
                  <span>You choose who gets your item from claimers</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#A8F32C]">4.</span>
                  <span>Coordinate pickup directly (48-hour window)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#A8F32C]">5.</span>
                  <span>Rate each other to build community trust</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-white mb-2 block">
                    First Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="bg-black border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-white mb-2 block">
                    Last Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="bg-black border-white/20 text-white"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-white mb-2 block">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-black border-white/20 text-white"
                  placeholder="your@email.com"
                />
                <p className="text-xs text-white/40 mt-2">We'll notify you when someone claims your items</p>
              </div>

              <div>
                <Label htmlFor="phone" className="text-white mb-2 block">
                  Phone Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-black border-white/20 text-white"
                  placeholder="(555) 123-4567"
                />
                <p className="text-xs text-white/40 mt-2">For pickup coordination</p>
              </div>
            </div>
          </Card>
        )}

        {/* Step 2: Location */}
        {step === 2 && (
          <Card className="bg-[#121212] border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-[#A8F32C]/20 flex items-center justify-center">
                <MapPin className="h-6 w-6 text-[#A8F32C]" />
              </div>
              <div>
                <h2 className="text-2xl">Where are you located?</h2>
                <p className="text-white/60">This helps match you with local recipients</p>
              </div>
            </div>

            <div className="space-y-4">
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

              <div className="bg-black/50 border border-white/10 rounded-lg p-6">
                <h3 className="text-white mb-3">Privacy & Safety</h3>
                <ul className="space-y-2 text-sm text-white/60">
                  <li className="flex gap-2">
                    <span className="text-[#A8F32C]">✓</span>
                    <span>Your full address is never shared publicly</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#A8F32C]">✓</span>
                    <span>Recipients only see general location (city/zip)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#A8F32C]">✓</span>
                    <span>You coordinate pickup details directly after accepting a claimer</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#A8F32C]">✓</span>
                    <span>All users are verified through our system</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        )}

        {/* Step 3: Verification */}
        {step === 3 && (
          <Card className="bg-[#121212] border-white/10 p-8">
            <h2 className="text-2xl mb-2">Almost Done!</h2>
            <p className="text-white/60 mb-6">Just confirm a few things</p>

            <div className="space-y-6">
              <div className="bg-black/50 border border-[#A8F32C]/30 rounded-lg p-6">
                <h3 className="text-lg mb-4 text-[#A8F32C]">What You're Agreeing To:</h3>
                <ul className="space-y-3 text-sm text-white/80">
                  <li className="flex gap-2">
                    <span className="text-[#A8F32C]">•</span>
                    <span>Items posted must be in usable condition</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#A8F32C]">•</span>
                    <span>You'll respond to claims within 24 hours</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#A8F32C]">•</span>
                    <span>Pickup must happen within 48 hours of acceptance</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#A8F32C]">•</span>
                    <span>You'll treat all recipients with dignity and respect</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#A8F32C]">•</span>
                    <span>No discrimination based on conviction type</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <label className="flex items-start gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                  <input
                    type="checkbox"
                    checked={formData.understandsProcess}
                    onChange={(e) => setFormData({ ...formData, understandsProcess: e.target.checked })}
                    className="mt-1"
                  />
                  <div className="text-sm">
                    <div className="text-white">I understand how the marketplace works</div>
                    <div className="text-xs text-white/60">
                      Items are claimed on a first-come basis, and I choose the final recipient
                    </div>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                  <input
                    type="checkbox"
                    checked={formData.agreeToTerms}
                    onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                    className="mt-1"
                  />
                  <div className="text-sm">
                    <div className="text-white">I agree to the Terms of Service and Community Guidelines</div>
                    <div className="text-xs text-white/60">
                      I will treat all community members with respect and dignity
                    </div>
                  </div>
                </label>
              </div>

              {formData.agreeToTerms && formData.understandsProcess && (
                <div className="bg-[#A8F32C]/10 border border-[#A8F32C]/30 rounded-lg p-6 text-center">
                  <Heart className="h-12 w-12 text-[#A8F32C] mx-auto mb-3" />
                  <h3 className="text-xl mb-2">Thank You for Caring! 💚</h3>
                  <p className="text-white/80 text-sm">
                    You're about to make a real difference in someone's life. Every item you donate helps someone rebuild their future.
                  </p>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex gap-4 mt-8">
          <Button onClick={handleBack} variant="outline" className="flex-1 border-white/20 text-white">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button 
            onClick={handleNext} 
            className="flex-1 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
            disabled={step === 3 && (!formData.agreeToTerms || !formData.understandsProcess)}
          >
            {step === totalSteps ? 'Start Donating' : 'Continue'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
