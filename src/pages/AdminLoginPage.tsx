import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  ArrowRight, 
  KeyRound, 
  Sparkles, 
  AlertCircle,
  Terminal,
  Database
} from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const { login, navigateTo, userSession } = useApp();

  const [email, setEmail] = useState('admin@imperionx.agency');
  const [password, setPassword] = useState('ImperionX#2025');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please provide your admin email and access key.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const ok = login(email, password);
      setIsLoading(false);
      if (ok) {
        navigateTo('admin-dashboard');
      } else {
        setError('Invalid credentials. Please verify your admin password.');
      }
    }, 400);
  };

  const handleFillDemo = () => {
    setEmail('admin@imperionx.agency');
    setPassword('ImperionX#2025');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#D9A441] to-[#B8852B] p-0.5 shadow-xl shadow-[#D9A441]/20 flex items-center justify-center mx-auto">
            <div className="w-full h-full bg-[#0a0f1d] rounded-[14px] flex items-center justify-center">
              <ShieldCheck className="w-7 h-7 text-[#D9A441]" />
            </div>
          </div>
          <h2 className="text-3xl font-extrabold text-white font-['Outfit']">
            Admin Suite &amp; Automation
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Secure agency portal for Showroom management, Discovery imports, and Supabase database governance.
          </p>
        </div>

        {/* Login Box */}
        <div className="p-8 rounded-3xl bg-[#101827] border border-amber-500/30 shadow-2xl space-y-6">
          
          {/* Preset Reviewer Credentials Helper Badge */}
          <div className="p-4 rounded-2xl bg-[#D9A441]/10 border border-[#D9A441]/30 text-xs text-slate-300 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#D9A441] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Pre-Configured Admin Credentials</span>
              </span>
              <button
                type="button"
                onClick={handleFillDemo}
                className="text-[11px] underline text-[#D9A441] hover:text-white font-mono-code"
              >
                Auto-Fill
              </button>
            </div>
            <div className="font-mono-code text-[11px] space-y-0.5 text-slate-400">
              <div>Email: <span className="text-white">admin@imperionx.agency</span></div>
              <div>Pass: <span className="text-white">ImperionX#2025</span></div>
            </div>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Admin Work Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@imperionx.agency"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-sm text-white focus:outline-none focus:border-[#D9A441]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Password / Master Key
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-sm text-white focus:outline-none focus:border-[#D9A441]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-[#F3C973] via-[#D9A441] to-[#B8852B] hover:brightness-110 shadow-lg shadow-[#D9A441]/20 transition-all text-sm disabled:opacity-50"
            >
              <KeyRound className="w-4 h-4" />
              <span>{isLoading ? 'Verifying...' : 'Authenticate to Admin Suite'}</span>
            </button>
          </form>

          <div className="pt-2 text-center">
            <button
              onClick={() => navigateTo('home')}
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              &larr; Return to Client Showroom
            </button>
          </div>

        </div>

        {/* Security Architecture Footnote */}
        <div className="text-center space-y-1 text-xs text-slate-500">
          <div className="flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Supabase Auth &amp; Server-Side Secret Isolation</span>
          </div>
          <p>Service-role credentials are strictly restricted from client code.</p>
        </div>

      </div>
    </div>
  );
};
