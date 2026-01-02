import { useState } from 'react';
import { ArrowLeft, Heart, CheckCircle, X, ChevronRight, MapPin, Star, Calendar } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import LogoFinal from '../common/LogoFinal';

interface MarketplaceClaimFlowProps {
  item: any;
  onClose: () => void;
  onClaim: (claimData: any) => void;
  claimsRemaining: number;
}

export default function MarketplaceClaimFlow({ item, onClose, onClaim, claimsRemaining }: MarketplaceClaimFlowProps) {
  const [step, setStep] = useState<'story' | 'confirmation'>('story');
  const [formData, setFormData] = useState({
    whyYouNeed: '',
    yourStory: '',
    transportation: 'yes',
    pickupDate: '',
    alternateContact: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmitStory = () => {
    if (!formData.whyYouNeed || !formData.pickupDate) {
      alert('Please fill in all required fields');
      return;
    }
    setStep('confirmation');
  };

  const handleComplete = () => {
    const claimData = {
      itemId: item.id,
      item: item.title,
      donor: item.donor,
      ...formData,
      claimedDate: new Date().toISOString(),
      status: 'pending'
    };
    onClaim(claimData);
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
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className={`flex items-center gap-2 ${step === 'story' ? 'text-purple-400' : 'text-white'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'story' ? 'bg-purple-500 text-white' : 'bg-purple-500 text-white'}`}>
              {step === 'confirmation' ? <CheckCircle className="h-5 w-5" /> : '1'}
            </div>
            <span>Your Story</span>
          </div>
          <div className="w-12 h-0.5 bg-white/20" />
          <div className={`flex items-center gap-2 ${step === 'confirmation' ? 'text-purple-400' : 'text-white/40'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'confirmation' ? 'bg-purple-500 text-white' : 'bg-white/10'}`}>
              2
            </div>
            <span>Confirm</span>
          </div>
        </div>

        {/* Item Summary Card */}
        <Card className="bg-gradient-to-r from-purple-500/10 to-transparent border-purple-500/30 p-6 mb-8">
          <div className="flex items-start gap-4">
            <img src={item.image} alt={item.title} className="w-24 h-24 rounded-lg object-cover flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-2xl text-white mb-1">{item.title}</h3>
              <div className="text-white/60 mb-2">Donated by {item.donor}</div>
              <div className="flex gap-2">
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                  {item.category}
                </Badge>
                <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30">
                  {item.condition}
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl text-purple-400">FREE</div>
              <div className="text-sm text-white/60">{claimsRemaining} claims left</div>
            </div>
          </div>
        </Card>

        {/* STEP 1: YOUR STORY */}
        {step === 'story' && (
          <div className="space-y-6">
            <Card className="bg-[#121212] border-white/10 p-6">
              <h2 className="text-2xl mb-4 text-white">Tell Your Story</h2>
              <p className="text-white/60 mb-6">
                Help the donor understand why this item would make a difference in your reentry journey. Your story helps them see the impact of their generosity.
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-white/60 mb-2">Why do you need this item? (Required)</label>
                  <textarea
                    placeholder="I'm moving into my first apartment after release and need furniture to make it feel like home..."
                    value={formData.whyYouNeed}
                    onChange={(e) => handleInputChange('whyYouNeed', e.target.value)}
                    className="w-full h-32 bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-2">Share your story (Optional but encouraged)</label>
                  <textarea
                    placeholder="I recently started a new job at Target and I'm working hard to rebuild my life. Having this item would help me..."
                    value={formData.yourStory}
                    onChange={(e) => handleInputChange('yourStory', e.target.value)}
                    className="w-full h-32 bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white resize-none"
                  />
                  <div className="text-xs text-white/40 mt-1">
                    Sharing your story increases approval chances by 87%
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-2">Do you have reliable transportation for pickup?</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="transportation"
                        value="yes"
                        checked={formData.transportation === 'yes'}
                        onChange={(e) => handleInputChange('transportation', e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-white">Yes, I can arrange pickup</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="transportation"
                        value="no"
                        checked={formData.transportation === 'no'}
                        onChange={(e) => handleInputChange('transportation', e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-white">No, I need help</span>
                    </label>
                  </div>
                  {formData.transportation === 'no' && (
                    <div className="mt-2 bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 text-sm text-white/80">
                      We'll notify local volunteers who may be able to help with transportation.
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-2">Preferred Pickup Date (Required)</label>
                  <input
                    type="date"
                    value={formData.pickupDate}
                    onChange={(e) => handleInputChange('pickupDate', e.target.value)}
                    className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-2">Alternate Contact (Optional)</label>
                  <input
                    type="text"
                    placeholder="Case manager, family member, etc."
                    value={formData.alternateContact}
                    onChange={(e) => handleInputChange('alternateContact', e.target.value)}
                    className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white"
                  />
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-to-r from-blue-500/10 to-transparent border-blue-500/30 p-4">
              <div className="flex items-start gap-3">
                <Heart className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-white mb-1">Free Marketplace</div>
                  <div className="text-sm text-white/60">
                    This item is donated by a community member who wants to help with your reentry. All items are 100% free. You have {claimsRemaining} claims remaining this month.
                  </div>
                </div>
              </div>
            </Card>

            <Button 
              className="w-full bg-purple-500 text-white hover:bg-purple-600 h-12"
              onClick={handleSubmitStory}
            >
              Submit Claim Request
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        )}

        {/* STEP 2: CONFIRMATION */}
        {step === 'confirmation' && (
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-purple-500/20 to-transparent border-purple-500/30 p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-purple-500 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-3xl mb-3 text-white">Claim Submitted!</h2>
              <p className="text-xl text-white/80 mb-6">
                Your claim for "{item.title}" has been sent to {item.donor}.
              </p>
              
              <div className="bg-black/50 border border-white/10 rounded-lg p-6 mb-6 text-left">
                <h3 className="text-xl mb-4 text-white">What Happens Next?</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-purple-400">1</span>
                    </div>
                    <div>
                      <div className="text-white mb-1">Donor Review (24-48 hours)</div>
                      <div className="text-sm text-white/60">{item.donor} will review your story and make a decision.</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-purple-400">2</span>
                    </div>
                    <div>
                      <div className="text-white mb-1">Approval Notification</div>
                      <div className="text-sm text-white/60">If approved, you'll receive pickup instructions via email and SMS.</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-purple-400">3</span>
                    </div>
                    <div>
                      <div className="text-white mb-1">Coordinate Pickup</div>
                      <div className="text-sm text-white/60">Connect with the donor to arrange pickup on {formData.pickupDate}.</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-purple-400">4</span>
                    </div>
                    <div>
                      <div className="text-white mb-1">Pick Up Your Item</div>
                      <div className="text-sm text-white/60">Meet the donor, get your item, and mark the claim as complete.</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#A8F32C]/10 border border-[#A8F32C]/30 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 text-[#A8F32C] mb-2">
                  <Star className="h-5 w-5" />
                  <span className="text-white">Build Your FairPath Score</span>
                </div>
                <div className="text-sm text-white/60">
                  Successfully completing this claim will increase your FairPath Score, making future housing and job applications easier!
                </div>
              </div>

              <Button 
                className="w-full bg-purple-500 text-white hover:bg-purple-600 h-12"
                onClick={handleComplete}
              >
                Go to My Claims
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
