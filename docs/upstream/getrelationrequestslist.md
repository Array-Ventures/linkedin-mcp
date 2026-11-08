---
updatedAt: 2026-08-27T09:49:23.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# List all pending Relation / Follow requests

Returns a list of pending relation / follow requests that have been sent or received by the owner of the account.

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
      "name": "Users",
      "description": "Users managment"
    }
  ],
  "paths": {
    "/v2/{account_id}/users/me/relation-requests": {
      "get": {
        "operationId": "getRelationRequestsList",
        "summary": "List all pending Relation / Follow requests",
        "tags": [
          "Users"
        ],
        "description": "Returns a list of pending relation / follow requests that have been sent or received by the owner of the account.",
        "parameters": [
          {
            "schema": {
              "type": "string",
              "enum": [
                "sent",
                "received"
              ]
            },
            "in": "query",
            "name": "type",
            "required": true,
            "description": "Filter to returns only the given type of Relation / Follow request.\n        - `sent` is the requests sent by the current user.\n        - `received` is the requests received by the current user."
          },
          {
            "schema": {
              "type": "number"
            },
            "in": "query",
            "name": "offset",
            "required": false,
            "description": "An offset used for pagination, if supported by the provider, else use `cursor`."
          },
          {
            "schema": {
              "type": "string"
            },
            "in": "query",
            "name": "cursor",
            "required": false,
            "description": "A cursor used for pagination. If supported by the provider, use `next_cursor` given by the previous page of the list, else use `offset`."
          },
          {
            "schema": {
              "default": 20,
              "minimum": 1,
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
            "name": "Get relation requests list",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipileUsers } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipileUsers = new UnipileUsers({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipileUsers.getRelationRequestsList(\n  {\n    path: {\n      account_id: ACCOUNT_ID,\n    },\n    query: {\n      type: 'sent',\n    },\n  }\n);"
          },
          {
            "name": "Get relation requests list",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    users_api = unipile.UsersApi(api_client)\n\nresponse = users_api.get_relation_requests_list(\n    ACCOUNT_ID,\n    'sent'\n)"
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
                          "type",
                          "id"
                        ],
                        "properties": {
                          "object": {
                            "type": "string",
                            "enum": [
                              "RelationRequest"
                            ]
                          },
                          "type": {
                            "description": "Type of the relation / follow request.\n      - `sent` if the current user has asked another one to be in his relations.\n      - `received` if another user has asked the current one to be in his relations.",
                            "type": "string",
                            "enum": [
                              "sent",
                              "received"
                            ]
                          },
                          "id": {
                            "description": "The unique identifier of the invitation for the provider.",
                            "type": "string"
                          },
                          "created_at": {
                            "description": "Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                            "type": "string"
                          },
                          "message": {
                            "description": "Any message that comes with the invitation.",
                            "type": "string"
                          },
                          "user": {
                            "description": "The user who is the target of the relation / follow request.",
                            "type": "object",
                            "required": [
                              "id",
                              "object",
                              "type",
                              "display_name"
                            ],
                            "properties": {
                              "id": {
                                "description": "Unique identifier of the user for the provider. Usually an internal identifier used by the API only.",
                                "type": "string"
                              },
                              "object": {
                                "type": "string",
                                "enum": [
                                  "User"
                                ]
                              },
                              "type": {
                                "description": "Type of the user\n      - `individual` is an individual user.\n      - `organization` is an organization / business entity.\n      - `other` is an other type of entity.",
                                "type": "string",
                                "enum": [
                                  "individual",
                                  "organization",
                                  "other"
                                ]
                              },
                              "public_identifier": {
                                "description": "Public identifier of the user for the provider. Usually a shareable tag visible in urls and profiles. ",
                                "type": "string"
                              },
                              "display_name": {
                                "description": "Display name of the user as exposed by the provider.",
                                "type": "string"
                              },
                              "first_name": {
                                "description": "First name of the user.",
                                "type": "string"
                              },
                              "last_name": {
                                "description": "Last name of the user.",
                                "type": "string"
                              },
                              "profile_url": {
                                "format": "uri",
                                "description": "Public url to the profile of the user.",
                                "type": "string"
                              },
                              "public_picture_url": {
                                "format": "uri",
                                "description": "Public url to the profile picture of the user.",
                                "type": "string"
                              },
                              "private_picture_download_url": {
                                "format": "uri",
                                "description": "Private url to download the profile picture of the user. This url require authentication.",
                                "type": "string"
                              },
                              "description": {
                                "description": "Description of the user.",
                                "type": "string"
                              },
                              "specifics": {
                                "description": "Object containing provider-specific user profile data.",
                                "anyOf": [
                                  {
                                    "title": "WhatsApp",
                                    "type": "object",
                                    "required": [
                                      "contact_name"
                                    ],
                                    "properties": {
                                      "contact_name": {
                                        "description": "Name saved by the connected account owner in their WhatsApp address book.",
                                        "type": "string"
                                      }
                                    }
                                  },
                                  {
                                    "title": "Instagram",
                                    "type": "object",
                                    "required": [
                                      "messaging_identifier"
                                    ],
                                    "properties": {
                                      "messaging_identifier": {
                                        "description": "Messaging identifier of the user. Messages sent by this user carry it as their sender_id.",
                                        "type": "string"
                                      }
                                    }
                                  },
                                  {
                                    "title": "LinkedIn",
                                    "type": "object",
                                    "properties": {
                                      "location": {
                                        "description": "The geographical location of the user.",
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
                                      "industry": {
                                        "description": "The user's industry.",
                                        "type": "string"
                                      },
                                      "is_following": {
                                        "description": "Whether the current user follows the user.",
                                        "type": "boolean"
                                      },
                                      "followers_count": {
                                        "description": "The number of followers of the user.",
                                        "type": "number"
                                      },
                                      "relations_count": {
                                        "description": "The number of relations of the user.",
                                        "type": "number"
                                      },
                                      "shared_relations_count": {
                                        "description": "The number of relations that you share with the user.",
                                        "type": "number"
                                      },
                                      "website_url": {
                                        "description": "The URL of the website provided by the user.",
                                        "type": "string"
                                      },
                                      "portfolio_url": {
                                        "description": "The URL of the portfolio provided by the user.",
                                        "type": "string"
                                      },
                                      "services_page_url": {
                                        "description": "The LinkedIn internal URL of the user's services page.",
                                        "type": "string"
                                      },
                                      "is_premium": {
                                        "description": "Whether the User has a premium account.",
                                        "type": "boolean"
                                      },
                                      "is_verified": {
                                        "description": "Whether the User has a verified account.",
                                        "type": "boolean"
                                      }
                                    }
                                  }
                                ]
                              }
                            }
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