"use client"

import * as React from "react"

import {
  type SearchableCommandGroup,
  SearchableCommandPopover,
} from "ui"

const emptyIcon = <span className="size-5" aria-hidden />

const additionalServicesGroups: SearchableCommandGroup[] = [
  {
    options: [
      { value: "insurance", label: "Страховка", icon: emptyIcon },
      { value: "extra-baggage", label: "Дополнительный багаж", icon: emptyIcon },
      { value: "priority", label: "Приоритетная посадка", icon: emptyIcon },
    ],
  },
]

export function FlightsCheckoutAdditionalServicesField() {
  const [value, setValue] = React.useState<string | null>(null)

  return (
    <SearchableCommandPopover
      label=""
      emptyLabel="Выберите"
      searchPlaceholder="Поиск услуги"
      emptySearchLabel="Ничего не найдено"
      groups={additionalServicesGroups}
      value={value}
      onValueChange={setValue}
    />
  )
}
