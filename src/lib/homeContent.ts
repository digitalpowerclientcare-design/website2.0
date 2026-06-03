import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Car,
  Code2,
  HardHat,
  Hotel,
  Landmark,
} from "lucide-react";
import { assetPath } from "./assetPath";

export type ServiceId = "consultation" | "forge";

export type HeroSlideId = ServiceId | "o3xs";

export type HeroSlide = {
  id: HeroSlideId;
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  subheadline: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  image: string;
  imageAlt: string;
  /** Shown as chips on the hero visual (FORGE integrations, etc.) */
  chips?: string[];
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "o3xs",
    eyebrow: "O3Xs · Who we are",
    headline: "We make AI work",
    headlineAccent: "for your business and your software.",
    subheadline:
      "Run operations smarter in any industry. Ship CRM, ERP, and custom products faster — with one team accountable for results.",
    ctaLabel: "About Us",
    ctaHref: "/about-us",
    secondaryLabel: "Our Purpose",
    secondaryHref: "/our-purpose",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=85&w=1600",
    imageAlt:
      "Enterprise teams — operations and software delivery with accountable AI",
    chips: ["Any Industry", "SDLC", "Consultation", "Forge AI"],
  },
  {
    id: "consultation",
    eyebrow: "AI · Business Process Automation",
    headline: "Embed AI into the",
    headlineAccent: "processes that run your business.",
    subheadline:
      "We diagnose operational leakage, design AI-led business process automation where ROI is provable, deliver a full implementation plan, and operate until performance compounds — across every industry you run.",
    ctaLabel: "Book a Consultation",
    ctaHref: "/contact",
    secondaryLabel: "Explore the O³ Framework",
    secondaryHref: "#services",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=85&w=1600",
    imageAlt:
      "Enterprise leadership reviewing AI-driven business process automation dashboards",
    chips: ["Optimize", "Orchestrate", "Operate"],
  },
  {
    id: "forge",
    eyebrow: "FORGE AI · Enterprise SDLC Platform",
    headline: "Production-ready AI delivery.",
    headlineAccent: "Any stack. Any environment.",
    subheadline:
      "A ready-to-deploy solution that connects to your existing toolchain — Azure, AWS, Jira, GitHub, GitLab, DevOps pipelines, and more. Accelerate legacy modernization and greenfield product development with six verification agents and enterprise governance built in.",
    ctaLabel: "Explore FORGE AI",
    ctaHref: "/forge-ai",
    secondaryLabel: "Request Private Beta",
    secondaryHref: "/contact?interest=forge-beta",
    image: assetPath("/forge/pipeline.png"),
    imageAlt:
      "FORGE AI enterprise SDLC pipeline — feature request through verified production deployment",
    chips: ["Azure", "AWS", "Jira", "GitHub", "DevOps", "Legacy + New"],
  },
];

export const CONSULTATION_FRAMEWORK = [
  {
    step: "01",
    title: "Optimize",
    subtitle: "Diagnose before you automate",
    description:
      "We map value leakage across operations, revenue, and delivery — quantifying what should not be automated before any tool is selected.",
    deliverable: "Performance Diagnostic Report",
  },
  {
    step: "02",
    title: "Orchestrate",
    subtitle: "Implement where ROI is provable",
    description:
      "We design and deploy AI workflows integrated with your existing systems — no rip-and-replace, with a clear implementation plan tied to business outcomes.",
    deliverable: "ROI-Linked Implementation Plan",
  },
  {
    step: "03",
    title: "Operate",
    subtitle: "Own outcomes, not deliverables",
    description:
      "We stay post go-live — monitoring KPIs, detecting drift, and iterating until results compound. Success measured in dollars, cycles, and performance.",
    deliverable: "Managed Operations Layer",
  },
] as const;

export const CONSULTATION_VALUES = [
  {
    title: "Optimize before you automate",
    body: "Most firms start with tools. We start with business leakage — identifying what should not be automated before designing any intervention.",
  },
  {
    title: "Implementation plan included",
    body: "Every engagement delivers a structured roadmap: prioritized use cases, quantified ROI, integration architecture, and a phased rollout your leadership can approve.",
  },
  {
    title: "Accountability built in",
    body: "Hybrid commercial model — diagnostic, implementation, operate retainers, and success fees tied to verified business impact. We stay until results stick.",
  },
] as const;

export const FORGE_HIGHLIGHTS = [
  {
    title: "Connects to your environment",
    body: "Native integrations with Azure, AWS, Jira, GitHub, GitLab, Azure DevOps, and your existing CI/CD — no rip-and-replace. Works with legacy codebases and new product development alike.",
  },
  {
    title: "Verification before merge",
    body: "Six agents from requirements to production: plan validation, UI preview, code generation, senior review, CI integration, and canary deployment with auto-rollback.",
  },
  {
    title: "Enterprise governance",
    body: "SOC2-ready audit trails, migration safety gates, PII sanitization, and human-in-the-loop approval at every critical decision point.",
  },
] as const;

