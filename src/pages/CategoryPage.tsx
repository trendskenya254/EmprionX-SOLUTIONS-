import React from 'react';
import { useApp } from '../context/AppContext';
import { INITIAL_CATEGORIES } from '../data/initialCategories';
import { DemoCard } from '../components/demos/DemoCard';
import { CategorySlug } from '../types';
import { 
  Briefcase, 
  ShoppingBag, 
  Smartphone, 
  GraduationCap, 
  UtensilsCrossed, 
  Building2, 
  Truck, 
  Cpu, 
  ArrowLeft, 
  Sparkles, 
  MessageSquareCode, 
  Layers 
} from 'lucide-react';

export const CategoryPage: React.FC = () => {
  const { selectedCategorySlug, demos, navigateTo, triggerWhatsAppEnquiry } = useApp();

  // Fallback to first category if none selected
  const category =
    INITIAL_CATEGORIES.find((c) => c.slug === selectedCategorySlug) ||
    INITIAL_CATEGORIES[0];

  const categoryDemos = demos.filter((d) => d.category === category.slug);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Briefcase': return <Briefcase className="w-8 h-8 text-[#D9A441]" />;
      case 'ShoppingBag': return <ShoppingBag className="w-8 h-8 text-[#D9A441]" />;
      case 'Smartphone': return <Smartphone className="w-8 h-8 text-[#D9A441]" />;
      case 'GraduationCap': return <GraduationCap className="w-8 h-8 text-[#D9A441]" />;
      case 'UtensilsCrossed': return <UtensilsCrossed className="w-8 h-8 text-[#D9A441]" />;
      case 'Building2': return <Building2 className="w-8 h-8 text-[#D9A441]" />;
      case 'Truck': return <Truck className="w-8 h-8 text-[#D9A441]" />;
      case 'Cpu': return <Cpu className="w-8 h-8 text-[#D9A441]" />;
      default: return <Sparkles className="w-8 h-8 text-[#D9A441]" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Back button */}
      <button
        onClick={() => navigateTo('explore')}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Categories</span>
      </button>

      {/* Category Hero */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#101827] to-[#182235] border border-amber-500/30 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-amber-500/40 flex items-center justify-center shrink-0 shadow-lg">
              {getCategoryIcon(category.iconName)}
            </div>
            <div>
              <span className="text-xs font-bold tracking-widest text-[#D9A441] uppercase">
                Industry Solution Suite
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit']">
                {category.name}
              </h1>
            </div>
          </div>

          <button
            onClick={() => triggerWhatsAppEnquiry(null, `Inquiring about commissioning a custom project in the ${category.name} category.`)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-[#F3C973] to-[#D9A441] hover:brightness-110 shadow-lg shadow-[#D9A441]/20 transition-all text-xs sm:text-sm self-start sm:self-auto"
          >
            <MessageSquareCode className="w-4 h-4 text-slate-950" />
            <span>Scope a {category.name} Project</span>
          </button>
        </div>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
          {category.description}
        </p>

        {/* Tech Stack Pills */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 font-semibold mr-2">Featured Stacks:</span>
          {category.highlightTech.map((tech, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-lg text-xs font-mono-code bg-black/40 text-[#D9A441] border border-amber-500/20"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Category Demos List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h3 className="text-xl font-bold text-white font-['Outfit']">
              Available {category.name} Blueprints ({categoryDemos.length})
            </h3>
            <p className="text-xs text-slate-400">
              Tested for high conversion, robust security, and seamless API integrations.
            </p>
          </div>
        </div>

        {categoryDemos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {categoryDemos.map((demo) => (
              <DemoCard key={demo.id} demo={demo} />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-[#101827] rounded-2xl border border-white/10 text-slate-400 text-sm">
            No demos currently published under this category. Check the Automation Center for pending imports!
          </div>
        )}
      </div>

      {/* Switch Category Links */}
      <div className="pt-10 border-t border-white/10 space-y-4">
        <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
          Explore Other Solution Categories
        </h4>
        <div className="flex flex-wrap gap-2">
          {INITIAL_CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => navigateTo('category', c.slug)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                c.slug === category.slug
                  ? 'bg-[#D9A441] text-slate-950 font-bold'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
