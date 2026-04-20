"use client"

import { Link, useRouter } from "@central-tour/config/i18n/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useMemo, useState } from "react"
import { useForm, useWatch } from "react-hook-form"

import {
  createRegisterFormSchema,
  type RegisterFormValues,
} from "@/modules/auth/lib/register-schema"
import type { RegisterFormCopy } from "@/modules/auth/types/register-form-copy"
import { OTP_LENGTH, OtpInput, PrimaryButton, SecondaryGrayButton } from "ui"

import { AuthFormLayout } from "./auth-form-layout"
import { AuthOtpActions } from "./auth-otp-actions"
import { AuthPhoneEmailTabs } from "./auth-phone-email-tabs"
import { LoginEmailFields } from "./login-email-fields"
import { LoginPhoneField } from "./login-phone-field"
import { LoginSocialRow } from "./login-social-row"
import { RegisterNameFields } from "./register-name-fields"

const REGISTER_FORM_ID = "register-form"
const OTP_RESEND_AFTER_S = 120

type RegisterFormProps = { lang: string; copy: RegisterFormCopy }

export function RegisterForm({ lang, copy }: RegisterFormProps) {
  const router = useRouter()
  const schema = useMemo(
    () =>
      createRegisterFormSchema({
        phoneInvalid: copy.validationPhoneInvalid,
        emailInvalid: copy.validationEmailInvalid,
        nameRequired: copy.validationNameRequired,
      }),
    [copy]
  )

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      loginTab: "phone",
      phone: "",
      email: "",
      lastName: "",
      firstName: "",
      middleName: "",
    },
  })

  const tab = useWatch({ control: form.control, name: "loginTab" }) ?? "phone"
  const [step, setStep] = useState<"credentials" | "otp">("credentials")
  const [otpDestination, setOtpDestination] = useState("")
  const [otpMethod, setOtpMethod] = useState<"phone" | "email">("phone")
  const [otp, setOtp] = useState("")
  const [otpInvalid, setOtpInvalid] = useState(false)
  const [resendSeconds, setResendSeconds] = useState(0)
  const [resendToken, setResendToken] = useState(0)

  useEffect(() => {
    if (step !== "otp") {
      return
    }
    const id = window.setInterval(() => {
      setResendSeconds((s) => {
        if (s <= 1) {
          window.clearInterval(id)
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => window.clearInterval(id)
  }, [step, resendToken])

  function onSubmit(values: RegisterFormValues) {
    if (values.loginTab === "phone") {
      const destination = `${copy.countryDialPreview}${values.phone}`.trim()
      setOtpDestination(destination)
      setOtpMethod("phone")
    } else {
      setOtpDestination(values.email.trim())
      setOtpMethod("email")
    }
    setOtp("")
    setOtpInvalid(false)
    setResendSeconds(OTP_RESEND_AFTER_S)
    setStep("otp")
  }

  function handleOtpBack() {
    setStep("credentials")
    setOtp("")
    setOtpInvalid(false)
  }

  function handleOtpConfirm() {
    setOtpInvalid(false)
    if (otp.length !== OTP_LENGTH) {
      setOtpInvalid(true)
      return
    }
    router.push("/")
  }

  return (
    <AuthFormLayout
      lang={lang}
      logoWordmark={copy.logoWordmark}
      upper={
        <div className="flex flex-col gap-8">
          {step === "credentials" ? (
            <AuthPhoneEmailTabs
              value={tab}
              onValueChange={(value) => {
                form.setValue("loginTab", value as "phone" | "email")
                form.clearErrors()
              }}
              tabPhone={copy.tabPhone}
              tabEmail={copy.tabEmail}
            />
          ) : null}

          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-[30px] leading-[38px] font-semibold text-[#101828]">
              {step === "credentials" ? copy.registerTitle : copy.otpTitle}
            </h1>
            <p className="text-[16px] leading-[24px] text-[#667085]">
              {step === "credentials"
                ? copy.registerSubtitle
                : (otpMethod === "phone"
                    ? copy.otpSubtitlePhone
                    : copy.otpSubtitleEmail
                  ).replace("__DESTINATION__", otpDestination)}
            </p>
          </div>

          {step === "credentials" ? (
            <form
              id={REGISTER_FORM_ID}
              className="flex w-full flex-col gap-4"
              onSubmit={form.handleSubmit(onSubmit)}
              noValidate
            >
              <RegisterNameFields control={form.control} copy={copy} />
              <LoginPhoneField control={form.control} copy={copy} tab={tab} />
              <LoginEmailFields control={form.control} copy={copy} tab={tab} />
            </form>
          ) : (
            <div className="flex w-full flex-col items-center">
              <OtpInput
                value={otp}
                onChange={(next) => {
                  setOtp(next)
                  setOtpInvalid(false)
                }}
                invalid={otpInvalid}
                autoFocus
                aria-label={copy.otpTitle}
              />
            </div>
          )}
        </div>
      }
      lower={
        <div className="flex flex-col gap-4 pt-8">
          {step === "credentials" ? (
            <>
              <PrimaryButton
                type="submit"
                form={REGISTER_FORM_ID}
                size="lg"
                fullWidth
                className="rounded-xl"
              >
                {copy.continueLabel}
              </PrimaryButton>
              <SecondaryGrayButton asChild fullWidth size="lg">
                <Link href="/login">{copy.back}</Link>
              </SecondaryGrayButton>
              <LoginSocialRow copy={copy} />
            </>
          ) : (
            <AuthOtpActions
              copy={copy}
              resendSeconds={resendSeconds}
              onResend={() => {
                setResendSeconds(OTP_RESEND_AFTER_S)
                setResendToken((t) => t + 1)
              }}
              onConfirm={handleOtpConfirm}
              onBack={handleOtpBack}
            />
          )}
        </div>
      }
    />
  )
}
