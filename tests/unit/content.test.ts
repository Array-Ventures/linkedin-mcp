import { describe, expect, it, vi } from "vitest";
import { z } from "zod";
import { UnipileClient } from "../../src/core/client.js";
import { deleteComment, deletePost, editComment, editPost, updateProfile } from "../../src/core/operations/content.js";
import { UsageError } from "../../src/core/errors.js";

function ctxCapturing(responses: Array<{ status?: number; body?: unknown }>) {
  let i = 0;
  const f = vi.fn(async () => {
    const r = responses[Math.min(i++, responses.length - 1)]!;
    return new Response(r.body === undefined ? null : JSON.stringify(r.body), { status: r.status ?? 200 });
  });
  return { ctx: { client: new UnipileClient({ apiKey: "k", fetchImpl: f as unknown as typeof fetch }), accountId: "acc_1" }, f };
}
const call = (f: ReturnType<typeof vi.fn>, n = 0) => {
  const [url, init] = f.mock.calls[n] as unknown as [URL, RequestInit];
  return { url: String(url), method: init.method, body: init.body === undefined ? undefined : JSON.parse(init.body as string) };
};

describe("content ops", () => {
  describe("editPost", () => {
    it("PATCHes only provided fields and returns the updated post", async () => {
      const { ctx, f } = ctxCapturing([{ body: { object: "Post", id: "p1", text: "updated" } }]);
      const out = await editPost.run(ctx, { post_id: "p1", text: "updated" });
      expect(call(f)).toMatchObject({ method: "PATCH", body: { text: "updated" } });
      expect(call(f).url).toBe("https://api.unipile.com/v2/acc_1/posts/p1");
      expect(out).toEqual({ item: { object: "Post", id: "p1", text: "updated" } });
    });

    it("accepts can_comment alone", async () => {
      const { ctx, f } = ctxCapturing([{ body: { object: "Post", id: "p1" } }]);
      await editPost.run(ctx, { post_id: "p1", can_comment: "relations_only" });
      expect(call(f).body).toEqual({ can_comment: "relations_only" });
    });

    it("rejects an empty patch with zero network calls", async () => {
      const { ctx, f } = ctxCapturing([{ body: {} }]);
      await expect(editPost.run(ctx, { post_id: "p1" })).rejects.toThrow(UsageError);
      expect(f).not.toHaveBeenCalled();
    });
  });

  describe("deletePost", () => {
    it("DELETEs with no body and returns deleted:true on 204", async () => {
      const { ctx, f } = ctxCapturing([{ status: 204 }]);
      const out = await deletePost.run(ctx, { post_id: "p1" });
      const [url, init] = f.mock.calls[0] as unknown as [URL, RequestInit];
      expect(String(url)).toBe("https://api.unipile.com/v2/acc_1/posts/p1");
      expect(init.method).toBe("DELETE");
      expect(init.body).toBeUndefined();
      expect(out).toEqual({ deleted: true });
    });
  });

  describe("editComment", () => {
    it("requires text and PATCHes the comment path", async () => {
      const { ctx, f } = ctxCapturing([{ body: { object: "Comment", id: "c1", text: "fixed" } }]);
      const out = await editComment.run(ctx, { post_id: "p1", comment_id: "c1", text: "fixed" });
      expect(call(f)).toMatchObject({ method: "PATCH", body: { text: "fixed" } });
      expect(call(f).url).toBe("https://api.unipile.com/v2/acc_1/posts/p1/comments/c1");
      expect(out).toEqual({ item: { object: "Comment", id: "c1", text: "fixed" } });
    });

    it("text is required in the input shape — unlike editPost, nothing else is editable (gotcha 13)", () => {
      const schema = z.object(editComment.inputShape);
      expect(schema.safeParse({ post_id: "p1", comment_id: "c1" }).success).toBe(false);
      expect(schema.safeParse({ post_id: "p1", comment_id: "c1", text: "fixed" }).success).toBe(true);
      // Contrast: editPost requires neither field individually (both optional; emptiness is
      // rejected at runtime by editPost.run instead, see the "rejects an empty patch" test above).
      expect(z.object(editPost.inputShape).safeParse({ post_id: "p1" }).success).toBe(true);
    });
  });

  describe("deleteComment", () => {
    it("DELETEs the comment path with no body", async () => {
      const { ctx, f } = ctxCapturing([{ status: 204 }]);
      const out = await deleteComment.run(ctx, { post_id: "p1", comment_id: "c1" });
      const [url, init] = f.mock.calls[0] as unknown as [URL, RequestInit];
      expect(String(url)).toBe("https://api.unipile.com/v2/acc_1/posts/p1/comments/c1");
      expect(init.method).toBe("DELETE");
      expect(init.body).toBeUndefined();
      expect(out).toEqual({ deleted: true });
    });
  });

  describe("updateProfile", () => {
    it("nests headline/postal_code under specifics.linkedin and keeps top-level fields flat", async () => {
      const { ctx, f } = ctxCapturing([{ body: { object: "UserProfileUpdated" } }]);
      const out = await updateProfile.run(ctx, {
        first_name: "Ada",
        last_name: "Lovelace",
        description: "Mathematician",
        location: "London",
        bio: "Countess of Lovelace",
        headline: "Analyst",
        postal_code: "SW1A",
      });
      expect(call(f)).toMatchObject({ method: "PATCH" });
      expect(call(f).url).toBe("https://api.unipile.com/v2/acc_1/users/me");
      expect(call(f).body).toEqual({
        first_name: "Ada",
        last_name: "Lovelace",
        description: "Mathematician",
        location: "London",
        bio: "Countess of Lovelace",
        specifics: { linkedin: { headline: "Analyst", postal_code: "SW1A" } },
      });
      expect(out).toEqual({
        result: "UserProfileUpdated",
        note: "Profile update accepted. Re-run linkedin_get_profile with user='me' to confirm what LinkedIn actually stored.",
      });
    });

    it("omits specifics entirely when only top-level fields are given", async () => {
      const { ctx, f } = ctxCapturing([{ body: { object: "UserProfileUpdated" } }]);
      await updateProfile.run(ctx, { first_name: "Ada" });
      expect(call(f).body).toEqual({ first_name: "Ada" });
    });

    it("nests only headline/postal_code with no top-level fields present", async () => {
      const { ctx, f } = ctxCapturing([{ body: { object: "UserProfileUpdated" } }]);
      await updateProfile.run(ctx, { headline: "Analyst" });
      expect(call(f).body).toEqual({ specifics: { linkedin: { headline: "Analyst" } } });
    });

    it("rejects when no field is provided, with zero network calls", async () => {
      const { ctx, f } = ctxCapturing([{ body: {} }]);
      await expect(updateProfile.run(ctx, {})).rejects.toThrow(UsageError);
      expect(f).not.toHaveBeenCalled();
    });
  });
});
