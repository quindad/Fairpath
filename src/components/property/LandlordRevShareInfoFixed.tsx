import { DollarSign, TrendingUp, CheckCircle, AlertTriangle, Clock, Shield, Heart } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import Logo from '../common/Logo';

interface LandlordRevShareInfoFixedProps {
  onClose?: () => void;
  onJoinProgram?: () => void;
}

export default function LandlordRevShareInfoFixed({ onClose, onJoinProgram }: LandlordRevShareInfoFixedProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header with Logo */}
      <div className="border-b border-white/5 bg-[#121212]">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Logo size="md" showTagline />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Title */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-[#A8F32C] text-black border-0">
            LANDLORD REV-SHARE PROGRAM
          </Badge>
          <h1 className="text-4xl mb-4">Earn $30 Per Showing — Guaranteed</h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Get paid $30 for every FastTrack showing you provide. No out-of-pocket screening costs. 
            Simple, transparent, and profitable.
          </p>
        </div>

        {/* Simple Model */}
        <Card className="bg-gradient-to-br from-[#A8F32C]/20 via-[#121212] to-[#121212] border-[#A8F32C] p-8 mb-8">
          <h2 className="text-2xl mb-6 flex items-center gap-3">
            <DollarSign className="h-8 w-8 text-[#A8F32C]" />
            How You Earn
          </h2>

          <div className="bg-black/30 rounded-lg p-8 mb-6">
            <div className="text-center mb-6">
              <div className="text-6xl text-[#A8F32C] mb-3">$45</div>
              <div className="text-xl text-white">Per FastTrack Application</div>
              <div className="text-sm text-white/60 mt-2">
                60% revenue share when you rent to felons
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex gap-3">
              <CheckCircle className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-white mb-1">User pays for FastTrack application</div>
                <div className="text-sm text-white/60">
                  $75 (Free), $70 (Plus), or $65 (Pro members)
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <CheckCircle className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-white mb-1">You provide a guaranteed showing</div>
                <div className="text-sm text-white/60">Schedule and conduct the showing within 48 hours</div>
              </div>
            </div>

            <div className="flex gap-3">
              <CheckCircle className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-white mb-1">You earn 60% revenue share</div>
                <div className="text-sm text-white/60">$45 (from $75), $42 (from $70), or $39 (from $65)</div>
              </div>
            </div>

            <div className="flex gap-3">
              <CheckCircle className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-white mb-1">Friend A Felon covers screening costs</div>
                <div className="text-sm text-white/60">We pay for SingleKey reports — you never pay out of pocket</div>
              </div>
            </div>
          </div>
        </Card>

        {/* The Catch - Impact Fund */}
        <Card className="bg-[#121212] border-white/10 p-8 mb-8">
          <h2 className="text-2xl mb-6 flex items-center gap-3">
            <Heart className="h-8 w-8 text-[#A8F32C]" />
            The FairPath Impact Fund Requirement
          </h2>

          <div className="space-y-6">
            <p className="text-white/80">
              To keep earning the full <span className="text-[#A8F32C]">60% revenue share ($45)</span>, 
              you must demonstrate good-faith participation in the program:
            </p>

            <div className="bg-[#A8F32C]/10 border border-[#A8F32C]/30 rounded-lg p-6">
              <h3 className="text-lg text-white mb-4">Accountability Requirement:</h3>
              <div className="flex gap-3">
                <CheckCircle className="h-6 w-6 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white mb-2">
                    <span className="text-[#A8F32C]">Rent to at least 1 felon</span> within every <span className="text-[#A8F32C]">20 applications OR 60 days</span>
                  </p>
                  <p className="text-sm text-white/60">
                    This ensures landlords are genuinely giving people second chances, not just collecting application fees.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6">
              <div className="flex gap-3">
                <AlertTriangle className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg text-yellow-500 mb-2">If You Don't Rent After 20 Apps or 60 Days:</h3>
                  <div className="space-y-3 text-sm">
                    <p className="text-white/80">
                      Your revenue share drops to 36% (penalty rate):
                    </p>
                    <div className="bg-black/30 rounded p-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-white/60">Standard revenue (60%):</span>
                        <span className="text-white line-through">$45</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-yellow-500">You receive (36%):</span>
                        <span className="text-yellow-500">$27</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Platform (40%):</span>
                        <span className="text-white/60">$30</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">FairPath Impact Fund (24%):</span>
                        <span className="text-white/60">$18</span>
                      </div>
                    </div>
                    <p className="text-white/60 mt-3">
                      The $18 goes to the FairPath Impact Fund, which provides emergency housing assistance, 
                      deposits, moving costs, and job training for justice-impacted individuals.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#A8F32C]/10 border border-[#A8F32C]/30 rounded-lg p-4">
              <p className="text-sm text-white/80">
                <span className="text-[#A8F32C]">✓ Good News:</span> Once you rent to someone, the countdown resets 
                and you're back to earning the full 60% ($45) immediately on the next 20 applications.
              </p>
            </div>
          </div>
        </Card>

        {/* Payment Schedule */}
        <Card className="bg-[#121212] border-white/10 p-8 mb-8">
          <h2 className="text-2xl mb-6 flex items-center gap-3">
            <Clock className="h-8 w-8 text-[#A8F32C]" />
            When You Get Paid
          </h2>

          <div className="space-y-4">
            <div className="bg-black/30 rounded-lg p-6">
              <h3 className="text-lg mb-3">Payments Released Every 20 Apps or 45 Days</h3>
              <p className="text-white/60 mb-4">
                All application fees you've earned are paid out every 20 applications or every 45 days (whichever comes first) via direct deposit.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/60">Example: 10 applications at 60% ($45 each)</span>
                  <span className="text-[#A8F32C]">$450 payout</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Example: 10 applications at penalty 36% ($27 each)</span>
                  <span className="text-yellow-500">$270 payout</span>
                </div>
              </div>
            </div>

            <div className="bg-[#A8F32C]/10 border border-[#A8F32C]/30 rounded-lg p-4">
              <p className="text-sm text-white">
                <span className="text-[#A8F32C]">Pro Tip:</span> Rent to just 1 qualified applicant every 20 applications or 60 days 
                to maximize your earnings. It's that simple.
              </p>
            </div>
          </div>
        </Card>

        {/* Why This Works */}
        <Card className="bg-[#121212] border-white/10 p-8 mb-8">
          <h2 className="text-2xl mb-6 flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-[#A8F32C]" />
            Why Landlords Love This Program
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-black/30 rounded-lg p-4">
              <CheckCircle className="h-5 w-5 text-[#A8F32C] mb-2" />
              <h3 className="text-white mb-2">Zero Upfront Costs</h3>
              <p className="text-sm text-white/60">
                No screening fees to buy. We cover all SingleKey costs.
              </p>
            </div>

            <div className="bg-black/30 rounded-lg p-4">
              <CheckCircle className="h-5 w-5 text-[#A8F32C] mb-2" />
              <h3 className="text-white mb-2">Guaranteed Payment</h3>
              <p className="text-sm text-white/60">
                $45 per application at 60% rate (or $27 minimum at penalty 36% rate).
              </p>
            </div>

            <div className="bg-black/30 rounded-lg p-4">
              <CheckCircle className="h-5 w-5 text-[#A8F32C] mb-2" />
              <h3 className="text-white mb-2">Pre-Screened Applicants</h3>
              <p className="text-sm text-white/60">
                All applicants come with full SingleKey background reports.
              </p>
            </div>

            <div className="bg-black/30 rounded-lg p-4">
              <CheckCircle className="h-5 w-5 text-[#A8F32C] mb-2" />
              <h3 className="text-white mb-2">Simple Requirement</h3>
              <p className="text-sm text-white/60">
                Just rent to 1 person every 20 apps or 60 days to keep full 60% earnings.
              </p>
            </div>

            <div className="bg-black/30 rounded-lg p-4">
              <CheckCircle className="h-5 w-5 text-[#A8F32C] mb-2" />
              <h3 className="text-white mb-2">Fast Payouts</h3>
              <p className="text-sm text-white/60">
                Direct deposit every 20 applications or 45 days (whichever comes first).
              </p>
            </div>

            <div className="bg-black/30 rounded-lg p-4">
              <CheckCircle className="h-5 w-5 text-[#A8F32C] mb-2" />
              <h3 className="text-white mb-2">Support Reentry</h3>
              <p className="text-sm text-white/60">
                Help people rebuild their lives while earning passive income.
              </p>
            </div>
          </div>
        </Card>

        {/* Example Earnings */}
        <Card className="bg-gradient-to-br from-[#A8F32C]/10 via-transparent to-transparent border-[#A8F32C]/30 p-8 mb-8">
          <h2 className="text-2xl mb-6">Real Earnings Example</h2>

          <div className="space-y-4">
            <div className="bg-black/30 rounded-lg p-6">
              <h3 className="text-lg mb-4">Scenario 1: Active Landlord (Rents to Felons)</h3>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-white/60">20 FastTrack applications in 60 days</span>
                  <span className="text-white"></span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Rented to 2 qualified felons</span>
                  <span className="text-[#A8F32C]">✓ Requirement met</span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-2 mt-2">
                  <span className="text-[#A8F32C]">Total payout (60% rate):</span>
                  <span className="text-[#A8F32C] text-xl">$900</span>
                </div>
              </div>
              <p className="text-xs text-white/60">
                20 applications × $45 each (60%) = $900 every 60 days = ~$5,400/year passive income
              </p>
            </div>

            <div className="bg-black/30 rounded-lg p-6">
              <h3 className="text-lg mb-4">Scenario 2: Selective Landlord (No Rentals)</h3>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-white/60">20 FastTrack applications in 60 days</span>
                  <span className="text-white"></span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Rented to 0 felons this period</span>
                  <span className="text-yellow-500">⚠ Penalty rate applied</span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-2 mt-2">
                  <span className="text-yellow-500">Total payout (36% penalty):</span>
                  <span className="text-yellow-500 text-xl">$540</span>
                </div>
              </div>
              <p className="text-xs text-white/60">
                20 applications × $27 each (36%) = $540. The other $360 goes to FairPath Impact Fund to help other felons.
              </p>
            </div>
          </div>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl mb-4">Ready to Start Earning?</h2>
          <p className="text-white/60 mb-6 max-w-2xl mx-auto">
            Join the Rev-Share Program and start receiving 60% ($45) per application. 
            Help people find housing while building passive income.
          </p>
          <div className="flex gap-4 justify-center">
            {onJoinProgram && (
              <Button
                onClick={onJoinProgram}
                className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
              >
                Join Rev-Share Program
              </Button>
            )}
            {onClose && (
              <Button
                onClick={onClose}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/5"
              >
                Learn More Later
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}