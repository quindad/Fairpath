import { TrendingUp, TrendingDown, Info, Star, Shield, Briefcase, Home, Heart } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

interface FairPathScoreProps {
  score: number; // 0-1000
  userType: 'felon' | 'employer' | 'property' | 'resource' | 'reentry' | 'donor';
  recentChange?: number; // +/- points
  onViewDetails?: () => void;
}

export default function FairPathScore({ score, userType, recentChange = 0, onViewDetails }: FairPathScoreProps) {
  // Determine score tier
  const getTier = (score: number) => {
    if (score >= 850) return { name: 'Excellent', color: 'text-[#A8F32C]', bg: 'bg-[#A8F32C]/20', border: 'border-[#A8F32C]/30' };
    if (score >= 700) return { name: 'Very Good', color: 'text-green-500', bg: 'bg-green-500/20', border: 'border-green-500/30' };
    if (score >= 550) return { name: 'Good', color: 'text-blue-500', bg: 'bg-blue-500/20', border: 'border-blue-500/30' };
    if (score >= 400) return { name: 'Fair', color: 'text-yellow-500', bg: 'bg-yellow-500/20', border: 'border-yellow-500/30' };
    if (score >= 250) return { name: 'Poor', color: 'text-orange-500', bg: 'bg-orange-500/20', border: 'border-orange-500/30' };
    return { name: 'Very Poor', color: 'text-red-500', bg: 'bg-red-500/20', border: 'border-red-500/30' };
  };

  const tier = getTier(score);

  // Get icon based on user type
  const getIcon = () => {
    switch (userType) {
      case 'felon': return Star;
      case 'employer': return Briefcase;
      case 'property': return Home;
      case 'resource': return Heart;
      case 'reentry': return Shield;
      case 'donor': return Heart;
    }
  };

  const Icon = getIcon();

  // Get description based on user type
  const getDescription = () => {
    switch (userType) {
      case 'felon':
        return 'Your FairPath Score reflects your activity, reliability, and community engagement. Improve it by completing applications, claiming marketplace items responsibly, and posting helpful resources.';
      case 'employer':
        return 'Your FairPath Score shows your reputation with applicants. Maintain high scores through fair hiring practices, timely responses, and honest job postings.';
      case 'property':
        return 'Your FairPath Score reflects your reputation as a landlord. High scores come from fair treatment, timely communication, and providing promised showings.';
      case 'resource':
        return 'Your FairPath Score shows your impact as a resource partner. Improve through quality resources, timely responses, and helping the community.';
      case 'reentry':
        return 'Your FairPath Score reflects your organization\'s effectiveness. Build trust through successful placements and quality support services.';
      case 'donor':
        return 'Your FairPath Score shows your generosity and reliability. Improve through consistent donations and following through on promises.';
    }
  };

  return (
    <Card className={`${tier.bg} border ${tier.border} p-6`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-full ${tier.bg}`}>
            <Icon className={`h-6 w-6 ${tier.color}`} />
          </div>
          <div>
            <div className="text-sm text-white/60 mb-1">FairPath Score</div>
            <div className="flex items-center gap-3">
              <div className={`text-4xl ${tier.color}`}>{score}</div>
              <Badge className={`${tier.bg} ${tier.color} border ${tier.border}`}>
                {tier.name}
              </Badge>
            </div>
          </div>
        </div>

        {recentChange !== 0 && (
          <div className={`flex items-center gap-1 ${recentChange > 0 ? 'text-[#A8F32C]' : 'text-red-500'}`}>
            {recentChange > 0 ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
            <span className="text-lg">{recentChange > 0 ? '+' : ''}{recentChange}</span>
          </div>
        )}
      </div>

      {/* Score Bar */}
      <div className="relative h-3 bg-black/30 rounded-full mb-4 overflow-hidden">
        <div 
          className={`absolute top-0 left-0 h-full ${tier.color === 'text-[#A8F32C]' ? 'bg-[#A8F32C]' : tier.color.replace('text-', 'bg-')} transition-all duration-500`}
          style={{ width: `${(score / 1000) * 100}%` }}
        />
      </div>

      {/* Score Ranges */}
      <div className="flex justify-between text-xs text-white/40 mb-4">
        <span>0</span>
        <span>250</span>
        <span>550</span>
        <span>850</span>
        <span>1000</span>
      </div>

      <p className="text-sm text-white/60 mb-4">{getDescription()}</p>

      {onViewDetails && (
        <Button
          onClick={onViewDetails}
          variant="outline"
          className="w-full border-white/20 text-white hover:bg-white/5"
        >
          <Info className="mr-2 h-4 w-4" />
          View Score Details
        </Button>
      )}
    </Card>
  );
}
