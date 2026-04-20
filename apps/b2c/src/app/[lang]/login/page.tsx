import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

import { LoginPage } from "@/modules/auth/pages/login-page"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const t = await getTranslations({ locale: lang, namespace: "auth" })

  return {
    title: t("metaTitle"),
  }
}

export default async function LoginRoutePage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

  return <LoginPage lang={lang} />
}
