---
updatedAt: 2026-11-04T09:32:47.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Email API

This guide will help you migrate the Emailing features of your application to API v2.

# Methods changes

For each endpoint in the v1 API, here are the corresponding endpoints in the v2 API, along with the necessary modifications to achieve the same results.

> ❗️ Specifying the target account
>
> The `account_id` param, previously available either in the query params or in the body, is removed from all methods. The `account_id` must now be consistently included in the path params.

<br />

## List all emails

`GET /v1/emails`

* For Google and Outlook, use `GET /v2/:account_id/emails` [List all Emails](https://developer.unipile.com/v2.0/reference/getemailslist).
* ⚠️ For IMAP, [Initial Sync](https://developer.unipile.com/v2.0/docs/initial-sync) must be enabled to use this route, otherwise use `GET /v2/:account_id/folders/:folder_id/emails` [List folder Emails](https://developer.unipile.com/v2.0/reference/getfolderemailslist).
* Query param `account_id` is removed
  * Specify in the path param
* Query param `folder` is removed
  * Use `GET /v2/:account_id/folders/:folder_id/emails` [List folder Emails](https://developer.unipile.com/v2.0/reference/getfolderemailslist) to get emails from a specific folder
* Query param `role` is removed
  * Sync folders list on your side and use `folder_id` in [List folder Emails](https://developer.unipile.com/v2.0/reference/getfolderemailslist)
* Query param `include_headers` is removed
  * Headers are always present
* Response shape has changed (see Email object changes)

<br />

## Send an email

`POST /v1/email`

* Use `POST /v2/:account_id/emails/send` [Send an Email](https://developer.unipile.com/v2.0/reference/sendemail)
* Content-Type have changed from `multipart/form-data` to `application/json`
* Body param `reply_to` changed
  * `reply_to` now sets the standard `Reply-To` email header and accepts an array of attendees.
  * To reply inside an existing conversation, use `reply_to_message_id`. For Gmail and Outlook, provide the provider ID of the email message you're replying to (`id` in the Email object). For IMAP, provide its RFC822 `Message-ID` header.
* Body param `account_id` is removed
  * Specify in the path param
* Body param `attachments`has changed
  * Specify an array of objects with `filename`, `content_type` and `content` as base64
* Body param `body` is removed
  * Use `plain_text` and `html`

<br />

## Retrieve an email

`GET /v1/emails/:email_id`

* Use `GET /v2/:account_id/emails/:email_id` [Get an Email](https://developer.unipile.com/v2.0/reference/getemail)
* Query param `account_id` is removed
  * Specify in the path param
* Query param `include_headers` is removed
  * Headers are always present
* Response shape has changed (see Email object changes)

<br />

## Delete an email

`DELETE /v1/emails/:email_id`

* Use `DELETE /v2/:account_id/emails/:email_id` [Trash an Email](https://developer.unipile.com/v2.0/reference/trashemail)
* Query param `account_id` is removed
  * Specify in the path param
* Path param email\_id changed
  * Use the `id` of the Email object

<br />

## Update an email

`PUT /v1/emails/:email_id`

* Route is removed
  * Use `POST /v2/:account_id/emails/:email_id/read` [Read an Email](https://developer.unipile.com/v2.0/reference/reademail) to mark email as read
  * Use `POST /v2/:account_id/emails/:email_id/unread` [Unread an Email](https://developer.unipile.com/v2.0/reference/unreademail) to mark email as unread
  * Use `POST /v2/:account_id/emails/:email_id/modify` [Modify an Email](https://developer.unipile.com/v2.0/reference/modifyemail) to move folders, update labels, or set provider-specific properties
* Body param `data` (partial Mail object) is removed
  * Use `folders_ids` to move the email to specific folder(s)
  * Use `specifics.{provider}` for provider-specific properties (see below)
* Body param `folders_ids` is **optional**
  * Required for IMAP. If omitted, the email is not moved — useful when only updating provider-specific properties (e.g. categories)
* Body param `categories` moved to `specifics.outlook.categories`
  * Previously: `{ categories: ["Project X"] }`
  * Now: `{ specifics: { outlook: { categories: ["Project X"] } } }`
  * Same behavior: categories that don't exist yet in the account's master categories are automatically created with the color `"None"`
* Move and categories can now be combined in a single request
  * Previously required separate calls (`move` + `updateMail`)
  * Now: `{ folders_ids: ["folder_id"], specifics: { outlook: { categories: ["Urgent"] } } }`

<br />

## Retrieve an attachment from an email

`GET /v1/emails/:email_id/attachments/:attachment_id`

* Use `GET /v2/:account_id/emails/:email_id/attachments/:attachment_id` [Get an Email Attachment](https://developer.unipile.com/v2.0/reference/getattachment1)
* Query param `account_id` is removed
  * Specify in the path param

<br />

## List all folders

`GET /v1/folders`

* Use `GET /v2/:account_id/folders` [List all Folders](https://developer.unipile.com/v2.0/reference/getfolderslist)
* Query param `account_id` is removed
  * Specify in the path param
* Route is now paginated and don't return all folders
* Response shape has changed (see Folder object changes)

<br />

## Retrieve a folder

`GET /folders/:folder_id`

* Use `GET /v2/:account_id/folders/:folder_id` [Get a Folder](https://developer.unipile.com/v2.0/reference/getfolder)
* Path param `folder_id` is changed
  * Use the `id` of the Folder object (must not be a Unipile ID)
* Query param `account_id` is removed
  * Specify in the path param
* Response shape has changed (see Folder object changes)

<br />

## List all Contacts

`GET /contacts`

* Response shape has changed (see Contact object changes)

<br />

***

# Email object changes

| v1 field      | v2 change                                                 |
| ------------- | --------------------------------------------------------- |
| `id`          | This field value is now the value of the v1 `provider_id` |
| `kind`        | Removed                                                   |
| `type`        | Removed                                                   |
| `role`        | Removed, refer to the folders                             |
| `folders`     | This is now an array of Folder object `id`.               |
| `folderIds`   | Removed                                                   |
| `read_date`   | Removed, use `is_unread`                                  |
| `message_id`  | Removed, use headers                                      |
| `provider_id` | Renamed to `id`                                           |

<br />

***

# Folder object changed

| v1 field      | v2 change                                                                                           |
| ------------- | --------------------------------------------------------------------------------------------------- |
| `id`          | This field value is now the value of the v1 `provider_id`                                           |
| `provider_id` | Renamed to `id`                                                                                     |
| `nb_mails`    | Renamed to `total_count`                                                                            |
| `role`        | Roles now match. the Special-Use attributes. Read more in [Manage mailboxes](https://developer.unipile.com/v2.0/docs/manage-mailboxes). |

<br />

# Contact object changed

| v1 field     | v2 change                   |
| :----------- | :-------------------------- |
| `source`     | This field has been removed |
| `surname`    | Renamed to `last_name`      |
| `given_name` | Renamed to `first_name`     |
| `nickname`   | Renamed to `display_name`   |
| `birthday`   | Renamed to `birth_date`     |

<br />