import { beforeAll, describe, expect, it } from "vitest";
import { UnipileClient } from "../../src/core/client.js";
import { listChats, startChat } from "../../src/core/operations/messaging.js";
import { getProfile } from "../../src/core/operations/network.js";
import { whoami } from "../../src/core/operations/account.js";
import { UnipileApiError } from "../../src/core/errors.js";
import { createOpRunner } from "../helpers/op-fuse.js";

const KEY = process.env.UNIPILE_API_KEY_TEST ?? "";
const ACCOUNT = process.env.UNIPILE_ACCOUNT_ID_TEST ?? "";
const BASE = process.env.UNIPILE_BASE_URL_TEST ?? "https://api.unipile.com";
const enabled = KEY !== "" && ACCOUNT !== "" && process.env.UNIPILE_TEST_LIVE === "1";

(enabled ? describe : describe.skip)("Unipile mock test environment", () => {
  // Defensive: `describe.skip` still executes this callback body during collection even when
  // `enabled` is false, so an explicitly-empty env var (e.g. UNIPILE_BASE_URL_TEST="") must
  // never be able to throw here — fall back to safe placeholders rather than empty strings.
  const client = new UnipileClient({ apiKey: KEY || "unused", baseUrl: BASE || "https://api.unipile.com" });
  const runner = createOpRunner({ client, accountId: ACCOUNT });
  let mockUserId = "";

  beforeAll(async () => {
    // SAFETY FUSE: verify the target is the mock provider before ANY mutation can run.
    const account = await client.request<{ provider: string; user_id: string }>({
      method: "GET",
      path: `/v2/accounts/${ACCOUNT}`,
    });
    runner.confirmMockProvider(account.provider); // throws unless "mock"
    mockUserId = account.user_id;
  });

  it("whoami aggregates against the mock account", async () => {
    const out = await runner.run(whoami, {});
    expect(out.account).toMatchObject({ id: ACCOUNT, provider: "mock" });
  });

  it("lists chats (read path end-to-end)", async (t) => {
    try {
      const out = await runner.run(listChats, { limit: 5 });
      expect(Array.isArray(out.items)).toBe(true);
    } catch (err) {
      // LinkedIn requires inbox-scoped chat listing; the mock provider may not model inboxes.
      const unimplemented =
        err instanceof UnipileApiError &&
        (err.status === 501 || err.status === 404 || /not_implemented|not_supported|unsupported|feature_not/i.test(err.type));
      if (unimplemented) {
        t.skip();
        return;
      }
      throw err;
    }
  });

  it("reads own profile", async () => {
    const out = await runner.run(getProfile, { user: "me" });
    expect(out.item).toBeTruthy();
  });

  it("write path: starts a chat against the mock provider (fuse-guarded)", async (t) => {
    try {
      const out = await runner.run(startChat, { user_id: mockUserId, text: "integration test message" });
      expect(out).toHaveProperty("chat_id");
    } catch (err) {
      // Skip ONLY when the mock provider explicitly does not implement this method.
      // Generic 400/404/422 stay failures — they usually mean OUR path/body is wrong.
      const unimplemented =
        err instanceof UnipileApiError &&
        (err.status === 501 || /not_implemented|not_supported|unsupported|feature_not/i.test(err.type));
      if (unimplemented) {
        t.skip();
        return;
      }
      throw err;
    }
  });
});
