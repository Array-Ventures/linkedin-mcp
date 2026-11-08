---
updatedAt: 2026-11-04T09:39:47.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Manage post comments

Learn how to manage post comments on LinkedIn using Unipile API.

> ❗️ About Post IDs
>
> Basically, Unipile uses base64 preformatted post IDs to simplify any interactions that require a post ID. **These are the IDs to be used throughout, unless otherwise specified.**

<br />

# List comments

> 📘 Note about pagination
>
> Pagination on the following endpoints uses exclusively the `offset` parameter.

## Get comments from a post

To get the comments from a post, use the [List all Post's Comments](https://developer.unipile.com/v2.0/reference/getpostcommentslist) endpoint, specifying the post ID.

```node
const { data } = await postsApi.getPostCommentsList({
  path: {
    account_id: "acc_123456789",
    post_id: "post_id",
  },
});
```
```python
comments = posts_api.get_post_comments_list("post_id", "acc_123456789")
```
```curl
curl --request GET \
     --url https://api.unipile.com/v2/account_id/posts/post_id/comments \
     --header 'accept: application/json'
```

## Get replies to a comment

To get the replies to a comment, use the [List all Comment's Replies](https://developer.unipile.com/v2.0/reference/getpostcommentreplieslist) endpoint, specifying the post ID and the comment ID.

```node
const { data } = await postsApi.getPostCommentRepliesList({
  path: {
    account_id: "acc_123456789",
    post_id: "post_id",
    comment_id: "comment_id",
  },
});
```
```python
replies = posts_api.get_post_comment_replies_list(
    "post_id",
    "comment_id",
    "acc_123456789",
)
```
```curl
curl --request GET \
     --url https://api.unipile.com/v2/account_id/posts/post_id/comments/comment_id/replies \
     --header 'accept: application/json'
```

<br />

# Add a comment

> 📘 Commenting on behalf of a company
>
> You can **publish a comment on behalf of a company** you are the admin of. Use `GET /v2/{account_id}/linkedin/company/pages` to list the company pages you manage.
>
> Once you’ve retrieved the company ID, include it in the `comment_as` field of the request body to publish the comment on the company’s behalf.

> 📘 About mentions
>
> Mentions are allowed in the comments following the pattern **@User**, where User can be either a system ID (`ACo...`) or a public identifier (e.g. johndoe in `www.linkedin.com/in/johndoe/`).

## On a post

To comment a post, use the [Add Comment to a Post](https://developer.unipile.com/v2.0/reference/addpostcomment) endpoint, specifying the ID of the post and the content of the comment in the `text` field of the body.

```node
const { data } = await postsApi.addPostComment({
  path: {
    account_id: "acc_123456789",
    post_id: "post_id",
  },
  body: {
    text: 'This is a post comment !'
  },
});
```
```python
comment = posts_api.add_post_comment(
    "post_id",
    "acc_123456789",
    {"text": "This is a post comment !"},
)
```
```curl
curl --request POST \
     --url https://api.unipile.com/v2/account_id/posts/post_id/comments \
     --header 'accept: application/json'
     --data '
{
  "text": "This is a post comment !",
}
'
```

## As a reply to another comment

To reply to a comment, use the [Reply to a Comment](https://developer.unipile.com/v2.0/reference/replytocomment) endpoint, specifying the ID of the post, the ID of the comment, and the content of the reply in the `text` field of the body.

```node
const { data } = await postsApi.replyToComment({
  path: {
    account_id: "acc_123456789",
    post_id: "post_id",
    comment_id: "comment_id",
  },
  body: {
    text: 'This is a reply to a post comment !'
  },
});
```
```python
reply = posts_api.reply_to_comment(
    "post_id",
    "comment_id",
    "acc_123456789",
    {"text": "This is a reply to a post comment !"},
)
```
```curl
curl --request POST \
     --url https://api.unipile.com/v2/account_id/posts/post_id/comments/comment_id \
     --header 'accept: application/json'
     --data '
{
  "text": "This is a reply to a post comment !",
}
'
```

<br />

# Modify a comment

To edit the content of a comment you published, use the [Modify a Comment](https://developer.unipile.com/v2.0/reference/updatepostcomment) endpoint, specifying the post ID, the comment ID, and the content of the updated comment in the `text` field of the body.

```node
const { data } = await postsApi.updatePostComment({
  path: {
    account_id: "acc_123456789",
    post_id: "post_id",
    comment_id: "comment_id",
  },
  body: {
    text: 'This comment has been edited !',
  },
});
```
```python
comment = posts_api.update_post_comment(
    "post_id",
    "comment_id",
    "acc_123456789",
    {"text": "This comment has been edited !"},
)
```
```curl
curl --request PATCH \
     --url https://api.unipile.com/v2/account_id/posts/post_id/comments/comment_id \
     --header 'accept: application/json'
     --header 'content-type: application/json' \
     --data '
{
  "text": "This comment has been edited !",
}
'
```

<br />

# Delete a comment

To delete a comment you published, use the [Delete Comment from a Post](https://developer.unipile.com/v2.0/reference/deletepostcomment) endpoint, specifying the ID of the post and the ID of the comment to be deleted.

```node
await postsApi.deletePostComment({
  path: {
    account_id: "acc_123456789",
    post_id: "post_id",
    comment_id: "comment_id",
  },
});
```
```python
posts_api.delete_post_comment(
    "post_id",
    "comment_id",
    "acc_123456789",
)
```
```curl
curl --request DELETE \
     --url https://api.unipile.com/v2/account_id/posts/post_id/comments/comment_id \
     --header 'accept: application/json'
```