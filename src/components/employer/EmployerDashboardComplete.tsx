import { useState } from 'react';
import { Users, Briefcase, DollarSign, Plus, Settings, Star } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import LogoFinal from '../common/LogoFinal';
import FairPathScore from '../common/FairPathScore';
import EmployerApplicationReview from './EmployerApplicationReview';
import EmployerApplicationApproval from './EmployerApplicationApproval';
import WOTCCenterComplete from './WOTCCenterComplete';

interface EmployerDashboardCompleteProps {
  companyName?: string;
  onLogout?: () => void;
  onViewPricing?: () => void;
  freeMode?: boolean;
}

// DUMMY APPLICATIONS WITH FULL WOTC DATA
const mockApplications = [
  {
    id: '1',
    applicantName: 'Marcus Johnson',
    age: 32,
    jobTitle: 'Warehouse Associate',
    department: 'Logistics',
    appliedDate: '2025-11-20',
    status: 'pending',
    wotcEligible: true,
    wotcValue: 2400,
    wotcTargetGroup: 'Ex-Felon (within 12 months of release)',
    convictionType: 'Drug Offenses',
    yearsOut: 2,
    fairPathScore: 720,
    email: 'marcus.j@email.com',
    phone: '(555) 123-4567',
    location: 'Springfield, IL',
    expectedSalary: '$15-17/hr',
    startDate: 'Immediately',
    creditScore: 620,
    currentJob: {
      title: 'Warehouse Associate',
      company: 'ABC Manufacturing',
      duration: '1 year',
      reasonLeaving: 'Seeking career advancement'
    },
    previousJobs: [
      { title: 'Logistics Coordinator', company: 'XYZ Logistics', duration: '2021-2023' },
      { title: 'Delivery Driver', company: 'Express Shipping', duration: '2019-2021' }
    ],
    skills: ['Forklift Operation', 'Inventory Management', 'Team Leadership', 'Safety Compliance', 'MS Office'],
    certifications: [
      { name: 'Forklift Certification', issuer: 'Safety Training Institute', year: '2023' },
      { name: 'OSHA 10-Hour Safety', issuer: 'OSHA', year: '2023' }
    ]
  },
  {
    id: '2',
    applicantName: 'Sarah Williams',
    age: 28,
    jobTitle: 'Warehouse Associate',
    department: 'Logistics',
    appliedDate: '2025-11-22',
    status: 'interview',
    wotcEligible: true,
    wotcValue: 9600,
    wotcTargetGroup: 'SNAP Recipient + Ex-Felon',
    convictionType: 'Property Crimes',
    yearsOut: 4,
    fairPathScore: 785,
    email: 'sarah.w@email.com',
    phone: '(555) 234-5678',
    location: 'Springfield, IL',
    expectedSalary: '$16-18/hr',
    startDate: '2 weeks notice required',
    creditScore: 580,
    currentJob: {
      title: 'Warehouse Worker',
      company: 'Local Distributor',
      duration: '2 years',
      reasonLeaving: 'Better opportunity & benefits'
    },
    previousJobs: [
      { title: 'Retail Associate', company: 'Big Box Store', duration: '2020-2023' }
    ],
    skills: ['Order Picking', 'Packing', 'Quality Control', 'Teamwork', 'Time Management'],
    certifications: [
      { name: 'Forklift Certification', issuer: 'Safety Training Institute', year: '2024' }
    ]
  },
  {
    id: '3',
    applicantName: 'David Chen',
    age: 35,
    jobTitle: 'Forklift Operator',
    department: 'Warehouse',
    appliedDate: '2025-11-23',
    status: 'reviewing',
    wotcEligible: false,
    wotcValue: 0,
    wotcTargetGroup: 'Not Applicable',
    convictionType: 'None',
    yearsOut: 0,
    fairPathScore: 650,
    email: 'david.c@email.com',
    phone: '(555) 345-6789',
    location: 'Springfield, IL',
    expectedSalary: '$18-20/hr',
    startDate: 'Immediately',
    creditScore: 680,
    currentJob: {
      title: 'Forklift Operator',
      company: 'Manufacturing Co',
      duration: '3 years',
      reasonLeaving: 'Company downsizing'
    },
    previousJobs: [
      { title: 'Warehouse Lead', company: 'Supply Chain Inc', duration: '2018-2022' }
    ],
    skills: ['Forklift Operation', 'Warehouse Management', 'Safety Training', 'Leadership'],
    certifications: [
      { name: 'Forklift Certification', issuer: 'OSHA Certified', year: '2024' },
      { name: 'Warehouse Safety', issuer: 'OSHA', year: '2023' }
    ]
  }
];

