import {
  type Dispatch,
  type FormEvent,
  type SetStateAction,
  useCallback,
  useState,
} from "react"

import { useOtpResendInterval } from "@/modules/auth/hooks/use-otp-resend-interval"
import { getRegisterContactFieldErrors } from "@/modules/auth/lib/register-form-validation"
import { submitRegisterContact } from "@/modules/auth/services/register"
import type { RegisterFormCopy } from "@/modules/auth/types/register-form-copy"
import type { RegisterFormStep } from "@/modules/auth/types/register-form-step"
import { OTP_LENGTH, showToast } from "ui"

const OTP_RESEND_AFTER_S = 120

export function useRegisterFormContactOtp(
  copy: RegisterFormCopy,
  step: RegisterFormStep,
  setStep: Dispatch<SetStateAction<RegisterFormStep>>
) {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [fullNameError, setFullNameError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [contactLoading, setContactLoading] = useState(false)

  const [otp, setOtp] = useState("")
  const [otpInvalid, setOtpInvalid] = useState(false)
  const [resendSeconds, setResendSeconds] = useState(0)
  const [resendToken, setResendToken] = useState(0)

  useOtpResendInterval(step === "otp", resendToken, setResendSeconds)

  const restartOtpResendTimer = useCallback(() => {
    setResendSeconds(OTP_RESEND_AFTER_S)
    setResendToken((t) => t + 1)
  }, [])

  function onContactNameChange(value: string) {
    setFullName(value)
    if (fullNameError) setFullNameError("")
  }

  function onContactEmailChange(value: string) {
    setEmail(value)
    if (emailError) setEmailError("")
  }

  async function handleContactSubmit(e: FormEvent) {
    e.preventDefault()
    const fieldErrors = getRegisterContactFieldErrors(fullName, email, copy)
    if (fieldErrors) {
      setFullNameError(fieldErrors.fullNameError)
      setEmailError(fieldErrors.emailError)
      return
    }
    setFullNameError("")
    setEmailError("")

    setContactLoading(true)
    try {
      await submitRegisterContact({ fullName, email: email.trim() })
      setOtp("")
      setOtpInvalid(false)
      restartOtpResendTimer()
      setStep("otp")
    } catch {
      showToast({ title: copy.registerErrorToast, type: "error" })
    } finally {
      setContactLoading(false)
    }
  }

  const onOtpValueChange = useCallback((next: string) => {
    setOtp(next)
    setOtpInvalid(false)
  }, [])

  function handleOtpConfirm() {
    setOtpInvalid(false)
    if (otp.length !== OTP_LENGTH) {
      setOtpInvalid(true)
      return
    }
    setStep("company")
  }

  function handleOtpBack() {
    setStep("contact")
    setOtp("")
    setOtpInvalid(false)
  }

  return {
    fullName,
    email,
    fullNameError,
    emailError,
    contactLoading,
    otp,
    otpInvalid,
    resendSeconds,
    onContactNameChange,
    onContactEmailChange,
    handleContactSubmit,
    onOtpValueChange,
    restartOtpResendTimer,
    handleOtpConfirm,
    handleOtpBack,
  }
}
