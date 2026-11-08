---
updatedAt: 2026-10-15T15:22:15.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Pin a Message

Pins the specified message at the top of its chat, or unpins it, if supported by the provider.
      Pinning the message of another user is allowed, but providers might require an admin role or some permissions in a group chat.
      Depending on the provider.

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
    "/v2/{account_id}/chats/{chat_id}/messages/{message_id}/pin": {
      "post": {
        "operationId": "pinMessage",
        "summary": "Pin a Message",
        "tags": [
          "Messaging"
        ],
        "description": "Pins the specified message at the top of its chat, or unpins it, if supported by the provider.\n      Pinning the message of another user is allowed, but providers might require an admin role or some permissions in a group chat.\n      Depending on the provider.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "pin_status"
                ],
                "properties": {
                  "pin_status": {
                    "description": "Set to `true` to pin the message in the chat, or `false` to unpin it.",
                    "type": "boolean"
                  },
                  "specifics": {
                    "description": "Object containing provider-specific pin data.",
                    "type": "object",
                    "properties": {
                      "whatsapp": {
                        "description": "Specific options for pinning a WhatsApp message.",
                        "additionalProperties": false,
                        "type": "object",
                        "properties": {
                          "pin_duration": {
                            "description": "How long the message should stay pinned, Whatsapp unpinning it by itself once elapsed.\n        - `24_hours` for a day.\n        - `7_days` for a week.\n        - `30_days` for a month.",
                            "default": "30_days",
                            "type": "string",
                            "enum": [
                              "24_hours",
                              "7_days",
                              "30_days"
                            ]
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
            "description": "The ID of the Message to pin or unpin."
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
            "name": "Pin message",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipileMessaging } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipileMessaging = new UnipileMessaging({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipileMessaging.pinMessage(\n  {\n    path: {\n      chat_id: 'chat_id',\n      message_id: 'message_id',\n      account_id: ACCOUNT_ID,\n    },\n    body: {\n      pin_status: false,\n    },\n  }\n);"
          },
          {
            "name": "Pin message",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    messaging_api = unipile.MessagingApi(api_client)\n\nresponse = messaging_api.pin_message(\n    'chat_id',\n    'message_id',\n    ACCOUNT_ID,\n    {\n    'pin_status': False,\n  }\n)"
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
                        "MessagePinUpdated"
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