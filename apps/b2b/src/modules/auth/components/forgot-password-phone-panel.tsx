"use client"

import { Link } from "@central-tour/config/i18n/navigation"
import { type FormEvent, useId } from "react"

import type { ForgotPasswordFormCopy } from "@/modules/auth/types/forgot-password-form-copy"
import { PhoneCountryInput, PrimaryButton, SecondaryGrayButton } from "ui"

import { AuthFormLayout } from "./auth-form-layout"

type ForgotPasswordPhonePanelProps = {
  copy: ForgotPasswordFormCopy
  phone: string
  phoneError: string
  loading: boolean
  onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onDialCodeChange: (dialCode: string) => void
  onSubmit: (e: FormEvent) => void
}

const FORM_ID = "b2b-forgot-phone-form"

export function ForgotPasswordPhonePanel({
  copy,
  phone,
  phoneError,
  loading,
  onPhoneChange,
  onDialCodeChange,
  onSubmit,
}: ForgotPasswordPhonePanelProps) {
  const phoneFieldId = useId()

  return (
    <AuthFormLayout
      upper={
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-[30px] leading-[38px] font-semibold text-[#101828]">
              {copy.phoneTitle}
            </h1>
            <p className="text-[16px] leading-[24px] text-[#667085]">
              {copy.phoneBody}
            </p>
          </div>

          <form
            id={FORM_ID}
            className="flex w-full flex-col gap-4"
            onSubmit={onSubmit}
            noValidate
            autoComplete="off"
            data-1p-ignore
            data-lpignore="true"
          >
            <PhoneCountryInput
              id={phoneFieldId}
              label={copy.phoneLabel}
              value={phone}
              onChange={onPhoneChange}
              onDialCodeChange={onDialCodeChange}
              error={phoneError || undefined}
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
            {copy.phoneSubmit}
          </PrimaryButton>
          <SecondaryGrayButton asChild fullWidth size="lg">
            <Link href="/login">{copy.backToLogin}</Link>
          </SecondaryGrayButton>
        </div>
      }
    />
  )
}
