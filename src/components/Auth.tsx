import { useState } from 'react';
import { ArrowRight, Mail, Lock, User, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';
import Logo from './Logo';

interface AuthProps {
  onComplete: (needsProfileSetup: boolean) => void;
}

export default function Auth({ onComplete }: AuthProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLogin && !agreedToTerms) {
      alert('Please agree to the terms and privacy policy');
      return;
    }
    
    // If signing up, they need profile setup
    // If logging in, assume they already have a profile (for now)
    onComplete(!isLogin);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-white/5 flex justify-center">
        <Logo size="md" showText={false} variant="compact" />
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <h1 className="text-4xl mb-3">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-white/60">
              {isLogin 
                ? 'Sign in to access your FastTrack applications and more'
                : 'Start your journey toward housing, employment, and community'
              }
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="space-y-4">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                  <Input
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="pl-12 h-14 bg-[#121212] border-white/10 text-white placeholder:text-white/40"
                    required
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                  <Input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="pl-12 h-14 bg-[#121212] border-white/10 text-white placeholder:text-white/40"
                    required
                  />
                </div>
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
              <Input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="pl-12 h-14 bg-[#121212] border-white/10 text-white placeholder:text-white/40"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
              <Input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="pl-12 h-14 bg-[#121212] border-white/10 text-white placeholder:text-white/40"
                required
              />
            </div>

            {!isLogin && (
              <div className="flex items-start gap-3 py-2">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                  className="mt-1 border-white/20 data-[state=checked]:bg-[#A8F32C] data-[state=checked]:border-[#A8F32C]"
                />
                <label htmlFor="terms" className="text-sm text-white/60 leading-relaxed">
                  I agree to the <span className="text-[#A8F32C]">Terms of Service</span> and{' '}
                  <span className="text-[#A8F32C]">Privacy Policy</span>, including authorization for background screening as part of FastTrack applications.
                </label>
              </div>
            )}

            {isLogin && (
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm text-[#A8F32C] hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90 h-14 text-base mt-8"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </form>

          <div className="mt-8 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-white/60 hover:text-white transition-colors text-sm"
            >
              {isLogin 
                ? "Don't have an account? Sign up"
                : 'Already have an account? Sign in'
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}