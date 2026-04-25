import { useInfiniteQuery } from "@tanstack/react-query"

import {
  fetchFlightSearchPage,
  FLIGHT_SEARCH_PAGE_LIMIT,
} from "./flight-search.api"
import type { FlightOffersSearchResultBody } from "../../types/flight-offers-search-api"
import { flightsSearchQueryKey } from "../../utils/flights-search-query-key"

export const flightSearchResultsKeys = {
  all: ["flightSearchResults"] as const,
  list: (query: Readonly<Record<string, string | string[] | undefined>>) =>
    [...flightSearchResultsKeys.all, flightsSearchQueryKey(query)] as const,
  infinite: (query: Readonly<Record<string, string | string[] | undefined>>) =>
    [...flightSearchResultsKeys.list(query), "infinite"] as const,
} as const

/** Concatenate paged API responses for list UI (meta/search/provider from the first page). */
export function mergeFlightSearchPages(
  pages: readonly FlightOffersSearchResultBody[]
): FlightOffersSearchResultBody | null {
  if (!pages.length) {
    return null
  }
  const head = pages[0]!
  return {
    ...head,
    offers: pages.flatMap((p) => [...p.offers]),
  }
}

export function useFlightSearchInfiniteQuery(
  query: Readonly<Record<string, string | string[] | undefined>>
) {
  return useInfiniteQuery({
    queryKey: flightSearchResultsKeys.infinite(query),
    queryFn: ({ pageParam }) => fetchFlightSearchPage(query, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.offers.length === 0) {
        return undefined
      }
      if (lastPage.offers.length < FLIGHT_SEARCH_PAGE_LIMIT) {
        return undefined
      }
      const loaded = allPages.reduce((sum, p) => sum + p.offers.length, 0)
      if (
        lastPage.meta.totalOffers > 0 &&
        loaded >= lastPage.meta.totalOffers
      ) {
        return undefined
      }
      return allPages.length + 1
    },
    staleTime: 30 * 1000,
  })
}
