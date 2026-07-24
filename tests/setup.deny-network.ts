import { beforeAll } from "vitest";

beforeAll(() => {
  globalThis.fetch = (async () => {
    throw new Error(
      "Network access is denied in unit tests. Inject a fake fetch via new UnipileClient({ fetchImpl })."
    );
  }) as typeof fetch;
});
