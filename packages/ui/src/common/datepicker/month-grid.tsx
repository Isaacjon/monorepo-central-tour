import type { Locale } from "date-fns"
import React from "react"

import YearMonthSelector from "./year-month-selector"

interface MonthGridProps extends React.TableHTMLAttributes<HTMLTableElement> {
  children?: React.ReactNode
  enableYearMonthPicker?: boolean
  isYearView: boolean
  yearRange: { startYear: number; endYear: number }
  currentMonth: Date
  onMonthSelect: (monthDate: Date) => void
  onCloseYearView: () => void
  locale?: Locale
}

export default function MonthGrid({
  children,
  className,
  enableYearMonthPicker,
  isYearView,
  yearRange,
  currentMonth,
  onMonthSelect,
  onCloseYearView,
  locale,
  ...restProps
}: MonthGridProps) {
  if (!enableYearMonthPicker) {
    return (
      <table className={className} {...restProps}>
        {children}
      </table>
    )
  }

  return (
    <div className="relative">
      <table className={className} {...restProps}>
        {children}
      </table>

      {isYearView && (
        <div className="absolute inset-0 z-20 rounded-lg bg-white">
          <YearMonthSelector
            yearRange={yearRange}
            currentMonth={currentMonth}
            onMonthSelect={(monthDate) => {
              onMonthSelect(monthDate)
              onCloseYearView()
            }}
            locale={locale}
          />
        </div>
      )}
    </div>
  )
}
