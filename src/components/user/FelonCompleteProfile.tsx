import { useState } from 'react';
import { User, MapPin, Briefcase, GraduationCap, FileText, Download, Edit, CheckCircle, XCircle, AlertCircle, Star, TrendingUp } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import LogoFinal from '../common/LogoFinal';
import FairPathScore from '../common/FairPathScore';

interface FelonCompleteProfileProps {
  onBack: () => void;
  onViewBackgroundReport: () => void;
}

export default function FelonCompleteProfile({ onBack, onViewBackgroundReport }: FelonCompleteProfileProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'documents' | 'history' | 'activity'>('overview');

  // Profile data
  const profile = {
    name: 'Marcus Johnson',
    age: 32,
    location: 'Springfield, IL',
    profileImage: null,
    fairPathScore: 720,
    fairPathScoreChange: +45,
    profileCompletion: 100,
    memberSince: '2024-06-15',
    
    // Contact
    email: 'marcus.j@email.com',
    phone: '(555) 123-4567',
    
    // Work Experience
    currentJob: {
      title: 'Warehouse Associate',
      company: 'ABC Manufacturing',
      startDate: '2023-09-01',
      salary: '$3,200/mo',
      verified: true
    },
    previousJobs: [
      {
        title: 'Logistics Coordinator',
        company: 'XYZ Logistics',
        duration: '2021-2023',
        reason: 'Career advancement'
      }
    ],
    
    // Education
    education: [
      {
        degree: 'High School Diploma',
        school: 'Springfield High School',
        year: '2010',
        verified: true
      },
      {
        degree: 'Forklift Certification',
        school: 'Safety Training Institute',
        year: '2023',
        verified: true
      }
    ],
    
    // Skills
    skills: ['Forklift Operation', 'Inventory Management', 'Team Leadership', 'Customer Service', 'MS Office'],
    
    // Conviction History
    convictions: [
      {
        category: 'Drug Offenses',
        specificOffense: 'Possession of Controlled Substance',
        convictionDate: '2022-03-15',
        releaseDate: '2022-08-20',
        yearsSinceRelease: 2.5,
        county: 'Sangamon County, IL',
        status: 'Probation Completed',
        hasBackground: true
      }
    ],
    
    // Housing
    currentHousing: {
      type: 'Apartment',
      address: '456 Oak Street, Springfield, IL 62702',
      moveInDate: '2023-09-15',
      monthlyRent: 950,
      landlord: 'Green Property Management',
      status: 'Good Standing'
    },
    
    // Documents
    documents: [
      { name: 'Driver\'s License', status: 'verified', uploadDate: '2024-06-15' },
      { name: 'Social Security Card', status: 'verified', uploadDate: '2024-06-15' },
      { name: 'Birth Certificate', status: 'verified', uploadDate: '2024-06-16' },
      { name: 'Resume', status: 'verified', uploadDate: '2024-07-01' },
      { name: 'Forklift Certification', status: 'verified', uploadDate: '2024-07-10' },
      { name: 'High School Diploma', status: 'verified', uploadDate: '2024-06-20' }
    ],
    
    // Activity Stats
    stats: {
      jobApplications: 23,
      housingApplications: 8,
      resourcesPosted: 12,
      marketplaceItems: 5,
      communityRating: 4.7
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/5 bg-[#121212] sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <LogoFinal size="md" />
            <Button
              onClick={onBack}
              variant="outline"
              className="border-white/20 text-white"
            >
              Back
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Profile Header */}
        <div className="mb-8">
          <div className="flex items-start gap-6 mb-6">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 rounded-full bg-[#A8F32C]/20 border-2 border-[#A8F32C] flex items-center justify-center">
                <User className="h-12 w-12 text-[#A8F32C]" />
              </div>
            </div>

            {/* Name and Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h1 className="text-3xl mb-2">{profile.name}</h1>
                  <div className="flex items-center gap-4 text-white/60">
                    <span>{profile.age} years old</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {profile.location}
                    </span>
                    <span>•</span>
                    <span>Member since {new Date(profile.memberSince).toLocaleDateString()}</span>
                  </div>
                </div>
                <Button variant="outline" className="border-[#A8F32C]/50 text-[#A8F32C]">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </div>

              {/* Profile Completion */}
              <Card className="bg-[#121212] border-[#A8F32C]/30 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white">Profile Completion</span>
                  <span className="text-lg text-[#A8F32C]">{profile.profileCompletion}%</span>
                </div>
                <Progress value={profile.profileCompletion} className="h-2" />
                <div className="flex items-center gap-2 mt-2 text-xs text-[#A8F32C]">
                  <CheckCircle className="h-3 w-3" />
                  <span>Your profile is complete! You're getting maximum visibility.</span>
                </div>
              </Card>
            </div>
          </div>

          {/* FairPath Score */}
          <FairPathScore
            score={profile.fairPathScore}
            userType="felon"
            recentChange={profile.fairPathScoreChange}
            onViewDetails={() => setActiveTab('activity')}
          />
        </div>

        {/* Tabs */}
        <div className="border-b border-white/10 mb-8">
          <div className="flex gap-2">
            {[
              { id: 'overview', label: 'Overview', icon: User },
              { id: 'documents', label: 'Documents', icon: FileText },
              { id: 'history', label: 'Work History', icon: Briefcase },
              { id: 'activity', label: 'Activity', icon: TrendingUp }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 transition-all ${
                  activeTab === tab.id
                    ? 'border-b-2 border-[#A8F32C] text-[#A8F32C]'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Contact Information */}
            <Card className="bg-[#121212] border-white/10 p-6">
              <h2 className="text-xl mb-4">Contact Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-white/60 mb-1">Email</div>
                  <div className="text-white">{profile.email}</div>
                </div>
                <div>
                  <div className="text-sm text-white/60 mb-1">Phone</div>
                  <div className="text-white">{profile.phone}</div>
                </div>
              </div>
            </Card>

            {/* Current Employment */}
            <Card className="bg-[#121212] border-white/10 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl">Current Employment</h2>
                {profile.currentJob.verified && (
                  <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-white/60 mb-1">Position</div>
                  <div className="text-white">{profile.currentJob.title}</div>
                </div>
                <div>
                  <div className="text-sm text-white/60 mb-1">Company</div>
                  <div className="text-white">{profile.currentJob.company}</div>
                </div>
                <div>
                  <div className="text-sm text-white/60 mb-1">Start Date</div>
                  <div className="text-white">{new Date(profile.currentJob.startDate).toLocaleDateString()}</div>
                </div>
                <div>
                  <div className="text-sm text-white/60 mb-1">Monthly Salary</div>
                  <div className="text-[#A8F32C]">{profile.currentJob.salary}</div>
                </div>
              </div>
            </Card>

            {/* Education */}
            <Card className="bg-[#121212] border-white/10 p-6">
              <h2 className="text-xl mb-4 flex items-center gap-2">
                <GraduationCap className="h-6 w-6 text-[#A8F32C]" />
                Education & Certifications
              </h2>
              <div className="space-y-4">
                {profile.education.map((edu, i) => (
                  <div key={i} className="flex items-start justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <div className="text-white mb-1">{edu.degree}</div>
                      <div className="text-sm text-white/60">{edu.school} • {edu.year}</div>
                    </div>
                    {edu.verified && (
                      <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-0">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Skills */}
            <Card className="bg-[#121212] border-white/10 p-6">
              <h2 className="text-xl mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, i) => (
                  <Badge key={i} className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Background Check */}
            <Card className="bg-yellow-500/10 border-yellow-500/30 p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-xl mb-2">Background Information</h2>
                  <div className="mb-4">
                    <div className="text-sm text-white/60 mb-1">Conviction Category</div>
                    <div className="text-white">{profile.convictions[0].category}</div>
                  </div>
                  <div className="mb-4">
                    <div className="text-sm text-white/60 mb-1">Years Since Release</div>
                    <div className="text-[#A8F32C]">{profile.convictions[0].yearsSinceRelease} years</div>
                  </div>
                  <div className="mb-4">
                    <div className="text-sm text-white/60 mb-1">Current Status</div>
                    <div className="text-[#A8F32C]">{profile.convictions[0].status}</div>
                  </div>
                </div>
                <Button
                  onClick={onViewBackgroundReport}
                  className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  View Full Report
                </Button>
              </div>
            </Card>

            {/* Current Housing */}
            <Card className="bg-[#121212] border-white/10 p-6">
              <h2 className="text-xl mb-4">Current Housing</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-white/60 mb-1">Address</div>
                  <div className="text-white">{profile.currentHousing.address}</div>
                </div>
                <div>
                  <div className="text-sm text-white/60 mb-1">Monthly Rent</div>
                  <div className="text-white">${profile.currentHousing.monthlyRent}</div>
                </div>
                <div>
                  <div className="text-sm text-white/60 mb-1">Landlord</div>
                  <div className="text-white">{profile.currentHousing.landlord}</div>
                </div>
                <div>
                  <div className="text-sm text-white/60 mb-1">Status</div>
                  <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-0">
                    {profile.currentHousing.status}
                  </Badge>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="space-y-4">
            <Card className="bg-[#121212] border-white/10 p-6">
              <h2 className="text-xl mb-4">Uploaded Documents</h2>
              <div className="space-y-3">
                {profile.documents.map((doc, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-[#A8F32C]" />
                      <div>
                        <div className="text-white">{doc.name}</div>
                        <div className="text-xs text-white/60">Uploaded {doc.uploadDate}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-0">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                      <Button variant="ghost" className="text-white/60 hover:text-white">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-6">
            <Card className="bg-[#121212] border-white/10 p-6">
              <h2 className="text-xl mb-4">Work History</h2>
              <div className="space-y-4">
                {profile.previousJobs.map((job, i) => (
                  <div key={i} className="p-4 bg-white/5 rounded-lg">
                    <div className="text-white mb-1">{job.title}</div>
                    <div className="text-sm text-white/60 mb-2">{job.company} • {job.duration}</div>
                    <div className="text-sm text-white/40">Left for: {job.reason}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-[#121212] border-white/10 p-6">
                <div className="text-3xl text-[#A8F32C] mb-2">{profile.stats.jobApplications}</div>
                <div className="text-sm text-white/60">Job Applications Submitted</div>
              </Card>
              <Card className="bg-[#121212] border-white/10 p-6">
                <div className="text-3xl text-[#A8F32C] mb-2">{profile.stats.housingApplications}</div>
                <div className="text-sm text-white/60">Housing Applications</div>
              </Card>
              <Card className="bg-[#121212] border-white/10 p-6">
                <div className="text-3xl text-[#A8F32C] mb-2">{profile.stats.resourcesPosted}</div>
                <div className="text-sm text-white/60">Resources Posted</div>
              </Card>
              <Card className="bg-[#121212] border-white/10 p-6">
                <div className="text-3xl text-[#A8F32C] mb-2">{profile.stats.marketplaceItems}</div>
                <div className="text-sm text-white/60">Marketplace Items Claimed</div>
              </Card>
              <Card className="bg-[#121212] border-white/10 p-6">
                <div className="text-3xl text-[#A8F32C] mb-2">{profile.stats.communityRating}</div>
                <div className="text-sm text-white/60">Community Rating</div>
              </Card>
            </div>

            {/* How to Improve Score */}
            <Card className="bg-[#A8F32C]/10 border-[#A8F32C]/30 p-6">
              <h3 className="text-lg mb-4">How to Improve Your FairPath Score</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <Star className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-white mb-1">Complete applications (+5-10 points each)</div>
                    <div className="text-white/60">Fully fill out job and housing applications</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-white mb-1">Post helpful resources (+15 points each)</div>
                    <div className="text-white/60">Share job leads, housing tips, or community resources</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-white mb-1">Claim marketplace items responsibly (+10 points)</div>
                    <div className="text-white/60">Pick up items you claim and rate your experience</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-white mb-1">Maintain good ratings (+20-50 points)</div>
                    <div className="text-white/60">Be professional, reliable, and honest in all interactions</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
