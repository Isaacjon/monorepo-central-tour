export type TripType = "round-trip" | "one-way" | "no-stops"

export type FlightsFilterCopy = {
  fromLabel: string
  toLabel: string
  toPlaceholder: string
  locationSearchPlaceholder: string
  noLocationResults: string
  airportsGroupLabel: string
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

export function getTripTypeOptions(copy: FlightsFilterCopy) {
  return [
    { id: "round-trip" as const, label: copy.roundTripLabel },
    { id: "one-way" as const, label: copy.oneWayLabel },
    { id: "no-stops" as const, label: copy.noStopsLabel },
  ]
}
