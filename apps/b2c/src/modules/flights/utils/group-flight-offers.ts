import type { FlightOfferApi } from "../types/flight-offers-search-api"

export type GroupedFlightOffer = {
  itineraryKey: string
  primaryOffer: FlightOfferApi
  fares: readonly FlightOfferApi[]
}

function buildSegmentKey(offer: FlightOfferApi): string {
  return offer.directions
    .map((direction) =>
      direction.segments
        .map((segment) =>
          [
            segment.marketingCarrier.code,
            segment.flightNumber,
            segment.departure.timestamp,
            segment.arrival.timestamp,
            segment.departure.airportCode,
            segment.arrival.airportCode,
          ].join(":")
        )
        .join("|")
    )
    .join("||")
}

function compareOfferPrice(a: FlightOfferApi, b: FlightOfferApi): number {
  return a.price.amount - b.price.amount
}

function buildFareKey(offer: FlightOfferApi): string {
  const directionsKey = offer.directions
    .map((direction) => {
      const firstSegment = direction.segments[0]
      const brand = firstSegment?.brandNames?.[0] ?? ""
      const serviceClass = firstSegment?.cabinClass.serviceClass ?? ""
      const bookingClass = firstSegment?.cabinClass.bookingClass ?? ""
      const mini = direction.miniRules
      return [
        brand,
        serviceClass,
        bookingClass,
        mini.baggage.is_available,
        mini.baggage.weight?.value ?? "",
        mini.baggage.weight?.unit ?? "",
        mini.carry_on_baggage.is_available,
        mini.carry_on_baggage.weight?.value ?? "",
        mini.carry_on_baggage.weight?.unit ?? "",
        mini.refund.before_departure.is_available,
        mini.exchange.before_departure.is_available,
      ].join(":")
    })
    .join("||")

  return [
    offer.price.amount,
    offer.price.currency,
    offer.rules.hasBaggage,
    offer.rules.isChangeable,
    offer.rules.isRefundable,
    directionsKey,
  ].join("|")
}

function dedupeFareOffers(offers: readonly FlightOfferApi[]): FlightOfferApi[] {
  const unique = new Map<string, FlightOfferApi>()
  for (const offer of offers) {
    const key = buildFareKey(offer)
    if (!unique.has(key)) {
      unique.set(key, offer)
    }
  }
  return Array.from(unique.values())
}

export function groupFlightOffersByItinerary(
  offers: readonly FlightOfferApi[]
): GroupedFlightOffer[] {
  const groups = new Map<string, FlightOfferApi[]>()

  for (const offer of offers) {
    const key = buildSegmentKey(offer)
    const existing = groups.get(key)
    if (existing) {
      existing.push(offer)
      continue
    }
    groups.set(key, [offer])
  }

  return Array.from(groups.entries()).map(([itineraryKey, fareOffers]) => {
    const fares = dedupeFareOffers(fareOffers).sort(compareOfferPrice)
    return {
      itineraryKey,
      primaryOffer: fares[0],
      fares,
    }
  })
}
