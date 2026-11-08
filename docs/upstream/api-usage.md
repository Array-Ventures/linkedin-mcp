---
updatedAt: 2026-10-08T11:30:23.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# API Usage

Understand general concepts, response codes, and authentication strategies.

# Base URL

The Unipile API is built on REST principles. We enforce HTTPS in every request to improve data security, integrity, and privacy. The API does not support HTTP.

All requests contain the following base URL: `https://api.unipile.com/v2`

This URL is set by default when using SDKs.

<br />

***

# Authentication

All requests must be authenticated using [API Keys](https://developer.unipile.com/v2.0/docs/api-keys).

Set your API Key in a `X-API-KEY` header or when instantiating an SDK Client:

```typescript Node.js
import { AccountsApi } from 'unipile';

const unipileAccounts = new AccountsApi({ apiKey: 'your-api-key' });
```
```curl
X-API-KEY: your-api-key
```

<Callout icon="❗️" theme="error">
  ### Application scoped keys

  When using methods, you should use API Keys belonging to the same Application as the Account you are targeting.
</Callout>

<br />

***

# Private download URLs

Some API objects provide a private download URL when a provider does not expose a public URL for a resource. Unlike fields explicitly named as public URLs, private download URLs point to Unipile API endpoints and require the same authentication as any other API request.

For example, a `User` can contain `private_picture_download_url`. This value points to [Get a User Picture](https://developer.unipile.com/v2.0/reference/getuserpicture) and must be requested with your API key in the `X-API-KEY` header:

```node
const { data: picture } = await usersApi.getUserPicture({
  path: {
    account_id: "acc_123456789",
    user_id: "user_id",
  },
});
```
```python
picture = users_api.get_user_picture(
    "user_id",
    "acc_123456789",
)
```
```curl
curl --request GET \
     --url 'https://api.unipile.com/v2/acc_123456789/users/user_id/picture' \
     --header 'X-API-KEY: your-api-key' \
     --output profile-picture
```

`private_picture_download_url` is not a public image URL and should not be used directly in an HTML `img` element or other unauthenticated client. Download the file from your backend so that the API key remains secret, then serve it to your application as appropriate.

Currently, `private_picture_download_url` is used for Telegram profile pictures. When `public_picture_url` is present instead, that field contains a public URL and does not require the authenticated download flow.

<br />

***

# Response codes

Unipile uses standard HTTP codes to indicate the success or failure of your requests.

In general, `2xx` HTTP codes correspond to success, `4xx` codes are for user-related failures, and `5xx` codes are for infrastructure issues.

Checkout [Error responses](https://developer.unipile.com/v2.0/reference/error-responses) for more informations about all error types.

<br />

***

# Rate limiting

* On Methods API, requests are rate limited at multiple levels. Learn more about [Rate Limit](https://developer.unipile.com/v2.0/reference/rate-limit)
* On Core API, endpoints does not have a rate-limit.

<br />

***

# Pagination

Methods that return a list of results are always paginated.

<br />

## Pagination method

Depending of the provider and the method, an `offset` or `cursor` value is used to request next pages:

* **Cursor-paginated** requests return a `next_cursor`. For each following page, send only that value as `cursor`; do not resend `offset` or the original filters, because the cursor normally preserves the query context. If a provider returns unexpected results, it may require the original filters alongside the cursor; in that case, resend the same filters without changing them. When `next_cursor` is omitted, there are no more pages.
* **Classic paginated** requests require the `offset` value of the next request to be incremented by the `limit` value of the previous one. Note that if `data`is an empty array, there is no more results.

<br />

## Page size

The `limit` parameter controls the maximum number of items returned in a single page.

The default value varies depending on the provider and the endpoint. Unipile uses the same page sizes as the provider’s native applications whenever possible. For example, if Instagram loads conversation lists in batches of 20 items, the default limit is set to 20. If LinkedIn loads them in batches of 25 items, the default is set to 25.

<Callout icon="❗️" theme="error">
  Some providers may technically allow higher or lower values than the default. While Unipile exposes this flexibility when supported, **overriding the default value is generally discouraged**. The default page size is usually the one used by the provider’s own applications and therefore produces the most natural request patterns.

  Unless you have a specific requirement, it is recommended to use the default limit value provided by the endpoint.
</Callout>

<br />

***

# Dates

<br />

Fields using the `date` format accept a calendar date without a time or timezone:

```text
YYYY-MM-DD
```

Example: `2026-10-08`.

The date must exist: invalid dates such as `2026-02-30` are rejected.

<br />

Fields using the `date-time` format require a date, a time including seconds, and a timezone indicator.

| Format                      | Example                     |
| --------------------------- | --------------------------- |
| UTC                         | `2026-10-08T10:00:00Z`      |
| UTC with fractional seconds | `2026-10-08T10:00:00.123Z`  |
| Positive UTC offset         | `2026-10-08T10:00:00+02:00` |
| Negative UTC offset         | `2026-10-08T10:00:00-04:00` |

Fractional seconds are optional. We recommend UTC values ending in `Z`, such as those produced by JavaScript’s `Date.toISOString()`.

Date-only values, date-times without a timezone, numeric timestamps, and localized formats such as `08/10/2026` are not accepted in `date-time` fields.

Validation also accepts lowercase `t`/`z`, a space instead of `T`, compact offsets such as `+0200`, short offsets such as `+02`, and leap seconds. Some of these variants cannot be processed by every provider; use the formats illustrated above for reliable interoperability.

<br />

## Dates in query parameters

When sending a date-time with a positive offset in a URL, encode the `+` as `%2B`:

```text
?before=2026-10-08T10:00:00%2B02:00
```

An unencoded `+` is decoded as a space and makes the value invalid. Standard URL parameter builders handle this encoding automatically. This encoding is not needed in JSON request bodies.

<br />

<br />

***

# Sending Files

<br />

By default, all endpoints use the `application/json` content type, which requires the request body to be a JSON object. When sending files (for example, `attachments` in [Send an Email](https://developer.unipile.com/v2.0/reference/sendemail)), file content must be encoded as a base64 string to fit the JSON format.

<br />

## Using application/json (base64)

Use this approach for small files. Here an example for [Send an Email](https://developer.unipile.com/v2.0/reference/sendemail) :

```curl
curl --request POST \
  --url https://api.unipile.com/v2/account_id/emails/send \
  --header 'accept: application/json' \
  --header "content-type: application/json" \
  --data '{
    "to": [{"email":"john@doe.com"}],
    "subject": "Test email",
    "plain_text": "Hello",
    "attachments": [
      {
        "filename": "file.txt",
        "content": "SGVsbG8gd29ybGQ=",
        "content_type": "text/plain"
      }
    ]
  }'
```

<br />

## Using multipart/form-data

For larger files (typically > 1MB), use `multipart/form-data`. This avoids base64 overhead and improves performance. Here an example for [Send an Email](https://developer.unipile.com/v2.0/reference/sendemail) :

```curl
curl --request POST \
  --url https://api.unipile.com/v2/account_id/emails/send \
  --header 'content-type: multipart/form-data' \
  --form 'to[0][email]=john@doe.com' \
  --form 'subject=Test email' \
  --form 'plain_text=Hello' \
  --form 'attachments[0]=@PathToFile' \
```

<br />

Using multipart/form-data is recommended for large files to reduce payload size and improve upload efficiency.

<br />

Here the list of endpoints that support multipart:

* [Start a Chat](https://developer.unipile.com/v2.0/reference/startchat)
* [Start a Chat from Inbox](https://developer.unipile.com/v2.0/reference/startchatfrominbox)
* [Send a Message](https://developer.unipile.com/v2.0/reference/sendmessage)
* [Update a User Profile](https://developer.unipile.com/v2.0/reference/updateuserprofile)
* [Send an Email](https://developer.unipile.com/v2.0/reference/sendemail)
* [Create a Draft](https://developer.unipile.com/v2.0/reference/createdraft)
* [Update a Draft](https://developer.unipile.com/v2.0/reference/updatedraft)
* [Create a Post](https://developer.unipile.com/v2.0/reference/createpost)
* [Add Comment to a Post](https://developer.unipile.com/v2.0/reference/addpostcomment)
* [Reply to a Comment](https://developer.unipile.com/v2.0/reference/replytocomment)

<br />

***

# Open API Specification

Unipile use the Open API specification. The schema is available at:

<https://api.unipile.com/v2/docs/json>

You can import it into an API platform like Postman using this URL.