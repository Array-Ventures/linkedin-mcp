# linkedin-mcp — working notes for Claude

An MCP server (41 tools) + `linkedin` CLI + agent skill over the **Unipile v2** API, driving a real
LinkedIn account. TypeScript, Node ≥20, ESM (relative imports end in `.js`).

## Safety contract — read before running anything

The connected account is a **real person's LinkedIn**. LinkedIn's ToS prohibits automation and
accounts do get restricted, so these rules are not ceremony:

1. **Never call the production API for testing, inspection, or curiosity — not even read-only.**
   Scripted sequences of calls are exactly what gets accounts flagged. Verify against the schemas
   (see "Checking the API" below), the mock test environment, or a single call the user explicitly
   asks for, one at a time.
2. **Unit tests are offline by construction.** `tests/setup.deny-network.ts` replaces global
   `fetch` with a thrower; HTTP only happens through an injected `fetchImpl`. Never weaken this.
3. **Integration tests run only against a Unipile mock-provider account** in a *separate* Unipile
   app, launched by `bash scripts/run-integration.sh` (scrubbed `env -i`, only `*_TEST` vars).
   `tests/helpers/op-fuse.ts` blocks every mutating op until the target's provider is verified
   `"mock"`. Test code must never read `.env.local` or a production variable.
4. **`.env.local` is parsed only in the two bin entrypoints** (`src/mcp/index.ts`, `src/cli/index.ts`).
5. **Git hygiene: stage files by name.** `git add -A` once swept local agent state — including live
   API keys — into a commit here. `.gitignore` now covers `.claude/`, `.agents/`, `.agentworkforce/`,
   `.superpowers/`, `docs/superpowers/`, `.env*`, and `.mcp.json`, but stage explicitly anyway.

## Architecture

Every capability is one `OperationDef` (`src/core/operations/types.ts`); the MCP server and the CLI
are thin adapters over the same registry, so they cannot drift.

```
src/core/
  client.ts      UnipileClient — auth, query/body, timeouts, error mapping, rate-header capture.
                 Rejects absolute/protocol-relative paths and cross-origin hosts (API-key exfil guard).
  config.ts      env + .env.local parsing        accounts.ts  account auto-resolution + product map
  inboxes.ts     inbox discovery (cached)        rate.ts      "header brake" (see below)
  errors.ts      ConfigError / UsageError / UnipileApiError + errorToText (shared by both adapters)
  operations/    messaging, network, posts, engagement, content, search, account → index.ts registry
src/mcp/         server.ts (registerTool per op, structuredContent + isError results), index.ts (stdio)
src/cli/         build-program.ts (commander generated from the same defs), output.ts, raw.ts, index.ts
```

**Adding a tool:** write the `OperationDef` in the right `operations/*.ts` module, register it in
`operations/index.ts`, and update the exact-name list in `tests/unit/registry.test.ts`. Both adapters
pick it up automatically. `defineOperation` throws if `annotations` disagree with `mutates`.

**Conventions:** `linkedin_{verb}_{resource}` snake_case names; `READ_ANNOTATIONS` /
`WRITE_ANNOTATIONS` from `operations/shared.js`; `cursorPagination` + `toPage` for cursor lists,
cursor pagination for category search; `offsetPagination` + `withOffsets` for search parameters and offset-mode URL search; `encodeURIComponent` on **every** user-supplied path
segment; `UsageError` (not `Error`) for input conflicts so the CLI exits 2; unique `cli.group`/
`cli.command` pairs.

## Commands

```bash
npm test              # unit suite, offline
npm run typecheck     # tsc --noEmit
npm run build         # tsup → dist/mcp/index.js + dist/cli/index.js
bash scripts/run-integration.sh   # mock-provider account only; never production
UNIPILE_API_KEY=dummy node dist/cli/index.js --help
```

## Checking the API

The project's `unipile` MCP server serves Unipile's OpenAPI spec. Use `list-endpoints` /
`get-endpoint` / `search-endpoints` to read schemas — **never `execute-request`**, which would hit
the live account. Docs: `https://developer.unipile.com/v2.0/llms.txt`.

## LinkedIn reality the spec hides

Every one of these cost a real bug or a live-call surprise. The OpenAPI spec is necessary but not
sufficient; provider-specific behaviour hides in prose like *"if supported by the provider"*.

- **Chat listing must be inbox-scoped.** Generic `GET /chats` returns 501 for LinkedIn ("Use List
  inbox Chats"). Use `/inboxes/{inbox}/chats`; inbox ids are discovered at runtime, not hardcoded.
- **No server-side unread filter.** `is_unread` is accepted and silently ignored. Read each chat's
  `unread_count` (`0` read, `>0` unread, `-1` manually marked unread).
- **Messaging someone with a pending received invitation requires**
  `specifics.linkedin.classic.relation_request_id` on start-chat, or it fails.
- **Reaction value spaces differ**: posts/comments take the `linkedin_*` enum; **messages take a raw
  emoji string**. Never share one validator.
- **One path, three effects**: `POST /posts/{id}/comments/{comment_id}` *replies*, `PATCH` edits,
  `DELETE` removes.
- **`DELETE` carries a JSON body** for reaction removal.
- **Post editing is far narrower than creation** — only `text` and `can_comment`.
- **`updateUserProfile` returns no profile**, just `{object:"UserProfileUpdated"}`; structured
  sections need pre-resolved parameter IDs, so re-read to confirm what LinkedIn stored.
- **Ownership/shape failures are prose-only** (no typed errors): deleting others' content, marking
  your own message read, participant ops on 1-to-1 chats all just "fail".
- **`/v2/accounts/{id}` never touches LinkedIn**, so it carries no rate headers — `whoami` reports
  no `rate` field by design.
- Envelopes are inconsistent: `{data, next_cursor?}` for most lists, `{object:"Accounts", data,
  has_more}` for accounts (string `limit`/`offset`); mutations return bare `{object:"..."}`.

## Rate limits ("header brake")

Unipile enforces per-endpoint / per-sensitive-method / per-account windows server-side (configure
them to *Recommended* in the Unipile dashboard — that is the real hard cap; client-side counters
can't see other clients and reset on restart). `client.rateWindows` captures `x-ratelimit-*` off
every response, and `rateInfo()` reports the **tightest window by fraction remaining** with a
warning at ≤10%. Headers expose only one checked window per response; this is the tightest observed window, not all server windows. `reset_in_seconds` is a **duration, not a timestamp**. The window is a ceiling,
never a target: on 429, stop that action type, never auto-retry a write.

Known LinkedIn quotas: ~80–100 invitations/day (~200/week), 100–150 messages/day, 80–100 profile
views/day, ~1,000 search results/day. Space writes ~60s apart with randomized timing.

## Irreversible operations

`linkedin_remove_connection`, `linkedin_delete_post`, `linkedin_delete_comment`,
`linkedin_delete_message`. Confirm with the user before calling them.

## Out of scope (deliberate)

Sales Navigator, Recruiter, Jobs, company-page management, webhooks, non-LinkedIn Unipile providers
(email/calendar/contacts), `visit-profile` (would appear in "who viewed your profile"), skill
endorsements, and the raw `POST /linkedin/` passthrough via MCP (CLI `linkedin raw` only, so agents
can't bypass the guards).
