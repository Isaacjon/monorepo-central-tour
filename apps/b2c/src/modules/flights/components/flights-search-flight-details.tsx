"use client"

import { useTranslations } from "next-intl"
import type { ReactNode } from "react"

import { FlightsSearchFlightDetailsSegment } from "./flights-search-flight-details-segment"
import { FlightsSearchFlightDetailsTransfer } from "./flights-search-flight-details-transfer"
import type {
  FlightSearchDetailSegment,
  FlightSearchLeg,
} from "../types/flight-search-result"

export type FlightsSearchFlightDetailsDirectionLabel = "outbound" | "return"

type FlightsSearchFlightDetailsProps = {
  flight: FlightSearchLeg
  /** Shown for round-trip non-stop: outbound vs return, localized (e.g. «Туда» / «Обратно»). */
  directionLabel?: FlightsSearchFlightDetailsDirectionLabel
}

function legToDetailSegment(leg: FlightSearchLeg): FlightSearchDetailSegment {
  return {
    airlineName: leg.airlineName,
    airlineIataCode: leg.airlineIataCode,
    flightNumber: leg.flightNumber,
    departureTime: leg.departureTime,
    departureDateLabel: leg.departureDateLabel,
    departureCity: leg.departureCity,
    departureCode: leg.departureCode,
    arrivalTime: leg.arrivalTime,
    arrivalDateLabel: leg.arrivalDateLabel,
    arrivalCity: leg.arrivalCity,
    arrivalCode: leg.arrivalCode,
    duration: leg.duration,
    terminal: leg.terminal,
    bookingClass: leg.bookingClass,
    baggageWeight: leg.baggageWeight,
    operatingAirlineName: leg.operatingAirlineName,
    baggage: leg.baggage,
  }
}

function detailSegmentsForLeg(
  leg: FlightSearchLeg
): FlightSearchDetailSegment[] {
  if (leg.detailSegments?.length) {
    return [...leg.detailSegments]
  }
  return [legToDetailSegment(leg)]
}

function layoverAfterSegment(
  leg: FlightSearchLeg,
  segmentIndex: number,
  total: number
): number | undefined {
  if (total < 2 || segmentIndex < 0 || segmentIndex > total - 2) {
    return undefined
  }
  if (total === 2) {
    return leg.detailLayovers?.[0] ?? leg.transferLayoverMinutes
  }
  return leg.detailLayovers?.[segmentIndex]
}

export function FlightsSearchFlightDetails({
  flight,
  directionLabel,
}: FlightsSearchFlightDetailsProps) {
  const t = useTranslations("flights")
  const segments = detailSegmentsForLeg(flight)
  const total = segments.length
  const rows: ReactNode[] = []
  for (let index = 0; index < total; index++) {
    if (index > 0) {
      rows.push(
        <FlightsSearchFlightDetailsTransfer
          key={`tsf-${index}`}
          cityName={segments[index - 1]!.arrivalCity}
          layoverMinutes={layoverAfterSegment(flight, index - 1, total)}
        />
      )
    }
    rows.push(
      <FlightsSearchFlightDetailsSegment
        key={`seg-${index}-${segments[index]!.flightNumber}`}
        segment={segments[index]!}
      />
    )
  }
  return (
    <div className="mt-4">
      {directionLabel ? (
        <p className="text-base leading-[22px] font-semibold text-[#111126]">
          {directionLabel === "outbound"
            ? t("searchFlightDetailsLegOutbound")
            : t("searchFlightDetailsLegReturn")}
        </p>
      ) : null}
      <div
        className={
          directionLabel
            ? "bg-c-gray-100 mt-2 rounded-xl p-4"
            : "bg-c-gray-100 rounded-xl p-4"
        }
      >
        <div className="flex flex-col gap-3">{rows}</div>
      </div>
    </div>
  )
}
