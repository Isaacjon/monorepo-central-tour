/**
 * Stable key so the filter client subtree remounts when the meaningful query string changes.
 */
export function flightsSearchQueryKey(
  query: Readonly<Record<string, string | string[] | undefined>>
): string {
  const entries = Object.entries(query)
    .filter(([, v]) => v !== undefined && v !== "")
    .map(([k, v]) => {
      const s = Array.isArray(v) ? v[0] : v
      return [k, s ?? ""] as const
    })
    .sort(([a], [b]) => a.localeCompare(b))
  return entries.map(([k, v]) => `${k}=${v}`).join("&")
}
