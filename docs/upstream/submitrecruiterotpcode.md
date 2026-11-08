---
updatedAt: 2026-04-24T15:33:11.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Submit Otp Verification Code

Completes the process of member identity verification.

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
    "/v2/{account_id}/linkedin/recruiter/company/{company_id}/member/submit-otp": {
      "post": {
        "operationId": "submitRecruiterOtpCode",
        "summary": "Submit Otp Verification Code",
        "tags": [
          "LinkedIn"
        ],
        "description": "Completes the process of member identity verification.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "email",
                  "code",
                  "challenge_id"
                ],
                "properties": {
                  "email": {
                    "description": "The email address on which you received the code.",
                    "type": "string"
                  },
                  "code": {
                    "description": "The code that has been sent to you on the provided email address.",
                    "type": "string"
                  },
                  "challenge_id": {
                    "description": "The challenge ID that you got from member verification response.",
                    "type": "string"
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
              "type": "string"
            },
            "in": "path",
            "name": "company_id",
            "required": true,
            "description": "The ID of the company for which the user's identity must be verified."
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
            "name": "Submit recruiter otp code",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipileLinkedIn } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipileLinkedIn = new UnipileLinkedIn({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipileLinkedIn.submitRecruiterOtpCode(\n  {\n    path: {\n      company_id: 'company_id',\n      account_id: ACCOUNT_ID,\n    },\n    body: {\n      email: 'john.doe@example.com',\n      code: '123456',\n      challenge_id: 'challenge_id',\n    },\n  }\n);"
          },
          {
            "name": "Submit recruiter otp code",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    linked_in_api = unipile.LinkedInApi(api_client)\n\nresponse = linked_in_api.submit_recruiter_otp_code(\n    'company_id',\n    ACCOUNT_ID,\n    {\n    'email': 'john.doe@example.com',\n    'code': '123456',\n    'challenge_id': 'challenge_id',\n  }\n)"
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
                        "MemberVerified"
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