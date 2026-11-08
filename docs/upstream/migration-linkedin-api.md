---
updatedAt: 2026-11-04T09:32:47.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# LinkedIn API

This guide will help you migrate the LinkedIn features of your application to API v2.

<br />

In Unipile v1, all LinkedIn-specific routes, whether related to **Classic**, **Recruiter**, or **Sales navigator** products, were grouped under the URL prefix `linkedin`. Now, each product (excluding **Classic**) has its own prefix to improve API organization.

For example, the search functionality previously had a single endpoint, `linkedin/search`. With the new endpoints structure, the endpoint `linkedin/search` is reserved for **Classic**, `linkedin/recruiter/search` for **Recruiter**, and `linkedin/sales_navigator/search` for **Sales Navigator**.

<br />

***

# Methods changes

For each endpoint in the v1 API, here are the corresponding endpoints in the v2 API, along with the necessary modifications to achieve the same results.

<Callout icon="❗️" theme="error">
  ### Specifying the target account

  The `account_id` param, previously available either in the query params or in the body, is removed from all methods. The `account_id` must now be consistently included in the path params.
</Callout>

<br />

## Retrieve Recruiter hiring projects

`GET /v1/linkedin/projects`

* Use `GET /v2/:account_id/linkedin/recruiter/projects` [List Projects](https://developer.unipile.com/v2.0/reference/getrecruiterhiringprojectlist).
* Query param `sort_by` have changed.
  * The param's enum values more closely reflect LinkedIn's application.
* Query param `sort_order` is removed as it is now integrated in `sort_by`.
* Query param `cursor` is removed. User `offset` instead.
* The response schema has changed (see [RecruiterHiringProjectList](#recruiterhiringprojectlist) changes).

<br />

## Retrieve Recruiter hiring project from ID

`GET /v1/linkedin/projects/:id`

* Use `GET /v2/:account_id/linkedin/recruiter/projects/:project_id` [Get a Project](https://developer.unipile.com/v2.0/reference/getrecruiterhiringproject).
* Path param `id` is renamed to `project_id`.
* The response schema has changed (see [RecruiterHiringProject](#recruiterhiringproject) changes).

<br />

## Perform an action with a user profile

`POST /v1/linkedin/user/:user_id`

This endpoint is removed.

<Callout icon="👍" theme="okay">
  ### Recommendation

  Here's how the actions allowed by this endpoint should now be performed :

  - **Add candidate or applicant to pipeline (Recruiter)** : Use `POST /v2/:account_id/linkedin/recruiter/projects/:project_id/pipeline/candidate/save` [Save a Candidate](https://developer.unipile.com/v2.0/reference/saverecruitercandidatetopipeline).
  - **Save lead (Sales Navigator)** : Use `POST /v2/:account_id/linkedin/sales-navigator/lead-lists/:list_id/save` [Save a Lead To a List](https://developer.unipile.com/v2.0/reference/savesalesleadtolist).
</Callout>

<br />

## Retrieve a company profile

`GET /v1/linkedin/company/:identifier`

* Use `GET /v2/:account_id/linkedin/company/:company_id` [Get a Company Profile](https://developer.unipile.com/v2.0/reference/getclassiccompanyprofile).
* Path param `identifier` is renamed to `company_id`.
* The response schema has changed (see [CompanyProfile](#companyprofile) changes).

<br />

## Get raw data from any endpoint

`POST /v1/linkedin`

* Use `POST /v2/:account_id/linkedin` [Perform a Request to any LinkedIn API Endpoint](https://developer.unipile.com/v2.0/reference/proxyrequest).
* Body param `request_url` is renamed to `url`.
* Body param `force_api` is removed.
  * You need to ensure that the account you are using is subscribed to the API you are requesting.
* Body param `encoding` is renamed to `bypass_url_encoding`.
  * It no longer specifies that the body and query should be natively encoded, but rather that encoding should by bypassed.

<br />

## Get inmail credit balance

`GET /v1/linkedin/inmail_balance`

* Use `GET /v2/:account_id/linkedin/inmail-credits` [Get InMail Credits](https://developer.unipile.com/v2.0/reference/getinmailcredits).
* The response schema has changed (see [InmailCredits](#inmailcredits) changes).

<br />

## Retrieve LinkedIn search parameters

`GET /v1/linkedin/search/parameters`

* Use one of these 3 variations of the endpoint depending on the product :

  * **Classic** : `GET /v2/:account_id/linkedin/search/parameters` [List Search Parameters](https://developer.unipile.com/v2.0/reference/getclassicsearchparameters).
  * **Recruiter** : `GET /v2/:account_id/linkedin/recruiter/search/parameters` [List Search Parameters](https://developer.unipile.com/v2.0/reference/getrecruitersearchparameters).
  * **Sales Navigator** : `GET /v2/:account_id/linkedin/sales-navigator/search/parameters` [List Search Parameters](https://developer.unipile.com/v2.0/reference/getsalessearchparameters).
* Query param `service` is removed as it is no longer relevant.
* Query param `type` has changed. Refer to the mappings in the following table :

| v1 type                              | v2 type                             |
| :----------------------------------- | :---------------------------------- |
| **COMMON** `CONNECTIONS`             | **CLASSIC** `RELATION`              |
| **RECRUITER** `GROUPS`               | **RECRUITER** `GROUP`               |
| **RECRUITER** `DEPARTMENT`           | **RECRUITER** `JOB_FUNCTION`        |
| **RECRUITER** `HIRING_PROJECTS`      | **RECRUITER** `PROJECT`             |
| **RECRUITER** `SAVED_FILTERS`        | **RECRUITER** `SAVED_FILTER`        |
| **SALES NAVIGATOR** `GROUPS`         | **SALES NAVIGATOR** `GROUP`         |
| **SALES NAVIGATOR** `SALES_INDUSTRY` | **SALES NAVIGATOR** `INDUSTRY`      |
| **SALES NAVIGATOR** `DEPARTMENT`     | **SALES NAVIGATOR** `JOB_FUNCTION`  |
| **SALES NAVIGATOR** `ACCOUNT_LISTS`  | **SALES NAVIGATOR** `ACCOUNT_LIST`  |
| **SALES NAVIGATOR** `LEAD_LISTS`     | **SALES NAVIGATOR** `LEAD_LIST`     |
| **SALES NAVIGATOR** `TECHNOLOGIES`   | **SALES NAVIGATOR** `TECHNOLOGY`    |
| **SALES NAVIGATOR** `SAVED_ACCOUNTS` | **SALES NAVIGATOR** `SAVED_ACCOUNT` |
| **SALES NAVIGATOR** `SAVED_SEARCHES` | **SALES NAVIGATOR** `SAVED_SEARCH`  |
| **SALES NAVIGATOR** `REGION`         | **SALES NAVIGATOR** `LOCATION`      |

<br />

## Perform Linkedin search

`POST /v1/linkedin/search`

* Multiple search endpoints are now available, depending on the product and the resource being requested.
* Query param `cursor` is removed. Use `offset` instead.
* Body params `api` and `category` are removed as they are no longer relevant.

### Classic

* **Search From URL**: Use `POST /v2/:account_id/linkedin/search` [Perform Search from URL](https://developer.unipile.com/v2.0/reference/performclassicsearchfromurl).
* **People search** : Use `POST /v2/:account_id/linkedin/search/people` [Perform People Search](https://developer.unipile.com/v2.0/reference/performclassicpeoplesearch).
  * Body param `company` is renamed to `current_company`.
  * Body param `open_to` is removed.
    * Use `open_to_volunteering` instead.
* **Companies search** : Use `POST /v2/:account_id/linkedin/search/companies` [Perform Companies Search](https://developer.unipile.com/v2.0/reference/performclassiccompaniessearch).
  * Body param `has_job_offers` is renamed to `has_job_postings`.
  * Body param `network_distance` is removed as it is not suitable for the intended filter.
    * Use `is_employing_relations` to filter companies that employ people from your close network.
* **Posts search** : Use `POST /v2/:account_id/linkedin/search/posts` [Perform Posts Search](https://developer.unipile.com/v2.0/reference/performclassicpostssearch).
  * Enum values for body params `sort_by`, `date_posted` and `content_type` are now uppercase.
  * Body param `first_connections` within `posted_by` is renamed to `relations`.
* **Jobs search** : Use `POST /v2/:account_id/linkedin/search/jobs` [Perform Jobs Search](https://developer.unipile.com/v2.0/reference/performclassicjobssearch).

  * Enum values for body param `sort_by` are now uppercase.
  * Body param `date_posted` has changed.
    * Expected value is now `PAST_DAY`, `PAST_WEEK` or `PAST_MONTH`.
  * Body param `region` is renamed to `primary_location`.
  * Body param `location_within_area` is renamed to `location_radius`.
  * Body param `seniority` has changed. Refer to the mappings in the following table :

  | v1 seniority | v2 seniority       |
  | :----------- | :----------------- |
  | `executive`  | `EXECUTIVE`        |
  | `director`   | `DIRECTOR`         |
  | `mid_senior` | `MID_SENIOR_LEVEL` |
  | `associate`  | `ASSOCIATE`        |
  | `entry`      | `ENTRY_LEVEL`      |
  | `intern`     | `INTERNSHIP`       |

  * Body param `role` is renamed to `job_title`.
  * Body param `job_type` is renamed to `employment_status` and its enum values are now uppercase.
  * Body param `presence` is renamed to `workplace_type` and its enum values are now uppercase.
  * Enum values for body params `benefits` and `commitments` are now uppercase.
  * Body param `minimum_salary` is renamed to `salary` and has changed.
    * Param `minimum_salary[value]` is renamed to `salary[starting_from]`.

### Recruiter

* **Search From URL**: Use `POST /v2/:account_id/linkedin/recruiter/search` [Perform Search from URL](https://developer.unipile.com/v2.0/reference/performrecruitersearchfromurl).
* **People search** : Use `POST /v2/:account_id/linkedin/recruiter/search/people` [Perform People Search](https://developer.unipile.com/v2.0/reference/performrecruiterpeoplesearch).
  * Body param `locale` is removed as account locale is now applied by default.
  * Body param `saved_filter` is now an object with the `id` property.
  * Body param `saved_search` is removed from the general search endpoint.
    * Use `POST /v2/:account_id/linkedin/recruiter/projects/:project_id/talent-pool/search` [Perform People Search From Talent Pool](https://developer.unipile.com/v2.0/reference/performrecruiterpeoplesearchfromtalentpool) instead, where you can specify a `saved_search` ID in the body (`saved_search[id]` param).
  * Body param `location` has changed.
    * Param `location[scope]` is renamed to `location[preferences]`.
    * Param `location[title]` is removed as it is no longer relevant.
  * Body param `location_within_area` is renamed to `postal_code_radius`.
    * This param must be used in conjunction with the new `postal_code` param.
  * Body param `role` is renamed to `job_title` and has changed.
    * Param `job_title[keywords]` is removed.
    * Param `job_title[is_selection]` is removed. Use body param `occupation` instead.
    * In all cases, the name of the job must be provided in `job_title[name]`. Subsequently, if the job was found via the **List Search Parameters** endpoint, the corresponding ID must be placed in the `job_title[id]` field.
    * Param `role[scope]` is renamed to `job_title[preferences]`.
  * Body param `skills` has changed.
    * Param `skills[keywords]` is removed.
    * In all cases, the name of the skill must be provided in `skills[name]`. Subsequently, if the skill was found via the **List Search Parameters** endpoint, the corresponding ID must be placed in the `skills[id]` field.
  * Body param `company` has changed.
    * Param `company[keywords]` is removed.
    * In all cases, the name of the company must be provided in `company[name]`. Subsequently, if the company was found via the [List Search Parameters](https://developer.unipile.com/v2.0/reference/getrecruitersearchparameters) endpoint, the corresponding ID must be placed in the `company[id]` field.
    * Param `company[scope]` is renamed to `job_title[preferences]`.
  * Body param `company_headcount` is renamed to `company_size`.
  * Body param `groups` is renamed to `group`.
  * Body param `tenure` is renamed to `years_of_experience`.
  * Body param `tenure_in_company` is renamed to `years_in_company`.
  * Body param `tenure_in_position` is renamed to `years_in_position`.
  * Body param `seniority` has changed.
    * Since seniority values can only be included, the expected value here is the equivalent of `seniority[include]` in uppercase characters.
  * Body param `spoken_languages` is renamed to `spoken_language` and has changed.
    * Param `spoken_languages[scope]` is renamed to `spoken_language[preferences]`.
  * Body param `hide_previously_viewed` has changed.
    * Param `hide_previously_viewed[timespan]` is no longer a number but a string enum of durations. See [API Reference](https://developer.unipile.com/v2.0/reference/performrecruiterpeoplesearch) for details.
  * Body param `profile_language` has changed.
    * You must now use the [List Search Parameters](https://developer.unipile.com/v2.0/reference/getrecruitersearchparameters) endpoint with the `PROFILE_LANGUAGE` type to retrieve reference IDs to be used here.
  * Body param `has_military_background` is renamed to `is_military_veteran`.
  * Body param `past_applicants` is renamed to `is_past_applicant`.
  * Body param `hiring_projects` is renamed to `project`.
  * Body param `recruiting_activity` has changed.
    * Param `recruiting_activity[timespan]` is renamed to `recruiting_activity[preferences]` and is no longer a number, but a string enum of durations. See [API Reference](https://developer.unipile.com/v2.0/reference/performrecruiterpeoplesearch) for details.

### Sales Navigator

* **Search From URL**: Use `POST /v2/:account_id/linkedin/sales-navigator/search` [Perform Search from URL](https://developer.unipile.com/v2.0/reference/performsalessearchfromurl).
* **People Search**: Use `POST /v2/:account_id/linkedin/sales-navigator/search/people` [Perform People Search](https://developer.unipile.com/v2.0/reference/performsalespeoplesearch).
  * Body param `saved_search_id` is removed.
    * Use param `saved_search` which is an object that contains an `id` property.
  * Body param `last_viewed_at` is moved in `saved_search`.
  * Body param `recent_search_id` is removed.
    * Use param `recent_search` which is an object that contains an `id` property.
  * Body param `location_by_postal_code` is renamed to `postal_code`.
  * Body params `first_name` and `last_name` are now string arrays.
  * Body param `tenure` is renamed to `years_of_experience`.
  * Body param `groups` is renamed to `group` and is now an object with `include` and `exclude` properties to include or exclude groups from the search results.
  * Body param `profile_language` has changed.
    * You must now use the [List Search Parameters](https://developer.unipile.com/v2.0/reference/getsalessearchparameters) endpoint with the `PROFILE_LANGUAGE` type to retrieve reference IDs to be used here.
  * Body param `company` is renamed to `current_company`.
  * Enum values for body param `company_type` are now uppercase.
  * Body param `tenure_at_company` is renamed to `years_in_company`.
  * Body param `tenure_at_role` is renamed to `years_in_position`.
  * Body param `role` is renamed to `current_job_title`.
  * Body param `past_role` is renamed to `past_job_title`.
  * Enum values for body param `seniority` are now uppercase.
  * Body param `mentionned_in_news` is removed as it is deprecated.
  * Body param `account_lists` is renamed to `account_list`.
  * Body param `lead_lists` is renamed to `lead_list`.
  * Body param `viewed_profile_recently` is moved within `recent_interaction` and renamed to `viewed_profile`.
  * Body param `messaged_recently` is moved within `recent_interaction` and renamed to `messaged`.
  * Body param `include_saved_leads` is moved within `saved_resources` and renamed to `saved_leads`.
  * Body param `include_saved_accounts` is moved within `saved_resources` and renamed to `saved_accounts`.
  * Body param `save_search` is removed.
    * Use `search_name` directly in the body.
* **Companies Search**: Use `POST /v2/:account_id/linkedin/sales-navigator/search/companies` [Perform Companies Search](https://developer.unipile.com/v2.0/reference/performsalespeoplesearch).
  * Body param `saved_search_id` is removed.
    * Use param `saved_search` which is an object that contains an `id` property.
  * Body param `last_viewed_at` is moved in `saved_search`.
  * Body param `recent_search_id` is removed.
    * Use param `recent_search` which is an object that contains an `id` property.
  * Body param `location_by_postal_code` is renamed to `postal_code`.
  * Body param `has_job_offers` is removed.
    * Use body param `spotlights` with value `HIRING_ON_LINKEDIN`.
  * Body param `network_distance` is removed.
    * Use body param `spotlights` with value `FIRST_DEGREE_CONNECTIONS`.
  * Body params `department_headcount` and `department_headcount_growth` have changed.
    * Param `department` is now a string since only one department can be specified.
  * Body param `followers_count` is renamed to `followers`.
  * Body param `technologies` is removed as it is deprecated.
  * Body param `recent_activities` is removed.
    * Use body param `spotlights` with value `RECENT_LEADERSHIP_CHANGE` or/and `RECENT_FUNDING_EVENTS`.
  * Body param `saved_accounts` has changed.
    * It now expects a boolean since you can only choose if you want to include all your saved accounts or not.
  * Body param `account_lists` is renamed to `account_list`.
  * Body param `save_search` is removed.
    * Use `search_name` directly in the body.

<br />

## List all job postings

`GET /v1/linkedin/jobs`

* On **Classic**, use `GET /v2/:account_id/linkedin/jobs` [List User Job Postings](https://developer.unipile.com/v2.0/reference/listclassicuserjobpostings).
* On **Recruiter**, use `GET /v2/:account_id/linkedin/recruiter/jobs` [List User Job Postings](https://developer.unipile.com/v2.0/reference/listclassicuserjobpostings).
* Common changes :
  * Query param `cursor` is removed. User `offset` instead.
  * Query param `category` is renamed to `state` and has changed. Refer to the the following mapping table :

| v1       | v2          |
| :------- | :---------- |
| `active` | `OPEN`      |
| `draft`  | `DRAFT`     |
| `closed` | `CLOSED`    |
|          | `REVIEW`    |
|          | `SUSPENDED` |

<br />

## Create a job posting

`POST /v1/linkedin/jobs`

* On **Classic**, use `POST /v2/:account_id/linkedin/jobs` [Create a Job Posting Draft](https://developer.unipile.com/v2.0/reference/createclassicjobpostingdraft).
  * Params `text` within `job_title` and `company` are renamed to `name`.
  * Body param `workplace` is renamed to `workplace_type`.
  * Body param `auto_rejection_template` is moved into `rejection_settings` and renamed to `rejection_template`.
  * Body param `screening_questions` has changed.
    * Param `must_match` is renamed to `qualification_required`.
    * Param `position` is removed as it is not relevant.
  * Body param `recruiter` is removed as it is not relevant in Classic job posting.
* On **Recruiter**, use `POST /v2/:account_id/linkedin/recruiter/jobs` [Create a Job Posting Draft in a New Project](https://developer.unipile.com/v2.0/reference/createrecruiterjobpostingdraftinnewproject).
  * The base body params have undergone the same changes as those applied on **Classic**.
  * Body param `recruiter` is removed. Its content is merged with the other params.
    * Param `project` is removed.
      * If no project is associated with the job posting, use `project_name` param to define the name of a new project.
      * To create a job posting in an existing project, use `POST /v2/:account_id/linkedin/recruiter/projects/:project_id/jobs` [Create a Job Posting Draft in an Existing Project](https://developer.unipile.com/v2.0/reference/createrecruiterjobpostingdraftinexistingproject).
    * Param `functions` is renamed to `job_function`.
    * Param `industries` is renamed to `industry`.
    * Param `seniority` is renamed to `seniority_level`.
    * Param `apply_method` has changed.
      * Param `type` is renamed to `method`.
      * Param `url` is renamed to `website_url`.
    * Param `auto_archive_applicants` is removed.
      * Param `screening_questions` is moved to `rejection_settings` and renamed to `reject_unqualified_applicants`.
      * Param `outside_of_country` is moved to `rejection_settings` and renamed to `reject_out_of_country_applicants`.
    * Param `send_rejection_notification` is moved to `rejection_settings`.

<br />

## Get job offer

`GET /v1/linkedin/jobs/:job_id`

* On **Classic**, use `GET /v2/:account_id/linkedin/jobs/:job_id` [Get a Job Posting](https://developer.unipile.com/v2.0/reference/getclassicjobposting).
* On **Recruiter**, use `GET /v2/:account_id/linkedin/recruiter/jobs/:job_id` [Get a Job Posting](https://developer.unipile.com/v2.0/reference/getrecruiterjobpostingbyid).
  * To retrieve a job posting by project, use `GET /v2/:account_id/linkedin/recruiter/projects/:project_id/jobs` [Get a Job Posting by Project](https://developer.unipile.com/v2.0/reference/getrecruiterjobpostingbyprojectid).
* Common changes :
  * Query param `service` is removed as it is no longer relevant.

<br />

## Edit a job posting

`PATCH /v1/linkedin/jobs/:job_id`

* On **Classic**, use `PATCH /v2/:account_id/linkedin/jobs/:job_id` [Edit an existing Job Posting](https://developer.unipile.com/v2.0/reference/editclassicjobposting).
  * Changes are the same as in [Create a Job Posting](https://developer.unipile.com/docs/migration-linkedin-api#create-a-job-posting).
* On **Recruiter**, use `PATCH /v2/:account_id/linkedin/recruiter/projects/:project_id/jobs/:job_id` [Edit an existing Job Posting](https://developer.unipile.com/v2.0/reference/editclassicjobposting).
  * Param `project_id` in body param `recruiter` is removed as the project ID must now be specified in the path params.
  * Other changes are the same as in [Create a Job Posting](https://developer.unipile.com/docs/migration-linkedin-api#create-a-job-posting).

<br />

## Publish a job posting

`POST /v1/linkedin/jobs/:draft_id/publish`

* On **Classic**, use `POST /v2/:account_id/linkedin/jobs/:job_id/publish` [Publish a Job Posting](https://developer.unipile.com/v2.0/reference/publishclassicjobposting).
  * Body param `hiring_photo_frame` is renamed to `set_hiring_frame`.
  * Param `monthly` in body param `budget` is renamed to `total`.
* On **Recruiter**, use `POST /v2/:account_id/linkedin/recruiter/projects/:project_id/jobs/:job_id/publish` [Publish a Job Posting](https://developer.unipile.com/v2.0/reference/publishrecruiterjobposting).
  * Body param `mode` can only be `FREE` or `PROMOTED` as `PROMOTED_PLUS` is specific to **Classic**.
  * Body param `hiring_photo_frame` is removed as it doesn't apply to Recruiter.
  * Param `monthly` in body param `budget` is renamed to `total`.
* Common changes :
  * Path param `draft_id` is renamed to `job_id`.
  * Body param `service` is removed as it is no longer relevant.

<br />

## Solve a job publishing checkpoint

`POST /v1/linkedin/jobs/:draft_id/checkpoint`

This endpoint is removed as member privilegies verification is no longer considered a checkpoint.

<Callout icon="👍" theme="okay">
  ### Recommendations

  If you encounter an `insufficient_permissions` error after calling the job posting publish endpoint, you may need to verify your identity with the company on behalf of which you are posting the job offer. Use the following endpoints depending on the product :

  - On **Classic**, use `POST /v2/:account_id/linkedin/company/:company_id/member/verify-email` [Verify Company Member Identity](https://developer.unipile.com/v2.0/reference/verifyclassiccompanymemberidentity).
    - Then use `POST /v2/:account_id/linkedin/company/:company_id/member/submit-otp` [Submit Otp Verification Code](https://developer.unipile.com/v2.0/reference/submitclassiccompanyotpcode) to submit your verification code.
  - On **Recruiter**, use `POST /v2/:account_id/linkedin/recruiter/company/:company_id/member/verify-email` [Verify Company Member Identity](https://developer.unipile.com/v2.0/reference/verifyrecruitercompanymemberidentity).
    - Then use `POST /v2/:account_id/linkedin/recruiter/company/:company_id/member/submit-otp` [Submit Otp Verification Code](https://developer.unipile.com/v2.0/reference/submitrecruiterotpcode) to submit your verification code.
</Callout>

<br />

## Close a job posting

`POST /v1/linkedin/jobs/:id/close`

* On **Classic**, use `POST /v2/:account_id/linkedin/jobs/:job_id/close` [Close a Job Posting](https://developer.unipile.com/v2.0/reference/closeclassicjobposting).
* On **Recruiter**, use `POST /v2/:account_id/linkedin/recruiter/projects/:project_id/jobs/:job_id/close` [Close a Job Posting](https://developer.unipile.com/v2.0/reference/closerecruiterjobposting).
* Common changes :
  * Path param `id` is renamed to `job_id`.
  * Query param `service` is removed as it is no longer relevant.

<br />

## List all applicants to a job posting

`GET /v1/linkedin/jobs/:id/applicants`

* On **Classic**, use `POST /v2/:account_id/linkedin/jobs/:job_id/applicants` [List Job Posting Applicants](https://developer.unipile.com/v2.0/reference/getclassicapplicants).
  * Query param `ratings` is no longer a string containing multiple values, but a string array.
  * Query param `sort_by` has changed.
    * Accepted enum values are now : `APPLIED_DATE`, `FIRST_NAME` or `LAST_NAME`.
  * Query params `max_years_in_company`, `min_years_in_company`, `max_years_in_position`, `min_years_in_position`, `exclude_degree` and `include_degree` are removed as they are specific to **Recruiter**.
* On **Recruiter**, use `POST /v2/:account_id/linkedin/recruiter/projects/:project_id/talent-pool/applicants` [List Job Posting Applicants](https://developer.unipile.com/v2.0/reference/getrecruitertalentpoolapplicants).
  * Query param `ratings` is removed as it is specific to **Classic**.
  * Enum values for query param `sort_by` are now uppercase.
  * Query params `min_years_in_company` and `max_years_in_company` are combined under the body param `years_in_current_company` (`min` and `max` properties).
  * Query params `min_years_in_position` and `max_years_in_position` are combined under the body param `years_in_current_position` (`min` and `max` properties).
  * Query params `include_degree` and `exclude_degree` are combined under the body param `degree` (`include` and `exclude` properties).
* Common changes :
  * Http method is now `POST` instead of `GET`, and query params are integrated in the body.
  * Path param `id` is renamed to `job_id`.
  * Query param `service` is removed as it is no longer relevant.
  * Query params `min_years_of_experience` and `max_years_of_experience` are combined under the body param `years_of_experience` (`min` and `max` properties).

<br />

## Get a specific applicant to a job posting

`GET /v1/linkedin/jobs/applicants/:applicant_id`

* On **Classic**, use `GET /v2/:account_id/linkedin/jobs/:job_id/applicants/:applicant_id` [Get an Applicant](https://developer.unipile.com/v2.0/reference/getclassicapplicantbyid).
* On **Recruiter**, use `GET /v2/:account_id/linkedin/recruiter/projects/:project_id/talent-pool/applicants/:applicant_id` [Get an Applicant](https://developer.unipile.com/v2.0/reference/getrecruiterapplicantbyid).

<br />

## Download the resume of a job applicant

`GET v1/linkedin/jobs/applicants/:applicant_id/resume`

* On **Classic**, use `GET /v2/:account_id/linkedin/jobs/:job_id/applicants/:applicant_id/resume` [Get an Applicant's Resume](https://developer.unipile.com/v2.0/reference/getclassicapplicantresume).
* On **Recruiter**, use `GET /v2/:account_id/linkedin/recruiter/projects/:project_id/talent-pool/applicants/:applicant_id/resume` [Get an Applicant's Resume](https://developer.unipile.com/v2.0/reference/getrecruiterapplicantresume).

<br />

## Endorse a user profile specific skill

`POST /v1/linkedin/profile/endorse`

* Use `POST /v2/:account_id/linkedin/users/:user_id/endorse` [Get an Applicant's Resume](https://developer.unipile.com/v2.0/reference/getclassicapplicantresume).
  * Body param `profile_id` is renamed to `user_id` and moved to path params.

***

# Response objects changes

## CompanyProfile

| v1 CompanyProfile field                                                | v2 CompanyProfile mapping                            |
| :--------------------------------------------------------------------- | :--------------------------------------------------- |
| `entity_urn`                                                           | **Removed, use&#x20;**`id`**&#x20;instead.**         |
| `messaging`                                                            | `mailbox`                                            |
| `messaging.is_enabled`                                                 | `mailbox.enabled`                                    |
| `messaging.entity_urn`                                                 | **Removed, use&#x20;**`mailbox.id`**&#x20;instead.** |
| `claimed`                                                              | `is_claimable_by_viewer`                             |
| `viewer_permissions`                                                   | **Removed as not relevant.**                         |
| `organization_type`                                                    | **Removed as no longer available.**                  |
| `locations.country`                                                    | `locations.country_code`                             |
| `locations.postalCode`                                                 | `locations.postal_code`                              |
| `logo`                                                                 | `public_picture_url`                                 |
| `localized_description`<br />`localized_name`<br />`localized_tagline` | **Removed as not relevant.**                         |
| `employee_count`                                                       | `insights.headcount`                                 |
| `employee_count_range.from`                                            | `insights.headcount_range.min`                       |
| `employee_count_range.to`                                              | `insights.headcount_range.max`                       |
| `foundation_date`                                                      | `establishment_year`                                 |
| `crunchbase_funding`                                                   | `funding.crunchbase`                                 |
| `crunchbase_funding.rounds.url`                                        | `funding.crunchbase.rounds_url`                      |
| `crunchbase_funding.rounds.total_count`                                | `funding.crunchbase.rounds_count`                    |
| `crunchbase_funding.rounds.last_round`                                 | `funding.crunchbase.last_round`                      |
| `insights.employeesCount.totalCount`                                   | `insights.headcount`                                 |
| `insights.employeesCount.averageTenure`                                | `insights.average_tenure`                            |
| `insights.employeesCount.employeesCountGraph`                          | `insights.heacount_growth`                           |
| `insights.employeesCount.growthGraph`                                  | `insights.growth_periods`                            |
| `insights.employeesCount.growthGraph.monthRange`                       | `insights.growth_periods.months`                     |
| `insights.employeesCount.growthGraph.growthPercentage`                 | `insights.growth_periods.percentage`                 |

<br />

***

## SearchResult

### People

#### Common changes

| v1 SearchResult field         | v2 PeopleSearchResult mapping             |
| :---------------------------- | :---------------------------------------- |
| `type`                        | **Removed as no longer relevant.**        |
| `public_profile_url`          | `profile_url`                             |
| `profile_picture_url`         | `public_picture_url`                      |
| `profile_picture_url_large`   | `public_picture_url_large`                |
| `name`                        | `display_name`                            |
| `first_name`<br />`last_name` | **Removed, use&#x20;**`display_name`**.** |
| `connections_count`           | `relations_count`                         |

#### Classic changes

| v1 SearchResult field      | v2 PeopleSearchResult mapping |
| :------------------------- | :---------------------------- |
| `verified`                 | `is_verified`                 |
| `premium`                  | `is_premium`                  |
| `open_profile`             | `is_open_profile`             |
| `shared_connections_count` | `shared_relations_count`      |

#### Recruiter changes

| v1 SearchResult field                                                              | v2 PeopleSearchResult mapping         |
| :--------------------------------------------------------------------------------- | :------------------------------------ |
| `recruiter_candidate_id`                                                           | `candidate_id`                        |
| `hiddenCandidate`                                                                  | `is_hidden_candidate`                 |
| `recruiter_pipeline_category`                                                      | `pipeline_stage`                      |
| `shared_connections_count`                                                         | `shared_relations_count`              |
| `current_positions`<br />`work_experience`                                         | `work_experience`                     |
| `work_experience.company`                                                          | `work_experience.company.name`        |
| `work_experience.company_id`                                                       | `work_experience.company.id`          |
| `work_experience.company_url`                                                      | `work_experience.company.profile_url` |
| `current_positions.company_description`<br />`current_positions.company_headcount` | **Removed as no longer available.**   |
| `current_positions.logo`                                                           | `work_experience.company.picture_url` |
| `current_positions.role`                                                           | `work_experience.job_title`           |
| `current_positions`                                                                | `work_experience`                     |
| `current_positions`                                                                | `work_experience`                     |
| `current_positions`                                                                | `work_experience`                     |
| `current_positions`                                                                | `work_experience`                     |
| `current_positions`                                                                | `work_experience`                     |
| `current_positions`                                                                | `work_experience`                     |

### LinkedinSearch

***

## LinkedinRawData

***

## LinkedinSearchParameter

### LinkedinSearchParametersList

***

## LinkedinJobPosting

### LinkedinJobPostingList

***

## LinkedinJobApplicant

### LinkedinJobApplicantList

***

## RecruiterHiringProject

### RecruiterHiringProjectList

***

## InmailCredits