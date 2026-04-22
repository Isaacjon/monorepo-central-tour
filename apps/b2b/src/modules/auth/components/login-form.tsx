"use client"

import { useState } from "react"

import { useOtpResendInterval } from "@/modules/auth/hooks/use-otp-resend-interval"
import { submitLogin } from "@/modules/auth/services/login"
import type { LoginFormCopy } from "@/modules/auth/types/login-form-copy"
import { OTP_LENGTH, showToast } from "ui"

import { LoginCredentialsPanel } from "./login-credentials-panel"
import { LoginOtpPanel } from "./login-otp-panel"

export type { LoginFormCopy } from "@/modules/auth/types/login-form-copy"

const OTP_RESEND_AFTER_S = 120

type LoginFormProps = {
  copy: LoginFormCopy
}

export function LoginForm({ copy }: LoginFormProps) {
  const [step, setStep] = useState<"credentials" | "otp">("credentials")

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [loading, setLoading] = useState(false)

  const [otp, setOtp] = useState("")
  const [otpInvalid, setOtpInvalid] = useState(false)
  const [resendSeconds, setResendSeconds] = useState(0)
  const [resendToken, setResendToken] = useState(0)

  useOtpResendInterval(step === "otp", resendToken, setResendSeconds)

  function validate() {
    let valid = true
    if (!email.trim()) {
      setEmailError(copy.validationEmailRequired)
      valid = false
    } else {
      setEmailError("")
    }
    if (!password.trim()) {
      setPasswordError(copy.validationPasswordRequired)
      valid = false
    } else {
      setPasswordError("")
    }
    return valid
  }

  async function handleCredentialsSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    try {
      await submitLogin({ email, password })
      setOtp("")
      setOtpInvalid(false)
      setResendSeconds(OTP_RESEND_AFTER_S)
      setResendToken((t) => t + 1)
      setStep("otp")
    } catch {
      showToast({ title: copy.loginErrorToast, type: "error" })
    } finally {
      setLoading(false)
    }
  }

  function handleOtpConfirm() {
    setOtpInvalid(false)
    if (otp.length !== OTP_LENGTH) {
      setOtpInvalid(true)
      return
    }
    showToast({ title: copy.welcomeBackToast, type: "success" })
    setStep("credentials")
    setOtp("")
  }

  function handleBack() {
    setStep("credentials")
    setOtp("")
    setOtpInvalid(false)
  }

  if (step === "otp") {
    return (
      <LoginOtpPanel
        copy={copy}
        email={email}
        otp={otp}
        otpInvalid={otpInvalid}
        resendSeconds={resendSeconds}
        onOtpChange={(next) => {
          setOtp(next)
          setOtpInvalid(false)
        }}
        onResend={() => {
          setResendSeconds(OTP_RESEND_AFTER_S)
          setResendToken((t) => t + 1)
        }}
        onConfirm={handleOtpConfirm}
        onBack={handleBack}
      />
    )
  }

  return (
    <LoginCredentialsPanel
      copy={copy}
      email={email}
      password={password}
      emailError={emailError}
      passwordError={passwordError}
      loading={loading}
      onEmailChange={(value) => {
        setEmail(value)
        if (emailError) setEmailError("")
      }}
      onPasswordChange={(value) => {
        setPassword(value)
        if (passwordError) setPasswordError("")
      }}
      onSubmit={handleCredentialsSubmit}
    />
  )
}
