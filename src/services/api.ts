import { Investigation, ChallengeResult } from '../types';

const HISTORY_STORAGE_KEY = 'truthlens_investigations_history_v2';

export async function fetchInvestigation(
  claim: string,
  onStageUpdate?: (stageIndex: number, detailMessage: string) => void
): Promise<Investigation> {
  const trimmed = claim.trim();
  if (!trimmed) {
    throw new Error('Please enter a claim to investigate.');
  }

  const stages = [
    { index: 0, msg: 'Decomposing claim into testable subclaims & entities...' },
    { index: 1, msg: 'Generating targeted Google Search & News queries...' },
    { index: 2, msg: 'Querying SerpApi (Google Search & Google News live indexes)...' },
    { index: 3, msg: 'Extracting live source records, links, and snippets...' },
    { index: 4, msg: 'Analyzing retrieved empirical evidence & counter-evidence...' },
    { index: 5, msg: 'Synthesizing evidence-grounded assessment...' },
  ];

  let currentStage = 0;
  if (onStageUpdate) onStageUpdate(0, stages[0].msg);

  const interval = setInterval(() => {
    if (currentStage < stages.length - 1) {
      currentStage += 1;
      if (onStageUpdate) onStageUpdate(stages[currentStage].index, stages[currentStage].msg);
    }
  }, 1200);

  try {
    let response: Response | null = null;
    let lastNetworkError: unknown = null;

    // Render can briefly close an in-flight connection during a deployment/restart.
    // Retry network-level failures so the user does not get a false "Failed to fetch" error.
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        response = await fetch('/api/investigate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ claim: trimmed }),
        });
        break;
      } catch (error) {
        lastNetworkError = error;
        if (attempt < 2) {
          if (onStageUpdate) onStageUpdate(2, 'Reconnecting to the live investigation server...');
          await new Promise((resolve) => setTimeout(resolve, 1800 * (attempt + 1)));
        }
      }
    }

    if (!response) {
      throw lastNetworkError instanceof Error
        ? lastNetworkError
        : new Error('The live investigation server could not be reached.');
    }

    clearInterval(interval);

    if (!response.ok) {
      const errData = await response.json().catch(() => ({ error: 'Investigation request failed' }));
      throw new Error(errData.error || `Server error (${response.status}): Failed to retrieve live search evidence.`);
    }

    const data: Investigation = await response.json();

    if (onStageUpdate) onStageUpdate(5, 'Synthesizing evidence-grounded assessment...');

    saveToHistory(data);
    return data;
  } catch (error: any) {
    clearInterval(interval);
    console.error('Real investigation request failed:', error);
    throw new Error(error.message || 'TruthLens could not retrieve live web evidence. Please check your connection and try again.');
  }
}

export async function challengeVerdict(
  investigationId: string,
  claim: string,
  onStepUpdate?: (stepIndex: number, stepName: string) => void
): Promise<ChallengeResult> {
  const steps = [
    'Formulating adversarial counter-evidence search queries...',
    'Dispatching queries to SerpApi Google Search...',
    'Extracting conflicting trial results & alternative variables...',
    'Re-evaluating assessment confidence with Gemini...',
  ];

  let currentStep = 0;
  if (onStepUpdate) onStepUpdate(0, steps[0]);

  const interval = setInterval(() => {
    if (currentStep < steps.length - 1) {
      currentStep += 1;
      if (onStepUpdate) onStepUpdate(currentStep, steps[currentStep]);
    }
  }, 1400);

  try {
    const response = await fetch('/api/challenge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ investigationId, claim }),
    });

    clearInterval(interval);

    if (!response.ok) {
      const err = await response.json().catch(() => ({ error: 'Adversarial challenge failed' }));
      throw new Error(err.error || 'Server error during counter-evidence search.');
    }

    const result: ChallengeResult = await response.json();
    return result;
  } catch (err: any) {
    clearInterval(interval);
    console.error('Counter-evidence search error:', err);
    throw new Error(err.message || 'Adversarial counter-evidence review failed.');
  }
}

export function getHistory(): Investigation[] {
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load history from localStorage:', e);
    return [];
  }
}

export function saveToHistory(investigation: Investigation): void {
  try {
    const existing = getHistory();
    const filtered = existing.filter(
      (item) => item.originalClaim.toLowerCase().trim() !== investigation.originalClaim.toLowerCase().trim()
    );
    const updated = [investigation, ...filtered].slice(0, 25);
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save investigation to localStorage:', e);
  }
}

export function clearHistory(): void {
  try {
    localStorage.removeItem(HISTORY_STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear history:', e);
  }
}
