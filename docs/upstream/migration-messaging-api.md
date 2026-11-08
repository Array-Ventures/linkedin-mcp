---
updatedAt: 2026-11-04T09:32:47.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Messaging API

This guide will help you migrate the Messaging features of your application to API v2.

<br />

# Overall changes

* `/messages/*` routes are now under `/chats/:chat_id/*` because some providers guarantee ID uniqueness only per chat and not globally.
* The concept of independent "attendees" is not present in v2. Refer to the provider's integration guide to know where to find User IDs if needed.

<br />

***

# Methods changes

For each endpoint in the v1 API, here are the corresponding endpoints in the v2 API, along with the necessary modifications to achieve the same results.

<Callout icon="❗️" theme="error">
  ### Specifying the target account

  The `account_id` param, previously available either in the query params or in the body, is removed from all methods. The `account_id` must now be consistently included in the path params.
</Callout>

<br />

## List all chats

`GET /v1/chats`

* Use `GET /v2/:account_id/chats` <Anchor target="_blank" href="ref:getchatslist">List all Chats</Anchor> or `GET /v2/:account_id/inboxes/:inbox_id/chats`  <Anchor target="_blank" href="ref:getinboxchatslist">List inbox Chats</Anchor> if the provider uses inboxes.
* Query param `account_type` is removed.
  * Do multiple calls to get chats of multiple accounts of the same type.
* Query param `unread` is renamed to `is_unread`.
* The response schema has changed (see Chat object changes).

<br />

## Start a new Chat

`POST /v1/chats`

* Use `POST /v2/:account_id/chats/send` <Anchor target="_blank" href="ref:startchat">Start a Chat</Anchor> or `POST /v2/:account_id/inboxes/:inbox_id/chat`  <Anchor target="_blank" href="ref:startchatfrominbox">Start a Chat from Inbox</Anchor> if the provider uses inboxes.
* Content-Type header now only accepts `application/json`.
* Body param `attendees_ids` is renamed to `users_ids` and its accepts a single user ID as well as an array of user IDs. Read our Integration guides to know how to find user IDs based on the provider.
* Body param `attachments` has changed.
  * Provide an array of objects with `filename`, `content_type` and `data` in base64 encoding.
* Body param `subject` is renamed to `name`.
* Body params `voice_message` and `video_message` are removed.
  * Pass the file in `attachments` and set `send_mode` to `native` so the file will be rendered as a voice or video message on the provider's application.

