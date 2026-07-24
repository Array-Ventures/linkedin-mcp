import { describe, expect, it } from "vitest";
import { toIdArray, toPage, withOffsets } from "../../src/core/operations/shared.js";

describe("toPage", () => {
  it("maps data->items and keeps only present pagination fields", () => {
    expect(toPage({ data: [1], next_cursor: "c2", total_count: 9 })).toEqual({ items: [1], next_cursor: "c2", total_count: 9 });
    expect(toPage({ data: [], next_cursor: null })).toEqual({ items: [] });
    expect(toPage({ data: [], has_more: false })).toEqual({ items: [], has_more: false });
  });
});

describe("toIdArray (message_id null|string|string[] gotcha)", () => {
  it("normalizes all three shapes", () => {
    expect(toIdArray(null)).toEqual([]);
    expect(toIdArray("m1")).toEqual(["m1"]);
    expect(toIdArray(["m1", "m2"])).toEqual(["m1", "m2"]);
  });
});

describe("withOffsets", () => {
  it("computes next_offset from total_count when present, else from a full page", () => {
    expect(withOffsets({ items: [1, 2], total_count: 5 }, 0, 2)).toMatchObject({ offset: 0, next_offset: 2 });
    expect(withOffsets({ items: [1] , total_count: 1 }, 0, 2).next_offset).toBeUndefined();
    expect(withOffsets({ items: [1, 2] }, 2, 2)).toMatchObject({ offset: 2, next_offset: 4 });
    expect(withOffsets({ items: [1] }, 0, 2).next_offset).toBeUndefined();
  });
});
