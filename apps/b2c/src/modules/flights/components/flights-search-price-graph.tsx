"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { useCallback, useMemo, useState } from "react"

import { cn } from "ui"

import { FlightsSearchPriceGraphDayColumn } from "./flights-search-price-graph-day-column"
import {
  buildDemoMonthPriceSeries,
  createCalendarMonthSnapshot,
  isDemoFlightPriceUnknown,
  PRICE_GRAPH_GAP_PX,
} from "./flights-search-price-graph.utils"
import { useFlightsPriceGraphScroll } from "./use-flights-price-graph-scroll"

type FlightsSearchPriceGraphProps = {
  currency: string
}

export function FlightsSearchPriceGraph({
  currency,
}: FlightsSearchPriceGraphProps) {
  const t = useTranslations("flights")
  const locale = useLocale()
  const { monthDates, todayDay } = useMemo(
    () => createCalendarMonthSnapshot(),
    []
  )
  const todayIndex = todayDay - 1
  const {
    scrollerRef,
    canScrollPrev,
    canScrollNext,
    scrollMonthBy,
    syncScrollEdges,
  } = useFlightsPriceGraphScroll(todayDay)

  const daySeries = useMemo(
    () =>
      buildDemoMonthPriceSeries(monthDates, currency, isDemoFlightPriceUnknown),
    [currency, monthDates]
  )

  const [selectedBar, setSelectedBar] = useState(todayIndex)
  const [hoveredBar, setHoveredBar] = useState<number | null>(null)

  const { dayFmt, weekdayFmt, monthName } = useMemo(() => {
    const first = monthDates[0]
    return {
      dayFmt: new Intl.DateTimeFormat(locale, { day: "numeric" }),
      weekdayFmt: new Intl.DateTimeFormat(locale, { weekday: "short" }),
      monthName: first
        ? new Intl.DateTimeFormat(locale, { month: "long" }).format(first)
        : "",
    }
  }, [locale, monthDates])

  const unknownPriceCopy = t("searchPriceGraphUnknown")

  const tooltipText = useMemo(() => {
    if (hoveredBar === null) return ""
    const p = daySeries[hoveredBar]
    if (!p) return ""
    return !p.hasPrice ? unknownPriceCopy : (p.formatted ?? "")
  }, [daySeries, hoveredBar, unknownPriceCopy])

  const handleColumnEnter = useCallback((barIndex: number) => {
    setHoveredBar(barIndex)
  }, [])

  const handleBarLeave = useCallback(() => {
    setHoveredBar(null)
  }, [])

  return (
    <section
      className="rounded-2xl bg-white p-4"
      aria-label={t("searchPriceGraphTitle")}
    >
      <div className="text-c-text mb-4 text-base font-medium">
        {t("searchPriceGraphTitle")}
      </div>

      <div className="flex flex-col gap-3">
        <div className="relative isolate flex items-stretch gap-2">
          <button
            type="button"
            disabled={!canScrollPrev}
            aria-disabled={!canScrollPrev}
            onClick={() => scrollMonthBy(-1)}
            className={cn(
              "text-c-text hover:bg-c-gray-200 relative z-0 mt-auto mb-8 size-9 shrink-0 self-center rounded-full bg-[#F2F4F7]",
              canScrollPrev ? "" : "cursor-not-allowed opacity-40"
            )}
            aria-label={t("searchPriceGraphPrevious")}
          >
            <ChevronLeft className="mx-auto size-5" strokeWidth={2} />
          </button>

          <div
            ref={scrollerRef}
            onScroll={syncScrollEdges}
            className="relative z-10 min-w-0 flex-1 overflow-x-auto pt-10.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <div
              className="flex min-w-max justify-center px-2"
              style={{ gap: PRICE_GRAPH_GAP_PX }}
            >
              {monthDates.map((date, i) => {
                const day = i + 1
                const isNearStart = i < 2
                const isNearEnd = i >= monthDates.length - 2
                const isToday = i === todayIndex
                const row = daySeries[i]
                const hasPrice = row?.hasPrice ?? false
                const barHeight = row?.barHeightPx ?? 12
                const isActive =
                  isToday ||
                  hoveredBar === i ||
                  (hoveredBar === null && selectedBar === i)
                const hoverLabel = hoveredBar === i ? tooltipText : ""

                return (
                  <FlightsSearchPriceGraphDayColumn
                    key={day}
                    day={day}
                    date={date}
                    hasPrice={hasPrice}
                    barHeight={barHeight}
                    isActive={isActive}
                    hoverPriceLabel={hoverLabel}
                    tooltipAlign={
                      isNearStart ? "start" : isNearEnd ? "end" : "center"
                    }
                    dayFmt={dayFmt}
                    weekdayFmt={weekdayFmt}
                    ariaLabelWithPrice={t("searchPriceBarLabel", {
                      index: day,
                    })}
                    unknownPriceLabel={unknownPriceCopy}
                    selected={selectedBar === i}
                    onSelect={() => setSelectedBar(i)}
                    onPointerEnterColumn={() => handleColumnEnter(i)}
                    onPointerLeaveColumn={handleBarLeave}
                  />
                )
              })}
            </div>
          </div>

          <button
            type="button"
            disabled={!canScrollNext}
            aria-disabled={!canScrollNext}
            onClick={() => scrollMonthBy(1)}
            className={cn(
              "text-c-text hover:bg-c-gray-200 relative z-0 mt-auto mb-8 size-9 shrink-0 self-center rounded-full bg-[#F2F4F7]",
              canScrollNext ? "" : "cursor-not-allowed opacity-40"
            )}
            aria-label={t("searchPriceGraphNext")}
          >
            <ChevronRight className="mx-auto size-5" strokeWidth={2} />
          </button>
        </div>

        <div className="relative flex justify-center pt-0.5">
          <div className="absolute top-1/2 right-0 left-0 h-px -translate-y-1/2 bg-[#EAECF0]" />
          <span className="text-c-text relative bg-white px-3 text-sm font-normal">
            {monthName}
          </span>
        </div>
      </div>
    </section>
  )
}
