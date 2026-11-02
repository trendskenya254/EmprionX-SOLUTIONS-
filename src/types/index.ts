export type CategorySlug = 
  // Primary 30 Official Categories
  | 'business-corporate-websites'
  | 'portfolio-personal-websites'
  | 'ecommerce-online-stores'
  | 'hotel-hospitality-websites'
  | 'restaurant-food-websites'
  | 'school-university-websites'
  | 'healthcare-hospital-websites'
  | 'real-estate-websites'
  | 'construction-architecture-websites'
  | 'tourism-travel-websites'
  | 'ngo-charity-websites'
  | 'religious-church-websites'
  | 'news-media-websites'
  | 'entertainment-websites'
  | 'finance-banking-websites'
  | 'technology-saas-websites'
  | 'ai-powered-websites'
  | 'landing-pages'
  | 'agency-digital-marketing-websites'
  | 'mobile-application-interfaces'
  | 'dashboard-admin-templates'
  | 'delivery-logistics-applications'
  | 'booking-reservation-systems'
  | 'learning-management-systems'
  | 'government-public-service-websites'
  | 'fashion-beauty-websites'
  | 'automotive-websites'
  | 'sports-fitness-websites'
  | 'event-conference-websites'
  | 'other-specialised-designs'
  // Backward-compatibility aliases with existing records
  | 'business-websites'
  | 'ecommerce-websites'
  | 'mobile-applications'
  | 'school-management-systems'
  | 'hotel-and-restaurant-websites'
  | 'delivery-applications'
  | 'ai-powered-business-systems';

export interface CategoryInfo {
  id: string;
  slug: CategorySlug;
  name: string;
  tagline: string;
  description: string;
  iconName: string;
  demoCount: number;
  highlightTech: string[];
  group?: 'Commercial & Corporate' | 'E-commerce & Stores' | 'Institutions & Non-Profit' | 'Hospitality & Leisure' | 'Modern Apps & SaaS' | 'Media & Creative';
}

export type LicenseType = 
  | 'Agency-Authored (Redistribution Permitted)'
  | 'Open-Source Starter (MIT License)'
  | 'Third-Party Preview Only (External Licensing Required)'
  | 'Turnkey Custom Agency Deliverable';

export type MarketplaceSource = 
  | 'Envato Market'
  | 'ThemeForest'
  | 'CodeCanyon'
  | 'Webflow'
  | 'Framer Showcase'
  | 'WordPress'
  | 'TemplateMonster'
  | 'Wix Showcase'
  | 'Squarespace'
  | 'GitHub'
  | 'Official Template Directory'
  | 'Independent Marketplace'
  | 'ImperionX Bespoke'
  | 'Manual Discovery';

export type PreviewStatus = 'valid' | 'unavailable' | 'restricted' | 'checking';

