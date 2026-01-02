import { useState } from 'react';
import { ArrowRight, ArrowLeft, Zap, Check, Briefcase, FileText } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Progress } from '../ui/progress';
import { Textarea } from '../ui/textarea';
import LogoFinal from '../common/LogoFinal';

interface EasyApplyFlowProps {
  jobId: string;
  jobTitle: string;
  company: string;
  isFairPathStaffing: boolean;
  onComplete: () => void;
  onBack: () => void;
}

export default function EasyApplyFlow({ 
  jobId, 
  jobTitle, 
  company, 
  isFairPathStaffing, 
  onComplete, 
  onBack 
}: EasyApplyFlowProps) {
  const [step, setStep] = useState(1);
  const totalSteps = isFairPathStaffing ? 4 : 2;
  const [coverLetter, setCoverLetter] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete();
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

        {/* Step 1: Review Profile */}
        {step === 1 && (
          <Card className="bg-[#121212] border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-[#A8F32C]/20 flex items-center justify-center">
                <Zap className="h-6 w-6 text-[#A8F32C]" />
              </div>
              <div>
                <h2 className="text-2xl">Easy Apply</h2>
                <p className="text-white/60">One-click application with your profile</p>
              </div>
            </div>

            {/* Job Info */}
            <div className="bg-black/50 border border-white/10 rounded-lg p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl mb-2">{jobTitle}</h3>
                  <p className="text-white/60">{company}</p>
                </div>
                {isFairPathStaffing && (
                  <div className="bg-[#A8F32C]/10 border border-[#A8F32C]/30 rounded-lg px-3 py-1 text-sm text-[#A8F32C]">
                    FairPath Staffing
                  </div>
                )}
              </div>
            </div>

            {/* Profile Review */}
            <div className="mb-6">
              <h3 className="text-lg mb-4">Your Profile Information</h3>
              <div className="space-y-4">
                <Card className="bg-black/50 border-white/10 p-4">
                  <h4 className="text-sm text-white/60 mb-2">Personal Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/60">Name:</span>
                      <span>John Doe</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Email:</span>
                      <span>john.doe@email.com</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Phone:</span>
                      <span>(555) 123-4567</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Location:</span>
                      <span>Chicago, IL</span>
                    </div>
                  </div>
                </Card>

                <Card className="bg-black/50 border-white/10 p-4">
                  <h4 className="text-sm text-white/60 mb-2">Work Experience</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="text-white">Warehouse Associate</div>
                      <div className="text-white/60">ABC Distribution (2022-2023)</div>
                    </div>
                    <div>
                      <div className="text-white">Forklift Operator</div>
                      <div className="text-white/60">XYZ Logistics (2021-2022)</div>
                    </div>
                  </div>
                </Card>

                <Card className="bg-black/50 border-white/10 p-4">
                  <h4 className="text-sm text-white/60 mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs">Forklift Certified</span>
                    <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs">Warehouse Operations</span>
                    <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs">Inventory Management</span>
                    <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs">Team Player</span>
                  </div>
                </Card>
              </div>
            </div>

            {/* No application fee */}
            <div className="bg-[#A8F32C]/10 border border-[#A8F32C]/30 rounded-lg p-4 text-center">
              <Check className="h-8 w-8 text-[#A8F32C] mx-auto mb-2" />
              <p className="text-white mb-1">✨ Easy Apply is 100% FREE</p>
              <p className="text-sm text-white/60">No application fees, ever</p>
            </div>
          </Card>
        )}

        {/* Step 2: Optional Cover Letter (always) */}
        {step === 2 && !isFairPathStaffing && (
          <Card className="bg-[#121212] border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl">Add a Cover Letter (Optional)</h2>
                <p className="text-white/60">Stand out by telling your story</p>
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="coverLetter" className="text-white mb-2 block">
                Why are you interested in this position?
              </label>
              <Textarea
                id="coverLetter"
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                className="bg-black border-white/20 text-white min-h-[200px]"
                placeholder="I'm excited about this opportunity because..."
              />
              <p className="text-xs text-white/40 mt-2">
                Optional but recommended. Employers love to see genuine interest!
              </p>
            </div>

            <div className="bg-black/50 border border-white/10 rounded-lg p-4">
              <h4 className="text-sm text-white mb-2">💡 Cover Letter Tips:</h4>
              <ul className="space-y-1 text-xs text-white/60">
                <li>• Mention specific skills from your experience</li>
                <li>• Express genuine interest in the company</li>
                <li>• Keep it concise (3-4 sentences)</li>
                <li>• Be yourself and authentic</li>
              </ul>
            </div>
          </Card>
        )}

        {/* FairPath Staffing: Step 2 - Pre-Screening Questions */}
        {step === 2 && isFairPathStaffing && (
          <Card className="bg-[#121212] border-white/10 p-8">
            <h2 className="text-2xl mb-2">Pre-Screening Questions</h2>
            <p className="text-white/60 mb-6">Quick questions to help match you to the role</p>

            <div className="space-y-6">
              <div>
                <label className="text-white mb-3 block">
                  Are you available to work first shift (6am-2pm)? <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                    <input type="radio" name="shift" />
                    <span className="text-white">Yes</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                    <input type="radio" name="shift" />
                    <span className="text-white">No, but flexible</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="text-white mb-3 block">
                  Do you have reliable transportation? <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                    <input type="radio" name="transport" />
                    <span className="text-white">Yes</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                    <input type="radio" name="transport" />
                    <span className="text-white">No, but working on it</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="text-white mb-3 block">
                  Can you lift 50+ lbs regularly? <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                    <input type="radio" name="lifting" />
                    <span className="text-white">Yes</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                    <input type="radio" name="lifting" />
                    <span className="text-white">No</span>
                  </label>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* FairPath Staffing: Step 3 - Background Check Authorization */}
        {step === 3 && isFairPathStaffing && (
          <Card className="bg-[#121212] border-white/10 p-8">
            <h2 className="text-2xl mb-2">Background Check Authorization</h2>
            <p className="text-white/60 mb-6">Required for FairPath Staffing jobs</p>

            <div className="bg-black/50 border border-blue-500/30 rounded-lg p-6 mb-6">
              <h3 className="text-lg text-blue-400 mb-3">Why This Helps You:</h3>
              <p className="text-white/80 mb-4">
                FairPath Staffing employers are trained in fair hiring and earn WOTC tax credits (up to $9,600) when they hire you. The background check actually makes you MORE attractive to them!
              </p>
              <ul className="space-y-2 text-sm text-white/60">
                <li>• Shows you're transparent and accountable</li>
                <li>• Qualifies employer for tax credits</li>
                <li>• Free to you (employer pays)</li>
                <li>• Completed quickly (24-48 hours)</li>
              </ul>
            </div>

            <div className="space-y-3">
              <label className="flex items-start gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                <input type="checkbox" className="mt-1" />
                <div className="text-sm">
                  <div className="text-white mb-1">I authorize a background check</div>
                  <div className="text-xs text-white/60">Standard employment verification and criminal background check</div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                <input type="checkbox" className="mt-1" />
                <div className="text-sm">
                  <div className="text-white mb-1">I understand this helps qualify the employer for WOTC</div>
                  <div className="text-xs text-white/60">You may help this employer earn up to $9,600 in tax credits</div>
                </div>
              </label>
            </div>
          </Card>
        )}

        {/* Final Step: Confirmation */}
        {step === totalSteps && (
          <Card className="bg-[#121212] border-white/10 p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-[#A8F32C]/20 flex items-center justify-center mx-auto mb-6">
              <Check className="h-8 w-8 text-[#A8F32C]" />
            </div>
            <h2 className="text-3xl mb-3">Application Submitted!</h2>
            <p className="text-xl text-white/60 mb-8">
              Your application has been sent to {company}
            </p>

            <div className="bg-black/50 border border-white/10 rounded-lg p-6 mb-6 text-left">
              <h3 className="text-lg mb-4">What Happens Next:</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#A8F32C]/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm text-[#A8F32C]">1</span>
                  </div>
                  <div>
                    <div className="text-white mb-1">Employer Reviews Your Profile (1-3 days)</div>
                    <div className="text-sm text-white/60">They'll see your complete work history and skills</div>
                  </div>
                </div>
                {isFairPathStaffing && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#A8F32C]/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm text-[#A8F32C]">2</span>
                    </div>
                    <div>
                      <div className="text-white mb-1">Background Check (24-48 hours)</div>
                      <div className="text-sm text-white/60">Quick verification process - you'll be notified when complete</div>
                    </div>
                  </div>
                )}
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#A8F32C]/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm text-[#A8F32C]">{isFairPathStaffing ? '3' : '2'}</span>
                  </div>
                  <div>
                    <div className="text-white mb-1">Interview Invitation</div>
                    <div className="text-sm text-white/60">If you're a good fit, they'll reach out for an interview</div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-sm text-white/60">
              We'll send you email and SMS updates. Track your application status in your dashboard anytime.
            </p>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex gap-4 mt-8">
          {step < totalSteps && (
            <>
              <Button onClick={handleBack} variant="outline" className="flex-1 border-white/20 text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button onClick={handleNext} className="flex-1 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">
                {step === totalSteps - 1 ? 'Submit Application' : 'Continue'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </>
          )}
          {step === totalSteps && (
            <Button onClick={onComplete} className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">
              Go to Dashboard
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
