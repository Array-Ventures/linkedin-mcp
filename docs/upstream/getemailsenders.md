---
updatedAt: 2026-07-15T11:39:20.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# List email senders

Returns the email senders available for the connected account, so you can discover the valid values to pass as `from` when sending emails or creating drafts. The list includes the primary address as well as any configured additional addresses. Supported for Google and Outlook accounts. For Outlook, additional addresses are only available on Microsoft 365 / Exchange accounts; personal Microsoft accounts return the primary address only.

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
    "/v2/{account_id}/email-senders": {
      "get": {
        "operationId": "getEmailSenders",
        "summary": "List email senders",
        "tags": [
          "Emails"
        ],
        "description": "Returns the email senders available for the connected account, so you can discover the valid values to pass as `from` when sending emails or creating drafts. The list includes the primary address as well as any configured additional addresses. Supported for Google and Outlook accounts. For Outlook, additional addresses are only available on Microsoft 365 / Exchange accounts; personal Microsoft accounts return the primary address only.",
        "parameters": [
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
            "name": "Get email senders",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipileEmails } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipileEmails = new UnipileEmails({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipileEmails.getEmailSenders(\n  {\n    path: {\n      account_id: ACCOUNT_ID,\n    },\n  }\n);"
          },
          {
            "name": "Get email senders",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    emails_api = unipile.EmailsApi(api_client)\n\nresponse = emails_api.get_email_senders(\n    ACCOUNT_ID\n)"
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
                    "data"
                  ],
                  "properties": {
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "required": [
                          "object",
                          "email",
                          "is_primary",
                          "verification_status"
                        ],
                        "properties": {
                          "object": {
                            "description": "Object type identifier, always \"EmailSender\".",
                            "type": "string",
                            "enum": [
                              "EmailSender"
                            ]
                          },
                          "email": {
                            "description": "Email address that can be placed in the `from` header when sending emails.",
                            "type": "string"
                          },
                          "display_name": {
                            "description": "Display name associated with the address, when the provider exposes one.",
                            "type": "string"
                          },
                          "is_primary": {
                            "description": "Whether this is the primary address of the mailbox (the address used to authenticate the account).",
                            "type": "boolean"
                          },
                          "is_default": {
                            "description": "Whether this is the default \"From:\" address used when composing a new message. Only exposed by providers that have a distinct default sender (Gmail).",
                            "type": "boolean"
                          },
                          "verification_status": {
                            "description": "Readiness of the address for sending. `verified`: the address is confirmed and can be used in the `from` field. `pending`: the email sender exists but has not completed verification and is not ready to send (Gmail custom addresses). `unknown`: the provider does not expose per-address readiness (e.g. Outlook proxy addresses, whose usability depends on the tenant `SendFromAliasEnabled` setting).",
                            "anyOf": [
                              {
                                "type": "string",
                                "enum": [
                                  "verified"
                                ]
                              },
                              {
                                "type": "string",
                                "enum": [
                                  "pending"
                                ]
                              },
                              {
                                "type": "string",
                                "enum": [
                                  "unknown"
                                ]
                              }
                            ]
                          },
                          "signature": {
                            "description": "HTML signature configured for this address, when the provider exposes one (Gmail). It is not appended automatically when sending: include it yourself at the end of the `body`/`html` of the email. Absent when the address has no signature, and not supported by Outlook.",
                            "type": "string"
                          }
                        }
                      }
                    },
                    "total_count": {
                      "description": "Total number of results if supported by the provider.",
                      "type": "number"
                    },
                    "next_cursor": {
                      "description": "Cursor to get the next page of results if supported. Else use `offset`.",
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