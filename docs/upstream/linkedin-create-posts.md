---
updatedAt: 2026-11-04T09:39:47.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Create posts

Learn how to create a post on LinkedIn using Unipile API.

> ❗️ About Post IDs
>
> Basically, Unipile uses base64 preformatted post IDs to simplify any interactions that require a post ID. **These are the IDs to be used throughout, unless otherwise specified.**

<br />

## Publish in your name

To create a new post in the name of the account owner, use the [Create a Post](https://developer.unipile.com/v2.0/reference/createpost) endpoint, specifying the content of the post in the `text` field of the body.

> 📘 About mentions
>
> Mentions are allowed in the post content following the pattern **@User**, where User can be either a system ID (`ACo...`) or a public identifier (e.g. johndoe in `www.linkedin.com/in/johndoe/`).
>
> Companies can be mentioned in the same way, using the pattern **@Company**. For a company mention, Company must be the numeric company ID (e.g. `1441`). The public identifier found in company URLs (e.g. `google` in `www.linkedin.com/company/google/`) does not work.

> 📘 Visibility and comment control
>
> * To define who can read your post, use the `can_read` field with either `anyone` or `relations_only` value.
> * To define who can comment you post, use the `can_comment` field with either `anyone`, `no_one` or `relations_only` value.

```node
const { data } = await postsApi.createPost({
  path: {
    account_id: "acc_123456789",
  },
  body: {
    text: 'Hello There !\n\nThis is my first post with Unipile !',
    can_comment: 'relations_only'
  },
});
```
```python
post = posts_api.create_post(
    "acc_123456789",
    {
        "text": "Hello There !\n\nThis is my first post with Unipile !",
        "can_comment": "relations_only",
    },
)
```
```curl
curl --request POST \
     --url https://api.unipile.com/v2/account_id/posts \
     --header 'accept: application/json'
     --header 'content-type: application/json' \
     --data '
{
  "text": "Hello There !\n\nThis is my first post with Unipile !",
  "can_comment": "relations_only"
}
'
```

<br />

## Publish on behalf of a company

On LinkedIn, you can also **create a post on behalf of a company** you are the admin of. Use `GET /v2/{account_id}/linkedin/company/pages` to list the company pages you manage.

Once you’ve retrieved the company ID, include it in the `post_as` field of the request body to publish the post on the company’s behalf.

```node
const { data } = await postsApi.createPost({
  path: {
    account_id: "acc_123456789",
  },
  body: {
    text: 'Hello There !\n\nThis is my first post with Unipile !',
    post_as: '123456'
  },
});
```
```curl
curl --request POST \
     --url https://api.unipile.com/v2/account_id/posts \
     --header 'accept: application/json'
     --header 'content-type: application/json' \
     --data '
{
  "text": "Hello There !\n\nThis is my first post with Unipile !",
  "post_as": "123456"
}
'
```

<br />

## Include attachments

Attachments can be included within a post on LinkedIn, using the `attachments` field in the request body.

> ❗️ Provider limitations
>
> You can either join multiple image files, or only one file of another type (video, document, etc.)..

```node
const pictureFile1 = await readFile('picture1.jpg');
const pictureFile2 = await readFile('picture2.jpg');

const { data } = await postsApi.createPost({
  path: {
    account_id: "acc_123456789",
  },
  body: {
    text: 'Hello There !\n\nThis is my first carousel with Unipile !',
    attachments: [
      {
        content: pictureFile1.toString('base64'),
        content_type: 'image/jpeg',
        filename: 'picture1.jpg'
      },
      {
        content: pictureFile2.toString('base64'),
        content_type: 'image/jpeg',
        filename: 'picture2.jpg'
      },
    ],
  },
});
```
```python
import base64

with open("picture1.jpg", "rb") as f:
    picture1 = base64.b64encode(f.read()).decode("utf-8")
with open("picture2.jpg", "rb") as f:
    picture2 = base64.b64encode(f.read()).decode("utf-8")

post = posts_api.create_post(
    "acc_123456789",
    {
        "text": "Hello There !\n\nThis is my first carousel with Unipile !",
        "attachments": [
            {
                "content": picture1,
                "content_type": "image/jpeg",
                "filename": "picture1.jpg",
            },
            {
                "content": picture2,
                "content_type": "image/jpeg",
                "filename": "picture2.jpg",
            },
        ],
    },
)
```
```curl
curl --request POST \
     --url https://api.unipile.com/v2/account_id/posts \
     --header 'accept: application/json'
     --header 'content-type: application/json' \
     --data '
{
  "text": "Hello There !\n\nThis is my first carousel with Unipile !",
  "attachments": [
    {
      "content": "base64",
      "content_type": "image/jpeg",
      "filename": "picture1.jpg",
    },
    {
      "content": "base64",
      "content_type": "image/jpeg",
      "filename": "picture2.jpg",
    }

  ]
}
'
```

<br />

## Include links previews

@todo

<br />

## Repost an existing post

To repost an existing post, you will have to include the post ID in the `quoted_post_id` field of the request body.

If you provide text content and/or attachments, the post will be considered **a new post quoting an existing post**. Otherwise, the post will just be **a simple repost**.

```node
const { data } = await postsApi.createPost({
  path: {
    account_id: "acc_123456789",
  },
  body: {
    text: 'Hello There !\n\nThis is my first repost with Unipile !',
    quoted_post_id: 'WzEyMywgNDU2XQ=='
  },
});
```
```python
post = posts_api.create_post(
    "acc_123456789",
    {
        "text": "Hello There !\n\nThis is my first repost with Unipile !",
        "quoted_post_id": "WzEyMywgNDU2XQ==",
    },
)
```
```curl
curl --request POST \
     --url https://api.unipile.com/v2/account_id/posts \
     --header 'accept: application/json'
     --header 'content-type: application/json' \
     --data '
{
  "text": "Hello There !\n\nThis is my first carousel with Unipile !",
  "quoted_post_id": "WzEyMywgNDU2XQ=="
}
'
```

<br />