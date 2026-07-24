import { describe, expect, it } from "vitest";
import { operations } from "../../src/core/operations/index.js";

describe("operations registry", () => {
  it("has 22 uniquely-named linkedin_ tools", () => {
    expect(operations).toHaveLength(22);
    const names = operations.map((o) => o.name);
    expect(new Set(names).size).toBe(names.length);
    for (const n of names) expect(n).toMatch(/^linkedin_[a-z_]+$/);
  });

  it("keeps annotations consistent with mutates (safety fuse contract)", () => {
    for (const op of operations) {
      expect(op.annotations.readOnlyHint).toBe(!op.mutates);
      expect(op.annotations.destructiveHint).toBe(op.mutates);
      expect(op.annotations.idempotentHint).toBe(!op.mutates);
      expect(op.annotations.openWorldHint).toBe(true);
    }
  });

  it("has unique CLI group+command pairs", () => {
    const pairs = operations.map((o) => `${o.cli.group} ${o.cli.command}`);
    expect(new Set(pairs).size).toBe(pairs.length);
  });
});
