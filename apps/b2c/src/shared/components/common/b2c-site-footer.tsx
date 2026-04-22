import { getTranslations } from "next-intl/server"

import { B2C_FOOTER_SOCIAL } from "@/shared/lib/b2c-footer-constants"
import { AppFooter } from "ui"

type B2cSiteFooterProps = {
  lang: string
}

export async function B2cSiteFooter({ lang }: B2cSiteFooterProps) {
  const t = await getTranslations("footer")
  const base = `/${lang}`

  return (
    <AppFooter
      logoSrc="/images/logo.svg"
      logoHref={base}
      logoAlt={t("logoAlt")}
      navItems={[
        { label: t("navHome"), href: base },
        { label: t("navFlights"), href: `${base}/flights` },
        { label: t("navProfile"), href: `${base}/profile` },
      ]}
      privacyLabel={t("privacy")}
      privacyHref={`${base}#privacy`}
      contactEmail={t("contactEmail")}
      socialLinks={B2C_FOOTER_SOCIAL}
    />
  )
}
