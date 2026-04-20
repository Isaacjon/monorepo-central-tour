"use client"

import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from "react-hook-form"

import type { LoginFormCopy } from "@/modules/auth/types/login-form-copy"
import { InputField } from "ui"

type LoginEmailFieldsProps<T extends FieldValues & { email: string }> = {
  control: Control<T>
  copy: Pick<LoginFormCopy, "emailLabel" | "emailPlaceholder">
  tab: string
}

export function LoginEmailFields<T extends FieldValues & { email: string }>({
  control,
  copy,
  tab,
}: LoginEmailFieldsProps<T>) {
  if (tab !== "email") return null

  return (
    <Controller
      control={control}
      name={"email" as Path<T>}
      render={({ field, fieldState }) => (
        <InputField
          label={copy.emailLabel}
          type="email"
          autoComplete="email"
          placeholder={copy.emailPlaceholder}
          variant={fieldState.error ? "error" : "default"}
          hintLeft={fieldState.error?.message}
          {...field}
        />
      )}
    />
  )
}
