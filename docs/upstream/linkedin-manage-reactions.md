---
updatedAt: 2026-11-04T09:39:47.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Manage reactions

Learn how to manage message reactions on LinkedIn using Unipile API.

Users can react to Messages. LinkedIn use Emojis as message reactions.

> ❗️ Provider limitations
>
> Reactions are not available on **Recruiter and Sales navigator**.

<br />

# List detailed reactions

Each Message object have a reactions counter. But if you want details on who reacted what, use the [List all Message's Reactions](https://developer.unipile.com/v2.0/reference/getmessagereactionslist) endpoint and provide the Message ID.

```node
const { data } = await messagingApi.getMessageReactionsList({
  path: {
    account_id: "acc_123456789",
    chat_id: "chat_id",
    message_id: "message_id",
  },
  query: {
    limit: 20,
  },
});
```
```python
reactions = messaging_api.get_message_reactions_list(
    "chat_id",
    "message_id",
    "acc_123456789",
    limit=20,
)
```
```curl
curl --request GET \
     --url https://api.unipile.com/v2/account_id/chats/chat_id/messages/message_id/reactions \
     --header 'accept: application/json'
```

<br />

# React to a message

To react to a message, use the [Add a Message Reaction](https://developer.unipile.com/v2.0/reference/addmessagereaction) endpoint, specifying the message ID and the Emoji.\
Each user can send as many different reactions as they wish.

```node
await messagingApi.addMessageReaction({
  path: {
    account_id: "acc_123456789",
    chat_id: "chat_id",
    message_id: "message_id",
  },
  body: {
    reaction: '🔥',
  },
});
```
```python
messaging_api.add_message_reaction(
    "chat_id",
    "message_id",
    "acc_123456789",
    {"reaction": "🔥"},
)
```
```curl
curl --request POST \
     --url https://api.unipile.com/v2/account_id/chats/chat_id/messages/message_id/reactions \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --data '{"reaction":"🔥"}'
```

<br />

# Remove a reaction

To remove a reaction from a message, use the [Remove a Message Reaction](https://developer.unipile.com/v2.0/reference/removemessagereaction) endpoint, specifying the message ID and the Emoji to be removed.

```node
await messagingApi.removeMessageReaction({
  path: {
    account_id: "acc_123456789",
    chat_id: "chat_id",
    message_id: "message_id",
  },
  body: {
    reaction: '🔥',
  },
});
```
```python
messaging_api.remove_message_reaction(
    "chat_id",
    "message_id",
    "acc_123456789",
    {"reaction": "🔥"},
)
```
```curl
curl --request DELETE \
     --url https://api.unipile.com/v2/account_id/chats/chat_id/messages/message_id/reactions \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --data '{"reaction":"🔥"}'
```

<br />

# Be notified about reactions

To receive notifications when a new reaction is added to a message, [Configure a webhook](https://developer.unipile.com/v2.0/docs/configure-a-webhook) to listen to `message.reaction.new` events.