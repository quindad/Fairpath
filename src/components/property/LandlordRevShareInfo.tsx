import { DollarSign, TrendingUp, CheckCircle, AlertTriangle, Clock, Shield } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

interface LandlordRevShareInfoProps {
  onClose?: () => void;
  onJoinProgram?: () => void;
}

export default function LandlordRevShareInfo({ onClose, onJoinProgram }: LandlordRevShareInfoProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-[#A8F32C] text-black border-0">
            LANDLORD REV-SHARE PROGRAM
          </Badge>
          <h1 className="text-4xl mb-4">Earn Money From Every Application</h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Get paid for applications through Friend A Felon — with NO out-of-pocket screening costs. 
            We handle the screening, you keep the majority of the revenue.
          </p>
        </div>

        {/* How It Works */}
        <Card className="bg-gradient-to-br from-[#A8F32C]/20 via-[#121212] to-[#121212] border-[#A8F32C] p-8 mb-8">
          <h2 className="text-2xl mb-6 flex items-center gap-3">
            <DollarSign className="h-8 w-8 text-[#A8F32C]" />
            The Rev-Share Model
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-black/30 rounded-lg p-6">
              <div className="text-4xl text-[#A8F32C] mb-2">60%</div>
              <div className="text-white mb-2">Landlord Share</div>
              <div className="text-sm text-white/60">
                You receive 60% of each FastTrack application fee (min $30 per app)
              </div>
            </div>

            <div className="bg-black/30 rounded-lg p-6">
              <div className="text-4xl text-white/60 mb-2">40%</div>
              <div className="text-white mb-2">Friend A Felon Share</div>
              <div className="text-sm text-white/60">
                We keep 40% to cover SingleKey screening costs + platform fees
              </div>
            </div>
          </div>

          <div className="bg-[#A8F32C]/10 rounded-lg p-4 border border-[#A8F32C]/30">
            <h3 className="text-lg mb-3">Example Revenue:</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/60">User pays FastTrack fee:</span>
                <span className="text-white">$75</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">SingleKey screening cost (to FAF):</span>
                <span className="text-white">$18</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-2">
                <span className="text-white/60">Total revenue to split:</span>
                <span className="text-white">$57</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A8F32C]">Your 60% share:</span>
                <span className="text-[#A8F32C]">~$34</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">FAF keeps:</span>
                <span className="text-white/60">~$23</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Requirements for Full Payout */}
        <Card className="bg-[#121212] border-white/10 p-8 mb-8">
          <h2 className="text-2xl mb-6 flex items-center gap-3">
            <Shield className="h-8 w-8 text-[#A8F32C]" />
            Requirements for Full 60% Payout
          </h2>

          <div className="space-y-4 mb-6">
            <div className="flex gap-4">
              <CheckCircle className="h-6 w-6 text-[#A8F32C] flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-white mb-1">Rent to 1 Felon Per 20 Applications</h3>
                <p className="text-sm text-white/60">
                  For every 20 FastTrack applications you receive through Friend A Felon, 
                  you must successfully rent to at least 1 qualified applicant.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle className="h-6 w-6 text-[#A8F32C] flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-white mb-1">Provide Guaranteed Showings</h3>
                <p className="text-sm text-white/60">
                  Every applicant who pays for FastTrack must receive a showing. 
                  This is what makes our service valuable.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle className="h-6 w-6 text-[#A8F32C] flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-white mb-1">Provide Valid Denial Reasons</h3>
                <p className="text-sm text-white/60">
                  If you deny an applicant, you must provide a clear, legitimate reason 
                  (credit score, income verification, references, etc.).
                </p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
            <div className="flex gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <h4 className="text-yellow-500 mb-1">Reduced Payout Warning</h4>
                <p className="text-white/60">
                  If you receive 20 applications and do NOT rent to any qualified felons, 
                  you will only receive <span className="text-yellow-500">60% of your 60% share</span> 
                  (~36% of total instead of 60%). Funds are still released, but at the reduced rate.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Payment Schedule */}
        <Card className="bg-[#121212] border-white/10 p-8 mb-8">
          <h2 className="text-2xl mb-6 flex items-center gap-3">
            <Clock className="h-8 w-8 text-[#A8F32C]" />
            Payment Release Schedule
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-black/30 rounded-lg p-6">
              <h3 className="text-lg mb-3">Option 1: Per Application Batch</h3>
              <p className="text-white/60 mb-4">
                Funds are released after every <span className="text-[#A8F32C]">20 applications</span> received.
              </p>
              <div className="text-sm text-white/40">
                Faster payouts if you're getting lots of applications
              </div>
            </div>

            <div className="bg-black/30 rounded-lg p-6">
              <h3 className="text-lg mb-3">Option 2: Time-Based</h3>
              <p className="text-white/60 mb-4">
                Funds are released every <span className="text-[#A8F32C]">45 days</span>, regardless of application count.
              </p>
              <div className="text-sm text-white/40">
                Ensures you get paid even with slower application flow
              </div>
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-white/60">
            Whichever comes first triggers the payout
          </div>
        </Card>

        {/* Guaranteed Minimums */}
        <Card className="bg-gradient-to-br from-[#A8F32C]/10 via-transparent to-transparent border-[#A8F32C]/30 p-8 mb-8">
          <h2 className="text-2xl mb-6 flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-[#A8F32C]" />
            Guaranteed Minimum Earnings
          </h2>

          <p className="text-white/60 mb-6">
            You are guaranteed to earn <span className="text-[#A8F32C]">at least $30 per application</span>, 
            regardless of the application fee amount.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-black/30 rounded-lg p-4">
              <div className="text-sm text-white/60 mb-1">Standard User ($75):</div>
              <div className="text-2xl text-[#A8F32C]">~$34 per app</div>
            </div>

            <div className="bg-black/30 rounded-lg p-4">
              <div className="text-sm text-white/60 mb-1">FairPath+ User ($65):</div>
              <div className="text-2xl text-[#A8F32C]">~$30 per app</div>
            </div>
          </div>
        </Card>

        {/* Why This Works */}
        <Card className="bg-[#121212] border-white/10 p-8 mb-8">
          <h2 className="text-2xl mb-4">Why Landlords Love This Program</h2>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <CheckCircle className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
              <span className="text-white/60">
                <span className="text-white">Zero upfront costs</span> — No need to buy screening packages
              </span>
            </li>
            <li className="flex gap-3">
              <CheckCircle className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
              <span className="text-white/60">
                <span className="text-white">Passive income</span> — Earn money just for processing applications
              </span>
            </li>
            <li className="flex gap-3">
              <CheckCircle className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
              <span className="text-white/60">
                <span className="text-white">Quality applicants</span> — All applicants are pre-screened through SingleKey
              </span>
            </li>
            <li className="flex gap-3">
              <CheckCircle className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
              <span className="text-white/60">
                <span className="text-white">Fair requirements</span> — Only 1 rental per 20 apps to stay in good standing
              </span>
            </li>
            <li className="flex gap-3">
              <CheckCircle className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
              <span className="text-white/60">
                <span className="text-white">Flexible payments</span> — Get paid every 20 apps OR every 45 days
              </span>
            </li>
          </ul>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl mb-4">Ready to Start Earning?</h2>
          <p className="text-white/60 mb-6 max-w-2xl mx-auto">
            Join the Rev-Share Program and start receiving qualified applicants while earning 
            passive income on every application. No setup fees, no hidden costs.
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
