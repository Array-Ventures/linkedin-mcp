---
updatedAt: 2026-04-24T15:33:11.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Remove Reaction from a Post

Removes a reaction from a post.

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
    "/v2/{account_id}/posts/{post_id}/reactions": {
      "delete": {
        "operationId": "removePostReaction",
        "summary": "Remove Reaction from a Post",
        "tags": [
          "Posts"
        ],
        "description": "Removes a reaction from a post.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "additionalProperties": false,
                "type": "object",
                "required": [
                  "reaction"
                ],
                "properties": {
                  "reaction": {
                    "allOf": [
                      {
                        "description": "The emoji unicode if supported by the provider, else the reaction type (Make sure to use reaction types prefixed by the provider of the targeted account) to be removed",
                        "type": "string"
                      },
                      {
                        "anyOf": [
                          {
                            "title": "Emoji Unicode",
                            "description": "The emoji unicode if supported by the provider.",
                            "type": "string"
                          },
                          {
                            "title": "LinkedIn Reaction Type",
                            "description": "\n  LinkedIn only uses the following reaction types:\n  - `linkedin_like` is Like.\n  - `linkedin_celebrate` is Celebrate.\n  - `linkedin_support` is Support.\n  - `linkedin_love` is Love.\n  - `linkedin_insightful` is Insightful.\n  - `linkedin_funny` is Funny.\n",
                            "type": "string",
                            "enum": [
                              "linkedin_like",
                              "linkedin_celebrate",
                              "linkedin_support",
                              "linkedin_love",
                              "linkedin_insightful",
                              "linkedin_funny"
                            ]
                          },
                          {
                            "title": "Instagram Reaction Type",
                            "description": "\n  Instagram only allow usage of `like` reaction type for posts AND comments of posts.\n",
                            "type": "string",
                            "enum": [
                              "instagram_like"
                            ]
                          },
                          {
                            "title": "Facebook Reaction Type",
                            "description": "\n  Facebook only uses the following reaction types, for posts AND comments of posts:\n  - `facebook_like` is Like.\n  - `facebook_love` is Love.\n  - `facebook_care` is Care.\n  - `facebook_haha` is Haha.\n  - `facebook_wow` is Wow.\n  - `facebook_sad` is Sad.\n  - `facebook_angry` is Angry.\n",
                            "type": "string",
                            "enum": [
                              "facebook_like",
                              "facebook_love",
                              "facebook_care",
                              "facebook_haha",
                              "facebook_wow",
                              "facebook_sad",
                              "facebook_angry"
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  "react_as": {
                    "minLength": 1,
                    "description": "The ID of the User on whose behalf the reaction was published and should be removed (if supported by the provider).",
                    "type": "string"
                  }
                }
              }
            }
          },
          "required": true
        },
        "parameters": [
          {
            "schema": {
              "minLength": 1,
              "type": "string"
            },
            "in": "path",
            "name": "post_id",
            "required": true,
            "description": "The ID of the Post where the reaction is.<br>Use IDs from *Get a Post*, *Create a Post* or *List all User's Posts* methods responses only. Some providers may allow native Post IDs, please refer to Posts integration guides."
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
            "name": "Remove post reaction",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipilePosts } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipilePosts = new UnipilePosts({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipilePosts.removePostReaction(\n  {\n    path: {\n      post_id: 'post_id',\n      account_id: ACCOUNT_ID,\n    },\n    body: {\n      reaction: 'linkedin_like',\n    },\n  }\n);"
          },
          {
            "name": "Remove post reaction",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    posts_api = unipile.PostsApi(api_client)\n\nresponse = posts_api.remove_post_reaction(\n    'post_id',\n    ACCOUNT_ID,\n    {\n    'reaction': 'linkedin_like',\n  }\n)"
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
                    "object"
                  ],
                  "properties": {
                    "object": {
                      "type": "string",
                      "enum": [
                        "PostReactionRemoved"
                      ]
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