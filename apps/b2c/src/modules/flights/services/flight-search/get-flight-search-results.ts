import type { FlightSearchResult } from "../../types/flight-search-result"

/**
 * Loads flight offers for the search route. Replace with real API integration.
 */
export async function getFlightSearchResults(
  _query: Readonly<Record<string, string | string[] | undefined>>
): Promise<FlightSearchResult[]> {
  void _query
  return []
}
