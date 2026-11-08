---
updatedAt: 2026-10-15T15:21:45.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Invite Members to Follow a Company

Sends a request to one or more users to follow a LinkedIn company page administered by the account.

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
    "/v2/{account_id}/linkedin/company/{company_id}/follow-requests": {
      "post": {
        "operationId": "sendCompanyFollowInvitation",
        "summary": "Invite Members to Follow a Company",
        "tags": [
          "LinkedIn"
        ],
        "description": "Sends a request to one or more users to follow a LinkedIn company page administered by the account.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "additionalProperties": false,
                "type": "object",
                "required": [
                  "member_ids"
                ],
                "properties": {
                  "member_ids": {
                    "minItems": 1,
                    "uniqueItems": true,
                    "description": "A list of member profile IDs (ACo...) identifying the members to invite to follow the company page.",
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "required": true
        },
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
                    "result"
                  ],
                  "properties": {
                    "object": {
                      "type": "string",
                      "enum": [
                        "CompanyFollowInvitationsSent"
                      ]
                    },
                    "result": {
                      "type": "object",
                      "required": [
                        "invitations_ids",
                        "invitations_count"
                      ],
                      "properties": {
                        "invitations_ids": {
                          "description": "The IDs of the successfully sent invitations.",
                          "type": "array",
                          "items": {
                            "type": "string"
                          }
                        },
                        "invitations_count": {
                          "type": "object",
                          "required": [
                            "success",
                            "failed"
                          ],
                          "properties": {
                            "success": {
                              "description": "The amount of successful invitations.",
                              "type": "number"
                            },
                            "failed": {
                              "description": "The amount of failed invitations.",
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