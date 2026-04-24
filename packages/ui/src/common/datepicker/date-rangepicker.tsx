"use client"

import { format } from "date-fns"
import type { Locale } from "date-fns"
import { ru } from "date-fns/locale"

import * as React from "react"
import { type DateRange, type Matcher, type Modifiers } from "react-day-picker"

import { DateRangePickerTrigger } from "./date-range-picker-trigger"
import {
  BaseCalendar,
  BaseCalendarFooter,
  getRangeRestrictedDisabledDates,
} from "../../components/ui/base-calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover"
import { cn } from "../../lib/utils"

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
  const [isOpen, setIsOpen] = React.useState(false)
  const [tempRange, setTempRange] = React.useState<DateRange | undefined>(
    undefined
  )

  const activeFromPlaceholder = fromPlaceholder ?? placeholder
  const activeToPlaceholder = toPlaceholder ?? placeholder

  const { fromDisplayValue, toDisplayValue, hasFromValue, hasToValue } =
    React.useMemo(() => {
      const valueToShow = tempRange ?? selected
      const fromDateValue = valueToShow?.from
      const toDateValue = valueToShow?.to

      return {
        fromDisplayValue: fromDateValue
          ? format(fromDateValue, "d MMM yyyy.", { locale })
          : activeFromPlaceholder,
        toDisplayValue: toDateValue
          ? format(toDateValue, "d MMM yyyy.", { locale })
          : activeToPlaceholder,
        hasFromValue: Boolean(fromDateValue),
        hasToValue: Boolean(toDateValue),
      }
    }, [
      tempRange,
      selected,
      locale,
      activeFromPlaceholder,
      activeToPlaceholder,
    ])

  const defaultMonth = React.useMemo(() => {
    const valueToShow = tempRange ?? selected
    return valueToShow?.from || undefined
  }, [tempRange, selected])

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setTempRange(undefined)
    }
    setIsOpen(open)
  }

  const handleReset = () => {
    setTempRange(undefined)
    onSelect?.(null)
    setIsOpen(false)
  }

  const handleApply = (
    _e?: React.MouseEvent | React.KeyboardEvent,
    valueToSet?: DateRange
  ) => {
    onSelect?.(valueToSet || tempRange)
    setTempRange(undefined)
    setIsOpen(false)
  }

  const handleFromDateSelect = (triggerDate: Date) => {
    const valueToSet = { from: triggerDate, to: undefined }
    if (commitFromWithoutTo) {
      onSelect?.(valueToSet)
      setTempRange(undefined)
      setIsOpen(false)
      return
    }
    setTempRange(valueToSet)
  }

  const handleToDateSelect = (triggerDate: Date) => {
    // choosing to date - set to date
    if (!tempRange?.from) return
    const fromDate = tempRange.from < triggerDate ? tempRange.from : triggerDate
    const toDate = tempRange.from > triggerDate ? tempRange.from : triggerDate
    const valueToSet = { from: fromDate, to: toDate }
    if (!showFooter) {
      handleApply(undefined, valueToSet)
    } else {
      setTempRange(valueToSet)
    }
  }

  const handleNewSelection = (triggerDate: Date) => {
    // Both dates already selected - start new selection
    const valueToSet = { from: triggerDate, to: undefined }
    setTempRange(valueToSet)
  }

  const handleSelect = (
    _selected: DateRange | undefined,
    triggerDate: Date,
    _modifiers: Modifiers,
    _e: React.MouseEvent | React.KeyboardEvent
  ): void => {
    if (!tempRange?.from) {
      handleFromDateSelect(triggerDate)
    } else if (tempRange?.to) {
      handleNewSelection(triggerDate)
    } else {
      handleToDateSelect(triggerDate)
    }
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    handleReset()
  }

  const canClearValue = React.useMemo(() => {
    if (!isOpen || !clearable) return false
    return Boolean(selected?.from || selected?.to)
  }, [clearable, isOpen, selected?.from, selected?.to])

  const combinedDisabledDates = React.useMemo(() => {
    const rangeRestriction = getRangeRestrictedDisabledDates(
      tempRange,
      maxRangeDays
    )

    if (!rangeRestriction) {
      return disabledDates
    }

    if (!disabledDates) {
      return rangeRestriction
    }

    if (Array.isArray(disabledDates)) {
      return [...disabledDates, rangeRestriction] as Matcher[]
    }

    return [disabledDates, rangeRestriction] as Matcher[]
  }, [disabledDates, tempRange, maxRangeDays])

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
