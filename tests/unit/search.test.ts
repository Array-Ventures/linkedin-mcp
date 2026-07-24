import { describe, expect, it, vi } from "vitest";
import { UnipileClient } from "../../src/core/client.js";
import { getSearchParameters, searchLinkedIn } from "../../src/core/operations/search.js";
import { whoami } from "../../src/core/operations/account.js";
import { UnipileApiError } from "../../src/core/errors.js";

function ctxCapturing(responses: Array<{ status?: number; body: unknown }>) {
  let i = 0;
  const f = vi.fn(async () => {
    const r = responses[Math.min(i++, responses.length - 1)]!;
    return new Response(JSON.stringify(r.body), { status: r.status ?? 200 });
  });
  return { ctx: { client: new UnipileClient({ apiKey: "k", fetchImpl: f as unknown as typeof fetch }), accountId: "acc_1" }, f };
}
const call = (f: ReturnType<typeof vi.fn>, n = 0) => {
  const [url, init] = f.mock.calls[n] as unknown as [URL, RequestInit];
  return { url: String(url), method: init.method, body: init.body === undefined ? undefined : JSON.parse(init.body as string) };
};

describe("search ops", () => {
  it("people search builds body with filters and advanced keywords", async () => {
    const { ctx, f } = ctxCapturing([{ body: { data: [], total_count: 0 } }]);
    await searchLinkedIn.run(ctx, {
      category: "people", keywords: "fintech", network_distance: [2], location: ["loc1"], title: "founder", limit: 10,
    });
    expect(call(f).url).toBe("https://api.unipile.com/v2/acc_1/linkedin/search/people?limit=10");
    expect(call(f).body).toEqual({
      keywords: "fintech", network_distance: [2], location: ["loc1"], advanced_keywords: { title: "founder" },
    });
  });

  it("posts search maps sort/date filters", async () => {
    const { ctx, f } = ctxCapturing([{ body: { data: [] } }]);
    await searchLinkedIn.run(ctx, { category: "posts", keywords: "ai", sort: "DATE", posted_within: "PAST_WEEK" });
    expect(call(f).url).toContain("/linkedin/search/posts");
    expect(call(f).body).toEqual({ keywords: "ai", sort_by: "DATE", date_posted: "PAST_WEEK" });
  });

  it("getSearchParameters forwards type and keywords", async () => {
    const { ctx, f } = ctxCapturing([{ body: { data: [{ object: "SearchParameter", id: "l1", name: "SF" }] } }]);
    const out = await getSearchParameters.run(ctx, { type: "LOCATION", keywords: "san francisco" });
    expect(call(f).url).toBe("https://api.unipile.com/v2/acc_1/linkedin/search/parameters?type=LOCATION&keywords=san+francisco");
    expect(out.items).toHaveLength(1);
  });
});

describe("whoami", () => {
  it("aggregates account + profile and tolerates missing inmail credits", async () => {
    const { ctx, f } = ctxCapturing([
      { body: { object: "Account", id: "acc_1", provider: "linkedin", status: "running" } },
      { body: { object: "UserProfile", id: "me1" } },
      { status: 403, body: { type: "errors/insufficient_permissions", title: "No InMail" } },
    ]);
    const out = await whoami.run(ctx, {});
    expect(out.account).toMatchObject({ id: "acc_1" });
    expect(out.profile).toMatchObject({ id: "me1" });
    expect(out.inmail_credits).toBeNull();
    expect(f).toHaveBeenCalledTimes(3);
  });

  it("still throws on non-UnipileApiError failures of credits call", async () => {
    const bad = { ctx: { client: { request: vi.fn().mockRejectedValue(new TypeError("boom")) } as never, accountId: "a" } };
    await expect(whoami.run(bad.ctx as never, {})).rejects.toThrow(TypeError);
  });

  it("tolerates the provider-capability 400 from non-LinkedIn-capable accounts", async () => {
    const { ctx } = ctxCapturing([
      { body: { object: "Account", id: "acc_1", provider: "mock", status: "running" } },
      { body: { object: "UserProfile", id: "me1" } },
      { status: 400, body: { type: "api/invalid_parameters", title: "Account provider does not support linkedin specific methods" } },
    ]);
    const out = await whoami.run(ctx, {});
    expect(out.inmail_credits).toBeNull();
  });

  it("does NOT swallow rate-limit failures of the credits call", async () => {
    const { ctx } = ctxCapturing([
      { body: { object: "Account", id: "acc_1", provider: "linkedin", status: "running" } },
      { body: { object: "UserProfile", id: "me1" } },
      { status: 429, body: { type: "api/too_many_requests", title: "Too many" } },
    ]);
    await expect(whoami.run(ctx, {})).rejects.toThrow(UnipileApiError);
  });
});
