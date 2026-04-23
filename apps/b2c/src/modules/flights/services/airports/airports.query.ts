import { useQuery } from "@tanstack/react-query"

import { getAirports } from "./airports.api"

export const airportsKeys = {
  all: ["airports"] as const,
  list: () => [...airportsKeys.all, "list"] as const,
} as const

export function useAirportsQuery() {
  return useQuery({
    queryKey: airportsKeys.list(),
    queryFn: getAirports,
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 25 * 60 * 60 * 1000,
  })
}
