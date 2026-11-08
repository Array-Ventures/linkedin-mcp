---
updatedAt: 2026-08-27T09:42:03.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# List all Message's Reactions

Returns the list of reactions made to a message. Reaction counts are given with the Message object. This is useful to show a detailed list of all reactions and their author.

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
      "name": "Messaging",
      "description": "Messaging management"
    }
  ],
  "paths": {
    "/v2/{account_id}/chats/{chat_id}/messages/{message_id}/reactions": {
      "get": {
        "operationId": "getMessageReactionsList",
        "summary": "List all Message's Reactions",
        "tags": [
          "Messaging"
        ],
        "description": "Returns the list of reactions made to a message. Reaction counts are given with the Message object. This is useful to show a detailed list of all reactions and their author.",
        "parameters": [
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
              "minLength": 1,
              "type": "string"
            },
            "in": "path",
            "name": "chat_id",
            "required": true,
            "description": "The ID of the Chat where the message is."
          },
          {
            "schema": {
              "minLength": 1,
              "type": "string"
            },
            "in": "path",
            "name": "message_id",
            "required": true,
            "description": "The ID of the Message to retrieve reactions from."
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
            "name": "Get message reactions list",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipileMessaging } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipileMessaging = new UnipileMessaging({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipileMessaging.getMessageReactionsList(\n  {\n    path: {\n      chat_id: 'chat_id',\n      message_id: 'message_id',\n      account_id: ACCOUNT_ID,\n    },\n  }\n);"
          },
          {
            "name": "Get message reactions list",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    messaging_api = unipile.MessagingApi(api_client)\n\nresponse = messaging_api.get_message_reactions_list(\n    'chat_id',\n    'message_id',\n    ACCOUNT_ID\n)"
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
                          "value",
                          "is_sender",
                          "sender"
                        ],
                        "properties": {
                          "object": {
                            "type": "string",
                            "enum": [
                              "Reaction"
                            ]
                          },
                          "value": {
                            "description": "Value of the reaction. Usually an emoji unicode.",
                            "type": "string"
                          },
                          "is_sender": {
                            "description": "Is the current user the sender of the reaction.",
                            "type": "boolean"
                          },
                          "sender": {
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