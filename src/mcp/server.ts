import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { UnipileClient } from "../core/client.js";
import { resolveAccountId } from "../core/accounts.js";
import { operations } from "../core/operations/index.js";
import { errorToText } from "../core/errors.js";

export interface ServerDeps {
  client: UnipileClient;
  defaultAccountId?: string;
}

export function buildServer(deps: ServerDeps): McpServer {
  const server = new McpServer({ name: "linkedin-mcp", version: "0.1.0" });
  for (const op of operations) {
    server.registerTool(
      op.name,
      {
        title: op.title,
        description: op.description,
        inputSchema: {
          ...op.inputShape,
          account: z.string().optional().describe("Unipile account id (acc_…) override; defaults to the connected LinkedIn account"),
        },
        outputSchema: op.outputShape,
        annotations: op.annotations,
      },
      async ({ account, ...input }: Record<string, unknown> & { account?: string }) => {
        try {
          const accountId = await resolveAccountId(deps.client, account ?? deps.defaultAccountId);
          const result = await op.run({ client: deps.client, accountId }, input);
          return {
            content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
            structuredContent: result,
          };
        } catch (err) {
          return { isError: true, content: [{ type: "text" as const, text: errorToText(err) }] };
        }
      }
    );
  }
  return server;
}
