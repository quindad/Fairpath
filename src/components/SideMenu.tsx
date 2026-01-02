import { X, Info, Briefcase, Award, Mail, DollarSign, Share2, FileText } from 'lucide-react';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SideMenu({ isOpen, onClose }: SideMenuProps) {
  const menuItems = [
    { icon: Info, label: 'About', action: () => {} },
    { icon: Briefcase, label: 'Our Services', action: () => {} },
    { icon: Award, label: 'Felon of the Week', action: () => {} },
    { icon: Mail, label: 'Contact', action: () => {} },
    { icon: DollarSign, label: 'Donate', action: () => {} },
    { icon: Share2, label: 'Share App', action: () => {} },
    { icon: FileText, label: 'Terms of Use', action: () => {} },
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-40"
        onClick={onClose}
      />

      {/* Menu */}
      <div className="fixed top-0 left-0 bottom-0 w-80 bg-[#121212] z-50 border-r border-[#8CFF1A]/20">
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl">FRIEND A FELON</h2>
            <button onClick={onClose} className="p-2">
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  item.action();
                  onClose();
                }}
                className="w-full flex items-center gap-4 p-4 rounded-lg hover:bg-white/5 transition-colors"
              >
                <item.icon className="h-5 w-5 text-[#8CFF1A]" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
