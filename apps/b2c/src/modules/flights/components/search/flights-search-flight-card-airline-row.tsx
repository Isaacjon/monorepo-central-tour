import { cn } from "ui"

import type { FlightOfferDirectionApi } from "../../types/flight-offers-search-api"
import { FlightsAirlineLogo } from "../shared/flights-airline-logo"

type FlightsSearchFlightCardAirlineRowProps = {
  direction: FlightOfferDirectionApi
  className?: string
}

export function FlightsSearchFlightCardAirlineRow({
  direction,
  className,
}: FlightsSearchFlightCardAirlineRowProps) {
  const first = direction.segments[0]
  if (!first) {
    return null
  }
  const marketing = first.marketingCarrier
  const numberLabel = first.flightNumber
  const airlineLabel = `${marketing.name} (${numberLabel})`

  return (
    <div className={cn("flex min-w-0 items-center gap-1.5", className)}>
      <FlightsAirlineLogo
        flightNumber={numberLabel}
        airlineIataCode={marketing.code}
      />
      <p className="truncate text-[15px] leading-[22px] font-medium text-[#0C111D]">
        {airlineLabel}
      </p>
    </div>
  )
}
