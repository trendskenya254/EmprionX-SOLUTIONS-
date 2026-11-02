import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Download, 
  ShieldCheck, 
  ShieldAlert, 
  FileCode2, 
  FolderArchive, 
  CheckCircle2, 
  Sparkles, 
  ExternalLink,
  MessageSquareCode,
  Layers,
  Info
} from 'lucide-react';

export const DownloadsPage: React.FC = () => {
  const { demos, navigateTo, addToast, triggerWhatsAppEnquiry } = useApp();

  // Filter only demos with authorized downloads
  const downloadableDemos = demos.filter((d) => d.hasAuthorizedDownload && d.canDownload);

  const handleDownload = (demo: any) => {
    addToast(
      'Authorized Download',
      `Downloading ${demo.downloadFileName || 'agency starter package'}. Permission verified.`,
      'success'
    );
    const fakeBlob = new Blob([
      `/* IMPERIONX AGENCY STARTER PACKAGE: ${demo.title} */\n/* License: ${demo.licenseType} */\n/* Verified Agency Distribution */\n`
    ], { type: 'application/zip' });
    const url = URL.createObjectURL(fakeBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = demo.downloadFileName || 'imperionx-starter-kit.zip';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Page Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4" />
          <span>Strict Permission &amp; Redistribution Model</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-['Outfit']">
          Downloads &amp; Agency Starter Kits
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Access verified agency deliverables, open-source boilerplate starters, and developer kits. 
          To protect intellectual property, only agency-authored deliverables and assets with confirmed redistribution clearance are made available for download.
        </p>
      </div>

      {/* Permission Model Explainer Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#101827] border border-amber-500/30 shadow-2xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
            <Info className="w-5 h-5 text-[#D9A441]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white font-['Outfit']">
              ImperionX Intellectual Property &amp; Redistribution Rules
            </h3>
            <span className="text-xs text-slate-400">
              Ensuring compliance with creators, authors, and commercial marketplaces
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs sm:text-sm">
          <div className="p-4 rounded-2xl bg-black/40 border border-emerald-500/20 space-y-2">
            <div className="flex items-center gap-2 font-bold text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Available for Download</span>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              Agency-authored code starters, MIT open-source scaffolds, architecture documentation, 
              and client onboarding packs created directly by ImperionX engineers.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-amber-500/20 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-400">
              <ShieldAlert className="w-4 h-4" />
              <span>Restricted from Raw ZIP Redistribution</span>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              Third-party marketplace assets (ThemeForest, CodeCanyon, Framer, Webflow). Exhibited strictly via live external previews. 
              ImperionX builds custom clean implementations for clients rather than redistributing raw author ZIP files.
            </p>
          </div>
        </div>
      </div>

      {/* Downloadable Kits List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h3 className="text-xl font-bold text-white font-['Outfit']">
              Authorized Starter Packages ({downloadableDemos.length})
            </h3>
            <p className="text-xs text-slate-400">
              Free to download for exploration and rapid prototyping.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {downloadableDemos.map((demo) => (
            <div
              key={demo.id}
              className="p-6 rounded-3xl bg-[#101827] border border-white/10 hover:border-[#D9A441]/40 flex flex-col justify-between space-y-5 transition-all shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <FolderArchive className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono-code text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                    {demo.downloadFileSize || '15 MB'}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-[#D9A441] tracking-wider">
                    {demo.categoryName}
                  </span>
                  <h4 className="text-base font-bold text-white font-['Outfit']">
                    {demo.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2">
                    {demo.description}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>File Name:</span>
                    <span className="font-mono-code text-slate-200 truncate max-w-[160px]">
                      {demo.downloadFileName}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>License:</span>
                    <span className="text-emerald-400 font-medium">MIT Redistribution</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={() => handleDownload(demo)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:brightness-110 shadow-md transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Starter Archive</span>
                </button>

                <button
                  onClick={() => navigateTo('details', demo.category, demo.id)}
                  className="w-full py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 transition-colors text-center"
                >
                  View Full Specifications
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Need Custom Codebase Banner */}
      <div className="p-8 rounded-3xl bg-slate-900/60 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <h4 className="text-lg font-bold text-white font-['Outfit']">
            Need a Fully Customized, Turnkey Production Codebase?
          </h4>
          <p className="text-slate-400 text-xs sm:text-sm">
            We deliver complete tailored repositories with custom databases, automated CI/CD pipelines, and SLA support.
          </p>
        </div>

        <button
          onClick={() => triggerWhatsAppEnquiry(null, 'I need a custom codebase engineered for our business requirements.')}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-[#F3C973] to-[#D9A441] hover:brightness-110 shadow-lg shadow-[#D9A441]/20 shrink-0"
        >
          <MessageSquareCode className="w-4 h-4" />
          <span>Request Bespoke Architecture</span>
        </button>
      </div>

    </div>
  );
};