export default function EmployerDashboardComplete({ 
  companyName = 'Great Lakes Distribution', 
  onLogout, 
  onViewPricing, 
  freeMode = false 
}: EmployerDashboardCompleteProps) {
  const [activeView, setActiveView] = useState<'dashboard' | 'applications' | 'application-detail' | 'approval-flow' | 'wotc'>('dashboard');
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [approvalAction, setApprovalAction] = useState<'approve' | 'reject' | null>(null);

  const totalApplications = mockApplications.length;
  const pendingReview = mockApplications.filter(a => a.status === 'pending').length;
  const interviewScheduled = mockApplications.filter(a => a.status === 'interview').length;
  const totalWOTCValue = mockApplications.filter(a => a.wotcEligible).reduce((sum, a) => sum + a.wotcValue, 0);

  // WOTC VIEW
  if (activeView === 'wotc') {
    return <WOTCCenterComplete onBack={() => setActiveView('dashboard')} />;
  }

  // APPROVAL FLOW
  if (activeView === 'approval-flow' && selectedApplication && approvalAction) {
    return (
      <EmployerApplicationApproval
        application={selectedApplication}
        action={approvalAction}
        onComplete={(decision, data) => {
          console.log('Decision:', decision, 'Data:', data);
          alert(`Application ${decision}: ${selectedApplication.applicantName}`);
          setActiveView('applications');
        }}
        onCancel={() => setActiveView('application-detail')}
      />
    );
  }

  // APPLICATION DETAIL
  if (activeView === 'application-detail' && selectedApplication) {
    return (
      <EmployerApplicationReview
        application={selectedApplication}
        onBack={() => setActiveView('applications')}
        onApprove={() => {
          setApprovalAction('approve');
          setActiveView('approval-flow');
        }}
        onReject={() => {
          setApprovalAction('reject');
          setActiveView('approval-flow');
        }}
      />
    );
  }

  // APPLICATIONS LIST
  if (activeView === 'applications') {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="border-b border-white/5 bg-[#121212]">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <LogoFinal size="md" />
              <Button
                onClick={() => setActiveView('dashboard')}
                variant="outline"
                className="border-white/20 text-white"
              >
                Back to Dashboard
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-3xl mb-8">Job Applications</h1>

          <div className="space-y-4">
            {mockApplications.map(app => (
              <Card key={app.id} className="bg-[#121212] border-white/10 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl text-white">{app.applicantName}</h3>
                      {app.wotcEligible && (
                        <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30">
                          WOTC ${app.wotcValue.toLocaleString()}
                        </Badge>
                      )}
                      <Badge className={`${
                        app.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                        app.status === 'interview' ? 'bg-blue-500/20 text-blue-500' :
                        'bg-white/20 text-white'
                      } border-0`}>
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="text-white/60 mb-4">{app.jobTitle} • Applied {app.appliedDate}</div>
                    <div className="grid md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <div className="text-white/60">FairPath Score</div>
                        <div className="text-[#A8F32C]">{app.fairPathScore}</div>
                      </div>
                      <div>
                        <div className="text-white/60">Experience</div>
                        <div className="text-white">{app.yearsOut > 0 ? `${app.previousJobs.length + 1} positions` : `${app.previousJobs.length} positions`}</div>
                      </div>
                      <div>
                        <div className="text-white/60">Salary</div>
                        <div className="text-white">{app.expectedSalary}</div>
                      </div>
                      <div>
                        <div className="text-white/60">Location</div>
                        <div className="text-white">{app.location}</div>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => {
                      setSelectedApplication(app);
                      setActiveView('application-detail');
                    }}
                    className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
                  >
                    Review Application
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // DASHBOARD
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/5 bg-[#121212] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <LogoFinal size="md" />
            <div className="flex items-center gap-3">
              {freeMode && (
                <Badge className="bg-white/10 text-white/60 border-0">
                  FREE PLAN
                </Badge>
              )}
              <Button
                onClick={() => setActiveView('wotc')}
                variant="outline"
                className="border-[#A8F32C]/50 text-[#A8F32C]"
              >
                <DollarSign className="mr-2 h-4 w-4" />
                WOTC Center
              </Button>
              {freeMode ? (
                <Button
                  onClick={onViewPricing}
                  className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
                >
                  Upgrade to Post Jobs
                </Button>
              ) : (
                <Button className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">
                  <Plus className="mr-2 h-4 w-4" />
                  Post New Job
                </Button>
              )}
              {onViewPricing && (
                <Button variant="ghost" className="text-white/60" onClick={onViewPricing}>
                  <Settings className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Company Header */}
        <div className="mb-8">
          <h1 className="text-3xl mb-2">{companyName}</h1>
          <div className="text-white/60">Employer Dashboard</div>
        </div>

        {/* FairPath Score */}
        <div className="mb-8">
          <FairPathScore
            score={845}
            userType="employer"
            recentChange={+12}
          />
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-[#121212] border-white/10 p-6">
            <div className="flex items-center justify-between mb-2">
              <Users className="h-8 w-8 text-white/60" />
            </div>
            <div className="text-3xl mb-1">{totalApplications}</div>
            <div className="text-sm text-white/60">Total Applications</div>
          </Card>

          <Card className="bg-[#121212] border-white/10 p-6">
            <div className="flex items-center justify-between mb-2">
              <Briefcase className="h-8 w-8 text-yellow-500" />
            </div>
            <div className="text-3xl mb-1">{pendingReview}</div>
            <div className="text-sm text-white/60">Pending Review</div>
          </Card>

          <Card className="bg-[#121212] border-white/10 p-6">
            <div className="flex items-center justify-between mb-2">
              <Star className="h-8 w-8 text-blue-500" />
            </div>
            <div className="text-3xl mb-1">{interviewScheduled}</div>
            <div className="text-sm text-white/60">Interviews Scheduled</div>
          </Card>

          <Card className="bg-gradient-to-br from-[#A8F32C]/20 via-[#121212] to-[#121212] border-[#A8F32C] p-6">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="h-8 w-8 text-[#A8F32C]" />
            </div>
            <div className="text-3xl text-[#A8F32C] mb-1">${totalWOTCValue.toLocaleString()}</div>
            <div className="text-sm text-white/60">WOTC Potential</div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl mb-4">Quick Actions</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Button
              onClick={() => setActiveView('applications')}
              variant="outline"
              className="border-[#A8F32C]/30 text-white hover:bg-[#A8F32C]/10 h-auto py-4 justify-start"
            >
              <Users className="mr-3 h-5 w-5 text-[#A8F32C]" />
              <div className="text-left">
                <div>Review Applications</div>
                <div className="text-xs text-white/60 mt-1">{pendingReview} need review</div>
              </div>
            </Button>

            <Button
              onClick={() => setActiveView('wotc')}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/5 h-auto py-4 justify-start"
            >
              <DollarSign className="mr-3 h-5 w-5 text-white/60" />
              <div className="text-left">
                <div>WOTC Tax Credits</div>
                <div className="text-xs text-white/60 mt-1">${totalWOTCValue.toLocaleString()} available</div>
              </div>
            </Button>

            <Button
              onClick={freeMode ? onViewPricing : undefined}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/5 h-auto py-4 justify-start"
              disabled={freeMode}
            >
              <Plus className="mr-3 h-5 w-5 text-white/60" />
              <div className="text-left">
                <div>Post New Job</div>
                <div className="text-xs text-white/60 mt-1">{freeMode ? 'Upgrade required' : 'Start hiring'}</div>
              </div>
            </Button>
          </div>
        </div>

        {/* Recent Applications */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl">Recent Applications</h2>
            <Button
              onClick={() => setActiveView('applications')}
              variant="ghost"
              className="text-[#A8F32C]"
            >
              View All →
            </Button>
          </div>
          <div className="space-y-4">
            {mockApplications.slice(0, 3).map(app => (
              <Card key={app.id} className="bg-[#121212] border-white/10 p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg text-white">{app.applicantName}</h3>
                      {app.wotcEligible && (
                        <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-0">
                          WOTC ${app.wotcValue.toLocaleString()}
                        </Badge>
                      )}
                    </div>
                    <div className="text-white/60 text-sm">{app.jobTitle} • Applied {app.appliedDate}</div>
                  </div>
                  <Button
                    onClick={() => {
                      setSelectedApplication(app);
                      setActiveView('application-detail');
                    }}
                    variant="outline"
                    className="border-[#A8F32C]/50 text-[#A8F32C]"
                  >
                    Review
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
