import { useState } from 'react';
import { Briefcase, MapPin, DollarSign, Clock, Shield, Zap, Building } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import LogoFinal from '../common/LogoFinal';

interface JobListingsProps {
  onEasyApply: (jobId: string) => void;
  onViewDetails: (jobId: string) => void;
}

export default function JobListings({ onEasyApply, onViewDetails }: JobListingsProps) {
  const [filter, setFilter] = useState('all');

  // Dummy job data
  const jobs = [
    {
      id: '1',
      title: 'Warehouse Associate',
      company: 'Great Lakes Distribution',
      location: 'Chicago, IL',
      salary: '$17-20/hour',
      type: 'Full-time',
      posted: '2 days ago',
      isFairPathStaffing: true,
      isEligible: true,
      acceptsConvictions: ['drug', 'property', 'financial', 'other'],
      wotcEligible: true,
      benefits: ['Health Insurance', 'Paid Time Off', '401k'],
      companyLogo: 'https://via.placeholder.com/100'
    },
    {
      id: '2',
      title: 'Forklift Operator',
      company: 'Midwest Logistics',
      location: 'Cicero, IL',
      salary: '$19-22/hour',
      type: 'Full-time',
      posted: '1 week ago',
      isFairPathStaffing: true,
      isEligible: true,
      acceptsConvictions: ['drug', 'property', 'financial'],
      wotcEligible: true,
      benefits: ['Health Insurance', 'Paid Time Off'],
      companyLogo: 'https://via.placeholder.com/100'
    },
    {
      id: '3',
      title: 'Construction Laborer',
      company: 'BuildRight Construction',
      location: 'Evanston, IL',
      salary: '$18-21/hour',
      type: 'Full-time',
      posted: '3 days ago',
      isFairPathStaffing: false,
      isEligible: true,
      acceptsConvictions: ['drug', 'property'],
      wotcEligible: false,
      benefits: ['Paid Time Off'],
      companyLogo: 'https://via.placeholder.com/100'
    },
    {
      id: '4',
      title: 'Line Cook',
      company: 'Downtown Bistro',
      location: 'Chicago, IL',
      salary: '$15-18/hour',
      type: 'Full-time',
      posted: '5 days ago',
      isFairPathStaffing: false,
      isEligible: false,
      acceptsConvictions: ['drug'],
      wotcEligible: false,
      benefits: ['Meal Discounts'],
      companyLogo: 'https://via.placeholder.com/100'
    }
  ];

  const filteredJobs = filter === 'all'
    ? jobs
    : filter === 'eligible'
    ? jobs.filter(j => j.isEligible)
    : jobs.filter(j => j.isFairPathStaffing);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/5 bg-[#121212] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <LogoFinal size="md" />
            <Button variant="ghost" className="text-white/60">
              <MapPin className="mr-2 h-4 w-4" />
              Chicago, IL
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero */}
        <div className="mb-8">
          <h1 className="text-4xl mb-3">Find Your Next Job</h1>
          <p className="text-xl text-white/60">
            Browse felony-friendly jobs with one-click Easy Apply
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg border transition-all ${
              filter === 'all'
                ? 'bg-[#A8F32C] text-black border-[#A8F32C]'
                : 'bg-transparent text-white border-white/20 hover:border-white/40'
            }`}
          >
            All Jobs ({jobs.length})
          </button>
          <button
            onClick={() => setFilter('eligible')}
            className={`px-4 py-2 rounded-lg border transition-all ${
              filter === 'eligible'
                ? 'bg-[#A8F32C] text-black border-[#A8F32C]'
                : 'bg-transparent text-white border-white/20 hover:border-white/40'
            }`}
          >
            Eligible for Me ({jobs.filter(j => j.isEligible).length})
          </button>
          <button
            onClick={() => setFilter('staffing')}
            className={`px-4 py-2 rounded-lg border transition-all ${
              filter === 'staffing'
                ? 'bg-[#A8F32C] text-black border-[#A8F32C]'
                : 'bg-transparent text-white border-white/20 hover:border-white/40'
            }`}
          >
            <Shield className="inline mr-1 h-4 w-4" />
            FairPath Staffing ({jobs.filter(j => j.isFairPathStaffing).length})
          </button>
        </div>

        {/* FairPath Staffing Explainer */}
        {filter === 'staffing' && (
          <Card className="bg-gradient-to-br from-[#A8F32C]/10 via-transparent to-transparent border-[#A8F32C]/30 p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-[#A8F32C]/20 flex items-center justify-center flex-shrink-0">
                <Shield className="h-6 w-6 text-[#A8F32C]" />
              </div>
              <div>
                <h3 className="text-lg mb-2 text-[#A8F32C]">FairPath Staffing Jobs</h3>
                <p className="text-white/80 text-sm mb-3">
                  These employers participate in our WOTC program and earn up to $9,600 in tax credits when they hire you. This makes you MORE valuable to them!
                </p>
                <ul className="space-y-1 text-sm text-white/60">
                  <li>• Background check included (no cost to you)</li>
                  <li>• Pre-screening helps match you to the right role</li>
                  <li>• Employers are trained in fair hiring practices</li>
                  <li>• Higher chance of getting hired</li>
                </ul>
              </div>
            </div>
          </Card>
        )}

        {/* Jobs Grid */}
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="bg-[#121212] border-white/10 p-6 hover:border-[#A8F32C]/50 transition-all">
              <div className="flex gap-6">
                {/* Company Logo */}
                <div className="w-16 h-16 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Building className="h-8 w-8 text-white/40" />
                </div>

                {/* Job Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl">{job.title}</h3>
                        {job.isFairPathStaffing && (
                          <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30">
                            <Shield className="h-3 w-3 mr-1" />
                            FairPath Staffing
                          </Badge>
                        )}
                        {!job.isEligible && (
                          <Badge variant="outline" className="border-white/20 text-white/60">
                            Not Eligible
                          </Badge>
                        )}
                      </div>
                      <p className="text-white/60 mb-2">{job.company}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl text-[#A8F32C]">{job.salary}</div>
                    </div>
                  </div>

                  {/* Job Details */}
                  <div className="flex flex-wrap gap-4 mb-4 text-sm text-white/60">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4" />
                      <span>{job.type}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>Posted {job.posted}</span>
                    </div>
                  </div>

                  {/* Benefits */}
                  {job.benefits.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.benefits.map((benefit, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-white/5 border border-white/10 rounded">
                          {benefit}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-3">
                    {job.isEligible && (
                      <Button
                        onClick={() => onEasyApply(job.id)}
                        className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
                      >
                        <Zap className="mr-2 h-4 w-4" />
                        Easy Apply (FREE)
                      </Button>
                    )}
                    <Button
                      onClick={() => onViewDetails(job.id)}
                      variant="outline"
                      className="border-white/20 text-white"
                    >
                      View Details
                    </Button>
                  </div>

                  {job.wotcEligible && job.isEligible && (
                    <p className="text-xs text-[#A8F32C] mt-3">
                      💰 You may qualify this employer for up to $9,600 in tax credits
                    </p>
                  )}

                  {!job.isEligible && (
                    <p className="text-xs text-white/40 mt-3">
                      This job doesn't accept your conviction type. Keep looking - there are plenty of opportunities!
                    </p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-16">
            <Briefcase className="h-16 w-16 text-white/20 mx-auto mb-4" />
            <h3 className="text-xl mb-2">No jobs found</h3>
            <p className="text-white/60 mb-4">Try adjusting your filters</p>
            <Button onClick={() => setFilter('all')} variant="outline" className="border-white/20 text-white">
              Show All Jobs
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
