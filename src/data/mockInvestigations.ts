import { Investigation } from '../types';

export const EXAMPLE_CLAIMS = [
  'Drinking coffee before exercise burns 30% more fat.',
  'AI will replace 50% of software developers by 2030.',
  'Drinking lemon water burns belly fat.',
  'Electric cars are worse for the environment than petrol cars.',
  'A new study proves that social media causes depression.',
];

export const MOCK_INVESTIGATIONS: Record<string, Investigation> = {
  'drinking-coffee-before-exercise-burns-30-more-fat': {
    id: 'inv-coffee-fat-oxidation',
    originalClaim: 'Drinking coffee before exercise burns 30% more fat.',
    verdict: 'MISLEADING',
    confidence: 84,
    summary:
      'The available evidence supports parts of the claim, but the specific numerical statement is not sufficiently supported by the sources reviewed.',
    reasoning:
      'Multiple peer-reviewed clinical trials indicate that caffeine ingestion 30 to 60 minutes before aerobic exercise can modestly increase rate of fat oxidation (typically within a 5% to 13% range depending on training status and time of day). However, no reputable systematic review supports a universal 30% increase, which misrepresents peak acute rate spikes observed in isolated sprint intervals as general fat loss.',
    createdAt: new Date().toISOString(),
    isLiveSearched: false,
    statistics: {
      claimsAnalyzed: 1,
      testableStatements: 3,
      searchQueriesCount: 5,
      searchQueries: [
        'caffeine fat oxidation rate exercise clinical trial',
        'does coffee burn 30 percent more fat workout',
        'pre-exercise caffeine lipid metabolism systematic review',
        'caffeine thermogenesis morning vs afternoon exercise',
        'coffee exercise fat loss study 30 percent debunked',
      ],
      resultsReviewed: 18,
      relevantSourcesCount: 11,
      supportingCount: 4,
      contradictingCount: 6,
      contextualCount: 3,
      unclearCount: 1,
      counterEvidenceSearched: true,
      counterEvidenceQueries: [
        'is 30 percent fat burn from coffee accurate',
        'caffeine aerobic workout metabolic rate limitations',
      ],
    },
    subclaims: [
      {
        id: 'sub-1',
        number: '01',
        statement: 'Coffee and caffeine can measurably affect acute fat oxidation.',
        status: 'SUPPORTED',
        explanation:
          'Biochemical consensus confirms caffeine stimulates sympathetic nervous activity and mobilizes free fatty acids during prolonged moderate exercise.',
        evidenceIds: ['src-b', 'src-a'],
      },
      {
        id: 'sub-2',
        number: '02',
        statement: 'Consuming coffee specifically prior to exercise increases fat burning.',
        status: 'MIXED EVIDENCE',
        explanation:
          'Observed benefits are real but highly conditional on caffeine timing, dosage (3mg/kg), fasted vs fed state, and individual caffeine tolerance levels.',
        evidenceIds: ['src-a', 'src-c'],
      },
      {
        id: 'sub-3',
        number: '03',
        statement: 'The increase in fat oxidation reaches approximately 30%.',
        status: 'NOT SUFFICIENTLY SUPPORTED',
        explanation:
          'The 30% figure conflates maximal transient diurnal variations (e.g. afternoon vs morning differences in unconditioned subjects) with standard exercise fat-burn efficiency.',
        evidenceIds: ['src-c', 'src-d'],
      },
    ],
    sources: [
      {
        id: 'src-a',
        publication: 'Reuters Health',
        publicationDate: 'October 14, 2023',
        headline: 'Meta-analysis assesses metabolic and endurance effects of caffeine timing in active cohorts',
        status: 'contextual',
        evidenceStrength: 'medium',
        relevance: 'high',
        summary:
          'Notes that while caffeine stimulates sympathetic nervous system activity and free fatty acid mobilization, the real-world impact on net caloric expenditure remains modest.',
        subclaimIds: ['sub-1', 'sub-2'],
        isDemo: true,
        domain: 'reuters.com',
        quoteExcerpt:
          '"Caffeine intake stimulates lipolysis, but clinical significance in long-term body composition change is constrained by dietary balance."',
      },
      {
        id: 'src-b',
        publication: 'Journal of the International Society of Sports Nutrition',
        publicationDate: 'January 2021',
        headline: 'Caffeine increases maximal fat oxidation rate during a graded exercise test in active men',
        status: 'supports',
        evidenceStrength: 'high',
        relevance: 'high',
        summary:
          'Demonstrated that 3 mg/kg caffeine 30 minutes before graded cycling increased maximal fat oxidation by 10.7% in the morning and up to 29% in afternoon sessions compared to placebo.',
        subclaimIds: ['sub-1'],
        isDemo: true,
        domain: 'jissn.biomedcentral.com',
        quoteExcerpt:
          '"Acute caffeine ingestion 30 min before performing an incremental cycling test increased whole-body fat oxidation rates during aerobic exercise."',
      },
      {
        id: 'src-c',
        publication: 'British Journal of Sports Medicine',
        publicationDate: 'March 2022',
        headline: 'Systematic review of ergogenic aids and lipid metabolism: Disentangling acute peaks from sustained fat loss',
        status: 'contradicts',
        evidenceStrength: 'high',
        relevance: 'high',
        summary:
          'Concludes that claiming a generalized "30% more fat burned" is scientifically inaccurate; average fat oxidation enhancement across varied populations is between 4% and 12%.',
        subclaimIds: ['sub-2', 'sub-3'],
        isDemo: true,
        domain: 'bjsm.bmj.com',
        quoteExcerpt:
          '"Extrapolating acute diurnal oxidation extremes to blanket claims of 30% increased body fat loss is misleading and clinically unsupported."',
      },
      {
        id: 'src-d',
        publication: 'Health & Fitness Journal',
        publicationDate: 'August 2023',
        headline: 'Fitness trends and nutritional myths: How metabolic studies get exaggerated online',
        status: 'unclear',
        evidenceStrength: 'low',
        relevance: 'medium',
        summary:
          'Highlights how fitness influencers frequently cite single afternoon trial data out of context, omitting placebo baselines and dietary controls.',
        subclaimIds: ['sub-3'],
        isDemo: true,
        domain: 'acsm.org',
        quoteExcerpt:
          '"Headlines claiming 30% boosted fat-burn omit critical context regarding subject conditioning and testing protocol limitations."',
      },
    ],
    challengeResult: {
      initialConfidence: 84,
      reEvaluatedConfidence: 78,
      initialVerdict: 'MISLEADING',
      finalVerdict: 'MISLEADING',
      challengedAt: new Date().toISOString(),
      counterEvidenceSummary:
        'A dedicated counter-evidence scan searched for studies demonstrating >25% whole-body fat oxidation in standard population cohorts. Only 1 specialized afternoon protocol under strict fasting replicated high oxidation peaks, leaving the general 30% claim misleading.',
      newSourcesDiscovered: 4,
      findings: [
        'Found 1 additional 2024 trial confirming 24-28% peak oxidation in well-trained elite cyclists during afternoon fasted state.',
        'Found 3 independent trials reporting negligible (<6%) differences in recreationally active women and regular coffee drinkers due to tolerance.',
        'Re-evaluation preserves MISLEADING verdict while refining confidence to 78% due to validated afternoon protocol exceptions.',
      ],
    },
  },
  'ai-will-replace-50-of-software-developers-by-2030': {
    id: 'inv-ai-developers-2030',
    originalClaim: 'AI will replace 50% of software developers by 2030.',
    verdict: 'MISLEADING',
    confidence: 82,
    summary:
      'Economic and technological consensus indicates AI will heavily automate repetitive coding tasks, but no empirical projections support a 50% net elimination of developer jobs by 2030.',
    reasoning:
      'Major labor market analyses (including Goldman Sachs, Brookings, and US Bureau of Labor Statistics) project that generative AI will augment software development productivity and reshape workflow requirements rather than cause half the global developer workforce to be eliminated. In fact, software engineering demand is projected to grow ~17-25% through 2032 due to increased software complexity.',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    isLiveSearched: false,
    statistics: {
      claimsAnalyzed: 1,
      testableStatements: 3,
      searchQueriesCount: 6,
      searchQueries: [
        'ai replace 50 percent software engineers 2030 forecast',
        'bls software developer employment projection 2024-2034',
        'goldman sachs generative ai impact on software labor',
        'acm ieee developer displacement generative ai studies',
      ],
      resultsReviewed: 22,
      relevantSourcesCount: 14,
      supportingCount: 2,
      contradictingCount: 8,
      contextualCount: 4,
      unclearCount: 0,
      counterEvidenceSearched: true,
      counterEvidenceQueries: [
        'software engineering job loss ai automation data',
        'tech layoffs attributed directly to llm coding tools',
      ],
    },
    subclaims: [
      {
        id: 'sub-dev-1',
        number: '01',
        statement: 'AI coding tools automate a substantial portion of routine programming tasks.',
        status: 'SUPPORTED',
        explanation: 'Studies by GitHub and Stanford demonstrate 20-55% faster task completion for standard boilerplate and test generation.',
        evidenceIds: ['src-dev-a', 'src-dev-b'],
      },
      {
        id: 'sub-dev-2',
        number: '02',
        statement: 'Net developer employment will contract by 50% within this decade.',
        status: 'CONTRADICTED',
        explanation: 'Economic models point to Jevons Paradox: cheaper software production leads to surging demand for complex software, maintaining net labor needs.',
        evidenceIds: ['src-dev-c', 'src-dev-d'],
      },
      {
        id: 'sub-dev-3',
        number: '03',
        statement: 'The 2030 timeline is an industry-validated milestone for half-workforce displacement.',
        status: 'NOT SUFFICIENTLY SUPPORTED',
        explanation: 'The "50% by 2030" phrase stems from speculative commentary rather than empirical economic research.',
        evidenceIds: ['src-dev-c'],
      },
    ],
    sources: [
      {
        id: 'src-dev-a',
        publication: 'MIT / Stanford Research Collaborative',
        publicationDate: 'February 2024',
        headline: 'Measuring the Productivity Impact of Generative AI Assistance on Software Engineering',
        status: 'supports',
        evidenceStrength: 'high',
        relevance: 'high',
        summary: 'Documented 30-40% throughput acceleration on standard programming challenges, shifting developer time toward architecture and validation.',
        subclaimIds: ['sub-dev-1'],
        isDemo: true,
        domain: 'nber.org',
      },
      {
        id: 'src-dev-b',
        publication: 'U.S. Bureau of Labor Statistics',
        publicationDate: 'September 2024',
        headline: 'Occupational Outlook Handbook: Software Developers, Quality Assurance Analysts, and Testers',
        status: 'contradicts',
        evidenceStrength: 'high',
        relevance: 'high',
        summary: 'Projects 17% employment growth from 2023 to 2033, substantially faster than average for all occupations.',
        subclaimIds: ['sub-dev-2'],
        isDemo: true,
        domain: 'bls.gov',
      },
      {
        id: 'src-dev-c',
        publication: 'Brookings Institution',
        publicationDate: 'May 2024',
        headline: 'How Generative AI Will Transform Knowledge Work Without Net Workforce Halving',
        status: 'contradicts',
        evidenceStrength: 'high',
        relevance: 'high',
        summary: 'Concludes that task displacement does not equal role elimination; engineering roles will evolve toward system design, security, and verification.',
        subclaimIds: ['sub-dev-2', 'sub-dev-3'],
        isDemo: true,
        domain: 'brookings.edu',
      },
      {
        id: 'src-dev-d',
        publication: 'Communications of the ACM',
        publicationDate: 'November 2023',
        headline: 'Will AI Replace Programmers? Revisiting the History of Automation in Computer Science',
        status: 'contextual',
        evidenceStrength: 'medium',
        relevance: 'high',
        summary: 'Historical parallels (compilers, 4GL, IDEs) show higher abstraction increases total software output rather than reducing engineer counts.',
        subclaimIds: ['sub-dev-2'],
        isDemo: true,
        domain: 'cacm.acm.org',
      },
    ],
    challengeResult: {
      initialConfidence: 82,
      reEvaluatedConfidence: 79,
      initialVerdict: 'MISLEADING',
      finalVerdict: 'MISLEADING',
      challengedAt: new Date().toISOString(),
      counterEvidenceSummary:
        'Scanned for corporate downsizing case studies specifically citing LLM replacement. While junior hiring has slowed, senior architectural demand is accelerating.',
      newSourcesDiscovered: 3,
      findings: [
        'Analyzed startup founder surveys indicating smaller initial engineering teams.',
        'BLS and Eurostat macro indicators maintain long-term tech headcount expansion projections.',
      ],
    },
  },
  'drinking-lemon-water-burns-belly-fat': {
    id: 'inv-lemon-water-fat',
    originalClaim: 'Drinking lemon water burns belly fat.',
    verdict: 'CONTRADICTED',
    confidence: 91,
    summary:
      'Scientific research directly contradicts the claim that lemon water possesses localized fat-burning properties or specifically targets abdominal adipose tissue.',
    reasoning:
      'No biological mechanism enables citrus acid, lemon bioflavonoids, or water infusions to selectively metabolize visceral or subcutaneous belly fat. While drinking water supports hydration and can promote satiety, lemons do not contain unique thermogenic compounds that accelerate spot fat reduction.',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    isLiveSearched: false,
    statistics: {
      claimsAnalyzed: 1,
      testableStatements: 3,
      searchQueriesCount: 4,
      searchQueries: [
        'lemon water belly fat burning clinical evidence',
        'spot fat reduction abdominal citrus acid trials',
        'hydration weight loss mechanism lemon juice',
      ],
      resultsReviewed: 16,
      relevantSourcesCount: 10,
      supportingCount: 0,
      contradictingCount: 8,
      contextualCount: 2,
      unclearCount: 0,
      counterEvidenceSearched: true,
    },
    subclaims: [
      {
        id: 'sub-lem-1',
        number: '01',
        statement: 'Lemon contains bioactive compounds that directly burn adipose tissue.',
        status: 'CONTRADICTED',
        explanation: 'Biochemical analysis shows vitamin C and citric acid have negligible direct lipolytic action at consumable dietary levels.',
        evidenceIds: ['src-lem-a', 'src-lem-b'],
      },
      {
        id: 'sub-lem-2',
        number: '02',
        statement: 'Fat loss can be selectively targeted to the abdominal region (spot reduction).',
        status: 'CONTRADICTED',
        explanation: 'Physiological consensus conclusively refutes targeted spot reduction through specific dietary liquids.',
        evidenceIds: ['src-lem-b'],
      },
      {
        id: 'sub-lem-3',
        number: '03',
        statement: 'Lemon water can indirectly assist weight management via hydration and satiety.',
        status: 'SUPPORTED',
        explanation: 'Replacing sugary drinks with low-calorie lemon water reduces caloric intake and promotes general hydration.',
        evidenceIds: ['src-lem-c'],
      },
    ],
    sources: [
      {
        id: 'src-lem-a',
        publication: 'American Journal of Clinical Nutrition',
        publicationDate: 'June 2022',
        headline: 'Dietary Acidity and Lipid Metabolism: Examining Popular Nutritional Hypotheses',
        status: 'contradicts',
        evidenceStrength: 'high',
        relevance: 'high',
        summary: 'Found no significant variance in fat oxidation or metabolic rate between plain water and citrus-infused water.',
        subclaimIds: ['sub-lem-1'],
        isDemo: true,
        domain: 'academic.oup.com',
      },
      {
        id: 'src-lem-b',
        publication: 'Mayo Clinic Proceedings',
        publicationDate: 'January 2023',
        headline: 'The Myth of Spot Reduction: Why Dietary Changes Cannot Direct Regional Adipose Loss',
        status: 'contradicts',
        evidenceStrength: 'high',
        relevance: 'high',
        summary: 'Explains systemic hormonal regulation of lipid mobilization, disproving that any beverage targets belly fat specifically.',
        subclaimIds: ['sub-lem-1', 'sub-lem-2'],
        isDemo: true,
        domain: 'mayoclinicproceedings.org',
      },
      {
        id: 'src-lem-c',
        publication: 'Harvard T.H. Chan School of Public Health',
        publicationDate: 'September 2023',
        headline: 'Hydration and Caloric Displacement: Practical Guidance on Water Consumption',
        status: 'contextual',
        evidenceStrength: 'medium',
        relevance: 'medium',
        summary: 'Points out that lemon water is a healthy substitute for high-calorie beverages, but possesses no magical fat-melting properties.',
        subclaimIds: ['sub-lem-3'],
        isDemo: true,
        domain: 'hsph.harvard.edu',
      },
    ],
  },
  'electric-cars-are-worse-for-the-environment-than-petrol-cars': {
    id: 'inv-ev-vs-ice',
    originalClaim: 'Electric cars are worse for the environment than petrol cars.',
    verdict: 'CONTRADICTED',
    confidence: 88,
    summary:
      'Comprehensive lifecycle assessments (LCAs) demonstrate that electric vehicles generate significantly lower lifetime greenhouse gas emissions than internal combustion engine vehicles, even on carbon-intensive electrical grids.',
    reasoning:
      'While battery manufacturing results in higher initial cradle-to-gate emissions, electric vehicles (EVs) break even within 1 to 2 years of typical driving. Over a full vehicle lifecycle (150,000–200,000 km), EVs emit 50% to 70% less CO2 equivalent in Europe and the US, with clean grid transitions widening the gap.',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    isLiveSearched: false,
    statistics: {
      claimsAnalyzed: 1,
      testableStatements: 3,
      searchQueriesCount: 5,
      searchQueries: [
        'lifecycle emissions electric vs internal combustion engine vehicle',
        'ev battery manufacturing carbon footprint break even miles',
        'iea lifecycle emissions comparison global transport',
      ],
      resultsReviewed: 25,
      relevantSourcesCount: 16,
      supportingCount: 1,
      contradictingCount: 11,
      contextualCount: 4,
      unclearCount: 0,
      counterEvidenceSearched: true,
    },
    subclaims: [
      {
        id: 'sub-ev-1',
        number: '01',
        statement: 'EV manufacturing generates higher upfront emissions due to battery production.',
        status: 'SUPPORTED',
        explanation: 'Lithium, nickel, and cobalt mineral processing requires substantial thermal and electrical energy during cell fabrication.',
        evidenceIds: ['src-ev-a', 'src-ev-b'],
      },
      {
        id: 'sub-ev-2',
        number: '02',
        statement: 'Lifetime emissions of electric vehicles exceed those of gasoline vehicles.',
        status: 'CONTRADICTED',
        explanation: 'Superior powertrain efficiency (90% vs 25-30%) offsets battery manufacturing emissions within 15,000 to 30,000 kilometers of driving.',
        evidenceIds: ['src-ev-b', 'src-ev-c'],
      },
      {
        id: 'sub-ev-3',
        number: '03',
        statement: 'Coal-heavy grids completely erase the environmental advantage of EVs.',
        status: 'NOT SUFFICIENTLY SUPPORTED',
        explanation: 'Even on grids dominated by coal and natural gas (e.g. Poland, India), modern EVs achieve lifecycle parity or 15-25% lower net emissions than equivalent petrol cars.',
        evidenceIds: ['src-ev-c'],
      },
    ],
    sources: [
      {
        id: 'src-ev-a',
        publication: 'International Council on Clean Transportation (ICCT)',
        publicationDate: 'July 2023',
        headline: 'A Comprehensive Global Lifecycle Assessment of Passenger Car Greenhouse Gas Emissions',
        status: 'contradicts',
        evidenceStrength: 'high',
        relevance: 'high',
        summary: 'Showed lifetime emissions of medium-size EVs in the US and Europe are 66–69% lower than comparable gasoline cars.',
        subclaimIds: ['sub-ev-2', 'sub-ev-3'],
        isDemo: true,
        domain: 'theicct.org',
      },
      {
        id: 'src-ev-b',
        publication: 'Nature Sustainability',
        publicationDate: 'April 2020',
        headline: 'Net emission reductions from electric cars and heat pumps in 59 world regions over time',
        status: 'contradicts',
        evidenceStrength: 'high',
        relevance: 'high',
        summary: 'Demonstrated that in 95% of global passenger road transport, electric cars already have lower lifetime emissions than petrol cars.',
        subclaimIds: ['sub-ev-2'],
        isDemo: true,
        domain: 'nature.com',
      },
      {
        id: 'src-ev-c',
        publication: 'International Energy Agency (IEA)',
        publicationDate: 'May 2024',
        headline: 'Global EV Outlook: Lifecycle Analysis and Critical Minerals Review',
        status: 'contextual',
        evidenceStrength: 'high',
        relevance: 'high',
        summary: 'Details mineral supply chain environmental impacts while confirming clear net climate benefits across typical vehicle operational spans.',
        subclaimIds: ['sub-ev-1', 'sub-ev-3'],
        isDemo: true,
        domain: 'iea.org',
      },
    ],
  },
  'a-new-study-proves-that-social-media-causes-depression': {
    id: 'inv-social-media-depression',
    originalClaim: 'A new study proves that social media causes depression.',
    verdict: 'MISLEADING',
    confidence: 79,
    summary:
      'Scientific literature demonstrates correlation between heavy social media use and depressive symptoms, but broad claims of definitive causation remain oversimplified and contested across psychological research.',
    reasoning:
      'Longitudinal and experimental studies show bidirectional and heterogeneous relationships: adolescents with existing emotional distress tend to spend more time on social media, while passive scrolling can exacerbate social comparison and sleep disruption. Calling it a simple "proven cause" misrepresents nuanced clinical consensus.',
    createdAt: new Date(Date.now() - 3600000 * 72).toISOString(),
    isLiveSearched: false,
    statistics: {
      claimsAnalyzed: 1,
      testableStatements: 3,
      searchQueriesCount: 5,
      searchQueries: [
        'social media causes depression causation vs correlation meta-analysis',
        'adolescent mental health screen time longitudinal studies',
        'us surgeon general advisory social media youth mental health',
      ],
      resultsReviewed: 21,
      relevantSourcesCount: 13,
      supportingCount: 3,
      contradictingCount: 4,
      contextualCount: 5,
      unclearCount: 1,
      counterEvidenceSearched: true,
    },
    subclaims: [
      {
        id: 'sub-soc-1',
        number: '01',
        statement: 'There is a statistically significant association between social media usage and depressive symptoms.',
        status: 'SUPPORTED',
        explanation: 'Numerous cross-sectional and cohort studies confirm positive correlations, particularly among teenage girls.',
        evidenceIds: ['src-soc-a', 'src-soc-b'],
      },
      {
        id: 'sub-soc-2',
        number: '02',
        statement: 'Research has definitively established direct universal causation.',
        status: 'NOT SUFFICIENTLY SUPPORTED',
        explanation: 'Causal direction is bidirectional; sleep deprivation, offline peer dynamics, and pre-existing vulnerability are major confounding variables.',
        evidenceIds: ['src-soc-b', 'src-soc-c'],
      },
      {
        id: 'sub-soc-3',
        number: '03',
        statement: 'A single new study settled the scientific debate.',
        status: 'CONTRADICTED',
        explanation: 'Psychiatric consensus relies on aggregate systematic reviews rather than isolated individual publications.',
        evidenceIds: ['src-soc-c'],
      },
    ],
    sources: [
      {
        id: 'src-soc-a',
        publication: 'U.S. Surgeon General Advisory',
        publicationDate: 'May 2023',
        headline: 'Social Media and Youth Mental Health: The U.S. Surgeon General’s Advisory',
        status: 'contextual',
        evidenceStrength: 'high',
        relevance: 'high',
        summary: 'Warns of potential harm to youth mental wellbeing while calling for more rigorous research into causal mechanisms.',
        subclaimIds: ['sub-soc-1'],
        isDemo: true,
        domain: 'hhs.gov',
      },
      {
        id: 'src-soc-b',
        publication: 'JAMA Psychiatry',
        publicationDate: 'September 2022',
        headline: 'Associations Between Screen Time, Social Media Behaviors, and Depressive Symptoms in Adolescents',
        status: 'supports',
        evidenceStrength: 'high',
        relevance: 'high',
        summary: 'Found that >3 hours daily social media use was associated with higher risk of internalizing problems, mediated by sleep loss.',
        subclaimIds: ['sub-soc-1', 'sub-soc-2'],
        isDemo: true,
        domain: 'jamanetwork.com',
      },
      {
        id: 'src-soc-c',
        publication: 'Nature Human Behaviour',
        publicationDate: 'January 2021',
        headline: 'The association between adolescent well-being and digital technology use is small and non-causal',
        status: 'contradicts',
        evidenceStrength: 'high',
        relevance: 'high',
        summary: 'Large-scale specification curve analysis found digital technology use explains less than 0.5% of variance in adolescent well-being.',
        subclaimIds: ['sub-soc-2', 'sub-soc-3'],
        isDemo: true,
        domain: 'nature.com',
      },
    ],
  },
};

