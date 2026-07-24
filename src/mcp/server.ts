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

const INSTRUCTIONS = `LinkedIn tools acting AS THE ACCOUNT OWNER via Unipile. Workflow:
1. Run linkedin_whoami first — it returns the connected account, products (classic/sales_navigator/recruiter — gates which features work), available message inboxes, your profile, and InMail credits.
2. IDs flow between tools: linkedin_search → user ids → linkedin_get_profile / linkedin_start_chat; linkedin_list_chats → chat ids → linkedin_list_messages / linkedin_send_message; linkedin_list_invitations → request ids → linkedin_respond_invitation. Resolve search filter ids with linkedin_get_search_parameters before filtering.
3. Safety (protects the user's real LinkedIn account): every send/invite/post/comment/react is user-visible — treat text as final copy. Space write actions ~60s apart. On a 429 error, STOP that action type; the message says whether it is a Unipile or LinkedIn quota and when to retry. Never retry a failed write.
4. Search is classic-only in this version. Messaging someone with a PENDING received invitation requires relation_request_id on linkedin_start_chat.`;

export function buildServer(deps: ServerDeps): McpServer {
  const server = new McpServer({ name: "linkedin-mcp", version: "0.1.0" }, { instructions: INSTRUCTIONS });
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
