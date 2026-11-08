---
updatedAt: 2026-04-24T15:36:57.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# List Available Contracts

Returns a list of Recruiter/Sales Navigator contracts associated with your account.

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
    "/v2/{account_id}/linkedin/contracts": {
      "get": {
        "operationId": "getAvailableContracts",
        "summary": "List Available Contracts",
        "tags": [
          "LinkedIn"
        ],
        "description": "Returns a list of Recruiter/Sales Navigator contracts associated with your account.",
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
            "name": "Get available contracts",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipileLinkedIn } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipileLinkedIn = new UnipileLinkedIn({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipileLinkedIn.getAvailableContracts(\n  {\n    path: {\n      account_id: ACCOUNT_ID,\n    },\n  }\n);"
          },
          {
            "name": "Get available contracts",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    linked_in_api = unipile.LinkedInApi(api_client)\n\nresponse = linked_in_api.get_available_contracts(\n    ACCOUNT_ID\n)"
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
                    "contracts"
                  ],
                  "properties": {
                    "object": {
                      "type": "string",
                      "enum": [
                        "AvailableContracts"
                      ]
                    },
                    "contracts": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "required": [
                          "object",
                          "product",
                          "selected",
                          "id",
                          "name"
                        ],
                        "properties": {
                          "object": {
                            "type": "string",
                            "enum": [
                              "Contract"
                            ]
                          },
                          "product": {
                            "type": "string",
                            "enum": [
                              "recruiter",
                              "sales_navigator"
                            ]
                          },
                          "selected": {
                            "type": "boolean"
                          },
                          "id": {
                            "description": "The ID of the contract.",
                            "type": "string"
                          },
                          "name": {
                            "description": "The name of the contract.",
                            "type": "string"
                          },
                          "description": {
                            "description": "The description of the contract.",
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