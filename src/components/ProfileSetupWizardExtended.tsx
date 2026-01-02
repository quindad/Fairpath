import { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, User, FileText, Briefcase, Home, Settings, Save, Clock, Heart, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Textarea } from './ui/textarea';

interface ProfileSetupWizardExtendedProps {
  onComplete: (profile: UserProfile) => void;
  onSaveProgress?: (profile: Partial<UserProfile>, currentStep: number) => void;
  savedProfile?: Partial<UserProfile>;
  savedStep?: number;
}

export interface UserProfile {
  // Section A - Personal Info
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  
  // Section B - Justice System History (WOTC Triggers)
  hasConviction: boolean;
  convictions: {
    type: string;
    yearOfConviction: string;
    releaseYear: string;
  }[];
  releasedInLast12Months: boolean; // WOTC Category: "Ex-Felon"
  completedReentryProgram: boolean; // WOTC trigger
  reentryProgramName?: string;
  onSupervision: boolean; // Probation/parole
  supervisionType?: string;
  receivingSNAP: boolean; // WOTC Category: "SNAP Recipient"
  
  // Section C - Employment History (Extended)
  workHistory: {
    jobTitle: string;
    company: string;
    yearsWorked: string;
  }[];
  skills: string;
  certifications: string;
  education: string;
  desiredJobFields: string[];
  
  // Section D - Housing Status (Expanded)
  currentHousingStatus: string;
  housingDetails?: string;
  monthlyIncome: string;
  incomeSource?: string;
  hasChildren: boolean;
  numberOfChildren?: number;
  
  // Section E - Resource Needs
  needsHousing: boolean;
  needsJob: boolean;
  needsMentalHealth: boolean;
  needsSubstanceAbuse: boolean;
  needsIDSupport: boolean;
  needsTransportation: boolean;
  needsLegalHelp: boolean;
  otherNeeds?: string;
  
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
  'Halfway house',
  'Reentry program',
  'Temporary housing',
  'Transitional housing',
  'Other'
];

