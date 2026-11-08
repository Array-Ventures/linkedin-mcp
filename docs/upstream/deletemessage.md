---
updatedAt: 2026-08-27T09:43:19.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Delete a Message

Deletes one of your own messages. Depending of the provider, the message might still be visible as deleted.
      Trying to delete the message of another user will fail. 

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
    "/v2/{account_id}/chats/{chat_id}/messages/{message_id}": {
      "delete": {
        "operationId": "deleteMessage",
        "summary": "Delete a Message",
        "tags": [
          "Messaging"
        ],
        "description": "Deletes one of your own messages. Depending of the provider, the message might still be visible as deleted.\n      Trying to delete the message of another user will fail. ",
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
            "description": "The ID of the Message to delete."
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
            "name": "Delete message",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipileMessaging } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipileMessaging = new UnipileMessaging({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipileMessaging.deleteMessage(\n  {\n    path: {\n      chat_id: 'chat_id',\n      message_id: 'message_id',\n      account_id: ACCOUNT_ID,\n    },\n  }\n);"
          },
          {
            "name": "Delete message",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    messaging_api = unipile.MessagingApi(api_client)\n\nresponse = messaging_api.delete_message(\n    'chat_id',\n    'message_id',\n    ACCOUNT_ID\n)"
          }
        ],
        "responses": {
          "204": {
            "description": "Default Response"
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