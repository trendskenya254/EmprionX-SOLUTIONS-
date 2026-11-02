import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AiDiscoveryService } from '../services/aiDiscoveryService';
import { DemoCard } from '../components/demos/DemoCard';
import { 
  ArrowLeft, 
  ExternalLink, 
  Download, 
  MessageSquareCode, 
  Sparkles, 
  ShieldCheck, 
  ShieldAlert, 
  Clock, 
  Star, 
  CheckCircle2, 
  Layers, 
  Copy, 
  Eye, 
  Compass,
  Store,
  Globe,
  Tag,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

export const DemoDetailsPage: React.FC = () => {
  const { 
    selectedDemoId, 
    demos, 
    navigateTo, 
    openPreviewModal, 
    openEnquiryModal, 
    triggerWhatsAppEnquiry,
    addToast 
  } = useApp();

  const demo = demos.find((d) => d.id === selectedDemoId) || demos[0];

  const [activeScreenshotIdx, setActiveScreenshotIdx] = useState(0);

  if (!demo) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <p className="text-white text-lg">Blueprint not found in catalogue.</p>
        <button
          onClick={() => navigateTo('explore')}
          className="px-4 py-2 rounded-xl bg-[#D9A441] text-slate-950 font-bold text-sm"
        >
          Return to Showroom
        </button>
      </div>
    );
  }

  const handleLivePreview = () => {
    // Open external live preview URL directly in new tab
    window.open(demo.livePreviewUrl, '_blank', 'noopener,noreferrer');
    addToast('Opening Live Preview', `Launching ${demo.title} external URL.`, 'info');
  };

  const handleOriginalSource = () => {
    const targetUrl = demo.originalProductUrl || demo.originalItemUrl || demo.livePreviewUrl;
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
    addToast('Opening Original Source', `Visiting author listing on ${demo.sourceOrigin}.`, 'info');
  };

  const handleDownload = () => {
    if (!demo.hasAuthorizedDownload || !demo.canDownload) {
      addToast(
        'Download Restricted',
        demo.downloadNotice || 'Source code redistribution is strictly protected. Agency builds bespoke client implementations.',
        'warning'
      );
      return;
    }

    // Trigger agency authorized download
    addToast(
      'Authorized Download',
      `Downloading ${demo.downloadFileName || 'agency starter package'}. Permission verified.`,
      'success'
    );
    const fakeBlob = new Blob([
      `/* IMPERIONX AGENCY STARTER PACKAGE: ${demo.title} */\n/* License: ${demo.licenseType} */\n/* Redistribution Clearance Verified */\n`
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

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    addToast('Link Copied', 'Blueprint link copied to clipboard.', 'success');
  };

  const screenshots = demo.screenshots && demo.screenshots.length > 0 
    ? demo.screenshots 
    : [demo.thumbnailUrl];

  // Dynamic Similar Websites Recommendations
  const similarWebsites = AiDiscoveryService.getSimilarWebsites(demo, demos, 3);

  const isPreviewValid = demo.previewStatus !== 'unavailable';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Top Breadcrumb & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={() => navigateTo('explore')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Showroom Blueprints</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Preview Status Pill */}
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border ${
            isPreviewValid
              ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25'
              : 'bg-amber-500/10 text-amber-300 border-amber-500/25'
          }`}>
            {isPreviewValid ? (
              <>
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Live Preview Verified</span>
              </>
            ) : (
              <>
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span>Preview Pending Verification</span>
              </>
            )}
          </span>

          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
          
          <span className="text-xs font-mono-code text-[#D9A441] bg-[#D9A441]/10 px-2.5 py-1 rounded-lg border border-[#D9A441]/20">
            ID: {demo.id}
          </span>
        </div>
      </div>

      {/* Main Showcase Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Media Gallery */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Main Active Screenshot */}
          <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden bg-slate-900 border border-white/10 shadow-2xl group">
            <img
              src={screenshots[activeScreenshotIdx] || demo.thumbnailUrl}
              alt={demo.title}
              className="w-full h-full object-cover transition-all duration-300"
            />
            
            {/* Top Badges */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-xl text-xs font-bold tracking-wide uppercase bg-black/80 backdrop-blur-md text-[#D9A441] border border-[#D9A441]/30">
                  {demo.categoryName}
                </span>
                {demo.sourceOrigin && (
                  <span className="px-2.5 py-1 rounded-xl text-xs font-semibold bg-black/80 backdrop-blur-md text-slate-200 border border-white/20 flex items-center gap-1.5">
                    <Store className="w-3 h-3 text-[#D9A441]" />
                    <span>{demo.sourceOrigin}</span>
                  </span>
                )}
              </div>

              {demo.isFeatured && (
                <span className="flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-bold bg-[#D9A441] text-slate-950 shadow-md">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>Featured</span>
                </span>
              )}
            </div>

            {/* Quick multi-device preview launcher */}
            <button
              onClick={() => openPreviewModal(demo)}
              className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black/80 hover:bg-[#D9A441] text-white hover:text-slate-950 backdrop-blur-md border border-white/20 hover:border-[#D9A441] text-xs font-bold transition-all shadow-xl"
            >
              <Eye className="w-4 h-4" />
              <span>Multi-Device Viewport</span>
            </button>
          </div>

          {/* Thumbnails Row */}
          {screenshots.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {screenshots.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveScreenshotIdx(idx)}
                  className={`w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                    activeScreenshotIdx === idx
                      ? 'border-[#D9A441] scale-105 shadow-md shadow-[#D9A441]/30'
                      : 'border-white/10 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={s} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Download Permission Notice Banner */}
          <div className="p-4 rounded-2xl bg-[#101827] border border-white/10 text-xs text-slate-300 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-white">
              {demo.hasAuthorizedDownload ? (
                <>
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Download Authorization: Confirmed Agency / Open Source Deliverable</span>
                </>
              ) : (
                <>
                  <ShieldAlert className="w-4 h-4 text-[#D9A441]" />
                  <span>Third-Party IP Protection: External Live Preview &amp; Bespoke Implementation</span>
                </>
              )}
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              {demo.downloadNotice || 
                (demo.hasAuthorizedDownload 
                  ? 'This blueprint is an agency-authored starter with redistribution clearance.'
                  : 'In compliance with marketplace author licensing (ThemeForest, CodeCanyon, Webflow, Framer), source code ZIP packages are not redistributed. ImperionX architects custom client solutions inspired by or extending this design specification.')}
            </p>
          </div>

        </div>

        {/* Right Column: Specifications & CTA Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#101827] border border-amber-500/30 shadow-2xl space-y-6">
            
            {/* Title & Tagline */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono-code text-[#D9A441] tracking-wider uppercase font-semibold">
                  {demo.clientIndustry}
                </span>
                {demo.cms && (
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-white/10 text-slate-300 flex items-center gap-1">
                    <Globe className="w-3 h-3 text-[#D9A441]" />
                    <span>{demo.cms}</span>
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit'] leading-snug">
                {demo.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {demo.tagline}
              </p>
            </div>

            {/* Indicative Pricing & Delivery Specs */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-black/40 border border-white/5">
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
                  Indicative Scope
                </span>
                <span className="text-2xl font-extrabold text-[#D9A441] font-mono-code">
                  ${demo.indicativePrice.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-500 block">estimated turnkey rollout</span>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
                  Delivery Timeline
                </span>
                <span className="text-base sm:text-lg font-bold text-white flex items-center gap-1.5 mt-1 font-mono-code">
                  <Clock className="w-4 h-4 text-[#D9A441]" />
                  {demo.deliveryTimeline}
                </span>
                <span className="text-[10px] text-emerald-400 block">fast-track available</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="space-y-3 pt-2">
              
              {/* Working View Live Preview Button (External URL) */}
              <button
                onClick={handleLivePreview}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl font-bold text-white bg-slate-800 hover:bg-slate-700 hover:text-[#D9A441] border border-slate-700 transition-all text-sm shadow-md hover:scale-[1.01]"
              >
                <span>View Live Preview</span>
                <ExternalLink className="w-4 h-4 text-[#D9A441]" />
              </button>

              {/* Working Original Source Button */}
              <button
                onClick={handleOriginalSource}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-2xl font-semibold text-slate-200 bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 transition-all text-xs"
              >
                <Compass className="w-4 h-4 text-[#D9A441]" />
                <span>Original Marketplace Listing ({demo.sourceOrigin})</span>
              </button>

              {/* Working Request This Project WhatsApp Button */}
              <button
                onClick={() => triggerWhatsAppEnquiry(demo)}
                className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl font-extrabold text-slate-950 bg-gradient-to-r from-[#F3C973] via-[#D9A441] to-[#B8852B] hover:brightness-110 shadow-xl shadow-[#D9A441]/20 transition-all text-sm hover:scale-[1.01]"
              >
                <MessageSquareCode className="w-5 h-5 text-slate-950" />
                <span>Request This Project via WhatsApp</span>
              </button>

              {/* Commission RFP Modal Button */}
              <button
                onClick={() => openEnquiryModal(demo)}
                className="w-full py-2.5 px-6 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              >
                Submit Formal Scope RFP
              </button>

              {/* Download Demo Button ONLY if authorized download exists */}
              {demo.hasAuthorizedDownload && demo.canDownload && (
                <button
                  onClick={handleDownload}
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-xs font-semibold text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Authorized Starter Pack ({demo.downloadFileSize || 'ZIP'})</span>
                </button>
              )}
            </div>

            {/* Detailed Provenance Metadata */}
            <div className="space-y-2 pt-2 border-t border-white/5 text-xs text-slate-400">
              <div className="flex justify-between">
                <span>License Classification:</span>
                <span className="text-slate-200 font-medium truncate max-w-[200px]" title={demo.licenseType}>
                  {demo.licenseType}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Marketplace Source:</span>
                <span className="text-[#D9A441] font-medium">{demo.sourceOrigin}</span>
              </div>
              {demo.sellerName && (
                <div className="flex justify-between">
                  <span>Creator / Studio:</span>
                  <span className="text-slate-300">{demo.sellerName}</span>
                </div>
              )}
              {demo.cms && (
                <div className="flex justify-between">
                  <span>CMS / Engine:</span>
                  <span className="text-slate-300">{demo.cms}</span>
                </div>
              )}
              {demo.designStyle && (
                <div className="flex justify-between">
                  <span>Design Aesthetic:</span>
                  <span className="text-slate-300">{demo.designStyle}</span>
                </div>
              )}
              {demo.retrievalDate && (
                <div className="flex justify-between">
                  <span>Indexed Date:</span>
                  <span className="text-slate-500 font-mono-code text-[11px]">{new Date(demo.retrievalDate).toLocaleDateString()}</span>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>

      {/* Deep Technical Overview & Features */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Full Overview & Solved Problems */}
        <div className="lg:col-span-2 space-y-8">
          
          <div className="p-8 rounded-3xl bg-[#101827] border border-white/10 space-y-4">
            <h3 className="text-2xl font-bold text-white font-['Outfit']">
              Architectural Overview
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              {demo.fullDescription || demo.description}
            </p>
          </div>

          {/* Key Features List */}
          <div className="p-8 rounded-3xl bg-[#101827] border border-white/10 space-y-5">
            <h3 className="text-xl font-bold text-white font-['Outfit']">
              Engineered Capabilities &amp; Features
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {demo.features.map((feat, i) => (
                <div key={i} className="flex items-start gap-3 p-3.5 rounded-2xl bg-black/30 border border-white/5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-200">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          {demo.tags && demo.tags.length > 0 && (
            <div className="p-6 rounded-3xl bg-[#101827] border border-white/10 space-y-3">
              <h4 className="text-sm font-bold text-white font-['Outfit'] flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#D9A441]" />
                <span>Discovery Keywords &amp; Tags</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {demo.tags.map((tag, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-lg text-xs font-mono-code bg-white/5 text-slate-300 border border-white/10">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Technology Stack & Deliverables */}
        <div className="space-y-8">
          
          {/* Tech Badges */}
          <div className="p-6 rounded-3xl bg-[#101827] border border-white/10 space-y-4">
            <h4 className="text-base font-bold text-white font-['Outfit'] flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#D9A441]" />
              <span>Technology Stack</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {demo.technologies.map((t, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-xl text-xs font-mono-code bg-white/5 text-slate-200 border border-white/10"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Deliverables Checklist */}
          <div className="p-6 rounded-3xl bg-[#101827] border border-white/10 space-y-4 text-xs text-slate-300">
            <h4 className="text-base font-bold text-white font-['Outfit']">
              Client Handover Scope
            </h4>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D9A441]" />
                <span>Production Source Code &amp; Versioned Git Repository</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D9A441]" />
                <span>PostgreSQL / Supabase Schema &amp; Security Rules</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D9A441]" />
                <span>Stripe / M-Pesa / WhatsApp Gateway Configuration</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D9A441]" />
                <span>Custom Client Brand Identity, Fonts, and Copy Setup</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D9A441]" />
                <span>Cloud Deployment &amp; Domain SSL Setup</span>
              </li>
            </ul>
          </div>

        </div>

      </div>

      {/* Similar Website Recommendations Section */}
      {similarWebsites.length > 0 && (
        <div className="pt-8 border-t border-white/10 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D9A441]" />
                <h3 className="text-xl font-bold text-white font-['Outfit']">
                  Similar Website Designs &amp; Blueprints
                </h3>
              </div>
              <p className="text-xs text-slate-400">
                Recommended based on category alignment, architecture, and design aesthetics.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarWebsites.map((simDemo) => (
              <DemoCard key={simDemo.id} demo={simDemo} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
