---
updatedAt: 2026-08-27T09:48:12.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Report a Profile Visit

Report to the provider that you have visited a given user profile. This can be used to simulate engagement and activity.

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
    "/v2/{account_id}/users/visit-profile": {
      "post": {
        "operationId": "visitUserProfile",
        "summary": "Report a Profile Visit",
        "tags": [
          "Users"
        ],
        "description": "Report to the provider that you have visited a given user profile. This can be used to simulate engagement and activity.",
        "parameters": [
          {
            "schema": {
              "type": "string"
            },
            "in": "query",
            "name": "token",
            "required": true,
            "description": "The `notify_visit_token` field that you may get from a profile result, depending on whether the provider supports it."
          },
          {
            "schema": {
              "type": "string"
            },
            "in": "path",
            "name": "account_id",
            "required": true
          }
        ],
        "x-samples-languages": [
          "node",
          "python",
          "curl"
        ],
        "x-code-samples": [
          {
            "name": "Get user profile",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipileUsers } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipileUsers = new UnipileUsers({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipileUsers.getUserProfile(\n  {\n    path: {\n      user_id: 'user_id',\n      account_id: ACCOUNT_ID,\n    },\n  }\n);"
          },
          {
            "name": "Get user profile",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    users_api = unipile.UsersApi(api_client)\n\nresponse = users_api.get_user_profile(\n    'user_id',\n    ACCOUNT_ID\n)"
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
                        "ProfileVisited"
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