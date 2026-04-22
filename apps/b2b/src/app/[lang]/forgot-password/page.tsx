import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

import { ForgotPasswordPage } from "@/modules/auth/pages/forgot-password-page"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("auth")

  return {
    title: t("forgotMetaTitle"),
  }
}

export default function ForgotPasswordRoutePage() {
  return <ForgotPasswordPage />
}
