import { isLocale } from "@central-tour/config/i18n/locale"
import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"
import { Suspense } from "react"

import loginHeroImage from "@/modules/auth/assets/login-hero.png"
import { LoginForm } from "@/modules/auth/components/login-form"
import type { LoginFormCopy } from "@/modules/auth/types/login-form-copy"
import { AuthHeroPanel, type AuthHeroSlide } from "ui"

type LoginPageProps = {
  lang: string
}

function buildLoginFormCopy(
  t: Awaited<ReturnType<typeof getTranslations>>
): LoginFormCopy {
  return {
    logoWordmark: t("logoWordmark"),
    logoTagline: t("logoTagline"),
    loginTitle: t("loginTitle"),
    loginSubtitle: t("loginSubtitle"),
    tabPhone: t("tabPhone"),
    tabEmail: t("tabEmail"),
    phoneLabel: t("phoneLabel"),
    countryDialPreview: t("countryDialPreview"),
    phonePlaceholder: t("phonePlaceholder"),
    emailLabel: t("emailLabel"),
    emailPlaceholder: t("emailPlaceholder"),
    submit: t("submit"),
    register: t("register"),
    orDivider: t("orDivider"),
    google: t("google"),
    apple: t("apple"),
    validationEmailInvalid: t("validation.emailInvalid"),
    validationPhoneInvalid: t("validation.phoneInvalid"),
    otpTitle: t("otpTitle"),
    otpSubtitlePhone: t("otpSubtitlePhone"),
    otpSubtitleEmail: t("otpSubtitleEmail"),
    otpConfirm: t("otpConfirm"),
    otpBack: t("otpBack"),
    otpResendIn: t("otpResendIn"),
    otpResend: t("otpResend"),
    welcomeBackToast: t("welcomeBackToast"),
    otpAlreadySentToast: t("otpAlreadySentToast"),
    sendOtpFailedToast: t("sendOtpFailedToast"),
    otpInvalidOrLoginFailedToast: t("otpInvalidOrLoginFailedToast"),
  }
}

export async function LoginPage({ lang }: LoginPageProps) {
  if (!isLocale(lang)) {
    notFound()
  }

  const t = await getTranslations("auth")
  const formCopy = buildLoginFormCopy(t)
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
          <LoginForm lang={lang} copy={formCopy} />
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
