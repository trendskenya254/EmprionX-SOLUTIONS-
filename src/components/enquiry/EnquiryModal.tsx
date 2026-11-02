import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Send, MessageSquareCode, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Demo } from '../../types';

export const EnquiryModal: React.FC = () => {
  const { 
    isEnquiryModalOpen, 
    closeEnquiryModal, 
    enquiryModalDemo, 
    demos, 
    submitEnquiry,
    triggerWhatsAppEnquiry 
  } = useApp();

  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [selectedDemoId, setSelectedDemoId] = useState('');
  const [budget, setBudget] = useState('$3,000 - $5,000');
  const [timeline, setTimeline] = useState('2 - 4 Weeks');
  const [projectDescription, setProjectDescription] = useState('');
  const [preferredContact, setPreferredContact] = useState<'WhatsApp' | 'Email' | 'Phone' | 'Video Call'>('WhatsApp');
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (enquiryModalDemo) {
      setSelectedDemoId(enquiryModalDemo.id);
      setProjectDescription(
        `We are interested in commissioning a project tailored around the ${enquiryModalDemo.title} solution. Our goal is to adapt it with custom branding, integrate our business workflows, and launch on our private cloud.`
      );
    } else {
      setSelectedDemoId(demos[0]?.id || '');
    }
    setErrors({});
    setIsSuccess(false);
  }, [enquiryModalDemo, isEnquiryModalOpen, demos]);

  if (!isEnquiryModalOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!clientName.trim()) errs.clientName = 'Full name is required';
    if (!clientEmail.trim() || !clientEmail.includes('@')) errs.clientEmail = 'Valid business email is required';
    if (!clientPhone.trim() || clientPhone.length < 7) errs.clientPhone = 'Valid phone or WhatsApp number is required';
    if (!projectDescription.trim() || projectDescription.length < 15) errs.projectDescription = 'Please describe your project scope (minimum 15 characters)';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const chosenDemo = demos.find((d) => d.id === selectedDemoId);

    const success = await submitEnquiry({
      clientName: clientName.trim(),
      clientEmail: clientEmail.trim(),
      clientPhone: clientPhone.trim(),
      selectedDemoId: chosenDemo?.id,
      selectedDemoTitle: chosenDemo?.title,
      budget,
      timeline,
      projectDescription: projectDescription.trim(),
      preferredContact
    });

    setIsSubmitting(false);
    if (success) {
      setIsSuccess(true);
    }
  };

  const chosenDemo = demos.find((d) => d.id === selectedDemoId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#101827] border border-amber-500/30 rounded-3xl shadow-2xl p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={closeEnquiryModal}
          className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-8 text-center space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-3xl flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white font-['Outfit']">
                Project Enquiry Dispatched!
              </h3>
              <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                Thank you, <span className="text-[#D9A441] font-semibold">{clientName}</span>. 
                Our senior technical lead has received your specifications for 
                <span className="text-white font-medium"> {chosenDemo?.title || 'your custom project'}</span>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300 max-w-md mx-auto space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-400">Preferred Channel:</span>
                <span className="font-semibold text-[#D9A441]">{preferredContact}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Guaranteed Response:</span>
                <span className="text-emerald-400 font-semibold">&lt; 4 Hours</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                onClick={() => {
                  closeEnquiryModal();
                  triggerWhatsAppEnquiry(chosenDemo, `Following up on my enquiry submitted for ${clientName}`);
                }}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-[#F3C973] to-[#D9A441] hover:brightness-110 shadow-lg shadow-[#D9A441]/20 transition-all"
              >
                <MessageSquareCode className="w-4 h-4" />
                <span>Instant Connect via WhatsApp</span>
              </button>
              
              <button
                onClick={closeEnquiryModal}
                className="px-6 py-3 rounded-xl text-sm font-semibold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10"
              >
                Close &amp; Continue Browsing
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="space-y-2 mb-6 pr-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D9A441]/15 text-[#D9A441] border border-[#D9A441]/30 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Client Commissioning &amp; Scope Enquiry</span>
              </div>
              <h3 className="text-2xl font-bold text-white font-['Outfit']">
                Request This Project
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm">
                Fill in your project goals. We deliver turnkey staging, bespoke architecture, and 
                full IP ownership transfer.
              </p>
            </div>

            {/* Selected Demo Banner */}
            {chosenDemo && (
              <div className="mb-6 p-4 rounded-2xl bg-white/5 border border-amber-500/20 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={chosenDemo.thumbnailUrl}
                    alt={chosenDemo.title}
                    className="w-14 h-12 object-cover rounded-xl shrink-0 border border-white/10"
                  />
                  <div className="min-w-0">
                    <span className="text-[11px] font-mono-code text-[#D9A441] block">
                      {chosenDemo.categoryName}
                    </span>
                    <h5 className="text-sm font-bold text-white truncate">
                      {chosenDemo.title}
                    </h5>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Indicative</span>
                  <span className="text-sm font-extrabold text-[#D9A441] font-mono-code">
                    ${chosenDemo.indicativePrice}
                  </span>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Your Name / Company *
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Alexander Wright"
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D9A441] transition-all ${
                      errors.clientName ? 'border-rose-500' : 'border-white/10'
                    }`}
                  />
                  {errors.clientName && (
                    <p className="text-rose-400 text-xs mt-1">{errors.clientName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="alex@enterprise.com"
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D9A441] transition-all ${
                      errors.clientEmail ? 'border-rose-500' : 'border-white/10'
                    }`}
                  />
                  {errors.clientEmail && (
                    <p className="text-rose-400 text-xs mt-1">{errors.clientEmail}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="+1 (555) 019-2834"
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D9A441] transition-all ${
                      errors.clientPhone ? 'border-rose-500' : 'border-white/10'
                    }`}
                  />
                  {errors.clientPhone && (
                    <p className="text-rose-400 text-xs mt-1">{errors.clientPhone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Target Demo Blueprint
                  </label>
                  <select
                    value={selectedDemoId}
                    onChange={(e) => setSelectedDemoId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-sm text-white focus:outline-none focus:border-[#D9A441] transition-all"
                  >
                    {demos.map((d) => (
                      <option key={d.id} value={d.id} className="bg-slate-900 text-white">
                        {d.title} (${d.indicativePrice})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Estimated Budget Range
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-sm text-white focus:outline-none focus:border-[#D9A441]"
                  >
                    <option value="$1,500 - $3,000">$1,500 - $3,000 (Turnkey Rapid)</option>
                    <option value="$3,000 - $5,000">$3,000 - $5,000 (Standard Commercial)</option>
                    <option value="$5,000 - $10,000">$5,000 - $10,000 (Enterprise Custom)</option>
                    <option value="$10,000+">$10,000+ (Full Suite &amp; Multi-Platform)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Target Delivery Timeline
                  </label>
                  <select
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-sm text-white focus:outline-none focus:border-[#D9A441]"
                  >
                    <option value="Urgent (7 - 10 Days)">Urgent (7 - 10 Days)</option>
                    <option value="2 - 4 Weeks">2 - 4 Weeks (Standard)</option>
                    <option value="1 - 2 Months">1 - 2 Months (Comprehensive)</option>
                    <option value="Flexible">Flexible / Planning Phase</option>
                  </select>
                </div>
              </div>

              {/* Preferred Contact Method */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Preferred Contact Method
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['WhatsApp', 'Email', 'Phone', 'Video Call'] as const).map((method) => (
                    <button
                      type="button"
                      key={method}
                      onClick={() => setPreferredContact(method)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all text-center ${
                        preferredContact === method
                          ? 'bg-[#D9A441]/15 text-[#D9A441] border-[#D9A441] font-semibold'
                          : 'bg-slate-900/80 text-slate-400 border-white/10 hover:text-white'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              {/* Project Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Project Description &amp; Custom Requirements *
                </label>
                <textarea
                  rows={3}
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  placeholder="Tell us about your brand, integrations (CRM, payment gateways, MLS), target users, or design preferences..."
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D9A441] transition-all resize-none ${
                    errors.projectDescription ? 'border-rose-500' : 'border-white/10'
                  }`}
                />
                {errors.projectDescription && (
                  <p className="text-rose-400 text-xs mt-1">{errors.projectDescription}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Strict NDA &amp; confidential inquiry handling</span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => triggerWhatsAppEnquiry(chosenDemo, projectDescription)}
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700"
                    title="Send directly over WhatsApp"
                  >
                    <MessageSquareCode className="w-4 h-4 text-emerald-400" />
                    <span>WhatsApp</span>
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-[#F3C973] via-[#D9A441] to-[#B8852B] hover:brightness-110 shadow-lg shadow-[#D9A441]/20 transition-all disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Transmitting...' : 'Submit Request'}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
