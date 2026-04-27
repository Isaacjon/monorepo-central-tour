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
    const fares = [...fareOffers].sort(compareOfferPrice)
    return {
      itineraryKey,
      primaryOffer: fares[0],
      fares,
    }
  })
}
