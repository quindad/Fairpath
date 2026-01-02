import { useState } from 'react';
import { ArrowRight, ArrowLeft, Save, Info } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Progress } from '../ui/progress';
import LogoFinal from '../common/LogoFinal';
import { User } from 'lucide-react';
import api from '../../utils/api';

interface FelonOnboardingProps {
  onComplete: (data: any) => void;
  onBack: () => void;
}

export default function FelonOnboarding({ onComplete, onBack }: FelonOnboardingProps) {
  const [step, setStep] = useState(1);
  const totalSteps = 8;
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    
    // Step 2: Location
    address: '',
    city: '',
    state: '',
    zipCode: '',
    
    // Step 3: Conviction Info
    hasConviction: '',
    convictionCategory: '',
    convictionDate: '',
    releaseDate: '',
    
    // Step 4: WOTC Questions - Felony
    releasedWithin12Months: '',
    convictedOfFelony: '',
    
    // Step 5: WOTC Questions - Benefits
    receivingSNAP: '',
    receivingSSI: '',
    receivingTANF: '',
    inVocationalRehab: '',
    
    // Step 6: WOTC Questions - Employment
    unemployed27Weeks: '',
    unemployed6Months: '',
    receivingUnemployment: '',
    
    // Step 7: WOTC Questions - Other
    isVeteran: '',
    veteranUnemployed: '',
    age18to39: '',
    livesInEmpowermentZone: '',
    
    // Step 8: Job & Housing Preferences
    lookingForJob: '',
    jobType: [] as string[],
    lookingForHousing: '',
    housingType: [] as string[]
  });

  const handleNext = async () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Final step - save to database
      setSaving(true);
      try {
        // Calculate initial FairPath Score based on answers
        const fairPathScore = calculateInitialScore(formData);
        
        const completeData = {
          ...formData,
          fairPathScore,
          name: `${formData.firstName} ${formData.lastName}`,
        };

        onComplete(completeData);
      } catch (error) {
        console.error('Error completing onboarding:', error);
        alert('Failed to complete setup. Please try again.');
      } finally {
        setSaving(false);
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onBack();
    }
  };

  const handleSaveForLater = async () => {
    setSaving(true);
    try {
      await api.post('/onboarding/save', { step, formData });
      alert('Progress saved! You can continue later from where you left off.');
    } catch (error) {
      console.error('Error saving progress:', error);
      alert('Failed to save progress. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const progress = (step / totalSteps) * 100;

  // Calculate initial FairPath Score
  const calculateInitialScore = (data: typeof formData) => {
    let score = 500; // Base score

    // Positive factors (increase score)
    if (data.releasedWithin12Months === 'yes') score += 50;
    if (data.receivingSNAP === 'yes') score += 30;
    if (data.inVocationalRehab === 'yes') score += 40;
    if (data.isVeteran === 'yes') score += 60;
    if (data.age18to39 === 'yes') score += 20;
    
    // Negative factors (decrease score)
    if (data.convictionCategory === 'violent') score -= 100;
    if (data.convictionCategory === 'sex') score -= 150;
    
    // Time since release (positive factor)
    if (data.releaseDate) {
      const releaseDate = new Date(data.releaseDate);
      const now = new Date();
      const monthsSinceRelease = (now.getTime() - releaseDate.getTime()) / (1000 * 60 * 60 * 24 * 30);
      
      if (monthsSinceRelease > 12) score += 50;
      if (monthsSinceRelease > 24) score += 100;
    }

    // Cap between 0-1000
    return Math.max(0, Math.min(1000, score));
  };

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

        {/* Step 1: Personal Information */}
        {step === 1 && (
          <Card className="bg-[#121212] border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-[#A8F32C]/20 flex items-center justify-center">
                <User className="h-6 w-6 text-[#A8F32C]" />
              </div>
              <div>
                <h2 className="text-2xl text-white">Personal Information</h2>
                <p className="text-white/60">Let's get started</p>
              </div>
            </div>

            {/* Social Sign Up Options */}
            <div className="mb-6">
              <div className="text-sm text-white/60 mb-3 text-center">Quick sign up with:</div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <button
                  type="button"
                  onClick={() => {
                    // Handle Apple Sign In
                    console.log('Apple Sign In');
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-black border-2 border-white rounded-lg hover:bg-white/10 transition-all"
                >
                  <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  <span className="text-white">Sign in with Apple</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    // Handle Google Sign In
                    console.log('Google Sign In');
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-white rounded-lg hover:bg-white/90 transition-all"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-black">Sign in with Google</span>
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-[#121212] text-white/60">or continue with email</span>
                </div>
              </div>
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
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
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
                <div>
                  <Label htmlFor="dateOfBirth" className="text-white mb-2 block">
                    Date of Birth <span className="text-red-500">*</span>
                  </Label>
                  <input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    className="w-full bg-black border border-white/20 rounded-lg px-3 py-2 text-white"
                  />
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Step 2: Location */}
        {step === 2 && (
          <Card className="bg-[#121212] border-white/10 p-8">
            <h2 className="text-2xl mb-2">Where are you located?</h2>
            <p className="text-white/60 mb-6">This helps us show you opportunities near you</p>

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
                    {/* Add more states */}
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

        {/* Step 3: Conviction Info */}
        {step === 3 && (
          <Card className="bg-[#121212] border-white/10 p-8">
            <h2 className="text-2xl mb-2">Background Information</h2>
            <p className="text-white/60 mb-6">
              This information helps us match you with the right opportunities
            </p>

            <div className="space-y-6">
              <div>
                <Label className="text-white mb-3 block">
                  Do you have a conviction history? <span className="text-red-500">*</span>
                </Label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                    <input
                      type="radio"
                      name="hasConviction"
                      value="yes"
                      checked={formData.hasConviction === 'yes'}
                      onChange={(e) => setFormData({ ...formData, hasConviction: e.target.value })}
                    />
                    <span className="text-white">Yes</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                    <input
                      type="radio"
                      name="hasConviction"
                      value="no"
                      checked={formData.hasConviction === 'no'}
                      onChange={(e) => setFormData({ ...formData, hasConviction: e.target.value })}
                    />
                    <span className="text-white">No</span>
                  </label>
                </div>
              </div>

              {formData.hasConviction === 'yes' && (
                <>
                  <div>
                    <Label htmlFor="convictionCategory" className="text-white mb-2 block">
                      Conviction Category <span className="text-red-500">*</span>
                    </Label>
                    <select
                      id="convictionCategory"
                      value={formData.convictionCategory}
                      onChange={(e) => setFormData({ ...formData, convictionCategory: e.target.value })}
                      className="w-full bg-black border border-white/20 rounded-lg px-3 py-2 text-white"
                    >
                      <option value="">Select category...</option>
                      <option value="violent">Violent Crimes</option>
                      <option value="drug">Drug Offenses</option>
                      <option value="property">Property Crimes</option>
                      <option value="financial">Financial Crimes</option>
                      <option value="sex">Sex Offenses</option>
                      <option value="weapons">Weapons Offenses</option>
                      <option value="public-order">Public Order Offenses</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="convictionDate" className="text-white mb-2 block">
                        Conviction Date <span className="text-red-500">*</span>
                      </Label>
                      <input
                        id="convictionDate"
                        type="date"
                        value={formData.convictionDate}
                        onChange={(e) => setFormData({ ...formData, convictionDate: e.target.value })}
                        className="w-full bg-black border border-white/20 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="releaseDate" className="text-white mb-2 block">
                        Release Date <span className="text-red-500">*</span>
                      </Label>
                      <input
                        id="releaseDate"
                        type="date"
                        value={formData.releaseDate}
                        onChange={(e) => setFormData({ ...formData, releaseDate: e.target.value })}
                        className="w-full bg-black border border-white/20 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </Card>
        )}

        {/* Step 4: WOTC - Felony Questions */}
        {step === 4 && (
          <Card className="bg-[#121212] border-white/10 p-8">
            <div className="flex items-start gap-3 mb-6">
              <Info className="h-6 w-6 text-[#A8F32C] flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl mb-2">Help Us Connect You to Better Opportunities</h2>
                <p className="text-white/60">
                  These questions help us match you with FairPath Staffing jobs that can earn employers up to $9,600 in tax credits when they hire you. This makes you MORE attractive to employers!
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {formData.hasConviction === 'yes' && (
                <>
                  <div>
                    <Label className="text-white mb-3 block">
                      Were you released from prison within the last 12 months?
                    </Label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                        <input
                          type="radio"
                          name="releasedWithin12Months"
                          value="yes"
                          checked={formData.releasedWithin12Months === 'yes'}
                          onChange={(e) => setFormData({ ...formData, releasedWithin12Months: e.target.value })}
                        />
                        <span className="text-white">Yes</span>
                      </label>
                      <label className="flex items-center gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                        <input
                          type="radio"
                          name="releasedWithin12Months"
                          value="no"
                          checked={formData.releasedWithin12Months === 'no'}
                          onChange={(e) => setFormData({ ...formData, releasedWithin12Months: e.target.value })}
                        />
                        <span className="text-white">No</span>
                      </label>
                    </div>
                    <p className="text-xs text-white/40 mt-2">
                      If yes, employers can earn $2,400 in tax credits for hiring you
                    </p>
                  </div>

                  <div>
                    <Label className="text-white mb-3 block">
                      Was your conviction a felony?
                    </Label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                        <input
                          type="radio"
                          name="convictedOfFelony"
                          value="yes"
                          checked={formData.convictedOfFelony === 'yes'}
                          onChange={(e) => setFormData({ ...formData, convictedOfFelony: e.target.value })}
                        />
                        <span className="text-white">Yes</span>
                      </label>
                      <label className="flex items-center gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                        <input
                          type="radio"
                          name="convictedOfFelony"
                          value="no"
                          checked={formData.convictedOfFelony === 'no'}
                          onChange={(e) => setFormData({ ...formData, convictedOfFelony: e.target.value })}
                        />
                        <span className="text-white">No</span>
                      </label>
                    </div>
                  </div>
                </>
              )}
            </div>
          </Card>
        )}

        {/* Step 5: WOTC - Benefits Questions */}
        {step === 5 && (
          <Card className="bg-[#121212] border-white/10 p-8">
            <h2 className="text-2xl mb-2">Government Assistance</h2>
            <p className="text-white/60 mb-6">
              Receiving certain benefits can INCREASE your value to employers (up to $9,600 in tax credits!)
            </p>

            <div className="space-y-6">
              <div>
                <Label className="text-white mb-3 block">
                  Are you currently receiving SNAP benefits (food stamps)?
                </Label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                    <input
                      type="radio"
                      name="receivingSNAP"
                      value="yes"
                      checked={formData.receivingSNAP === 'yes'}
                      onChange={(e) => setFormData({ ...formData, receivingSNAP: e.target.value })}
                    />
                    <span className="text-white">Yes</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                    <input
                      type="radio"
                      name="receivingSNAP"
                      value="no"
                      checked={formData.receivingSNAP === 'no'}
                      onChange={(e) => setFormData({ ...formData, receivingSNAP: e.target.value })}
                    />
                    <span className="text-white">No</span>
                  </label>
                </div>
                <p className="text-xs text-[#A8F32C] mt-2">
                  💰 SNAP + Ex-Felon = Up to $9,600 in tax credits over 2 years!
                </p>
              </div>

              <div>
                <Label className="text-white mb-3 block">
                  Are you currently receiving SSI (Supplemental Security Income)?
                </Label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                    <input
                      type="radio"
                      name="receivingSSI"
                      value="yes"
                      checked={formData.receivingSSI === 'yes'}
                      onChange={(e) => setFormData({ ...formData, receivingSSI: e.target.value })}
                    />
                    <span className="text-white">Yes</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                    <input
                      type="radio"
                      name="receivingSSI"
                      value="no"
                      checked={formData.receivingSSI === 'no'}
                      onChange={(e) => setFormData({ ...formData, receivingSSI: e.target.value })}
                    />
                    <span className="text-white">No</span>
                  </label>
                </div>
              </div>

              <div>
                <Label className="text-white mb-3 block">
                  Are you in a state vocational rehabilitation program?
                </Label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                    <input
                      type="radio"
                      name="inVocationalRehab"
                      value="yes"
                      checked={formData.inVocationalRehab === 'yes'}
                      onChange={(e) => setFormData({ ...formData, inVocationalRehab: e.target.value })}
                    />
                    <span className="text-white">Yes</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                    <input
                      type="radio"
                      name="inVocationalRehab"
                      value="no"
                      checked={formData.inVocationalRehab === 'no'}
                      onChange={(e) => setFormData({ ...formData, inVocationalRehab: e.target.value })}
                    />
                    <span className="text-white">No</span>
                  </label>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Step 6: WOTC - Employment Questions */}
        {step === 6 && (
          <Card className="bg-[#121212] border-white/10 p-8">
            <h2 className="text-2xl mb-2">Employment History</h2>
            <p className="text-white/60 mb-6">
              Long-term unemployment can also qualify you for tax credits
            </p>

            <div className="space-y-6">
              <div>
                <Label className="text-white mb-3 block">
                  Have you been unemployed for 27 weeks or more?
                </Label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                    <input
                      type="radio"
                      name="unemployed27Weeks"
                      value="yes"
                      checked={formData.unemployed27Weeks === 'yes'}
                      onChange={(e) => setFormData({ ...formData, unemployed27Weeks: e.target.value })}
                    />
                    <span className="text-white">Yes</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                    <input
                      type="radio"
                      name="unemployed27Weeks"
                      value="no"
                      checked={formData.unemployed27Weeks === 'no'}
                      onChange={(e) => setFormData({ ...formData, unemployed27Weeks: e.target.value })}
                    />
                    <span className="text-white">No</span>
                  </label>
                </div>
                <p className="text-xs text-white/40 mt-2">
                  Long-term unemployment can qualify you for additional tax credits
                </p>
              </div>

              <div>
                <Label className="text-white mb-3 block">
                  Are you currently receiving unemployment benefits?
                </Label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                    <input
                      type="radio"
                      name="receivingUnemployment"
                      value="yes"
                      checked={formData.receivingUnemployment === 'yes'}
                      onChange={(e) => setFormData({ ...formData, receivingUnemployment: e.target.value })}
                    />
                    <span className="text-white">Yes</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                    <input
                      type="radio"
                      name="receivingUnemployment"
                      value="no"
                      checked={formData.receivingUnemployment === 'no'}
                      onChange={(e) => setFormData({ ...formData, receivingUnemployment: e.target.value })}
                    />
                    <span className="text-white">No</span>
                  </label>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Step 7: WOTC - Other Questions */}
        {step === 7 && (
          <Card className="bg-[#121212] border-white/10 p-8">
            <h2 className="text-2xl mb-2">Additional Information</h2>
            <p className="text-white/60 mb-6">
              A few more questions to maximize your opportunities
            </p>

            <div className="space-y-6">
              <div>
                <Label className="text-white mb-3 block">
                  Are you a veteran?
                </Label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                    <input
                      type="radio"
                      name="isVeteran"
                      value="yes"
                      checked={formData.isVeteran === 'yes'}
                      onChange={(e) => setFormData({ ...formData, isVeteran: e.target.value })}
                    />
                    <span className="text-white">Yes</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                    <input
                      type="radio"
                      name="isVeteran"
                      value="no"
                      checked={formData.isVeteran === 'no'}
                      onChange={(e) => setFormData({ ...formData, isVeteran: e.target.value })}
                    />
                    <span className="text-white">No</span>
                  </label>
                </div>
              </div>

              <div>
                <Label className="text-white mb-3 block">
                  Are you between 18-39 years old?
                </Label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                    <input
                      type="radio"
                      name="age18to39"
                      value="yes"
                      checked={formData.age18to39 === 'yes'}
                      onChange={(e) => setFormData({ ...formData, age18to39: e.target.value })}
                    />
                    <span className="text-white">Yes</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                    <input
                      type="radio"
                      name="age18to39"
                      value="no"
                      checked={formData.age18to39 === 'no'}
                      onChange={(e) => setFormData({ ...formData, age18to39: e.target.value })}
                    />
                    <span className="text-white">No</span>
                  </label>
                </div>
              </div>

              <div>
                <Label className="text-white mb-3 block">
                  Do you live in a designated empowerment zone or rural renewal county?
                </Label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                    <input
                      type="radio"
                      name="livesInEmpowermentZone"
                      value="yes"
                      checked={formData.livesInEmpowermentZone === 'yes'}
                      onChange={(e) => setFormData({ ...formData, livesInEmpowermentZone: e.target.value })}
                    />
                    <span className="text-white">Yes</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                    <input
                      type="radio"
                      name="livesInEmpowermentZone"
                      value="no"
                      checked={formData.livesInEmpowermentZone === 'no'}
                      onChange={(e) => setFormData({ ...formData, livesInEmpowermentZone: e.target.value })}
                    />
                    <span className="text-white">No</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                    <input
                      type="radio"
                      name="livesInEmpowermentZone"
                      value="unsure"
                      checked={formData.livesInEmpowermentZone === 'unsure'}
                      onChange={(e) => setFormData({ ...formData, livesInEmpowermentZone: e.target.value })}
                    />
                    <span className="text-white">Not sure</span>
                  </label>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Step 8: Preferences */}
        {step === 8 && (
          <Card className="bg-[#121212] border-white/10 p-8">
            <h2 className="text-2xl mb-2">What are you looking for?</h2>
            <p className="text-white/60 mb-6">
              Tell us what you need so we can show you the right opportunities
            </p>

            <div className="space-y-6">
              <div>
                <Label className="text-white mb-3 block">
                  Are you looking for a job?
                </Label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                    <input
                      type="radio"
                      name="lookingForJob"
                      value="yes"
                      checked={formData.lookingForJob === 'yes'}
                      onChange={(e) => setFormData({ ...formData, lookingForJob: e.target.value })}
                    />
                    <span className="text-white">Yes, I need a job</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                    <input
                      type="radio"
                      name="lookingForJob"
                      value="no"
                      checked={formData.lookingForJob === 'no'}
                      onChange={(e) => setFormData({ ...formData, lookingForJob: e.target.value })}
                    />
                    <span className="text-white">No, I'm currently employed</span>
                  </label>
                </div>
              </div>

              <div>
                <Label className="text-white mb-3 block">
                  Are you looking for housing?
                </Label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                    <input
                      type="radio"
                      name="lookingForHousing"
                      value="yes"
                      checked={formData.lookingForHousing === 'yes'}
                      onChange={(e) => setFormData({ ...formData, lookingForHousing: e.target.value })}
                    />
                    <span className="text-white">Yes, I need housing</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                    <input
                      type="radio"
                      name="lookingForHousing"
                      value="no"
                      checked={formData.lookingForHousing === 'no'}
                      onChange={(e) => setFormData({ ...formData, lookingForHousing: e.target.value })}
                    />
                    <span className="text-white">No, I'm currently housed</span>
                  </label>
                </div>
              </div>
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