---
updatedAt: 2026-09-01T08:26:38.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Restore a cancelled calendar event

Restores an event previously cancelled by the connected account. Only the organizer of the event can restore it.
        - Only available for Google Calendar, and only while Google still holds the data of the cancelled event.
        - Outlook exposes no way to restore a cancelled event and always answers a `provider/method_not_allowed` error.

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
    "/v2/{account_id}/calendars/{calendar_id}/events/{event_id}/restore": {
      "post": {
        "operationId": "restoreCalendarEvent",
        "summary": "Restore a cancelled calendar event",
        "tags": [
          "Calendar"
        ],
        "description": "Restores an event previously cancelled by the connected account. Only the organizer of the event can restore it.\n        - Only available for Google Calendar, and only while Google still holds the data of the cancelled event.\n        - Outlook exposes no way to restore a cancelled event and always answers a `provider/method_not_allowed` error.",
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
            "description": "ID of the event to restore."
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
            "name": "Restore calendar event",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipileCalendar } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipileCalendar = new UnipileCalendar({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipileCalendar.restoreCalendarEvent(\n  {\n    path: {\n      calendar_id: 'calendar_id',\n      event_id: 'event_id',\n      account_id: ACCOUNT_ID,\n    },\n  }\n);"
          },
          {
            "name": "Restore calendar event",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    calendar_api = unipile.CalendarApi(api_client)\n\nresponse = calendar_api.restore_calendar_event(\n    'calendar_id',\n    'event_id',\n    ACCOUNT_ID\n)"
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