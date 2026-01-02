import { CheckCircle, Clock, XCircle, AlertCircle, Calendar, MapPin, DollarSign, User, FileText, Phone, Mail, Home, Briefcase } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import LogoFinal from '../common/LogoFinal';

interface ApplicationTrackerProps {
  applicationType: 'housing' | 'job';
  applicationId: string;
  onBack: () => void;
}

export default function ApplicationTracker({ applicationType, applicationId, onBack }: ApplicationTrackerProps) {
  // Mock data - would come from API
  const housingApplication = {
    id: applicationId,
    property: '2847 N Sheffield Ave, Unit 3B',
    rent: 1450,
    landlord: 'Chicago Rentals LLC',
    type: 'fasttrack',
    status: 'showing_scheduled',
    submitted: 'Dec 10, 2025',
    timeline: [
      { step: 'Application Submitted', status: 'completed', date: 'Dec 10, 2025 9:30 AM', description: 'Your FastTrack application was received' },
      { step: 'Payment Processed', status: 'completed', date: 'Dec 10, 2025 9:31 AM', description: '$75 payment confirmed' },
      { step: 'Background Screening', status: 'completed', date: 'Dec 11, 2025 2:15 PM', description: 'SingleKey screening completed and sent to landlord' },
      { step: 'Landlord Review', status: 'completed', date: 'Dec 12, 2025 10:00 AM', description: 'Landlord reviewed your application and screening' },
      { step: 'Showing Scheduled', status: 'current', date: 'Dec 15, 2025 2:00 PM', description: 'Property showing confirmed' },
      { step: 'Application Decision', status: 'pending', date: 'TBD', description: 'Landlord will make final decision after showing' },
    ],
    showingDetails: {
      date: 'Sunday, December 15, 2025',
      time: '2:00 PM',
      address: '2847 N Sheffield Ave, Unit 3B, Chicago, IL 60657',
      contact: 'John Smith',
      phone: '(312) 555-0123'
    }
  };

  const jobApplication = {
    id: applicationId,
    position: 'Warehouse Associate',
    company: 'Amazon Fulfillment',
    salary: '$18/hr',
    type: 'easyapply',
    status: 'interview_scheduled',
    submitted: 'Dec 8, 2025',
    timeline: [
      { step: 'Application Submitted', status: 'completed', date: 'Dec 8, 2025 3:45 PM', description: 'Your application was sent to Amazon Fulfillment' },
      { step: 'Application Reviewed', status: 'completed', date: 'Dec 9, 2025 11:20 AM', description: 'Hiring manager reviewed your profile' },
      { step: 'Interview Requested', status: 'completed', date: 'Dec 10, 2025 9:00 AM', description: 'Company requested to schedule an interview' },
      { step: 'Interview Scheduled', status: 'current', date: 'Dec 12, 2025 10:00 AM', description: 'Interview confirmed' },
      { step: 'Interview', status: 'pending', date: 'TBD', description: 'Attend your scheduled interview' },
      { step: 'Hiring Decision', status: 'pending', date: 'TBD', description: 'Company will make final decision' },
    ],
    interviewDetails: {
      date: 'Thursday, December 12, 2025',
      time: '10:00 AM',
      location: 'Amazon Fulfillment Center, 6605 W Grand Ave, Chicago, IL 60707',
      interviewer: 'Sarah Johnson, Hiring Manager',
      phone: '(312) 555-0199',
      type: 'In-Person Interview'
    }
  };

  const application = applicationType === 'housing' ? housingApplication : jobApplication;
  const currentStepIndex = application.timeline.findIndex(t => t.status === 'current');
  const progress = ((currentStepIndex + 1) / application.timeline.length) * 100;

  const getStepIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-6 w-6 text-[#A8F32C]" />;
      case 'current':
        return <Clock className="h-6 w-6 text-yellow-400" />;
      case 'pending':
        return <AlertCircle className="h-6 w-6 text-white/40" />;
      default:
        return <AlertCircle className="h-6 w-6 text-white/40" />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/5 bg-[#121212]">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <LogoFinal size="md" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Back Button */}
        <Button 
          onClick={onBack}
          variant="outline" 
          className="mb-6 border-white/20 text-white"
        >
          ← Back to Dashboard
        </Button>

        {/* Application Header */}
        <Card className="bg-[#121212] border-white/10 p-8 mb-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-lg bg-[#A8F32C]/20 flex items-center justify-center flex-shrink-0">
              {applicationType === 'housing' ? (
                <Home className="h-6 w-6 text-[#A8F32C]" />
              ) : (
                <Briefcase className="h-6 w-6 text-[#A8F32C]" />
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl mb-2 text-white">
                {applicationType === 'housing' ? housingApplication.property : jobApplication.position}
              </h1>
              <div className="flex items-center gap-4 text-white/60">
                {applicationType === 'housing' ? (
                  <>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      ${housingApplication.rent}/month
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {housingApplication.landlord}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      {jobApplication.salary}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {jobApplication.company}
                    </div>
                  </>
                )}
              </div>
            </div>
            <Badge className={`${
              application.status.includes('scheduled') 
                ? 'bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30'
                : 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30'
            }`}>
              {application.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </Badge>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white/60">Application Progress</span>
              <span className="text-sm text-[#A8F32C]">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="text-sm text-white/60">
            Submitted on {application.submitted}
          </div>
        </Card>

        {/* Upcoming Event (if applicable) */}
        {applicationType === 'housing' && housingApplication.status === 'showing_scheduled' && (
          <Card className="bg-gradient-to-r from-[#A8F32C]/20 to-transparent border-[#A8F32C]/30 p-6 mb-6">
            <div className="flex items-start gap-4">
              <Calendar className="h-8 w-8 text-[#A8F32C] flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-xl mb-2 text-white">Upcoming Property Showing</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-white/80">
                    <Calendar className="h-4 w-4" />
                    <span>{housingApplication.showingDetails.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <Clock className="h-4 w-4" />
                    <span>{housingApplication.showingDetails.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <MapPin className="h-4 w-4" />
                    <span>{housingApplication.showingDetails.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <User className="h-4 w-4" />
                    <span>{housingApplication.showingDetails.contact}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <Phone className="h-4 w-4" />
                    <span>{housingApplication.showingDetails.phone}</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">
                    Get Directions
                  </Button>
                  <Button variant="outline" className="border-white/20 text-white">
                    Add to Calendar
                  </Button>
                  <Button variant="outline" className="border-white/20 text-white">
                    Call Landlord
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        {applicationType === 'job' && jobApplication.status === 'interview_scheduled' && (
          <Card className="bg-gradient-to-r from-blue-500/20 to-transparent border-blue-500/30 p-6 mb-6">
            <div className="flex items-start gap-4">
              <Calendar className="h-8 w-8 text-blue-400 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-xl mb-2 text-white">Upcoming Interview</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-white/80">
                    <Calendar className="h-4 w-4" />
                    <span>{jobApplication.interviewDetails.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <Clock className="h-4 w-4" />
                    <span>{jobApplication.interviewDetails.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <MapPin className="h-4 w-4" />
                    <span>{jobApplication.interviewDetails.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <User className="h-4 w-4" />
                    <span>{jobApplication.interviewDetails.interviewer}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <FileText className="h-4 w-4" />
                    <span>{jobApplication.interviewDetails.type}</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button className="bg-blue-500 text-white hover:bg-blue-600">
                    Get Directions
                  </Button>
                  <Button variant="outline" className="border-white/20 text-white">
                    Add to Calendar
                  </Button>
                  <Button variant="outline" className="border-white/20 text-white">
                    Interview Tips
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Timeline */}
        <Card className="bg-[#121212] border-white/10 p-8">
          <h2 className="text-2xl mb-6 text-white">Application Timeline</h2>
          
          <div className="space-y-6">
            {application.timeline.map((item, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  {getStepIcon(item.status)}
                  {index < application.timeline.length - 1 && (
                    <div className={`w-0.5 h-16 mt-2 ${
                      item.status === 'completed' ? 'bg-[#A8F32C]' : 'bg-white/10'
                    }`} />
                  )}
                </div>
                
                <div className="flex-1 pb-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className={`text-lg ${
                        item.status === 'completed' ? 'text-white' :
                        item.status === 'current' ? 'text-[#A8F32C]' :
                        'text-white/40'
                      }`}>
                        {item.step}
                      </h3>
                      <p className={`text-sm ${
                        item.status === 'completed' ? 'text-white/60' :
                        item.status === 'current' ? 'text-white/80' :
                        'text-white/30'
                      }`}>
                        {item.description}
                      </p>
                    </div>
                    <Badge className={`${
                      item.status === 'completed' 
                        ? 'bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30'
                        : item.status === 'current'
                        ? 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30'
                        : 'bg-white/5 text-white/40 border-white/10'
                    }`}>
                      {item.status === 'completed' ? 'Completed' :
                       item.status === 'current' ? 'In Progress' :
                       'Pending'}
                    </Badge>
                  </div>
                  <div className={`text-xs ${
                    item.status === 'pending' ? 'text-white/30' : 'text-white/60'
                  }`}>
                    {item.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Help Section */}
        <Card className="bg-black/50 border border-white/10 p-6 mt-6">
          <h3 className="text-lg mb-3 text-white">Need Help?</h3>
          <p className="text-white/60 text-sm mb-4">
            Have questions about your application? We're here to help!
          </p>
          <div className="flex gap-3">
            <Button variant="outline" className="border-white/20 text-white">
              <Mail className="mr-2 h-4 w-4" />
              Contact Support
            </Button>
            <Button variant="outline" className="border-white/20 text-white">
              <FileText className="mr-2 h-4 w-4" />
              View FAQs
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
