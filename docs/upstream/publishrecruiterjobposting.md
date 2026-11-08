---
updatedAt: 2026-04-24T15:33:11.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Publish a Job Posting

Publishes a job posting with specific budget options.

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
    "/v2/{account_id}/linkedin/recruiter/projects/{project_id}/jobs/{job_id}/publish": {
      "post": {
        "operationId": "publishRecruiterJobPosting",
        "summary": "Publish a Job Posting",
        "tags": [
          "LinkedIn"
        ],
        "description": "Publishes a job posting with specific budget options.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "anyOf": [
                  {
                    "title": "Publish in Free mode",
                    "description": "⚠️ Requires eligibility",
                    "type": "object",
                    "required": [
                      "mode"
                    ],
                    "properties": {
                      "bypass_email_verification": {
                        "description": "Whether not to verify if you're allowed to post a job on behalf on the current company.",
                        "default": false,
                        "type": "boolean"
                      },
                      "mode": {
                        "type": "string",
                        "enum": [
                          "FREE"
                        ]
                      }
                    }
                  },
                  {
                    "title": "Publish in Promoted mode",
                    "type": "object",
                    "required": [
                      "mode"
                    ],
                    "properties": {
                      "bypass_email_verification": {
                        "description": "Whether not to verify if you're allowed to post a job on behalf on the current company.",
                        "default": false,
                        "type": "boolean"
                      },
                      "mode": {
                        "type": "string",
                        "enum": [
                          "PROMOTED"
                        ]
                      },
                      "budget": {
                        "description": "Leave this field blank if you don't have a choice of budget when posting a job on LinkedIn, or if you have available prepaid job slots.",
                        "type": "object",
                        "required": [
                          "currency",
                          "amount",
                          "scope"
                        ],
                        "properties": {
                          "currency": {
                            "maxLength": 3,
                            "minLength": 3,
                            "description": "A 3 capital letters ISO 4217 currency code.",
                            "type": "string"
                          },
                          "amount": {
                            "description": "The amount of money to be spent on the job posting.",
                            "type": "number"
                          },
                          "scope": {
                            "description": "The time scope of the budget.",
                            "type": "string",
                            "enum": [
                              "DAILY",
                              "TOTAL"
                            ]
                          }
                        }
                      }
                    }
                  }
                ]
              }
            }
          }
        },
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
            "description": "The ID of the job to publish."
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
            "name": "Publish recruiter job posting",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipileLinkedIn } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipileLinkedIn = new UnipileLinkedIn({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipileLinkedIn.publishRecruiterJobPosting(\n  {\n    path: {\n      project_id: 'project_id',\n      job_id: 'job_id',\n      account_id: ACCOUNT_ID,\n    },\n    body: {\n      mode: 'FREE',\n    },\n  }\n);"
          },
          {
            "name": "Publish recruiter job posting",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    linked_in_api = unipile.LinkedInApi(api_client)\n\nresponse = linked_in_api.publish_recruiter_job_posting(\n    'project_id',\n    'job_id',\n    ACCOUNT_ID,\n    {\n    'mode': 'FREE',\n  }\n)"
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
                    "job_state"
                  ],
                  "properties": {
                    "object": {
                      "type": "string",
                      "enum": [
                        "JobPostingPublished"
                      ]
                    },
                    "job_state": {
                      "description": "The new state of the Job posting.",
                      "anyOf": [
                        {
                          "type": "string",
                          "enum": [
                            "DRAFT"
                          ]
                        },
                        {
                          "type": "string",
                          "enum": [
                            "OPEN"
                          ]
                        },
                        {
                          "type": "string",
                          "enum": [
                            "CLOSED"
                          ]
                        },
                        {
                          "type": "string",
                          "enum": [
                            "REVIEW"
                          ]
                        },
                        {
                          "type": "string",
                          "enum": [
                            "SUSPENDED"
                          ]
                        }
                      ]
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