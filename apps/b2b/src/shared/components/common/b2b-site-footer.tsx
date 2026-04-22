import { getTranslations } from "next-intl/server"

import { B2B_FOOTER_SOCIAL } from "@/shared/lib/b2b-footer-constants"
import { AppFooter } from "ui"

type B2bSiteFooterProps = {
  lang: string
}

export async function B2bSiteFooter({ lang }: B2bSiteFooterProps) {
  const t = await getTranslations("footer")
  const base = `/${lang}`

  return (
    <AppFooter
      logoSrc="/images/logo.svg"
      logoHref={base}
      logoAlt={t("logoAlt")}
      navItems={[
        { label: t("navSearch"), href: base },
        { label: t("navQuotes"), href: `${base}#quotes` },
        { label: t("navOrders"), href: `${base}#orders` },
        { label: t("navReports"), href: `${base}#reports` },
        { label: t("navClients"), href: `${base}#clients` },
      ]}
      privacyLabel={t("privacy")}
      privacyHref={`${base}#privacy`}
      contactEmail={t("contactEmail")}
      socialLinks={B2B_FOOTER_SOCIAL}
    />
  )
}
