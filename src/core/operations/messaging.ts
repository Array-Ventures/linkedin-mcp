import { z } from "zod";
import { UsageError } from "../errors.js";
import { resolveDefaultInbox } from "../inboxes.js";
import { getAccountProducts } from "../accounts.js";
import { defineOperation } from "./types.js";
import { cursorPagination, itemOutputShape, pageOutputShape, toIdArray, toPage } from "./shared.js";
import type { ListEnvelope } from "./shared.js";

import { READ_ANNOTATIONS as READ, WRITE_ANNOTATIONS as WRITE } from "./shared.js";

export const listChats = defineOperation({
  name: "linkedin_list_chats",
  title: "List LinkedIn chats",
  description:
    "List LinkedIn conversations from one inbox, most recent first (LinkedIn requires inbox-scoped listing). Default inbox CLASSIC_PRIMARY; others: CLASSIC_ARCHIVED, CLASSIC_SPAM, CLASSIC_JOBS, plus Sales Navigator/Recruiter inboxes when subscribed. LinkedIn cannot filter by unread server-side — check each returned chat's unread_count (0 = read, >0 = unread messages, -1 = manually marked unread) and paginate with cursor as needed. Returned chat ids feed linkedin_list_messages / linkedin_send_message.",
  mutates: false,
  inputShape: {
    inbox: z
      .string()
      .min(1)
      .optional()
      .describe("Inbox id to read from. Omit to auto-discover (prefers CLASSIC_PRIMARY). Available inboxes are listed by linkedin_whoami (e.g. CLASSIC_ARCHIVED, CLASSIC_JOBS, Sales Navigator/Recruiter inboxes)"),
    ...cursorPagination,
  },
  outputShape: pageOutputShape,
  annotations: READ,
  cli: { group: "chats", command: "list" },
  run: async ({ client, accountId }, input) => {
    // LinkedIn requires inbox-scoped listing; providers without inboxes use the generic route.
    const inbox = (input.inbox as string | undefined) ?? (await resolveDefaultInbox(client, accountId));
    const path =
      inbox === null || inbox === undefined
        ? `/v2/${accountId}/chats`
        : `/v2/${accountId}/inboxes/${encodeURIComponent(inbox)}/chats`;
    return toPage(
      await client.request<ListEnvelope>({
        method: "GET",
        path,
        query: { limit: input.limit as number | undefined, cursor: input.cursor as string | undefined },
      })
    );
  },
});

export const getChat = defineOperation({
  name: "linkedin_get_chat",
  title: "Get a LinkedIn chat",
  description:
    "Fetch one conversation, either by chat_id or as the 1-to-1 chat with a given user_id (exactly one of the two must be provided).",
  mutates: false,
  inputShape: {
    chat_id: z.string().min(1).optional().describe("Chat id"),
    user_id: z.string().min(1).optional().describe("User provider id — returns your 1-to-1 chat with them"),
  },
  outputShape: itemOutputShape,
  annotations: READ,
  cli: { group: "chats", command: "get" },
  run: async ({ client, accountId }, input) => {
    const chatId = input.chat_id as string | undefined;
    const userId = input.user_id as string | undefined;
    if ((chatId === undefined) === (userId === undefined)) {
      throw new UsageError("Provide exactly one of chat_id or user_id.");
    }
    const path = chatId !== undefined
      ? `/v2/${accountId}/chats/${encodeURIComponent(chatId)}`
      : `/v2/${accountId}/users/${encodeURIComponent(userId!)}/chat`;
    return { item: await client.request<Record<string, unknown>>({ method: "GET", path }) };
  },
});

export const listMessages = defineOperation({
  name: "linkedin_list_messages",
  title: "List messages in a chat",
  description: "List the messages of one LinkedIn conversation, newest first.",
  mutates: false,
  inputShape: { chat_id: z.string().min(1).describe("Chat id from linkedin_list_chats"), ...cursorPagination },
  outputShape: pageOutputShape,
  annotations: READ,
  cli: { group: "messages", command: "list" },
  run: async ({ client, accountId }, input) =>
    toPage(
      await client.request<ListEnvelope>({
        method: "GET",
        path: `/v2/${accountId}/chats/${encodeURIComponent(input.chat_id as string)}/messages`,
        query: { limit: input.limit as number | undefined, cursor: input.cursor as string | undefined },
      })
    ),
});

