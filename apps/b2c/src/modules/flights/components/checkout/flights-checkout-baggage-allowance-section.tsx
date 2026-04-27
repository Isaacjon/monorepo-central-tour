import Image from "next/image"
import {
  ChevronDownIcon,
  pinkBagImage,
  pinkCarryOnBaggageImage,
  pinkLuggageImage,
} from "ui"

import type { FlightsCheckoutContentCopy } from "../../types/flights-checkout-content-copy"
import { FlightsAirlineLogo } from "../shared/flights-airline-logo"

type FlightsCheckoutBaggageAllowanceSectionProps = {
  copy: FlightsCheckoutContentCopy
}

const baggageTypeItems = [
  { image: pinkBagImage, labelKey: "baggagePersonalItemLabel" as const },
  { image: pinkCarryOnBaggageImage, labelKey: "baggageCarryOnLabel" as const },
  { image: pinkLuggageImage, labelKey: "baggageCheckedLabel" as const },
]

const tripItems = [
  {
    direction: "outbound" as const,
    airport: "TAS Международный Аэропорт имени Ислама Каримова T2",
    flightNumber: "HY423",
    airlineIataCode: "HY",
  },
  {
    direction: "inbound" as const,
    airport: "DEL Международный аэропорт Индиры Ганди T3",
    flightNumber: "TK111",
    airlineIataCode: "TK",
  },
]

export function FlightsCheckoutBaggageAllowanceSection({
  copy,
}: FlightsCheckoutBaggageAllowanceSectionProps) {
  return (
    <section className="overflow-hidden rounded-3xl border border-[#EAECF0] bg-white shadow-[0px_12px_100px_0px_rgba(0,0,0,0.04)]">
      <header className="border-b border-[#EAECF0] px-4 py-5 md:px-6">
        <h2 className="text-[20px] leading-5 font-bold text-[#0C111D]">
          {copy.baggageAllowanceTitle}
        </h2>
      </header>

      <div className="border-b border-[#EAECF0] bg-[#FCFCFD] p-4">
        <div className="flex flex-col items-end gap-4 sm:flex-row sm:justify-end">
          {baggageTypeItems.map((item) => (
            <article
              key={item.labelKey}
              className="flex h-[127px] w-[172px] shrink-0 flex-col items-center justify-start gap-3 text-center"
            >
              <Image
                src={item.image}
                alt={copy[item.labelKey]}
                width={56}
                height={56}
              />
              <div className="flex flex-col items-center gap-1">
                <p className="text-center text-[14px] leading-5 font-semibold text-[#0C111D]">
                  {copy[item.labelKey]}
                </p>
                <p className="text-center text-[12px] leading-3 font-normal text-[#475467]">
                  {copy.baggageDimensions}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="divide-y divide-[#EAECF0]">
        {tripItems.map((trip) => (
          <article key={trip.direction} className="px-4 py-4 md:px-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-xl bg-[#FDEEEE] px-3 py-2 text-[16px] leading-4 font-medium text-[#415AF8]">
                {trip.direction === "outbound"
                  ? copy.baggageOutboundLabel
                  : copy.baggageInboundLabel}
              </span>
              <FlightsAirlineLogo
                flightNumber={trip.flightNumber}
                airlineIataCode={trip.airlineIataCode}
              />
              <p className="text-[16px] leading-6 font-bold text-[#0C111D]">
                {trip.airport}
              </p>
            </div>

            <div className="mt-3 grid grid-cols-[minmax(140px,1.2fr)_repeat(3,minmax(90px,1fr))_minmax(140px,1fr)] items-start gap-3 text-[#0C111D]">
              <p className="text-[16px] leading-6 font-medium">
                Даулетмуратов Ахмет
              </p>
              <p className="text-center text-[16px] leading-6 font-normal text-[#475467]">
                1 × 3кг
              </p>
              <p className="text-center text-[16px] leading-6 font-normal text-[#475467]">
                1 × 8кг
              </p>
              <p className="text-center text-[16px] leading-6 font-normal text-[#475467]">
                1 × 23кг
              </p>
              <button
                type="button"
                className="ml-auto inline-flex items-center justify-between gap-2 rounded-2xl border border-[#EAECF0] px-4 py-3 text-[16px] leading-6 font-medium text-[#0C111D]"
              >
                {copy.baggageSelectOption}
                <ChevronDownIcon
                  className="size-5 text-[#667085]"
                  aria-hidden
                />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-[minmax(140px,1.2fr)_repeat(3,minmax(90px,1fr))_minmax(140px,1fr)] gap-3">
              <span />
              <p className="text-center text-[16px] leading-6 font-normal text-[#667085]">
                {copy.baggageIncluded}
              </p>
              <p className="text-center text-[16px] leading-6 font-normal text-[#667085]">
                {copy.baggageIncluded}
              </p>
              <span />
              <span />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
