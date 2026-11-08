---
updatedAt: 2026-11-04T09:39:47.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Set presence indicator

Learn how to set presence indicators on LinkedIn using Unipile API.

On most instant messaging services, users can choose their level of visibility to others. LinkedIn allows the following indicators :

* `online` : The user is available to all.
* `restricted_online`: The user is available to his/her relations only.
* `offline`: The user is not available.

<br />

To set the presence indicator of the current user, use the [Set Presence](https://developer.unipile.com/v2.0/reference/setpresence) endpoint, specifying the appropriate indicator.

```node
await messagingApi.setPresence({
  path: {
    account_id: "acc_123456789",
  },
  body: {
    presence: "offline",
  },
});
```
```python
messaging_api.set_presence(
    "acc_123456789",
    {"presence": "offline"},
)
```
```curl
curl --request POST \
     --url https://api.unipile.com/v2/account_id/presence \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --data '{"presence":"offline"}'
```

# Read another user's presence

Use [Get a User Presence](https://developer.unipile.com/v2.0/reference/getuserpresence) with the provider user ID to retrieve current presence. This differs from [Set Presence](https://developer.unipile.com/v2.0/reference/setpresence), which publishes the connected account's own presence. Handle `unknown` when the provider shares no presence information.

Instagram and WhatsApp do not report the account owner's presence. Instagram only shares another user's presence when the connected account shares its own activity status. Visibility also depends on provider privacy settings.

```node
const response = await fetch(
  "https://api.unipile.com/v2/acc_123456789/users/user_id/presence",
  {
    method: "GET",
    headers: {
      "X-API-KEY": "YOUR_API_KEY",
    },
  },
);
if (!response.ok) throw new Error(`Request failed: ${response.status}`);
const data = await response.json();
```
```python
import requests

response = requests.get(
    "https://api.unipile.com/v2/acc_123456789/users/user_id/presence",
    headers={"X-API-KEY": "YOUR_API_KEY"},
    timeout=30,
)
response.raise_for_status()
data = response.json()
```
```curl
curl --request GET \
  --url "https://api.unipile.com/v2/acc_123456789/users/user_id/presence" \
  --header 'X-API-KEY: YOUR_API_KEY'
```