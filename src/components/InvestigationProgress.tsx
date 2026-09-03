import React from 'react';
import {
  FileText,
  GitFork,
  Globe,
  Scale,
  ShieldAlert,
  CheckCircle2,
  Loader2,
  Clock,
  Search,
} from 'lucide-react';

interface InvestigationProgressProps {
  claim: string;
  activeStageIndex: number;
  currentMessage: string;
}

const STAGES = [
  {
    number: '01',
    title: 'Understanding the claim',
    description: 'Analyzing semantic structure, entities, and primary assertions',
    icon: FileText,
  },
  {
    number: '02',
    title: 'Breaking into testable statements',
    description: 'Decomposing claim into verifiable causal & empirical subclaims',
    icon: GitFork,
  },
  {
    number: '03',
    title: 'Searching the web & archives',
    description: 'Formulating search queries & retrieving multi-source reporting',
    icon: Globe,
  },
  {
    number: '04',
    title: 'Comparing evidence & stances',
    description: 'Classifying supporting, contradicting, and contextual data',
    icon: Scale,
  },
  {
    number: '05',
    title: 'Stress-testing the conclusion',
    description: 'Actively searching for counter-evidence & confounding factors',
    icon: ShieldAlert,
  },
  {
    number: '06',
    title: 'Preparing assessment',
    description: 'Calibrating confidence score and synthesizing transparent verdict',
    icon: CheckCircle2,
  },
];

export const InvestigationProgress: React.FC<InvestigationProgressProps> = ({
  claim,
  activeStageIndex,
  currentMessage,
}) => {
  const percentComplete = Math.min(100, Math.round(((activeStageIndex + 1) / STAGES.length) * 100));

  return (
    <div id="investigation-progress-workspace" className="w-full max-w-3xl mx-auto py-6 sm:py-8 px-3 sm:px-4">
      {/* Top Claim Card */}
      <div className="bg-[#151712] border border-[#262921] rounded-xl p-5 sm:p-6 shadow-md mb-5">
        <div className="flex items-center justify-between gap-3 mb-2.5">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#1C1F17] border border-[#2B2F24] rounded text-[10px] font-mono font-semibold text-[#A6AC9F] uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FE813C] animate-pulse"></span>
            Investigation in Progress
          </div>
          <span className="text-[11px] font-mono text-[#8A9084]">
            Stage <strong className="text-[#FFFFFF]">{activeStageIndex + 1}</strong> of {STAGES.length}
          </span>
        </div>

        <h2 className="text-base sm:text-lg lg:text-xl font-serif font-medium text-[#FFFFFF] leading-snug tracking-tight mb-3">
          “{claim}”
        </h2>

        {/* Dynamic status line */}
        <div className="flex items-center gap-2 text-xs text-[#D8DCD5] bg-[#11130E] border border-[#262921] rounded-lg px-3 py-2">
          <Loader2 className="w-3.5 h-3.5 text-[#FE813C] animate-spin shrink-0" />
          <span className="font-mono text-xs text-[#FFFFFF]">{currentMessage || 'Investigating claim...'}</span>
        </div>

        {/* Continuous Progress Bar */}
        <div className="w-full bg-[#0E0F0B] h-1.5 rounded-full overflow-hidden mt-3.5 border border-[#262921]">
          <div
            className="bg-[#FE813C] h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${percentComplete}%` }}
          />
        </div>
      </div>

      {/* 6-Stage Timeline List */}
      <div className="bg-[#151712] border border-[#262921] rounded-xl p-5 sm:p-6 shadow-md">
        <h3 className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#8A9084] mb-4">
          Investigation Lifecycle Pipeline
        </h3>

        <div className="space-y-2.5">
          {STAGES.map((stage, idx) => {
            const isCompleted = idx < activeStageIndex;
            const isActive = idx === activeStageIndex;
            const isWaiting = idx > activeStageIndex;

            return (
              <div
                key={stage.number}
                id={`investigation-stage-${stage.number}`}
                className={`flex items-start gap-3 p-3 rounded-lg border transition-all duration-300 ${
                  isActive
                    ? 'bg-[#1D2018] border-[#FE813C] shadow-sm ring-1 ring-[#FE813C]'
                    : isCompleted
                    ? 'bg-[#11130E] border-[#262921] text-[#D8DCD5]'
                    : 'bg-[#0E0F0B]/60 border-[#1B1D17] text-[#555A4F] opacity-60'
                }`}
              >
                {/* State Indicator */}
                <div
                  className={`w-6 h-6 rounded flex items-center justify-center font-mono text-[10px] font-bold shrink-0 transition-colors ${
                    isActive
                      ? 'bg-[#FE813C] text-[#0E0F0B] font-bold shadow-xs'
                      : isCompleted
                      ? 'bg-[#182218] text-[#B9CBB5] border border-[#727E6E]/70'
                      : 'bg-[#191C16] text-[#6E7569] border border-[#262921]'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#727E6E]" />
                  ) : isActive ? (
                    <Loader2 className="w-3 h-3 animate-spin text-[#0E0F0B]" />
                  ) : (
                    <span>{stage.number}</span>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4
                      className={`text-xs sm:text-sm font-semibold ${
                        isActive ? 'text-[#FFFFFF]' : isCompleted ? 'text-[#D8DCD5]' : 'text-[#555A4F]'
                      }`}
                    >
                      {stage.title}
                    </h4>
                    <span
                      className={`text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.2 rounded ${
                        isActive
                          ? 'bg-[#FE813C] text-[#0E0F0B] font-bold'
                          : isCompleted
                          ? 'bg-[#182218] text-[#B9CBB5] font-semibold border border-[#727E6E]/60'
                          : 'text-[#555A4F]'
                      }`}
                    >
                      {isActive ? 'Active' : isCompleted ? 'Completed' : 'Waiting'}
                    </span>
                  </div>

                  <p className="text-xs text-[#8A9084] mt-0.5 leading-relaxed">
                    {stage.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
