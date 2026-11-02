import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { INITIAL_CATEGORIES } from '../data/initialCategories';
import { SUPABASE_SQL_SCHEMA, SUPABASE_SETUP_GUIDE } from '../data/supabaseSchema';
import { Demo, CategorySlug, ClientEnquiry, QueuedImportItem, ImportSource, WebsiteCollection } from '../types';
import { 
  ShieldCheck, 
  ShieldAlert,
  Layers, 
  Database, 
  Bot, 
  Sparkles, 
  Plus, 
  Edit, 
  Trash2, 
  Star, 
  ExternalLink, 
  Download, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle, 
  Clock, 
  RefreshCw, 
  FileSpreadsheet, 
  Link2, 
  Copy, 
  MessageSquareCode, 
  Mail, 
  Check, 
  X, 
  SlidersHorizontal,
  ChevronRight,
  TrendingUp,
  Cpu,
  Zap,
  Info,
  Bookmark,
  Pause,
  Play,
  Ban,
  CheckSquare,
  Square,
  FolderPlus
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { 
    userSession, 
    logout, 
    demos, 
    addDemo, 
    updateDemo, 
    deleteDemo, 
    toggleFeatured,
    enquiries, 
    updateEnquiryStatus, 
    deleteEnquiry,
    importSources,
    queuedItems,
    importJobs,
    auditLogs,
    approveAndPublishItem,
    rejectQueueItem,
    updateQueueItem,
    bulkApproveQueue,
    bulkRejectQueue,
    toggleSelectQueueItem,
    selectAllQueueItems,
    clearQueueDuplicates,
    pauseImportJob,
    resumeImportJob,
    cancelImportJob,
    retryFailedJob,
    runPreviewHealthCheck,
    collections,
    createCollection,
    updateCollection,
    deleteCollection,
    testSourceConnection,
    runSourceSync,
    importFromUrl,
    importFromCsv,
    navigateTo,
    triggerWhatsAppEnquiry,
    addToast 
  } = useApp();

  // Active top tab: 'overview' | 'demos' | 'collections' | 'enquiries' | 'automation' | 'supabase'
  const [activeTab, setActiveTab] = useState<'overview' | 'demos' | 'collections' | 'enquiries' | 'automation' | 'supabase'>('overview');

  // Automation sub-tab: 'sources' | 'queue' | 'url-import' | 'csv-import' | 'logs'
  const [automationSubTab, setAutomationSubTab] = useState<'sources' | 'queue' | 'url-import' | 'csv-import' | 'logs'>('queue');

  // Health check state
  const [isHealthChecking, setIsHealthChecking] = useState(false);

  // Collections form state
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
  const [colTitle, setColTitle] = useState('');
  const [colTagline, setColTagline] = useState('');
  const [colDesc, setColDesc] = useState('');
  const [colCover, setColCover] = useState('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop');

  // Search in demos
  const [demoSearch, setDemoSearch] = useState('');
  const [enquiryStatusFilter, setEnquiryStatusFilter] = useState<string>('all');

  // New / Edit Demo Modal State
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [editingDemoId, setEditingDemoId] = useState<string | null>(null);
  const [demoFormData, setDemoFormData] = useState<Partial<Demo>>({
    title: '',
    category: 'business-websites',
    tagline: '',
    description: '',
    fullDescription: '',
    features: ['Responsive UI architecture', 'Stripe checkout ready'],
    technologies: ['Next.js', 'React', 'Tailwind CSS'],
    indicativePrice: 2800,
    deliveryTimeline: '10 - 14 Days',
    thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    livePreviewUrl: 'https://preview.themeforest.net',
    hasAuthorizedDownload: false,
    canDownload: false,
    downloadFileName: '',
    downloadFileSize: '',
    licenseType: 'Third-Party Preview Only (External Licensing Required)',
    isFeatured: false,
    isSample: true,
    clientIndustry: 'Corporate Business'
  });

  // URL Import State
  const [urlInput, setUrlInput] = useState('');
  const [urlNotes, setUrlNotes] = useState('');
  const [isUrlImporting, setIsUrlImporting] = useState(false);

  // CSV Import State
  const [csvContent, setCsvContent] = useState('');

  // Source Connection testing state
  const [testingSourceId, setTestingSourceId] = useState<string | null>(null);
  const [syncingSourceId, setSyncingSourceId] = useState<string | null>(null);

  // Demo CRUD actions
  const openCreateDemo = () => {
    setEditingDemoId(null);
    setDemoFormData({
      title: '',
      category: 'business-websites',
      tagline: '',
      description: '',
      fullDescription: '',
      features: ['Modern responsive design', 'Integrated API endpoints'],
      technologies: ['Next.js', 'React', 'Tailwind CSS'],
      indicativePrice: 2800,
      deliveryTimeline: '10 - 14 Business Days',
      thumbnailUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
      livePreviewUrl: 'https://preview.themeforest.net',
      hasAuthorizedDownload: false,
      canDownload: false,
      downloadFileName: '',
      downloadFileSize: '',
      licenseType: 'Third-Party Preview Only (External Licensing Required)',
      isFeatured: false,
      isSample: false,
      clientIndustry: 'Corporate Enterprise'
    });
    setIsDemoModalOpen(true);
  };

  const openEditDemo = (demo: Demo) => {
    setEditingDemoId(demo.id);
    setDemoFormData({ ...demo });
    setIsDemoModalOpen(true);
  };

  const handleSaveDemo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!demoFormData.title?.trim()) {
      addToast('Validation Error', 'Title is required.', 'error');
      return;
    }

    const catSlug = (demoFormData.category as CategorySlug) || 'business-websites';
    const catName = INITIAL_CATEGORIES.find((c) => c.slug === catSlug)?.name || 'Business Websites';

    if (editingDemoId) {
      updateDemo(editingDemoId, {
        ...demoFormData,
        category: catSlug,
        categoryName: catName
      });
    } else {
      const newDemo: Demo = {
        id: `demo-${Date.now()}`,
        title: demoFormData.title || 'Untitled Demo',
        slug: (demoFormData.title || 'demo')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, ''),
        category: catSlug,
        categoryName: catName,
        tagline: demoFormData.tagline || '',
        description: demoFormData.description || '',
        fullDescription: demoFormData.fullDescription || demoFormData.description || '',
        features: demoFormData.features || ['Turnkey deployment ready'],
        technologies: demoFormData.technologies || ['React', 'Next.js', 'Tailwind CSS'],
        indicativePrice: Number(demoFormData.indicativePrice) || 2500,
        deliveryTimeline: demoFormData.deliveryTimeline || '10 - 14 Days',
        thumbnailUrl: demoFormData.thumbnailUrl || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
        screenshots: [demoFormData.thumbnailUrl || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop'],
        livePreviewUrl: demoFormData.livePreviewUrl || 'https://preview.themeforest.net',
        hasAuthorizedDownload: Boolean(demoFormData.hasAuthorizedDownload),
        canDownload: Boolean(demoFormData.hasAuthorizedDownload),
        downloadFileName: demoFormData.downloadFileName,
        downloadFileSize: demoFormData.downloadFileSize,
        licenseType: demoFormData.licenseType || 'Third-Party Preview Only (External Licensing Required)',
        downloadNotice: demoFormData.hasAuthorizedDownload 
          ? 'Agency-authored deliverable with verified redistribution rights.'
          : 'Third-party commercial design preview. Direct file download is restricted.',
        isFeatured: Boolean(demoFormData.isFeatured),
        isSample: Boolean(demoFormData.isSample),
        rating: 4.9,
        reviewsCount: 12,
        viewsCount: 45,
        clientIndustry: demoFormData.clientIndustry || catName,
        sourceOrigin: 'ImperionX Bespoke',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      addDemo(newDemo);
    }

    setIsDemoModalOpen(false);
  };

  // URL import handler
  const handleUrlImportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    setIsUrlImporting(true);
    const result = await importFromUrl(urlInput.trim(), urlNotes.trim());
    setIsUrlImporting(false);

    if (result.success) {
      setUrlInput('');
      setUrlNotes('');
      setAutomationSubTab('queue');
    }
  };

  // CSV sample loader
  const handleLoadSampleCsv = () => {
    const sample = `"Title","Seller","OriginalUrl","PreviewUrl","Price","Category"
"Velox Electric Supercar Showcase","ApexMotors","https://themeforest.net/item/velox-motors/48190123","https://preview.themeforest.net/item/velox-motors/full_screen_preview/48190123","3400","business-websites"
"Zenith Real Estate Asset Fund","ZenithGroup","https://themeforest.net/item/zenith-re/51293810","https://preview.themeforest.net/item/zenith-re/full_screen_preview/51293810","3900","real-estate-websites"
"Bento Courier Quick Route Driver","RouteLabs","https://codecanyon.net/item/bento-courier/29188471","https://codecanyon.net/item/bento-courier/full_screen_preview/29188471","4500","delivery-applications"`;
    setCsvContent(sample);
  };

  const handleCsvImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!csvContent.trim()) {
      addToast('CSV Empty', 'Please paste CSV content or load sample data.', 'warning');
      return;
    }
    const result = importFromCsv(csvContent);
    if (result.imported > 0) {
      setCsvContent('');
      setAutomationSubTab('queue');
    }
  };

  // Source test connection
  const handleTestSource = async (sourceId: string) => {
    setTestingSourceId(sourceId);
    const res = await testSourceConnection(sourceId);
    setTestingSourceId(null);
    addToast(
      res.success ? 'Connection Validated' : 'Connection Check Failed',
      `${res.message} (Ping: ${res.latencyMs}ms)`,
      res.success ? 'success' : 'error'
    );
  };

  // Source sync runner
  const handleRunSync = async (sourceId: string) => {
    setSyncingSourceId(sourceId);
    await runSourceSync(sourceId);
    setSyncingSourceId(null);
  };

  // Filtered demos in admin
  const filteredAdminDemos = demos.filter((d) => {
    if (!demoSearch.trim()) return true;
    const q = demoSearch.toLowerCase();
    return (
      d.title.toLowerCase().includes(q) ||
      d.categoryName.toLowerCase().includes(q) ||
      d.sourceOrigin.toLowerCase().includes(q)
    );
  });

  // Filtered enquiries in admin
  const filteredEnquiries = enquiries.filter((e) => {
    if (enquiryStatusFilter === 'all') return true;
    return e.status === enquiryStatusFilter;
  });

  const pendingQueueCount = queuedItems.filter((q) => q.reviewStatus === 'pending' || q.reviewStatus === 'duplicate_flagged').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Top Admin Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#101827] border border-amber-500/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#D9A441] to-[#B8852B] p-0.5 shadow-xl flex items-center justify-center shrink-0">
            <div className="w-full h-full bg-[#0a0f1d] rounded-[14px] flex items-center justify-center">
              <ShieldCheck className="w-7 h-7 text-[#D9A441]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">
                ImperionX Admin Suite
              </h1>
              <span className="text-[10px] uppercase font-mono-code bg-[#D9A441]/15 text-[#D9A441] px-2 py-0.5 rounded border border-[#D9A441]/30">
                Superadmin
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Logged in as <span className="text-slate-200 font-medium">{userSession.userEmail || 'admin@imperionx.agency'}</span> &bull; Full CRUD &amp; Automated Discovery Engine
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-stretch md:self-auto justify-end">
          <button
            onClick={() => navigateTo('home')}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          >
            Showroom View
          </button>
          <button
            onClick={logout}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/10 text-xs sm:text-sm font-semibold">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all shrink-0 ${
            activeTab === 'overview'
              ? 'bg-[#D9A441] text-slate-950 font-bold shadow-md'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Overview</span>
        </button>

        <button
          onClick={() => setActiveTab('demos')}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all shrink-0 ${
            activeTab === 'demos'
              ? 'bg-[#D9A441] text-slate-950 font-bold shadow-md'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Showroom Demos ({demos.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('collections')}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all shrink-0 ${
            activeTab === 'collections'
              ? 'bg-[#D9A441] text-slate-950 font-bold shadow-md'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Curated Collections ({collections.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('enquiries')}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all shrink-0 ${
            activeTab === 'enquiries'
              ? 'bg-[#D9A441] text-slate-950 font-bold shadow-md'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>Client Enquiries ({enquiries.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('automation')}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all shrink-0 relative ${
            activeTab === 'automation'
              ? 'bg-[#D9A441] text-slate-950 font-bold shadow-md'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <Bot className="w-4 h-4" />
          <span>Automation Center</span>
          {pendingQueueCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center font-bold">
              {pendingQueueCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('supabase')}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all shrink-0 ${
            activeTab === 'supabase'
              ? 'bg-[#D9A441] text-slate-950 font-bold shadow-md'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>Supabase Architecture</span>
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          {/* Metrics Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-6 rounded-3xl bg-[#101827] border border-white/10 space-y-2">
              <span className="text-xs text-slate-400 font-medium">Published Demos</span>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-extrabold text-white font-mono-code">{demos.length}</span>
                <span className="text-xs text-[#D9A441] font-semibold">{demos.filter((d) => d.isFeatured).length} Featured</span>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#101827] border border-white/10 space-y-2">
              <span className="text-xs text-slate-400 font-medium">Active Client Leads</span>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-extrabold text-emerald-400 font-mono-code">{enquiries.length}</span>
                <span className="text-xs text-slate-400">&lt; 4h Response SLA</span>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#101827] border border-white/10 space-y-2">
              <span className="text-xs text-slate-400 font-medium">Pending Review Queue</span>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-extrabold text-[#D9A441] font-mono-code">{pendingQueueCount}</span>
                <span className="text-xs text-amber-400 font-medium">Awaiting Approval</span>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#101827] border border-white/10 space-y-2">
              <span className="text-xs text-slate-400 font-medium">Discovery Adapters</span>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-extrabold text-white font-mono-code">{importSources.length}</span>
                <span className="text-xs text-emerald-400 font-medium">Operational</span>
              </div>
            </div>
          </div>

          {/* Quick Actions & Recent Enquiries */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Recent Enquiries Box */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-[#101827] border border-white/10 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white font-['Outfit']">Recent Client Inquiries</h3>
                  <p className="text-xs text-slate-400">Incoming prospective project commissions</p>
                </div>
                <button
                  onClick={() => setActiveTab('enquiries')}
                  className="text-xs font-bold text-[#D9A441] hover:underline"
                >
                  Manage All Leads &rarr;
                </button>
              </div>

              <div className="space-y-3">
                {enquiries.slice(0, 3).map((enq) => (
                  <div key={enq.id} className="p-4 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between gap-4">
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white truncate">{enq.clientName}</span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded uppercase tracking-wider ${
                          enq.status === 'contract_signed' ? 'bg-emerald-500/20 text-emerald-400' :
                          enq.status === 'proposal_sent' ? 'bg-sky-500/20 text-sky-400' :
                          'bg-amber-500/20 text-amber-400'
                        }`}>
                          {enq.status.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 truncate max-w-sm">
                        {enq.selectedDemoTitle || 'Custom RFP'} &bull; {enq.budget}
                      </p>
                    </div>

                    <button
                      onClick={() => triggerWhatsAppEnquiry(null, `Replying to enquiry: ${enq.clientName}`)}
                      className="p-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 shrink-0"
                      title="Reply on WhatsApp"
                    >
                      <MessageSquareCode className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Automation Highlights */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-[#101827] border border-white/10 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white font-['Outfit']">Automation Center</h3>
                  <p className="text-xs text-slate-400">Automated curation &amp; discovery status</p>
                </div>
                <button
                  onClick={() => setActiveTab('automation')}
                  className="text-xs font-bold text-[#D9A441] hover:underline"
                >
                  Open Center &rarr;
                </button>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-semibold">Active Discovery Adapters:</span>
                    <span className="font-mono-code text-emerald-400">Envato, Framer, Webflow</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-semibold">Duplicate Prevention:</span>
                    <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                      <Check className="w-3.5 h-3.5" /> Enforced
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-semibold">Redistribution Rights:</span>
                    <span className="text-amber-400 font-semibold">Strict Preview Redirection</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setActiveTab('automation');
                      setAutomationSubTab('url-import');
                    }}
                    className="flex-1 py-3 px-4 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors text-center"
                  >
                    + Single URL Import
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('automation');
                      setAutomationSubTab('csv-import');
                    }}
                    className="flex-1 py-3 px-4 rounded-xl text-xs font-bold text-slate-950 bg-[#D9A441] hover:brightness-110 transition-colors text-center"
                  >
                    + CSV Batch Import
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: SHOWROOM DEMOS CRUD */}
      {activeTab === 'demos' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Header Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={demoSearch}
                onChange={(e) => setDemoSearch(e.target.value)}
                placeholder="Search demos by title, category, or author..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#101827] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D9A441]"
              />
            </div>

            <button
              onClick={openCreateDemo}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-[#F3C973] to-[#D9A441] shadow-lg hover:brightness-110 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Demo Record</span>
            </button>
          </div>

          {/* Demos Table */}
          <div className="bg-[#101827] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900/80 border-b border-white/10 text-slate-400 uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-4 px-6">Demo Solution</th>
                    <th className="py-4 px-4">Category</th>
                    <th className="py-4 px-4">Price</th>
                    <th className="py-4 px-4">Download Permission</th>
                    <th className="py-4 px-4">Featured</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  {filteredAdminDemos.map((demo) => (
                    <tr key={demo.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={demo.thumbnailUrl}
                            alt=""
                            className="w-12 h-9 rounded-lg object-cover bg-slate-900 border border-white/10 shrink-0"
                          />
                          <div className="min-w-0">
                            <span className="font-bold text-white text-sm block truncate max-w-xs">
                              {demo.title}
                            </span>
                            <span className="text-[11px] text-slate-400 font-mono-code">
                              {demo.sourceOrigin} {demo.isSample ? '• Sample Record' : ''}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-white/5 border border-white/10 text-[#D9A441]">
                          {demo.categoryName}
                        </span>
                      </td>

                      <td className="py-4 px-4 font-mono-code font-bold text-white text-sm">
                        ${demo.indicativePrice.toLocaleString()}
                      </td>

                      <td className="py-4 px-4">
                        {demo.hasAuthorizedDownload ? (
                          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-medium">
                            <ShieldCheck className="w-3 h-3" />
                            <span>Downloadable Kit</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 bg-white/5 px-2 py-0.5 rounded">
                            <ShieldAlert className="w-3 h-3 text-amber-500" />
                            <span>Preview Only</span>
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-4">
                        <button
                          onClick={() => toggleFeatured(demo.id)}
                          className={`p-1.5 rounded-lg border transition-all ${
                            demo.isFeatured
                              ? 'bg-[#D9A441] text-slate-950 border-[#D9A441]'
                              : 'bg-white/5 text-slate-500 border-white/10 hover:text-white'
                          }`}
                          title="Toggle featured status"
                        >
                          <Star className="w-4 h-4 fill-current" />
                        </button>
                      </td>

                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => window.open(demo.livePreviewUrl, '_blank', 'noopener,noreferrer')}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
                            title="Open Preview URL"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => openEditDemo(demo)}
                            className="p-1.5 rounded-lg text-amber-400 hover:text-amber-300 hover:bg-amber-400/10"
                            title="Edit Demo Details"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteDemo(demo.id)}
                            className="p-1.5 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-500/10"
                            title="Delete Demo Record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2.5: CURATED WEBSITE COLLECTIONS */}
      {activeTab === 'collections' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Header Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white font-['Outfit']">
                Curated Website Collections &amp; Anthologies ({collections.length})
              </h3>
              <p className="text-xs text-slate-400">
                Editorial directories grouping approved website blueprints by industry, theme, and geography.
              </p>
            </div>

            <button
              onClick={() => setIsCollectionModalOpen(true)}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-[#F3C973] to-[#D9A441] shadow-lg hover:brightness-110 transition-all self-start sm:self-auto"
            >
              <FolderPlus className="w-4 h-4" />
              <span>+ Create Curated Collection</span>
            </button>
          </div>

          {/* Collections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((col) => {
              const matchedCount = demos.filter((d) => {
                if (d.collectionIds && d.collectionIds.includes(col.id)) return true;
                if (col.categoryFilters && col.categoryFilters.includes(d.category)) return true;
                return false;
              }).length;

              return (
                <div
                  key={col.id}
                  className="rounded-3xl bg-[#101827] border border-white/10 overflow-hidden shadow-xl flex flex-col justify-between group hover:border-[#D9A441]/50 transition-all"
                >
                  <div>
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
                      <img
                        src={col.coverImageUrl}
                        alt={col.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#101827] via-transparent to-transparent" />
                      <div className="absolute top-3 right-3">
                        <span className="px-2.5 py-1 rounded-xl text-[10px] font-bold bg-black/70 backdrop-blur-md text-[#D9A441] border border-[#D9A441]/30">
                          {matchedCount} Blueprints
                        </span>
                      </div>
                    </div>

                    <div className="p-5 space-y-2">
                      <span className="text-[10px] uppercase font-mono-code text-[#D9A441] tracking-wider block font-bold">
                        Curated by {col.curator}
                      </span>
                      <h4 className="text-base font-bold text-white font-['Outfit']">
                        {col.title}
                      </h4>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {col.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 flex items-center justify-between border-t border-white/5 mt-3 pt-3">
                    <button
                      onClick={() => navigateTo('collections', null, null, col.slug)}
                      className="text-xs font-semibold text-[#D9A441] hover:underline flex items-center gap-1"
                    >
                      <span>View in Showroom</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Delete collection "${col.title}"?`)) {
                          deleteCollection(col.id);
                        }
                      }}
                      className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors"
                      title="Delete Collection"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Collection Creation Modal */}
          {isCollectionModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
              <div className="w-full max-w-lg rounded-3xl bg-[#101827] border border-amber-500/30 p-6 sm:p-8 space-y-5 shadow-2xl">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white font-['Outfit']">
                    Create Curated Collection
                  </h3>
                  <button
                    onClick={() => setIsCollectionModalOpen(false)}
                    className="p-1 text-slate-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!colTitle.trim()) return;
                    createCollection({
                      title: colTitle.trim(),
                      slug: colTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
                      tagline: colTagline.trim() || 'Curated Design Anthology',
                      description: colDesc.trim() || 'Custom curated directory of approved website designs.',
                      coverImageUrl: colCover.trim(),
                      itemCount: 0,
                      featured: true,
                      curator: 'ImperionX Editorial Board'
                    });
                    setIsCollectionModalOpen(false);
                    setColTitle('');
                    setColTagline('');
                    setColDesc('');
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Collection Title *</label>
                    <input
                      type="text"
                      value={colTitle}
                      onChange={(e) => setColTitle(e.target.value)}
                      placeholder="e.g. Modern African Business Website Inspiration"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D9A441]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Tagline</label>
                    <input
                      type="text"
                      value={colTagline}
                      onChange={(e) => setColTagline(e.target.value)}
                      placeholder="e.g. High-converting digital architectures for African enterprises"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D9A441]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
                    <textarea
                      rows={3}
                      value={colDesc}
                      onChange={(e) => setColDesc(e.target.value)}
                      placeholder="Detailed editorial scope of this collection..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D9A441] resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Cover Image URL</label>
                    <input
                      type="url"
                      value={colCover}
                      onChange={(e) => setColCover(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D9A441]"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsCollectionModalOpen(false)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-white/5"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-[#F3C973] to-[#D9A441] hover:brightness-110 shadow"
                    >
                      Publish Collection
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </div>
      )}

      {/* TAB 3: CLIENT ENQUIRIES MANAGEMENT */}
      {activeTab === 'enquiries' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white font-['Outfit']">
                Client Lead Pipeline &amp; Project Enquiries
              </h3>
              <p className="text-xs text-slate-400">
                Manage incoming client commission requests, advance sales stages, and respond via WhatsApp.
              </p>
            </div>

            {/* Filter by status */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-semibold">Stage:</span>
              <select
                value={enquiryStatusFilter}
                onChange={(e) => setEnquiryStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-[#101827] border border-white/10 text-xs text-white focus:outline-none focus:border-[#D9A441]"
              >
                <option value="all">All Stages ({enquiries.length})</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="discovery">Discovery</option>
                <option value="proposal_sent">Proposal Sent</option>
                <option value="contract_signed">Contract Signed</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {filteredEnquiries.map((enq) => (
              <div
                key={enq.id}
                className="p-6 rounded-3xl bg-[#101827] border border-white/10 space-y-4 shadow-xl"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-[#D9A441] flex items-center justify-center font-bold text-sm">
                      {enq.clientName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white font-['Outfit']">{enq.clientName}</h4>
                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span className="font-mono-code">{enq.clientEmail}</span>
                        <span>&bull;</span>
                        <span className="font-mono-code text-emerald-400">{enq.clientPhone}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <select
                      value={enq.status}
                      onChange={(e) => updateEnquiryStatus(enq.id, e.target.value as any)}
                      className="px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 text-xs font-semibold text-[#D9A441] focus:outline-none"
                    >
                      <option value="new">Status: New</option>
                      <option value="contacted">Status: Contacted</option>
                      <option value="discovery">Status: Discovery</option>
                      <option value="proposal_sent">Status: Proposal Sent</option>
                      <option value="contract_signed">Status: Contract Signed</option>
                      <option value="closed">Status: Closed</option>
                    </select>

                    <button
                      onClick={() => triggerWhatsAppEnquiry(null, `Hello ${enq.clientName}, this is the ImperionX Project Lead following up on your ${enq.selectedDemoTitle || 'custom'} inquiry.`)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-950 bg-gradient-to-r from-[#F3C973] to-[#D9A441]"
                      title="Direct WhatsApp response"
                    >
                      <MessageSquareCode className="w-3.5 h-3.5" />
                      <span>WhatsApp Client</span>
                    </button>

                    <button
                      onClick={() => deleteEnquiry(enq.id)}
                      className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10"
                      title="Delete record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-0.5">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Selected Blueprint</span>
                    <span className="font-semibold text-white block truncate">{enq.selectedDemoTitle || 'General RFP'}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-0.5">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Budget &amp; Timeline</span>
                    <span className="font-semibold text-[#D9A441] block">{enq.budget} &bull; {enq.timeline}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-0.5">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Preferred Channel</span>
                    <span className="font-semibold text-emerald-400 block">{enq.preferredContact}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-xs text-slate-300 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Project Description:</span>
                  <p className="leading-relaxed">{enq.projectDescription}</p>
                </div>

                {enq.internalNotes && (
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200">
                    <span className="font-bold block mb-0.5">Internal Agency Notes:</span>
                    {enq.internalNotes}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      )}

      {/* TAB 4: AUTOMATION CENTER (DEMO DISCOVERY & IMPORT SYSTEM) */}
      {activeTab === 'automation' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          {/* Automation Header Banner */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#101827] via-[#182235] to-[#101827] border border-amber-500/30 shadow-2xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#D9A441] uppercase tracking-wider">
                  <Bot className="w-4 h-4" />
                  <span>Demo Discovery &amp; Automated Curation Engine</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">
                  ImperionX Automation Center
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-3 py-1.5 rounded-xl bg-black/60 border border-white/10 text-xs text-slate-300 font-mono-code">
                  Pending Review: <strong className="text-[#D9A441]">{pendingQueueCount}</strong>
                </span>
              </div>
            </div>

            {/* Strict Compliance Warning Banner */}
            <div className="p-4 rounded-2xl bg-black/60 border border-amber-500/40 text-xs text-slate-300 leading-relaxed flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-[#D9A441] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white">Compliance &amp; Anti-Scraping Guarantee: </span>
                Our adapters strictly use official APIs, authorised feeds, and documented public endpoints. 
                Third-party source code, ZIP packages, and paid assets are never downloaded or redistributed. 
                Approved listings are stored with full attribution, original item URLs, and live external preview links.
              </div>
            </div>

            {/* Automation Sub-Navigation */}
            <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-white/10 text-xs font-semibold">
              <button
                onClick={() => setAutomationSubTab('queue')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  automationSubTab === 'queue'
                    ? 'bg-[#D9A441] text-slate-950 font-bold shadow'
                    : 'bg-white/5 text-slate-300 hover:text-white'
                }`}
              >
                Review Queue ({queuedItems.length})
              </button>
              <button
                onClick={() => setAutomationSubTab('sources')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  automationSubTab === 'sources'
                    ? 'bg-[#D9A441] text-slate-950 font-bold shadow'
                    : 'bg-white/5 text-slate-300 hover:text-white'
                }`}
              >
                Source Adapters ({importSources.length})
              </button>
              <button
                onClick={() => setAutomationSubTab('url-import')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  automationSubTab === 'url-import'
                    ? 'bg-[#D9A441] text-slate-950 font-bold shadow'
                    : 'bg-white/5 text-slate-300 hover:text-white'
                }`}
              >
                Single URL Import
              </button>
              <button
                onClick={() => setAutomationSubTab('csv-import')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  automationSubTab === 'csv-import'
                    ? 'bg-[#D9A441] text-slate-950 font-bold shadow'
                    : 'bg-white/5 text-slate-300 hover:text-white'
                }`}
              >
                CSV Batch Import
              </button>
              <button
                onClick={() => setAutomationSubTab('logs')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  automationSubTab === 'logs'
                    ? 'bg-[#D9A441] text-slate-950 font-bold shadow'
                    : 'bg-white/5 text-slate-300 hover:text-white'
                }`}
              >
                Import Jobs &amp; Audit Logs
              </button>
            </div>
          </div>

          {/* SUBTAB 1: REVIEW QUEUE */}
          {automationSubTab === 'queue' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-white font-['Outfit']">
                    Staging &amp; Review Queue ({queuedItems.length})
                  </h3>
                  <p className="text-xs text-slate-400">
                    All staged listings undergo AI categorization &amp; duplicate verification before one-click approval into the Showroom.
                  </p>
                </div>
              </div>

              {/* Bulk Operations Toolbar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-black/40 border border-white/10">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      const allSelected = queuedItems.length > 0 && queuedItems.every((q) => q.selectedForBulkAction);
                      selectAllQueueItems(!allSelected);
                    }}
                    className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white"
                  >
                    {queuedItems.length > 0 && queuedItems.every((q) => q.selectedForBulkAction) ? (
                      <CheckSquare className="w-4 h-4 text-[#D9A441]" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-500" />
                    )}
                    <span>Select All ({queuedItems.length})</span>
                  </button>
                  {queuedItems.filter((q) => q.selectedForBulkAction).length > 0 && (
                    <span className="text-xs text-[#D9A441] font-bold">
                      {queuedItems.filter((q) => q.selectedForBulkAction).length} selected
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {queuedItems.filter((q) => q.selectedForBulkAction).length > 0 && (
                    <>
                      <button
                        onClick={() => {
                          const ids = queuedItems.filter((q) => q.selectedForBulkAction).map((q) => q.id);
                          bulkApproveQueue(ids);
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:brightness-110 shadow"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Approve Selected ({queuedItems.filter((q) => q.selectedForBulkAction).length})</span>
                      </button>
                      <button
                        onClick={() => {
                          const ids = queuedItems.filter((q) => q.selectedForBulkAction).map((q) => q.id);
                          bulkRejectQueue(ids);
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-300 bg-rose-500/20 border border-rose-500/30 hover:bg-rose-500/30"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Reject Selected</span>
                      </button>
                    </>
                  )}
                  {queuedItems.some((q) => q.isDuplicate) && (
                    <button
                      onClick={clearQueueDuplicates}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-amber-300 bg-amber-500/20 border border-amber-500/30 hover:bg-amber-500/30"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Clear Flagged Duplicates ({queuedItems.filter((q) => q.isDuplicate).length})</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                {queuedItems.map((item) => (
                  <div
                    key={item.id}
                    className={`p-6 rounded-3xl bg-[#101827] border transition-all space-y-5 shadow-xl ${
                      item.isDuplicate
                        ? 'border-amber-500/40 bg-[#161d2b]'
                        : item.reviewStatus === 'approved'
                        ? 'border-emerald-500/40 opacity-75'
                        : 'border-white/10'
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                      
                      {/* Left: Checkbox + Thumbnail & Info */}
                      <div className="flex items-start gap-4 min-w-0">
                        <button
                          onClick={() => toggleSelectQueueItem(item.id)}
                          className="mt-1 p-0.5 text-slate-500 hover:text-white shrink-0"
                          title="Select for bulk action"
                        >
                          {item.selectedForBulkAction ? (
                            <CheckSquare className="w-4 h-4 text-[#D9A441]" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-600" />
                          )}
                        </button>

                        <img
                          src={item.thumbnailUrl}
                          alt=""
                          className="w-20 h-16 object-cover rounded-xl bg-slate-900 border border-white/10 shrink-0"
                        />
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[11px] font-mono-code text-[#D9A441] font-semibold">
                              {item.sourceName} &bull; {item.sourceItemId}
                            </span>
                            {item.isDuplicate && (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                                Duplicate Flagged
                              </span>
                            )}
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              item.reviewStatus === 'approved' ? 'bg-emerald-500/20 text-emerald-400' :
                              item.reviewStatus === 'rejected' ? 'bg-rose-500/20 text-rose-400' :
                              'bg-sky-500/20 text-sky-400'
                            }`}>
                              {item.reviewStatus}
                            </span>
                          </div>

                          <h4 className="text-base font-bold text-white font-['Outfit'] truncate max-w-lg">
                            {item.title}
                          </h4>

                          <p className="text-xs text-slate-400 line-clamp-2 max-w-xl">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div className="flex items-center gap-2 self-start shrink-0">
                        <button
                          onClick={() => window.open(item.previewUrl, '_blank', 'noopener,noreferrer')}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10"
                        >
                          <span>Test Preview</span>
                          <ExternalLink className="w-3.5 h-3.5 text-[#D9A441]" />
                        </button>

                        {item.reviewStatus !== 'approved' && (
                          <button
                            onClick={() => approveAndPublishItem(item.id)}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:brightness-110 shadow-md"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Approve &amp; Publish</span>
                          </button>
                        )}

                        {item.reviewStatus !== 'rejected' && (
                          <button
                            onClick={() => rejectQueueItem(item.id)}
                            className="p-2 rounded-xl text-rose-400 hover:bg-rose-500/10 border border-rose-500/20"
                            title="Reject item"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                    </div>

                    {/* Metadata Badges Bar */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-white/5 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block">AI Classification</span>
                        <span className="font-semibold text-white">
                          {INITIAL_CATEGORIES.find((c) => c.slug === item.detectedCategory)?.name || item.detectedCategory}
                        </span>
                        <span className="text-[10px] text-emerald-400 block font-mono-code">{item.confidenceScore}% confidence</span>
                      </div>

                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Vendor / Author</span>
                        <span className="font-semibold text-slate-200">{item.seller}</span>
                        <span className="text-[10px] text-slate-400 block">{item.retrievalDate}</span>
                      </div>

                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Indicative Turnkey</span>
                        <span className="font-mono-code font-bold text-[#D9A441]">${item.indicativePrice}</span>
                      </div>

                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Licensing Policy</span>
                        <span className="text-slate-300 font-medium">External Preview Only</span>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUBTAB 2: SOURCE ADAPTERS */}
          {automationSubTab === 'sources' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-white font-['Outfit']">
                    Discovery Adapters &amp; Source Feeds ({importSources.length})
                  </h3>
                  <p className="text-xs text-slate-400">
                    Manage official API tokens, feed polling, rate limits, and run discovery cycles.
                  </p>
                </div>

                <button
                  onClick={async () => {
                    setIsHealthChecking(true);
                    try {
                      const res = await runPreviewHealthCheck();
                      addToast(
                        'Health Check Complete',
                        `Verified ${res.totalChecked} links. ${res.validCount} valid, ${res.invalidCount} flagged.`,
                        'info'
                      );
                    } finally {
                      setIsHealthChecking(false);
                    }
                  }}
                  disabled={isHealthChecking}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-[#D9A441] hover:brightness-110 shadow transition-all disabled:opacity-50 self-start sm:self-auto"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isHealthChecking ? 'animate-spin' : ''}`} />
                  <span>{isHealthChecking ? 'Validating Live Links...' : 'Run Preview URL Health Check'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {importSources.map((source) => (
                  <div
                    key={source.id}
                    className="p-6 rounded-3xl bg-[#101827] border border-white/10 space-y-4 shadow-xl flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-bold text-white font-['Outfit']">
                          {source.name}
                        </h4>
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-mono-code uppercase font-bold tracking-wider ${
                          source.status === 'connected' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                          source.status === 'demo_mode' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                          'bg-slate-800 text-slate-400'
                        }`}>
                          {source.status.replace('_', ' ')}
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">
                        {source.description}
                      </p>

                      <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1 text-xs font-mono-code text-slate-400">
                        <div className="truncate">Endpoint: <span className="text-white">{source.endpointUrl}</span></div>
                        <div>Auth: <span className="text-[#D9A441]">{source.authMethod}</span> &bull; Quota: {source.rateLimitPerMin}/min</div>
                        <div>Items Fetched: <span className="text-white">{source.totalItemsFetched}</span></div>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center gap-2">
                      <button
                        onClick={() => handleTestSource(source.id)}
                        disabled={testingSourceId === source.id}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors disabled:opacity-50"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${testingSourceId === source.id ? 'animate-spin' : ''}`} />
                        <span>{testingSourceId === source.id ? 'Pinging...' : 'Test Connection'}</span>
                      </button>

                      <button
                        onClick={() => handleRunSync(source.id)}
                        disabled={syncingSourceId === source.id}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-[#F3C973] to-[#D9A441] hover:brightness-110 shadow transition-all disabled:opacity-50"
                      >
                        <Bot className="w-3.5 h-3.5" />
                        <span>{syncingSourceId === source.id ? 'Scanning...' : 'Run Discovery'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUBTAB 3: SINGLE URL IMPORT */}
          {automationSubTab === 'url-import' && (
            <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-[#101827] border border-white/10 space-y-6 shadow-2xl">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white font-['Outfit']">
                  Admin-Assisted URL Extraction
                </h3>
                <p className="text-xs text-slate-400">
                  Input a permitted live preview link or public item URL from Envato, ThemeForest, CodeCanyon, Framer, or Webflow.
                </p>
              </div>

              <form onSubmit={handleUrlImportSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Target Live Preview or Item URL *
                  </label>
                  <div className="relative">
                    <Link2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="url"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      placeholder="https://preview.themeforest.net/item/... or https://framer.website/..."
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D9A441]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Curation Notes / Target Industry
                  </label>
                  <textarea
                    rows={3}
                    value={urlNotes}
                    onChange={(e) => setUrlNotes(e.target.value)}
                    placeholder="e.g. Sourced for our Swiss banking client project. High aesthetic standards."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D9A441] resize-none"
                  />
                </div>

                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 text-xs text-slate-400 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>URL is validated against duplicate records and staged with live preview links only.</span>
                </div>

                <button
                  type="submit"
                  disabled={isUrlImporting}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-[#F3C973] to-[#D9A441] hover:brightness-110 shadow-lg text-xs disabled:opacity-50"
                >
                  <Bot className="w-4 h-4" />
                  <span>{isUrlImporting ? 'Extracting Metadata...' : 'Stage URL to Review Queue'}</span>
                </button>
              </form>
            </div>
          )}

          {/* SUBTAB 4: CSV BATCH IMPORT */}
          {automationSubTab === 'csv-import' && (
            <div className="max-w-3xl mx-auto p-8 rounded-3xl bg-[#101827] border border-white/10 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white font-['Outfit']">
                    Manual CSV Batch Import Fallback
                  </h3>
                  <p className="text-xs text-slate-400">
                    Batch stage multiple solution blueprints when direct APIs are unavailable.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleLoadSampleCsv}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold text-[#D9A441] bg-[#D9A441]/10 border border-[#D9A441]/30 hover:bg-[#D9A441]/20 transition-colors"
                >
                  Load Sample CSV
                </button>
              </div>

              <form onSubmit={handleCsvImportSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono-code">
                    CSV Format: Title, Seller, OriginalUrl, PreviewUrl, Price, Category
                  </label>
                  <textarea
                    rows={8}
                    value={csvContent}
                    onChange={(e) => setCsvContent(e.target.value)}
                    placeholder={`"Apex Wealth","EliteThemes","https://themeforest.net/item/...","https://preview.themeforest.net/...",3200,"business-websites"`}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-xs text-white font-mono-code placeholder-slate-600 focus:outline-none focus:border-[#D9A441]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-[#F3C973] to-[#D9A441] hover:brightness-110 shadow-lg text-xs"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Process Batch CSV into Review Queue</span>
                </button>
              </form>
            </div>
          )}

          {/* SUBTAB 5: IMPORT JOBS & AUDIT LOGS */}
          {automationSubTab === 'logs' && (
            <div className="space-y-6">
              
              {/* Active & Historical Import Jobs */}
              <div className="p-6 rounded-3xl bg-[#101827] border border-white/10 space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white font-['Outfit']">
                      Active &amp; Historical Import Jobs ({importJobs.length})
                    </h3>
                    <p className="text-xs text-slate-400">
                      Background queue processing, rate-limit throttles, and ingestion progress.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {importJobs.map((job) => (
                    <div
                      key={job.id}
                      className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono-code text-xs text-[#D9A441] font-bold">
                              {job.sourceName}
                            </span>
                            <span className="text-slate-500 text-xs">&bull;</span>
                            <span className="text-xs text-slate-400 font-mono-code">{job.id}</span>
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              job.status === 'running' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 animate-pulse' :
                              job.status === 'paused' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                              job.status === 'completed' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                              job.status === 'failed' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                              'bg-slate-800 text-slate-400'
                            }`}>
                              {job.status}
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-500 block">
                            Started: {new Date(job.startedAt).toLocaleString()}
                            {job.finishedAt && ` &bull; Finished: ${new Date(job.finishedAt).toLocaleTimeString()}`}
                          </span>
                        </div>

                        {/* Job Controls */}
                        <div className="flex items-center gap-2 self-start sm:self-auto">
                          {job.status === 'running' && (
                            <>
                              <button
                                onClick={() => pauseImportJob(job.id)}
                                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30"
                              >
                                <Pause className="w-3.5 h-3.5" />
                                <span>Pause</span>
                              </button>
                              <button
                                onClick={() => cancelImportJob(job.id)}
                                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30"
                              >
                                <Ban className="w-3.5 h-3.5" />
                                <span>Cancel</span>
                              </button>
                            </>
                          )}

                          {job.status === 'paused' && (
                            <>
                              <button
                                onClick={() => resumeImportJob(job.id)}
                                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30"
                              >
                                <Play className="w-3.5 h-3.5" />
                                <span>Resume</span>
                              </button>
                              <button
                                onClick={() => cancelImportJob(job.id)}
                                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30"
                              >
                                <Ban className="w-3.5 h-3.5" />
                                <span>Cancel</span>
                              </button>
                            </>
                          )}

                          {job.status === 'failed' && (
                            <button
                              onClick={() => retryFailedJob(job.id)}
                              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#D9A441] bg-[#D9A441]/10 hover:bg-[#D9A441]/20 border border-[#D9A441]/30"
                            >
                              <RefreshCw className="w-3.5 h-3.5" />
                              <span>Retry Job</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs text-slate-400">
                          <span>Ingestion Progress</span>
                          <span className="font-mono-code font-bold text-white">{job.progressPercentage}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-white/5">
                          <div
                            className="h-full bg-gradient-to-r from-amber-400 to-[#D9A441] transition-all duration-300 rounded-full"
                            style={{ width: `${Math.min(100, Math.max(0, job.progressPercentage))}%` }}
                          />
                        </div>
                      </div>

                      {/* Metrics row */}
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1 text-xs">
                        <div className="p-2 rounded-lg bg-slate-900/60 border border-white/5">
                          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Found</span>
                          <span className="font-bold text-white font-mono-code">{job.itemsFound}</span>
                        </div>
                        <div className="p-2 rounded-lg bg-slate-900/60 border border-white/5">
                          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Staged</span>
                          <span className="font-bold text-emerald-400 font-mono-code">{job.itemsStaged}</span>
                        </div>
                        <div className="p-2 rounded-lg bg-slate-900/60 border border-white/5">
                          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Duplicates</span>
                          <span className="font-bold text-amber-400 font-mono-code">{job.duplicatesDetected}</span>
                        </div>
                        <div className="p-2 rounded-lg bg-slate-900/60 border border-white/5">
                          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Invalid Previews</span>
                          <span className="font-bold text-rose-400 font-mono-code">{job.invalidPreviewsDetected}</span>
                        </div>
                        <div className="p-2 rounded-lg bg-slate-900/60 border border-white/5">
                          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Errors</span>
                          <span className="font-bold text-slate-300 font-mono-code">{job.errorsCount}</span>
                        </div>
                      </div>

                      {/* Log Snippets */}
                      {job.logDetails && job.logDetails.length > 0 && (
                        <div className="p-3 rounded-xl bg-slate-950/80 border border-white/5 space-y-1">
                          <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Job Execution Log</span>
                          <div className="space-y-0.5 max-h-24 overflow-y-auto text-[11px] font-mono-code text-slate-300">
                            {job.logDetails.map((line, lIdx) => (
                              <div key={lIdx} className="leading-relaxed">&bull; {line}</div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* System Audit Trail */}
              <div className="p-6 rounded-3xl bg-[#101827] border border-white/10 space-y-4">
                <h3 className="text-lg font-bold text-white font-['Outfit']">System Audit Trail</h3>
                <div className="space-y-2">
                  {auditLogs.map((log) => (
                    <div key={log.id} className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-start justify-between text-xs gap-4">
                      <div className="space-y-0.5">
                        <span className="font-mono-code font-bold text-[#D9A441]">{log.action}</span>
                        <p className="text-slate-300">{log.details}</p>
                        <span className="text-[10px] text-slate-500">By {log.actor}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 shrink-0 font-mono-code">
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      )}

      {/* TAB 5: SUPABASE ARCHITECTURE & SCHEMA */}
      {activeTab === 'supabase' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          <div className="p-6 sm:p-8 rounded-3xl bg-[#101827] border border-amber-500/30 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-[#D9A441] flex items-center justify-center shrink-0">
                <Database className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white font-['Outfit']">
                  Supabase PostgreSQL &amp; Security Architecture
                </h3>
                <p className="text-xs text-slate-400">
                  Production-ready schema migration script with Row Level Security (RLS) policies and storage configurations.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs">
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                <span className="font-bold text-white block">Server-Side Secret Isolation</span>
                <p className="text-slate-400">
                  Service-role keys and third-party API tokens are restricted strictly to server routes (/api/*). 
                  Browser clients execute read operations via anon keys guarded by Postgres RLS.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                <span className="font-bold text-white block">Download Permission Storage Model</span>
                <p className="text-slate-400">
                  Supabase Storage bucket 'agency-downloads' is private. Only signed, short-lived URLs (15 min expiry) 
                  are generated for agency-authored starter kits with verified redistribution clearance.
                </p>
              </div>
            </div>
          </div>

          {/* Environment Variables Template */}
          <div className="p-6 rounded-3xl bg-[#101827] border border-white/10 space-y-4">
            <h4 className="text-base font-bold text-white font-['Outfit'] flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#D9A441]" />
              <span>Required Environment Variables (.env)</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {SUPABASE_SETUP_GUIDE.requiredEnvVars.map((v, i) => (
                <div key={i} className="p-3 rounded-xl bg-black/40 border border-white/5 font-mono-code">
                  <span className="text-[#D9A441] font-bold block">{v.key}</span>
                  <span className="text-slate-400 text-[11px] font-sans">{v.description}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SQL Migration Script Box */}
          <div className="p-6 rounded-3xl bg-[#101827] border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold text-white font-['Outfit']">
                01_imperionx_showroom_schema.sql
              </h4>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
                  addToast('SQL Copied', 'Schema migration copied to clipboard.', 'success');
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy SQL Migration</span>
              </button>
            </div>

            <pre className="p-4 rounded-2xl bg-black/60 border border-white/5 text-[11px] font-mono-code text-slate-300 overflow-x-auto max-h-[380px] leading-relaxed">
              {SUPABASE_SQL_SCHEMA}
            </pre>
          </div>

        </div>
      )}

      {/* CREATE / EDIT DEMO MODAL */}
      {isDemoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#101827] border border-amber-500/40 rounded-3xl shadow-2xl p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto space-y-6">
            
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-xl font-bold text-white font-['Outfit']">
                {editingDemoId ? 'Edit Showroom Demo' : 'Create New Showroom Demo'}
              </h3>
              <button
                onClick={() => setIsDemoModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveDemo} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Demo Title *</label>
                  <input
                    type="text"
                    value={demoFormData.title || ''}
                    onChange={(e) => setDemoFormData({ ...demoFormData, title: e.target.value })}
                    required
                    placeholder="e.g. Apex Vantage Portal"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-[#D9A441]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Category *</label>
                  <select
                    value={demoFormData.category || 'business-websites'}
                    onChange={(e) => setDemoFormData({ ...demoFormData, category: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-[#D9A441]"
                  >
                    {INITIAL_CATEGORIES.map((c) => (
                      <option key={c.id} value={c.slug} className="bg-slate-900 text-white">
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Indicative Turnkey Price ($)</label>
                  <input
                    type="number"
                    value={demoFormData.indicativePrice || 2500}
                    onChange={(e) => setDemoFormData({ ...demoFormData, indicativePrice: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-[#D9A441]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Delivery Timeline</label>
                  <input
                    type="text"
                    value={demoFormData.deliveryTimeline || '10 - 14 Days'}
                    onChange={(e) => setDemoFormData({ ...demoFormData, deliveryTimeline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-[#D9A441]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Working Live Preview URL *</label>
                <input
                  type="url"
                  value={demoFormData.livePreviewUrl || ''}
                  onChange={(e) => setDemoFormData({ ...demoFormData, livePreviewUrl: e.target.value })}
                  placeholder="https://preview.themeforest.net/..."
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-[#D9A441]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Thumbnail Image URL</label>
                <input
                  type="url"
                  value={demoFormData.thumbnailUrl || ''}
                  onChange={(e) => setDemoFormData({ ...demoFormData, thumbnailUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-[#D9A441]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={demoFormData.description || ''}
                  onChange={(e) => setDemoFormData({ ...demoFormData, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-[#D9A441] resize-none"
                />
              </div>

              {/* Download Authorization Model Toggle */}
              <div className="p-4 rounded-2xl bg-black/40 border border-amber-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-white block">Authorized Download File Permission</span>
                    <span className="text-[11px] text-slate-400">
                      Enable ONLY for agency-authored files or open-source packages with confirmed redistribution rights.
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={Boolean(demoFormData.hasAuthorizedDownload)}
                    onChange={(e) => setDemoFormData({ ...demoFormData, hasAuthorizedDownload: e.target.checked, canDownload: e.target.checked })}
                    className="w-4 h-4 accent-[#D9A441]"
                  />
                </div>

                {demoFormData.hasAuthorizedDownload && (
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="block text-[11px] text-slate-400">Download File Name</label>
                      <input
                        type="text"
                        value={demoFormData.downloadFileName || ''}
                        onChange={(e) => setDemoFormData({ ...demoFormData, downloadFileName: e.target.value })}
                        placeholder="agency-starter-pack.zip"
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400">File Size</label>
                      <input
                        type="text"
                        value={demoFormData.downloadFileSize || ''}
                        onChange={(e) => setDemoFormData({ ...demoFormData, downloadFileSize: e.target.value })}
                        placeholder="18.5 MB"
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-white text-xs"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4 pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={Boolean(demoFormData.isFeatured)}
                    onChange={(e) => setDemoFormData({ ...demoFormData, isFeatured: e.target.checked })}
                    className="w-4 h-4 accent-[#D9A441]"
                  />
                  <span>Mark as Featured in Showroom</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={Boolean(demoFormData.isSample)}
                    onChange={(e) => setDemoFormData({ ...demoFormData, isSample: e.target.checked })}
                    className="w-4 h-4 accent-[#D9A441]"
                  />
                  <span>Mark as Sample Record</span>
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsDemoModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-[#F3C973] to-[#D9A441] shadow"
                >
                  Save Demo Record
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
