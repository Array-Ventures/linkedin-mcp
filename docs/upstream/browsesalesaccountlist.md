---
updatedAt: 2026-04-24T15:33:11.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Browse an Account List

Returns the accounts that have been saved in the given list.

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
    "/v2/{account_id}/linkedin/sales-navigator/account-lists/{list_id}": {
      "post": {
        "operationId": "browseSalesAccountList",
        "summary": "Browse an Account List",
        "tags": [
          "LinkedIn"
        ],
        "description": "Returns the accounts that have been saved in the given list.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "persona": {
                    "description": "A parameter ID. Use <a href=\"https://developer.unipile.com/v2.0/reference/getsalessearchparameters\">List Search Parameters</a> with `PERSONA` type to find out the possible values.\n  \nNative filter : Persona\n  ",
                    "type": "string"
                  },
                  "filter": {
                    "description": "\n  \nNative filter : Filter companies\n  ",
                    "type": "string",
                    "enum": [
                      "STARRED",
                      "GROWTH_ALERTS",
                      "RISK_ALERTS"
                    ]
                  },
                  "sort_by": {
                    "description": "The sort method.",
                    "default": "NAME",
                    "type": "string",
                    "enum": [
                      "DATE_ADDED",
                      "NAME"
                    ]
                  },
                  "sort_order": {
                    "description": "The sort order.",
                    "default": "ASCENDING",
                    "type": "string",
                    "enum": [
                      "ASCENDING",
                      "DESCENDING"
                    ]
                  }
                }
              }
            }
          }
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
              "default": 25,
              "minimum": 1,
              "maximum": 100,
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
            "name": "list_id",
            "required": true,
            "description": "The ID of the list to be browsed."
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
            "name": "Browse sales account list",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipileLinkedIn } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipileLinkedIn = new UnipileLinkedIn({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipileLinkedIn.browseSalesAccountList(\n  {\n    path: {\n      list_id: 'list_id',\n      account_id: ACCOUNT_ID,\n    },\n    body: {\n      persona: 'value',\n    },\n  }\n);"
          },
          {
            "name": "Browse sales account list",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    linked_in_api = unipile.LinkedInApi(api_client)\n\nresponse = linked_in_api.browse_sales_account_list(\n    'list_id',\n    ACCOUNT_ID,\n    {\n    'persona': 'value',\n  }\n)"
          }
        ],
        "responses": {
          "200": {
            "description": "Default Response",
            "content": {
              "application/json": {
                "schema": {
                  "title": "Account List",
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
                          "id",
                          "display_name",
                          "lists_count",
                          "notes_count",
                          "is_starred",
                          "object"
                        ],
                        "properties": {
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
                          "type": {
                            "description": "The type of the Company.",
                            "type": "string"
                          },
                          "headcount": {
                            "description": "The number of employees of the Company.",
                            "type": "number"
                          },
                          "specialties": {
                            "description": "A list of the company's activities.",
                            "type": "array",
                            "items": {
                              "type": "string"
                            }
                          },
                          "is_hiring_on_linkedin": {
                            "description": "Whether the Company is hiring on LinkedIn.",
                            "type": "boolean"
                          },
                          "lists_count": {
                            "description": "The number of lists you own on which the Company appears.",
                            "type": "number"
                          },
                          "notes_count": {
                            "description": "The number of notes you own about the Company.",
                            "type": "number"
                          },
                          "website": {
                            "description": "The webiste URL of the Company.",
                            "type": "string"
                          },
                          "founded_on": {
                            "description": "The year in which the Company was founded.",
                            "type": "number"
                          },
                          "is_starred": {
                            "description": "Whether the Company is on starred state.",
                            "type": "boolean"
                          },
                          "object": {
                            "type": "string",
                            "enum": [
                              "SavedAccount"
                            ]
                          },
                          "recommended_lead": {
                            "description": "A recommended lead associated with the Account.",
                            "type": "object",
                            "required": [
                              "id",
                              "display_name",
                              "network_distance",
                              "has_posted_recently",
                              "has_viewed_your_profile",
                              "was_hired_recently",
                              "was_promoted_recently",
                              "follows_your_company",
                              "is_premium",
                              "is_past_colleague",
                              "is_open_profile",
                              "contact_info",
                              "lists_count",
                              "notes_count",
                              "education",
                              "skills",
                              "work_experience",
                              "languages",
                              "volunteering",
                              "object"
                            ],
                            "properties": {
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
                                "allOf": [
                                  {
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
                                  {
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
                                  }
                                ]
                              },
                              "can_send_inmail": {
                                "description": "Whether it is possible to send an inMail to this User.",
                                "type": "boolean"
                              },
                              "shared_relations_count": {
                                "description": "The number of relations that you share with the User.",
                                "type": "number"
                              },
                              "summary": {
                                "description": "The summary of the User.",
                                "type": "string"
                              },
                              "has_posted_recently": {
                                "description": "Whether the User has posted recently.",
                                "type": "boolean"
                              },
                              "has_viewed_your_profile": {
                                "description": "Whether the User has already visited your profile.",
                                "type": "boolean"
                              },
                              "was_hired_recently": {
                                "description": "Whether the User was hired recently.",
                                "type": "boolean"
                              },
                              "was_promoted_recently": {
                                "description": "Whether the User was promoted recently.",
                                "type": "boolean"
                              },
                              "follows_your_company": {
                                "description": "Whether the User is folliwing your company.",
                                "type": "boolean"
                              },
                              "is_premium": {
                                "description": "Whether the User has a premium subscription.",
                                "type": "boolean"
                              },
                              "is_past_colleague": {
                                "description": "Whether the User is a past colleague of yours.",
                                "type": "boolean"
                              },
                              "is_open_profile": {
                                "description": "Whether the User has an Open Profile. The Open Profile feature allows anyone on LinkedIn to contact a Premium member for free.",
                                "type": "boolean"
                              },
                              "websites": {
                                "description": "A list of websites of the User.",
                                "type": "array",
                                "items": {
                                  "type": "string"
                                }
                              },
                              "addresses": {
                                "description": "A list of addresses of the User.",
                                "type": "array",
                                "items": {
                                  "type": "string"
                                }
                              },
                              "contact_info": {
                                "description": "Contact information of the User.",
                                "type": "object",
                                "properties": {
                                  "phones": {
                                    "description": "A list of phone numbers of the User.",
                                    "type": "array",
                                    "items": {
                                      "type": "string"
                                    }
                                  },
                                  "emails": {
                                    "description": "A list of email addresses of the User.",
                                    "type": "array",
                                    "items": {
                                      "type": "string"
                                    }
                                  }
                                }
                              },
                              "latest_contact": {
                                "description": "The last contact you had with the User.",
                                "type": "object",
                                "required": [
                                  "type",
                                  "performed_at"
                                ],
                                "properties": {
                                  "type": {
                                    "type": "string",
                                    "enum": [
                                      "MESSAGE",
                                      "INVITATION_SENT",
                                      "INVITATION_ACCEPTED",
                                      "PROFILE_VIEW"
                                    ]
                                  },
                                  "performed_at": {
                                    "description": "The date on which the action was performed. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                                    "type": "string"
                                  },
                                  "resource_id": {
                                    "description": "The ID of the resource that may have been created, like a message or an invitation.",
                                    "type": "string"
                                  }
                                }
                              },
                              "lists_count": {
                                "description": "The number of lists you own on which the User appears.",
                                "type": "number"
                              },
                              "notes_count": {
                                "description": "The number of notes you own about the User.",
                                "type": "number"
                              },
                              "social_handles": {
                                "type": "object",
                                "properties": {
                                  "twitter": {
                                    "type": "string"
                                  }
                                },
                                "description": "Social handles of the User."
                              },
                              "industry": {
                                "description": "The industry in which the User works.",
                                "type": "string"
                              },
                              "education": {
                                "type": "array",
                                "items": {
                                  "type": "object",
                                  "required": [
                                    "school"
                                  ],
                                  "properties": {
                                    "id": {
                                      "description": "Id of the education entry.",
                                      "type": "string"
                                    },
                                    "school": {
                                      "type": "object",
                                      "required": [
                                        "id"
                                      ],
                                      "properties": {
                                        "id": {
                                          "anyOf": [
                                            {
                                              "description": "Unique identifier of the school.",
                                              "type": "string"
                                            },
                                            {
                                              "type": "null"
                                            }
                                          ]
                                        },
                                        "name": {
                                          "description": "Name of the school.",
                                          "type": "string"
                                        },
                                        "picture_url": {
                                          "description": "Public url to the profile picture of the school.",
                                          "type": "string"
                                        },
                                        "profile_url": {
                                          "description": "Public url to the profile of the school.",
                                          "type": "string"
                                        }
                                      }
                                    },
                                    "degree": {
                                      "description": "Name of the degree.",
                                      "type": "string"
                                    },
                                    "description": {
                                      "description": "Description of the education.",
                                      "type": "string"
                                    },
                                    "activities": {
                                      "description": "Activities carried out during education.",
                                      "type": "string"
                                    },
                                    "skills": {
                                      "description": "Skills acquired through training.",
                                      "type": "array",
                                      "items": {
                                        "type": "string"
                                      }
                                    },
                                    "skills_preview": {
                                      "description": "Insight of the skills acquired through training.",
                                      "type": "string"
                                    },
                                    "grade": {
                                      "description": "Reached academic level of the education.",
                                      "type": "string"
                                    },
                                    "fields_of_study": {
                                      "description": "Fields of study of the education.",
                                      "type": "array",
                                      "items": {
                                        "type": "string"
                                      }
                                    },
                                    "started_on": {
                                      "description": "Start date of the education in MM/DD/YYYY format.",
                                      "type": "string"
                                    },
                                    "ended_on": {
                                      "description": "End date of the education in MM/DD/YYYY format.",
                                      "type": "string"
                                    }
                                  }
                                }
                              },
                              "skills": {
                                "type": "array",
                                "items": {
                                  "type": "object",
                                  "required": [
                                    "name",
                                    "endorsement_count"
                                  ],
                                  "properties": {
                                    "name": {
                                      "description": "Name of the skill.",
                                      "type": "string"
                                    },
                                    "endorsement_count": {
                                      "description": "Number of people who endorsed the skill.",
                                      "type": "number"
                                    }
                                  }
                                }
                              },
                              "work_experience": {
                                "type": "array",
                                "items": {
                                  "type": "object",
                                  "required": [
                                    "company",
                                    "job_title"
                                  ],
                                  "properties": {
                                    "id": {
                                      "description": "Id of the work experience entry.",
                                      "type": "string"
                                    },
                                    "company": {
                                      "type": "object",
                                      "required": [
                                        "id"
                                      ],
                                      "properties": {
                                        "name": {
                                          "description": "Name of the company.",
                                          "type": "string"
                                        },
                                        "id": {
                                          "anyOf": [
                                            {
                                              "description": "Unique identifier of the company.",
                                              "type": "string"
                                            },
                                            {
                                              "type": "null"
                                            }
                                          ]
                                        },
                                        "public_identifier": {
                                          "description": "Public identifier of the company.",
                                          "type": "string"
                                        },
                                        "picture_url": {
                                          "description": "Public url to the profile picture of the company.",
                                          "type": "string"
                                        },
                                        "profile_url": {
                                          "description": "Public url to the profile of the company.",
                                          "type": "string"
                                        },
                                        "industries": {
                                          "description": "Industry types of the company.",
                                          "type": "array",
                                          "items": {
                                            "type": "string"
                                          }
                                        }
                                      }
                                    },
                                    "job_title": {
                                      "description": "Job title of the experience.",
                                      "type": "string"
                                    },
                                    "started_on": {
                                      "description": "Start date of the experience in MM/DD/YYYY format.",
                                      "type": "string"
                                    },
                                    "ended_on": {
                                      "description": "End date of the experience in MM/DD/YYYY format.",
                                      "type": "string"
                                    },
                                    "location": {
                                      "description": "Location of the experience.",
                                      "type": "string"
                                    },
                                    "description": {
                                      "description": "Description of the experience.",
                                      "type": "string"
                                    },
                                    "employment_type": {
                                      "description": "Employment type of the experience.",
                                      "anyOf": [
                                        {
                                          "type": "string",
                                          "enum": [
                                            "SELF_EMPLOYED"
                                          ]
                                        },
                                        {
                                          "type": "string",
                                          "enum": [
                                            "CONTRACT"
                                          ]
                                        },
                                        {
                                          "type": "string",
                                          "enum": [
                                            "CONTRACT_PART_TIME"
                                          ]
                                        },
                                        {
                                          "type": "string",
                                          "enum": [
                                            "PERMANENT"
                                          ]
                                        },
                                        {
                                          "type": "string",
                                          "enum": [
                                            "PERMANENT_PART_TIME"
                                          ]
                                        },
                                        {
                                          "type": "string",
                                          "enum": [
                                            "INTERNSHIP"
                                          ]
                                        },
                                        {
                                          "type": "string",
                                          "enum": [
                                            "APPRENTICESHIP"
                                          ]
                                        },
                                        {
                                          "type": "string",
                                          "enum": [
                                            "FREELANCE"
                                          ]
                                        },
                                        {
                                          "type": "string",
                                          "enum": [
                                            "FREELANCE_ARTS_WORKER"
                                          ]
                                        },
                                        {
                                          "type": "string",
                                          "enum": [
                                            "CIVIL_SERVICE_INTERNSHIP"
                                          ]
                                        },
                                        {
                                          "type": "string",
                                          "enum": [
                                            "VOLUNTEERING"
                                          ]
                                        },
                                        {
                                          "type": "string",
                                          "enum": [
                                            "CIVIL_SERVANT"
                                          ]
                                        },
                                        {
                                          "type": "string",
                                          "enum": [
                                            "TEMPORARY"
                                          ]
                                        }
                                      ]
                                    },
                                    "workplace_type": {
                                      "description": "Workplace type of the experience.",
                                      "type": "string",
                                      "enum": [
                                        "ON_SITE",
                                        "HYBRID",
                                        "REMOTE"
                                      ]
                                    },
                                    "skills": {
                                      "description": "Skills acquired with experience.",
                                      "type": "array",
                                      "items": {
                                        "type": "string"
                                      }
                                    },
                                    "skills_preview": {
                                      "description": "Insight of the skills acquired with experience.",
                                      "type": "string"
                                    }
                                  }
                                }
                              },
                              "languages": {
                                "type": "array",
                                "items": {
                                  "type": "object",
                                  "required": [
                                    "language"
                                  ],
                                  "properties": {
                                    "language": {
                                      "description": "Name of the language.",
                                      "type": "string"
                                    },
                                    "proficiency": {
                                      "description": "Level of fluency in the language.",
                                      "anyOf": [
                                        {
                                          "type": "string",
                                          "enum": [
                                            "ELEMENTARY"
                                          ]
                                        },
                                        {
                                          "type": "string",
                                          "enum": [
                                            "LIMITED_WORKING"
                                          ]
                                        },
                                        {
                                          "type": "string",
                                          "enum": [
                                            "PROFESSIONAL_WORKING"
                                          ]
                                        },
                                        {
                                          "type": "string",
                                          "enum": [
                                            "FULL_PROFESSIONAL"
                                          ]
                                        },
                                        {
                                          "type": "string",
                                          "enum": [
                                            "NATIVE_OR_BILINGUAL"
                                          ]
                                        }
                                      ]
                                    }
                                  }
                                }
                              },
                              "volunteering": {
                                "type": "array",
                                "items": {
                                  "type": "object",
                                  "required": [
                                    "role"
                                  ],
                                  "properties": {
                                    "organization": {
                                      "type": "object",
                                      "required": [
                                        "id"
                                      ],
                                      "properties": {
                                        "name": {
                                          "description": "Name of the company.",
                                          "type": "string"
                                        },
                                        "id": {
                                          "anyOf": [
                                            {
                                              "description": "Unique identifier of the company.",
                                              "type": "string"
                                            },
                                            {
                                              "type": "null"
                                            }
                                          ]
                                        },
                                        "public_identifier": {
                                          "description": "Public identifier of the company.",
                                          "type": "string"
                                        },
                                        "picture_url": {
                                          "description": "Public url to the profile picture of the company.",
                                          "type": "string"
                                        },
                                        "profile_url": {
                                          "description": "Public url to the profile of the company.",
                                          "type": "string"
                                        },
                                        "industries": {
                                          "description": "Industry types of the company.",
                                          "type": "array",
                                          "items": {
                                            "type": "string"
                                          }
                                        }
                                      }
                                    },
                                    "role": {
                                      "description": "Role in the experience.",
                                      "type": "string"
                                    },
                                    "cause": {
                                      "description": "Cause of the experience.",
                                      "type": "string"
                                    },
                                    "description": {
                                      "description": "Description of the experience.",
                                      "type": "string"
                                    },
                                    "started_on": {
                                      "description": "Start date of the experience in MM/DD/YYYY format.",
                                      "type": "string"
                                    },
                                    "ended_on": {
                                      "description": "End date of the experience in MM/DD/YYYY format.",
                                      "type": "string"
                                    }
                                  }
                                }
                              },
                              "object": {
                                "type": "string",
                                "enum": [
                                  "Lead"
                                ]
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