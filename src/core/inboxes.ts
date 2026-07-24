import { UnipileClient } from "./client.js";
import { UnipileApiError } from "./errors.js";

export interface Inbox {
  object: "Inbox";
  id: string;
  description?: string;
  disabled: boolean;
}

const cache = new WeakMap<UnipileClient, Map<string, Inbox[] | null>>();

function isNoInboxConcept(err: unknown): boolean {
  return (
    err instanceof UnipileApiError &&
    (err.status === 404 || err.status === 501 || (err.status === 400 && /does not support/i.test(`${err.title} ${err.detail ?? ""}`)))
  );
}

/** Fetch the account's inboxes, cached per client+account. Returns null when the provider has no inbox concept (e.g. mock). */
export async function fetchInboxes(client: UnipileClient, accountId: string): Promise<Inbox[] | null> {
  let perClient = cache.get(client);
  if (perClient === undefined) {
    perClient = new Map();
    cache.set(client, perClient);
  }
  const cached = perClient.get(accountId);
  if (cached !== undefined) return cached;
  let inboxes: Inbox[] | null;
  try {
    const res = await client.request<{ data?: Inbox[] }>({ method: "GET", path: `/v2/${accountId}/inboxes` });
    inboxes = res.data ?? [];
  } catch (err) {
    if (!isNoInboxConcept(err)) throw err;
    inboxes = null;
  }
  perClient.set(accountId, inboxes);
  return inboxes;
}

/** Default inbox for chat listing: CLASSIC_PRIMARY when present, else the first enabled inbox; null when the provider has no inboxes. */
export async function resolveDefaultInbox(client: UnipileClient, accountId: string): Promise<string | null> {
  const inboxes = await fetchInboxes(client, accountId);
  if (inboxes === null || inboxes.length === 0) return null;
  const enabled = inboxes.filter((i) => !i.disabled);
  const pick = enabled.find((i) => i.id === "CLASSIC_PRIMARY") ?? enabled[0] ?? inboxes[0];
  return pick?.id ?? null;
}
