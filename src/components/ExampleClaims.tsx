import React from 'react';
import { EXAMPLE_CLAIMS } from '../data/mockInvestigations';
import { Sparkles, ArrowUpRight } from 'lucide-react';

interface ExampleClaimsProps {
  onSelectExample: (claimText: string) => void;
  currentClaim?: string;
}

export const ExampleClaims: React.FC<ExampleClaimsProps> = ({
  onSelectExample,
  currentClaim,
}) => {
  return (
    <div className="w-full mt-5">
      <div className="flex items-center gap-1.5 mb-2.5">
        <Sparkles className="w-3 h-3 text-[#FE813C]" />
        <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#8A9084]">
          Preset Investigation Benchmarks
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {EXAMPLE_CLAIMS.map((example, idx) => {
          const isSelected = currentClaim?.trim() === example.trim();
          return (
            <button
              key={idx}
              id={`example-claim-btn-${idx}`}
              type="button"
              onClick={() => onSelectExample(example)}
              className={`group text-left p-3 rounded-lg border text-xs transition-all flex items-start justify-between gap-2 cursor-pointer ${
                isSelected
                  ? 'bg-[#221B13] border-[#FE813C] text-[#FFFFFF] font-medium shadow-xs'
                  : 'bg-[#151712] hover:bg-[#1D2018] border-[#262921] hover:border-[#FE813C]/60 text-[#D8DCD5] hover:text-[#FFFFFF]'
              }`}
            >
              <span className="leading-snug font-sans text-xs">“{example}”</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#6E7569] group-hover:text-[#FE813C] shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          );
        })}
      </div>
    </div>
  );
};
