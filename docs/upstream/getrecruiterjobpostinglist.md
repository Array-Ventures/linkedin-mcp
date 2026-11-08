---
updatedAt: 2026-04-24T15:33:11.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# List Job Postings

Returns a list of job postings created by the current user or related job posters.

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
    "/v2/{account_id}/linkedin/recruiter/jobs": {
      "get": {
        "operationId": "getRecruiterJobPostingList",
        "summary": "List Job Postings",
        "tags": [
          "LinkedIn"
        ],
        "description": "Returns a list of job postings created by the current user or related job posters.",
        "parameters": [
          {
            "schema": {
              "type": "array",
              "items": {
                "description": "\n  \nNative filter : Job status\n  ",
                "default": "OPEN",
                "type": "string",
                "enum": [
                  "DRAFT",
                  "OPEN",
                  "CLOSED",
                  "REVIEW",
                  "SUSPENDED"
                ]
              }
            },
            "in": "query",
            "name": "state",
            "required": false,
            "description": "A list of job posting states."
          },
          {
            "schema": {
              "default": "LAST_ACCESS_TIME",
              "type": "string",
              "enum": [
                "LAST_ACCESS_TIME",
                "CHRONOLOGICAL",
                "REVERSE_CHRONOLOGICAL"
              ]
            },
            "in": "query",
            "name": "sort_by",
            "required": false,
            "description": "The sort method.\n  \nNative filter : Sort by\n  "
          },
          {
            "schema": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "in": "query",
            "name": "location",
            "required": false,
            "description": "A list of parameter IDs. Use <a href=\"https://developer.unipile.com/v2.0/reference/getrecruitersearchparameters\">List Search Parameters</a> with `LOCATION` type to find out the possible values.\n  \nNative filter : Location\n  "
          },
          {
            "schema": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "in": "query",
            "name": "job_poster",
            "required": false,
            "description": "A list of parameter IDs. Use <a href=\"https://developer.unipile.com/v2.0/reference/getrecruitersearchparameters\">List Search Parameters</a> with `SEAT` type to find out the possible values.\n  \nNative filter : Job poster\n  "
          },
          {
            "schema": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "in": "query",
            "name": "contract",
            "required": false,
            "description": "A list of parameter IDs. Use <a href=\"https://developer.unipile.com/v2.0/reference/getrecruitersearchparameters\">List Search Parameters</a> with `CONTRACT` type to find out the possible values.\n  \nNative filter : Contract\n  "
          },
          {
            "schema": {
              "type": "array",
              "items": {
                "type": "string",
                "enum": [
                  "ON_SITE",
                  "REMOTE",
                  "HYBRID"
                ]
              }
            },
            "in": "query",
            "name": "workplace_type",
            "required": false,
            "description": "A list of workplace types.\n  \nNative filter : Workplace type\n  "
          },
          {
            "schema": {
              "type": "number"
            },
            "in": "query",
            "name": "offset",
            "required": false,
            "description": "An offset used for pagination."
          },
          {
            "schema": {
              "default": 10,
              "minimum": 1,
              "maximum": 100,
              "type": "number"
            },
            "in": "query",
            "name": "limit",
            "required": false,
            "description": "The limit of items to be returned. The maximum allowed value depends on the provider. This is a ceiling, not a guarantee: some providers can return fewer items than requested for a given page."
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
            "name": "Get recruiter job posting list",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipileLinkedIn } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipileLinkedIn = new UnipileLinkedIn({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipileLinkedIn.getRecruiterJobPostingList(\n  {\n    path: {\n      account_id: ACCOUNT_ID,\n    },\n  }\n);"
          },
          {
            "name": "Get recruiter job posting list",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    linked_in_api = unipile.LinkedInApi(api_client)\n\nresponse = linked_in_api.get_recruiter_job_posting_list(\n    ACCOUNT_ID\n)"
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
                    "data"
                  ],
                  "properties": {
                    "data": {
                      "type": "array",
                      "items": {
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
                          "applications_count",
                          "views_count"
                        ],
                        "properties": {
                          "object": {
                            "type": "string",
                            "enum": [
                              "JobPostingListItem"
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
                            "type": "string"
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
                          "applications_count": {
                            "description": "The number of applications for this Job posting.",
                            "type": "number"
                          },
                          "views_count": {
                            "description": "The number of visits to this Job posting.",
                            "type": "number"
                          }
                        }
                      }
                    },
                    "total_count": {
                      "description": "Total number of results if supported by the provider.",
                      "type": "number"
                    },
                    "next_cursor": {
                      "description": "Cursor to get the next page of results if supported. Else use `offset`.",
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