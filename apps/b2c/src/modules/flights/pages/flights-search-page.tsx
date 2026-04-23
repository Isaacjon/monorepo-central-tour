import { getTranslations } from "next-intl/server"

import { AppHeader } from "@/shared/components/common/app-header"
import { B2cSiteFooter } from "@/shared/components/common/b2c-site-footer"

import { FlightsSearchEmptyState } from "../components/flights-search-empty-state"
import type { FlightSearchResult } from "../types/flight-search-result"

export async function FlightsSearchPage({
  lang,
  results,
}: {
  lang: string
  results: readonly FlightSearchResult[]
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
        {results.length === 0 ? (
          <FlightsSearchEmptyState
            copy={{
              title: t("searchResultsEmptyTitle"),
              imageAlt: t("searchResultsEmptyImageAlt"),
            }}
          />
        ) : (
          <div className="flex-1 px-6 py-6" />
        )}
      </main>

      <B2cSiteFooter lang={lang} />
    </div>
  )
}
