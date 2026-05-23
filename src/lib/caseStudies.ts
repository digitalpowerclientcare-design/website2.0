export type VerticalId = "automotive" | "it" | "healthcare";
export type EngagementType = "consultation" | "forge";

export type CaseStudyImprovement = {
  label: string;
  value: string;
};

export type CaseStudy = {
  id: string;
  vertical: VerticalId;
  engagement: EngagementType;
  title: string;
  subtitle: string;
  clientDescriptor: string;
  heroImage: string;
  bannerImage: string;
  description: string;
  before: {
    headline: string;
    summary: string;
    bullets: string[];
    image: string;
  };
  after: {
    headline: string;
    summary: string;
    bullets: string[];
    image: string;
  };
  improvements: CaseStudyImprovement[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
    award?: string;
  };
};

export const VERTICALS = [
  {
    id: "automotive" as const,
    label: "Automotive",
    tagline: "Manufacturing, supply chain, and dealer operations",
  },
  {
    id: "it" as const,
    label: "IT & Software",
    tagline: "SDLC, platform engineering, and enterprise delivery",
  },
  {
    id: "healthcare" as const,
    label: "Healthcare",
    tagline: "Clinical operations, patient experience, and compliance",
  },
] as const;

export const ENGAGEMENT_TYPES = [
  {
    id: "consultation" as const,
    label: "Consultation",
    description: "Diagnostic-led transformation with owned outcomes",
  },
  {
    id: "forge" as const,
    label: "FORGE AI Project",
    description: "Agentic SDLC acceleration with verification layers",
  },
] as const;

