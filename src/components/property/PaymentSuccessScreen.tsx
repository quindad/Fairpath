import { CheckCircle, DollarSign, ArrowRight, Download } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import LogoWithTagline from '../common/LogoWithTagline';

interface PaymentSuccessScreenProps {
  planName: string;
  amount: string;
  planType: 'per-listing' | 'view-package' | 'unlimited';
  onContinue: () => void;
}

export default function PaymentSuccessScreen({ planName, amount, planType, onContinue }: PaymentSuccessScreenProps) {
  const confirmationNumber = `FAF-${Date.now().toString().slice(-8)}`;

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#A8F32C]/20 mb-6 animate-pulse">
            <CheckCircle className="h-12 w-12 text-[#A8F32C]" />
          </div>
          
          <h1 className="text-4xl mb-3">Payment Successful!</h1>
          <p className="text-xl text-white/60">
            Welcome to Friend A Felon Property Marketplace
          </p>
        </div>

        {/* Receipt Card */}
        <Card className="bg-gradient-to-br from-[#A8F32C]/10 via-[#121212] to-[#121212] border-[#A8F32C] p-8 mb-6">
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/10">
            <LogoWithTagline size="sm" showCompanyName={false} />
            <Badge className="bg-[#A8F32C] text-black border-0">
              PAID
            </Badge>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between">
              <span className="text-white/60">Plan Selected:</span>
              <span className="text-white">{planName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Amount Paid:</span>
              <span className="text-2xl text-[#A8F32C]">{amount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Confirmation #:</span>
              <span className="text-white font-mono">{confirmationNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Date:</span>
              <span className="text-white">{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Payment Method:</span>
              <span className="text-white">•••• •••• •••• 4242</span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full border-white/20 text-white hover:bg-white/5"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Receipt
          </Button>
        </Card>

        {/* What's Next */}
        <Card className="bg-[#121212] border-white/10 p-6 mb-6">
          <h2 className="text-xl mb-4">What's Next?</h2>
          
          {planType === 'per-listing' && (
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#A8F32C] text-black flex items-center justify-center text-xs">1</div>
                <div>
                  <div className="text-white mb-1">List Your Properties</div>
                  <div className="text-white/60">Add property details and choose Basic or Featured listing</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#A8F32C] text-black flex items-center justify-center text-xs">2</div>
                <div>
                  <div className="text-white mb-1">Receive FastTrack Applications</div>
                  <div className="text-white/60">Earn $30 for every completed application with guaranteed showings</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#A8F32C] text-black flex items-center justify-center text-xs">3</div>
                <div>
                  <div className="text-white mb-1">Review & Schedule Showings</div>
                  <div className="text-white/60">View SingleKey background reports and schedule property showings</div>
                </div>
              </div>
            </div>
          )}

          {planType === 'view-package' && (
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#A8F32C] text-black flex items-center justify-center text-xs">1</div>
                <div>
                  <div className="text-white mb-1">Browse Applicants</div>
                  <div className="text-white/60">Use your views to browse qualified applicants actively seeking housing</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#A8F32C] text-black flex items-center justify-center text-xs">2</div>
                <div>
                  <div className="text-white mb-1">Connect with Renters</div>
                  <div className="text-white/60">Reach out to applicants who match your property requirements</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#A8F32C] text-black flex items-center justify-center text-xs">3</div>
                <div>
                  <div className="text-white mb-1">Fill Your Units Faster</div>
                  <div className="text-white/60">Access pre-screened tenants ready to apply</div>
                </div>
              </div>
            </div>
          )}

          {planType === 'unlimited' && (
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#A8F32C] text-black flex items-center justify-center text-xs">1</div>
                <div>
                  <div className="text-white mb-1">List Unlimited Properties</div>
                  <div className="text-white/60">Add your entire portfolio with priority placement</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#A8F32C] text-black flex items-center justify-center text-xs">2</div>
                <div>
                  <div className="text-white mb-1">Maximize FastTrack Revenue</div>
                  <div className="text-white/60">Earn $30 per application across all your properties</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#A8F32C] text-black flex items-center justify-center text-xs">3</div>
                <div>
                  <div className="text-white mb-1">Access Premium Features</div>
                  <div className="text-white/60">Portfolio analytics, dedicated support, and priority visibility</div>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* FastTrack Revenue Reminder */}
        <Card className="bg-[#A8F32C]/10 border-[#A8F32C]/30 p-6 mb-8">
          <div className="flex items-start gap-3">
            <DollarSign className="h-6 w-6 text-[#A8F32C] flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-white mb-2">FastTrack Revenue Enabled</h3>
              <p className="text-sm text-white/60 mb-3">
                You'll earn <span className="text-[#A8F32C]">$30 for every FastTrack application</span> you receive. 
                Applications are paid upfront by applicants, screened through SingleKey, and come with 
                guaranteed showing requirements.
              </p>
              <p className="text-xs text-white/40">
                Payouts every 20 applications or every 45 days, whichever comes first.
              </p>
            </div>
          </div>
        </Card>

        {/* CTA */}
        <Button
          onClick={onContinue}
          className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90 h-12"
        >
          Go to Dashboard
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>

        <p className="text-center text-xs text-white/40 mt-4">
          A receipt has been sent to your email
        </p>
      </div>
    </div>
  );
}
