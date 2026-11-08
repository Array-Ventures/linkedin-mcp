---
updatedAt: 2026-04-24T15:33:11.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# List all Drafts

Returns a list of the account drafts. Drafts are returned sorted by their creation date, with the most recent appearing first.

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
      "name": "Emails",
      "description": "Emails management"
    }
  ],
  "paths": {
    "/v2/{account_id}/drafts": {
      "get": {
        "operationId": "getDraftsList",
        "summary": "List all Drafts",
        "tags": [
          "Emails"
        ],
        "description": "Returns a list of the account drafts. Drafts are returned sorted by their creation date, with the most recent appearing first.",
        "parameters": [
          {
            "schema": {
              "type": "string"
            },
            "in": "query",
            "name": "to",
            "required": false,
            "description": "Filter to only return drafts with the given email address in to, cc or bcc field."
          },
          {
            "schema": {
              "type": "string"
            },
            "in": "query",
            "name": "from",
            "required": false,
            "description": "Filter to only return drafts  with the given email address in from."
          },
          {
            "schema": {
              "type": "string"
            },
            "in": "query",
            "name": "any_email",
            "required": false,
            "description": "Filter to only return drafts related to a comma-separated list of email addresses."
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
            "name": "Get drafts list",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipileEmails } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipileEmails = new UnipileEmails({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipileEmails.getDraftsList(\n  {\n    path: {\n      account_id: ACCOUNT_ID,\n    },\n  }\n);"
          },
          {
            "name": "Get drafts list",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    emails_api = unipile.EmailsApi(api_client)\n\nresponse = emails_api.get_drafts_list(\n    ACCOUNT_ID\n)"
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
                          "id",
                          "body",
                          "snippet",
                          "subject",
                          "attachments",
                          "folders"
                        ],
                        "properties": {
                          "object": {
                            "type": "string",
                            "enum": [
                              "EmailDraft"
                            ]
                          },
                          "id": {
                            "description": "The ID of the draft.",
                            "type": "string"
                          },
                          "thread_id": {
                            "description": "The ID of the thread the draft belongs to. For IMAP drafts, this field is present only when the server provides a native thread ID.",
                            "type": "string"
                          },
                          "body": {
                            "description": "The body of the draft.",
                            "type": "string"
                          },
                          "snippet": {
                            "description": "The snippet (preview) of the draft.",
                            "type": "string"
                          },
                          "subject": {
                            "description": "The subject of the draft.",
                            "type": "string"
                          },
                          "from": {
                            "description": "The list of attendees that the email should be sent from.",
                            "type": "array",
                            "items": {
                              "type": "object",
                              "required": [
                                "email"
                              ],
                              "properties": {
                                "email": {
                                  "description": "The email address of the attendee.",
                                  "type": "string"
                                },
                                "display_name": {
                                  "description": "The display name of the attendee if any.",
                                  "type": "string"
                                }
                              }
                            }
                          },
                          "to": {
                            "description": "The list of attendees that the email should be sent to.",
                            "type": "array",
                            "items": {
                              "type": "object",
                              "required": [
                                "email"
                              ],
                              "properties": {
                                "email": {
                                  "description": "The email address of the attendee.",
                                  "type": "string"
                                },
                                "display_name": {
                                  "description": "The display name of the attendee if any.",
                                  "type": "string"
                                }
                              }
                            }
                          },
                          "cc": {
                            "description": "The list of attendees that the email should be CC'd to.",
                            "type": "array",
                            "items": {
                              "type": "object",
                              "required": [
                                "email"
                              ],
                              "properties": {
                                "email": {
                                  "description": "The email address of the attendee.",
                                  "type": "string"
                                },
                                "display_name": {
                                  "description": "The display name of the attendee if any.",
                                  "type": "string"
                                }
                              }
                            }
                          },
                          "bcc": {
                            "description": "The list of attendees that the email should be BCC'd to.",
                            "type": "array",
                            "items": {
                              "type": "object",
                              "required": [
                                "email"
                              ],
                              "properties": {
                                "email": {
                                  "description": "The email address of the attendee.",
                                  "type": "string"
                                },
                                "display_name": {
                                  "description": "The display name of the attendee if any.",
                                  "type": "string"
                                }
                              }
                            }
                          },
                          "reply_to": {
                            "description": "The list of attendees that the replies should be sent to.",
                            "type": "array",
                            "items": {
                              "type": "object",
                              "required": [
                                "email"
                              ],
                              "properties": {
                                "email": {
                                  "description": "The email address of the attendee.",
                                  "type": "string"
                                },
                                "display_name": {
                                  "description": "The display name of the attendee if any.",
                                  "type": "string"
                                }
                              }
                            }
                          },
                          "attachments": {
                            "description": "The attachments of the draft.",
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
                          "folders": {
                            "description": "The folder the draft is in. For Gmail, the labels assigned to the draft.",
                            "type": "array",
                            "items": {
                              "type": "string"
                            }
                          },
                          "categories": {
                            "description": "List of categories assigned to the draft.",
                            "type": "array",
                            "items": {
                              "description": "(Outlook only) Name of a category assigned to the draft.",
                              "type": "string"
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