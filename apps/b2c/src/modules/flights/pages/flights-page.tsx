import { getTranslations } from "next-intl/server"

import { AppHeader } from "@/shared/components/common/app-header"
import { B2cSiteFooter } from "@/shared/components/common/b2c-site-footer"
import { WhyChooseUsSection } from "@/shared/components/common/why-choose-us-section"
import {
  AirplaneIcon,
  BuildingIcon,
  BusFilledIcon,
  CameraBoldIcon,
  CarRentalIcon,
  DealIcon,
  flightsBannerImage,
  HomeBanner,
  PalmTreeBoldIcon,
  type ServiceTabItem,
} from "ui"

import { FlightsAboutNumbersSection } from "../components/flights-about-numbers-section"
import { FlightsFilter } from "../components/flights-filter"
import { PopularAirTicketsSection } from "../components/popular-air-tickets-section"
import { RecentlySearchedFlightsSection } from "../components/recently-searched-flights-section"
import type { RecentFlightSearchItem } from "../types/recent-flight-search"
import {
  getFlightsFilterCopy,
  getFlightsSearchRouteHref,
} from "../utils/get-flights-filter-copy"

export async function FlightsPage({ lang }: { lang: string }) {
  const t = await getTranslations("flights")
  const th = await getTranslations("appHeader")

  const serviceTabs: ServiceTabItem[] = [
    {
      id: "flights",
      label: t("tabFlights"),
      icon: <AirplaneIcon width={20} height={20} />,
      href: `/${lang}/flights`,
    },
    {
      id: "hotels",
      label: t("tabHotels"),
      icon: <BuildingIcon width={20} height={20} />,
      href: `/${lang}`,
    },
    {
      id: "transfers",
      label: t("tabTransfers"),
      icon: <BusFilledIcon width={20} height={20} />,
      href: `/${lang}/transfers`,
    },
    {
      id: "excursions",
      label: t("tabExcursions"),
      icon: <CameraBoldIcon width={20} height={20} />,
      href: `/${lang}/excursions`,
    },
    {
      id: "car-rental",
      label: t("tabCarRental"),
      icon: <CarRentalIcon width={20} height={20} />,
      href: `/${lang}/car-rental`,
    },
    {
      id: "tour-packages",
      label: t("tabTourPackages"),
      icon: <PalmTreeBoldIcon width={20} height={20} />,
      href: `/${lang}/tour-packages`,
    },
    {
      id: "additional-services",
      label: t("tabAdditionalServices"),
      icon: <DealIcon width={20} height={20} />,
      href: `/${lang}/additional-services`,
    },
  ]

  const sampleRecentSearch: RecentFlightSearchItem = {
    id: "demo-1",
    airlineName: t("recentSearchSampleAirline"),
    fromCity: t("recentSearchSampleFrom"),
    toCity: t("recentSearchSampleTo"),
    dateRange: t("recentSearchSampleDates"),
    cabinClass: t("recentSearchSampleCabin"),
    priceDisplay: t("recentSearchSamplePrice"),
    detailsHref: `/${lang}/flights`,
  }
  const recentSearches: RecentFlightSearchItem[] = [
    { ...sampleRecentSearch, id: "recent-1" },
    { ...sampleRecentSearch, id: "recent-2" },
    { ...sampleRecentSearch, id: "recent-3" },
  ]

  const popularAirTickets: RecentFlightSearchItem[] = Array.from(
    { length: 8 },
    (_, i) => ({
      ...sampleRecentSearch,
      id: `popular-${i + 1}`,
    })
  )

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

      <main className="flex-1 py-6">
        <HomeBanner
          bannerImageSrc={flightsBannerImage}
          title={t("bannerTitle")}
          serviceTabs={serviceTabs}
          activeTabId="flights"
        >
          <FlightsFilter
            searchHref={getFlightsSearchRouteHref(lang)}
            copy={getFlightsFilterCopy(t)}
          />
        </HomeBanner>

        <RecentlySearchedFlightsSection
          copy={{
            sectionTitle: t("recentSearchesTitle"),
            detailsLabel: t("recentSearchDetails"),
            priceFromPrefix: t("priceFromPrefix"),
          }}
          items={recentSearches}
        />
        <FlightsAboutNumbersSection
          ctaHref={`/${lang}/tour-packages`}
          copy={{
            title: t("aboutNumbersTitle"),
            subtitle: t("aboutNumbersSubtitle"),
            stat1Number: t("aboutNumbersStat1Number"),
            stat1Label: t("aboutNumbersStat1Label"),
            stat2Number: t("aboutNumbersStat2Number"),
            stat2Label: t("aboutNumbersStat2Label"),
            stat3Number: t("aboutNumbersStat3Number"),
            stat3Label: t("aboutNumbersStat3Label"),
            ctaLabel: t("aboutNumbersCta"),
            image1Alt: t("aboutNumbersImage1Alt"),
            image2Alt: t("aboutNumbersImage2Alt"),
          }}
        />
        <PopularAirTicketsSection
          copy={{
            sectionTitle: t("popularAirTicketsTitle"),
            sectionSubtitle: t("popularAirTicketsSubtitle"),
            detailsLabel: t("recentSearchDetails"),
            priceFromPrefix: t("priceFromPrefix"),
          }}
          items={popularAirTickets}
        />

        <WhyChooseUsSection />
      </main>
      <B2cSiteFooter lang={lang} />
    </div>
  )
}
