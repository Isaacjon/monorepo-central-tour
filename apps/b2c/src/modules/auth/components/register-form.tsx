"use client"

import { Link } from "@central-tour/config/i18n/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMemo } from "react"
import { useForm, useWatch } from "react-hook-form"

import { useRegisterOtpFlow } from "@/modules/auth/hooks/use-register-otp-flow"
import {
  createRegisterFormSchema,
  type RegisterFormValues,
} from "@/modules/auth/lib/register-schema"
import type { RegisterFormCopy } from "@/modules/auth/types/register-form-copy"
import { OtpInput, PrimaryButton, SecondaryGrayButton } from "ui"

import { AuthFormLayout } from "./auth-form-layout"
import { AuthOtpActions } from "./auth-otp-actions"
import { AuthPhoneEmailTabs } from "./auth-phone-email-tabs"
import { LoginEmailFields } from "./login-email-fields"
import { LoginPhoneField } from "./login-phone-field"
import { LoginSocialRow } from "./login-social-row"
import { RegisterNameFields } from "./register-name-fields"

const REGISTER_FORM_ID = "register-form"

type RegisterFormProps = { lang: string; copy: RegisterFormCopy }

export function RegisterForm({ lang, copy }: RegisterFormProps) {
  const schema = useMemo(
    () =>
      createRegisterFormSchema({
        phoneInvalid: copy.validationPhoneInvalid,
        emailInvalid: copy.validationEmailInvalid,
        nameRequired: copy.validationNameRequired,
        nameInvalidChars: copy.validationNameInvalidChars,
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
  const {
    step,
    otp,
    otpInvalid,
    otpDestination,
    otpMethod,
    resendSeconds,
    isSendingOtp,
    isConfirmingOtp,
    submitCredentials,
    confirmOtp,
    backToCredentials,
    resendOtp,
    onOtpChange,
  } = useRegisterOtpFlow(copy)

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
              onSubmit={form.handleSubmit(submitCredentials)}
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
                onChange={onOtpChange}
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
                disabled={isSendingOtp}
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
              onResend={async () => {
                await resendOtp()
              }}
              onConfirm={confirmOtp}
              onBack={backToCredentials}
              confirmDisabled={isConfirmingOtp}
              resendDisabled={isSendingOtp}
            />
          )}
        </div>
      }
    />
  )
}
