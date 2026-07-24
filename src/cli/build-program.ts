import { Command, Option } from "commander";
import { z } from "zod";
import { UnipileClient } from "../core/client.js";
import { resolveAccountId } from "../core/accounts.js";
import { operations } from "../core/operations/index.js";
import type { OperationDef } from "../core/operations/types.js";
import { UsageError, errorToText } from "../core/errors.js";
import { rateInfo } from "../core/rate.js";
import { renderHuman } from "./output.js";

export class CliError extends Error {
  override name = "CliError";
  constructor(message: string, readonly exitCode: 1 | 2) {
    super(message);
  }
}

export interface CliDeps {
  client: UnipileClient;
  defaultAccountId?: string;
  writeOut(line: string): void;
  writeErr(line: string): void;
  isTTY: boolean;
}

const kebab = (s: string) => s.replaceAll("_", "-");

interface FlagSpec {
  kind: "boolean" | "string" | "number" | "enum";
  array: boolean;
  choices?: string[];
  required: boolean;
  description: string;
}

function unwrap(schema: z.ZodTypeAny): { inner: z.ZodTypeAny; required: boolean } {
  let required = true;
  let inner = schema;
  for (;;) {
    if (inner instanceof z.ZodOptional) {
      required = false;
      inner = inner.unwrap() as z.ZodTypeAny;
    } else if (inner instanceof z.ZodDefault) {
      inner = inner.removeDefault() as z.ZodTypeAny;
    } else {
      break;
    }
  }
  return { inner, required };
}

export function flagSpec(schema: z.ZodTypeAny): FlagSpec {
  const { inner, required } = unwrap(schema);
  const description = schema.description ?? "";
  const base = (t: z.ZodTypeAny): Pick<FlagSpec, "kind" | "choices"> => {
    if (t instanceof z.ZodBoolean) return { kind: "boolean" };
    if (t instanceof z.ZodNumber) return { kind: "number" };
    if (t instanceof z.ZodEnum) return { kind: "enum", choices: t.options as string[] };
    if (t instanceof z.ZodString) return { kind: "string" };
    throw new Error(`Unsupported zod schema kind for CLI flag: ${t.constructor.name}`);
  };
  if (inner instanceof z.ZodArray) {
    return { ...base(unwrap(inner.element as z.ZodTypeAny).inner), array: true, required, description };
  }
  return { ...base(inner), array: false, required, description };
}

function addOpCommand(group: Command, op: OperationDef, deps: CliDeps): void {
  const cmd = group.command(op.cli.command).description(op.description);
  const positional = op.cli.positional;
  if (positional !== undefined) cmd.argument(`<${kebab(positional)}>`, (op.inputShape[positional] as z.ZodTypeAny).description ?? positional);

  for (const [key, schema] of Object.entries(op.inputShape)) {
    if (key === positional) continue;
    const spec = flagSpec(schema as z.ZodTypeAny);
    const flag = kebab(key);
    if (spec.kind === "boolean" && !spec.array) {
      cmd.option(`--${flag}`, spec.description);
      continue;
    }
    // Arrays are repeatable flags collected into an array; enums validate via choices.
    const opt = new Option(`--${flag} <value>`, spec.description);
    if (spec.choices !== undefined) opt.choices(spec.choices);
    if (spec.array) opt.argParser<string[]>((value, prev) => [...(prev ?? []), value]).default(undefined);
    if (spec.required) opt.makeOptionMandatory(true);
    cmd.addOption(opt);
  }
  cmd.option("--account <id>", "Unipile account id override");
  cmd.option("--json", "Force JSON output");

  cmd.action(async (...args: unknown[]) => {
    const opts = cmd.opts<Record<string, unknown>>();
    const input: Record<string, unknown> = {};
    if (positional !== undefined) input[positional] = args[0];
    for (const [key, schema] of Object.entries(op.inputShape)) {
      if (key === positional) continue;
      const camel = kebab(key).replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
      const raw = opts[camel];
      if (raw === undefined) continue;
      const spec = flagSpec(schema as z.ZodTypeAny);
      if (spec.kind === "number" && spec.array) input[key] = (raw as string[]).map(Number);
      else if (spec.kind === "number") input[key] = Number(raw);
      else input[key] = raw;
    }
    const json = opts.json === true || !deps.isTTY;
    try {
      const parsed = z.object(op.inputShape).parse(input);
      const accountId = await resolveAccountId(deps.client, (opts.account as string | undefined) ?? deps.defaultAccountId);
      const result = await op.run({ client: deps.client, accountId }, parsed);
      const rate = rateInfo(deps.client);
      const payload = rate === undefined ? result : { ...result, rate };
      deps.writeOut(json ? JSON.stringify(payload) : renderHuman(result));
      if (typeof rate?.warning === "string") deps.writeErr(`WARNING: ${rate.warning}`);
    } catch (err) {
      const message = err instanceof z.ZodError
        ? `Invalid input: ${err.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ")}`
        : errorToText(err);
      deps.writeErr(json ? JSON.stringify({ error: message }) : message);
      throw new CliError(message, err instanceof z.ZodError || err instanceof UsageError ? 2 : 1);
    }
  });
}

export function buildProgram(deps: CliDeps): Command {
  const program = new Command("linkedin").description("LinkedIn CLI backed by the Unipile v2 API");
  const groups = new Map<string, Command>();
  for (const op of operations) {
    let group = groups.get(op.cli.group);
    if (group === undefined) {
      group = program.command(op.cli.group).description(`${op.cli.group} commands`);
      groups.set(op.cli.group, group);
    }
    addOpCommand(group, op, deps);
  }
  return program;
}
