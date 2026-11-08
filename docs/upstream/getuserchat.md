---
updatedAt: 2026-08-27T09:40:03.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Get a User Chat

Resolves chat identifiers associated with the specified User. Depending on the provider, the result may include chats with or without message history, and may return multiple matches across inboxes or contexts.

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
    "/v2/{account_id}/users/{user_id}/chat": {
      "get": {
        "operationId": "getUserChat",
        "summary": "Get a User Chat",
        "tags": [
          "Messaging"
        ],
        "description": "Resolves chat identifiers associated with the specified User. Depending on the provider, the result may include chats with or without message history, and may return multiple matches across inboxes or contexts.",
        "parameters": [
          {
            "schema": {
              "minLength": 1,
              "type": "string"
            },
            "in": "path",
            "name": "user_id",
            "required": true,
            "description": "ID of the User whose existing 1to1 Chat should be retrieved."
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
            "name": "Get user chat",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipileMessaging } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipileMessaging = new UnipileMessaging({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipileMessaging.getChatPicture(\n  {\n    path: {\n      chat_id: 'chat_id',\n      account_id: ACCOUNT_ID,\n    },\n  }\n);"
          },
          {
            "name": "Get user chat",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    messaging_api = unipile.MessagingApi(api_client)\n\nresponse = messaging_api.get_chat_picture(\n    'chat_id',\n    ACCOUNT_ID\n)"
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
                    "data"
                  ],
                  "properties": {
                    "object": {
                      "type": "string",
                      "enum": [
                        "ChatLookup"
                      ]
                    },
                    "data": {
                      "description": "Resolved chats associated with the given user. Empty if none could be resolved.",
                      "type": "array",
                      "items": {
                        "type": "object",
                        "required": [
                          "chat_id"
                        ],
                        "properties": {
                          "chat_id": {
                            "description": "The ID of the Chat associated with the given user.",
                            "type": "string"
                          },
                          "inbox_id": {
                            "description": "The ID of the Inbox containing the chat, if applicable.",
                            "type": "string"
                          },
                          "has_history": {
                            "description": "Whether the provider could determine that the chat already contains message history.",
                            "type": "boolean"
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