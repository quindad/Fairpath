import Navigation from './Navigation';
import Footer from './Footer';
import WOTCPlatformValue from '../platform/WOTCPlatformValue';
import { Badge } from '../ui/badge';

interface PlatformValuePageProps {
  onNavigate: (page: string) => void;
}

export default function PlatformValuePage({ onNavigate }: PlatformValuePageProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation onNavigate={onNavigate} currentPage="platform-value" />

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
              Live Platform Economics
            </Badge>
            <h1 className="text-6xl font-bold mb-6">
              The <span className="text-yellow-400">Real Value</span> of FairPath
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
              Every user on our platform represents federal tax credits for employers. This is the live calculation 
              of total WOTC value across FairPath Forward (tablets), Friend A Felon, and Friend A Veteran.
            </p>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              <strong className="text-[#A8F32C]">How it works:</strong> Users create profiles on FPF tablets while in facilities. 
              Upon release/separation, profiles auto-convert to FAF/FAV and WOTC value becomes available. 
              When hired, credits are claimed and value decreases - proving platform impact.
            </p>
          </div>

          <WOTCPlatformValue />
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
