import { describe, it, expect } from "vitest";
import { resolveContactContext } from "../contactContent";

describe("resolveContactContext", () => {
  it("defaults to consultation when no interest param", () => {
    const params = new URLSearchParams();
    const ctx = resolveContactContext(params);

    expect(ctx.variant).toBe("consultation");
    expect(ctx.interest).toBe("consultation");
    expect(ctx.forge).toBeUndefined();
    expect(ctx.page.eyebrow).toBe("Contact us");
  });

  it("returns consultation for interest=consultation", () => {
    const params = new URLSearchParams("interest=consultation");
    const ctx = resolveContactContext(params);

    expect(ctx.variant).toBe("consultation");
    expect(ctx.interest).toBe("consultation");
  });

  it("returns consultation for non-forge interest", () => {
    const params = new URLSearchParams("interest=general");
    const ctx = resolveContactContext(params);

    expect(ctx.variant).toBe("consultation");
  });

  describe("forge-trial", () => {
    it("returns forge trial context", () => {
      const params = new URLSearchParams("interest=forge-trial");
      const ctx = resolveContactContext(params);

      expect(ctx.variant).toBe("forge");
      expect(ctx.interest).toBe("forge-trial");
      expect(ctx.forge?.kind).toBe("trial");
      expect(ctx.page.eyebrow).toContain("Free trial");
    });

    it("includes plan info when plan param is provided", () => {
      const params = new URLSearchParams("interest=forge-trial&plan=starter");
      const ctx = resolveContactContext(params);

      expect(ctx.forge?.planId).toBe("starter");
      expect(ctx.forge?.planLabel).toBe("Starter");
      expect(ctx.forge?.summary).toContain("Starter");
    });

    it("includes billing info when billing param is provided", () => {
      const params = new URLSearchParams("interest=forge-trial&billing=yearly");
      const ctx = resolveContactContext(params);

      expect(ctx.forge?.billing).toBe("yearly");
      expect(ctx.forge?.summary).toContain("Yearly billing");
    });

    it("ignores invalid plan param", () => {
      const params = new URLSearchParams("interest=forge-trial&plan=invalid");
      const ctx = resolveContactContext(params);

      expect(ctx.forge?.planId).toBeUndefined();
    });
  });

  describe("forge-beta", () => {
    it("returns forge beta context", () => {
      const params = new URLSearchParams("interest=forge-beta");
      const ctx = resolveContactContext(params);

      expect(ctx.variant).toBe("forge");
      expect(ctx.interest).toBe("forge-beta");
      expect(ctx.forge?.kind).toBe("beta");
      expect(ctx.forge?.summary).toBe("Private Beta · Technical Demo");
      expect(ctx.page.eyebrow).toContain("Private Beta");
    });
  });

  describe("forge plan selection", () => {
    it("resolves forge-starter to plan context", () => {
      const params = new URLSearchParams("interest=forge-starter");
      const ctx = resolveContactContext(params);

      expect(ctx.variant).toBe("forge");
      expect(ctx.forge?.kind).toBe("plan");
      expect(ctx.forge?.planId).toBe("starter");
      expect(ctx.forge?.planLabel).toBe("Starter");
    });

    it("resolves forge-growth to plan context", () => {
      const params = new URLSearchParams("interest=forge-growth");
      const ctx = resolveContactContext(params);

      expect(ctx.forge?.planId).toBe("growth");
      expect(ctx.forge?.planLabel).toBe("Growth");
    });

    it("resolves forge-scale to plan context", () => {
      const params = new URLSearchParams("interest=forge-scale");
      const ctx = resolveContactContext(params);

      expect(ctx.forge?.planId).toBe("scale");
      expect(ctx.forge?.planLabel).toBe("Scale");
    });

    it("includes billing in summary for plan", () => {
      const params = new URLSearchParams("interest=forge-growth&billing=monthly");
      const ctx = resolveContactContext(params);

      expect(ctx.forge?.billing).toBe("monthly");
      expect(ctx.forge?.summary).toContain("Monthly billing");
    });

    it("handles unknown forge interest gracefully", () => {
      const params = new URLSearchParams("interest=forge-unknown");
      const ctx = resolveContactContext(params);

      expect(ctx.variant).toBe("forge");
      expect(ctx.forge?.kind).toBe("plan");
      expect(ctx.forge?.summary).toBe("Forge AI inquiry");
    });
  });

  describe("page copy structure", () => {
    it("consultation page has all required fields", () => {
      const params = new URLSearchParams("interest=consultation");
      const ctx = resolveContactContext(params);

      expect(ctx.page.eyebrow).toBeTruthy();
      expect(ctx.page.title).toBeTruthy();
      expect(ctx.page.description).toBeTruthy();
      expect(ctx.page.included.length).toBeGreaterThan(0);
      expect(ctx.page.formTitle).toBeTruthy();
      expect(ctx.page.formSubtitle).toBeTruthy();
      expect(ctx.page.submitLabel).toBeTruthy();
      expect(ctx.page.trustTitle).toBeTruthy();
      expect(ctx.page.trustBody).toBeTruthy();
    });

    it("forge trial page has all required fields", () => {
      const params = new URLSearchParams("interest=forge-trial");
      const ctx = resolveContactContext(params);

      expect(ctx.page.eyebrow).toBeTruthy();
      expect(ctx.page.title).toBeTruthy();
      expect(ctx.page.description).toBeTruthy();
      expect(ctx.page.included.length).toBeGreaterThan(0);
      expect(ctx.page.formTitle).toBeTruthy();
      expect(ctx.page.submitLabel).toBeTruthy();
    });
  });
});
