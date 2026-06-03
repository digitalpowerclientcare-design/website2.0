import { assetPath } from "./assetPath";

export const SITE = {
  name: "O3Xs",
  tagline:
    "We build AI systems that engineer trust into software delivery.",
  subTagline: "The engineering studio behind FORGE AI.",
  email: "contact@o3xs.com",
  logo: assetPath("/logos/o3xs-logo.png"),
} as const;

export const NAV_LINKS = [
  { href: "/our-purpose", label: "Our Purpose" },
  { href: "/consultation", label: "Consultation" },
  { href: "/forge-ai", label: "Forge AI" },
  { href: "/pricing", label: "Pricing" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/about-us", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
] as const;

export const STATS = [
  {
    value: 60,
    suffix: "%",
    label: "Reduction in design-to-deployment cycle time",
  },
  {
    value: 55,
    suffix: "%",
    label: "Decrease in wasted marketing spend",
  },
  {
    value: 60,
    suffix: "%",
    label: "Faster operations process cycles",
  },
  {
    value: 45,
    suffix: "%",
    label: "Lower customer support costs",
  },
] as const;

export const PROBLEMS = [
  {
    icon: "Layers",
    title: "Fragmented AI Initiatives",
    description:
      "Pilots multiply without a unified operating model or measurable ROI.",
  },
  {
    icon: "Puzzle",
    title: "Tool Sprawl, No Ownership",
    description:
      "Vendors stack up while accountability for outcomes stays undefined.",
  },
  {
    icon: "Bot",
    title: "Automation Without Optimization",
    description:
      "Processes get faster before anyone fixes what's actually broken.",
  },
  {
    icon: "FileText",
    title: "Consulting Without Execution",
    description:
      "Strategy decks land; production systems and ownership rarely follow.",
  },
  {
    icon: "TrendingDown",
    title: "High Spend, Low ROI",
    description:
      "AI budgets grow while value realization stays invisible to leadership.",
  },
  {
    icon: "Network",
    title: "No Operating Model",
    description:
      "No playbook to run, measure, and compound intelligence over time.",
  },
] as const;

export const FRAMEWORK_STAGES = [
  {
    number: 1,
    title: "Optimize",
    subtitle: "Find what's broken before automating anything",
    description:
      "We map value leakage across operations, engineering, and go-to-market before touching tools.",
    deliverable: "Performance Diagnostic",
  },
  {
    number: 2,
    title: "Orchestrate",
    subtitle: "Implement AI where ROI is provable",
    description:
      "We design and deploy AI workflows tied to quantified business outcomes—not experiments.",
    deliverable: "ROI-Linked Implementation Plan",
  },
  {
    number: 3,
    title: "Operate",
    subtitle: "Stay, monitor, improve. Own the outcomes.",
    description:
      "We run the solution, monitor performance, and iterate until results compound.",
    deliverable: "Managed Operations Layer",
  },
  {
    number: 4,
    title: "Innovate",
    subtitle: "Embed innovation as capability, not projects",
    description:
      "We institutionalize AI capability inside your teams with playbooks and enablement.",
    deliverable: "Innovation Playbooks",
  },
  {
    number: 5,
    title: "Scale",
    subtitle:
      "Replicate proven solutions across functions and geographies",
    description:
      "We replicate what works—function by function, market by market—with governance built in.",
    deliverable: "Scale Blueprint",
  },
] as const;

export const FORGE_AGENTS = [
  {
    id: "A",
    title: "Intake & Parse",
    description: "Receives plain-English feature request",
  },
  {
    id: "B",
    title: "Codebase Analysis",
    description: "Maps existing architecture and dependencies",
  },
  {
    id: "C",
    title: "Generation",
    description:
      "Produces candidate code against real codebase context",
  },
  {
    id: "D",
    title: "Validation",
    description: "EDIT_TARGETS hallucination prevention layer",
  },
  {
    id: "E",
    title: "Agent F Review",
    description: "Senior-engineer-level code review simulation",
  },
  {
    id: "F",
    title: "Audit Trail",
    description: "SOC2-compliant log of every decision made",
  },
] as const;

export const BLEEDING_OPTIONS = [
  "SDLC / Engineering inefficiency",
  "Marketing spend waste",
  "Operations / process bottlenecks",
  "Legal / compliance overhead",
  "Customer support costs",
  "Other",
] as const;

export const COMPANY_SIZES = [
  "<$1M",
  "$1M–$50M",
  "$50M–$500M",
  "$500M+",
] as const;
