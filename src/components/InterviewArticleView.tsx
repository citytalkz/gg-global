import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Linkedin, 
  Twitter, 
  Share2, 
  Copy, 
  Check, 
  Play, 
  Calendar, 
  Clock, 
  BookOpen, 
  Sparkles, 
  ExternalLink,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { Interview } from '../types';

interface InterviewArticleViewProps {
  interview: Interview;
  allInterviews: Interview[];
  setCurrentView: (view: string, slug?: string) => void;
  openContactModal: () => void;
}

export const InterviewArticleView: React.FC<InterviewArticleViewProps> = ({
  interview,
  allInterviews,
  setCurrentView,
  openContactModal,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const related = allInterviews
    .filter((i) => i.id !== interview.id && i.isPublished)
    .slice(0, 2);

  // Render markdown-like content cleanly
  const renderFormattedContent = (raw: string) => {
    const blocks = raw.split('\n\n');
    return blocks.map((block, idx) => {
      // H3 Headers
      if (block.startsWith('### ')) {
        return (
          <h3 key={idx} className="text-xl sm:text-2xl font-bold text-white mt-8 mb-4 font-editorial">
            {block.replace('### ', '')}
          </h3>
        );
      }
      // Horizontal Rule
      if (block.trim() === '---') {
        return <hr key={idx} className="my-8 border-slate-800/80" />;
      }
      // Standard Paragraph with bold and italic handling
      const lines = block.split('\n');
      return (
        <div key={idx} className="text-slate-300 text-base sm:text-lg leading-relaxed space-y-2 my-4 font-light">
          {lines.map((line, lIdx) => {
            // Check for Q&A bold prefix
            if (line.startsWith('**Globally Unscripted:**') || line.startsWith('**Jeff Leong:**') || line.startsWith('**Sarah Jenkins:**') || line.startsWith('**Marcus Vance:**') || line.includes(':**')) {
              const colonIdx = line.indexOf(':**');
              if (colonIdx !== -1) {
                const speaker = line.substring(0, colonIdx + 3).replace(/\*\*/g, '');
                const dialogue = line.substring(colonIdx + 3);
                return (
                  <p key={lIdx} className="leading-relaxed">
                    <span className="font-bold text-white font-sans-corporate">{speaker}</span>
                    <span className="text-slate-300">{dialogue}</span>
                  </p>
                );
              }
            }

            // Bullet points
            if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ') || line.startsWith('• ') || line.startsWith('- ')) {
              return (
                <div key={lIdx} className="pl-4 py-1 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 mt-2.5"></span>
                  <span className="text-slate-300">{line.replace(/^[0-9]\.\s|^[•-]\s/, '')}</span>
                </div>
              );
            }

            return <p key={lIdx} className="leading-relaxed">{line}</p>;
          })}
        </div>
      );
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 text-slate-200">
      
      {/* Back Navigation Bar */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
        <button
          onClick={() => setCurrentView('globally-unscripted')}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Globally Unscripted</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-light hidden sm:inline">Share this interview:</span>
          
          <button
            onClick={handleCopyLink}
            className="p-2 rounded-lg glass-card hover:bg-white/10 text-slate-300 hover:text-white transition-colors relative border border-slate-700/60"
            title="Copy URL"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>

          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-lg glass-card hover:bg-white/10 text-slate-300 hover:text-blue-400 transition-colors border border-slate-700/60"
            title="Share on LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(interview.title)}&url=${encodeURIComponent(window.location.href)}`}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-lg glass-card hover:bg-white/10 text-slate-300 hover:text-blue-400 transition-colors border border-slate-700/60"
            title="Share on Twitter"
          >
            <Twitter className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Article Header */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 text-xs font-semibold text-slate-400">
          <span className="px-3 py-1 rounded-full glass-pill border border-amber-400/30 text-amber-300 font-bold uppercase tracking-wider text-[10px]">
            {interview.category}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{interview.publishedAt}</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{interview.readTime}</span>
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.15]">
          {interview.title}
        </h1>

        {/* Executive Profile Bar */}
        <div className="glass-card rounded-2xl p-4 sm:p-6 border border-slate-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl relative overflow-hidden">
          <div className="glass-shine-overlay opacity-30"></div>
          <div className="flex items-center gap-4 relative z-10">
            <img
              src={interview.executivePhoto}
              alt={interview.executiveName}
              className="w-16 h-16 rounded-full object-cover border-2 border-white/20 shadow-md"
            />
            <div>
              <h3 className="text-base sm:text-lg font-serif font-bold text-white">{interview.executiveName}</h3>
              <p className="text-xs sm:text-sm text-slate-400 font-light">{interview.executiveRole}</p>
              <p className="text-xs text-blue-400 font-medium">{interview.company}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 relative z-10">
            {interview.linkedinUrl && (
              <a
                href={interview.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 glass-pill hover:bg-blue-600 text-white text-xs font-semibold rounded-sm border border-slate-700/60 transition-all shadow-xs"
              >
                <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                <span>Executive Profile</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Embedded YouTube Video Feature */}
      {interview.youtubeId && (
        <div className="space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Play className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>Full Video Conversation ({interview.videoDuration})</span>
          </div>
          <div className="relative w-full aspect-video bg-[#0C1017] rounded-2xl overflow-hidden shadow-2xl border border-slate-700/60">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${interview.youtubeId}?rel=0`}
              title={interview.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>
        </div>
      )}

      {/* Introduction */}
      <div className="p-6 sm:p-8 glass-card rounded-2xl border-l-4 border-blue-500 text-slate-200 text-base sm:text-lg leading-relaxed font-serif italic shadow-inner">
        {interview.intro || interview.summary}
      </div>

      {/* Key Highlights Box */}
      {interview.keyHighlights && interview.keyHighlights.length > 0 && (
        <div className="glass-card rounded-2xl p-6 sm:p-8 border border-amber-400/20 space-y-4 shadow-inner">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
            Key Executive Highlights:
          </span>
          <ul className="space-y-2.5 text-sm text-slate-300">
            {interview.keyHighlights.map((highlight, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0 mt-2"></span>
                <span className="leading-relaxed font-light">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Full Interview Editorial Content */}
      <div className="border-t border-b border-slate-800/80 py-8 prose prose-invert max-w-none">
        {renderFormattedContent(interview.content)}
      </div>

      {/* Article Tags */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-slate-400 uppercase mr-1">Topics:</span>
        {interview.tags.map((tag, idx) => (
          <span key={idx} className="px-3 py-1 bg-slate-850 text-slate-300 text-xs font-medium rounded-full border border-slate-700/60">
            #{tag}
          </span>
        ))}
      </div>

      {/* Bottom Conversion Callout */}
      <div className="glass-card border border-slate-700/60 text-white rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden group">
        <div className="glass-shine-overlay opacity-20 group-hover:opacity-40 transition-opacity"></div>
        <div className="space-y-2 max-w-xl relative z-10">
          <span className="text-[11px] font-bold text-blue-400 uppercase tracking-widest">
            GG Global Enterprise Solutions
          </span>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
            Need specialized finance & domain operations like {interview.company}?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 font-light">
            Speak directly with our domain architects to design an SLA-backed P2P, Accounts Payable, or dedicated staffing pod.
          </p>
        </div>
        <button
          onClick={openContactModal}
          className="px-6 py-3.5 bg-white hover:bg-blue-500 text-slate-950 hover:text-white font-bold text-xs uppercase tracking-widest rounded-sm transition-all shrink-0 flex items-center gap-2 active:scale-95 relative z-10 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
        >
          <span>Talk to GG Global</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Related Interviews */}
      {related.length > 0 && (
        <div className="space-y-6 pt-6">
          <h3 className="text-2xl font-serif font-bold text-white">
            More from Globally Unscripted
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {related.map((rel) => (
              <div
                key={rel.id}
                onClick={() => {
                  setCurrentView('interview-detail', rel.slug);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="p-5 rounded-2xl glass-card border border-slate-700/60 hover:border-blue-400/40 hover:shadow-[0_10px_30px_rgba(59,130,246,0.15)] transition-all cursor-pointer flex gap-4 items-center group relative overflow-hidden"
              >
                <div className="glass-shine-overlay opacity-30 group-hover:opacity-60 transition-opacity"></div>
                <img
                  src={rel.executivePhoto}
                  alt={rel.executiveName}
                  className="w-16 h-16 rounded-xl object-cover shrink-0 relative z-10 shadow-xs"
                />
                <div className="space-y-1 relative z-10">
                  <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">{rel.category}</div>
                  <h4 className="text-sm font-serif font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
                    "{rel.title}"
                  </h4>
                  <p className="text-xs text-slate-400 font-light">{rel.executiveName}, {rel.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
