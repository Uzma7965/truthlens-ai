import React, { useState } from 'react';
import { Subclaim, EvidenceSource } from '../types';
import { SubclaimBadge, EvidenceStatusBadge } from './StatusBadge';
import { ChevronDown, ChevronUp, ArrowRight, ExternalLink, FileCheck } from 'lucide-react';

interface ClaimBreakdownProps {
  subclaims: Subclaim[];
  sources: EvidenceSource[];
  onInspectSource?: (sourceId: string) => void;
}

export const ClaimBreakdown: React.FC<ClaimBreakdownProps> = ({
  subclaims,
  sources,
  onInspectSource,
}) => {
  // Keep first open by default
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    [subclaims[0]?.id || 'sub-1']: true,
  });

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getEvidenceForSubclaim = (subclaim: Subclaim) => {
    return sources.filter(
      (s) =>
        subclaim.evidenceIds.includes(s.id) ||
        s.subclaimIds.includes(subclaim.id)
    );
  };

  return (
    <div id="claim-breakdown-section" className="w-full bg-[#151712] border border-[#262921] rounded-xl p-5 sm:p-6 shadow-md mb-6">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-4">
        <div>
          <span className="text-[10px] font-mono font-semibold tracking-wider text-[#8A9084] uppercase">
            Deconstructed Analysis
          </span>
          <h2 className="text-base font-semibold text-[#FFFFFF] font-sans">What We Found</h2>
        </div>
        <p className="text-xs text-[#A6AC9F] font-mono">
          <span className="text-[#FFFFFF] font-semibold">{subclaims.length}</span> testable propositions evaluated
        </p>
      </div>

      <div className="space-y-3">
        {subclaims.map((subclaim) => {
          const isExpanded = !!expandedIds[subclaim.id];
          const linkedSources = getEvidenceForSubclaim(subclaim);

          return (
            <div
              key={subclaim.id}
              id={`subclaim-item-${subclaim.number}`}
              className="border border-[#262921] rounded-lg overflow-hidden bg-[#11130E] transition-all"
            >
              {/* Header Button */}
              <button
                onClick={() => toggleExpand(subclaim.id)}
                className="w-full flex items-start sm:items-center justify-between gap-3 p-3.5 sm:p-4 text-left hover:bg-[#181A14] transition-colors cursor-pointer"
                aria-expanded={isExpanded}
              >
                <div className="flex items-start sm:items-center gap-3 flex-1 min-w-0">
                  <div className="w-7 h-7 rounded bg-[#1A1D16] text-[#FFFFFF] border border-[#32362C] flex items-center justify-center font-mono text-xs font-bold shrink-0">
                    {subclaim.number}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5 mb-1">
                      <SubclaimBadge status={subclaim.status} />
                      <span className="text-[10px] font-mono text-[#8A9084]">
                        {linkedSources.length} linked {linkedSources.length === 1 ? 'source' : 'sources'}
                      </span>
                    </div>
                    <h3 className="text-xs sm:text-sm font-semibold text-[#FFFFFF] leading-snug">
                      {subclaim.statement}
                    </h3>
                  </div>
                </div>

                <div className="p-1 rounded text-[#8A9084] hover:text-[#FFFFFF] shrink-0">
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-[#FE813C]" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              </button>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-2 border-t border-[#262921] space-y-3 bg-[#151712]">
                  {/* Detailed Explanation */}
                  <div className="p-3 rounded-lg bg-[#11130E] border border-[#262921] text-xs text-[#D8DCD5] leading-relaxed">
                    <strong className="text-[#FFFFFF] font-semibold block mb-0.5 font-mono text-[11px] uppercase tracking-wider">
                      Evidence Synthesis:
                    </strong>
                    <p>{subclaim.explanation}</p>
                  </div>

                  {/* Associated Sources */}
                  {linkedSources.length > 0 && (
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono font-semibold text-[#A6AC9F] uppercase tracking-wider block">
                        Direct Citations for Proposition {subclaim.number}:
                      </span>

                      <div className="grid grid-cols-1 gap-1.5">
                        {linkedSources.map((source) => (
                          <div
                            key={source.id}
                            id={`subclaim-${subclaim.number}-source-${source.id}`}
                            className="p-2.5 rounded-md border border-[#262921] bg-[#11130E] hover:bg-[#181A14] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs transition-colors"
                          >
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5 mb-0.5">
                                <span className="font-semibold text-[#FFFFFF] font-mono text-[11px]">
                                  {source.publication}
                                </span>
                                <EvidenceStatusBadge status={source.status} />
                              </div>
                              <p className="text-[#D8DCD5] font-medium text-xs line-clamp-1">
                                “{source.headline}”
                              </p>
                            </div>

                            {onInspectSource && (
                              <button
                                onClick={() => onInspectSource(source.id)}
                                className="text-[10px] font-mono text-[#D8DCD5] hover:text-[#0E0F0B] inline-flex items-center gap-1 font-semibold shrink-0 self-end sm:self-center px-2 py-0.5 bg-[#1E211A] hover:bg-[#FE813C] rounded border border-[#32362C] transition-colors cursor-pointer"
                              >
                                <span>Inspect</span>
                                <ArrowRight className="w-2.5 h-2.5" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
