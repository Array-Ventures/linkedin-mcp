---
updatedAt: 2026-11-04T09:39:47.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Create job postings

Learn how to create new job postings on LinkedIn using Unipile API.

Unipile provides access to LinkedIn's recruitment features through **two distinct access points**  :

* **Classic** : for posting simple job advertisements, as part of recruitment efforts of limited scope.
* **Recruiter** : for posting advanced job advertisements, as part of recruitment efforts of moderate to large scale, offering enhanced features to identify top talents.

<Callout icon="❗️" theme="error">
  Job postings created through LinkedIn Classic do not integrate with LinkedIn Recruiter. Conversely, job postings originating from LinkedIn Recruiter are inaccessible from LinkedIn Classic and must be administered through Recruiter exclusively.
</Callout>

<br />

This guide will cover the **multi-step process** of creating a job posting: draft creation, budget definition, and finally, posting publication.

<Callout icon="📘" theme="info">
  ### Note about parameters

  Certain options require IDs that reference specific values, rather than the values themselves.

  For example, in the `location` filter, you cannot directly insert `San Francisco`, but instead you should use the corresponding city ID.

  Within a LinkedIn Classic context, use the [List Classic Search Parameters](https://developer.unipile.com/v2.0/reference/getclassicsearchparameters) endpoint to help you find the IDs of the values you need. Conversely, within a LinkedIn Recruiter context, use the [List Recruiter Search Parameters](https://developer.unipile.com/v2.0/reference/getrecruitersearchparameters) endpoint.
</Callout>

<br />

# With LinkedIn Classic

## Create a job posting draft

To create a new job posting draft, use the [Create a Job Posting Draft](https://developer.unipile.com/v2.0/reference/createclassicjobpostingdraft) endpoint with the job posting parameters in the request body. The majority are mandatory : `title`, `company`, `workplace_type`, `location`, `employment_status`, `description`, and `apply_method`.

```node
const { data } = await linkedInApi.createClassicJobPostingDraft({
  path: {
    account_id: "acc_123456789",
  },
  body: {
    job_title: {
      id: 'title_id',
      text: 'Developer'
    },
    company: {
      id: 'company_id'
    },
    workplace_type: 'ON_SITE',
    location: 'location_id',
    employment_status: 'FULL_TIME',
    description: 'The job description.',
    apply_method: {
      method: 'linkedin',
      notification_email: 'jobposter@email.com'
    }
  },
});
```
```python
job = linked_in_api.create_classic_job_posting_draft(
    "acc_123456789",
    {
        "job_title": {"id": "title_id", "text": "Developer"},
        "company": {"id": "company_id"},
        "workplace_type": "ON_SITE",
        "location": "location_id",
        "employment_status": "FULL_TIME",
        "description": "The job description.",
        "apply_method": {
            "method": "linkedin",
            "notification_email": "jobposter@email.com",
        },
    },
)
```
```curl
curl --request POST \
     --url https://api.unipile.com/v2/account_id/linkedin/jobs \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --data '
{
  "job_title": {
    "id": "title_id",
    "text": "Developer"
  },
  "company": {
    "id": "company_id"
  },
  "workplace_type": "ON_SITE",
  "location": "location_id",
  "employment_status": "FULL_TIME",
  "description": "The job description.",
  "apply_method": {
    "method": "linkedin",
    "notification_email": "jobposter@email.com"
  }
}
'
```

## Get a budget

Before publishing your job posting, it is important to understand the **recommended budget**. You will first be able to determine **whether the job posting can be published for free**, and then you will receive **budget tiers to allocate to your job posting** as well as the **estimated number of applications**.

To obtain information regarding the budget you can allocate to a job posting, use the [Get the Budget for a Job Posting](https://developer.unipile.com/v2.0/reference/getclassicjobpostingbudget) endpoint, providing the ID of the corresponding job posting.

```node
const { data } = await linkedInApi.getClassicJobPostingBudget({
  path: {
    account_id: "acc_123456789",
    job_id: "job_id",
  },
});
```
```python
budget = linked_in_api.get_classic_job_posting_budget("job_id", "acc_123456789")
```
```curl
curl --request GET \
     --url https://api.unipile.com/v2/account_id/linkedin/jobs/job_id/budget \
     --header 'accept: application/json'
```

## Publish the job posting

There are two publication modes for a job posting :

* `FREE` : The posting can be published **free of charge for 14 days**, provided you meet the eligibility requirements. The **number of applications is limited**, and overall, the **results are less relevant** than with a paid post.
* `PROMOTED` : A total or daily average budget is allocated to the job posting, which appears in the **top position** among job postings. The **number of applications is unlimited**, and the results are generally **three times more relevant** than with the free mode.

<Callout icon="❗️" theme="error">
  To publish in `free` mode, you must first verify your eligibility by consulting the job posting budget.
</Callout>

<Callout icon="📘" theme="info">
  ### About company permissions

  To publish a job posting, **you must be verified as representing the company** for which the posting is being made. Otherwise, you may encounter a `provider/insufficient_permissions` 400 http error on the **Publish a Job Posting** endpoint.

  To verify your identity with a company, use the [Verify Company Member Identity](https://developer.unipile.com/v2.0/reference/verifyclassiccompanymemberidentity) endpoint.
</Callout>

To publish a job posting draft, use the [Publish a Job Posting](https://developer.unipile.com/v2.0/reference/publishclassicjobposting) endpoint, providing the ID of the corresponding job posting and the publish options in the body.

```node
const { data } = await linkedInApi.publishClassicJobPosting({
  path: {
    account_id: "acc_123456789",
    job_id: "job_id",
  },
  body: {
    mode: 'PROMOTED',
    budget: {
      total: {
        amount: 80,
        currency: 'USD'
      }
    }
  },
});
```
```python
job = linked_in_api.publish_classic_job_posting(
    "job_id",
    "acc_123456789",
    {"mode": "PROMOTED", "budget": {"total": {"amount": 80, "currency": "USD"}}},
)
```
```curl
curl --request POST \
     --url https://api.unipile.com/v2/account_id/linkedin/jobs/job_id/publish \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --data '
{
  "mode": "PROMOTED",
  "budget": {
    "total": {
      "amount": 80,
      "currency": "USD"
    }
  }
}
'
```

# With LinkedIn Recruiter

## Create a job posting draft

In this context, you can create an job posting either **within an existing project** or **in a new project** created for the occasion.

To create a new job posting draft within an existing project, use the [Create a Job Posting Draft in an Existing Project](https://developer.unipile.com/v2.0/reference/createrecruiterjobpostingdraftinexistingproject) endpoint, specifying the project ID and the job posting parameters in the request body. There are numerous mandatory fields : `job_title`, `company`, `workplace_type`, `location`, `employment_status`, `seniority_level`, `description`, `industry`, `job_function`, and `apply_method`.

```node
const { data } = await linkedInApi.createRecruiterJobPostingDraftInExistingProject({
  path: {
    account_id: "acc_123456789",
    project_id: "project_id",
  },
  body: {
    title: {
      id: 'title_id',
      text: 'Developer'
    },
    company: {
      id: 'company_id'
    },
    workplace_type: 'ON_SITE',
    location: 'location_id',
    employment_status: 'FULL_TIME',
    seniority_level: 'MID_SENIOR_LEVEL',
    industry: ['industry_id'],
    job_function: ['job_function_id'],
    description: 'The job description.',
    apply_method: {
      method: 'LINKEDIN',
      notification_email: 'jobposter@email.com',
      resume_required: true
    }
  },
});
```
```python
job = linked_in_api.create_recruiter_job_posting_draft_in_existing_project(
    "project_id",
    "acc_123456789",
    {
        "title": {"id": "title_id", "text": "Developer"},
        "company": {"id": "company_id"},
        "workplace_type": "ON_SITE",
        "location": "location_id",
        "employment_status": "FULL_TIME",
        "seniority_level": "MID_SENIOR_LEVEL",
        "industry": ["industry_id"],
        "job_function": ["job_function_id"],
        "description": "The job description.",
        "apply_method": {
            "method": "LINKEDIN",
            "notification_email": "jobposter@email.com",
            "resume_required": True,
        },
    },
)
```
```curl
curl --request POST \
     --url https://api.unipile.com/v2/account_id/linkedin/jobs \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --data '
{
  "title": {
    "id": "title_id",
    "text": "Developer"
  },
  "company": {
    "id": "company_id"
  },
  "workplace_type": "ON_SITE",
  "location": "location_id",
  "employment_status": "FULL_TIME",
  "description": "The job description.",
  "apply_method": {
    "method": "LINKEDIN",
    "notification_email": "jobposter@email.com"
  }
}
'
```

To create new job posting draft within a new project, use the [Create a Job Posting Draft in a New Project](https://developer.unipile.com/v2.0/reference/createrecruiterjobpostingdraftinnewproject) endpoint, specifying the new project name and the job posting parameters in the request body. The mandatory fields are the same as in the previous example.

```node
const { data } = await linkedInApi.createRecruiterJobPostingDraftInNewProject({
  path: {
    account_id: "acc_123456789",
  },
  body: {
    project_name: "project_name",
    title: {
      id: 'title_id',
      text: 'Developer'
    },
    company: {
      id: 'company_id'
    },
    workplace_type: 'ON_SITE',
    location: 'location_id',
    employment_status: 'FULL_TIME',
    seniority_level: 'MID_SENIOR_LEVEL',
    industry: ['industry_id'],
    job_function: ['job_function_id'],
    description: 'The job description.',
    apply_method: {
      method: 'LINKEDIN',
      notification_email: 'jobposter@email.com',
      resume_required: true
    }
  },
});
```
```python
job = linked_in_api.create_recruiter_job_posting_draft_in_new_project(
    "acc_123456789",
    {
        "project_name": "project_name",
        "title": {"id": "title_id", "text": "Developer"},
        "company": {"id": "company_id"},
        "workplace_type": "ON_SITE",
        "location": "location_id",
        "employment_status": "FULL_TIME",
        "seniority_level": "MID_SENIOR_LEVEL",
        "industry": ["industry_id"],
        "job_function": ["job_function_id"],
        "description": "The job description.",
        "apply_method": {
            "method": "LINKEDIN",
            "notification_email": "jobposter@email.com",
            "resume_required": True,
        },
    },
)
```
```curl
curl --request POST \
     --url https://api.unipile.com/v2/account_id/linkedin/jobs \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --data '
{
  "title": {
    "id": "title_id",
    "text": "Developer"
  },
  "company": {
    "id": "company_id"
  },
  "workplace_type": "ON_SITE",
  "location": "location_id",
  "employment_status": "FULL_TIME",
  "description": "The job description.",
  "apply_method": {
    "method": "LINKEDIN",
    "notification_email": "jobposter@email.com"
  }
}
'
```

## Get a budget

Before publishing your job posting, it is important to understand the **recommended budget**. You will first be able to determine **whether the job posting can be published for free**, and then you will receive **budget tiers to allocate to your job posting** as well as the **estimated number of applications**.

To obtain information regarding the budget you can allocate to a job posting, use the [Get the Budget for a Job Posting](https://developer.unipile.com/v2.0/reference/getclassicjobpostingbudget) endpoint, providing the ID of the corresponding job posting and the ID of the project the job posting is associated to.

```node
const { data } = await linkedInApi.getRecruiterJobPostingBudget({
  path: {
    account_id: "acc_123456789",
    job_id: "job_id",
    project_id: "project_id",
  },
});
```
```python
budget = linked_in_api.get_recruiter_job_posting_budget(
    "project_id",
    "job_id",
    "acc_123456789",
)
```
```curl
curl --request GET \
     --url https://api.unipile.com/v2/account_id/linkedin/jobs/job_id/budget \
     --header 'accept: application/json'
```

## Publish the job posting

There are two publication modes for a job posting :

* `FREE` : The posting can be published **free of charge for 14 days**, provided you meet the eligibility requirements. The **number of applications is limited**, and overall, the **results are less relevant** than with a paid post.
* `PROMOTED` : A total or daily average budget is allocated to the job posting, which appears in the **top position** among job postings. The **number of applications is unlimited**, and the results are generally **three times more relevant** than with the free mode.

<Callout icon="❗️" theme="error">
  To publish in `free` mode, you must first verify your eligibility by consulting the job posting budget.
</Callout>

<Callout icon="📘" theme="info">
  ### About company permissions

  To publish a job posting, **you must be verified as representing the company** for which the posting is being made. Otherwise, you may encounter a `provider/insufficient_permissions` 400 http error on the **Publish a Job Posting** endpoint.

  To verify your identity with a company, use the [Verify Company Member Identity](https://developer.unipile.com/v2.0/reference/verifyrecruitercompanymemberidentity) endpoint.
</Callout>

To publish a job posting draft, use the [Publish a Job Posting](https://developer.unipile.com/v2.0/reference/publishclassicjobposting) endpoint, providing the ID of the corresponding job posting, the ID of the project the job posting is associated to, and the publish options in the body.

```node
const { data } = await linkedInApi.publishRecruiterJobPosting({
  path: {
    account_id: "acc_123456789",
    job_id: "job_id",
    project_id: "project_id",
  },
  body: {
    mode: 'PROMOTED',
    budget: {
      daily: {
        amount: 18,
        currency: 'EUR'
      }
    }
  },
});
```
```python
job = linked_in_api.publish_recruiter_job_posting(
    "project_id",
    "job_id",
    "acc_123456789",
    {"mode": "PROMOTED", "budget": {"daily": {"amount": 18, "currency": "EUR"}}},
)
```
```curl
curl --request POST \
     --url https://api.unipile.com/v2/account_id/linkedin/jobs/job_id/publish \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --data '
{
  "mode": "PROMOTED",
  "budget": {
    "total": {
      "amount": 80,
      "currency": "USD"
    }
  }
}
'
```

<br />