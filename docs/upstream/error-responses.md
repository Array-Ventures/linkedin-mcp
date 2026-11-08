---
updatedAt: 2026-08-18T09:06:47.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Error responses

Troubleshoot problems with this comprehensive breakdown of all error codes.

# Error shape

Unipile API uses the RFC 7807 specification to represent problems and errors.

An error response is always of the following shape.

```json
{
	"object": "Error",
	"type": "string",
	"status": number,
	"title": "string",
	"detail": "string",
	"req_id": "string"
}
```

<br />

***

# Error types

Here is the exhaustive list of error types you can encounter. You should handle them carefully as some errors are just forwarded from the provider, and others are internal to Unipile.

Provider errors and temporary connectivity failures are expected parts of an integration that depends on third-party systems. Error handling must therefore be more comprehensive than for an API that controls every underlying operation. Unipile normalizes error types and connection signals to make this practical across providers, but your application is responsible for implementing the documented handling. Read [Building on third-party providers](https://developer.unipile.com/v2.0/docs/fundamentals#building-on-third-party-providers) for the availability model, then use [Troubleshoot Connection Issues](https://developer.unipile.com/v2.0/docs/troubleshoot-connection-issues) and the error type to decide whether to retry, pause a workflow, or request user action.

You’ll notice that these types follow a pattern: `thrower/info`. Our goal is to design a consistent system that makes things easier to anticipate and code against.

The thrower can be:

* `api` : This error is throw by Unipile.
* `provider`: This error is throw by the Provider and forwarded.

<br />

| **status** | type                                      | description                                                                                                                                                                                                                                                             |
| ---------- | ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **400**    | `api/invalid_parameters`                  | The given parameters in the query or body does not respect the required shape. See `detail` for more informations.                                                                                                                                                      |
| **400**    | `provider/invalid_parameters`             | The provider responded that the given parameters are invalid. See `detail` for more informations.                                                                                                                                                                       |
| **400**    | `api/invalid_auth_format`                 | The given account token is invalid.                                                                                                                                                                                                                                     |
| **401**    | `provider/invalid_authorization`          | The provider responded that the authorization payload can't authenticate the user. Account require re-authentication.                                                                                                                                                   |
| **401**    | `provider/invalid_credentials`            | The provider responded that the given credentials are invalid during the authentication process.                                                                                                                                                                        |
| **401**    | `provider/account_mismatch`               | The provider account authenticated during a reconnection does not match the existing Unipile account. Ask the user to authenticate with the same provider account; create a new Unipile account instead if they intend to connect a different identity.                 |
| **401**    | `provider/invalid_checkpoint_code`        | The provider responded that the given checkpoint code is invalid during the authentication process.                                                                                                                                                                     |
| **401**    | `api/missing_authorization`               | The [API Key](https://developer.unipile.com/v2.0/docs/api-keys) is missing in the request header.                                                                                                                                                                                                           |
| **401**    | `api/expired_authorization`               | The [API Key](https://developer.unipile.com/v2.0/docs/api-keys) used in the request is expired.                                                                                                                                                                                                             |
| **401**    | `api/proxy_auth_error`                    | The authentication to the proxy used to perform the request failed.                                                                                                                                                                                                     |
| **403**    | `api/inactive_subscription`               | The parent organization of the given account does not have an active subscription to Unipile.                                                                                                                                                                           |
| **403**    | `api/insufficient_permissions`            | The token used does not allow to call this method.                                                                                                                                                                                                                      |
| **403**    | `provider/insufficient_permissions`       | The provider responded that the account owner does not have the permission to perform this method. See `detail` for more informations.                                                                                                                                  |
| **403**    | `api/account_restricted`                  | The account you try to link has been banned from Unipile. `detail` is the reason of the ban. Refer to [Acount linking limitations](https://developer.unipile.com/v2.0/docs/link-an-account#account-linking-limitations)  for more informations.                         |
| **403**    | `api/already_exists`                      | The account you try to link is already linked for the given application. `detail` is the ID of the existing resource. Refer to [Acount linking limitations](https://developer.unipile.com/v2.0/docs/link-an-account#account-linking-limitations) for more informations. |
| **403**    | `provider/unknown_authentication_context` | The authentication with the provider require the user to authenticate on the provider's website.                                                                                                                                                                        |
| **404**    | `provider/resource_not_found`             | The provider responded that the resource you want to retrieve does not exist.                                                                                                                                                                                           |
| **404**    | `api/resource_not_found`                  | The Unipile resource or route you want to retrieve does not exist.                                                                                                                                                                                                      |
| **405**    | `provider/method_not_allowed`             | The method you try to call does not exist for the given account provider. Refer to the provider features table for more informations.                                                                                                                                   |
| **409**    | `api/conflict`                            | The Unipile resource you want to create conflict with another one.                                                                                                                                                                                                      |
| **409**    | `provider/conflict`                       | The provider responded that the resource you want to create conflict with another one.                                                                                                                                                                                  |
| **415**    | `provider/invalid_file`                   | The provider responded that the type of file you want to send is not supported.                                                                                                                                                                                         |
| **422**    | `provider/unprocessable_entity`           | The provider responded that it's unable to process the request. See `detail` for more informations.                                                                                                                                                                     |
| **429**    | `provider/too_many_requests`              | The provider's rate limit was reached because Unipile did not stop the request first. Reduce the relevant Unipile limit; retries cannot be scheduled as reliably as for an Unipile 429. Refer to the Limits and restrictions guide.                                     |
| **429**    | `api/too_many_requests`                   | Unipile stopped the request before it reached the provider. Use the rate-limit response headers, including `retry-after`, to schedule the retry. Please refer to [Rate Limit](https://developer.unipile.com/v2.0/reference/rate-limit) for more information.                                                     |
| **500**    | `api/internal_error`                      | An error occured on Unipile side. Try again later or contact us if the issue persist.                                                                                                                                                                                   |
| **501**    | `api/not_implemented`                     | The method you try to call is not implemented yet by Unipile event though it exist on the provider.                                                                                                                                                                     |
| **502**    | `api/proxy_error`                         | An error occured with the proxy used to perform the request. Try again later or contact us if the issue persist.                                                                                                                                                        |
| **502**    | `provider/server_error`                   | The provider responded with a server error. The provider might be down. Try again later.                                                                                                                                                                                |
| **504**    | `api/proxy_timeout`                       | The proxy used to perform the request timed out.                                                                                                                                                                                                                        |
| **504**    | `provider/timeout`                        | Unipile could not reach the provider and the request timed out. The provider might be down or is experiencing slowdowns. Try again later.                                                                                                                               |

<br />

***

# Bad implementation errors

If you receive one of the following error types, this is probably caused by a bad integration of Unipile into your app.

* `api/invalid_parameters`
* `api/invalid_auth_format`
* `api/missing_authorization`
* `api/insufficient_permissions`
* `provider/method_not_allowed`
* `provider/too_many_requests`
* `api/too_many_requests`
* `api/not_implemented`