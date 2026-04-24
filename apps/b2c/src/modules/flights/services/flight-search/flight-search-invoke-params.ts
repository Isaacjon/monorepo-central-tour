import type { FlightOffersSearchResultBody } from "../../types/flight-offers-search-api"

/** Page size for U-Code `flights_search` (keep in sync with `getNextPageParam` in the query hook). */
export const FLIGHT_SEARCH_PAGE_LIMIT = 10

export type FlightsSearchInvokeParams = {
  "from-city": string
  "to-city": string
  "from-date": string
  "to-date"?: string
  page: number
  limit: number
}

function firstParam(value: string | string[] | undefined): string | undefined {
  if (value === undefined) {
    return undefined
  }
  return Array.isArray(value) ? value[0] : value
}

function isValidIsoDateParam(raw: string): boolean {
  const s = raw.trim()
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) {
    return false
  }
  const [y, m, d] = s.split("-").map((x) => Number.parseInt(x, 10))
  const dt = new Date(y, m - 1, d)
  return (
    Number.isFinite(dt.getTime()) &&
    dt.getFullYear() === y &&
    dt.getMonth() === m - 1 &&
    dt.getDate() === d
  )
}

export function buildFlightsSearchInvokeParams(
  query: Readonly<Record<string, string | string[] | undefined>>,
  page: number
): FlightsSearchInvokeParams | null {
  const fromCity = firstParam(query.fromId)?.trim().toUpperCase()
  const toCity = firstParam(query.toId)?.trim().toUpperCase()
  const fromDate = firstParam(query.departureDate)?.trim() ?? ""
  const tripType = firstParam(query.tripType)?.trim()
  const returnDateRaw = firstParam(query.returnDate)?.trim()
  const isRoundTrip = tripType === "round-trip"

  if (!fromCity || !toCity || !isValidIsoDateParam(fromDate)) {
    return null
  }

  const params: FlightsSearchInvokeParams = {
    "from-city": fromCity,
    "to-city": toCity,
    "from-date": fromDate,
    page,
    limit: FLIGHT_SEARCH_PAGE_LIMIT,
  }

  if (isRoundTrip && returnDateRaw && isValidIsoDateParam(returnDateRaw)) {
    params["to-date"] = returnDateRaw
  }

  return params
}

export function emptyFlightOffersSearchResultBody(): FlightOffersSearchResultBody {
  return {
    meta: { currency: "", totalOffers: 0 },
    offers: [],
    provider: "",
    search: {
      adt: 1,
      chd: 0,
      class: "Y",
      inf: 0,
      type: "OW",
      segments: [],
    },
  }
}
