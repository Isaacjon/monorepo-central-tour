import { FlightAirplaneIcon } from "ui"

import type { AirportOptionDto } from "../../services/airports/airports.api"
import type { FlightLocationOption } from "../../types/flight-location"

const airportIconClassName = "size-6 shrink-0 rounded-[3px] text-[#101828]"

function createAirportIcon() {
  return (
    <FlightAirplaneIcon
      width={24}
      height={24}
      aria-hidden
      className={airportIconClassName}
    />
  )
}

export function flightLocationFromUrlFields(
  id: string | undefined,
  label: string | undefined
): FlightLocationOption | null {
  const idT = id?.trim() ?? ""
  const labelT = label?.trim() ?? ""
  if (!idT && !labelT) {
    return null
  }
  return {
    id: idT || labelT,
    label: labelT || idT,
    icon: createAirportIcon(),
  }
}

function sameAirportId(a: string, b: string) {
  return a.trim().toUpperCase() === b.trim().toUpperCase()
}

export function upgradeLocationFromAirports(
  current: FlightLocationOption | null,
  urlId: string | undefined,
  options: FlightLocationOption[]
): FlightLocationOption | null {
  if (!options.length) {
    return current
  }
  const idT = urlId?.trim() ?? ""
  if (idT) {
    const hit = options.find((o) => sameAirportId(o.id, idT))
    if (hit) {
      return hit
    }
  }
  if (current) {
    const hit = options.find((o) => sameAirportId(o.id, current.id))
    if (hit) {
      return hit
    }
  }
  return current
}

export function airportDtosToLocationOptions(
  dtos: AirportOptionDto[] | undefined
): FlightLocationOption[] {
  if (!dtos?.length) {
    return []
  }
  return dtos.map((airport) => ({
    id: airport.id,
    label: airport.label,
    icon: createAirportIcon(),
  }))
}
