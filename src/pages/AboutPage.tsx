import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  Sparkles, 
  Code2, 
  Cpu, 
  Globe2, 
  Users, 
  MessageSquareCode, 
  ArrowRight,
  Terminal,
  Award,
  Clock,
  CheckCircle2
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigateTo, triggerWhatsAppEnquiry } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      
      {/* Hero Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D9A441]/15 text-[#D9A441] border border-[#D9A441]/30 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>About ImperionX Digital Agency</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-['Outfit']">
          Engineering High-Performance Digital Solutions with Absolute Transparency.
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Founded on the principle that modern software development shouldn't require months of speculative 
          wireframing, ImperionX maintains the industry's premier live client showroom. We build 
          tested blueprints that clients can inspect, test, and commission with complete confidence.
        </p>
      </div>

      {/* Core Principles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 rounded-3xl bg-[#101827] border border-white/10 space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#D9A441]">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white font-['Outfit']">
            The Showroom Advantage
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            Rather than relying on PowerPoint slides, our clients test actual responsive architectures, 
            interactive carts, booking engines, and AI agents before signing contracts.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-[#101827] border border-white/10 space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white font-['Outfit']">
            Security &amp; Full IP Handover
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            100% of the intellectual property, codebases, and credentials belong to our clients. 
            We implement Supabase PostgreSQL Row Level Security and never compromise client secrets.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-[#101827] border border-white/10 space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white font-['Outfit']">
            Rapid 7 - 14 Day Rollout
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            By leveraging our curated showroom blueprints, we eliminate 60% of baseline engineering overhead 
            and allocate full focus to your brand identity, proprietary business rules, and API connections.
          </p>
        </div>
      </div>

      {/* Leadership & Engineering Discipline */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#101827] to-[#182235] border border-amber-500/30 shadow-2xl space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-bold tracking-widest text-[#D9A441] uppercase">
            Technical Leadership
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-['Outfit']">
            Architected by Senior Engineers &amp; Product Designers
          </h2>
          <p className="text-slate-300 text-sm max-w-2xl">
            Our multidisciplinary team spans London, Austin, and Dubai, delivering high-stakes solutions 
            for fintech startups, private equity funds, hospital systems, and global retail brands.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
          {[
            {
              role: 'Chief Technology Officer',
              focus: 'Distributed Systems & Cloud Architecture',
              tech: 'Next.js, Go, PostgreSQL, Supabase'
            },
            {
              role: 'Lead AI Engineer',
              focus: 'Document Intelligence & Autonomous Agents',
              tech: 'Gemini 2.5 SDK, Python, pgvector, RAG'
            },
            {
              role: 'Head of Mobile Engineering',
              focus: 'Cross-Platform iOS & Android Native',
              tech: 'React Native, Flutter, Swift, Kotlin'
            },
            {
              role: 'Principal Security Officer',
              focus: 'Compliance, RLS & Penetration Testing',
              tech: 'SOC2, OAuth 2.0, Zero-Trust Architecture'
            }
          ].map((lead, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-2">
              <span className="text-xs font-mono-code text-[#D9A441] block">{lead.role}</span>
              <h4 className="text-sm font-bold text-white">{lead.focus}</h4>
              <p className="text-[11px] text-slate-400 font-mono-code pt-1">{lead.tech}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center max-w-2xl mx-auto space-y-6 pt-4">
        <h3 className="text-2xl sm:text-3xl font-bold text-white font-['Outfit']">
          Let's Build Something Exceptional Together
        </h3>
        <p className="text-slate-400 text-sm">
          Discuss your timeline, requirements, and target architecture directly with our team.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => triggerWhatsAppEnquiry()}
            className="flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-slate-950 bg-gradient-to-r from-[#F3C973] to-[#D9A441] shadow-lg shadow-[#D9A441]/20 hover:scale-[1.02] transition-all text-sm"
          >
            <MessageSquareCode className="w-4 h-4 text-slate-950" />
            <span>Chat via WhatsApp</span>
          </button>
          <button
            onClick={() => navigateTo('contact')}
            className="px-8 py-3.5 rounded-2xl font-semibold text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-sm"
          >
            Submit Project Proposal
          </button>
        </div>
      </div>

    </div>
  );
};
