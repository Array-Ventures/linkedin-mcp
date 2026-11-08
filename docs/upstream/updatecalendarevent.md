---
updatedAt: 2026-04-24T15:33:11.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Update a calendar event

Updates the specified calendar by setting the values of the parameters passed. Any parameters not provided will be left unchanged.

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
    "/v2/{account_id}/calendars/{calendar_id}/events/{event_id}": {
      "patch": {
        "operationId": "updateCalendarEvent",
        "summary": "Update a calendar event",
        "tags": [
          "Calendar"
        ],
        "description": "Updates the specified calendar by setting the values of the parameters passed. Any parameters not provided will be left unchanged.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "additionalProperties": false,
                "type": "object",
                "properties": {
                  "title": {
                    "description": "The title of the event.",
                    "type": "string"
                  },
                  "body": {
                    "description": "The body of the event.",
                    "type": "string"
                  },
                  "location": {
                    "description": "The location of the event.",
                    "type": "string"
                  },
                  "background_color": {
                    "description": "Background color of the calendar in hexadecimal format. For Google we match the closest palette available",
                    "type": "string"
                  },
                  "transparency": {
                    "description": "The transparency of the event.\n            - `opaque` does block time on the calendar and is equivalent to setting Show me as to Busy in the Calendar UI.\n            - `transparent` does not block time on the calendar and is equivalent to setting Show me as to Available in the Calendar UI.",
                    "type": "string",
                    "enum": [
                      "opaque",
                      "transparent"
                    ]
                  },
                  "visibility": {
                    "description": "The visibility of the event.\n            - `public` is visible to all.\n            - `private` is visible only to the calendar owner.",
                    "type": "string",
                    "enum": [
                      "public",
                      "private"
                    ]
                  },
                  "conference": {
                    "description": "A conference to generate or attach, or `null` to remove the conference currently on the event.",
                    "anyOf": [
                      {
                        "description": "A conference to generate or attach to the event.\n        The way the conference is associated with the event may vary depending on the calendar and the selected provider:\n        it can be generated and hosted natively by the provider (e.g. Google Meet on Google, Microsoft Teams or Skype on\n        Outlook), or, when a \"url\" is provided, attached as an existing conference whose join link is published in the\n        event body.",
                        "additionalProperties": false,
                        "type": "object",
                        "required": [
                          "provider"
                        ],
                        "properties": {
                          "provider": {
                            "description": "The conference provider to generate or attach.",
                            "type": "string",
                            "enum": [
                              "google_meet",
                              "zoom",
                              "skype",
                              "teams",
                              "unknown"
                            ]
                          },
                          "conference_id": {
                            "description": "The conference identifier assigned by its provider.",
                            "type": "string"
                          },
                          "url": {
                            "description": "The URL of an existing conference to attach to the event. Must be an absolute credential-free HTTPS URL.\n        When omitted, conference generation is requested. Availability depends on the calendar and the selected provider;\n        when generation is not supported, provide the URL of an existing conference.",
                            "type": "string"
                          }
                        }
                      },
                      {
                        "type": "null"
                      }
                    ]
                  },
                  "is_attendees_list_hidden": {
                    "description": "Is the attendees list hidden for attendees.",
                    "type": "boolean"
                  },
                  "attendees": {
                    "type": "array",
                    "items": {
                      "description": "An attendee to invite to the event.",
                      "additionalProperties": false,
                      "type": "object",
                      "required": [
                        "email"
                      ],
                      "properties": {
                        "email": {
                          "description": "Email of the attendee.",
                          "type": "string"
                        },
                        "type": {
                          "description": "The type of the attendee.\n            - `required` the attendance of the attendee is required.\n            - `optional` the attendance of the attendee is optional.",
                          "default": "required",
                          "type": "string",
                          "enum": [
                            "required",
                            "optional"
                          ]
                        }
                      }
                    }
                  },
                  "recurrence": {
                    "description": "List of RRULE, EXRULE, RDATE and EXDATE lines for a recurring event, as specified in RFC5545.",
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  },
                  "start": {
                    "description": "The start date and time of the event.",
                    "discriminator": {
                      "propertyName": "type"
                    },
                    "anyOf": [
                      {
                        "description": "A date and time.",
                        "additionalProperties": false,
                        "type": "object",
                        "required": [
                          "type",
                          "date_time"
                        ],
                        "properties": {
                          "type": {
                            "description": "Indicates a date-time value.",
                            "type": "string",
                            "enum": [
                              "datetime"
                            ]
                          },
                          "date_time": {
                            "description": "The date and time. May include a UTC offset, or be expressed as a local date and time without an offset (e.g. `2026-10-08T10:00:00`). When no offset is provided, the value is interpreted in `timezone`, or in the event-level timezone when set; otherwise it defaults to UTC.",
                            "type": "string"
                          },
                          "timezone": {
                            "description": "The IANA timezone in which the date and time is expressed (e.g. `Europe/Paris`). When omitted, uses the event-level timezone if set; otherwise defaults to UTC.",
                            "type": "string"
                          }
                        }
                      },
                      {
                        "description": "A date.",
                        "additionalProperties": false,
                        "type": "object",
                        "required": [
                          "type",
                          "date"
                        ],
                        "properties": {
                          "type": {
                            "description": "Indicates a date-only value (for all-day events).",
                            "type": "string",
                            "enum": [
                              "date"
                            ]
                          },
                          "date": {
                            "description": "The date. Must use a supported date format. See [supported date formats](https://developer.unipile.com/v2.0/reference/api-usage#dates).",
                            "format": "date",
                            "type": "string"
                          },
                          "timezone": {
                            "description": "The IANA timezone in which the date is expressed (e.g. `Europe/Paris`).",
                            "type": "string"
                          }
                        }
                      }
                    ]
                  },
                  "end": {
                    "description": "The end date and time of the event.",
                    "discriminator": {
                      "propertyName": "type"
                    },
                    "anyOf": [
                      {
                        "description": "A date and time.",
                        "additionalProperties": false,
                        "type": "object",
                        "required": [
                          "type",
                          "date_time"
                        ],
                        "properties": {
                          "type": {
                            "description": "Indicates a date-time value.",
                            "type": "string",
                            "enum": [
                              "datetime"
                            ]
                          },
                          "date_time": {
                            "description": "The date and time. May include a UTC offset, or be expressed as a local date and time without an offset (e.g. `2026-10-08T10:00:00`). When no offset is provided, the value is interpreted in `timezone`, or in the event-level timezone when set; otherwise it defaults to UTC.",
                            "type": "string"
                          },
                          "timezone": {
                            "description": "The IANA timezone in which the date and time is expressed (e.g. `Europe/Paris`). When omitted, uses the event-level timezone if set; otherwise defaults to UTC.",
                            "type": "string"
                          }
                        }
                      },
                      {
                        "description": "A date.",
                        "additionalProperties": false,
                        "type": "object",
                        "required": [
                          "type",
                          "date"
                        ],
                        "properties": {
                          "type": {
                            "description": "Indicates a date-only value (for all-day events).",
                            "type": "string",
                            "enum": [
                              "date"
                            ]
                          },
                          "date": {
                            "description": "The date. Must use a supported date format. See [supported date formats](https://developer.unipile.com/v2.0/reference/api-usage#dates).",
                            "format": "date",
                            "type": "string"
                          },
                          "timezone": {
                            "description": "The IANA timezone in which the date is expressed (e.g. `Europe/Paris`).",
                            "type": "string"
                          }
                        }
                      }
                    ]
                  },
                  "notify": {
                    "description": "Only available for google, guests to send updates to:\n      - `all`: Notify all guests.\n      - `externalOnly`: Notify only guests not on the calendar's domain.\n      - `none`: Do not notify any guests.",
                    "type": "string",
                    "enum": [
                      "all",
                      "externalOnly",
                      "none"
                    ]
                  },
                  "timezone": {
                    "description": "The IANA timezone the event is expressed in (e.g. `Europe/Paris`). Defaults to UTC when omitted.",
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
            "description": "ID of the event to update."
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
            "name": "Update calendar event",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipileCalendar } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipileCalendar = new UnipileCalendar({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipileCalendar.updateCalendarEvent(\n  {\n    path: {\n      calendar_id: 'calendar_id',\n      event_id: 'event_id',\n      account_id: ACCOUNT_ID,\n    },\n    body: {\n      title: 'value',\n    },\n  }\n);"
          },
          {
            "name": "Update calendar event",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    calendar_api = unipile.CalendarApi(api_client)\n\nresponse = calendar_api.update_calendar_event(\n    'calendar_id',\n    'event_id',\n    ACCOUNT_ID,\n    {\n    'title': 'value',\n  }\n)"
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
                    "id",
                    "calendar_id",
                    "created_at",
                    "updated_at",
                    "title",
                    "is_cancelled",
                    "is_all_day",
                    "is_attendees_list_hidden",
                    "start",
                    "end",
                    "organizer",
                    "visibility",
                    "transparency",
                    "event_type"
                  ],
                  "properties": {
                    "object": {
                      "type": "string",
                      "enum": [
                        "CalendarEvent"
                      ]
                    },
                    "id": {
                      "description": "The ID of the calendar event.",
                      "type": "string"
                    },
                    "master_event_id": {
                      "description": "If event instance, the ID of the master event.",
                      "type": "string"
                    },
                    "calendar_id": {
                      "description": "The ID of the calendar the event belongs to.",
                      "type": "string"
                    },
                    "ical_uid": {
                      "description": "The iCalendar UID (RFC5545 UID) of the event. Unlike `id`, it is shared by every copy of the event across the calendars of its attendees, and stays stable when the event is exported or imported.",
                      "type": "string"
                    },
                    "created_at": {
                      "description": "The date the event was created. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SSZ).",
                      "type": "string"
                    },
                    "updated_at": {
                      "description": "The date the event was last updated. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                      "type": "string"
                    },
                    "title": {
                      "description": "The title of the event.",
                      "type": "string"
                    },
                    "body": {
                      "description": "The body of the event.",
                      "type": "string"
                    },
                    "location": {
                      "description": "The location of the event.",
                      "type": "string"
                    },
                    "is_cancelled": {
                      "description": "Is the event cancelled.",
                      "type": "boolean"
                    },
                    "is_all_day": {
                      "description": "Is the event all day.",
                      "type": "boolean"
                    },
                    "is_attendees_list_hidden": {
                      "description": "Is the attendees list hidden for attendees.",
                      "type": "boolean"
                    },
                    "attendees": {
                      "description": "The attendees of the event.",
                      "type": "array",
                      "items": {
                        "description": "An attendee of a calendar event.",
                        "type": "object",
                        "required": [
                          "email",
                          "is_organizer",
                          "is_self",
                          "is_optional",
                          "is_resource",
                          "type",
                          "response_status"
                        ],
                        "properties": {
                          "email": {
                            "description": "Email address of the attendee.",
                            "type": "string"
                          },
                          "display_name": {
                            "description": "Display name of the attendee.",
                            "type": "string"
                          },
                          "comment": {
                            "description": "The response comment of the attendee.",
                            "type": "string"
                          },
                          "is_organizer": {
                            "description": "Is the attendee the organizer of the event.",
                            "type": "boolean"
                          },
                          "is_self": {
                            "description": "Is the attendee the connected account.",
                            "type": "boolean"
                          },
                          "is_optional": {
                            "description": "Is the attendee optional (based on type).",
                            "type": "boolean"
                          },
                          "is_resource": {
                            "description": "Is the attendee a resource (based on type).",
                            "type": "boolean"
                          },
                          "type": {
                            "description": "Type of the attendee.\n          - `required` is a required attendee.\n          - `optional` is an optional attendee.\n          - `resource` is a resource attendee like a room or a device.",
                            "type": "string",
                            "enum": [
                              "required",
                              "optional",
                              "resource"
                            ]
                          },
                          "response_status": {
                            "description": "The response status of the attendee.\n          - `yes` if the invitation is accepted.\n          - `no` if the invitation is declined.\n          - `maybe` if the attendee is not sure.\n          - `noreply` if the invitation is pending.",
                            "type": "string",
                            "enum": [
                              "yes",
                              "no",
                              "maybe",
                              "noreply"
                            ]
                          }
                        }
                      }
                    },
                    "start": {
                      "description": "The start date and time of the event.",
                      "discriminator": {
                        "propertyName": "type"
                      },
                      "anyOf": [
                        {
                          "description": "A date and time.",
                          "additionalProperties": false,
                          "type": "object",
                          "required": [
                            "type",
                            "date_time"
                          ],
                          "properties": {
                            "type": {
                              "description": "Indicates a date-time value.",
                              "type": "string",
                              "enum": [
                                "datetime"
                              ]
                            },
                            "date_time": {
                              "description": "The date and time. May include a UTC offset, or be expressed as a local date and time without an offset (e.g. `2026-10-08T10:00:00`). When no offset is provided, the value is interpreted in `timezone`, or in the event-level timezone when set; otherwise it defaults to UTC.",
                              "type": "string"
                            },
                            "timezone": {
                              "description": "The IANA timezone in which the date and time is expressed (e.g. `Europe/Paris`). When omitted, uses the event-level timezone if set; otherwise defaults to UTC.",
                              "type": "string"
                            }
                          }
                        },
                        {
                          "description": "A date.",
                          "additionalProperties": false,
                          "type": "object",
                          "required": [
                            "type",
                            "date"
                          ],
                          "properties": {
                            "type": {
                              "description": "Indicates a date-only value (for all-day events).",
                              "type": "string",
                              "enum": [
                                "date"
                              ]
                            },
                            "date": {
                              "description": "The date. Must use a supported date format. See [supported date formats](https://developer.unipile.com/v2.0/reference/api-usage#dates).",
                              "format": "date",
                              "type": "string"
                            },
                            "timezone": {
                              "description": "The IANA timezone in which the date is expressed (e.g. `Europe/Paris`).",
                              "type": "string"
                            }
                          }
                        }
                      ]
                    },
                    "end": {
                      "description": "The end date and time of the event.",
                      "discriminator": {
                        "propertyName": "type"
                      },
                      "anyOf": [
                        {
                          "description": "A date and time.",
                          "additionalProperties": false,
                          "type": "object",
                          "required": [
                            "type",
                            "date_time"
                          ],
                          "properties": {
                            "type": {
                              "description": "Indicates a date-time value.",
                              "type": "string",
                              "enum": [
                                "datetime"
                              ]
                            },
                            "date_time": {
                              "description": "The date and time. May include a UTC offset, or be expressed as a local date and time without an offset (e.g. `2026-10-08T10:00:00`). When no offset is provided, the value is interpreted in `timezone`, or in the event-level timezone when set; otherwise it defaults to UTC.",
                              "type": "string"
                            },
                            "timezone": {
                              "description": "The IANA timezone in which the date and time is expressed (e.g. `Europe/Paris`). When omitted, uses the event-level timezone if set; otherwise defaults to UTC.",
                              "type": "string"
                            }
                          }
                        },
                        {
                          "description": "A date.",
                          "additionalProperties": false,
                          "type": "object",
                          "required": [
                            "type",
                            "date"
                          ],
                          "properties": {
                            "type": {
                              "description": "Indicates a date-only value (for all-day events).",
                              "type": "string",
                              "enum": [
                                "date"
                              ]
                            },
                            "date": {
                              "description": "The date. Must use a supported date format. See [supported date formats](https://developer.unipile.com/v2.0/reference/api-usage#dates).",
                              "format": "date",
                              "type": "string"
                            },
                            "timezone": {
                              "description": "The IANA timezone in which the date is expressed (e.g. `Europe/Paris`).",
                              "type": "string"
                            }
                          }
                        }
                      ]
                    },
                    "recurrence": {
                      "description": "List of RRULE, EXRULE, RDATE and EXDATE lines for a recurring event, as specified in RFC5545.",
                      "type": "array",
                      "items": {
                        "type": "string"
                      }
                    },
                    "organizer": {
                      "type": "object",
                      "required": [
                        "email"
                      ],
                      "properties": {
                        "email": {
                          "description": "Email address of the organizer.",
                          "type": "string"
                        },
                        "display_name": {
                          "description": "Display name of the organizer.",
                          "type": "string"
                        }
                      }
                    },
                    "conference": {
                      "type": "object",
                      "required": [
                        "provider",
                        "hosting",
                        "url"
                      ],
                      "properties": {
                        "provider": {
                          "description": "The conference provider.\n        - `google_meet` is a Google Meet conference.\n        - `zoom` is a Zoom conference.\n        - `skype` is a Skype conference.\n        - `teams` is a Microsoft Teams conference.\n        - `unknown` is an unknown conference provider.",
                          "type": "string",
                          "enum": [
                            "google_meet",
                            "zoom",
                            "skype",
                            "teams",
                            "unknown"
                          ]
                        },
                        "hosting": {
                          "description": "How the conference is attached to the event.\n        - `native`: hosted by the calendar provider (Microsoft Teams or Skype on Outlook, Google Meet on Google). The\n          provider owns the meeting and `url` is its join link.\n        - `description`: an existing conference attached by URL, whose join link is published in the event body.",
                          "type": "string",
                          "enum": [
                            "native",
                            "description"
                          ]
                        },
                        "conference_id": {
                          "description": "The conference identifier assigned by its provider.",
                          "type": "string"
                        },
                        "url": {
                          "description": "The URL used to join the conference.",
                          "type": "string"
                        }
                      }
                    },
                    "visibility": {
                      "description": "The visibility of the event.\n        - `public` is visible to all.\n        - `private` is visible only to the calendar owner.",
                      "type": "string",
                      "enum": [
                        "public",
                        "private"
                      ]
                    },
                    "transparency": {
                      "description": "The transparency of the event.\n        - `opaque` does block time on the calendar and is equivalent to setting Show me as to Busy in the Calendar UI.\n        - `transparent` does not block time on the calendar and is equivalent to setting Show me as to Available in the Calendar UI.",
                      "type": "string",
                      "enum": [
                        "opaque",
                        "transparent"
                      ]
                    },
                    "event_type": {
                      "description": "The type of the event (`birthday`, `fromGmail`, `outOfOffice`...)",
                      "default": "default",
                      "type": "string"
                    },
                    "timezone": {
                      "description": "The IANA timezone when start and end share the same timezone (e.g. `Europe/Paris`). Omitted when they differ; use `start.timezone` and `end.timezone` instead.",
                      "type": "string"
                    },
                    "background_color": {
                      "description": "Background color of the calendar in hexadecimal format.",
                      "type": "string"
                    },
                    "text_color": {
                      "description": "Foreground color of the event in hexadecimal format.",
                      "type": "string"
                    },
                    "specifics": {
                      "description": "Object containing provider-specific calendar event data."
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