import { useState } from 'react';
import { ArrowRight, ArrowLeft, User, FileText, Briefcase, Home, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Textarea } from './ui/textarea';

interface ProfileSetupWizardProps {
  onComplete: (profile: UserProfile) => void;
}

export interface UserProfile {
  // Basic Info
  firstName: string;
  lastName: string;
  city: string;
  state: string;
  phone: string;
  
  // Conviction Summary
  convictions: {
    type: string;
    yearOfConviction: string;
    releaseYear: string;
  }[];
  onSupervision: boolean;
  
  // Work & Skills
  workHistory: string;
  skills: string;
  education: string;
  desiredJobFields: string[];
  
  // Housing Status
  currentHousingStatus: string;
  monthlyIncome: string;
  
  // Preferences
  lookingFor: string[];
  willingToRelocate: boolean;
}

const convictionTypes = [
  'Violent',
  'Non-violent drug',
  'Property',
  'Sex-related',
  'White collar / fraud',
  'Other'
];

const jobFields = [
  'Construction',
  'Warehouse',
  'Manufacturing',
  'Food Service',
  'Retail',
  'Transportation',
  'Healthcare',
  'Technology',
  'Other'
];

const housingStatuses = [
  'Homeless',
  'Couch surfing',
  'Staying with family',
  'In program',
  'Temporary housing',
  'Other'
];

