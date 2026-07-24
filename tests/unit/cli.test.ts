import { describe, expect, it, vi } from "vitest";
import { UnipileClient } from "../../src/core/client.js";
import { buildProgram } from "../../src/cli/build-program.js";
import { renderHuman } from "../../src/cli/output.js";

function makeCli(responses: Array<{ status?: number; body: unknown }>, isTTY = false) {
  let i = 0;
  const f = vi.fn(async () => {
    const r = responses[Math.min(i++, responses.length - 1)]!;
    return new Response(JSON.stringify(r.body), { status: r.status ?? 200 });
  });
  const out: string[] = [];
  const err: string[] = [];
  const program = buildProgram({
    client: new UnipileClient({ apiKey: "k", fetchImpl: f as unknown as typeof fetch }),
    defaultAccountId: "acc_1",
    writeOut: (l) => out.push(l),
    writeErr: (l) => err.push(l),
    isTTY,
  });
  program.exitOverride(); // commander throws instead of process.exit in tests
  return { program, out, err, f };
}
const argv = (s: string) => ["node", "linkedin", ...s.split(" ")];

describe("linkedin CLI", () => {
  it("runs chats list and prints JSON when piped", async () => {
    const { program, out } = makeCli([{ body: { data: [{ id: "c1" }], next_cursor: "n" } }]);
    await program.parseAsync(argv("chats list --limit 2"));
    const parsed = JSON.parse(out.join("\n"));
    expect(parsed).toEqual({ items: [{ id: "c1" }], next_cursor: "n" });
  });

  it("maps kebab flags and positionals to op input", async () => {
    const { program, f } = makeCli([{ body: { object: "UserProfile", id: "u" } }]);
    await program.parseAsync(argv("profile get me --sections linkedin_experience --sections linkedin_skills"));
    const [url] = f.mock.calls[0] as unknown as [URL];
    expect(String(url)).toBe(
      "https://api.unipile.com/v2/acc_1/users/me?with_sections=linkedin_experience&with_sections=linkedin_skills"
    );
  });

  it("respects --account override", async () => {
    const { program, f } = makeCli([{ body: { data: [] } }]);
    await program.parseAsync(argv("chats list --account acc_override"));
    expect(String((f.mock.calls[0] as unknown as [URL])[0])).toContain("/v2/acc_override/chats");
  });

  it("exits 1 with stderr JSON on API errors in JSON mode", async () => {
    const { program, err } = makeCli([{ status: 429, body: { type: "api/too_many_requests", title: "Too many" } }]);
    await expect(program.parseAsync(argv("chats list --json"))).rejects.toMatchObject({ exitCode: 1 });
    const payload = JSON.parse(err.join("\n"));
    expect(payload.error).toContain("rate limit");
  });

  it("rejects bad enum values and missing required flags before running", async () => {
    const a = makeCli([{ body: {} }]);
    await expect(a.program.parseAsync(argv("invitations list --direction bogus"))).rejects.toThrow();
    expect(a.f).not.toHaveBeenCalled();
    const b = makeCli([{ body: {} }]);
    await expect(b.program.parseAsync(argv("messages send --text hi"))).rejects.toThrow();
    expect(b.f).not.toHaveBeenCalled();
  });
});

describe("renderHuman", () => {
  it("renders pages as lines and objects as JSON", () => {
    const page = renderHuman({ items: [{ id: "c1", name: "Chat one" }], next_cursor: "n2" });
    expect(page).toContain("c1");
    expect(page).toContain("Chat one");
    expect(page).toContain("next_cursor: n2");
    expect(renderHuman({ result: "Ok" })).toContain('"result"');
  });

  it("renders offset-based pagination fields", () => {
    const page = renderHuman({ items: [{ id: "c1" }], offset: 2, next_offset: 4 });
    expect(page).toContain("offset: 2");
    expect(page).toContain("next_offset: 4");
  });
});
