"use client"

import { usePathname, useRouter } from "@central-tour/config/i18n/navigation"
import { useSearchParams } from "next/navigation"

import { type Locale, locales } from "@/shared/lib/i18n/config"
import { LanguageChanger, languageChangerOptions } from "ui"

type HomeLanguageChangerProps = {
  lang: string
}

export function HomeLanguageChanger({ lang }: HomeLanguageChangerProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const onValueChange = (nextLocale: string) => {
    if (!locales.includes(nextLocale as Locale)) {
      return
    }

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
      value={lang}
      options={languageChangerOptions}
      onValueChange={onValueChange}
    />
  )
}
