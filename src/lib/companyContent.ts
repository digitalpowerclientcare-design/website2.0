import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Layers,
  ShieldCheck,
  Sparkles,
  Target,
  Workflow,
} from "lucide-react";
import { assetPath } from "./assetPath";

export const PURPOSE_BELIEFS = [
  {
    title: "Accountability ends when most firms leave",
    body: "Enterprises don't fail at AI strategy. They fail at sustained execution — after the deck, after go-live, when ownership disappears.",
  },
  {
    title: "Optimization precedes automation",
    body: "Automating broken processes scales the problem. We diagnose leakage first, then orchestrate only where ROI is provable.",
  },
  {
    title: "Outcomes must be verifiable",
    body: "We tie engagement success to metrics leadership can audit — cycle time, cost, throughput — not vanity adoption scores.",
  },
] as const;

export const PURPOSE_COMMITMENTS = [
  {
    number: "01",
    title: "Diagnose with rigor",
    body: "Every engagement starts with a quantified baseline — what is leaking, where, and at what cost — before any tool is selected.",
  },
  {
    number: "02",
    title: "Implement with integration discipline",
    body: "We work inside your existing stack. No rip-and-replace theatre. AI workflows embedded where they compound value.",
  },
  {
    number: "03",
    title: "Operate until results stick",
    body: "Go-live is the midpoint, not the finish line. We monitor KPIs, detect drift, and iterate under an accountable operate model.",
  },
  {
    number: "04",
    title: "Scale what works",
    body: "Proven playbooks replicate across functions and geographies — with governance, not guesswork.",
  },
] as const;

export const STUDIO_PRINCIPLES = [
  {
    number: "01",
    title: "Diagnose Before Automating",
    body: "Most AI fails because broken processes get automated instead of fixed. We optimize before we orchestrate — always.",
  },
  {
    number: "02",
    title: "Tools Are Means, Not Ends",
    body: "Our methodology is tool-agnostic. The right stack depends on your data, KPIs, and regulatory reality — not vendor partnerships.",
  },
  {
    number: "03",
    title: "Outcomes Over Outputs",
    body: "A delivered project isn't success. Sustained performance improvement is success. Compensation aligns to verified business outcomes.",
  },
  {
    number: "04",
    title: "Compounding Beats One-Time",
    body: "Every engagement strengthens institutional playbooks. Your program benefits from cross-industry execution intelligence.",
  },
] as const;

export type CapabilityArea = {
  title: string;
  subtitle: string;
  body: string;
  Icon: LucideIcon;
};

export const CAPABILITY_AREAS: CapabilityArea[] = [
  {
    title: "AI Engineering",
    subtitle: "Product & platform delivery",
    body: "Full-stack engineering for enterprise SDLC, agentic pipelines, and production-grade AI systems — including FORGE AI for CRM, ERP, and custom software.",
    Icon: Layers,
  },
  {
    title: "Business Performance Automation",
    subtitle: "O³ consulting & operate",
    body: "Cross-industry diagnostic-led transformation: Optimize → Orchestrate → Operate with success fees tied to measurable KPIs.",
    Icon: Workflow,
  },
  {
    title: "Enterprise Governance",
    subtitle: "Risk, compliance, auditability",
    body: "SOC2-ready practices, regulated-industry delivery experience, and audit trails designed into every implementation — not bolted on after.",
    Icon: ShieldCheck,
  },
];

export const CONSULTATION_PILLARS = [
  {
    number: "01",
    title: "Optimize Before You Automate",
    body: "We map operations end-to-end, quantify leakage, and identify what should not be automated — before any intervention is designed.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=85&w=1200",
    alt: "Operational diagnostic dashboards",
  },
  {
    number: "02",
    title: "Orchestrate With Your Stack",
    body: "AI workflows integrated into existing systems — PM tools, ERP, CRM, data platforms — with a phased rollout leadership can approve.",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=85&w=1200",
    alt: "Integrated enterprise workflow",
  },
  {
    number: "03",
    title: "Operate Until Outcomes Compound",
    body: "Post go-live monitoring, exception routing, and iterate cadence with operate retainers and success fees tied to verified impact.",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=85&w=1200",
    alt: "Performance governance review",
  },
] as const;

export const CONSULTATION_AUDIENCES = [
  {
    Icon: Target,
    title: "Performance-accountable leadership",
    body: "CFOs, COOs, and technology executives ready for partners who share risk and own outcomes — not another transformation program.",
  },
  {
    Icon: BarChart3,
    title: "Mid-market to enterprise",
    body: "Organizations with operational complexity, tool sprawl, and transformation fatigue across US and India operations.",
  },
  {
    Icon: Sparkles,
    title: "Cross-industry operators",
    body: "Healthcare, financial services, software, automotive, infrastructure, and hospitality — wherever process excellence drives margin.",
  },
] as const;

export const ABOUT_METRICS = [
  { value: "6", label: "Industries with live case studies" },
  { value: "2", label: "Core engines — Consultation & Forge AI" },
  { value: "5×", label: "Verified ROI on operated engagements" },
  { value: "O³", label: "Optimize · Orchestrate · Operate" },
] as const;

/** Enterprise photography & product visuals for company pages */
export const PAGE_IMAGES = {
  aboutUs: {
    hero:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=85&w=1600",
    heroAlt: "Enterprise team collaborating on AI engineering strategy",
    team:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=85&w=1200",
    teamAlt: "Operators reviewing delivery outcomes in a working session",
    capabilities:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=85&w=1400",
    capabilitiesAlt: "Engineering workspace — consultation and software delivery",
  },
  ourPurpose: {
    hero:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=85&w=1920",
    heroAlt: "Executive strategy session — from plan to accountable execution",
    accountability:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=85&w=1200",
    accountabilityAlt: "Leadership reviewing performance metrics and ownership",
    operate:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=85&w=1200",
    operateAlt: "Operational dashboard — sustained performance after go-live",
  },
  forgeAi: {
    pipeline: assetPath("/forge/pipeline.png"),
    pipelineAlt: "Forge AI SDLC verification pipeline",
    agents: assetPath("/forge/agents.png"),
    agentsAlt: "Six Forge AI verification agents",
    codeReview: assetPath("/forge/code-review.png"),
    codeReviewAlt: "Verified code review before merge",
    compliance: assetPath("/forge/compliance.png"),
    complianceAlt: "SOC2-ready compliance and audit trail",
    validation: assetPath("/forge/validation.png"),
    validationAlt: "Pre-merge validation layer",
  },
} as const;
