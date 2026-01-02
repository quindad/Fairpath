import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, User, MapPin, Calendar, Shield, Briefcase } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { useAuth } from '../../contexts/AuthContext';
import Logo from '../common/Logo';

interface UserOnboardingProps {
  userType: 'user' | 'employer' | 'property' | 'donor' | 'customer' | 'provider';
  onComplete: (userData: any) => void;
  onBack?: () => void;
}

export default function UserOnboarding({ userType, onComplete, onBack }: UserOnboardingProps) {
  const { user, updateUser } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    city: '',
    state: '',
    zipCode: '',
    // Felon-specific fields
    convictionType: '',
    convictionDate: '',
    releaseDate: '',
    currentlyIncarcerated: false,
    // Employer-specific fields
    companyName: '',
    industry: '',
    // Property owner-specific fields
    numberOfUnits: '',
    // Donor-specific fields
    donorType: 'individual',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // All user types now have 3 steps
  const totalSteps = 3;

  const updateField = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
    setError('');
  };

  const validateStep = () => {
    if (step === 1) {
      if (!formData.firstName || !formData.lastName) {
        setError('Please enter your full name');
        return false;
      }
    }
    if (step === 2) {
      if (!formData.city || !formData.state || !formData.zipCode) {
        setError('Please enter your location');
        return false;
      }
    }
    if (step === 3) {
      if (userType === 'user') {
        // Felon-specific validation
        if (!formData.convictionType) {
          setError('Please select a conviction type');
          return false;
        }
      }
      if (userType === 'employer') {
        if (!formData.companyName) {
          setError('Please enter your company name');
          return false;
        }
      }
      if (userType === 'property') {
        if (!formData.numberOfUnits) {
          setError('Please enter number of units');
          return false;
        }
      }
    }
    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = async () => {
    if (!validateStep()) return;

    setLoading(true);
    setError('');

    try {
      // Update user metadata in Supabase
      const result = await updateUser({
        user_metadata: {
          ...formData,
          userType,
          onboardingComplete: true,
        },
      });

      if (result.success) {
        console.log('✅ Onboarding complete');
        onComplete({
          ...formData,
          userType,
          userId: user?.id,
        });
      } else {
        setError(result.error || 'Failed to save profile. Please try again.');
      }
    } catch (err: any) {
      console.error('❌ Onboarding error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Step 1: Basic Info
  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-2">Welcome! Let's get started</h2>
        <p className="text-white/60">First, tell us your name</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-white/60 mb-2">First Name</label>
          <Input
            type="text"
            placeholder="John"
            value={formData.firstName}
            onChange={(e) => updateField('firstName', e.target.value)}
            className="bg-black/50 border-white/20 text-white"
            autoFocus
          />
        </div>

        <div>
          <label className="block text-sm text-white/60 mb-2">Last Name</label>
          <Input
            type="text"
            placeholder="Doe"
            value={formData.lastName}
            onChange={(e) => updateField('lastName', e.target.value)}
            className="bg-black/50 border-white/20 text-white"
          />
        </div>

        <div>
          <label className="block text-sm text-white/60 mb-2">
            Email (Optional)
          </label>
          <Input
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) => updateField('email', e.target.value)}
            className="bg-black/50 border-white/20 text-white"
          />
          <p className="text-xs text-white/40 mt-1">
            We'll use this to send you important updates
          </p>
        </div>
      </div>
    </div>
  );

  // Step 2: Location
  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-2">Where are you located?</h2>
        <p className="text-white/60">This helps us show you local opportunities</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-white/60 mb-2">City</label>
          <Input
            type="text"
            placeholder="Los Angeles"
            value={formData.city}
            onChange={(e) => updateField('city', e.target.value)}
            className="bg-black/50 border-white/20 text-white"
            autoFocus
          />
        </div>

        <div>
          <label className="block text-sm text-white/60 mb-2">State</label>
          <Input
            type="text"
            placeholder="CA"
            value={formData.state}
            onChange={(e) => updateField('state', e.target.value.toUpperCase())}
            className="bg-black/50 border-white/20 text-white"
            maxLength={2}
          />
        </div>

        <div>
          <label className="block text-sm text-white/60 mb-2">ZIP Code</label>
          <Input
            type="text"
            inputMode="numeric"
            placeholder="90001"
            value={formData.zipCode}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '');
              if (value.length <= 5) {
                updateField('zipCode', value);
              }
            }}
            className="bg-black/50 border-white/20 text-white"
            maxLength={5}
          />
        </div>
      </div>
    </div>
  );

  // Step 3: Felon-specific info
  const renderStep3Felon = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-2">Background information</h2>
        <p className="text-white/60">
          This helps us match you with felon-friendly opportunities
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-white/60 mb-2">
            Conviction Type
          </label>
          <select
            value={formData.convictionType}
            onChange={(e) => updateField('convictionType', e.target.value)}
            className="w-full bg-black/50 border border-white/20 text-white rounded-lg px-3 py-2"
          >
            <option value="">Select type</option>
            <option value="felony">Felony</option>
            <option value="misdemeanor">Misdemeanor</option>
            <option value="other">Other</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-white/60 mb-2">
            Conviction Date (Optional)
          </label>
          <Input
            type="date"
            value={formData.convictionDate}
            onChange={(e) => updateField('convictionDate', e.target.value)}
            className="bg-black/50 border-white/20 text-white"
          />
        </div>

        <div>
          <label className="block text-sm text-white/60 mb-2">
            Release Date (Optional)
          </label>
          <Input
            type="date"
            value={formData.releaseDate}
            onChange={(e) => updateField('releaseDate', e.target.value)}
            className="bg-black/50 border-white/20 text-white"
          />
        </div>

        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <p className="text-sm text-blue-400">
            🔒 Your information is private and encrypted. We only use it to match you with opportunities that accept your background.
          </p>
        </div>
      </div>
    </div>
  );

  // Step 3: Employer-specific info
  const renderStep3Employer = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-2">Company Details</h2>
        <p className="text-white/60">Tell us about your organization</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-white/60 mb-2">Company Name</label>
          <Input
            type="text"
            placeholder="Acme Inc."
            value={formData.companyName}
            onChange={(e) => updateField('companyName', e.target.value)}
            className="bg-black/50 border-white/20 text-white"
            autoFocus
          />
        </div>

        <div>
          <label className="block text-sm text-white/60 mb-2">Industry</label>
          <select
            value={formData.industry}
            onChange={(e) => updateField('industry', e.target.value)}
            className="w-full bg-black/50 border border-white/20 text-white rounded-lg px-3 py-2"
          >
            <option value="">Select industry</option>
            <option value="logistics">Logistics / Warehousing</option>
            <option value="construction">Construction</option>
            <option value="hospitality">Hospitality</option>
            <option value="retail">Retail</option>
            <option value="manufacturing">Manufacturing</option>
            <option value="technology">Technology</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
    </div>
  );

  // Step 3: Property Owner-specific info
  const renderStep3Property = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-2">Property Portfolio</h2>
        <p className="text-white/60">Help us understand your rental scale</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-white/60 mb-2">Number of Units</label>
          <Input
            type="number"
            placeholder="5"
            value={formData.numberOfUnits}
            onChange={(e) => updateField('numberOfUnits', e.target.value)}
            className="bg-black/50 border-white/20 text-white"
            autoFocus
          />
        </div>
      </div>
    </div>
  );

  // Step 3: Donor-specific info
  const renderStep3Donor = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-2">Donor Profile</h2>
        <p className="text-white/60">How would you like to contribute?</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-white/60 mb-2">Donor Type</label>
          <select
            value={formData.donorType}
            onChange={(e) => updateField('donorType', e.target.value)}
            className="w-full bg-black/50 border border-white/20 text-white rounded-lg px-3 py-2"
          >
            <option value="individual">Individual</option>
            <option value="organization">Organization / Nonprofit</option>
            <option value="corporate">Corporate Sponsor</option>
          </select>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Logo size="lg" showTagline className="mb-8" />
          {onBack && step === 1 && (
            <Button
              variant="ghost"
              className="text-white/60 hover:text-white mb-6 -ml-3"
              onClick={onBack}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          )}
        </div>

        <Card className="bg-[#121212] border-white/10 p-8">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-2 rounded-full mx-1 ${
                    i + 1 <= step ? 'bg-[#A8F32C]' : 'bg-white/10'
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-white/60">
              Step {step} of {totalSteps}
            </p>
          </div>

          {/* Form Steps */}
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && userType === 'user' && renderStep3Felon()}
          {step === 3 && userType === 'employer' && renderStep3Employer()}
          {step === 3 && userType === 'property' && renderStep3Property()}
          {step === 3 && (userType === 'donor' || userType === 'provider' || userType === 'customer') && renderStep3Donor()}

          {/* Error */}
          {error && (
            <div className="mt-6 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-4 mt-8">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={() => setStep(step - 1)}
                className="flex-1 border-white/20 text-white hover:bg-white/5"
                disabled={loading}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            )}
            <Button
              onClick={handleNext}
              className="flex-1 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
              disabled={loading}
            >
              {loading ? (
                'Saving...'
              ) : step === totalSteps ? (
                <>
                  Complete Setup
                  <Check className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-white/40">
            Verified by phone: {user?.phone}
          </p>
        </div>
      </div>
    </div>
  );
}