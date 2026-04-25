"use client"

import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"

import {
  useLoginClientMutation,
  useRegisterClientMutation,
  useSendOtpMutation,
} from "@/modules/auth/services/auth/auth.query"
import { getAuthSession } from "@/shared/stores/auth-store"
import { OTP_LENGTH, showToast } from "ui"
import {
  type AuthMode,
  type AuthTokens,
  type CheckoutCredentials,
  confirmCheckoutOtp,
  isAlreadyExistsError,
  isOtpAlreadySentError,
  normalizePhoneForApi,
  OTP_RESEND_AFTER_S,
  showCheckoutSendOtpError,
} from "./use-checkout-auth-flow.utils"

export function useCheckoutAuthFlow(onAuthenticated: () => void) {
  const tAuth = useTranslations("auth")
  const [isOtpOpen, setIsOtpOpen] = useState(false)
  const [otp, setOtp] = useState("")
  const [otpInvalid, setOtpInvalid] = useState(false)
  const [otpDestination, setOtpDestination] = useState("")
  const [resendSeconds, setResendSeconds] = useState(0)
  const [authMode, setAuthMode] = useState<AuthMode>("register")
  const [credentials, setCredentials] = useState<CheckoutCredentials | null>(
    null
  )
  const sendOtpMutation = useSendOtpMutation()
  const registerMutation = useRegisterClientMutation()
  const loginMutation = useLoginClientMutation()

  useEffect(() => {
    if (resendSeconds <= 0) return
    const timeoutId = window.setTimeout(() => {
      setResendSeconds((seconds) => Math.max(0, seconds - 1))
    }, 1000)
    return () => window.clearTimeout(timeoutId)
  }, [resendSeconds])

  function openOtpDialog(mode: AuthMode, phone: string) {
    setAuthMode(mode)
    setOtpDestination(phone)
    setOtp("")
    setOtpInvalid(false)
    setResendSeconds(OTP_RESEND_AFTER_S)
    setIsOtpOpen(true)
  }

  async function sendOtpByMode(mode: AuthMode, phone: string) {
    await sendOtpMutation.mutateAsync({
      method: "phone",
      value: phone,
      mode,
    })
    openOtpDialog(mode, phone)
  }

  async function beginAuthentication(nextCredentials: CheckoutCredentials) {
    const existingSession = getAuthSession()
    if (existingSession?.accessToken) {
      onAuthenticated()
      return
    }

    const normalizedPhone = normalizePhoneForApi(nextCredentials.phone)
    if (!normalizedPhone) {
      showToast({ title: tAuth("invalidPhoneNumberToast"), type: "error" })
      return
    }
    if (!nextCredentials.firstName.trim() || !nextCredentials.lastName.trim()) {
      showToast({
        title: tAuth("checkoutNameRequiredToast"),
        type: "error",
      })
      return
    }

    const preparedCredentials: CheckoutCredentials = {
      ...nextCredentials,
      firstName: nextCredentials.firstName.trim(),
      lastName: nextCredentials.lastName.trim(),
      middleName: nextCredentials.middleName.trim(),
      email: nextCredentials.email.trim(),
      phone: normalizedPhone,
    }
    setCredentials(preparedCredentials)

    try {
      await sendOtpByMode("register", preparedCredentials.phone)
    } catch (error) {
      if (isOtpAlreadySentError(error)) {
        openOtpDialog("register", preparedCredentials.phone)
        return
      }
      if (!isAlreadyExistsError(error)) {
        showCheckoutSendOtpError(error, tAuth)
        return
      }

      try {
        await sendOtpByMode("login", preparedCredentials.phone)
      } catch (sendLoginOtpError) {
        if (isOtpAlreadySentError(sendLoginOtpError)) {
          openOtpDialog("login", preparedCredentials.phone)
          return
        }
        showCheckoutSendOtpError(sendLoginOtpError, tAuth)
      }
    }
  }

  async function confirmOtp() {
    setOtpInvalid(false)
    if (otp.length !== OTP_LENGTH) {
      setOtpInvalid(true)
      return
    }
    if (!credentials) return

    await confirmCheckoutOtp({
      authMode,
      credentials,
      loginWithOtp: () =>
        loginMutation.mutateAsync({
          contactMethod: "phone",
          contactValue: credentials.phone,
          otp,
        }) as Promise<AuthTokens>,
      registerWithOtp: () =>
        registerMutation.mutateAsync({
          firstName: credentials.firstName,
          lastName: credentials.lastName,
          middleName: credentials.middleName,
          contactMethod: "phone",
          contactValue: credentials.phone,
          otp,
        }) as Promise<AuthTokens>,
      resendOtp,
      onAuthenticated,
      setOtpInvalid,
      tAuth,
      closeOtpDialog: () => setIsOtpOpen(false),
    })
  }

  async function resendOtp(force = false) {
    if (!credentials || (!force && resendSeconds > 0)) return
    try {
      await sendOtpByMode(authMode, credentials.phone)
    } catch (error) {
      if (isOtpAlreadySentError(error)) {
        openOtpDialog(authMode, credentials.phone)
        return
      }
      showCheckoutSendOtpError(error, tAuth)
    }
  }

  function closeOtp() {
    setIsOtpOpen(false)
    setOtp("")
    setOtpInvalid(false)
  }

  return {
    isOtpOpen,
    otp,
    otpInvalid,
    otpDestination,
    resendSeconds,
    isSendingOtp: sendOtpMutation.isPending,
    isConfirmingOtp: registerMutation.isPending || loginMutation.isPending,
    beginAuthentication,
    onOtpChange: (value: string) => {
      setOtp(value)
      setOtpInvalid(false)
    },
    confirmOtp,
    resendOtp,
    closeOtp,
  }
}