export const CASE_STUDIES: CaseStudy[] = [
  // ── Automotive · Consultation ──
  {
    id: "auto-consultation",
    vertical: "automotive",
    engagement: "consultation",
    title: "Tier-1 Supplier Network Optimization",
    subtitle: "North American automotive supplier · 4,200 employees",
    clientDescriptor: "Global tier-1 automotive components manufacturer",
    heroImage:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1400",
    bannerImage:
      "https://images.unsplash.com/photo-1565043589221-1a6fd000f4d8?auto=format&fit=crop&q=80&w=1600",
    description:
      "O3Xs ran a full operational diagnostic across procurement, plant scheduling, and dealer-facing fulfillment — then implemented AI-assisted workflow orchestration with a 12-month operate retainer tied to verified margin recovery.",
    before: {
      headline: "Fragmented planning across 14 plants",
      summary:
        "Demand signals lived in spreadsheets. Production planners reconciled manually. Expedite costs were rising quarter over quarter with no single owner for leakage.",
      bullets: [
        "18-day average planning cycle with 23% rework on schedule changes",
        "No unified view of supplier risk or alternate sourcing paths",
        "Executive reporting lagged operations by 3–4 weeks",
      ],
      image:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=900",
    },
    after: {
      headline: "Unified intelligence layer with accountable operators",
      summary:
        "We deployed a governed planning cockpit, automated exception routing, and weekly operate reviews with CFO-signed impact tracking.",
      bullets: [
        "Planning cycle compressed to 6 days with exception-only human touch",
        "Supplier risk scored in real time against production commitments",
        "Leadership dashboard refreshed daily with audit-ready lineage",
      ],
      image:
        "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=900",
    },
    improvements: [
      { label: "Planning cycle time", value: "−67%" },
      { label: "Expedite spend", value: "−41%" },
      { label: "Schedule rework", value: "−58%" },
      { label: "Reporting latency", value: "−85%" },
    ],
    testimonial: {
      quote:
        "For the first time we had a partner who stayed past the deck. The operate model is what turned diagnostic insight into margin we could defend in a board review.",
      author: "Chief Operations Officer",
      role: "Tier-1 Automotive Supplier",
      award: "2025 Supply Chain Innovation — finalist",
    },
  },
  // ── Automotive · FORGE ──
  {
    id: "auto-forge",
    vertical: "automotive",
    engagement: "forge",
    title: "Embedded Software Delivery for ADAS Modules",
    subtitle: "OEM engineering center · safety-critical firmware",
    clientDescriptor: "European OEM advanced driver-assistance systems team",
    heroImage:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1400",
    bannerImage:
      "https://images.unsplash.com/photo-1619642751034-765df69d01e9?auto=format&fit=crop&q=80&w=1600",
    description:
      "FORGE AI was integrated into the client's existing GitLab and requirements toolchain to accelerate feature delivery for sensor-fusion modules while preserving ISO 26262 traceability.",
    before: {
      headline: "Manual code review bottlenecks on every release train",
      summary:
        "Senior engineers spent 30+ hours per sprint on review and rework. Context switching between legacy modules and new sensor APIs slowed every milestone.",
      bullets: [
        "Average feature lead time: 11 weeks from spec to merge-ready",
        "Review queue backlog peaked at 140+ open items per release",
        "Inconsistent test coverage on generated integration glue code",
      ],
      image:
        "https://images.unsplash.com/photo-1486262715619-67b85e101451?auto=format&fit=crop&q=80&w=900",
    },
    after: {
      headline: "Verified generation with senior-engineer-grade review agents",
      summary:
        "FORGE's validation and Agent F review layers cut rework cycles while maintaining full audit trails for compliance sign-off.",
      bullets: [
        "Feature lead time reduced to 6.5 weeks with fewer review cycles",
        "Automated EDIT_TARGETS validation caught 94% of hallucination risk pre-merge",
        "SOC2-aligned decision logs exported for every generation pass",
      ],
      image:
        "https://images.unsplash.com/photo-1615906655593-ad0385a7c0da?auto=format&fit=crop&q=80&w=900",
    },
    improvements: [
      { label: "Design-to-merge cycle", value: "−41%" },
      { label: "Review hours / sprint", value: "−52%" },
      { label: "Defect escape rate", value: "−36%" },
      { label: "Audit prep time", value: "−70%" },
    ],
    testimonial: {
      quote:
        "FORGE didn't replace our engineers — it gave them a verified first draft and a review trail our compliance team actually trusts.",
      author: "VP, Embedded Systems",
      role: "Global Automotive OEM",
      award: "Engineering Excellence Award — internal 2025",
    },
  },
  // ── IT · Consultation ──
  {
    id: "it-consultation",
    vertical: "it",
    engagement: "consultation",
    title: "Enterprise SDLC Transformation Program",
    subtitle: "Fortune 500 financial services · 12,000+ engineers",
    clientDescriptor: "Global financial services technology division",
    heroImage:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1400",
    bannerImage:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1600",
    description:
      "A 9-month engagement spanning diagnostic, toolchain rationalization, and AI-assisted delivery governance — with success fees tied to cycle-time reduction verified by the CIO office.",
    before: {
      headline: "Tool sprawl without delivery accountability",
      summary:
        "Copilot licenses scaled faster than governance. Teams shipped features, but release predictability and quality gates eroded across business units.",
      bullets: [
        "47 distinct AI-adjacent tools with overlapping spend",
        "Release slip rate above 34% on priority programs",
        "No shared definition of 'production-ready' across squads",
      ],
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=900",
    },
    after: {
      headline: "O3Xs operating model with measurable SLAs",
      summary:
        "We consolidated to a governed stack, embedded playbooks per squad archetype, and ran monthly operate reviews with engineering leadership.",
      bullets: [
        "Tool footprint reduced to 9 approved platforms with clear owners",
        "Release slip rate on priority programs fell below 12%",
        "Unified quality gate adopted across 8 business-unit portfolios",
      ],
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=900",
    },
    improvements: [
      { label: "Cycle time (priority programs)", value: "−60%" },
      { label: "AI tool spend waste", value: "−38%" },
      { label: "Release slip rate", value: "−65%" },
      { label: "Escalations to leadership", value: "−44%" },
    ],
    testimonial: {
      quote:
        "O3Xs was the only firm willing to tie fees to cycle time we could measure in our own Jira — not a vanity metric in a slide.",
      author: "Chief Information Officer",
      role: "Global Financial Services",
      award: "CIO 100 Technology Leadership — honoree",
    },
  },
  // ── IT · FORGE ──
  {
    id: "it-forge",
    vertical: "it",
    engagement: "forge",
    title: "Platform Team Acceleration with FORGE AI",
    subtitle: "High-growth SaaS · microservices estate",
    clientDescriptor: "Series C B2B SaaS platform engineering organization",
    heroImage:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1400",
    bannerImage:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1600",
    description:
      "FORGE AI was deployed against a 240-service monorepo to accelerate API scaffolding, integration tests, and cross-service refactors with codebase-aware context.",
    before: {
      headline: "Velocity plateau despite AI copilot adoption",
      summary:
        "Developers used autocomplete everywhere but still lost days to context gathering, inconsistent patterns, and review fatigue on boilerplate PRs.",
      bullets: [
        "Median PR cycle: 4.2 days with 2.1 review rounds on platform work",
        "Onboarding time for new hires: 6–8 weeks to first production merge",
        "Repeated architectural drift across service boundaries",
      ],
      image:
        "https://images.unsplash.com/photo-1461740680684-dccba630e2f6?auto=format&fit=crop&q=80&w=900",
    },
    after: {
      headline: "Codebase-native generation with verification gates",
      summary:
        "FORGE's intake, analysis, and validation pipeline produced merge-ready candidates aligned to existing patterns — senior review focused on architecture, not syntax.",
      bullets: [
        "Median PR cycle on platform work dropped to 2.4 days",
        "New hire time-to-first merge reduced to 3.5 weeks",
        "Architectural guardrails enforced via EDIT_TARGETS on every pass",
      ],
      image:
        "https://images.unsplash.com/photo-1555066931-bf19f8d8e48f?auto=format&fit=crop&q=80&w=900",
    },
    improvements: [
      { label: "PR cycle time", value: "−43%" },
      { label: "Review rounds / PR", value: "−35%" },
      { label: "Onboarding to first merge", value: "−56%" },
      { label: "Boilerplate authoring hours", value: "−62%" },
    ],
    testimonial: {
      quote:
        "We stopped debating whether AI could write code. FORGE made the question irrelevant — it writes in our patterns and proves it before review.",
      author: "Head of Platform Engineering",
      role: "B2B SaaS · Series C",
      award: "DevOps Excellence — platform team 2025",
    },
  },
  // ── Healthcare · Consultation ──
  {
    id: "healthcare-consultation",
    vertical: "healthcare",
    engagement: "consultation",
    title: "Patient Access & Revenue Cycle Optimization",
    subtitle: "Regional health system · 28 facilities",
    clientDescriptor: "Multi-state integrated delivery network",
    heroImage:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1400",
    bannerImage:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1600",
    description:
      "O3Xs mapped patient access leakage, prior-authorization bottlenecks, and call-center load — then implemented HIPAA-aligned automation with a 14-month operate program and CFO-verified cost outcomes.",
    before: {
      headline: "Rising denial rates and overloaded access teams",
      summary:
        "Staff toggled between six systems per patient touch. Authorization rework consumed clinical time. Patient satisfaction scores lagged peer benchmarks.",
      bullets: [
        "Prior-auth turnaround averaged 4.8 business days",
        "Call abandonment rate above 22% during peak hours",
        "Denial-related rework cost estimated at $14M annually",
      ],
      image:
        "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=900",
    },
    after: {
      headline: "Orchestrated access workflows with clinical guardrails",
      summary:
        "We deployed context-aware routing, authorization pre-checks, and operate dashboards reviewed weekly with patient experience leadership.",
      bullets: [
        "Prior-auth turnaround reduced to 1.9 business days",
        "Abandonment rate fell below 9% with smarter queue prioritization",
        "Denial rework cost trajectory down $6.2M annualized",
      ],
      image:
        "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=900",
    },
    improvements: [
      { label: "Prior-auth turnaround", value: "−60%" },
      { label: "Call abandonment", value: "−59%" },
      { label: "Denial rework cost", value: "−44%" },
      { label: "Patient satisfaction (access)", value: "+18 pts" },
    ],
    testimonial: {
      quote:
        "They understood that HIPAA wasn't a footnote — it was the architecture. The operate cadence is why we're still compounding gains a year later.",
      author: "Chief Patient Experience Officer",
      role: "Regional Health System",
      award: "Becker's Patient Experience — top program",
    },
  },
  // ── Healthcare · FORGE ──
  {
    id: "healthcare-forge",
    vertical: "healthcare",
    engagement: "forge",
    title: "Clinical Integration Layer Modernization",
    subtitle: "Digital health platform · FHIR-native stack",
    clientDescriptor: "Healthcare technology provider · clinical data platform",
    heroImage:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1400",
    bannerImage:
      "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=1600",
    description:
      "FORGE AI accelerated FHIR adapter development and integration test generation across a regulated codebase — with full audit trails for BAA-covered environments.",
    before: {
      headline: "Integration backlog blocking new health system launches",
      summary:
        "Each new EHR connection required bespoke adapter code. Test coverage for edge-case clinical codes was inconsistent. Releases slipped quarterly.",
      bullets: [
        "Average adapter delivery: 9 weeks per connection profile",
        "Integration test gaps caused 31% of post-release hotfixes",
        "Compliance documentation assembled manually per release",
      ],
      image:
        "https://images.unsplash.com/photo-1559757142-5eb350b92a9a?auto=format&fit=crop&q=80&w=900",
    },
    after: {
      headline: "Verified adapters with compliance-ready artifacts",
      summary:
        "FORGE generated adapter scaffolds from existing patterns, produced targeted integration tests, and exported decision logs for security review.",
      bullets: [
        "Adapter delivery compressed to 4.5 weeks per profile",
        "Post-release hotfixes from integration gaps down 67%",
        "Compliance packet generation automated per release train",
      ],
      image:
        "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=900",
    },
    improvements: [
      { label: "Adapter delivery time", value: "−50%" },
      { label: "Integration hotfixes", value: "−67%" },
      { label: "Test authoring hours", value: "−55%" },
      { label: "Compliance doc prep", value: "−72%" },
    ],
    testimonial: {
      quote:
        "In healthcare you don't get a second chance on audit trails. FORGE gave us generation speed without trading away the evidence chain.",
      author: "VP, Engineering",
      role: "Healthcare Technology Platform",
      award: "HIMSS Innovation — shortlisted 2025",
    },
  },
];

export function getCaseStudy(
  vertical: VerticalId,
  engagement: EngagementType,
): CaseStudy | undefined {
  return CASE_STUDIES.find(
    (c) => c.vertical === vertical && c.engagement === engagement,
  );
}

export const DEFAULT_VERTICAL: VerticalId = "automotive";
export const DEFAULT_ENGAGEMENT: EngagementType = "consultation";
