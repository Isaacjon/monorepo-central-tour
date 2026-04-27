"use client"

import { Search } from "lucide-react"
import { type CSSProperties } from "react"

import { cn } from "ui"

import {
  PRICE_GRAPH_COLUMN_PX,
  PRICE_GRAPH_MAX_HEIGHT_PX,
} from "./flights-search-price-graph.utils"

type FlightsSearchPriceGraphDayColumnProps = {
  day: number
  date: Date
  hasPrice: boolean
  barHeight: number
  isActive: boolean
  /** Shown in tooltip while this column is hovered (formatted price or unknown copy). */
  hoverPriceLabel: string
  tooltipAlign: "start" | "center" | "end"
  dayFmt: Intl.DateTimeFormat
  weekdayFmt: Intl.DateTimeFormat
  /** Accessible name when this day has a price (bar). */
  ariaLabelWithPrice: string
  /** Same text as unknown tooltip; used as aria-label for the search-only control. */
  unknownPriceLabel: string
  selected: boolean
  onSelect: () => void
  onPointerEnterColumn: () => void
  onPointerLeaveColumn: () => void
}

export function FlightsSearchPriceGraphDayColumn({
  day,
  date,
  hasPrice,
  barHeight,
  isActive,
  hoverPriceLabel,
  tooltipAlign,
  dayFmt,
  weekdayFmt,
  ariaLabelWithPrice,
  unknownPriceLabel,
  selected,
  onSelect,
  onPointerEnterColumn,
  onPointerLeaveColumn,
}: FlightsSearchPriceGraphDayColumnProps) {
  const colStyle = { width: PRICE_GRAPH_COLUMN_PX } as CSSProperties
  const showBubble = hoverPriceLabel !== ""
  const controlAriaLabel = hasPrice ? ariaLabelWithPrice : unknownPriceLabel

  const tooltipPositionClass =
    tooltipAlign === "start"
      ? "left-0 translate-x-0 items-start"
      : tooltipAlign === "end"
        ? "right-0 translate-x-0 items-end"
        : "left-1/2 -translate-x-1/2 items-center"

  const tooltipPointerClass =
    tooltipAlign === "start" ? "ml-4" : tooltipAlign === "end" ? "mr-4" : ""

  const tooltip = showBubble ? (
    <div
      className={cn(
        "pointer-events-none absolute bottom-full z-20 mb-1 flex flex-col",
        tooltipPositionClass
      )}
      role="tooltip"
    >
      <div className="bg-primary max-w-42 rounded-lg px-2.5 py-2 text-center text-xs leading-tight font-bold whitespace-normal text-white">
        {hoverPriceLabel}
      </div>
      <div
        className={cn(
          "border-t-primary h-0 w-0 border-x-[6px] border-t-[7px] border-x-transparent",
          tooltipPointerClass
        )}
      />
    </div>
  ) : null

  const graphTrackHeight = hasPrice ? barHeight : PRICE_GRAPH_COLUMN_PX

  return (
    <div
      data-price-graph-day={day}
      className="flex shrink-0 flex-col items-center"
      style={colStyle}
    >
      <div
        className="flex w-full flex-col items-center justify-end"
        style={{ ...colStyle, height: PRICE_GRAPH_MAX_HEIGHT_PX }}
      >
        <div
          className="relative shrink-0"
          style={{
            width: PRICE_GRAPH_COLUMN_PX,
            height: graphTrackHeight,
          }}
        >
          {tooltip}

          {hasPrice ? (
            <button
              type="button"
              onClick={onSelect}
              onPointerEnter={onPointerEnterColumn}
              onPointerLeave={onPointerLeaveColumn}
              className={cn(
                "absolute inset-0 min-h-2 rounded-t-[10px] transition-colors",
                isActive ? "bg-primary" : "bg-[#EAECF0]"
              )}
              aria-pressed={selected}
              aria-label={controlAriaLabel}
            />
          ) : (
            <button
              type="button"
              onClick={onSelect}
              onPointerEnter={onPointerEnterColumn}
              onPointerLeave={onPointerLeaveColumn}
              className={cn(
                "absolute inset-0 flex items-center justify-center rounded-lg transition-colors",
                isActive
                  ? "bg-primary text-white"
                  : "bg-[#EAECF0] text-[#98A2B3]"
              )}
              aria-pressed={selected}
              aria-label={controlAriaLabel}
            >
              <Search
                className="pointer-events-none size-5"
                strokeWidth={2}
                aria-hidden
              />
            </button>
          )}
        </div>
      </div>

      <div className="mt-2 flex w-full flex-col items-center gap-0.5 text-center">
        <span
          className={cn(
            "text-sm leading-none",
            isActive ? "text-primary font-bold" : "font-normal text-[#667085]"
          )}
        >
          {dayFmt.format(date)}
        </span>
        <span
          className={cn(
            "text-xs leading-none",
            isActive ? "text-primary font-bold" : "font-normal text-[#667085]"
          )}
        >
          {weekdayFmt.format(date)}
        </span>
      </div>
    </div>
  )
}
