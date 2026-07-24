import { z } from "zod";
import { defineOperation } from "./types.js";
import { cursorPagination, itemOutputShape, pageOutputShape, toPage } from "./shared.js";
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

export const listPosts = defineOperation({
  name: "linkedin_list_posts",
  title: "List a user's posts",
  description: "List posts created or shared by a user — defaults to the account owner ('me').",
  mutates: false,
  inputShape: { user: z.string().min(1).optional().describe("User provider id (defaults to 'me')"), ...cursorPagination },
  outputShape: pageOutputShape,
  annotations: READ,
  cli: { group: "posts", command: "list" },
  run: async ({ client, accountId }, input) =>
    toPage(
      await client.request<ListEnvelope>({
        method: "GET",
        path: `/v2/${accountId}/users/${encodeURIComponent((input.user as string | undefined) ?? "me")}/posts`,
        query: { limit: input.limit as number | undefined, cursor: input.cursor as string | undefined },
      })
    ),
});

export const getPost = defineOperation({
  name: "linkedin_get_post",
  title: "Get a post",
  description: "Fetch one post by id (use ids returned by list/search tools — not URLs).",
  mutates: false,
  inputShape: { post_id: z.string().min(1).describe("Post id") },
  outputShape: itemOutputShape,
  annotations: READ,
  cli: { group: "posts", command: "get", positional: "post_id" },
  run: async ({ client, accountId }, input) => ({
    item: await client.request<Record<string, unknown>>({
      method: "GET",
      path: `/v2/${accountId}/posts/${encodeURIComponent(input.post_id as string)}`,
    }),
  }),
});

export const createPost = defineOperation({
  name: "linkedin_create_post",
  title: "Create a LinkedIn post",
  description:
    "Publish a text post as the account owner. Mention people with @ followed by their id or public identifier. This is public, user-visible content — confirm wording before posting.",
  mutates: true,
  inputShape: {
    text: z.string().min(1).describe("Post body (plain text; @mention via id/public identifier)"),
    visibility: z.enum(["anyone", "relations_only"]).optional().describe("Who can see the post (default anyone)"),
    comment_scope: z.enum(["anyone", "relations_only", "no_one"]).optional().describe("Who can comment (default anyone)"),
  },
  outputShape: itemOutputShape,
  annotations: WRITE,
  cli: { group: "posts", command: "create" },
  run: async ({ client, accountId }, input) => {
    const body: Record<string, unknown> = { text: input.text };
    if (input.visibility !== undefined) body.can_read = input.visibility;
    if (input.comment_scope !== undefined) body.can_comment = input.comment_scope;
    return { item: await client.request<Record<string, unknown>>({ method: "POST", path: `/v2/${accountId}/posts`, body }) };
  },
});

export const listComments = defineOperation({
  name: "linkedin_list_comments",
  title: "List comments on a post",
  description: "List comments on a post; pass comment_id to list the replies of that comment instead.",
  mutates: false,
  inputShape: {
    post_id: z.string().min(1).describe("Post id"),
    comment_id: z.string().optional().describe("List replies to this comment instead of top-level comments"),
    sort: z.enum(["MOST_RECENT", "MOST_RELEVANT"]).optional().describe("Sort order (default MOST_RECENT)"),
    ...cursorPagination,
  },
  outputShape: pageOutputShape,
  annotations: READ,
  cli: { group: "comments", command: "list" },
  run: async ({ client, accountId }, input) => {
    const base = `/v2/${accountId}/posts/${encodeURIComponent(input.post_id as string)}/comments`;
    const path = input.comment_id !== undefined ? `${base}/${encodeURIComponent(input.comment_id as string)}/replies` : base;
    return toPage(
      await client.request<ListEnvelope>({
        method: "GET",
        path,
        query: { sort_by: input.sort as string | undefined, limit: input.limit as number | undefined, cursor: input.cursor as string | undefined },
      })
    );
  },
});

export const addComment = defineOperation({
  name: "linkedin_add_comment",
  title: "Comment on a post",
  description:
    "Add a comment to a post, or reply to an existing comment via reply_to. Acts as the account owner — public and user-visible.",
  mutates: true,
  inputShape: {
    post_id: z.string().min(1).describe("Post id"),
    text: z.string().min(1).describe("Comment text (@mention via id/public identifier)"),
    reply_to: z.string().optional().describe("Comment id to reply to (threads under that comment)"),
  },
  outputShape: itemOutputShape,
  annotations: WRITE,
  cli: { group: "comments", command: "add" },
  run: async ({ client, accountId }, input) => {
    const base = `/v2/${accountId}/posts/${encodeURIComponent(input.post_id as string)}/comments`;
    const path = input.reply_to !== undefined ? `${base}/${encodeURIComponent(input.reply_to as string)}` : base;
    return { item: await client.request<Record<string, unknown>>({ method: "POST", path, body: { text: input.text } }) };
  },
});

export const reactToPost = defineOperation({
  name: "linkedin_react_to_post",
  title: "React to a post",
  description: "Add or remove the account owner's reaction on a post (like, celebrate, support, love, insightful, funny).",
  mutates: true,
  inputShape: {
    post_id: z.string().min(1).describe("Post id"),
    reaction: z.enum(LINKEDIN_REACTIONS).describe("Reaction type"),
    action: z.enum(["add", "remove"]).describe("Add or remove the reaction"),
  },
  outputShape: { result: z.string() },
  annotations: WRITE,
  cli: { group: "react", command: "set" },
  run: async ({ client, accountId }, input) => {
    const res = await client.request<{ object: string }>({
      method: input.action === "add" ? "POST" : "DELETE",
      path: `/v2/${accountId}/posts/${encodeURIComponent(input.post_id as string)}/reactions`,
      body: { reaction: input.reaction },
    });
    return { result: res.object };
  },
});
