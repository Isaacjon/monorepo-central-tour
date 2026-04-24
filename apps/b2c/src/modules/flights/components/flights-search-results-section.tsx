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
      <div
        className="ct-container my-4 space-y-4"
        role="status"
        aria-live="polite"
      >
        <div className="flex items-center gap-3 text-base leading-[22px] text-[#667085]">
          <span
            className="border-primary size-4 animate-spin rounded-full border-2 border-r-transparent"
            aria-hidden
          />
          <p>{t("searchResultsLoading")}</p>
        </div>

        <div className="space-y-3" aria-hidden>
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={`search-results-loading-skeleton-${index}`}
              className="animate-pulse rounded-2xl border border-[#EAECF0] bg-white p-4"
            >
              <div className="mb-3 h-4 w-1/3 rounded bg-[#EAECF0]" />
              <div className="mb-2 h-3 w-4/5 rounded bg-[#F2F4F7]" />
              <div className="h-3 w-2/3 rounded bg-[#F2F4F7]" />
            </div>
          ))}
        </div>
      </div>
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
