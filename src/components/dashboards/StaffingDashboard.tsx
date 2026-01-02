import { useState } from 'react';
import { Users, Briefcase, TrendingUp, DollarSign, Settings, LogOut, Award, Building2, UserCheck, Plus, Search, Filter, Calendar, CheckCircle, Clock, XCircle, Phone, Mail, MapPin, Star, FileText, ChevronRight, Eye, MessageCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { useUser } from '../../contexts/UserContext';
import LogoFinal from '../common/LogoFinal';
import { CandidateDetail } from '../CandidateDetail';
import { PlacementDetail } from '../staffing/PlacementDetail';
import { ClientDetail } from '../staffing/ClientDetail';
import { JobDetail } from '../staffing/JobDetail';

interface StaffingDashboardProps {
  userData: any;
  onNavigate: (screen: string) => void;
}

export default function StaffingDashboard({ userData, onNavigate }: StaffingDashboardProps) {
  const { logout } = useUser();
  const [activeTab, setActiveTab] = useState<'overview' | 'candidates' | 'placements' | 'clients' | 'jobs' | 'revenue'>('overview');
  const [selectedCandidate, setSelectedCandidate] = useState<any | null>(null);
  const [selectedPlacement, setSelectedPlacement] = useState<any | null>(null);
  const [selectedClient, setSelectedClient] = useState<any | null>(null);
  const [selectedJob, setSelectedJob] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - comprehensive
  const candidates = [
    {
      id: 1,
      name: 'Marcus Johnson',
      email: 'marcus.j@email.com',
      phone: '(312) 555-0123',
      status: 'available',
      skills: ['Forklift', 'Inventory', 'Warehouse'],
      experience: '5 years',
      wotcEligible: true,
      wotcAmount: '$2,400',
      estimatedCredit: 2400,
      convictionType: 'Non-violent',
      releaseDate: '2023-06-20',
      location: 'Chicago, IL',
      desiredRole: 'Warehouse Associate',
      desiredPay: 18,
      availability: 'Immediate',
      rating: 4.8,
      placements: 3,
      lastPlacement: '2024-11-15',
      certifications: ['Forklift Certified', 'OSHA 10'],
      tags: ['Reliable', 'Hard Worker'],
      lastConviction: '2020',
      age: 29,
      source: 'FairPath Forward'
    },
    {
      id: 2,
      name: 'Darnell Brown',
      email: 'dbrown@email.com',
      phone: '(312) 555-0456',
      status: 'placed',
      skills: ['Food Service', 'Customer Service', 'Cash Handling'],
      experience: '3 years',
      wotcEligible: true,
      wotcAmount: '$2,400',
      estimatedCredit: 2400,
      convictionType: 'Drug-related',
      releaseDate: '2024-08-10',
      location: 'Chicago, IL',
      desiredRole: 'Line Cook',
      desiredPay: 16,
      availability: 'Immediate',
      rating: 4.6,
      placements: 2,
      currentEmployer: "Joe's Diner",
      currentSalary: 17,
      placementDate: '2024-12-01',
      certifications: ['ServSafe'],
      tags: ['Team Player'],
      lastConviction: '2021',
      age: 26,
      source: 'Friend A Felon'
    },
    {
      id: 3,
      name: 'Jamal Williams',
      email: 'jwilliams@email.com',
      phone: '(312) 555-0789',
      status: 'interviewing',
      skills: ['Construction', 'Electrical', 'Plumbing'],
      experience: '8 years',
      wotcEligible: true,
      wotcAmount: '$9,600',
      estimatedCredit: 9600,
      convictionType: 'Property',
      releaseDate: '2023-12-01',
      location: 'Chicago, IL',
      desiredRole: 'Electrician',
      desiredPay: 25,
      availability: '2 weeks notice',
      rating: 4.9,
      placements: 5,
      lastPlacement: '2024-10-01',
      interviewWith: 'ABC Construction',
      interviewDate: '2025-12-05',
      certifications: ['Electrician License', 'OSHA 30'],
      tags: ['Experienced', 'Licensed'],
      lastConviction: '2019',
      age: 34,
      source: 'FairPath Forward'
    }
  ];

  const placements = [
    {
      id: 1,
      candidateId: 2,
      candidateName: 'Darnell Brown',
      clientId: 1,
      clientName: "Joe's Diner",
      position: 'Line Cook',
      placementType: 'hire-screening',
      fee: 149,
      salary: 17,
      startDate: '2024-12-01',
      status: 'active',
      guarantee: '60-day',
      wotcCredit: 2400,
      commission: 134.10, // 90% after platform fee
      paid: true
    },
    {
      id: 2,
      candidateId: 1,
      candidateName: 'Marcus Johnson',
      clientId: 2,
      clientName: 'Target Distribution',
      position: 'Warehouse Associate',
      placementType: 'flat-hire',
      fee: 99,
      salary: 18,
      startDate: '2024-11-15',
      status: 'completed',
      guarantee: '30-day',
      wotcCredit: 2400,
      commission: 89.10,
      paid: true
    },
    {
      id: 3,
      candidateId: 3,
      candidateName: 'Jamal Williams',
      clientId: 3,
      clientName: 'ABC Construction',
      position: 'Electrician',
      placementType: 'percentage',
      fee: 2080, // 5% of $4,160 first month
      salary: 25,
      startDate: '2024-10-01',
      status: 'completed',
      guarantee: '90-day',
      wotcCredit: 9600,
      commission: 1872, // 90% after platform fee
      paid: true
    }
  ];

  const clients = [
    {
      id: 1,
      name: "Joe's Diner",
      industry: 'Food Service',
      contact: 'Joe Smith',
      email: 'joe@joesdiner.com',
      phone: '(312) 555-0100',
      location: 'Chicago, IL',
      activePlacements: 1,
      totalPlacements: 3,
      revenue: 447,
      status: 'active',
      preferredPackage: 'hire-screening'
    },
    {
      id: 2,
      name: 'Target Distribution',
      industry: 'Warehouse/Logistics',
      contact: 'Sarah Williams',
      email: 'sarah@targetdist.com',
      phone: '(312) 555-0200',
      location: 'Chicago, IL',
      activePlacements: 2,
      totalPlacements: 8,
      revenue: 1192,
      status: 'active',
      preferredPackage: 'flat-hire'
    },
    {
      id: 3,
      name: 'ABC Construction',
      industry: 'Construction',
      contact: 'Mike Davis',
      email: 'mike@abcconstruction.com',
      phone: '(312) 555-0300',
      location: 'Chicago, IL',
      activePlacements: 0,
      totalPlacements: 2,
      revenue: 4160,
      status: 'active',
      preferredPackage: 'percentage'
    }
  ];

  const jobs = [
    {
      id: 1,
      title: 'Warehouse Supervisor',
      client: 'Target Distribution',
      location: 'Chicago, IL',
      payRate: 24,
      shift: '1st Shift (7AM - 3PM)',
      type: 'Full-time',
      status: 'Open',
      postedDate: '2024-12-10',
      requirements: ['3+ years experience', 'Leadership skills', 'Forklift certified'],
      industry: 'Logistics',
      openings: 2
    },
    {
      id: 2,
      title: 'Line Cook',
      client: "Joe's Diner",
      location: 'Chicago, IL',
      payRate: 18,
      shift: 'Evening',
      type: 'Full-time',
      status: 'Open',
      postedDate: '2024-12-12',
      requirements: ['Food safety knowledge', 'Experience in fast-paced kitchen'],
      industry: 'Food Service',
      openings: 1
    },
    {
      id: 3,
      title: 'Electrician Apprentice',
      client: 'ABC Construction',
      location: 'Chicago, IL',
      payRate: 22,
      shift: 'Day',
      type: 'Apprenticeship',
      status: 'Open',
      postedDate: '2024-12-14',
      requirements: ['Valid drivers license', 'Willing to learn', 'Basic tool knowledge'],
      industry: 'Construction',
      openings: 3
    }
  ];

  // Stats
  const totalCandidates = candidates.length;
  const availableCandidates = candidates.filter(c => c.status === 'available').length;
  const placedCandidates = candidates.filter(c => c.status === 'placed').length;
  const totalPlacements = placements.length;
  const activePlacements = placements.filter(p => p.status === 'active').length;
  const totalRevenue = placements.reduce((sum, p) => sum + p.fee, 0);
  const totalCommission = placements.reduce((sum, p) => sum + p.commission, 0);
  const totalWOTCCredits = placements.reduce((sum, p) => sum + p.wotcCredit, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'placed': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'interviewing': return 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30';
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'completed': return 'bg-white/20 text-white/60 border-white/30';
      case 'Open': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Filled': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-white/10 text-white/60 border-white/10';
    }
  };

  // CONDITIONAL RENDERING FOR DETAIL VIEWS
  if (selectedCandidate) {
    return (
      <CandidateDetail
        candidate={selectedCandidate}
        onBack={() => setSelectedCandidate(null)}
        hasPremium={true} // Staffing users always have premium features
        isDemoMode={false}
      />
    );
  }

  if (selectedPlacement) {
    return (
      <PlacementDetail
        placement={selectedPlacement}
        onBack={() => setSelectedPlacement(null)}
      />
    );
  }

  if (selectedClient) {
    return (
      <ClientDetail
        client={selectedClient}
        onBack={() => setSelectedClient(null)}
      />
    );
  }

  if (selectedJob) {
    return (
      <JobDetail
        job={selectedJob}
        onBack={() => setSelectedJob(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/5 bg-[#121212] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <LogoFinal size="md" />
            <div className="flex items-center gap-3">
              <Button variant="outline" className="border-white/20 text-white">
                <Settings className="h-5 w-5" />
              </Button>
              <Button onClick={logout} variant="outline" className="border-white/20 text-white hover:bg-white/5">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-b border-white/5 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-2 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', icon: TrendingUp },
              { id: 'candidates', label: 'Candidates', icon: Users },
              { id: 'jobs', label: 'Job Orders', icon: Briefcase },
              { id: 'placements', label: 'Placements', icon: CheckCircle },
              { id: 'clients', label: 'Clients', icon: Building2 },
              { id: 'revenue', label: 'Revenue', icon: DollarSign }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? 'default' : 'ghost'}
                  className={activeTab === tab.id ? 'bg-[#A8F32C] text-black' : 'text-white/60 hover:text-white'}
                  onClick={() => setActiveTab(tab.id as any)}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {tab.label}
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card className="bg-[#121212] border-white/10 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="h-5 w-5 text-blue-400" />
                  <span className="text-white/60">Total Candidates</span>
                </div>
                <div className="text-3xl text-white mb-1">{totalCandidates}</div>
                <div className="text-sm text-green-400">{availableCandidates} available</div>
              </Card>

              <Card className="bg-[#121212] border-white/10 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Briefcase className="h-5 w-5 text-[#A8F32C]" />
                  <span className="text-white/60">Open Jobs</span>
                </div>
                <div className="text-3xl text-white mb-1">{jobs.length}</div>
                <div className="text-sm text-[#A8F32C]">{jobs.reduce((acc, job) => acc + (job.openings || 1), 0)} positions</div>
              </Card>

              <Card className="bg-[#121212] border-white/10 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <DollarSign className="h-5 w-5 text-green-400" />
                  <span className="text-white/60">Total Revenue</span>
                </div>
                <div className="text-3xl text-white mb-1">${totalRevenue.toLocaleString()}</div>
                <div className="text-sm text-green-400">${totalCommission.toLocaleString()} earned</div>
              </Card>

              <Card className="bg-[#121212] border-white/10 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Award className="h-5 w-5 text-yellow-400" />
                  <span className="text-white/60">WOTC Credits</span>
                </div>
                <div className="text-3xl text-white mb-1">${totalWOTCCredits.toLocaleString()}</div>
                <div className="text-sm text-white/60">For clients</div>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="bg-gradient-to-r from-blue-500/10 to-transparent border-blue-500/30 p-6 cursor-pointer hover:border-blue-500/50 transition-all" onClick={() => setActiveTab('candidates')}>
                <h3 className="text-lg mb-3 text-white">Add New Candidate</h3>
                <p className="text-white/60 mb-4 text-sm">
                  Onboard justice-impacted individuals ready for work
                </p>
                <Button className="w-full bg-blue-500 text-white hover:bg-blue-600">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Candidate
                </Button>
              </Card>

              <Card className="bg-gradient-to-r from-green-500/10 to-transparent border-green-500/30 p-6 cursor-pointer hover:border-green-500/50 transition-all" onClick={() => setActiveTab('jobs')}>
                <h3 className="text-lg mb-3 text-white">Create Job Order</h3>
                <p className="text-white/60 mb-4 text-sm">
                  Post a new open position for a client
                </p>
                <Button className="w-full bg-green-500 text-white hover:bg-green-600">
                  <Briefcase className="mr-2 h-4 w-4" />
                  New Job
                </Button>
              </Card>

              <Card className="bg-gradient-to-r from-[#A8F32C]/10 to-transparent border-[#A8F32C]/30 p-6 cursor-pointer hover:border-[#A8F32C]/50 transition-all" onClick={() => setActiveTab('clients')}>
                <h3 className="text-lg mb-3 text-white">Add Client</h3>
                <p className="text-white/60 mb-4 text-sm">
                  Onboard employers looking to hire second-chance talent
                </p>
                <Button className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">
                  <Building2 className="mr-2 h-4 w-4" />
                  Add Client
                </Button>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="bg-[#121212] border-white/10 p-6">
              <h3 className="text-xl mb-4 text-white">Recent Placements</h3>
              <div className="space-y-4">
                {placements.slice(0, 3).map((placement) => (
                  <Card key={placement.id} className="bg-black/50 border-white/10 p-4 cursor-pointer hover:border-[#A8F32C]/50 transition-all" onClick={() => setSelectedPlacement(placement)}>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg text-white">{placement.candidateName}</h4>
                          <Badge className={getStatusColor(placement.status)}>
                            {placement.status}
                          </Badge>
                        </div>
                        <div className="text-white/60 text-sm mb-2">
                          {placement.position} at {placement.clientName}
                        </div>
                        <div className="flex gap-4 text-sm text-white/60">
                          <span>${placement.salary}/hr</span>
                          <span>•</span>
                          <span>Started {new Date(placement.startDate).toLocaleDateString()}</span>
                          <span>•</span>
                          <span>{placement.guarantee} guarantee</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl text-[#A8F32C] mb-1">${placement.commission}</div>
                        <div className="text-sm text-white/60">Your commission</div>
                        <Badge className="bg-yellow-400/20 text-yellow-400 border-yellow-400/30 mt-2">
                          ${placement.wotcCredit} WOTC
                        </Badge>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* CANDIDATES TAB */}
        {activeTab === 'candidates' && (
          <div className="space-y-6">
            {/* Search & Filter */}
            <Card className="bg-[#121212] border-white/10 p-4">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                  <Input
                    placeholder="Search candidates by name, skills, or location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-black/50 border-white/20 text-white pl-10"
                  />
                </div>
                <Button variant="outline" className="border-white/20 text-white">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
                <Button className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Candidate
                </Button>
              </div>
            </Card>

            {/* Candidates List */}
            <div className="grid gap-4">
              {candidates.map((candidate) => (
                <Card
                  key={candidate.id}
                  className="bg-[#121212] border-white/10 p-6 cursor-pointer hover:border-[#A8F32C]/50 transition-all"
                  onClick={() => setSelectedCandidate(candidate)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl text-white">{candidate.name}</h3>
                        <Badge className={getStatusColor(candidate.status)}>
                          {candidate.status}
                        </Badge>
                        {candidate.wotcEligible && (
                          <Badge className="bg-yellow-400/20 text-yellow-400 border-yellow-400/30">
                            WOTC {candidate.wotcAmount || `$${candidate.estimatedCredit}`}
                          </Badge>
                        )}
                      </div>
                      <div className="text-white/80 mb-2">{candidate.desiredRole} • ${candidate.desiredPay}/hr</div>
                      <div className="flex gap-4 text-sm text-white/60">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {candidate.location}
                        </span>
                        <span>{candidate.experience} experience</span>
                        <span>{candidate.placements} placements</span>
                        {candidate.rating && (
                          <span className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            {candidate.rating}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-white/60 mb-2">Availability</div>
                      <div className="text-white">{candidate.availability}</div>
                    </div>
                  </div>

                  <div className="flex gap-2 mb-3">
                    {candidate.skills.map((skill, index) => (
                      <Badge key={index} className="bg-white/10 text-white border-white/20">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    {candidate.tags.map((tag, index) => (
                      <Badge key={index} className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* JOBS TAB */}
        {activeTab === 'jobs' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl text-white">Active Job Orders</h2>
              <Button className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">
                <Plus className="mr-2 h-4 w-4" />
                Create Job Order
              </Button>
            </div>

            <div className="grid gap-4">
              {jobs.map((job) => (
                <Card key={job.id} className="bg-[#121212] border-white/10 p-6 cursor-pointer hover:border-[#A8F32C]/50 transition-all" onClick={() => setSelectedJob(job)}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl text-white">{job.title}</h3>
                        <Badge className={getStatusColor(job.status)}>
                          {job.status}
                        </Badge>
                      </div>
                      <div className="text-white/80 mb-2 flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-white/60" />
                        {job.client}
                      </div>
                      <div className="flex gap-4 text-sm text-white/60">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {job.location}
                        </span>
                        <span>${job.payRate}/hr</span>
                        <span>{job.shift}</span>
                        <span>{job.openings} openings</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl text-[#A8F32C] mb-1">
                        ${(job.payRate * 160 * 0.10).toFixed(0)}
                      </div>
                      <div className="text-sm text-white/60">Est. Commission</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* PLACEMENTS TAB */}
        {activeTab === 'placements' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl text-white">All Placements</h2>
              <Button className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">
                <Plus className="mr-2 h-4 w-4" />
                Record New Placement
              </Button>
            </div>

            <div className="space-y-4">
              {placements.map((placement) => (
                <Card key={placement.id} className="bg-[#121212] border-white/10 p-6 cursor-pointer hover:border-[#A8F32C]/50 transition-all" onClick={() => setSelectedPlacement(placement)}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl text-white">{placement.candidateName}</h3>
                        <Badge className={getStatusColor(placement.status)}>
                          {placement.status}
                        </Badge>
                      </div>
                      <div className="text-lg text-white/80 mb-3">
                        {placement.position} at {placement.clientName}
                      </div>
                      <div className="grid md:grid-cols-4 gap-4 mb-3">
                        <div>
                          <div className="text-sm text-white/60 mb-1">Package Type</div>
                          <div className="text-white capitalize">
                            {placement.placementType.replace('-', ' ')}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-white/60 mb-1">Placement Fee</div>
                          <div className="text-white">${placement.fee}</div>
                        </div>
                        <div>
                          <div className="text-sm text-white/60 mb-1">Your Commission</div>
                          <div className="text-[#A8F32C]">${placement.commission}</div>
                        </div>
                        <div>
                          <div className="text-sm text-white/60 mb-1">WOTC Credit</div>
                          <div className="text-yellow-400">${placement.wotcCredit}</div>
                        </div>
                      </div>
                      <div className="flex gap-4 text-sm text-white/60">
                        <span>Started: {new Date(placement.startDate).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>Salary: ${placement.salary}/hr</span>
                        <span>•</span>
                        <span>Guarantee: {placement.guarantee}</span>
                        <span>•</span>
                        <span className={placement.paid ? 'text-green-400' : 'text-yellow-400'}>
                          {placement.paid ? 'Paid ✓' : 'Pending Payment'}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* CLIENTS TAB */}
        {activeTab === 'clients' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl text-white">Client Portfolio</h2>
              <Button className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">
                <Plus className="mr-2 h-4 w-4" />
                Add Client
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {clients.map((client) => (
                <Card key={client.id} className="bg-[#121212] border-white/10 p-6 cursor-pointer hover:border-[#A8F32C]/50 transition-all" onClick={() => setSelectedClient(client)}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl text-white">{client.name}</h3>
                        <Badge className={getStatusColor(client.status)}>
                          {client.status}
                        </Badge>
                      </div>
                      <div className="text-white/60 mb-3">{client.industry}</div>
                      <div className="space-y-2 text-sm mb-4">
                        <div className="flex items-center gap-2 text-white/60">
                          <Mail className="h-4 w-4" />
                          {client.email}
                        </div>
                        <div className="flex items-center gap-2 text-white/60">
                          <Phone className="h-4 w-4" />
                          {client.phone}
                        </div>
                        <div className="flex items-center gap-2 text-white/60">
                          <MapPin className="h-4 w-4" />
                          {client.location}
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-white/60 mb-1">Active</div>
                          <div className="text-white text-lg">{client.activePlacements}</div>
                        </div>
                        <div>
                          <div className="text-sm text-white/60 mb-1">Total</div>
                          <div className="text-white text-lg">{client.totalPlacements}</div>
                        </div>
                        <div>
                          <div className="text-sm text-white/60 mb-1">Revenue</div>
                          <div className="text-[#A8F32C] text-lg">${client.revenue}</div>
                        </div>
                      </div>
                      <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                        Prefers: {client.preferredPackage.replace('-', ' ')}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 border-white/20 text-white" onClick={(e) => { e.stopPropagation(); /* Add messaging logic here */ }}>
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Message
                    </Button>
                    <Button variant="outline" className="flex-1 border-white/20 text-white">
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* REVENUE TAB */}
        {activeTab === 'revenue' && (
          <div className="space-y-6">
            <h2 className="text-2xl text-white">Revenue & Earnings</h2>

            {/* Revenue Stats */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="bg-[#121212] border-white/10 p-6">
                <div className="text-white/60 mb-2">Total Placement Fees</div>
                <div className="text-4xl text-white mb-1">${totalRevenue.toLocaleString()}</div>
                <div className="text-sm text-white/60">Lifetime</div>
              </Card>

              <Card className="bg-[#121212] border-white/10 p-6">
                <div className="text-white/60 mb-2">Your Commission (90%)</div>
                <div className="text-4xl text-[#A8F32C] mb-1">${totalCommission.toLocaleString()}</div>
                <div className="text-sm text-white/60">After 10% platform fee</div>
              </Card>

              <Card className="bg-[#121212] border-white/10 p-6">
                <div className="text-white/60 mb-2">Client WOTC Value</div>
                <div className="text-4xl text-yellow-400 mb-1">${totalWOTCCredits.toLocaleString()}</div>
                <div className="text-sm text-white/60">Tax credits for clients</div>
              </Card>
            </div>

            {/* Breakdown by Package Type */}
            <Card className="bg-[#121212] border-white/10 p-6">
              <h3 className="text-xl mb-4 text-white">Revenue by Package Type</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-black/50 border border-white/10 rounded-lg">
                  <div>
                    <div className="text-white mb-1">Flat Hire Fee ($99)</div>
                    <div className="text-sm text-white/60">1 placement</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl text-white">$99</div>
                    <div className="text-sm text-[#A8F32C]">$89.10 earned</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-black/50 border border-white/10 rounded-lg">
                  <div>
                    <div className="text-white mb-1">Hire + Screening ($149)</div>
                    <div className="text-sm text-white/60">1 placement</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl text-white">$149</div>
                    <div className="text-sm text-[#A8F32C]">$134.10 earned</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-black/50 border border-white/10 rounded-lg">
                  <div>
                    <div className="text-white mb-1">Percentage-Based (5%)</div>
                    <div className="text-sm text-white/60">1 placement</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl text-white">$2,080</div>
                    <div className="text-sm text-white/60">1 placement</div>
                    <div className="text-xs text-[#A8F32C]">$1,872 earned</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Payment History */}
            <Card className="bg-[#121212] border-white/10 p-6">
              <h3 className="text-xl mb-4 text-white">Payment History</h3>
              <div className="space-y-3">
                {placements.map((placement) => (
                  <div key={placement.id} className="flex items-center justify-between p-3 bg-black/50 border border-white/10 rounded-lg">
                    <div>
                      <div className="text-white">{placement.candidateName} → {placement.clientName}</div>
                      <div className="text-sm text-white/60">{new Date(placement.startDate).toLocaleDateString()}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg text-[#A8F32C]">${placement.commission}</div>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        Paid
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
