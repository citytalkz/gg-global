import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, Shield, Send } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
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

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'Consultation Modal',
        }),
      });

      if (res.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          onClose();
        }, 2200);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="glass-card rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 border border-slate-700/60 shadow-[0_20px_50px_rgba(0,0,0,0.8)] space-y-6 relative animate-in fade-in-50 text-slate-200">
        <div className="glass-shine-overlay opacity-30"></div>
        
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/50 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-12 text-center space-y-4 relative z-10">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/30 shadow-[0_0_25px_rgba(16,185,129,0.2)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-white">Requirement Logged</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xs mx-auto leading-relaxed font-light">
              Our domain practice leadership will review your specifications and reach out within 24 business hours.
            </p>
          </div>
        ) : (
          <div className="relative z-10 space-y-5">
            <div className="space-y-1 pr-8">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill border border-blue-400/30 text-blue-400 text-[10px] font-bold uppercase tracking-widest">
                Enterprise Engagement
              </span>
              <h2 className="text-2xl font-serif font-bold text-white">
                Talk to GG Global
              </h2>
              <p className="text-xs text-slate-400 font-light">
                Scope your contract staffing, dedicated pods, or managed domain operations.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1 uppercase tracking-wider text-[11px]">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Rachel Vance"
                    className="w-full px-3 py-2.5 bg-[#0C1017]/80 border border-slate-700/60 rounded-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-inner text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1 uppercase tracking-wider text-[11px]">Company / Organization *</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Acme Corp"
                    className="w-full px-3 py-2.5 bg-[#0C1017]/80 border border-slate-700/60 rounded-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-inner text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1 uppercase tracking-wider text-[11px]">Work Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="rachel@acme.com"
                    className="w-full px-3 py-2.5 bg-[#0C1017]/80 border border-slate-700/60 rounded-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-inner text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1 uppercase tracking-wider text-[11px]">Phone / Region</label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={e => setFormData({ ...formData, country: e.target.value })}
                    placeholder="+1 555-0192 / US"
                    className="w-full px-3 py-2.5 bg-[#0C1017]/80 border border-slate-700/60 rounded-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-inner text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1 uppercase tracking-wider text-[11px]">Service Required</label>
                  <select
                    value={formData.service}
                    onChange={e => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#0C1017] border border-slate-700/60 rounded-sm text-slate-200 focus:outline-none focus:border-blue-500 shadow-inner text-xs font-medium"
                  >
                    <option value="Domain Operations (P2P/Finance)">Domain Operations (P2P/Finance)</option>
                    <option value="Contract Staffing">Contract Staffing</option>
                    <option value="Dedicated Teams">Dedicated Teams & Pods</option>
                    <option value="Procurement Operations">Procurement Operations</option>
                    <option value="Global Talent Deployment">Global Talent Deployment (EOR)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1 uppercase tracking-wider text-[11px]">Expected Scale</label>
                  <select
                    value={formData.headcount}
                    onChange={e => setFormData({ ...formData, headcount: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#0C1017] border border-slate-700/60 rounded-sm text-slate-200 focus:outline-none focus:border-blue-500 shadow-inner text-xs font-medium"
                  >
                    <option value="1-3 specialists">1-3 Specialists</option>
                    <option value="4-10 team">4-10 Pod</option>
                    <option value="10-25 department">10-25 Department</option>
                    <option value="25+ full function">25+ Full Business Function</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1 uppercase tracking-wider text-[11px]">Requirement Overview</label>
                <textarea
                  rows={3}
                  value={formData.requirement}
                  onChange={e => setFormData({ ...formData, requirement: e.target.value })}
                  placeholder="Target launch date, key tools (SAP, Oracle, NetSuite), or SLA requirements..."
                  className="w-full px-3 py-2 bg-[#0C1017]/80 border border-slate-700/60 rounded-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-inner text-xs"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-white hover:bg-blue-500 text-slate-950 hover:text-white font-bold rounded-sm shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-widest relative overflow-hidden group/btn active:scale-[0.98]"
                >
                  <span className="relative z-10">{isSubmitting ? "Submitting Requirement..." : "Submit Requirement"}</span>
                  <ArrowRight className="w-4 h-4 relative z-10" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 pt-1">
                <Shield className="w-3 h-3 text-emerald-400" />
                <span>Protected under Enterprise Non-Disclosure Standards</span>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
