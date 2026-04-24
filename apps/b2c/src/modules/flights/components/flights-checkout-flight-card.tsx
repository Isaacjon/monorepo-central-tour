"use client"

import { ChevronDownIcon, ChevronUpIcon, PencilLineIcon } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { ArrowRightIcon } from "ui"

import { FlightsAirlineLogo } from "./flights-airline-logo"
import { FlightsSearchFlightDetails } from "./flights-search-flight-details"
import type {
  FlightMiniRulesApi,
  FlightOfferDirectionApi,
  FlightOfferSegmentApi,
} from "../types/flight-offers-search-api"

type FlightsCheckoutFlightCardProps = {
  lang: string
}

const defaultMiniRules: FlightMiniRulesApi = {
  accessories: {
    comment: "",
    dimensions: null,
    is_available: false,
    piece: null,
    status: null,
    weight: null,
  },
  baggage: {
    comment: "",
    dimensions: null,
    is_available: true,
    piece: 1,
    status: null,
    weight: { unit: "kg", value: 23 },
  },
  carry_on_baggage: {
    comment: "",
    dimensions: null,
    is_available: true,
    piece: 1,
    status: null,
    weight: { unit: "kg", value: 8 },
  },
  exchange: {
    before_departure: {
      comment: "",
      is_available: true,
      is_free: false,
      is_mini_rules_exist: true,
      status: "available",
    },
  },
  refund: {
    before_departure: {
      comment: "",
      is_available: false,
      is_free: false,
      is_mini_rules_exist: true,
      status: "restricted",
    },
  },
}

function createSegment(
  partial: Pick<
    FlightOfferSegmentApi,
    | "segmentIndex"
    | "flightNumber"
    | "durationMinutes"
    | "routeDurationMinutes"
    | "transferDurationMinutes"
    | "marketingCarrier"
    | "carrier"
    | "departure"
    | "arrival"
  >
): FlightOfferSegmentApi {
  return {
    aircraft: { code: "320", name: "Airbus A320" },
    baggage: { piece: 1, unit: "kg", weight: 23 },
    baggageRecheck: false,
    brandNames: [],
    cabinClass: { bookingClass: "Y", serviceClass: "Эконом" },
    carryOnBaggage: { piece: 1, unit: "kg", weight: 8 },
    directionIndex: 0,
    isBaggageIncluded: true,
    isChangeable: true,
    isRefundable: false,
    miniRules: defaultMiniRules,
    seats: 9,
    technicalStops: [],
    validatingCarrier: partial.marketingCarrier,
    ...partial,
  }
}

const checkoutDirection: FlightOfferDirectionApi = {
  directionIndex: 0,
  miniRules: defaultMiniRules,
  segments: [
    createSegment({
      segmentIndex: 0,
      flightNumber: "HY423",
      durationMinutes: 170,
      routeDurationMinutes: 555,
      transferDurationMinutes: 220,
      marketingCarrier: { code: "HY", name: "Узбекские авиалинии" },
      carrier: { code: "HY", name: "Узбекские авиалинии" },
      departure: {
        airportCode: "TAS",
        airportName: "TAS Международный Аэропорт имени Ислама Каримова T2",
        cityCode: "NYC",
        cityName: "Нью-Йорк",
        countryCode: "US",
        countryName: "США",
        date: "Пн, Март 2",
        terminal: "T2",
        time: "12:45",
        timestamp: 0,
      },
      arrival: {
        airportCode: "DEL",
        airportName: "DEL Международный аэропорт Индиры Ганди T3",
        cityCode: "DEL",
        cityName: "Нью-Дели",
        countryCode: "IN",
        countryName: "Индия",
        date: "Пн, Март 2",
        terminal: "T3",
        time: "15:35",
        timestamp: 0,
      },
    }),
    createSegment({
      segmentIndex: 1,
      flightNumber: "6E1081",
      durationMinutes: 265,
      routeDurationMinutes: 555,
      transferDurationMinutes: null,
      marketingCarrier: { code: "TK", name: "IndiGo" },
      carrier: { code: "TK", name: "IndiGo" },
      departure: {
        airportCode: "DEL",
        airportName: "DEL Международный аэропорт Индиры Ганди T3",
        cityCode: "DEL",
        cityName: "Нью-Дели",
        countryCode: "IN",
        countryName: "Индия",
        date: "Пн, Март 2",
        terminal: "T3",
        time: "19:15",
        timestamp: 0,
      },
      arrival: {
        airportCode: "HKT",
        airportName: "HKT Международный аэропорт Пхукета I",
        cityCode: "MIA",
        cityName: "Майами",
        countryCode: "US",
        countryName: "США",
        date: "Ср, Март 4",
        terminal: "I",
        time: "21:05",
        timestamp: 0,
      },
    }),
  ],
}

export function FlightsCheckoutFlightCard({
  lang,
}: FlightsCheckoutFlightCardProps) {
  const [detailsOpen, setDetailsOpen] = useState(true)

  return (
    <section className="rounded-3xl bg-white p-8 shadow-[0px_12px_100px_0px_rgba(0,0,0,0.04)]">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-[42px] leading-none font-bold text-[#101828]">
          Поездка в г. Пхукет
        </h1>
        <Link
          href={`/${lang}/flights/search`}
          className="inline-flex items-center gap-2 rounded-lg bg-[#F5F3FF] px-3 py-2 text-sm font-medium text-[#6941C6]"
        >
          Изменить рейс
          <PencilLineIcon className="size-4" aria-hidden />
        </Link>
      </div>

      <article className="mt-7 rounded-2xl border border-[#EAECF0] p-6">
        <div className="flex items-start gap-4">
          <FlightsAirlineLogo
            flightNumber={checkoutDirection.segments[0]?.flightNumber ?? "HY423"}
            airlineIataCode={
              checkoutDirection.segments[0]?.marketingCarrier.code ?? "HY"
            }
          />

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <p className="text-[20px] leading-5 font-bold text-[#0C111D]">
                Нью-Йорк
              </p>
              <ArrowRightIcon
                className="size-4 -rotate-90 text-[#344054]"
                aria-hidden
              />
              <p className="text-[20px] leading-5 font-bold text-[#0C111D]">
                Майами
              </p>
              <p className="text-[16px] leading-4 font-medium text-[#344054]">
                Пн, Март 2 - Ср, Март 4
              </p>
              <p className="text-[14px] leading-4 font-medium text-[#667085]">
                08:10 - 21:05 (1 остановка)
              </p>
            </div>

            {detailsOpen ? (
              <div className="mt-5">
                <FlightsSearchFlightDetails direction={checkoutDirection} />
              </div>
            ) : null}
          </div>

          <button
            type="button"
            onClick={() => setDetailsOpen((prev) => !prev)}
            aria-expanded={detailsOpen}
            aria-label="Toggle flight details"
            className="inline-flex size-6 shrink-0 items-center justify-center rounded-full text-[#475467] hover:bg-[#F2F4F7]"
          >
            {detailsOpen ? (
              <ChevronUpIcon className="size-4" aria-hidden />
            ) : (
              <ChevronDownIcon className="size-4" aria-hidden />
            )}
          </button>
        </div>
      </article>
    </section>
  )
}
