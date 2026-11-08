---
updatedAt: 2026-11-04T09:39:47.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Manage applicants

Learn how to manage job applicants on LinkedIn using Unipile API.

Unipile provides access to LinkedIn's recruitment features through **two distinct access points**  :

* **Classic** : for posting simple job advertisements, as part of recruitment efforts of limited scope.
* **Recruiter** : for posting advanced job advertisements, as part of recruitment efforts of moderate to large scale, offering enhanced features to identify top talents.

<Callout icon="❗️" theme="error">
  Job postings created through LinkedIn Classic do not integrate with LinkedIn Recruiter. Conversely, job postings originating from LinkedIn Recruiter are inaccessible from LinkedIn Classic and must be administered through Recruiter exclusively.
</Callout>

<Callout icon="📘" theme="info">
  ### Note about parameters

  Certain options require IDs that reference specific values, rather than the values themselves.

  For example, in the `location` filter, you cannot directly insert `San Francisco`, but instead you should use the corresponding city ID.

  Within a LinkedIn Classic context, use the [List Classic Search Parameters](https://developer.unipile.com/v2.0/reference/getclassicsearchparameters) endpoint to help you find the IDs of the values you need. Conversely, within a LinkedIn Recruiter context, use the [List Recruiter Search Parameters](https://developer.unipile.com/v2.0/reference/getrecruitersearchparameters) endpoint.
</Callout>

<br />

# List applicants

## With LinkedIn Classic

To get a list of applicants for a specific job posting, use the [List Job Posting Applicants](https://developer.unipile.com/v2.0/reference/getclassicapplicants) endpoint, specifying the corresponding job ID. Optional filters are available in the body of the request, including `ratings`, which allows filtering candidates based on the rating they have been assigned.

```node
const { data } = await linkedInApi.getClassicApplicants({
  path: {
    account_id: "acc_123456789",
    job_id: "job_id",
  },
  body: {
    ratings: ['GOOD_FIT'],
    years_of_experience: [{
      min: 3
    }]
  },
});
```
```python
applicants = linked_in_api.get_classic_applicants(
    "job_id",
    "acc_123456789",
    get_classic_applicants_request={
        "ratings": ["GOOD_FIT"],
        "years_of_experience": [{"min": 3}],
    },
)
```
```curl
curl --request POST \
     --url https://api.unipile.com/v2/account_id/linkedin/jobs/job_id/applicants \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --data '
{
  "ratings": ["GOOD_FIT"],
  "years_of_experience": [{
    "min": 3
  }]
}
'
```

## With LinkedIn Recruiter

To get a list of applicants within the talent pool of a project, use the [List Job Posting Applicants](https://developer.unipile.com/v2.0/reference/getrecruitertalentpoolapplicants) endpoint, specifying the corresponding project ID, and a filters body.

```node
const { data } = await linkedInApi.getRecruiterTalentPoolApplicants({
  path: {
    account_id: "acc_123456789",
    project_id: "project_id",
  },
  body: {
    sort_by: 'NEWEST_FIRST',
    current_company: {
      include: ['01213', '45678']
    },
    seniority: ['SENIOR']
  },
});
```
```python
applicants = linked_in_api.get_recruiter_talent_pool_applicants(
    "project_id",
    "acc_123456789",
    get_recruiter_talent_pool_applicants_request={
        "sort_by": "NEWEST_FIRST",
        "current_company": {"include": ["01213", "45678"]},
        "seniority": ["SENIOR"],
    },
)
```
```curl
curl --request GET \
     --url https://api.unipile.com/v2/account_id/linkedin/recruiter/projects/project_id/talent-pool/applicants \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --data '
{
  "sort_by": "NEWEST_FIRST",
  "seniority": ["SENIOR"]
  "current_company": {
    "include": ["01213", "45678"]
  },
}
'
```

<br />

# Retrieve an applicant

## With LinkedIn Classic

To retrieve a candidate who has applied for one of your job postings, use the [Get an Applicant](https://developer.unipile.com/v2.0/reference/getclassicapplicantbyid) endpoint, specifying both the corresponding job and applicant IDs.

```node
const { data } = await linkedInApi.getClassicApplicantById({
  path: {
    account_id: "acc_123456789",
    job_id: "job_id",
    applicant_id: "applicant_id",
  },
});
```
```python
applicant = linked_in_api.get_classic_applicant_by_id(
    "job_id",
    "applicant_id",
    "acc_123456789",
)
```
```curl
curl --request GET \
     --url https://api.unipile.com/v2/account_id/linkedin/jobs/job_id/applicants/applicant_id \
     --header 'accept: application/json'
```

## With LinkedIn Recruiter

To retrieve a specific applicant from the talent pool of a project, use the [Get an Applicant](https://developer.unipile.com/v2.0/reference/getrecruiterapplicantbyid) endpoint, specifying both the corresponding project and applicant IDs.

```node
const { data } = await linkedInApi.getRecruiterApplicantById({
  path: {
    account_id: "acc_123456789",
    project_id: "project_id",
    applicant_id: "applicant_id",
  },
});
```
```python
applicant = linked_in_api.get_recruiter_applicant_by_id(
    "project_id",
    "applicant_id",
    "acc_123456789",
)
```
```curl
curl --request GET \
     --url https://api.unipile.com/v2/account_id/linkedin/recruiter/projects/project_id/talent-pool/applicants/applicant_id \
     --header 'accept: application/json'
```

<br />

# Download an applicant's resume

## With LinkedIn Classic

To download the resume of an applicant who applied to one of your job postings, use the [Get an Applicant's Resume](https://developer.unipile.com/v2.0/reference/getclassicapplicantresume) endpoint, specifying both the corresponding job and applicant IDs.

```node
const resume = await linkedInApi.getClassicApplicantResume({
  path: {
    account_id: "acc_123456789",
    job_id: "job_id",
    applicant_id: "applicant_id",
  },
});
```
```python
resume = linked_in_api.get_classic_applicant_resume(
    "job_id",
    "applicant_id",
    "acc_123456789",
)
```
```curl
curl --request GET \
     --url https://api.unipile.com/v2/account_id/linkedin/jobs/job_id/applicants/applicant_id/resume \
     --header 'accept: application/json'
```

## With LinkedIn Recruiter

To download the resume of an applicant from the talent pool of a project, use the [Get an Applicant's Resume](https://developer.unipile.com/v2.0/reference/getrecruiterapplicantresume) endpoint, specifying both the corresponding project and applicant IDs.

```node
const resume = await linkedInApi.getRecruiterApplicantResume({
  path: {
    account_id: "acc_123456789",
    project_id: "project_id",
    applicant_id: "applicant_id",
  },
});
```
```python
resume = linked_in_api.get_recruiter_applicant_resume(
    "project_id",
    "applicant_id",
    "acc_123456789",
)
```
```curl
curl --request GET \
     --url https://api.unipile.com/v2/account_id/linkedin/recruiter/projects/project_id/talent-pool/applicants/applicant_id/resume \
     --header 'accept: application/json'
```

<br />

# Send a message to an applicant

On **LinkedIn Classic**, see [Start a chat with an applicant](https://developer.unipile.com/docs/linkedin-send-messages#start-a-chat-with-an-applicant) from the **Classic Messaging guide**.

On **LinkedIn Recruiter**, see [Start a chat with a candidate](https://developer.unipile.com/docs/linkedin-send-messages-with-recruiter#start-a-chat-with-a-candidate) from the **Recruiter Messaging guide**.