export interface Demo {
  id: string;
  title: string;
  slug: string;
  category: CategorySlug;
  categoryName: string;
  subCategory?: string;
  tagline: string;
  description: string;
  fullDescription: string;
  features: string[];
  technologies: string[];
  cms?: string;
  designStyle?: string;
  tags?: string[];
  indicativePrice: number;
  currency?: string;
  deliveryTimeline: string;
  thumbnailUrl: string;
  screenshots: string[];
  livePreviewUrl: string;
  previewStatus?: PreviewStatus;
  hasAuthorizedDownload: boolean;
  downloadUrl?: string;
  downloadFileName?: string;
  downloadFileSize?: string;
  licenseType: LicenseType;
  canDownload: boolean;
  downloadNotice?: string;
  isFeatured: boolean;
  isSample: boolean;
  isTrending?: boolean;
  rating: number;
  reviewsCount: number;
  viewsCount: number;
  clientIndustry: string;
  sourceOrigin: MarketplaceSource;
  originalItemUrl?: string;
  originalProductUrl?: string;
  authorProfileUrl?: string;
  sellerName?: string;
  sourceIdentifier?: string;
  retrievalDate?: string;
  lastUpdatedDate?: string;
  attribution?: string;
  collectionIds?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface WebsiteCollection {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  coverImageUrl: string;
  itemCount: number;
  featured: boolean;
  curator: string;
  categoryFilters?: string[];
  tagFilters?: string[];
  manualDemoIds?: string[];
  createdAt: string;
}

export interface ClientEnquiry {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  selectedDemoId?: string;
  selectedDemoTitle?: string;
  selectedSourceOrigin?: string;
  budget: string;
  timeline: string;
  projectDescription: string;
  enquiryType?: 'Customise Discovered Design' | 'Build Similar Solution' | 'Turnkey Deployment' | 'Bespoke Software Architecture';
  preferredContact: 'WhatsApp' | 'Email' | 'Phone' | 'Video Call';
  status: 'new' | 'contacted' | 'discovery' | 'proposal_sent' | 'contract_signed' | 'closed';
  internalNotes?: string;
  createdAt: string;
}

export type SourceType = 
  | 'envato'
  | 'themeforest'
  | 'codecanyon'
  | 'webflow'
  | 'framer'
  | 'wordpress'
  | 'templatemonster'
  | 'wix'
  | 'squarespace'
  | 'github'
  | 'rss_json'
  | 'custom_webhook';

export interface ImportSource {
  id: string;
  name: string;
  type: SourceType;
  marketplace: string;
  status: 'connected' | 'requires_credentials' | 'demo_mode' | 'paused';
  endpointUrl: string;
  apiKeyConfigured: boolean;
  rateLimitPerMin: number;
  importFrequency: 'hourly' | 'daily' | 'weekly' | 'manual';
  maxBatchLimit: number;
  lastSyncAt: string | null;
  totalItemsFetched: number;
  totalDiscovered: number;
  totalImported: number;
  failureCount: number;
  isSupported: boolean;
  officialApiAvailable: boolean;
  description: string;
  officialDocsUrl: string;
  authMethod: 'Bearer Token' | 'OAuth 2.0' | 'Public RSS / JSON Feed' | 'Webhook Secret' | 'GraphQL Query';
  notes: string;
}

export interface QueuedImportItem {
  id: string;
  sourceId: string;
  sourceName: string;
  sourceItemId: string;
  title: string;
  seller: string;
  originalItemUrl: string;
  previewUrl: string;
  indicativePrice: number;
  currency?: string;
  originalCategory: string;
  detectedCategory: CategorySlug;
  subCategory?: string;
  designStyle?: string;
  confidenceScore: number;
  technologies: string[];
  cms?: string;
  tags?: string[];
  description: string;
  thumbnailUrl: string;
  retrievalDate: string;
  licenceStatus: string;
  canDownload: boolean;
  reviewStatus: 'pending' | 'approved' | 'rejected' | 'duplicate_flagged';
  duplicateOfDemoId?: string;
  previewUrlStatus: PreviewStatus;
  isDuplicate: boolean;
  attribution: string;
  selectedForBulkAction?: boolean;
}

export interface ImportJob {
  id: string;
  sourceId: string;
  sourceName: string;
  startedAt: string;
  finishedAt?: string;
  status: 'queued' | 'running' | 'paused' | 'cancelled' | 'completed' | 'failed';
  progressPercentage: number;
  totalExpected: number;
  itemsFound: number;
  itemsStaged: number;
  duplicatesDetected: number;
  invalidPreviewsDetected: number;
  errorsCount: number;
  canPause?: boolean;
  canCancel?: boolean;
  logDetails: string[];
}

export interface AuditLog {
  id: string;
  timestamp: string;
  action: string;
  actor: string;
  details: string;
  severity: 'info' | 'success' | 'warning' | 'error';
}

export interface UserSession {
  isAuthenticated: boolean;
  userEmail: string | null;
  role: 'superadmin' | 'editor' | 'guest';
}

export interface FilterOptions {
  searchQuery: string;
  category: CategorySlug | 'all';
  techStack: string;
  cms: string;
  marketplace: string;
  industry: string;
  minPrice: number;
  maxPrice: number;
  sortBy: 'featured' | 'popular' | 'price-asc' | 'price-desc' | 'newest' | 'trending';
  downloadOnly: boolean;
  previewValidatedOnly: boolean;
  viewMode: 'grid' | 'compact' | 'visual-cards';
  page: number;
  pageSize: number;
}

export interface AiSearchCriteria {
  naturalQuery: string;
  matchedCategories: CategorySlug[];
  matchedTechnologies: string[];
  matchedKeywords: string[];
  matchedCms?: string;
  suggestedCollectionTitle?: string;
  matchedDemoIds: string[];
  explanation: string;
  confidence: number;
}
