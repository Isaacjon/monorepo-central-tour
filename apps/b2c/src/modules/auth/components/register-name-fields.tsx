"use client"

import { type Control, Controller } from "react-hook-form"

import type { RegisterFormValues } from "@/modules/auth/lib/register-schema"
import type { RegisterFormCopy } from "@/modules/auth/types/register-form-copy"
import { InputField } from "ui"

type RegisterNameFieldsProps = {
  control: Control<RegisterFormValues>
  copy: RegisterFormCopy
}

export function RegisterNameFields({ control, copy }: RegisterNameFieldsProps) {
  return (
    <div className="flex w-full flex-col gap-4">
      <Controller
        control={control}
        name="lastName"
        render={({ field, fieldState }) => (
          <InputField
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
        control={control}
        name="firstName"
        render={({ field, fieldState }) => (
          <InputField
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
        control={control}
        name="middleName"
        render={({ field, fieldState }) => (
          <InputField
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
  )
}
