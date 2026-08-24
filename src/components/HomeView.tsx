import React, { useState } from 'react';
import { 
  ArrowRight, 
  Users, 
  Layers, 
  Globe2, 
  ShieldCheck, 
  Clock, 
  TrendingUp, 
  CheckCircle2, 
  Play, 
  FileText, 
  ChevronRight, 
  Sparkles,
  Award,
  Zap,
  Building,
  Target,
  ExternalLink
} from 'lucide-react';
import { Interview, WebsiteContent } from '../types';

interface HomeViewProps {
  content: WebsiteContent;
  latestInterview: Interview | null;
  setCurrentView: (view: string, slug?: string) => void;
  openContactModal: () => void;
  openVideoModal: (youtubeId: string, title: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  content,
  latestInterview,
  setCurrentView,
  openContactModal,
  openVideoModal,
}) => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="space-y-24 sm:space-y-32 pb-24 relative">
      
      {/* Subtle Ambient Color Glows (Dark Mode Prismatic Luminescence) */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse"></div>
      <div className="absolute top-80 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-[1800px] left-1/3 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      
      {/* =========================================
          1. HERO SECTION & OPERATING MODELS SPLIT
          ========================================= */}
      <section className="relative pt-6 sm:pt-10 pb-12 sm:pb-16 overflow-hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Top Main Grid with Dark Glass Gloss Finish */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border border-slate-800/80 bg-[#131926]/90 backdrop-blur-xl rounded-2xl overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.4)]">
          
          {/* Left Column: Hero Narrative */}
          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-slate-800/80 bg-gradient-to-br from-[#161D2C]/90 via-[#131926]/80 to-[#0F141C]/90 relative">
            <div className="glass-shine-overlay opacity-30"></div>
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border border-blue-400/40 text-blue-300 font-semibold text-[11px] uppercase tracking-[0.2em] mb-4 w-fit shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse shadow-[0_0_8px_rgba(96,165,250,0.8)]"></span>
              <span>{content.hero.badge || "Global Talent & Domain Operations"}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-serif leading-[1.06] tracking-tight text-white mb-6">
              Global Talent. <br />
              Specialized Operations. <br />
              <span className="italic bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                Built to Scale.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-lg mb-8 font-light">
              We help international companies access specialized global talent and operate defined business functions through contract staffing and managed domain outsourcing.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                id="hero-btn-primary"
                onClick={openContactModal}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-sm shadow-[0_0_25px_rgba(37,99,235,0.4)] hover:shadow-[0_0_35px_rgba(59,130,246,0.6)] transition-all flex items-center justify-center gap-2 cursor-pointer relative overflow-hidden group active:scale-[0.98]"
              >
                <span className="relative z-10">Talk to GG Global</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-0.5 transition-transform" />
                <div className="glass-shine-overlay opacity-40 group-hover:opacity-80 transition-opacity"></div>
              </button>

              <button
                id="hero-btn-secondary"
                onClick={() => {
                  const el = document.getElementById('solutions-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 glass-pill text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-sm hover:bg-white/10 transition-all flex items-center justify-center cursor-pointer border border-white/20 shadow-xs"
              >
                <span>Explore Solutions</span>
              </button>
            </div>

            {/* Quick stats counter with glass gloss pills */}
            <div className="pt-10 mt-10 border-t border-slate-800/80 grid grid-cols-3 gap-4">
              <div className="p-3 rounded-xl glass-gloss-blue border border-blue-500/30">
                <div className="text-2xl font-serif text-white font-bold">18+</div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-blue-300">Global Markets</div>
              </div>
              <div className="p-3 rounded-xl glass-gloss-emerald border border-emerald-500/30">
                <div className="text-2xl font-serif text-white font-bold">99.4%</div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">SLA Accuracy</div>
              </div>
              <div className="p-3 rounded-xl glass-gloss-amber border border-amber-500/30">
                <div className="text-2xl font-serif text-white font-bold">&lt;48h</div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-amber-300">P2P Ingestion</div>
              </div>
            </div>

          </div>

          {/* Right Column: Two Precision Operating Models Stack */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#111722]/90">
            
            {/* Model 01: Workforce Solutions */}
            <div className="p-8 sm:p-10 bg-gradient-to-br from-[#161E2E]/95 via-[#111827]/85 to-blue-950/25 border-b border-slate-800/80 flex-1 flex flex-col justify-between relative overflow-hidden">
              <div className="glass-shine-overlay opacity-20"></div>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-blue-950/80 text-blue-300 border border-blue-500/40 shadow-2xs">
                    01 — Workforce Solutions
                  </span>
                  <span className="w-8 h-[1px] bg-blue-500/30"></span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif mb-2 text-white">You need people.</h3>
                <p className="text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed">
                  Qualified professionals working as an extension of your existing team. Flexible, scalable, global.
                </p>
                <ul className="space-y-2.5 text-[13px] font-medium text-slate-300">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 shadow-[0_0_8px_rgba(96,165,250,0.8)]"></span>
                    <span>Contract Staffing (3-24+ mos)</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 shadow-[0_0_8px_rgba(96,165,250,0.8)]"></span>
                    <span>Dedicated Teams & Pods</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 shadow-[0_0_8px_rgba(96,165,250,0.8)]"></span>
                    <span>Global Talent Deployment (EOR)</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => setCurrentView('solutions-workforce')}
                  className="text-xs font-bold uppercase tracking-widest text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1.5"
                >
                  <span>Workforce Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] text-slate-500 font-medium">Team Extension</span>
              </div>
            </div>

            {/* Model 02: Domain Operations */}
            <div className="p-8 sm:p-10 bg-gradient-to-br from-[#141B29]/95 via-[#0F1522]/85 to-indigo-950/25 flex-1 flex flex-col justify-between relative overflow-hidden">
              <div className="glass-shine-overlay opacity-20"></div>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-indigo-950/80 text-indigo-300 border border-indigo-500/40 shadow-2xs">
                    02 — Domain Operations
                  </span>
                  <span className="w-8 h-[1px] bg-indigo-500/30"></span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif mb-2 text-white">You need a function managed.</h3>
                <p className="text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed">
                  Specialized teams operating business functions with agreed KPIs, SLAs, and transparent executive reporting.
                </p>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-bold uppercase tracking-tighter text-slate-300">
                  <div className="p-2.5 glass-gloss border border-slate-700/60 text-center rounded-xs shadow-2xs hover:border-indigo-400/50 transition-colors text-white">Procure-to-Pay</div>
                  <div className="p-2.5 glass-gloss border border-slate-700/60 text-center rounded-xs shadow-2xs hover:border-indigo-400/50 transition-colors text-white">Accounts Payable</div>
                  <div className="p-2.5 glass-gloss border border-slate-700/60 text-center rounded-xs shadow-2xs hover:border-indigo-400/50 transition-colors text-white">Finance Ops</div>
                  <div className="p-2.5 glass-gloss border border-slate-700/60 text-center rounded-xs shadow-2xs hover:border-indigo-400/50 transition-colors text-white">Procurement</div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => setCurrentView('solutions-domain')}
                  className="text-xs font-bold uppercase tracking-widest text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1.5"
                >
                  <span>Domain Operations SLAs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] text-slate-500 font-medium">Full Process Ownership</span>
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* =========================================
          2. WHO WE ARE
          ========================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-gloss rounded-2xl border border-slate-800/80 p-8 sm:p-14 relative overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.4)]">
          <div className="glass-shine-overlay opacity-30"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold tracking-widest text-blue-300 bg-blue-950/80 border border-blue-500/40 uppercase shadow-2xs">
                Who We Are
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight leading-tight pt-1">
                {content.whoWeAre.heading}
              </h2>
              <p className="text-sm font-semibold text-slate-200 leading-relaxed">
                {content.whoWeAre.statement}
              </p>
            </div>

            <div className="lg:col-span-7 space-y-6 text-slate-300 text-sm sm:text-base leading-relaxed font-light">
              <p>
                {content.whoWeAre.description}
              </p>

              {/* Comparison Matrix Box: Agency vs BPO vs GG Global with Dark Glass Gloss */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-4 rounded-xl glass-gloss border border-slate-700/60 space-y-1">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Traditional Agency</div>
                  <div className="text-xs text-slate-400">CV brokering, high placement fees, zero post-hire SLA accountability.</div>
                </div>
                <div className="p-4 rounded-xl glass-gloss border border-slate-700/60 space-y-1">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cheap BPO</div>
                  <div className="text-xs text-slate-400">High staff turnover, opaque offshore layers, transactional output.</div>
                </div>
                <div className="p-4 rounded-xl glass-gloss-blue border border-blue-500/40 space-y-1 shadow-xs relative overflow-hidden">
                  <div className="glass-shine-overlay opacity-40"></div>
                  <div className="text-xs font-extrabold text-blue-300 uppercase tracking-wider">GG Global</div>
                  <div className="text-xs font-medium text-blue-100">Vetted talent, contractual SLAs, real-time KPI visibility & domain ownership.</div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* =========================================
          3. SOLUTIONS: WORKFORCE VS DOMAIN OPERATIONS
          ========================================= */}
      <section id="solutions-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold tracking-widest text-blue-300 bg-blue-950/80 border border-blue-500/40 uppercase shadow-2xs">
            Core Business Architecture
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight">
            Two High-Precision Operating Models
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-light">
            We provide absolute clarity between extending your existing team with specialized talent versus handing over an entire process to be governed with strict SLAs.
          </p>
        </div>

        {/* Major Two-Card Comparison with Dark Glass Gloss Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Card 01: Workforce Solutions */}
          <div className="glass-gloss-blue rounded-2xl border border-blue-500/30 shadow-[0_16px_40px_rgba(0,0,0,0.4)] hover:border-blue-500/60 transition-all p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden group">
            <div className="glass-shine-overlay opacity-30 group-hover:opacity-60 transition-opacity"></div>
            
            <div className="space-y-6 relative z-10">
              
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl glass-gloss text-blue-400 flex items-center justify-center font-bold text-lg border border-blue-500/30 shadow-xs">
                  <Users className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-extrabold glass-pill text-blue-300 border border-blue-500/40 tracking-wider shadow-2xs">
                  01 — WORKFORCE
                </span>
              </div>

              <div>
                <div className="text-xs font-extrabold uppercase tracking-widest text-blue-400">
                  "You need people"
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif text-white tracking-tight mt-1">
                  Workforce Solutions
                </h3>
                <p className="text-slate-300 text-sm mt-2 leading-relaxed font-light">
                  GG Global provides qualified professionals who work as an extension of your client organization, under your management and toolchains.
                </p>
              </div>

              {/* Offerings list */}
              <div className="space-y-3 pt-2">
                <div className="p-4 rounded-xl glass-gloss border border-slate-700/60 space-y-1 hover:border-blue-400/50 transition-colors">
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400" />
                    <span>Contract Staffing</span>
                  </div>
                  <p className="text-xs text-slate-400">Pre-vetted individual contributors and senior specialists for 3 to 24+ month engagements.</p>
                </div>

                <div className="p-4 rounded-xl glass-gloss border border-slate-700/60 space-y-1 hover:border-blue-400/50 transition-colors">
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400" />
                    <span>Dedicated Teams & Pods</span>
                  </div>
                  <p className="text-xs text-slate-400">Curated pods assembled specifically for your tech or finance stack, operating in your time zone.</p>
                </div>

                <div className="p-4 rounded-xl glass-gloss border border-slate-700/60 space-y-1 hover:border-blue-400/50 transition-colors">
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400" />
                    <span>Global Talent Deployment</span>
                  </div>
                  <p className="text-xs text-slate-400">Full Employer-of-Record (EOR) and cross-border payroll across 18+ international markets.</p>
                </div>
              </div>

            </div>

            <div className="pt-8 border-t border-slate-800/80 mt-8 relative z-10">
              <button
                id="solutions-btn-workforce-learn-more"
                onClick={() => setCurrentView('solutions-workforce')}
                className="w-full py-3.5 px-5 rounded-sm bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.4)] relative overflow-hidden group/btn active:scale-[0.98]"
              >
                <span className="relative z-10">Explore Workforce Solutions</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-0.5 transition-transform" />
                <div className="glass-shine-overlay opacity-30 group-hover/btn:opacity-70 transition-opacity"></div>
              </button>
            </div>

          </div>

          {/* Card 02: Domain Operations */}
          <div className="glass-gloss-indigo rounded-2xl border border-indigo-500/30 shadow-[0_16px_40px_rgba(0,0,0,0.4)] hover:border-indigo-500/60 transition-all p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden group">
            <div className="glass-shine-overlay opacity-30 group-hover:opacity-60 transition-opacity"></div>
            
            <div className="space-y-6 relative z-10">
              
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl glass-gloss text-indigo-400 flex items-center justify-center font-bold text-lg border border-indigo-500/30 shadow-xs">
                  <Layers className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-extrabold glass-pill text-indigo-300 border border-indigo-500/40 tracking-wider shadow-2xs">
                  02 — OPERATIONS
                </span>
              </div>

              <div>
                <div className="text-xs font-extrabold uppercase tracking-widest text-indigo-400">
                  "You need a function managed"
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif text-white tracking-tight mt-1">
                  Domain Operations
                </h3>
                <p className="text-slate-300 text-sm mt-2 leading-relaxed font-light">
                  GG Global builds and manages specialized teams that operate defined business functions with agreed KPIs, SLAs, and executive reporting.
                </p>
              </div>

              {/* Function offerings */}
              <div className="space-y-3 pt-2">
                <div className="p-4 rounded-xl glass-gloss border border-slate-700/60 space-y-1 hover:border-indigo-400/50 transition-colors">
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                    <span>Procure-to-Pay (P2P)</span>
                  </div>
                  <p className="text-xs text-slate-400">Complete requisition-to-disbursement lifecycle with &lt;48hr invoice processing cycle times.</p>
                </div>

                <div className="p-4 rounded-xl glass-gloss border border-slate-700/60 space-y-1 hover:border-indigo-400/50 transition-colors">
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                    <span>Accounts Payable & Reconciliation</span>
                  </div>
                  <p className="text-xs text-slate-400">High-volume multi-entity invoice ingestion, automated matching, and SOX-ready audit trails.</p>
                </div>

                <div className="p-4 rounded-xl glass-gloss border border-slate-700/60 space-y-1 hover:border-indigo-400/50 transition-colors">
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                    <span>Finance & Procurement Operations</span>
                  </div>
                  <p className="text-xs text-slate-400">General ledger reconciliations, Day-3 close support, supplier risk screening, and tail-spend governance.</p>
                </div>
              </div>

            </div>

            <div className="pt-8 border-t border-slate-800/80 mt-8 relative z-10">
              <button
                id="solutions-btn-domain-learn-more"
                onClick={() => setCurrentView('solutions-domain')}
                className="w-full py-3.5 px-5 rounded-sm bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(99,102,241,0.4)] relative overflow-hidden group/btn active:scale-[0.98]"
              >
                <span className="relative z-10">Explore Domain Operations</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-0.5 transition-transform" />
                <div className="glass-shine-overlay opacity-30 group-hover/btn:opacity-70 transition-opacity"></div>
              </button>
            </div>

          </div>

        </div>

      </section>

      {/* =========================================
          4. HOW WE WORK (5-STEP METHODOLOGY)
          ========================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold tracking-widest text-blue-300 bg-blue-950/80 border border-blue-500/40 uppercase shadow-2xs">
            Delivery Methodology
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
            How We Work
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed font-light">
            From initial workflow audit to continuous process optimization, our 5-step framework guarantees zero operational disruption.
          </p>
        </div>

        {/* 5-Step interactive layout with Dark Glass Gloss Effect */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {content.howWeWork.steps.map((step, idx) => (
            <div
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`p-6 rounded-xl border transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden ${
                activeStep === idx
                  ? 'glass-gloss-blue border-blue-400/80 shadow-[0_0_30px_rgba(59,130,246,0.3)] ring-1 ring-blue-400/50'
                  : 'glass-gloss border-white/10 hover:border-white/20 hover:shadow-lg'
              }`}
            >
              {activeStep === idx && <div className="glass-shine-overlay opacity-50"></div>}
              
              <div className="space-y-3 relative z-10">
                <div className="text-xs font-extrabold text-blue-400 font-sans tracking-widest uppercase">
                  {step.number}
                </div>
                <h3 className="text-lg font-serif font-bold text-white">
                  {step.name}
                </h3>
                <div className="text-xs font-semibold text-blue-300/80">
                  {step.subtitle}
                </div>
                <p className="text-xs text-gray-400 leading-relaxed font-light">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 text-[11px] font-medium text-gray-300 relative z-10">
                <span className="text-gray-500 block text-[10px] uppercase font-bold tracking-wider">Key Deliverable:</span>
                {step.deliverable}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================
          5. WHY GG GLOBAL (7 ENTERPRISE PILLARS)
          ========================================= */}
      <section className="bg-gradient-to-b from-[#0F141C] via-[#141A26] to-[#0F141C] border-y border-slate-800/80 py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold tracking-widest text-blue-300 bg-blue-950/80 border border-blue-500/40 uppercase shadow-2xs">
              Why GG Global
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
              Engineered for Enterprise Governance
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-light">
              Why leading international CFOs, COOs, and procurement executives partner with GG Global over legacy providers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.whyGGGlobal.pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl glass-gloss border border-slate-700/60 shadow-xs space-y-3 flex flex-col justify-between hover:border-blue-400/40 hover:shadow-xl transition-all relative overflow-hidden group"
              >
                <div className="glass-shine-overlay opacity-20 group-hover:opacity-50 transition-opacity"></div>
                <div className="space-y-2 relative z-10">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif font-bold text-white text-base">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-light">
                    {pillar.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-blue-400 relative z-10">
                  <span className="text-slate-500 font-normal">Standard:</span>
                  <span className="glass-pill px-2.5 py-0.5 rounded-full text-blue-300 font-bold border border-blue-500/30">{pillar.metric}</span>
                </div>
              </div>
            ))}

            {/* Custom 7th Pillar / Partnership Card */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-[#161D2C] via-blue-950/40 to-[#101622] border border-blue-500/30 text-white shadow-xl flex flex-col justify-between relative overflow-hidden group">
              <div className="glass-shine-overlay opacity-30 group-hover:opacity-60 transition-opacity"></div>
              <div className="space-y-2 relative z-10">
                <span className="text-[10px] uppercase font-bold tracking-widest text-blue-400">Institutional Memory</span>
                <h3 className="font-serif font-bold text-white text-base">
                  Long-Term Value Compounding
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  We don't just supply seats; we continuously streamline standard operating procedures, documentation, and tooling workflows.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 relative z-10">
                <span>Tenure:</span>
                <span className="glass-pill px-2.5 py-0.5 rounded-full text-blue-300 font-bold border border-blue-500/30">Multi-Year Partnerships</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================
          6. GLOBALLY UNSCRIPTED (EDITORIAL HOMEPAGE STRIP)
          ========================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-[#131926]/90 text-white p-8 sm:p-12 border border-slate-800/80 rounded-2xl relative overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl">
          <div className="glass-shine-overlay opacity-20"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Header Info */}
            <div className="lg:col-span-4 space-y-2">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-blue-400 mb-2">
                Globally Unscripted
              </h2>
              <p className="text-2xl sm:text-3xl font-serif leading-tight text-white">
                Where Global Leaders <br />
                Speak Unfiltered.
              </p>
              <p className="text-xs text-slate-400 pt-2 leading-relaxed font-light">
                In-depth editorial dialogues with CFOs, COOs, and operations visionaries.
              </p>
              <div className="pt-2">
                <button
                  id="homepage-btn-explore-globally-unscripted"
                  onClick={() => setCurrentView('globally-unscripted')}
                  className="text-xs font-bold uppercase tracking-widest text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1.5"
                >
                  <span>Explore Publication Hub</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right: Latest Interview Featured Box */}
            <div className="lg:col-span-8">
              {latestInterview ? (
                <div className="bg-slate-900/60 p-6 sm:p-8 border border-slate-700/60 rounded-xl flex flex-col sm:flex-row items-center gap-6 backdrop-blur-md">
                  
                  {/* Portrait with grayscale editorial styling */}
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden shrink-0 border-2 border-slate-700 grayscale hover:grayscale-0 transition-all shadow-md">
                    <img
                      src={latestInterview.executivePhoto}
                      alt={latestInterview.executiveName}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  {/* Metadata & Headline */}
                  <div className="flex-1 space-y-2 text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start space-x-2 text-[10px] uppercase tracking-widest">
                      <span className="font-bold text-blue-400">Latest Interview</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-slate-400">{latestInterview.publishedDate || "August 2024"}</span>
                    </div>

                    <h4 
                      onClick={() => setCurrentView('interview-detail', latestInterview.slug)}
                      className="text-lg sm:text-xl font-serif font-medium text-white hover:text-blue-300 transition-colors cursor-pointer"
                    >
                      {latestInterview.title}
                    </h4>

                    <p className="text-xs text-slate-400 uppercase tracking-widest">
                      {latestInterview.executiveName} — {latestInterview.executiveRole}, {latestInterview.company}
                    </p>

                    <p className="text-xs text-slate-300 line-clamp-2 pt-1 font-sans font-light">
                      {latestInterview.summary}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col space-y-2 w-full sm:w-auto shrink-0 pt-2 sm:pt-0">
                    <button
                      id="homepage-btn-read-interview"
                      onClick={() => setCurrentView('interview-detail', latestInterview.slug)}
                      className="px-6 py-2.5 bg-white text-slate-950 font-bold text-[11px] uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all rounded-sm text-center shadow-sm"
                    >
                      Read Interview
                    </button>
                    {latestInterview.youtubeId && (
                      <button
                        id="homepage-btn-watch-interview"
                        onClick={() => openVideoModal(latestInterview.youtubeId, latestInterview.title)}
                        className="px-6 py-2 border border-slate-700 text-[11px] uppercase tracking-widest text-slate-300 hover:text-white hover:border-slate-500 transition-all rounded-sm text-center glass-pill"
                      >
                        Watch Video
                      </button>
                    )}
                  </div>

                </div>
              ) : (
                <div className="p-6 text-center text-slate-400 text-xs">
                  Loading editorial publication...
                </div>
              )}
            </div>

          </div>

        </div>

      </section>

      {/* =========================================
          7. ENTERPRISE CTA SECTION
          ========================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-gloss border border-white/10 p-10 sm:p-16 text-center text-white rounded-2xl space-y-8 relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
          <div className="glass-shine-overlay opacity-30"></div>
          
          <div className="max-w-3xl mx-auto space-y-4 relative z-10">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400">
              Transform Your Operating Model
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-normal text-white tracking-tight">
              {content.cta.title || "Let's Build What Comes Next."}
            </h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-light">
              {content.cta.subtitle || "Whether you need specialized talent to augment your team or an institutional domain function managed end-to-end, GG Global delivers the operational excellence your business deserves."}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <button
              id="cta-btn-talk-to-gg"
              onClick={openContactModal}
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm uppercase tracking-widest rounded-sm transition-all shadow-[0_0_25px_rgba(37,99,235,0.4)] active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <span>{content.cta.buttonText || "Talk to GG Global"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              id="cta-btn-explore-solutions"
              onClick={() => setCurrentView('solutions-domain')}
              className="w-full sm:w-auto px-8 py-4 glass-pill text-white font-semibold text-xs sm:text-sm uppercase tracking-widest rounded-sm border border-white/20 hover:bg-white/10 transition-colors"
            >
              <span>Review Domain SLAs</span>
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};
