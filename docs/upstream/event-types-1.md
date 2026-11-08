---
updatedAt: 2026-10-02T16:18:46.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Event types

This is a list of all the types of events we currently send.

We may add more types at any time, so in developing and maintaining your code, you should not assume that only these types exist.

You’ll notice that these events follow a pattern: `resource.event`. Our goal is to design a consistent system that makes things easier to anticipate and code against.

<br />

***

# The event object

The body of each POST request to a webhook endpoint contains an Event Object with the following shape :

| Field                    | Description                                                                                                                                                                                |
| :----------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                     | Identifier of the event. (evt\_xxx)                                                                                                                                                        |
| `created_at`             | Date time that the event was created by Unipile. For events coming from providers, this date can be late by few milliseconds to few seconds compared to the actual date time of occurence. |
| `account_id`             | Identifier of the account for which the event occurs. (acc\_xxx)                                                                                                                           |
| `account_provider`       | The provider of the account for which the event occurs.                                                                                                                                    |
| `account_name`           | The name of the account for which the event occurs.                                                                                                                                        |
| `account_scope_id`       | Identifier of the parent scope of the account for which the event occurs. (scope\_xxx)                                                                                                     |
| `application_id`         | Identifier of the account's parent application. (app\_xxx)                                                                                                                                 |
| `application_production` | Is the account's parent application is a production or test environment.                                                                                                                   |
| `type`                   | Type of the event from the list below.                                                                                                                                                     |
| `payload`                | Event payload, where its shape is an object determined by the type, specified in the list below.                                                                                           |

<br />

***

# Account events

Product connections have only three statuses: `running`, `disconnected`, and `errored`. On multi-product accounts, the optional `product` field on these status events identifies the connection that changed.

