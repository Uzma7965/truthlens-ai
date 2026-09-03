import React, { useState } from 'react';
import { Investigation } from '../types';
import { VerdictBadge } from './StatusBadge';
import { X, Search, Trash2, History, ArrowRight, Calendar, Sparkles } from 'lucide-react';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: Investigation[];
  onSelectInvestigation: (investigation: Investigation) => void;
  onClearHistory: () => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  history,
  onSelectInvestigation,
  onClearHistory,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filtered = history.filter((inv) =>
    inv.originalClaim.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.verdict.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        id="history-drawer-panel"
        className="w-full max-w-md bg-[#151712] border-l border-[#262921] h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 text-[#D8DCD5]"
      >
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-[#262921] flex items-center justify-between bg-[#11130E]">
          <div className="flex items-center gap-2">
            <History className="w-3.5 h-3.5 text-[#FE813C]" />
            <h2 className="font-semibold text-sm text-[#FFFFFF]">Investigation Archive</h2>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-[#1C1F17] border border-[#2B2F24] text-[#A6AC9F] font-bold">
              {history.length}
            </span>
          </div>

          <button
            id="close-history-drawer-btn"
            onClick={onClose}
            className="p-1 rounded-md text-[#8A9084] hover:text-[#FFFFFF] hover:bg-[#1E211A] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-3 border-b border-[#262921] bg-[#11130E]">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#8A9084] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search past investigations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#11130E] border border-[#262921] rounded-lg pl-8 pr-3 py-1.5 text-xs text-[#FFFFFF] placeholder:text-[#555A4F] outline-none focus:border-[#FE813C] transition-colors"
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {filtered.length === 0 ? (
            <div className="text-center py-10 px-4">
              <History className="w-6 h-6 text-[#555A4F] mx-auto mb-1.5" />
              <p className="text-xs font-mono text-[#8A9084]">
                {searchTerm ? 'No investigations match your search.' : 'No archived investigations yet.'}
              </p>
            </div>
          ) : (
            filtered.map((inv) => (
              <div
                key={inv.id}
                id={`history-item-${inv.id}`}
                onClick={() => {
                  onSelectInvestigation(inv);
                  onClose();
                }}
                className="group p-3 rounded-lg border border-[#262921] bg-[#11130E] hover:bg-[#1C1F17] hover:border-[#FE813C] shadow-sm transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <VerdictBadge verdict={inv.verdict} size="sm" />
                  <span className="text-[10px] font-mono text-[#FFFFFF] font-semibold">
                    {inv.confidence}% conf.
                  </span>
                </div>

                <h3 className="text-xs font-semibold text-[#FFFFFF] leading-snug line-clamp-2 mb-2 font-sans">
                  “{inv.originalClaim}”
                </h3>

                <div className="flex items-center justify-between text-[10px] font-mono text-[#8A9084] pt-1.5 border-t border-[#262921]">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#8A9084]" />
                    <span>{new Date(inv.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <span className="text-[#A6AC9F] group-hover:text-[#FE813C] inline-flex items-center gap-1 font-semibold transition-colors">
                    Open <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {history.length > 0 && (
          <div className="p-3 border-t border-[#262921] bg-[#11130E] flex items-center justify-between">
            <button
              id="clear-all-history-btn"
              onClick={() => {
                if (confirm('Clear all stored investigation history?')) {
                  onClearHistory();
                }
              }}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#BC656A] hover:text-[#E0A2A6] transition-colors cursor-pointer"
            >
              <Trash2 className="w-3 h-3" />
              <span>Clear history</span>
            </button>

            <span className="text-[10px] font-mono text-[#8A9084]">
              Stored locally
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
