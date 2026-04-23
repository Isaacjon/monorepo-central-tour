"use client"

import { ChevronDown, ChevronUp } from "lucide-react"

type FlightsSearchFlightCardToggleDetailsProps = {
  expanded: boolean
  onToggle: () => void
  showDetailsLabel: string
  hideDetailsLabel: string
}

export function FlightsSearchFlightCardToggleDetails({
  expanded,
  onToggle,
  showDetailsLabel,
  hideDetailsLabel,
}: FlightsSearchFlightCardToggleDetailsProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={expanded}
      className="text-primary inline-flex items-center gap-0.5 text-base leading-6 font-normal"
    >
      {expanded ? hideDetailsLabel : showDetailsLabel}
      {expanded ? (
        <ChevronUp className="size-6 shrink-0" aria-hidden />
      ) : (
        <ChevronDown className="size-6 shrink-0" aria-hidden />
      )}
    </button>
  )
}