`partial` and `degraded` exist only as aggregate account statuses; they are never product statuses. Their events indicate that the combination of product statuses changed the top-level account `status`. Inspect `metadata.products_connection_status` on the Account object to determine the status of every product. [Learn more about accounts and products.](https://developer.unipile.com/v2.0/docs/status-lifecycle)

<br />

## `account.status.disconnected`

Occurs when an account or one of its products requires authentication because its credentials or session are obsolete. [Learn more about account status.](https://developer.unipile.com/v2.0/docs/status-lifecycle)

| Field       | Description                                                        |
| :---------- | :----------------------------------------------------------------- |
| `timestamp` | Timestamp of when the account or product became disconnected       |
| `product?`  | For a multi-product provider, the product that became disconnected |

<br />

## `account.status.errored`

Occurs when an account or one of its products has a service interruption due to an issue or outage with Unipile, the provider, or a proxy service. [Learn more about account status.](https://developer.unipile.com/v2.0/docs/status-lifecycle)

| Field       | Description                                                                    |
| :---------- | :----------------------------------------------------------------------------- |
| `timestamp` | Timestamp of when the account or product became unavailable                    |
| `product?`  | For a multi-product provider, the product affected by the service interruption |
| `reason`    | Error reason. Can be `unipile`, `proxy`, or `provider`                         |

<br />

## `account.status.running`

Occurs when an existing account or one of its products returns to operational status. It is not emitted when a new account is added. [Learn more about account status.](https://developer.unipile.com/v2.0/docs/status-lifecycle)

| Field       | Description                                                       |
| :---------- | :---------------------------------------------------------------- |
| `timestamp` | Timestamp of when the account or product became operational       |
| `product?`  | For a multi-product provider, the product that became operational |

<br />

## `account.status.degraded`

Occurs when an account becomes `degraded`: at least one product is operational while another has a service interruption, and no product requires authentication. Inspect `metadata.products_connection_status` on the account for the complete state. [Learn more about account status.](https://developer.unipile.com/v2.0/docs/status-lifecycle)

| Field       | Description                                                                     |
| :---------- | :------------------------------------------------------------------------------ |
| `timestamp` | Timestamp of when the account became degraded                                   |
| `product?`  | Product whose transition caused the aggregate account status to become degraded |
| `reason?`   | Error reason. Can be `unipile`, `proxy`, or `provider`                          |

<br />

## `account.status.partial`

Occurs when an account becomes `partial`: at least one product is operational while another requires authentication. Inspect `metadata.products_connection_status` on the account for the complete state. [Learn more about account status.](https://developer.unipile.com/v2.0/docs/status-lifecycle)

| Field       | Description                                                                    |
| :---------- | :----------------------------------------------------------------------------- |
| `timestamp` | Timestamp of when the account became partially operational                     |
| `product?`  | Product whose transition caused the aggregate account status to become partial |

<br />

## `account.locked`

Occurs when API access to an account is locked. The account keeps its connection `status`, while `is_locked` becomes `true`. [Learn more about account status.](https://developer.unipile.com/v2.0/docs/status-lifecycle)

| Field       | Description                             |
| :---------- | :-------------------------------------- |
| `timestamp` | Timestamp of when API access was locked |

<br />

## `account.unlocked`

Occurs when API access to an account is restored and `is_locked` becomes `false`. [Learn more about account status.](https://developer.unipile.com/v2.0/docs/status-lifecycle)

| Field       | Description                               |
| :---------- | :---------------------------------------- |
| `timestamp` | Timestamp of when API access was restored |

<br />

## `account.add`

Occurs when a new account is connected. The account is immediately `running` and ready for API Method calls and realtime events. Use this event as the confirmation that the account is ready; do not wait for `account.status.running`.

| Field     | Description                                                                                |
| :-------- | :----------------------------------------------------------------------------------------- |
| `account` | The linked account. See response of [Get an Account](https://developer.unipile.com/v2.0/reference/getaccount) for the object shape. |
| `state?`  | State passed to the authentication process                                                 |

<br />

## `account.reconnect`

Occurs when an account is re-authenticated or reconfigured. Reconnecting refreshes the entire account and restarts all configured products.

| Field     | Description                                                                                              |
| :-------- | :------------------------------------------------------------------------------------------------------- |
| `account` | The re-authenticated or reconfigured account. See [Get an Account](https://developer.unipile.com/v2.0/reference/getaccount) for the object shape. |
| `state?`  | State passed to the authentication process                                                               |

<br />

## `account.remove`

Occurs when an account is removed.

| Field        | Description                                |
| :----------- | :----------------------------------------- |
| `account.id` | Account identifier of the removed account. |

<br />

## `account.initial_sync.running`

Occurs when the initial sync of an account is started. [Learn more about Initial Sync](https://developer.unipile.com/v2.0/docs/initial-sync)

| Field       | Description                             |
| :---------- | :-------------------------------------- |
| `timestamp` | Timestamp of when the sync was started. |

<br />

## `account.initial_sync.completed`

Occurs when the initial sync of an account is finished and all historical data is available. [Learn more about Initial Sync](https://developer.unipile.com/v2.0/docs/initial-sync)

| Field       | Description                               |
| :---------- | :---------------------------------------- |
| `timestamp` | Timestamp of when the sync was completed. |

<br />

## `account.initial_sync.failed`

Occurs when the initial sync of an account is stopped due to an error. [Learn more about Initial Sync](https://developer.unipile.com/v2.0/docs/initial-sync)

| Field       | Description                            |
| :---------- | :------------------------------------- |
| `timestamp` | Timestamp of when the sync was failed. |

<br />

<br />

***

# Email events

<Callout icon="❗️" theme="error">
  ### Note about delays

  For **Google, Outlook and IMAP&#x20;**&#x74;here may be delays of up to 10 seconds
</Callout>

<br />

## `email.new`

Occurs when an email is upserted in a folder:

* A received email is upserted in the Inbox folder
* A sent email is upserted in the Outbox (Sent items)
* An email moved from one folder to another is upserted in the new folder

| Field       | Description                                                                        |
| :---------- | :--------------------------------------------------------------------------------- |
| `folder_id` | ID of the Folder where the email is upserted.                                      |
| `email`     | Upserted email. See response of [Get an Email](https://developer.unipile.com/v2.0/reference/getemail) for the object shape. |

<br />

## `email.new.bounce`

Occurs when a received Bounced email is upserted in the Inbox folder. This event is emitted instead of `email.new` and not in addition to.

| Field       | Description                                                                        |
| :---------- | :--------------------------------------------------------------------------------- |
| `reason`    | Reason message                                                                     |
| `date`      | Date of the bounce email                                                           |
| `addresses` | Comma separated addresses of recipients                                            |
| `type`      | Error type (See [Bounce detection](https://developer.unipile.com/v2.0/docs/bounce-detection) guide)                    |
| `code`      | Error code                                                                         |
| `email`     | Original email. See response of [Get an Email](https://developer.unipile.com/v2.0/reference/getemail) for the object shape. |

<br />

## `email.delete`

Occurs when an email is deleted from a folder. Note that this event is also triggered when an email is moved from one folder to another as it's deleted from its original folder.

> Note that emails client often use the word "delete" to move an email to trash. In this case, `email.delete` is sent because it's deleted from it's original folder then `email.new` is sent because it's upserted in the trash folder.

| Field       | Description                              |
| :---------- | :--------------------------------------- |
| `folder_id` | ID of Folder where the email is deleted. |
| `email.id`  | ID of the deleted email.                 |

<br />

## `email.draft.new`

Occurs when a new email draft is created.

*Payload is an EmailDraft object. See response of[Get a Draft](https://developer.unipile.com/v2.0/reference/getdraft)  for the object shape.*

<br />

## `email.draft.delete`

Occurs when an email draft is deleted (not trashed).

| Field | Description                   |
| :---- | :---------------------------- |
| `id`  | Id of the deleted email draft |

<br />

## `email.folder.create`

Occurs when a new email folder is created.

*Payload is a Folder object. See response of[Get a Folder](https://developer.unipile.com/v2.0/reference/getfolder) for the object shape.*

<br />

## `email.folder.update`

Occurs when an existing email folder is updated.

*Payload is the updated Folder object. See response of[Get a Folder](https://developer.unipile.com/v2.0/reference/getfolder) for the object shape.*

<br />

## `email.folder.delete`

Occurs when an existing email folder is deleted.

| Field | Description                    |
| :---- | :----------------------------- |
| `id`  | Id of the deleted email folder |

<br />

***

# Messaging events

<br />

## `message.new`

Occurs when a new message is upserted (received or sent) in a chat.

> **Why would I need to receive my sent messages ?**
>
> If the message is sent from another device (and not from Unipile), your application might want to be aware of it to stay in sync.

*Payload is a Message object. See response of[Get a Message](https://developer.unipile.com/v2.0/reference/getmessage) for the object shape.*

<br />

## `message.update`

Occurs when the content of a message is updated.

*Payload is a Message object. See response of[Get a Message](https://developer.unipile.com/v2.0/reference/getmessage) for the object shape.*

<br />

## `message.delete`

Occurs when a message is deleted in a chat.

| Field     | Description                |
| :-------- | :------------------------- |
| `chat_id` | Id of the parent chat.     |
| `id`      | Id of the deleted message. |

<br />

## `chat.update`

Occurs when a chat is updated, for example when its folders, unread count, archive state, participants, name, or other
provider-supported properties change.

*Payload is the updated Chat object. See the response of [Get a Chat](https://developer.unipile.com/v2.0/reference/getchat) for the object shape.*

Provider and product support varies. See [Features Availability](https://developer.unipile.com/v2.0/docs/list-provider-features) for details.

<br />

## `chat.delete`

Occurs when a chat is deleted.

| Field | Description            |
| :---- | :--------------------- |
| `id`  | Id of the deleted chat |

Provider and product support varies. See [Features Availability](https://developer.unipile.com/v2.0/docs/list-provider-features) for details.

<br />

## `message.receipt.read`

Occurs when a sent message has been read by a user.

| Field        | Description                             |
| :----------- | :-------------------------------------- |
| `chat_id`    | Id of the parent chat.                  |
| `message_id` | Id of the read message.                 |
| `user_id`    | Id of the user who read the message.    |
| `timestamp`  | Timestamp of when the message was read. |

<br />

## `message.receipt.delivery`

Occurs when a sent message has been delivered to a user. If supported by the provider, this event can occurs multiple times for the same message in group chats.

| Field        | Description                                  |
| :----------- | :------------------------------------------- |
| `chat_id`    | Id of the parent chat.                       |
| `message_id` | Id of the delivered message.                 |
| `user_id`    | Id of the user who received the message.     |
| `timestamp`  | Timestamp of when the message was delivered. |

<br />

## `message.reaction.new`

Occurs when a new reaction is added to a message.

| Field        | Description                                                                                                           |
| :----------- | :-------------------------------------------------------------------------------------------------------------------- |
| `chat_id`    | Id of the parent chat.                                                                                                |
| `message_id` | Id of the parent message.                                                                                             |
| `reaction`   | The added reaction. See response of [List all Message's Reactions](https://developer.unipile.com/v2.0/reference/getmessagereactionslist) for the object shape. |

<br />

<br />

***

# Calendar events

<Callout icon="❗️" theme="error">
  ### Note about delays

  For **Google and Outlook&#x20;**&#x74;here may be delays of up to 60 seconds
</Callout>

<br />

## `calendar.create`

Occurs when a new calendar is created.

*Payload is a Calendar object. See response of[Get a Calendar](https://developer.unipile.com/v2.0/reference/getcalendar) for the object shape.*

<br />

## `calendar.update`

Occurs when an existing calendar is updated.

*Payload is the updated Calendar object. See response of[Get a Calendar](https://developer.unipile.com/v2.0/reference/getcalendar) for the object shape.*

<br />

## `calendar.delete`

Occurs when an existing calendar is deleted.

| Field | Description                |
| :---- | :------------------------- |
| `id`  | Id of the deleted calendar |

<br />

## `calendar.event.new`

Occurs when a new calendar event is upserted in a Calendar (created or invited to).

*Payload is a Calendar Event object. See response of[Get a calendar event](https://developer.unipile.com/v2.0/reference/getcalendarevent) for the object shape.*

<br />

## `calendar.event.update`

Occurs when an existing calendar event is updated.

*Payload is the updated Calendar Event object. See response of[Get a calendar event](https://developer.unipile.com/v2.0/reference/getcalendarevent) for the object shape.*

<br />

## `calendar.event.delete`

Occurs when an existing calendar event is deleted.

| Field         | Description               |
| :------------ | :------------------------ |
| `calendar_id` | Id of the parent calendar |
| `id`          | Id of the deleted event   |

<br />

***

# Tracking events

<br />

## `tracking.click`

Occurs when a link is clicked in an email.

| Field        | Description                                                                                                                |
| :----------- | :------------------------------------------------------------------------------------------------------------------------- |
| `url`        | URL of the clicked link                                                                                                    |
| `ip`         | IP Address of the user who clicked on the link                                                                             |
| `user_agent` | User agent of the browser used by the user to open the link                                                                |
| `date`       | ISO Datetime when the link was clicked                                                                                     |
| `label?`     | (Optional) Description label specified in `tracking_options` when the email was sent using [Send an Email](https://developer.unipile.com/v2.0/reference/sendemail). |

<br />

## `tracking.open`

Occurs when an email is opened by the recipient.

| Field        | Description                                                                                                                |
| :----------- | :------------------------------------------------------------------------------------------------------------------------- |
| `ip`         | IP Address of the user who opened the mail                                                                                 |
| `user_agent` | User agent of the software used by the user to open the email                                                              |
| `date`       | ISO Datetime when the email was opened                                                                                     |
| `label?`     | (Optional) Description label specified in `tracking_options` when the email was sent using [Send an Email](https://developer.unipile.com/v2.0/reference/sendemail). |

<br />

***

# User events

<br />

## `relation.new`

Occurs when a new bi-directional relation has been established between the owner of the account and an other user.

*Payload is a User Relation object. See response of [List Relations of a User](https://developer.unipile.com/v2.0/reference/getuserrelations) for the object shape.*

<Callout icon="❗️" theme="error">
  ### Note about delays

  For **LinkedIn,&#x20;**&#x74;here may be delays of up to 6 hours
</Callout>

<br />

## `follower.new`

Occurs when a user follows the owner of the account.

*Payload is a User object. See response of [List Followers of a User](https://developer.unipile.com/v2.0/reference/listuserfollowers) for the object shape.*

<Callout icon="❗️" theme="error">
  ### Note about delays

  For **LinkedIn,&#x20;**&#x74;here may be delays of up to 6 hours
</Callout>