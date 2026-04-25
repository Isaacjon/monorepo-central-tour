"use client"

import { formatMmSs, PrimaryButton, SecondaryGrayButton } from "ui"

type AuthOtpActionsCopy = {
  otpResendIn: string
  otpResend: string
  otpConfirm: string
  otpBack: string
}

type AuthOtpActionsProps = {
  copy: AuthOtpActionsCopy
  resendSeconds: number
  onResend: () => void | Promise<void>
  onConfirm: () => void | Promise<void>
  onBack: () => void
  resendDisabled?: boolean
  confirmDisabled?: boolean
}

export function AuthOtpActions({
  copy,
  resendSeconds,
  onResend,
  onConfirm,
  onBack,
  resendDisabled = false,
  confirmDisabled = false,
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
          disabled={resendDisabled}
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
        disabled={confirmDisabled}
      >
        {copy.otpConfirm}
      </PrimaryButton>
      <SecondaryGrayButton type="button" fullWidth size="lg" onClick={onBack}>
        {copy.otpBack}
      </SecondaryGrayButton>
    </>
  )
}
