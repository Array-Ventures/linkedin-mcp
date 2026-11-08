---
updatedAt: 2026-11-04T09:39:47.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# List job postings

Learn how to retrieve job postings on LinkedIn using Unipile API.

Unipile provides access to LinkedIn's recruitment features through **two distinct access points**  :

* **Classic** : for posting simple job advertisements, as part of recruitment efforts of limited scope.
* **Recruiter** : for posting advanced job advertisements, as part of recruitment efforts of moderate to large scale, offering enhanced features to identify top talents.

<Callout icon="❗️" theme="error">
  Job postings created through LinkedIn Classic do not integrate with LinkedIn Recruiter. Conversely, job postings originating from LinkedIn Recruiter are inaccessible from LinkedIn Classic and must be administered through Recruiter exclusively.
</Callout>

> 📘 About job posting states
>
> The lifecycle of job postings revolves around several distinct states :
>
> * `DRAFT` : the job posting is not yet published.
> * `OPEN` : the job posting is public and can receive applications.
> * `CLOSED` : the job posting has been closed and cannot receive anymore applications.
> * `REVIEW` : the job posting is currently being reviewed prior to publication.
> * `SUSPENDED` : the job posting has been suspended for an undetermined reason (insufficient credits, non-compliance, etc.).

<br />

# With LinkedIn Classic

## Get job postings

To get a list of jobs published by the account's owner, use the [List User Job Postings](https://developer.unipile.com/v2.0/reference/listclassicuserjobpostings) endpoint, specifying the current states to filter the results.

```node
const { data } = await linkedInApi.listClassicUserJobPostings({
  path: {
    account_id: "acc_123456789",
  },
  query: {
    state: ["DRAFT", "OPEN"],
  },
});
```
```python
jobs = linked_in_api.list_classic_user_job_postings(
    "acc_123456789",
    state=["DRAFT", "OPEN"],
)
```
```curl
curl --request GET \
     --url https://api.unipile.com/v2/account_id/linkedin/jobs?state=DRAFT&state=OPEN \
     --header 'accept: application/json'
```

## Retrieve a job posting

To get a job posting, use the [Get a Job Posting](https://developer.unipile.com/v2.0/reference/getclassicjobposting) endpoint, specifying the corresponding job ID. The `with_sections` parameter enables you to request additional sections within the job posting data.

```node
const { data } = await linkedInApi.getClassicJobPosting({
  path: {
    account_id: "acc_123456789",
    job_id: "job_id",
  },
  query: {
    with_sections: ["salary", "hiring_team"],
  },
});
```
```python
job = linked_in_api.get_classic_job_posting(
    "job_id",
    "acc_123456789",
    with_sections=["salary", "hiring_team"],
)
```
```curl
curl --request GET \
     --url https://api.unipile.com/v2/account_id/linkedin/jobs/job_id \
     --header 'accept: application/json'
```

<br />

# With LinkedIn Recruiter

## Get job postings

To get a list of jobs published by the account's owner, use the [List User Job Postings](https://developer.unipile.com/v2.0/reference/getrecruiterjobpostinglist) endpoint, optionnaly specifying the current states to filter the results. You may also want to sort the results in the `sort_by` field, or to get only the remote jobs with `workplace_type` field.

All filters offered by LinkedIn are available on Unipile.

> 📘 Note about parameters
>
> Certain filters require IDs that reference specific values, rather than the values themselves.
>
> For instance, in the `location` filter, you cannot directly insert `San Francisco`, but instead you should use the corresponding city ID.
>
> In the current context, use the [List Search Parameters](https://developer.unipile.com/v2.0/reference/getrecruitersearchparameters) endpoint to help you find the IDs of the values you need.

```node
const { data } = await linkedInApi.getRecruiterJobPostingList({
  path: {
    account_id: "acc_123456789",
  },
  query: {
    state: ['DRAFT', 'OPEN'],
    location: ['01234'],
    sort_by: 'CHRONOLOGICAL',
    workplace_type: ['REMOTE']
  },
});
```
```python
jobs = linked_in_api.get_recruiter_job_posting_list(
    "acc_123456789",
    state=["DRAFT", "OPEN"],
    location=["01234"],
    sort_by="CHRONOLOGICAL",
    workplace_type=["REMOTE"],
)
```
```curl
curl --request GET \
     --url https://api.unipile.com/v2/account_id/linkedin/recruiter/jobs?state=DRAFT&state=OPEN&location=01234&sort_by=CHRONOLOGICAL&workplace_type=remote \
     --header 'accept: application/json'
```

## Retrieve a job posting

To get a job posting, use the [Get a Job Posting](https://developer.unipile.com/v2.0/reference/getrecruiterjobpostingbyid) endpoint, specifying the corresponding job ID.

```node
const { data } = await linkedInApi.getRecruiterJobPostingById({
  path: {
    account_id: "acc_123456789",
    job_id: "job_id",
  },
});
```
```python
job = linked_in_api.get_recruiter_job_posting_by_id(
    "job_id",
    "acc_123456789",
)
```
```curl
curl --request GET \
     --url https://api.unipile.com/v2/account_id/linkedin/recruiter/jobs/job_id \
     --header 'accept: application/json'
```

You can also retrieve the job posting for a specific project, if one exists. Use the [Get the Project Job Posting](https://developer.unipile.com/v2.0/reference/getrecruiterjobpostingbyprojectid) endpoint, specifying the corresponding project ID.

```node
const { data } = await linkedInApi.getRecruiterJobPostingByProjectId({
  path: {
    account_id: "acc_123456789",
    project_id: "project_id",
  },
});
```
```python
job = linked_in_api.get_recruiter_job_posting_by_project_id(
    "project_id",
    "acc_123456789",
)
```
```curl
curl --request GET \
     --url https://api.unipile.com/v2/account_id/linkedin/recruiter/projects/project_id/jobs \
     --header 'accept: application/json'
```