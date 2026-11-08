---
updatedAt: 2026-08-27T09:42:56.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Send a Message

Sends a message in the specified chat.
      Use <a href="https://developer.unipile.com/v2.0/reference/startchat">Start a Chat</a> or <a href="https://developer.unipile.com/v2.0/reference/startchatfrominbox">Start a Chat from Inbox</a> if no conversation has been started with the specified user or group of users yet.<br/><br/>Multipart supported, refer to <a href="https://developer.unipile.com/v2.0/reference/api-usage#sending-files">Sending Files</a>.

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
    "/v2/{account_id}/chats/{chat_id}/messages/send": {
      "post": {
        "operationId": "sendMessage",
        "summary": "Send a Message",
        "tags": [
          "Messaging"
        ],
        "description": "Sends a message in the specified chat.\n      Use <a href=\"https://developer.unipile.com/v2.0/reference/startchat\">Start a Chat</a> or <a href=\"https://developer.unipile.com/v2.0/reference/startchatfrominbox\">Start a Chat from Inbox</a> if no conversation has been started with the specified user or group of users yet.<br/><br/>Multipart supported, refer to <a href=\"https://developer.unipile.com/v2.0/reference/api-usage#sending-files\">Sending Files</a>.",
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
                    "description": "The textual content of first message to be sent. It's recommended not to use HTML or Markdown. To mention a chat participant, write `@` followed by their user ID, as found in `sender_id` or the chat attendees: it is replaced with their name and notifies them where the provider supports mentions. A provider may still deliver the mention as plain text.",
                    "type": "string"
                  },
                  "quote_id": {
                    "minLength": 1,
                    "description": "The ID of the Message to quote / reply to.",
                    "type": "string"
                  },
                  "attachments": {
                    "description": "The list of attachments (uploaded files or a shared post or job) to be sent with the message.",
                    "type": "array",
                    "items": {
                      "title": "Message File",
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
                        "send_mode": {
                          "description": "Defines how the attachment should be sent, if the provider supports multiple modes.\n            Omitted: use the provider’s native default behavior.\n            - `file` send as a regular uploaded file.\n            - `native` send as a native media (displayed picture, voice note, recorded video, etc.)",
                          "default": "native",
                          "type": "string",
                          "enum": [
                            "file",
                            "native"
                          ]
                        },
                        "voice_note": {
                          "description": "Deprecated compatibility flag for audio attachments. Use `send_mode: \"native\"` instead.",
                          "deprecated": true,
                          "type": "boolean"
                        }
                      }
                    }
                  },
                  "specifics": {
                    "description": "Object containing provider-specific message data.",
                    "type": "object",
                    "properties": {
                      "linkedin": {
                        "description": "Specific options to apply if the provider of the targeted account is Linkedin",
                        "type": "object",
                        "properties": {
                          "classic": {
                            "title": "LinkedIn Classic",
                            "description": "Specific options for a LinkedIn classic message.",
                            "additionalProperties": false,
                            "type": "object",
                            "properties": {
                              "shared_content": {
                                "description": "A specific content to be shared in the current message.",
                                "type": "object",
                                "required": [
                                  "type",
                                  "id"
                                ],
                                "properties": {
                                  "type": {
                                    "description": "The type of content.",
                                    "type": "string",
                                    "enum": [
                                      "POST",
                                      "JOB_POSTING"
                                    ]
                                  },
                                  "id": {
                                    "description": "The ID of the content to be shared.",
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
            "name": "chat_id",
            "required": true,
            "description": "The ID of the Chat to send the message to."
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
            "name": "Send message",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipileMessaging } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipileMessaging = new UnipileMessaging({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipileMessaging.sendMessage(\n  {\n    path: {\n      chat_id: 'chat_id',\n      account_id: ACCOUNT_ID,\n    },\n    body: {\n      text: 'Hello, world!',\n    },\n  }\n);"
          },
          {
            "name": "Send message",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    messaging_api = unipile.MessagingApi(api_client)\n\nresponse = messaging_api.send_message(\n    'chat_id',\n    ACCOUNT_ID,\n    {\n    'text': 'Hello, world!',\n  }\n)"
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
                    "message_id"
                  ],
                  "properties": {
                    "object": {
                      "type": "string",
                      "enum": [
                        "MessageSent"
                      ]
                    },
                    "message_id": {
                      "description": "The ID of the message sent. Some providers send attachments separately from the text content, which can result in multiple sent message IDs.",
                      "anyOf": [
                        {
                          "type": "string"
                        },
                        {
                          "type": "array",
                          "items": {
                            "type": "string"
                          }
                        },
                        {
                          "type": "null"
                        }
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