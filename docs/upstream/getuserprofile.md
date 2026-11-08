---
updatedAt: 2026-08-27T09:47:56.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Get a User Profile

Retrieves the specified User profile. Use `me` as `user_id` to specify the owner of the connected account.

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
      "name": "Users",
      "description": "Users managment"
    }
  ],
  "paths": {
    "/v2/{account_id}/users/{user_id}": {
      "get": {
        "operationId": "getUserProfile",
        "summary": "Get a User Profile",
        "tags": [
          "Users"
        ],
        "description": "Retrieves the specified User profile. Use `me` as `user_id` to specify the owner of the connected account.",
        "parameters": [
          {
            "schema": {
              "allOf": [
                {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                },
                {
                  "description": "Sections of the profile that should be included in the response (if supported by the provider).\n          \n  LinkedIn profile sections:\n  - `linkedin_*` is for All sections at once.\n  - `linkedin_experience` is Experience section.\n  - `linkedin_education` is Education section.\n  - `linkedin_languages` is Languages section.\n  - `linkedin_skills` is Skills section.\n  - `linkedin_certifications` is Licenses & certifications section.\n  - `linkedin_volunteer_experience` is Volunteer Experience section.\n  - `linkedin_projects` is Projects section.\n  - `linkedin_recommendations` is Recommendations section.\n  - `linkedin_interests` is Interests section.\n  - `linkedin_recruiting_activity` is Recruiting activity section (Recruiter only).\n\n  Keep in mind that LinkedIn may throttle sections requests when too many calls are made in a short time. To minimize the risk, you can add the `_preview` suffix to any section that you consider to be less critical. This method returns only the first few visible entries of a given section.\n",
                  "type": "array",
                  "items": {
                    "type": "string",
                    "enum": [
                      "linkedin_*",
                      "linkedin_experience",
                      "linkedin_education",
                      "linkedin_languages",
                      "linkedin_skills",
                      "linkedin_certifications",
                      "linkedin_volunteer_experience",
                      "linkedin_projects",
                      "linkedin_recommendations",
                      "linkedin_recruiting_activity",
                      "linkedin_interests",
                      "linkedin_*_preview",
                      "linkedin_experience_preview",
                      "linkedin_education_preview",
                      "linkedin_languages_preview",
                      "linkedin_skills_preview",
                      "linkedin_certifications_preview",
                      "linkedin_volunteer_experience_preview",
                      "linkedin_projects_preview",
                      "linkedin_recommendations_preview",
                      "linkedin_recruiting_activity_preview",
                      "linkedin_interests_preview"
                    ]
                  }
                }
              ]
            },
            "in": "query",
            "name": "with_sections",
            "required": false
          },
          {
            "schema": {
              "allOf": [
                {
                  "type": "string"
                },
                {
                  "description": "A variant of the profile (if supported by the provider).\n          \n  LinkedIn variants:\n  - `linkedin_classic` is Classic API profile variant.\n  - `linkedin_recruiter` is Recruiter API profile variant.\n  - `linkedin_sales_navigator` is Sales navigator API profile variant.\n",
                  "type": "string",
                  "enum": [
                    "linkedin_classic",
                    "linkedin_recruiter",
                    "linkedin_sales_navigator"
                  ]
                }
              ]
            },
            "in": "query",
            "name": "variant",
            "required": false
          },
          {
            "schema": {
              "minLength": 1,
              "type": "string"
            },
            "in": "path",
            "name": "user_id",
            "required": true,
            "description": "The ID of the User to retrieve."
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
            "name": "Get user profile",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipileUsers } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipileUsers = new UnipileUsers({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipileUsers.getUserProfile(\n  {\n    path: {\n      user_id: 'user_id',\n      account_id: ACCOUNT_ID,\n    },\n  }\n);"
          },
          {
            "name": "Get user profile",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    users_api = unipile.UsersApi(api_client)\n\nresponse = users_api.get_user_profile(\n    'user_id',\n    ACCOUNT_ID\n)"
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
                    "object",
                    "type",
                    "display_name",
                    "specifics",
                    "is_blocked",
                    "provider"
                  ],
                  "properties": {
                    "id": {
                      "description": "Unique identifier of the user for the provider. Usually an internal identifier used by the API only.",
                      "type": "string"
                    },
                    "object": {
                      "type": "string",
                      "enum": [
                        "UserProfile"
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
                      "allOf": [
                        {},
                        {
                          "description": "Object containing provider-specific user profile data.",
                          "anyOf": [
                            {
                              "description": "Telegram specific dataset for user profiles.",
                              "title": "Telegram",
                              "type": "object",
                              "required": [
                                "is_mutual_contact",
                                "is_close_friend",
                                "is_bot",
                                "is_support",
                                "is_scam",
                                "is_fake",
                                "is_restricted"
                              ],
                              "properties": {
                                "is_mutual_contact": {
                                  "description": "Whether the user and the account owner are in each other address book.",
                                  "type": "boolean"
                                },
                                "is_close_friend": {
                                  "description": "Whether the user is a close friend of the account owner.",
                                  "type": "boolean"
                                },
                                "is_bot": {
                                  "description": "Whether the user is a bot.",
                                  "type": "boolean"
                                },
                                "is_support": {
                                  "description": "Whether the user is an official Telegram support account.",
                                  "type": "boolean"
                                },
                                "is_scam": {
                                  "description": "Whether the user has been flagged as a scam by Telegram.",
                                  "type": "boolean"
                                },
                                "is_fake": {
                                  "description": "Whether the user has been flagged as impersonating another user by Telegram.",
                                  "type": "boolean"
                                },
                                "is_restricted": {
                                  "description": "Whether the user is restricted on some platforms.",
                                  "type": "boolean"
                                },
                                "restrictions": {
                                  "description": "Restrictions applied to the user, if any.",
                                  "type": "array",
                                  "items": {
                                    "type": "object",
                                    "required": [
                                      "platform",
                                      "reason",
                                      "text"
                                    ],
                                    "properties": {
                                      "platform": {
                                        "description": "Platform the restriction applies to (e.g. `ios`, `android`, `all`).",
                                        "type": "string"
                                      },
                                      "reason": {
                                        "description": "Machine readable reason of the restriction.",
                                        "type": "string"
                                      },
                                      "text": {
                                        "description": "Human readable reason of the restriction.",
                                        "type": "string"
                                      }
                                    }
                                  }
                                },
                                "status": {
                                  "description": "Last seen status of the user, as exposed by Telegram.",
                                  "type": "object",
                                  "required": [
                                    "type"
                                  ],
                                  "properties": {
                                    "type": {
                                      "description": "Last seen status of the user.\n      - `online` the user is currently online, until `expires_at`.\n      - `offline` the user is offline, and was last online at `was_online_at`.\n      - `recently`, `last_week` and `last_month` are the approximations returned when the user hides its exact last seen date.",
                                      "type": "string",
                                      "enum": [
                                        "online",
                                        "offline",
                                        "recently",
                                        "last_week",
                                        "last_month"
                                      ]
                                    },
                                    "expires_at": {
                                      "description": "Date and time until when the user is considered online (`online` status only).",
                                      "type": "string"
                                    },
                                    "was_online_at": {
                                      "description": "Date and time when the user was last online (`offline` status only).",
                                      "type": "string"
                                    }
                                  }
                                },
                                "common_chats_count": {
                                  "description": "Number of chats shared between the user and the account owner.",
                                  "type": "number"
                                }
                              }
                            },
                            {
                              "description": "Instagram specific dataset for user profiles.",
                              "title": "Instagram",
                              "type": "object",
                              "required": [
                                "messaging_identifier"
                              ],
                              "properties": {
                                "messaging_identifier": {
                                  "type": "string"
                                }
                              }
                            },
                            {
                              "description": "LinkedIn specific dataset for user profiles.",
                              "title": "LinkedIn",
                              "type": "object",
                              "properties": {
                                "member_id": {
                                  "description": "LinkedIn internal member ID of the user.",
                                  "type": "string"
                                },
                                "industry": {
                                  "description": "The industry of the user's current company.",
                                  "type": "string"
                                },
                                "can_send_inmail": {
                                  "description": "Whether the user can be reached with inmails.",
                                  "type": "boolean"
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
                                "relation_request": {
                                  "type": "object",
                                  "required": [
                                    "object",
                                    "type",
                                    "id"
                                  ],
                                  "properties": {
                                    "object": {
                                      "type": "string",
                                      "enum": [
                                        "RelationRequest"
                                      ]
                                    },
                                    "user": {
                                      "description": "The user who is the target of the relation / follow request.",
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
                                    "type": {
                                      "description": "Type of the relation / follow request.\n      - `sent` if the current user has asked another one to be in his relations.\n      - `received` if another user has asked the current one to be in his relations.",
                                      "type": "string",
                                      "enum": [
                                        "sent",
                                        "received"
                                      ]
                                    },
                                    "id": {
                                      "description": "The unique identifier of the invitation for the provider.",
                                      "type": "string"
                                    },
                                    "created_at": {
                                      "description": "Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                                      "type": "string"
                                    },
                                    "message": {
                                      "description": "Any message that comes with the invitation.",
                                      "type": "string"
                                    }
                                  }
                                },
                                "relation_request_status": {
                                  "description": "The status of the relation request with the user if any.",
                                  "type": "string",
                                  "enum": [
                                    "PENDING",
                                    "IGNORED",
                                    "WITHDRAWN"
                                  ]
                                },
                                "pronoun": {
                                  "description": "The pronoun to be used to refer to this user.",
                                  "type": "string"
                                },
                                "default_locale": {
                                  "description": "Default locale for the user's profile (POSIX format e.g. en_US, fr_FR...).",
                                  "type": "string"
                                },
                                "supported_locales": {
                                  "description": "List of supported locales for the user's profile (POSIX format e.g. en_US, fr_FR...).",
                                  "type": "array",
                                  "items": {
                                    "type": "string"
                                  }
                                },
                                "notify_visit_token": {
                                  "description": "Payload that should be passed to the Notify profile visit route in order to notify the visit.",
                                  "type": "string"
                                },
                                "is_open_profile": {
                                  "description": "Whether the user has an open profile (can be reached with free inmails).",
                                  "type": "boolean"
                                },
                                "is_premium": {
                                  "description": "Whether the user has a premium subscription.",
                                  "type": "boolean"
                                },
                                "is_influencer": {
                                  "description": "Whether the user is an influencer.",
                                  "type": "boolean"
                                },
                                "is_creator": {
                                  "description": "Whether the user is a creator.",
                                  "type": "boolean"
                                },
                                "is_hiring": {
                                  "description": "Whether the user is hiring.",
                                  "type": "boolean"
                                },
                                "is_open_to_work": {
                                  "description": "Whether the user is open to work.",
                                  "type": "boolean"
                                },
                                "is_saved_lead": {
                                  "description": "Whether the user is a saved lead.",
                                  "type": "boolean"
                                },
                                "is_crm_imported": {
                                  "description": "Whether the user is a CRM imported user.",
                                  "type": "boolean"
                                },
                                "verifications": {
                                  "description": "Verification details for verified profiles retrieved with the linkedin_classic variant.",
                                  "type": "array",
                                  "items": {
                                    "description": "A verification associated with a LinkedIn user profile.",
                                    "type": "object",
                                    "required": [
                                      "type"
                                    ],
                                    "properties": {
                                      "type": {
                                        "description": "The verification category displayed by LinkedIn, such as Identity or Workplace, in the account locale.",
                                        "type": "string"
                                      },
                                      "description": {
                                        "description": "The verification details displayed by LinkedIn, including the verification method if available.",
                                        "type": "string"
                                      },
                                      "verified_since": {
                                        "description": "The relative time since verification displayed by LinkedIn, such as \"Over 1 year ago\", in the account locale.",
                                        "type": "string"
                                      }
                                    }
                                  }
                                },
                                "skills": {
                                  "description": "A collection of the user's skills.",
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
                                      },
                                      "endorsement_id": {
                                        "description": "Unique identifier to be used to endorse the skill.",
                                        "type": "number"
                                      },
                                      "endorsed": {
                                        "description": "Whether the viewer has endorsed the skill.",
                                        "type": "boolean"
                                      },
                                      "insights": {
                                        "description": "Insights about the skill.",
                                        "type": "array",
                                        "items": {
                                          "type": "string"
                                        }
                                      }
                                    }
                                  }
                                },
                                "experience": {
                                  "description": "A collection of the user's professionnal experiences.",
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
                                "education": {
                                  "description": "A collection of the user's education.",
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
                                "languages": {
                                  "description": "A collection of the user's languages.",
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
                                "certifications": {
                                  "description": "A collection of the user's certifications.",
                                  "type": "array",
                                  "items": {
                                    "type": "object",
                                    "required": [
                                      "title",
                                      "organization"
                                    ],
                                    "properties": {
                                      "title": {
                                        "description": "Name of the certification.",
                                        "type": "string"
                                      },
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
                                      "issued_on": {
                                        "description": "Date the certification was issued in MM/DD/YYYY format.",
                                        "type": "string"
                                      },
                                      "expires_on": {
                                        "description": "Expiration date of the certification in MM/DD/YYYY format.",
                                        "type": "string"
                                      },
                                      "license": {
                                        "description": "License identifier.",
                                        "type": "string"
                                      },
                                      "skills": {
                                        "description": "Skills acquired through certification.",
                                        "type": "array",
                                        "items": {
                                          "type": "string"
                                        }
                                      },
                                      "skills_preview": {
                                        "description": "Insight of the skills acquired through certification.",
                                        "type": "string"
                                      },
                                      "url": {
                                        "description": "Public URL to the certification.",
                                        "type": "string"
                                      }
                                    }
                                  }
                                },
                                "volunteer_experience": {
                                  "description": "A collection of the user's volunteering experiences.",
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
                                "projects": {
                                  "description": "A collection of the user's projects.",
                                  "type": "array",
                                  "items": {
                                    "type": "object",
                                    "required": [
                                      "name",
                                      "contributors"
                                    ],
                                    "properties": {
                                      "name": {
                                        "description": "Name of the project.",
                                        "type": "string"
                                      },
                                      "description": {
                                        "description": "Description of the project.",
                                        "type": "string"
                                      },
                                      "contributors": {
                                        "description": "Contributors to the project.",
                                        "type": "array",
                                        "items": {
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
                                        }
                                      },
                                      "skills": {
                                        "description": "Skills related to the project.",
                                        "type": "array",
                                        "items": {
                                          "type": "string"
                                        }
                                      },
                                      "skills_preview": {
                                        "description": "Insight of the skills related to the project.",
                                        "type": "string"
                                      },
                                      "started_on": {
                                        "description": "Start date of the project in MM/DD/YYYY format.",
                                        "type": "string"
                                      },
                                      "ended_on": {
                                        "description": "End date of the project in MM/DD/YYYY format.",
                                        "type": "string"
                                      }
                                    }
                                  }
                                },
                                "recommendations": {
                                  "type": "object",
                                  "required": [
                                    "received",
                                    "given"
                                  ],
                                  "properties": {
                                    "received": {
                                      "description": "A collection of the user's received recommendations.",
                                      "type": "array",
                                      "items": {
                                        "type": "object",
                                        "required": [
                                          "text",
                                          "user"
                                        ],
                                        "properties": {
                                          "caption": {
                                            "description": "Recommendation details, including date and actors relationship.",
                                            "type": "string"
                                          },
                                          "created_on": {
                                            "description": "Creation date of the recommendation.",
                                            "type": "string"
                                          },
                                          "text": {
                                            "description": "Content of the recommendation.",
                                            "type": "string"
                                          },
                                          "user": {
                                            "anyOf": [
                                              {
                                                "description": "User who has given or received the recommendation.",
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
                                              {
                                                "type": "null"
                                              }
                                            ]
                                          }
                                        }
                                      }
                                    },
                                    "given": {
                                      "description": "A collection of the user's given recommendations.",
                                      "type": "array",
                                      "items": {
                                        "type": "object",
                                        "required": [
                                          "text",
                                          "user"
                                        ],
                                        "properties": {
                                          "caption": {
                                            "description": "Recommendation details, including date and actors relationship.",
                                            "type": "string"
                                          },
                                          "created_on": {
                                            "description": "Creation date of the recommendation.",
                                            "type": "string"
                                          },
                                          "text": {
                                            "description": "Content of the recommendation.",
                                            "type": "string"
                                          },
                                          "user": {
                                            "anyOf": [
                                              {
                                                "description": "User who has given or received the recommendation.",
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
                                              {
                                                "type": "null"
                                              }
                                            ]
                                          }
                                        }
                                      }
                                    }
                                  }
                                },
                                "interests": {
                                  "description": "The user's interests.",
                                  "type": "object",
                                  "properties": {
                                    "top_voices": {
                                      "description": "A collection of Top voice User profiles.",
                                      "type": "array",
                                      "items": {
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
                                        }
                                      }
                                    },
                                    "companies": {
                                      "description": "A collection of Companies.",
                                      "type": "array",
                                      "items": {
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
                                      }
                                    },
                                    "schools": {
                                      "description": "A collection of Schools.",
                                      "type": "array",
                                      "items": {
                                        "type": "object",
                                        "required": [
                                          "id",
                                          "name",
                                          "object"
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
                                              "SchoolLightProfile"
                                            ]
                                          }
                                        }
                                      }
                                    },
                                    "newsletters": {
                                      "description": "A collection of Newsletters.",
                                      "type": "array",
                                      "items": {
                                        "type": "object",
                                        "required": [
                                          "title",
                                          "is_subscribed"
                                        ],
                                        "properties": {
                                          "id": {
                                            "description": "The ID of the newsletter.",
                                            "type": "string"
                                          },
                                          "title": {
                                            "description": "The title of the newsletter.",
                                            "type": "string"
                                          },
                                          "url": {
                                            "description": "The URL to the newsletter.",
                                            "type": "string"
                                          },
                                          "description": {
                                            "description": "The description of the newsletter.",
                                            "type": "string"
                                          },
                                          "is_subscribed": {
                                            "description": "Whether the current user has subscribed to the newsletter.",
                                            "type": "boolean"
                                          },
                                          "posting_frequency": {
                                            "description": "The posting frequency of the newsletter.",
                                            "type": "string",
                                            "enum": [
                                              "MONTHLY",
                                              "WEEKLY",
                                              "BIWEEKLY",
                                              "DAILY"
                                            ]
                                          },
                                          "public_picture_url": {
                                            "description": "The public picture URL of the newsletter.",
                                            "type": "string"
                                          }
                                        }
                                      }
                                    },
                                    "groups": {
                                      "description": "A collection of Groups.",
                                      "type": "array",
                                      "items": {
                                        "type": "object",
                                        "required": [
                                          "name",
                                          "is_member"
                                        ],
                                        "properties": {
                                          "id": {
                                            "description": "The ID of the group.",
                                            "type": "string"
                                          },
                                          "name": {
                                            "description": "The name of the group.",
                                            "type": "string"
                                          },
                                          "url": {
                                            "description": "The URL to the group.",
                                            "type": "string"
                                          },
                                          "members_count": {
                                            "description": "The number of members of the group.",
                                            "type": "number"
                                          },
                                          "is_member": {
                                            "description": "Whether the current user is a member of the group.",
                                            "type": "boolean"
                                          },
                                          "public_picture_url": {
                                            "description": "The public picture URL of the group.",
                                            "type": "string"
                                          }
                                        }
                                      }
                                    }
                                  }
                                },
                                "throttled_sections": {
                                  "description": "A list of sections that are temporary unavailable due to LinkedIn rate limiting.",
                                  "type": "array",
                                  "items": {
                                    "type": "string",
                                    "enum": [
                                      "experience",
                                      "education",
                                      "languages",
                                      "skills",
                                      "certifications",
                                      "volunteer_experience",
                                      "projects",
                                      "recommendations",
                                      "interests"
                                    ]
                                  }
                                },
                                "recruiting_profile": {
                                  "type": "object",
                                  "required": [
                                    "notes",
                                    "tags"
                                  ],
                                  "properties": {
                                    "events": {
                                      "description": "A list of events related to the user.",
                                      "type": "array",
                                      "items": {
                                        "anyOf": [
                                          {
                                            "title": "Message",
                                            "type": "object",
                                            "required": [
                                              "last_updated_at",
                                              "last_updated_by",
                                              "event",
                                              "message_content",
                                              "message_status"
                                            ],
                                            "properties": {
                                              "last_updated_at": {
                                                "description": "The time at which the activity was updated. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                                                "type": "string"
                                              },
                                              "last_updated_by": {
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
                                                }
                                              },
                                              "event": {
                                                "description": "The type of event.",
                                                "type": "string",
                                                "enum": [
                                                  "MESSAGE"
                                                ]
                                              },
                                              "message_content": {
                                                "description": "The text content of the message, when available.",
                                                "anyOf": [
                                                  {
                                                    "type": "string"
                                                  },
                                                  {
                                                    "type": "null"
                                                  }
                                                ]
                                              },
                                              "message_status": {
                                                "description": "The current status of the message.",
                                                "type": "string",
                                                "enum": [
                                                  "PENDING",
                                                  "ACCEPTED",
                                                  "DECLINED",
                                                  "AWAITING_REPLY"
                                                ]
                                              }
                                            }
                                          },
                                          {
                                            "title": "Note",
                                            "type": "object",
                                            "required": [
                                              "last_updated_at",
                                              "last_updated_by",
                                              "event"
                                            ],
                                            "properties": {
                                              "last_updated_at": {
                                                "description": "The time at which the activity was updated. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                                                "type": "string"
                                              },
                                              "last_updated_by": {
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
                                                }
                                              },
                                              "event": {
                                                "description": "The type of event.",
                                                "type": "string",
                                                "enum": [
                                                  "NOTE_ADDED",
                                                  "NOTE_DELETED",
                                                  "NOTE_EDITED"
                                                ]
                                              },
                                              "note_content": {
                                                "description": "The text content of the note.",
                                                "type": "string"
                                              }
                                            }
                                          },
                                          {
                                            "title": "Link",
                                            "type": "object",
                                            "required": [
                                              "last_updated_at",
                                              "last_updated_by",
                                              "event",
                                              "link_content"
                                            ],
                                            "properties": {
                                              "last_updated_at": {
                                                "description": "The time at which the activity was updated. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                                                "type": "string"
                                              },
                                              "last_updated_by": {
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
                                                }
                                              },
                                              "event": {
                                                "description": "The type of event.",
                                                "type": "string",
                                                "enum": [
                                                  "LINK_ADDED",
                                                  "LINK_DELETED"
                                                ]
                                              },
                                              "link_content": {
                                                "description": "The URL of the link.",
                                                "type": "string"
                                              }
                                            }
                                          },
                                          {
                                            "title": "Pipeline change",
                                            "type": "object",
                                            "required": [
                                              "last_updated_at",
                                              "last_updated_by",
                                              "event",
                                              "project_id",
                                              "project_name",
                                              "pipeline_stage"
                                            ],
                                            "properties": {
                                              "last_updated_at": {
                                                "description": "The time at which the activity was updated. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                                                "type": "string"
                                              },
                                              "last_updated_by": {
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
                                                }
                                              },
                                              "event": {
                                                "description": "The type of event.",
                                                "type": "string",
                                                "enum": [
                                                  "CANDIDATE_ADDED",
                                                  "CANDIDATE_MOVED"
                                                ]
                                              },
                                              "project_id": {
                                                "description": "The ID of the project the user is related to.",
                                                "type": "string"
                                              },
                                              "project_name": {
                                                "description": "The name of the project the user is related to.",
                                                "type": "string"
                                              },
                                              "pipeline_stage": {
                                                "description": "The pipeline stage the user was added/moved to.",
                                                "type": "string"
                                              }
                                            }
                                          },
                                          {
                                            "title": "Profile view",
                                            "type": "object",
                                            "required": [
                                              "last_updated_at",
                                              "last_updated_by",
                                              "event"
                                            ],
                                            "properties": {
                                              "last_updated_at": {
                                                "description": "The time at which the activity was updated. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                                                "type": "string"
                                              },
                                              "last_updated_by": {
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
                                                }
                                              },
                                              "event": {
                                                "description": "The type of event.",
                                                "type": "string",
                                                "enum": [
                                                  "PROFILE_VIEW"
                                                ]
                                              }
                                            }
                                          },
                                          {
                                            "title": "Resume",
                                            "description": "An activity related to a resume document in LinkedIn Recruiter.",
                                            "type": "object",
                                            "required": [
                                              "last_updated_at",
                                              "last_updated_by",
                                              "event",
                                              "resume_id",
                                              "filename"
                                            ],
                                            "properties": {
                                              "last_updated_at": {
                                                "description": "The time at which the activity was updated. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                                                "type": "string"
                                              },
                                              "last_updated_by": {
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
                                                }
                                              },
                                              "event": {
                                                "description": "Whether the resume was added, edited, or deleted.",
                                                "type": "string",
                                                "enum": [
                                                  "RESUME_ADDED",
                                                  "RESUME_EDITED",
                                                  "RESUME_DELETED"
                                                ]
                                              },
                                              "resume_id": {
                                                "description": "The LinkedIn ID of the resume document.",
                                                "type": "string"
                                              },
                                              "filename": {
                                                "description": "The name of the resume file, including the extension.",
                                                "type": "string"
                                              }
                                            }
                                          },
                                          {
                                            "title": "Unhandled",
                                            "type": "object",
                                            "required": [
                                              "last_updated_at",
                                              "last_updated_by",
                                              "event"
                                            ],
                                            "properties": {
                                              "last_updated_at": {
                                                "description": "The time at which the activity was updated. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                                                "type": "string"
                                              },
                                              "last_updated_by": {
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
                                                }
                                              },
                                              "event": {
                                                "description": "The type of event.",
                                                "type": "string",
                                                "enum": [
                                                  "UNHANDLED_EVENT"
                                                ]
                                              }
                                            }
                                          }
                                        ]
                                      }
                                    },
                                    "notes": {
                                      "description": "A list of notes about the user.",
                                      "type": "array",
                                      "items": {
                                        "type": "object",
                                        "required": [
                                          "content",
                                          "last_modified_at",
                                          "author",
                                          "comments"
                                        ],
                                        "properties": {
                                          "project_id": {
                                            "description": "The ID of the project where the note was added.",
                                            "type": "string"
                                          },
                                          "content": {
                                            "description": "The text content of the note.",
                                            "type": "string"
                                          },
                                          "last_modified_at": {
                                            "description": "The time at which the note was last modified. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                                            "type": "string"
                                          },
                                          "author": {
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
                                            }
                                          },
                                          "comments": {
                                            "description": "A list of comments published on this note.",
                                            "type": "array",
                                            "items": {
                                              "type": "object",
                                              "required": [
                                                "content",
                                                "author",
                                                "last_modified_at"
                                              ],
                                              "properties": {
                                                "content": {
                                                  "description": "The text content of the comment.",
                                                  "type": "string"
                                                },
                                                "author": {
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
                                                  }
                                                },
                                                "last_modified_at": {
                                                  "description": "The time at which the comment was last modified. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                                                  "type": "string"
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    },
                                    "tags": {
                                      "description": "A list of tags about the user.",
                                      "type": "array",
                                      "items": {
                                        "type": "object",
                                        "required": [
                                          "id",
                                          "content"
                                        ],
                                        "properties": {
                                          "id": {
                                            "description": "The ID of the tag.",
                                            "type": "string"
                                          },
                                          "content": {
                                            "description": "The text content of the tag.",
                                            "type": "string"
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            },
                            {
                              "description": "WhatsApp specific dataset for user profiles.",
                              "title": "WhatsApp",
                              "type": "object",
                              "properties": {
                                "contact_name": {
                                  "description": "Name saved by the connected account owner in their WhatsApp address book.",
                                  "type": "string"
                                }
                              }
                            },
                            {
                              "type": "null"
                            }
                          ]
                        }
                      ]
                    },
                    "background_picture_url": {
                      "description": "URL of the user's background / banner picture.",
                      "type": "string"
                    },
                    "public_picture_url_large": {
                      "description": "URL of the user's public picture in large size.",
                      "type": "string"
                    },
                    "birth_date": {
                      "description": "Birth date of the user.",
                      "type": "string"
                    },
                    "addresses": {
                      "description": "List of user addresses.",
                      "type": "array",
                      "items": {
                        "type": "string"
                      }
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
                    "created_at": {
                      "description": "Date and time when the user account was created on the provider.",
                      "type": "string"
                    },
                    "bio": {
                      "description": "Biography of the user.",
                      "type": "string"
                    },
                    "location": {
                      "description": "Location of the user.",
                      "type": "string"
                    },
                    "muted_until": {
                      "description": "Date and time until when the user is muted. ",
                      "type": "string"
                    },
                    "is_following": {
                      "description": "Whether the user is followed by the current user.",
                      "type": "boolean"
                    },
                    "followers_count": {
                      "description": "Number of followers of the user.",
                      "type": "number"
                    },
                    "following_count": {
                      "description": "Number of users followed by the user.",
                      "type": "number"
                    },
                    "relations_count": {
                      "description": "Number of relations of the user.",
                      "type": "number"
                    },
                    "shared_relations_count": {
                      "description": "Number of users that have a relation with the given profile and with the account owner.",
                      "type": "number"
                    },
                    "shared_followers_count": {
                      "description": "Number of following users that follows the given profile.",
                      "type": "number"
                    },
                    "is_blocked": {
                      "description": "Whether the user is blocked by the current user.",
                      "type": "boolean"
                    },
                    "is_contact": {
                      "description": "Whether the user is saved in the address book of the account owner (if supported by the provider).",
                      "type": "boolean"
                    },
                    "is_verified": {
                      "description": "Whether the user is verified by the provider.",
                      "type": "boolean"
                    },
                    "is_premium": {
                      "description": "Whether the user has a premium subscription with the provider.",
                      "type": "boolean"
                    },
                    "is_deleted": {
                      "description": "Whether the user account was deleted or deactivated.",
                      "type": "boolean"
                    },
                    "is_online": {
                      "description": "Whether the user is currently online (if supported by the provider).",
                      "type": "boolean"
                    },
                    "last_online_at": {
                      "description": "Date and time when the user was last online (if supported by the provider).",
                      "type": "string"
                    },
                    "language": {
                      "description": "Language of the user, as a lowercase ISO 639-1 code (e.g. `fr`).",
                      "type": "string"
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
                    "websites": {
                      "description": "List of user websites.",
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