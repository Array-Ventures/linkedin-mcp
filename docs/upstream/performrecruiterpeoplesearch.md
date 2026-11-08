---
updatedAt: 2026-04-24T15:33:11.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Perform People Search

Returns a list of people from search results.

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
    "/v2/{account_id}/linkedin/recruiter/search/people": {
      "post": {
        "operationId": "performRecruiterPeopleSearch",
        "summary": "Perform People Search",
        "tags": [
          "LinkedIn"
        ],
        "description": "Returns a list of people from search results.",
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
                  "spotlights": {
                    "description": "A list of spotlights.",
                    "type": "array",
                    "items": {
                      "description": "Smart filter to help you prioritize applicants.\n  \nNative filter : Spotlights\n  ",
                      "type": "string",
                      "enum": [
                        "OPEN_TO_WORK",
                        "ACTIVE_TALENT",
                        "REDISCOVERED_CANDIDATES",
                        "INTERNAL_CANDIDATES",
                        "INTERESTED_IN_YOUR_COMPANY",
                        "HAVE_COMPANY_CONNECTIONS"
                      ]
                    }
                  },
                  "load_saved_search": {
                    "description": "Saved search to be loaded. Can be associated with other filters.",
                    "type": "object",
                    "required": [
                      "id"
                    ],
                    "properties": {
                      "id": {
                        "description": "A parameter ID. Use <a href=\"https://developer.unipile.com/v2.0/reference/getrecruitersearchparameters\">List Search Parameters</a> with `SAVED_SEARCH` type to find out the possible values.\n  \nNative filter : Saved searches\n  ",
                        "type": "string"
                      },
                      "new_results_only": {
                        "description": "Whether only newest results should be returned.",
                        "type": "boolean"
                      }
                    }
                  },
                  "load_custom_filter": {
                    "description": "Custom filter to be loaded. Can be associated with other filters.",
                    "type": "object",
                    "required": [
                      "id"
                    ],
                    "properties": {
                      "id": {
                        "description": "A parameter ID. Use <a href=\"https://developer.unipile.com/v2.0/reference/getrecruitersearchparameters\">List Search Parameters</a> with `CUSTOM_FILTER` type to find out the possible values.\n  \nNative filter : Custom filters\n  ",
                        "type": "string"
                      }
                    }
                  },
                  "save_search": {
                    "description": "Allows you to save the current search.",
                    "type": "object",
                    "required": [
                      "name",
                      "project_id"
                    ],
                    "properties": {
                      "name": {
                        "description": "A name to identify the search.",
                        "type": "string"
                      },
                      "project_id": {
                        "description": "The ID of the project where the search should be saved.",
                        "type": "string"
                      }
                    }
                  },
                  "save_custom_filter": {
                    "description": "Allows you to save the current search as custom filter.",
                    "type": "object",
                    "required": [
                      "name"
                    ],
                    "properties": {
                      "name": {
                        "description": "A name to identify the filter.",
                        "type": "string"
                      }
                    }
                  },
                  "network_distance": {
                    "description": "A list of connection degrees (1 for First, 2 for Second, 3 for Third+ and GROUP for Common group members).\n  \nNative filter : Connections\n  ",
                    "type": "array",
                    "items": {
                      "anyOf": [
                        {
                          "type": "number",
                          "enum": [
                            1,
                            2,
                            3
                          ],
                          "anyOf": [
                            {
                              "type": "number",
                              "enum": [
                                1
                              ]
                            },
                            {
                              "type": "number",
                              "enum": [
                                2
                              ]
                            },
                            {
                              "type": "number",
                              "enum": [
                                3
                              ]
                            }
                          ]
                        },
                        {
                          "type": "string",
                          "enum": [
                            "GROUP"
                          ]
                        }
                      ]
                    }
                  },
                  "location": {
                    "description": "A list of locations.",
                    "type": "array",
                    "items": {
                      "type": "object",
                      "required": [
                        "id"
                      ],
                      "properties": {
                        "id": {
                          "description": "A parameter ID. Use <a href=\"https://developer.unipile.com/v2.0/reference/getrecruitersearchparameters\">List Search Parameters</a> with `LOCATION` type to find out the possible values.\n  \nNative filter : Locations\n  ",
                          "type": "string"
                        },
                        "priority": {
                          "description": "Whether the user can, must or shouldn't have the value.\n  \nNative filter : Priority\n  ",
                          "default": "CAN_HAVE",
                          "type": "string",
                          "enum": [
                            "CAN_HAVE",
                            "MUST_HAVE",
                            "DOESNT_HAVE"
                          ]
                        },
                        "preferences": {
                          "description": "Indicates the location preference of the user.\n  \n  ",
                          "default": "CURRENT",
                          "type": "string",
                          "enum": [
                            "CURRENT",
                            "OPEN_TO_RELOCATE_ONLY",
                            "CURRENT_OR_OPEN_TO_RELOCATE"
                          ]
                        }
                      }
                    }
                  },
                  "postal_code": {
                    "description": "A list of postal codes.",
                    "type": "array",
                    "items": {
                      "type": "object",
                      "required": [
                        "name",
                        "id"
                      ],
                      "properties": {
                        "name": {
                          "description": "The postal code location name.",
                          "type": "string"
                        },
                        "id": {
                          "description": "A parameter ID. Use <a href=\"https://developer.unipile.com/v2.0/reference/getrecruitersearchparameters\">List Search Parameters</a> with `ZIPCODE` type to find out the possible values.\n  \nNative filter : Postal code / Zip code\n  ",
                          "type": "string"
                        }
                      }
                    }
                  },
                  "postal_code_radius": {
                    "description": "The distance radius around the postal code in miles.\n  \nNative filter : Within area\n  ",
                    "type": "number",
                    "enum": [
                      1,
                      5,
                      10,
                      25,
                      50,
                      100,
                      200
                    ],
                    "anyOf": [
                      {
                        "type": "number",
                        "enum": [
                          1
                        ]
                      },
                      {
                        "type": "number",
                        "enum": [
                          5
                        ]
                      },
                      {
                        "type": "number",
                        "enum": [
                          10
                        ]
                      },
                      {
                        "type": "number",
                        "enum": [
                          25
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
                          100
                        ]
                      },
                      {
                        "type": "number",
                        "enum": [
                          200
                        ]
                      }
                    ]
                  },
                  "job_title": {
                    "description": "A list of job titles.",
                    "type": "array",
                    "items": {
                      "description": "\n  \nNative filter : Job titles\n  ",
                      "type": "object",
                      "required": [
                        "name"
                      ],
                      "properties": {
                        "name": {
                          "description": "The job title.",
                          "type": "string"
                        },
                        "id": {
                          "description": "A parameter ID. Use <a href=\"https://developer.unipile.com/v2.0/reference/getrecruitersearchparameters\">List Search Parameters</a> with `JOB_TITLE` type to find out the possible values.",
                          "type": "string"
                        },
                        "priority": {
                          "description": "Whether the user can, must or shouldn't have the value.\n  \nNative filter : Priority\n  ",
                          "default": "CAN_HAVE",
                          "type": "string",
                          "enum": [
                            "CAN_HAVE",
                            "MUST_HAVE",
                            "DOESNT_HAVE"
                          ]
                        },
                        "preferences": {
                          "description": "Indicates how this professional experience relates to the user's current employment status.\n  \n  ",
                          "default": "CURRENT_OR_PAST",
                          "type": "string",
                          "enum": [
                            "CURRENT",
                            "CURRENT_OR_PAST",
                            "PAST",
                            "PAST_NOT_CURRENT",
                            "OPEN_TO_WORK"
                          ]
                        }
                      }
                    }
                  },
                  "occupation": {
                    "description": "A list of occupations.",
                    "type": "array",
                    "items": {
                      "description": "Occupations are selections of job titles in the same industry.\n  \nNative filter : Occupations\n  ",
                      "type": "object",
                      "required": [
                        "name"
                      ],
                      "properties": {
                        "name": {
                          "description": "The occupation name.",
                          "type": "string"
                        },
                        "id": {
                          "description": "A parameter ID. Use <a href=\"https://developer.unipile.com/v2.0/reference/getrecruitersearchparameters\">List Search Parameters</a> with `OCCUPATION` type to find out the possible values.",
                          "type": "string"
                        },
                        "priority": {
                          "description": "Whether the user can, must or shouldn't have the value.\n  \nNative filter : Priority\n  ",
                          "default": "CAN_HAVE",
                          "type": "string",
                          "enum": [
                            "CAN_HAVE",
                            "MUST_HAVE",
                            "DOESNT_HAVE"
                          ]
                        },
                        "preferences": {
                          "description": "Indicates how this professional experience relates to the user's current employment status.\n  \n  ",
                          "default": "CURRENT_OR_PAST",
                          "type": "string",
                          "enum": [
                            "CURRENT",
                            "CURRENT_OR_PAST",
                            "PAST",
                            "PAST_NOT_CURRENT",
                            "OPEN_TO_WORK"
                          ]
                        }
                      }
                    }
                  },
                  "skills": {
                    "description": "A list of skills.",
                    "type": "array",
                    "items": {
                      "type": "object",
                      "required": [
                        "name"
                      ],
                      "properties": {
                        "name": {
                          "description": "The skill name.",
                          "type": "string"
                        },
                        "id": {
                          "description": "A parameter ID. Use <a href=\"https://developer.unipile.com/v2.0/reference/getrecruitersearchparameters\">List Search Parameters</a> with `SKILL` type to find out the possible values.",
                          "type": "string"
                        },
                        "priority": {
                          "description": "Whether the user can, must or shouldn't have the value.\n  \nNative filter : Priority\n  ",
                          "default": "CAN_HAVE",
                          "type": "string",
                          "enum": [
                            "CAN_HAVE",
                            "MUST_HAVE",
                            "DOESNT_HAVE"
                          ]
                        }
                      }
                    }
                  },
                  "company": {
                    "description": "A list of companies.",
                    "type": "array",
                    "items": {
                      "type": "object",
                      "required": [
                        "name"
                      ],
                      "properties": {
                        "name": {
                          "description": "The company name.",
                          "type": "string"
                        },
                        "id": {
                          "description": "A parameter ID. Use <a href=\"https://developer.unipile.com/v2.0/reference/getrecruitersearchparameters\">List Search Parameters</a> with `COMPANY` type to find out the possible values.",
                          "type": "string"
                        },
                        "priority": {
                          "description": "Whether the user can, must or shouldn't have the value.\n  \nNative filter : Priority\n  ",
                          "default": "CAN_HAVE",
                          "type": "string",
                          "enum": [
                            "CAN_HAVE",
                            "MUST_HAVE",
                            "DOESNT_HAVE"
                          ]
                        },
                        "preferences": {
                          "description": "Indicates how this company relates to the user's professionnal history.\n  \n  ",
                          "default": "CURRENT_OR_PAST",
                          "type": "string",
                          "enum": [
                            "CURRENT",
                            "CURRENT_OR_PAST",
                            "PAST",
                            "PAST_NOT_CURRENT"
                          ]
                        }
                      }
                    }
                  },
                  "current_company": {
                    "description": "A list of current companies.",
                    "type": "array",
                    "items": {
                      "type": "object",
                      "required": [
                        "id"
                      ],
                      "properties": {
                        "id": {
                          "description": "A parameter ID. Use <a href=\"https://developer.unipile.com/v2.0/reference/getrecruitersearchparameters\">List Search Parameters</a> with `COMPANY` type to find out the possible values.",
                          "type": "string"
                        },
                        "priority": {
                          "description": "Whether the user can, must or shouldn't have the value.\n  \nNative filter : Priority\n  ",
                          "default": "CAN_HAVE",
                          "type": "string",
                          "enum": [
                            "CAN_HAVE",
                            "MUST_HAVE",
                            "DOESNT_HAVE"
                          ]
                        }
                      }
                    }
                  },
                  "past_company": {
                    "description": "A list of past companies.",
                    "type": "array",
                    "items": {
                      "type": "object",
                      "required": [
                        "id"
                      ],
                      "properties": {
                        "id": {
                          "description": "A parameter ID. Use <a href=\"https://developer.unipile.com/v2.0/reference/getrecruitersearchparameters\">List Search Parameters</a> with `COMPANY` type to find out the possible values.",
                          "type": "string"
                        },
                        "priority": {
                          "description": "Whether the user can, must or shouldn't have the value.\n  \nNative filter : Priority\n  ",
                          "default": "CAN_HAVE",
                          "type": "string",
                          "enum": [
                            "CAN_HAVE",
                            "MUST_HAVE",
                            "DOESNT_HAVE"
                          ]
                        }
                      }
                    }
                  },
                  "company_size": {
                    "description": "A list of company size ranges.",
                    "type": "array",
                    "items": {
                      "description": "\n  \nNative filter : Company sizes\n  ",
                      "type": "object",
                      "properties": {
                        "min": {
                          "type": "number",
                          "enum": [
                            1,
                            51,
                            201,
                            501,
                            1001,
                            5001,
                            10001
                          ],
                          "anyOf": [
                            {
                              "type": "number",
                              "enum": [
                                1
                              ]
                            },
                            {
                              "type": "number",
                              "enum": [
                                51
                              ]
                            },
                            {
                              "type": "number",
                              "enum": [
                                201
                              ]
                            },
                            {
                              "type": "number",
                              "enum": [
                                501
                              ]
                            },
                            {
                              "type": "number",
                              "enum": [
                                1001
                              ]
                            },
                            {
                              "type": "number",
                              "enum": [
                                5001
                              ]
                            },
                            {
                              "type": "number",
                              "enum": [
                                10001
                              ]
                            }
                          ]
                        },
                        "max": {
                          "type": "number",
                          "enum": [
                            0,
                            10,
                            200,
                            500,
                            1000,
                            5000,
                            10000
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
                                10
                              ]
                            },
                            {
                              "type": "number",
                              "enum": [
                                200
                              ]
                            },
                            {
                              "type": "number",
                              "enum": [
                                500
                              ]
                            },
                            {
                              "type": "number",
                              "enum": [
                                1000
                              ]
                            },
                            {
                              "type": "number",
                              "enum": [
                                5000
                              ]
                            },
                            {
                              "type": "number",
                              "enum": [
                                10000
                              ]
                            }
                          ]
                        }
                      }
                    }
                  },
                  "years_of_experience": {
                    "description": "\n  \nNative filter : Years of experience\n  ",
                    "type": "object",
                    "required": [
                      "min",
                      "max"
                    ],
                    "properties": {
                      "min": {
                        "maximum": 30,
                        "type": "number"
                      },
                      "max": {
                        "maximum": 30,
                        "type": "number"
                      }
                    }
                  },
                  "years_in_current_position": {
                    "description": "\n  \nNative filter : Years in current position\n  ",
                    "type": "object",
                    "required": [
                      "min",
                      "max"
                    ],
                    "properties": {
                      "min": {
                        "maximum": 30,
                        "type": "number"
                      },
                      "max": {
                        "maximum": 30,
                        "type": "number"
                      }
                    }
                  },
                  "years_in_current_company": {
                    "description": "\n  \nNative filter : Years in current company\n  ",
                    "type": "object",
                    "required": [
                      "min",
                      "max"
                    ],
                    "properties": {
                      "min": {
                        "maximum": 30,
                        "type": "number"
                      },
                      "max": {
                        "maximum": 30,
                        "type": "number"
                      }
                    }
                  },
                  "degree": {
                    "description": "\n  \nNative filter : Degrees\n  ",
                    "type": "object",
                    "properties": {
                      "include": {
                        "description": "A list of parameter IDs. Use <a href=\"https://developer.unipile.com/v2.0/reference/getrecruitersearchparameters\">List Search Parameters</a> with `DEGREE` type to find out the possible values.",
                        "type": "array",
                        "items": {
                          "type": "string"
                        }
                      },
                      "exclude": {
                        "description": "A list of parameter IDs. Use <a href=\"https://developer.unipile.com/v2.0/reference/getrecruitersearchparameters\">List Search Parameters</a> with `DEGREE` type to find out the possible values.",
                        "type": "array",
                        "items": {
                          "type": "string"
                        }
                      }
                    }
                  },
                  "workplace_type": {
                    "description": "A list of workplace types.",
                    "type": "array",
                    "items": {
                      "type": "string",
                      "enum": [
                        "ON_SITE",
                        "HYBRID",
                        "REMOTE"
                      ]
                    }
                  },
                  "school": {
                    "description": "A list of schools.",
                    "type": "array",
                    "items": {
                      "type": "object",
                      "required": [
                        "id"
                      ],
                      "properties": {
                        "id": {
                          "description": "A parameter ID. Use <a href=\"https://developer.unipile.com/v2.0/reference/getrecruitersearchparameters\">List Search Parameters</a> with `SCHOOL` type to find out the possible values.\n  \nNative filter : Schools\n  ",
                          "type": "string"
                        },
                        "priority": {
                          "description": "Whether the user can, must or shouldn't have the value.\n  \nNative filter : Priority\n  ",
                          "default": "CAN_HAVE",
                          "type": "string",
                          "enum": [
                            "CAN_HAVE",
                            "MUST_HAVE",
                            "DOESNT_HAVE"
                          ]
                        }
                      }
                    }
                  },
                  "field_of_study": {
                    "description": "A list of fields of study.",
                    "type": "array",
                    "items": {
                      "description": "\n  \nNative filter : Fields of study\n  ",
                      "type": "object",
                      "required": [
                        "id"
                      ],
                      "properties": {
                        "id": {
                          "description": "A parameter ID. Use <a href=\"https://developer.unipile.com/v2.0/reference/getrecruitersearchparameters\">List Search Parameters</a> with `FIELD_OF_STUDY` type to find out the possible values.",
                          "type": "string"
                        },
                        "priority": {
                          "description": "Whether the user can, must or shouldn't have the value.\n  \nNative filter : Priority\n  ",
                          "default": "CAN_HAVE",
                          "type": "string",
                          "enum": [
                            "CAN_HAVE",
                            "MUST_HAVE",
                            "DOESNT_HAVE"
                          ]
                        }
                      }
                    }
                  },
                  "employment_type": {
                    "description": "A list of employment types. Only available to Recruiter PRO contracts.\n  \nNative filter : Employment type\n  ",
                    "type": "array",
                    "items": {
                      "type": "string",
                      "enum": [
                        "FULL_TIME",
                        "PART_TIME",
                        "CONTRACT",
                        "INTERNSHIP"
                      ]
                    }
                  },
                  "graduation_year": {
                    "description": "\n  \nNative filter : Year of graduation\n  ",
                    "type": "object",
                    "required": [
                      "min",
                      "max"
                    ],
                    "properties": {
                      "min": {
                        "minimum": 1900,
                        "maximum": 2100,
                        "type": "number"
                      },
                      "max": {
                        "minimum": 1900,
                        "maximum": 2100,
                        "type": "number"
                      }
                    }
                  },
                  "industry": {
                    "description": "\n  \nNative filter : Industries\n  ",
                    "type": "object",
                    "properties": {
                      "include": {
                        "description": "A list of parameter IDs. Use <a href=\"https://developer.unipile.com/v2.0/reference/getrecruitersearchparameters\">List Search Parameters</a> with `INDUSTRY` type to find out the possible values.",
                        "type": "array",
                        "items": {
                          "type": "string"
                        }
                      },
                      "exclude": {
                        "description": "A list of parameter IDs. Use <a href=\"https://developer.unipile.com/v2.0/reference/getrecruitersearchparameters\">List Search Parameters</a> with `INDUSTRY` type to find out the possible values.",
                        "type": "array",
                        "items": {
                          "type": "string"
                        }
                      }
                    }
                  },
                  "seniority": {
                    "description": "A list of senorities.",
                    "type": "array",
                    "items": {
                      "description": "The experience level.\n  \nNative filter : Seniority\n  ",
                      "type": "string",
                      "enum": [
                        "UNPAID",
                        "TRAINING",
                        "ENTRY",
                        "SENIOR",
                        "MANAGER",
                        "DIRECTOR",
                        "VP",
                        "CXO",
                        "PARTNER",
                        "OWNER"
                      ]
                    }
                  },
                  "spoken_language": {
                    "description": "A list of languages. Only available to Recruiter PRO contracts.\n  \nNative filter : Spoken languages\n  ",
                    "type": "array",
                    "items": {
                      "type": "object",
                      "required": [
                        "id"
                      ],
                      "properties": {
                        "id": {
                          "description": "A parameter ID. Use <a href=\"https://developer.unipile.com/v2.0/reference/getrecruitersearchparameters\">List Search Parameters</a> with `SPOKEN_LANGUAGE` type to find out the possible values.",
                          "type": "string"
                        },
                        "priority": {
                          "description": "Whether the user can, must or shouldn't have the value.\n  \nNative filter : Priority\n  ",
                          "default": "CAN_HAVE",
                          "type": "string",
                          "enum": [
                            "CAN_HAVE",
                            "MUST_HAVE",
                            "DOESNT_HAVE"
                          ]
                        },
                        "proficiency": {
                          "description": "The level of proficiency for the spoken language.\n  \nNative filter : Spoken languages proficiency\n  ",
                          "type": "string",
                          "enum": [
                            "ELEMENTARY",
                            "LIMITED_WORKING",
                            "PROFESSIONAL_WORKING",
                            "FULL_PROFESSIONAL",
                            "NATIVE_OR_BILINGUAL"
                          ]
                        }
                      }
                    }
                  },
                  "profile_language": {
                    "description": "A list of parameter IDs. Use <a href=\"https://developer.unipile.com/v2.0/reference/getrecruitersearchparameters\">List Search Parameters</a> with `PROFILE_LANGUAGE` type to find out the possible values.\n  \nNative filter : Profile languages\n  ",
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  },
                  "project": {
                    "description": "\n  \nNative filter : Projects\n  ",
                    "type": "object",
                    "properties": {
                      "include": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "required": [
                            "id",
                            "title"
                          ],
                          "properties": {
                            "id": {
                              "description": "A parameter ID. Use <a href=\"https://developer.unipile.com/v2.0/reference/getrecruitersearchparameters\">List Search Parameters</a> with `PROJECT` type to find out the possible values.",
                              "type": "string"
                            },
                            "title": {
                              "description": "The title of the project.",
                              "type": "string"
                            }
                          }
                        }
                      },
                      "exclude": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "required": [
                            "id",
                            "title"
                          ],
                          "properties": {
                            "id": {
                              "description": "A parameter ID. Use <a href=\"https://developer.unipile.com/v2.0/reference/getrecruitersearchparameters\">List Search Parameters</a> with `PROJECT` type to find out the possible values.",
                              "type": "string"
                            },
                            "title": {
                              "description": "The title of the project.",
                              "type": "string"
                            }
                          }
                        }
                      }
                    }
                  },
                  "job_function": {
                    "description": "A list of parameter IDs. Use <a href=\"https://developer.unipile.com/v2.0/reference/getrecruitersearchparameters\">List Search Parameters</a> with `JOB_FUNCTION` type to find out the possible values.\n  \nNative filter : Job functions\n  ",
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  },
                  "first_name": {
                    "description": "A list of names.",
                    "type": "array",
                    "items": {
                      "description": "\n  \nNative filter : First names\n  ",
                      "type": "string"
                    }
                  },
                  "last_name": {
                    "description": "A list of names.",
                    "type": "array",
                    "items": {
                      "description": "\n  \nNative filter : Last names\n  ",
                      "type": "string"
                    }
                  },
                  "recently_joined": {
                    "description": "A list of days ranges.",
                    "type": "array",
                    "items": {
                      "description": "A timespan during which the users signed up.\n  \nNative filter : Recently joined LinkedIn\n  ",
                      "type": "object",
                      "properties": {
                        "min": {
                          "type": "number",
                          "enum": [
                            2,
                            8,
                            15,
                            31
                          ],
                          "anyOf": [
                            {
                              "type": "number",
                              "enum": [
                                2
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
                                15
                              ]
                            },
                            {
                              "type": "number",
                              "enum": [
                                31
                              ]
                            }
                          ]
                        },
                        "max": {
                          "type": "number",
                          "enum": [
                            1,
                            7,
                            14,
                            30,
                            90
                          ],
                          "anyOf": [
                            {
                              "type": "number",
                              "enum": [
                                1
                              ]
                            },
                            {
                              "type": "number",
                              "enum": [
                                7
                              ]
                            },
                            {
                              "type": "number",
                              "enum": [
                                14
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
                                90
                              ]
                            }
                          ]
                        }
                      }
                    }
                  },
                  "is_military_veteran": {
                    "description": "Whether the users should have military background.\n  \nNative filter : Military veterans\n  ",
                    "type": "boolean"
                  },
                  "recruiting_activity": {
                    "description": "A list of recruiting activities.",
                    "type": "array",
                    "items": {
                      "type": "object",
                      "required": [
                        "type"
                      ],
                      "properties": {
                        "type": {
                          "type": "string",
                          "enum": [
                            "messages",
                            "notes",
                            "projects",
                            "resumes",
                            "reviews"
                          ]
                        },
                        "priority": {
                          "description": "Whether the user can, must or shouldn't have the value.\n  \nNative filter : Priority\n  ",
                          "default": "CAN_HAVE",
                          "type": "string",
                          "enum": [
                            "CAN_HAVE",
                            "MUST_HAVE",
                            "DOESNT_HAVE"
                          ]
                        },
                        "preferences": {
                          "description": "The time period from which to filter results.\n  \nNative filter : Preferences\n  ",
                          "default": "ANYTIME",
                          "type": "string",
                          "enum": [
                            "ANYTIME",
                            "PAST_DAY",
                            "PAST_WEEK",
                            "PAST_2_WEEKS",
                            "PAST_3_MONTHS",
                            "PAST_6_MONTHS",
                            "PAST_YEAR",
                            "PAST_2_YEARS"
                          ]
                        }
                      }
                    }
                  },
                  "hide_previously_viewed": {
                    "description": "The time period from which the user profiles you already visited should be hidden.\n  \nNative filter : Hide previously viewed\n  ",
                    "type": "object",
                    "required": [
                      "timespan"
                    ],
                    "properties": {
                      "timespan": {
                        "type": "string",
                        "enum": [
                          "PAST_MONTH",
                          "PAST_3_MONTHS",
                          "PAST_6_MONTHS",
                          "PAST_YEAR",
                          "PAST_2_YEARS"
                        ]
                      }
                    }
                  },
                  "group": {
                    "description": "A list of parameter IDs. Use <a href=\"https://developer.unipile.com/v2.0/reference/getrecruitersearchparameters\">List Search Parameters</a> with `GROUP` type to find out the possible values.\n  \nNative filter : All groups\n  ",
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  },
                  "is_past_applicant": {
                    "description": "Whether the users should have already applied to at least one of your job postings.\n  \nNative filter : Past applicants\n  ",
                    "type": "boolean"
                  },
                  "notes": {
                    "description": "A list of notes.",
                    "type": "array",
                    "items": {
                      "description": "A full or partial note you wrote about users.\n  \nNative filter : Notes\n  ",
                      "type": "string"
                    }
                  },
                  "tags": {
                    "description": "\n  \nNative filter : Tags\n  ",
                    "type": "object",
                    "properties": {
                      "include": {
                        "description": "A list of parameter IDs. Use <a href=\"https://developer.unipile.com/v2.0/reference/getrecruitersearchparameters\">List Search Parameters</a> with `TAG` type to find out the possible values.",
                        "type": "array",
                        "items": {
                          "type": "string"
                        }
                      },
                      "exclude": {
                        "description": "A list of parameter IDs. Use <a href=\"https://developer.unipile.com/v2.0/reference/getrecruitersearchparameters\">List Search Parameters</a> with `TAG` type to find out the possible values.",
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
        },
        "parameters": [
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
            "name": "Perform recruiter people search",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipileLinkedIn } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipileLinkedIn = new UnipileLinkedIn({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipileLinkedIn.performRecruiterPeopleSearch(\n  {\n    path: {\n      account_id: ACCOUNT_ID,\n    },\n    body: {\n      keywords: 'value',\n    },\n  }\n);"
          },
          {
            "name": "Perform recruiter people search",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    linked_in_api = unipile.LinkedInApi(api_client)\n\nresponse = linked_in_api.perform_recruiter_people_search(\n    ACCOUNT_ID,\n    {\n    'keywords': 'value',\n  }\n)"
          }
        ],
        "responses": {
          "200": {
            "description": "Default Response",
            "content": {
              "application/json": {
                "schema": {
                  "title": "People Search",
                  "type": "object",
                  "required": [
                    "data"
                  ],
                  "properties": {
                    "data": {
                      "type": "array",
                      "items": {
                        "anyOf": [
                          {
                            "title": "Partial profile",
                            "type": "object",
                            "required": [
                              "object",
                              "id",
                              "product",
                              "visibility",
                              "candidate_id",
                              "is_hidden_candidate",
                              "work_experience"
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
                              "product": {
                                "type": "string",
                                "enum": [
                                  "recruiter"
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
                              "object",
                              "id",
                              "display_name",
                              "product",
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
                              "product": {
                                "type": "string",
                                "enum": [
                                  "recruiter"
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