import { useState } from 'react';
import { Package, Heart, ArrowRight, ArrowLeft, Check, User, Home as HomeIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Progress } from '../ui/progress';
import LogoFinal from '../common/LogoFinal';
import SafePickupLocations from './SafePickupLocations';
import { useNavigate } from 'react-router-dom';

interface ClaimItemFlowProps {
  item: {
    id: string;
    title: string;
    category: string;
    condition: string;
    description: string;
    location: string;
    donorName: string;
  };
  onComplete: () => void;
  onCancel: () => void;
}

export default function ClaimItemFlow({ item, onComplete, onCancel }: ClaimItemFlowProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const [claimData, setClaimData] = useState({
    whyNeedIt: '',
    howHelpReentry: '',
    currentSituation: '',
    transportationPlan: '',
    canPickup: 'yes',
    preferredDate: ''
  });

  const progress = (step / totalSteps) * 100;

  const handleSubmit = () => {
    onComplete();
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="border-b border-white/5 bg-[#121212] sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <LogoFinal size="md" />
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

        {/* Item Preview */}
        <Card className="bg-gradient-to-r from-[#A8F32C]/20 to-transparent border-[#A8F32C]/30 p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-lg bg-[#A8F32C]/20 flex items-center justify-center flex-shrink-0">
              <Package className="h-8 w-8 text-[#A8F32C]" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl text-white mb-1">{item.title}</h3>
              <p className="text-sm text-white/60 mb-2">{item.description}</p>
              <div className="flex gap-4 text-xs text-white/40">
                <span>📍 {item.location}</span>
                <span>✨ {item.condition}</span>
                <span>❤️ Donated by {item.donorName}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Step 1: Why You Need This */}
        {step === 1 && (
          <Card className="bg-[#121212] border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Heart className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl text-white">Why Do You Need This Item?</h2>
                <p className="text-white/60">Share your story with the donor</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
                <p className="text-sm text-white/80">
                  <strong className="text-white">💡 Tip:</strong> Donors want to help those who will truly benefit. Be honest about your situation and how this item will help you rebuild your life.
                </p>
              </div>

              <div>
                <Label htmlFor="whyNeedIt" className="text-white mb-2 block">
                  Why do you need this specific item? <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="whyNeedIt"
                  placeholder="Example: I just moved into my first apartment after release and don't have any furniture. This would help me create a stable home environment."
                  value={claimData.whyNeedIt}
                  onChange={(e) => setClaimData({ ...claimData, whyNeedIt: e.target.value })}
                  className="bg-black border-white/20 text-white min-h-32"
                />
                <p className="text-xs text-white/40 mt-2">Minimum 50 characters</p>
              </div>

              <div>
                <Label htmlFor="howHelpReentry" className="text-white mb-2 block">
                  How will this help your reentry journey? <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="howHelpReentry"
                  placeholder="Example: Having proper furniture will help me maintain my apartment and housing stability. I'm also working on getting my kids back, and having a furnished home is required by child services."
                  value={claimData.howHelpReentry}
                  onChange={(e) => setClaimData({ ...claimData, howHelpReentry: e.target.value })}
                  className="bg-black border-white/20 text-white min-h-32"
                />
                <p className="text-xs text-white/40 mt-2">Minimum 50 characters</p>
              </div>
            </div>
          </Card>
        )}

        {/* Step 2: Current Situation */}
        {step === 2 && (
          <Card className="bg-[#121212] border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <User className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <h2 className="text-2xl text-white">Tell Us About Your Situation</h2>
                <p className="text-white/60">Help the donor understand your journey</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="currentSituation" className="text-white mb-2 block">
                  What's your current living/life situation? <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="currentSituation"
                  placeholder="Example: I was released 3 months ago and I'm currently living in a transitional housing program. I have a job at a local warehouse and I'm saving to get my own place. This item would help me furnish my apartment when I move in next month."
                  value={claimData.currentSituation}
                  onChange={(e) => setClaimData({ ...claimData, currentSituation: e.target.value })}
                  className="bg-black border-white/20 text-white min-h-40"
                />
                <p className="text-xs text-white/40 mt-2">Share as much as you're comfortable with</p>
              </div>

              <div className="bg-[#A8F32C]/10 border border-[#A8F32C]/30 rounded-lg p-4">
                <h3 className="text-white mb-3 flex items-center gap-2">
                  <HomeIcon className="h-5 w-5 text-[#A8F32C]" />
                  What Donors Want to Know:
                </h3>
                <ul className="space-y-2 text-sm text-white/80">
                  <li className="flex gap-2">
                    <Check className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span>Do you have stable housing or a move-in date?</span>
                  </li>
                  <li className="flex gap-2">
                    <Check className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span>Are you employed or actively looking for work?</span>
                  </li>
                  <li className="flex gap-2">
                    <Check className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span>What steps are you taking to rebuild your life?</span>
                  </li>
                  <li className="flex gap-2">
                    <Check className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                    <span>Do you have family/community support?</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        )}

        {/* Step 3: Pickup Details */}
        {step === 3 && (
          <Card className="bg-[#121212] border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-[#A8F32C]/20 flex items-center justify-center">
                <Check className="h-6 w-6 text-[#A8F32C]" />
              </div>
              <div>
                <h2 className="text-2xl text-white">Pickup Logistics</h2>
                <p className="text-white/60">Confirm you can pick up the item</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="transportationPlan" className="text-white mb-2 block">
                  How will you transport this item? <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="transportationPlan"
                  placeholder="Example: I have access to my friend's truck on weekends. I can also arrange to borrow a van from the transitional housing program if needed."
                  value={claimData.transportationPlan}
                  onChange={(e) => setClaimData({ ...claimData, transportationPlan: e.target.value })}
                  className="bg-black border-white/20 text-white min-h-24"
                />
              </div>

              <div>
                <Label className="text-white mb-3 block">
                  Can you pick up within the next 7 days? <span className="text-red-500">*</span>
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setClaimData({ ...claimData, canPickup: 'yes' })}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      claimData.canPickup === 'yes'
                        ? 'border-[#A8F32C] bg-[#A8F32C]/10'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <div className="text-white">Yes, I can pick up soon</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setClaimData({ ...claimData, canPickup: 'flexible' })}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      claimData.canPickup === 'flexible'
                        ? 'border-[#A8F32C] bg-[#A8F32C]/10'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <div className="text-white">Need more time / flexible</div>
                  </button>
                </div>
              </div>

              <div>
                <Label htmlFor="preferredDate" className="text-white mb-2 block">
                  Preferred pickup date/time range
                </Label>
                <Textarea
                  id="preferredDate"
                  placeholder="Example: Weekends work best for me, anytime Saturday or Sunday. I can also do weekday evenings after 6pm."
                  value={claimData.preferredDate}
                  onChange={(e) => setClaimData({ ...claimData, preferredDate: e.target.value })}
                  className="bg-black border-white/20 text-white min-h-24"
                />
              </div>

              {/* Summary */}
              <div className="bg-black/50 border border-white/10 rounded-lg p-6">
                <h3 className="text-lg mb-4 text-white">Your Claim Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/60">Item:</span>
                    <span className="text-white">{item.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Location:</span>
                    <span className="text-white">{item.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Story length:</span>
                    <span className="text-white">
                      {claimData.whyNeedIt.length + claimData.howHelpReentry.length + claimData.currentSituation.length} characters
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Can pickup:</span>
                    <span className="text-white capitalize">{claimData.canPickup}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-500/20 to-transparent border border-yellow-500/30 rounded-lg p-4">
                <p className="text-sm text-white/80">
                  <strong className="text-white">⏳ What happens next:</strong> The donor will review your claim along with others. They'll choose who gets the item based on need and story. You'll get notified either way!
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex gap-4 mt-8">
          {step > 1 && (
            <Button onClick={() => setStep(step - 1)} variant="outline" className="flex-1 border-white/20 text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              BACK
            </Button>
          )}
          {step < totalSteps ? (
            <Button onClick={() => setStep(step + 1)} className="flex-1 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">
              CONTINUE
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="flex-1 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">
              SUBMIT CLAIM
              <Check className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>

        <Button onClick={onCancel} variant="ghost" className="w-full mt-4 text-white/60">
          CANCEL
        </Button>
      </div>
    </div>
  );
}