---
updatedAt: 2026-08-27T09:42:44.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Set Presence

Sets the presence of the user.

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
    "/v2/{account_id}/presence": {
      "post": {
        "operationId": "setPresence",
        "summary": "Set Presence",
        "tags": [
          "Messaging"
        ],
        "description": "Sets the presence of the user.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "presence"
                ],
                "properties": {
                  "presence": {
                    "description": "The presence of the user.\n    - `online` if the user is online / available.\n    _ `restricted_online` if the user is online to a restricted set of contacts.\n    - `offline` if the user is offline / unavailable.\n    - `away` if the user is away / busy.",
                    "type": "string",
                    "enum": [
                      "online",
                      "restricted_online",
                      "offline",
                      "away"
                    ]
                  }
                }
              }
            }
          },
          "required": true
        },
        "x-samples-languages": [
          "node",
          "python",
          "curl"
        ],
        "x-code-samples": [
          {
            "name": "Set presence",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipileMessaging } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipileMessaging = new UnipileMessaging({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipileMessaging.setPresence(\n  {\n    path: {\n      account_id: ACCOUNT_ID,\n    },\n    body: {\n      presence: 'online',\n    },\n  }\n);"
          },
          {
            "name": "Set presence",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    messaging_api = unipile.MessagingApi(api_client)\n\nresponse = messaging_api.set_presence(\n    ACCOUNT_ID,\n    {\n    'presence': 'online',\n  }\n)"
          }
        ],
        "parameters": [
          {
            "schema": {
              "type": "string"
            },
            "in": "path",
            "name": "account_id",
            "required": true
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
                        "PresenceSet"
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