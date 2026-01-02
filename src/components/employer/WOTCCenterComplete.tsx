import { useState } from 'react';
import { DollarSign, FileText, Download, CheckCircle, ArrowLeft, AlertCircle, User, Calendar, Info } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import LogoFinal from '../common/LogoFinal';

interface WOTCCenterCompleteProps {
  onBack: () => void;
}

const mockWOTCApplicants = [
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
    daysRemaining: 17
  },
  {
    id: '3',
    name: 'David Martinez',
    position: 'Forklift Operator',
    hireDate: '2025-10-20',
    wotcCategory: 'Ex-Felon (within 12 months)',
    wotcValue: 2400,
    status: 'submitted-to-swa'
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

export default function WOTCCenterComplete({ onBack }: WOTCCenterCompleteProps) {
  const [activeView, setActiveView] = useState<'dashboard' | 'applicant-detail' | 'form-preview' | 'resources'>('dashboard');
  const [selectedApplicant, setSelectedApplicant] = useState<any>(null);

  const totalPotentialValue = mockWOTCApplicants.reduce((sum, app) => sum + app.wotcValue, 0);
  const claimedValue = mockWOTCApplicants.filter(app => app.status === 'claimed').reduce((sum, app) => sum + app.wotcValue, 0);
  const pendingValue = mockWOTCApplicants.filter(app => app.status !== 'claimed').reduce((sum, app) => sum + app.wotcValue, 0);

  const urgentCases = mockWOTCApplicants.filter(app => app.status === 'pending' && app.daysRemaining && app.daysRemaining <= 7);

  // FORM PREVIEW VIEW
  if (activeView === 'form-preview' && selectedApplicant) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="border-b border-white/5 bg-[#121212]">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <LogoFinal size="md" />
              <Button onClick={() => setActiveView('applicant-detail')} variant="outline" className="border-white/20 text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl mb-2">IRS Form 8850 Preview</h1>
            <p className="text-white/60">Pre-Screening Notice and Certification Request for the Work Opportunity Credit</p>
          </div>

          <Card className="bg-[#121212] border-white/10 p-8 mb-6">
            <div className="text-center mb-6">
              <div className="text-sm text-white/60 mb-2">Form 8850</div>
              <div className="text-lg mb-4">(Rev. November 2024)</div>
              <div className="text-xs text-white/40">Department of the Treasury - Internal Revenue Service</div>
            </div>

            <div className="space-y-6 text-sm">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-white/60 mb-1">Applicant's Name</div>
                  <div className="bg-white/5 p-3 rounded">{selectedApplicant.name}</div>
                </div>
                <div>
                  <div className="text-white/60 mb-1">Social Security Number</div>
                  <div className="bg-white/5 p-3 rounded">***-**-{Math.floor(Math.random() * 9999).toString().padStart(4, '0')}</div>
                </div>
              </div>

              <div>
                <div className="text-white/60 mb-1">Street Address</div>
                <div className="bg-white/5 p-3 rounded">456 Oak Street, Springfield, IL 62702</div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <div className="text-white/60 mb-1">City</div>
                  <div className="bg-white/5 p-3 rounded">Springfield</div>
                </div>
                <div>
                  <div className="text-white/60 mb-1">State</div>
                  <div className="bg-white/5 p-3 rounded">IL</div>
                </div>
                <div>
                  <div className="text-white/60 mb-1">ZIP Code</div>
                  <div className="bg-white/5 p-3 rounded">62702</div>
                </div>
              </div>

              <div>
                <div className="text-white/60 mb-1">Target Group</div>
                <div className="bg-[#A8F32C]/10 border border-[#A8F32C]/30 p-3 rounded">
                  <CheckCircle className="h-4 w-4 text-[#A8F32C] inline mr-2" />
                  {selectedApplicant.wotcCategory}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-white/60 mb-1">Date Hired</div>
                  <div className="bg-white/5 p-3 rounded">{selectedApplicant.hireDate}</div>
                </div>
                <div>
                  <div className="text-white/60 mb-1">Job Position</div>
                  <div className="bg-white/5 p-3 rounded">{selectedApplicant.position}</div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-6 mt-6">
                <div className="text-white/60 mb-4">Employer Information</div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-white/60 mb-1">Employer Name</div>
                    <div className="bg-white/5 p-3 rounded">Great Lakes Distribution</div>
                  </div>
                  <div>
                    <div className="text-white/60 mb-1">EIN</div>
                    <div className="bg-white/5 p-3 rounded">12-3456789</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <div className="flex gap-4">
            <Button
              onClick={() => alert('Downloading Form 8850 PDF...')}
              className="flex-1 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Form 8850 (PDF)
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-white/20 text-white"
              onClick={() => alert('Form marked as submitted to SWA')}
            >
              Mark as Submitted
            </Button>
          </div>

          <p className="text-center text-xs text-white/40 mt-4">
            File this form with your State Workforce Agency within 28 days of hire date
          </p>
        </div>
      </div>
    );
  }

  // APPLICANT DETAIL VIEW
  if (activeView === 'applicant-detail' && selectedApplicant) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="border-b border-white/5 bg-[#121212]">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <LogoFinal size="md" />
              <Button onClick={() => setActiveView('dashboard')} variant="outline" className="border-white/20 text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to WOTC Center
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-3xl mb-2">{selectedApplicant.name}</h1>
              <div className="text-white/60">{selectedApplicant.position}</div>
            </div>
            <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30 text-lg px-4 py-2">
              ${selectedApplicant.wotcValue.toLocaleString()} Credit
            </Badge>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <Card className="bg-[#121212] border-white/10 p-6">
              <h2 className="text-xl mb-4">WOTC Details</h2>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-white/60 mb-1">Target Group</div>
                  <div className="text-white">{selectedApplicant.wotcCategory}</div>
                </div>
                <div>
                  <div className="text-white/60 mb-1">Maximum Credit Value</div>
                  <div className="text-[#A8F32C] text-2xl">${selectedApplicant.wotcValue.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-white/60 mb-1">Hire Date</div>
                  <div className="text-white">{selectedApplicant.hireDate}</div>
                </div>
                {selectedApplicant.daysRemaining && (
                  <div>
                    <div className="text-white/60 mb-1">Filing Deadline</div>
                    <Badge className={`${
                      selectedApplicant.daysRemaining <= 7 ? 'bg-red-500/20 text-red-500' : 'bg-yellow-500/20 text-yellow-500'
                    } border-0`}>
                      {selectedApplicant.daysRemaining} days remaining
                    </Badge>
                  </div>
                )}
              </div>
            </Card>

            <Card className="bg-[#121212] border-white/10 p-6">
              <h2 className="text-xl mb-4">Status</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className={`h-5 w-5 ${selectedApplicant.status !== 'pending' ? 'text-[#A8F32C]' : 'text-white/20'}`} />
                  <div>
                    <div className="text-white">Forms Generated</div>
                    <div className="text-xs text-white/60">Form 8850 ready</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className={`h-5 w-5 ${['submitted-to-swa', 'certified', 'claimed'].includes(selectedApplicant.status) ? 'text-[#A8F32C]' : 'text-white/20'}`} />
                  <div>
                    <div className="text-white">Submitted to SWA</div>
                    <div className="text-xs text-white/60">Filed with state agency</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className={`h-5 w-5 ${['certified', 'claimed'].includes(selectedApplicant.status) ? 'text-[#A8F32C]' : 'text-white/20'}`} />
                  <div>
                    <div className="text-white">Certified by SWA</div>
                    <div className="text-xs text-white/60">Eligibility confirmed</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className={`h-5 w-5 ${selectedApplicant.status === 'claimed' ? 'text-[#A8F32C]' : 'text-white/20'}`} />
                  <div>
                    <div className="text-white">Credit Claimed</div>
                    <div className="text-xs text-white/60">Filed with IRS</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <Card className="bg-[#A8F32C]/10 border-[#A8F32C]/30 p-6 mb-6">
            <h3 className="text-lg mb-4">Next Steps</h3>
            {selectedApplicant.status === 'pending' && (
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#A8F32C] text-black flex items-center justify-center text-xs flex-shrink-0">1</div>
                  <div>
                    <div className="text-white mb-1">Download Form 8850</div>
                    <div className="text-white/60">Pre-screening notice must be filed within 28 days of hire</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-white/20 text-white flex items-center justify-center text-xs flex-shrink-0">2</div>
                  <div>
                    <div className="text-white/60 mb-1">Employee signs the form</div>
                    <div className="text-white/40">Have {selectedApplicant.name} sign the certification</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-white/20 text-white flex items-center justify-center text-xs flex-shrink-0">3</div>
                  <div>
                    <div className="text-white/60 mb-1">Submit to State Workforce Agency</div>
                    <div className="text-white/40">Mail or electronically file with your SWA</div>
                  </div>
                </div>
              </div>
            )}
            {selectedApplicant.status === 'forms-generated' && (
              <p className="text-sm text-white/80">Form 8850 has been generated. Submit to your State Workforce Agency within {selectedApplicant.daysRemaining} days.</p>
            )}
            {selectedApplicant.status === 'submitted-to-swa' && (
              <p className="text-sm text-white/80">Form submitted to SWA. Waiting for certification (typically 2-8 weeks).</p>
            )}
            {selectedApplicant.status === 'certified' && (
              <p className="text-sm text-white/80">Certified by SWA! File Form 5884 with your tax return to claim the ${selectedApplicant.wotcValue.toLocaleString()} credit.</p>
            )}
            {selectedApplicant.status === 'claimed' && (
              <p className="text-sm text-[#A8F32C]">✓ Credit claimed on your tax return. ${selectedApplicant.wotcValue.toLocaleString()} saved!</p>
            )}
          </Card>

          <div className="grid md:grid-cols-2 gap-4">
            <Button
              onClick={() => setActiveView('form-preview')}
              className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
            >
              <FileText className="mr-2 h-4 w-4" />
              View Form 8850
            </Button>
            <Button
              variant="outline"
              className="border-white/20 text-white"
              onClick={() => alert('Downloading all WOTC documents...')}
            >
              <Download className="mr-2 h-4 w-4" />
              Download All Documents
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // RESOURCES VIEW
  if (activeView === 'resources') {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="border-b border-white/5 bg-[#121212]">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <LogoFinal size="md" />
              <Button onClick={() => setActiveView('dashboard')} variant="outline" className="border-white/20 text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-12">
          <h1 className="text-3xl mb-8">WOTC Resources & Guides</h1>

          <div className="space-y-6">
            <Card className="bg-[#121212] border-white/10 p-6">
              <h2 className="text-xl mb-4">Understanding WOTC</h2>
              <p className="text-white/60 mb-4">
                The Work Opportunity Tax Credit (WOTC) is a federal tax credit available to employers who hire individuals from certain target groups who have faced significant barriers to employment.
              </p>
              <Button variant="outline" className="border-[#A8F32C]/50 text-[#A8F32C]">
                <Download className="mr-2 h-4 w-4" />
                Download Full Guide (PDF)
              </Button>
            </Card>

            <Card className="bg-[#121212] border-white/10 p-6">
              <h2 className="text-xl mb-4">Target Groups & Credit Amounts</h2>
              <div className="space-y-3 text-sm">
                <div className="bg-white/5 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <div className="text-white">Ex-Felon (within 12 months of release)</div>
                    <div className="text-[#A8F32C]">$2,400</div>
                  </div>
                  <div className="text-white/60">40% of first $6,000 in wages</div>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <div className="text-white">SNAP Recipient + Ex-Felon</div>
                    <div className="text-[#A8F32C]">$9,600</div>
                  </div>
                  <div className="text-white/60">40% of first $24,000 in wages (2-year maximum)</div>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <div className="text-white">Long-term Unemployment Recipient</div>
                    <div className="text-[#A8F32C]">$2,400</div>
                  </div>
                  <div className="text-white/60">40% of first $6,000 in wages</div>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <div className="text-white">SNAP Recipient</div>
                    <div className="text-[#A8F32C]">$2,400</div>
                  </div>
                  <div className="text-white/60">40% of first $6,000 in wages</div>
                </div>
              </div>
            </Card>

            <Card className="bg-[#121212] border-white/10 p-6">
              <h2 className="text-xl mb-4">Important Deadlines</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-white mb-1">Day 0: Hire Date</div>
                    <div className="text-white/60">Employee starts work</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-white mb-1">Day 28: Filing Deadline</div>
                    <div className="text-white/60">Form 8850 must be submitted to State Workforce Agency</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-white mb-1">Day 120: Minimum Hours</div>
                    <div className="text-white/60">Employee must work 120 hours for partial credit (25%)</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-white mb-1">Day 400: Full Credit</div>
                    <div className="text-white/60">Employee must work 400 hours for full credit (40%)</div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-[#121212] border-white/10 p-6">
              <h2 className="text-xl mb-4">Contact Information</h2>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-white/60 mb-1">Illinois State Workforce Agency</div>
                  <div className="text-white">Phone: (800) 555-WOTC</div>
                  <div className="text-white">Email: wotc@ides.illinois.gov</div>
                </div>
                <div>
                  <div className="text-white/60 mb-1">IRS WOTC Hotline</div>
                  <div className="text-white">Phone: (800) 829-1040</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // DASHBOARD VIEW
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="border-b border-white/5 bg-[#121212]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <LogoFinal size="md" />
            <div className="flex gap-3">
              <Button
                onClick={() => setActiveView('resources')}
                variant="outline"
                className="border-white/20 text-white"
              >
                <Info className="mr-2 h-4 w-4" />
                WOTC Resources
              </Button>
              <Button onClick={onBack} variant="outline" className="border-white/20 text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl mb-2">WOTC Tax Credit Center</h1>
        <p className="text-white/60 mb-8">
          Maximize federal tax credits by hiring WOTC-eligible individuals
        </p>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-[#A8F32C]/20 via-[#121212] to-[#121212] border-[#A8F32C] p-6">
            <div className="text-sm text-white/60 mb-2">Total Potential Value</div>
            <div className="text-4xl text-[#A8F32C] mb-2">${totalPotentialValue.toLocaleString()}</div>
            <div className="text-sm text-white/60">{mockWOTCApplicants.length} eligible hires</div>
          </Card>

          <Card className="bg-[#121212] border-white/10 p-6">
            <div className="text-sm text-white/60 mb-2">Already Claimed</div>
            <div className="text-4xl text-white mb-2">${claimedValue.toLocaleString()}</div>
            <div className="text-sm text-white/60">
              {mockWOTCApplicants.filter(a => a.status === 'claimed').length} successful claims
            </div>
          </Card>

          <Card className="bg-[#121212] border-white/10 p-6">
            <div className="text-sm text-white/60 mb-2">In Progress</div>
            <div className="text-4xl text-white mb-2">${pendingValue.toLocaleString()}</div>
            <div className="text-sm text-white/60">
              {mockWOTCApplicants.filter(a => a.status !== 'claimed').length} pending
            </div>
          </Card>
        </div>

        {/* Urgent Cases */}
        {urgentCases.length > 0 && (
          <Card className="bg-red-500/10 border-red-500/30 p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-6 w-6 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-lg text-red-500 mb-2">⚠️ {urgentCases.length} Case(s) Expiring Soon!</h3>
                <p className="text-sm text-white/60 mb-4">
                  File Form 8850 within 28 days of hire. These have less than 7 days left:
                </p>
                <div className="space-y-2">
                  {urgentCases.map(app => (
                    <div key={app.id} className="bg-black/30 p-3 rounded-lg flex justify-between items-center">
                      <div>
                        <div className="text-white">{app.name} - {app.position}</div>
                        <div className="text-xs text-white/60">Hired {app.hireDate}</div>
                      </div>
                      <Button
                        onClick={() => {
                          setSelectedApplicant(app);
                          setActiveView('applicant-detail');
                        }}
                        className="bg-red-500 text-white hover:bg-red-500/90"
                      >
                        File Now
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Applicants List */}
        <div>
          <h2 className="text-2xl mb-6">WOTC-Eligible Hires</h2>
          <div className="space-y-4">
            {mockWOTCApplicants.map(app => (
              <Card key={app.id} className="bg-[#121212] border-white/10 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg text-white">{app.name}</h3>
                      <Badge className={`${
                        app.status === 'claimed' ? 'bg-[#A8F32C]/20 text-[#A8F32C]' :
                        app.status === 'certified' ? 'bg-blue-500/20 text-blue-500' :
                        app.status === 'submitted-to-swa' ? 'bg-purple-500/20 text-purple-500' :
                        app.status === 'forms-generated' ? 'bg-yellow-500/20 text-yellow-500' :
                        'bg-white/20 text-white'
                      } border-0`}>
                        {app.status.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </Badge>
                    </div>
                    <div className="text-white/60 mb-3">{app.position} • Hired {app.hireDate}</div>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-white/60">Target Group</div>
                        <div className="text-white">{app.wotcCategory}</div>
                      </div>
                      <div>
                        <div className="text-white/60">Credit Value</div>
                        <div className="text-[#A8F32C]">${app.wotcValue.toLocaleString()}</div>
                      </div>
                      {app.daysRemaining && (
                        <div>
                          <div className="text-white/60">Days to File</div>
                          <div className={app.daysRemaining <= 7 ? 'text-red-500' : 'text-white'}>
                            {app.daysRemaining} days
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <Button
                    onClick={() => {
                      setSelectedApplicant(app);
                      setActiveView('applicant-detail');
                    }}
                    variant="outline"
                    className="border-[#A8F32C]/50 text-[#A8F32C]"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
