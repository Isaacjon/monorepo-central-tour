"use client"

import { useTranslations } from "next-intl"
import * as React from "react"

import { type SearchableCommandGroup, SearchableCommandPopover } from "ui"

const emptyIcon = <span className="size-5" aria-hidden />

export function FlightsCheckoutAdditionalServicesField() {
  const t = useTranslations("flights")
  const [value, setValue] = React.useState<string | null>(null)
  const additionalServicesGroups: SearchableCommandGroup[] = [
    {
      options: [
        {
          value: "insurance",
          label: t("checkoutServiceInsurance"),
          icon: emptyIcon,
        },
        {
          value: "extra-baggage",
          label: t("checkoutServiceExtraBaggage"),
          icon: emptyIcon,
        },
        {
          value: "priority",
          label: t("checkoutServicePriority"),
          icon: emptyIcon,
        },
      ],
    },
  ]

  return (
    <SearchableCommandPopover
      label=""
      emptyLabel={t("checkoutServiceEmptyLabel")}
      searchPlaceholder={t("checkoutServiceSearchPlaceholder")}
      emptySearchLabel={t("checkoutServiceEmptySearchLabel")}
      groups={additionalServicesGroups}
      value={value}
      onValueChange={setValue}
    />
  )
}
