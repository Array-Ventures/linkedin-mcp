---
updatedAt: 2026-09-15T13:27:57.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Get Job Slots Credits

Retrieves current contract Job slots credits.

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
    "/v2/{account_id}/linkedin/recruiter/job-slots-credits": {
      "get": {
        "operationId": "getRecruiterJobSlotsCredits",
        "summary": "Get Job Slots Credits",
        "tags": [
          "LinkedIn"
        ],
        "description": "Retrieves current contract Job slots credits.",
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
            "name": "Get recruiter job slots credits",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipileLinkedIn } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipileLinkedIn = new UnipileLinkedIn({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipileLinkedIn.getRecruiterJobSlotsCredits(\n  {\n    path: {\n      account_id: ACCOUNT_ID,\n    },\n  }\n);"
          },
          {
            "name": "Get recruiter job slots credits",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    linked_in_api = unipile.LinkedInApi(api_client)\n\nresponse = linked_in_api.get_recruiter_job_slots_credits(\n    ACCOUNT_ID\n)"
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
                    "total",
                    "used",
                    "available"
                  ],
                  "properties": {
                    "object": {
                      "type": "string",
                      "enum": [
                        "JobSlotsCredits"
                      ]
                    },
                    "total": {
                      "description": "The total amount of Job slots for your Recruiter contract.",
                      "type": "number"
                    },
                    "used": {
                      "description": "The amount of Job slots currently in use for your Recruiter contract.",
                      "type": "number"
                    },
                    "available": {
                      "description": "The available amount of Job slots for your Recruiter contract.",
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