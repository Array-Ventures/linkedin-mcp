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
    "/v2/{account_id}/linkedin/recruiter/projects/{project_id}/talent-pool/applicants/{applicant_id}": {
      "get": {
        "operationId": "getRecruiterApplicantById",
        "summary": "Get an Applicant",
        "tags": [
          "LinkedIn"
        ],
        "description": "Retrieves an applicant by ID.",
        "parameters": [
          {
            "schema": {
              "minLength": 1,
              "type": "string"
            },
            "in": "path",
            "name": "project_id",
            "required": true,
            "description": "The ID of the Hiring Project from which to browse the Talent Pool."
          },
          {
            "schema": {
              "minLength": 1,
              "type": "string"
            },
            "in": "path",
            "name": "applicant_id",
            "required": true,
            "description": "The Profile ID of the Applicant."
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
            "name": "Get recruiter applicant by id",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipileLinkedIn } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipileLinkedIn = new UnipileLinkedIn({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipileLinkedIn.getRecruiterApplicantById(\n  {\n    path: {\n      project_id: 'project_id',\n      applicant_id: 'applicant_id',\n      account_id: ACCOUNT_ID,\n    },\n  }\n);"
          },
          {
            "name": "Get recruiter applicant by id",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    linked_in_api = unipile.LinkedInApi(api_client)\n\nresponse = linked_in_api.get_recruiter_applicant_by_id(\n    'project_id',\n    'applicant_id',\n    ACCOUNT_ID\n)"
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
                        "recruiter"
                      ]
                    },
                    "id": {
                      "description": "The ID of the Applicant.",
                      "type": "string"
                    },
                    "applied_at": {
                      "description": "The date on which the Application was submitted, in ISO 8601 format.",
                      "type": "string"
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
                      "anyOf": [
                        {
                          "title": "Partial profile",
                          "type": "object",
                          "required": [
                            "id",
                            "visibility",
                            "candidate_id",
                            "is_hidden_candidate",
                            "work_experience"
                          ],
                          "properties": {
                            "id": {
                              "description": "The ID of the user.",
                              "type": "string"
                            },
                            "headline": {
                              "description": "The headline of the User.",
                              "type": "string"
                            },
                            "location": {
                              "description": "The location of the User.",
                              "type": "string"
                            },
                            "can_send_inmail": {
                              "description": "Whether it is possible to send an inMail to this User.",
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
                            "visibility": {
                              "description": "Indidates that you don't have access to the full profile of this User.",
                              "type": "string",
                              "enum": [
                                "partial"
                              ]
                            },
                            "candidate_id": {
                              "description": "The candidate ID of the User.",
                              "type": "string"
                            },
                            "is_hidden_candidate": {
                              "description": "Whether the User has been set as hidden candidate.",
                              "type": "boolean"
                            },
                            "hiring_project": {
                              "description": "The hiring project where the User is a candidate.",
                              "type": "object",
                              "required": [
                                "id",
                                "name",
                                "pipeline_stage"
                              ],
                              "properties": {
                                "id": {
                                  "description": "The ID of the project.",
                                  "type": "string"
                                },
                                "name": {
                                  "description": "The name of the project.",
                                  "type": "string"
                                },
                                "pipeline_stage": {
                                  "description": "The pipeline stage at which the User is (contacted, replied, etc.).",
                                  "type": "string"
                                }
                              }
                            },
                            "work_experience": {
                              "description": "A list of the User's work experiences.",
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
                            }
                          }
                        },
                        {
                          "title": "Full profile",
                          "type": "object",
                          "required": [
                            "id",
                            "display_name",
                            "visibility",
                            "candidate_id",
                            "is_hidden_candidate",
                            "is_open_to_work",
                            "is_recently_open_to_work",
                            "is_active_talent",
                            "is_closer_in_network",
                            "work_experience",
                            "skills",
                            "education",
                            "languages",
                            "certifications",
                            "projects",
                            "volunteering",
                            "recommendations"
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
                            "can_send_inmail": {
                              "description": "Whether it is possible to send an inMail to this User.",
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
                            "visibility": {
                              "description": "Indidates that you have access to the full profile of this User.",
                              "type": "string",
                              "enum": [
                                "full"
                              ]
                            },
                            "candidate_id": {
                              "description": "The candidate ID of the User.",
                              "type": "string"
                            },
                            "is_hidden_candidate": {
                              "description": "Whether the User has been set as hidden candidate.",
                              "type": "boolean"
                            },
                            "is_open_to_work": {
                              "description": "Whether the User has an `Open to work` flag.",
                              "type": "boolean"
                            },
                            "is_recently_open_to_work": {
                              "description": "Whether the User has an `Open to work` flag.",
                              "type": "boolean"
                            },
                            "is_active_talent": {
                              "description": "Whether the User has an `Open to work` flag.",
                              "type": "boolean"
                            },
                            "is_closer_in_network": {
                              "description": "Whether the User has an `Open to work` flag.",
                              "type": "boolean"
                            },
                            "interest_level": {
                              "description": "The interest level of the User.",
                              "type": "string"
                            },
                            "hiring_project": {
                              "description": "The hiring project where the User is a candidate.",
                              "type": "object",
                              "required": [
                                "id",
                                "name",
                                "pipeline_stage"
                              ],
                              "properties": {
                                "id": {
                                  "description": "The ID of the project.",
                                  "type": "string"
                                },
                                "name": {
                                  "description": "The name of the project.",
                                  "type": "string"
                                },
                                "pipeline_stage": {
                                  "description": "The pipeline stage at which the User is (contacted, replied, etc.).",
                                  "type": "string"
                                }
                              }
                            },
                            "work_experience": {
                              "description": "A list of the User's work experiences.",
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
                            "industry": {
                              "description": "The industry in which the User works.",
                              "type": "string"
                            },
                            "followers_count": {
                              "description": "The number of the followers of the User.",
                              "type": "number"
                            },
                            "skills": {
                              "description": "A list of skills.",
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
                            "summary": {
                              "description": "The summary of the User.",
                              "type": "string"
                            },
                            "emails": {
                              "type": "array",
                              "items": {
                                "description": "The email addresses associated with the User.",
                                "type": "string"
                              }
                            },
                            "phone_numbers": {
                              "type": "array",
                              "items": {
                                "description": "The phone numbers associated with the User.",
                                "type": "string"
                              }
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
                            "certifications": {
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
                            "projects": {
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
                            "recommendations": {
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