---
updatedAt: 2026-09-15T13:27:46.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Get a User Picture

Downloads the profile picture of the specified User. Use `me` as `user_id` to specify the owner of the connected account. For the providers that publish no public url for it, the url of this endpoint is given by the `private_picture_download_url` field of a User; for Facebook, it serves the current picture, whose `public_picture_url` expires within days.

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
    "/v2/{account_id}/users/{user_id}/picture": {
      "get": {
        "operationId": "getUserPicture",
        "summary": "Get a User Picture",
        "tags": [
          "Users"
        ],
        "description": "Downloads the profile picture of the specified User. Use `me` as `user_id` to specify the owner of the connected account. For the providers that publish no public url for it, the url of this endpoint is given by the `private_picture_download_url` field of a User; for Facebook, it serves the current picture, whose `public_picture_url` expires within days.",
        "parameters": [
          {
            "schema": {
              "minLength": 1,
              "type": "string"
            },
            "in": "path",
            "name": "user_id",
            "required": true,
            "description": "The ID of the User whose profile picture must be downloaded. Use `me` to specify the owner of the connected account."
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
        "responses": {
          "200": {
            "description": "Default Response"
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