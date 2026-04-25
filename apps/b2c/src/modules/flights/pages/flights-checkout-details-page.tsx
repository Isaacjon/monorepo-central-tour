import { FlightsCheckoutShell } from "./flights-checkout-shell"
import { FlightsCheckoutDetailsView } from "../components/checkout/flights-checkout-details-view"

export async function FlightsCheckoutDetailsPage({ lang }: { lang: string }) {
  return (
    <FlightsCheckoutShell lang={lang}>
      <FlightsCheckoutDetailsView />
    </FlightsCheckoutShell>
  )
}
