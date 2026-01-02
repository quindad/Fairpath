import React, { useState } from 'react';

interface LoginPageProps {
  onLogin: () => void;
  onEnterDemo: () => void;
}

export function LoginPage({ onLogin, onEnterDemo }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would authenticate with the backend
    onLogin();
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#FF8C42] rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-black font-bold text-2xl">FS</span>
          </div>
          <h1 className="text-white text-3xl mb-2">FairPath Staffing CRM</h1>
          <p className="text-white/60">Employer Portal Login</p>
        </div>

        {/* Demo Mode Button */}
        <div className="mb-6">
          <button
            onClick={onEnterDemo}
            className="w-full px-6 py-4 bg-[#A8F32C] text-black rounded-xl hover:bg-[#A8F32C]/90 transition-colors flex items-center justify-center gap-2"
          >
            <span className="text-xl">🎮</span>
            <span>Enter Demo Mode - Explore All Features</span>
          </button>
          <p className="text-white/40 text-sm text-center mt-2">
            No login required. See how the CRM works with sample data.
          </p>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-white/10"></div>
          <span className="text-white/40 text-sm">or</span>
          <div className="flex-1 h-px bg-white/10"></div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-black border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#A8F32C] transition-colors"
                placeholder="employer@company.com"
                required
              />
            </div>

            <div>
              <label className="block text-white mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-black border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#A8F32C] transition-colors"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors border border-white/20"
            >
              Login to CRM
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-white/60 text-sm">
              Don&apos;t have an account?{' '}
              <button className="text-[#A8F32C] hover:underline">
                Request Access
              </button>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center text-white/40 text-sm">
          <p>Part of the FairPath Industries ecosystem</p>
        </div>
      </div>
    </div>
  );
}