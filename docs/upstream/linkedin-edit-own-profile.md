---
updatedAt: 2026-11-04T09:39:47.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Edit own profile

Learn how to edit your user profile on LinkedIn using Unipile API.

To edit your profile, use the [Update a User Profile](https://developer.unipile.com/v2.0/reference/updateuserprofile) endpoint with `me` as `user_id` and a body including the fields you wish to modify.

The `specifics` field in the body will allow you to handle LinkedIn specific components like headline, education, work experience, skills, etc.

> 📘 Note about parameters
>
> Certain filters require IDs that reference specific values, rather than the values themselves.
>
> For example, in the `location` filter, you cannot directly insert `San Francisco`, but instead you should use the corresponding city ID.
>
> In the current context, use the [List Classic Search Parameters](https://developer.unipile.com/v2.0/reference/getclassicsearchparameters) endpoint to help you find the IDs of the values you need.

```node
const { data } = await usersApi.updateUserProfile({
  path: {
    account_id: "acc_123456789",
    user_id: "me",
  },
  body: {
    location: '01234',
    specifics: {
      linkedin: {
        headline: "Master of Unipile APIs"
      }
    }
  },
});
```
```python
profile = users_api.update_user_profile(
    "me",
    "acc_123456789",
    {
        "location": "01234",
        "specifics": {
            "headline": "Master of Unipile APIs",
        },
    },
)
```
```curl
curl --request PATCH \
     --url https://api.unipile.com/v2/account_id/users/me \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --data '
{
  "location": "01234"
  "specifics": {
    "linkedin": {
      "headline": "Master of Unipile APIs"
    }
  }
}
'
```