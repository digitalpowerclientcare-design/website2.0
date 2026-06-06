export type NavLinkItem = {
  type: "link";
  href: string;
  label: string;
};

export type NavTileVariant = "consultation" | "forge" | "blog" | "publications";

export type NavDropdownTile = {
  href: string;
  label: string;
  eyebrow: string;
  description: string;
  ctaLabel: string;
  variant: NavTileVariant;
  highlights: readonly string[];
};

export type NavDropdownItem = {
  type: "dropdown";
  label: string;
  panelEyebrow: string;
  panelTitle: string;
  panelSubtitle: string;
  tiles: NavDropdownTile[];
};

export type NavItem = NavLinkItem | NavDropdownItem;

export const SOLUTION_TILES: NavDropdownTile[] = [
  {
    href: "/consultation",
    label: "Consultation",
    eyebrow: "O³ Framework",
    description:
      "Business process automation for enterprise operations — from diagnostic through implementation and managed operate.",
    ctaLabel: "Explore Consultation",
    variant: "consultation",
    highlights: ["Performance diagnostic", "ROI-linked automation", "Operate until it compounds"],
  },
  {
    href: "/forge-ai",
    label: "Forge AI",
    eyebrow: "Enterprise SDLC",
    description:
      "Production-ready AI delivery platform — verified decisions across intake, generation, review, and compliance.",
    ctaLabel: "Explore Forge AI",
    variant: "forge",
    highlights: ["Any stack · any cloud", "Six verification agents", "SOC2-ready audit trail"],
  },
];

export const ARTICLE_TILES: NavDropdownTile[] = [
  {
    href: "/blog",
    label: "Blog",
    eyebrow: "Insights",
    description:
      "Practical perspectives on AI delivery, automation, and enterprise scale — written for operators and engineering leaders.",
    ctaLabel: "Read the blog",
    variant: "blog",
    highlights: ["Short-form insights", "Product & delivery notes", "Updated regularly"],
  },
  {
    href: "/publications",
    label: "Publications",
    eyebrow: "Research",
    description:
      "In-depth research and executive reports. Request access to read online — we deliver the full PDF to your inbox.",
    ctaLabel: "Browse publications",
    variant: "publications",
    highlights: ["Executive reports", "Gated research access", "Email delivery"],
  },
];

export const NAV_ITEMS: NavItem[] = [
  { type: "link", href: "/our-purpose", label: "Our Purpose" },
  {
    type: "dropdown",
    label: "Our Solutions",
    panelEyebrow: "What we deliver",
    panelTitle: "Two engines. One accountable team.",
    panelSubtitle:
      "Business automation and verified software delivery — designed for enterprise outcomes, not experiments.",
    tiles: SOLUTION_TILES,
  },
  { type: "link", href: "/pricing", label: "Pricing" },
  { type: "link", href: "/case-studies", label: "Case Studies" },
  {
    type: "dropdown",
    label: "Articles",
    panelEyebrow: "Thought leadership",
    panelTitle: "Research & perspectives",
    panelSubtitle:
      "Stay current on governed AI, delivery economics, and the operate models that make transformation stick.",
    tiles: ARTICLE_TILES,
  },
  { type: "link", href: "/about-us", label: "About Us" },
  { type: "link", href: "/contact", label: "Contact Us" },
];

/** Flat links for footer / legacy use */
export const FOOTER_SERVICE_LINKS = [
  { href: "/consultation", label: "Consultation" },
  { href: "/forge-ai", label: "Forge AI" },
  { href: "/pricing", label: "Pricing" },
] as const;

export const FOOTER_ARTICLE_LINKS = [
  { href: "/blog", label: "Blog" },
  { href: "/publications", label: "Publications" },
] as const;

export function isNavItemActive(pathname: string, item: NavItem): boolean {
  if (item.type === "link") {
    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  }
  return item.tiles.some(
    (tile) => pathname === tile.href || pathname.startsWith(`${tile.href}/`),
  );
}
