---
updatedAt: 2026-04-24T15:33:11.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Create Auth Link

Create a link to the hosted authentication wizard for the user to authenticate with the provider.

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
      "name": "Hosted Auth",
      "description": "Hosted account authentication"
    }
  ],
  "paths": {
    "/v2/auth/link": {
      "post": {
        "operationId": "createAuthLink",
        "summary": "Create Auth Link",
        "tags": [
          "Hosted Auth"
        ],
        "description": "Create a link to the hosted authentication wizard for the user to authenticate with the provider.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "anyOf": [
                  {
                    "title": "Link new account",
                    "description": "Generate a link to authenticate and link a new account with Unipile.",
                    "type": "object",
                    "required": [
                      "expires_on",
                      "redirect_uri",
                      "providers"
                    ],
                    "properties": {
                      "account_scope_id": {
                        "description": "The Scope the account will be assigned to once authentication is complete.",
                        "type": "string",
                        "pattern": "^scope_(.*)$"
                      },
                      "expires_on": {
                        "format": "date-time",
                        "description": "The expiration date of the link. Use ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                        "type": "string"
                      },
                      "domain": {
                        "description": "Optional Hosted Auth hostname to use in the generated link instead of the default `auth.unipile.com`. The hostname must already be explicitly verified by Unipile for the parent Application.",
                        "type": "string"
                      },
                      "redirect_uri": {
                        "format": "uri",
                        "description": "The URL to redirect to after the authentication process. If the authentication succeeded, `account_id` and `provider` will be present in query params, along the specified `state`. If the authentication has failed, `error_title` is present instead. This is useful for your app to be aware of the authentication result and to redirect the user to the correct page of your app.",
                        "type": "string"
                      },
                      "state": {
                        "description": "State data sent as query parameter in the redirect_uri and in the `account.add` / `account.reconnect` webhook payload after the authentication process.",
                        "type": "string"
                      },
                      "config": {
                        "description": "Specific provider configuration for the hosted auth session.",
                        "additionalProperties": false,
                        "type": "object",
                        "properties": {
                          "google": {
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
                          },
                          "outlook": {
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
                          },
                          "linkedin": {
                            "additionalProperties": false,
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
                                "default": true,
                                "description": "When true, show the product selection screen after authentication, even when only one LinkedIn product is available; this screen also displays the requested scopes. When false, products are selected automatically and scope consent is collected before authentication.",
                                "type": "boolean"
                              },
                              "allow_methods": {
                                "minItems": 1,
                                "uniqueItems": true,
                                "description": "The authentication methods to show in the hosted auth.\n            `credentials` : Credentials Authentication\n            `cookies` : Cookies Authentication\n            `unilogin` : Connect the active browser session through the UniLogin extension\n          ",
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
                          },
                          "whatsapp": {
                            "additionalProperties": false,
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
                              },
                              "allow_methods": {
                                "description": "The authentication methods to show in the hosted auth.\n            `qr` : QR Code Authentication\n            `pairing` : Pairing Code Authentication\n          ",
                                "default": [
                                  "qr",
                                  "pairing"
                                ],
                                "type": "array",
                                "items": {
                                  "type": "string",
                                  "enum": [
                                    "qr",
                                    "pairing"
                                  ]
                                }
                              }
                            }
                          },
                          "instagram": {
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
                          },
                          "facebook": {
                            "additionalProperties": true,
                            "description": "Facebook specific configuration.",
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
                              },
                              "allow_product_selection": {
                                "default": true,
                                "description": "When true, show the product selection screen after authentication, even when the account administers no Facebook Page; this screen also displays the requested scopes. When false, products are selected automatically and scope consent is collected before authentication.",
                                "type": "boolean"
                              }
                            }
                          },
                          "imap": {
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
                          },
                          "telegram": {
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
                          },
                          "global": {
                            "description": "Configuration applied to all providers",
                            "additionalProperties": false,
                            "type": "object",
                            "properties": {
                              "login_hint": {
                                "description": "If your application knows which user is trying to authenticate, it can use this parameter to provide a hint to the Hosted Auth. It uses the hint to simplify the login flow either by prefilling the email / username / phone number field in the authentication forms.",
                                "type": "string"
                              },
                              "allow_user_proxy_override": {
                                "default": false,
                                "description": "If true, the Hosted Auth UI will show a field where the user can provide their own proxy settings. When filled, the user-defined proxy takes precedence over any custom_proxy defined in the configuration and over automatic proxy detection (if the provider supports it).",
                                "type": "boolean"
                              },
                              "allow_user_country_override": {
                                "default": false,
                                "description": "If true, the Hosted Auth UI will allow the user to manually select a country where Unipile offers automatic proxies for the provider. A proxy may still be temporarily unavailable in the selected country. This selection overrides the detected country and any auto_proxy_config value. Note: if a custom_proxy is explicitly configured for a provider, this option has no effect for that provider (no country selection will be shown).",
                                "type": "boolean"
                              },
                              "wait_initial_sync": {
                                "default": false,
                                "description": "When true, the hosted authentication will wait for the initial sync to complete before redirecting. Only supported for providers with initial sync capability (whatsapp and imap). After authentication succeeds, the session can only poll the linked account for up to 24 hours, independently of the original link expiration, and cannot authenticate another account.",
                                "type": "boolean"
                              }
                            }
                          }
                        }
                      },
                      "providers": {
                        "description": "Required to link a new account with Unipile. The list of providers to show in the selection list.\n        - `*` to list all providers.\n        - `*:EMAILS` to list providers with Emails API support only.\n        - `*:MESSAGING` to list providers with Messaging API support only.\n        - `*:CALENDAR` to list providers with Calendar API support only.\n        - `*:SOCIAL` to list providers with Social API (Users, Posts, etc.) support only.\n        - a specific provider to list only that provider.\n        - give an array of specific providers.",
                        "anyOf": [
                          {
                            "default": "*",
                            "type": "string",
                            "enum": [
                              "*",
                              "*:MESSAGING",
                              "*:EMAILS",
                              "*:CALENDAR",
                              "*:SOCIAL",
                              "linkedin",
                              "mock",
                              "whatsapp",
                              "google",
                              "outlook",
                              "imap",
                              "telegram",
                              "instagram",
                              "facebook"
                            ]
                          },
                          {
                            "type": "array",
                            "items": {
                              "type": "string",
                              "enum": [
                                "linkedin",
                                "mock",
                                "whatsapp",
                                "google",
                                "outlook",
                                "imap",
                                "telegram",
                                "instagram",
                                "facebook"
                              ]
                            }
                          }
                        ]
                      }
                    }
                  },
                  {
                    "title": "Re-authenticate existing account",
                    "description": "Generate a link to re-authenticate or reconfigure an entire existing account with Unipile.",
                    "type": "object",
                    "required": [
                      "expires_on",
                      "redirect_uri",
                      "account_id"
                    ],
                    "properties": {
                      "account_scope_id": {
                        "description": "The Scope the account will be assigned to once authentication is complete.",
                        "type": "string",
                        "pattern": "^scope_(.*)$"
                      },
                      "expires_on": {
                        "format": "date-time",
                        "description": "The expiration date of the link. Use ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).",
                        "type": "string"
                      },
                      "domain": {
                        "description": "Optional Hosted Auth hostname to use in the generated link instead of the default `auth.unipile.com`. The hostname must already be explicitly verified by Unipile for the parent Application.",
                        "type": "string"
                      },
                      "redirect_uri": {
                        "format": "uri",
                        "description": "The URL to redirect to after the authentication process. If the authentication succeeded, `account_id` and `provider` will be present in query params, along the specified `state`. If the authentication has failed, `error_title` is present instead. This is useful for your app to be aware of the authentication result and to redirect the user to the correct page of your app.",
                        "type": "string"
                      },
                      "state": {
                        "description": "State data sent as query parameter in the redirect_uri and in the `account.add` / `account.reconnect` webhook payload after the authentication process.",
                        "type": "string"
                      },
                      "config": {
                        "description": "Specific provider configuration for the hosted auth session.",
                        "additionalProperties": false,
                        "type": "object",
                        "properties": {
                          "google": {
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
                          },
                          "outlook": {
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
                          },
                          "linkedin": {
                            "additionalProperties": false,
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
                                "default": true,
                                "description": "When true, show the product selection screen after authentication, even when only one LinkedIn product is available; this screen also displays the requested scopes. When false, products are selected automatically and scope consent is collected before authentication.",
                                "type": "boolean"
                              },
                              "allow_methods": {
                                "minItems": 1,
                                "uniqueItems": true,
                                "description": "The authentication methods to show in the hosted auth.\n            `credentials` : Credentials Authentication\n            `cookies` : Cookies Authentication\n            `unilogin` : Connect the active browser session through the UniLogin extension\n          ",
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
                          },
                          "whatsapp": {
                            "additionalProperties": false,
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
                              },
                              "allow_methods": {
                                "description": "The authentication methods to show in the hosted auth.\n            `qr` : QR Code Authentication\n            `pairing` : Pairing Code Authentication\n          ",
                                "default": [
                                  "qr",
                                  "pairing"
                                ],
                                "type": "array",
                                "items": {
                                  "type": "string",
                                  "enum": [
                                    "qr",
                                    "pairing"
                                  ]
                                }
                              }
                            }
                          },
                          "instagram": {
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
                          },
                          "facebook": {
                            "additionalProperties": true,
                            "description": "Facebook specific configuration.",
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
                              },
                              "allow_product_selection": {
                                "default": true,
                                "description": "When true, show the product selection screen after authentication, even when the account administers no Facebook Page; this screen also displays the requested scopes. When false, products are selected automatically and scope consent is collected before authentication.",
                                "type": "boolean"
                              }
                            }
                          },
                          "imap": {
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
                          },
                          "telegram": {
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
                          },
                          "global": {
                            "description": "Configuration applied to all providers",
                            "additionalProperties": false,
                            "type": "object",
                            "properties": {
                              "login_hint": {
                                "description": "If your application knows which user is trying to authenticate, it can use this parameter to provide a hint to the Hosted Auth. It uses the hint to simplify the login flow either by prefilling the email / username / phone number field in the authentication forms.",
                                "type": "string"
                              },
                              "allow_user_proxy_override": {
                                "default": false,
                                "description": "If true, the Hosted Auth UI will show a field where the user can provide their own proxy settings. When filled, the user-defined proxy takes precedence over any custom_proxy defined in the configuration and over automatic proxy detection (if the provider supports it).",
                                "type": "boolean"
                              },
                              "allow_user_country_override": {
                                "default": false,
                                "description": "If true, the Hosted Auth UI will allow the user to manually select a country where Unipile offers automatic proxies for the provider. A proxy may still be temporarily unavailable in the selected country. This selection overrides the detected country and any auto_proxy_config value. Note: if a custom_proxy is explicitly configured for a provider, this option has no effect for that provider (no country selection will be shown).",
                                "type": "boolean"
                              },
                              "wait_initial_sync": {
                                "default": false,
                                "description": "When true, the hosted authentication will wait for the initial sync to complete before redirecting. Only supported for providers with initial sync capability (whatsapp and imap). After authentication succeeds, the session can only poll the linked account for up to 24 hours, independently of the original link expiration, and cannot authenticate another account.",
                                "type": "boolean"
                              }
                            }
                          }
                        }
                      },
                      "account_id": {
                        "description": "Required to re-authenticate or reconfigure an existing account. The entire account is refreshed and all configured products are restarted.",
                        "type": "string",
                        "pattern": "^acc_(.*)$"
                      }
                    }
                  }
                ]
              }
            }
          }
        },
        "x-samples-languages": [
          "node",
          "python",
          "curl"
        ],
        "x-code-samples": [
          {
            "name": "Create auth link",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipileHostedAuth } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipileHostedAuth = new UnipileHostedAuth({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipileHostedAuth.createAuthLink(\n  {\n    body: {\n      expires_on: 'value',\n      redirect_uri: 'https://myapp.com/callback',\n      providers: '*',\n    },\n  }\n);"
          },
          {
            "name": "Create auth link",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    hosted_auth_api = unipile.HostedAuthApi(api_client)\n\nresponse = hosted_auth_api.create_auth_link(\n    {\n    'expires_on': 'value',\n    'redirect_uri': 'https://myapp.com/callback',\n    'providers': '*',\n  }\n)"
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
                    "link"
                  ],
                  "properties": {
                    "object": {
                      "type": "string",
                      "enum": [
                        "HostedAuthLink"
                      ]
                    },
                    "link": {
                      "description": "Link to the Hosted Auth session. Redirect your users to this link so they can authenticate their account. If you use a white-label domain, only replace the hostname with a domain that has been explicitly verified by Unipile for the parent Application.",
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