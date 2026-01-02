import { useState } from 'react';
import { DollarSign, Users, TrendingUp, Briefcase, ArrowRight, Calculator } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';

interface WOTCImpactCalculatorProps {
  onViewDetails?: () => void;
}

export default function WOTCImpactCalculator({ onViewDetails }: WOTCImpactCalculatorProps) {
  // User inputs
  const [felonUsers, setFelonUsers] = useState<number>(1000);
  const [veteranUsers, setVeteranUsers] = useState<number>(500);
  const [enhancedQualifiers, setEnhancedQualifiers] = useState<number>(300); // Ex-felons with SNAP/SSI/Empowerment Zone/TANF
  
  // WOTC rates (REAL IRS data)
  const FELON_WOTC_BASE = 2400; // $2,400 per qualifying ex-felon hire (base)
  const FELON_WOTC_ENHANCED = 9000; // $9,000 for long-term welfare recipients (TANF/SNAP/SSI)
  const VETERAN_WOTC = 9600; // Up to $9,600 per qualifying veteran hire
  
  // Calculations
  const baseFelon = Math.max(0, felonUsers - enhancedQualifiers);
  const enhancedFelon = Math.min(felonUsers, enhancedQualifiers);
  
  const totalBaseFelonValue = baseFelon * FELON_WOTC_BASE;
  const totalEnhancedFelonValue = enhancedFelon * FELON_WOTC_ENHANCED;
  const totalFelonValue = totalBaseFelonValue + totalEnhancedFelonValue;
  const totalVeteranValue = veteranUsers * VETERAN_WOTC;
  const totalPlatformValue = totalFelonValue + totalVeteranValue;
  const totalUsers = felonUsers + veteranUsers;
  const avgValuePerUser = totalUsers > 0 ? totalPlatformValue / totalUsers : 0;
  
  // Business impact calculations
  const potentialHires = Math.floor(totalUsers * 0.7); // Assuming 70% employment rate
  const businessSavings = potentialHires * 15000; // ~$15K avg recruiting cost per hire
  const totalBusinessBenefit = totalPlatformValue + businessSavings;

  return (
    <div className="bg-gradient-to-br from-yellow-500/20 via-green-500/20 to-blue-500/20 border border-yellow-500/50 rounded-2xl p-8 md:p-12">
      <div className="text-center mb-8">
        <Badge className="mb-4 bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
          <Calculator className="h-3 w-3 mr-1 inline" />
          Live WOTC Impact Calculator
        </Badge>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          See The Real Economic Impact
        </h2>
        <p className="text-lg text-white/70 max-w-2xl mx-auto">
          Enter potential platform users to calculate total WOTC value and business savings
        </p>
      </div>

      {/* Input Controls */}
      <div className="grid md:grid-cols-3 gap-6 mb-6 max-w-5xl mx-auto">
        <div className="bg-black/30 p-6 rounded-lg border border-green-500/30">
          <label className="text-sm text-white/70 mb-2 block">Justice-Impacted Users (FAF + FPF)</label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              value={felonUsers}
              onChange={(e) => setFelonUsers(Math.max(0, parseInt(e.target.value) || 0))}
              className="flex-1 bg-black/50 border border-green-500/50 rounded-lg px-4 py-3 text-2xl font-bold text-green-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              min="0"
            />
            <Users className="h-6 w-6 text-green-400" />
          </div>
          <p className="text-xs text-white/50 mt-2">
            Base: ${FELON_WOTC_BASE.toLocaleString()} WOTC per hire
          </p>
        </div>
        
        <div className="bg-black/30 p-6 rounded-lg border border-yellow-500/30">
          <label className="text-sm text-white/70 mb-2 block">Enhanced Qualifiers (SNAP/SSI/TANF/EZ)</label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              value={enhancedQualifiers}
              onChange={(e) => setEnhancedQualifiers(Math.max(0, Math.min(felonUsers, parseInt(e.target.value) || 0)))}
              className="flex-1 bg-black/50 border border-yellow-500/50 rounded-lg px-4 py-3 text-2xl font-bold text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              min="0"
              max={felonUsers}
            />
            <TrendingUp className="h-6 w-6 text-yellow-400" />
          </div>
          <p className="text-xs text-white/50 mt-2">
            Enhanced: ${FELON_WOTC_ENHANCED.toLocaleString()} WOTC per hire
          </p>
        </div>
        
        <div className="bg-black/30 p-6 rounded-lg border border-blue-500/30">
          <label className="text-sm text-white/70 mb-2 block">Veteran Users (FAV)</label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              value={veteranUsers}
              onChange={(e) => setVeteranUsers(Math.max(0, parseInt(e.target.value) || 0))}
              className="flex-1 bg-black/50 border border-blue-500/50 rounded-lg px-4 py-3 text-2xl font-bold text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
            />
            <Users className="h-6 w-6 text-blue-400" />
          </div>
          <p className="text-xs text-white/50 mt-2">
            ${VETERAN_WOTC.toLocaleString()} WOTC per hire
          </p>
        </div>
      </div>

      {/* Enhanced Qualifiers Explanation */}
      <div className="mb-8 max-w-5xl mx-auto bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
        <p className="text-sm text-white/80 mb-2">
          <strong className="text-yellow-400">Enhanced Qualifiers</strong> are justice-impacted individuals who ALSO receive:
        </p>
        <div className="grid md:grid-cols-4 gap-3 text-xs">
          <div className="bg-black/30 p-2 rounded">
            <span className="text-yellow-400 font-bold">SNAP</span>
            <p className="text-white/60">Food assistance</p>
          </div>
          <div className="bg-black/30 p-2 rounded">
            <span className="text-yellow-400 font-bold">SSI</span>
            <p className="text-white/60">Disability income</p>
          </div>
          <div className="bg-black/30 p-2 rounded">
            <span className="text-yellow-400 font-bold">TANF</span>
            <p className="text-white/60">Welfare assistance</p>
          </div>
          <div className="bg-black/30 p-2 rounded">
            <span className="text-yellow-400 font-bold">EZ</span>
            <p className="text-white/60">Empowerment Zone</p>
          </div>
        </div>
        <p className="text-xs text-white/50 mt-2">
          These qualifiers can increase WOTC value from $2,400 to $9,000 per hire (IRS long-term welfare recipient category)
        </p>
      </div>

      {/* Total Platform Value */}
      <div className="text-center mb-8 bg-black/40 p-8 rounded-xl border border-yellow-500/50">
        <p className="text-sm text-white/60 mb-2">Total Platform WOTC Value</p>
        <div className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-green-400 to-blue-400 mb-3">
          ${(totalPlatformValue / 1000000).toFixed(2)}M
        </div>
        <p className="text-lg text-white/60">
          {totalUsers.toLocaleString()} users × avg ${avgValuePerUser.toLocaleString()} WOTC
        </p>
      </div>

      {/* Impact Breakdown */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-green-500/10 border-green-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white/70">Base Ex-Felon</span>
              <Users className="h-4 w-4 text-green-400" />
            </div>
            <p className="text-3xl font-bold text-green-400">
              ${(totalBaseFelonValue / 1000000).toFixed(2)}M
            </p>
            <p className="text-xs text-white/50 mt-1">
              {baseFelon.toLocaleString()} users × ${FELON_WOTC_BASE.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-yellow-500/10 border-yellow-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white/70">Enhanced Ex-Felon</span>
              <TrendingUp className="h-4 w-4 text-yellow-400" />
            </div>
            <p className="text-3xl font-bold text-yellow-400">
              ${(totalEnhancedFelonValue / 1000000).toFixed(2)}M
            </p>
            <p className="text-xs text-white/50 mt-1">
              {enhancedFelon.toLocaleString()} users × ${FELON_WOTC_ENHANCED.toLocaleString()}
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-blue-500/10 border-blue-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white/70">Veteran Value</span>
              <Users className="h-4 w-4 text-blue-400" />
            </div>
            <p className="text-3xl font-bold text-blue-400">
              ${(totalVeteranValue / 1000000).toFixed(2)}M
            </p>
            <p className="text-xs text-white/50 mt-1">
              {veteranUsers.toLocaleString()} users × ${VETERAN_WOTC.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-orange-500/10 border-orange-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white/70">Business Savings</span>
              <DollarSign className="h-4 w-4 text-orange-400" />
            </div>
            <p className="text-3xl font-bold text-orange-400">
              ${(businessSavings / 1000000).toFixed(2)}M
            </p>
            <p className="text-xs text-white/50 mt-1">
              Recruiting costs saved (~$15K/hire)
            </p>
          </CardContent>
        </Card>
      </div>

      {/* What This Means */}
      <div className="bg-white/5 rounded-lg p-6 mb-6">
        <h3 className="font-bold mb-4 flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-green-400" />
          What This Means For Impact
        </h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <div className="text-yellow-400 font-bold mb-1">💰 For Businesses</div>
            <p className="text-white/60">
              ${(totalBusinessBenefit / 1000000).toFixed(1)}M total value from WOTC credits + recruitment savings
            </p>
          </div>
          <div>
            <div className="text-green-400 font-bold mb-1">👥 For Users</div>
            <p className="text-white/60">
              {potentialHires.toLocaleString()} potential job placements changing lives
            </p>
          </div>
          <div>
            <div className="text-blue-400 font-bold mb-1">📈 For Platform</div>
            <p className="text-white/60">
              Every user signup adds ${avgValuePerUser.toLocaleString()} in employer value
            </p>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-black/30 rounded-lg p-6 mb-6 border border-white/10">
        <h3 className="font-bold mb-3">How Platform Value Works:</h3>
        <div className="space-y-2 text-sm text-white/70">
          <div className="flex items-start gap-2">
            <span className="text-green-400">✓</span>
            <p><strong>FPF (Forward):</strong> Incarcerated users create profiles → Add $2,400 WOTC value each</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-400">✓</span>
            <p><strong>FAF (Friend A Felon):</strong> Released users + new signups → Add $2,400 WOTC value each</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-400">✓</span>
            <p><strong>FAV (Friend A Veteran):</strong> Veteran signups → Add $9,600 WOTC value each</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-yellow-400">✓</span>
            <p><strong>When Hired:</strong> Employer claims WOTC credit → Platform proves real impact delivered</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      {onViewDetails && (
        <div className="text-center">
          <Button 
            onClick={onViewDetails}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold"
            size="lg"
          >
            View Full Platform Value Details
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <p className="text-xs text-white/40 mt-3">
            All WOTC values based on IRS Work Opportunity Tax Credit rates
          </p>
        </div>
      )}
    </div>
  );
}