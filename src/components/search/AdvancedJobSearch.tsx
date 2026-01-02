import { useState } from 'react';
import { Search, Filter, MapPin, DollarSign, Briefcase, Clock, X, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';
import LocationAutocomplete from '../common/LocationAutocomplete';

export default function AdvancedJobSearch() {
  const [showFilters, setShowFilters] = useState(true);
  const [filters, setFilters] = useState({
    keyword: '',
    location: '',
    radius: 25,
    minSalary: 0,
    maxSalary: 100000,
    jobType: [] as string[],
    convictionTypes: [] as string[],
    yearsOutMin: 0,
    experienceLevel: [] as string[],
    benefits: [] as string[],
    industry: [] as string[],
    workSchedule: [] as string[],
    hasTransportation: false,
    hasFastTrack: false,
    opportunityZone: false
  });

  const convictionOptions = [
    'Violent Felony',
    'Non-Violent Felony',
    'Drug Offense',
    'Property Crime',
    'White Collar',
    'Sex Offense',
    'Traffic/DUI',
    'Misdemeanor'
  ];

  const jobTypeOptions = ['Full-Time', 'Part-Time', 'Contract', 'Temporary', 'Seasonal'];
  const experienceOptions = ['Entry Level', 'Mid Level', 'Senior Level', 'No Experience Required'];
  const scheduleOptions = ['Day Shift', 'Night Shift', 'Flexible', 'Weekends', 'Remote'];
  const industryOptions = [
    'Warehouse/Logistics',
    'Construction',
    'Food Service',
    'Retail',
    'Manufacturing',
    'Healthcare',
    'Transportation',
    'Hospitality',
    'Technology',
    'Other'
  ];
  const benefitOptions = [
    'Health Insurance',
    'Paid Time Off',
    'Transportation Assistance',
    'On-the-Job Training',
    'Career Advancement',
    '401(k)',
    'Housing Assistance'
  ];

  const toggleFilter = (category: string, value: string) => {
    const current = filters[category as keyof typeof filters] as string[];
    if (current.includes(value)) {
      setFilters({ ...filters, [category]: current.filter(v => v !== value) });
    } else {
      setFilters({ ...filters, [category]: [...current, value] });
    }
  };

  const clearFilters = () => {
    setFilters({
      keyword: '',
      location: '',
      radius: 25,
      minSalary: 0,
      maxSalary: 100000,
      jobType: [],
      convictionTypes: [],
      yearsOutMin: 0,
      experienceLevel: [],
      benefits: [],
      industry: [],
      workSchedule: [],
      hasTransportation: false,
      hasFastTrack: false,
      opportunityZone: false
    });
  };

  const activeFilterCount = 
    filters.jobType.length +
    filters.convictionTypes.length +
    filters.experienceLevel.length +
    filters.benefits.length +
    filters.industry.length +
    filters.workSchedule.length +
    (filters.hasTransportation ? 1 : 0) +
    (filters.hasFastTrack ? 1 : 0) +
    (filters.opportunityZone ? 1 : 0);

  // Mock job results
  const mockJobs = [
    {
      id: '1',
      title: 'Warehouse Associate',
      company: 'Amazon Fulfillment',
      location: 'Chicago, IL',
      salary: '$18-22/hr',
      type: 'Full-Time',
      acceptsConvictions: ['Non-Violent Felony', 'Drug Offense'],
      yearsOutRequired: 1,
      hasFastTrack: true,
      benefits: ['Health Insurance', 'Paid Time Off'],
      postedDate: '2 days ago'
    },
    {
      id: '2',
      title: 'Construction Laborer',
      company: 'Second Chance Builders',
      location: 'Wicker Park, Chicago',
      salary: '$20-25/hr',
      type: 'Full-Time',
      acceptsConvictions: ['Violent Felony', 'Non-Violent Felony'],
      yearsOutRequired: 0,
      hasFastTrack: false,
      benefits: ['On-the-Job Training', 'Career Advancement'],
      postedDate: '5 days ago'
    },
    {
      id: '3',
      title: 'Delivery Driver',
      company: 'Fresh Express Logistics',
      location: 'Lincoln Park, Chicago',
      salary: '$17-20/hr + tips',
      type: 'Full-Time',
      acceptsConvictions: ['Non-Violent Felony', 'Property Crime'],
      yearsOutRequired: 2,
      hasFastTrack: true,
      benefits: ['Flexible', 'Transportation Assistance'],
      postedDate: '1 week ago'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl text-white mb-2">JOB SEARCH</h1>
          <p className="text-white/60">Find felony-friendly jobs that match your background</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-[#121212] border-white/10 p-6 sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl text-white flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  FILTERS
                </h2>
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-[#A8F32C] hover:underline"
                  >
                    Clear All ({activeFilterCount})
                  </button>
                )}
              </div>

              <div className="space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
                {/* Salary Range */}
                <div>
                  <Label className="text-white mb-3 block flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Salary Range
                  </Label>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm text-white/60 mb-2">
                        <span>Min: ${filters.minSalary.toLocaleString()}</span>
                        <span>Max: ${filters.maxSalary.toLocaleString()}</span>
                      </div>
                      <Slider
                        value={[filters.minSalary]}
                        onValueChange={(val) => setFilters({ ...filters, minSalary: val[0] })}
                        max={100000}
                        step={5000}
                        className="mb-2"
                      />
                      <Slider
                        value={[filters.maxSalary]}
                        onValueChange={(val) => setFilters({ ...filters, maxSalary: val[0] })}
                        max={100000}
                        step={5000}
                      />
                    </div>
                  </div>
                </div>

                {/* Job Type */}
                <div>
                  <Label className="text-white mb-3 block">Job Type</Label>
                  <div className="space-y-2">
                    {jobTypeOptions.map((type) => (
                      <button
                        key={type}
                        onClick={() => toggleFilter('jobType', type)}
                        className={`w-full text-left px-3 py-2 rounded border text-sm transition-all ${
                          filters.jobType.includes(type)
                            ? 'bg-[#A8F32C]/10 border-[#A8F32C] text-white'
                            : 'bg-black border-white/10 text-white/80 hover:border-white/30'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Conviction Types Accepted */}
                <div>
                  <Label className="text-white mb-3 block">Accepts Conviction Types</Label>
                  <div className="space-y-2">
                    {convictionOptions.map((type) => (
                      <button
                        key={type}
                        onClick={() => toggleFilter('convictionTypes', type)}
                        className={`w-full text-left px-3 py-2 rounded border text-sm transition-all ${
                          filters.convictionTypes.includes(type)
                            ? 'bg-purple-500/10 border-purple-500 text-white'
                            : 'bg-black border-white/10 text-white/80 hover:border-white/30'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Experience Level */}
                <div>
                  <Label className="text-white mb-3 block">Experience Level</Label>
                  <div className="space-y-2">
                    {experienceOptions.map((level) => (
                      <button
                        key={level}
                        onClick={() => toggleFilter('experienceLevel', level)}
                        className={`w-full text-left px-3 py-2 rounded border text-sm transition-all ${
                          filters.experienceLevel.includes(level)
                            ? 'bg-blue-500/10 border-blue-500 text-white'
                            : 'bg-black border-white/10 text-white/80 hover:border-white/30'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Industry */}
                <div>
                  <Label className="text-white mb-3 block">Industry</Label>
                  <div className="space-y-2">
                    {industryOptions.map((ind) => (
                      <button
                        key={ind}
                        onClick={() => toggleFilter('industry', ind)}
                        className={`w-full text-left px-3 py-2 rounded border text-sm transition-all ${
                          filters.industry.includes(ind)
                            ? 'bg-[#A8F32C]/10 border-[#A8F32C] text-white'
                            : 'bg-black border-white/10 text-white/80 hover:border-white/30'
                        }`}
                      >
                        {ind}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Work Schedule */}
                <div>
                  <Label className="text-white mb-3 block">Work Schedule</Label>
                  <div className="space-y-2">
                    {scheduleOptions.map((sched) => (
                      <button
                        key={sched}
                        onClick={() => toggleFilter('workSchedule', sched)}
                        className={`w-full text-left px-3 py-2 rounded border text-sm transition-all ${
                          filters.workSchedule.includes(sched)
                            ? 'bg-yellow-500/10 border-yellow-500 text-white'
                            : 'bg-black border-white/10 text-white/80 hover:border-white/30'
                        }`}
                      >
                        {sched}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div>
                  <Label className="text-white mb-3 block">Benefits</Label>
                  <div className="space-y-2">
                    {benefitOptions.map((benefit) => (
                      <button
                        key={benefit}
                        onClick={() => toggleFilter('benefits', benefit)}
                        className={`w-full text-left px-3 py-2 rounded border text-sm transition-all ${
                          filters.benefits.includes(benefit)
                            ? 'bg-green-500/10 border-green-500 text-white'
                            : 'bg-black border-white/10 text-white/80 hover:border-white/30'
                        }`}
                      >
                        {benefit}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Special Filters */}
                <div>
                  <Label className="text-white mb-3 block">Special Filters</Label>
                  <div className="space-y-2">
                    <button
                      onClick={() => setFilters({ ...filters, hasFastTrack: !filters.hasFastTrack })}
                      className={`w-full text-left px-3 py-2 rounded border text-sm transition-all ${
                        filters.hasFastTrack
                          ? 'bg-yellow-500/10 border-yellow-500 text-white'
                          : 'bg-black border-white/10 text-white/80 hover:border-white/30'
                      }`}
                    >
                      ⚡ FastTrack Available
                    </button>
                    <button
                      onClick={() => setFilters({ ...filters, opportunityZone: !filters.opportunityZone })}
                      className={`w-full text-left px-3 py-2 rounded border text-sm transition-all ${
                        filters.opportunityZone
                          ? 'bg-green-500/10 border-green-500 text-white'
                          : 'bg-black border-white/10 text-white/80 hover:border-white/30'
                      }`}
                    >
                      📍 Opportunity Zone
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search Bar */}
            <Card className="bg-[#121212] border-white/10 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="keyword" className="text-white mb-2 block">Keywords</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                    <Input
                      id="keyword"
                      placeholder="Job title, company, skills..."
                      value={filters.keyword}
                      onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
                      className="bg-black border-white/20 text-white pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="location" className="text-white mb-2 block">Location</Label>
                  <LocationAutocomplete
                    value={filters.location}
                    onChange={(value) => setFilters({ ...filters, location: value })}
                    placeholder="City, state, or zip code"
                    showOpportunityZone
                  />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <Label className="text-white/60 text-sm">Radius:</Label>
                <div className="flex-1">
                  <Slider
                    value={[filters.radius]}
                    onValueChange={(val) => setFilters({ ...filters, radius: val[0] })}
                    max={100}
                    step={5}
                  />
                </div>
                <span className="text-white text-sm w-16">{filters.radius} mi</span>
              </div>
            </Card>

            {/* Results Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl text-white">{mockJobs.length} Jobs Found</h2>
                <p className="text-white/60 text-sm">Showing jobs that match your background</p>
              </div>
              <Button className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">
                SAVE SEARCH
              </Button>
            </div>

            {/* Job Cards */}
            {mockJobs.map((job) => (
              <Card key={job.id} className="bg-[#121212] border-white/10 p-6 hover:border-[#A8F32C]/50 transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-12 h-12 rounded-lg bg-[#A8F32C]/20 flex items-center justify-center flex-shrink-0">
                        <Briefcase className="h-6 w-6 text-[#A8F32C]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl text-white mb-1">{job.title}</h3>
                        <p className="text-white/60">{job.company}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-white/60 mb-1">Location</p>
                        <p className="text-sm text-white flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {job.location}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-white/60 mb-1">Salary</p>
                        <p className="text-sm text-white flex items-center gap-1">
                          <DollarSign className="h-3 w-3" />
                          {job.salary}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-white/60 mb-1">Type</p>
                        <p className="text-sm text-white">{job.type}</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/60 mb-1">Posted</p>
                        <p className="text-sm text-white flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {job.postedDate}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.hasFastTrack && (
                        <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded">
                          ⚡ FastTrack
                        </span>
                      )}
                      {job.acceptsConvictions.slice(0, 2).map((conv) => (
                        <span key={conv} className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded">
                          {conv}
                        </span>
                      ))}
                      {job.acceptsConvictions.length > 2 && (
                        <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded">
                          +{job.acceptsConvictions.length - 2} more
                        </span>
                      )}
                      {job.yearsOutRequired === 0 ? (
                        <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">
                          ✓ No Time Requirement
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded">
                          {job.yearsOutRequired}+ years out
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90 whitespace-nowrap">
                      VIEW JOB
                    </Button>
                    <Button variant="outline" className="border-white/20 text-white whitespace-nowrap">
                      SAVE
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
