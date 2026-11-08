---
updatedAt: 2026-10-15T15:21:51.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Get Company Follow Request Credits

Retrieves the remaining credits for inviting members to follow a LinkedIn company page.

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
    "/v2/{account_id}/linkedin/company/{company_id}/follow-requests/credits": {
      "get": {
        "operationId": "getCompanyFollowInvitationCredits",
        "summary": "Get Company Follow Request Credits",
        "tags": [
          "LinkedIn"
        ],
        "description": "Retrieves the remaining credits for inviting members to follow a LinkedIn company page.",
        "parameters": [
          {
            "schema": {
              "type": "string",
              "pattern": "^[0-9]+$"
            },
            "in": "path",
            "name": "company_id",
            "required": true,
            "description": "The numeric LinkedIn company ID. The owner of the account must be an administrator of the page."
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
        "responses": {
          "200": {
            "description": "Default Response",
            "content": {
              "application/json": {
                "schema": {
                  "additionalProperties": false,
                  "type": "object",
                  "required": [
                    "object",
                    "remaining_credit",
                    "credit_grant",
                    "resets_on"
                  ],
                  "properties": {
                    "object": {
                      "type": "string",
                      "enum": [
                        "CompanyFollowInvitationCredits"
                      ]
                    },
                    "remaining_credit": {
                      "description": "The remaining credit for inviting members to follow the company page.",
                      "type": "number"
                    },
                    "credit_grant": {
                      "description": "The credit that is granted to you on each reset.",
                      "type": "number"
                    },
                    "resets_on": {
                      "description": "The next reset date of the credits. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
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