import { getTranslations } from "next-intl/server"

import { AppHeader } from "@/shared/components/common/app-header"
import { B2cSiteFooter } from "@/shared/components/common/b2c-site-footer"
import { FlightsCheckoutFlightCard } from "../components/flights-checkout-flight-card"

export async function FlightsCheckoutPage({ lang }: { lang: string }) {
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

      <main className="ct-container flex flex-1 py-8">
        <FlightsCheckoutFlightCard lang={lang} />
      </main>

      <B2cSiteFooter lang={lang} />
    </div>
  )
}
