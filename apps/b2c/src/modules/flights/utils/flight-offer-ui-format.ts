import type { FlightOfferSegmentApi } from "../types/flight-offers-search-api-segment"

/** Human-readable leg duration from API minutes (UI-only). */
export function formatRouteDurationMinutes(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60)
  const m = totalMinutes % 60
  if (h <= 0) return `${m}м`
  if (m <= 0) return `${h}ч`
  return `${h}ч ${m}м`
}

export function formatCheckedBaggageSummary(
  baggage: FlightOfferSegmentApi["baggage"]
): string {
  const { piece, unit } = baggage
  if (piece > 0) return `${piece}${(unit ?? "PC").toUpperCase()}`
  return "0PC"
}

export function formatCheckedBaggageWeight(
  baggage: FlightOfferSegmentApi["baggage"]
): string | undefined {
  const { weight, unit } = baggage
  if (weight == null) return undefined
  const u = unit?.toLowerCase() === "kg" ? "кг" : (unit ?? "кг")
  return `${weight}${u}`
}

export function formatOfferPrice(amount: number, currency: string): string {
  const formatted = new Intl.NumberFormat("ru-RU", {
    maximumFractionDigits: 0,
  }).format(amount)
  return `${formatted} ${currency}`
}
