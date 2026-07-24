---
name: linkedin
description: Operate LinkedIn (messages, InMail, invitations, profiles, posts, search) through the `linkedin` CLI backed by Unipile. Use for LinkedIn outreach, inbox triage, sourcing/searching people or companies, posting, and engagement. Requires UNIPILE_API_KEY.
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
    linkedin messages send --chat-id <id> --text "..."     # existing conversation
    linkedin chats start --user-id <id> --text "..."       # NEW conversation (outreach!)
    linkedin chats start --user-id <id> --text "..." --inmail   # InMail (needs credits)
    linkedin chats read --chat-id <id>

## People & network

    linkedin profile get me
    linkedin profile get <user-id-or-public-identifier> --sections linkedin_experience
    linkedin company get <company-id>
    linkedin connections list --search "jane"
    linkedin invitations list --direction received
    linkedin invitations send --user-id <id> --message "..."
    linkedin invitations respond --request-id <id> --action accept|decline|withdraw
    linkedin follow set --user-id <id> --action follow|unfollow

## Posts

    linkedin posts list                       # your posts
    linkedin posts get <post-id>
    linkedin posts create --text "..."        # PUBLIC content — confirm wording first
    linkedin comments list --post-id <id>
    linkedin comments add --post-id <id> --text "..." [--reply-to <comment-id>]
    linkedin react set --post-id <id> --reaction linkedin_like --action add

## Search (classic)

Filters take parameter IDS — resolve names first:

    linkedin search params --type LOCATION --keywords "san francisco"
    linkedin search run people --keywords "fintech founder" --location <loc-id> --limit 10
    linkedin search run companies --keywords "devtools"
    linkedin search run posts --keywords "agents" --posted-within PAST_WEEK

Search paginates by --offset (max 50/page). Sales Navigator search is not wrapped; use `linkedin raw` if you must.

## Escape hatch

    linkedin raw GET "/v2/{account_id}/linkedin/inmail-credits"

`{account_id}` is auto-substituted. Anything the wrapped commands don't cover.

## Behavioral rules (IMPORTANT — protects the account)

- Every send/invite/post/comment/react acts AS THE ACCOUNT OWNER on the real LinkedIn. Treat wording as final copy.
- Unipile enforces LinkedIn's limits server-side (≈80-100 invitations/day, ≈100-150 messages/day, ≈1000 search profiles/day). On 429 errors: STOP that action type — the error says whether it's a Unipile limit or a LinkedIn quota and when to retry. Never retry a failed write automatically.
- Space consecutive write actions by at least ~60 seconds and randomize timing; burst-writing looks like automation and risks account restriction.
- Bulk outreach: draft first, get human sign-off, then send slowly.
