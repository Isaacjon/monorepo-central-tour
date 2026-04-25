import {
  flightCabinToParam,
  type FlightPassengersSelection,
  syncFlightChildAgesLength,
} from "../types/flight-passengers"

type SearchLocation = {
  id: string
  label: string
}

type BuildFlightsSearchHrefInput = {
  searchHref: string
  tripType: "round-trip" | "one-way" | "no-stops"
  passengers: FlightPassengersSelection
  fromSearchValue: string
  toSearchValue: string
  fromLocation: SearchLocation | null
  toLocation: SearchLocation | null
  departureDate?: Date
  returnDate?: Date
}

function formatDateParam(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, "0")
  const d = String(date.getDate()).padStart(2, "0")
  return `${y}-${m}-${d}`
}

export function buildFlightsSearchHref({
  searchHref,
  tripType,
  passengers,
  fromSearchValue,
  toSearchValue,
  fromLocation,
  toLocation,
  departureDate,
  returnDate,
}: BuildFlightsSearchHrefInput): string {
  const [path, existingQuery = ""] = searchHref.split("?")
  const params = new URLSearchParams(existingQuery)

  params.set("tripType", tripType)
  params.set("adults", String(passengers.adults))
  params.set("children", String(passengers.children))
  params.set("cabin", flightCabinToParam(passengers.cabin))
  if (passengers.children > 0) {
    const ages = syncFlightChildAgesLength(
      passengers.children,
      passengers.childAges
    )
      .map((a) => (a === undefined ? "_" : String(a)))
      .join(",")
    params.set("childAges", ages)
  } else {
    params.delete("childAges")
  }
  params.delete("rooms")

  if (fromSearchValue) {
    params.set("fromQuery", fromSearchValue)
  } else {
    params.delete("fromQuery")
  }

  if (toSearchValue) {
    params.set("toQuery", toSearchValue)
  } else {
    params.delete("toQuery")
  }

  if (fromLocation) {
    params.set("fromId", fromLocation.id)
    params.set("fromLabel", fromLocation.label)
  } else {
    params.delete("fromId")
    params.delete("fromLabel")
  }

  if (toLocation) {
    params.set("toId", toLocation.id)
    params.set("toLabel", toLocation.label)
  } else {
    params.delete("toId")
    params.delete("toLabel")
  }

  if (departureDate) {
    params.set("departureDate", formatDateParam(departureDate))
  } else {
    params.delete("departureDate")
  }

  if (returnDate) {
    params.set("returnDate", formatDateParam(returnDate))
  } else {
    params.delete("returnDate")
  }

  const query = params.toString()
  return query ? `${path}?${query}` : path
}
