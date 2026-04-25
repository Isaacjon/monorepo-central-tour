"use client"

import type { FlightLocationOption } from "../../types/flight-location"
import { FlightLocationSelect } from "../passengers/flight-location-select"

type FlightsFilterLocationFieldsProps = {
  fromLabel: string
  toLabel: string
  toPlaceholder: string
  locationSearchPlaceholder: string
  noLocationResults: string
  airportsGroupLabel: string
  fromAirportOptions: FlightLocationOption[]
  toAirportOptions: FlightLocationOption[]
  fromSearchValue: string
  toSearchValue: string
  onFromSearchValueChange: (value: string) => void
  onToSearchValueChange: (value: string) => void
  fromLocation: FlightLocationOption | null
  toLocation: FlightLocationOption | null
  onFromLocationChange: (value: FlightLocationOption | null) => void
  onToLocationChange: (value: FlightLocationOption | null) => void
}

export function FlightsFilterLocationFields({
  fromLabel,
  toLabel,
  toPlaceholder,
  locationSearchPlaceholder,
  noLocationResults,
  airportsGroupLabel,
  fromAirportOptions,
  toAirportOptions,
  fromSearchValue,
  toSearchValue,
  onFromSearchValueChange,
  onToSearchValueChange,
  fromLocation,
  toLocation,
  onFromLocationChange,
  onToLocationChange,
}: FlightsFilterLocationFieldsProps) {
  return (
    <>
      <FlightLocationSelect
        label={fromLabel}
        emptyLabel={toPlaceholder}
        searchPlaceholder={locationSearchPlaceholder}
        emptySearchLabel={noLocationResults}
        airportsGroupLabel={airportsGroupLabel}
        airportOptions={fromAirportOptions}
        searchValue={fromSearchValue}
        onSearchValueChange={onFromSearchValueChange}
        value={fromLocation}
        onChange={onFromLocationChange}
      />
      <FlightLocationSelect
        label={toLabel}
        emptyLabel={toPlaceholder}
        searchPlaceholder={locationSearchPlaceholder}
        emptySearchLabel={noLocationResults}
        airportsGroupLabel={airportsGroupLabel}
        airportOptions={toAirportOptions}
        searchValue={toSearchValue}
        onSearchValueChange={onToSearchValueChange}
        value={toLocation}
        onChange={onToLocationChange}
      />
    </>
  )
}
