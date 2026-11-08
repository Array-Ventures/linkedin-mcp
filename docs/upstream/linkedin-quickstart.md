---
updatedAt: 2026-10-29T11:14:33.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# LinkedIn

Learn how to list chats of a Linkedin account and send a message in one of them using Unipile SDK.

# Prerequisites

Before we start, you need to:

1. [Signup to Unipile](https://dashboardv2.unipile.com/register).
2. Create an Application in the dashboard.
3. [Create an API Key](https://developer.unipile.com/v2.0/docs/api-keys) in your Application.
4. (Optional) Install the SDK & Setup Client\
   Get the Unipile SDK.

   ```Text npm
   npm i @unipile/sdk
   ```
   ```Text pnpm
   pnpm add @unipile/sdk
   ```

   Initialize the SDK and prepare request options with the Account API Key you created. Keep the key on your server; replace the placeholder locally.

   ```typescript Node.js
   import { UnipileMessaging } from '@unipile/sdk';

   const request_options = {
     baseUrl: 'https://api.unipile.com',
     headers: { 'X-API-KEY': 'YOUR_ACCOUNT_API_KEY' },
     throwOnError: true,
   };
   const messagingApi = new UnipileMessaging();
   ```
   ```python Python
   import unipile

   configuration = unipile.Configuration()
   configuration.api_key["apiKey"] = "apikey"

   api_client = unipile.ApiClient(configuration)
   messaging_api = unipile.MessagingApi(api_client)
   ```

   <br />

# 1. Link an account

In the **Accounts** section of the Dashboard, choose **Link Account → Quick Authentication**. Use [Advanced Authentication](https://developer.unipile.com/v2.0/docs/advanced-authentication) when you need custom settings.

Select **LinkedIn** and authenticate to the account you want to show chats for your demo application.

Once the account is added, keep the given ID as it will be used later.

<br />

# 2. Try to call API Methods

Now, all you have to do is calling the method you want and specify the account ID given in **Step 1**. In this quickstart guide, we'll see how to list chats and send a message in one of them.

<br />

## List chats

To get the Linkedin Classic's chats list of the account `acc_1234567890`, use [List inbox Chats](https://developer.unipile.com/v2.0/reference/getinboxchatslist).

```typescript Node.js
const chats = await messagingApi.getInboxChatsList({
  ...request_options,
  path: {
    account_id: 'acc_1234567890',
    inbox_id: 'CLASSIC',
  },
});
```
```python Python
chats = messaging_api.get_inbox_chats_list(
    "CLASSIC",
    "acc_1234567890",
)
```
```curl
curl --request GET \
     --url https://api.unipile.com/v2/acc_1234567890/inboxes/CLASSIC/chats \
     --header 'X-API-KEY: api-key' \
     --header 'accept: application/json'
```

<br />

## Send a message

To send a message in an existing chat, use [Send a Message](https://developer.unipile.com/v2.0/reference/sendmessage) and specify the ID of the chat you want to send the message in.

The `chat_id` can be found:

* in the previously retrieved list
* in the URL of the LinkedIn website (eg: <https://www.linkedin.com/messaging/thread/2-NTQxZDRkNzgtZGZlZC00Yzc0xxxxxxxxxxxxxxxxxxxxxxxxxx==/>)

```typescript Node.js
await messagingApi.sendMessage({
  ...request_options,
  path: {
    account_id: 'acc_1234567890',
    chat_id: '2-NTQxZDRkNzgtZGZlZC00Yzc0xxxxxxxxxxxxxxxxxxxxxxxxxx==/',
  },
  body: {
    text: 'Hello from Unipile!',
  },
});
```
```python Python
messaging_api.send_message(
    "2-NTQxZDRkNzgtZGZlZC00Yzc0xxxxxxxxxxxxxxxxxxxxxxxxxx==/",
    "acc_1234567890",
    {
        "text": "Hello from Unipile!",
    },
)
```
```curl
curl --request POST \
     --url https://api.unipile.com/v2/acc_1234567890/chats/2-NTQxZDRkNzgtZGZlZC00Yzc0xxxxxxxxxxxxxxxxxxxxxxxxxx%3D%3D%2F/messages/send \
     --header 'X-API-KEY: api-key' \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --data '
{
  "text": "Hello from Unipile!"
}
'
```

<br />

> 👍 Learn once, integrate everything !
>
> You can reuse the same Methods with accounts of other providers that support Messaging features !

<br />

# 3. Discover Unipile's fundamentals

* [Accounts & Providers](https://developer.unipile.com/v2.0/docs/provider-accounts)
* [Methods & Realtime](https://developer.unipile.com/v2.0/docs/methods)
* [API Keys](https://developer.unipile.com/v2.0/docs/api-keys)