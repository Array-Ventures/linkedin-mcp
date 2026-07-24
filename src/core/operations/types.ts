import type { z } from "zod";
import type { UnipileClient } from "../client.js";

export interface OpCtx {
  client: UnipileClient;
  accountId: string;
}

export interface OperationDef {
  name: `linkedin_${string}`;
  title: string;
  description: string;
  /** True when the operation changes any external state. Drives destructiveHint and the integration-test fuse. */
  mutates: boolean;
  inputShape: z.ZodRawShape;
  outputShape: z.ZodRawShape;
  annotations: {
    readOnlyHint: boolean;
    destructiveHint: boolean;
    idempotentHint: boolean;
    openWorldHint: true;
  };
  cli: { group: string; command: string; positional?: string };
  run(ctx: OpCtx, input: Record<string, unknown>): Promise<Record<string, unknown>>;
}

export function defineOperation(def: OperationDef): OperationDef {
  if (def.annotations.destructiveHint !== def.mutates || def.annotations.readOnlyHint === def.mutates) {
    throw new Error(`Operation ${def.name}: annotations inconsistent with mutates=${String(def.mutates)}`);
  }
  return def;
}
