---
updatedAt: 2026-09-01T08:26:22.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Respond to a calendar event

Sets the response of the connected account to an event it is invited to. Only the response of the connected account is affected, the other attendees are left untouched.
        - For Outlook, declining an invitation also removes the event from the calendar of the connected account, and the organizer of an event cannot respond to it.
        - For Google, the organizer can respond when they are also an attendee of the event.

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
    "/v2/{account_id}/calendars/{calendar_id}/events/{event_id}/rsvp": {
      "post": {
        "operationId": "setCalendarEventRsvp",
        "summary": "Respond to a calendar event",
        "tags": [
          "Calendar"
        ],
        "description": "Sets the response of the connected account to an event it is invited to. Only the response of the connected account is affected, the other attendees are left untouched.\n        - For Outlook, declining an invitation also removes the event from the calendar of the connected account, and the organizer of an event cannot respond to it.\n        - For Google, the organizer can respond when they are also an attendee of the event.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "additionalProperties": false,
                "type": "object",
                "required": [
                  "status"
                ],
                "properties": {
                  "status": {
                    "description": "The response of the connected account to the invitation.\n          - `yes` accepts the invitation.\n          - `maybe` accepts the invitation tentatively.\n          - `no` declines the invitation.",
                    "type": "string",
                    "enum": [
                      "yes",
                      "maybe",
                      "no"
                    ]
                  },
                  "comment": {
                    "description": "A comment sent to the organizer along with the response.",
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
              "minLength": 1,
              "type": "string"
            },
            "in": "path",
            "name": "calendar_id",
            "required": true,
            "description": "Identifier of the parent calendar."
          },
          {
            "schema": {
              "minLength": 1,
              "type": "string"
            },
            "in": "path",
            "name": "event_id",
            "required": true,
            "description": "ID of the event to respond to."
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
            "name": "Set calendar event rsvp",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipileCalendar } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipileCalendar = new UnipileCalendar({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipileCalendar.setCalendarEventRsvp(\n  {\n    path: {\n      calendar_id: 'calendar_id',\n      event_id: 'event_id',\n      account_id: ACCOUNT_ID,\n    },\n    body: {\n      status: 'yes',\n    },\n  }\n);"
          },
          {
            "name": "Set calendar event rsvp",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    calendar_api = unipile.CalendarApi(api_client)\n\nresponse = calendar_api.set_calendar_event_rsvp(\n    'calendar_id',\n    'event_id',\n    ACCOUNT_ID,\n    {\n    'status': 'yes',\n  }\n)"
          }
        ],
        "responses": {
          "204": {
            "description": "Default Response"
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