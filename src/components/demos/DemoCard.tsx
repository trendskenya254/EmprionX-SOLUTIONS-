import React from 'react';
import { Demo } from '../../types';
import { useApp } from '../../context/AppContext';
import { 
  ExternalLink, 
  Download, 
  MessageSquareCode, 
  Star, 
  Sparkles, 
  Clock, 
  Layers, 
  ShieldAlert, 
  ShieldCheck,
  ChevronRight,
  Eye,
  Globe,
  Compass,
  AlertCircle
} from 'lucide-react';

interface DemoCardProps {
  demo: Demo;
  compact?: boolean;
}

export const DemoCard: React.FC<DemoCardProps> = ({ demo, compact = false }) => {
  const { 
    navigateTo, 
    openPreviewModal, 
    openEnquiryModal, 
    triggerWhatsAppEnquiry,
    addToast 
  } = useApp();

  const isPreviewValid = demo.previewStatus !== 'unavailable';

  const handleLivePreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isPreviewValid) {
      addToast('Preview Unavailable', 'Vendor has not provided a live preview URL for this listing.', 'warning');
      return;
    }
    // Open external live preview URL directly in new tab as required
    window.open(demo.livePreviewUrl, '_blank', 'noopener,noreferrer');
    addToast('Opening Live Preview', `Launching ${demo.title} external preview URL.`, 'info');
  };

  const handleOriginalSource = (e: React.MouseEvent) => {
    e.stopPropagation();
    const sourceUrl = demo.originalProductUrl || demo.originalItemUrl || demo.livePreviewUrl;
    window.open(sourceUrl, '_blank', 'noopener,noreferrer');
    addToast('Opening Marketplace Source', `Navigating to original ${demo.sourceOrigin} listing.`, 'info');
  };

  const handlePreviewModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isPreviewValid) {
      addToast('Preview Unavailable', 'Vendor preview is currently unavailable.', 'warning');
      return;
    }
    openPreviewModal(demo);
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!demo.hasAuthorizedDownload || !demo.canDownload) {
      addToast(
        'Download Restricted',
        demo.downloadNotice || 'This is a third-party preview. Downloadable source code is not permitted without a direct license.',
        'warning'
      );
      return;
    }

    addToast(
      'Authorized Download',
      `Downloading ${demo.downloadFileName || 'agency starter package'}. Permission verified.`,
      'success'
    );
    const fakeBlob = new Blob([
      `/* IMPERIONX AGENCY STARTER PACKAGE: ${demo.title} */\n/* License: ${demo.licenseType} */\n/* Generated for verified client exploration. */\n`
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

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    triggerWhatsAppEnquiry(demo);
  };

  const handleCardClick = () => {
    navigateTo('details', demo.category, demo.id);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative flex flex-col bg-[#101827] border border-white/10 hover:border-[#D9A441]/50 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-[#D9A441]/10 transition-all duration-300 cursor-pointer"
    >
      {/* 1. Website Thumbnail / Authorized Preview Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
        <img
          src={demo.thumbnailUrl}
          alt={demo.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Subtle Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#101827] via-transparent to-black/50 opacity-90" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* 3. Marketplace Source */}
            <span className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold tracking-wider uppercase bg-black/80 backdrop-blur-md text-[#D9A441] border border-[#D9A441]/40 flex items-center gap-1">
              <Globe className="w-3 h-3 text-[#D9A441]" />
              <span>{demo.sourceOrigin}</span>
            </span>

            {/* 4. Category Tag */}
            <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-white/15 backdrop-blur-md text-slate-200 border border-white/20 truncate max-w-[140px]">
              {demo.categoryName}
            </span>

            {demo.cms && (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono-code bg-black/60 text-slate-300 border border-white/10">
                {demo.cms}
              </span>
            )}
          </div>

          {/* Featured Star */}
          {demo.isFeatured && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-[#D9A441] text-slate-950 shadow-md">
              <Star className="w-3 h-3 fill-current" />
              <span>Featured</span>
            </span>
          )}
        </div>

        {/* Floating Quick Action: Device Frame Preview */}
        {isPreviewValid && (
          <button
            onClick={handlePreviewModal}
            className="absolute bottom-3 right-3 p-2 rounded-xl bg-black/70 hover:bg-[#D9A441] text-white hover:text-slate-950 border border-white/20 hover:border-[#D9A441] backdrop-blur-md transition-all shadow-lg pointer-events-auto"
            title="Inspect in multi-device preview frame"
          >
            <Eye className="w-4 h-4" />
          </button>
        )}

        {/* Preview Status Verification Badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 text-[10px] font-medium bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/10">
          {isPreviewValid ? (
            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Verified Preview</span>
            </span>
          ) : (
            <span className="flex items-center gap-1 text-slate-400">
              <AlertCircle className="w-3 h-3 text-amber-500" />
              <span>Preview Unavailable</span>
            </span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between space-y-4">
        
        {/* 2. Website Title & Tagline */}
        <div className="space-y-1.5">
          <h3 className="text-lg font-bold text-white group-hover:text-[#D9A441] transition-colors font-['Outfit'] line-clamp-1">
            {demo.title}
          </h3>

          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {demo.description}
          </p>

          {/* Attribution to author */}
          {demo.sellerName && (
            <div className="text-[11px] text-slate-400 pt-0.5">
              Author: <span className="text-slate-300 font-medium">{demo.sellerName}</span> &bull; Source: <span className="text-[#D9A441]">{demo.sourceOrigin}</span>
            </div>
          )}
        </div>

        {/* 5. Technologies Pills */}
        <div className="flex flex-wrap gap-1.5">
          {demo.technologies.slice(0, 3).map((tech, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded-md text-[10px] font-mono-code bg-white/5 text-slate-300 border border-white/5"
            >
              {tech}
            </span>
          ))}
          {demo.technologies.length > 3 && (
            <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono-code text-slate-400">
              +{demo.technologies.length - 3}
            </span>
          )}
        </div>

        {/* 6. Price Where Available & Download Model */}
        <div className="pt-3 border-t border-white/5 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
              Indicative Turnkey
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-extrabold text-[#D9A441] font-mono-code">
                ${demo.indicativePrice.toLocaleString()}
              </span>
              <span className="text-[10px] text-slate-400">USD</span>
            </div>
          </div>

          {/* Download Permission Status Badge */}
          {demo.hasAuthorizedDownload ? (
            <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md font-medium">
              <ShieldCheck className="w-3 h-3" />
              <span>Downloadable Kit</span>
            </span>
          ) : (
            <span 
              className="inline-flex items-center gap-1 text-[10px] text-slate-400 bg-white/5 border border-white/5 px-2 py-0.5 rounded-md"
              title="External live preview only. Source code redistribution is restricted to protect creator licensing."
            >
              <ShieldAlert className="w-3 h-3 text-amber-500/80" />
              <span>Preview Only</span>
            </span>
          )}
        </div>

        {/* 7, 8, 9. Action Buttons Row (Preview, Original Source, Project Enquiry) */}
        <div className="grid grid-cols-3 gap-1.5 pt-2">
          
          {/* 7. Working View Live Preview button */}
          <button
            onClick={handleLivePreview}
            disabled={!isPreviewValid}
            className={`flex items-center justify-center gap-1 py-2 px-1 rounded-xl text-[11px] font-bold border transition-all ${
              isPreviewValid
                ? 'text-white bg-slate-800 hover:bg-slate-700 hover:text-[#D9A441] border-slate-700'
                : 'text-slate-500 bg-slate-900 border-white/5 cursor-not-allowed opacity-60'
            }`}
            title={isPreviewValid ? "Open actual supplied preview URL in new tab" : "Preview unavailable from vendor"}
          >
            <span>Live Preview</span>
            <ExternalLink className="w-3 h-3" />
          </button>

          {/* 8. Original Source button (opens original product listing) */}
          <button
            onClick={handleOriginalSource}
            className="flex items-center justify-center gap-1 py-2 px-1 rounded-xl text-[11px] font-semibold text-slate-300 bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 transition-all"
            title={`View original ${demo.sourceOrigin} product listing`}
          >
            <Compass className="w-3 h-3 text-[#D9A441]" />
            <span className="truncate">Source</span>
          </button>

          {/* 9. Project Enquiry button (WhatsApp) */}
          <button
            onClick={handleWhatsApp}
            className="flex items-center justify-center gap-1 py-2 px-1 rounded-xl text-[11px] font-bold text-slate-950 bg-gradient-to-r from-[#F3C973] to-[#D9A441] hover:brightness-110 shadow-md shadow-[#D9A441]/15 transition-all"
            title="Prepare WhatsApp enquiry for this design"
          >
            <MessageSquareCode className="w-3 h-3" />
            <span className="truncate">Enquire</span>
          </button>
        </div>

        {/* Download Demo button ONLY when authorized downloadable file exists */}
        {demo.hasAuthorizedDownload && demo.canDownload && (
          <button
            onClick={handleDownload}
            className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-[11px] font-semibold text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-colors"
          >
            <Download className="w-3 h-3" />
            <span>Download Starter Archive ({demo.downloadFileSize})</span>
          </button>
        )}

      </div>
    </div>
  );
};
