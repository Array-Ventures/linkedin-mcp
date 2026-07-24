import { describe, expect, it, vi } from "vitest";
import { UnipileClient } from "../../src/core/client.js";
import { getChat, listChats, listMessages, markChatRead, sendMessage, startChat } from "../../src/core/operations/messaging.js";
import { UsageError } from "../../src/core/errors.js";

function ctxCapturing(responses: unknown[]) {
  let i = 0;
  const f = vi.fn(async () => new Response(JSON.stringify(responses[Math.min(i++, responses.length - 1)]), { status: 200 }));
  return { ctx: { client: new UnipileClient({ apiKey: "k", fetchImpl: f as unknown as typeof fetch }), accountId: "acc_1" }, f };
}
const call = (f: ReturnType<typeof vi.fn>, n = 0) => {
  const [url, init] = f.mock.calls[n] as unknown as [URL, RequestInit];
  return { url: String(url), method: init.method, body: init.body === undefined ? undefined : JSON.parse(init.body as string) };
};

describe("messaging ops", () => {
  it("listChats reads from CLASSIC_PRIMARY inbox by default (LinkedIn 501s the generic /chats route)", async () => {
    const { ctx, f } = ctxCapturing([{ data: [{ id: "c1" }], next_cursor: "n1" }]);
    const out = await listChats.run(ctx, { unread: true, limit: 5 });
    expect(call(f)).toMatchObject({ method: "GET" });
    expect(call(f).url).toBe("https://api.unipile.com/v2/acc_1/inboxes/CLASSIC_PRIMARY/chats?is_unread=true&limit=5");
    expect(out).toEqual({ items: [{ id: "c1" }], next_cursor: "n1" });
  });

  it("listChats accepts an explicit inbox id", async () => {
    const { ctx, f } = ctxCapturing([{ data: [] }]);
    await listChats.run(ctx, { inbox: "CLASSIC_ARCHIVED" });
    expect(call(f).url).toBe("https://api.unipile.com/v2/acc_1/inboxes/CLASSIC_ARCHIVED/chats");
  });

  it("getChat requires exactly one of chat_id / user_id", async () => {
    const { ctx } = ctxCapturing([{ id: "c1", object: "Chat" }]);
    await expect(getChat.run(ctx, {})).rejects.toThrow(UsageError);
    await expect(getChat.run(ctx, { chat_id: "c", user_id: "u" })).rejects.toThrow(UsageError);
  });

  it("getChat by user hits /users/{id}/chat and wraps as item", async () => {
    const { ctx, f } = ctxCapturing([{ id: "c9", object: "Chat" }]);
    const out = await getChat.run(ctx, { user_id: "u1" });
    expect(call(f).url).toBe("https://api.unipile.com/v2/acc_1/users/u1/chat");
    expect(out).toEqual({ item: { id: "c9", object: "Chat" } });
  });

  it("sendMessage posts text and normalizes message_id union", async () => {
    const { ctx, f } = ctxCapturing([{ object: "MessageSent", message_id: null }]);
    const out = await sendMessage.run(ctx, { chat_id: "c1", text: "hi" });
    expect(call(f)).toMatchObject({ method: "POST", body: { text: "hi" } });
    expect(call(f).url).toBe("https://api.unipile.com/v2/acc_1/chats/c1/messages/send");
    expect(out).toEqual({ message_ids: [] });
  });

  it("startChat sends users_ids and classic inmail specifics", async () => {
    const { ctx, f } = ctxCapturing([{ object: "ChatStarted", chat_id: "c2", message_id: ["m1", "m2"] }]);
    const out = await startChat.run(ctx, { user_id: "u1", text: "hello", inmail: true });
    expect(call(f).body).toEqual({ text: "hello", users_ids: "u1", specifics: { linkedin: { classic: { inmail: true } } } });
    expect(out).toEqual({ chat_id: "c2", message_ids: ["m1", "m2"] });
  });

  it("startChat with subject uses sales_navigator specifics", async () => {
    const { ctx, f } = ctxCapturing([{ object: "ChatStarted", chat_id: "c3", message_id: "m1" }]);
    await startChat.run(ctx, { user_id: "u1", text: "hello", subject: "Intro" });
    expect(call(f).body.specifics).toEqual({ linkedin: { sales_navigator: { subject: "Intro" } } });
  });

  it("markChatRead PATCHes read_status", async () => {
    const { ctx, f } = ctxCapturing([{ object: "Chat", id: "c1" }]);
    const out = await markChatRead.run(ctx, { chat_id: "c1" });
    expect(call(f)).toMatchObject({ method: "PATCH", body: { read_status: true } });
    expect(out).toEqual({ result: "Chat" });
  });

  it("listMessages passes chat scoping", async () => {
    const { ctx, f } = ctxCapturing([{ data: [] }]);
    await listMessages.run(ctx, { chat_id: "c1", cursor: "x" });
    expect(call(f).url).toBe("https://api.unipile.com/v2/acc_1/chats/c1/messages?cursor=x");
  });

  it("startChat sends relation_request_id in classic specifics (required when replying to a pending invite)", async () => {
    const { ctx, f } = ctxCapturing([{ object: "ChatStarted", chat_id: "c4", message_id: "m1" }]);
    await startChat.run(ctx, { user_id: "u1", text: "hi", relation_request_id: "rr_9" });
    expect(call(f).body.specifics).toEqual({ linkedin: { classic: { relation_request_id: "rr_9" } } });
    const withInmail = ctxCapturing([{ object: "ChatStarted", chat_id: "c5", message_id: null }]);
    await startChat.run(withInmail.ctx, { user_id: "u1", text: "hi", inmail: true, relation_request_id: "rr_9" });
    expect(call(withInmail.f).body.specifics).toEqual({ linkedin: { classic: { inmail: true, relation_request_id: "rr_9" } } });
  });

  it("startChat rejects relation_request_id with a Sales Navigator subject", async () => {
    const { ctx, f } = ctxCapturing([{}]);
    await expect(
      startChat.run(ctx, { user_id: "u1", text: "x", subject: "Intro", relation_request_id: "rr_9" })
    ).rejects.toThrow(/classic/);
    expect(f).not.toHaveBeenCalled();
  });

  it("startChat rejects inmail+subject combination", async () => {
    const { ctx, f } = ctxCapturing([{ }]);
    await expect(startChat.run(ctx, { user_id: "u1", text: "x", inmail: true, subject: "Intro" })).rejects.toThrow(/not both/);
    expect(f).not.toHaveBeenCalled();
  });
});
