import { UnipileApiError } from "./errors.js";

export interface RequestSpec {
  method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  path: string;
  query?: Record<string, string | number | boolean | string[] | undefined>;
  body?: unknown;
}

export interface UnipileClientOptions {
  apiKey: string;
  baseUrl?: string;
  fetchImpl?: typeof fetch;
  allowCustomBase?: boolean;
  timeoutMs?: number;
}

export const DEFAULT_BASE_URL = "https://api.unipile.com";

/**
 * One rate window as reported by Unipile's x-ratelimit-* headers — its authoritative counters,
 * read fresh off every response. Windows are per-endpoint, so we keep one per path.
 */
export interface RateLimitSnapshot {
  limit: number;
  remaining: number;
  /** Seconds remaining in the window at capture time (the header is a duration, not a timestamp). */
  resetInSeconds?: number;
  path: string;
  /** Epoch ms when this snapshot was captured, used to expire it once its window has elapsed. */
  capturedAt: number;
}

export class UnipileClient {
  readonly baseUrl: string;
  /**
   * Every rate window seen on this client, keyed by request path. Multi-call operations touch
   * several endpoints with independent windows; keeping them all lets callers report the
   * tightest one rather than whichever happened to be last.
   */
  readonly rateWindows = new Map<string, RateLimitSnapshot>();
  private readonly apiKey: string;
  private readonly fetchImpl: typeof fetch;
  private readonly timeoutMs: number;

  constructor(opts: UnipileClientOptions) {
    this.baseUrl = opts.baseUrl ?? DEFAULT_BASE_URL;
    const url = new URL(this.baseUrl);
    if (url.protocol !== "https:") {
      throw new Error(`Unipile base URL must use HTTPS, got: ${url.protocol}//`);
    }
    const host = url.hostname;
    const isUnipile = host === "unipile.com" || host.endsWith(".unipile.com");
    if (!isUnipile && !opts.allowCustomBase) {
      throw new Error(
        `Refusing to send the API key to non-unipile.com host "${host}". Set allowCustomBase / UNIPILE_ALLOW_CUSTOM_BASE=1 to override.`
      );
    }
    this.apiKey = opts.apiKey;
    this.fetchImpl = opts.fetchImpl ?? fetch;
    this.timeoutMs = opts.timeoutMs ?? 30_000;
  }

  async request<T>(spec: RequestSpec): Promise<T> {
    // SECURITY: spec.path must be a same-origin API path. Absolute, protocol-relative, or
    // backslash forms would override the validated base origin and leak X-API-KEY elsewhere.
    if (!spec.path.startsWith("/") || spec.path.startsWith("//") || spec.path.includes("\\")) {
      throw new Error(`Invalid API path "${spec.path}": must be a relative path starting with a single "/".`);
    }
    const url = new URL(spec.path, this.baseUrl);
    if (url.origin !== new URL(this.baseUrl).origin) {
      throw new Error(`Refusing cross-origin request to ${url.origin}.`);
    }
    for (const [key, value] of Object.entries(spec.query ?? {})) {
      if (value === undefined) continue;
      if (Array.isArray(value)) for (const v of value) url.searchParams.append(key, v);
      else url.searchParams.set(key, String(value));
    }
    const headers: Record<string, string> = { "X-API-KEY": this.apiKey, accept: "application/json" };
    let body: string | undefined;
    if (spec.body !== undefined) {
      headers["content-type"] = "application/json";
      body = JSON.stringify(spec.body);
    }
    const res = await this.fetchImpl(url, {
      method: spec.method,
      headers,
      body,
      signal: AbortSignal.timeout(this.timeoutMs),
    });
    const limitHeader = res.headers.get("x-ratelimit-limit");
    const remainingHeader = res.headers.get("x-ratelimit-remaining");
    if (limitHeader !== null && remainingHeader !== null && /^\d+$/.test(limitHeader) && /^\d+$/.test(remainingHeader)) {
      const resetHeader = res.headers.get("x-ratelimit-reset");
      const snapshot: RateLimitSnapshot = {
        limit: Number(limitHeader),
        remaining: Number(remainingHeader),
        path: spec.path,
        capturedAt: Date.now(),
      };
      // The header is a duration in seconds, not an epoch timestamp.
      if (resetHeader !== null && /^\d+$/.test(resetHeader)) snapshot.resetInSeconds = Number(resetHeader);
      this.rateWindows.set(spec.path, snapshot);
    }
    if (!res.ok) throw await toApiError(res);
    if (res.status === 204) return undefined as T;
    return (await res.json()) as T;
  }
}

async function toApiError(res: Response): Promise<UnipileApiError> {
  let parsed: { type?: string; title?: string; detail?: string; req_id?: string } = {};
  try {
    parsed = (await res.json()) as typeof parsed;
  } catch {
    // non-JSON body (proxy/gateway error pages)
  }
  const retryAfterRaw = res.headers.get("retry-after");
  const retryAfter = retryAfterRaw !== null && /^\d+$/.test(retryAfterRaw) ? Number(retryAfterRaw) : undefined;
  return new UnipileApiError(
    res.status,
    parsed.type ?? `http/${res.status}`,
    parsed.title ?? res.statusText ?? "Unknown error",
    parsed.detail,
    parsed.req_id,
    retryAfter
  );
}
