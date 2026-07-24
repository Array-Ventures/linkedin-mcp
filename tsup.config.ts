import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/mcp/index.ts", "src/cli/index.ts"],
  format: ["esm"],
  clean: true,
  banner: { js: "#!/usr/bin/env node" },
});
