import React, { useState } from 'react';
import { 
  Users, 
  Layers, 
  Globe2, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  ArrowRight, 
  FileCheck, 
  Briefcase,
  Zap,
  Sparkles,
  Calculator
} from 'lucide-react';
import { WebsiteContent } from '../types';

interface WorkforceSolutionsViewProps {
  content: WebsiteContent;
  openContactModal: () => void;
  setCurrentView: (view: string) => void;
}

export const WorkforceSolutionsView: React.FC<WorkforceSolutionsViewProps> = ({
  content,
  openContactModal,
  setCurrentView,
}) => {
  const [teamSize, setTeamSize] = useState(3);
  const [roleType, setRoleType] = useState('Senior Finance Analyst');
  const [durationMonths, setDurationMonths] = useState(6);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24 relative text-slate-200">
      
      {/* Soft Ambient Light */}
      <div className="absolute top-10 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-80 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      
      {/* Header Banner */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border border-blue-400/30 text-blue-300 text-[11px] font-bold uppercase tracking-widest shadow-xs">
          <Users className="w-3.5 h-3.5 text-blue-400" />
          <span>Workforce Solutions Pillar</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight">
          Contract Staffing & <br />
          Dedicated Talent Pods
        </h1>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
          Provide qualified professionals who work as an extension of your existing team. You direct the daily priorities and tools; GG Global manages sourcing, vetting, global payroll, and compliance.
        </p>
      </div>

      {/* Difference Callout Card: People Extension vs Managed Function */}
      <div className="glass-card border border-blue-400/30 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl relative overflow-hidden group">
        <div className="glass-shine-overlay opacity-30 group-hover:opacity-60 transition-opacity"></div>
        <div className="space-y-2 max-w-2xl relative z-10">
          <span className="text-xs font-extrabold text-blue-400 uppercase tracking-widest">The Core Distinction</span>
          <h3 className="text-xl font-serif font-bold text-white">
            Workforce Solutions = "You need people"
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
            Unlike our Domain Operations practice (where GG Global assumes end-to-end SLA responsibility for a function), Workforce Solutions embeds top 2% pre-vetted specialists directly into your internal org chart.
          </p>
        </div>
        <button
          onClick={() => setCurrentView('solutions-domain')}
          className="px-5 py-3 rounded-sm glass-pill bg-white/10 hover:bg-white/20 text-xs font-bold uppercase tracking-wider text-white transition-all shrink-0 flex items-center gap-1.5 border border-white/20 shadow-xs relative z-10"
        >
          <span>Need a function managed instead?</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 3 Major Offering Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Offering 1 */}
        <div className="glass-card rounded-2xl border border-slate-700/60 p-8 shadow-xl hover:border-blue-400/40 hover:shadow-[0_10px_35px_rgba(59,130,246,0.15)] transition-all space-y-6 flex flex-col justify-between relative overflow-hidden group">
          <div className="glass-shine-overlay opacity-30 group-hover:opacity-60 transition-opacity"></div>
          
          <div className="space-y-4 relative z-10">
            <div className="w-12 h-12 rounded-xl glass-card text-blue-400 flex items-center justify-center border border-slate-700/60 shadow-xs">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-serif font-bold text-white">Contract Staffing</h3>
              <p className="text-xs font-semibold text-blue-400 mt-0.5 uppercase tracking-wider">Flexible 3 to 24+ Month Assignments</p>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              Rapid capacity expansion with pre-vetted individual contributors and senior domain leads. Seamlessly backfill specialized leaves, project surges, or M&A integration spikes.
            </p>

            <div className="space-y-2.5 pt-4 border-t border-slate-800/80">
              <div className="text-xs font-bold text-white uppercase tracking-wider">Core Benefits:</div>
              <ul className="space-y-2 text-xs text-slate-300 font-light">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Deployment within 7 to 14 business days</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Pre-screened for ERP (SAP, NetSuite, Oracle) & GAAP/IFRS</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Flexible extension or direct transition options</span>
                </li>
              </ul>
            </div>
          </div>

          <button
            onClick={openContactModal}
            className="w-full py-3.5 rounded-sm bg-white hover:bg-blue-500 text-slate-950 hover:text-white font-bold text-xs uppercase tracking-widest transition-all relative z-10 shadow-[0_0_20px_rgba(255,255,255,0.15)] overflow-hidden group/btn active:scale-[0.98]"
          >
            <span className="relative z-10">Request Contract Profiles</span>
          </button>
        </div>

        {/* Offering 2 */}
        <div className="glass-card rounded-2xl border border-indigo-400/20 p-8 shadow-xl hover:border-indigo-400/40 hover:shadow-[0_10px_35px_rgba(99,102,241,0.15)] transition-all space-y-6 flex flex-col justify-between relative overflow-hidden group">
          <div className="glass-shine-overlay opacity-30 group-hover:opacity-60 transition-opacity"></div>
          
          <div className="space-y-4 relative z-10">
            <div className="w-12 h-12 rounded-xl glass-card text-indigo-400 flex items-center justify-center border border-slate-700/60 shadow-xs">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-serif font-bold text-white">Dedicated Teams & Pods</h3>
              <p className="text-xs font-semibold text-indigo-400 mt-0.5 uppercase tracking-wider">Exclusive Custom-Assembled Pods</p>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              Curated squads of 4 to 25+ professionals working exclusively on your product, infrastructure, or operational backlog under your direct managerial cadence.
            </p>

            <div className="space-y-2.5 pt-4 border-t border-slate-800/80">
              <div className="text-xs font-bold text-white uppercase tracking-wider">Core Benefits:</div>
              <ul className="space-y-2 text-xs text-slate-300 font-light">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Synchronized time zones & daily standups</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Dedicated tech lead & delivery manager included</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Elastic scaling up or down with 30-day notice</span>
                </li>
              </ul>
            </div>
          </div>

          <button
            onClick={openContactModal}
            className="w-full py-3.5 rounded-sm bg-white hover:bg-indigo-600 text-slate-950 hover:text-white font-bold text-xs uppercase tracking-widest transition-all relative z-10 shadow-[0_0_20px_rgba(255,255,255,0.15)] overflow-hidden group/btn active:scale-[0.98]"
          >
            <span className="relative z-10">Assemble a Dedicated Pod</span>
          </button>
        </div>

        {/* Offering 3 */}
        <div className="glass-card rounded-2xl border border-emerald-400/20 p-8 shadow-xl hover:border-emerald-400/40 hover:shadow-[0_10px_35px_rgba(16,185,129,0.15)] transition-all space-y-6 flex flex-col justify-between relative overflow-hidden group">
          <div className="glass-shine-overlay opacity-30 group-hover:opacity-60 transition-opacity"></div>
          
          <div className="space-y-4 relative z-10">
            <div className="w-12 h-12 rounded-xl glass-card text-emerald-400 flex items-center justify-center border border-slate-700/60 shadow-xs">
              <Globe2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-serif font-bold text-white">Global Talent Deployment</h3>
              <p className="text-xs font-semibold text-emerald-400 mt-0.5 uppercase tracking-wider">Compliant Cross-Border Placements</p>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              Tap into international talent markets across Americas, EMEA, and APAC with complete legal, tax, and intellectual property shielding.
            </p>

            <div className="space-y-2.5 pt-4 border-t border-slate-800/80">
              <div className="text-xs font-bold text-white uppercase tracking-wider">Core Benefits:</div>
              <ul className="space-y-2 text-xs text-slate-300 font-light">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Zero entity setup or foreign labor liability</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Watertight IP assignment & NDAs</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Local statutory benefits and taxes fully covered</span>
                </li>
              </ul>
            </div>
          </div>

          <button
            onClick={openContactModal}
            className="w-full py-3.5 rounded-sm bg-white hover:bg-emerald-600 text-slate-950 hover:text-white font-bold text-xs uppercase tracking-widest transition-all relative z-10 shadow-[0_0_20px_rgba(255,255,255,0.15)] overflow-hidden group/btn active:scale-[0.98]"
          >
            <span className="relative z-10">Consult on Global EOR</span>
          </button>
        </div>

      </div>

      {/* Talent Vetting Process */}
      <div className="glass-card rounded-2xl p-8 sm:p-12 border border-slate-700/60 space-y-8 relative overflow-hidden shadow-2xl">
        <div className="glass-shine-overlay opacity-30"></div>
        <div className="max-w-2xl space-y-2 relative z-10">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Quality Assurance</span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            The GG Global Top 2% Vetting Rigor
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-light">
            We evaluate candidates across technical proficiency, real-world case simulations, and enterprise security literacy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
          <div className="glass-card p-5 rounded-xl border border-slate-800/80 space-y-2 hover:border-blue-400/40 transition-colors shadow-inner">
            <div className="text-xs font-extrabold text-blue-400 uppercase tracking-wider">STAGE 01</div>
            <div className="font-serif font-bold text-sm text-white">Domain Pedigree Filter</div>
            <p className="text-xs text-slate-400 font-light">Rigorous screening of prior corporate, Big 4, or deep-tech experience.</p>
          </div>
          <div className="glass-card p-5 rounded-xl border border-slate-800/80 space-y-2 hover:border-blue-400/40 transition-colors shadow-inner">
            <div className="text-xs font-extrabold text-blue-400 uppercase tracking-wider">STAGE 02</div>
            <div className="font-serif font-bold text-sm text-white">Practical Work Simulation</div>
            <p className="text-xs text-slate-400 font-light">Live ERP scenario tests, complex GL clearing, and discrepancy resolution.</p>
          </div>
          <div className="glass-card p-5 rounded-xl border border-slate-800/80 space-y-2 hover:border-blue-400/40 transition-colors shadow-inner">
            <div className="text-xs font-extrabold text-blue-400 uppercase tracking-wider">STAGE 03</div>
            <div className="font-serif font-bold text-sm text-white">Security & Compliance</div>
            <p className="text-xs text-slate-400 font-light">Comprehensive background verification, NDA signing, and hardware audit.</p>
          </div>
          <div className="glass-card p-5 rounded-xl border border-slate-800/80 space-y-2 hover:border-blue-400/40 transition-colors shadow-inner">
            <div className="text-xs font-extrabold text-blue-400 uppercase tracking-wider">STAGE 04</div>
            <div className="font-serif font-bold text-sm text-white">Continuous Performance</div>
            <p className="text-xs text-slate-400 font-light">Ongoing client check-ins and performance coaching by GG Global practice leads.</p>
          </div>
        </div>
      </div>

    </div>
  );
};
