"use client"

import { useTranslations } from "next-intl"
import type { ReactNode } from "react"

import { FlightsSearchFlightDetailsSegment } from "./flights-search-flight-details-segment"
import { FlightsSearchFlightDetailsTransfer } from "./flights-search-flight-details-transfer"
import type { FlightOfferDirectionApi } from "../types/flight-offers-search-api"

export type FlightsSearchFlightDetailsDirectionLabel = "outbound" | "return"

type FlightsSearchFlightDetailsProps = {
  direction: FlightOfferDirectionApi
  /** Shown for round-trip non-stop: outbound vs return, localized (e.g. «Туда» / «Обратно»). */
  directionLabel?: FlightsSearchFlightDetailsDirectionLabel
}

export function FlightsSearchFlightDetails({
  direction,
  directionLabel,
}: FlightsSearchFlightDetailsProps) {
  const t = useTranslations("flights")
  const segments = direction.segments
  const total = segments.length
  const rows: ReactNode[] = []
  for (let index = 0; index < total; index++) {
    const seg = segments[index]
    if (!seg) continue
    if (index > 0) {
      const prev = segments[index - 1]
      const layover = prev?.transferDurationMinutes ?? undefined
      rows.push(
        <FlightsSearchFlightDetailsTransfer
          key={`tsf-${index}`}
          cityName={prev?.arrival.cityName ?? ""}
          layoverMinutes={layover}
        />
      )
    }
    rows.push(
      <FlightsSearchFlightDetailsSegment
        key={`seg-${index}-${seg.flightNumber}`}
        segment={seg}
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
