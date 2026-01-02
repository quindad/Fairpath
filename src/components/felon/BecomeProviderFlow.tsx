import { useState } from 'react';
import { ArrowLeft, CheckCircle, X, ChevronRight, DollarSign, Star, Upload, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import LogoFinal from '../common/LogoFinal';
import { serviceCategories } from '../../data/mockData';

interface BecomeProviderFlowProps {
  onClose: () => void;
  onCreate: (providerData: any) => void;
}

export default function BecomeProviderFlow({ onClose, onCreate }: BecomeProviderFlowProps) {
  const [step, setStep] = useState<'category' | 'details' | 'skills' | 'confirmation'>('category');
  const [formData, setFormData] = useState({
    category: '',
    categoryName: '',
    service: '',
    hourlyRate: 35,
    description: '',
    yearsExperience: 1,
    skills: [] as string[],
    certifications: [] as string[],
    availability: 'Flexible',
    serviceArea: 'Citywide',
    insurance: false,
    backgroundCheck: false
  });

  const [newSkill, setNewSkill] = useState('');
  const [newCert, setNewCert] = useState('');

  const handleInputChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      handleInputChange('skills', [...formData.skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    handleInputChange('skills', formData.skills.filter(s => s !== skill));
  };

  const addCertification = () => {
    if (newCert.trim() && !formData.certifications.includes(newCert.trim())) {
      handleInputChange('certifications', [...formData.certifications, newCert.trim()]);
      setNewCert('');
    }
  };

  const removeCertification = (cert: string) => {
    handleInputChange('certifications', formData.certifications.filter(c => c !== cert));
  };

  const selectCategory = (categoryId: string, categoryName: string, service: string) => {
    handleInputChange('category', categoryId);
    handleInputChange('categoryName', categoryName);
    handleInputChange('service', service);
    setStep('details');
  };

  const handleSubmit = () => {
    if (!formData.description || !formData.service) {
      alert('Please fill in all required fields');
      return;
    }
    setStep('confirmation');
  };

  const handleComplete = () => {
    const providerData = {
      ...formData,
      createdAt: new Date().toISOString(),
      status: 'active',
      jobsCompleted: 0,
      rating: 5.0,
      reviews: 0
    };
    onCreate(providerData);
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
            <Button onClick={onClose} variant="outline" className="border-white/20 text-white hover:bg-white/5">
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Progress Steps */}
        {step !== 'confirmation' && (
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className={`flex items-center gap-2 ${step === 'category' ? 'text-[#A8F32C]' : 'text-white'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${['details', 'skills'].includes(step) ? 'bg-[#A8F32C] text-black' : step === 'category' ? 'bg-[#A8F32C] text-black' : 'bg-white/10'}`}>
                {['details', 'skills'].includes(step) ? <CheckCircle className="h-5 w-5" /> : '1'}
              </div>
              <span>Category</span>
            </div>
            <div className="w-12 h-0.5 bg-white/20" />
            <div className={`flex items-center gap-2 ${step === 'details' ? 'text-[#A8F32C]' : step === 'skills' ? 'text-white' : 'text-white/40'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'skills' ? 'bg-[#A8F32C] text-black' : step === 'details' ? 'bg-[#A8F32C] text-black' : 'bg-white/10'}`}>
                {step === 'skills' ? <CheckCircle className="h-5 w-5" /> : '2'}
              </div>
              <span>Details</span>
            </div>
            <div className="w-12 h-0.5 bg-white/20" />
            <div className={`flex items-center gap-2 ${step === 'skills' ? 'text-[#A8F32C]' : 'text-white/40'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'skills' ? 'bg-[#A8F32C] text-black' : 'bg-white/10'}`}>
                3
              </div>
              <span>Skills</span>
            </div>
          </div>
        )}

        {/* STEP 1: SELECT CATEGORY */}
        {step === 'category' && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-4xl mb-3 text-white">What Service Will You Offer?</h2>
              <p className="text-xl text-white/60">
                Choose the category that best matches your skills
              </p>
            </div>

            {serviceCategories.map((category) => (
              <Card key={category.id} className="bg-[#121212] border-white/10 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-4xl">{category.icon}</div>
                  <div>
                    <h3 className="text-2xl text-white">{category.name}</h3>
                    <p className="text-white/60">{category.services.length} services available</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-3">
                  {category.services.map((service) => (
                    <Button
                      key={service}
                      variant="outline"
                      className="border-white/20 text-white hover:bg-[#A8F32C] hover:text-black hover:border-[#A8F32C] transition-all"
                      onClick={() => selectCategory(category.id, category.name, service)}
                    >
                      {service}
                    </Button>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* STEP 2: SERVICE DETAILS */}
        {step === 'details' && (
          <div className="space-y-6">
            <Card className="bg-gradient-to-r from-[#A8F32C]/20 to-transparent border-[#A8F32C]/30 p-6 mb-6">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{serviceCategories.find(c => c.id === formData.category)?.icon}</div>
                <div>
                  <div className="text-sm text-white/60">{formData.categoryName}</div>
                  <div className="text-2xl text-white">{formData.service}</div>
                </div>
              </div>
            </Card>

            <Card className="bg-[#121212] border-white/10 p-6">
              <h2 className="text-2xl mb-4 text-white">Service Details</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-white/60 mb-2">Your Hourly Rate (Required)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                    <Input
                      type="number"
                      min="15"
                      max="200"
                      value={formData.hourlyRate}
                      onChange={(e) => handleInputChange('hourlyRate', parseInt(e.target.value))}
                      className="pl-10 bg-black/50 border-white/20 text-white text-lg"
                    />
                  </div>
                  <div className="text-xs text-white/40 mt-1">
                    Typical range: $25-$100/hr • You keep 90% after platform fee
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-2">Service Description (Required)</label>
                  <textarea
                    placeholder="Describe what you offer, your experience, and what makes you great..."
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full h-32 bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-2">Years of Experience</label>
                  <Input
                    type="number"
                    min="0"
                    max="30"
                    value={formData.yearsExperience}
                    onChange={(e) => handleInputChange('yearsExperience', parseInt(e.target.value))}
                    className="bg-black/50 border-white/20 text-white"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Availability</label>
                    <select
                      value={formData.availability}
                      onChange={(e) => handleInputChange('availability', e.target.value)}
                      className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white"
                    >
                      <option value="Flexible">Flexible</option>
                      <option value="Weekdays">Weekdays Only</option>
                      <option value="Weekends">Weekends Only</option>
                      <option value="Evenings">Evenings Only</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-white/60 mb-2">Service Area</label>
                    <select
                      value={formData.serviceArea}
                      onChange={(e) => handleInputChange('serviceArea', e.target.value)}
                      className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white"
                    >
                      <option value="Citywide">Citywide</option>
                      <option value="North Side">North Side</option>
                      <option value="South Side">South Side</option>
                      <option value="West Side">West Side</option>
                      <option value="Downtown">Downtown</option>
                    </select>
                  </div>
                </div>
              </div>
            </Card>

            <Button 
              className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90 h-12"
              onClick={() => setStep('skills')}
            >
              Continue to Skills
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        )}

        {/* STEP 3: SKILLS & CERTIFICATIONS */}
        {step === 'skills' && (
          <div className="space-y-6">
            <Card className="bg-[#121212] border-white/10 p-6">
              <h2 className="text-2xl mb-4 text-white">Skills & Qualifications</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-white/60 mb-2">Your Skills</label>
                  <div className="flex gap-2 mb-3">
                    <Input
                      placeholder="e.g., Plumbing, Repairs, Customer Service"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                      className="flex-1 bg-black/50 border-white/20 text-white"
                    />
                    <Button onClick={addSkill} className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill) => (
                      <Badge key={skill} className="bg-blue-500/20 text-blue-400 border-blue-500/30 pr-1">
                        {skill}
                        <button onClick={() => removeSkill(skill)} className="ml-2 hover:text-white">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-2">Certifications (Optional)</label>
                  <div className="flex gap-2 mb-3">
                    <Input
                      placeholder="e.g., Licensed Plumber, CompTIA A+"
                      value={newCert}
                      onChange={(e) => setNewCert(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addCertification()}
                      className="flex-1 bg-black/50 border-white/20 text-white"
                    />
                    <Button onClick={addCertification} className="bg-purple-500 text-white hover:bg-purple-600">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.certifications.map((cert) => (
                      <Badge key={cert} className="bg-purple-500/20 text-purple-400 border-purple-500/30 pr-1">
                        {cert}
                        <button onClick={() => removeCertification(cert)} className="ml-2 hover:text-white">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.backgroundCheck}
                      onChange={(e) => handleInputChange('backgroundCheck', e.target.checked)}
                      className="w-5 h-5"
                    />
                    <div>
                      <div className="text-white">I have a background check</div>
                      <div className="text-sm text-white/60">Increases trust and bookings by 45%</div>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.insurance}
                      onChange={(e) => handleInputChange('insurance', e.target.checked)}
                      className="w-5 h-5"
                    />
                    <div>
                      <div className="text-white">I have liability insurance</div>
                      <div className="text-sm text-white/60">Required for certain service categories</div>
                    </div>
                  </label>
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-to-r from-[#A8F32C]/10 to-transparent border-[#A8F32C]/30 p-4">
              <div className="flex items-start gap-3">
                <Star className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-white mb-1">Build Your FairPath Score</div>
                  <div className="text-sm text-white/60">
                    Every completed job increases your score, making you more attractive to customers and improving your chances for housing and traditional employment!
                  </div>
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
                onClick={handleSubmit}
              >
                Create Service Listing
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 4: CONFIRMATION */}
        {step === 'confirmation' && (
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-[#A8F32C]/20 to-transparent border-[#A8F32C]/30 p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-[#A8F32C] flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-black" />
              </div>
              <h2 className="text-3xl mb-3 text-white">You're Now a Service Provider!</h2>
              <p className="text-xl text-white/80 mb-6">
                Your {formData.service} listing is live and ready to receive bookings.
              </p>
              
              <div className="bg-black/50 border border-white/10 rounded-lg p-6 mb-6 text-left">
                <h3 className="text-xl mb-4 text-white">Your Service Listing</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-white/60">Service:</span>
                    <span className="text-white">{formData.service}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Hourly Rate:</span>
                    <span className="text-[#A8F32C] text-xl">${formData.hourlyRate}/hr</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">You'll Earn (after 10% fee):</span>
                    <span className="text-white">${Math.round(formData.hourlyRate * 0.9)}/hr</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Skills:</span>
                    <span className="text-white">{formData.skills.length} skills listed</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Availability:</span>
                    <span className="text-white">{formData.availability}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6 text-left">
                <h3 className="text-white mb-2">What Happens Next?</h3>
                <div className="space-y-2 text-sm text-white/80">
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-blue-400">1</span>
                    </div>
                    <div>Your listing appears in search results for customers</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-blue-400">2</span>
                    </div>
                    <div>Customers can request bookings and you'll get notified</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-blue-400">3</span>
                    </div>
                    <div>Complete jobs, get paid, and build your FairPath Score!</div>
                  </div>
                </div>
              </div>

              <Button 
                className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90 h-12"
                onClick={handleComplete}
              >
                Go to My Service Dashboard
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
