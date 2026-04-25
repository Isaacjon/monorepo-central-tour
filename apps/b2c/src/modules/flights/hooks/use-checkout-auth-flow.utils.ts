"use client"

import { getErrorMessage, hasErrorMessage } from "@/modules/auth/utils/auth-flow-utils"
import { saveAuthSession } from "@/shared/stores/auth-store"
import { showToast } from "ui"

export const OTP_RESEND_AFTER_S = 120
const OTP_ALREADY_SENT_ERROR = "otp already sent please wait"
const OTP_EXPIRED_ERROR = "otp code has expired"
const INVALID_PHONE_FORMAT_ERROR = "invalid phone number format"

export type CheckoutCredentials = {
  firstName: string
  lastName: string
  middleName: string
  email: string
  phone: string
}

export type AuthMode = "register" | "login"
export type AuthTokens = {
  accessToken: string
  refreshToken: string
  userId: string
}

export function normalizePhoneForApi(phone: string): string {
  const digits = phone.replace(/\D/g, "")
  return digits ? `+${digits}` : ""
}

export function isAlreadyExistsError(error: unknown): boolean {
  return hasErrorMessage(error, "already exists")
}

export function isOtpAlreadySentError(error: unknown): boolean {
  return hasErrorMessage(error, OTP_ALREADY_SENT_ERROR)
}

export function isOtpExpiredError(error: unknown): boolean {
  return hasErrorMessage(error, OTP_EXPIRED_ERROR)
}

export function isInvalidPhoneFormatError(error: unknown): boolean {
  return hasErrorMessage(error, INVALID_PHONE_FORMAT_ERROR)
}

export function showCheckoutSendOtpError(
  error: unknown,
  tAuth: (key: string) => string
) {
  if (isOtpAlreadySentError(error)) {
    showToast({ title: tAuth("otpAlreadySentToast"), type: "error" })
    return
  }
  if (isInvalidPhoneFormatError(error)) {
    showToast({ title: tAuth("invalidPhoneNumberToast"), type: "error" })
    return
  }
  showToast({
    title: tAuth("sendOtpFailedToast"),
    description: getErrorMessage(error),
    type: "error",
  })
}

export function saveCheckoutAuthSession(
  tokens: AuthTokens,
  credentials: CheckoutCredentials
) {
  saveAuthSession({
    ...tokens,
    contactMethod: "phone",
    contactValue: credentials.phone,
    userPhone: credentials.phone,
    userEmail: credentials.email || null,
    userName: `${credentials.firstName} ${credentials.lastName}`.trim(),
  })
}

type ConfirmCheckoutOtpParams = {
  authMode: AuthMode
  credentials: CheckoutCredentials
  loginWithOtp: () => Promise<AuthTokens>
  registerWithOtp: () => Promise<AuthTokens>
  resendOtp: (force?: boolean) => Promise<void>
  onAuthenticated: () => void
  setOtpInvalid: (invalid: boolean) => void
  tAuth: (key: string) => string
  closeOtpDialog: () => void
}

export async function confirmCheckoutOtp({
  authMode,
  credentials,
  loginWithOtp,
  registerWithOtp,
  resendOtp,
  onAuthenticated,
  setOtpInvalid,
  tAuth,
  closeOtpDialog,
}: ConfirmCheckoutOtpParams) {
  try {
    const tokens =
      authMode === "register" ? await registerWithOtp() : await loginWithOtp()
    saveCheckoutAuthSession(tokens, credentials)
    closeOtpDialog()
    onAuthenticated()
  } catch (error) {
    if (isOtpExpiredError(error)) {
      setOtpInvalid(true)
      await resendOtp(true)
      return
    }

    if (authMode === "register" && isAlreadyExistsError(error)) {
      try {
        const tokens = await loginWithOtp()
        saveCheckoutAuthSession(tokens, credentials)
        closeOtpDialog()
        onAuthenticated()
        return
      } catch (loginError) {
        if (isOtpExpiredError(loginError)) {
          setOtpInvalid(true)
          await resendOtp(true)
          return
        }
        setOtpInvalid(true)
        showToast({ title: tAuth("otpInvalidOrLoginFailedToast"), type: "error" })
        return
      }
    }

    setOtpInvalid(true)
    showToast({ title: tAuth("otpInvalidOrAuthFailedToast"), type: "error" })
  }
}
