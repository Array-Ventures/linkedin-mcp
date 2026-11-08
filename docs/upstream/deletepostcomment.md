---
updatedAt: 2026-04-24T15:33:11.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Delete Comment from a Post

Deletes a comment of the account's owner from a post. Trying to delete a comment from another user will fail.

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
      "name": "Posts",
      "description": "Posts management"
    }
  ],
  "paths": {
    "/v2/{account_id}/posts/{post_id}/comments/{comment_id}": {
      "delete": {
        "operationId": "deletePostComment",
        "summary": "Delete Comment from a Post",
        "tags": [
          "Posts"
        ],
        "description": "Deletes a comment of the account's owner from a post. Trying to delete a comment from another user will fail.",
        "parameters": [
          {
            "schema": {
              "minLength": 1,
              "type": "string"
            },
            "in": "path",
            "name": "post_id",
            "required": true,
            "description": "The ID of the Post where the comment is.<br>Use IDs from *Get a Post*, *Create a Post* or *List all User's Posts* methods responses only. Some providers may allow native Post IDs, please refer to Posts integration guides."
          },
          {
            "schema": {
              "minLength": 1,
              "type": "string"
            },
            "in": "path",
            "name": "comment_id",
            "required": true,
            "description": "The ID of the Comment to delete."
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
            "name": "Delete post comment",
            "language": "node",
            "install": "npm install unipile",
            "code": "import { UnipilePosts } from 'unipile';\n\nconst ACCOUNT_ID = 'acc_123456789';\n\nconst unipilePosts = new UnipilePosts({ key: 'YOUR_API_KEY' });\n\nconst { data } = await unipilePosts.deletePostComment(\n  {\n    path: {\n      post_id: 'post_id',\n      comment_id: 'comment_id',\n      account_id: ACCOUNT_ID,\n    },\n  }\n);"
          },
          {
            "name": "Delete post comment",
            "language": "python",
            "install": "pip install git+https://github.com/unipile/unipile-python.git",
            "code": "import unipile\n\nACCOUNT_ID = \"acc_123456789\"\n\nconfiguration = unipile.Configuration()\nconfiguration.api_key[\"apiKey\"] = \"YOUR_API_KEY\"\n\nwith unipile.ApiClient(configuration) as api_client:\n    posts_api = unipile.PostsApi(api_client)\n\nresponse = posts_api.delete_post_comment(\n    'post_id',\n    'comment_id',\n    ACCOUNT_ID\n)"
          }
        ],
        "responses": {
          "204": {
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