"use client"

import { usePathname, useRouter } from "@central-tour/config/i18n/navigation"
import { useSearchParams } from "next/navigation"

import { type Locale, locales } from "@/shared/lib/i18n/config"
import {
  LanguageChanger,
  languageChangerProfileOptions,
  type LanguageOption,
} from "ui"

type AppLanguageChangerProps = {
  lang: string
  dropdownTitle: string
}

const LANGUAGE_OPTIONS_BY_LOCALE: Record<Locale, LanguageOption[]> = {
  ru: [
    { ...languageChangerProfileOptions[0], label: "Русский язык" },
    { ...languageChangerProfileOptions[1], label: "O'zbek tili" },
    { ...languageChangerProfileOptions[2], label: "English" },
  ],
  uz: [
    { ...languageChangerProfileOptions[0], label: "Rus tili" },
    { ...languageChangerProfileOptions[1], label: "O'zbek tili" },
    { ...languageChangerProfileOptions[2], label: "English" },
  ],
  en: [
    { ...languageChangerProfileOptions[0], label: "Russian" },
    { ...languageChangerProfileOptions[1], label: "Uzbek" },
    { ...languageChangerProfileOptions[2], label: "English" },
  ],
}

export function AppLanguageChanger({
  lang,
  dropdownTitle,
}: AppLanguageChangerProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const currentLocale = locales.includes(lang as Locale)
    ? (lang as Locale)
    : "ru"
  const options = LANGUAGE_OPTIONS_BY_LOCALE[currentLocale]

  const onValueChange = (nextLocale: string) => {
    if (!locales.includes(nextLocale as Locale)) return

    const query: Record<string, string> = {}
    searchParams.forEach((value, key) => {
      query[key] = value
    })

    const hasQuery = Object.keys(query).length > 0
    router.replace(hasQuery ? { pathname, query } : pathname, {
      locale: nextLocale as Locale,
    })
  }

  return (
    <LanguageChanger
      variant="profile"
      value={currentLocale}
      options={options}
      dropdownTitle={dropdownTitle}
      onValueChange={onValueChange}
    />
  )
}
