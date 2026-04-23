import { cn } from "ui"

import { FlightsAirlineLogo } from "./flights-airline-logo"
import type { FlightSearchLeg } from "../types/flight-search-result"

/** First segment’s flight number for the summary row (hide “TK 102 + TK 371” style joins). */
function primaryFlightNumber(leg: FlightSearchLeg): string {
  const fromSegment = leg.detailSegments?.[0]?.flightNumber
  if (fromSegment) {
    return fromSegment
  }
  const raw = leg.flightNumber
  const join = " + "
  const idx = raw.indexOf(join)
  return idx === -1 ? raw : raw.slice(0, idx).trim()
}

type FlightsSearchFlightCardAirlineRowProps = {
  rowFlight: FlightSearchLeg
  className?: string
}

export function FlightsSearchFlightCardAirlineRow({
  rowFlight,
  className,
}: FlightsSearchFlightCardAirlineRowProps) {
  const numberLabel = primaryFlightNumber(rowFlight)
  const airlineLabel = `${rowFlight.airlineName} (${numberLabel})`

  return (
    <div
      className={cn("flex min-w-0 items-center gap-1.5", className)}
    >
      <FlightsAirlineLogo
        flightNumber={numberLabel}
        airlineIataCode={rowFlight.airlineIataCode}
      />
      <p className="truncate text-[15px] leading-[22px] font-medium text-[#0C111D]">
        {airlineLabel}
      </p>
    </div>
  )
}
