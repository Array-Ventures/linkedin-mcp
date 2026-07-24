import { z } from "zod";
import { UnipileApiError } from "../errors.js";
import { fetchInboxes } from "../inboxes.js";
import { defineOperation } from "./types.js";

export const whoami = defineOperation({
  name: "linkedin_whoami",
  title: "Show connected account",
  description:
    "Orientation call — run this FIRST. Shows the connected LinkedIn account (id, status), which LinkedIn products are connected (products: classic / sales_navigator / recruiter with connection state), the available message inboxes (ids usable with linkedin_list_chats), the owner's own profile, and remaining InMail credits (null when the account has no InMail products).",
  mutates: false,
  inputShape: {},
  outputShape: {
    account: z.record(z.unknown()),
    profile: z.record(z.unknown()),
    inmail_credits: z.record(z.unknown()).nullable(),
    products: z.record(z.string()).nullable(),
    inboxes: z.array(z.record(z.unknown())).nullable(),
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
      // Suppress only "credits don't exist here": 403/404 (no InMail products on this plan) and the
      // provider-capability 400 some accounts return. Anything else (401/429/5xx) is a real failure.
      if (!(err instanceof UnipileApiError)) throw err;
      const noProducts = err.status === 403 || err.status === 404;
      const providerUnsupported =
        err.status === 400 && /does not support linkedin/i.test(`${err.title} ${err.detail ?? ""}`);
      if (!noProducts && !providerUnsupported) throw err;
    }
    const products =
      ((account.metadata as Record<string, unknown> | undefined)?.products_connection_status as
        | Record<string, string>
        | undefined) ?? null;
    const inboxes = await fetchInboxes(client, accountId);
    return { account, profile, inmail_credits: credits, products, inboxes };
  },
});
