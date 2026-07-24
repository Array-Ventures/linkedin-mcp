import { z } from "zod";
import { UsageError } from "../errors.js";
import { defineOperation } from "./types.js";
import { cursorPagination, pageOutputShape, toPage } from "./shared.js";
import type { ListEnvelope } from "./shared.js";

import { READ_ANNOTATIONS as READ, WRITE_ANNOTATIONS as WRITE } from "./shared.js";

export const LINKEDIN_REACTIONS = [
  "linkedin_like",
  "linkedin_celebrate",
  "linkedin_support",
  "linkedin_love",
  "linkedin_insightful",
  "linkedin_funny",
] as const;

export const linkedinReact = defineOperation({
  name: "linkedin_react",
  title: "React to a post or comment",
  description:
    "Add or remove the account owner's reaction on a post or a comment (like, celebrate, support, love, insightful, funny). Set target to 'post' for a post-level reaction, or 'comment' plus comment_id to react to a specific comment on that post.",
  mutates: true,
  inputShape: {
    target: z.enum(["post", "comment"]).describe("React to the post itself, or to one of its comments"),
    post_id: z.string().min(1).describe("Post id"),
    comment_id: z.string().min(1).optional().describe("Comment id — required when target is 'comment'"),
    reaction: z.enum(LINKEDIN_REACTIONS).describe("Reaction type"),
    action: z.enum(["add", "remove"]).describe("Add or remove the reaction"),
  },
  outputShape: { result: z.string() },
  annotations: WRITE,
  cli: { group: "react", command: "set" },
  run: async ({ client, accountId }, input) => {
    const target = input.target as "post" | "comment";
    const postId = input.post_id as string;
    const commentId = input.comment_id as string | undefined;
    if (target === "comment" && commentId === undefined) {
      throw new UsageError("comment_id is required when target is 'comment'.");
    }
    if (target === "post" && commentId !== undefined) {
      throw new UsageError("comment_id must not be provided when target is 'post'.");
    }
    const path =
      target === "post"
        ? `/v2/${accountId}/posts/${encodeURIComponent(postId)}/reactions`
        : `/v2/${accountId}/posts/${encodeURIComponent(postId)}/comments/${encodeURIComponent(commentId as string)}/reactions`;
    const res = await client.request<{ object: string }>({
      method: input.action === "add" ? "POST" : "DELETE",
      path,
      body: { reaction: input.reaction },
    });
    return { result: res.object };
  },
});

export const linkedinReactToMessage = defineOperation({
  name: "linkedin_react_to_message",
  title: "React to a message",
  description:
    "Add or remove the account owner's reaction on a chat message. Unlike post/comment reactions, message reactions take a raw emoji unicode string (e.g. '👍'), not a fixed enum — reacting with an emoji the provider doesn't support will fail.",
  mutates: true,
  inputShape: {
    chat_id: z.string().min(1).describe("Chat id"),
    message_id: z.string().min(1).describe("Message id"),
    reaction: z.string().min(1).describe("Raw emoji unicode string (no enum) — unsupported emojis will fail"),
    action: z.enum(["add", "remove"]).describe("Add or remove the reaction"),
  },
  outputShape: { result: z.string() },
  annotations: WRITE,
  cli: { group: "react", command: "message" },
  run: async ({ client, accountId }, input) => {
    const res = await client.request<{ object: string }>({
      method: input.action === "add" ? "POST" : "DELETE",
      path: `/v2/${accountId}/chats/${encodeURIComponent(input.chat_id as string)}/messages/${encodeURIComponent(input.message_id as string)}/reactions`,
      body: { reaction: input.reaction },
    });
    return { result: res.object };
  },
});

