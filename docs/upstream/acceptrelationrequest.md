---
updatedAt: 2026-08-27T09:49:03.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Accept a Relation request

Accepts a received relation request from another user. Trying to accept a sent relation request will fail.

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
    "/v2/{account_id}/users/me/relation-requests/{request_id}/accept": {
      "post": {
        "operationId": "acceptRelationRequest",
        "summary": "Accept a Relation request",
        "tags": [
          "Users"
        ],
        "description": "Accepts a received relation request from another user. Trying to accept a sent relation request will fail.",
        "parameters": [
          {
            "schema": {
              "minLength": 1,
              "type": "string"
            },
            "in": "path",
            "name": "request_id",
            "required": true,
            "description": "The ID of the Relation / Follow request."
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
            "name": "Accept relation request",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipileUsers } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipileUsers = new UnipileUsers({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipileUsers.acceptRelationRequest(\n  {\n    path: {\n      request_id: 'request_id',\n      account_id: ACCOUNT_ID,\n    },\n  }\n);"
          },
          {
            "name": "Accept relation request",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    users_api = unipile.UsersApi(api_client)\n\nresponse = users_api.accept_relation_request(\n    'request_id',\n    ACCOUNT_ID\n)"
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
                        "RelationRequestConfirmed"
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