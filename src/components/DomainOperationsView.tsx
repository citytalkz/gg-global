import React, { useState } from 'react';
import { 
  Layers, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  TrendingUp, 
  ArrowRight, 
  BarChart3, 
  FileText, 
  Lock, 
  Cpu,
  RefreshCw,
  Zap,
  Building2,
  Workflow
} from 'lucide-react';
import { WebsiteContent } from '../types';

interface DomainOperationsViewProps {
  content: WebsiteContent;
  openContactModal: () => void;
  setCurrentView: (view: string) => void;
}

export const DomainOperationsView: React.FC<DomainOperationsViewProps> = ({
  content,
  openContactModal,
  setCurrentView,
}) => {
  const [activeTab, setActiveTab] = useState<'p2p' | 'ap' | 'finance' | 'procurement'>('p2p');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24 relative text-slate-200">
      
      {/* Soft Ambient Indigo Glow */}
      <div className="absolute top-10 right-1/3 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-80 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border border-indigo-400/30 text-indigo-300 text-[11px] font-bold uppercase tracking-widest shadow-xs">
          <Layers className="w-3.5 h-3.5 text-indigo-400" />
          <span>Domain Operations Practice</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight">
          Managed Domain Operations
        </h1>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
          We build, transition, and operate defined business functions—governed by contractual SLAs, real-time KPI visibility, and continuous process optimization.
        </p>
      </div>

      {/* Difference Callout Card: Managed Function vs People */}
      <div className="glass-card border border-indigo-400/30 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl relative overflow-hidden group">
        <div className="glass-shine-overlay opacity-30 group-hover:opacity-60 transition-opacity"></div>
        
        <div className="space-y-2 max-w-2xl relative z-10">
          <span className="text-xs font-extrabold text-indigo-400 uppercase tracking-widest">The Core Distinction</span>
          <h3 className="text-xl font-serif font-bold text-white">
            Domain Operations = "You need a function managed"
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
            You don't manage individual shifts or daily micro-tasks. GG Global assumes total functional accountability with guaranteed accuracy metrics, cycle time benchmarks, and monthly audit packages.
          </p>
        </div>
        <button
          onClick={() => setCurrentView('solutions-workforce')}
          className="px-5 py-3 rounded-sm glass-pill bg-white/10 hover:bg-white/20 text-xs font-bold uppercase tracking-wider text-white transition-all shrink-0 flex items-center gap-1.5 border border-white/20 shadow-xs relative z-10"
        >
          <span>Need embedded staff instead?</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 4 Core Domain Operations Functions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Function 1: P2P */}
        <div className="glass-card rounded-2xl border border-slate-700/60 p-8 shadow-xl hover:border-blue-400/40 hover:shadow-[0_10px_35px_rgba(59,130,246,0.15)] transition-all space-y-6 flex flex-col justify-between relative overflow-hidden group">
          <div className="glass-shine-overlay opacity-30 group-hover:opacity-60 transition-opacity"></div>
          
          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl glass-card text-blue-400 flex items-center justify-center font-bold border border-slate-700/60 shadow-xs">
                <Workflow className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 rounded-full text-[10px] font-extrabold glass-pill bg-blue-500/10 text-blue-300 border border-blue-400/30">
                P2P-OPS
              </span>
            </div>

            <div>
              <h3 className="text-2xl font-serif font-bold text-white">Procure-to-Pay (P2P)</h3>
              <p className="text-xs text-blue-400 font-semibold mt-0.5 uppercase tracking-wider">Full Requisition to Disbursement Lifecycle</p>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              Standardize your entire purchasing-to-payment chain across global entities. We eliminate manual invoice bottlenecks, automate 3-way matching, and maintain spotless vendor master files.
            </p>

            <div className="space-y-2 pt-4 border-t border-slate-800/80 text-xs">
              <div className="font-bold text-white uppercase tracking-wider">Operational Deliverables:</div>
              <ul className="space-y-1.5 text-slate-300 font-light">
                <li className="flex items-center gap-2">• PO dispatch and line-item validation</li>
                <li className="flex items-center gap-2">• Automated discrepancy clearing & approval routing</li>
                <li className="flex items-center gap-2">• Payment batch generation & cash requirement forecasts</li>
                <li className="flex items-center gap-2">• Vendor inquiry helpdesk with &lt;4hr response SLA</li>
              </ul>
            </div>

            <div className="p-3.5 glass-card rounded-xl border border-slate-750 text-xs font-semibold text-slate-300 flex items-center justify-between shadow-inner">
              <span>Target Benchmark:</span>
              <span className="text-blue-400 font-bold">&lt; 48hr cycle time, 99.8% match</span>
            </div>
          </div>

          <button
            onClick={openContactModal}
            className="w-full py-3.5 rounded-sm bg-white hover:bg-blue-500 text-slate-950 hover:text-white font-bold text-xs uppercase tracking-widest transition-all relative z-10 shadow-[0_0_20px_rgba(255,255,255,0.15)] overflow-hidden group/btn active:scale-[0.98]"
          >
            <span className="relative z-10">Scope P2P Managed Operations</span>
          </button>
        </div>

        {/* Function 2: Accounts Payable */}
        <div className="glass-card rounded-2xl border border-indigo-400/20 p-8 shadow-xl hover:border-indigo-400/40 hover:shadow-[0_10px_35px_rgba(99,102,241,0.15)] transition-all space-y-6 flex flex-col justify-between relative overflow-hidden group">
          <div className="glass-shine-overlay opacity-30 group-hover:opacity-60 transition-opacity"></div>
          
          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl glass-card text-indigo-400 flex items-center justify-center font-bold border border-slate-700/60 shadow-xs">
                <FileText className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 rounded-full text-[10px] font-extrabold glass-pill bg-indigo-500/10 text-indigo-300 border border-indigo-400/30">
                AP-OPS
              </span>
            </div>

            <div>
              <h3 className="text-2xl font-serif font-bold text-white">Accounts Payable Operations</h3>
              <p className="text-xs text-indigo-400 font-semibold mt-0.5 uppercase tracking-wider">High-Volume Multi-Entity Processing</p>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              Institutional-grade accounts payable for complex corporate structures. Zero duplicate payments, strict segregation of duties, and frictionless tax compliance (1099, W-9, VAT).
            </p>

            <div className="space-y-2 pt-4 border-t border-slate-800/80 text-xs">
              <div className="font-bold text-white uppercase tracking-wider">Operational Deliverables:</div>
              <ul className="space-y-1.5 text-slate-300 font-light">
                <li className="flex items-center gap-2">• OCR invoice ingestion and metadata validation</li>
                <li className="flex items-center gap-2">• GRNI (Goods Received Not Invoiced) reconciliation</li>
                <li className="flex items-center gap-2">• Monthly AP aging analysis and early payment discount capture</li>
                <li className="flex items-center gap-2">• Month-end AP subledger close acceleration</li>
              </ul>
            </div>

            <div className="p-3.5 glass-card rounded-xl border border-slate-750 text-xs font-semibold text-slate-300 flex items-center justify-between shadow-inner">
              <span>Target Benchmark:</span>
              <span className="text-indigo-400 font-bold">99.9% accuracy, 0 duplicate payments</span>
            </div>
          </div>

          <button
            onClick={openContactModal}
            className="w-full py-3.5 rounded-sm bg-white hover:bg-indigo-600 text-slate-950 hover:text-white font-bold text-xs uppercase tracking-widest transition-all relative z-10 shadow-[0_0_20px_rgba(255,255,255,0.15)] overflow-hidden group/btn active:scale-[0.98]"
          >
            <span className="relative z-10">Scope AP Operations</span>
          </button>
        </div>

        {/* Function 3: Finance Operations */}
        <div className="glass-card rounded-2xl border border-emerald-400/20 p-8 shadow-xl hover:border-emerald-400/40 hover:shadow-[0_10px_35px_rgba(16,185,129,0.15)] transition-all space-y-6 flex flex-col justify-between relative overflow-hidden group">
          <div className="glass-shine-overlay opacity-30 group-hover:opacity-60 transition-opacity"></div>
          
          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl glass-card text-emerald-400 flex items-center justify-center font-bold border border-slate-700/60 shadow-xs">
                <BarChart3 className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 rounded-full text-[10px] font-extrabold glass-pill bg-emerald-500/10 text-emerald-300 border border-emerald-400/30">
                FIN-OPS
              </span>
            </div>

            <div>
              <h3 className="text-2xl font-serif font-bold text-white">Finance Operations</h3>
              <p className="text-xs text-emerald-400 font-semibold mt-0.5 uppercase tracking-wider">Management Accounting & Close Acceleration</p>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              Enable your onshore strategic finance leaders to focus on M&A and capital allocation while GG Global operates repeatable GL reconciliations, fixed assets, and intercompany clearing.
            </p>

            <div className="space-y-2 pt-4 border-t border-slate-800/80 text-xs">
              <div className="font-bold text-white uppercase tracking-wider">Operational Deliverables:</div>
              <ul className="space-y-1.5 text-slate-300 font-light">
                <li className="flex items-center gap-2">• Multi-currency bank and balance sheet reconciliations</li>
                <li className="flex items-center gap-2">• Intercompany netting and transfer pricing support</li>
                <li className="flex items-center gap-2">• Fixed asset register and amortization schedule maintenance</li>
                <li className="flex items-center gap-2">• Audit binder compilation & SOX compliance documentation</li>
              </ul>
            </div>

            <div className="p-3.5 glass-card rounded-xl border border-slate-750 text-xs font-semibold text-slate-300 flex items-center justify-between shadow-inner">
              <span>Target Benchmark:</span>
              <span className="text-emerald-400 font-bold">Day-3 close readiness, 100% SOX compliant</span>
            </div>
          </div>

          <button
            onClick={openContactModal}
            className="w-full py-3.5 rounded-sm bg-white hover:bg-emerald-600 text-slate-950 hover:text-white font-bold text-xs uppercase tracking-widest transition-all relative z-10 shadow-[0_0_20px_rgba(255,255,255,0.15)] overflow-hidden group/btn active:scale-[0.98]"
          >
            <span className="relative z-10">Scope Finance Operations</span>
          </button>
        </div>

        {/* Function 4: Procurement Operations */}
        <div className="glass-card rounded-2xl border border-purple-400/20 p-8 shadow-xl hover:border-purple-400/40 hover:shadow-[0_10px_35px_rgba(168,85,247,0.15)] transition-all space-y-6 flex flex-col justify-between relative overflow-hidden group">
          <div className="glass-shine-overlay opacity-30 group-hover:opacity-60 transition-opacity"></div>
          
          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl glass-card text-purple-400 flex items-center justify-center font-bold border border-slate-700/60 shadow-xs">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 rounded-full text-[10px] font-extrabold glass-pill bg-purple-500/10 text-purple-300 border border-purple-400/30">
                PROC-OPS
              </span>
            </div>

            <div>
              <h3 className="text-2xl font-serif font-bold text-white">Procurement Operations</h3>
              <p className="text-xs text-purple-400 font-semibold mt-0.5 uppercase tracking-wider">Supplier Governance & Tail-Spend Control</p>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              Govern vendor onboarding, contract renewals, and unmanaged tail-spend. Our specialized procurement pods protect corporate budgets while ensuring compliance.
            </p>

            <div className="space-y-2 pt-4 border-t border-slate-800/80 text-xs">
              <div className="font-bold text-white uppercase tracking-wider">Operational Deliverables:</div>
              <ul className="space-y-1.5 text-slate-300 font-light">
                <li className="flex items-center gap-2">• Supplier risk assessment and KYC/AML screening</li>
                <li className="flex items-center gap-2">• Contract repository tracking & proactive renewal notifications</li>
                <li className="flex items-center gap-2">• Spot purchasing & catalog management</li>
                <li className="flex items-center gap-2">• Spend analytics dashboards & leakage reports</li>
              </ul>
            </div>

            <div className="p-3.5 glass-card rounded-xl border border-slate-750 text-xs font-semibold text-slate-300 flex items-center justify-between shadow-inner">
              <span>Target Benchmark:</span>
              <span className="text-purple-400 font-bold">12-18% avg cost containment</span>
            </div>
          </div>

          <button
            onClick={openContactModal}
            className="w-full py-3.5 rounded-sm bg-white hover:bg-purple-600 text-slate-950 hover:text-white font-bold text-xs uppercase tracking-widest transition-all relative z-10 shadow-[0_0_20px_rgba(255,255,255,0.15)] overflow-hidden group/btn active:scale-[0.98]"
          >
            <span className="relative z-10">Scope Procurement Operations</span>
          </button>
        </div>

      </div>

      {/* 30-60-90 Day Transition Roadmap */}
      <div className="glass-card rounded-2xl p-8 sm:p-12 border border-slate-700/60 space-y-8 relative overflow-hidden shadow-2xl">
        <div className="glass-shine-overlay opacity-30"></div>
        <div className="max-w-2xl space-y-2 relative z-10">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Transition Governance</span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            The 30-60-90 Day Zero-Friction Transition
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-light">
            How GG Global migrates defined functions without breaking daily transaction flows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          <div className="glass-card p-6 rounded-xl border border-slate-800/80 space-y-3 hover:border-indigo-400/40 transition-colors shadow-inner">
            <div className="text-xs font-extrabold text-indigo-400 uppercase tracking-wider">DAYS 1 - 30</div>
            <div className="font-serif font-bold text-base text-white">Discovery & Shadowing</div>
            <p className="text-xs text-slate-400 leading-relaxed font-light">
              Standard Operating Procedure (SOP) documentation, system access provisioning in isolated sandboxes, and shadow processing of historical batches.
            </p>
          </div>

          <div className="glass-card p-6 rounded-xl border border-slate-800/80 space-y-3 hover:border-indigo-400/40 transition-colors shadow-inner">
            <div className="text-xs font-extrabold text-indigo-400 uppercase tracking-wider">DAYS 31 - 60</div>
            <div className="font-serif font-bold text-base text-white">Parallel Execution</div>
            <p className="text-xs text-slate-400 leading-relaxed font-light">
              GG Global executes 50-80% of live transaction volume with dual-authorization checks, resolving edge cases and establishing baseline SLA reporting.
            </p>
          </div>

          <div className="glass-card p-6 rounded-xl border border-slate-800/80 space-y-3 hover:border-indigo-400/40 transition-colors shadow-inner">
            <div className="text-xs font-extrabold text-indigo-400 uppercase tracking-wider">DAYS 61 - 90+</div>
            <div className="font-serif font-bold text-base text-white">Full Cutover & Automation</div>
            <p className="text-xs text-slate-400 leading-relaxed font-light">
              Complete functional ownership under formal contractual SLAs. Ongoing deployment of automated validation scripts and weekly executive dashboard reviews.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
