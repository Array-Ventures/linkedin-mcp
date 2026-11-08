---
updatedAt: 2026-04-24T15:33:11.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Update a Comment

Updates an existing comment.

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
    "/v2/{account_id}/posts/{post_id}/comments/{comment_id}": {
      "patch": {
        "operationId": "updatePostComment",
        "summary": "Update a Comment",
        "tags": [
          "Posts"
        ],
        "description": "Updates an existing comment.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "text"
                ],
                "properties": {
                  "text": {
                    "description": "Updated textual content of the comment. User mentions can be added by inserting an @ followed by the `id` or `public_identifier` of the user (example: @JohnDoe).",
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
            "description": "The ID of the Post where the comment is.<br>Use IDs from *Get a Post*, *Create a Post* or *List all User's Posts* methods responses only. Some providers may allow native Post IDs, please refer to Posts integration guides."
          },
          {
            "schema": {
              "minLength": 1,
              "type": "string"
            },
            "in": "path",
            "name": "comment_id",
            "required": true,
            "description": "The ID of the Comment to update."
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
            "name": "Update post comment",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipilePosts } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipilePosts = new UnipilePosts({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipilePosts.updatePostComment(\n  {\n    path: {\n      post_id: 'post_id',\n      comment_id: 'comment_id',\n      account_id: ACCOUNT_ID,\n    },\n    body: {\n      text: 'Hello, world!',\n    },\n  }\n);"
          },
          {
            "name": "Update post comment",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    posts_api = unipile.PostsApi(api_client)\n\nresponse = posts_api.update_post_comment(\n    'post_id',\n    'comment_id',\n    ACCOUNT_ID,\n    {\n    'text': 'Hello, world!',\n  }\n)"
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
                    "id",
                    "author",
                    "created_at",
                    "text",
                    "attachments",
                    "is_sender",
                    "can_reply",
                    "can_react",
                    "reply_counter",
                    "reactions_counter"
                  ],
                  "properties": {
                    "object": {
                      "type": "string",
                      "enum": [
                        "Comment"
                      ]
                    },
                    "id": {
                      "description": "The ID of the comment.",
                      "type": "string"
                    },
                    "thread_id": {
                      "description": "The ID of the thread if this is a reply to another comment.",
                      "type": "string"
                    },
                    "author": {
                      "description": "The author of the comment.",
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
                          "description": "Provider-specific user data."
                        }
                      }
                    },
                    "created_at": {
                      "description": "The creation date of the comment. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                      "type": "string"
                    },
                    "text": {
                      "description": "The text content of the comment.",
                      "type": "string"
                    },
                    "attachments": {
                      "description": "List of comment attachments.",
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
                    "is_sender": {
                      "description": "Is the current user the sender of the comment.",
                      "type": "boolean"
                    },
                    "can_reply": {
                      "description": "Whether the current user can reply to the comment or not.",
                      "type": "boolean"
                    },
                    "can_react": {
                      "description": "Whether the current user can react to the comment or not.",
                      "type": "boolean"
                    },
                    "reply_counter": {
                      "description": "The number of replies to the comment.",
                      "type": "number"
                    },
                    "impressions_counter": {
                      "description": "The number of impressions of the comment.",
                      "type": "number"
                    },
                    "reactions_counter": {
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