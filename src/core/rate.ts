import { UnipileClient } from "./client.js";

/**
 * The "header brake": expose the last-seen rate window from Unipile's own counters so agents
 * can slow down BEFORE hitting a 429. The window is a ceiling, never a target — the warning
 * fires when the remaining budget drops to 10% (min 2 calls).
 */
export function rateInfo(client: UnipileClient): Record<string, unknown> | undefined {
  const seen = client.lastRateLimit;
  if (seen === undefined) return undefined;
  const info: Record<string, unknown> = { limit: seen.limit, remaining: seen.remaining, path: seen.path };
  if (seen.reset !== undefined) info.reset = seen.reset;
  const threshold = Math.max(2, Math.floor(seen.limit * 0.1));
  if (seen.remaining <= threshold) {
    info.warning = `Rate window nearly exhausted (${seen.remaining}/${seen.limit} remaining for ${seen.path}). Stop this action type until the window resets — do not spend the remaining budget.`;
  }
  return info;
}
