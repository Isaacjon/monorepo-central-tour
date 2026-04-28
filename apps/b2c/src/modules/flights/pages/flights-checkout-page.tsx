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
    baggageProtectionTitle: t("checkoutBaggageProtectionTitle"),
    baggageProtectionIntro: t("checkoutBaggageProtectionIntro"),
    baggageProtectionCompensation: t("checkoutBaggageProtectionCompensation"),
    baggageProtectionOutro: t("checkoutBaggageProtectionOutro"),
    baggageProtectionMore: t("checkoutBaggageProtectionMore"),
    baggageProtectionPriceAmount: t("checkoutBaggageProtectionPriceAmount"),
    baggageProtectionPriceSuffix: t("checkoutBaggageProtectionPriceSuffix"),
    baggageProtectionCheckboxAria: t("checkoutBaggageProtectionCheckboxAria"),
    promoCodeTitle: t("checkoutPromoCodeTitle"),
    promoCodePlaceholder: t("checkoutPromoCodePlaceholder"),
    priceSummaryTitle: t("checkoutPriceSummaryTitle"),
    priceSummaryTicketsLabel: t("checkoutPriceSummaryTicketsLabel"),
    priceSummaryTicketsValue: t("checkoutPriceSummaryTicketsValue"),
    priceSummaryOutboundValue: t("checkoutPriceSummaryOutboundValue"),
    priceSummaryInboundValue: t("checkoutPriceSummaryInboundValue"),
    priceSummaryBaggageHeading: t("checkoutPriceSummaryBaggageHeading"),
    priceSummaryAirlineNote: t("checkoutPriceSummaryAirlineNote"),
    priceSummaryFree: t("checkoutPriceSummaryFree"),
    priceSummaryGuaranteeLabel: t("checkoutPriceSummaryGuaranteeLabel"),
    priceSummaryGuaranteeValue: t("checkoutPriceSummaryGuaranteeValue"),
    priceSummaryTotalLabel: t("checkoutPriceSummaryTotalLabel"),
    priceSummaryTotalValue: t("checkoutPriceSummaryTotalValue"),
    bookingRulesTitle: t("checkoutBookingRulesTitle"),
    bookingRulesFreeCancellationTitle: t("checkoutBookingRulesFreeCancellationTitle"),
    bookingRulesFreeCancellationBody: t("checkoutBookingRulesFreeCancellationBody"),
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
