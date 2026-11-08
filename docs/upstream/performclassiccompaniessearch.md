---
updatedAt: 2026-04-24T15:33:11.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Perform Companies Search

Returns a list of companies from search results.

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
    "/v2/{account_id}/linkedin/search/companies": {
      "post": {
        "operationId": "performClassicCompaniesSearch",
        "summary": "Perform Companies Search",
        "tags": [
          "LinkedIn"
        ],
        "description": "Returns a list of companies from search results.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "additionalProperties": false,
                "type": "object",
                "properties": {
                  "keywords": {
                    "description": "A keyword or group of keywords.",
                    "type": "string"
                  },
                  "location": {
                    "description": "A list of parameter IDs. Use <a href=\"https://developer.unipile.com/v2.0/reference/getclassicsearchparameters\">List Search Parameters</a> with `LOCATION` type to find out the possible values.\n  \nNative filter : Locations\n  ",
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  },
                  "industry": {
                    "description": "A list of parameter IDs. Use <a href=\"https://developer.unipile.com/v2.0/reference/getclassicsearchparameters\">List Search Parameters</a> with `INDUSTRY` type to find out the possible values.\n  \nNative filter : Industry\n  ",
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  },
                  "headcount": {
                    "description": "A list of company headcount ranges.",
                    "type": "array",
                    "items": {
                      "description": "\n  \nNative filter : Company size\n  ",
                      "type": "object",
                      "properties": {
                        "min": {
                          "type": "number",
                          "enum": [
                            1,
                            11,
                            51,
                            201,
                            501,
                            1001,
                            5001,
                            10001
                          ],
                          "anyOf": [
                            {
                              "type": "number",
                              "enum": [
                                1
                              ]
                            },
                            {
                              "type": "number",
                              "enum": [
                                11
                              ]
                            },
                            {
                              "type": "number",
                              "enum": [
                                51
                              ]
                            },
                            {
                              "type": "number",
                              "enum": [
                                201
                              ]
                            },
                            {
                              "type": "number",
                              "enum": [
                                501
                              ]
                            },
                            {
                              "type": "number",
                              "enum": [
                                1001
                              ]
                            },
                            {
                              "type": "number",
                              "enum": [
                                5001
                              ]
                            },
                            {
                              "type": "number",
                              "enum": [
                                10001
                              ]
                            }
                          ]
                        },
                        "max": {
                          "type": "number",
                          "enum": [
                            10,
                            50,
                            200,
                            500,
                            1000,
                            5000,
                            10000
                          ],
                          "anyOf": [
                            {
                              "type": "number",
                              "enum": [
                                10
                              ]
                            },
                            {
                              "type": "number",
                              "enum": [
                                50
                              ]
                            },
                            {
                              "type": "number",
                              "enum": [
                                200
                              ]
                            },
                            {
                              "type": "number",
                              "enum": [
                                500
                              ]
                            },
                            {
                              "type": "number",
                              "enum": [
                                1000
                              ]
                            },
                            {
                              "type": "number",
                              "enum": [
                                5000
                              ]
                            },
                            {
                              "type": "number",
                              "enum": [
                                10000
                              ]
                            }
                          ]
                        }
                      }
                    }
                  },
                  "has_job_postings": {
                    "description": "Whether the companies should have active job postings on LinkedIn.\n  \nNative filter : Job listings on LinkedIn\n  ",
                    "type": "boolean"
                  },
                  "is_employing_relations": {
                    "description": "Whether the companies should have first degree relations among employees.\n  \nNative filter : Relations\n  ",
                    "type": "boolean"
                  }
                }
              }
            }
          }
        },
        "parameters": [
          {
            "schema": {
              "type": "string"
            },
            "in": "query",
            "name": "cursor",
            "required": false,
            "description": "A cursor used for pagination. Use `next_cursor` given by the previous page of the list."
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
            "name": "Perform classic companies search",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipileLinkedIn } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipileLinkedIn = new UnipileLinkedIn({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipileLinkedIn.performClassicCompaniesSearch(\n  {\n    path: {\n      account_id: ACCOUNT_ID,\n    },\n    body: {\n      keywords: 'value',\n    },\n  }\n);"
          },
          {
            "name": "Perform classic companies search",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    linked_in_api = unipile.LinkedInApi(api_client)\n\nresponse = linked_in_api.perform_classic_companies_search(\n    ACCOUNT_ID,\n    {\n    'keywords': 'value',\n  }\n)"
          }
        ],
        "responses": {
          "200": {
            "description": "Default Response",
            "content": {
              "application/json": {
                "schema": {
                  "title": "Companies search results",
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
                          "display_name",
                          "product"
                        ],
                        "properties": {
                          "object": {
                            "type": "string",
                            "enum": [
                              "CompanySearchResult"
                            ]
                          },
                          "id": {
                            "description": "The ID of the Company.",
                            "type": "string"
                          },
                          "display_name": {
                            "description": "The display name of the Company.",
                            "type": "string"
                          },
                          "public_identifier": {
                            "description": "The public identifier of the Company.",
                            "type": "string"
                          },
                          "profile_url": {
                            "description": "The profile URL of the Company.",
                            "type": "string"
                          },
                          "public_picture_url": {
                            "description": "The public picture URL of the Company.",
                            "type": "string"
                          },
                          "public_picture_url_large": {
                            "description": "The public picture URL of the Company in large size.",
                            "type": "string"
                          },
                          "location": {
                            "description": "The location of the Company.",
                            "type": "string"
                          },
                          "industry": {
                            "description": "The industry to which the Company belongs.",
                            "type": "string"
                          },
                          "summary": {
                            "description": "The summary of the Company's activities.",
                            "type": "string"
                          },
                          "relations_count": {
                            "description": "The number of the relations of the Company.",
                            "type": "number"
                          },
                          "product": {
                            "type": "string",
                            "enum": [
                              "classic"
                            ]
                          },
                          "job_postings_count": {
                            "description": "The number of job postings published by the Company.",
                            "type": "number"
                          },
                          "followers_count": {
                            "description": "The number of the followers of the Company.",
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