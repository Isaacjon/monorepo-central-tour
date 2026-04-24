import { FlightsCheckoutDetailsPage } from "@/modules/flights/pages/flights-checkout-details-page"

export default async function FlightsCheckoutDetailsRoutePage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

  return <FlightsCheckoutDetailsPage lang={lang} />
}
