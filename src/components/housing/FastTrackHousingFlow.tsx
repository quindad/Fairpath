import { useState } from 'react';
import { Home, FileCheck, DollarSign, Calendar, Check, Shield, CreditCard, Clock, ArrowLeft, MapPin } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';

interface FastTrackHousingFlowProps {
  property: any;
  hasFairPathPlus: boolean;
  onComplete: () => void;
  onBack: () => void;
}

export default function FastTrackHousingFlow({ property, hasFairPathPlus, onComplete, onBack }: FastTrackHousingFlowProps) {
  const [step, setStep] = useState<'intro' | 'consent' | 'payment' | 'processing' | 'success'>('intro');
  const [consent, setConsent] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  const fastTrackFee = hasFairPathPlus ? 65 : 75;
  const screeningCost = 17.99; // Our cost from SingleKey
  const propertyOwnerShare = fastTrackFee * 0.60; // 60% to property owner
  const platformRevenue = fastTrackFee - propertyOwnerShare;

  const handlePayment = () => {
    setStep('processing');
    setTimeout(() => {
      setStep('success');
    }, 2000);
  };

  if (step === 'success') {
    const scheduledDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); // 3 days from now
    
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <Card className="bg-[#121212] border-[#A8F32C]/50 p-8 max-w-2xl w-full">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-[#A8F32C]/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-[#A8F32C]" />
            </div>
            <h2 className="text-3xl mb-3">FastTrack Application Submitted!</h2>
            <p className="text-white/60 text-lg">
              Your guaranteed showing has been scheduled
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <Card className="bg-black/50 border-white/10 p-6">
              <div className="flex items-start gap-4 mb-4">
                <Home className="h-6 w-6 text-[#A8F32C] flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-lg text-white mb-2">{property.address}</h3>
                  <div className="text-white/60">{property.city}, {property.state}</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl text-white mb-1">${property.rent}</div>
                  <div className="text-sm text-white/60">per month</div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div>
                  <div className="text-sm text-white/60 mb-1">Application Status</div>
                  <Badge className="bg-yellow-400/20 text-yellow-400 border-yellow-400/30">
                    Screening in Progress
                  </Badge>
                </div>
                <div>
                  <div className="text-sm text-white/60 mb-1">Application ID</div>
                  <div className="text-white font-mono text-sm">FT-{Math.random().toString(36).substr(2, 8).toUpperCase()}</div>
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-to-r from-green-500/10 to-transparent border-green-500/30 p-6">
              <div className="flex items-start gap-4">
                <Calendar className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-lg text-white mb-2">Guaranteed Showing Scheduled</h3>
                  <div className="text-white/80 mb-3">
                    {scheduledDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                  <div className="text-sm text-white/60">
                    You'll receive confirmation via email and text message 24 hours before your showing.
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-to-r from-blue-500/10 to-transparent border-blue-500/30 p-6">
              <div className="flex items-start gap-4">
                <Shield className="h-6 w-6 text-blue-400 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-lg text-white mb-2">Screening in Progress</h3>
                  <div className="text-white/80 mb-3">
                    SingleKey background screening initiated
                  </div>
                  <div className="text-sm text-white/60 mb-3">
                    Results typically available within 24-48 hours. You'll be notified when complete.
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-white/10 rounded-full h-2">
                      <div className="bg-blue-400 rounded-full h-2 w-1/3 animate-pulse"></div>
                    </div>
                    <span className="text-sm text-white/60">Processing...</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-3">
            <Button
              className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
              onClick={onComplete}
            >
              Go to My Applications
            </Button>
            <Button
              variant="outline"
              className="w-full border-white/20 text-white hover:bg-white/5"
              onClick={onBack}
            >
              Browse More Properties
            </Button>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 space-y-2 text-sm text-white/60">
            <p>✓ Payment of ${fastTrackFee} processed successfully</p>
            <p>✓ Background screening ordered from SingleKey</p>
            <p>✓ Property owner notified of guaranteed showing</p>
            <p>✓ Confirmation emails sent</p>
          </div>
        </Card>
      </div>
    );
  }

  if (step === 'processing') {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <Card className="bg-[#121212] border-white/10 p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 border-4 border-[#A8F32C] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-2xl mb-3">Processing Application...</h2>
          <div className="space-y-2 text-white/60">
            <p className="flex items-center gap-2 justify-center">
              <Check className="h-4 w-4 text-green-400" />
              Processing payment
            </p>
            <p className="flex items-center gap-2 justify-center">
              <Clock className="h-4 w-4 text-yellow-400" />
              Ordering background screening
            </p>
            <p className="flex items-center gap-2 justify-center text-white/40">
              <Clock className="h-4 w-4" />
              Scheduling showing
            </p>
          </div>
        </Card>
      </div>
    );
  }

  if (step === 'payment') {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            className="text-white/60 hover:text-white mb-6"
            onClick={() => setStep('consent')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <h1 className="text-3xl mb-2">Complete Payment</h1>
          <p className="text-white/60 mb-8">Secure payment powered by Stripe</p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Payment Form */}
            <div>
              <Card className="bg-[#121212] border-white/10 p-6">
                <h3 className="text-xl mb-6">Payment Method</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Card Number</label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                      <Input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="bg-black/50 border-white/20 text-white pl-10"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-white/60 mb-2">Expiry</label>
                      <Input
                        type="text"
                        placeholder="MM/YY"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        className="bg-black/50 border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/60 mb-2">CVC</label>
                      <Input
                        type="text"
                        placeholder="123"
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value)}
                        className="bg-black/50 border-white/20 text-white"
                      />
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full mt-6 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
                  onClick={handlePayment}
                >
                  Pay ${fastTrackFee}
                </Button>

                {hasFairPathPlus && (
                  <div className="mt-4 p-3 bg-[#A8F32C]/10 border border-[#A8F32C]/30 rounded-lg text-center">
                    <div className="text-sm text-[#A8F32C]">
                      FairPath+ Member Discount Applied: Save $10
                    </div>
                  </div>
                )}
              </Card>
            </div>

            {/* Summary */}
            <div>
              <Card className="bg-[#121212] border-white/10 p-6 mb-6">
                <h3 className="text-xl mb-6">Application Summary</h3>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <div className="text-sm text-white/60 mb-1">Property</div>
                    <div className="text-white">{property.address}</div>
                    <div className="text-white/60 text-sm">{property.city}, {property.state}</div>
                  </div>
                  <div>
                    <div className="text-sm text-white/60 mb-1">Monthly Rent</div>
                    <div className="text-white text-xl">${property.rent}</div>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">FastTrack Fee</span>
                    <span className={hasFairPathPlus ? 'text-white/60 line-through' : 'text-white'}>
                      ${hasFairPathPlus ? 75 : fastTrackFee}
                    </span>
                  </div>
                  {hasFairPathPlus && (
                    <div className="flex items-center justify-between">
                      <span className="text-[#A8F32C]">FairPath+ Discount</span>
                      <span className="text-[#A8F32C]">-$10</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-xl pt-2 border-t border-white/10">
                    <span className="text-white">Total</span>
                    <span className="text-[#A8F32C]">${fastTrackFee}</span>
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-green-500/10 to-transparent border-green-500/30 p-6">
                <h4 className="text-white mb-3">What You Get:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/80">Guaranteed property showing</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/80">Complete background screening</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/80">Priority application review</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/80">Legitimate denial reason if not approved</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'consent') {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <div className="max-w-3xl mx-auto">
          <Button
            variant="ghost"
            className="text-white/60 hover:text-white mb-6"
            onClick={() => setStep('intro')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <h1 className="text-3xl mb-2">Background Screening Consent</h1>
          <p className="text-white/60 mb-8">
            Required by law for rental applications
          </p>

          <Card className="bg-[#121212] border-white/10 p-8 mb-6">
            <div className="flex items-start gap-4 mb-6">
              <Shield className="h-8 w-8 text-blue-400 flex-shrink-0" />
              <div>
                <h3 className="text-xl mb-2">SingleKey Background Screening</h3>
                <p className="text-white/60">
                  Powered by SingleKey, a leading tenant screening provider
                </p>
              </div>
            </div>

            <div className="bg-black/50 border border-white/10 rounded-lg p-6 mb-6">
              <h4 className="text-white mb-4">The screening will include:</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-white mb-1">Criminal Background Check</div>
                    <div className="text-sm text-white/60">National and local records</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-white mb-1">Eviction History</div>
                    <div className="text-sm text-white/60">Past rental disputes</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-white mb-1">Credit Report</div>
                    <div className="text-sm text-white/60">Financial history overview</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-6 text-sm text-white/80 max-h-64 overflow-y-auto">
              <p className="mb-3">
                By checking the box below, you authorize FairPath Industries and {property.landlord || 'the property owner'} to obtain consumer reports and investigative consumer reports prepared by SingleKey for the purpose of evaluating your rental application.
              </p>
              <p className="mb-3">
                You understand that this may include information about your character, general reputation, personal characteristics, and mode of living. You acknowledge that you have the right to request additional disclosures regarding the nature and scope of any investigative consumer report.
              </p>
              <p>
                Your information will be handled in accordance with the Fair Credit Reporting Act (FCRA) and all applicable state and local laws.
              </p>
            </div>

            <label className="flex items-start gap-3 cursor-pointer p-4 bg-black/50 border border-white/10 rounded-lg hover:border-white/20 transition-colors">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1"
              />
              <span className="text-white/80">
                I have read and agree to the background screening disclosure and authorize the reports described above.
              </span>
            </label>
          </Card>

          <Button
            className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
            onClick={() => setStep('payment')}
            disabled={!consent}
          >
            Continue to Payment
          </Button>
        </div>
      </div>
    );
  }

  // Intro step
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          className="text-white/60 hover:text-white mb-6"
          onClick={onBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Property
        </Button>

        <div className="text-center mb-8">
          <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30 mb-4">
            FastTrack Application
          </Badge>
          <h1 className="text-4xl mb-3">Apply with FastTrack</h1>
          <p className="text-white/60 text-lg">
            Get a guaranteed showing and priority review
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-[#A8F32C]/10 to-transparent border-[#A8F32C]/30 p-6">
            <Calendar className="h-10 w-10 text-[#A8F32C] mb-4" />
            <h3 className="text-xl mb-2">Guaranteed Showing</h3>
            <p className="text-white/60">
              Property owner commits to showing you the unit within 3 business days
            </p>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/10 to-transparent border-blue-500/30 p-6">
            <Shield className="h-10 w-10 text-blue-400 mb-4" />
            <h3 className="text-xl mb-2">Professional Screening</h3>
            <p className="text-white/60">
              Complete background check handled by SingleKey
            </p>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/10 to-transparent border-green-500/30 p-6">
            <FileCheck className="h-10 w-10 text-green-400 mb-4" />
            <h3 className="text-xl mb-2">Fair Review Process</h3>
            <p className="text-white/60">
              If denied, receive legitimate reason in writing
            </p>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-transparent border-purple-500/30 p-6">
            <DollarSign className="h-10 w-10 text-purple-400 mb-4" />
            <h3 className="text-xl mb-2">One Simple Fee</h3>
            <p className="text-white/60">
              ${fastTrackFee} includes screening and guaranteed showing
              {hasFairPathPlus && <span className="block text-[#A8F32C] mt-1">FairPath+ member discount applied!</span>}
            </p>
          </Card>
        </div>

        <Card className="bg-[#121212] border-white/10 p-8 mb-6">
          <h3 className="text-xl mb-6">How FastTrack Works</h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-[#A8F32C]/20 rounded-full flex items-center justify-center text-[#A8F32C] flex-shrink-0">
                1
              </div>
              <div>
                <div className="text-white mb-1">Consent to Screening</div>
                <div className="text-white/60 text-sm">
                  Authorize background check (required by law)
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-[#A8F32C]/20 rounded-full flex items-center justify-center text-[#A8F32C] flex-shrink-0">
                2
              </div>
              <div>
                <div className="text-white mb-1">Pay FastTrack Fee</div>
                <div className="text-white/60 text-sm">
                  ${fastTrackFee} covers screening and guaranteed showing
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-[#A8F32C]/20 rounded-full flex items-center justify-center text-[#A8F32C] flex-shrink-0">
                3
              </div>
              <div>
                <div className="text-white mb-1">Screening & Scheduling</div>
                <div className="text-white/60 text-sm">
                  Background check runs and showing is scheduled
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-[#A8F32C]/20 rounded-full flex items-center justify-center text-[#A8F32C] flex-shrink-0">
                4
              </div>
              <div>
                <div className="text-white mb-1">View Property & Receive Decision</div>
                <div className="text-white/60 text-sm">
                  Tour the unit and get approval/denial within 48 hours
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Button
          className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90 text-lg py-6"
          onClick={() => setStep('consent')}
        >
          Start FastTrack Application - ${fastTrackFee}
        </Button>

        {!hasFairPathPlus && (
          <div className="mt-4 text-center">
            <p className="text-white/60 text-sm">
              FairPath+ members save $10 per application.{' '}
              <button className="text-[#A8F32C] hover:underline">
                Upgrade now
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
