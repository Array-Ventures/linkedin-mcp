---
updatedAt: 2026-11-04T09:32:47.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Users API

This guide will help you migrate the Users features of your application to API v2.

# Methods changes

For each endpoint in the v1 API, here are the corresponding endpoints in the v2 API, along with the necessary modifications to achieve the same results.

> ❗️ Specifying the target account
>
> The `account_id` param, previously available either in the query params or in the body, is removed from all methods. The `account_id` must now be consistently included in the path params.

<br />

## List all invitations sent

`GET /v1/users/invite/sent`

This endpoint is removed.

> 👍 What to use instead
>
> To get a list of pending relation requests sent by the account owner, use `GET /v2/:account_id/users/me/relation-requests` <Anchor label="List all pending Relation / Follow requests" target="_blank" href="ref:getrelationrequestslist">List all pending Relation / Follow requests</Anchor>, specifying `sent` in query param `type`.

<br />

## List all invitations received

`GET /v1/users/invite/received`

This endpoint is removed.

> 👍 What to use instead
>
> To get a list of pending relation requests received by the account owner, use `GET /v2/:account_id/users/me/relation-requests` <Anchor label="List all pending Relation / Follow requests" target="_blank" href="ref:getrelationrequestslist">List all pending Relation / Follow requests</Anchor>, specifying `received` in query param `type`.

<br />

## Handle a received invitation

`GET /v1/users/invite/received/:invitation_id`

This endpoint is removed. All the body params are considered deprecated.

> 👍 What to use instead
>
> Here's how to handle invitations :
>
> * To **accept a relation request**, use `GET /v2/:account_id/users/me/relation-requests/:request_id/accept` <Anchor label="Accept a Relation request" target="_blank" href="ref:acceptrelationrequest">Accept a Relation request</Anchor> with the request ID.
> * To **refuse a relation request**, use `GET /v2/:account_id/users/me/relation-requests/:request_id/cancel` <Anchor label="Cancel or Refuse a Relation / Follow request" target="_blank" href="ref:cancelrelationrequest">Cancel or Refuse a Relation / Follow request</Anchor> with the request ID.

<br />

## Retrieve own profile

`GET /v1/users/me`

