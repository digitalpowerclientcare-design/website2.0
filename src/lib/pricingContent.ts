export type ForgePlanId = "starter" | "growth" | "scale";

export type PricingTabId = "consultation" | "forge";

export type BillingPeriod = "monthly" | "yearly";

export type PlanBilling = {
  priceDisplay: string;
  priceNote: string;
  costPerDecision: string;
  /** Shown on yearly toggle only */
  monthlyEquivalent?: string;
  yearlySavings?: string;
};

export type ForgePricingPlan = {
  id: ForgePlanId;
  name: string;
  tagline: string;
  decisionsPerMonth: number;
  decisionsLabel: string;
  monthly: PlanBilling;
  yearly: PlanBilling;
  ctaLabel: string;
  ctaHref: string;
  highlighted?: boolean;
  features: string[];
};

export const FORGE_TRIAL = {
  durationDays: 3,
  freeDecisions: 5,
  headline: "3-day free trial · 5 decisions included",
  body: "Try Forge on your real repository — no credit card required for the trial window. Use all 5 decisions across the full verification pipeline before you choose a plan.",
  ctaLabel: "Start free trial",
  ctaHref: "/contact?interest=forge-trial",
} as const;

export const BILLING_OPTIONS: { id: BillingPeriod; label: string; badge?: string }[] = [
  { id: "monthly", label: "Monthly" },
  { id: "yearly", label: "Yearly", badge: "2 months free" },
];

export const DECISION_EXPLAINER = {
  title: "What is a decision?",
  body: "A decision is one Forge request — it may complete in a single pass or run through a full verification cycle (intake, plan validation, generation, review, and merge-ready output). Either way, it counts as one decision — not a raw token count.",
};

export const FORGE_VALUE_PROPOSITION = {
  headline: "Every feature costs less to ship.",
  body: "As you move up plans, your effective cost per decision drops — so the price of delivering one verified feature keeps falling. Forge turns AI into predictable unit economics: better development output without runaway token bills.",
  subline: "Higher volume. Lower cost per decision. Stronger delivery economics.",
} as const;

export const CONSULTATION_PRICING = {
  title: "Consultation",
  subtitle: "Business Process Automation · O³ Framework",
  headline: "Scoped to your operation. Priced to your outcomes.",
  body: "Consultation is not a fixed SaaS subscription. Every engagement starts with a diagnostic, then moves to implementation and operate phases — with commercial terms tied to verified business impact.",
  includes: [
    "60-minute Performance Diagnostic (written report included)",
    "O³ roadmap: Optimize → Orchestrate → Operate",
    "Implementation plan integrated with your existing stack",
    "Operate retainer with KPI monitoring and iteration",
    "Optional success fees tied to measurable outcomes",
  ],
  note: "Pricing depends on scope, industry, and engagement depth. We quote after the diagnostic — whether or not you proceed with us.",
  ctaLabel: "Enquire about Consultation",
  ctaHref: "/contact?interest=consultation",
} as const;

export const FORGE_PRICING_PLANS: ForgePricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "For focused product teams",
    decisionsPerMonth: 100,
    decisionsLabel: "decisions / month",
    monthly: {
      priceDisplay: "$1,500",
      priceNote: "per month",
      costPerDecision: "$15",
    },
    yearly: {
      priceDisplay: "$15,000",
      priceNote: "per year · billed annually",
      costPerDecision: "$12.50",
      monthlyEquivalent: "$1,250/mo equivalent",
      yearlySavings: "Save $3,000 vs monthly",
    },
    ctaLabel: "Get Starter",
    ctaHref: "/contact?interest=forge-starter",
    features: [
      "100 decisions per month",
      "1 connected repository",
      "Up to 5 engineer seats",
      "Additional seats: $8/seat/mo",
      "All 6 verification agents",
      "GitHub or GitLab integration",
      "Standard audit trail export",
      "Email support",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "For scaling engineering orgs",
    decisionsPerMonth: 250,
    decisionsLabel: "decisions / month",
    monthly: {
      priceDisplay: "$3,000",
      priceNote: "per month",
      costPerDecision: "$12",
    },
    yearly: {
      priceDisplay: "$30,000",
      priceNote: "per year · billed annually",
      costPerDecision: "$10",
      monthlyEquivalent: "$2,500/mo equivalent",
      yearlySavings: "Save $6,000 vs monthly",
    },
    ctaLabel: "Get Growth",
    ctaHref: "/contact?interest=forge-growth",
    highlighted: true,
    features: [
      "250 decisions per month",
      "Up to 3 connected repositories",
      "Up to 15 engineer seats",
      "Additional seats: $5/seat/mo",
      "Azure DevOps & Jira integration",
      "UI preview approval workflow",
      "SOC2-ready compliance packets",
      "Priority support",
    ],
  },
  {
    id: "scale",
    name: "Scale",
    tagline: "For high-velocity delivery",
    decisionsPerMonth: 500,
    decisionsLabel: "decisions / month",
    monthly: {
      priceDisplay: "$5,000",
      priceNote: "per month",
      costPerDecision: "$10",
    },
    yearly: {
      priceDisplay: "$50,000",
      priceNote: "per year · billed annually",
      costPerDecision: "$8.33",
      monthlyEquivalent: "$4,167/mo equivalent",
      yearlySavings: "Save $10,000 vs monthly",
    },
    ctaLabel: "Get Scale",
    ctaHref: "/contact?interest=forge-scale",
    features: [
      "500 decisions per month",
      "Up to 10 connected repositories",
      "Up to 50 engineer seats",
      "Additional seats: $2/seat/mo",
      "Full integration suite",
      "Dedicated onboarding",
      "SOC2-ready compliance packets",
      "Priority support",
    ],
  },
];

