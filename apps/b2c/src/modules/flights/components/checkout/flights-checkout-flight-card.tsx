"use client"

import { ChevronDownIcon, ChevronUpIcon, PencilLineIcon } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { ArrowRightIcon } from "ui"

import { checkoutDirection } from "./flights-checkout-flight-card.mock"
import { FlightsSearchFlightDetails } from "../search/flights-search-flight-details"
import { FlightsAirlineLogo } from "../shared/flights-airline-logo"

type FlightsCheckoutFlightCardProps = {
  lang: string
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
            flightNumber={
              checkoutDirection.segments[0]?.flightNumber ?? "HY423"
            }
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
