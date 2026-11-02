export const SUPABASE_SQL_SCHEMA = `-- ==============================================================================
-- IMPERIONX DIGITAL SHOWROOM & GLOBAL WEBSITE DISCOVERY ENGINE
-- Supabase PostgreSQL Schema & Security Policies (v3.0 Production-Scale Architecture)
-- Engineered for indexing and discovering high-volume verified website designs
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- For fuzzy search and duplicate title matching
CREATE EXTENSION IF NOT EXISTS "btree_gin";

-- 2. CATEGORIES TABLE (30 Official Categories)
CREATE TABLE IF NOT EXISTS public.categories (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    tagline TEXT,
    description TEXT,
    icon_name TEXT NOT NULL DEFAULT 'Briefcase',
    demo_count INT DEFAULT 0,
    category_group TEXT DEFAULT 'Commercial & Corporate',
    highlight_tech JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. GLOBAL WEBSITE COLLECTIONS TABLE
CREATE TABLE IF NOT EXISTS public.collections (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    tagline TEXT,
    description TEXT NOT NULL,
    cover_image_url TEXT NOT NULL,
    item_count INT DEFAULT 0,
    featured BOOLEAN DEFAULT false,
    curator TEXT DEFAULT 'ImperionX Design Council',
    category_filters JSONB DEFAULT '[]'::jsonb,
    tag_filters JSONB DEFAULT '[]'::jsonb,
    manual_demo_ids JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. DEMOS SHOWROOM & CATALOGUE TABLE
CREATE TABLE IF NOT EXISTS public.demos (
    id TEXT PRIMARY KEY DEFAULT ('demo-' || substr(md5(random()::text), 1, 10)),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category_slug TEXT REFERENCES public.categories(slug) ON DELETE RESTRICT,
    category_name TEXT NOT NULL,
    sub_category TEXT,
    tagline TEXT,
    description TEXT NOT NULL,
    full_description TEXT,
    features JSONB NOT NULL DEFAULT '[]'::jsonb,
    technologies JSONB NOT NULL DEFAULT '[]'::jsonb,
    cms TEXT DEFAULT 'Next.js / Headless',
    design_style TEXT,
    tags JSONB DEFAULT '[]'::jsonb,
    indicative_price NUMERIC(10, 2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    delivery_timeline TEXT DEFAULT '10 - 14 Business Days',
    thumbnail_url TEXT NOT NULL,
    screenshots JSONB NOT NULL DEFAULT '[]'::jsonb,
    live_preview_url TEXT NOT NULL,
    preview_status TEXT DEFAULT 'valid' CHECK (preview_status IN ('valid', 'unavailable', 'restricted', 'checking')),
    
    -- DOWNLOAD PERMISSION MODEL:
    -- Only files uploaded by the agency or files with confirmed redistribution rights
    -- can be offered for download. Third-party Envato/ThemeForest demos use preview URLs only.
    has_authorized_download BOOLEAN NOT NULL DEFAULT false,
    can_download BOOLEAN NOT NULL DEFAULT false,
    download_url TEXT,
    download_file_name TEXT,
    download_file_size TEXT,
    download_notice TEXT,
    license_type TEXT NOT NULL DEFAULT 'Third-Party Preview Only (External Licensing Required)',
    
    is_featured BOOLEAN DEFAULT false,
    is_sample BOOLEAN DEFAULT false,
    is_trending BOOLEAN DEFAULT false,
    rating NUMERIC(3, 2) DEFAULT 4.9,
    reviews_count INT DEFAULT 24,
    views_count INT DEFAULT 0,
    client_industry TEXT,
    
    -- PROVENANCE & DISCOVERY TRACKING
    source_origin TEXT NOT NULL DEFAULT 'ImperionX Bespoke',
    original_item_url TEXT,
    original_product_url TEXT,
    author_profile_url TEXT,
    seller_name TEXT,
    source_identifier TEXT,
    retrieval_date DATE DEFAULT CURRENT_DATE,
    last_updated_date DATE DEFAULT CURRENT_DATE,
    attribution TEXT,
    collection_ids JSONB DEFAULT '[]'::jsonb,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- FULL-TEXT SEARCH & PERFORMANCE INDEXES
CREATE INDEX IF NOT EXISTS demos_fts_idx ON public.demos USING gin (to_tsvector('english', title || ' ' || description || ' ' || COALESCE(client_industry, '')));
CREATE INDEX IF NOT EXISTS demos_tech_gin_idx ON public.demos USING gin (technologies);
CREATE INDEX IF NOT EXISTS demos_tags_gin_idx ON public.demos USING gin (tags);
CREATE INDEX IF NOT EXISTS demos_title_trgm_idx ON public.demos USING gin (title gin_trgm_ops);
CREATE INDEX IF NOT EXISTS demos_category_idx ON public.demos (category_slug);
CREATE INDEX IF NOT EXISTS demos_featured_views_idx ON public.demos (is_featured, views_count DESC);

-- 5. CLIENT ENQUIRIES & LEAD PIPELINE
CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_name TEXT NOT NULL,
    client_email TEXT NOT NULL,
    client_phone TEXT NOT NULL,
    selected_demo_id TEXT REFERENCES public.demos(id) ON DELETE SET NULL,
    selected_demo_title TEXT,
    selected_source_origin TEXT,
    budget TEXT NOT NULL,
    timeline TEXT NOT NULL,
    project_description TEXT NOT NULL,
    enquiry_type TEXT DEFAULT 'Customise Discovered Design',
    preferred_contact TEXT CHECK (preferred_contact IN ('WhatsApp', 'Email', 'Phone', 'Video Call')),
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'discovery', 'proposal_sent', 'contract_signed', 'closed')),
    internal_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. AUTOMATION CENTER: MODULAR SOURCE ADAPTERS
CREATE TABLE IF NOT EXISTS public.import_sources (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    marketplace TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'requires_credentials' CHECK (status IN ('connected', 'requires_credentials', 'demo_mode', 'paused')),
    endpoint_url TEXT NOT NULL,
    api_key_configured BOOLEAN DEFAULT false,
    rate_limit_per_min INT DEFAULT 60,
    import_frequency TEXT DEFAULT 'daily' CHECK (import_frequency IN ('hourly', 'daily', 'weekly', 'manual')),
    max_batch_limit INT DEFAULT 50,
    last_sync_at TIMESTAMPTZ,
    total_items_fetched INT DEFAULT 0,
    total_discovered INT DEFAULT 0,
    total_imported INT DEFAULT 0,
    failure_count INT DEFAULT 0,
    is_supported BOOLEAN DEFAULT true,
    official_api_available BOOLEAN DEFAULT true,
    description TEXT,
    official_docs_url TEXT,
    auth_method TEXT NOT NULL,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. AUTOMATION CENTER: QUEUED IMPORT ITEMS (STAGING & REVIEW QUEUE)
CREATE TABLE IF NOT EXISTS public.queued_import_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_id TEXT REFERENCES public.import_sources(id) ON DELETE CASCADE,
    source_name TEXT NOT NULL,
    source_item_id TEXT NOT NULL,
    title TEXT NOT NULL,
    seller TEXT NOT NULL,
    original_item_url TEXT NOT NULL,
    preview_url TEXT NOT NULL,
    indicative_price NUMERIC(10, 2) DEFAULT 0,
    currency TEXT DEFAULT 'USD',
    original_category TEXT,
    detected_category TEXT REFERENCES public.categories(slug),
    sub_category TEXT,
    design_style TEXT,
    confidence_score NUMERIC(5, 2) DEFAULT 90.0,
    technologies JSONB DEFAULT '[]'::jsonb,
    cms TEXT DEFAULT 'Next.js / Headless',
    tags JSONB DEFAULT '[]'::jsonb,
    description TEXT,
    thumbnail_url TEXT,
    retrieval_date DATE DEFAULT CURRENT_DATE,
    licence_status TEXT NOT NULL,
    can_download BOOLEAN DEFAULT false, -- STRICTLY FALSE for third-party paid code
    review_status TEXT DEFAULT 'pending' CHECK (review_status IN ('pending', 'approved', 'rejected', 'duplicate_flagged')),
    duplicate_of_demo_id TEXT REFERENCES public.demos(id) ON DELETE SET NULL,
    preview_url_status TEXT DEFAULT 'valid' CHECK (preview_url_status IN ('valid', 'unavailable', 'restricted', 'checking')),
    is_duplicate BOOLEAN DEFAULT false,
    attribution TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS queued_status_idx ON public.queued_import_items (review_status);
CREATE INDEX IF NOT EXISTS queued_source_idx ON public.queued_import_items (source_id);

-- 8. IMPORT JOBS TABLE (BACKGROUND QUEUE WITH PAUSE/RESUME)
CREATE TABLE IF NOT EXISTS public.import_jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_id TEXT REFERENCES public.import_sources(id) ON DELETE CASCADE,
    source_name TEXT NOT NULL,
    started_at TIMESTAMPTZ DEFAULT NOW(),
    finished_at TIMESTAMPTZ,
    status TEXT DEFAULT 'queued' CHECK (status IN ('queued', 'running', 'paused', 'cancelled', 'completed', 'failed')),
    progress_percentage NUMERIC(5, 2) DEFAULT 0,
    total_expected INT DEFAULT 0,
    items_found INT DEFAULT 0,
    items_staged INT DEFAULT 0,
    duplicates_detected INT DEFAULT 0,
    invalid_previews_detected INT DEFAULT 0,
    errors_count INT DEFAULT 0,
    log_details JSONB DEFAULT '[]'::jsonb
);

CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    action TEXT NOT NULL,
    actor TEXT NOT NULL,
    details TEXT NOT NULL,
    severity TEXT DEFAULT 'info' CHECK (severity IN ('info', 'success', 'warning', 'error'))
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.demos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.import_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.queued_import_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.import_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Public can read categories, collections, and published demos
CREATE POLICY "Public Read Categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Public Read Collections" ON public.collections FOR SELECT USING (true);
CREATE POLICY "Public Read Demos" ON public.demos FOR SELECT USING (true);

-- Public can submit project enquiries (INSERT only)
CREATE POLICY "Public Insert Enquiry" ON public.enquiries FOR INSERT WITH CHECK (true);

-- Authenticated Admins have full management access
CREATE POLICY "Admin All Categories" ON public.categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Collections" ON public.collections FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Demos" ON public.demos FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin View Enquiries" ON public.enquiries FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Update Enquiries" ON public.enquiries FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Delete Enquiries" ON public.enquiries FOR DELETE USING (auth.role() = 'authenticated');

-- Automation & Discovery tables are restricted to Authenticated Admins
CREATE POLICY "Admin Automation Sources" ON public.import_sources FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Review Queue" ON public.queued_import_items FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Import Jobs" ON public.import_jobs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Audit Logs" ON public.audit_logs FOR ALL USING (auth.role() = 'authenticated');
`;

