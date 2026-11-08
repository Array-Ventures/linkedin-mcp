---
updatedAt: 2026-10-06T13:43:18.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# List Profile Views

Returns a list of users who recently viewed your profile, along with a range of analytics data.
      Non-premium users will only have access to a limited amount of data, and search filters will be ineffective.

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
    "/v2/{account_id}/linkedin/analytics/profile-views": {
      "get": {
        "operationId": "getProfileViews",
        "summary": "List Profile Views",
        "tags": [
          "LinkedIn"
        ],
        "description": "Returns a list of users who recently viewed your profile, along with a range of analytics data.\n      Non-premium users will only have access to a limited amount of data, and search filters will be ineffective.",
        "parameters": [
          {
            "schema": {
              "default": "DATE",
              "type": "string",
              "enum": [
                "DATE",
                "RELEVANCE"
              ]
            },
            "in": "query",
            "name": "sort_by",
            "required": false,
            "description": "The sort method."
          },
          {
            "schema": {
              "default": 90,
              "type": "number",
              "enum": [
                14,
                28,
                90,
                365
              ],
              "anyOf": [
                {
                  "type": "number",
                  "enum": [
                    14
                  ]
                },
                {
                  "type": "number",
                  "enum": [
                    28
                  ]
                },
                {
                  "type": "number",
                  "enum": [
                    90
                  ]
                },
                {
                  "type": "number",
                  "enum": [
                    365
                  ]
                }
              ]
            },
            "in": "query",
            "name": "date_range",
            "required": false,
            "description": "The number of days over which to retrieve profile views.\n  \nNative filter : Date range\n  "
          },
          {
            "schema": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "in": "query",
            "name": "industry",
            "required": false,
            "description": "A list of parameter IDs. Use <a href=\"https://developer.unipile.com/v2.0/reference/getclassicsearchparameters\">List Search Parameters</a> with `INDUSTRY` type to find out the possible values.\n  \nNative filter : Industry\n  "
          },
          {
            "schema": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "in": "query",
            "name": "company",
            "required": false,
            "description": "A list of parameter IDs. Use <a href=\"https://developer.unipile.com/v2.0/reference/getclassicsearchparameters\">List Search Parameters</a> with `COMPANY` type to find out the possible values.\n  \nNative filter : Company\n  "
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
            "description": "A list of parameter IDs. Use <a href=\"https://developer.unipile.com/v2.0/reference/getclassicsearchparameters\">List Search Parameters</a> with `LOCATION` type to find out the possible values.\n  \nNative filter : Location\n  "
          },
          {
            "schema": {
              "default": [
                "COMPANIES"
              ],
              "type": "array",
              "items": {
                "type": "string",
                "enum": [
                  "COMPANIES",
                  "INDUSTRIES",
                  "LOCATIONS"
                ]
              }
            },
            "in": "query",
            "name": "details_sections",
            "required": false,
            "description": "A list of additionnal sections to be included in the response analytics."
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
            "name": "Get profile views",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipileLinkedIn } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipileLinkedIn = new UnipileLinkedIn({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipileLinkedIn.getProfileViews(\n  {\n    path: {\n      account_id: ACCOUNT_ID,\n    },\n  }\n);"
          },
          {
            "name": "Get profile views",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    linked_in_api = unipile.LinkedInApi(api_client)\n\nresponse = linked_in_api.get_profile_views(\n    ACCOUNT_ID\n)"
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
                    "entities"
                  ],
                  "properties": {
                    "object": {
                      "type": "string",
                      "enum": [
                        "ProfileViews"
                      ]
                    },
                    "entities": {
                      "description": "A collection of profile view entities.",
                      "type": "array",
                      "items": {
                        "type": "object",
                        "required": [
                          "object",
                          "id",
                          "public_identifier",
                          "name",
                          "last_visited"
                        ],
                        "properties": {
                          "object": {
                            "type": "string",
                            "enum": [
                              "ProfileViewsEntity"
                            ]
                          },
                          "id": {
                            "anyOf": [
                              {
                                "type": "string"
                              },
                              {
                                "type": "null"
                              }
                            ]
                          },
                          "public_identifier": {
                            "type": "string"
                          },
                          "name": {
                            "type": "string"
                          },
                          "picture_url": {
                            "type": "string"
                          },
                          "network_distance": {
                            "anyOf": [
                              {
                                "type": "string",
                                "enum": [
                                  "SELF"
                                ]
                              },
                              {
                                "type": "string",
                                "enum": [
                                  "DISTANCE_1"
                                ]
                              },
                              {
                                "type": "string",
                                "enum": [
                                  "DISTANCE_2"
                                ]
                              },
                              {
                                "type": "string",
                                "enum": [
                                  "DISTANCE_3"
                                ]
                              },
                              {
                                "type": "string",
                                "enum": [
                                  "OUT_OF_NETWORK"
                                ]
                              }
                            ]
                          },
                          "premium": {
                            "type": "boolean"
                          },
                          "verified": {
                            "type": "boolean"
                          },
                          "last_visited": {
                            "anyOf": [
                              {
                                "type": "object",
                                "required": [
                                  "unit",
                                  "value"
                                ],
                                "properties": {
                                  "unit": {
                                    "anyOf": [
                                      {
                                        "type": "string",
                                        "enum": [
                                          "MINUTE"
                                        ]
                                      },
                                      {
                                        "type": "string",
                                        "enum": [
                                          "HOUR"
                                        ]
                                      },
                                      {
                                        "type": "string",
                                        "enum": [
                                          "DAY"
                                        ]
                                      },
                                      {
                                        "type": "string",
                                        "enum": [
                                          "WEEK"
                                        ]
                                      },
                                      {
                                        "type": "string",
                                        "enum": [
                                          "MONTH"
                                        ]
                                      },
                                      {
                                        "type": "string",
                                        "enum": [
                                          "YEAR"
                                        ]
                                      }
                                    ]
                                  },
                                  "value": {
                                    "minimum": 0,
                                    "type": "integer"
                                  }
                                }
                              },
                              {
                                "type": "null"
                              }
                            ]
                          }
                        }
                      }
                    },
                    "analytics": {
                      "description": "Profile views analytics will only be present in the first request of a series of paginated requests.",
                      "type": "object",
                      "required": [
                        "object",
                        "views_count"
                      ],
                      "properties": {
                        "object": {
                          "type": "string",
                          "enum": [
                            "ProfileViewsAnalytics"
                          ]
                        },
                        "views_count": {
                          "type": "number"
                        },
                        "highlights": {
                          "type": "object",
                          "properties": {
                            "top_location": {
                              "type": "string"
                            },
                            "top_company": {
                              "type": "string"
                            },
                            "top_industry": {
                              "type": "string"
                            }
                          }
                        },
                        "details": {
                          "type": "object",
                          "properties": {
                            "locations": {
                              "type": "object",
                              "additionalProperties": {
                                "type": "string"
                              }
                            },
                            "companies": {
                              "type": "object",
                              "additionalProperties": {
                                "type": "string"
                              }
                            },
                            "industries": {
                              "type": "object",
                              "additionalProperties": {
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