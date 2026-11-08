---
updatedAt: 2026-11-04T09:32:47.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Posts API

This guide will help you migrate the Posts features of your application to API v2.

# Methods changed

For each endpoint in the v1 API, here are the corresponding endpoints in the v2 API, along with the necessary modifications to achieve the same results.

> ❗️ Specifying the target account
>
> The `account_id` param, previously available either in the query params or in the body, is removed from all methods. The `account_id` must now be consistently included in the path params.

<br />

## List all posts

`GET /v1/users/:identifier/posts`

* Use `GET /v2/:account_id/users/:user_id/posts` <Anchor label="List all User's Posts" target="_blank" href="ref:getpostslist">List all User's Posts</Anchor>.
* Path param `identifier` is renamed to `user_id`.
* Query param `is_company` is removed. The type of user is now automatically infered.
* The response schema has changed (see Post object changes).

<br />

## Retrieve a post

`GET /v1/posts/:post_id`

* Use `GET /v2/:account_id/posts/:post_id` <Anchor label="Get a Post" target="_blank" href="ref:getpost">Get a Post</Anchor>.
* The response schema has changed (see Post object changes).

<br />

## Create post

`POST /v1/posts`

* Use `POST /v2/:account_id/posts` <Anchor label="Create a Post" target="_blank" href="ref:createpost">Create a Post</Anchor>.
* Body param `mentions` is removed.
  * Use **@user\_id** pattern to mention users within the `text` param.
* Body param `attachments` has changed.
  * Specify an array of objects with `filename`, `content_type` and `data` in base64 encoding.
* Body param `repost` is renamed to `quoted_post_id`.
* Body param `as_organization` is renamed to `post_as`.

