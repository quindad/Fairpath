import { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, TrendingDown, Users, Briefcase, Home, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

export default function WOTCPlatformValue() {
  // Mock data - would come from database in production
  const platformStats = {
    // FPF Users (in facilities, not yet released/separated)
    fpf_prison: {
      count: 15420,
      avgWOTC: 2400,
      totalValue: 15420 * 2400
    },
    fpf_military: {
      count: 8350,
      avgWOTC: 9600,
      totalValue: 8350 * 9600
    },
    
    // FAF Users (released, active on platform)
    faf_active: {
      count: 42580,
      avgWOTC: 2400,
      totalValue: 42580 * 2400
    },
    
    // FAV Users (separated, active on platform)
    fav_active: {
      count: 28940,
      avgWOTC: 9600,
      totalValue: 28940 * 9600
    },
    
    // Hired (WOTC claimed this month)
    hired_faf_month: {
      count: 1240,
      wotcClaimed: 1240 * 2400
    },
    hired_fav_month: {
      count: 850,
      wotcClaimed: 850 * 9600
    },
    
    // Conversions this month
    fpf_to_faf_conversions: 1850, // Released from prison this month
    fpf_to_fav_conversions: 920   // Separated from military this month
  };

  // Calculate totals
  const totalAvailableWOTC = 
    platformStats.faf_active.totalValue + 
    platformStats.fav_active.totalValue;
    
  const totalPipelineWOTC = 
    platformStats.fpf_prison.totalValue + 
    platformStats.fpf_military.totalValue;
    
  const totalPlatformValue = totalAvailableWOTC + totalPipelineWOTC;
  
  const wotcClaimedThisMonth = 
    platformStats.hired_faf_month.wotcClaimed + 
    platformStats.hired_fav_month.wotcClaimed;
    
  const wotcAddedThisMonth = 
    (platformStats.fpf_to_faf_conversions * 2400) + 
    (platformStats.fpf_to_fav_conversions * 9600);

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
  }, [totalPlatformValue]);

  return (
    <div className="space-y-6">
      {/* Main Platform Value */}
      <Card className="bg-gradient-to-br from-yellow-500/20 via-green-500/20 to-transparent border-yellow-500/50">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">FairPath Platform WOTC Value</h2>
              <p className="text-white/70">Total employer tax credits available across all users</p>
            </div>
            <DollarSign className="h-16 w-16 text-yellow-400" />
          </div>
          
          <div className="text-center mb-6">
            <p className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-green-400 to-blue-400">
              ${(displayValue / 1000000000).toFixed(2)}B
            </p>
            <p className="text-xl text-white/60 mt-2">
              {(platformStats.faf_active.count + platformStats.fav_active.count + platformStats.fpf_prison.count + platformStats.fpf_military.count).toLocaleString()} users × average ${((totalPlatformValue / (platformStats.faf_active.count + platformStats.fav_active.count + platformStats.fpf_prison.count + platformStats.fpf_military.count))).toLocaleString()} WOTC
            </p>
          </div>

          {/* Breakdown */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-black/30 p-4 rounded-lg border border-green-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white/70">Available Now (Active Users)</span>
                <TrendingUp className="h-4 w-4 text-green-400" />
              </div>
              <p className="text-3xl font-bold text-green-400">
                ${(totalAvailableWOTC / 1000000).toFixed(1)}M
              </p>
              <p className="text-xs text-white/50 mt-1">
                {(platformStats.faf_active.count + platformStats.fav_active.count).toLocaleString()} released/separated users
              </p>
            </div>
            
            <div className="bg-black/30 p-4 rounded-lg border border-blue-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white/70">Pipeline (FPF Tablets)</span>
                <Users className="h-4 w-4 text-blue-400" />
              </div>
              <p className="text-3xl font-bold text-blue-400">
                ${(totalPipelineWOTC / 1000000).toFixed(1)}M
              </p>
              <p className="text-xs text-white/50 mt-1">
                {(platformStats.fpf_prison.count + platformStats.fpf_military.count).toLocaleString()} pre-release/separation users
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* This Month Activity */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* WOTC Added This Month */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-400" />
              WOTC Value Added This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-green-400 mb-4">
              +${(wotcAddedThisMonth / 1000000).toFixed(2)}M
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-[#A8F32C]/10 rounded border border-[#A8F32C]/30">
                <div>
                  <p className="text-sm text-white/70">FAF Conversions (FPF → FAF)</p>
                  <p className="text-xs text-white/50">{platformStats.fpf_to_faf_conversions.toLocaleString()} users released from prison</p>
                </div>
                <p className="text-xl font-bold text-[#A8F32C]">
                  +${((platformStats.fpf_to_faf_conversions * 2400) / 1000000).toFixed(2)}M
                </p>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-[#FFD700]/10 rounded border border-[#FFD700]/30">
                <div>
                  <p className="text-sm text-white/70">FAV Conversions (FPF → FAV)</p>
                  <p className="text-xs text-white/50">{platformStats.fpf_to_fav_conversions.toLocaleString()} veterans separated from service</p>
                </div>
                <p className="text-xl font-bold text-[#FFD700]">
                  +${((platformStats.fpf_to_fav_conversions * 9600) / 1000000).toFixed(2)}M
                </p>
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-500/10 rounded border border-blue-500/30">
              <p className="text-xs text-blue-400">
                <strong>How it works:</strong> When users are released/separated, their FPF profiles 
                automatically convert to FAF/FAV and WOTC value becomes available to employers.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* WOTC Claimed This Month */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-red-400" />
              WOTC Credits Claimed This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-red-400 mb-4">
              -${(wotcClaimedThisMonth / 1000000).toFixed(2)}M
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-[#A8F32C]/10 rounded border border-[#A8F32C]/30">
                <div>
                  <p className="text-sm text-white/70">FAF Hires</p>
                  <p className="text-xs text-white/50">{platformStats.hired_faf_month.count.toLocaleString()} users hired</p>
                </div>
                <p className="text-xl font-bold text-[#A8F32C]">
                  ${(platformStats.hired_faf_month.wotcClaimed / 1000000).toFixed(2)}M
                </p>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-[#FFD700]/10 rounded border border-[#FFD700]/30">
                <div>
                  <p className="text-sm text-white/70">FAV Hires</p>
                  <p className="text-xs text-white/50">{platformStats.hired_fav_month.count.toLocaleString()} veterans hired</p>
                </div>
                <p className="text-xl font-bold text-[#FFD700]">
                  ${(platformStats.hired_fav_month.wotcClaimed / 1000000).toFixed(2)}M
                </p>
              </div>
            </div>

            <div className="mt-4 p-3 bg-orange-500/10 rounded border border-orange-500/30">
              <p className="text-xs text-orange-400">
                <strong>Win-win-win:</strong> Users get jobs, employers get tax credits, platform value 
                demonstrates real economic impact.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Platform Breakdown */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle>WOTC Value by Platform</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* FPF (Tablets) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                    📱 FairPath Forward (Tablets)
                  </Badge>
                  <span className="text-sm text-white/60">
                    {(platformStats.fpf_prison.count + platformStats.fpf_military.count).toLocaleString()} users
                  </span>
                </div>
                <span className="text-xl font-bold">
                  ${(totalPipelineWOTC / 1000000).toFixed(1)}M
                </span>
              </div>
              <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-blue-500" 
                  style={{ width: `${(totalPipelineWOTC / totalPlatformValue * 100)}%` }}
                ></div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-2">
                <div className="text-xs text-white/50">
                  Prison: {platformStats.fpf_prison.count.toLocaleString()} users (${(platformStats.fpf_prison.totalValue / 1000000).toFixed(1)}M)
                </div>
                <div className="text-xs text-white/50">
                  Military: {platformStats.fpf_military.count.toLocaleString()} users (${(platformStats.fpf_military.totalValue / 1000000).toFixed(1)}M)
                </div>
              </div>
            </div>

            {/* FAF */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30">
                    Friend A Felon
                  </Badge>
                  <span className="text-sm text-white/60">
                    {platformStats.faf_active.count.toLocaleString()} active users
                  </span>
                </div>
                <span className="text-xl font-bold text-[#A8F32C]">
                  ${(platformStats.faf_active.totalValue / 1000000).toFixed(1)}M
                </span>
              </div>
              <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#A8F32C]" 
                  style={{ width: `${(platformStats.faf_active.totalValue / totalPlatformValue * 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-white/50 mt-1">
                Average: $2,400 WOTC per hire
              </p>
            </div>

            {/* FAV */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Badge className="bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30">
                    Friend A Veteran
                  </Badge>
                  <span className="text-sm text-white/60">
                    {platformStats.fav_active.count.toLocaleString()} active veterans
                  </span>
                </div>
                <span className="text-xl font-bold text-[#FFD700]">
                  ${(platformStats.fav_active.totalValue / 1000000).toFixed(1)}M
                </span>
              </div>
              <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#FFD700]" 
                  style={{ width: `${(platformStats.fav_active.totalValue / totalPlatformValue * 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-white/50 mt-1">
                Average: $5,600-$9,600 WOTC per hire
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Impact Statement */}
      <Card className="bg-gradient-to-br from-[#A8F32C]/20 to-transparent border-[#A8F32C]/50">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Award className="h-12 w-12 text-[#A8F32C] flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold mb-3">What This Means</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-white/70">
                <div>
                  <p className="font-bold text-white mb-1">For Employers:</p>
                  <p>Every hire from FairPath qualifies for federal tax credits. Our platform represents <strong className="text-[#A8F32C]">${(totalPlatformValue / 1000000000).toFixed(2)}B in available credits</strong> ready to offset your hiring costs.</p>
                </div>
                <div>
                  <p className="font-bold text-white mb-1">For Users:</p>
                  <p>Your WOTC eligibility makes you <strong className="text-[#A8F32C]">more valuable</strong> to employers. Companies save thousands per hire, creating incentive to hire YOU.</p>
                </div>
                <div>
                  <p className="font-bold text-white mb-1">For Investors:</p>
                  <p>Platform value grows as FPF users are released/separated. Each new signup adds <strong className="text-[#A8F32C]">$2,400-$9,600</strong> to total platform worth.</p>
                </div>
                <div>
                  <p className="font-bold text-white mb-1">For Society:</p>
                  <p>Every claimed WOTC represents a successful reentry/transition. We've facilitated <strong className="text-[#A8F32C]">{(platformStats.hired_faf_month.count + platformStats.hired_fav_month.count).toLocaleString()} hires</strong> this month alone.</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live Feed */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
            Live Platform Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between p-2 bg-green-500/10 rounded">
              <span className="text-green-400">🎉 Marcus J. (FAF) hired at ABC Logistics</span>
              <span className="text-white/60">-$2,400 WOTC claimed</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-blue-500/10 rounded">
              <span className="text-blue-400">📱 Sarah M. (FPF) created profile - releases 5/15/25</span>
              <span className="text-white/60">+$2,400 WOTC pipeline</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-green-500/10 rounded">
              <span className="text-green-400">🎉 James R. (FAV) hired at Security Solutions</span>
              <span className="text-white/60">-$9,600 WOTC claimed</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-[#A8F32C]/10 rounded">
              <span className="text-[#A8F32C]">✅ DeShawn W. (FPF → FAF) released today</span>
              <span className="text-white/60">+$2,400 WOTC available</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-[#FFD700]/10 rounded">
              <span className="text-[#FFD700]">✅ Jennifer L. (FPF → FAV) separated today</span>
              <span className="text-white/60">+$9,600 WOTC available</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
