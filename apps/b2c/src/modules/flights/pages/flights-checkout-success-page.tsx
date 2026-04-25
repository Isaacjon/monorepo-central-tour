import { FlightsCheckoutShell } from "./flights-checkout-shell"
import { FlightsCheckoutSuccessView } from "../components/checkout/flights-checkout-success-view"

export async function FlightsCheckoutSuccessPage({ lang }: { lang: string }) {
  return (
    <FlightsCheckoutShell lang={lang}>
      <FlightsCheckoutSuccessView detailsHref={`/${lang}/flights/checkout/details`} />
    </FlightsCheckoutShell>
  )
}
