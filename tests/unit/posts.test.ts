import { describe, expect, it, vi } from "vitest";
import { UnipileClient } from "../../src/core/client.js";
import { addComment, createPost, getPost, listComments, listPosts, reactToPost } from "../../src/core/operations/posts.js";

function ctxCapturing(responses: unknown[]) {
  let i = 0;
  const f = vi.fn(async () => new Response(JSON.stringify(responses[Math.min(i++, responses.length - 1)]), { status: 200 }));
  return { ctx: { client: new UnipileClient({ apiKey: "k", fetchImpl: f as unknown as typeof fetch }), accountId: "acc_1" }, f };
}
const call = (f: ReturnType<typeof vi.fn>, n = 0) => {
  const [url, init] = f.mock.calls[n] as unknown as [URL, RequestInit];
  return { url: String(url), method: init.method, body: init.body === undefined ? undefined : JSON.parse(init.body as string) };
};

describe("posts ops", () => {
  it("listPosts defaults user to me", async () => {
    const { ctx, f } = ctxCapturing([{ data: [] }]);
    await listPosts.run(ctx, {});
    expect(call(f).url).toBe("https://api.unipile.com/v2/acc_1/users/me/posts");
  });

  it("getPost wraps bare post as item", async () => {
    const { ctx } = ctxCapturing([{ object: "Post", id: "p1" }]);
    expect(await getPost.run((await Promise.resolve(ctx)), { post_id: "p1" })).toEqual({ item: { object: "Post", id: "p1" } });
  });

  it("createPost maps visibility/comment scope to can_read/can_comment", async () => {
    const { ctx, f } = ctxCapturing([{ object: "Post", id: "p2" }]);
    await createPost.run(ctx, { text: "hello", visibility: "relations_only", comment_scope: "no_one" });
    expect(call(f).body).toEqual({ text: "hello", can_read: "relations_only", can_comment: "no_one" });
  });

  it("listComments hits replies path when comment_id given", async () => {
    const a = ctxCapturing([{ data: [] }]);
    await listComments.run(a.ctx, { post_id: "p1" });
    expect(call(a.f).url).toBe("https://api.unipile.com/v2/acc_1/posts/p1/comments");

    const b = ctxCapturing([{ data: [] }]);
    await listComments.run(b.ctx, { post_id: "p1", comment_id: "c1" });
    expect(call(b.f).url).toBe("https://api.unipile.com/v2/acc_1/posts/p1/comments/c1/replies");
  });

  it("addComment posts top-level or as reply", async () => {
    const a = ctxCapturing([{ object: "Comment", id: "c1" }]);
    await addComment.run(a.ctx, { post_id: "p1", text: "nice" });
    expect(call(a.f)).toMatchObject({ method: "POST", body: { text: "nice" } });
    expect(call(a.f).url).toBe("https://api.unipile.com/v2/acc_1/posts/p1/comments");

    const b = ctxCapturing([{ object: "Comment", id: "c2" }]);
    await addComment.run(b.ctx, { post_id: "p1", text: "agree", reply_to: "c1" });
    expect(call(b.f).url).toBe("https://api.unipile.com/v2/acc_1/posts/p1/comments/c1");
  });

  it("reactToPost adds via POST and removes via DELETE with body", async () => {
    const a = ctxCapturing([{ object: "PostReactionAdded" }]);
    const out = await reactToPost.run(a.ctx, { post_id: "p1", reaction: "linkedin_like", action: "add" });
    expect(call(a.f)).toMatchObject({ method: "POST", body: { reaction: "linkedin_like" } });
    expect(out).toEqual({ result: "PostReactionAdded" });

    const b = ctxCapturing([{ object: "PostReactionRemoved" }]);
    await reactToPost.run(b.ctx, { post_id: "p1", reaction: "linkedin_like", action: "remove" });
    expect(call(b.f)).toMatchObject({ method: "DELETE", body: { reaction: "linkedin_like" } });
  });
});
