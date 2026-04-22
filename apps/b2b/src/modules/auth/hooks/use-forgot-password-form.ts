import { useRouter } from "@central-tour/config/i18n/navigation"
import { type FormEvent, useCallback, useState } from "react"

import { useOtpResendInterval } from "@/modules/auth/hooks/use-otp-resend-interval"
import {
  formatPhoneForSubtitle,
  getFullPhoneDigits,
} from "@/modules/auth/lib/forgot-password-phone"
import {
  checkPhoneForReset,
  completePasswordReset,
} from "@/modules/auth/services/forgot-password"
import type { ForgotPasswordFormCopy } from "@/modules/auth/types/forgot-password-form-copy"
import { OTP_LENGTH, showToast } from "ui"

const OTP_RESEND_AFTER_S = 120

type Step = "phone" | "otp" | "password"

export function useForgotPasswordForm(copy: ForgotPasswordFormCopy) {
  const router = useRouter()
  const [step, setStep] = useState<Step>("phone")

  const [phone, setPhone] = useState("")
  const [phoneDialCode, setPhoneDialCode] = useState("+998")
  const [phoneError, setPhoneError] = useState("")
  const [phoneCheckLoading, setPhoneCheckLoading] = useState(false)

  const [otp, setOtp] = useState("")
  const [otpInvalid, setOtpInvalid] = useState(false)
  const [resendSeconds, setResendSeconds] = useState(0)
  const [resendToken, setResendToken] = useState(0)

  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [newPasswordError, setNewPasswordError] = useState("")
  const [confirmPasswordError, setConfirmPasswordError] = useState("")
  const [resetLoading, setResetLoading] = useState(false)

  useOtpResendInterval(step === "otp", resendToken, setResendSeconds)

  const phoneDisplay = formatPhoneForSubtitle(phone, phoneDialCode)

  const onPhoneInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value)
    if (phoneError) setPhoneError("")
  }

  const restartOtpResendTimer = useCallback(() => {
    setResendSeconds(OTP_RESEND_AFTER_S)
    setResendToken((t) => t + 1)
  }, [])

  const onOtpValueChange = useCallback((next: string) => {
    setOtp(next)
    setOtpInvalid(false)
  }, [])

  const onNewPasswordValueChange = useCallback((v: string) => {
    setNewPassword(v)
    setNewPasswordError((prev) => (prev ? "" : prev))
  }, [])

  const onConfirmPasswordValueChange = useCallback((v: string) => {
    setConfirmPassword(v)
    setConfirmPasswordError((prev) => (prev ? "" : prev))
  }, [])

  async function handlePhoneSubmit(e: FormEvent) {
    e.preventDefault()
    const localDigits = phone.replace(/\D/g, "")
    if (localDigits.length === 0) {
      setPhoneError(copy.phoneRequired)
      return
    }
    if (localDigits.length < 9) {
      setPhoneError(copy.phoneInvalid)
      return
    }
    setPhoneError("")
    setPhoneCheckLoading(true)
    try {
      const result = await checkPhoneForReset(
        getFullPhoneDigits(phone, phoneDialCode)
      )
      if (!result.found) {
        setPhoneError(copy.userNotFound)
        return
      }
      setOtp("")
      setOtpInvalid(false)
      restartOtpResendTimer()
      setStep("otp")
    } finally {
      setPhoneCheckLoading(false)
    }
  }

  function handleOtpConfirm() {
    setOtpInvalid(false)
    if (otp.length !== OTP_LENGTH) {
      setOtpInvalid(true)
      return
    }
    setStep("password")
  }

  function handleOtpBack() {
    setStep("phone")
    setOtp("")
    setOtpInvalid(false)
  }

  function handlePasswordBack() {
    setStep("otp")
    setNewPasswordError("")
    setConfirmPasswordError("")
  }

  async function handlePasswordSubmit(e: FormEvent) {
    e.preventDefault()
    let valid = true
    if (!newPassword.trim()) {
      setNewPasswordError(copy.newPasswordRequired)
      valid = false
    } else {
      setNewPasswordError("")
    }
    if (!confirmPassword.trim()) {
      setConfirmPasswordError(copy.confirmPasswordRequired)
      valid = false
    } else {
      setConfirmPasswordError("")
    }
    if (!valid) return
    if (newPassword !== confirmPassword) {
      setConfirmPasswordError(copy.passwordsMismatch)
      return
    }

    setResetLoading(true)
    try {
      await completePasswordReset({
        phone: getFullPhoneDigits(phone, phoneDialCode),
        otp,
        newPassword,
      })
      showToast({ title: copy.successToast, type: "success" })
      router.push("/")
    } catch {
      showToast({ title: copy.errorToast, type: "error" })
    } finally {
      setResetLoading(false)
    }
  }

  return {
    step,
    phone,
    phoneError,
    phoneCheckLoading,
    phoneDisplay,
    otp,
    otpInvalid,
    resendSeconds,
    newPassword,
    confirmPassword,
    newPasswordError,
    confirmPasswordError,
    resetLoading,
    setPhoneDialCode,
    onPhoneInputChange,
    handlePhoneSubmit,
    handleOtpConfirm,
    handleOtpBack,
    handlePasswordBack,
    handlePasswordSubmit,
    onOtpValueChange,
    restartOtpResendTimer,
    onNewPasswordValueChange,
    onConfirmPasswordValueChange,
  }
}
