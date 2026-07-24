import { Command, InvalidArgumentError, Option } from "commander";
import { UnipileClient } from "../core/client.js";
import { resolveAccountId } from "../core/accounts.js";
import type { RequestSpec } from "../core/client.js";

export interface RawDeps {
  client: UnipileClient;
  defaultAccountId?: string;
  writeOut?(line: string): void;
}

const METHODS = ["GET", "POST", "PATCH", "PUT", "DELETE"] as const;

export function registerRawCommand(program: Command, deps: RawDeps): void {
  const write = deps.writeOut ?? ((l: string) => process.stdout.write(`${l}\n`));
  program
    .command("raw")
    .description(
      "Escape hatch: call any Unipile v2 endpoint directly. {account_id} in the path is replaced with the resolved account id. Prefer the wrapped commands — raw calls skip their safeguards."
    )
    .argument("<method>", "HTTP method (GET/POST/PATCH/PUT/DELETE)", (v: string) => {
      const m = v.toUpperCase();
      if (!(METHODS as readonly string[]).includes(m)) throw new InvalidArgumentError(`Method must be one of ${METHODS.join(", ")}`);
      return m;
    })
    .argument("<path>", "API path, e.g. /v2/{account_id}/linkedin/search/parameters")
    .option("--body <json>", "JSON request body")
    .option("--query <k=v...>", "Query parameters (repeatable)")
    .option("--account <id>", "Unipile account id override")
    .action(async (method: string, path: string, opts: { body?: string; query?: string[]; account?: string }) => {
      let body: unknown;
      if (opts.body !== undefined) {
        try {
          body = JSON.parse(opts.body);
        } catch {
          throw new InvalidArgumentError("--body must be valid JSON");
        }
      }
      const query: Record<string, string> = {};
      for (const pair of opts.query ?? []) {
        const eq = pair.indexOf("=");
        if (eq <= 0) throw new InvalidArgumentError(`--query expects k=v, got "${pair}"`);
        query[pair.slice(0, eq)] = pair.slice(eq + 1);
      }
      const accountId = path.includes("{account_id}")
        ? await resolveAccountId(deps.client, opts.account ?? deps.defaultAccountId)
        : undefined;
      const finalPath = accountId === undefined ? path : path.replaceAll("{account_id}", accountId);
      const result = await deps.client.request<unknown>({ method: method as RequestSpec["method"], path: finalPath, query, body });
      write(JSON.stringify(result, null, 2));
    });
}
