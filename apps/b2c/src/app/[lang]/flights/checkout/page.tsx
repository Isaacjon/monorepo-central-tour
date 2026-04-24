import { FlightsCheckoutPage } from "@/modules/flights/pages/flights-checkout-page"

export default async function FlightsCheckoutRoutePage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

  return <FlightsCheckoutPage lang={lang} />
}
