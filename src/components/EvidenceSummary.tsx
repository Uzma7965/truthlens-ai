import React from 'react';
import { InvestigationStats } from '../types';
import { CheckCircle2, XCircle, Compass, HelpCircle } from 'lucide-react';

interface EvidenceSummaryProps {
  stats: InvestigationStats;
  selectedFilter?: string;
  onSelectFilter?: (filter: 'all' | 'supports' | 'contradicts' | 'contextual' | 'unclear') => void;
}

export const EvidenceSummary: React.FC<EvidenceSummaryProps> = ({
  stats,
  selectedFilter = 'all',
  onSelectFilter,
}) => {
  const total =
    stats.supportingCount +
    stats.contradictingCount +
    stats.contextualCount +
    stats.unclearCount || 1;

  const suppPct = (stats.supportingCount / total) * 100;
  const contraPct = (stats.contradictingCount / total) * 100;
  const ctxPct = (stats.contextualCount / total) * 100;
  const unclrPct = (stats.unclearCount / total) * 100;

  const categories = [
    {
      id: 'supports' as const,
      label: 'Supporting',
      count: stats.supportingCount,
      color: 'text-[#B9CBB5]',
      bg: 'bg-[#182218] border-[#727E6E]/70',
      dot: 'bg-[#727E6E]',
      icon: CheckCircle2,
    },
    {
      id: 'contradicts' as const,
      label: 'Contradicting',
      count: stats.contradictingCount,
      color: 'text-[#E0A2A6]',
      bg: 'bg-[#261316] border-[#BC656A]/70',
      dot: 'bg-[#BC656A]',
      icon: XCircle,
    },
    {
      id: 'contextual' as const,
      label: 'Contextual',
      count: stats.contextualCount,
      color: 'text-[#B5C2B4]',
      bg: 'bg-[#1A201C] border-[#556052]/70',
      dot: 'bg-[#727E6E]',
      icon: Compass,
    },
    {
      id: 'unclear' as const,
      label: 'Unclear',
      count: stats.unclearCount,
      color: 'text-[#A5ABA0]',
      bg: 'bg-[#191C16] border-[#363B2F]',
      dot: 'bg-[#565C50]',
      icon: HelpCircle,
    },
  ];

  return (
    <div id="evidence-summary-section" className="w-full bg-[#151712] border border-[#262921] rounded-xl p-5 sm:p-6 shadow-md mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <span className="text-[10px] font-mono font-semibold tracking-wider text-[#8A9084] uppercase">
            Evidence Landscape
          </span>
          <h2 className="text-base font-semibold text-[#FFFFFF]">Source Stance Distribution</h2>
        </div>
        <span className="text-xs font-mono text-[#A6AC9F]">
          <span className="text-[#FFFFFF] font-bold">{total}</span> total sources categorized
        </span>
      </div>

      {/* Proportional Balance Distribution Bar */}
      <div className="w-full h-2.5 rounded-full bg-[#0E0F0B] overflow-hidden flex mb-4 p-0.5 border border-[#262921]">
        {stats.supportingCount > 0 && (
          <div
            title={`Supporting: ${stats.supportingCount}`}
            style={{ width: `${suppPct}%` }}
            className="h-full bg-[#727E6E] rounded-xs transition-all duration-500"
          />
        )}
        {stats.contradictingCount > 0 && (
          <div
            title={`Contradicting: ${stats.contradictingCount}`}
            style={{ width: `${contraPct}%` }}
            className="h-full bg-[#BC656A] rounded-xs transition-all duration-500"
          />
        )}
        {stats.contextualCount > 0 && (
          <div
            title={`Contextual: ${stats.contextualCount}`}
            style={{ width: `${ctxPct}%` }}
            className="h-full bg-[#556052] rounded-xs transition-all duration-500"
          />
        )}
        {stats.unclearCount > 0 && (
          <div
            title={`Unclear: ${stats.unclearCount}`}
            style={{ width: `${unclrPct}%` }}
            className="h-full bg-[#363B2F] rounded-xs transition-all duration-500"
          />
        )}
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {categories.map((cat) => {
          const isSelected = selectedFilter === cat.id;
          return (
            <button
              key={cat.id}
              id={`evidence-filter-btn-${cat.id}`}
              onClick={() => onSelectFilter && onSelectFilter(isSelected ? 'all' : cat.id)}
              className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                isSelected
                  ? `${cat.bg} ring-2 ring-[#FE813C] shadow-sm`
                  : 'bg-[#11130E] hover:bg-[#181A14] border-[#262921] hover:border-[#FE813C]/50'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono font-semibold text-[#A6AC9F] uppercase">
                  {cat.label}
                </span>
                <span className={`w-2 h-2 rounded-full ${cat.dot}`} />
              </div>
              <div className="flex items-baseline gap-1">
                <span className={`text-xl sm:text-2xl font-mono font-bold ${cat.color}`}>
                  {cat.count}
                </span>
                <span className="text-[10px] text-[#6E7569] font-mono">sources</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
