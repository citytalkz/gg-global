import React, { useState } from 'react';
import { 
  Globe, 
  ChevronDown, 
  Menu, 
  X, 
  Sparkles, 
  ShieldCheck, 
  Users, 
  Layers, 
  FileText, 
  Lock,
  ArrowRight,
  Headphones
} from 'lucide-react';

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: string, slug?: string) => void;
  openChatbot: () => void;
  openContactModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  openChatbot,
  openContactModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);

  const handleNav = (view: string, slug?: string) => {
    setCurrentView(view, slug);
    setMobileMenuOpen(false);
    setSolutionsDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#0C1017]/90 border-b border-slate-800/80 transition-all shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div 
            id="nav-brand-logo"
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
          >
            <div className="w-9 h-9 bg-slate-800/60 border border-slate-700/60 flex items-center justify-center text-white group-hover:bg-blue-600 group-hover:border-blue-500 transition-all rounded-xs shadow-xs relative overflow-hidden shrink-0">
              <span className="font-bold text-base tracking-tighter font-sans relative z-10">GG</span>
              <div className="glass-shine-overlay"></div>
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-xl font-bold tracking-tight text-white leading-none group-hover:text-blue-400 transition-colors">
                GG GLOBAL
              </span>
              <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-slate-400 leading-none block whitespace-nowrap h-[18px] mr-[5px] w-[221.703px] pt-[4px] ml-[3px] -mb-[23px]">
                Talent & Domain Operations
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[12px] font-semibold uppercase tracking-[0.14em] whitespace-nowrap">
            
            <button
              id="nav-link-home"
              onClick={() => handleNav('home')}
              className={`relative inline-flex items-center justify-center h-10 px-1 text-center transition-colors font-sans select-none ${
                currentView === 'home' 
                  ? 'text-white font-bold after:absolute after:bottom-1 after:left-1 after:right-1 after:h-[2px] after:bg-blue-500 after:rounded-full after:shadow-[0_0_8px_rgba(59,130,246,0.8)]' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Home</span>
            </button>

            {/* Solutions Dropdown */}
            <div 
              className="relative inline-flex items-center h-10"
              onMouseEnter={() => setSolutionsDropdownOpen(true)}
              onMouseLeave={() => setSolutionsDropdownOpen(false)}
            >
              <button
                id="nav-dropdown-solutions"
                onClick={() => setSolutionsDropdownOpen(!solutionsDropdownOpen)}
                className={`relative inline-flex items-center justify-center gap-1.5 h-10 px-1 text-center transition-colors font-sans select-none ${
                  currentView.startsWith('solutions') 
                    ? 'text-white font-bold after:absolute after:bottom-1 after:left-1 after:right-1 after:h-[2px] after:bg-blue-500 after:rounded-full after:shadow-[0_0_8px_rgba(59,130,246,0.8)]' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Solutions</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${solutionsDropdownOpen ? 'rotate-180 text-blue-400' : ''}`} />
              </button>

              {/* Dropdown Menu Card with Refined Slate Glass Effect */}
              {solutionsDropdownOpen && (
                <div className="absolute top-full left-0 w-80 pt-2 z-50">
                  <div className="backdrop-blur-2xl bg-[#131926]/95 shadow-[0_16px_40px_rgba(0,0,0,0.5)] border border-slate-700/60 p-3 space-y-1.5 animate-in fade-in-50 slide-in-from-top-2 duration-150 rounded-sm">
                    
                    <button
                      id="dropdown-item-workforce"
                      onClick={() => handleNav('solutions-workforce')}
                      className="w-full text-left p-3 hover:bg-blue-950/30 transition-all group flex items-start gap-3 border-b border-slate-800/60 rounded-sm"
                    >
                      <div className="w-8 h-8 rounded-xs glass-gloss-blue text-blue-400 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xs">
                        <Users className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-white group-hover:text-blue-400 transition-colors">
                          01 — Workforce Solutions
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed font-normal normal-case">
                          Contract Staffing, Dedicated Pods & Global Talent Deployment.
                        </p>
                      </div>
                    </button>

                    <button
                      id="dropdown-item-domain-ops"
                      onClick={() => handleNav('solutions-domain')}
                      className="w-full text-left p-3 hover:bg-emerald-950/30 transition-all group flex items-start gap-3 rounded-sm"
                    >
                      <div className="w-8 h-8 rounded-xs glass-gloss-emerald text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-xs">
                        <Layers className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-white group-hover:text-emerald-400 transition-colors">
                          02 — Domain Operations
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed font-normal normal-case">
                          P2P, Accounts Payable, Finance & Procurement with strict SLAs.
                        </p>
                      </div>
                    </button>

                  </div>
                </div>
              )}
            </div>

            {/* Dedicated Globally Unscripted Link */}
            <button
              id="nav-link-globally-unscripted"
              onClick={() => handleNav('globally-unscripted')}
              className={`relative inline-flex items-center justify-center h-10 px-1 text-center transition-colors font-sans select-none ${
                currentView === 'globally-unscripted' || currentView === 'interview-detail'
                  ? 'text-white font-bold after:absolute after:bottom-1 after:left-1 after:right-1 after:h-[2px] after:bg-amber-400 after:rounded-full after:shadow-[0_0_8px_rgba(251,191,36,0.8)]' 
                  : 'text-slate-400 hover:text-amber-300'
              }`}
            >
              <span>Globally Unscripted</span>
            </button>

            <button
              id="nav-link-about"
              onClick={() => handleNav('about')}
              className={`relative inline-flex items-center justify-center h-10 px-1 text-center transition-colors font-sans select-none ${
                currentView === 'about' 
                  ? 'text-white font-bold after:absolute after:bottom-1 after:left-1 after:right-1 after:h-[2px] after:bg-blue-500 after:rounded-full after:shadow-[0_0_8px_rgba(59,130,246,0.8)]' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>About</span>
            </button>

            <button
              id="nav-link-contact"
              onClick={() => handleNav('contact')}
              className={`relative inline-flex items-center justify-center h-10 px-1 text-center transition-colors font-sans select-none ${
                currentView === 'contact' 
                  ? 'text-white font-bold after:absolute after:bottom-1 after:left-1 after:right-1 after:h-[2px] after:bg-blue-500 after:rounded-full after:shadow-[0_0_8px_rgba(59,130,246,0.8)]' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Contact</span>
            </button>

          </nav>

          {/* Right Action Area */}
          <div className="hidden lg:flex items-center gap-3">
            
            {/* AI Assistant Quick Trigger - Glass Pill Accent */}
            <button
              id="nav-btn-ai-assistant"
              onClick={openChatbot}
              className="inline-flex items-center gap-2 h-9 px-3.5 rounded-full glass-pill hover:border-blue-400/60 transition-all text-[11px] font-bold tracking-widest uppercase text-white hover:text-blue-300 group shadow-2xs whitespace-nowrap"
              title="Open GG Global AI Assistant"
            >
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.9)] shrink-0"></div>
              <span>Assistant</span>
            </button>

            {/* Admin Portal Entry */}
            <button
              id="nav-btn-admin-portal"
              onClick={() => handleNav('admin')}
              className={`inline-flex items-center justify-center h-9 w-9 rounded-sm text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors ${
                currentView.startsWith('admin') ? 'text-blue-400 bg-slate-800/60' : ''
              }`}
              title="Admin CMS & CRM Portal"
            >
              <Lock className="w-4 h-4" />
            </button>

            {/* Primary Corporate CTA */}
            <button
              id="nav-btn-talk-to-gg"
              onClick={openContactModal}
              className="inline-flex items-center justify-center h-9 px-5 bg-white hover:bg-blue-600 text-slate-950 hover:text-white text-[11px] font-bold uppercase tracking-widest transition-all rounded-sm shadow-[0_4px_16px_rgba(255,255,255,0.1)] hover:shadow-[0_4px_25px_rgba(59,130,246,0.4)] relative overflow-hidden group active:scale-[0.98] whitespace-nowrap"
            >
              <span className="relative z-10">Talk to GG Global</span>
              <div className="glass-shine-overlay opacity-50 group-hover:opacity-100 transition-opacity"></div>
            </button>

          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              id="mobile-btn-ai"
              onClick={openChatbot}
              className="p-2 text-blue-400 bg-blue-950/40 border border-blue-500/30 rounded-lg"
              aria-label="Open AI Assistant"
            >
              <Sparkles className="w-5 h-5" />
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#131926] border-b border-slate-800/80 px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <div className="space-y-1">
            <button
              onClick={() => handleNav('home')}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                currentView === 'home' ? 'bg-blue-950/50 text-blue-400 font-semibold' : 'text-slate-300 hover:text-white'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNav('solutions-workforce')}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                currentView === 'solutions-workforce' ? 'bg-blue-950/50 text-blue-400 font-semibold' : 'text-slate-300 hover:text-white'
              }`}
            >
              Workforce Solutions (Staffing & Pods)
            </button>
            <button
              onClick={() => handleNav('solutions-domain')}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                currentView === 'solutions-domain' ? 'bg-blue-950/50 text-blue-400 font-semibold' : 'text-slate-300 hover:text-white'
              }`}
            >
              Domain Operations (P2P & Finance)
            </button>
            <button
              onClick={() => handleNav('globally-unscripted')}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between ${
                currentView === 'globally-unscripted' ? 'bg-amber-950/40 text-amber-300 font-semibold' : 'text-slate-300 hover:text-white'
              }`}
            >
              <span>Globally Unscripted</span>
              <span className="text-[10px] font-bold uppercase bg-amber-950/80 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                Editorial Hub
              </span>
            </button>
            <button
              onClick={() => handleNav('about')}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                currentView === 'about' ? 'bg-blue-950/50 text-blue-400 font-semibold' : 'text-slate-300 hover:text-white'
              }`}
            >
              About GG Global
            </button>
            <button
              onClick={() => handleNav('contact')}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                currentView === 'contact' ? 'bg-blue-950/50 text-blue-400 font-semibold' : 'text-slate-300 hover:text-white'
              }`}
            >
              Contact Us
            </button>
            <button
              onClick={() => handleNav('admin')}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white flex items-center gap-2`}
            >
              <Lock className="w-4 h-4" />
              <span>Admin CMS & CRM Portal</span>
            </button>
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2">
            <button
              onClick={openContactModal}
              className="w-full py-3 text-center text-sm font-semibold text-slate-950 bg-white hover:bg-blue-500 hover:text-white rounded-lg transition-colors"
            >
              Talk to GG Global
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