export default function ProfileSetupWizardExtended({ 
  onComplete, 
  onSaveProgress,
  savedProfile,
  savedStep 
}: ProfileSetupWizardExtendedProps) {
  const [step, setStep] = useState(savedStep || 1);
  const [profile, setProfile] = useState<Partial<UserProfile>>(savedProfile || {
    convictions: [],
    workHistory: [],
    desiredJobFields: [],
    lookingFor: [],
    hasConviction: false,
    releasedInLast12Months: false,
    completedReentryProgram: false,
    onSupervision: false,
    receivingSNAP: false,
    willingToRelocate: false,
    hasChildren: false,
    needsHousing: false,
    needsJob: false,
    needsMentalHealth: false,
    needsSubstanceAbuse: false,
    needsIDSupport: false,
    needsTransportation: false,
    needsLegalHelp: false,
  });

  const totalSteps = 8; // Extended from 5 to 8 steps

  // Auto-save every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (onSaveProgress) {
        onSaveProgress(profile, step);
      }
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [profile, step, onSaveProgress]);

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      if (onSaveProgress) {
        onSaveProgress(profile, step + 1);
      }
    } else {
      onComplete(profile as UserProfile);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSaveAndExit = () => {
    if (onSaveProgress) {
      onSaveProgress(profile, step);
      // Show toast notification
      alert('Progress saved! You can continue later from your dashboard.');
    }
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

  const addWorkHistory = () => {
    setProfile({
      ...profile,
      workHistory: [
        ...(profile.workHistory || []),
        { jobTitle: '', company: '', yearsWorked: '' }
      ]
    });
  };

  const updateWorkHistory = (index: number, field: string, value: string) => {
    const updated = [...(profile.workHistory || [])];
    updated[index] = { ...updated[index], [field]: value };
    setProfile({ ...profile, workHistory: updated });
  };

  const removeWorkHistory = (index: number) => {
    const updated = [...(profile.workHistory || [])];
    updated.splice(index, 1);
    setProfile({ ...profile, workHistory: updated });
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

  const percentComplete = Math.round((step / totalSteps) * 100);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs tracking-widest text-[#A8F32C]">
            PROFILE SETUP
          </div>
          <button
            onClick={handleSaveAndExit}
            className="flex items-center gap-2 text-xs text-white/60 hover:text-[#A8F32C] transition-colors"
          >
            <Save className="h-4 w-4" />
            Save & Finish Later
          </button>
        </div>
        <h1 className="text-2xl mb-2">Complete Your Profile</h1>
        <p className="text-sm text-white/60 mb-4">
          Step {step} of {totalSteps} • {percentComplete}% complete
        </p>
        
        {/* Progress bar */}
        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#A8F32C] transition-all duration-300"
            style={{ width: `${percentComplete}%` }}
          />
        </div>
      </div>

      {/* WOTC Explanation Banner */}
      {step === 1 && (
        <div className="mx-6 mt-4 bg-gradient-to-br from-[#A8F32C]/10 via-transparent to-transparent rounded-xl p-1">
          <div className="bg-[#121212] rounded-xl p-4 border border-[#A8F32C]/20">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-[#A8F32C] mb-1">Why we ask these questions</p>
                <p className="text-xs text-white/60">
                  We ask these questions to match you with the right jobs, tax credit programs (WOTC), and resources. 
                  The more questions you answer, the better we can help you. Your information stays private and secure.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* STEP 1: Personal Info */}
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

            <div>
              <Label htmlFor="dob">Date of Birth</Label>
              <Input
                id="dob"
                type="date"
                value={profile.dateOfBirth || ''}
                onChange={(e) => setProfile({ ...profile, dateOfBirth: e.target.value })}
                className="bg-[#121212] border-white/10 text-white h-12"
                required
              />
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
                  placeholder="OH"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="zipCode">Zip Code</Label>
              <Input
                id="zipCode"
                value={profile.zipCode || ''}
                onChange={(e) => setProfile({ ...profile, zipCode: e.target.value })}
                className="bg-[#121212] border-white/10 text-white h-12"
                placeholder="44101"
                required
              />
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

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={profile.email || ''}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="bg-[#121212] border-white/10 text-white h-12"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>
        )}

        {/* STEP 2: Justice System History - WOTC TRIGGERS */}
        {step === 2 && (
          <div className="space-y-5 max-w-md mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#A8F32C]/10 rounded-xl flex items-center justify-center">
                <FileText className="h-6 w-6 text-[#A8F32C]" />
              </div>
              <div>
                <h2 className="text-xl">Justice System History</h2>
                <p className="text-sm text-white/60">Unlock employer tax credits</p>
              </div>
            </div>

            <div className="bg-[#A8F32C]/5 border border-[#A8F32C]/20 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-[#A8F32C] mb-1">WOTC Tax Credits</p>
                  <p className="text-xs text-white/60">
                    These answers help employers qualify for federal tax credits (up to $9,600 per hire) when they hire you. 
                    This makes you MORE attractive to employers. Your details stay private.
                  </p>
                </div>
              </div>
            </div>

            {/* Key WOTC Question */}
            <div className="bg-[#121212] border border-white/5 rounded-xl p-4">
              <Label className="mb-3 block">Have you been convicted of a felony?</Label>
              <div className="flex gap-3">
                <button
                  onClick={() => setProfile({ ...profile, hasConviction: true })}
                  className={`flex-1 py-3 px-4 rounded-lg border transition-all ${
                    profile.hasConviction
                      ? 'bg-[#A8F32C] border-[#A8F32C] text-black'
                      : 'bg-black border-white/10 hover:border-white/20'
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => setProfile({ ...profile, hasConviction: false })}
                  className={`flex-1 py-3 px-4 rounded-lg border transition-all ${
                    profile.hasConviction === false
                      ? 'bg-[#A8F32C] border-[#A8F32C] text-black'
                      : 'bg-black border-white/10 hover:border-white/20'
                  }`}
                >
                  No
                </button>
              </div>
            </div>

            {profile.hasConviction && (
              <>
                {/* WOTC: Released in last 12 months */}
                <div className="bg-[#121212] border border-white/5 rounded-xl p-4">
                  <Label className="mb-2 block">
                    Were you released from incarceration or supervision in the last 12 months?
                  </Label>
                  <p className="text-xs text-white/40 mb-3">
                    ⭐ Triggers WOTC "Ex-Felon" category (up to $2,400 tax credit)
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setProfile({ ...profile, releasedInLast12Months: true })}
                      className={`flex-1 py-3 px-4 rounded-lg border transition-all ${
                        profile.releasedInLast12Months
                          ? 'bg-[#A8F32C] border-[#A8F32C] text-black'
                          : 'bg-black border-white/10 hover:border-white/20'
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setProfile({ ...profile, releasedInLast12Months: false })}
                      className={`flex-1 py-3 px-4 rounded-lg border transition-all ${
                        profile.releasedInLast12Months === false
                          ? 'bg-[#A8F32C] border-[#A8F32C] text-black'
                          : 'bg-black border-white/10 hover:border-white/20'
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>

                {/* Conviction details */}
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

                {/* WOTC: Reentry program */}
                <div className="bg-[#121212] border border-white/5 rounded-xl p-4">
                  <Label className="mb-2 block">
                    Did you complete a work program, halfway house, or reentry program?
                  </Label>
                  <p className="text-xs text-white/40 mb-3">
                    ⭐ Triggers additional WOTC categories
                  </p>
                  <div className="flex gap-3 mb-3">
                    <button
                      onClick={() => setProfile({ ...profile, completedReentryProgram: true })}
                      className={`flex-1 py-3 px-4 rounded-lg border transition-all ${
                        profile.completedReentryProgram
                          ? 'bg-[#A8F32C] border-[#A8F32C] text-black'
                          : 'bg-black border-white/10 hover:border-white/20'
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setProfile({ ...profile, completedReentryProgram: false })}
                      className={`flex-1 py-3 px-4 rounded-lg border transition-all ${
                        profile.completedReentryProgram === false
                          ? 'bg-[#A8F32C] border-[#A8F32C] text-black'
                          : 'bg-black border-white/10 hover:border-white/20'
                      }`}
                    >
                      No
                    </button>
                  </div>

                  {profile.completedReentryProgram && (
                    <div>
                      <Label>Program Name (Optional)</Label>
                      <Input
                        value={profile.reentryProgramName || ''}
                        onChange={(e) => setProfile({ ...profile, reentryProgramName: e.target.value })}
                        className="bg-black border-white/10 text-white h-10"
                        placeholder="e.g., Fresh Start Halfway House"
                      />
                    </div>
                  )}
                </div>

                {/* Supervision status */}
                <div className="bg-[#121212] border border-white/5 rounded-xl p-4">
                  <Label className="mb-3 block">Are you currently on probation or parole?</Label>
                  <div className="flex gap-3 mb-3">
                    <button
                      onClick={() => setProfile({ ...profile, onSupervision: true })}
                      className={`flex-1 py-3 px-4 rounded-lg border transition-all ${
                        profile.onSupervision
                          ? 'bg-[#A8F32C] border-[#A8F32C] text-black'
                          : 'bg-black border-white/10 hover:border-white/20'
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setProfile({ ...profile, onSupervision: false })}
                      className={`flex-1 py-3 px-4 rounded-lg border transition-all ${
                        profile.onSupervision === false
                          ? 'bg-[#A8F32C] border-[#A8F32C] text-black'
                          : 'bg-black border-white/10 hover:border-white/20'
                      }`}
                    >
                      No
                    </button>
                  </div>

                  {profile.onSupervision && (
                    <div>
                      <Label>Type</Label>
                      <select
                        value={profile.supervisionType || ''}
                        onChange={(e) => setProfile({ ...profile, supervisionType: e.target.value })}
                        className="w-full h-10 bg-black border border-white/10 rounded-lg px-3 text-white"
                      >
                        <option value="">Select type</option>
                        <option value="probation">Probation</option>
                        <option value="parole">Parole</option>
                        <option value="community-control">Community Control</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* WOTC: SNAP benefits */}
            <div className="bg-[#121212] border border-white/5 rounded-xl p-4">
              <Label className="mb-2 block">
                Are you currently receiving SNAP (Food Stamps)?
              </Label>
              <p className="text-xs text-white/40 mb-3">
                ⭐ Triggers WOTC "SNAP Recipient" category (up to $2,400 tax credit)
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setProfile({ ...profile, receivingSNAP: true })}
                  className={`flex-1 py-3 px-4 rounded-lg border transition-all ${
                    profile.receivingSNAP
                      ? 'bg-[#A8F32C] border-[#A8F32C] text-black'
                      : 'bg-black border-white/10 hover:border-white/20'
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => setProfile({ ...profile, receivingSNAP: false })}
                  className={`flex-1 py-3 px-4 rounded-lg border transition-all ${
                    profile.receivingSNAP === false
                      ? 'bg-[#A8F32C] border-[#A8F32C] text-black'
                      : 'bg-black border-white/10 hover:border-white/20'
                  }`}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Employment History (Extended) */}
        {step === 3 && (
          <div className="space-y-5 max-w-md mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#A8F32C]/10 rounded-xl flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-[#A8F32C]" />
              </div>
              <div>
                <h2 className="text-xl">Employment History</h2>
                <p className="text-sm text-white/60">Your work experience</p>
              </div>
            </div>

            <div className="bg-[#121212] border border-white/5 rounded-xl p-4">
              <p className="text-sm text-white/60">
                Add your last 3 jobs (or as many as you can remember). This helps us match you with the right opportunities.
              </p>
            </div>

            {(profile.workHistory || []).map((work, index) => (
              <div key={index} className="bg-[#121212] border border-white/5 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Job {index + 1}</Label>
                  <button
                    onClick={() => removeWorkHistory(index)}
                    className="text-xs text-red-500 hover:text-red-400"
                  >
                    Remove
                  </button>
                </div>

                <div>
                  <Label>Job Title</Label>
                  <Input
                    value={work.jobTitle}
                    onChange={(e) => updateWorkHistory(index, 'jobTitle', e.target.value)}
                    className="bg-black border-white/10 text-white h-10"
                    placeholder="Warehouse Worker"
                  />
                </div>

                <div>
                  <Label>Company</Label>
                  <Input
                    value={work.company}
                    onChange={(e) => updateWorkHistory(index, 'company', e.target.value)}
                    className="bg-black border-white/10 text-white h-10"
                    placeholder="ABC Logistics"
                  />
                </div>

                <div>
                  <Label>Years Worked</Label>
                  <Input
                    value={work.yearsWorked}
                    onChange={(e) => updateWorkHistory(index, 'yearsWorked', e.target.value)}
                    className="bg-black border-white/10 text-white h-10"
                    placeholder="2 years"
                  />
                </div>
              </div>
            ))}

            <Button
              onClick={addWorkHistory}
              variant="outline"
              className="w-full border-white/20 hover:bg-white/5"
            >
              + Add Job
            </Button>

            <div>
              <Label htmlFor="skills">Skills & Abilities</Label>
              <Textarea
                id="skills"
                value={profile.skills || ''}
                onChange={(e) => setProfile({ ...profile, skills: e.target.value })}
                className="bg-[#121212] border-white/10 text-white min-h-[80px]"
                placeholder="Forklift certified, welding, customer service, bilingual, etc."
              />
            </div>

            <div>
              <Label htmlFor="certifications">Certifications & Licenses</Label>
              <Input
                id="certifications"
                value={profile.certifications || ''}
                onChange={(e) => setProfile({ ...profile, certifications: e.target.value })}
                className="bg-[#121212] border-white/10 text-white h-12"
                placeholder="CDL, forklift license, ServSafe, etc."
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

        {/* STEP 4: Housing Status (Expanded) */}
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
              <Label htmlFor="housingDetails">Additional Details (Optional)</Label>
              <Textarea
                id="housingDetails"
                value={profile.housingDetails || ''}
                onChange={(e) => setProfile({ ...profile, housingDetails: e.target.value })}
                className="bg-[#121212] border-white/10 text-white min-h-[80px]"
                placeholder="Any additional information about your housing situation..."
              />
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

            <div>
              <Label htmlFor="incomeSource">Primary Income Source (Optional)</Label>
              <Input
                id="incomeSource"
                value={profile.incomeSource || ''}
                onChange={(e) => setProfile({ ...profile, incomeSource: e.target.value })}
                className="bg-[#121212] border-white/10 text-white h-12"
                placeholder="Employment, SSI, SSDI, unemployment, etc."
              />
            </div>

            <div className="bg-[#121212] border border-white/5 rounded-xl p-4">
              <Label className="mb-3 block">Do you have children?</Label>
              <div className="flex gap-3 mb-3">
                <button
                  onClick={() => setProfile({ ...profile, hasChildren: true })}
                  className={`flex-1 py-3 px-4 rounded-lg border transition-all ${
                    profile.hasChildren
                      ? 'bg-[#A8F32C] border-[#A8F32C] text-black'
                      : 'bg-black border-white/10 hover:border-white/20'
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => setProfile({ ...profile, hasChildren: false })}
                  className={`flex-1 py-3 px-4 rounded-lg border transition-all ${
                    profile.hasChildren === false
                      ? 'bg-[#A8F32C] border-[#A8F32C] text-black'
                      : 'bg-black border-white/10 hover:border-white/20'
                  }`}
                >
                  No
                </button>
              </div>

              {profile.hasChildren && (
                <div>
                  <Label>Number of Children</Label>
                  <Input
                    type="number"
                    value={profile.numberOfChildren || ''}
                    onChange={(e) => setProfile({ ...profile, numberOfChildren: parseInt(e.target.value) })}
                    className="bg-black border-white/10 text-white h-10"
                    placeholder="2"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 5: Resource Needs */}
        {step === 5 && (
          <div className="space-y-5 max-w-md mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#A8F32C]/10 rounded-xl flex items-center justify-center">
                <Heart className="h-6 w-6 text-[#A8F32C]" />
              </div>
              <div>
                <h2 className="text-xl">What Do You Need?</h2>
                <p className="text-sm text-white/60">Connect with resources & support</p>
              </div>
            </div>

            <div className="bg-[#121212] border border-white/5 rounded-xl p-4">
              <p className="text-sm text-white/60">
                Select all that apply. We'll connect you with community partners and resources that can help.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 bg-[#121212] border border-white/5 rounded-xl p-4">
                <Checkbox
                  id="needsHousing"
                  checked={profile.needsHousing}
                  onCheckedChange={(checked) => setProfile({ ...profile, needsHousing: checked as boolean })}
                  className="border-white/20 data-[state=checked]:bg-[#A8F32C] data-[state=checked]:border-[#A8F32C]"
                />
                <label htmlFor="needsHousing" className="flex-1 text-sm">
                  <div className="text-white">Housing Assistance</div>
                  <div className="text-xs text-white/60">Emergency shelter, transitional housing, rent help</div>
                </label>
              </div>

              <div className="flex items-center gap-3 bg-[#121212] border border-white/5 rounded-xl p-4">
                <Checkbox
                  id="needsJob"
                  checked={profile.needsJob}
                  onCheckedChange={(checked) => setProfile({ ...profile, needsJob: checked as boolean })}
                  className="border-white/20 data-[state=checked]:bg-[#A8F32C] data-[state=checked]:border-[#A8F32C]"
                />
                <label htmlFor="needsJob" className="flex-1 text-sm">
                  <div className="text-white">Employment Support</div>
                  <div className="text-xs text-white/60">Job training, resume help, interview prep</div>
                </label>
              </div>

              <div className="flex items-center gap-3 bg-[#121212] border border-white/5 rounded-xl p-4">
                <Checkbox
                  id="needsMentalHealth"
                  checked={profile.needsMentalHealth}
                  onCheckedChange={(checked) => setProfile({ ...profile, needsMentalHealth: checked as boolean })}
                  className="border-white/20 data-[state=checked]:bg-[#A8F32C] data-[state=checked]:border-[#A8F32C]"
                />
                <label htmlFor="needsMentalHealth" className="flex-1 text-sm">
                  <div className="text-white">Mental Health Services</div>
                  <div className="text-xs text-white/60">Counseling, therapy, support groups</div>
                </label>
              </div>

              <div className="flex items-center gap-3 bg-[#121212] border border-white/5 rounded-xl p-4">
                <Checkbox
                  id="needsSubstanceAbuse"
                  checked={profile.needsSubstanceAbuse}
                  onCheckedChange={(checked) => setProfile({ ...profile, needsSubstanceAbuse: checked as boolean })}
                  className="border-white/20 data-[state=checked]:bg-[#A8F32C] data-[state=checked]:border-[#A8F32C]"
                />
                <label htmlFor="needsSubstanceAbuse" className="flex-1 text-sm">
                  <div className="text-white">Substance Abuse Treatment</div>
                  <div className="text-xs text-white/60">Recovery programs, outpatient services, support</div>
                </label>
              </div>

              <div className="flex items-center gap-3 bg-[#121212] border border-white/5 rounded-xl p-4">
                <Checkbox
                  id="needsIDSupport"
                  checked={profile.needsIDSupport}
                  onCheckedChange={(checked) => setProfile({ ...profile, needsIDSupport: checked as boolean })}
                  className="border-white/20 data-[state=checked]:bg-[#A8F32C] data-[state=checked]:border-[#A8F32C]"
                />
                <label htmlFor="needsIDSupport" className="flex-1 text-sm">
                  <div className="text-white">ID & Document Support</div>
                  <div className="text-xs text-white/60">Birth certificate, state ID, social security card</div>
                </label>
              </div>

              <div className="flex items-center gap-3 bg-[#121212] border border-white/5 rounded-xl p-4">
                <Checkbox
                  id="needsTransportation"
                  checked={profile.needsTransportation}
                  onCheckedChange={(checked) => setProfile({ ...profile, needsTransportation: checked as boolean })}
                  className="border-white/20 data-[state=checked]:bg-[#A8F32C] data-[state=checked]:border-[#A8F32C]"
                />
                <label htmlFor="needsTransportation" className="flex-1 text-sm">
                  <div className="text-white">Transportation</div>
                  <div className="text-xs text-white/60">Bus passes, car help, rides to work/appointments</div>
                </label>
              </div>

              <div className="flex items-center gap-3 bg-[#121212] border border-white/5 rounded-xl p-4">
                <Checkbox
                  id="needsLegalHelp"
                  checked={profile.needsLegalHelp}
                  onCheckedChange={(checked) => setProfile({ ...profile, needsLegalHelp: checked as boolean })}
                  className="border-white/20 data-[state=checked]:bg-[#A8F32C] data-[state=checked]:border-[#A8F32C]"
                />
                <label htmlFor="needsLegalHelp" className="flex-1 text-sm">
                  <div className="text-white">Legal Assistance</div>
                  <div className="text-xs text-white/60">Expungement, record sealing, legal aid</div>
                </label>
              </div>
            </div>

            <div>
              <Label htmlFor="otherNeeds">Other Needs (Optional)</Label>
              <Textarea
                id="otherNeeds"
                value={profile.otherNeeds || ''}
                onChange={(e) => setProfile({ ...profile, otherNeeds: e.target.value })}
                className="bg-[#121212] border-white/10 text-white min-h-[80px]"
                placeholder="Food assistance, childcare, medical care, etc."
              />
            </div>
          </div>
        )}

        {/* STEP 6-8: Preferences & Final Steps */}
        {step === 6 && (
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
                <strong>Almost there!</strong>
              </p>
              <p className="text-sm text-white/60">
                Just a couple more quick questions and you're all set. We'll use this to personalize your experience.
              </p>
            </div>
          </div>
        )}

        {/* STEP 7: Review WOTC Eligibility */}
        {step === 7 && (
          <div className="space-y-5 max-w-md mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#A8F32C]/10 rounded-xl flex items-center justify-center">
                <Shield className="h-6 w-6 text-[#A8F32C]" />
              </div>
              <div>
                <h2 className="text-xl">Your Tax Credit Value</h2>
                <p className="text-sm text-white/60">How employers benefit from hiring you</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#A8F32C]/10 via-transparent to-transparent rounded-2xl p-1">
              <div className="bg-[#121212] rounded-2xl p-6 border border-[#A8F32C]/20">
                <div className="text-center mb-6">
                  <div className="text-5xl mb-2">💰</div>
                  <div className="text-3xl text-[#A8F32C] mb-2">
                    {profile.releasedInLast12Months ? '$2,400' : profile.receivingSNAP ? '$2,400' : '$0'}
                  </div>
                  <div className="text-sm text-white/60">
                    Potential WOTC tax credit value
                  </div>
                </div>

                <div className="space-y-3">
                  {profile.releasedInLast12Months && (
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-[#A8F32C] rounded-full" />
                      <span className="text-white/80">Ex-Felon category (released within 12 months)</span>
                    </div>
                  )}
                  {profile.receivingSNAP && (
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-[#A8F32C] rounded-full" />
                      <span className="text-white/80">SNAP Recipient category</span>
                    </div>
                  )}
                  {profile.completedReentryProgram && (
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-[#A8F32C] rounded-full" />
                      <span className="text-white/80">Completed reentry program</span>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="text-xs text-white/60">
                    This makes you MORE attractive to employers. When they hire you, they can claim these federal tax credits. 
                    FairPath+ helps connect you with employers who value these credits.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#121212] border border-white/5 rounded-xl p-4">
              <p className="text-sm text-white/80 mb-3">
                <strong>What this means for you:</strong>
              </p>
              <ul className="space-y-2 text-xs text-white/60">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#A8F32C] rounded-full flex-shrink-0 mt-1.5" />
                  <span>Employers are incentivized to hire you</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#A8F32C] rounded-full flex-shrink-0 mt-1.5" />
                  <span>FairPath Staffing prioritizes WOTC-eligible candidates</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#A8F32C] rounded-full flex-shrink-0 mt-1.5" />
                  <span>Your profile is automatically matched with WOTC-friendly employers</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* STEP 8: Final Review */}
        {step === 8 && (
          <div className="space-y-5 max-w-md mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#A8F32C]/10 rounded-xl flex items-center justify-center">
                <Settings className="h-6 w-6 text-[#A8F32C]" />
              </div>
              <div>
                <h2 className="text-xl">You're All Set!</h2>
                <p className="text-sm text-white/60">Ready to start your journey</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#A8F32C]/10 via-transparent to-transparent rounded-2xl p-1">
              <div className="bg-[#121212] rounded-2xl p-6 border border-[#A8F32C]/20">
                <div className="text-center mb-6">
                  <div className="text-5xl mb-3">🎉</div>
                  <h3 className="text-xl mb-2">Profile Complete!</h3>
                  <p className="text-sm text-white/60">
                    We're ready to connect you with opportunities
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between py-3 border-b border-white/5">
                    <span className="text-sm text-white/60">Personal Info</span>
                    <span className="text-sm text-[#A8F32C]">✓</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-white/5">
                    <span className="text-sm text-white/60">Justice History (WOTC)</span>
                    <span className="text-sm text-[#A8F32C]">✓</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-white/5">
                    <span className="text-sm text-white/60">Work Experience</span>
                    <span className="text-sm text-[#A8F32C]">✓</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-white/5">
                    <span className="text-sm text-white/60">Housing Status</span>
                    <span className="text-sm text-[#A8F32C]">✓</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-sm text-white/60">Resource Needs</span>
                    <span className="text-sm text-[#A8F32C]">✓</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#121212] border border-white/5 rounded-xl p-4">
              <p className="text-sm text-white/80 mb-3">
                <strong>What happens next:</strong>
              </p>
              <ul className="space-y-2 text-xs text-white/60">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#A8F32C] rounded-full flex-shrink-0 mt-1.5" />
                  <span>Browse felony-friendly housing and jobs tailored to your record</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#A8F32C] rounded-full flex-shrink-0 mt-1.5" />
                  <span>Get matched with community resources based on your needs</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#A8F32C] rounded-full flex-shrink-0 mt-1.5" />
                  <span>Consider FairPath+ ($2/mo) for exclusive staffing jobs and discounts</span>
                </li>
              </ul>
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
