import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { INITIAL_CATEGORIES } from '../../data/initialCategories';
import { CategorySlug, FilterOptions } from '../../types';
import { 
  Search, 
  X, 
  RotateCcw, 
  Download, 
  ArrowUpDown,
  Sparkles,
  ShieldCheck,
  Globe,
  Store,
  Layers,
  Bot
} from 'lucide-react';

interface DemoFiltersProps {
  filters: FilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
  totalResults: number;
}

const POPULAR_TECHS = [
  'All',
  'Next.js',
  'React',
  'Tailwind CSS',
  'Flutter',
  'React Native',
  'Gemini 2.5 API',
  'PostgreSQL',
  'Stripe',
  'Supabase',
  'Node.js',
  'Vue.js'
];

const CMS_OPTIONS = [
  { label: 'All CMS & Frameworks', value: '' },
  { label: 'WordPress / WooCommerce', value: 'WordPress' },
  { label: 'Next.js / Headless React', value: 'Next.js' },
  { label: 'Webflow', value: 'Webflow' },
  { label: 'Framer', value: 'Framer' },
  { label: 'Shopify Liquid', value: 'Shopify' },
  { label: 'Custom Native / Vue', value: 'Custom Native' }
];

const MARKETPLACE_OPTIONS = [
  { label: 'All Sources & Marketplaces', value: '' },
  { label: 'ThemeForest', value: 'ThemeForest' },
  { label: 'CodeCanyon', value: 'CodeCanyon' },
  { label: 'Webflow Marketplace', value: 'Webflow' },
  { label: 'Framer Community', value: 'Framer' },
  { label: 'WordPress Directory', value: 'WordPress' },
  { label: 'GitHub Starters', value: 'GitHub' },
  { label: 'TemplateMonster', value: 'TemplateMonster' },
  { label: 'ImperionX Bespoke / Direct', value: 'ImperionX Bespoke' }
];

const SAMPLE_AI_PROMPTS = [
  "Show me modern hotel websites with booking systems and beautiful image galleries",
  "Pan-African fintech and mobile money dashboards",
  "E-commerce stores with multi-currency checkout",
  "School management systems with parent portal and attendance",
  "High-converting SaaS landing pages with pricing tables"
];

