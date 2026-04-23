"use client"

import { useTranslations } from "next-intl"

import { FlightsSearchMainColumn } from "./flights-search-main-column"
import { FlightsSearchSidebar } from "./flights-search-sidebar"
import type { FlightSearchResult } from "../types/flight-search-result"

type FlightsSearchResultsBodyProps = {
  totalCount: number
  results: readonly FlightSearchResult[]
}

export function FlightsSearchResultsBody({
  totalCount,
  results,
}: FlightsSearchResultsBodyProps) {
  const t = useTranslations("flights")

  return (
    <>
      <p className="ct-container my-4 text-base leading-[22px] font-medium text-[#2D3137]">
        {t("searchResultCount", { count: totalCount })}
      </p>
      <div className="ct-container flex flex-col gap-6 pb-8 md:flex-row md:items-start">
        <FlightsSearchSidebar />
        <FlightsSearchMainColumn results={results} />
      </div>
    </>
  )
}
