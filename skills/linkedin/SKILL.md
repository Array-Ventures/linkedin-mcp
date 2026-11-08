---
name: linkedin
description: Operate LinkedIn (messages, InMail, invitations, profiles, posts, comments, reactions, search) through the `linkedin` CLI backed by Unipile. Use for LinkedIn outreach, inbox triage, sourcing/searching people or companies, posting, engagement analysis, and managing your own content and connections. Requires UNIPILE_API_KEY.
---

# LinkedIn CLI

All commands print human-readable output on a TTY and JSON when piped (or with `--json`). Errors go to stderr; exit 1 = API error, exit 2 = bad input. IDs returned by one command feed the next.

## Setup check

    linkedin whoami show                                      # 1 request: account + connected products
    linkedin whoami show --include inboxes --include profile  # extras cost 1 request each

Shows the connected account, which LinkedIn products it has (`products`: classic / sales_navigator / recruiter with connection state), your profile, and InMail credits. Check `products` before using Sales Navigator/Recruiter-specific features. If it errors: missing UNIPILE_API_KEY, or the account needs reconnecting in the Unipile dashboard.

## Inbox & messaging

    linkedin chats list --limit 10                   # CLASSIC_PRIMARY inbox by default (auto-discovered)
    linkedin chats list --inbox CLASSIC_ARCHIVED     # other inboxes: CLASSIC_SPAM, CLASSIC_JOBS, Sales Nav/Recruiter variants

LinkedIn cannot filter by unread server-side — check each chat's `unread_count` in the JSON (0 = read, >0 = unread, -1 = manually marked unread) and follow `next_cursor` if you need more.

    linkedin messages list --chat-id <id>
    linkedin messages get --chat-id <id> --message-id <id>
    linkedin messages send --chat-id <id> --text "..."     # existing conversation
    linkedin chats start --user-id <id> --text "..."       # NEW conversation (outreach!)
    linkedin chats start --user-id <id> --text "..." --inmail   # InMail (needs credits)
    linkedin chats read --chat-id <id>                     # marks the whole chat read

Inbox triage — archive, pin, mute, label (all reversible):

    linkedin chats update --chat-id <id> --archive         # --archive / --pin / --mute are booleans
    linkedin chats update --chat-id <id> --mute-until 2026-08-01T00:00:00.000Z
    linkedin chats update --chat-id <id> --label "leads" --name "Deal room"

LinkedIn silently ignores chat fields it doesn't implement — re-read with `linkedin chats get` to confirm what stuck.

Messaging someone who sent you a PENDING invitation needs the invitation id:

    linkedin chats start --user-id <id> --text "..." --relation-request-id <id>

Send from a specific inbox (e.g. a Sales Navigator mailbox) instead of the default route:

    linkedin chats start --user-id <id> --text "..." --inbox <inbox-id>

Managing sent messages (your own only) and threads:

    linkedin messages edit --chat-id <id> --message-id <id> --text "..."
    linkedin messages delete --chat-id <id> --message-id <id>
    linkedin messages forward --chat-id <id> --message-id <id> --destination-chat-id <id>
    linkedin messages read --chat-id <id> --message-id <id>   # one message, does NOT clear chat unread_count
    linkedin react message --chat-id <id> --message-id <id> --reaction "👍" --action add   # emoji, not the linkedin_* enum
    linkedin messages attachments --chat-id <id> --message-id <id>   # download LINKS, not bytes
    linkedin participants list --chat-id <id>                 # group chats only; fails on 1-to-1
    linkedin participants manage --chat-id <id> --user-id <id> --action add|remove

Attachments come back as pre-signed `url`s with an `url_expires_at` — fetch them yourself (`curl -o deck.pdf "<url>"`), no API key needed. Binary never flows through the tools.

## People & network

    linkedin profile get me
    linkedin profile get <user-id-or-public-identifier> --sections linkedin_experience
    linkedin company get <company-id>
    linkedin connections list --search "jane"
    linkedin invitations list --direction received
    linkedin invitations send --user-id <id> --message "..."
    linkedin invitations respond --request-id <id> --action accept|decline|withdraw
    linkedin follow set --user-id <id> --action follow|unfollow
    linkedin followers list --direction followers|following [--user <id>]
    linkedin connections remove <user-id>         # IRREVERSIBLE — removes a 1st-degree connection
    linkedin profile update --headline "..." --bio "..."   # name/headline/bio/location only; re-fetch to confirm

## Posts

    linkedin posts list                       # your posts
    linkedin posts get <post-id>
    linkedin posts create --text "..."        # PUBLIC content — confirm wording first
    linkedin comments list --post-id <id>
    linkedin comments add --post-id <id> --text "..." [--reply-to <comment-id>]
    linkedin react set --target post --post-id <id> --reaction linkedin_like --action add
    linkedin react set --target comment --post-id <id> --comment-id <id> --reaction linkedin_celebrate --action add
    linkedin react list --target post|comment|message ...   # WHO reacted

Editing/removing your own content (own posts and comments only):

    linkedin posts edit <post-id> --text "..."          # only text + --can-comment are editable
    linkedin posts delete <post-id>                     # IRREVERSIBLE
    linkedin comments edit --post-id <id> --comment-id <id> --text "..."
    linkedin comments delete --post-id <id> --comment-id <id>   # IRREVERSIBLE

Seeing what someone engages with (each item carries the `parent_post`):

    linkedin engagement comments --user <id>     # comments they've written
    linkedin engagement reactions --user <id>    # posts they've reacted to

## Search (classic)

Filters take parameter IDS — resolve names first:

    linkedin search params --type LOCATION --keywords "san francisco"
    linkedin search run people --keywords "fintech founder" --location <loc-id>
    linkedin search run companies --keywords "devtools"
    linkedin search run posts --keywords "agents" --posted-within PAST_WEEK

Or skip the filter-id dance entirely by pasting a LinkedIn search URL from the browser:

    linkedin search run --url "https://www.linkedin.com/search/results/people/?keywords=..."

URL mode takes no category or filters (they're encoded in the URL), allows --limit up to 100, and can return people, companies, jobs, or posts depending on the URL. Category mode paginates with --cursor from next_cursor. Omit --limit for people/companies; posts default to 3 and accept up to 49. URL mode accepts either --cursor or --offset, never both. Sales Navigator and Recruiter search are not wrapped; use `linkedin raw` if you must.

## Escape hatch

    linkedin raw GET "/v2/{account_id}/linkedin/inmail-credits"

`{account_id}` is auto-substituted. Anything the wrapped commands don't cover.

## Behavioral rules (IMPORTANT — protects the account)

- Every send/invite/post/comment/react acts AS THE ACCOUNT OWNER on the real LinkedIn. Treat wording as final copy.
- Unipile enforces LinkedIn's limits server-side (≈80-100 invitations/day, ≈100-150 messages/day, ≈1000 search profiles/day). On 429 errors: STOP that action type — the error says whether it's a Unipile limit or a LinkedIn quota and when to retry. Never retry a failed write automatically.
- Space consecutive write actions by at least ~60 seconds and randomize timing; burst-writing looks like automation and risks account restriction.
- Bulk outreach: draft first, get human sign-off, then send slowly.
- IRREVERSIBLE actions — `connections remove`, `posts delete`, `comments delete`, `messages delete`: confirm with the human before running. Removing a connection cannot be undone without a fresh invitation (which burns invite quota).
- `profile update` does not echo what LinkedIn stored — re-run `linkedin profile get me` afterwards to verify.
- Every result carries a `rate` field (live remaining budget from Unipile). It is a ceiling, never a target: if it warns, stop that action type until the window resets.
