import { describe, expect, it } from "vitest";
import { operations } from "../../src/core/operations/index.js";

describe("operations registry", () => {
  it("has 22 uniquely-named linkedin_ tools", () => {
    expect(operations).toHaveLength(22);
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

  it("exposes exactly the 22 expected tools", () => {
    expect(operations.map((o) => o.name).sort()).toEqual([
      "linkedin_add_comment", "linkedin_create_post", "linkedin_follow_user", "linkedin_get_chat",
      "linkedin_get_company", "linkedin_get_post", "linkedin_get_profile", "linkedin_get_search_parameters",
      "linkedin_list_chats", "linkedin_list_comments", "linkedin_list_connections", "linkedin_list_invitations",
      "linkedin_list_messages", "linkedin_list_posts", "linkedin_mark_chat_read", "linkedin_react_to_post",
      "linkedin_respond_invitation", "linkedin_search", "linkedin_send_invitation", "linkedin_send_message",
      "linkedin_start_chat", "linkedin_whoami",
    ]);
  });
});
