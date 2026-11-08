---
updatedAt: 2026-04-24T15:33:11.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Delete a Draft

Permanently deletes the specified Draft.

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
      "name": "Emails",
      "description": "Emails management"
    }
  ],
  "paths": {
    "/v2/{account_id}/drafts/{draft_id}": {
      "delete": {
        "operationId": "deleteDraft",
        "summary": "Delete a Draft",
        "tags": [
          "Emails"
        ],
        "description": "Permanently deletes the specified Draft.",
        "parameters": [
          {
            "schema": {
              "type": "string"
            },
            "in": "path",
            "name": "draft_id",
            "required": true
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
            "name": "Delete draft",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipileEmails } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipileEmails = new UnipileEmails({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipileEmails.deleteDraft(\n  {\n    path: {\n      draft_id: 'draft_id',\n      account_id: ACCOUNT_ID,\n    },\n  }\n);"
          },
          {
            "name": "Delete draft",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    emails_api = unipile.EmailsApi(api_client)\n\nresponse = emails_api.delete_draft(\n    'draft_id',\n    ACCOUNT_ID\n)"
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