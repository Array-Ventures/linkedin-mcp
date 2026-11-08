---
updatedAt: 2026-04-24T15:33:11.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Update a Draft

Updates the specified Draft by setting the values of the parameters passed. Any parameters not provided will be left unchanged. Outlook native reply drafts, including drafts created in Outlook, keep their conversation. Omit reply_to_message_id: an existing Outlook draft cannot be reparented. Attachments replace the existing list when provided.<br/><br/>Multipart supported, refer to <a href="https://developer.unipile.com/v2.0/reference/api-usage#sending-files">Sending Files</a>.

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
    "/v2/{account_id}/drafts/{draft_id}": {
      "patch": {
        "operationId": "updateDraft",
        "summary": "Update a Draft",
        "tags": [
          "Emails"
        ],
        "description": "Updates the specified Draft by setting the values of the parameters passed. Any parameters not provided will be left unchanged. Outlook native reply drafts, including drafts created in Outlook, keep their conversation. Omit reply_to_message_id: an existing Outlook draft cannot be reparented. Attachments replace the existing list when provided.<br/><br/>Multipart supported, refer to <a href=\"https://developer.unipile.com/v2.0/reference/api-usage#sending-files\">Sending Files</a>.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "html": {
                    "description": "The HTML content of the draft. Required for tracking.",
                    "type": "string"
                  },
                  "plain_text": {
                    "description": "The plain text content of the draft.",
                    "type": "string"
                  },
                  "subject": {
                    "description": "Subject of the draft.",
                    "type": "string"
                  },
                  "from": {
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
                  },
                  "to": {
                    "description": "List of attendees to set in `to` header.",
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
                    "description": "List of attendees to set in `cc` header.",
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
                    "description": "List of attendees to set in `bcc` header.",
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
                    "description": "List of attendees to set in the standard `Reply-To` header. Recipients answering the email will reply to these addresses instead of `from`. To reply inside an existing conversation, use `reply_to_message_id` instead.",
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
                  "reply_to_message_id": {
                    "minLength": 1,
                    "description": "The ID of the email message that you're replying to. For Gmail, use the provider message ID. For IMAP, use the RFC822 Message-ID header. Outlook cannot change the parent of an existing draft: omit this field when updating a native reply draft to preserve its conversation. Set it when creating the draft instead.",
                    "type": "string"
                  },
                  "attachments": {
                    "description": "The list of file attachments to the draft. Any attachment already existing will be removed and replaced by the new ones. For Outlook, each attachment must be smaller than 3 MB.",
                    "type": "array",
                    "items": {
                      "title": "Email File",
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
                        },
                        "content_id": {
                          "description": "The Content-ID (CID) to give to the file, without the surrounding angle brackets. When set, the file is sent as an inline attachment and can be referenced from the HTML content with `cid:<content_id>`, for example `<img src=\"cid:my-logo\">`.",
                          "type": "string"
                        }
                      }
                    }
                  },
                  "tracking_options": {
                    "description": "Configuration of tracking for this email.",
                    "additionalProperties": false,
                    "type": "object",
                    "properties": {
                      "opens": {
                        "default": false,
                        "description": "If `true`, trigger webhooks listening to `tracking.open` when the email is opened by the recipient. Opens rely on a tracking pixel, which mail clients, privacy proxies and security scanners can also load without the recipient reading the email. Each event carries `potentially_bot` and `bot_reasons` so you can exclude these automated opens.",
                        "type": "boolean"
                      },
                      "clicks": {
                        "default": false,
                        "description": "If `true`, trigger webhooks listening to `tracking.click` when the recipient click on a link in the email content.",
                        "type": "boolean"
                      },
                      "label": {
                        "description": "A label to be sent in the tracking event. This can help you to identify the sent email.",
                        "type": "string"
                      },
                      "custom_domain": {
                        "description": "A custom domain verified for the organization, enabled for the application, and pointing to https://track.lnk-fllw.com.",
                        "type": "string"
                      }
                    }
                  },
                  "specifics": {
                    "allOf": [
                      {},
                      {
                        "description": "Object containing provider-specific draft update data.",
                        "type": "object",
                        "properties": {
                          "outlook": {
                            "description": "Specific options to apply if the provider of the targeted account is Outlook.",
                            "type": "object",
                            "properties": {
                              "categories": {
                                "description": "List of categories to assign to the draft.",
                                "type": "array",
                                "items": {
                                  "description": "A category name to assign to the draft.",
                                  "type": "string"
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
          }
        },
        "parameters": [
          {
            "schema": {
              "type": "string"
            },
            "in": "path",
            "name": "draft_id",
            "required": true
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
            "name": "Update draft",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipileEmails } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipileEmails = new UnipileEmails({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipileEmails.updateDraft(\n  {\n    path: {\n      draft_id: 'draft_id',\n      account_id: ACCOUNT_ID,\n    },\n    body: {\n      html: '<p>Hello, world!</p>',\n    },\n  }\n);"
          },
          {
            "name": "Update draft",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    emails_api = unipile.EmailsApi(api_client)\n\nresponse = emails_api.update_draft(\n    'draft_id',\n    ACCOUNT_ID,\n    {\n    'html': '<p>Hello, world!</p>',\n  }\n)"
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