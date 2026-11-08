---
updatedAt: 2026-07-13T14:37:36.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Resend Checkpoint Notification or Code

Resend the notification or code for the current checkpoint of the given authentication intent. Use Request Checkpoint to request a different checkpoint.

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
      "name": "Custom Auth",
      "description": "Custom account authentication"
    }
  ],
  "paths": {
    "/v2/auth/checkpoint/resend": {
      "post": {
        "operationId": "resendCheckpoint",
        "summary": "Resend Checkpoint Notification or Code",
        "tags": [
          "Custom Auth"
        ],
        "description": "Resend the notification or code for the current checkpoint of the given authentication intent. Use Request Checkpoint to request a different checkpoint.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "intent_id"
                ],
                "properties": {
                  "intent_id": {
                    "description": "The ID of the intent for which a checkpoint must be resent.",
                    "type": "string",
                    "pattern": "^acc_(.*)$"
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
            "name": "Resend checkpoint",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipileCustomAuth } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipileCustomAuth = new UnipileCustomAuth({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipileCustomAuth.resendCheckpoint(\n  {\n    body: {\n      intent_id: 'intent_id',\n    },\n  }\n);"
          },
          {
            "name": "Resend checkpoint",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    custom_auth_api = unipile.CustomAuthApi(api_client)\n\nresponse = custom_auth_api.resend_checkpoint(\n    {\n    'intent_id': 'intent_id',\n  }\n)"
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