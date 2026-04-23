"use client"

import { useMemo } from "react"
import { type SearchableCommandGroup, SearchableCommandPopover } from "ui"

import type { FlightLocationOption } from "../types/flight-location"

type FlightLocationSelectProps = {
  label: string
  emptyLabel: string
  searchPlaceholder: string
  emptySearchLabel: string
  airportsGroupLabel: string
  airportOptions: FlightLocationOption[]
  searchValue?: string
  onSearchValueChange?: (value: string) => void
  value: FlightLocationOption | null
  onChange: (next: FlightLocationOption) => void
}

function optionMap(
  airportOptions: FlightLocationOption[]
): Map<string, FlightLocationOption> {
  const m = new Map<string, FlightLocationOption>()
  for (const o of airportOptions) m.set(o.id, o)
  return m
}

export function FlightLocationSelect({
  label,
  emptyLabel,
  searchPlaceholder,
  emptySearchLabel,
  airportsGroupLabel,
  airportOptions,
  searchValue,
  onSearchValueChange,
  value,
  onChange,
}: FlightLocationSelectProps) {
  const byId = useMemo(() => optionMap(airportOptions), [airportOptions])

  const groups: SearchableCommandGroup[] = useMemo(
    () => [
      {
        heading: airportsGroupLabel,
        options: airportOptions.map((o) => ({
          value: o.id,
          label: o.label,
          icon: o.icon,
        })),
      },
    ],
    [airportOptions, airportsGroupLabel]
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
        searchValue={searchValue}
        onSearchValueChange={onSearchValueChange}
        onValueChange={(id) => {
          const next = byId.get(id)
          if (next) onChange(next)
        }}
      />
    </div>
  )
}
