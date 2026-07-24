import { describe, expect, it } from "vitest";
import { operations } from "../../src/core/operations/index.js";

describe("operations registry", () => {
  it("has 40 uniquely-named linkedin_ tools", () => {
    expect(operations).toHaveLength(40);
    const names = operations.map((o) => o.name);
    expect(new Set(names).size).toBe(names.length);
    for (const n of names) expect(n).toMatch(/^linkedin_[a-z_]+$/);
  });

  it("keeps annotations consistent with mutates (safety fuse contract)", () => {
    for (const op of operations) {
      expect(op.annotations.readOnlyHint).toBe(!op.mutates);
      expect(op.annotations.destructiveHint).toBe(op.mutates);
      expect(op.annotations.idempotentHint).toBe(!op.mutates);
      expect(op.annotations.openWorldHint).toBe(true);
    }
  });

  it("has unique CLI group+command pairs", () => {
    const pairs = operations.map((o) => `${o.cli.group} ${o.cli.command}`);
    expect(new Set(pairs).size).toBe(pairs.length);
  });

  it("exposes exactly the 40 expected tools", () => {
    expect(operations.map((o) => o.name).sort()).toEqual([
      "linkedin_add_comment", "linkedin_create_post", "linkedin_delete_comment",
      "linkedin_delete_message", "linkedin_delete_post", "linkedin_edit_comment",
      "linkedin_edit_message", "linkedin_edit_post", "linkedin_follow_user",
      "linkedin_forward_message", "linkedin_get_chat", "linkedin_get_company",
      "linkedin_get_message", "linkedin_get_post", "linkedin_get_profile",
      "linkedin_get_search_parameters", "linkedin_list_chats", "linkedin_list_comments",
      "linkedin_list_connections", "linkedin_list_followers", "linkedin_list_invitations",
      "linkedin_list_messages", "linkedin_list_participants", "linkedin_list_posts",
      "linkedin_list_reactions", "linkedin_list_user_comments", "linkedin_list_user_reactions",
      "linkedin_manage_participants", "linkedin_mark_chat_read", "linkedin_mark_message_read",
      "linkedin_react", "linkedin_react_to_message", "linkedin_remove_connection",
      "linkedin_respond_invitation", "linkedin_search", "linkedin_send_invitation",
      "linkedin_send_message", "linkedin_start_chat", "linkedin_update_profile",
      "linkedin_whoami",
    ]);
  });
});
