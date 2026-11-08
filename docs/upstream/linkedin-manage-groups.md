---
updatedAt: 2026-11-04T09:39:47.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Manage groups

Learn how to manage LinkedIn groups using Unipile API.

> ❗️ Provider limitations
>
> Group messaging features are not available on **Recruiter, Sales navigator and Company pages**.

<br />

# Manage group members

## List members

To list all members of a group chat, use the [List all Chat Participants](https://developer.unipile.com/v2.0/reference/getparticipantslist) endpoint, specifying the chat ID.

```node
const { data } = await messagingApi.getParticipantsList({
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
participants = messaging_api.get_participants_list(
    "chat_id",
    "acc_123456789",
    limit=20,
)
```
```curl
curl --request GET \
     --url https://api.unipile.com/v2/account_id/chats/chat_id/participants \
     --header 'accept: application/json'
```

<br />

## Add a new member

To add a member to a group chat, use the [Add a Chat Participant](https://developer.unipile.com/v2.0/reference/addparticipant) endpoint, specifying the chat ID and the ID of the user to be added.

```node
await messagingApi.addParticipant({
  path: {
    account_id: "acc_123456789",
    chat_id: "chat_id",
  },
  body: {
    user_id: 'ACoA1B2C3D4E5F6g7Hi8J9K1L2m3NOpqRSTUvWxYZ',
  },
});
```
```python
messaging_api.add_participant(
    "chat_id",
    "acc_123456789",
    {"user_id": "ACoA1B2C3D4E5F6g7Hi8J9K1L2m3NOpqRSTUvWxYZ"},
)
```
```curl
curl --request POST \
     --url https://api.unipile.com/v2/account_id/chats/chat_id/participants \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --data '
{
  "user_id": "334455667788@s.whatsapp.net"
}
'
```

<br />

## Remove a member

To remove a member from a group, use the [Remove a Chat Participant](https://developer.unipile.com/v2.0/reference/removeparticipant) endpoint, specifying the chat ID and the ID of the user to be removed.

```node
await messagingApi.removeParticipant({
  path: {
    account_id: "acc_123456789",
    chat_id: "chat_id",
    user_id: "ACoA1B2C3D4E5F6g7Hi8J9K1L2m3NOpqRSTUvWxYZ",
  },
});
```
```python
messaging_api.remove_participant(
    "chat_id",
    "ACoA1B2C3D4E5F6g7Hi8J9K1L2m3NOpqRSTUvWxYZ",
    "acc_123456789",
)
```
```curl
curl --request DELETE \
     --url https://api.unipile.com/v2/account_id/chats/chat_id/participants/334455667788%40s.whatsapp.net \
     --header 'accept: application/json'
```

<br />

# Leave a group

To leave a group, use the [Remove a Chat Participant](https://developer.unipile.com/v2.0/reference/removeparticipant) endpoint, specifying the user ID of the account owner.

```node
const account = await accountsApi.getAccount({
  path: {
    account_id: "acc_123456789",
  },
});

const selfUserId = account.data?.user_id;

if (selfUserId) {
  await messagingApi.removeParticipant({
    path: {
      account_id: "acc_123456789",
      chat_id: "chat_id",
      user_id: selfUserId,
    },
  });
}
```
```python
account = accounts_api.get_account("acc_123456789")
self_user_id = account.user_id

if self_user_id:
    messaging_api.remove_participant(
        "chat_id",
        self_user_id,
        "acc_123456789",
    )
```

> 📘 Note about groups you left
>
> When the account owner leaves a group, the `read_only` property is set to `true` on the Chat object. The chat will remain in the chat list, and its messages can still be retrieved.
>
> If the owner selects **Delete conversation** from the LinkedIn app after leaving, the chat and its messages will be removed entirely and will no longer appear in API results.

<br />

# Update group name

To change the name of a group, use the [Update a Chat](https://developer.unipile.com/v2.0/reference/updatechat) endpoint, specifying the ID of the chat and the updated name.

```node
await messagingApi.updateChat({
  path: {
    account_id: "acc_123456789",
    chat_id: "chat_id",
  },
  body: {
    name: 'Updated Chat Name',
  },
});
```
```python
messaging_api.update_chat(
    "chat_id",
    "acc_123456789",
    {"name": "Updated Chat Name"},
)
```