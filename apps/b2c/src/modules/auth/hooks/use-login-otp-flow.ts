import { useRouter } from "@central-tour/config/i18n/navigation"
import { useState } from "react"

import { useOtpResendInterval } from "@/modules/auth/hooks/use-otp-resend-interval"
import type { LoginFormValues } from "@/modules/auth/lib/login-schema"
import {
  useLoginClientMutation,
  useSendOtpMutation,
} from "@/modules/auth/services/auth/auth.query"
import type { LoginFormCopy } from "@/modules/auth/types/login-form-copy"
import {
  buildPhoneForApi,
  getErrorMessage,
} from "@/modules/auth/utils/auth-flow-utils"
import { saveAuthSession } from "@/shared/stores/auth-store"
import { OTP_LENGTH, showToast } from "ui"

const OTP_RESEND_AFTER_S = 120

type LoginCredentials = {
  contactMethod: "phone" | "email"
  contactValue: string
}

export function useLoginOtpFlow(copy: LoginFormCopy) {
  const router = useRouter()
  const [step, setStep] = useState<"credentials" | "otp">("credentials")
  const [otpDestination, setOtpDestination] = useState("")
  const [otpMethod, setOtpMethod] = useState<"phone" | "email">("phone")
  const [otp, setOtp] = useState("")
  const [otpInvalid, setOtpInvalid] = useState(false)
  const [resendSeconds, setResendSeconds] = useState(0)
  const [resendToken, setResendToken] = useState(0)
  const [credentials, setCredentials] = useState<LoginCredentials | null>(null)
  const sendOtpMutation = useSendOtpMutation()
  const loginMutation = useLoginClientMutation()
  const isSendingOtp = sendOtpMutation.isPending
  const isConfirmingOtp = loginMutation.isPending

  useOtpResendInterval(step, resendToken, setResendSeconds)

  async function submitCredentials(values: LoginFormValues) {
    const nextCredentials: LoginCredentials = {
      contactMethod: values.loginTab,
      contactValue:
        values.loginTab === "phone"
          ? buildPhoneForApi(values.phone, copy.countryDialPreview)
          : values.email.trim(),
    }
    try {
      await sendOtpMutation.mutateAsync({
        method: nextCredentials.contactMethod,
        value: nextCredentials.contactValue,
        mode: "login",
      })
      setCredentials(nextCredentials)
      setOtpDestination(nextCredentials.contactValue)
      setOtpMethod(nextCredentials.contactMethod)
      setOtp("")
      setOtpInvalid(false)
      setResendSeconds(OTP_RESEND_AFTER_S)
      setStep("otp")
    } catch (error) {
      showToast({
        title: "Не удалось отправить OTP",
        description: getErrorMessage(error),
        type: "error",
      })
    }
  }

  async function confirmOtp() {
    setOtpInvalid(false)
    if (otp.length !== OTP_LENGTH) {
      setOtpInvalid(true)
      return
    }
    if (!credentials) {
      setStep("credentials")
      return
    }

    try {
      const tokens = await loginMutation.mutateAsync({
        contactMethod: credentials.contactMethod,
        contactValue: credentials.contactValue,
        otp,
      })
      saveAuthSession({
        ...tokens,
        contactMethod: credentials.contactMethod,
        contactValue: credentials.contactValue,
        userPhone:
          credentials.contactMethod === "phone"
            ? credentials.contactValue
            : null,
        userEmail:
          credentials.contactMethod === "email"
            ? credentials.contactValue
            : null,
        userName: null,
      })
      showToast({ title: copy.welcomeBackToast, type: "success" })
      router.push("/")
    } catch (error) {
      setOtpInvalid(true)
      showToast({
        title: "Неверный OTP или ошибка входа",
        description: getErrorMessage(error),
        type: "error",
      })
    }
  }

  function backToCredentials() {
    setStep("credentials")
    setOtp("")
    setOtpInvalid(false)
  }

  async function resendOtp() {
    if (!credentials) return
    try {
      await sendOtpMutation.mutateAsync({
        method: credentials.contactMethod,
        value: credentials.contactValue,
        mode: "login",
      })
      setResendSeconds(OTP_RESEND_AFTER_S)
      setResendToken((t) => t + 1)
    } catch (error) {
      showToast({
        title: "Не удалось отправить OTP",
        description: getErrorMessage(error),
        type: "error",
      })
    }
  }

  function onOtpChange(next: string) {
    setOtp(next)
    setOtpInvalid(false)
  }

  return {
    step,
    otp,
    otpInvalid,
    otpDestination,
    otpMethod,
    resendSeconds,
    isSendingOtp,
    isConfirmingOtp,
    onOtpChange,
    submitCredentials,
    confirmOtp,
    backToCredentials,
    resendOtp,
  }
}
