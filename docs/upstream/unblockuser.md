---
updatedAt: 2026-11-04T08:33:48.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Unblock a User

Unblocks a user previously blocked by the account owner. Unblocking a User that is not blocked has no effect. The `is_blocked` field of the User profile reflects the result.
      LIMITATIONS: On LinkedIn, the password of the account must be provided in the specifics and the same User cannot be blocked again for 48 hours.

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
    "/v2/{account_id}/users/me/unblock/{user_id}": {
      "post": {
        "operationId": "unblockUser",
        "summary": "Unblock a User",
        "tags": [
          "Users"
        ],
        "description": "Unblocks a user previously blocked by the account owner. Unblocking a User that is not blocked has no effect. The `is_blocked` field of the User profile reflects the result.\n      LIMITATIONS: On LinkedIn, the password of the account must be provided in the specifics and the same User cannot be blocked again for 48 hours.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "specifics": {
                    "allOf": [
                      {},
                      {
                        "description": "Object containing provider-specific unblock options.",
                        "type": "object",
                        "properties": {
                          "linkedin": {
                            "title": "LinkedIn",
                            "description": "Specific options to apply if the provider of the targeted account is Linkedin.",
                            "type": "object",
                            "required": [
                              "password"
                            ],
                            "properties": {
                              "password": {
                                "minLength": 1,
                                "description": "The password of the account. LinkedIn asks for it on every unblock and rejects the operation without it. It is only forwarded to the provider and never stored.",
                                "type": "string"
                              }
                            }
                          }
                        }
                      }
                    ]
                  }
                }
              }
            }
          }
        },
        "parameters": [
          {
            "schema": {
              "minLength": 1,
              "type": "string"
            },
            "in": "path",
            "name": "user_id",
            "required": true,
            "description": "The ID of the User to unblock."
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
            "name": "Unblock user",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipileUsers } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipileUsers = new UnipileUsers({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipileUsers.unblockUser(\n  {\n    path: {\n      user_id: 'user_id',\n      account_id: ACCOUNT_ID,\n    },\n    body: {\n      specifics: {\n        linkedin: {},\n      },\n    },\n  }\n);"
          },
          {
            "name": "Unblock user",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    users_api = unipile.UsersApi(api_client)\n\nresponse = users_api.unblock_user(\n    'user_id',\n    ACCOUNT_ID,\n    {\n    'specifics': {\n      'linkedin': {},\n    },\n  }\n)"
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
                        "UserUnblocked"
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