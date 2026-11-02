import React from 'react';
import { useApp } from '../../context/AppContext';
import { INITIAL_CATEGORIES } from '../../data/initialCategories';
import { 
  ShieldCheck, 
  MessageSquareCode, 
  Mail, 
  MapPin, 
  Phone, 
  ExternalLink, 
  DownloadCloud, 
  Terminal,
  CheckCircle2
} from 'lucide-react';
import { CategorySlug } from '../../types';

export const Footer: React.FC = () => {
  const { navigateTo, triggerWhatsAppEnquiry } = useApp();

  return (
    <footer className="w-full bg-[#0a0f1d] border-t border-white/10 text-slate-400 text-sm">
      {/* Top Banner with WhatsApp Direct Action */}
      <div className="bg-[#101827]/80 border-b border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#D9A441] to-[#B8852B] p-0.5 shadow-lg shadow-[#D9A441]/20 hidden sm:flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-[#0a0f1d] rounded-[14px] flex items-center justify-center">
                <MessageSquareCode className="w-6 h-6 text-[#D9A441]" />
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold text-lg font-['Outfit']">
                Have a Custom Scope or Turnkey Requirement?
              </h4>
              <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
                Connect directly with ImperionX Agency Architects on WhatsApp for instant scope estimation.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => triggerWhatsAppEnquiry()}
              className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-[#F3C973] to-[#D9A441] hover:brightness-110 shadow-lg shadow-[#D9A441]/20 transition-all hover:scale-[1.02]"
            >
              <MessageSquareCode className="w-4 h-4 text-slate-950" />
              <span>WhatsApp Agency Desk</span>
            </button>
            <button
              onClick={() => navigateTo('contact')}
              className="px-5 py-3 rounded-xl font-semibold text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            >
              Formal RFP Enquiry
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div 
              onClick={() => navigateTo('home')} 
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D9A441] to-[#B8852B] p-0.5 shadow-md flex items-center justify-center">
                <div className="w-full h-full bg-[#0a0f1d] rounded-[10px] flex items-center justify-center">
                  <span className="font-extrabold text-lg text-[#D9A441]">IX</span>
                </div>
              </div>
              <span className="text-xl font-extrabold tracking-wider text-white font-['Outfit']">
                IMPERION<span className="text-[#D9A441]">X</span> DIGITAL SHOWROOM
              </span>
            </div>
            
            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              ImperionX is a premier digital engineering agency crafting enterprise web applications, 
              custom e-commerce platforms, mobile apps, and autonomous AI systems. Explore real client 
              showcase solutions and turnkey project blueprints.
            </p>

            <div className="space-y-2 text-xs text-slate-300 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D9A441]" />
                <span>One Canada Square, Canary Wharf, London &amp; Tech Hub Austin, TX</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D9A441]" />
                <span className="font-mono-code">solutions@imperionx.agency</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D9A441]" />
                <span className="font-mono-code">+1 (800) 555-0199 / WhatsApp Support</span>
              </div>
            </div>
          </div>

          {/* Categories Columns */}
          <div>
            <h5 className="text-white font-bold text-sm tracking-wide uppercase mb-4 font-['Outfit']">
              Client Solutions
            </h5>
            <ul className="space-y-2.5">
              {INITIAL_CATEGORIES.slice(0, 4).map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => navigateTo('category', c.slug)}
                    className="hover:text-[#D9A441] transition-colors text-left"
                  >
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-white font-bold text-sm tracking-wide uppercase mb-4 font-['Outfit']">
              Enterprise Systems
            </h5>
            <ul className="space-y-2.5">
              {INITIAL_CATEGORIES.slice(4, 8).map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => navigateTo('category', c.slug)}
                    className="hover:text-[#D9A441] transition-colors text-left"
                  >
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Agency & Compliance */}
          <div>
            <h5 className="text-white font-bold text-sm tracking-wide uppercase mb-4 font-['Outfit']">
              Agency &amp; Legal
            </h5>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-[#D9A441] transition-colors">
                  About ImperionX
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('downloads')} className="hover:text-[#D9A441] transition-colors">
                  Downloads &amp; Licensing Model
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-[#D9A441] transition-colors">
                  Contact &amp; Proposal Request
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('admin-login')} className="hover:text-[#D9A441] transition-colors flex items-center gap-1">
                  <span>Automation Center</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D9A441]" />
                </button>
              </li>
            </ul>

            <div className="mt-5 p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-400">
              <span className="font-semibold text-slate-300 block mb-1">Architecture Note:</span>
              Integrated with Supabase RLS policies and server-side secret isolation.
            </div>
          </div>

        </div>

        {/* Licensing & Intellectual Property Strict Disclaimer */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <div className="p-4 rounded-2xl bg-[#101827] border border-amber-500/20 text-xs text-slate-400 leading-relaxed flex flex-col md:flex-row items-start md:items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#D9A441] shrink-0" />
            <div>
              <span className="font-semibold text-slate-200">Intellectual Property &amp; Redistribution Policy: </span>
              In strict accordance with international copyright and author license agreements, third-party marketplace 
              demonstrations (Envato, ThemeForest, CodeCanyon, Framer, Webflow) are showcased solely through live preview redirection 
              and cannot be downloaded as raw source packages. Only agency-authored kits or open-source packages with confirmed redistribution 
              rights are available for download.
            </div>
          </div>
        </div>

        {/* Copyright and Bottom Status */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            &copy; {new Date().getFullYear()} IMPERIONX DIGITAL SHOWROOM. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Showroom Infrastructure Active
            </span>
            <span className="text-slate-500">
              Theme: Deep Navy #101827 &amp; Gold #D9A441
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
