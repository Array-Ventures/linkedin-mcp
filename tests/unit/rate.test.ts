import { describe, expect, it, vi } from "vitest";
import { UnipileClient } from "../../src/core/client.js";
import { rateInfo } from "../../src/core/rate.js";

function clientWithHeaders(headers: Record<string, string>, status = 200) {
  const f = vi.fn(async () => new Response(JSON.stringify({ data: [] }), { status, headers }));
  return new UnipileClient({ apiKey: "k", fetchImpl: f as unknown as typeof fetch });
}

describe("header brake", () => {
  it("captures x-ratelimit headers per path off successful responses", async () => {
    const client = clientWithHeaders({ "x-ratelimit-limit": "100", "x-ratelimit-remaining": "72", "x-ratelimit-reset": "86400" });
    await client.request({ method: "GET", path: "/v2/acc_1/chats" });
    const w = client.rateWindows.get("/v2/acc_1/chats")!;
    expect(w).toMatchObject({ limit: 100, remaining: 72, resetInSeconds: 86400, path: "/v2/acc_1/chats" });
    const info = rateInfo(client);
    expect(info).toMatchObject({ limit: 100, remaining: 72, reset_in_seconds: 86400, windows_tracked: 1 });
    expect(info?.warning).toBeUndefined();
  });

  it("captures headers even on 429 responses", async () => {
    const client = clientWithHeaders({ "x-ratelimit-limit": "50", "x-ratelimit-remaining": "0" }, 429);
    await client.request({ method: "GET", path: "/v2/acc_1/chats" }).catch(() => undefined);
    expect(client.rateWindows.get("/v2/acc_1/chats")).toMatchObject({ limit: 50, remaining: 0 });
  });

  it("reports the TIGHTEST window, not the most recent one", () => {
    const client = clientWithHeaders({});
    const now = 1_000_000;
    // Healthy window seen last; a nearly-exhausted one seen earlier must still win.
    client.rateWindows.set("/scarce", { limit: 100, remaining: 3, path: "/scarce", capturedAt: now });
    client.rateWindows.set("/roomy", { limit: 100, remaining: 98, path: "/roomy", capturedAt: now });
    const info = rateInfo(client, now)!;
    expect(info.path).toBe("/scarce");
    expect(info.remaining).toBe(3);
    expect(info.warning).toMatch(/Stop this action type/);
    expect(info.windows_tracked).toBe(2);
  });

  it("compares by fraction remaining, since windows have different sizes", () => {
    const client = clientWithHeaders({});
    const now = 1_000_000;
    client.rateWindows.set("/small", { limit: 10, remaining: 4, path: "/small", capturedAt: now }); // 40%
    client.rateWindows.set("/big", { limit: 1000, remaining: 50, path: "/big", capturedAt: now }); // 5%
    expect(rateInfo(client, now)!.path).toBe("/big");
  });

  it("counts down reset_in_seconds as time passes and drops elapsed windows", () => {
    const client = clientWithHeaders({});
    const t0 = 1_000_000;
    client.rateWindows.set("/w", { limit: 100, remaining: 50, resetInSeconds: 600, path: "/w", capturedAt: t0 });
    expect(rateInfo(client, t0 + 60_000)!.reset_in_seconds).toBe(540);
    // Once the window has elapsed its counter is meaningless — stop reporting it.
    expect(rateInfo(client, t0 + 601_000)).toBeUndefined();
  });

  it("warns at 10% remaining (min 2), telling agents to stop rather than spend", () => {
    const client = clientWithHeaders({});
    const now = 1_000_000;
    client.rateWindows.set("/p", { limit: 100, remaining: 10, path: "/p", capturedAt: now });
    expect(rateInfo(client, now)!.warning).toMatch(/Stop this action type/);
    client.rateWindows.set("/p", { limit: 100, remaining: 11, path: "/p", capturedAt: now });
    expect(rateInfo(client, now)!.warning).toBeUndefined();
    client.rateWindows.set("/p", { limit: 5, remaining: 2, path: "/p", capturedAt: now });
    expect(rateInfo(client, now)!.warning).toBeDefined();
  });

  it("returns undefined when no headers have been seen", () => {
    expect(rateInfo(clientWithHeaders({}))).toBeUndefined();
  });
});
