import { z } from "zod";
import { defineOperation } from "./types.js";
import { cursorPagination, itemOutputShape, pageOutputShape, toPage } from "./shared.js";
import type { ListEnvelope } from "./shared.js";

import { READ_ANNOTATIONS as READ, WRITE_ANNOTATIONS as WRITE } from "./shared.js";

const PROFILE_SECTIONS = [
  "linkedin_*",
  "linkedin_experience",
  "linkedin_education",
  "linkedin_languages",
  "linkedin_skills",
  "linkedin_certifications",
  "linkedin_volunteer_experience",
  "linkedin_projects",
  "linkedin_recommendations",
  "linkedin_interests",
] as const;

export const getProfile = defineOperation({
  name: "linkedin_get_profile",
  title: "Get a LinkedIn profile",
  description:
    "Fetch a user's LinkedIn profile by provider id or public identifier (the slug in their profile URL). Use 'me' for the connected account owner. Request extra sections (experience, education, skills…) via sections — note LinkedIn may throttle sections (see throttled_sections in the result).",
  mutates: false,
  inputShape: {
    user: z.string().min(1).describe("User provider id, public identifier, or 'me'"),
    sections: z.array(z.enum(PROFILE_SECTIONS)).optional().describe("Profile sections to include, e.g. linkedin_experience"),
  },
  outputShape: itemOutputShape,
  annotations: READ,
  cli: { group: "profile", command: "get", positional: "user" },
  run: async ({ client, accountId }, input) => ({
    item: await client.request<Record<string, unknown>>({
      method: "GET",
      path: `/v2/${accountId}/users/${encodeURIComponent(input.user as string)}`,
      query: { with_sections: input.sections as string[] | undefined },
    }),
  }),
});

export const getCompany = defineOperation({
  name: "linkedin_get_company",
  title: "Get a LinkedIn company profile",
  description: "Fetch a company's LinkedIn profile (followers, locations, industry, headcount insights, funding) by company id or public identifier.",
  mutates: false,
  inputShape: { company: z.string().min(1).describe("Company id or public identifier") },
  outputShape: itemOutputShape,
  annotations: READ,
  cli: { group: "company", command: "get", positional: "company" },
  run: async ({ client, accountId }, input) => ({
    item: await client.request<Record<string, unknown>>({
      method: "GET",
      path: `/v2/${accountId}/linkedin/company/${encodeURIComponent(input.company as string)}`,
    }),
  }),
});

export const listConnections = defineOperation({
  name: "linkedin_list_connections",
  title: "List LinkedIn connections",
  description: "List 1st-degree connections (relations) of a user — defaults to the account owner. Supports a free-text search filter.",
  mutates: false,
  inputShape: {
    user: z.string().min(1).optional().describe("User id (defaults to 'me')"),
    search: z.string().optional().describe("Free-text filter on the connections list"),
    ...cursorPagination,
  },
  outputShape: pageOutputShape,
  annotations: READ,
  cli: { group: "connections", command: "list" },
  run: async ({ client, accountId }, input) =>
    toPage(
      await client.request<ListEnvelope>({
        method: "GET",
        path: `/v2/${accountId}/users/${encodeURIComponent((input.user as string | undefined) ?? "me")}/relations`,
        query: { search: input.search as string | undefined, limit: input.limit as number | undefined, cursor: input.cursor as string | undefined },
      })
    ),
});

export const listInvitations = defineOperation({
  name: "linkedin_list_invitations",
  title: "List pending invitations",
  description:
    "List pending connection invitations. direction='received' shows invites awaiting your response; direction='sent' shows invites you are waiting on (the API has no combined mode).",
  mutates: false,
  inputShape: { direction: z.enum(["sent", "received"]).describe("Which side of pending invitations to list"), ...cursorPagination },
  outputShape: pageOutputShape,
  annotations: READ,
  cli: { group: "invitations", command: "list" },
  run: async ({ client, accountId }, input) =>
    toPage(
      await client.request<ListEnvelope>({
        method: "GET",
        path: `/v2/${accountId}/users/me/relation-requests`,
        query: { type: input.direction as string, limit: input.limit as number | undefined, cursor: input.cursor as string | undefined },
      })
    ),
});

export const sendInvitation = defineOperation({
  name: "linkedin_send_invitation",
  title: "Send a connection invitation",
  description:
    "Send a connection request to a user, optionally with a note. Fails if you are already connected. LinkedIn enforces strict invitation quotas (~100-200/week) — pace these carefully.",
  mutates: true,
  inputShape: {
    user_id: z.string().min(1).describe("Provider id of the user to invite"),
    message: z.string().max(300).optional().describe("Optional invitation note (max 300 chars)"),
  },
  outputShape: itemOutputShape,
  annotations: WRITE,
  cli: { group: "invitations", command: "send" },
  run: async ({ client, accountId }, input) => {
    const body: Record<string, unknown> = { user_id: input.user_id };
    if (input.message !== undefined) body.message = input.message;
    return { item: await client.request<Record<string, unknown>>({ method: "POST", path: `/v2/${accountId}/users/me/relation-requests`, body }) };
  },
});

export const respondInvitation = defineOperation({
  name: "linkedin_respond_invitation",
  title: "Accept, decline, or withdraw an invitation",
  description:
    "Act on a pending invitation by request_id (from linkedin_list_invitations). accept = accept a RECEIVED invite; decline = refuse a RECEIVED invite; withdraw = cancel an invite YOU sent. (decline and withdraw share one API endpoint whose effect depends on the invitation's direction.)",
  mutates: true,
  inputShape: {
    request_id: z.string().min(1).describe("Invitation id from linkedin_list_invitations"),
    action: z.enum(["accept", "decline", "withdraw"]).describe("What to do with the invitation"),
  },
  outputShape: { result: z.string() },
  annotations: WRITE,
  cli: { group: "invitations", command: "respond" },
  run: async ({ client, accountId }, input) => {
    const verb = input.action === "accept" ? "accept" : "cancel";
    const res = await client.request<{ object: string }>({
      method: "POST",
      path: `/v2/${accountId}/users/me/relation-requests/${encodeURIComponent(input.request_id as string)}/${verb}`,
    });
    return { result: res.object };
  },
});

export const followUser = defineOperation({
  name: "linkedin_follow_user",
  title: "Follow or unfollow a user",
  description:
    "Follow (uni-directional) or unfollow a user. Following a private profile may convert into a follow request — the result item shows which happened.",
  mutates: true,
  inputShape: {
    user_id: z.string().min(1).describe("Provider id of the user"),
    action: z.enum(["follow", "unfollow"]).describe("Follow or unfollow"),
  },
  outputShape: itemOutputShape,
  annotations: WRITE,
  cli: { group: "follow", command: "set" },
  run: async ({ client, accountId }, input) => ({
    item: await client.request<Record<string, unknown>>({
      method: "POST",
      path: `/v2/${accountId}/users/me/${input.action === "follow" ? "follow" : "unfollow"}/${encodeURIComponent(input.user_id as string)}`,
    }),
  }),
});
