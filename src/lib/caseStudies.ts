export type VerticalId =
  | "automotive"
  | "software"
  | "healthcare"
  | "finance"
  | "infrastructure"
  | "hospitality";

export type EngagementType = "consultation" | "forge";

export type ForgeUseCaseId = "custom-software" | "crm" | "erp";

export type CaseStudyImprovement = {
  label: string;
  value: string;
};

export type ClientProfile = {
  region: string;
  location: string;
  size: string;
  segment: string;
  profile: string;
};

export type CaseStudy = {
  id: string;
  engagement: EngagementType;
  /** Industry vertical — consultation engagements only */
  vertical?: VerticalId;
  /** Product type — FORGE AI engagements only */
  forgeUseCase?: ForgeUseCaseId;
  title: string;
  subtitle: string;
  clientDescriptor: string;
  client: ClientProfile;
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
    id: "software" as const,
    label: "Software & SDLC",
    tagline: "Product engineering, IT services, and platform delivery",
  },
  {
    id: "finance" as const,
    label: "Financial Services",
    tagline: "Banking, fintech, risk, and regulated operations",
  },
  {
    id: "healthcare" as const,
    label: "Healthcare",
    tagline: "Clinical operations, patient access, and compliance",
  },
  {
    id: "automotive" as const,
    label: "Automotive",
    tagline: "Manufacturing, supply chain, and dealer operations",
  },
  {
    id: "infrastructure" as const,
    label: "Infrastructure",
    tagline: "Capital projects, assets, and field operations",
  },
  {
    id: "hospitality" as const,
    label: "Hospitality",
    tagline: "Guest experience, revenue, and property operations",
  },
] as const;

export const FORGE_USE_CASES = [
  {
    id: "custom-software" as const,
    label: "Custom Software Development",
    tagline: "Product platforms, SaaS, and bespoke application delivery",
  },
  {
    id: "crm" as const,
    label: "CRM",
    tagline: "Customer relationship platforms and sales workflow systems",
  },
  {
    id: "erp" as const,
    label: "ERP",
    tagline: "Enterprise resource planning and legacy module modernization",
  },
] as const;

export const ENGAGEMENT_TYPES = [
  {
    id: "consultation" as const,
    label: "Consultation",
    description: "O³ diagnostic-led transformation with owned outcomes",
  },
  {
    id: "forge" as const,
    label: "FORGE AI · SDLC",
    description: "Agentic software delivery with verification layers",
  },
] as const;

export const VERTICAL_IDS = VERTICALS.map((v) => v.id);

export function isVerticalId(value: string): value is VerticalId {
  return VERTICAL_IDS.includes(value as VerticalId);
}

export const FORGE_USE_CASE_IDS = FORGE_USE_CASES.map((u) => u.id);

export function isForgeUseCaseId(value: string): value is ForgeUseCaseId {
  return FORGE_USE_CASE_IDS.includes(value as ForgeUseCaseId);
}

