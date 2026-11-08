---
updatedAt: 2026-04-24T15:33:11.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# List all User Reactions

Returns the list of reactions made by a user to posts. Use `me` as `user_id` to specify the owner of the connected account.
      LIMITATIONS: On Facebook, only the account itself (`me`) or one of its activated Pages can be listed, with at most 25 reactions per page.
      

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
      "name": "Posts",
      "description": "Posts management"
    }
  ],
  "paths": {
    "/v2/{account_id}/users/{user_id}/reactions": {
      "get": {
        "operationId": "getUserReactionsList",
        "summary": "List all User Reactions",
        "tags": [
          "Posts"
        ],
        "description": "Returns the list of reactions made by a user to posts. Use `me` as `user_id` to specify the owner of the connected account.\n      LIMITATIONS: On Facebook, only the account itself (`me`) or one of its activated Pages can be listed, with at most 25 reactions per page.\n      ",
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
            "name": "user_id",
            "required": true,
            "description": "The ID of the User to retrieve the reactions from."
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
            "name": "Get user reactions list",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipilePosts } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipilePosts = new UnipilePosts({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipilePosts.getUserReactionsList(\n  {\n    path: {\n      user_id: 'user_id',\n      account_id: ACCOUNT_ID,\n    },\n  }\n);"
          },
          {
            "name": "Get user reactions list",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    posts_api = unipile.PostsApi(api_client)\n\nresponse = posts_api.get_user_reactions_list(\n    'user_id',\n    ACCOUNT_ID\n)"
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
                          "sender",
                          "parent_post"
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
                          },
                          "parent_post": {
                            "anyOf": [
                              {
                                "type": "object",
                                "required": [
                                  "object",
                                  "id"
                                ],
                                "properties": {
                                  "object": {
                                    "type": "string",
                                    "enum": [
                                      "PostPreview"
                                    ]
                                  },
                                  "id": {
                                    "description": "The ID of the post for the provider.",
                                    "type": "string"
                                  },
                                  "share_url": {
                                    "description": "The URL to share the post.",
                                    "type": "string"
                                  },
                                  "text": {
                                    "description": "The text content of the post.",
                                    "type": "string"
                                  },
                                  "attachments": {
                                    "description": "Attachments of the parent post (e.g. post image).",
                                    "type": "array",
                                    "items": {
                                      "type": "object",
                                      "required": [
                                        "object",
                                        "type",
                                        "url"
                                      ],
                                      "properties": {
                                        "object": {
                                          "type": "string",
                                          "enum": [
                                            "Attachment"
                                          ]
                                        },
                                        "type": {
                                          "type": "string",
                                          "enum": [
                                            "img"
                                          ]
                                        },
                                        "url": {
                                          "description": "The URL of the attachment.",
                                          "type": "string"
                                        }
                                      }
                                    }
                                  },
                                  "author": {
                                    "description": "The author of the post.",
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
                              },
                              {
                                "type": "object",
                                "required": [
                                  "object",
                                  "id",
                                  "share_url",
                                  "created_at",
                                  "text",
                                  "user_reacted",
                                  "permissions",
                                  "reactions_counter",
                                  "comments_counter",
                                  "reposts_counter",
                                  "attachments",
                                  "is_repost",
                                  "author"
                                ],
                                "properties": {
                                  "object": {
                                    "type": "string",
                                    "enum": [
                                      "Post"
                                    ]
                                  },
                                  "id": {
                                    "description": "The ID of the post for the provider.",
                                    "type": "string"
                                  },
                                  "share_url": {
                                    "description": "The URL to share the post.",
                                    "type": "string"
                                  },
                                  "created_at": {
                                    "description": "The creation date of the post. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                                    "type": "string"
                                  },
                                  "title": {
                                    "description": "The title of the post.",
                                    "type": "string"
                                  },
                                  "text": {
                                    "description": "The text content of the post.",
                                    "type": "string"
                                  },
                                  "user_reacted": {
                                    "description": "If the account owner has reacted to this post, the value of the reaction (emoji unicode or reaction type), `true` if no details on the reaction, else `false`.",
                                    "anyOf": [
                                      {
                                        "type": "boolean"
                                      },
                                      {
                                        "type": "string"
                                      }
                                    ]
                                  },
                                  "permissions": {
                                    "description": "The permissions for the account owner on the post.",
                                    "type": "object",
                                    "required": [
                                      "can_share",
                                      "can_react",
                                      "can_post_comments"
                                    ],
                                    "properties": {
                                      "can_share": {
                                        "description": "Whether the account owner can share the post.",
                                        "type": "boolean"
                                      },
                                      "can_react": {
                                        "description": "Whether the account owner can react to the post.",
                                        "type": "boolean"
                                      },
                                      "can_post_comments": {
                                        "description": "Whether the account owner can comment on the post.",
                                        "type": "boolean"
                                      }
                                    }
                                  },
                                  "reactions_counter": {
                                    "description": "The counter of reactions to the post. `null` if counter is hidden.",
                                    "anyOf": [
                                      {
                                        "description": "A list of reactions to the element.",
                                        "type": "array",
                                        "items": {
                                          "type": "object",
                                          "required": [
                                            "reaction",
                                            "count"
                                          ],
                                          "properties": {
                                            "reaction": {
                                              "description": "Value of the reaction. Usually an emoji unicode.",
                                              "type": "string"
                                            },
                                            "count": {
                                              "description": "The total count of this reaction.",
                                              "type": "number"
                                            }
                                          }
                                        }
                                      },
                                      {
                                        "type": "null"
                                      }
                                    ]
                                  },
                                  "comments_counter": {
                                    "description": "The number of comments to the post. `null` if counter is hidden.",
                                    "anyOf": [
                                      {
                                        "type": "number"
                                      },
                                      {
                                        "type": "null"
                                      }
                                    ]
                                  },
                                  "reposts_counter": {
                                    "description": "The number of reposts of the post. `null` if counter is hidden.",
                                    "anyOf": [
                                      {
                                        "type": "number"
                                      },
                                      {
                                        "type": "null"
                                      }
                                    ]
                                  },
                                  "poll": {
                                    "description": "Data about the poll if the post is a poll.",
                                    "type": "object",
                                    "required": [
                                      "id",
                                      "total_votes_count",
                                      "question",
                                      "is_open",
                                      "options"
                                    ],
                                    "properties": {
                                      "id": {
                                        "description": "The ID of the poll.",
                                        "type": "string"
                                      },
                                      "total_votes_count": {
                                        "description": "The total number of votes for the poll.",
                                        "type": "number"
                                      },
                                      "question": {
                                        "description": "The question of the poll.",
                                        "type": "string"
                                      },
                                      "is_open": {
                                        "description": "Whether the poll is open. If the poll is closed, the user can only see the results.",
                                        "type": "boolean"
                                      },
                                      "options": {
                                        "type": "array",
                                        "items": {
                                          "type": "object",
                                          "required": [
                                            "id",
                                            "text",
                                            "win",
                                            "votes_count"
                                          ],
                                          "properties": {
                                            "id": {
                                              "description": "The ID of the option.",
                                              "type": "string"
                                            },
                                            "text": {
                                              "description": "The displayed text of the option.",
                                              "type": "string"
                                            },
                                            "win": {
                                              "description": "Whether the option is the winning option.",
                                              "type": "boolean"
                                            },
                                            "votes_count": {
                                              "description": "The number of votes for this option.",
                                              "type": "number"
                                            }
                                          }
                                        }
                                      }
                                    }
                                  },
                                  "event": {
                                    "description": "Data about the event if the post is an event.",
                                    "type": "object",
                                    "required": [
                                      "id",
                                      "name",
                                      "online"
                                    ],
                                    "properties": {
                                      "id": {
                                        "description": "The ID of the event.",
                                        "type": "string"
                                      },
                                      "name": {
                                        "description": "The name of the event.",
                                        "type": "string"
                                      },
                                      "url": {
                                        "description": "The link to the event.",
                                        "type": "string"
                                      },
                                      "online": {
                                        "description": "Whether the event is an online event.",
                                        "type": "boolean"
                                      },
                                      "location": {
                                        "description": "The location of the event.",
                                        "type": "string"
                                      },
                                      "description": {
                                        "description": "The description of the event.",
                                        "type": "string"
                                      },
                                      "public_picture_url": {
                                        "format": "uri",
                                        "description": "Public url to the picture of the event.",
                                        "type": "string"
                                      },
                                      "starts_on": {
                                        "description": "The date when the event will start. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                                        "type": "string"
                                      },
                                      "ends_on": {
                                        "description": "The date when the event will end. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                                        "type": "string"
                                      }
                                    }
                                  },
                                  "attachments": {
                                    "description": "List of post attachments.",
                                    "type": "array",
                                    "items": {
                                      "anyOf": [
                                        {
                                          "title": "Audio",
                                          "type": "object",
                                          "required": [
                                            "object",
                                            "id",
                                            "is_inline",
                                            "mimetype",
                                            "url",
                                            "type",
                                            "voice_note"
                                          ],
                                          "properties": {
                                            "object": {
                                              "type": "string",
                                              "enum": [
                                                "Attachment"
                                              ]
                                            },
                                            "id": {
                                              "description": "The unique identifier of the attachment.",
                                              "type": "string"
                                            },
                                            "file_size": {
                                              "description": "The size of the attachment in bytes.",
                                              "type": "number"
                                            },
                                            "is_inline": {
                                              "description": "Is the attachment inline in the content.",
                                              "type": "boolean"
                                            },
                                            "content_id": {
                                              "description": "Reserved for email attachments. The Content-ID (CID) used to reference the attachment inline in the email HTML body via `cid:`. Provided without the surrounding angle brackets.",
                                              "type": "string"
                                            },
                                            "is_unavailable": {
                                              "description": "The attachment is not available for download because it was removed from provider servers.",
                                              "type": "boolean"
                                            },
                                            "mimetype": {
                                              "description": "The MIME type of the attachment.",
                                              "type": "string"
                                            },
                                            "url": {
                                              "description": "The URL to download the attachment.",
                                              "type": "string"
                                            },
                                            "url_expires_at": {
                                              "description": "The URL expiration timestamp. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                                              "type": "string"
                                            },
                                            "content": {
                                              "description": "The file content encoded as base64, when available directly without an additional download.",
                                              "type": "string"
                                            },
                                            "type": {
                                              "type": "string",
                                              "enum": [
                                                "audio"
                                              ]
                                            },
                                            "duration": {
                                              "description": "The duration of the audio in seconds.",
                                              "type": "number"
                                            },
                                            "voice_note": {
                                              "description": "The audio is a voice note (should be displayed differently)",
                                              "type": "boolean"
                                            }
                                          }
                                        },
                                        {
                                          "title": "Image",
                                          "type": "object",
                                          "required": [
                                            "object",
                                            "id",
                                            "is_inline",
                                            "mimetype",
                                            "url",
                                            "type",
                                            "sticker"
                                          ],
                                          "properties": {
                                            "object": {
                                              "type": "string",
                                              "enum": [
                                                "Attachment"
                                              ]
                                            },
                                            "id": {
                                              "description": "The unique identifier of the attachment.",
                                              "type": "string"
                                            },
                                            "file_size": {
                                              "description": "The size of the attachment in bytes.",
                                              "type": "number"
                                            },
                                            "is_inline": {
                                              "description": "Is the attachment inline in the content.",
                                              "type": "boolean"
                                            },
                                            "content_id": {
                                              "description": "Reserved for email attachments. The Content-ID (CID) used to reference the attachment inline in the email HTML body via `cid:`. Provided without the surrounding angle brackets.",
                                              "type": "string"
                                            },
                                            "is_unavailable": {
                                              "description": "The attachment is not available for download because it was removed from provider servers.",
                                              "type": "boolean"
                                            },
                                            "mimetype": {
                                              "description": "The MIME type of the attachment.",
                                              "type": "string"
                                            },
                                            "url": {
                                              "description": "The URL to download the attachment.",
                                              "type": "string"
                                            },
                                            "url_expires_at": {
                                              "description": "The URL expiration timestamp. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                                              "type": "string"
                                            },
                                            "content": {
                                              "description": "The file content encoded as base64, when available directly without an additional download.",
                                              "type": "string"
                                            },
                                            "type": {
                                              "type": "string",
                                              "enum": [
                                                "img"
                                              ]
                                            },
                                            "size": {
                                              "description": "The size of the image in pixels.",
                                              "type": "object",
                                              "required": [
                                                "height",
                                                "width"
                                              ],
                                              "properties": {
                                                "height": {
                                                  "type": "number"
                                                },
                                                "width": {
                                                  "type": "number"
                                                }
                                              }
                                            },
                                            "sticker": {
                                              "description": "The image is a sticker (should be displayed differently)",
                                              "type": "boolean"
                                            }
                                          }
                                        },
                                        {
                                          "title": "Video",
                                          "type": "object",
                                          "required": [
                                            "object",
                                            "id",
                                            "is_inline",
                                            "mimetype",
                                            "url",
                                            "type",
                                            "size",
                                            "gif"
                                          ],
                                          "properties": {
                                            "object": {
                                              "type": "string",
                                              "enum": [
                                                "Attachment"
                                              ]
                                            },
                                            "id": {
                                              "description": "The unique identifier of the attachment.",
                                              "type": "string"
                                            },
                                            "file_size": {
                                              "description": "The size of the attachment in bytes.",
                                              "type": "number"
                                            },
                                            "is_inline": {
                                              "description": "Is the attachment inline in the content.",
                                              "type": "boolean"
                                            },
                                            "content_id": {
                                              "description": "Reserved for email attachments. The Content-ID (CID) used to reference the attachment inline in the email HTML body via `cid:`. Provided without the surrounding angle brackets.",
                                              "type": "string"
                                            },
                                            "is_unavailable": {
                                              "description": "The attachment is not available for download because it was removed from provider servers.",
                                              "type": "boolean"
                                            },
                                            "mimetype": {
                                              "description": "The MIME type of the attachment.",
                                              "type": "string"
                                            },
                                            "url": {
                                              "description": "The URL to download the attachment.",
                                              "type": "string"
                                            },
                                            "url_expires_at": {
                                              "description": "The URL expiration timestamp. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                                              "type": "string"
                                            },
                                            "content": {
                                              "description": "The file content encoded as base64, when available directly without an additional download.",
                                              "type": "string"
                                            },
                                            "type": {
                                              "type": "string",
                                              "enum": [
                                                "video"
                                              ]
                                            },
                                            "duration": {
                                              "description": "The duration of the video in seconds.",
                                              "type": "number"
                                            },
                                            "size": {
                                              "description": "The size of the video in pixels.",
                                              "type": "object",
                                              "required": [
                                                "height",
                                                "width"
                                              ],
                                              "properties": {
                                                "height": {
                                                  "type": "number"
                                                },
                                                "width": {
                                                  "type": "number"
                                                }
                                              }
                                            },
                                            "gif": {
                                              "description": "The video is a GIF (should be displayed differently)",
                                              "type": "boolean"
                                            }
                                          }
                                        },
                                        {
                                          "title": "File / Document",
                                          "type": "object",
                                          "required": [
                                            "object",
                                            "id",
                                            "is_inline",
                                            "mimetype",
                                            "url",
                                            "type",
                                            "filename"
                                          ],
                                          "properties": {
                                            "object": {
                                              "type": "string",
                                              "enum": [
                                                "Attachment"
                                              ]
                                            },
                                            "id": {
                                              "description": "The unique identifier of the attachment.",
                                              "type": "string"
                                            },
                                            "file_size": {
                                              "description": "The size of the attachment in bytes.",
                                              "type": "number"
                                            },
                                            "is_inline": {
                                              "description": "Is the attachment inline in the content.",
                                              "type": "boolean"
                                            },
                                            "content_id": {
                                              "description": "Reserved for email attachments. The Content-ID (CID) used to reference the attachment inline in the email HTML body via `cid:`. Provided without the surrounding angle brackets.",
                                              "type": "string"
                                            },
                                            "is_unavailable": {
                                              "description": "The attachment is not available for download because it was removed from provider servers.",
                                              "type": "boolean"
                                            },
                                            "mimetype": {
                                              "description": "The MIME type of the attachment.",
                                              "type": "string"
                                            },
                                            "url": {
                                              "description": "The URL to download the attachment.",
                                              "type": "string"
                                            },
                                            "url_expires_at": {
                                              "description": "The URL expiration timestamp. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                                              "type": "string"
                                            },
                                            "content": {
                                              "description": "The file content encoded as base64, when available directly without an additional download.",
                                              "type": "string"
                                            },
                                            "type": {
                                              "type": "string",
                                              "enum": [
                                                "file"
                                              ]
                                            },
                                            "filename": {
                                              "description": "The name of the file, including the extension.",
                                              "type": "string"
                                            }
                                          }
                                        },
                                        {
                                          "title": "Media Share",
                                          "type": "object",
                                          "required": [
                                            "object",
                                            "id",
                                            "is_inline",
                                            "mimetype",
                                            "url",
                                            "type",
                                            "media_type"
                                          ],
                                          "properties": {
                                            "object": {
                                              "type": "string",
                                              "enum": [
                                                "Attachment"
                                              ]
                                            },
                                            "id": {
                                              "description": "The unique identifier of the attachment.",
                                              "type": "string"
                                            },
                                            "file_size": {
                                              "description": "The size of the attachment in bytes.",
                                              "type": "number"
                                            },
                                            "is_inline": {
                                              "description": "Is the attachment inline in the content.",
                                              "type": "boolean"
                                            },
                                            "content_id": {
                                              "description": "Reserved for email attachments. The Content-ID (CID) used to reference the attachment inline in the email HTML body via `cid:`. Provided without the surrounding angle brackets.",
                                              "type": "string"
                                            },
                                            "is_unavailable": {
                                              "description": "The attachment is not available for download because it was removed from provider servers.",
                                              "type": "boolean"
                                            },
                                            "mimetype": {
                                              "description": "The MIME type of the attachment.",
                                              "type": "string"
                                            },
                                            "url": {
                                              "description": "The URL of the shared content.",
                                              "type": "string"
                                            },
                                            "url_expires_at": {
                                              "description": "The URL expiration timestamp. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                                              "type": "string"
                                            },
                                            "content": {
                                              "description": "The file content encoded as base64, when available directly without an additional download.",
                                              "type": "string"
                                            },
                                            "type": {
                                              "type": "string",
                                              "enum": [
                                                "shared_content"
                                              ]
                                            },
                                            "media_type": {
                                              "description": "The type of content being shared.",
                                              "type": "string",
                                              "enum": [
                                                "post",
                                                "story",
                                                "url",
                                                "reel",
                                                "job_posting"
                                              ]
                                            },
                                            "author": {
                                              "description": "The author of the shared content, if applicable.",
                                              "type": "string"
                                            },
                                            "description": {
                                              "description": "A brief description of the shared content.",
                                              "type": "string"
                                            }
                                          }
                                        },
                                        {
                                          "title": "Contact Card",
                                          "type": "object",
                                          "required": [
                                            "object",
                                            "id",
                                            "is_inline",
                                            "mimetype",
                                            "url",
                                            "type",
                                            "phones",
                                            "emails"
                                          ],
                                          "properties": {
                                            "object": {
                                              "type": "string",
                                              "enum": [
                                                "Attachment"
                                              ]
                                            },
                                            "id": {
                                              "description": "The unique identifier of the attachment.",
                                              "type": "string"
                                            },
                                            "file_size": {
                                              "description": "The size of the attachment in bytes.",
                                              "type": "number"
                                            },
                                            "is_inline": {
                                              "description": "Is the attachment inline in the content.",
                                              "type": "boolean"
                                            },
                                            "content_id": {
                                              "description": "Reserved for email attachments. The Content-ID (CID) used to reference the attachment inline in the email HTML body via `cid:`. Provided without the surrounding angle brackets.",
                                              "type": "string"
                                            },
                                            "is_unavailable": {
                                              "description": "The attachment is not available for download because it was removed from provider servers.",
                                              "type": "boolean"
                                            },
                                            "mimetype": {
                                              "description": "The MIME type of the attachment.",
                                              "type": "string"
                                            },
                                            "url": {
                                              "description": "The URL to download the attachment.",
                                              "type": "string"
                                            },
                                            "url_expires_at": {
                                              "description": "The URL expiration timestamp. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                                              "type": "string"
                                            },
                                            "content": {
                                              "description": "The file content encoded as base64, when available directly without an additional download.",
                                              "type": "string"
                                            },
                                            "type": {
                                              "type": "string",
                                              "enum": [
                                                "contact_card"
                                              ]
                                            },
                                            "display_name": {
                                              "description": "The name of the shared contact.",
                                              "type": "string"
                                            },
                                            "organization": {
                                              "description": "The organization of the shared contact.",
                                              "type": "string"
                                            },
                                            "phones": {
                                              "description": "The phone numbers of the shared contact.",
                                              "type": "array",
                                              "items": {
                                                "type": "object",
                                                "required": [
                                                  "number"
                                                ],
                                                "properties": {
                                                  "number": {
                                                    "description": "The phone number of the shared contact.",
                                                    "type": "string"
                                                  },
                                                  "type": {
                                                    "description": "The label of the phone number, as set by the contact owner (CELL, WORK, ...).",
                                                    "type": "string"
                                                  }
                                                }
                                              }
                                            },
                                            "emails": {
                                              "description": "The email addresses of the shared contact.",
                                              "type": "array",
                                              "items": {
                                                "type": "object",
                                                "required": [
                                                  "address"
                                                ],
                                                "properties": {
                                                  "address": {
                                                    "description": "The email address of the shared contact.",
                                                    "type": "string"
                                                  },
                                                  "type": {
                                                    "description": "The label of the email address, as set by the contact owner (HOME, WORK, ...).",
                                                    "type": "string"
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      ]
                                    }
                                  },
                                  "analytics": {
                                    "description": "Analytics data of the post.",
                                    "type": "object",
                                    "properties": {
                                      "impressions_counter": {
                                        "description": "The number of impressions of the post.",
                                        "type": "number"
                                      },
                                      "engagements_counter": {
                                        "description": "The number of engagements of the post.",
                                        "type": "number"
                                      },
                                      "engagement_rate": {
                                        "description": "The engagement rate of the post.",
                                        "type": "number"
                                      },
                                      "clicks_counter": {
                                        "description": "The number of clicks of the post.",
                                        "type": "number"
                                      },
                                      "clickthrough_rate": {
                                        "description": "The clickthrough rate of the post.",
                                        "type": "number"
                                      },
                                      "page_viewers_from_this_post_counter": {
                                        "description": "The number of page viewers from this post.",
                                        "type": "number"
                                      },
                                      "followers_gained_from_this_post_counter": {
                                        "description": "The number of followers gained from this post.",
                                        "type": "number"
                                      },
                                      "users_reached_counter": {
                                        "description": "The number of users reached from this post.",
                                        "type": "number"
                                      }
                                    }
                                  },
                                  "is_repost": {
                                    "description": "`true` if this post is reposted by someone without quote. Quoted post does not qualify as a repost.",
                                    "type": "boolean"
                                  },
                                  "author": {
                                    "description": "The author of the post.",
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
                                  },
                                  "reposted_by": {
                                    "description": "The user who reposted the post if `is_repost` is `true`.",
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
                                  },
                                  "quoted_post": {
                                    "description": "The post that is quoted in this post.",
                                    "type": "object",
                                    "required": [
                                      "object",
                                      "id",
                                      "share_url",
                                      "created_at",
                                      "text",
                                      "user_reacted",
                                      "permissions",
                                      "reactions_counter",
                                      "comments_counter",
                                      "reposts_counter",
                                      "attachments",
                                      "author"
                                    ],
                                    "properties": {
                                      "object": {
                                        "type": "string",
                                        "enum": [
                                          "Post"
                                        ]
                                      },
                                      "id": {
                                        "description": "The ID of the post for the provider.",
                                        "type": "string"
                                      },
                                      "share_url": {
                                        "description": "The URL to share the post.",
                                        "type": "string"
                                      },
                                      "created_at": {
                                        "description": "The creation date of the post. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                                        "type": "string"
                                      },
                                      "title": {
                                        "description": "The title of the post.",
                                        "type": "string"
                                      },
                                      "text": {
                                        "description": "The text content of the post.",
                                        "type": "string"
                                      },
                                      "user_reacted": {
                                        "description": "If the account owner has reacted to this post, the value of the reaction (emoji unicode or reaction type), `true` if no details on the reaction, else `false`.",
                                        "anyOf": [
                                          {
                                            "type": "boolean"
                                          },
                                          {
                                            "type": "string"
                                          }
                                        ]
                                      },
                                      "permissions": {
                                        "description": "The permissions for the account owner on the post.",
                                        "type": "object",
                                        "required": [
                                          "can_share",
                                          "can_react",
                                          "can_post_comments"
                                        ],
                                        "properties": {
                                          "can_share": {
                                            "description": "Whether the account owner can share the post.",
                                            "type": "boolean"
                                          },
                                          "can_react": {
                                            "description": "Whether the account owner can react to the post.",
                                            "type": "boolean"
                                          },
                                          "can_post_comments": {
                                            "description": "Whether the account owner can comment on the post.",
                                            "type": "boolean"
                                          }
                                        }
                                      },
                                      "reactions_counter": {
                                        "description": "The counter of reactions to the post. `null` if counter is hidden.",
                                        "anyOf": [
                                          {
                                            "description": "A list of reactions to the element.",
                                            "type": "array",
                                            "items": {
                                              "type": "object",
                                              "required": [
                                                "reaction",
                                                "count"
                                              ],
                                              "properties": {
                                                "reaction": {
                                                  "description": "Value of the reaction. Usually an emoji unicode.",
                                                  "type": "string"
                                                },
                                                "count": {
                                                  "description": "The total count of this reaction.",
                                                  "type": "number"
                                                }
                                              }
                                            }
                                          },
                                          {
                                            "type": "null"
                                          }
                                        ]
                                      },
                                      "comments_counter": {
                                        "description": "The number of comments to the post. `null` if counter is hidden.",
                                        "anyOf": [
                                          {
                                            "type": "number"
                                          },
                                          {
                                            "type": "null"
                                          }
                                        ]
                                      },
                                      "reposts_counter": {
                                        "description": "The number of reposts of the post. `null` if counter is hidden.",
                                        "anyOf": [
                                          {
                                            "type": "number"
                                          },
                                          {
                                            "type": "null"
                                          }
                                        ]
                                      },
                                      "poll": {
                                        "description": "Data about the poll if the post is a poll.",
                                        "type": "object",
                                        "required": [
                                          "id",
                                          "total_votes_count",
                                          "question",
                                          "is_open",
                                          "options"
                                        ],
                                        "properties": {
                                          "id": {
                                            "description": "The ID of the poll.",
                                            "type": "string"
                                          },
                                          "total_votes_count": {
                                            "description": "The total number of votes for the poll.",
                                            "type": "number"
                                          },
                                          "question": {
                                            "description": "The question of the poll.",
                                            "type": "string"
                                          },
                                          "is_open": {
                                            "description": "Whether the poll is open. If the poll is closed, the user can only see the results.",
                                            "type": "boolean"
                                          },
                                          "options": {
                                            "type": "array",
                                            "items": {
                                              "type": "object",
                                              "required": [
                                                "id",
                                                "text",
                                                "win",
                                                "votes_count"
                                              ],
                                              "properties": {
                                                "id": {
                                                  "description": "The ID of the option.",
                                                  "type": "string"
                                                },
                                                "text": {
                                                  "description": "The displayed text of the option.",
                                                  "type": "string"
                                                },
                                                "win": {
                                                  "description": "Whether the option is the winning option.",
                                                  "type": "boolean"
                                                },
                                                "votes_count": {
                                                  "description": "The number of votes for this option.",
                                                  "type": "number"
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "event": {
                                        "description": "Data about the event if the post is an event.",
                                        "type": "object",
                                        "required": [
                                          "id",
                                          "name",
                                          "online"
                                        ],
                                        "properties": {
                                          "id": {
                                            "description": "The ID of the event.",
                                            "type": "string"
                                          },
                                          "name": {
                                            "description": "The name of the event.",
                                            "type": "string"
                                          },
                                          "url": {
                                            "description": "The link to the event.",
                                            "type": "string"
                                          },
                                          "online": {
                                            "description": "Whether the event is an online event.",
                                            "type": "boolean"
                                          },
                                          "location": {
                                            "description": "The location of the event.",
                                            "type": "string"
                                          },
                                          "description": {
                                            "description": "The description of the event.",
                                            "type": "string"
                                          },
                                          "public_picture_url": {
                                            "format": "uri",
                                            "description": "Public url to the picture of the event.",
                                            "type": "string"
                                          },
                                          "starts_on": {
                                            "description": "The date when the event will start. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                                            "type": "string"
                                          },
                                          "ends_on": {
                                            "description": "The date when the event will end. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                                            "type": "string"
                                          }
                                        }
                                      },
                                      "attachments": {
                                        "description": "List of post attachments.",
                                        "type": "array",
                                        "items": {
                                          "anyOf": [
                                            {
                                              "title": "Audio",
                                              "type": "object",
                                              "required": [
                                                "object",
                                                "id",
                                                "is_inline",
                                                "mimetype",
                                                "url",
                                                "type",
                                                "voice_note"
                                              ],
                                              "properties": {
                                                "object": {
                                                  "type": "string",
                                                  "enum": [
                                                    "Attachment"
                                                  ]
                                                },
                                                "id": {
                                                  "description": "The unique identifier of the attachment.",
                                                  "type": "string"
                                                },
                                                "file_size": {
                                                  "description": "The size of the attachment in bytes.",
                                                  "type": "number"
                                                },
                                                "is_inline": {
                                                  "description": "Is the attachment inline in the content.",
                                                  "type": "boolean"
                                                },
                                                "content_id": {
                                                  "description": "Reserved for email attachments. The Content-ID (CID) used to reference the attachment inline in the email HTML body via `cid:`. Provided without the surrounding angle brackets.",
                                                  "type": "string"
                                                },
                                                "is_unavailable": {
                                                  "description": "The attachment is not available for download because it was removed from provider servers.",
                                                  "type": "boolean"
                                                },
                                                "mimetype": {
                                                  "description": "The MIME type of the attachment.",
                                                  "type": "string"
                                                },
                                                "url": {
                                                  "description": "The URL to download the attachment.",
                                                  "type": "string"
                                                },
                                                "url_expires_at": {
                                                  "description": "The URL expiration timestamp. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                                                  "type": "string"
                                                },
                                                "content": {
                                                  "description": "The file content encoded as base64, when available directly without an additional download.",
                                                  "type": "string"
                                                },
                                                "type": {
                                                  "type": "string",
                                                  "enum": [
                                                    "audio"
                                                  ]
                                                },
                                                "duration": {
                                                  "description": "The duration of the audio in seconds.",
                                                  "type": "number"
                                                },
                                                "voice_note": {
                                                  "description": "The audio is a voice note (should be displayed differently)",
                                                  "type": "boolean"
                                                }
                                              }
                                            },
                                            {
                                              "title": "Image",
                                              "type": "object",
                                              "required": [
                                                "object",
                                                "id",
                                                "is_inline",
                                                "mimetype",
                                                "url",
                                                "type",
                                                "sticker"
                                              ],
                                              "properties": {
                                                "object": {
                                                  "type": "string",
                                                  "enum": [
                                                    "Attachment"
                                                  ]
                                                },
                                                "id": {
                                                  "description": "The unique identifier of the attachment.",
                                                  "type": "string"
                                                },
                                                "file_size": {
                                                  "description": "The size of the attachment in bytes.",
                                                  "type": "number"
                                                },
                                                "is_inline": {
                                                  "description": "Is the attachment inline in the content.",
                                                  "type": "boolean"
                                                },
                                                "content_id": {
                                                  "description": "Reserved for email attachments. The Content-ID (CID) used to reference the attachment inline in the email HTML body via `cid:`. Provided without the surrounding angle brackets.",
                                                  "type": "string"
                                                },
                                                "is_unavailable": {
                                                  "description": "The attachment is not available for download because it was removed from provider servers.",
                                                  "type": "boolean"
                                                },
                                                "mimetype": {
                                                  "description": "The MIME type of the attachment.",
                                                  "type": "string"
                                                },
                                                "url": {
                                                  "description": "The URL to download the attachment.",
                                                  "type": "string"
                                                },
                                                "url_expires_at": {
                                                  "description": "The URL expiration timestamp. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                                                  "type": "string"
                                                },
                                                "content": {
                                                  "description": "The file content encoded as base64, when available directly without an additional download.",
                                                  "type": "string"
                                                },
                                                "type": {
                                                  "type": "string",
                                                  "enum": [
                                                    "img"
                                                  ]
                                                },
                                                "size": {
                                                  "description": "The size of the image in pixels.",
                                                  "type": "object",
                                                  "required": [
                                                    "height",
                                                    "width"
                                                  ],
                                                  "properties": {
                                                    "height": {
                                                      "type": "number"
                                                    },
                                                    "width": {
                                                      "type": "number"
                                                    }
                                                  }
                                                },
                                                "sticker": {
                                                  "description": "The image is a sticker (should be displayed differently)",
                                                  "type": "boolean"
                                                }
                                              }
                                            },
                                            {
                                              "title": "Video",
                                              "type": "object",
                                              "required": [
                                                "object",
                                                "id",
                                                "is_inline",
                                                "mimetype",
                                                "url",
                                                "type",
                                                "size",
                                                "gif"
                                              ],
                                              "properties": {
                                                "object": {
                                                  "type": "string",
                                                  "enum": [
                                                    "Attachment"
                                                  ]
                                                },
                                                "id": {
                                                  "description": "The unique identifier of the attachment.",
                                                  "type": "string"
                                                },
                                                "file_size": {
                                                  "description": "The size of the attachment in bytes.",
                                                  "type": "number"
                                                },
                                                "is_inline": {
                                                  "description": "Is the attachment inline in the content.",
                                                  "type": "boolean"
                                                },
                                                "content_id": {
                                                  "description": "Reserved for email attachments. The Content-ID (CID) used to reference the attachment inline in the email HTML body via `cid:`. Provided without the surrounding angle brackets.",
                                                  "type": "string"
                                                },
                                                "is_unavailable": {
                                                  "description": "The attachment is not available for download because it was removed from provider servers.",
                                                  "type": "boolean"
                                                },
                                                "mimetype": {
                                                  "description": "The MIME type of the attachment.",
                                                  "type": "string"
                                                },
                                                "url": {
                                                  "description": "The URL to download the attachment.",
                                                  "type": "string"
                                                },
                                                "url_expires_at": {
                                                  "description": "The URL expiration timestamp. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                                                  "type": "string"
                                                },
                                                "content": {
                                                  "description": "The file content encoded as base64, when available directly without an additional download.",
                                                  "type": "string"
                                                },
                                                "type": {
                                                  "type": "string",
                                                  "enum": [
                                                    "video"
                                                  ]
                                                },
                                                "duration": {
                                                  "description": "The duration of the video in seconds.",
                                                  "type": "number"
                                                },
                                                "size": {
                                                  "description": "The size of the video in pixels.",
                                                  "type": "object",
                                                  "required": [
                                                    "height",
                                                    "width"
                                                  ],
                                                  "properties": {
                                                    "height": {
                                                      "type": "number"
                                                    },
                                                    "width": {
                                                      "type": "number"
                                                    }
                                                  }
                                                },
                                                "gif": {
                                                  "description": "The video is a GIF (should be displayed differently)",
                                                  "type": "boolean"
                                                }
                                              }
                                            },
                                            {
                                              "title": "File / Document",
                                              "type": "object",
                                              "required": [
                                                "object",
                                                "id",
                                                "is_inline",
                                                "mimetype",
                                                "url",
                                                "type",
                                                "filename"
                                              ],
                                              "properties": {
                                                "object": {
                                                  "type": "string",
                                                  "enum": [
                                                    "Attachment"
                                                  ]
                                                },
                                                "id": {
                                                  "description": "The unique identifier of the attachment.",
                                                  "type": "string"
                                                },
                                                "file_size": {
                                                  "description": "The size of the attachment in bytes.",
                                                  "type": "number"
                                                },
                                                "is_inline": {
                                                  "description": "Is the attachment inline in the content.",
                                                  "type": "boolean"
                                                },
                                                "content_id": {
                                                  "description": "Reserved for email attachments. The Content-ID (CID) used to reference the attachment inline in the email HTML body via `cid:`. Provided without the surrounding angle brackets.",
                                                  "type": "string"
                                                },
                                                "is_unavailable": {
                                                  "description": "The attachment is not available for download because it was removed from provider servers.",
                                                  "type": "boolean"
                                                },
                                                "mimetype": {
                                                  "description": "The MIME type of the attachment.",
                                                  "type": "string"
                                                },
                                                "url": {
                                                  "description": "The URL to download the attachment.",
                                                  "type": "string"
                                                },
                                                "url_expires_at": {
                                                  "description": "The URL expiration timestamp. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                                                  "type": "string"
                                                },
                                                "content": {
                                                  "description": "The file content encoded as base64, when available directly without an additional download.",
                                                  "type": "string"
                                                },
                                                "type": {
                                                  "type": "string",
                                                  "enum": [
                                                    "file"
                                                  ]
                                                },
                                                "filename": {
                                                  "description": "The name of the file, including the extension.",
                                                  "type": "string"
                                                }
                                              }
                                            },
                                            {
                                              "title": "Media Share",
                                              "type": "object",
                                              "required": [
                                                "object",
                                                "id",
                                                "is_inline",
                                                "mimetype",
                                                "url",
                                                "type",
                                                "media_type"
                                              ],
                                              "properties": {
                                                "object": {
                                                  "type": "string",
                                                  "enum": [
                                                    "Attachment"
                                                  ]
                                                },
                                                "id": {
                                                  "description": "The unique identifier of the attachment.",
                                                  "type": "string"
                                                },
                                                "file_size": {
                                                  "description": "The size of the attachment in bytes.",
                                                  "type": "number"
                                                },
                                                "is_inline": {
                                                  "description": "Is the attachment inline in the content.",
                                                  "type": "boolean"
                                                },
                                                "content_id": {
                                                  "description": "Reserved for email attachments. The Content-ID (CID) used to reference the attachment inline in the email HTML body via `cid:`. Provided without the surrounding angle brackets.",
                                                  "type": "string"
                                                },
                                                "is_unavailable": {
                                                  "description": "The attachment is not available for download because it was removed from provider servers.",
                                                  "type": "boolean"
                                                },
                                                "mimetype": {
                                                  "description": "The MIME type of the attachment.",
                                                  "type": "string"
                                                },
                                                "url": {
                                                  "description": "The URL of the shared content.",
                                                  "type": "string"
                                                },
                                                "url_expires_at": {
                                                  "description": "The URL expiration timestamp. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                                                  "type": "string"
                                                },
                                                "content": {
                                                  "description": "The file content encoded as base64, when available directly without an additional download.",
                                                  "type": "string"
                                                },
                                                "type": {
                                                  "type": "string",
                                                  "enum": [
                                                    "shared_content"
                                                  ]
                                                },
                                                "media_type": {
                                                  "description": "The type of content being shared.",
                                                  "type": "string",
                                                  "enum": [
                                                    "post",
                                                    "story",
                                                    "url",
                                                    "reel",
                                                    "job_posting"
                                                  ]
                                                },
                                                "author": {
                                                  "description": "The author of the shared content, if applicable.",
                                                  "type": "string"
                                                },
                                                "description": {
                                                  "description": "A brief description of the shared content.",
                                                  "type": "string"
                                                }
                                              }
                                            },
                                            {
                                              "title": "Contact Card",
                                              "type": "object",
                                              "required": [
                                                "object",
                                                "id",
                                                "is_inline",
                                                "mimetype",
                                                "url",
                                                "type",
                                                "phones",
                                                "emails"
                                              ],
                                              "properties": {
                                                "object": {
                                                  "type": "string",
                                                  "enum": [
                                                    "Attachment"
                                                  ]
                                                },
                                                "id": {
                                                  "description": "The unique identifier of the attachment.",
                                                  "type": "string"
                                                },
                                                "file_size": {
                                                  "description": "The size of the attachment in bytes.",
                                                  "type": "number"
                                                },
                                                "is_inline": {
                                                  "description": "Is the attachment inline in the content.",
                                                  "type": "boolean"
                                                },
                                                "content_id": {
                                                  "description": "Reserved for email attachments. The Content-ID (CID) used to reference the attachment inline in the email HTML body via `cid:`. Provided without the surrounding angle brackets.",
                                                  "type": "string"
                                                },
                                                "is_unavailable": {
                                                  "description": "The attachment is not available for download because it was removed from provider servers.",
                                                  "type": "boolean"
                                                },
                                                "mimetype": {
                                                  "description": "The MIME type of the attachment.",
                                                  "type": "string"
                                                },
                                                "url": {
                                                  "description": "The URL to download the attachment.",
                                                  "type": "string"
                                                },
                                                "url_expires_at": {
                                                  "description": "The URL expiration timestamp. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                                                  "type": "string"
                                                },
                                                "content": {
                                                  "description": "The file content encoded as base64, when available directly without an additional download.",
                                                  "type": "string"
                                                },
                                                "type": {
                                                  "type": "string",
                                                  "enum": [
                                                    "contact_card"
                                                  ]
                                                },
                                                "display_name": {
                                                  "description": "The name of the shared contact.",
                                                  "type": "string"
                                                },
                                                "organization": {
                                                  "description": "The organization of the shared contact.",
                                                  "type": "string"
                                                },
                                                "phones": {
                                                  "description": "The phone numbers of the shared contact.",
                                                  "type": "array",
                                                  "items": {
                                                    "type": "object",
                                                    "required": [
                                                      "number"
                                                    ],
                                                    "properties": {
                                                      "number": {
                                                        "description": "The phone number of the shared contact.",
                                                        "type": "string"
                                                      },
                                                      "type": {
                                                        "description": "The label of the phone number, as set by the contact owner (CELL, WORK, ...).",
                                                        "type": "string"
                                                      }
                                                    }
                                                  }
                                                },
                                                "emails": {
                                                  "description": "The email addresses of the shared contact.",
                                                  "type": "array",
                                                  "items": {
                                                    "type": "object",
                                                    "required": [
                                                      "address"
                                                    ],
                                                    "properties": {
                                                      "address": {
                                                        "description": "The email address of the shared contact.",
                                                        "type": "string"
                                                      },
                                                      "type": {
                                                        "description": "The label of the email address, as set by the contact owner (HOME, WORK, ...).",
                                                        "type": "string"
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          ]
                                        }
                                      },
                                      "analytics": {
                                        "description": "Analytics data of the post.",
                                        "type": "object",
                                        "properties": {
                                          "impressions_counter": {
                                            "description": "The number of impressions of the post.",
                                            "type": "number"
                                          },
                                          "engagements_counter": {
                                            "description": "The number of engagements of the post.",
                                            "type": "number"
                                          },
                                          "engagement_rate": {
                                            "description": "The engagement rate of the post.",
                                            "type": "number"
                                          },
                                          "clicks_counter": {
                                            "description": "The number of clicks of the post.",
                                            "type": "number"
                                          },
                                          "clickthrough_rate": {
                                            "description": "The clickthrough rate of the post.",
                                            "type": "number"
                                          },
                                          "page_viewers_from_this_post_counter": {
                                            "description": "The number of page viewers from this post.",
                                            "type": "number"
                                          },
                                          "followers_gained_from_this_post_counter": {
                                            "description": "The number of followers gained from this post.",
                                            "type": "number"
                                          },
                                          "users_reached_counter": {
                                            "description": "The number of users reached from this post.",
                                            "type": "number"
                                          }
                                        }
                                      },
                                      "author": {
                                        "description": "The author of the post.",
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
                                      },
                                      "specifics": {
                                        "description": "Object containing provider-specific post data.",
                                        "type": "object",
                                        "properties": {
                                          "mentions": {
                                            "type": "array",
                                            "items": {
                                              "type": "object",
                                              "required": [
                                                "url",
                                                "start",
                                                "length"
                                              ],
                                              "properties": {
                                                "url": {
                                                  "description": "Public URL targeted by the mention.",
                                                  "type": "string"
                                                },
                                                "start": {
                                                  "description": "Start index of the mention in the post text.",
                                                  "type": "number"
                                                },
                                                "length": {
                                                  "description": "Length of the mention in the post text.",
                                                  "type": "number"
                                                }
                                              }
                                            }
                                          },
                                          "job_posting": {
                                            "description": "A job posting that can be included as an insert in the post.",
                                            "type": "object",
                                            "required": [
                                              "id",
                                              "title",
                                              "location",
                                              "company"
                                            ],
                                            "properties": {
                                              "id": {
                                                "description": "Unique identifier of the job posting.",
                                                "anyOf": [
                                                  {
                                                    "type": "string"
                                                  },
                                                  {
                                                    "type": "null"
                                                  }
                                                ]
                                              },
                                              "title": {
                                                "description": "Title of the job posting.",
                                                "type": "string"
                                              },
                                              "location": {
                                                "description": "Location of the job posting.",
                                                "type": "string"
                                              },
                                              "company": {
                                                "description": "The company that published the job posting.",
                                                "type": "object",
                                                "required": [
                                                  "id",
                                                  "name"
                                                ],
                                                "properties": {
                                                  "id": {
                                                    "description": "Unique identifier of the company.",
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
                                                    "description": "Name of the company.",
                                                    "anyOf": [
                                                      {
                                                        "type": "string"
                                                      },
                                                      {
                                                        "type": "null"
                                                      }
                                                    ]
                                                  },
                                                  "picture_url": {
                                                    "description": "Public url to the profile picture of the company.",
                                                    "type": "string"
                                                  }
                                                }
                                              }
                                            }
                                          },
                                          "article": {
                                            "description": "An article that can be included as an insert in the post.",
                                            "type": "object",
                                            "required": [
                                              "id",
                                              "title"
                                            ],
                                            "properties": {
                                              "id": {
                                                "description": "Unique identifier of the article.",
                                                "anyOf": [
                                                  {
                                                    "type": "string"
                                                  },
                                                  {
                                                    "type": "null"
                                                  }
                                                ]
                                              },
                                              "title": {
                                                "description": "Title of the article.",
                                                "type": "string"
                                              },
                                              "author": {
                                                "description": "Author of the article.",
                                                "type": "string"
                                              },
                                              "url": {
                                                "description": "Public url to the article.",
                                                "type": "string"
                                              },
                                              "published_at": {
                                                "description": "The publication date of the article. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                                                "type": "string"
                                              },
                                              "excerpt": {
                                                "description": "A short excerpt of the article content.",
                                                "type": "string"
                                              },
                                              "picture_url": {
                                                "description": "Public url to the cover picture of the article.",
                                                "type": "string"
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  },
                                  "specifics": {
                                    "description": "Object containing provider-specific post data.",
                                    "type": "object",
                                    "properties": {
                                      "mentions": {
                                        "type": "array",
                                        "items": {
                                          "type": "object",
                                          "required": [
                                            "url",
                                            "start",
                                            "length"
                                          ],
                                          "properties": {
                                            "url": {
                                              "description": "Public URL targeted by the mention.",
                                              "type": "string"
                                            },
                                            "start": {
                                              "description": "Start index of the mention in the post text.",
                                              "type": "number"
                                            },
                                            "length": {
                                              "description": "Length of the mention in the post text.",
                                              "type": "number"
                                            }
                                          }
                                        }
                                      },
                                      "job_posting": {
                                        "description": "A job posting that can be included as an insert in the post.",
                                        "type": "object",
                                        "required": [
                                          "id",
                                          "title",
                                          "location",
                                          "company"
                                        ],
                                        "properties": {
                                          "id": {
                                            "description": "Unique identifier of the job posting.",
                                            "anyOf": [
                                              {
                                                "type": "string"
                                              },
                                              {
                                                "type": "null"
                                              }
                                            ]
                                          },
                                          "title": {
                                            "description": "Title of the job posting.",
                                            "type": "string"
                                          },
                                          "location": {
                                            "description": "Location of the job posting.",
                                            "type": "string"
                                          },
                                          "company": {
                                            "description": "The company that published the job posting.",
                                            "type": "object",
                                            "required": [
                                              "id",
                                              "name"
                                            ],
                                            "properties": {
                                              "id": {
                                                "description": "Unique identifier of the company.",
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
                                                "description": "Name of the company.",
                                                "anyOf": [
                                                  {
                                                    "type": "string"
                                                  },
                                                  {
                                                    "type": "null"
                                                  }
                                                ]
                                              },
                                              "picture_url": {
                                                "description": "Public url to the profile picture of the company.",
                                                "type": "string"
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "article": {
                                        "description": "An article that can be included as an insert in the post.",
                                        "type": "object",
                                        "required": [
                                          "id",
                                          "title"
                                        ],
                                        "properties": {
                                          "id": {
                                            "description": "Unique identifier of the article.",
                                            "anyOf": [
                                              {
                                                "type": "string"
                                              },
                                              {
                                                "type": "null"
                                              }
                                            ]
                                          },
                                          "title": {
                                            "description": "Title of the article.",
                                            "type": "string"
                                          },
                                          "author": {
                                            "description": "Author of the article.",
                                            "type": "string"
                                          },
                                          "url": {
                                            "description": "Public url to the article.",
                                            "type": "string"
                                          },
                                          "published_at": {
                                            "description": "The publication date of the article. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                                            "type": "string"
                                          },
                                          "excerpt": {
                                            "description": "A short excerpt of the article content.",
                                            "type": "string"
                                          },
                                          "picture_url": {
                                            "description": "Public url to the cover picture of the article.",
                                            "type": "string"
                                          }
                                        }
                                      }
                                    }
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