export const FORGE_PIPELINE = [
  { label: "Repository scan", detail: "Full codebase intelligence" },
  { label: "Requirements", detail: "Structured specs from plain English" },
  { label: "Plan validation", detail: "Safety & compatibility checks" },
  { label: "UI preview", detail: "Approve before code is written" },
  { label: "Code generation", detail: "Tests, migrations, pipeline updates" },
  { label: "Verification & ship", detail: "Review, PR, CI, canary deploy" },
] as const;

export type IndustryPreview = {
  id: string;
  name: string;
  Icon: LucideIcon;
  tagline: string;
  caseTitle: string;
  caseMetric: string;
  caseSummary: string;
  caseStudyHref: string;
  image: string;
  status: "live" | "preview";
};

export const INDUSTRY_PREVIEWS: IndustryPreview[] = [
  {
    id: "healthcare",
    name: "Healthcare",
    Icon: Activity,
    tagline: "Clinical operations, patient access, and compliance",
    caseTitle: "Patient Access & Revenue Cycle Optimization",
    caseMetric: "−60% prior-auth turnaround",
    caseSummary:
      "HIPAA-aligned automation across authorization workflows with a 14-month operate program and CFO-verified cost outcomes.",
    caseStudyHref: "/case-studies/?vertical=healthcare",
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=85&w=900",
    status: "live",
  },
  {
    id: "automotive",
    name: "Automotive",
    Icon: Car,
    tagline: "Manufacturing, supply chain, and dealer operations",
    caseTitle: "Tier-1 Supplier Network Optimization",
    caseMetric: "−67% planning cycle time",
    caseSummary:
      "AI-assisted workflow orchestration across procurement and plant scheduling with operate retainer tied to verified margin recovery.",
    caseStudyHref: "/case-studies/?vertical=automotive",
    image:
      "https://images.unsplash.com/photo-1565043589221-1a6fd000f4d8?auto=format&fit=crop&q=85&w=900",
    status: "live",
  },
  {
    id: "software",
    name: "Software Development",
    Icon: Code2,
    tagline: "SDLC, product engineering, and enterprise delivery",
    caseTitle: "From Reactive Delivery to Engineered Performance",
    caseMetric: "↓ 34% delivery cycle · 5× ROI",
    caseSummary:
      "Embedded AI-assisted orchestration across delivery workflows — without replacing existing PM tools or engineering stack.",
    caseStudyHref: "/case-studies/?vertical=software",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=85&w=900",
    status: "live",
  },
  {
    id: "finance",
    name: "Financial Services",
    Icon: Landmark,
    tagline: "Risk, compliance, and operational efficiency",
    caseTitle: "Enterprise Operations & Delivery Governance",
    caseMetric: "−60% cycle time on priority programs",
    caseSummary:
      "Fortune 500 US bank technology division — toolchain rationalization and AI-assisted delivery governance with success fees tied to CIO-verified metrics.",
    caseStudyHref: "/case-studies/?vertical=finance",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=85&w=900",
    status: "live",
  },
  {
    id: "infrastructure",
    name: "Infrastructure",
    Icon: HardHat,
    tagline: "Capital projects, asset management, and field operations",
    caseTitle: "Predictive Maintenance & Asset Intelligence",
    caseMetric: "↓ 28% unplanned downtime",
    caseSummary:
      "Operational diagnostic across asset lifecycle workflows with AI-assisted exception routing and governed performance dashboards.",
    caseStudyHref: "/case-studies/?vertical=infrastructure",
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=85&w=900",
    status: "live",
  },
  {
    id: "hospitality",
    name: "Hospitality",
    Icon: Hotel,
    tagline: "Guest experience, revenue management, and operations",
    caseTitle: "Revenue & Guest Operations Optimization",
    caseMetric: "↓ 22% cost-to-serve",
    caseSummary:
      "AI-led orchestration across booking, guest services, and back-office coordination — outcome-linked to occupancy and satisfaction KPIs.",
    caseStudyHref: "/case-studies/?vertical=hospitality",
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&q=85&w=900",
    status: "live",
  },
];

export const CONSULTATION_STATS = [
  { value: 34, suffix: "%", label: "Average reduction in delivery cycle time" },
  { value: 47, suffix: "%", label: "Decrease in manual reporting effort" },
  { value: 5, suffix: "×", label: "Verified ROI on operated engagements" },
  { value: 60, suffix: "%", label: "Faster operations process cycles" },
] as const;

export const FORGE_STATS = [
  { value: 85, suffix: "%", label: "Reduction in feature delivery time" },
  { value: 6, suffix: "", label: "Specialized verification agents" },
  { value: 94, suffix: "%", label: "Hallucination risk caught pre-merge" },
  { value: 43, suffix: "%", label: "Median PR cycle time reduction" },
] as const;

export const CONSULTATION_CTA_IMAGE =
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=85&w=900";
