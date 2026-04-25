import { useRouter } from "@central-tour/config/i18n/navigation"
import { useState } from "react"

import type { RegisterFormValues } from "@/modules/auth/lib/register-schema"
import {
  useRegisterClientMutation,
  useSendOtpMutation,
} from "@/modules/auth/services/auth/auth.query"
import type { RegisterFormCopy } from "@/modules/auth/types/register-form-copy"
import {
  buildPhoneForApi,
  getErrorMessage,
} from "@/modules/auth/utils/auth-flow-utils"
import { HttpError } from "@/shared/lib/http-error"
import { saveAuthSession } from "@/shared/stores/auth-store"
import { OTP_LENGTH, showToast } from "ui"

import { useOtpResendInterval } from "./use-otp-resend-interval"

const OTP_RESEND_AFTER_S = 120

type RegisterCredentials = {
  contactMethod: "phone" | "email"
  contactValue: string
  firstName: string
  lastName: string
  middleName: string
}

export function useRegisterOtpFlow(copy: RegisterFormCopy) {
  const router = useRouter()
  const [step, setStep] = useState<"credentials" | "otp">("credentials")
  const [otpDestination, setOtpDestination] = useState("")
  const [otpMethod, setOtpMethod] = useState<"phone" | "email">("phone")
  const [otp, setOtp] = useState("")
  const [otpInvalid, setOtpInvalid] = useState(false)
  const [resendSeconds, setResendSeconds] = useState(0)
  const [resendToken, setResendToken] = useState(0)
  const [credentials, setCredentials] = useState<RegisterCredentials | null>(
    null
  )
  const sendOtpMutation = useSendOtpMutation()
  const registerMutation = useRegisterClientMutation()

  useOtpResendInterval(step, resendToken, setResendSeconds)

  async function submitCredentials(values: RegisterFormValues) {
    const nextCredentials: RegisterCredentials = {
      contactMethod: values.loginTab,
      contactValue:
        values.loginTab === "phone"
          ? buildPhoneForApi(values.phone, copy.countryDialPreview)
          : values.email.trim(),
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      middleName: values.middleName.trim(),
    }

    try {
      await sendOtpMutation.mutateAsync({
        method: nextCredentials.contactMethod,
        value: nextCredentials.contactValue,
        mode: "register",
      })
      setCredentials(nextCredentials)
      setOtpDestination(nextCredentials.contactValue)
      setOtpMethod(nextCredentials.contactMethod)
      setOtp("")
      setOtpInvalid(false)
      setResendSeconds(OTP_RESEND_AFTER_S)
      setStep("otp")
    } catch (error) {
      if (error instanceof Error) {
        const invalidPhoneNumber = error.message.includes(
          "invalid phone number format"
        )
        const alreadyExists = error.message.includes(
          "user with this phone already exists"
        )
        if (alreadyExists) {
          showToast({
            title: "Пользователь с этим телефоном уже существует",
            type: "error",
          })
        } else if (invalidPhoneNumber) {
          showToast({
            title: "Неверный формат телефона",
            type: "error",
          })
        } else {
          showToast({ title: "Не удалось отправить OTP", type: "error" })
        }
      }
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
      const tokens = await registerMutation.mutateAsync({
        firstName: credentials.firstName,
        lastName: credentials.lastName,
        middleName: credentials.middleName,
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
        userName:
          `${credentials.firstName} ${credentials.lastName}`.trim() || null,
      })
      showToast({ title: "Регистрация завершена", type: "success" })
      router.push("/")
    } catch (error) {
      if (error instanceof HttpError) {
        const otpExpired = error.message.includes("otp code has expired")
        const invalidOtpCode = error.message.includes(
          "invalid or expired otp code"
        )
        if (otpExpired) {
          showToast({ title: "OTP код истек", type: "error" })
        } else if (invalidOtpCode) {
          showToast({ title: "Неверный OTP код", type: "error" })
        }
      }
      setOtpInvalid(true)
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
        mode: "register",
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
    isSendingOtp: sendOtpMutation.isPending,
    isConfirmingOtp: registerMutation.isPending,
    submitCredentials,
    confirmOtp,
    backToCredentials,
    resendOtp,
    onOtpChange,
  }
}
