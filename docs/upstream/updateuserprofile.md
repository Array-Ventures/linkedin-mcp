---
updatedAt: 2026-08-27T09:48:00.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Update a User Profile

Partially updates the specified User profile. Use `me` as `user_id` to update the account owner profile. Omitted properties remain unchanged; supplied values replace existing values; empty strings clear supported text fields; and null deletes nullable singleton resources.<br/><br/>Multipart supported, refer to <a href="https://developer.unipile.com/v2.0/reference/api-usage#sending-files">Sending Files</a>.

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
      "patch": {
        "operationId": "updateUserProfile",
        "summary": "Update a User Profile",
        "tags": [
          "Users"
        ],
        "description": "Partially updates the specified User profile. Use `me` as `user_id` to update the account owner profile. Omitted properties remain unchanged; supplied values replace existing values; empty strings clear supported text fields; and null deletes nullable singleton resources.<br/><br/>Multipart supported, refer to <a href=\"https://developer.unipile.com/v2.0/reference/api-usage#sending-files\">Sending Files</a>.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "first_name": {
                    "description": "The first name of the User. Updating this field is not supported by LinkedIn and Instagram.",
                    "type": "string"
                  },
                  "last_name": {
                    "description": "The last name of the User. Updating this field is not supported by LinkedIn and Instagram.",
                    "type": "string"
                  },
                  "description": {
                    "description": "Description of the User. Updating this field is not supported by LinkedIn and Instagram.",
                    "type": "string"
                  },
                  "location": {
                    "description": "Location of the User. Omit it to leave it unchanged. Updating this field is not supported by Instagram.",
                    "type": "string"
                  },
                  "bio": {
                    "description": "Bio / About section. Omit it to leave it unchanged or use an empty string to clear it.",
                    "type": "string"
                  },
                  "picture": {
                    "description": "A file to be uploaded.",
                    "additionalProperties": false,
                    "type": "object",
                    "required": [
                      "content",
                      "content_type",
                      "filename"
                    ],
                    "properties": {
                      "content": {
                        "description": "Content of the file encoded as base64. For large files, prefer using multipart, learn more here: https://developer.unipile.com/v2.0/reference/api-usage#sending-files",
                        "type": "string"
                      },
                      "content_type": {
                        "description": "<a href=\"https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types\">MIME type</a> of the file.",
                        "type": "string"
                      },
                      "filename": {
                        "description": "Name of the file (including extension).",
                        "type": "string"
                      },
                      "metadata": {
                        "description": "Metadata of the the file.",
                        "type": "object",
                        "properties": {
                          "duration": {
                            "description": "Duration of the media file.",
                            "type": "number"
                          }
                        }
                      }
                    }
                  },
                  "background_picture": {
                    "description": "A file to be uploaded.",
                    "additionalProperties": false,
                    "type": "object",
                    "required": [
                      "content",
                      "content_type",
                      "filename"
                    ],
                    "properties": {
                      "content": {
                        "description": "Content of the file encoded as base64. For large files, prefer using multipart, learn more here: https://developer.unipile.com/v2.0/reference/api-usage#sending-files",
                        "type": "string"
                      },
                      "content_type": {
                        "description": "<a href=\"https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types\">MIME type</a> of the file.",
                        "type": "string"
                      },
                      "filename": {
                        "description": "Name of the file (including extension).",
                        "type": "string"
                      },
                      "metadata": {
                        "description": "Metadata of the the file.",
                        "type": "object",
                        "properties": {
                          "duration": {
                            "description": "Duration of the media file.",
                            "type": "number"
                          }
                        }
                      }
                    }
                  },
                  "specifics": {
                    "allOf": [
                      {},
                      {
                        "description": "Object containing provider-specific user profile data.",
                        "type": "object",
                        "properties": {
                          "linkedin": {
                            "description": "LinkedIn profile mutations. Omitted properties remain unchanged; values replace existing values; empty strings clear supported text fields; null deletes nullable singleton resources.",
                            "type": "object",
                            "properties": {
                              "skills": {
                                "description": "Skills to add directly to the profile. This field is independent from `experience.skills` and `education.skills`; only send the field that matches the intended target. Existing skills remain untouched and removing skills is not supported by the provider.",
                                "type": "array",
                                "items": {
                                  "type": "object",
                                  "required": [
                                    "name"
                                  ],
                                  "properties": {
                                    "name": {
                                      "type": "string"
                                    },
                                    "id": {
                                      "description": "A parameter ID. Use <a href=\"https://developer.unipile.com/v2.0/reference/getclassicsearchparameters\">List Search Parameters</a> with `SKILL` type to find out the possible values.",
                                      "type": "string"
                                    }
                                  }
                                }
                              },
                              "skills_follow": {
                                "description": "Whether to follow the profile-level skills supplied in `skills`. It does not apply to experience or education skills.",
                                "default": false,
                                "type": "boolean"
                              },
                              "postal_code": {
                                "description": "Postal code associated with the location.",
                                "type": "string"
                              },
                              "headline": {
                                "description": "Headline. Omit it to leave it unchanged or use an empty string to clear it.",
                                "type": "string"
                              },
                              "experience": {
                                "anyOf": [
                                  {
                                    "title": "Create new experience",
                                    "type": "object",
                                    "required": [
                                      "job_title",
                                      "company",
                                      "start_date",
                                      "operation"
                                    ],
                                    "properties": {
                                      "notify_network": {
                                        "description": "Notify the network about the experience. Turn on to notify your network of key profile changes (such as new job) and work anniversaries. Updates can take up to 2 hours. ",
                                        "default": false,
                                        "type": "boolean"
                                      },
                                      "job_title": {
                                        "description": "Job title of the experience.",
                                        "type": "object",
                                        "required": [
                                          "name"
                                        ],
                                        "properties": {
                                          "name": {
                                            "type": "string"
                                          },
                                          "id": {
                                            "description": "A parameter ID. Use <a href=\"https://developer.unipile.com/v2.0/reference/getclassicsearchparameters\">List Search Parameters</a> with `JOB_TITLE` type to find out the possible values.",
                                            "type": "string"
                                          }
                                        }
                                      },
                                      "employment_type": {
                                        "description": "A parameter ID. Use <a href=\"https://developer.unipile.com/v2.0/reference/getclassicsearchparameters\">List Search Parameters</a> with `EMPLOYMENT_TYPE` type to find out the possible values. Employment type of the experience.",
                                        "type": "string"
                                      },
                                      "company": {
                                        "description": "Company of the experience.",
                                        "type": "object",
                                        "required": [
                                          "name"
                                        ],
                                        "properties": {
                                          "name": {
                                            "type": "string"
                                          },
                                          "id": {
                                            "description": "A parameter ID. Use <a href=\"https://developer.unipile.com/v2.0/reference/getclassicsearchparameters\">List Search Parameters</a> with `COMPANY` type to find out the possible values.",
                                            "type": "string"
                                          }
                                        }
                                      },
                                      "location": {
                                        "description": "Location of the experience.",
                                        "type": "object",
                                        "required": [
                                          "name"
                                        ],
                                        "properties": {
                                          "name": {
                                            "type": "string"
                                          },
                                          "id": {
                                            "description": "A parameter ID. Use <a href=\"https://developer.unipile.com/v2.0/reference/getclassicsearchparameters\">List Search Parameters</a> with `LOCATION` type to find out the possible values.",
                                            "type": "string"
                                          }
                                        }
                                      },
                                      "workplace_type": {
                                        "description": "The workplace type. Ex: Remote, Hybrid, On-site",
                                        "type": "string",
                                        "enum": [
                                          "ON_SITE",
                                          "HYBRID",
                                          "REMOTE"
                                        ]
                                      },
                                      "start_date": {
                                        "description": "The start date of the experience.",
                                        "type": "object",
                                        "required": [
                                          "month",
                                          "year"
                                        ],
                                        "properties": {
                                          "month": {
                                            "description": "Month",
                                            "type": "number"
                                          },
                                          "year": {
                                            "description": "Year",
                                            "type": "number"
                                          }
                                        }
                                      },
                                      "end_date": {
                                        "description": "The end date of the experience.",
                                        "type": "object",
                                        "required": [
                                          "month",
                                          "year"
                                        ],
                                        "properties": {
                                          "month": {
                                            "description": "Month",
                                            "type": "number"
                                          },
                                          "year": {
                                            "description": "Year",
                                            "type": "number"
                                          }
                                        }
                                      },
                                      "description": {
                                        "description": "Description of the experience. List your major duties and successes, highlighting specific projects.",
                                        "type": "string"
                                      },
                                      "source_of_hire": {
                                        "description": "Where did you find this job? This information will be used to improve LinkedIn’s job search experience.",
                                        "type": "string",
                                        "enum": [
                                          "INDEED",
                                          "LINKEDIN",
                                          "COMPANY_WEBSITE",
                                          "OTHER_JOB_SITES",
                                          "REFERRAL",
                                          "CONTACTED_BY_RECRUITER",
                                          "STAFFING_AGENCY",
                                          "OTHER"
                                        ]
                                      },
                                      "skills": {
                                        "description": "Skills to associate with this experience. Use this field only inside `experience`; it is independent from the profile-level and education `skills` fields. These skills also appear in the profile Skills section.",
                                        "type": "array",
                                        "items": {
                                          "type": "object",
                                          "required": [
                                            "name"
                                          ],
                                          "properties": {
                                            "name": {
                                              "type": "string"
                                            },
                                            "id": {
                                              "description": "A parameter ID. Use <a href=\"https://developer.unipile.com/v2.0/reference/getclassicsearchparameters\">List Search Parameters</a> with `SKILL` type to find out the possible values.",
                                              "type": "string"
                                            }
                                          }
                                        }
                                      },
                                      "media": {
                                        "anyOf": [
                                          {
                                            "title": "File",
                                            "type": "object",
                                            "required": [
                                              "type",
                                              "attachment"
                                            ],
                                            "properties": {
                                              "title": {
                                                "description": "Title of the media.",
                                                "type": "string"
                                              },
                                              "description": {
                                                "description": "Description of the media.",
                                                "type": "string"
                                              },
                                              "type": {
                                                "type": "string",
                                                "enum": [
                                                  "file"
                                                ]
                                              },
                                              "attachment": {
                                                "description": "A file to be uploaded.",
                                                "additionalProperties": false,
                                                "type": "object",
                                                "required": [
                                                  "content",
                                                  "content_type",
                                                  "filename"
                                                ],
                                                "properties": {
                                                  "content": {
                                                    "description": "Content of the file encoded as base64. For large files, prefer using multipart, learn more here: https://developer.unipile.com/v2.0/reference/api-usage#sending-files",
                                                    "type": "string"
                                                  },
                                                  "content_type": {
                                                    "description": "<a href=\"https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types\">MIME type</a> of the file.",
                                                    "type": "string"
                                                  },
                                                  "filename": {
                                                    "description": "Name of the file (including extension).",
                                                    "type": "string"
                                                  },
                                                  "metadata": {
                                                    "description": "Metadata of the the file.",
                                                    "type": "object",
                                                    "properties": {
                                                      "duration": {
                                                        "description": "Duration of the media file.",
                                                        "type": "number"
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          },
                                          {
                                            "title": "Link",
                                            "type": "object",
                                            "required": [
                                              "type",
                                              "url"
                                            ],
                                            "properties": {
                                              "title": {
                                                "description": "Title of the media.",
                                                "type": "string"
                                              },
                                              "description": {
                                                "description": "Description of the media.",
                                                "type": "string"
                                              },
                                              "type": {
                                                "type": "string",
                                                "enum": [
                                                  "link"
                                                ]
                                              },
                                              "url": {
                                                "description": "URL of the link.",
                                                "type": "string"
                                              },
                                              "thumbnail": {
                                                "description": "A file to be uploaded.",
                                                "additionalProperties": false,
                                                "type": "object",
                                                "required": [
                                                  "content",
                                                  "content_type",
                                                  "filename"
                                                ],
                                                "properties": {
                                                  "content": {
                                                    "description": "Content of the file encoded as base64. For large files, prefer using multipart, learn more here: https://developer.unipile.com/v2.0/reference/api-usage#sending-files",
                                                    "type": "string"
                                                  },
                                                  "content_type": {
                                                    "description": "<a href=\"https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types\">MIME type</a> of the file.",
                                                    "type": "string"
                                                  },
                                                  "filename": {
                                                    "description": "Name of the file (including extension).",
                                                    "type": "string"
                                                  },
                                                  "metadata": {
                                                    "description": "Metadata of the the file.",
                                                    "type": "object",
                                                    "properties": {
                                                      "duration": {
                                                        "description": "Duration of the media file.",
                                                        "type": "number"
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        ]
                                      },
                                      "operation": {
                                        "type": "string",
                                        "enum": [
                                          "create"
                                        ]
                                      }
                                    }
                                  },
                                  {
                                    "title": "Edit existing experience",
                                    "type": "object",
                                    "required": [
                                      "operation",
                                      "id"
                                    ],
                                    "properties": {
                                      "notify_network": {
                                        "description": "Notify the network about the experience. Turn on to notify your network of key profile changes (such as new job) and work anniversaries. Updates can take up to 2 hours. ",
                                        "default": false,
                                        "type": "boolean"
                                      },
                                      "job_title": {
                                        "description": "Job title of the experience.",
                                        "type": "object",
                                        "required": [
                                          "name"
                                        ],
                                        "properties": {
                                          "name": {
                                            "type": "string"
                                          },
                                          "id": {
                                            "description": "A parameter ID. Use <a href=\"https://developer.unipile.com/v2.0/reference/getclassicsearchparameters\">List Search Parameters</a> with `JOB_TITLE` type to find out the possible values.",
                                            "type": "string"
                                          }
                                        }
                                      },
                                      "employment_type": {
                                        "description": "A parameter ID. Use <a href=\"https://developer.unipile.com/v2.0/reference/getclassicsearchparameters\">List Search Parameters</a> with `EMPLOYMENT_TYPE` type to find out the possible values. Employment type of the experience.",
                                        "type": "string"
                                      },
                                      "company": {
                                        "description": "Company of the experience.",
                                        "type": "object",
                                        "required": [
                                          "name"
                                        ],
                                        "properties": {
                                          "name": {
                                            "type": "string"
                                          },
                                          "id": {
                                            "description": "A parameter ID. Use <a href=\"https://developer.unipile.com/v2.0/reference/getclassicsearchparameters\">List Search Parameters</a> with `COMPANY` type to find out the possible values.",
                                            "type": "string"
                                          }
                                        }
                                      },
                                      "location": {
                                        "description": "Location of the experience.",
                                        "type": "object",
                                        "required": [
                                          "name"
                                        ],
                                        "properties": {
                                          "name": {
                                            "type": "string"
                                          },
                                          "id": {
                                            "description": "A parameter ID. Use <a href=\"https://developer.unipile.com/v2.0/reference/getclassicsearchparameters\">List Search Parameters</a> with `LOCATION` type to find out the possible values.",
                                            "type": "string"
                                          }
                                        }
                                      },
                                      "workplace_type": {
                                        "description": "The workplace type. Ex: Remote, Hybrid, On-site",
                                        "type": "string",
                                        "enum": [
                                          "ON_SITE",
                                          "HYBRID",
                                          "REMOTE"
                                        ]
                                      },
                                      "start_date": {
                                        "description": "The start date of the experience.",
                                        "type": "object",
                                        "required": [
                                          "month",
                                          "year"
                                        ],
                                        "properties": {
                                          "month": {
                                            "description": "Month",
                                            "type": "number"
                                          },
                                          "year": {
                                            "description": "Year",
                                            "type": "number"
                                          }
                                        }
                                      },
                                      "end_date": {
                                        "description": "The end date of the experience.",
                                        "type": "object",
                                        "required": [
                                          "month",
                                          "year"
                                        ],
                                        "properties": {
                                          "month": {
                                            "description": "Month",
                                            "type": "number"
                                          },
                                          "year": {
                                            "description": "Year",
                                            "type": "number"
                                          }
                                        }
                                      },
                                      "description": {
                                        "description": "Description of the experience. List your major duties and successes, highlighting specific projects.",
                                        "type": "string"
                                      },
                                      "source_of_hire": {
                                        "description": "Where did you find this job? This information will be used to improve LinkedIn’s job search experience.",
                                        "type": "string",
                                        "enum": [
                                          "INDEED",
                                          "LINKEDIN",
                                          "COMPANY_WEBSITE",
                                          "OTHER_JOB_SITES",
                                          "REFERRAL",
                                          "CONTACTED_BY_RECRUITER",
                                          "STAFFING_AGENCY",
                                          "OTHER"
                                        ]
                                      },
                                      "skills": {
                                        "description": "Skills to associate with this experience. Use this field only inside `experience`; it is independent from the profile-level and education `skills` fields. These skills also appear in the profile Skills section.",
                                        "type": "array",
                                        "items": {
                                          "type": "object",
                                          "required": [
                                            "name"
                                          ],
                                          "properties": {
                                            "name": {
                                              "type": "string"
                                            },
                                            "id": {
                                              "description": "A parameter ID. Use <a href=\"https://developer.unipile.com/v2.0/reference/getclassicsearchparameters\">List Search Parameters</a> with `SKILL` type to find out the possible values.",
                                              "type": "string"
                                            }
                                          }
                                        }
                                      },
                                      "media": {
                                        "anyOf": [
                                          {
                                            "title": "File",
                                            "type": "object",
                                            "required": [
                                              "type",
                                              "attachment"
                                            ],
                                            "properties": {
                                              "title": {
                                                "description": "Title of the media.",
                                                "type": "string"
                                              },
                                              "description": {
                                                "description": "Description of the media.",
                                                "type": "string"
                                              },
                                              "type": {
                                                "type": "string",
                                                "enum": [
                                                  "file"
                                                ]
                                              },
                                              "attachment": {
                                                "description": "A file to be uploaded.",
                                                "additionalProperties": false,
                                                "type": "object",
                                                "required": [
                                                  "content",
                                                  "content_type",
                                                  "filename"
                                                ],
                                                "properties": {
                                                  "content": {
                                                    "description": "Content of the file encoded as base64. For large files, prefer using multipart, learn more here: https://developer.unipile.com/v2.0/reference/api-usage#sending-files",
                                                    "type": "string"
                                                  },
                                                  "content_type": {
                                                    "description": "<a href=\"https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types\">MIME type</a> of the file.",
                                                    "type": "string"
                                                  },
                                                  "filename": {
                                                    "description": "Name of the file (including extension).",
                                                    "type": "string"
                                                  },
                                                  "metadata": {
                                                    "description": "Metadata of the the file.",
                                                    "type": "object",
                                                    "properties": {
                                                      "duration": {
                                                        "description": "Duration of the media file.",
                                                        "type": "number"
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          },
                                          {
                                            "title": "Link",
                                            "type": "object",
                                            "required": [
                                              "type",
                                              "url"
                                            ],
                                            "properties": {
                                              "title": {
                                                "description": "Title of the media.",
                                                "type": "string"
                                              },
                                              "description": {
                                                "description": "Description of the media.",
                                                "type": "string"
                                              },
                                              "type": {
                                                "type": "string",
                                                "enum": [
                                                  "link"
                                                ]
                                              },
                                              "url": {
                                                "description": "URL of the link.",
                                                "type": "string"
                                              },
                                              "thumbnail": {
                                                "description": "A file to be uploaded.",
                                                "additionalProperties": false,
                                                "type": "object",
                                                "required": [
                                                  "content",
                                                  "content_type",
                                                  "filename"
                                                ],
                                                "properties": {
                                                  "content": {
                                                    "description": "Content of the file encoded as base64. For large files, prefer using multipart, learn more here: https://developer.unipile.com/v2.0/reference/api-usage#sending-files",
                                                    "type": "string"
                                                  },
                                                  "content_type": {
                                                    "description": "<a href=\"https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types\">MIME type</a> of the file.",
                                                    "type": "string"
                                                  },
                                                  "filename": {
                                                    "description": "Name of the file (including extension).",
                                                    "type": "string"
                                                  },
                                                  "metadata": {
                                                    "description": "Metadata of the the file.",
                                                    "type": "object",
                                                    "properties": {
                                                      "duration": {
                                                        "description": "Duration of the media file.",
                                                        "type": "number"
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        ]
                                      },
                                      "operation": {
                                        "type": "string",
                                        "enum": [
                                          "edit"
                                        ]
                                      },
                                      "id": {
                                        "description": "ID of the experience to edit.",
                                        "type": "string"
                                      }
                                    }
                                  },
                                  {
                                    "title": "Delete an experience",
                                    "type": "object",
                                    "required": [
                                      "operation",
                                      "id"
                                    ],
                                    "properties": {
                                      "operation": {
                                        "type": "string",
                                        "enum": [
                                          "delete"
                                        ]
                                      },
                                      "id": {
                                        "minLength": 1,
                                        "description": "ID of the experience to delete.",
                                        "type": "string"
                                      }
                                    }
                                  }
                                ]
                              },
                              "education": {
                                "anyOf": [
                                  {
                                    "title": "Create new education",
                                    "type": "object",
                                    "required": [
                                      "school",
                                      "start_date",
                                      "operation"
                                    ],
                                    "properties": {
                                      "notify_network": {
                                        "description": "Notify the network about the education. Turn on to notify your network of key profile changes (such as new education) and work anniversaries.",
                                        "default": false,
                                        "type": "boolean"
                                      },
                                      "school": {
                                        "description": "School of the education.",
                                        "type": "object",
                                        "required": [
                                          "name"
                                        ],
                                        "properties": {
                                          "name": {
                                            "type": "string"
                                          },
                                          "id": {
                                            "description": "A parameter ID. Use <a href=\"https://developer.unipile.com/v2.0/reference/getclassicsearchparameters\">List Search Parameters</a> with `SCHOOL` type to find out the possible values.",
                                            "type": "string"
                                          }
                                        }
                                      },
                                      "degree": {
                                        "description": "Degree of the education.",
                                        "type": "object",
                                        "required": [
                                          "name"
                                        ],
                                        "properties": {
                                          "name": {
                                            "type": "string"
                                          },
                                          "id": {
                                            "description": "A parameter ID. Use <a href=\"https://developer.unipile.com/v2.0/reference/getclassicsearchparameters\">List Search Parameters</a> with `DEGREE` type to find out the possible values.",
                                            "type": "string"
                                          }
                                        }
                                      },
                                      "field_of_study": {
                                        "description": "Field of study of the education.",
                                        "type": "object",
                                        "required": [
                                          "name"
                                        ],
                                        "properties": {
                                          "name": {
                                            "type": "string"
                                          },
                                          "id": {
                                            "description": "A parameter ID. Use <a href=\"https://developer.unipile.com/v2.0/reference/getclassicsearchparameters\">List Search Parameters</a> with `FIELD_OF_STUDY` type to find out the possible values.",
                                            "type": "string"
                                          }
                                        }
                                      },
                                      "start_date": {
                                        "description": "The start date of the education.",
                                        "type": "object",
                                        "required": [
                                          "month",
                                          "year"
                                        ],
                                        "properties": {
                                          "month": {
                                            "description": "Month",
                                            "type": "number"
                                          },
                                          "year": {
                                            "description": "Year",
                                            "type": "number"
                                          }
                                        }
                                      },
                                      "end_date": {
                                        "description": "The end date of the education.",
                                        "type": "object",
                                        "required": [
                                          "month",
                                          "year"
                                        ],
                                        "properties": {
                                          "month": {
                                            "description": "Month",
                                            "type": "number"
                                          },
                                          "year": {
                                            "description": "Year",
                                            "type": "number"
                                          }
                                        }
                                      },
                                      "grade": {
                                        "description": "Grade of the education.",
                                        "type": "string"
                                      },
                                      "activities": {
                                        "description": "Activities and societies. Ex: Alpha Phi Omega, Marching Brand, Volleyball",
                                        "type": "string"
                                      },
                                      "description": {
                                        "description": "Description of the education.",
                                        "type": "string"
                                      },
                                      "skills": {
                                        "description": "Skills to associate with this education entry. Use this field only inside `education`; it is independent from the profile-level and experience `skills` fields. These skills also appear in the profile Skills section.",
                                        "type": "array",
                                        "items": {
                                          "type": "object",
                                          "required": [
                                            "name"
                                          ],
                                          "properties": {
                                            "name": {
                                              "type": "string"
                                            },
                                            "id": {
                                              "description": "A parameter ID. Use <a href=\"https://developer.unipile.com/v2.0/reference/getclassicsearchparameters\">List Search Parameters</a> with `SKILL` type to find out the possible values.",
                                              "type": "string"
                                            }
                                          }
                                        }
                                      },
                                      "media": {
                                        "anyOf": [
                                          {
                                            "title": "File",
                                            "type": "object",
                                            "required": [
                                              "type",
                                              "attachment"
                                            ],
                                            "properties": {
                                              "title": {
                                                "description": "Title of the media.",
                                                "type": "string"
                                              },
                                              "description": {
                                                "description": "Description of the media.",
                                                "type": "string"
                                              },
                                              "type": {
                                                "type": "string",
                                                "enum": [
                                                  "file"
                                                ]
                                              },
                                              "attachment": {
                                                "description": "A file to be uploaded.",
                                                "additionalProperties": false,
                                                "type": "object",
                                                "required": [
                                                  "content",
                                                  "content_type",
                                                  "filename"
                                                ],
                                                "properties": {
                                                  "content": {
                                                    "description": "Content of the file encoded as base64. For large files, prefer using multipart, learn more here: https://developer.unipile.com/v2.0/reference/api-usage#sending-files",
                                                    "type": "string"
                                                  },
                                                  "content_type": {
                                                    "description": "<a href=\"https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types\">MIME type</a> of the file.",
                                                    "type": "string"
                                                  },
                                                  "filename": {
                                                    "description": "Name of the file (including extension).",
                                                    "type": "string"
                                                  },
                                                  "metadata": {
                                                    "description": "Metadata of the the file.",
                                                    "type": "object",
                                                    "properties": {
                                                      "duration": {
                                                        "description": "Duration of the media file.",
                                                        "type": "number"
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          },
                                          {
                                            "title": "Link",
                                            "type": "object",
                                            "required": [
                                              "type",
                                              "url"
                                            ],
                                            "properties": {
                                              "title": {
                                                "description": "Title of the media.",
                                                "type": "string"
                                              },
                                              "description": {
                                                "description": "Description of the media.",
                                                "type": "string"
                                              },
                                              "type": {
                                                "type": "string",
                                                "enum": [
                                                  "link"
                                                ]
                                              },
                                              "url": {
                                                "description": "URL of the link.",
                                                "type": "string"
                                              },
                                              "thumbnail": {
                                                "description": "A file to be uploaded.",
                                                "additionalProperties": false,
                                                "type": "object",
                                                "required": [
                                                  "content",
                                                  "content_type",
                                                  "filename"
                                                ],
                                                "properties": {
                                                  "content": {
                                                    "description": "Content of the file encoded as base64. For large files, prefer using multipart, learn more here: https://developer.unipile.com/v2.0/reference/api-usage#sending-files",
                                                    "type": "string"
                                                  },
                                                  "content_type": {
                                                    "description": "<a href=\"https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types\">MIME type</a> of the file.",
                                                    "type": "string"
                                                  },
                                                  "filename": {
                                                    "description": "Name of the file (including extension).",
                                                    "type": "string"
                                                  },
                                                  "metadata": {
                                                    "description": "Metadata of the the file.",
                                                    "type": "object",
                                                    "properties": {
                                                      "duration": {
                                                        "description": "Duration of the media file.",
                                                        "type": "number"
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        ]
                                      },
                                      "operation": {
                                        "type": "string",
                                        "enum": [
                                          "create"
                                        ]
                                      }
                                    }
                                  },
                                  {
                                    "title": "Edit existing education",
                                    "type": "object",
                                    "required": [
                                      "operation",
                                      "id"
                                    ],
                                    "properties": {
                                      "notify_network": {
                                        "description": "Notify the network about the education. Turn on to notify your network of key profile changes (such as new education) and work anniversaries.",
                                        "default": false,
                                        "type": "boolean"
                                      },
                                      "school": {
                                        "description": "School of the education.",
                                        "type": "object",
                                        "required": [
                                          "name"
                                        ],
                                        "properties": {
                                          "name": {
                                            "type": "string"
                                          },
                                          "id": {
                                            "description": "A parameter ID. Use <a href=\"https://developer.unipile.com/v2.0/reference/getclassicsearchparameters\">List Search Parameters</a> with `SCHOOL` type to find out the possible values.",
                                            "type": "string"
                                          }
                                        }
                                      },
                                      "degree": {
                                        "description": "Degree of the education.",
                                        "type": "object",
                                        "required": [
                                          "name"
                                        ],
                                        "properties": {
                                          "name": {
                                            "type": "string"
                                          },
                                          "id": {
                                            "description": "A parameter ID. Use <a href=\"https://developer.unipile.com/v2.0/reference/getclassicsearchparameters\">List Search Parameters</a> with `DEGREE` type to find out the possible values.",
                                            "type": "string"
                                          }
                                        }
                                      },
                                      "field_of_study": {
                                        "description": "Field of study of the education.",
                                        "type": "object",
                                        "required": [
                                          "name"
                                        ],
                                        "properties": {
                                          "name": {
                                            "type": "string"
                                          },
                                          "id": {
                                            "description": "A parameter ID. Use <a href=\"https://developer.unipile.com/v2.0/reference/getclassicsearchparameters\">List Search Parameters</a> with `FIELD_OF_STUDY` type to find out the possible values.",
                                            "type": "string"
                                          }
                                        }
                                      },
                                      "start_date": {
                                        "description": "The start date of the education.",
                                        "type": "object",
                                        "required": [
                                          "month",
                                          "year"
                                        ],
                                        "properties": {
                                          "month": {
                                            "description": "Month",
                                            "type": "number"
                                          },
                                          "year": {
                                            "description": "Year",
                                            "type": "number"
                                          }
                                        }
                                      },
                                      "end_date": {
                                        "description": "The end date of the education.",
                                        "type": "object",
                                        "required": [
                                          "month",
                                          "year"
                                        ],
                                        "properties": {
                                          "month": {
                                            "description": "Month",
                                            "type": "number"
                                          },
                                          "year": {
                                            "description": "Year",
                                            "type": "number"
                                          }
                                        }
                                      },
                                      "grade": {
                                        "description": "Grade of the education.",
                                        "type": "string"
                                      },
                                      "activities": {
                                        "description": "Activities and societies. Ex: Alpha Phi Omega, Marching Brand, Volleyball",
                                        "type": "string"
                                      },
                                      "description": {
                                        "description": "Description of the education.",
                                        "type": "string"
                                      },
                                      "skills": {
                                        "description": "Skills to associate with this education entry. Use this field only inside `education`; it is independent from the profile-level and experience `skills` fields. These skills also appear in the profile Skills section.",
                                        "type": "array",
                                        "items": {
                                          "type": "object",
                                          "required": [
                                            "name"
                                          ],
                                          "properties": {
                                            "name": {
                                              "type": "string"
                                            },
                                            "id": {
                                              "description": "A parameter ID. Use <a href=\"https://developer.unipile.com/v2.0/reference/getclassicsearchparameters\">List Search Parameters</a> with `SKILL` type to find out the possible values.",
                                              "type": "string"
                                            }
                                          }
                                        }
                                      },
                                      "media": {
                                        "anyOf": [
                                          {
                                            "title": "File",
                                            "type": "object",
                                            "required": [
                                              "type",
                                              "attachment"
                                            ],
                                            "properties": {
                                              "title": {
                                                "description": "Title of the media.",
                                                "type": "string"
                                              },
                                              "description": {
                                                "description": "Description of the media.",
                                                "type": "string"
                                              },
                                              "type": {
                                                "type": "string",
                                                "enum": [
                                                  "file"
                                                ]
                                              },
                                              "attachment": {
                                                "description": "A file to be uploaded.",
                                                "additionalProperties": false,
                                                "type": "object",
                                                "required": [
                                                  "content",
                                                  "content_type",
                                                  "filename"
                                                ],
                                                "properties": {
                                                  "content": {
                                                    "description": "Content of the file encoded as base64. For large files, prefer using multipart, learn more here: https://developer.unipile.com/v2.0/reference/api-usage#sending-files",
                                                    "type": "string"
                                                  },
                                                  "content_type": {
                                                    "description": "<a href=\"https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types\">MIME type</a> of the file.",
                                                    "type": "string"
                                                  },
                                                  "filename": {
                                                    "description": "Name of the file (including extension).",
                                                    "type": "string"
                                                  },
                                                  "metadata": {
                                                    "description": "Metadata of the the file.",
                                                    "type": "object",
                                                    "properties": {
                                                      "duration": {
                                                        "description": "Duration of the media file.",
                                                        "type": "number"
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          },
                                          {
                                            "title": "Link",
                                            "type": "object",
                                            "required": [
                                              "type",
                                              "url"
                                            ],
                                            "properties": {
                                              "title": {
                                                "description": "Title of the media.",
                                                "type": "string"
                                              },
                                              "description": {
                                                "description": "Description of the media.",
                                                "type": "string"
                                              },
                                              "type": {
                                                "type": "string",
                                                "enum": [
                                                  "link"
                                                ]
                                              },
                                              "url": {
                                                "description": "URL of the link.",
                                                "type": "string"
                                              },
                                              "thumbnail": {
                                                "description": "A file to be uploaded.",
                                                "additionalProperties": false,
                                                "type": "object",
                                                "required": [
                                                  "content",
                                                  "content_type",
                                                  "filename"
                                                ],
                                                "properties": {
                                                  "content": {
                                                    "description": "Content of the file encoded as base64. For large files, prefer using multipart, learn more here: https://developer.unipile.com/v2.0/reference/api-usage#sending-files",
                                                    "type": "string"
                                                  },
                                                  "content_type": {
                                                    "description": "<a href=\"https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types\">MIME type</a> of the file.",
                                                    "type": "string"
                                                  },
                                                  "filename": {
                                                    "description": "Name of the file (including extension).",
                                                    "type": "string"
                                                  },
                                                  "metadata": {
                                                    "description": "Metadata of the the file.",
                                                    "type": "object",
                                                    "properties": {
                                                      "duration": {
                                                        "description": "Duration of the media file.",
                                                        "type": "number"
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        ]
                                      },
                                      "operation": {
                                        "type": "string",
                                        "enum": [
                                          "edit"
                                        ]
                                      },
                                      "id": {
                                        "description": "ID of the education to edit.",
                                        "type": "string"
                                      }
                                    }
                                  },
                                  {
                                    "title": "Delete an education",
                                    "type": "object",
                                    "required": [
                                      "operation",
                                      "id"
                                    ],
                                    "properties": {
                                      "operation": {
                                        "type": "string",
                                        "enum": [
                                          "delete"
                                        ]
                                      },
                                      "id": {
                                        "minLength": 1,
                                        "description": "ID of the education to delete.",
                                        "type": "string"
                                      }
                                    }
                                  }
                                ]
                              },
                              "picture_options": {
                                "type": "object",
                                "properties": {
                                  "filter": {
                                    "description": "A visual filter to be applied to the picture.",
                                    "type": "string",
                                    "enum": [
                                      "original",
                                      "studio",
                                      "spotlight",
                                      "prime",
                                      "classic",
                                      "edge",
                                      "luminate"
                                    ]
                                  },
                                  "layout": {
                                    "description": "A list of spatial coordinates to manage picture positionning.",
                                    "type": "object",
                                    "properties": {
                                      "bottom_left": {
                                        "type": "object",
                                        "required": [
                                          "x",
                                          "y"
                                        ],
                                        "properties": {
                                          "x": {
                                            "description": "The position of the corner on the `x` axis.",
                                            "type": "number"
                                          },
                                          "y": {
                                            "description": "The position of the corner on the `y` axis.",
                                            "type": "number"
                                          }
                                        }
                                      },
                                      "bottom_right": {
                                        "type": "object",
                                        "required": [
                                          "x",
                                          "y"
                                        ],
                                        "properties": {
                                          "x": {
                                            "description": "The position of the corner on the `x` axis.",
                                            "type": "number"
                                          },
                                          "y": {
                                            "description": "The position of the corner on the `y` axis.",
                                            "type": "number"
                                          }
                                        }
                                      },
                                      "top_left": {
                                        "type": "object",
                                        "required": [
                                          "x",
                                          "y"
                                        ],
                                        "properties": {
                                          "x": {
                                            "description": "The position of the corner on the `x` axis.",
                                            "type": "number"
                                          },
                                          "y": {
                                            "description": "The position of the corner on the `y` axis.",
                                            "type": "number"
                                          }
                                        }
                                      },
                                      "top_right": {
                                        "type": "object",
                                        "required": [
                                          "x",
                                          "y"
                                        ],
                                        "properties": {
                                          "x": {
                                            "description": "The position of the corner on the `x` axis.",
                                            "type": "number"
                                          },
                                          "y": {
                                            "description": "The position of the corner on the `y` axis.",
                                            "type": "number"
                                          }
                                        }
                                      }
                                    }
                                  },
                                  "contrast": {
                                    "minimum": -0.3,
                                    "maximum": 0.3,
                                    "description": "The level of contrast.",
                                    "type": "number"
                                  },
                                  "vignette": {
                                    "minimum": -0.3,
                                    "maximum": 0.3,
                                    "description": "The level of vignetting.",
                                    "type": "number"
                                  },
                                  "saturation": {
                                    "minimum": -0.3,
                                    "maximum": 0.3,
                                    "description": "The level of saturation.",
                                    "type": "number"
                                  },
                                  "brightness": {
                                    "minimum": -0.3,
                                    "maximum": 0.3,
                                    "description": "The level of brightness.",
                                    "type": "number"
                                  }
                                }
                              },
                              "background_picture_options": {
                                "type": "object",
                                "properties": {
                                  "filter": {
                                    "description": "A visual filter to be applied to the picture.",
                                    "type": "string",
                                    "enum": [
                                      "original",
                                      "studio",
                                      "spotlight",
                                      "prime",
                                      "classic",
                                      "edge",
                                      "luminate"
                                    ]
                                  },
                                  "layout": {
                                    "description": "A list of spatial coordinates to manage picture positionning.",
                                    "type": "object",
                                    "properties": {
                                      "bottom_left": {
                                        "type": "object",
                                        "required": [
                                          "x",
                                          "y"
                                        ],
                                        "properties": {
                                          "x": {
                                            "description": "The position of the corner on the `x` axis.",
                                            "type": "number"
                                          },
                                          "y": {
                                            "description": "The position of the corner on the `y` axis.",
                                            "type": "number"
                                          }
                                        }
                                      },
                                      "bottom_right": {
                                        "type": "object",
                                        "required": [
                                          "x",
                                          "y"
                                        ],
                                        "properties": {
                                          "x": {
                                            "description": "The position of the corner on the `x` axis.",
                                            "type": "number"
                                          },
                                          "y": {
                                            "description": "The position of the corner on the `y` axis.",
                                            "type": "number"
                                          }
                                        }
                                      },
                                      "top_left": {
                                        "type": "object",
                                        "required": [
                                          "x",
                                          "y"
                                        ],
                                        "properties": {
                                          "x": {
                                            "description": "The position of the corner on the `x` axis.",
                                            "type": "number"
                                          },
                                          "y": {
                                            "description": "The position of the corner on the `y` axis.",
                                            "type": "number"
                                          }
                                        }
                                      },
                                      "top_right": {
                                        "type": "object",
                                        "required": [
                                          "x",
                                          "y"
                                        ],
                                        "properties": {
                                          "x": {
                                            "description": "The position of the corner on the `x` axis.",
                                            "type": "number"
                                          },
                                          "y": {
                                            "description": "The position of the corner on the `y` axis.",
                                            "type": "number"
                                          }
                                        }
                                      }
                                    }
                                  },
                                  "contrast": {
                                    "minimum": -0.3,
                                    "maximum": 0.3,
                                    "description": "The level of contrast.",
                                    "type": "number"
                                  },
                                  "vignette": {
                                    "minimum": -0.3,
                                    "maximum": 0.3,
                                    "description": "The level of vignetting.",
                                    "type": "number"
                                  },
                                  "saturation": {
                                    "minimum": -0.3,
                                    "maximum": 0.3,
                                    "description": "The level of saturation.",
                                    "type": "number"
                                  },
                                  "brightness": {
                                    "minimum": -0.3,
                                    "maximum": 0.3,
                                    "description": "The level of brightness.",
                                    "type": "number"
                                  }
                                }
                              },
                              "custom_link": {
                                "anyOf": [
                                  {
                                    "type": "object",
                                    "required": [
                                      "type",
                                      "url"
                                    ],
                                    "properties": {
                                      "type": {
                                        "description": "The type of link.",
                                        "type": "string",
                                        "enum": [
                                          "STORE",
                                          "WEBSITE",
                                          "PORTFOLIO",
                                          "BLOG",
                                          "NEWSLETTER"
                                        ]
                                      },
                                      "url": {
                                        "description": "The URL of the link.",
                                        "type": "string"
                                      },
                                      "display_on": {
                                        "default": "EVERYWHERE",
                                        "description": "Whether the link should be displayed everywhere or only on the profile.",
                                        "type": "string",
                                        "enum": [
                                          "PROFILE_ONLY",
                                          "EVERYWHERE"
                                        ]
                                      }
                                    }
                                  },
                                  {
                                    "description": "Deletes the existing custom link.",
                                    "type": "null"
                                  }
                                ]
                              },
                              "open_to_work": {
                                "anyOf": [
                                  {
                                    "type": "object",
                                    "required": [
                                      "job_title",
                                      "workplace",
                                      "visibility"
                                    ],
                                    "properties": {
                                      "job_title": {
                                        "description": "A list of job titles you would like to hold.",
                                        "type": "array",
                                        "items": {
                                          "type": "object",
                                          "required": [
                                            "title",
                                            "id"
                                          ],
                                          "properties": {
                                            "title": {
                                              "description": "The title of the job.",
                                              "type": "string"
                                            },
                                            "id": {
                                              "description": "A parameter ID. Use <a href=\"https://developer.unipile.com/v2.0/reference/getclassicsearchparameters\">List Search Parameters</a> with `JOB_TITLE` type to find out the possible values.",
                                              "type": "string"
                                            }
                                          }
                                        }
                                      },
                                      "workplace": {
                                        "description": "A list of desired workplaces.",
                                        "type": "array",
                                        "items": {
                                          "type": "object",
                                          "required": [
                                            "type",
                                            "location"
                                          ],
                                          "properties": {
                                            "type": {
                                              "description": "The type of workplace.",
                                              "type": "string",
                                              "enum": [
                                                "ON_SITE",
                                                "HYBRID",
                                                "REMOTE"
                                              ]
                                            },
                                            "location": {
                                              "description": "A list of parameter IDs. Use <a href=\"https://developer.unipile.com/v2.0/reference/getclassicsearchparameters\">List Search Parameters</a> with `LOCATION` type to find out the possible values.",
                                              "type": "array",
                                              "items": {
                                                "type": "string"
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "start_date": {
                                        "description": "The timeframe by which you would like to start.",
                                        "type": "string",
                                        "enum": [
                                          "IMMEDIATELY",
                                          "FLEXIBLE"
                                        ]
                                      },
                                      "employment_type": {
                                        "description": "A list of employment types.",
                                        "type": "array",
                                        "items": {
                                          "type": "string",
                                          "enum": [
                                            "FULL_TIME",
                                            "PART_TIME",
                                            "CONTRACT",
                                            "INTERNSHIP",
                                            "TEMPORARY"
                                          ]
                                        }
                                      },
                                      "visibility": {
                                        "description": "Who can view that you are open to work.",
                                        "type": "string",
                                        "enum": [
                                          "ALL",
                                          "RECRUITERS_ONLY"
                                        ]
                                      }
                                    }
                                  },
                                  {
                                    "description": "Disables Open to Work.",
                                    "type": "null"
                                  }
                                ]
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
        },
        "parameters": [
          {
            "schema": {
              "minLength": 1,
              "type": "string"
            },
            "in": "path",
            "name": "user_id",
            "required": true,
            "description": "The ID of the User to update. Use `me` to update the account owner profile."
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
            "name": "Update user profile",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipileUsers } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipileUsers = new UnipileUsers({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipileUsers.updateUserProfile(\n  {\n    path: {\n      user_id: 'user_id',\n      account_id: ACCOUNT_ID,\n    },\n    body: {\n      first_name: 'value',\n    },\n  }\n);"
          },
          {
            "name": "Update user profile",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    users_api = unipile.UsersApi(api_client)\n\nresponse = users_api.update_user_profile(\n    'user_id',\n    ACCOUNT_ID,\n    {\n    'first_name': 'value',\n  }\n)"
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
                        "UserProfileUpdated"
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