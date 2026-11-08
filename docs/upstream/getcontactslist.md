---
updatedAt: 2026-08-27T09:49:50.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# List contacts

Returns a list of contacts for the connected account. Served by the email provider for email accounts and by the messaging provider for messaging accounts (e.g. WhatsApp). On providers where a contact is an overlay over a user, the contact carries the account owner's chosen name while the nested `user` object carries the user's own identity.

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
    },
    {
      "name": "Emails",
      "description": "Emails management"
    }
  ],
  "paths": {
    "/v2/{account_id}/contacts": {
      "get": {
        "operationId": "getContactsList",
        "summary": "List contacts",
        "tags": [
          "Emails",
          "Messaging"
        ],
        "description": "Returns a list of contacts for the connected account. Served by the email provider for email accounts and by the messaging provider for messaging accounts (e.g. WhatsApp). On providers where a contact is an overlay over a user, the contact carries the account owner's chosen name while the nested `user` object carries the user's own identity.",
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
              "type": "string"
            },
            "in": "path",
            "name": "account_id",
            "required": true
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
                          "id"
                        ],
                        "properties": {
                          "object": {
                            "description": "Object type identifier, always \"Contact\".",
                            "type": "string",
                            "enum": [
                              "Contact"
                            ]
                          },
                          "id": {
                            "description": "Unique identifier of the contact.",
                            "type": "string"
                          },
                          "user": {
                            "description": "For Messaging/Social Providers, the underlying provider user represented by this contact.",
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
                                "description": "Provider-specific user data."
                              }
                            }
                          },
                          "public_picture_url": {
                            "format": "uri",
                            "description": "Public URL of the profile picture of the contact.",
                            "type": "string"
                          },
                          "private_picture_download_url": {
                            "format": "uri",
                            "description": "Private URL to download the profile picture of the contact. This URL requires authentication.",
                            "type": "string"
                          },
                          "picture_url": {
                            "deprecated": true,
                            "description": "URL of the profile picture of the contact. Use public_picture_url or private_picture_download_url instead.",
                            "type": "string"
                          },
                          "first_name": {
                            "description": "First name of the contact.",
                            "type": "string"
                          },
                          "middle_name": {
                            "description": "Middle name of the contact.",
                            "type": "string"
                          },
                          "last_name": {
                            "description": "Last name of the contact.",
                            "type": "string"
                          },
                          "display_name": {
                            "description": "Display name of the contact. This is used if first/middle/last name cannot be determined.",
                            "type": "string"
                          },
                          "suffix": {
                            "description": "Name suffix (e.g. Jr., Sr., PhD).",
                            "type": "string"
                          },
                          "birth_date": {
                            "description": "Birth date of the user.",
                            "type": "string"
                          },
                          "company_name": {
                            "description": "Name of the company the contact works for.",
                            "type": "string"
                          },
                          "job_title": {
                            "description": "Job title or position of the contact.",
                            "type": "string"
                          },
                          "manager_name": {
                            "description": "Name of the contact's manager.",
                            "type": "string"
                          },
                          "office_location": {
                            "description": "Office location or building of the contact.",
                            "type": "string"
                          },
                          "notes": {
                            "description": "Free-text notes associated with the contact.",
                            "type": "string"
                          },
                          "emails": {
                            "description": "List of user email addresses.",
                            "type": "array",
                            "items": {
                              "type": "string"
                            }
                          },
                          "phone_numbers": {
                            "description": "List of user phone numbers.",
                            "type": "array",
                            "items": {
                              "type": "string"
                            }
                          },
                          "social_handles": {
                            "description": "List of user social handles.",
                            "type": "object",
                            "properties": {
                              "linkedin": {
                                "type": "object",
                                "properties": {
                                  "url": {
                                    "description": "The url of the user profile",
                                    "type": "string"
                                  },
                                  "name": {
                                    "description": "The name of the user on the social media",
                                    "type": "string"
                                  }
                                }
                              },
                              "instagram": {
                                "type": "object",
                                "properties": {
                                  "url": {
                                    "description": "The url of the user profile",
                                    "type": "string"
                                  },
                                  "name": {
                                    "description": "The name of the user on the social media",
                                    "type": "string"
                                  }
                                }
                              },
                              "github": {
                                "type": "object",
                                "properties": {
                                  "url": {
                                    "description": "The url of the user profile",
                                    "type": "string"
                                  },
                                  "name": {
                                    "description": "The name of the user on the social media",
                                    "type": "string"
                                  }
                                }
                              },
                              "facebook": {
                                "type": "object",
                                "properties": {
                                  "url": {
                                    "description": "The url of the user profile",
                                    "type": "string"
                                  },
                                  "name": {
                                    "description": "The name of the user on the social media",
                                    "type": "string"
                                  }
                                }
                              },
                              "x": {
                                "type": "object",
                                "properties": {
                                  "url": {
                                    "description": "The url of the user profile",
                                    "type": "string"
                                  },
                                  "name": {
                                    "description": "The name of the user on the social media",
                                    "type": "string"
                                  }
                                }
                              },
                              "threads": {
                                "type": "object",
                                "properties": {
                                  "url": {
                                    "description": "The url of the user profile",
                                    "type": "string"
                                  },
                                  "name": {
                                    "description": "The name of the user on the social media",
                                    "type": "string"
                                  }
                                }
                              },
                              "tiktok": {
                                "type": "object",
                                "properties": {
                                  "url": {
                                    "description": "The url of the user profile",
                                    "type": "string"
                                  },
                                  "name": {
                                    "description": "The name of the user on the social media",
                                    "type": "string"
                                  }
                                }
                              },
                              "wechat": {
                                "type": "object",
                                "properties": {
                                  "url": {
                                    "description": "The url of the user profile",
                                    "type": "string"
                                  },
                                  "name": {
                                    "description": "The name of the user on the social media",
                                    "type": "string"
                                  }
                                }
                              },
                              "gtalk": {
                                "type": "object",
                                "properties": {
                                  "url": {
                                    "description": "The url of the user profile",
                                    "type": "string"
                                  },
                                  "name": {
                                    "description": "The name of the user on the social media",
                                    "type": "string"
                                  }
                                }
                              },
                              "qq": {
                                "type": "object",
                                "properties": {
                                  "url": {
                                    "description": "The url of the user profile",
                                    "type": "string"
                                  },
                                  "name": {
                                    "description": "The name of the user on the social media",
                                    "type": "string"
                                  }
                                }
                              },
                              "skype": {
                                "type": "object",
                                "properties": {
                                  "url": {
                                    "description": "The url of the user profile",
                                    "type": "string"
                                  },
                                  "name": {
                                    "description": "The name of the user on the social media",
                                    "type": "string"
                                  }
                                }
                              },
                              "icq": {
                                "type": "object",
                                "properties": {
                                  "url": {
                                    "description": "The url of the user profile",
                                    "type": "string"
                                  },
                                  "name": {
                                    "description": "The name of the user on the social media",
                                    "type": "string"
                                  }
                                }
                              },
                              "xmpp": {
                                "type": "object",
                                "properties": {
                                  "url": {
                                    "description": "The url of the user profile",
                                    "type": "string"
                                  },
                                  "name": {
                                    "description": "The name of the user on the social media",
                                    "type": "string"
                                  }
                                }
                              },
                              "sip": {
                                "type": "object",
                                "properties": {
                                  "url": {
                                    "description": "The url of the user profile",
                                    "type": "string"
                                  },
                                  "name": {
                                    "description": "The name of the user on the social media",
                                    "type": "string"
                                  }
                                }
                              },
                              "yahoo": {
                                "type": "object",
                                "properties": {
                                  "url": {
                                    "description": "The url of the user profile",
                                    "type": "string"
                                  },
                                  "name": {
                                    "description": "The name of the user on the social media",
                                    "type": "string"
                                  }
                                }
                              },
                              "aim": {
                                "type": "object",
                                "properties": {
                                  "url": {
                                    "description": "The url of the user profile",
                                    "type": "string"
                                  },
                                  "name": {
                                    "description": "The name of the user on the social media",
                                    "type": "string"
                                  }
                                }
                              },
                              "jabber": {
                                "type": "object",
                                "properties": {
                                  "url": {
                                    "description": "The url of the user profile",
                                    "type": "string"
                                  },
                                  "name": {
                                    "description": "The name of the user on the social media",
                                    "type": "string"
                                  }
                                }
                              },
                              "msn": {
                                "type": "object",
                                "properties": {
                                  "url": {
                                    "description": "The url of the user profile",
                                    "type": "string"
                                  },
                                  "name": {
                                    "description": "The name of the user on the social media",
                                    "type": "string"
                                  }
                                }
                              },
                              "netmeeting": {
                                "type": "object",
                                "properties": {
                                  "url": {
                                    "description": "The url of the user profile",
                                    "type": "string"
                                  },
                                  "name": {
                                    "description": "The name of the user on the social media",
                                    "type": "string"
                                  }
                                }
                              },
                              "googletalk": {
                                "type": "object",
                                "properties": {
                                  "url": {
                                    "description": "The url of the user profile",
                                    "type": "string"
                                  },
                                  "name": {
                                    "description": "The name of the user on the social media",
                                    "type": "string"
                                  }
                                }
                              }
                            }
                          },
                          "addresses": {
                            "description": "List of physical addresses associated with the contact.",
                            "type": "array",
                            "items": {
                              "type": "object",
                              "required": [
                                "city",
                                "country",
                                "postal_code",
                                "state",
                                "street_address",
                                "type"
                              ],
                              "properties": {
                                "city": {
                                  "description": "City of the physical address.",
                                  "type": "string"
                                },
                                "country": {
                                  "description": "Country of the physical address.",
                                  "type": "string"
                                },
                                "postal_code": {
                                  "description": "Postal or ZIP code of the physical address.",
                                  "type": "string"
                                },
                                "state": {
                                  "description": "State or province of the physical address.",
                                  "type": "string"
                                },
                                "street_address": {
                                  "description": "Street address line.",
                                  "type": "string"
                                },
                                "type": {
                                  "description": "Type of address (e.g. personal, business, other).",
                                  "type": "string"
                                }
                              }
                            }
                          },
                          "websites": {
                            "description": "List of user websites.",
                            "type": "array",
                            "items": {
                              "type": "string"
                            }
                          },
                          "groups": {
                            "description": "List of groups the contact belongs to.",
                            "type": "array",
                            "items": {
                              "type": "object",
                              "required": [
                                "id"
                              ],
                              "properties": {
                                "id": {
                                  "description": "Identifier of a group the contact belongs to.",
                                  "type": "string"
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