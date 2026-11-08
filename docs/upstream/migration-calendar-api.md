---
updatedAt: 2026-11-04T09:32:47.000Z
agentTools:
  projectIndex: https://developer.unipile.com/v2.0/llms.txt
---

# Calendar API

This guide will help you migrate the Calendar features of your application to API v2.

<br />

# Methods changes

For each endpoint in the v1 API, here are the corresponding endpoints in the v2 API, along with the necessary modifications to achieve the same results.

> ❗️ Specifying the target account
>
> The `account_id` param, previously available either in the query params or in the body, is removed from all methods. The `account_id` must now be consistently included in the path params.

<br />

## List all calendars

`GET /v1/calendars`

* Use `GET /v2/:account_id/calendars` [List all Calendars](https://developer.unipile.com/v2.0/reference/getcalendarslist)
* Query param `account_id` is removed
  * Specify in the path param

<br />

## Retrieve a calendar

`GET /v1/calendars`

* Use `GET /v2/:account_id/calendars` [List all Calendars](https://developer.unipile.com/v2.0/reference/getcalendarslist)
* Query param `account_id` is removed
  * Specify in the path param

<br />

## Retrieve all events from a calendar

`GET /v1/calendars/:calendar_id/events`

* Use `GET /v2/:account_id/calendars/:calendar_id/events` [List all calendar events](https://developer.unipile.com/v2.0/reference/getcalendareventlist)
* Query param `account_id` is removed
  * Specify in the path param
* Response shape has changed (see CalendarEvent object changes)

<br />

## Retrieve an event

`GET /v1/calendars/:calendar_id/events/:event_id`

* Use `GET /v2/:account_id/calendars/:calendar_id/events/:event_id` [Get a calendar event](https://developer.unipile.com/v2.0/reference/getcalendarevent)
* Query param `account_id` is removed
  * Specify in the path param
* Response shape has changed (see CalendarEvent object changes)

<br />

***

# CalendarEvent changes

| v1 field          | v2 change                   |
| :---------------- | :-------------------------- |
| `start.time_zone` | Renamed to `start.timezone` |
| `end.time_zone`   | Renamed to `end.timezone`   |

***