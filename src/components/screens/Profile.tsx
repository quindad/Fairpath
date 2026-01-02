import { User, Settings, LogOut } from 'lucide-react';
import { Button } from '../ui/button';

interface ProfileProps {
  onLogout: () => void;
  userType: 'user' | 'donor';
}

export default function Profile({ onLogout, userType }: ProfileProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="text-xs tracking-widest text-[#A8F32C]">
            PROFILE
          </div>
          <button className="p-2 hover:bg-white/5 rounded-xl transition-colors">
            <Settings className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-20 h-20 bg-[#A8F32C]/10 rounded-full border-2 border-[#A8F32C]/20 flex items-center justify-center">
            <User className="h-10 w-10 text-[#A8F32C]" />
          </div>
          <div>
            <h1 className="text-2xl mb-1">Sterling Thompson</h1>
            <p className="text-white/60">@sterling_t</p>
          </div>
        </div>

        <div className="space-y-3 mb-8">
          <div className="bg-[#121212] rounded-xl p-4 border border-white/5">
            <div className="text-sm text-white/60 mb-1">FastTrack Status</div>
            <div className="text-xl">72% Complete</div>
          </div>
          <div className="bg-[#121212] rounded-xl p-4 border border-white/5">
            <div className="text-sm text-white/60 mb-1">Trust Score</div>
            <div className="text-xl text-[#A8F32C]">4.5 ⭐</div>
          </div>
        </div>

        <Button
          onClick={onLogout}
          variant="outline"
          className="w-full border-red-500/20 text-red-500 hover:bg-red-500/10"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
}