export const sendMessage = defineOperation({
  name: "linkedin_send_message",
  title: "Send a message in an existing chat",
  description:
    "Send a plain-text message into an EXISTING LinkedIn conversation (chat_id required). To message someone you have no conversation with yet, use linkedin_start_chat. This acts as the account owner — pace outbound messages.",
  mutates: true,
  inputShape: {
    chat_id: z.string().min(1).describe("Existing chat id"),
    text: z.string().min(1).describe("Plain text only — LinkedIn renders no HTML/Markdown"),
    quote_id: z.string().optional().describe("Message id to quote/reply to"),
  },
  outputShape: { message_ids: z.array(z.string()) },
  annotations: WRITE,
  cli: { group: "messages", command: "send" },
  run: async ({ client, accountId }, input) => {
    const body: Record<string, unknown> = { text: input.text };
    if (input.quote_id !== undefined) body.quote_id = input.quote_id;
    const res = await client.request<{ message_id: string | string[] | null }>({
      method: "POST",
      path: `/v2/${accountId}/chats/${encodeURIComponent(input.chat_id as string)}/messages/send`,
      body,
    });
    return { message_ids: toIdArray(res.message_id) };
  },
});

export const startChat = defineOperation({
  name: "linkedin_start_chat",
  title: "Start a new LinkedIn conversation",
  description:
    "Open a NEW conversation with a user by sending the first message. Set inmail=true to send as InMail (requires credits — check linkedin_whoami). A subject switches to a Sales Navigator InMail. This is outbound outreach acting as the account owner — use sparingly and pace actions.",
  mutates: true,
  inputShape: {
    user_id: z.string().min(1).describe("Provider id of the user to contact (from search or profile)"),
    text: z.string().min(1).describe("First message text (plain text)"),
    inmail: z.boolean().optional().describe("Send as classic InMail instead of a normal message"),
    subject: z.string().optional().describe("Sales Navigator InMail subject (implies Sales Navigator sending). Cannot be combined with inmail."),
    relation_request_id: z
      .string()
      .min(1)
      .optional()
      .describe("REQUIRED when messaging a user who sent you a pending connection request — the invitation id from linkedin_list_invitations (direction=received)"),
    inbox: z.string().min(1).optional().describe("Inbox id to send from (e.g. a Sales Navigator/Recruiter inbox). Omit to use the default chats/send route."),
  },
  outputShape: { chat_id: z.string(), message_ids: z.array(z.string()) },
  annotations: WRITE,
  cli: { group: "chats", command: "start" },
  run: async ({ client, accountId }, input) => {
    if (input.subject !== undefined && input.inmail === true) {
      throw new UsageError("Pass either inmail (classic InMail) or subject (Sales Navigator InMail), not both.");
    }
    if (input.subject !== undefined && input.relation_request_id !== undefined) {
      throw new UsageError("relation_request_id applies to classic messages and cannot be combined with a Sales Navigator subject.");
    }
    const body: Record<string, unknown> = { text: input.text, users_ids: input.user_id };
    if (input.subject !== undefined) {
      // Preflight: fail fast with a clear message when Sales Navigator is not connected.
      const products = await getAccountProducts(client, accountId);
      if (products !== null && products.sales_navigator !== "running") {
        throw new UsageError(
          `Sales Navigator is not connected on this account (connected products: ${Object.keys(products).join(", ") || "none"}). Send a classic message or InMail instead.`
        );
      }
      body.specifics = { linkedin: { sales_navigator: { subject: input.subject } } };
    } else {
      const classic: Record<string, unknown> = {};
      if (input.inmail === true) classic.inmail = true;
      if (input.relation_request_id !== undefined) classic.relation_request_id = input.relation_request_id;
      if (Object.keys(classic).length > 0) body.specifics = { linkedin: { classic } };
    }
    const inbox = input.inbox as string | undefined;
    const path =
      inbox !== undefined
        ? `/v2/${accountId}/inboxes/${encodeURIComponent(inbox)}/chats/send`
        : `/v2/${accountId}/chats/send`;
    const res = await client.request<{ chat_id: string; message_id: string | string[] | null }>({
      method: "POST",
      path,
      body,
    });
    return { chat_id: res.chat_id, message_ids: toIdArray(res.message_id) };
  },
});

