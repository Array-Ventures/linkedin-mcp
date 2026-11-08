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
    "/v2/{account_id}/linkedin/jobs/{job_id}": {
      "get": {
        "operationId": "getClassicJobPosting",
        "summary": "Get a Job Posting",
        "tags": [
          "LinkedIn"
        ],
        "description": "Retrieves a job posting by its ID.",
        "parameters": [
          {
            "schema": {
              "default": "raw_text",
              "type": "string",
              "enum": [
                "raw_text",
                "html"
              ]
            },
            "in": "query",
            "name": "description_format",
            "required": false,
            "description": "The format of the job description."
          },
          {
            "schema": {
              "type": "array",
              "items": {
                "type": "string",
                "enum": [
                  "hiring_team",
                  "salary",
                  "benefits"
                ]
              }
            },
            "in": "query",
            "name": "with_sections",
            "required": false,
            "description": "Sections that should be included with the job posting."
          },
          {
            "schema": {
              "type": "string"
            },
            "in": "path",
            "name": "job_id",
            "required": true,
            "description": "The ID of the Job to be retrieved."
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
            "name": "Get classic job posting",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipileLinkedIn } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipileLinkedIn = new UnipileLinkedIn({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipileLinkedIn.getClassicJobPosting(\n  {\n    path: {\n      job_id: 'job_id',\n      account_id: ACCOUNT_ID,\n    },\n  }\n);"
          },
          {
            "name": "Get classic job posting",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    linked_in_api = unipile.LinkedInApi(api_client)\n\nresponse = linked_in_api.get_classic_job_posting(\n    'job_id',\n    ACCOUNT_ID\n)"
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
                    "title",
                    "company",
                    "location",
                    "state",
                    "is_repost",
                    "is_application_limit_reached",
                    "industries",
                    "created_at",
                    "description",
                    "views_count",
                    "applications_count",
                    "screening_questions"
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
                        "classic"
                      ]
                    },
                    "id": {
                      "description": "The ID of the Job posting.",
                      "type": "string"
                    },
                    "title": {
                      "description": "The title of the Job posting.",
                      "type": "string"
                    },
                    "company": {
                      "description": "The company that published the Job posting.",
                      "type": "object",
                      "required": [
                        "id",
                        "name"
                      ],
                      "properties": {
                        "id": {
                          "description": "The ID of the Company.",
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
                          "description": "The name of the Company.",
                          "type": "string"
                        },
                        "public_picture_url": {
                          "description": "The public picture URL of the Company.",
                          "type": "string"
                        },
                        "profile_url": {
                          "description": "The profile URL of the Company.",
                          "type": "string"
                        },
                        "public_identifier": {
                          "description": "The public identifier of the Company.",
                          "type": "string"
                        }
                      }
                    },
                    "location": {
                      "description": "The location of the Job posting.",
                      "type": "string"
                    },
                    "state": {
                      "description": "The state of the Job posting.",
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
                      "description": "The type of workplace of the Job posting.",
                      "type": "string",
                      "enum": [
                        "ON_SITE",
                        "HYBRID",
                        "REMOTE"
                      ]
                    },
                    "is_repost": {
                      "description": "Whether the Job posting is a repost.",
                      "type": "boolean"
                    },
                    "is_application_limit_reached": {
                      "description": "Whether the Job posting has reached the maximum number of applications.",
                      "type": "boolean"
                    },
                    "industries": {
                      "description": "The industries associated with the Job posting.",
                      "type": "array",
                      "items": {
                        "type": "string"
                      }
                    },
                    "employment_status": {
                      "description": "The employment status of the Job posting.",
                      "type": "string",
                      "enum": [
                        "FULL_TIME",
                        "PART_TIME",
                        "CONTRACT",
                        "TEMPORARY",
                        "OTHER",
                        "VOLUNTEER",
                        "INTERNSHIP"
                      ]
                    },
                    "created_at": {
                      "description": "The date on which the Job posting was created. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                      "type": "string"
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
                    "budget": {
                      "description": "The budget allocated to the Job posting.",
                      "type": "object",
                      "required": [
                        "total",
                        "daily"
                      ],
                      "properties": {
                        "total": {
                          "description": "The total Budget.",
                          "type": "object",
                          "required": [
                            "amount",
                            "currency"
                          ],
                          "properties": {
                            "amount": {
                              "description": "The Budget amount to be spent.",
                              "type": "number"
                            },
                            "currency": {
                              "description": "The Budget currency.",
                              "type": "string"
                            }
                          }
                        },
                        "daily": {
                          "description": "The daily Budget.",
                          "type": "object",
                          "required": [
                            "amount",
                            "currency"
                          ],
                          "properties": {
                            "amount": {
                              "description": "The Budget amount to be spent.",
                              "type": "number"
                            },
                            "currency": {
                              "description": "The Budget currency.",
                              "type": "string"
                            }
                          }
                        }
                      }
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
                          "is_eliminatory",
                          "choices"
                        ],
                        "properties": {
                          "question": {
                            "description": "The text of the question.",
                            "type": "string"
                          },
                          "is_eliminatory": {
                            "description": "Whether an answer that does not meet expectations is eliminatory.",
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
                    "salary": {
                      "description": "The salary offered in the job posting.",
                      "type": "string"
                    },
                    "benefits": {
                      "description": "A list of benefits offered in the Job posting.",
                      "type": "array",
                      "items": {
                        "type": "string"
                      }
                    },
                    "hiring_team": {
                      "description": "A list of hiring team members for the Job posting.",
                      "type": "array",
                      "items": {
                        "type": "object",
                        "required": [
                          "id",
                          "full_name",
                          "role",
                          "public_profile_url"
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
                          "role": {
                            "description": "The role of the Hiring team member.",
                            "type": "string"
                          },
                          "public_profile_url": {
                            "description": "The public profile URL of the Hiring team member.",
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