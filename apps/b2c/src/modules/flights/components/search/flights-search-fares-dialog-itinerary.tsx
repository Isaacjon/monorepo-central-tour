"use client"

import { Fragment } from "react"
import { TooltipProvider } from "ui"

import { ITINERARY_TRACK_GRID } from "./flights-search-fares-dialog-itinerary-layout"
import { FlightsSearchFaresDialogItineraryTransferRow } from "./flights-search-fares-dialog-itinerary-transfer-row"
import { getAirportLabel } from "./flights-search-fares-dialog.utils"
import type { FlightOfferDirectionApi } from "../../types/flight-offers-search-api"
import type { FlightOfferSegmentApi } from "../../types/flight-offers-search-api-segment"
import { formatRouteDurationMinutes } from "../../utils/flight-offer-ui-format"
import { FlightsAirlineLogo } from "../shared/flights-airline-logo"

type FlightsSearchFaresDialogItineraryProps = {
  directions: readonly FlightOfferDirectionApi[]
  showDirectionMetaRow?: boolean
}

const segmentInter =
  "font-(family-name:--font-inter-stack,Inter,ui-sans-serif,sans-serif) tracking-normal"

function FaresDialogFlightSegmentBlock({
  segment,
}: {
  segment: FlightOfferSegmentApi
}) {
  const durationMinutes = segment.durationMinutes ?? 0

  return (
    <div
      className={`${ITINERARY_TRACK_GRID} ${segmentInter} grid-rows-[auto_auto_auto]`}
    >
      {/* Explicit placement avoids relying on implicit order with row-span. */}
      <div className="col-start-1 row-start-1 flex items-center justify-center self-stretch">
        <span className="text-[16px] leading-[22px] font-bold text-[#111126] tabular-nums">
          {segment.departure.time}
        </span>
      </div>
      <div
        className="col-start-2 row-span-3 row-start-1 flex min-h-0 flex-col items-center self-stretch"
        aria-hidden
      >
        <span className="min-h-0 flex-1 border-l border-[#98A2B3]" />
        <span className="min-h-0 min-w-0 flex-[2_1_0%] border-l border-dashed border-[#98A2B3]" />
        <span className="min-h-0 flex-1 border-l border-[#98A2B3]" />
      </div>
      <div className="col-start-3 row-start-1 flex min-w-0 items-center self-stretch">
        <p className="text-[16px] leading-6 font-semibold text-[#111126]">
          {getAirportLabel(
            segment.departure.airportName,
            segment.departure.airportCode,
            segment.departure.terminal
          )}
        </p>
      </div>

      <div className="col-start-1 row-start-2 flex items-center justify-center self-stretch">
        <FlightsAirlineLogo
          flightNumber={segment.flightNumber}
          airlineIataCode={segment.marketingCarrier.code}
        />
      </div>
      <div className="col-start-3 row-start-2 flex min-w-0 items-start self-stretch">
        <div className="my-4 flex w-full min-w-0 flex-col gap-2">
          <p className="text-[13px] leading-[18px] font-medium text-[#475467]">
            {segment.marketingCarrier.name} {segment.flightNumber}
          </p>
          <p className="text-[13px] leading-[18px] font-medium text-[#475467]">
            Продолжительность перелета:{" "}
            {formatRouteDurationMinutes(durationMinutes)}
          </p>
        </div>
      </div>

      <div className="col-start-1 row-start-3 flex items-center justify-center self-stretch">
        <span className="text-[16px] leading-[22px] font-bold text-[#111126] tabular-nums">
          {segment.arrival.time}
        </span>
      </div>
      <div className="col-start-3 row-start-3 flex min-w-0 items-center self-stretch">
        <p className="text-[16px] leading-6 font-semibold text-[#111126]">
          {getAirportLabel(
            segment.arrival.airportName,
            segment.arrival.airportCode,
            segment.arrival.terminal
          )}
        </p>
      </div>
    </div>
  )
}

function DirectionMetaRow({ segment }: { segment: FlightOfferSegmentApi }) {
  return (
    <div className="mb-2 flex flex-wrap items-center gap-3 text-[15px] leading-6 text-[#344054]">
      <span className="rounded-lg bg-[#415AF8] px-3 py-1 text-sm leading-5 font-medium text-white">
        Билет
      </span>
      <span>{segment.departure.date}</span>
      <span aria-hidden>•</span>
      <span>
        Продолжительность: {formatRouteDurationMinutes(segment.routeDurationMinutes)}
      </span>
    </div>
  )
}

export function FlightsSearchFaresDialogItinerary({
  directions,
  showDirectionMetaRow = true,
}: FlightsSearchFaresDialogItineraryProps) {
  if (directions.length === 0) {
    return null
  }

  return (
    <TooltipProvider delayDuration={200}>
      <section className="mt-5 flex flex-col gap-0">
        {directions.map((direction, directionIndex) => {
          const segments = direction.segments
          if (segments.length === 0) {
            return null
          }

          return (
            <div key={`${direction.directionIndex}-${directionIndex}`}>
              {showDirectionMetaRow ? (
                <DirectionMetaRow segment={segments[0]} />
              ) : null}
              {segments.map((segment, segmentIndex) => (
                <Fragment
                  key={`${segment.segmentIndex}-${segment.flightNumber}-${segmentIndex}`}
                >
                  <FaresDialogFlightSegmentBlock segment={segment} />
                  {segmentIndex < segments.length - 1 ? (
                    <FlightsSearchFaresDialogItineraryTransferRow
                      cityName={segment.arrival.cityName}
                      transferDurationMinutes={segment.transferDurationMinutes}
                      baggageRecheck={segment.baggageRecheck}
                      recheckAirportLabel={
                        segment.arrival.airportName?.trim() ||
                        segment.arrival.airportCode ||
                        "—"
                      }
                    />
                  ) : null}
                </Fragment>
              ))}
            </div>
          )
        })}
      </section>
    </TooltipProvider>
  )
}
