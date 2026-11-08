---
updatedAt: 2026-04-24T15:33:11.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Get an Applicant

Retrieves an applicant by ID.

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
    "/v2/{account_id}/linkedin/jobs/{job_id}/applicants/{applicant_id}": {
      "get": {
        "operationId": "getClassicApplicantById",
        "summary": "Get an Applicant",
        "tags": [
          "LinkedIn"
        ],
        "description": "Retrieves an applicant by ID.",
        "parameters": [
          {
            "schema": {
              "type": "string"
            },
            "in": "path",
            "name": "job_id",
            "required": true,
            "description": "The ID of the Job the Applicant applied to."
          },
          {
            "schema": {
              "type": "string"
            },
            "in": "path",
            "name": "applicant_id",
            "required": true,
            "description": "The ID of the Applicant."
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
            "name": "Get classic applicant by id",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipileLinkedIn } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipileLinkedIn = new UnipileLinkedIn({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipileLinkedIn.getClassicApplicantById(\n  {\n    path: {\n      job_id: 'job_id',\n      applicant_id: 'applicant_id',\n      account_id: ACCOUNT_ID,\n    },\n  }\n);"
          },
          {
            "name": "Get classic applicant by id",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    linked_in_api = unipile.LinkedInApi(api_client)\n\nresponse = linked_in_api.get_classic_applicant_by_id(\n    'job_id',\n    'applicant_id',\n    ACCOUNT_ID\n)"
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
                    "product",
                    "id",
                    "messaging_token",
                    "applied_at",
                    "profile"
                  ],
                  "properties": {
                    "object": {
                      "type": "string",
                      "enum": [
                        "JobApplicant"
                      ]
                    },
                    "product": {
                      "type": "string",
                      "enum": [
                        "classic"
                      ]
                    },
                    "id": {
                      "description": "The ID of the Applicant.",
                      "type": "string"
                    },
                    "messaging_token": {
                      "description": "A mandatory token required to initiate a direct conversation.",
                      "type": "string"
                    },
                    "applied_at": {
                      "description": "The date on which the Application was submitted. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                      "type": "string"
                    },
                    "viewed_at": {
                      "description": "The date on which the Application was first viewed. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                      "type": "string"
                    },
                    "last_messaged_at": {
                      "description": "The date on which the Applicant was last messaged. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                      "type": "string"
                    },
                    "rating": {
                      "description": "The rating that has been set for the Applicant.",
                      "type": "string",
                      "enum": [
                        "GOOD_FIT",
                        "MAYBE",
                        "NOT_A_FIT"
                      ]
                    },
                    "contact_info": {
                      "description": "Contact informations of the Applicant.",
                      "type": "object",
                      "required": [
                        "email",
                        "phone"
                      ],
                      "properties": {
                        "email": {
                          "anyOf": [
                            {
                              "description": "The email address of the Applicant.",
                              "type": "string"
                            },
                            {
                              "type": "null"
                            }
                          ]
                        },
                        "phone": {
                          "anyOf": [
                            {
                              "description": "The phone number of the Applicant.",
                              "type": "string"
                            },
                            {
                              "type": "null"
                            }
                          ]
                        }
                      }
                    },
                    "has_resume": {
                      "description": "Whether the Applicant has a downloadable resume available.",
                      "type": "boolean"
                    },
                    "screening_questions": {
                      "description": "The responses to the job posting screening questions.",
                      "type": "array",
                      "items": {
                        "type": "object",
                        "required": [
                          "question",
                          "has_succedeed",
                          "is_eliminatory",
                          "answers"
                        ],
                        "properties": {
                          "question": {
                            "description": "The text of the question.",
                            "type": "string"
                          },
                          "has_succedeed": {
                            "description": "Whether the Applicant successfully answered the question.",
                            "type": "boolean"
                          },
                          "is_eliminatory": {
                            "description": "Whether an unexpected answer is considered a disqualifying factor.",
                            "type": "boolean"
                          },
                          "answers": {
                            "description": "A list of answers given by the Applicant.",
                            "type": "array",
                            "items": {
                              "type": "string"
                            }
                          }
                        }
                      }
                    },
                    "profile": {
                      "description": "The user profile of the Applicant.",
                      "type": "object",
                      "required": [
                        "id",
                        "display_name",
                        "headline",
                        "location",
                        "network_distance",
                        "profile_url",
                        "work_experience",
                        "educations"
                      ],
                      "properties": {
                        "id": {
                          "description": "The ID of the User profile.",
                          "type": "string"
                        },
                        "display_name": {
                          "description": "The display name of the User profile.",
                          "type": "string"
                        },
                        "headline": {
                          "description": "The headline of the User profile.",
                          "type": "string"
                        },
                        "public_identifier": {
                          "description": "The public identifier of the User profile.",
                          "type": "string"
                        },
                        "location": {
                          "description": "The location of the User profile.",
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
                        "profile_url": {
                          "description": "The URL of the User profile.",
                          "type": "string"
                        },
                        "public_picture_url": {
                          "description": "The picture URL of the User profile.",
                          "type": "string"
                        },
                        "work_experience": {
                          "description": "A list of Work experiences.",
                          "type": "array",
                          "items": {
                            "type": "object",
                            "required": [
                              "company",
                              "title"
                            ],
                            "properties": {
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
                              "title": {
                                "description": "The position name in the experience.",
                                "type": "string"
                              },
                              "started_on": {
                                "description": "The start date of the experience in MM/DD/YYYY format.",
                                "type": "string"
                              },
                              "ended_on": {
                                "description": "The end date of the experience in MM/DD/YYYY format.",
                                "type": "string"
                              },
                              "location": {
                                "description": "The location of the experience.",
                                "type": "string"
                              },
                              "description": {
                                "description": "The description of the experience.",
                                "type": "string"
                              },
                              "employment_type": {
                                "description": "The employment type of the experience.",
                                "type": "string"
                              }
                            }
                          }
                        },
                        "educations": {
                          "description": "A list of Experiences.",
                          "type": "array",
                          "items": {
                            "type": "object",
                            "required": [
                              "school"
                            ],
                            "properties": {
                              "school": {
                                "type": "object",
                                "required": [
                                  "id",
                                  "name"
                                ],
                                "properties": {
                                  "id": {
                                    "anyOf": [
                                      {
                                        "description": "The unique identifier of the school.",
                                        "type": "string"
                                      },
                                      {
                                        "type": "null"
                                      }
                                    ]
                                  },
                                  "name": {
                                    "description": "The name of the school.",
                                    "type": "string"
                                  },
                                  "picture_url": {
                                    "description": "The public url to the profile picture of the school.",
                                    "type": "string"
                                  },
                                  "profile_url": {
                                    "description": "The public url to the profile of the school.",
                                    "type": "string"
                                  }
                                }
                              },
                              "degree": {
                                "description": "The name of the degree.",
                                "type": "string"
                              },
                              "description": {
                                "description": "The description of the education.",
                                "type": "string"
                              },
                              "field_of_study": {
                                "description": "The field of study of the education.",
                                "type": "string"
                              },
                              "grade": {
                                "description": "The reached academic level of the education.",
                                "type": "string"
                              },
                              "started_on": {
                                "description": "The start date of the education in MM/DD/YYYY format.",
                                "type": "string"
                              },
                              "ended_on": {
                                "description": "The end date of the education in MM/DD/YYYY format.",
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