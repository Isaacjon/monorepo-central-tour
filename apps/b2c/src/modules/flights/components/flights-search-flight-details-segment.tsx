"use client"

import { useTranslations } from "next-intl"
import { ArriveIcon, DepartureIcon } from "ui"

import { FlightsAirlineLogo } from "./flights-airline-logo"
import type { FlightSearchDetailSegment } from "../types/flight-search-result"

type FlightsSearchFlightDetailsSegmentProps = {
  segment: FlightSearchDetailSegment
}

function cityWithCode(city: string, code: string) {
  return `${city} (${code})`
}

/** Treats common API “empty” sentinels as missing (localized Н/Д / N/A). */
function formatOptionalDetailValue(
  value: string | undefined,
  notAvailable: string
): string {
  if (value == null) return notAvailable
  const v = value.trim()
  if (v === "" || v === "-" || v === "—" || v === "–") return notAvailable
  return v
}

export function FlightsSearchFlightDetailsSegment({
  segment,
}: FlightsSearchFlightDetailsSegmentProps) {
  const t = useTranslations("flights")
  const valueNotAvailable = t("searchFlightValueNotAvailable")
  return (
    <div className="flex flex-col gap-4 md:grid md:max-w-5/6 md:grid-cols-[1.35fr_0.75fr_1.15fr]">
      <div className="flex flex-col gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <FlightsAirlineLogo
            flightNumber={segment.flightNumber}
            airlineIataCode={segment.airlineIataCode}
          />
          <p className="truncate text-[14px] leading-6 font-bold text-[#0C111D]">
            {segment.airlineName}
          </p>
          <p className="ml-auto truncate text-[13px] leading-[18px] font-normal text-[#0C111D]">
            {segment.flightNumber}
          </p>
        </div>
        <div className="mt-2 flex min-w-0 items-stretch gap-4">
          <div className="text-c-gray-500 flex shrink-0 flex-col items-center">
            <DepartureIcon
              className="size-5 shrink-0"
              width={20}
              height={20}
              aria-hidden
            />
            <span
              className="my-1 flex-1 border-l border-dashed border-[#98A2B3]"
              aria-hidden
            />
            <ArriveIcon
              className="size-5 shrink-0"
              width={20}
              height={20}
              aria-hidden
            />
          </div>
          <div className="min-w-0 flex-1 space-y-4">
            <div className="flex min-w-0 items-center gap-2 text-[#0C111D]">
              <span className="text-[16px] leading-[22px] font-medium text-[#0C111D]">
                {segment.departureTime}
              </span>
              <span className="truncate text-[15px] leading-[22px] font-normal text-[#000000]">
                {cityWithCode(segment.departureCity, segment.departureCode)}
              </span>
              <span className="ml-auto text-right text-[15px] leading-[22px] font-normal text-[#0C111D]">
                {segment.departureDateLabel}
              </span>
            </div>
            <p className="text-[13px] leading-[18px] font-normal text-[#0C111D]">
              {segment.duration}
            </p>
            <div className="flex min-w-0 items-center gap-2 text-[#0C111D]">
              <span className="text-[16px] leading-[22px] font-medium text-[#0C111D]">
                {segment.arrivalTime}
              </span>
              <span className="truncate text-[15px] leading-[22px] font-normal text-[#000000]">
                {cityWithCode(segment.arrivalCity, segment.arrivalCode)}
              </span>
              <span className="ml-auto text-right text-[15px] leading-[22px] font-normal text-[#0C111D]">
                {segment.arrivalDateLabel}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto w-px bg-gray-200" />
      <div className="flex flex-col gap-1.5">
        <p className="text-[15px] leading-[22px] font-normal text-[#667085]">
          {t("searchFlightBaggageLabel")}:{" "}
          <span className="font-medium text-[#0C111D]">
            {formatOptionalDetailValue(segment.baggageWeight, valueNotAvailable)}
          </span>
        </p>
        <p className="mt-1.5 text-[15px] leading-[22px] font-normal text-[#667085]">
          {t("searchFlightAirlineLabel")}:{" "}
          <span className="font-medium text-[#0C111D]">
            {segment.operatingAirlineName ?? segment.airlineName}
          </span>
        </p>
        <p className="mt-1.5 text-[15px] leading-[22px] font-normal text-[#667085]">
          {t("searchFlightTerminalLabel")}:{" "}
          <span className="font-medium text-[#0C111D]">
            {formatOptionalDetailValue(segment.terminal, valueNotAvailable)}
          </span>
        </p>
        <p className="mt-1.5 text-[15px] leading-[22px] font-normal text-[#667085]">
          {t("searchFlightClassLabel")}:{" "}
          <span className="font-medium text-[#0C111D]">
            {formatOptionalDetailValue(segment.bookingClass, valueNotAvailable)}
          </span>
        </p>
      </div>
    </div>
  )
}
