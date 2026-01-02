import { useState } from 'react';
import { Shield, CheckCircle, AlertCircle, Clock, FileText, User, Home, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

interface BackgroundCheckFlowProps {
  type: 'housing' | 'employment';
  applicantId: string;
  onComplete: (reportId: string) => void;
  onCancel: () => void;
}

interface BackgroundCheckResult {
  status: 'clear' | 'review-needed' | 'reject';
  reportId: string;
  completedAt: string;
  findings: {
    criminalRecords: boolean;
    creditCheck: boolean;
    evictionHistory: boolean;
    employmentVerification?: boolean;
  };
  details: string;
}

export default function BackgroundCheckFlow({
  type,
  applicantId,
  onComplete,
  onCancel
}: BackgroundCheckFlowProps) {
  const [step, setStep] = useState<'consent' | 'processing' | 'results'>('consent');
  const [checkResult, setCheckResult] = useState<BackgroundCheckResult | null>(null);

  const handleStartCheck = async () => {
    setStep('processing');

    // Simulate SingleKey API call
    // In production, this calls your backend which calls SingleKey
    setTimeout(() => {
      const mockResult: BackgroundCheckResult = {
        status: 'clear',
        reportId: `bgc_${Math.random().toString(36).substr(2, 9)}`,
        completedAt: new Date().toISOString(),
        findings: {
          criminalRecords: true,
          creditCheck: true,
          evictionHistory: false,
          employmentVerification: type === 'employment' ? true : undefined
        },
        details: 'Background check completed successfully. All requirements met.'
      };
      
      setCheckResult(mockResult);
      setStep('results');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {step === 'consent' && (
          <Card className="bg-[#121212] border-white/5 p-8">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#A8F32C]/10 rounded-xl flex items-center justify-center">
                  <Shield className="h-6 w-6 text-[#A8F32C]" />
                </div>
                <div>
                  <h1 className="text-2xl">Background Screening</h1>
                  <p className="text-sm text-white/60">
                    Powered by SingleKey • FCRA Compliant
                  </p>
                </div>
              </div>
            </div>

            {/* What We Check */}
            <div className="bg-black/50 rounded-xl p-6 mb-6 border border-white/5">
              <h2 className="text-lg mb-4">What We'll Check:</h2>
              <div className="space-y-3">
                {type === 'housing' && (
                  <>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-[#A8F32C] flex-shrink-0" />
                      <span className="text-sm text-white/80">Criminal background check (national & local)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-[#A8F32C] flex-shrink-0" />
                      <span className="text-sm text-white/80">Credit report (soft pull, no impact on score)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-[#A8F32C] flex-shrink-0" />
                      <span className="text-sm text-white/80">Eviction history search</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-[#A8F32C] flex-shrink-0" />
                      <span className="text-sm text-white/80">Sex offender registry check</span>
                    </div>
                  </>
                )}
                {type === 'employment' && (
                  <>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-[#A8F32C] flex-shrink-0" />
                      <span className="text-sm text-white/80">Criminal background check (7 years)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-[#A8F32C] flex-shrink-0" />
                      <span className="text-sm text-white/80">Identity verification</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-[#A8F32C] flex-shrink-0" />
                      <span className="text-sm text-white/80">Employment history verification</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-[#A8F32C] flex-shrink-0" />
                      <span className="text-sm text-white/80">Sex offender registry check</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Information Needed */}
            <div className="bg-black/50 rounded-xl p-6 mb-6 border border-white/5">
              <h3 className="text-sm mb-4 text-white/80">Information Required:</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Full Legal Name</Label>
                  <Input
                    className="bg-black border-white/10 text-white h-10"
                    placeholder="John Michael Doe"
                  />
                </div>
                <div>
                  <Label>Date of Birth</Label>
                  <Input
                    type="date"
                    className="bg-black border-white/10 text-white h-10"
                  />
                </div>
                <div>
                  <Label>Social Security Number</Label>
                  <Input
                    className="bg-black border-white/10 text-white h-10"
                    placeholder="XXX-XX-XXXX"
                  />
                </div>
                <div>
                  <Label>Driver's License Number</Label>
                  <Input
                    className="bg-black border-white/10 text-white h-10"
                    placeholder="Optional"
                  />
                </div>
              </div>

              <div className="mt-4">
                <Label>Current Address</Label>
                <Input
                  className="bg-black border-white/10 text-white h-10 mb-2"
                  placeholder="Street Address"
                />
                <div className="grid grid-cols-3 gap-2">
                  <Input
                    className="bg-black border-white/10 text-white h-10"
                    placeholder="City"
                  />
                  <Input
                    className="bg-black border-white/10 text-white h-10"
                    placeholder="State"
                  />
                  <Input
                    className="bg-black border-white/10 text-white h-10"
                    placeholder="ZIP"
                  />
                </div>
              </div>
            </div>

            {/* Legal Consent */}
            <div className="bg-[#A8F32C]/5 rounded-xl p-6 mb-6 border border-[#A8F32C]/20">
              <h3 className="text-sm mb-3 text-[#A8F32C]">Your Rights & Consent</h3>
              <div className="space-y-3 text-xs text-white/60 mb-4">
                <p>
                  By clicking "Authorize Background Check," you authorize FairPath Industries and its screening partner SingleKey 
                  to obtain consumer reports about you for {type === 'housing' ? 'housing' : 'employment'} purposes.
                </p>
                <p>
                  This authorization is valid for this application and any updates or renewals. You have the right to:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Request a copy of your background check report</li>
                  <li>Dispute any inaccurate information</li>
                  <li>Receive notice if adverse action is taken</li>
                  <li>Know your rights under the Fair Credit Reporting Act (FCRA)</li>
                </ul>
              </div>

              <div className="flex items-start gap-3">
                <input type="checkbox" className="mt-1" required />
                <label className="text-xs text-white/80">
                  I have read and agree to the{' '}
                  <a href="#" className="text-[#A8F32C] underline">Background Check Disclosure</a>{' '}
                  and authorize this screening.
                </label>
              </div>
            </div>

            {/* Privacy Notice */}
            <div className="flex items-center gap-3 text-xs text-white/40 mb-6">
              <Shield className="h-4 w-4" />
              <span>Your information is encrypted and handled in compliance with FCRA regulations</span>
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1 border-white/20"
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
                onClick={handleStartCheck}
              >
                <Shield className="mr-2 h-4 w-4" />
                Authorize Background Check
              </Button>
            </div>
          </Card>
        )}

        {step === 'processing' && (
          <Card className="bg-[#121212] border-white/5 p-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#A8F32C]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Loader2 className="h-10 w-10 text-[#A8F32C] animate-spin" />
              </div>
              <h2 className="text-2xl mb-2">Running Background Check...</h2>
              <p className="text-sm text-white/60 mb-8">
                This usually takes 2-5 minutes
              </p>

              <div className="space-y-3 max-w-md mx-auto">
                <div className="flex items-center gap-3 text-sm">
                  <Loader2 className="h-4 w-4 text-[#A8F32C] animate-spin" />
                  <span className="text-white/60">Searching criminal records...</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="h-4 w-4 text-white/40" />
                  <span className="text-white/40">Checking credit history...</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="h-4 w-4 text-white/40" />
                  <span className="text-white/40">Verifying identity...</span>
                </div>
              </div>
            </div>
          </Card>
        )}

        {step === 'results' && checkResult && (
          <Card className="bg-[#121212] border-white/5 p-8">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  checkResult.status === 'clear' ? 'bg-[#A8F32C]/10' :
                  checkResult.status === 'review-needed' ? 'bg-yellow-500/10' :
                  'bg-red-500/10'
                }`}>
                  {checkResult.status === 'clear' ? (
                    <CheckCircle className={`h-6 w-6 text-[#A8F32C]`} />
                  ) : checkResult.status === 'review-needed' ? (
                    <AlertCircle className="h-6 w-6 text-yellow-500" />
                  ) : (
                    <AlertCircle className="h-6 w-6 text-red-500" />
                  )}
                </div>
                <div>
                  <h1 className="text-2xl">
                    {checkResult.status === 'clear' && 'Background Check Complete'}
                    {checkResult.status === 'review-needed' && 'Manual Review Required'}
                    {checkResult.status === 'reject' && 'Application Requires Review'}
                  </h1>
                  <p className="text-sm text-white/60">
                    Report ID: {checkResult.reportId}
                  </p>
                </div>
              </div>

              {checkResult.status === 'clear' && (
                <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-0">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Approved
                </Badge>
              )}
              {checkResult.status === 'review-needed' && (
                <Badge className="bg-yellow-500/20 text-yellow-500 border-0">
                  <Clock className="h-3 w-3 mr-1" />
                  Under Review
                </Badge>
              )}
            </div>

            {/* Check Results */}
            <div className="bg-black/50 rounded-xl p-6 mb-6 border border-white/5">
              <h2 className="text-lg mb-4">Screening Results</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-white/5">
                  <span className="text-sm text-white/80">Criminal Records Check</span>
                  <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-0 text-xs">
                    {checkResult.findings.criminalRecords ? 'Complete' : 'Clear'}
                  </Badge>
                </div>
                {type === 'housing' && (
                  <>
                    <div className="flex items-center justify-between py-2 border-b border-white/5">
                      <span className="text-sm text-white/80">Credit Check</span>
                      <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-0 text-xs">
                        Complete
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-white/5">
                      <span className="text-sm text-white/80">Eviction History</span>
                      <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-0 text-xs">
                        {checkResult.findings.evictionHistory ? 'Found' : 'Clear'}
                      </Badge>
                    </div>
                  </>
                )}
                {type === 'employment' && checkResult.findings.employmentVerification && (
                  <div className="flex items-center justify-between py-2 border-b border-white/5">
                    <span className="text-sm text-white/80">Employment Verification</span>
                    <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-0 text-xs">
                      Verified
                    </Badge>
                  </div>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="bg-black/50 rounded-xl p-6 mb-6 border border-white/5">
              <h3 className="text-sm mb-3 text-white/80">Additional Information:</h3>
              <p className="text-sm text-white/60">{checkResult.details}</p>
            </div>

            {checkResult.status === 'clear' && (
              <div className="bg-[#A8F32C]/5 rounded-xl p-6 mb-6 border border-[#A8F32C]/20">
                <h3 className="text-sm mb-3 text-[#A8F32C]">Next Steps:</h3>
                <ul className="space-y-2 text-sm text-white/80">
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 bg-[#A8F32C]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[#A8F32C] text-xs">1</span>
                    </div>
                    <span>
                      {type === 'housing' 
                        ? 'Property owner will review your application'
                        : 'Employer will proceed with your application'
                      }
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 bg-[#A8F32C]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[#A8F32C] text-xs">2</span>
                    </div>
                    <span>You'll be contacted within 24-48 hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 bg-[#A8F32C]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[#A8F32C] text-xs">3</span>
                    </div>
                    <span>Track your application status in your dashboard</span>
                  </li>
                </ul>
              </div>
            )}

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1 border-white/20"
              >
                <FileText className="mr-2 h-4 w-4" />
                Download Report
              </Button>
              <Button 
                className="flex-1 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
                onClick={() => onComplete(checkResult.reportId)}
              >
                Continue
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

// SingleKey API Integration (Backend)
export const singleKeyConfig = {
  API_KEY: 'sk_live_...',
  API_URL: 'https://api.singlekey.com/v1',
  
  // Webhook for results
  WEBHOOK_URL: '/api/webhooks/singlekey',
  WEBHOOK_SECRET: 'whsec_...',
};

// Backend API Example
/*
POST /api/background-check/initiate

Request:
{
  "type": "housing" | "employment",
  "applicantId": "user_123",
  "applicantData": {
    "firstName": "John",
    "lastName": "Doe",
    "dob": "1990-01-01",
    "ssn": "123-45-6789",
    "address": {
      "street": "123 Main St",
      "city": "Cleveland",
      "state": "OH",
      "zip": "44101"
    }
  }
}

Response:
{
  "checkId": "bgc_xxx",
  "status": "pending",
  "estimatedCompletionTime": "2025-11-25T14:30:00Z"
}

SingleKey Webhook:
POST /api/webhooks/singlekey

{
  "event": "report.completed",
  "reportId": "bgc_xxx",
  "status": "clear" | "review" | "reject",
  "findings": {...}
}
*/
