import { Check, ArrowRight, Heart, Zap } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import LogoFinal from '../common/LogoFinal';

interface FreePlanConfirmationProps {
  userType: 'felon' | 'donor' | 'resource';
  onContinue: () => void;
}

export default function FreePlanConfirmation({ userType, onContinue }: FreePlanConfirmationProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="border-b border-white/5 bg-[#121212]">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <LogoFinal size="md" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-[#A8F32C]/20 flex items-center justify-center mx-auto mb-6">
            <Check className="h-10 w-10 text-[#A8F32C]" />
          </div>
          <h1 className="text-4xl mb-3 text-white">You're All Set!</h1>
          <p className="text-xl text-white/60">
            Welcome to the Friend A Felon community
          </p>
        </div>

        {/* Free Plan Benefits */}
        <Card className="bg-gradient-to-br from-[#A8F32C]/10 via-transparent to-transparent border-[#A8F32C]/30 p-8 mb-6">
          <h2 className="text-2xl mb-6 text-white">What You Get With Your Free Account:</h2>
          
          <div className="space-y-4">
            {userType === 'felon' && (
              <>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#A8F32C]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-4 w-4 text-[#A8F32C]" />
                  </div>
                  <div>
                    <div className="text-white mb-1">Browse Felony-Friendly Jobs</div>
                    <div className="text-sm text-white/60">Unlimited job searching and Easy Apply</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#A8F32C]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-4 w-4 text-[#A8F32C]" />
                  </div>
                  <div>
                    <div className="text-white mb-1">Search for Housing</div>
                    <div className="text-sm text-white/60">View all housing listings and apply with FastTrack ($75/application)</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#A8F32C]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-4 w-4 text-[#A8F32C]" />
                  </div>
                  <div>
                    <div className="text-white mb-1">3 Free Marketplace Claims/Month</div>
                    <div className="text-sm text-white/60">Claim furniture, clothing, and essentials from community donors</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#A8F32C]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-4 w-4 text-[#A8F32C]" />
                  </div>
                  <div>
                    <div className="text-white mb-1">Connect with Resources</div>
                    <div className="text-sm text-white/60">Find reentry support services in your area</div>
                  </div>
                </div>
              </>
            )}

            {userType === 'donor' && (
              <>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#A8F32C]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-4 w-4 text-[#A8F32C]" />
                  </div>
                  <div>
                    <div className="text-white mb-1">Post Unlimited Items</div>
                    <div className="text-sm text-white/60">Donate as many items as you want, completely free</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#A8F32C]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-4 w-4 text-[#A8F32C]" />
                  </div>
                  <div>
                    <div className="text-white mb-1">Choose Recipients</div>
                    <div className="text-sm text-white/60">Read claims and select who gets your items</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#A8F32C]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-4 w-4 text-[#A8F32C]" />
                  </div>
                  <div>
                    <div className="text-white mb-1">Build Your Impact</div>
                    <div className="text-sm text-white/60">Track how many lives you've helped change</div>
                  </div>
                </div>
              </>
            )}

            {userType === 'resource' && (
              <>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#A8F32C]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-4 w-4 text-[#A8F32C]" />
                  </div>
                  <div>
                    <div className="text-white mb-1">Complete CRM Access</div>
                    <div className="text-sm text-white/60">Manage all your clients in one place (501c3 organizations)</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#A8F32C]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-4 w-4 text-[#A8F32C]" />
                  </div>
                  <div>
                    <div className="text-white mb-1">Send Referrals</div>
                    <div className="text-sm text-white/60">Connect clients to jobs and housing directly</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#A8F32C]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-4 w-4 text-[#A8F32C]" />
                  </div>
                  <div>
                    <div className="text-white mb-1">Track Outcomes</div>
                    <div className="text-sm text-white/60">Generate reports for funders and stakeholders</div>
                  </div>
                </div>
              </>
            )}
          </div>
        </Card>

        {/* Upgrade Option */}
        {userType === 'felon' && (
          <Card className="bg-[#121212] border-white/10 p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-[#A8F32C]/20 flex items-center justify-center flex-shrink-0">
                <Zap className="h-6 w-6 text-[#A8F32C]" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg mb-2 text-white">Want More Benefits?</h3>
                <p className="text-white/60 text-sm mb-4">
                  Upgrade to FairPath+ for just $2/month and get:
                </p>
                <ul className="space-y-2 text-sm text-white/60 mb-4">
                  <li>• $10 off every FastTrack application ($65 instead of $75)</li>
                  <li>• 7 marketplace claims per month (instead of 3)</li>
                  <li>• Verified member badge</li>
                  <li>• Ad-free experience</li>
                </ul>
                <Button className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">
                  Upgrade to FairPath+ - $2/mo
                </Button>
              </div>
            </div>
          </Card>
        )}

        {userType === 'donor' && (
          <Card className="bg-[#121212] border-white/10 p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-[#A8F32C]/20 flex items-center justify-center flex-shrink-0">
                <Heart className="h-6 w-6 text-[#A8F32C]" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg mb-2 text-white">Thank You for Caring!</h3>
                <p className="text-white/60 text-sm">
                  Your generosity will help justice-impacted individuals rebuild their lives. Every item you donate makes a real difference in someone's reentry journey.
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* CTA */}
        <Button
          onClick={onContinue}
          className="w-full h-14 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90 text-lg"
        >
          {userType === 'felon' ? 'Start Your Journey' : 
           userType === 'donor' ? 'Post Your First Item' : 
           'Go to CRM Dashboard'}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
