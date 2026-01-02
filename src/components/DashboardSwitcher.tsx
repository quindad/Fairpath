import { Button } from './ui/button';
import { Briefcase, Home, Users, ArrowLeft } from 'lucide-react';

interface DashboardSwitcherProps {
  currentView: 'employer' | 'property' | 'user';
  onSwitch: (view: 'employer' | 'property' | 'user') => void;
}

export default function DashboardSwitcher({ currentView, onSwitch }: DashboardSwitcherProps) {
  return (
    <div className="fixed bottom-6 right-6 bg-[#121212] border border-white/10 rounded-xl p-3 shadow-2xl z-50">
      <div className="text-xs text-white/40 mb-2 px-2">Demo Switcher</div>
      <div className="flex flex-col gap-2">
        <Button
          size="sm"
          onClick={() => onSwitch('user')}
          className={`justify-start ${
            currentView === 'user'
              ? 'bg-[#A8F32C] text-black'
              : 'bg-white/5 text-white hover:bg-white/10'
          }`}
        >
          <Users className="h-4 w-4 mr-2" />
          User View
        </Button>
        <Button
          size="sm"
          onClick={() => onSwitch('employer')}
          className={`justify-start ${
            currentView === 'employer'
              ? 'bg-[#A8F32C] text-black'
              : 'bg-white/5 text-white hover:bg-white/10'
          }`}
        >
          <Briefcase className="h-4 w-4 mr-2" />
          Employer Dashboard
        </Button>
        <Button
          size="sm"
          onClick={() => onSwitch('property')}
          className={`justify-start ${
            currentView === 'property'
              ? 'bg-[#A8F32C] text-black'
              : 'bg-white/5 text-white hover:bg-white/10'
          }`}
        >
          <Home className="h-4 w-4 mr-2" />
          Property Dashboard
        </Button>
      </div>
    </div>
  );
}
