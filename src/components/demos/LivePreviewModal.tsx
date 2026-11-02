import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  ExternalLink, 
  Monitor, 
  Tablet, 
  Smartphone, 
  MessageSquareCode, 
  Sparkles,
  RefreshCw,
  AlertCircle
} from 'lucide-react';

export const LivePreviewModal: React.FC = () => {
  const { 
    isPreviewModalOpen, 
    closePreviewModal, 
    previewModalDemo, 
    triggerWhatsAppEnquiry,
    openEnquiryModal 
  } = useApp();

  const [deviceViewport, setDeviceViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [iframeKey, setIframeKey] = useState(0);

  if (!isPreviewModalOpen || !previewModalDemo) return null;

  const handleOpenExternal = () => {
    window.open(previewModalDemo.livePreviewUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#070b14] animate-in fade-in duration-200">
      {/* Top Control Bar */}
      <div className="h-16 px-4 sm:px-6 bg-[#101827] border-b border-white/10 flex items-center justify-between gap-4 shrink-0">
        
        {/* Left: Demo Information */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-[#D9A441]/20 border border-[#D9A441]/40 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-[#D9A441]" />
          </div>
          <div className="min-w-0">
            <h4 className="text-sm font-bold text-white truncate max-w-xs sm:max-w-md">
              {previewModalDemo.title}
            </h4>
            <span className="text-[11px] text-[#D9A441] font-mono-code hidden sm:inline">
              {previewModalDemo.categoryName} &bull; Indicative: ${previewModalDemo.indicativePrice}
            </span>
          </div>
        </div>

        {/* Center: Device Viewport Switcher */}
        <div className="hidden md:flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => setDeviceViewport('desktop')}
            className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              deviceViewport === 'desktop'
                ? 'bg-[#D9A441] text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Desktop 100%"
          >
            <Monitor className="w-4 h-4" />
            <span>Desktop</span>
          </button>
          
          <button
            onClick={() => setDeviceViewport('tablet')}
            className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              deviceViewport === 'tablet'
                ? 'bg-[#D9A441] text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Tablet 768px"
          >
            <Tablet className="w-4 h-4" />
            <span>Tablet</span>
          </button>

          <button
            onClick={() => setDeviceViewport('mobile')}
            className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              deviceViewport === 'mobile'
                ? 'bg-[#D9A441] text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Mobile 375px"
          >
            <Smartphone className="w-4 h-4" />
            <span>Mobile</span>
          </button>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Working External Link Launch */}
          <button
            onClick={handleOpenExternal}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all hover:scale-[1.02]"
            title="Launch supplied preview URL directly in a full external browser tab"
          >
            <span>Open External Tab</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#D9A441]" />
          </button>

          {/* Request This Project WhatsApp */}
          <button
            onClick={() => triggerWhatsAppEnquiry(previewModalDemo)}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-[#F3C973] to-[#D9A441] hover:brightness-110 shadow-lg shadow-[#D9A441]/20 transition-all"
          >
            <MessageSquareCode className="w-4 h-4" />
            <span>WhatsApp Enquiry</span>
          </button>

          {/* Close modal */}
          <button
            onClick={closePreviewModal}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Close Preview"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

      </div>

      {/* Embedded Viewport Frame */}
      <div className="flex-1 bg-[#0a0f1d] flex items-center justify-center p-2 sm:p-4 overflow-hidden relative">
        <div
          className={`h-full bg-slate-950 rounded-2xl shadow-2xl border border-white/10 overflow-hidden flex flex-col transition-all duration-300 ${
            deviceViewport === 'desktop'
              ? 'w-full'
              : deviceViewport === 'tablet'
              ? 'w-[768px]'
              : 'w-[375px]'
          }`}
        >
          {/* Mini Browser Bar */}
          <div className="h-8 bg-[#182235] px-3 flex items-center justify-between border-b border-white/5 text-[11px] text-slate-400 font-mono-code shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
            </div>
            <div className="truncate max-w-[240px] sm:max-w-md bg-slate-900/60 px-3 py-0.5 rounded text-slate-400 text-center">
              {previewModalDemo.livePreviewUrl}
            </div>
            <button
              onClick={() => setIframeKey((k) => k + 1)}
              className="text-slate-400 hover:text-white p-0.5"
              title="Reload Frame"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Iframe with fallback prompt */}
          <div className="relative flex-1 bg-[#0b0f19]">
            <iframe
              key={iframeKey}
              src={previewModalDemo.livePreviewUrl}
              title={previewModalDemo.title}
              className="w-full h-full border-0 bg-white"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />

            {/* Floating helper card in case iframe headers restrict embedding */}
            <div className="absolute bottom-4 right-4 bg-[#101827]/95 border border-amber-500/40 p-3.5 rounded-2xl shadow-2xl backdrop-blur-md max-w-sm text-xs hidden lg:block">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-[#D9A441] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-slate-200 font-medium">
                    External Demo Frame
                  </p>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    If this third-party provider denies embedding via X-Frame-Options, click below to open the authentic preview directly.
                  </p>
                  <button
                    onClick={handleOpenExternal}
                    className="mt-1 flex items-center gap-1 text-[#D9A441] hover:underline font-bold"
                  >
                    <span>Launch in dedicated window</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