export function getComparisonRows(period: BillingPeriod) {
  const plans = FORGE_PRICING_PLANS;
  const col = (id: ForgePlanId) => plans.find((p) => p.id === id)!;
  const b = (id: ForgePlanId) => col(id)[period];

  return [
    {
      label: "Decisions / month",
      starter: String(col("starter").decisionsPerMonth),
      growth: String(col("growth").decisionsPerMonth),
      scale: String(col("scale").decisionsPerMonth),
    },
    {
      label: period === "monthly" ? "Monthly price" : "Yearly price",
      starter: b("starter").priceDisplay,
      growth: b("growth").priceDisplay,
      scale: b("scale").priceDisplay,
    },
    {
      label: "Cost per decision",
      starter: b("starter").costPerDecision,
      growth: b("growth").costPerDecision,
      scale: b("scale").costPerDecision,
    },
    {
      label: "Repositories",
      starter: "1",
      growth: "3",
      scale: "10",
    },
    {
      label: "Engineer seats included",
      starter: "5",
      growth: "15",
      scale: "50",
    },
    {
      label: "Additional seat / mo",
      starter: "$8",
      growth: "$5",
      scale: "$2",
    },
    {
      label: "Verification agents",
      starter: "6",
      growth: "6",
      scale: "6",
    },
    {
      label: "SOC2 audit trail",
      starter: "Standard",
      growth: "Full",
      scale: "Full",
    },
    {
      label: "Support",
      starter: "Email",
      growth: "Priority",
      scale: "Priority",
    },
  ];
}

export const CONSULTATION_PRICING_FAQ = [
  {
    question: "How is Consultation priced?",
    answer:
      "Consultation is engagement-based — not a fixed SaaS fee. Every program starts with a Performance Diagnostic, then moves to implementation and operate phases. We quote after understanding your scope, industry, and desired outcomes.",
  },
  {
    question: "Is Consultation available as a subscription?",
    answer:
      "No. Pricing aligns to diagnostic, implementation, and operate retainers — with optional success fees tied to verified business impact. You pay for accountable delivery, not seat licenses.",
  },
  {
    question: "What does the diagnostic include?",
    answer:
      "A 60-minute deep-dive session and a written Performance Diagnostic Report: quantified leakage, ROI-ranked improvements, and an implementation roadmap integrated with your existing systems.",
  },
  {
    question: "Can we start with the diagnostic only?",
    answer:
      "Yes. The diagnostic is valuable on its own — you keep the report whether or not you proceed. Many engagements begin there before scoping orchestrate and operate phases.",
  },
  {
    question: "How are success fees structured?",
    answer:
      "Where appropriate, we tie a portion of fees to metrics leadership can audit — cycle time, cost recovered, throughput, or margin protected — verified against your baseline from the diagnostic.",
  },
  {
    question: "Which industries do you serve?",
    answer:
      "Healthcare, financial services, software, automotive, infrastructure, hospitality, and other operations-heavy enterprises — the O³ framework adapts to your domain, regulations, and KPIs.",
  },
] as const;

export const FORGE_PRICING_FAQ = [
  {
    question: "How does the 3-day trial work?",
    answer:
      "Sign up for a free trial and get 5 decisions over 3 days — full access to the verification pipeline on your repository. No charge during the trial. When you're ready, pick a monthly or yearly plan.",
  },
  {
    question: "What counts as one decision?",
    answer:
      "One decision equals one Forge request. That request may finish in a single pass or run the full cycle — from structured intake through agent verification to a merge-ready artifact. Either outcome counts as one decision until the request completes or is cancelled.",
  },
  {
    question: "Why does cost per feature drop on higher plans?",
    answer:
      "Each tier includes more decisions at a better rate per decision. Yearly billing adds another discount — two months free versus paying monthly. At Scale on yearly, effective cost per decision is lowest.",
  },
  {
    question: "What happens if we exceed our decision limit?",
    answer:
      "We notify admins at 80% and 100% usage. You can add decision packs mid-cycle or move to the next tier. Contact us for burst arrangements on annual contracts.",
  },
  {
    question: "How much do additional engineer seats cost?",
    answer:
      "Starter: $8 per seat/month. Growth: $5 per seat/month. Scale: $2 per seat/month beyond the 50 seats included. Contact us for annual seat bundles on enterprise contracts.",
  },
  {
    question: "Is Forge AI in private Beta?",
    answer:
      "Yes. Published tiers reflect planned GA pricing. Trial and Beta customers receive onboarding support and introductory rates for the first contract term.",
  },
] as const;
