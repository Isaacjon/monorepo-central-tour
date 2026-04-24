/**
 * Raw flight **offers search** response (MyAgent-style GDS payload).
 *
 * **Nested `data`:** envelope is top-level `status` / `description`; offers live at
 * `response.data.data.offers`.
 *
 * **Directions vs segments:** `directions` = one search leg; `segments` = each flight.
 * Layover after a segment: `transferDurationMinutes` (often `null` on last segment).
 *
 * Re-exports segment and mini-rule types from sibling files for one import path.
 */

import type { FlightMiniRulesApi } from "./flight-offers-search-api-mini-rules"
import type { FlightOfferSegmentApi } from "./flight-offers-search-api-segment"

export * from "./flight-offers-search-api-mini-rules"
export * from "./flight-offers-search-api-segment"

/** Outer envelope status (e.g. HTTP semantic success). */
export type FlightOffersSearchEnvelopeStatus = string

/** Inner `data.status` after unwrapping the envelope. */
export type FlightOffersSearchDataStatus = string

export type FlightOffersSearchApiResponse = {
  status: FlightOffersSearchEnvelopeStatus
  description: string
  data: FlightOffersSearchApiDataWrapper
  custom_message: string
}

export type FlightOffersSearchApiDataWrapper = {
  status: FlightOffersSearchDataStatus
  data: FlightOffersSearchResultBody
  attributes: unknown | null
  server_error: string
}

export type FlightOffersSearchResultBody = {
  meta: FlightOffersSearchMeta
  offers: readonly FlightOfferApi[]
  provider: string
  search: FlightOffersSearchCriteriaApi
}

export type FlightOffersSearchMeta = {
  currency: string
  totalOffers: number
}

export type FlightOffersSearchCriteriaApi = {
  adt: number
  chd: number
  class: string
  inf: number
  segments: readonly FlightOffersSearchSegmentCriteriaApi[]
  type: string
}

export type FlightOffersSearchSegmentCriteriaApi = {
  date: string
  from: string
  to: string
}

export type FlightOfferApi = {
  directions: readonly FlightOfferDirectionApi[]
  offerId: string
  price: FlightOfferPriceApi
  provider: FlightOfferProviderApi
  rules: FlightOfferRulesApi
  /** Unix timestamp — deadline to ticket this offer. */
  ticketingTimeLimit: number
  type: string
}

export type FlightOfferPriceApi = {
  amount: number
  currency: string
}

export type FlightOfferProviderApi = {
  gds: number
  name: string
  supplierCode: string
  supplierTitle: string
}

export type FlightOfferRulesApi = {
  hasBaggage: boolean
  isChangeable: boolean
  isRefundable: boolean
}

export type FlightOfferDirectionApi = {
  directionIndex: number
  miniRules: FlightMiniRulesApi
  segments: readonly FlightOfferSegmentApi[]
}
