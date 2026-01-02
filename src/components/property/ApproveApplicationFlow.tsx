import { useState } from 'react';
import { Calendar, Clock, CheckCircle, MapPin, Phone, Mail, ArrowLeft, Home } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';

interface ApproveApplicationFlowProps {
  applicant: any;
  property: any;
  onComplete: (showingData: any) => void;
  onBack: () => void;
}

export default function ApproveApplicationFlow({ applicant, property, onComplete, onBack }: ApproveApplicationFlowProps) {
  const [step, setStep] = useState<'schedule' | 'contact' | 'confirm' | 'success'>('schedule');
  const [showingData, setShowingData] = useState({
    date: '',
    time: '',
    contactMethod: 'phone',
    notes: ''
  });

  const handleSchedule = () => {
    if (showingData.date && showingData.time) {
      setStep('contact');
    }
  };

  const handleContact = () => {
    setStep('confirm');
  };

  const handleConfirm = () => {
    setStep('success');
    setTimeout(() => {
      onComplete(showingData);
    }, 2000);
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <Card className="bg-[#121212] border-[#A8F32C]/50 p-8 max-w-2xl w-full text-center">
          <div className="w-20 h-20 bg-[#A8F32C]/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-[#A8F32C]" />
          </div>
          <h2 className="text-3xl mb-4">Application Approved!</h2>
          <p className="text-white/60 text-lg mb-8">
            Showing scheduled with {applicant.name}
          </p>

          <div className="bg-black/50 border border-white/10 rounded-lg p-6 mb-8 text-left">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-white/60 mb-1">Applicant</div>
                <div className="text-white">{applicant.name}</div>
              </div>
              <div>
                <div className="text-sm text-white/60 mb-1">Property</div>
                <div className="text-white">{applicant.property}</div>
              </div>
              <div>
                <div className="text-sm text-white/60 mb-1">Showing Date</div>
                <div className="text-white">{new Date(showingData.date).toLocaleDateString()}</div>
              </div>
              <div>
                <div className="text-sm text-white/60 mb-1">Showing Time</div>
                <div className="text-white">{showingData.time}</div>
              </div>
            </div>
          </div>

          <div className="space-y-2 text-sm text-white/60 mb-6">
            <p>✓ Applicant notified via email and text</p>
            <p>✓ Calendar invite sent</p>
            <p>✓ Showing added to your schedule</p>
            {applicant.type === 'fasttrack' && (
              <p className="text-[#A8F32C]">✓ FastTrack compliance maintained - $75 earned</p>
            )}
          </div>

          <Button
            className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
            onClick={onBack}
          >
            Back to Applications
          </Button>
        </Card>
      </div>
    );
  }

  if (step === 'confirm') {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <div className="max-w-3xl mx-auto">
          <Button
            variant="ghost"
            className="text-white/60 hover:text-white mb-6"
            onClick={() => setStep('contact')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <h1 className="text-3xl mb-8">Confirm Approval</h1>

          <Card className="bg-[#121212] border-white/10 p-8 mb-6">
            <h3 className="text-xl mb-6">Review Details</h3>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg text-white mb-4">Applicant Information</h4>
                <div className="grid md:grid-cols-2 gap-4 bg-black/50 border border-white/10 rounded-lg p-4">
                  <div>
                    <div className="text-sm text-white/60 mb-1">Name</div>
                    <div className="text-white">{applicant.name}</div>
                  </div>
                  <div>
                    <div className="text-sm text-white/60 mb-1">FairPath Score</div>
                    <div className="text-[#A8F32C] text-xl">{applicant.score}</div>
                  </div>
                  <div>
                    <div className="text-sm text-white/60 mb-1">Property</div>
                    <div className="text-white">{applicant.property}</div>
                  </div>
                  <div>
                    <div className="text-sm text-white/60 mb-1">Application Type</div>
                    {applicant.type === 'fasttrack' ? (
                      <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                        FastTrack
                      </Badge>
                    ) : (
                      <Badge className="bg-white/10 text-white/60 border-white/20">
                        Regular
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg text-white mb-4">Showing Details</h4>
                <div className="grid md:grid-cols-2 gap-4 bg-black/50 border border-white/10 rounded-lg p-4">
                  <div>
                    <div className="text-sm text-white/60 mb-1">Date</div>
                    <div className="text-white">{new Date(showingData.date).toLocaleDateString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-white/60 mb-1">Time</div>
                    <div className="text-white">{showingData.time}</div>
                  </div>
                  <div>
                    <div className="text-sm text-white/60 mb-1">Contact Method</div>
                    <div className="text-white capitalize">{showingData.contactMethod}</div>
                  </div>
                </div>
              </div>

              {showingData.notes && (
                <div>
                  <h4 className="text-lg text-white mb-4">Notes</h4>
                  <div className="bg-black/50 border border-white/10 rounded-lg p-4">
                    <div className="text-white/80">{showingData.notes}</div>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {applicant.type === 'fasttrack' && (
            <Card className="bg-gradient-to-r from-[#A8F32C]/10 to-transparent border-[#A8F32C]/30 p-6 mb-6">
              <h4 className="text-lg text-white mb-3">FastTrack Compliance</h4>
              <div className="space-y-2 text-sm text-white/80">
                <p>✓ Showing scheduled within 48 hours</p>
                <p>✓ Guaranteed showing commitment fulfilled</p>
                <p>✓ You will receive your $75 FastTrack revenue share</p>
              </div>
            </Card>
          )}

          <Button
            className="w-full bg-green-500 text-white hover:bg-green-600 text-lg py-6"
            onClick={handleConfirm}
          >
            <CheckCircle className="mr-2 h-5 w-5" />
            Confirm Approval & Schedule Showing
          </Button>
        </div>
      </div>
    );
  }

  if (step === 'contact') {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <div className="max-w-3xl mx-auto">
          <Button
            variant="ghost"
            className="text-white/60 hover:text-white mb-6"
            onClick={() => setStep('schedule')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <h1 className="text-3xl mb-2">Contact Information</h1>
          <p className="text-white/60 mb-8">How should we notify the applicant?</p>

          <Card className="bg-[#121212] border-white/10 p-8 mb-6">
            <h3 className="text-xl mb-6">Notification Method</h3>

            <div className="space-y-4 mb-8">
              <label className="flex items-start gap-3 p-4 bg-black/50 border border-white/10 rounded-lg cursor-pointer hover:border-[#A8F32C]/50 transition-all">
                <input
                  type="radio"
                  name="contactMethod"
                  value="phone"
                  checked={showingData.contactMethod === 'phone'}
                  onChange={(e) => setShowingData({ ...showingData, contactMethod: e.target.value })}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="h-5 w-5 text-[#A8F32C]" />
                    <span className="text-white">Phone & Text Message</span>
                  </div>
                  <div className="text-sm text-white/60">
                    Send confirmation via phone call and text message
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-4 bg-black/50 border border-white/10 rounded-lg cursor-pointer hover:border-[#A8F32C]/50 transition-all">
                <input
                  type="radio"
                  name="contactMethod"
                  value="email"
                  checked={showingData.contactMethod === 'email'}
                  onChange={(e) => setShowingData({ ...showingData, contactMethod: e.target.value })}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="h-5 w-5 text-[#A8F32C]" />
                    <span className="text-white">Email Only</span>
                  </div>
                  <div className="text-sm text-white/60">
                    Send confirmation via email with calendar invite
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-4 bg-black/50 border border-white/10 rounded-lg cursor-pointer hover:border-[#A8F32C]/50 transition-all">
                <input
                  type="radio"
                  name="contactMethod"
                  value="both"
                  checked={showingData.contactMethod === 'both'}
                  onChange={(e) => setShowingData({ ...showingData, contactMethod: e.target.value })}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="h-5 w-5 text-[#A8F32C]" />
                    <Mail className="h-5 w-5 text-[#A8F32C]" />
                    <span className="text-white">Phone & Email (Recommended)</span>
                  </div>
                  <div className="text-sm text-white/60">
                    Send confirmation via all methods for best results
                  </div>
                </div>
              </label>
            </div>

            <div className="mb-8">
              <label className="block text-sm text-white/60 mb-2">Additional Notes (Optional)</label>
              <textarea
                placeholder="Special instructions, parking info, entry code, etc..."
                value={showingData.notes}
                onChange={(e) => setShowingData({ ...showingData, notes: e.target.value })}
                className="w-full bg-black/50 border border-white/20 text-white rounded-lg p-3 min-h-[100px]"
              />
            </div>

            <Button
              className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90 text-lg py-6"
              onClick={handleContact}
            >
              Continue to Confirmation
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  // Schedule step
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-3xl mx-auto">
        <Button
          variant="ghost"
          className="text-white/60 hover:text-white mb-6"
          onClick={onBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Profile
        </Button>

        <h1 className="text-3xl mb-2">Schedule Showing</h1>
        <p className="text-white/60 mb-8">Approve {applicant.name}'s application and schedule a showing</p>

        {applicant.type === 'fasttrack' && (
          <Card className="bg-gradient-to-r from-yellow-500/10 to-transparent border-yellow-500/30 p-6 mb-6">
            <div className="flex items-start gap-3">
              <Calendar className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg text-white mb-2">FastTrack Showing Required</h3>
                <p className="text-white/80">
                  As a FastTrack application, you must schedule a showing within 48 hours. You earned $75 for this application.
                </p>
              </div>
            </div>
          </Card>
        )}

        <Card className="bg-[#121212] border-white/10 p-8 mb-6">
          <div className="flex items-start gap-6 mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-[#A8F32C] to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-2xl text-black">{applicant.name.charAt(0)}</span>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl text-white mb-2">{applicant.name}</h3>
              <div className="text-white/60 mb-2">{applicant.property}</div>
              <div className="flex items-center gap-3">
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                  FairPath Score: {applicant.score}
                </Badge>
                {applicant.type === 'fasttrack' && (
                  <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                    FastTrack
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <h3 className="text-xl mb-6">Select Showing Date & Time</h3>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm text-white/60 mb-2">
                <Calendar className="inline h-4 w-4 mr-2" />
                Showing Date
              </label>
              <Input
                type="date"
                value={showingData.date}
                onChange={(e) => setShowingData({ ...showingData, date: e.target.value })}
                className="bg-black/50 border-white/20 text-white"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div>
              <label className="block text-sm text-white/60 mb-2">
                <Clock className="inline h-4 w-4 mr-2" />
                Showing Time
              </label>
              <Input
                type="time"
                value={showingData.time}
                onChange={(e) => setShowingData({ ...showingData, time: e.target.value })}
                className="bg-black/50 border-white/20 text-white"
              />
            </div>
          </div>

          <div className="bg-black/50 border border-white/10 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-white mb-1">Property Address</div>
                <div className="text-white/60">{applicant.property}</div>
              </div>
            </div>
          </div>

          <Button
            className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90 text-lg py-6"
            onClick={handleSchedule}
            disabled={!showingData.date || !showingData.time}
          >
            Continue to Contact Information
          </Button>
        </Card>
      </div>
    </div>
  );
}
