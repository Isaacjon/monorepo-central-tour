/**
 * One-way A→B and return A↔B use only two endpoints in the summary row.
 * Complex / multi-city trips add more legs (A→B→C).
 */
export type FlightItineraryType = "direct" | "direct_return" | "complex"

/** One segment in the details panel (e.g. a single flight in a connection). */
export type FlightSearchDetailSegment = {
  airlineName: string
  airlineIataCode?: string
  flightNumber: string
  departureTime: string
  departureDateLabel?: string
  departureCity: string
  departureCode: string
  arrivalTime: string
  arrivalDateLabel?: string
  arrivalCity: string
  arrivalCode: string
  duration: string
  terminal?: string
  bookingClass?: string
  baggageWeight?: string
  operatingAirlineName?: string
  baggage: string
}

export type FlightSearchLeg = {
  id: string
  isDirect: boolean
  /** How the itinerary is structured; drives timeline copy (e.g. «Прямой» vs connections). */
  itineraryType?: FlightItineraryType
  airlineName: string
  /** e.g. `TK 366` — shown in parentheses after the airline name. */
  flightNumber: string
  /** IATA airline code (e.g. TK, HY). If omitted, inferred from the first two letters of `flightNumber`. */
  airlineIataCode?: string
  departureTime: string
  departureDateLabel?: string
  departureCity: string
  departureCode: string
  arrivalTime: string
  arrivalDateLabel?: string
  arrivalCity: string
  arrivalCode: string
  duration: string
  /**
   * IATA code of the transfer airport when `isDirect` is false (single main stop in the summary row).
   */
  transferAirportCode?: string
  /**
   * Layover at `transferAirportCode` in minutes; shown next to the code when set (e.g. `40 мин` in accent color).
   */
  transferLayoverMinutes?: number
  /**
   * Renders the details block as multiple segment rows with transfer rows between.
   * When missing, a single block is built from the leg’s top-level fields.
   */
  detailSegments?: readonly FlightSearchDetailSegment[]
  /**
   * Layover after segment `i` in minutes, for `i` in `0 .. detailSegments.length - 2`.
   * If there are two segments, `transferLayoverMinutes` is used when this is omitted.
   */
  detailLayovers?: readonly number[]
  /** e.g. "1PC" */
  baggage: string
  priceDisplay: string
  terminal?: string
  bookingClass?: string
  baggageWeight?: string
  operatingAirlineName?: string
}

/** Placeholder / API-shaped flight offer for search results. */
export type FlightSearchResult = FlightSearchLeg & {
  /**
   * Optional return leg for round-trip offers.
   * When present, UI shows outbound and return rows in one card.
   */
  returnFlight?: FlightSearchLeg
}

/** Round-trip with no connections on either leg (for outbound/return labels in details). */
export function isRoundTripWithNoTransfers(result: FlightSearchResult): boolean {
  if (!result.returnFlight) {
    return false
  }
  const outboundOk =
    result.isDirect &&
    (!result.detailSegments || result.detailSegments.length <= 1)
  const ret = result.returnFlight
  const returnOk =
    ret.isDirect && (!ret.detailSegments || ret.detailSegments.length <= 1)
  return outboundOk && returnOk
}
