---
updatedAt: 2026-04-24T15:33:11.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Start Auth Intent

Start an auth intent for a provider. This might require handling of checkpoints and oauth flows depending on the provider. Use <a href="https://developer.unipile.com/v2.0/reference/createauthlink">Create Auth Link</a> to let Unipile handle everything for you.

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
    "/v2/auth/intent": {
      "post": {
        "operationId": "startAuthIntent",
        "summary": "Start Auth Intent",
        "tags": [
          "Custom Auth"
        ],
        "description": "Start an auth intent for a provider. This might require handling of checkpoints and oauth flows depending on the provider. Use <a href=\"https://developer.unipile.com/v2.0/reference/createauthlink\">Create Auth Link</a> to let Unipile handle everything for you.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "description": "Start provider authentication or connect an active browser session with UniLogin.",
                "anyOf": [
                  {
                    "title": "Provider authentication",
                    "description": "Choose a provider, then its supported authentication method: password, cookies, OAuth, QR code or pairing code. OAuth starts a browser authorization flow without submitting credentials. Omit unilogin for this flow.",
                    "allOf": [
                      {
                        "allOf": [
                          {
                            "anyOf": [
                              {
                                "title": "IMAP",
                                "description": "Start the authentication intent with IMAP provider.",
                                "type": "object",
                                "required": [
                                  "provider",
                                  "credentials"
                                ],
                                "properties": {
                                  "provider": {
                                    "description": "The provider to authenticate with.",
                                    "type": "string",
                                    "enum": [
                                      "imap"
                                    ]
                                  },
                                  "credentials": {
                                    "anyOf": [
                                      {
                                        "title": "Password authentication (automatic server settings)",
                                        "description": "Basic authentication, our servers will try to guess the correct IMAP/SMTP connection parameters for your IMAP provider. If this fails, an error will be returned and you should use the full authentication method.",
                                        "type": "object",
                                        "required": [
                                          "user",
                                          "password"
                                        ],
                                        "properties": {
                                          "user": {
                                            "description": "Username",
                                            "type": "string"
                                          },
                                          "password": {
                                            "description": "Password",
                                            "type": "string"
                                          }
                                        }
                                      },
                                      {
                                        "title": "Password authentication (manual server settings)",
                                        "description": "Full authentication, you can manually specify the IMAP/SMTP connection parameters. This is useful if the basic authentication method fails.",
                                        "type": "object",
                                        "required": [
                                          "imap",
                                          "smtp"
                                        ],
                                        "properties": {
                                          "imap": {
                                            "title": "IMAP connections parameters",
                                            "type": "object",
                                            "allOf": [
                                              {
                                                "title": "Password authentication (automatic server settings)",
                                                "description": "Basic authentication, our servers will try to guess the correct IMAP/SMTP connection parameters for your IMAP provider. If this fails, an error will be returned and you should use the full authentication method.",
                                                "type": "object",
                                                "required": [
                                                  "user",
                                                  "password"
                                                ],
                                                "properties": {
                                                  "user": {
                                                    "description": "Username",
                                                    "type": "string"
                                                  },
                                                  "password": {
                                                    "description": "Password",
                                                    "type": "string"
                                                  }
                                                }
                                              },
                                              {
                                                "type": "object",
                                                "required": [
                                                  "host",
                                                  "port"
                                                ],
                                                "properties": {
                                                  "host": {
                                                    "description": "Server url/ip",
                                                    "type": "string"
                                                  },
                                                  "encryption": {
                                                    "default": "default",
                                                    "description": "The encryption method to use for the connection.\n              - `tls` will use the TLS encryption method.\n              - `ssl` will use the SSL encryption method.\n              - `starttls` will use the STARTTLS encryption method.\n              - `default` will use the default encryption method for the server.",
                                                    "type": "string",
                                                    "enum": [
                                                      "tls",
                                                      "ssl",
                                                      "starttls",
                                                      "default"
                                                    ]
                                                  },
                                                  "port": {
                                                    "description": "Server port",
                                                    "type": "number"
                                                  }
                                                }
                                              }
                                            ]
                                          },
                                          "smtp": {
                                            "title": "SMTP connections parameters",
                                            "type": "object",
                                            "allOf": [
                                              {
                                                "title": "Password authentication (automatic server settings)",
                                                "description": "Basic authentication, our servers will try to guess the correct IMAP/SMTP connection parameters for your IMAP provider. If this fails, an error will be returned and you should use the full authentication method.",
                                                "type": "object",
                                                "required": [
                                                  "user",
                                                  "password"
                                                ],
                                                "properties": {
                                                  "user": {
                                                    "description": "Username",
                                                    "type": "string"
                                                  },
                                                  "password": {
                                                    "description": "Password",
                                                    "type": "string"
                                                  }
                                                }
                                              },
                                              {
                                                "type": "object",
                                                "required": [
                                                  "host",
                                                  "port"
                                                ],
                                                "properties": {
                                                  "host": {
                                                    "description": "Server url/ip",
                                                    "type": "string"
                                                  },
                                                  "encryption": {
                                                    "default": "default",
                                                    "description": "The encryption method to use for the connection.\n              - `tls` will use the TLS encryption method.\n              - `ssl` will use the SSL encryption method.\n              - `starttls` will use the STARTTLS encryption method.\n              - `default` will use the default encryption method for the server.",
                                                    "type": "string",
                                                    "enum": [
                                                      "tls",
                                                      "ssl",
                                                      "starttls",
                                                      "default"
                                                    ]
                                                  },
                                                  "port": {
                                                    "description": "Server port",
                                                    "type": "number"
                                                  }
                                                }
                                              }
                                            ]
                                          }
                                        }
                                      }
                                    ]
                                  },
                                  "config": {
                                    "additionalProperties": true,
                                    "description": "IMAP specific configuration.",
                                    "type": "object",
                                    "properties": {
                                      "custom_proxy": {
                                        "title": "Custom proxy",
                                        "description": "A custom proxy used to connect to the account provider. When Automatic Proxy Protection applies to the provider, Unipile manages the proxy by default. A custom proxy overrides Automatic Proxy Protection. Read more in the Proxy documentation.",
                                        "type": "object",
                                        "required": [
                                          "host",
                                          "port"
                                        ],
                                        "properties": {
                                          "host": {
                                            "description": "The host of the proxy.",
                                            "type": "string"
                                          },
                                          "port": {
                                            "description": "The port of the proxy.",
                                            "type": "number"
                                          },
                                          "username": {
                                            "description": "The username to connect to the proxy.",
                                            "type": "string"
                                          },
                                          "password": {
                                            "description": "The password to connect to the proxy.",
                                            "type": "string"
                                          },
                                          "protocol": {
                                            "default": "https",
                                            "description": "The protocol of the proxy. Defaults to `https`.\n        - `https` is HTTPS.\n        - `http` is HTTP.\n          - `socks5` is SOCKS5.\n          - `socks4` is SOCKS4.",
                                            "type": "string",
                                            "enum": [
                                              "https",
                                              "http",
                                              "socks5",
                                              "socks4"
                                            ]
                                          }
                                        }
                                      },
                                      "initial_sync_enable": {
                                        "default": false,
                                        "description": "Whether the initial sync should be enabled. The initial sync is required to perform advanced search. Read more in the Synced Accounts guide.",
                                        "type": "boolean"
                                      }
                                    }
                                  }
                                }
                              },
                              {
                                "title": "WhatsApp",
                                "description": "Start the authentication intent with WhatsApp provider.",
                                "type": "object",
                                "required": [
                                  "provider",
                                  "credentials"
                                ],
                                "properties": {
                                  "provider": {
                                    "description": "The provider to authenticate with.",
                                    "type": "string",
                                    "enum": [
                                      "whatsapp"
                                    ]
                                  },
                                  "credentials": {
                                    "description": "Choose QR code or pairing code authentication.",
                                    "anyOf": [
                                      {
                                        "title": "QR code",
                                        "description": "Authenticate by scanning a QR code with the WhatsApp mobile app.",
                                        "type": "object",
                                        "required": [
                                          "qrcode"
                                        ],
                                        "properties": {
                                          "qrcode": {
                                            "description": "This must be set to `true`",
                                            "type": "boolean"
                                          }
                                        }
                                      },
                                      {
                                        "title": "Pairing code",
                                        "description": "Authenticate by entering a pairing code on the WhatsApp mobile app.",
                                        "type": "object",
                                        "required": [
                                          "phone_number"
                                        ],
                                        "properties": {
                                          "phone_number": {
                                            "description": "Phone number to link, in international format with digits only (no `+`, spaces or separators), e.g. `33612345678`. A pairing code will be returned to enter on this phone.",
                                            "type": "string"
                                          }
                                        }
                                      }
                                    ]
                                  },
                                  "config": {
                                    "additionalProperties": true,
                                    "description": "WhatsApp specific configuration.",
                                    "type": "object",
                                    "properties": {
                                      "custom_proxy": {
                                        "title": "Custom proxy",
                                        "description": "A custom proxy used to connect to the account provider. When Automatic Proxy Protection applies to the provider, Unipile manages the proxy by default. A custom proxy overrides Automatic Proxy Protection. Read more in the Proxy documentation.",
                                        "type": "object",
                                        "required": [
                                          "host",
                                          "port"
                                        ],
                                        "properties": {
                                          "host": {
                                            "description": "The host of the proxy.",
                                            "type": "string"
                                          },
                                          "port": {
                                            "description": "The port of the proxy.",
                                            "type": "number"
                                          },
                                          "username": {
                                            "description": "The username to connect to the proxy.",
                                            "type": "string"
                                          },
                                          "password": {
                                            "description": "The password to connect to the proxy.",
                                            "type": "string"
                                          },
                                          "protocol": {
                                            "default": "https",
                                            "description": "The protocol of the proxy. Defaults to `https`.\n        - `https` is HTTPS.\n        - `http` is HTTP.\n          - `socks5` is SOCKS5.\n          - `socks4` is SOCKS4.",
                                            "type": "string",
                                            "enum": [
                                              "https",
                                              "http",
                                              "socks5",
                                              "socks4"
                                            ]
                                          }
                                        }
                                      },
                                      "auto_proxy_config": {
                                        "description": "Country preferences for automatic proxy assignment. Explicitly selected countries must be part of Unipile’s proxy offering for the provider. If omitted, Unipile determines the preferred country automatically. The fallback setting determines whether an available proxy from another country may be used when no proxy is available in the preferred country.",
                                        "title": "Automatic proxy configuration",
                                        "type": "object",
                                        "properties": {
                                          "country": {
                                            "description": "An ISO 3166-1 alpha-2 country code for the automatic proxy location, normalized to uppercase. Choose from the <a href=\"https://developer.unipile.com/v2.0/docs/proxys#countries\">countries where Unipile offers automatic proxies</a>. A proxy may be temporarily unavailable even in a country included in the offering.",
                                            "type": "string"
                                          },
                                          "ip": {
                                            "description": "An IPv4 address used to infer the automatic proxy location. If Unipile does not offer proxies in the inferred country, or no proxy is currently available there, allow_country_fallback controls whether an available proxy from another country may be used.",
                                            "type": "string"
                                          },
                                          "allow_country_fallback": {
                                            "default": true,
                                            "description": "Whether an available proxy from another country may be used when none is available in the rotation country, during authentication and throughout the account lifetime. Defaults to true. An explicitly selected country must be part of Unipile’s proxy offering for the provider, even when fallback is allowed. A proxy may be temporarily unavailable in a country included in the offering. Authentication fails if no proxy is available in any allowed country. If false, authentication fails when no proxy is available in the rotation country. If the selected proxy later fails and no replacement is available there, the account enters Service interruption. Rotation to another available proxy in that country remains allowed.",
                                            "type": "boolean"
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              {
                                "title": "LinkedIn",
                                "description": "Start the authentication intent with LinkedIn provider.",
                                "type": "object",
                                "required": [
                                  "provider",
                                  "credentials"
                                ],
                                "properties": {
                                  "provider": {
                                    "description": "The provider to authenticate with.",
                                    "type": "string",
                                    "enum": [
                                      "linkedin"
                                    ]
                                  },
                                  "user_timezone": {
                                    "description": "The time zone of the current user can be used on a few specific features (e.g. scheduled actions). Setting it at authentication avoids having to do it on a case-by-case basis later on.",
                                    "type": "string"
                                  },
                                  "user_language": {
                                    "maxLength": 64,
                                    "pattern": "^[A-Za-z]{1,8}(?:-[A-Za-z0-9]{1,8})*$",
                                    "description": "Primary browser language captured with the session cookies.",
                                    "type": "string"
                                  },
                                  "user_languages": {
                                    "maxItems": 10,
                                    "uniqueItems": true,
                                    "description": "Ordered browser language preferences captured with the session cookies.",
                                    "type": "array",
                                    "items": {
                                      "maxLength": 64,
                                      "pattern": "^[A-Za-z]{1,8}(?:-[A-Za-z0-9]{1,8})*$",
                                      "type": "string"
                                    }
                                  },
                                  "credentials": {
                                    "description": "The user credentials required by the provider to authenticate with.",
                                    "anyOf": [
                                      {
                                        "title": "Password authentication",
                                        "description": "Use email and password to authenticate with LinkedIn.",
                                        "type": "object",
                                        "required": [
                                          "username",
                                          "password"
                                        ],
                                        "properties": {
                                          "username": {
                                            "description": "Email or phone of the LinkedIn account.",
                                            "type": "string"
                                          },
                                          "password": {
                                            "description": "Password of the LinkedIn account.",
                                            "type": "string"
                                          },
                                          "user_agent": {
                                            "description": "A custom user agent if you need the session to be started from a specific browser. You can easily get it in the browser's console with this command : `console.log(navigator.userAgent)`",
                                            "type": "string"
                                          }
                                        }
                                      },
                                      {
                                        "title": "Cookie authentication",
                                        "description": "Use the `li_at` and `li_a` cookies to authenticate with LinkedIn.",
                                        "type": "object",
                                        "required": [
                                          "access_token",
                                          "user_agent"
                                        ],
                                        "properties": {
                                          "access_token": {
                                            "description": "The access token to authenticate with. This is the `li_at` cookie value.",
                                            "type": "string"
                                          },
                                          "premium_access_token": {
                                            "description": "The access token to authenticate Recruiter or Sales Navigator with. This is the `li_a` cookie value.",
                                            "type": "string"
                                          },
                                          "user_agent": {
                                            "description": "The exact user agent of the browser on which the session has been started. You can easily get it in the browser's console with this command : `console.log(navigator.userAgent)`",
                                            "type": "string"
                                          }
                                        }
                                      }
                                    ]
                                  },
                                  "config": {
                                    "additionalProperties": true,
                                    "description": "LinkedIn specific configuration.",
                                    "type": "object",
                                    "properties": {
                                      "custom_proxy": {
                                        "title": "Custom proxy",
                                        "description": "A custom proxy used to connect to the account provider. When Automatic Proxy Protection applies to the provider, Unipile manages the proxy by default. A custom proxy overrides Automatic Proxy Protection. Read more in the Proxy documentation.",
                                        "type": "object",
                                        "required": [
                                          "host",
                                          "port"
                                        ],
                                        "properties": {
                                          "host": {
                                            "description": "The host of the proxy.",
                                            "type": "string"
                                          },
                                          "port": {
                                            "description": "The port of the proxy.",
                                            "type": "number"
                                          },
                                          "username": {
                                            "description": "The username to connect to the proxy.",
                                            "type": "string"
                                          },
                                          "password": {
                                            "description": "The password to connect to the proxy.",
                                            "type": "string"
                                          },
                                          "protocol": {
                                            "default": "https",
                                            "description": "The protocol of the proxy. Defaults to `https`.\n        - `https` is HTTPS.\n        - `http` is HTTP.\n          - `socks5` is SOCKS5.\n          - `socks4` is SOCKS4.",
                                            "type": "string",
                                            "enum": [
                                              "https",
                                              "http",
                                              "socks5",
                                              "socks4"
                                            ]
                                          }
                                        }
                                      },
                                      "auto_proxy_config": {
                                        "description": "Country preferences for automatic proxy assignment. Explicitly selected countries must be part of Unipile’s proxy offering for the provider. If omitted, Unipile determines the preferred country automatically. The fallback setting determines whether an available proxy from another country may be used when no proxy is available in the preferred country.",
                                        "title": "Automatic proxy configuration",
                                        "type": "object",
                                        "properties": {
                                          "country": {
                                            "description": "An ISO 3166-1 alpha-2 country code for the automatic proxy location, normalized to uppercase. Choose from the <a href=\"https://developer.unipile.com/v2.0/docs/proxys#countries\">countries where Unipile offers automatic proxies</a>. A proxy may be temporarily unavailable even in a country included in the offering.",
                                            "type": "string"
                                          },
                                          "ip": {
                                            "description": "An IPv4 address used to infer the automatic proxy location. If Unipile does not offer proxies in the inferred country, or no proxy is currently available there, allow_country_fallback controls whether an available proxy from another country may be used.",
                                            "type": "string"
                                          },
                                          "allow_country_fallback": {
                                            "default": true,
                                            "description": "Whether an available proxy from another country may be used when none is available in the rotation country, during authentication and throughout the account lifetime. Defaults to true. An explicitly selected country must be part of Unipile’s proxy offering for the provider, even when fallback is allowed. A proxy may be temporarily unavailable in a country included in the offering. Authentication fails if no proxy is available in any allowed country. If false, authentication fails when no proxy is available in the rotation country. If the selected proxy later fails and no replacement is available there, the account enters Service interruption. Rotation to another available proxy in that country remains allowed.",
                                            "type": "boolean"
                                          }
                                        }
                                      },
                                      "products": {
                                        "default": [
                                          "classic",
                                          "company",
                                          "recruiter",
                                          "sales_navigator"
                                        ],
                                        "minItems": 1,
                                        "uniqueItems": true,
                                        "description": "Specifies which LinkedIn products are allowed to be activated (as long as the account actually has the relevant subscriptions). By default, all products are made available.<br>When reconnecting an account, just omit this field to keep allowing access to the same products, or provide new values to expand or narrow the scope. <a href=\"https://developer.unipile.com/v2.0/docs/linkedin-link-accounts\">Learn more about Linkedin products</a>\n      `classic` : Personnal Social network<br>\n      `recruiter` : Recruiter<br>\n      `sales_navigator` : Sales Navigator<br>\n      `company` : Company Pages\n      ",
                                        "type": "array",
                                        "items": {
                                          "type": "string",
                                          "enum": [
                                            "classic",
                                            "company",
                                            "recruiter",
                                            "sales_navigator"
                                          ]
                                        }
                                      },
                                      "allow_product_selection": {
                                        "default": false,
                                        "description": "When true, return a product selection checkpoint after authentication, even when only one LinkedIn product is available. When false, all available products are selected automatically, except Recruiter when Sales Navigator is also available.",
                                        "type": "boolean"
                                      }
                                    }
                                  }
                                }
                              },
                              {
                                "title": "Mock",
                                "description": "Start the authentication intent with Mock provider.",
                                "type": "object",
                                "required": [
                                  "provider",
                                  "credentials"
                                ],
                                "properties": {
                                  "provider": {
                                    "description": "The provider to authenticate with.",
                                    "type": "string",
                                    "enum": [
                                      "mock"
                                    ]
                                  },
                                  "credentials": {
                                    "description": "Test accounts do not have credentials, leave this as empty object.",
                                    "type": "object",
                                    "properties": {}
                                  }
                                }
                              },
                              {
                                "title": "OAuth (Google, Outlook)",
                                "description": "Start browser-based authorization with Google or Outlook. No credentials are submitted in this request; the user authenticates on the provider authorization page.",
                                "type": "object",
                                "required": [
                                  "provider",
                                  "oauth_callback_redirect_uri"
                                ],
                                "properties": {
                                  "provider": {
                                    "description": "The provider that use Oauth as authentication method.\n    - `google` is Google.\n    - `outlook` is Outlook.",
                                    "type": "string",
                                    "enum": [
                                      "google",
                                      "outlook"
                                    ]
                                  },
                                  "oauth_callback_redirect_uri": {
                                    "description": "The URL to redirect to after the user has authenticated using the Provider's oAuth screen.",
                                    "type": "string"
                                  },
                                  "login_hint": {
                                    "description": "Uses the hint to simplify the login flow either by prefilling the email / username / phone number field in the authentication form.",
                                    "type": "string"
                                  },
                                  "config": {
                                    "additionalProperties": true,
                                    "description": "Oauth authentication configuration.",
                                    "type": "object",
                                    "properties": {
                                      "custom_proxy": {
                                        "title": "Custom proxy",
                                        "description": "A custom proxy used to connect to the account provider. When Automatic Proxy Protection applies to the provider, Unipile manages the proxy by default. A custom proxy overrides Automatic Proxy Protection. Read more in the Proxy documentation.",
                                        "type": "object",
                                        "required": [
                                          "host",
                                          "port"
                                        ],
                                        "properties": {
                                          "host": {
                                            "description": "The host of the proxy.",
                                            "type": "string"
                                          },
                                          "port": {
                                            "description": "The port of the proxy.",
                                            "type": "number"
                                          },
                                          "username": {
                                            "description": "The username to connect to the proxy.",
                                            "type": "string"
                                          },
                                          "password": {
                                            "description": "The password to connect to the proxy.",
                                            "type": "string"
                                          },
                                          "protocol": {
                                            "default": "https",
                                            "description": "The protocol of the proxy. Defaults to `https`.\n        - `https` is HTTPS.\n        - `http` is HTTP.\n          - `socks5` is SOCKS5.\n          - `socks4` is SOCKS4.",
                                            "type": "string",
                                            "enum": [
                                              "https",
                                              "http",
                                              "socks5",
                                              "socks4"
                                            ]
                                          }
                                        }
                                      },
                                      "oauth_scope": {
                                        "minItems": 1,
                                        "description": "The final list of authorizations to request from the Provider. Use this field to expand or narrow the scope of API access. For example, if your application only uses the Calendar API, you may request authorization solely for the calendar, excluding email access for providers like Google. Make sure to give only authorizations accepted by your registered provider application. For a new account, omitting this field requests the authorizations defined in the Provider OAuth settings. For a reconnect, omitting it preserves already granted authorizations and adds the authorizations currently defined in the Provider OAuth settings.",
                                        "type": "array",
                                        "items": {
                                          "minLength": 1,
                                          "type": "string"
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              {
                                "title": "Telegram",
                                "description": "Start the authentication intent with Telegram provider.",
                                "type": "object",
                                "required": [
                                  "provider",
                                  "credentials"
                                ],
                                "properties": {
                                  "provider": {
                                    "description": "The provider to authenticate with.",
                                    "type": "string",
                                    "enum": [
                                      "telegram"
                                    ]
                                  },
                                  "credentials": {
                                    "title": "QR code",
                                    "description": "Start authentication by scanning a QR code with the Telegram mobile app.",
                                    "type": "object",
                                    "required": [
                                      "qrcode"
                                    ],
                                    "properties": {
                                      "qrcode": {
                                        "description": "This must be set to `true`",
                                        "type": "boolean"
                                      },
                                      "twofa": {
                                        "description": "The 2FA code to authenticate with.",
                                        "type": "string"
                                      }
                                    }
                                  },
                                  "config": {
                                    "additionalProperties": true,
                                    "description": "Telegram specific configuration.",
                                    "type": "object",
                                    "properties": {
                                      "custom_proxy": {
                                        "title": "Custom proxy",
                                        "description": "A custom proxy used to connect to the account provider. When Automatic Proxy Protection applies to the provider, Unipile manages the proxy by default. A custom proxy overrides Automatic Proxy Protection. Read more in the Proxy documentation.",
                                        "type": "object",
                                        "required": [
                                          "host",
                                          "port"
                                        ],
                                        "properties": {
                                          "host": {
                                            "description": "The host of the proxy.",
                                            "type": "string"
                                          },
                                          "port": {
                                            "description": "The port of the proxy.",
                                            "type": "number"
                                          },
                                          "username": {
                                            "description": "The username to connect to the proxy.",
                                            "type": "string"
                                          },
                                          "password": {
                                            "description": "The password to connect to the proxy.",
                                            "type": "string"
                                          },
                                          "protocol": {
                                            "default": "https",
                                            "description": "The protocol of the proxy. Defaults to `https`.\n        - `https` is HTTPS.\n        - `http` is HTTP.\n          - `socks5` is SOCKS5.\n          - `socks4` is SOCKS4.",
                                            "type": "string",
                                            "enum": [
                                              "https",
                                              "http",
                                              "socks5",
                                              "socks4"
                                            ]
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              {
                                "title": "Instagram",
                                "description": "Start the authentication intent with Instagram provider.",
                                "type": "object",
                                "required": [
                                  "provider",
                                  "credentials"
                                ],
                                "properties": {
                                  "provider": {
                                    "description": "The provider to authenticate with.",
                                    "type": "string",
                                    "enum": [
                                      "instagram"
                                    ]
                                  },
                                  "credentials": {
                                    "description": "The user credentials required by the provider to authenticate with.",
                                    "anyOf": [
                                      {
                                        "title": "Password authentication",
                                        "description": "Use username and password to authenticate with Instagram.",
                                        "type": "object",
                                        "required": [
                                          "username",
                                          "password"
                                        ],
                                        "properties": {
                                          "username": {
                                            "description": "The username of the Instagram account.",
                                            "type": "string"
                                          },
                                          "password": {
                                            "description": "The password of the Instagram account.",
                                            "type": "string"
                                          },
                                          "user_agent": {
                                            "description": "A custom user agent if you need the session to be started from a specific desktop browser. You can get it in the browser's console with `console.log(navigator.userAgent)`. In Hosted Auth, this is collected automatically from the user's browser. When reconnecting an Account, the user agent it already uses is kept.",
                                            "type": "string"
                                          }
                                        }
                                      },
                                      {
                                        "title": "Cookie authentication",
                                        "description": "Use the `sessionid` cookie to authenticate with Instagram.",
                                        "type": "object",
                                        "required": [
                                          "sessionid"
                                        ],
                                        "properties": {
                                          "sessionid": {
                                            "description": "The sessionid cookie value.",
                                            "type": "string"
                                          },
                                          "user_agent": {
                                            "description": "The exact user agent of the browser on which the session has been started. You can get it in the browser's console with `console.log(navigator.userAgent)`. In Hosted Auth, this is collected automatically from the user's browser. When reconnecting an Account, the user agent it already uses is kept.",
                                            "type": "string"
                                          }
                                        }
                                      }
                                    ]
                                  },
                                  "config": {
                                    "additionalProperties": true,
                                    "description": "Instagram specific configuration.",
                                    "type": "object",
                                    "properties": {
                                      "custom_proxy": {
                                        "title": "Custom proxy",
                                        "description": "A custom proxy used to connect to the account provider. When Automatic Proxy Protection applies to the provider, Unipile manages the proxy by default. A custom proxy overrides Automatic Proxy Protection. Read more in the Proxy documentation.",
                                        "type": "object",
                                        "required": [
                                          "host",
                                          "port"
                                        ],
                                        "properties": {
                                          "host": {
                                            "description": "The host of the proxy.",
                                            "type": "string"
                                          },
                                          "port": {
                                            "description": "The port of the proxy.",
                                            "type": "number"
                                          },
                                          "username": {
                                            "description": "The username to connect to the proxy.",
                                            "type": "string"
                                          },
                                          "password": {
                                            "description": "The password to connect to the proxy.",
                                            "type": "string"
                                          },
                                          "protocol": {
                                            "default": "https",
                                            "description": "The protocol of the proxy. Defaults to `https`.\n        - `https` is HTTPS.\n        - `http` is HTTP.\n          - `socks5` is SOCKS5.\n          - `socks4` is SOCKS4.",
                                            "type": "string",
                                            "enum": [
                                              "https",
                                              "http",
                                              "socks5",
                                              "socks4"
                                            ]
                                          }
                                        }
                                      },
                                      "auto_proxy_config": {
                                        "description": "Country preferences for automatic proxy assignment. Explicitly selected countries must be part of Unipile’s proxy offering for the provider. If omitted, Unipile determines the preferred country automatically. The fallback setting determines whether an available proxy from another country may be used when no proxy is available in the preferred country.",
                                        "title": "Automatic proxy configuration",
                                        "type": "object",
                                        "properties": {
                                          "country": {
                                            "description": "An ISO 3166-1 alpha-2 country code for the automatic proxy location, normalized to uppercase. Choose from the <a href=\"https://developer.unipile.com/v2.0/docs/proxys#countries\">countries where Unipile offers automatic proxies</a>. A proxy may be temporarily unavailable even in a country included in the offering.",
                                            "type": "string"
                                          },
                                          "ip": {
                                            "description": "An IPv4 address used to infer the automatic proxy location. If Unipile does not offer proxies in the inferred country, or no proxy is currently available there, allow_country_fallback controls whether an available proxy from another country may be used.",
                                            "type": "string"
                                          },
                                          "allow_country_fallback": {
                                            "default": true,
                                            "description": "Whether an available proxy from another country may be used when none is available in the rotation country, during authentication and throughout the account lifetime. Defaults to true. An explicitly selected country must be part of Unipile’s proxy offering for the provider, even when fallback is allowed. A proxy may be temporarily unavailable in a country included in the offering. Authentication fails if no proxy is available in any allowed country. If false, authentication fails when no proxy is available in the rotation country. If the selected proxy later fails and no replacement is available there, the account enters Service interruption. Rotation to another available proxy in that country remains allowed.",
                                            "type": "boolean"
                                          }
                                        }
                                      },
                                      "allow_methods": {
                                        "minItems": 1,
                                        "uniqueItems": true,
                                        "description": "The authentication methods to show in the hosted auth.\n          `credentials` : Credentials Authentication\n          `cookies` : Cookies Authentication\n          `unilogin` : Connect the active browser session through the UniLogin extension\n        ",
                                        "default": [
                                          "credentials",
                                          "unilogin"
                                        ],
                                        "type": "array",
                                        "items": {
                                          "type": "string",
                                          "enum": [
                                            "credentials",
                                            "cookies",
                                            "unilogin"
                                          ]
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              {
                                "title": "Facebook",
                                "description": "Start the authentication intent with the Facebook provider.",
                                "type": "object",
                                "required": [
                                  "provider",
                                  "credentials"
                                ],
                                "properties": {
                                  "provider": {
                                    "description": "The provider to authenticate with.",
                                    "type": "string",
                                    "enum": [
                                      "facebook"
                                    ]
                                  },
                                  "user_agent": {
                                    "description": "The exact user agent of the browser used to retrieve the cookies. You can get it in the browser's console with `console.log(navigator.userAgent)`. In Hosted Auth, this is collected automatically from the user's browser. When reconnecting an Account, the user agent it already uses is kept.",
                                    "type": "string"
                                  },
                                  "credentials": {
                                    "description": "The user credentials required by the provider to authenticate with.",
                                    "anyOf": [
                                      {
                                        "title": "Password authentication",
                                        "description": "Use Facebook credentials to authenticate with Meta messaging.",
                                        "additionalProperties": false,
                                        "type": "object",
                                        "required": [
                                          "username",
                                          "password"
                                        ],
                                        "properties": {
                                          "username": {
                                            "description": "Email or username of the Facebook account.",
                                            "type": "string"
                                          },
                                          "password": {
                                            "description": "Password of the Facebook account.",
                                            "type": "string"
                                          }
                                        }
                                      },
                                      {
                                        "title": "Cookie authentication",
                                        "description": "Use Facebook or Messenger cookies to authenticate with Meta messaging.",
                                        "additionalProperties": false,
                                        "type": "object",
                                        "required": [
                                          "xs",
                                          "c_user",
                                          "datr"
                                        ],
                                        "properties": {
                                          "xs": {
                                            "description": "The `xs` cookie value.",
                                            "type": "string"
                                          },
                                          "c_user": {
                                            "description": "The `c_user` cookie value.",
                                            "type": "string"
                                          },
                                          "datr": {
                                            "description": "The `datr` cookie value.",
                                            "type": "string"
                                          },
                                          "sb": {
                                            "description": "Optional `sb` cookie value.",
                                            "type": "string"
                                          },
                                          "fr": {
                                            "description": "Optional `fr` cookie value.",
                                            "type": "string"
                                          },
                                          "wd": {
                                            "description": "Optional `wd` cookie value.",
                                            "type": "string"
                                          },
                                          "presence": {
                                            "description": "Optional `presence` cookie value.",
                                            "type": "string"
                                          },
                                          "oo": {
                                            "description": "Optional `oo` cookie value.",
                                            "type": "string"
                                          }
                                        }
                                      }
                                    ]
                                  },
                                  "config": {
                                    "additionalProperties": true,
                                    "description": "Facebook provider specific configuration.",
                                    "type": "object",
                                    "properties": {
                                      "custom_proxy": {
                                        "title": "Custom proxy",
                                        "description": "A custom proxy used to connect to the account provider. When Automatic Proxy Protection applies to the provider, Unipile manages the proxy by default. A custom proxy overrides Automatic Proxy Protection. Read more in the Proxy documentation.",
                                        "type": "object",
                                        "required": [
                                          "host",
                                          "port"
                                        ],
                                        "properties": {
                                          "host": {
                                            "description": "The host of the proxy.",
                                            "type": "string"
                                          },
                                          "port": {
                                            "description": "The port of the proxy.",
                                            "type": "number"
                                          },
                                          "username": {
                                            "description": "The username to connect to the proxy.",
                                            "type": "string"
                                          },
                                          "password": {
                                            "description": "The password to connect to the proxy.",
                                            "type": "string"
                                          },
                                          "protocol": {
                                            "default": "https",
                                            "description": "The protocol of the proxy. Defaults to `https`.\n        - `https` is HTTPS.\n        - `http` is HTTP.\n          - `socks5` is SOCKS5.\n          - `socks4` is SOCKS4.",
                                            "type": "string",
                                            "enum": [
                                              "https",
                                              "http",
                                              "socks5",
                                              "socks4"
                                            ]
                                          }
                                        }
                                      },
                                      "auto_proxy_config": {
                                        "description": "Country preferences for automatic proxy assignment. Explicitly selected countries must be part of Unipile’s proxy offering for the provider. If omitted, Unipile determines the preferred country automatically. The fallback setting determines whether an available proxy from another country may be used when no proxy is available in the preferred country.",
                                        "title": "Automatic proxy configuration",
                                        "type": "object",
                                        "properties": {
                                          "country": {
                                            "description": "An ISO 3166-1 alpha-2 country code for the automatic proxy location, normalized to uppercase. Choose from the <a href=\"https://developer.unipile.com/v2.0/docs/proxys#countries\">countries where Unipile offers automatic proxies</a>. A proxy may be temporarily unavailable even in a country included in the offering.",
                                            "type": "string"
                                          },
                                          "ip": {
                                            "description": "An IPv4 address used to infer the automatic proxy location. If Unipile does not offer proxies in the inferred country, or no proxy is currently available there, allow_country_fallback controls whether an available proxy from another country may be used.",
                                            "type": "string"
                                          },
                                          "allow_country_fallback": {
                                            "default": true,
                                            "description": "Whether an available proxy from another country may be used when none is available in the rotation country, during authentication and throughout the account lifetime. Defaults to true. An explicitly selected country must be part of Unipile’s proxy offering for the provider, even when fallback is allowed. A proxy may be temporarily unavailable in a country included in the offering. Authentication fails if no proxy is available in any allowed country. If false, authentication fails when no proxy is available in the rotation country. If the selected proxy later fails and no replacement is available there, the account enters Service interruption. Rotation to another available proxy in that country remains allowed.",
                                            "type": "boolean"
                                          }
                                        }
                                      },
                                      "surface": {
                                        "description": "Meta web surface used to bootstrap the session. `facebook` uses facebook.com/messages (default), `messenger` uses messenger.com.",
                                        "default": "facebook",
                                        "anyOf": [
                                          {
                                            "type": "string",
                                            "enum": [
                                              "facebook"
                                            ]
                                          },
                                          {
                                            "type": "string",
                                            "enum": [
                                              "messenger"
                                            ]
                                          }
                                        ]
                                      },
                                      "products": {
                                        "default": [
                                          "messaging",
                                          "page"
                                        ],
                                        "minItems": 1,
                                        "uniqueItems": true,
                                        "description": "Specifies which Facebook products are allowed to be activated (as long as the account actually has access to them). By default, all products are made available. `messaging` is always activated.\n      `messaging` : Messenger inbox of the account<br>\n      `page` : Facebook Pages administered by the account — each Page is an inbox (`PAGE_<page_id>_INBOX`) whose chats are answered as the Page\n      ",
                                        "type": "array",
                                        "items": {
                                          "type": "string",
                                          "enum": [
                                            "messaging",
                                            "page"
                                          ]
                                        }
                                      },
                                      "page_ids": {
                                        "uniqueItems": true,
                                        "description": "With the `page` product: the Facebook Pages that can be activated, by id (the Page messaging id, as in `PAGE_<page_id>_INBOX`). By default, every Page the account administers. Without `allow_product_selection` they are all activated; with it, they are the ones offered for selection. Each activated Page runs as its own product `page_<page_id>`, with its own connection status.",
                                        "type": "array",
                                        "items": {
                                          "type": "string"
                                        }
                                      },
                                      "allow_product_selection": {
                                        "default": false,
                                        "description": "When true, return a product selection checkpoint after authentication, even when the account administers no Facebook Page. When false, all available products are selected automatically.",
                                        "type": "boolean"
                                      },
                                      "allow_methods": {
                                        "description": "The authentication methods to show in Hosted Auth.\n          `credentials`: Credentials authentication\n          `cookies`: Cookie authentication\n          `unilogin`: Connect the active browser session through the UniLogin extension\n        ",
                                        "default": [
                                          "credentials",
                                          "cookies",
                                          "unilogin"
                                        ],
                                        "type": "array",
                                        "items": {
                                          "type": "string",
                                          "enum": [
                                            "credentials",
                                            "cookies",
                                            "unilogin"
                                          ]
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            ]
                          },
                          {
                            "type": "object",
                            "properties": {
                              "account_scope_id": {
                                "description": "The Scope the account will be assigned to once authentication is complete.",
                                "type": "string",
                                "pattern": "^scope_(.*)$"
                              },
                              "state": {
                                "description": "State data sent in the `account.add` / `account.reconnect` webhook payload after the authentication process.",
                                "type": "string"
                              },
                              "account_id": {
                                "description": "The ID of the Account to re-authenticate or reconfigure. The account may be running, partially connected, or disconnected, and `provider` must match its provider. Reconnecting always refreshes the entire account and restarts all configured products. If not specified, a new account is linked.",
                                "type": "string",
                                "pattern": "^acc_(.*)$"
                              }
                            }
                          }
                        ]
                      },
                      {
                        "type": "object",
                        "not": {
                          "required": [
                            "unilogin"
                          ]
                        }
                      }
                    ]
                  },
                  {
                    "additionalProperties": false,
                    "title": "UniLogin (browser extension)",
                    "description": "Connect the active LinkedIn, Instagram or Facebook browser session through the UniLogin extension. No credentials are submitted in this request.",
                    "type": "object",
                    "required": [
                      "provider",
                      "unilogin"
                    ],
                    "properties": {
                      "provider": {
                        "description": "The provider to connect with UniLogin.",
                        "type": "string",
                        "enum": [
                          "linkedin",
                          "instagram",
                          "facebook"
                        ]
                      },
                      "account_id": {
                        "description": "The existing LinkedIn, Instagram or Facebook Account to reconnect. Omit it to link a new Account.",
                        "type": "string",
                        "pattern": "^acc_(.*)$"
                      },
                      "account_scope_id": {
                        "description": "The Scope assigned to a newly linked Account.",
                        "type": "string",
                        "pattern": "^scope_(.*)$"
                      },
                      "state": {
                        "maxLength": 4096,
                        "description": "State data sent in the account.add or account.reconnect webhook after completion.",
                        "type": "string"
                      },
                      "config": {
                        "additionalProperties": false,
                        "description": "LinkedIn products and managed proxy selection. Credential-bearing custom_proxy configuration is not accepted in this asynchronous flow.",
                        "type": "object",
                        "properties": {
                          "products": {
                            "minItems": 1,
                            "uniqueItems": true,
                            "type": "array",
                            "items": {
                              "type": "string",
                              "enum": [
                                "classic",
                                "company",
                                "recruiter",
                                "sales_navigator"
                              ]
                            }
                          },
                          "auto_proxy_config": {
                            "description": "Country preferences for automatic proxy assignment. Explicitly selected countries must be part of Unipile’s proxy offering for the provider. If omitted, Unipile determines the preferred country automatically. The fallback setting determines whether an available proxy from another country may be used when no proxy is available in the preferred country.",
                            "title": "Automatic proxy configuration",
                            "type": "object",
                            "properties": {
                              "country": {
                                "description": "An ISO 3166-1 alpha-2 country code for the automatic proxy location, normalized to uppercase. Choose from the <a href=\"https://developer.unipile.com/v2.0/docs/proxys#countries\">countries where Unipile offers automatic proxies</a>. A proxy may be temporarily unavailable even in a country included in the offering.",
                                "type": "string"
                              },
                              "ip": {
                                "description": "An IPv4 address used to infer the automatic proxy location. If Unipile does not offer proxies in the inferred country, or no proxy is currently available there, allow_country_fallback controls whether an available proxy from another country may be used.",
                                "type": "string"
                              },
                              "allow_country_fallback": {
                                "default": true,
                                "description": "Whether an available proxy from another country may be used when none is available in the rotation country, during authentication and throughout the account lifetime. Defaults to true. An explicitly selected country must be part of Unipile’s proxy offering for the provider, even when fallback is allowed. A proxy may be temporarily unavailable in a country included in the offering. Authentication fails if no proxy is available in any allowed country. If false, authentication fails when no proxy is available in the rotation country. If the selected proxy later fails and no replacement is available there, the account enters Service interruption. Rotation to another available proxy in that country remains allowed.",
                                "type": "boolean"
                              }
                            }
                          }
                        }
                      },
                      "unilogin": {
                        "description": "Use the UniLogin extension instead of submitting credentials.",
                        "type": "boolean",
                        "enum": [
                          true
                        ]
                      }
                    }
                  }
                ]
              }
            }
          },
          "description": "Start provider authentication or connect an active browser session with UniLogin."
        },
        "x-samples-languages": [
          "node",
          "python",
          "curl"
        ],
        "x-code-samples": [
          {
            "name": "Start auth intent",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipileCustomAuth } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipileCustomAuth = new UnipileCustomAuth({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipileCustomAuth.startAuthIntent(\n  {\n    body: {\n      provider: 'imap',\n      credentials: {\n        user: 'value',\n        password: 'value',\n      },\n    },\n  }\n);"
          },
          {
            "name": "Start auth intent",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    custom_auth_api = unipile.CustomAuthApi(api_client)\n\nresponse = custom_auth_api.start_auth_intent(\n    {\n    'provider': 'imap',\n    'credentials': {\n      'user': 'value',\n      'password': 'value',\n    },\n  }\n)"
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
                    },
                    {
                      "type": "object",
                      "required": [
                        "object",
                        "account_id",
                        "intent_id",
                        "checkpoint"
                      ],
                      "properties": {
                        "object": {
                          "type": "string",
                          "enum": [
                            "AuthenticationCheckpoint"
                          ]
                        },
                        "account_id": {
                          "type": "string",
                          "pattern": "^acc_(.*)$"
                        },
                        "intent_id": {
                          "type": "string",
                          "pattern": "^acc_(.*)$"
                        },
                        "checkpoint": {
                          "type": "object",
                          "required": [
                            "type",
                            "extension_code",
                            "extension_code_expires_at",
                            "expires_at",
                            "extension_store_urls",
                            "extension_download_urls"
                          ],
                          "properties": {
                            "type": {
                              "type": "string",
                              "enum": [
                                "UNILOGIN"
                              ]
                            },
                            "extension_code": {
                              "pattern": "^[23456789ABCDEFGHJKMNPQRSTVWXYZ]{4}(?:-[23456789ABCDEFGHJKMNPQRSTVWXYZ]{4}){2}$",
                              "type": "string"
                            },
                            "extension_code_expires_at": {
                              "format": "date-time",
                              "type": "string"
                            },
                            "expires_at": {
                              "format": "date-time",
                              "type": "string"
                            },
                            "extension_store_urls": {
                              "additionalProperties": false,
                              "type": "object",
                              "properties": {
                                "chrome": {
                                  "format": "uri",
                                  "type": "string"
                                },
                                "edge": {
                                  "format": "uri",
                                  "type": "string"
                                },
                                "firefox": {
                                  "format": "uri",
                                  "type": "string"
                                },
                                "safari": {
                                  "format": "uri",
                                  "type": "string"
                                }
                              }
                            },
                            "extension_download_urls": {
                              "additionalProperties": false,
                              "type": "object",
                              "properties": {
                                "edge": {
                                  "format": "uri",
                                  "type": "string"
                                },
                                "safari": {
                                  "format": "uri",
                                  "type": "string"
                                }
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