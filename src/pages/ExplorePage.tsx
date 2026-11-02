import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { DemoFilters } from '../components/demos/DemoFilters';
import { DemoCard } from '../components/demos/DemoCard';
import { FilterOptions } from '../types';
import { 
  Sparkles, 
  LayoutGrid, 
  List, 
  RotateCcw, 
  FolderSearch,
  MessageSquareCode,
  Bot,
  X,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const ExplorePage: React.FC = () => {
  const { 
    demos, 
    activeCategoryFilter, 
    triggerWhatsAppEnquiry,
    aiSearchCriteria,
    clearAiSearch 
  } = useApp();

  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');

  const [filters, setFilters] = useState<FilterOptions>({
    searchQuery: '',
    category: activeCategoryFilter || 'all',
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

  // Filter & Sort calculation
  const filteredDemos = useMemo(() => {
    return demos.filter((demo) => {
      // AI Search Criteria active override
      if (aiSearchCriteria && aiSearchCriteria.matchedDemoIds.length > 0) {
        if (!aiSearchCriteria.matchedDemoIds.includes(demo.id)) {
          return false;
        }
      }

      // Category filter
      if (filters.category !== 'all' && demo.category !== filters.category) {
        return false;
      }

      // Download only filter
      if (filters.downloadOnly && (!demo.hasAuthorizedDownload || !demo.canDownload)) {
        return false;
      }

      // Preview validated filter
      if (filters.previewValidatedOnly && demo.previewStatus !== 'valid') {
        return false;
      }

      // CMS filter
      if (filters.cms && (!demo.cms || !demo.cms.toLowerCase().includes(filters.cms.toLowerCase()))) {
        return false;
      }

      // Marketplace filter
      if (filters.marketplace && !demo.sourceOrigin.toLowerCase().includes(filters.marketplace.toLowerCase())) {
        return false;
      }

      // Tech stack filter
      if (
        filters.techStack &&
        !demo.technologies.some((t) => t.toLowerCase().includes(filters.techStack.toLowerCase()))
      ) {
        return false;
      }

      // Search Query
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchesTitle = demo.title.toLowerCase().includes(query);
        const matchesDesc = (demo.description + ' ' + (demo.fullDescription || '')).toLowerCase();
        const matchesCategory = demo.categoryName.toLowerCase().includes(query);
        const matchesTech = demo.technologies.some((t) => t.toLowerCase().includes(query));
        const matchesIndustry = demo.clientIndustry.toLowerCase().includes(query);
        const matchesSource = demo.sourceOrigin.toLowerCase().includes(query);
        const matchesAuthor = (demo.sellerName || '').toLowerCase().includes(query);
        const matchesTags = (demo.tags || []).some((t) => t.toLowerCase().includes(query));

        if (!matchesTitle && !matchesDesc && !matchesCategory && !matchesTech && !matchesIndustry && !matchesSource && !matchesAuthor && !matchesTags) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'featured') {
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return b.viewsCount - a.viewsCount;
      }
      if (filters.sortBy === 'popular') {
        return b.viewsCount - a.viewsCount;
      }
      if (filters.sortBy === 'trending') {
        if (a.isTrending && !b.isTrending) return -1;
        if (!a.isTrending && b.isTrending) return 1;
        return b.rating - a.rating;
      }
      if (filters.sortBy === 'price-asc') {
        return a.indicativePrice - b.indicativePrice;
      }
      if (filters.sortBy === 'price-desc') {
        return b.indicativePrice - a.indicativePrice;
      }
      if (filters.sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return 0;
    });
  }, [demos, filters, aiSearchCriteria]);

  // Pagination slicing
  const totalPages = Math.ceil(filteredDemos.length / filters.pageSize) || 1;
  const currentPageSafe = Math.min(filters.page, totalPages);
  const startIndex = (currentPageSafe - 1) * filters.pageSize;
  const paginatedDemos = filteredDemos.slice(startIndex, startIndex + filters.pageSize);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setFilters((prev) => ({ ...prev, page: newPage }));
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      
      {/* Page Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D9A441]/10 text-[#D9A441] border border-[#D9A441]/20 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Global Website Discovery Engine</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-['Outfit']">
          Explore Global Digital Blueprints
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
          Index, inspect, and commission high-converting website designs, SaaS architectures, mobile applications, and enterprise systems from global marketplaces and authorized feeds.
        </p>
      </div>

      {/* AI Search Assistant Active Banner */}
      {aiSearchCriteria && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-[#101827] to-indigo-950/40 border border-[#D9A441]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#D9A441] text-slate-950 flex items-center justify-center shrink-0 shadow-md">
              <Bot className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-white font-['Outfit']">AI Natural Search Results</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {aiSearchCriteria.confidence}% match confidence
                </span>
                <span className="text-xs text-slate-400">for "{aiSearchCriteria.naturalQuery}"</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {aiSearchCriteria.explanation}
              </p>
              {aiSearchCriteria.matchedKeywords.length > 0 && (
                <div className="flex flex-wrap gap-1 pt-1">
                  {aiSearchCriteria.matchedKeywords.map((kw, idx) => (
                    <span key={idx} className="text-[10px] font-mono-code px-2 py-0.5 rounded-md bg-white/10 text-[#D9A441]">
                      #{kw}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button
            onClick={clearAiSearch}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300 bg-white/10 hover:bg-white/20 border border-white/15 transition-colors shrink-0 self-start sm:self-center"
          >
            <X className="w-3.5 h-3.5" />
            <span>Clear AI Query</span>
          </button>
        </div>
      )}

      {/* Filter Component */}
      <DemoFilters
        filters={filters}
        setFilters={setFilters}
        totalResults={filteredDemos.length}
      />

      {/* View Mode & Page Range Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <div className="text-xs text-slate-400">
          Showing <span className="font-bold text-white">{filteredDemos.length > 0 ? startIndex + 1 : 0} - {Math.min(startIndex + filters.pageSize, filteredDemos.length)}</span> of <span className="font-bold text-[#D9A441]">{filteredDemos.length}</span> matching blueprints
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          {/* Page size selector */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <span>Show:</span>
            <select
              value={filters.pageSize}
              onChange={(e) => setFilters((prev) => ({ ...prev, pageSize: Number(e.target.value), page: 1 }))}
              className="bg-slate-900 border border-white/10 rounded-lg px-2 py-1 text-xs text-white focus:outline-none"
            >
              <option value={12}>12 per page</option>
              <option value={24}>24 per page</option>
              <option value={48}>48 per page</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'grid'
                  ? 'bg-[#D9A441] text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Grid view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('compact')}
              className={`p-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'compact'
                  ? 'bg-[#D9A441] text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Compact list view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Demos Grid */}
      {paginatedDemos.length > 0 ? (
        <div
          className={`grid gap-6 sm:gap-8 ${
            viewMode === 'grid'
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1 md:grid-cols-2'
          }`}
        >
          {paginatedDemos.map((demo) => (
            <DemoCard key={demo.id} demo={demo} compact={viewMode === 'compact'} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 text-center rounded-3xl bg-[#101827] border border-white/10 space-y-5">
          <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center mx-auto text-slate-500">
            <FolderSearch className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white font-['Outfit']">
              No matching blueprints found
            </h3>
            <p className="text-slate-400 text-sm max-w-md mx-auto">
              We couldn't find any designs matching your specific combination of filters. Try clearing marketplace or CMS constraints.
            </p>
          </div>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                clearAiSearch();
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
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-200 bg-white/10 hover:bg-white/15 border border-white/10 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
            <button
              onClick={() => triggerWhatsAppEnquiry(null, 'I am looking for a custom solution not found in the showroom filters.')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-[#F3C973] to-[#D9A441]"
            >
              <MessageSquareCode className="w-3.5 h-3.5" />
              <span>Ask Agency Lead on WhatsApp</span>
            </button>
          </div>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-white/10 pt-6">
          <button
            onClick={() => handlePageChange(currentPageSafe - 1)}
            disabled={currentPageSafe <= 1}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900 border border-white/10 hover:border-[#D9A441] disabled:opacity-40 disabled:pointer-events-none transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                  currentPageSafe === pageNum
                    ? 'bg-[#D9A441] text-slate-950 shadow-md shadow-[#D9A441]/20'
                    : 'bg-slate-900 text-slate-300 hover:bg-white/10 border border-white/10'
                }`}
              >
                {pageNum}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPageSafe + 1)}
            disabled={currentPageSafe >= totalPages}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900 border border-white/10 hover:border-[#D9A441] disabled:opacity-40 disabled:pointer-events-none transition-all"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
};
