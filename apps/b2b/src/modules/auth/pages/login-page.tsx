import { getTranslations } from "next-intl/server"
import { Suspense } from "react"

import loginHeroImage from "@/modules/auth/assets/login-hero.png"
import { LoginForm } from "@/modules/auth/components/login-form"
import type { LoginFormCopy } from "@/modules/auth/types/login-form-copy"
import { AuthHeroPanel, type AuthHeroSlide } from "ui"

function buildCopy(
  t: Awaited<ReturnType<typeof getTranslations>>
): LoginFormCopy {
  return {
    loginTitle: t("loginTitle"),
    loginBody: t("loginBody"),
    emailLabel: t("emailLabel"),
    emailPlaceholder: t("emailPlaceholder"),
    passwordLabel: t("passwordLabel"),
    passwordPlaceholder: t("passwordPlaceholder"),
    forgotPassword: t("forgotPassword"),
    submit: t("loginSubmit"),
    register: t("registerCta"),
    welcomeBackToast: t("welcomeBackToast"),
    loginErrorToast: t("loginErrorToast"),
    validationEmailRequired: t("validationEmailRequired"),
    validationPasswordRequired: t("validationPasswordRequired"),
    otpTitle: t("otpTitle"),
    otpSubtitle: t("otpSubtitle"),
    otpConfirm: t("otpConfirm"),
    otpBack: t("otpBack"),
    otpResendIn: t("otpResendIn"),
    otpResend: t("otpResend"),
  }
}

export async function LoginPage() {
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
          <LoginForm copy={copy} />
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
