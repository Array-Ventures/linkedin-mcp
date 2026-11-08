---
updatedAt: 2026-04-24T15:33:11.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Get the Budget for a Job Posting

Returns available budget ranges, recommended budgets, and estimated impact.

# OpenAPI definition

```json
{
  "openapi": "3.1.0",
  "info": {
    "title": "Unipile API",
    "description": "Unified API for messaging, calendars, emails and socials.",
    "version": "2.65.1",
    "contact": {
      "name": "Unipile",
      "url": "https://www.unipile.com/contact-us/"
    }
  },
  "servers": [
    {
      "url": "https://api.unipile.com"
    }
  ],
  "security": [
    {
      "apiKey": []
    }
  ],
  "tags": [
    {
      "name": "LinkedIn",
      "description": "Specific LinkedIn methods"
    }
  ],
  "paths": {
    "/v2/{account_id}/linkedin/recruiter/projects/{project_id}/jobs/{job_id}/budget": {
      "get": {
        "operationId": "getRecruiterJobPostingBudget",
        "summary": "Get the Budget for a Job Posting",
        "tags": [
          "LinkedIn"
        ],
        "description": "Returns available budget ranges, recommended budgets, and estimated impact.",
        "parameters": [
          {
            "schema": {
              "type": "string"
            },
            "in": "path",
            "name": "project_id",
            "required": true,
            "description": "The ID of the project associated with the the job."
          },
          {
            "schema": {
              "type": "string"
            },
            "in": "path",
            "name": "job_id",
            "required": true,
            "description": "The ID of the job to get the budget of."
          },
          {
            "schema": {
              "type": "string",
              "pattern": "^acc_(.*)$"
            },
            "in": "path",
            "name": "account_id",
            "required": true,
            "description": "ID of the Account (acc_xxx) to call the method on behalf of."
          }
        ],
        "x-samples-languages": [
          "node",
          "python",
          "curl"
        ],
        "x-code-samples": [
          {
            "name": "Get recruiter job posting budget",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipileLinkedIn } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipileLinkedIn = new UnipileLinkedIn({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipileLinkedIn.getRecruiterJobPostingBudget(\n  {\n    path: {\n      project_id: 'project_id',\n      job_id: 'job_id',\n      account_id: ACCOUNT_ID,\n    },\n  }\n);"
          },
          {
            "name": "Get recruiter job posting budget",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    linked_in_api = unipile.LinkedInApi(api_client)\n\nresponse = linked_in_api.get_recruiter_job_posting_budget(\n    'project_id',\n    'job_id',\n    ACCOUNT_ID\n)"
          }
        ],
        "responses": {
          "200": {
            "description": "Default Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "required": [
                    "object",
                    "product",
                    "promoted",
                    "free"
                  ],
                  "properties": {
                    "object": {
                      "type": "string",
                      "enum": [
                        "JobPostingBudget"
                      ]
                    },
                    "product": {
                      "type": "string",
                      "enum": [
                        "recruiter"
                      ]
                    },
                    "promoted": {
                      "type": "object",
                      "required": [
                        "currency",
                        "daily",
                        "total",
                        "estimated_daily_applicants_count"
                      ],
                      "properties": {
                        "currency": {
                          "description": "The Budget currency.",
                          "type": "string"
                        },
                        "daily": {
                          "type": "object",
                          "required": [
                            "min",
                            "max",
                            "recommended"
                          ],
                          "properties": {
                            "min": {
                              "description": "The minimum Budget amount to be spent.",
                              "type": "number"
                            },
                            "max": {
                              "description": "The maximum Budget amount to be spent.",
                              "type": "number"
                            },
                            "recommended": {
                              "description": "The recommended Budget amount to be spent.",
                              "type": "number"
                            }
                          }
                        },
                        "total": {
                          "type": "object",
                          "required": [
                            "min",
                            "max",
                            "recommended"
                          ],
                          "properties": {
                            "min": {
                              "description": "The minimum Budget amount to be spent.",
                              "type": "number"
                            },
                            "max": {
                              "description": "The maximum Budget amount to be spent.",
                              "type": "number"
                            },
                            "recommended": {
                              "description": "The recommended Budget amount to be spent.",
                              "type": "number"
                            }
                          }
                        },
                        "estimated_daily_applicants_count": {
                          "description": "The estimated number of applicants per day.",
                          "type": "number"
                        }
                      }
                    },
                    "free": {
                      "description": "Free mode.",
                      "type": "object",
                      "required": [
                        "eligible"
                      ],
                      "properties": {
                        "eligible": {
                          "description": "Whether the job posting can be published for free.",
                          "type": "boolean"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  "components": {
    "securitySchemes": {
      "apiKey": {
        "type": "apiKey",
        "in": "header",
        "name": "X-API-KEY"
      }
    }
  }
}
```