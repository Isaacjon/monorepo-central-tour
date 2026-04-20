import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

import { RegisterPage } from "@/modules/auth/pages/register-page"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const t = await getTranslations({ locale: lang, namespace: "auth" })

  return {
    title: t("registerMetaTitle"),
  }
}

export default async function RegisterRoutePage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

  return <RegisterPage lang={lang} />
}
