import { z } from "zod";
import { UsageError } from "../errors.js";
import { defineOperation } from "./types.js";
import { offsetPagination, pageOutputShape, toPage, withOffsets } from "./shared.js";
import type { ListEnvelope } from "./shared.js";

import { READ_ANNOTATIONS as READ } from "./shared.js";

export const PARAMETER_TYPES = [
  "LOCATION", "COMPANY", "RELATION", "PEOPLE", "SCHOOL", "INDUSTRY", "SERVICE",
  "JOB_FUNCTION", "JOB_TITLE", "EMPLOYMENT_TYPE", "SKILL",
] as const;

/**
 * Fields that only make sense on the category (people/companies/posts) search path. None of
 * them are meaningful alongside a raw `url` — the URL alone fully encodes the search, and the
 * dedicated category endpoint (`/linkedin/search/{category}`) is not the one called in that mode.
 */
const CATEGORY_ONLY_FIELDS = [
  "category", "keywords", "network_distance", "location", "industry", "current_company",
  "first_name", "last_name", "title", "sort", "posted_within",
] as const;

export const searchLinkedIn = defineOperation({
  name: "linkedin_search",
  title: "Search LinkedIn (classic)",
  description:
    "Classic LinkedIn search for people, companies, or posts — either by category (default) or by pasting a LinkedIn Classic search URL copied from the browser via url. Exactly one of category or url is required; when url is given, category and every category-only filter must be omitted, since the URL alone encodes the search. The url form routes across all four LinkedIn Classic search verticals (people, companies, jobs, or posts) depending on what the URL encodes — Unipile's spec does not document which exact URL shapes are accepted, so treat that as unverified until tried against a real URL. Filter fields like location/industry/current_company take parameter IDS — resolve names to ids first with linkedin_get_search_parameters. People-only filters: network_distance, location, industry, current_company, first_name, last_name, title. Posts-only: sort, posted_within. Category results use next_cursor pagination; people/companies have provider-controlled page sizes, posts allow limit up to 49. URL search supports cursor or offset and limit up to 100; LinkedIn imposes account-specific quotas. Sales Navigator search is not wrapped yet — use the CLI raw command if needed.",
  mutates: false,
  inputShape: {
    category: z.enum(["people", "companies", "posts"]).optional().describe("What to search for (required unless url is given)"),
    url: z.string().min(1).optional().describe("A LinkedIn Classic search URL copied from the browser — cannot be combined with category or any category filter"),
    keywords: z.string().optional().describe("Free-text keywords"),
    network_distance: z.array(z.number().int().min(1).max(3)).optional().describe("People: 1=1st, 2=2nd, 3=3rd+ degree"),
    location: z.array(z.string()).optional().describe("People/companies: LOCATION parameter ids"),
    industry: z.array(z.string()).optional().describe("People/companies: INDUSTRY parameter ids"),
    current_company: z.array(z.string()).optional().describe("People: COMPANY parameter ids (current employer)"),
    first_name: z.string().optional().describe("People: exact first-name filter"),
    last_name: z.string().optional().describe("People: exact last-name filter"),
    title: z.string().optional().describe("People: job-title keyword filter"),
    sort: z.enum(["RELEVANCE", "DATE"]).optional().describe("Posts: sort order"),
    posted_within: z.enum(["PAST_DAY", "PAST_WEEK", "PAST_MONTH"]).optional().describe("Posts: recency window"),
    ...offsetPagination,
    cursor: z.string().min(1).optional().describe("Opaque next_cursor from the previous search page; cannot be combined with offset"),
    limit: z
      .number()
      .int()
      .min(1)
      .max(100)
      .optional()
      .describe("URL search: up to 100; posts: up to 49 (default 3); omit for people/companies"),
  },
  outputShape: pageOutputShape,
  annotations: READ,
  cli: { group: "search", command: "run", positional: "category" },
  run: async ({ client, accountId }, input) => {
    const url = input.url as string | undefined;
    const offset = (input.offset as number | undefined) ?? 0;
    const limit = (input.limit as number | undefined) ?? 10;

    if (input.cursor !== undefined && input.offset !== undefined) {
      throw new UsageError("cursor cannot be combined with offset.");
    }

    if (url !== undefined) {
      const offenders = CATEGORY_ONLY_FIELDS.filter((k) => input[k] !== undefined);
      if (offenders.length > 0) {
        throw new UsageError(`url cannot be combined with: ${offenders.join(", ")}.`);
      }
      const page = toPage(
        await client.request<ListEnvelope>({
          method: "POST",
          path: `/v2/${accountId}/linkedin/search`,
          query: { limit: input.limit as number | undefined, offset: input.offset as number | undefined, cursor: input.cursor as string | undefined },
          body: { url },
        })
      );
      return input.cursor !== undefined || page.next_cursor !== undefined ? page : withOffsets(page, offset, limit);
    }

    const category = input.category as "people" | "companies" | "posts" | undefined;
    if (category === undefined) {
      throw new UsageError("category is required unless url is provided.");
    }
    if (input.offset !== undefined) {
      throw new UsageError("Category search uses cursor pagination; pass next_cursor as cursor instead of offset.");
    }
    if (category !== "posts" && input.limit !== undefined) {
      throw new UsageError("limit is not supported for people/companies search; omit it and use cursor for paging.");
    }
    if (category === "posts" && input.limit !== undefined && limit > 49) {
      throw new UsageError("limit must be 49 or less for posts search.");
    }
    const body: Record<string, unknown> = {};
    if (input.keywords !== undefined) body.keywords = input.keywords;
    if (category === "people") {
      if (input.network_distance !== undefined) body.network_distance = input.network_distance;
      if (input.location !== undefined) body.location = input.location;
      if (input.industry !== undefined) body.industry = input.industry;
      if (input.current_company !== undefined) body.current_company = input.current_company;
      const adv: Record<string, unknown> = {};
      if (input.first_name !== undefined) adv.first_name = input.first_name;
      if (input.last_name !== undefined) adv.last_name = input.last_name;
      if (input.title !== undefined) adv.title = input.title;
      if (Object.keys(adv).length > 0) body.advanced_keywords = adv;
    } else if (category === "companies") {
      if (input.location !== undefined) body.location = input.location;
      if (input.industry !== undefined) body.industry = input.industry;
    } else {
      if (input.sort !== undefined) body.sort_by = input.sort;
      if (input.posted_within !== undefined) body.date_posted = input.posted_within;
    }
    // Reject category-inapplicable filters instead of silently dropping them.
    const peopleOnly = ["network_distance", "current_company", "first_name", "last_name", "title"] as const;
    if (category !== "people" && peopleOnly.some((k) => input[k] !== undefined)) {
      throw new UsageError(`Filters ${peopleOnly.join("/")} only apply to category=people.`);
    }
    const postsOnly = ["sort", "posted_within"] as const;
    if (category !== "posts" && postsOnly.some((k) => input[k] !== undefined)) {
      throw new UsageError(`Filters ${postsOnly.join("/")} only apply to category=posts.`);
    }
    if (category === "posts" && (input.location !== undefined || input.industry !== undefined)) {
      throw new UsageError("Filters location/industry do not apply to category=posts.");
    }
    const page = toPage(
      await client.request<ListEnvelope>({
        method: "POST",
        path: `/v2/${accountId}/linkedin/search/${category}`,
        query: { limit: input.limit as number | undefined, cursor: input.cursor as string | undefined },
        body,
      })
    );
    return page;
  },
});