export const markChatRead = defineOperation({
  name: "linkedin_mark_chat_read",
  title: "Mark a chat as read",
  description: "Mark a LinkedIn conversation as read (clears its unread state for the account owner).",
  mutates: true,
  inputShape: { chat_id: z.string().min(1).describe("Chat id to mark read") },
  outputShape: { result: z.string() },
  annotations: WRITE,
  cli: { group: "chats", command: "read" },
  run: async ({ client, accountId }, input) => {
    const res = await client.request<{ object: string }>({
      method: "PATCH",
      path: `/v2/${accountId}/chats/${encodeURIComponent(input.chat_id as string)}`,
      body: { read_status: true },
    });
    return { result: res.object };
  },
});

export const getMessage = defineOperation({
  name: "linkedin_get_message",
  title: "Get a single message",
  description: "Fetch one message from a chat by chat_id and message_id.",
  mutates: false,
  inputShape: {
    chat_id: z.string().min(1).describe("Chat id containing the message"),
    message_id: z.string().min(1).describe("Message id from linkedin_list_messages"),
  },
  outputShape: itemOutputShape,
  annotations: READ,
  cli: { group: "messages", command: "get" },
  run: async ({ client, accountId }, input) => ({
    item: await client.request<Record<string, unknown>>({
      method: "GET",
      path: `/v2/${accountId}/chats/${encodeURIComponent(input.chat_id as string)}/messages/${encodeURIComponent(input.message_id as string)}`,
    }),
  }),
});

export const deleteMessage = defineOperation({
  name: "linkedin_delete_message",
  title: "Delete a message",
  description:
    "Delete one of YOUR OWN messages from a chat. Trying to delete another user's message fails. Depending on the provider, the message may still be visible to participants as a 'deleted' tombstone rather than fully removed.",
  mutates: true,
  inputShape: {
    chat_id: z.string().min(1).describe("Chat id containing the message"),
    message_id: z.string().min(1).describe("Message id to delete (must be your own)"),
  },
  outputShape: { deleted: z.boolean() },
  annotations: WRITE,
  cli: { group: "messages", command: "delete" },
  run: async ({ client, accountId }, input) => {
    await client.request<undefined>({
      method: "DELETE",
      path: `/v2/${accountId}/chats/${encodeURIComponent(input.chat_id as string)}/messages/${encodeURIComponent(input.message_id as string)}`,
    });
    return { deleted: true };
  },
});

export const markMessageRead = defineOperation({
  name: "linkedin_mark_message_read",
  title: "Mark a message as read",
  description:
    "Mark a message sent by ANOTHER user as read by you. Trying to mark your OWN message as read fails. This does NOT change the chat's unread_count — use linkedin_mark_chat_read to update the chat-level read state.",
  mutates: true,
  inputShape: {
    chat_id: z.string().min(1).describe("Chat id containing the message"),
    message_id: z.string().min(1).describe("Message id to mark read (must belong to another user)"),
  },
  outputShape: { result: z.string() },
  annotations: WRITE,
  cli: { group: "messages", command: "read" },
  run: async ({ client, accountId }, input) => {
    const res = await client.request<{ object: string }>({
      method: "POST",
      path: `/v2/${accountId}/chats/${encodeURIComponent(input.chat_id as string)}/messages/${encodeURIComponent(input.message_id as string)}/read`,
    });
    return { result: res.object };
  },
});

