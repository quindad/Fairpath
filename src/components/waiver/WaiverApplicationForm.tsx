import { useState } from 'react';
import { Building, Heart, Users, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

interface WaiverApplicationFormProps {
  applicantType: 'employer' | 'property' | 'resource';
  onSubmit?: (data: WaiverFormData) => void;
  onCancel?: () => void;
}

interface WaiverFormData {
  organizationName: string;
  organizationType: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  website: string;
  taxId: string;
  employeeCount?: string;
  annualRevenue?: string;
  propertyCount?: string;
  nonprofitStatus: boolean;
  missionStatement: string;
  secondChanceCommitment: string;
  currentChallenges: string;
  intendedUse: string;
  referenceName?: string;
  referenceContact?: string;
}

export default function WaiverApplicationForm({ applicantType, onSubmit, onCancel }: WaiverApplicationFormProps) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<Partial<WaiverFormData>>({
    nonprofitStatus: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData as WaiverFormData);
    }
    setSubmitted(true);
  };

  const updateField = (field: keyof WaiverFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <div className="max-w-2xl w-full bg-[#121212] rounded-2xl p-8 border border-white/5 text-center">
          <div className="w-16 h-16 bg-[#A8F32C]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-[#A8F32C]" />
          </div>
          <h2 className="text-3xl mb-4">Application Submitted!</h2>
          <p className="text-white/60 mb-6">
            Thank you for applying to the FairPath Waiver Program. Our team will review your application 
            and respond within 3-5 business days.
          </p>
          <p className="text-sm text-white/40 mb-8">
            We'll reach out to <strong>{formData.contactEmail}</strong> with next steps.
          </p>
          {onCancel && (
            <Button 
              onClick={onCancel}
              className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
            >
              Back to Dashboard
            </Button>
          )}
        </div>
      </div>
    );
  }

  const getTitles = () => {
    switch (applicantType) {
      case 'employer':
        return {
          icon: Building,
          title: 'Small Business Waiver Application',
          subtitle: 'For small businesses committed to second-chance hiring'
        };
      case 'property':
        return {
          icon: Building,
          title: 'Property Owner Waiver Application',
          subtitle: 'For affordable housing providers and small landlords'
        };
      case 'resource':
        return {
          icon: Heart,
          title: 'Resource Center Waiver Application',
          subtitle: 'For nonprofits supporting justice-impacted individuals'
        };
      default:
        return {
          icon: Building,
          title: 'Waiver Application',
          subtitle: ''
        };
    }
  };

  const { icon: Icon, title, subtitle } = getTitles();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/5 bg-[#121212] sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 py-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-[#A8F32C]/10 rounded-xl flex items-center justify-center">
              <Icon className="h-6 w-6 text-[#A8F32C]" />
            </div>
            <div className="flex-1">
              <div className="text-xs tracking-widest text-[#A8F32C] mb-1">
                WAIVER PROGRAM
              </div>
              <h1 className="text-2xl">{title}</h1>
            </div>
          </div>
          <p className="text-sm text-white/60">{subtitle}</p>

          {/* Progress */}
          <div className="flex items-center gap-2 mt-6">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex-1 flex items-center gap-2">
                <div className={`h-1 flex-1 rounded-full ${
                  s <= step ? 'bg-[#A8F32C]' : 'bg-white/10'
                }`} />
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-white/40">
            <span>Organization Info</span>
            <span>Mission & Commitment</span>
            <span>Review & Submit</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto px-6 py-8">
        {/* Step 1: Organization Info */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="bg-[#121212] rounded-2xl p-6 border border-white/5">
              <h3 className="text-xl mb-6">Organization Information</h3>

              <div className="space-y-4">
                <div>
                  <Label>Organization Name *</Label>
                  <Input
                    required
                    value={formData.organizationName || ''}
                    onChange={(e) => updateField('organizationName', e.target.value)}
                    className="bg-black border-white/10 text-white"
                    placeholder="Your company or organization name"
                  />
                </div>

                <div>
                  <Label>Organization Type *</Label>
                  <select
                    required
                    value={formData.organizationType || ''}
                    onChange={(e) => updateField('organizationType', e.target.value)}
                    className="w-full h-10 px-3 rounded-lg bg-black border border-white/10 text-white"
                  >
                    <option value="">Select type...</option>
                    {applicantType === 'employer' && (
                      <>
                        <option value="small-business">Small Business (LLC, Corp, etc.)</option>
                        <option value="sole-proprietor">Sole Proprietor</option>
                        <option value="nonprofit">Nonprofit</option>
                        <option value="social-enterprise">Social Enterprise</option>
                      </>
                    )}
                    {applicantType === 'property' && (
                      <>
                        <option value="individual-landlord">Individual Landlord</option>
                        <option value="nonprofit-housing">Nonprofit Housing Provider</option>
                        <option value="transitional-housing">Transitional Housing</option>
                        <option value="community-housing">Community Housing Organization</option>
                      </>
                    )}
                    {applicantType === 'resource' && (
                      <>
                        <option value="nonprofit-501c3">Nonprofit 501(c)(3)</option>
                        <option value="faith-based">Faith-Based Organization</option>
                        <option value="community-center">Community Center</option>
                        <option value="reentry-program">Reentry Program</option>
                        <option value="workforce-development">Workforce Development</option>
                      </>
                    )}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Contact Name *</Label>
                    <Input
                      required
                      value={formData.contactName || ''}
                      onChange={(e) => updateField('contactName', e.target.value)}
                      className="bg-black border-white/10 text-white"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <Label>Contact Email *</Label>
                    <Input
                      required
                      type="email"
                      value={formData.contactEmail || ''}
                      onChange={(e) => updateField('contactEmail', e.target.value)}
                      className="bg-black border-white/10 text-white"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Phone Number *</Label>
                    <Input
                      required
                      type="tel"
                      value={formData.contactPhone || ''}
                      onChange={(e) => updateField('contactPhone', e.target.value)}
                      className="bg-black border-white/10 text-white"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <Label>Website (if applicable)</Label>
                    <Input
                      value={formData.website || ''}
                      onChange={(e) => updateField('website', e.target.value)}
                      className="bg-black border-white/10 text-white"
                      placeholder="www.example.com"
                    />
                  </div>
                </div>

                <div>
                  <Label>Address *</Label>
                  <Input
                    required
                    value={formData.address || ''}
                    onChange={(e) => updateField('address', e.target.value)}
                    className="bg-black border-white/10 text-white"
                    placeholder="Street address, City, State, ZIP"
                  />
                </div>

                <div>
                  <Label>Tax ID / EIN (if applicable)</Label>
                  <Input
                    value={formData.taxId || ''}
                    onChange={(e) => updateField('taxId', e.target.value)}
                    className="bg-black border-white/10 text-white"
                    placeholder="XX-XXXXXXX"
                  />
                </div>

                {applicantType === 'employer' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Number of Employees *</Label>
                      <select
                        required
                        value={formData.employeeCount || ''}
                        onChange={(e) => updateField('employeeCount', e.target.value)}
                        className="w-full h-10 px-3 rounded-lg bg-black border border-white/10 text-white"
                      >
                        <option value="">Select...</option>
                        <option value="1-5">1-5</option>
                        <option value="6-10">6-10</option>
                        <option value="11-25">11-25</option>
                        <option value="26-50">26-50 (may not qualify)</option>
                      </select>
                    </div>
                    <div>
                      <Label>Annual Revenue *</Label>
                      <select
                        required
                        value={formData.annualRevenue || ''}
                        onChange={(e) => updateField('annualRevenue', e.target.value)}
                        className="w-full h-10 px-3 rounded-lg bg-black border border-white/10 text-white"
                      >
                        <option value="">Select...</option>
                        <option value="under-100k">Under $100k</option>
                        <option value="100k-250k">$100k - $250k</option>
                        <option value="250k-500k">$250k - $500k</option>
                        <option value="500k-1m">$500k - $1M</option>
                        <option value="over-1m">Over $1M (may not qualify)</option>
                      </select>
                    </div>
                  </div>
                )}

                {applicantType === 'property' && (
                  <div>
                    <Label>Number of Properties/Units *</Label>
                    <select
                      required
                      value={formData.propertyCount || ''}
                      onChange={(e) => updateField('propertyCount', e.target.value)}
                      className="w-full h-10 px-3 rounded-lg bg-black border border-white/10 text-white"
                    >
                      <option value="">Select...</option>
                      <option value="1">1 property</option>
                      <option value="2-5">2-5 properties</option>
                      <option value="6-10">6-10 properties</option>
                      <option value="11-20">11-20 properties (may not qualify)</option>
                      <option value="over-20">Over 20 properties (may not qualify)</option>
                    </select>
                  </div>
                )}

                <div>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={formData.nonprofitStatus || false}
                      onChange={(e) => updateField('nonprofitStatus', e.target.checked)}
                      className="rounded border-white/20"
                    />
                    <span>This is a registered 501(c)(3) nonprofit organization</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              {onCancel && (
                <Button
                  type="button"
                  onClick={onCancel}
                  variant="outline"
                  className="border-white/20"
                >
                  Cancel
                </Button>
              )}
              <Button
                type="button"
                onClick={() => setStep(2)}
                className="flex-1 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
              >
                Next: Mission & Commitment
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Mission & Commitment */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="bg-[#121212] rounded-2xl p-6 border border-white/5">
              <h3 className="text-xl mb-6">Mission & Commitment to Second Chances</h3>

              <div className="space-y-6">
                <div>
                  <Label>
                    {applicantType === 'resource' 
                      ? 'Organization Mission Statement *'
                      : 'Tell us about your organization *'}
                  </Label>
                  <Textarea
                    required
                    value={formData.missionStatement || ''}
                    onChange={(e) => updateField('missionStatement', e.target.value)}
                    className="bg-black border-white/10 text-white min-h-[100px]"
                    placeholder={
                      applicantType === 'resource'
                        ? 'Describe your mission and the populations you serve...'
                        : 'What does your organization do? What are your values?'
                    }
                  />
                  <div className="text-xs text-white/40 mt-1">
                    {(formData.missionStatement || '').length} / 500 characters
                  </div>
                </div>

                <div>
                  <Label>Why are you committed to second-chance opportunities? *</Label>
                  <Textarea
                    required
                    value={formData.secondChanceCommitment || ''}
                    onChange={(e) => updateField('secondChanceCommitment', e.target.value)}
                    className="bg-black border-white/10 text-white min-h-[120px]"
                    placeholder={
                      applicantType === 'employer'
                        ? 'Share your story. Have you hired justice-impacted individuals before? Why is this important to you?'
                        : applicantType === 'property'
                        ? 'Have you housed individuals with criminal records before? What motivates you to provide fair-chance housing?'
                        : 'How does your organization support justice-impacted individuals? What services do you provide?'
                    }
                  />
                </div>

                <div>
                  <Label>What challenges prevent you from paying for the platform? *</Label>
                  <Textarea
                    required
                    value={formData.currentChallenges || ''}
                    onChange={(e) => updateField('currentChallenges', e.target.value)}
                    className="bg-black border-white/10 text-white min-h-[100px]"
                    placeholder="Be honest about your financial situation. We're here to help organizations doing good work."
                  />
                </div>

                <div>
                  <Label>How will you use the FairPath platform? *</Label>
                  <Textarea
                    required
                    value={formData.intendedUse || ''}
                    onChange={(e) => updateField('intendedUse', e.target.value)}
                    className="bg-black border-white/10 text-white min-h-[100px]"
                    placeholder={
                      applicantType === 'employer'
                        ? 'What positions are you hiring for? How many hires do you anticipate in the next 6-12 months?'
                        : applicantType === 'property'
                        ? 'How many units do you need to fill? What are your property criteria?'
                        : 'What resources/referrals do you plan to share? How many clients do you serve monthly?'
                    }
                  />
                </div>

                {applicantType === 'resource' && (
                  <div className="bg-[#A8F32C]/5 rounded-xl p-4 border border-[#A8F32C]/20">
                    <div className="text-sm mb-3 text-[#A8F32C]">For Resource Centers:</div>
                    <div className="space-y-2 text-sm text-white/80">
                      <p>✓ You'll get free access to post resources & make referrals</p>
                      <p>✓ Your clients can browse jobs & housing</p>
                      <p>✓ You can track outcomes & placements</p>
                      <p>✓ No cost, ever - our mission is to support reentry</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                onClick={() => setStep(1)}
                variant="outline"
                className="border-white/20"
              >
                Back
              </Button>
              <Button
                type="button"
                onClick={() => setStep(3)}
                className="flex-1 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
              >
                Next: Review & Submit
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Review & Submit */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="bg-[#121212] rounded-2xl p-6 border border-white/5">
              <h3 className="text-xl mb-6">Optional: References</h3>
              
              <div className="space-y-4 mb-6">
                <p className="text-sm text-white/60">
                  A reference from a community organization, reentry program, or local leader can strengthen your application (but is not required).
                </p>

                <div>
                  <Label>Reference Name</Label>
                  <Input
                    value={formData.referenceName || ''}
                    onChange={(e) => updateField('referenceName', e.target.value)}
                    className="bg-black border-white/10 text-white"
                    placeholder="Name of person or organization"
                  />
                </div>

                <div>
                  <Label>Reference Contact Info</Label>
                  <Input
                    value={formData.referenceContact || ''}
                    onChange={(e) => updateField('referenceContact', e.target.value)}
                    className="bg-black border-white/10 text-white"
                    placeholder="Email or phone number"
                  />
                </div>
              </div>
            </div>

            <div className="bg-[#121212] rounded-2xl p-6 border border-white/5">
              <h3 className="text-xl mb-6">Review Your Application</h3>

              <div className="space-y-4 text-sm">
                <div>
                  <div className="text-white/40 mb-1">Organization</div>
                  <div>{formData.organizationName}</div>
                </div>

                <div>
                  <div className="text-white/40 mb-1">Contact</div>
                  <div>{formData.contactName} • {formData.contactEmail}</div>
                </div>

                <div>
                  <div className="text-white/40 mb-1">Type</div>
                  <div>{formData.organizationType}</div>
                </div>

                {formData.nonprofitStatus && (
                  <div className="bg-[#A8F32C]/10 rounded-lg p-3 border border-[#A8F32C]/20">
                    <div className="flex items-center gap-2 text-[#A8F32C]">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm">Registered 501(c)(3) Nonprofit</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-[#A8F32C]/5 rounded-xl p-6 border border-[#A8F32C]/20">
              <h4 className="text-sm mb-3 text-[#A8F32C]">What happens next?</h4>
              <ol className="space-y-2 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-[#A8F32C]">1.</span>
                  <span>We'll review your application within 3-5 business days</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#A8F32C]">2.</span>
                  <span>If approved, you'll receive free or discounted access</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#A8F32C]">3.</span>
                  <span>We may reach out for additional information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#A8F32C]">4.</span>
                  <span>Start making a difference in your community!</span>
                </li>
              </ol>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                onClick={() => setStep(2)}
                variant="outline"
                className="border-white/20"
              >
                Back
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90 h-14 text-lg"
              >
                Submit Application
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
