import { FlightsCheckoutSuccessView } from "../components/flights-checkout-success-view"
import { FlightsCheckoutShell } from "./flights-checkout-shell"

export async function FlightsCheckoutSuccessPage({ lang }: { lang: string }) {
  return (
    <FlightsCheckoutShell lang={lang}>
      <FlightsCheckoutSuccessView detailsHref={`/${lang}/flights/checkout/details`} />
    </FlightsCheckoutShell>
  )
}
