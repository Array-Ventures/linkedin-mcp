const DISPLAY_KEYS = ["name", "display_name", "title", "text", "headline", "type", "status", "object"] as const;

function summarizeItem(item: Record<string, unknown>): string {
  const id = typeof item.id === "string" ? item.id : "";
  const display = DISPLAY_KEYS.map((k) => item[k]).find((v): v is string => typeof v === "string" && v !== "");
  const line = [id, display].filter(Boolean).join("  ");
  const fallback = line === "" ? JSON.stringify(item) : line;
  return fallback.length > 100 ? `${fallback.slice(0, 97)}...` : fallback;
}

export function renderHuman(result: Record<string, unknown>): string {
  if (Array.isArray(result.items)) {
    const lines = (result.items as Array<Record<string, unknown>>).map(summarizeItem);
    if (lines.length === 0) lines.push("(no results)");
    for (const key of ["next_cursor", "total_count", "has_more", "offset", "next_offset"]) {
      if (result[key] !== undefined) lines.push(`${key}: ${String(result[key])}`);
    }
    return lines.join("\n");
  }
  return JSON.stringify(result, null, 2);
}
