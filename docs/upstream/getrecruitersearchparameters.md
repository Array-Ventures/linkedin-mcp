---
updatedAt: 2026-04-24T15:33:11.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# List Search Parameters

Returns a list of parameters to be used in Recruiter search endpoints.

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
    "/v2/{account_id}/linkedin/recruiter/search/parameters": {
      "post": {
        "operationId": "getRecruiterSearchParameters",
        "summary": "List Search Parameters",
        "tags": [
          "LinkedIn"
        ],
        "description": "Returns a list of parameters to be used in Recruiter search endpoints.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "anyOf": [
                  {
                    "title": "Applicants sourced",
                    "additionalProperties": false,
                    "type": "object",
                    "required": [
                      "source",
                      "project_id",
                      "type"
                    ],
                    "properties": {
                      "source": {
                        "type": "string",
                        "enum": [
                          "APPLICANTS"
                        ]
                      },
                      "project_id": {
                        "description": "The ID of the Project associated with the Talent pool.",
                        "type": "string"
                      },
                      "keywords": {
                        "description": "A keyword or group of keywords to filter results. Applicable to TAG only.",
                        "type": "string"
                      },
                      "type": {
                        "description": "The type of search parameter.",
                        "type": "string",
                        "enum": [
                          "SKILL",
                          "LOCATION",
                          "JOB_TITLE",
                          "JOB_FUNCTION",
                          "COMPANY",
                          "CURRENT_COMPANY",
                          "INDUSTRY",
                          "FIELD_OF_STUDY",
                          "DEGREE",
                          "TAG",
                          "SPOKEN_LANGUAGE"
                        ]
                      }
                    }
                  },
                  {
                    "title": "Pipeline sourced",
                    "additionalProperties": false,
                    "type": "object",
                    "required": [
                      "source",
                      "project_id",
                      "type"
                    ],
                    "properties": {
                      "source": {
                        "type": "string",
                        "enum": [
                          "PIPELINE"
                        ]
                      },
                      "project_id": {
                        "description": "The ID of the Project the Pipeline belongs to.",
                        "type": "string"
                      },
                      "stage_id": {
                        "description": "In Pipeline context, the ID of the Stage to get parameters from. Leave undefined to get results from all stages.",
                        "type": "string"
                      },
                      "keywords": {
                        "description": "A keyword or group of keywords to filter results. Applicable to SEAT only.",
                        "type": "string"
                      },
                      "type": {
                        "description": "The type of search parameter.",
                        "type": "string",
                        "enum": [
                          "SEAT",
                          "SKILL",
                          "CURRENT_COMPANY",
                          "JOB_TITLE",
                          "LOCATION"
                        ]
                      }
                    }
                  },
                  {
                    "title": "Search or Job posting sourced",
                    "additionalProperties": false,
                    "type": "object",
                    "required": [
                      "source",
                      "type"
                    ],
                    "properties": {
                      "source": {
                        "type": "string",
                        "enum": [
                          "SEARCH",
                          "JOB_POSTING"
                        ]
                      },
                      "keywords": {
                        "description": "A keyword or group of keywords to filter results. Not applicable to JOB_FUNCTION, PROFILE_LANGUAGE and CUSTOM_FILTER.",
                        "type": "string"
                      },
                      "type": {
                        "description": "The type of search parameter.",
                        "type": "string",
                        "enum": [
                          "OCCUPATION",
                          "JOB_TITLE",
                          "JOB_FUNCTION",
                          "LOCATION",
                          "ZIPCODE",
                          "SKILL",
                          "COMPANY",
                          "SCHOOL",
                          "INDUSTRY",
                          "GROUP",
                          "PROJECT",
                          "CUSTOM_FILTER",
                          "PROFILE_LANGUAGE",
                          "SPOKEN_LANGUAGE",
                          "SEAT",
                          "SAVED_SEARCH",
                          "DEGREE"
                        ]
                      }
                    }
                  },
                  {
                    "title": "Jobs sourced",
                    "additionalProperties": false,
                    "type": "object",
                    "required": [
                      "source",
                      "type"
                    ],
                    "properties": {
                      "source": {
                        "type": "string",
                        "enum": [
                          "JOBS"
                        ]
                      },
                      "keywords": {
                        "description": "A keyword or group of keywords to filter results.",
                        "type": "string"
                      },
                      "type": {
                        "description": "The type of search parameter.",
                        "type": "string",
                        "enum": [
                          "CONTRACT",
                          "SEAT",
                          "LOCATION"
                        ]
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
            "name": "Get recruiter search parameters",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipileLinkedIn } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipileLinkedIn = new UnipileLinkedIn({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipileLinkedIn.getRecruiterSearchParameters(\n  {\n    path: {\n      account_id: ACCOUNT_ID,\n    },\n    body: {\n      source: 'APPLICANTS',\n      project_id: 'project_id',\n      type: 'SKILL',\n    },\n  }\n);"
          },
          {
            "name": "Get recruiter search parameters",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    linked_in_api = unipile.LinkedInApi(api_client)\n\nresponse = linked_in_api.get_recruiter_search_parameters(\n    ACCOUNT_ID,\n    {\n    'source': 'APPLICANTS',\n    'project_id': 'project_id',\n    'type': 'SKILL',\n  }\n)"
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