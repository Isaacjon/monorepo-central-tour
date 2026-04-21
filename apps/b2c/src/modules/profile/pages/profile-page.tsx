import { getTranslations } from "next-intl/server"

import { ProfileDataForm } from "@/modules/profile/components/profile-data-form"
import { ProfileHeader } from "@/modules/profile/components/profile-header"
import { ProfileNavSidebar } from "@/modules/profile/components/profile-nav-sidebar"

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

      <main className="ct-container py-6">
        <div className="flex items-start gap-4">
          <ProfileNavSidebar
            activeSection="customerData"
            copy={{
              customerData: t("sidebarCustomerData"),
              myBookings: t("sidebarMyBookings"),
              favorites: t("sidebarFavorites"),
              logout: t("sidebarLogout"),
            }}
          />

          <ProfileDataForm
            copy={{
              formTitle: t("formTitle"),
              firstNameLabel: t("formFirstName"),
              firstNamePlaceholder: t("formFirstNamePlaceholder"),
              lastNameLabel: t("formLastName"),
              lastNamePlaceholder: t("formLastNamePlaceholder"),
              middleNameLabel: t("formMiddleName"),
              middleNamePlaceholder: t("formMiddleNamePlaceholder"),
              phoneLabel: t("formPhone"),
              phonePlaceholder: t("formPhonePlaceholder"),
              emailLabel: t("formEmail"),
              emailPlaceholder: t("formEmailPlaceholder"),
              passportLabel: t("formPassport"),
              passportPlaceholder: t("formPassportPlaceholder"),
              birthDateLabel: t("formBirthDate"),
              birthDatePlaceholder: t("formBirthDatePlaceholder"),
              cancelLabel: t("formCancel"),
              saveLabel: t("formSave"),
            }}
          />
        </div>
      </main>
    </div>
  )
}
