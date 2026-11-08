---
updatedAt: 2026-04-24T15:33:11.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Get a Job Posting

Retrieves a job posting by its ID.

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
    "/v2/{account_id}/linkedin/recruiter/jobs/{job_id}": {
      "get": {
        "operationId": "getRecruiterJobPostingById",
        "summary": "Get a Job Posting",
        "tags": [
          "LinkedIn"
        ],
        "description": "Retrieves a job posting by its ID.",
        "parameters": [
          {
            "schema": {
              "type": "string"
            },
            "in": "path",
            "name": "job_id",
            "required": true,
            "description": "The ID of the job to be retrieved."
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
            "name": "Get recruiter job posting by id",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipileLinkedIn } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipileLinkedIn = new UnipileLinkedIn({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipileLinkedIn.getRecruiterJobPostingById(\n  {\n    path: {\n      job_id: 'job_id',\n      account_id: ACCOUNT_ID,\n    },\n  }\n);"
          },
          {
            "name": "Get recruiter job posting by id",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    linked_in_api = unipile.LinkedInApi(api_client)\n\nresponse = linked_in_api.get_recruiter_job_posting_by_id(\n    'job_id',\n    ACCOUNT_ID\n)"
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
                    "id",
                    "project_id",
                    "title",
                    "company",
                    "location",
                    "state",
                    "industries",
                    "job_functions",
                    "employment_status",
                    "experience_level",
                    "description",
                    "views_count",
                    "applications_count",
                    "hiring_team"
                  ],
                  "properties": {
                    "object": {
                      "type": "string",
                      "enum": [
                        "JobPosting"
                      ]
                    },
                    "product": {
                      "type": "string",
                      "enum": [
                        "recruiter"
                      ]
                    },
                    "id": {
                      "description": "The ID of the Job posting.",
                      "type": "string"
                    },
                    "project_id": {
                      "description": "The ID of the project associated with the Job posting.",
                      "type": "string"
                    },
                    "title": {
                      "description": "The title of the Job posting.",
                      "type": "string"
                    },
                    "company": {
                      "description": "The company on whose behalf the Job posting was published.",
                      "type": "object",
                      "required": [
                        "id",
                        "name"
                      ],
                      "properties": {
                        "id": {
                          "description": "The ID of the company",
                          "anyOf": [
                            {
                              "type": "string"
                            },
                            {
                              "type": "null"
                            }
                          ]
                        },
                        "name": {
                          "description": "The name of the company.",
                          "type": "string"
                        },
                        "public_picture_url": {
                          "description": "A link to the picture of the company.",
                          "type": "string"
                        },
                        "profile_url": {
                          "description": "A link to the public profile of the company.",
                          "type": "string"
                        }
                      }
                    },
                    "location": {
                      "description": "The location of the Job posting.",
                      "type": "string"
                    },
                    "state": {
                      "description": "The current state of the Job posting.",
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
                    },
                    "workplace_type": {
                      "description": "The workplace type of the Job posting.",
                      "type": "string",
                      "enum": [
                        "ON_SITE",
                        "HYBRID",
                        "REMOTE"
                      ]
                    },
                    "industries": {
                      "description": "A list of industries associated with the Job posting.",
                      "type": "array",
                      "items": {
                        "type": "string"
                      }
                    },
                    "job_functions": {
                      "description": "A list of job functions associated with the Job posting.",
                      "type": "array",
                      "items": {
                        "type": "string"
                      }
                    },
                    "employment_status": {
                      "description": "The employment status of the Job posting.",
                      "anyOf": [
                        {
                          "type": "string",
                          "enum": [
                            "FULL_TIME"
                          ]
                        },
                        {
                          "type": "string",
                          "enum": [
                            "PART_TIME"
                          ]
                        },
                        {
                          "type": "string",
                          "enum": [
                            "CONTRACT"
                          ]
                        },
                        {
                          "type": "string",
                          "enum": [
                            "TEMPORARY"
                          ]
                        },
                        {
                          "type": "string",
                          "enum": [
                            "OTHER"
                          ]
                        },
                        {
                          "type": "string",
                          "enum": [
                            "VOLUNTEER"
                          ]
                        },
                        {
                          "type": "string",
                          "enum": [
                            "INTERNSHIP"
                          ]
                        }
                      ]
                    },
                    "experience_level": {
                      "description": "The required level of experience of the Job posting.",
                      "anyOf": [
                        {
                          "type": "string",
                          "enum": [
                            "INTERNSHIP"
                          ]
                        },
                        {
                          "type": "string",
                          "enum": [
                            "ENTRY_LEVEL"
                          ]
                        },
                        {
                          "type": "string",
                          "enum": [
                            "ASSOCIATE"
                          ]
                        },
                        {
                          "type": "string",
                          "enum": [
                            "MID_SENIOR_LEVEL"
                          ]
                        },
                        {
                          "type": "string",
                          "enum": [
                            "DIRECTOR"
                          ]
                        },
                        {
                          "type": "string",
                          "enum": [
                            "EXECUTIVE"
                          ]
                        },
                        {
                          "type": "string",
                          "enum": [
                            "NOT_APPLICABLE"
                          ]
                        }
                      ]
                    },
                    "published_at": {
                      "description": "The date on which the Job posting was published. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                      "type": "string"
                    },
                    "expires_at": {
                      "description": "The date on which the Job posting will expire. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                      "type": "string"
                    },
                    "closed_at": {
                      "description": "The date on which the Job posting was closed. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                      "type": "string"
                    },
                    "description": {
                      "description": "The description of the Job posting.",
                      "type": "string"
                    },
                    "views_count": {
                      "description": "The number of visits to this Job posting.",
                      "type": "number"
                    },
                    "applications_count": {
                      "description": "The number of applications for this Job posting.",
                      "type": "number"
                    },
                    "company_apply_url": {
                      "description": "The application form URL of the company that published the Job posting.",
                      "type": "string"
                    },
                    "tracking_pixel_url": {
                      "description": "The tracking pixel URL of the company that published the Job posting.",
                      "type": "string"
                    },
                    "screening_questions": {
                      "description": "The screening questions of the Job posting.",
                      "type": "array",
                      "items": {
                        "type": "object",
                        "required": [
                          "question",
                          "is_eliminatory"
                        ],
                        "properties": {
                          "question": {
                            "description": "The text of the question.",
                            "type": "string"
                          },
                          "is_eliminatory": {
                            "description": "Whether an unexpected answer is considered a disqualifying factor.",
                            "type": "boolean"
                          },
                          "choices": {
                            "description": "A list of choices.",
                            "type": "array",
                            "items": {
                              "anyOf": [
                                {
                                  "type": "string"
                                },
                                {
                                  "type": "number"
                                }
                              ]
                            }
                          }
                        }
                      }
                    },
                    "hiring_team": {
                      "description": "A list of hiring team members for the Job posting.",
                      "type": "array",
                      "items": {
                        "type": "object",
                        "required": [
                          "id",
                          "full_name"
                        ],
                        "properties": {
                          "id": {
                            "description": "The ID of the Hiring team member.",
                            "type": "string"
                          },
                          "full_name": {
                            "description": "The full name of the Hiring team member.",
                            "type": "string"
                          },
                          "public_picture_url": {
                            "description": "The profile picture URL of the Hiring team member.",
                            "type": "string"
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