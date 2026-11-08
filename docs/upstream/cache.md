---
updatedAt: 2026-03-18T15:03:03.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Caching

Unipile improves your application's performance and prevent hits of rate limiting by caching methods requests.  This page provides an in-depth look at Unipile caching mechanisms and the how to configure them.

# Control cache on requests

Unipile support the `Cache-Control` standard request header and few of its directives to control the caching when you make a request on Methods API.

<br />

## `no-store`

By default, every request is cached. The `no-store` request directive allows you to request that caches refrain from storing the request and corresponding response. This is useful if you don't want to store any data on Unipile's servers.

```Text HTTP
Cache-Control: no-store
```
```node
import { UnipileMessaging } from "unipile";

const key = process.env.UNIPILE_API_KEY ?? "";
const messagingApi = new UnipileMessaging({ key });

// Per request
await messagingApi.getChatsList({
  path: { account_id: "acc_123456789" },
  headers: {
    "X-API-KEY": key,
    "Cache-Control": "no-store",
  },
});

// Reuse this header object in your app if you want this behavior everywhere
const NO_STORE_HEADERS = {
  "X-API-KEY": key,
  "Cache-Control": "no-store",
};
```
```python
import os
import unipile

ACCOUNT_ID = "acc_123456789"

configuration = unipile.Configuration()
configuration.api_key["apiKey"] = os.getenv("UNIPILE_API_KEY", "")

with unipile.ApiClient(configuration) as api_client:
    messaging_api = unipile.MessagingApi(api_client)
    response = messaging_api.get_chats_list(
        ACCOUNT_ID,
        _headers={"Cache-Control": "no-store"},
    )

# Reuse this header object in your app if you want this behavior everywhere
NO_STORE_HEADERS = {"Cache-Control": "no-store"}
```

<br />

## `no-cache`

The `no-cache` request directive asks caches to validate the response with the origin server before reuse. This allow you yo request the most up-to-date data from the provider even if the cache has a fresh response.

```Text HTTP
Cache-Control: no-cache
```
```node
import { UnipileMessaging } from "unipile";

const key = process.env.UNIPILE_API_KEY ?? "";
const messagingApi = new UnipileMessaging({ key });

await messagingApi.getChatsList({
  path: { account_id: "acc_123456789" },
  headers: {
    "X-API-KEY": key,
    "Cache-Control": "no-cache",
  },
});
```
```python
import os
import unipile

ACCOUNT_ID = "acc_123456789"

configuration = unipile.Configuration()
configuration.api_key["apiKey"] = os.getenv("UNIPILE_API_KEY", "")

with unipile.ApiClient(configuration) as api_client:
    messaging_api = unipile.MessagingApi(api_client)
    response = messaging_api.get_chats_list(
        ACCOUNT_ID,
        _headers={"Cache-Control": "no-cache"},
    )
```

<br />

## `max-age`

The` max-age=N` request directive indicates that the you allows a stored response that is generated on the origin server within N seconds — where N may be any non-negative integer (including 0).

```Text HTTP
Cache-Control: max-age=10800
```
```node
import { UnipileMessaging } from "unipile";

const key = process.env.UNIPILE_API_KEY ?? "";
const messagingApi = new UnipileMessaging({ key });

await messagingApi.getChatsList({
  path: { account_id: "acc_123456789" },
  headers: {
    "X-API-KEY": key,
    "Cache-Control": "max-age=10800",
  },
});
```
```python
import os
import unipile

ACCOUNT_ID = "acc_123456789"

configuration = unipile.Configuration()
configuration.api_key["apiKey"] = os.getenv("UNIPILE_API_KEY", "")

with unipile.ApiClient(configuration) as api_client:
    messaging_api = unipile.MessagingApi(api_client)
    response = messaging_api.get_chats_list(
        ACCOUNT_ID,
        _headers={"Cache-Control": "max-age=10800"},
    )
```

In the case above, if the response with `Cache-Control: max-age=10800` was generated more than 3 hours ago (calculated from max-age), the cache couldn't reuse that response.

> Note: This is set to **1 hour by default** if not specified in the request.

<br />

***

# Caching status of responses

Unipile support standard headers to give you informations about the caching status of responses.

<br />

## `X-Cache`

The `X-Cache` response header tells you if the cache was used to produce the response payload. If the response if coming from the cache, the value of the header is `HIT`, if the response is coming from the Provider's API, the value of the header is `MISS`.

```Text HTTP
X-Cache: HIT
```
```node
import { UnipileMessaging } from "unipile";

const key = process.env.UNIPILE_API_KEY ?? "";
const messagingApi = new UnipileMessaging({ key });

const { response } = await messagingApi.getChatsList({
  path: { account_id: "acc_123456789" },
  headers: { "X-API-KEY": key },
});

console.log(response.headers.get("X-Cache")); // HIT or MISS
```
```python
import os
import unipile

ACCOUNT_ID = "acc_123456789"

configuration = unipile.Configuration()
configuration.api_key["apiKey"] = os.getenv("UNIPILE_API_KEY", "")

with unipile.ApiClient(configuration) as api_client:
    messaging_api = unipile.MessagingApi(api_client)
    response = messaging_api.get_chats_list_with_http_info(ACCOUNT_ID)

print(response.headers.get("X-Cache"))  # HIT or MISS
```

This header is not present if `no-store` directive is used in the request.

<br />

## `Age`

The `Age` response header tells you how aged is the response when it's coming from the cache.

```Text HTTP
Age: 10000
```
```node
import { UnipileMessaging } from "unipile";

const key = process.env.UNIPILE_API_KEY ?? "";
const messagingApi = new UnipileMessaging({ key });

const { response } = await messagingApi.getChatsList({
  path: { account_id: "acc_123456789" },
  headers: { "X-API-KEY": key },
});

console.log(response.headers.get("Age")); // Age in seconds
```
```python
import os
import unipile

ACCOUNT_ID = "acc_123456789"

configuration = unipile.Configuration()
configuration.api_key["apiKey"] = os.getenv("UNIPILE_API_KEY", "")

with unipile.ApiClient(configuration) as api_client:
    messaging_api = unipile.MessagingApi(api_client)
    response = messaging_api.get_chats_list_with_http_info(ACCOUNT_ID)

print(response.headers.get("Age"))  # Age in seconds
```

<br />