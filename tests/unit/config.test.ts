import { describe, expect, it } from "vitest";
import { loadConfig, parseDotEnv } from "../../src/core/config.js";
import { ConfigError } from "../../src/core/errors.js";

describe("parseDotEnv", () => {
  it("parses KEY=VALUE, ignores comments/blanks, strips quotes, keeps '=' in values", () => {
    const out = parseDotEnv('# c\n\nA=1\nB="two words"\nC=a=b\nexport D=4\n');
    expect(out).toEqual({ A: "1", B: "two words", C: "a=b", D: "4" });
  });
});

describe("loadConfig", () => {
  it("throws ConfigError without UNIPILE_API_KEY", () => {
    expect(() => loadConfig({} as NodeJS.ProcessEnv)).toThrow(ConfigError);
  });
  it("reads key, base url, account id, custom-base flag", () => {
    const cfg = loadConfig({
      UNIPILE_API_KEY: "k",
      UNIPILE_BASE_URL: "https://api9.unipile.com:14001",
      UNIPILE_ACCOUNT_ID: "acc_x",
      UNIPILE_ALLOW_CUSTOM_BASE: "1",
    } as NodeJS.ProcessEnv);
    expect(cfg).toEqual({
      apiKey: "k",
      baseUrl: "https://api9.unipile.com:14001",
      accountId: "acc_x",
      allowCustomBase: true,
    });
  });
});
