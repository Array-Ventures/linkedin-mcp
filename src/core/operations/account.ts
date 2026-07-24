import { z } from "zod";
import { UnipileApiError } from "../errors.js";
import { fetchInboxes } from "../inboxes.js";
import { defineOperation } from "./types.js";

const EXTRAS = ["profile", "inboxes", "inmail_credits"] as const;

export const whoami = defineOperation({
  name: "linkedin_whoami",
  title: "Show connected account",
  description:
    "Orientation call — run this FIRST. By default costs ONE cheap request and returns the connected account (id, status, owner name/id) plus products (classic / sales_navigator / recruiter with connection state) which gate what the other tools can do. Request extras only when you need them: include=['inboxes'] for chat inbox ids (linkedin_list_chats discovers them itself, so rarely needed), ['inmail_credits'] before sending InMail, ['profile'] for the owner's full profile — note profile shares LinkedIn's scarce ~80-100/day profile-view budget with linkedin_get_profile, so skip it unless you need the detail.",
  mutates: false,
  inputShape: {
    include: z
      .array(z.enum(EXTRAS))
      .optional()
      .describe("Extra data to fetch, each costing one more request: profile, inboxes, inmail_credits"),
  },
  outputShape: {
    account: z.record(z.unknown()),
    products: z.record(z.string()).nullable(),
    profile: z.record(z.unknown()).optional(),
    inmail_credits: z.record(z.unknown()).nullable().optional(),
    inboxes: z.array(z.record(z.unknown())).nullable().optional(),
  },
  annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: true },
  cli: { group: "whoami", command: "show" },
  run: async ({ client, accountId }, input) => {
    const include = new Set((input.include as string[] | undefined) ?? []);
    // Account metadata only — this endpoint does not touch LinkedIn itself.
    const account = await client.request<Record<string, unknown>>({ method: "GET", path: `/v2/accounts/${accountId}` });
    const products =
      ((account.metadata as Record<string, unknown> | undefined)?.products_connection_status as
        | Record<string, string>
        | undefined) ?? null;
    const out: Record<string, unknown> = { account, products };

    if (include.has("profile")) {
      // Shares the per-endpoint window with linkedin_get_profile — opt-in for that reason.
      out.profile = await client.request<Record<string, unknown>>({ method: "GET", path: `/v2/${accountId}/users/me` });
    }
    if (include.has("inboxes")) {
      out.inboxes = await fetchInboxes(client, accountId); // cached per client+account
    }
    if (include.has("inmail_credits")) {
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
      out.inmail_credits = credits;
    }
    return out;
  },
});
