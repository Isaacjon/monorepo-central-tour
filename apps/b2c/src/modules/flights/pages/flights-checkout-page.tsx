import { getTranslations } from "next-intl/server"

import { FlightsCheckoutShell } from "./flights-checkout-shell"
import { FlightsCheckoutContent } from "../components/checkout/flights-checkout-content"
import type { FlightsCheckoutContentCopy } from "../types/flights-checkout-content-copy"
import { getCheckoutResultHref } from "../utils/get-checkout-result-href"

function buildFlightsCheckoutContentCopy(
  t: Awaited<ReturnType<typeof getTranslations>>
): FlightsCheckoutContentCopy {
  return {
    travelersTitle: t("checkoutTravelersTitle"),
    contactTitle: t("checkoutContactTitle"),
    phoneLabel: t("checkoutContactPhoneLabel"),
    phonePlaceholder: t("checkoutContactPhonePlaceholder"),
    emailLabel: t("checkoutContactEmailLabel"),
    emailPlaceholder: t("checkoutContactEmailPlaceholder"),
    additionalServicesTitle: t("checkoutAdditionalServicesTitle"),
    baggageAllowanceTitle: t("checkoutBaggageAllowanceTitle"),
    baggagePersonalItemLabel: t("checkoutBaggagePersonalItemLabel"),
    baggageCarryOnLabel: t("checkoutBaggageCarryOnLabel"),
    baggageCheckedLabel: t("checkoutBaggageCheckedLabel"),
    baggageDimensions: t("checkoutBaggageDimensions"),
    baggageOutboundLabel: t("checkoutBaggageOutboundLabel"),
    baggageInboundLabel: t("checkoutBaggageInboundLabel"),
    baggageIncluded: t("checkoutBaggageIncluded"),
    baggageSelectOption: t("checkoutBaggageSelectOption"),
    completeBooking: t("checkoutCompleteBooking"),
  }
}

export async function FlightsCheckoutPage({
  lang,
  paymentStatus,
}: {
  lang: string
  paymentStatus: string | string[] | undefined
}) {
  const t = await getTranslations("flights")
  const contentCopy = buildFlightsCheckoutContentCopy(t)
  const checkoutResultHref = getCheckoutResultHref({ lang, paymentStatus })

  return (
    <FlightsCheckoutShell lang={lang}>
      <FlightsCheckoutContent
        lang={lang}
        checkoutResultHref={checkoutResultHref}
        copy={contentCopy}
      />
    </FlightsCheckoutShell>
  )
}
