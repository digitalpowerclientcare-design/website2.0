import {
  FORGE_PRICING_PLANS,
  type BillingPeriod,
  type ForgePlanId,
} from "./pricingContent";

export type ContactVariant = "consultation" | "forge";

export type ForgeRequestKind = "trial" | "beta" | "plan";

export type ContactContext = {
  variant: ContactVariant;
  /** Raw query value for form submission */
  interest: string;
  forge?: {
    kind: ForgeRequestKind;
    planId?: ForgePlanId;
    planLabel?: string;
    billing?: BillingPeriod;
    summary: string;
  };
  page: {
    eyebrow: string;
    title: string;
    titleAccent?: string;
    description: string;
    included: readonly string[];
    formTitle: string;
    formSubtitle: string;
    submitLabel: string;
    trustTitle: string;
    trustBody: string;
  };
};

const CONSULTATION_PAGE = {
  eyebrow: "Contact us",
  title: "Book a 60-minute consultation.",
  titleAccent: "Get a Performance Diagnostic Report.",
  description:
    "In one focused session, we'll analyze your operations and deliver a written diagnostic report identifying where you're losing money — with quantified impact and prioritized fixes.",
  included: [
    "60-minute deep-dive consultation",
    "Written Performance Diagnostic Report",
    "Quantified revenue / cost leakage analysis",
    "ROI-ranked improvement roadmap",
  ],
  formTitle: "Start Your Performance Diagnostic",
  formSubtitle: "We'll be in touch within one business day.",
  submitLabel: "Submit consultation request",
  trustTitle: "Confidential. No obligation. No sales pitch.",
  trustBody:
    "The diagnostic call is purely consultative — you'll leave with a written report you can use with or without O3Xs, under mutual NDA.",
} as const;

function forgeIncluded(kind: ForgeRequestKind, planLabel?: string, billing?: BillingPeriod): readonly string[] {
  const billingNote =
    billing === "yearly" ? "Yearly billing (2 months free)" : billing === "monthly" ? "Monthly billing" : null;

  if (kind === "trial") {
    return [
      "3-day Forge access on your repository",
      "5 decisions across the full verification pipeline",
      "No credit card required for the trial window",
      "Follow-up to choose a plan when you're ready",
    ];
  }

  if (kind === "beta") {
    return [
      "Private Beta cohort onboarding",
      "Technical Demo tailored to your stack",
      "Repo connection and pipeline walkthrough",
      "Introductory pricing for early adopters",
    ];
  }

  const planLine = planLabel ? `${planLabel} plan selection` : "Forge AI plan selection";
  return [
    planLine,
    ...(billingNote ? [billingNote] : []),
    "Onboarding call with our product team",
    "Secure repo connection and agent configuration",
    "Decision quota and support per your selected tier",
  ];
}

function forgePageCopy(
  kind: ForgeRequestKind,
  summary: string,
  planLabel?: string,
  billing?: BillingPeriod,
): ContactContext["page"] {
  const included = forgeIncluded(kind, planLabel, billing);

  if (kind === "trial") {
    return {
      eyebrow: "Forge AI · Free trial",
      title: "Start your 3-day trial.",
      titleAccent: "5 decisions on your real codebase.",
      description:
        "Tell us how to reach you and a bit about your engineering setup. We'll provision trial access and help you connect your repository.",
      included,
      formTitle: "Request Forge trial access",
      formSubtitle: summary,
      submitLabel: "Start 3-day trial",
      trustTitle: "Built for production teams.",
      trustBody:
        "Trial access is limited to 5 decisions over 3 days. We use your details only to provision access and follow up on onboarding — no spam, no unrelated outreach.",
    };
  }

  if (kind === "beta") {
    return {
      eyebrow: "Forge AI · Private Beta",
      title: "Request Forge AI Beta Access",
      titleAccent: "Ship verified features faster.",
      description:
        "Forge AI is in private Beta with select engineering teams. Share your stack and team context so we can schedule a Technical Demo and onboarding path.",
      included,
      formTitle: "Request Forge AI Beta Access",
      formSubtitle: summary,
      submitLabel: "Request Forge AI Beta Access",
      trustTitle: "Early adopter program.",
      trustBody:
        "Beta spots are limited. We'll review your submission and respond within one business day with next steps for a Technical Demo and repo setup.",
    };
  }

  return {
    eyebrow: "Forge AI · Plans",
    title: "Get started with Forge.",
    titleAccent: planLabel ? `${planLabel} plan` : "Choose your plan",
    description:
      "Confirm your plan and billing preference. We'll reach out to complete onboarding, connect your repos, and align on your first decisions.",
    included,
    formTitle: "Forge plan request",
    formSubtitle: summary,
    submitLabel: "Submit plan request",
    trustTitle: "Enterprise-ready from day one.",
    trustBody:
      "Your submission starts onboarding — not a generic sales funnel. We use this information to configure your workspace and decision quota on the tier you selected.",
  };
}

