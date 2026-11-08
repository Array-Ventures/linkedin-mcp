---
updatedAt: 2026-04-24T15:33:11.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# List all Calendars

Returns a list of calendars.

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
      "get": {
        "operationId": "getCalendarsList",
        "summary": "List all Calendars",
        "tags": [
          "Calendar"
        ],
        "description": "Returns a list of calendars.",
        "parameters": [
          {
            "schema": {
              "type": "number"
            },
            "in": "query",
            "name": "offset",
            "required": false,
            "description": "An offset used for pagination, if supported by the provider, else use `cursor`."
          },
          {
            "schema": {
              "type": "string"
            },
            "in": "query",
            "name": "cursor",
            "required": false,
            "description": "A cursor used for pagination. If supported by the provider, use `next_cursor` given by the previous page of the list, else use `offset`."
          },
          {
            "schema": {
              "default": 20,
              "minimum": 1,
              "type": "number"
            },
            "in": "query",
            "name": "limit",
            "required": false,
            "description": "The limit of items to be returned. The maximum allowed value depends on the provider. This is a ceiling, not a guarantee: some providers can return fewer items than requested for a given page."
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
            "name": "Get calendars list",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipileCalendar } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipileCalendar = new UnipileCalendar({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipileCalendar.getCalendarsList(\n  {\n    path: {\n      account_id: ACCOUNT_ID,\n    },\n  }\n);"
          },
          {
            "name": "Get calendars list",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    calendar_api = unipile.CalendarApi(api_client)\n\nresponse = calendar_api.get_calendars_list(\n    ACCOUNT_ID\n)"
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