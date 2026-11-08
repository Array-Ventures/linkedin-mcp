---
updatedAt: 2026-08-27T09:43:05.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# List all Chat Messages

Returns a list of messages in a chat. The messages are returned sorted by their timestamp, with the most recent appearing first.

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
      "name": "Messaging",
      "description": "Messaging management"
    }
  ],
  "paths": {
    "/v2/{account_id}/chats/{chat_id}/messages": {
      "get": {
        "operationId": "getMessagesList",
        "summary": "List all Chat Messages",
        "tags": [
          "Messaging"
        ],
        "description": "Returns a list of messages in a chat. The messages are returned sorted by their timestamp, with the most recent appearing first.",
        "parameters": [
          {
            "schema": {
              "format": "date-time",
              "type": "string"
            },
            "in": "query",
            "name": "before",
            "required": false,
            "description": "Filter to only return messages sent before the given timestamp (exclusive). Must use a supported date-time format. See [supported date formats](https://developer.unipile.com/v2.0/reference/api-usage#dates)."
          },
          {
            "schema": {
              "format": "date-time",
              "type": "string"
            },
            "in": "query",
            "name": "after",
            "required": false,
            "description": "Filter to only return messages sent after the given timestamp (exclusive). Must use a supported date-time format. See [supported date formats](https://developer.unipile.com/v2.0/reference/api-usage#dates)."
          },
          {
            "schema": {
              "type": "string"
            },
            "in": "query",
            "name": "user_id",
            "required": false,
            "description": "Filter to only return messages sent by the given User."
          },
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
              "minLength": 1,
              "type": "string"
            },
            "in": "path",
            "name": "chat_id",
            "required": true,
            "description": "The ID of the Chat to retrieve messages from."
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
            "name": "Get messages list",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipileMessaging } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipileMessaging = new UnipileMessaging({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipileMessaging.getMessagesList(\n  {\n    path: {\n      chat_id: 'chat_id',\n      account_id: ACCOUNT_ID,\n    },\n  }\n);"
          },
          {
            "name": "Get messages list",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    messaging_api = unipile.MessagingApi(api_client)\n\nresponse = messaging_api.get_messages_list(\n    'chat_id',\n    ACCOUNT_ID\n)"
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
                          "sender_id",
                          "chat_id",
                          "timestamp",
                          "is_sender",
                          "is_hidden",
                          "is_seen",
                          "is_delivered",
                          "is_deleted",
                          "is_edited",
                          "is_pinned",
                          "is_event",
                          "is_mentionned",
                          "reactions_counter",
                          "provider",
                          "attachments",
                          "hyperlinks",
                          "mentions"
                        ],
                        "properties": {
                          "object": {
                            "type": "string",
                            "enum": [
                              "Message"
                            ]
                          },
                          "id": {
                            "description": "The unique identifier of the message for the provider.",
                            "type": "string"
                          },
                          "text": {
                            "description": "The text content of the message.",
                            "type": "string"
                          },
                          "sender_id": {
                            "description": "The ID of the user who sent the message.",
                            "type": "string"
                          },
                          "chat_id": {
                            "description": "The ID of the chat where the message was sent.",
                            "type": "string"
                          },
                          "timestamp": {
                            "description": "The timestamp of the message. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                            "type": "string"
                          },
                          "is_sender": {
                            "description": "Is the current user the sender of the message.",
                            "type": "boolean"
                          },
                          "is_hidden": {
                            "description": "Is the message hidden. Hidden messages are usually not displayed in the chat but can be as last message is chats list.",
                            "type": "boolean"
                          },
                          "is_seen": {
                            "description": "Is the message seen by other participants.",
                            "type": "boolean"
                          },
                          "is_delivered": {
                            "description": "Is the message delivered to the other participants.",
                            "type": "boolean"
                          },
                          "is_deleted": {
                            "description": "Is the message deleted. Some providers show the message as deleted in the chat.",
                            "type": "boolean"
                          },
                          "is_edited": {
                            "description": "Is the message edited. Some providers adds an \"edited\" mark on the message in the chat.",
                            "type": "boolean"
                          },
                          "is_pinned": {
                            "description": "Is the message pinned. Pinned messages are usually displayed at the top of the chat.",
                            "type": "boolean"
                          },
                          "is_event": {
                            "description": "Is the message an event. Events are special messages that are not displayed in the chat but can be used to trigger actions.",
                            "type": "boolean"
                          },
                          "is_mentionned": {
                            "description": "Is the message mentionning the current user. Usually to notify.",
                            "type": "boolean"
                          },
                          "view_mode": {
                            "description": "How the ephemeral content of this message may be viewed: `once` for a single opening, `replayable` when the sender allowed it to be opened again.\n    Absent when the message is not ephemeral at all - a provider that does not expose the notion, or content the sender chose to keep in the conversation.\n    Depending on the provider the media may never be delivered: WhatsApp only ever serves it to the phone that owns the account, in which case the attachment is reported with `is_unavailable` and cannot be downloaded.",
                            "type": "string",
                            "enum": [
                              "once",
                              "replayable"
                            ]
                          },
                          "event_type": {
                            "description": "The type of message event.\n    0 : Unknown (Not implemented)\n    1 : Chat name update\n    2 : Chat description update\n    3 : New participant added to the chat group\n    4 : Participant kicked or left the chat group\n    5 : A message is pinned\n    6 : Permissions have been updated\n    7 : Participant was promoted or demoted\n    8 : Reaction\n    9 : Call Missed\n    10 : Call Started\n    11 : Call Ended\n    12 : Call Rejected\n    13 : Scheduled Call Created\n    14 : Scheduled Call Cancelled\n    15 : Scheduled Call Started\n    16 : Announcement\n    17 : Content mention\n    ",
                            "anyOf": [
                              {
                                "type": "number",
                                "enum": [
                                  0
                                ]
                              },
                              {
                                "type": "number",
                                "enum": [
                                  1
                                ]
                              },
                              {
                                "type": "number",
                                "enum": [
                                  2
                                ]
                              },
                              {
                                "type": "number",
                                "enum": [
                                  3
                                ]
                              },
                              {
                                "type": "number",
                                "enum": [
                                  4
                                ]
                              },
                              {
                                "type": "number",
                                "enum": [
                                  5
                                ]
                              },
                              {
                                "type": "number",
                                "enum": [
                                  6
                                ]
                              },
                              {
                                "type": "number",
                                "enum": [
                                  7
                                ]
                              },
                              {
                                "type": "number",
                                "enum": [
                                  8
                                ]
                              },
                              {
                                "type": "number",
                                "enum": [
                                  9
                                ]
                              },
                              {
                                "type": "number",
                                "enum": [
                                  10
                                ]
                              },
                              {
                                "type": "number",
                                "enum": [
                                  11
                                ]
                              },
                              {
                                "type": "number",
                                "enum": [
                                  12
                                ]
                              },
                              {
                                "type": "number",
                                "enum": [
                                  13
                                ]
                              },
                              {
                                "type": "number",
                                "enum": [
                                  14
                                ]
                              },
                              {
                                "type": "number",
                                "enum": [
                                  15
                                ]
                              },
                              {
                                "type": "number",
                                "enum": [
                                  16
                                ]
                              },
                              {
                                "type": "number",
                                "enum": [
                                  17
                                ]
                              }
                            ]
                          },
                          "event_metadata": {
                            "anyOf": [
                              {
                                "title": "Participant Removed From Chat Group",
                                "type": "object",
                                "required": [
                                  "reason"
                                ],
                                "properties": {
                                  "user_id": {
                                    "description": "ID of the participant who left or was removed from the group.",
                                    "type": "string"
                                  },
                                  "user_name": {
                                    "description": "Name of the participant who left or was removed from the group.",
                                    "type": "string"
                                  },
                                  "reason": {
                                    "description": "Specifies whether the participant left voluntarily or was removed by an admin.",
                                    "type": "string",
                                    "enum": [
                                      "left",
                                      "kicked",
                                      "unknown"
                                    ]
                                  }
                                }
                              },
                              {
                                "title": "Chat Name Updated",
                                "type": "object",
                                "required": [
                                  "title"
                                ],
                                "properties": {
                                  "title": {
                                    "description": "The updated title.",
                                    "type": "string"
                                  }
                                }
                              },
                              {
                                "title": "Chat Description Updated",
                                "type": "object",
                                "properties": {
                                  "description": {
                                    "description": "The updated description.",
                                    "type": "string"
                                  }
                                }
                              },
                              {
                                "title": "Call Rejected",
                                "type": "object",
                                "required": [
                                  "is_video"
                                ],
                                "properties": {
                                  "call_id": {
                                    "description": "Unique identifier of the call.",
                                    "type": "string"
                                  },
                                  "is_video": {
                                    "description": "Indicates whether the call is a video call.",
                                    "type": "boolean"
                                  },
                                  "link": {
                                    "description": "The link used to join the call.",
                                    "type": "string"
                                  },
                                  "start": {
                                    "description": "Start date and time of the call in ISO format.",
                                    "type": "string"
                                  },
                                  "end": {
                                    "description": "End date and time of the call in ISO format.",
                                    "type": "string"
                                  },
                                  "duration": {
                                    "description": "Duration of the call in seconds (if applicable).",
                                    "type": "number"
                                  }
                                }
                              },
                              {
                                "title": "Call Ended",
                                "type": "object",
                                "required": [
                                  "is_video"
                                ],
                                "properties": {
                                  "call_id": {
                                    "description": "Unique identifier of the call.",
                                    "type": "string"
                                  },
                                  "is_video": {
                                    "description": "Indicates whether the call is a video call.",
                                    "type": "boolean"
                                  },
                                  "link": {
                                    "description": "The link used to join the call.",
                                    "type": "string"
                                  },
                                  "start": {
                                    "description": "Start date and time of the call in ISO format.",
                                    "type": "string"
                                  },
                                  "end": {
                                    "description": "End date and time of the call in ISO format.",
                                    "type": "string"
                                  },
                                  "duration": {
                                    "description": "Duration of the call in seconds (if available).",
                                    "type": "number"
                                  }
                                }
                              },
                              {
                                "title": "Call Started",
                                "type": "object",
                                "required": [
                                  "is_video"
                                ],
                                "properties": {
                                  "call_id": {
                                    "description": "Unique identifier of the call.",
                                    "type": "string"
                                  },
                                  "is_video": {
                                    "description": "Indicates whether the call is a video call.",
                                    "type": "boolean"
                                  },
                                  "link": {
                                    "description": "The link used to join the call.",
                                    "type": "string"
                                  },
                                  "start": {
                                    "description": "Start date and time of the call in ISO 8601 format.",
                                    "type": "string"
                                  }
                                }
                              },
                              {
                                "title": "Scheduled Call Created",
                                "type": "object",
                                "required": [
                                  "is_video",
                                  "start"
                                ],
                                "properties": {
                                  "call_id": {
                                    "description": "Unique identifier of the call.",
                                    "type": "string"
                                  },
                                  "is_video": {
                                    "description": "Indicates whether the call is a video call.",
                                    "type": "boolean"
                                  },
                                  "link": {
                                    "description": "The link used to join the call.",
                                    "type": "string"
                                  },
                                  "start": {
                                    "description": "Expected start date and time of the call in ISO format.",
                                    "type": "string"
                                  },
                                  "end": {
                                    "description": "Expected end date and time of the call in ISO format.",
                                    "type": "string"
                                  },
                                  "duration": {
                                    "description": "Expected call duration in seconds.",
                                    "type": "number"
                                  }
                                }
                              },
                              {
                                "title": "Scheduled Call Cancelled",
                                "type": "object",
                                "required": [
                                  "is_video",
                                  "start"
                                ],
                                "properties": {
                                  "call_id": {
                                    "description": "Unique identifier of the call.",
                                    "type": "string"
                                  },
                                  "is_video": {
                                    "description": "Indicates whether the call is a video call.",
                                    "type": "boolean"
                                  },
                                  "link": {
                                    "description": "The link used to join the call.",
                                    "type": "string"
                                  },
                                  "start": {
                                    "description": "Expected start date and time of the call in ISO format.",
                                    "type": "string"
                                  },
                                  "end": {
                                    "description": "Expected end date and time of the call in ISO format.",
                                    "type": "string"
                                  },
                                  "duration": {
                                    "description": "Expected duration of the call in seconds",
                                    "type": "number"
                                  }
                                }
                              },
                              {
                                "title": "Scheduled Call Started",
                                "type": "object",
                                "required": [
                                  "is_video",
                                  "start"
                                ],
                                "properties": {
                                  "call_id": {
                                    "description": "Unique identifier of the call.",
                                    "type": "string"
                                  },
                                  "is_video": {
                                    "description": "Indicates whether the call is a video call.",
                                    "type": "boolean"
                                  },
                                  "link": {
                                    "description": "The link used to join the call.",
                                    "type": "string"
                                  },
                                  "start": {
                                    "description": "Start date and time of the call in ISO format.",
                                    "type": "string"
                                  },
                                  "end": {
                                    "description": "Expected end date and time of the call in ISO format.",
                                    "type": "string"
                                  },
                                  "duration": {
                                    "description": "Duration of the call in seconds",
                                    "type": "number"
                                  }
                                }
                              },
                              {
                                "title": "Message Pin Status",
                                "type": "object",
                                "required": [
                                  "is_pin"
                                ],
                                "properties": {
                                  "message_id": {
                                    "description": "ID of the message that was pinned or unpinned.",
                                    "type": "string"
                                  },
                                  "is_pin": {
                                    "description": "Indicates whether the message is pinned (true) or unpinned (false).",
                                    "type": "boolean"
                                  },
                                  "duration": {
                                    "description": "Duration for which the message remains pinned, if applicable.",
                                    "type": "number"
                                  }
                                }
                              },
                              {
                                "title": "New Participant Joined the Chat Group",
                                "type": "object",
                                "required": [
                                  "user_id"
                                ],
                                "properties": {
                                  "link": {
                                    "description": "The invitation link used to join the group.",
                                    "type": "string"
                                  },
                                  "user_id": {
                                    "description": "ID of the participant who joined the group.",
                                    "type": "string"
                                  }
                                }
                              },
                              {
                                "title": "Participant Role Updated",
                                "type": "object",
                                "required": [
                                  "user_id",
                                  "reason"
                                ],
                                "properties": {
                                  "user_id": {
                                    "description": "ID of the participant whose role was updated.",
                                    "type": "string"
                                  },
                                  "reason": {
                                    "description": "The type of role change applied to the participant.",
                                    "type": "string",
                                    "enum": [
                                      "promoted",
                                      "demoted",
                                      "unknown"
                                    ]
                                  }
                                }
                              },
                              {
                                "title": "Chat Subject Updated",
                                "type": "object",
                                "properties": {
                                  "subject": {
                                    "description": "The updated subject.",
                                    "type": "string"
                                  }
                                }
                              },
                              {
                                "title": "Reaction",
                                "type": "object",
                                "required": [
                                  "reaction",
                                  "reason",
                                  "message_id"
                                ],
                                "properties": {
                                  "reaction": {
                                    "description": "The reaction added or removed.",
                                    "type": "string"
                                  },
                                  "reason": {
                                    "description": "Specifies whether the reaction was added or removed.",
                                    "type": "string",
                                    "enum": [
                                      "added",
                                      "removed"
                                    ]
                                  },
                                  "message_id": {
                                    "description": "ID of the message to which the reaction was added or removed.",
                                    "type": "string"
                                  }
                                }
                              }
                            ]
                          },
                          "content_relation": {
                            "title": "Content Relation",
                            "type": "object",
                            "required": [
                              "type"
                            ],
                            "properties": {
                              "type": {
                                "description": "How this message relates to a piece of shared content: a normal reply to it, or a provider-generated notice that the current user was mentioned in it.",
                                "type": "string",
                                "enum": [
                                  "reply_to",
                                  "mentioned_in"
                                ]
                              },
                              "attachment_id": {
                                "description": "The id of this message's shared-content attachment describing the related content, when the provider still makes it available. Absent once the content is no longer retrievable (e.g. an expired story) but the relation is still known.",
                                "type": "string"
                              }
                            }
                          },
                          "reactions_counter": {
                            "description": "A list of reactions to the element.",
                            "type": "array",
                            "items": {
                              "type": "object",
                              "required": [
                                "reaction",
                                "count"
                              ],
                              "properties": {
                                "reaction": {
                                  "description": "Value of the reaction. Usually an emoji unicode.",
                                  "type": "string"
                                },
                                "count": {
                                  "description": "The total count of this reaction.",
                                  "type": "number"
                                }
                              }
                            }
                          },
                          "provider": {
                            "description": "The provider's of the Account.\n    - `mock` is mock.\n    - `whatsapp` is WhatsApp.\n    - `linkedin` is LinkedIn.\n    - `instagram` is Instagram.\n    - `facebook` is Facebook.\n    - `google` is Google.\n    - `outlook` is Outlook.\n    - `telegram` is Telegram.\n    - `imap` is IMAP.",
                            "type": "string",
                            "enum": [
                              "mock",
                              "whatsapp",
                              "linkedin",
                              "google",
                              "outlook",
                              "imap",
                              "telegram",
                              "instagram",
                              "facebook"
                            ]
                          },
                          "attachments": {
                            "description": "List of message attachments.",
                            "type": "array",
                            "items": {
                              "anyOf": [
                                {
                                  "title": "Audio",
                                  "type": "object",
                                  "required": [
                                    "object",
                                    "id",
                                    "is_inline",
                                    "mimetype",
                                    "url",
                                    "type",
                                    "voice_note"
                                  ],
                                  "properties": {
                                    "object": {
                                      "type": "string",
                                      "enum": [
                                        "Attachment"
                                      ]
                                    },
                                    "id": {
                                      "description": "The unique identifier of the attachment.",
                                      "type": "string"
                                    },
                                    "file_size": {
                                      "description": "The size of the attachment in bytes.",
                                      "type": "number"
                                    },
                                    "is_inline": {
                                      "description": "Is the attachment inline in the content.",
                                      "type": "boolean"
                                    },
                                    "content_id": {
                                      "description": "Reserved for email attachments. The Content-ID (CID) used to reference the attachment inline in the email HTML body via `cid:`. Provided without the surrounding angle brackets.",
                                      "type": "string"
                                    },
                                    "is_unavailable": {
                                      "description": "The attachment is not available for download because it was removed from provider servers.",
                                      "type": "boolean"
                                    },
                                    "mimetype": {
                                      "description": "The MIME type of the attachment.",
                                      "type": "string"
                                    },
                                    "url": {
                                      "description": "The URL to download the attachment.",
                                      "type": "string"
                                    },
                                    "url_expires_at": {
                                      "description": "The URL expiration timestamp. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                                      "type": "string"
                                    },
                                    "content": {
                                      "description": "The file content encoded as base64, when available directly without an additional download.",
                                      "type": "string"
                                    },
                                    "type": {
                                      "type": "string",
                                      "enum": [
                                        "audio"
                                      ]
                                    },
                                    "duration": {
                                      "description": "The duration of the audio in seconds.",
                                      "type": "number"
                                    },
                                    "voice_note": {
                                      "description": "The audio is a voice note (should be displayed differently)",
                                      "type": "boolean"
                                    }
                                  }
                                },
                                {
                                  "title": "Image",
                                  "type": "object",
                                  "required": [
                                    "object",
                                    "id",
                                    "is_inline",
                                    "mimetype",
                                    "url",
                                    "type",
                                    "sticker"
                                  ],
                                  "properties": {
                                    "object": {
                                      "type": "string",
                                      "enum": [
                                        "Attachment"
                                      ]
                                    },
                                    "id": {
                                      "description": "The unique identifier of the attachment.",
                                      "type": "string"
                                    },
                                    "file_size": {
                                      "description": "The size of the attachment in bytes.",
                                      "type": "number"
                                    },
                                    "is_inline": {
                                      "description": "Is the attachment inline in the content.",
                                      "type": "boolean"
                                    },
                                    "content_id": {
                                      "description": "Reserved for email attachments. The Content-ID (CID) used to reference the attachment inline in the email HTML body via `cid:`. Provided without the surrounding angle brackets.",
                                      "type": "string"
                                    },
                                    "is_unavailable": {
                                      "description": "The attachment is not available for download because it was removed from provider servers.",
                                      "type": "boolean"
                                    },
                                    "mimetype": {
                                      "description": "The MIME type of the attachment.",
                                      "type": "string"
                                    },
                                    "url": {
                                      "description": "The URL to download the attachment.",
                                      "type": "string"
                                    },
                                    "url_expires_at": {
                                      "description": "The URL expiration timestamp. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                                      "type": "string"
                                    },
                                    "content": {
                                      "description": "The file content encoded as base64, when available directly without an additional download.",
                                      "type": "string"
                                    },
                                    "type": {
                                      "type": "string",
                                      "enum": [
                                        "img"
                                      ]
                                    },
                                    "size": {
                                      "description": "The size of the image in pixels.",
                                      "type": "object",
                                      "required": [
                                        "height",
                                        "width"
                                      ],
                                      "properties": {
                                        "height": {
                                          "type": "number"
                                        },
                                        "width": {
                                          "type": "number"
                                        }
                                      }
                                    },
                                    "sticker": {
                                      "description": "The image is a sticker (should be displayed differently)",
                                      "type": "boolean"
                                    }
                                  }
                                },
                                {
                                  "title": "Video",
                                  "type": "object",
                                  "required": [
                                    "object",
                                    "id",
                                    "is_inline",
                                    "mimetype",
                                    "url",
                                    "type",
                                    "size",
                                    "gif"
                                  ],
                                  "properties": {
                                    "object": {
                                      "type": "string",
                                      "enum": [
                                        "Attachment"
                                      ]
                                    },
                                    "id": {
                                      "description": "The unique identifier of the attachment.",
                                      "type": "string"
                                    },
                                    "file_size": {
                                      "description": "The size of the attachment in bytes.",
                                      "type": "number"
                                    },
                                    "is_inline": {
                                      "description": "Is the attachment inline in the content.",
                                      "type": "boolean"
                                    },
                                    "content_id": {
                                      "description": "Reserved for email attachments. The Content-ID (CID) used to reference the attachment inline in the email HTML body via `cid:`. Provided without the surrounding angle brackets.",
                                      "type": "string"
                                    },
                                    "is_unavailable": {
                                      "description": "The attachment is not available for download because it was removed from provider servers.",
                                      "type": "boolean"
                                    },
                                    "mimetype": {
                                      "description": "The MIME type of the attachment.",
                                      "type": "string"
                                    },
                                    "url": {
                                      "description": "The URL to download the attachment.",
                                      "type": "string"
                                    },
                                    "url_expires_at": {
                                      "description": "The URL expiration timestamp. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                                      "type": "string"
                                    },
                                    "content": {
                                      "description": "The file content encoded as base64, when available directly without an additional download.",
                                      "type": "string"
                                    },
                                    "type": {
                                      "type": "string",
                                      "enum": [
                                        "video"
                                      ]
                                    },
                                    "duration": {
                                      "description": "The duration of the video in seconds.",
                                      "type": "number"
                                    },
                                    "size": {
                                      "description": "The size of the video in pixels.",
                                      "type": "object",
                                      "required": [
                                        "height",
                                        "width"
                                      ],
                                      "properties": {
                                        "height": {
                                          "type": "number"
                                        },
                                        "width": {
                                          "type": "number"
                                        }
                                      }
                                    },
                                    "gif": {
                                      "description": "The video is a GIF (should be displayed differently)",
                                      "type": "boolean"
                                    }
                                  }
                                },
                                {
                                  "title": "File / Document",
                                  "type": "object",
                                  "required": [
                                    "object",
                                    "id",
                                    "is_inline",
                                    "mimetype",
                                    "url",
                                    "type",
                                    "filename"
                                  ],
                                  "properties": {
                                    "object": {
                                      "type": "string",
                                      "enum": [
                                        "Attachment"
                                      ]
                                    },
                                    "id": {
                                      "description": "The unique identifier of the attachment.",
                                      "type": "string"
                                    },
                                    "file_size": {
                                      "description": "The size of the attachment in bytes.",
                                      "type": "number"
                                    },
                                    "is_inline": {
                                      "description": "Is the attachment inline in the content.",
                                      "type": "boolean"
                                    },
                                    "content_id": {
                                      "description": "Reserved for email attachments. The Content-ID (CID) used to reference the attachment inline in the email HTML body via `cid:`. Provided without the surrounding angle brackets.",
                                      "type": "string"
                                    },
                                    "is_unavailable": {
                                      "description": "The attachment is not available for download because it was removed from provider servers.",
                                      "type": "boolean"
                                    },
                                    "mimetype": {
                                      "description": "The MIME type of the attachment.",
                                      "type": "string"
                                    },
                                    "url": {
                                      "description": "The URL to download the attachment.",
                                      "type": "string"
                                    },
                                    "url_expires_at": {
                                      "description": "The URL expiration timestamp. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                                      "type": "string"
                                    },
                                    "content": {
                                      "description": "The file content encoded as base64, when available directly without an additional download.",
                                      "type": "string"
                                    },
                                    "type": {
                                      "type": "string",
                                      "enum": [
                                        "file"
                                      ]
                                    },
                                    "filename": {
                                      "description": "The name of the file, including the extension.",
                                      "type": "string"
                                    }
                                  }
                                },
                                {
                                  "title": "Media Share",
                                  "type": "object",
                                  "required": [
                                    "object",
                                    "id",
                                    "is_inline",
                                    "mimetype",
                                    "url",
                                    "type",
                                    "media_type"
                                  ],
                                  "properties": {
                                    "object": {
                                      "type": "string",
                                      "enum": [
                                        "Attachment"
                                      ]
                                    },
                                    "id": {
                                      "description": "The unique identifier of the attachment.",
                                      "type": "string"
                                    },
                                    "file_size": {
                                      "description": "The size of the attachment in bytes.",
                                      "type": "number"
                                    },
                                    "is_inline": {
                                      "description": "Is the attachment inline in the content.",
                                      "type": "boolean"
                                    },
                                    "content_id": {
                                      "description": "Reserved for email attachments. The Content-ID (CID) used to reference the attachment inline in the email HTML body via `cid:`. Provided without the surrounding angle brackets.",
                                      "type": "string"
                                    },
                                    "is_unavailable": {
                                      "description": "The attachment is not available for download because it was removed from provider servers.",
                                      "type": "boolean"
                                    },
                                    "mimetype": {
                                      "description": "The MIME type of the attachment.",
                                      "type": "string"
                                    },
                                    "url": {
                                      "description": "The URL of the shared content.",
                                      "type": "string"
                                    },
                                    "url_expires_at": {
                                      "description": "The URL expiration timestamp. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                                      "type": "string"
                                    },
                                    "content": {
                                      "description": "The file content encoded as base64, when available directly without an additional download.",
                                      "type": "string"
                                    },
                                    "type": {
                                      "type": "string",
                                      "enum": [
                                        "shared_content"
                                      ]
                                    },
                                    "media_type": {
                                      "description": "The type of content being shared.",
                                      "type": "string",
                                      "enum": [
                                        "post",
                                        "story",
                                        "url",
                                        "reel",
                                        "job_posting"
                                      ]
                                    },
                                    "author": {
                                      "description": "The author of the shared content, if applicable.",
                                      "type": "string"
                                    },
                                    "description": {
                                      "description": "A brief description of the shared content.",
                                      "type": "string"
                                    }
                                  }
                                },
                                {
                                  "title": "Contact Card",
                                  "type": "object",
                                  "required": [
                                    "object",
                                    "id",
                                    "is_inline",
                                    "mimetype",
                                    "url",
                                    "type",
                                    "phones",
                                    "emails"
                                  ],
                                  "properties": {
                                    "object": {
                                      "type": "string",
                                      "enum": [
                                        "Attachment"
                                      ]
                                    },
                                    "id": {
                                      "description": "The unique identifier of the attachment.",
                                      "type": "string"
                                    },
                                    "file_size": {
                                      "description": "The size of the attachment in bytes.",
                                      "type": "number"
                                    },
                                    "is_inline": {
                                      "description": "Is the attachment inline in the content.",
                                      "type": "boolean"
                                    },
                                    "content_id": {
                                      "description": "Reserved for email attachments. The Content-ID (CID) used to reference the attachment inline in the email HTML body via `cid:`. Provided without the surrounding angle brackets.",
                                      "type": "string"
                                    },
                                    "is_unavailable": {
                                      "description": "The attachment is not available for download because it was removed from provider servers.",
                                      "type": "boolean"
                                    },
                                    "mimetype": {
                                      "description": "The MIME type of the attachment.",
                                      "type": "string"
                                    },
                                    "url": {
                                      "description": "The URL to download the attachment.",
                                      "type": "string"
                                    },
                                    "url_expires_at": {
                                      "description": "The URL expiration timestamp. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                                      "type": "string"
                                    },
                                    "content": {
                                      "description": "The file content encoded as base64, when available directly without an additional download.",
                                      "type": "string"
                                    },
                                    "type": {
                                      "type": "string",
                                      "enum": [
                                        "contact_card"
                                      ]
                                    },
                                    "display_name": {
                                      "description": "The name of the shared contact.",
                                      "type": "string"
                                    },
                                    "organization": {
                                      "description": "The organization of the shared contact.",
                                      "type": "string"
                                    },
                                    "phones": {
                                      "description": "The phone numbers of the shared contact.",
                                      "type": "array",
                                      "items": {
                                        "type": "object",
                                        "required": [
                                          "number"
                                        ],
                                        "properties": {
                                          "number": {
                                            "description": "The phone number of the shared contact.",
                                            "type": "string"
                                          },
                                          "type": {
                                            "description": "The label of the phone number, as set by the contact owner (CELL, WORK, ...).",
                                            "type": "string"
                                          }
                                        }
                                      }
                                    },
                                    "emails": {
                                      "description": "The email addresses of the shared contact.",
                                      "type": "array",
                                      "items": {
                                        "type": "object",
                                        "required": [
                                          "address"
                                        ],
                                        "properties": {
                                          "address": {
                                            "description": "The email address of the shared contact.",
                                            "type": "string"
                                          },
                                          "type": {
                                            "description": "The label of the email address, as set by the contact owner (HOME, WORK, ...).",
                                            "type": "string"
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              ]
                            }
                          },
                          "hyperlinks": {
                            "description": "List of message hyperlinks.",
                            "type": "array",
                            "items": {
                              "description": "The parameters of an external hyperlink contained in the body.",
                              "type": "object",
                              "required": [
                                "url",
                                "starts_at",
                                "length"
                              ],
                              "properties": {
                                "url": {
                                  "description": "The URL the link points to.",
                                  "type": "string"
                                },
                                "starts_at": {
                                  "description": "The index in the body where the link starts.",
                                  "type": "number"
                                },
                                "length": {
                                  "description": "The number of characters in the body that make up the link, starting at the `starts_at` index.",
                                  "type": "number"
                                }
                              }
                            }
                          },
                          "mentions": {
                            "description": "List of the users mentioned in the message body. A mention the provider delivered as plain text is not listed.",
                            "type": "array",
                            "items": {
                              "description": "The parameters of a user mention contained in the body.",
                              "type": "object",
                              "required": [
                                "start",
                                "length"
                              ],
                              "properties": {
                                "user_id": {
                                  "description": "ID of the mentioned user, which can be used to mention them when sending a message. Absent when the provider reports the mention without an identifier, or when the mention addresses the whole chat rather than a user.",
                                  "type": "string"
                                },
                                "url": {
                                  "description": "Public profile URL of the mentioned user. Absent when the provider exposes no public profile for them.",
                                  "type": "string"
                                },
                                "start": {
                                  "description": "The index in the body where the mention starts.",
                                  "type": "number"
                                },
                                "length": {
                                  "description": "The number of characters in the body that make up the mention, starting at the `start` index.",
                                  "type": "number"
                                }
                              }
                            }
                          },
                          "specifics": {
                            "allOf": [
                              {},
                              {
                                "description": "Object containing provider-specific message data.",
                                "anyOf": [
                                  {
                                    "type": "object",
                                    "required": [
                                      "type"
                                    ],
                                    "properties": {
                                      "type": {
                                        "description": "The category of the message: a regular message, an email, a connection invitation, or an InMail lifecycle event.",
                                        "type": "string",
                                        "enum": [
                                          "MESSAGE",
                                          "EMAIL",
                                          "INVITATION",
                                          "INMAIL",
                                          "INMAIL_DECLINE",
                                          "INMAIL_REPLY",
                                          "INMAIL_ACCEPT"
                                        ]
                                      },
                                      "subject": {
                                        "description": "The subject of the message.",
                                        "type": "string"
                                      }
                                    }
                                  },
                                  {
                                    "type": "object",
                                    "required": [
                                      "subject"
                                    ],
                                    "properties": {
                                      "subject": {
                                        "description": "The subject of the mock message.",
                                        "type": "string"
                                      }
                                    }
                                  },
                                  {
                                    "title": "WhatsApp",
                                    "type": "object",
                                    "properties": {
                                      "interactive": {
                                        "description": "WhatsApp interactive content available in the received provider payload. The body is exposed in text. Supports buttons, templates and native flows; missing or unsupported payloads cannot be reconstructed. Button metadata does not imply that Unipile can execute the action.",
                                        "type": "object",
                                        "required": [
                                          "type",
                                          "buttons"
                                        ],
                                        "properties": {
                                          "type": {
                                            "type": "string",
                                            "enum": [
                                              "buttons",
                                              "template",
                                              "native_flow",
                                              "response"
                                            ]
                                          },
                                          "title": {
                                            "type": "string"
                                          },
                                          "footer": {
                                            "type": "string"
                                          },
                                          "buttons": {
                                            "type": "array",
                                            "items": {
                                              "type": "object",
                                              "required": [
                                                "type"
                                              ],
                                              "properties": {
                                                "type": {
                                                  "type": "string",
                                                  "enum": [
                                                    "reply",
                                                    "url",
                                                    "call",
                                                    "native_flow"
                                                  ]
                                                },
                                                "id": {
                                                  "description": "Provider button identifier, when available.",
                                                  "type": "string"
                                                },
                                                "text": {
                                                  "description": "Button label, when available.",
                                                  "type": "string"
                                                },
                                                "url": {
                                                  "type": "string"
                                                },
                                                "phone_number": {
                                                  "type": "string"
                                                },
                                                "name": {
                                                  "description": "Native flow action name. Unknown actions are not interpreted.",
                                                  "type": "string"
                                                }
                                              }
                                            }
                                          },
                                          "selected_button": {
                                            "type": "object",
                                            "required": [
                                              "type"
                                            ],
                                            "properties": {
                                              "type": {
                                                "type": "string",
                                                "enum": [
                                                  "reply",
                                                  "url",
                                                  "call",
                                                  "native_flow"
                                                ]
                                              },
                                              "id": {
                                                "description": "Provider button identifier, when available.",
                                                "type": "string"
                                              },
                                              "text": {
                                                "description": "Button label, when available.",
                                                "type": "string"
                                              },
                                              "url": {
                                                "type": "string"
                                              },
                                              "phone_number": {
                                                "type": "string"
                                              },
                                              "name": {
                                                "description": "Native flow action name. Unknown actions are not interpreted.",
                                                "type": "string"
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "album_id": {
                                        "description": "Identifier of the media album the message belongs to. Messages sent together as one album share the same value. Absent when the message is not part of an album.",
                                        "type": "string"
                                      }
                                    }
                                  }
                                ]
                              }
                            ]
                          },
                          "sender": {
                            "description": "The user who sent the message.",
                            "type": "object",
                            "required": [
                              "id",
                              "object",
                              "type",
                              "display_name"
                            ],
                            "properties": {
                              "id": {
                                "description": "Unique identifier of the user for the provider. Usually an internal identifier used by the API only.",
                                "type": "string"
                              },
                              "object": {
                                "type": "string",
                                "enum": [
                                  "User"
                                ]
                              },
                              "type": {
                                "description": "Type of the user\n      - `individual` is an individual user.\n      - `organization` is an organization / business entity.\n      - `other` is an other type of entity.",
                                "type": "string",
                                "enum": [
                                  "individual",
                                  "organization",
                                  "other"
                                ]
                              },
                              "public_identifier": {
                                "description": "Public identifier of the user for the provider. Usually a shareable tag visible in urls and profiles. ",
                                "type": "string"
                              },
                              "display_name": {
                                "description": "Display name of the user as exposed by the provider.",
                                "type": "string"
                              },
                              "first_name": {
                                "description": "First name of the user.",
                                "type": "string"
                              },
                              "last_name": {
                                "description": "Last name of the user.",
                                "type": "string"
                              },
                              "profile_url": {
                                "format": "uri",
                                "description": "Public url to the profile of the user.",
                                "type": "string"
                              },
                              "public_picture_url": {
                                "format": "uri",
                                "description": "Public url to the profile picture of the user.",
                                "type": "string"
                              },
                              "private_picture_download_url": {
                                "format": "uri",
                                "description": "Private url to download the profile picture of the user. This url require authentication.",
                                "type": "string"
                              },
                              "description": {
                                "description": "Description of the user.",
                                "type": "string"
                              },
                              "specifics": {
                                "description": "Object containing provider-specific user profile data.",
                                "anyOf": [
                                  {
                                    "title": "WhatsApp",
                                    "type": "object",
                                    "required": [
                                      "contact_name"
                                    ],
                                    "properties": {
                                      "contact_name": {
                                        "description": "Name saved by the connected account owner in their WhatsApp address book.",
                                        "type": "string"
                                      }
                                    }
                                  },
                                  {
                                    "title": "Instagram",
                                    "type": "object",
                                    "required": [
                                      "messaging_identifier"
                                    ],
                                    "properties": {
                                      "messaging_identifier": {
                                        "description": "Messaging identifier of the user. Messages sent by this user carry it as their sender_id.",
                                        "type": "string"
                                      }
                                    }
                                  },
                                  {
                                    "title": "LinkedIn",
                                    "type": "object",
                                    "properties": {
                                      "location": {
                                        "description": "The geographical location of the user.",
                                        "type": "string"
                                      },
                                      "network_distance": {
                                        "description": "Network distance to a User.\n      `SELF`: Yourself.\n      `FIRST_DEGREE`: 1st degree connection.\n      `SECOND_DEGREE`: 2nd degree connection (connection of a 1st degree).\n      `THIRD_DEGREE`: 3rd degree connection (connection of a 2nd degree).\n      `OUT_OF_NETWORK`: Unreachable user.'",
                                        "anyOf": [
                                          {
                                            "type": "string",
                                            "enum": [
                                              "SELF"
                                            ]
                                          },
                                          {
                                            "type": "string",
                                            "enum": [
                                              "FIRST_DEGREE"
                                            ]
                                          },
                                          {
                                            "type": "string",
                                            "enum": [
                                              "SECOND_DEGREE"
                                            ]
                                          },
                                          {
                                            "type": "string",
                                            "enum": [
                                              "THIRD_DEGREE"
                                            ]
                                          },
                                          {
                                            "type": "string",
                                            "enum": [
                                              "OUT_OF_NETWORK"
                                            ]
                                          }
                                        ]
                                      },
                                      "industry": {
                                        "description": "The user's industry.",
                                        "type": "string"
                                      },
                                      "is_following": {
                                        "description": "Whether the current user follows the user.",
                                        "type": "boolean"
                                      },
                                      "followers_count": {
                                        "description": "The number of followers of the user.",
                                        "type": "number"
                                      },
                                      "relations_count": {
                                        "description": "The number of relations of the user.",
                                        "type": "number"
                                      },
                                      "shared_relations_count": {
                                        "description": "The number of relations that you share with the user.",
                                        "type": "number"
                                      },
                                      "website_url": {
                                        "description": "The URL of the website provided by the user.",
                                        "type": "string"
                                      },
                                      "portfolio_url": {
                                        "description": "The URL of the portfolio provided by the user.",
                                        "type": "string"
                                      },
                                      "services_page_url": {
                                        "description": "The LinkedIn internal URL of the user's services page.",
                                        "type": "string"
                                      },
                                      "is_premium": {
                                        "description": "Whether the User has a premium account.",
                                        "type": "boolean"
                                      },
                                      "is_verified": {
                                        "description": "Whether the User has a verified account.",
                                        "type": "boolean"
                                      }
                                    }
                                  }
                                ]
                              }
                            }
                          },
                          "quoted": {
                            "description": "The quoted message.",
                            "type": "object",
                            "required": [
                              "object",
                              "id",
                              "attachments"
                            ],
                            "properties": {
                              "object": {
                                "type": "string",
                                "enum": [
                                  "QuotedMessage"
                                ]
                              },
                              "id": {
                                "description": "The unique identifier of the message for the provider.",
                                "type": "string"
                              },
                              "text": {
                                "description": "The text content of the message.",
                                "type": "string"
                              },
                              "attachments": {
                                "description": "List of message attachments.",
                                "type": "array",
                                "items": {
                                  "anyOf": [
                                    {
                                      "title": "Audio",
                                      "type": "object",
                                      "required": [
                                        "object",
                                        "id",
                                        "is_inline",
                                        "mimetype",
                                        "url",
                                        "type",
                                        "voice_note"
                                      ],
                                      "properties": {
                                        "object": {
                                          "type": "string",
                                          "enum": [
                                            "Attachment"
                                          ]
                                        },
                                        "id": {
                                          "description": "The unique identifier of the attachment.",
                                          "type": "string"
                                        },
                                        "file_size": {
                                          "description": "The size of the attachment in bytes.",
                                          "type": "number"
                                        },
                                        "is_inline": {
                                          "description": "Is the attachment inline in the content.",
                                          "type": "boolean"
                                        },
                                        "content_id": {
                                          "description": "Reserved for email attachments. The Content-ID (CID) used to reference the attachment inline in the email HTML body via `cid:`. Provided without the surrounding angle brackets.",
                                          "type": "string"
                                        },
                                        "is_unavailable": {
                                          "description": "The attachment is not available for download because it was removed from provider servers.",
                                          "type": "boolean"
                                        },
                                        "mimetype": {
                                          "description": "The MIME type of the attachment.",
                                          "type": "string"
                                        },
                                        "url": {
                                          "description": "The URL to download the attachment.",
                                          "type": "string"
                                        },
                                        "url_expires_at": {
                                          "description": "The URL expiration timestamp. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                                          "type": "string"
                                        },
                                        "content": {
                                          "description": "The file content encoded as base64, when available directly without an additional download.",
                                          "type": "string"
                                        },
                                        "type": {
                                          "type": "string",
                                          "enum": [
                                            "audio"
                                          ]
                                        },
                                        "duration": {
                                          "description": "The duration of the audio in seconds.",
                                          "type": "number"
                                        },
                                        "voice_note": {
                                          "description": "The audio is a voice note (should be displayed differently)",
                                          "type": "boolean"
                                        }
                                      }
                                    },
                                    {
                                      "title": "Image",
                                      "type": "object",
                                      "required": [
                                        "object",
                                        "id",
                                        "is_inline",
                                        "mimetype",
                                        "url",
                                        "type",
                                        "sticker"
                                      ],
                                      "properties": {
                                        "object": {
                                          "type": "string",
                                          "enum": [
                                            "Attachment"
                                          ]
                                        },
                                        "id": {
                                          "description": "The unique identifier of the attachment.",
                                          "type": "string"
                                        },
                                        "file_size": {
                                          "description": "The size of the attachment in bytes.",
                                          "type": "number"
                                        },
                                        "is_inline": {
                                          "description": "Is the attachment inline in the content.",
                                          "type": "boolean"
                                        },
                                        "content_id": {
                                          "description": "Reserved for email attachments. The Content-ID (CID) used to reference the attachment inline in the email HTML body via `cid:`. Provided without the surrounding angle brackets.",
                                          "type": "string"
                                        },
                                        "is_unavailable": {
                                          "description": "The attachment is not available for download because it was removed from provider servers.",
                                          "type": "boolean"
                                        },
                                        "mimetype": {
                                          "description": "The MIME type of the attachment.",
                                          "type": "string"
                                        },
                                        "url": {
                                          "description": "The URL to download the attachment.",
                                          "type": "string"
                                        },
                                        "url_expires_at": {
                                          "description": "The URL expiration timestamp. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                                          "type": "string"
                                        },
                                        "content": {
                                          "description": "The file content encoded as base64, when available directly without an additional download.",
                                          "type": "string"
                                        },
                                        "type": {
                                          "type": "string",
                                          "enum": [
                                            "img"
                                          ]
                                        },
                                        "size": {
                                          "description": "The size of the image in pixels.",
                                          "type": "object",
                                          "required": [
                                            "height",
                                            "width"
                                          ],
                                          "properties": {
                                            "height": {
                                              "type": "number"
                                            },
                                            "width": {
                                              "type": "number"
                                            }
                                          }
                                        },
                                        "sticker": {
                                          "description": "The image is a sticker (should be displayed differently)",
                                          "type": "boolean"
                                        }
                                      }
                                    },
                                    {
                                      "title": "Video",
                                      "type": "object",
                                      "required": [
                                        "object",
                                        "id",
                                        "is_inline",
                                        "mimetype",
                                        "url",
                                        "type",
                                        "size",
                                        "gif"
                                      ],
                                      "properties": {
                                        "object": {
                                          "type": "string",
                                          "enum": [
                                            "Attachment"
                                          ]
                                        },
                                        "id": {
                                          "description": "The unique identifier of the attachment.",
                                          "type": "string"
                                        },
                                        "file_size": {
                                          "description": "The size of the attachment in bytes.",
                                          "type": "number"
                                        },
                                        "is_inline": {
                                          "description": "Is the attachment inline in the content.",
                                          "type": "boolean"
                                        },
                                        "content_id": {
                                          "description": "Reserved for email attachments. The Content-ID (CID) used to reference the attachment inline in the email HTML body via `cid:`. Provided without the surrounding angle brackets.",
                                          "type": "string"
                                        },
                                        "is_unavailable": {
                                          "description": "The attachment is not available for download because it was removed from provider servers.",
                                          "type": "boolean"
                                        },
                                        "mimetype": {
                                          "description": "The MIME type of the attachment.",
                                          "type": "string"
                                        },
                                        "url": {
                                          "description": "The URL to download the attachment.",
                                          "type": "string"
                                        },
                                        "url_expires_at": {
                                          "description": "The URL expiration timestamp. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                                          "type": "string"
                                        },
                                        "content": {
                                          "description": "The file content encoded as base64, when available directly without an additional download.",
                                          "type": "string"
                                        },
                                        "type": {
                                          "type": "string",
                                          "enum": [
                                            "video"
                                          ]
                                        },
                                        "duration": {
                                          "description": "The duration of the video in seconds.",
                                          "type": "number"
                                        },
                                        "size": {
                                          "description": "The size of the video in pixels.",
                                          "type": "object",
                                          "required": [
                                            "height",
                                            "width"
                                          ],
                                          "properties": {
                                            "height": {
                                              "type": "number"
                                            },
                                            "width": {
                                              "type": "number"
                                            }
                                          }
                                        },
                                        "gif": {
                                          "description": "The video is a GIF (should be displayed differently)",
                                          "type": "boolean"
                                        }
                                      }
                                    },
                                    {
                                      "title": "File / Document",
                                      "type": "object",
                                      "required": [
                                        "object",
                                        "id",
                                        "is_inline",
                                        "mimetype",
                                        "url",
                                        "type",
                                        "filename"
                                      ],
                                      "properties": {
                                        "object": {
                                          "type": "string",
                                          "enum": [
                                            "Attachment"
                                          ]
                                        },
                                        "id": {
                                          "description": "The unique identifier of the attachment.",
                                          "type": "string"
                                        },
                                        "file_size": {
                                          "description": "The size of the attachment in bytes.",
                                          "type": "number"
                                        },
                                        "is_inline": {
                                          "description": "Is the attachment inline in the content.",
                                          "type": "boolean"
                                        },
                                        "content_id": {
                                          "description": "Reserved for email attachments. The Content-ID (CID) used to reference the attachment inline in the email HTML body via `cid:`. Provided without the surrounding angle brackets.",
                                          "type": "string"
                                        },
                                        "is_unavailable": {
                                          "description": "The attachment is not available for download because it was removed from provider servers.",
                                          "type": "boolean"
                                        },
                                        "mimetype": {
                                          "description": "The MIME type of the attachment.",
                                          "type": "string"
                                        },
                                        "url": {
                                          "description": "The URL to download the attachment.",
                                          "type": "string"
                                        },
                                        "url_expires_at": {
                                          "description": "The URL expiration timestamp. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                                          "type": "string"
                                        },
                                        "content": {
                                          "description": "The file content encoded as base64, when available directly without an additional download.",
                                          "type": "string"
                                        },
                                        "type": {
                                          "type": "string",
                                          "enum": [
                                            "file"
                                          ]
                                        },
                                        "filename": {
                                          "description": "The name of the file, including the extension.",
                                          "type": "string"
                                        }
                                      }
                                    },
                                    {
                                      "title": "Media Share",
                                      "type": "object",
                                      "required": [
                                        "object",
                                        "id",
                                        "is_inline",
                                        "mimetype",
                                        "url",
                                        "type",
                                        "media_type"
                                      ],
                                      "properties": {
                                        "object": {
                                          "type": "string",
                                          "enum": [
                                            "Attachment"
                                          ]
                                        },
                                        "id": {
                                          "description": "The unique identifier of the attachment.",
                                          "type": "string"
                                        },
                                        "file_size": {
                                          "description": "The size of the attachment in bytes.",
                                          "type": "number"
                                        },
                                        "is_inline": {
                                          "description": "Is the attachment inline in the content.",
                                          "type": "boolean"
                                        },
                                        "content_id": {
                                          "description": "Reserved for email attachments. The Content-ID (CID) used to reference the attachment inline in the email HTML body via `cid:`. Provided without the surrounding angle brackets.",
                                          "type": "string"
                                        },
                                        "is_unavailable": {
                                          "description": "The attachment is not available for download because it was removed from provider servers.",
                                          "type": "boolean"
                                        },
                                        "mimetype": {
                                          "description": "The MIME type of the attachment.",
                                          "type": "string"
                                        },
                                        "url": {
                                          "description": "The URL of the shared content.",
                                          "type": "string"
                                        },
                                        "url_expires_at": {
                                          "description": "The URL expiration timestamp. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                                          "type": "string"
                                        },
                                        "content": {
                                          "description": "The file content encoded as base64, when available directly without an additional download.",
                                          "type": "string"
                                        },
                                        "type": {
                                          "type": "string",
                                          "enum": [
                                            "shared_content"
                                          ]
                                        },
                                        "media_type": {
                                          "description": "The type of content being shared.",
                                          "type": "string",
                                          "enum": [
                                            "post",
                                            "story",
                                            "url",
                                            "reel",
                                            "job_posting"
                                          ]
                                        },
                                        "author": {
                                          "description": "The author of the shared content, if applicable.",
                                          "type": "string"
                                        },
                                        "description": {
                                          "description": "A brief description of the shared content.",
                                          "type": "string"
                                        }
                                      }
                                    },
                                    {
                                      "title": "Contact Card",
                                      "type": "object",
                                      "required": [
                                        "object",
                                        "id",
                                        "is_inline",
                                        "mimetype",
                                        "url",
                                        "type",
                                        "phones",
                                        "emails"
                                      ],
                                      "properties": {
                                        "object": {
                                          "type": "string",
                                          "enum": [
                                            "Attachment"
                                          ]
                                        },
                                        "id": {
                                          "description": "The unique identifier of the attachment.",
                                          "type": "string"
                                        },
                                        "file_size": {
                                          "description": "The size of the attachment in bytes.",
                                          "type": "number"
                                        },
                                        "is_inline": {
                                          "description": "Is the attachment inline in the content.",
                                          "type": "boolean"
                                        },
                                        "content_id": {
                                          "description": "Reserved for email attachments. The Content-ID (CID) used to reference the attachment inline in the email HTML body via `cid:`. Provided without the surrounding angle brackets.",
                                          "type": "string"
                                        },
                                        "is_unavailable": {
                                          "description": "The attachment is not available for download because it was removed from provider servers.",
                                          "type": "boolean"
                                        },
                                        "mimetype": {
                                          "description": "The MIME type of the attachment.",
                                          "type": "string"
                                        },
                                        "url": {
                                          "description": "The URL to download the attachment.",
                                          "type": "string"
                                        },
                                        "url_expires_at": {
                                          "description": "The URL expiration timestamp. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                                          "type": "string"
                                        },
                                        "content": {
                                          "description": "The file content encoded as base64, when available directly without an additional download.",
                                          "type": "string"
                                        },
                                        "type": {
                                          "type": "string",
                                          "enum": [
                                            "contact_card"
                                          ]
                                        },
                                        "display_name": {
                                          "description": "The name of the shared contact.",
                                          "type": "string"
                                        },
                                        "organization": {
                                          "description": "The organization of the shared contact.",
                                          "type": "string"
                                        },
                                        "phones": {
                                          "description": "The phone numbers of the shared contact.",
                                          "type": "array",
                                          "items": {
                                            "type": "object",
                                            "required": [
                                              "number"
                                            ],
                                            "properties": {
                                              "number": {
                                                "description": "The phone number of the shared contact.",
                                                "type": "string"
                                              },
                                              "type": {
                                                "description": "The label of the phone number, as set by the contact owner (CELL, WORK, ...).",
                                                "type": "string"
                                              }
                                            }
                                          }
                                        },
                                        "emails": {
                                          "description": "The email addresses of the shared contact.",
                                          "type": "array",
                                          "items": {
                                            "type": "object",
                                            "required": [
                                              "address"
                                            ],
                                            "properties": {
                                              "address": {
                                                "description": "The email address of the shared contact.",
                                                "type": "string"
                                              },
                                              "type": {
                                                "description": "The label of the email address, as set by the contact owner (HOME, WORK, ...).",
                                                "type": "string"
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  ]
                                }
                              },
                              "sender": {
                                "description": "The user who sent the message.",
                                "type": "object",
                                "required": [
                                  "id",
                                  "object",
                                  "type",
                                  "display_name"
                                ],
                                "properties": {
                                  "id": {
                                    "description": "Unique identifier of the user for the provider. Usually an internal identifier used by the API only.",
                                    "type": "string"
                                  },
                                  "object": {
                                    "type": "string",
                                    "enum": [
                                      "User"
                                    ]
                                  },
                                  "type": {
                                    "description": "Type of the user\n      - `individual` is an individual user.\n      - `organization` is an organization / business entity.\n      - `other` is an other type of entity.",
                                    "type": "string",
                                    "enum": [
                                      "individual",
                                      "organization",
                                      "other"
                                    ]
                                  },
                                  "public_identifier": {
                                    "description": "Public identifier of the user for the provider. Usually a shareable tag visible in urls and profiles. ",
                                    "type": "string"
                                  },
                                  "display_name": {
                                    "description": "Display name of the user as exposed by the provider.",
                                    "type": "string"
                                  },
                                  "first_name": {
                                    "description": "First name of the user.",
                                    "type": "string"
                                  },
                                  "last_name": {
                                    "description": "Last name of the user.",
                                    "type": "string"
                                  },
                                  "profile_url": {
                                    "format": "uri",
                                    "description": "Public url to the profile of the user.",
                                    "type": "string"
                                  },
                                  "public_picture_url": {
                                    "format": "uri",
                                    "description": "Public url to the profile picture of the user.",
                                    "type": "string"
                                  },
                                  "private_picture_download_url": {
                                    "format": "uri",
                                    "description": "Private url to download the profile picture of the user. This url require authentication.",
                                    "type": "string"
                                  },
                                  "description": {
                                    "description": "Description of the user.",
                                    "type": "string"
                                  },
                                  "specifics": {
                                    "description": "Object containing provider-specific user profile data.",
                                    "anyOf": [
                                      {
                                        "title": "WhatsApp",
                                        "type": "object",
                                        "required": [
                                          "contact_name"
                                        ],
                                        "properties": {
                                          "contact_name": {
                                            "description": "Name saved by the connected account owner in their WhatsApp address book.",
                                            "type": "string"
                                          }
                                        }
                                      },
                                      {
                                        "title": "Instagram",
                                        "type": "object",
                                        "required": [
                                          "messaging_identifier"
                                        ],
                                        "properties": {
                                          "messaging_identifier": {
                                            "description": "Messaging identifier of the user. Messages sent by this user carry it as their sender_id.",
                                            "type": "string"
                                          }
                                        }
                                      },
                                      {
                                        "title": "LinkedIn",
                                        "type": "object",
                                        "properties": {
                                          "location": {
                                            "description": "The geographical location of the user.",
                                            "type": "string"
                                          },
                                          "network_distance": {
                                            "description": "Network distance to a User.\n      `SELF`: Yourself.\n      `FIRST_DEGREE`: 1st degree connection.\n      `SECOND_DEGREE`: 2nd degree connection (connection of a 1st degree).\n      `THIRD_DEGREE`: 3rd degree connection (connection of a 2nd degree).\n      `OUT_OF_NETWORK`: Unreachable user.'",
                                            "anyOf": [
                                              {
                                                "type": "string",
                                                "enum": [
                                                  "SELF"
                                                ]
                                              },
                                              {
                                                "type": "string",
                                                "enum": [
                                                  "FIRST_DEGREE"
                                                ]
                                              },
                                              {
                                                "type": "string",
                                                "enum": [
                                                  "SECOND_DEGREE"
                                                ]
                                              },
                                              {
                                                "type": "string",
                                                "enum": [
                                                  "THIRD_DEGREE"
                                                ]
                                              },
                                              {
                                                "type": "string",
                                                "enum": [
                                                  "OUT_OF_NETWORK"
                                                ]
                                              }
                                            ]
                                          },
                                          "industry": {
                                            "description": "The user's industry.",
                                            "type": "string"
                                          },
                                          "is_following": {
                                            "description": "Whether the current user follows the user.",
                                            "type": "boolean"
                                          },
                                          "followers_count": {
                                            "description": "The number of followers of the user.",
                                            "type": "number"
                                          },
                                          "relations_count": {
                                            "description": "The number of relations of the user.",
                                            "type": "number"
                                          },
                                          "shared_relations_count": {
                                            "description": "The number of relations that you share with the user.",
                                            "type": "number"
                                          },
                                          "website_url": {
                                            "description": "The URL of the website provided by the user.",
                                            "type": "string"
                                          },
                                          "portfolio_url": {
                                            "description": "The URL of the portfolio provided by the user.",
                                            "type": "string"
                                          },
                                          "services_page_url": {
                                            "description": "The LinkedIn internal URL of the user's services page.",
                                            "type": "string"
                                          },
                                          "is_premium": {
                                            "description": "Whether the User has a premium account.",
                                            "type": "boolean"
                                          },
                                          "is_verified": {
                                            "description": "Whether the User has a verified account.",
                                            "type": "boolean"
                                          }
                                        }
                                      }
                                    ]
                                  }
                                }
                              },
                              "specifics": {
                                "title": "WhatsApp",
                                "type": "object",
                                "properties": {
                                  "interactive": {
                                    "description": "WhatsApp interactive content available in the received provider payload. The body is exposed in text. Supports buttons, templates and native flows; missing or unsupported payloads cannot be reconstructed. Button metadata does not imply that Unipile can execute the action.",
                                    "type": "object",
                                    "required": [
                                      "type",
                                      "buttons"
                                    ],
                                    "properties": {
                                      "type": {
                                        "type": "string",
                                        "enum": [
                                          "buttons",
                                          "template",
                                          "native_flow",
                                          "response"
                                        ]
                                      },
                                      "title": {
                                        "type": "string"
                                      },
                                      "footer": {
                                        "type": "string"
                                      },
                                      "buttons": {
                                        "type": "array",
                                        "items": {
                                          "type": "object",
                                          "required": [
                                            "type"
                                          ],
                                          "properties": {
                                            "type": {
                                              "type": "string",
                                              "enum": [
                                                "reply",
                                                "url",
                                                "call",
                                                "native_flow"
                                              ]
                                            },
                                            "id": {
                                              "description": "Provider button identifier, when available.",
                                              "type": "string"
                                            },
                                            "text": {
                                              "description": "Button label, when available.",
                                              "type": "string"
                                            },
                                            "url": {
                                              "type": "string"
                                            },
                                            "phone_number": {
                                              "type": "string"
                                            },
                                            "name": {
                                              "description": "Native flow action name. Unknown actions are not interpreted.",
                                              "type": "string"
                                            }
                                          }
                                        }
                                      },
                                      "selected_button": {
                                        "type": "object",
                                        "required": [
                                          "type"
                                        ],
                                        "properties": {
                                          "type": {
                                            "type": "string",
                                            "enum": [
                                              "reply",
                                              "url",
                                              "call",
                                              "native_flow"
                                            ]
                                          },
                                          "id": {
                                            "description": "Provider button identifier, when available.",
                                            "type": "string"
                                          },
                                          "text": {
                                            "description": "Button label, when available.",
                                            "type": "string"
                                          },
                                          "url": {
                                            "type": "string"
                                          },
                                          "phone_number": {
                                            "type": "string"
                                          },
                                          "name": {
                                            "description": "Native flow action name. Unknown actions are not interpreted.",
                                            "type": "string"
                                          }
                                        }
                                      }
                                    }
                                  },
                                  "album_id": {
                                    "description": "Identifier of the media album the message belongs to. Messages sent together as one album share the same value. Absent when the message is not part of an album.",
                                    "type": "string"
                                  }
                                }
                              }
                            }
                          },
                          "forwarded": {
                            "description": "Contains the original message if this message was forwarded from another chat, depending on provider support.\n    Some providers preserve the original sender and content, treating it as if it were sent by the account owner.\n    Others wrap the forwarded message within a new message (similar to a quote or attachment), in which case the original message appears here.",
                            "type": "object",
                            "required": [
                              "attachments",
                              "object"
                            ],
                            "properties": {
                              "text": {
                                "description": "The text content of the message.",
                                "type": "string"
                              },
                              "attachments": {
                                "description": "List of message attachments.",
                                "type": "array",
                                "items": {
                                  "anyOf": [
                                    {
                                      "title": "Audio",
                                      "type": "object",
                                      "required": [
                                        "object",
                                        "id",
                                        "is_inline",
                                        "mimetype",
                                        "url",
                                        "type",
                                        "voice_note"
                                      ],
                                      "properties": {
                                        "object": {
                                          "type": "string",
                                          "enum": [
                                            "Attachment"
                                          ]
                                        },
                                        "id": {
                                          "description": "The unique identifier of the attachment.",
                                          "type": "string"
                                        },
                                        "file_size": {
                                          "description": "The size of the attachment in bytes.",
                                          "type": "number"
                                        },
                                        "is_inline": {
                                          "description": "Is the attachment inline in the content.",
                                          "type": "boolean"
                                        },
                                        "content_id": {
                                          "description": "Reserved for email attachments. The Content-ID (CID) used to reference the attachment inline in the email HTML body via `cid:`. Provided without the surrounding angle brackets.",
                                          "type": "string"
                                        },
                                        "is_unavailable": {
                                          "description": "The attachment is not available for download because it was removed from provider servers.",
                                          "type": "boolean"
                                        },
                                        "mimetype": {
                                          "description": "The MIME type of the attachment.",
                                          "type": "string"
                                        },
                                        "url": {
                                          "description": "The URL to download the attachment.",
                                          "type": "string"
                                        },
                                        "url_expires_at": {
                                          "description": "The URL expiration timestamp. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                                          "type": "string"
                                        },
                                        "content": {
                                          "description": "The file content encoded as base64, when available directly without an additional download.",
                                          "type": "string"
                                        },
                                        "type": {
                                          "type": "string",
                                          "enum": [
                                            "audio"
                                          ]
                                        },
                                        "duration": {
                                          "description": "The duration of the audio in seconds.",
                                          "type": "number"
                                        },
                                        "voice_note": {
                                          "description": "The audio is a voice note (should be displayed differently)",
                                          "type": "boolean"
                                        }
                                      }
                                    },
                                    {
                                      "title": "Image",
                                      "type": "object",
                                      "required": [
                                        "object",
                                        "id",
                                        "is_inline",
                                        "mimetype",
                                        "url",
                                        "type",
                                        "sticker"
                                      ],
                                      "properties": {
                                        "object": {
                                          "type": "string",
                                          "enum": [
                                            "Attachment"
                                          ]
                                        },
                                        "id": {
                                          "description": "The unique identifier of the attachment.",
                                          "type": "string"
                                        },
                                        "file_size": {
                                          "description": "The size of the attachment in bytes.",
                                          "type": "number"
                                        },
                                        "is_inline": {
                                          "description": "Is the attachment inline in the content.",
                                          "type": "boolean"
                                        },
                                        "content_id": {
                                          "description": "Reserved for email attachments. The Content-ID (CID) used to reference the attachment inline in the email HTML body via `cid:`. Provided without the surrounding angle brackets.",
                                          "type": "string"
                                        },
                                        "is_unavailable": {
                                          "description": "The attachment is not available for download because it was removed from provider servers.",
                                          "type": "boolean"
                                        },
                                        "mimetype": {
                                          "description": "The MIME type of the attachment.",
                                          "type": "string"
                                        },
                                        "url": {
                                          "description": "The URL to download the attachment.",
                                          "type": "string"
                                        },
                                        "url_expires_at": {
                                          "description": "The URL expiration timestamp. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                                          "type": "string"
                                        },
                                        "content": {
                                          "description": "The file content encoded as base64, when available directly without an additional download.",
                                          "type": "string"
                                        },
                                        "type": {
                                          "type": "string",
                                          "enum": [
                                            "img"
                                          ]
                                        },
                                        "size": {
                                          "description": "The size of the image in pixels.",
                                          "type": "object",
                                          "required": [
                                            "height",
                                            "width"
                                          ],
                                          "properties": {
                                            "height": {
                                              "type": "number"
                                            },
                                            "width": {
                                              "type": "number"
                                            }
                                          }
                                        },
                                        "sticker": {
                                          "description": "The image is a sticker (should be displayed differently)",
                                          "type": "boolean"
                                        }
                                      }
                                    },
                                    {
                                      "title": "Video",
                                      "type": "object",
                                      "required": [
                                        "object",
                                        "id",
                                        "is_inline",
                                        "mimetype",
                                        "url",
                                        "type",
                                        "size",
                                        "gif"
                                      ],
                                      "properties": {
                                        "object": {
                                          "type": "string",
                                          "enum": [
                                            "Attachment"
                                          ]
                                        },
                                        "id": {
                                          "description": "The unique identifier of the attachment.",
                                          "type": "string"
                                        },
                                        "file_size": {
                                          "description": "The size of the attachment in bytes.",
                                          "type": "number"
                                        },
                                        "is_inline": {
                                          "description": "Is the attachment inline in the content.",
                                          "type": "boolean"
                                        },
                                        "content_id": {
                                          "description": "Reserved for email attachments. The Content-ID (CID) used to reference the attachment inline in the email HTML body via `cid:`. Provided without the surrounding angle brackets.",
                                          "type": "string"
                                        },
                                        "is_unavailable": {
                                          "description": "The attachment is not available for download because it was removed from provider servers.",
                                          "type": "boolean"
                                        },
                                        "mimetype": {
                                          "description": "The MIME type of the attachment.",
                                          "type": "string"
                                        },
                                        "url": {
                                          "description": "The URL to download the attachment.",
                                          "type": "string"
                                        },
                                        "url_expires_at": {
                                          "description": "The URL expiration timestamp. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                                          "type": "string"
                                        },
                                        "content": {
                                          "description": "The file content encoded as base64, when available directly without an additional download.",
                                          "type": "string"
                                        },
                                        "type": {
                                          "type": "string",
                                          "enum": [
                                            "video"
                                          ]
                                        },
                                        "duration": {
                                          "description": "The duration of the video in seconds.",
                                          "type": "number"
                                        },
                                        "size": {
                                          "description": "The size of the video in pixels.",
                                          "type": "object",
                                          "required": [
                                            "height",
                                            "width"
                                          ],
                                          "properties": {
                                            "height": {
                                              "type": "number"
                                            },
                                            "width": {
                                              "type": "number"
                                            }
                                          }
                                        },
                                        "gif": {
                                          "description": "The video is a GIF (should be displayed differently)",
                                          "type": "boolean"
                                        }
                                      }
                                    },
                                    {
                                      "title": "File / Document",
                                      "type": "object",
                                      "required": [
                                        "object",
                                        "id",
                                        "is_inline",
                                        "mimetype",
                                        "url",
                                        "type",
                                        "filename"
                                      ],
                                      "properties": {
                                        "object": {
                                          "type": "string",
                                          "enum": [
                                            "Attachment"
                                          ]
                                        },
                                        "id": {
                                          "description": "The unique identifier of the attachment.",
                                          "type": "string"
                                        },
                                        "file_size": {
                                          "description": "The size of the attachment in bytes.",
                                          "type": "number"
                                        },
                                        "is_inline": {
                                          "description": "Is the attachment inline in the content.",
                                          "type": "boolean"
                                        },
                                        "content_id": {
                                          "description": "Reserved for email attachments. The Content-ID (CID) used to reference the attachment inline in the email HTML body via `cid:`. Provided without the surrounding angle brackets.",
                                          "type": "string"
                                        },
                                        "is_unavailable": {
                                          "description": "The attachment is not available for download because it was removed from provider servers.",
                                          "type": "boolean"
                                        },
                                        "mimetype": {
                                          "description": "The MIME type of the attachment.",
                                          "type": "string"
                                        },
                                        "url": {
                                          "description": "The URL to download the attachment.",
                                          "type": "string"
                                        },
                                        "url_expires_at": {
                                          "description": "The URL expiration timestamp. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                                          "type": "string"
                                        },
                                        "content": {
                                          "description": "The file content encoded as base64, when available directly without an additional download.",
                                          "type": "string"
                                        },
                                        "type": {
                                          "type": "string",
                                          "enum": [
                                            "file"
                                          ]
                                        },
                                        "filename": {
                                          "description": "The name of the file, including the extension.",
                                          "type": "string"
                                        }
                                      }
                                    },
                                    {
                                      "title": "Media Share",
                                      "type": "object",
                                      "required": [
                                        "object",
                                        "id",
                                        "is_inline",
                                        "mimetype",
                                        "url",
                                        "type",
                                        "media_type"
                                      ],
                                      "properties": {
                                        "object": {
                                          "type": "string",
                                          "enum": [
                                            "Attachment"
                                          ]
                                        },
                                        "id": {
                                          "description": "The unique identifier of the attachment.",
                                          "type": "string"
                                        },
                                        "file_size": {
                                          "description": "The size of the attachment in bytes.",
                                          "type": "number"
                                        },
                                        "is_inline": {
                                          "description": "Is the attachment inline in the content.",
                                          "type": "boolean"
                                        },
                                        "content_id": {
                                          "description": "Reserved for email attachments. The Content-ID (CID) used to reference the attachment inline in the email HTML body via `cid:`. Provided without the surrounding angle brackets.",
                                          "type": "string"
                                        },
                                        "is_unavailable": {
                                          "description": "The attachment is not available for download because it was removed from provider servers.",
                                          "type": "boolean"
                                        },
                                        "mimetype": {
                                          "description": "The MIME type of the attachment.",
                                          "type": "string"
                                        },
                                        "url": {
                                          "description": "The URL of the shared content.",
                                          "type": "string"
                                        },
                                        "url_expires_at": {
                                          "description": "The URL expiration timestamp. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                                          "type": "string"
                                        },
                                        "content": {
                                          "description": "The file content encoded as base64, when available directly without an additional download.",
                                          "type": "string"
                                        },
                                        "type": {
                                          "type": "string",
                                          "enum": [
                                            "shared_content"
                                          ]
                                        },
                                        "media_type": {
                                          "description": "The type of content being shared.",
                                          "type": "string",
                                          "enum": [
                                            "post",
                                            "story",
                                            "url",
                                            "reel",
                                            "job_posting"
                                          ]
                                        },
                                        "author": {
                                          "description": "The author of the shared content, if applicable.",
                                          "type": "string"
                                        },
                                        "description": {
                                          "description": "A brief description of the shared content.",
                                          "type": "string"
                                        }
                                      }
                                    },
                                    {
                                      "title": "Contact Card",
                                      "type": "object",
                                      "required": [
                                        "object",
                                        "id",
                                        "is_inline",
                                        "mimetype",
                                        "url",
                                        "type",
                                        "phones",
                                        "emails"
                                      ],
                                      "properties": {
                                        "object": {
                                          "type": "string",
                                          "enum": [
                                            "Attachment"
                                          ]
                                        },
                                        "id": {
                                          "description": "The unique identifier of the attachment.",
                                          "type": "string"
                                        },
                                        "file_size": {
                                          "description": "The size of the attachment in bytes.",
                                          "type": "number"
                                        },
                                        "is_inline": {
                                          "description": "Is the attachment inline in the content.",
                                          "type": "boolean"
                                        },
                                        "content_id": {
                                          "description": "Reserved for email attachments. The Content-ID (CID) used to reference the attachment inline in the email HTML body via `cid:`. Provided without the surrounding angle brackets.",
                                          "type": "string"
                                        },
                                        "is_unavailable": {
                                          "description": "The attachment is not available for download because it was removed from provider servers.",
                                          "type": "boolean"
                                        },
                                        "mimetype": {
                                          "description": "The MIME type of the attachment.",
                                          "type": "string"
                                        },
                                        "url": {
                                          "description": "The URL to download the attachment.",
                                          "type": "string"
                                        },
                                        "url_expires_at": {
                                          "description": "The URL expiration timestamp. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                                          "type": "string"
                                        },
                                        "content": {
                                          "description": "The file content encoded as base64, when available directly without an additional download.",
                                          "type": "string"
                                        },
                                        "type": {
                                          "type": "string",
                                          "enum": [
                                            "contact_card"
                                          ]
                                        },
                                        "display_name": {
                                          "description": "The name of the shared contact.",
                                          "type": "string"
                                        },
                                        "organization": {
                                          "description": "The organization of the shared contact.",
                                          "type": "string"
                                        },
                                        "phones": {
                                          "description": "The phone numbers of the shared contact.",
                                          "type": "array",
                                          "items": {
                                            "type": "object",
                                            "required": [
                                              "number"
                                            ],
                                            "properties": {
                                              "number": {
                                                "description": "The phone number of the shared contact.",
                                                "type": "string"
                                              },
                                              "type": {
                                                "description": "The label of the phone number, as set by the contact owner (CELL, WORK, ...).",
                                                "type": "string"
                                              }
                                            }
                                          }
                                        },
                                        "emails": {
                                          "description": "The email addresses of the shared contact.",
                                          "type": "array",
                                          "items": {
                                            "type": "object",
                                            "required": [
                                              "address"
                                            ],
                                            "properties": {
                                              "address": {
                                                "description": "The email address of the shared contact.",
                                                "type": "string"
                                              },
                                              "type": {
                                                "description": "The label of the email address, as set by the contact owner (HOME, WORK, ...).",
                                                "type": "string"
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  ]
                                }
                              },
                              "object": {
                                "type": "string",
                                "enum": [
                                  "ForwardedMessage"
                                ]
                              },
                              "sender": {
                                "description": "The user who sent the message.",
                                "type": "object",
                                "required": [
                                  "id",
                                  "object",
                                  "type",
                                  "display_name"
                                ],
                                "properties": {
                                  "id": {
                                    "description": "Unique identifier of the user for the provider. Usually an internal identifier used by the API only.",
                                    "type": "string"
                                  },
                                  "object": {
                                    "type": "string",
                                    "enum": [
                                      "User"
                                    ]
                                  },
                                  "type": {
                                    "description": "Type of the user\n      - `individual` is an individual user.\n      - `organization` is an organization / business entity.\n      - `other` is an other type of entity.",
                                    "type": "string",
                                    "enum": [
                                      "individual",
                                      "organization",
                                      "other"
                                    ]
                                  },
                                  "public_identifier": {
                                    "description": "Public identifier of the user for the provider. Usually a shareable tag visible in urls and profiles. ",
                                    "type": "string"
                                  },
                                  "display_name": {
                                    "description": "Display name of the user as exposed by the provider.",
                                    "type": "string"
                                  },
                                  "first_name": {
                                    "description": "First name of the user.",
                                    "type": "string"
                                  },
                                  "last_name": {
                                    "description": "Last name of the user.",
                                    "type": "string"
                                  },
                                  "profile_url": {
                                    "format": "uri",
                                    "description": "Public url to the profile of the user.",
                                    "type": "string"
                                  },
                                  "public_picture_url": {
                                    "format": "uri",
                                    "description": "Public url to the profile picture of the user.",
                                    "type": "string"
                                  },
                                  "private_picture_download_url": {
                                    "format": "uri",
                                    "description": "Private url to download the profile picture of the user. This url require authentication.",
                                    "type": "string"
                                  },
                                  "description": {
                                    "description": "Description of the user.",
                                    "type": "string"
                                  },
                                  "specifics": {
                                    "description": "Object containing provider-specific user profile data.",
                                    "anyOf": [
                                      {
                                        "title": "WhatsApp",
                                        "type": "object",
                                        "required": [
                                          "contact_name"
                                        ],
                                        "properties": {
                                          "contact_name": {
                                            "description": "Name saved by the connected account owner in their WhatsApp address book.",
                                            "type": "string"
                                          }
                                        }
                                      },
                                      {
                                        "title": "Instagram",
                                        "type": "object",
                                        "required": [
                                          "messaging_identifier"
                                        ],
                                        "properties": {
                                          "messaging_identifier": {
                                            "description": "Messaging identifier of the user. Messages sent by this user carry it as their sender_id.",
                                            "type": "string"
                                          }
                                        }
                                      },
                                      {
                                        "title": "LinkedIn",
                                        "type": "object",
                                        "properties": {
                                          "location": {
                                            "description": "The geographical location of the user.",
                                            "type": "string"
                                          },
                                          "network_distance": {
                                            "description": "Network distance to a User.\n      `SELF`: Yourself.\n      `FIRST_DEGREE`: 1st degree connection.\n      `SECOND_DEGREE`: 2nd degree connection (connection of a 1st degree).\n      `THIRD_DEGREE`: 3rd degree connection (connection of a 2nd degree).\n      `OUT_OF_NETWORK`: Unreachable user.'",
                                            "anyOf": [
                                              {
                                                "type": "string",
                                                "enum": [
                                                  "SELF"
                                                ]
                                              },
                                              {
                                                "type": "string",
                                                "enum": [
                                                  "FIRST_DEGREE"
                                                ]
                                              },
                                              {
                                                "type": "string",
                                                "enum": [
                                                  "SECOND_DEGREE"
                                                ]
                                              },
                                              {
                                                "type": "string",
                                                "enum": [
                                                  "THIRD_DEGREE"
                                                ]
                                              },
                                              {
                                                "type": "string",
                                                "enum": [
                                                  "OUT_OF_NETWORK"
                                                ]
                                              }
                                            ]
                                          },
                                          "industry": {
                                            "description": "The user's industry.",
                                            "type": "string"
                                          },
                                          "is_following": {
                                            "description": "Whether the current user follows the user.",
                                            "type": "boolean"
                                          },
                                          "followers_count": {
                                            "description": "The number of followers of the user.",
                                            "type": "number"
                                          },
                                          "relations_count": {
                                            "description": "The number of relations of the user.",
                                            "type": "number"
                                          },
                                          "shared_relations_count": {
                                            "description": "The number of relations that you share with the user.",
                                            "type": "number"
                                          },
                                          "website_url": {
                                            "description": "The URL of the website provided by the user.",
                                            "type": "string"
                                          },
                                          "portfolio_url": {
                                            "description": "The URL of the portfolio provided by the user.",
                                            "type": "string"
                                          },
                                          "services_page_url": {
                                            "description": "The LinkedIn internal URL of the user's services page.",
                                            "type": "string"
                                          },
                                          "is_premium": {
                                            "description": "Whether the User has a premium account.",
                                            "type": "boolean"
                                          },
                                          "is_verified": {
                                            "description": "Whether the User has a verified account.",
                                            "type": "boolean"
                                          }
                                        }
                                      }
                                    ]
                                  }
                                }
                              },
                              "specifics": {
                                "title": "WhatsApp",
                                "type": "object",
                                "properties": {
                                  "interactive": {
                                    "description": "WhatsApp interactive content available in the received provider payload. The body is exposed in text. Supports buttons, templates and native flows; missing or unsupported payloads cannot be reconstructed. Button metadata does not imply that Unipile can execute the action.",
                                    "type": "object",
                                    "required": [
                                      "type",
                                      "buttons"
                                    ],
                                    "properties": {
                                      "type": {
                                        "type": "string",
                                        "enum": [
                                          "buttons",
                                          "template",
                                          "native_flow",
                                          "response"
                                        ]
                                      },
                                      "title": {
                                        "type": "string"
                                      },
                                      "footer": {
                                        "type": "string"
                                      },
                                      "buttons": {
                                        "type": "array",
                                        "items": {
                                          "type": "object",
                                          "required": [
                                            "type"
                                          ],
                                          "properties": {
                                            "type": {
                                              "type": "string",
                                              "enum": [
                                                "reply",
                                                "url",
                                                "call",
                                                "native_flow"
                                              ]
                                            },
                                            "id": {
                                              "description": "Provider button identifier, when available.",
                                              "type": "string"
                                            },
                                            "text": {
                                              "description": "Button label, when available.",
                                              "type": "string"
                                            },
                                            "url": {
                                              "type": "string"
                                            },
                                            "phone_number": {
                                              "type": "string"
                                            },
                                            "name": {
                                              "description": "Native flow action name. Unknown actions are not interpreted.",
                                              "type": "string"
                                            }
                                          }
                                        }
                                      },
                                      "selected_button": {
                                        "type": "object",
                                        "required": [
                                          "type"
                                        ],
                                        "properties": {
                                          "type": {
                                            "type": "string",
                                            "enum": [
                                              "reply",
                                              "url",
                                              "call",
                                              "native_flow"
                                            ]
                                          },
                                          "id": {
                                            "description": "Provider button identifier, when available.",
                                            "type": "string"
                                          },
                                          "text": {
                                            "description": "Button label, when available.",
                                            "type": "string"
                                          },
                                          "url": {
                                            "type": "string"
                                          },
                                          "phone_number": {
                                            "type": "string"
                                          },
                                          "name": {
                                            "description": "Native flow action name. Unknown actions are not interpreted.",
                                            "type": "string"
                                          }
                                        }
                                      }
                                    }
                                  },
                                  "album_id": {
                                    "description": "Identifier of the media album the message belongs to. Messages sent together as one album share the same value. Absent when the message is not part of an album.",
                                    "type": "string"
                                  }
                                }
                              }
                            }
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