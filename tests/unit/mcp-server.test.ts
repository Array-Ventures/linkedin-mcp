import { describe, expect, it, vi } from "vitest";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { UnipileClient } from "../../src/core/client.js";
import { buildServer } from "../../src/mcp/server.js";

async function connect(responses: Array<{ status?: number; body: unknown }>) {
  let i = 0;
  const f = vi.fn(async () => {
    const r = responses[Math.min(i++, responses.length - 1)]!;
    return new Response(JSON.stringify(r.body), { status: r.status ?? 200 });
  });
  const server = buildServer({
    client: new UnipileClient({ apiKey: "k", fetchImpl: f as unknown as typeof fetch }),
    defaultAccountId: "acc_1",
  });
  const [clientT, serverT] = InMemoryTransport.createLinkedPair();
  const mcp = new Client({ name: "test", version: "0.0.0" });
  await Promise.all([server.connect(serverT), mcp.connect(clientT)]);
  return { mcp, f };
}

describe("MCP server", () => {
  it("exposes all 22 tools with annotations", async () => {
    const { mcp } = await connect([]);
    const tools = await mcp.listTools();
    expect(tools.tools).toHaveLength(22);
    const send = tools.tools.find((t) => t.name === "linkedin_send_message")!;
    expect(send.annotations?.destructiveHint).toBe(true);
    const list = tools.tools.find((t) => t.name === "linkedin_list_chats")!;
    expect(list.annotations?.readOnlyHint).toBe(true);
    expect(list.inputSchema.properties).toHaveProperty("account");
  });

  it("runs a read tool and returns structuredContent + text", async () => {
    const { mcp } = await connect([
      { body: { data: [{ object: "Inbox", id: "CLASSIC_PRIMARY", disabled: false }] } },
      { body: { data: [{ id: "c1" }], next_cursor: "n" } },
    ]);
    const res = await mcp.callTool({ name: "linkedin_list_chats", arguments: { limit: 1 } });
    expect(res.isError).toBeFalsy();
    expect(res.structuredContent).toEqual({ items: [{ id: "c1" }], next_cursor: "n" });
    expect((res.content as Array<{ type: string; text: string }>)[0]!.text).toContain('"c1"');
  });

  it("returns isError tool results (not protocol errors) for API failures", async () => {
    const { mcp } = await connect([
      { status: 429, body: { type: "provider/too_many_requests", title: "Too many", req_id: "r1" } },
    ]);
    const res = await mcp.callTool({ name: "linkedin_list_chats", arguments: {} });
    expect(res.isError).toBe(true);
    const text = (res.content as Array<{ type: string; text: string }>)[0]!.text;
    expect(text).toContain("LinkedIn action limit");
    expect(text).toContain("r1");
  });
});
