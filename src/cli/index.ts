import { CommanderError } from "commander";
import { UnipileClient } from "../core/client.js";
import { applyDotEnvLocal, loadConfig } from "../core/config.js";
import { buildProgram, CliError } from "./build-program.js";
import { registerRawCommand } from "./raw.js";

async function main(): Promise<void> {
  applyDotEnvLocal(process.cwd());
  const cfg = loadConfig(process.env);
  const client = new UnipileClient({ apiKey: cfg.apiKey, baseUrl: cfg.baseUrl, allowCustomBase: cfg.allowCustomBase });
  const program = buildProgram({
    client,
    defaultAccountId: cfg.accountId,
    writeOut: (l) => process.stdout.write(`${l}\n`),
    writeErr: (l) => process.stderr.write(`${l}\n`),
    isTTY: process.stdout.isTTY === true,
  });
  registerRawCommand(program, { client, defaultAccountId: cfg.accountId });
  program.exitOverride();
  try {
    await program.parseAsync(process.argv);
  } catch (err) {
    if (err instanceof CliError) {
      process.exitCode = err.exitCode; // message already printed by the action handler
    } else if (err instanceof CommanderError) {
      // commander already wrote its own message for most cases; help/version are success.
      // InvalidArgumentError thrown from inside an action handler (e.g. `raw`'s custom
      // argument parsers/body validation) reaches here as a CommanderError but commander
      // never printed it, so print it ourselves before setting the exit code.
      if (err.code === "commander.invalidArgument") {
        process.stderr.write(`${err.message}\n`);
      }
      process.exitCode = err.code === "commander.helpDisplayed" || err.code === "commander.version" ? 0 : 2;
    } else {
      process.stderr.write(`${err instanceof Error ? err.message : String(err)}\n`);
      process.exitCode = 1;
    }
  }
}

main().catch((err) => {
  process.stderr.write(`${err instanceof Error ? err.message : String(err)}\n`);
  process.exitCode = 1;
});
