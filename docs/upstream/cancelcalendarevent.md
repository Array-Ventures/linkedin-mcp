---
updatedAt: 2026-09-01T08:26:31.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Cancel a calendar event

Cancels the specified event and notifies its attendees. Only the organizer of the event can cancel it, use the delete event method to remove an event from the calendar of the connected account.
        - For Google, the event is deleted and stays readable as a cancelled event.
        - For Outlook, the event is moved to the Deleted Items folder and is no longer readable by the organizer.

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
    "/v2/{account_id}/calendars/{calendar_id}/events/{event_id}/cancel": {
      "post": {
        "operationId": "cancelCalendarEvent",
        "summary": "Cancel a calendar event",
        "tags": [
          "Calendar"
        ],
        "description": "Cancels the specified event and notifies its attendees. Only the organizer of the event can cancel it, use the delete event method to remove an event from the calendar of the connected account.\n        - For Google, the event is deleted and stays readable as a cancelled event.\n        - For Outlook, the event is moved to the Deleted Items folder and is no longer readable by the organizer.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "additionalProperties": false,
                "type": "object",
                "properties": {
                  "comment": {
                    "description": "A message about the cancellation sent to the attendees. Only available for outlook.",
                    "type": "string"
                  }
                }
              }
            }
          }
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
            "description": "ID of the event to cancel."
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
            "name": "Cancel calendar event",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipileCalendar } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipileCalendar = new UnipileCalendar({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipileCalendar.cancelCalendarEvent(\n  {\n    path: {\n      calendar_id: 'calendar_id',\n      event_id: 'event_id',\n      account_id: ACCOUNT_ID,\n    },\n    body: {\n      comment: 'value',\n    },\n  }\n);"
          },
          {
            "name": "Cancel calendar event",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    calendar_api = unipile.CalendarApi(api_client)\n\nresponse = calendar_api.cancel_calendar_event(\n    'calendar_id',\n    'event_id',\n    ACCOUNT_ID,\n    {\n    'comment': 'value',\n  }\n)"
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