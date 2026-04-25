"use client"

import { Link } from "@central-tour/config/i18n/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMemo } from "react"
import { useForm, useWatch } from "react-hook-form"

import { useLoginOtpFlow } from "@/modules/auth/hooks/use-login-otp-flow"
import {
  createLoginFormSchema,
  type LoginFormValues,
} from "@/modules/auth/lib/login-schema"
import type { LoginFormCopy } from "@/modules/auth/types/login-form-copy"
import { OtpInput, PrimaryButton, SecondaryGrayButton } from "ui"

import { AuthFormLayout } from "./auth-form-layout"
import { AuthOtpActions } from "./auth-otp-actions"
import { AuthPhoneEmailTabs } from "./auth-phone-email-tabs"
import { LoginEmailFields } from "./login-email-fields"
import { LoginPhoneField } from "./login-phone-field"
import { LoginSocialRow } from "./login-social-row"

const LOGIN_FORM_ID = "login-form"

type LoginFormProps = { lang: string; copy: LoginFormCopy }

export function LoginForm({ lang, copy }: LoginFormProps) {
  const schema = useMemo(
    () =>
      createLoginFormSchema({
        phoneInvalid: copy.validationPhoneInvalid,
        emailInvalid: copy.validationEmailInvalid,
      }),
    [copy]
  )

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      loginTab: "phone",
      phone: "",
      email: "",
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
    onOtpChange,
    submitCredentials,
    confirmOtp,
    backToCredentials,
    resendOtp,
  } = useLoginOtpFlow(copy)

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
              {step === "credentials" ? copy.loginTitle : copy.otpTitle}
            </h1>
            <p className="text-[16px] leading-[24px] text-[#667085]">
              {step === "credentials"
                ? copy.loginSubtitle
                : (otpMethod === "phone"
                    ? copy.otpSubtitlePhone
                    : copy.otpSubtitleEmail
                  ).replace("__DESTINATION__", otpDestination)}
            </p>
          </div>

          {step === "credentials" ? (
            <form
              id={LOGIN_FORM_ID}
              className="w-full"
              onSubmit={form.handleSubmit(submitCredentials)}
              noValidate
              autoComplete="off"
              data-1p-ignore
              data-lpignore="true"
            >
              <LoginPhoneField control={form.control} copy={copy} tab={tab} />
              <LoginEmailFields control={form.control} copy={copy} tab={tab} />
            </form>
          ) : (
            <div
              className="flex w-full flex-col items-center"
              data-1p-ignore
              data-lpignore="true"
            >
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
        <div className="flex flex-col gap-4 pt-4 lg:pt-0">
          {step === "credentials" ? (
            <>
              <PrimaryButton
                type="submit"
                form={LOGIN_FORM_ID}
                size="lg"
                fullWidth
                className="rounded-xl"
                disabled={isSendingOtp}
              >
                {copy.submit}
              </PrimaryButton>
              <SecondaryGrayButton asChild fullWidth size="lg">
                <Link href="/register">{copy.register}</Link>
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
