import { Link } from "@central-tour/config/i18n/navigation"
import { getTranslations } from "next-intl/server"

export async function RegisterPage() {
  const t = await getTranslations("auth")

  return (
    <main className="mx-auto flex min-h-svh max-w-md flex-col justify-center gap-4 px-6 py-16">
      <h1 className="text-2xl font-semibold text-[#101828]">{t("registerTitle")}</h1>
      <p className="text-[#667085]">{t("registerBody")}</p>
      <Link href="/login" className="text-primary text-sm font-semibold hover:underline">
        {t("loginCta")}
      </Link>
    </main>
  )
}
