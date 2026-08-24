import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Play, 
  FileText, 
  ArrowRight, 
  Linkedin, 
  Share2, 
  Calendar, 
  Clock, 
  Sparkles,
  ChevronRight,
  Tv,
  BookOpen
} from 'lucide-react';
import { Interview } from '../types';

interface GloballyUnscriptedHubViewProps {
  interviews: Interview[];
  setCurrentView: (view: string, slug?: string) => void;
  openVideoModal: (youtubeId: string, title: string) => void;
  openContactModal: () => void;
}

export const GloballyUnscriptedHubView: React.FC<GloballyUnscriptedHubViewProps> = ({
  interviews,
  setCurrentView,
  openVideoModal,
  openContactModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All',
    'Finance Leadership',
    'Executive Insights',
    'Business Transformation',
    'Future of Work',
    'Technology',
    'Strategy'
  ];

  const filteredInterviews = interviews.filter((interview) => {
    const matchesCat =
      selectedCategory === 'All' ||
      interview.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      searchQuery === '' ||
      interview.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      interview.executiveName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      interview.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      interview.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      interview.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCat && matchesSearch;
  });

  const featured = interviews[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20 relative text-slate-200">
      
      {/* Ambient background glow */}
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-40 left-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      
      {/* Editorial Hero Header */}
      <div className="border-b border-slate-800/80 pb-12 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border border-amber-400/30 text-amber-400 text-[11px] font-bold uppercase tracking-widest">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>GG Global Executive Dispatch</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight">
              Globally Unscripted
            </h1>
            <p className="text-xl sm:text-2xl text-slate-300 font-serif italic font-light">
              "Where Global Leaders Speak Unfiltered."
            </p>
            <p className="text-sm text-slate-400 max-w-2xl leading-relaxed font-light">
              Candid conversations with CFOs, COOs, and enterprise leaders on capital allocation, cross-border operations, organizational transformation, and the future of work.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <button
              onClick={openContactModal}
              className="px-6 py-3 rounded-sm bg-white hover:bg-blue-500 text-slate-950 hover:text-white text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] active:scale-[0.98]"
            >
              <span>Nominate an Executive</span>
            </button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-white text-slate-950 font-bold shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                    : 'glass-pill text-slate-300 hover:text-white border-slate-700/60 hover:border-slate-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search leaders, CFOs, or topics..."
              className="w-full pl-9 pr-4 py-2.5 text-xs bg-[#0C1017]/80 border border-slate-700/60 rounded-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 shadow-inner"
            />
          </div>

        </div>
      </div>

      {/* Featured Editorial Spotlight (if matches filter or is present) */}
      {featured && selectedCategory === 'All' && !searchQuery && (
        <div className="glass-card rounded-2xl border border-amber-400/20 overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.8)] relative group">
          <div className="glass-shine-overlay opacity-30 group-hover:opacity-50 transition-opacity"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 relative z-10">
            
            <div className="lg:col-span-6 relative min-h-[340px] lg:min-h-[460px]">
              <img
                src={featured.executivePhoto}
                alt={featured.executiveName}
                className="w-full h-full object-cover object-top filter grayscale contrast-110 group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute top-4 left-4 glass-pill bg-[#0C1017]/80 text-white border border-slate-700/60 px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider backdrop-blur-md shadow-md">
                Featured Cover Story
              </div>
            </div>

            <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                  <span className="font-bold text-amber-300 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                    {featured.category}
                  </span>
                  <span>•</span>
                  <span>{featured.publishedAt}</span>
                  <span>•</span>
                  <span>{featured.readTime}</span>
                </div>

                <h2 
                  onClick={() => setCurrentView('interview-detail', featured.slug)}
                  className="text-2xl sm:text-4xl font-serif font-bold text-white hover:text-blue-400 transition-colors cursor-pointer leading-tight"
                >
                  "{featured.title}"
                </h2>

                <div>
                  <div className="text-base font-serif font-bold text-white">{featured.executiveName}</div>
                  <div className="text-xs text-slate-400 font-light">{featured.executiveRole}, {featured.company}</div>
                </div>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed line-clamp-3 font-light">
                  {featured.intro || featured.summary}
                </p>

                {featured.keyHighlights && (
                  <div className="glass-card p-4 rounded-xl border border-slate-750 text-xs text-slate-300 space-y-1 shadow-inner">
                    <span className="font-bold text-amber-400 block text-[10px] uppercase tracking-wider">Key Executive Insight:</span>
                    <p className="italic font-serif">"{featured.keyHighlights[0]}"</p>
                  </div>
                )}
              </div>

              <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setCurrentView('interview-detail', featured.slug)}
                  className="px-6 py-3 rounded-sm bg-white hover:bg-blue-500 text-slate-950 hover:text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                >
                  <FileText className="w-4 h-4" />
                  <span>Read Full Interview</span>
                </button>

                {featured.youtubeId && (
                  <button
                    onClick={() => openVideoModal(featured.youtubeId, featured.title)}
                    className="px-6 py-3 rounded-sm glass-pill hover:bg-white/10 border border-white/20 text-white font-semibold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
                  >
                    <Play className="w-4 h-4 text-red-500 fill-red-500" />
                    <span>Watch Episode ({featured.videoDuration})</span>
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Grid of All Interviews */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-serif font-bold text-white">
            {selectedCategory === 'All' ? 'All Leadership Conversations' : `${selectedCategory} Series`}
          </h3>
          <span className="text-xs text-slate-400 font-light">
            {filteredInterviews.length} {filteredInterviews.length === 1 ? 'Interview' : 'Interviews'}
          </span>
        </div>

        {filteredInterviews.length === 0 ? (
          <div className="p-12 text-center text-slate-400 glass-card rounded-2xl border border-slate-700/60">
            No interviews found matching your criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredInterviews.map((interview) => (
              <article
                key={interview.id}
                className="glass-card rounded-xl border border-slate-700/60 overflow-hidden shadow-lg hover:border-blue-400/40 hover:shadow-[0_10px_35px_rgba(59,130,246,0.15)] transition-all flex flex-col justify-between group relative"
              >
                <div className="glass-shine-overlay opacity-20 group-hover:opacity-50 transition-opacity"></div>
                
                <div className="relative z-10">
                  {/* Photo Container */}
                  <div 
                    onClick={() => setCurrentView('interview-detail', interview.slug)}
                    className="relative h-60 bg-[#0C1017] overflow-hidden cursor-pointer"
                  >
                    <img
                      src={interview.executivePhoto}
                      alt={interview.executiveName}
                      className="w-full h-full object-cover object-top filter grayscale contrast-105 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                    />
                    <div className="absolute top-3 left-3 glass-pill bg-[#0C1017]/80 text-white border border-slate-700/60 px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-xs">
                      {interview.category}
                    </div>

                    {interview.youtubeId && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openVideoModal(interview.youtubeId, interview.title);
                        }}
                        className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-[#0C1017]/80 hover:bg-red-600 text-white flex items-center justify-center backdrop-blur-sm shadow-md transition-colors border border-slate-700/60"
                        title="Watch video interview"
                      >
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      </button>
                    )}
                  </div>

                  {/* Body Info */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{interview.publishedAt}</span>
                      <span>•</span>
                      <Clock className="w-3.5 h-3.5" />
                      <span>{interview.readTime}</span>
                    </div>

                    <h4 
                      onClick={() => setCurrentView('interview-detail', interview.slug)}
                      className="text-lg font-serif font-bold text-white group-hover:text-blue-400 transition-colors cursor-pointer leading-snug"
                    >
                      "{interview.title}"
                    </h4>

                    <div className="pt-1">
                      <div className="text-xs font-serif font-bold text-white">{interview.executiveName}</div>
                      <div className="text-[11px] text-slate-400 font-light">{interview.executiveRole}, {interview.company}</div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 font-light">
                      {interview.summary}
                    </p>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="px-6 py-4 bg-slate-900/30 border-t border-slate-800/80 flex items-center justify-between relative z-10">
                  <div className="flex flex-wrap gap-1">
                    {interview.tags.slice(0, 2).map((tag, tIdx) => (
                      <span key={tIdx} className="text-[10px] bg-slate-800/50 border border-slate-700/60 text-slate-300 px-2 py-0.5 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentView('interview-detail', interview.slug)}
                    className="text-xs font-bold uppercase tracking-wider text-white hover:text-blue-400 flex items-center gap-1 transition-colors"
                  >
                    <span>Read</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </article>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
