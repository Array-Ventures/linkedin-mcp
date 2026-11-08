---
updatedAt: 2026-08-27T09:42:39.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Set Composing Status

Sets the composing status of the user in a chat.

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
    "/v2/{account_id}/chats/{chat_id}/composing": {
      "post": {
        "operationId": "setComposingStatus",
        "summary": "Set Composing Status",
        "tags": [
          "Messaging"
        ],
        "description": "Sets the composing status of the user in a chat.",
        "parameters": [
          {
            "schema": {
              "type": "string",
              "enum": [
                "typing",
                "recording"
              ]
            },
            "in": "query",
            "name": "action",
            "required": true,
            "description": "The composing status of a user in a chat.\n    - `typing` if the user is typing / sending a message. This presence must target a chat.\n    - `recording` if the user is recording a voice note. This presence must target a chat."
          },
          {
            "schema": {
              "minLength": 1,
              "type": "string"
            },
            "in": "path",
            "name": "chat_id",
            "required": true,
            "description": "ID of the Chat where the composing action is taking place."
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
                        "ComposingSet"
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