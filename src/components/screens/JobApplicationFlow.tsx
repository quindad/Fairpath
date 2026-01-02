import { useState } from 'react';
import { ArrowLeft, Zap, CheckCircle, Briefcase, FileText } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { JobListing } from '../../lib/eligibility';
import { UserProfile } from '../ProfileSetupWizard';

interface JobApplicationFlowProps {
  job: JobListing;
  userProfile: UserProfile | null;
  isSubscriber: boolean;
  onBack: () => void;
  onComplete: (applicationId: string) => void;
  onSubscribe: () => void;
}

export default function JobApplicationFlow({
  job,
  userProfile,
  isSubscriber,
  onBack,
  onComplete,
  onSubscribe
}: JobApplicationFlowProps) {
  const [step, setStep] = useState<'confirm' | 'submitting' | 'success'>('confirm');

  const handleSubmit = () => {
    setStep('submitting');
    
    // Simulate application submission
    setTimeout(() => {
      setStep('success');
      setTimeout(() => {
        const mockApplicationId = `job_app_${Math.random().toString(36).substr(2, 9)}`;
        onComplete(mockApplicationId);
      }, 2000);
    }, 1500);
  };

  if (step === 'confirm') {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-black/95 backdrop-blur-xl border-b border-white/5">
          <div className="flex items-center gap-4 px-4 h-14">
            <button
              onClick={onBack}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex-1">
              <div className="text-xs text-[#A8F32C]">FASTTRACK APPLICATION</div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Job Info */}
            <div className="bg-[#121212] rounded-2xl p-6 border border-white/5">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-white/5 rounded-xl flex items-center justify-center">
                  <Briefcase className="h-8 w-8 text-[#A8F32C]" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl mb-1">{job.title}</h2>
                  <p className="text-sm text-white/60">{job.company}</p>
                  <p className="text-sm text-white/40">{job.city}, {job.state}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-white/5">
                <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-0">
                  <Zap className="h-3 w-3 mr-1" />
                  FastTrack Apply
                </Badge>
                <span className="text-xs text-white/60">• Free to apply</span>
              </div>
            </div>

            {/* Your Profile */}
            <div className="bg-[#121212] rounded-2xl p-6 border border-white/5">
              <h3 className="text-lg mb-4">Your Information</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Name:</span>
                  <span className="text-white">{userProfile?.firstName} {userProfile?.lastName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Location:</span>
                  <span className="text-white">{userProfile?.city}, {userProfile?.state}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Phone:</span>
                  <span className="text-white">{userProfile?.phone || 'Not provided'}</span>
                </div>
                <div className="flex items-start justify-between">
                  <span className="text-white/60">Skills:</span>
                  <span className="text-white text-right max-w-[200px]">{userProfile?.skills || 'Not provided'}</span>
                </div>
              </div>
            </div>

            {/* What Happens Next */}
            <div className="bg-[#A8F32C]/5 rounded-2xl p-6 border border-[#A8F32C]/20">
              <h3 className="text-sm mb-4 text-[#A8F32C]">What Happens Next:</h3>
              <ol className="space-y-3 text-sm text-white/80">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#A8F32C]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#A8F32C] text-xs">1</span>
                  </div>
                  <span>Your application is submitted directly to the employer</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#A8F32C]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#A8F32C] text-xs">2</span>
                  </div>
                  <span>Employer reviews your profile and experience</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#A8F32C]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#A8F32C] text-xs">3</span>
                  </div>
                  <span>You'll be contacted directly if selected for an interview</span>
                </li>
                {job.jobType === 'fairpath-staffing' && (
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#A8F32C]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[#A8F32C] text-xs">4</span>
                    </div>
                    <span>FairPath Staffing handles background check & drug test if you move forward</span>
                  </li>
                )}
              </ol>
            </div>

            {job.jobType === 'fairpath-staffing' && (
              <div className="bg-black/50 rounded-xl p-4 border border-white/5">
                <p className="text-xs text-white/60 text-center">
                  ✨ Powered by FairPath Industries • FairPath+ Exclusive
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/5">
          <div className="max-w-2xl mx-auto space-y-3">
            <Button 
              className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90 h-14"
              onClick={handleSubmit}
            >
              <Zap className="mr-2 h-5 w-5" />
              Submit Application
            </Button>
            <p className="text-xs text-center text-white/40">
              By submitting, you agree to share your profile information with this employer
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'submitting') {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-20 h-20 bg-[#A8F32C]/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <FileText className="h-10 w-10 text-[#A8F32C]" />
          </div>
          <h2 className="text-2xl mb-2">Submitting Application...</h2>
          <p className="text-sm text-white/60">
            Sending your information to {job.company}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-[#A8F32C]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-10 w-10 text-[#A8F32C]" />
        </div>
        <h2 className="text-2xl mb-2">Application Submitted!</h2>
        <p className="text-sm text-white/60 mb-8">
          Your application to {job.company} has been submitted successfully. 
          You'll be notified if they'd like to move forward.
        </p>
        
        <div className="bg-[#121212] rounded-2xl p-6 border border-white/5 mb-6">
          <h3 className="text-sm mb-3 text-white/80">Application Details:</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-white/60">Position:</span>
              <span className="text-white">{job.title}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/60">Company:</span>
              <span className="text-white">{job.company}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/60">Submitted:</span>
              <span className="text-white">Just now</span>
            </div>
          </div>
        </div>

        <p className="text-xs text-white/40">
          Redirecting to your applications...
        </p>
      </div>
    </div>
  );
}