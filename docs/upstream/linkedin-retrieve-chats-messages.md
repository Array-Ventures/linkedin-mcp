---
updatedAt: 2026-11-04T09:39:47.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# List chats & messages

Learn how to get chats, groups and messages on LinkedIn using Unipile API.

<br />

> 📘 Note about pagination
>
> Pagination method differs by product. **Classic and Sales navigator**  use `offset`, while **Recruiter** uses `cursor`.

<br />

# Get individual and group chats

Conversations are organized into Inboxes, each of which targeting a specific product (Classic, Recruiter, Sales Navigator, Company Pages) and optionnaly applying filters (archived, unread, pending, etc.). The [List all Inboxes](https://developer.unipile.com/v2.0/reference/getinboxeslist) endpoint provides a summary of all the available Inboxes for your account.

To start listing chats within a given inbox, use [List Chats by Inbox](https://developer.unipile.com/v2.0/reference/getinboxchatslist).

> ❗️ Provider limitations
>
> The options `type`, `is_archived` and `is_unread` are not available.

```node
const { data } = await messagingApi.getInboxChatsList({
  path: {
    account_id: "acc_123456789",
    inbox_id: "RECRUITER_UNREAD",
  },
  query: {
    limit: 20,
  },
});
```
```python
chats = messaging_api.get_inbox_chats_list(
    "RECRUITER_UNREAD",
    "acc_123456789",
    limit=20,
)
```

<br />

To get a single chat, use [Get a Chat](https://developer.unipile.com/v2.0/reference/getchat).

```node
const { data } = await messagingApi.getChat({
  path: {
    account_id: "acc_123456789",
    chat_id: "chat_id",
  },
});
```
```python
chat = messaging_api.get_chat("chat_id", "acc_123456789")
```

<br />

# Get messages

To retrieve the messages of a Chat, use the [List all Chat Messages](https://developer.unipile.com/v2.0/reference/getmessageslist) endpoint, providing the chat ID.

```node
const { data } = await messagingApi.getMessagesList({
  path: {
    account_id: "acc_123456789",
    chat_id: "chat_id",
  },
  query: {
    limit: 20,
  },
});
```
```python
messages = messaging_api.get_messages_list(
    "chat_id",
    "acc_123456789",
    limit=20,
)
```
```curl
curl --request GET \
     --url https://api.unipile.com/v2/account_id/chats/chat_id/messages \
     --header 'accept: application/json'
```

<br />

To get a single Message, use the [Get a Message](https://developer.unipile.com/v2.0/reference/getmessage) endpoint, providing the chat ID and the message ID.

> ❗️ Provider limitations
>
> This endpoint is not available on **Recruiter and Sales navigator**.

```node
const { data } = await messagingApi.getMessage({
  path: {
    account_id: "acc_123456789",
    chat_id: "chat_id",
    message_id: "message_id",
  },
});
```
```python
message = messaging_api.get_message(
    "chat_id",
    "message_id",
    "acc_123456789",
)
```
```curl
curl --request GET \
     --url https://api.unipile.com/v2/account_id/chats/chat_id/messages/message_id \
     --header 'accept: application/json'
```

<br />

# Be notified about new messages

To **receive new messages**, set up a Webhook to listen for `message.new` events.

You will receive notifications for both **received messages** and **sent messages.**. This can be useful for your application to be aware of messages sent by the account owner from other devices. To track only incoming messages, filter events based on the `is_sender` value of the Message object, where `is_sender` is false.