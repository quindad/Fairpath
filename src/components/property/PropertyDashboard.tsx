import { Building2, LogOut } from 'lucide-react';
import { Button } from '../ui/button';

interface PropertyDashboardProps {
  onLogout: () => void;
}

export default function PropertyDashboard({ onLogout }: PropertyDashboardProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="p-6 border-b border-white/5">
        <div className="text-xs tracking-[0.3em] text-[#A8F32C] mb-2">
          ADMIN A FELON
        </div>
        <h1 className="text-3xl">Property Owner Dashboard</h1>
      </div>

      <div className="p-6">
        <div className="text-center py-12">
          <Building2 className="h-16 w-16 text-white/20 mx-auto mb-4" />
          <p className="text-white/60 mb-6">Property dashboard coming soon...</p>
          <Button
            onClick={onLogout}
            variant="outline"
            className="border-red-500/20 text-red-500 hover:bg-red-500/10"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
