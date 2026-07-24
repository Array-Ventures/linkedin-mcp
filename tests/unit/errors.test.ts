import { describe, expect, it } from "vitest";
import { ConfigError, UnipileApiError, UsageError } from "../../src/core/errors.js";

describe("UnipileApiError", () => {
  it("formats provider 429 with retry-after as an actionable message", () => {
    const e = new UnipileApiError(429, "provider/too_many_requests", "Too many requests", undefined, "req_1", 3600);
    expect(e.message).toContain("LinkedIn action limit");
    expect(e.message).toContain("3600s");
    expect(e.message).toContain("pausing this action type");
    expect(e.retryAfterSeconds).toBe(3600);
  });

  it("formats unipile 429 without blaming LinkedIn", () => {
    const e = new UnipileApiError(429, "api/too_many_requests", "Too many requests", undefined, undefined, 30);
    expect(e.message).toContain("Unipile API rate limit");
    expect(e.message).not.toContain("LinkedIn action limit");
  });

  it("distinguishes 401 from 403 and keeps req_id", () => {
    const e401 = new UnipileApiError(401, "errors/invalid_credentials", "Unauthorized", undefined, "req_2", undefined);
    const e403 = new UnipileApiError(403, "errors/insufficient_permissions", "Forbidden", "Missing scope", "req_3", undefined);
    expect(e401.message).toContain("UNIPILE_API_KEY");
    expect(e403.message).toContain("permission");
    expect(e403.message).toContain("req_3");
  });

  it("mentions reconnecting for disconnected-account checkpoint errors", () => {
    const e = new UnipileApiError(422, "errors/disconnected_account", "Account disconnected", undefined, undefined, undefined);
    expect(e.message).toContain("Unipile dashboard");
  });
});

describe("plain errors", () => {
  it("exist with stable names", () => {
    expect(new ConfigError("x").name).toBe("ConfigError");
    expect(new UsageError("x").name).toBe("UsageError");
  });
});