export function normalizeClaimKey(claim: string): string {
  return claim
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export function findMockInvestigation(claim: string): Investigation | null {
  const normKey = normalizeClaimKey(claim);
  
  // Direct match
  if (MOCK_INVESTIGATIONS[normKey]) {
    return MOCK_INVESTIGATIONS[normKey];
  }

  // Substring match
  for (const key of Object.keys(MOCK_INVESTIGATIONS)) {
    if (normKey.includes(key) || key.includes(normKey)) {
      return MOCK_INVESTIGATIONS[key];
    }
  }

  // Keyword heuristic match
  if (normKey.includes('coffee') || normKey.includes('fat') || normKey.includes('30')) {
    return MOCK_INVESTIGATIONS['drinking-coffee-before-exercise-burns-30-more-fat'];
  }
  if (normKey.includes('developer') || normKey.includes('replace') || normKey.includes('software')) {
    return MOCK_INVESTIGATIONS['ai-will-replace-50-of-software-developers-by-2030'];
  }
  if (normKey.includes('lemon') || normKey.includes('belly')) {
    return MOCK_INVESTIGATIONS['drinking-lemon-water-burns-belly-fat'];
  }
  if (normKey.includes('electric') || normKey.includes('petrol') || normKey.includes('car')) {
    return MOCK_INVESTIGATIONS['electric-cars-are-worse-for-the-environment-than-petrol-cars'];
  }
  if (normKey.includes('social') || normKey.includes('depression') || normKey.includes('mental')) {
    return MOCK_INVESTIGATIONS['a-new-study-proves-that-social-media-causes-depression'];
  }

  return null;
}
