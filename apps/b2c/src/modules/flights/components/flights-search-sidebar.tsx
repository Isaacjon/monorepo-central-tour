"use client"

import { HeartIcon, cn } from "ui"
import { useTranslations } from "next-intl"
import { useId, useState, type ReactNode } from "react"

import { FlightsDualTimeRange } from "./flights-dual-time-range"
import { FlightsFilterCheckboxRow } from "./flights-filter-checkbox-row"

const stopsSeed = [
  { key: "all", count: 395 },
  { key: "direct", count: 423 },
  { key: "one", count: 156 },
  { key: "two", count: 11 },
  { key: "three", count: 8 },
] as const

const airlineSeed = [
  { key: "all", count: 420 },
  { key: "uz", count: 120 },
  { key: "qatar", count: 98 },
  { key: "aa", count: 45 },
] as const

const classSeed = ["economy", "economy_premium", "business", "first"] as const
const mealSeed = ["all", "breakfast", "snack"] as const
const citySeed = ["dubai"] as const

const ratingKeys = [
  "any",
  "super9",
  "very8",
  "good7",
  "ok6",
  "fair5",
] as const

function FilterCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`flex w-64 flex-col gap-0 rounded-[20px] bg-white p-4 ${className ?? ""}`}
    >
      {children}
    </div>
  )
}

