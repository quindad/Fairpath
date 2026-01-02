import { DollarSign, TrendingUp, AlertTriangle, CheckCircle, XCircle, Shield, Target } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import LogoWithTagline from '../common/LogoWithTagline';
import singleKeyLogo from 'figma:asset/5440a413f9eccb599600d3e4db572d837d428647.png';

interface FastTrackRevenueExplainerProps {
  onClose: () => void;
}

export default function FastTrackRevenueExplainer({ onClose }: FastTrackRevenueExplainerProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/5 bg-[#121212] sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <LogoWithTagline size="md" />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-[#A8F32C] text-black border-0">
            FASTTRACK REVENUE MODEL
          </Badge>
          <h1 className="text-4xl mb-4">How You Earn Money on Every Application</h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            FastTrack is a revolutionary revenue-sharing model that pays you for processing applications 
            while giving qualified applicants guaranteed showings.
          </p>
        </div>

        {/* The Math */}
        <Card className="bg-gradient-to-br from-[#A8F32C]/20 via-[#121212] to-[#121212] border-[#A8F32C] p-8 mb-8">
          <h2 className="text-2xl mb-6 flex items-center gap-3">
            <DollarSign className="h-8 w-8 text-[#A8F32C]" />
            The Revenue Breakdown
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-black/50 rounded-lg p-6 border border-white/10">
              <div className="text-sm text-white/60 mb-2">Applicant Pays</div>
              <div className="text-4xl text-white mb-2">$75</div>
              <div className="text-xs text-white/40">($65 for FairPath+ users)</div>
            </div>

            <div className="bg-black/50 rounded-lg p-6 border border-[#A8F32C]/30">
              <div className="text-sm text-white/60 mb-2">You Receive (If You Rent)</div>
              <div className="text-4xl text-[#A8F32C] mb-2">$45</div>
              <div className="text-xs text-[#A8F32C]">60% revenue share</div>
            </div>

            <div className="bg-black/50 rounded-lg p-6 border border-white/10">
              <div className="text-sm text-white/60 mb-2">Platform Fee</div>
              <div className="text-4xl text-white mb-2">$30</div>
              <div className="text-xs text-white/40">40% platform cost</div>
            </div>
          </div>

          {/* Powered by SingleKey */}
          <div className="bg-white/5 rounded-lg p-4 flex items-center gap-4 mb-6">
            <img src={singleKeyLogo} alt="SingleKey" className="h-8" />
            <div className="flex-1">
              <div className="text-white mb-1">Screening Powered by SingleKey</div>
              <div className="text-sm text-white/60">
                Professional background reports cost us $18-22 each. We handle all screening costs.
              </div>
            </div>
          </div>

          {/* Earnings Examples */}
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-[#A8F32C]/10 rounded-lg p-4 text-center border border-[#A8F32C]/30">
              <div className="text-2xl text-[#A8F32C] mb-1">$225</div>
              <div className="text-sm text-white/60">5 applications</div>
            </div>
            <div className="bg-[#A8F32C]/10 rounded-lg p-4 text-center border border-[#A8F32C]/30">
              <div className="text-2xl text-[#A8F32C] mb-1">$450</div>
              <div className="text-sm text-white/60">10 applications</div>
            </div>
            <div className="bg-[#A8F32C]/10 rounded-lg p-4 text-center border border-[#A8F32C]/30">
              <div className="text-2xl text-[#A8F32C] mb-1">$900</div>
              <div className="text-sm text-white/60">20 applications</div>
            </div>
            <div className="bg-[#A8F32C]/10 rounded-lg p-4 text-center border border-[#A8F32C]/30">
              <div className="text-2xl text-[#A8F32C] mb-1">$2,250</div>
              <div className="text-sm text-white/60">50 applications</div>
            </div>
          </div>
        </Card>

        {/* How It Works */}
        <Card className="bg-[#121212] border-white/10 p-8 mb-8">
          <h2 className="text-2xl mb-6">How FastTrack Works</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#A8F32C] text-black flex items-center justify-center">1</div>
              <div>
                <h3 className="text-white mb-1">Applicant Applies via FastTrack</h3>
                <p className="text-sm text-white/60">
                  They pay $75 ($65 with FairPath+) for guaranteed showing + SingleKey screening
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#A8F32C] text-black flex items-center justify-center">2</div>
              <div>
                <h3 className="text-white mb-1">We Process SingleKey Background Report</h3>
                <p className="text-sm text-white/60">
                  Full credit check, criminal history, employment verification, rental history (we pay for this)
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#A8F32C] text-black flex items-center justify-center">3</div>
              <div>
                <h3 className="text-white mb-1">You Review & Schedule Showing</h3>
                <p className="text-sm text-white/60">
                  View complete background report and schedule guaranteed showing (required by FastTrack)
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#A8F32C] text-black flex items-center justify-center">4</div>
              <div>
                <h3 className="text-white mb-1">You Receive $45 Per Application (If You Rent)</h3>
                <p className="text-sm text-white/60">
                  60% revenue share when you rent to felons within 20 apps or 60 days. Revenue paid every 20 apps or 45 days.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* ACCOUNTABILITY WARNING */}
        <Card className="bg-gradient-to-br from-red-500/20 via-[#121212] to-[#121212] border-red-500 p-8 mb-8">
          <div className="flex gap-4 mb-6">
            <AlertTriangle className="h-8 w-8 text-red-500 flex-shrink-0" />
            <div>
              <h2 className="text-2xl text-red-500 mb-2">Accountability System: MUST Rent to Felons</h2>
              <p className="text-white/80">
                FastTrack is designed to help justice-impacted people get fair access to housing. 
                You MUST actually rent to felons to maintain your revenue share.
              </p>
            </div>
          </div>

          <div className="bg-red-500/10 rounded-lg p-6 mb-6">
            <h3 className="text-white mb-4">⚠️ Rental Requirement:</h3>
            <div className="text-white/80 mb-4">
              You must rent to at least ONE justice-impacted applicant within:
            </div>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-black/50 rounded-lg p-4 border border-red-500/30">
                <div className="text-red-500 text-2xl mb-1">20 Applications</div>
                <div className="text-sm text-white/60">First rental must happen by 20th FastTrack app</div>
              </div>
              <div className="bg-black/50 rounded-lg p-4 border border-red-500/30">
                <div className="text-red-500 text-2xl mb-1">60 Days</div>
                <div className="text-sm text-white/60">Or within 60 days of first FastTrack app received</div>
              </div>
            </div>
            <div className="text-sm text-white/60">
              (Whichever comes first)
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex gap-3">
              <CheckCircle className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-white mb-1">✅ If you rent within 20 apps or 60 days:</div>
                <div className="text-sm text-white/60">
                  You keep the full 60% revenue share ($45 per application). Countdown resets for next 20 apps!
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-white mb-1">❌ If you DON'T rent within 20 apps or 60 days:</div>
                <div className="text-sm text-red-500 mb-2">
                  Your revenue share drops to 36% ($27 per application)
                </div>
                <div className="text-sm text-white/60">
                  The missing 24% ($18 per app) goes to the FairPath Impact Fund to help felons you denied.
                </div>
              </div>
            </div>
          </div>

          <div className="bg-black/50 rounded-lg p-6">
            <h4 className="text-white mb-4">Revenue Comparison:</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#A8F32C]/10 border border-[#A8F32C]/30 rounded-lg p-4">
                <div className="text-[#A8F32C] mb-2">✅ Rent to Felons Regularly</div>
                <div className="text-3xl text-white mb-2">$900</div>
                <div className="text-sm text-white/60">20 apps × $45 (60% share)</div>
              </div>
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <div className="text-red-500 mb-2">❌ Don't Rent to Any Felons</div>
                <div className="text-3xl text-white mb-2">$540</div>
                <div className="text-sm text-white/60">20 apps × $27 (36% penalty)</div>
                <div className="text-xs text-red-400 mt-2">$360 lost to Impact Fund</div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-red-500/30">
            <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/30">
              <div className="text-blue-400 mb-2">💡 FairPath Impact Fund:</div>
              <div className="text-sm text-white/60">
                Penalty revenue helps felons with emergency housing, deposits, moving costs, and job training. 
                Your discrimination literally funds their success.
              </div>
            </div>
          </div>
        </Card>

        {/* IMPORTANT ETHICS WARNING - UPDATED */}
        <Card className="bg-[#121212] border-white/10 p-8 mb-8">
          <h2 className="text-2xl mb-6">Additional Violations</h2>

          <div className="space-y-4">
            <div className="flex gap-3">
              <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-white mb-1">Don't deny applicants without valid reasons</div>
                <div className="text-sm text-white/60">
                  You must provide legitimate denial reasons (credit score, income verification, references). 
                  Discrimination is illegal and will result in immediate account termination.
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-white mb-1">Don't skip guaranteed showings</div>
                <div className="text-sm text-white/60">
                  Every FastTrack applicant is guaranteed a showing. No-showing applicants violates our terms 
                  and damages your landlord rating.
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="bg-red-500/10 rounded-lg p-4">
              <div className="text-red-500 mb-2">Consequences of Violations:</div>
              <ul className="text-sm text-white/60 space-y-1">
                <li>• Revenue share reduced to 36% if you don't rent within 20 apps/60 days</li>
                <li>• Negative landlord reviews visible to all applicants</li>
                <li>• Account suspension or termination for discrimination</li>
                <li>• Legal action for fair housing violations</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* The Good Stuff */}
        <Card className="bg-[#121212] border-white/10 p-8 mb-8">
          <h2 className="text-2xl mb-6 flex items-center gap-3">
            <Target className="h-8 w-8 text-[#A8F32C]" />
            How to Use FastTrack Ethically
          </h2>

          <div className="space-y-4">
            <div className="flex gap-3">
              <CheckCircle className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-white mb-1">Be open-minded about conviction types</div>
                <div className="text-sm text-white/60">
                  Many felons with drug or property crimes are excellent tenants. Focus on current stability, 
                  not past mistakes.
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <CheckCircle className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-white mb-1">Use the screening data to make informed decisions</div>
                <div className="text-sm text-white/60">
                  SingleKey reports include credit, employment, and rental history. Look at the whole picture, 
                  not just conviction history.
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <CheckCircle className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-white mb-1">Provide real showings and fair consideration</div>
                <div className="text-sm text-white/60">
                  Applicants paid for guaranteed access. Give them real showings and evaluate them fairly 
                  against your criteria.
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <CheckCircle className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-white mb-1">Rent to qualified applicants when you can</div>
                <div className="text-sm text-white/60">
                  The goal is 1 rental per 20 applications. This ensures the system works for everyone and 
                  you maintain full revenue share.
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Landlord Rating System */}
        <Card className="bg-[#121212] border-white/10 p-8 mb-8">
          <h2 className="text-2xl mb-6 flex items-center gap-3">
            <Shield className="h-8 w-8 text-[#A8F32C]" />
            Landlord Rating & Accountability
          </h2>

          <p className="text-white/60 mb-6">
            Applicants can review their experience with you. Your rating is visible to future applicants 
            and affects your visibility on the platform.
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-[#A8F32C]/10 border border-[#A8F32C]/30 rounded-lg p-4">
              <div className="text-[#A8F32C] mb-2">4.5+ Rating</div>
              <div className="text-sm text-white/60">
                Featured placement, full revenue share, priority support
              </div>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <div className="text-yellow-500 mb-2">3.0-4.4 Rating</div>
              <div className="text-sm text-white/60">
                Standard placement, monitored for improvement
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <div className="text-red-500 mb-2">Below 3.0</div>
              <div className="text-sm text-white/60">
                Account review, potential suspension
              </div>
            </div>
          </div>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl mb-4">Ready to Earn Ethically?</h2>
          <p className="text-white/60 mb-6 max-w-2xl mx-auto">
            Use FastTrack to earn passive income while providing real opportunities to qualified applicants. 
            Play by the rules and everyone wins.
          </p>
          <Button
            onClick={onClose}
            className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
          >
            Got It - Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}