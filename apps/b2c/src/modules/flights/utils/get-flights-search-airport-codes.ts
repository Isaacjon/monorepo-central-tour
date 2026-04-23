const DEFAULT_DEPARTURE = "TAS"
const DEFAULT_ARRIVAL = "DXB"

function getParam(
  searchParams: Readonly<Record<string, string | string[] | undefined>>,
  key: string
) {
  const v = searchParams[key]
  if (v === undefined) return undefined
  return (Array.isArray(v) ? v[0] : v)?.trim() || undefined
}

/**
 * Derives IATA/ICAO codes for the time filter from the search URL.
 * `fromId` / `toId` match {@link buildFlightsSearchHref} (airport option ids are IATA/ICAO).
 */
export function getFlightsSearchAirportCodes(
  searchParams: Readonly<Record<string, string | string[] | undefined>>
) {
  const fromId = getParam(searchParams, "fromId")
  const toId = getParam(searchParams, "toId")
  return {
    departureCode: fromId && fromId.length > 0 ? fromId : DEFAULT_DEPARTURE,
    arrivalCode: toId && toId.length > 0 ? toId : DEFAULT_ARRIVAL,
  } as const
}
