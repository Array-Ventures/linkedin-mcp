---
updatedAt: 2026-11-04T09:32:47.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Migrate your codebase

# Architecture Evolution

The V2 architecture has evolved significantly, and there are a few key concepts to understand before diving into the codebase.

<br />

## From pre-synchronization to on-demand retrieval

One of the biggest architectural changes between V1 and V2 is how data is made available.

In V1, Unipile generally synchronized large amounts of historical data when an account was linked. This synchronization could take some time, but once completed, most requests were served directly from Unipile’s infrastructure.

In V2, data is retrieved on demand whenever possible. This allows accounts to become available much faster and avoids lengthy synchronization phases before an account can be used.

Some providers still require an initial synchronization phase (such as WhatsApp), while others may perform partial synchronizations depending on provider constraints. However, the overall architecture now favors on-demand retrieval rather than preloading large amounts of data.

<br />

### Does V2 send more requests to providers?

Not necessarily.

Here, a **provider request** means an outbound request made by Unipile to a provider such as LinkedIn, WhatsApp, Gmail, or Outlook. It is not the same as an API request made by your application to a Unipile method: thanks to caching, calling a Unipile method does not always result in a request to the provider.

In V1, Unipile automatically synchronized large amounts of historical data when an account was linked. While this reduced the need for provider requests later on, it also meant that many requests were performed upfront to retrieve data that might never be used by the consuming application.

In V2, this responsibility is shifted. Instead of preloading large amounts of data by default, data is retrieved when it is actually needed.

As a result, V2 does not systematically send more or fewer requests to providers than V1. The total may be lower, higher, or similar depending on which data your application accesses and how often cached data can be reused. Applications that only access a subset of the available data often benefit from fewer unnecessary provider requests overall.

To ensure this model remains efficient and safe, V2 introduces:

* **[Caching](https://developer.unipile.com/v2.0/reference/cache)**: Retrieved data is automatically cached by Unipile, reducing repeated provider requests.
* **[Rate limiting](https://developer.unipile.com/v2.0/reference/rate-limit)**: Unipile automatically enforces provider-safe limits to protect connected accounts.

This allows applications to access data on demand while maintaining account safety and avoiding most of the drawbacks traditionally associated with direct provider access.

<br />

### Can I call V2 methods as often as I called V1 methods?

It depends on how the responses are served. An API request to a V2 method and a request to the provider are not equivalent:

* If the response is available in Unipile's cache, it is returned without contacting the provider. Repeated method calls can therefore behave much like reads from the synchronized data available in V1.
* If the response is not cached, or the cache must be refreshed because the data has changed or expired, Unipile may need to contact the provider.
* If too many provider requests would be required, Unipile's rate limiter may return a `429 api/too_many_requests` response before the request reaches the provider, protecting the connected account.

You can therefore keep a method-call volume similar to V1 when the cache serves most responses. However, you should not assume that every V2 method call retrieves fresh data from the provider or that every cache miss can be served immediately. Design your application to reuse cached responses when appropriate and to handle `429` responses by respecting the `retry-after` header.

In short, there is no fixed one-to-one ratio between V2 method calls and provider requests. The effective volume depends on cache availability, data freshness, and provider-safe rate limits.

<br />

### Benefits of the new architecture

* Accounts become available faster after linking.
* No need to wait for large historical synchronizations before using an account.
* Reduced infrastructure costs and synchronization delays.
* Better scalability for large accounts.
* Account safety remains protected through caching and rate limiting.

<br />

<br />

***

# API Overall changes

* **Base URL:** The DSN is no longer in use.
  * Make sure to use `api.unipile.com/v2` as the base URL.
* **Listing Routes:** Routes for listing are no longer unified across accounts.
  * Make sure to take this in account in your app.
* **Pagination**: All routes for listing support pagination, but with offset/limit or cursor depending on the provider.
  * Make sure to update requests to listing routes that have been updated in the following list.
* **Unipile IDs and Provider IDs:** The distinction between "Provider" IDs and "Unipile" IDs has been removed. There is no more Unipile IDs, now, all IDs are "Provider" IDs.
  * Make sure your app is aware of those new ids.
* **Account and Webhook IDs**: Accounts, Webhook (basically every data not from a Provider) ids has changed format. They now start with `acc_`, `we_`, etc....
  * Make sure your app is aware of those new ids.
* **Target Accounts:** Previously, some endpoints were used to retrieve data across all connected accounts (listing). Now, each route retrieve the data for a single account. The ID of the targeted account is in the path of every endpoint. Therefore, every body and query params like `account_id` or `account_type` have been removed, and every method route starts with `/v2/:account_id/...`
* **Route Consistency:** Routes have been rewritten for consistency across the entire Unipile API.
  * Make sure to update requests to routes that have been removed or changed in the following list.
* **Requests and Responses:** Request parameters and response data have been updated to fix naming inconsistencies, improving efficiency for developers and reflecting the aforementioned changes.
  * Make sure to update requests to routes with updated params in the following list
* **Objects schema changes**: Objects shape have been rewritten for consistency and to give more informations. See Data Object Changes section below.
  * Make sure your app is aware of new data shapes.
* **Attachments**: All methods accepting files now use `application/json` and a base64 format to describe the file content.
  * Make sure to update those requests with the write Content-Type and to parse attachments as base64

<br />

***

# Next steps

<Cards>
  <Card title="Accounts & Authentication" href="https://developer.unipile.com/v2.0/docs/migration-auth-and-accounts">

  </Card>

  <Card title="Messaging API" href="https://developer.unipile.com/v2.0/docs/migration-messaging-api">

  </Card>

  <Card title="Email API" href="https://developer.unipile.com/v2.0/docs/migration-emails-api">

  </Card>

  <Card title="Calendar API" href="https://developer.unipile.com/v2.0/docs/migration-calendar-api">

  </Card>

  <Card title="Social API" href="https://developer.unipile.com/v2.0/docs/migration-posts-api">

  </Card>

  <Card title="Users API" href="https://developer.unipile.com/v2.0/docs/migration-users-api">

  </Card>

  <Card title="LinkedIn API" href="https://developer.unipile.com/v2.0/docs/migration-linkedin-api">

  </Card>

  <Card title="Webhooks" href="https://developer.unipile.com/v2.0/docs/migration-webhooks">

  </Card>
</Cards>

<br />