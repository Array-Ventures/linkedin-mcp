---
updatedAt: 2026-04-24T15:33:11.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# List User Job Postings

Returns a list of job postings created by the current user.

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
    "/v2/{account_id}/linkedin/jobs": {
      "get": {
        "operationId": "listClassicUserJobPostings",
        "summary": "List User Job Postings",
        "tags": [
          "LinkedIn"
        ],
        "description": "Returns a list of job postings created by the current user.",
        "parameters": [
          {
            "schema": {
              "type": "array",
              "items": {
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
            "required": true,
            "description": "A list of Job posting states."
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
            "name": "List classic user job postings",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipileLinkedIn } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipileLinkedIn = new UnipileLinkedIn({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipileLinkedIn.listClassicUserJobPostings(\n  {\n    path: {\n      account_id: ACCOUNT_ID,\n    },\n    query: {\n      state: 'DRAFT',\n    },\n  }\n);"
          },
          {
            "name": "List classic user job postings",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    linked_in_api = unipile.LinkedInApi(api_client)\n\nresponse = linked_in_api.list_classic_user_job_postings(\n    ACCOUNT_ID,\n    'DRAFT'\n)"
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
                          "title",
                          "company",
                          "state",
                          "applications_count"
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
                            "type": "string"
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
                                  "LISTED"
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
                            "description": "The number of applications for this job posting.",
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