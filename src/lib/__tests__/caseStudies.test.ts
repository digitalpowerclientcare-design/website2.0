import { describe, it, expect } from "vitest";
import {
  isVerticalId,
  isForgeUseCaseId,
  VERTICALS,
  FORGE_USE_CASES,
  CASE_STUDIES,
  VERTICAL_IDS,
  FORGE_USE_CASE_IDS,
} from "../caseStudies";

describe("isVerticalId", () => {
  it("returns true for valid vertical IDs", () => {
    expect(isVerticalId("automotive")).toBe(true);
    expect(isVerticalId("software")).toBe(true);
    expect(isVerticalId("healthcare")).toBe(true);
    expect(isVerticalId("finance")).toBe(true);
    expect(isVerticalId("infrastructure")).toBe(true);
    expect(isVerticalId("hospitality")).toBe(true);
  });

  it("returns false for invalid vertical IDs", () => {
    expect(isVerticalId("unknown")).toBe(false);
    expect(isVerticalId("")).toBe(false);
    expect(isVerticalId("AUTOMOTIVE")).toBe(false);
  });
});

describe("isForgeUseCaseId", () => {
  it("returns true for valid use case IDs", () => {
    expect(isForgeUseCaseId("custom-software")).toBe(true);
    expect(isForgeUseCaseId("crm")).toBe(true);
    expect(isForgeUseCaseId("erp")).toBe(true);
  });

  it("returns false for invalid use case IDs", () => {
    expect(isForgeUseCaseId("invalid")).toBe(false);
    expect(isForgeUseCaseId("")).toBe(false);
    expect(isForgeUseCaseId("CRM")).toBe(false);
  });
});

describe("constants integrity", () => {
  it("VERTICALS has correct number of entries", () => {
    expect(VERTICALS).toHaveLength(6);
  });

  it("VERTICAL_IDS matches VERTICALS", () => {
    expect(VERTICAL_IDS).toEqual(VERTICALS.map((v) => v.id));
  });

  it("FORGE_USE_CASES has correct number of entries", () => {
    expect(FORGE_USE_CASES).toHaveLength(3);
  });

  it("FORGE_USE_CASE_IDS matches FORGE_USE_CASES", () => {
    expect(FORGE_USE_CASE_IDS).toEqual(FORGE_USE_CASES.map((u) => u.id));
  });

  it("all case studies have required fields", () => {
    for (const cs of CASE_STUDIES) {
      expect(cs.id).toBeTruthy();
      expect(cs.title).toBeTruthy();
      expect(cs.engagement).toMatch(/^(consultation|forge)$/);
      expect(cs.improvements.length).toBeGreaterThan(0);
    }
  });

  it("consultation case studies have a vertical", () => {
    const consultationStudies = CASE_STUDIES.filter(
      (cs) => cs.engagement === "consultation",
    );
    for (const cs of consultationStudies) {
      expect(cs.vertical).toBeDefined();
      expect(isVerticalId(cs.vertical!)).toBe(true);
    }
  });

  it("forge case studies have a forgeUseCase", () => {
    const forgeStudies = CASE_STUDIES.filter(
      (cs) => cs.engagement === "forge",
    );
    for (const cs of forgeStudies) {
      expect(cs.forgeUseCase).toBeDefined();
      expect(isForgeUseCaseId(cs.forgeUseCase!)).toBe(true);
    }
  });
});
