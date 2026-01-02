import { CheckCircle, Home, Clock, FileText, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { PropertyListing } from '../../lib/eligibility';

interface ApplicationConfirmationProps {
  property: PropertyListing;
  applicationId: string;
  onViewApplications: () => void;
  onBackToHousing: () => void;
}

export default function ApplicationConfirmation({
  property,
  applicationId,
  onViewApplications,
  onBackToHousing,
}: ApplicationConfirmationProps) {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Animated Success */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="relative mb-8">
          <div className="w-24 h-24 bg-[#A8F32C]/10 rounded-full flex items-center justify-center animate-pulse">
            <div className="w-20 h-20 bg-[#A8F32C]/20 rounded-full flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-[#A8F32C]" />
            </div>
          </div>
        </div>

        <h1 className="text-3xl mb-3">Application Submitted!</h1>
        <p className="text-white/60 mb-8 max-w-md">
          Your FastTrack application has been successfully submitted to {property.landlordName}
        </p>

        {/* Application ID */}
        <div className="bg-[#121212] rounded-xl px-6 py-4 border border-white/5 mb-8">
          <div className="text-xs text-[#A8F32C] mb-1">APPLICATION ID</div>
          <div className="font-mono text-lg">{applicationId}</div>
        </div>

        {/* Property Info */}
        <div className="w-full max-w-md bg-[#121212] rounded-2xl p-5 border border-white/5 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-white/5">
              <img src={property.imageUrl} alt={property.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="mb-1">{property.title}</h3>
              <p className="text-sm text-white/60">{property.city}, {property.state}</p>
              <p className="text-lg text-[#A8F32C] mt-2">${property.rent}/mo</p>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="w-full max-w-md space-y-3 mb-8">
          <h3 className="text-lg mb-4">What Happens Next</h3>
          
          <div className="flex items-start gap-3 text-left">
            <div className="w-10 h-10 bg-[#A8F32C]/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Clock className="h-5 w-5 text-[#A8F32C]" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm mb-1">Screening in Progress</h4>
              <p className="text-xs text-white/60">
                SingleKey is running your credit, eviction, and criminal background check. This typically takes 24-48 hours.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 text-left">
            <div className="w-10 h-10 bg-[#A8F32C]/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <FileText className="h-5 w-5 text-[#A8F32C]" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm mb-1">You'll Receive Your Report</h4>
              <p className="text-xs text-white/60">
                Once complete, you'll get a copy of your full screening report in the app.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 text-left">
            <div className="w-10 h-10 bg-[#A8F32C]/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Home className="h-5 w-5 text-[#A8F32C]" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm mb-1">Guaranteed Showing</h4>
              <p className="text-xs text-white/60">
                {property.landlordName} will reach out to schedule your in-person or virtual showing within 5-7 business days.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="w-full max-w-md space-y-3">
          <Button
            onClick={onViewApplications}
            className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90 h-14"
          >
            View All Applications
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <Button
            onClick={onBackToHousing}
            variant="outline"
            className="w-full border-white/20 hover:bg-white/5 h-14"
          >
            Back to Housing Marketplace
          </Button>
        </div>
      </div>
    </div>
  );
}
