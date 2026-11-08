---
updatedAt: 2026-04-24T15:33:11.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Create a Job Posting Draft

Creates a new job posting as draft.
      Use <a href="https://developer.unipile.com/v2.0/reference/publishclassicjobposting">Publish a Job Posting</a> to publish the job once you are ready.
      

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
    "/v2/{account_id}/linkedin/jobs": {
      "post": {
        "operationId": "createClassicJobPostingDraft",
        "summary": "Create a Job Posting Draft",
        "tags": [
          "LinkedIn"
        ],
        "description": "Creates a new job posting as draft.\n      Use <a href=\"https://developer.unipile.com/v2.0/reference/publishclassicjobposting\">Publish a Job Posting</a> to publish the job once you are ready.\n      ",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "additionalProperties": false,
                "type": "object",
                "required": [
                  "job_title",
                  "company",
                  "workplace_type",
                  "location",
                  "employment_status",
                  "description",
                  "apply_method"
                ],
                "properties": {
                  "job_title": {
                    "description": "The title of the job.",
                    "minProperties": 1,
                    "type": "object",
                    "properties": {
                      "id": {
                        "description": "A parameter ID. Use <a href=\"https://developer.unipile.com/v2.0/reference/getclassicsearchparameters\">List Search Parameters</a> with `JOB_TITLE` type to find out the possible values.",
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
                        "description": "A parameter ID. Use <a href=\"https://developer.unipile.com/v2.0/reference/getclassicsearchparameters\">List Search Parameters</a> with `COMPANY` type to find out the possible values.",
                        "type": "string"
                      },
                      "name": {
                        "description": "The name of the company.",
                        "type": "string"
                      }
                    }
                  },
                  "workplace_type": {
                    "description": "The workplace type of the job.",
                    "type": "string",
                    "enum": [
                      "ON_SITE",
                      "HYBRID",
                      "REMOTE"
                    ]
                  },
                  "location": {
                    "description": "A parameter ID. Use <a href=\"https://developer.unipile.com/v2.0/reference/getclassicsearchparameters\">List Search Parameters</a> with `LOCATION` type to find out the possible values.",
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
                  "description": {
                    "description": "The job description. You can use HTML tags to structure your content.",
                    "minLength": 200,
                    "type": "string"
                  },
                  "skills": {
                    "description": "A list of parameter IDs. Use <a href=\"https://developer.unipile.com/v2.0/reference/getclassicsearchparameters\">List Search Parameters</a> with `SKILL` type to find out the possible values. The skills related to the job posting.",
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  },
                  "apply_method": {
                    "description": "The apply method, either `linkedin` or `external`.",
                    "anyOf": [
                      {
                        "title": "Apply on Linkedin",
                        "type": "object",
                        "required": [
                          "method",
                          "notification_email"
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
                  "rejection_settings": {
                    "description": "The settings for automated rejection system.",
                    "type": "object",
                    "properties": {
                      "reject_unqualified_applicants": {
                        "description": "Whether to filter out and send rejections to applicants who don’t meet any must-have qualifications.",
                        "default": true,
                        "type": "boolean"
                      },
                      "rejection_template": {
                        "description": "The textual content that will be sent to rejected applicants.",
                        "type": "string"
                      }
                    }
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
            "name": "Create classic job posting draft",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipileLinkedIn } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipileLinkedIn = new UnipileLinkedIn({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipileLinkedIn.createClassicJobPostingDraft(\n  {\n    path: {\n      account_id: ACCOUNT_ID,\n    },\n    body: {\n      job_title: {\n        id: 'value',\n      },\n      company: {\n        id: 'value',\n      },\n      workplace_type: 'ON_SITE',\n      location: 'value',\n      employment_status: 'FULL_TIME',\n      description: 'Description',\n      apply_method: {\n        method: 'linkedin',\n        notification_email: 'value',\n      },\n    },\n  }\n);"
          },
          {
            "name": "Create classic job posting draft",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    linked_in_api = unipile.LinkedInApi(api_client)\n\nresponse = linked_in_api.create_classic_job_posting_draft(\n    ACCOUNT_ID,\n    {\n    'job_title': {\n      'id': 'value',\n    },\n    'company': {\n      'id': 'value',\n    },\n    'workplace_type': 'ON_SITE',\n    'location': 'value',\n    'employment_status': 'FULL_TIME',\n    'description': 'Description',\n    'apply_method': {\n      'method': 'linkedin',\n      'notification_email': 'value',\n    },\n  }\n)"
          }
        ],
        "responses": {
          "201": {
            "description": "Default Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "required": [
                    "object",
                    "job_id"
                  ],
                  "properties": {
                    "object": {
                      "type": "string",
                      "enum": [
                        "JobPostingCreated"
                      ]
                    },
                    "job_id": {
                      "description": "The ID of the newly created Job posting.",
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