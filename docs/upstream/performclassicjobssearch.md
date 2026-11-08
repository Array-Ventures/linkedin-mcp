---
updatedAt: 2026-04-24T15:33:11.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Perform Jobs Search

Returns a list of job postings from search results.

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
    "/v2/{account_id}/linkedin/search/jobs": {
      "post": {
        "operationId": "performClassicJobsSearch",
        "summary": "Perform Jobs Search",
        "tags": [
          "LinkedIn"
        ],
        "description": "Returns a list of job postings from search results.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "additionalProperties": false,
                "type": "object",
                "properties": {
                  "keywords": {
                    "description": "A keyword or group of keywords.",
                    "type": "string"
                  },
                  "sort_by": {
                    "description": "The sort method.\n  \nNative filter : Sort by\n  ",
                    "type": "string",
                    "enum": [
                      "RELEVANCE",
                      "DATE"
                    ]
                  },
                  "date_posted": {
                    "description": "The time period when the jobs should have been published.\n  \nNative filter : Date posted\n  ",
                    "type": "string",
                    "enum": [
                      "PAST_DAY",
                      "PAST_WEEK",
                      "PAST_MONTH"
                    ]
                  },
                  "workplace_type": {
                    "description": "A list of workplace types.\n  \nNative filter : Remote\n  ",
                    "type": "array",
                    "items": {
                      "type": "string",
                      "enum": [
                        "ON_SITE",
                        "REMOTE",
                        "HYBRID"
                      ]
                    }
                  },
                  "seniority": {
                    "description": "A list of experience levels required by the jobs.\n  \nNative filter : Experience level\n  ",
                    "type": "array",
                    "items": {
                      "type": "string",
                      "enum": [
                        "INTERNSHIP",
                        "ENTRY_LEVEL",
                        "ASSOCIATE",
                        "MID_SENIOR_LEVEL",
                        "DIRECTOR",
                        "EXECUTIVE"
                      ]
                    }
                  },
                  "employment_status": {
                    "description": "A list of employment statuses.\n  \nNative filter : Job type\n  ",
                    "type": "array",
                    "items": {
                      "type": "string",
                      "enum": [
                        "FULL_TIME",
                        "PART_TIME",
                        "CONTRACT",
                        "TEMPORARY",
                        "VOLUNTEER",
                        "INTERNSHIP",
                        "OTHER"
                      ]
                    }
                  },
                  "company": {
                    "description": "A list of parameter IDs. Use <a href=\"https://developer.unipile.com/v2.0/reference/getclassicsearchparameters\">List Search Parameters</a> with `COMPANY` type to find out the possible values.\n  \nNative filter : Company\n  ",
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  },
                  "primary_location": {
                    "description": "A parameter ID. Use <a href=\"https://developer.unipile.com/v2.0/reference/getclassicsearchparameters\">List Search Parameters</a> with `LOCATION` type to find out the possible values.\n  \nNative filter : Primary location\n  ",
                    "type": "string"
                  },
                  "location": {
                    "description": "A list of parameter IDs. Use <a href=\"https://developer.unipile.com/v2.0/reference/getclassicsearchparameters\">List Search Parameters</a> with `LOCATION` type to find out the possible values.\n  \nNative filter : Location\n  ",
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  },
                  "location_radius": {
                    "description": "The distance radius around the location in kilometers.\n  \nNative filter : Distance\n  ",
                    "type": "number",
                    "enum": [
                      0,
                      8,
                      16,
                      40,
                      80,
                      160
                    ],
                    "anyOf": [
                      {
                        "type": "number",
                        "enum": [
                          0
                        ]
                      },
                      {
                        "type": "number",
                        "enum": [
                          8
                        ]
                      },
                      {
                        "type": "number",
                        "enum": [
                          16
                        ]
                      },
                      {
                        "type": "number",
                        "enum": [
                          40
                        ]
                      },
                      {
                        "type": "number",
                        "enum": [
                          80
                        ]
                      },
                      {
                        "type": "number",
                        "enum": [
                          160
                        ]
                      }
                    ]
                  },
                  "industry": {
                    "description": "A list of parameter IDs. Use <a href=\"https://developer.unipile.com/v2.0/reference/getclassicsearchparameters\">List Search Parameters</a> with `INDUSTRY` type to find out the possible values.\n  \nNative filter : Industry\n  ",
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  },
                  "function": {
                    "description": "A list of parameter IDs. Use <a href=\"https://developer.unipile.com/v2.0/reference/getclassicsearchparameters\">List Search Parameters</a> with `JOB_FUNCTION` type to find out the possible values.\n  \nNative filter : Job function\n  ",
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  },
                  "job_title": {
                    "description": "A list of parameter IDs. Use <a href=\"https://developer.unipile.com/v2.0/reference/getclassicsearchparameters\">List Search Parameters</a> with `JOB_TITLE` type to find out the possible values.\n  \nNative filter : Job title\n  ",
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  },
                  "easy_apply": {
                    "description": "Whether the application can me made directly on LinkedIn.\n  \nNative filter : Easy apply\n  ",
                    "type": "boolean"
                  },
                  "has_verifications": {
                    "description": "Whether the jobs have a verification badge.\n  \nNative filter : Has verifications\n  ",
                    "type": "boolean"
                  },
                  "under_10_applicants": {
                    "description": "Whether the jobs didn't receive more than 10 applications.\n  \nNative filter : Under 10 applicants\n  ",
                    "type": "boolean"
                  },
                  "in_your_network": {
                    "description": "Whether the jobs have been published by relations of you.\n  \nNative filter : In your network\n  ",
                    "type": "boolean"
                  },
                  "fair_chance_employer": {
                    "description": "Whether the jobs accept applicants with criminal records.\n  \nNative filter : Fair chance employer\n  ",
                    "type": "boolean"
                  },
                  "salary": {
                    "description": "The minimum salary.\n  \nNative filter : Salary\n  ",
                    "anyOf": [
                      {
                        "title": "In USD$k",
                        "description": "Only available for jobs located in the US.",
                        "type": "object",
                        "required": [
                          "currency",
                          "starting_from"
                        ],
                        "properties": {
                          "currency": {
                            "type": "string",
                            "enum": [
                              "USD"
                            ]
                          },
                          "starting_from": {
                            "description": "The minimum amount.",
                            "type": "number",
                            "enum": [
                              40,
                              60,
                              80,
                              100,
                              120,
                              140,
                              160,
                              180,
                              200
                            ],
                            "anyOf": [
                              {
                                "type": "number",
                                "enum": [
                                  40
                                ]
                              },
                              {
                                "type": "number",
                                "enum": [
                                  60
                                ]
                              },
                              {
                                "type": "number",
                                "enum": [
                                  80
                                ]
                              },
                              {
                                "type": "number",
                                "enum": [
                                  100
                                ]
                              },
                              {
                                "type": "number",
                                "enum": [
                                  120
                                ]
                              },
                              {
                                "type": "number",
                                "enum": [
                                  140
                                ]
                              },
                              {
                                "type": "number",
                                "enum": [
                                  160
                                ]
                              },
                              {
                                "type": "number",
                                "enum": [
                                  180
                                ]
                              },
                              {
                                "type": "number",
                                "enum": [
                                  200
                                ]
                              }
                            ]
                          }
                        }
                      },
                      {
                        "title": "In AUD$k",
                        "description": "Only available for jobs located in Australia.",
                        "type": "object",
                        "required": [
                          "currency",
                          "starting_from"
                        ],
                        "properties": {
                          "currency": {
                            "type": "string",
                            "enum": [
                              "AUD"
                            ]
                          },
                          "starting_from": {
                            "description": "The minimum amount.",
                            "type": "number",
                            "enum": [
                              40,
                              60,
                              80,
                              100,
                              120,
                              140,
                              160,
                              180,
                              200
                            ],
                            "anyOf": [
                              {
                                "type": "number",
                                "enum": [
                                  40
                                ]
                              },
                              {
                                "type": "number",
                                "enum": [
                                  60
                                ]
                              },
                              {
                                "type": "number",
                                "enum": [
                                  80
                                ]
                              },
                              {
                                "type": "number",
                                "enum": [
                                  100
                                ]
                              },
                              {
                                "type": "number",
                                "enum": [
                                  120
                                ]
                              },
                              {
                                "type": "number",
                                "enum": [
                                  140
                                ]
                              },
                              {
                                "type": "number",
                                "enum": [
                                  160
                                ]
                              },
                              {
                                "type": "number",
                                "enum": [
                                  180
                                ]
                              },
                              {
                                "type": "number",
                                "enum": [
                                  200
                                ]
                              }
                            ]
                          }
                        }
                      },
                      {
                        "title": "In GBP£k",
                        "description": "Only available for jobs located in the UK.",
                        "type": "object",
                        "required": [
                          "currency",
                          "starting_from"
                        ],
                        "properties": {
                          "currency": {
                            "type": "string",
                            "enum": [
                              "GBP"
                            ]
                          },
                          "starting_from": {
                            "description": "The minimum amount.",
                            "type": "number",
                            "enum": [
                              20,
                              30,
                              40,
                              50,
                              60,
                              70,
                              80,
                              90,
                              100
                            ],
                            "anyOf": [
                              {
                                "type": "number",
                                "enum": [
                                  20
                                ]
                              },
                              {
                                "type": "number",
                                "enum": [
                                  30
                                ]
                              },
                              {
                                "type": "number",
                                "enum": [
                                  40
                                ]
                              },
                              {
                                "type": "number",
                                "enum": [
                                  50
                                ]
                              },
                              {
                                "type": "number",
                                "enum": [
                                  60
                                ]
                              },
                              {
                                "type": "number",
                                "enum": [
                                  70
                                ]
                              },
                              {
                                "type": "number",
                                "enum": [
                                  80
                                ]
                              },
                              {
                                "type": "number",
                                "enum": [
                                  90
                                ]
                              },
                              {
                                "type": "number",
                                "enum": [
                                  100
                                ]
                              }
                            ]
                          }
                        }
                      }
                    ]
                  },
                  "benefits": {
                    "description": "A list of benefits.",
                    "type": "array",
                    "items": {
                      "description": "\n  \nNative filter : Benefits\n  ",
                      "type": "string",
                      "enum": [
                        "MEDICAL_INSURANCE",
                        "VISION_INSURANCE",
                        "DENTAL_INSURANCE",
                        "DISABILITY_INSURANCE",
                        "401(K)",
                        "PENSION_PLAN",
                        "PAID_MATERNITY_LEAVE",
                        "PAID_PATERNITY_LEAVE",
                        "COMMUTER_BENEFITS",
                        "STUDENT_LOAN_ASSISTANCE",
                        "TUITION_ASSISTANCE"
                      ]
                    }
                  },
                  "commitments": {
                    "description": "A list of commitments.",
                    "type": "array",
                    "items": {
                      "description": "\n  \nNative filter : Commitments\n  ",
                      "type": "string",
                      "enum": [
                        "CAREER_GROWTH_AND_LEARNING",
                        "DIVERSITY_EQUITY_AND_INCLUSION",
                        "ENVIRONMENTAL_SUSTAINABILITY",
                        "SOCIAL_IMPACT",
                        "WORK_LIFE_BALANCE"
                      ]
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
            "name": "Perform classic jobs search",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipileLinkedIn } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipileLinkedIn = new UnipileLinkedIn({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipileLinkedIn.performClassicJobsSearch(\n  {\n    path: {\n      account_id: ACCOUNT_ID,\n    },\n    body: {\n      keywords: 'value',\n    },\n  }\n);"
          },
          {
            "name": "Perform classic jobs search",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    linked_in_api = unipile.LinkedInApi(api_client)\n\nresponse = linked_in_api.perform_classic_jobs_search(\n    ACCOUNT_ID,\n    {\n    'keywords': 'value',\n  }\n)"
          }
        ],
        "responses": {
          "200": {
            "description": "Default Response",
            "content": {
              "application/json": {
                "schema": {
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