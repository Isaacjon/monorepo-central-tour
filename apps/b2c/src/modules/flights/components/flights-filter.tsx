"use client"

import { startOfToday } from "date-fns"
import { useCallback, useMemo, useState } from "react"
import { DateRangePicker, type DateRangePickerProps } from "ui"

import { FlightLocationSelect } from "./flight-location-select"
import { FlightsFilterSearchControl } from "./flights-filter-search-control"
import { FlightsFilterTripTypeControls } from "./flights-filter-trip-type-controls"
import {
  type FlightsFilterCopy,
  getTripTypeOptions,
  type TripType,
} from "./flights-filter.config"
import {
  airportDtosToLocationOptions,
  flightLocationFromUrlFields,
  upgradeLocationFromAirports,
} from "./flights-filter.utils"
import { FlightsPassengersPopover } from "./flights-passengers-popover"
import { useAirportsQuery } from "../services/airports/airports.query"
import type { FlightLocationOption } from "../types/flight-location"
import {
  type FlightPassengersSelection,
  normalizeFlightPassengersSelection,
} from "../types/flight-passengers"
import { buildFlightsSearchHref } from "../utils/build-flights-search-href"
import {
  type ParsedFlightsFilterQuery,
  parseFlightsFilterFromQuery,
  parseLocalDateFromYmd,
} from "../utils/parse-flights-filter-from-query"

type FlightsFilterProps = {
  copy: FlightsFilterCopy
  searchHref: string
  /** Parsed search params; defaults applied when omitted. */
  initialFilter?: ParsedFlightsFilterQuery
}

export function FlightsFilter({
  copy,
  searchHref,
  initialFilter: initialFilterProp,
}: FlightsFilterProps) {
  const initialFilter = initialFilterProp ?? parseFlightsFilterFromQuery({})
  const [tripType, setTripType] = useState<TripType>(initialFilter.tripType)
  const [fromSearchValue, setFromSearchValue] = useState(
    initialFilter.fromQuery
  )
  const [toSearchValue, setToSearchValue] = useState(initialFilter.toQuery)
  const { data: fromAirportDtos } = useAirportsQuery(fromSearchValue)
  const { data: toAirportDtos } = useAirportsQuery(toSearchValue)
  const fromAirportOptions = useMemo(
    () => airportDtosToLocationOptions(fromAirportDtos),
    [fromAirportDtos]
  )
  const toAirportOptions = useMemo(
    () => airportDtosToLocationOptions(toAirportDtos),
    [toAirportDtos]
  )
  const [fromLocation, setFromLocation] = useState<FlightLocationOption | null>(
    () =>
      flightLocationFromUrlFields(initialFilter.fromId, initialFilter.fromLabel)
  )
  const [toLocation, setToLocation] = useState<FlightLocationOption | null>(
    () => flightLocationFromUrlFields(initialFilter.toId, initialFilter.toLabel)
  )
  const effectiveFromLocation = useMemo(
    () =>
      upgradeLocationFromAirports(
        fromLocation,
        initialFilter.fromId,
        fromAirportOptions
      ),
    [fromAirportOptions, fromLocation, initialFilter.fromId]
  )
  const effectiveToLocation = useMemo(
    () =>
      upgradeLocationFromAirports(
        toLocation,
        initialFilter.toId,
        toAirportOptions
      ),
    [initialFilter.toId, toAirportOptions, toLocation]
  )

  const [passengers, setPassengers] = useState<FlightPassengersSelection>(() =>
    normalizeFlightPassengersSelection(initialFilter.passengers)
  )
  const [travelDateRange, setTravelDateRange] = useState<
    DateRangePickerProps["selected"]
  >(() => {
    const from = parseLocalDateFromYmd(initialFilter.departureDateKey)
    const to = parseLocalDateFromYmd(initialFilter.returnDateKey)
    if (!from && !to) {
      return undefined
    }
    return { from, to }
  })

  const tripTypeOptions = getTripTypeOptions(copy)
  const searchHrefWithParams = useMemo(() => {
    return buildFlightsSearchHref({
      searchHref,
      tripType,
      passengers,
      fromSearchValue,
      toSearchValue,
      fromLocation: effectiveFromLocation,
      toLocation: effectiveToLocation,
      departureDate: travelDateRange?.from,
      returnDate: tripType === "round-trip" ? travelDateRange?.to : undefined,
    })
  }, [
    searchHref,
    tripType,
    passengers,
    fromSearchValue,
    toSearchValue,
    effectiveFromLocation,
    effectiveToLocation,
    travelDateRange,
  ])
  const handlePassengersChange = useCallback(
    (value: FlightPassengersSelection) => {
      setPassengers(value)
    },
    []
  )
  const handleTripTypeChange = useCallback((nextTripType: TripType) => {
    setTripType(nextTripType)
    if (nextTripType !== "round-trip") {
      setTravelDateRange((prev) =>
        prev?.from ? { from: prev.from, to: undefined } : prev
      )
    }
  }, [])

  const canSubmitSearch = useMemo(() => {
    const from = travelDateRange?.from
    return Boolean(
      effectiveFromLocation &&
      effectiveToLocation &&
      from &&
      !Number.isNaN(from.getTime())
    )
  }, [effectiveFromLocation, effectiveToLocation, travelDateRange])

  return (
    <div className="flex flex-col gap-3">
      <div className="flex min-w-0 items-stretch gap-3">
        <FlightLocationSelect
          label={copy.fromLabel}
          emptyLabel={copy.toPlaceholder}
          searchPlaceholder={copy.locationSearchPlaceholder}
          emptySearchLabel={copy.noLocationResults}
          airportsGroupLabel={copy.airportsGroupLabel}
          airportOptions={fromAirportOptions}
          searchValue={fromSearchValue}
          onSearchValueChange={setFromSearchValue}
          value={effectiveFromLocation}
          onChange={setFromLocation}
        />
        <FlightLocationSelect
          label={copy.toLabel}
          emptyLabel={copy.toPlaceholder}
          searchPlaceholder={copy.locationSearchPlaceholder}
          emptySearchLabel={copy.noLocationResults}
          airportsGroupLabel={copy.airportsGroupLabel}
          airportOptions={toAirportOptions}
          searchValue={toSearchValue}
          onSearchValueChange={setToSearchValue}
          value={effectiveToLocation}
          onChange={setToLocation}
        />
        <div className="min-w-0 flex-1">
          <DateRangePicker
            selected={travelDateRange}
            onSelect={(range) => setTravelDateRange(range ?? undefined)}
            commitFromWithoutTo={tripType !== "round-trip"}
            disabledDates={{ before: startOfToday() }}
            fromLabel={copy.departureLabel}
            toLabel={copy.returnLabel}
            fromPlaceholder={copy.departurePlaceholder}
            toPlaceholder={copy.returnPlaceholder}
            clearable={false}
          />
        </div>
        <FlightsPassengersPopover
          passengersLabel={copy.passengersLabel}
          initialPassengers={passengers}
          onChange={handlePassengersChange}
        />
        <FlightsFilterSearchControl
          canSubmitSearch={canSubmitSearch}
          searchHrefWithParams={searchHrefWithParams}
          searchLabel={copy.searchLabel}
          searchDisabledHint={copy.searchDisabledHint}
        />
      </div>
      <FlightsFilterTripTypeControls
        complexRouteLabel={copy.complexRouteLabel}
        tripTypeOptions={tripTypeOptions}
        tripType={tripType}
        onChange={handleTripTypeChange}
      />
    </div>
  )
}
export type { FlightsFilterCopy } from "./flights-filter.config"
