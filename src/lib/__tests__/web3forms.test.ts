import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { formDataToFields, submitToWeb3Forms } from "../web3forms";

describe("formDataToFields", () => {
  it("converts FormData to a plain object", () => {
    const fd = new FormData();
    fd.append("name", "Alice");
    fd.append("email", "alice@test.com");

    const result = formDataToFields(fd);
    expect(result).toEqual({ name: "Alice", email: "alice@test.com" });
  });

  it("excludes botcheck field", () => {
    const fd = new FormData();
    fd.append("name", "Bob");
    fd.append("botcheck", "spam");

    const result = formDataToFields(fd);
    expect(result).toEqual({ name: "Bob" });
    expect(result).not.toHaveProperty("botcheck");
  });

  it("excludes empty/whitespace-only string values", () => {
    const fd = new FormData();
    fd.append("name", "Charlie");
    fd.append("company", "   ");
    fd.append("notes", "");

    const result = formDataToFields(fd);
    expect(result).toEqual({ name: "Charlie" });
  });

  it("returns empty object for empty FormData", () => {
    const fd = new FormData();
    const result = formDataToFields(fd);
    expect(result).toEqual({});
  });
});

describe("submitToWeb3Forms", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  it("returns ok:true silently if botcheck is filled (honeypot)", async () => {
    const result = await submitToWeb3Forms({
      subject: "Test",
      form_type: "contact",
      source_page: "/contact",
      fields: { name: "Spammer" },
      botcheck: "filled",
    });

    expect(result).toEqual({ ok: true });
  });

  it("returns error when access key is missing", async () => {
    delete process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

    const result = await submitToWeb3Forms({
      subject: "Test",
      form_type: "contact",
      source_page: "/contact",
      fields: { name: "Alice" },
    });

    expect(result).toEqual({
      ok: false,
      message: "Form is not configured. Please email contact@o3xs.com directly.",
    });
  });

  it("sends correct payload and returns ok on success", async () => {
    process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY = "test-key";

    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    });
    vi.stubGlobal("fetch", mockFetch);

    const result = await submitToWeb3Forms({
      subject: "New Submission",
      form_type: "contact",
      source_page: "/contact",
      fields: { name: "Alice", email: "alice@test.com", message: "Hello" },
    });

    expect(result).toEqual({ ok: true });
    expect(mockFetch).toHaveBeenCalledOnce();

    const [url, options] = mockFetch.mock.calls[0];
    expect(url).toBe("https://api.web3forms.com/submit");
    expect(options.method).toBe("POST");

    const body = JSON.parse(options.body);
    expect(body.access_key).toBe("test-key");
    expect(body.subject).toBe("New Submission");
    expect(body.name).toBe("Alice");
    expect(body.email).toBe("alice@test.com");
    expect(body.from_name).toBe("Alice");
  });

  it("returns error message from API on failure response", async () => {
    process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY = "test-key";

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        json: () => Promise.resolve({ success: false, message: "Rate limited" }),
      }),
    );

    const result = await submitToWeb3Forms({
      subject: "Test",
      form_type: "contact",
      source_page: "/contact",
      fields: { name: "Alice" },
    });

    expect(result).toEqual({ ok: false, message: "Rate limited" });
  });

  it("returns generic error when API response has no message", async () => {
    process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY = "test-key";

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        json: () => Promise.resolve({ success: false }),
      }),
    );

    const result = await submitToWeb3Forms({
      subject: "Test",
      form_type: "contact",
      source_page: "/contact",
      fields: { name: "Alice" },
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.message).toContain("Something went wrong");
    }
  });

  it("returns network error on fetch exception", async () => {
    process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY = "test-key";

    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("Network failure")),
    );

    const result = await submitToWeb3Forms({
      subject: "Test",
      form_type: "contact",
      source_page: "/contact",
      fields: { name: "Alice" },
    });

    expect(result).toEqual({
      ok: false,
      message: "Network error. Please check your connection and try again.",
    });
  });
});
