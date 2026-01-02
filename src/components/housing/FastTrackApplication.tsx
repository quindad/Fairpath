import { useState } from 'react';
import { ArrowRight, ArrowLeft, Zap, Shield, Check, Home } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Progress } from '../ui/progress';
import LogoFinal from '../common/LogoFinal';

interface FastTrackApplicationProps {
  listingId: string;
  listingAddress: string;
  rent: number;
  hasFairPathPlus: boolean;
  onComplete: () => void;
  onBack: () => void;
}

export default function FastTrackApplication({ 
  listingId, 
  listingAddress,
  rent,
  hasFairPathPlus, 
  onComplete, 
  onBack 
}: FastTrackApplicationProps) {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const fastTrackPrice = hasFairPathPlus ? 65 : 75;

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

        {/* Step 1: Review Application */}
        {step === 1 && (
          <Card className="bg-[#121212] border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-[#A8F32C]/20 flex items-center justify-center">
                <Zap className="h-6 w-6 text-[#A8F32C]" />
              </div>
              <div>
                <h2 className="text-2xl">FastTrack Application</h2>
                <p className="text-white/60">Guaranteed showing within 48 hours</p>
              </div>
            </div>

            {/* Property Info */}
            <div className="bg-black/50 border border-white/10 rounded-lg p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Home className="h-5 w-5 text-[#A8F32C]" />
                    <h3 className="text-lg">Property Details</h3>
                  </div>
                  <p className="text-white/60">{listingAddress}</p>
                  <p className="text-2xl text-[#A8F32C] mt-2">${rent}/month</p>
                </div>
              </div>
            </div>

            {/* What's Included */}
            <div className="mb-6">
              <h3 className="text-lg mb-4">What FastTrack Includes:</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#A8F32C]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-4 w-4 text-[#A8F32C]" />
                  </div>
                  <div>
                    <div className="text-white mb-1">SingleKey Background Screening</div>
                    <div className="text-sm text-white/60">Professional background report delivered to landlord</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#A8F32C]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-4 w-4 text-[#A8F32C]" />
                  </div>
                  <div>
                    <div className="text-white mb-1">Guaranteed Showing</div>
                    <div className="text-sm text-white/60">Landlord MUST show you the property or provide valid denial reason</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#A8F32C]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-4 w-4 text-[#A8F32C]" />
                  </div>
                  <div>
                    <div className="text-white mb-1">Priority Processing</div>
                    <div className="text-sm text-white/60">Your application goes to the front of the line</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#A8F32C]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-4 w-4 text-[#A8F32C]" />
                  </div>
                  <div>
                    <div className="text-white mb-1">Application Status Tracking</div>
                    <div className="text-sm text-white/60">Real-time updates on your application</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Review */}
            <div className="bg-black/50 border border-white/10 rounded-lg p-6 mb-6">
              <h3 className="text-lg mb-4">Your Profile Will Include:</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/60">Name:</span>
                  <span>John Doe</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Employment:</span>
                  <span>Warehouse Associate</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Income:</span>
                  <span>$3,200/month</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">References:</span>
                  <span>3 verified</span>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Step 2: SingleKey Authorization */}
        {step === 2 && (
          <Card className="bg-[#121212] border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Shield className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl">Background Screening Authorization</h2>
                <p className="text-white/60">Powered by SingleKey</p>
              </div>
            </div>

            <div className="bg-black/50 border border-blue-500/30 rounded-lg p-6 mb-6">
              <h3 className="text-lg text-blue-400 mb-3">Why We Need This:</h3>
              <p className="text-white/80 mb-4">
                FastTrack includes a professional background screening report that gives landlords confidence in your application. This is a FULL report that shows:
              </p>
              <ul className="space-y-2 text-sm text-white/60">
                <li>• Credit history</li>
                <li>• Rental history</li>
                <li>• Criminal background (full transparency)</li>
                <li>• Employment verification</li>
                <li>• Identity verification</li>
              </ul>
            </div>

            <div className="space-y-4">
              <label className="flex items-start gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                <input type="checkbox" className="mt-1" />
                <div className="text-sm">
                  <div className="text-white mb-1">I authorize SingleKey to run a background screening</div>
                  <div className="text-xs text-white/60">
                    This includes credit, criminal, rental, and employment verification
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                <input type="checkbox" className="mt-1" />
                <div className="text-sm">
                  <div className="text-white mb-1">I understand the landlord will see my complete report</div>
                  <div className="text-xs text-white/60">
                    Full transparency helps you stand out by showing accountability
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                <input type="checkbox" className="mt-1" />
                <div className="text-sm">
                  <div className="text-white mb-1">I certify that all information provided is accurate</div>
                  <div className="text-xs text-white/60">
                    False information can result in application denial and account suspension
                  </div>
                </div>
              </label>
            </div>
          </Card>
        )}

        {/* Step 3: Payment */}
        {step === 3 && (
          <Card className="bg-[#121212] border-white/10 p-8">
            <h2 className="text-2xl mb-6 text-white">Payment Confirmation</h2>

            {/* Price Breakdown */}
            <div className="bg-black/50 border border-white/10 rounded-lg p-6 mb-6">
              <div className="space-y-3">
                <div className="flex justify-between text-white">
                  <span className="text-white/60">FastTrack Application Fee</span>
                  <span className="text-white">{hasFairPathPlus ? '$65.00' : '$75.00'}</span>
                </div>
                {hasFairPathPlus && (
                  <div className="flex justify-between text-[#A8F32C]">
                    <span>FairPath+ Discount</span>
                    <span>-$10.00</span>
                  </div>
                )}
                <div className="border-t border-white/10 pt-3">
                  <div className="flex justify-between text-xl">
                    <span className="text-white">Total Due Today</span>
                    <span className="text-[#A8F32C]">${fastTrackPrice}.00</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#A8F32C]/10 border border-[#A8F32C]/30 rounded-lg p-4 mb-6">
              <h4 className="text-white mb-2">What's Included:</h4>
              <ul className="space-y-1 text-sm text-white/80">
                <li>• SingleKey professional background screening</li>
                <li>• Guaranteed showing OR valid denial reason</li>
                <li>• Priority application processing</li>
                <li>• Real-time status tracking</li>
              </ul>
            </div>

            <p className="text-sm text-white/60 text-center">
              Click Continue to proceed to secure payment page
            </p>
          </Card>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && (
          <Card className="bg-[#121212] border-white/10 p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-[#A8F32C]/20 flex items-center justify-center mx-auto mb-6">
              <Check className="h-8 w-8 text-[#A8F32C]" />
            </div>
            <h2 className="text-3xl mb-3">Application Submitted!</h2>
            <p className="text-xl text-white/60 mb-8">
              Your FastTrack application is being processed
            </p>

            <div className="bg-black/50 border border-white/10 rounded-lg p-6 mb-6 text-left">
              <h3 className="text-lg mb-4">What Happens Next:</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#A8F32C]/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm text-[#A8F32C]">1</span>
                  </div>
                  <div>
                    <div className="text-white mb-1">Background Screening (24 hours)</div>
                    <div className="text-sm text-white/60">SingleKey will complete your screening and send report to landlord</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#A8F32C]/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm text-[#A8F32C]">2</span>
                  </div>
                  <div>
                    <div className="text-white mb-1">Landlord Review (24-48 hours)</div>
                    <div className="text-sm text-white/60">Landlord reviews your complete application and report</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#A8F32C]/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm text-[#A8F32C]">3</span>
                  </div>
                  <div>
                    <div className="text-white mb-1">Showing Scheduled</div>
                    <div className="text-sm text-white/60">You'll receive a showing time OR a valid denial reason</div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-sm text-white/60">
              We'll send you email and SMS updates at every step. You can also track your application status in your dashboard.
            </p>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex gap-4 mt-8">
          {step < 4 && (
            <>
              <Button onClick={handleBack} variant="outline" className="flex-1 border-white/20 text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button onClick={handleNext} className="flex-1 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">
                {step === 3 ? `Pay $${fastTrackPrice} & Submit` : 'Continue'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </>
          )}
          {step === 4 && (
            <Button onClick={onComplete} className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">
              Go to Dashboard
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}