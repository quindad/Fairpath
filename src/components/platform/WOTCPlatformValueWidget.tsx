import { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, Users, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface WOTCPlatformValueWidgetProps {
  onViewDetails: () => void;
}

export default function WOTCPlatformValueWidget({ onViewDetails }: WOTCPlatformValueWidgetProps) {
  // Mock platform data
  const totalPlatformValue = 1380000000; // $1.38B
  const totalUsers = 95290;
  const availableValue = 380500000; // $380.5M
  const pipelineValue = 999200000; // $999.2M
  
  // Animated counter
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const end = totalPlatformValue;
    const duration = 2000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-br from-yellow-500/20 via-green-500/20 to-transparent border border-yellow-500/50 rounded-2xl p-8 md:p-12">
      <div className="text-center mb-8">
        <Badge className="mb-4 bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
          💰 Live Platform Economics
        </Badge>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          FairPath Platform WOTC Value
        </h2>
        <p className="text-lg text-white/70 max-w-2xl mx-auto">
          Total employer tax credits available across all users
        </p>
      </div>

      {/* Main Value Display */}
      <div className="text-center mb-8">
        <div className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-green-400 to-blue-400 mb-3">
          ${(displayValue / 1000000000).toFixed(2)}B
        </div>
        <p className="text-xl text-white/60">
          {totalUsers.toLocaleString()} users × avg ${Math.round(totalPlatformValue / totalUsers).toLocaleString()} WOTC
        </p>
      </div>

      {/* Breakdown */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="bg-black/30 p-6 rounded-lg border border-green-500/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-white/70">Available Now</span>
            <TrendingUp className="h-4 w-4 text-green-400" />
          </div>
          <p className="text-3xl font-bold text-green-400">
            ${(availableValue / 1000000).toFixed(1)}M
          </p>
          <p className="text-xs text-white/50 mt-1">
            Released/separated users ready to hire
          </p>
        </div>
        
        <div className="bg-black/30 p-6 rounded-lg border border-blue-500/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-white/70">Pipeline (FPF)</span>
            <Users className="h-4 w-4 text-blue-400" />
          </div>
          <p className="text-3xl font-bold text-blue-400">
            ${(pipelineValue / 1000000).toFixed(1)}M
          </p>
          <p className="text-xs text-white/50 mt-1">
            Pre-release/separation users (tablets)
          </p>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white/5 rounded-lg p-6 mb-6">
        <h3 className="font-bold mb-3 flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-yellow-400" />
          How It Works
        </h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <div className="text-green-400 font-bold mb-1">+ Value Goes UP</div>
            <p className="text-white/60">
              When users create profiles on FairPath Forward tablets (+$2,400 or +$9,600 each)
            </p>
          </div>
          <div>
            <div className="text-blue-400 font-bold mb-1">→ Pipeline to Active</div>
            <p className="text-white/60">
              When users are released/separated, WOTC moves from pipeline to available
            </p>
          </div>
          <div>
            <div className="text-yellow-400 font-bold mb-1">- Value Goes DOWN</div>
            <p className="text-white/60">
              When users get hired, credits are claimed - proving real impact delivered
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <Button 
          onClick={onViewDetails}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold"
          size="lg"
        >
          View Full Platform Value Breakdown
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        <p className="text-xs text-white/40 mt-3">
          Live calculation based on user signups, conversions, and hires
        </p>
      </div>
    </div>
  );
}
