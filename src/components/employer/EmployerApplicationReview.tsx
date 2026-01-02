import { ArrowLeft, DollarSign, Download, CheckCircle, XCircle, Calendar, Briefcase, User, FileText, AlertCircle, Star } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import LogoFinal from '../common/LogoFinal';
import singleKeyLogo from 'figma:asset/5440a413f9eccb599600d3e4db572d837d428647.png';

interface EmployerApplicationReviewProps {
  application: any;
  onBack: () => void;
  onApprove: () => void;
  onReject: () => void;
}

export default function EmployerApplicationReview({ application, onBack, onApprove, onReject }: EmployerApplicationReviewProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/5 bg-[#121212] sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <LogoFinal size="md" />
            <Button onClick={onBack} variant="outline" className="border-white/20 text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Applications
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Applicant Header */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 rounded-full bg-[#A8F32C]/20 border-2 border-[#A8F32C] flex items-center justify-center">
              <User className="h-10 w-10 text-[#A8F32C]" />
            </div>
            <div>
              <h1 className="text-3xl mb-2">{application.applicantName}</h1>
              <div className="flex items-center gap-4 text-white/60 mb-3">
                <span>{application.age} years old</span>
                <span>•</span>
                <span>Applied {application.appliedDate}</span>
              </div>
              <div className="flex gap-2">
                <Badge className={`${
                  application.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30' :
                  application.status === 'reviewing' ? 'bg-blue-500/20 text-blue-500 border-blue-500/30' :
                  application.status === 'interview' ? 'bg-purple-500/20 text-purple-500 border-purple-500/30' :
                  'bg-white/20 text-white border-white/30'
                }`}>
                  {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                </Badge>
                {application.wotcEligible && (
                  <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30">
                    WOTC Eligible
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              onClick={onReject}
              variant="outline"
              className="border-red-500/50 text-red-500 hover:bg-red-500/10"
            >
              <XCircle className="mr-2 h-4 w-4" />
              Reject
            </Button>
            <Button
              onClick={onApprove}
              className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Approve for Interview
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Main Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* WOTC Tax Credit */}
            {application.wotcEligible && (
              <Card className="bg-gradient-to-br from-[#A8F32C]/20 via-[#121212] to-[#121212] border-[#A8F32C] p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl mb-2 flex items-center gap-2">
                      <DollarSign className="h-6 w-6 text-[#A8F32C]" />
                      WOTC Tax Credit Value
                    </h2>
                    <p className="text-white/60">Eligible for Work Opportunity Tax Credit</p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl text-[#A8F32C]">${application.wotcValue.toLocaleString()}</div>
                    <div className="text-sm text-white/60">Maximum credit</div>
                  </div>
                </div>

                <div className="bg-black/30 rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-white/60 mb-1">Target Group</div>
                      <div className="text-white">{application.wotcTargetGroup}</div>
                    </div>
                    <div>
                      <div className="text-white/60 mb-1">Credit Percentage</div>
                      <div className="text-[#A8F32C]">40% of wages</div>
                    </div>
                    <div>
                      <div className="text-white/60 mb-1">Maximum Wages</div>
                      <div className="text-white">$6,000 first year</div>
                    </div>
                    <div>
                      <div className="text-white/60 mb-1">Minimum Hours</div>
                      <div className="text-white">400 hours</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-sm">
                  <AlertCircle className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                  <div className="text-white/60">
                    This applicant qualifies for WOTC based on their conviction category and release date. 
                    File Form 8850 within 28 days of hire to claim this credit.
                  </div>
                </div>
              </Card>
            )}

            {/* Work Experience */}
            <Card className="bg-[#121212] border-white/10 p-6">
              <h2 className="text-xl mb-4 flex items-center gap-2">
                <Briefcase className="h-6 w-6 text-[#A8F32C]" />
                Work Experience
              </h2>

              {/* Current Job */}
              <div className="mb-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-white">Current Position</h3>
                  <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-0">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="text-white/60">Title</div>
                      <div className="text-white">{application.currentJob.title}</div>
                    </div>
                    <div>
                      <div className="text-white/60">Company</div>
                      <div className="text-white">{application.currentJob.company}</div>
                    </div>
                    <div>
                      <div className="text-white/60">Duration</div>
                      <div className="text-white">{application.currentJob.duration}</div>
                    </div>
                    <div>
                      <div className="text-white/60">Reason for Leaving</div>
                      <div className="text-white">{application.currentJob.reasonLeaving}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Previous Jobs */}
              <div>
                <h3 className="text-white mb-3">Previous Employment</h3>
                <div className="space-y-3">
                  {application.previousJobs.map((job: any, i: number) => (
                    <div key={i} className="bg-white/5 rounded-lg p-4 text-sm">
                      <div className="flex justify-between mb-2">
                        <div className="text-white">{job.title}</div>
                        <div className="text-white/60">{job.duration}</div>
                      </div>
                      <div className="text-white/60">{job.company}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Skills & Certifications */}
            <Card className="bg-[#121212] border-white/10 p-6">
              <h2 className="text-xl mb-4">Skills & Certifications</h2>
              <div className="space-y-4">
                <div>
                  <div className="text-white/60 text-sm mb-2">Skills</div>
                  <div className="flex flex-wrap gap-2">
                    {application.skills.map((skill: string, i: number) => (
                      <Badge key={i} className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-white/60 text-sm mb-2">Certifications</div>
                  <div className="space-y-2">
                    {application.certifications.map((cert: any, i: number) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div>
                          <div className="text-white">{cert.name}</div>
                          <div className="text-xs text-white/60">{cert.issuer} • {cert.year}</div>
                        </div>
                        <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-0">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Background Check */}
            <Card className="bg-yellow-500/10 border-yellow-500/30 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl mb-2">Background Information</h2>
                  <p className="text-sm text-white/60">Powered by SingleKey</p>
                </div>
                <img src={singleKeyLogo} alt="SingleKey" className="h-8" />
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-sm text-white/60 mb-1">Conviction Category</div>
                  <div className="text-white">{application.convictionType}</div>
                </div>
                <div>
                  <div className="text-sm text-white/60 mb-1">Years Since Release</div>
                  <div className="text-[#A8F32C]">{application.yearsOut} years</div>
                </div>
                <div>
                  <div className="text-sm text-white/60 mb-1">Current Status</div>
                  <div className="text-[#A8F32C]">Probation Completed</div>
                </div>
                <div>
                  <div className="text-sm text-white/60 mb-1">Credit Score</div>
                  <div className="text-white">{application.creditScore}</div>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full border-[#A8F32C]/50 text-[#A8F32C]"
              >
                <FileText className="mr-2 h-4 w-4" />
                View Full Background Report
              </Button>
            </Card>

            {/* Resume/Cover Letter */}
            <Card className="bg-[#121212] border-white/10 p-6">
              <h2 className="text-xl mb-4">Application Documents</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-[#A8F32C]" />
                    <div>
                      <div className="text-white">Resume.pdf</div>
                      <div className="text-xs text-white/60">Uploaded {application.appliedDate}</div>
                    </div>
                  </div>
                  <Button variant="ghost" className="text-white/60 hover:text-white">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-[#A8F32C]" />
                    <div>
                      <div className="text-white">Cover_Letter.pdf</div>
                      <div className="text-xs text-white/60">Uploaded {application.appliedDate}</div>
                    </div>
                  </div>
                  <Button variant="ghost" className="text-white/60 hover:text-white">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Quick Stats */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card className="bg-[#121212] border-white/10 p-6">
              <h3 className="text-lg mb-4">Contact Information</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-white/60 mb-1">Email</div>
                  <div className="text-white">{application.email}</div>
                </div>
                <div>
                  <div className="text-white/60 mb-1">Phone</div>
                  <div className="text-white">{application.phone}</div>
                </div>
                <div>
                  <div className="text-white/60 mb-1">Location</div>
                  <div className="text-white">{application.location}</div>
                </div>
              </div>
            </Card>

            {/* Job Details */}
            <Card className="bg-[#121212] border-white/10 p-6">
              <h3 className="text-lg mb-4">Position Applied For</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-white/60 mb-1">Job Title</div>
                  <div className="text-white">{application.jobTitle}</div>
                </div>
                <div>
                  <div className="text-white/60 mb-1">Department</div>
                  <div className="text-white">{application.department}</div>
                </div>
                <div>
                  <div className="text-white/60 mb-1">Expected Salary</div>
                  <div className="text-[#A8F32C]">{application.expectedSalary}</div>
                </div>
                <div>
                  <div className="text-white/60 mb-1">Start Date</div>
                  <div className="text-white">{application.startDate}</div>
                </div>
              </div>
            </Card>

            {/* FairPath Score */}
            <Card className="bg-[#A8F32C]/10 border-[#A8F32C]/30 p-6">
              <h3 className="text-lg mb-3">Applicant FairPath Score</h3>
              <div className="flex items-center gap-4 mb-3">
                <div className="text-4xl text-[#A8F32C]">{application.fairPathScore}</div>
                <div className="flex-1">
                  <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30 mb-2">
                    Very Good
                  </Badge>
                  <div className="text-xs text-white/60">
                    Based on reliability, community engagement, and application history
                  </div>
                </div>
              </div>
              <div className="h-2 bg-black/30 rounded-full overflow-hidden">
                <div className="h-full bg-[#A8F32C]" style={{ width: '72%' }} />
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-[#121212] border-white/10 p-6">
              <h3 className="text-lg mb-4">Application Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Applications Submitted</span>
                  <span className="text-white">23</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Interview Success Rate</span>
                  <span className="text-[#A8F32C]">65%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Average Response Time</span>
                  <span className="text-white">2 days</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Previous Employer Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-[#A8F32C] text-[#A8F32C]" />
                    <span className="text-white">4.5/5</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
