# Unipile v2 API audit

Baseline: official v2 documentation fetched for this review, OpenAPI version **2.65.1**.
Exact retrieval time, source URLs and SHA-256 hashes: [source manifest](upstream/manifest.json).
The [upstream index](upstream/llms.txt) is retained with 215 reference/migration/provider pages.

## Changes incorporated

| Area | Current reference | Local change |
| --- | --- | --- |
| People/company search | Only cursor is documented as a query parameter | Forward cursor, reject offset and limit locally; return next_cursor without invented next_offset |
| Posts search | Cursor; limit 1–49, default 3 | Forward cursor, reject offset and limit above 49; preserve provider default |
| URL search | Offset, limit and cursor are available | Add cursor; reject cursor+offset; preserve existing offset behavior |
| Profile sections | Includes recruiting activity and all preview suffixes | Accept documented section enums; preview requests can reduce section detail |
| Rate limits | One checked window per response, no rule identifier | Clarify that the reported minimum is only the tightest observed window |

These pagination changes deliberately fail old unsupported category inputs with actionable errors.
Search parameter lookup still documents offset/limit and retains that interface.

## Scope and review limits

Reviewed the existing Classic LinkedIn wrappers against downloaded endpoint paths, methods,
request fields, response envelopes and relevant provider/migration guidance. Existing messaging,
relations, posts, reactions, profile updates and account operations already use v2 paths.
The existing tool count remains 41. This is a compatibility update, not implementation of every
optional API feature. Additional search filters, media uploads, message forwarding/pinning,
company administration, Jobs, Sales Navigator/Recruiter search, webhooks and non-LinkedIn
providers remain outside this change. Existing generic response records preserve new response
fields without requiring schema changes.

The reference takes precedence over older migration prose where pagination descriptions differ.
People/company page-size omission is based on their current endpoint schemas; no live account
probe was used to infer undocumented compatibility. Provider behavior remains unverified live.

## Validation

- 145 offline unit tests passed, including cursor forwarding, terminal pagination, unsupported
  pagination rejected before network calls, and preview-section schema/serialization coverage.
- TypeScript typecheck passed.
- CLI and MCP production builds passed.
- git diff --check passed.
- No production requests, integration tests, secrets or deployments.
- Offline tests, typecheck, build and authored-file whitespace checks rerun successfully before the GitHub push on November 8, 2026. The byte-preserved upstream snapshot contains original trailing whitespace and is excluded from authored-file whitespace checks. The reference snapshot remains dated November 5; no newer API baseline is claimed.

Live verification, if needed later, requires the separate mock-provider application described in
CLAUDE.md. Production account credentials must not be used for automated validation.

## Primary sources

- [People search](https://developer.unipile.com/v2.0/reference/performclassicpeoplesearch)
- [Company search](https://developer.unipile.com/v2.0/reference/performclassiccompaniessearch)
- [Post search](https://developer.unipile.com/v2.0/reference/performclassicpostssearch)
- [URL search](https://developer.unipile.com/v2.0/reference/performclassicsearchfromurl)
- [Profile sections](https://developer.unipile.com/v2.0/reference/getuserprofile)
- [Rate-limit headers](https://developer.unipile.com/v2.0/reference/rate-limit)
