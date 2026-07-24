import { UnipileClient } from "./client.js";
import { ConfigError } from "./errors.js";

interface Account {
  id: string;
  name?: string;
  status: string;
  provider: string;
}
interface AccountsPage {
  object: "Accounts";
  data: Account[];
  has_more: boolean;
}

const cache = new WeakMap<UnipileClient, string>();
const PAGE_LIMIT = 50;
const MAX_PAGES = 5;
const ACCOUNT_ID_RE = /^acc_[A-Za-z0-9_-]+$/;

export async function resolveAccountId(client: UnipileClient, explicit?: string): Promise<string> {
  if (explicit) {
    if (!ACCOUNT_ID_RE.test(explicit)) {
      throw new ConfigError(`Invalid account id "${explicit}" — expected an id like acc_xxx from /v2/accounts/`);
    }
    return explicit;
  }
  const cached = cache.get(client);
  if (cached) return cached;

  const accounts: Account[] = [];
  let hasMore = false;
  for (let page = 0; page < MAX_PAGES; page++) {
    // NOTE: this endpoint's limit/offset are strings and it paginates via has_more (research doc gotcha #4).
    const res = await client.request<AccountsPage>({
      method: "GET",
      path: "/v2/accounts/",
      query: { provider: "linkedin", limit: String(PAGE_LIMIT), offset: String(page * PAGE_LIMIT) },
    });
    accounts.push(...res.data);
    hasMore = res.has_more;
    if (!hasMore) break;
  }
  if (hasMore) {
    // Fail loudly rather than silently auto-picking from a truncated listing.
    throw new ConfigError(
      `More than ${MAX_PAGES * PAGE_LIMIT} LinkedIn accounts on this key — set UNIPILE_ACCOUNT_ID explicitly.`
    );
  }

  if (accounts.length === 0) {
    throw new ConfigError(
      "No LinkedIn account is connected to this Unipile API key. Connect one in the Unipile dashboard, or set UNIPILE_ACCOUNT_ID explicitly."
    );
  }
  if (accounts.length > 1) {
    const list = accounts.map((a) => `${a.id} (${a.name ?? "unnamed"}, ${a.status})`).join("; ");
    throw new ConfigError(
      `Multiple LinkedIn accounts found: ${list}. Set UNIPILE_ACCOUNT_ID or pass an explicit account to choose one.`
    );
  }
  const only = accounts[0]!;
  if (only.status !== "running") {
    throw new ConfigError(
      `LinkedIn account ${only.id} has status "${only.status}". Reconnect it in the Unipile dashboard before using this server.`
    );
  }
  cache.set(client, only.id);
  return only.id;
}
