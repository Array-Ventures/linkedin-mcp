---
updatedAt: 2026-04-24T15:33:11.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Perform People Search

Returns a list of people from search results.

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
    "/v2/{account_id}/linkedin/search/people": {
      "post": {
        "operationId": "performClassicPeopleSearch",
        "summary": "Perform People Search",
        "tags": [
          "LinkedIn"
        ],
        "description": "Returns a list of people from search results.",
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
                  "network_distance": {
                    "description": "A list of connection degrees (1 for First, 2 for Second and 3 for Third+).\n  \nNative filter : Connections\n  ",
                    "type": "array",
                    "items": {
                      "type": "number",
                      "enum": [
                        1,
                        2,
                        3
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
                            2
                          ]
                        },
                        {
                          "type": "number",
                          "enum": [
                            3
                          ]
                        }
                      ]
                    }
                  },
                  "location": {
                    "description": "A list of parameter IDs. Use <a href=\"https://developer.unipile.com/v2.0/reference/getclassicsearchparameters\">List Search Parameters</a> with `LOCATION` type to find out the possible values.\n  \nNative filter : Locations\n  ",
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  },
                  "current_company": {
                    "description": "A list of parameter IDs. Use <a href=\"https://developer.unipile.com/v2.0/reference/getclassicsearchparameters\">List Search Parameters</a> with `COMPANY` type to find out the possible values.\n  \nNative filter : Current company\n  ",
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  },
                  "past_company": {
                    "description": "A list of parameter IDs. Use <a href=\"https://developer.unipile.com/v2.0/reference/getclassicsearchparameters\">List Search Parameters</a> with `COMPANY` type to find out the possible values.\n  \nNative filter : Past company\n  ",
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  },
                  "school": {
                    "description": "A list of parameter IDs. Use <a href=\"https://developer.unipile.com/v2.0/reference/getclassicsearchparameters\">List Search Parameters</a> with `SCHOOL` type to find out the possible values.\n  \nNative filter : School\n  ",
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  },
                  "connections_of": {
                    "description": "A parameter ID. Use <a href=\"https://developer.unipile.com/v2.0/reference/getclassicsearchparameters\">List Search Parameters</a> with `RELATION` type to find out the possible values.\n  \nNative filter : Connections of\n  ",
                    "type": "string"
                  },
                  "followers_of": {
                    "description": "A parameter ID. Use <a href=\"https://developer.unipile.com/v2.0/reference/getclassicsearchparameters\">List Search Parameters</a> with `PEOPLE` type to find out the possible values.\n  \nNative filter : Followers of\n  ",
                    "type": "string"
                  },
                  "industry": {
                    "description": "A list of parameter IDs. Use <a href=\"https://developer.unipile.com/v2.0/reference/getclassicsearchparameters\">List Search Parameters</a> with `INDUSTRY` type to find out the possible values.\n  \nNative filter : Industry\n  ",
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  },
                  "service": {
                    "description": "A list of parameter IDs. Use <a href=\"https://developer.unipile.com/v2.0/reference/getclassicsearchparameters\">List Search Parameters</a> with `SERVICE` type to find out the possible values.\n  \nNative filter : Service categories\n  ",
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  },
                  "profile_language": {
                    "description": "A list of ISO 639-1 language codes.\n  \nNative filter : Profile language\n  ",
                    "type": "array",
                    "items": {
                      "minLength": 2,
                      "maxLength": 2,
                      "type": "string"
                    }
                  },
                  "open_to_volunteering": {
                    "description": "Whether the users should be open to volunteering.\n  \nNative filter : Open to Volunteering \n  ",
                    "type": "boolean"
                  },
                  "advanced_keywords": {
                    "description": "A set of advanced keywords based filters.\n  \nNative filter : Keywords\n  ",
                    "type": "object",
                    "properties": {
                      "first_name": {
                        "description": "\n  \nNative filter : First name\n  ",
                        "type": "string"
                      },
                      "last_name": {
                        "description": "\n  \nNative filter : Last name\n  ",
                        "type": "string"
                      },
                      "title": {
                        "description": "\n  \nNative filter : Title\n  ",
                        "type": "string"
                      },
                      "company": {
                        "description": "\n  \nNative filter : Company\n  ",
                        "type": "string"
                      },
                      "school": {
                        "description": "\n  \nNative filter : School\n  ",
                        "type": "string"
                      }
                    }
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
            "name": "Perform classic people search",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipileLinkedIn } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipileLinkedIn = new UnipileLinkedIn({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipileLinkedIn.performClassicPeopleSearch(\n  {\n    path: {\n      account_id: ACCOUNT_ID,\n    },\n    body: {\n      keywords: 'value',\n    },\n  }\n);"
          },
          {
            "name": "Perform classic people search",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    linked_in_api = unipile.LinkedInApi(api_client)\n\nresponse = linked_in_api.perform_classic_people_search(\n    ACCOUNT_ID,\n    {\n    'keywords': 'value',\n  }\n)"
          }
        ],
        "responses": {
          "200": {
            "description": "Default Response",
            "content": {
              "application/json": {
                "schema": {
                  "title": "People search results",
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
                          "network_distance",
                          "product"
                        ],
                        "properties": {
                          "object": {
                            "type": "string",
                            "enum": [
                              "PeopleSearchResult"
                            ]
                          },
                          "id": {
                            "description": "The ID of the user.",
                            "type": "string"
                          },
                          "member_id": {
                            "description": "The LinkedIn internal member ID of the user.",
                            "type": "string"
                          },
                          "display_name": {
                            "description": "The display name of the User.",
                            "type": "string"
                          },
                          "public_identifier": {
                            "description": "The public identifier of the User.",
                            "type": "string"
                          },
                          "profile_url": {
                            "description": "The profile URL of the User.",
                            "type": "string"
                          },
                          "public_picture_url": {
                            "description": "The public picture URL of the User.",
                            "type": "string"
                          },
                          "public_picture_url_large": {
                            "description": "The public picture URL of the User in large size.",
                            "type": "string"
                          },
                          "relations_count": {
                            "description": "The number of relations of the User.",
                            "type": "number"
                          },
                          "location": {
                            "description": "The location of the User.",
                            "type": "string"
                          },
                          "headline": {
                            "description": "The headline of the User.",
                            "type": "string"
                          },
                          "network_distance": {
                            "description": "Network distance to a User.\n      `SELF`: Yourself.\n      `FIRST_DEGREE`: 1st degree connection.\n      `SECOND_DEGREE`: 2nd degree connection (connection of a 1st degree).\n      `THIRD_DEGREE`: 3rd degree connection (connection of a 2nd degree).\n      `OUT_OF_NETWORK`: Unreachable user.'",
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
                                  "FIRST_DEGREE"
                                ]
                              },
                              {
                                "type": "string",
                                "enum": [
                                  "SECOND_DEGREE"
                                ]
                              },
                              {
                                "type": "string",
                                "enum": [
                                  "THIRD_DEGREE"
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
                          "can_send_inmail": {
                            "description": "Whether it is possible to send an inMail to this User.",
                            "type": "boolean"
                          },
                          "product": {
                            "type": "string",
                            "enum": [
                              "classic"
                            ]
                          },
                          "followers_count": {
                            "description": "The number of the followers of the User.",
                            "type": "number"
                          },
                          "industry": {
                            "description": "The industry to which the User belongs.",
                            "type": "string"
                          },
                          "is_verified": {
                            "description": "Whether the User has a verified account.",
                            "type": "boolean"
                          },
                          "keywords_match": {
                            "description": "The search terms that produced this result.",
                            "type": "string"
                          },
                          "is_premium": {
                            "description": "Whether the User has a premium account.",
                            "type": "boolean"
                          },
                          "is_open_profile": {
                            "description": "Whether the User has an Open Profile. The Open Profile feature allows anyone on LinkedIn to contact a Premium member for free.",
                            "type": "boolean"
                          },
                          "shared_relations_count": {
                            "description": "The number of relations that you share with the User.",
                            "type": "number"
                          },
                          "website_url": {
                            "description": "The URL of the website provided by the User.",
                            "type": "string"
                          },
                          "portfolio_url": {
                            "description": "The URL of the portfolio provided by the User.",
                            "type": "string"
                          },
                          "services_page_url": {
                            "description": "The LinkedIn internal URL of the User's services page.",
                            "type": "string"
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