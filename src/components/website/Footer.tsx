import { Mail, Phone } from 'lucide-react';
import { FairPathLogoHorizontal } from '../common/FairPathLogo';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/10 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <FairPathLogoHorizontal height={40} variant="light" />
            <p className="text-white/60 mt-4 mb-6">
              Breaking barriers and building futures through technology that gives everyone a second chance.
            </p>
            <div className="space-y-2 text-sm">
              <a href="mailto:contact@fairpath.com" className="flex items-center gap-2 text-white/60 hover:text-[#A8F32C] transition-colors">
                <Mail className="h-4 w-4" />
                contact@fairpath.com
              </a>
              <a href="tel:+18005551234" className="flex items-center gap-2 text-white/60 hover:text-[#A8F32C] transition-colors">
                <Phone className="h-4 w-4" />
                1-800-555-1234
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Platforms</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => onNavigate('service-forward')} className="text-white/60 hover:text-[#A8F32C] transition-colors">
                  FairPath Forward
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('service-staffing')} className="text-white/60 hover:text-[#A8F32C] transition-colors">
                  FairPath Staffing
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('service-simulations')} className="text-white/60 hover:text-[#A8F32C] transition-colors">
                  FairPath Simulations
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('service-legal')} className="text-white/60 hover:text-[#A8F32C] transition-colors">
                  FairPath Legal
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('architecture')} className="text-white/60 hover:text-[#A8F32C] transition-colors">
                  System Architecture
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => onNavigate('blog')} className="text-white/60 hover:text-[#A8F32C] transition-colors">
                  Blog
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('donate')} className="text-white/60 hover:text-[#A8F32C] transition-colors">
                  Donate
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="text-white/60 hover:text-[#A8F32C] transition-colors">
                  Contact
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('signup')} className="text-white/60 hover:text-[#A8F32C] transition-colors">
                  Get Started
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/50">
            © {currentYear} FairPath Industries. All rights reserved.
          </p>
          <p className="text-sm text-white/50">
            501(c)(3) Nonprofit Organization
          </p>
        </div>
      </div>
    </footer>
  );
}