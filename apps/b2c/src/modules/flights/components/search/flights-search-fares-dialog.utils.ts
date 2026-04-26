import type { FlightOfferApi } from "../../types/flight-offers-search-api"
import type { FlightMiniRuleWeightApi } from "../../types/flight-offers-search-api-mini-rules"

export type FareFeature = {
  label: string
  included: boolean
  icon: "carry_on" | "checked_bag" | "refund" | "exchange"
}

export type FareCard = {
  id: string
  title: string
  price: string
  features: FareFeature[]
  selected?: boolean
}

export function formatMiniRuleWeight(weight: FlightMiniRuleWeightApi): string | null {
  if (!weight || weight.value == null || weight.value <= 0) {
    return null
  }
  const unit = (weight.unit ?? "kg").toLowerCase() === "kg" ? "кг" : weight.unit
  return `${weight.value} ${unit}`
}

export function getFareTitleFromOffer(offer: FlightOfferApi): string {
  const firstSegment = offer.directions[0]?.segments[0]
  const byBrand = firstSegment?.brandNames[0]
  const byClass = firstSegment?.cabinClass.serviceClass
  return byBrand || byClass || "Тариф"
}

export function getAirportLabel(
  airportName: string | undefined,
  airportCode: string | undefined,
  terminal: string | null | undefined
) {
  const name = airportName?.trim() || airportCode?.trim() || "—"
  const terminalLabel = terminal?.trim() ? ` ${terminal.trim()}` : ""
  return `${name}${terminalLabel}`
}
