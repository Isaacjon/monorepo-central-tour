import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

import { RegisterPage } from "@/modules/auth/pages/register-page"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("auth")

  return {
    title: t("registerMetaTitle"),
  }
}

export default function RegisterRoutePage() {
  return <RegisterPage />
}
