import { getTranslations } from "next-intl/server"
import { Suspense } from "react"

import loginHeroImage from "@/modules/auth/assets/login-hero.png"
import { RegisterForm } from "@/modules/auth/components/register-form"
import type { RegisterFormCopy } from "@/modules/auth/types/register-form-copy"
import { AuthHeroPanel, type AuthHeroSlide } from "ui"

function buildCopy(
  t: Awaited<ReturnType<typeof getTranslations>>
): RegisterFormCopy {
  return {
    registerTitle: t("registerFirstTitle"),
    registerSubtitle: t("registerFirstBody"),
    registerFullNameLabel: t("registerFullNameLabel"),
    registerFullNamePlaceholder: t("registerFullNamePlaceholder"),
    registerEmailLabel: t("registerEmailLabel"),
    registerEmailPlaceholder: t("registerEmailPlaceholder"),
    continue: t("registerContinue"),
    back: t("otpBack"),
    otpTitle: t("registerOtpTitle"),
    otpSubtitle: t("registerOtpSubtitle"),
    otpConfirm: t("registerContinue"),
    otpResendIn: t("otpResendIn"),
    otpResend: t("otpResend"),
    companyTitle: t("registerCompanyTitle"),
    companySubtitle: t("registerCompanyBody"),
    companyNameLabel: t("registerCompanyNameLabel"),
    companyNamePlaceholder: t("registerCompanyNamePlaceholder"),
    companyAddressLabel: t("registerCompanyAddressLabel"),
    companyAddressPlaceholder: t("registerCompanyAddressPlaceholder"),
    companyPhoneLabel: t("registerCompanyPhoneLabel"),
    companyLicenseLabel: t("registerCompanyLicenseLabel"),
    companyCertificateLabel: t("registerCompanyCertificateLabel"),
    createPasswordTitle: t("registerPasswordTitle"),
    createPasswordBody: t("registerPasswordBody"),
    passwordLabel: t("registerPasswordLabel"),
    passwordPlaceholder: t("registerPasswordPlaceholder"),
    confirmPasswordLabel: t("registerConfirmPasswordLabel"),
    registerSuccessToast: t("registerCompletedToast"),
    registerErrorToast: t("sendOtpFailedToast"),
    validationFullNameRequired: t("registerValidationFullNameRequired"),
    validationEmailRequired: t("registerValidationEmailRequired"),
    validationEmailInvalid: t("registerValidationEmailInvalid"),
    validationCompanyNameRequired: t("registerValidationCompanyNameRequired"),
    validationAddressRequired: t("registerValidationAddressRequired"),
    validationPhoneRequired: t("registerValidationPhoneRequired"),
    validationPhoneInvalid: t("registerValidationPhoneInvalid"),
    validationPasswordRequired: t("registerValidationPasswordRequired"),
    validationConfirmPasswordRequired: t(
      "registerValidationConfirmPasswordRequired"
    ),
    validationPasswordsMismatch: t("forgotPasswordsMismatch"),
    conditionsTitle: t("registerConditionsTitle"),
    conditionsAgreement: t("registerConditionsAgreement"),
    conditionsSubmit: t("registerConditionsSubmit"),
    requestSentTitle: t("registerRequestSentTitle"),
    requestSentBody: t("registerRequestSentBody"),
    requestSentSupportPrefix: t("registerRequestSentSupportPrefix"),
  }
}

export async function RegisterPage() {
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
          <RegisterForm copy={copy} />
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
