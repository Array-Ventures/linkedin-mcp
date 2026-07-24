import { describe, expect, it, vi } from "vitest";
import { Command } from "commander";
import { UnipileClient } from "../../src/core/client.js";
import { registerRawCommand } from "../../src/cli/raw.js";

function makeRaw(responses: Array<{ status?: number; body: unknown }>) {
  let i = 0;
  const f = vi.fn(async () => {
    const r = responses[Math.min(i++, responses.length - 1)]!;
    return new Response(JSON.stringify(r.body), { status: r.status ?? 200 });
  });
  const program = new Command("linkedin");
  program.exitOverride();
  const out: string[] = [];
  program.configureOutput({ writeOut: (s) => out.push(s), writeErr: (s) => out.push(s) });
  registerRawCommand(program, {
    client: new UnipileClient({ apiKey: "k", fetchImpl: f as unknown as typeof fetch }),
    defaultAccountId: "acc_1",
    writeOut: (l) => out.push(l),
  });
  return { program, out, f };
}

describe("linkedin raw", () => {
  it("substitutes {account_id}, forwards query and body", async () => {
    const { program, f, out } = makeRaw([{ body: { ok: true } }]);
    await program.parseAsync([
      "node", "linkedin", "raw", "post", "/v2/{account_id}/linkedin/search/people",
      "--query", "limit=5", "--body", '{"keywords":"x"}',
    ]);
    const [url, init] = f.mock.calls[0] as unknown as [URL, { method: string; body: string }];
    expect(String(url)).toBe("https://api.unipile.com/v2/acc_1/linkedin/search/people?limit=5");
    expect(init.method).toBe("POST");
    expect(JSON.parse(init.body)).toEqual({ keywords: "x" });
    expect(JSON.parse(out.join(""))).toEqual({ ok: true });
  });

  it("rejects invalid methods and invalid JSON bodies", async () => {
    const { program } = makeRaw([{ body: {} }]);
    await expect(program.parseAsync(["node", "linkedin", "raw", "trace", "/x"])).rejects.toThrow();
    await expect(
      program.parseAsync(["node", "linkedin", "raw", "post", "/x", "--body", "{bad"])
    ).rejects.toThrow(/JSON/);
  });
});
