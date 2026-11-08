---
updatedAt: 2026-11-04T09:39:47.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Handle read status

Learn how to handle read statuses on LinkedIn using Unipile API.

When integrating a messaging platform, you need to handle read and unread status at two distinct levels:

* **Message read status** — tracking when the account owner has read someone else’s message, so indicators like the double blue check appear at the correct time for the recipient(s).
* **Chat read status** — maintaining the overall chat state (read/unread) across devices in real-time, to ensuring consistent organization and accurate indicators.

<br />

# Read messages

To mark messages from other users as read by the account owner, use the [Read a Message](https://developer.unipile.com/v2.0/reference/readmessage) endpoint, specifying the ID of the message.

> 👍 Recommendations
>
> For your integration to conform to a natural behavior, we recommend **marking messages as read before replying to them**.

> ❗️ Provider limitations
>
> This functionality is **not available on Recruiter nor Sales navigator** as there are no read receipts.

```node
await messagingApi.readMessage({
  path: {
    account_id: "acc_123456789",
    chat_id: "chat_id",
    message_id: "message_id",
  },
});
```
```python
messaging_api.read_message(
    "chat_id",
    "message_id",
    "acc_123456789",
)
```
```curl
curl --request POST \
     --url https://api.unipile.com/v2/account_id/chats/chat_id/messages/message_id/read \
     --header 'accept: application/json'
```

<br />

# Read a chat

When you receive messages in a chat, the `unread_count` (green badge in native apps) is automatically  increased,  and `is_unread` is set to `true` if there is at least one unread message.

To mark a chat as read (reset the `unread_count` and `is_unread`), use the [Update a Chat](https://developer.unipile.com/v2.0/reference/updatechat) endpoint and set `read_status` to `true`.

```node
await messagingApi.updateChat({
  path: {
    account_id: "acc_123456789",
    chat_id: "chat_id",
  },
  body: {
    read_status: true,
  },
});
```
```python
messaging_api.update_chat(
    "chat_id",
    "acc_123456789",
    {"read_status": True},
)
```
```curl
curl --request PATCH \
     --url https://api.unipile.com/v2/account_id/chats/chat_id \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --data '{"read_status":true}'
```

> 👍 Recommendation
>
> When marking a chat as read **on LinkedIn Classic**, also **mark all unread messages within it as read** to maintain consistent behavior in your integration. **This is not done automatically**.
>
> You can determine which messages are unread by using the `unread_count` property or by tracking a “last read” timestamp.
>
> For more details on marking messages as read, see the [Read messages](https://developer.unipile.com/v2.0/docs/whatsapp#read-messages) section of this guide.

<br />

# Mark a chat as unread

To force a chat to be marked as unread, use the [Update a Chat](https://developer.unipile.com/v2.0/reference/updatechat) endpoint and set `read_status` to `false`.

```node
await messagingApi.updateChat({
  path: {
    account_id: "acc_123456789",
    chat_id: "chat_id",
  },
  body: {
    read_status: false,
  },
});
```
```python
messaging_api.update_chat(
    "chat_id",
    "acc_123456789",
    {"read_status": False},
)
```