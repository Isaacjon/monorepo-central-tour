import { FlightsCheckoutShell } from "./flights-checkout-shell"
import { FlightsCheckoutContent } from "../components/flights-checkout-content"
import { getCheckoutResultHref } from "../utils/get-checkout-result-href"

export async function FlightsCheckoutPage({
  lang,
  paymentStatus,
}: {
  lang: string
  paymentStatus: string | string[] | undefined
}) {
  const checkoutResultHref = getCheckoutResultHref({ lang, paymentStatus })

  return (
    <FlightsCheckoutShell lang={lang}>
      <FlightsCheckoutContent
        lang={lang}
        checkoutResultHref={checkoutResultHref}
      />
    </FlightsCheckoutShell>
  )
}
