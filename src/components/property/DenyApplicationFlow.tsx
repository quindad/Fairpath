import { useState } from 'react';
import { XCircle, ArrowLeft, AlertTriangle, FileText } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

interface DenyApplicationFlowProps {
  applicant: any;
  onComplete: (denyData: any) => void;
  onBack: () => void;
}

export default function DenyApplicationFlow({ applicant, onComplete, onBack }: DenyApplicationFlowProps) {
  const [step, setStep] = useState<'reason' | 'confirm' | 'success'>('reason');
  const [denyData, setDenyData] = useState({
    reason: '',
    customReason: '',
    additionalNotes: ''
  });

  const denyReasons = [
    { id: 'income', label: 'Insufficient Income', description: 'Income to rent ratio below 2.5x requirement' },
    { id: 'credit', label: 'Credit Score Too Low', description: 'Credit score below minimum requirement of 600' },
    { id: 'eviction', label: 'Prior Eviction History', description: 'Previous eviction(s) found in screening' },
    { id: 'criminal', label: 'Criminal Background', description: 'Background check revealed disqualifying offense' },
    { id: 'employment', label: 'Employment Verification Failed', description: 'Unable to verify employment or income' },
    { id: 'references', label: 'Unsatisfactory References', description: 'Previous landlord provided negative reference' },
    { id: 'application', label: 'Incomplete Application', description: 'Required information or documentation missing' },
    { id: 'other', label: 'Other (Specify)', description: 'Custom denial reason' }
  ];

  const handleSelectReason = (reasonId: string) => {
    setDenyData({ ...denyData, reason: reasonId });
  };

  const handleContinue = () => {
    if (denyData.reason && (denyData.reason !== 'other' || denyData.customReason)) {
      setStep('confirm');
    }
  };

  const handleConfirm = () => {
    setStep('success');
    setTimeout(() => {
      onComplete(denyData);
    }, 2000);
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <Card className="bg-[#121212] border-red-500/50 p-8 max-w-2xl w-full text-center">
          <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="h-10 w-10 text-red-400" />
          </div>
          <h2 className="text-3xl mb-4">Application Denied</h2>
          <p className="text-white/60 text-lg mb-8">
            Denial notice sent to {applicant.name}
          </p>

          <div className="bg-black/50 border border-white/10 rounded-lg p-6 mb-8 text-left">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-sm text-white/60 mb-1">Applicant</div>
                <div className="text-white">{applicant.name}</div>
              </div>
              <div>
                <div className="text-sm text-white/60 mb-1">Property</div>
                <div className="text-white">{applicant.property}</div>
              </div>
            </div>
            <div className="border-t border-white/10 pt-4">
              <div className="text-sm text-white/60 mb-2">Denial Reason</div>
              <div className="text-white">
                {denyData.reason === 'other' 
                  ? denyData.customReason 
                  : denyReasons.find(r => r.id === denyData.reason)?.label
                }
              </div>
            </div>
          </div>

          <div className="space-y-2 text-sm text-white/60 mb-6">
            <p>✓ Applicant notified via email</p>
            <p>✓ Denial reason provided (FCRA compliant)</p>
            <p>✓ Application closed</p>
            {applicant.type === 'fasttrack' && (
              <p className="text-yellow-400">⚠ FastTrack revenue subject to compliance review</p>
            )}
          </div>

          <Button
            className="w-full bg-white/10 text-white hover:bg-white/20"
            onClick={onBack}
          >
            Back to Applications
          </Button>
        </Card>
      </div>
    );
  }

  if (step === 'confirm') {
    const selectedReason = denyReasons.find(r => r.id === denyData.reason);

    return (
      <div className="min-h-screen bg-black text-white p-6">
        <div className="max-w-3xl mx-auto">
          <Button
            variant="ghost"
            className="text-white/60 hover:text-white mb-6"
            onClick={() => setStep('reason')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <h1 className="text-3xl mb-8">Confirm Denial</h1>

          <Card className="bg-[#121212] border-white/10 p-8 mb-6">
            <h3 className="text-xl mb-6">Review Denial</h3>

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
                    <div className="text-white">{applicant.score}</div>
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
                <h4 className="text-lg text-white mb-4">Denial Reason</h4>
                <div className="bg-black/50 border border-red-500/30 rounded-lg p-4">
                  <div className="text-white mb-2">
                    {denyData.reason === 'other' ? denyData.customReason : selectedReason?.label}
                  </div>
                  <div className="text-sm text-white/60">
                    {denyData.reason === 'other' ? 'Custom reason' : selectedReason?.description}
                  </div>
                </div>
              </div>

              {denyData.additionalNotes && (
                <div>
                  <h4 className="text-lg text-white mb-4">Additional Notes</h4>
                  <div className="bg-black/50 border border-white/10 rounded-lg p-4">
                    <div className="text-white/80">{denyData.additionalNotes}</div>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {applicant.type === 'fasttrack' && (
            <Card className="bg-gradient-to-r from-yellow-500/10 to-transparent border-yellow-500/30 p-6 mb-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg text-white mb-3">FastTrack Compliance Notice</h4>
                  <div className="space-y-2 text-sm text-white/80">
                    <p>As a FastTrack application, this denial will be reviewed for compliance:</p>
                    <p>✓ Legitimate reason provided</p>
                    <p>✓ FCRA guidelines followed</p>
                    <p>⚠ Revenue share may be reduced if denial is deemed non-compliant</p>
                  </div>
                </div>
              </div>
            </Card>
          )}

          <Card className="bg-red-500/5 border-red-500/30 p-6 mb-6">
            <div className="flex items-start gap-3">
              <FileText className="h-6 w-6 text-red-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-lg text-white mb-3">Legal Notice (FCRA Compliance)</h4>
                <div className="space-y-2 text-sm text-white/80">
                  <p>By denying this application, you confirm that:</p>
                  <p>✓ The denial reason is legitimate and non-discriminatory</p>
                  <p>✓ The applicant will receive written notice of denial</p>
                  <p>✓ The applicant will be informed of their rights under FCRA</p>
                  <p>✓ The applicant can dispute the screening report if applicable</p>
                </div>
              </div>
            </div>
          </Card>

          <Button
            className="w-full bg-red-500 text-white hover:bg-red-600 text-lg py-6"
            onClick={handleConfirm}
          >
            <XCircle className="mr-2 h-5 w-5" />
            Confirm Denial & Send Notice
          </Button>
        </div>
      </div>
    );
  }

  // Reason selection step
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

        <h1 className="text-3xl mb-2">Deny Application</h1>
        <p className="text-white/60 mb-8">Select a reason for denying {applicant.name}'s application</p>

        {applicant.type === 'fasttrack' && (
          <Card className="bg-gradient-to-r from-yellow-500/10 to-transparent border-yellow-500/30 p-6 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg text-white mb-2">FastTrack Application</h3>
                <p className="text-white/80">
                  This is a FastTrack application. You must provide a legitimate denial reason to maintain compliance and receive your full revenue share.
                </p>
              </div>
            </div>
          </Card>
        )}

        <Card className="bg-[#121212] border-white/10 p-8 mb-6">
          <h3 className="text-xl mb-6">Select Denial Reason</h3>

          <div className="space-y-3 mb-8">
            {denyReasons.map((reason) => (
              <label
                key={reason.id}
                className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-all ${
                  denyData.reason === reason.id
                    ? 'bg-red-500/10 border-red-500/50'
                    : 'bg-black/50 border-white/10 hover:border-white/30'
                }`}
              >
                <input
                  type="radio"
                  name="denyReason"
                  value={reason.id}
                  checked={denyData.reason === reason.id}
                  onChange={() => handleSelectReason(reason.id)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="text-white mb-1">{reason.label}</div>
                  <div className="text-sm text-white/60">{reason.description}</div>
                </div>
              </label>
            ))}
          </div>

          {denyData.reason === 'other' && (
            <div className="mb-8">
              <label className="block text-sm text-white/60 mb-2">Custom Denial Reason *</label>
              <input
                type="text"
                placeholder="Enter specific reason for denial..."
                value={denyData.customReason}
                onChange={(e) => setDenyData({ ...denyData, customReason: e.target.value })}
                className="w-full bg-black/50 border border-white/20 text-white rounded-lg p-3"
              />
            </div>
          )}

          <div className="mb-8">
            <label className="block text-sm text-white/60 mb-2">Additional Notes (Optional)</label>
            <textarea
              placeholder="Add any additional context or information..."
              value={denyData.additionalNotes}
              onChange={(e) => setDenyData({ ...denyData, additionalNotes: e.target.value })}
              className="w-full bg-black/50 border border-white/20 text-white rounded-lg p-3 min-h-[100px]"
            />
          </div>

          <Button
            className="w-full bg-red-500 text-white hover:bg-red-600 text-lg py-6"
            onClick={handleContinue}
            disabled={!denyData.reason || (denyData.reason === 'other' && !denyData.customReason)}
          >
            Continue to Confirmation
          </Button>
        </Card>
      </div>
    </div>
  );
}
