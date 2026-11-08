---
updatedAt: 2026-08-27T09:41:59.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Remove a Message Reaction

Removes a reaction of the account's owner from a message.
      Trying to remove a reaction from another user will fail.
      

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
    "/v2/{account_id}/chats/{chat_id}/messages/{message_id}/reactions": {
      "delete": {
        "operationId": "removeMessageReaction",
        "summary": "Remove a Message Reaction",
        "tags": [
          "Messaging"
        ],
        "description": "Removes a reaction of the account's owner from a message.\n      Trying to remove a reaction from another user will fail.\n      ",
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
                    "description": "The emoji unicode to be removed.",
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
            "description": "The ID of the Message where the reaction is."
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
            "name": "Remove message reaction",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipileMessaging } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipileMessaging = new UnipileMessaging({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipileMessaging.removeMessageReaction(\n  {\n    path: {\n      chat_id: 'chat_id',\n      message_id: 'message_id',\n      account_id: ACCOUNT_ID,\n    },\n    body: {\n      reaction: 'value',\n    },\n  }\n);"
          },
          {
            "name": "Remove message reaction",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    messaging_api = unipile.MessagingApi(api_client)\n\nresponse = messaging_api.remove_message_reaction(\n    'chat_id',\n    'message_id',\n    ACCOUNT_ID,\n    {\n    'reaction': 'value',\n  }\n)"
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
                        "MessageReactionRemoved"
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