"use client"

import { useSearchParams } from "next/navigation"
import { useTranslations } from "next-intl"
import { useMemo } from "react"

import { FlightsSearchMainColumn } from "./flights-search-main-column"
import { FlightsSearchSidebar } from "./flights-search-sidebar"
import type { FlightOffersSearchResultBody } from "../../types/flight-offers-search-api"
import { getFlightsSearchAirportCodes } from "../../utils/get-flights-search-airport-codes"
import { groupFlightOffersByItinerary } from "../../utils/group-flight-offers"

type FlightsSearchResultsBodyProps = {
  searchResult: FlightOffersSearchResultBody
  hasNextPage?: boolean
  onLoadMore?: () => void
  isFetchingNextPage?: boolean
}

export function FlightsSearchResultsBody({
  searchResult,
  hasNextPage = false,
  onLoadMore,
  isFetchingNextPage = false,
}: FlightsSearchResultsBodyProps) {
  const t = useTranslations("flights")
  const searchParams = useSearchParams()
  const { departureCode, arrivalCode } = useMemo(
    () =>
      getFlightsSearchAirportCodes(Object.fromEntries(searchParams.entries())),
    [searchParams]
  )

  const totalCount = groupFlightOffersByItinerary(searchResult.offers).length

  return (
    <>
      <p className="ct-container my-4 text-base leading-[22px] font-medium text-[#2D3137]">
        {t("searchResultCount", { count: totalCount })}
      </p>
      <div className="ct-container flex flex-col gap-6 pb-8 md:flex-row md:items-start">
        <FlightsSearchSidebar
          departureAirportCode={departureCode}
          arrivalAirportCode={arrivalCode}
        />
        <FlightsSearchMainColumn
          searchResult={searchResult}
          hasNextPage={hasNextPage}
          onLoadMore={onLoadMore}
          isFetchingNextPage={isFetchingNextPage}
        />
      </div>
    </>
  )
}