<Callout icon="📘" theme="info">
  ### Provider specifics

  * Provider options must now be set under `specifics`.
  * Body param `linkedin` is removed.
    * For LinkedIn Classic options, use `specifics.linkedin.classic`.
      * Param `topic` is now `company_topic`.
      * Param `applicant_id` is removed. Use params `id` and `messaging_token` in object `applicant`. Read our Integration guides to learn more ([Start a chat with an applicant](https://developer.unipile.com/v2.0/docs/linkedin-send-messages#start-a-chat-with-an-applicant)).
      * Param `invitation_id` is now `relation_request_id`.
    * For LinkedIn Recruiter options, use `specifics.linkedin.recruiter`.
      * Param `signature` is now required.
      * Param `hiring_project_id` is renamed to `project_id`.
      * Param `email_address` is removed. Use param `send_as` with the value `EMAIL`, and the message will be sent as email as long as the recipient is willing to share his/her address.
      * Param `job_posting_id` is removed. Instead, just set the new param `channel_type` to `JOB_POSTING`.
      * Param `scheduled_time` in `follow_up` is renamed to `scheduled_for`.
    * For LinkedIn Sales Navigator options, use `specifics.linkedin.sales_navigator`.
</Callout>

<br />

## Get Chat

`GET /v1/chats/:chat_id`

* Use `GET /v2/:account_id/chats/:chat_id` <Anchor target="_blank" href="ref:getchat">Get a Chat</Anchor>.
* The response schema has changed (see Chat object changes).

<br />

## List all messages from a chat

`GET /v1/chats/:chat_id/messages`

* Use `GET /v2/:account_id/chats/:chat_id/messages` <Anchor target="_blank" href="ref:getmessageslist">List all Chat Messages</Anchor>
* Query param `sender_id` is renamed to `user_id`. Read our Integration guides to know how to find user IDs based on the provider.
* The response schema has changed (see Message object changes).

<br />

## Send a message in a chat

`POST /v1/chats/:chat_id/messages`

* Use `POST /v2/:account_id/chats/:chat_id/messages/send` <Anchor target="_blank" href="ref:sendmessage">Send a Message</Anchor>.
* Content-Type header now only accepts `application/json`.
* Body param `thread_id` is removed as no supported provider use threads at the moment.
* Body param `attachments` has changed.
  * Provide an array of objects with `filename`, `content_type` and `data` in base64 encoding.
* Body params `voice_message` / `video_message` are removed.
  * Pass the file in `attachments` and set `send_mode` to `native` so the file will be rendered as a voice or video message on the provider's application.
* Body param `typing_duration` is removed.

<br />

## Perform an action on a given chat

`PATCH /v1/chats/:chat_id`

* Use `PATCH /v2/:account_id/chats/:chat_id` <Anchor target="_blank" href="ref:updatechat">Update a Chat</Anchor>
* Body param `action` is removed.
  * Instead of `setReadStatus` action, use `read_status` body param to mark the chat as read or unread.
  * Instead of `setMuteStatus` action, use `muted_until` body param to mark the chat as muted or unmuted.
  * Instead of `addParticipant` action, use `POST /v2/:account_id/chats/:chat_id/participants` [Add a Chat Participant](https://developer.unipile.com/v2.0/reference/addparticipant).
  * The remaining actions have not been reimplemented.

<br />

## List all attendees from a chat

`GET /v1/chats/:chat_id/attendees`

This endpoint is removed.

<Callout icon="👍" theme="okay">
  ### Recommendation

  Here's how to retrieve participants based on the conversation type :

  * **Group chat** : Use `GET /v2/:account_id/chats/:chat_id/participants` <Anchor target="_blank" href="ref:getparticipantslist">List all Chat Participants</Anchor>.
  * **1to1 chats** : participants are provided within the Chat object.
</Callout>

<br />

## Synchronize a conversation from its beginning

`GET /v1/chats/:chat_id/sync`

This endpoint is removed as there is no need for synchronization on individual chats in v2. Read [Initial Sync](https://developer.unipile.com/v2.0/docs/initial-sync) for more informations.

<br />

## Retrieve a message

`GET /v1/messages/:message_id`

* Use `GET /v2/:account_id/chats/:chat_id/messages/:message_id` <Anchor target="_blank" href="ref:getmessage">Get a Message</Anchor>.
* In addition to `message_id`, `chat_id` is now required in path params.
* The response schema has changed (see Message object changes).

<br />

## List all messages

`GET /v1/messages`

This endpoint is removed.

<Callout icon="👍" theme="okay">
  ### Recommendation

  Instead you can use `GET /v2/:account_id/chats/:chat_id/messages` [List all Chat Messages](https://developer.unipile.com/v2.0/reference/getmessageslist) to list messages by chat.
</Callout>

<br />

## Forward a message

`POST /v1/messages/:message_id/forward`

* Use `POST /v2/:account_id/chats/:chat_id/messages/:message_id/forward` [Forward a Message](https://developer.unipile.com/v2.0/reference/forwardmessage).
* In addition to `message_id`, `chat_id` is now required in path params.

<br />

## Retrieve an attachment from a message

`GET /v1/messages/:message_id/attachments/:attachment_id`

* Use `GET /v2/:account_id/chats/:chat_id/messages/:message_id/attachments/:attachment_id` <Anchor target="_blank" href="ref:getattachment">Get a Message Attachment</Anchor>.
* In addition to `attachment_id` and `message_id`, `chat_id` is now required in path params.

<br />

## List all attendees

`GET /v1/chat_attendees`

This endpoint is removed as the concept of independent "attendees" is not present in v2.

<Callout icon="👍" theme="okay">
  ### Recommendation

  Here's how to retrieve participants based on the conversation type :

  * **Group chat** : Use `GET /v2/:account_id/chats/:chat_id/participants` <Anchor target="_blank" href="ref:getparticipantslist">List all Chat Participants</Anchor>.
  * **1to1 chats** : participants are provided within the Chat object.
</Callout>

<br />

## Retrieve an attendee

`GET /v1/chat_attendees/:id`

This endpoint is removed as the concept of independent "attendees" is not present in v2.

<br />

## Download a chat attendee picture

`GET /v1/chat_attendees/:id/picture`

This endpoint is removed. Use the url given in `public_picture_url` or `private_picture_download_url` in User objects to retrieve the picture.

<br />

## List all 1to1 chats for a given attendee

`GET /v1/chat_attendees/:attendee_id/chats`

This endpoint is removed as the concept of independent "attendees" is not present in v2.

<Callout icon="👍" theme="okay">
  ### Recommendation

  Use `GET /v2/:account_id/users/:user_id/chat` [Get a User Chat](https://developer.unipile.com/v2.0/reference/getuserchat) instead. Path param is now a `user_id`. Read our Integration guides to know how to find user IDs based on the provider.

  The response is a ChatLookup object, which is just enough to know the ID of the chat and if there is an history of conversation with the user, but require an additional call to [Get a Chat](https://developer.unipile.com/v2.0/reference/getchat) to retrieve the full Chat object.
</Callout>

<br />

## List all messages for a given attendee

`GET /v1/chat_attendees/:sender_id/messages`

This endpoint is removed as the concept of independent "attendees" is not present in v2.

<Callout icon="👍" theme="okay">
  ### Recommendation

  You can list all messages from a given participant within a chat by using `GET /v2/:account_id/chats/:chat_id/messages`<Anchor target="_blank" href="ref:getmessageslist">List all Chat Messages</Anchor> and setting the `user_id` filter.
</Callout>

<br />

## Add a reaction to a message

`POST /v1/messages/:message_id/reaction`

* Use `POST /v2/:account_id/chats/:chat_id/messages/:message_id/reactions` [Add a Message Reaction](https://developer.unipile.com/v2.0/reference/addmessagereaction)
* In addition to `message_id`, `chat_id` is now required in path params.

<br />

***

# ChatAttendee object changes

The concept of independent "attendees" is not present in v2. Instead, `GroupParticipant` or `User` objects are provided within the chats and messages.

<br />

***

# Chat object changes

| v1 field               | v2 change                                                                              |
| ---------------------- | -------------------------------------------------------------------------------------- |
| `id`                   | This is now the provider ID.                                                           |
| `provider_id`          | Renamed to `id`.                                                                       |
| `account_type`         | Renamed to `provider`.                                                                 |
| `attendee_provider_id` | Renamed to `user_id`.                                                                  |
| `timestamp`            | Renamed to `last_message_timestamp`.                                                   |
| `archived`             | Renamed to `is_archived`.                                                              |
| `pinned`               | Renamed to `is_pinned`.                                                                |
| `read_only`            | Renamed to `is_readonly`.                                                              |
| `subject`              | Renamed to `description`.                                                              |
| `disabledFeatures`     | Removed, use `restrictions`.                                                           |
| `organization_id`      | Removed, check `user` for provider specific data.                                      |
| `mailbox_id`           | Removed, check `user` for provider specific data.                                      |
| `folder`               | Removed, now inferred from the inbox you list chats from if supported by the provider. |
| `lastMessage`          | Renamed to `last_message`.                                                             |

<br />

***

# Message object changes

| v1 field             | v2 change                                                                                                                                                                                             |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                 | This is now the `provider_id`.                                                                                                                                                                        |
| `provider_id`        | Renamed to `id`.                                                                                                                                                                                      |
| `text`               | This is now optional and undefined if the message only contains attachments.                                                                                                                          |
| `chat_id`            | This is now the `chat_provider_id`.                                                                                                                                                                   |
| `chat_provider_id`   | Renamed to `chat_id`.                                                                                                                                                                                 |
| `quoted.provider_id` | Renamed to `quoted.id`.                                                                                                                                                                               |
| `seen`               | Renamed to `is_seen`.                                                                                                                                                                                 |
| `hidden`             | Renamed to `is_hidden`.                                                                                                                                                                               |
| `deleted`            | Renamed to `is_deleted`.                                                                                                                                                                              |
| `edited`             | Renamed to `is_edited`.                                                                                                                                                                               |
| `delivered`          | Renamed to `is_delivered`.                                                                                                                                                                            |
| `behavior`           | Removed.                                                                                                                                                                                              |
| `original`           | Removed.                                                                                                                                                                                              |
| `sender_attendee_id` | Renamed to `sender_id`.                                                                                                                                                                               |
| `reactions`          | Removed, use `reactions_counter` for simple reactions informations. Use <Anchor target="_blank" href="ref:getmessagereactionslist">List all Message's Reactions</Anchor> for details about reactions. |
| `seen_by`            | Removed, unsupported for now.                                                                                                                                                                         |