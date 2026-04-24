import { FlightsCheckoutDetailsView } from "../components/flights-checkout-details-view"
import { FlightsCheckoutShell } from "./flights-checkout-shell"

export async function FlightsCheckoutDetailsPage({ lang }: { lang: string }) {
  return (
    <FlightsCheckoutShell lang={lang}>
      <FlightsCheckoutDetailsView />
    </FlightsCheckoutShell>
  )
}
