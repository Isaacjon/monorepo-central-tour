import { getTranslations } from "next-intl/server"

import { AppHeader } from "@/shared/components/common/app-header"
import { B2cSiteFooter } from "@/shared/components/common/b2c-site-footer"
import { FlightsFilter } from "../components/flights-filter"
import { FlightsSearchEmptyState } from "../components/flights-search-empty-state"
import { FlightsSearchResultsBody } from "../components/flights-search-results-body"
import type { FlightSearchResult } from "../types/flight-search-result"
import {
  getFlightsFilterCopy,
  getFlightsSearchRouteHref,
} from "../utils/get-flights-filter-copy"

export async function FlightsSearchPage({
  lang,
  results,
  totalCount,
}: {
  lang: string
  results: readonly FlightSearchResult[]
  totalCount: number
}) {
  const t = await getTranslations("flights")
  const th = await getTranslations("appHeader")

  return (
    <div className="flex min-h-screen flex-col bg-[#F5F7FB]">
      <AppHeader
        lang={lang}
        activeNav="flights"
        copy={{
          language: th("language"),
          languageDropdownTitle: th("languageDropdownTitle"),
          currency: th("currency"),
          currencyModalTitle: th("currencyModalTitle"),
          currencyFeaturedSectionTitle: th("currencyFeaturedSectionTitle"),
          currencyAllSectionTitle: th("currencyAllSectionTitle"),
          notificationTitle: th("notificationTitle"),
          notificationEmptyLabel: th("notificationEmptyLabel"),
          authLabel: th("authLabel"),
          navFlights: th("navFlights"),
          navHotels: th("navHotels"),
          navTransfers: th("navTransfers"),
          navExcursions: th("navExcursions"),
          navCarRental: th("navCarRental"),
          navTourPackages: th("navTourPackages"),
          navAdditionalServices: th("navAdditionalServices"),
        }}
      />

      <main className="flex flex-1 flex-col">
        <div className="ct-container py-6">
          <div
            className="rounded-[24px] bg-white p-5"
            style={{
              boxShadow: "0px 12px 100px 0px rgba(0,0,0,0.04)",
            }}
          >
            <FlightsFilter
              copy={getFlightsFilterCopy(t)}
              searchHref={getFlightsSearchRouteHref(lang)}
            />
          </div>
        </div>
        {results.length === 0 ? (
          <FlightsSearchEmptyState
            copy={{
              title: t("searchResultsEmptyTitle"),
              imageAlt: t("searchResultsEmptyImageAlt"),
            }}
          />
        ) : (
          <FlightsSearchResultsBody totalCount={totalCount} results={results} />
        )}
      </main>

      <B2cSiteFooter lang={lang} />
    </div>
  )
}
