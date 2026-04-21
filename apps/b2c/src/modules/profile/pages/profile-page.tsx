import { getTranslations } from "next-intl/server"

import { ProfileHeader } from "@/modules/profile/components/profile-header"

export async function ProfilePage({ lang }: { lang: string }) {
  const t = await getTranslations("profile")

  return (
    <div className="min-h-screen bg-[#F5F7FB]">
      <ProfileHeader
        lang={lang}
        copy={{
          language: t("language"),
          languageDropdownTitle: t("languageDropdownTitle"),
          currency: t("currency"),
          currencyModalTitle: t("currencyModalTitle"),
          currencyFeaturedSectionTitle: t("currencyFeaturedSectionTitle"),
          currencyAllSectionTitle: t("currencyAllSectionTitle"),
          notificationTitle: t("notificationTitle"),
          notificationEmptyLabel: t("notificationEmptyLabel"),
          authLabel: t("authLabel"),
          navFlights: t("navFlights"),
          navHotels: t("navHotels"),
          navTransfers: t("navTransfers"),
          navExcursions: t("navExcursions"),
          navCarRental: t("navCarRental"),
          navTourPackages: t("navTourPackages"),
          navAdditionalServices: t("navAdditionalServices"),
        }}
      />
      <main className="ct-container py-10">
        <h1 className="text-3xl font-semibold tracking-tight text-[#0C111D]">
          {t("title")} · {lang.toUpperCase()}
        </h1>
        <p className="mt-2 text-base text-[#667085]">{t("description")}</p>
      </main>
    </div>
  )
}
