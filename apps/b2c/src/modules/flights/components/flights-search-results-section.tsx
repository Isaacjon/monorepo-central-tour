"use client"

import { useTranslations } from "next-intl"
import { useMemo } from "react"

import { FlightsSearchEmptyState } from "./flights-search-empty-state"
import { FlightsSearchResultsBody } from "./flights-search-results-body"
import {
  mergeFlightSearchPages,
  useFlightSearchInfiniteQuery,
} from "../services/flight-search/flight-search.query"

type FlightsSearchResultsSectionProps = {
  searchQuery: Readonly<Record<string, string | string[] | undefined>>
}

export function FlightsSearchResultsSection({
  searchQuery,
}: FlightsSearchResultsSectionProps) {
  const t = useTranslations("flights")
  const {
    data,
    isPending,
    isError,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFlightSearchInfiniteQuery(searchQuery)

  const merged = useMemo(() => {
    if (!data?.pages.length) {
      return null
    }
    return mergeFlightSearchPages(data.pages)
  }, [data])

  if (isPending) {
    return (
      <p className="ct-container my-4 text-base leading-[22px] text-[#667085]">
        {t("searchResultsLoading")}
      </p>
    )
  }

  if (isError) {
    return (
      <div className="ct-container my-4 space-y-3">
        <p className="text-base leading-[22px] text-[#B42318]">
          {t("searchResultsError")}
        </p>
        {error instanceof Error && error.message ? (
          <p className="text-sm text-[#667085]">{error.message}</p>
        ) : null}
        <button
          type="button"
          onClick={() => void refetch()}
          className="text-primary text-sm font-medium underline"
        >
          {t("searchResultsRetry")}
        </button>
      </div>
    )
  }

  if (!merged || merged.offers.length === 0) {
    return (
      <FlightsSearchEmptyState
        copy={{
          title: t("searchResultsEmptyTitle"),
          imageAlt: t("searchResultsEmptyImageAlt"),
        }}
      />
    )
  }

  return (
    <FlightsSearchResultsBody
      searchResult={merged}
      hasNextPage={Boolean(hasNextPage)}
      onLoadMore={() => void fetchNextPage()}
      isFetchingNextPage={isFetchingNextPage}
    />
  )
}
