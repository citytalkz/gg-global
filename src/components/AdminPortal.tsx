import React, { useState, useEffect } from 'react';
import {
  Lock,
  Unlock,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  Clock,
  Users,
  FileText,
  Layers,
  Eye,
  Search,
  RefreshCw,
  Download,
  Sparkles,
  X,
  Save,
  Check,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  MessageSquare,
  Bot,
  Settings,
  Phone,
  Mail,
  Building
} from 'lucide-react';
import { Interview, Lead, WebsiteContent } from '../types';

interface AdminPortalProps {
  initialInterviews: Interview[];
  initialContent: WebsiteContent;
  onRefreshData: () => Promise<void>;
  onClose: () => void;
  setCurrentView: (view: string, slug?: string) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  initialInterviews,
  initialContent,
  onRefreshData,
  onClose,
  setCurrentView,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authToken, setAuthToken] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'interviews' | 'leads' | 'cms' | 'ai'>('dashboard');

  // Data states
  const [interviews, setInterviews] = useState<Interview[]>(initialInterviews);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [content, setContent] = useState<WebsiteContent>(initialContent);
  const [isLoading, setIsLoading] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // Interview Edit/Create Modal
  const [isInterviewModalOpen, setIsInterviewModalOpen] = useState(false);
  const [editingInterview, setEditingInterview] = useState<Partial<Interview>>({});
  const [highlightsInput, setHighlightsInput] = useState('');
  const [tagsInput, setTagsInput] = useState('');

  // Lead Note editing
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [leadNoteInput, setLeadNoteInput] = useState('');

  // Search in tabs
  const [interviewSearch, setInterviewSearch] = useState('');
  const [leadSearch, setLeadSearch] = useState('');
  const [leadStatusFilter, setLeadStatusFilter] = useState('All');

  // AI test
  const [testPrompt, setTestPrompt] = useState('What are GG Global domain operations?');
  const [aiTestResponse, setAiTestResponse] = useState('');
  const [isTestingAi, setIsTestingAi] = useState(false);

  useEffect(() => {
    setInterviews(initialInterviews);
  }, [initialInterviews]);

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  // Fetch leads when authenticated
  const fetchLeadsWithToken = async (tok: string) => {
    try {
      const res = await fetch('/api/leads', {
        headers: { 'Authorization': `Bearer ${tok}` }
      });
      if (res.ok) {
        const data = await res.json();
        setLeads(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchLeads = () => fetchLeadsWithToken(authToken);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailInput, password: passwordInput }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        setAuthToken(data.token);
        setIsAuthenticated(true);
        // fetchLeads is defined below and reads authToken via closure on next render;
        // call it directly with the fresh token to avoid a stale-state race.
        fetchLeadsWithToken(data.token);
      } else {
        setLoginError(data.error || 'Invalid credentials.');
      }
    } catch (err) {
      setLoginError('Could not reach the server. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleSaveInterview = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const payload: Partial<Interview> = {
      ...editingInterview,
      keyHighlights: highlightsInput.split('\n').map(h => h.trim()).filter(Boolean),
      tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean),
      publishedAt: editingInterview.publishedAt || new Date().toISOString().split('T')[0],
      isPublished: editingInterview.isPublished ?? true,
    };

    try {
      let res;
      if (editingInterview.id) {
        // Update
        res = await fetch(`/api/interviews/${editingInterview.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify(payload),
        });
      } else {
        // Create
        res = await fetch('/api/interviews', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify(payload),
        });
      }

      if (res.ok) {
        await onRefreshData();
        setIsInterviewModalOpen(false);
        setSaveSuccessMsg('Interview saved successfully!');
        setTimeout(() => setSaveSuccessMsg(''), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteInterview = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this interview?')) return;
    try {
      const res = await fetch(`/api/interviews/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
      if (res.ok) {
        await onRefreshData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateLeadStatus = async (leadId: string, status: Lead['status'], notes?: string) => {
    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({ status, notes }),
      });
      if (res.ok) {
        fetchLeads();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveWebsiteContent = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(content),
      });
      if (res.ok) {
        await onRefreshData();
        setSaveSuccessMsg('Website content updated live!');
        setTimeout(() => setSaveSuccessMsg(''), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestAi = async () => {
    setIsTestingAi(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ sender: 'user', text: testPrompt }]
        })
      });
      const data = await res.json();
      setAiTestResponse(data.reply);
    } catch (err) {
      setAiTestResponse('Error querying AI');
    } finally {
      setIsTestingAi(false);
    }
  };

  const exportLeadsCsv = () => {
    const headers = ["ID", "Name", "Company", "Email", "Phone", "Country", "Service", "Headcount", "Status", "Source", "Date", "Requirement", "Notes"];
    const rows = leads.map(l => [
      l.id,
      `"${l.name}"`,
      `"${l.company}"`,
      `"${l.email}"`,
      `"${l.phone || ''}"`,
      `"${l.country || ''}"`,
      `"${l.service}"`,
      `"${l.headcount}"`,
      `"${l.status}"`,
      `"${l.source}"`,
      `"${l.createdAt}"`,
      `"${(l.requirement || '').replace(/"/g, '""')}"`,
      `"${(l.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `gg_global_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Auth Guard Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-12 relative text-gray-200">
        <div className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
        <div className="max-w-md w-full glass-card rounded-3xl p-8 border border-white/15 shadow-2xl space-y-6 relative overflow-hidden">
          <div className="glass-shine-overlay opacity-30"></div>
          <div className="text-center space-y-2 relative z-10">
            <div className="w-12 h-12 rounded-2xl glass-card text-blue-400 flex items-center justify-center mx-auto border border-blue-400/30 shadow-xs">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white font-serif">GG Global Admin CMS</h2>
            <p className="text-xs text-gray-400 font-light">Enterprise content management & lead pipeline</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 relative z-10">
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                Admin Email
              </label>
              <input
                type="email"
                value={emailInput}
                onChange={e => setEmailInput(e.target.value)}
                placeholder="you@ggglobal.in"
                autoComplete="username"
                className="w-full px-4 py-3 bg-[#0B0D11]/60 border border-white/15 rounded-xl focus:bg-[#0B0D11]/90 focus:outline-none focus:border-blue-400 text-white text-sm placeholder-gray-500 shadow-inner"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={e => setPasswordInput(e.target.value)}
                placeholder="Enter password"
                autoComplete="current-password"
                className="w-full px-4 py-3 bg-[#0B0D11]/60 border border-white/15 rounded-xl focus:bg-[#0B0D11]/90 focus:outline-none focus:border-blue-400 text-white text-sm placeholder-gray-500 shadow-inner"
              />
              {loginError && (
                <p className="text-[11px] text-red-400 mt-1.5 font-medium">{loginError}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3.5 bg-white hover:bg-blue-500 text-[#0B0D11] hover:text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] text-xs uppercase tracking-widest active:scale-[0.98] disabled:opacity-60"
            >
              {isLoggingIn ? 'Signing In...' : 'Sign In to Management Portal'}
            </button>
          </form>

          <div className="pt-4 border-t border-white/10 text-center relative z-10">
            <button
              onClick={onClose}
              className="text-xs text-gray-400 hover:text-white font-medium transition-colors"
            >
              Return to Public Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Calculate Metrics
  const totalInterviews = interviews.length;
  const publishedInterviews = interviews.filter(i => i.isPublished).length;
  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.status === 'New').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-gray-200">

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card p-6 rounded-2xl border border-white/15 shadow-xl relative overflow-hidden">
        <div className="glass-shine-overlay opacity-30"></div>
        <div className="space-y-1 relative z-10">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white font-serif">Enterprise Control Center</h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-500/10 text-emerald-300 border border-emerald-400/30">
              Authenticated
            </span>
          </div>
          <p className="text-xs text-gray-400 font-light">Manage Globally Unscripted articles, client leads, and website copy.</p>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          {saveSuccessMsg && (
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>{saveSuccessMsg}</span>
            </span>
          )}
          <button
            onClick={() => {
              onRefreshData();
              fetchLeads();
            }}
            className="p-2.5 text-gray-300 hover:text-white glass-card rounded-lg border border-white/10 hover:border-white/20 transition-all"
            title="Refresh database records"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 bg-white hover:bg-gray-200 text-[#0B0D11] text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-[0_0_15px_rgba(255,255,255,0.15)]"
          >
            Exit to Website
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${activeTab === 'dashboard'
              ? 'bg-white text-[#0B0D11] shadow-[0_0_15px_rgba(255,255,255,0.2)]'
              : 'glass-card hover:bg-white/10 text-gray-300 border border-white/10'
            }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Dashboard Overview</span>
        </button>

        <button
          onClick={() => setActiveTab('interviews')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${activeTab === 'interviews'
              ? 'bg-white text-[#0B0D11] shadow-[0_0_15px_rgba(255,255,255,0.2)]'
              : 'glass-card hover:bg-white/10 text-gray-300 border border-white/10'
            }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Globally Unscripted CMS ({totalInterviews})</span>
        </button>

        <button
          onClick={() => setActiveTab('leads')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${activeTab === 'leads'
              ? 'bg-white text-[#0B0D11] shadow-[0_0_15px_rgba(255,255,255,0.2)]'
              : 'glass-card hover:bg-white/10 text-gray-300 border border-white/10'
            }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Enterprise Leads & CRM ({totalLeads})</span>
          {newLeads > 0 && (
            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('cms')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${activeTab === 'cms'
              ? 'bg-white text-[#0B0D11] shadow-[0_0_15px_rgba(255,255,255,0.2)]'
              : 'glass-card hover:bg-white/10 text-gray-300 border border-white/10'
            }`}
        >
          <Settings className="w-3.5 h-3.5" />
          <span>Website Copy CMS</span>
        </button>

        <button
          onClick={() => setActiveTab('ai')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${activeTab === 'ai'
              ? 'bg-white text-[#0B0D11] shadow-[0_0_15px_rgba(255,255,255,0.2)]'
              : 'glass-card hover:bg-white/10 text-gray-300 border border-white/10'
            }`}
        >
          <Bot className="w-3.5 h-3.5" />
          <span>GG Assistant Simulator</span>
        </button>
      </div>

      {/* ====================================================
          TAB 1: DASHBOARD OVERVIEW
          ==================================================== */}
      {activeTab === 'dashboard' && (
        <div className="space-y-8">

          {/* Top Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl glass-card border border-white/15 shadow-xl space-y-2 relative overflow-hidden">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Editorial Articles</span>
              <div className="text-3xl font-bold text-white font-serif">{totalInterviews}</div>
              <div className="text-xs text-emerald-400 font-semibold">{publishedInterviews} Published Live</div>
            </div>

            <div className="p-6 rounded-2xl glass-card border border-white/15 shadow-xl space-y-2 relative overflow-hidden">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Enterprise Inquiries</span>
              <div className="text-3xl font-bold text-white font-serif">{totalLeads}</div>
              <div className="text-xs text-blue-400 font-semibold">{newLeads} Pending Action</div>
            </div>

            <div className="p-6 rounded-2xl glass-card border border-white/15 shadow-xl space-y-2 relative overflow-hidden">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">AI Assistant Status</span>
              <div className="text-3xl font-bold text-emerald-400 font-serif">Active</div>
              <div className="text-xs text-gray-400 font-medium font-light">Synced with Live DB</div>
            </div>

            <div className="p-6 rounded-2xl glass-card border border-white/15 shadow-xl space-y-2 relative overflow-hidden">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Database Persistence</span>
              <div className="text-3xl font-bold text-white font-serif">Live</div>
              <div className="text-xs text-gray-400 font-medium font-light">Server File Backed</div>
            </div>
          </div>

          {/* Quick Actions & Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Quick Action Column */}
            <div className="lg:col-span-4 space-y-4">
              <h3 className="font-bold text-base text-white font-serif">Quick Editorial Actions</h3>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    setEditingInterview({
                      title: '',
                      slug: '',
                      executiveName: '',
                      executiveRole: '',
                      company: '',
                      companyLogo: '',
                      executivePhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
                      category: 'Finance Leadership',
                      readTime: '6 min read',
                      videoDuration: '18 mins',
                      youtubeId: 'dQw4w9WgXcQ',
                      linkedinUrl: 'https://linkedin.com',
                      summary: '',
                      intro: '',
                      content: '### Executive Briefing\n\n**Globally Unscripted:** Welcome.\n\n**Executive:** Thank you.',
                      isPublished: true,
                    });
                    setHighlightsInput('Key strategic priority #1\nOperational automation focus');
                    setTagsInput('CFO, Leadership, Operations');
                    setIsInterviewModalOpen(true);
                  }}
                  className="w-full p-4 rounded-xl glass-card hover:bg-blue-500/10 border border-blue-400/30 text-left transition-all flex items-center justify-between group shadow-lg"
                >
                  <div className="space-y-1">
                    <div className="text-sm font-bold text-blue-300 flex items-center gap-1.5">
                      <Plus className="w-4 h-4" />
                      <span>Create New Interview</span>
                    </div>
                    <p className="text-xs text-gray-300 font-light">Add a new CFO or executive dialogue to Globally Unscripted.</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => setActiveTab('leads')}
                  className="w-full p-4 rounded-xl glass-card hover:bg-white/10 border border-white/15 text-left transition-all flex items-center justify-between group shadow-lg"
                >
                  <div className="space-y-1">
                    <div className="text-sm font-bold text-white flex items-center gap-1.5">
                      <Users className="w-4 h-4" />
                      <span>Review Client Pipeline</span>
                    </div>
                    <p className="text-xs text-gray-400 font-light">Track and respond to staffing and P2P requests.</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => setActiveTab('cms')}
                  className="w-full p-4 rounded-xl glass-card hover:bg-white/10 border border-white/15 text-left transition-all flex items-center justify-between group shadow-lg"
                >
                  <div className="space-y-1">
                    <div className="text-sm font-bold text-white flex items-center gap-1.5">
                      <Edit3 className="w-4 h-4" />
                      <span>Update Homepage Copy</span>
                    </div>
                    <p className="text-xs text-gray-400 font-light">Edit headline, pillars, and office contact information.</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Recent Leads Preview */}
            <div className="lg:col-span-8 glass-card rounded-2xl border border-white/15 p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-white font-serif">Recent Inquiries</h3>
                <button
                  onClick={() => setActiveTab('leads')}
                  className="text-xs font-bold text-blue-400 hover:underline"
                >
                  View All ({totalLeads})
                </button>
              </div>

              {leads.length === 0 ? (
                <div className="p-8 text-center text-gray-400 glass-card rounded-xl border border-white/5">
                  No inquiries received yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {leads.slice(0, 4).map((lead) => (
                    <div
                      key={lead.id}
                      className="p-4 rounded-xl glass-card border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-inner hover:border-white/20 transition-all"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-white">{lead.name}</span>
                          <span className="text-xs text-gray-400">• {lead.company}</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-300 border border-blue-400/30">
                            {lead.service}
                          </span>
                        </div>
                        <div className="text-xs text-gray-400 font-light">
                          {lead.email} | {lead.source} | {new Date(lead.createdAt).toLocaleDateString()}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-1 rounded text-xs font-bold ${lead.status === 'New' ? 'bg-amber-500/15 text-amber-300 border border-amber-400/30' :
                            lead.status === 'Qualified' ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-400/30' : 'bg-white/10 text-gray-300 border border-white/15'
                          }`}>
                          {lead.status}
                        </span>
                        <button
                          onClick={() => {
                            setSelectedLead(lead);
                            setLeadNoteInput(lead.notes || '');
                            setActiveTab('leads');
                          }}
                          className="px-3 py-1 bg-white/10 border border-white/15 hover:bg-white/20 rounded text-xs font-semibold text-white transition-colors"
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>
      )}

      {/* ====================================================
          TAB 2: GLOBALLY UNSCRIPTED CMS
          ==================================================== */}
      {activeTab === 'interviews' && (
        <div className="space-y-6">

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white font-serif">Globally Unscripted Articles</h2>
              <p className="text-xs text-gray-400 font-light">Add, edit, or publish executive interviews and leadership video conversations.</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={interviewSearch}
                  onChange={e => setInterviewSearch(e.target.value)}
                  placeholder="Filter interviews..."
                  className="pl-8 pr-3 py-1.5 text-xs bg-[#0B0D11]/60 border border-white/15 rounded-lg focus:outline-none focus:border-blue-400 text-white placeholder-gray-500 shadow-inner"
                />
              </div>

              <button
                onClick={() => {
                  setEditingInterview({
                    title: '',
                    slug: '',
                    executiveName: '',
                    executiveRole: '',
                    company: '',
                    companyLogo: '',
                    executivePhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
                    category: 'Finance Leadership',
                    readTime: '7 min read',
                    videoDuration: '22 mins',
                    youtubeId: 'dQw4w9WgXcQ',
                    linkedinUrl: 'https://linkedin.com',
                    summary: '',
                    intro: '',
                    content: '### Executive Insights\n\n**Globally Unscripted:** Welcome.\n\n**Executive:** Thank you.',
                    isPublished: true,
                  });
                  setHighlightsInput('Key strategic priority\nScaling domain operations');
                  setTagsInput('CFO, Scaling, Operations');
                  setIsInterviewModalOpen(true);
                }}
                className="px-4 py-2 bg-white hover:bg-gray-200 text-[#0B0D11] text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(255,255,255,0.15)]"
              >
                <Plus className="w-4 h-4" />
                <span>New Interview</span>
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="glass-card rounded-2xl border border-white/15 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-white/5 border-b border-white/10 text-gray-400 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-4">Executive & Company</th>
                    <th className="p-4">Title & Slug</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Published Date</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {interviews
                    .filter(i =>
                      i.title.toLowerCase().includes(interviewSearch.toLowerCase()) ||
                      i.executiveName.toLowerCase().includes(interviewSearch.toLowerCase()) ||
                      i.company.toLowerCase().includes(interviewSearch.toLowerCase())
                    )
                    .map((item) => (
                      <tr key={item.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.executivePhoto}
                              alt={item.executiveName}
                              className="w-10 h-10 rounded-lg object-cover border border-white/10"
                            />
                            <div>
                              <div className="font-bold text-white">{item.executiveName}</div>
                              <div className="text-gray-400 text-[11px] font-light">{item.executiveRole}, {item.company}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 max-w-xs">
                          <div className="font-semibold text-gray-200 line-clamp-1">{item.title}</div>
                          <div className="text-gray-500 text-[10px]">/{item.slug}</div>
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 rounded-full bg-white/10 text-gray-300 font-medium border border-white/10">
                            {item.category}
                          </span>
                        </td>
                        <td className="p-4 text-gray-400 font-light">
                          {item.publishedAt}
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${item.isPublished ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-400/30' : 'bg-white/10 text-gray-400 border border-white/10'
                            }`}>
                            {item.isPublished ? 'Live' : 'Draft'}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => {
                                setCurrentView('interview-detail', item.slug);
                                onClose();
                              }}
                              className="p-1.5 text-gray-400 hover:text-blue-400 rounded"
                              title="View on site"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                setEditingInterview(item);
                                setHighlightsInput((item.keyHighlights || []).join('\n'));
                                setTagsInput((item.tags || []).join(', '));
                                setIsInterviewModalOpen(true);
                              }}
                              className="p-1.5 text-gray-400 hover:text-white rounded"
                              title="Edit"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteInterview(item.id)}
                              className="p-1.5 text-gray-400 hover:text-red-400 rounded"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ====================================================
          TAB 3: LEADS & CRM
          ==================================================== */}
      {activeTab === 'leads' && (
        <div className="space-y-6">

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white font-serif">Enterprise Inquiries & CRM</h2>
              <p className="text-xs text-gray-400 font-light">Pipeline of all inbound staffing requests and domain operations scoping inquiries.</p>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={leadStatusFilter}
                onChange={e => setLeadStatusFilter(e.target.value)}
                className="px-3 py-1.5 text-xs bg-[#0B0D11]/90 border border-white/15 rounded-lg focus:outline-none focus:border-blue-400 text-white shadow-inner"
              >
                <option value="All">All Statuses</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Proposal">Proposal</option>
                <option value="Won">Won</option>
                <option value="Closed">Closed</option>
              </select>

              <button
                onClick={exportLeadsCsv}
                className="px-3.5 py-1.5 glass-card hover:bg-white/10 border border-white/15 text-white text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 shadow-xs"
              >
                <Download className="w-3.5 h-3.5 text-blue-400" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

            {/* Leads Table */}
            <div className="lg:col-span-8 glass-card rounded-2xl border border-white/15 overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-white/5 border-b border-white/10 text-gray-400 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="p-4">Contact</th>
                      <th className="p-4">Service & Scale</th>
                      <th className="p-4">Source</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {leads
                      .filter(l => leadStatusFilter === 'All' || l.status === leadStatusFilter)
                      .map((lead) => (
                        <tr
                          key={lead.id}
                          onClick={() => {
                            setSelectedLead(lead);
                            setLeadNoteInput(lead.notes || '');
                          }}
                          className={`cursor-pointer transition-colors ${selectedLead?.id === lead.id ? 'bg-blue-500/15' : 'hover:bg-white/5'
                            }`}
                        >
                          <td className="p-4">
                            <div className="font-bold text-white">{lead.name}</div>
                            <div className="text-gray-400">{lead.company}</div>
                            <div className="text-gray-500 text-[11px]">{lead.email}</div>
                          </td>
                          <td className="p-4">
                            <div className="font-semibold text-gray-200">{lead.service}</div>
                            <div className="text-gray-400 text-[11px] font-light">{lead.headcount}</div>
                          </td>
                          <td className="p-4">
                            <span className="px-2 py-0.5 rounded-full bg-white/10 text-gray-300 text-[10px] font-medium border border-white/10">
                              {lead.source}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className={`px-2.5 py-1 rounded text-[10px] font-bold ${lead.status === 'New' ? 'bg-amber-500/15 text-amber-300 border border-amber-400/30' :
                                lead.status === 'Qualified' ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-400/30' :
                                  lead.status === 'Proposal' ? 'bg-purple-500/15 text-purple-300 border border-purple-400/30' : 'bg-white/10 text-gray-300 border border-white/10'
                              }`}>
                              {lead.status}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedLead(lead);
                                setLeadNoteInput(lead.notes || '');
                              }}
                              className="text-xs font-bold text-blue-400 hover:underline"
                            >
                              Manage
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Selected Lead Inspector / CRM Drawer */}
            <div className="lg:col-span-4 glass-card rounded-2xl border border-white/15 p-6 space-y-5 shadow-2xl">
              {selectedLead ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div>
                      <h3 className="font-bold text-base text-white font-serif">{selectedLead.name}</h3>
                      <p className="text-xs text-gray-400">{selectedLead.company}</p>
                    </div>
                    <span className="text-[11px] text-gray-400 font-mono">
                      {new Date(selectedLead.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-gray-400 block font-semibold uppercase text-[10px]">Email:</span>
                      <a href={`mailto:${selectedLead.email}`} className="text-blue-400 font-medium hover:underline">
                        {selectedLead.email}
                      </a>
                    </div>

                    {selectedLead.phone && (
                      <div>
                        <span className="text-gray-400 block font-semibold uppercase text-[10px]">Phone / Country:</span>
                        <span className="text-gray-300">{selectedLead.phone} ({selectedLead.country || 'N/A'})</span>
                      </div>
                    )}

                    <div>
                      <span className="text-gray-400 block font-semibold uppercase text-[10px]">Service & Scope:</span>
                      <span className="text-white font-semibold">{selectedLead.service} — {selectedLead.headcount}</span>
                    </div>

                    {selectedLead.requirement && (
                      <div className="glass-card p-3 rounded-xl border border-white/10 shadow-inner">
                        <span className="text-gray-400 block font-semibold uppercase text-[10px] mb-1">Requirement Brief:</span>
                        <p className="text-gray-300 text-xs leading-relaxed font-light">{selectedLead.requirement}</p>
                      </div>
                    )}
                  </div>

                  {/* Status update */}
                  <div className="pt-2 border-t border-white/10 space-y-2">
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">
                      Update Pipeline Stage
                    </label>
                    <select
                      value={selectedLead.status}
                      onChange={(e) => {
                        const newStatus = e.target.value as Lead['status'];
                        handleUpdateLeadStatus(selectedLead.id, newStatus, leadNoteInput);
                        setSelectedLead({ ...selectedLead, status: newStatus });
                      }}
                      className="w-full px-3 py-2 bg-[#0B0D11]/90 border border-white/15 rounded-lg text-xs font-semibold text-white shadow-inner"
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Qualified">Qualified</option>
                      <option value="Proposal">Proposal Submitted</option>
                      <option value="Won">Won / Active Client</option>
                      <option value="Closed">Closed / Lost</option>
                    </select>
                  </div>

                  {/* Internal Notes */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">
                      Internal Practice Notes
                    </label>
                    <textarea
                      rows={3}
                      value={leadNoteInput}
                      onChange={e => setLeadNoteInput(e.target.value)}
                      placeholder="Add follow-up notes, assigned practice leader, or meeting dates..."
                      className="w-full px-3 py-2 bg-[#0B0D11]/60 border border-white/15 rounded-lg text-xs text-white placeholder-gray-500 shadow-inner"
                    />
                    <button
                      onClick={() => handleUpdateLeadStatus(selectedLead.id, selectedLead.status, leadNoteInput)}
                      className="w-full py-2 bg-white hover:bg-blue-500 text-[#0B0D11] hover:text-white font-bold rounded-lg text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                    >
                      Save Practice Notes
                    </button>
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center text-gray-500 space-y-2">
                  <Users className="w-8 h-8 mx-auto text-gray-600" />
                  <p className="text-xs font-light">Select an inquiry to view details and update pipeline stage.</p>
                </div>
              )}
            </div>

          </div>

        </div>
      )}

      {/* ====================================================
          TAB 4: WEBSITE COPY CMS
          ==================================================== */}
      {activeTab === 'cms' && (
        <div className="glass-card rounded-2xl border border-white/15 p-8 space-y-8 shadow-2xl">

          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white font-serif">Live Website Content CMS</h2>
              <p className="text-xs text-gray-400 font-light">Edit key messaging, hero badges, and corporate contact information.</p>
            </div>
            <button
              onClick={handleSaveWebsiteContent}
              disabled={isLoading}
              className="px-6 py-2.5 bg-white hover:bg-blue-500 text-[#0B0D11] hover:text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
            >
              <Save className="w-4 h-4" />
              <span>{isLoading ? "Saving..." : "Publish Website Changes"}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Hero Configuration */}
            <div className="space-y-4">
              <h3 className="font-bold text-sm uppercase tracking-wider text-blue-400">Hero Section Copy</h3>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Badge Tagline</label>
                <input
                  type="text"
                  value={content.hero.badge}
                  onChange={e => setContent({
                    ...content,
                    hero: { ...content.hero, badge: e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-[#0B0D11]/60 border border-white/15 rounded-lg text-xs text-white shadow-inner"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Main Heading</label>
                <input
                  type="text"
                  value={content.hero.title}
                  onChange={e => setContent({
                    ...content,
                    hero: { ...content.hero, title: e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-[#0B0D11]/60 border border-white/15 rounded-lg text-xs text-white shadow-inner"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Sub-headline Description</label>
                <textarea
                  rows={3}
                  value={content.hero.subtitle}
                  onChange={e => setContent({
                    ...content,
                    hero: { ...content.hero, subtitle: e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-[#0B0D11]/60 border border-white/15 rounded-lg text-xs text-white shadow-inner"
                />
              </div>
            </div>

            {/* Who We Are & CTA */}
            <div className="space-y-4">
              <h3 className="font-bold text-sm uppercase tracking-wider text-indigo-400">Who We Are & CTA</h3>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Who We Are Heading</label>
                <input
                  type="text"
                  value={content.whoWeAre.heading}
                  onChange={e => setContent({
                    ...content,
                    whoWeAre: { ...content.whoWeAre, heading: e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-[#0B0D11]/60 border border-white/15 rounded-lg text-xs text-white shadow-inner"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Bottom CTA Title</label>
                <input
                  type="text"
                  value={content.cta.title}
                  onChange={e => setContent({
                    ...content,
                    cta: { ...content.cta, title: e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-[#0B0D11]/60 border border-white/15 rounded-lg text-xs text-white shadow-inner"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Contact Email</label>
                <input
                  type="email"
                  value={content.contact.email}
                  onChange={e => setContent({
                    ...content,
                    contact: { ...content.contact, email: e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-[#0B0D11]/60 border border-white/15 rounded-lg text-xs text-white shadow-inner"
                />
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ====================================================
          TAB 5: AI ASSISTANT SIMULATOR
          ==================================================== */}
      {activeTab === 'ai' && (
        <div className="glass-card rounded-2xl border border-white/15 p-8 space-y-6 shadow-2xl">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-bold text-white font-serif">GG Assistant Knowledge Base Simulator</h2>
            </div>
            <p className="text-xs text-gray-400 font-light">
              The AI Assistant automatically injects your live interviews and service data into its context for B2B queries.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                Test Prompt to GG Assistant
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={testPrompt}
                  onChange={e => setTestPrompt(e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-[#0B0D11]/60 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-blue-400 shadow-inner"
                />
                <button
                  onClick={handleTestAi}
                  disabled={isTestingAi}
                  className="px-6 py-2.5 bg-white hover:bg-blue-500 text-[#0B0D11] hover:text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                >
                  {isTestingAi ? 'Querying Gemini...' : 'Run Test'}
                </button>
              </div>
            </div>

            {aiTestResponse && (
              <div className="p-4 glass-card rounded-xl border border-white/10 space-y-2 shadow-inner">
                <span className="text-[10px] font-extrabold uppercase text-blue-400">Model Response Output:</span>
                <p className="text-xs text-gray-200 whitespace-pre-wrap leading-relaxed font-light">{aiTestResponse}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ====================================================
          CREATE / EDIT INTERVIEW MODAL
          ==================================================== */}
      {isInterviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="glass-card bg-[#0E1117]/95 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8 border border-white/20 shadow-2xl space-y-6 animate-in fade-in-50 text-gray-200">

            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-xl font-bold text-white font-serif">
                {editingInterview.id ? 'Edit Executive Interview' : 'Create Globally Unscripted Article'}
              </h3>
              <button
                onClick={() => setIsInterviewModalOpen(false)}
                className="p-1 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveInterview} className="space-y-4 text-xs">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-300 uppercase mb-1">Executive Name *</label>
                  <input
                    type="text"
                    required
                    value={editingInterview.executiveName || ''}
                    onChange={e => setEditingInterview({ ...editingInterview, executiveName: e.target.value })}
                    placeholder="e.g. Jeff Leong"
                    className="w-full px-3 py-2 bg-[#0B0D11]/80 border border-white/15 rounded-lg text-xs text-white shadow-inner"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-300 uppercase mb-1">Executive Role & Title *</label>
                  <input
                    type="text"
                    required
                    value={editingInterview.executiveRole || ''}
                    onChange={e => setEditingInterview({ ...editingInterview, executiveRole: e.target.value })}
                    placeholder="e.g. Chief Financial Officer"
                    className="w-full px-3 py-2 bg-[#0B0D11]/80 border border-white/15 rounded-lg text-xs text-white shadow-inner"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-300 uppercase mb-1">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={editingInterview.company || ''}
                    onChange={e => setEditingInterview({ ...editingInterview, company: e.target.value })}
                    placeholder="e.g. Owl Cyber Defense"
                    className="w-full px-3 py-2 bg-[#0B0D11]/80 border border-white/15 rounded-lg text-xs text-white shadow-inner"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-300 uppercase mb-1">Category</label>
                  <select
                    value={editingInterview.category || 'Finance Leadership'}
                    onChange={e => setEditingInterview({ ...editingInterview, category: e.target.value })}
                    className="w-full px-3 py-2 bg-[#0B0D11]/90 border border-white/15 rounded-lg text-xs text-white shadow-inner"
                  >
                    <option value="Finance Leadership">Finance Leadership</option>
                    <option value="Executive Insights">Executive Insights</option>
                    <option value="Business Transformation">Business Transformation</option>
                    <option value="Future of Work">Future of Work</option>
                    <option value="Technology">Technology</option>
                    <option value="Strategy">Strategy</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-300 uppercase mb-1">Article Headline / Title *</label>
                <input
                  type="text"
                  required
                  value={editingInterview.title || ''}
                  onChange={e => {
                    const title = e.target.value;
                    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                    setEditingInterview({ ...editingInterview, title, slug });
                  }}
                  placeholder="e.g. Inside the CFO Mind: Capital Discipline & Scaling in High-Assurance Cyber"
                  className="w-full px-3 py-2 bg-[#0B0D11]/80 border border-white/15 rounded-lg text-xs text-white shadow-inner"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-300 uppercase mb-1">URL Slug</label>
                  <input
                    type="text"
                    value={editingInterview.slug || ''}
                    onChange={e => setEditingInterview({ ...editingInterview, slug: e.target.value })}
                    className="w-full px-3 py-2 bg-[#0B0D11]/80 border border-white/15 rounded-lg text-xs font-mono text-white shadow-inner"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-300 uppercase mb-1">Executive Photo URL</label>
                  <input
                    type="text"
                    value={editingInterview.executivePhoto || ''}
                    onChange={e => setEditingInterview({ ...editingInterview, executivePhoto: e.target.value })}
                    className="w-full px-3 py-2 bg-[#0B0D11]/80 border border-white/15 rounded-lg text-xs text-white shadow-inner"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-gray-300 uppercase mb-1">YouTube Video ID</label>
                  <input
                    type="text"
                    value={editingInterview.youtubeId || ''}
                    onChange={e => setEditingInterview({ ...editingInterview, youtubeId: e.target.value })}
                    placeholder="e.g. dQw4w9WgXcQ"
                    className="w-full px-3 py-2 bg-[#0B0D11]/80 border border-white/15 rounded-lg text-xs font-mono text-white shadow-inner"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-300 uppercase mb-1">Read Time</label>
                  <input
                    type="text"
                    value={editingInterview.readTime || '8 min read'}
                    onChange={e => setEditingInterview({ ...editingInterview, readTime: e.target.value })}
                    className="w-full px-3 py-2 bg-[#0B0D11]/80 border border-white/15 rounded-lg text-xs text-white shadow-inner"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-300 uppercase mb-1">Video Duration</label>
                  <input
                    type="text"
                    value={editingInterview.videoDuration || '24 mins'}
                    onChange={e => setEditingInterview({ ...editingInterview, videoDuration: e.target.value })}
                    className="w-full px-3 py-2 bg-[#0B0D11]/80 border border-white/15 rounded-lg text-xs text-white shadow-inner"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-300 uppercase mb-1">Short Excerpt / Intro</label>
                <textarea
                  rows={2}
                  value={editingInterview.intro || ''}
                  onChange={e => setEditingInterview({ ...editingInterview, intro: e.target.value })}
                  placeholder="Short introductory overview of the discussion..."
                  className="w-full px-3 py-2 bg-[#0B0D11]/80 border border-white/15 rounded-lg text-xs text-white shadow-inner"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-300 uppercase mb-1">Key Highlights (1 per line)</label>
                <textarea
                  rows={3}
                  value={highlightsInput}
                  onChange={e => setHighlightsInput(e.target.value)}
                  placeholder="Strategic priority on capital discipline\nScaling operations via domain pods"
                  className="w-full px-3 py-2 bg-[#0B0D11]/80 border border-white/15 rounded-lg text-xs font-mono text-white shadow-inner"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-300 uppercase mb-1">Full Article & Q&A Content (Markdown supported)</label>
                <textarea
                  rows={8}
                  value={editingInterview.content || ''}
                  onChange={e => setEditingInterview({ ...editingInterview, content: e.target.value })}
                  placeholder="### Section Heading&#10;&#10;**Globally Unscripted:** Question text&#10;&#10;**Executive:** Response text"
                  className="w-full px-3 py-2 bg-[#0B0D11]/80 border border-white/15 rounded-lg text-xs font-mono text-white shadow-inner"
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingInterview.isPublished ?? true}
                    onChange={e => setEditingInterview({ ...editingInterview, isPublished: e.target.checked })}
                    className="rounded border-white/20 bg-black/40 text-blue-500 focus:ring-blue-500 w-4 h-4"
                  />
                  <span className="font-bold text-gray-300">Publish Live Immediately</span>
                </label>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsInterviewModalOpen(false)}
                    className="px-4 py-2 border border-white/15 rounded-lg font-semibold text-gray-300 hover:bg-white/10 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-2 bg-white hover:bg-blue-500 text-[#0B0D11] hover:text-white font-bold rounded-lg shadow-[0_0_15px_rgba(255,255,255,0.15)] transition-all"
                  >
                    {isLoading ? 'Saving...' : 'Save Interview'}
                  </button>
                </div>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
