---
updatedAt: 2026-04-24T15:33:11.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Create a New Project

Creates a new project in the current contract.

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
    "/v2/{account_id}/linkedin/recruiter/projects": {
      "post": {
        "operationId": "createRecruiterHiringProject",
        "summary": "Create a New Project",
        "tags": [
          "LinkedIn"
        ],
        "description": "Creates a new project in the current contract.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "name",
                  "visibility"
                ],
                "properties": {
                  "name": {
                    "description": "The name of the project.",
                    "type": "string"
                  },
                  "visibility": {
                    "description": "The vibility of the project.",
                    "type": "string",
                    "enum": [
                      "PRIVATE",
                      "PUBLIC"
                    ]
                  },
                  "description": {
                    "description": "The description of the project.",
                    "type": "string"
                  },
                  "company": {
                    "description": "The company on whose behalf the project is created.",
                    "type": "object",
                    "properties": {
                      "id": {
                        "description": "A parameter ID. Use <a href=\"https://developer.unipile.com/v2.0/reference/getrecruitersearchparameters\">List Search Parameters</a> with `COMPANY` type to find out the possible values.",
                        "type": "string"
                      },
                      "name": {
                        "description": "The name of the company.",
                        "type": "string"
                      }
                    }
                  },
                  "job_title": {
                    "description": "The job title of the project.",
                    "type": "object",
                    "required": [
                      "id",
                      "name"
                    ],
                    "properties": {
                      "id": {
                        "description": "A parameter ID. Use <a href=\"https://developer.unipile.com/v2.0/reference/getrecruitersearchparameters\">List Search Parameters</a> with `JOB_TITLE` type to find out the possible values.",
                        "type": "string"
                      },
                      "name": {
                        "description": "The name of the job.",
                        "type": "string"
                      }
                    }
                  },
                  "location": {
                    "description": "A parameter ID. Use <a href=\"https://developer.unipile.com/v2.0/reference/getrecruitersearchparameters\">List Search Parameters</a> with `LOCATION` type to find out the possible values.",
                    "type": "string"
                  },
                  "seniority_level": {
                    "description": "The level of experience of the project.",
                    "type": "string",
                    "enum": [
                      "INTERNSHIP",
                      "ENTRY_LEVEL",
                      "ASSOCIATE",
                      "MID_SENIOR_LEVEL",
                      "DIRECTOR",
                      "EXECUTIVE",
                      "NOT_APPLICABLE"
                    ]
                  },
                  "employment_status": {
                    "description": "The employment status of the project.",
                    "type": "string",
                    "enum": [
                      "FULL_TIME",
                      "PART_TIME",
                      "CONTRACT",
                      "TEMPORARY",
                      "OTHER",
                      "VOLUNTEER",
                      "INTERNSHIP"
                    ]
                  },
                  "industry": {
                    "maxItems": 3,
                    "minItems": 1,
                    "description": "A list of parameter IDs. Use <a href=\"https://developer.unipile.com/v2.0/reference/getrecruitersearchparameters\">List Search Parameters</a> with `INDUSTRY` type to find out the possible values. The company industries related to the project.",
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  },
                  "job_function": {
                    "maxItems": 3,
                    "minItems": 1,
                    "description": "A list of parameter IDs. Use <a href=\"https://developer.unipile.com/v2.0/reference/getrecruitersearchparameters\">List Search Parameters</a> with `JOB_FUNCTION` type to find out the possible values. The job functions of the project.",
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
            "name": "Create recruiter hiring project",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipileLinkedIn } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipileLinkedIn = new UnipileLinkedIn({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipileLinkedIn.createRecruiterHiringProject(\n  {\n    path: {\n      account_id: ACCOUNT_ID,\n    },\n    body: {\n      name: 'My Name',\n      visibility: 'PRIVATE',\n    },\n  }\n);"
          },
          {
            "name": "Create recruiter hiring project",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    linked_in_api = unipile.LinkedInApi(api_client)\n\nresponse = linked_in_api.create_recruiter_hiring_project(\n    ACCOUNT_ID,\n    {\n    'name': 'My Name',\n    'visibility': 'PRIVATE',\n  }\n)"
          }
        ],
        "responses": {
          "201": {
            "description": "Default Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "required": [
                    "object",
                    "project_id"
                  ],
                  "properties": {
                    "object": {
                      "type": "string",
                      "enum": [
                        "ProjectCreated"
                      ]
                    },
                    "project_id": {
                      "description": "The ID of the newly created Project.",
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