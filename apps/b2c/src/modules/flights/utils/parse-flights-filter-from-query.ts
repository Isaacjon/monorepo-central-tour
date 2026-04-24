import { decodeGuestRooms } from "../../hotels/utils/guest-rooms-url"
import type { TripType } from "../components/flights-filter.config"
import {
  normalizeFlightPassengersSelection,
  parseFlightCabinParam,
  syncFlightChildAgesLength,
  type FlightPassengersSelection,
} from "../types/flight-passengers"

export type ParsedFlightsFilterQuery = {
  tripType: TripType
  fromId?: string
  fromLabel?: string
  toId?: string
  toLabel?: string
  fromQuery: string
  toQuery: string
  passengers: FlightPassengersSelection
  /** `YYYY-MM-DD` when present */
  departureDateKey?: string
  /** `YYYY-MM-DD` when present */
  returnDateKey?: string
}

function firstParam(
  value: string | string[] | undefined
): string | undefined {
  if (value === undefined) {
    return undefined
  }
  return Array.isArray(value) ? value[0] : value
}

function parseTripType(raw: string | undefined): TripType {
  const v = raw?.trim()
  if (v === "one-way" || v === "no-stops" || v === "round-trip") {
    return v
  }
  return "round-trip"
}

function parseYmdKey(raw: string | undefined): string | undefined {
  const s = raw?.trim()
  if (!s) {
    return undefined
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) {
    return undefined
  }
  return s
}

/** Calendar range uses local midnight components from `YYYY-MM-DD`. */
export function parseLocalDateFromYmd(ymd: string | undefined): Date | undefined {
  const key = parseYmdKey(ymd)
  if (!key) {
    return undefined
  }
  const [y, m, d] = key.split("-").map((x) => Number.parseInt(x, 10))
  const dt = new Date(y, m - 1, d)
  if (
    Number.isNaN(dt.getTime()) ||
    dt.getFullYear() !== y ||
    dt.getMonth() !== m - 1 ||
    dt.getDate() !== d
  ) {
    return undefined
  }
  return dt
}

/**
 * Legacy `rooms` encoding (same as hotels): first room only when `adults` / `children` absent.
 */
function passengersFromLegacyRooms(
  roomsRaw: string | undefined
): Pick<FlightPassengersSelection, "adults" | "children" | "childAges"> | null {
  const trimmed = roomsRaw?.trim()
  if (!trimmed) {
    return null
  }
  const rooms = decodeGuestRooms(trimmed)
  const first = rooms[0]
  if (!first) {
    return null
  }
  return {
    adults: first.adults,
    children: first.children,
    childAges: first.childAges,
  }
}

function parseChildAgesParam(
  raw: string | undefined,
  children: number
): (number | undefined)[] {
  if (children === 0) {
    return []
  }
  const trimmed = raw?.trim()
  if (!trimmed) {
    return syncFlightChildAgesLength(children, [])
  }
  const tokens = trimmed.split(",")
  const out: (number | undefined)[] = []
  for (let i = 0; i < children; i++) {
    const t = tokens[i]?.trim()
    if (t === undefined || t === "" || t === "_") {
      out.push(undefined)
    } else {
      const n = Number.parseInt(t, 10)
      out.push(Number.isFinite(n) ? n : undefined)
    }
  }
  return syncFlightChildAgesLength(children, out)
}

function parseIntClamped(
  raw: string | undefined,
  fallback: number,
  min: number,
  max: number
): number {
  const n = Number.parseInt(String(raw ?? "").trim(), 10)
  if (!Number.isFinite(n)) {
    return fallback
  }
  return Math.min(max, Math.max(min, n))
}

/**
 * Reads URL search params produced by {@link buildFlightsSearchHref} (and legacy `rooms`).
 * Safe for server components: returns plain data only.
 */
export function parseFlightsFilterFromQuery(
  query: Readonly<Record<string, string | string[] | undefined>>
): ParsedFlightsFilterQuery {
  const tripType = parseTripType(firstParam(query.tripType))

  const fromId = firstParam(query.fromId)?.trim() || undefined
  const fromLabel = firstParam(query.fromLabel)?.trim() || undefined
  const toId = firstParam(query.toId)?.trim() || undefined
  const toLabel = firstParam(query.toLabel)?.trim() || undefined
  const fromQuery = firstParam(query.fromQuery)?.trim() ?? ""
  const toQuery = firstParam(query.toQuery)?.trim() ?? ""

  let adults = parseIntClamped(firstParam(query.adults), 1, 1, 9)
  let children = parseIntClamped(firstParam(query.children), 0, 0, 9)
  let childAgesFromLegacy: (number | undefined)[] | undefined

  const hasExplicitPax =
    firstParam(query.adults) !== undefined ||
    firstParam(query.children) !== undefined

  if (!hasExplicitPax) {
    const legacy = passengersFromLegacyRooms(firstParam(query.rooms))
    if (legacy) {
      adults = parseIntClamped(String(legacy.adults), 1, 1, 9)
      children = parseIntClamped(String(legacy.children), 0, 0, 9)
      childAgesFromLegacy = legacy.childAges
    }
  }

  const cabin = parseFlightCabinParam(firstParam(query.cabin))

  const passengers = normalizeFlightPassengersSelection({
    adults,
    children,
    cabin,
    childAges:
      childAgesFromLegacy ??
      parseChildAgesParam(firstParam(query.childAges), children),
  })

  return {
    tripType,
    fromId,
    fromLabel,
    toId,
    toLabel,
    fromQuery,
    toQuery,
    passengers,
    departureDateKey: parseYmdKey(firstParam(query.departureDate)),
    returnDateKey: parseYmdKey(firstParam(query.returnDate)),
  }
}

/**
 * Stable key so the filter client subtree remounts when the meaningful query string changes.
 */
export function flightsSearchQueryKey(
  query: Readonly<Record<string, string | string[] | undefined>>
): string {
  const entries = Object.entries(query)
    .filter(([, v]) => v !== undefined && v !== "")
    .map(([k, v]) => {
      const s = Array.isArray(v) ? v[0] : v
      return [k, s ?? ""] as const
    })
    .sort(([a], [b]) => a.localeCompare(b))
  return entries.map(([k, v]) => `${k}=${v}`).join("&")
}
