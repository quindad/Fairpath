import { ArrowLeft, Shield, CheckCircle, XCircle, AlertTriangle, Download, FileText, Calendar, DollarSign, Home, User } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { useState, useEffect } from 'react';
import { getScreeningWithFallback, downloadReportPDF, isAPIConfigured } from '../../utils/singlekey-api';

interface ScreeningResultsViewProps {
  applicant: any;
  onBack: () => void;
  onApprove: () => void;
  onDeny: () => void;
}

export default function ScreeningResultsView({ applicant, onBack, onApprove, onDeny }: ScreeningResultsViewProps) {
  const [screening, setScreening] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [downloadingPDF, setDownloadingPDF] = useState(false);

  useEffect(() => {
    loadScreeningData();
  }, [applicant]);

  const loadScreeningData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Try to get real screening report or fallback to mock
      const reportId = applicant.screeningReportId || 'SK-2024-DEMO';
      const data = await getScreeningWithFallback(reportId, applicant.name);
      setScreening(data);
    } catch (err) {
      console.error('Failed to load screening:', err);
      setError('Failed to load screening report');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!screening) return;
    
    setDownloadingPDF(true);
    try {
      if (isAPIConfigured()) {
        // Download real PDF from API
        const pdfBlob = await downloadReportPDF(screening.reportId);
        const url = URL.createObjectURL(pdfBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `screening-report-${screening.reportId}.pdf`;
        a.click();
        URL.revokeObjectURL(url);
      } else {
        // Mock download for demo
        alert('PDF download will work with real API key. Using mock data.');
      }
    } catch (err) {
      console.error('Failed to download PDF:', err);
      alert('Failed to download PDF. Please try again.');
    } finally {
      setDownloadingPDF(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Card className="bg-[#121212] border-white/10 p-8 text-center">
          <div className="w-16 h-16 border-4 border-[#A8F32C] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-2xl mb-3">Loading Screening Report...</h2>
          <p className="text-white/60">
            {isAPIConfigured() 
              ? 'Fetching data from SingleKey...' 
              : 'Loading demo data...'}
          </p>
        </Card>
      </div>
    );
  }

  if (error || !screening) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Card className="bg-[#121212] border-red-500/50 p-8 text-center max-w-md">
          <XCircle className="h-16 w-16 text-red-400 mx-auto mb-6" />
          <h2 className="text-2xl mb-3">Error Loading Report</h2>
          <p className="text-white/60 mb-6">{error || 'Failed to load screening report'}</p>
          <div className="flex gap-3">
            <Button className="flex-1 bg-white/10 text-white" onClick={onBack}>
              Go Back
            </Button>
            <Button className="flex-1 bg-[#A8F32C] text-black" onClick={loadScreeningData}>
              Retry
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'clear':
      case 'verified':
      case 'good':
        return <CheckCircle className="h-6 w-6 text-green-400" />;
      case 'review':
      case 'fair':
        return <AlertTriangle className="h-6 w-6 text-yellow-400" />;
      case 'fail':
      case 'denied':
        return <XCircle className="h-6 w-6 text-red-400" />;
      default:
        return <Shield className="h-6 w-6 text-blue-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'clear':
      case 'verified':
      case 'good':
      case 'complete':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'review':
      case 'fair':
        return 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30';
      case 'fail':
      case 'denied':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Demo Mode Banner */}
      {!isAPIConfigured() && (
        <div className="bg-gradient-to-r from-[#A8F32C]/20 to-[#A8F32C]/5 border-b border-[#A8F32C]/30">
          <div className="max-w-4xl mx-auto px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#A8F32C] rounded-full flex items-center justify-center">
                  <span className="text-black text-lg">ℹ️</span>
                </div>
                <div>
                  <div className="text-white">Demo Mode Active</div>
                  <div className="text-sm text-white/70">
                    Using sample data for demonstration. Add SINGLEKEY_API_KEY to .env for real screenings.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Header */}
      <div className="border-b border-white/10 bg-[#121212] sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <Button
              onClick={onBack}
              className="bg-white/10 text-white hover:bg-white/20"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Profile
            </Button>
            <div className="flex items-center gap-3">
              {!isAPIConfigured() && (
                <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30 px-3 py-1">
                  📊 Demo Data
                </Badge>
              )}
              <Button
                onClick={handleDownloadPDF}
                disabled={downloadingPDF}
                className="bg-white/10 text-white hover:bg-white/20"
              >
                {downloadingPDF ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Downloading...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* SingleKey Branding */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
                <div className="text-black text-2xl">SK</div>
              </div>
              <div>
                <h1 className="text-3xl mb-1">Screening Report</h1>
                <p className="text-white/60">Powered by SingleKey</p>
              </div>
            </div>
          </div>

          {/* Report Header */}
          <Card className="bg-[#121212] border-white/10 p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="text-sm text-white/60 mb-1">Applicant</div>
                <div className="text-xl text-white mb-3">{screening.applicantName}</div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-white/60 mb-1">Report ID</div>
                    <div className="text-white font-mono">{screening.reportId}</div>
                  </div>
                  <div>
                    <div className="text-white/60 mb-1">Request Date</div>
                    <div className="text-white">{new Date(screening.requestDate).toLocaleDateString()}</div>
                  </div>
                  <div>
                    <div className="text-white/60 mb-1">Completed</div>
                    <div className="text-white">{new Date(screening.completedDate).toLocaleDateString()}</div>
                  </div>
                  <div>
                    <div className="text-white/60 mb-1">Status</div>
                    <Badge className={getStatusColor(screening.status)}>
                      {screening.status}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <div className="text-sm text-white/60 mb-2">Overall Recommendation</div>
                <div className="text-2xl text-[#A8F32C] mb-4">{screening.overallRecommendation}</div>
                <div className="flex gap-3">
                  <Button
                    className="flex-1 bg-green-500 text-white hover:bg-green-600"
                    onClick={onApprove}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Approve Application
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-red-500/30 text-red-400 hover:bg-red-500/10"
                    onClick={onDeny}
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Deny
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {/* Criminal Background */}
        <Card className="bg-[#121212] border-white/10 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              {getStatusIcon(screening.criminalBackground.status)}
              <div>
                <h2 className="text-2xl">Criminal Background Check</h2>
                <p className="text-white/60 text-sm">National & Local Records Search</p>
              </div>
            </div>
            <Badge className={getStatusColor(screening.criminalBackground.status)}>
              {screening.criminalBackground.status}
            </Badge>
          </div>

          {/* National Search */}
          <div className="mb-6">
            <h3 className="text-lg text-white mb-3">National Criminal Database</h3>
            <div className="bg-black/50 border border-white/10 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white/60">Records Found</span>
                <Badge className="bg-yellow-400/20 text-yellow-400 border-yellow-400/30">
                  {screening.criminalBackground.nationalSearch.recordsFound} Record
                </Badge>
              </div>
              
              {screening.criminalBackground.nationalSearch.details.map((record, index) => (
                <div key={index} className="border-t border-white/10 pt-4 mt-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-white/60 mb-1">Offense</div>
                      <div className="text-white">{record.offense}</div>
                    </div>
                    <div>
                      <div className="text-sm text-white/60 mb-1">Date</div>
                      <div className="text-white">{record.date}</div>
                    </div>
                    <div>
                      <div className="text-sm text-white/60 mb-1">Jurisdiction</div>
                      <div className="text-white">{record.jurisdiction}</div>
                    </div>
                    <div>
                      <div className="text-sm text-white/60 mb-1">Disposition</div>
                      <div className="text-white">{record.disposition}</div>
                    </div>
                    <div>
                      <div className="text-sm text-white/60 mb-1">Sentence</div>
                      <div className="text-white">{record.sentence}</div>
                    </div>
                    <div>
                      <div className="text-sm text-white/60 mb-1">Release Date</div>
                      <div className="text-white">{record.releaseDate}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sex Offender Registry */}
          <div className="mb-6">
            <h3 className="text-lg text-white mb-3">Sex Offender Registry</h3>
            <div className="bg-black/50 border border-green-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-white">No records found</span>
                </div>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  Clear
                </Badge>
              </div>
            </div>
          </div>

          {/* Recommendation */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <Shield className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-white mb-1">SingleKey Recommendation</div>
                <div className="text-sm text-white/80">{screening.criminalBackground.recommendation}</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Credit Report */}
        <Card className="bg-[#121212] border-white/10 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              {getStatusIcon(screening.creditReport.status)}
              <div>
                <h2 className="text-2xl">Credit Report</h2>
                <p className="text-white/60 text-sm">Financial History & Score</p>
              </div>
            </div>
            <Badge className={getStatusColor(screening.creditReport.status)}>
              {screening.creditReport.status}
            </Badge>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-black/50 border border-white/10 rounded-lg p-4 text-center">
              <div className="text-3xl text-yellow-400 mb-2">{screening.creditReport.score}</div>
              <div className="text-sm text-white/60">Credit Score</div>
            </div>
            <div className="bg-black/50 border border-white/10 rounded-lg p-4 text-center">
              <div className="text-3xl text-white mb-2">{screening.creditReport.tradelines}</div>
              <div className="text-sm text-white/60">Total Tradelines</div>
            </div>
            <div className="bg-black/50 border border-white/10 rounded-lg p-4 text-center">
              <div className="text-3xl text-white mb-2">{screening.creditReport.openAccounts}</div>
              <div className="text-sm text-white/60">Open Accounts</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <div className="text-sm text-white/60 mb-1">Payment History</div>
              <div className="text-white">{screening.creditReport.paymentHistory}</div>
            </div>
            <div>
              <div className="text-sm text-white/60 mb-1">Credit Utilization</div>
              <div className="text-white">{screening.creditReport.utilization}</div>
            </div>
            <div>
              <div className="text-sm text-white/60 mb-1">Collections</div>
              <div className={screening.creditReport.collections > 0 ? 'text-yellow-400' : 'text-green-400'}>
                {screening.creditReport.collections} {screening.creditReport.collections === 1 ? 'account' : 'accounts'}
              </div>
            </div>
            <div>
              <div className="text-sm text-white/60 mb-1">Recent Inquiries</div>
              <div className="text-white">{screening.creditReport.inquiries} inquiries</div>
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <Shield className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-white mb-1">SingleKey Recommendation</div>
                <div className="text-sm text-white/80">{screening.creditReport.recommendation}</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Eviction History */}
        <Card className="bg-[#121212] border-white/10 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              {getStatusIcon(screening.evictionHistory.status)}
              <div>
                <h2 className="text-2xl">Eviction History</h2>
                <p className="text-white/60 text-sm">Court Records Search</p>
              </div>
            </div>
            <Badge className={getStatusColor(screening.evictionHistory.status)}>
              {screening.evictionHistory.status}
            </Badge>
          </div>

          <div className="bg-black/50 border border-green-500/30 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-white">No eviction records found</span>
              </div>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                Clear
              </Badge>
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <Shield className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-white mb-1">SingleKey Recommendation</div>
                <div className="text-sm text-white/80">{screening.evictionHistory.recommendation}</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Income Verification */}
        <Card className="bg-[#121212] border-white/10 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              {getStatusIcon(screening.incomeVerification.status)}
              <div>
                <h2 className="text-2xl">Income Verification</h2>
                <p className="text-white/60 text-sm">Employment & Earnings</p>
              </div>
            </div>
            <Badge className={getStatusColor(screening.incomeVerification.status)}>
              {screening.incomeVerification.status}
            </Badge>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <div className="text-sm text-white/60 mb-1">Employer</div>
              <div className="text-white">{screening.incomeVerification.employer}</div>
            </div>
            <div>
              <div className="text-sm text-white/60 mb-1">Position</div>
              <div className="text-white">{screening.incomeVerification.position}</div>
            </div>
            <div>
              <div className="text-sm text-white/60 mb-1">Monthly Income</div>
              <div className="text-[#A8F32C] text-xl">${screening.incomeVerification.monthlyIncome.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-sm text-white/60 mb-1">Years Employed</div>
              <div className="text-white">{screening.incomeVerification.yearsEmployed} years</div>
            </div>
            <div>
              <div className="text-sm text-white/60 mb-1">Verification Method</div>
              <div className="text-white">{screening.incomeVerification.verificationMethod}</div>
            </div>
            <div>
              <div className="text-sm text-white/60 mb-1">Income to Rent Ratio</div>
              <div className="text-green-400 text-xl">{screening.incomeVerification.incomeToRent}</div>
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <Shield className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-white mb-1">SingleKey Recommendation</div>
                <div className="text-sm text-white/80">{screening.incomeVerification.recommendation}</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Rental History */}
        <Card className="bg-[#121212] border-white/10 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              {getStatusIcon(screening.rentalHistory.status)}
              <div>
                <h2 className="text-2xl">Rental History</h2>
                <p className="text-white/60 text-sm">Previous Landlord Verification</p>
              </div>
            </div>
            <Badge className={getStatusColor(screening.rentalHistory.status)}>
              {screening.rentalHistory.status}
            </Badge>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <div className="text-sm text-white/60 mb-1">Previous Landlord</div>
              <div className="text-white">{screening.rentalHistory.previousLandlord}</div>
            </div>
            <div>
              <div className="text-sm text-white/60 mb-1">Previous Address</div>
              <div className="text-white">{screening.rentalHistory.previousAddress}</div>
            </div>
            <div>
              <div className="text-sm text-white/60 mb-1">Monthly Rent</div>
              <div className="text-white">${screening.rentalHistory.monthlyRent}</div>
            </div>
            <div>
              <div className="text-sm text-white/60 mb-1">Tenancy Period</div>
              <div className="text-white">{screening.rentalHistory.tenancyPeriod}</div>
            </div>
            <div>
              <div className="text-sm text-white/60 mb-1">Payment History</div>
              <div className="text-green-400">{screening.rentalHistory.paymentHistory}</div>
            </div>
            <div>
              <div className="text-sm text-white/60 mb-1">Property Condition</div>
              <div className="text-green-400">{screening.rentalHistory.propertyCondition}</div>
            </div>
          </div>

          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <div className="text-white">
                Landlord would rent to this applicant again: <span className="text-green-400">{screening.rentalHistory.wouldRentAgain}</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <Shield className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-white mb-1">SingleKey Recommendation</div>
                <div className="text-sm text-white/80">{screening.rentalHistory.recommendation}</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Final Recommendation */}
        <Card className="bg-gradient-to-r from-[#A8F32C]/10 to-transparent border-[#A8F32C]/30 p-8 text-center">
          <h2 className="text-3xl mb-4">Overall Recommendation</h2>
          <div className="text-5xl text-[#A8F32C] mb-6">{screening.overallRecommendation}</div>
          <p className="text-white/80 text-lg mb-8">
            This applicant meets standard rental criteria. SingleKey recommends approval with standard lease terms.
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              className="bg-green-500 text-white hover:bg-green-600 px-8"
              onClick={onApprove}
            >
              <CheckCircle className="mr-2 h-5 w-5" />
              Approve Application
            </Button>
            <Button
              variant="outline"
              className="border-red-500/30 text-red-400 hover:bg-red-500/10 px-8"
              onClick={onDeny}
            >
              <XCircle className="mr-2 h-5 w-5" />
              Deny Application
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}