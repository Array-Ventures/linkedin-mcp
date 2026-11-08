---
updatedAt: 2026-11-04T09:39:47.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Retrieve posts

Learn how to retrieve posts on LinkedIn using Unipile API.

> ❗️ About Post IDs
>
> Basically, Unipile uses base64 preformatted post IDs to simplify any interactions that require a post ID. **These are the IDs to be used throughout, unless otherwise specified.**

<br />

# List user posts

To get a list of posts, use the [List all User's Posts](https://developer.unipile.com/v2.0/reference/getpostslist) endpoint, specifying the **ID of the user or company** whose posts you want to retrieve.

To retrieve your own posts, set `me` as `user_id`.

> 📘 Note about pagination
>
> Pagination on this endpoint uses exclusively the `cursor` parameter.

```node
const { data } = await usersApi.getPostsList({
  path: {
    account_id: "acc_123456789",
    user_id: "user_id",
  },
});
```
```python
posts = users_api.get_posts_list("user_id", "acc_123456789")
```
```curl
curl --request GET \
     --url https://api.unipile.com/v2/account_id/users/user_id/posts \
     --header 'accept: application/json'
```

<br />

# Retrieve post from ID

To get a single post, use the [Get a Post](https://developer.unipile.com/v2.0/reference/getpost) endpoint, specifying the ID of the post you are looking for.

On this specific endpoint, **LinkedIn native Post IDs are accepted** (e.g. `activity:7461257878499151234`, `ugcPost:7461257878499155678`).

```node
const { data } = await postsApi.getPost({
  path: {
    account_id: "acc_123456789",
    post_id: "post_id",
  },
});
```
```python
post = posts_api.get_post("post_id", "acc_123456789")
```
```curl
curl --request GET \
     --url https://api.unipile.com/v2/account_id/posts/post_id \
     --header 'accept: application/json'
```

# Retrieve user activity

Use [List all User's Comments](https://developer.unipile.com/v2.0/reference/getusercommentslist) or [List all User's Reactions](https://developer.unipile.com/v2.0/reference/getuserreactionslist) with a provider user ID to retrieve the activity exposed for that user. Follow each method's pagination parameters to retrieve subsequent pages. These endpoints start from a user; [List all Post's Comments](https://developer.unipile.com/v2.0/reference/getpostcommentslist) and [List all Post's Reactions](https://developer.unipile.com/v2.0/reference/getpostreactionslist) start from a post instead. Visibility remains subject to the connected account's access.

```node
const { data } = await postsApi.getUserCommentsList({
  path: {
    account_id: "acc_123456789",
    user_id: "user_id",
  },
  query: {
    limit: 20,
  },
});
```
```python
data = posts_api.get_user_comments_list(
    account_id='acc_123456789',
    user_id='user_id',
    limit=20,
)
```
```curl
curl --request GET \
  --url "https://api.unipile.com/v2/acc_123456789/users/user_id/comments?limit=20" \
  --header 'X-API-KEY: YOUR_API_KEY'
```

## Retrieve reactions by a user

```node
const { data } = await postsApi.getUserReactionsList({
  path: {
    account_id: "acc_123456789",
    user_id: "user_id",
  },
  query: {
    limit: 20,
  },
});
```
```python
data = posts_api.get_user_reactions_list(
    account_id='acc_123456789',
    user_id='user_id',
    limit=20,
)
```
```curl
curl --request GET \
  --url "https://api.unipile.com/v2/acc_123456789/users/user_id/reactions?limit=20" \
  --header 'X-API-KEY: YOUR_API_KEY'
```