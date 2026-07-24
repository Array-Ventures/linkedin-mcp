export class ConfigError extends Error {
  override name = "ConfigError";
}

export class UsageError extends Error {
  override name = "UsageError";
}

export function formatApiError(
  status: number,
  type: string,
  title: string,
  detail?: string,
  reqId?: string,
  retryAfterSeconds?: number
): string {
  const ref = reqId ? ` (req_id: ${reqId})` : "";
  const extra = detail ? ` — ${detail}` : "";
  if (status === 429) {
    const retry = retryAfterSeconds !== undefined ? `Retry after ${retryAfterSeconds}s.` : "Retry later.";
    if (type.startsWith("provider/")) {
      return `LinkedIn action limit hit (likely a daily/weekly quota): ${title}. ${retry} Consider pausing this action type for today.${ref}`;
    }
    return `Unipile API rate limit hit: ${title}. ${retry}${ref}`;
  }
  if (status === 401) {
    return `Authentication failed: ${title}. Check that UNIPILE_API_KEY is set and valid.${ref}`;
  }
  if (status === 403) {
    return `Not allowed: ${title}${extra}. The API key lacks permission for this operation (plan or scope issue).${ref}`;
  }
  if (type.includes("disconnected") || type.includes("checkpoint") || type.includes("credentials")) {
    return `LinkedIn account needs attention: ${title}${extra}. Reconnect the account in the Unipile dashboard.${ref}`;
  }
  return `Unipile error ${status} (${type}): ${title}${extra}${ref}`;
}

export class UnipileApiError extends Error {
  override name = "UnipileApiError";
  constructor(
    readonly status: number,
    readonly type: string,
    readonly title: string,
    readonly detail?: string,
    readonly reqId?: string,
    readonly retryAfterSeconds?: number
  ) {
    super(formatApiError(status, type, title, detail, reqId, retryAfterSeconds));
  }
}
