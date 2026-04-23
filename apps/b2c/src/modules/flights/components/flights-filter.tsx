"use client"

import Link from "next/link"
import { useCallback, useMemo, useState } from "react"
import {
  BezierCurveIcon,
  DateRangePicker,
  type DateRangePickerProps,
  FlightAirplaneIcon,
} from "ui"

import { FlightLocationSelect } from "./flight-location-select"
import {
  type FlightsFilterCopy,
  getTripTypeOptions,
  type TripType,
} from "./flights-filter.config"
import { FlightsPassengersPopover } from "./flights-passengers-popover"
import {
  cloneRooms,
  defaultFirstRoom,
  type FlightRoomGuests,
} from "./flights-passengers-popover/flight-room-guests"
import { useAirportsQuery } from "../services/airports/airports.query"
import type { FlightLocationOption } from "../types/flight-location"
import { buildFlightsSearchHref } from "../utils/build-flights-search-href"
type FlightsFilterProps = {
  copy: FlightsFilterCopy
  searchHref: string
}
export function FlightsFilter({ copy, searchHref }: FlightsFilterProps) {
  const [tripType, setTripType] = useState<TripType>("round-trip")
  const { data: airportDtos } = useAirportsQuery()
  const airportOptions = useMemo((): FlightLocationOption[] => {
    if (!airportDtos?.length) {
      return []
    }
    return airportDtos.map((airport) => ({
      id: airport.id,
      label: airport.label,
      icon: (
        <FlightAirplaneIcon
          width={24}
          height={24}
          aria-hidden
          className="size-6 shrink-0 rounded-[3px] text-[#101828]"
        />
      ),
    }))
  }, [airportDtos])
  const [fromLocation, setFromLocation] = useState<FlightLocationOption | null>(
    null
  )
  const [toLocation, setToLocation] = useState<FlightLocationOption | null>(
    null
  )
  const [fromSearchValue, setFromSearchValue] = useState("")
  const [toSearchValue, setToSearchValue] = useState("")
  const [passengerRooms, setPassengerRooms] = useState<FlightRoomGuests[]>(() =>
    cloneRooms([defaultFirstRoom()])
  )
  const [travelDateRange, setTravelDateRange] =
    useState<DateRangePickerProps["selected"]>(undefined)
  const tripTypeOptions = getTripTypeOptions(copy)
  const searchHrefWithParams = useMemo(() => {
    return buildFlightsSearchHref({
      searchHref,
      tripType,
      passengerRooms,
      fromSearchValue,
      toSearchValue,
      fromLocation,
      toLocation,
      departureDate: travelDateRange?.from,
      returnDate: travelDateRange?.to,
    })
  }, [
    searchHref,
    tripType,
    passengerRooms,
    fromSearchValue,
    toSearchValue,
    fromLocation,
    toLocation,
    travelDateRange,
  ])
  const handlePassengersChange = useCallback(
    ({ rooms }: { rooms: FlightRoomGuests[]; totalGuests: number }) => {
      setPassengerRooms(rooms)
    },
    []
  )
  return (
    <div className="flex flex-col gap-3">
      <div className="flex min-w-0 items-stretch gap-3">
        <FlightLocationSelect
          label={copy.fromLabel}
          emptyLabel={copy.toPlaceholder}
          searchPlaceholder={copy.locationSearchPlaceholder}
          emptySearchLabel={copy.noLocationResults}
          airportsGroupLabel={copy.airportsGroupLabel}
          airportOptions={airportOptions}
          searchValue={fromSearchValue}
          onSearchValueChange={setFromSearchValue}
          value={fromLocation}
          onChange={setFromLocation}
        />
        <FlightLocationSelect
          label={copy.toLabel}
          emptyLabel={copy.toPlaceholder}
          searchPlaceholder={copy.locationSearchPlaceholder}
          emptySearchLabel={copy.noLocationResults}
          airportsGroupLabel={copy.airportsGroupLabel}
          airportOptions={airportOptions}
          searchValue={toSearchValue}
          onSearchValueChange={setToSearchValue}
          value={toLocation}
          onChange={setToLocation}
        />
        <div className="min-w-0 flex-1">
          <DateRangePicker
            selected={travelDateRange}
            onSelect={(range) => setTravelDateRange(range ?? undefined)}
            fromLabel={copy.departureLabel}
            toLabel={copy.returnLabel}
            fromPlaceholder={copy.departurePlaceholder}
            toPlaceholder={copy.returnPlaceholder}
            clearable={false}
          />
        </div>
        <FlightsPassengersPopover
          passengersLabel={copy.passengersLabel}
          onChange={handlePassengersChange}
        />
        <Link
          href={searchHrefWithParams}
          className="bg-primary hover:bg-primary/90 flex min-h-[54px] min-w-[120px] shrink-0 items-center justify-center rounded-xl px-8 text-base font-semibold text-white transition-colors"
        >
          {copy.searchLabel}
        </Link>
      </div>
      <div className="flex items-center gap-4">
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
export type { FlightsFilterCopy } from "./flights-filter.config"
