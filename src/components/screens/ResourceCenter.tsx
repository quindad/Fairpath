import { BookOpen } from 'lucide-react';

export default function ResourceCenter() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="p-6">
        <div className="text-xs tracking-widest text-[#A8F32C] mb-2">
          RESOURCE CENTER
        </div>
        <h1 className="text-3xl mb-6">Reentry Resources</h1>

        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-white/20 mx-auto mb-4" />
          <p className="text-white/60">Resource center coming soon...</p>
        </div>
      </div>
    </div>
  );
}