export const DemoFilters: React.FC<DemoFiltersProps> = ({
  filters,
  setFilters,
  totalResults
}) => {
  const { executeAiNaturalSearch, aiSearchCriteria, clearAiSearch, addToast } = useApp();
  const [aiInputText, setAiInputText] = useState('');
  const [isAiSearching, setIsAiSearching] = useState(false);
  const [showAiAssistant, setShowAiAssistant] = useState(false);

  const handleCategoryChange = (cat: CategorySlug | 'all') => {
    setFilters((prev) => ({ ...prev, category: cat, page: 1 }));
  };

  const handleTechChange = (tech: string) => {
    setFilters((prev) => ({ ...prev, techStack: tech === 'All' ? '' : tech, page: 1 }));
  };

  const handleCmsChange = (cmsVal: string) => {
    setFilters((prev) => ({ ...prev, cms: cmsVal, page: 1 }));
  };

  const handleMarketplaceChange = (marketVal: string) => {
    setFilters((prev) => ({ ...prev, marketplace: marketVal, page: 1 }));
  };

  const handleReset = () => {
    clearAiSearch();
    setAiInputText('');
    setFilters({
      searchQuery: '',
      category: 'all',
      techStack: '',
      cms: '',
      marketplace: '',
      industry: '',
      minPrice: 0,
      maxPrice: 10000,
      sortBy: 'featured',
      downloadOnly: false,
      previewValidatedOnly: false,
      viewMode: 'grid',
      page: 1,
      pageSize: 12
    });
  };

  const runAiPrompt = async (promptText: string) => {
    if (!promptText.trim()) return;
    setIsAiSearching(true);
    try {
      setAiInputText(promptText);
      const criteria = await executeAiNaturalSearch(promptText);
      addToast(
        'AI Intent Parsed',
        criteria.explanation,
        'success'
      );
    } catch {
      addToast('Search Error', 'Could not process query with AI.', 'error');
    } finally {
      setIsAiSearching(false);
    }
  };

  const hasActiveFilters =
    filters.searchQuery !== '' ||
    filters.category !== 'all' ||
    filters.techStack !== '' ||
    filters.cms !== '' ||
    filters.marketplace !== '' ||
    filters.downloadOnly ||
    filters.previewValidatedOnly ||
    filters.sortBy !== 'featured' ||
    aiSearchCriteria !== null;

  return (
    <div className="w-full bg-[#101827] border border-white/10 rounded-3xl p-5 sm:p-7 shadow-xl space-y-6">
      
      {/* AI Discovery Bar Toggle / Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-indigo-950/40 p-4 border border-[#D9A441]/25 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#F3C973] to-[#D9A441] flex items-center justify-center text-slate-950 shadow-md">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white font-['Outfit']">AI Natural Language Search Assistant</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#D9A441]/20 text-[#D9A441] border border-[#D9A441]/30">Intent Grounded</span>
              </div>
              <p className="text-[11px] text-slate-400">Ask in plain English: matches real database records without hallucinating products.</p>
            </div>
          </div>
          
          <button
            onClick={() => setShowAiAssistant(!showAiAssistant)}
            className="self-start sm:self-auto text-xs font-semibold px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D9A441]" />
            <span>{showAiAssistant ? 'Hide Assistant' : 'Open Assistant'}</span>
          </button>
        </div>

        {showAiAssistant && (
          <div className="space-y-3 pt-2 border-t border-white/5">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                runAiPrompt(aiInputText);
              }}
              className="flex gap-2"
            >
              <div className="relative flex-1">
                <input
                  type="text"
                  value={aiInputText}
                  onChange={(e) => setAiInputText(e.target.value)}
                  placeholder="e.g., 'Show me modern hotel websites with booking systems and beautiful image galleries'"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D9A441] transition-all"
                />
                {aiInputText && (
                  <button
                    type="button"
                    onClick={() => setAiInputText('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <button
                type="submit"
                disabled={isAiSearching || !aiInputText.trim()}
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#F3C973] to-[#D9A441] text-slate-950 hover:brightness-110 disabled:opacity-50 transition-all flex items-center gap-1.5 shrink-0"
              >
                {isAiSearching ? (
                  <span>Searching...</span>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Search with AI</span>
                  </>
                )}
              </button>
            </form>

            {/* Prompt Pills */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[10px] text-slate-400 font-semibold mr-1">Try asking:</span>
              {SAMPLE_AI_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => runAiPrompt(prompt)}
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-900/90 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10 transition-all text-left truncate max-w-[280px]"
                  title={prompt}
                >
                  "{prompt}"
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Top Search & Filter Dropdowns Row */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        
        {/* Search Bar */}
        <div className="md:col-span-5 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value, page: 1 }))}
            placeholder="Search titles, industries, keywords, authors..."
            className="w-full pl-11 pr-10 py-3 rounded-2xl bg-slate-900/90 border border-white/10 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D9A441] transition-all"
          />
          {filters.searchQuery && (
            <button
              onClick={() => setFilters((prev) => ({ ...prev, searchQuery: '', page: 1 }))}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* CMS Dropdown */}
        <div className="md:col-span-3">
          <div className="relative">
            <select
              value={filters.cms}
              onChange={(e) => handleCmsChange(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-white/10 text-xs font-semibold text-slate-200 focus:outline-none focus:border-[#D9A441] appearance-none pr-8 cursor-pointer"
            >
              {CMS_OPTIONS.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
            <Globe className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>

        {/* Marketplace Dropdown */}
        <div className="md:col-span-4">
          <div className="relative">
            <select
              value={filters.marketplace}
              onChange={(e) => handleMarketplaceChange(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-white/10 text-xs font-semibold text-slate-200 focus:outline-none focus:border-[#D9A441] appearance-none pr-8 cursor-pointer"
            >
              {MARKETPLACE_OPTIONS.map((m) => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>
            <Store className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>

      </div>

      {/* Second Row: Toggles, Sort, & Reset */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        
        <div className="flex flex-wrap items-center gap-2">
          {/* Verified Previews Toggle */}
          <button
            onClick={() => setFilters((prev) => ({ ...prev, previewValidatedOnly: !prev.previewValidatedOnly, page: 1 }))}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
              filters.previewValidatedOnly
                ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40 shadow-sm'
                : 'bg-slate-900 text-slate-400 border-white/10 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Verified Previews Only</span>
          </button>

          {/* Downloadable Toggle */}
          <button
            onClick={() => setFilters((prev) => ({ ...prev, downloadOnly: !prev.downloadOnly, page: 1 }))}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
              filters.downloadOnly
                ? 'bg-amber-500/15 text-[#D9A441] border-amber-500/40 shadow-sm'
                : 'bg-slate-900 text-slate-400 border-white/10 hover:text-white'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Downloadable Kits Only</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Sort Dropdown */}
          <div className="relative flex items-center">
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters((prev) => ({ ...prev, sortBy: e.target.value as any, page: 1 }))}
              className="px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-xs font-semibold text-slate-200 focus:outline-none focus:border-[#D9A441] appearance-none pr-8 cursor-pointer"
            >
              <option value="featured">Sort: Featured First</option>
              <option value="popular">Sort: Most Popular</option>
              <option value="trending">Sort: Trending</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Sort: Newest First</option>
            </select>
            <ArrowUpDown className="absolute right-3 pointer-events-none w-3.5 h-3.5 text-slate-400" />
          </div>

          {/* Reset Filters */}
          {hasActiveFilters && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-white/5 border border-white/10 transition-colors"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>

      </div>

      {/* Category Dropdown & Quick Grouping */}
      <div className="space-y-2 pt-2 border-t border-white/5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Official Global Classification (30 Categories)
          </span>
          <div className="relative">
            <select
              value={filters.category}
              onChange={(e) => handleCategoryChange(e.target.value as any)}
              className="px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-xs font-semibold text-[#D9A441] focus:outline-none focus:border-[#D9A441] cursor-pointer"
            >
              <option value="all">All 30 Categories</option>
              {INITIAL_CATEGORIES.map((c) => (
                <option key={c.id} value={c.slug}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Scrollable quick pills for popular categories */}
        <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
          <button
            onClick={() => handleCategoryChange('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filters.category === 'all'
                ? 'bg-[#D9A441] text-slate-950 font-bold'
                : 'bg-slate-900 text-slate-300 hover:bg-white/5 border border-white/10'
            }`}
          >
            All Categories
          </button>

          {INITIAL_CATEGORIES.slice(0, 12).map((cat) => {
            const isSelected = filters.category === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.slug)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-[#D9A441] text-slate-950 font-bold'
                    : 'bg-slate-900/80 text-slate-300 hover:bg-white/5 border border-white/10'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Technology Pills */}
      <div className="space-y-2 pt-2 border-t border-white/5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#D9A441]" />
            <span>Filter by Architecture / Technology</span>
          </span>
          {filters.techStack && (
            <button
              onClick={() => handleTechChange('All')}
              className="text-[10px] text-amber-400 hover:underline"
            >
              Clear Tech ({filters.techStack})
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {POPULAR_TECHS.map((tech) => {
            const isSelected =
              (tech === 'All' && !filters.techStack) || filters.techStack === tech;
            return (
              <button
                key={tech}
                onClick={() => handleTechChange(tech)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono-code transition-all ${
                  isSelected
                    ? 'bg-amber-400/20 text-[#D9A441] border border-[#D9A441]/50 font-bold'
                    : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-white/5'
                }`}
              >
                {tech}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Counter Bar */}
      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-400 border-t border-white/5">
        <div>
          Showing <span className="font-bold text-white">{totalResults}</span> verified blueprints
          {filters.category !== 'all' && (
            <span> in <span className="text-[#D9A441]">
              {INITIAL_CATEGORIES.find((c) => c.slug === filters.category)?.name}
            </span></span>
          )}
          {filters.cms && (
            <span> | CMS: <span className="text-white font-semibold">{filters.cms}</span></span>
          )}
          {filters.marketplace && (
            <span> | Source: <span className="text-white font-semibold">{filters.marketplace}</span></span>
          )}
        </div>
        <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#D9A441]" />
          <span>Real live previews &amp; client-ready delivery</span>
        </div>
      </div>

    </div>
  );
};