export default function ProfileSetupWizard({ onComplete }: ProfileSetupWizardProps) {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    convictions: [],
    desiredJobFields: [],
    lookingFor: [],
    onSupervision: false,
    willingToRelocate: false,
  });

  const totalSteps = 5;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete(profile as UserProfile);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const addConviction = () => {
    setProfile({
      ...profile,
      convictions: [
        ...(profile.convictions || []),
        { type: '', yearOfConviction: '', releaseYear: '' }
      ]
    });
  };

  const updateConviction = (index: number, field: string, value: string) => {
    const updated = [...(profile.convictions || [])];
    updated[index] = { ...updated[index], [field]: value };
    setProfile({ ...profile, convictions: updated });
  };

  const removeConviction = (index: number) => {
    const updated = [...(profile.convictions || [])];
    updated.splice(index, 1);
    setProfile({ ...profile, convictions: updated });
  };

  const toggleJobField = (field: string) => {
    const fields = profile.desiredJobFields || [];
    if (fields.includes(field)) {
      setProfile({ ...profile, desiredJobFields: fields.filter(f => f !== field) });
    } else {
      setProfile({ ...profile, desiredJobFields: [...fields, field] });
    }
  };

  const toggleLookingFor = (item: string) => {
    const items = profile.lookingFor || [];
    if (items.includes(item)) {
      setProfile({ ...profile, lookingFor: items.filter(i => i !== item) });
    } else {
      setProfile({ ...profile, lookingFor: [...items, item] });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-white/5">
        <div className="text-xs tracking-widest text-[#A8F32C] mb-2">
          PROFILE SETUP
        </div>
        <h1 className="text-2xl mb-2">Complete Your Profile</h1>
        <p className="text-sm text-white/60">
          Step {step} of {totalSteps}
        </p>
        
        {/* Progress bar */}
        <div className="mt-4 h-1 bg-white/5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#A8F32C] transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {step === 1 && (
          <div className="space-y-5 max-w-md mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#A8F32C]/10 rounded-xl flex items-center justify-center">
                <User className="h-6 w-6 text-[#A8F32C]" />
              </div>
              <div>
                <h2 className="text-xl">Basic Information</h2>
                <p className="text-sm text-white/60">Tell us about yourself</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={profile.firstName || ''}
                  onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                  className="bg-[#121212] border-white/10 text-white h-12"
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={profile.lastName || ''}
                  onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                  className="bg-[#121212] border-white/10 text-white h-12"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={profile.city || ''}
                  onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                  className="bg-[#121212] border-white/10 text-white h-12"
                  required
                />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={profile.state || ''}
                  onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                  className="bg-[#121212] border-white/10 text-white h-12"
                  placeholder="AK"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={profile.phone || ''}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="bg-[#121212] border-white/10 text-white h-12"
                placeholder="(555) 123-4567"
                required
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5 max-w-md mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#A8F32C]/10 rounded-xl flex items-center justify-center">
                <FileText className="h-6 w-6 text-[#A8F32C]" />
              </div>
              <div>
                <h2 className="text-xl">Conviction Summary</h2>
                <p className="text-sm text-white/60">Help us filter opportunities for you</p>
              </div>
            </div>

            <div className="bg-[#121212] border border-white/5 rounded-xl p-4 mb-4">
              <p className="text-sm text-white/60">
                This information helps us show you only housing and jobs that accept your record. Your details stay private.
              </p>
            </div>

            {(profile.convictions || []).map((conviction, index) => (
              <div key={index} className="bg-[#121212] border border-white/5 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Conviction {index + 1}</Label>
                  <button
                    onClick={() => removeConviction(index)}
                    className="text-xs text-red-500 hover:text-red-400"
                  >
                    Remove
                  </button>
                </div>

                <div>
                  <Label>Type</Label>
                  <select
                    value={conviction.type}
                    onChange={(e) => updateConviction(index, 'type', e.target.value)}
                    className="w-full h-10 bg-black border border-white/10 rounded-lg px-3 text-white"
                  >
                    <option value="">Select type</option>
                    {convictionTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Year of Conviction</Label>
                    <Input
                      type="number"
                      value={conviction.yearOfConviction}
                      onChange={(e) => updateConviction(index, 'yearOfConviction', e.target.value)}
                      className="bg-black border-white/10 text-white h-10"
                      placeholder="2018"
                    />
                  </div>
                  <div>
                    <Label>Release Year</Label>
                    <Input
                      type="number"
                      value={conviction.releaseYear}
                      onChange={(e) => updateConviction(index, 'releaseYear', e.target.value)}
                      className="bg-black border-white/10 text-white h-10"
                      placeholder="2023"
                    />
                  </div>
                </div>
              </div>
            ))}

            <Button
              onClick={addConviction}
              variant="outline"
              className="w-full border-white/20 hover:bg-white/5"
            >
              + Add Conviction
            </Button>

            <div className="flex items-start gap-3 pt-4">
              <Checkbox
                id="supervision"
                checked={profile.onSupervision}
                onCheckedChange={(checked) => setProfile({ ...profile, onSupervision: checked as boolean })}
                className="mt-1 border-white/20 data-[state=checked]:bg-[#A8F32C] data-[state=checked]:border-[#A8F32C]"
              />
              <label htmlFor="supervision" className="text-sm text-white/80">
                I am currently on supervision (parole, probation, etc.)
              </label>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5 max-w-md mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#A8F32C]/10 rounded-xl flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-[#A8F32C]" />
              </div>
              <div>
                <h2 className="text-xl">Work & Skills</h2>
                <p className="text-sm text-white/60">Your experience and interests</p>
              </div>
            </div>

            <div>
              <Label htmlFor="workHistory">Work History</Label>
              <Textarea
                id="workHistory"
                value={profile.workHistory || ''}
                onChange={(e) => setProfile({ ...profile, workHistory: e.target.value })}
                className="bg-[#121212] border-white/10 text-white min-h-[100px]"
                placeholder="Previous jobs, responsibilities, years of experience..."
              />
            </div>

            <div>
              <Label htmlFor="skills">Skills</Label>
              <Textarea
                id="skills"
                value={profile.skills || ''}
                onChange={(e) => setProfile({ ...profile, skills: e.target.value })}
                className="bg-[#121212] border-white/10 text-white"
                placeholder="Forklift, welding, customer service, etc."
              />
            </div>

            <div>
              <Label htmlFor="education">Education</Label>
              <Input
                id="education"
                value={profile.education || ''}
                onChange={(e) => setProfile({ ...profile, education: e.target.value })}
                className="bg-[#121212] border-white/10 text-white h-12"
                placeholder="High school diploma, GED, some college, etc."
              />
            </div>

            <div>
              <Label className="mb-3 block">Desired Job Fields</Label>
              <div className="grid grid-cols-2 gap-2">
                {jobFields.map(field => (
                  <button
                    key={field}
                    onClick={() => toggleJobField(field)}
                    className={`py-2 px-3 rounded-lg border text-sm transition-all ${
                      (profile.desiredJobFields || []).includes(field)
                        ? 'bg-[#A8F32C] border-[#A8F32C] text-black'
                        : 'bg-[#121212] border-white/10 hover:border-white/20'
                    }`}
                  >
                    {field}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-5 max-w-md mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#A8F32C]/10 rounded-xl flex items-center justify-center">
                <Home className="h-6 w-6 text-[#A8F32C]" />
              </div>
              <div>
                <h2 className="text-xl">Housing Status</h2>
                <p className="text-sm text-white/60">Your current situation</p>
              </div>
            </div>

            <div>
              <Label>Current Housing Status</Label>
              <select
                value={profile.currentHousingStatus || ''}
                onChange={(e) => setProfile({ ...profile, currentHousingStatus: e.target.value })}
                className="w-full h-12 bg-[#121212] border border-white/10 rounded-lg px-3 text-white"
              >
                <option value="">Select status</option>
                {housingStatuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="income">Monthly Income Range</Label>
              <select
                id="income"
                value={profile.monthlyIncome || ''}
                onChange={(e) => setProfile({ ...profile, monthlyIncome: e.target.value })}
                className="w-full h-12 bg-[#121212] border border-white/10 rounded-lg px-3 text-white"
              >
                <option value="">Select range</option>
                <option value="0-500">$0 - $500</option>
                <option value="500-1000">$500 - $1,000</option>
                <option value="1000-1500">$1,000 - $1,500</option>
                <option value="1500-2000">$1,500 - $2,000</option>
                <option value="2000-3000">$2,000 - $3,000</option>
                <option value="3000+">$3,000+</option>
              </select>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-5 max-w-md mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#A8F32C]/10 rounded-xl flex items-center justify-center">
                <Settings className="h-6 w-6 text-[#A8F32C]" />
              </div>
              <div>
                <h2 className="text-xl">Preferences</h2>
                <p className="text-sm text-white/60">What are you looking for?</p>
              </div>
            </div>

            <div>
              <Label className="mb-3 block">I'm looking for:</Label>
              <div className="space-y-2">
                {['Housing', 'Jobs', 'Both'].map(item => (
                  <button
                    key={item}
                    onClick={() => toggleLookingFor(item)}
                    className={`w-full py-3 px-4 rounded-lg border text-left transition-all ${
                      (profile.lookingFor || []).includes(item)
                        ? 'bg-[#A8F32C] border-[#A8F32C] text-black'
                        : 'bg-[#121212] border-white/10 hover:border-white/20'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-start gap-3 pt-4">
              <Checkbox
                id="relocate"
                checked={profile.willingToRelocate}
                onCheckedChange={(checked) => setProfile({ ...profile, willingToRelocate: checked as boolean })}
                className="mt-1 border-white/20 data-[state=checked]:bg-[#A8F32C] data-[state=checked]:border-[#A8F32C]"
              />
              <label htmlFor="relocate" className="text-sm text-white/80">
                I'm willing to relocate for the right opportunity
              </label>
            </div>

            <div className="bg-[#A8F32C]/5 border border-[#A8F32C]/20 rounded-xl p-4 mt-6">
              <p className="text-sm text-white/90 mb-2">
                <strong>Ready to go!</strong>
              </p>
              <p className="text-sm text-white/60">
                We'll now filter housing and jobs around what you told us. You can change this anytime in your profile settings.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-white/5 flex gap-3">
        {step > 1 && (
          <Button
            onClick={handleBack}
            variant="outline"
            className="border-white/20 hover:bg-white/5"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        )}
        <Button
          onClick={handleNext}
          className="flex-1 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
        >
          {step === totalSteps ? 'Complete Profile' : 'Continue'}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
