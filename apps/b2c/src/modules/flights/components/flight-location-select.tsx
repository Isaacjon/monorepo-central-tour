"use client"

import { useMemo } from "react"
import {
  type SearchableCommandGroup,
  SearchableCommandPopover,
} from "ui"

import type { FlightLocationOption } from "../types/flight-location"

type FlightLocationSelectProps = {
  label: string
  emptyLabel: string
  searchPlaceholder: string
  emptySearchLabel: string
  airportsGroupLabel: string
  cityOptions: FlightLocationOption[]
  airportOptions: FlightLocationOption[]
  value: FlightLocationOption | null
  onChange: (next: FlightLocationOption) => void
}

function optionMap(
  cityOptions: FlightLocationOption[],
  airportOptions: FlightLocationOption[]
): Map<string, FlightLocationOption> {
  const m = new Map<string, FlightLocationOption>()
  for (const o of cityOptions) m.set(o.id, o)
  for (const o of airportOptions) m.set(o.id, o)
  return m
}

export function FlightLocationSelect({
  label,
  emptyLabel,
  searchPlaceholder,
  emptySearchLabel,
  airportsGroupLabel,
  cityOptions,
  airportOptions,
  value,
  onChange,
}: FlightLocationSelectProps) {
  const byId = useMemo(
    () => optionMap(cityOptions, airportOptions),
    [airportOptions, cityOptions]
  )

  const groups: SearchableCommandGroup[] = useMemo(
    () => [
      {
        options: cityOptions.map((o) => ({
          value: o.id,
          label: o.label,
          icon: o.icon,
        })),
      },
      {
        heading: airportsGroupLabel,
        options: airportOptions.map((o) => ({
          value: o.id,
          label: o.label,
          icon: o.icon,
        })),
      },
    ],
    [airportOptions, airportsGroupLabel, cityOptions]
  )

  return (
    <div className="min-w-0 flex-1">
      <SearchableCommandPopover
        label={label}
        emptyLabel={emptyLabel}
        searchPlaceholder={searchPlaceholder}
        emptySearchLabel={emptySearchLabel}
        groups={groups}
        value={value?.id ?? null}
        onValueChange={(id) => {
          const next = byId.get(id)
          if (next) onChange(next)
        }}
      />
    </div>
  )
}
