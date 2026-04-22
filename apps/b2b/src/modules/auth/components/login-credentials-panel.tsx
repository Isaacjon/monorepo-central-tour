"use client"

import { Link } from "@central-tour/config/i18n/navigation"
import type { FormEvent } from "react"

import type { LoginFormCopy } from "@/modules/auth/types/login-form-copy"
import {
  InputField,
  PasswordInputField,
  PrimaryButton,
  SecondaryGrayButton,
} from "ui"

import { AuthFormLayout } from "./auth-form-layout"

type LoginCredentialsPanelProps = {
  copy: LoginFormCopy
  email: string
  password: string
  emailError: string
  passwordError: string
  loading: boolean
  onEmailChange: (value: string) => void
  onPasswordChange: (value: string) => void
  onSubmit: (e: FormEvent) => void
}

export function LoginCredentialsPanel({
  copy,
  email,
  password,
  emailError,
  passwordError,
  loading,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: LoginCredentialsPanelProps) {
  return (
    <AuthFormLayout
      upper={
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-[30px] leading-[38px] font-semibold text-[#101828]">
              {copy.loginTitle}
            </h1>
            <p className="text-[16px] leading-[24px] text-[#667085]">
              {copy.loginBody}
            </p>
          </div>

          <form
            id="b2b-login-form"
            className="flex w-full flex-col gap-4"
            onSubmit={onSubmit}
            noValidate
          >
            <InputField
              label={copy.emailLabel}
              type="email"
              autoComplete="email"
              placeholder={copy.emailPlaceholder}
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              variant={emailError ? "error" : "default"}
              hintLeft={emailError || undefined}
            />

            <div className="flex flex-col gap-1">
              <PasswordInputField
                label={copy.passwordLabel}
                autoComplete="current-password"
                placeholder={copy.passwordPlaceholder}
                value={password}
                onChange={(e) => onPasswordChange(e.target.value)}
                variant={passwordError ? "error" : "default"}
                hintLeft={passwordError || undefined}
                hintRight={
                  <div className="flex justify-end">
                    <Link
                      href="/forgot-password"
                      className="text-sm text-[#667085] hover:underline"
                    >
                      {copy.forgotPassword}
                    </Link>
                  </div>
                }
              />
            </div>
          </form>
        </div>
      }
      lower={
        <div className="flex flex-col gap-3 pt-4 lg:pt-0">
          <PrimaryButton
            type="submit"
            form="b2b-login-form"
            size="lg"
            fullWidth
            className="rounded-xl"
            disabled={loading}
          >
            {copy.submit}
          </PrimaryButton>
          <SecondaryGrayButton asChild fullWidth size="lg">
            <Link href="/register">{copy.register}</Link>
          </SecondaryGrayButton>
        </div>
      }
    />
  )
}
