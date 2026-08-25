import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  X,
  Send,
  Minimize2,
  Maximize2,
  Bot,
  User,
  ArrowRight,
  Building2,
  Mail,
  CheckCircle2,
  FileText,
  RefreshCw,
  Phone,
  Globe,
  Briefcase
} from 'lucide-react';
import { ChatMessage, Lead } from '../types';
import { apiUrl } from '../config';

interface ChatbotWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  setCurrentView: (view: string, slug?: string) => void;
  latestInterviewSlug?: string;
}

export const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({
  isOpen,
  onClose,
  onOpen,
  setCurrentView,
  latestInterviewSlug,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: "Welcome to GG Global. I am **GG Assistant**, your direct advisor for Global Talent & Managed Domain Operations.\n\nHow can we help scale your enterprise capacity or finance operations today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actionPills: [
        "How can GG Global help my finance team?",
        "Tell me about P2P outsourcing.",
        "I need contract finance professionals.",
        "How does dedicated staffing work?",
        "Show me the latest Globally Unscripted interview."
      ]
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [leadForm, setLeadForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    country: '',
    service: 'Domain Operations (P2P/Finance)',
    headcount: '4-10 team',
    requirement: '',
  });
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch(apiUrl('/api/chat'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory.map(m => ({ sender: m.sender, text: m.text })),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionPills: data.actionPills,
        leadCaptured: data.leadCaptured,
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Chatbot error:', err);
      setMessages(prev => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'assistant',
          text: "GG Global provides contract staffing, dedicated teams, and managed domain operations (P2P, AP, Finance Ops). You can also submit an enquiry directly to our practice leads.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actionPills: ["Submit an Enquiry", "Explore Domain Operations", "View Globally Unscripted"]
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePillClick = (pill: string) => {
    if (pill === "Show me the latest Globally Unscripted interview." || pill.includes("Jeff Leong") || pill === "Read Jeff Leong's Interview") {
      if (latestInterviewSlug) {
        setCurrentView('interview-detail', latestInterviewSlug);
      } else {
        setCurrentView('globally-unscripted');
      }
      return;
    }

    if (pill === "Submit an Enquiry" || pill === "Talk to a director" || pill === "Book a P2P Consultation" || pill === "Schedule a consultation") {
      setShowLeadModal(true);
      return;
    }

    if (pill === "Explore Domain Operations") {
      setCurrentView('solutions-domain');
      return;
    }

    handleSendMessage(pill);
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.email) return;

    try {
      const res = await fetch(apiUrl('/api/leads'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...leadForm,
          source: 'AI Chatbot',
          requirement: leadForm.requirement || 'Enquiry initiated via GG Global AI Assistant',
        }),
      });

      if (res.ok) {
        setLeadSubmitted(true);
        setTimeout(() => {
          setShowLeadModal(false);
          setLeadSubmitted(false);
          setMessages(prev => [
            ...prev,
            {
              id: `lead-ack-${Date.now()}`,
              sender: 'assistant',
              text: `Thank you, **${leadForm.name}**. Your requirement for **${leadForm.company}** has been securely routed to our senior operating team. An enterprise director will reach out to **${leadForm.email}** within 24 business hours.`,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              actionPills: ["Explore Globally Unscripted", "Review Domain SLAs"]
            }
          ]);
          setLeadForm({
            name: '',
            company: '',
            email: '',
            phone: '',
            country: '',
            service: 'Domain Operations (P2P/Finance)',
            headcount: '4-10 team',
            requirement: '',
          });
        }, 1200);
      }
    } catch (err) {
      console.error('Lead submit error:', err);
    }
  };

  const formatText = (text: string) => {
    // Simple markdown-style bolding and bullets
    const lines = text.split('\n');
    return lines.map((line, i) => {
      let formatted = line;
      // Bold **text**
      const parts = formatted.split(/(\*\*.*?\*\*)/g);
      return (
        <div key={i} className={line.startsWith('•') || line.startsWith('-') ? 'pl-2 my-0.5' : 'my-1'}>
          {parts.map((p, j) => {
            if (p.startsWith('**') && p.endsWith('**')) {
              return <strong key={j} className="font-semibold text-white">{p.slice(2, -2)}</strong>;
            }
            return p;
          })}
        </div>
      );
    });
  };

  return (
    <>
      {/* Floating Trigger Button (when closed) */}
      {!isOpen && (
        <div className="fixed bottom-8 right-8 z-50">
          <div
            id="chatbot-floating-trigger"
            onClick={onOpen}
            className="glass-card shadow-[0_10px_35px_rgba(0,0,0,0.7)] rounded-full p-2.5 sm:p-3 flex items-center space-x-3 border border-slate-700/60 cursor-pointer hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.3)] transition-all hover:scale-105 active:scale-95 group"
          >
            <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse ml-2 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
            <span className="text-[12px] font-bold tracking-widest uppercase text-white group-hover:text-blue-300 transition-colors">GG Assistant</span>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white shrink-0 shadow-inner">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div
          id="chatbot-panel"
          className="fixed bottom-8 right-8 z-50 w-[92vw] sm:w-[420px] h-[580px] max-h-[85vh] bg-[#0C1017]/95 backdrop-blur-xl rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] border border-slate-700/60 flex flex-col overflow-hidden animate-in fade-in-50 slide-in-from-bottom-6 duration-200 text-slate-200"
        >

          {/* Header */}
          <div className="bg-[#090C12] text-white p-4 flex items-center justify-between border-b border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-800/60 border border-slate-700/60 rounded-md flex items-center justify-center text-blue-400 font-bold">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xs font-sans tracking-widest uppercase text-white">GG Assistant</span>
                  <span className="px-1.5 py-0.2 rounded-xs text-[8px] font-extrabold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Live
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-light">Global Talent & Domain Operations</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  setMessages([
                    {
                      id: 'reset',
                      sender: 'assistant',
                      text: "Conversation refreshed. How can GG Global assist your organization today?",
                      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                      actionPills: [
                        "How can GG Global help my finance team?",
                        "Tell me about P2P outsourcing.",
                        "I need contract finance professionals."
                      ]
                    }
                  ]);
                }}
                className="p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-800/50 transition-colors"
                title="Reset conversation"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                id="chatbot-close-btn"
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-800/50 transition-colors"
                title="Close assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Lead Capture Banner */}
          <div className="bg-blue-950/40 px-4 py-2 border-b border-blue-500/20 flex items-center justify-between text-xs text-blue-300">
            <span className="font-light text-[11px]">Need custom staffing or P2P quote?</span>
            <button
              onClick={() => setShowLeadModal(true)}
              className="font-bold text-blue-400 hover:text-blue-300 hover:underline flex items-center gap-1 text-[11px]"
            >
              <span>Instant Enquiry</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Message Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#090C12]/90">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'assistant' && (
                  <div className="w-7 h-7 rounded-md bg-slate-800/60 border border-slate-700/60 text-blue-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold shadow-xs">
                    GG
                  </div>
                )}
                <div
                  className={`max-w-[84%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${m.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-none shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                      : 'bg-slate-900/60 border border-slate-800/80 text-slate-200 rounded-tl-none backdrop-blur-sm'
                    }`}
                >
                  <div className="font-light">{formatText(m.text)}</div>

                  {m.leadCaptured && (
                    <div className="mt-2.5 p-2 bg-emerald-950/40 border border-emerald-500/30 rounded-lg text-emerald-300 flex items-center gap-2 text-[11px] font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Enquiry automatically routed to GG Global Practice Leaders.</span>
                    </div>
                  )}

                  {/* Action Pills */}
                  {m.actionPills && m.actionPills.length > 0 && (
                    <div className="mt-3 pt-2 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                      {m.actionPills.map((pill, idx) => (
                        <button
                          key={idx}
                          onClick={() => handlePillClick(pill)}
                          className="text-[11px] font-medium text-slate-300 hover:text-white bg-slate-800/50 hover:bg-blue-500/20 px-2.5 py-1 rounded-md border border-slate-700/60 hover:border-blue-400/40 transition-all text-left"
                        >
                          {pill}
                        </button>
                      ))}
                    </div>
                  )}

                  <div className={`text-[10px] mt-1.5 ${m.sender === 'user' ? 'text-blue-200' : 'text-slate-500'} text-right`}>
                    {m.timestamp}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-7 h-7 rounded-md bg-slate-800/60 border border-slate-700/60 text-blue-400 flex items-center justify-center shrink-0 text-xs font-bold">
                  GG
                </div>
                <div className="bg-slate-900/60 border border-slate-800/80 px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Lead Modal Overlay Inside Chatbot */}
          {showLeadModal && (
            <div className="absolute inset-0 bg-[#0C1017]/98 backdrop-blur-md z-30 p-4 flex flex-col justify-between overflow-y-auto animate-in fade-in-50 duration-150 text-slate-200">
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-blue-400" />
                    <span className="font-bold text-sm text-white">Request Enterprise Consultation</span>
                  </div>
                  <button
                    onClick={() => setShowLeadModal(false)}
                    className="p-1 text-slate-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {leadSubmitted ? (
                  <div className="py-12 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-white text-base">Enquiry Logged</h4>
                    <p className="text-xs text-slate-400 max-w-xs mx-auto font-light">
                      Our domain practice leader will review your requirements and respond within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleLeadSubmit} className="space-y-2.5 text-xs">
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={leadForm.name}
                        onChange={e => setLeadForm({ ...leadForm, name: e.target.value })}
                        placeholder="e.g. Rachel Vance"
                        className="w-full px-3 py-2 bg-[#090C12] border border-slate-700/60 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">Company *</label>
                        <input
                          type="text"
                          required
                          value={leadForm.company}
                          onChange={e => setLeadForm({ ...leadForm, company: e.target.value })}
                          placeholder="Company Name"
                          className="w-full px-3 py-2 bg-[#090C12] border border-slate-700/60 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">Work Email *</label>
                        <input
                          type="email"
                          required
                          value={leadForm.email}
                          onChange={e => setLeadForm({ ...leadForm, email: e.target.value })}
                          placeholder="rachel@company.com"
                          className="w-full px-3 py-2 bg-[#090C12] border border-slate-700/60 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">Service Required</label>
                        <select
                          value={leadForm.service}
                          onChange={e => setLeadForm({ ...leadForm, service: e.target.value })}
                          className="w-full px-2.5 py-2 bg-[#0C1017] border border-slate-700/60 rounded-lg text-slate-200 focus:outline-none focus:border-blue-500"
                        >
                          <option value="Domain Operations (P2P/Finance)">Domain Operations (P2P/Finance)</option>
                          <option value="Contract Staffing">Contract Staffing</option>
                          <option value="Dedicated Teams">Dedicated Teams</option>
                          <option value="Procurement Operations">Procurement Operations</option>
                          <option value="Global Talent Deployment">Global Talent Deployment</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">Scale / Headcount</label>
                        <select
                          value={leadForm.headcount}
                          onChange={e => setLeadForm({ ...leadForm, headcount: e.target.value })}
                          className="w-full px-2.5 py-2 bg-[#0C1017] border border-slate-700/60 rounded-lg text-slate-200 focus:outline-none focus:border-blue-500"
                        >
                          <option value="1-3 specialists">1-3 specialists</option>
                          <option value="4-10 team">4-10 team</option>
                          <option value="10-25 department">10-25 department</option>
                          <option value="25+ full function">25+ full function</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">Requirement Brief</label>
                      <textarea
                        rows={2}
                        value={leadForm.requirement}
                        onChange={e => setLeadForm({ ...leadForm, requirement: e.target.value })}
                        placeholder="Brief overview of workflow, target timeline, or ERP tools..."
                        className="w-full px-3 py-2 bg-[#090C12] border border-slate-700/60 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-white hover:bg-blue-500 text-slate-950 hover:text-white font-bold rounded-lg shadow-sm transition-all text-xs"
                    >
                      Submit Requirement to GG Global
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}

          {/* Input Box */}
          <div className="p-3 bg-[#090C12] border-t border-slate-800/80">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                id="chatbot-text-input"
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask about staffing, P2P SLAs, or interviews..."
                className="flex-1 px-3 py-2.5 text-xs bg-[#0C1017] border border-slate-700/60 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
              <button
                id="chatbot-send-btn"
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className="w-9 h-9 rounded-xl bg-white hover:bg-blue-500 disabled:opacity-30 text-slate-950 hover:text-white flex items-center justify-center transition-all shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      )}
    </>
  );
};
