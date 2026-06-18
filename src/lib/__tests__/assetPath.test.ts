import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

describe("assetPath", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns path with base prefix in production without custom domain", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_CUSTOM_DOMAIN", "");
    const { assetPath } = await import("../assetPath");
    expect(assetPath("/images/logo.png")).toBe("/website2.0/images/logo.png");
  });

  it("returns bare path in production with custom domain", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_CUSTOM_DOMAIN", "true");
    const { assetPath } = await import("../assetPath");
    expect(assetPath("/images/logo.png")).toBe("/images/logo.png");
  });

  it("returns bare path in development", async () => {
    vi.stubEnv("NODE_ENV", "development");
    const { assetPath } = await import("../assetPath");
    expect(assetPath("/images/logo.png")).toBe("/images/logo.png");
  });

  it("normalizes paths without leading slash", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_CUSTOM_DOMAIN", "");
    const { assetPath } = await import("../assetPath");
    expect(assetPath("images/logo.png")).toBe("/website2.0/images/logo.png");
  });

  it("handles path already starting with slash in dev", async () => {
    vi.stubEnv("NODE_ENV", "development");
    const { assetPath } = await import("../assetPath");
    expect(assetPath("/favicon.ico")).toBe("/favicon.ico");
  });

  it("handles root path", async () => {
    vi.stubEnv("NODE_ENV", "development");
    const { assetPath } = await import("../assetPath");
    expect(assetPath("/")).toBe("/");
  });
});
