import { getTranslations } from "next-intl/server"
import { Suspense } from "react"

import { HomeLanguageChanger } from "@/modules/home/components/home-language-changer"
import { InputShowcase } from "@/modules/home/components/input-showcase"
import { OtpShowcase } from "@/modules/home/components/otp-showcase"
import { ToastShowcase } from "@/modules/home/components/toast-showcase"
import { Button, PrimaryButton, SecondaryGrayButton } from "ui"

export async function HomePage({ lang }: { lang: string }) {
  const t = await getTranslations("home")

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-start justify-center gap-6 px-6 py-24">
      <span className="bg-primary/10 text-primary inline-flex items-center rounded-full px-3 py-1 text-xs font-medium">
        {t("badge")} · {lang.toUpperCase()}
      </span>
      <h1 className="text-4xl font-semibold tracking-tight">{t("title")}</h1>
      <p className="text-muted-foreground text-base">{t("description")}</p>
      <div className="flex flex-wrap items-center gap-3">
        <Button size="lg">{t("ctaPrimary")}</Button>
        <SecondaryGrayButton>{t("ctaSecondary")}</SecondaryGrayButton>
        <PrimaryButton>{t("ctaPrimaryButton")}</PrimaryButton>
      </div>
      <OtpShowcase />
      <ToastShowcase
        sectionLabel={t("toastSection")}
        showSuccessLabel={t("toastShowSuccess")}
        showErrorLabel={t("toastShowError")}
        successTitle={t("toastSuccessTitle")}
        successDescription={t("toastSuccessDescription")}
        errorTitle={t("toastErrorTitle")}
        errorDescription={t("toastErrorDescription")}
      />
      <InputShowcase />
      <Suspense
        fallback={
          <div className="border-c-greyscale-200 bg-c-surface h-10 w-[135px] shrink-0 animate-pulse rounded-lg border" />
        }
      >
        <HomeLanguageChanger lang={lang} />
      </Suspense>
    </main>
  )
}
