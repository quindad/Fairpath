import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { User, Briefcase, Home, Heart, ShoppingBag } from 'lucide-react';
import LogoFinal from '../common/LogoFinal';
import { defaultUsers } from '../../data/mockData';

interface QuickLoginProps {
  onLogin: (userType: 'felon' | 'employer' | 'landlord' | 'donor' | 'customer' | 'staffing', userData: any) => void;
}

export default function QuickLogin({ onLogin }: QuickLoginProps) {
  const userTypes = [
    {
      type: 'felon' as const,
      icon: User,
      title: 'Justice-Impacted Individual',
      subtitle: 'Find housing, jobs & resources',
      color: 'from-[#A8F32C]/20',
      borderColor: 'border-[#A8F32C]/30',
      iconColor: 'text-[#A8F32C]',
      user: defaultUsers.felon
    },
    {
      type: 'employer' as const,
      icon: Briefcase,
      title: 'Employer',
      subtitle: 'Hire second-chance talent',
      color: 'from-blue-500/20',
      borderColor: 'border-blue-500/30',
      iconColor: 'text-blue-400',
      user: defaultUsers.employer
    },
    {
      type: 'landlord' as const,
      icon: Home,
      title: 'Property Owner',
      subtitle: 'Rent to qualified applicants',
      color: 'from-purple-500/20',
      borderColor: 'border-purple-500/30',
      iconColor: 'text-purple-400',
      user: defaultUsers.landlord
    },
    {
      type: 'donor' as const,
      icon: Heart,
      title: 'Community Donor',
      subtitle: 'Give items to those in need',
      color: 'from-pink-500/20',
      borderColor: 'border-pink-500/30',
      iconColor: 'text-pink-400',
      user: defaultUsers.donor
    },
    {
      type: 'customer' as const,
      icon: ShoppingBag,
      title: 'Service Customer',
      subtitle: 'Book gig services',
      color: 'from-yellow-500/20',
      borderColor: 'border-yellow-500/30',
      iconColor: 'text-yellow-400',
      user: defaultUsers.customer
    },
    {
      type: 'staffing' as const,
      icon: Briefcase,
      title: 'Staffing Agency',
      subtitle: 'Place second-chance talent',
      color: 'from-green-500/20',
      borderColor: 'border-green-500/30',
      iconColor: 'text-green-400',
      user: defaultUsers.staffing
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <LogoFinal size="lg" />
          </div>
          <h1 className="text-5xl mb-4 text-white">Quick Demo Login</h1>
          <p className="text-xl text-white/60">
            Choose a user type to explore the platform
          </p>
          <div className="mt-4 text-sm text-white/40">
            Demo Mode - All data is simulated for testing
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {userTypes.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.type}
                className={`bg-gradient-to-br ${item.color} to-transparent ${item.borderColor} p-6 cursor-pointer hover:scale-105 transition-all`}
                onClick={() => onLogin(item.type, item.user)}
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`w-16 h-16 rounded-full bg-black/50 flex items-center justify-center mb-4`}>
                    <Icon className={`h-8 w-8 ${item.iconColor}`} />
                  </div>
                  <h3 className="text-xl mb-2 text-white">{item.title}</h3>
                  <p className="text-sm text-white/60 mb-4">{item.subtitle}</p>
                  
                  <div className="w-full bg-black/50 border border-white/10 rounded-lg p-3 mb-4">
                    <div className="text-xs text-white/60 mb-1">Demo Account:</div>
                    <div className="text-sm text-white">{item.user.email}</div>
                  </div>

                  <Button className={`w-full bg-gradient-to-r ${item.color} border ${item.borderColor} hover:scale-105 transition-all`}>
                    Login as {item.title.split(' ')[0]}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Card className="bg-[#121212] border-white/10 p-6 inline-block">
            <h3 className="text-lg mb-2 text-white">Need a Real Account?</h3>
            <p className="text-white/60 text-sm mb-4">
              For production use, you'll go through the full onboarding flow
            </p>
            <Button variant="outline" className="border-white/20 text-white">
              Create New Account
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}