"use client"

import type { FormEvent } from "react"

import type { ForgotPasswordFormCopy } from "@/modules/auth/types/forgot-password-form-copy"
import { PasswordInputField, PrimaryButton, SecondaryGrayButton } from "ui"

import { AuthFormLayout } from "./auth-form-layout"

type ForgotPasswordNewPasswordPanelProps = {
  copy: ForgotPasswordFormCopy
  newPassword: string
  confirmPassword: string
  newPasswordError: string
  confirmPasswordError: string
  loading: boolean
  onNewPasswordChange: (value: string) => void
  onConfirmPasswordChange: (value: string) => void
  onSubmit: (e: FormEvent) => void
  onBack: () => void
}

const FORM_ID = "b2b-forgot-new-password-form"

export function ForgotPasswordNewPasswordPanel({
  copy,
  newPassword,
  confirmPassword,
  newPasswordError,
  confirmPasswordError,
  loading,
  onNewPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
  onBack,
}: ForgotPasswordNewPasswordPanelProps) {
  return (
    <AuthFormLayout
      upper={
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-[30px] leading-[38px] font-semibold text-[#101828]">
              {copy.newPasswordTitle}
            </h1>
            <p className="text-[16px] leading-[24px] text-[#667085]">
              {copy.newPasswordBody}
            </p>
          </div>

          <form
            id={FORM_ID}
            className="flex w-full flex-col gap-4"
            onSubmit={onSubmit}
            noValidate
          >
            <PasswordInputField
              label={copy.newPasswordLabel}
              autoComplete="off"
              placeholder={copy.newPasswordPlaceholder}
              value={newPassword}
              onChange={(e) => onNewPasswordChange(e.target.value)}
              variant={newPasswordError ? "error" : "default"}
              hintLeft={newPasswordError || undefined}
            />
            <PasswordInputField
              label={copy.confirmPasswordLabel}
              autoComplete="off"
              placeholder={copy.newPasswordPlaceholder}
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
            {copy.newPasswordSubmit}
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
