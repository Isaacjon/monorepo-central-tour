import { Link } from "@central-tour/config/i18n/navigation"
import { getTranslations } from "next-intl/server"

export default async function ForgotPasswordPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const t = await getTranslations({
    locale: lang,
    namespace: "authPlaceholder",
  })

  return (
    <main className="mx-auto flex min-h-svh max-w-md flex-col justify-center gap-4 px-6 py-16">
      <h1 className="text-2xl font-semibold text-[#101828]">
        {t("forgotTitle")}
      </h1>
      <p className="text-[#667085]">{t("forgotBody")}</p>
      <Link
        href="/login"
        className="text-primary font-semibold hover:underline"
      >
        {t("backToLogin")}
      </Link>
    </main>
  )
}
