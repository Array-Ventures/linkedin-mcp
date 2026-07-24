import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ConfigError } from "./errors.js";
import { DEFAULT_BASE_URL } from "./client.js";

export function parseDotEnv(content: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const rawLine of content.split("\n")) {
    const line = rawLine.trim();
    if (line === "" || line.startsWith("#")) continue;
    const withoutExport = line.startsWith("export ") ? line.slice("export ".length) : line;
    const eq = withoutExport.indexOf("=");
    if (eq <= 0) continue;
    const key = withoutExport.slice(0, eq).trim();
    let value = withoutExport.slice(eq + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    out[key] = value;
  }
  return out;
}

/** Reads <dir>/.env.local if present and sets ONLY unset process env keys. Bin entrypoints only. */
export function applyDotEnvLocal(dir: string, env: NodeJS.ProcessEnv = process.env): void {
  let content: string;
  try {
    content = readFileSync(join(dir, ".env.local"), "utf8");
  } catch {
    return;
  }
  for (const [key, value] of Object.entries(parseDotEnv(content))) {
    if (env[key] === undefined) env[key] = value;
  }
}

export interface Config {
  apiKey: string;
  baseUrl: string;
  accountId?: string;
  allowCustomBase: boolean;
}

export function loadConfig(env: NodeJS.ProcessEnv): Config {
  const apiKey = env.UNIPILE_API_KEY;
  if (!apiKey) {
    throw new ConfigError(
      "UNIPILE_API_KEY is not set. Add it to your environment or .env.local (see README). Get a key at https://dashboard.unipile.com."
    );
  }
  const cfg: Config = {
    apiKey,
    baseUrl: env.UNIPILE_BASE_URL ?? DEFAULT_BASE_URL,
    allowCustomBase: env.UNIPILE_ALLOW_CUSTOM_BASE === "1",
  };
  if (env.UNIPILE_ACCOUNT_ID) cfg.accountId = env.UNIPILE_ACCOUNT_ID;
  return cfg;
}
