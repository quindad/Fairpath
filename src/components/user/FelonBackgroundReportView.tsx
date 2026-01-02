import { Download, ArrowLeft, Shield, AlertCircle, CheckCircle, DollarSign, Home, Briefcase, User } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import LogoFinal from '../common/LogoFinal';
import singleKeyLogo from 'figma:asset/5440a413f9eccb599600d3e4db572d837d428647.png';

interface FelonBackgroundReportViewProps {
  onBack: () => void;
}

export default function FelonBackgroundReportView({ onBack }: FelonBackgroundReportViewProps) {
  // User's background report data
  const report = {
    reportId: 'SKY-2025-001234',
    generatedDate: '2025-01-15',
    reportType: 'SingleKey Comprehensive',
    
    personal: {
      fullName: 'Marcus Johnson',
      dateOfBirth: '1992-08-15',
      ssn: '***-**-4567',
      currentAddress: '456 Oak Street, Springfield, IL 62702',
      previousAddresses: [
        '789 Pine Ave, Chicago, IL 60601 (2020-2023)',
        '123 Elm St, Peoria, IL 61602 (2018-2020)'
      ]
    },
    
    creditCheck: {
      score: 620,
      rating: 'Fair',
      openAccounts: 7,
      totalDebt: 12450,
      paymentHistory: '85% on-time',
      collections: 1,
      bankruptcies: 0,
      evictions: 0
    },
    
    criminal: {
      hasRecord: true,
      convictionDate: '2022-03-15',
      releaseDate: '2022-08-20',
      category: 'Drug Offenses',
      specificOffense: 'Possession of Controlled Substance',
      county: 'Sangamon County, IL',
      caseNumber: '2022-CF-0456',
      sentence: '6 months incarceration + 2 years probation',
      currentStatus: 'Probation Completed',
      yearsSinceRelease: 2.5
    },
    
    employment: {
      currentEmployer: 'ABC Manufacturing',
      position: 'Warehouse Associate',
      startDate: '2023-09-01',
      monthlyIncome: 3200,
      verified: true,
      previousEmployers: [
        {
          name: 'XYZ Logistics',
          duration: '2021-2023',
          reason: 'Career advancement'
        }
      ]
    },
    
    rental: {
      currentLandlord: 'Green Property Management',
      monthlyRent: 950,
      moveInDate: '2023-09-15',
      referenceProvided: true,
      landlordRating: 'Good Tenant',
      latePayments: 0,
      evictions: []
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
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/5 bg-[#121212] sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <LogoFinal size="md" />
            <div className="flex gap-3">
              <Button
                onClick={() => {
                  // Trigger download
                  alert('Downloading your background report PDF...');
                }}
                variant="outline"
                className="border-[#A8F32C]/50 text-[#A8F32C]"
              >
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
              <Button
                onClick={onBack}
                variant="outline"
                className="border-white/20 text-white"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <img src={singleKeyLogo} alt="SingleKey" className="h-12 mx-auto mb-4" />
          <h1 className="text-3xl mb-2">Your Background Report</h1>
          <p className="text-white/60">
            This is what employers and landlords see when you apply through FastTrack
          </p>
        </div>

        {/* Important Notice */}
        <Card className="bg-[#A8F32C]/10 border-[#A8F32C]/30 p-6 mb-8">
          <div className="flex items-start gap-3">
            <Shield className="h-6 w-6 text-[#A8F32C] flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-white mb-2">Your Report, Your Rights</h3>
              <p className="text-sm text-white/60 mb-3">
                You have the right to review your background report and dispute any inaccuracies. 
                If you find errors, contact us immediately and we'll work with SingleKey to correct them.
              </p>
              <Button
                variant="outline"
                className="border-[#A8F32C]/50 text-[#A8F32C] text-sm h-9"
              >
                Dispute Information
              </Button>
            </div>
          </div>
        </Card>

        {/* Report Details */}
        <Card className="bg-[#121212] border-white/10 p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="text-white/60 mb-1">Report ID</div>
              <div className="text-white font-mono">{report.reportId}</div>
            </div>
            <div>
              <div className="text-white/60 mb-1">Generated</div>
              <div className="text-white">{report.generatedDate}</div>
            </div>
            <div>
              <div className="text-white/60 mb-1">Report Type</div>
              <div className="text-white">{report.reportType}</div>
            </div>
          </div>
        </Card>

        {/* Personal Information */}
        <Card className="bg-[#121212] border-white/10 p-6 mb-6">
          <h2 className="text-xl mb-4 flex items-center gap-2">
            <User className="h-6 w-6 text-[#A8F32C]" />
            Personal Information
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-white/60 mb-1">Full Name</div>
              <div className="text-white">{report.personal.fullName}</div>
            </div>
            <div>
              <div className="text-sm text-white/60 mb-1">Date of Birth</div>
              <div className="text-white">{report.personal.dateOfBirth}</div>
            </div>
            <div>
              <div className="text-sm text-white/60 mb-1">SSN</div>
              <div className="text-white">{report.personal.ssn}</div>
            </div>
            <div>
              <div className="text-sm text-white/60 mb-1">Age</div>
              <div className="text-white">32 years old</div>
            </div>
          </div>
        </Card>

        {/* Credit Information */}
        <Card className="bg-[#121212] border-white/10 p-6 mb-6">
          <h2 className="text-xl mb-4 flex items-center gap-2">
            <DollarSign className="h-6 w-6 text-[#A8F32C]" />
            Credit Check
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <div className="text-3xl text-[#A8F32C] mb-1">{report.creditCheck.score}</div>
              <div className="text-sm text-white/60">{report.creditCheck.rating}</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <div className="text-3xl text-white mb-1">${report.creditCheck.totalDebt}</div>
              <div className="text-sm text-white/60">Total Debt</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <div className="text-3xl text-white mb-1">{report.creditCheck.paymentHistory}</div>
              <div className="text-sm text-white/60">On-Time Payments</div>
            </div>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <div className="text-yellow-500 mb-1">Tip to Improve Credit:</div>
                <div className="text-white/60">
                  Pay bills on time, reduce debt balances, and avoid new collections. Credit scores update monthly.
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Criminal History */}
        <Card className="bg-yellow-500/10 border-yellow-500/30 p-6 mb-6">
          <h2 className="text-xl mb-4 flex items-center gap-2">
            <AlertCircle className="h-6 w-6 text-yellow-500" />
            Criminal History
          </h2>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <div className="text-sm text-white/60 mb-1">Category</div>
              <div className="text-white">{report.criminal.category}</div>
            </div>
            <div>
              <div className="text-sm text-white/60 mb-1">Specific Offense</div>
              <div className="text-white">{report.criminal.specificOffense}</div>
            </div>
            <div>
              <div className="text-sm text-white/60 mb-1">Conviction Date</div>
              <div className="text-white">{report.criminal.convictionDate}</div>
            </div>
            <div>
              <div className="text-sm text-white/60 mb-1">Release Date</div>
              <div className="text-white">{report.criminal.releaseDate}</div>
            </div>
            <div>
              <div className="text-sm text-white/60 mb-1">Years Since Release</div>
              <div className="text-[#A8F32C]">{report.criminal.yearsSinceRelease} years</div>
            </div>
            <div>
              <div className="text-sm text-white/60 mb-1">Current Status</div>
              <div className="text-[#A8F32C]">{report.criminal.currentStatus}</div>
            </div>
          </div>
          <div className="bg-[#A8F32C]/10 border border-[#A8F32C]/30 rounded-lg p-4">
            <div className="text-sm text-white/60 mb-2">What Employers See:</div>
            <p className="text-sm text-white">
              Your conviction is disclosed upfront, but employers also see you've completed probation and 
              have been crime-free for {report.criminal.yearsSinceRelease} years. This demonstrates rehabilitation.
            </p>
          </div>
        </Card>

        {/* Employment */}
        <Card className="bg-[#121212] border-white/10 p-6 mb-6">
          <h2 className="text-xl mb-4 flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-[#A8F32C]" />
            Employment Verification
          </h2>
          <div className="bg-[#A8F32C]/10 border border-[#A8F32C]/30 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="h-5 w-5 text-[#A8F32C]" />
              <div className="text-[#A8F32C]">Employment Verified</div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-white/60 mb-1">Current Employer</div>
                <div className="text-white">{report.employment.currentEmployer}</div>
              </div>
              <div>
                <div className="text-sm text-white/60 mb-1">Position</div>
                <div className="text-white">{report.employment.position}</div>
              </div>
              <div>
                <div className="text-sm text-white/60 mb-1">Start Date</div>
                <div className="text-white">{report.employment.startDate}</div>
              </div>
              <div>
                <div className="text-sm text-white/60 mb-1">Monthly Income</div>
                <div className="text-[#A8F32C]">${report.employment.monthlyIncome}</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Rental History */}
        <Card className="bg-[#121212] border-white/10 p-6 mb-6">
          <h2 className="text-xl mb-4 flex items-center gap-2">
            <Home className="h-6 w-6 text-[#A8F32C]" />
            Rental History
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-white/60 mb-1">Current Landlord</div>
              <div className="text-white">{report.rental.currentLandlord}</div>
            </div>
            <div>
              <div className="text-sm text-white/60 mb-1">Monthly Rent</div>
              <div className="text-white">${report.rental.monthlyRent}</div>
            </div>
            <div>
              <div className="text-sm text-white/60 mb-1">Late Payments</div>
              <div className="text-[#A8F32C]">{report.rental.latePayments}</div>
            </div>
            <div>
              <div className="text-sm text-white/60 mb-1">Landlord Rating</div>
              <div className="text-[#A8F32C]">{report.rental.landlordRating}</div>
            </div>
          </div>
        </Card>

        {/* Verifications */}
        <Card className="bg-[#121212] border-white/10 p-6 mb-6">
          <h2 className="text-xl mb-4">Verification Status</h2>
          <div className="grid md:grid-cols-3 gap-3">
            {Object.entries(report.verifications).map(([key, value]) => (
              <div key={key} className={`p-3 rounded-lg border ${
                value ? 'bg-[#A8F32C]/10 border-[#A8F32C]/30' : 'bg-red-500/10 border-red-500/30'
              }`}>
                <div className="flex items-center gap-2">
                  {value ? (
                    <CheckCircle className="h-4 w-4 text-[#A8F32C]" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-500" />
                  )}
                  <span className="text-sm text-white capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Actions */}
        <div className="flex gap-4">
          <Button
            onClick={() => alert('Downloading PDF...')}
            className="flex-1 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Full Report (PDF)
          </Button>
          <Button
            variant="outline"
            className="flex-1 border-white/20 text-white"
          >
            Share Report Link
          </Button>
        </div>

        <p className="text-center text-xs text-white/40 mt-4">
          Your report is automatically shared with employers and landlords when you apply through FastTrack
        </p>
      </div>
    </div>
  );
}
