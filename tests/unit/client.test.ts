import { describe, expect, it, vi } from "vitest";
import { UnipileClient } from "../../src/core/client.js";
import { UnipileApiError } from "../../src/core/errors.js";

function fakeFetch(status: number, jsonBody: unknown, headers: Record<string, string> = {}) {
  return vi.fn(async () =>
    new Response(JSON.stringify(jsonBody), {
      status,
      headers: { "content-type": "application/json", ...headers },
    })
  );
}

describe("UnipileClient", () => {
  it("sends X-API-KEY, serializes query (arrays appended per item), returns JSON", async () => {
    const f = fakeFetch(200, { data: [], next_cursor: null });
    const client = new UnipileClient({ apiKey: "k1", fetchImpl: f as unknown as typeof fetch });
    const out = await client.request<{ data: unknown[] }>({
      method: "GET",
      path: "/v2/acc_1/chats",
      query: { limit: 10, is_unread: true, skip_me: undefined, with_sections: ["a", "b"] },
    });
    expect(out.data).toEqual([]);
    const [url, init] = f.mock.calls[0] as unknown as [URL, RequestInit];
    expect(String(url)).toBe(
      "https://api.unipile.com/v2/acc_1/chats?limit=10&is_unread=true&with_sections=a&with_sections=b"
    );
    expect((init.headers as Record<string, string>)["X-API-KEY"]).toBe("k1");
  });

  it("JSON-encodes bodies, including on DELETE", async () => {
    const f = fakeFetch(200, { object: "PostReactionRemoved" });
    const client = new UnipileClient({ apiKey: "k", fetchImpl: f as unknown as typeof fetch });
    await client.request({ method: "DELETE", path: "/v2/acc_1/posts/p1/reactions", body: { reaction: "linkedin_like" } });
    const [, init] = f.mock.calls[0] as unknown as [URL, RequestInit];
    expect(init.method).toBe("DELETE");
    expect(init.body).toBe('{"reaction":"linkedin_like"}');
    expect((init.headers as Record<string, string>)["content-type"]).toBe("application/json");
  });

  it("maps error bodies to UnipileApiError with retry-after", async () => {
    const f = fakeFetch(429, { type: "provider/too_many_requests", title: "Too many", detail: "slow down", req_id: "r9" }, { "retry-after": "120" });
    const client = new UnipileClient({ apiKey: "k", fetchImpl: f as unknown as typeof fetch });
    const err = (await client.request({ method: "GET", path: "/v2/acc_1/chats" }).catch((e) => e)) as UnipileApiError;
    expect(err).toBeInstanceOf(UnipileApiError);
    expect(err.status).toBe(429);
    expect(err.type).toBe("provider/too_many_requests");
    expect(err.reqId).toBe("r9");
    expect(err.retryAfterSeconds).toBe(120);
  });

  it("survives non-JSON error bodies", async () => {
    const f = vi.fn(async () => new Response("<html>gateway timeout</html>", { status: 504 }));
    const client = new UnipileClient({ apiKey: "k", fetchImpl: f as unknown as typeof fetch });
    const err = (await client.request({ method: "GET", path: "/x" }).catch((e) => e)) as UnipileApiError;
    expect(err).toBeInstanceOf(UnipileApiError);
    expect(err.status).toBe(504);
    expect(err.type).toBe("http/504");
  });

  it("rejects non-unipile.com base URLs unless explicitly allowed", () => {
    expect(() => new UnipileClient({ apiKey: "k", baseUrl: "https://evil.example.com" })).toThrow(/unipile\.com/);
    expect(() => new UnipileClient({ apiKey: "k", baseUrl: "http://api.unipile.com" })).toThrow(/HTTPS/);
    expect(
      () => new UnipileClient({ apiKey: "k", baseUrl: "https://evil.example.com", allowCustomBase: true })
    ).not.toThrow();
    expect(() => new UnipileClient({ apiKey: "k", baseUrl: "https://api3.unipile.com:13111" })).not.toThrow();
  });
});
