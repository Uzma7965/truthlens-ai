import React, { useState } from 'react';
import { Investigation, Subclaim, EvidenceSource } from '../types';
import { VerdictBadge, SubclaimBadge, EvidenceStatusBadge } from './StatusBadge';
import { GitCommit, ArrowDown, ChevronRight, X, ExternalLink, ShieldCheck, Scale } from 'lucide-react';

interface EvidenceGraphProps {
  investigation: Investigation;
  onSelectSource?: (source: EvidenceSource) => void;
}

export const EvidenceGraph: React.FC<EvidenceGraphProps> = ({
  investigation,
  onSelectSource,
}) => {
  const [selectedNode, setSelectedNode] = useState<{
    type: 'claim' | 'subclaim' | 'source';
    data: any;
  } | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'supports':
      case 'SUPPORTED':
        return {
          border: 'border-[#727E6E]/70',
          bg: 'bg-[#182218]',
          badgeBg: 'bg-[#243524] text-[#B9CBB5]',
          text: 'text-[#B9CBB5]',
          dot: 'bg-[#727E6E]',
        };
      case 'contradicts':
      case 'CONTRADICTED':
        return {
          border: 'border-[#BC656A]/70',
          bg: 'bg-[#261316]',
          badgeBg: 'bg-[#3D1D22] text-[#E0A2A6]',
          text: 'text-[#E0A2A6]',
          dot: 'bg-[#BC656A]',
        };
      case 'contextual':
      case 'MIXED EVIDENCE':
      case 'CONTEXTUAL':
        return {
          border: 'border-[#556052]/70',
          bg: 'bg-[#1A201C]',
          badgeBg: 'bg-[#252E27] text-[#B5C2B4]',
          text: 'text-[#B5C2B4]',
          dot: 'bg-[#727E6E]',
        };
      default:
        return {
          border: 'border-[#363B2F]',
          bg: 'bg-[#191C16]',
          badgeBg: 'bg-[#262A21] text-[#A5ABA0]',
          text: 'text-[#A5ABA0]',
          dot: 'bg-[#565C50]',
        };
    }
  };

  return (
    <div id="evidence-graph-container" className="w-full bg-[#151712] border border-[#262921] rounded-xl p-5 sm:p-6 shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-4 pb-3 border-b border-[#22261D]">
        <div>
          <span className="text-[10px] font-mono font-semibold tracking-wider text-[#8A9084] uppercase">
            Relationship Topology
          </span>
          <h3 className="text-base font-semibold text-[#FFFFFF]">
            Evidence Hierarchy Graph
          </h3>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-2.5 text-[11px] font-mono text-[#A6AC9F]">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#727E6E]"></span>
            <span>Supports</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#BC656A]"></span>
            <span>Contradicts</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#FE813C]"></span>
            <span>Contextual / Mixed</span>
          </span>
        </div>
      </div>

      {/* Interactive Diagram Canvas */}
      <div className="relative bg-[#0E0F0B] border border-[#262921] rounded-lg p-5 overflow-x-auto min-h-[420px]">
        {/* LEVEL 1: ROOT CLAIM */}
        <div className="flex flex-col items-center">
          <div
            id="graph-root-claim-node"
            onClick={() => setSelectedNode({ type: 'claim', data: investigation })}
            className="w-full max-w-lg p-3.5 rounded-lg bg-[#151712] border border-[#FE813C]/60 hover:border-[#FE813C] text-center shadow-sm cursor-pointer transition-all group"
          >
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="text-[9px] font-mono font-bold tracking-widest text-[#8A9084] uppercase">
                ROOT CLAIM UNDER INVESTIGATION
              </span>
            </div>
            <p className="text-xs sm:text-sm font-serif font-medium text-[#FFFFFF]">
              “{investigation.originalClaim}”
            </p>
            <div className="mt-1.5 flex items-center justify-center gap-2">
              <VerdictBadge verdict={investigation.verdict} size="sm" />
              <span className="text-[10px] font-mono text-[#A6AC9F]">
                ({investigation.confidence}% confidence)
              </span>
            </div>
          </div>

          {/* Connector Line Root -> Subclaims */}
          <div className="h-6 w-0.5 bg-[#262921] my-1"></div>
          <div className="w-4/5 max-w-2xl h-0.5 bg-[#262921]"></div>
        </div>

        {/* LEVEL 2: SUBCLAIMS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-1 mb-3">
          {investigation.subclaims.map((subclaim, idx) => {
            const scStyle = getStatusColor(subclaim.status);
            const linkedSources = investigation.sources.filter(
              (s) =>
                subclaim.evidenceIds.includes(s.id) ||
                s.subclaimIds.includes(subclaim.id)
            );

            return (
              <div key={subclaim.id} className="flex flex-col items-center">
                {/* Vertical connector down from horizontal line */}
                <div className="h-5 w-0.5 bg-[#262921] mb-1"></div>

                {/* Subclaim Node Box */}
                <div
                  id={`graph-subclaim-node-${subclaim.number}`}
                  onClick={() => setSelectedNode({ type: 'subclaim', data: subclaim })}
                  className={`w-full p-3 rounded-lg border bg-[#11130E] shadow-xs cursor-pointer hover:border-[#FE813C] transition-all ${scStyle.border}`}
                >
                  <div className="flex items-center justify-between gap-1.5 mb-1">
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-[#1A1D16] text-[#FFFFFF] border border-[#32362C]">
                      Proposition {subclaim.number}
                    </span>
                    <SubclaimBadge status={subclaim.status} />
                  </div>

                  <p className="text-xs font-semibold text-[#FFFFFF] leading-tight line-clamp-2 mb-1.5">
                    {subclaim.statement}
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-[#8A9084] font-mono pt-1.5 border-t border-[#22261D]">
                    <span>{linkedSources.length} sources</span>
                    <span className="text-[#FE813C] font-semibold group-hover:underline">Inspect →</span>
                  </div>
                </div>

                {/* Vertical Connector Subclaim -> Evidence Nodes */}
                <div className="h-4 w-0.5 bg-[#262921] my-1"></div>

                {/* LEVEL 3: EVIDENCE LEAVES */}
                <div className="w-full space-y-2">
                  {linkedSources.map((source) => {
                    const srcStyle = getStatusColor(source.status);
                    return (
                      <div
                        key={source.id}
                        id={`graph-source-node-${source.id}`}
                        onClick={() => setSelectedNode({ type: 'source', data: source })}
                        className={`p-2.5 rounded-md border bg-[#151712] hover:bg-[#1C1F17] shadow-xs cursor-pointer transition-all ${srcStyle.border}`}
                      >
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <span className="font-mono text-[10px] font-bold text-[#FFFFFF] truncate">
                            {source.publication}
                          </span>
                          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${srcStyle.dot}`} />
                        </div>
                        <p className="text-[11px] text-[#D8DCD5] font-medium line-clamp-1 leading-snug">
                          “{source.headline}”
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Node Detail Drawer / Inspection Modal */}
      {selectedNode && (
        <div className="mt-4 p-4 rounded-lg border border-[#262921] bg-[#11130E] animate-in fade-in">
          <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[#22261D]">
            <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#A6AC9F]">
              Selected Node Inspection: {selectedNode.type.toUpperCase()}
            </span>
            <button
              onClick={() => setSelectedNode(null)}
              className="p-1 text-[#8A9084] hover:text-[#FFFFFF] rounded cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {selectedNode.type === 'claim' && (
            <div className="space-y-2">
              <h4 className="text-sm font-serif font-semibold text-[#FFFFFF]">
                “{investigation.originalClaim}”
              </h4>
              <p className="text-xs text-[#D8DCD5]">{investigation.summary}</p>
              <div className="flex items-center gap-2">
                <VerdictBadge verdict={investigation.verdict} size="sm" />
                <span className="text-[11px] font-mono text-[#A6AC9F]">
                  {investigation.confidence}% Confidence Rating
                </span>
              </div>
            </div>
          )}

          {selectedNode.type === 'subclaim' && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 bg-[#1A1D16] text-[#FFFFFF] border border-[#32362C] rounded">
                  Subclaim {selectedNode.data.number}
                </span>
                <SubclaimBadge status={selectedNode.data.status} />
              </div>
              <h4 className="text-xs sm:text-sm font-semibold text-[#FFFFFF]">
                {selectedNode.data.statement}
              </h4>
              <p className="text-xs text-[#D8DCD5] bg-[#151712] p-2.5 rounded border border-[#262921]">
                {selectedNode.data.explanation}
              </p>
            </div>
          )}

          {selectedNode.type === 'source' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#FFFFFF]">
                  {selectedNode.data.publication}
                </span>
                <EvidenceStatusBadge status={selectedNode.data.status} />
              </div>
              <h4 className="text-xs sm:text-sm font-semibold text-[#FFFFFF]">
                {selectedNode.data.headline}
              </h4>
              <p className="text-xs text-[#D8DCD5] bg-[#151712] p-2.5 rounded border border-[#262921]">
                {selectedNode.data.summary}
              </p>
              {selectedNode.data.quoteExcerpt && (
                <p className="text-xs italic text-[#C9D0C6] font-serif border-l-2 border-[#FE813C] pl-2.5">
                  “{selectedNode.data.quoteExcerpt}”
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
