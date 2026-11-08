---
updatedAt: 2026-11-04T09:39:47.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Manage job postings

Learn how to manage existing job postings on LinkedIn using Unipile API.

Unipile provides access to LinkedIn's recruitment features through **two distinct access points**  :

* **Classic** : for posting simple job advertisements, as part of recruitment efforts of limited scope.
* **Recruiter** : for posting advanced job advertisements, as part of recruitment efforts of moderate to large scale, offering enhanced features to identify top talents.

<Callout icon="❗️" theme="error">
  Job postings created through LinkedIn Classic do not integrate with LinkedIn Recruiter. Conversely, job postings originating from LinkedIn Recruiter are inaccessible from LinkedIn Classic and must be administered through Recruiter exclusively.
</Callout>

> 📘 Note about parameters
>
> Certain filters require IDs that reference specific values, rather than the values themselves.
>
> For instance, in the `location` filter, you cannot directly insert `San Francisco`, but instead you should use the corresponding city ID.
>
> To help you find the IDs of the values you need, use the [List Search Parameters](https://developer.unipile.com/v2.0/reference/getclassicsearchparameters) endpoint on Classic or the [List Search Parameters](https://developer.unipile.com/v2.0/reference/getrecruitersearchparameters) endpoint on Recruiter.

<br />

# With LinkedIn Classic

## Edit a job posting

To modify a job posting created by the account's owner, use the [Edit an existing Job Posting](https://developer.unipile.com/v2.0/reference/editclassicjobposting) endpoint, specifying the corresponding job ID and the modifications to be made within the body.

```node
const { data } = await linkedInApi.editClassicJobPosting({
  path: {
    account_id: "acc_123456789",
    job_id: "job_id",
  },
  body: {
    workplace_type: 'REMOTE',
    screening_questions: [
      {
        question: 'How many years of experience do you have ?',
        answer_type: 'numeric',
        min_expectation: 2,
        suggested_value: 3
      }
    ]
  },
});
```
```python
job = linked_in_api.edit_classic_job_posting(
    "job_id",
    "acc_123456789",
    {
        "workplace_type": "REMOTE",
        "screening_questions": [
            {
                "question": "How many years of experience do you have ?",
                "answer_type": "numeric",
                "min_expectation": 2,
                "suggested_value": 3,
            }
        ],
    },
)
```
```curl
curl --request PATCH \
     --url https://api.unipile.com/v2/account_id/linkedin/jobs/job_id \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --data '
{  
  "workplace_type": "REMOTE",
  "apply_method": [
    {
      "question": "How many years of experience do you have ?",
      "answer_type": "numeric",
      "min_expectation": 2,
      "suggested_value": 3
    }
  ]
}
'
```

## Close a job posting

To close a job posting published by the account's owner, use the [Close a Job Posting](https://developer.unipile.com/v2.0/reference/closeclassicjobposting) endpoint, specifying the corresponding job ID.

```node
await linkedInApi.closeClassicJobPosting({
  path: {
    account_id: "acc_123456789",
    job_id: "job_id",
  },
});
```
```python
linked_in_api.close_classic_job_posting("job_id", "acc_123456789")
```
```curl
curl --request POST \
     --url https://api.unipile.com/v2/account_id/linkedin/jobs/job_id/close \
     --header 'accept: application/json'
```

<br />

# With LinkedIn Recruiter

## Edit a job posting

To modify a job posting created by the account's owner, use the [Edit an existing Job Posting](https://developer.unipile.com/v2.0/reference/editrecruiterjobposting) endpoint, specifying the corresponding job ID, the ID of the project the job is associated to, and the modifications to be made within the body.

```node
const { data } = await linkedInApi.editRecruiterJobPosting({
  path: {
    account_id: "acc_123456789",
    job_id: "job_id",
    project_id: "project_id",
  },
  body: {
    description: 'The updated job description.',
    skills: ['skill_id']
  },
});
```
```python
job = linked_in_api.edit_recruiter_job_posting(
    "project_id",
    "job_id",
    "acc_123456789",
    {
        "description": "The updated job description.",
        "skills": ["skill_id"],
    },
)
```
```curl
curl --request PATCH \
     --url https://api.unipile.com/v2/account_id/linkedin/recruiter/projects/project_id/jobs/job_id \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --data '
{  
  "description": "The updated job description.",
  "skills": ["skill_id"]
}
'
```

## Close a job posting

To close a job posting published by the account's owner, use the [Close a Job Posting](https://developer.unipile.com/v2.0/reference/closerecruiterjobposting) endpoint, specifying the corresponding job ID and the ID of the project the job is associated to.

```node
await linkedInApi.closeRecruiterJobPosting({
  path: {
    account_id: "acc_123456789",
    job_id: "job_id",
    project_id: "project_id",
  },
});
```
```python
linked_in_api.close_recruiter_job_posting(
    "project_id",
    "job_id",
    "acc_123456789",
)
```
```curl
curl --request POST \
     --url https://api.unipile.com/v2/account_id/linkedin/jobs/job_id/close \
     --header 'accept: application/json'
```