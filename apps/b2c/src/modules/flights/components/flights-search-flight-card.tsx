"use client"

import { useTranslations } from "next-intl"
import { useState } from "react"
import { cn, PrimaryButton } from "ui"

import { FlightsSearchFlightCardAirlineRow } from "./flights-search-flight-card-airline-row"
import { FlightsSearchFlightCardTimeline } from "./flights-search-flight-card-timeline"
import { FlightsSearchFlightCardToggleDetails } from "./flights-search-flight-card-toggle-details"
import { FlightsSearchFlightDetails } from "./flights-search-flight-details"
import { FlightsSearchFlightFavoriteButton } from "./flights-search-flight-favorite-button"
import {
  type FlightSearchResult,
  isRoundTripWithNoTransfers,
} from "../types/flight-search-result"

type FlightsSearchFlightCardProps = {
  flight: FlightSearchResult
}

export function FlightsSearchFlightCard({
  flight,
}: FlightsSearchFlightCardProps) {
  const t = useTranslations("flights")
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [favorite, setFavorite] = useState(false)

  const flightRows = flight.returnFlight
    ? [flight, flight.returnFlight]
    : [flight]

  const isRoundTripNonStop = isRoundTripWithNoTransfers(flight)

  return (
    <article className="bg-c-surface relative rounded-[20px] p-4">
      <FlightsSearchFlightFavoriteButton
        className="absolute top-4 right-4 z-10"
        pressed={favorite}
        onPressedChange={setFavorite}
        aria-label={t("searchFlightToggleFavorite")}
      />

      {flightRows.map((rowFlight, index) => {
        return (
          <div
            key={`${rowFlight.id}-${index}`}
            className={cn(index > 0 && "mt-9")}
          >
            <FlightsSearchFlightCardAirlineRow
              rowFlight={rowFlight}
              className={index === 0 ? "pr-10" : undefined}
            />

            <FlightsSearchFlightCardTimeline rowFlight={rowFlight} />

            {detailsOpen && (
              <FlightsSearchFlightDetails
                flight={rowFlight}
                directionLabel={
                  isRoundTripNonStop
                    ? index === 0
                      ? "outbound"
                      : "return"
                    : undefined
                }
              />
            )}
          </div>
        )
      })}

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <FlightsSearchFlightCardToggleDetails
          expanded={detailsOpen}
          onToggle={() => setDetailsOpen((v) => !v)}
          showDetailsLabel={t("searchFlightDetailsLink")}
          hideDetailsLabel={t("searchFlightHideDetails")}
        />

        <div className="flex flex-wrap items-center justify-end gap-3">
          <span className="text-base leading-[22px] font-normal text-black">
            {t("searchFlightSelectFares")}
          </span>
          <PrimaryButton
            className="min-h-0 rounded-xl px-4 py-2.5 text-base leading-[22px] font-medium"
            size="sm"
            type="button"
          >
            {t("priceFromPrefix")} {flight.priceDisplay}
          </PrimaryButton>
        </div>
      </div>
    </article>
  )
}
