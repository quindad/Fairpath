import { ArrowLeft, Download, Calendar, CheckCircle, XCircle, AlertTriangle, FileText, User, Home, DollarSign, Shield } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import Logo from '../common/Logo';

interface ApplicationDetailViewProps {
  application: any;
  onBack: () => void;
  onScheduleShowing: () => void;
}

export default function ApplicationDetailView({ application, onBack, onScheduleShowing }: ApplicationDetailViewProps) {
  // DUMMY BACKGROUND REPORT DATA
  const backgroundReport = {
    reportId: 'SKY-2025-001234',
    generatedDate: '2025-01-15',
    reportType: 'SingleKey Comprehensive',
    applicant: {
      fullName: application.applicantName,
      dateOfBirth: '1992-08-15',
      ssn: '***-**-4567',
      currentAddress: '456 Oak Street, Springfield, IL 62702',
      previousAddresses: [
        '789 Pine Ave, Chicago, IL 60601 (2020-2023)',
        '123 Elm St, Peoria, IL 61602 (2018-2020)'
      ]
    },
    creditCheck: {
      score: application.creditScore,
      rating: application.creditScore >= 650 ? 'Good' : application.creditScore >= 600 ? 'Fair' : 'Poor',
      openAccounts: 7,
      totalDebt: 12450,
      paymentHistory: '85% on-time',
      collections: 1,
      bankruptcies: 0,
      evictions: 0
    },
    criminalHistory: {
      hasRecord: true,
      convictionDate: '2022-03-15',
      releaseDate: '2022-08-20',
      category: application.convictionCategory,
      specificOffense: 'Possession of Controlled Substance',
      county: 'Sangamon County, IL',
      caseNumber: '2022-CF-0456',
      sentence: '6 months incarceration + 2 years probation',
      currentStatus: 'Probation Completed',
      yearsSinceRelease: application.yearsSinceRelease
    },
    employment: {
      currentEmployer: 'ABC Manufacturing',
      position: 'Warehouse Associate',
      employmentStartDate: '2023-09-01',
      monthlyIncome: application.currentIncome,
      employmentVerified: true,
      previousEmployers: [
        {
          name: 'XYZ Logistics',
          duration: '2021-2023',
          reason: 'Career advancement'
        }
      ]
    },
    rentalHistory: {
      currentLandlord: 'Green Property Management',
      monthlyRent: 950,
      moveInDate: '2023-09-15',
      referenceProvided: true,
      landlordRating: 'Good Tenant',
      latePayments: 0,
      evictionHistory: []
    },
    references: [
      {
        name: 'John Smith',
        relationship: 'Former Employer',
        phone: '(555) 123-4567',
        status: 'Verified'
      },
      {
        name: 'Sarah Johnson',
        relationship: 'Personal Reference',
        phone: '(555) 987-6543',
        status: 'Verified'
      }
    ],
    verifications: {
      identityVerified: true,
      ssnVerified: true,
      addressVerified: true,
      employmentVerified: true,
      incomeVerified: true
    },
    riskAssessment: {
      overallRisk: 'Moderate',
      creditRisk: 'Moderate',
      rentalRisk: 'Low',
      incomeStability: 'Good',
      recommendation: 'Qualified with conditions'
    }
  };

  const getRiskColor = (risk: string) => {
    if (risk === 'Low') return 'text-[#A8F32C] bg-[#A8F32C]/10 border-[#A8F32C]/30';
    if (risk === 'Moderate') return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30';
    return 'text-red-500 bg-red-500/10 border-red-500/30';
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/5 bg-[#121212] sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Logo size="md" showTagline={false} />
            <Button
              onClick={onBack}
              variant="ghost"
              className="text-white/60 hover:text-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Applications
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Application Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl mb-2">{application.applicantName}</h1>
              <p className="text-white/60">{application.propertyAddress}</p>
            </div>
            <div className="text-right">
              {application.showingScheduled ? (
                <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30 mb-2">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Showing Scheduled
                </Badge>
              ) : (
                <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30 mb-2">
                  Pending Review
                </Badge>
              )}
              <div className="text-sm text-white/60">Applied: {application.submittedDate}</div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-5 gap-4">
            <Card className="bg-[#121212] border-white/10 p-4">
              <div className="text-sm text-white/60 mb-1">FastTrack Fee</div>
              <div className="text-2xl text-white">${application.fastTrackFee}</div>
            </Card>
            <Card className="bg-[#121212] border-[#A8F32C]/30 p-4">
              <div className="text-sm text-white/60 mb-1">Your Rev-Share</div>
              <div className="text-2xl text-[#A8F32C]">${application.yourRevShare}</div>
            </Card>
            <Card className="bg-[#121212] border-white/10 p-4">
              <div className="text-sm text-white/60 mb-1">Monthly Income</div>
              <div className="text-2xl text-white">${application.currentIncome}</div>
            </Card>
            <Card className="bg-[#121212] border-white/10 p-4">
              <div className="text-sm text-white/60 mb-1">Credit Score</div>
              <div className="text-2xl text-white">{application.creditScore}</div>
            </Card>
            <Card className="bg-[#121212] border-white/10 p-4">
              <div className="text-sm text-white/60 mb-1">Years Since Release</div>
              <div className="text-2xl text-white">{application.yearsSinceRelease}</div>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        {!application.showingScheduled && (
          <div className="mb-8">
            <Button
              onClick={onScheduleShowing}
              className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Showing (Required for FastTrack)
            </Button>
          </div>
        )}

        {application.showingScheduled && (
          <Card className="bg-[#A8F32C]/10 border-[#A8F32C]/30 p-6 mb-8">
            <div className="flex items-center gap-4">
              <Calendar className="h-8 w-8 text-[#A8F32C]" />
              <div className="flex-1">
                <h3 className="text-lg text-white mb-1">Showing Scheduled</h3>
                <p className="text-white/60">{application.showingDate} at {application.showingTime}</p>
              </div>
              <Button variant="outline" className="border-white/20 text-white">
                Reschedule
              </Button>
            </div>
          </Card>
        )}

        {/* Background Report */}
        <Card className="bg-[#121212] border-white/10 p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-[#A8F32C]" />
              <h2 className="text-2xl">SingleKey Background Report</h2>
            </div>
            <Button variant="outline" className="border-white/20 text-white">
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>

          <div className="grid gap-4 text-sm mb-6">
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-white/60">Report ID:</span>
              <span className="text-white">{backgroundReport.reportId}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-white/60">Generated:</span>
              <span className="text-white">{backgroundReport.generatedDate}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-white/60">Report Type:</span>
              <span className="text-white">{backgroundReport.reportType}</span>
            </div>
          </div>

          {/* Risk Assessment */}
          <div className="bg-gradient-to-br from-yellow-500/10 via-transparent to-transparent border border-yellow-500/30 rounded-lg p-6 mb-6">
            <h3 className="text-lg mb-4">Overall Risk Assessment</h3>
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <div className="text-sm text-white/60 mb-2">Overall Risk</div>
                <Badge className={getRiskColor(backgroundReport.riskAssessment.overallRisk)}>
                  {backgroundReport.riskAssessment.overallRisk}
                </Badge>
              </div>
              <div>
                <div className="text-sm text-white/60 mb-2">Credit Risk</div>
                <Badge className={getRiskColor(backgroundReport.riskAssessment.creditRisk)}>
                  {backgroundReport.riskAssessment.creditRisk}
                </Badge>
              </div>
              <div>
                <div className="text-sm text-white/60 mb-2">Rental Risk</div>
                <Badge className={getRiskColor(backgroundReport.riskAssessment.rentalRisk)}>
                  {backgroundReport.riskAssessment.rentalRisk}
                </Badge>
              </div>
              <div>
                <div className="text-sm text-white/60 mb-2">Income Stability</div>
                <Badge className={getRiskColor('Low')}>
                  {backgroundReport.riskAssessment.incomeStability}
                </Badge>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="text-sm text-white/60 mb-1">Recommendation:</div>
              <div className="text-white">{backgroundReport.riskAssessment.recommendation}</div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="mb-6">
            <h3 className="text-lg mb-4 flex items-center gap-2">
              <User className="h-5 w-5 text-[#A8F32C]" />
              Personal Information
            </h3>
            <div className="bg-black/30 rounded-lg p-4 space-y-3">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-white/60 mb-1">Full Name</div>
                  <div className="text-white">{backgroundReport.applicant.fullName}</div>
                </div>
                <div>
                  <div className="text-sm text-white/60 mb-1">Date of Birth</div>
                  <div className="text-white">{backgroundReport.applicant.dateOfBirth}</div>
                </div>
                <div>
                  <div className="text-sm text-white/60 mb-1">SSN</div>
                  <div className="text-white">{backgroundReport.applicant.ssn}</div>
                </div>
                <div>
                  <div className="text-sm text-white/60 mb-1">Age</div>
                  <div className="text-white">{application.applicantAge} years old</div>
                </div>
              </div>
              <div>
                <div className="text-sm text-white/60 mb-1">Current Address</div>
                <div className="text-white">{backgroundReport.applicant.currentAddress}</div>
              </div>
              <div>
                <div className="text-sm text-white/60 mb-1">Previous Addresses</div>
                {backgroundReport.applicant.previousAddresses.map((addr, i) => (
                  <div key={i} className="text-white/80 text-sm">{addr}</div>
                ))}
              </div>
            </div>
          </div>

          {/* Credit Check */}
          <div className="mb-6">
            <h3 className="text-lg mb-4 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-[#A8F32C]" />
              Credit Check
            </h3>
            <div className="bg-black/30 rounded-lg p-4">
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="text-center p-4 bg-white/5 rounded-lg">
                  <div className="text-3xl text-[#A8F32C] mb-1">{backgroundReport.creditCheck.score}</div>
                  <div className="text-sm text-white/60">{backgroundReport.creditCheck.rating}</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-lg">
                  <div className="text-3xl text-white mb-1">${backgroundReport.creditCheck.totalDebt}</div>
                  <div className="text-sm text-white/60">Total Debt</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-lg">
                  <div className="text-3xl text-white mb-1">{backgroundReport.creditCheck.paymentHistory}</div>
                  <div className="text-sm text-white/60">On-Time Payments</div>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-white/60 mb-1">Open Accounts</div>
                  <div className="text-white">{backgroundReport.creditCheck.openAccounts}</div>
                </div>
                <div>
                  <div className="text-white/60 mb-1">Collections</div>
                  <div className="text-white">{backgroundReport.creditCheck.collections}</div>
                </div>
                <div>
                  <div className="text-white/60 mb-1">Bankruptcies</div>
                  <div className="text-white">{backgroundReport.creditCheck.bankruptcies}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Criminal History */}
          <div className="mb-6">
            <h3 className="text-lg mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              Criminal History
            </h3>
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-white/60 mb-1">Category</div>
                  <div className="text-white">{backgroundReport.criminalHistory.category}</div>
                </div>
                <div>
                  <div className="text-sm text-white/60 mb-1">Specific Offense</div>
                  <div className="text-white">{backgroundReport.criminalHistory.specificOffense}</div>
                </div>
                <div>
                  <div className="text-sm text-white/60 mb-1">Conviction Date</div>
                  <div className="text-white">{backgroundReport.criminalHistory.convictionDate}</div>
                </div>
                <div>
                  <div className="text-sm text-white/60 mb-1">Release Date</div>
                  <div className="text-white">{backgroundReport.criminalHistory.releaseDate}</div>
                </div>
                <div>
                  <div className="text-sm text-white/60 mb-1">Years Since Release</div>
                  <div className="text-[#A8F32C]">{backgroundReport.criminalHistory.yearsSinceRelease} years</div>
                </div>
                <div>
                  <div className="text-sm text-white/60 mb-1">Current Status</div>
                  <div className="text-[#A8F32C]">{backgroundReport.criminalHistory.currentStatus}</div>
                </div>
                <div className="md:col-span-2">
                  <div className="text-sm text-white/60 mb-1">Case Details</div>
                  <div className="text-white/80 text-sm">
                    {backgroundReport.criminalHistory.county} | Case #{backgroundReport.criminalHistory.caseNumber}
                  </div>
                  <div className="text-white/80 text-sm">{backgroundReport.criminalHistory.sentence}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Employment Verification */}
          <div className="mb-6">
            <h3 className="text-lg mb-4 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-[#A8F32C]" />
              Employment Verification
            </h3>
            <div className="bg-[#A8F32C]/10 border border-[#A8F32C]/30 rounded-lg p-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-white/60 mb-1">Current Employer</div>
                  <div className="text-white">{backgroundReport.employment.currentEmployer}</div>
                </div>
                <div>
                  <div className="text-sm text-white/60 mb-1">Position</div>
                  <div className="text-white">{backgroundReport.employment.position}</div>
                </div>
                <div>
                  <div className="text-sm text-white/60 mb-1">Start Date</div>
                  <div className="text-white">{backgroundReport.employment.employmentStartDate}</div>
                </div>
                <div>
                  <div className="text-sm text-white/60 mb-1">Monthly Income</div>
                  <div className="text-[#A8F32C]">${backgroundReport.employment.monthlyIncome}</div>
                </div>
                <div className="md:col-span-2">
                  <Badge className="bg-[#A8F32C] text-black border-0">
                    ✓ Employment Verified
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Rental History */}
          <div className="mb-6">
            <h3 className="text-lg mb-4 flex items-center gap-2">
              <Home className="h-5 w-5 text-[#A8F32C]" />
              Rental History
            </h3>
            <div className="bg-black/30 rounded-lg p-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-white/60 mb-1">Current Landlord</div>
                  <div className="text-white">{backgroundReport.rentalHistory.currentLandlord}</div>
                </div>
                <div>
                  <div className="text-sm text-white/60 mb-1">Monthly Rent</div>
                  <div className="text-white">${backgroundReport.rentalHistory.monthlyRent}</div>
                </div>
                <div>
                  <div className="text-sm text-white/60 mb-1">Move-In Date</div>
                  <div className="text-white">{backgroundReport.rentalHistory.moveInDate}</div>
                </div>
                <div>
                  <div className="text-sm text-white/60 mb-1">Late Payments</div>
                  <div className="text-[#A8F32C]">{backgroundReport.rentalHistory.latePayments}</div>
                </div>
                <div className="md:col-span-2">
                  <div className="text-sm text-white/60 mb-1">Landlord Rating</div>
                  <div className="text-[#A8F32C]">{backgroundReport.rentalHistory.landlordRating}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Verifications */}
          <div>
            <h3 className="text-lg mb-4">Verification Status</h3>
            <div className="grid md:grid-cols-3 gap-3">
              {Object.entries(backgroundReport.verifications).map(([key, value]) => (
                <div key={key} className={`p-3 rounded-lg border ${
                  value ? 'bg-[#A8F32C]/10 border-[#A8F32C]/30' : 'bg-red-500/10 border-red-500/30'
                }`}>
                  <div className="flex items-center gap-2">
                    {value ? (
                      <CheckCircle className="h-4 w-4 text-[#A8F32C]" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                    <span className="text-sm text-white capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Decision Buttons */}
        <div className="grid md:grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="border-red-500/30 text-red-500 hover:bg-red-500/10"
          >
            <XCircle className="mr-2 h-4 w-4" />
            Deny Application
          </Button>
          <Button
            className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Approve & Move Forward
          </Button>
        </div>
      </div>
    </div>
  );
}
