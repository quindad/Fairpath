import React, { useState } from 'react';
import { Calendar, MapPin, CheckCircle, Send, Eye, Clock, AlertCircle } from 'lucide-react';

interface ReleaseAlertsProps {
  onSelectCandidate: (candidate: any) => void;
  isDemoMode: boolean;
}

export function ReleaseAlerts({ onSelectCandidate, isDemoMode }: ReleaseAlertsProps) {
  const [filter, setFilter] = useState<'all' | 'this-week' | 'next-week' | 'this-month'>('all');

  const alerts = [
    {
      id: 1,
      name: 'Kevin Washington',
      location: 'Los Angeles, CA',
      releaseDate: '2024-12-15',
      daysUntilRelease: 10,
      skills: ['CDL Class A', 'Clean MVR', '3 years exp'],
      wotcAmount: '$9,600',
      source: 'FairPath Forward',
      priority: 'high',
      matchScore: 95,
      recommended: true,
      status: 'New Alert',
    },
    {
      id: 2,
      name: 'Darius Jackson',
      location: 'Los Angeles, CA',
      releaseDate: '2024-12-10',
      daysUntilRelease: 5,
      skills: ['Welding', 'Fabrication', '4 years exp'],
      wotcAmount: '$9,600',
      source: 'FairPath Forward',
      priority: 'high',
      matchScore: 92,
      recommended: true,
      status: 'Action Required',
    },
    {
      id: 3,
      name: 'Andre Thompson',
      location: 'Los Angeles, CA',
      releaseDate: '2024-12-20',
      daysUntilRelease: 15,
      skills: ['HVAC Certified', 'Maintenance', '6 years exp'],
      wotcAmount: '$9,600',
      source: 'FairPath Forward',
      priority: 'medium',
      matchScore: 88,
      recommended: true,
      status: 'New Alert',
    },
    {
      id: 4,
      name: 'Jamal Mitchell',
      location: 'Los Angeles, CA',
      releaseDate: '2024-12-08',
      daysUntilRelease: 3,
      skills: ['Electrician', 'Journeyman License', '8 years exp'],
      wotcAmount: '$9,600',
      source: 'FairPath Forward',
      priority: 'urgent',
      matchScore: 97,
      recommended: true,
      status: 'Urgent - Act Now',
    },
    {
      id: 5,
      name: 'Tyrone Harris',
      location: 'Los Angeles, CA',
      releaseDate: '2024-12-18',
      daysUntilRelease: 13,
      skills: ['Machinist', 'CNC Operator', '5 years exp'],
      wotcAmount: '$9,600',
      source: 'FairPath Forward',
      priority: 'medium',
      matchScore: 85,
      recommended: false,
      status: 'New Alert',
    },
    {
      id: 6,
      name: 'Eric Johnson',
      location: 'Los Angeles, CA',
      releaseDate: '2024-12-12',
      daysUntilRelease: 7,
      skills: ['Plumbing', 'Licensed Plumber', '7 years exp'],
      wotcAmount: '$9,600',
      source: 'FairPath Forward',
      priority: 'high',
      matchScore: 90,
      recommended: true,
      status: 'New Alert',
    },
    {
      id: 7,
      name: 'Marcus Brown',
      location: 'Los Angeles, CA',
      releaseDate: '2024-12-25',
      daysUntilRelease: 20,
      skills: ['Carpentry', 'Finish Work', '6 years exp'],
      wotcAmount: '$9,600',
      source: 'FairPath Forward',
      priority: 'medium',
      matchScore: 82,
      recommended: false,
      status: 'New Alert',
    },
    {
      id: 8,
      name: 'William Davis',
      location: 'Los Angeles, CA',
      releaseDate: '2024-12-22',
      daysUntilRelease: 17,
      skills: ['Auto Mechanic', 'ASE Certified', '9 years exp'],
      wotcAmount: '$9,600',
      source: 'FairPath Forward',
      priority: 'medium',
      matchScore: 87,
      recommended: true,
      status: 'New Alert',
    },
  ];

  const filteredAlerts = alerts.filter((alert) => {
    if (filter === 'this-week') return alert.daysUntilRelease <= 7;
    if (filter === 'next-week') return alert.daysUntilRelease > 7 && alert.daysUntilRelease <= 14;
    if (filter === 'this-month') return alert.daysUntilRelease <= 30;
    return true;
  });

  const urgentCount = alerts.filter(a => a.priority === 'urgent').length;
  const recommendedCount = alerts.filter(a => a.recommended).length;

  const sendAutoOffer = (alert: any) => {
    alert('Automated job offer sent to ' + alert.name + '!\n\nOffer includes:\n- Job details\n- Start date aligned with release\n- WOTC tax credit benefits\n- Reentry support services');
  };

  const sendAutoInterview = (alert: any) => {
    alert('Automated interview invitation sent to ' + alert.name + '!\n\nScheduled for 2 days post-release with automated follow-up reminders.');
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="text-2xl text-white mb-1">{alerts.length}</div>
          <div className="text-white/60 text-sm">Upcoming Releases</div>
        </div>
        
        <div className="bg-white/5 border border-red-500/20 rounded-xl p-4">
          <div className="text-2xl text-red-500 mb-1">{urgentCount}</div>
          <div className="text-white/60 text-sm">Urgent - Within 3 Days</div>
        </div>
        
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="text-2xl text-[#A8F32C] mb-1">{recommendedCount}</div>
          <div className="text-white/60 text-sm">AI Recommended Matches</div>
        </div>
        
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="text-2xl text-white mb-1">
            ${(alerts.length * 9600).toLocaleString()}
          </div>
          <div className="text-white/60 text-sm">Total WOTC Potential</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <div className="flex items-center gap-3">
          <span className="text-white">Filter by Release Date:</span>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'all'
                  ? 'bg-[#A8F32C] text-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('this-week')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'this-week'
                  ? 'bg-[#A8F32C] text-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              This Week
            </button>
            <button
              onClick={() => setFilter('next-week')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'next-week'
                  ? 'bg-[#A8F32C] text-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Next Week
            </button>
            <button
              onClick={() => setFilter('this-month')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'this-month'
                  ? 'bg-[#A8F32C] text-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              This Month
            </button>
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => {
          const getPriorityColor = () => {
            if (alert.priority === 'urgent') return 'border-red-500/50 bg-red-500/5';
            if (alert.priority === 'high') return 'border-[#FF8C42]/50 bg-[#FF8C42]/5';
            return 'border-white/10 bg-white/5';
          };

          const getStatusBadge = () => {
            if (alert.priority === 'urgent')
              return (
                <span className="px-3 py-1 bg-red-500/20 text-red-500 rounded-full text-sm flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {alert.status}
                </span>
              );
            if (alert.status === 'Action Required')
              return (
                <span className="px-3 py-1 bg-yellow-500/20 text-yellow-500 rounded-full text-sm">
                  {alert.status}
                </span>
              );
            return (
              <span className="px-3 py-1 bg-[#A8F32C]/20 text-[#A8F32C] rounded-full text-sm">
                {alert.status}
              </span>
            );
          };

          return (
            <div
              key={alert.id}
              className={`border rounded-xl p-6 ${getPriorityColor()}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-white text-xl">{alert.name}</h3>
                    {getStatusBadge()}
                    {alert.recommended && (
                      <span className="px-3 py-1 bg-[#A8F32C]/20 text-[#A8F32C] rounded-full text-sm flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" />
                        AI Match {alert.matchScore}%
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-white/60 mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{alert.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Releases {alert.releaseDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span className={alert.daysUntilRelease <= 7 ? 'text-red-500' : ''}>
                        {alert.daysUntilRelease} days away
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {alert.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-[#A8F32C]/20 text-[#A8F32C] rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-right ml-6">
                  <div className="text-[#A8F32C] text-2xl mb-1">{alert.wotcAmount}</div>
                  <div className="text-white/60 text-sm">WOTC Credit</div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <button
                  onClick={() => sendAutoOffer(alert)}
                  className="flex-1 px-4 py-2 bg-[#A8F32C] text-black rounded-lg hover:bg-[#A8F32C]/90 transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Auto-Send Job Offer
                </button>

                <button
                  onClick={() => sendAutoInterview(alert)}
                  className="flex-1 px-4 py-2 bg-[#FF8C42] text-black rounded-lg hover:bg-[#FF8C42]/90 transition-colors flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  Auto-Schedule Interview
                </button>

                <button
                  onClick={() => onSelectCandidate(alert)}
                  className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
              </div>

              {alert.recommended && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="text-white/60 text-sm">
                    <span className="text-[#A8F32C]">AI Recommendation:</span> This candidate matches your hiring criteria based on skills, WOTC eligibility, and past successful hires. Sending an early offer increases acceptance rate by 45%.
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredAlerts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-white/60">No release alerts match your filter</p>
        </div>
      )}
    </div>
  );
}