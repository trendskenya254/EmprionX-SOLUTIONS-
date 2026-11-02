import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { WebsiteCollection } from '../types';
import { DemoCard } from '../components/demos/DemoCard';
import { 
  Sparkles, 
  ArrowRight, 
  Layers, 
  ExternalLink, 
  Plus, 
  Filter, 
  ChevronRight, 
  ArrowLeft,
  Star,
  CheckCircle2,
  FolderOpen,
  MessageSquareCode
} from 'lucide-react';

export const CollectionsPage: React.FC = () => {
  const { 
    collections, 
    demos, 
    selectedCollectionSlug, 
    navigateTo, 
    userSession, 
    createCollection,
    triggerWhatsAppEnquiry 
  } = useApp();

  const [activeCollectionSlug, setActiveCollectionSlug] = useState<string | null>(selectedCollectionSlug || null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTagline, setNewTagline] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCover, setNewCover] = useState('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop');

  const activeCollection = collections.find((c) => c.slug === activeCollectionSlug);

  // Dynamically populate matching approved database records for the active collection
  const collectionDemos = activeCollection
    ? demos.filter((d) => {
        if (d.collectionIds && d.collectionIds.includes(activeCollection.id)) return true;
        if (activeCollection.categoryFilters && activeCollection.categoryFilters.includes(d.category)) return true;
        if (activeCollection.tagFilters && d.tags && d.tags.some((t) => activeCollection.tagFilters?.includes(t))) return true;
        return false;
      })
    : [];

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    createCollection({
      title: newTitle.trim(),
      slug: newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      tagline: newTagline.trim() || 'Curated Design Showcase',
      description: newDescription.trim() || 'Custom curated collection of approved digital blueprints.',
      coverImageUrl: newCover.trim(),
      itemCount: 0,
      featured: true,
      curator: userSession.userEmail || 'ImperionX Senior Curator',
      categoryFilters: [],
      tagFilters: []
    });

    setIsCreateModalOpen(false);
    setNewTitle('');
    setNewTagline('');
    setNewDescription('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* If looking at a single collection */}
      {activeCollection ? (
        <div className="space-y-10 animate-in fade-in duration-200">
          
          <button
            onClick={() => setActiveCollectionSlug(null)}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>&larr; Back to All Global Website Collections</span>
          </button>

          {/* Active Collection Hero */}
          <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl p-8 sm:p-12 space-y-6">
            <div className="absolute inset-0 z-0">
              <img
                src={activeCollection.coverImageUrl}
                alt=""
                className="w-full h-full object-cover opacity-25 blur-sm"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101827] via-[#101827]/90 to-transparent" />
            </div>

            <div className="relative z-10 space-y-4 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D9A441]/20 text-[#D9A441] border border-[#D9A441]/40 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Curated by {activeCollection.curator}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-['Outfit']">
                {activeCollection.title}
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {activeCollection.description}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-400">
                <span className="font-mono-code text-[#D9A441] font-bold">
                  {collectionDemos.length} Verified Solutions in Collection
                </span>
                <span>&bull;</span>
                <span>Live Previews Active</span>
                <span>&bull;</span>
                <span>100% Client Commissionable</span>
              </div>
            </div>

            <div className="relative z-10 pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => triggerWhatsAppEnquiry(null, `Inquiring about project commission from collection: ${activeCollection.title}`)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-[#F3C973] to-[#D9A441] hover:brightness-110 shadow-lg"
              >
                <MessageSquareCode className="w-4 h-4 text-slate-950" />
                <span>Request Custom Build from this Collection</span>
              </button>
            </div>
          </div>

          {/* Demos in Collection */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white font-['Outfit']">
                  Approved Collection Blueprints ({collectionDemos.length})
                </h3>
                <p className="text-xs text-slate-400">
                  Every design is verified with live preview links and turnkey agency deployment options.
                </p>
              </div>
            </div>

            {collectionDemos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {collectionDemos.map((demo) => (
                  <DemoCard key={demo.id} demo={demo} />
                ))}
              </div>
            ) : (
              <div className="p-12 text-center bg-[#101827] rounded-3xl border border-white/10 text-slate-400 text-sm">
                No matching approved blueprints currently assigned to this collection. Check the Review Queue to publish newly discovered items.
              </div>
            )}
          </div>

        </div>
      ) : (
        /* All Collections Overview */
        <div className="space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D9A441]/15 text-[#D9A441] border border-[#D9A441]/30 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Global Visual Discovery</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-['Outfit']">
                Global Website Collections
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Handpicked thematic galleries and curated design anthologies. Discover the top 100 business portals, modern e-commerce architectures, boutique hotel booking engines, and pan-African fintech inspiration.
              </p>
            </div>

            {userSession.isAuthenticated && (
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-[#F3C973] to-[#D9A441] shadow-lg hover:brightness-110 self-start md:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Create Collection (Admin)</span>
              </button>
            )}
          </div>

          {/* Collections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.map((col) => (
              <div
                key={col.id}
                onClick={() => setActiveCollectionSlug(col.slug)}
                className="group relative flex flex-col bg-[#101827] border border-white/10 hover:border-[#D9A441]/50 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-[#D9A441]/10 transition-all duration-300 cursor-pointer"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                  <img
                    src={col.coverImageUrl}
                    alt={col.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101827] via-black/40 to-transparent" />
                  
                  {col.featured && (
                    <span className="absolute top-4 left-4 flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-[#D9A441] text-slate-950 shadow">
                      <Star className="w-3 h-3 fill-current" />
                      <span>Featured Collection</span>
                    </span>
                  )}

                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white">
                    <span className="font-mono-code text-[11px] bg-black/60 px-2.5 py-1 rounded-lg border border-white/10 text-[#D9A441]">
                      {col.itemCount} Designs
                    </span>
                    <span className="text-[11px] text-slate-300">
                      Curated by {col.curator}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-[#D9A441] transition-colors font-['Outfit']">
                      {col.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                      {col.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-[#D9A441]">
                    <span>Explore Anthology</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ADMIN CREATE COLLECTION MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-[#101827] border border-amber-500/40 rounded-3xl p-6 sm:p-8 space-y-5">
            <h3 className="text-xl font-bold text-white font-['Outfit']">
              Create New Visual Collection
            </h3>
            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Collection Title *</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Modern African Fintech Inspiration"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-[#D9A441]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Tagline</label>
                <input
                  type="text"
                  value={newTagline}
                  onChange={(e) => setNewTagline(e.target.value)}
                  placeholder="e.g. Next-gen mobile money and banking gateways"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-[#D9A441]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Cover Image URL</label>
                <input
                  type="url"
                  value={newCover}
                  onChange={(e) => setNewCover(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-[#D9A441]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Explain the criteria and visual appeal of this collection..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-[#D9A441] resize-none"
                />
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-[#F3C973] to-[#D9A441]"
                >
                  Publish Collection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
