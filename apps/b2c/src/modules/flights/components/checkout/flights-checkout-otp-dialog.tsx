"use client"

import { useTranslations } from "next-intl"

import {
  Dialog,
  DialogContent,
  DialogTitle,
  formatMmSs,
  OtpInput,
  PrimaryButton,
  SecondaryGrayButton,
} from "ui"

type FlightsCheckoutOtpDialogProps = {
  open: boolean
  otp: string
  otpInvalid: boolean
  otpDestination: string
  resendSeconds: number
  isSendingOtp: boolean
  isConfirmingOtp: boolean
  onOtpChange: (value: string) => void
  onConfirm: () => void | Promise<void>
  onResend: () => void | Promise<void>
  onClose: () => void
}

export function FlightsCheckoutOtpDialog({
  open,
  otp,
  otpInvalid,
  otpDestination,
  resendSeconds,
  isSendingOtp,
  isConfirmingOtp,
  onOtpChange,
  onConfirm,
  onResend,
  onClose,
}: FlightsCheckoutOtpDialogProps) {
  const tAuth = useTranslations("auth")

  return (
    <Dialog open={open} onOpenChange={(nextOpen) => !nextOpen && onClose()}>
      <DialogContent className="w-[min(520px,calc(100%-2rem))] rounded-3xl p-6">
        <DialogTitle className="text-center text-2xl font-semibold text-[#101828]">
          {tAuth("otpTitle")}
        </DialogTitle>
        <p className="mt-2 text-center text-base text-[#667085]">
          {tAuth("otpSubtitlePhone").replace("__DESTINATION__", otpDestination)}
        </p>

        <div className="mt-6 flex justify-center">
          <OtpInput
            value={otp}
            onChange={onOtpChange}
            invalid={otpInvalid}
            autoFocus
            aria-label={tAuth("otpTitle")}
          />
        </div>

        <div className="mt-6 flex flex-col gap-3">
          {resendSeconds > 0 ? (
            <p className="text-center text-sm text-[#667085]">
              {tAuth("otpResendIn").replace("__TIME__", formatMmSs(resendSeconds))}
            </p>
          ) : (
            <button
              type="button"
              className="text-center text-sm font-medium text-[#1570EF] underline-offset-2 hover:underline"
              onClick={() => {
                void onResend()
              }}
              disabled={isSendingOtp}
            >
              {tAuth("otpResend")}
            </button>
          )}
          <PrimaryButton onClick={onConfirm} disabled={isConfirmingOtp} fullWidth>
            {tAuth("otpConfirm")}
          </PrimaryButton>
          <SecondaryGrayButton onClick={onClose} fullWidth>
            {tAuth("otpBack")}
          </SecondaryGrayButton>
        </div>
      </DialogContent>
    </Dialog>
  )
}
