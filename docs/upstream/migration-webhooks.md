---
updatedAt: 2026-11-04T09:32:47.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Webhooks

# Overall Changes

* **Event Types**: In v2, there are no longer distinct “webhook types”. Instead, there are **event types** that trigger webhook deliveries. Each webhook request contains the event itself as the body, following a [core event shape](https://developer.unipile.com/v2.0/reference/event-types-1#/the-event-object) — including the event type, creation date, and the account identifier — plus a **specific payload** depending on the event type. For example, a new message event includes the message object as its payload, while an updated calendar event includes the calendar event object.

* **Webhook Endpoints**: In the Dashboard, you no longer create individual webhooks. Instead, you define **Webhook Endpoints**, which can receive **all event types** rather than being limited to a single event family.

* **Reduced Event Payload**: Event payloads are now lighter. For instance, in v1, a `message_read` event included the full message and parent chat objects. In v2, only their IDs are included. To fetch full details, you can call the relevant API methods — efficiently supported by v2’s built-in caching and rate limiting system.

<br />

# Endpoints changes

<br />

## List all webhooks

`GET /v1/webhooks`

* Use `GET /v2/webhooks/endpoints` [List all Webhook Endpoints](https://developer.unipile.com/v2.0/reference/listwebhookendpoints)

<br />

## Create a webhook

`POST /v1/webhooks`

* Use `POST /v2/webhooks/endpoints` [Create a Webhook Endpoint](https://developer.unipile.com/v2.0/reference/createwebhookendpoint)

<br />

## Delete a webhook

`DELETE /webhooks/:id`

* Use `DELETE /v2/webhooks/endpoints/:id` [Delete a Webhook Endpoint](https://developer.unipile.com/v2.0/reference/deletewebhookendpoint)

<br />

# Account status updates

First, make sure to read [Status & Lifecycle guide](https://developer.unipile.com/v2.0/docs/status-lifecycle) to understand changes on account status.

Instead of the `ACCOUNT_STATUS` webhook type, your webhook endpoint should listen for the following event types (based on the `account_status.message`)

| v1 `ACCOUNT_STATUS` webhook message | v2 event type                                                                                                                          |
| :---------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| `CREDENTIALS`                       | `account.status.disconnected`                                                                                                          |
| `ERROR`                             | `account.status.errored`. Note that this event type payload contains a `reason` field to help you identify why the account is errored. |
| `STOPPED`                           | `account.status.errored`                                                                                                               |
| `OK`                                | `account.status.running` when an existing account returns to operational status                                                        |
| `CREATION_SUCCESS`                  | `account.add`                                                                                                                          |
| `RECONNECTED`                       | `account.reconnect`                                                                                                                    |
| `DELETED`                           | `account.remove`                                                                                                                       |
| `CONNECTING`                        | Removed. New accounts are already operational when `account.add` is received; do not wait for `account.status.running`.                |
| `SYNC_SUCCESS`                      | Removed as sync does not exists in v2                                                                                                  |

<br />

# Messaging webhooks

Instead of the `MESSAGING` webhook type, your webhook endpoint should listen for the following event types based on the `event` field used in v1.

| v1 event            | v2 event type          |
| :------------------ | :--------------------- |
| `message_reaction`  | `message.reaction.new` |
| `message_read`      | `message.receipt.read` |
| `message_received`  | `message.new`          |
| `message_edited`    | `message.update`       |
| `message_deleted`   | `message.delete`       |
| `message_delivered` | `message.delivery`     |

<br />

# Mail webhooks

Instead of the `MAIL` webhook type, your webhook endpoint should listen for the following event types based on the `event` field used in v1.

| v1 event        | v2 event type                                                                                                                                                                                                                                                                                                                                                                               |
| :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `mail_sent`     | Removed. Use `email.new` and check the role of the folder to be equal to `SENT`                                                                                                                                                                                                                                                                                                             |
| `mail_received` | Removed. Use `email.new` and check the role of the folder to be equal to `INBOX`                                                                                                                                                                                                                                                                                                            |
| `mail_moved`    | Removed. In v2, we notify when an email is upserted in a folder (or a label is added), and when an email is removed from a folder (or a label is removed).<br />To replicate what could be "moved", listen for `email.new` when an event of type `email.delete` was received shortly before for the same email (do not compare on ids as they can change between folders in IMAP accounts). |
| `mail_opened`   | `tracking.open`                                                                                                                                                                                                                                                                                                                                                                             |
| `mail_clicked`  | `tracking.click`                                                                                                                                                                                                                                                                                                                                                                            |

<br />

# User webhooks

Instead of the `USERS` webhook type, your webhook endpoint should listen for the following event types based on the `event` field used in v1.

| v1 event       | v2 event type  |
| :------------- | :------------- |
| `new_relation` | `relation.new` |