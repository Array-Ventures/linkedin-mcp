import type { OpCtx, OperationDef } from "../../src/core/operations/types.js";

export function createOpRunner(ctx: OpCtx) {
  let mockVerified = false;
  return {
    confirmMockProvider(provider: string): void {
      if (provider !== "mock") {
        throw new Error(`SAFETY: integration tests require a mock-provider account, got "${provider}".`);
      }
      mockVerified = true;
    },
    async run(op: OperationDef, input: Record<string, unknown>): Promise<Record<string, unknown>> {
      if (op.mutates && !mockVerified) {
        throw new Error(`SAFETY: mutating operation ${op.name} blocked — mock provider not verified.`);
      }
      return op.run(ctx, input);
    },
  };
}
