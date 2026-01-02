import { useState } from 'react';
import { DollarSign, FileText, Download, CheckCircle, Clock, AlertCircle, User, Briefcase, Calendar, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';

interface WOTCEligibleApplicant {
  id: string;
  name: string;
  position: string;
  hireDate: string;
  wotcCategory: string;
  wotcValue: number;
  status: 'pending' | 'forms-generated' | 'submitted-to-swa' | 'certified' | 'claimed';
  daysRemaining?: number;
  convictionType?: string;
  releaseDate?: string;
}

const mockWOTCApplicants: WOTCEligibleApplicant[] = [
  {
    id: '1',
    name: 'Marcus Johnson',
    position: 'Warehouse Associate',
    hireDate: '2025-11-15',
    wotcCategory: 'Ex-Felon (within 12 months)',
    wotcValue: 2400,
    status: 'pending',
    daysRemaining: 22,
    convictionType: 'Drug-related',
    releaseDate: '2025-03-10'
  },
  {
    id: '2',
    name: 'Sarah Williams',
    position: 'Warehouse Associate',
    hireDate: '2025-11-10',
    wotcCategory: 'SNAP Recipient + Ex-Felon',
    wotcValue: 9600,
    status: 'forms-generated',
    daysRemaining: 17,
    convictionType: 'Property',
    releaseDate: '2023-06-15'
  },
  {
    id: '3',
    name: 'David Martinez',
    position: 'Forklift Operator',
    hireDate: '2025-10-20',
    wotcCategory: 'Ex-Felon (within 12 months)',
    wotcValue: 2400,
    status: 'submitted-to-swa',
    convictionType: 'Theft',
    releaseDate: '2025-01-20'
  },
  {
    id: '4',
    name: 'James Wilson',
    position: 'Warehouse Manager',
    hireDate: '2025-09-01',
    wotcCategory: 'Long-term Unemployment',
    wotcValue: 2400,
    status: 'certified'
  },
  {
    id: '5',
    name: 'Lisa Anderson',
    position: 'Administrative Assistant',
    hireDate: '2025-07-15',
    wotcCategory: 'SNAP Recipient',
    wotcValue: 2400,
    status: 'claimed'
  }
];

export default function WOTCCenter() {
  const [selectedApplicant, setSelectedApplicant] = useState<WOTCEligibleApplicant | null>(null);
  const [showFormPreview, setShowFormPreview] = useState(false);

  const totalPotentialValue = mockWOTCApplicants.reduce((sum, app) => sum + app.wotcValue, 0);
  const claimedValue = mockWOTCApplicants
    .filter(app => app.status === 'claimed')
    .reduce((sum, app) => sum + app.wotcValue, 0);
  const pendingValue = mockWOTCApplicants
    .filter(app => ['pending', 'forms-generated', 'submitted-to-swa', 'certified'].includes(app.status))
    .reduce((sum, app) => sum + app.wotcValue, 0);

  const urgentCases = mockWOTCApplicants.filter(app => 
    app.status === 'pending' && app.daysRemaining && app.daysRemaining <= 7
  );

  return (
    <div className="space-y-6">
      {/* Hero Stats */}
      <div className="bg-gradient-to-br from-[#A8F32C]/10 via-transparent to-transparent rounded-2xl p-1">
        <div className="bg-[#121212] rounded-2xl p-8 border border-[#A8F32C]/20">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-16 h-16 bg-[#A8F32C]/10 rounded-2xl flex items-center justify-center flex-shrink-0">
              <DollarSign className="h-8 w-8 text-[#A8F32C]" />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl mb-2">Work Opportunity Tax Credit Center</h2>
              <p className="text-white/60">
                Maximize federal tax credits by hiring WOTC-eligible individuals. FairPath automates tracking and form generation.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-black/30 rounded-xl p-4 border border-white/5">
              <div className="text-sm text-white/60 mb-1">Total Potential Value</div>
              <div className="text-3xl text-[#A8F32C] mb-1">${totalPotentialValue.toLocaleString()}</div>
              <div className="text-xs text-white/40">{mockWOTCApplicants.length} eligible hires</div>
            </div>

            <div className="bg-black/30 rounded-xl p-4 border border-white/5">
              <div className="text-sm text-white/60 mb-1">Already Claimed</div>
              <div className="text-3xl mb-1">${claimedValue.toLocaleString()}</div>
              <div className="text-xs text-white/40">
                {mockWOTCApplicants.filter(a => a.status === 'claimed').length} successful claims
              </div>
            </div>

            <div className="bg-black/30 rounded-xl p-4 border border-white/5">
              <div className="text-sm text-white/60 mb-1">In Progress</div>
              <div className="text-3xl mb-1">${pendingValue.toLocaleString()}</div>
              <div className="text-xs text-white/40">
                {mockWOTCApplicants.filter(a => a.status !== 'claimed').length} pending certifications
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Urgent Actions */}
      {urgentCases.length > 0 && (
        <Card className="bg-red-500/10 border-red-500/20 p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-6 w-6 text-red-500 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-lg mb-2 text-red-500">⚠️ Urgent: {urgentCases.length} Case(s) Expiring Soon!</h3>
              <p className="text-sm text-white/80 mb-4">
                You must file WOTC forms within 28 days of hire date. These cases have less than 7 days remaining:
              </p>
              <div className="space-y-2">
                {urgentCases.map(app => (
                  <div key={app.id} className="bg-black/30 rounded-lg p-3 flex items-center justify-between">
                    <div>
                      <div className="text-sm mb-1">{app.name} - {app.position}</div>
                      <div className="text-xs text-white/60">
                        Hired {app.hireDate} • {app.daysRemaining} days left
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      className="bg-red-500 text-white hover:bg-red-600"
                      onClick={() => setSelectedApplicant(app)}
                    >
                      Generate Forms NOW
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* How WOTC Works */}
      <Card className="bg-[#121212] border-white/5 p-6">
        <h3 className="text-xl mb-4">How WOTC Works (The 28-Day Window)</h3>
        <div className="grid md:grid-cols-4 gap-6">
          <div>
            <div className="w-12 h-12 bg-[#A8F32C]/10 rounded-xl flex items-center justify-center mb-3">
              <span className="text-2xl text-[#A8F32C]">1</span>
            </div>
            <h4 className="text-sm mb-2 text-[#A8F32C]">Hire Eligible Candidate</h4>
            <p className="text-xs text-white/60">
              FairPath automatically identifies WOTC-eligible applicants during onboarding
            </p>
          </div>

          <div>
            <div className="w-12 h-12 bg-[#A8F32C]/10 rounded-xl flex items-center justify-center mb-3">
              <span className="text-2xl text-[#A8F32C]">2</span>
            </div>
            <h4 className="text-sm mb-2 text-[#A8F32C]">Generate Forms (Within 28 Days)</h4>
            <p className="text-xs text-white/60">
              We auto-generate IRS Form 8850 and ETA Form 9061 with all required information
            </p>
          </div>

          <div>
            <div className="w-12 h-12 bg-[#A8F32C]/10 rounded-xl flex items-center justify-center mb-3">
              <span className="text-2xl text-[#A8F32C]">3</span>
            </div>
            <h4 className="text-sm mb-2 text-[#A8F32C]">Submit to SWA</h4>
            <p className="text-xs text-white/60">
              Submit forms to your State Workforce Agency (we provide addresses and instructions)
            </p>
          </div>

          <div>
            <div className="w-12 h-12 bg-[#A8F32C]/10 rounded-xl flex items-center justify-center mb-3">
              <span className="text-2xl text-[#A8F32C]">4</span>
            </div>
            <h4 className="text-sm mb-2 text-[#A8F32C]">Claim Tax Credit</h4>
            <p className="text-xs text-white/60">
              Once certified (2-4 weeks), claim credit on your business tax return using IRS Form 5884
            </p>
          </div>
        </div>
      </Card>

      {/* WOTC Eligible Hires */}
      <Card className="bg-[#121212] border-white/5 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl">WOTC-Eligible Hires</h3>
          <div className="flex gap-2">
            <Button variant="outline" className="border-white/20">
              <Download className="h-4 w-4 mr-2" />
              Export All
            </Button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { id: 'all', label: 'All', count: mockWOTCApplicants.length },
            { id: 'pending', label: 'Needs Forms', count: mockWOTCApplicants.filter(a => a.status === 'pending').length },
            { id: 'forms-generated', label: 'Ready to Submit', count: mockWOTCApplicants.filter(a => a.status === 'forms-generated').length },
            { id: 'submitted-to-swa', label: 'Awaiting Certification', count: mockWOTCApplicants.filter(a => a.status === 'submitted-to-swa').length },
            { id: 'certified', label: 'Certified', count: mockWOTCApplicants.filter(a => a.status === 'certified').length },
            { id: 'claimed', label: 'Claimed', count: mockWOTCApplicants.filter(a => a.status === 'claimed').length }
          ].map((tab) => (
            <button
              key={tab.id}
              className="px-4 py-2 rounded-lg text-sm whitespace-nowrap bg-white/5 text-white/60 hover:bg-white/10"
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Applicant List */}
        <div className="space-y-3">
          {mockWOTCApplicants.map((applicant) => (
            <WOTCApplicantCard 
              key={applicant.id} 
              applicant={applicant}
              onViewDetails={() => setSelectedApplicant(applicant)}
            />
          ))}
        </div>
      </Card>

      {/* WOTC Categories Reference */}
      <Card className="bg-[#121212] border-white/5 p-6">
        <h3 className="text-xl mb-4">WOTC Categories & Values</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-black/30 rounded-lg p-4 border border-white/5">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm">Ex-Felon (Within 12 Months)</h4>
              <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-0">$2,400</Badge>
            </div>
            <p className="text-xs text-white/60">
              Convicted of a felony and hired within 1 year of release or conviction date
            </p>
          </div>

          <div className="bg-black/30 rounded-lg p-4 border border-white/5">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm">SNAP Recipient</h4>
              <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-0">$2,400</Badge>
            </div>
            <p className="text-xs text-white/60">
              Receiving SNAP (food stamps) for at least 3 months prior to hire
            </p>
          </div>

          <div className="bg-black/30 rounded-lg p-4 border border-white/5">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm">Long-Term Unemployment</h4>
              <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-0">$2,400</Badge>
            </div>
            <p className="text-xs text-white/60">
              Unemployed for 27+ weeks and receiving unemployment compensation
            </p>
          </div>

          <div className="bg-black/30 rounded-lg p-4 border border-white/5">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm">Multiple Categories (Stacked)</h4>
              <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-0">Up to $9,600</Badge>
            </div>
            <p className="text-xs text-white/60">
              Qualifies for multiple categories (e.g., Ex-Felon + SNAP + Long-term unemployment)
            </p>
          </div>
        </div>
      </Card>

      {/* Modals */}
      {selectedApplicant && !showFormPreview && (
        <ApplicantDetailModal 
          applicant={selectedApplicant}
          onClose={() => setSelectedApplicant(null)}
          onGenerateForms={() => setShowFormPreview(true)}
        />
      )}

      {showFormPreview && selectedApplicant && (
        <FormPreviewModal
          applicant={selectedApplicant}
          onClose={() => {
            setShowFormPreview(false);
            setSelectedApplicant(null);
          }}
        />
      )}
    </div>
  );
}

function WOTCApplicantCard({ applicant, onViewDetails }: { applicant: WOTCEligibleApplicant; onViewDetails: () => void }) {
  const getStatusBadge = () => {
    switch (applicant.status) {
      case 'pending':
        return <Badge className="bg-yellow-500/20 text-yellow-500 border-0">Needs Forms</Badge>;
      case 'forms-generated':
        return <Badge className="bg-blue-500/20 text-blue-500 border-0">Ready to Submit</Badge>;
      case 'submitted-to-swa':
        return <Badge className="bg-purple-500/20 text-purple-500 border-0">Awaiting Certification</Badge>;
      case 'certified':
        return <Badge className="bg-green-500/20 text-green-500 border-0">Certified</Badge>;
      case 'claimed':
        return <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-0">Claimed</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-black/30 rounded-xl p-4 border border-white/5 hover:border-[#A8F32C]/40 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h4 className="text-lg">{applicant.name}</h4>
            {getStatusBadge()}
            {applicant.daysRemaining && applicant.daysRemaining <= 7 && (
              <Badge className="bg-red-500/20 text-red-500 border-0">
                <AlertCircle className="h-3 w-3 mr-1" />
                {applicant.daysRemaining}d left
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
            <div>
              <div className="text-white/40 mb-1">Position</div>
              <div className="text-white/80">{applicant.position}</div>
            </div>
            <div>
              <div className="text-white/40 mb-1">Hire Date</div>
              <div className="text-white/80">{applicant.hireDate}</div>
            </div>
            <div>
              <div className="text-white/40 mb-1">WOTC Value</div>
              <div className="text-[#A8F32C]">${applicant.wotcValue.toLocaleString()}</div>
            </div>
          </div>

          <div className="text-xs text-white/60 mb-3">
            Category: {applicant.wotcCategory}
          </div>
        </div>

        <Button 
          size="sm" 
          onClick={onViewDetails}
          className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
        >
          {applicant.status === 'pending' ? 'Generate Forms' : 'View Details'}
        </Button>
      </div>
    </div>
  );
}

function ApplicantDetailModal({ applicant, onClose, onGenerateForms }: { 
  applicant: WOTCEligibleApplicant; 
  onClose: () => void;
  onGenerateForms: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="bg-[#121212] rounded-2xl border border-white/10 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[#121212] border-b border-white/5 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl mb-1">{applicant.name}</h2>
            <p className="text-sm text-white/60">{applicant.position}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* WOTC Info */}
          <div className="bg-[#A8F32C]/5 rounded-xl p-6 border border-[#A8F32C]/20">
            <div className="flex items-center gap-3 mb-4">
              <DollarSign className="h-6 w-6 text-[#A8F32C]" />
              <div>
                <div className="text-sm text-white/60">WOTC Tax Credit Value</div>
                <div className="text-3xl text-[#A8F32C]">${applicant.wotcValue.toLocaleString()}</div>
              </div>
            </div>
            <div className="text-sm text-white/80">
              <strong>Category:</strong> {applicant.wotcCategory}
            </div>
          </div>

          {/* Timeline */}
          <div>
            <h3 className="text-lg mb-4">Timeline</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#A8F32C]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Calendar className="h-4 w-4 text-[#A8F32C]" />
                </div>
                <div>
                  <div className="text-sm mb-1">Hire Date</div>
                  <div className="text-xs text-white/60">{applicant.hireDate}</div>
                </div>
              </div>

              {applicant.daysRemaining && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-yellow-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="h-4 w-4 text-yellow-500" />
                  </div>
                  <div>
                    <div className="text-sm mb-1">Filing Deadline</div>
                    <div className="text-xs text-white/60">
                      {applicant.daysRemaining} days remaining (must file within 28 days of hire)
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Conviction Info */}
          {applicant.convictionType && (
            <div>
              <h3 className="text-lg mb-4">Background Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/30 rounded-lg p-4 border border-white/5">
                  <div className="text-xs text-white/40 mb-1">Conviction Type</div>
                  <div className="text-sm">{applicant.convictionType}</div>
                </div>
                {applicant.releaseDate && (
                  <div className="bg-black/30 rounded-lg p-4 border border-white/5">
                    <div className="text-xs text-white/40 mb-1">Release Date</div>
                    <div className="text-sm">{applicant.releaseDate}</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-3">
            {applicant.status === 'pending' && (
              <Button 
                onClick={onGenerateForms}
                className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90 h-12"
              >
                <FileText className="mr-2 h-5 w-5" />
                Generate WOTC Forms (IRS 8850 & ETA 9061)
              </Button>
            )}

            {applicant.status === 'forms-generated' && (
              <>
                <Button 
                  className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90 h-12"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download Forms
                </Button>
                <Button 
                  variant="outline"
                  className="w-full border-white/20 h-12"
                >
                  Mark as Submitted to SWA
                </Button>
              </>
            )}

            {applicant.status === 'submitted-to-swa' && (
              <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/20 text-center">
                <Clock className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                <div className="text-sm text-white/80">
                  Waiting for SWA certification (typically 2-4 weeks)
                </div>
              </div>
            )}

            {applicant.status === 'certified' && (
              <Button 
                className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90 h-12"
              >
                <CheckCircle className="mr-2 h-5 w-5" />
                Mark as Claimed on Tax Return
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FormPreviewModal({ applicant, onClose }: { applicant: WOTCEligibleApplicant; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="bg-[#121212] rounded-2xl border border-white/10 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[#121212] border-b border-white/5 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl mb-1">WOTC Forms Generated</h2>
            <p className="text-sm text-white/60">{applicant.name} - ${applicant.wotcValue.toLocaleString()}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Success Message */}
          <div className="bg-[#A8F32C]/10 rounded-xl p-6 border border-[#A8F32C]/20 text-center">
            <CheckCircle className="h-12 w-12 text-[#A8F32C] mx-auto mb-3" />
            <h3 className="text-xl mb-2">Forms Successfully Generated!</h3>
            <p className="text-sm text-white/60">
              IRS Form 8850 and ETA Form 9061 are ready to download and submit to your State Workforce Agency
            </p>
          </div>

          {/* Form Previews */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-black/30 rounded-xl p-6 border border-white/5">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="h-6 w-6 text-[#A8F32C]" />
                <div>
                  <h4 className="text-lg">IRS Form 8850</h4>
                  <p className="text-xs text-white/60">Pre-Screening Notice</p>
                </div>
              </div>
              <div className="bg-white/5 rounded-lg p-4 mb-4 text-xs space-y-2 font-mono">
                <div>Employee: {applicant.name}</div>
                <div>SSN: ***-**-****</div>
                <div>Hire Date: {applicant.hireDate}</div>
                <div>Target Group: Ex-Felon</div>
                <div>Position: {applicant.position}</div>
              </div>
              <Button className="w-full bg-white/10 hover:bg-white/20">
                <Download className="mr-2 h-4 w-4" />
                Download Form 8850
              </Button>
            </div>

            <div className="bg-black/30 rounded-xl p-6 border border-white/5">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="h-6 w-6 text-[#A8F32C]" />
                <div>
                  <h4 className="text-lg">ETA Form 9061</h4>
                  <p className="text-xs text-white/60">Individual Characteristics Form</p>
                </div>
              </div>
              <div className="bg-white/5 rounded-lg p-4 mb-4 text-xs space-y-2 font-mono">
                <div>Conviction Date: {applicant.releaseDate}</div>
                <div>Release Date: {applicant.releaseDate}</div>
                <div>Within 1 Year: Yes</div>
                <div>SNAP Benefits: Check if applicable</div>
                <div>Veteran: Check if applicable</div>
              </div>
              <Button className="w-full bg-white/10 hover:bg-white/20">
                <Download className="mr-2 h-4 w-4" />
                Download Form 9061
              </Button>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-500/10 rounded-xl p-6 border border-blue-500/20">
            <h4 className="text-lg mb-4 text-blue-400">Next Steps:</h4>
            <ol className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-400 text-xs">1</span>
                </div>
                <div>
                  <strong>Employee Signature:</strong> Have {applicant.name} sign both forms
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-400 text-xs">2</span>
                </div>
                <div>
                  <strong>Submit to SWA:</strong> Mail or fax to your State Workforce Agency within {applicant.daysRemaining} days
                  <div className="text-xs text-white/60 mt-1">
                    Ohio SWA: Ohio Department of Job and Family Services<br />
                    Address: P.O. Box 1618, Columbus, OH 43216<br />
                    Fax: (614) 752-8905
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-400 text-xs">3</span>
                </div>
                <div>
                  <strong>Wait for Certification:</strong> SWA will review and certify (typically 2-4 weeks)
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-400 text-xs">4</span>
                </div>
                <div>
                  <strong>Claim Credit:</strong> Use IRS Form 5884 when filing your business taxes
                </div>
              </li>
            </ol>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button 
              onClick={onClose}
              className="flex-1 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90 h-12"
            >
              <Download className="mr-2 h-5 w-5" />
              Download Both Forms
            </Button>
            <Button 
              variant="outline"
              className="flex-1 border-white/20 h-12"
              onClick={onClose}
            >
              Mark as Submitted
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}