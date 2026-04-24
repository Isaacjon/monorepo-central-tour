export type FlightCabin = "economy" | "comfort" | "business" | "first"

/** IATA-style booking class codes for URL and API */
export const FLIGHT_CABIN_PARAM: Record<FlightCabin, string> = {
  economy: "Y",
  comfort: "W",
  business: "C",
  first: "F",
}

const PARAM_TO_CABIN: Record<string, FlightCabin> = {
  Y: "economy",
  W: "comfort",
  C: "business",
  F: "first",
}

export function parseFlightCabinParam(raw: string | undefined): FlightCabin {
  const k = raw?.trim().toUpperCase() ?? ""
  return PARAM_TO_CABIN[k] ?? "economy"
}

export function flightCabinToParam(cabin: FlightCabin): string {
  return FLIGHT_CABIN_PARAM[cabin]
}

export type FlightPassengersSelection = {
  adults: number
  children: number
  /** Length always equals `children`; `undefined` means age not selected yet */
  childAges: (number | undefined)[]
  cabin: FlightCabin
}

export const FLIGHT_MAX_PASSENGERS_PER_TYPE = 9

export const FLIGHT_CHILD_AGE_MIN = 0
export const FLIGHT_CHILD_AGE_MAX = 17

export const FLIGHT_CHILD_AGE_OPTIONS = Array.from(
  { length: FLIGHT_CHILD_AGE_MAX - FLIGHT_CHILD_AGE_MIN + 1 },
  (_, i) => FLIGHT_CHILD_AGE_MIN + i
)

function clampInt(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

export function syncFlightChildAgesLength(
  children: number,
  childAges?: (number | undefined)[] | null
): (number | undefined)[] {
  const existing = childAges ? [...childAges] : []
  while (existing.length < children) {
    existing.push(undefined)
  }
  return existing.slice(0, children)
}

export function normalizeFlightPassengersSelection(
  partial?: Partial<FlightPassengersSelection> | null
): FlightPassengersSelection {
  const base: FlightPassengersSelection = {
    adults: 1,
    children: 0,
    childAges: [],
    cabin: "economy",
  }
  if (!partial) {
    return base
  }
  const adultsRaw = partial.adults
  const childrenRaw = partial.children
  const childrenCount = clampInt(
    typeof childrenRaw === "number" && Number.isFinite(childrenRaw)
      ? childrenRaw
      : base.children,
    0,
    FLIGHT_MAX_PASSENGERS_PER_TYPE
  )
  return {
    adults: clampInt(
      typeof adultsRaw === "number" && Number.isFinite(adultsRaw)
        ? adultsRaw
        : base.adults,
      1,
      FLIGHT_MAX_PASSENGERS_PER_TYPE
    ),
    children: childrenCount,
    childAges: syncFlightChildAgesLength(childrenCount, partial.childAges),
    cabin:
      partial.cabin === "economy" ||
      partial.cabin === "comfort" ||
      partial.cabin === "business" ||
      partial.cabin === "first"
        ? partial.cabin
        : base.cabin,
  }
}
