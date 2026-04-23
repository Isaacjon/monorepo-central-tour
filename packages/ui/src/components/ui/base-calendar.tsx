"use client"

import { addDays, subDays } from "date-fns"
import type { Locale } from "date-fns"

import { ru } from "date-fns/locale"
import { ChevronLeft, ChevronRight } from "lucide-react"
import * as React from "react"
import { type DateRange, DayPicker, type Matcher } from "react-day-picker"

import { PrimaryButton } from "../../common/primary-button"
import { SecondaryGrayButton } from "../../common/secondary-gray-button"
import { cn } from "../../lib/utils"

export type BaseCalendarProps = React.ComponentProps<typeof DayPicker> & {
  locale?: Locale
}

function BaseCalendar({
  classNames,
  locale = ru,
  ...props
}: BaseCalendarProps) {
  const defaultClassNames = {
    root: "relative rdp-root p-4 w-max bg-white rounded-lg",
    week: "week flex w-full mt-1",
    weekdays: "weekdays flex w-full",
    months: "months relative flex flex-col gap-4",
    month: "month [&_table_tbody_tr:not(:last-child)_td]:",
    month_caption:
      "month_caption relative flex h-9 items-center justify-center mb-3",
    caption_label:
      "caption_label text-base font-semibold text-gray-700 capitalize",
    nav: "nav absolute top-0 left-0 right-0 flex items-center justify-between w-full z-[1]",
    button_previous: cn(
      "button_previous flex h-9 w-9 items-center justify-center rounded-lg p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors relative"
    ),
    button_next: cn(
      "button_next flex h-9 w-9 items-center justify-center rounded-lg p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors relative"
    ),
    weekday:
      "weekday w-10 px-2 py-2.5 text-sm font-medium text-gray-700 text-center capitalize",
    day_button:
      "day_button focus-visible:outlinefocus-visible:outline-blue-500/20 relative flex h-10 w-10 items-center justify-center rounded-3xl p-0 text-sm font-normal whitespace-nowrap text-gray-700 outline-offset-2 group-data-[disabled]:pointer-events-none group-data-[disabled]:cursor-not-allowed group-data-[disabled]:text-gray-300 group-data-[outside]:text-gray-200 group-data-[selected]:bg-blue-600 group-data-[selected]:font-medium group-data-[selected]:text-white group-[.range-end]:z-10 group-[.range-end]:bg-blue-600 group-[.range-end]:text-white group-[.range-middle]:bg-blue-50 group-[.range-middle]:text-gray-700 group-[.range-middle.rdp-outside]:text-gray-500 group-[.range-start]:z-10 group-[.range-start]:bg-blue-600 group-[.range-start]:text-white hover:bg-gray-50 hover:text-gray-700 hover:group-data-[selected]:bg-blue-600 hover:group-[.range-start]:text-white! focus:outline-none",
    day: "day group h-10 w-10 p-0 [&.range-end]:rounded-3xl [&.range-end]:rounded-l-none [&.range-end]:bg-blue-50 [&.range-middle]:rounded-none [&.range-middle]:bg-blue-50 [&.range-middle>button]:bg-blue-50! hover:[&.range-middle>button]:text-gray-700! [&.range-start]:rounded-l-3xl [&.range-start]:rounded-r-none [&.range-start]:bg-blue-50 [&.range-start.range-end]:rounded-3xl hover:[&.rdp-selected>button]:text-white [&:first-child]:rounded-l-3xl [&:first-child>button]:rounded-l-3xl [&:last-child]:rounded-r-3xl [&:last-child>button]:rounded-r-3xl",
    range_start: "range_start range-start",
    range_end: "range_end range-end",
    range_middle: "range_middle range-middle",
    today:
      "today *:after:pointer-events-none *:after:absolute *:after:bottom-1 *:after:start-1/2 *:after:z-10 *:after:size-[5px] *:after:-translate-x-1/2 *:after:rounded-full *:after:bg-blue-600 [&[data-selected]:not(.range-middle)>*]:after:hidden [&[data-disabled]>*]:after:hidden *:after:transition-colors",
    hidden: "hidden invisible",
    week_number:
      "week_number size-9 p-0 text-xs font-medium text-muted-foreground/80",
  }

  const defaultComponents = {
    Chevron: (props: React.SVGProps<SVGSVGElement>) => {
      if (props.orientation === "left") {
        return (
          <ChevronLeft
            size={20}
            strokeWidth={2}
            {...props}
            aria-hidden="true"
          />
        )
      }
      return (
        <ChevronRight size={20} strokeWidth={2} {...props} aria-hidden="true" />
      )
    },
  }

  const mergedComponents = {
    ...defaultComponents,
    ...props.components,
  }

  const mergedClassNames: typeof defaultClassNames = Object.keys(
    defaultClassNames
  ).reduce(
    (acc, key) => ({
      ...acc,
      [key]: classNames?.[key as keyof typeof classNames]
        ? cn(
            defaultClassNames[key as keyof typeof defaultClassNames],
            classNames[key as keyof typeof classNames]
          )
        : defaultClassNames[key as keyof typeof defaultClassNames],
    }),
    {} as typeof defaultClassNames
  )

  return (
    <DayPicker
      locale={locale}
      aria-label="calendar"
      {...props}
      classNames={mergedClassNames}
      components={mergedComponents}
    />
  )
}

BaseCalendar.displayName = "BaseCalendar"

interface BaseCalendarFooterProps {
  reset: () => void
  apply: () => void
  resetDisabled?: boolean
  applyDisabled?: boolean
  resetable?: boolean
}
function BaseCalendarFooter({
  reset,
  apply,
  resetDisabled,
  applyDisabled,
  resetable = true,
}: BaseCalendarFooterProps) {
  return (
    <div className="mt-0 flex items-center justify-end gap-3 border-t border-gray-200 p-4">
      {resetable && (
        <SecondaryGrayButton
          className="flex-1"
          onClick={reset}
          disabled={resetDisabled}
        >
          Сбросить
        </SecondaryGrayButton>
      )}
      <PrimaryButton
        className="flex-1"
        onClick={apply}
        disabled={applyDisabled}
      >
        Применить
      </PrimaryButton>
    </div>
  )
}

function getRangeRestrictedDisabledDates(
  currentSelection: DateRange | undefined,
  maxRangeDays?: number
): Matcher | undefined {
  if (!maxRangeDays || !currentSelection?.from) {
    return undefined
  }

  const maxDate = addDays(currentSelection.from, maxRangeDays - 1)
  const minDate = subDays(currentSelection.from, maxRangeDays - 1)

  return (date: Date) => date < minDate || date > maxDate
}

export { BaseCalendar, BaseCalendarFooter, getRangeRestrictedDisabledDates }
