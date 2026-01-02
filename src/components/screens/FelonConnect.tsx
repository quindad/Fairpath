import { MessageCircle } from 'lucide-react';

export default function FelonConnect() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="p-6">
        <div className="text-xs tracking-widest text-[#A8F32C] mb-2">
          COMMUNITY
        </div>
        <h1 className="text-3xl mb-6">Felon Connect</h1>

        <div className="text-center py-12">
          <MessageCircle className="h-16 w-16 text-white/20 mx-auto mb-4" />
          <p className="text-white/60">Community forum coming soon...</p>
        </div>
      </div>
    </div>
  );
}
