import { Check, Download, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import LogoFinal from '../common/LogoFinal';

interface PaymentSuccessProps {
  amount: number;
  itemName: string;
  itemType: 'subscription' | 'fasttrack' | 'package' | 'addon';
  transactionId: string;
  onContinue: () => void;
}

export default function PaymentSuccess({
  amount,
  itemName,
  itemType,
  transactionId,
  onContinue
}: PaymentSuccessProps) {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

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
          <h1 className="text-4xl mb-3 text-white">Payment Successful!</h1>
          <p className="text-xl text-white/60">
            Thank you for your purchase
          </p>
        </div>

        {/* Receipt */}
        <Card className="bg-[#121212] border-white/10 p-8 mb-6">
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/10">
            <div>
              <h2 className="text-2xl mb-2 text-white">Receipt</h2>
              <p className="text-white/60">Transaction #{transactionId}</p>
            </div>
            <Button variant="outline" className="border-white/20 text-white">
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between text-white">
              <span className="text-white/60">Item</span>
              <span className="text-white">{itemName}</span>
            </div>
            <div className="flex justify-between text-white">
              <span className="text-white/60">Date</span>
              <span className="text-white">{currentDate}</span>
            </div>
            <div className="flex justify-between text-white">
              <span className="text-white/60">Payment Method</span>
              <span className="text-white">•••• 1234</span>
            </div>
            <div className="flex justify-between text-white">
              <span className="text-white/60">Transaction ID</span>
              <span className="text-white text-sm">{transactionId}</span>
            </div>
          </div>

          <div className="border-t border-white/10 pt-4">
            <div className="flex justify-between text-xl mb-2">
              <span className="text-white">Total Paid</span>
              <span className="text-[#A8F32C]">${amount.toFixed(2)}</span>
            </div>
            <p className="text-xs text-white/40 text-right">
              A receipt has been sent to your email
            </p>
          </div>
        </Card>

        {/* What's Next */}
        <Card className="bg-gradient-to-br from-[#A8F32C]/10 via-transparent to-transparent border-[#A8F32C]/30 p-8 mb-8">
          <h3 className="text-xl mb-4 text-white">What Happens Next:</h3>
          <div className="space-y-3 text-white/80">
            {itemType === 'subscription' && (
              <>
                <div className="flex gap-3">
                  <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                  <span>Your FairPath+ benefits are now active</span>
                </div>
                <div className="flex gap-3">
                  <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                  <span>Save $10 on every FastTrack application</span>
                </div>
                <div className="flex gap-3">
                  <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                  <span>You now have 7 marketplace claims per month</span>
                </div>
                <div className="flex gap-3">
                  <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                  <span>Your next billing date is {new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString()}</span>
                </div>
              </>
            )}
            {itemType === 'fasttrack' && (
              <>
                <div className="flex gap-3">
                  <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                  <span>Your FastTrack application has been submitted</span>
                </div>
                <div className="flex gap-3">
                  <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                  <span>Background screening will be completed within 24 hours</span>
                </div>
                <div className="flex gap-3">
                  <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                  <span>You'll receive a showing confirmation or valid denial reason</span>
                </div>
                <div className="flex gap-3">
                  <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                  <span>Track your application status in your dashboard</span>
                </div>
              </>
            )}
            {itemType === 'package' && (
              <>
                <div className="flex gap-3">
                  <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                  <span>Your account has been upgraded</span>
                </div>
                <div className="flex gap-3">
                  <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                  <span>All premium features are now available</span>
                </div>
                <div className="flex gap-3">
                  <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                  <span>You can now access your dashboard</span>
                </div>
              </>
            )}
          </div>
        </Card>

        {/* CTA */}
        <Button
          onClick={onContinue}
          className="w-full h-14 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90 text-lg"
        >
          Go to Dashboard
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
