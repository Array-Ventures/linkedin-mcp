---
updatedAt: 2026-04-24T15:33:11.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Send a Draft

Sends the specified Draft to the recipients in the `to`, `cc`, and `bcc` fields of the draft. Outlook sends the existing native draft, preserving its reply conversation.

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
    "/v2/{account_id}/drafts/{draft_id}/send": {
      "post": {
        "operationId": "sendDraft",
        "summary": "Send a Draft",
        "tags": [
          "Emails"
        ],
        "description": "Sends the specified Draft to the recipients in the `to`, `cc`, and `bcc` fields of the draft. Outlook sends the existing native draft, preserving its reply conversation.",
        "parameters": [
          {
            "schema": {
              "type": "string"
            },
            "in": "path",
            "name": "draft_id",
            "required": true,
            "description": "ID of the draft to send."
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
            "name": "Send draft",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipileEmails } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipileEmails = new UnipileEmails({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipileEmails.sendDraft(\n  {\n    path: {\n      draft_id: 'draft_id',\n      account_id: ACCOUNT_ID,\n    },\n  }\n);"
          },
          {
            "name": "Send draft",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    emails_api = unipile.EmailsApi(api_client)\n\nresponse = emails_api.send_draft(\n    'draft_id',\n    ACCOUNT_ID\n)"
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
                    "id"
                  ],
                  "properties": {
                    "object": {
                      "type": "string",
                      "enum": [
                        "EmailSent"
                      ]
                    },
                    "id": {
                      "description": "The ID of the email.",
                      "type": "string"
                    },
                    "message_id": {
                      "description": "The Message-ID header value of the email. Use `id` in Unipile requests. May be absent when the header could not be retrieved after sending (the email has been sent anyway).",
                      "type": "string"
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