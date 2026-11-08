---
updatedAt: 2026-10-06T13:42:14.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Get a User Presence

Returns whether the specified User is currently online, identified by the id returned by the provider. Only supported by Instagram, LinkedIn, Telegram and WhatsApp. A User whose provider reports no presence at all is returned as `unknown`, and Instagram and WhatsApp never report the presence of the account owner. Instagram also only shares the presence of other Users when the account shares its own activity status.

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
      "name": "Users",
      "description": "Users managment"
    }
  ],
  "paths": {
    "/v2/{account_id}/users/{user_id}/presence": {
      "get": {
        "operationId": "getUserPresence",
        "summary": "Get a User Presence",
        "tags": [
          "Users"
        ],
        "description": "Returns whether the specified User is currently online, identified by the id returned by the provider. Only supported by Instagram, LinkedIn, Telegram and WhatsApp. A User whose provider reports no presence at all is returned as `unknown`, and Instagram and WhatsApp never report the presence of the account owner. Instagram also only shares the presence of other Users when the account shares its own activity status.",
        "parameters": [
          {
            "schema": {
              "minLength": 1,
              "type": "string"
            },
            "in": "path",
            "name": "user_id",
            "required": true,
            "description": "The ID of the User whose presence must be retrieved, as returned by the provider. Use `me` to specify the owner of the connected account, although providers do not always report the presence of the account owner."
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
            "name": "Get user presence",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipileUsers } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipileUsers = new UnipileUsers({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipileUsers.getUserPicture(\n  {\n    path: {\n      user_id: 'user_id',\n      account_id: ACCOUNT_ID,\n    },\n  }\n);"
          },
          {
            "name": "Get user presence",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    users_api = unipile.UsersApi(api_client)\n\nresponse = users_api.get_user_picture(\n    'user_id',\n    ACCOUNT_ID\n)"
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
                    "user_id",
                    "presence",
                    "provider"
                  ],
                  "properties": {
                    "object": {
                      "type": "string",
                      "enum": [
                        "UserPresence"
                      ]
                    },
                    "user_id": {
                      "description": "The ID of the User this presence belongs to.",
                      "type": "string"
                    },
                    "presence": {
                      "description": "Whether the user is currently connected to the provider.\n    - `online` if the user is connected right now.\n    - `offline` if the user is not connected. `last_online_at` is set when the provider exposes the exact date.\n    - `unknown` if the provider reports no presence for this user, which usually means the user hides it.",
                      "type": "string",
                      "enum": [
                        "online",
                        "offline",
                        "unknown"
                      ]
                    },
                    "last_online_at": {
                      "description": "Date and time when the user was last online. Only set when the user is offline and the provider exposes the exact date.",
                      "type": "string"
                    },
                    "provider": {
                      "description": "The provider's of the Account.\n    - `mock` is mock.\n    - `whatsapp` is WhatsApp.\n    - `linkedin` is LinkedIn.\n    - `instagram` is Instagram.\n    - `facebook` is Facebook.\n    - `google` is Google.\n    - `outlook` is Outlook.\n    - `telegram` is Telegram.\n    - `imap` is IMAP.",
                      "type": "string",
                      "enum": [
                        "mock",
                        "whatsapp",
                        "linkedin",
                        "google",
                        "outlook",
                        "imap",
                        "telegram",
                        "instagram",
                        "facebook"
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