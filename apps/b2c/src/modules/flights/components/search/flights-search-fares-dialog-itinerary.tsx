"use client"

import { ShieldCheckIcon } from "lucide-react"

import { getAirportLabel } from "./flights-search-fares-dialog.utils"
import type { FlightOfferSegmentApi } from "../../types/flight-offers-search-api-segment"
import { formatRouteDurationMinutes } from "../../utils/flight-offer-ui-format"
import { FlightsAirlineLogo } from "../shared/flights-airline-logo"

type FlightsSearchFaresDialogItineraryProps = {
  firstSegment: FlightOfferSegmentApi | undefined
  secondSegment: FlightOfferSegmentApi | undefined
  lastSegment: FlightOfferSegmentApi | undefined
  connectionSegment: FlightOfferSegmentApi | undefined
}

export function FlightsSearchFaresDialogItinerary({
  firstSegment,
  secondSegment,
  lastSegment,
  connectionSegment,
}: FlightsSearchFaresDialogItineraryProps) {
  return (
    <section className="mt-5 grid gap-6 md:grid-cols-[110px_1fr]">
      <div className="grid grid-cols-[auto_14px] items-stretch gap-6">
        <div className="flex flex-col items-center justify-between py-1">
          <span className="text-[30px] leading-7 font-semibold text-[#111126]">
            {firstSegment?.departure.time ?? "12:45"}
          </span>
          <span className="my-4">
            <FlightsAirlineLogo
              flightNumber={
                secondSegment?.flightNumber ?? firstSegment?.flightNumber ?? ""
              }
              airlineIataCode={secondSegment?.marketingCarrier.code}
            />
          </span>
          <span className="text-[30px] leading-7 font-semibold text-[#111126]">
            {secondSegment?.departure.time ??
              firstSegment?.arrival.time ??
              "12:45"}
          </span>
        </div>

        <div className="flex flex-col items-center py-1" aria-hidden>
          <span className="min-h-0 flex-1 border-l border-[#98A2B3]" />
          <span className="min-h-0 flex-2 border-l border-dashed border-[#98A2B3]" />
          <span className="min-h-0 flex-1 border-l border-[#98A2B3]" />
        </div>
      </div>

      <div className="flex flex-col justify-between">
        <p className="text-[32px] leading-8 font-semibold text-[#111126]">
          {getAirportLabel(
            firstSegment?.departure.airportName,
            firstSegment?.departure.airportCode,
            firstSegment?.departure.terminal
          )}
        </p>
        <div>
          <p className="mt-2 text-[16px] leading-6 text-[#344054]">
            {firstSegment?.marketingCarrier.name ?? "Uzbekistan Airways"}{" "}
            {firstSegment?.flightNumber ?? ""}
          </p>
          <p className="mt-1 text-[16px] leading-6 text-[#344054]">
            Продолжительность перелета:{" "}
            {formatRouteDurationMinutes(firstSegment?.durationMinutes ?? 170)}
          </p>
        </div>

        <p className="text-[32px] leading-8 font-semibold text-[#111126]">
          {getAirportLabel(
            lastSegment?.arrival.airportName,
            lastSegment?.arrival.airportCode,
            lastSegment?.arrival.terminal
          )}
        </p>

        {connectionSegment ? (
          <div className="max-w-[540px] rounded-xl border border-[#D0D5DD] bg-[#F9FAFB] px-4 py-3">
            <p className="text-[15px] leading-6 text-[#667085]">
              Самостоятельная стыковка в г. {connectionSegment.arrival.cityName}{" "}
              {connectionSegment.transferDurationMinutes
                ? formatRouteDurationMinutes(
                    connectionSegment.transferDurationMinutes
                  )
                : ""}
            </p>
            <div className="mt-2 flex items-center gap-2 text-[#079455]">
              <ShieldCheckIcon className="size-4" aria-hidden />
              <span className="text-sm leading-6">
                Гарантия безопасной поездки
              </span>
            </div>
          </div>
        ) : null}

        {secondSegment ? (
          <>
            <p className="text-[32px] leading-8 font-semibold text-[#111126]">
              {getAirportLabel(
                secondSegment.departure.airportName,
                secondSegment.departure.airportCode,
                secondSegment.departure.terminal
              )}
            </p>
            <p className="mt-2 flex items-center gap-2 text-[16px] leading-6 text-[#344054]">
              <FlightsAirlineLogo
                flightNumber={secondSegment.flightNumber}
                airlineIataCode={secondSegment.marketingCarrier.code}
              />
              <span>
                {secondSegment.marketingCarrier.name}{" "}
                {secondSegment.flightNumber}
              </span>
            </p>
            <p className="mt-1 text-[16px] leading-6 text-[#344054]">
              Продолжительность перелета:{" "}
              {formatRouteDurationMinutes(secondSegment.durationMinutes)}
            </p>
            <p className="text-[32px] leading-8 font-semibold text-[#111126]">
              {getAirportLabel(
                secondSegment.arrival.airportName,
                secondSegment.arrival.airportCode,
                secondSegment.arrival.terminal
              )}
            </p>
          </>
        ) : null}
      </div>
    </section>
  )
}
