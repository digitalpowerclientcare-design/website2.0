export type PublicationSection = {
  heading?: string;
  body: string;
};

export type Publication = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readMinutes: number;
  publishedAt: string;
  author: string;
  coverImage: string;
  coverImageAlt: string;
  /** Shown in confirmation — what we email after access */
  reportTitle: string;
  sections: PublicationSection[];
};

export const PUBLICATIONS_INTRO = {
  eyebrow: "Publications",
  title: "Research & insights for enterprise leaders.",
  description:
    "Articles and reports from the O3Xs team on AI delivery, business process automation, and governed scale. Select a publication to preview — request access for the full article and we’ll deliver the report to your inbox.",
} as const;

export const PUBLICATION_ACCESS_COPY = {
  modalTitle: "Access the full article",
  modalSubtitle:
    "Enter your details to continue reading. We’ll deliver the complete report to your inbox.",
  submitLabel: "Send full report",
  successTitle: "Your report is on the way",
  successBody: (reportTitle: string, email: string) =>
    `We’ve sent “${reportTitle}” to ${email}. Please check your inbox — and your spam folder — within the next few minutes.`,
  successFootnote:
    "If you don’t see it shortly, contact us at contact@o3xs.com and we’ll resend it.",
  successCta: "Back to publications",
  privacyNote:
    "We use your details only to deliver this publication and relevant O3Xs research. No spam.",
} as const;

export const PUBLICATION_CATEGORIES = [
  "All",
  "AI Delivery",
  "Operations",
  "Governance",
] as const;

export type PublicationCategory = (typeof PUBLICATION_CATEGORIES)[number];

export const PUBLICATIONS: Publication[] = [
  {
    id: "agentic-ai-enterprise-readiness",
    title: "Is Your Enterprise Ready for Agentic AI?",
    excerpt:
      "A practical readiness lens for CIOs and engineering leaders — where agentic workflows create ROI versus where they amplify risk without an operating model.",
    category: "AI Delivery",
    readMinutes: 12,
    publishedAt: "May 2026",
    author: "O3Xs Research",
    coverImage:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=85&w=1400",
    coverImageAlt: "Abstract AI neural network — enterprise agentic readiness",
    reportTitle: "Agentic AI Enterprise Readiness Report",
    sections: [
      {
        body: "Most enterprises are experimenting with agents inside isolated pilots. Few have connected those pilots to production governance, measurable cycle-time outcomes, or a single definition of “done” that security and compliance can audit.",
      },
      {
        heading: "The readiness gap",
        body: "Readiness is not model selection. It is whether your delivery system can absorb AI output: intake standards, verification layers, ownership for merge decisions, and operate cadences that compound learning instead of resetting every quarter.",
      },
      {
        heading: "What high-readiness teams do differently",
        body: "They price work in verifiable units (decisions, releases, or dollars recovered), not tokens consumed. They require review trails before production. They keep humans accountable for exceptions while agents handle repeatable pipeline steps.",
      },
      {
        heading: "Implication for 2026 planning",
        body: "Budgets should shift from tool licenses toward delivery infrastructure — the connective tissue between product intent, code, validation, and operate metrics leadership already trusts.",
      },
    ],
  },
  {
    id: "cost-per-decision-economics",
    title: "From Token Bills to Decision Economics",
    excerpt:
      "Why unit economics for verified AI requests beat consumption pricing — and how finance and engineering can align on one metric.",
    category: "AI Delivery",
    readMinutes: 9,
    publishedAt: "April 2026",
    author: "O3Xs Research",
    coverImage:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=85&w=1400",
    coverImageAlt: "Finance and engineering leaders aligning on unit economics",
    reportTitle: "Decision Economics for AI-Assisted SDLC",
    sections: [
      {
        body: "Token-based pricing optimizes for vendor revenue, not customer outcomes. When every feature ships through a verification pipeline, the meaningful unit is a decision: one request that may complete in a single pass or a full plan–build–review cycle.",
      },
      {
        heading: "Predictability for CFOs",
        body: "Decision quotas map directly to capacity planning. Teams can forecast delivery throughput and cost per shipped feature without surprise invoices after a busy sprint.",
      },
      {
        heading: "Predictability for engineering",
        body: "Engineers stop rationing prompts and start optimizing pipeline quality — better intake, fewer rework loops, stronger validation — because waste shows up in decisions spent, not morale.",
      },
    ],
  },
  {
    id: "bpa-operate-model",
    title: "Beyond the Diagnostic: Making BPA Stick",
    excerpt:
      "How consultation engagements transition from diagnostic insight to an operate model that defends margin in board reviews.",
    category: "Operations",
    readMinutes: 11,
    publishedAt: "March 2026",
    author: "O3Xs Research",
    coverImage:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=85&w=1400",
    coverImageAlt: "Operations team workshop — business process automation cadence",
    reportTitle: "BPA Operate Model Playbook",
    sections: [
      {
        body: "Diagnostics fail when they end in slides. Sustainable business process automation requires an operate layer: named owners, weekly reviews, exception routing, and metrics tied to dollars — not activity counts.",
      },
      {
        heading: "Optimize before orchestrate",
        body: "Automating a broken process multiplies cost. The O³ sequence — optimize, orchestrate, operate, innovate, scale — exists because sequencing determines whether AI spend converts to P&L impact.",
      },
      {
        heading: "Operate reviews that leadership attends",
        body: "The cadence matters more than the dashboard. When CFO and CIO offices share one leakage ledger, prioritization stops being political and starts being economic.",
      },
    ],
  },
  {
    id: "governed-ai-toolchain",
    title: "Governed AI Toolchains at Scale",
    excerpt:
      "Consolidating tool sprawl without stifling innovation — patterns from Fortune 500 technology divisions.",
    category: "Governance",
    readMinutes: 10,
    publishedAt: "February 2026",
    author: "O3Xs Research",
    coverImage:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=85&w=1400",
    coverImageAlt: "Cross-functional team planning a governed AI toolchain",
    reportTitle: "Governed AI Toolchain Reference Architecture",
    sections: [
      {
        body: "Fortune 500 technology organizations often run dozens of overlapping AI-adjacent tools. Consolidation fails when it is framed as cost cutting alone; it succeeds when tied to release accountability and portfolio-wide quality gates.",
      },
      {
        heading: "Nine platforms, not forty-seven",
        body: "The target state is a governed stack: approved intake, build, validation, deploy, and observe layers — each with clear owners and integration contracts, not a single mega-vendor bet.",
      },
      {
        heading: "Measuring consolidation",
        body: "Track cycle time on priority programs, slip rate, and escalation volume — not license count. Those metrics prove whether governance is enabling speed or blocking it.",
      },
    ],
  },
];

export function getPublicationBySlug(slug: string): Publication | undefined {
  return PUBLICATIONS.find((p) => p.id === slug);
}

export const SESSION_STORAGE_KEY = "o3xs-publication-access";

export function getStoredPublicationAccess(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed)
      ? parsed.filter((id): id is string => typeof id === "string")
      : [];
  } catch {
    return [];
  }
}

export function storePublicationAccess(publicationId: string): void {
  const existing = getStoredPublicationAccess();
  if (existing.includes(publicationId)) return;
  sessionStorage.setItem(
    SESSION_STORAGE_KEY,
    JSON.stringify([...existing, publicationId]),
  );
}
