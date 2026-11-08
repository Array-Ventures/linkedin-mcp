---
updatedAt: 2026-11-04T09:39:47.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Retrieve profile views

Retrieve LinkedIn profile visitors and analytics.

Use [List Profile Views](https://developer.unipile.com/v2.0/reference/getprofileviews) to retrieve recent visitors to the connected account's profile and associated analytics. This method retrieves visitors; [Visit a User Profile](https://developer.unipile.com/v2.0/reference/visituserprofile) records a visit to someone else's profile.

```node
const response = await fetch(
  "https://api.unipile.com/v2/acc_123456789/linkedin/analytics/profile-views?date_range=90&sort_by=DATE&limit=10&offset=0",
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
    "https://api.unipile.com/v2/acc_123456789/linkedin/analytics/profile-views?date_range=90&sort_by=DATE&limit=10&offset=0",
    headers={"X-API-KEY": "YOUR_API_KEY"},
    timeout=30,
)
response.raise_for_status()
data = response.json()
```
```curl
curl --request GET \
  --url "https://api.unipile.com/v2/acc_123456789/linkedin/analytics/profile-views?date_range=90&sort_by=DATE&limit=10&offset=0" \
  --header 'X-API-KEY: YOUR_API_KEY'
```

## Filter and paginate

Use offset-based pagination with `offset` and `limit` (1–100). `sort_by` accepts `DATE` or `RELEVANCE`; `date_range` accepts 14, 28, 90, or 365 days. Optional `industry`, `company`, and `location` filters use IDs resolved through [List Classic Search Parameters](https://developer.unipile.com/v2.0/reference/getclassicsearchparameters). Request analytics sections with `details_sections`: `COMPANIES`, `INDUSTRIES`, or `LOCATIONS`.

Non-premium accounts receive limited data and search filters have no effect. Treat the response as the information LinkedIn makes visible to the connected account; do not assume every visitor's identity is available.