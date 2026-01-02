import { useState } from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface DonorAuthProps {
  onComplete: () => void;
}

export default function DonorAuth({ onComplete }: DonorAuthProps) {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('otp');
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete();
  };

  if (step === 'phone') {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col">
        <div className="p-6">
          <div className="text-xs tracking-[0.3em] text-[#A8F32C]">
            DONOR LITE ACCESS
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center px-6">
          <div className="w-full max-w-md">
            <div className="text-6xl mb-8 text-center">💝</div>
            
            <h1 className="text-4xl mb-3 text-center">Quick Donor Access</h1>
            <p className="text-white/60 text-center mb-12">
              Post free items in seconds. No account needed—just your phone number.
            </p>

            <form onSubmit={handlePhoneSubmit} className="space-y-6">
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                <Input
                  type="tel"
                  placeholder="(555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-12 h-16 bg-[#121212] border-white/10 text-white placeholder:text-white/40 text-center text-lg"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90 h-14 text-base"
              >
                Send Code
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="p-6">
        <button
          onClick={() => setStep('phone')}
          className="text-white/60 hover:text-white transition-colors text-sm"
        >
          ← Change Number
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="text-6xl mb-8 text-center">📱</div>
          
          <h1 className="text-4xl mb-3 text-center">Enter Code</h1>
          <p className="text-white/60 text-center mb-12">
            We sent a 4-digit code to<br />
            <span className="text-white">{phone}</span>
          </p>

          <form onSubmit={handleOtpSubmit} className="space-y-8">
            <div className="flex gap-4 justify-center">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  className="w-16 h-16 text-center text-2xl bg-[#121212] border-white/10 text-white"
                  required
                />
              ))}
            </div>

            <Button
              type="submit"
              className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90 h-14 text-base"
            >
              Verify & Continue
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
