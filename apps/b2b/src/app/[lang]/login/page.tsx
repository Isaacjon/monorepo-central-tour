import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

import { LoginPage } from "@/modules/auth/pages/login-page"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("auth")

  return {
    title: t("loginMetaTitle"),
  }
}

export default function LoginRoutePage() {
  return <LoginPage />
}
