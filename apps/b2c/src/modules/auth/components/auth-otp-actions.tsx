"use client"

import { formatMmSs } from "@/modules/auth/lib/format-mm-ss"
import { PrimaryButton, SecondaryGrayButton } from "ui"

type AuthOtpActionsCopy = {
  otpResendIn: string
  otpResend: string
  otpConfirm: string
  otpBack: string
}

type AuthOtpActionsProps = {
  copy: AuthOtpActionsCopy
  resendSeconds: number
  onResend: () => void
  onConfirm: () => void
  onBack: () => void
}

export function AuthOtpActions({
  copy,
  resendSeconds,
  onResend,
  onConfirm,
  onBack,
}: AuthOtpActionsProps) {
  return (
    <>
      {resendSeconds > 0 ? (
        <p className="text-center text-sm text-[#667085]">
          {copy.otpResendIn.replace("__TIME__", formatMmSs(resendSeconds))}
        </p>
      ) : (
        <button
          type="button"
          className="text-center text-sm font-medium text-[#1570EF] underline-offset-2 hover:underline"
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
        {copy.otpConfirm}
      </PrimaryButton>
      <SecondaryGrayButton type="button" fullWidth size="lg" onClick={onBack}>
        {copy.otpBack}
      </SecondaryGrayButton>
    </>
  )
}
