import React from 'react';
import { Search, History, HelpCircle, PlusCircle, Sparkles, Scale } from 'lucide-react';

interface HeaderProps {
  onOpenHowItWorks: () => void;
  onOpenHistory: () => void;
  onNewInvestigation: () => void;
  historyCount: number;
  currentView: 'home' | 'investigating' | 'result' | 'history';
}

export const Header: React.FC<HeaderProps> = ({
  onOpenHowItWorks,
  onOpenHistory,
  onNewInvestigation,
  historyCount,
  currentView,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#262921] bg-[#0E0F0B]/90 backdrop-blur-md transition-all">
      <div className="max-w-6xl mx-auto px-3 sm:px-5 h-13 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          id="brand-logo"
          onClick={onNewInvestigation}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-7 h-7 rounded-md bg-[#181A14] text-[#FE813C] flex items-center justify-center shadow-xs transition-transform group-hover:scale-105 border border-[#363B2F] group-hover:border-[#FE813C]/50">
            <Scale className="w-3.5 h-3.5 text-[#FE813C]" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-base tracking-tight text-[#FFFFFF] font-sans">
              Truth<span className="text-[#FE813C]">Lens</span>
            </span>
            <span className="hidden sm:inline-block px-1.5 py-0.2 text-[10px] font-mono tracking-wider font-semibold text-[#8A9084] bg-[#161813] rounded border border-[#262921]">
              INVESTIGATION ENGINE
            </span>
          </div>
        </div>

        {/* Minimal High-Density Navigation */}
        <nav className="flex items-center gap-1.5 sm:gap-2">
          {currentView === 'result' && (
            <button
              id="header-new-investigation-btn"
              onClick={onNewInvestigation}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-semibold text-[#0E0F0B] bg-[#FE813C] hover:bg-[#FF9356] rounded-md transition-colors shadow-xs cursor-pointer active:scale-98"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">New Query</span>
              <span className="sm:hidden">New</span>
            </button>
          )}

          <button
            id="header-how-it-works-btn"
            onClick={onOpenHowItWorks}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-[#A6AC9F] hover:text-[#FFFFFF] hover:bg-[#181A14] rounded-md transition-colors cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#FE813C]" />
            <span>Methodology</span>
          </button>

          <button
            id="header-history-btn"
            onClick={onOpenHistory}
            className="relative flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-[#A6AC9F] hover:text-[#FFFFFF] hover:bg-[#181A14] rounded-md transition-colors cursor-pointer"
          >
            <History className="w-3.5 h-3.5 text-[#FE813C]" />
            <span>Archive</span>
            {historyCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 text-[10px] font-mono font-semibold bg-[#1F221B] text-[#FE813C] rounded-full border border-[#363B2F]">
                {historyCount}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};
