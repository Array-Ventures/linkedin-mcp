---
updatedAt: 2026-04-30T12:29:01.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Endorse a Member's Skill

Validates a given skill for one of your relations.

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
    "/v2/{account_id}/linkedin/member/{member_id}/endorse-skill": {
      "post": {
        "operationId": "endorseClassicMemberSkill",
        "summary": "Endorse a Member's Skill",
        "tags": [
          "LinkedIn"
        ],
        "description": "Validates a given skill for one of your relations.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "skill_id"
                ],
                "properties": {
                  "skill_id": {
                    "description": "The endorsement ID for the selected skill.<br/>Use <a href=\"https://developer.unipile.com/v2.0/reference/getuserprofile\">Get a User Profile</a> with `linkedin_skills` in param `with_sections` to retrieve the skills you can endorse for the given member.",
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
            "name": "member_id",
            "required": true,
            "description": "The ID of the member for which to endorse the skill."
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
            "name": "Endorse classic member skill",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipileLinkedIn } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipileLinkedIn = new UnipileLinkedIn({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipileLinkedIn.endorseClassicMemberSkill(\n  {\n    path: {\n      member_id: 'member_id',\n      account_id: ACCOUNT_ID,\n    },\n    body: {\n      skill_id: 'skill_id',\n    },\n  }\n);"
          },
          {
            "name": "Endorse classic member skill",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    linked_in_api = unipile.LinkedInApi(api_client)\n\nresponse = linked_in_api.endorse_classic_member_skill(\n    'member_id',\n    ACCOUNT_ID,\n    {\n    'skill_id': 'skill_id',\n  }\n)"
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
                        "SkillEndorsed"
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