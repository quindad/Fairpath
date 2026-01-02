import { LogIn, UserPlus, Menu } from 'lucide-react';
import { Button } from '../ui/button';
import { FairPathLogoHorizontal } from '../common/FairPathLogo';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '../ui/dropdown-menu';

interface NavigationProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export default function Navigation({ onNavigate, currentPage }: NavigationProps) {
  const isActive = (page: string) => currentPage === page;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-[1600px] mx-auto px-6 py-3">
        <div className="flex items-center justify-between gap-8">
          <button onClick={() => onNavigate('home')} className="hover:opacity-80 transition-opacity flex-shrink-0">
            <FairPathLogoHorizontal height={32} variant="light" />
          </button>

          <div className="flex items-center gap-6 flex-1 justify-center">
            <button
              onClick={() => onNavigate('home')}
              className={`transition-colors text-sm whitespace-nowrap ${
                isActive('home') ? 'text-[#A8F32C]' : 'text-white/80 hover:text-white'
              }`}
            >
              Home
            </button>
            
            {/* Services Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="text-sm whitespace-nowrap text-white/80 hover:text-white transition-colors outline-none">
                Services ▾
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black border-white/20 text-white">
                <DropdownMenuItem 
                  onClick={() => onNavigate('service-friend-a-felon')}
                  className="hover:bg-white/10 cursor-pointer"
                >
                  Friend A Felon
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onNavigate('service-veterans')}
                  className="hover:bg-white/10 cursor-pointer"
                >
                  Friend A Veteran <span className="ml-2 bg-gradient-to-r from-[#0A1F44] via-[#DC143C] to-white text-white text-xs px-1.5 py-0.5 rounded font-bold">NEW 🇺🇸</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onNavigate('service-forward')}
                  className="hover:bg-white/10 cursor-pointer"
                >
                  FairPath Forward <span className="ml-2 bg-[#A8F32C] text-black text-xs px-1.5 py-0.5 rounded">NEW</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onNavigate('service-staffing')}
                  className="hover:bg-white/10 cursor-pointer"
                >
                  FairPath Staffing <span className="ml-2 bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded">NEW</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onNavigate('service-police')}
                  className="hover:bg-white/10 cursor-pointer"
                >
                  Police The Police™ <span className="ml-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded">APP</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onNavigate('service-employers')}
                  className="hover:bg-white/10 cursor-pointer"
                >
                  Employer Listings (Self-Service)
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onNavigate('service-properties')}
                  className="hover:bg-white/10 cursor-pointer"
                >
                  Property Owners
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onNavigate('service-simulations')}
                  className="hover:bg-white/10 cursor-pointer"
                >
                  FairPath Simulations
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onNavigate('service-legal')}
                  className="hover:bg-white/10 cursor-pointer"
                >
                  FairPath Legal
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem 
                  onClick={() => onNavigate('architecture')}
                  className="hover:bg-white/10 cursor-pointer text-white/60"
                >
                  System Architecture
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <button
              onClick={() => onNavigate('blog')}
              className={`transition-colors text-sm whitespace-nowrap ${
                isActive('blog') ? 'text-[#A8F32C]' : 'text-white/80 hover:text-white'
              }`}
            >
              Blog
            </button>
            <button
              onClick={() => onNavigate('donate')}
              className={`transition-colors text-sm whitespace-nowrap ${
                isActive('donate') ? 'text-[#A8F32C]' : 'text-white/80 hover:text-white'
              }`}
            >
              Donate
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className={`transition-colors text-sm whitespace-nowrap ${
                isActive('contact') ? 'text-[#A8F32C]' : 'text-white/80 hover:text-white'
              }`}
            >
              Contact
            </button>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Portal Access Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 px-3 text-white border border-white/20 hover:bg-white/10 hover:text-[#A8F32C]">
                <Menu className="mr-2 h-4 w-4" />
                Portals
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black border-white/20 text-white">
                <DropdownMenuItem 
                  onClick={() => onNavigate('crm-hub')}
                  className="hover:bg-white/10 cursor-pointer font-bold text-[#A8F32C]"
                >
                  🏢 View All CRM Portals
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem 
                  onClick={() => onNavigate('staffing-crm')}
                  className="hover:bg-white/10 cursor-pointer"
                >
                  <span className="text-[#FF8C42] mr-2">●</span>
                  FairPath Staffing CRM
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onNavigate('employer-portal')}
                  className="hover:bg-white/10 cursor-pointer"
                >
                  <span className="text-[#3B82F6] mr-2">●</span>
                  Employer CRM
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onNavigate('property-portal')}
                  className="hover:bg-white/10 cursor-pointer"
                >
                  <span className="text-[#10B981] mr-2">●</span>
                  Property Owner CRM
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onNavigate('resource-portal')}
                  className="hover:bg-white/10 cursor-pointer"
                >
                  <span className="text-[#A855F7] mr-2">●</span>
                  Resource Partner CRM
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:text-[#A8F32C]"
              onClick={() => onNavigate('login')}
            >
              <LogIn className="mr-2 h-4 w-4" />
              Log In
            </Button>
            <Button
              size="sm"
              className="bg-[#A8F32C] text-black hover:bg-[#8CD423]"
              onClick={() => onNavigate('signup')}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}