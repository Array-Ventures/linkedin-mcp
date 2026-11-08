---
updatedAt: 2026-09-28T15:46:39.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Rate limit

Rate limit information is returned through response headers, allowing clients to monitor the active rate limit window and adjust request throughput accordingly.

# Headers

These headers are returned by Unipile's rate limiter. In particular, a `429` response with `type: api/too_many_requests` includes `retry-after`, which tells you when to retry. A `429` returned by a provider (`type: provider/too_many_requests`) means the provider was reached before Unipile stopped the request; it may not provide an equally reliable retry window. See [Rate Limits](https://developer.unipile.com/v2.0/docs/rate-limits) for how to handle each case.

A default rate-limit rule applies separately to every method. Selected methods can also have an additional route-specific rule; both rules use the same counting and window behavior. Each rule can have up to two independent time windows. For a request processed by Unipile's rate limiter, the headers show **one window only**: on an accepted request, the last applicable window checked; on a Unipile `429`, the first window that rejected the request. They do not identify which rule the window belongs to or report the state of the other windows. The route-specific rule is checked first, then the default rule. See [Rate Limits](https://developer.unipile.com/v2.0/docs/rate-limits) for the enforcement order and window behavior.

| Header                  | Description                                                                                                                                                  |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `x-ratelimit-limit`     | Maximum number of requests allowed during the current time window.                                                                                           |
| `x-ratelimit-remaining` | Number of requests remaining in the current time window.                                                                                                     |
| `x-ratelimit-reset`     | Number of seconds until the current time window resets.                                                                                                      |
| `retry-after`           | Number of seconds to wait before retrying a request after a rate limit has been exceeded. This header is only returned with 429 Too Many Requests responses. |

<br />

## Example

```
HTTP/1.1 200 OK

x-ratelimit-limit: 50 
x-ratelimit-remaining: 12 
x-ratelimit-reset: 24
```

In this example, for the window shown in the headers:

* The current limit is 50 requests.
* 12 requests remain available.
* The rate limit window will reset in 24 seconds.

For example, a request rejected by a window allowing 5 requests per minute could return:

```
HTTP/1.1 429 Too Many Requests
x-ratelimit-limit: 5
x-ratelimit-remaining: 0
x-ratelimit-reset: 18
retry-after: 18
```

This means that the rejecting window resets in 18 seconds. The headers do not say which rule it belongs to, or whether another window will reject a later retry.

<br />

<br />

***

# Related Documentation

For details about rate limit policies, quotas, provider-specific restrictions, and enforcement rules, see the [Rate Limits](https://developer.unipile.com/v2.0/docs/rate-limits) guide.

<br />