import { X, Info, HelpCircle, FileText, Settings, Share2, LogOut } from 'lucide-react';

interface AppMenuProps {
  isOpen: boolean;
  onClose: () => void;
  userType?: 'user' | 'donor';
}

export default function AppMenu({ isOpen, onClose, userType = 'user' }: AppMenuProps) {
  const menuItems = [
    { icon: Info, label: 'About Friend A Felon', action: () => {} },
    { icon: HelpCircle, label: 'How It Works', action: () => {} },
    { icon: FileText, label: 'Terms & Privacy', action: () => {} },
    { icon: Settings, label: 'Settings', action: () => {} },
    { icon: Share2, label: 'Share App', action: () => {} },
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Menu */}
      <div className="fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-[#121212] z-50 border-r border-[#A8F32C]/10">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-white/5">
            <div className="flex items-center justify-between mb-4">
              <div className="text-xs tracking-wider text-[#A8F32C]">
                FRIEND A FELON
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="text-sm text-white/60">
              Reentry, Reinvented
            </div>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 p-4 space-y-1">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  item.action();
                  onClose();
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors text-left"
              >
                <item.icon className="h-5 w-5 text-[#A8F32C]" strokeWidth={1.5} />
                <span className="text-sm">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-white/5">
            <button
              onClick={() => {
                onClose();
                // Logout will be handled by parent
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500/10 transition-colors text-left text-red-500"
            >
              <LogOut className="h-5 w-5" strokeWidth={1.5} />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}