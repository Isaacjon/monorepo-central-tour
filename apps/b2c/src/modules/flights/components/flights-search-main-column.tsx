"use client"

import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react"
import { useTranslations } from "next-intl"
import { type CSSProperties, useState } from "react"

import { cn } from "ui"

import { FlightsSearchFlightCard } from "./flights-search-flight-card"
import type { FlightSearchResult } from "../types/flight-search-result"

const dayTabValues = [4, 5, 6, 7, 8, 9, 10] as const

const priceHeights = [32, 48, 24, 40, 56, 64, 44, 36, 52, 30, 38, 46, 50, 42] as const

type FlightsSearchMainColumnProps = {
  results: readonly FlightSearchResult[]
}

type SortId = "popularity" | "price" | "rating"

export function FlightsSearchMainColumn({ results }: FlightsSearchMainColumnProps) {
  const t = useTranslations("flights")
  const [activeDays, setActiveDays] = useState(7)
  const [activeBar, setActiveBar] = useState(5)
  const [sort, setSort] = useState<SortId>("popularity")
  const [up, setUp] = useState(false)

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-4">
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label={t("searchDateTabsLabel")}
      >
        {dayTabValues.map((d) => (
          <button
            key={d}
            type="button"
            role="tab"
            aria-selected={activeDays === d}
            onClick={() => setActiveDays(d)}
            className={cn(
              "h-9 rounded-full px-3 text-sm font-medium leading-5",
              activeDays === d
                ? "bg-primary text-white"
                : "text-c-text bg-white hover:bg-c-gray-100"
            )}
          >
            {t("searchDateTabDays", { count: d })}
          </button>
        ))}
      </div>

      <section
        className="rounded-2xl bg-white p-4"
        aria-label={t("searchPriceGraphTitle")}
      >
        <div className="text-c-text mb-3 flex items-center justify-between text-base font-medium">
          {t("searchPriceGraphTitle")}
          <div className="text-c-text flex items-center gap-1">
            <button
              type="button"
              className="text-c-text hover:text-primary size-8 rounded-lg hover:bg-c-gray-100"
              aria-label={t("searchPriceGraphZoomIn")}
            >
              <ZoomIn className="size-4" />
            </button>
            <button
              type="button"
              className="text-c-text hover:text-primary size-8 rounded-lg hover:bg-c-gray-100"
              aria-label={t("searchPriceGraphZoomOut")}
            >
              <ZoomOut className="size-4" />
            </button>
            <button
              type="button"
              className="text-c-text hover:text-primary size-8 rounded-lg hover:bg-c-gray-100"
              aria-label={t("searchPriceGraphPrevious")}
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              className="text-c-text hover:text-primary size-8 rounded-lg hover:bg-c-gray-100"
              aria-label={t("searchPriceGraphNext")}
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
        <div className="relative flex h-40 items-end justify-between gap-1 px-1">
          {priceHeights.map((h, i) => (
            <div key={i} className="relative flex flex-1 flex-col items-center">
              {activeBar === i && (
                <span
                  className="bg-c-text absolute -top-8 left-1/2 z-10 -translate-x-1/2 rounded-md px-2 py-0.5 text-xs font-medium text-white"
                  style={{ minWidth: "3rem" }}
                >
                  $ 772
                </span>
              )}
              <button
                type="button"
                onClick={() => setActiveBar(i)}
                className={cn(
                  "w-full max-w-3 min-h-4 rounded-t-sm",
                  activeBar === i ? "bg-primary" : "bg-[#EAECF0]"
                )}
                style={{ height: h } as CSSProperties}
                aria-pressed={activeBar === i}
                aria-label={t("searchPriceBarLabel", { index: i + 1 })}
              />
            </div>
          ))}
        </div>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-c-text flex min-w-0 flex-wrap items-center gap-2 text-sm">
          <span className="shrink-0 font-medium whitespace-nowrap">
            {t("searchSortBy")}
          </span>
          {(["popularity", "price", "rating"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                if (s === "popularity" && s === sort) {
                  setUp((u) => !u)
                } else {
                  setSort(s)
                }
              }}
              className={cn(
                "inline-flex h-8 items-center gap-0.5 rounded-lg px-2.5 text-sm",
                sort === s
                  ? "bg-c-selected text-c-highlight font-medium"
                  : "text-c-text"
              )}
            >
              {t(`searchSort.${s}`)}
              {s === "popularity" && sort === s && up && <span>↑</span>}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="h-8 shrink-0 rounded-lg bg-primary px-4 text-sm font-medium text-white"
        >
          {t("searchCompare")}
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {results.map((f) => (
          <FlightsSearchFlightCard key={f.id} flight={f} />
        ))}
      </div>
    </div>
  )
}
