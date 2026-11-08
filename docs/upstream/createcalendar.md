---
updatedAt: 2026-04-24T15:33:11.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Create a Calendar

Create a new calendar.

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
      "name": "Calendar",
      "description": "Calendars management"
    }
  ],
  "paths": {
    "/v2/{account_id}/calendars": {
      "post": {
        "operationId": "createCalendar",
        "summary": "Create a Calendar",
        "tags": [
          "Calendar"
        ],
        "description": "Create a new calendar.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "additionalProperties": false,
                "type": "object",
                "required": [
                  "name"
                ],
                "properties": {
                  "name": {
                    "description": "Name of the new calendar",
                    "type": "string"
                  },
                  "description": {
                    "description": "Description of the calendar",
                    "type": "string"
                  },
                  "background_color": {
                    "description": "Background color of the calendar in hexadecimal format.",
                    "type": "string"
                  },
                  "timezone": {
                    "description": "Timezone used in this calendar (IANA, e.g. `Europe/Paris`).",
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
            "name": "Create calendar",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipileCalendar } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipileCalendar = new UnipileCalendar({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipileCalendar.createCalendar(\n  {\n    path: {\n      account_id: ACCOUNT_ID,\n    },\n    body: {\n      name: 'My Name',\n    },\n  }\n);"
          },
          {
            "name": "Create calendar",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    calendar_api = unipile.CalendarApi(api_client)\n\nresponse = calendar_api.create_calendar(\n    ACCOUNT_ID,\n    {\n    'name': 'My Name',\n  }\n)"
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
                    "id",
                    "name",
                    "is_read_only",
                    "is_owned_by_user",
                    "is_default",
                    "background_color"
                  ],
                  "properties": {
                    "object": {
                      "type": "string",
                      "enum": [
                        "Calendar"
                      ]
                    },
                    "id": {
                      "description": "The ID of the calendar.",
                      "type": "string"
                    },
                    "name": {
                      "description": "Name of the calendar.",
                      "type": "string"
                    },
                    "description": {
                      "description": "Description of the calendar.",
                      "type": "string"
                    },
                    "is_read_only": {
                      "description": "Indicates if the calendar is read-only or not.",
                      "type": "boolean"
                    },
                    "is_owned_by_user": {
                      "description": "Indicates if the user owns this calendar.",
                      "type": "boolean"
                    },
                    "is_default": {
                      "description": "Indicates if this is the primary calendar of the user.",
                      "type": "boolean"
                    },
                    "background_color": {
                      "description": "Background color of the calendar in hexadecimal format.",
                      "type": "string"
                    },
                    "text_color": {
                      "description": "Foreground color of the calendar in hexadecimal format.",
                      "type": "string"
                    },
                    "timezone": {
                      "description": "Timezone used in this calendar.",
                      "type": "string"
                    },
                    "specifics": {
                      "description": "Object containing provider-specific calendar data."
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