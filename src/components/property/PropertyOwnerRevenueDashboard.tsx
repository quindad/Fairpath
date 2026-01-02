import { useState } from 'react';
import { DollarSign, TrendingUp, AlertTriangle, CheckCircle, Clock, Calendar, Home, Users, XCircle, Download, Eye } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface RevenueData {
  totalEarned: number;
  pendingPayout: number;
  nextPayoutDate: string;
  totalApplications: number;
  compliantApplications: number;
  rentedCount: number;
  complianceRate: number;
  payoutReduction: number;
}

interface FastTrackApplication {
  id: string;
  applicantName: string;
  property: string;
  amount: number;
  propertyOwnerShare: number;
  screeningCost: number;
  appliedDate: string;
  status: 'screening' | 'showing-scheduled' | 'showing-completed' | 'approved' | 'denied' | 'rented';
  showingScheduled: boolean;
  showingDate?: string;
  denialReason?: string;
  compliant: boolean;
}

export default function PropertyOwnerRevenueDashboard() {
  const [view, setView] = useState<'overview' | 'applications' | 'payouts' | 'compliance'>('overview');
  const [selectedApp, setSelectedApp] = useState<FastTrackApplication | null>(null);

  // Mock revenue data
  const revenueData: RevenueData = {
    totalEarned: 1847.50,
    pendingPayout: 627.30,
    nextPayoutDate: '2025-01-20',
    totalApplications: 43,
    compliantApplications: 41,
    rentedCount: 2,
    complianceRate: 95.3,
    payoutReduction: 0 // If non-compliant, would be positive
  };

  // Mock applications
  const applications: FastTrackApplication[] = [
    {
      id: 'FT-1704470001',
      applicantName: 'Marcus Johnson',
      property: '123 Main St, Unit 2B',
      amount: 75,
      propertyOwnerShare: 45,
      screeningCost: 17.99,
      appliedDate: '2025-01-05',
      status: 'rented',
      showingScheduled: true,
      showingDate: '2025-01-06',
      compliant: true
    },
    {
      id: 'FT-1704470002',
      applicantName: 'David Williams',
      property: '456 Oak Ave, Apt 3',
      amount: 70,
      propertyOwnerShare: 42,
      screeningCost: 17.99,
      appliedDate: '2025-01-04',
      status: 'denied',
      showingScheduled: true,
      showingDate: '2025-01-05',
      denialReason: 'Credit score below minimum requirement (580)',
      compliant: true
    },
    {
      id: 'FT-1704470003',
      applicantName: 'James Brown',
      property: '789 Pine Blvd, Unit 1A',
      amount: 75,
      propertyOwnerShare: 45,
      screeningCost: 17.99,
      appliedDate: '2025-01-03',
      status: 'showing-scheduled',
      showingScheduled: true,
      showingDate: '2025-01-07',
      compliant: true
    },
    {
      id: 'FT-1704470004',
      applicantName: 'Robert Davis',
      property: '456 Oak Ave, Apt 3',
      amount: 65,
      propertyOwnerShare: 39,
      screeningCost: 17.99,
      appliedDate: '2025-01-02',
      status: 'denied',
      showingScheduled: false,
      denialReason: 'No response to showing request',
      compliant: false // Non-compliant: no showing scheduled
    },
    {
      id: 'FT-1704470005',
      applicantName: 'Michael Miller',
      property: '123 Main St, Unit 2B',
      amount: 70,
      propertyOwnerShare: 42,
      screeningCost: 17.99,
      appliedDate: '2025-01-01',
      status: 'showing-completed',
      showingScheduled: true,
      showingDate: '2025-01-02',
      compliant: true
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'screening':
        return <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/30">Screening</Badge>;
      case 'showing-scheduled':
        return <Badge className="bg-purple-500/20 text-purple-500 border-purple-500/30">Showing Scheduled</Badge>;
      case 'showing-completed':
        return <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">Showing Done</Badge>;
      case 'approved':
        return <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30">Approved</Badge>;
      case 'denied':
        return <Badge className="bg-red-500/20 text-red-500 border-red-500/30">Denied</Badge>;
      case 'rented':
        return <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30">Rented ✓</Badge>;
      default:
        return <Badge className="bg-white/10 text-white/60 border-white/20">Unknown</Badge>;
    }
  };

  if (view === 'overview') {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl mb-2">FastTrack Revenue Dashboard</h1>
            <p className="text-white/60">Track your earnings from FastTrack applications</p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 mb-6 border-b border-white/10">
            <button
              onClick={() => setView('overview')}
              className="px-4 py-2 border-b-2 border-[#A8F32C] text-[#A8F32C]"
            >
              Overview
            </button>
            <button
              onClick={() => setView('applications')}
              className="px-4 py-2 border-b-2 border-transparent text-white/60 hover:text-white"
            >
              Applications
            </button>
            <button
              onClick={() => setView('payouts')}
              className="px-4 py-2 border-b-2 border-transparent text-white/60 hover:text-white"
            >
              Payouts
            </button>
            <button
              onClick={() => setView('compliance')}
              className="px-4 py-2 border-b-2 border-transparent text-white/60 hover:text-white"
            >
              Compliance
            </button>
          </div>

          {/* Revenue Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-[#A8F32C]/20 to-transparent border-[#A8F32C]/30 p-6">
              <div className="flex items-center justify-between mb-4">
                <DollarSign className="w-8 h-8 text-[#A8F32C]" />
                <TrendingUp className="w-5 h-5 text-[#A8F32C]" />
              </div>
              <div className="text-3xl mb-1">${revenueData.totalEarned.toFixed(2)}</div>
              <div className="text-sm text-white/60">Total Earned</div>
            </Card>

            <Card className="bg-white/5 border-white/10 p-6">
              <div className="flex items-center justify-between mb-4">
                <Clock className="w-8 h-8 text-blue-500" />
              </div>
              <div className="text-3xl mb-1">${revenueData.pendingPayout.toFixed(2)}</div>
              <div className="text-sm text-white/60">Pending Payout</div>
              <div className="text-xs text-blue-500 mt-2">Next: {revenueData.nextPayoutDate}</div>
            </Card>

            <Card className="bg-white/5 border-white/10 p-6">
              <div className="flex items-center justify-between mb-4">
                <Users className="w-8 h-8 text-purple-500" />
              </div>
              <div className="text-3xl mb-1">{revenueData.totalApplications}</div>
              <div className="text-sm text-white/60">Total Applications</div>
              <div className="text-xs text-purple-500 mt-2">{revenueData.rentedCount} Rented</div>
            </Card>

            <Card className="bg-white/5 border-white/10 p-6">
              <div className="flex items-center justify-between mb-4">
                <CheckCircle className="w-8 h-8 text-[#A8F32C]" />
              </div>
              <div className="text-3xl mb-1">{revenueData.complianceRate}%</div>
              <div className="text-sm text-white/60">Compliance Rate</div>
              <div className="text-xs text-[#A8F32C] mt-2">{revenueData.compliantApplications}/{revenueData.totalApplications} compliant</div>
            </Card>
          </div>

          {/* Compliance Warning */}
          {revenueData.complianceRate < 100 && (
            <Card className="bg-yellow-500/10 border border-yellow-500/30 p-6 mb-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-yellow-500 mb-2">Compliance Alert</div>
                  <div className="text-sm text-white/80 space-y-2">
                    <p>
                      You have {revenueData.totalApplications - revenueData.compliantApplications} non-compliant application(s). 
                      Non-compliant applications receive reduced payout (60% of 60% = 36% instead of 60%).
                    </p>
                    <p className="font-medium">
                      To maintain full 60% revenue share:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>Schedule showings within 48 hours</li>
                      <li>Provide legitimate denial reasons in writing</li>
                      <li>Rent to at least 1 out of 20 FastTrack applicants</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Recent Applications */}
          <Card className="bg-white/5 border-white/10 p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl">Recent FastTrack Applications</h2>
              <Button
                onClick={() => setView('applications')}
                variant="outline"
                className="border-white/20 text-white"
                size="sm"
              >
                View All
              </Button>
            </div>

            <div className="space-y-4">
              {applications.slice(0, 5).map((app) => (
                <div
                  key={app.id}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-[#A8F32C]/30 transition-all cursor-pointer"
                  onClick={() => setSelectedApp(app)}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                      <Home className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium mb-1">{app.applicantName}</div>
                      <div className="text-sm text-white/60">{app.property}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[#A8F32C] font-medium mb-1">
                        ${app.propertyOwnerShare.toFixed(2)}
                      </div>
                      <div className="text-xs text-white/60">{app.appliedDate}</div>
                    </div>
                    <div className="w-40">
                      {getStatusBadge(app.status)}
                    </div>
                    {!app.compliant && (
                      <AlertTriangle className="w-5 h-5 text-yellow-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Revenue Breakdown */}
          <Card className="bg-white/5 border-white/10 p-6">
            <h2 className="text-xl mb-6">Revenue Breakdown (Last 30 Days)</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <span className="text-white/60">Gross Application Fees</span>
                <span className="text-lg">$3,095.00</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <span className="text-white/60">Your Share (60%)</span>
                <span className="text-lg text-[#A8F32C]">$1,857.00</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <span className="text-white/60">Compliance Reduction</span>
                <span className="text-lg text-red-500">-$9.50</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="font-medium">Net Earnings</span>
                <span className="text-2xl text-[#A8F32C]">$1,847.50</span>
              </div>
            </div>

            <div className="mt-6 bg-white/5 rounded-lg p-4">
              <div className="text-sm text-white/60 mb-2">Payment Schedule</div>
              <div className="space-y-2 text-sm">
                <p>• Payouts processed every 45 days</p>
                <p>• OR after 20 applications are resolved</p>
                <p>• Next payout: <span className="text-[#A8F32C]">{revenueData.nextPayoutDate}</span></p>
                <p>• Method: Direct deposit (ACH)</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (view === 'applications') {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl mb-2">FastTrack Applications</h1>
            <p className="text-white/60">Manage and track all applications</p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 mb-6 border-b border-white/10">
            <button
              onClick={() => setView('overview')}
              className="px-4 py-2 border-b-2 border-transparent text-white/60 hover:text-white"
            >
              Overview
            </button>
            <button
              onClick={() => setView('applications')}
              className="px-4 py-2 border-b-2 border-[#A8F32C] text-[#A8F32C]"
            >
              Applications
            </button>
            <button
              onClick={() => setView('payouts')}
              className="px-4 py-2 border-b-2 border-transparent text-white/60 hover:text-white"
            >
              Payouts
            </button>
            <button
              onClick={() => setView('compliance')}
              className="px-4 py-2 border-b-2 border-transparent text-white/60 hover:text-white"
            >
              Compliance
            </button>
          </div>

          <Card className="bg-white/5 border-white/10 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl">All Applications ({applications.length})</h2>
              <Button
                className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
                size="sm"
              >
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
            </div>

            <div className="space-y-3">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-[#A8F32C]/30 transition-all cursor-pointer"
                  onClick={() => setSelectedApp(app)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="font-medium">{app.applicantName}</div>
                      {!app.compliant && (
                        <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30 text-xs">
                          Non-Compliant
                        </Badge>
                      )}
                    </div>
                    {getStatusBadge(app.status)}
                  </div>

                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-white/60 mb-1">Property</div>
                      <div>{app.property}</div>
                    </div>
                    <div>
                      <div className="text-white/60 mb-1">Application Date</div>
                      <div>{app.appliedDate}</div>
                    </div>
                    <div>
                      <div className="text-white/60 mb-1">Your Revenue</div>
                      <div className="text-[#A8F32C]">${app.propertyOwnerShare.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-white/60 mb-1">Showing</div>
                      <div>
                        {app.showingScheduled ? (
                          <div className="flex items-center gap-1 text-[#A8F32C]">
                            <CheckCircle className="w-4 h-4" />
                            {app.showingDate}
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-red-500">
                            <XCircle className="w-4 h-4" />
                            Not scheduled
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {app.denialReason && (
                    <div className="mt-3 pt-3 border-t border-white/10">
                      <div className="text-xs text-white/60 mb-1">Denial Reason</div>
                      <div className="text-sm">{app.denialReason}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Application Detail Modal */}
        {selectedApp && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-6">
            <Card className="bg-[#121212] border-white/20 p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl">Application Details</h2>
                <button
                  onClick={() => setSelectedApp(null)}
                  className="text-white/60 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-white/60 mb-1">Application ID</div>
                    <div className="font-mono">{selectedApp.id}</div>
                  </div>
                  <div>
                    <div className="text-sm text-white/60 mb-1">Status</div>
                    <div>{getStatusBadge(selectedApp.status)}</div>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-white/60 mb-1">Applicant</div>
                  <div className="text-lg">{selectedApp.applicantName}</div>
                </div>

                <div>
                  <div className="text-sm text-white/60 mb-1">Property</div>
                  <div>{selectedApp.property}</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-white/60 mb-1">Application Date</div>
                    <div>{selectedApp.appliedDate}</div>
                  </div>
                  <div>
                    <div className="text-sm text-white/60 mb-1">Showing Date</div>
                    <div>
                      {selectedApp.showingScheduled ? (
                        <div className="flex items-center gap-1 text-[#A8F32C]">
                          <CheckCircle className="w-4 h-4" />
                          {selectedApp.showingDate}
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-red-500">
                          <XCircle className="w-4 h-4" />
                          Not scheduled
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-sm mb-3">Revenue Breakdown</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/60">Application Fee</span>
                      <span>${selectedApp.amount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Screening Cost (SingleKey)</span>
                      <span>-${selectedApp.screeningCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Platform Fee (40%)</span>
                      <span>-${((selectedApp.amount - selectedApp.screeningCost) * 0.4).toFixed(2)}</span>
                    </div>
                    <div className="border-t border-white/10 pt-2 flex justify-between font-medium">
                      <span>Your Share (60%)</span>
                      <span className="text-[#A8F32C]">${selectedApp.propertyOwnerShare.toFixed(2)}</span>
                    </div>
                    {!selectedApp.compliant && (
                      <div className="flex justify-between text-red-500">
                        <span>Compliance Reduction (40%)</span>
                        <span>-${(selectedApp.propertyOwnerShare * 0.4).toFixed(2)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {selectedApp.denialReason && (
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-sm text-white/60 mb-2">Denial Reason</div>
                    <div>{selectedApp.denialReason}</div>
                  </div>
                )}

                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  {selectedApp.compliant ? (
                    <div className="flex items-center gap-2 text-[#A8F32C]">
                      <CheckCircle className="w-5 h-5" />
                      <span>Compliant - Full Revenue</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-yellow-500">
                      <AlertTriangle className="w-5 h-5" />
                      <span>Non-Compliant - Reduced Revenue (36% instead of 60%)</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <Button
                  onClick={() => setSelectedApp(null)}
                  className="flex-1 bg-white/10 text-white hover:bg-white/20"
                >
                  Close
                </Button>
                <Button
                  className="flex-1 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View Full Report
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    );
  }

  if (view === 'payouts') {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl mb-2">Payout History</h1>
            <p className="text-white/60">Track your FastTrack revenue payouts</p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 mb-6 border-b border-white/10">
            <button
              onClick={() => setView('overview')}
              className="px-4 py-2 border-b-2 border-transparent text-white/60 hover:text-white"
            >
              Overview
            </button>
            <button
              onClick={() => setView('applications')}
              className="px-4 py-2 border-b-2 border-transparent text-white/60 hover:text-white"
            >
              Applications
            </button>
            <button
              onClick={() => setView('payouts')}
              className="px-4 py-2 border-b-2 border-[#A8F32C] text-[#A8F32C]"
            >
              Payouts
            </button>
            <button
              onClick={() => setView('compliance')}
              className="px-4 py-2 border-b-2 border-transparent text-white/60 hover:text-white"
            >
              Compliance
            </button>
          </div>

          {/* Pending Payout */}
          <Card className="bg-gradient-to-r from-[#A8F32C]/20 to-transparent border-[#A8F32C]/30 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-sm text-white/60 mb-1">Next Payout</div>
                <div className="text-4xl text-[#A8F32C] mb-2">${revenueData.pendingPayout.toFixed(2)}</div>
                <div className="text-white/80">Scheduled for {revenueData.nextPayoutDate}</div>
              </div>
              <Calendar className="w-12 h-12 text-[#A8F32C]" />
            </div>
            <div className="bg-white/5 rounded-lg p-4 mt-4">
              <div className="text-sm mb-2">Payout Conditions</div>
              <div className="space-y-1 text-sm text-white/80">
                <p>✓ Every 45 days from first application</p>
                <p>✓ OR after 20 applications are resolved</p>
                <p>• Current: 14 days elapsed, 12 applications resolved</p>
              </div>
            </div>
          </Card>

          {/* Payout History */}
          <Card className="bg-white/5 border-white/10 p-6">
            <h2 className="text-xl mb-6">Payout History</h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-medium mb-1">December 2024 Payout</div>
                    <div className="text-sm text-white/60">Paid on Dec 15, 2024</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl text-[#A8F32C]">$1,220.20</div>
                    <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30 mt-1">
                      Completed
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-sm text-white/60">
                  <span>31 applications</span>
                  <span>•</span>
                  <span>100% compliant</span>
                  <span>•</span>
                  <span>Method: ACH ****4532</span>
                </div>
              </div>

              <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-medium mb-1">November 2024 Payout</div>
                    <div className="text-sm text-white/60">Paid on Nov 30, 2024</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl text-[#A8F32C]">$847.50</div>
                    <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30 mt-1">
                      Completed
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-sm text-white/60">
                  <span>20 applications (trigger met)</span>
                  <span>•</span>
                  <span>95% compliant</span>
                  <span>•</span>
                  <span>Method: ACH ****4532</span>
                </div>
              </div>

              <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-medium mb-1">October 2024 Payout</div>
                    <div className="text-sm text-white/60">Paid on Oct 21, 2024</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl text-[#A8F32C]">$1,054.80</div>
                    <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30 mt-1">
                      Completed
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-sm text-white/60">
                  <span>26 applications</span>
                  <span>•</span>
                  <span>96% compliant</span>
                  <span>•</span>
                  <span>Method: ACH ****4532</span>
                </div>
              </div>
            </div>

            <Button
              className="w-full mt-6 bg-white/10 text-white hover:bg-white/20"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Tax Statement (1099)
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  if (view === 'compliance') {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl mb-2">Compliance Tracking</h1>
            <p className="text-white/60">Maintain compliance to maximize revenue</p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 mb-6 border-b border-white/10">
            <button
              onClick={() => setView('overview')}
              className="px-4 py-2 border-b-2 border-transparent text-white/60 hover:text-white"
            >
              Overview
            </button>
            <button
              onClick={() => setView('applications')}
              className="px-4 py-2 border-b-2 border-transparent text-white/60 hover:text-white"
            >
              Applications
            </button>
            <button
              onClick={() => setView('payouts')}
              className="px-4 py-2 border-b-2 border-transparent text-white/60 hover:text-white"
            >
              Payouts
            </button>
            <button
              onClick={() => setView('compliance')}
              className="px-4 py-2 border-b-2 border-[#A8F32C] text-[#A8F32C]"
            >
              Compliance
            </button>
          </div>

          {/* Compliance Score */}
          <Card className="bg-gradient-to-r from-[#A8F32C]/20 to-transparent border-[#A8F32C]/30 p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-white/60 mb-2">Compliance Score</div>
                <div className="text-5xl text-[#A8F32C] mb-2">{revenueData.complianceRate}%</div>
                <div className="text-white/80">{revenueData.compliantApplications} of {revenueData.totalApplications} applications compliant</div>
              </div>
              <CheckCircle className="w-16 h-16 text-[#A8F32C]" />
            </div>
          </Card>

          {/* Compliance Rules */}
          <Card className="bg-white/5 border-white/10 p-6 mb-6">
            <h2 className="text-xl mb-4">FastTrack Compliance Requirements</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-white/5 rounded-lg">
                <CheckCircle className="w-5 h-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium mb-1">1. Guaranteed Showing Within 48 Hours</div>
                  <div className="text-sm text-white/60">
                    You must schedule a showing within 48 hours of application submission. 
                    Failure to do so reduces your payout from 60% to 36%.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-white/5 rounded-lg">
                <CheckCircle className="w-5 h-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium mb-1">2. Legitimate Denial Reasons</div>
                  <div className="text-sm text-white/60">
                    If denying an applicant, you must provide a legitimate, written reason 
                    (e.g., credit score, income verification, rental history). Vague or discriminatory 
                    reasons will result in payout reduction.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-white/5 rounded-lg">
                <CheckCircle className="w-5 h-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium mb-1">3. Rent to 1 of 20 FastTrack Applicants</div>
                  <div className="text-sm text-white/60">
                    You must approve and rent to at least 1 out of every 20 FastTrack applicants. 
                    This ensures good faith participation in the program. Current ratio: {revenueData.rentedCount}/20.
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Non-Compliant Applications */}
          <Card className="bg-white/5 border-white/10 p-6">
            <h2 className="text-xl mb-4">Non-Compliant Applications</h2>
            {applications.filter(app => !app.compliant).length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-[#A8F32C] mx-auto mb-4" />
                <div className="text-lg mb-2">Perfect Compliance!</div>
                <div className="text-white/60">All applications are compliant. Keep up the great work!</div>
              </div>
            ) : (
              <div className="space-y-3">
                {applications.filter(app => !app.compliant).map((app) => (
                  <div
                    key={app.id}
                    className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/30"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <div className="font-medium mb-1">{app.applicantName}</div>
                        <div className="text-sm text-white/60">{app.property}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-red-500 font-medium">-${(app.propertyOwnerShare * 0.4).toFixed(2)}</div>
                        <div className="text-xs text-white/60">Revenue lost</div>
                      </div>
                    </div>
                    <div className="bg-white/5 rounded p-3">
                      <div className="text-sm text-white/60 mb-1">Issue</div>
                      <div className="text-sm">
                        {!app.showingScheduled && 'No showing scheduled within 48 hours'}
                        {app.denialReason && !app.denialReason.includes('score') && !app.denialReason.includes('income') && 'Insufficient denial reason provided'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    );
  }

  return null;
}
