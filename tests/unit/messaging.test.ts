import { describe, expect, it, vi } from "vitest";
import { UnipileClient } from "../../src/core/client.js";
import {
  deleteMessage,
  editMessage,
  forwardMessage,
  getChat,
  getMessage,
  listChats,
  listMessages,
  listParticipants,
  manageParticipants,
  markChatRead,
  markMessageRead,
  sendMessage,
  startChat,
} from "../../src/core/operations/messaging.js";
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
  const INBOXES = {
    data: [
      { object: "Inbox", id: "CLASSIC_ARCHIVED", disabled: false },
      { object: "Inbox", id: "CLASSIC_PRIMARY", disabled: false },
    ],
  };

  it("listChats auto-discovers inboxes and prefers CLASSIC_PRIMARY (LinkedIn 501s the generic /chats route)", async () => {
    const { ctx, f } = ctxCapturing([INBOXES, { data: [{ id: "c1" }], next_cursor: "n1" }]);
    const out = await listChats.run(ctx, { limit: 5 });
    expect(call(f, 0).url).toBe("https://api.unipile.com/v2/acc_1/inboxes");
    expect(call(f, 1).url).toBe("https://api.unipile.com/v2/acc_1/inboxes/CLASSIC_PRIMARY/chats?limit=5");
    expect(out).toEqual({ items: [{ id: "c1" }], next_cursor: "n1" });
  });

  it("listChats caches inbox discovery across calls on the same client", async () => {
    const { ctx, f } = ctxCapturing([INBOXES, { data: [] }, { data: [] }]);
    await listChats.run(ctx, {});
    await listChats.run(ctx, {});
    const urls = f.mock.calls.map((c) => String((c as unknown as [URL])[0]));
    expect(urls.filter((u) => u.endsWith("/inboxes"))).toHaveLength(1);
    expect(urls.filter((u) => u.includes("/inboxes/CLASSIC_PRIMARY/chats"))).toHaveLength(2);
  });

  it("listChats accepts an explicit inbox id without discovery", async () => {
    const { ctx, f } = ctxCapturing([{ data: [] }]);
    await listChats.run(ctx, { inbox: "CLASSIC_ARCHIVED" });
    expect(f).toHaveBeenCalledTimes(1);
    expect(call(f).url).toBe("https://api.unipile.com/v2/acc_1/inboxes/CLASSIC_ARCHIVED/chats");
  });

  it("listChats falls back to the generic route for providers without inboxes", async () => {
    let first = true;
    const f = vi.fn(async () => {
      if (first) {
        first = false;
        return new Response(
          JSON.stringify({ type: "api/invalid_parameters", title: "Account provider does not support linkedin specific methods" }),
          { status: 400 }
        );
      }
      return new Response(JSON.stringify({ data: [] }), { status: 200 });
    });
    const ctx = { client: new UnipileClient({ apiKey: "k", fetchImpl: f as unknown as typeof fetch }), accountId: "acc_1" };
    const out = await listChats.run(ctx, {});
    expect(out).toEqual({ items: [] });
    expect(String((f.mock.calls[1] as unknown as [URL])[0])).toBe("https://api.unipile.com/v2/acc_1/chats");
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

  it("startChat with subject preflights product access then uses sales_navigator specifics", async () => {
    const { ctx, f } = ctxCapturing([
      { object: "Account", id: "acc_1", metadata: { products_connection_status: { classic: "running", sales_navigator: "running" } } },
      { object: "ChatStarted", chat_id: "c3", message_id: "m1" },
    ]);
    await startChat.run(ctx, { user_id: "u1", text: "hello", subject: "Intro" });
    expect(call(f, 0).url).toBe("https://api.unipile.com/v2/accounts/acc_1");
    expect(call(f, 1).body.specifics).toEqual({ linkedin: { sales_navigator: { subject: "Intro" } } });
  });

  it("startChat rejects a Sales Navigator subject when the product is not connected", async () => {
    const { ctx, f } = ctxCapturing([
      { object: "Account", id: "acc_1", metadata: { products_connection_status: { classic: "running" } } },
    ]);
    await expect(startChat.run(ctx, { user_id: "u1", text: "hello", subject: "Intro" })).rejects.toThrow(
      /Sales Navigator is not connected/
    );
    expect(f).toHaveBeenCalledTimes(1); // only the product preflight — no send happened
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

  it("startChat sends to the inbox-scoped route when inbox is provided", async () => {
    const { ctx, f } = ctxCapturing([{ object: "ChatStarted", chat_id: "c6", message_id: "m1" }]);
    const out = await startChat.run(ctx, { user_id: "u1", text: "hi", inbox: "SN_INBOX_1" });
    expect(call(f).url).toBe("https://api.unipile.com/v2/acc_1/inboxes/SN_INBOX_1/chats/send");
    expect(call(f).method).toBe("POST");
    expect(out).toEqual({ chat_id: "c6", message_ids: ["m1"] });
  });

  it("getMessage fetches by chat_id and message_id and wraps as item", async () => {
    const { ctx, f } = ctxCapturing([{ id: "m1", object: "Message" }]);
    const out = await getMessage.run(ctx, { chat_id: "c1", message_id: "m1" });
    expect(call(f)).toMatchObject({ method: "GET" });
    expect(call(f).url).toBe("https://api.unipile.com/v2/acc_1/chats/c1/messages/m1");
    expect(out).toEqual({ item: { id: "m1", object: "Message" } });
  });

  it("deleteMessage sends DELETE and returns deleted:true on 204 no-content", async () => {
    const f = vi.fn(async () => new Response(null, { status: 204 }));
    const ctx = { client: new UnipileClient({ apiKey: "k", fetchImpl: f as unknown as typeof fetch }), accountId: "acc_1" };
    const out = await deleteMessage.run(ctx, { chat_id: "c1", message_id: "m1" });
    expect(call(f)).toMatchObject({ method: "DELETE" });
    expect(call(f).url).toBe("https://api.unipile.com/v2/acc_1/chats/c1/messages/m1");
    expect(out).toEqual({ deleted: true });
  });

  it("markMessageRead POSTs to .../read and returns the result object (does not touch chat unread state)", async () => {
    const { ctx, f } = ctxCapturing([{ object: "MessageRead" }]);
    const out = await markMessageRead.run(ctx, { chat_id: "c1", message_id: "m1" });
    expect(call(f)).toMatchObject({ method: "POST", body: undefined });
    expect(call(f).url).toBe("https://api.unipile.com/v2/acc_1/chats/c1/messages/m1/read");
    expect(out).toEqual({ result: "MessageRead" });
  });

  it("forwardMessage POSTs destination chat_id and returns a plain-string message_id (not the union used by send/start)", async () => {
    const { ctx, f } = ctxCapturing([{ object: "MessageForwarded", message_id: "m2", chat_id: "c2" }]);
    const out = await forwardMessage.run(ctx, { chat_id: "c1", message_id: "m1", destination_chat_id: "c2", text: "fyi" });
    expect(call(f)).toMatchObject({ method: "POST", body: { chat_id: "c2", text: "fyi" } });
    expect(call(f).url).toBe("https://api.unipile.com/v2/acc_1/chats/c1/messages/m1/forward");
    expect(out).toEqual({ message_id: "m2", chat_id: "c2" });
    expect(typeof out.message_id).toBe("string");
  });

  it("editMessage POSTs text to .../modify and is null-tolerant on the response", async () => {
    const { ctx, f } = ctxCapturing([null]);
    const out = await editMessage.run(ctx, { chat_id: "c1", message_id: "m1", text: "updated" });
    expect(call(f)).toMatchObject({ method: "POST", body: { text: "updated" } });
    expect(call(f).url).toBe("https://api.unipile.com/v2/acc_1/chats/c1/messages/m1/modify");
    expect(out).toEqual({ item: null });
  });

  it("editMessage returns the updated message when the API does provide one", async () => {
    const { ctx } = ctxCapturing([{ id: "m1", object: "Message", text: "updated" }]);
    const out = await editMessage.run(ctx, { chat_id: "c1", message_id: "m1", text: "updated" });
    expect(out).toEqual({ item: { id: "m1", object: "Message", text: "updated" } });
  });

  it("listParticipants paginates a group chat's participants", async () => {
    const { ctx, f } = ctxCapturing([{ data: [{ object: "GroupParticipant", is_self: true, is_admin: false, user: { id: "u1" } }], next_cursor: "n1" }]);
    const out = await listParticipants.run(ctx, { chat_id: "c1", cursor: "x" });
    expect(call(f)).toMatchObject({ method: "GET" });
    expect(call(f).url).toBe("https://api.unipile.com/v2/acc_1/chats/c1/participants?cursor=x");
    expect(out).toEqual({ items: [{ object: "GroupParticipant", is_self: true, is_admin: false, user: { id: "u1" } }], next_cursor: "n1" });
  });

  it("manageParticipants add POSTs to /participants with a user_id body", async () => {
    const { ctx, f } = ctxCapturing([{ object: "ParticipantAdded" }]);
    const out = await manageParticipants.run(ctx, { chat_id: "c1", action: "add", user_id: "u1" });
    expect(call(f)).toMatchObject({ method: "POST", body: { user_id: "u1" } });
    expect(call(f).url).toBe("https://api.unipile.com/v2/acc_1/chats/c1/participants");
    expect(out).toEqual({ result: "ParticipantAdded" });
  });

  it("manageParticipants remove DELETEs to /participants/{user_id} with no body", async () => {
    const { ctx, f } = ctxCapturing([{ object: "ParticipantRemoved" }]);
    const out = await manageParticipants.run(ctx, { chat_id: "c1", action: "remove", user_id: "u1" });
    expect(call(f)).toMatchObject({ method: "DELETE", body: undefined });
    expect(call(f).url).toBe("https://api.unipile.com/v2/acc_1/chats/c1/participants/u1");
    expect(out).toEqual({ result: "ParticipantRemoved" });
  });
});
