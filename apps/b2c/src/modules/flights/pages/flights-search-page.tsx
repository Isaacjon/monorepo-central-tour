import { getTranslations } from "next-intl/server"

import { AppHeader } from "@/shared/components/common/app-header"
import { B2cSiteFooter } from "@/shared/components/common/b2c-site-footer"
import { FlightsFilter } from "../components/filters/flights-filter"
import { FlightsSearchResultsSection } from "../components/search/flights-search-results-section"
import { flightsSearchQueryKey } from "../utils/flights-search-query-key"
import {
  getFlightsFilterCopy,
  getFlightsSearchRouteHref,
} from "../utils/get-flights-filter-copy"
import { parseFlightsFilterFromQuery } from "../utils/parse-flights-filter-from-query"

export async function FlightsSearchPage({
  lang,
  searchQuery,
}: {
  lang: string
  searchQuery: Readonly<Record<string, string | string[] | undefined>>
}) {
  const t = await getTranslations("flights")
  const th = await getTranslations("appHeader")
  const initialFilter = parseFlightsFilterFromQuery(searchQuery)
  const filterQueryKey = flightsSearchQueryKey(searchQuery)

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
              key={filterQueryKey}
              copy={getFlightsFilterCopy(t)}
              searchHref={getFlightsSearchRouteHref(lang)}
              initialFilter={initialFilter}
            />
          </div>
        </div>
        <FlightsSearchResultsSection searchQuery={searchQuery} />
      </main>

      <B2cSiteFooter lang={lang} />
    </div>
  )
}