export const CASE_STUDIES: CaseStudy[] = [
  // ── Software · Consultation (real engagement — India IT services) ──
  {
    id: "software-consultation",
    vertical: "software",
    engagement: "consultation",
    title: "From Reactive Delivery to Engineered Performance",
    subtitle: "IT services & SaaS/ERP · ~900 employees · Bangalore, India",
    clientDescriptor: "Enterprise IT services firm · SaaS & ERP delivery",
    client: {
      region: "India",
      location: "Bangalore, India",
      size: "~900 employees",
      segment: "IT Services · SaaS/ERP",
      profile:
        "A mid-market IT services company serving global enterprise clients across SaaS and ERP implementations. Leadership faced rising delivery costs, sprint spillovers, and heavy manual coordination between PMO, engineering, and QA — despite mature tooling and prior AI pilots.",
    },
    heroImage:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=85&w=1400",
    bannerImage:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=85&w=1600",
    description:
      "O3Xs embedded AI-assisted task routing, automated SLA tracking, and orchestration across existing PM tools — without replacing systems. A 60-day Optimize → Orchestrate → Operate engagement with success metrics tied to delivery cycle time and cost per project.",
    before: {
      headline: "AI pilots existed. Performance improvement did not.",
      summary:
        "Strong technical teams and mature tools, but structural execution leakage drove rising costs, sprint spillovers, and leadership dependent on status calls for visibility.",
      bullets: [
        "Frequent sprint spillovers and delayed delivery cycles",
        "Heavy manual coordination between PMO, Dev, and QA",
        "Duplicate review loops with no exception-based escalation",
      ],
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=85&w=900",
    },
    after: {
      headline: "Exception-driven oversight with embedded intelligence",
      summary:
        "Orchestration layer integrated with existing stack. Leadership moved from reactive tracking to proactive performance governance.",
      bullets: [
        "Automated effort reporting and spillover analytics live in PM tools",
        "Decision modeling removed duplicate review loops",
        "Operate cadence with SLA tracking and exception-only escalation",
      ],
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=85&w=900",
    },
    improvements: [
      { label: "Delivery cycle time", value: "−34%" },
      { label: "Manual reporting effort", value: "−47%" },
      { label: "Sprint spillover", value: "−35%" },
      { label: "Verified ROI", value: "5×" },
    ],
    testimonial: {
      quote:
        "We didn't need another dashboard. We needed someone to stay inside the delivery model and own the outcome. That's what changed.",
      author: "Head of Delivery",
      role: "Enterprise IT Services · India",
    },
  },
  // ── FORGE · Custom Software Development (US — marketing automation platform) ──
  {
    id: "forge-custom-software",
    forgeUseCase: "custom-software",
    engagement: "forge",
    title: "Custom Software Development · Release Velocity",
    subtitle: "US product engineering · ~250 employees · Marketing automation platform",
    clientDescriptor: "Custom software · B2B marketing automation · United States",
    client: {
      region: "United States",
      location: "Austin, TX · United States",
      size: "~250 employees",
      segment: "Custom Software · B2B SaaS",
      profile:
        "A US-based product engineering company building a marketing automation platform for mid-market brands. Strong engineering talent and global clients, but release timelines slipped 20–30%, rework increased, and leadership lacked real-time visibility into delivery capacity despite on-time sprint closures.",
    },
    heroImage:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=85&w=1400",
    bannerImage:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=85&w=1600",
    description:
      "FORGE AI connected to the client's Jira, Git, and CI/CD stack — accelerating feature delivery for campaign orchestration, audience segmentation, and analytics modules with codebase-native generation and pre-merge verification.",
    before: {
      headline: "Agile on paper. Velocity did not equal throughput.",
      summary:
        "Teams closed sprints on time while releases slipped. Client escalations rose as rework consumed capacity and requirement clarity varied sprint to sprint.",
      bullets: [
        "Release timelines slipping 20–30% quarter over quarter",
        "Requirement rework increasing despite AI copilot adoption",
        "No unified view of real delivery capacity for leadership",
      ],
      image:
        "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=85&w=900",
    },
    after: {
      headline: "Predictable releases with verified first drafts",
      summary:
        "FORGE orchestrated requirement clarity scoring, dependency mapping, and risk-of-spillover indicators — without disrupting Jira, Git, or CI/CD.",
      bullets: [
        "Real-time workload heatmaps for engineering leadership",
        "Automated spillover risk surfaced before sprint commitment",
        "Verified code generation aligned to existing platform patterns",
      ],
      image:
        "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&q=85&w=900",
    },
    improvements: [
      { label: "Release cycle time", value: "−29%" },
      { label: "Requirement rework", value: "−32%" },
      { label: "Client escalations", value: "−25%" },
      { label: "Gross margin / project", value: "+24%" },
    ],
    testimonial: {
      quote:
        "FORGE didn't ask us to change our stack. It learned our platform, wrote in our patterns, and gave us a review trail before anything hit production.",
      author: "VP, Engineering",
      role: "Custom Software · US",
    },
  },
  // ── Finance · Consultation ──
  {
    id: "finance-consultation",
    vertical: "finance",
    engagement: "consultation",
    title: "Enterprise Operations & Delivery Governance",
    subtitle: "US financial services · 12,000+ employees · Global HQ",
    clientDescriptor: "Fortune 500 financial services technology division",
    client: {
      region: "United States",
      location: "Charlotte, NC · United States",
      size: "12,000+ technology employees",
      segment: "Financial Services · Enterprise Technology",
      profile:
        "The technology division of a Fortune 500 US bank running hundreds of parallel programs across retail, commercial, and markets technology. Copilot and AI tool adoption outpaced governance, creating tool sprawl, unpredictable releases, and no shared definition of production-ready across squads.",
    },
    heroImage:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=85&w=1400",
    bannerImage:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=85&w=1600",
    description:
      "Nine-month O3Xs engagement: diagnostic, toolchain rationalization, and AI-assisted delivery governance — with success fees tied to cycle-time reduction verified by the CIO office.",
    before: {
      headline: "Tool sprawl without delivery accountability",
      summary:
        "47 distinct AI-adjacent tools with overlapping spend. Release slip rate above 34% on priority programs with no portfolio-wide quality gate.",
      bullets: [
        "AI licenses scaled faster than governance frameworks",
        "No shared production-ready standard across business units",
        "Escalations to leadership rising on priority programs",
      ],
      image:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=85&w=900",
    },
    after: {
      headline: "Governed stack with measurable SLAs",
      summary:
        "Consolidated to nine approved platforms, embedded squad playbooks, and monthly operate reviews with engineering leadership and the CIO office.",
      bullets: [
        "Unified quality gate across eight business-unit portfolios",
        "Release slip rate on priority programs below 12%",
        "Success fees tied to Jira-verified cycle-time metrics",
      ],
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=85&w=900",
    },
    improvements: [
      { label: "Cycle time (priority programs)", value: "−60%" },
      { label: "AI tool spend waste", value: "−38%" },
      { label: "Release slip rate", value: "−65%" },
      { label: "Leadership escalations", value: "−44%" },
    ],
    testimonial: {
      quote:
        "O3Xs was the only firm willing to tie fees to cycle time we could measure in our own Jira — not a vanity metric in a slide.",
      author: "Chief Information Officer",
      role: "US Financial Services · Fortune 500",
      award: "CIO 100 Technology Leadership — honoree",
    },
  },
  // ── FORGE · CRM ──
  {
    id: "forge-crm",
    forgeUseCase: "crm",
    engagement: "forge",
    title: "CRM · Compliance-Ready Feature Delivery",
    subtitle: "US enterprise CRM platform · ~400 employees",
    clientDescriptor: "Enterprise CRM platform · United States",
    client: {
      region: "United States",
      location: "New York, NY · United States",
      size: "~400 employees",
      segment: "Enterprise CRM · Regulated Industry",
      profile:
        "A US technology company operating an enterprise CRM used by advisor and sales networks nationwide. Regulatory change velocity and client onboarding complexity made every release high-stakes — with manual review bottlenecks on KYC workflows, advisor dashboards, and compliance reporting modules.",
    },
    heroImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=85&w=1400",
    bannerImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=85&w=1600",
    description:
      "FORGE AI integrated with Azure DevOps, GitHub, and the client's existing CRM monorepo — accelerating compliant feature delivery for advisor workflows, client onboarding, and reporting with full audit trails.",
    before: {
      headline: "Every CRM release carried regulatory weight",
      summary:
        "Senior engineers spent days on compliance-sensitive review. KYC and advisor workflow changes required multi-team sign-off, slowing every release train.",
      bullets: [
        "Median PR cycle: 5.1 days on CRM core modules",
        "Manual compliance documentation per release train",
        "Inconsistent test coverage on onboarding workflow changes",
      ],
      image:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=85&w=900",
    },
    after: {
      headline: "Verified CRM modules with audit-ready artifacts",
      summary:
        "FORGE generated compliant-first drafts, targeted integration tests, and exported decision logs for security and compliance review on every pass.",
      bullets: [
        "Plan validation blocked unsafe schema migrations pre-merge",
        "Advisor workflow features shipped with automated compliance packets",
        "Azure DevOps pipeline integration with canary deployment gates",
      ],
      image:
        "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=85&w=900",
    },
    improvements: [
      { label: "PR cycle time (CRM core)", value: "−41%" },
      { label: "Compliance doc prep", value: "−68%" },
      { label: "Review rounds / release", value: "−38%" },
      { label: "Post-release hotfixes", value: "−52%" },
    ],
    testimonial: {
      quote:
        "In wealth management CRM, you cannot ship fast without shipping safe. FORGE gave us both — generation speed with evidence our compliance team accepts.",
      author: "Head of Platform Engineering",
      role: "Enterprise CRM · US",
    },
  },
  // ── FORGE · ERP ──
  {
    id: "forge-erp",
    forgeUseCase: "erp",
    engagement: "forge",
    title: "ERP · Legacy Module Modernization",
    subtitle: "US enterprise ERP vendor · ~600 employees",
    clientDescriptor: "Enterprise ERP platform · United States",
    client: {
      region: "United States",
      location: "Houston, TX · United States",
      size: "~600 employees",
      segment: "Enterprise ERP · Multi-Industry",
      profile:
        "A US company delivering an ERP platform for firms managing capital projects, procurement, and job costing. Legacy modules built over a decade slowed every feature release — with complex job-costing rules, multi-entity accounting, and field-to-ERP sync requirements.",
    },
    heroImage:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=85&w=1400",
    bannerImage:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=85&w=1600",
    description:
      "FORGE AI connected to Azure, Jira, and the client's legacy ERP monorepo — accelerating capital projects, procurement, and job-costing module delivery with migration safety gates and codebase-native patterns.",
    before: {
      headline: "Legacy ERP modules slowed every release",
      summary:
        "Job-costing and procurement modules carried years of business rules. New features required deep tribal knowledge and multi-week regression cycles.",
      bullets: [
        "Capital projects features averaged 10-week lead time",
        "Legacy stored procedures blocked safe schema migrations",
        "Regression cycles consumed 45% of sprint capacity",
      ],
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=85&w=900",
    },
    after: {
      headline: "Modernized delivery without breaking legacy rules",
      summary:
        "FORGE learned existing ERP patterns, enforced migration safety gates, and produced verified modules with integration tests aligned to job-costing logic.",
      bullets: [
        "Feature lead time on capital projects modules down to 5.5 weeks",
        "Migration safety layer blocked destructive schema changes",
        "Azure DevOps pipelines updated automatically per feature",
      ],
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=85&w=900",
    },
    improvements: [
      { label: "ERP module lead time", value: "−45%" },
      { label: "Regression cycle hours", value: "−52%" },
      { label: "Migration incidents", value: "−100%" },
      { label: "Sprint capacity recovered", value: "+38%" },
    ],
    testimonial: {
      quote:
        "Legacy ERP is where most AI tools fail. FORGE mapped our business rules first — then wrote code our team would actually merge.",
      author: "Director of Engineering",
      role: "Enterprise ERP · US",
    },
  },
  // ── Healthcare · Consultation ──
  {
    id: "healthcare-consultation",
    vertical: "healthcare",
    engagement: "consultation",
    title: "Patient Access & Revenue Cycle Optimization",
    subtitle: "US regional health system · 28 facilities",
    clientDescriptor: "Multi-state integrated delivery network · United States",
    client: {
      region: "United States",
      location: "Southeast US · 28 facilities",
      size: "~18,000 employees",
      segment: "Healthcare · Integrated Delivery Network",
      profile:
        "A multi-state US health system operating hospitals, ambulatory sites, and revenue cycle operations across the Southeast. Prior-authorization bottlenecks, call-center overload, and denial rework consumed clinical time while patient satisfaction lagged peer benchmarks.",
    },
    heroImage:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=85&w=1400",
    bannerImage:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=85&w=1600",
    description:
      "O3Xs mapped patient access leakage and authorization bottlenecks, then implemented HIPAA-aligned automation with a 14-month operate program and CFO-verified cost outcomes.",
    before: {
      headline: "Rising denials and overloaded access teams",
      summary:
        "Staff toggled between six systems per patient touch. Authorization rework consumed clinical time and call abandonment exceeded 22% at peak.",
      bullets: [
        "Prior-auth turnaround averaged 4.8 business days",
        "Denial-related rework estimated at $14M annually",
        "No single owner for access-to-cash leakage",
      ],
      image:
        "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=85&w=900",
    },
    after: {
      headline: "Orchestrated access with clinical guardrails",
      summary:
        "Context-aware routing, authorization pre-checks, and weekly operate dashboards reviewed with patient experience leadership.",
      bullets: [
        "Prior-auth turnaround reduced to 1.9 business days",
        "Abandonment rate below 9% with smarter queue prioritization",
        "Denial rework cost trajectory down $6.2M annualized",
      ],
      image:
        "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=85&w=900",
    },
    improvements: [
      { label: "Prior-auth turnaround", value: "−60%" },
      { label: "Call abandonment", value: "−59%" },
      { label: "Denial rework cost", value: "−44%" },
      { label: "Patient satisfaction (access)", value: "+18 pts" },
    ],
    testimonial: {
      quote:
        "They understood HIPAA wasn't a footnote — it was the architecture. The operate cadence is why we're still compounding gains a year later.",
      author: "Chief Patient Experience Officer",
      role: "Regional Health System · US",
      award: "Becker's Patient Experience — top program",
    },
  },
  // ── Automotive · Consultation ──
  {
    id: "automotive-consultation",
    vertical: "automotive",
    engagement: "consultation",
    title: "Tier-1 Supplier Network Optimization",
    subtitle: "North American automotive supplier · 4,200 employees",
    clientDescriptor: "Global tier-1 automotive components manufacturer",
    client: {
      region: "United States",
      location: "Detroit, MI · North America operations",
      size: "~4,200 employees (NA)",
      segment: "Automotive · Tier-1 Supplier",
      profile:
        "A global tier-1 automotive components manufacturer with fourteen North American plants. Demand signals lived in spreadsheets, expedite costs rose quarter over quarter, and executive reporting lagged operations by weeks with no unified supplier risk view.",
    },
    heroImage:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=85&w=1400",
    bannerImage:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=85&w=1600",
    description:
      "Full operational diagnostic across procurement, plant scheduling, and dealer-facing fulfillment — then AI-assisted workflow orchestration with a 12-month operate retainer tied to verified margin recovery.",
    before: {
      headline: "Fragmented planning across 14 plants",
      summary:
        "Production planners reconciled manually. Expedite costs rising with no single owner for leakage across the supplier network.",
      bullets: [
        "18-day average planning cycle with 23% rework on schedule changes",
        "No unified view of supplier risk or alternate sourcing paths",
        "Executive reporting lagged operations by 3–4 weeks",
      ],
      image:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=85&w=900",
    },
    after: {
      headline: "Unified intelligence with accountable operators",
      summary:
        "Governed planning cockpit, automated exception routing, and weekly operate reviews with CFO-signed impact tracking.",
      bullets: [
        "Planning cycle compressed to 6 days with exception-only human touch",
        "Supplier risk scored in real time against production commitments",
        "Leadership dashboard refreshed daily with audit-ready lineage",
      ],
      image:
        "https://images.unsplash.com/photo-1567789884557-4b88940c8dbb?auto=format&fit=crop&q=85&w=900",
    },
    improvements: [
      { label: "Planning cycle time", value: "−67%" },
      { label: "Expedite spend", value: "−41%" },
      { label: "Schedule rework", value: "−58%" },
      { label: "Reporting latency", value: "−85%" },
    ],
    testimonial: {
      quote:
        "For the first time we had a partner who stayed past the deck. The operate model turned diagnostic insight into margin we could defend in a board review.",
      author: "Chief Operations Officer",
      role: "Tier-1 Automotive Supplier · US",
    },
  },
  // ── Infrastructure · Consultation ──
  {
    id: "infrastructure-consultation",
    vertical: "infrastructure",
    engagement: "consultation",
    title: "Predictive Maintenance & Asset Intelligence",
    subtitle: "US infrastructure operator · multi-state assets",
    clientDescriptor: "Capital projects & asset management · United States",
    client: {
      region: "United States",
      location: "Denver, CO · United States",
      size: "~1,200 employees",
      segment: "Infrastructure · Asset Operations",
      profile:
        "A US infrastructure operator managing capital projects and field assets across multiple states. Maintenance workflows were spreadsheet-driven, unplanned downtime eroded margins, and field-to-office reporting created a 2–3 week lag in executive visibility.",
    },
    heroImage:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=85&w=1400",
    bannerImage:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=85&w=1600",
    description:
      "Operational diagnostic across asset lifecycle workflows, AI-assisted exception routing, and governed performance dashboards with operate retainer tied to downtime reduction.",
    before: {
      headline: "Reactive maintenance with invisible leakage",
      summary:
        "Work orders reconciled manually across regions. No predictive layer connected field telemetry to maintenance scheduling.",
      bullets: [
        "Unplanned downtime driving 28% above industry benchmark",
        "Field reporting lagged executive dashboards by 2–3 weeks",
        "Duplicate inspection loops across asset categories",
      ],
      image:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=85&w=900",
    },
    after: {
      headline: "Exception-driven asset operations",
      summary:
        "Orchestrated maintenance workflows with AI-assisted anomaly routing and daily leadership dashboards with verified KPI lineage.",
      bullets: [
        "Predictive work order routing reduced reactive dispatch 40%",
        "Executive asset dashboard refreshed daily from field systems",
        "Operate reviews tied to downtime and cost-per-asset metrics",
      ],
      image:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=85&w=900",
    },
    improvements: [
      { label: "Unplanned downtime", value: "−28%" },
      { label: "Reporting latency", value: "−74%" },
      { label: "Reactive dispatch", value: "−40%" },
      { label: "Cost per asset serviced", value: "−19%" },
    ],
    testimonial: {
      quote:
        "They quantified leakage in dollars before touching a single tool. That discipline is why the operate phase actually stuck.",
      author: "VP, Asset Operations",
      role: "US Infrastructure Operator",
    },
  },
  // ── Hospitality · Consultation ──
  {
    id: "hospitality-consultation",
    vertical: "hospitality",
    engagement: "consultation",
    title: "Revenue & Guest Operations Optimization",
    subtitle: "US hotel group · 85 properties",
    clientDescriptor: "Multi-property hospitality group · United States",
    client: {
      region: "United States",
      location: "Nashville, TN · United States",
      size: "~3,500 employees · 85 properties",
      segment: "Hospitality · Hotel Group",
      profile:
        "A US hotel group operating full-service and select-service properties nationwide. Revenue management, guest services, and back-office coordination relied on manual handoffs — driving margin pressure from rising labor costs and inconsistent occupancy yield across regions.",
    },
    heroImage:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&q=85&w=1400",
    bannerImage:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=85&w=1600",
    description:
      "O3Xs mapped revenue and guest-operations leakage, then deployed AI-led orchestration across booking, guest services, and back-office workflows — outcome-linked to occupancy and satisfaction KPIs.",
    before: {
      headline: "Manual coordination eroded yield and guest experience",
      summary:
        "Property managers reconciled revenue and guest issues across disconnected systems. Cost-to-serve rose while NPS varied widely by region.",
      bullets: [
        "Guest issue resolution averaged 4.2 hours across properties",
        "Revenue management overrides lacked audit trail",
        "Back-office handoffs duplicated 30% of guest communication",
      ],
      image:
        "https://images.unsplash.com/photo-1520250497590-8c8d0f9a81e3?auto=format&fit=crop&q=85&w=900",
    },
    after: {
      headline: "Orchestrated guest operations with regional visibility",
      summary:
        "AI-assisted routing for guest issues, automated revenue exception alerts, and operate dashboards reviewed weekly with property leadership.",
      bullets: [
        "Guest issue resolution down to 1.8 hours average",
        "Cost-to-serve reduced 22% with smarter routing",
        "Regional NPS variance narrowed by 14 points",
      ],
      image:
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&q=85&w=900",
    },
    improvements: [
      { label: "Cost-to-serve", value: "−22%" },
      { label: "Guest issue resolution", value: "−57%" },
      { label: "Revenue override errors", value: "−41%" },
      { label: "Regional NPS variance", value: "−14 pts" },
    ],
    testimonial: {
      quote:
        "We needed outcomes tied to occupancy and guest scores — not another PMS integration project. O3Xs operated until the numbers moved.",
      author: "Chief Operating Officer",
      role: "US Hotel Group",
    },
  },
];

export const CONSULTATION_CASE_STUDIES = CASE_STUDIES.filter(
  (c) => c.engagement === "consultation",
);

export const FORGE_CASE_STUDIES = CASE_STUDIES.filter(
  (c) => c.engagement === "forge",
);

export function getConsultationCaseStudy(
  vertical: VerticalId,
): CaseStudy | undefined {
  return CONSULTATION_CASE_STUDIES.find((c) => c.vertical === vertical);
}

export function getForgeCaseStudy(
  useCase: ForgeUseCaseId,
): CaseStudy | undefined {
  return FORGE_CASE_STUDIES.find((c) => c.forgeUseCase === useCase);
}

/** @deprecated Use getConsultationCaseStudy or getForgeCaseStudy */
export function getCaseStudy(
  vertical: VerticalId,
  engagement: EngagementType,
): CaseStudy | undefined {
  if (engagement === "forge") return undefined;
  return getConsultationCaseStudy(vertical);
}

export const DEFAULT_VERTICAL: VerticalId = "software";
export const DEFAULT_FORGE_USE_CASE: ForgeUseCaseId = "custom-software";
export const DEFAULT_ENGAGEMENT: EngagementType = "consultation";
