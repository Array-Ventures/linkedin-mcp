---
updatedAt: 2026-04-24T15:33:11.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Edit an Existing Job Posting

Edits an existing job posting from a project.

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
    "/v2/{account_id}/linkedin/recruiter/projects/{project_id}/jobs/{job_id}": {
      "patch": {
        "operationId": "editRecruiterJobPosting",
        "summary": "Edit an Existing Job Posting",
        "tags": [
          "LinkedIn"
        ],
        "description": "Edits an existing job posting from a project.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "additionalProperties": false,
                "type": "object",
                "properties": {
                  "job_title": {
                    "description": "The title of the job.",
                    "type": "object",
                    "required": [
                      "id",
                      "name"
                    ],
                    "properties": {
                      "id": {
                        "description": "A parameter ID. Use <a href=\"https://developer.unipile.com/v2.0/reference/getrecruitersearchparameters\">List Search Parameters</a> with `JOB_TITLE` type to find out the possible values.",
                        "type": "string"
                      },
                      "name": {
                        "description": "The name of the job.",
                        "type": "string"
                      }
                    }
                  },
                  "company": {
                    "description": "The company on whose behalf the job is created.",
                    "minProperties": 1,
                    "type": "object",
                    "properties": {
                      "id": {
                        "description": "A parameter ID. Use <a href=\"https://developer.unipile.com/v2.0/reference/getrecruitersearchparameters\">List Search Parameters</a> with `COMPANY` type to find out the possible values.",
                        "type": "string"
                      },
                      "name": {
                        "description": "The name of the company.",
                        "type": "string"
                      }
                    }
                  },
                  "workplace_type": {
                    "description": "The working method of the job.",
                    "type": "string",
                    "enum": [
                      "ON_SITE",
                      "HYBRID",
                      "REMOTE"
                    ]
                  },
                  "location": {
                    "description": "A parameter ID. Use <a href=\"https://developer.unipile.com/v2.0/reference/getrecruitersearchparameters\">List Search Parameters</a> with `LOCATION` type to find out the possible values.",
                    "type": "string"
                  },
                  "employment_status": {
                    "description": "The employment status of the job.",
                    "type": "string",
                    "enum": [
                      "FULL_TIME",
                      "PART_TIME",
                      "CONTRACT",
                      "TEMPORARY",
                      "OTHER",
                      "VOLUNTEER",
                      "INTERNSHIP"
                    ]
                  },
                  "seniority_level": {
                    "description": "The level of experience of the job.",
                    "type": "string",
                    "enum": [
                      "INTERNSHIP",
                      "ENTRY_LEVEL",
                      "ASSOCIATE",
                      "MID_SENIOR_LEVEL",
                      "DIRECTOR",
                      "EXECUTIVE",
                      "NOT_APPLICABLE"
                    ]
                  },
                  "description": {
                    "description": "The job description. You can use HTML tags to structure your content.",
                    "minLength": 200,
                    "type": "string"
                  },
                  "industry": {
                    "maxItems": 3,
                    "minItems": 1,
                    "description": "A list of parameter IDs. Use <a href=\"https://developer.unipile.com/v2.0/reference/getrecruitersearchparameters\">List Search Parameters</a> with `INDUSTRY` type to find out the possible values. The company industries related to the job posting.",
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  },
                  "job_function": {
                    "maxItems": 3,
                    "minItems": 1,
                    "description": "A list of parameter IDs. Use <a href=\"https://developer.unipile.com/v2.0/reference/getrecruitersearchparameters\">List Search Parameters</a> with `JOB_FUNCTION` type to find out the possible values. The job functions related to the job posting.",
                    "type": "array",
                    "items": {
                      "type": "string",
                      "pattern": "^[A-Z]+$"
                    }
                  },
                  "skills": {
                    "maxItems": 10,
                    "description": "A list of parameter IDs. Use <a href=\"https://developer.unipile.com/v2.0/reference/getrecruitersearchparameters\">List Search Parameters</a> with `SKILL` type to find out the possible values. The skills related to the job posting.",
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  },
                  "include_poster_info": {
                    "description": "Whether basic information about you should be available on the job posting.",
                    "default": true,
                    "type": "boolean"
                  },
                  "tracking_pixel_url": {
                    "description": "The tracking pixel URL of the company.",
                    "type": "string"
                  },
                  "company_job_id": {
                    "description": "The ID of the job in the company's system.",
                    "type": "string"
                  },
                  "apply_method": {
                    "description": "The apply method, either `linkedin` or `external`.",
                    "anyOf": [
                      {
                        "title": "Apply on Linkedin",
                        "type": "object",
                        "required": [
                          "method",
                          "notification_email",
                          "resume_required"
                        ],
                        "properties": {
                          "method": {
                            "type": "string",
                            "enum": [
                              "linkedin"
                            ]
                          },
                          "notification_email": {
                            "description": "An email address to get updates about applicants.",
                            "type": "string"
                          },
                          "resume_required": {
                            "description": "Whether to require a resume from the applicants.",
                            "type": "boolean"
                          }
                        }
                      },
                      {
                        "title": "Apply on external website",
                        "type": "object",
                        "required": [
                          "method",
                          "website_url"
                        ],
                        "properties": {
                          "method": {
                            "type": "string",
                            "enum": [
                              "external"
                            ]
                          },
                          "website_url": {
                            "description": "The website on which applications should be made.",
                            "type": "string"
                          }
                        }
                      }
                    ]
                  },
                  "screening_questions": {
                    "description": "The questions to be asked to the applicants.",
                    "type": "array",
                    "items": {
                      "anyOf": [
                        {
                          "title": "Numeric answer",
                          "description": "A question with numeric anwser.",
                          "type": "object",
                          "required": [
                            "question",
                            "answer_type",
                            "suggested_value"
                          ],
                          "properties": {
                            "question": {
                              "description": "The question that must be asked.",
                              "type": "string"
                            },
                            "qualification_required": {
                              "description": "Whether the applicant should be disqualified if the answer doesn't match what is expected.",
                              "default": false,
                              "type": "boolean"
                            },
                            "answer_type": {
                              "type": "string",
                              "enum": [
                                "numeric"
                              ]
                            },
                            "min_expectation": {
                              "description": "A minimum expectation.",
                              "type": "number"
                            },
                            "max_expectation": {
                              "description": "A maximum expectation.",
                              "type": "number"
                            },
                            "suggested_value": {
                              "description": "A suggested value.",
                              "type": "number"
                            }
                          }
                        },
                        {
                          "title": "Multiple choices",
                          "description": "A question with multiple choices anwser.",
                          "type": "object",
                          "required": [
                            "question",
                            "answer_type",
                            "choices",
                            "expected_choices",
                            "suggested_value"
                          ],
                          "properties": {
                            "question": {
                              "description": "The question that must be asked.",
                              "type": "string"
                            },
                            "qualification_required": {
                              "description": "Whether the applicant should be disqualified if the answer doesn't match what is expected.",
                              "default": false,
                              "type": "boolean"
                            },
                            "answer_type": {
                              "type": "string",
                              "enum": [
                                "multiple_choices"
                              ]
                            },
                            "choices": {
                              "description": "A list of choices.",
                              "type": "array",
                              "items": {
                                "type": "string"
                              }
                            },
                            "expected_choices": {
                              "description": "A list of ideal choices.",
                              "type": "array",
                              "items": {
                                "type": "string"
                              }
                            },
                            "suggested_value": {
                              "description": "A suggested value.",
                              "type": "string"
                            }
                          }
                        }
                      ]
                    }
                  },
                  "salary": {
                    "description": "The base salary for the job.",
                    "type": "object",
                    "required": [
                      "currency",
                      "pay_frequency",
                      "min",
                      "max"
                    ],
                    "properties": {
                      "currency": {
                        "type": "string",
                        "pattern": "^[A-Z]{3}$"
                      },
                      "pay_frequency": {
                        "description": "The frequency at which the compensation is paid.",
                        "type": "string",
                        "enum": [
                          "YEARLY",
                          "MONTHLY",
                          "HOURLY"
                        ]
                      },
                      "min": {
                        "description": "The minimum in the compensation range.",
                        "type": "number"
                      },
                      "max": {
                        "description": "The maximum in the compensation range.",
                        "type": "number"
                      }
                    }
                  },
                  "additional_compensation": {
                    "description": "Any additional compensation for the job.",
                    "type": "object",
                    "required": [
                      "currency",
                      "pay_frequency",
                      "min",
                      "max"
                    ],
                    "properties": {
                      "currency": {
                        "type": "string",
                        "pattern": "^[A-Z]{3}$"
                      },
                      "pay_frequency": {
                        "description": "The frequency at which the compensation is paid.",
                        "type": "string",
                        "enum": [
                          "YEARLY",
                          "MONTHLY",
                          "HOURLY"
                        ]
                      },
                      "min": {
                        "description": "The minimum in the compensation range.",
                        "type": "number"
                      },
                      "max": {
                        "description": "The maximum in the compensation range.",
                        "type": "number"
                      }
                    }
                  },
                  "rejection_settings": {
                    "description": "The settings for automated rejection system.",
                    "type": "object",
                    "properties": {
                      "send_rejection_notification": {
                        "description": "Whether rejected applicants should receive a notification.",
                        "default": true,
                        "type": "boolean"
                      },
                      "rejection_template": {
                        "description": "The textual content that will be sent to rejected applicants.",
                        "type": "string"
                      },
                      "reject_unqualified_applicants": {
                        "description": "Whether to archive applicants who don’t meet any must-have qualifications.",
                        "default": true,
                        "type": "boolean"
                      },
                      "reject_out_of_country_applicants": {
                        "description": "Whether to archive applicants who live outside the country where the job is located.",
                        "default": true,
                        "type": "boolean"
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "parameters": [
          {
            "schema": {
              "type": "string"
            },
            "in": "path",
            "name": "project_id",
            "required": true,
            "description": "The ID of the project associated with the the job."
          },
          {
            "schema": {
              "type": "string"
            },
            "in": "path",
            "name": "job_id",
            "required": true,
            "description": "The ID of the job to be edited."
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
            "name": "Edit recruiter job posting",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipileLinkedIn } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipileLinkedIn = new UnipileLinkedIn({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipileLinkedIn.editRecruiterJobPosting(\n  {\n    path: {\n      project_id: 'project_id',\n      job_id: 'job_id',\n      account_id: ACCOUNT_ID,\n    },\n    body: {\n      job_title: {\n        id: 'value',\n        name: 'My Name',\n      },\n    },\n  }\n);"
          },
          {
            "name": "Edit recruiter job posting",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    linked_in_api = unipile.LinkedInApi(api_client)\n\nresponse = linked_in_api.edit_recruiter_job_posting(\n    'project_id',\n    'job_id',\n    ACCOUNT_ID,\n    {\n    'job_title': {\n      'id': 'value',\n      'name': 'My Name',\n    },\n  }\n)"
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
                    "object"
                  ],
                  "properties": {
                    "object": {
                      "type": "string",
                      "enum": [
                        "JobPostingEdited"
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