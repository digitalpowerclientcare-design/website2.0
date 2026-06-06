export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readMinutes: number;
  author: string;
  sections: { heading?: string; body: string }[];
};

export const BLOG_INTRO = {
  eyebrow: "Blog",
  title: "Ideas from the O3Xs team.",
  description:
    "Practical notes on enterprise AI, governed delivery, and business process automation — written for operators and engineering leaders.",
} as const;

export const BLOG_CATEGORIES = ["All", "AI Delivery", "Operations", "Product"] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "why-decisions-beat-tokens",
    title: "Why We Price Forge in Decisions, Not Tokens",
    excerpt:
      "Token bills reward volume. Decisions reward verified output — and give finance a metric they can plan around.",
    category: "AI Delivery",
    publishedAt: "June 2026",
    readMinutes: 5,
    author: "O3Xs Team",
    sections: [
      {
        body: "When AI spend is tied to tokens, every sprint becomes a negotiation between engineering and finance. Decisions — one verified request through your pipeline — align cost with shipped capability.",
      },
      {
        heading: "What changes in practice",
        body: "Teams optimize intake quality and validation instead of rationing prompts. Leadership sees predictable unit economics per feature instead of surprise invoices.",
      },
    ],
  },
  {
    id: "operate-cadence",
    title: "The Weekly Operate Review That Actually Sticks",
    excerpt:
      "Diagnostics fail when they end in slides. Here is the cadence we use to keep BPA engagements tied to dollars.",
    category: "Operations",
    publishedAt: "May 2026",
    readMinutes: 6,
    author: "O3Xs Team",
    sections: [
      {
        body: "Operate reviews work when the same leaders show up with the same ledger: leakage found, fixes shipped, dollars recovered or protected.",
      },
      {
        heading: "Keep it economic",
        body: "Activity metrics fade. Tie every agenda item to revenue protected, cost removed, or cycle time reduced — with an owner and a date.",
      },
    ],
  },
  {
    id: "forge-on-legacy-erp",
    title: "Shipping AI Features on Legacy ERP Without Rewrites",
    excerpt:
      "FORGE maps business rules before it writes code — the pattern we use when the monolith cannot move overnight.",
    category: "Product",
    publishedAt: "April 2026",
    readMinutes: 7,
    author: "O3Xs Team",
    sections: [
      {
        body: "Legacy ERP modules carry years of implicit rules. Agentic tools that ignore that context generate code teams will not merge.",
      },
      {
        heading: "Context first",
        body: "Start with codebase analysis and plan validation agents. Let generation run only after the pipeline understands schemas, integrations, and compliance boundaries.",
      },
    ],
  },
];