const PLAN_FROM_INTEREST: Record<string, ForgePlanId> = {
  "forge-starter": "starter",
  "forge-growth": "growth",
  "forge-scale": "scale",
};

function planLabel(id: ForgePlanId): string {
  return FORGE_PRICING_PLANS.find((p) => p.id === id)?.name ?? id;
}

function parseBilling(value: string | null): BillingPeriod | undefined {
  if (value === "monthly" || value === "yearly") return value;
  return undefined;
}

export function resolveContactContext(searchParams: URLSearchParams): ContactContext {
  const interest = searchParams.get("interest")?.trim() || "consultation";
  const billing = parseBilling(searchParams.get("billing"));
  const planParam = searchParams.get("plan")?.trim() as ForgePlanId | undefined;

  if (interest === "consultation" || !interest.startsWith("forge")) {
    return {
      variant: "consultation",
      interest: "consultation",
      page: { ...CONSULTATION_PAGE },
    };
  }

  if (interest === "forge-trial") {
    const planId =
      planParam && ["starter", "growth", "scale"].includes(planParam) ? planParam : undefined;
    const planName = planId ? planLabel(planId) : undefined;
    const summaryParts = ["3-day trial · 5 free decisions"];
    if (planName) summaryParts.push(`Considering ${planName}`);
    if (billing) summaryParts.push(billing === "yearly" ? "Yearly billing" : "Monthly billing");
    const summary = summaryParts.join(" · ");

    return {
      variant: "forge",
      interest,
      forge: {
        kind: "trial",
        planId,
        planLabel: planName,
        billing,
        summary,
      },
      page: forgePageCopy("trial", summary, planName, billing),
    };
  }

  if (interest === "forge-beta") {
    const summary = "Private Beta · Technical Demo";
    return {
      variant: "forge",
      interest,
      forge: { kind: "beta", summary },
      page: forgePageCopy("beta", summary),
    };
  }

  const planId = PLAN_FROM_INTEREST[interest] ?? planParam;
  if (planId && ["starter", "growth", "scale"].includes(planId)) {
    const name = planLabel(planId);
    const summaryParts = [`${name} plan`];
    if (billing) summaryParts.push(billing === "yearly" ? "Yearly billing" : "Monthly billing");
    const summary = summaryParts.join(" · ");

    return {
      variant: "forge",
      interest,
      forge: {
        kind: "plan",
        planId,
        planLabel: name,
        billing,
        summary,
      },
      page: forgePageCopy("plan", summary, name, billing),
    };
  }

  // Unknown forge interest — still show forge form
  const summary = "Forge AI inquiry";
  return {
    variant: "forge",
    interest,
    forge: { kind: "plan", summary },
    page: forgePageCopy("plan", summary),
  };
}

export const FORGE_USE_CASE_OPTIONS = [
  "Custom software / greenfield",
  "CRM build or modernization",
  "ERP build or modernization",
  "Feature pipeline on existing product",
  "Other",
] as const;

export const FORGE_REPO_HOST_OPTIONS = [
  "GitHub",
  "GitLab",
  "Bitbucket",
  "Azure DevOps",
  "Other / self-hosted",
] as const;

export const FORGE_TEAM_SIZE_OPTIONS = [
  "1–5 engineers",
  "6–20 engineers",
  "21–50 engineers",
  "51–200 engineers",
  "201–500 engineers",
  "500+ engineers",
] as const;

export type ContactReview = {
  quote: string;
  author: string;
  role: string;
};

export const FORGE_CONTACT_REVIEWS: readonly ContactReview[] = [
  {
    quote:
      "FORGE didn't ask us to change our stack. It learned our platform, wrote in our patterns, and gave us a review trail before anything hit production.",
    author: "VP, Engineering",
    role: "Custom Software · US",
  },
  {
    quote:
      "In wealth management CRM, you cannot ship fast without shipping safe. FORGE gave us both — generation speed with evidence our compliance team accepts.",
    author: "Head of Platform Engineering",
    role: "Enterprise CRM · US",
  },
  {
    quote:
      "Legacy ERP is where most AI tools fail. FORGE mapped our business rules first — then wrote code our team would actually merge.",
    author: "Director of Engineering",
    role: "Enterprise ERP · US",
  },
] as const;

export const CONSULTATION_CONTACT_REVIEWS: readonly ContactReview[] = [
  {
    quote:
      "O3Xs was the only firm willing to tie fees to cycle time we could measure in our own Jira — not a vanity metric in a slide.",
    author: "Chief Information Officer",
    role: "US Financial Services · Fortune 500",
  },
  {
    quote:
      "For the first time we had a partner who stayed past the deck. The operate model turned diagnostic insight into margin we could defend in a board review.",
    author: "Chief Operations Officer",
    role: "US Manufacturing · Mid-Market",
  },
] as const;

export const FORGE_START_TIMELINE_OPTIONS = [
  "Immediately",
  "Within 2 weeks",
  "Within 1 month",
  "Exploring — no fixed date",
] as const;
