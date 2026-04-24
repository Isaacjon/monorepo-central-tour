/**
 * GDS **mini rules** (baggage, carry-on, exchange, refund) on offers.
 * The same shape is used at **direction** level and **per-segment**; some fields are
 * `null` vs `{ unit, value }` depending on level — unions match real payloads.
 */

/** Linear dimensions when the GDS returns them (e.g. carry-on size). */
export type FlightBaggageDimensionsApi = {
  height: number
  length: number
  unit: string
  width: number
}

/**
 * Weight on rules: sometimes omitted (`null`), sometimes an object with null fields,
 * sometimes concrete `unit` + `value`.
 */
export type FlightMiniRuleWeightApi =
  | null
  | {
      unit: string | null
      value: number | null
    }

export type FlightMiniRuleBaggageItemApi = {
  comment: string
  dimensions: FlightBaggageDimensionsApi | null
  is_available: boolean
  piece: number | null
  status: string | null
  weight: FlightMiniRuleWeightApi
}

/** Personal item / accessories line in mini rules. */
export type FlightMiniRuleAccessoriesApi = {
  comment: string
  dimensions: FlightBaggageDimensionsApi | null
  is_available: boolean
  piece: number | null
  status: string | null
  weight: FlightMiniRuleWeightApi
}

/** Carry-on — `is_available` / `status` / `piece` may be unknown when GDS hides data. */
export type FlightMiniRuleCarryOnApi = {
  comment: string
  dimensions: FlightBaggageDimensionsApi | null
  is_available: boolean | null
  piece: number | null
  status: string | null
  weight: FlightMiniRuleWeightApi
}

export type FlightMiniRuleBeforeDepartureApi = {
  comment: string
  is_available: boolean
  /** `null` when the API does not say if the change/refund is free. */
  is_free: boolean | null
  is_mini_rules_exist: boolean
  status: string
}

export type FlightMiniRulesApi = {
  accessories: FlightMiniRuleAccessoriesApi
  baggage: FlightMiniRuleBaggageItemApi
  carry_on_baggage: FlightMiniRuleCarryOnApi
  exchange: {
    before_departure: FlightMiniRuleBeforeDepartureApi
  }
  refund: {
    before_departure: FlightMiniRuleBeforeDepartureApi
  }
}
