---
updatedAt: 2026-11-04T09:39:47.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Search users

Learn how to search for users on LinkedIn using Unipile API.

Whether you are using **LinkedIn Classic**, **Recruiter**, or **Sales Navigator**, Unipile offers two methods tu run a search :

* **With filters** : you provide any combination of parameters directly in the method body. E.g. : location, company, industry, etc.
* **From URL** : you provide the URL of a LinkedIn native search so the filters can be automatically infered.

<br />

<Callout icon="📘" theme="info">
  ### Note about Search Parameters

  Many of the search filters on LinkedIn work with IDs that reference parameters, rather than the parameters themselves.

  For example, in the `location` filter, you cannot directly insert `San Francisco`, but instead you should use the corresponding city ID.

  Each LinkedIn product has an associated endpoint on Unipile to help you find the IDs of the parameters you need:

  - **Classic** : [List Classic Search Parameters](https://developer.unipile.com/v2.0/reference/getclassicsearchparameters)
  - **Recruiter** : [List Recruiter Search Parameters](https://developer.unipile.com/v2.0/reference/getrecruitersearchparameters)
  - **Sales Navigator** : [List Sales Navigator Search Parameters](https://developer.unipile.com/v2.0/reference/getsalessearchparameters)
</Callout>

<Callout icon="📘" theme="info">
  ### Note about pagination

  Pagination depends on the LinkedIn product. Classic people search uses cursor-based pagination: omit `cursor` on
  the first request, then pass the response's `next_cursor` as `?cursor=<next_cursor>` while keeping the same request
  body. Stop when `next_cursor` is absent. `offset` and `limit` are not supported for Classic people search.
  Recruiter and Sales Navigator people searches remain offset-based.
</Callout>

<br />

# Classic Search

In LinkedIn Classic lingo, users are referred to as **people**.

## Search with filters

To get a list of people search results with filters, use the [Perform People Search](https://developer.unipile.com/v2.0/reference/performclassicpeoplesearch) endpoint with a parameters body.

```node
const { data } = await linkedInApi.performClassicPeopleSearch({
  path: {
    account_id: "acc_123456789",
  },
  body: {
    keywords: 'Product manager',
    location: ["01234", "56789"]
  },
});
```
```python
people = linked_in_api.perform_classic_people_search(
    "acc_123456789",
    perform_classic_people_search_request={
        "keywords": "Product manager",
        "location": ["01234", "56789"],
    },
)
```
```curl
curl --request POST \
     --url https://api.unipile.com/v2/account_id/linkedin/search/people \
     --header 'accept: application/json'  
     --data '
{
   "keywords": "Product manager",
   "location": ["01234", "56789"]
}'
```

## Search from URL

For a URL to be considered valid in the context of a people search, it must match the following pattern : `https://www.linkedin.com/search/results/people`.

To get a list of people search results out of a URL, use [Perform Classic Search from URL](https://developer.unipile.com/v2.0/reference/performclassicsearchfromurl).

Searches created from a people URL use the same cursor-based pagination as Classic people search.

```node
const { data } = await linkedInApi.performClassicSearchFromUrl({
  path: {
    account_id: "acc_123456789",
  },
  body: {
    url: "https://www.linkedin.com/search/results/people?[...]",
  },
});
```
```python
people = linked_in_api.perform_classic_search_from_url(
    "acc_123456789",
    {"url": "https://www.linkedin.com/search/results/people?[...]"},
)
```
```curl
curl --request POST \
     --url https://api.unipile.com/v2/account_id/linkedin/search \
     --header 'accept: application/json'  
     --data '
{
   "url": "https://www.linkedin.com/search/results/people?[...]"
}'
```

<br />

# Recruiter Search

In LinkedIn Recruiter lingo, users are referred to as **candidates**.

<Callout icon="📘" theme="info">
  ### Notes about search contexts

  There are multiple contexts on Recruiter where you can run searches, depending on whether the candidates are already **part of a Project** (saved, contacted, applied...) or not.

  This guide will cover 2 of these contexts :

  - Search from **General engine** (out of a Project)
  - Search from the **Recruiter search channel** of a Project's Talent pool
</Callout>

## Search with filters

To get a list of candidates search results with filters, use the [Perform People Search](https://developer.unipile.com/v2.0/reference/performrecruiterpeoplesearch) endpoint with a parameters body.

```node
const { data } = await linkedInApi.performRecruiterPeopleSearch({
  path: {
    account_id: "acc_123456789",
  },
  body: {
    keywords: 'Developer',
    skills: [
     { name: 'Typescript' },
     { name: 'Node.js' },
    ]
  },
});
```
```python
candidates = linked_in_api.perform_recruiter_people_search(
    "acc_123456789",
    perform_recruiter_people_search_request={
        "keywords": "Developer",
        "skills": [{"name": "Typescript"}, {"name": "Node.js"}],
    },
)
```
```curl
curl --request POST \
     --url https://api.unipile.com/v2/account_id/linkedin/recruiter/search/people \
     --header 'accept: application/json'  
     --data '
{
   "keywords": "Developer",
   "skills": [
      { "name": "Typescript" },
      { "name": "Node.js" }
   ]
}'
```

Now if you need to run the search from the **Recruiter search channel** of a Project's Talent pool, you will have to retrieve the ID of the relative project first. Use the [List Recruiter Hiring Projects](https://developer.unipile.com/v2.0/reference/getrecruiterhiringprojectlist) endpoint to list all the projects available on your account.

<Callout icon="📘" theme="info">
  ### Note about Channels

  Similar to the LinkedIn application, a **Project** has a **Talent Pool** composed of different **Channels** that allow for segmenting access to candidate data: `RECRUITER_SEARCH`, `INTERNAL_CANDIDATES`, `JOB_POSTING`, etc.

  To determine the available channels within a specific project, use the [Get a Project](https://developer.unipile.com/v2.0/reference/getrecruiterhiringproject) endpoint.
</Callout>

Then to get a list of candidates search results within an existing project, use the [Perform Recruiter People Search From Talent Pool](https://developer.unipile.com/v2.0/reference/performrecruiterpeoplesearchfromtalentpool) endpoint, specifying the ID of the project and a parameters body including the targeted Channel under `channel_id`.

```node
const { data } = await linkedInApi.performRecruiterPeopleSearchFromTalentPool({
  path: {
    account_id: "acc_123456789",
    project_id: "project_id",
  },
  body: {
    channel_id: 'channel_id',
    keywords: 'Developer',
    skills: [
     { name: 'Typescript' },
     { name: 'Node.js' },
    ]
  },
});
```
```python
candidates = linked_in_api.perform_recruiter_people_search_from_talent_pool(
    "project_id",
    "acc_123456789",
    perform_recruiter_people_search_from_talent_pool_request={
        "channel_id": "channel_id",
        "keywords": "Developer",
        "skills": [{"name": "Typescript"}, {"name": "Node.js"}],
    },
)
```
```curl
curl --request POST \
     --url https://api.unipile.com/v2/account_id/linkedin/recruiter/projects/project_id/talent-pool/search \
     --header 'accept: application/json'  
     --data '
{
   "channel_id": "channel_id",
   "keywords": "Developer",
   "skills": [
      { "name": "Typescript" },
      { "name": "Node.js" }
   ]
}'
```

## Search from URL

For a URL to be considered valid in the context of a candidates search, it must match one of the following patterns:

* `https://www.linkedin.com/talent/search` : from general search engine.
* `https://www.linkedin.com/talent/hire/project_id/discover/recruiterSearch` : from Recruiter search channel of a Project's Talent pool.
* `https://www.linkedin.com/talent/hire/project_id/discover/applicants` : from Applicants channel of a Project's Talent pool.
* `https://www.linkedin.com/talent/hire/project_id/manage/stage_id` : from a given Stage of a Project's Pipeline.

To get a list of candidates search results out of a URL, use [Perform Recruiter Search from URL](https://developer.unipile.com/v2.0/reference/performrecruitersearchfromurl).

```node
const { data } = await linkedInApi.performRecruiterSearchFromUrl({
  path: {
    account_id: "acc_123456789",
  },
  body: {
    url: "https://www.linkedin.com/talent/search?[...]",
  },
});
```
```python
candidates = linked_in_api.perform_recruiter_search_from_url(
    "acc_123456789",
    {"url": "https://www.linkedin.com/talent/search?[...]"},
)
```
```curl
curl --request POST \
     --url https://api.unipile.com/v2/account_id/linkedin/recruiter/search \
     --header 'accept: application/json'  
     --data '
{
   "url": "https://www.linkedin.com/talent/search?[...]"
}'
```

<br />

# Sales Navigator Search

In LinkedIn Sales Navigator lingo, users are referred to as **leads**.

## Search with filters

To get a list of leads search results with filters, use the [Perform Leads Search](https://developer.unipile.com/v2.0/reference/performsalespeoplesearch) endpoint with a parameters body.

```node
const { data } = await linkedInApi.performSalesPeopleSearch({
  path: {
    account_id: "acc_123456789",
  },
  body: {
    keywords: 'CEO',
    seniority: {
     include: ['OWNER/PARTNER', 'DIRECTOR']
    }
  },
});
```
```python
leads = linked_in_api.perform_sales_people_search(
    "acc_123456789",
    perform_sales_people_search_request={
        "keywords": "CEO",
        "seniority": {"include": ["OWNER/PARTNER", "DIRECTOR"]},
    },
)
```
```curl
curl --request POST \
     --url https://api.unipile.com/v2/account_id/linkedin/sales-navigator/search/leads \
     --header 'accept: application/json'  
     --data '
{
   "keywords": "CEO",
   "seniority": {
      "include": ["OWNER/PARTNER", "DIRECTOR"]
   }
}'
```

## Search from URL

For a URL to be considered valid in the context of a leads search, it must match the following pattern : `https://www.linkedin.com/sales/search/people`.

To get a list of leads search results out of a URL, use [Perform Sales Navigator Search from URL](https://developer.unipile.com/v2.0/reference/performsalessearchfromurl).

```node
const { data } = await linkedInApi.performSalesSearchFromUrl({
  path: {
    account_id: "acc_123456789",
  },
  body: {
    url: "https://www.linkedin.com/sales/search/people?[...]",
  },
});
```
```python
leads = linked_in_api.perform_sales_search_from_url(
    "acc_123456789",
    {"url": "https://www.linkedin.com/sales/search/people?[...]"},
)
```
```curl
curl --request POST \
     --url https://api.unipile.com/v2/account_id/linkedin/sales-navigator/search \
     --header 'accept: application/json'  
     --data '
{
   "url": "https://www.linkedin.com/sales/search/people?[...]"
}'
```