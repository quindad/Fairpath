import { useState } from 'react';
import { ArrowLeft, ChevronRight, Briefcase, Building2, Users, CheckCircle, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import LogoFinal from '../common/LogoFinal';

interface StaffingOnboardingProps {
  onComplete: (data: any) => void;
  onBack: () => void;
}

export default function StaffingOnboarding({ onComplete, onBack }: StaffingOnboardingProps) {
  const [step, setStep] = useState<'welcome' | 'company' | 'staffing-details' | 'industries' | 'confirmation'>('welcome');
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    title: '',
    email: '',
    phone: '',
    website: '',
    address: '',
    city: '',
    state: 'IL',
    zip: '',
    
    // Staffing specific
    yearsInBusiness: 1,
    numberOfRecruiters: 1,
    activeClients: 0,
    placementsPerMonth: 0,
    specialization: [] as string[],
    certifications: [] as string[],
    
    // Services
    tempStaffing: true,
    permanentPlacement: true,
    contractToHire: true,
    tempToHire: true
  });

  const [newSpecialization, setNewSpecialization] = useState('');

  const industries = [
    'Manufacturing', 'Warehouse & Logistics', 'Food Service', 'Retail',
    'Hospitality', 'Healthcare', 'Construction', 'Transportation',
    'Administrative', 'Customer Service', 'Light Industrial', 'Skilled Trades'
  ];

  const certifications = [
    'ASA Certified', 'ClearlyRated Best of Staffing', 'Joint Commission Certified',
    'E-Verify Participant', 'Minority Business Enterprise (MBE)', 'Woman-Owned Business'
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const toggleSpecialization = (industry: string) => {
    const current = formData.specialization;
    if (current.includes(industry)) {
      handleInputChange('specialization', current.filter(i => i !== industry));
    } else {
      handleInputChange('specialization', [...current, industry]);
    }
  };

  const toggleCertification = (cert: string) => {
    const current = formData.certifications;
    if (current.includes(cert)) {
      handleInputChange('certifications', current.filter(c => c !== cert));
    } else {
      handleInputChange('certifications', [...current, cert]);
    }
  };

  const handleSubmit = () => {
    if (!formData.companyName || !formData.contactName || !formData.email || !formData.phone) {
      alert('Please fill in all required fields');
      return;
    }
    setStep('confirmation');
  };

  const handleComplete = () => {
    onComplete(formData);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/5 bg-[#121212] sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button onClick={onBack} variant="ghost" size="icon" className="text-white/60 hover:text-white">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <LogoFinal size="md" />
            </div>
            <Button onClick={onBack} variant="outline" className="border-white/20 text-white hover:bg-white/5">
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Progress Steps */}
        {step !== 'welcome' && step !== 'confirmation' && (
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className={`flex items-center gap-2 ${step === 'company' ? 'text-orange-400' : 'text-white'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${['staffing-details', 'industries'].includes(step) ? 'bg-orange-500 text-white' : step === 'company' ? 'bg-orange-500 text-white' : 'bg-white/10'}`}>
                {['staffing-details', 'industries'].includes(step) ? <CheckCircle className="h-5 w-5" /> : '1'}
              </div>
              <span>Company Info</span>
            </div>
            <div className="w-12 h-0.5 bg-white/20" />
            <div className={`flex items-center gap-2 ${step === 'staffing-details' ? 'text-orange-400' : step === 'industries' ? 'text-white' : 'text-white/40'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'industries' ? 'bg-orange-500 text-white' : step === 'staffing-details' ? 'bg-orange-500 text-white' : 'bg-white/10'}`}>
                {step === 'industries' ? <CheckCircle className="h-5 w-5" /> : '2'}
              </div>
              <span>Staffing Details</span>
            </div>
            <div className="w-12 h-0.5 bg-white/20" />
            <div className={`flex items-center gap-2 ${step === 'industries' ? 'text-orange-400' : 'text-white/40'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'industries' ? 'bg-orange-500 text-white' : 'bg-white/10'}`}>
                3
              </div>
              <span>Industries</span>
            </div>
          </div>
        )}

        {/* WELCOME SCREEN */}
        {step === 'welcome' && (
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-orange-500/20 to-transparent border-orange-500/30 p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-orange-500 flex items-center justify-center mx-auto mb-6">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-4xl mb-4 text-white">Welcome to FairPath Staffing!</h1>
              <p className="text-xl text-white/80 mb-6">
                Connect employers with pre-vetted, second-chance talent through FairPath Industries' staffing network
              </p>

              <div className="bg-black/50 border border-white/10 rounded-lg p-6 mb-6 text-left">
                <h3 className="text-xl mb-4 text-white">As a FairPath Staffing Partner, You Get:</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-white mb-1">Access to Qualified Candidates</div>
                      <div className="text-sm text-white/60">Pre-screened, motivated talent ready to work</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-white mb-1">WOTC Tax Credit Support</div>
                      <div className="text-sm text-white/60">Help clients save $2,400-$9,600 per hire</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-white mb-1">FairPath Score System</div>
                      <div className="text-sm text-white/60">Data-driven candidate matching and verification</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-white mb-1">Referral Network</div>
                      <div className="text-sm text-white/60">Connect with employers actively seeking second-chance hires</div>
                    </div>
                  </div>
                </div>
              </div>

              <Button 
                className="w-full bg-orange-500 text-white hover:bg-orange-600 h-12"
                onClick={() => setStep('company')}
              >
                Get Started
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Card>
          </div>
        )}

        {/* STEP 1: COMPANY INFO */}
        {step === 'company' && (
          <div className="space-y-6">
            <Card className="bg-[#121212] border-white/10 p-6">
              <h2 className="text-2xl mb-4 text-white">Company Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-white/60 mb-2">Company Name (Required)</label>
                  <Input
                    placeholder="ABC Staffing Solutions"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    className="bg-black/50 border-white/20 text-white"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Contact Name (Required)</label>
                    <Input
                      placeholder="John Smith"
                      value={formData.contactName}
                      onChange={(e) => handleInputChange('contactName', e.target.value)}
                      className="bg-black/50 border-white/20 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white/60 mb-2">Title</label>
                    <Input
                      placeholder="VP of Operations"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="bg-black/50 border-white/20 text-white"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Email (Required)</label>
                    <Input
                      type="email"
                      placeholder="john@abcstaffing.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="bg-black/50 border-white/20 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white/60 mb-2">Phone (Required)</label>
                    <Input
                      type="tel"
                      placeholder="(312) 555-0100"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="bg-black/50 border-white/20 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-2">Website</label>
                  <Input
                    placeholder="https://www.abcstaffing.com"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    className="bg-black/50 border-white/20 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-2">Address</label>
                  <Input
                    placeholder="123 Business Pkwy"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="bg-black/50 border-white/20 text-white"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="md:col-span-1">
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
                    <label className="block text-sm text-white/60 mb-2">ZIP</label>
                    <Input
                      placeholder="60601"
                      value={formData.zip}
                      onChange={(e) => handleInputChange('zip', e.target.value)}
                      className="bg-black/50 border-white/20 text-white"
                    />
                  </div>
                </div>
              </div>
            </Card>

            <Button 
              className="w-full bg-orange-500 text-white hover:bg-orange-600 h-12"
              onClick={() => setStep('staffing-details')}
            >
              Continue
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        )}

        {/* STEP 2: STAFFING DETAILS */}
        {step === 'staffing-details' && (
          <div className="space-y-6">
            <Card className="bg-[#121212] border-white/10 p-6">
              <h2 className="text-2xl mb-4 text-white">Staffing Agency Details</h2>
              
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Years in Business</label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.yearsInBusiness}
                      onChange={(e) => handleInputChange('yearsInBusiness', parseInt(e.target.value))}
                      className="bg-black/50 border-white/20 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white/60 mb-2">Number of Recruiters</label>
                    <Input
                      type="number"
                      min="1"
                      max="1000"
                      value={formData.numberOfRecruiters}
                      onChange={(e) => handleInputChange('numberOfRecruiters', parseInt(e.target.value))}
                      className="bg-black/50 border-white/20 text-white"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Active Clients</label>
                    <Input
                      type="number"
                      min="0"
                      value={formData.activeClients}
                      onChange={(e) => handleInputChange('activeClients', parseInt(e.target.value))}
                      className="bg-black/50 border-white/20 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white/60 mb-2">Avg Placements/Month</label>
                    <Input
                      type="number"
                      min="0"
                      value={formData.placementsPerMonth}
                      onChange={(e) => handleInputChange('placementsPerMonth', parseInt(e.target.value))}
                      className="bg-black/50 border-white/20 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-3">Staffing Services Offered</label>
                  <div className="grid md:grid-cols-2 gap-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.tempStaffing}
                        onChange={(e) => handleInputChange('tempStaffing', e.target.checked)}
                        className="w-5 h-5"
                      />
                      <div>
                        <div className="text-white">Temporary Staffing</div>
                        <div className="text-xs text-white/60">Short-term assignments</div>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.permanentPlacement}
                        onChange={(e) => handleInputChange('permanentPlacement', e.target.checked)}
                        className="w-5 h-5"
                      />
                      <div>
                        <div className="text-white">Permanent Placement</div>
                        <div className="text-xs text-white/60">Direct hire</div>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.contractToHire}
                        onChange={(e) => handleInputChange('contractToHire', e.target.checked)}
                        className="w-5 h-5"
                      />
                      <div>
                        <div className="text-white">Contract-to-Hire</div>
                        <div className="text-xs text-white/60">Trial period before hire</div>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.tempToHire}
                        onChange={(e) => handleInputChange('tempToHire', e.target.checked)}
                        className="w-5 h-5"
                      />
                      <div>
                        <div className="text-white">Temp-to-Hire</div>
                        <div className="text-xs text-white/60">Temp with conversion option</div>
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-3">Certifications (Select all that apply)</label>
                  <div className="grid md:grid-cols-2 gap-2">
                    {certifications.map((cert) => (
                      <label key={cert} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.certifications.includes(cert)}
                          onChange={() => toggleCertification(cert)}
                          className="w-4 h-4"
                        />
                        <span className="text-white">{cert}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex gap-3">
              <Button 
                variant="outline"
                className="flex-1 border-white/20 text-white"
                onClick={() => setStep('company')}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button 
                className="flex-1 bg-orange-500 text-white hover:bg-orange-600 h-12"
                onClick={() => setStep('industries')}
              >
                Continue
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: INDUSTRIES */}
        {step === 'industries' && (
          <div className="space-y-6">
            <Card className="bg-[#121212] border-white/10 p-6">
              <h2 className="text-2xl mb-4 text-white">Industry Specializations</h2>
              <p className="text-white/60 mb-4">Select the industries you specialize in staffing</p>
              
              <div className="grid md:grid-cols-3 gap-3">
                {industries.map((industry) => {
                  const isSelected = formData.specialization.includes(industry);
                  return (
                    <Button
                      key={industry}
                      variant="outline"
                      className={isSelected ? 
                        'bg-orange-500 text-white border-orange-500 hover:bg-orange-600' : 
                        'border-white/20 text-white hover:bg-white/5'
                      }
                      onClick={() => toggleSpecialization(industry)}
                    >
                      {isSelected && <CheckCircle className="mr-2 h-4 w-4" />}
                      {industry}
                    </Button>
                  );
                })}
              </div>

              {formData.specialization.length > 0 && (
                <div className="mt-4 p-4 bg-black/50 border border-white/10 rounded-lg">
                  <div className="text-sm text-white/60 mb-2">Selected Specializations:</div>
                  <div className="flex flex-wrap gap-2">
                    {formData.specialization.map((spec) => (
                      <Badge key={spec} className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </Card>

            <div className="flex gap-3">
              <Button 
                variant="outline"
                className="flex-1 border-white/20 text-white"
                onClick={() => setStep('staffing-details')}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button 
                className="flex-1 bg-orange-500 text-white hover:bg-orange-600 h-12"
                onClick={handleSubmit}
                disabled={formData.specialization.length === 0}
              >
                Complete Setup
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        )}

        {/* CONFIRMATION */}
        {step === 'confirmation' && (
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-orange-500/20 to-transparent border-orange-500/30 p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-orange-500 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-3xl mb-3 text-white">Welcome to FairPath Staffing!</h2>
              <p className="text-xl text-white/80 mb-6">
                {formData.companyName} is now part of the FairPath Industries network
              </p>

              <div className="bg-black/50 border border-white/10 rounded-lg p-6 mb-6 text-left">
                <h3 className="text-xl mb-4 text-white">Your Profile Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/60">Company:</span>
                    <span className="text-white">{formData.companyName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Contact:</span>
                    <span className="text-white">{formData.contactName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Recruiters:</span>
                    <span className="text-white">{formData.numberOfRecruiters}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Specializations:</span>
                    <span className="text-white">{formData.specialization.length} industries</span>
                  </div>
                </div>
              </div>

              <Button 
                className="w-full bg-orange-500 text-white hover:bg-orange-600 h-12"
                onClick={handleComplete}
              >
                Go to Staffing Dashboard
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