export function FlightsSearchSidebar() {
  const t = useTranslations("flights")
  const baseId = useId()
  const [favorites, setFavorites] = useState(false)
  const [stops, setStops] = useState<Record<string, boolean>>(
    () => Object.fromEntries(stopsSeed.map((r) => [r.key, r.key === "all"])) as Record<string, boolean>
  )
  const [airlines, setAirlines] = useState<Record<string, boolean>>(
    () => Object.fromEntries(airlineSeed.map((r) => [r.key, r.key === "all"])) as Record<string, boolean>
  )
  const [cabin, setCabin] = useState<Record<string, boolean>>(
    () => Object.fromEntries(classSeed.map((k) => [k, k === "economy"])) as Record<string, boolean>
  )
  const [meals, setMeals] = useState<Record<string, boolean>>(
    () => Object.fromEntries(mealSeed.map((k) => [k, k === "all"])) as Record<string, boolean>
  )
  const [cities, setCities] = useState<Record<string, boolean>>({ dubai: true })
  const [rating, setRating] = useState<string>("any")

  return (
    <aside className="flex w-64 shrink-0 flex-col gap-2" aria-label={t("searchFiltersAria")}>
      <div className="flex h-14 w-64 items-center justify-between gap-6 rounded-[20px] bg-white px-4">
        <span className="flex items-center gap-2">
          <HeartIcon className="size-6 text-[#0C111D]" width={24} height={24} aria-hidden />
          <span className="text-base leading-6 font-medium text-[#0C111D]">
            {t("searchSidebarFavorites")}
          </span>
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={favorites}
          aria-label={t("searchSidebarFavorites")}
          onClick={() => setFavorites((p) => !p)}
          className="bg-c-gray-100 relative h-7 w-12 shrink-0 rounded-full p-0.5 transition-colors"
        >
          <span
            className={cn(
              "block size-6 rounded-full shadow-sm transition-transform",
              favorites ? "bg-primary" : "bg-white"
            )}
            style={{ transform: favorites ? "translateX(20px)" : "translateX(0)" }}
          />
        </button>
      </div>

      <FilterCard>
        <h3 className="text-base leading-6 font-medium text-[#0C111D]">{t("searchSidebarStops")}</h3>
        <div className="mt-3 flex w-56 flex-col gap-2">
          {stopsSeed.map((row) => (
            <FlightsFilterCheckboxRow
              key={row.key}
              id={`${baseId}-stop-${row.key}`}
              label={t(`searchStops.${row.key}`)}
              count={row.count}
              checked={stops[row.key] ?? false}
              onCheckedChange={(v) => setStops((p) => ({ ...p, [row.key]: v }))}
            />
          ))}
        </div>
      </FilterCard>

      <FilterCard>
        <h3 className="text-base leading-6 font-medium text-[#0C111D]">
          {t("searchSidebarTimeTitle")}
        </h3>
        <p className="text-c-gray-500 mt-1 text-sm">TAS — DXB</p>
        <div className="mt-3 flex flex-col gap-4">
          <div>
            <p className="text-sm text-[#0C111D]">{t("searchSidebarDepartureTas")}</p>
            <FlightsDualTimeRange a11yLabel={t("searchSidebarDepartureTas")} className="mt-2" />
          </div>
          <div>
            <p className="text-sm text-[#0C111D]">{t("searchSidebarArrivalDxb")}</p>
            <FlightsDualTimeRange a11yLabel={t("searchSidebarArrivalDxb")} className="mt-2" />
          </div>
        </div>
      </FilterCard>

      <FilterCard>
        <h3 className="text-base leading-6 font-medium text-[#0C111D]">
          {t("searchSidebarAirlines")}
        </h3>
        <div className="mt-3 flex w-56 flex-col gap-2">
          {airlineSeed.map((row) => (
            <FlightsFilterCheckboxRow
              key={row.key}
              id={`${baseId}-air-${row.key}`}
              label={t(`searchAirlines.${row.key}`)}
              count={row.count}
              checked={airlines[row.key] ?? false}
              onCheckedChange={(v) => setAirlines((p) => ({ ...p, [row.key]: v }))}
            />
          ))}
        </div>
      </FilterCard>

      <FilterCard>
        <h3 className="text-base leading-6 font-medium text-[#0C111D]">
          {t("searchSidebarCabin")}
        </h3>
        <div className="mt-3 flex w-56 flex-col gap-2">
          {classSeed.map((k) => (
            <FlightsFilterCheckboxRow
              key={k}
              id={`${baseId}-cabin-${k}`}
              label={t(`searchCabin.${k}`)}
              checked={cabin[k] ?? false}
              onCheckedChange={(v) => setCabin((p) => ({ ...p, [k]: v }))}
            />
          ))}
        </div>
      </FilterCard>

      <FilterCard>
        <h3 className="text-base leading-6 font-medium text-[#0C111D]">
          {t("searchSidebarReviewRating")}
        </h3>
        <div className="mt-3 flex flex-col gap-2" role="radiogroup" aria-label={t("searchSidebarReviewRating")}>
          {ratingKeys.map((k) => (
            <label
              key={k}
              className="flex cursor-pointer items-center gap-2 text-sm text-[#0C111D]"
            >
              <input
                type="radio"
                name={`${baseId}-rating`}
                checked={rating === k}
                onChange={() => setRating(k)}
                className="text-primary h-4 w-4"
              />
              {t(`searchRating.${k}`)}
            </label>
          ))}
        </div>
      </FilterCard>

      <FilterCard>
        <h3 className="text-base leading-6 font-medium text-[#0C111D]">
          {t("searchSidebarMeals")}
        </h3>
        <div className="mt-3 flex w-56 flex-col gap-2">
          {mealSeed.map((k) => (
            <FlightsFilterCheckboxRow
              key={k}
              id={`${baseId}-meal-${k}`}
              label={t(`searchMeals.${k}`)}
              count={k === "all" ? 200 : 40}
              checked={meals[k] ?? false}
              onCheckedChange={(v) => setMeals((p) => ({ ...p, [k]: v }))}
            />
          ))}
        </div>
      </FilterCard>

      <FilterCard>
        <h3 className="text-base leading-6 font-medium text-[#0C111D]">
          {t("searchSidebarTransferCities")}
        </h3>
        <div className="mt-3 flex w-56 flex-col gap-2">
          {citySeed.map((k) => (
            <FlightsFilterCheckboxRow
              key={k}
              id={`${baseId}-city-${k}`}
              label={t(`searchTransferCities.${k}`)}
              count={88}
              checked={cities[k] ?? false}
              onCheckedChange={(v) => setCities((p) => ({ ...p, [k]: v }))}
            />
          ))}
        </div>
      </FilterCard>
    </aside>
  )
}
