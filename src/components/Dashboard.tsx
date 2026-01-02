import React from 'react';
import { TrendingUp, Users, DollarSign, Award, Clock, CheckCircle } from 'lucide-react';

interface DashboardProps {
  hasPremium: boolean;
  isDemoMode: boolean;
}

export function Dashboard({ hasPremium, isDemoMode }: DashboardProps) {
  const stats = [
    {
      label: 'Total WOTC Credits Earned',
      value: '$127,200',
      change: '+$28,800 this quarter',
      icon: DollarSign,
      color: '#A8F32C',
    },
    {
      label: 'Active Hires',
      value: '24',
      change: '+6 this month',
      icon: Users,
      color: '#FF8C42',
    },
    {
      label: 'Average Retention',
      value: '87%',
      change: '+12% vs industry avg',
      icon: TrendingUp,
      color: '#A8F32C',
    },
    {
      label: 'Pending WOTC Applications',
      value: '8',
      change: '$76,800 potential credits',
      icon: Clock,
      color: '#FF8C42',
    },
  ];

  const recentHires = [
    {
      name: 'Marcus Johnson',
      position: 'Warehouse Associate',
      hireDate: '2024-12-01',
      wotcAmount: '$9,600',
      source: 'Friend A Felon',
      status: 'WOTC Approved',
    },
    {
      name: 'DeShawn Williams',
      position: 'Forklift Operator',
      hireDate: '2024-11-28',
      wotcAmount: '$9,600',
      source: 'FairPath Forward',
      status: 'WOTC Pending',
    },
    {
      name: 'Terrence Brown',
      position: 'Production Worker',
      hireDate: '2024-11-25',
      wotcAmount: '$5,600',
      source: 'Friend A Felon',
      status: 'WOTC Approved',
    },
    {
      name: 'Anthony Davis',
      position: 'Maintenance Tech',
      hireDate: '2024-11-20',
      wotcAmount: '$9,600',
      source: 'FairPath Forward',
      status: 'WOTC Approved',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-[#A8F32C]/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${stat.color}20` }}
              >
                <stat.icon style={{ color: stat.color }} className="w-6 h-6" />
              </div>
            </div>
            <div className="text-3xl text-white mb-1">{stat.value}</div>
            <div className="text-white/60 text-sm mb-2">{stat.label}</div>
            <div className="text-[#A8F32C] text-sm">{stat.change}</div>
          </div>
        ))}
      </div>

      {/* How You're Winning */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Award className="w-6 h-6 text-[#A8F32C]" />
          <h2 className="text-white text-xl">How You&apos;re Winning</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="text-[#A8F32C] text-2xl">$5,300</div>
            <div className="text-white/60">Cost Per Hire</div>
            <div className="text-[#A8F32C] text-sm">67% below industry average</div>
          </div>
          
          <div className="space-y-2">
            <div className="text-[#A8F32C] text-2xl">$127,200</div>
            <div className="text-white/60">Tax Credits Earned YTD</div>
            <div className="text-[#A8F32C] text-sm">Net savings after hiring costs</div>
          </div>
          
          <div className="space-y-2">
            <div className="text-[#A8F32C] text-2xl">14 days</div>
            <div className="text-white/60">Average Time to Fill</div>
            <div className="text-[#A8F32C] text-sm">3x faster than traditional staffing</div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white">Your ROI: <span className="text-[#A8F32C]">342%</span></div>
              <div className="text-white/60 text-sm">For every $1 spent, you earn $3.42 back in tax credits</div>
            </div>
            {!hasPremium && (
              <button className="px-4 py-2 bg-[#A8F32C] text-black rounded-lg hover:bg-[#A8F32C]/90 transition-colors">
                Unlock More Insights
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Recent Hires */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-xl">Recent Hires</h2>
          <button className="text-[#A8F32C] hover:underline text-sm">
            View All Hires →
          </button>
        </div>

        <div className="space-y-4">
          {recentHires.map((hire, index) => (
            <div
              key={index}
              className="bg-black/50 border border-white/10 rounded-lg p-4 hover:border-[#A8F32C]/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-white">{hire.name}</div>
                    <span className="px-2 py-1 bg-[#A8F32C]/20 text-[#A8F32C] rounded text-xs">
                      {hire.source}
                    </span>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        hire.status === 'WOTC Approved'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}
                    >
                      {hire.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-white/60">
                    <span>{hire.position}</span>
                    <span>•</span>
                    <span>Hired {hire.hireDate}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[#A8F32C]">{hire.wotcAmount}</div>
                  <div className="text-white/60 text-sm">WOTC Credit</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Feed */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-2 h-2 bg-[#A8F32C] rounded-full animate-pulse"></div>
          <h2 className="text-white text-xl">Live Talent Feed</h2>
          <span className="text-white/60 text-sm">Auto-updating in real time</span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <CheckCircle className="w-4 h-4 text-[#A8F32C]" />
            <span className="text-white/60">2 minutes ago:</span>
            <span className="text-white">New candidate from Friend A Felon - Warehouse experience</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <CheckCircle className="w-4 h-4 text-[#A8F32C]" />
            <span className="text-white/60">8 minutes ago:</span>
            <span className="text-white">Release alert: 3 candidates available next week from FairPath Forward</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <CheckCircle className="w-4 h-4 text-[#A8F32C]" />
            <span className="text-white/60">15 minutes ago:</span>
            <span className="text-white">WOTC application approved for Marcus Johnson - $9,600 credited</span>
          </div>
        </div>
      </div>
    </div>
  );
}