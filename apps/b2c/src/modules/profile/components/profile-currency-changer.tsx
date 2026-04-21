"use client"

import { CurrencyChanger, type CurrencyOption } from "ui"

/** Featured (pinned to top) currencies shown in their own section. */
const FEATURED_CURRENCIES: CurrencyOption[] = [
  { code: "USD", label: "Доллар США" },
  { code: "UZS", label: "Узбекский сум" },
  { code: "EUR", label: "Евро" },
]

/** Full currency list shown in "All currencies" section. */
const ALL_CURRENCIES: CurrencyOption[] = [
  { code: "USD", label: "Доллар США" },
  { code: "UZS", label: "Узбекский сум" },
  { code: "EUR", label: "Евро" },
  { code: "GBP", label: "Фунт стерлингов" },
  { code: "RUB", label: "Российский рубль" },
  { code: "CNY", label: "Китайский юань" },
  { code: "JPY", label: "Японская иена" },
  { code: "CHF", label: "Швейцарский франк" },
  { code: "CAD", label: "Канадский доллар" },
  { code: "AUD", label: "Австралийский доллар" },
  { code: "AED", label: "Дирхам ОАЭ" },
  { code: "TRY", label: "Турецкая лира" },
]

type ProfileCurrencyChangerProps = {
  modalTitle: string
  featuredSectionTitle: string
  allSectionTitle: string
}

export function ProfileCurrencyChanger({
  modalTitle,
  featuredSectionTitle,
  allSectionTitle,
}: ProfileCurrencyChangerProps) {
  return (
    <CurrencyChanger
      defaultValue="USD"
      options={ALL_CURRENCIES}
      featuredOptions={FEATURED_CURRENCIES}
      modalTitle={modalTitle}
      featuredSectionTitle={featuredSectionTitle}
      allSectionTitle={allSectionTitle}
    />
  )
}
