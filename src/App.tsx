import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HowItWorksModal } from './components/HowItWorksModal';
import { HistoryDrawer } from './components/HistoryDrawer';
import { ClaimInput } from './components/ClaimInput';
import { ExampleClaims } from './components/ExampleClaims';
import { InvestigationProgress } from './components/InvestigationProgress';
import { VerdictCard } from './components/VerdictCard';
import { EvidenceSummary } from './components/EvidenceSummary';
import { ClaimBreakdown } from './components/ClaimBreakdown';
import { EvidenceList } from './components/EvidenceList';
import { EvidenceGraph } from './components/EvidenceGraph';
import { InvestigationTransparency } from './components/InvestigationTransparency';
import { ChallengeVerdict } from './components/ChallengeVerdict';
import { Investigation } from './types';
import { fetchInvestigation, getHistory, clearHistory } from './services/api';
import {
  Search,
  Layers,
  GitBranch,
  ArrowLeft,
  Share2,
  CheckCircle2,
  ShieldCheck,
  Compass,
  FileCheck,
  Scale,
  Sparkles,
  AlertTriangle,
  X,
} from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'investigating' | 'result'>('home');
  const [claimInput, setClaimInput] = useState('');
  const [investigatingClaim, setInvestigatingClaim] = useState('');
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [currentStageMessage, setCurrentStageMessage] = useState('');
  const [currentInvestigation, setCurrentInvestigation] = useState<Investigation | null>(null);
  const [investigationError, setInvestigationError] = useState<string | null>(null);

  // Result Page View Toggle: 'evidence' | 'graph'
  const [resultTab, setResultTab] = useState<'evidence' | 'graph'>('evidence');
  const [evidenceFilter, setEvidenceFilter] = useState<'all' | 'supports' | 'contradicts' | 'contextual' | 'unclear'>('all');
  const [highlightedSourceId, setHighlightedSourceId] = useState<string | null>(null);

  // Modals / Drawers
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [historyList, setHistoryList] = useState<Investigation[]>([]);

  // Load history on mount
  useEffect(() => {
    const loaded = getHistory();
    setHistoryList(loaded);
  }, []);

  const handleStartInvestigation = async (claimToInvestigate: string) => {
    const target = claimToInvestigate.trim();
    if (!target) return;

    setInvestigationError(null);
    setInvestigatingClaim(target);
    setCurrentView('investigating');
    setActiveStageIndex(0);
    setCurrentStageMessage('Identifying the main claim...');

    try {
      const investigation = await fetchInvestigation(target, (stageIdx, detailMsg) => {
        setActiveStageIndex(stageIdx);
        setCurrentStageMessage(detailMsg);
      });

      setCurrentInvestigation(investigation);
      // Refresh local history list
      setHistoryList(getHistory());
      setResultTab('evidence');
      setEvidenceFilter('all');
      setCurrentView('result');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error('Investigation error:', err);
      setInvestigationError(err.message || 'An error occurred while retrieving live search evidence. Please try again.');
      setCurrentView('home');
    }
  };

  const handleSelectExample = (exampleText: string) => {
    setClaimInput(exampleText);
  };

  const handleSelectHistoryItem = (inv: Investigation) => {
    setCurrentInvestigation(inv);
    setClaimInput(inv.originalClaim);
    setResultTab('evidence');
    setEvidenceFilter('all');
    setCurrentView('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearAllHistory = () => {
    clearHistory();
    setHistoryList([]);
  };

  const handleNewInvestigation = () => {
    setClaimInput('');
    setCurrentInvestigation(null);
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0E0F0B] text-[#D8DCD5] flex flex-col font-sans selection:bg-[#FE813C] selection:text-[#0E0F0B]">
      {/* Top Header */}
      <Header
        onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onNewInvestigation={handleNewInvestigation}
        historyCount={historyList.length}
        currentView={currentView}
      />

      {/* Main View Area */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-6 py-5 sm:py-8">
        {/* ========================================================================= */}
        {/* 1. HOME VIEW */}
        {/* ========================================================================= */}
        {currentView === 'home' && (
          <div className="w-full max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300">
            {/* Hero Section */}
            <div className="text-center pt-2 sm:pt-6 pb-1 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#1C1F17] border border-[#2B2F24] rounded-full text-[11px] font-mono text-[#A6AC9F] mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FE813C]"></span>
                <span>Evidence-Grounding & Multi-Source Triangulation</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-medium text-[#FFFFFF] tracking-tight leading-[1.15]">
                Don’t just read it.<br />
                <span className="italic text-[#FE813C]">Investigate it.</span>
              </h1>

              <p className="text-xs sm:text-sm text-[#D8DCD5] max-w-lg mx-auto leading-relaxed">
                TruthLens searches the live web and compares evidence to help you understand what a claim actually supports.
              </p>
            </div>

            {/* Error Notification Banner */}
            {investigationError && (
              <div className="w-full p-4 rounded-xl bg-[#261316] border border-[#BC656A]/60 text-xs font-mono text-[#E0A2A6] flex items-start justify-between gap-3 shadow-sm">
                <div className="flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-[#BC656A] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#FFFFFF] block mb-0.5 uppercase tracking-wider text-[11px]">
                      Live Search Notice
                    </span>
                    <p className="leading-relaxed">{investigationError}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setInvestigationError(null)}
                  className="text-[#BC656A] hover:text-[#FFFFFF] p-1 rounded transition-colors cursor-pointer"
                  aria-label="Dismiss notice"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Input Card */}
            <ClaimInput
              claim={claimInput}
              onChange={setClaimInput}
              onInvestigate={handleStartInvestigation}
              isLoading={false}
            />

            {/* Example Claims */}
            <ExampleClaims
              onSelectExample={handleSelectExample}
              currentClaim={claimInput}
            />

            {/* Editorial Features / Methodology Teaser */}
            <div className="pt-6 border-t border-[#262921] mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-lg bg-[#151712] border border-[#262921] shadow-sm">
                <div className="w-7 h-7 rounded bg-[#1C1F17] text-[#FE813C] flex items-center justify-center mb-2 border border-[#2B2F24]">
                  <Scale className="w-3.5 h-3.5 text-[#FE813C]" />
                </div>
                <h3 className="text-[11px] font-mono font-bold uppercase text-[#FFFFFF] tracking-wider mb-0.5">
                  Balanced Stance
                </h3>
                <p className="text-xs text-[#8A9084] leading-relaxed">
                  Evaluates supporting, conflicting, and contextual viewpoints without ideological bias.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-[#151712] border border-[#262921] shadow-sm">
                <div className="w-7 h-7 rounded bg-[#1C1F17] text-[#727E6E] flex items-center justify-center mb-2 border border-[#2B2F24]">
                  <GitBranch className="w-3.5 h-3.5 text-[#727E6E]" />
                </div>
                <h3 className="text-[11px] font-mono font-bold uppercase text-[#FFFFFF] tracking-wider mb-0.5">
                  Subclaim Decomposition
                </h3>
                <p className="text-xs text-[#8A9084] leading-relaxed">
                  Breaks sensational statements into specific, testable scientific and factual components.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-[#151712] border border-[#262921] shadow-sm">
                <div className="w-7 h-7 rounded bg-[#241315] text-[#BC656A] flex items-center justify-center mb-2 border border-[#BC656A]/40">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#BC656A]" />
                </div>
                <h3 className="text-[11px] font-mono font-bold uppercase text-[#FFFFFF] tracking-wider mb-0.5">
                  Adversarial Stress-Testing
                </h3>
                <p className="text-xs text-[#8A9084] leading-relaxed">
                  Actively searches for counter-evidence, confounding factors, and replication boundaries.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 2. INVESTIGATION IN PROGRESS VIEW */}
        {/* ========================================================================= */}
        {currentView === 'investigating' && (
          <InvestigationProgress
            claim={investigatingClaim}
            activeStageIndex={activeStageIndex}
            currentMessage={currentStageMessage}
          />
        )}

        {/* ========================================================================= */}
        {/* 3. INVESTIGATION RESULT VIEW */}
        {/* ========================================================================= */}
        {currentView === 'result' && currentInvestigation && (
          <div className="w-full space-y-6 animate-in fade-in duration-300">
            {/* Top Navigation Back Button */}
            <div className="flex items-center justify-between pb-1">
              <button
                id="back-to-home-btn"
                onClick={handleNewInvestigation}
                className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#8A9084] hover:text-[#FFFFFF] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Investigate another claim</span>
              </button>

              <span className="text-[10px] font-mono text-[#8A9084]">
                Audited {new Date(currentInvestigation.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>

            {/* Verdict Panel */}
            <VerdictCard investigation={currentInvestigation} />

            {/* Evidence Stance Distribution Summary */}
            <EvidenceSummary
              stats={currentInvestigation.statistics}
              selectedFilter={evidenceFilter}
              onSelectFilter={(filter) => {
                setEvidenceFilter(filter);
                setResultTab('evidence');
              }}
            />

            {/* What We Found: Deconstructed Subclaims */}
            <ClaimBreakdown
              subclaims={currentInvestigation.subclaims}
              sources={currentInvestigation.sources}
              onInspectSource={(srcId) => {
                setHighlightedSourceId(srcId);
                setResultTab('evidence');
                const el = document.getElementById(`evidence-card-${srcId}`);
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }}
            />

            {/* Evidence / Graph Toggle & Content */}
            <div className="space-y-3.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2 border-b border-[#262921]">
                <div>
                  <span className="text-[10px] font-mono font-semibold tracking-wider text-[#8A9084] uppercase">
                    Verification Records
                  </span>
                  <h2 className="text-base font-semibold text-[#FFFFFF]">
                    {resultTab === 'evidence' ? 'Retrieved Evidence Sources' : 'Evidence Relationship Topology'}
                  </h2>
                </div>

                {/* Evidence / Graph Toggle */}
                <div className="inline-flex items-center p-0.5 bg-[#151712] rounded-lg border border-[#262921]">
                  <button
                    id="toggle-view-evidence-btn"
                    onClick={() => setResultTab('evidence')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-medium transition-all cursor-pointer ${
                      resultTab === 'evidence'
                        ? 'bg-[#FE813C] text-[#0E0F0B] shadow-xs font-bold'
                        : 'text-[#8A9084] hover:text-[#FFFFFF]'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Evidence Cards</span>
                  </button>

                  <button
                    id="toggle-view-graph-btn"
                    onClick={() => setResultTab('graph')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-medium transition-all cursor-pointer ${
                      resultTab === 'graph'
                        ? 'bg-[#FE813C] text-[#0E0F0B] shadow-xs font-bold'
                        : 'text-[#8A9084] hover:text-[#FFFFFF]'
                    }`}
                  >
                    <GitBranch className="w-3.5 h-3.5" />
                    <span>Relationship Graph</span>
                  </button>
                </div>
              </div>

              {resultTab === 'evidence' ? (
                <EvidenceList
                  sources={currentInvestigation.sources}
                  highlightedSourceId={highlightedSourceId}
                  activeFilter={evidenceFilter}
                  onFilterChange={setEvidenceFilter}
                />
              ) : (
                <EvidenceGraph investigation={currentInvestigation} />
              )}
            </div>

            {/* Challenge The Verdict (Adversarial Second-Pass) */}
            <ChallengeVerdict
              investigation={currentInvestigation}
              onUpdateInvestigation={(updated) => {
                setCurrentInvestigation(updated);
              }}
            />

            {/* Transparency Section: How TruthLens Investigated */}
            <InvestigationTransparency
              stats={currentInvestigation.statistics}
              originalClaim={currentInvestigation.originalClaim}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[#262921] bg-[#11130E] py-4 px-4 text-center text-xs text-[#8A9084] font-mono">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5 text-[#FE813C]" />
            <span className="font-semibold text-[#FFFFFF] font-sans">TruthLens</span>
            <span>— AI Claim Investigation Engine</span>
          </div>

          <p className="text-[#555A4F] text-[10px]">
            Assessments are grounded in multi-source literature reviews. Not an infallible arbiter of absolute truth.
          </p>
        </div>
      </footer>

      {/* How It Works Modal */}
      <HowItWorksModal
        isOpen={isHowItWorksOpen}
        onClose={() => setIsHowItWorksOpen(false)}
      />

      {/* History Drawer */}
      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={historyList}
        onSelectInvestigation={handleSelectHistoryItem}
        onClearHistory={handleClearAllHistory}
      />
    </div>
  );
}
