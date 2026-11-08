---
updatedAt: 2026-08-27T13:12:46.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Create a Story

Creates a new story from a single image or video attachment (if supported by the provider).<br/><br/>Multipart supported, refer to <a href="https://developer.unipile.com/v2.0/reference/api-usage#sending-files">Sending Files</a>.

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
    "/v2/{account_id}/posts/stories": {
      "post": {
        "operationId": "createStory",
        "summary": "Create a Story",
        "tags": [
          "Posts"
        ],
        "description": "Creates a new story from a single image or video attachment (if supported by the provider).<br/><br/>Multipart supported, refer to <a href=\"https://developer.unipile.com/v2.0/reference/api-usage#sending-files\">Sending Files</a>.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "attachment"
                ],
                "properties": {
                  "attachment": {
                    "description": "A file to be uploaded.",
                    "additionalProperties": false,
                    "type": "object",
                    "required": [
                      "content",
                      "content_type",
                      "filename"
                    ],
                    "properties": {
                      "content": {
                        "description": "Content of the file encoded as base64. For large files, prefer using multipart, learn more here: https://developer.unipile.com/v2.0/reference/api-usage#sending-files",
                        "type": "string"
                      },
                      "content_type": {
                        "description": "<a href=\"https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types\">MIME type</a> of the file.",
                        "type": "string"
                      },
                      "filename": {
                        "description": "Name of the file (including extension).",
                        "type": "string"
                      },
                      "metadata": {
                        "description": "Metadata of the the file.",
                        "type": "object",
                        "properties": {
                          "duration": {
                            "description": "Duration of the media file.",
                            "type": "number"
                          }
                        }
                      }
                    }
                  },
                  "text": {
                    "description": "Optional caption for the story. User mentions can be added by inserting an @ followed by the ID or public identifier of the user (example: @JohnDoe), if supported by the provider.",
                    "type": "string"
                  },
                  "specifics": {
                    "allOf": [
                      {},
                      {
                        "description": "Object containing provider-specific story data.",
                        "type": "object",
                        "properties": {
                          "instagram": {
                            "description": "Specific options to apply if the provider of the targeted account is Instagram",
                            "type": "object",
                            "properties": {
                              "location": {
                                "description": "Location sticker to attach to the story.",
                                "type": "object",
                                "required": [
                                  "id",
                                  "name"
                                ],
                                "properties": {
                                  "id": {
                                    "description": "The ID of the location (from the Search Locations method) to attach as a sticker.",
                                    "type": "string"
                                  },
                                  "name": {
                                    "description": "The display name of the location, rendered as the sticker text.",
                                    "type": "string"
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    ]
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
            "name": "Create story",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipilePosts } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipilePosts = new UnipilePosts({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipilePosts.createStory(\n  {\n    path: {\n      account_id: ACCOUNT_ID,\n    },\n    body: {\n      attachment: {\n        content: 'value',\n        content_type: 'value',\n        filename: 'value',\n      },\n    },\n  }\n);"
          },
          {
            "name": "Create story",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    posts_api = unipile.PostsApi(api_client)\n\nresponse = posts_api.create_story(\n    ACCOUNT_ID,\n    {\n    'attachment': {\n      'content': 'value',\n      'content_type': 'value',\n      'filename': 'value',\n    },\n  }\n)"
          }
        ],
        "responses": {
          "201": {
            "description": "Default Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "required": [
                    "object",
                    "id",
                    "provider_id",
                    "media_type",
                    "created_at"
                  ],
                  "properties": {
                    "object": {
                      "type": "string",
                      "enum": [
                        "Story"
                      ]
                    },
                    "id": {
                      "description": "The ID of the story for the provider.",
                      "type": "string"
                    },
                    "provider_id": {
                      "description": "The story's raw provider-native identifier.",
                      "type": "string"
                    },
                    "media_type": {
                      "description": "The type of media attached to the story.",
                      "anyOf": [
                        {
                          "type": "string",
                          "enum": [
                            "img"
                          ]
                        },
                        {
                          "type": "string",
                          "enum": [
                            "video"
                          ]
                        }
                      ]
                    },
                    "created_at": {
                      "description": "The creation date of the story. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                      "type": "string"
                    },
                    "expires_at": {
                      "description": "The expiration date of the story (~24h after creation, if supported by the provider). Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
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