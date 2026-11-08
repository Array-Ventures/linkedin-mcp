---
updatedAt: 2026-04-24T15:33:11.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# List all Folders

Returns a list of folders in the account mailbox.

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
    "/v2/{account_id}/folders": {
      "get": {
        "operationId": "getFoldersList",
        "summary": "List all Folders",
        "tags": [
          "Emails"
        ],
        "description": "Returns a list of folders in the account mailbox.",
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
            "name": "Get folders list",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipileEmails } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipileEmails = new UnipileEmails({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipileEmails.getFoldersList(\n  {\n    path: {\n      account_id: ACCOUNT_ID,\n    },\n  }\n);"
          },
          {
            "name": "Get folders list",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    emails_api = unipile.EmailsApi(api_client)\n\nresponse = emails_api.get_folders_list(\n    ACCOUNT_ID\n)"
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
                          "total_count",
                          "unread_count"
                        ],
                        "properties": {
                          "object": {
                            "type": "string",
                            "enum": [
                              "EmailFolder"
                            ]
                          },
                          "id": {
                            "description": "The ID of the folder for the provider.",
                            "type": "string"
                          },
                          "name": {
                            "description": "The name of the folder.",
                            "type": "string"
                          },
                          "role": {
                            "description": "The folder role represents a supported special-use purpose (based on RFC special-use attributes where applicable); it does not indicate whether the folder is system-created. Gmail can expose system labels beyond the RFC special-use list: these have is_system=true but no role when they do not map to a supported special-use purpose, such as CATEGORY_* labels. For those Gmail labels, use the label ID or name. Outlook supports INBOX, SENT, DRAFTS, TRASH, SPAM, and ARCHIVE for its corresponding default folders; custom folders have no role. [Learn more about roles](https://developer.unipile.com/v2.0/docs/manage-mailboxes#about-roles).",
                            "anyOf": [
                              {
                                "type": "string",
                                "enum": [
                                  "TRASH"
                                ]
                              },
                              {
                                "type": "string",
                                "enum": [
                                  "INBOX"
                                ]
                              },
                              {
                                "type": "string",
                                "enum": [
                                  "SENT"
                                ]
                              },
                              {
                                "type": "string",
                                "enum": [
                                  "DRAFTS"
                                ]
                              },
                              {
                                "type": "string",
                                "enum": [
                                  "JUNK"
                                ]
                              },
                              {
                                "type": "string",
                                "enum": [
                                  "ARCHIVE"
                                ]
                              },
                              {
                                "type": "string",
                                "enum": [
                                  "IMPORTANT"
                                ]
                              },
                              {
                                "type": "string",
                                "enum": [
                                  "STARRED"
                                ]
                              },
                              {
                                "type": "string",
                                "enum": [
                                  "SPAM"
                                ]
                              },
                              {
                                "type": "string",
                                "enum": [
                                  "ALL"
                                ]
                              }
                            ]
                          },
                          "total_count": {
                            "description": "The total number of emails in the folder. For Gmail, the total number of emails assigned with this label.",
                            "type": "number"
                          },
                          "unread_count": {
                            "description": "The number of unread emails in the folder. For Gmail, the number of unread emails assigned with this label.",
                            "type": "number"
                          },
                          "background_color": {
                            "description": "(Gmail Only) The background color of the folder.",
                            "type": "string"
                          },
                          "text_color": {
                            "description": "(Gmail Only) The text color of the folder.",
                            "type": "string"
                          },
                          "is_system": {
                            "description": "(Gmail Only) If `true`, the label is created by Google. If `false`, the label was created by the user.",
                            "type": "boolean"
                          },
                          "parent_id": {
                            "description": "(Outlook only) The ID of the parent folder.",
                            "type": "string"
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