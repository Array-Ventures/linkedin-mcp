# linkedin-mcp

An MCP (Model Context Protocol) server and CLI for operating LinkedIn at scale through the Unipile v2 API. Automate messaging, inbox triage, outreach, profiles, posts, search, and engagement on behalf of a connected LinkedIn account.

> ⚠️ **Read before using.** This tool acts as a real person on a real LinkedIn account, and
> **LinkedIn's Terms of Service prohibit automated access**. Accounts that behave like bots get
> restricted or banned — that risk is yours, not the maintainers'. Use it deliberately: keep
> Unipile's rate limits at their recommended values, space write actions out, never run bulk
> outreach unattended, and treat every message, invitation, post and comment as something a human
> signed off on. The software is provided as-is with no warranty (see [LICENSE](LICENSE)); you are
> responsible for how you use it and for complying with LinkedIn's terms and applicable law
> (including data-protection rules if you store what you retrieve).

## What It Is

**linkedin-mcp** exposes:
- **MCP Server** (`dist/mcp/index.js`): 42-tool server for Claude Code and Claude Desktop to operate LinkedIn via Unipile.
- **CLI** (`linkedin`): Human-friendly command-line interface (`dist/cli/index.js`) for direct LinkedIn operations, with output formatted for both terminals and piping.
- **Agent Skill** (`skills/linkedin/SKILL.md`): Reusable skill for Claude and agents to safely operate LinkedIn.

All tools are backed by the Unipile v2 REST API and require a valid account and API key.

## Install

```bash
npm install
npm run build
```

The build outputs to `dist/` with two entry points:
- **MCP server**: `dist/mcp/index.js`
- **CLI**: `dist/cli/index.js`

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `UNIPILE_API_KEY` | Yes | — | Unipile API key for authentication. Get one from the [Unipile dashboard](https://dashboard.unipile.com). |
| `UNIPILE_BASE_URL` | No | `https://api.unipile.com` | Base URL for the Unipile API. |
| `UNIPILE_ACCOUNT_ID` | No | — | Explicit account ID override (auto-resolved from the API key if omitted). |
| `UNIPILE_ALLOW_CUSTOM_BASE` | No | unset | Set to `1` to allow a `UNIPILE_BASE_URL` whose host is not `unipile.com` or a `*.unipile.com` subdomain (security check). |
| `UNIPILE_API_KEY_TEST` | No | — | API key for a separate Unipile app, pointed at a mock-provider test account, used only by the integration test suite. |
| `UNIPILE_ACCOUNT_ID_TEST` | No | — | The mock-provider test account id in that separate app. |
| `UNIPILE_BASE_URL_TEST` | No | `https://api.unipile.com` | Base URL for the test app (only needed if it differs from the default). |
| `UNIPILE_TEST_LIVE` | No | `0` | Set to `1` to actually run the integration suite against the mock-provider test account (requires `UNIPILE_API_KEY_TEST` / `UNIPILE_ACCOUNT_ID_TEST`); `0` (or unset) skips the suite. |

### Example `.env.local`

```
UNIPILE_API_KEY=uapi_xxxxxxxxxxxxxxxxxxxxxxxx
UNIPILE_BASE_URL=https://api.unipile.com
UNIPILE_API_KEY_TEST=uapi_test_xxxxxxxxxxxx
UNIPILE_ACCOUNT_ID_TEST=acc_xxxxxxxxxxxx
UNIPILE_BASE_URL_TEST=https://api.unipile.com
UNIPILE_TEST_LIVE=0
```

## MCP Registration (Claude Desktop / Code)

To use the MCP server with Claude Desktop, add this to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "linkedin": {
      "command": "node",
      "args": ["/absolute/path/to/linkedin-mcp/dist/mcp/index.js"]
    }
  }
}
```

Restart Claude Desktop. All 42 tools will now be available to Claude for LinkedIn operations.

## CLI Quickstart

All commands output human-readable text on a TTY and JSON when piped or with `--json`. Errors go to stderr.

### 1. Check Setup

```bash
linkedin whoami show   # 1 cheap request: account + products. Add --include inboxes|profile|inmail_credits for extras.
```

Shows your connected account, profile, and InMail credits. If this fails, verify `UNIPILE_API_KEY` and check the Unipile dashboard.

### 2. List Unread Messages

```bash
linkedin chats list --limit 10   # CLASSIC_PRIMARY inbox (auto-discovered); use --inbox for CLASSIC_ARCHIVED / CLASSIC_SPAM / CLASSIC_JOBS etc.
                                 # unread state: check each chat's unread_count (LinkedIn has no server-side unread filter)
