---
updatedAt: 2026-04-24T15:33:11.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Solve a Checkpoint

Solve the current checkpoint for the given authentication intent.

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
      "name": "Custom Auth",
      "description": "Custom account authentication"
    }
  ],
  "paths": {
    "/v2/auth/checkpoint": {
      "post": {
        "operationId": "solveCheckpoint",
        "summary": "Solve a Checkpoint",
        "tags": [
          "Custom Auth"
        ],
        "description": "Solve the current checkpoint for the given authentication intent.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "code",
                  "intent_id"
                ],
                "properties": {
                  "code": {
                    "description": "The code to solve the checkpoint. Check the AuthenticationCheckpoint response you have already obtained to see what type of code is expected.",
                    "type": "string"
                  },
                  "credential": {
                    "description": "The secret that goes with the chosen option, when the checkpoint asks for one. On ENCRYPTED_HISTORY, `code` names the option and this carries the PIN or the recovery code; it is left out when the option needs no secret.",
                    "type": "string"
                  },
                  "intent_id": {
                    "description": "The ID of the intent for which a checkpoint must be solved.",
                    "type": "string",
                    "pattern": "^acc_(.*)$"
                  }
                }
              }
            }
          },
          "required": true
        },
        "x-samples-languages": [
          "node",
          "python",
          "curl"
        ],
        "x-code-samples": [
          {
            "name": "Solve checkpoint",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipileCustomAuth } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipileCustomAuth = new UnipileCustomAuth({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipileCustomAuth.solveCheckpoint(\n  {\n    body: {\n      code: '123456',\n      intent_id: 'intent_id',\n    },\n  }\n);"
          },
          {
            "name": "Solve checkpoint",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    custom_auth_api = unipile.CustomAuthApi(api_client)\n\nresponse = custom_auth_api.solve_checkpoint(\n    {\n    'code': '123456',\n    'intent_id': 'intent_id',\n  }\n)"
          }
        ],
        "responses": {
          "200": {
            "description": "Default Response",
            "content": {
              "application/json": {
                "schema": {
                  "anyOf": [
                    {
                      "title": "Checkpoint",
                      "description": "The authentication requires a checkpoint to be solved.",
                      "type": "object",
                      "required": [
                        "object",
                        "checkpoint",
                        "intent_id"
                      ],
                      "properties": {
                        "object": {
                          "type": "string",
                          "enum": [
                            "AuthenticationCheckpoint"
                          ]
                        },
                        "checkpoint": {
                          "description": "The details of the checkpoint that user needs to solve.",
                          "anyOf": [
                            {
                              "title": "One-Time Password",
                              "description": "A one-time password was sent to the user's phone or email address. The user needs to enter the code in the next checkpoint.",
                              "type": "object",
                              "required": [
                                "type"
                              ],
                              "properties": {
                                "type": {
                                  "type": "string",
                                  "enum": [
                                    "OTP"
                                  ]
                                },
                                "channel": {
                                  "description": "The channel the one-time password was sent through, when known.",
                                  "type": "string",
                                  "enum": [
                                    "EMAIL",
                                    "SMS",
                                    "WHATSAPP"
                                  ]
                                }
                              }
                            },
                            {
                              "title": "In App Validation",
                              "description": "A notification was sent to the user's phone. The user needs to validate the notification by clicking on the link in the notification.",
                              "type": "object",
                              "required": [
                                "type"
                              ],
                              "properties": {
                                "type": {
                                  "type": "string",
                                  "enum": [
                                    "IN_APP_VALIDATION"
                                  ]
                                },
                                "code": {
                                  "description": "For number-matching approvals: the digits shown here that the user must select among the choices in their notification.",
                                  "type": "string"
                                }
                              }
                            },
                            {
                              "title": "Pairing Code",
                              "description": "A pairing code must be entered in the provider app to complete authentication.",
                              "type": "object",
                              "required": [
                                "type",
                                "code"
                              ],
                              "properties": {
                                "type": {
                                  "type": "string",
                                  "enum": [
                                    "PAIRING_CODE"
                                  ]
                                },
                                "code": {
                                  "description": "The pairing code to enter on the phone to link the device.",
                                  "type": "string"
                                }
                              }
                            },
                            {
                              "title": "Phone Register",
                              "description": "The user needs to register their phone number so an OTP can be sent.",
                              "type": "object",
                              "required": [
                                "type"
                              ],
                              "properties": {
                                "type": {
                                  "type": "string",
                                  "enum": [
                                    "PHONE_REGISTER"
                                  ]
                                }
                              }
                            },
                            {
                              "title": "Two Factor Authentication",
                              "description": "The user needs to enter the code generated by the Authenticator App used to setup 2FA or received by SMS.",
                              "type": "object",
                              "required": [
                                "type",
                                "platform"
                              ],
                              "properties": {
                                "type": {
                                  "type": "string",
                                  "enum": [
                                    "2FA"
                                  ]
                                },
                                "platform": {
                                  "description": "The platform of the 2FA.\n          - `SMS` means the code was sent in a SMS.\n          - `APP` means the user must enter the code generated by the Authenticator App used to setup 2FA.\n          - `WHATSAPP` means the code was sent via WhatsApp.",
                                  "type": "string",
                                  "enum": [
                                    "SMS",
                                    "APP",
                                    "WHATSAPP"
                                  ]
                                }
                              }
                            },
                            {
                              "title": "Captcha",
                              "description": "The user needs to solve a captcha checkpoint.",
                              "type": "object",
                              "required": [
                                "type",
                                "public_key",
                                "data"
                              ],
                              "properties": {
                                "type": {
                                  "type": "string",
                                  "enum": [
                                    "CAPTCHA"
                                  ]
                                },
                                "public_key": {
                                  "description": "The public key of the CAPTCHA. This is used to verify the CAPTCHA.",
                                  "anyOf": [
                                    {
                                      "type": "string"
                                    },
                                    {
                                      "type": "null"
                                    }
                                  ]
                                },
                                "data": {
                                  "description": "The data of the CAPTCHA. This is used to verify the CAPTCHA.",
                                  "anyOf": [
                                    {
                                      "type": "string"
                                    },
                                    {
                                      "type": "null"
                                    }
                                  ]
                                }
                              }
                            },
                            {
                              "title": "OTP or In App Validation",
                              "description": "The user can either enter a one-time password sent to their phone/email or validate a notification sent to their phone.",
                              "type": "object",
                              "required": [
                                "type"
                              ],
                              "properties": {
                                "type": {
                                  "type": "string",
                                  "enum": [
                                    "OTP_OR_IN_APP_VALIDATION"
                                  ]
                                },
                                "channel": {
                                  "description": "The channel the one-time password was sent through, when known.",
                                  "type": "string",
                                  "enum": [
                                    "EMAIL",
                                    "SMS",
                                    "WHATSAPP"
                                  ]
                                }
                              }
                            },
                            {
                              "title": "Contract Selection",
                              "description": "The user must pick a contract from a list to activate the correct features and complete authentication.",
                              "type": "object",
                              "required": [
                                "type",
                                "contracts"
                              ],
                              "properties": {
                                "type": {
                                  "type": "string",
                                  "enum": [
                                    "CONTRACT_SELECTION"
                                  ]
                                },
                                "contracts": {
                                  "description": "A list of contracts to choose from.",
                                  "type": "array",
                                  "items": {
                                    "type": "object",
                                    "required": [
                                      "id",
                                      "name"
                                    ],
                                    "properties": {
                                      "id": {
                                        "description": "The ID of the contract.",
                                        "type": "string"
                                      },
                                      "name": {
                                        "description": "The name of the contract.",
                                        "type": "string"
                                      }
                                    }
                                  }
                                }
                              }
                            },
                            {
                              "title": "Consent Screen",
                              "description": "The user must select the products that will be activated on the account.",
                              "type": "object",
                              "required": [
                                "type",
                                "products"
                              ],
                              "properties": {
                                "type": {
                                  "type": "string",
                                  "enum": [
                                    "CONSENT_SCREEN"
                                  ]
                                },
                                "products": {
                                  "description": "A list of products to choose from.",
                                  "type": "array",
                                  "items": {
                                    "type": "object",
                                    "required": [
                                      "id",
                                      "display_name"
                                    ],
                                    "properties": {
                                      "id": {
                                        "description": "The ID of the product.",
                                        "type": "string"
                                      },
                                      "display_name": {
                                        "description": "The display name of the product.",
                                        "type": "string"
                                      },
                                      "description": {
                                        "description": "What the product gives access to, shown under its name.",
                                        "type": "string"
                                      },
                                      "icon_url": {
                                        "description": "An image of the product's own (e.g. a Page's picture), shown instead of the provider icon.",
                                        "type": "string"
                                      }
                                    }
                                  }
                                }
                              }
                            },
                            {
                              "title": "Challenge Selection",
                              "description": "The user must pick which alternative verification method to use to receive their code.",
                              "type": "object",
                              "required": [
                                "type",
                                "challenges"
                              ],
                              "properties": {
                                "type": {
                                  "type": "string",
                                  "enum": [
                                    "CHALLENGE_SELECTION"
                                  ]
                                },
                                "challenges": {
                                  "description": "A list of alternative verification methods to choose from.",
                                  "type": "array",
                                  "items": {
                                    "type": "object",
                                    "required": [
                                      "id",
                                      "label"
                                    ],
                                    "properties": {
                                      "id": {
                                        "description": "Identifier of the method (EMAIL, SMS, WHATSAPP or any agnostic ID). Send it back as the `challenge` field of Request Checkpoint to switch to this method.",
                                        "type": "string"
                                      },
                                      "label": {
                                        "description": "Human-readable name of the method (e.g. \"WhatsApp\", \"Text message\", \"Email\").",
                                        "type": "string"
                                      },
                                      "description": {
                                        "description": "Extra detail about the method, e.g. the masked destination the code will be sent to.",
                                        "type": "string"
                                      }
                                    }
                                  }
                                }
                              }
                            },
                            {
                              "title": "Loading",
                              "description": "The authentication is continuing in the background and requires no user input.",
                              "type": "object",
                              "required": [
                                "type"
                              ],
                              "properties": {
                                "type": {
                                  "type": "string",
                                  "enum": [
                                    "LOADING"
                                  ]
                                }
                              }
                            },
                            {
                              "title": "Encrypted History",
                              "description": "The user must choose whether to unlock the end-to-end encrypted message history, and with which credential.",
                              "type": "object",
                              "required": [
                                "type",
                                "options",
                                "attempts_remaining"
                              ],
                              "properties": {
                                "type": {
                                  "type": "string",
                                  "enum": [
                                    "ENCRYPTED_HISTORY"
                                  ]
                                },
                                "options": {
                                  "description": "The ways the user can answer. Send the chosen `id` as the `code` of Solve Checkpoint.",
                                  "type": "array",
                                  "items": {
                                    "type": "object",
                                    "required": [
                                      "id",
                                      "label"
                                    ],
                                    "properties": {
                                      "id": {
                                        "description": "PIN and RECOVERY_CODE unlock the end-to-end encrypted message history; SKIP leaves it off, and the account then only reports new messages as they arrive.",
                                        "type": "string",
                                        "enum": [
                                          "PIN",
                                          "RECOVERY_CODE",
                                          "SKIP"
                                        ]
                                      },
                                      "label": {
                                        "description": "Human-readable name of the option.",
                                        "type": "string"
                                      },
                                      "description": {
                                        "description": "Extra detail about what the option entails.",
                                        "type": "string"
                                      },
                                      "attempts_remaining": {
                                        "description": "How many more times this credential may be submitted. Each credential has a budget of its own, starting at 3, so running one out leaves the others open. A PIN is further capped at half of what the provider still allows, so the user can be wrong here without ever being the reason the backup locks. `0` means the option cannot be used any more; absent on options that take no credential.",
                                        "type": "integer"
                                      }
                                    }
                                  }
                                },
                                "attempts_remaining": {
                                  "description": "The most submissions any credential still has — what the user has left overall. `0` means every credential is spent and only skipping remains. The detail per credential is in `options[].attempts_remaining`; a credential the provider refuses to even try does not consume one.",
                                  "type": "integer"
                                },
                                "provider_attempts_remaining": {
                                  "description": "For a PIN, how many attempts the provider itself still allows before it locks the backup. This budget is the provider's own and is never spent on the user's behalf: when it is unknown or too low, the PIN is refused rather than tried.",
                                  "type": "integer"
                                },
                                "last_attempt": {
                                  "description": "Why the previous submission did not unlock the history. Absent the first time this checkpoint is served, so its presence is what tells the user their last answer failed.",
                                  "type": "object",
                                  "required": [
                                    "option",
                                    "error"
                                  ],
                                  "properties": {
                                    "option": {
                                      "description": "PIN and RECOVERY_CODE unlock the end-to-end encrypted message history; SKIP leaves it off, and the account then only reports new messages as they arrive.",
                                      "type": "string",
                                      "enum": [
                                        "PIN",
                                        "RECOVERY_CODE",
                                        "SKIP"
                                      ]
                                    },
                                    "error": {
                                      "description": "INVALID_CREDENTIAL: the PIN or recovery code was wrong, and one attempt was spent. REFUSED_TO_PROTECT_BACKUP: the PIN was not even submitted, because the provider had too few attempts left to risk one — no attempt was spent, and only the recovery code can unlock the history now.",
                                      "type": "string",
                                      "enum": [
                                        "INVALID_CREDENTIAL",
                                        "REFUSED_TO_PROTECT_BACKUP"
                                      ]
                                    }
                                  }
                                }
                              }
                            }
                          ]
                        },
                        "intent_id": {
                          "description": "The ID of the auth intent. This should be used in Solve Checkpoint.",
                          "type": "string",
                          "pattern": "^acc_(.*)$"
                        }
                      }
                    },
                    {
                      "title": "QR Code",
                      "description": "The authentication was started for a QR Code.",
                      "type": "object",
                      "required": [
                        "object",
                        "qrcode",
                        "intent_id"
                      ],
                      "properties": {
                        "object": {
                          "type": "string",
                          "enum": [
                            "AuthenticationQrCode"
                          ]
                        },
                        "qrcode": {
                          "description": "The QR Code to scan.",
                          "type": "string"
                        },
                        "intent_id": {
                          "description": "The ID of the auth intent. This should be used to listen for the QR Code scan with Solve Checkpoint.",
                          "type": "string",
                          "pattern": "^acc_(.*)$"
                        }
                      }
                    },
                    {
                      "title": "Oauth URL",
                      "description": "For Oauth providers (Outlook, Google)",
                      "type": "object",
                      "required": [
                        "object",
                        "url"
                      ],
                      "properties": {
                        "object": {
                          "type": "string",
                          "enum": [
                            "OauthUrl"
                          ]
                        },
                        "url": {
                          "description": "The URL to redirect to start the oauth flow of the provider.",
                          "type": "string"
                        }
                      }
                    },
                    {
                      "title": "Account",
                      "type": "object",
                      "required": [
                        "object",
                        "user_id",
                        "created_at",
                        "id",
                        "application_id",
                        "status",
                        "is_locked",
                        "provider",
                        "metadata"
                      ],
                      "properties": {
                        "object": {
                          "description": "The type of the returned object.",
                          "type": "string",
                          "enum": [
                            "Account"
                          ]
                        },
                        "user_id": {
                          "description": "The ID of the user that owns the account for the provider.",
                          "type": "string"
                        },
                        "name": {
                          "description": "The name of the account. This is usually the display name or public identifier (phone number, email address, etc.) of the user that owns the account.",
                          "type": "string"
                        },
                        "created_at": {
                          "description": "The date and time the account was linked with Unipile.",
                          "type": "string"
                        },
                        "id": {
                          "description": "ID of the account.",
                          "type": "string",
                          "pattern": "^acc_(.*)$"
                        },
                        "application_id": {
                          "description": "ID of the parent application.",
                          "type": "string",
                          "pattern": "^app_(.*)$"
                        },
                        "account_scope_id": {
                          "description": "ID of the Scope assigned to the Account. Once assigned, the Scope cannot be removed or replaced.",
                          "anyOf": [
                            {
                              "type": "string",
                              "pattern": "^scope_(.*)$"
                            },
                            {
                              "type": "null"
                            }
                          ]
                        },
                        "status": {
                          "description": "The current status of the account.\n    - `running` is Operational.\n    - `errored` is Service Interuption.\n    - `disconnected` requires authentication.\n    - `degraded` means at least one product is running while another is errored; inspect `metadata.products_connection_status`.\n    - `partial` means at least one product is running while another requires authentication; inspect `metadata.products_connection_status`.\n    Learn more about [Status & Lifecycle](https://developer.unipile.com/v2.0/docs/status-lifecycle).",
                          "type": "string",
                          "enum": [
                            "running",
                            "errored",
                            "disconnected",
                            "degraded",
                            "partial"
                          ]
                        },
                        "is_locked": {
                          "description": "Whether API access to the account is locked.",
                          "type": "boolean"
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
                        "oauth_scope": {
                          "description": "If the provider is OAuth, this is the scope of comma-separated permissions granted to the account.",
                          "type": "string"
                        },
                        "metadata": {
                          "description": "Metadata associated with the Account.",
                          "type": "object",
                          "properties": {
                            "auto_proxy_country": {
                              "description": "The preferred country for automatic proxy selection. A country inferred from an IP may be outside Unipile’s proxy offering. The current proxy may be in another country when fallback is allowed and no proxy is available in the preferred country.",
                              "type": "string"
                            },
                            "allow_country_fallback": {
                              "description": "Whether an available proxy from another country may be used when none is available in the rotation country, during authentication and throughout the account lifetime. Defaults to true. A country included in Unipile’s proxy offering may still have no proxy currently available. If false, authentication fails when no proxy is available in the rotation country. If the selected proxy later fails and no replacement is available there, the account enters Service interruption. Rotation to another available proxy in that country remains allowed.",
                              "type": "boolean"
                            },
                            "connection_method": {
                              "description": "The authentication method that currently owns the account session lifecycle.",
                              "type": "string",
                              "enum": [
                                "credentials",
                                "cookies",
                                "unilogin"
                              ]
                            },
                            "v1_account_id": {
                              "description": "The ID of the account in the v1 if the account is migrated from v1.",
                              "type": "string"
                            },
                            "v1_instance_port": {
                              "description": "The port of the v1 instance from which the account was migrated.",
                              "type": "number"
                            },
                            "products_connection_status": {
                              "description": "The status of the connection to a product, if the account is connected to multiple products.",
                              "type": "object",
                              "additionalProperties": {
                                "type": "string",
                                "enum": [
                                  "running",
                                  "disconnected",
                                  "errored"
                                ]
                              }
                            },
                            "products_display_names": {
                              "description": "The human-readable name of a product, keyed like products_connection_status, when the product has one (e.g. the name of a Facebook Page).",
                              "type": "object",
                              "additionalProperties": {
                                "type": "string"
                              }
                            },
                            "custom_data": {
                              "description": "Custom data of the account. This is where you can store custom data using \"Update an account\" method.",
                              "type": "object",
                              "additionalProperties": {
                                "type": "string"
                              }
                            }
                          }
                        },
                        "initial_sync": {
                          "description": "Sync details if the account has initial sync enabled.",
                          "type": "object",
                          "required": [
                            "status"
                          ],
                          "properties": {
                            "status": {
                              "description": "The state of an account’s initial provider sync.\n  - `pending`sync hasn’t started yet.\n  - `running` sync is currently in progress.\n  - `failed` sync could not be completed due to an error.\n  - `completed` sync finished successfully.\n  .",
                              "type": "string",
                              "enum": [
                                "pending",
                                "running",
                                "failed",
                                "completed"
                              ]
                            },
                            "started_at": {
                              "description": "The date and time the initial sync started.",
                              "type": "string"
                            }
                          }
                        },
                        "proxy": {
                          "description": "The proxy used for the account.",
                          "type": "object",
                          "required": [
                            "country",
                            "auto_proxy"
                          ],
                          "properties": {
                            "country": {
                              "description": "The country of the proxy. If null, the proxy has no defined country.",
                              "anyOf": [
                                {
                                  "type": "string"
                                },
                                {
                                  "type": "null"
                                }
                              ]
                            },
                            "auto_proxy": {
                              "description": "Whether the proxy was set automatically by Unipile.",
                              "type": "boolean"
                            },
                            "host": {
                              "description": "The host of the custom proxy.",
                              "type": "string"
                            },
                            "port": {
                              "description": "The port of the custom proxy.",
                              "type": "number"
                            },
                            "username": {
                              "description": "The username used to authenticate to the custom proxy.",
                              "type": "string"
                            },
                            "protocol": {
                              "description": "The protocol of the custom proxy.",
                              "type": "string"
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