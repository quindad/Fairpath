import { CheckCircle, Download, Home, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

interface PaymentConfirmationProps {
  amount: number;
  description: string;
  transactionId: string;
  paymentMethod: {
    type: 'stripe' | 'paypal';
    last4?: string;
  };
  onContinue: () => void;
  onDownloadReceipt?: () => void;
  additionalDetails?: Array<{
    label: string;
    value: string;
  }>;
}

export default function PaymentConfirmation({
  amount,
  description,
  transactionId,
  paymentMethod,
  onContinue,
  onDownloadReceipt,
  additionalDetails = []
}: PaymentConfirmationProps) {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="max-w-2xl w-full space-y-6">
        {/* Success Icon */}
        <div className="text-center">
          <div className="w-24 h-24 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center mx-auto mb-6 animate-pulse">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <h1 className="text-4xl mb-3 text-white">Payment Successful!</h1>
          <p className="text-xl text-white/80">Your payment has been processed</p>
        </div>

        {/* Transaction Details */}
        <Card className="bg-[#121212] border-white/10 p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-start pb-4 border-b border-white/10">
              <div>
                <div className="text-sm text-white/60 mb-1">Amount Paid</div>
                <div className="text-3xl text-[#A8F32C]">${amount.toFixed(2)}</div>
              </div>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                Completed
              </Badge>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-white/60">Description:</span>
                <span className="text-white text-right">{description}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-white/60">Transaction ID:</span>
                <span className="text-white font-mono text-sm">{transactionId}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-white/60">Date & Time:</span>
                <span className="text-white">{currentDate}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-white/60">Payment Method:</span>
                <span className="text-white">
                  {paymentMethod.type === 'stripe' && paymentMethod.last4
                    ? `Card ending in ${paymentMethod.last4}`
                    : paymentMethod.type === 'paypal'
                    ? 'PayPal'
                    : 'Payment Card'}
                </span>
              </div>

              {additionalDetails.map((detail, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-white/60">{detail.label}:</span>
                  <span className="text-white text-right">{detail.value}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Next Steps */}
        <Card className="bg-gradient-to-r from-blue-500/10 to-transparent border-blue-500/30 p-6">
          <h3 className="text-lg mb-3 text-white">What Happens Next?</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 text-white text-sm">
                1
              </div>
              <div>
                <div className="text-white">Confirmation Email Sent</div>
                <div className="text-sm text-white/60">Check your inbox for receipt and details</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 text-white text-sm">
                2
              </div>
              <div>
                <div className="text-white">Application Processing</div>
                <div className="text-sm text-white/60">Your application is now being reviewed</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 text-white text-sm">
                3
              </div>
              <div>
                <div className="text-white">You'll Hear Back Soon</div>
                <div className="text-sm text-white/60">Expect a response within 24-48 hours</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex gap-3">
          {onDownloadReceipt && (
            <Button
              variant="outline"
              className="flex-1 border-white/20 text-white"
              onClick={onDownloadReceipt}
            >
              <Download className="mr-2 h-4 w-4" />
              Download Receipt
            </Button>
          )}
          <Button
            className="flex-1 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
            onClick={onContinue}
          >
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Support */}
        <div className="text-center text-sm text-white/60">
          Questions about your payment? Contact support@friendafelon.com
        </div>
      </div>
    </div>
  );
}
