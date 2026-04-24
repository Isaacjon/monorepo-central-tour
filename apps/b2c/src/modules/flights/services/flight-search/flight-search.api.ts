import { isAxiosError } from "axios"

import apiClient from "@/shared/api/api-client"
import { HttpError } from "@/shared/lib/http-error"

import {
  buildFlightsSearchInvokeParams,
  emptyFlightOffersSearchResultBody,
  type FlightsSearchInvokeParams,
} from "./flight-search-invoke-params"
import type {
  FlightOffersSearchApiResponse,
  FlightOffersSearchResultBody,
} from "../../types/flight-offers-search-api"

export { FLIGHT_SEARCH_PAGE_LIMIT } from "./flight-search-invoke-params"

function unwrapFlightOffersSearchEnvelope(
  response: FlightOffersSearchApiResponse
): FlightOffersSearchResultBody | null {
  const layer = response.data
  if (!layer?.data) {
    return null
  }
  return layer.data
}

function isFlightOffersSearchResultBody(
  value: unknown
): value is FlightOffersSearchResultBody {
  if (!value || typeof value !== "object") {
    return false
  }
  const o = value as Record<string, unknown>
  return (
    Array.isArray(o.offers) &&
    o.meta !== undefined &&
    typeof o.meta === "object" &&
    o.meta !== null &&
    typeof o.provider === "string" &&
    o.search !== undefined &&
    typeof o.search === "object" &&
    o.search !== null
  )
}

/**
 * U-Code `invoke_function` bodies vary: sometimes `data.data` is already
 * {@link FlightOffersSearchResultBody}, sometimes the full
 * {@link FlightOffersSearchApiResponse} envelope.
 */
function extractFlightOffersSearchResultBody(
  httpBody: unknown
): FlightOffersSearchResultBody | null {
  if (isFlightOffersSearchResultBody(httpBody)) {
    return httpBody
  }

  const fromEnvelope = unwrapFlightOffersSearchEnvelope(
    httpBody as FlightOffersSearchApiResponse
  )
  if (fromEnvelope) {
    return fromEnvelope
  }

  if (!httpBody || typeof httpBody !== "object") {
    return null
  }

  const layer1 = (httpBody as { data?: unknown }).data
  if (!layer1 || typeof layer1 !== "object") {
    return null
  }

  const layer2 = (layer1 as { data?: unknown }).data
  if (layer2 === undefined || layer2 === null) {
    return null
  }

  if (isFlightOffersSearchResultBody(layer2)) {
    return layer2
  }

  const fromNested = unwrapFlightOffersSearchEnvelope(
    layer2 as FlightOffersSearchApiResponse
  )
  if (fromNested) {
    return fromNested
  }

  if (typeof layer2 === "object") {
    const layer3 = (layer2 as { data?: unknown }).data
    if (isFlightOffersSearchResultBody(layer3)) {
      return layer3
    }
  }

  return null
}

async function postFlightsSearch(
  params: FlightsSearchInvokeParams
): Promise<FlightOffersSearchResultBody> {
  const functionName =
    process.env.NEXT_PUBLIC_U_CODE_FUNCTION_NAME?.trim() ||
    "centraltour-aggregators"
  const url = `/v2/invoke_function/${encodeURIComponent(functionName)}`

  try {
    const { data: json } = await apiClient.post<unknown>(url, {
      data: {
        method: "flights_search",
        object_data: params,
      },
    })

    const body = extractFlightOffersSearchResultBody(json)
    return body ?? emptyFlightOffersSearchResultBody()
  } catch (e) {
    if (isAxiosError(e) && e.response) {
      const detail =
        typeof e.response.data === "string"
          ? e.response.data
          : JSON.stringify(e.response.data)
      throw new HttpError(e.response.status, detail.slice(0, 500))
    }
    throw e
  }
}

/**
 * Loads one page of flight offers via U-Code `flights_search` (`page` / `limit` in `object_data`).
 * Returns an empty body when search criteria are incomplete (same as skipping the request).
 */
export async function fetchFlightSearchPage(
  query: Readonly<Record<string, string | string[] | undefined>>,
  page: number
): Promise<FlightOffersSearchResultBody> {
  const params = buildFlightsSearchInvokeParams(query, page)
  if (!params) {
    return emptyFlightOffersSearchResultBody()
  }
  return postFlightsSearch(params)
}
