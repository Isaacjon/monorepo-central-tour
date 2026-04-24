import { useQuery } from "@tanstack/react-query"

import { useDebouncedValue } from "@/shared/hooks/use-debounced-value"

import { getAirports } from "./airports.api"

/** Debounce for airport location search before calling U-Code. */
export const AIRPORT_SEARCH_DEBOUNCE_MS = 300

export const airportsKeys = {
  all: ["airports"] as const,
  list: (search: string) => [...airportsKeys.all, "list", search] as const,
} as const

export function useAirportsQuery(search: string = "") {
  const debouncedSearch = useDebouncedValue(search, AIRPORT_SEARCH_DEBOUNCE_MS)
  const country = debouncedSearch.trim()
  return useQuery({
    queryKey: airportsKeys.list(country),
    queryFn: () => getAirports({ country }),
    staleTime: country ? 5 * 60 * 1000 : 24 * 60 * 60 * 1000,
    gcTime: 25 * 60 * 60 * 1000,
  })
}
