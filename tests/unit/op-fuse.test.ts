import { describe, expect, it, vi } from "vitest";
import { createOpRunner } from "../helpers/op-fuse.js";
import { startChat, listChats } from "../../src/core/operations/messaging.js";
import type { OpCtx } from "../../src/core/operations/types.js";

function countingCtx() {
  const request = vi.fn(async () => ({ data: [] }));
  return { ctx: { client: { request } as unknown as OpCtx["client"], accountId: "acc_t" }, request };
}

describe("integration op fuse", () => {
  it("blocks mutating ops before mock verification, with zero network calls", async () => {
    const { ctx, request } = countingCtx();
    const runner = createOpRunner(ctx);
    await expect(runner.run(startChat, { user_id: "u", text: "x" })).rejects.toThrow(/SAFETY/);
    expect(request).not.toHaveBeenCalled();
  });

  it("refuses to verify a non-mock provider (mutations stay blocked)", async () => {
    const { ctx, request } = countingCtx();
    const runner = createOpRunner(ctx);
    expect(() => runner.confirmMockProvider("linkedin")).toThrow(/mock-provider/);
    await expect(runner.run(startChat, { user_id: "u", text: "x" })).rejects.toThrow(/SAFETY/);
    expect(request).not.toHaveBeenCalled();
  });

  it("allows reads before verification and mutations after mock confirmation", async () => {
    const { ctx, request } = countingCtx();
    const runner = createOpRunner(ctx);
    await runner.run(listChats, {});
    // listChats now discovers inboxes first (empty -> generic route): 2 requests
    expect(request).toHaveBeenCalledTimes(2);
    runner.confirmMockProvider("mock");
    await runner.run(startChat, { user_id: "u", text: "x" }).catch(() => undefined); // shape errors irrelevant here
    expect(request).toHaveBeenCalledTimes(3);
  });
});
