import { CheckCircle, XCircle, Calendar, DollarSign, ArrowLeft, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import LogoFinal from '../common/LogoFinal';

interface EmployerApplicationApprovalProps {
  application: any;
  action: 'approve' | 'reject';
  onComplete: (decision: 'approved' | 'rejected', data: any) => void;
  onCancel: () => void;
}

export default function EmployerApplicationApproval({ application, action, onComplete, onCancel }: EmployerApplicationApprovalProps) {
  const [formData, setFormData] = useState({
    // Approval data
    interviewDate: '',
    interviewTime: '',
    interviewLocation: '',
    interviewType: 'in-person',
    startingSalary: '',
    benefits: '',
    additionalNotes: '',
    
    // Rejection data
    rejectionReason: '',
    specificReason: '',
    feedback: '',
    allowReapply: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(action === 'approve' ? 'approved' : 'rejected', formData);
  };

  if (action === 'approve') {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="border-b border-white/5 bg-[#121212]">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <LogoFinal size="md" />
              <Button onClick={onCancel} variant="ghost" className="text-white/60">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#A8F32C]/20 mb-4">
              <CheckCircle className="h-8 w-8 text-[#A8F32C]" />
            </div>
            <h1 className="text-3xl mb-2">Schedule Interview</h1>
            <p className="text-white/60">
              Invite {application.applicantName} for an interview
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* WOTC Reminder */}
            {application.wotcEligible && (
              <Card className="bg-[#A8F32C]/10 border-[#A8F32C]/30 p-6 mb-6">
                <div className="flex items-start gap-3">
                  <DollarSign className="h-6 w-6 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-white mb-2">WOTC Eligible Candidate</h3>
                    <p className="text-sm text-white/60 mb-2">
                      This applicant qualifies for up to <span className="text-[#A8F32C]">${application.wotcValue.toLocaleString()}</span> in WOTC tax credits.
                    </p>
                    <p className="text-xs text-white/40">
                      Remember: File Form 8850 within 28 days of hire to claim the credit.
                    </p>
                  </div>
                </div>
              </Card>
            )}

            <Card className="bg-[#121212] border-white/10 p-6 mb-6">
              <h2 className="text-xl mb-4">Interview Details</h2>
              
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="interviewDate" className="text-white mb-2 block">
                      Interview Date <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id="interviewDate"
                      type="date"
                      required
                      value={formData.interviewDate}
                      onChange={(e) => setFormData({ ...formData, interviewDate: e.target.value })}
                      className="w-full bg-black border border-white/20 rounded-lg px-3 py-2 text-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="interviewTime" className="text-white mb-2 block">
                      Interview Time <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id="interviewTime"
                      type="time"
                      required
                      value={formData.interviewTime}
                      onChange={(e) => setFormData({ ...formData, interviewTime: e.target.value })}
                      className="w-full bg-black border border-white/20 rounded-lg px-3 py-2 text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="interviewType" className="text-white mb-2 block">
                    Interview Type <span className="text-red-500">*</span>
                  </Label>
                  <select
                    id="interviewType"
                    required
                    value={formData.interviewType}
                    onChange={(e) => setFormData({ ...formData, interviewType: e.target.value })}
                    className="w-full bg-black border border-white/20 rounded-lg px-3 py-2 text-white"
                  >
                    <option value="in-person">In-Person Interview</option>
                    <option value="video">Video Call (Zoom/Teams)</option>
                    <option value="phone">Phone Interview</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="interviewLocation" className="text-white mb-2 block">
                    Location/Meeting Link <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="interviewLocation"
                    type="text"
                    required
                    placeholder="Address or video meeting link"
                    value={formData.interviewLocation}
                    onChange={(e) => setFormData({ ...formData, interviewLocation: e.target.value })}
                    className="bg-black border-white/20 text-white"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startingSalary" className="text-white mb-2 block">
                      Starting Salary Range
                    </Label>
                    <Input
                      id="startingSalary"
                      type="text"
                      placeholder="e.g., $15-18/hr"
                      value={formData.startingSalary}
                      onChange={(e) => setFormData({ ...formData, startingSalary: e.target.value })}
                      className="bg-black border-white/20 text-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="benefits" className="text-white mb-2 block">
                      Benefits Package
                    </Label>
                    <Input
                      id="benefits"
                      type="text"
                      placeholder="e.g., Health, 401k, PTO"
                      value={formData.benefits}
                      onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                      className="bg-black border-white/20 text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="additionalNotes" className="text-white mb-2 block">
                    Additional Notes (Optional)
                  </Label>
                  <textarea
                    id="additionalNotes"
                    rows={4}
                    placeholder="What to bring, parking info, who they'll meet with, etc."
                    value={formData.additionalNotes}
                    onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                    className="w-full bg-black border border-white/20 rounded-lg px-3 py-2 text-white"
                  />
                </div>
              </div>
            </Card>

            <Card className="bg-[#A8F32C]/10 border-[#A8F32C]/30 p-6 mb-6">
              <h3 className="text-white mb-3">What Happens Next:</h3>
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                  <span>{application.applicantName} receives interview invitation via email and app notification</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                  <span>They can confirm or request to reschedule</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                  <span>Interview is added to both your calendars</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                  <span>You'll receive a reminder 24 hours before the interview</span>
                </li>
              </ul>
            </Card>

            <div className="flex gap-4">
              <Button
                type="button"
                onClick={onCancel}
                variant="outline"
                className="flex-1 border-white/20 text-white"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Send Interview Invitation
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // REJECT FLOW
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="border-b border-white/5 bg-[#121212]">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <LogoFinal size="md" />
            <Button onClick={onCancel} variant="ghost" className="text-white/60">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Cancel
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/20 mb-4">
            <XCircle className="h-8 w-8 text-red-500" />
          </div>
          <h1 className="text-3xl mb-2">Reject Application</h1>
          <p className="text-white/60">
            Send rejection notice to {application.applicantName}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="bg-red-500/10 border-red-500/30 p-6 mb-6">
            <h2 className="text-xl mb-4 text-red-500 flex items-center gap-2">
              <AlertCircle className="h-6 w-6" />
              Important: Fair Hiring Practices
            </h2>
            <p className="text-sm text-white/60 mb-4">
              You must provide a legitimate, non-discriminatory reason for rejection. Acceptable reasons include:
            </p>
            <ul className="text-sm text-white/60 space-y-1 mb-4">
              <li>• Insufficient experience or qualifications</li>
              <li>• Skills mismatch for the position</li>
              <li>• Selected a more qualified candidate</li>
              <li>• Position requirements not met</li>
              <li>• Specific job requirement conflicts (e.g., can't lift 50 lbs, no valid license)</li>
            </ul>
            <p className="text-sm text-red-500">
              Discrimination based on conviction type alone (without legitimate business reason) is illegal in many states.
            </p>
          </Card>

          <Card className="bg-[#121212] border-white/10 p-6 mb-6">
            <h2 className="text-xl mb-4">Rejection Reason</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="rejectionReason" className="text-white mb-2 block">
                  Primary Reason <span className="text-red-500">*</span>
                </Label>
                <select
                  id="rejectionReason"
                  required
                  value={formData.rejectionReason}
                  onChange={(e) => setFormData({ ...formData, rejectionReason: e.target.value })}
                  className="w-full bg-black border border-white/20 rounded-lg px-3 py-2 text-white"
                >
                  <option value="">Select reason...</option>
                  <option value="qualifications">Insufficient Qualifications</option>
                  <option value="experience">Lack of Required Experience</option>
                  <option value="skills">Skills Mismatch</option>
                  <option value="selected">Selected Another Candidate</option>
                  <option value="requirements">Position Requirements Not Met</option>
                  <option value="other">Other Legitimate Reason</option>
                </select>
              </div>

              <div>
                <Label htmlFor="specificReason" className="text-white mb-2 block">
                  Specific Details <span className="text-red-500">*</span>
                </Label>
                <textarea
                  id="specificReason"
                  rows={4}
                  required
                  placeholder="Provide specific, objective details about why this candidate isn't the right fit..."
                  value={formData.specificReason}
                  onChange={(e) => setFormData({ ...formData, specificReason: e.target.value })}
                  className="w-full bg-black border border-white/20 rounded-lg px-3 py-2 text-white"
                />
                <p className="text-xs text-white/40 mt-2">
                  Be specific and objective. This will be sent to the applicant.
                </p>
              </div>

              <div>
                <Label htmlFor="feedback" className="text-white mb-2 block">
                  Constructive Feedback (Optional but Recommended)
                </Label>
                <textarea
                  id="feedback"
                  rows={3}
                  placeholder="Advice for improving their application or skills for future opportunities..."
                  value={formData.feedback}
                  onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                  className="w-full bg-black border border-white/20 rounded-lg px-3 py-2 text-white"
                />
                <p className="text-xs text-white/40 mt-2">
                  Constructive feedback helps applicants improve and reflects well on your company.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="allowReapply"
                  checked={formData.allowReapply}
                  onChange={(e) => setFormData({ ...formData, allowReapply: e.target.checked })}
                  className="w-4 h-4"
                />
                <Label htmlFor="allowReapply" className="text-white cursor-pointer">
                  Allow them to apply for future openings
                </Label>
              </div>
            </div>
          </Card>

          <Card className="bg-yellow-500/10 border-yellow-500/30 p-6 mb-6">
            <h3 className="text-yellow-500 mb-3">What Happens Next:</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li className="flex items-start gap-2">
                <XCircle className="h-4 w-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                <span>{application.applicantName} receives rejection notification with your reason</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="h-4 w-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                <span>They can review the feedback and understand why</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="h-4 w-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                <span>They can leave a review of their experience with your company</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="h-4 w-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                <span>If allowed, they can apply for future positions</span>
              </li>
            </ul>
          </Card>

          <div className="flex gap-4">
            <Button
              type="button"
              onClick={onCancel}
              variant="outline"
              className="flex-1 border-white/20 text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-red-500 text-white hover:bg-red-500/90"
            >
              <XCircle className="mr-2 h-4 w-4" />
              Send Rejection Notice
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
