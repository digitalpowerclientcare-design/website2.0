import { describe, it, expect } from "vitest";
import { isNavItemActive, NAV_ITEMS, type NavItem } from "../navContent";

describe("isNavItemActive", () => {
  const linkItem: NavItem = { type: "link", href: "/our-purpose", label: "Our Purpose" };

  const dropdownItem: NavItem = {
    type: "dropdown",
    label: "Our Solutions",
    panelEyebrow: "What we deliver",
    panelTitle: "Two engines.",
    panelSubtitle: "Subtitle",
    tiles: [
      {
        href: "/consultation",
        label: "Consultation",
        eyebrow: "O³ Framework",
        description: "desc",
        ctaLabel: "Explore",
        variant: "consultation",
        highlights: ["a"],
      },
      {
        href: "/forge-ai",
        label: "Forge AI",
        eyebrow: "SDLC",
        description: "desc",
        ctaLabel: "Explore",
        variant: "forge",
        highlights: ["b"],
      },
    ],
  };

  describe("link items", () => {
    it("returns true for exact path match", () => {
      expect(isNavItemActive("/our-purpose", linkItem)).toBe(true);
    });

    it("returns true for child path", () => {
      expect(isNavItemActive("/our-purpose/sub", linkItem)).toBe(true);
    });

    it("returns false for non-matching path", () => {
      expect(isNavItemActive("/about-us", linkItem)).toBe(false);
    });

    it("returns false for partial path that is not a child", () => {
      expect(isNavItemActive("/our-purpose-extra", linkItem)).toBe(false);
    });
  });

  describe("dropdown items", () => {
    it("returns true when pathname matches one of the tiles", () => {
      expect(isNavItemActive("/consultation", dropdownItem)).toBe(true);
    });

    it("returns true for child path of a tile", () => {
      expect(isNavItemActive("/forge-ai/details", dropdownItem)).toBe(true);
    });

    it("returns false for non-matching path", () => {
      expect(isNavItemActive("/pricing", dropdownItem)).toBe(false);
    });
  });

  describe("with real NAV_ITEMS", () => {
    it("identifies /pricing as active for Pricing link", () => {
      const pricingItem = NAV_ITEMS.find(
        (item) => item.type === "link" && item.href === "/pricing",
      );
      expect(pricingItem).toBeDefined();
      expect(isNavItemActive("/pricing", pricingItem!)).toBe(true);
    });

    it("identifies /blog as active for Articles dropdown", () => {
      const articlesItem = NAV_ITEMS.find(
        (item) => item.type === "dropdown" && item.label === "Articles",
      );
      expect(articlesItem).toBeDefined();
      expect(isNavItemActive("/blog", articlesItem!)).toBe(true);
    });
  });
});
