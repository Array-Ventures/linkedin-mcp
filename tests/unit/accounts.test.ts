import { describe, expect, it, vi } from "vitest";
import { UnipileClient } from "../../src/core/client.js";
import { resolveAccountId } from "../../src/core/accounts.js";
import { ConfigError } from "../../src/core/errors.js";

function clientReturning(pages: unknown[]) {
  let call = 0;
  const f = vi.fn(async () => new Response(JSON.stringify(pages[Math.min(call++, pages.length - 1)]), { status: 200 }));
  return { client: new UnipileClient({ apiKey: "k", fetchImpl: f as unknown as typeof fetch }), f };
}

const acc = (id: string, status = "running") => ({
  object: "Account", id, application_id: "app_1", user_id: "u", created_at: "2026-01-01", status, provider: "linkedin", metadata: {}, name: `Account ${id}`,
});

describe("resolveAccountId", () => {
  it("returns explicit id without any network call", async () => {
    const { client, f } = clientReturning([]);
    await expect(resolveAccountId(client, "acc_explicit")).resolves.toBe("acc_explicit");
    expect(f).not.toHaveBeenCalled();
  });

  it("rejects an explicit id that isn't a well-formed acc_ id, with zero fetch calls", async () => {
    const { client, f } = clientReturning([]);
    await expect(resolveAccountId(client, "https://evil")).rejects.toThrow(ConfigError);
    await expect(resolveAccountId(client, "x/../y")).rejects.toThrow(ConfigError);
    expect(f).not.toHaveBeenCalled();
  });

  it("auto-detects a single running linkedin account and caches it", async () => {
    const { client, f } = clientReturning([{ object: "Accounts", data: [acc("acc_1")], has_more: false }]);
    await expect(resolveAccountId(client)).resolves.toBe("acc_1");
    await expect(resolveAccountId(client)).resolves.toBe("acc_1");
    expect(f).toHaveBeenCalledTimes(1);
    const [url] = f.mock.calls[0] as unknown as [URL];
    expect(String(url)).toContain("provider=linkedin");
  });

  it("pages through has_more", async () => {
    const { client, f } = clientReturning([
      { object: "Accounts", data: [acc("acc_1", "disconnected")], has_more: true },
      { object: "Accounts", data: [acc("acc_2")], has_more: false },
    ]);
    const err = await resolveAccountId(client).catch((e) => e);
    // two accounts total -> ambiguous
    expect(err).toBeInstanceOf(ConfigError);
    expect(err.message).toContain("acc_1");
    expect(err.message).toContain("acc_2");
    expect(err.message).toContain("UNIPILE_ACCOUNT_ID");
    expect(f).toHaveBeenCalledTimes(2);
  });

  it("errors clearly when there are no linkedin accounts", async () => {
    const { client } = clientReturning([{ object: "Accounts", data: [], has_more: false }]);
    await expect(resolveAccountId(client)).rejects.toThrow(/No LinkedIn account/);
  });

  it("errors with reconnect guidance when the only account is disconnected", async () => {
    const { client } = clientReturning([{ object: "Accounts", data: [acc("acc_1", "disconnected")], has_more: false }]);
    await expect(resolveAccountId(client)).rejects.toThrow(/disconnected.*dashboard/s);
  });
});
