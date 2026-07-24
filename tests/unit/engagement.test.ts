import { describe, expect, it, vi } from "vitest";
import { UnipileClient } from "../../src/core/client.js";
import { UsageError } from "../../src/core/errors.js";
import {
  linkedinReact,
  linkedinReactToMessage,
  listFollowers,
  listReactions,
  listUserComments,
  listUserReactions,
} from "../../src/core/operations/engagement.js";

function ctxCapturing(responses: unknown[]) {
  let i = 0;
  const f = vi.fn(async () => new Response(JSON.stringify(responses[Math.min(i++, responses.length - 1)]), { status: 200 }));
  return { ctx: { client: new UnipileClient({ apiKey: "k", fetchImpl: f as unknown as typeof fetch }), accountId: "acc_1" }, f };
}
const call = (f: ReturnType<typeof vi.fn>, n = 0) => {
  const [url, init] = f.mock.calls[n] as unknown as [URL, RequestInit];
  return { url: String(url), method: init.method, body: init.body === undefined ? undefined : JSON.parse(init.body as string) };
};

describe("engagement ops", () => {
  describe("linkedinReact", () => {
    it("reacts to a post via POST and removes via DELETE with body", async () => {
      const a = ctxCapturing([{ object: "PostReactionAdded" }]);
      const out = await linkedinReact.run(a.ctx, { target: "post", post_id: "p1", reaction: "linkedin_like", action: "add" });
      expect(call(a.f)).toMatchObject({
        method: "POST",
        url: "https://api.unipile.com/v2/acc_1/posts/p1/reactions",
        body: { reaction: "linkedin_like" },
      });
      expect(out).toEqual({ result: "PostReactionAdded" });

      const b = ctxCapturing([{ object: "PostReactionRemoved" }]);
      await linkedinReact.run(b.ctx, { target: "post", post_id: "p1", reaction: "linkedin_like", action: "remove" });
      expect(call(b.f)).toMatchObject({
        method: "DELETE",
        url: "https://api.unipile.com/v2/acc_1/posts/p1/reactions",
        body: { reaction: "linkedin_like" },
      });
    });

    it("reacts to a comment via POST and removes via DELETE with body", async () => {
      const a = ctxCapturing([{ object: "CommentReactionAdded" }]);
      const out = await linkedinReact.run(a.ctx, {
        target: "comment",
        post_id: "p1",
        comment_id: "c1",
        reaction: "linkedin_celebrate",
        action: "add",
      });
      expect(call(a.f)).toMatchObject({
        method: "POST",
        url: "https://api.unipile.com/v2/acc_1/posts/p1/comments/c1/reactions",
        body: { reaction: "linkedin_celebrate" },
      });
      expect(out).toEqual({ result: "CommentReactionAdded" });

      const b = ctxCapturing([{ object: "CommentReactionRemoved" }]);
      await linkedinReact.run(b.ctx, {
        target: "comment",
        post_id: "p1",
        comment_id: "c1",
        reaction: "linkedin_celebrate",
        action: "remove",
      });
      expect(call(b.f)).toMatchObject({
        method: "DELETE",
        url: "https://api.unipile.com/v2/acc_1/posts/p1/comments/c1/reactions",
        body: { reaction: "linkedin_celebrate" },
      });
    });

    it("throws UsageError with zero fetch calls when comment_id is missing for target=comment", async () => {
      const { ctx, f } = ctxCapturing([{}]);
      await expect(
        linkedinReact.run(ctx, { target: "comment", post_id: "p1", reaction: "linkedin_like", action: "add" })
      ).rejects.toThrow(UsageError);
      expect(f).not.toHaveBeenCalled();
    });

    it("throws UsageError with zero fetch calls when comment_id is provided for target=post", async () => {
      const { ctx, f } = ctxCapturing([{}]);
      await expect(
        linkedinReact.run(ctx, { target: "post", post_id: "p1", comment_id: "c1", reaction: "linkedin_like", action: "add" })
      ).rejects.toThrow(UsageError);
      expect(f).not.toHaveBeenCalled();
    });
  });

  describe("linkedinReactToMessage", () => {
    it("sends a raw emoji reaction via POST and removes via DELETE with body", async () => {
      const a = ctxCapturing([{ object: "MessageReactionAdded" }]);
      const out = await linkedinReactToMessage.run(a.ctx, { chat_id: "chat1", message_id: "m1", reaction: "👍", action: "add" });
      expect(call(a.f)).toMatchObject({
        method: "POST",
        url: "https://api.unipile.com/v2/acc_1/chats/chat1/messages/m1/reactions",
        body: { reaction: "👍" },
      });
      expect(out).toEqual({ result: "MessageReactionAdded" });

      const b = ctxCapturing([{ object: "MessageReactionRemoved" }]);
      await linkedinReactToMessage.run(b.ctx, { chat_id: "chat1", message_id: "m1", reaction: "👍", action: "remove" });
      expect(call(b.f)).toMatchObject({
        method: "DELETE",
        url: "https://api.unipile.com/v2/acc_1/chats/chat1/messages/m1/reactions",
        body: { reaction: "👍" },
      });
    });
  });

  describe("listReactions", () => {
    it("routes target=post to /posts/{post_id}/reactions", async () => {
      const { ctx, f } = ctxCapturing([{ data: [] }]);
      await listReactions.run(ctx, { target: "post", post_id: "p1" });
      expect(call(f)).toMatchObject({ method: "GET", url: "https://api.unipile.com/v2/acc_1/posts/p1/reactions" });
    });

    it("routes target=comment to /posts/{post_id}/comments/{comment_id}/reactions", async () => {
      const { ctx, f } = ctxCapturing([{ data: [] }]);
      await listReactions.run(ctx, { target: "comment", post_id: "p1", comment_id: "c1" });
      expect(call(f)).toMatchObject({
        method: "GET",
        url: "https://api.unipile.com/v2/acc_1/posts/p1/comments/c1/reactions",
      });
    });

    it("routes target=message to /chats/{chat_id}/messages/{message_id}/reactions", async () => {
      const { ctx, f } = ctxCapturing([{ data: [] }]);
      await listReactions.run(ctx, { target: "message", chat_id: "chat1", message_id: "m1" });
      expect(call(f)).toMatchObject({
        method: "GET",
        url: "https://api.unipile.com/v2/acc_1/chats/chat1/messages/m1/reactions",
      });
    });

    it("throws UsageError with zero fetch calls when required ids are missing", async () => {
      const post = ctxCapturing([{}]);
      await expect(listReactions.run(post.ctx, { target: "post" })).rejects.toThrow(UsageError);
      expect(post.f).not.toHaveBeenCalled();

      const comment = ctxCapturing([{}]);
      await expect(listReactions.run(comment.ctx, { target: "comment", post_id: "p1" })).rejects.toThrow(UsageError);
      expect(comment.f).not.toHaveBeenCalled();

      const message = ctxCapturing([{}]);
      await expect(listReactions.run(message.ctx, { target: "message", chat_id: "chat1" })).rejects.toThrow(UsageError);
      expect(message.f).not.toHaveBeenCalled();
    });

    it("paginates via toPage", async () => {
      const { ctx, f } = ctxCapturing([{ data: [{ value: "linkedin_like" }], next_cursor: "abc", total_count: 1 }]);
      const out = await listReactions.run(ctx, { target: "post", post_id: "p1", limit: 5, cursor: "xyz" });
      expect(out).toEqual({ items: [{ value: "linkedin_like" }], next_cursor: "abc", total_count: 1 });
      const [url] = f.mock.calls[0] as unknown as [URL];
      expect(url.searchParams.get("limit")).toBe("5");
      expect(url.searchParams.get("cursor")).toBe("xyz");
    });
  });

  describe("listUserComments", () => {
    it("defaults user to me", async () => {
      const { ctx, f } = ctxCapturing([{ data: [] }]);
      await listUserComments.run(ctx, {});
      expect(call(f).url).toBe("https://api.unipile.com/v2/acc_1/users/me/comments");
    });

    it("uses a given user id", async () => {
      const { ctx, f } = ctxCapturing([{ data: [] }]);
      await listUserComments.run(ctx, { user: "u1" });
      expect(call(f).url).toBe("https://api.unipile.com/v2/acc_1/users/u1/comments");
    });
  });

  describe("listUserReactions", () => {
    it("defaults user to me", async () => {
      const { ctx, f } = ctxCapturing([{ data: [] }]);
      await listUserReactions.run(ctx, {});
      expect(call(f).url).toBe("https://api.unipile.com/v2/acc_1/users/me/reactions");
    });

    it("uses a given user id", async () => {
      const { ctx, f } = ctxCapturing([{ data: [] }]);
      await listUserReactions.run(ctx, { user: "u1" });
      expect(call(f).url).toBe("https://api.unipile.com/v2/acc_1/users/u1/reactions");
    });
  });

  describe("listFollowers", () => {
    it("routes direction=followers to /users/{user}/followers, defaulting user to me", async () => {
      const { ctx, f } = ctxCapturing([{ data: [] }]);
      await listFollowers.run(ctx, { direction: "followers" });
      expect(call(f).url).toBe("https://api.unipile.com/v2/acc_1/users/me/followers");
    });

    it("routes direction=following to /users/{user}/following with a given user", async () => {
      const { ctx, f } = ctxCapturing([{ data: [] }]);
      await listFollowers.run(ctx, { direction: "following", user: "u1" });
      expect(call(f).url).toBe("https://api.unipile.com/v2/acc_1/users/u1/following");
    });
  });
});
