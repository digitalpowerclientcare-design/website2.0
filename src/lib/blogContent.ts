export type BlogImage = {
  src: string;
  alt: string;
  caption: string;
};

export type BlogCta = {
  eyebrow?: string;
  title: string;
  body: string;
  href: string;
  label: string;
};

export type BlogSection = {
  heading?: string;
  body?: string;
  image?: BlogImage;
  cta?: BlogCta;
  list?: string[];
};

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readMinutes: number;
  author: string;
  coverImage: string;
  coverImageAlt: string;
  seo: {
    description: string;
    keywords: string[];
  };
  sections: BlogSection[];
};

export const BLOG_INTRO = {
  eyebrow: "Blog",
  title: "Ideas from the O3Xs team.",
  description:
    "In-depth guides on enterprise AI, agentic workflows, verified software delivery, and business process automation — written for CIOs, engineering leaders, and operators who measure outcomes, not activity.",
} as const;

export const BLOG_CATEGORIES = ["All", "AI Delivery", "Operations", "Strategy"] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "agentic-ai-enterprise-readiness-checklist-2026",
    title: "Agentic AI in the Enterprise: The 2026 Readiness Checklist Every CIO Needs",
    excerpt:
      "93% of IT leaders plan to deploy autonomous AI agents within two years — but 40%+ of agentic projects are already at risk of cancellation. Here is the readiness checklist that separates pilots from production-grade ROI.",
    category: "AI Delivery",
    publishedAt: "June 2026",
    readMinutes: 9,
    author: "O3Xs Research",
    coverImage:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=85&w=1400",
    coverImageAlt:
      "Enterprise leadership team reviewing agentic AI strategy on a whiteboard",
    seo: {
      description:
        "Enterprise agentic AI readiness checklist for 2026: governance, workflow redesign, data quality, and operating model discipline CIOs need before deploying AI agents at scale.",
      keywords: [
        "agentic AI enterprise",
        "AI agents enterprise",
        "enterprise AI readiness",
        "CIO AI strategy 2026",
        "autonomous AI deployment",
        "AI operating model",
        "enterprise AI governance",
      ],
    },
    sections: [
      {
        body: "Agentic AI is no longer a research curiosity — it is the next budget line item in every Fortune 500 technology plan. Gartner projects that 40% of enterprise applications will embed task-specific AI agents by end of 2026. Deloitte and MuleSoft report that 93% of IT leaders intend to deploy autonomous agents within the next two years. The business case is compelling: PwC cites average ROI of 171% from agentic deployments, roughly three times traditional automation. By 2028, AI agents are projected to intermediate more than $15 trillion in B2B spending — which makes readiness a board-level concern, not an engineering side project.",
      },
      {
        body: "The failure pattern is equally familiar. More than 40% of current agentic AI projects are at risk of cancellation by 2027 — not because the technology does not work, but because organizations repeat the same structural mistakes from earlier AI waves at higher velocity and cost. Agents amplify whatever operating model you already have. If that model is tool-first, ungoverned, and disconnected from verified business outcomes, agents will accelerate dysfunction — not value.",
      },
      {
        heading: "Readiness is not model selection",
        body: "The most common mistake we see in enterprise AI readiness assessments is conflating access to frontier models with organizational readiness. Readiness is whether your delivery system can absorb autonomous output: intake standards, verification layers, ownership for merge decisions, exception routing, and operate cadences that compound learning instead of resetting every quarter. High-readiness teams price work in verifiable units — decisions shipped, dollars recovered, cycle time reduced — not tokens consumed or demos delivered.",
        image: {
          src: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=85&w=1200",
          alt: "Abstract visualization of an AI neural network representing multi-agent enterprise systems",
          caption:
            "Multi-agent architectures now represent 66% of enterprise AI implementations — complexity demands systems thinking, not faster tool adoption.",
        },
      },
      {
        heading: "The 2026 enterprise agentic AI readiness checklist",
        list: [
          "Workflow redesign completed before agent deployment — not in parallel, not after",
          "Production data audited for AI readiness, not just the pilot dataset",
          "Human-in-the-loop checkpoints defined for every autonomous decision path",
          "Governance model covers failure modes, hallucinations, and regulatory exposure",
          "Post-go-live ownership assigned with incentives tied to verified KPIs",
          "Integration architecture documented — agents must connect to ERP, CRM, and existing toolchains",
          "Unit economics defined: cost per verified decision, not cost per token",
        ],
      },
      {
        heading: "Where agentic AI creates ROI — and where it amplifies risk",
        body: "Agentic workflows create measurable ROI when they execute repeatable, multi-step processes across systems leadership already trusts: revenue cycle exceptions, SDLC verification pipelines, supply chain coordination, and customer operations with clear escalation paths. They amplify risk when deployed against broken processes, ungoverned data, or accountability gaps. Klarna's agentic deployment handled work equivalent to 853 employees and generated $60 million in savings by Q3 2025 — because the operating model around the agents was disciplined, not because the agents were novel. JPMorgan now runs 450+ AI use cases in daily production for the same reason: governance and ownership were designed before scale, not bolted on after incidents.",
      },
      {
        body: "For a deeper research synthesis on enterprise AI failure patterns and the operating model that closes the gap, read our publication <a href=\"/publications/agentic-ai-enterprise-readiness/\">Is Your Enterprise Ready for Agentic AI?</a> — including the full Agentic AI Enterprise Readiness Report delivered to your inbox.",
        cta: {
          eyebrow: "Go deeper",
          title: "Get the full readiness report",
          body: "Request access to our gated research on agentic AI enterprise readiness — methodology, benchmarks, and an executive action framework.",
          href: "/publications/agentic-ai-enterprise-readiness/",
          label: "Read publication →",
        },
      },
      {
        heading: "What to do in the next 30 days",
        body: "Start with a diagnostic, not a vendor selection. Map where value is leaking across operations, revenue, and delivery before any agent is configured. Identify which processes should be optimized or eliminated before automation. Define the KPI baseline leadership will use to judge success — and assign an owner accountable for performance after go-live. Run a tabletop exercise for agent failure modes: what happens when an autonomous workflow produces incorrect output, touches regulated data incorrectly, or bypasses an approval gate? If the answer is unclear, you are not ready to scale — regardless of vendor demos. Organizations that sequence optimize → orchestrate → operate before scaling agents are already in the top quartile of AI maturity globally.",
        cta: {
          title: "Book a performance diagnostic",
          body: "O3Xs maps where AI-led automation can recover verified value — with a written implementation plan whether or not an engagement follows.",
          href: "/contact?interest=consultation",
          label: "Book a consultation →",
        },
      },
    ],
  },
  {
    id: "why-enterprise-ai-projects-fail",
    title: "Why 80% of Enterprise AI Projects Fail — And the Operating Model That Actually Works",
    excerpt:
      "Enterprise AI spending hit $124M annually per organization — yet 60% generate no material value. The problem is not the technology. It is the approach. Here is what the top 5% do differently.",
    category: "Strategy",
    publishedAt: "June 2026",
    readMinutes: 10,
    author: "O3Xs Research",
    coverImage:
      "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=85&w=1400",
    coverImageAlt:
      "Executive reviewing enterprise AI investment outcomes in a modern office",
    seo: {
      description:
        "Why 80% of enterprise AI projects fail: broken processes, data readiness gaps, and missing governance. Learn the operating model the top 5% use to deliver verified AI ROI at scale.",
      keywords: [
        "enterprise AI failure",
        "AI project failure rate",
        "enterprise AI ROI",
        "AI operating model",
        "business process automation",
        "AI transformation",
        "enterprise AI strategy",
      ],
    },
    sections: [
      {
        body: "Enterprise AI investment has reached an inflection point — but not the one most boardrooms expected. McKinsey's 2025 Global AI Survey confirmed that 88% of organizations use AI in at least one business function. KPMG found enterprises project deploying an average of $124 million annually on AI, with 92% planning increases over the next three years. Global AI spending is expected to reach $1.3 trillion by 2029.",
      },
      {
        body: "Yet only 39% report measurable impact on earnings. BCG's survey of 1,250 business leaders found that 60% of organizations generate no material value from AI despite continued investment — and only 5% have created substantial value at scale. PwC's 29th Global CEO Survey found 56% of CEOs report no significant financial benefit from AI investments. The average sunk cost per abandoned initiative: $7.2 million. This is the AI adoption paradox: the investment is real; the value largely is not.",
      },
      {
        heading: "Three structural failure points",
        body: "Understanding why enterprise AI projects fail is the first step toward breaking the pattern. The research is unambiguous on root causes — and they compound.",
        image: {
          src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=85&w=1200",
          alt: "Cross-functional team in a workshop diagnosing operational workflow gaps before AI deployment",
          caption:
            "Organizations achieving significant AI returns are 2× more likely to redesign end-to-end workflows before selecting any technology (McKinsey, 2025).",
        },
      },
      {
        body: "<strong>1. Broken processes, automated.</strong> The most consistent predictor of failure is automating before optimizing. When an inefficient workflow is connected to an AI tool, the result is a faster version of the same problem. Most organizations select technology first, then retrofit it onto existing operations — the reverse of what high performers do.",
      },
      {
        body: "<strong>2. Data that is not AI-ready.</strong> Gartner reports that 85% of AI projects fail due to poor data quality. A proof-of-concept runs on clean, prepared data; production runs on live, messy, constantly changing operational data. Gartner estimates 60% of AI projects will be abandoned entirely due to data readiness failures through 2026.",
      },
      {
        body: "<strong>3. Governance designed as an afterthought.</strong> Only 21% of organizations have a mature governance model for autonomous AI deployment. When AI systems produce unexpected outputs — and they will — there is no framework for detection, escalation, or correction. Ungoverned programs accrue compliance exposure that eventually makes continuation untenable.",
      },
      {
        heading: "What the top 5% do differently",
        body: "The 5% generating substantial AI value do not have better technology. They have a fundamentally different operating model built on three disciplines: diagnose before you automate, redesign the workflow then deploy the tool, and own the outcome — not the deliverable. Organizations achieving 5.8× ROI treat AI as an ongoing operated system with post-go-live monitoring, drift detection, and continuous iteration — not a completed project with a handoff deck.",
        list: [
          "Optimize — map value leakage before any tool is selected",
          "Orchestrate — implement AI where ROI is provable and measurable",
          "Operate — stay, monitor KPIs, iterate until results compound",
        ],
      },
      {
        body: "The abandonment trend is worsening: enterprises abandoning most AI initiatives jumped from 17% in 2024 to 42% in 2025 (S&P Global). MIT Sloan found 95% of generative AI pilots fail to scale to production. Median time from pilot approval to shutdown: 14 months — long enough to consume resources, short enough to deliver no lasting value. The pattern is predictable: a bold pilot launches with executive sponsorship, demonstrates impressive demos on curated data, then stalls at the production boundary where data quality, integration debt, and missing governance collide. Without an operate model, the initiative quietly dies — and the organization learns the wrong lesson: that AI does not work, rather than that the operating model around AI was never designed to work.",
        cta: {
          eyebrow: "Related research",
          title: "The $7.2M blind spot",
          body: "Our full research synthesis covers five findings every executive should know before approving their next AI budget — with data from McKinsey, BCG, Deloitte, PwC, and Gartner.",
          href: "/publications/",
          label: "Browse publications →",
        },
      },
      {
        heading: "From paradox to verified outcomes",
        body: "Sustainable enterprise AI is not a technology purchase. It is an operating discipline — practitioner-grade execution, diagnostic-first methodology, and accountability structures tied to verified business performance. That is why O3Xs exists: to close the gap between AI strategy and sustained enterprise performance. Every engagement begins with a Performance Diagnostic that maps where value is leaking — not with a tool recommendation deck. Success fees tie to verified impact, not delivered milestones. Learn more about our philosophy on <a href=\"/our-purpose/\">Our Purpose</a>, or explore verified outcomes on <a href=\"/case-studies/\">Case Studies</a>. For operations leaders specifically, our publication <a href=\"/publications/bpa-operate-model/\">Beyond the Diagnostic: Making BPA Stick</a> covers the operate cadence that keeps automation tied to board-level metrics.",
        cta: {
          title: "Start with a diagnostic",
          body: "Map where AI-led business process automation can recover value — with a Performance Diagnostic Report and written implementation plan.",
          href: "/consultation/",
          label: "Explore consultation →",
        },
      },
    ],
  },
  {
    id: "verified-ai-code-delivery-decision-economics",
    title: "Verified AI Code Delivery: Why Engineering Leaders Are Ditching Token Bills for Decision Economics",
    excerpt:
      "Token-based AI pricing rewards volume, not outcomes. The enterprises shipping fastest in 2026 price verified decisions — and give CFOs a metric they can actually plan around.",
    category: "AI Delivery",
    publishedAt: "May 2026",
    readMinutes: 9,
    author: "O3Xs Team",
    coverImage:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=85&w=1400",
    coverImageAlt:
      "Engineering team reviewing AI-assisted software delivery pipeline on monitors",
    seo: {
      description:
        "Enterprise AI code delivery guide: why verified decisions beat token pricing, how to build an AI SDLC verification pipeline, and what engineering leaders need for governed AI-assisted development in 2026.",
      keywords: [
        "AI code generation enterprise",
        "AI SDLC",
        "verified AI delivery",
        "enterprise AI development",
        "AI decision economics",
        "AI-assisted software delivery",
        "Forge AI",
        "enterprise AI governance",
      ],
    },
    sections: [
      {
        body: "Enterprise engineering teams are under pressure to ship AI-assisted features faster — without sacrificing the quality gates, compliance trails, and architectural coherence that regulated industries demand. The default response has been to add AI coding tools to existing workflows and hope velocity improves. The result, for most organizations, is faster generation of code that teams will not merge: hallucinated dependencies, schema violations, and security gaps discovered late in the cycle when fixes are expensive. RAND Corporation's 2025 analysis of enterprise AI project outcomes confirms the pattern: initial velocity gains rarely survive first contact with production governance requirements.",
      },
      {
        body: "The root issue is not model capability. It is delivery infrastructure. When AI spend is tied to tokens, every sprint becomes a negotiation between engineering and finance. Teams ration prompts instead of optimizing pipeline quality. Leadership sees unpredictable invoices instead of predictable unit economics per shipped feature. Token bills reward volume. Verified decisions reward output leadership can audit.",
      },
      {
        heading: "What is a verified decision?",
        body: "A verified decision is one request through a governed AI delivery pipeline — intake, codebase analysis, generation, validation, review, and audit trail — that produces output ready for human merge approval or structured rejection with documented rationale. The meaningful unit is not a token or a prompt. It is a decision: one feature request that may complete in a single pass or a full plan-build-review cycle, with every step logged for SOC2-ready compliance.",
        image: {
          src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=85&w=1200",
          alt: "Developer workspace showing code editor with AI-assisted software development workflow",
          caption:
            "Live Forge AI engagements show 34% reduction in delivery cycle time and 5× verified ROI — measured against pre-engagement baselines, not vendor projections.",
        },
      },
      {
        heading: "The verification pipeline engineering leaders need",
        body: "Production-grade AI code delivery requires six verification agents working in sequence — not a single chat interface bolted onto legacy ERP modules. Intake and parse receives plain-English feature requests. Codebase analysis maps existing architecture and dependencies. Generation produces candidate code against real context. Validation applies hallucination prevention. Senior-engineer-level review simulates merge readiness. Audit trail logs every decision for compliance review.",
        list: [
          "Intake standards that prevent ambiguous or out-of-scope requests from entering the pipeline",
          "Codebase-aware generation that respects schemas, integrations, and compliance boundaries",
          "Pre-merge validation layers — not post-hoc review after technical debt accumulates",
          "Human-in-the-loop merge authority with exception routing for edge cases",
          "SOC2-ready audit logs tied to every AI decision in the SDLC",
        ],
      },
      {
        heading: "Decision economics for CFOs and engineering",
        body: "Decision quotas map directly to capacity planning. Teams forecast delivery throughput and cost per shipped feature without surprise invoices after a busy sprint. Finance and engineering align on one metric: verified decisions per month, tied to release outcomes leadership already tracks. This is the shift from consumption pricing to outcome economics — and it is why we built <a href=\"/forge-ai/\">Forge AI</a> to price in decisions, not tokens. Unlike consumption models that penalize thorough validation, decision economics reward teams for better intake, fewer rework loops, and stronger pre-merge checks — because waste shows up in decisions spent, not morale. See <a href=\"/pricing/\">Pricing</a> for plan details including the 3-day trial and engineer seat options.",
      },
      {
        body: "Legacy ERP and monolith environments carry years of implicit business rules. Agentic tools that ignore that context generate code teams will not merge. The pattern that works: start with codebase analysis and plan validation agents. Let generation run only after the pipeline understands schemas, integrations, and compliance boundaries — without rip-and-replace disruption to existing toolchains or project management infrastructure.",
        cta: {
          eyebrow: "Related publication",
          title: "From token bills to decision economics",
          body: "Our gated research report covers why unit economics for verified AI requests beat consumption pricing — and how finance and engineering align on one metric.",
          href: "/publications/cost-per-decision-economics/",
          label: "Request the report →",
        },
      },
      {
        heading: "Shipping on legacy ERP without rewrites",
        body: "Fortune 500 technology organizations often cannot move monoliths overnight — but they can embed AI-assisted orchestration across SDLC workflows spanning CRM, ERP, and custom product delivery. The goal is verified output through existing infrastructure, not a greenfield platform bet. Teams that compound through this cycle are not the fastest movers. They are the most disciplined: diagnostic-first, verification-mandatory, accountability built into the commercial model. For governance-heavy environments, our publication <a href=\"/publications/governed-ai-toolchain/\">Governed AI Toolchains at Scale</a> outlines the reference architecture Fortune 500 technology divisions use to consolidate tool sprawl without stifling innovation — with patterns you can apply before your next platform decision.",
        cta: {
          title: "Request Forge AI beta access",
          body: "Join enterprises using verified AI delivery across their SDLC — any stack, any cloud, with six verification agents and SOC2-ready audit trails.",
          href: "/contact?interest=forge-beta",
          label: "Request beta access →",
        },
      },
    ],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.id === slug);
}

export function countBlogWords(post: BlogPost): number {
  let count = 0;
  const countText = (text: string) => {
    count += text.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  };
  countText(post.excerpt);
  for (const s of post.sections) {
    if (s.body) countText(s.body);
    if (s.heading) countText(s.heading);
    if (s.list) s.list.forEach(countText);
    if (s.cta) {
      countText(s.cta.title);
      countText(s.cta.body);
    }
  }
  return count;
}
