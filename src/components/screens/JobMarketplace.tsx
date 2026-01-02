import { useState } from 'react';
import { Search, SlidersHorizontal, MapPin, Briefcase, Zap, CheckCircle, AlertCircle, DollarSign, Clock, TrendingUp } from 'lucide-react';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { UserProfile } from '../ProfileSetupWizard';
import { JobListing, mockJobs, isEligibleForJob } from '../../lib/eligibility';

interface JobMarketplaceProps {
  userProfile?: UserProfile | null;
  isSubscriber?: boolean;
  onJobSelect?: (jobId: string) => void;
  onApplyToJob?: (jobId: string) => void;
  onNavigateToSubscription?: () => void;
}

export default function JobMarketplace({ 
  userProfile = null, 
  isSubscriber = false,
  onJobSelect,
  onApplyToJob,
  onNavigateToSubscription
}: JobMarketplaceProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showEligibleOnly, setShowEligibleOnly] = useState(true);
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter jobs based on eligibility toggle and subscription status
  const filteredJobs = mockJobs.filter(job => {
    // Hide FairPath Staffing jobs if user is not a FairPath+ subscriber
    if (job.jobType === 'fairpath-staffing' && !isSubscriber) {
      return false;
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.city.toLowerCase().includes(query);
      if (!matchesSearch) return false;
    }

    // Eligibility filter
    if (showEligibleOnly) {
      return isEligibleForJob(userProfile, job);
    }
    
    return true;
  });

  if (selectedJob) {
    return (
      <JobDetail
        job={selectedJob}
        userProfile={userProfile}
        isSubscriber={isSubscriber}
        onBack={() => setSelectedJob(null)}
        onApplyToJob={onApplyToJob}
        onNavigateToSubscription={onNavigateToSubscription}
      />
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="p-6 border-b border-white/5">
        <div className="text-xs tracking-widest text-[#A8F32C] mb-2">
          JOB MARKETPLACE
        </div>
        <h1 className="text-3xl mb-1">Felony-Friendly Jobs</h1>
        <p className="text-sm text-white/60">
          {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'} available • All free to apply
        </p>
      </div>

      {/* Search & Filters */}
      <div className="px-6 py-4 space-y-3">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
          <Input
            placeholder="Search by title, company, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-12 h-12 bg-[#121212] border-white/10 text-white"
          />
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/5 rounded transition-colors"
          >
            <SlidersHorizontal className="h-5 w-5 text-white/40" />
          </button>
        </div>

        {/* FAF+ Exclusive Access Banner */}
        {!isSubscriber && mockJobs.some(j => j.jobType === 'fairpath-staffing') && (
          <div className="bg-gradient-to-br from-[#A8F32C]/10 via-transparent to-transparent rounded-xl p-1">
            <div className="bg-[#121212] rounded-xl p-4 border border-[#A8F32C]/20">
              <div className="flex items-start gap-3">
                <Zap className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-[#A8F32C] mb-1">Unlock exclusive FairPath Staffing opportunities</p>
                  <p className="text-xs text-white/60 mb-3">
                    FairPath+ members get access to premium jobs with automated placement
                  </p>
                  <button className="text-xs text-[#A8F32C] underline" onClick={onNavigateToSubscription}>
                    Upgrade to FairPath+ for $2/month →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Eligibility Toggle */}
        <div className="bg-[#121212] rounded-xl p-4 border border-white/5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                {showEligibleOnly ? (
                  <CheckCircle className="h-4 w-4 text-[#A8F32C]" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                )}
                <span className="text-sm">
                  {showEligibleOnly 
                    ? 'Showing only jobs you\'re eligible for' 
                    : 'Showing all jobs'
                  }
                </span>
              </div>
              <p className="text-xs text-white/60">
                {showEligibleOnly
                  ? 'Based on your profile, these employers accept your record'
                  : 'Some jobs may not accept your record'
                }
              </p>
            </div>
            <button
              onClick={() => setShowEligibleOnly(!showEligibleOnly)}
              className={`px-4 py-2 rounded-lg text-sm transition-all flex-shrink-0 ${
                showEligibleOnly
                  ? 'bg-[#A8F32C] text-black'
                  : 'bg-white/5 text-white border border-white/10'
              }`}
            >
              {showEligibleOnly ? 'Show All' : 'Eligible Only'}
            </button>
          </div>
        </div>

        {!showEligibleOnly && (
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-yellow-100">
              You're viewing all listings. Some may have requirements that don't match your profile. Look for the "You're eligible" badge.
            </p>
          </div>
        )}
      </div>

      {/* Job Listings */}
      <div className="px-6 pb-6 space-y-4">
        {filteredJobs.length === 0 ? (
          <div className="text-center py-12">
            <Briefcase className="h-16 w-16 text-white/20 mx-auto mb-4" />
            <p className="text-white/60 mb-2">No jobs found</p>
            <p className="text-sm text-white/40">
              {!isSubscriber && mockJobs.some(j => j.jobType === 'fairpath-staffing') 
                ? 'Upgrade to FairPath+ to see exclusive FairPath Staffing jobs'
                : showEligibleOnly 
                  ? 'Try toggling "Show All" to see more listings'
                  : 'Try adjusting your search'
              }
            </p>
          </div>
        ) : (
          filteredJobs.map(job => (
            <JobCard
              key={job.id}
              job={job}
              isEligible={isEligibleForJob(userProfile, job)}
              showEligibilityBadge={!showEligibleOnly}
              onClick={() => {
                setSelectedJob(job);
                if (onJobSelect) onJobSelect(job.id);
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}

function JobCard({ 
  job, 
  isEligible, 
  showEligibilityBadge,
  onClick 
}: { 
  job: JobListing; 
  isEligible: boolean;
  showEligibilityBadge: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-[#121212] rounded-2xl overflow-hidden border border-white/5 hover:border-[#A8F32C]/40 transition-all text-left group"
    >
      {/* Image/Logo */}
      {job.imageUrl && (
        <div className="relative h-40 overflow-hidden bg-white/5">
          <img 
            src={job.imageUrl} 
            alt={job.company}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Badges overlay */}
          <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-2">
            {job.jobType === 'fairpath-staffing' && (
              <Badge className="bg-[#A8F32C] text-black border-0 text-xs">
                <Zap className="h-3 w-3 mr-1" />
                FairPath+ Staffing
              </Badge>
            )}
            
            {job.hasFastTrackApply && job.jobType !== 'fairpath-staffing' && (
              <Badge className="bg-white/10 text-white border border-white/20 text-xs">
                <Zap className="h-3 w-3 mr-1" />
                FastTrack Apply
              </Badge>
            )}
            
            {showEligibilityBadge && (
              isEligible ? (
                <Badge className="bg-green-500/90 text-white border-0 text-xs">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  You're eligible
                </Badge>
              ) : (
                <Badge className="bg-yellow-500/90 text-black border-0 text-xs">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  May not accept your record
                </Badge>
              )
            )}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1">
            <h3 className="text-lg mb-1 group-hover:text-[#A8F32C] transition-colors">
              {job.title}
            </h3>
            <div className="text-sm text-white/80 mb-2">{job.company}</div>
          </div>
          
          {!job.imageUrl && job.jobType === 'fairpath-staffing' && (
            <div className="w-10 h-10 bg-[#A8F32C]/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Zap className="h-5 w-5 text-[#A8F32C]" />
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2 text-sm text-white/60 mb-3">
          <MapPin className="h-4 w-4" />
          <span>{job.city}, {job.state}</span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-[#A8F32C]" />
            <div>
              <div className="text-lg text-[#A8F32C]">{job.payRate}</div>
              <div className="text-xs text-white/60">{job.payType}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-white/60">
            <Clock className="h-4 w-4" />
            <span>{job.schedule.split(',')[0]}</span>
          </div>
        </div>
      </div>
    </button>
  );
}

function JobDetail({ 
  job, 
  userProfile, 
  isSubscriber,
  onBack,
  onApplyToJob,
  onNavigateToSubscription
}: { 
  job: JobListing; 
  userProfile: UserProfile | null;
  isSubscriber: boolean;
  onBack: () => void;
  onApplyToJob?: (jobId: string) => void;
  onNavigateToSubscription?: () => void;
}) {
  const isEligible = isEligibleForJob(userProfile, job);
  const fastTrackFee = isSubscriber ? 65 : 75;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-black/95 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-4 px-4 h-14">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            ←
          </button>
          <div className="flex-1">
            <div className="text-xs text-[#A8F32C]">JOB DETAIL</div>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      {job.imageUrl && (
        <div className="relative h-64 bg-white/5">
          <img
            src={job.imageUrl}
            alt={job.company}
            className="w-full h-full object-cover"
          />
          
          {/* Floating badges */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
            {job.jobType === 'fairpath-staffing' && (
              <Badge className="bg-[#A8F32C] text-black border-0">
                <Zap className="h-3 w-3 mr-1" />
                FairPath+ Staffing
              </Badge>
            )}
            {job.hasFastTrackApply && job.jobType !== 'fairpath-staffing' && (
              <Badge className="bg-white/10 text-white border border-white/20">
                <Zap className="h-3 w-3 mr-1" />
                FastTrack Apply
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Title & Company */}
        <div>
          <h1 className="text-3xl mb-2">{job.title}</h1>
          <h2 className="text-xl text-white/80 mb-4">{job.company}</h2>
          <div className="flex items-center gap-2 text-white/60 mb-4">
            <MapPin className="h-4 w-4" />
            <span>{job.location}, {job.city}, {job.state}</span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <DollarSign className="h-6 w-6 text-[#A8F32C]" />
              <div>
                <div className="text-2xl text-[#A8F32C]">{job.payRate}</div>
                <div className="text-xs text-white/60">{job.payType}</div>
              </div>
            </div>
            <div>
              <div className="text-sm text-white/60">Schedule</div>
              <div className="text-white">{job.schedule}</div>
            </div>
          </div>
        </div>

        {/* Eligibility Banner */}
        <div className={`rounded-xl p-4 border ${
          isEligible
            ? 'bg-[#A8F32C]/5 border-[#A8F32C]/20'
            : 'bg-yellow-500/5 border-yellow-500/20'
        }`}>
          <div className="flex items-start gap-3">
            {isEligible ? (
              <CheckCircle className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <p className={`text-sm mb-1 ${isEligible ? 'text-[#A8F32C]' : 'text-yellow-500'}`}>
                {isEligible 
                  ? 'Based on what you told us, you are eligible for this position.'
                  : 'This employer might not accept your record, but you can still apply.'
                }
              </p>
              <p className="text-xs text-white/60">
                {isEligible
                  ? 'This employer has indicated they accept applicants with your record type and history.'
                  : 'The employer has specific requirements that may not match your profile. They will review your application individually.'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <h3 className="text-lg mb-3">About the Job</h3>
          <p className="text-white/80 leading-relaxed">{job.description}</p>
        </div>

        {/* Duties */}
        {job.duties.length > 0 && (
          <div>
            <h3 className="text-lg mb-3">Responsibilities</h3>
            <ul className="space-y-2">
              {job.duties.map((duty, index) => (
                <li key={index} className="flex items-start gap-2 text-white/80">
                  <CheckCircle className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{duty}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Requirements */}
        {job.requirements.length > 0 && (
          <div>
            <h3 className="text-lg mb-3">Requirements</h3>
            <ul className="space-y-2">
              {job.requirements.map((req, index) => (
                <li key={index} className="flex items-start gap-2 text-white/80">
                  <div className="w-1.5 h-1.5 bg-[#A8F32C] rounded-full flex-shrink-0 mt-2" />
                  <span className="text-sm">{req}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Benefits */}
        {job.benefits.length > 0 && (
          <div>
            <h3 className="text-lg mb-3">Benefits</h3>
            <div className="grid grid-cols-2 gap-2">
              {job.benefits.map((benefit, index) => (
                <div key={index} className="bg-[#121212] rounded-lg p-3 border border-white/5">
                  <TrendingUp className="h-4 w-4 text-[#A8F32C] mb-1" />
                  <div className="text-xs text-white/80">{benefit}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Application CTA */}
        {job.jobType === 'fairpath-staffing' ? (
          <div className="bg-gradient-to-br from-[#A8F32C]/10 via-transparent to-transparent rounded-2xl p-1">
            <div className="bg-[#121212] rounded-2xl p-6 border border-[#A8F32C]/20">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 bg-[#A8F32C]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Zap className="h-5 w-5 text-[#A8F32C]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg">FairPath Staffing Opportunity</h3>
                    <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-0 text-xs">
                      FairPath+ Exclusive
                    </Badge>
                  </div>
                  <p className="text-sm text-white/60">
                    Automated screening & placement • Priority consideration
                  </p>
                </div>
              </div>

              <button className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90 h-14 rounded-xl transition-colors">
                <span className="flex items-center justify-center gap-2">
                  <Zap className="h-5 w-5" />
                  FastTrack Apply
                </span>
              </button>
              
              <p className="text-xs text-center text-white/60 mt-3">
                ✨ Powered by FairPath Industries
              </p>
            </div>
          </div>
        ) : job.hasFastTrackApply ? (
          <button className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90 h-14 rounded-xl transition-colors" onClick={() => {
            if (onApplyToJob) onApplyToJob(job.id);
          }}>
            <span className="flex items-center justify-center gap-2">
              <Zap className="h-5 w-5" />
              FastTrack Apply
            </span>
          </button>
        ) : (
          <button className="w-full bg-white/10 text-white hover:bg-white/20 h-14 rounded-xl transition-colors border border-white/20">
            Apply Externally
          </button>
        )}
      </div>
    </div>
  );
}