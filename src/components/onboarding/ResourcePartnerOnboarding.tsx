import { useState } from 'react';
import { ArrowRight, ArrowLeft, Save, Users, Heart } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Progress } from '../ui/progress';
import LogoFinal from '../common/LogoFinal';

interface ResourcePartnerOnboardingProps {
  onComplete: (data: any) => void;
  onBack: () => void;
}

export default function ResourcePartnerOnboarding({ onComplete, onBack }: ResourcePartnerOnboardingProps) {
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  const [formData, setFormData] = useState({
    // Step 1: Organization Info
    organizationType: '',
    organizationName: '',
    taxId: '',
    website: '',
    
    // Step 2: Contact Info
    contactFirstName: '',
    contactLastName: '',
    contactEmail: '',
    contactPhone: '',
    jobTitle: '',
    
    // Step 3: Services
    servicesOffered: [] as string[],
    clientVolume: '',
    
    // Step 4: Location
    address: '',
    city: '',
    state: '',
    zipCode: '',
    serviceArea: '',
    
    // Step 5: Free Access Application
    is501c3: '',
    servesReentry: '',
    agreesToTerms: false
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
    localStorage.setItem('resourceOnboardingProgress', JSON.stringify({ step, formData }));
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

        {/* Step 1: Organization Info */}
        {step === 1 && (
          <Card className="bg-[#121212] border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-[#A8F32C]/20 flex items-center justify-center">
                <Users className="h-6 w-6 text-[#A8F32C]" />
              </div>
              <div>
                <h2 className="text-2xl">Organization Information</h2>
                <p className="text-white/60">Tell us about your organization</p>
              </div>
            </div>

            <div className="bg-black/50 border border-[#A8F32C]/30 rounded-lg p-6 mb-6">
              <div className="flex items-start gap-3">
                <Heart className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-1" />
                <div className="text-sm">
                  <div className="text-white mb-2">FREE for Qualifying Nonprofits!</div>
                  <div className="text-white/60">
                    501(c)(3) organizations focused on reentry services get free access to our complete CRM platform.
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-white mb-3 block">
                  Organization Type <span className="text-red-500">*</span>
                </Label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                    <input
                      type="radio"
                      name="organizationType"
                      value="nonprofit"
                      checked={formData.organizationType === 'nonprofit'}
                      onChange={(e) => setFormData({ ...formData, organizationType: e.target.value })}
                    />
                    <div>
                      <div className="text-white">Nonprofit 501(c)(3)</div>
                      <div className="text-xs text-[#A8F32C]">Eligible for free access</div>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                    <input
                      type="radio"
                      name="organizationType"
                      value="government"
                      checked={formData.organizationType === 'government'}
                      onChange={(e) => setFormData({ ...formData, organizationType: e.target.value })}
                    />
                    <div>
                      <div className="text-white">Government Agency</div>
                      <div className="text-xs text-white/60">Special pricing available</div>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                    <input
                      type="radio"
                      name="organizationType"
                      value="other"
                      checked={formData.organizationType === 'other'}
                      onChange={(e) => setFormData({ ...formData, organizationType: e.target.value })}
                    />
                    <div>
                      <div className="text-white">Other Organization</div>
                      <div className="text-xs text-white/60">Standard pricing</div>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <Label htmlFor="organizationName" className="text-white mb-2 block">
                  Organization Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="organizationName"
                  value={formData.organizationName}
                  onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                  className="bg-black border-white/20 text-white"
                  placeholder="Hope Reentry Services"
                />
              </div>

              {formData.organizationType === 'nonprofit' && (
                <div>
                  <Label htmlFor="taxId" className="text-white mb-2 block">
                    EIN (Tax ID) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="taxId"
                    value={formData.taxId}
                    onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                    className="bg-black border-white/20 text-white"
                    placeholder="12-3456789"
                  />
                  <p className="text-xs text-white/40 mt-2">Required to verify 501(c)(3) status</p>
                </div>
              )}

              <div>
                <Label htmlFor="website" className="text-white mb-2 block">
                  Website
                </Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="bg-black border-white/20 text-white"
                  placeholder="https://yourorg.org"
                />
              </div>
            </div>
          </Card>
        )}

        {/* Step 2: Contact Info */}
        {step === 2 && (
          <Card className="bg-[#121212] border-white/10 p-8">
            <h2 className="text-2xl mb-2">Primary Contact</h2>
            <p className="text-white/60 mb-6">Who will be the main administrator?</p>

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
                    placeholder="Case Manager, Director, etc."
                  />
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Step 3: Services */}
        {step === 3 && (
          <Card className="bg-[#121212] border-white/10 p-8">
            <h2 className="text-2xl mb-2">Services & Clientele</h2>
            <p className="text-white/60 mb-6">What services do you provide?</p>

            <div className="space-y-6">
              <div>
                <Label className="text-white mb-3 block">
                  Services Offered <span className="text-red-500">*</span>
                </Label>
                <div className="space-y-2">
                  {[
                    'Employment Services',
                    'Housing Assistance',
                    'Substance Abuse Treatment',
                    'Mental Health Services',
                    'Education/GED Programs',
                    'Life Skills Training',
                    'Family Reunification',
                    'Legal Services',
                    'Transportation Assistance',
                    'Other Support Services'
                  ].map((service) => (
                    <label key={service} className="flex items-center gap-3 p-3 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                      <input
                        type="checkbox"
                        checked={formData.servicesOffered.includes(service)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({ ...formData, servicesOffered: [...formData.servicesOffered, service] });
                          } else {
                            setFormData({ ...formData, servicesOffered: formData.servicesOffered.filter(s => s !== service) });
                          }
                        }}
                      />
                      <span className="text-white">{service}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="clientVolume" className="text-white mb-2 block">
                  How many clients do you serve annually? <span className="text-red-500">*</span>
                </Label>
                <select
                  id="clientVolume"
                  value={formData.clientVolume}
                  onChange={(e) => setFormData({ ...formData, clientVolume: e.target.value })}
                  className="w-full bg-black border border-white/20 rounded-lg px-3 py-2 text-white"
                >
                  <option value="">Select...</option>
                  <option value="1-50">1-50 clients</option>
                  <option value="51-200">51-200 clients</option>
                  <option value="201-500">201-500 clients</option>
                  <option value="501-1000">501-1,000 clients</option>
                  <option value="1000+">1,000+ clients</option>
                </select>
              </div>
            </div>
          </Card>
        )}

        {/* Step 4: Location */}
        {step === 4 && (
          <Card className="bg-[#121212] border-white/10 p-8">
            <h2 className="text-2xl mb-2">Location & Service Area</h2>
            <p className="text-white/60 mb-6">Where are you located?</p>

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

              <div>
                <Label htmlFor="serviceArea" className="text-white mb-2 block">
                  Service Area <span className="text-red-500">*</span>
                </Label>
                <select
                  id="serviceArea"
                  value={formData.serviceArea}
                  onChange={(e) => setFormData({ ...formData, serviceArea: e.target.value })}
                  className="w-full bg-black border border-white/20 rounded-lg px-3 py-2 text-white"
                >
                  <option value="">Select...</option>
                  <option value="local">Local (single city/county)</option>
                  <option value="regional">Regional (multiple counties)</option>
                  <option value="statewide">Statewide</option>
                  <option value="multi-state">Multi-state</option>
                  <option value="national">National</option>
                </select>
              </div>
            </div>
          </Card>
        )}

        {/* Step 5: Free Access */}
        {step === 5 && (
          <Card className="bg-[#121212] border-white/10 p-8">
            <h2 className="text-2xl mb-2">Free Access Application</h2>
            <p className="text-white/60 mb-6">Confirm eligibility for free platform access</p>

            <div className="space-y-6">
              <div>
                <Label className="text-white mb-3 block">
                  Is your organization a registered 501(c)(3)? <span className="text-red-500">*</span>
                </Label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                    <input
                      type="radio"
                      name="is501c3"
                      value="yes"
                      checked={formData.is501c3 === 'yes'}
                      onChange={(e) => setFormData({ ...formData, is501c3: e.target.value })}
                    />
                    <div>
                      <div className="text-white">Yes, we're a 501(c)(3)</div>
                      <div className="text-xs text-[#A8F32C]">Eligible for free access</div>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                    <input
                      type="radio"
                      name="is501c3"
                      value="no"
                      checked={formData.is501c3 === 'no'}
                      onChange={(e) => setFormData({ ...formData, is501c3: e.target.value })}
                    />
                    <div>
                      <div className="text-white">No</div>
                      <div className="text-xs text-white/60">Standard pricing will apply</div>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <Label className="text-white mb-3 block">
                  Do you primarily serve justice-impacted individuals? <span className="text-red-500">*</span>
                </Label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                    <input
                      type="radio"
                      name="servesReentry"
                      value="yes"
                      checked={formData.servesReentry === 'yes'}
                      onChange={(e) => setFormData({ ...formData, servesReentry: e.target.value })}
                    />
                    <div>
                      <div className="text-white">Yes, primarily reentry services</div>
                      <div className="text-xs text-[#A8F32C]">Eligible for free access</div>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                    <input
                      type="radio"
                      name="servesReentry"
                      value="partial"
                      checked={formData.servesReentry === 'partial'}
                      onChange={(e) => setFormData({ ...formData, servesReentry: e.target.value })}
                    />
                    <div>
                      <div className="text-white">Partially - it's one of our services</div>
                      <div className="text-xs text-white/60">Case-by-case approval</div>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                    <input
                      type="radio"
                      name="servesReentry"
                      value="no"
                      checked={formData.servesReentry === 'no'}
                      onChange={(e) => setFormData({ ...formData, servesReentry: e.target.value })}
                    />
                    <div>
                      <div className="text-white">No</div>
                      <div className="text-xs text-white/60">Standard pricing will apply</div>
                    </div>
                  </label>
                </div>
              </div>

              {formData.is501c3 === 'yes' && formData.servesReentry === 'yes' && (
                <div className="bg-[#A8F32C]/10 border border-[#A8F32C]/30 rounded-lg p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <Heart className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-1" />
                    <div>
                      <div className="text-white mb-2">🎉 You Qualify for Free Access!</div>
                      <div className="text-sm text-white/80 mb-4">
                        As a 501(c)(3) focused on reentry services, you'll get complete access to our CRM platform at no cost.
                      </div>
                    </div>
                  </div>

                  <label className="flex items-start gap-3 p-4 bg-black/30 rounded-lg">
                    <input
                      type="checkbox"
                      checked={formData.agreesToTerms}
                      onChange={(e) => setFormData({ ...formData, agreesToTerms: e.target.checked })}
                      className="mt-1"
                    />
                    <div className="text-sm">
                      <div className="text-white">I agree to the Terms of Service and Privacy Policy</div>
                      <div className="text-xs text-white/60 mt-1">
                        We may verify your 501(c)(3) status. You agree to use this platform to serve justice-impacted individuals.
                      </div>
                    </div>
                  </label>
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
          <Button onClick={handleNext} className="flex-1 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">
            {step === totalSteps ? 'Complete Setup' : 'Continue'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
