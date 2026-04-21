"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"

import {
  profileDataSchema,
  type ProfileDataValues,
} from "@/modules/profile/lib/profile-data-schema"
import type { ProfileDataCopy } from "@/modules/profile/types/profile-data-copy"
import {
  BirthDateInputField,
  LettersInputField,
  PassportInputField,
  PhoneInputField,
  PrimaryButton,
  SecondaryGrayButton,
  StackedInputField,
} from "ui"

type ProfileDataFormProps = {
  copy: ProfileDataCopy
  defaultValues?: Partial<ProfileDataValues>
  onSubmit?: (values: ProfileDataValues) => void
  onCancel?: () => void
}

export function ProfileDataForm({
  copy,
  defaultValues,
  onSubmit,
  onCancel,
}: ProfileDataFormProps) {
  const form = useForm<ProfileDataValues>({
    resolver: zodResolver(profileDataSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      middleName: "",
      phone: "",
      email: "",
      passport: "",
      birthDate: "",
      ...defaultValues,
    },
  })

  function handleSubmit(values: ProfileDataValues) {
    onSubmit?.(values)
  }

  return (
    <form
      className="flex-1"
      onSubmit={form.handleSubmit(handleSubmit)}
      noValidate
    >
      <div className="rounded-2xl border border-[#EAECF0] bg-white p-4">
        <h2 className="mb-4 text-[32px] leading-10 font-bold text-[#1D2939]">
          {copy.formTitle}
        </h2>
        <div className="flex flex-col gap-4">
          {/* Row 1: firstName / lastName / middleName — letters only */}
          <div className="grid grid-cols-3 gap-3">
            <Controller
              control={form.control}
              name="firstName"
              render={({ field, fieldState }) => (
                <LettersInputField
                  label={copy.firstNameLabel}
                  placeholder={copy.firstNamePlaceholder}
                  autoComplete="given-name"
                  variant={fieldState.error ? "error" : "default"}
                  hintLeft={fieldState.error?.message}
                  {...field}
                />
              )}
            />
            <Controller
              control={form.control}
              name="lastName"
              render={({ field, fieldState }) => (
                <LettersInputField
                  label={copy.lastNameLabel}
                  placeholder={copy.lastNamePlaceholder}
                  autoComplete="family-name"
                  variant={fieldState.error ? "error" : "default"}
                  hintLeft={fieldState.error?.message}
                  {...field}
                />
              )}
            />
            <Controller
              control={form.control}
              name="middleName"
              render={({ field, fieldState }) => (
                <LettersInputField
                  label={copy.middleNameLabel}
                  placeholder={copy.middleNamePlaceholder}
                  autoComplete="additional-name"
                  variant={fieldState.error ? "error" : "default"}
                  hintLeft={fieldState.error?.message}
                  {...field}
                />
              )}
            />
          </div>

          {/* Row 2: phone (masked UZ) / email */}
          <div className="grid grid-cols-2 gap-3">
            <Controller
              control={form.control}
              name="phone"
              render={({ field, fieldState }) => (
                <PhoneInputField
                  label={copy.phoneLabel}
                  placeholder={copy.phonePlaceholder}
                  variant={fieldState.error ? "error" : "default"}
                  hintLeft={fieldState.error?.message}
                  {...field}
                />
              )}
            />
            <Controller
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <StackedInputField
                  label={copy.emailLabel}
                  placeholder={copy.emailPlaceholder}
                  type="email"
                  autoComplete="email"
                  variant={fieldState.error ? "error" : "default"}
                  hintLeft={fieldState.error?.message}
                  {...field}
                />
              )}
            />
          </div>

          {/* Row 3: passport (masked AA999999) / birthDate (masked DD.MM.YY) */}
          <div className="grid grid-cols-2 gap-3">
            <Controller
              control={form.control}
              name="passport"
              render={({ field, fieldState }) => (
                <PassportInputField
                  label={copy.passportLabel}
                  placeholder={copy.passportPlaceholder}
                  variant={fieldState.error ? "error" : "default"}
                  hintLeft={fieldState.error?.message}
                  {...field}
                />
              )}
            />
            <Controller
              control={form.control}
              name="birthDate"
              render={({ field, fieldState }) => (
                <BirthDateInputField
                  label={copy.birthDateLabel}
                  placeholder={copy.birthDatePlaceholder}
                  variant={fieldState.error ? "error" : "default"}
                  hintLeft={fieldState.error?.message}
                  {...field}
                />
              )}
            />
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-end gap-3">
        <SecondaryGrayButton
          type="button"
          onClick={onCancel}
          className="bg-c-error-100 text-primary hover:text-primary hover:bg-c-error-100/80 rounded-lg border-none p-[12px_24px]"
        >
          {copy.cancelLabel}
        </SecondaryGrayButton>
        <PrimaryButton
          className="rounded-lg border-none p-[12px_24px]"
          type="submit"
        >
          {copy.saveLabel}
        </PrimaryButton>
      </div>
    </form>
  )
}
