---
updatedAt: 2026-04-24T15:33:11.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Get a Company Profile

Retrieves the specified company profile.

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
    "/v2/{account_id}/linkedin/company/{company_id}": {
      "get": {
        "operationId": "getClassicCompanyProfile",
        "summary": "Get a Company Profile",
        "tags": [
          "LinkedIn"
        ],
        "description": "Retrieves the specified company profile.",
        "parameters": [
          {
            "schema": {
              "type": "string"
            },
            "in": "path",
            "name": "company_id",
            "required": true,
            "description": "The ID of the company to retrieve the profile of."
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
            "name": "Get classic company profile",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipileLinkedIn } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipileLinkedIn = new UnipileLinkedIn({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipileLinkedIn.sendCompanyFollowInvitation(\n  {\n    path: {\n      company_id: 'company_id',\n      account_id: ACCOUNT_ID,\n    },\n    body: {\n      member_ids: ['value'],\n    },\n  }\n);"
          },
          {
            "name": "Get classic company profile",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    linked_in_api = unipile.LinkedInApi(api_client)\n\nresponse = linked_in_api.send_company_follow_invitation(\n    'company_id',\n    ACCOUNT_ID,\n    {\n    'member_ids': ['value'],\n  }\n)"
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
                    "id",
                    "name",
                    "object",
                    "is_school",
                    "is_active",
                    "is_archived",
                    "is_employee",
                    "is_verified",
                    "is_claimable",
                    "is_claimable_by_viewer",
                    "mailbox",
                    "viewer_roles",
                    "locations",
                    "industry",
                    "insights",
                    "hashtags"
                  ],
                  "properties": {
                    "id": {
                      "description": "The ID of the Company for the provider.",
                      "type": "string"
                    },
                    "name": {
                      "description": "The name of the Company.",
                      "type": "string"
                    },
                    "profile_url": {
                      "description": "The public profile URL of the Company.",
                      "type": "string"
                    },
                    "public_picture_url": {
                      "description": "The public picture URL of the Company.",
                      "type": "string"
                    },
                    "public_identifier": {
                      "description": "The public identifier of the Company.",
                      "type": "string"
                    },
                    "followers_count": {
                      "description": "The number of followers of the Company.",
                      "type": "number"
                    },
                    "is_following": {
                      "description": "Whether the current user is following the Company.",
                      "type": "boolean"
                    },
                    "object": {
                      "type": "string",
                      "enum": [
                        "CompanyProfile"
                      ]
                    },
                    "description": {
                      "description": "The description of the Company.",
                      "type": "string"
                    },
                    "tagline": {
                      "description": "The tagline of the Company.",
                      "type": "string"
                    },
                    "is_school": {
                      "description": "Whether the Company is a school.",
                      "type": "boolean"
                    },
                    "is_active": {
                      "description": "Whether the Company is currently in activity.",
                      "type": "boolean"
                    },
                    "is_archived": {
                      "description": "Whether the Company has been archived.",
                      "type": "boolean"
                    },
                    "is_employee": {
                      "description": "Whether the current user is an employee of the Company.",
                      "type": "boolean"
                    },
                    "is_verified": {
                      "description": "Whether the Company has been verified.",
                      "type": "boolean"
                    },
                    "is_claimable": {
                      "description": "Whether the Company can be claimed.",
                      "type": "boolean"
                    },
                    "is_claimable_by_viewer": {
                      "description": "Whether the Company can be claimed by the current user.",
                      "type": "boolean"
                    },
                    "verified_at": {
                      "description": "The date on which the Company was verified. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                      "type": "string"
                    },
                    "mailbox": {
                      "description": "The mailbox informations of the Company.",
                      "type": "object",
                      "required": [
                        "id",
                        "enabled"
                      ],
                      "properties": {
                        "id": {
                          "description": "The ID of the mailbox. Should be used to start a chat with the Company provided that messaging is enabled.",
                          "type": "string"
                        },
                        "enabled": {
                          "description": "Whether the Company has enabled messaging.",
                          "type": "boolean"
                        }
                      }
                    },
                    "viewer_roles": {
                      "description": "The list of roles the current user may have in the Company.",
                      "type": "array",
                      "items": {
                        "type": "object",
                        "required": [
                          "type",
                          "description"
                        ],
                        "properties": {
                          "type": {
                            "description": "The type of role.",
                            "type": "string"
                          },
                          "description": {
                            "description": "The description of the role.",
                            "type": "string"
                          }
                        }
                      }
                    },
                    "locations": {
                      "description": "The list of locations related to the Company.",
                      "type": "array",
                      "items": {
                        "type": "object",
                        "required": [
                          "is_headquarter",
                          "country_code"
                        ],
                        "properties": {
                          "is_headquarter": {
                            "description": "Whether the location is the headquarters of the Company.",
                            "type": "boolean"
                          },
                          "country_code": {
                            "description": "The country code of the location.",
                            "type": "string"
                          },
                          "city": {
                            "description": "The city of the location.",
                            "type": "string"
                          },
                          "area": {
                            "description": "The area of the location.",
                            "type": "string"
                          },
                          "postal_code": {
                            "description": "The postal code of the location.",
                            "type": "string"
                          },
                          "street": {
                            "description": "The street of the location.",
                            "type": "string"
                          },
                          "description": {
                            "description": "The description of the location.",
                            "type": "string"
                          }
                        }
                      }
                    },
                    "industry": {
                      "description": "A list of industries associated with the the Company.",
                      "type": "array",
                      "items": {
                        "type": "string"
                      }
                    },
                    "activities": {
                      "description": "The list of activities of the Company.",
                      "type": "array",
                      "items": {
                        "type": "string"
                      }
                    },
                    "website": {
                      "description": "The website URL of the Company.",
                      "type": "string"
                    },
                    "establishment_year": {
                      "description": "The year the Company was established.",
                      "type": "number"
                    },
                    "phone": {
                      "description": "The phone number of the Company.",
                      "type": "string"
                    },
                    "fields_of_expertise": {
                      "description": "The list of fields of expertise of the Company.",
                      "type": "array",
                      "items": {
                        "type": "string"
                      }
                    },
                    "acquired_by": {
                      "description": "The acquirer company. ",
                      "type": "object",
                      "required": [
                        "object",
                        "id",
                        "name"
                      ],
                      "properties": {
                        "object": {
                          "type": "string",
                          "enum": [
                            "CompanyLightProfile"
                          ]
                        },
                        "id": {
                          "description": "The ID of the Company for the provider.",
                          "type": "string"
                        },
                        "name": {
                          "description": "The name of the Company.",
                          "type": "string"
                        },
                        "profile_url": {
                          "description": "The public profile URL of the Company.",
                          "type": "string"
                        },
                        "public_picture_url": {
                          "description": "The public picture URL of the Company.",
                          "type": "string"
                        },
                        "public_identifier": {
                          "description": "The public identifier of the Company.",
                          "type": "string"
                        },
                        "followers_count": {
                          "description": "The number of followers of the Company.",
                          "type": "number"
                        },
                        "is_following": {
                          "description": "Whether the current user is following the Company.",
                          "type": "boolean"
                        }
                      }
                    },
                    "insights": {
                      "description": "Insights about the company.",
                      "type": "object",
                      "properties": {
                        "headcount": {
                          "description": "The number of employees of the Company.",
                          "type": "number"
                        },
                        "headcount_range": {
                          "description": "The employees count range the Company falls into.",
                          "type": "object",
                          "properties": {
                            "from": {
                              "description": "The lower bound of the range.",
                              "type": "number"
                            },
                            "to": {
                              "description": "The higher bound of the range.",
                              "type": "number"
                            }
                          }
                        },
                        "heacount_growth": {
                          "description": "A list of time markers to create a chart showing the evolution of the number of employees.",
                          "type": "array",
                          "items": {
                            "type": "object",
                            "required": [
                              "date",
                              "headcount"
                            ],
                            "properties": {
                              "date": {
                                "description": "The date of the marker. Uses ISO 8601 en_US datetime (MM/DD/YYYY).",
                                "type": "string"
                              },
                              "headcount": {
                                "description": "The number of employees at the specified date.",
                                "type": "number"
                              }
                            }
                          }
                        },
                        "growth_periods": {
                          "description": "A list of time markers to create a chart showing the evolution of the number of employees.",
                          "type": "array",
                          "items": {
                            "type": "object",
                            "required": [
                              "months_range",
                              "percentage"
                            ],
                            "properties": {
                              "months_range": {
                                "description": "The months range.",
                                "type": "number"
                              },
                              "percentage": {
                                "description": "The growth percentage for the given months range.",
                                "type": "number"
                              }
                            }
                          }
                        },
                        "average_tenure": {
                          "description": "The average years of experience of employees.",
                          "type": "number"
                        }
                      }
                    },
                    "funding": {
                      "description": "Company funding information.",
                      "type": "object",
                      "properties": {
                        "crunchbase": {
                          "description": "Details about Crunchbase funding.",
                          "type": "object",
                          "required": [
                            "rounds_url",
                            "rounds_count",
                            "company_url",
                            "last_round"
                          ],
                          "properties": {
                            "rounds_url": {
                              "description": "The URL to the funding rounds on Crunchbase.",
                              "type": "string"
                            },
                            "rounds_count": {
                              "description": "The number of funding rounds.",
                              "type": "number"
                            },
                            "company_url": {
                              "description": "The URL of the Company on Crunchbase.",
                              "type": "string"
                            },
                            "last_round": {
                              "description": "The last funding round.",
                              "type": "object",
                              "required": [
                                "announced_on",
                                "url",
                                "funding_type",
                                "investors_count",
                                "lead_investors"
                              ],
                              "properties": {
                                "announced_on": {
                                  "description": "The date on which the round was announced. Uses ISO 8601 en_US datetime (MM/DD/YYYY).",
                                  "type": "string"
                                },
                                "url": {
                                  "description": "The URL to the funding round on Crunchbase.",
                                  "type": "string"
                                },
                                "funding_type": {
                                  "description": "The type of funding.",
                                  "type": "string"
                                },
                                "investors_count": {
                                  "description": "The number of investors for the current round.",
                                  "type": "number"
                                },
                                "lead_investors": {
                                  "description": "A list of most important investors.",
                                  "type": "array",
                                  "items": {
                                    "type": "object",
                                    "required": [
                                      "name",
                                      "url"
                                    ],
                                    "properties": {
                                      "name": {
                                        "description": "The name of the investor.",
                                        "type": "string"
                                      },
                                      "url": {
                                        "description": "The URL of the investor.",
                                        "type": "string"
                                      },
                                      "logo_url": {
                                        "description": "The logo URL of the investor.",
                                        "type": "string"
                                      }
                                    }
                                  }
                                },
                                "money_raised": {
                                  "description": "The amount of money that has been raised during the funding round.",
                                  "type": "object",
                                  "required": [
                                    "amount",
                                    "currency"
                                  ],
                                  "properties": {
                                    "amount": {
                                      "type": "number"
                                    },
                                    "currency": {
                                      "type": "string"
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "hashtags": {
                      "description": "The list of hashtags related to the Company.",
                      "type": "array",
                      "items": {
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