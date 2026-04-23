"use client"

import type { Locale } from "date-fns"

import { ru } from "date-fns/locale"
import * as React from "react"
import { type Matcher } from "react-day-picker"

import { DatepickerTrigger } from "./datepicker-trigger"
import { useDatepicker } from "./use-datepicker"
import {
  BaseCalendar,
  BaseCalendarFooter,
} from "../../components/ui/base-calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover"
import { cn } from "../../lib/utils"

export type DatepickerProps = Omit<
  React.ComponentProps<typeof BaseCalendar>,
  "mode" | "selected" | "onSelect"
> & {
  placeholder?: string
  selected?: Date
  onSelect?: (date?: Date | null) => void
  disabled?: boolean
  disabledDates?: Matcher | Matcher[]
  showFooter?: boolean
  "aria-invalid"?: boolean
  enableYearMonthPicker?: boolean
  yearRange?: { startYear: number; endYear: number }
  locale?: Locale
  defaultMonth?: Date
}

function Datepicker({
  className,
  showOutsideDays = true,
  placeholder = "дд.мм.гггг",
  selected,
  onSelect,
  disabled = false,
  disabledDates,
  showFooter = false,
  enableYearMonthPicker,
  yearRange,
  locale = ru,
  defaultMonth,
  ...props
}: DatepickerProps) {
  const {
    isOpen,
    month,
    displayValue,
    canClearValue,
    tempSelected,
    handleOpenChange,
    handleSelect,
    handleReset,
    handleApply,
    getCalendarComponents,
    setMonth,
  } = useDatepicker({
    selected,
    onSelect,
    showFooter,
    enableYearMonthPicker,
    yearRange,
    locale,
    placeholder,
    defaultMonth,
  })

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    handleReset()
  }

  const calendarComponents = React.useMemo(
    () => getCalendarComponents(props.components),
    [getCalendarComponents, props.components]
  )

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <DatepickerTrigger
          displayValue={displayValue}
          canClearValue={canClearValue}
          disabled={disabled}
          isOpen={isOpen}
          className={className}
          aria-invalid={props?.["aria-invalid"]}
          selected={selected}
          tempSelected={tempSelected}
          onClear={handleClear}
        />
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="z-10 w-auto rounded-lg border border-gray-200 bg-white p-0 shadow-none"
      >
        <BaseCalendar
          month={enableYearMonthPicker ? month : undefined}
          onMonthChange={enableYearMonthPicker ? setMonth : undefined}
          defaultMonth={
            enableYearMonthPicker ? undefined : selected || undefined
          }
          mode="single"
          showOutsideDays={showOutsideDays}
          className={cn(className)}
          selected={(tempSelected ?? selected) || undefined}
          onSelect={handleSelect || undefined}
          disabled={disabledDates}
          components={calendarComponents}
          locale={locale}
          {...props}
        />
        {showFooter && (
          <BaseCalendarFooter
            reset={handleReset}
            apply={handleApply}
            applyDisabled={!tempSelected}
          />
        )}
      </PopoverContent>
    </Popover>
  )
}

Datepicker.displayName = "Datepicker"

export default Datepicker
