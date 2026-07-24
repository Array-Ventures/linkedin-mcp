# linkedin-mcp

An MCP (Model Context Protocol) server and CLI for operating LinkedIn at scale through the Unipile v2 API. Automate messaging, inbox triage, outreach, profiles, posts, search, and engagement on behalf of a connected LinkedIn account.

## What It Is

**linkedin-mcp** exposes:
- **MCP Server** (`dist/mcp/index.js`): 22-tool server for Claude Code and Claude Desktop to operate LinkedIn via Unipile.
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
| `UNIPILE_API_KEY` | Yes | — | Unipile API key for authentication. Get one at https://unipile.ai. |
| `UNIPILE_BASE_URL` | No | `https://api.unipile.ai` | Base URL for Unipile API (allows custom/test servers). |
| `UNIPILE_ACCOUNT_ID` | No | — | Explicit account ID override (auto-resolved from auth token if omitted). |
| `UNIPILE_ALLOW_CUSTOM_BASE` | No | `false` | Set to `true` to allow non-standard UNIPILE_BASE_URL (security check). |
| `UNIPILE_API_KEY_TEST` | No | — | Separate API key for integration test suite. |
| `UNIPILE_BASE_URL_TEST` | No | `https://api-test.unipile.ai` | Test server URL for integration tests. |
| `UNIPILE_ACCOUNT_ID_TEST` | No | — | Test account ID (if different from production). |
| `UNIPILE_TEST_LIVE` | No | `0` | Set to `1` to run integration tests against live test server (requires `UNIPILE_API_KEY_TEST`). |

### Example `.env.local`

```
UNIPILE_API_KEY=uapi_xxxxxxxxxxxxxxxxxxxxxxxx
UNIPILE_BASE_URL=https://api.unipile.ai
UNIPILE_ALLOW_CUSTOM_BASE=false
UNIPILE_API_KEY_TEST=uapi_test_xxxxxxxxxxxx
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

Restart Claude Desktop. The 22 tools will now be available to Claude for LinkedIn operations.

## CLI Quickstart

All commands output human-readable text on a TTY and JSON when piped or with `--json`. Errors go to stderr.

### 1. Check Setup

```bash
linkedin whoami show
```

Shows your connected account, profile, and InMail credits. If this fails, verify `UNIPILE_API_KEY` and check the Unipile dashboard.

### 2. List Unread Messages

```bash
linkedin chats list --unread --limit 10
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

By construction, unit tests do not make network calls. Run them with:

```bash
npm test
```

Tests live in `tests/` and validate parsing, validation, and formatting logic in isolation.

### Integration Tests (Mock Environment)

Integration tests use a mock Unipile server to validate request/response handling without touching production or the live test environment:

```bash
UNIPILE_TEST_LIVE=0 npm run test:integration
```

Or run the test script directly:

```bash
bash scripts/run-integration.sh
```

**Important**: Integration tests never touch the live LinkedIn API or the production Unipile account. They run against a local mock server or isolated test environment only.

### Integration Tests (Live Test Environment)

To run against the live test environment (requires `UNIPILE_API_KEY_TEST` and `UNIPILE_BASE_URL_TEST`):

```bash
UNIPILE_TEST_LIVE=1 npm run test:integration
```

This is intended for pre-deployment verification and must never run against production.

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
- `UNIPILE_ALLOW_CUSTOM_BASE=false` by default; set to `true` only when using a trusted custom server.
- Test credentials (`UNIPILE_API_KEY_TEST`) must be separate from production and used only in test environments.

## Troubleshooting

**"missing UNIPILE_API_KEY"**
- Set `UNIPILE_API_KEY` in your environment or `.env.local`.
- Verify the key is valid at https://unipile.ai/account.

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
