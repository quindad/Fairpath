import { useState, useEffect } from 'react';
import { Phone, ArrowLeft, Loader2, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { useAuth } from '../../contexts/AuthContext';
import FairPathLogo from '../common/FairPathLogo';

interface PhoneSignInProps {
  onSuccess: (user: any) => void;
  onBack?: () => void;
}

export default function PhoneSignIn({ onSuccess, onBack }: PhoneSignInProps) {
  const { signInWithPhone, verifyOtp } = useAuth();
  const [step, setStep] = useState<'phone' | 'verify' | 'processing'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [formattedPhone, setFormattedPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // Format phone number as user types
  useEffect(() => {
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    if (cleaned.length <= 3) {
      setFormattedPhone(cleaned);
    } else if (cleaned.length <= 6) {
      setFormattedPhone(`(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`);
    } else {
      setFormattedPhone(
        `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`
      );
    }
  }, [phoneNumber]);

  // Resend countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate phone number
    const cleaned = phoneNumber.replace(/\D/g, '');
    if (cleaned.length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    const formattedForSupabase = `+1${cleaned}`; // US numbers only for now

    setLoading(true);

    try {
      const result = await signInWithPhone(formattedForSupabase);

      if (result.success) {
        console.log('✅ OTP sent to:', formattedForSupabase);
        setStep('verify');
        setCountdown(60); // Start 60 second countdown for resend
      } else {
        setError(result.error || 'Failed to send code. Please try again.');
      }
    } catch (err: any) {
      console.error('❌ Phone submit error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (otp.length !== 6) {
      setError('Please enter the 6-digit code');
      return;
    }

    const cleaned = phoneNumber.replace(/\D/g, '');
    const formattedForSupabase = `+1${cleaned}`;

    setLoading(true);

    try {
      const result = await verifyOtp(formattedForSupabase, otp);

      if (result.success && result.user) {
        console.log('✅ OTP verified, user logged in:', result.user.id);
        setStep('processing');
        // Give user feedback before redirecting
        setTimeout(() => {
          onSuccess(result.user);
        }, 1500);
      } else {
        setError(result.error || 'Invalid code. Please try again.');
        setOtp(''); // Clear OTP on error
      }
    } catch (err: any) {
      console.error('❌ OTP verification error:', err);
      setError('An unexpected error occurred. Please try again.');
      setOtp('');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (countdown > 0) return;

    setError('');
    setLoading(true);

    const cleaned = phoneNumber.replace(/\D/g, '');
    const formattedForSupabase = `+1${cleaned}`;

    try {
      const result = await signInWithPhone(formattedForSupabase);

      if (result.success) {
        console.log('✅ OTP resent to:', formattedForSupabase);
        setCountdown(60);
        setOtp('');
      } else {
        setError(result.error || 'Failed to resend code. Please try again.');
      }
    } catch (err: any) {
      console.error('❌ Resend error:', err);
      setError('Failed to resend code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Processing/Success Screen
  if (step === 'processing') {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <Card className="bg-[#121212] border-[#A8F32C]/50 p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-[#A8F32C]/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-8 w-8 text-[#A8F32C]" />
          </div>
          <h2 className="text-3xl mb-3">Welcome to FairPath!</h2>
          <p className="text-white/60">
            Phone verified successfully. Redirecting to your dashboard...
          </p>
        </Card>
      </div>
    );
  }

  // OTP Verification Screen
  if (step === 'verify') {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="mb-8">
              <FairPathLogo size={120} variant="light" />
            </div>
            <Button
              variant="ghost"
              className="text-white/60 hover:text-white mb-6 -ml-3"
              onClick={() => setStep('phone')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Change phone number
            </Button>
          </div>

          <Card className="bg-[#121212] border-white/10 p-8">
            <h1 className="text-3xl mb-3">Enter verification code</h1>
            <p className="text-white/60 mb-6">
              We sent a 6-digit code to <span className="text-white">{formattedPhone}</span>
            </p>

            <form onSubmit={handleOtpSubmit}>
              <div className="mb-6">
                <Input
                  type="text"
                  inputMode="numeric"
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    if (value.length <= 6) {
                      setOtp(value);
                    }
                  }}
                  className="bg-black/50 border-white/20 text-white text-center text-2xl tracking-widest"
                  maxLength={6}
                  autoFocus
                />
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90 mb-4"
                disabled={loading || otp.length !== 6}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  'Verify & Continue'
                )}
              </Button>

              <div className="text-center">
                {countdown > 0 ? (
                  <p className="text-sm text-white/60">
                    Resend code in {countdown} seconds
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendCode}
                    disabled={loading}
                    className="text-sm text-[#A8F32C] hover:text-[#A8F32C]/80 disabled:opacity-50"
                  >
                    Resend code
                  </button>
                )}
              </div>
            </form>

            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <p className="text-sm text-blue-400">
                💡 Tip: Check your text messages. The code should arrive within 30 seconds.
              </p>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Phone Number Entry Screen
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-8">
            <FairPathLogo size={120} variant="light" />
          </div>
          {onBack && (
            <Button
              variant="ghost"
              className="text-white/60 hover:text-white mb-6 -ml-3"
              onClick={onBack}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          )}
        </div>

        <Card className="bg-[#121212] border-white/10 p-8">
          <h1 className="text-3xl mb-3">Sign in with your phone</h1>
          <p className="text-white/60 mb-6">
            We'll send you a verification code to confirm your number
          </p>

          <form onSubmit={handlePhoneSubmit}>
            <div className="mb-6">
              <label className="block text-sm text-white/60 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                <Input
                  type="tel"
                  inputMode="numeric"
                  placeholder="(555) 123-4567"
                  value={formattedPhone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    setPhoneNumber(value);
                  }}
                  className="bg-black/50 border-white/20 text-white pl-10"
                  maxLength={14}
                  autoFocus
                />
              </div>
              <p className="text-xs text-white/40 mt-2">
                US numbers only. We'll never share your number.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
              disabled={loading || phoneNumber.replace(/\D/g, '').length !== 10}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending code...
                </>
              ) : (
                <>
                  <Phone className="mr-2 h-4 w-4" />
                  Send verification code
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-white/5 border border-white/10 rounded-lg">
            <p className="text-sm text-white/60">
              🔒 Secure authentication powered by Supabase. Your phone number is encrypted and never shared.
            </p>
          </div>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-sm text-white/40">
            By continuing, you agree to our{' '}
            <a href="#" className="text-[#A8F32C] hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-[#A8F32C] hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}