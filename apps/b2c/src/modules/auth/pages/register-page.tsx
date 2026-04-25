import { isLocale } from "@central-tour/config/i18n/locale"
import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"
import { Suspense } from "react"

import loginHeroImage from "@/modules/auth/assets/login-hero.png"
import { RegisterForm } from "@/modules/auth/components/register-form"
import type { RegisterFormCopy } from "@/modules/auth/types/register-form-copy"
import { AuthHeroPanel, type AuthHeroSlide } from "ui"

type RegisterPageProps = {
  lang: string
}

function buildRegisterFormCopy(
  t: Awaited<ReturnType<typeof getTranslations>>
): RegisterFormCopy {
  return {
    logoWordmark: t("logoWordmark"),
    registerTitle: t("registerTitle"),
    registerSubtitle: t("registerSubtitle"),
    tabPhone: t("tabPhone"),
    tabEmail: t("tabEmail"),
    phoneLabel: t("phoneLabel"),
    countryDialPreview: t("countryDialPreview"),
    emailLabel: t("emailLabel"),
    emailPlaceholder: t("emailPlaceholder"),
    lastNameLabel: t("lastNameLabel"),
    lastNamePlaceholder: t("lastNamePlaceholder"),
    firstNameLabel: t("firstNameLabel"),
    firstNamePlaceholder: t("firstNamePlaceholder"),
    middleNameLabel: t("middleNameLabel"),
    middleNamePlaceholder: t("middleNamePlaceholder"),
    continueLabel: t("continueLabel"),
    back: t("registerBack"),
    orDivider: t("orDivider"),
    google: t("google"),
    apple: t("apple"),
    validationEmailInvalid: t("validation.emailInvalid"),
    validationPhoneInvalid: t("validation.phoneInvalid"),
    validationNameRequired: t("validation.nameRequired"),
    validationNameInvalidChars: t("validation.nameInvalidChars"),
    otpTitle: t("otpTitle"),
    otpSubtitlePhone: t("otpSubtitlePhone"),
    otpSubtitleEmail: t("otpSubtitleEmail"),
    otpConfirm: t("otpConfirm"),
    otpBack: t("otpBack"),
    otpResendIn: t("otpResendIn"),
    otpResend: t("otpResend"),
    registerCompletedToast: t("registerCompletedToast"),
    otpExpiredToast: t("otpExpiredToast"),
    otpInvalidToast: t("otpInvalidToast"),
    userAlreadyExistsToast: t("userAlreadyExistsToast"),
    invalidPhoneNumberToast: t("invalidPhoneNumberToast"),
    otpAlreadySentToast: t("otpAlreadySentToast"),
    sendOtpFailedToast: t("sendOtpFailedToast"),
  }
}

export async function RegisterPage({ lang }: RegisterPageProps) {
  if (!isLocale(lang)) {
    notFound()
  }

  const t = await getTranslations("auth")
  const formCopy = buildRegisterFormCopy(t)
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
          <RegisterForm lang={lang} copy={formCopy} />
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
