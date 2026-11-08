---
updatedAt: 2026-08-27T09:39:35.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Start a Chat from Inbox

Starts a new 1to1 or group chat in the given inbox by sending the first message.
      Use <a href="https://developer.unipile.com/v2.0/reference/sendmessage">Send a Message</a> if a conversation already exist with the wanted user(s).
      Use <a href="https://developer.unipile.com/v2.0/reference/startchat">Start a Chat</a> instead if the provider does not use the inbox concept.<br/><br/>Multipart supported, refer to <a href="https://developer.unipile.com/v2.0/reference/api-usage#sending-files">Sending Files</a>.

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
    "/v2/{account_id}/inboxes/{inbox_id}/chats/send": {
      "post": {
        "operationId": "startChatFromInbox",
        "summary": "Start a Chat from Inbox",
        "tags": [
          "Messaging"
        ],
        "description": "Starts a new 1to1 or group chat in the given inbox by sending the first message.\n      Use <a href=\"https://developer.unipile.com/v2.0/reference/sendmessage\">Send a Message</a> if a conversation already exist with the wanted user(s).\n      Use <a href=\"https://developer.unipile.com/v2.0/reference/startchat\">Start a Chat</a> instead if the provider does not use the inbox concept.<br/><br/>Multipart supported, refer to <a href=\"https://developer.unipile.com/v2.0/reference/api-usage#sending-files\">Sending Files</a>.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "text",
                  "users_ids"
                ],
                "properties": {
                  "text": {
                    "description": "The textual content of the first message to be sent in the chat. It's recommended not to use HTML or Markdown. Use empty string to start a chat without a message (if supported by the provider).",
                    "type": "string"
                  },
                  "name": {
                    "description": "A custom name for the chat. Some providers allow custom names only on groups. Default is made of participant names.",
                    "type": "string"
                  },
                  "users_ids": {
                    "description": "Participant(s) of the chat. To start a 1to1 chat, pass a single user id as a string. To start a group, pass an array of user ids. Passing an array with a single user id will attempt to start a group with that user only.",
                    "anyOf": [
                      {
                        "minItems": 1,
                        "description": "An array of user IDs to start a `group` chat. Passing an array with a single user id will attempt to start a group with that user only.",
                        "type": "array",
                        "items": {
                          "minLength": 1,
                          "type": "string"
                        }
                      },
                      {
                        "minLength": 1,
                        "description": "A single user ID to start a `1to1` chat.",
                        "type": "string"
                      }
                    ]
                  },
                  "attachments": {
                    "description": "The list of attachments (uploaded files or a shared post or job) to be sent with the message.",
                    "type": "array",
                    "items": {
                      "title": "Message File",
                      "additionalProperties": false,
                      "type": "object",
                      "required": [
                        "content",
                        "content_type",
                        "filename"
                      ],
                      "properties": {
                        "content": {
                          "description": "Content of the file encoded as base64. For large files, prefer using multipart, learn more here: https://developer.unipile.com/v2.0/reference/api-usage#sending-files",
                          "type": "string"
                        },
                        "content_type": {
                          "description": "<a href=\"https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types\">MIME type</a> of the file.",
                          "type": "string"
                        },
                        "filename": {
                          "description": "Name of the file (including extension).",
                          "type": "string"
                        },
                        "metadata": {
                          "description": "Metadata of the the file.",
                          "type": "object",
                          "properties": {
                            "duration": {
                              "description": "Duration of the media file.",
                              "type": "number"
                            }
                          }
                        },
                        "send_mode": {
                          "description": "Defines how the attachment should be sent, if the provider supports multiple modes.\n            Omitted: use the provider’s native default behavior.\n            - `file` send as a regular uploaded file.\n            - `native` send as a native media (displayed picture, voice note, recorded video, etc.)",
                          "default": "native",
                          "type": "string",
                          "enum": [
                            "file",
                            "native"
                          ]
                        },
                        "voice_note": {
                          "description": "Deprecated compatibility flag for audio attachments. Use `send_mode: \"native\"` instead.",
                          "deprecated": true,
                          "type": "boolean"
                        }
                      }
                    }
                  },
                  "specifics": {
                    "description": "Object containing provider-specific chat data.",
                    "type": "object",
                    "properties": {
                      "linkedin": {
                        "description": "Specific options to apply if the provider of the targeted account is Linkedin",
                        "type": "object",
                        "properties": {
                          "classic": {
                            "title": "LinkedIn Classic",
                            "description": "Specific options for a LinkedIn classic chat.",
                            "additionalProperties": false,
                            "type": "object",
                            "properties": {
                              "inmail": {
                                "description": "Whether the chat should be started with an InMail.",
                                "default": false,
                                "type": "boolean"
                              },
                              "company_topic": {
                                "description": "The topic for a conversation with a company.",
                                "default": "SERVICE_REQUEST",
                                "type": "string",
                                "enum": [
                                  "SERVICE_REQUEST",
                                  "REQUEST_A_DEMO",
                                  "SUPPORT",
                                  "CAREERS",
                                  "OTHER"
                                ]
                              },
                              "relation_request_id": {
                                "description": "If you'd like to start a conversation with a user you received a relation request from, the ID of the request is mandatory.",
                                "type": "string"
                              },
                              "applicant": {
                                "description": "Options available when the recipient is a candidate for one of your job postings.",
                                "type": "object",
                                "required": [
                                  "id",
                                  "messaging_token"
                                ],
                                "properties": {
                                  "id": {
                                    "description": "The applicant ID of the recipient.",
                                    "type": "string"
                                  },
                                  "messaging_token": {
                                    "description": "The messaging token to be retrieved using the <a href=\"https://developer.unipile.com/v2.0/reference/getclassicapplicantbyid\">Get an Applicant</a> endpoint.",
                                    "type": "string"
                                  }
                                }
                              },
                              "shared_content": {
                                "description": "A specific content to be shared in the current message.",
                                "type": "object",
                                "required": [
                                  "type",
                                  "id"
                                ],
                                "properties": {
                                  "type": {
                                    "description": "The type of content.",
                                    "type": "string",
                                    "enum": [
                                      "POST",
                                      "JOB_POSTING"
                                    ]
                                  },
                                  "id": {
                                    "description": "The ID of the content to be shared.",
                                    "type": "string"
                                  }
                                }
                              }
                            }
                          },
                          "sales_navigator": {
                            "title": "LinkedIn Sales Navigator",
                            "description": "Specific options for a LinkedIn sales navigator chat.",
                            "additionalProperties": false,
                            "type": "object",
                            "required": [
                              "subject"
                            ],
                            "properties": {
                              "subject": {
                                "description": "The subject of the chat.",
                                "type": "string"
                              }
                            }
                          },
                          "recruiter": {
                            "title": "LinkedIn Recruiter",
                            "description": "Specific options for a LinkedIn recruiter chat.",
                            "additionalProperties": false,
                            "type": "object",
                            "required": [
                              "subject",
                              "signature"
                            ],
                            "properties": {
                              "subject": {
                                "description": "The subject of the chat.",
                                "type": "string"
                              },
                              "signature": {
                                "description": "The signature of the sender.",
                                "type": "string"
                              },
                              "visibility": {
                                "description": "The level of visibility of the conversation within your organization.",
                                "default": "PRIVATE",
                                "type": "string",
                                "enum": [
                                  "PUBLIC",
                                  "PRIVATE",
                                  "PROJECT"
                                ]
                              },
                              "intent": {
                                "description": "The purpose of the chat.",
                                "default": "HIRE_FOR_CLIENT",
                                "type": "string",
                                "enum": [
                                  "HIRE_FOR_CLIENT",
                                  "HIRE_FOR_OWN_COMPANY"
                                ]
                              },
                              "send_as": {
                                "description": "Whether to send the message via InMail or email.",
                                "default": "INMAIL",
                                "type": "string",
                                "enum": [
                                  "INMAIL",
                                  "EMAIL"
                                ]
                              },
                              "email": {
                                "format": "email",
                                "description": "The recipient email address to use when send_as is EMAIL. Takes precedence over the primary email from the recipient profile.",
                                "type": "string"
                              },
                              "channel_type": {
                                "description": "The channel from the hiring project talent pool from which to start the chat.",
                                "type": "string",
                                "enum": [
                                  "CAREER_SITE",
                                  "MANUAL_IMPORT",
                                  "INTERNAL_CANDIDATES",
                                  "RECRUITER_SEARCH",
                                  "REFERRAL",
                                  "JOB_POSTING_RECOMMENDED_MATCHES",
                                  "AUTOMATED_SOURCING",
                                  "JOB_POSTING"
                                ]
                              },
                              "follow_up": {
                                "description": "A follow-up message to be scheduled (Recruiter Pro contracts only).",
                                "type": "object",
                                "required": [
                                  "subject",
                                  "text",
                                  "scheduled_for"
                                ],
                                "properties": {
                                  "subject": {
                                    "description": "The subject of the message.",
                                    "type": "string"
                                  },
                                  "text": {
                                    "description": "The textual content of the message.",
                                    "type": "string"
                                  },
                                  "attachments": {
                                    "description": "The list of file attachments to the message to be sent in the chat.",
                                    "type": "array",
                                    "items": {
                                      "title": "Message File",
                                      "additionalProperties": false,
                                      "type": "object",
                                      "required": [
                                        "content",
                                        "content_type",
                                        "filename"
                                      ],
                                      "properties": {
                                        "content": {
                                          "description": "Content of the file encoded as base64. For large files, prefer using multipart, learn more here: https://developer.unipile.com/v2.0/reference/api-usage#sending-files",
                                          "type": "string"
                                        },
                                        "content_type": {
                                          "description": "<a href=\"https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types\">MIME type</a> of the file.",
                                          "type": "string"
                                        },
                                        "filename": {
                                          "description": "Name of the file (including extension).",
                                          "type": "string"
                                        },
                                        "metadata": {
                                          "description": "Metadata of the the file.",
                                          "type": "object",
                                          "properties": {
                                            "duration": {
                                              "description": "Duration of the media file.",
                                              "type": "number"
                                            }
                                          }
                                        },
                                        "send_mode": {
                                          "description": "Defines how the attachment should be sent, if the provider supports multiple modes.\n            Omitted: use the provider’s native default behavior.\n            - `file` send as a regular uploaded file.\n            - `native` send as a native media (displayed picture, voice note, recorded video, etc.)",
                                          "default": "native",
                                          "type": "string",
                                          "enum": [
                                            "file",
                                            "native"
                                          ]
                                        },
                                        "voice_note": {
                                          "description": "Deprecated compatibility flag for audio attachments. Use `send_mode: \"native\"` instead.",
                                          "deprecated": true,
                                          "type": "boolean"
                                        }
                                      }
                                    }
                                  },
                                  "scheduled_for": {
                                    "description": "The time frame within which to send the message.",
                                    "anyOf": [
                                      {
                                        "title": "Days based",
                                        "type": "object",
                                        "required": [
                                          "days"
                                        ],
                                        "properties": {
                                          "days": {
                                            "description": "Days from now to send the message.",
                                            "minimum": 3,
                                            "maximum": 28,
                                            "type": "number"
                                          },
                                          "timezone": {
                                            "description": "The time zone from which the message is scheduled (e.g. 'Europe/Paris', 'America/Phoenix'...).",
                                            "default": "Your browser time zone.",
                                            "type": "string"
                                          }
                                        }
                                      },
                                      {
                                        "title": "Weeks based",
                                        "type": "object",
                                        "required": [
                                          "weeks"
                                        ],
                                        "properties": {
                                          "weeks": {
                                            "description": "Weeks from now to send the message.",
                                            "minimum": 1,
                                            "maximum": 4,
                                            "type": "number"
                                          },
                                          "timezone": {
                                            "description": "The time zone from which the message is scheduled (e.g. 'Europe/Paris', 'America/Phoenix'...).",
                                            "default": "Your browser time zone.",
                                            "type": "string"
                                          }
                                        }
                                      }
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
            "name": "inbox_id",
            "required": true,
            "description": "ID of the Inbox to start the Chat in. Use <a href=\"https://developer.unipile.com/v2.0/reference/getinboxeslist\">List all Inboxes</a> to get the ID of an inbox."
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
            "name": "Start chat from inbox",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipileMessaging } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipileMessaging = new UnipileMessaging({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipileMessaging.startChatFromInbox(\n  {\n    path: {\n      inbox_id: 'inbox_id',\n      account_id: ACCOUNT_ID,\n    },\n    body: {\n      text: 'Hello, world!',\n      users_ids: ['user_id'],\n    },\n  }\n);"
          },
          {
            "name": "Start chat from inbox",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    messaging_api = unipile.MessagingApi(api_client)\n\nresponse = messaging_api.start_chat_from_inbox(\n    'inbox_id',\n    ACCOUNT_ID,\n    {\n    'text': 'Hello, world!',\n    'users_ids': ['user_id'],\n  }\n)"
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
                    "chat_id",
                    "message_id"
                  ],
                  "properties": {
                    "object": {
                      "type": "string",
                      "enum": [
                        "ChatStarted"
                      ]
                    },
                    "chat_id": {
                      "description": "The ID of the started chat.",
                      "type": "string"
                    },
                    "message_id": {
                      "description": "The ID of the message sent. Some providers send attachments separately from the text content, which can result in multiple sent message IDs. If no message was sent, the value is `null`.",
                      "anyOf": [
                        {
                          "type": "null"
                        },
                        {
                          "type": "string"
                        },
                        {
                          "type": "array",
                          "items": {
                            "type": "string"
                          }
                        }
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