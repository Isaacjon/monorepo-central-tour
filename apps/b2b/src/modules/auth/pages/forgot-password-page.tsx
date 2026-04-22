import { getTranslations } from "next-intl/server"
import { Suspense } from "react"

import loginHeroImage from "@/modules/auth/assets/login-hero.png"
import { ForgotPasswordForm } from "@/modules/auth/components/forgot-password-form"
import type { ForgotPasswordFormCopy } from "@/modules/auth/types/forgot-password-form-copy"
import { AuthHeroPanel, type AuthHeroSlide } from "ui"

function buildCopy(
  t: Awaited<ReturnType<typeof getTranslations>>
): ForgotPasswordFormCopy {
  return {
    phoneSubmit: t("forgotPhoneSubmit"),
    otpSubmit: t("forgotOtpSubmit"),
    newPasswordSubmit: t("forgotNewPasswordSubmit"),
    back: t("otpBack"),
    backToLogin: t("backToLogin"),
    phoneTitle: t("forgotPhoneTitle"),
    phoneBody: t("forgotPhoneBody"),
    phoneLabel: t("forgotPhoneLabel"),
    phoneRequired: t("forgotPhoneRequired"),
    phoneInvalid: t("forgotPhoneInvalid"),
    userNotFound: t("forgotUserNotFound"),
    otpTitle: t("forgotOtpTitle"),
    otpSubtitle: t("forgotOtpSubtitle"),
    otpResendIn: t("otpResendIn"),
    otpResend: t("otpResend"),
    newPasswordTitle: t("forgotNewPasswordTitle"),
    newPasswordBody: t("forgotNewPasswordBody"),
    newPasswordLabel: t("forgotNewPasswordLabel"),
    newPasswordPlaceholder: t("forgotNewPasswordPlaceholder"),
    confirmPasswordLabel: t("forgotConfirmPasswordLabel"),
    newPasswordRequired: t("forgotNewPasswordRequired"),
    confirmPasswordRequired: t("forgotConfirmPasswordRequired"),
    passwordsMismatch: t("forgotPasswordsMismatch"),
    successToast: t("forgotPasswordSuccessToast"),
    errorToast: t("forgotPasswordErrorToast"),
  }
}

export async function ForgotPasswordPage() {
  const t = await getTranslations("auth")
  const copy = buildCopy(t)
  const heroSlides = t.raw("hero.slides") as AuthHeroSlide[]

  return (
    <main className="relative flex min-h-svh bg-white">
      <div className="flex flex-1 flex-col lg:w-[53.33%]">
        <Suspense
          fallback={
            <div className="flex flex-1 items-center justify-center p-4">
              <div className="border-c-greyscale-200 bg-background h-10 w-full max-w-[416px] animate-pulse rounded-xl border" />
            </div>
          }
        >
          <ForgotPasswordForm copy={copy} />
        </Suspense>
      </div>

      <div className="flex min-h-[320px] flex-col px-4 pb-4 lg:hidden">
        <div className="flex flex-1 flex-col overflow-hidden rounded-2xl">
          <AuthHeroPanel
            image={loginHeroImage}
            slides={heroSlides}
            prevLabel={t("hero.prev")}
            nextLabel={t("hero.next")}
          />
        </div>
      </div>

      <aside className="hidden w-[46.67%] flex-col overflow-hidden rounded-2xl p-4 lg:flex">
        <AuthHeroPanel
          image={loginHeroImage}
          slides={heroSlides}
          prevLabel={t("hero.prev")}
          nextLabel={t("hero.next")}
        />
      </aside>
    </main>
  )
}
