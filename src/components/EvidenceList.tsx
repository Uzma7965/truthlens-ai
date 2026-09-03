import React, { useState } from 'react';
import { EvidenceSource } from '../types';
import { EvidenceCard } from './EvidenceCard';
import { Filter, Layers } from 'lucide-react';

interface EvidenceListProps {
  sources: EvidenceSource[];
  highlightedSourceId?: string | null;
  activeFilter?: 'all' | 'supports' | 'contradicts' | 'contextual' | 'unclear';
  onFilterChange?: (filter: 'all' | 'supports' | 'contradicts' | 'contextual' | 'unclear') => void;
}

export const EvidenceList: React.FC<EvidenceListProps> = ({
  sources,
  highlightedSourceId,
  activeFilter = 'all',
  onFilterChange,
}) => {
  const [internalFilter, setInternalFilter] = useState<'all' | 'supports' | 'contradicts' | 'contextual' | 'unclear'>('all');

  const filter = onFilterChange ? activeFilter : internalFilter;
  const setFilter = onFilterChange ? onFilterChange : setInternalFilter;

  const counts = {
    all: sources.length,
    supports: sources.filter((s) => s.status === 'supports').length,
    contradicts: sources.filter((s) => s.status === 'contradicts').length,
    contextual: sources.filter((s) => s.status === 'contextual').length,
    unclear: sources.filter((s) => s.status === 'unclear').length,
  };

  const filteredSources = sources.filter((s) => {
    if (filter === 'all') return true;
    return s.status === filter;
  });

  return (
    <div id="evidence-list-container" className="space-y-4">
      {/* High-Density Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 bg-[#151712] p-1.5 rounded-lg border border-[#262921] shadow-sm">
        <div className="flex flex-wrap items-center gap-1 text-xs font-mono">
          <button
            id="filter-all-btn"
            onClick={() => setFilter('all')}
            className={`px-2.5 py-1 rounded transition-colors font-semibold flex items-center gap-1 text-xs cursor-pointer ${
              filter === 'all'
                ? 'bg-[#FE813C] text-[#0E0F0B] shadow-xs'
                : 'text-[#A6AC9F] hover:text-[#FFFFFF] hover:bg-[#1E211A]'
            }`}
          >
            <span>All Sources</span>
            <span className="opacity-80 font-normal">({counts.all})</span>
          </button>

          <button
            id="filter-supports-btn"
            onClick={() => setFilter('supports')}
            className={`px-2.5 py-1 rounded transition-colors font-semibold flex items-center gap-1 text-xs cursor-pointer ${
              filter === 'supports'
                ? 'bg-[#182218] text-[#B9CBB5] border border-[#727E6E]/70 shadow-xs'
                : 'text-[#A6AC9F] hover:text-[#FFFFFF] hover:bg-[#1E211A]'
            }`}
          >
            <span>Supporting</span>
            <span className="opacity-80 font-normal">({counts.supports})</span>
          </button>

          <button
            id="filter-contradicts-btn"
            onClick={() => setFilter('contradicts')}
            className={`px-2.5 py-1 rounded transition-colors font-semibold flex items-center gap-1 text-xs cursor-pointer ${
              filter === 'contradicts'
                ? 'bg-[#261316] text-[#E0A2A6] border border-[#BC656A]/70 shadow-xs'
                : 'text-[#A6AC9F] hover:text-[#FFFFFF] hover:bg-[#1E211A]'
            }`}
          >
            <span>Contradicting</span>
            <span className="opacity-80 font-normal">({counts.contradicts})</span>
          </button>

          <button
            id="filter-contextual-btn"
            onClick={() => setFilter('contextual')}
            className={`px-2.5 py-1 rounded transition-colors font-semibold flex items-center gap-1 text-xs cursor-pointer ${
              filter === 'contextual'
                ? 'bg-[#1A201C] text-[#B5C2B4] border border-[#556052]/70 shadow-xs'
                : 'text-[#A6AC9F] hover:text-[#FFFFFF] hover:bg-[#1E211A]'
            }`}
          >
            <span>Contextual</span>
            <span className="opacity-80 font-normal">({counts.contextual})</span>
          </button>

          {counts.unclear > 0 && (
            <button
              id="filter-unclear-btn"
              onClick={() => setFilter('unclear')}
              className={`px-2.5 py-1 rounded transition-colors font-semibold flex items-center gap-1 text-xs cursor-pointer ${
                filter === 'unclear'
                  ? 'bg-[#191C16] text-[#A5ABA0] border border-[#363B2F] shadow-xs'
                  : 'text-[#A6AC9F] hover:text-[#FFFFFF] hover:bg-[#1E211A]'
              }`}
            >
              <span>Unclear</span>
              <span className="opacity-80 font-normal">({counts.unclear})</span>
            </button>
          )}
        </div>

        <span className="text-[10px] font-mono text-[#6E7569] px-2 hidden sm:inline">
          Showing <strong className="text-[#FFFFFF]">{filteredSources.length}</strong> of {sources.length}
        </span>
      </div>

      {/* Grid of Evidence Cards */}
      {filteredSources.length === 0 ? (
        <div className="p-8 text-center bg-[#151712] border border-[#262921] rounded-xl">
          <p className="text-xs text-[#A6AC9F] font-mono">No evidence sources match this filter.</p>
          <button
            onClick={() => setFilter('all')}
            className="mt-2.5 px-3 py-1 bg-[#1E211A] hover:bg-[#FE813C] hover:text-[#0E0F0B] text-xs font-mono font-medium text-[#FFFFFF] rounded border border-[#32362C] transition-colors cursor-pointer"
          >
            Reset filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {filteredSources.map((source) => (
            <EvidenceCard
              key={source.id}
              source={source}
              isHighlighted={highlightedSourceId === source.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};
