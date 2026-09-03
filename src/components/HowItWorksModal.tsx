import React from 'react';
import { X, Search, GitBranch, Layers, ShieldCheck, RefreshCw, AlertCircle } from 'lucide-react';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowItWorksModal: React.FC<HowItWorksModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        id="how-it-works-modal"
        className="relative w-full max-w-2xl bg-[#151712] border border-[#262921] rounded-xl shadow-2xl overflow-hidden text-[#D8DCD5]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#262921] bg-[#11130E]">
          <div>
            <span className="text-[10px] font-mono font-semibold tracking-wider text-[#8A9084] uppercase">Methodology</span>
            <h2 className="text-base font-semibold text-[#FFFFFF]">How TruthLens Investigates Claims</h2>
          </div>
          <button
            id="close-how-it-works-btn"
            onClick={onClose}
            className="p-1 rounded-md text-[#8A9084] hover:text-[#FFFFFF] hover:bg-[#1E211A] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Philosophy Banner */}
          <div className="p-3.5 rounded-lg bg-[#11130E] border border-[#262921]">
            <p className="text-[10px] font-mono text-[#FE813C] font-semibold uppercase mb-0.5">Core Philosophy</p>
            <p className="text-sm font-serif italic text-[#FFFFFF] leading-snug">
              “Don’t just read it. Investigate it.”
            </p>
            <p className="text-xs text-[#D8DCD5] mt-1.5 leading-relaxed">
              TruthLens does not present itself as an infallible truth arbiter. It generates evidence-grounded assessments derived systematically from retrieved multi-source peer-reviewed literature, official statistics, and reputable investigative reporting.
            </p>
          </div>

          {/* 5-Step Process */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-mono font-semibold tracking-wider uppercase text-[#8A9084]">The 5-Stage Investigation Pipeline</h3>

            <div className="space-y-2">
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[#11130E] border border-[#262921]">
                <div className="flex items-center justify-center w-6 h-6 rounded bg-[#FE813C] text-[#0E0F0B] shrink-0 font-mono text-[11px] font-bold">
                  01
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-[#FFFFFF]">Claim Decomposition</h4>
                  <p className="text-xs text-[#D8DCD5] mt-0.5 leading-relaxed">
                    The raw statement is parsed into specific, falsifiable subclaims (e.g. underlying mechanisms, causal links, and specific quantitative claims).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[#11130E] border border-[#262921]">
                <div className="flex items-center justify-center w-6 h-6 rounded bg-[#FE813C] text-[#0E0F0B] shrink-0 font-mono text-[11px] font-bold">
                  02
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-[#FFFFFF]">Multi-Query Web & Literature Search</h4>
                  <p className="text-xs text-[#D8DCD5] mt-0.5 leading-relaxed">
                    Targeted queries are dispatched across Google Search, Google News, academic repositories, and government databases to retrieve primary and secondary sources.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[#11130E] border border-[#262921]">
                <div className="flex items-center justify-center w-6 h-6 rounded bg-[#FE813C] text-[#0E0F0B] shrink-0 font-mono text-[11px] font-bold">
                  03
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-[#FFFFFF]">Stance Triangulation & Quality Weighting</h4>
                  <p className="text-xs text-[#D8DCD5] mt-0.5 leading-relaxed">
                    Each retrieved source is classified as supporting, contradicting, contextual, or unclear. Sources are weighted by methodological rigor and institutional reliability.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[#11130E] border border-[#262921]">
                <div className="flex items-center justify-center w-6 h-6 rounded bg-[#FE813C] text-[#0E0F0B] shrink-0 font-mono text-[11px] font-bold">
                  04
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-[#FFFFFF]">Counter-Evidence Stress-Testing</h4>
                  <p className="text-xs text-[#D8DCD5] mt-0.5 leading-relaxed">
                    The engine actively conducts adversarial searches to find disconfirming studies, confounding variables, or replication failures that could challenge initial hypotheses.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[#11130E] border border-[#262921]">
                <div className="flex items-center justify-center w-6 h-6 rounded bg-[#FE813C] text-[#0E0F0B] shrink-0 font-mono text-[11px] font-bold">
                  05
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-[#FFFFFF]">Transparent Verdict Synthesis</h4>
                  <p className="text-xs text-[#D8DCD5] mt-0.5 leading-relaxed">
                    A calibrated verdict (Supported, Misleading, Contradicted, Insufficient Evidence, or Outdated) is synthesized alongside a breakdown of evidence strength and confidence.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Verdict Definitions */}
          <div className="p-3.5 rounded-lg bg-[#11130E] border border-[#262921] text-xs text-[#D8DCD5] space-y-1.5">
            <h4 className="font-semibold text-[#FFFFFF] font-mono text-[10px] uppercase tracking-wider">Standard Verdict Taxonomy</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div><strong className="text-[#B9CBB5]">SUPPORTED:</strong> Validated by consistent empirical evidence.</div>
              <div><strong className="text-[#FE813C]">MISLEADING:</strong> Partial truth exaggerated or context omitted.</div>
              <div><strong className="text-[#E0A2A6]">CONTRADICTED:</strong> Refuted by authoritative peer-reviewed data.</div>
              <div><strong className="text-[#A5ABA0]">INSUFFICIENT EVIDENCE:</strong> Inconclusive data or scarce studies.</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-[#262921] bg-[#11130E] flex justify-end">
          <button
            id="modal-got-it-btn"
            onClick={onClose}
            className="px-3.5 py-1.5 bg-[#FE813C] hover:bg-[#E26E2C] text-[#0E0F0B] text-xs font-mono font-bold rounded-md transition-colors cursor-pointer shadow-xs"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