> 📘 Provider specifics
>
> * Provider options must now be set under `specifics`.
> * Body param `location` is moved to `specifics.instagram`. It has been changed to an object composed of the params `id`, `longitude` and `latitude`.
> * Body param `external_link` is removed. Read our Integration guide to learn how to integrate this **LinkedIn feature** in an even simpler way ([Include Links Previews](https://developer.unipile.com/v2.0/docs/linkedin-create-posts#include-links-previews)).

<br />

## List all comments from a post

`GET /v1/posts/:post_id/comments`

* Use `GET /v2/:account_id/posts/:post_id/comments` <Anchor label="List all Post's Comments" target="_blank" href="ref:getpostcommentslist">List all Post's Comments</Anchor>.
* Query param `comment_id` is removed.
  * Use `GET /v2/{account_id}/posts/{post_id}/comments/{comment_id}/replies` <Anchor label="List all Comment's Replies" target="_blank" href="ref:getpostcommentreplieslist">List all Comment's Replies</Anchor> to get the replies of a specific comment.
* The response schema has changed (see CommentList object changes).

<br />

## Comment a post

`POST /v1/posts/:post_id/comments`

* Use `POST /v2/:account_id/posts/:post_id/comments` <Anchor label="Add Comment to a Post" target="_blank" href="ref:addpostcomment">Add Comment to a Post</Anchor>.
* Body param `mentions` is removed.
  * Use **@user\_id** pattern to mention users within the `text` param.
* Body param `comment_id` is removed.
  * Use `POST /v2/:account_id/posts/:post_id/comments/:comment_id` <Anchor label="Reply to a Comment" target="_blank" href="ref:replytocomment">Reply to a Comment</Anchor> instead.
* Body param `as_organization` is renamed to `comment_as`.
* Body param `external_link` is removed. Read our Integration guide to learn how to integrate this **LinkedIn feature** in an even simpler way ([Include Links Previews](https://developer.unipile.com/v2.0/docs/linkedin-create-posts#include-links-previews)).

<br />

## List all reactions from a post

`GET /v1/posts/:post_id/reactions`

* Use `GET /v2/:account_id/posts/:post_id/reactions` [List all Post's Reactions](https://developer.unipile.com/v2.0/reference/getpostreactionslist).
* Query param `comment_id` is removed.
  * Use `GET /v2/{account_id}/posts/{post_id}/comments/{comment_id}/reactions` <Anchor label="List all Comment's Reactions" target="_blank" href="ref:getpostcommentreactionslist">List all Comment's Reactions</Anchor> instead.
* The response schema has changed (see PostReaction object changes).

<br />

## Add a reaction to a post

`POST /posts/reaction`

* Use `POST /v2/:account_id/posts/:post_id/reactions` [Add Reaction to a Post](https://developer.unipile.com/v2.0/reference/addpostreaction).
* Body param `post_id` is removed.
  * Specify the `post_id` in the path params.
* Body param `reaction_type` is removed.
  * Use `reaction` instead with emoji unicode or provider reaction type.
* Body param `comment_id` is removed.
  * Use `POST /v2/{account_id}/posts/{post_id}/comments/{comment_id}/reactions` <Anchor label="Add Reaction to a Comment" target="_blank" href="ref:addpostcommentreaction">Add Reaction to a Comment</Anchor> instead.
* Body param `as_organization` is renamed to `react_as`.

<br />

***

# Post object changes

Posts now have a single generic schema for all providers. Here is what changed between the old LinkedIn / Instagram posts and the new Post object.

### Linkedin post

| v1 field                                    | v2 change                                                                                                  |
| :------------------------------------------ | :--------------------------------------------------------------------------------------------------------- |
| `social_id`                                 | Removed, now use `id` everywhere.                                                                          |
| `date`                                      | Renamed to `created_at`                                                                                    |
| `parsed_datetime`                           | Removed, use `date`.                                                                                       |
| `reaction_counter`                          | Renamed to `reactions_counter` which now gives counts per reaction type / emoji.                           |
| `comment_counter`                           | Renamed to `comments_counter`.                                                                             |
| `repost_counter`                            | Renamed to `resposts_counter`.                                                                             |
| `user_reacted`                              | The value is now either the value of the reaction (emoji unicode or provider reaction type), or a boolean. |
| `author`                                    | The value is now a User object.                                                                            |
| `author.name`                               | Renamed to `author.display_name`.                                                                          |
| `author.is_company`                         | Removed, use `author.type == organization`.                                                                |
| `author.headline`                           | Renamed to `author.description`.                                                                           |
| `author.profile_picture_url`                | Renamed to `author.public_picture_url`.                                                                    |
| `written_by`                                | Removed.                                                                                                   |
| `repost_id`                                 | Removed, use `id` or `quoted_post.id`.                                                                     |
| `reposted_by`                               | The value is now a User object.                                                                            |
| `reposted_by.name`                          | Renamed to `reposted_by.display_name`.                                                                     |
| `reposted_by.is_company`                    | Removed, use `reposted_by.type == organization`.                                                           |
| `reposted_by.headline`                      | Renamed to `reposted_by.description`.                                                                      |
| `reposted_by.profile_picture_url`           | Renamed to `reposted_by.public_picture_url`.                                                               |
| `repost_content`                            | Renamed to `quoted_post`.                                                                                  |
| `mentions`                                  | Removed as mentions should be inferred from the text.                                                      |
| `group`                                     | Removed.                                                                                                   |
| `analytics.impressions`                     | Renamed to `analytics.impressions_counter`.                                                                |
| `analytics.engagements`                     | Renamed to `analytics.engagements_counter`.                                                                |
| `analytics.clicks`                          | Renamed to `analytics.clicks_counter`.                                                                     |
| `analytics.page_viewers_from_this_post`     | Renamed to `analytics.page_viewers_from_this_post_counter`.                                                |
| `analytics.followers_gained_from_this_post` | Renamed to `analytics.followers_gained_from_this_post_counter`.                                            |
| `analytics.members_reached`                 | Renamed to `analytics.users_reached_counter`.                                                              |

<br />

### Instagram post

| v1 fields                       | v2 changes                                                                 |
| :------------------------------ | :------------------------------------------------------------------------- |
| `provider_id`                   | Renamed to `id`.                                                           |
| `has_audio`                     | Moved in `specifics.instagram`.                                            |
| `has_liked`                     | Renamed to `user_reacted`.                                                 |
| `like_count`                    | Removed, use `reactions_counter`.                                          |
| `comment_count`                 | Renamed to `comments_counter`.                                             |
| `like_and_view_counts_disabled` | Removed, use `reaction_counter == null` and `impressions_counter == null`. |
| `comments_disabled`             | Removed, use `permissions.can_comment`.                                    |
| `accessibility_caption`         | Moved in `specifics.instagram`.                                            |
| `caption`                       | Renamed to `text`.                                                         |
| `video`                         | Removed, use `attachments`.                                                |
| `preview_image`                 | Removed, use `attachments`.                                                |
| `owner`                         | Removed, use `author`.                                                     |
| `location`                      | Moved in `specifics.instagram`.                                            |

<br />

## PostList object changes

The PostList object does not exist anymore. [List all User's Posts](https://developer.unipile.com/v2.0/reference/getpostslist)  now returns:

* An array of Post objects as `data`.
* Object `paging` is removed, use `total_count` instead.
* Property `cursor` is renamed to `next_cursor`.

<br />

***

# Comment object changes

### Linkedin comment

| v1 fields                            | v2 changes                                                                                             |
| :----------------------------------- | :----------------------------------------------------------------------------------------------------- |
| `post_id`                            | Removed.                                                                                               |
| `post_urn`                           | Removed.                                                                                               |
| `author`                             | The value is now a User object. The original value has moved to `author.display_name`.                 |
| `author_details`                     | Removed.                                                                                               |
| `author_details.id`                  | Moved to `author.id`.                                                                                  |
| `author_details.headline`            | Moved to `author.description`.                                                                         |
| `author_details.is_company`          | Removed, use `author.type == organization`.                                                            |
| `author_details.profile_url`         | Moved to `author.profile_url`.                                                                         |
| `author_details.profile_picture_url` | Moved to `author.public_picture_url`.                                                                  |
| `author_details.network_distance`    | Moved to `author.specifics.network_distance`.                                                          |
| `date`                               | Renamed to `created_at`.                                                                               |
| `picture_url`                        | Removed, use `attachments`.                                                                            |
| `reaction_counter`                   | Renamed to `reactions_counter` and changed to array of objects with `reaction` and `count` properties. |
| `user_reacted`                       | Removed.                                                                                               |

<br />

## CommentList object changes

The CommentList object does not exist anymore. [List all Post's Comments](https://developer.unipile.com/v2.0/reference/getpostcommentslist) now returns :

* An array of Comment objects as `data`.
* Object `paging` is removed, use `total_count` instead.
* Property `cursor` is renamed to `next_cursor`.

<br />

***

# PostReaction object changes

The PostReaction object does not exist anymore. [List all Comment's Reactions](https://developer.unipile.com/v2.0/reference/getpostcommentreactionslist) and [List all Post's Reactions](https://developer.unipile.com/v2.0/reference/getpostreactionslist)  return an array of generic Reaction objects.

### Linkedin post reaction

| v1 fields                    | Reaction equivalent                                                                  |
| :--------------------------- | :----------------------------------------------------------------------------------- |
| `author`                     | Renamed to `sender`. It is now a User object.                                        |
| `author.type`                | Moved to `sender`. Enum values has changed to either `individual` or `organization`. |
| `author.name`                | Renamed to `sender.display_name`.                                                    |
| `author.profile_picture_url` | Renamed to `sender.public_picture_url`.                                              |
| `author.headline`            | Renamed to `sender.description`.                                                     |
| `author.network_distance`    | Moved to `sender.specifics.network_distance`.                                        |
| `post_id`                    | Removed, irrelevant in Unipile v2.                                                   |
| `comment_id`                 | Removed, irrelevant in Unipile v2.                                                   |
| `value`                      | The value is now either the provider type of the reaction, or an emoji unicode.      |

<br />

## PostReactionList object changes

The CommentList object does not exist anymore. [List all Post's Reactions](https://developer.unipile.com/v2.0/reference/getpostreactionslist) now returns :

* An array of Reaction objects as `data`.
* Object `paging` is removed, use `total_count` instead.
* Property `cursor` is renamed to `next_cursor`.