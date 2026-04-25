"use client"

import { useTranslations } from "next-intl"
import { useState } from "react"

import { cn } from "ui"

import { FlightsSearchFlightCard } from "./flights-search-flight-card"
import { FlightsSearchPriceGraph } from "./flights-search-price-graph"
import type { FlightOffersSearchResultBody } from "../../types/flight-offers-search-api"

const dayTabValues = [4, 5, 6, 7, 8, 9, 10] as const

type FlightsSearchMainColumnProps = {
  searchResult: FlightOffersSearchResultBody
  hasNextPage?: boolean
  onLoadMore?: () => void
  isFetchingNextPage?: boolean
}

type SortId = "popularity" | "price" | "rating"

export function FlightsSearchMainColumn({
  searchResult,
  hasNextPage = false,
  onLoadMore,
  isFetchingNextPage = false,
}: FlightsSearchMainColumnProps) {
  const t = useTranslations("flights")
  const [activeDays, setActiveDays] = useState(7)
  const [sort, setSort] = useState<SortId>("popularity")
  const [up, setUp] = useState(false)

  const metaCurrency = searchResult.meta.currency

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-4">
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label={t("searchDateTabsLabel")}
      >
        {dayTabValues.map((d) => (
          <button
            key={d}
            type="button"
            role="tab"
            aria-selected={activeDays === d}
            onClick={() => setActiveDays(d)}
            className={cn(
              "h-9 rounded-full px-3 text-sm leading-5 font-medium",
              activeDays === d
                ? "bg-primary text-white"
                : "text-c-text hover:bg-c-gray-100 bg-white"
            )}
          >
            {t("searchDateTabDays", { count: d })}
          </button>
        ))}
      </div>

      <FlightsSearchPriceGraph currency={metaCurrency} />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-c-text flex min-w-0 flex-wrap items-center gap-2 text-sm">
          <span className="shrink-0 font-medium whitespace-nowrap">
            {t("searchSortBy")}
          </span>
          {(["popularity", "price", "rating"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                if (s === "popularity" && s === sort) {
                  setUp((u) => !u)
                } else {
                  setSort(s)
                }
              }}
              className={cn(
                "inline-flex h-8 items-center gap-0.5 rounded-lg px-2.5 text-sm",
                sort === s
                  ? "bg-c-selected text-c-highlight font-medium"
                  : "text-c-text"
              )}
            >
              {t(`searchSort.${s}`)}
              {s === "popularity" && sort === s && up && <span>↑</span>}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="bg-primary h-8 shrink-0 rounded-lg px-4 text-sm font-medium text-white"
        >
          {t("searchCompare")}
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {searchResult.offers.map((offer, index) => (
          <FlightsSearchFlightCard
            key={`${offer.offerId}-${index}`}
            offer={offer}
            metaCurrency={metaCurrency}
          />
        ))}
      </div>

      {hasNextPage && onLoadMore ? (
        <button
          type="button"
          onClick={onLoadMore}
          disabled={isFetchingNextPage}
          className="text-c-text hover:bg-c-gray-100 mt-2 h-10 w-full max-w-md rounded-xl border border-[#D0D5DD] bg-white text-sm font-medium disabled:opacity-60"
        >
          {isFetchingNextPage
            ? t("searchResultsLoadingMore")
            : t("searchResultsLoadMore")}
        </button>
      ) : null}
    </div>
  )
}
