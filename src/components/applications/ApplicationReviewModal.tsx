import { useState } from 'react';
import { X, Check, XCircle, User, Briefcase, Home, Clock, DollarSign, AlertCircle, FileText, Phone, Mail, Calendar } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';

interface ApplicationReviewModalProps {
  application: {
    id: string;
    applicantName: string;
    applicantScore: number;
    appliedDate: string;
    position?: string; // For jobs
    property?: string; // For housing
    type: 'job' | 'housing';
    isFastTrack?: boolean;
    email: string;
    phone: string;
    convictionType: string[];
    yearsOut: number;
    workHistory?: string;
    resume?: string;
    whyGoodFit: string;
    availableStartDate: string;
    currentIncome?: string;
    references?: string;
  };
  onApprove: (notes: string) => void;
  onDeny: (reason: string) => void;
  onClose: () => void;
}

export default function ApplicationReviewModal({ application, onApprove, onDeny, onClose }: ApplicationReviewModalProps) {
  const [decision, setDecision] = useState<'approve' | 'deny' | null>(null);
  const [notes, setNotes] = useState('');
  const [denyReason, setDenyReason] = useState('');

  const handleApprove = () => {
    onApprove(notes);
  };

  const handleDeny = () => {
    if (!denyReason.trim()) {
      alert('Please provide a reason for denial');
      return;
    }
    onDeny(denyReason);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#121212] border border-white/10 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[#121212] border-b border-white/10 p-6 flex items-center justify-between z-10">
          <div>
            <h2 className="text-2xl text-white mb-1">
              {application.type === 'job' ? 'Job Application' : 'Housing Application'} Review
            </h2>
            <p className="text-white/60">
              {application.isFastTrack && (
                <span className="inline-flex items-center gap-1 text-yellow-400">
                  ⚡ FastTrack Application (+${application.type === 'housing' ? '75' : '0'} revenue)
                </span>
              )}
            </p>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Applicant Header */}
          <Card className="bg-black border-white/10 p-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-[#A8F32C]/20 flex items-center justify-center flex-shrink-0">
                <User className="h-8 w-8 text-[#A8F32C]" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl text-white mb-2">{application.applicantName}</h3>
                <div className="flex items-center gap-4 text-sm text-white/60 mb-3">
                  <span className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    {application.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    {application.phone}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-[#A8F32C]/20 px-3 py-1 rounded-lg">
                    <span className="text-[#A8F32C] font-bold">FairPath Score: {application.applicantScore}</span>
                  </div>
                  <div className="bg-blue-500/20 px-3 py-1 rounded-lg">
                    <span className="text-blue-400">{application.yearsOut} years since release</span>
                  </div>
                  {application.isFastTrack && (
                    <div className="bg-yellow-500/20 px-3 py-1 rounded-lg">
                      <span className="text-yellow-400">⚡ FastTrack</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Application Details */}
          <div className="grid grid-cols-2 gap-6">
            <Card className="bg-black border-white/10 p-6">
              <h3 className="text-lg text-white mb-4 flex items-center gap-2">
                {application.type === 'job' ? (
                  <><Briefcase className="h-5 w-5 text-[#A8F32C]" /> Position Details</>
                ) : (
                  <><Home className="h-5 w-5 text-[#A8F32C]" /> Property Details</>
                )}
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-white/60">Applied For:</span>
                  <p className="text-white mt-1">{application.position || application.property}</p>
                </div>
                <div>
                  <span className="text-white/60">Applied Date:</span>
                  <p className="text-white mt-1">{application.appliedDate}</p>
                </div>
                <div>
                  <span className="text-white/60">Available Start:</span>
                  <p className="text-white mt-1">{application.availableStartDate}</p>
                </div>
                {application.currentIncome && (
                  <div>
                    <span className="text-white/60">Current Income:</span>
                    <p className="text-white mt-1">{application.currentIncome}</p>
                  </div>
                )}
              </div>
            </Card>

            <Card className="bg-black border-white/10 p-6">
              <h3 className="text-lg text-white mb-4 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-purple-400" />
                Background Info
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-white/60">Conviction Types:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {application.convictionType.map((type) => (
                      <span key={type} className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded text-xs">
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-white/60">Time Since Release:</span>
                  <p className="text-white mt-1">{application.yearsOut} years</p>
                </div>
                <div>
                  <span className="text-white/60">FairPath Score:</span>
                  <p className="text-white mt-1">{application.applicantScore}/1000</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Why Good Fit */}
          <Card className="bg-black border-white/10 p-6">
            <h3 className="text-lg text-white mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-400" />
              Why They're a Good Fit
            </h3>
            <p className="text-white/80 whitespace-pre-wrap">{application.whyGoodFit}</p>
          </Card>

          {/* Work History / References */}
          {(application.workHistory || application.references) && (
            <div className="grid grid-cols-2 gap-6">
              {application.workHistory && (
                <Card className="bg-black border-white/10 p-6">
                  <h3 className="text-lg text-white mb-4">Work History</h3>
                  <p className="text-white/80 text-sm whitespace-pre-wrap">{application.workHistory}</p>
                </Card>
              )}
              {application.references && (
                <Card className="bg-black border-white/10 p-6">
                  <h3 className="text-lg text-white mb-4">References</h3>
                  <p className="text-white/80 text-sm whitespace-pre-wrap">{application.references}</p>
                </Card>
              )}
            </div>
          )}

          {/* FastTrack Notice */}
          {application.isFastTrack && (
            <div className="bg-gradient-to-r from-yellow-500/20 to-transparent border border-yellow-500/30 rounded-lg p-6">
              <h3 className="text-white mb-2 flex items-center gap-2">
                ⚡ FastTrack Application Requirements
              </h3>
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex gap-2">
                  <Check className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                  <span>Applicant paid ${application.type === 'housing' ? '75' : '65'} for professional background screening</span>
                </li>
                <li className="flex gap-2">
                  <Check className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                  <span>You MUST {application.type === 'housing' ? 'show the property' : 'conduct an interview'} or provide valid denial reason</span>
                </li>
                <li className="flex gap-2">
                  <Check className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                  <span>You receive ${application.type === 'housing' ? '75' : '0'} revenue from this application</span>
                </li>
              </ul>
            </div>
          )}

          {/* Decision Section */}
          {!decision && (
            <div className="flex gap-4">
              <Button
                onClick={() => setDecision('approve')}
                className="flex-1 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90 py-6"
              >
                <Check className="mr-2 h-5 w-5" />
                APPROVE APPLICATION
              </Button>
              <Button
                onClick={() => setDecision('deny')}
                variant="outline"
                className="flex-1 border-red-500/50 text-red-400 hover:bg-red-500/10 py-6"
              >
                <XCircle className="mr-2 h-5 w-5" />
                DENY APPLICATION
              </Button>
            </div>
          )}

          {/* Approve Form */}
          {decision === 'approve' && (
            <Card className="bg-[#A8F32C]/10 border-[#A8F32C]/30 p-6">
              <h3 className="text-xl text-white mb-4 flex items-center gap-2">
                <Check className="h-6 w-6 text-[#A8F32C]" />
                Approve Application
              </h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="approveNotes" className="text-white mb-2 block">
                    Next Steps / Notes for Applicant
                  </Label>
                  <Textarea
                    id="approveNotes"
                    placeholder={
                      application.type === 'housing'
                        ? "Example: Congratulations! Please contact me at (312) 555-0123 to schedule a property showing. Bring valid ID and proof of income."
                        : "Example: Congratulations! Please call (312) 555-0123 to schedule an interview. We're looking forward to meeting you!"
                    }
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="bg-black border-white/20 text-white min-h-32"
                  />
                </div>
                <div className="flex gap-3">
                  <Button onClick={handleApprove} className="flex-1 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">
                    <Check className="mr-2 h-4 w-4" />
                    CONFIRM APPROVAL
                  </Button>
                  <Button onClick={() => setDecision(null)} variant="outline" className="border-white/20 text-white">
                    CANCEL
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Deny Form */}
          {decision === 'deny' && (
            <Card className="bg-red-500/10 border-red-500/30 p-6">
              <h3 className="text-xl text-white mb-4 flex items-center gap-2">
                <XCircle className="h-6 w-6 text-red-400" />
                Deny Application
              </h3>
              <div className="space-y-4">
                {application.isFastTrack && (
                  <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4">
                    <p className="text-sm text-white/80">
                      <strong className="text-white">⚠️ FastTrack Denial:</strong> You must provide a valid, legal reason for denial. Discriminatory denials violate fair housing/employment laws.
                    </p>
                  </div>
                )}
                <div>
                  <Label htmlFor="denyReason" className="text-white mb-2 block">
                    Reason for Denial <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="denyReason"
                    placeholder={
                      application.type === 'housing'
                        ? "Example: Position has been filled. Income does not meet 3x rent requirement. Credit score below minimum threshold."
                        : "Example: Position has been filled. Seeking candidates with specific certifications. Not enough relevant experience."
                    }
                    value={denyReason}
                    onChange={(e) => setDenyReason(e.target.value)}
                    className="bg-black border-white/20 text-white min-h-32"
                  />
                  <p className="text-xs text-white/40 mt-2">Must be specific and non-discriminatory</p>
                </div>
                <div className="flex gap-3">
                  <Button onClick={handleDeny} variant="outline" className="flex-1 border-red-500/50 text-red-400 hover:bg-red-500/10">
                    <XCircle className="mr-2 h-4 w-4" />
                    CONFIRM DENIAL
                  </Button>
                  <Button onClick={() => setDecision(null)} variant="outline" className="border-white/20 text-white">
                    CANCEL
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
