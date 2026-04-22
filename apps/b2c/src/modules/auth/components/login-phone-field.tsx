"use client"

import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from "react-hook-form"

import type { LoginFormCopy } from "@/modules/auth/types/login-form-copy"
import { PhoneCountryInput } from "ui"

type LoginPhoneFieldProps<T extends FieldValues & { phone: string }> = {
  control: Control<T>
  copy: Pick<LoginFormCopy, "phoneLabel">
  tab: string
}

export function LoginPhoneField<T extends FieldValues & { phone: string }>({
  control,
  copy,
  tab,
}: LoginPhoneFieldProps<T>) {
  if (tab !== "phone") return null

  return (
    <Controller
      control={control}
      name={"phone" as Path<T>}
      render={({ field, fieldState }) => (
        <PhoneCountryInput
          label={copy.phoneLabel}
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          ref={field.ref}
          error={fieldState.error?.message}
        />
      )}
    />
  )
}
