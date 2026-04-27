"use client"

import type { FormEvent } from "react"

import type { RegisterFormCopy } from "@/modules/auth/types/register-form-copy"
import { PasswordInputField, PrimaryButton, SecondaryGrayButton } from "ui"

import { AuthFormLayout } from "./auth-form-layout"

const FORM_ID = "b2b-register-password-form"

type RegisterPasswordPanelProps = {
  copy: RegisterFormCopy
  password: string
  confirmPassword: string
  passwordError: string
  confirmPasswordError: string
  loading: boolean
  onPasswordChange: (value: string) => void
  onConfirmPasswordChange: (value: string) => void
  onSubmit: (e: FormEvent) => void
  onBack: () => void
}

export function RegisterPasswordPanel({
  copy,
  password,
  confirmPassword,
  passwordError,
  confirmPasswordError,
  loading,
  onPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
  onBack,
}: RegisterPasswordPanelProps) {
  return (
    <AuthFormLayout
      upper={
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-[30px] leading-[38px] font-semibold text-[#101828]">
              {copy.createPasswordTitle}
            </h1>
            <p className="text-[16px] leading-[24px] text-[#667085]">
              {copy.createPasswordBody}
            </p>
          </div>

          <form
            id={FORM_ID}
            className="flex w-full flex-col gap-4"
            onSubmit={onSubmit}
            noValidate
          >
            <PasswordInputField
              label={copy.passwordLabel}
              autoComplete="off"
              placeholder={copy.passwordPlaceholder}
              value={password}
              onChange={(e) => onPasswordChange(e.target.value)}
              variant={passwordError ? "error" : "default"}
              hintLeft={passwordError || undefined}
            />
            <PasswordInputField
              label={copy.confirmPasswordLabel}
              autoComplete="off"
              placeholder={copy.passwordPlaceholder}
              value={confirmPassword}
              onChange={(e) => onConfirmPasswordChange(e.target.value)}
              variant={confirmPasswordError ? "error" : "default"}
              hintLeft={confirmPasswordError || undefined}
            />
          </form>
        </div>
      }
      lower={
        <div className="flex flex-col gap-3 pt-4 lg:pt-0">
          <PrimaryButton
            type="submit"
            form={FORM_ID}
            size="lg"
            fullWidth
            className="rounded-xl"
            disabled={loading}
          >
            {copy.continue}
          </PrimaryButton>
          <SecondaryGrayButton
            type="button"
            fullWidth
            size="lg"
            onClick={onBack}
            disabled={loading}
          >
            {copy.back}
          </SecondaryGrayButton>
        </div>
      }
    />
  )
}