export const SUPABASE_SETUP_GUIDE = {
  overview: "Supabase provides PostgreSQL storage, Full-Text GIN Indexing, Row Level Security, and Storage Buckets for the ImperionX Global Discovery Engine.",
  architectureRules: [
    "Never expose the service-role secret key in browser/client-side code.",
    "Browser clients execute paginated read queries via anonymous keys guarded by Postgres RLS.",
    "GIN and Trigram indexes allow sub-millisecond filtering across millions of records without locking up the database.",
    "Third-party paid templates (Envato, ThemeForest, CodeCanyon) are NEVER uploaded to Supabase Storage as downloadables; only verified agency-authored packages can exist in storage.",
    "Signed URLs with short expiry (15 mins) must be generated on the server when an authorized agency download is requested."
  ],
  requiredEnvVars: [
    { key: "VITE_SUPABASE_URL", description: "Supabase Project REST API URL (Client-safe)" },
    { key: "VITE_SUPABASE_ANON_KEY", description: "Supabase Public Anonymous Key for RLS queries (Client-safe)" },
    { key: "SUPABASE_SERVICE_ROLE_KEY", description: "Supabase Service Role Key (Backend Server Only - NEVER in frontend)" },
    { key: "ENVATO_API_TOKEN", description: "Personal Bearer token for ThemeForest & CodeCanyon official API catalog" },
    { key: "WEBFLOW_API_TOKEN", description: "OAuth 2.0 Access Token for Webflow Made-In-Webflow Showcase queries" },
    { key: "WORDPRESS_ORG_API_KEY", description: "WordPress.org official theme registry directory proxy token (optional)" },
    { key: "GITHUB_ACCESS_TOKEN", description: "GitHub Personal Access Token for rate-limit extended starter queries" },
    { key: "WHATSAPP_AGENCY_NUMBER", description: "ImperionX official WhatsApp business line for 1-click project dispatch" }
  ]
};
