import React, { useState } from 'react';
import { Search, Filter, CheckCircle, Clock, MapPin, Calendar } from 'lucide-react';

interface TalentPipelineProps {
  onSelectCandidate: (candidate: any) => void;
  hasPremium: boolean;
  isDemoMode: boolean;
}

export function TalentPipeline({ onSelectCandidate, hasPremium, isDemoMode }: TalentPipelineProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSource, setFilterSource] = useState<'all' | 'friend-a-felon' | 'fairpath-forward'>('all');
  const [filterWOTC, setFilterWOTC] = useState<'all' | 'eligible' | 'not-eligible'>('all');

  const candidates = [
    {
      id: 1,
      name: 'James Carter',
      age: 32,
      location: 'Los Angeles, CA',
      skills: ['Forklift Certified', 'Warehouse', '5 years exp'],
      wotcEligible: true,
      wotcAmount: '$9,600',
      source: 'Friend A Felon',
      status: 'Active - Ready to Work',
      releaseDate: null,
      lastConviction: '2019',
      backgroundCleared: true,
      availability: 'Immediate',
    },
    {
      id: 2,
      name: 'Kevin Washington',
      age: 28,
      location: 'Los Angeles, CA',
      skills: ['CDL Class A', 'Clean MVR', '3 years exp'],
      wotcEligible: true,
      wotcAmount: '$9,600',
      source: 'FairPath Forward',
      status: 'Releasing Dec 15, 2024',
      releaseDate: '2024-12-15',
      lastConviction: '2021',
      backgroundCleared: true,
      availability: 'Dec 15, 2024',
    },
    {
      id: 3,
      name: 'Michael Robinson',
      age: 35,
      location: 'Los Angeles, CA',
      skills: ['Carpentry', 'Construction', '10 years exp'],
      wotcEligible: true,
      wotcAmount: '$5,600',
      source: 'Friend A Felon',
      status: 'Active - Ready to Work',
      releaseDate: null,
      lastConviction: '2018',
      backgroundCleared: true,
      availability: 'Immediate',
    },
    {
      id: 4,
      name: 'Brandon Lewis',
      age: 26,
      location: 'Los Angeles, CA',
      skills: ['Customer Service', 'Retail', '2 years exp'],
      wotcEligible: false,
      wotcAmount: 'Not Eligible',
      source: 'Friend A Felon',
      status: 'Active - Ready to Work',
      releaseDate: null,
      lastConviction: '2023',
      backgroundCleared: true,
      availability: 'Immediate',
    },
    {
      id: 5,
      name: 'Andre Thompson',
      age: 30,
      location: 'Los Angeles, CA',
      skills: ['HVAC Certified', 'Maintenance', '6 years exp'],
      wotcEligible: true,
      wotcAmount: '$9,600',
      source: 'FairPath Forward',
      status: 'Releasing Dec 20, 2024',
      releaseDate: '2024-12-20',
      lastConviction: '2020',
      backgroundCleared: true,
      availability: 'Dec 20, 2024',
    },
    {
      id: 6,
      name: 'Christopher Martin',
      age: 33,
      location: 'Los Angeles, CA',
      skills: ['Production', 'Quality Control', '7 years exp'],
      wotcEligible: true,
      wotcAmount: '$9,600',
      source: 'Friend A Felon',
      status: 'Active - Ready to Work',
      releaseDate: null,
      lastConviction: '2017',
      backgroundCleared: true,
      availability: 'Immediate',
    },
    {
      id: 7,
      name: 'Darius Jackson',
      age: 29,
      location: 'Los Angeles, CA',
      skills: ['Welding', 'Fabrication', '4 years exp'],
      wotcEligible: true,
      wotcAmount: '$9,600',
      source: 'FairPath Forward',
      status: 'Releasing Dec 10, 2024',
      releaseDate: '2024-12-10',
      lastConviction: '2021',
      backgroundCleared: true,
      availability: 'Dec 10, 2024',
    },
    {
      id: 8,
      name: 'Maurice Harris',
      age: 31,
      location: 'Los Angeles, CA',
      skills: ['Food Service', 'Kitchen', '5 years exp'],
      wotcEligible: true,
      wotcAmount: '$5,600',
      source: 'Friend A Felon',
      status: 'Active - Ready to Work',
      releaseDate: null,
      lastConviction: '2019',
      backgroundCleared: true,
      availability: 'Immediate',
    },
  ];

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSource = filterSource === 'all' ||
      (filterSource === 'friend-a-felon' && candidate.source === 'Friend A Felon') ||
      (filterSource === 'fairpath-forward' && candidate.source === 'FairPath Forward');
    
    const matchesWOTC = filterWOTC === 'all' ||
      (filterWOTC === 'eligible' && candidate.wotcEligible) ||
      (filterWOTC === 'not-eligible' && !candidate.wotcEligible);
    
    return matchesSearch && matchesSource && matchesWOTC;
  });

  const wotcEligibleCount = candidates.filter(c => c.wotcEligible).length;
  const releasingSoonCount = candidates.filter(c => c.releaseDate).length;

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="text-2xl text-white mb-1">{candidates.length}</div>
          <div className="text-white/60 text-sm">Total Candidates</div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="text-2xl text-[#A8F32C] mb-1">{wotcEligibleCount}</div>
          <div className="text-white/60 text-sm">WOTC Eligible</div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="text-2xl text-[#FF8C42] mb-1">{releasingSoonCount}</div>
          <div className="text-white/60 text-sm">Releasing Soon</div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="text-2xl text-white mb-1">
            ${(wotcEligibleCount * 9600).toLocaleString()}
          </div>
          <div className="text-white/60 text-sm">Potential WOTC Value</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-black border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#A8F32C] transition-colors"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={filterSource}
              onChange={(e) => setFilterSource(e.target.value as any)}
              className="px-4 py-3 bg-black border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#A8F32C] transition-colors"
            >
              <option value="all">All Sources</option>
              <option value="friend-a-felon">Friend A Felon</option>
              <option value="fairpath-forward">FairPath Forward</option>
            </select>

            <select
              value={filterWOTC}
              onChange={(e) => setFilterWOTC(e.target.value as any)}
              className="px-4 py-3 bg-black border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#A8F32C] transition-colors"
            >
              <option value="all">All WOTC Status</option>
              <option value="eligible">WOTC Eligible</option>
              <option value="not-eligible">Not WOTC Eligible</option>
            </select>
          </div>
        </div>
      </div>

      {/* Candidates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCandidates.map((candidate) => (
          <div
            key={candidate.id}
            onClick={() => onSelectCandidate(candidate)}
            className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-[#A8F32C]/50 transition-colors cursor-pointer"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-white text-xl mb-1">{candidate.name}</h3>
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <span>{candidate.age} years old</span>
                  <span>•</span>
                  <MapPin className="w-4 h-4" />
                  <span>{candidate.location}</span>
                </div>
              </div>
              
              {candidate.wotcEligible ? (
                <div className="text-right">
                  <div className="text-[#A8F32C]">{candidate.wotcAmount}</div>
                  <div className="text-white/60 text-xs">WOTC Credit</div>
                </div>
              ) : (
                <div className="px-3 py-1 bg-white/10 text-white/60 rounded text-xs">
                  No WOTC
                </div>
              )}
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-2 mb-4">
              {candidate.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-[#A8F32C]/20 text-[#A8F32C] rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Status and Source */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                {candidate.releaseDate ? (
                  <>
                    <Clock className="w-4 h-4 text-[#FF8C42]" />
                    <span className="text-white/60 text-sm">{candidate.status}</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 text-[#A8F32C]" />
                    <span className="text-white/60 text-sm">{candidate.status}</span>
                  </>
                )}
              </div>
              
              <span className="px-3 py-1 bg-[#FF8C42]/20 text-[#FF8C42] rounded text-xs">
                {candidate.source}
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredCandidates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-white/60">No candidates match your filters</p>
        </div>
      )}
    </div>
  );
}