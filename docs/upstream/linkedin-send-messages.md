---
updatedAt: 2026-11-04T09:39:47.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Send messages

Learn how to send messages on LinkedIn Classic using Unipile API.

There are two scenarios where you want to send messages:

* You don't have a conversation yet with the recipient(s), so you create a new chat and send the first message using the [Start a Chat from Inbox](https://developer.unipile.com/v2.0/reference/startchatfrominbox) endpoint.
* You already have a conversation with the recipient(s), so you send a message in an existing chat using the [Send a Message](https://developer.unipile.com/v2.0/reference/sendmessage) endpoint.

> 👍 Recommendations
>
> Incorporate realistic delays between messages to mimic human behavior, ensuring intervals of at least 10-20 seconds between messages to align with natural conversation patterns.

<br />

# Start a new conversation

## Start an individual chat

To start a conversation with another user, first select the Inbox where the chat will begin. For **LinkedIn Classic**, the correct Inbox to initiate a conversation is `CLASSIC_PRIMARY`.

> 📘 Note about Inboxes
>
> * The [List all Inboxes](https://developer.unipile.com/v2.0/reference/getinboxeslist) endpoint provides a summary of all the available Inboxes for your account.
> * Only the Primary Inbox of a specific product is allowed to initiate a chat.
> * Company pages are not permitted to start conversations with users.

Then use the [Start a Chat from Inbox](https://developer.unipile.com/v2.0/reference/startchatfrominbox) endpoint, specifying the chosen Inbox and the recipient’s User ID.

LinkedIn generally **allows only one individual chat per user**, but multiple conversations can occur under specific conditions, such as when multiple InMails are sent at different times.

Typically, starting a chat with a user who already has an existing conversation will add a new message to that ongoing chat, rather than creating a new conversation.

```node
const { data } = await messagingApi.startChatFromInbox({
  path: {
    account_id: "acc_123456789",
    inbox_id: "CLASSIC_PRIMARY",
  },
  body: {
    users_ids: ['ACoA1B2C3D4E5F6g7Hi8J9K1L2m3NOpqRSTUvWxYZ'],
    text: 'This is the first message in the chat',
  },
});
```
```python
chat = messaging_api.start_chat_from_inbox(
    "CLASSIC_PRIMARY",
    "acc_123456789",
    {
        "users_ids": ["ACoA1B2C3D4E5F6g7Hi8J9K1L2m3NOpqRSTUvWxYZ"],
        "text": "This is the first message in the chat",
    },
)
```

### &#x20;Start a chat by sending an InMail

**InMail messages** are a premium feature that enables users to send messages to others with whom they are not already connected, providing a way to initiate contact with potential connections.

As the owner of a **Career/Business account**, you can send InMails as long as you have sufficient credit. Use the [Get InMail Credits](https://developer.unipile.com/v2.0/reference/getinmailcredits) endpoint to check your current balance.

```node
const { data } = await messagingApi.startChatFromInbox({
  path: {
    account_id: "acc_123456789",
    inbox_id: "CLASSIC_PRIMARY",
  },
  body: {
    users_ids: ['ACoA1B2C3D4E5F6g7Hi8J9K1L2m3NOpqRSTUvWxYZ'],
    text: 'Hey, this is me InMailing you !',
    options: {
      linkedin: {
        classic: {
          inmail: true
        }
      }
    }
  },
});
```

### Start a chat with an organization

On LinkedIn Classic, you can also interact with Organizations (companies, schools, etc.).

Passing the Organization ID as the recipient ID will automatically identify it as an organization. To set the conversation topic, use the `company_topic` field.

```node
const { data } = await messagingApi.startChatFromInbox({
  path: {
    account_id: "acc_123456789",
    inbox_id: "CLASSIC_PRIMARY",
  },
  body: {
    users_ids: ['123456'],
    text: 'Hey, are you guys hiring ?',
    options: {
      linkedin: {
        classic: {
          company_topic: 'CAREERS'
        }
      }
    }
  },
});
```

### Start a chat with an applicant

If you are managing job postings on LinkedIn Classic, you can contact any applicant without having to spend any Inmail credits. First, you must retrieve the applicant profile of the recipient (see [Retrieve an Applicant](https://developer.unipile.com/docs/manage-linkedin-job-applicants#with-linkedin-classic-1) from the Job postings guide).

From the response, you will need to extract 2 values : the `id` of the applicant and the `messaging_token`. Then, pass these values in the `applicant` options field in the body.

```node
const { data } = await messagingApi.startChatFromInbox({
  path: {
    account_id: "acc_123456789",
    inbox_id: "CLASSIC_PRIMARY",
  },
  body: {
    users_ids: ['123456'],
    text: 'Hey, are you available for an interview ?',
    options: {
      linkedin: {
        classic: {
          applicant: {
            id: 'applicant_id',
            messaging_token: 'token'
          }
        }
      }
    }
  },
});
```

<br />

## Start a group chat

To create a new group chat, use the [Start a Chat from Inbox](https://developer.unipile.com/v2.0/reference/startchat) endpoint, specifying the chosen Inbox and a list of members in `users_ids`.

The Unipile API performs two actions in a single request:

* It creates the group by inviting all specified members.
* It sends the first message to the newly created group.

You can optionally specify a group name. If not provided, the group name will be automatically generated from the names of the initial members.

```node
const { data } = await messagingApi.startChatFromInbox({
  path: {
    account_id: "acc_123456789",
    inbox_id: "CLASSIC_PRIMARY",
  },
  body: {
    users_ids: [
      'ACoA1B2C3D4E5F6g7Hi8J9K1L2m3NOpqRSTUvWxYZ',
      'ACoAZXhGfpkDDSJDz93SQsdd13Sk3m8PmLSJuwAds'
    ],
    text: 'This is the first message in the chat',
    name: 'Group Chat Name',
  },
});
```

<br />

# Send a message in a conversation

To send a message in an existing chat, use the [Send a Message](https://developer.unipile.com/v2.0/reference/sendmessage) endpoint, specifying the ID of the Chat where the message will be sent. You can find the IDs of the chats by consulting the [Retrieve chats & messages](https://developer.unipile.com/v2.0/docs/whatsapp-retrieve-chats-messages) endpoint.

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

On LinkedIn Classic, you can send multiple attachments of any kind in a single message, along with text content, as long as **the combined size of all attachments does not exceed 20 MB**.

The following examples use [Send a Message](https://developer.unipile.com/v2.0/reference/sendmessage) but you can send attachments with [Start a Chat from Inbox](https://developer.unipile.com/v2.0/reference/startchatfrominbox) as well.

<br />

## Send pictures

To send pictures, use the [Send a Message](https://developer.unipile.com/v2.0/reference/sendmessage) endpoint and include your files in the `attachments` array.

Any file with a MIME type starting with `image/` will be detected as an image.

> 📘 About Send Mode
>
> Specify the rendering method for the file using the `send_mode` field. If no value is provided, the file will be handled in `native` mode, as LinkedIn would.
>
> * `native` : The picture will be displayed in the chat.
> * `file` : The picture will only be accessible as a downloadable file.

```node
const pictureFile = await readFile('picture.jpg');

const { data } = await messagingApi.sendMessage({
  path: {
    account_id: "acc_123456789",
    chat_id: "chat_id",
  },
  body: {
    text: 'Check this incredible picture !',
    attachments: [
      {
        content: pictureFile.toString('base64'),
        content_type: 'image/jpeg',
        filename: 'picture.jpg',
        send_mode: 'native'
      },
    ],
  },
});
```
```python
import base64

with open("picture.jpg", "rb") as f:
    picture_b64 = base64.b64encode(f.read()).decode("utf-8")

messaging_api.send_message(
    "chat_id",
    "acc_123456789",
    {
        "text": "Check this incredible picture !",
        "attachments": [
            {
                "content": picture_b64,
                "content_type": "image/jpeg",
                "filename": "picture.jpg",
                "send_mode": "native",
            }
        ],
    },
)
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

## Send audio/video files

To send media files, use the [Send a Message](https://developer.unipile.com/v2.0/reference/sendmessage) endpoint and include your files in the `attachments` array.

Files with MIME type starting with `audio/` will be identified as audio files, and files with MIME types starting with `video/` will be identified as video files.

> 📘 About Send Mode
>
> Specify the rendering method for the file using the `send_mode` field. If no value is provided, the file will be handled in `native` mode, as LinkedIn would.
>
> * `native` : The picture will be displayed in the chat.
> * `file` : The picture will only be accessible as a downloadable file.

```node
const audioFile = await readFile('audio.wav');
const videoFile = await readFile('video.mp4');

const { data } = await messagingApi.sendMessage({
  path: {
    account_id: "acc_123456789",
    chat_id: "chat_id",
  },
  body: {
    text: 'Listen to this...',
    attachments: [
      {
        content: audioFile.toString('base64'),
        content_type: 'audio/wav',
        filename: 'audio.wav',
        send_mode: 'native'
      },
			{
        content: videoFile.toString('base64'),
        content_type: 'video/mp4',
        filename: 'video.mp4',
        send_mode: 'file'
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
      "content_type": "image/png",
      "filename": "image.png",
    },
    {
      "content": "base64",
      "content_type": "video/mp4",
      "filename": "video.mp4",
    }

  ]
}
'
```

<br />

## Send documents

To send documents, use the [Send a Message](https://developer.unipile.com/v2.0/reference/sendmessage) endpoint and include your files in the `attachments` array.

<Callout icon="❗️" theme="error">
  The `send_mode` does not apply here, as documents are inherently downloadable files.
</Callout>

```node
const documentFile = await readFile('document.pdf');

const { data } = await messagingApi.sendMessage({
  path: {
    account_id: "acc_123456789",
    chat_id: "chat_id",
  },
  body: {
    text: '',
    attachments: [
      {
        content: documentFile.toString('base64'),
        content_type: 'application/pdf',
        filename: 'document.pdf'
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
      "content_type": "audio/mpeg",
      "filename": "voice.mp3",
      "voice_note": true
    }
  ]
}
'
```

<br />

# Reply to a specific message

To send a message as a reply to a specific message, use the [Send a Message](https://developer.unipile.com/v2.0/reference/sendmessage) endpoint, providing the ID of the message to reply to in `quote_id`. This will embed the replied message in the new message.

```node
const { data } = await messagingApi.sendMessage({
  path: {
    account_id: "acc_123456789",
    chat_id: "chat_id",
  },
  body: {
    text: 'This is a reply to a message',
    quote_id: 'message_id',
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
  "quote_id": "message_id",
  "text": "This is a reply to a message"
}
'
```

<br />

# Forward a message to another Chat

To forward a message into another chat, use the [Forward a Message](https://developer.unipile.com/v2.0/reference/forwardmessage) endpoint, providing the ID of the chat where you want to forward the message.

You can also add a message to accompany the original one.

```node
const { data } = await messagingApi.forwardMessage({
  path: {
    account_id: "acc_123456789",
    chat_id: "chat_id",
    message_id: "message_id",
  },
  body: {
    chat_id: 'destination_chat_id',
		text: 'Check this out !'
  },
});
```
```curl
curl --request POST \
     --url https://api.unipile.com/v2/account_id/chats/chat_id/messages/message_id/forward \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --data '
{
  "chat_id": "destination_chat_id",
}
'
```

<br />

# Set typing indicator

To inform your recipient that you are currently composing a message, use the [Set Composing Indicator](https://developer.unipile.com/v2.0/reference/setcomposingstatus) endpoint, specifying the ID of the relevant chat and setting the action type to `typing`.

```node
await messagingApi.setComposingStatus({
  path: {
    account_id: "acc_123456789",
    chat_id: "chat_id",
  },
  query: {
    action: "typing",
  },
});
```
```curl
curl --request PATCH \
     --url https://api.unipile.com/v2/account_id/chats/chat_id \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --data '{"read_status":true}'
```

<br />

# Be notified about read messages

To receive notifications when a message is read by someone in a conversation, [Configure a webhook](https://developer.unipile.com/v2.0/docs/configure-a-webhook) to listen for `message.receipt.read` events.