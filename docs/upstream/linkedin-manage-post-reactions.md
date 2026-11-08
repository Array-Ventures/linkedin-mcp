---
updatedAt: 2026-11-04T09:39:47.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Manage post reactions

Learn how to manage post reactions on LinkedIn using Unipile API.

> ❗️ About Post IDs
>
> Basically, Unipile uses base64 preformatted post IDs to simplify any interactions that require a post ID. **These are the IDs to be used throughout, unless otherwise specified.**

<br />

# List reactions

> 📘 Note about pagination
>
> Pagination on the following endpoints uses exclusively the `offset` parameter.

## On a post

To list the reactions on a post, use the [List all Post's Reactions](https://developer.unipile.com/v2.0/reference/getpostreactionslist) endpoint, specifying the post ID.

```node
const { data } = await postsApi.getPostReactionsList({
  path: {
    account_id: "acc_123456789",
    post_id: "post_id",
  },
});
```
```python
reactions = posts_api.get_post_reactions_list("post_id", "acc_123456789")
```
```curl
curl --request GET \
     --url https://api.unipile.com/v2/account_id/posts/post_id/reactions \
     --header 'accept: application/json'
```

## On a comment

To list the reactions on a post comment, use the [List all Comment's Reactions](https://developer.unipile.com/v2.0/reference/getpostcommentreactionslist) endpoint, specifying the post ID and the comment ID.

```node
const { data } = await postsApi.getPostCommentReactionsList({
  path: {
    account_id: "acc_123456789",
    post_id: "post_id",
    comment_id: "comment_id",
  },
});
```
```python
reactions = posts_api.get_post_comment_reactions_list(
    "post_id",
    "comment_id",
    "acc_123456789",
)
```
```curl
curl --request GET \
     --url https://api.unipile.com/v2/account_id/posts/post_id/comments/comment_id/reactions \
     --header 'accept: application/json'
```

<br />

# Add a reaction

LinkedIn uses the following predefined reactions in the posts ecosystem :

* ![](https://files.readme.io/ec0072cfc775ab14435351154fa97052c505f64b7778f95b35c061d2a94fd133-image.png) : the **Like** reaction (`linkedin_like` type)
* ![](https://files.readme.io/2648077c926f4574c02588c5f64e0d43773f8edb7cc3fa5605c1342169f0f851-image.png) : the **Celebrate** reaction (`linkedin_celebrate` type)
* ![](https://files.readme.io/478a15cc2932b87b5e420b5bbbbb934de80a9a46d2b2763ed67aa279b271a48d-image.png) : the **Support** reaction (`linkedin_support` type)
* ![](https://files.readme.io/7ee41e4cdfb284f230558e26073188bd6b101715050be528a11fa5b2a27fce19-image.png) : the **Love** reaction (`linkedin_love` type)
* ![](https://files.readme.io/8672782441bada684f7b456417914f738adc3d5066160937f1dea941a82767a0-image.png) : the **Insightful** reaction (`linkedin_insighful` type)
* ![](https://files.readme.io/7cca03bd33e01b1f3491d88cd8fcacc82ae781ce7e3e627656187062fde6a30d-image.png) : the **Funny** reaction (`linkedin_funny` type)

> 📘 Reacting on behalf of a company
>
> You can react as a company page you administer. First list your managed pages with `GET /v2/{account_id}/linkedin/company/pages`, then pass its ID in the `react_as` field.

## To a post

To react to a post, use the [Add Reaction to a Post](https://developer.unipile.com/v2.0/reference/addpostreaction) endpoint, specifying the post ID and the reaction type in the `reaction` field of the request body.

```node
await postsApi.addPostReaction({
  path: {
    account_id: "acc_123456789",
    post_id: "post_id",
  },
  body: {
    reaction: 'linkedin_celebrate'
  },
});
```
```python
posts_api.add_post_reaction(
    "post_id",
    "acc_123456789",
    {"reaction": "linkedin_celebrate"},
)
```
```curl
curl --request POST \
     --url https://api.unipile.com/v2/account_id/posts/post_id/reactions \
     --header 'accept: application/json'
     --data '
{
  "reaction": "linkedin_celebrate"
}
'
```

## To a comment

To react to a post comment, use the [Add Reaction to a Comment](https://developer.unipile.com/v2.0/reference/addpostcommentreaction) endpoint, specifying the post ID, the comment ID and the reaction type in the `reaction` field of the request body.

```node
await postsApi.addPostCommentReaction({
  path: {
    account_id: "acc_123456789",
    post_id: "post_id",
    comment_id: "comment_id",
  },
  body: {
    reaction: 'linkedin_funny'
  },
});
```
```python
posts_api.add_post_comment_reaction(
    "post_id",
    "comment_id",
    "acc_123456789",
    {"reaction": "linkedin_funny"},
)
```
```curl
curl --request POST \
     --url https://api.unipile.com/v2/account_id/posts/post_id/comments/comment_id/reactions \
     --header 'accept: application/json'
     --data '
{
  "reaction": "linkedin_celebrate"
}
'
```

<br />

# Remove a reaction

## From a post

To remove a reaction from a post, use the [Remove Reaction from a Post](https://developer.unipile.com/v2.0/reference/removepostreaction) endpoint, specifying the post ID.

```node
await postsApi.removePostReaction({
  path: {
    account_id: "acc_123456789",
    post_id: "post_id",
  },
  body: {
    reaction: 'linkedin_support'
  },
});
```
```python
posts_api.remove_post_reaction(
    "post_id",
    "acc_123456789",
    {"reaction": "linkedin_support"},
)
```
```curl
curl --request DELETE \
     --url https://api.unipile.com/v2/account_id/posts/post_id/reactions \
     --header 'accept: application/json'
     --data '
{
  "reaction": "linkedin_support"
}
'
```

## From a comment

To remove a reaction from a post comment, use the [Remove Reaction from a Comment](https://developer.unipile.com/v2.0/reference/removepostcommentreaction) endpoint, specifying the post ID and the comment ID.

```node
await postsApi.removePostCommentReaction({
  path: {
    account_id: "acc_123456789",
    post_id: "post_id",
    comment_id: "comment_id",
  },
  body: {
    reaction: 'linkedin_like'
  },
});
```
```python
posts_api.remove_post_comment_reaction(
    "post_id",
    "comment_id",
    "acc_123456789",
    {"reaction": "linkedin_like"},
)
```
```curl
curl --request DELETE \
     --url https://api.unipile.com/v2/account_id/posts/post_id/comments/comment_id/reactions \
     --header 'accept: application/json'
     --data '
{
  "reaction": "linkedin_like"
}
'
```