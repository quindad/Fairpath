import { Users, Briefcase, Star, Zap } from 'lucide-react';
import { Badge } from '../ui/badge';

export type JobListingType = 'fairpath-staffing' | 'direct-employer' | 'featured' | 'fasttrack';

interface JobListingBadgeProps {
  type: JobListingType;
  isFairPathPlusOnly?: boolean;
  className?: string;
}

export default function JobListingBadge({ type, isFairPathPlusOnly, className = '' }: JobListingBadgeProps) {
  const badges = {
    'fairpath-staffing': {
      icon: Users,
      label: 'FairPath Staffing',
      bgColor: 'bg-[#A8F32C]',
      textColor: 'text-black',
      borderColor: 'border-[#A8F32C]'
    },
    'direct-employer': {
      icon: Briefcase,
      label: 'Employer Posted',
      bgColor: 'bg-white/10',
      textColor: 'text-white',
      borderColor: 'border-white/20'
    },
    'featured': {
      icon: Star,
      label: 'Featured',
      bgColor: 'bg-yellow-500/20',
      textColor: 'text-yellow-500',
      borderColor: 'border-yellow-500/50'
    },
    'fasttrack': {
      icon: Zap,
      label: 'FastTrack Easy Apply',
      bgColor: 'bg-[#A8F32C]/20',
      textColor: 'text-[#A8F32C]',
      borderColor: 'border-[#A8F32C]/50'
    }
  };

  const badge = badges[type];
  const Icon = badge.icon;

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      <Badge 
        className={`${badge.bgColor} ${badge.textColor} border ${badge.borderColor} flex items-center gap-1.5`}
      >
        <Icon className="h-3 w-3" />
        {badge.label}
      </Badge>
      
      {isFairPathPlusOnly && (
        <Badge className="bg-gradient-to-r from-[#A8F32C]/30 to-[#A8F32C]/10 text-[#A8F32C] border border-[#A8F32C]/30">
          FairPath+ Only
        </Badge>
      )}
    </div>
  );
}

// Usage example component
export function JobListingCard({ job }: { job: any }) {
  return (
    <div className="bg-[#121212] border border-white/10 rounded-lg p-6">
      {/* Job Title */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl text-white">{job.title}</h3>
        {job.featured && <JobListingBadge type="featured" />}
      </div>

      {/* Badges */}
      <div className="mb-4">
        {job.isFairPathStaffing ? (
          <JobListingBadge 
            type="fairpath-staffing" 
            isFairPathPlusOnly={job.fairPathPlusOnly}
          />
        ) : (
          <>
            <JobListingBadge type="direct-employer" />
            <div className="mt-2">
              <JobListingBadge type="fasttrack" />
            </div>
          </>
        )}
      </div>

      {/* Job Details */}
      <div className="space-y-2 text-sm text-white/60">
        <p>{job.company}</p>
        <p>{job.location}</p>
        <p>{job.salary}</p>
      </div>

      {/* Description */}
      <p className="text-white/80 mt-4 text-sm">{job.description}</p>

      {/* Apply Button */}
      <button className="mt-4 w-full bg-[#A8F32C] text-black py-2 rounded-lg hover:bg-[#A8F32C]/90 transition-colors">
        {job.isFairPathStaffing ? 'Apply via FairPath Staffing' : 'FastTrack Easy Apply'}
      </button>
    </div>
  );
}
