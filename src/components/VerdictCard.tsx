import React, { useState } from 'react';
import { Investigation } from '../types';
import { VerdictBadge } from './StatusBadge';
import {
  CheckCircle2,
  AlertTriangle,
  Info,
  ChevronDown,
  ChevronUp,
  Share2,
  Copy,
  Check,
  Sparkles,
  ShieldCheck,
  Scale,
} from 'lucide-react';

interface VerdictCardProps {
  investigation: Investigation;
}

export const VerdictCard: React.FC<VerdictCardProps> = ({ investigation }) => {
  const [isReasoningOpen, setIsReasoningOpen] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleCopySummary = () => {
    const textToCopy = `TruthLens Investigation: "${investigation.originalClaim}"\nVerdict: ${investigation.verdict} (${investigation.confidence}% confidence)\nAssessment: ${investigation.summary}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getVerdictTheme = () => {
    switch (investigation.verdict) {
      case 'SUPPORTED':
        return {
          bannerBg: 'bg-[#182218]/90 border-[#727E6E]/60',
          accentColor: 'text-[#B9CBB5]',
          confidenceBar: 'bg-[#727E6E]',
        };
      case 'MISLEADING':
        return {
          bannerBg: 'bg-[#28180E]/90 border-[#FE813C]/60',
          accentColor: 'text-[#FEAC7C]',
          confidenceBar: 'bg-[#FE813C]',
        };
      case 'CONTRADICTED':
        return {
          bannerBg: 'bg-[#261316]/90 border-[#BC656A]/60',
          accentColor: 'text-[#E0A2A6]',
          confidenceBar: 'bg-[#BC656A]',
        };
      case 'OUTDATED':
        return {
          bannerBg: 'bg-[#191C16]/90 border-[#363B2F]',
          accentColor: 'text-[#A5ABA0]',
          confidenceBar: 'bg-[#727E6E]',
        };
      case 'INSUFFICIENT EVIDENCE':
      default:
        return {
          bannerBg: 'bg-[#191C16]/90 border-[#363B2F]',
          accentColor: 'text-[#A5ABA0]',
          confidenceBar: 'bg-[#727E6E]',
        };
    }
  };

  const theme = getVerdictTheme();

  return (
    <div
      id="verdict-card-container"
      className="w-full bg-[#151712] border border-[#262921] rounded-xl p-5 sm:p-6 shadow-md mb-6"
    >
      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pb-4 border-b border-[#22261D]">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#1C1F17] text-[#A6AC9F] text-[10px] font-mono font-semibold tracking-wider uppercase border border-[#2B2F24]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#727E6E]"></span>
            INVESTIGATION COMPLETE
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#221B13] text-[#FE813C] text-[10px] font-mono font-semibold tracking-wider border border-[#FE813C]/40">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FE813C] animate-pulse"></span>
            {investigation.attribution || 'Live search evidence via SerpApi'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="copy-verdict-summary-btn"
            onClick={handleCopySummary}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-mono font-medium text-[#D8DCD5] hover:text-white bg-[#1E211A] hover:bg-[#282C22] border border-[#32362C] rounded-md transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#727E6E]" />
                <span className="text-[#B9CBB5] font-semibold">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#FE813C]" />
                <span>Share Brief</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Claim Title */}
      <div className="mt-4 mb-5">
        <span className="text-[10px] font-mono font-semibold text-[#8A9084] uppercase tracking-wider block mb-1">
          Investigated Claim
        </span>
        <h1 className="text-lg sm:text-xl lg:text-2xl font-serif text-[#FFFFFF] leading-snug tracking-tight font-medium">
          “{investigation.originalClaim}”
        </h1>
      </div>

      {/* Distinctive Restrained Verdict Panel */}
      <div
        id="verdict-display-panel"
        className={`p-5 rounded-lg border ${theme.bannerBg} mb-5 transition-all`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3">
          <div className="flex items-center gap-2.5">
            <span className="text-[11px] font-mono font-semibold tracking-wider text-[#A6AC9F] uppercase">
              Verdict:
            </span>
            <VerdictBadge verdict={investigation.verdict} size="lg" />
          </div>

          {/* Assessment Confidence Indicator */}
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="font-bold text-base text-[#FFFFFF]">{investigation.confidence}%</span>
            <span className="text-[#A6AC9F] text-[11px]">assessment confidence</span>
          </div>
        </div>

        {/* Confidence Progress Bar */}
        <div className="w-full bg-[#0E0F0B] h-1.5 rounded-full overflow-hidden mb-3">
          <div
            className={`h-full rounded-full ${theme.confidenceBar} transition-all duration-700`}
            style={{ width: `${investigation.confidence}%` }}
          />
        </div>

        {/* Core Summary */}
        <p className="text-sm sm:text-base text-[#FFFFFF] leading-relaxed font-sans font-medium">
          {investigation.summary}
        </p>

        {/* Grounding note */}
        <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center gap-1.5 text-[11px] text-[#A6AC9F] font-sans">
          <Info className="w-3.5 h-3.5 text-[#FE813C] shrink-0" />
          <span>
            Assessment synthesized from multi-source empirical literature, peer-reviewed studies, and institutional reports.
          </span>
        </div>
      </div>

      {/* Expandable Editorial Reasoning Section */}
      <div className="border border-[#262921] rounded-lg overflow-hidden bg-[#11130E]">
        <button
          id="toggle-investigative-reasoning-btn"
          onClick={() => setIsReasoningOpen(!isReasoningOpen)}
          className="w-full flex items-center justify-between px-4 py-2.5 text-left text-xs font-medium text-[#FFFFFF] hover:bg-[#181A14] transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Scale className="w-3.5 h-3.5 text-[#FE813C]" />
            <span className="font-mono font-semibold text-[11px] uppercase tracking-wider text-[#A6AC9F]">
              Investigative Reasoning & Stance Synthesis
            </span>
          </div>
          {isReasoningOpen ? (
            <ChevronUp className="w-3.5 h-3.5 text-[#8A9084]" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-[#8A9084]" />
          )}
        </button>

        {isReasoningOpen && (
          <div className="px-4 pb-4 pt-2 text-xs sm:text-sm text-[#D8DCD5] leading-relaxed border-t border-[#262921] bg-[#151712]">
            <p>{investigation.reasoning}</p>
          </div>
        )}
      </div>
    </div>
  );
};
