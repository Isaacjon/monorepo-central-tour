"use client"

import { useTranslations } from "next-intl"
import { useId } from "react"

import { RadioGroup, RadioGroupItem } from "ui"

import { FlightsSearchFilterCard } from "./flights-search-filter-card"
import { FlightsSearchSidebarFavoritesBar } from "./flights-search-sidebar-favorites-bar"
import { airlineSeed, citySeed, classSeed, mealSeed, ratingKeys, stopsSeed } from "./flights-search-sidebar-seeds"
import { useFlightsSearchSidebarState } from "../../hooks/use-flights-search-sidebar-state"
import { FlightsDualTimeRange } from "../filters/flights-dual-time-range"
import { FlightsFilterCheckboxRow } from "../filters/flights-filter-checkbox-row"

type FlightsSearchSidebarProps = {
  departureAirportCode?: string
  arrivalAirportCode?: string
}

export function FlightsSearchSidebar({
  departureAirportCode = "TAS",
  arrivalAirportCode = "DXB",
}: FlightsSearchSidebarProps) {
  const t = useTranslations("flights")
  const baseId = useId()
  const {
    favorites,
    setFavorites,
    stops,
    setStops,
    airlines,
    setAirlines,
    cabin,
    setCabin,
    meals,
    setMeals,
    cities,
    setCities,
    rating,
    setRating,
  } = useFlightsSearchSidebarState()

  const depTimeLabel = t("searchSidebarDeparture", {
    code: departureAirportCode,
  })
  const arrTimeLabel = t("searchSidebarArrival", { code: arrivalAirportCode })

  return (
    <aside
      className="flex w-64 shrink-0 flex-col gap-2"
      aria-label={t("searchFiltersAria")}
    >
      <FlightsSearchSidebarFavoritesBar
        label={t("searchSidebarFavorites")}
        favorites={favorites}
        onFavoritesChange={setFavorites}
      />

      <FlightsSearchFilterCard>
        <h3 className="text-base leading-6 font-medium text-[#0C111D]">
          {t("searchSidebarStops")}
        </h3>
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
      </FlightsSearchFilterCard>

      <FlightsSearchFilterCard>
        <h3 className="text-base leading-6 font-medium text-[#0C111D]">
          {t("searchSidebarTimeTitle")}
        </h3>
        <p className="text-c-gray-500 mt-1 text-sm">
          {departureAirportCode} — {arrivalAirportCode}
        </p>
        <div className="mt-3 flex flex-col gap-4">
          <div>
            <p className="text-sm text-[#0C111D]">{depTimeLabel}</p>
            <FlightsDualTimeRange a11yLabel={depTimeLabel} className="mt-2" />
          </div>
          <div>
            <p className="text-sm text-[#0C111D]">{arrTimeLabel}</p>
            <FlightsDualTimeRange a11yLabel={arrTimeLabel} className="mt-2" />
          </div>
        </div>
      </FlightsSearchFilterCard>

      <FlightsSearchFilterCard>
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
              onCheckedChange={(v) =>
                setAirlines((p) => ({ ...p, [row.key]: v }))
              }
            />
          ))}
        </div>
      </FlightsSearchFilterCard>

      <FlightsSearchFilterCard>
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
      </FlightsSearchFilterCard>

      <FlightsSearchFilterCard>
        <h3 className="text-base leading-6 font-medium text-[#0C111D]">
          {t("searchSidebarReviewRating")}
        </h3>
        <RadioGroup
          value={rating}
          onValueChange={setRating}
          className="mt-3 flex flex-col gap-2"
          aria-label={t("searchSidebarReviewRating")}
        >
          {ratingKeys.map((k) => {
            const id = `${baseId}-rating-${k}`
            return (
              <div key={k} className="flex items-center gap-2">
                <RadioGroupItem value={k} id={id} />
                <label
                  htmlFor={id}
                  className="cursor-pointer text-sm text-[#0C111D]"
                >
                  {t(`searchRating.${k}`)}
                </label>
              </div>
            )
          })}
        </RadioGroup>
      </FlightsSearchFilterCard>

      <FlightsSearchFilterCard>
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
      </FlightsSearchFilterCard>

      <FlightsSearchFilterCard>
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
      </FlightsSearchFilterCard>
    </aside>
  )
}
