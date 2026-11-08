---
updatedAt: 2026-04-24T15:33:11.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Get a Thread

Returns a list of emails belonging to the specific thread. Emails are sorted by their `date`. On IMAP servers without native thread IDs, results are inferred from message headers and may be incomplete.

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
      "name": "Emails",
      "description": "Emails management"
    }
  ],
  "paths": {
    "/v2/{account_id}/threads/{thread_id}": {
      "get": {
        "operationId": "getThread",
        "summary": "Get a Thread",
        "tags": [
          "Emails"
        ],
        "description": "Returns a list of emails belonging to the specific thread. Emails are sorted by their `date`. On IMAP servers without native thread IDs, results are inferred from message headers and may be incomplete.",
        "parameters": [
          {
            "schema": {
              "default": false,
              "type": "boolean"
            },
            "in": "query",
            "name": "meta_only",
            "required": false,
            "description": "Speed up the response by only returning the email metadata. body and body_plain are empty strings, and attachments metadata is excluded."
          },
          {
            "schema": {
              "minLength": 1,
              "type": "string"
            },
            "in": "path",
            "name": "thread_id",
            "required": true,
            "description": "ID of the thread to retrieve. For IMAP, use the thread_id returned by an email; results based on header-derived IDs may be incomplete."
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
                    "emails"
                  ],
                  "properties": {
                    "object": {
                      "type": "string",
                      "enum": [
                        "Thread"
                      ]
                    },
                    "id": {
                      "description": "The ID of the thread.",
                      "type": "string"
                    },
                    "emails": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "required": [
                          "object",
                          "id",
                          "message_id",
                          "body",
                          "body_plain",
                          "snippet",
                          "subject",
                          "headers",
                          "cc",
                          "bcc",
                          "reply_to",
                          "date",
                          "attachments",
                          "folders",
                          "is_unread"
                        ],
                        "properties": {
                          "object": {
                            "type": "string",
                            "enum": [
                              "Email"
                            ]
                          },
                          "id": {
                            "description": "The ID of the email.",
                            "type": "string"
                          },
                          "message_id": {
                            "description": "The Message-ID header value of the email. Use `id` in Unipile requests.",
                            "type": "string"
                          },
                          "thread_id": {
                            "description": "The thread identifier. For IMAP, Unipile uses the server-provided thread ID when available. Otherwise, it uses the entire References header, or In-Reply-To, or Message-ID, in that order. A header-derived value may differ between messages in the same conversation and may be absent when none of these headers exists.",
                            "type": "string"
                          },
                          "body": {
                            "description": "The complete body of the email: HTML when available, otherwise plain text. An empty string when the email has no body or meta_only=true.",
                            "type": "string"
                          },
                          "body_plain": {
                            "description": "The complete plain-text body of the email. Uses the original plain-text version when available, otherwise text converted from HTML. For Outlook, text is converted from the HTML body returned by Microsoft Graph, or taken directly from its plain-text body. An empty string when the email has no body or meta_only=true.",
                            "type": "string"
                          },
                          "snippet": {
                            "description": "A short preview of the email, not its complete plain-text body. Use body_plain for the full text.",
                            "type": "string"
                          },
                          "subject": {
                            "description": "The subject of the email.",
                            "type": "string"
                          },
                          "headers": {
                            "description": "List of headers. A single email can sometimes have multiple headers with the same key name. Unipile adds all of the headers to the headers array without merging or de-duplicating the data. When the headers contain encoded data, Unipile adds it to the headers array without decoding it.",
                            "type": "array",
                            "items": {
                              "type": "object",
                              "required": [
                                "name",
                                "value"
                              ],
                              "properties": {
                                "name": {
                                  "description": "Name of the header.",
                                  "type": "string"
                                },
                                "value": {
                                  "description": "Value of the header",
                                  "type": "string"
                                }
                              }
                            }
                          },
                          "from": {
                            "description": "The list of attendees that the email was sent from.",
                            "type": "array",
                            "items": {
                              "type": "object",
                              "required": [
                                "email"
                              ],
                              "properties": {
                                "email": {
                                  "description": "The email address of the attendee.",
                                  "type": "string"
                                },
                                "display_name": {
                                  "description": "The display name of the attendee if any.",
                                  "type": "string"
                                }
                              }
                            }
                          },
                          "to": {
                            "description": "The list of attendees that the email was sent to.",
                            "type": "array",
                            "items": {
                              "type": "object",
                              "required": [
                                "email"
                              ],
                              "properties": {
                                "email": {
                                  "description": "The email address of the attendee.",
                                  "type": "string"
                                },
                                "display_name": {
                                  "description": "The display name of the attendee if any.",
                                  "type": "string"
                                }
                              }
                            }
                          },
                          "cc": {
                            "description": "The list of attendees that the email was CC'd to. An empty array when none are available.",
                            "type": "array",
                            "items": {
                              "type": "object",
                              "required": [
                                "email"
                              ],
                              "properties": {
                                "email": {
                                  "description": "The email address of the attendee.",
                                  "type": "string"
                                },
                                "display_name": {
                                  "description": "The display name of the attendee if any.",
                                  "type": "string"
                                }
                              }
                            }
                          },
                          "bcc": {
                            "description": "The list of attendees that the email was BCC'd to. An empty array when none are available.",
                            "type": "array",
                            "items": {
                              "type": "object",
                              "required": [
                                "email"
                              ],
                              "properties": {
                                "email": {
                                  "description": "The email address of the attendee.",
                                  "type": "string"
                                },
                                "display_name": {
                                  "description": "The display name of the attendee if any.",
                                  "type": "string"
                                }
                              }
                            }
                          },
                          "reply_to": {
                            "description": "The list of attendees that the replies should be sent to. An empty array when none are available.",
                            "type": "array",
                            "items": {
                              "type": "object",
                              "required": [
                                "email"
                              ],
                              "properties": {
                                "email": {
                                  "description": "The email address of the attendee.",
                                  "type": "string"
                                },
                                "display_name": {
                                  "description": "The display name of the attendee if any.",
                                  "type": "string"
                                }
                              }
                            }
                          },
                          "date": {
                            "description": "The date the email was sent. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                            "type": "string"
                          },
                          "attachments": {
                            "description": "The attachments of the email.",
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
                          "folders": {
                            "description": "The IDs of folders the email is in. For Gmail, the IDs of labels assigned to the email, excluding the UNREAD system label, which is exposed through is_unread instead.",
                            "type": "array",
                            "items": {
                              "type": "string"
                            }
                          },
                          "categories": {
                            "description": "List of categories assigned to the email.",
                            "type": "array",
                            "items": {
                              "description": "(Outlook only) A category assigned to the email.",
                              "type": "string"
                            }
                          },
                          "is_unread": {
                            "description": "Is the email unread. For Gmail, this reflects the UNREAD system label.",
                            "type": "boolean"
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