import React from 'react';
import { ArrowRight, Mail, Phone, MapPin, Globe, Linkedin, Twitter, Youtube, Shield, CheckCircle } from 'lucide-react';
import { WebsiteContent } from '../types';

interface FooterProps {
  content: WebsiteContent;
  setCurrentView: (view: string, slug?: string) => void;
  openContactModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ content, setCurrentView, openContactModal }) => {
  const handleNav = (view: string, slug?: string) => {
    setCurrentView(view, slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A0E15] text-slate-400 border-t border-slate-800/80 font-sans relative overflow-hidden">
      {/* Background ambient gloss */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      
      {/* Upper Pre-Footer Callout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-800/80">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8 space-y-3">
            <span className="text-xs font-bold tracking-[0.2em] text-blue-400 uppercase">
              Global Operating Partner
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif text-white tracking-tight">
              Ready to eliminate capacity friction and scale your operations?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed font-light">
              Connect directly with our workforce architects and domain operations practice leads to scope your deployment.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-4">
            <button
              id="footer-btn-talk-to-gg"
              onClick={openContactModal}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-slate-950 bg-white hover:bg-blue-500 hover:text-white rounded-sm transition-all shadow-[0_0_25px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] active:scale-[0.98]"
            >
              <span>Talk to GG Global</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 text-[11px] text-slate-300">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>SLA-backed guarantee & 7-14 day deployment</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1: Brand & Positioning */}
          <div className="lg:col-span-2 space-y-4">
            <div 
              onClick={() => handleNav('home')} 
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-8 h-8 bg-slate-800 border border-slate-700 flex items-center justify-center text-white font-bold text-sm rounded-xs group-hover:bg-blue-600 transition-colors">
                GG
              </div>
              <span className="text-xl font-bold tracking-tighter text-white group-hover:text-blue-400 transition-colors">
                GG GLOBAL
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm font-light">
              Global Talent & Domain Operations partner helping international enterprises access vetted talent and operate defined business functions with institutional SLA precision.
            </p>

            <div className="pt-2 flex items-center gap-2.5">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-xs glass-pill hover:bg-blue-600 hover:text-white flex items-center justify-center transition-all text-slate-300 border border-slate-700"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-xs glass-pill hover:bg-blue-400 hover:text-white flex items-center justify-center transition-all text-slate-300 border border-slate-700"
                aria-label="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-xs glass-pill hover:bg-red-600 hover:text-white flex items-center justify-center transition-all text-slate-300 border border-slate-700"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Workforce Solutions */}
          <div className="space-y-3">
            <div className="text-[11px] font-bold uppercase tracking-widest text-white">
              Workforce Solutions
            </div>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button 
                  onClick={() => handleNav('solutions-workforce')} 
                  className="hover:text-white transition-colors text-left"
                >
                  Contract Staffing
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('solutions-workforce')} 
                  className="hover:text-white transition-colors text-left"
                >
                  Dedicated Teams & Pods
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('solutions-workforce')} 
                  className="hover:text-white transition-colors text-left"
                >
                  Global Talent Deployment
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('solutions-workforce')} 
                  className="hover:text-white transition-colors text-left"
                >
                  Vetting & Compliance
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Domain Operations */}
          <div className="space-y-3">
            <div className="text-[11px] font-bold uppercase tracking-widest text-white">
              Domain Operations
            </div>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button 
                  onClick={() => handleNav('solutions-domain')} 
                  className="hover:text-white transition-colors text-left"
                >
                  Procure-to-Pay (P2P)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('solutions-domain')} 
                  className="hover:text-white transition-colors text-left"
                >
                  Accounts Payable
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('solutions-domain')} 
                  className="hover:text-white transition-colors text-left"
                >
                  Finance Operations
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('solutions-domain')} 
                  className="hover:text-white transition-colors text-left"
                >
                  Procurement Operations
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('solutions-domain')} 
                  className="hover:text-white transition-colors text-left"
                >
                  SLA & KPI Governance
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Editorial & Company */}
          <div className="space-y-3">
            <div className="text-[11px] font-bold uppercase tracking-widest text-blue-400">
              Globally Unscripted
            </div>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button 
                  onClick={() => handleNav('globally-unscripted')} 
                  className="hover:text-white transition-colors text-left flex items-center gap-1.5"
                >
                  <span>CFO Interview Series</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('globally-unscripted')} 
                  className="hover:text-white transition-colors text-left"
                >
                  Leadership Conversations
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('globally-unscripted')} 
                  className="hover:text-white transition-colors text-left"
                >
                  Executive Insights
                </button>
              </li>
              <li className="pt-2">
                <button 
                  onClick={() => handleNav('about')} 
                  className="hover:text-white transition-colors text-left block text-slate-300"
                >
                  About GG Global
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('admin')} 
                  className="hover:text-blue-400 transition-colors text-left text-xs text-slate-500"
                >
                  Admin CMS Portal
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Global Hubs Strip */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-slate-400">
          {content.contact.offices.map((office, idx) => (
            <div key={idx} className="space-y-1">
              <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>{office.city} ({office.type})</span>
              </div>
              <p className="text-slate-400 font-light">{office.address}</p>
            </div>
          ))}
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="bg-[#0A0E17] py-6 border-t border-slate-800/50 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} GG Global Holdings Inc. All rights reserved. Globally Unscripted is an editorial publication of GG Global.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Notice</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Engagement</span>
            <span className="hover:text-slate-300 cursor-pointer">SOC 2 Compliance</span>
            <a href="/api/sitemap.xml" target="_blank" className="hover:text-slate-300">Sitemap XML</a>
          </div>
        </div>
      </div>

    </footer>
  );
};
