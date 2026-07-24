import { z } from "zod";

export const cursorPagination = {
  limit: z.number().int().min(1).max(100).optional().describe("Max items to return (API default 20)"),
  cursor: z.string().optional().describe("Opaque cursor from a previous response's next_cursor"),
};

export const offsetPagination = {
  limit: z.number().int().min(1).max(50).optional().describe("Max items to return (API default 10, max 50)"),
  offset: z.number().int().min(0).optional().describe("Result offset for paging"),
};

export interface ListEnvelope {
  data: unknown[];
  next_cursor?: string | null;
  total_count?: number;
  has_more?: boolean;
}

export function toPage(res: ListEnvelope): Record<string, unknown> {
  const page: Record<string, unknown> = { items: res.data };
  if (res.next_cursor !== null && res.next_cursor !== undefined) page.next_cursor = res.next_cursor;
  if (res.total_count !== undefined) page.total_count = res.total_count;
  if (res.has_more !== undefined) page.has_more = res.has_more;
  return page;
}

export const pageOutputShape = {
  items: z.array(z.record(z.unknown())),
  next_cursor: z.string().optional(),
  total_count: z.number().optional(),
  has_more: z.boolean().optional(),
  offset: z.number().optional(),
  next_offset: z.number().optional(),
};

export const itemOutputShape = { item: z.record(z.unknown()) };

export function toIdArray(v: string | string[] | null | undefined): string[] {
  if (v === null || v === undefined) return [];
  return Array.isArray(v) ? v : [v];
}

/** Shared annotation presets — single source of truth for read/write tools. */
export const READ_ANNOTATIONS = { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: true as const };
export const WRITE_ANNOTATIONS = { readOnlyHint: false, destructiveHint: true, idempotentHint: false, openWorldHint: true as const };

/**
 * Offset-paginated endpoints (search) return no cursor; carry the caller's offset
 * through and compute next_offset when another page is determinable.
 */
export function withOffsets(page: Record<string, unknown>, offset: number, limitUsed: number): Record<string, unknown> {
  page.offset = offset;
  const items = page.items as unknown[];
  const total = page.total_count as number | undefined;
  const more = total !== undefined ? offset + items.length < total : items.length >= limitUsed && items.length > 0;
  if (more) page.next_offset = offset + items.length;
  return page;
}
