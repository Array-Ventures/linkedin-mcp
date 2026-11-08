---
updatedAt: 2026-04-24T15:33:11.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# List Search Parameters

Returns a list of parameters to be used in the search route.

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
    "/v2/{account_id}/linkedin/search/parameters": {
      "get": {
        "operationId": "getClassicSearchParameters",
        "summary": "List Search Parameters",
        "tags": [
          "LinkedIn"
        ],
        "description": "Returns a list of parameters to be used in the search route.",
        "parameters": [
          {
            "schema": {
              "type": "string",
              "enum": [
                "LOCATION",
                "COMPANY",
                "RELATION",
                "PEOPLE",
                "SCHOOL",
                "INDUSTRY",
                "SERVICE",
                "JOB_FUNCTION",
                "JOB_TITLE",
                "EMPLOYMENT_TYPE",
                "SKILL"
              ]
            },
            "in": "query",
            "name": "type",
            "required": true,
            "description": "The type of search parameter."
          },
          {
            "schema": {
              "type": "string"
            },
            "in": "query",
            "name": "keywords",
            "required": true,
            "description": "A keyword or group of keywords to filter results."
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
            "name": "Get classic search parameters",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipileLinkedIn } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipileLinkedIn = new UnipileLinkedIn({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipileLinkedIn.getClassicSearchParameters(\n  {\n    path: {\n      account_id: ACCOUNT_ID,\n    },\n    query: {\n      type: 'LOCATION',\n      keywords: 'value',\n    },\n  }\n);"
          },
          {
            "name": "Get classic search parameters",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    linked_in_api = unipile.LinkedInApi(api_client)\n\nresponse = linked_in_api.get_classic_search_parameters(\n    ACCOUNT_ID,\n    'LOCATION',\n    'value'\n)"
          }
        ],
        "responses": {
          "200": {
            "description": "Default Response",
            "content": {
              "application/json": {
                "schema": {
                  "title": "Search parameters list",
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
                          "id",
                          "name"
                        ],
                        "properties": {
                          "object": {
                            "type": "string",
                            "enum": [
                              "SearchParameter"
                            ]
                          },
                          "id": {
                            "description": "The identifier of the search parameter.",
                            "type": "string"
                          },
                          "name": {
                            "description": "The display name of the search parameter.",
                            "type": "string"
                          },
                          "metadata": {
                            "description": "Metadata about the current parameter.",
                            "anyOf": [
                              {
                                "title": "Sales navigator saved search",
                                "type": "object",
                                "required": [
                                  "object",
                                  "product",
                                  "last_viewed_at",
                                  "new_results_count"
                                ],
                                "properties": {
                                  "object": {
                                    "type": "string",
                                    "enum": [
                                      "SavedSearchMetadata"
                                    ]
                                  },
                                  "product": {
                                    "type": "string",
                                    "enum": [
                                      "sales_navigator"
                                    ]
                                  },
                                  "last_viewed_at": {
                                    "type": "string"
                                  },
                                  "new_results_count": {
                                    "type": "number"
                                  }
                                }
                              },
                              {
                                "title": "Recruiter saved search",
                                "type": "object",
                                "required": [
                                  "object",
                                  "product",
                                  "query",
                                  "new_results_count"
                                ],
                                "properties": {
                                  "object": {
                                    "type": "string",
                                    "enum": [
                                      "SavedSearchMetadata"
                                    ]
                                  },
                                  "product": {
                                    "type": "string",
                                    "enum": [
                                      "recruiter"
                                    ]
                                  },
                                  "query": {
                                    "type": "string"
                                  },
                                  "new_results_count": {
                                    "type": "number"
                                  },
                                  "project": {
                                    "type": "object",
                                    "required": [
                                      "id",
                                      "name"
                                    ],
                                    "properties": {
                                      "id": {
                                        "type": "string"
                                      },
                                      "name": {
                                        "type": "string"
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