import { z } from "zod";
import { UsageError } from "../errors.js";
import { defineOperation } from "./types.js";
import { itemOutputShape } from "./shared.js";

import { WRITE_ANNOTATIONS as WRITE } from "./shared.js";

export const editPost = defineOperation({
  name: "linkedin_edit_post",
  title: "Edit a post",
  description:
    "Edit your own post's text and/or who can comment. Editing is far narrower than creation — only text and can_comment (anyone|relations_only|no_one) can change after publishing; attachments, audience (can_read), and quoted_post_id are fixed at creation and cannot be altered here. Provide at least one of text or can_comment.",
  mutates: true,
  inputShape: {
    post_id: z.string().min(1).describe("Post id"),
    text: z.string().min(1).optional().describe("New post body"),
    can_comment: z.enum(["anyone", "relations_only", "no_one"]).optional().describe("Who can comment on the post"),
  },
  outputShape: itemOutputShape,
  annotations: WRITE,
  cli: { group: "posts", command: "edit", positional: "post_id" },
  run: async ({ client, accountId }, input) => {
    const body: Record<string, unknown> = {};
    if (input.text !== undefined) body.text = input.text;
    if (input.can_comment !== undefined) body.can_comment = input.can_comment;
    if (Object.keys(body).length === 0) {
      throw new UsageError("Provide at least one of text or can_comment to edit the post.");
    }
    return {
      item: await client.request<Record<string, unknown>>({
        method: "PATCH",
        path: `/v2/${accountId}/posts/${encodeURIComponent(input.post_id as string)}`,
        body,
      }),
    };
  },
});

export const deletePost = defineOperation({
  name: "linkedin_delete_post",
  title: "Delete a post",
  description:
    "Permanently delete a post created by the account owner. Irreversible — own posts only; deleting another user's post will fail.",
  mutates: true,
  inputShape: { post_id: z.string().min(1).describe("Post id") },
  outputShape: { deleted: z.boolean() },
  annotations: WRITE,
  cli: { group: "posts", command: "delete", positional: "post_id" },
  run: async ({ client, accountId }, input) => {
    await client.request<void>({
      method: "DELETE",
      path: `/v2/${accountId}/posts/${encodeURIComponent(input.post_id as string)}`,
    });
    return { deleted: true };
  },
});

export const editComment = defineOperation({
  name: "linkedin_edit_comment",
  title: "Edit a comment",
  description:
    "Edit the text of your own comment on a post. Unlike linkedin_edit_post, text is required here — a comment has nothing else editable after creation.",
  mutates: true,
  inputShape: {
    post_id: z.string().min(1).describe("Post id"),
    comment_id: z.string().min(1).describe("Comment id"),
    text: z.string().min(1).describe("New comment text"),
  },
  outputShape: itemOutputShape,
  annotations: WRITE,
  cli: { group: "comments", command: "edit" },
  run: async ({ client, accountId }, input) => ({
    item: await client.request<Record<string, unknown>>({
      method: "PATCH",
      path: `/v2/${accountId}/posts/${encodeURIComponent(input.post_id as string)}/comments/${encodeURIComponent(input.comment_id as string)}`,
      body: { text: input.text },
    }),
  }),
});

// Same-path trap: POST on this exact URL (/posts/{post_id}/comments/{comment_id}) is a THIRD,
// unrelated operation — "reply to a comment" (already implemented as linkedin_add_comment's
// reply_to input). Three HTTP methods, three different effects on one path: PATCH edits this
// comment (linkedin_edit_comment above), DELETE removes it (this op), POST creates a brand-new
// reply comment threaded under it. Do not route this path by shape alone — method matters.
export const deleteComment = defineOperation({
  name: "linkedin_delete_comment",
  title: "Delete a comment",
  description:
    "Permanently delete your own comment from a post. Irreversible — own comments only; deleting another user's comment will fail.",
  mutates: true,
  inputShape: {
    post_id: z.string().min(1).describe("Post id"),
    comment_id: z.string().min(1).describe("Comment id"),
  },
  outputShape: { deleted: z.boolean() },
  annotations: WRITE,
  cli: { group: "comments", command: "delete" },
  run: async ({ client, accountId }, input) => {
    await client.request<void>({
      method: "DELETE",
      path: `/v2/${accountId}/posts/${encodeURIComponent(input.post_id as string)}/comments/${encodeURIComponent(input.comment_id as string)}`,
    });
    return { deleted: true };
  },
});

export const updateProfile = defineOperation({
  name: "linkedin_update_profile",
  title: "Update your LinkedIn profile",
  description:
    "Update basic fields on the account owner's own profile: first_name, last_name, description, location, bio, headline, postal_code. Scope is deliberately limited to these plain top-level/headline fields — structured sections (skills, experience, education, open_to_work, photos) are NOT supported by this tool, because writing them correctly requires pre-resolved parameter ids (from linkedin_get_search_parameters) rather than free text, and a wrong match would silently apply the wrong value. The API response does not echo the updated profile — it only confirms acceptance, so re-run linkedin_get_profile with user='me' afterward to confirm what LinkedIn actually stored. Provide at least one field.",
  mutates: true,
  inputShape: {
    first_name: z.string().min(1).optional().describe("First name"),
    last_name: z.string().min(1).optional().describe("Last name"),
    description: z.string().min(1).optional().describe("Profile summary/about text"),
    location: z.string().min(1).optional().describe("Location text"),
    bio: z.string().min(1).optional().describe("Short bio"),
    headline: z.string().min(1).optional().describe("Profile headline (sent nested under LinkedIn-specific fields)"),
    postal_code: z.string().min(1).optional().describe("Postal code (sent nested under LinkedIn-specific fields)"),
  },
  outputShape: { result: z.string(), note: z.string() },
  annotations: WRITE,
  cli: { group: "profile", command: "update" },
  run: async ({ client, accountId }, input) => {
    const body: Record<string, unknown> = {};
    if (input.first_name !== undefined) body.first_name = input.first_name;
    if (input.last_name !== undefined) body.last_name = input.last_name;
    if (input.description !== undefined) body.description = input.description;
    if (input.location !== undefined) body.location = input.location;
    if (input.bio !== undefined) body.bio = input.bio;
    const linkedin: Record<string, unknown> = {};
    if (input.headline !== undefined) linkedin.headline = input.headline;
    if (input.postal_code !== undefined) linkedin.postal_code = input.postal_code;
    if (Object.keys(linkedin).length > 0) body.specifics = { linkedin };
    if (Object.keys(body).length === 0) {
      throw new UsageError(
        "Provide at least one field to update: first_name, last_name, description, location, bio, headline, postal_code."
      );
    }
    const res = await client.request<{ object: string }>({
      method: "PATCH",
      path: `/v2/${accountId}/users/me`,
      body,
    });
    return {
      result: res.object,
      note: "Profile update accepted. Re-run linkedin_get_profile with user='me' to confirm what LinkedIn actually stored.",
    };
  },
});
