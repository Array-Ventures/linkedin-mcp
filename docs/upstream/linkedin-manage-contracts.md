---
updatedAt: 2026-11-04T09:39:47.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Manage contracts

Learn how to list, select, and monitor LinkedIn Recruiter and Sales Navigator contracts with Unipile API.

LinkedIn Recruiter and Sales Navigator users can have access to one or several contracts. A contract represents a specific Recruiter or Sales Navigator workspace that the user can access.

Unipile lets you list the contracts available to a connected account, identify the currently selected contract, and switch to another contract of the same LinkedIn product.

# Prerequisites

The LinkedIn account must be connected with the corresponding `recruiter` or `sales_navigator` product activated. Configure the allowed products when calling [Create Auth Link](https://developer.unipile.com/v2.0/reference/createauthlink), then let the user activate the product during authentication when product selection is enabled.

If the required product is not activated on the account, the contract endpoints return `403` with an insufficient permissions error. Learn more about product activation in [Link LinkedIn accounts](https://developer.unipile.com/v2.0/docs/linkedin-link-accounts#linkedin-products).

<Callout icon="👍" theme="okay">
  Recruiter and Sales Navigator cannot be activated on the same Unipile account. To use both products, connect the LinkedIn account twice: one Unipile account with Recruiter activated and another with Sales Navigator activated.
</Callout>

<br />

# List available contracts

Use [List Available Contracts](https://developer.unipile.com/v2.0/reference/getavailablecontracts) to retrieve the Recruiter or Sales Navigator contracts accessible to the connected account.

Each entry contains:

* `id`: the contract identifier to use when selecting it;
* `name`: the contract name displayed by LinkedIn;
* `product`: `recruiter` or `sales_navigator`;
* `selected`: whether the contract is currently active on the account;
* `description`: additional contract information, when provided by LinkedIn.

```node
const { data } = await unipileLinkedIn.getAvailableContracts(
  {
    path: {
      account_id: "acc_123456789",
    },
  }
);
```
```python
response = linked_in_api.get_available_contracts(
    "acc_123456789"
)
```
```curl
curl --request GET \
     --url https://api.unipile.com/v2/acc_123456789/linkedin/contracts \
     --header 'X-API-KEY: api-key' \
     --header 'accept: application/json'
```
```json Response
{
  "object": "AvailableContracts",
  "contracts": [
    {
      "object": "Contract",
      "product": "recruiter",
      "selected": true,
      "id": "RECRUITER_123456",
      "name": "Recruiter contract"
    },
    {
      "object": "Contract",
      "product": "recruiter",
      "selected": false,
      "id": "RECRUITER_789012",
      "name": "Recruiter contract - Europe"
    }
  ]
}
```

<br />

# Select a contract

Use [Select a Contract](https://developer.unipile.com/v2.0/reference/selectcontract) with an `id` returned by List Available Contracts. Selecting a contract updates the Recruiter or Sales Navigator session used by the account. Subsequent API methods and real-time events for that product use the selected contract.

```node
const { data } = await unipileLinkedIn.selectContract(
  {
    path: {
      account_id: "acc_123456789",
      contract_id: "RECRUITER_789012",
    },
  }
);
```
```python
response = linked_in_api.select_contract(
    "RECRUITER_789012",
    "acc_123456789"
)
```
```curl
curl --request POST \
     --url https://api.unipile.com/v2/acc_123456789/linkedin/contracts/RECRUITER_789012/select \
     --header 'X-API-KEY: api-key' \
     --header 'accept: application/json'
```

<br />

# Monitor contract access

Unipile does not emit a dedicated event when a LinkedIn Recruiter or Sales Navigator license is canceled. Loss of access can instead disconnect the affected product. If another product remains operational, the account typically moves to the `partial` status; if no product remains operational, it can move to `disconnected`.

Subscribe to account status webhooks such as `account.status.partial` and `account.status.disconnected`, then inspect `metadata.products_connection_status` on the Account object to identify the affected product. A disconnected product can indicate a canceled license, but it can also result from an expired or revoked session, so confirm the subscription status with the account owner.

Learn more in [Account status lifecycle](https://developer.unipile.com/v2.0/docs/status-lifecycle) and [Account webhook events](https://developer.unipile.com/v2.0/reference/event-types-1#account-events).