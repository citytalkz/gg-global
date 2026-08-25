import React, { useState } from 'react';
import {
  Building2,
  Globe2,
  ShieldCheck,
  Users,
  CheckCircle2,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Send,
  Sparkles
} from 'lucide-react';
import { WebsiteContent } from '../types';
import { apiUrl } from '../config';

interface AboutViewProps {
  content: WebsiteContent;
  setCurrentView: (view: string) => void;
  openContactModal: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  content,
  setCurrentView,
  openContactModal,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24 relative text-slate-200">

      {/* Soft Ambient Light Glow */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-96 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      {/* Hero */}
      <div className="max-w-3xl space-y-4">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border border-blue-400/30 text-blue-300 text-[11px] font-bold uppercase tracking-widest shadow-xs">
          About GG Global
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight">
          An International Partner for Enterprise Talent & Operations
        </h1>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
          We bridge the gap between high-caliber international talent and mission-critical domain operations.
        </p>
      </div>

      {/* Mission & Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 rounded-2xl glass-card border border-slate-700/60 shadow-xl hover:border-blue-400/40 hover:shadow-[0_10px_35px_rgba(59,130,246,0.15)] transition-all space-y-3 relative overflow-hidden group">
          <div className="glass-shine-overlay opacity-30 group-hover:opacity-60 transition-opacity"></div>
          <div className="w-10 h-10 rounded-xl glass-card text-blue-400 flex items-center justify-center font-serif font-bold text-base border border-blue-400/30 relative z-10 shadow-inner">
            01
          </div>
          <h3 className="font-serif font-bold text-xl text-white relative z-10">Zero Transactional Fluff</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed relative z-10 font-light">
            We reject the low-quality resume dumping of generic staffing agencies and the opaque, rigid layers of legacy offshore BPOs.
          </p>
        </div>

        <div className="p-8 rounded-2xl glass-card border border-indigo-400/20 shadow-xl hover:border-indigo-400/40 hover:shadow-[0_10px_35px_rgba(99,102,241,0.15)] transition-all space-y-3 relative overflow-hidden group">
          <div className="glass-shine-overlay opacity-30 group-hover:opacity-60 transition-opacity"></div>
          <div className="w-10 h-10 rounded-xl glass-card text-indigo-400 flex items-center justify-center font-serif font-bold text-base border border-indigo-400/30 relative z-10 shadow-inner">
            02
          </div>
          <h3 className="font-serif font-bold text-xl text-white relative z-10">Institutional Governance</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed relative z-10 font-light">
            Every team and domain pod operates under contractual SLAs, data privacy controls, and transparent daily reporting metrics.
          </p>
        </div>

        <div className="p-8 rounded-2xl glass-card border border-amber-400/20 shadow-xl hover:border-amber-400/40 hover:shadow-[0_10px_35px_rgba(245,158,11,0.15)] transition-all space-y-3 relative overflow-hidden group">
          <div className="glass-shine-overlay opacity-30 group-hover:opacity-60 transition-opacity"></div>
          <div className="w-10 h-10 rounded-xl glass-card text-amber-400 flex items-center justify-center font-serif font-bold text-base border border-amber-400/30 relative z-10 shadow-inner">
            03
          </div>
          <h3 className="font-serif font-bold text-xl text-white relative z-10">Thought Leadership</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed relative z-10 font-light">
            Through <span className="font-serif font-bold text-white">Globally Unscripted</span>, we maintain direct dialogue with Fortune 500 CFOs and leaders shaping modern business.
          </p>
        </div>
      </div>

      {/* Global Footprint */}
      <div className="glass-card rounded-2xl p-8 sm:p-12 border border-slate-700/60 space-y-8 relative overflow-hidden shadow-2xl">
        <div className="glass-shine-overlay opacity-30"></div>
        <div className="max-w-2xl space-y-2 relative z-10">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Global Reach</span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            International Delivery Network
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-light">
            Headquartered in Singapore with specialized hubs across London, New York, and Bangalore.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {content.contact.offices.map((office, idx) => (
            <div key={idx} className="glass-card p-6 rounded-xl border border-slate-800/80 space-y-2 shadow-inner hover:border-blue-400/40 transition-colors">
              <div className="text-[11px] font-bold text-blue-400 uppercase tracking-wider">{office.type}</div>
              <h3 className="font-serif font-bold text-white text-lg">{office.city}</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-light">{office.address}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center glass-card border border-slate-700/60 text-white rounded-2xl p-10 sm:p-14 space-y-6 shadow-2xl relative overflow-hidden group">
        <div className="glass-shine-overlay opacity-20 group-hover:opacity-40 transition-opacity"></div>
        <h2 className="text-2xl sm:text-4xl font-serif font-bold relative z-10">
          Ready to scale your talent & domain operations?
        </h2>
        <button
          onClick={openContactModal}
          className="px-8 py-3.5 bg-white text-slate-950 hover:bg-slate-200 font-bold text-xs uppercase tracking-widest rounded-sm transition-all shadow-[0_0_25px_rgba(255,255,255,0.2)] relative z-10 active:scale-[0.98]"
        >
          Talk to GG Global
        </button>
      </div>

    </div>
  );
};

export const ContactView: React.FC<{ content: WebsiteContent }> = ({ content }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    country: '',
    service: 'Domain Operations (P2P/Finance)',
    headcount: '4-10 team',
    requirement: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(apiUrl('/api/leads'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'Contact Form',
        }),
      });

      if (res.ok) {
        setIsSubmitted(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 relative text-slate-200">

      {/* Soft Ambient Light Glow */}
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-3xl space-y-3">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border border-blue-400/30 text-blue-300 text-[11px] font-bold uppercase tracking-widest shadow-xs">
          Engagement Desk
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight">
          Talk to GG Global
        </h1>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
          Connect directly with our workforce architects and domain operations practice leaders to scope your team deployment or process SLA framework.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

        {/* Form */}
        <div className="lg:col-span-7 glass-card rounded-2xl p-8 sm:p-10 border border-slate-700/60 shadow-2xl relative overflow-hidden">
          <div className="glass-shine-overlay opacity-30"></div>
          {isSubmitted ? (
            <div className="py-16 text-center space-y-4 relative z-10">
              <div className="w-16 h-16 rounded-full glass-card text-emerald-400 mx-auto flex items-center justify-center border border-emerald-400/30 shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-white">Enquiry Received</h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed font-light">
                Thank you for contacting GG Global. An enterprise practice leader will review your requirements and respond within 24 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Full Name"
                    className="w-full px-4 py-3 bg-[#0C1017]/80 border border-slate-700/60 rounded-sm focus:bg-[#0C1017] focus:outline-none focus:border-blue-400 text-white text-sm placeholder-slate-500 shadow-inner"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Enterprise / Org"
                    className="w-full px-4 py-3 bg-[#0C1017]/80 border border-slate-700/60 rounded-sm focus:bg-[#0C1017] focus:outline-none focus:border-blue-400 text-white text-sm placeholder-slate-500 shadow-inner"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-4 py-3 bg-[#0C1017]/80 border border-slate-700/60 rounded-sm focus:bg-[#0C1017] focus:outline-none focus:border-blue-400 text-white text-sm placeholder-slate-500 shadow-inner"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Phone / Country
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={e => setFormData({ ...formData, country: e.target.value })}
                    placeholder="e.g. +1 (415) ... / USA"
                    className="w-full px-4 py-3 bg-[#0C1017]/80 border border-slate-700/60 rounded-sm focus:bg-[#0C1017] focus:outline-none focus:border-blue-400 text-white text-sm placeholder-slate-500 shadow-inner"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Primary Service Interest
                  </label>
                  <select
                    value={formData.service}
                    onChange={e => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0C1017] border border-slate-700/60 rounded-sm focus:outline-none focus:border-blue-400 text-white text-sm font-medium shadow-inner"
                  >
                    <option value="Domain Operations (P2P/Finance)">Domain Operations (P2P / AP / Finance)</option>
                    <option value="Contract Staffing">Contract Staffing (Extension)</option>
                    <option value="Dedicated Teams">Dedicated Teams & Pods</option>
                    <option value="Procurement Operations">Procurement Operations</option>
                    <option value="Global Talent Deployment">Global Talent Deployment (EOR)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Estimated Headcount / Scale
                  </label>
                  <select
                    value={formData.headcount}
                    onChange={e => setFormData({ ...formData, headcount: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0C1017] border border-slate-700/60 rounded-sm focus:outline-none focus:border-blue-400 text-white text-sm font-medium shadow-inner"
                  >
                    <option value="1-3 specialists">1 - 3 Specialists</option>
                    <option value="4-10 team">4 - 10 Dedicated Pod</option>
                    <option value="10-25 department">10 - 25 Department Function</option>
                    <option value="25+ full function">25+ Full Business Function</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Requirement Brief / Objectives
                </label>
                <textarea
                  rows={4}
                  value={formData.requirement}
                  onChange={e => setFormData({ ...formData, requirement: e.target.value })}
                  placeholder="Outline your target ERP stack (SAP, NetSuite), transaction volume, SLA targets, or hiring timeline..."
                  className="w-full px-4 py-3 bg-[#0C1017]/80 border border-slate-700/60 rounded-sm focus:bg-[#0C1017] focus:outline-none focus:border-blue-400 text-white text-sm placeholder-slate-500 shadow-inner"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-white hover:bg-blue-500 text-slate-950 hover:text-white font-bold text-xs uppercase tracking-widest rounded-sm shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all flex items-center justify-center gap-2 relative overflow-hidden group/btn active:scale-[0.98]"
              >
                <span className="relative z-10">{isSubmitting ? "Submitting..." : "Submit Enterprise Enquiry"}</span>
                <Send className="w-4 h-4 relative z-10" />
              </button>
            </form>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-5 space-y-8">
          <div className="glass-card rounded-2xl p-8 border border-slate-700/60 space-y-6 shadow-xl">
            <h3 className="font-serif font-bold text-white text-xl">Direct Corporate Inquiries</h3>
            <div className="space-y-4 text-sm text-slate-300">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-400" />
                <span className="font-semibold text-white">{content.contact.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-400" />
                <span className="font-semibold text-white">{content.contact.phone}</span>
              </div>
            </div>
          </div>

          <div className="p-6 glass-card border border-blue-400/30 rounded-2xl text-xs text-blue-200 space-y-2 shadow-inner">
            <span className="font-bold block uppercase tracking-widest text-blue-300">Enterprise Confidentiality</span>
            <p className="leading-relaxed font-light">All inquiries are treated under mutual NDA. We do not share your requirement details with third parties.</p>
          </div>
        </div>

      </div>

    </div>
  );
};
