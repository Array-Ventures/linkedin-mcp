---
updatedAt: 2026-11-04T09:32:47.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Authentication & Accounts

This migration guide will help you migrate from v1 accounts to v2 accounts regarding authentication flows and connection managment.

# Overall Changes

Custom Authentication has been completely revamped to simplify checkpoint handling and provide a more consistent experience across all providers. You can now handle the full authentication flow using only two endpoints:

* **Start Auth Intent**
* **Solve a Checkpoint**

The recommended way to migrate is to follow our complete guide: [Authenticate with Custom Auth](https://developer.unipile.com/v2.0/docs/authenticate-with-custom-auth).

<br />

Hosted Authentication is now more customizable and offers the same level of configuration flexibility as Custom Authentication. Because of this, the request body structure for creating links has changed.

Additionally, the **success screen** at the end of the flow should now be handled by your own application after the redirection.

The recommended way to migrate is to follow our complete guide: [Authenticate with Hosted Auth](https://developer.unipile.com/v2.0/docs/authenticate-with-hosted-auth).

<br />

***

# Methods changes

<br />

#### List all accounts (`GET /v1/accounts`)

* Query param `cursor` is removed
  * Use `offset` and `limit` for pagination

<br />

#### Connect an account (native authentication) (`POST /v1/accounts`)

* Route changed
  * Use `POST /v2/auth/intent` <Anchor label="Start Auth Intent" target="_blank" href="ref:startauthintent">Start Auth Intent</Anchor>
* Authentication flow has probably changed based on the provider, read the <Anchor label="Authentication with Custom Authentication guide" target="_blank" href="https://developer.unipile.com/v2.0/docs/authenticate-with-custom-auth#/">Authentication with Custom Authentication guide</Anchor>.

<br />

#### Connect an account (hosted authentication) (`POST /v1/hosted/accounts/link`)

* Use `POST /v2/auth/link` [Create Auth Link](https://developer.unipile.com/v2.0/reference/createauthlink)
* Body is different on those routes, refer to the <Anchor label="Authentication with Hosted Auth guide" target="_blank" href="https://developer.unipile.com/v2.0/docs/authenticate-with-hosted-auth#/">Authentication with Hosted Auth guide</Anchor>.

<br />

#### Reconnect an account (`POST /v1/accounts/:account_id`)

* Route is removed
  * Use `POST /v2/auth/intent` <Anchor label="Start Auth Intent" target="_blank" href="ref:startauthintent">Start Auth Intent</Anchor> and provide the `account_id` in the body
* Authentication flow has probably changed based on the provider, read the <Anchor label="Authentication with Custom Authentication guide" target="_blank" href="https://developer.unipile.com/v2.0/docs/authenticate-with-custom-auth#/">Authentication with Custom Authentication guide</Anchor>.

<br />

#### Solve a code checkpoint (`POST /v1/accounts/checkpoint`)

* Route changed
  * Use `POST /v2/auth/checkpoint` <Anchor label="Solve a Checkpoint" target="_blank" href="ref:solvecheckpoint">Solve a Checkpoint</Anchor>
* Body param `account_id` is removed
  * Use the `intent_id` given by the Start Auth Intent route.
* Body param `provider` is removed

<br />

#### Resend checkpoint notification (`POST /v1/accounts/checkpoint/resend`)

* Route is removed
  * Use `POST /v2/auth/checkpoint` <Anchor label="Solve a Checkpoint" target="_blank" href="ref:solvecheckpoint">Solve a Checkpoint</Anchor>
* Authentication flow has probably changed based on the provider, read the <Anchor label="Authentication with Custom Authentication guide" target="_blank" href="https://developer.unipile.com/v2.0/docs/authenticate-with-custom-auth#/">Authentication with Custom Authentication guide</Anchor>.

<br />

#### Restart an account (`POST /v1/accounts/:account_id/restart`)

* Route is removed
  * Accounts restart automatically now

<br />

#### Resynchronize account messaging data (`GET /v1/accounts/:account_id/sync`)

* Route is removed
  * Accounts stay in sync now

<br />

<br />

#### Update account proxy (`POST /v1/accounts/:account_id`)

* Use `PATCH /v2/accounts/:account_id` [Update an Account](https://developer.unipile.com/v2.0/reference/updateaccount)
* The behavior might have change, please refer to the [Proxies](https://developer.unipile.com/v2.0/docs/proxies) guide.

<br />

***

# Account object changes

| v1 field              | v2 change                                                                     |
| --------------------- | ----------------------------------------------------------------------------- |
| `type`                | Renamed to `provider`                                                         |
| `connection_params`   | Removed, they are now encoded in field that is not public                     |
| `source`              | Removed, irrelevant in v2                                                     |
| `current_signature`   | Removed, irrelevant in v2                                                     |
| `signatures`          | Removed, irrelevant in v2                                                     |
| `groups`              | Removed, irrelevant in v2                                                     |
| `full_fetch`          | Removed, irrelevant in v2. Read more about [Initial Sync](https://developer.unipile.com/v2.0/docs/initial-sync).  |
| `fetch_progress`      | Removed, irrelevant in v2. Read more about [Initial Sync](https://developer.unipile.com/v2.0/docs/initial-sync) . |
| `folder_fetch_status` | Removed, irrelevant in v2. Read more about [Initial Sync](https://developer.unipile.com/v2.0/docs/initial-sync) . |
| `last_fetched_at`     | Removed, irrelevant in v2                                                     |