export const forwardMessage = defineOperation({
  name: "linkedin_forward_message",
  title: "Forward a message to another chat",
  description:
    "Forward an existing message into a different (destination) chat, with an optional extra text attached. Acts as the account owner — user-visible in the destination chat.",
  mutates: true,
  inputShape: {
    chat_id: z.string().min(1).describe("Chat id currently containing the message"),
    message_id: z.string().min(1).describe("Message id to forward"),
    destination_chat_id: z.string().min(1).describe("Chat id to forward the message into"),
    text: z.string().optional().describe("Optional text attached to the forwarded message"),
  },
  outputShape: { message_id: z.string(), chat_id: z.string() },
  annotations: WRITE,
  cli: { group: "messages", command: "forward" },
  run: async ({ client, accountId }, input) => {
    const body: Record<string, unknown> = { chat_id: input.destination_chat_id };
    if (input.text !== undefined) body.text = input.text;
    // NOTE: unlike sendMessage/startChat, forwardMessage's message_id is a plain required
    // string in the API response, not the string | string[] | null union — do not reuse toIdArray here.
    const res = await client.request<{ message_id: string; chat_id: string }>({
      method: "POST",
      path: `/v2/${accountId}/chats/${encodeURIComponent(input.chat_id as string)}/messages/${encodeURIComponent(input.message_id as string)}/forward`,
      body,
    });
    return { message_id: res.message_id, chat_id: res.chat_id };
  },
});

export const editMessage = defineOperation({
  name: "linkedin_edit_message",
  title: "Edit a message",
  description:
    "Edit the text of one of YOUR OWN messages. Same ownership restriction as delete — editing another user's message fails. The API does not guarantee the updated message back; the item may be null even on success.",
  mutates: true,
  inputShape: {
    chat_id: z.string().min(1).describe("Chat id containing the message"),
    message_id: z.string().min(1).describe("Message id to edit (must be your own)"),
    text: z.string().min(1).describe("New plain-text message body"),
  },
  outputShape: { item: z.record(z.unknown()).nullable() },
  annotations: WRITE,
  cli: { group: "messages", command: "edit" },
  run: async ({ client, accountId }, input) => {
    const res = await client.request<Record<string, unknown> | null>({
      method: "POST",
      path: `/v2/${accountId}/chats/${encodeURIComponent(input.chat_id as string)}/messages/${encodeURIComponent(input.message_id as string)}/modify`,
      body: { text: input.text },
    });
    return { item: res ?? null };
  },
});

export const listParticipants = defineOperation({
  name: "linkedin_list_participants",
  title: "List participants in a group chat",
  description:
    "List the participants of a GROUP chat. Fails on 1-to-1 chats — for those, the other participant is already on the chat object itself, via linkedin_get_chat.",
  mutates: false,
  inputShape: { chat_id: z.string().min(1).describe("Group chat id"), ...cursorPagination },
  outputShape: pageOutputShape,
  annotations: READ,
  cli: { group: "participants", command: "list" },
  run: async ({ client, accountId }, input) =>
    toPage(
      await client.request<ListEnvelope>({
        method: "GET",
        path: `/v2/${accountId}/chats/${encodeURIComponent(input.chat_id as string)}/participants`,
        query: { limit: input.limit as number | undefined, cursor: input.cursor as string | undefined },
      })
    ),
});

export const manageParticipants = defineOperation({
  name: "linkedin_manage_participants",
  title: "Add or remove a group chat participant",
  description:
    "Add or remove a participant in a GROUP chat. May require admin rights or provider-specific permissions. Fails on 1-to-1 chats.",
  mutates: true,
  inputShape: {
    chat_id: z.string().min(1).describe("Group chat id"),
    action: z.enum(["add", "remove"]).describe("Add or remove the participant"),
    user_id: z.string().min(1).describe("Provider id of the user to add or remove"),
  },
  outputShape: { result: z.string() },
  annotations: WRITE,
  cli: { group: "participants", command: "manage" },
  run: async ({ client, accountId }, input) => {
    const chatId = encodeURIComponent(input.chat_id as string);
    const userId = input.user_id as string;
    const res =
      input.action === "add"
        ? await client.request<{ object: string }>({
            method: "POST",
            path: `/v2/${accountId}/chats/${chatId}/participants`,
            body: { user_id: userId },
          })
        : await client.request<{ object: string }>({
            method: "DELETE",
            path: `/v2/${accountId}/chats/${chatId}/participants/${encodeURIComponent(userId)}`,
          });
    return { result: res.object };
  },
});

interface MessageAttachment {
  id?: string;
  type?: string;
  url?: string;
  url_expires_at?: string;
  filename?: string;
  mimetype?: string;
  file_size?: number;
  is_unavailable?: boolean;
}

