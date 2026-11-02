import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageSquareCode, 
  Clock, 
  ShieldCheck, 
  Send, 
  CheckCircle2, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { demos, submitEnquiry, triggerWhatsAppEnquiry, addToast } = useApp();

  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [selectedDemoId, setSelectedDemoId] = useState(demos[0]?.id || '');
  const [budget, setBudget] = useState('$3,000 - $5,000');
  const [timeline, setTimeline] = useState('2 - 4 Weeks');
  const [preferredContact, setPreferredContact] = useState<'WhatsApp' | 'Email' | 'Phone' | 'Video Call'>('WhatsApp');
  const [projectDescription, setProjectDescription] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!clientName.trim()) errs.clientName = 'Full name is required';
    if (!clientEmail.trim() || !clientEmail.includes('@')) errs.clientEmail = 'Valid business email is required';
    if (!clientPhone.trim() || clientPhone.length < 7) errs.clientPhone = 'Phone / WhatsApp number is required';
    if (!projectDescription.trim() || projectDescription.length < 15) errs.projectDescription = 'Please provide at least 15 characters describing your project goals';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const chosen = demos.find((d) => d.id === selectedDemoId);

    const success = await submitEnquiry({
      clientName: clientName.trim(),
      clientEmail: clientEmail.trim(),
      clientPhone: clientPhone.trim(),
      selectedDemoId: chosen?.id,
      selectedDemoTitle: chosen?.title,
      budget,
      timeline,
      projectDescription: projectDescription.trim(),
      preferredContact
    });

    setIsSubmitting(false);
    if (success) {
      setIsSubmitted(true);
    }
  };

  const selectedDemo = demos.find((d) => d.id === selectedDemoId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D9A441]/15 text-[#D9A441] border border-[#D9A441]/30 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Client Advisory &amp; Technical Consultation</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-['Outfit']">
          Commission a Project or Request a Blueprint Scope
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Submit your scope below to receive a line-item architectural quote, or connect directly with our engineering lead via WhatsApp for instant scoping.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Direct Coordinates */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Quick WhatsApp Contact Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#101827] to-[#182235] border border-amber-500/30 shadow-2xl space-y-5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <MessageSquareCode className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white font-['Outfit']">
                Instant WhatsApp Scoping Desk
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Skip form queues. Chat directly with our solutions architect for real-time feasibility and turnaround estimates.
              </p>
            </div>

            <button
              onClick={() => triggerWhatsAppEnquiry(selectedDemo, 'Initiating direct agency inquiry.')}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-[#F3C973] to-[#D9A441] hover:brightness-110 shadow-lg shadow-[#D9A441]/20 transition-all hover:scale-[1.02]"
            >
              <MessageSquareCode className="w-4 h-4 text-slate-950" />
              <span>Launch WhatsApp Chat</span>
            </button>
          </div>

          {/* Agency Office Coordinates */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#101827] border border-white/10 space-y-6 text-sm">
            <h4 className="text-base font-bold text-white font-['Outfit']">
              Global Agency Hubs
            </h4>

            <div className="space-y-4 text-slate-300 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#D9A441] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">London Innovation Center</span>
                  <span className="text-slate-400 text-xs">Level 28, One Canada Square, Canary Wharf, London, UK</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#D9A441] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Austin Engineering Hub</span>
                  <span className="text-slate-400 text-xs">600 Congress Ave, Suite 1400, Austin, TX, USA</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                <Mail className="w-4 h-4 text-[#D9A441] shrink-0" />
                <div>
                  <span className="text-slate-400 text-xs block">Technical Inquiries</span>
                  <span className="font-mono-code text-white">solutions@imperionx.agency</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#D9A441] shrink-0" />
                <div>
                  <span className="text-slate-400 text-xs block">Client Desk SLA</span>
                  <span className="text-emerald-400 font-semibold text-xs">Guaranteed response &lt; 4 hours</span>
                </div>
              </div>
            </div>
          </div>

          {/* Security & Confidentiality */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3 text-xs text-slate-400">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>Mutual NDA automatically applied upon submission of project blueprints.</span>
          </div>

        </div>

        {/* Right Column: Comprehensive Client Enquiry Form */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-10 rounded-3xl bg-[#101827] border border-white/10 shadow-2xl">
            
            {isSubmitted ? (
              <div className="py-12 text-center space-y-6">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-3xl flex items-center justify-center mx-auto border border-emerald-500/40">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white font-['Outfit']">
                    Enquiry Registered Successfully
                  </h3>
                  <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="text-[#D9A441] font-semibold">{clientName}</span>. 
                    Our technical lead has received your specifications and will deliver a preliminary proposal via {preferredContact} within 4 hours.
                  </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => triggerWhatsAppEnquiry(selectedDemo, `Following up on RFP submission for ${clientName}`)}
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-[#F3C973] to-[#D9A441] text-xs sm:text-sm"
                  >
                    <MessageSquareCode className="w-4 h-4 text-slate-950" />
                    <span>Follow Up on WhatsApp Now</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setClientName('');
                      setClientEmail('');
                      setClientPhone('');
                      setProjectDescription('');
                    }}
                    className="px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold text-white font-['Outfit']">
                    Client RFP Enquiry Form
                  </h3>
                  <p className="text-xs text-slate-400">
                    All fields marked with an asterisk (*) are required for tailored quote generation.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Marcus Vance"
                      className={`w-full px-4 py-3 rounded-xl bg-slate-900 border text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D9A441] transition-all ${
                        errors.clientName ? 'border-rose-500' : 'border-white/10'
                      }`}
                    />
                    {errors.clientName && (
                      <p className="text-rose-400 text-xs mt-1">{errors.clientName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Business Email Address *
                    </label>
                    <input
                      type="email"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="marcus@vancecapital.com"
                      className={`w-full px-4 py-3 rounded-xl bg-slate-900 border text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D9A441] transition-all ${
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
                      placeholder="+1 (555) 234-5678"
                      className={`w-full px-4 py-3 rounded-xl bg-slate-900 border text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D9A441] transition-all ${
                        errors.clientPhone ? 'border-rose-500' : 'border-white/10'
                      }`}
                    />
                    {errors.clientPhone && (
                      <p className="text-rose-400 text-xs mt-1">{errors.clientPhone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Selected Blueprint Reference
                    </label>
                    <select
                      value={selectedDemoId}
                      onChange={(e) => setSelectedDemoId(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-sm text-white focus:outline-none focus:border-[#D9A441]"
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
                      Target Budget Range
                    </label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-sm text-white focus:outline-none focus:border-[#D9A441]"
                    >
                      <option value="$1,500 - $3,000">$1,500 - $3,000 (Rapid Turnkey)</option>
                      <option value="$3,000 - $5,000">$3,000 - $5,000 (Commercial Scale)</option>
                      <option value="$5,000 - $10,000">$5,000 - $10,000 (Enterprise Tailored)</option>
                      <option value="$10,000+">$10,000+ (Multi-Platform Ecosystem)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Target Launch Date
                    </label>
                    <select
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-sm text-white focus:outline-none focus:border-[#D9A441]"
                    >
                      <option value="Urgent (7 - 10 Days)">Urgent (7 - 10 Days)</option>
                      <option value="2 - 4 Weeks">2 - 4 Weeks (Standard)</option>
                      <option value="1 - 2 Months">1 - 2 Months</option>
                      <option value="Flexible">Flexible Planning</option>
                    </select>
                  </div>
                </div>

                {/* Preferred Contact Method */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Preferred Communication Channel
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(['WhatsApp', 'Email', 'Phone', 'Video Call'] as const).map((method) => (
                      <button
                        type="button"
                        key={method}
                        onClick={() => setPreferredContact(method)}
                        className={`px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all text-center ${
                          preferredContact === method
                            ? 'bg-[#D9A441]/15 text-[#D9A441] border-[#D9A441]'
                            : 'bg-slate-900 text-slate-400 border-white/10 hover:text-white'
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
                    Scope Description &amp; Custom Requirements *
                  </label>
                  <textarea
                    rows={4}
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    placeholder="Describe your brand requirements, needed third-party API integrations (Payment, CRM, MLS, Logistics), user roles, and specific business goals..."
                    className={`w-full px-4 py-3 rounded-xl bg-slate-900 border text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D9A441] transition-all resize-none ${
                      errors.projectDescription ? 'border-rose-500' : 'border-white/10'
                    }`}
                  />
                  {errors.projectDescription && (
                    <p className="text-rose-400 text-xs mt-1">{errors.projectDescription}</p>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl font-bold text-slate-950 bg-gradient-to-r from-[#F3C973] via-[#D9A441] to-[#B8852B] hover:brightness-110 shadow-xl shadow-[#D9A441]/20 transition-all text-sm disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Transmitting RFP...' : 'Submit Commercial RFP'}</span>
                </button>
              </form>
            )}

          </div>
        </div>

      </div>

    </div>
  );
};
