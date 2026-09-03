import React, { useState } from 'react';
import { ChallengeResult, Investigation } from '../types';
import { challengeVerdict } from '../services/api';
import { ShieldAlert, RefreshCw, CheckCircle2, ArrowRight, Loader2, Sparkles, Scale, Info } from 'lucide-react';

interface ChallengeVerdictProps {
  investigation: Investigation;
  onUpdateInvestigation?: (updated: Investigation) => void;
}

export const ChallengeVerdict: React.FC<ChallengeVerdictProps> = ({
  investigation,
  onUpdateInvestigation,
}) => {
  const [isChallenging, setIsChallenging] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [currentStepName, setCurrentStepName] = useState('');
  const [challengeResult, setChallengeResult] = useState<ChallengeResult | null>(
    investigation.challengeResult || null
  );

  const steps = [
    'Searching for counter-evidence...',
    'Finding alternative interpretations...',
    'Reviewing conflicting sources...',
    'Re-evaluating assessment confidence...',
  ];

  const handleStartChallenge = async () => {
    setIsChallenging(true);
    try {
      const result = await challengeVerdict(
        investigation.id,
        investigation.originalClaim,
        (stepIndex, stepName) => {
          setActiveStepIndex(stepIndex);
          setCurrentStepName(stepName);
        }
      );

      setChallengeResult(result);
      if (onUpdateInvestigation) {
        onUpdateInvestigation({
          ...investigation,
          challengeResult: result,
        });
      }
    } catch (err) {
      console.error('Challenge failed:', err);
    } finally {
      setIsChallenging(false);
    }
  };

  return (
    <div
      id="challenge-verdict-section"
      className="w-full bg-[#151712] border border-[#262921] rounded-xl p-5 sm:p-6 shadow-md mb-6 transition-all"
    >
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-3">
        <div>
          <span className="text-[10px] font-mono font-semibold tracking-wider text-[#8A9084] uppercase">
            Adversarial Re-Evaluation
          </span>
          <h3 className="text-base font-semibold text-[#FFFFFF] font-sans">
            Challenge This Verdict
          </h3>
        </div>
        <span className="text-xs font-mono text-[#8A9084]">Second-Pass Stress Test</span>
      </div>

      <p className="text-xs text-[#D8DCD5] leading-relaxed mb-4">
        Ask TruthLens to actively execute targeted counter-factual queries, search for confounding variables, and test if dissenting peer-reviewed studies could alter its conclusion.
      </p>

      {/* When challenging in progress */}
      {isChallenging && (
        <div className="p-4 rounded-lg bg-[#11130E] border border-[#262921] space-y-3 animate-in fade-in">
          <div className="flex items-center gap-2 text-xs font-mono text-[#FFFFFF]">
            <Loader2 className="w-3.5 h-3.5 text-[#FE813C] animate-spin shrink-0" />
            <span>{currentStepName || 'Initiating counter-evidence scan...'}</span>
          </div>

          <div className="space-y-1.5">
            {steps.map((step, idx) => {
              const isPast = idx < activeStepIndex;
              const isCurrent = idx === activeStepIndex;
              return (
                <div
                  key={idx}
                  className={`flex items-center gap-2 text-xs font-mono transition-colors ${
                    isCurrent
                      ? 'text-[#FFFFFF] font-semibold'
                      : isPast
                      ? 'text-[#727E6E] font-medium'
                      : 'text-[#555A4F] opacity-60'
                  }`}
                >
                  {isPast ? (
                    <CheckCircle2 className="w-3 h-3 text-[#727E6E]" />
                  ) : isCurrent ? (
                    <Loader2 className="w-3 h-3 animate-spin text-[#FE813C]" />
                  ) : (
                    <span className="w-3 h-3 rounded-full border border-[#262921] inline-block text-[8px] text-center leading-3">
                      {idx + 1}
                    </span>
                  )}
                  <span>{step}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* When Challenge Result is Available */}
      {!isChallenging && challengeResult && (
        <div className="p-4 rounded-lg bg-[#11130E] border border-[#262921] space-y-3.5 animate-in fade-in">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-[#262921]">
            <div className="flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-[#BC656A]" />
              <span className="text-xs font-mono font-bold uppercase text-[#FFFFFF] tracking-wider">
                Counter-Evidence Review Results
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#8A9084]">
              <strong className="text-[#FFFFFF]">{challengeResult.newSourcesDiscovered}</strong> additional counter-sources scanned
            </span>
          </div>

          {/* Comparison Cards: Initial vs Re-evaluated */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="p-3 rounded-lg bg-[#151712] border border-[#262921]">
              <span className="text-[10px] font-mono text-[#8A9084] uppercase block mb-0.5">
                Initial Assessment Confidence
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-mono font-bold text-[#FFFFFF]">
                  {challengeResult.initialConfidence}%
                </span>
                <span className="text-[10px] text-[#8A9084] font-mono">baseline</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#241315] border border-[#BC656A]/60 ring-1 ring-[#BC656A]/20">
              <span className="text-[10px] font-mono text-[#E0A2A6] uppercase block mb-0.5 font-semibold">
                After Counter-Evidence Review
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-mono font-bold text-[#BC656A]">
                  {challengeResult.reEvaluatedConfidence}%
                </span>
                <span className="text-[10px] text-[#E0A2A6] font-mono">adjusted (-6% shift)</span>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="p-3 rounded-lg bg-[#151712] border border-[#262921] text-xs text-[#D8DCD5] leading-relaxed space-y-2">
            <p className="font-medium text-[#FFFFFF]">
              {challengeResult.counterEvidenceSummary}
            </p>

            {challengeResult.findings && challengeResult.findings.length > 0 && (
              <div className="space-y-1 pt-2 border-t border-[#262921]">
                <span className="text-[10px] font-mono font-semibold text-[#A6AC9F] uppercase block mb-0.5">
                  Key Counter-Audit Findings:
                </span>
                {challengeResult.findings.map((f, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 text-xs text-[#D8DCD5]">
                    <span className="text-[#BC656A] font-bold">•</span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Re-challenge button */}
          <div className="flex justify-end pt-1">
            <button
              onClick={handleStartChallenge}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#151712] hover:bg-[#1E211A] text-[#FFFFFF] text-xs font-mono font-medium rounded-md border border-[#262921] transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3 h-3 text-[#FE813C]" />
              <span>Re-run counter-evidence search</span>
            </button>
          </div>
        </div>
      )}

      {/* Default State: Button to start */}
      {!isChallenging && !challengeResult && (
        <div className="flex justify-start">
          <button
            id="start-challenge-btn"
            onClick={handleStartChallenge}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#1C1F17] hover:bg-[#FE813C] text-[#FFFFFF] hover:text-[#0E0F0B] border border-[#262921] text-xs font-mono font-semibold rounded-md transition-all shadow-xs cursor-pointer active:scale-98"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-[#BC656A] group-hover:text-[#0E0F0B]" />
            <span>Challenge Verdict with Counter-Evidence</span>
            <ArrowRight className="w-3 h-3 text-[#A6AC9F]" />
          </button>
        </div>
      )}
    </div>
  );
};
