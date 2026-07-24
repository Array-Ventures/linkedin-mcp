import { z } from "zod";
import { UsageError } from "../errors.js";
import { defineOperation } from "./types.js";
import { cursorPagination, itemOutputShape, pageOutputShape, toIdArray, toPage } from "./shared.js";
import type { ListEnvelope } from "./shared.js";

import { READ_ANNOTATIONS as READ, WRITE_ANNOTATIONS as WRITE } from "./shared.js";

export const listChats = defineOperation({
  name: "linkedin_list_chats",
  title: "List LinkedIn chats",
  description:
    "List LinkedIn conversations from one inbox, most recent first (LinkedIn requires inbox-scoped listing). Default inbox CLASSIC_PRIMARY; others: CLASSIC_ARCHIVED, CLASSIC_SPAM, CLASSIC_JOBS, plus Sales Navigator/Recruiter inboxes when subscribed. Set unread=true to only see chats with unread messages. Returned chat ids feed linkedin_list_messages / linkedin_send_message.",
  mutates: false,
  inputShape: {
    inbox: z
      .string()
      .min(1)
      .optional()
      .describe("Inbox id (default CLASSIC_PRIMARY). Known: CLASSIC_PRIMARY, CLASSIC_ARCHIVED, CLASSIC_SPAM, CLASSIC_JOBS; Sales Navigator/Recruiter accounts expose more via GET /inboxes"),
    unread: z.boolean().optional().describe("Only chats with unread messages"),
    ...cursorPagination,
  },
  outputShape: pageOutputShape,
  annotations: READ,
  cli: { group: "chats", command: "list" },
  run: async ({ client, accountId }, input) =>
    toPage(
      await client.request<ListEnvelope>({
        method: "GET",
        path: `/v2/${accountId}/inboxes/${encodeURIComponent((input.inbox as string | undefined) ?? "CLASSIC_PRIMARY")}/chats`,
        query: { is_unread: input.unread as boolean | undefined, limit: input.limit as number | undefined, cursor: input.cursor as string | undefined },
      })
    ),
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
      body.specifics = { linkedin: { sales_navigator: { subject: input.subject } } };
    } else {
      const classic: Record<string, unknown> = {};
      if (input.inmail === true) classic.inmail = true;
      if (input.relation_request_id !== undefined) classic.relation_request_id = input.relation_request_id;
      if (Object.keys(classic).length > 0) body.specifics = { linkedin: { classic } };
    }
    const res = await client.request<{ chat_id: string; message_id: string | string[] | null }>({
      method: "POST",
      path: `/v2/${accountId}/chats/send`,
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
