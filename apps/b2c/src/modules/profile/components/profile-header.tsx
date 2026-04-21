import Image from "next/image"
import { Suspense } from "react"
import type { ProfileHeaderCopy } from "@/modules/profile/types/profile-header-copy"
import { HeaderMiniBlock, HeartIcon, NotificationsDropdown, UserIcon } from "ui"
import { ProfileCurrencyChanger } from "./profile-currency-changer"
import { ProfileLanguageChanger } from "./profile-language-changer"

const LOGO_SRC = "/images/logo.svg"

type ProfileHeaderProps = {
  copy: ProfileHeaderCopy
  lang: string
}

export function ProfileHeader({ copy, lang }: ProfileHeaderProps) {
  const navItems = [
    { label: copy.navFlights, active: false },
    { label: copy.navHotels, active: true },
    { label: copy.navTransfers, active: false },
    { label: copy.navExcursions, active: false },
    { label: copy.navCarRental, active: false },
    { label: copy.navTourPackages, active: false },
    { label: copy.navAdditionalServices, active: false },
  ]

  return (
    <header className="w-full border-b border-[#EAECF0] bg-white">
      <div className="ct-container flex min-h-[74px] items-center justify-between gap-8 py-[10px]">
        <Image
          src={LOGO_SRC}
          alt="Central Tour"
          width={137}
          height={36}
          priority
          unoptimized
          className="h-9 w-auto object-contain object-left"
        />

        <div className="flex items-center gap-3 text-[#0C111D]">
          <HeaderMiniBlock
            aria-label="Favorites"
            className="size-8 rounded-md p-1.5"
          >
            <HeartIcon width={24} height={24} aria-hidden />
          </HeaderMiniBlock>
          <NotificationsDropdown
            title={copy.notificationTitle}
            emptyLabel={copy.notificationEmptyLabel}
          />

          <Suspense
            fallback={
              <div
                className="h-10 w-[153px] rounded-lg bg-[#F9FAFB]"
                aria-hidden
              />
            }
          >
            <ProfileLanguageChanger
              lang={lang}
              dropdownTitle={copy.languageDropdownTitle}
            />
          </Suspense>

          <Suspense
            fallback={
              <div
                className="h-10 w-[90px] rounded-lg bg-[#F9FAFB]"
                aria-hidden
              />
            }
          >
            <ProfileCurrencyChanger
              modalTitle={copy.currencyModalTitle}
              featuredSectionTitle={copy.currencyFeaturedSectionTitle}
              allSectionTitle={copy.currencyAllSectionTitle}
            />
          </Suspense>

          <button
            type="button"
            className="inline-flex h-10 items-center gap-1.5 rounded-lg px-2 py-2 text-sm leading-5 font-normal text-[#667085]"
          >
            <UserIcon
              width={20}
              height={20}
              aria-hidden
              className="shrink-0 [&_path]:fill-[#292D32]"
            />
            <span>{copy.authLabel}</span>
          </button>
        </div>
      </div>

      <nav className="">
        <ul className="ct-container flex h-[54px] items-center gap-3 py-[7px]">
          {navItems.map((item) => (
            <li key={item.label}>
              <button
                type="button"
                className="inline-flex h-10 items-center rounded-lg px-2 py-2 text-sm leading-5 font-normal text-[#0C111D]"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