* Use `GET /v2/:account_id/users/user_id` <Anchor label="Get a User Profile" target="_blank" href="ref:getuserprofile">Get a User Profile</Anchor> with `me` as `user_id`. But be aware this route returns whole **Social Profiles** and work only with social providers. If you used **Retrieve own profile** in v1 to get informations about the owner of the connected account, you should now look at the Account object in [Get Accounts Lists](https://developer.unipile.com/v2.0/reference/getsalesaccountlists) or [Get an Account](https://developer.unipile.com/v2.0/reference/getaccount).
* The response schema has changed (see [UserProfile object changes](#userprofile-object-changes)).

<br />

## Retrieve a profile

`GET /v1/users/:user_id`

* Use `GET /v2/:account_id/users/:user_id` <Anchor label="Get a User Profile" target="_blank" href="ref:getuserprofile">Get a User Profile</Anchor>.
* Query param `linkedin_sections` is renamed to `with_sections` and now makes it possible to gather the sections of all providers in one place. A prefix `linkedin_` has been added to all sections specifically targeting LinkedIn.
* The response schema has changed (see [UserProfile object changes](#userprofile-object-changes)).

<br />

## Edit own profile

`POST /v1/users/me/edit`

* Use `PATCH /v2/:account_id/users/:user_id` [Update a User Profile](https://developer.unipile.com/v2.0/reference/updateuserprofile) with `me` as `user_id`.
* Body params `picture` and `cover_picture` have changed.
* * Param `cover_picture` is renamed to `background_picture`.
  * Each param now takes an object with `filename`, `content_type` and `data` in base64 encoding.
* Body param `location` now expects a string instead of an object.
* Body param `type` is removed. All provider specific fields are now located under `specifics[provider_name]`.

> 📘 LinkedIn specifics
>
> * Param `summary` is removed. Use param `bio` from the body root instead.
> * Param `picture_settings` is renamed to `picture_options`.
> * Param `cover_picture_settings` is renamed to `background_picture_options`.
> * Param `experience` has changed.
>   * Param `role` is renamed to `job_title` and is now an object composed of the fields `id` (ID of the job) and `text` (name of the job).
>   * Param `company` is now an object composed of the fields `id` (ID of the company) and `text` (name of the company).
>   * Param `company_id` is removed as it is now included in the `company` object.
>   * Param `presence` is renamed to `workplace_type`.
>   * Param `skills` is now an array of objects composed of the fields `id` (ID of the skill) and `text` (name of the skill).
>   * Param `attachment` has changed.
>     * **For a file**, provide an object with `filename`, `content_type` and `data` in base64 encoding.
>     * **For a link**, provide an object with `url` and optionnally `thumbnail`.
>     * Param `type` is removed.
>     * Param `title` is removed. Use `experience.attachment_title` instead.
>     * Param `description` is removed. Use `experience.attachment_description` instead.
> * Param `education` has changed.
>   * Param `school` is now an object composed of the fields `id` (ID of the school) and `text` (name of the school).
>   * Param `degree` is now an object composed of the fields `id` (ID of the degree) and `text` (name of the degree).
>   * Param `field_of_study` is now an object composed of the fields `id` (ID of the field) and `text` (name of the field).
>   * Param `skills` is now an array of objects composed of the fields `id` (ID of the skill) and `text` (name of the skill).
>   * Param `attachment` has changed the same way as in `experience`.

<br />

## List all relations

`GET /v1/users/relations`

* Use `GET /v2/:account_id/users/:user_id/relations` <Anchor label="List all User's Relations" target="_blank" href="ref:getuserrelations">List all User's Relations</Anchor>.
* This endpoint can now be used to list any user's relations, not only the account owner's. To target the account owner, set `me` as `user_id`.
* The response schema has changed (see [UserRelationsList object changes](#userrelationslist-object-changes)).

<br />

## List all followed accounts

`GET /v1/users/following`

* Use `GET /v2/:account_id/users/:user_id/following` <Anchor label="List Following of a User" target="_blank" href="ref:listuserfollowing">List Following of a User</Anchor>.
* This endpoint can now be used to list any user's following, not only the account owner's. To target the account owner, set `me` as `user_id`.
* Query param `user_id` is removed.
  * Specify the `user_id` in the path params.
* Pagination may user either offset or cursor depending on the provider. Read our Integration guides to learn more.
* The response schema has changed (see [UserRelationsList object changes](#userrelationslist-object-changes)).

<br />

## List all followers

`GET /v1/users/followers`

* Use `GET /v2/:account_id/users/:user_id/followers` <Anchor label="List all User Followers" target="_blank" href="ref:listuserfollowers">List all User Followers</Anchor>.
* This endpoint can now be used to list any user's followers, not only the account owner's. To target the account owner, set `me` as `user_id`.
* Query param `user_id` is removed.
  * Specify the `user_id` in the path params.
* Pagination may user either offset or cursor depending on the provider. Read our Integration guides to learn more.
* The response schema has changed (see [UserFollowersList object changes](#userfollowerslist-object-changes)).

<br />

## Send an invitation

`POST /v1/users/invite`

* Use `POST /v2/{account_id}/users/me/relation-requests` [Send a Relation request](https://developer.unipile.com/v2.0/reference/createrelationrequest)
* Body param `provider_id` is renamed to `user_id`.
* Body param `user_email` is removed as it is not applicable in all cases.

<br />

## Cancel an invitation

`DELETE /v1/users/invite/sent/:invitation_id`

* Use `POST /v2/:account_id/users/me/relation-requests/:request_id/cancel` <Anchor label="Cancel or Refuse a Relation / Follow request" target="_blank" href="ref:cancelrelationrequest">Cancel or Refuse a Relation / Follow request</Anchor>.
* Query param `invitation_id` is removed.
  * Specify the `request_id` in the path params.

<br />

## List all posts

`GET /v1/users/:identifier/posts`

* Use `GET /v2/:account_id/users/:user_id/posts` [List all User's Posts](https://developer.unipile.com/v2.0/reference/getpostslist).
* Query param `account_id` is now in the path params.

<br />

***

# Response objects changes

## InvitationSent/Received

**InvitationSent** and **InvitationReceived** objects has been replaced by a single **RelationRequest** object:

| v1 field                              | v2 mapping                                           |
| :------------------------------------ | :--------------------------------------------------- |
| `invited_user`                        | `user.display_name` (`sent` requests only)           |
| `invited_user_id`                     | `user.id` (`sent` requests only)                     |
| `invited_user_public_id`              | `user.public_identifier` (`sent` requests only)      |
| `invited_user_description`            | `user.description` (`sent` requests only)            |
| `date`                                | `created_at`                                         |
| `parsed_datetime`                     | **Removed as not relevant.**                         |
| `invitation_text`                     | `message`                                            |
| `inviter`                             | Changed to **User** object.                          |
| `inviter.inviter_name`                | `user.display_name` (`received` requests only)       |
| `inviter.inviter_id`                  | `user.id` (`received` requests only)                 |
| `inviter.inviter_public_identifier`   | `user.public_identifier` (`received` requests only)  |
| `inviter.inviter_description`         | `user.description` (`received` requests only)        |
| `inviter.inviter_profile_picture_url` | `user.public_picture_url` (`received` requests only) |
| `specifics`                           | **Removed as no longer relevant.**                   |

<br />

### InvitationList

The **InvitationList** object does not exist anymore. [List all pending Relation / Follow requests](https://developer.unipile.com/v2.0/reference/getrelationrequestslist)  now returns:

* An array of **RelationRequest** objects as `data`.
* Property `cursor` is renamed to `next_cursor`.

<br />

***

## UserProfile

| v1 field                    | v2 mapping                   |
| :-------------------------- | :--------------------------- |
| `provider_id`               | `id`                         |
| `headline`                  | `description`                |
| `summary`                   | `bio`                        |
| `contact_info.emails`       | `emails`                     |
| `contact_info.phones`       | `phone_numbers`              |
| `contact.adresses`          | `addresses`                  |
| `contact.socials`           | `social_handles`             |
| `birthdate`                 | `birth_date`                 |
| `creator_website`           | `websites`                   |
| `profile_picture_url`       | `public_picture_url`         |
| `profile_picture_url_large` | `public_picture_url_large`   |
| `is_self`                   | **Removed as not relevant.** |
| `follower_count`            | `followers_count`            |
| `connections_count`         | `relations_count`            |
| `shared_connections_count`  | `shared_relations_count`     |
| `public_profile_url`        | `profile_url`                |

<br />

### Provider specifics changes

<Callout icon="📘" theme="info">
  Provider-specific fields are now located within the `specifics` object.
</Callout>

#### LinkedIn

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        v1 field
      </th>

      <th>
        v2 field
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `primary_locale`
      </td>

      <td>
        `default_locale` (changed to POSIX string format : language_COUNTRY, e.g., en_US, fr_FR, etc.)
      </td>
    </tr>

    <tr>
      <td>
        `hashtags`
      </td>

      <td>
        **Removed as deprecated.**
      </td>
    </tr>

    <tr>
      <td>
        `invitation`
      </td>

      <td>
        Replaced by `relation_request` which is a **Relation Request** object.
      </td>
    </tr>

    <tr>
      <td>
        `invitation.status`
      </td>

      <td>
        `relation_request_status`
      </td>
    </tr>

    <tr>
      <td>
        `hashtags`
      </td>

      <td>
        **Removed as deprecated.**
      </td>
    </tr>

    <tr>
      <td>
        `notes`
      </td>

      <td>
        `recruiting_profile.notes`
      </td>
    </tr>

    <tr>
      <td>
        `notes.author`
      </td>

      <td>
        Changed to **User** object.
      </td>
    </tr>

    <tr>
      <td>
        `tags`
      </td>

      <td>
        `recruiting_profile.tags`
      </td>
    </tr>

    <tr>
      <td>
        `recruiting_activity`
      </td>

      <td>
        `recruiting_profile.events`
      </td>
    </tr>

    <tr>
      <td>
        `recruiting_activity.updated_at`
      </td>

      <td>
        `recruiting_profile.events.last_updated_at`
      </td>
    </tr>

    <tr>
      <td>
        `recruiting_activity.updated_by`
      </td>

      <td>
        Moved + renamed to `recruiting_profile.events.last_updated_by` and changed to **User** object.
      </td>
    </tr>

    <tr>
      <td>
        `recruiting_activity.created_at`  
        `recruiting_activity.created_by`
      </td>

      <td>
        **Removed as not relevant.**
      </td>
    </tr>

    <tr>
      <td>
        `work_experience`
      </td>

      <td>
        `experience`
      </td>
    </tr>

    <tr>
      <td>
        `work_experience.position`
      </td>

      <td>
        `experience.title`
      </td>
    </tr>

    <tr>
      <td>
        `work_experience.company`
      </td>

      <td>
        `experience.company.name`
      </td>
    </tr>

    <tr>
      <td>
        `work_experience.company_id`
      </td>

      <td>
        `experience.company.id`
      </td>
    </tr>

    <tr>
      <td>
        `work_experience.company_url`
      </td>

      <td>
        `experience.company.profile_url`
      </td>
    </tr>

    <tr>
      <td>
        `work_experience.company_picture_url`
      </td>

      <td>
        `experience.company.picture_url`
      </td>
    </tr>

    <tr>
      <td>
        `work_experience.industry`
      </td>

      <td>
        `experience.company.industries`
      </td>
    </tr>

    <tr>
      <td>
        `work_experience.status`
      </td>

      <td>
        `experience.employment_type`
      </td>
    </tr>

    <tr>
      <td>
        `work_experience.start`
      </td>

      <td>
        `experience.started_on`
      </td>
    </tr>

    <tr>
      <td>
        `work_experience.end`
      </td>

      <td>
        `experience.ended_on`
      </td>
    </tr>

    <tr>
      <td>
        `volunteering_experience`
      </td>

      <td>
        `volunteer_experience`
      </td>
    </tr>

    <tr>
      <td>
        `volunteering_experience.company`
      </td>

      <td>
        `volunteer_experience.organization.name`
      </td>
    </tr>

    <tr>
      <td>
        `volunteering_experience.start`
      </td>

      <td>
        `volunteer_experience.started_on`
      </td>
    </tr>

    <tr>
      <td>
        `volunteering_experience.end`
      </td>

      <td>
        `volunteer_experience.ended_on`
      </td>
    </tr>

    <tr>
      <td>
        `projects.start`
      </td>

      <td>
        `projects.started_on`
      </td>
    </tr>

    <tr>
      <td>
        `projects.end`
      </td>

      <td>
        `projects.ended_on`
      </td>
    </tr>

    <tr>
      <td>
        `recommendations.received.actor`  
        `recommendations.given.actor`
      </td>

      <td>
        `user` (changed to **User** object)
      </td>
    </tr>

    <tr>
      <td>
        `education.school`
      </td>

      <td>
        `education.school.name`
      </td>
    </tr>

    <tr>
      <td>
        `education.school_id`
      </td>

      <td>
        `education.school.id`
      </td>
    </tr>

    <tr>
      <td>
        `education.school_url`
      </td>

      <td>
        `education.school.profile_url`
      </td>
    </tr>

    <tr>
      <td>
        `education.school_picture_url`
      </td>

      <td>
        `education.school.picture_url`
      </td>
    </tr>

    <tr>
      <td>
        `education.field_of_study`
      </td>

      <td>
        `education.fields_of_study` (changed to string array)
      </td>
    </tr>

    <tr>
      <td>
        `education.start`
      </td>

      <td>
        `education.started_on`
      </td>
    </tr>

    <tr>
      <td>
        `education.end`
      </td>

      <td>
        `education.ended_on`
      </td>
    </tr>

    <tr>
      <td>
        `languages.name`
      </td>

      <td>
        `languages.language`
      </td>
    </tr>

    <tr>
      <td>
        `certifications.name`
      </td>

      <td>
        `certifications.title`
      </td>
    </tr>

    <tr>
      <td>
        `certifications.organization`
      </td>

      <td>
        `certifications.organization.name`
      </td>
    </tr>

    <tr>
      <td>
        `certifications.url`
      </td>

      <td>
        `certifications.url`
      </td>
    </tr>

    <tr>
      <td>
        `work_experience_total_count`  
        `education_total_count`  
        `volunteering_experience_total_count`  
        `skills_total_count`  
        `languages_total_count`  
        `certifications_total_count`  
        `projects_total_count`  
        `recommendations.received_total_count`  
        `recommendations.given_total_count`
      </td>

      <td>
        **Removed as not relevant.**
      </td>
    </tr>
  </tbody>
</Table>

<br />

***

## UserRelation

| UserRelation fields   | User fields                    |
| :-------------------- | :----------------------------- |
| `first_name`          | `user.display_name`            |
| `last_name`           | `user.display_name`            |
| `headline`            | `user.description`             |
| `public_identifier`   | `user.public_identifier`       |
| `public_profile_url`  | `user.profile_url`             |
| `member_id`           | Renamed to `id`.               |
| `member_urn`          | **Removed.**                   |
| `connection_urn`      | **Removed, use `id` instead.** |
| `profile_picture_url` | `user.public_picture_url`      |

<br />

### UserRelationsList

The **UserRelationsList** object does not exist anymore. [List all User's Relations](https://developer.unipile.com/v2.0/reference/getuserrelations)  now returns:

* An array of **UserRelation** objects as `data`.
* Property `cursor` is renamed to `next_cursor`.

<br />

***

## UserFollower object

The **UserFollower** object does not exist anymore. It is now a **User** object.

<br />

### UserFollowersList

The **UserFollowersList** object does not exist anymore. [List all User Followers](https://developer.unipile.com/v2.0/reference/listuserfollowers)  now returns:

* An array of **User** objects as `data`.
* Property `cursor` is renamed to `next_cursor`.