"use client"

import { format } from "date-fns"
import type { Locale } from "date-fns"
import * as React from "react"
import { type DateRange, type Matcher, type Modifiers } from "react-day-picker"

import { getRangeRestrictedDisabledDates } from "../../components/ui/base-calendar"

type UseDateRangePickerStateParams = {
  selected?: DateRange
  onSelect?: (range?: DateRange | null) => void
  clearable: boolean
  disabledDates?: Matcher | Matcher[]
  maxRangeDays?: number
  showFooter: boolean
  commitFromWithoutTo: boolean
  locale: Locale
  fromPlaceholder: string
  toPlaceholder: string
}

export function useDateRangePickerState({
  selected,
  onSelect,
  clearable,
  disabledDates,
  maxRangeDays,
  showFooter,
  commitFromWithoutTo,
  locale,
  fromPlaceholder,
  toPlaceholder,
}: UseDateRangePickerStateParams) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [tempRange, setTempRange] = React.useState<DateRange | undefined>(undefined)

  const { fromDisplayValue, toDisplayValue, hasFromValue, hasToValue } =
    React.useMemo(() => {
      const valueToShow = tempRange ?? selected
      const fromDateValue = valueToShow?.from
      const toDateValue = valueToShow?.to

      return {
        fromDisplayValue: fromDateValue
          ? format(fromDateValue, "d MMM yyyy.", { locale })
          : fromPlaceholder,
        toDisplayValue: toDateValue
          ? format(toDateValue, "d MMM yyyy.", { locale })
          : toPlaceholder,
        hasFromValue: Boolean(fromDateValue),
        hasToValue: Boolean(toDateValue),
      }
    }, [fromPlaceholder, locale, selected, tempRange, toPlaceholder])

  const defaultMonth = React.useMemo(() => {
    const valueToShow = tempRange ?? selected
    return valueToShow?.from || undefined
  }, [tempRange, selected])

  const handleOpenChange = React.useCallback((open: boolean) => {
    if (!open) {
      setTempRange(undefined)
    }
    setIsOpen(open)
  }, [])

  const handleReset = React.useCallback(() => {
    setTempRange(undefined)
    onSelect?.(null)
    setIsOpen(false)
  }, [onSelect])

  const handleApply = React.useCallback(
    (_e?: React.MouseEvent | React.KeyboardEvent, valueToSet?: DateRange) => {
      onSelect?.(valueToSet || tempRange)
      setTempRange(undefined)
      setIsOpen(false)
    },
    [onSelect, tempRange]
  )

  const handleFromDateSelect = React.useCallback(
    (triggerDate: Date) => {
      const valueToSet = { from: triggerDate, to: undefined }
      if (commitFromWithoutTo) {
        onSelect?.(valueToSet)
        setTempRange(undefined)
        setIsOpen(false)
        return
      }
      setTempRange(valueToSet)
    },
    [commitFromWithoutTo, onSelect]
  )

  const handleToDateSelect = React.useCallback(
    (triggerDate: Date) => {
      if (!tempRange?.from) return
      const fromDate = tempRange.from < triggerDate ? tempRange.from : triggerDate
      const toDate = tempRange.from > triggerDate ? tempRange.from : triggerDate
      const valueToSet = { from: fromDate, to: toDate }
      if (!showFooter) {
        handleApply(undefined, valueToSet)
        return
      }
      setTempRange(valueToSet)
    },
    [handleApply, showFooter, tempRange]
  )

  const handleSelect = React.useCallback(
    (
      _selected: DateRange | undefined,
      triggerDate: Date,
      _modifiers: Modifiers,
      _e: React.MouseEvent | React.KeyboardEvent
    ): void => {
      if (!tempRange?.from) {
        handleFromDateSelect(triggerDate)
      } else if (tempRange?.to) {
        setTempRange({ from: triggerDate, to: undefined })
      } else {
        handleToDateSelect(triggerDate)
      }
    },
    [handleFromDateSelect, handleToDateSelect, tempRange]
  )

  const handleClear = React.useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      e.preventDefault()
      handleReset()
    },
    [handleReset]
  )

  const canClearValue = React.useMemo(() => {
    if (!isOpen || !clearable) return false
    return Boolean(selected?.from || selected?.to)
  }, [clearable, isOpen, selected?.from, selected?.to])

  const combinedDisabledDates = React.useMemo(() => {
    const rangeRestriction = getRangeRestrictedDisabledDates(tempRange, maxRangeDays)
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
  }, [disabledDates, maxRangeDays, tempRange])

  return {
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
  }
}
