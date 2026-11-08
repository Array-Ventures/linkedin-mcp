---
updatedAt: 2026-11-04T09:39:47.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Manage invitations

Learn how to manage invitations on LinkedIn using Unipile API.

# List pending invitations

To list pending invitations, use the [List all pending Relation requests](https://developer.unipile.com/v2.0/reference/getrelationrequestslist) endpoint, specifying the type of invitations as either `sent` or `received`.

> 📘 Note about pagination
>
> Pagination for this endpoint works with the `offset` parameter.

```node
const { data } = await usersApi.getRelationRequestsList({
  path: {
    account_id: "acc_123456789",
  },
  query: {
    type: "sent",
  },
});
```
```python
requests = users_api.get_relation_requests_list(
    "sent",
    "acc_123456789",
)
```
```curl
curl --request GET \
     --url https://api.unipile.com/v2/account_id/users/me/relation-requests?type=sent \
     --header 'accept: application/json'
```

<br />

# Send an invitation

To send an invitation to a user, use the [Send a Relation request](https://developer.unipile.com/v2.0/reference/createrelationrequest) endpoint, specifying the user’s system ID (`ACo…`) in the request body. An optional custom message may also be included.

> 👍 Recommendations
>
> Incorporate realistic delays between actions to mimic human behavior. **Avoid sending consecutive invitations**, as this could be misinterpreted as automation by LinkedIn.

> ❗️ Provider limitations
>
> LinkedIn imposes limits on the number of invitations that can be sent :
>
> * For a **Basic free account**, you should be able to send approximately **150 invitations per week**, depending on your level of activity. Also, **only 5 invitations with custom messages** are allowed per month.
> * For a **Premium paid account**, you should be able to send from **200 to 250 invitations per week**, without any limitations on custom messages.

```node
const { data } = await usersApi.createRelationRequest({
  path: {
    account_id: "acc_123456789",
  },
  body: {
    user_id: 'ACoA1B2C3D4E5F6g7Hi8J9K1L2m3NOpqRSTUvWxYZ',
    message: 'The message that comes with the invitation.'
  },
});
```
```python
request = users_api.create_relation_request(
    "acc_123456789",
    {
        "user_id": "ACoA1B2C3D4E5F6g7Hi8J9K1L2m3NOpqRSTUvWxYZ",
        "message": "The message that comes with the invitation.",
    },
)
```
```curl
curl --request POST \
     --url https://api.unipile.com/v2/account_id/users/me/relation-requests \
     --header 'accept: application/json'
     --data '
{
  "user_id": "ACoA1B2C3D4E5F6g7Hi8J9K1L2m3NOpqRSTUvWxYZ"
  "message": "The message that comes with the invitation."
}
'
```

<br />

# Accept an invitation

To accept an invitation from another user, use the [Accept a Relation request](https://developer.unipile.com/v2.0/reference/acceptrelationrequest) endpoint, specifying the invitation ID as `request_id`.

```node
await usersApi.acceptRelationRequest({
  path: {
    account_id: "acc_123456789",
    request_id: "request_id",
  },
});
```
```python
users_api.accept_relation_request("request_id", "acc_123456789")
```
```curl
curl --request POST \
     --url https://api.unipile.com/v2/account_id/users/me/relation-requests/request_id/accept \
     --header 'accept: application/json'
```

<br />

# Withdraw/Refuse an invitation

To withdraw an invitation you sent or refuse an invitation you received, use the [Cancel or Refuse a Relation request](https://developer.unipile.com/v2.0/reference/cancelrelationrequest) endpoint, specifying the invitation ID as the request\_id.

```node
await usersApi.cancelRelationRequest({
  path: {
    account_id: "acc_123456789",
    request_id: "request_id",
  },
});
```
```python
users_api.cancel_relation_request("request_id", "acc_123456789")
```
```curl
curl --request POST \
     --url https://api.unipile.com/v2/account_id/users/me/relation-requests/request_id/accept \
     --header 'accept: application/json'
```

# Follow or unfollow a member

[Follow a User](https://developer.unipile.com/v2.0/reference/followuser) subscribes to a member's updates; [Unfollow a User](https://developer.unipile.com/v2.0/reference/unfollowuser) stops following them. These actions differ from sending or accepting a connection invitation and do not establish a first-degree relationship on their own. Use the provider user ID returned by search or profile retrieval.

```node
const { data } = await usersApi.followUser({
  path: {
    account_id: "acc_123456789",
    user_id: "ACo_MEMBER_ID",
  },
});
```
```python
data = users_api.follow_user(
    account_id='acc_123456789',
    user_id='ACo_MEMBER_ID',
)
```
```curl
curl --request POST \
  --url "https://api.unipile.com/v2/acc_123456789/users/me/follow/ACo_MEMBER_ID" \
  --header 'X-API-KEY: YOUR_API_KEY'
```

## Unfollow a member

```node
const { data } = await usersApi.unfollowUser({
  path: {
    account_id: "acc_123456789",
    user_id: "ACo_MEMBER_ID",
  },
});
```
```python
data = users_api.unfollow_user(
    account_id='acc_123456789',
    user_id='ACo_MEMBER_ID',
)
```
```curl
curl --request POST \
  --url "https://api.unipile.com/v2/acc_123456789/users/me/unfollow/ACo_MEMBER_ID" \
  --header 'X-API-KEY: YOUR_API_KEY'
```

# Remove a connection

Use [Delete a Relation](https://developer.unipile.com/v2.0/reference/deleterelation) to remove an existing connection. This changes the relationship; unfollowing only changes whether the member is followed. Refresh [List all User's Relations](https://developer.unipile.com/v2.0/reference/getuserrelations) after removing a connection.

```node
const { data } = await usersApi.deleteRelation({
  path: {
    account_id: "acc_123456789",
    user_id: "ACo_MEMBER_ID",
  },
});
```
```python
data = users_api.delete_relation(
    account_id='acc_123456789',
    user_id='ACo_MEMBER_ID',
)
```
```curl
curl --request DELETE \
  --url "https://api.unipile.com/v2/acc_123456789/users/me/relations/ACo_MEMBER_ID" \
  --header 'X-API-KEY: YOUR_API_KEY'
```