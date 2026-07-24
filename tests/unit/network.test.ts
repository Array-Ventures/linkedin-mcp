import { describe, expect, it, vi } from "vitest";
import { UnipileClient } from "../../src/core/client.js";
import {
  followUser, getCompany, getProfile, listConnections, listInvitations, respondInvitation, sendInvitation,
} from "../../src/core/operations/network.js";

function ctxCapturing(responses: unknown[]) {
  let i = 0;
  const f = vi.fn(async () => new Response(JSON.stringify(responses[Math.min(i++, responses.length - 1)]), { status: 200 }));
  return { ctx: { client: new UnipileClient({ apiKey: "k", fetchImpl: f as unknown as typeof fetch }), accountId: "acc_1" }, f };
}
const call = (f: ReturnType<typeof vi.fn>, n = 0) => {
  const [url, init] = f.mock.calls[n] as unknown as [URL, RequestInit];
  return { url: String(url), method: init.method, body: init.body === undefined ? undefined : JSON.parse(init.body as string) };
};

describe("network ops", () => {
  it("getProfile hits /users/{id} with sections and wraps item", async () => {
    const { ctx, f } = ctxCapturing([{ object: "UserProfile", id: "u1" }]);
    const out = await getProfile.run(ctx, { user: "me", sections: ["linkedin_experience"] });
    expect(call(f).url).toBe("https://api.unipile.com/v2/acc_1/users/me?with_sections=linkedin_experience");
    expect(out).toEqual({ item: { object: "UserProfile", id: "u1" } });
  });

  it("getCompany hits the linkedin company path", async () => {
    const { ctx, f } = ctxCapturing([{ object: "CompanyProfile", id: "co1" }]);
    await getCompany.run(ctx, { company: "co1" });
    expect(call(f).url).toBe("https://api.unipile.com/v2/acc_1/linkedin/company/co1");
  });

  it("listConnections defaults to me and forwards search", async () => {
    const { ctx, f } = ctxCapturing([{ data: [], next_cursor: null }]);
    await listConnections.run(ctx, { search: "jane" });
    expect(call(f).url).toBe("https://api.unipile.com/v2/acc_1/users/me/relations?search=jane");
  });

  it("listInvitations requires direction and maps to type param", async () => {
    const { ctx, f } = ctxCapturing([{ data: [] }]);
    await listInvitations.run(ctx, { direction: "received" });
    expect(call(f).url).toBe("https://api.unipile.com/v2/acc_1/users/me/relation-requests?type=received");
  });

  it("sendInvitation posts user_id + message", async () => {
    const { ctx, f } = ctxCapturing([{ object: "RelationRequest", id: "rr1", type: "sent" }]);
    const out = await sendInvitation.run(ctx, { user_id: "u2", message: "hi" });
    expect(call(f)).toMatchObject({ method: "POST", body: { user_id: "u2", message: "hi" } });
    expect(out).toEqual({ item: { object: "RelationRequest", id: "rr1", type: "sent" } });
  });

  it("respondInvitation maps accept->accept and decline/withdraw->cancel", async () => {
    const a = ctxCapturing([{ object: "RelationRequestConfirmed" }]);
    await respondInvitation.run(a.ctx, { request_id: "r1", action: "accept" });
    expect(call(a.f).url).toContain("/relation-requests/r1/accept");

    const b = ctxCapturing([{ object: "RelationRequestCanceled" }]);
    const out = await respondInvitation.run(b.ctx, { request_id: "r2", action: "withdraw" });
    expect(call(b.f).url).toContain("/relation-requests/r2/cancel");
    expect(out).toEqual({ result: "RelationRequestCanceled" });

    const c = ctxCapturing([{ object: "RelationRequestCanceled" }]);
    await respondInvitation.run(c.ctx, { request_id: "r3", action: "decline" });
    expect(call(c.f).url).toContain("/relation-requests/r3/cancel");
  });

  it("followUser maps follow/unfollow paths and wraps result", async () => {
    const a = ctxCapturing([{ object: "UserFollowed" }]);
    const out = await followUser.run(a.ctx, { user_id: "u3", action: "follow" });
    expect(call(a.f).url).toContain("/users/me/follow/u3");
    expect(out).toEqual({ item: { object: "UserFollowed" } });

    const b = ctxCapturing([{ object: "UserUnfollowed" }]);
    await followUser.run(b.ctx, { user_id: "u3", action: "unfollow" });
    expect(call(b.f).url).toContain("/users/me/unfollow/u3");
  });
});
