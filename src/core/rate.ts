import { UnipileClient } from "./client.js";
import type { RateLimitSnapshot } from "./client.js";

/** Warn once a window drops to this fraction of its limit (floor of 2 calls for small windows). */
const WARN_FRACTION = 0.1;

function warnThreshold(limit: number): number {
  return Math.max(2, Math.floor(limit * WARN_FRACTION));
}

function isExpired(w: RateLimitSnapshot, now: number): boolean {
  if (w.resetInSeconds === undefined) return false;
  return now >= w.capturedAt + w.resetInSeconds * 1000;
}

/**
 * The "header brake": report the tightest OBSERVED rate window, so agents slow
 * down before hitting a 429. Multi-call operations touch several endpoints with independent
 * windows; reporting the last one seen would hide a nearly-exhausted window behind a healthy one.
 * "Tightest" is measured by fraction remaining, since windows have different sizes.
 *
 * Headers expose only one checked window per response, without a rule identifier.
 * This cannot reveal every applicable window or guarantee a later request is allowed.
 * The window is a ceiling, NEVER a target.
 */
export function rateInfo(client: UnipileClient, now: number = Date.now()): Record<string, unknown> | undefined {
  let tightest: RateLimitSnapshot | undefined;
  for (const w of client.rateWindows.values()) {
    if (isExpired(w, now)) continue;
    if (w.limit <= 0) continue;
    if (tightest === undefined || w.remaining / w.limit < tightest.remaining / tightest.limit) tightest = w;
  }
  if (tightest === undefined) return undefined;

  const info: Record<string, unknown> = {
    limit: tightest.limit,
    remaining: tightest.remaining,
    path: tightest.path,
    windows_tracked: client.rateWindows.size,
  };
  if (tightest.resetInSeconds !== undefined) {
    // Named for clarity: the value is a duration, not an epoch timestamp.
    const elapsed = Math.floor((now - tightest.capturedAt) / 1000);
    info.reset_in_seconds = Math.max(0, tightest.resetInSeconds - elapsed);
  }
  if (tightest.remaining <= warnThreshold(tightest.limit)) {
    info.warning = `Rate window nearly exhausted (${tightest.remaining}/${tightest.limit} remaining for ${tightest.path}). Stop this action type until the window resets — do not spend the remaining budget.`;
  }
  return info;
}
