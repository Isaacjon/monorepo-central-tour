import { TurkishAirlinesIcon, UzbAirwaysIcon } from "ui"

type FlightsAirlineLogoProps = {
  flightNumber: string
  airlineIataCode?: string
  className?: string
}

function iataFromFlightNumber(flightNumber: string): string | undefined {
  const m = flightNumber.trim().match(/^([A-Z]{2})/i)
  return m ? m[1].toUpperCase() : undefined
}

/**
 * Renders the airline mark from `packages/ui` when known (TK, HY); otherwise a generic plane icon.
 */
export function FlightsAirlineLogo({
  flightNumber,
  airlineIataCode,
  className,
}: FlightsAirlineLogoProps) {
  const code = (
    airlineIataCode ??
    iataFromFlightNumber(flightNumber) ??
    ""
  ).toUpperCase()
  const common = `size-6 shrink-0 ${className ?? ""}`.trim()

  if (code === "TK") {
    return (
      <TurkishAirlinesIcon
        className={common}
        width={24}
        height={24}
        aria-hidden
      />
    )
  }
  if (code === "HY") {
    return (
      <UzbAirwaysIcon className={common} width={24} height={24} aria-hidden />
    )
  }

  return (
    <span
      className={`${common} block size-5 rounded-full bg-[#f5f5f5]`}
      aria-hidden
    />
  )
}
