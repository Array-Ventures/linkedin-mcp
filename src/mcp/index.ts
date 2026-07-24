import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { UnipileClient } from "../core/client.js";
import { applyDotEnvLocal, loadConfig } from "../core/config.js";
import { buildServer } from "./server.js";
import { operations } from "../core/operations/index.js";

async function main(): Promise<void> {
  applyDotEnvLocal(process.cwd());
  const cfg = loadConfig(process.env);
  const client = new UnipileClient({ apiKey: cfg.apiKey, baseUrl: cfg.baseUrl, allowCustomBase: cfg.allowCustomBase });
  const server = buildServer({ client, defaultAccountId: cfg.accountId });
  await server.connect(new StdioServerTransport());
  console.error(`linkedin-mcp: ${operations.length} tools ready on stdio`);
}

main().catch((err) => {
  console.error(`linkedin-mcp failed to start: ${err instanceof Error ? err.message : String(err)}`);
  process.exit(1);
});
