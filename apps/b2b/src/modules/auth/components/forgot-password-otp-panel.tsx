"use client"

import type { ForgotPasswordFormCopy } from "@/modules/auth/types/forgot-password-form-copy"
import { formatMmSs, OtpInput, PrimaryButton, SecondaryGrayButton } from "ui"

import { AuthFormLayout } from "./auth-form-layout"

type ForgotPasswordOtpPanelProps = {
  copy: ForgotPasswordFormCopy
  phoneDisplay: string
  otp: string
  otpInvalid: boolean
  resendSeconds: number
  onOtpChange: (value: string) => void
  onResend: () => void
  onConfirm: () => void
  onBack: () => void
}

export function ForgotPasswordOtpPanel({
  copy,
  phoneDisplay,
  otp,
  otpInvalid,
  resendSeconds,
  onOtpChange,
  onResend,
  onConfirm,
  onBack,
}: ForgotPasswordOtpPanelProps) {
  return (
    <AuthFormLayout
      upper={
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-[30px] leading-[38px] font-semibold text-[#101828]">
              {copy.otpTitle}
            </h1>
            <p className="text-[16px] leading-[24px] text-[#667085]">
              {copy.otpSubtitle.replace("__DESTINATION__", phoneDisplay)}
            </p>
          </div>
          <div
            className="flex justify-center"
            data-1p-ignore
            data-lpignore="true"
          >
            <OtpInput
              value={otp}
              onChange={onOtpChange}
              invalid={otpInvalid}
              autoFocus
              aria-label={copy.otpTitle}
            />
          </div>
        </div>
      }
      lower={
        <div className="flex flex-col gap-4 pt-4 lg:pt-0">
          {resendSeconds > 0 ? (
            <p className="text-center text-sm text-[#667085]">
              {copy.otpResendIn.replace("__TIME__", formatMmSs(resendSeconds))}
            </p>
          ) : (
            <button
              type="button"
              className="text-primary text-center text-sm font-medium underline-offset-2 hover:underline"
              onClick={onResend}
            >
              {copy.otpResend}
            </button>
          )}
          <PrimaryButton
            type="button"
            size="lg"
            fullWidth
            className="rounded-xl"
            onClick={onConfirm}
          >
            {copy.otpSubmit}
          </PrimaryButton>
          <SecondaryGrayButton
            type="button"
            fullWidth
            size="lg"
            onClick={onBack}
          >
            {copy.back}
          </SecondaryGrayButton>
        </div>
      }
    />
  )
}