export const getAttachmentLinks = defineOperation({
  name: "linkedin_get_attachment_links",
  title: "Get download links for a message's attachments",
  description:
    "List the attachments on a message with DIRECT DOWNLOAD LINKS. Returns each attachment's url (a pre-signed, time-limited link you can fetch with curl — no API key needed), url_expires_at, filename, mimetype, file_size and type. Binary content is never returned through this tool; download it yourself from the url before it expires. Pass attachment_id to narrow to one attachment.",
  mutates: false,
  inputShape: {
    chat_id: z.string().min(1).describe("Chat id containing the message"),
    message_id: z.string().min(1).describe("Message id from linkedin_list_messages"),
    attachment_id: z.string().min(1).optional().describe("Return only this attachment (default: all on the message)"),
  },
  outputShape: { attachments: z.array(z.record(z.unknown())) },
  annotations: READ,
  cli: { group: "messages", command: "attachments" },
  run: async ({ client, accountId }, input) => {
    // The attachment endpoint streams raw bytes; the Message object already carries pre-signed
    // urls, so we surface those instead of piping binary through the tool layer.
    const message = await client.request<{ attachments?: MessageAttachment[] }>({
      method: "GET",
      path: `/v2/${accountId}/chats/${encodeURIComponent(input.chat_id as string)}/messages/${encodeURIComponent(input.message_id as string)}`,
    });
    const wanted = input.attachment_id as string | undefined;
    const all = message.attachments ?? [];
    const picked = wanted === undefined ? all : all.filter((a) => a.id === wanted);
    if (wanted !== undefined && picked.length === 0) {
      throw new UsageError(
        `Message has no attachment with id "${wanted}". Available ids: ${all.map((a) => a.id).filter(Boolean).join(", ") || "(none)"}.`
      );
    }
    return { attachments: picked };
  },
});

export const updateChat = defineOperation({
  name: "linkedin_update_chat",
  title: "Archive, pin, mute or label a chat",
  description:
    "Manage a conversation's state for inbox triage: archive/unarchive, pin/unpin, mute/unmute, set a label, or rename (renaming usually works on group chats only). Provide at least one field; all are reversible. Muting takes either mute=true/false for an indefinite mute/unmute, or mute_until with an ISO 8601 UTC datetime. To change read state use linkedin_mark_chat_read instead. Support varies by provider — LinkedIn silently ignores fields it does not implement, so re-read the chat with linkedin_get_chat to confirm what stuck.",
  mutates: true,
  inputShape: {
    chat_id: z.string().min(1).describe("Chat id to update"),
    archive: z.boolean().optional().describe("true archives the chat (hides it from the main inbox), false restores it"),
    pin: z.boolean().optional().describe("true pins the chat to the top of the list, false unpins it"),
    mute: z.boolean().optional().describe("true mutes indefinitely, false unmutes. Cannot be combined with mute_until"),
    mute_until: z
      .string()
      .min(1)
      .optional()
      .describe("Mute until this ISO 8601 UTC datetime, e.g. 2026-08-01T00:00:00.000Z. Cannot be combined with mute"),
    label: z.string().min(1).optional().describe("Associate the chat with this label, if the provider supports labels"),
    name: z.string().min(1).optional().describe("Custom chat name — most providers allow this on group chats only"),
  },
  outputShape: itemOutputShape,
  annotations: WRITE,
  cli: { group: "chats", command: "update" },
  run: async ({ client, accountId }, input) => {
    if (input.mute !== undefined && input.mute_until !== undefined) {
      throw new UsageError("Pass either mute (indefinite) or mute_until (a datetime), not both.");
    }
    const body: Record<string, unknown> = {};
    if (input.archive !== undefined) body.archive_status = input.archive;
    if (input.pin !== undefined) body.pin_status = input.pin;
    if (input.mute !== undefined) body.muted_until = input.mute;
    if (input.mute_until !== undefined) body.muted_until = input.mute_until;
    if (input.label !== undefined) body.label = input.label;
    if (input.name !== undefined) body.name = input.name;
    if (Object.keys(body).length === 0) {
      throw new UsageError("Provide at least one of archive, pin, mute, mute_until, label or name.");
    }
    return {
      item: await client.request<Record<string, unknown>>({
        method: "PATCH",
        path: `/v2/${accountId}/chats/${encodeURIComponent(input.chat_id as string)}`,
        body,
      }),
    };
  },
});
