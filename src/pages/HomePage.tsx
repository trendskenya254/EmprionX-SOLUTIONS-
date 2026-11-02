import React from 'react';
import { useApp } from '../context/AppContext';
import { INITIAL_CATEGORIES } from '../data/initialCategories';
import { DemoCard } from '../components/demos/DemoCard';
import { CategorySlug } from '../types';
import { 
  Sparkles, 
  ArrowRight, 
  MessageSquareCode, 
  ShieldCheck, 
  CheckCircle2, 
  Zap, 
  Code2, 
  Lock, 
  Clock, 
  Star,
  Users,
  Building,
  TrendingUp,
  Cpu,
  Smartphone,
  Briefcase,
  GraduationCap,
  UtensilsCrossed,
  Building2,
  Truck,
  ShoppingBag
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { demos, navigateTo, triggerWhatsAppEnquiry } = useApp();

  const featuredDemos = demos.filter((d) => d.isFeatured).slice(0, 6);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Briefcase': return <Briefcase className="w-6 h-6 text-[#D9A441]" />;
      case 'ShoppingBag': return <ShoppingBag className="w-6 h-6 text-[#D9A441]" />;
      case 'Smartphone': return <Smartphone className="w-6 h-6 text-[#D9A441]" />;
      case 'GraduationCap': return <GraduationCap className="w-6 h-6 text-[#D9A441]" />;
      case 'UtensilsCrossed': return <UtensilsCrossed className="w-6 h-6 text-[#D9A441]" />;
      case 'Building2': return <Building2 className="w-6 h-6 text-[#D9A441]" />;
      case 'Truck': return <Truck className="w-6 h-6 text-[#D9A441]" />;
      case 'Cpu': return <Cpu className="w-6 h-6 text-[#D9A441]" />;
      default: return <Sparkles className="w-6 h-6 text-[#D9A441]" />;
    }
  };

  return (
    <div className="space-y-24 pb-20">
      
      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 lg:pt-28 pb-16 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#D9A441]/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute top-1/4 right-10 w-[400px] h-[300px] bg-blue-600/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#101827] border border-[#D9A441]/40 shadow-lg shadow-[#D9A441]/10 animate-in fade-in zoom-in duration-300">
            <span className="w-2 h-2 rounded-full bg-[#D9A441] animate-ping" />
            <span className="text-xs sm:text-sm font-semibold text-[#D9A441] tracking-wide">
              IMPERIONX &bull; PREMIER DIGITAL CLIENT SHOWROOM
            </span>
          </div>

          {/* Heading */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] font-['Outfit']">
              Experience Real Solutions.{' '}
              <span className="gold-gradient-text">Commission with Absolute Certainty.</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
              Explore interactive live demos, native mobile applications, enterprise ERPs, and 
              AI systems engineered for rapid deployment. Pick your preferred solution architecture 
              and launch your tailored project in days.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => navigateTo('explore')}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-extrabold text-slate-950 bg-gradient-to-r from-[#F3C973] via-[#D9A441] to-[#B8852B] hover:brightness-110 shadow-2xl shadow-[#D9A441]/30 transition-all hover:scale-[1.02] active:scale-[0.98] text-base"
            >
              <span>Explore All Demos</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => triggerWhatsAppEnquiry()}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-white bg-[#101827] hover:bg-[#182235] border border-amber-500/30 hover:border-[#D9A441] shadow-lg transition-all text-base"
            >
              <MessageSquareCode className="w-5 h-5 text-emerald-400" />
              <span>WhatsApp Project Lead</span>
            </button>
          </div>

          {/* Agency Metrics Banner */}
          <div className="pt-12 max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 rounded-3xl bg-[#101827]/90 border border-white/10 backdrop-blur-xl shadow-2xl">
              <div className="space-y-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#D9A441] font-mono-code block">
                  30+
                </span>
                <span className="text-xs sm:text-sm text-slate-300 font-medium">
                  Verified Client Demos
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono-code block">
                  7-14
                </span>
                <span className="text-xs sm:text-sm text-slate-300 font-medium">
                  Days Average Delivery
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#D9A441] font-mono-code block">
                  100%
                </span>
                <span className="text-xs sm:text-sm text-slate-300 font-medium">
                  Full IP Ownership
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono-code block">
                  99.9%
                </span>
                <span className="text-xs sm:text-sm text-slate-300 font-medium">
                  Uptime &amp; SLA Promise
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Categories Grid Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#D9A441] uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tailored Industry Blueprints</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-['Outfit']">
              Client Solution Categories
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl">
              Every category represents a battle-tested architecture designed for enterprise conversion, 
              security, and frictionless user flows.
            </p>
          </div>

          <button
            onClick={() => navigateTo('explore')}
            className="flex items-center gap-2 text-sm font-bold text-[#D9A441] hover:text-white transition-colors self-start md:self-auto"
          >
            <span>View All Blueprints</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INITIAL_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigateTo('category', cat.slug)}
              className="group p-6 rounded-3xl bg-[#101827] border border-white/10 hover:border-[#D9A441]/50 hover:bg-[#182235]/70 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-[#D9A441]/10 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center group-hover:border-[#D9A441]/50 group-hover:scale-105 transition-all">
                  {getCategoryIcon(cat.iconName)}
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-lg font-bold text-white group-hover:text-[#D9A441] transition-colors font-['Outfit']">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono-code text-[#D9A441] font-semibold">
                  {cat.demoCount} Solutions
                </span>
                <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform text-white font-medium">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D9A441]" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Demos Carousel / Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#D9A441] uppercase">
              <Star className="w-3.5 h-3.5 fill-[#D9A441]" />
              <span>Handpicked Highlights</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-['Outfit']">
              Featured Client Demos
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl">
              Inspect working preview URLs, download authorized agency starter packages, and request custom adaptations via WhatsApp.
            </p>
          </div>

          <button
            onClick={() => navigateTo('explore')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
          >
            <span>Explore Entire Catalogue ({demos.length})</span>
            <ArrowRight className="w-4 h-4 text-[#D9A441]" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredDemos.map((demo) => (
            <DemoCard key={demo.id} demo={demo} />
          ))}
        </div>
      </section>

      {/* Agency Engineering Standards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#101827] to-[#182235] border border-amber-500/30 shadow-2xl space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold tracking-widest text-[#D9A441] uppercase">
              The ImperionX Guarantee
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-['Outfit']">
              Why Global Brands Choose ImperionX Showroom
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              We bridge the gap between abstract software proposals and tangible results. See your system running before you invest.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                <Code2 className="w-6 h-6 text-[#D9A441]" />
              </div>
              <h4 className="text-xl font-bold text-white font-['Outfit']">
                Clean Native Code, Zero Slop
              </h4>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                We deliver pure Next.js, React, React Native, and Flutter applications. No slow drag-and-drop page builders, no locked proprietary ecosystems.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                <Lock className="w-6 h-6 text-emerald-400" />
              </div>
              <h4 className="text-xl font-bold text-white font-['Outfit']">
                Enterprise Supabase &amp; RLS Security
              </h4>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                PostgreSQL database architecture with strict Row Level Security, role-based privileges, and isolated server-side secrets.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center">
                <Zap className="w-6 h-6 text-sky-400" />
              </div>
              <h4 className="text-xl font-bold text-white font-['Outfit']">
                7 - 14 Day Rapid Commissioning
              </h4>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Skip months of speculative UX wireframes. Start from our battle-tested showroom foundation and spend budget on your unique competitive advantage.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 4-Step Agency Workflow */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold tracking-widest text-[#D9A441] uppercase">
            Predictable Execution
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-['Outfit']">
            From Showroom Demo to Production
          </h2>
          <p className="text-slate-400 text-sm">
            Four disciplined steps from demo inspection to global cloud rollout.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Demo Selection',
              desc: 'Select an architectural prototype from our 8 categories that best mirrors your operational goals.'
            },
            {
              step: '02',
              title: 'Scope Customisation',
              desc: 'We tailor branding, integrate payment gateways (Stripe), connect CRM APIs, and configure access roles.'
            },
            {
              step: '03',
              title: 'Deployment & Testing',
              desc: 'Rigorous security penetration testing, lighthouse optimization, and cloud staging on Supabase/Vercel.'
            },
            {
              step: '04',
              title: 'Complete IP Handover',
              desc: 'Full Git repository transfer, documentation, environment secrets configuration, and ongoing SLA support.'
            }
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-[#101827] border border-white/10 space-y-3 relative group hover:border-[#D9A441]/40 transition-colors"
            >
              <span className="text-3xl font-extrabold text-[#D9A441] font-mono-code block">
                {item.step}
              </span>
              <h4 className="text-lg font-bold text-white font-['Outfit']">
                {item.title}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#182235] via-[#101827] to-[#0d1626] border border-amber-500/40 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center lg:text-left max-w-xl">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#D9A441]/20 text-[#D9A441] border border-[#D9A441]/40 inline-block">
              Rapid Agency Onboarding
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit']">
              Ready to Accelerate Your Digital Platform?
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Message our senior architect directly on WhatsApp or submit a detailed RFP. We provide complete fixed-cost quotations within 4 hours.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            <button
              onClick={() => triggerWhatsAppEnquiry()}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-slate-950 bg-gradient-to-r from-[#F3C973] to-[#D9A441] hover:brightness-110 shadow-xl shadow-[#D9A441]/20 transition-all text-sm"
            >
              <MessageSquareCode className="w-5 h-5 text-slate-950" />
              <span>WhatsApp Direct Enquiry</span>
            </button>
            <button
              onClick={() => navigateTo('contact')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-sm"
            >
              Submit RFP Form
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
