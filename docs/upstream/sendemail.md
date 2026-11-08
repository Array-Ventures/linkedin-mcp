---
updatedAt: 2026-04-24T15:33:11.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Send an Email

Sends an Email to the recipients in the `to`, `cc`, and `bcc`.<br/><br/>Multipart supported, refer to <a href="https://developer.unipile.com/v2.0/reference/api-usage#sending-files">Sending Files</a>.

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
    "/v2/{account_id}/emails/send": {
      "post": {
        "operationId": "sendEmail",
        "summary": "Send an Email",
        "tags": [
          "Emails"
        ],
        "description": "Sends an Email to the recipients in the `to`, `cc`, and `bcc`.<br/><br/>Multipart supported, refer to <a href=\"https://developer.unipile.com/v2.0/reference/api-usage#sending-files\">Sending Files</a>.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "additionalProperties": false,
                "type": "object",
                "required": [
                  "to"
                ],
                "properties": {
                  "html": {
                    "description": "The HTML content of the email. Required for tracking.",
                    "type": "string"
                  },
                  "plain_text": {
                    "description": "The plain text content of the email.",
                    "type": "string"
                  },
                  "subject": {
                    "description": "Subject of the email.",
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
                    "description": "List of attendees to set in the standard `Reply-To` header. Recipients answering the email will reply to these addresses instead of `from`. To reply inside an existing conversation, use `reply_to_provider_id` instead.",
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
                  "reply_to_provider_id": {
                    "minLength": 1,
                    "description": "The provider ID of the email to reply to. Use the `id` returned when listing or retrieving the original email. Takes precedence over the deprecated `reply_to_message_id` field when both are provided.",
                    "type": "string"
                  },
                  "reply_to_message_id": {
                    "minLength": 1,
                    "deprecated": true,
                    "description": "Deprecated: use reply_to_provider_id instead. The ID of the email message that you're replying to. For Gmail and Outlook, this is the provider ID. For IMAP Send, this is the RFC822 Message-ID header and does not mark the original email as answered. Ignored when reply_to_provider_id is provided.",
                    "type": "string"
                  },
                  "attachments": {
                    "description": "The list of file attachments to the email.",
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
                  "custom_headers": {
                    "description": "An array of custom headers to add to the email. Each header overrides any existing header with the same name (case-insensitive), including headers set by other fields such as `to`, `cc`, `bcc`, `from`, `subject`, or `reply_to`. A `Reply-To` custom header therefore takes precedence over the `reply_to` field and its value is used verbatim.",
                    "type": "array",
                    "items": {
                      "type": "object",
                      "required": [
                        "name",
                        "value"
                      ],
                      "properties": {
                        "name": {
                          "type": "string"
                        },
                        "value": {
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
            "name": "Send email",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipileEmails } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipileEmails = new UnipileEmails({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipileEmails.sendEmail(\n  {\n    path: {\n      account_id: ACCOUNT_ID,\n    },\n    body: {\n      to: [{\n          email: 'john.doe@example.com',\n          display_name: 'John Doe',\n        }],\n    },\n  }\n);"
          },
          {
            "name": "Send email",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    emails_api = unipile.EmailsApi(api_client)\n\nresponse = emails_api.send_email(\n    ACCOUNT_ID,\n    {\n    'to': [{\n        'email': 'john.doe@example.com',\n        'display_name': 'John Doe',\n      }],\n  }\n)"
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
                    "id"
                  ],
                  "properties": {
                    "object": {
                      "type": "string",
                      "enum": [
                        "EmailSent"
                      ]
                    },
                    "id": {
                      "description": "The ID of the email.",
                      "type": "string"
                    },
                    "message_id": {
                      "description": "The Message-ID header value of the email. Use `id` in Unipile requests. May be absent when the header could not be retrieved after sending (the email has been sent anyway).",
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