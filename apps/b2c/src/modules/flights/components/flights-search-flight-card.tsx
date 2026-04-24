"use client"

import { useTranslations } from "next-intl"
import { useState } from "react"
import { cn, PrimaryButton } from "ui"

import { FlightsSearchFaresDialog } from "./flights-search-fares-dialog"
import { FlightsSearchFlightCardAirlineRow } from "./flights-search-flight-card-airline-row"
import { FlightsSearchFlightCardTimeline } from "./flights-search-flight-card-timeline"
import { FlightsSearchFlightCardToggleDetails } from "./flights-search-flight-card-toggle-details"
import { FlightsSearchFlightDetails } from "./flights-search-flight-details"
import { FlightsSearchFlightFavoriteButton } from "./flights-search-flight-favorite-button"
import type { FlightOfferApi } from "../types/flight-offers-search-api"
import { formatOfferPrice } from "../utils/flight-offer-ui-format"

function isRoundTripNonStopOffer(offer: FlightOfferApi): boolean {
  if (offer.directions.length !== 2) {
    return false
  }
  const [out, ret] = offer.directions
  return out.segments.length === 1 && ret.segments.length === 1
}

type FlightsSearchFlightCardProps = {
  offer: FlightOfferApi
  metaCurrency: string
}

export function FlightsSearchFlightCard({
  offer,
  metaCurrency,
}: FlightsSearchFlightCardProps) {
  const t = useTranslations("flights")
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [favorite, setFavorite] = useState(false)
  const [faresDialogOpen, setFaresDialogOpen] = useState(false)

  const directions = offer.directions
  const rowDirections =
    directions.length >= 2
      ? [directions[0], directions[1]]
      : directions[0]
        ? [directions[0]]
        : []

  const isRoundTripNonStop = isRoundTripNonStopOffer(offer)

  const priceLabel = formatOfferPrice(
    offer.price.amount,
    offer.price.currency || metaCurrency
  )

  return (
    <article className="bg-c-surface relative rounded-[20px] p-4">
      <FlightsSearchFlightFavoriteButton
        className="absolute top-4 right-4 z-10"
        pressed={favorite}
        onPressedChange={setFavorite}
        aria-label={t("searchFlightToggleFavorite")}
      />

      {rowDirections
        .filter((d) => d.segments[0])
        .map((direction, index) => {
          return (
            <div
              key={`${offer.offerId}-dir-${direction.directionIndex}-${index}`}
              className={cn(index > 0 && "mt-9")}
            >
              <FlightsSearchFlightCardAirlineRow
                direction={direction}
                className={index === 0 ? "pr-10" : undefined}
              />

              <FlightsSearchFlightCardTimeline direction={direction} />

              {detailsOpen && (
                <FlightsSearchFlightDetails
                  direction={direction}
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
          <button
            type="button"
            className="cursor-pointer text-base leading-[22px] font-normal text-black transition-opacity hover:opacity-75"
            onClick={() => setFaresDialogOpen(true)}
          >
            {t("searchFlightSelectFares")}
          </button>
          <PrimaryButton
            className="min-h-0 cursor-pointer rounded-xl px-4 py-2.5 text-base leading-[22px] font-medium"
            size="sm"
            type="button"
          >
            {t("priceFromPrefix")} {priceLabel}
          </PrimaryButton>
        </div>
      </div>

      <FlightsSearchFaresDialog
        open={faresDialogOpen}
        onOpenChange={setFaresDialogOpen}
        offer={offer}
        metaCurrency={metaCurrency}
      />
    </article>
  )
}
