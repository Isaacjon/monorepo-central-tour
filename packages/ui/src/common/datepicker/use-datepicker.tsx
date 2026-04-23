import { format } from "date-fns"
import type { Locale } from "date-fns"

import { ru } from "date-fns/locale"
import * as React from "react"
import type { CustomComponents } from "react-day-picker"

import CaptionLabel from "./caption-label"
import MonthGrid from "./month-grid"

const DEFAULT_YEAR_RANGE = { startYear: 1970, endYear: 2030 }

interface UseDatepickerProps {
  selected?: Date
  onSelect?: (date?: Date | null) => void
  showFooter?: boolean
  enableYearMonthPicker?: boolean
  yearRange?: { startYear: number; endYear: number }
  locale?: Locale
  placeholder?: string
  defaultMonth?: Date
}

export function useDatepicker({
  selected,
  onSelect,
  showFooter = false,
  enableYearMonthPicker,
  yearRange,
  locale = ru,
  placeholder = "дд.мм.гггг",
  defaultMonth,
}: UseDatepickerProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [tempSelected, setTempSelected] = React.useState<Date | undefined>(
    undefined
  )
  const [month, setMonth] = React.useState<Date>(
    selected ?? defaultMonth ?? new Date()
  )
  const [isYearView, setIsYearView] = React.useState(false)

  const computedYearRange = React.useMemo(
    () => yearRange ?? DEFAULT_YEAR_RANGE,
    [yearRange]
  )

  const currentMonth = React.useMemo(() => month ?? new Date(), [month])

  React.useEffect(() => {
    let timeout: NodeJS.Timeout | undefined
    if (selected) {
      timeout = setTimeout(() => {
        setMonth(selected)
      }, 0)
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }
    }
  }, [selected])

  const displayValue = React.useMemo(() => {
    const valueToShow = tempSelected ?? selected
    if (!valueToShow) return placeholder
    return format(valueToShow, "dd.MM.yyyy", { locale })
  }, [tempSelected, selected, placeholder, locale])

  const canClearValue = React.useMemo(() => {
    if (!isOpen) return false
    return Boolean(tempSelected ?? selected)
  }, [isOpen, tempSelected, selected])

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setTempSelected(undefined)
      setMonth(selected ?? defaultMonth ?? new Date())
      setIsYearView(false)
    } else {
      setMonth(selected ?? defaultMonth ?? new Date())
      setIsYearView(false)
    }
    setIsOpen(open)
  }

  const handleSelect = (date?: Date) => {
    if (showFooter) {
      setTempSelected(date)
    } else {
      onSelect?.(date)
      setIsOpen(false)
    }
  }

  const handleReset = () => {
    setTempSelected(undefined)
    onSelect?.(null)
    setIsOpen(false)
  }

  const handleApply = () => {
    onSelect?.(tempSelected)
    setTempSelected(undefined)
    setIsOpen(false)
  }

  const toggleYearView = React.useCallback(() => {
    setIsYearView((v) => !v)
  }, [])

  const closeYearView = React.useCallback(() => {
    setIsYearView(false)
  }, [])

  const CaptionLabelComponent = React.useCallback(
    ({
      children,
    }: React.HTMLAttributes<HTMLSpanElement> & {
      children?: React.ReactNode
    }) => (
      <CaptionLabel
        enableYearMonthPicker={enableYearMonthPicker}
        isYearView={isYearView}
        onToggleYearView={toggleYearView}
      >
        {children}
      </CaptionLabel>
    ),
    [enableYearMonthPicker, isYearView, toggleYearView]
  )

  const MonthGridComponent = React.useCallback(
    (props: React.TableHTMLAttributes<HTMLTableElement>) => (
      <MonthGrid
        {...props}
        enableYearMonthPicker={enableYearMonthPicker}
        isYearView={isYearView}
        yearRange={computedYearRange}
        currentMonth={currentMonth}
        onMonthSelect={setMonth}
        onCloseYearView={closeYearView}
        locale={locale}
      />
    ),
    [
      enableYearMonthPicker,
      isYearView,
      computedYearRange,
      currentMonth,
      setMonth,
      closeYearView,
      locale,
    ]
  )

  const getCalendarComponents = React.useCallback(
    (existingComponents?: Partial<CustomComponents>) => {
      if (!enableYearMonthPicker) {
        return existingComponents
      }

      return {
        ...(existingComponents || {}),
        CaptionLabel: CaptionLabelComponent,
        MonthGrid: MonthGridComponent,
      }
    },
    [enableYearMonthPicker, CaptionLabelComponent, MonthGridComponent]
  )

  return {
    isOpen,
    month,
    displayValue,
    canClearValue,
    tempSelected,
    currentMonth,
    handleOpenChange,
    handleSelect,
    handleReset,
    handleApply,
    getCalendarComponents,
    setMonth,
  }
}
