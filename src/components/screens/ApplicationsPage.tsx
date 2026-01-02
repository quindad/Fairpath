import { FileText, Clock, CheckCircle, Calendar, XCircle, Eye, MapPin, DollarSign } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface Application {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyAddress: string;
  propertyCity: string;
  propertyState: string;
  propertyRent: number;
  landlordName: string;
  imageUrl: string;
  dateApplied: string;
  type: 'housing' | 'job';
  method: 'fasttrack' | 'external';
  status: 'submitted' | 'screening' | 'screening-complete' | 'showing-scheduled' | 'approved' | 'denied' | 'withdrawn';
  showingDate?: string;
  showingTime?: string;
  showingLocation?: string;
}

const mockApplications: Application[] = [
  {
    id: 'FAF-1732550000',
    propertyId: '1',
    propertyTitle: 'Modern 2BR Apartment - East Side',
    propertyAddress: '1234 East 55th St',
    propertyCity: 'Cleveland',
    propertyState: 'OH',
    propertyRent: 950,
    landlordName: 'Robert Chen',
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400',
    dateApplied: '2 days ago',
    type: 'housing',
    method: 'fasttrack',
    status: 'showing-scheduled',
    showingDate: 'November 30, 2025',
    showingTime: '2:00 PM',
    showingLocation: '1234 East 55th St, Cleveland, OH',
  },
  {
    id: 'FAF-1732463600',
    propertyId: '3',
    propertyTitle: 'Spacious 3BR Family Home',
    propertyAddress: '456 Maple Avenue',
    propertyCity: 'Akron',
    propertyState: 'OH',
    propertyRent: 1200,
    landlordName: 'Michael Johnson',
    imageUrl: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400',
    dateApplied: '5 days ago',
    type: 'housing',
    method: 'fasttrack',
    status: 'screening-complete',
  },
  {
    id: 'FAF-1732204400',
    propertyId: '2',
    propertyTitle: 'Cozy 1BR Near Downtown',
    propertyAddress: '789 West Boulevard',
    propertyCity: 'Cleveland',
    propertyState: 'OH',
    propertyRent: 750,
    landlordName: 'Sarah Martinez',
    imageUrl: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400',
    dateApplied: '2 weeks ago',
    type: 'housing',
    method: 'fasttrack',
    status: 'screening',
  },
];

const statusConfig = {
  'submitted': {
    icon: FileText,
    label: 'Submitted',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
    description: 'Your application has been submitted',
  },
  'screening': {
    icon: Clock,
    label: 'Screening in Progress',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/20',
    description: 'SingleKey is running your background check',
  },
  'screening-complete': {
    icon: CheckCircle,
    label: 'Screening Complete',
    color: 'text-[#A8F32C]',
    bgColor: 'bg-[#A8F32C]/10',
    borderColor: 'border-[#A8F32C]/20',
    description: 'Landlord is reviewing your application',
  },
  'showing-scheduled': {
    icon: Calendar,
    label: 'Showing Scheduled',
    color: 'text-[#A8F32C]',
    bgColor: 'bg-[#A8F32C]/10',
    borderColor: 'border-[#A8F32C]/20',
    description: 'Your showing is confirmed',
  },
  'approved': {
    icon: CheckCircle,
    label: 'Approved',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/20',
    description: 'Congratulations! You\'ve been approved',
  },
  'denied': {
    icon: XCircle,
    label: 'Not Selected',
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/20',
    description: 'This application was not approved',
  },
  'withdrawn': {
    icon: XCircle,
    label: 'Withdrawn',
    color: 'text-white/40',
    bgColor: 'bg-white/5',
    borderColor: 'border-white/10',
    description: 'You withdrew this application',
  },
};

export default function ApplicationsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="p-6 border-b border-white/5">
        <div className="text-xs tracking-widest text-[#A8F32C] mb-2">
          MY APPLICATIONS
        </div>
        <h1 className="text-3xl mb-1">FastTrack Applications</h1>
        <p className="text-sm text-white/60">
          {mockApplications.length} {mockApplications.length === 1 ? 'application' : 'applications'} submitted
        </p>
      </div>

      {/* Applications List */}
      <div className="p-6 space-y-4">
        {mockApplications.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-white/20 mx-auto mb-4" />
            <p className="text-white/60 mb-2">No applications yet</p>
            <p className="text-sm text-white/40">
              Start applying to housing and jobs with FastTrack
            </p>
          </div>
        ) : (
          mockApplications.map((application) => (
            <ApplicationCard key={application.id} application={application} />
          ))
        )}
      </div>
    </div>
  );
}

function ApplicationCard({ application }: { application: Application }) {
  const config = statusConfig[application.status];
  const StatusIcon = config.icon;

  return (
    <div className="bg-[#121212] rounded-2xl overflow-hidden border border-white/5">
      {/* Property Image & Info */}
      <div className="flex items-start gap-4 p-5 border-b border-white/5">
        <div className="w-20 h-20 rounded-xl overflow-hidden bg-white/5 flex-shrink-0">
          <img
            src={application.imageUrl}
            alt={application.propertyTitle}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-lg mb-1 line-clamp-1">{application.propertyTitle}</h3>
          <div className="flex items-center gap-2 text-sm text-white/60 mb-2">
            <MapPin className="h-3 w-3" />
            <span className="line-clamp-1">{application.propertyCity}, {application.propertyState}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-[#A8F32C]" />
            <span className="text-[#A8F32C]">${application.propertyRent}/mo</span>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className={`p-5 ${config.bgColor} border-b ${config.borderColor}`}>
        <div className="flex items-center gap-3 mb-2">
          <StatusIcon className={`h-5 w-5 ${config.color}`} />
          <span className={`${config.color}`}>{config.label}</span>
        </div>
        <p className="text-sm text-white/60">{config.description}</p>
      </div>

      {/* Showing Details (if scheduled) */}
      {application.status === 'showing-scheduled' && application.showingDate && (
        <div className="p-5 bg-[#A8F32C]/5 border-b border-[#A8F32C]/20">
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-sm mb-1">Showing Details</h4>
              <p className="text-sm text-white/80 mb-1">
                {application.showingDate} at {application.showingTime}
              </p>
              <p className="text-xs text-white/60">{application.showingLocation}</p>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="p-5 space-y-3">
        <div className="flex items-center justify-between text-xs text-white/60 mb-3">
          <span>Applied {application.dateApplied}</span>
          <span className="font-mono">{application.id}</span>
        </div>

        <div className="flex gap-2">
          {(application.status === 'screening-complete' || application.status === 'showing-scheduled') && (
            <Button
              size="sm"
              variant="outline"
              className="flex-1 border-[#A8F32C]/40 text-[#A8F32C] hover:bg-[#A8F32C]/10"
            >
              <Eye className="h-4 w-4 mr-2" />
              View Screening Report
            </Button>
          )}
          
          <Button
            size="sm"
            variant="outline"
            className="flex-1 border-white/20 hover:bg-white/5"
          >
            Message Landlord
          </Button>
        </div>

        <div className="flex items-center gap-2 pt-2 border-t border-white/5">
          <div className="w-8 h-8 bg-[#A8F32C]/10 rounded-full flex items-center justify-center">
            <span className="text-xs text-[#A8F32C]">
              {application.landlordName.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div className="text-xs">
            <div className="text-white/80">{application.landlordName}</div>
            <div className="text-white/40">Property Owner</div>
          </div>
        </div>
      </div>
    </div>
  );
}
