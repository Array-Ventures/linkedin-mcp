---
updatedAt: 2026-04-24T15:33:11.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Perform a Request to any LinkedIn API Endpoint

Allows advanced users to implement any LinkedIn feature that is not yet supported by our platform.

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
    "/v2/{account_id}/linkedin/": {
      "post": {
        "operationId": "proxyRequest",
        "summary": "Perform a Request to any LinkedIn API Endpoint",
        "tags": [
          "LinkedIn"
        ],
        "description": "Allows advanced users to implement any LinkedIn feature that is not yet supported by our platform.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "url",
                  "method"
                ],
                "properties": {
                  "url": {
                    "description": "The specific LinkedIn public API endpoint you need to call. Path variables can be declared with the `:VARIABLE_NAME` syntax.",
                    "type": "string"
                  },
                  "method": {
                    "description": "The HTTP method to use when performing the request.",
                    "type": "string",
                    "enum": [
                      "GET",
                      "POST",
                      "PUT",
                      "PATCH",
                      "DELETE"
                    ]
                  },
                  "body": {
                    "description": "A body object to send in the request.",
                    "type": "object",
                    "additionalProperties": {}
                  },
                  "binary_body": {
                    "contentEncoding": "base64",
                    "contentMediaType": "application/octet-stream",
                    "description": "Binary content in base64 to be sent with POST/PUT/PATCH requests. Overrides `body` param.",
                    "type": "string"
                  },
                  "headers": {
                    "description": "A headers object to include in the request. Null value may be used in order to remove a specific header from the default set.",
                    "type": "object",
                    "additionalProperties": {
                      "anyOf": [
                        {
                          "type": "string"
                        },
                        {
                          "type": "null"
                        }
                      ]
                    }
                  },
                  "path_variables": {
                    "description": "The Path variables that have been declared in the URL. Each variable must have a corresponding VARIABLE_NAME key to be injected in the URL.",
                    "type": "object",
                    "additionalProperties": {
                      "type": "string"
                    }
                  },
                  "query_params": {
                    "description": "Query parameters to include in the request URL.",
                    "type": "object",
                    "additionalProperties": {
                      "type": "string"
                    }
                  },
                  "bypass_url_encoding": {
                    "description": "Whether to bypass URL encoding for query parameters or form-urlencoded body, so you can handle encoding yourself.",
                    "default": "false",
                    "type": "boolean"
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
            "name": "Proxy request",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipileLinkedIn } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipileLinkedIn = new UnipileLinkedIn({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipileLinkedIn.proxyRequest(\n  {\n    path: {\n      account_id: ACCOUNT_ID,\n    },\n    body: {\n      url: 'https://myapp.com/callback',\n      method: 'GET',\n    },\n  }\n);"
          },
          {
            "name": "Proxy request",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    linked_in_api = unipile.LinkedInApi(api_client)\n\nresponse = linked_in_api.proxy_request(\n    ACCOUNT_ID,\n    {\n    'url': 'https://myapp.com/callback',\n    'method': 'GET',\n  }\n)"
          }
        ],
        "responses": {
          "200": {
            "description": "The raw response returned by LinkedIn.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "required": [
                    "object",
                    "headers",
                    "data"
                  ],
                  "properties": {
                    "object": {
                      "type": "string",
                      "enum": [
                        "LinkedInRawResponse"
                      ]
                    },
                    "headers": {
                      "description": "The LinkedIn response headers to your request.",
                      "type": "object",
                      "additionalProperties": {
                        "anyOf": [
                          {
                            "type": "string"
                          },
                          {
                            "type": "array",
                            "items": {
                              "type": "string"
                            }
                          }
                        ]
                      }
                    },
                    "data": {
                      "description": "The raw response data that your LinkedIn request returned."
                    }
                  }
                }
              },
              "*/*": {
                "schema": {
                  "type": "string",
                  "format": "binary",
                  "description": "The raw binary data that the LinkedIn request returned."
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