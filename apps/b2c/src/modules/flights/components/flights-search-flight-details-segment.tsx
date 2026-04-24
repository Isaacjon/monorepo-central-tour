"use client"

import { useTranslations } from "next-intl"
import { ArriveIcon, DepartureIcon } from "ui"

import { FlightsAirlineLogo } from "./flights-airline-logo"
import type { FlightOfferSegmentApi } from "../types/flight-offers-search-api-segment"
import {
  formatCheckedBaggageWeight,
  formatRouteDurationMinutes,
} from "../utils/flight-offer-ui-format"

type FlightsSearchFlightDetailsSegmentProps = {
  segment: FlightOfferSegmentApi
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
  const { departure, arrival, marketingCarrier, carrier, cabinClass } = segment
  const bookingClassDisplay =
    cabinClass.bookingClass + (segment.seats > 0 ? `(${segment.seats})` : "")
  const durationLabel = formatRouteDurationMinutes(segment.durationMinutes)
  const baggageWeightDisplay = formatCheckedBaggageWeight(segment.baggage)
  const operatingName =
    carrier.code !== marketingCarrier.code
      ? carrier.name
      : marketingCarrier.name
  const terminalDisplay =
    departure.terminal != null && departure.terminal !== ""
      ? departure.terminal
      : undefined

  return (
    <div className="flex flex-col gap-4 md:grid md:max-w-5/6 md:grid-cols-[1.35fr_0.75fr_1.15fr]">
      <div className="flex flex-col gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <FlightsAirlineLogo
            flightNumber={segment.flightNumber}
            airlineIataCode={marketingCarrier.code}
          />
          <p className="truncate text-[14px] leading-6 font-bold text-[#0C111D]">
            {marketingCarrier.name}
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
                {departure.time}
              </span>
              <span className="truncate text-[15px] leading-[22px] font-normal text-[#000000]">
                {cityWithCode(departure.cityName, departure.airportCode)}
              </span>
              <span className="ml-auto text-right text-[15px] leading-[22px] font-normal text-[#0C111D]">
                {departure.date}
              </span>
            </div>
            <p className="text-[13px] leading-[18px] font-normal text-[#0C111D]">
              {durationLabel}
            </p>
            <div className="flex min-w-0 items-center gap-2 text-[#0C111D]">
              <span className="text-[16px] leading-[22px] font-medium text-[#0C111D]">
                {arrival.time}
              </span>
              <span className="truncate text-[15px] leading-[22px] font-normal text-[#000000]">
                {cityWithCode(arrival.cityName, arrival.airportCode)}
              </span>
              <span className="ml-auto text-right text-[15px] leading-[22px] font-normal text-[#0C111D]">
                {arrival.date}
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
            {formatOptionalDetailValue(baggageWeightDisplay, valueNotAvailable)}
          </span>
        </p>
        <p className="mt-1.5 text-[15px] leading-[22px] font-normal text-[#667085]">
          {t("searchFlightAirlineLabel")}:{" "}
          <span className="font-medium text-[#0C111D]">{operatingName}</span>
        </p>
        <p className="mt-1.5 text-[15px] leading-[22px] font-normal text-[#667085]">
          {t("searchFlightTerminalLabel")}:{" "}
          <span className="font-medium text-[#0C111D]">
            {formatOptionalDetailValue(terminalDisplay, valueNotAvailable)}
          </span>
        </p>
        <p className="mt-1.5 text-[15px] leading-[22px] font-normal text-[#667085]">
          {t("searchFlightClassLabel")}:{" "}
          <span className="font-medium text-[#0C111D]">
            {formatOptionalDetailValue(bookingClassDisplay, valueNotAvailable)}
          </span>
        </p>
      </div>
    </div>
  )
}
