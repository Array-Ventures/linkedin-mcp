---
updatedAt: 2026-11-04T09:39:47.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Edit & delete messages

Learn how to edit and delete LinkedIn messages using Unipile API.

# Edit a message

To edit a message, use the [Modify a Message](https://developer.unipile.com/v2.0/reference/modifymessage) endpoint, specifying the ID of the message to be edited and the updated text content.

```node
const { data } = await messagingApi.modifyMessage({
  path: {
    account_id: "acc_123456789",
    chat_id: "chat_id",
    message_id: "message_id",
  },
  body: {
    text: 'Updated message content',
  },
});
```
```python
messaging_api.modify_message(
    "chat_id",
    "message_id",
    "acc_123456789",
    {"text": "Updated message content"},
)
```
```curl
curl --request POST \
     --url https://api.unipile.com/v2/account_id/chats/chat_id/messages/message_id/modify \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --data '
{
  "text": "Updated message content"
}
'
```

<br />

# Delete a message

To delete a message, use the [Delete a Message](https://developer.unipile.com/v2.0/reference/deletemessage) endpoint, specifying the ID of the message to be deleted.

```node
await messagingApi.deleteMessage({
  path: {
    account_id: "acc_123456789",
    chat_id: "chat_id",
    message_id: "message_id",
  },
});
```
```python
messaging_api.delete_message(
    "chat_id",
    "message_id",
    "acc_123456789",
)
```
```curl
curl --request DELETE \
     --url https://api.unipile.com/v2/account_id/chats/chat_id/messages/message_id
```

<br />

# Be notified about edited/deleted messages

To receive notifications when a message is edited or deleted, [Configure a webhook](https://developer.unipile.com/v2.0/docs/configure-a-webhook) to listen for `message.delete` and/or `message.update` events.