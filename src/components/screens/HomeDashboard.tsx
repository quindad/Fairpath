import { Zap, TrendingUp, Clock, CheckCircle, Building2, Briefcase, Gift, BookOpen, ArrowRight, DollarSign, Shield } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { UserProfile } from '../ProfileSetupWizard';

interface HomeDashboardProps {
  onNavigate: (screen: any) => void;
  userProfile?: UserProfile | null;
  isSubscriber?: boolean;
}

export default function HomeDashboard({ onNavigate, userProfile = null, isSubscriber = false }: HomeDashboardProps) {
  const fastTrackFee = isSubscriber ? 65 : 75;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-[#A8F32C]/5 via-transparent to-transparent" />
        <div className="relative px-6 pt-8 pb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-2 w-2 rounded-full bg-[#A8F32C] animate-pulse" />
            <span className="text-xs tracking-widest text-[#A8F32C]">WELCOME BACK</span>
          </div>
          
          <h1 className="text-4xl mb-2">
            Hello,
          </h1>
          <h2 className="text-4xl mb-6 text-white/40">
            Sterling
          </h2>

          <p className="text-white/60">
            You have <span className="text-[#A8F32C]">3 new opportunities</span> waiting
          </p>
        </div>
      </div>

      {/* FastTrack Status */}
      <div className="px-6 py-6 border-b border-white/5">
        <div className="bg-gradient-to-br from-[#A8F32C]/10 via-transparent to-transparent rounded-2xl p-5 border border-[#A8F32C]/20">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-5 w-5 text-[#A8F32C]" />
                <span className="text-sm text-[#A8F32C]">FastTrack Application</span>
              </div>
              <h3 className="text-xl mb-1">Complete Your Profile</h3>
              <p className="text-sm text-white/60">
                Get instant access to {fastTrackFee === 65 ? '$65' : '$75'} applications
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl text-[#A8F32C]">72%</div>
              <div className="text-xs text-white/60">Complete</div>
            </div>
          </div>
          
          <div className="h-1.5 bg-black/50 rounded-full overflow-hidden mb-4">
            <div className="h-full bg-[#A8F32C]" style={{ width: '72%' }} />
          </div>
          
          <Button 
            size="sm"
            className="w-full bg-white text-black hover:bg-white/90"
          >
            Continue Setup
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Subscription Banner */}
      {!isSubscriber && (
        <div className="px-6 py-4 border-b border-white/5">
          <div className="bg-[#121212] rounded-2xl p-4 border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#A8F32C]/10 rounded-full flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-[#A8F32C]" />
              </div>
              <div>
                <div className="text-sm mb-1">Save $10 per application</div>
                <div className="text-xs text-white/60">Join FairPath+ for $2/month</div>
              </div>
            </div>
            <Button size="sm" className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90" onClick={() => onNavigate('subscription')}>
              Upgrade
            </Button>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="px-6 py-6 border-b border-white/5">
        <h3 className="text-lg mb-4 flex items-center gap-2">
          <span>Quick</span>
          <span className="text-white/40">Access</span>
        </h3>

        <div className="grid grid-cols-2 gap-3">
          <QuickActionCard
            icon={Building2}
            label="Housing"
            badge="234 listings"
            onClick={() => onNavigate('housing')}
          />
          <QuickActionCard
            icon={Briefcase}
            label="Jobs"
            badge="847 openings"
            onClick={() => onNavigate('jobs')}
          />
          <QuickActionCard
            icon={Gift}
            label="Free Items"
            badge="156 available"
            onClick={() => onNavigate('marketplace')}
          />
          <QuickActionCard
            icon={BookOpen}
            label="Resources"
            badge="Connect"
            onClick={() => onNavigate('resources')}
          />
        </div>
      </div>

      {/* Application Status */}
      <div className="px-6 py-6 border-b border-white/5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg">Your Applications</h3>
          <button className="text-sm text-[#A8F32C]" onClick={() => onNavigate('applications')}>View All</button>
        </div>

        <div className="space-y-3">
          <ApplicationStatusCard
            title="East 55th Apartments"
            type="Housing"
            status="showing-pending"
            date="Applied 2 days ago"
          />
          <ApplicationStatusCard
            title="Warehouse Associate"
            type="Job"
            status="under-review"
            date="Applied 5 days ago"
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg flex items-center gap-2">
            <Clock className="h-5 w-5 text-[#A8F32C]" />
            Recent Activity
          </h3>
        </div>

        <div className="space-y-3">
          <ActivityItem
            icon="✅"
            title="Application submitted"
            subtitle="East 55th Apartments • Cleveland, OH"
            time="2 days ago"
          />
          <ActivityItem
            icon="💾"
            title="Listing saved"
            subtitle="Construction Worker • Alaska Builders"
            time="4 days ago"
          />
          <ActivityItem
            icon="📋"
            title="Profile updated"
            subtitle="FastTrack profile 72% complete"
            time="1 week ago"
          />
        </div>
      </div>
    </div>
  );
}

function QuickActionCard({ icon: Icon, label, badge, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="bg-[#121212] rounded-2xl p-5 border border-white/5 hover:border-[#A8F32C]/40 transition-all text-left group"
    >
      <div className="w-12 h-12 bg-black rounded-xl border border-[#A8F32C]/10 flex items-center justify-center mb-3 group-hover:bg-[#A8F32C]/5 transition-colors">
        <Icon className="h-6 w-6 text-[#A8F32C]" strokeWidth={1.5} />
      </div>
      <h4 className="mb-1 group-hover:text-[#A8F32C] transition-colors">{label}</h4>
      <p className="text-xs text-white/60">{badge}</p>
    </button>
  );
}

function ApplicationStatusCard({ title, type, status, date }: any) {
  const statusConfig = {
    'showing-pending': {
      icon: Clock,
      label: 'Showing Pending',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/20',
    },
    'under-review': {
      icon: TrendingUp,
      label: 'Under Review',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
    },
    'approved': {
      icon: CheckCircle,
      label: 'Approved',
      color: 'text-[#A8F32C]',
      bgColor: 'bg-[#A8F32C]/10',
      borderColor: 'border-[#A8F32C]/20',
    },
  };

  const config = statusConfig[status as keyof typeof statusConfig];
  const StatusIcon = config.icon;

  return (
    <div className="bg-[#121212] rounded-2xl p-4 border border-white/5">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="mb-1">{title}</h4>
          <p className="text-sm text-white/60">{type}</p>
        </div>
        <Badge 
          variant="outline"
          className={`${config.borderColor} ${config.color} text-xs`}
        >
          <StatusIcon className="h-3 w-3 mr-1" />
          {config.label}
        </Badge>
      </div>
      <div className="text-xs text-white/40">{date}</div>
    </div>
  );
}

function ActivityItem({ icon, title, subtitle, time }: any) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-2xl">{icon}</div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm mb-1">{title}</h4>
        <p className="text-xs text-white/60">{subtitle}</p>
      </div>
      <span className="text-xs text-white/40">{time}</span>
    </div>
  );
}