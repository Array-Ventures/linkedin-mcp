---
updatedAt: 2026-04-24T15:33:11.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Perform Classic Search from URL

Returns a list of results from a LinkedIn Classic search URL.

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
      "name": "LinkedIn",
      "description": "Specific LinkedIn methods"
    }
  ],
  "paths": {
    "/v2/{account_id}/linkedin/search": {
      "post": {
        "operationId": "performClassicSearchFromUrl",
        "summary": "Perform Classic Search from URL",
        "tags": [
          "LinkedIn"
        ],
        "description": "Returns a list of results from a LinkedIn Classic search URL.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "additionalProperties": false,
                "type": "object",
                "required": [
                  "url"
                ],
                "properties": {
                  "url": {
                    "description": "The URL to perform the search from.",
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
              "type": "number"
            },
            "in": "query",
            "name": "offset",
            "required": false,
            "description": "An offset used for pagination."
          },
          {
            "schema": {
              "minimum": 1,
              "maximum": 100,
              "type": "number"
            },
            "in": "query",
            "name": "limit",
            "required": false,
            "description": "The maximum number of items to return. Sales Navigator and Recruiter support up to 100 results. For Classic searches, People and Companies are limited to 10 results per page, while Jobs are limited to 50. Post searches default to 3 results, matching LinkedIn's UI, but the limit can technically be increased up to 49."
          },
          {
            "schema": {
              "type": "string"
            },
            "in": "query",
            "name": "cursor",
            "required": false,
            "description": "A cursor used for pagination. Use `next_cursor` given by the previous page of the list."
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
            "name": "Perform classic search from url",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipileLinkedIn } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipileLinkedIn = new UnipileLinkedIn({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipileLinkedIn.performClassicSearchFromUrl(\n  {\n    path: {\n      account_id: ACCOUNT_ID,\n    },\n    body: {\n      url: 'https://myapp.com/callback',\n    },\n  }\n);"
          },
          {
            "name": "Perform classic search from url",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    linked_in_api = unipile.LinkedInApi(api_client)\n\nresponse = linked_in_api.perform_classic_search_from_url(\n    ACCOUNT_ID,\n    {\n    'url': 'https://myapp.com/callback',\n  }\n)"
          }
        ],
        "responses": {
          "200": {
            "description": "Default Response",
            "content": {
              "application/json": {
                "schema": {
                  "anyOf": [
                    {
                      "title": "People search results",
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
                              "display_name",
                              "network_distance",
                              "product"
                            ],
                            "properties": {
                              "object": {
                                "type": "string",
                                "enum": [
                                  "PeopleSearchResult"
                                ]
                              },
                              "id": {
                                "description": "The ID of the user.",
                                "type": "string"
                              },
                              "member_id": {
                                "description": "The LinkedIn internal member ID of the user.",
                                "type": "string"
                              },
                              "display_name": {
                                "description": "The display name of the User.",
                                "type": "string"
                              },
                              "public_identifier": {
                                "description": "The public identifier of the User.",
                                "type": "string"
                              },
                              "profile_url": {
                                "description": "The profile URL of the User.",
                                "type": "string"
                              },
                              "public_picture_url": {
                                "description": "The public picture URL of the User.",
                                "type": "string"
                              },
                              "public_picture_url_large": {
                                "description": "The public picture URL of the User in large size.",
                                "type": "string"
                              },
                              "relations_count": {
                                "description": "The number of relations of the User.",
                                "type": "number"
                              },
                              "location": {
                                "description": "The location of the User.",
                                "type": "string"
                              },
                              "headline": {
                                "description": "The headline of the User.",
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
                              "can_send_inmail": {
                                "description": "Whether it is possible to send an inMail to this User.",
                                "type": "boolean"
                              },
                              "product": {
                                "type": "string",
                                "enum": [
                                  "classic"
                                ]
                              },
                              "followers_count": {
                                "description": "The number of the followers of the User.",
                                "type": "number"
                              },
                              "industry": {
                                "description": "The industry to which the User belongs.",
                                "type": "string"
                              },
                              "is_verified": {
                                "description": "Whether the User has a verified account.",
                                "type": "boolean"
                              },
                              "keywords_match": {
                                "description": "The search terms that produced this result.",
                                "type": "string"
                              },
                              "is_premium": {
                                "description": "Whether the User has a premium account.",
                                "type": "boolean"
                              },
                              "is_open_profile": {
                                "description": "Whether the User has an Open Profile. The Open Profile feature allows anyone on LinkedIn to contact a Premium member for free.",
                                "type": "boolean"
                              },
                              "shared_relations_count": {
                                "description": "The number of relations that you share with the User.",
                                "type": "number"
                              },
                              "website_url": {
                                "description": "The URL of the website provided by the User.",
                                "type": "string"
                              },
                              "portfolio_url": {
                                "description": "The URL of the portfolio provided by the User.",
                                "type": "string"
                              },
                              "services_page_url": {
                                "description": "The LinkedIn internal URL of the User's services page.",
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
                    },
                    {
                      "title": "Companies search results",
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
                              "display_name",
                              "product"
                            ],
                            "properties": {
                              "object": {
                                "type": "string",
                                "enum": [
                                  "CompanySearchResult"
                                ]
                              },
                              "id": {
                                "description": "The ID of the Company.",
                                "type": "string"
                              },
                              "display_name": {
                                "description": "The display name of the Company.",
                                "type": "string"
                              },
                              "public_identifier": {
                                "description": "The public identifier of the Company.",
                                "type": "string"
                              },
                              "profile_url": {
                                "description": "The profile URL of the Company.",
                                "type": "string"
                              },
                              "public_picture_url": {
                                "description": "The public picture URL of the Company.",
                                "type": "string"
                              },
                              "public_picture_url_large": {
                                "description": "The public picture URL of the Company in large size.",
                                "type": "string"
                              },
                              "location": {
                                "description": "The location of the Company.",
                                "type": "string"
                              },
                              "industry": {
                                "description": "The industry to which the Company belongs.",
                                "type": "string"
                              },
                              "summary": {
                                "description": "The summary of the Company's activities.",
                                "type": "string"
                              },
                              "relations_count": {
                                "description": "The number of the relations of the Company.",
                                "type": "number"
                              },
                              "product": {
                                "type": "string",
                                "enum": [
                                  "classic"
                                ]
                              },
                              "job_postings_count": {
                                "description": "The number of job postings published by the Company.",
                                "type": "number"
                              },
                              "followers_count": {
                                "description": "The number of the followers of the Company.",
                                "type": "number"
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
                    },
                    {
                      "title": "Jobs search results",
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
                              "title",
                              "url",
                              "is_repost",
                              "is_promoted",
                              "easy_apply",
                              "few_applicants",
                              "company",
                              "insights"
                            ],
                            "properties": {
                              "object": {
                                "type": "string",
                                "enum": [
                                  "JobSearchResult"
                                ]
                              },
                              "id": {
                                "description": "The ID of the Job posting.",
                                "type": "string"
                              },
                              "title": {
                                "description": "The title of the Job posting.",
                                "type": "string"
                              },
                              "location": {
                                "description": "The location of the Job posting.",
                                "type": "string"
                              },
                              "listed_at": {
                                "description": "The creation date of the Job posting. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                                "type": "string"
                              },
                              "workplace_type": {
                                "description": "The type of workplace of the Job posting.",
                                "type": "string",
                                "enum": [
                                  "on_site",
                                  "remote",
                                  "hybrid"
                                ]
                              },
                              "url": {
                                "description": "The URL of the Job posting.",
                                "type": "string"
                              },
                              "is_repost": {
                                "description": "Whether the Job posting is a repost.",
                                "type": "boolean"
                              },
                              "is_promoted": {
                                "description": "Whether the Job posting has been promoted.",
                                "type": "boolean"
                              },
                              "easy_apply": {
                                "description": "Whether applicants are allowed to apply to the Job posting directly on LinkedIn.",
                                "type": "boolean"
                              },
                              "few_applicants": {
                                "description": "Whether the Job posting received a limited number of applications.",
                                "type": "boolean"
                              },
                              "company": {
                                "description": "The company that published the Job posting.",
                                "type": "object",
                                "required": [
                                  "name"
                                ],
                                "properties": {
                                  "id": {
                                    "description": "The ID of the Company.",
                                    "type": "string"
                                  },
                                  "name": {
                                    "description": "The name of the Company.",
                                    "type": "string"
                                  },
                                  "public_identifier": {
                                    "description": "The public identifier of the Company.",
                                    "type": "string"
                                  },
                                  "profile_url": {
                                    "description": "The profile URL of the Company.",
                                    "type": "string"
                                  },
                                  "public_picture_url": {
                                    "description": "The profile picture URL of the Company.",
                                    "type": "string"
                                  }
                                }
                              },
                              "insights": {
                                "description": "A list of insights about the Job posting.",
                                "type": "array",
                                "items": {
                                  "type": "string"
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
                    },
                    {
                      "title": "Posts search results",
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
                              "share_url",
                              "created_at",
                              "text",
                              "author",
                              "user_reacted",
                              "permissions",
                              "reactions_counter",
                              "comments_counter",
                              "reposts_counter",
                              "attachments",
                              "is_repost"
                            ],
                            "properties": {
                              "object": {
                                "type": "string",
                                "enum": [
                                  "PostSearchResult"
                                ]
                              },
                              "id": {
                                "description": "The ID of the post for the provider.",
                                "type": "string"
                              },
                              "share_url": {
                                "description": "The URL to share the post.",
                                "type": "string"
                              },
                              "created_at": {
                                "description": "The creation date of the post. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                                "type": "string"
                              },
                              "title": {
                                "description": "The title of the post.",
                                "type": "string"
                              },
                              "text": {
                                "description": "The text content of the post.",
                                "type": "string"
                              },
                              "author": {
                                "description": "The author of the post.",
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
                              "user_reacted": {
                                "description": "If the account owner has reacted to this post, the value of the reaction (emoji unicode or reaction type), `true` if no details on the reaction, else `false`.",
                                "anyOf": [
                                  {
                                    "type": "boolean"
                                  },
                                  {
                                    "type": "string"
                                  }
                                ]
                              },
                              "permissions": {
                                "description": "The permissions for the account owner on the post.",
                                "type": "object",
                                "required": [
                                  "can_share",
                                  "can_react",
                                  "can_post_comments"
                                ],
                                "properties": {
                                  "can_share": {
                                    "description": "Whether the account owner can share the post.",
                                    "type": "boolean"
                                  },
                                  "can_react": {
                                    "description": "Whether the account owner can react to the post.",
                                    "type": "boolean"
                                  },
                                  "can_post_comments": {
                                    "description": "Whether the account owner can comment on the post.",
                                    "type": "boolean"
                                  }
                                }
                              },
                              "reactions_counter": {
                                "description": "The counter of reactions to the post. `null` if counter is hidden.",
                                "anyOf": [
                                  {
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
                                  {
                                    "type": "null"
                                  }
                                ]
                              },
                              "comments_counter": {
                                "description": "The number of comments to the post. `null` if counter is hidden.",
                                "anyOf": [
                                  {
                                    "type": "number"
                                  },
                                  {
                                    "type": "null"
                                  }
                                ]
                              },
                              "reposts_counter": {
                                "description": "The number of reposts of the post. `null` if counter is hidden.",
                                "anyOf": [
                                  {
                                    "type": "number"
                                  },
                                  {
                                    "type": "null"
                                  }
                                ]
                              },
                              "poll": {
                                "description": "Data about the poll if the post is a poll.",
                                "type": "object",
                                "required": [
                                  "id",
                                  "total_votes_count",
                                  "question",
                                  "is_open",
                                  "options"
                                ],
                                "properties": {
                                  "id": {
                                    "description": "The ID of the poll.",
                                    "type": "string"
                                  },
                                  "total_votes_count": {
                                    "description": "The total number of votes for the poll.",
                                    "type": "number"
                                  },
                                  "question": {
                                    "description": "The question of the poll.",
                                    "type": "string"
                                  },
                                  "is_open": {
                                    "description": "Whether the poll is open. If the poll is closed, the user can only see the results.",
                                    "type": "boolean"
                                  },
                                  "options": {
                                    "type": "array",
                                    "items": {
                                      "type": "object",
                                      "required": [
                                        "id",
                                        "text",
                                        "win",
                                        "votes_count"
                                      ],
                                      "properties": {
                                        "id": {
                                          "description": "The ID of the option.",
                                          "type": "string"
                                        },
                                        "text": {
                                          "description": "The displayed text of the option.",
                                          "type": "string"
                                        },
                                        "win": {
                                          "description": "Whether the option is the winning option.",
                                          "type": "boolean"
                                        },
                                        "votes_count": {
                                          "description": "The number of votes for this option.",
                                          "type": "number"
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              "event": {
                                "description": "Data about the event if the post is an event.",
                                "type": "object",
                                "required": [
                                  "id",
                                  "name",
                                  "online"
                                ],
                                "properties": {
                                  "id": {
                                    "description": "The ID of the event.",
                                    "type": "string"
                                  },
                                  "name": {
                                    "description": "The name of the event.",
                                    "type": "string"
                                  },
                                  "url": {
                                    "description": "The link to the event.",
                                    "type": "string"
                                  },
                                  "online": {
                                    "description": "Whether the event is an online event.",
                                    "type": "boolean"
                                  },
                                  "location": {
                                    "description": "The location of the event.",
                                    "type": "string"
                                  },
                                  "description": {
                                    "description": "The description of the event.",
                                    "type": "string"
                                  },
                                  "public_picture_url": {
                                    "format": "uri",
                                    "description": "Public url to the picture of the event.",
                                    "type": "string"
                                  },
                                  "starts_on": {
                                    "description": "The date when the event will start. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                                    "type": "string"
                                  },
                                  "ends_on": {
                                    "description": "The date when the event will end. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                                    "type": "string"
                                  }
                                }
                              },
                              "attachments": {
                                "description": "List of post attachments.",
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
                              "analytics": {
                                "description": "Analytics data of the post.",
                                "type": "object",
                                "properties": {
                                  "impressions_counter": {
                                    "description": "The number of impressions of the post.",
                                    "type": "number"
                                  },
                                  "engagements_counter": {
                                    "description": "The number of engagements of the post.",
                                    "type": "number"
                                  },
                                  "engagement_rate": {
                                    "description": "The engagement rate of the post.",
                                    "type": "number"
                                  },
                                  "clicks_counter": {
                                    "description": "The number of clicks of the post.",
                                    "type": "number"
                                  },
                                  "clickthrough_rate": {
                                    "description": "The clickthrough rate of the post.",
                                    "type": "number"
                                  },
                                  "page_viewers_from_this_post_counter": {
                                    "description": "The number of page viewers from this post.",
                                    "type": "number"
                                  },
                                  "followers_gained_from_this_post_counter": {
                                    "description": "The number of followers gained from this post.",
                                    "type": "number"
                                  },
                                  "users_reached_counter": {
                                    "description": "The number of users reached from this post.",
                                    "type": "number"
                                  }
                                }
                              },
                              "specifics": {
                                "description": "Object containing provider-specific post data."
                              },
                              "is_repost": {
                                "description": "`true` if this post is reposted by someone without quote. Quoted post does not qualify as a repost.",
                                "type": "boolean"
                              },
                              "reposted_by": {
                                "description": "The user who reposted the post if `is_repost` is `true`.",
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
                              "quoted_post": {
                                "description": "The post that is quoted in this post.",
                                "type": "object",
                                "required": [
                                  "object",
                                  "id",
                                  "share_url",
                                  "created_at",
                                  "text",
                                  "author",
                                  "user_reacted",
                                  "permissions",
                                  "reactions_counter",
                                  "comments_counter",
                                  "reposts_counter",
                                  "attachments"
                                ],
                                "properties": {
                                  "object": {
                                    "type": "string",
                                    "enum": [
                                      "Post"
                                    ]
                                  },
                                  "id": {
                                    "description": "The ID of the post for the provider.",
                                    "type": "string"
                                  },
                                  "share_url": {
                                    "description": "The URL to share the post.",
                                    "type": "string"
                                  },
                                  "created_at": {
                                    "description": "The creation date of the post. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                                    "type": "string"
                                  },
                                  "title": {
                                    "description": "The title of the post.",
                                    "type": "string"
                                  },
                                  "text": {
                                    "description": "The text content of the post.",
                                    "type": "string"
                                  },
                                  "author": {
                                    "description": "The author of the post.",
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
                                  "user_reacted": {
                                    "description": "If the account owner has reacted to this post, the value of the reaction (emoji unicode or reaction type), `true` if no details on the reaction, else `false`.",
                                    "anyOf": [
                                      {
                                        "type": "boolean"
                                      },
                                      {
                                        "type": "string"
                                      }
                                    ]
                                  },
                                  "permissions": {
                                    "description": "The permissions for the account owner on the post.",
                                    "type": "object",
                                    "required": [
                                      "can_share",
                                      "can_react",
                                      "can_post_comments"
                                    ],
                                    "properties": {
                                      "can_share": {
                                        "description": "Whether the account owner can share the post.",
                                        "type": "boolean"
                                      },
                                      "can_react": {
                                        "description": "Whether the account owner can react to the post.",
                                        "type": "boolean"
                                      },
                                      "can_post_comments": {
                                        "description": "Whether the account owner can comment on the post.",
                                        "type": "boolean"
                                      }
                                    }
                                  },
                                  "reactions_counter": {
                                    "description": "The counter of reactions to the post. `null` if counter is hidden.",
                                    "anyOf": [
                                      {
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
                                      {
                                        "type": "null"
                                      }
                                    ]
                                  },
                                  "comments_counter": {
                                    "description": "The number of comments to the post. `null` if counter is hidden.",
                                    "anyOf": [
                                      {
                                        "type": "number"
                                      },
                                      {
                                        "type": "null"
                                      }
                                    ]
                                  },
                                  "reposts_counter": {
                                    "description": "The number of reposts of the post. `null` if counter is hidden.",
                                    "anyOf": [
                                      {
                                        "type": "number"
                                      },
                                      {
                                        "type": "null"
                                      }
                                    ]
                                  },
                                  "poll": {
                                    "description": "Data about the poll if the post is a poll.",
                                    "type": "object",
                                    "required": [
                                      "id",
                                      "total_votes_count",
                                      "question",
                                      "is_open",
                                      "options"
                                    ],
                                    "properties": {
                                      "id": {
                                        "description": "The ID of the poll.",
                                        "type": "string"
                                      },
                                      "total_votes_count": {
                                        "description": "The total number of votes for the poll.",
                                        "type": "number"
                                      },
                                      "question": {
                                        "description": "The question of the poll.",
                                        "type": "string"
                                      },
                                      "is_open": {
                                        "description": "Whether the poll is open. If the poll is closed, the user can only see the results.",
                                        "type": "boolean"
                                      },
                                      "options": {
                                        "type": "array",
                                        "items": {
                                          "type": "object",
                                          "required": [
                                            "id",
                                            "text",
                                            "win",
                                            "votes_count"
                                          ],
                                          "properties": {
                                            "id": {
                                              "description": "The ID of the option.",
                                              "type": "string"
                                            },
                                            "text": {
                                              "description": "The displayed text of the option.",
                                              "type": "string"
                                            },
                                            "win": {
                                              "description": "Whether the option is the winning option.",
                                              "type": "boolean"
                                            },
                                            "votes_count": {
                                              "description": "The number of votes for this option.",
                                              "type": "number"
                                            }
                                          }
                                        }
                                      }
                                    }
                                  },
                                  "event": {
                                    "description": "Data about the event if the post is an event.",
                                    "type": "object",
                                    "required": [
                                      "id",
                                      "name",
                                      "online"
                                    ],
                                    "properties": {
                                      "id": {
                                        "description": "The ID of the event.",
                                        "type": "string"
                                      },
                                      "name": {
                                        "description": "The name of the event.",
                                        "type": "string"
                                      },
                                      "url": {
                                        "description": "The link to the event.",
                                        "type": "string"
                                      },
                                      "online": {
                                        "description": "Whether the event is an online event.",
                                        "type": "boolean"
                                      },
                                      "location": {
                                        "description": "The location of the event.",
                                        "type": "string"
                                      },
                                      "description": {
                                        "description": "The description of the event.",
                                        "type": "string"
                                      },
                                      "public_picture_url": {
                                        "format": "uri",
                                        "description": "Public url to the picture of the event.",
                                        "type": "string"
                                      },
                                      "starts_on": {
                                        "description": "The date when the event will start. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                                        "type": "string"
                                      },
                                      "ends_on": {
                                        "description": "The date when the event will end. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                                        "type": "string"
                                      }
                                    }
                                  },
                                  "attachments": {
                                    "description": "List of post attachments.",
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
                                  "analytics": {
                                    "description": "Analytics data of the post.",
                                    "type": "object",
                                    "properties": {
                                      "impressions_counter": {
                                        "description": "The number of impressions of the post.",
                                        "type": "number"
                                      },
                                      "engagements_counter": {
                                        "description": "The number of engagements of the post.",
                                        "type": "number"
                                      },
                                      "engagement_rate": {
                                        "description": "The engagement rate of the post.",
                                        "type": "number"
                                      },
                                      "clicks_counter": {
                                        "description": "The number of clicks of the post.",
                                        "type": "number"
                                      },
                                      "clickthrough_rate": {
                                        "description": "The clickthrough rate of the post.",
                                        "type": "number"
                                      },
                                      "page_viewers_from_this_post_counter": {
                                        "description": "The number of page viewers from this post.",
                                        "type": "number"
                                      },
                                      "followers_gained_from_this_post_counter": {
                                        "description": "The number of followers gained from this post.",
                                        "type": "number"
                                      },
                                      "users_reached_counter": {
                                        "description": "The number of users reached from this post.",
                                        "type": "number"
                                      }
                                    }
                                  },
                                  "specifics": {
                                    "description": "Object containing provider-specific post data."
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
                  ]
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