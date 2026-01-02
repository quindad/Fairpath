import { ArrowLeft, User, Shield, Award, Briefcase, Home, FileText, Calendar, CheckCircle, XCircle, Download, Eye, AlertTriangle } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';

interface ApplicantProfileViewProps {
  applicant: any;
  onBack: () => void;
  onApprove: () => void;
  onDeny: () => void;
  onViewScreening: () => void;
}

export default function ApplicantProfileView({ applicant, onBack, onApprove, onDeny, onViewScreening }: ApplicantProfileViewProps) {
  // Enhanced applicant data
  const profile = {
    ...applicant,
    fullName: applicant.name,
    email: 'marcus.j@email.com',
    phone: '(312) 555-0123',
    currentAddress: '1425 W Harrison St, Chicago, IL 60607',
    dob: '03/15/1988',
    ssn: '***-**-4521',
    employmentStatus: 'Employed',
    employer: 'Amazon Fulfillment Center',
    position: 'Warehouse Associate',
    monthlyIncome: 3200,
    yearsAtJob: 2.5,
    convictionType: 'Drug-related (Non-violent)',
    convictionDate: '08/2020',
    releaseDate: '06/2023',
    timeServed: '2 years 10 months',
    probationStatus: 'Completed',
    references: [
      { name: 'Sarah Williams', relation: 'Employer', phone: '(312) 555-0400', verified: true },
      { name: 'Michael Davis', relation: 'Reentry Counselor', phone: '(312) 555-0500', verified: true },
      { name: 'Jennifer Martinez', relation: 'Previous Landlord', phone: '(312) 555-0600', verified: false }
    ],
    screeningStatus: applicant.status === 'screening' ? 'In Progress' : applicant.status === 'approved' ? 'Complete - Approved' : 'Complete - Pending Review',
    screeningDate: '2 hours ago',
    wotcEligible: true,
    estimatedWOTC: 2400
  };

  const scorePercentage = (profile.score / 1000) * 100;

  const getScoreColor = (score: number) => {
    if (score >= 750) return 'text-[#A8F32C]';
    if (score >= 650) return 'text-yellow-400';
    return 'text-orange-400';
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/5 bg-[#121212]">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Button
            variant="ghost"
            className="text-white/60 hover:text-white mb-4"
            onClick={onBack}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Applications
          </Button>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl mb-2">{profile.fullName}</h1>
              <p className="text-white/60">Application for {profile.property}</p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="border-green-500/30 text-green-400 hover:bg-green-500/10"
                onClick={onApprove}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Approve
              </Button>
              <Button
                variant="outline"
                className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                onClick={onDeny}
              >
                <XCircle className="mr-2 h-4 w-4" />
                Deny
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* FairPath Score */}
            <Card className="bg-[#121212] border-white/10 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Award className="h-8 w-8 text-[#A8F32C]" />
                  <div>
                    <h2 className="text-2xl">FairPath Score</h2>
                    <p className="text-white/60 text-sm">Overall applicant rating</p>
                  </div>
                </div>
                <div className={`text-5xl ${getScoreColor(profile.score)}`}>
                  {profile.score}
                </div>
              </div>
              <Progress value={scorePercentage} className="h-3 mb-4" />
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl text-white mb-1">A+</div>
                  <div className="text-xs text-white/60">Credit Grade</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl text-white mb-1">2.5 yrs</div>
                  <div className="text-xs text-white/60">Employment</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl text-white mb-1">3</div>
                  <div className="text-xs text-white/60">References</div>
                </div>
              </div>
            </Card>

            {/* Background Screening */}
            <Card className="bg-[#121212] border-white/10 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Shield className="h-8 w-8 text-blue-400" />
                  <div>
                    <h2 className="text-2xl">Background Screening</h2>
                    <p className="text-white/60 text-sm">Powered by SingleKey</p>
                  </div>
                </div>
                <Button
                  className="bg-blue-500 text-white hover:bg-blue-600"
                  onClick={onViewScreening}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View Full Report
                </Button>
              </div>

              {profile.status === 'screening' ? (
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6 text-center">
                  <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <div className="text-lg text-white mb-2">Screening in Progress</div>
                  <div className="text-white/60">Results typically available within 24-48 hours</div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-black/50 border border-white/10 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <div>
                        <div className="text-white">Criminal Background Check</div>
                        <div className="text-sm text-white/60">No disqualifying offenses</div>
                      </div>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      Clear
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-black/50 border border-white/10 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <div>
                        <div className="text-white">Eviction History</div>
                        <div className="text-sm text-white/60">No prior evictions</div>
                      </div>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      Clear
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-black/50 border border-white/10 rounded-lg">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-yellow-400" />
                      <div>
                        <div className="text-white">Credit Report</div>
                        <div className="text-sm text-white/60">Fair credit, 628 score</div>
                      </div>
                    </div>
                    <Badge className="bg-yellow-400/20 text-yellow-400 border-yellow-400/30">
                      Review
                    </Badge>
                  </div>
                </div>
              )}
            </Card>

            {/* Employment Information */}
            <Card className="bg-[#121212] border-white/10 p-6">
              <div className="flex items-center gap-3 mb-6">
                <Briefcase className="h-8 w-8 text-purple-400" />
                <div>
                  <h2 className="text-2xl">Employment</h2>
                  <p className="text-white/60 text-sm">Current income verification</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-white/60 mb-1">Status</div>
                    <div className="text-white">{profile.employmentStatus}</div>
                  </div>
                  <div>
                    <div className="text-sm text-white/60 mb-1">Monthly Income</div>
                    <div className="text-[#A8F32C] text-xl">${profile.monthlyIncome.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-white/60 mb-1">Employer</div>
                    <div className="text-white">{profile.employer}</div>
                  </div>
                  <div>
                    <div className="text-sm text-white/60 mb-1">Position</div>
                    <div className="text-white">{profile.position}</div>
                  </div>
                  <div>
                    <div className="text-sm text-white/60 mb-1">Time at Job</div>
                    <div className="text-white">{profile.yearsAtJob} years</div>
                  </div>
                  <div>
                    <div className="text-sm text-white/60 mb-1">Income to Rent Ratio</div>
                    <div className="text-green-400">2.67x (Excellent)</div>
                  </div>
                </div>

                {profile.wotcEligible && (
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="h-5 w-5 text-blue-400" />
                      <div className="text-white">WOTC Eligible</div>
                    </div>
                    <div className="text-sm text-white/60">
                      This applicant qualifies for Work Opportunity Tax Credit. Estimated value: ${profile.estimatedWOTC.toLocaleString()}
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Conviction History */}
            <Card className="bg-[#121212] border-white/10 p-6">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="h-8 w-8 text-orange-400" />
                <div>
                  <h2 className="text-2xl">Conviction History</h2>
                  <p className="text-white/60 text-sm">Background disclosed</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-white/60 mb-1">Conviction Type</div>
                    <div className="text-white">{profile.convictionType}</div>
                  </div>
                  <div>
                    <div className="text-sm text-white/60 mb-1">Conviction Date</div>
                    <div className="text-white">{profile.convictionDate}</div>
                  </div>
                  <div>
                    <div className="text-sm text-white/60 mb-1">Release Date</div>
                    <div className="text-white">{profile.releaseDate}</div>
                  </div>
                  <div>
                    <div className="text-sm text-white/60 mb-1">Time Since Release</div>
                    <div className="text-green-400">2.5 years</div>
                  </div>
                  <div>
                    <div className="text-sm text-white/60 mb-1">Probation</div>
                    <div className="text-green-400">{profile.probationStatus}</div>
                  </div>
                  <div>
                    <div className="text-sm text-white/60 mb-1">Time Served</div>
                    <div className="text-white">{profile.timeServed}</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* References */}
            <Card className="bg-[#121212] border-white/10 p-6">
              <div className="flex items-center gap-3 mb-6">
                <User className="h-8 w-8 text-green-400" />
                <div>
                  <h2 className="text-2xl">References</h2>
                  <p className="text-white/60 text-sm">{profile.references.length} references provided</p>
                </div>
              </div>

              <div className="space-y-3">
                {profile.references.map((ref, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-black/50 border border-white/10 rounded-lg">
                    <div>
                      <div className="text-white mb-1">{ref.name}</div>
                      <div className="text-sm text-white/60">{ref.relation} • {ref.phone}</div>
                    </div>
                    {ref.verified ? (
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    ) : (
                      <Badge className="bg-white/10 text-white/60 border-white/20">
                        Pending
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <Card className="bg-[#121212] border-white/10 p-6 sticky top-6">
              <h3 className="text-xl mb-4">Contact Information</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-white/60 mb-1">Email</div>
                  <div className="text-white">{profile.email}</div>
                </div>
                <div>
                  <div className="text-white/60 mb-1">Phone</div>
                  <div className="text-white">{profile.phone}</div>
                </div>
                <div>
                  <div className="text-white/60 mb-1">Current Address</div>
                  <div className="text-white">{profile.currentAddress}</div>
                </div>
                <div>
                  <div className="text-white/60 mb-1">Date of Birth</div>
                  <div className="text-white">{profile.dob}</div>
                </div>
                <div>
                  <div className="text-white/60 mb-1">SSN</div>
                  <div className="text-white">{profile.ssn}</div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <h3 className="text-xl mb-4">Application Details</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="text-white/60 mb-1">Applied</div>
                    <div className="text-white">{profile.applied}</div>
                  </div>
                  <div>
                    <div className="text-white/60 mb-1">Type</div>
                    {profile.type === 'fasttrack' ? (
                      <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                        FastTrack
                      </Badge>
                    ) : (
                      <Badge className="bg-white/10 text-white/60 border-white/20">
                        Regular
                      </Badge>
                    )}
                  </div>
                  <div>
                    <div className="text-white/60 mb-1">Status</div>
                    {profile.status === 'new' && (
                      <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/30">
                        New
                      </Badge>
                    )}
                    {profile.status === 'screening' && (
                      <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">
                        Screening
                      </Badge>
                    )}
                    {profile.status === 'approved' && (
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        Approved
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Button className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">
                  <Download className="mr-2 h-4 w-4" />
                  Download Full Application
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-white/20 text-white"
                  onClick={onViewScreening}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View Screening Report
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
