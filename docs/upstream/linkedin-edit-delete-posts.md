---
updatedAt: 2026-11-04T09:39:47.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Edit & delete posts

Learn how to edit and delete LinkedIn posts using Unipile API.

> ❗️ About Post IDs
>
> Basically, Unipile uses base64 preformatted post IDs to simplify any interactions that require a post ID. **These are the IDs to be used throughout, unless otherwise specified.**

<br />

# Edit a post

To edit the content of a post you published, use the [Modify a Post](https://developer.unipile.com/v2.0/reference/updatepost) endpoint, specifying the post ID and the content of the updated post in the `text` field of the body.

> 📘 About mentions
>
> Mentions are allowed in the post content following the pattern **@User**, where User can be either a system ID (`ACo...`) or a public identifier (e.g. johndoe in `www.linkedin.com/in/johndoe/`).
>
> Companies can be mentioned in the same way, using the pattern **@Company**. For a company mention, Company must be the numeric company ID (e.g. `1441`). The public identifier found in company URLs (e.g. `google` in `www.linkedin.com/company/google/`) does not work.

```node
const { data } = await postsApi.updatePost({
  path: {
    account_id: "acc_123456789",
    post_id: "post_id",
  },
  body: {
    text: 'Hello There !\n\nThis post has been edited !',
  },
});
```
```python
post = posts_api.update_post(
    "post_id",
    "acc_123456789",
    {"text": "Hello There !\n\nThis post has been edited !"},
)
```
```curl
curl --request PATCH \
     --url https://api.unipile.com/v2/account_id/posts/post_id \
     --header 'accept: application/json'
     --header 'content-type: application/json' \
     --data '
{
  "text": "Hello There !\n\nThis post has been edited !",
}
'
```

<br />

# Delete a post

To delete a post you published, use the [Delete a Post](https://developer.unipile.com/v2.0/reference/deletepost) endpoint, specifying the ID of the post to be deleted.

```node
await postsApi.deletePost({
  path: {
    account_id: "acc_123456789",
    post_id: "post_id",
  },
});
```
```python
posts_api.delete_post("post_id", "acc_123456789")
```
```curl
curl --request DELETE \
     --url https://api.unipile.com/v2/account_id/posts/post_id \
     --header 'accept: application/json'
     --header 'content-type: application/json' \
```