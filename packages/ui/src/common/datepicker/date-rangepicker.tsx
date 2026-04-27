"use client"

import type { Locale } from "date-fns"
import { ru } from "date-fns/locale"

import * as React from "react"
import { type DateRange, type Matcher } from "react-day-picker"

import { DateRangePickerTrigger } from "./date-range-picker-trigger"
import { useDateRangePickerState } from "./use-date-range-picker-state"
import {
  BaseCalendar,
  BaseCalendarFooter,
} from "../../components/ui/base-calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover"

export type DateRangePickerProps = Omit<
  React.ComponentProps<typeof BaseCalendar>,
  "mode" | "selected" | "onSelect"
> & {
  placeholder?: string
  fromLabel?: string
  toLabel?: string
  fromPlaceholder?: string
  toPlaceholder?: string
  selected?: DateRange
  onSelect?: (range?: DateRange | null) => void
  disabled?: boolean
  disabledDates?: Matcher | Matcher[]
  showFooter?: boolean
  maxRangeDays?: number
  align?: "start" | "center" | "end"
  clearable?: boolean
  resetable?: boolean
  locale?: Locale
  /**
   * When true, the first selected date calls `onSelect({ from, to: undefined })` immediately
   * and closes the popover so one-way flows can apply departure without waiting for return.
   */
  commitFromWithoutTo?: boolean
}

function DateRangePicker({
  className,
  showOutsideDays = true,
  placeholder = "дд.мм.гггг",
  fromLabel = "Вылет",
  toLabel = "Прилет",
  fromPlaceholder,
  toPlaceholder,
  selected,
  onSelect,
  disabled = false,
  disabledDates,
  showFooter = false,
  maxRangeDays,
  align = "start",
  clearable = true,
  resetable = true,
  locale = ru,
  commitFromWithoutTo = false,
  ...props
}: DateRangePickerProps) {
  const activeFromPlaceholder = fromPlaceholder ?? placeholder
  const activeToPlaceholder = toPlaceholder ?? placeholder
  const {
    isOpen,
    tempRange,
    defaultMonth,
    fromDisplayValue,
    toDisplayValue,
    hasFromValue,
    hasToValue,
    canClearValue,
    combinedDisabledDates,
    handleOpenChange,
    handleSelect,
    handleClear,
    handleReset,
    handleApply,
  } = useDateRangePickerState({
    selected,
    onSelect,
    clearable,
    disabledDates,
    maxRangeDays,
    showFooter,
    commitFromWithoutTo,
    locale,
    fromPlaceholder: activeFromPlaceholder,
    toPlaceholder: activeToPlaceholder,
  })

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <DateRangePickerTrigger
          fromLabel={fromLabel}
          toLabel={toLabel}
          fromDisplayValue={fromDisplayValue}
          toDisplayValue={toDisplayValue}
          hasFromValue={hasFromValue}
          hasToValue={hasToValue}
          canClearValue={canClearValue}
          disabled={disabled}
          isOpen={isOpen}
          className={className}
          onClear={handleClear}
          aria-label="Date range picker trigger"
        />
      </PopoverTrigger>
      <PopoverContent
        align={align}
        className="z-10 w-auto rounded-lg border border-gray-200 bg-white p-0 shadow-none"
      >
        <BaseCalendar
          defaultMonth={defaultMonth}
          mode="range"
          showOutsideDays={showOutsideDays}
          locale={locale}
          selected={(tempRange ?? selected) || undefined}
          onSelect={handleSelect}
          disabled={combinedDisabledDates}
          {...props}
        />
        {showFooter && (
          <BaseCalendarFooter
            reset={handleReset}
            apply={() => handleApply()}
            resetDisabled={!selected}
            applyDisabled={!tempRange?.from || !tempRange?.to}
            resetable={resetable}
          />
        )}
      </PopoverContent>
    </Popover>
  )
}

DateRangePicker.displayName = "DateRangePicker"

export default DateRangePicker