export const getSearchParameters = defineOperation({
  name: "linkedin_get_search_parameters",
  title: "Resolve search filter ids",
  description:
    "Resolve free-text keywords into the parameter ids that linkedin_search filters require (e.g. type=LOCATION keywords='san francisco' → location id). Always resolve ids before filtering a search.",
  mutates: false,
  inputShape: {
    type: z.enum(PARAMETER_TYPES).describe("Which filter dimension to resolve"),
    keywords: z.string().min(1).describe("Free-text name to resolve, e.g. 'san francisco'"),
    limit: z.number().int().min(1).max(100).optional().describe("Max results (default 10)"),
    offset: z.number().int().min(0).optional().describe("Result offset for paging"),
  },
  outputShape: pageOutputShape,
  annotations: READ,
  cli: { group: "search", command: "params" },
  run: async ({ client, accountId }, input) => {
    const offset = (input.offset as number | undefined) ?? 0;
    const page = toPage(
      await client.request<ListEnvelope>({
        method: "GET",
        path: `/v2/${accountId}/linkedin/search/parameters`,
        query: { type: input.type as string, keywords: input.keywords as string, limit: input.limit as number | undefined, offset: input.offset as number | undefined },
      })
    );
    return withOffsets(page, offset, (input.limit as number | undefined) ?? 10);
  },
});
