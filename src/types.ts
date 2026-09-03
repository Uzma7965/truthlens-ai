export type Verdict =
  | 'SUPPORTED'
  | 'MISLEADING'
  | 'CONTRADICTED'
  | 'INSUFFICIENT EVIDENCE'
  | 'OUTDATED';

export type EvidenceStatus = 'supports' | 'contradicts' | 'contextual' | 'unclear';

export type EvidenceStrength = 'high' | 'medium' | 'low';

export type Relevance = 'high' | 'medium' | 'low';

export type SubclaimStatus =
  | 'SUPPORTED'
  | 'MIXED EVIDENCE'
  | 'CONTRADICTED'
  | 'NOT SUFFICIENTLY SUPPORTED'
  | 'CONTEXTUAL';

export interface EvidenceSource {
  id: string;
  publication: string;
  publicationDate: string;
  headline: string;
  status: EvidenceStatus;
  evidenceStrength: EvidenceStrength;
  relevance: Relevance;
  summary: string;
  url?: string;
  subclaimIds: string[];
  isDemo?: boolean;
  domain?: string;
  quoteExcerpt?: string;
}

export interface Subclaim {
  id: string;
  number: string;
  statement: string;
  status: SubclaimStatus;
  explanation: string;
  evidenceIds: string[];
}

export interface InvestigationStats {
  claimsAnalyzed: number;
  testableStatements: number;
  searchQueriesCount: number;
  searchQueries: string[];
  resultsReviewed: number;
  uniqueSourcesCount?: number;
  relevantSourcesCount: number;
  supportingCount: number;
  contradictingCount: number;
  contextualCount: number;
  unclearCount: number;
  searchEngines?: string;
  counterEvidenceSearched: boolean;
  counterEvidenceQueries?: string[];
}

export interface ChallengeResult {
  initialConfidence: number;
  reEvaluatedConfidence: number;
  initialVerdict: Verdict;
  finalVerdict: Verdict;
  challengedAt: string;
  counterEvidenceSummary: string;
  newSourcesDiscovered: number;
  findings: string[];
}

export interface Investigation {
  id: string;
  originalClaim: string;
  subclaims: Subclaim[];
  searchQueries?: string[];
  sources: EvidenceSource[];
  statistics: InvestigationStats;
  verdict: Verdict;
  confidence: number;
  summary: string;
  reasoning: string;
  challengeResult?: ChallengeResult;
  createdAt: string;
  isLiveSearched?: boolean;
  attribution?: string;
}

export interface InvestigationStep {
  id: string;
  title: string;
  description: string;
  status: 'waiting' | 'active' | 'completed';
  detailMessage?: string;
}
