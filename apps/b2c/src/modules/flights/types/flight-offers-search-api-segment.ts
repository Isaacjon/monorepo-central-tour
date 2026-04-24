import type { FlightMiniRulesApi } from "./flight-offers-search-api-mini-rules"

/** One flight leg inside a direction (connections = multiple segments). */
export type FlightSegmentCarrierApi = {
  code: string
  name: string
}

export type FlightSegmentAircraftApi = {
  code: string
  name: string
}

export type FlightSegmentEndpointApi = {
  airportCode: string
  airportName: string
  cityCode: string
  cityName: string
  countryCode: string
  countryName: string
  /** Display date as returned by API (e.g. `DD.MM.YYYY`). */
  date: string
  terminal: string | null
  time: string
  timestamp: number
}

export type FlightSegmentBaggageApi = {
  piece: number
  unit: string | null
  weight: number | null
}

export type FlightSegmentCarryOnBaggageApi = {
  piece: number | null
  unit: string | null
  weight: number | null
}

export type FlightSegmentCabinClassApi = {
  bookingClass: string
  serviceClass: string
}

export type FlightOfferSegmentApi = {
  aircraft: FlightSegmentAircraftApi
  arrival: FlightSegmentEndpointApi
  baggage: FlightSegmentBaggageApi
  baggageRecheck: boolean
  brandNames: readonly string[]
  cabinClass: FlightSegmentCabinClassApi
  carrier: FlightSegmentCarrierApi
  carryOnBaggage: FlightSegmentCarryOnBaggageApi
  departure: FlightSegmentEndpointApi
  directionIndex: number
  durationMinutes: number
  flightNumber: string
  isBaggageIncluded: boolean
  isChangeable: boolean
  isRefundable: boolean
  marketingCarrier: FlightSegmentCarrierApi
  miniRules: FlightMiniRulesApi
  /** Total time for the whole direction (same on each segment of that direction). */
  routeDurationMinutes: number
  seats: number
  segmentIndex: number
  technicalStops: readonly unknown[]
  /**
   * Layover after this segment until the next, in minutes.
   * `null` on the last segment or when not applicable.
   */
  transferDurationMinutes: number | null
  validatingCarrier: FlightSegmentCarrierApi
}
