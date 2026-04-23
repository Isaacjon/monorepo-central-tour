"use client"

import { useTranslations } from "next-intl"
import { LuggageIcon } from "ui"

import type { FlightSearchLeg } from "../types/flight-search-result"

type FlightsSearchFlightCardTimelineProps = {
  rowFlight: FlightSearchLeg
}

function cityWithCode(city: string, code: string) {
  return `${city} (${code})`
}

export function FlightsSearchFlightCardTimeline({
  rowFlight,
}: FlightsSearchFlightCardTimelineProps) {
  const t = useTranslations("flights")
  const transferSummary =
    !rowFlight.isDirect && rowFlight.transferAirportCode

  return (
    <div className="flex min-w-0 items-center gap-2 sm:gap-6">
      <p className="text-center text-[18px] leading-6 font-bold text-[#0C111D]">
        {rowFlight.departureTime}
      </p>

      <div className="max-w-[545px] min-w-0 flex-1">
        <p className="text-center text-[13px] leading-6 font-medium text-[#0C111D]">
          {t("searchFlightInFlight", { duration: rowFlight.duration })}
        </p>
        <div className="mt-1 flex w-full min-w-0 items-center">
          <span
            className="size-[13px] shrink-0 rounded-full border-4 border-[#DDE1E4] bg-white"
            aria-hidden
          />
          <div className="mx-0 flex min-w-0 flex-1 items-center">
            <span
              className="h-px min-w-0 flex-1 bg-[#DDE1E4]"
              aria-hidden
            />
            {transferSummary ? (
              <span
                className="size-2 shrink-0 rounded-full bg-[#A0A9B6]"
                aria-hidden
              />
            ) : null}
            <span
              className="h-px min-w-0 flex-1 bg-[#DDE1E4]"
              aria-hidden
            />
          </div>
          <span
            className="size-[13px] shrink-0 rounded-full border-4 border-[#DDE1E4] bg-white"
            aria-hidden
          />
        </div>
        <div className="mt-1 grid min-w-0 grid-cols-3 gap-1 text-[15px] leading-[22px]">
          <p className="min-w-0 truncate text-left font-normal text-[#0C111D]">
            {cityWithCode(rowFlight.departureCity, rowFlight.departureCode)}
          </p>
          <p className="text-c-gray-400 min-w-0 truncate text-center font-normal">
            {rowFlight.isDirect ? (
              t("searchFlightTimelineTagDirect")
            ) : transferSummary ? (
              <>
                {rowFlight.transferAirportCode}
                {rowFlight.transferLayoverMinutes != null ? (
                  <>
                    {" "}
                    <span className="font-medium text-[#EE7748]">
                      {t("searchFlightTransferLayoverShort", {
                        minutes: rowFlight.transferLayoverMinutes,
                      })}
                    </span>
                  </>
                ) : null}
              </>
            ) : (
              t("searchFlightTimelineTagComplex")
            )}
          </p>
          <p className="min-w-0 truncate text-right font-normal text-[#0C111D]">
            {cityWithCode(rowFlight.arrivalCity, rowFlight.arrivalCode)}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <p className="text-center text-[18px] leading-6 font-bold text-[#0C111D]">
          {rowFlight.arrivalTime}
        </p>
      </div>

      <div className="text-c-gray-400 ml-auto flex items-center gap-1">
        <LuggageIcon
          className="size-5 shrink-0"
          width={20}
          height={20}
          aria-hidden
        />
        <span className="text-[14px] leading-none font-medium">
          {rowFlight.baggage}
        </span>
      </div>
    </div>
  )
}
