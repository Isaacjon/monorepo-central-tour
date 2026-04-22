"use client"

import { useForgotPasswordForm } from "@/modules/auth/hooks/use-forgot-password-form"
import type { ForgotPasswordFormCopy } from "@/modules/auth/types/forgot-password-form-copy"

import { ForgotPasswordNewPasswordPanel } from "./forgot-password-new-password-panel"
import { ForgotPasswordOtpPanel } from "./forgot-password-otp-panel"
import { ForgotPasswordPhonePanel } from "./forgot-password-phone-panel"

export type { ForgotPasswordFormCopy } from "@/modules/auth/types/forgot-password-form-copy"

type ForgotPasswordFormProps = {
  copy: ForgotPasswordFormCopy
}

export function ForgotPasswordForm({ copy }: ForgotPasswordFormProps) {
  const f = useForgotPasswordForm(copy)

  if (f.step === "otp") {
    return (
      <ForgotPasswordOtpPanel
        copy={copy}
        phoneDisplay={f.phoneDisplay}
        otp={f.otp}
        otpInvalid={f.otpInvalid}
        resendSeconds={f.resendSeconds}
        onOtpChange={f.onOtpValueChange}
        onResend={f.restartOtpResendTimer}
        onConfirm={f.handleOtpConfirm}
        onBack={f.handleOtpBack}
      />
    )
  }

  if (f.step === "password") {
    return (
      <ForgotPasswordNewPasswordPanel
        copy={copy}
        newPassword={f.newPassword}
        confirmPassword={f.confirmPassword}
        newPasswordError={f.newPasswordError}
        confirmPasswordError={f.confirmPasswordError}
        loading={f.resetLoading}
        onNewPasswordChange={f.onNewPasswordValueChange}
        onConfirmPasswordChange={f.onConfirmPasswordValueChange}
        onSubmit={f.handlePasswordSubmit}
        onBack={f.handlePasswordBack}
      />
    )
  }

  return (
    <ForgotPasswordPhonePanel
      copy={copy}
      phone={f.phone}
      phoneError={f.phoneError}
      loading={f.phoneCheckLoading}
      onPhoneChange={f.onPhoneInputChange}
      onDialCodeChange={f.setPhoneDialCode}
      onSubmit={f.handlePhoneSubmit}
    />
  )
}
