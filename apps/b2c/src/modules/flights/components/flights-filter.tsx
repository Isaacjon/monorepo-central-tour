"use client"

import { useState } from "react"
import { BezierCurveIcon, ChevronDownIcon } from "ui"

type TripType = "round-trip" | "one-way" | "no-stops"

type FlightsFilterCopy = {
  fromLabel: string
  fromPlaceholder: string
  toLabel: string
  toPlaceholder: string
  departureLabel: string
  departurePlaceholder: string
  returnLabel: string
  returnPlaceholder: string
  passengersLabel: string
  searchLabel: string
  complexRouteLabel: string
  roundTripLabel: string
  oneWayLabel: string
  noStopsLabel: string
}

type FlightsFilterProps = {
  copy: FlightsFilterCopy
}

export function FlightsFilter({ copy }: FlightsFilterProps) {
  const [tripType, setTripType] = useState<TripType>("round-trip")

  const tripTypeOptions: { id: TripType; label: string }[] = [
    { id: "round-trip", label: copy.roundTripLabel },
    { id: "one-way", label: copy.oneWayLabel },
    { id: "no-stops", label: copy.noStopsLabel },
  ]

  return (
    <div className="flex flex-col gap-3">
      {/* Row 1: search fields */}
      <div className="flex items-stretch gap-3">
        {/* From */}
        <div className="flex min-h-[54px] flex-1 flex-col justify-center rounded-xl border border-[#D0D5DD] bg-white px-3 py-2">
          <span className="text-xs leading-none text-[#667085]">
            {copy.fromLabel}
          </span>
          <span className="mt-1 text-sm leading-tight font-medium text-[#101828]">
            {copy.fromPlaceholder}
          </span>
        </div>

        {/* To */}
        <div className="flex min-h-[54px] flex-1 flex-col justify-center rounded-xl border border-[#D0D5DD] bg-white px-3 py-2">
          <span className="text-xs leading-none text-[#667085]">
            {copy.toLabel}
          </span>
          <span className="mt-1 text-sm leading-none font-medium text-[#98A2B3]">
            {copy.toPlaceholder}
          </span>
        </div>

        {/* Departure date */}
        <div
          className="flex min-h-[54px] flex-col justify-center rounded-xl border border-[#D0D5DD] bg-white px-3 py-2"
          style={{ minWidth: 140 }}
        >
          <span className="text-xs leading-none text-[#667085]">
            {copy.departureLabel}
          </span>
          <span className="mt-1 text-sm leading-none font-medium text-[#101828]">
            {copy.departurePlaceholder}
          </span>
        </div>

        {/* Return date */}
        <div
          className="flex min-h-[54px] flex-col justify-center rounded-xl border border-[#D0D5DD] bg-white px-3 py-2"
          style={{ minWidth: 140 }}
        >
          <span className="text-xs leading-none text-[#667085]">
            {copy.returnLabel}
          </span>
          <span className="mt-1 text-sm leading-none font-medium text-[#101828]">
            {copy.returnPlaceholder}
          </span>
        </div>

        {/* Passengers */}
        <div
          className="flex min-h-[54px] flex-col justify-center rounded-xl border border-[#D0D5DD] bg-white px-3 py-2"
          style={{ minWidth: 160 }}
        >
          <span className="text-xs leading-none text-[#667085]">
            {copy.passengersLabel}
          </span>
          <div className="mt-1 flex items-center justify-between gap-2">
            <span className="text-sm leading-none font-medium text-[#101828]">
              2 пассажира
            </span>
            <ChevronDownIcon
              width={20}
              height={20}
              aria-hidden
              className="text-c-gray-950 shrink-0"
            />
          </div>
        </div>

        {/* Search button */}
        <button
          type="button"
          className="bg-primary hover:bg-primary/90 flex min-h-[54px] items-center justify-center rounded-xl px-8 text-base font-semibold text-white transition-colors"
          style={{ minWidth: 120 }}
        >
          {copy.searchLabel}
        </button>
      </div>

      {/* Row 2: trip type */}
      <div className="flex items-center gap-4">
        {/* Complex route */}
        <button
          type="button"
          className="inline-flex items-center gap-2 text-base leading-4 font-normal text-[#101828]"
        >
          <BezierCurveIcon
            width={24}
            height={24}
            aria-hidden
            className="shrink-0"
          />
          {copy.complexRouteLabel}
        </button>

        {/* Radio buttons */}
        {tripTypeOptions.map((option) => (
          <label
            key={option.id}
            className="inline-flex cursor-pointer items-center gap-2 text-base leading-4 font-normal text-[#101828]"
          >
            <span
              className="relative flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors"
              style={{
                borderColor:
                  tripType === option.id ? "var(--color-primary)" : "#D0D5DD",
              }}
            >
              {tripType === option.id && (
                <span className="bg-primary h-2.5 w-2.5 rounded-full" />
              )}
            </span>
            <input
              type="radio"
              name="trip-type"
              value={option.id}
              checked={tripType === option.id}
              onChange={() => setTripType(option.id)}
              className="sr-only"
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  )
}

export type { FlightsFilterCopy }
