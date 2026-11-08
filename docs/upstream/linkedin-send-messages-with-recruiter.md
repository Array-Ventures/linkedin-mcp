---
updatedAt: 2026-11-04T09:39:47.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Send messages with Recruiter

Learn how to send messages on LinkedIn Recruiter using Unipile API.

There are two scenarios where you want to send messages:

* You don't have a conversation yet with the recipient(s), so you create a new chat and send the first message using the [Start a Chat from Inbox](https://developer.unipile.com/v2.0/reference/startchatfrominbox) endpoint.
* You already have a conversation with the recipient(s), so you send a message in an existing chat using the [Send a Message](https://developer.unipile.com/v2.0/reference/sendmessage) endpoint.

> 👍 Recommendations
>
> Incorporate realistic delays between messages to mimic human behavior, ensuring intervals of at least 10-20 seconds between messages to align with natural conversation patterns.

<br />

# Start a new conversation

## Start an individual chat

To start a conversation with another user, first select the Inbox where the chat will begin. For **LinkedIn Recruiter**, the correct Inbox to initiate a conversation is `RECRUITER_PRIMARY`.

> 📘 Note about Inboxes
>
> * The [List all Inboxes](https://developer.unipile.com/v2.0/reference/getinboxeslist) endpoint provides a summary of all the available Inboxes for your account.
> * Only the Primary Inbox of a specific product is allowed to initiate a chat.

Then use the [Start a Chat from Inbox](https://developer.unipile.com/v2.0/reference/startchatfrominbox) endpoint, specifying the chosen Inbox and the recipient’s User ID. When using `linkedin_recruiter` options, ensure that both `subject` and `signature` are provided.

LinkedIn generally **allows only one individual chat per user**, but multiple conversations can occur under specific conditions, such as when multiple InMails are sent at different times.

Typically, starting a chat with a user who already has an existing conversation will add a new message to that ongoing chat. However, if the recipient hasn’t accepted the communication yet, you must wait at least 24 hours after the initial message before sending a follow-up message.

```node
const { data } = await messagingApi.startChatFromInbox({
  path: {
    account_id: "acc_123456789",
    inbox_id: "RECRUITER_PRIMARY",
  },
  body: {
    users_ids: ['AEMA1B2C3D4E5F6g7Hi8J9K1L2m3NOpqRSTUvWxYZ'],
    text: 'This is the first message in the chat',
    options: {
      linkedin: {
        recruiter: {
          signature: 'John Doe',
          subject: 'Open to work ?'
        }
      }
    }
  },
});
```
```python
chat = messaging_api.start_chat_from_inbox(
    "RECRUITER_PRIMARY",
    "acc_123456789",
    {
        "users_ids": ["AEMA1B2C3D4E5F6g7Hi8J9K1L2m3NOpqRSTUvWxYZ"],
        "text": "This is the first message in the chat",
        "options": {
            "linkedin": {
                "recruiter": {
                    "signature": "John Doe",
                    "subject": "Open to work ?",
                }
            }
        },
    },
)
```

## Start a chat with a candidate

To initiate a conversation with a **candidate** or a **job applicant** within a Project, you must first select the Inbox where the chat will begin. In this context, the correct Inbox is `RECRUITER_{project_id}_PRIMARY`, where `project_id` is the ID of the Project where the chat should be started.

The process follows a similar pattern as described in [Start an individual chat](#start-an-individual-chat) .

Depending on the use case, you may need to provide the `channel_type` field, which refers to the **Talent pool channel** from which you want the message to be sent. For example, if the recipient is a job applicant, you should select **JOB\_POSTING**.

```node
const { data } = await messagingApi.startChatFromInbox({
  path: {
    account_id: "acc_123456789",
    inbox_id: "RECRUITER_1234567890_PRIMARY",
  },
  body: {
    users_ids: ['AEMA1B2C3D4E5F6g7Hi8J9K1L2m3NOpqRSTUvWxYZ'],
    text: 'This is the first message in the chat',
    options: {
      linkedin: {
        recruiter: {
          signature: 'John Doe',
          subject: 'Open to work ?',
          channel_type: 'JOB_POSTING'
        }
      }
    },
  },
});
```

<br />

# Send a message in a conversation

To send a message in an existing chat, use the [Send a Message](https://developer.unipile.com/v2.0/reference/sendmessage) endpoint, providing the ID of the Chat to send the message in. You can find the IDs of the chats by consulting the [Retrieve chats & messages](https://developer.unipile.com/v2.0/docs/whatsapp-retrieve-chats-messages) endpoint.

```node
const { data } = await messagingApi.sendMessage({
  path: {
    account_id: "acc_123456789",
    chat_id: "chat_id",
  },
  body: {
    text: 'Hello, world!',
  },
});
```
```python
message = messaging_api.send_message(
    "chat_id",
    "acc_123456789",
    {"text": "Hello, world!"},
)
```
```curl
curl --request POST \
     --url https://api.unipile.com/v2/account_id/chats/chat_id/messages/send \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --data '
{
  "text": "Hello, World!"
}
'
```

<br />

# About text messages

LinkedIn Recruiter supports **advanced formatting of messages**. To take advantage of this feature, you will need to structure the content of your message with HTML tags.

The authorized tags are  :

* `<strong>` for bold characters
* `<em>` for italic characters
* `<ol>` for numbered lists
* `<ul>` for bulleted lists
* `<li>` for list items
* `<a href="some-url">` for hyperlinks

<br />

# Send attachments

On LinkedIn Recruiter, you can send multiple attachments of any type in a single message, along with text content, as long as **the combined size of all attachments does not exceed 20 MB**.

To send files, use the [Send a Message](https://developer.unipile.com/v2.0/reference/sendmessage) or [Start a Chat from Inbox](https://developer.unipile.com/v2.0/reference/startchatfrominbox) endpoint and include your files in the `attachments` array.

```node
const pictureFile = await readFile('picture.jpg');
const documentFile = await readFile('document.pdf');

const { data } = await messagingApi.sendMessage({
  path: {
    account_id: "acc_123456789",
    chat_id: "chat_id",
  },
  body: {
    text: 'Here is an image and a document.',
    attachments: [
      {
        content: pictureFile.toString('base64'),
        content_type: 'image/jpeg',
        filename: 'picture.jpg',
      },
{
        content: documentFile.toString('base64'),
        content_type: 'application/pdf',
        filename: 'document.pdf',
      },
    ],
  },
});
```
```curl
curl --request POST \
     --url https://api.unipile.com/v2/account_id/chats/chat_id/messages/send \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --data '
{
  "attachments": [
    {
      "content": "base64",
      "content_type": "application/pdf",
      "filename": "document.pdf",
    }
  ]
}
'
```