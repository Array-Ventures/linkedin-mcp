import { describe, expect, it, vi } from "vitest";
import { UnipileClient } from "../../src/core/client.js";
import { rateInfo } from "../../src/core/rate.js";

function clientWithHeaders(headers: Record<string, string>, status = 200) {
  const f = vi.fn(async () => new Response(JSON.stringify({ data: [] }), { status, headers }));
  return new UnipileClient({ apiKey: "k", fetchImpl: f as unknown as typeof fetch });
}

describe("header brake", () => {
  it("captures x-ratelimit headers off successful responses", async () => {
    const client = clientWithHeaders({ "x-ratelimit-limit": "100", "x-ratelimit-remaining": "72", "x-ratelimit-reset": "1753400000" });
    await client.request({ method: "GET", path: "/v2/acc_1/chats" });
    expect(client.lastRateLimit).toEqual({ limit: 100, remaining: 72, reset: "1753400000", path: "/v2/acc_1/chats" });
    const info = rateInfo(client);
    expect(info).toMatchObject({ limit: 100, remaining: 72 });
    expect(info?.warning).toBeUndefined();
  });

  it("captures headers even on 429 responses", async () => {
    const client = clientWithHeaders({ "x-ratelimit-limit": "50", "x-ratelimit-remaining": "0" }, 429);
    await client.request({ method: "GET", path: "/v2/acc_1/chats" }).catch(() => undefined);
    expect(client.lastRateLimit).toMatchObject({ limit: 50, remaining: 0 });
  });

  it("warns at 10% remaining (min 2), telling agents to stop, not spend", () => {
    const client = clientWithHeaders({});
    client.lastRateLimit = { limit: 100, remaining: 10, path: "/p" };
    expect(rateInfo(client)?.warning).toMatch(/Stop this action type/);
    client.lastRateLimit = { limit: 100, remaining: 11, path: "/p" };
    expect(rateInfo(client)?.warning).toBeUndefined();
    client.lastRateLimit = { limit: 5, remaining: 2, path: "/p" };
    expect(rateInfo(client)?.warning).toBeDefined();
  });

  it("returns undefined when no headers have been seen", () => {
    expect(rateInfo(clientWithHeaders({}))).toBeUndefined();
  });
});
