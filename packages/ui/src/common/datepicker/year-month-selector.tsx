import {
  eachMonthOfInterval,
  eachYearOfInterval,
  endOfYear,
  format,
  startOfYear,
} from "date-fns"
import type { Locale } from "date-fns"

import { ru } from "date-fns/locale"
import { ChevronDown, ChevronUp } from "lucide-react"
import * as React from "react"

import { ScrollArea } from "../../components/ui/scroll-area"
import { cn } from "../../lib/utils"

interface YearMonthSelectorProps {
  yearRange: { startYear: number; endYear: number }
  currentMonth: Date
  onMonthSelect: (month: Date) => void
  locale?: Locale
}

const formatMonthName = (monthDate: Date, locale: Locale): string => {
  const formatted = format(monthDate, "MMM", { locale })
  const capitalized = formatted.charAt(0).toUpperCase() + formatted.slice(1)

  return capitalized.endsWith(".") ? capitalized.slice(0, -1) : capitalized
}

export default function YearMonthSelector({
  yearRange,
  currentMonth,
  onMonthSelect,
  locale = ru,
}: YearMonthSelectorProps) {
  const currentYear = currentMonth.getFullYear()

  // Find the nearest year in the range
  const nearestYear = React.useMemo(() => {
    if (currentYear < yearRange.startYear) {
      return yearRange.startYear
    }
    if (currentYear > yearRange.endYear) {
      return yearRange.endYear
    }
    return currentYear
  }, [currentYear, yearRange.startYear, yearRange.endYear])

  const [expandedYears, setExpandedYears] = React.useState<Set<number>>(
    new Set([nearestYear])
  )
  const nearestYearRef = React.useRef<HTMLButtonElement>(null)

  const years = React.useMemo(() => {
    return eachYearOfInterval({
      start: new Date(yearRange.startYear, 0, 1),
      end: new Date(yearRange.endYear, 11, 31),
    })
  }, [yearRange.startYear, yearRange.endYear])

  // Scroll to nearest year when component mounts or currentMonth changes
  React.useEffect(() => {
    // Use requestAnimationFrame to ensure the DOM is fully rendered
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (nearestYearRef.current) {
          nearestYearRef.current.scrollIntoView({
            block: "start",
          })
        }
      })
    })
  }, [currentMonth, nearestYear])

  const toggleYear = React.useCallback((year: number) => {
    setExpandedYears((prev) => {
      const next = new Set(prev)
      if (next.has(year)) {
        next.delete(year)
      } else {
        next.add(year)
      }
      return next
    })
  }, [])

  const handleMonthSelect = React.useCallback(
    (monthDate: Date) => {
      onMonthSelect(monthDate)
    },
    [onMonthSelect]
  )

  const isMonthSelected = React.useCallback(
    (monthDate: Date) => {
      return (
        monthDate.getFullYear() === currentMonth.getFullYear() &&
        monthDate.getMonth() === currentMonth.getMonth()
      )
    },
    [currentMonth]
  )

  return (
    <ScrollArea className="h-[400px] w-full">
      <div>
        {years.map((yearDate, idx, arr) => {
          const year = yearDate.getFullYear()
          const isExpanded = expandedYears.has(year)
          const months = eachMonthOfInterval({
            start: startOfYear(yearDate),
            end: endOfYear(yearDate),
          })

          const isNearestYear = year === nearestYear

          return (
            <div
              key={year}
              className={cn(
                idx !== arr.length - 1 &&
                  "border-b border-gray-200 md:border-b-0"
              )}
            >
              <button
                ref={isNearestYear ? nearestYearRef : null}
                type="button"
                onClick={() => toggleYear(year)}
                className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-base font-semibold text-gray-700 transition-colors md:hover:bg-gray-50"
              >
                <span>{year}</span>
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4 text-gray-500" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                )}
              </button>

              {isExpanded && (
                <div className="my-2 grid grid-cols-3 gap-2 px-2">
                  {months.map((monthDate) => {
                    const isSelected = isMonthSelected(monthDate)
                    return (
                      <button
                        key={monthDate.getTime()}
                        type="button"
                        onClick={() => handleMonthSelect(monthDate)}
                        className={cn(
                          "rounded-lg border px-2 py-1.5 text-sm font-medium transition-colors",
                          isSelected
                            ? "border-blue-600 bg-blue-600 text-white"
                            : "border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50"
                        )}
                      >
                        <span className="line-clamp-1 overflow-hidden text-ellipsis whitespace-nowrap">
                          {formatMonthName(monthDate, locale)}
                        </span>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </ScrollArea>
  )
}
