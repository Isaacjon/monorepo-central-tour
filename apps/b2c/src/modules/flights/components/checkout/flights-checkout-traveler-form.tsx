"use client"

import { useState } from "react"
import {
  Checkbox,
  PassportInputField,
  type SearchableCommandGroup,
  SearchableCommandPopover,
  StackedInputField,
} from "ui"

const emptyIcon = <span className="size-5" aria-hidden />

const nationalityGroups: SearchableCommandGroup[] = [
  {
    options: [
      { value: "uz", label: "Узбекистан", icon: emptyIcon },
      { value: "ru", label: "Россия", icon: emptyIcon },
      { value: "us", label: "США", icon: emptyIcon },
    ],
  },
]

const genderGroups: SearchableCommandGroup[] = [
  {
    options: [
      { value: "male", label: "Мужской", icon: emptyIcon },
      { value: "female", label: "Женский", icon: emptyIcon },
    ],
  },
]

export function FlightsCheckoutTravelerForm() {
  const [nationality, setNationality] = useState<string | null>(null)
  const [gender, setGender] = useState<string | null>(null)
  const [withoutLastName, setWithoutLastName] = useState(false)

  return (
    <div className="p-4 md:p-6">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <StackedInputField label="Имя" placeholder="Введите имя" />
        <StackedInputField label="Фамилия" placeholder="Фамилия" />
        <StackedInputField label="Дата рождения" placeholder="дд.мм.гггг" />
      </div>

      <label
        htmlFor="passenger-without-last-name"
        className="mt-3 inline-flex cursor-pointer items-center gap-3"
      >
        <Checkbox
          id="passenger-without-last-name"
          checked={withoutLastName}
          onCheckedChange={(value) => {
            if (typeof value === "boolean") setWithoutLastName(value)
          }}
        />
        <span className="text-[16px] leading-6 font-medium text-[#98A2B3]">
          У этого пассажира нет фамилии
        </span>
      </label>

      <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
        <SearchableCommandPopover
          label="Национальность"
          emptyLabel="Национальность"
          searchPlaceholder="Найти страну"
          emptySearchLabel="Ничего не найдено"
          groups={nationalityGroups}
          value={nationality}
          onValueChange={setNationality}
        />
        <PassportInputField label="Паспорт" placeholder="Номер паспорта" />
        <SearchableCommandPopover
          label="Пол"
          emptyLabel="Пол"
          searchPlaceholder="Найти пол"
          emptySearchLabel="Ничего не найдено"
          groups={genderGroups}
          value={gender}
          onValueChange={setGender}
        />
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
        <StackedInputField
          label="Срок действия документа"
          placeholder="дд.мм.гггг"
        />
        <StackedInputField label="Кем выдан" placeholder="Кем выдан" />
      </div>
    </div>
  )
}
