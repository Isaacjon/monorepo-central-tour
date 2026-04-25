"use client"

import { useTranslations } from "next-intl"
import { useState } from "react"
import {
  Checkbox,
  PassportInputField,
  type SearchableCommandGroup,
  SearchableCommandPopover,
  StackedInputField,
} from "ui"

const emptyIcon = <span className="size-5" aria-hidden />

type FlightsCheckoutTravelerFormProps = {
  firstName: string
  lastName: string
  fatherName: string
  onFirstNameChange: (value: string) => void
  onLastNameChange: (value: string) => void
  onFatherNameChange: (value: string) => void
}

export function FlightsCheckoutTravelerForm({
  firstName,
  lastName,
  fatherName,
  onFirstNameChange,
  onLastNameChange,
  onFatherNameChange,
}: FlightsCheckoutTravelerFormProps) {
  const t = useTranslations("flights")
  const [nationality, setNationality] = useState<string | null>(null)
  const [gender, setGender] = useState<string | null>(null)
  const [withoutLastName, setWithoutLastName] = useState(false)
  const nationalityGroups: SearchableCommandGroup[] = [
    {
      options: [
        { value: "uz", label: t("checkoutNationalityUz"), icon: emptyIcon },
        { value: "ru", label: t("checkoutNationalityRu"), icon: emptyIcon },
        { value: "us", label: t("checkoutNationalityUs"), icon: emptyIcon },
      ],
    },
  ]
  const genderGroups: SearchableCommandGroup[] = [
    {
      options: [
        { value: "male", label: t("checkoutGenderMale"), icon: emptyIcon },
        { value: "female", label: t("checkoutGenderFemale"), icon: emptyIcon },
      ],
    },
  ]

  return (
    <div className="p-4 md:p-6">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <StackedInputField
          label={t("checkoutTravelerFirstNameLabel")}
          placeholder={t("checkoutTravelerFirstNamePlaceholder")}
          value={firstName}
          onChange={(event) => onFirstNameChange(event.target.value)}
        />
        <StackedInputField
          label={t("checkoutTravelerLastNameLabel")}
          placeholder={t("checkoutTravelerLastNamePlaceholder")}
          value={lastName}
          onChange={(event) => onLastNameChange(event.target.value)}
        />
        <StackedInputField
          label={t("checkoutTravelerMiddleNameLabel")}
          placeholder={t("checkoutTravelerMiddleNamePlaceholder")}
          value={fatherName}
          onChange={(event) => onFatherNameChange(event.target.value)}
        />
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
          {t("checkoutTravelerWithoutLastName")}
        </span>
      </label>

      <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
        <SearchableCommandPopover
          label={t("checkoutTravelerNationalityLabel")}
          emptyLabel={t("checkoutTravelerNationalityEmptyLabel")}
          searchPlaceholder={t("checkoutTravelerNationalitySearchPlaceholder")}
          emptySearchLabel={t("checkoutTravelerEmptySearchLabel")}
          groups={nationalityGroups}
          value={nationality}
          onValueChange={setNationality}
        />
        <PassportInputField
          label={t("checkoutTravelerPassportLabel")}
          placeholder={t("checkoutTravelerPassportPlaceholder")}
        />
        <SearchableCommandPopover
          label={t("checkoutTravelerGenderLabel")}
          emptyLabel={t("checkoutTravelerGenderEmptyLabel")}
          searchPlaceholder={t("checkoutTravelerGenderSearchPlaceholder")}
          emptySearchLabel={t("checkoutTravelerEmptySearchLabel")}
          groups={genderGroups}
          value={gender}
          onValueChange={setGender}
        />
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
        <StackedInputField
          label={t("checkoutTravelerBirthDateLabel")}
          placeholder={t("checkoutTravelerBirthDatePlaceholder")}
        />
        <StackedInputField
          label={t("checkoutTravelerDocumentExpiryLabel")}
          placeholder={t("checkoutTravelerDocumentExpiryPlaceholder")}
        />
        <StackedInputField
          label={t("checkoutTravelerIssuedByLabel")}
          placeholder={t("checkoutTravelerIssuedByPlaceholder")}
        />
      </div>
    </div>
  )
}
