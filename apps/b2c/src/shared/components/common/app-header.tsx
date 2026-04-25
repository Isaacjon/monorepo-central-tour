"use client"

import { Link } from "@central-tour/config/i18n/navigation"
import Image from "next/image"
import { Suspense } from "react"

import { useAuthStore } from "@/shared/stores/auth-store"
import type { AppHeaderCopy } from "@/shared/types/app-header-copy"
import { HeaderMiniBlock, HeartIcon, NotificationsDropdown, UserIcon } from "ui"

import { AppCurrencyChanger } from "./app-currency-changer"
import { AppLanguageChanger } from "./app-language-changer"

export type AppHeaderActiveNav =
  | "flights"
  | "hotels"
  | "transfers"
  | "excursions"
  | "car-rental"
  | "tour-packages"
  | "additional-services"

type AppHeaderProps = {
  copy: AppHeaderCopy
  lang: string
  activeNav?: AppHeaderActiveNav
}

const LOGO_SRC = "/images/logo.svg"

export function AppHeader({ copy, lang, activeNav }: AppHeaderProps) {
  const session = useAuthStore((state) => state.session)
  const authHref = session ? "/profile" : "/login"
  const authLabel =
    session?.userPhone ??
    (session?.contactMethod === "phone" ? session.contactValue : null) ??
    copy.authLabel

  const navItems: { label: string; id: AppHeaderActiveNav; href: string }[] = [
    { label: copy.navFlights, id: "flights", href: "/flights" },
    { label: copy.navHotels, id: "hotels", href: "/" },
    { label: copy.navTransfers, id: "transfers", href: "/transfers" },
    { label: copy.navExcursions, id: "excursions", href: "/excursions" },
    { label: copy.navCarRental, id: "car-rental", href: "/car-rental" },
    {
      label: copy.navTourPackages,
      id: "tour-packages",
      href: "/tour-packages",
    },
    {
      label: copy.navAdditionalServices,
      id: "additional-services",
      href: "/additional-services",
    },
  ]

  return (
    <header className="w-full border-b border-[#EAECF0] bg-white">
      <div className="ct-container flex min-h-[74px] items-center justify-between gap-8 py-[10px]">
        <Link href="/" className="block">
          <Image
            src={LOGO_SRC}
            alt="Central Tour"
            width={137}
            height={36}
            priority
            unoptimized
            className="h-9 w-auto object-contain object-left"
          />
        </Link>

        <div className="text-c-gray-950 flex items-center gap-3">
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
            <AppLanguageChanger
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
            <AppCurrencyChanger
              modalTitle={copy.currencyModalTitle}
              featuredSectionTitle={copy.currencyFeaturedSectionTitle}
              allSectionTitle={copy.currencyAllSectionTitle}
            />
          </Suspense>

          <Link
            href={authHref}
            className="inline-flex h-10 items-center gap-1.5 rounded-lg px-2 py-2 text-sm leading-5 font-normal text-[#667085]"
          >
            <UserIcon
              width={20}
              height={20}
              aria-hidden
              className="shrink-0 [&_path]:fill-[#292D32]"
            />
            <span className="max-w-[160px] truncate">{authLabel}</span>
          </Link>
        </div>
      </div>

      <nav>
        <ul className="ct-container flex h-[54px] items-center gap-3 py-[7px]">
          {navItems.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                className={
                  item.id === activeNav
                    ? "bg-primary/10 text-primary inline-flex h-10 items-center rounded-lg px-2 py-2 text-sm leading-5 font-medium"
                    : "text-c-gray-950 hover:bg-primary/5 hover:text-primary inline-flex h-10 items-center rounded-lg px-2 py-2 text-sm leading-5 font-normal"
                }
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
