import { useState } from 'react';
import { ArrowRight, ArrowLeft, Save, Home, DollarSign } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Progress } from '../ui/progress';
import LogoFinal from '../common/LogoFinal';

interface PropertyOwnerOnboardingProps {
  onComplete: (data: any) => void;
  onBack: () => void;
}

export default function PropertyOwnerOnboarding({ onComplete, onBack }: PropertyOwnerOnboardingProps) {
  const [step, setStep] = useState(1);
  const totalSteps = 7;

  const [formData, setFormData] = useState({
    // Step 1: Personal/Business Info
    ownerType: '',
    firstName: '',
    lastName: '',
    companyName: '',
    email: '',
    phone: '',
    
    // Step 2: Property Info
    propertyCount: '',
    propertyTypes: [] as string[],
    
    // Step 3: First Property Details
    address: '',
    city: '',
    state: '',
    zipCode: '',
    bedrooms: '',
    bathrooms: '',
    monthlyRent: '',
    
    // Step 4: Rental Criteria
    acceptsConvictions: '',
    convictionExclusions: [] as string[],
    maxYearsSinceConviction: '',
    
    // Step 5: FastTrack Program
    joinFastTrack: '',
    understandsRevShare: false,
    agreesToShowings: false,
    
    // Step 6: Package Selection
    selectedPackage: '',
    
    // Step 7: Payment
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
    localStorage.setItem('propertyOnboardingProgress', JSON.stringify({ step, formData }));
    alert('Progress saved!');
  };

  const progress = (step / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-black text-white">
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
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-white/60">Step {step} of {totalSteps}</span>
            <span className="text-sm text-[#A8F32C]">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step 1: Owner Info */}
        {step === 1 && (
          <Card className="bg-[#121212] border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-[#A8F32C]/20 flex items-center justify-center">
                <Home className="h-6 w-6 text-[#A8F32C]" />
              </div>
              <div>
                <h2 className="text-2xl">Property Owner Information</h2>
                <p className="text-white/60">Tell us about yourself</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-white mb-3 block">
                  Are you an individual or business? <span className="text-red-500">*</span>
                </Label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                    <input
                      type="radio"
                      name="ownerType"
                      value="individual"
                      checked={formData.ownerType === 'individual'}
                      onChange={(e) => setFormData({ ...formData, ownerType: e.target.value })}
                    />
                    <span className="text-white">Individual Property Owner</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                    <input
                      type="radio"
                      name="ownerType"
                      value="business"
                      checked={formData.ownerType === 'business'}
                      onChange={(e) => setFormData({ ...formData, ownerType: e.target.value })}
                    />
                    <span className="text-white">Property Management Company</span>
                  </label>
                </div>
              </div>

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

              {formData.ownerType === 'business' && (
                <div>
                  <Label htmlFor="companyName" className="text-white mb-2 block">
                    Company Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="bg-black border-white/20 text-white"
                  />
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-4">
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
                  />
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
                  />
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Step 2: Property Portfolio */}
        {step === 2 && (
          <Card className="bg-[#121212] border-white/10 p-8">
            <h2 className="text-2xl mb-2">Your Property Portfolio</h2>
            <p className="text-white/60 mb-6">Tell us about your properties</p>

            <div className="space-y-6">
              <div>
                <Label htmlFor="propertyCount" className="text-white mb-2 block">
                  How many properties do you own/manage? <span className="text-red-500">*</span>
                </Label>
                <select
                  id="propertyCount"
                  value={formData.propertyCount}
                  onChange={(e) => setFormData({ ...formData, propertyCount: e.target.value })}
                  className="w-full bg-black border border-white/20 rounded-lg px-3 py-2 text-white"
                >
                  <option value="">Select...</option>
                  <option value="1">1 property</option>
                  <option value="2-5">2-5 properties</option>
                  <option value="6-10">6-10 properties</option>
                  <option value="11-25">11-25 properties</option>
                  <option value="25+">25+ properties</option>
                </select>
              </div>

              <div>
                <Label className="text-white mb-3 block">
                  What types of properties do you have? <span className="text-red-500">*</span>
                </Label>
                <div className="space-y-2">
                  {['Single Family Home', 'Multi-Unit (2-4 units)', 'Apartment Complex (5+ units)', 'Condo/Townhouse', 'Room Rental'].map((type) => (
                    <label key={type} className="flex items-center gap-3 p-3 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                      <input
                        type="checkbox"
                        checked={formData.propertyTypes.includes(type)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({ ...formData, propertyTypes: [...formData.propertyTypes, type] });
                          } else {
                            setFormData({ ...formData, propertyTypes: formData.propertyTypes.filter(t => t !== type) });
                          }
                        }}
                      />
                      <span className="text-white">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Step 3: First Property Details */}
        {step === 3 && (
          <Card className="bg-[#121212] border-white/10 p-8">
            <h2 className="text-2xl mb-2">Your First Listing</h2>
            <p className="text-white/60 mb-6">Let's add your first property to the platform</p>

            <div className="space-y-4">
              <div>
                <Label htmlFor="address" className="text-white mb-2 block">
                  Property Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="bg-black border-white/20 text-white"
                  placeholder="123 Main St"
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
                    ZIP <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    className="bg-black border-white/20 text-white"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="bedrooms" className="text-white mb-2 block">
                    Bedrooms <span className="text-red-500">*</span>
                  </Label>
                  <select
                    id="bedrooms"
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                    className="w-full bg-black border border-white/20 rounded-lg px-3 py-2 text-white"
                  >
                    <option value="">Select...</option>
                    <option value="studio">Studio</option>
                    <option value="1">1 BR</option>
                    <option value="2">2 BR</option>
                    <option value="3">3 BR</option>
                    <option value="4+">4+ BR</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="bathrooms" className="text-white mb-2 block">
                    Bathrooms <span className="text-red-500">*</span>
                  </Label>
                  <select
                    id="bathrooms"
                    value={formData.bathrooms}
                    onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                    className="w-full bg-black border border-white/20 rounded-lg px-3 py-2 text-white"
                  >
                    <option value="">Select...</option>
                    <option value="1">1 BA</option>
                    <option value="1.5">1.5 BA</option>
                    <option value="2">2 BA</option>
                    <option value="2.5">2.5 BA</option>
                    <option value="3+">3+ BA</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="monthlyRent" className="text-white mb-2 block">
                    Monthly Rent <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="monthlyRent"
                    type="number"
                    value={formData.monthlyRent}
                    onChange={(e) => setFormData({ ...formData, monthlyRent: e.target.value })}
                    className="bg-black border-white/20 text-white"
                    placeholder="1200"
                  />
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Step 4: Rental Criteria */}
        {step === 4 && (
          <Card className="bg-[#121212] border-white/10 p-8">
            <h2 className="text-2xl mb-2">Rental Criteria</h2>
            <p className="text-white/60 mb-6">Set your eligibility requirements</p>

            <div className="space-y-6">
              <div>
                <Label className="text-white mb-3 block">
                  Are you willing to rent to people with conviction histories? <span className="text-red-500">*</span>
                </Label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                    <input
                      type="radio"
                      name="acceptsConvictions"
                      value="yes-all"
                      checked={formData.acceptsConvictions === 'yes-all'}
                      onChange={(e) => setFormData({ ...formData, acceptsConvictions: e.target.value })}
                    />
                    <div>
                      <div className="text-white">Yes, all conviction types</div>
                      <div className="text-xs text-white/60">Most inclusive option</div>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                    <input
                      type="radio"
                      name="acceptsConvictions"
                      value="yes-some"
                      checked={formData.acceptsConvictions === 'yes-some'}
                      onChange={(e) => setFormData({ ...formData, acceptsConvictions: e.target.value })}
                    />
                    <div>
                      <div className="text-white">Yes, but with some exclusions</div>
                      <div className="text-xs text-white/60">You'll choose which types to exclude</div>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                    <input
                      type="radio"
                      name="acceptsConvictions"
                      value="no"
                      checked={formData.acceptsConvictions === 'no'}
                      onChange={(e) => setFormData({ ...formData, acceptsConvictions: e.target.value })}
                    />
                    <div>
                      <div className="text-white">No, not at this time</div>
                      <div className="text-xs text-white/60">You can change this later</div>
                    </div>
                  </label>
                </div>
              </div>

              {formData.acceptsConvictions === 'yes-some' && (
                <div>
                  <Label className="text-white mb-3 block">
                    Which conviction types do you want to exclude?
                  </Label>
                  <div className="space-y-2">
                    {['Violent Crimes', 'Sex Offenses', 'Arson', 'Drug Manufacturing', 'Theft/Property Crimes'].map((type) => (
                      <label key={type} className="flex items-center gap-3 p-3 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                        <input
                          type="checkbox"
                          checked={formData.convictionExclusions.includes(type)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({ ...formData, convictionExclusions: [...formData.convictionExclusions, type] });
                            } else {
                              setFormData({ ...formData, convictionExclusions: formData.convictionExclusions.filter(t => t !== type) });
                            }
                          }}
                        />
                        <span className="text-white">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {(formData.acceptsConvictions === 'yes-all' || formData.acceptsConvictions === 'yes-some') && (
                <div>
                  <Label htmlFor="maxYearsSinceConviction" className="text-white mb-2 block">
                    Maximum years since conviction/release?
                  </Label>
                  <select
                    id="maxYearsSinceConviction"
                    value={formData.maxYearsSinceConviction}
                    onChange={(e) => setFormData({ ...formData, maxYearsSinceConviction: e.target.value })}
                    className="w-full bg-black border border-white/20 rounded-lg px-3 py-2 text-white"
                  >
                    <option value="">No limit</option>
                    <option value="1">Within 1 year</option>
                    <option value="3">Within 3 years</option>
                    <option value="5">Within 5 years</option>
                    <option value="7">Within 7 years</option>
                    <option value="10">Within 10 years</option>
                  </select>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Step 5: FastTrack Program */}
        {step === 5 && (
          <Card className="bg-[#121212] border-white/10 p-8">
            <div className="flex items-start gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-[#A8F32C]/20 flex items-center justify-center flex-shrink-0">
                <DollarSign className="h-6 w-6 text-[#A8F32C]" />
              </div>
              <div>
                <h2 className="text-2xl mb-2">FastTrack Revenue Share Program</h2>
                <p className="text-white/60">Earn 60% of every FastTrack application fee</p>
              </div>
            </div>

            <div className="bg-black/50 border border-[#A8F32C]/30 rounded-lg p-6 mb-6">
              <h3 className="text-lg mb-4 text-[#A8F32C]">How FastTrack Works:</h3>
              <ul className="space-y-3 text-sm text-white/80">
                <li className="flex gap-2">
                  <span className="text-[#A8F32C]">•</span>
                  <span>Applicants pay $75 ($65 with FairPath+) to apply with FastTrack</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#A8F32C]">•</span>
                  <span>You get pre-screened applicants with SingleKey background reports</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#A8F32C]">•</span>
                  <span>You earn 60% of FastTrack fees ($45 or $39 per application)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#A8F32C]">•</span>
                  <span>Must provide guaranteed showing OR valid denial reason</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#A8F32C]">•</span>
                  <span>If you rent to 1 out of every 20 applicants, you keep the full 60%</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#A8F32C]">•</span>
                  <span>Payouts every 45 days or after 20 applications (whichever comes first)</span>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <div>
                <Label className="text-white mb-3 block">
                  Do you want to join FastTrack? <span className="text-red-500">*</span>
                </Label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                    <input
                      type="radio"
                      name="joinFastTrack"
                      value="yes"
                      checked={formData.joinFastTrack === 'yes'}
                      onChange={(e) => setFormData({ ...formData, joinFastTrack: e.target.value })}
                    />
                    <div>
                      <div className="text-white">Yes, sign me up for FastTrack</div>
                      <div className="text-xs text-[#A8F32C]">Earn passive income from applications!</div>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                    <input
                      type="radio"
                      name="joinFastTrack"
                      value="no"
                      checked={formData.joinFastTrack === 'no'}
                      onChange={(e) => setFormData({ ...formData, joinFastTrack: e.target.value })}
                    />
                    <div>
                      <div className="text-white">No, just basic listings</div>
                      <div className="text-xs text-white/60">You can enable this later</div>
                    </div>
                  </label>
                </div>
              </div>

              {formData.joinFastTrack === 'yes' && (
                <>
                  <div className="space-y-3">
                    <label className="flex items-start gap-3 p-4 border border-white/20 rounded-lg">
                      <input
                        type="checkbox"
                        checked={formData.understandsRevShare}
                        onChange={(e) => setFormData({ ...formData, understandsRevShare: e.target.checked })}
                        className="mt-1"
                      />
                      <div className="text-sm">
                        <div className="text-white">I understand the 60% revenue share model</div>
                        <div className="text-xs text-white/60">I will receive 60% of FastTrack application fees</div>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-4 border border-white/20 rounded-lg">
                      <input
                        type="checkbox"
                        checked={formData.agreesToShowings}
                        onChange={(e) => setFormData({ ...formData, agreesToShowings: e.target.checked })}
                        className="mt-1"
                      />
                      <div className="text-sm">
                        <div className="text-white">I agree to provide guaranteed showings OR valid denial reasons</div>
                        <div className="text-xs text-white/60">Anti-slumlord protection: must actually consider applicants</div>
                      </div>
                    </label>
                  </div>
                </>
              )}
            </div>
          </Card>
        )}

        {/* Step 6: Package Selection */}
        {step === 6 && (
          <Card className="bg-[#121212] border-white/10 p-8">
            <h2 className="text-2xl mb-6">Choose Your Plan</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className={`p-6 border-2 rounded-lg cursor-pointer ${formData.selectedPackage === 'basic' ? 'border-[#A8F32C]' : 'border-white/20'}`}
                onClick={() => setFormData({ ...formData, selectedPackage: 'basic' })}>
                <h3 className="text-xl mb-2">Basic</h3>
                <div className="text-3xl mb-4">$29<span className="text-lg text-white/60">/mo</span></div>
                <ul className="space-y-2 text-sm text-white/80">
                  <li>• 3 active listings</li>
                  <li>• Basic applicant screening</li>
                  <li>• Email support</li>
                </ul>
              </div>

              <div className={`p-6 border-2 rounded-lg cursor-pointer ${formData.selectedPackage === 'pro' ? 'border-[#A8F32C]' : 'border-white/20'}`}
                onClick={() => setFormData({ ...formData, selectedPackage: 'pro' })}>
                <div className="text-xs text-[#A8F32C] mb-2">MOST POPULAR</div>
                <h3 className="text-xl mb-2">Professional</h3>
                <div className="text-3xl mb-4">$79<span className="text-lg text-white/60">/mo</span></div>
                <ul className="space-y-2 text-sm text-white/80">
                  <li>• 10 active listings</li>
                  <li>• FastTrack revenue share</li>
                  <li>• Priority support</li>
                  <li>• Featured listings</li>
                </ul>
              </div>

              <div className={`p-6 border-2 rounded-lg cursor-pointer ${formData.selectedPackage === 'enterprise' ? 'border-[#A8F32C]' : 'border-white/20'}`}
                onClick={() => setFormData({ ...formData, selectedPackage: 'enterprise' })}>
                <h3 className="text-xl mb-2">Enterprise</h3>
                <div className="text-3xl mb-4">$199<span className="text-lg text-white/60">/mo</span></div>
                <ul className="space-y-2 text-sm text-white/80">
                  <li>• Unlimited listings</li>
                  <li>• All FastTrack benefits</li>
                  <li>• Dedicated support</li>
                  <li>• Multi-property dashboard</li>
                  <li>• API access</li>
                </ul>
              </div>
            </div>
          </Card>
        )}

        {/* Step 7: Payment */}
        {step === 7 && (
          <Card className="bg-[#121212] border-white/10 p-8">
            <h2 className="text-2xl mb-6">Payment Method</h2>
            <p className="text-white/60 mb-6">Add a payment method to complete setup</p>
            <div className="text-center text-white/60 py-8">
              Payment form will be integrated here...
            </div>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex gap-4 mt-8">
          <Button onClick={handleBack} variant="outline" className="flex-1 border-white/20 text-white">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button onClick={handleNext} className="flex-1 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">
            {step === totalSteps ? 'Complete Setup' : 'Continue'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