```

Fetch your 10 most recent unread conversations. Use `--json` to get structured output for parsing.

### 3. Send a Direct Message

```bash
linkedin messages send --chat-id <chat-id> --text "Your message here"
```

Send a message to an existing conversation. For a new outreach:

```bash
linkedin chats start --user-id <user-id> --text "Hey! Interested in connecting."
```

### Additional Commands

See `skills/linkedin/SKILL.md` for the full command reference, including:
- Profiles & company lookups
- Invitations (send/respond/list)
- Posts and comments
- Full-text and filter-based search
- The `raw` escape hatch for API methods not wrapped by the CLI

## Testing

### Unit Tests (Offline)

Unit tests are offline by construction: the global `fetch` is replaced with a function that
throws, so the only way HTTP happens in a unit test is via an explicitly injected `fetchImpl`
returning a fake `Response`. Run them with:

```bash
npm test
```

Tests live in `tests/unit/` and validate parsing, validation, and formatting logic in isolation.
No unit test makes a real network call, and none can reach Unipile's production API.

### Integration Tests (Mock-Provider Test Account)

Integration tests run ONLY against a Unipile **mock-provider test account**, which lives in a
*separate* Unipile app from production — never against the live LinkedIn API or the production
account. Launch them with:

```bash
bash scripts/run-integration.sh
```

This script:
1. Extracts ONLY `UNIPILE_API_KEY_TEST`, `UNIPILE_ACCOUNT_ID_TEST`, and `UNIPILE_BASE_URL_TEST`
   from `.env.local` — nothing else, and never `UNIPILE_API_KEY`.
2. Launches vitest under a scrubbed `env -i` environment containing only those three variables
   (plus `PATH`/`HOME`/`TERM`) and `UNIPILE_TEST_LIVE=1`, so production credentials can never
   enter the test process, even if they're present in your shell or `.env.local`.
3. Relies on a safety fuse (`tests/helpers/op-fuse.ts`) that fetches the target account before
   any test runs and throws unless its provider is verified to be `"mock"`. Every mutating
   operation is blocked until that check passes.

You can also invoke vitest directly:

```bash
npm run test:integration
```

but without `UNIPILE_TEST_LIVE=1` set (and the `*_TEST` credentials present), the suite is
skipped entirely — running it with no environment variables configured exits `0` having run
nothing. There is no local mock HTTP server; "mock" refers to Unipile's own mock-provider
account type in that separate test app.

Production is never touched by any automated test in this repository.

## Safety & Behavioral Rules

**IMPORTANT**: The LinkedIn CLI operates on a real LinkedIn account. Every action is permanent and immediate.

### Account Protection

- **Every send/invite/post/comment/react acts AS THE ACCOUNT OWNER on the real LinkedIn.** Treat wording as final copy; there is no undo.
- **Unipile enforces LinkedIn's rate limits server-side** (roughly 80–100 invitations/day, 100–150 messages/day, 1000 search profiles/day). On a 429 (Too Many Requests) error:
  - STOP that action type immediately.
  - Read the error response — it tells you whether it's a Unipile limit or LinkedIn's quota and when to retry.
  - Never automatically retry a write operation.
- **Space write actions** by at least ~60 seconds with randomized timing. Burst-writing looks like automation and risks LinkedIn restricting the account.
- **Bulk outreach** must be drafted first, reviewed and signed off by a human, then sent slowly over time (not in a loop).

### Access Control

- Keep `UNIPILE_API_KEY` and `UNIPILE_BASE_URL` secret. Do not commit `.env.local` or API keys to version control.
- `UNIPILE_ALLOW_CUSTOM_BASE` is unset (disabled) by default; set it to `1` only when using a trusted custom server.
- Test credentials (`UNIPILE_API_KEY_TEST`) belong to a separate Unipile app pointed at a mock-provider test account — never production.

## Troubleshooting

**"missing UNIPILE_API_KEY"**
- Set `UNIPILE_API_KEY` in your environment or `.env.local`.
- Verify the key is valid in the [Unipile dashboard](https://dashboard.unipile.com).

**"429 Too Many Requests"**
- You've hit a rate limit. Wait the time specified in the error response, then retry (manually).
- Review whether your script is sending bulk messages or invitations. Space them out.

**MCP server not connecting**
- Verify the `dist/mcp/index.js` path is absolute in `claude_desktop_config.json`.
- Restart Claude Desktop.
- Check Claude Desktop logs (`Help > Show Logs`) for connection errors.

**CLI not found after install**
- Run `npm run build` to generate `dist/cli/index.js`.
- Or invoke directly: `node dist/cli/index.js --help`.

## License

MIT


## Unipile documentation baseline

Reviewed against the official v2 reference (OpenAPI **2.65.1**); see
[the API audit](docs/API-AUDIT.md) and dated source manifest in `docs/upstream/manifest.json`.

Category search now uses `cursor` from `next_cursor`. **Breaking change:** omit
`limit` for people/companies, and replace category `offset` with `cursor`.
Posts accept `limit` 1–49 (provider default 3). URL search retains `offset` and
`limit` up to 100 and also accepts `cursor`; never combine cursor and offset.
Search-parameter lookup still uses offsets. Unsupported pagination inputs fail locally.
Profile sections now include the documented `_preview` variants, which request fewer entries.

Validation is offline. Live account access is not needed for build/unit tests; integration
tests require a separate Unipile mock-provider app, never a production LinkedIn account.
