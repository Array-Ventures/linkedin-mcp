---
updatedAt: 2026-11-04T09:39:47.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Mute conversations

Learn how to mute / unmute LinkedIn conversations using Unipile API.

> ❗️ Provider limitations
>
> Muting / unmuting a chat is only available on **LinkedIn Classic**.

<br />

To update the mute status of a chat, use the [Update a Chat](https://developer.unipile.com/v2.0/reference/updatechat) endpoint, providing the `muted_until` field with :

* `true` to mute indefinitely
* `false` to unmute

```node
await messagingApi.updateChat({
  path: {
    account_id: "acc_123456789",
    chat_id: "chat_id",
  },
  body: {
    muted_until: true
  },
});
```
```python
messaging_api.update_chat(
    "chat_id",
    "acc_123456789",
    {"muted_until": True},
)
```
```curl
curl --request PATCH \
     --url https://api.unipile.com/v2/account_id/chats/chat_id \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --data '{"muted_until":true}'
```

> 📘 Note on message events
>
> `message.new` events are always sent to webhooks — even for muted chats — as they are intended for message synchronization.
>
> If your application includes a notification feature that should respect a chat’s mute status, check the mute status of the parent chat for each incoming message on your webhook before deciding whether to trigger a notification for your users.