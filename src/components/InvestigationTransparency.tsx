import React, { useState } from 'react';
import { InvestigationStats } from '../types';
import { ShieldCheck, Search, FileText, CheckCircle2, ChevronDown, ChevronUp, Database, ArrowRight } from 'lucide-react';

interface InvestigationTransparencyProps {
  stats: InvestigationStats;
  originalClaim: string;
}

export const InvestigationTransparency: React.FC<InvestigationTransparencyProps> = ({
  stats,
  originalClaim,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showQueries, setShowQueries] = useState(false);

  return (
    <div
      id="investigation-transparency-section"
      className="w-full bg-[#151712] border border-[#262921] rounded-xl overflow-hidden shadow-md mb-6 transition-all"
    >
      <button
        id="toggle-transparency-btn"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-[#1B1D17] transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-[#1C1F17] text-[#FE813C] flex items-center justify-center font-mono text-xs border border-[#2B2F24]">
            <Database className="w-3.5 h-3.5 text-[#FE813C]" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-semibold tracking-wider text-[#8A9084] uppercase block">
              Audit & Methodology
            </span>
            <h3 className="text-sm sm:text-base font-semibold text-[#FFFFFF]">
              How TruthLens Investigated This Claim
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[#8A9084]">
          <span className="text-xs font-mono hidden sm:inline text-[#8A9084]">
            {isOpen ? 'Collapse details' : 'Expand transparency log'}
          </span>
          {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </div>
      </button>

      {isOpen && (
        <div className="px-5 pb-5 pt-2 border-t border-[#262921] space-y-4 bg-[#11130E]">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-3 rounded-lg bg-[#151712] border border-[#262921]">
              <span className="text-[10px] font-mono text-[#8A9084] uppercase block mb-0.5">
                Live Index Engine
              </span>
              <span className="text-xs sm:text-sm font-mono font-bold text-[#FE813C] line-clamp-1">
                {stats.searchEngines || 'Google Search via SerpApi'}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[#151712] border border-[#262921]">
              <span className="text-[10px] font-mono text-[#8A9084] uppercase block mb-0.5">
                Testable Subclaims
              </span>
              <span className="text-lg sm:text-xl font-mono font-bold text-[#FFFFFF]">
                {stats.testableStatements}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[#151712] border border-[#262921]">
              <span className="text-[10px] font-mono text-[#8A9084] uppercase block mb-0.5">
                Search Queries Run
              </span>
              <span className="text-lg sm:text-xl font-mono font-bold text-[#FFFFFF]">
                {stats.searchQueriesCount}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[#151712] border border-[#262921]">
              <span className="text-[10px] font-mono text-[#8A9084] uppercase block mb-0.5">
                Raw Search Hits
              </span>
              <span className="text-lg sm:text-xl font-mono font-bold text-[#FFFFFF]">
                {stats.resultsReviewed}
              </span>
            </div>
          </div>

          {/* Secondary Counts Table */}
          <div className="p-3.5 rounded-lg bg-[#151712] border border-[#262921] space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#D8DCD5] pb-2 border-b border-[#262921]">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#FFFFFF] font-mono text-[11px]">Unique Retrieved Sources:</span>
                <span className="font-mono text-xs text-[#A6AC9F]">({stats.uniqueSourcesCount || stats.relevantSourcesCount} deduplicated)</span>
              </div>
              <span className="font-mono font-bold text-[#FE813C]">{stats.relevantSourcesCount} analyzed</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
              <div className="p-2 rounded bg-[#182218] text-[#B9CBB5] border border-[#727E6E]/60">
                Supporting: <strong>{stats.supportingCount}</strong>
              </div>
              <div className="p-2 rounded bg-[#241315] text-[#E0A2A6] border border-[#BC656A]/60">
                Contradicting: <strong>{stats.contradictingCount}</strong>
              </div>
              <div className="p-2 rounded bg-[#1B1D17] text-[#D8DCD5] border border-[#2B2F24]">
                Contextual: <strong>{stats.contextualCount}</strong>
              </div>
              <div className="p-2 rounded bg-[#151712] text-[#A6AC9F] border border-[#262921]">
                Unclear: <strong>{stats.unclearCount}</strong>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1.5 text-xs">
              <span className="text-[#8A9084] font-mono text-[11px]">Counter-Evidence Search Protocol:</span>
              <span className="inline-flex items-center gap-1 font-mono font-semibold text-[#B9CBB5] text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#727E6E]" />
                Completed
              </span>
            </div>
          </div>

          {/* Expandable Search Queries Log */}
          {stats.searchQueries && stats.searchQueries.length > 0 && (
            <div>
              <button
                onClick={() => setShowQueries(!showQueries)}
                className="text-xs font-mono font-semibold text-[#A6AC9F] hover:text-[#FFFFFF] inline-flex items-center gap-1 cursor-pointer"
              >
                <span>{showQueries ? 'Hide' : 'View'} executed search queries</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showQueries ? 'rotate-180' : ''}`} />
              </button>

              {showQueries && (
                <div className="mt-2.5 p-3 rounded-lg bg-[#151712] border border-[#262921] space-y-1">
                  <span className="text-[10px] font-mono text-[#8A9084] uppercase block mb-1">
                    Search Queries Dispatched to Index:
                  </span>
                  {stats.searchQueries.map((q, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-mono text-[#D8DCD5]">
                      <Search className="w-3 h-3 text-[#FE813C] shrink-0" />
                      <span>“{q}”</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
