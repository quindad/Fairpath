import { ArrowLeft, Star, Calendar, MapPin, Briefcase, Home, Heart, CheckCircle, Clock, TrendingUp, Award, Shield, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import LogoFinal from '../common/LogoFinal';

interface RecipientProfileProps {
  recipientName: string;
  onBack: () => void;
}

export default function RecipientProfile({ recipientName, onBack }: RecipientProfileProps) {
  // Marcus Johnson's dummy profile data
  const profile = {
    name: 'Marcus Johnson',
    age: 34,
    location: 'Chicago, IL',
    joinDate: 'August 2024',
    fairPathScore: 742,
    profileImage: 'MJ', // Initials for avatar
    
    // Story
    story: "After serving my time, I'm committed to rebuilding my life and proving that everyone deserves a second chance. I've completed job training programs and I'm ready to work hard and contribute positively to society. Having basic household items would help me create a stable home environment as I transition back into the community.",
    
    // Current situation
    currentSituation: {
      housing: 'Transitional Housing (Moving to permanent housing Dec 15)',
      employment: 'Starting warehouse position at Amazon - Dec 10',
      lastIncarcerated: '2022',
      timeServed: '18 months',
      supportSystem: 'Working with Second Chance Services case manager'
    },
    
    // Progress
    progress: {
      housingSecured: true,
      employmentSecured: true,
      caseManager: true,
      skillsTraining: true
    },
    
    // Items claimed
    claimedItems: [
      {
        id: 1,
        item: 'Queen Mattress & Box Spring',
        donor: 'You',
        status: 'approved',
        claimDate: 'Nov 28, 2024',
        pickupDate: 'Dec 14, 2024'
      },
      {
        id: 2,
        item: 'Kitchen Essentials Bundle',
        donor: 'You',
        status: 'completed',
        claimDate: 'Nov 20, 2024',
        pickupDate: 'Nov 25, 2024'
      },
      {
        id: 3,
        item: 'Professional Interview Clothes',
        donor: 'Michael T.',
        status: 'completed',
        claimDate: 'Nov 10, 2024',
        pickupDate: 'Nov 15, 2024'
      }
    ],
    
    // Milestones
    milestones: [
      { title: 'Completed FairPath Onboarding', date: 'Aug 15, 2024', completed: true },
      { title: 'Secured Transitional Housing', date: 'Aug 20, 2024', completed: true },
      { title: 'Completed Job Training Program', date: 'Sep 30, 2024', completed: true },
      { title: 'Accepted Job Offer (Amazon)', date: 'Nov 18, 2024', completed: true },
      { title: 'Moving to Permanent Housing', date: 'Dec 15, 2024', completed: false },
      { title: 'Start New Job', date: 'Dec 10, 2024', completed: false }
    ],
    
    // Verification
    verification: {
      backgroundCheck: true,
      caseManagerVerified: true,
      addressVerified: true,
      employmentVerified: true
    }
  };

  const scorePercentage = (profile.fairPathScore / 1000) * 100;

  const getScoreColor = (score: number) => {
    if (score >= 700) return 'text-[#A8F32C]';
    if (score >= 600) return 'text-yellow-500';
    return 'text-orange-500';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 700) return 'Excellent';
    if (score >= 600) return 'Good';
    return 'Fair';
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/5 bg-[#121212] sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button onClick={onBack} variant="ghost" size="icon" className="text-white/60 hover:text-white">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <LogoFinal size="md" />
            </div>
            <Button onClick={onBack} variant="outline" className="border-white/20 text-white hover:bg-white/5">
              <X className="mr-2 h-4 w-4" />
              Close
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Profile Header */}
        <div className="mb-8">
          <div className="flex items-start gap-6 mb-6">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#A8F32C] to-blue-500 flex items-center justify-center flex-shrink-0">
              <span className="text-3xl text-black">{profile.profileImage}</span>
            </div>

            {/* Basic Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl mb-2 text-white">{profile.name}</h1>
                  <div className="flex items-center gap-4 text-white/60 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {profile.age} years old
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {profile.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      Joined {profile.joinDate}
                    </div>
                  </div>
                  
                  {/* Verification Badges */}
                  <div className="flex gap-2">
                    <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30">
                      <Shield className="mr-1 h-3 w-3" />
                      Verified Profile
                    </Badge>
                    <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/30">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Case Manager Approved
                    </Badge>
                  </div>
                </div>

                {/* FairPath Score */}
                <Card className="bg-gradient-to-br from-[#121212] to-black border-[#A8F32C]/30 p-6 min-w-[200px]">
                  <div className="text-center">
                    <div className="text-sm text-white/60 mb-2">FairPath Score</div>
                    <div className={`text-5xl mb-2 ${getScoreColor(profile.fairPathScore)}`}>
                      {profile.fairPathScore}
                    </div>
                    <div className="text-sm text-white/60 mb-3">{getScoreLabel(profile.fairPathScore)}</div>
                    <Progress value={scorePercentage} className="h-2 bg-white/10" />
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* Their Story */}
          <Card className="bg-gradient-to-r from-purple-500/10 to-transparent border-purple-500/30 p-6">
            <h2 className="text-xl mb-3 text-white flex items-center gap-2">
              <Heart className="h-5 w-5 text-purple-400" />
              Their Story
            </h2>
            <p className="text-white/90 italic leading-relaxed">
              "{profile.story}"
            </p>
          </Card>
        </div>

        {/* Progress Overview */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className={`${profile.progress.housingSecured ? 'bg-[#A8F32C]/10 border-[#A8F32C]/30' : 'bg-[#121212] border-white/10'} p-4`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full ${profile.progress.housingSecured ? 'bg-[#A8F32C]/20' : 'bg-white/10'} flex items-center justify-center`}>
                {profile.progress.housingSecured ? (
                  <CheckCircle className="h-5 w-5 text-[#A8F32C]" />
                ) : (
                  <Home className="h-5 w-5 text-white/40" />
                )}
              </div>
              <div>
                <div className="text-sm text-white/60">Housing</div>
                <div className="text-white">{profile.progress.housingSecured ? 'Secured' : 'In Progress'}</div>
              </div>
            </div>
          </Card>

          <Card className={`${profile.progress.employmentSecured ? 'bg-[#A8F32C]/10 border-[#A8F32C]/30' : 'bg-[#121212] border-white/10'} p-4`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full ${profile.progress.employmentSecured ? 'bg-[#A8F32C]/20' : 'bg-white/10'} flex items-center justify-center`}>
                {profile.progress.employmentSecured ? (
                  <CheckCircle className="h-5 w-5 text-[#A8F32C]" />
                ) : (
                  <Briefcase className="h-5 w-5 text-white/40" />
                )}
              </div>
              <div>
                <div className="text-sm text-white/60">Employment</div>
                <div className="text-white">{profile.progress.employmentSecured ? 'Secured' : 'In Progress'}</div>
              </div>
            </div>
          </Card>

          <Card className={`${profile.progress.caseManager ? 'bg-[#A8F32C]/10 border-[#A8F32C]/30' : 'bg-[#121212] border-white/10'} p-4`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full ${profile.progress.caseManager ? 'bg-[#A8F32C]/20' : 'bg-white/10'} flex items-center justify-center`}>
                {profile.progress.caseManager ? (
                  <CheckCircle className="h-5 w-5 text-[#A8F32C]" />
                ) : (
                  <Heart className="h-5 w-5 text-white/40" />
                )}
              </div>
              <div>
                <div className="text-sm text-white/60">Case Manager</div>
                <div className="text-white">{profile.progress.caseManager ? 'Active' : 'Not Assigned'}</div>
              </div>
            </div>
          </Card>

          <Card className={`${profile.progress.skillsTraining ? 'bg-[#A8F32C]/10 border-[#A8F32C]/30' : 'bg-[#121212] border-white/10'} p-4`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full ${profile.progress.skillsTraining ? 'bg-[#A8F32C]/20' : 'bg-white/10'} flex items-center justify-center`}>
                {profile.progress.skillsTraining ? (
                  <CheckCircle className="h-5 w-5 text-[#A8F32C]" />
                ) : (
                  <Award className="h-5 w-5 text-white/40" />
                )}
              </div>
              <div>
                <div className="text-sm text-white/60">Skills Training</div>
                <div className="text-white">{profile.progress.skillsTraining ? 'Completed' : 'In Progress'}</div>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Current Situation */}
          <Card className="bg-[#121212] border-white/10 p-6">
            <h2 className="text-2xl mb-4 text-white">Current Situation</h2>
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Home className="h-4 w-4 text-[#A8F32C]" />
                  <div className="text-sm text-white/60">Housing Status</div>
                </div>
                <div className="text-white">{profile.currentSituation.housing}</div>
              </div>

              <div className="border-t border-white/10 pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="h-4 w-4 text-blue-400" />
                  <div className="text-sm text-white/60">Employment Status</div>
                </div>
                <div className="text-white">{profile.currentSituation.employment}</div>
              </div>

              <div className="border-t border-white/10 pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-purple-400" />
                  <div className="text-sm text-white/60">Last Incarcerated</div>
                </div>
                <div className="text-white">{profile.currentSituation.lastIncarcerated} ({profile.currentSituation.timeServed})</div>
              </div>

              <div className="border-t border-white/10 pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="h-4 w-4 text-red-400" />
                  <div className="text-sm text-white/60">Support System</div>
                </div>
                <div className="text-white">{profile.currentSituation.supportSystem}</div>
              </div>
            </div>
          </Card>

          {/* Reentry Milestones */}
          <Card className="bg-[#121212] border-white/10 p-6">
            <h2 className="text-2xl mb-4 text-white">Reentry Milestones</h2>
            <div className="space-y-3">
              {profile.milestones.map((milestone, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    milestone.completed 
                      ? 'bg-[#A8F32C]/20' 
                      : 'bg-white/10'
                  }`}>
                    {milestone.completed ? (
                      <CheckCircle className="h-4 w-4 text-[#A8F32C]" />
                    ) : (
                      <Clock className="h-4 w-4 text-white/40" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className={`text-sm ${milestone.completed ? 'text-white' : 'text-white/60'}`}>
                      {milestone.title}
                    </div>
                    <div className="text-xs text-white/40">{milestone.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Items Claimed */}
        <Card className="bg-[#121212] border-white/10 p-6 mt-6">
          <h2 className="text-2xl mb-4 text-white">Items Claimed</h2>
          <div className="space-y-3">
            {profile.claimedItems.map((item) => (
              <div key={item.id} className="bg-black/50 border border-white/10 rounded-lg p-4 hover:border-[#A8F32C]/50 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#A8F32C] to-blue-500 flex items-center justify-center">
                      <Heart className="h-5 w-5 text-black" />
                    </div>
                    <div>
                      <div className="text-white">{item.item}</div>
                      <div className="text-sm text-white/60">
                        Donated by {item.donor === 'You' ? <span className="text-[#A8F32C]">You</span> : item.donor}
                      </div>
                    </div>
                  </div>
                  <Badge className={
                    item.status === 'completed' 
                      ? 'bg-purple-500/20 text-purple-500 border-purple-500/30'
                      : 'bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30'
                  }>
                    {item.status === 'completed' ? 'Completed' : 'Approved'}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-xs text-white/60">
                  <div>Claimed: {item.claimDate}</div>
                  <div>Pickup: {item.pickupDate}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Verification Info */}
        <Card className="bg-gradient-to-r from-blue-500/10 to-transparent border-blue-500/30 p-6 mt-6">
          <h2 className="text-xl mb-4 text-white flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-400" />
            Profile Verification
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-[#A8F32C]" />
              <span className="text-white">Background Check Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-[#A8F32C]" />
              <span className="text-white">Case Manager Verified</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-[#A8F32C]" />
              <span className="text-white">Address Verified</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-[#A8F32C]" />
              <span className="text-white">Employment Verified</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-blue-500/20">
            <p className="text-sm text-white/60">
              All information has been verified by Second Chance Services case management team and the FairPath Industries platform.
            </p>
          </div>
        </Card>

        {/* Impact Message */}
        <Card className="bg-gradient-to-r from-[#A8F32C]/10 to-transparent border-[#A8F32C]/30 p-6 mt-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#A8F32C]/20 flex items-center justify-center flex-shrink-0">
              <Heart className="h-6 w-6 text-[#A8F32C]" />
            </div>
            <div>
              <h3 className="text-xl mb-2 text-white">Your Impact</h3>
              <p className="text-white/80 mb-4">
                By donating to {profile.name}, you're helping them establish a stable foundation as they rebuild their life. 
                Your generosity provides not just material support, but hope and dignity during their reentry journey.
              </p>
              <div className="text-sm text-white/60">
                Thank you for being part of their second chance! 💚
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
