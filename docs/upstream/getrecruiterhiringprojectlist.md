---
updatedAt: 2026-04-24T15:33:11.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# List Projects

Returns a list of hiring projects created in the current contract scope.

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
    "/v2/{account_id}/linkedin/recruiter/projects": {
      "get": {
        "operationId": "getRecruiterHiringProjectList",
        "summary": "List Projects",
        "tags": [
          "LinkedIn"
        ],
        "description": "Returns a list of hiring projects created in the current contract scope.",
        "parameters": [
          {
            "schema": {
              "default": [
                "ACTIVE"
              ],
              "type": "array",
              "items": {
                "type": "string",
                "enum": [
                  "ACTIVE",
                  "CLOSED"
                ]
              }
            },
            "in": "query",
            "name": "status",
            "required": false,
            "description": "A list of statuses that the project must match."
          },
          {
            "schema": {
              "default": "LAST_USED_BY_ME",
              "type": "string",
              "enum": [
                "LAST_USED_BY_ME",
                "MOST_USED_BY_ME",
                "LAST_VIEWED_BY_ME",
                "NEWEST_TO_OLDEST",
                "OLDEST_TO_NEWEST",
                "ALPHABETICAL",
                "REVERSE_ALPHABETICAL"
              ]
            },
            "in": "query",
            "name": "sort_by",
            "required": false,
            "description": "The sort method."
          },
          {
            "schema": {
              "type": "string"
            },
            "in": "query",
            "name": "keywords",
            "required": false,
            "description": "A keyword or group of keywords to filter projects by name."
          },
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
              "default": 10,
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
            "name": "Get recruiter hiring project list",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipileLinkedIn } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipileLinkedIn = new UnipileLinkedIn({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipileLinkedIn.getRecruiterHiringProjectList(\n  {\n    path: {\n      account_id: ACCOUNT_ID,\n    },\n  }\n);"
          },
          {
            "name": "Get recruiter hiring project list",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    linked_in_api = unipile.LinkedInApi(api_client)\n\nresponse = linked_in_api.get_recruiter_hiring_project_list(\n    ACCOUNT_ID\n)"
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
                          "name",
                          "readonly",
                          "archived",
                          "created_at",
                          "last_modified_at",
                          "visibility",
                          "owner",
                          "metadata",
                          "talent_pool",
                          "pipeline"
                        ],
                        "properties": {
                          "object": {
                            "type": "string",
                            "enum": [
                              "HiringProject"
                            ]
                          },
                          "id": {
                            "description": "The ID of the Project.",
                            "type": "string"
                          },
                          "name": {
                            "description": "The name of the Project.",
                            "type": "string"
                          },
                          "readonly": {
                            "description": "Whether the Project is read only.",
                            "type": "boolean"
                          },
                          "archived": {
                            "description": "Whether the Project has been archived.",
                            "type": "boolean"
                          },
                          "created_at": {
                            "description": "The date on which the Project was created. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                            "type": "string"
                          },
                          "last_accessed_at": {
                            "description": "The date on which the Project was last accessed. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                            "type": "string"
                          },
                          "last_modified_at": {
                            "description": "The date on which the Project was last modified. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                            "type": "string"
                          },
                          "visibility": {
                            "description": "The visibility level of the Project.",
                            "type": "string",
                            "enum": [
                              "PRIVATE",
                              "SHARED"
                            ]
                          },
                          "owner": {
                            "description": "The owner of the Project.",
                            "type": "object",
                            "required": [
                              "id",
                              "seat_id"
                            ],
                            "properties": {
                              "id": {
                                "description": "The ID of the Project owner.",
                                "type": "string"
                              },
                              "seat_id": {
                                "description": "The seat ID of the Project owner.",
                                "type": "string"
                              },
                              "name": {
                                "description": "The name of the Project owner.",
                                "type": "string"
                              },
                              "email": {
                                "description": "The email address of the Project owner.",
                                "type": "string"
                              },
                              "profile_url": {
                                "description": "The profile URL of the Project owner.",
                                "type": "string"
                              },
                              "profile_headline": {
                                "description": "The profile headline of the Project owner.",
                                "type": "string"
                              },
                              "public_picture_url": {
                                "description": "The profile picture URL of the Project owner.",
                                "type": "string"
                              }
                            }
                          },
                          "metadata": {
                            "description": "Metadata on the Project.",
                            "type": "object",
                            "required": [
                              "locations",
                              "industries"
                            ],
                            "properties": {
                              "job_title": {
                                "description": "The job title of the Project.",
                                "type": "string"
                              },
                              "job_posting_id": {
                                "description": "The job posting ID of the Project.",
                                "type": "string"
                              },
                              "locations": {
                                "description": "A list of locations associated with the Project.",
                                "type": "array",
                                "items": {
                                  "type": "object",
                                  "required": [
                                    "name"
                                  ],
                                  "properties": {
                                    "name": {
                                      "description": "The name of the Location.",
                                      "type": "string"
                                    },
                                    "timezone": {
                                      "description": "The time zone of the Location.",
                                      "type": "string"
                                    }
                                  }
                                }
                              },
                              "seniority_level": {
                                "description": "The seniority level of the Project.",
                                "type": "string"
                              },
                              "employment_type": {
                                "description": "The employment type of the Project.",
                                "type": "string"
                              },
                              "industries": {
                                "description": "A list of industries associated with the the Project.",
                                "type": "array",
                                "items": {
                                  "type": "string"
                                }
                              },
                              "company": {
                                "description": "The company on whose behalf the Project was created.",
                                "type": "object",
                                "required": [
                                  "id",
                                  "name",
                                  "location",
                                  "description",
                                  "url",
                                  "industries"
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
                                  "location": {
                                    "description": "The location of the Company.",
                                    "type": "string"
                                  },
                                  "description": {
                                    "description": "The description of the Company.",
                                    "type": "string"
                                  },
                                  "url": {
                                    "description": "The website URL of the Company.",
                                    "type": "string"
                                  },
                                  "industries": {
                                    "description": "A list of industries associated with the the Company.",
                                    "type": "array",
                                    "items": {
                                      "type": "string"
                                    }
                                  }
                                }
                              }
                            }
                          },
                          "talent_pool": {
                            "description": "The talent pool of the Project.",
                            "type": "object",
                            "required": [
                              "channels"
                            ],
                            "properties": {
                              "channels": {
                                "description": "A list of sourcing channels that make up the Talent pool.",
                                "type": "array",
                                "items": {
                                  "type": "object",
                                  "required": [
                                    "id",
                                    "type",
                                    "name",
                                    "created_at",
                                    "last_modified_at",
                                    "state"
                                  ],
                                  "properties": {
                                    "id": {
                                      "description": "The ID of the Channel.",
                                      "type": "string"
                                    },
                                    "type": {
                                      "description": "The type of the Channel.",
                                      "anyOf": [
                                        {
                                          "type": "string",
                                          "enum": [
                                            "CAREER_SITE"
                                          ]
                                        },
                                        {
                                          "type": "string",
                                          "enum": [
                                            "MANUAL_IMPORT"
                                          ]
                                        },
                                        {
                                          "type": "string",
                                          "enum": [
                                            "INTERNAL_CANDIDATES"
                                          ]
                                        },
                                        {
                                          "type": "string",
                                          "enum": [
                                            "PROJECT_IMPORT"
                                          ]
                                        },
                                        {
                                          "type": "string",
                                          "enum": [
                                            "PROFILE_MATCHING"
                                          ]
                                        },
                                        {
                                          "type": "string",
                                          "enum": [
                                            "RECRUITER_SEARCH"
                                          ]
                                        },
                                        {
                                          "type": "string",
                                          "enum": [
                                            "REFERRAL"
                                          ]
                                        },
                                        {
                                          "type": "string",
                                          "enum": [
                                            "JOB_POSTING_RECOMMENDED_MATCHES"
                                          ]
                                        },
                                        {
                                          "type": "string",
                                          "enum": [
                                            "AUTOMATED_SOURCING"
                                          ]
                                        },
                                        {
                                          "type": "string",
                                          "enum": [
                                            "JOB_POSTING"
                                          ]
                                        },
                                        {
                                          "type": "string",
                                          "enum": [
                                            "APPLY_STARTERS"
                                          ]
                                        },
                                        {
                                          "type": "string",
                                          "enum": [
                                            "TALENT_AGENT"
                                          ]
                                        },
                                        {
                                          "type": "string",
                                          "enum": [
                                            "PIPELINE_BUILDER"
                                          ]
                                        },
                                        {
                                          "type": "string",
                                          "enum": [
                                            "INHERITED_JOB_POSTING"
                                          ]
                                        }
                                      ]
                                    },
                                    "name": {
                                      "description": "The custom name of the Channel.",
                                      "type": "string"
                                    },
                                    "created_at": {
                                      "description": "The date on which the Channel was created. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                                      "type": "string"
                                    },
                                    "last_modified_at": {
                                      "description": "The date on which the Channel was last modified. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                                      "type": "string"
                                    },
                                    "state": {
                                      "description": "The current state of the Channel.",
                                      "type": "string",
                                      "enum": [
                                        "ACTIVE",
                                        "CLOSED",
                                        "DRAFT"
                                      ]
                                    }
                                  }
                                }
                              }
                            }
                          },
                          "pipeline": {
                            "description": "The pipeline of the Project.",
                            "type": "object",
                            "required": [
                              "enabled",
                              "name",
                              "description",
                              "created_at",
                              "last_modified_at",
                              "stages"
                            ],
                            "properties": {
                              "enabled": {
                                "description": "Whether the pipeline is active.",
                                "type": "boolean"
                              },
                              "name": {
                                "description": "The name of the Pipeline.",
                                "type": "string"
                              },
                              "description": {
                                "description": "The description of the Pipeline.",
                                "type": "string"
                              },
                              "created_at": {
                                "description": "The date on which the Pipeline was created. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                                "type": "string"
                              },
                              "last_modified_at": {
                                "description": "The date on which the Pipeline was last modified. Uses ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                                "type": "string"
                              },
                              "stages": {
                                "description": "A list of stages that make up the Pipeline.",
                                "type": "array",
                                "items": {
                                  "type": "object",
                                  "required": [
                                    "id",
                                    "type",
                                    "name",
                                    "candidates_count",
                                    "accepts_candidates"
                                  ],
                                  "properties": {
                                    "id": {
                                      "description": "The ID of the Stage.",
                                      "type": "string"
                                    },
                                    "type": {
                                      "description": "The type of the Stage.",
                                      "type": "string"
                                    },
                                    "name": {
                                      "description": "The name of the Stage.",
                                      "type": "string"
                                    },
                                    "candidates_count": {
                                      "description": "The number of candidates ranked at this Stage.",
                                      "type": "number"
                                    },
                                    "accepts_candidates": {
                                      "description": "Whether candidates can be ranked at this Stage.",
                                      "type": "boolean"
                                    }
                                  }
                                }
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