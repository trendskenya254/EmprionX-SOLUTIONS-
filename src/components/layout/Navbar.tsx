import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { INITIAL_CATEGORIES } from '../../data/initialCategories';
import { 
  Sparkles, 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  ShieldCheck, 
  Download, 
  MessageSquareCode, 
  ExternalLink,
  Layers,
  ArrowRight
} from 'lucide-react';
import { CategorySlug } from '../../types';

export const Navbar: React.FC = () => {
  const { 
    currentPage, 
    navigateTo, 
    userSession, 
    logout, 
    searchQuery, 
    setSearchQuery,
    triggerWhatsAppEnquiry 
  } = useApp();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  const handleCategoryClick = (slug: CategorySlug) => {
    setIsCategoryDropdownOpen(false);
    setIsMobileMenuOpen(false);
    navigateTo('category', slug);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0a0f1d]/90 backdrop-blur-md border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div 
            onClick={() => navigateTo('home')} 
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#D9A441] to-[#B8852B] p-0.5 shadow-lg shadow-[#D9A441]/20 flex items-center justify-center group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0a0f1d] rounded-[10px] flex items-center justify-center">
                <span className="font-extrabold text-xl text-[#D9A441] tracking-tighter">IX</span>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-wider text-white font-['Outfit']">
                  IMPERION<span className="text-[#D9A441]">X</span>
                </span>
                <span className="hidden sm:inline-flex text-[10px] font-semibold tracking-widest uppercase bg-[#D9A441]/15 text-[#D9A441] px-2 py-0.5 rounded border border-[#D9A441]/30">
                  Agency Showroom
                </span>
              </div>
              <span className="text-xs text-slate-400 font-medium hidden sm:block">
                Digital Engineering &amp; Client Solutions
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              onClick={() => navigateTo('home')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                currentPage === 'home'
                  ? 'text-[#D9A441] bg-white/5 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => navigateTo('explore')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                currentPage === 'explore'
                  ? 'text-[#D9A441] bg-white/5 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Explore Demos
            </button>

            {/* Collections Navigation Link */}
            <button
              onClick={() => navigateTo('collections')}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                currentPage === 'collections'
                  ? 'text-[#D9A441] bg-white/5 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sparkles className="w-4 h-4 text-[#D9A441]" />
              <span>Collections</span>
            </button>

            {/* Categories Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsCategoryDropdownOpen(true)}
              onMouseLeave={() => setIsCategoryDropdownOpen(false)}
            >
              <button
                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  currentPage === 'category'
                    ? 'text-[#D9A441] bg-white/5 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                Categories (30)
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isCategoryDropdownOpen ? 'rotate-180 text-[#D9A441]' : ''}`} />
              </button>

              {isCategoryDropdownOpen && (
                <div className="absolute top-full left-0 w-96 max-h-[480px] overflow-y-auto mt-1 py-3 bg-[#101827] border border-amber-500/20 rounded-2xl shadow-2xl backdrop-blur-xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 pb-2 mb-2 border-b border-white/10 flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    <span>30 Website Categories</span>
                    <span className="text-[#D9A441] font-mono-code">Global Index</span>
                  </div>
                  <div className="grid grid-cols-1 gap-1 px-2">
                    {INITIAL_CATEGORIES.slice(0, 30).map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => handleCategoryClick(cat.slug)}
                        className="flex items-center justify-between w-full px-3 py-1.5 text-left text-xs text-slate-200 hover:text-[#D9A441] hover:bg-white/5 rounded-xl transition-all group"
                      >
                        <span className="font-medium truncate pr-2">{cat.name}</span>
                        <span className="text-[10px] font-mono-code px-1.5 py-0.5 rounded bg-white/5 text-slate-400 group-hover:text-[#D9A441] shrink-0">
                          {cat.demoCount}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => navigateTo('downloads')}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                currentPage === 'downloads'
                  ? 'text-[#D9A441] bg-white/5 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Download className="w-4 h-4" />
              Downloads
            </button>

            <button
              onClick={() => navigateTo('about')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                currentPage === 'about'
                  ? 'text-[#D9A441] bg-white/5 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              About
            </button>

            <button
              onClick={() => navigateTo('contact')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                currentPage === 'contact'
                  ? 'text-[#D9A441] bg-white/5 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Quick WhatsApp Request */}
            <button
              onClick={() => triggerWhatsAppEnquiry()}
              className="flex items-center gap-2 px-3.5 py-2 text-sm font-semibold text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-xl transition-all shadow-sm"
              title="Chat directly with ImperionX Project Lead via WhatsApp"
            >
              <MessageSquareCode className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Agency</span>
            </button>

            {/* Admin Portal Button */}
            {userSession.isAuthenticated ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigateTo('admin-dashboard')}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-xl transition-all"
                >
                  <ShieldCheck className="w-4 h-4 text-[#D9A441]" />
                  <span>Admin Suite</span>
                </button>
                <button
                  onClick={logout}
                  className="px-2.5 py-2 text-xs text-slate-400 hover:text-rose-400 hover:bg-white/5 rounded-lg transition-colors"
                  title="Sign out"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigateTo('admin-login')}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-white/5 rounded-xl border border-white/5 transition-all"
                title="Agency Team & Automation Login"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                <span>Admin Login</span>
              </button>
            )}

            {/* Request Project CTA */}
            <button
              onClick={() => navigateTo('contact')}
              className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-950 bg-gradient-to-r from-[#F3C973] via-[#D9A441] to-[#B8852B] hover:brightness-110 rounded-xl shadow-lg shadow-[#D9A441]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Commission Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => triggerWhatsAppEnquiry()}
              className="p-2 text-emerald-400 bg-slate-800/80 rounded-lg border border-slate-700"
              title="WhatsApp"
            >
              <MessageSquareCode className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle Navigation"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#0e1626] border-b border-white/10 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-200">
          <div className="space-y-1">
            <button
              onClick={() => { setIsMobileMenuOpen(false); navigateTo('home'); }}
              className="block w-full text-left px-3 py-2.5 rounded-xl text-base font-medium text-slate-200 hover:bg-white/5"
            >
              Home
            </button>
            <button
              onClick={() => { setIsMobileMenuOpen(false); navigateTo('explore'); }}
              className="block w-full text-left px-3 py-2.5 rounded-xl text-base font-medium text-slate-200 hover:bg-white/5"
            >
              Explore All Demos
            </button>

            <button
              onClick={() => { setIsMobileMenuOpen(false); navigateTo('collections'); }}
              className="block w-full text-left px-3 py-2.5 rounded-xl text-base font-medium text-[#D9A441] hover:bg-white/5 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>Global Collections</span>
              </span>
              <span className="text-[10px] font-mono-code bg-[#D9A441]/20 px-2 py-0.5 rounded text-[#D9A441]">New</span>
            </button>

            {/* Mobile Categories Accordion */}
            <div className="py-2 border-y border-white/5">
              <div className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
                <span>Categories (30)</span>
                <span className="text-[10px] text-[#D9A441]">Expanded</span>
              </div>
              <div className="max-h-48 overflow-y-auto grid grid-cols-1 gap-1 pr-1">
                {INITIAL_CATEGORIES.slice(0, 30).map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleCategoryClick(c.slug)}
                    className="flex items-center justify-between w-full px-3 py-1.5 text-xs text-slate-300 hover:text-[#D9A441] rounded-lg"
                  >
                    <span className="truncate pr-2">{c.name}</span>
                    <span className="text-[10px] font-mono-code text-slate-400 shrink-0">{c.demoCount}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => { setIsMobileMenuOpen(false); navigateTo('downloads'); }}
              className="block w-full text-left px-3 py-2.5 rounded-xl text-base font-medium text-slate-200 hover:bg-white/5"
            >
              Downloads &amp; Starter Kits
            </button>
            <button
              onClick={() => { setIsMobileMenuOpen(false); navigateTo('about'); }}
              className="block w-full text-left px-3 py-2.5 rounded-xl text-base font-medium text-slate-200 hover:bg-white/5"
            >
              About ImperionX
            </button>
            <button
              onClick={() => { setIsMobileMenuOpen(false); navigateTo('contact'); }}
              className="block w-full text-left px-3 py-2.5 rounded-xl text-base font-medium text-slate-200 hover:bg-white/5"
            >
              Contact Agency
            </button>
          </div>

          <div className="pt-3 border-t border-white/10 space-y-2">
            {userSession.isAuthenticated ? (
              <div className="space-y-2">
                <button
                  onClick={() => { setIsMobileMenuOpen(false); navigateTo('admin-dashboard'); }}
                  className="w-full py-2.5 px-4 rounded-xl text-sm font-bold text-slate-900 bg-[#D9A441] text-center"
                >
                  Admin Suite (Automation Center)
                </button>
                <button
                  onClick={() => { setIsMobileMenuOpen(false); logout(); }}
                  className="w-full py-2 px-4 rounded-xl text-xs font-medium text-rose-400 hover:bg-rose-500/10 text-center"
                >
                  Log Out ({userSession.userEmail})
                </button>
              </div>
            ) : (
              <button
                onClick={() => { setIsMobileMenuOpen(false); navigateTo('admin-login'); }}
                className="w-full py-2.5 px-4 rounded-xl text-sm font-semibold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 text-center"
              >
                Admin Login
              </button>
            )}

            <button
              onClick={() => { setIsMobileMenuOpen(false); navigateTo('contact'); }}
              className="w-full py-3 px-4 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-[#D9A441] to-[#B8852B] shadow-lg text-center"
            >
              Commission Project
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
