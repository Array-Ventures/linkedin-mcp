---
updatedAt: 2026-11-04T09:39:47.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Send messages with Sales Navigator

Learn how to send messages on LinkedIn Recruiter using Unipile API.

There are two scenarios where you want to send messages:

* You don't have a conversation yet with the recipient(s), so you create a new chat and send the first message using the [Start a Chat from Inbox](https://developer.unipile.com/v2.0/reference/startchatfrominbox) endpoint.
* You already have a conversation with the recipient(s), so you send a message in an existing chat using the [Send a Message](https://developer.unipile.com/v2.0/reference/sendmessage) endpoint.

> 👍 Recommendations
>
> Incorporate realistic delays between messages to mimic human behavior, ensuring intervals of at least 10-20 seconds between messages to align with natural conversation patterns.

<br />

# Start a new conversation

To initiate a conversation with another user, first select the Inbox where the chat will begin. For **LinkedIn Sales Navigator**, the correct Inbox to initiate a conversation is `SALES_NAVIGATOR_PRIMARY`.

> 📘 Note about Inboxes
>
> * The [List all Inboxes](https://developer.unipile.com/v2.0/reference/getinboxeslist) endpoint provides a summary of all the available Inboxes for your account.
> * Only the Primary Inbox of a specific product is allowed to initiate a chat.

Then use the [Start a Chat from Inbox](https://developer.unipile.com/v2.0/reference/startchatfrominbox) endpoint, specifying the chosen Inbox the recipient’s User ID. When using `linkedin_sales_navigator` options, ensure that `subject` is provided.

LinkedIn generally **allows only one individual chat per user**, but multiple conversations can occur under specific conditions, such as when multiple InMails are sent at different times.

Typically, starting a chat with a user who already has an existing conversation will add a new message to that ongoing chat, rather than creating a new conversation.

```node
const { data } = await messagingApi.startChatFromInbox({
  path: {
    account_id: "acc_123456789",
    inbox_id: "SALES_NAVIGATOR_PRIMARY",
  },
  body: {
    users_ids: ['ACwA1B2C3D4E5F6g7Hi8J9K1L2m3NOpqRSTUvWxYZ'],
    text: 'This is the first message in the chat',
    options: {
      linkedin: {
        sales_navigator: {
          subject: 'New business opportunity'
        }
      }
    }
  },
});
```
```python
chat = messaging_api.start_chat_from_inbox(
    "SALES_NAVIGATOR_PRIMARY",
    "acc_123456789",
    {
        "users_ids": ["ACwA1B2C3D4E5F6g7Hi8J9K1L2m3NOpqRSTUvWxYZ"],
        "text": "This is the first message in the chat",
        "options": {
            "linkedin": {
                "sales_navigator": {
                    "subject": "New business opportunity",
                }
            }
        },
    },
)
```

<br />

# Send a message in a conversation

To send a message in an existing chat, use the [Send a Message](https://developer.unipile.com/v2.0/reference/sendmessage) endpoint, specifying the ID of the Chat to send the message in. You can find the IDs of the chats by consulting the [Retrieve chats & messages](https://developer.unipile.com/v2.0/docs/whatsapp-retrieve-chats-messages) endpoint.

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

# Send attachments

On Sales Navigator, you can send multiple attachments in a single message, along with text content. Each attachment should **not exceed 50 Mb**, and the total size of all attachments should **not be more than 200 Mb**.

To send files, use the [Send a Message](https://developer.unipile.com/v2.0/reference/sendmessage) or [Start a Chat from Inbox](https://developer.unipile.com/v2.0/reference/startchatfrominbox) endpoint and include your files in the `attachments` array.

> ❗️ Provider limitations
>
> Only image files (.jpg, .png, etc.) and documents are accepted (.pdf, .doc, .xls, etc.).

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

<br />

# Be notified about read messages

To receive notifications when a message is read by someone in a conversation, [Configure a webhook](https://developer.unipile.com/v2.0/docs/configure-a-webhook) to listen for `message.receipt.read` events.