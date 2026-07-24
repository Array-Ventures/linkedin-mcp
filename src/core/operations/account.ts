import { z } from "zod";
import { UnipileApiError } from "../errors.js";
import { defineOperation } from "./types.js";

export const whoami = defineOperation({
  name: "linkedin_whoami",
  title: "Show connected account",
  description:
    "Show the connected LinkedIn account (id, status), the owner's own profile, and remaining InMail credits (null when the account has no InMail products). Cheap read — use it to verify connectivity.",
  mutates: false,
  inputShape: {},
  outputShape: {
    account: z.record(z.unknown()),
    profile: z.record(z.unknown()),
    inmail_credits: z.record(z.unknown()).nullable(),
  },
  annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: true },
  cli: { group: "whoami", command: "show" },
  run: async ({ client, accountId }) => {
    const account = await client.request<Record<string, unknown>>({ method: "GET", path: `/v2/accounts/${accountId}` });
    const profile = await client.request<Record<string, unknown>>({ method: "GET", path: `/v2/${accountId}/users/me` });
    let credits: Record<string, unknown> | null = null;
    try {
      credits = await client.request<Record<string, unknown>>({ method: "GET", path: `/v2/${accountId}/linkedin/inmail-credits` });
    } catch (err) {
      // Only 403/404 mean "no InMail products on this plan" — anything else (401/429/5xx) is a real failure.
      if (!(err instanceof UnipileApiError) || (err.status !== 403 && err.status !== 404)) throw err;
    }
    return { account, profile, inmail_credits: credits };
  },
});
