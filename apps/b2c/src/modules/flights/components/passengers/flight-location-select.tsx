"use client"

import { useMemo } from "react"
import { type SearchableCommandGroup, SearchableCommandPopover } from "ui"

import type { FlightLocationOption } from "../../types/flight-location"

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
  const optionsWithSelected = useMemo(() => {
    if (!value) {
      return airportOptions
    }
    const has = airportOptions.some((o) => o.id === value.id)
    if (has) {
      return airportOptions
    }
    return [value, ...airportOptions]
  }, [airportOptions, value])

  const byId = useMemo(() => optionMap(optionsWithSelected), [optionsWithSelected])

  const groups: SearchableCommandGroup[] = useMemo(
    () => [
      {
        heading: airportsGroupLabel,
        options: optionsWithSelected.map((o) => ({
          value: o.id,
          label: o.label,
          icon: o.icon,
        })),
      },
    ],
    [airportsGroupLabel, optionsWithSelected]
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
