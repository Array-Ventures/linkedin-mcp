---
updatedAt: 2026-04-24T15:33:11.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Get InMail Credits

Retrieves InMail credits by service or for all subscribed services.

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
      "name": "LinkedIn",
      "description": "Specific LinkedIn methods"
    }
  ],
  "paths": {
    "/v2/{account_id}/linkedin/inmail-credits": {
      "get": {
        "operationId": "getInmailCredits",
        "summary": "Get InMail Credits",
        "tags": [
          "LinkedIn"
        ],
        "description": "Retrieves InMail credits by service or for all subscribed services.",
        "parameters": [
          {
            "schema": {
              "type": "string",
              "enum": [
                "classic",
                "recruiter",
                "sales_navigator"
              ]
            },
            "in": "query",
            "name": "service",
            "required": false,
            "description": "The targeted LinkedIn service. Leave blank to retrieve all credit statements for subscribed services."
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
            "name": "Get inmail credits",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipileLinkedIn } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipileLinkedIn = new UnipileLinkedIn({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipileLinkedIn.getInmailCredits(\n  {\n    path: {\n      account_id: ACCOUNT_ID,\n    },\n  }\n);"
          },
          {
            "name": "Get inmail credits",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    linked_in_api = unipile.LinkedInApi(api_client)\n\nresponse = linked_in_api.get_inmail_credits(\n    ACCOUNT_ID\n)"
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
                    "credits"
                  ],
                  "properties": {
                    "object": {
                      "type": "string",
                      "enum": [
                        "InmailCredits"
                      ]
                    },
                    "credits": {
                      "type": "object",
                      "properties": {
                        "classic": {
                          "description": "InMail credits for Classic Premium.",
                          "type": "number"
                        },
                        "recruiter": {
                          "description": "InMail credits for Recruiter.",
                          "type": "number"
                        },
                        "sales_navigator": {
                          "description": "InMail credits for Sales Navigator.",
                          "type": "number"
                        }
                      }
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