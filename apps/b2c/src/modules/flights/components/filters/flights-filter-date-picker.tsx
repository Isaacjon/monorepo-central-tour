"use client"

import { startOfToday } from "date-fns"
import { DateRangePicker, type DateRangePickerProps } from "ui"

type FlightsFilterDatePickerProps = {
  selected: DateRangePickerProps["selected"]
  onSelect: (range: DateRangePickerProps["selected"]) => void
  isRoundTrip: boolean
  departureLabel: string
  returnLabel: string
  departurePlaceholder: string
  returnPlaceholder: string
}

export function FlightsFilterDatePicker({
  selected,
  onSelect,
  isRoundTrip,
  departureLabel,
  returnLabel,
  departurePlaceholder,
  returnPlaceholder,
}: FlightsFilterDatePickerProps) {
  return (
    <DateRangePicker
      selected={selected}
      onSelect={(range) => onSelect(range ?? undefined)}
      commitFromWithoutTo={!isRoundTrip}
      disabledDates={{ before: startOfToday() }}
      fromLabel={departureLabel}
      toLabel={returnLabel}
      fromPlaceholder={departurePlaceholder}
      toPlaceholder={returnPlaceholder}
      clearable={false}
    />
  )
}
