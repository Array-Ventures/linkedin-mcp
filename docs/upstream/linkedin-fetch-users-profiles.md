---
updatedAt: 2026-11-04T09:39:47.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Profiles & Relations

Learn how to fetch complete user profiles on LinkedIn using Unipile API.

# Get basic user profile

To get the profile of a user, use the [Get a User Profile](https://developer.unipile.com/v2.0/reference/getuserprofile) endpoint, specifying the ID of the user.

You may also want to select a `variant`, which allows you to specify the product with which you want to retrieve the profile.

> 📘 Note about variants
>
> On LinkedIn, there are 3 variants of the same profile :
>
> * `linkedin_classic` : The profile is from **Classic**. Specify the additional sections to be retrieved beyond the basic profile in the parameter `with_sections`. In this variant, the user ID can be either a system ID (`ACo...`) or a public identifier (e.g. `johndoe`  in `www.linkedin.com/in/johndoe/`).
> * `linkedin_recruiter` : The profile is from **Recruiter**. All sections are included, with additional data specific to the product (e.g. tags, notes, recruiting activities).
> * `linkedin_sales_navigator` : The profile is from **Sales Navigator**. All sections are included, with additional data specific to the product (e.g. lists).

> 📘 Note about sections
>
> On LinkedIn Classic, retrieving a large number of profile sections may result in multiple consecutive requests. As a result, **LinkedIn may throttle those section requests** if they are made in excess over a short period of time.
>
> The `with_sections` parameter allows you to specify the sections that should be included. In general, it is recommended to include only the necessary sections. To further reduce the risk of having your requests throttled, you can add the `_preview` suffix to the least critical sections. This method returns only the first entries of a section, exactly as they are presented on a LinkedIn profile.
>
> You can also combine sections: for example, `["linkedin_*_preview", "linkedin_experience", "linkedin_skills"]` will return all sections in preview mode except experience and skills in full.

## Retrieve interests

For Classic profiles, add `linkedin_interests` to `with_sections` to retrieve the profile's interests. The data is returned in `specifics.interests` and can include followed top voices, companies, schools, newsletters, and groups.

As with every optional Classic section, request it only when needed. You can use `linkedin_interests_preview` when a preview is sufficient.

<Callout icon="❗️" theme="error">
  The `with_sections` parameter has no effect on **Recruiter** and **Sales Navigator**.
</Callout>

```node
const { data } = await usersApi.getUserProfile({
  path: {
    account_id: "acc_123456789",
    user_id: "user_id",
  },
  query: {
    with_sections: ['linkedin_*_preview', 'linkedin_experience', 'linkedin_skills', 'linkedin_interests']
  },
});
```
```python
profile = users_api.get_user_profile(
    "user_id",
    "acc_123456789",
    with_sections=["linkedin_*_preview", "linkedin_experience", "linkedin_skills", "linkedin_interests"],
)
```
```curl
curl --request GET \
     --url https://api.unipile.com/v2/account_id/users/user_id?with_sections=linkedin_*_preview&with_sections=linkedin_experience&with_sections=linkedin_skills&with_sections=linkedin_interests \
     --header 'accept: application/json'
```

<br />

# Notify profile visit

In the LinkedIn application, visiting a profile triggers a notification to the user whose profile was visited (provided that the option has been activated).

**This is not an automatic action**.

To reproduce this behavious, you will first need to retrieve the value of the field `notify_visit_token` from the result of the [Get a User Profile](https://developer.unipile.com/v2.0/reference/getuserprofile) endpoint. Then use the [Report a Profile Visit](https://developer.unipile.com/v2.0/reference/visituserprofile) endpoint, specifying the value of the token.

> 👍 Recommendation
>
> In order to maintain a natural LinkedIn-like experience, ensure that the use of this method is immediately subsequent to the profile visit.

```node
await usersApi.visitUserProfile({
  path: {
    account_id: "acc_123456789",
  },
  query: {
    token: "token",
  },
});
```
```python
users_api.visit_user_profile("token", "acc_123456789")
```
```curl
curl --request POST \
     --url https://api.unipile.com/v2/account_id/users/visit-profile?token=abcdef1234567 \
     --header 'accept: application/json'
```

<br />

# List relations of a user

To get a list of a user's relations, use the [List Relations of a User](https://developer.unipile.com/v2.0/reference/getuserrelations) endpoint, specifying the ID of the user in question.

> 📘 Specific use cases
>
> * To list the relations of your own account, set `user_id` to `me`.
> * The `search` field can be used to filter users by name.
> * Pagination on this method uses exclusively the `cursor` parameter.

```node
const { data } = await usersApi.getUserRelations({
  path: {
    account_id: "acc_123456789",
    user_id: "user_id",
  },
});
```
```python
relations = users_api.get_user_relations("user_id", "acc_123456789")
```
```curl
curl --request GET \
     --url https://api.unipile.com/v2/account_id/users/user_id/relations \
     --header 'accept: application/json'
```

<br />

# List followers of a user

To get a list of a user's followers, use the [List Followers of a User](https://developer.unipile.com/v2.0/reference/listuserfollowers) endpoint, specifying the ID of the user in question.

> 📘 Specific use cases
>
> * To list the followers of your own account, set `user_id` to `me`.
> * Pagination on this method uses exclusively the `offset` parameter.

```node
const { data } = await usersApi.listUserFollowers({
  path: {
    account_id: "acc_123456789",
    user_id: "user_id",
  },
});
```
```python
followers = users_api.list_user_followers("user_id", "acc_123456789")
```
```curl
curl --request GET \
     --url https://api.unipile.com/v2/account_id/users/user_id/followers \
     --header 'accept: application/json'
```

<br />

# List users followed by a user

<Callout icon="❗️" theme="error">
  You cannot list users followed by someone else then you.
</Callout>

To get a list of your own account's following, use the [List Users followed by a User](https://developer.unipile.com/v2.0/reference/listuserfollowing) endpoint, specifying `me` in the `user_id` parameter.

> 📘 Specific use cases
>
> * Pagination on this endpoint uses exclusively the `offset` parameter.

```node
const { data } = await usersApi.listUserFollowing({
  path: {
    account_id: "acc_123456789",
    user_id: "me",
  },
});
```
```python
following = users_api.list_user_following("me", "acc_123456789")
```
```curl
curl --request GET \
     --url https://api.unipile.com/v2/account_id/users/user_id/followings \
     --header 'accept: application/json'
```

# Read profile verification details

A `linkedin_classic` profile can include `specifics.verifications` with the verification categories and details visible on LinkedIn. Labels and relative dates are localized to the connected account. Treat this field as optional; do not assume that a verified profile always exposes a complete set of verification details.

```node
const { data } = await usersApi.getUserProfile({
  path: {
    account_id: "acc_123456789",
    user_id: "ACo_MEMBER_ID",
  },
  query: {
    variant: "linkedin_classic",
  },
});
```
```python
data = users_api.get_user_profile(
    account_id='acc_123456789',
    user_id='ACo_MEMBER_ID',
    variant='linkedin_classic',
)
```
```curl
curl --request GET \
  --url "https://api.unipile.com/v2/acc_123456789/users/ACo_MEMBER_ID?variant=linkedin_classic" \
  --header 'X-API-KEY: YOUR_API_KEY'
```

# Endorse a skill

Use [Endorse a Member Skill](https://developer.unipile.com/v2.0/reference/endorseclassicmemberskill) to endorse a skill on a LinkedIn member profile. Resolve the member and skill identifiers from the provider data first, then supply the parameters required by the reference. Availability remains subject to LinkedIn's permissions for the connected member.

```node
const { data } = await linkedInApi.endorseClassicMemberSkill({
  path: {
    account_id: "acc_123456789",
    member_id: "ACo_MEMBER_ID",
  },
  body: {
    skill_id: "skill_endorsement_id",
  },
});
```
```python
data = linked_in_api.endorse_classic_member_skill(
    account_id='acc_123456789',
    member_id='ACo_MEMBER_ID',
    endorse_classic_member_skill_request={
        "skill_id": 'skill_endorsement_id'
    },
)
```
```curl
curl --request POST \
  --url "https://api.unipile.com/v2/acc_123456789/linkedin/member/ACo_MEMBER_ID/endorse-skill" \
  --header 'X-API-KEY: YOUR_API_KEY' \
  --header 'Content-Type: application/json' \
  --data '{
  "skill_id": "skill_endorsement_id"
}'
```