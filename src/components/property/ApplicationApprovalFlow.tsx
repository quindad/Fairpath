import { CheckCircle, XCircle, MessageSquare, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import LogoFinal from '../common/LogoFinal';

interface ApplicationApprovalFlowProps {
  application: any;
  action: 'approve' | 'deny';
  onComplete: (decision: 'approved' | 'denied', data: any) => void;
  onCancel: () => void;
}

export default function ApplicationApprovalFlow({ application, action, onComplete, onCancel }: ApplicationApprovalFlowProps) {
  const [formData, setFormData] = useState({
    // Approval data
    moveInDate: '',
    leaseLength: '12',
    securityDeposit: '',
    firstMonthRent: '',
    additionalTerms: '',
    
    // Denial data
    denialReason: '',
    specificReason: '',
    allowReapply: true,
    feedback: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(action === 'approve' ? 'approved' : 'denied', formData);
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
            <h1 className="text-3xl mb-2">Approve Application</h1>
            <p className="text-white/60">
              Send {application.applicantName} a lease offer for {application.propertyAddress}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <Card className="bg-[#121212] border-white/10 p-6 mb-6">
              <h2 className="text-xl mb-4">Lease Details</h2>
              
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="moveInDate" className="text-white mb-2 block">
                      Move-In Date <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id="moveInDate"
                      type="date"
                      required
                      value={formData.moveInDate}
                      onChange={(e) => setFormData({ ...formData, moveInDate: e.target.value })}
                      className="w-full bg-black border border-white/20 rounded-lg px-3 py-2 text-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="leaseLength" className="text-white mb-2 block">
                      Lease Length (months) <span className="text-red-500">*</span>
                    </Label>
                    <select
                      id="leaseLength"
                      required
                      value={formData.leaseLength}
                      onChange={(e) => setFormData({ ...formData, leaseLength: e.target.value })}
                      className="w-full bg-black border border-white/20 rounded-lg px-3 py-2 text-white"
                    >
                      <option value="6">6 months</option>
                      <option value="12">12 months</option>
                      <option value="18">18 months</option>
                      <option value="24">24 months</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="securityDeposit" className="text-white mb-2 block">
                      Security Deposit <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60">$</span>
                      <input
                        id="securityDeposit"
                        type="number"
                        required
                        value={formData.securityDeposit}
                        onChange={(e) => setFormData({ ...formData, securityDeposit: e.target.value })}
                        className="w-full bg-black border border-white/20 rounded-lg pl-8 pr-3 py-2 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="firstMonthRent" className="text-white mb-2 block">
                      First Month's Rent <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60">$</span>
                      <input
                        id="firstMonthRent"
                        type="number"
                        required
                        value={formData.firstMonthRent}
                        onChange={(e) => setFormData({ ...formData, firstMonthRent: e.target.value })}
                        className="w-full bg-black border border-white/20 rounded-lg pl-8 pr-3 py-2 text-white"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="additionalTerms" className="text-white mb-2 block">
                    Additional Terms (Optional)
                  </Label>
                  <textarea
                    id="additionalTerms"
                    rows={4}
                    placeholder="Any special conditions, pet policies, parking details, etc."
                    value={formData.additionalTerms}
                    onChange={(e) => setFormData({ ...formData, additionalTerms: e.target.value })}
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
                  <span>{application.applicantName} receives lease offer notification</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                  <span>They have 48 hours to review and sign the lease electronically</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                  <span>You'll be notified when they sign, then collect deposit & first month rent</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                  <span>Your ${application.yourRevShare} FastTrack revenue is confirmed</span>
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
                <CheckCircle className="mr-2 h-4 w-4" />
                Send Lease Offer
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // DENY FLOW
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
          <h1 className="text-3xl mb-2">Deny Application</h1>
          <p className="text-white/60">
            Send denial notice to {application.applicantName}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="bg-red-500/10 border-red-500/30 p-6 mb-6">
            <h2 className="text-xl mb-4 text-red-500">Important: Fair Housing Laws</h2>
            <p className="text-sm text-white/60 mb-4">
              You must provide a legitimate, non-discriminatory reason for denial. Acceptable reasons include:
            </p>
            <ul className="text-sm text-white/60 space-y-1 mb-4">
              <li>• Insufficient income (rent > 30% of income)</li>
              <li>• Poor credit history or low credit score</li>
              <li>• Negative landlord references</li>
              <li>• Incomplete or false application information</li>
              <li>• Criminal conviction incompatible with property type (e.g., arson for wooden building)</li>
            </ul>
            <p className="text-sm text-red-500">
              Discrimination based on race, gender, religion, or blanket conviction policies is illegal.
            </p>
          </Card>

          <Card className="bg-[#121212] border-white/10 p-6 mb-6">
            <h2 className="text-xl mb-4">Denial Reason</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="denialReason" className="text-white mb-2 block">
                  Primary Reason <span className="text-red-500">*</span>
                </Label>
                <select
                  id="denialReason"
                  required
                  value={formData.denialReason}
                  onChange={(e) => setFormData({ ...formData, denialReason: e.target.value })}
                  className="w-full bg-black border border-white/20 rounded-lg px-3 py-2 text-white"
                >
                  <option value="">Select reason...</option>
                  <option value="income">Insufficient Income</option>
                  <option value="credit">Credit History Concerns</option>
                  <option value="references">Negative References</option>
                  <option value="incomplete">Incomplete Application</option>
                  <option value="conviction">Conviction Incompatible with Property</option>
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
                  placeholder="Provide specific, objective details about why this application doesn't meet your criteria..."
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
                  Constructive Feedback (Optional)
                </Label>
                <textarea
                  id="feedback"
                  rows={3}
                  placeholder="Any advice for improving their application in the future..."
                  value={formData.feedback}
                  onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                  className="w-full bg-black border border-white/20 rounded-lg px-3 py-2 text-white"
                />
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
                  Allow them to reapply if their situation improves
                </Label>
              </div>
            </div>
          </Card>

          <Card className="bg-yellow-500/10 border-yellow-500/30 p-6 mb-6">
            <h3 className="text-yellow-500 mb-3">What Happens Next:</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li className="flex items-start gap-2">
                <MessageSquare className="h-4 w-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                <span>{application.applicantName} receives denial notification with your reason</span>
              </li>
              <li className="flex items-start gap-2">
                <MessageSquare className="h-4 w-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                <span>They can review the reason and understand why</span>
              </li>
              <li className="flex items-start gap-2">
                <MessageSquare className="h-4 w-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                <span>Your ${application.yourRevShare} FastTrack revenue is still paid (they paid for the screening)</span>
              </li>
              <li className="flex items-start gap-2">
                <MessageSquare className="h-4 w-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                <span>They can leave a review of their experience with you</span>
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
              Send Denial Notice
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