export const listReactions = defineOperation({
  name: "linkedin_list_reactions",
  title: "List reactions on a post, comment, or message",
  description: "List who reacted (value + sender) to a post, a comment, or a chat message, depending on target.",
  mutates: false,
  inputShape: {
    target: z.enum(["post", "comment", "message"]).describe("What the reactions belong to"),
    post_id: z.string().min(1).optional().describe("Post id — required when target is 'post' or 'comment'"),
    comment_id: z.string().min(1).optional().describe("Comment id — required when target is 'comment'"),
    chat_id: z.string().min(1).optional().describe("Chat id — required when target is 'message'"),
    message_id: z.string().min(1).optional().describe("Message id — required when target is 'message'"),
    ...cursorPagination,
  },
  outputShape: pageOutputShape,
  annotations: READ,
  cli: { group: "react", command: "list" },
  run: async ({ client, accountId }, input) => {
    const target = input.target as "post" | "comment" | "message";
    const postId = input.post_id as string | undefined;
    const commentId = input.comment_id as string | undefined;
    const chatId = input.chat_id as string | undefined;
    const messageId = input.message_id as string | undefined;
    let path: string;
    if (target === "post") {
      if (postId === undefined) throw new UsageError("post_id is required when target is 'post'.");
      path = `/v2/${accountId}/posts/${encodeURIComponent(postId)}/reactions`;
    } else if (target === "comment") {
      if (postId === undefined || commentId === undefined) {
        throw new UsageError("post_id and comment_id are required when target is 'comment'.");
      }
      path = `/v2/${accountId}/posts/${encodeURIComponent(postId)}/comments/${encodeURIComponent(commentId)}/reactions`;
    } else {
      if (chatId === undefined || messageId === undefined) {
        throw new UsageError("chat_id and message_id are required when target is 'message'.");
      }
      path = `/v2/${accountId}/chats/${encodeURIComponent(chatId)}/messages/${encodeURIComponent(messageId)}/reactions`;
    }
    return toPage(
      await client.request<ListEnvelope>({
        method: "GET",
        path,
        query: { limit: input.limit as number | undefined, cursor: input.cursor as string | undefined },
      })
    );
  },
});

export const listUserComments = defineOperation({
  name: "linkedin_list_user_comments",
  title: "List a user's comments",
  description:
    "List comments made by a user across LinkedIn (not scoped to a single post) — defaults to the account owner ('me'). Each item carries parent_post (the post the comment was made on), which makes this useful for seeing what someone engages with.",
  mutates: false,
  inputShape: { user: z.string().min(1).optional().describe("User provider id (defaults to 'me')"), ...cursorPagination },
  outputShape: pageOutputShape,
  annotations: READ,
  cli: { group: "engagement", command: "comments" },
  run: async ({ client, accountId }, input) =>
    toPage(
      await client.request<ListEnvelope>({
        method: "GET",
        path: `/v2/${accountId}/users/${encodeURIComponent((input.user as string | undefined) ?? "me")}/comments`,
        query: { limit: input.limit as number | undefined, cursor: input.cursor as string | undefined },
      })
    ),
});

export const listUserReactions = defineOperation({
  name: "linkedin_list_user_reactions",
  title: "List a user's reactions",
  description:
    "List reactions made by a user across LinkedIn (not scoped to a single post) — defaults to the account owner ('me'). Each item carries parent_post (the post the reaction was made on), which makes this useful for seeing what someone engages with.",
  mutates: false,
  inputShape: { user: z.string().min(1).optional().describe("User provider id (defaults to 'me')"), ...cursorPagination },
  outputShape: pageOutputShape,
  annotations: READ,
  cli: { group: "engagement", command: "reactions" },
  run: async ({ client, accountId }, input) =>
    toPage(
      await client.request<ListEnvelope>({
        method: "GET",
        path: `/v2/${accountId}/users/${encodeURIComponent((input.user as string | undefined) ?? "me")}/reactions`,
        query: { limit: input.limit as number | undefined, cursor: input.cursor as string | undefined },
      })
    ),
});

export const listFollowers = defineOperation({
  name: "linkedin_list_followers",
  title: "List a user's followers or following",
  description:
    "List a user's followers or the accounts they follow — defaults to the account owner ('me'). Returns bare User objects directly in items, with no UserRelation wrapper (unlike linkedin_list_connections, whose entries add id/created_at around the embedded user).",
  mutates: false,
  inputShape: {
    direction: z.enum(["followers", "following"]).describe("List followers of the user, or accounts the user follows"),
    user: z.string().min(1).optional().describe("User provider id (defaults to 'me')"),
    ...cursorPagination,
  },
  outputShape: pageOutputShape,
  annotations: READ,
  cli: { group: "followers", command: "list" },
  run: async ({ client, accountId }, input) =>
    toPage(
      await client.request<ListEnvelope>({
        method: "GET",
        path: `/v2/${accountId}/users/${encodeURIComponent((input.user as string | undefined) ?? "me")}/${input.direction as string}`,
        query: { limit: input.limit as number | undefined, cursor: input.cursor as string | undefined },
      })
    ),
});
