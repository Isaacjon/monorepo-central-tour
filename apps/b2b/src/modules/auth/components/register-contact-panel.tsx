"use client"

import { Link } from "@central-tour/config/i18n/navigation"
import { type FormEvent, useId } from "react"

import type { RegisterFormCopy } from "@/modules/auth/types/register-form-copy"
import { InputField, PrimaryButton, SecondaryGrayButton } from "ui"

import { AuthFormLayout } from "./auth-form-layout"

const FORM_ID = "b2b-register-contact-form"

type RegisterContactPanelProps = {
  copy: RegisterFormCopy
  fullName: string
  email: string
  fullNameError: string
  emailError: string
  loading: boolean
  onFullNameChange: (value: string) => void
  onEmailChange: (value: string) => void
  onSubmit: (e: FormEvent) => void
}

export function RegisterContactPanel({
  copy,
  fullName,
  email,
  fullNameError,
  emailError,
  loading,
  onFullNameChange,
  onEmailChange,
  onSubmit,
}: RegisterContactPanelProps) {
  const fieldNameSuffix = useId().replace(/:/g, "")

  return (
    <AuthFormLayout
      upper={
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-[30px] leading-[38px] font-semibold text-[#101828]">
              {copy.registerTitle}
            </h1>
            <p className="text-[16px] leading-[24px] text-[#667085]">
              {copy.registerSubtitle}
            </p>
          </div>

          <form
            id={FORM_ID}
            className="flex w-full flex-col gap-4"
            onSubmit={onSubmit}
            noValidate
          >
            <InputField
              name={`b2b-register-fullname-${fieldNameSuffix}`}
              label={copy.registerFullNameLabel}
              placeholder={copy.registerFullNamePlaceholder}
              value={fullName}
              onChange={(e) => onFullNameChange(e.target.value)}
              variant={fullNameError ? "error" : "default"}
              hintLeft={fullNameError || undefined}
              autoComplete="off"
            />
            <InputField
              name={`b2b-register-email-${fieldNameSuffix}`}
              label={copy.registerEmailLabel}
              type="text"
              inputMode="email"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              autoComplete="off"
              placeholder={copy.registerEmailPlaceholder}
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              variant={emailError ? "error" : "default"}
              hintLeft={emailError || undefined}
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
          <SecondaryGrayButton asChild fullWidth size="lg">
            <Link href="/login">{copy.back}</Link>
          </SecondaryGrayButton>
        </div>
      }
    />
  )
}
