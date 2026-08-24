import React from 'react';
import { X, Play } from 'lucide-react';

interface VideoPlayerModalProps {
  isOpen: boolean;
  youtubeId: string | null;
  title: string;
  onClose: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  isOpen,
  youtubeId,
  title,
  onClose,
}) => {
  if (!isOpen || !youtubeId) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="max-w-4xl w-full glass-card bg-[#0E1117]/95 rounded-3xl overflow-hidden shadow-2xl border border-white/15 space-y-3 p-4 sm:p-6 animate-in fade-in-50 relative">
        <div className="glass-shine-overlay opacity-30"></div>
        <div className="flex items-center justify-between text-white pb-2 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-2">
            <Play className="w-4 h-4 text-blue-400 fill-blue-400" />
            <h3 className="font-serif font-bold text-sm text-gray-100 line-clamp-1">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-white/10 relative z-10">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-gray-400 pt-1 font-light relative z-10">
          <span>Globally Unscripted Executive Broadcast</span>
          <span className="text-gray-500 uppercase tracking-widest text-[9px] font-semibold">GG Global Media</span>
        </div>

      </div>
    </div>
  );
};
